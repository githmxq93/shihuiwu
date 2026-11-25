// 统一网络请求封装（utils/request.js）
//
// 背景：小程序此前的 99 处 wx.request 全部散落在各页面手写，鉴权头、超时、错误处理
//       不一致——近半数依赖系统默认 60 秒超时，弱网下核心页会长时间转圈；401 也没有
//       统一处理。本模块收敛这套逻辑，供新代码直接使用、旧代码逐步替换。
//
// 用法 A（Promise，推荐新代码）：
//   const request = require('../../utils/request');
//   request.get(API.FIGURES.GET(id), { auth: true })
//     .then(body => { ... })          // body 即响应体 { success, data }
//     .catch(err => { ... });         // err: { code, message, data }
//   request.post(url, { data: {...}, loading: '提交中' })
//
// 用法 B（回调，与 wx.request 同形——存量代码机械迁移用）：
//   request({ url, method, data, header, timeout,
//             success(res) { ... },   // res 为**原生响应对象**（含 statusCode/data），
//             fail(err) { ... },      // 任意 HTTP 状态码都会走 success，与 wx.request 一致
//             complete(res) { ... } })
//   —— 迁移只需把 `wx.request(` 换成 `request(` 并加一行 require，回调体零改动。
//
// 约定：
//   - 默认 timeout 10s（可 options.timeout 覆盖）。
//   - auth: true 时自动带 Authorization: Bearer <userToken>。
//   - loading: 字符串时自动 show/hideLoading（引用计数，多个请求并存不闪烁）。
//   - toast: Promise 模式默认 true；**回调模式默认 false**（沿用调用方自己的提示）。
//   - 401 且 options.handle401 !== false 时，统一清理登录态（见 _handle401）。
//   - 重试：默认**仅对幂等的 GET** 生效（首次失败后再试 ≤2 次，退避 300/900ms）；
//     写操作（POST/PUT/DELETE）默认不重试，避免网络抖动导致重复提交；
//     可用 options.retry（数字）显式覆盖，retry: 0 关闭。
//   - **超时不重试**（2026-10-29）：fail 回调里区分「超时」与「瞬时抖动」——
//     超时说明链路本身慢，再等 10s × 2 只是把用户等待乘三（10 + 0.3 + 10 +
//     0.9 + 10 = 31.2s，期间页面骨架一直停住、看不到失败提示）；而 DNS 失败、
//     连接被重置这类抖动重试有效。故只对非超时失败重试。
//   - 该模块只做「透明封装」，不改动服务端接口契约；旧代码不迁移也能正常工作。

const API = require('../config/api');
const authStore = require('./auth-store');

const DEFAULT_TIMEOUT = 10000;
// GET 默认重试次数：首次失败后再试 ≤2 次（合计 ≤3 次尝试）
const DEFAULT_RETRY = 2;
// 每次重试前的等待（指数退避），下标 = 已重试次数 - 1
const RETRY_BACKOFF_MS = [300, 900];

let _loadingCount = 0;

function _showLoading(title) {
  if (_loadingCount === 0) {
    wx.showLoading({ title: title || '加载中', mask: true });
  }
  _loadingCount += 1;
}

function _hideLoading() {
  _loadingCount = Math.max(0, _loadingCount - 1);
  if (_loadingCount === 0) {
    wx.hideLoading();
  }
}

function _buildHeader(options) {
  const header = Object.assign({ 'Content-Type': 'application/json' }, options.header || {});
  if (options.auth && !header.Authorization) {
    try {
      const token = authStore.get('userToken') || '';
      if (token) header.Authorization = 'Bearer ' + token;
    } catch (e) { /* 读取失败则不带鉴权头，由服务端返回 401 */ }
  }
  return header;
}

/** 401 统一处理：清登录态 + 通知 + 触发全局登出回调（如有）。幂等、可重复调用。 */
function _handle401() {
  try {
    authStore.clear();
    try { wx.removeStorageSync('tokenInfo'); } catch (e) {}
    const app = getApp();
    if (app && app.globalData) {
      app.globalData._userCache = null;
      if (typeof app.onUserTokenInvalid === 'function') app.onUserTokenInvalid();
    }
  } catch (e) { /* 静默 */ }
}

