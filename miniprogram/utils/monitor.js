// 客户端运行时监控（utils/monitor.js）
//
// 背景：小程序此前**零**错误监控——没有 wx.onError / onUnhandledRejection / 上报，
//       线上 JS 报错、接口异常、白屏只能等用户反馈才发现（历史上「浏览历史为空」
//       「关系恒空」都是人工撞见）。本模块把关键异常收敛为可主动感知的信号。
//
// 三路上报：
//   ① 微信原生监控 wx.reportEvent('js_error', ...)（无需后端；需在小程序后台
//      「开发 → 运维中心 → 错误」自行配置事件，未配置时静默无副作用）
//   ② 自有接口 POST /api/client-error（落盘 server/logs/client-errors.log，便于 grep）
//   ③ 本地 console.error（开发 / 体验版定位用）
//
// 护栏（监控自身绝不能反过来拖垮主流程）：
//   - 全程 try/catch 包裹，任何异常一律吞掉；
//   - 相同错误 60s 内去重；
//   - 单次启动最多上报 20 条（防错误风暴）。

const API = require('../config/api');

const ENDPOINT = (API.MONITOR && API.MONITOR.REPORT) || '';
const MAX_PER_SESSION = 20;
const DEDUP_WINDOW = 60 * 1000;
const DEDUP_MAX_ENTRIES = 100;

const _sentAt = Object.create(null);
let _sentCount = 0;
let _inited = false;

function _appInfo() {
  try {
    const app = getApp();
    if (app && typeof app.getAppVersionInfo === 'function') return app.getAppVersionInfo();
  } catch (e) { /* 启动早期 getApp 可能不可用 */ }
  return { version: '', envVersion: '' };
}

function _currentPage() {
  try {
    const pages = getCurrentPages();
    if (pages && pages.length) return pages[pages.length - 1].route || '';
  } catch (e) {}
  return '';
}

function _normalizeMessage(msg) {
  if (msg == null) return 'unknown';
  if (typeof msg === 'string') return msg;
  if (msg.message) return String(msg.message);
  try { return String(msg); } catch (e) { return 'unknown'; }
}

/**
 * 上报一条客户端异常（也可供业务侧主动调用，如 catch 到接口异常时）
 * @param {string} type    错误类型，如 'onError' | 'unhandledRejection' | 'api'
 * @param {string|Error} message
 * @param {string} [stack]
 * @param {object} [extra] 附加信息（会 JSON 序列化后随请求发送）
 */
function report(type, message, stack, extra) {
  try {
    const msg = _normalizeMessage(message).slice(0, 1000);
    const stk = (stack || '').toString().slice(0, 4000);

    // 去重
    const key = type + '|' + msg;
    const now = Date.now();
    if (_sentAt[key] && now - _sentAt[key] < DEDUP_WINDOW) return;
    _sentAt[key] = now;

    // 控制去重表大小
    const keys = Object.keys(_sentAt);
    if (keys.length > DEDUP_MAX_ENTRIES) {
      for (const k of keys.slice(0, keys.length - DEDUP_MAX_ENTRIES)) delete _sentAt[k];
    }

    // 单次启动上限
    if (_sentCount >= MAX_PER_SESSION) return;
    _sentCount += 1;

    const info = _appInfo();
    const payload = {
      type: type,
      message: msg,
      stack: stk,
      page: _currentPage(),
      version: info.version,
      envVersion: info.envVersion
    };

    // ① 微信原生监控
    if (wx.reportEvent) {
      try {
        wx.reportEvent('js_error', {
          type: type,
          message: msg.slice(0, 200),
          page: payload.page
        });
      } catch (e) { /* 未在后台配置该事件时抛错，忽略 */ }
    }

    // ② 自有接口（失败静默，绝不影响用户）
    // [注意] 刻意**不走** utils/request.js（2026-10-15 全量迁移时有意保留，勿改）：
    //    ① 递归风险：request 失败会调 monitor 上报；若上报自身也走封装且失败，
    //       又会触发一次上报 → 上报风暴（且封装的 GET 重试会把风暴放大 3 倍）。
    //    ② 语义冲突：这是「静默埋点」，封装的离线 toast / 重试 / 401 清登录态
    //       对它全是负面副作用。
    if (ENDPOINT) {
      wx.request({
        url: ENDPOINT,
        method: 'POST',
        timeout: 5000,
        header: { 'Content-Type': 'application/json' },
        data: payload,
        fail: function () { /* 静默 */ }
      });
    }

    // ③ 本地控制台
    console.error('[monitor]', type, msg, stk);
  } catch (e) { /* 监控自身异常必须吞掉 */ }
}

/**
 * 关键路径测速：上报到微信「自定义监控」。
 * [注意] wx.reportMonitor 需在小程序后台「开发 → 运维中心 → 自定义监控」预先配置
 *    监控项（名称 / 类型 / 上报区间），未配置时调用会抛错——已 try/catch 吞掉，
 *    因此可安全地先行埋点，待后台配置后自动生效。
 * @param {string} name 监控项名称（须与后台配置一致）
 * @param {number} ms   耗时（毫秒）
 */
function reportPerf(name, ms) {
  try {
    if (wx.reportMonitor && typeof ms === 'number' && isFinite(ms) && ms >= 0) {
      wx.reportMonitor(String(name), Math.round(ms));
    }
  } catch (e) { /* 未配置监控项时忽略 */ }
}

/** 便捷计时器：const stop = perfStart(); ... reportPerf('x', stop()); */
function perfStart() {
  const t0 = Date.now();
  return function stop() { return Date.now() - t0; };
}

/** 在 app.onLaunch 调用一次即可，重复调用无副作用。 */
function initMonitor() {
  if (_inited) return;
  _inited = true;

  try {
    if (wx.onError) {
      wx.onError(function (err) {
        report('onError', err, err && err.stack);
      });
    }
  } catch (e) {}

  try {
    if (wx.onUnhandledRejection) {
      wx.onUnhandledRejection(function (res) {
        const reason = res && res.reason;
        report('unhandledRejection', _normalizeMessage(reason), reason && reason.stack);
      });
    }
  } catch (e) {}

  // ③ AppService 层错误（基础库 2.27.0+）。
  //    `SystemError (appServiceSDKScriptError) timeout` 这类报错的调用栈全是
  //    WAServiceMainContext 的内部帧，**没有一行业务代码**，wx.onError 也抓不到，
  //    只能靠这个专用入口。res.detail 里带触发它的原始 API（如 setData / request /
  //    includePoints），是区分「业务代码卡死」与「开发者工具偶发通信超时」的唯一判据。
  try {
    if (wx.onAppServiceSDKError) {
      wx.onAppServiceSDKError(function (res) {
        const detail = res && res.detail != null ? res.detail : '';
        report(
          'appServiceSDKError',
          _normalizeMessage(res && (res.message || res.errMsg || res)),
          typeof detail === 'string' ? detail : JSON.stringify(detail)
        );
      });
    }
  } catch (e) {}
}

module.exports = { initMonitor, report, reportPerf, perfStart };
