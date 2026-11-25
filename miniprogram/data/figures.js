// figures.js — 数据加载器
// 从服务器 API 拉取，缓存到本地

var API = require('../config/api');
// 身份标签展示口径（剔除来源标记 CBDB），与 web 端 src/utils/visibleTags.ts 同口径
var tagFilter = require('../utils/tag-filter');

// ---------- 关系分类颜色 ----------
var RELATION_COLORS = {
  '家族血脉': '#d4a853', '王位继承': '#f0b940', '灭国征服': '#c73e4a',
  '对立论敌': '#f87171', '共事合作': '#4ade80', '血缘姻亲': '#d4a853',
  '师承门派': '#5fa8d9', '地缘同乡': '#00d4c8', '挚友知己': '#f4728b',
  '引荐提携': '#9b7ef0', '影响启发': '#c084fc', '君臣关系': '#4da8da'
};

// ---------- 内部状态 ----------
var _figures = [];
var _figureMap = {};
// 本次启动是否命中本地缓存、命中时的条数（用于判断前台刷新后缓存内容是否真的变了）
var _cacheHitLen = null;
// 延迟写缓存的定时器（同一时刻只留一个）
var _cacheWriteTimer = null;
var _allLoaded = false;
var _fetchFailed = false;
var _fetchRetryCount = 0;
var _onReadyCallbacks = [];
var _onUpdateCallbacks = [];

// ---------- 按需加载状态（P1-2：本地全量池彻底降级为「按需兜底」） ----------
// 背景：全量池（1937 条；未压缩 2.03 MB，**gzip 后实际传输 540 KB**，2026-10-29 复测）
// 此前**每次冷启动都无条件后台拉取**，并顺带做 1937 行 × 4 次 JSON.parse（约 7700 次）
// + 写约 690 KB 缓存。
// [注意] 本文件里所有「MB / KB」若未注明，均为**未压缩**口径；网络实际传输量约为其 1/4
//    （服务端已开 gzip）。讨论带宽/耗时请统一用 gzip 口径，别拿未压缩数字下结论。
// （注：早期注释写「最多 2000 条 ≈ 800KB」，那是字段瘦身前的估算，已失真 2.4 倍，
//   体积增长主要来自 relations / events 变胖。）
// 但主路径如今全部服务端化：
//   · 搜索   → index.js::_fetchServerSearch（服务端返回含 relations 的 list + relatedFigures）
//   · 首屏   → /api/figures/all?random=20
//   · 详情   → 服务端详情接口
// ⇒ 全量池只剩三种**兜底**用途：①服务端搜索失败 ②首页随机接口失败 ③计数兜底。
// ⇒ 因此不再自动拉取，只有真正进入兜底路径时才 ensurePool()。
var _poolLoaded = false;   // 全量池是否已成功装载
var _poolLoading = false;  // 是否已有一次加载在途（含重试期），用于并发去重
var _poolWaiters = [];     // 在途期间排队的回调

// ---------- 缓存写入的保护参数（P2-2，2026-10-29） ----------
// 微信单 key 上限 1024 KB，超限时 setStorageSync 直接抛异常且**什么都不写**。
// 留 124 KB 余量给「其他 key 挤占 + 序列化开销」，故阈值取 900 KB。
// 当前精简后实测 689 KB（余量 31%），尚未逼近；此保护是为「池子继续变大」预留的。
var CACHE_MAX_BYTES = 900 * 1024;
// 曾因超限 / 抛异常失败过：本次启动不再尝试写缓存，避免「序列化 → 失败 → 再来一次」白干
var _cacheDisabled = false;
// 最近一次成功写入的字节数（仅用于日志与排查）
var _cacheBytes = 0;

function getFigureById(id) {
  return _figureMap[id] || null;
}

function getFigureRelations(id) {
  var figure = _figureMap[id];
  if (!figure || !figure.relations) return [];
  return figure.relations.map(function (r) {
    var target = _figureMap[r.targetId];
    return { target: target || null, category: r.category, type: r.type, description: r.description };
  });
}