function _toast(msg) {
  try {
    wx.showToast({ title: msg || '网络异常，请稍后重试', icon: 'none', duration: 2000 });
  } catch (e) { /* 静默 */ }
}

/** 5xx 视为可重试；4xx 一律不重试（客户端错误重试无意义）。 */
function _isRetryableStatus(status) {
  return status >= 500 && status < 600;
}

/** 探测当前是否处于离线（用于给出「无网络连接」而非泛泛的「网络异常」）。 */
function _probeOffline(cb) {
  try {
    if (!wx.getNetworkType) { cb(false); return; }
    wx.getNetworkType({
      success: (res) => cb(!!res && res.networkType === 'none'),
      fail: () => cb(false)
    });
  } catch (e) { cb(false); }
}

/**
 * 发起请求（Promise + 回调双形态，见文件头注释）。
 * @param {object} options 与 wx.request 同名参数 + auth/loading/toast/handle401/retry
 * @returns {Promise<object>} Promise 模式 resolve 响应体；回调模式亦返回（避免悬空）
 */
function request(options) {
  const opts = options || {};
  const cbSuccess = typeof opts.success === 'function' ? opts.success : null;
  const cbFail = typeof opts.fail === 'function' ? opts.fail : null;
  const cbComplete = typeof opts.complete === 'function' ? opts.complete : null;
  const callbackMode = !!(cbSuccess || cbFail || cbComplete);

  const useLoading = !!opts.loading;
  const useToast = callbackMode ? opts.toast === true : opts.toast !== false;
  const handle401 = opts.handle401 !== false;

  const method = String(opts.method || 'GET').toUpperCase();
  const maxRetry = typeof opts.retry === 'number'
    ? Math.max(0, opts.retry)
    : (method === 'GET' ? DEFAULT_RETRY : 0);

  return new Promise((resolve, reject) => {
    if (useLoading) _showLoading(opts.loading);

    let attempt = 0;
    let settled = false;

    function settle(ok, res, err) {
      if (settled) return;
      settled = true;
      if (useLoading) _hideLoading();
      // [重要] 顺序必须对齐 wx.request：**success/fail 先，complete 最后**。
      // 此前 complete 被排在 success 之前，凡是把「收尾/推进下一步」挂在 complete 上的
      // 调用方都会读到**尚未填充**的数据。实测两处踩坑：
      //   · detail.js::fetchMissingTargets —— complete 里 `next()` 直接回调
      //     _buildRelationData，而 success 还没把 /batch 结果写进 _relTargets，
      //     于是关系目标全部解析失败，关系图谱「全部加载失败」；
      //   · chart-pkg/pages/graph/graph.js::fetchMissingTargets —— 同一个坑。
      // 全项目 14 处 complete 调用里，其余都是 setData 收尾，顺序修正后同样正确。
      if (ok) {
        if (cbSuccess) { try { cbSuccess(res); } catch (e) {} }
        resolve(callbackMode ? res : (res && res.data));
      } else {
        if (cbFail) { try { cbFail(err); } catch (e) {} }
        // 回调模式：调用方未用 Promise，绝不能 reject
        //（否则「只传 success、不传 fail」的存量调用会产生未捕获拒绝，
        //  被 monitor 当作异常上报——与 wx.request 的静默失败语义不符）
        if (callbackMode) { resolve(undefined); } else { reject(err); }
      }
      if (cbComplete) { try { cbComplete(ok ? res : err); } catch (e) {} }
    }

    function scheduleRetry() {
      const delay = RETRY_BACKOFF_MS[Math.min(attempt - 1, RETRY_BACKOFF_MS.length - 1)];
      setTimeout(run, delay);
    }

    function run() {
      attempt += 1;
      wx.request({
        url: opts.url,
        method: method,
        data: opts.data,
        header: _buildHeader(opts),
        timeout: typeof opts.timeout === 'number' ? opts.timeout : DEFAULT_TIMEOUT,
        success(res) {
          const status = res && res.statusCode;
          if (status === 401 && handle401) _handle401();

          if (status >= 200 && status < 300) { settle(true, res, null); return; }

          // 非 2xx：5xx 可重试
          if (_isRetryableStatus(status) && attempt <= maxRetry) { scheduleRetry(); return; }

          // 回调模式严格对齐 wx.request —— 任意状态码都走 success，交由调用方判 statusCode
          if (callbackMode) { settle(true, res, null); return; }

          const err = {
            code: status,
            message: (res.data && res.data.message) || ('请求失败(' + status + ')'),
            data: res.data
          };
          if (useToast) _toast(err.message);
          settle(false, null, err);
        },
        fail(e) {
          // 网络层失败。区分两类：
          //   ① 超时（errMsg 含 timeout / timed out）—— 链路本身慢，重试只会
          //      把 10s 等待变成 31.2s，用户全程看到「加载中」，必须立刻失败；
          //   ② 其他（连接被重置、DNS 失败、离线瞬断）—— 抖动，重试有效。
          // 注：iOS 会返回 "The request timed out."，Android 多为 "request:fail timeout"，
          //     故两种写法都要匹配，且不区分大小写。
          const isTimeout = !!(e && /timeout|timed\s*-?\s*out/i.test(e.errMsg || ''));
          if (!isTimeout && attempt <= maxRetry) { scheduleRetry(); return; }

          if (callbackMode) { settle(false, null, e); return; }

          _probeOffline((offline) => {
            const message = offline ? '当前无网络连接，请检查网络后重试'
              : isTimeout ? '请求超时，请检查网络后重试'
                : '网络异常，请稍后重试';
            if (useToast) _toast(message);
            settle(false, null, { code: 0, message: message, data: e });
          });
        }
      });
    }

    run();
  });
}

