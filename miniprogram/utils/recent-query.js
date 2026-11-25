/**
 * 「最近查询」本地记录
 *
 * 为什么要抽成 util：这份记录此前只由「查询」Tab 写入，
 * 而首页搜索框确认、首页联想点选都不写 ⇒ 同一台设备上，从首页搜过的人回头在查询页
 * 看不到任何历史，两个入口的记录互相割裂。收口到本模块后，两处读写同一份存储。
 *
 * 存储形态：字符串数组（最近在前），上限 RECENT_MAX 条，去重后 unshift。
 * 任何存储异常都吞掉（本地存储不是关键路径，不能因为它阻断搜索）。
 */
const RECENT_KEY = 'query_recent';
const RECENT_MAX = 8;

function load() {
  try {
    const list = wx.getStorageSync(RECENT_KEY);
    return Array.isArray(list) ? list.filter(function (q) { return typeof q === 'string' && q; }) : [];
  } catch (e) {
    return [];
  }
}

// 写入一条并返回最新列表（已去重、已截断）
function save(q) {
  const kw = (q || '').trim();
  if (!kw) return load();
  let list = load().filter(function (item) { return item !== kw; });
  list.unshift(kw);
  if (list.length > RECENT_MAX) list = list.slice(0, RECENT_MAX);
  try { wx.setStorageSync(RECENT_KEY, list); } catch (e) {}
  return list;
}

function clear() {
  try { wx.removeStorageSync(RECENT_KEY); } catch (e) {}
}

module.exports = { RECENT_KEY, RECENT_MAX, load, save, clear };