// ---------- 搜索（已于 P2-3 移除） ----------
// 本模块曾导出 searchFigures（及其独占依赖 buildSearchIndex / ensureSearchIndex
// 与拼音索引 _searchIndex、utils/pinyin 的 toPinyin）。经全量核查，小程序内**无任何
// 引用点**（admin-pkg/pages/articles 用的是自己的 _searchFigures 方法，与此无关）。
// ⇒ 2026-10-15 按《优化排查报告》P2-3 整链删除。搜索统一走服务端 API
//（config/api.js 的 FIGURES.SEARCH / FIGURES.AUTOCOMPLETE）。

// ---------- 内部辅助 ----------
function parseStringFields(f) {
  if (typeof f.tags === 'string') { try { f.tags = JSON.parse(f.tags); } catch(e) { f.tags = []; } }
  f.tags = tagFilter.visibleTags(f.tags);
  if (typeof f.works === 'string') { try { f.works = JSON.parse(f.works); } catch(e) { f.works = []; } }
  if (typeof f.events === 'string') { try { f.events = JSON.parse(f.events); } catch(e) { f.events = []; } }
  if (typeof f.relations === 'string') { try { f.relations = JSON.parse(f.relations); } catch(e) { f.relations = []; } }
  return f;
}

function buildIndexAndMap() {
  _figureMap = {};
  for (var i = 0; i < _figures.length; i++) {
    _figureMap[_figures[i].id] = _figures[i];
  }
}

function callReadyCallbacks() {
  for (var ci = 0; ci < _onReadyCallbacks.length; ci++) {
    try { _onReadyCallbacks[ci](); } catch(e) {}
  }
  _onReadyCallbacks = [];
}

// 精简数据用于缓存（移除大字段、截断 bio 以节省空间）
function trimForCache(figure) {
  var bio = figure.bio || '';
  if (bio.length > 60) bio = bio.substring(0, 60);
  return {
    id: figure.id,
    name: figure.name, nameEn: figure.nameEn,
    dynasty: figure.dynasty, nationality: figure.nationality,
    birthYear: figure.birthYear, deathYear: figure.deathYear,
    avatar: figure.avatar, bio: bio,
    tags: figure.tags,
    region: figure.region || '',
    // 帝王身份（dynastyName/ordinal/total/estimated）：详情页姓名下方的
    // 「明朝第十二位皇帝」胶囊要用；单条仅 ~60B，465 位帝王合计 <30KB。
    emperor: figure.emperor
  };
}

// 超限时的二次降级版：去掉 bio 与 tags（实测 bio 占约 274 KB，tags 约 90 KB）。
// 这两项只影响「离线兜底时卡片摘要的观感」，不影响可点、可查、可走关系 ——
// 总比「一条都存不进去、冷启动完全无本地兜底」好。
function trimForCacheSlim(figure) {
  return {
    id: figure.id,
    name: figure.name,
    dynasty: figure.dynasty,
    nationality: figure.nationality,
    birthYear: figure.birthYear, deathYear: figure.deathYear,
    region: figure.region || '',
    emperor: figure.emperor
  };
}

/** UTF-8 字节数（微信存储配额按字节算，而 String.length 是 UTF-16 码元数） */
function utf8Bytes(str) {
  var n = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 0x80) n += 1;
    else if (c < 0x800) n += 2;
    else if (c >= 0xD800 && c <= 0xDBFF) { n += 4; i++; } // 代理对：4 字节
    else n += 3;
  }
  return n;
}

/** 真正落盘：量体积 → 超限先降级再写 → 仍失败则本次启动放弃 */
function _writeCache(cachedData) {
  var payload = { data: cachedData, ts: Date.now() };
  var bytes = utf8Bytes(JSON.stringify(payload));
  if (bytes > CACHE_MAX_BYTES) {
    var slim = cachedData.map(trimForCacheSlim);
    payload = { data: slim, ts: Date.now() };
    bytes = utf8Bytes(JSON.stringify(payload));
    console.warn('[Figures] 缓存超限，已降级为精简版（去 bio/tags）：' + Math.round(bytes / 1024) + 'KB');
  }
  if (bytes > CACHE_MAX_BYTES) {
    _cacheDisabled = true;
    console.warn('[Figures] 降级后仍超上限，本次启动不写缓存：' + Math.round(bytes / 1024) + 'KB > ' + Math.round(CACHE_MAX_BYTES / 1024) + 'KB');
    return;
  }
  // 异步写入约 690KB 大对象：不再用 setStorageSync 阻塞逻辑层。
  // 失败仅记录、不抛异常、不阻断主流程（缓存是纯优化）；
  // 置 _cacheDisabled 与同步版「失败后本次启动不再尝试」语义一致。
  wx.setStorage({
    key: 'figures_cache',
    data: payload,
    fail: function (e) {
      _cacheDisabled = true;
      console.warn('[Figures] 缓存写入失败，本次启动不再尝试:', e && e.errMsg);
    }
  });
  _cacheBytes = bytes;
}