function get(url, options) {
  return request(Object.assign({ url: url, method: 'GET' }, options || {}));
}

function post(url, options) {
  return request(Object.assign({ url: url, method: 'POST' }, options || {}));
}

function put(url, options) {
  return request(Object.assign({ url: url, method: 'PUT' }, options || {}));
}

function del(url, options) {
  return request(Object.assign({ url: url, method: 'DELETE' }, options || {}));
}

// 导出「可直接调用 + 带便捷方法」的形态：
//   request({...})            —— 回调/通用形态（等价 wx.request）
//   request.get(url, {...})   —— Promise 形态便捷方法
//   const { get } = require(...)  亦可
request.request = request;
request.get = get;
request.post = post;
request.put = put;
request.del = del;
request.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
request.DEFAULT_RETRY = DEFAULT_RETRY;
request.API = API;

/* ---------------- 短时响应缓存 + 在途请求登记（2026-11-09，切换提速） ---------------- */
/*
 * 为什么放在 request.js，而不是单独建 utils/page-cache.js：
 *   微信「上传前检查」会报「主包内不应存在主包未使用的 JS 文件」——单独建缓存模块时，
 *   主包页面没有直接引用它（只有 detail-pkg / lineage-pkg / footprint-pkg 三个分包在用），
 *   检查不通过。缓存与「同一请求不重复发」本来就是请求层职责（预取结果留用、同键在途
 *   请求复用），并入本模块后：主包页面（pages/index/index.js 等）使用 request 即真实
 *   使用了本文件，分包继续通过 request.getCache / setCache / getInflight 复用同一份实现，
 *   不产生任何重复代码。
 *
 * 两层存储：
 *   · 内存（_cacheMem）：同一次启动内最快，各分包 require 到的是同一份主包模块实例；
 *   · wx.storage：跨页面 / 跨冷启动仍在；分包页面可直接读主包写入的键。
 *
 * 有效期：
 *   · CACHE_TTL_MS = 10 分钟：人物档案是静态史料，正常运营下极少改动，10 分钟内重复
 *     进页不必再走网络；超过即失效（读取返回 null 并顺手清键）。
 *   · CACHE_FRESH_MS = 2 分钟：2 分钟内算「刚拉过」，目标页命中后不再后台刷新，
 *     消除「预取一次 + 进页再刷一次」的重复请求；超过才静默刷新。
 *
 * 容量：单条序列化后超过 CACHE_MAX_BYTES（256KB）不写 storage（内存仍保留，仅本次
 * 启动可用）。所有读写失败一律静默——缓存永远不能影响主流程。
 */
