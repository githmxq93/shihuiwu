// 登录态读写（内存缓存 + 落盘透写）—— utils/auth-store.js
//
// 背景：个人中心 / 首页 / 反馈 等页面在 onLoad / onShow 链路上会**连续多次**
//       wx.getStorageSync('userInfo' / 'userToken' / 'isAdmin' / 'hasPhone')，
//       wx.getStorageSync 是同步 IO，在逻辑层链路里叠加多次会带来可感的卡顿；
//       而这些值在一次会话内极少变化。
//
// 做法：把 4 个登录态键收敛到本模块，首次访问读一次存储进内存，之后全部走内存；
//       写入 / 清除时**同时**更新内存与存储（透写），保证两者一致。
//
// [重要] 使用约束：某个键一旦改由本模块读写，就**不要**再在别处直接调用
//    wx.setStorageSync / wx.removeStorageSync 写同一个键，否则内存缓存会失真。
//    （过渡期如确有外部写入，调用 invalidate() 强制失效即可。）
//
// 注意：数据类缓存（figures_cache / article_device_key 等）与设备标识
//       （wxLocalOpenid、ql_user_id/ql_uid_bak）不在此列，保持原样。

const KEYS = ['userInfo', 'userToken', 'isAdmin', 'hasPhone'];

let _cache = null;

// 与 wx.getStorageSync 的语义对齐：读出的对象是「副本」，外部就地修改不会
// 反向污染缓存（否则会出现「改了没存却已生效」的隐蔽 bug）。登录态都是小对象，
// 克隆开销可忽略。
function _clone(v) {
  if (v == null || typeof v !== 'object') return v;
  try { return JSON.parse(JSON.stringify(v)); } catch (e) { return v; }
}

function _ensure() {
  if (_cache) return _cache;
  _cache = {};
  for (const k of KEYS) {
    try { _cache[k] = wx.getStorageSync(k); } catch (e) { _cache[k] = ''; }
  }
  return _cache;
}

/** 读单个键（内存优先）。 */
function get(key) {
  const c = _ensure();
  if (Object.prototype.hasOwnProperty.call(c, key)) return _clone(c[key]);
  // 非受管键（如 wxLocalOpenid）走直读，不缓存
  try { return wx.getStorageSync(key) || ''; } catch (e) { return ''; }
}

/** 写单个键（内存 + 落盘透写）。 */
function set(key, value) {
  _ensure()[key] = _clone(value);
  try { wx.setStorageSync(key, value); } catch (e) { /* 落盘失败不阻塞内存态 */ }
}

/** 删除单个键（内存 + 落盘）。 */
function remove(key) {
  _ensure()[key] = '';
  try { wx.removeStorageSync(key); } catch (e) {}
}

/**
 * 一次取全登录态快照（供 setData 使用），避免连续多次同步读。
 * @returns {{ userInfo: object|null, token: string, isAdmin: boolean, hasPhone: boolean }}
 */
function snapshot() {
  const c = _ensure();
  return {
    userInfo: _clone(c.userInfo) || null,
    token: c.userToken || '',
    isAdmin: !!c.isAdmin,
    hasPhone: !!c.hasPhone
  };
}

/** 清空全部登录态（登出 / 401 统一处理）。 */
function clear() {
  KEYS.forEach((k) => remove(k));
}

/** 外部若有直接写存储，调用此方法强制下一次访问重新读取。 */
function invalidate() {
  _cache = null;
}

module.exports = { KEYS, get, set, remove, snapshot, clear, invalidate };