// 延迟写缓存：把「map 出精简数据 + setStorageSync 写约 690KB」从网络回调的
// 同步链路里挪到启动后 ~4s，避开用户启动后第一次点底部菜单的窗口。
// 单飞：同一时刻只保留一个定时器；若本次拉取条数与启动时缓存条数一致，
// 说明精简列表字段没有变化（trimForCache 只存列表字段，relations/events
// 等大字段本就不入缓存），直接跳过写入。
function scheduleCacheWrite(data) {
  if (_cacheHitLen !== null && _cacheHitLen === data.length) return;
  if (_cacheDisabled) return;   // 本次启动已判定写不进去，不再白干一遍序列化
  if (_cacheWriteTimer) clearTimeout(_cacheWriteTimer);
  _cacheWriteTimer = setTimeout(function() {
    _cacheWriteTimer = null;
    try {
      _writeCache(data.map(trimForCache));
    } catch(e) {
      // 失败一律降级为「本次启动无缓存」，不重试也不打扰用户：
      // 缓存是纯优化，真正兜底靠服务端接口（详情页有 fallbackToServer）。
      _cacheDisabled = true;
      console.warn('[Figures] 缓存写入失败，本次启动不再尝试:', e.message);
    }
  }, 4000);
}

/**
 * 按需确保「全量池」已加载（P1-2）。
 * 已加载 → 下一 tick 同步回调；加载中 → 排队（并发去重：多次调用只发一次请求）。
 * @param {Function} [cb]     池就绪回调
 * @param {Function} [failCb] 最终失败回调（重试耗尽后）。不传则静默——由调用方自行兜底。
 */
function ensurePool(cb, failCb) {
  if (_poolLoaded) {
    if (cb) wx.nextTick(cb);
    return;
  }
  if (cb || failCb) _poolWaiters.push({ ok: cb || null, fail: failCb || null });
  if (_poolLoading) return;   // 已有请求在途（含重试期），排队即可
  _poolLoading = true;
  fetchFromAPI();
}

function _flushPoolWaiters(ok) {
  var ws = _poolWaiters;
  _poolWaiters = [];
  for (var i = 0; i < ws.length; i++) {
    try {
      if (ok) { if (ws[i].ok) ws[i].ok(); }
      else { if (ws[i].fail) ws[i].fail(); }
    } catch (e) { /* 单个回调异常不影响其他等待者 */ }
  }
}

/**
 * 池加载失败（网络层 fail 或服务端返回体异常，两条路共用）。
 * 重试期内**保持 _poolLoading = true**，防止 ensurePool 并发发起第二个全量请求
 * （全量包实测 1.94 MB，重复拉取代价高）。
 *
 * @param {boolean} [isTimeout] 是否为超时类失败。超时只再试 1 次 ——
 *   全量包 1.94 MB，超时说明链路本身就慢，按 3 次 × 20s 连试会白白耗掉 60s+，
 *   用户全程盯着「正在重试」；而连接重置 / DNS 抖动这类失败重试确实有效，仍试 3 次。
 */
function _handlePoolFail(isTimeout) {
  _fetchFailed = true;
  _fetchRetryCount++;
  var maxRetry = isTimeout ? 1 : 3;
  if (_fetchRetryCount <= maxRetry) {
    wx.showToast({ title: '数据加载失败，正在重试...', icon: 'none', duration: 3000 });
    setTimeout(fetchFromAPI, isTimeout ? 3000 : 5000);
  } else {
    _poolLoading = false;
    _flushPoolWaiters(false);
  }
  // 未就绪回调仍需触发（保证页面不再空等）——P1-2 后 _allLoaded 通常已为 true，此处为兜底。
  if (!_allLoaded) {
    _allLoaded = true;
    callReadyCallbacks();
  }
}

