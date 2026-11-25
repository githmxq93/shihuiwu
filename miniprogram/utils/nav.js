/**
 * utils/nav.js —— 统一页面跳转封装（2026-10-15，P2-14；2026-10-22 增加连点防重）
 *
 * 背景：全项目 24 处 `wx.navigateTo` 裸调用**没有 fail 兜底**。最常见的失败是
 *       **页面栈已满 10 层**（用户在人物关系链里一路点进去），此时 `navigateTo`
 *       静默失败 —— 用户点了毫无反应，既无提示也无跳转，只能反复点击。
 *       其次是目标页不存在（分包未下载 / 路径写错）在开发期难察觉。
 *
 * 本模块把「失败必有反馈」收敛为一处实现，调用方只关心 url：
 *
 *   const { navTo } = require('../../utils/nav');
 *   navTo('/detail-pkg/pages/detail/detail?id=' + id);
 *
 * 行为：
 *   - url 为空/非字符串 ⇒ 直接返回（替代原 `if (url) wx.navigateTo(...)` 的手工守卫）
 *   - 失败 ⇒ toast 提示 + 走 monitor 上报（便于线上发现「目标页不存在」这类编译期错误）
 *   - options 中的 success / complete / events 原样透传；fail 会被包装（先提示再调用户的 fail）
 *   - **在途防重**：同一时刻只允许一个 navigateTo。转场动画（约 300~500ms）内
 *     再次点击卡片/节点时，第二次调用会让框架给「尚未 routeDone、甚至已被替换的
 *     webview」补发路由完成事件，控制台报
 *     `[Page route 错误(system error)] routeDone with a webviewId N is not found`
 *     （2026-10-15 曾在首页 onNavPage 用页面级锁修过一处；本次收敛到本模块，
 *     覆盖全部 24+ 调用点，含图谱 canvas 节点、榜单行、磁贴等高频入口）。
 *
 * [注意] 不封装 redirectTo / switchTab / reLaunch：这三者无栈深限制，
 *    switchTab 需 url 命中 tabBar 列表、redirectTo 不能跳 tabBar 页 —— 都是**开发期
 *    固定写法错误**而非运行时偶发失败，套一层反而掩盖问题。
 */
const monitor = require('./monitor');

const TEXT_DEFAULT = '页面打开失败，请稍后重试';
const TEXT_LIMIT = '页面层级过深，请返回后重试';

// ---- 在途防重（2026-10-22，routeDone webviewId not found 竞态）----
// 为什么不学首页那样固定 800ms：页面级锁只属于源页面，而模块级锁是跨页面共享的，
// 固定时长会把「新页面到达后的快速点击」一起吞掉。这里用 success/complete/fail
// 到达即解锁（新页面加载完成通常 200~500ms，之后用户的点击不再被挡），
// 再留 600ms 定时器兜底——基础库个别版本存在 success 不回调的情况，
// 没有兜底会把锁留死，后面所有跳转全被静默吞掉。
let _navBusy = false;
let _navBusyTimer = null;

function _releaseNavLock() {
  _navBusy = false;
  if (_navBusyTimer) { clearTimeout(_navBusyTimer); _navBusyTimer = null; }
}

/**
 * @param {string} url     站内路径，如 '/detail-pkg/pages/detail/detail?id=3'
 * @param {object} [options] 可透传 success / complete / events
 */
function navTo(url, options) {
  if (!url || typeof url !== 'string') return;
  if (_navBusy) return;              // 已有跳转在途：连点/转场期重复触发直接吞掉
  _navBusy = true;
  if (_navBusyTimer) clearTimeout(_navBusyTimer);
  _navBusyTimer = setTimeout(_releaseNavLock, 600);
  const opt = options || {};
  wx.navigateTo({
    url: url,
    events: opt.events,
    success: function (res) {
      _releaseNavLock();
      if (typeof opt.success === 'function') opt.success(res);
    },
    complete: function (res) {
      _releaseNavLock();
      if (typeof opt.complete === 'function') opt.complete(res);
    },
    fail: function (err) {
      _releaseNavLock();
      const msg = (err && err.errMsg) || '';
      wx.showToast({
        title: /limit/i.test(msg) ? TEXT_LIMIT : TEXT_DEFAULT,
        icon: 'none',
        duration: 2000
      });
      try { monitor.report('navigateTo', msg || 'unknown', '', { url: url }); } catch (e) { /* 监控不得影响主流程 */ }
      if (typeof opt.fail === 'function') opt.fail(err);
    }
  });
}

module.exports = { navTo: navTo };