var CACHE_TTL_MS = 10 * 60 * 1000;
var CACHE_FRESH_MS = 2 * 60 * 1000;
var CACHE_MAX_BYTES = 256 * 1024;
var CACHE_KEY_PREFIX = 'swcache:v1:';

/** 内存层：key 已带前缀，value = { ts, data } */
var _cacheMem = {};

function _cacheNow() {
  return Date.now();
}

function _cacheReadStorage(k) {
  try {
    var raw = wx.getStorageSync(k);
    if (!raw) return null;
    var entry = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!entry || !entry.ts) return null;
    _cacheMem[k] = entry;
    return entry;
  } catch (e) {
    return null;
  }
}

/**
 * 读缓存。
 * @param {string} key 业务键，如 'lineage:123'
 * @returns {{data:*, age:number}|null} age 为毫秒；失效返回 null
 */
function getCache(key) {
  var k = CACHE_KEY_PREFIX + String(key);
  var entry = _cacheMem[k] || _cacheReadStorage(k);
  if (!entry || !entry.ts) return null;
  var age = _cacheNow() - entry.ts;
  if (age > CACHE_TTL_MS) {
    removeCache(key);
    return null;
  }
  return { data: entry.data, age: age < 0 ? 0 : age };
}

/**
 * 写缓存（内存 + storage 双写）。
 * @param {string} key
 * @param {*} data 任意可序列化数据
 */
function setCache(key, data) {
  var k = CACHE_KEY_PREFIX + String(key);
  var entry = { ts: _cacheNow(), data: data };
  _cacheMem[k] = entry;
  try {
    var raw = JSON.stringify(entry);
    if (raw.length > CACHE_MAX_BYTES) return;   // 超限只留内存，避免写爆 storage
    wx.setStorageSync(k, raw);
  } catch (e) {
    /* 序列化 / 存储失败：静默，页面照常走网络 */
  }
}

/** 删除缓存（内存 + storage） */
function removeCache(key) {
  var k = CACHE_KEY_PREFIX + String(key);
  delete _cacheMem[k];
  try {
    wx.removeStorageSync(k);
  } catch (e) {
    /* ignore */
  }
}

/*
 * 在途请求登记（跨页面去重）：
 * 详情页刚点「世系」就跳分包页时，若预取请求还没回来，目标页读缓存必然落空，
 * 会再发一条同样的请求 —— 同一份数据请求两次。这里把「正在路上的 Promise」登记在
 * 共享模块里：目标页优先接管这次请求，不再发第二条；请求结束（成功/失败）即销号。
 */
var _cacheInflight = {};

/**
 * @param {string} key 业务键（与缓存键一致）
 * @param {{promise:Promise, params?:object}} entry
 */
function setInflight(key, entry) {
  var k = String(key);
  _cacheInflight[k] = entry;
  var p = entry && entry.promise;
  if (p && typeof p.then === 'function') {
    var clear = function () { if (_cacheInflight[k] === entry) delete _cacheInflight[k]; };
    p.then(clear, clear);
  }
}

/** @returns {{promise:Promise, params?:object}|null} */
function getInflight(key) {
  return _cacheInflight[String(key)] || null;
}

request.getCache = getCache;
request.setCache = setCache;
request.removeCache = removeCache;
request.getInflight = getInflight;
request.setInflight = setInflight;
request.CACHE_TTL_MS = CACHE_TTL_MS;
request.CACHE_FRESH_MS = CACHE_FRESH_MS;
// 页面侧沿用的短名（读缓存后判断新鲜度用）
request.FRESH_MS = CACHE_FRESH_MS;
request.TTL_MS = CACHE_TTL_MS;