// 从服务器拉取数据并更新缓存
function fetchFromAPI() {
  // [注意] 刻意**不走** utils/request.js（2026-10-15 全量迁移时有意保留，勿改）：
  //    ① 超时必须是 20s（全量 1.94 MB，弱网首拉慢），封装默认 10s 会把它截成失败；
  //    ② 封装对 GET 默认重试 2 次 ⇒ 会重复拉取 1.94 MB 全量 JSON，冷启动流量与耗时双放大；
  //    ③ 本函数自带 _fetchRetryCount 失败计数与本地缓存降级，重试语义已在此处自管。
  wx.request({
    // [重要] 实测口径（2026-10-29 复测；此前注释写的「1.94 MB / 4G 约 3~5s」已失真，勿再据此决策）：
    //    未压缩 2.03 MB / 1937 条，但**服务端已开 gzip，实际传输仅 540 KB**，
    //    实测耗时 0.08s。20s 超时不是给「正常传输」用的，而是给「弱网下 540 KB 也可能很慢」
    //    留的兜底余量。
    // ?slim=1：bio 截断到 60 字（与本地 trimForCache 同口径），
    //    整包 gzip 556 KB → 205 KB（-63%）。本池只在兜底路径拉取，而兜底恰发生在弱网时，
    //    包越小越可能拉得回来。
    timeout: 20000,
    url: API.FIGURES.ALL + '?slim=1',
    success: function(res) {
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        _fetchRetryCount = 0;
        _fetchFailed = false;
        var raw = res.data.data;
        // 客户端解析 JSON 字符串字段
        var data = raw.map(function(f) {
          return {
            ...f,
            id: String(f.id),
            tags: tagFilter.visibleTags((function(){ if (Array.isArray(f.tags)) return f.tags; try{return JSON.parse(f.tags||'[]');}catch(e){return [];} })()),
            works: (function(){ if (Array.isArray(f.works)) return f.works; try{return JSON.parse(f.works||'[]');}catch(e){return [];} })(),
            events: (function(){ if (Array.isArray(f.events)) return f.events; try{return JSON.parse(f.events||'[]');}catch(e){return [];} })(),
            relations: (function(){ if (Array.isArray(f.relations)) return f.relations; try{return JSON.parse(f.relations||'[]');}catch(e){return [];} })()
          };
        });
        _figures.length = 0;
        Array.prototype.push.apply(_figures, data);
        buildIndexAndMap();
        if (!_allLoaded) {
          _allLoaded = true;
          callReadyCallbacks();
        }
        // 通知页面数据已更新（缓存命中后后台拉取全量数据时也需要刷新 UI）
        for (var ui = 0; ui < _onUpdateCallbacks.length; ui++) {
          try { _onUpdateCallbacks[ui](); } catch(e) {}
        }
        // 缓存写入延后执行（见 scheduleCacheWrite 注释）：
        // 原实现在这里同步 map + setStorageSync 写约 690KB，并额外 JSON.stringify
        // 一遍仅为打印一个警告 —— 全部叠加在启动后 1~2s 的同步链路上。
        scheduleCacheWrite(data);
        // 池就绪：放行所有 ensurePool 等待者（P1-2）
        _poolLoaded = true;
        _poolLoading = false;
        _flushPoolWaiters(true);
      } else {
        // 服务端返回体异常（业务失败）同样必须按「失败」处理 —— 否则在按需模式下
        // ensurePool 的等待者会**永远悬挂**（这是 P1-2 引入的最大新风险点）。
        _handlePoolFail(false);
      }
    },
    fail: function(e) {
      var isTimeout = !!(e && /timeout|timed\s*-?\s*out/i.test(e.errMsg || ''));
      _handlePoolFail(isTimeout);
    }
  });
}

// ---------- 数据加载 ----------

// 命中有效缓存时的装载逻辑（与原先同步版语义一致）。
// 返回 true 表示已用缓存装载完毕，调用方无需再拉 API。
function applyCachedFigures(cached) {
  var CACHE_TTL = 24 * 60 * 60 * 1000;
  var now = Date.now();
  if (!(cached && cached.data && Array.isArray(cached.data) && cached.ts && (now - cached.ts < CACHE_TTL))) {
    return false;
  }
  cached.data.forEach(parseStringFields);
  _figures.length = 0;
  Array.prototype.push.apply(_figures, cached.data);
  buildIndexAndMap();
  _allLoaded = true;
  callReadyCallbacks();
  // 记下命中条数：若将来按需拉取到的条数相同，说明精简列表字段未变，可跳过回写。
  _cacheHitLen = cached.data.length;
  // [重要] P1-2：此处**不再** `setTimeout(fetchFromAPI, 2500)` 无条件后台拉全量。
  // 缓存已满足「本地兜底」的最低需求（搜索兜底只用到 name/dynasty 等精简字段），
  // 而主路径（首屏随机 / 服务端搜索 / 详情接口）本就不依赖全量池。
  // 真需要完整 relations 时（服务端搜索失败、随机接口失败）由调用方 ensurePool() 按需拉。
  // 收益：正常冷启动省掉一次 1.94MB 全量请求 + 约 7700 次 JSON.parse + 4s 后的约 690KB 缓存写入。
  return true;
}

/**
 * 无可用缓存时：立即把 _allLoaded 置 true 并放行所有 onReady 等待者。
 *
 * [重要] P1-2 关键语义变更：`_allLoaded` 的判定由「**全量池**已就绪」改为「**缓存读取已完成**」。
 * 依据（3 个消费点已逐一核对）：
 *   · detail.js:508 / graph.js:260 —— `if (!isAllLoaded()) { showLoading(); figuresReady(cb) }`，
 *     而 cb 内的 resolveFigure(id) 查不到时会 fallbackToServer() ⇒「池为空」是**安全**状态；
 *     反之若 _allLoaded 永为 false，详情页会**永久停在 loading 转圈**（P1-2 最大的踩坑点）。
 *   · index.js:263 —— 同样带 else 分支，会走 _rebuildData()。
 * 附带收益：无缓存时详情页**立即**转服务端，不必再等全量池拉完（比改动前更快）。
 */
function _markReadyEmpty() {
  if (_allLoaded) return;
  _allLoaded = true;
  callReadyCallbacks();
}

function init() {
  // [重要] 冷启动关键路径优化：用**异步** wx.getStorage 读缓存。
  // 原先 onLaunch 里同步 wx.getStorageSync('figures_cache') 要读约 690KB 并反序列化，
  // 直接阻塞逻辑层（首屏白屏主因之一）。改异步后 onLaunch 立即返回，页面先出壳，
  // 缓存在回调里到达 —— 页面侧的 `if (!isAllLoaded()) figuresReady(cb)` 分支
  // 本就是为此设计的，会正确等待数据再渲染（见 index/detail/graph）。
  // [重要] P1-2 起语义：命中有效缓存 → 即时装载（**不再**后台拉全量）；未命中 → 立即置 ready（空池）。
  // 全量池一律由 ensurePool() 在真正需要兜底时按需加载。
  function loadFromCache() {
    try {
      if (!wx.getStorage) { _markReadyEmpty(); return; }
      wx.getStorage({
        key: 'figures_cache',
        success: function (res) {
          var hit = false;
          try { hit = applyCachedFigures(res && res.data); } catch (e) { hit = false; }
          if (!hit) _markReadyEmpty();
        },
        fail: function () { _markReadyEmpty(); }
      });
    } catch (e) {
      _markReadyEmpty();
    }
  }

  loadFromCache();
}

function onReady(callback) {
  if (_allLoaded) { wx.nextTick(callback); }
  else { _onReadyCallbacks.push(callback); }
}

function isAllLoaded() { return _allLoaded; }

// ---------- 导出 ----------
module.exports = {
  get figures() { return _figures; },
  getFigureById: getFigureById,
  getFigureRelations: getFigureRelations,
  RELATION_COLORS: RELATION_COLORS,
  init: init,
  onReady: onReady,
  onDataUpdate: function(cb) {
    _onUpdateCallbacks.push(cb);
    // 返回注销函数，防止内存泄漏
    return function() {
      var idx = _onUpdateCallbacks.indexOf(cb);
      if (idx >= 0) _onUpdateCallbacks.splice(idx, 1);
    };
  },
  isAllLoaded: isAllLoaded,
  // P1-2：按需加载全量池 —— 仅「兜底路径」调用（服务端搜索失败 / 随机接口失败）。
  // 正常路径（首屏随机、服务端搜索、详情接口）都不再触发全量拉取。
  ensurePool: ensurePool,
  isPoolLoaded: function() { return _poolLoaded; },
  getFetchFailed: function() { return _fetchFailed; },
  resetFetchFailed: function() { _fetchFailed = false; }
};