/* ---------------- /api/static/* 版本化缓存（2026-11-09，冷启动提速） ---------------- */
/*
 * 与上面的 swcache:v1: 短时缓存相互独立：
 *   · swcache:v1:  —— 人物档案等，TTL 10 分钟，单条序列化 >256KB 只留内存；
 *   · swstatic:v2: —— /api/static/{name} 静态数据集，TTL 6 小时，绕过 256KB 校验。
 *     2026-11-13 由 v1 升到 v2：服务端静态数据（战役等）更新后，已缓存过 v1 的机器
 *     必须整体失效，否则会继续用旧 body 顶满 6 小时。v1 遗留 key 首次调用时清扫一次。
 * 生产 GET /api/static/:name 只给 Cache-Control: max-age=60，且 wx.request 不走 HTTP
 * 缓存，冷启动会重复下载 places（gzip ~546KB / 未压 ~1.4MB）等大载荷。这里把响应体
 * 落到 wx.storage（+ 内存层），命中即以「网络成功原样」交付，不再发网络。
 * 大载荷按字节分片写入（见 _staticWriteCache），绕开微信 storage 单 key 1MB 上限，
 * 让 places 这类响应**跨冷启动**也能命中缓存，而不只是同次启动内命中。
 *
 * 缓存值 = 整个响应体 { success, data }，命中时包装成 { statusCode:200, data:<body> }
 * 交给 success 回调 —— 与 wx.request 成功回调的 res.data 完全同形，调用方零改动。
 */
var STATIC_CACHE_TTL_MS = 6 * 60 * 60 * 1000;   // 6 小时
var STATIC_CACHE_KEY_PREFIX = 'swstatic:v2:';
// 旧版 v1 的 key（含分片 #chunk:N）升级后永远读不到，不清会一直占着 storage
//（places 单条就有 ~1.4MB）。每次进程生命周期只扫一次，失败静默。
var _staticOldPurged = false;
function _staticPurgeOld() {
  if (_staticOldPurged) return;
  _staticOldPurged = true;
  try {
    var keys = (wx.getStorageInfoSync() || {}).keys || [];
    for (var i = 0; i < keys.length; i++) {
      if (String(keys[i]).indexOf('swstatic:v1') === 0) {
        try { wx.removeStorageSync(keys[i]); } catch (e) { /* 单个失败继续 */ }
      }
    }
  } catch (e) { /* 读不到 key 列表也不算失败：v1 已不可达，只是暂时占空间 */ }
}
// 微信 storage 单 key 上限 1MB。`places` 响应体约 1.4MB，整条写必然 fail，
// 上一版因此只能留内存层 —— 同次启动内可命中，**跨冷启动仍要重下 533KB gzip**。
// 这里按 UTF-8 字节把序列化串切片分键写入，主键只存 { ts, __chunks } 元信息：
// 每片 < 600KB，稳稳落在 1MB 内，跨冷启动命中才真正生效。
var STATIC_CHUNK_BYTES = 600 * 1024;   // 单片上限（按 UTF-8 字节保守估）
var STATIC_CHARS_SAFE = 200 * 1024;    // ≤20 万字符时最坏 600KB，无需切片，直接单键写
// name -> { ts, data:<body>, __chunkCount? }。模块级、跨页面共享，仅本次启动有效。
var _staticMem = {};

function _staticCacheKey(name) {
  return STATIC_CACHE_KEY_PREFIX + String(name);
}

function _staticChunkKey(k, i) {
  return k + '#chunk:' + i;
}

/**
 * 按 UTF-8 字节切分字符串。
 * 代理对的两个 code unit 各按 3 字节计（实际合起来 4 字节），是**保守高估**，
 * 因此每片实际字节数只会更小，不会踩到 1MB 上限。
 */
function _staticSplitByBytes(s, limit) {
  var parts = [], cur = '', bytes = 0;
  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i);
    var n = c < 0x80 ? 1 : (c < 0x800 ? 2 : 3);
    if (bytes + n > limit && cur) { parts.push(cur); cur = ''; bytes = 0; }
    cur += s.charAt(i);
    bytes += n;
  }
  if (cur) parts.push(cur);
  return parts;
}

/** 删除主键 + 指定数量的分片键（TTL 到期 / 写入失败时用）。 */
function _staticDropStorage(k, n) {
  try { wx.removeStorageSync(k); } catch (e) {}
  for (var i = 0; i < (n || 0); i++) {
    try { wx.removeStorageSync(_staticChunkKey(k, i)); } catch (e) {}
  }
}

/** 读静态缓存：内存优先，其次 storage；命中返回 body，未命中/过期/分片残缺返回 null。 */
function _staticReadCache(name) {
  var k = _staticCacheKey(name);
  var entry = _staticMem[name];
  var chunkCount = 0;
  if (!entry) {
    try {
      var raw = wx.getStorageSync(k);
      if (!raw) return null;
      // 兼容上一版的单键缓存：主键直接就是完整 entry；新版分片时主键是元信息。
      var meta = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (!meta || !meta.ts) return null;
      if (meta.__chunks) {
        chunkCount = meta.__chunks;
        var pieces = [];
        for (var i = 0; i < chunkCount; i++) {
          var piece = wx.getStorageSync(_staticChunkKey(k, i));
          if (typeof piece !== 'string' || !piece) return null;   // 缺片 = 缓存不完整，按未命中处理
          pieces.push(piece);
        }
        entry = JSON.parse(pieces.join(''));
      } else {
        entry = meta;
      }
      if (!entry || !entry.ts || !entry.data) return null;
      entry.__chunkCount = chunkCount;
      _staticMem[name] = entry;   // 回填内存，后续同进程命中免解析
    } catch (e) { return null; }
  } else {
    chunkCount = entry.__chunkCount || 0;
  }
  if (!entry || !entry.ts) return null;
  if (_cacheNow() - entry.ts > STATIC_CACHE_TTL_MS) {
    delete _staticMem[name];
    _staticDropStorage(k, chunkCount);
    return null;
  }
  return entry.data;
}

/**
 * 写静态缓存：先写内存（无体积限制，保证本次启动内必可命中），再异步写 storage。
 * 大响应按字节切片：先并发写所有分片，**全部成功**后才写主键元信息，
 * 因此读侧只要看到 __chunks 就意味着分片齐全；任一片失败则清掉全部，退化为内存层。
 */
function _staticWriteCache(name, body) {
  var k = _staticCacheKey(name);
  var prevChunks = (_staticMem[name] && _staticMem[name].__chunkCount) || 0;
  var entry = { ts: _cacheNow(), data: body };
  _staticMem[name] = entry;
  var raw;
  try { raw = JSON.stringify(entry); } catch (e) { return; }

  // 清掉上一次遗留的分片（含「上次分片 / 这次单键」的形态切换），避免残留占空间。
  for (var c = 0; c < prevChunks; c++) {
    try { wx.removeStorageSync(_staticChunkKey(k, c)); } catch (e) {}
  }

  var parts = raw.length <= STATIC_CHARS_SAFE ? null : _staticSplitByBytes(raw, STATIC_CHUNK_BYTES);
  if (!parts || parts.length <= 1) {
    try {
      wx.setStorage({ key: k, data: raw, fail: function () { /* 静默：内存层已兜底 */ } });
    } catch (e) { /* 静默 */ }
    return;
  }

  var n = parts.length;
  entry.__chunkCount = n;   // 只加在内存对象上；raw 已生成，不影响落盘内容
  var meta = JSON.stringify({ ts: entry.ts, __chunks: n });
  var pending = n;
  var allOk = true;
  function onDone(ok) {
    if (!ok) allOk = false;
    pending -= 1;
    if (pending > 0) return;
    if (!allOk) { _staticDropStorage(k, n); return; }
    try {
      wx.setStorage({
        key: k, data: meta,
        fail: function () { _staticDropStorage(k, n); }
      });
    } catch (e) { _staticDropStorage(k, n); }
  }
  parts.forEach(function (part, i) {
    try {
      wx.setStorage({
        key: _staticChunkKey(k, i),
        data: part,
        success: function () { onDone(true); },
        fail: function () { onDone(false); }
      });
    } catch (e) { onDone(false); }
  });
}

/**
 * 取 /api/static/{name}：版本化缓存 + 并发去重 + 与 request 完全一致的双形态。
 *
 * 形态（镜像 request / request.get，调用方零改动）：
 *   · 回调模式（传 success/fail/complete 任一）：success(res) 收到原生响应对象
 *     { statusCode, data:<body> }，res.data 即响应体；返回 Promise resolve(res)，
 *     失败 resolve(undefined)、不 reject（对齐 wx.request 静默失败）。
 *   · Promise 模式（不传回调，如 treaty 的 .then/.catch）：resolve 响应体 <body>，
 *     失败 reject（对齐 request.get）。
 *
 * 流程：命中缓存 → 以网络成功形态直接交付；未命中 → 复用同名在途请求（去重）；
 * 仍未命中 → 走原有 request 发真实 GET，成功后写缓存再交付，失败不写缓存、原样交给调用方。
 * 内部一律用回调形态调用 request，完整复用其重试 / 401 / 超时 / 回调顺序语义，
 * timeout、toast、header 等 options 原样透传，行为与改前各调用点一致。
 */
function getStatic(name, options) {
  // v1 → v2 升级：首次调用顺手清掉不可达的 v1 遗留 key
  _staticPurgeOld();
  var opts = Object.assign({}, options || {});
  var cbSuccess = typeof opts.success === 'function' ? opts.success : null;
  var cbFail = typeof opts.fail === 'function' ? opts.fail : null;
  var cbComplete = typeof opts.complete === 'function' ? opts.complete : null;
  var callbackMode = !!(cbSuccess || cbFail || cbComplete);
  var inflightKey = 'getStatic:' + name;

  // ① 缓存命中：以网络成功形态交付，不发网络
  var cachedBody = _staticReadCache(name);
  if (cachedBody !== null) {
    var hitRes = { statusCode: 200, data: cachedBody };
    return new Promise(function (resolve) {
      if (cbSuccess) { try { cbSuccess(hitRes); } catch (e) {} }
      if (cbComplete) { try { cbComplete(hitRes); } catch (e) {} }
      resolve(callbackMode ? hitRes : cachedBody);
    });
  }

  // ② 并发去重：同名在途请求复用同一个 Promise，只发一次网络
  var inflight = getInflight(inflightKey);
  if (inflight && inflight.promise) {
    return inflight.promise.then(function (res) {
      if (res) {
        if (cbSuccess) { try { cbSuccess(res); } catch (e) {} }
        if (cbComplete) { try { cbComplete(res); } catch (e) {} }
        return callbackMode ? res : res.data;
      }
      var err = (inflight.state && inflight.state.err) || { code: 0, message: 'getStatic:fail' };
      if (cbFail) { try { cbFail(err); } catch (e) {} }
      if (cbComplete) { try { cbComplete(err); } catch (e) {} }
      if (callbackMode) return undefined;
      return Promise.reject(err);
    });
  }

  // ③ 未命中：内部用回调形态发真实 GET，完整复用 request 的重试/401/超时/回调顺序语义
  var state = { err: null };
  var netOpts = Object.assign({}, opts, {
    url: API.STATIC.GET(name),
    method: 'GET',
    success: function (res) {
      var body = res && res.data;
      // 仅缓存成功响应（{success:true,data:...}），失败响应不落缓存
      if (body && body.success && body.data !== undefined && body.data !== null) {
        _staticWriteCache(name, body);
      }
      if (cbSuccess) { try { cbSuccess(res); } catch (e) {} }
    },
    fail: function (e) {
      state.err = e || { errMsg: 'getStatic:fail' };
      if (cbFail) { try { cbFail(state.err); } catch (er) {} }
    },
    complete: function (r) {
      if (cbComplete) { try { cbComplete(r); } catch (e) {} }
    }
  });
  // 回调形态下 request 返回 Promise：成功 resolve 原生 res，失败 resolve undefined，永不 reject
  var netPromise = request(netOpts).then(function (res) { return res; });
  setInflight(inflightKey, { promise: netPromise, state: state });

  // 对齐 request 双形态返回值：回调模式 resolve(res)；Promise 模式 resolve(body)/失败 reject
  return netPromise.then(function (res) {
    if (res) return callbackMode ? res : res.data;
    if (callbackMode) return undefined;
    return Promise.reject(state.err || { code: 0, message: 'getStatic:fail' });
  });
}

request.getStatic = getStatic;
request.STATIC_CACHE_TTL_MS = STATIC_CACHE_TTL_MS;

module.exports = request;
