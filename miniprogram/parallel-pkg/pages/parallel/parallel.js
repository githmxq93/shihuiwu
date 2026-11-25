const request = require('../../../utils/request');
const API = require('../../../config/api');
const { navTo } = require('../../../utils/nav');
const guide = require('../../../utils/guide');

// ── 域外数据：服务端优先，本地兜底 ──
// 服务端 /api/static/{world-figures,world-events,world-intros,world-regions}
// 是小程序与 web 共用的统一数据源；拉取失败回退本地模块，保证不白屏。
//
// 启动期优化（2026-11-09）：本地兜底副本（world-figures / world-events / world-intros
// 合计 ~250KB 源码）不再顶层 require —— 顶层 require 会在冷启动时即被解析、构造数组。
// 改为「仅在网络加载失败、需要回落时」才惰性 require 并缓存到模块级 LOCAL 对象：
// 网络成功时完全不触碰这三个本地副本。注意惰性 require 只省启动期解析，不省包体积。
const LOCAL = {
  WORLD_FIGURES: null,
  WORLD_EVENTS: null,
  WORLD_INTROS: null,
  REGION_INFO: null
};
let _localLoaded = false;
function ensureLocalFallback() {
  if (_localLoaded) return;
  _localLoaded = true;
  LOCAL.WORLD_FIGURES = require('./world-figures').WORLD_FIGURES;
  LOCAL.WORLD_EVENTS = require('./world-events').WORLD_EVENTS;
  LOCAL.WORLD_INTROS = require('./world-intros').WORLD_INTROS;
  LOCAL.REGION_INFO = require('./world-events').REGION_INFO;
}

// 初始为空：由 ensureLoaded() 用服务端数据填充；失败才回落到惰性加载的本地副本。
// 空数组/空对象可被所有渲染/筛选路径容忍（filter→[]、索引→undefined、Object.keys→[]）。
let WORLD_FIGURES = [];
let WORLD_EVENTS = [];
let WORLD_INTROS = {};
let REGION_INFO = {};

// ── 《中外历史对比年表》补充数据（本地分包，按需惰性解析）──
// 176 页原表约 1MB，冷启动不解析；首次进入结果页时同步 require 并拍平为事件数组。
let BOOK_EVENTS = null;
let _bookLoaded = false;
function ensureBookEvents() {
  if (_bookLoaded) return BOOK_EVENTS || [];
  _bookLoaded = true;
  try {
    const d = require('./book-events');
    const out = [];
    (d.blocks || []).forEach(function (b) {
      (b.world || []).forEach(function (w) {
        const src = w.src || {};
        out.push({
          year: w.year,
          yearKind: w.yearKind,
          region: w.region,
          country: w.country || '',
          title: w.title,
          desc: w.desc,
          page: src.page,
          row: src.row,
          blockYear: b.year
        });
      });
    });
    BOOK_EVENTS = out;
  } catch (e) {
    BOOK_EVENTS = [];
  }
  return BOOK_EVENTS;
}

// 走统一静态缓存层：4 个 world-* 请求享受版本化缓存 + 并发去重，命中不再重复下载。
// success 回调形态与改前一致（res.data 仍为 { success, data } 响应体）。
function loadStatic(name) {
  return new Promise(function (resolve) {
    request.getStatic(name, {
      timeout: 8000,
      success: function (res) {
        const d = res.data || {};
        resolve(d.success && d.data ? d.data : null);
      },
      fail: function () { resolve(null); }
    });
  });
}

let _loadPromise = null;
function ensureLoaded() {
  if (_loadPromise) return _loadPromise;
  _loadPromise = Promise.all([
    loadStatic('world-figures'),
    loadStatic('world-events'),
    loadStatic('world-intros'),
    loadStatic('world-regions')
  ]).then(function (r) {
    // 任一接口失败（r[i] 为 null）才惰性加载本地兜底副本，失败的项回落到本地数据；
    // 全部成功时完全不触碰本地副本，全量使用服务端数据（含 world-regions → REGION_INFO）。
    if (!r[0] || !r[1] || !r[2] || !r[3]) ensureLocalFallback();
    WORLD_FIGURES = r[0] || LOCAL.WORLD_FIGURES || WORLD_FIGURES;
    WORLD_EVENTS = r[1] || LOCAL.WORLD_EVENTS || WORLD_EVENTS;
    WORLD_INTROS = r[2] || LOCAL.WORLD_INTROS || WORLD_INTROS;
    REGION_INFO = r[3] || LOCAL.REGION_INFO || REGION_INFO;
  });
  return _loadPromise;
}

// 域外人物时间轴：一般人物用生卒年；生卒不详的君主用 reignStart/reignEnd 记在位
function figStart(f) { return f.birth != null ? f.birth : f.reignStart; }
function figEnd(f) { return f.death != null ? f.death : f.reignEnd; }
function figIsReign(f) { return f.birth == null && f.reignStart != null; }
function figLifeText(f) {
  const tail = f.title ? ' · ' + f.title : '';
  if (figIsReign(f)) {
    return '在位 ' + fmtYear(f.reignStart) + (f.reignEnd != null ? '—' + fmtYear(f.reignEnd) : '') + tail;
  }
  return fmtYear(f.birth) + '—' + fmtYear(f.death) + tail;
}

// 域外同期人物匹配（生卒/在位与区间相交，按时间中点距锚点远近排序）
function worldFiguresNear(anchorYear, opts) {
  opts = opts || {};
  const lo = (opts.lo != null) ? opts.lo : (anchorYear - 25);
  const hi = (opts.hi != null) ? opts.hi : (anchorYear + 25);
  const cap = (opts.cap != null) ? opts.cap : 20;
  return WORLD_FIGURES.filter(function (f) {
    const s = figStart(f), e = figEnd(f);
    return s != null && e != null && s <= hi && e >= lo;
  }).sort(function (a, b) {
    const ma = Math.abs((figStart(a) + figEnd(a)) / 2 - anchorYear);
    const mb = Math.abs((figStart(b) + figEnd(b)) / 2 - anchorYear);
    return ma - mb;
  }).slice(0, cap);
}

// 域外同期事件匹配（默认 ±25 年；人物锚点传 {lo,hi} 按生卒区间取数）
function worldEventsNear(year, opts) {
  const o = (typeof opts === 'number') ? { window: opts } : (opts || {});
  const w = o.window == null ? 25 : o.window;
  const lo = o.lo != null ? o.lo : year - w;
  const hi = o.hi != null ? o.hi : year + w;
  return WORLD_EVENTS.filter(function (it) {
    return it.year >= lo && it.year <= hi;
  }).sort(function (a, b) { return a.year - b.year; });
}

/* ════════════ 域外人物识别（与 web 端同一口径） ════════════ */
// 库里以非中土朝代标注的外国人：外国 / 天竺 / 罗马共和国 / 英国17世纪 …
const FOREIGN_DYN_RE = /外国|天竺|世纪|罗马|希腊|波斯|埃及|印度|美国|英国|法国|德国|意大利|西班牙|葡萄牙|荷兰|俄国|苏联|奥斯曼|阿拉伯|高丽|朝鲜|新罗|百济|越南|日本|突厥/;

function dynastyIsForeign(d) {
  const s = String(d == null ? '' : d).trim();
  return !!s && FOREIGN_DYN_RE.test(s);
}

// 在域外人物表里按中文名 / 英文名 / 异译匹配（本地数据，无需请求）
function matchWorldFigures(kw, cap) {
  const q = String(kw == null ? '' : kw).trim();
  if (!q) return [];
  const lower = q.toLowerCase();
  const hit = WORLD_FIGURES.filter(function (f) {
    const n = f.name || '';
    const en = String(f.en || '').toLowerCase();
    const alias = f.alias || [];
    return n.indexOf(q) >= 0 || (en && en.indexOf(lower) >= 0) ||
      alias.some(function (a) { return String(a).indexOf(q) >= 0; });
  });
  hit.sort(function (a, b) {
    const ra = a.name === q ? 0 : (a.name.indexOf(q) === 0 ? 1 : ((a.alias || []).indexOf(q) >= 0 ? 1 : 2));
    const rb = b.name === q ? 0 : (b.name.indexOf(q) === 0 ? 1 : ((b.alias || []).indexOf(q) >= 0 ? 1 : 2));
    if (ra !== rb) return ra - rb;
    return String(a.name || '').length - String(b.name || '').length;
  });
  return hit.slice(0, cap == null ? 5 : cap);
}

function worldSuggestItem(f) {
  const ri = REGION_INFO[f.region] || {};
  return {
    key: 'w:' + f.name,
    id: '',
    name: f.name,
    dynasty: '',
    kind: 'world',
    regionLabel: ri.label || f.region,
    dynLabel: ri.label || f.region,
    life: figLifeText(f),
    worldName: f.name
  };
}

function worldFigureView(f, regionLabel) {
  return {
    name: f.name,
    alias: f.alias || [],
    en: f.en || '',
    region: f.region,
    regionLabel: regionLabel,
    lifeText: figLifeText(f),
    title: f.title || '',
    desc: f.desc || '',
    impact: f.impact || ''
  };
}

/* ════════════ 工具函数（与 timeline 同源，避免跨包依赖） ════════════ */
const GAN = '甲乙丙丁戊己庚辛壬癸';
const ZHI = '子丑寅卯辰巳午未申酉戌亥';
function ganzhiOf(y) {
  const yy = y < 0 ? y + 1 : y;
  return GAN.charAt((((yy - 4) % 10) + 10) % 10) + ZHI.charAt((((yy - 4) % 12) + 12) % 12);
}
function fmtYear(y) { return y < 0 ? '前' + (-y) : String(y); }
function fmtYearFull(y) { return y < 0 ? '公元前 ' + (-y) + ' 年' : '公元 ' + y + ' 年'; }

const CHINA_MIN = -3000;
const CHINA_MAX = 2026;

// 中土同期：按类别分组取前若干条（与大事年表 KIND 一致）
const KIND_ORDER = ['event', 'birth', 'death', 'office', 'jinshi'];
const KIND_LABEL = { event: '要事', birth: '生', death: '卒', jinshi: '登第', office: '任职' };
const KIND_LIMIT = { event: 8, birth: 3, death: 3, office: 2, jinshi: 2 };

// 年号按政权归堆（与 timeline 同源）
function groupEras(eras) {
  const out = { main: '', others: '' };
  if (!eras || !eras.length) return out;
  const map = {};
  const order = [];
  eras.forEach(function (e) {
    if (!map[e.polity]) { map[e.polity] = { labels: [], primary: false }; order.push(e.polity); }
    map[e.polity].labels.push(e.label);
    if (e.primary) map[e.polity].primary = true;
  });
  const others = [];
  order.forEach(function (p) {
    const it = map[p];
    if (it.primary) { if (!out.main) out.main = it.labels.join('／'); }
    else others.push(p + ' ' + it.labels[it.labels.length - 1]);
  });
  out.others = others.join(' · ');
  return out;
}

// 人物库里检索不到该年编年记载时的兜底：仍可显示干支与朝代
function decorateChinaItem(it) {
  return {
    id: it.id || '',
    kind: it.kind || '',
    name: it.name || '',          // 人物名（要事类的主角）
    eventTitle: it.title || '',   // 事件标题（要事类：拜相 / 赤壁之游作赋…）
    type: it.type || '',          // 标签：要事 / 生 / 卒 / 任职 / 登第
    desc: it.desc || '',
    dynasty: it.dynasty || ''
  };
}

// 年份解析：支持「前221 / 公元前221年 / 221 / -221」
function parseYear(raw) {
  let m = raw.match(/^公元前\s*(\d{1,4})\s*年?$/) || raw.match(/^前\s*(\d{1,4})\s*年?$/) || raw.match(/^-\s*(\d{1,4})$/);
  if (m) return -Number(m[1]);
  m = raw.match(/(?:^|[^\d])(\d{1,4})\s*年?$/);
  if (m) return Number(m[1]);
  return null;
}

// 把接口返回的生卒字段解析为整数年份。
// 接口存在两种格式：数字 701，或字符串「公元前259年」「701年」「公元701年」。
// 旧代码用 typeof === 'number' 判断，会漏掉字符串格式（如秦始皇），导致「生年不详」。
function parseYearNum(v) {
  if (typeof v === 'number') return isFinite(v) ? v : null;
  const s = String(v == null ? '' : v).trim();
  if (!s || s === '?' || s === '不详' || s === '-') return null;
  const t = s.replace(/^约|^大约|^约在/, '');
  let neg = false;
  let core = t;
  if (/^公元前|^前/.test(core)) { neg = true; core = core.replace(/^公元前|^前/, ''); }
  else if (/^公元/.test(core)) { core = core.replace(/^公元/, ''); }
  const m = core.match(/^\s*(\d{1,4})\s*年?$/);
  if (!m) return null;
  const n = Number(m[1]);
  if (!isFinite(n)) return null;
  return neg ? -n : n;
}

// 域外同期容差（年）：标题、空态、提示文案统一用它，避免「该年」与实际口径打架
const WORLD_WINDOW = 25;

// 热门人物（仅存名字，点击后按名检索取 id，避免硬编码 id）
// no 为两位序号：原来在 wxml 里拼 `0{{index+1}}`，热门超过 9 个会显示「010」
const HOT_PEOPLE = [
  { name: '李白', badge: '李' }, { name: '苏轼', badge: '苏' }, { name: '武则天', badge: '武' },
  { name: '诸葛亮', badge: '诸' }, { name: '秦始皇', badge: '秦' }, { name: '王羲之', badge: '王' }
].map(function (p, i) {
  return { name: p.name, badge: p.badge, no: ('0' + (i + 1)).slice(-2) };
});

// 快捷年份锚点
const YEAR_PICKS = [
  { y: -221, label: '前221', tag: '秦统一' },
  { y: 618, label: '618', tag: '唐建立' },
  { y: 755, label: '755', tag: '安史之乱' },
  { y: 1082, label: '1082', tag: '北宋' },
  { y: 1279, label: '1279', tag: '元建立' },
  { y: 1368, label: '1368', tag: '明建立' },
  { y: 1644, label: '1644', tag: '清入关' },
  { y: 1840, label: '1840', tag: '鸦片战争' },
  { y: 1911, label: '1911', tag: '辛亥革命' }
];

Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 96,

    // 选择区
    mode: 'select',        // 'select' | 'result'
    anchorTab: 'person',   // 选择区子标签：'person' | 'year'
    personQuery: '',
    suggests: [],
    showSuggests: false,
    personFocused: false,
    yearInput: '',
    yearInputErr: '',
    hotPeople: HOT_PEOPLE,
    yearPicks: YEAR_PICKS,
    skeletonRows: [1, 2, 3],

    // 结果区
    loading: false,
    loadFailed: false,
    view: 'parallel',      // 'parallel' | 'map'
    anchorType: '',
    anchorYear: null,
    yearBasis: '',         // 'birth' | 'death' | 'year'
    selectedPerson: null,  // { id, name, dynasty, birthYear, deathYear, anchorYear, yearBasis }
    worldPerson: null,     // 域外人物锚点 { name, en, regionLabel, birthYear, deathYear, anchorYear, lifeText, desc }
    yearLabel: '',
    yearFull: '',
    ganzhi: '',
    eraMain: '',
    chinaEvents: [],
    worldEvents: [],
    // chinaCount = 实际展示条数（每类按 KIND_LIMIT 截断后的合计）
    // chinaTotal = 该年全部条数（接口 d.total），指标卡与列头用这个，避免系统性低估
    chinaCount: 0,
    chinaTotal: 0,
    chinaPeople: 0,
    chinaTruncated: false,
    // 「这一年，谁在场」入口计数：birth / death 取 counts 全量，people 取该年涉及人数。
    // whoNums 是过滤掉 0 值后的展示数组（某年没有出生或离世记录时退化为两项）。
    whoBirth: 0,
    whoDeath: 0,
    whoPeople: 0,
    whoNums: [],
    worldCount: 0,
    worldWindow: WORLD_WINDOW,
    worldWindowShort: '±' + WORLD_WINDOW,
    worldWindowLabel: '域外容差',
    worldWindowNote: '前后 ' + WORLD_WINDOW + ' 年',
    worldFigures: [],
    worldFigureCount: 0,
    eraOthers: '',
    mapRegions: [],
    expandedRegion: null,

    // scroll-view 程序化滚动目标（清空后重新赋值才会再次触发）
    scrollInto: '',
    // scroll-view 的精确滚动位置：引导要把锚点滚进视口时用（scroll-into-view 会顶到导航条底下）
    scrollTopVal: 0,
    showTop: false,

    // 分享长图文案
    shareTitle: '',

    // 长按浮层：人物 / 事件 介绍卡
    detailPop: { show: false, kind: '', title: '', sub: '', body: '', impact: '', figureId: '', loading: false }
  },

  /* ── 生命周期 ── */
  onLoad(query) {
    // 窗口信息由 app.js onLaunch 统一缓存，避免每个页面各读一次同步系统信息。
    const statusBar = getApp().globalData.statusBarHeight || 44;
    this.setData({ safeAreaTop: statusBar, navBarHeight: statusBar + 44 + 8 });

    // 拉取服务端统一域外数据（失败自动回退本地）。
    // 本地副本改为惰性加载后，缓存未命中的首次冷启动存在极短空窗：4 个 world-*
    // 请求返回前 WORLD_* 为空，若用户恰好此时输入搜索词，域外联想会算出空结果。
    // 数据到位后，仅在「输入框仍有关键词且仍聚焦」时补算一次，避免要用户再操作
    // 一次才恢复；正常路径（无输入 / 缓存命中）零开销、零额外 setData。
    const that = this;
    ensureLoaded().then(function () {
      const kw = (that.data.personQuery || '').trim();
      if (!kw || !that.data.personFocused) return;
      // 递增序号让空窗期在途的 autocomplete 回调失效，避免它用旧结果覆盖补算
      that._suggestSeq = (that._suggestSeq || 0) + 1;
      that._fetchSuggest(kw);
    });

    // 支持从详情页等带入参数：figureId / wfig（域外人物）/ year，直接进入结果
    if (query && query.figureId) {
      this.fetchFigure(query.figureId);
    } else if (query && query.wfig) {
      const nm = decodeURIComponent(query.wfig);
      ensureLoaded().then(function () { that.setWorldAnchorByName(nm); });
    } else if (query && query.person) {
      // 对照页搜索人物后跳到这里：按姓名走原有联想（域外人物优先），落到结果区
      const nm = decodeURIComponent(query.person);
      ensureLoaded().then(function () { that.pickPersonByName(nm); });
    } else if (query && query.year != null && query.year !== '') {
      const y = Number(query.year);
      if (isFinite(y)) {
        // 等统一数据就位后再渲染，避免带参进入时用了本地旧数据
        ensureLoaded().then(function () { that.setAnchorYear(y); });
      }
    }
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
  },

  onReady() {
    // 选择区 3 步：等首帧渲染完再起引导，避免遮罩压在还没画出来的锚点卡上。
    // 2026-11-24：默认入口移到 compare 页，`parallel` 这个 key 改讲对照页；
    // 本页（选人物 / 选年份）改用 parallelSelect，文案仍是原来的 4 步。
    this._tryAutoGuide('parallelSelect', 500, 'select');
  },

  onUnload() {
    if (this._guideTimer) clearTimeout(this._guideTimer);
    this._guideTimer = null;
  },

  /**
   * 引导启动：只有该 key 未完成（或有「重看」标记）才拉起。
   * mode 用于区分同一路由的两种状态——入口 3 步只在 select 态出现。
   */
  _tryAutoGuide(key, delay, mode) {
    if (!guide.shouldShow(key) && !guide.hasReplay(key)) return;
    if (this._guideTimer) clearTimeout(this._guideTimer);
    this._guideTimer = setTimeout(() => {
      this._guideTimer = null;
      if (mode && this.data.mode !== mode) return;
      const layer = this.selectComponent('#guideLayer');
      if (layer) layer.autoStart(key);
    }, typeof delay === 'number' ? delay : 500);
  },

  /**
   * 引导需要把某个锚点滚进视口时由 guide-layer 触发。
   * 本页主体是 scroll-view（不是页面滚动），组件拿不到它的 scrollTop：
   *   · 用 scroll-into-view 会把目标顶到 scroll-view 顶端、被悬浮导航条盖住；
   *   · 所以这里按「scroll-view 矩形 + 锚点矩形」算出目标 scrollTop，再写给 scroll-top，
   *     并给顶部导航和底部卡片留出空间。
   */
  onGuideScrollTo(e) {
    const selector = (e && e.detail && e.detail.selector) || '';
    if (!selector) return;
    // 引导每 180ms 会重试一次；scroll-with-animation 期间量到的还是旧位置，
    // 连发会把滚动距离叠加成过冲，这里 500ms 内只认第一次。
    const now = Date.now();
    if (now - (this._guideScrollAt || 0) < 500) return;
    this._guideScrollAt = now;
    const that = this;
    const navH = this.data.navBarHeight || 96;
    const reserve = 300; // 给引导卡片留的高度（卡片最高约 240 + 间隙与边距），避免滚到底后卡片没地方放
    wx.createSelectorQuery()
      .select('.body')
      .boundingClientRect()
      .select(selector)
      .boundingClientRect()
      .exec(function (res) {
        const view = res && res[0];
        const rect = res && res[1];
        if (!view || !rect) return;
        const topLimit = view.top + navH + 16;
        const bottomLimit = view.top + view.height - reserve;
        const cur = that._lastTop || 0;
        let next = cur;
        if (rect.top < topLimit) next = cur - (topLimit - rect.top);
        else if (rect.bottom > bottomLimit) next = cur + (rect.bottom - bottomLimit);
        next = Math.max(0, Math.round(next));
        if (Math.abs(next - cur) < 2) return;
        // 与回顶同一套写法：先把 scroll-top 对齐当前值，再设新值，确保值变化触发滚动
        that.setData({ scrollTopVal: cur }, function () {
          that.setData({ scrollTopVal: next });
        });
      });
  },

  /* ── 选择区：子标签切换 ── */
  onSwitchAnchorTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === this.data.anchorTab) return;
    this.setData({ anchorTab: tab, suggests: [], showSuggests: false, yearInputErr: '' });
  },

  /* ── 选择区：人物搜索联想（复用查询页同一接口范式） ── */
  onPersonInput(e) {
    const raw = e.detail.value || '';
    this.setData({ personQuery: raw });
    this._fetchSuggest(raw);
  },
  onClearPerson() {
    if (this._suggestTimer) clearTimeout(this._suggestTimer);
    this._suggestSeq = (this._suggestSeq || 0) + 1;
    this.setData({ personQuery: '', suggests: [], showSuggests: false });
  },
  _fetchSuggest(raw) {
    const kw = (raw || '').trim();
    if (this._suggestTimer) clearTimeout(this._suggestTimer);
    if (!kw) {
      this._suggestSeq = (this._suggestSeq || 0) + 1;
      this.setData({ suggests: [], showSuggests: false });
      return;
    }
    const reqId = (this._suggestSeq = (this._suggestSeq || 0) + 1);
    const that = this;
    // 域外命中在本地人物表里，先出结果，不必等接口
    const wItems = matchWorldFigures(kw).map(worldSuggestItem);
    this.setData({ suggests: wItems, showSuggests: wItems.length > 0 });
    this._suggestTimer = setTimeout(function () {
      request({
        timeout: 5000,
        url: API.FIGURES.AUTOCOMPLETE + '?prefix=' + encodeURIComponent(kw) + '&limit=8',
        success: function (res) {
          if (reqId !== that._suggestSeq) return;
          const d = res.data || {};
          const list = (d.success && Array.isArray(d.data)) ? d.data : [];
          // 同名以域外为准：库里同名的中土记录多是域外人物的重复档（哥伦布 / 牛顿 / 洛克 …）
          const used = {};
          wItems.forEach(function (w) { used[w.name] = 1; });
          const rest = [];
          list.forEach(function (f) {
            if (!f || !f.name || used[f.name]) return;
            used[f.name] = 1;
            const foreign = dynastyIsForeign(f.dynasty);
            rest.push({
              key: 'c:' + f.id,
              id: f.id,
              name: f.name,
              dynasty: f.dynasty || '',
              kind: foreign ? 'world' : 'china',
              regionLabel: foreign ? (f.dynasty || '域外') : '',
              dynLabel: f.dynasty || '',
              life: '',
              worldName: ''
            });
          });
          const merged = wItems.concat(rest).slice(0, 10);
          that.setData({ suggests: merged, showSuggests: merged.length > 0 });
        },
        fail: function () {
          if (reqId !== that._suggestSeq) return;
          that.setData({ showSuggests: wItems.length > 0 });
        }
      });
    }, 200);
  },
  onTapSuggest(e) {
    const item = this.data.suggests[Number(e.currentTarget.dataset.index)];
    if (!item) return;
    if (this._suggestTimer) clearTimeout(this._suggestTimer);
    this._suggestSeq = (this._suggestSeq || 0) + 1;
    this.setData({ suggests: [], showSuggests: false, personQuery: item.name });
    // 域外人物只落右列：命中人物表直接以生年为锚
    if (item.worldName) { this.setWorldAnchorByName(item.worldName); return; }
    if (item.id) this.fetchFigure(item.id);
  },
  onPersonFocus() {
    this.setData({ personFocused: true });
    if (this.data.suggests.length && (this.data.personQuery || '').trim()) {
      this.setData({ showSuggests: true });
    }
  },
  onPersonBlur() {
    this.setData({ personFocused: false });
    const that = this;
    if (this._blurTimer) clearTimeout(this._blurTimer);
    this._blurTimer = setTimeout(function () {
      if (that.data.showSuggests) that.setData({ showSuggests: false });
    }, 180);
  },
  onSugPanelTap() {},
  // 热门人物：按名检索取 id → 取生年
  onTapHotPerson(e) {
    const name = e.currentTarget.dataset.name;
    if (!name) return;
    this.pickPersonByName(name);
  },
  pickPersonByName(name) {
    if (this.setWorldAnchorByName(name)) return;
    const that = this;
    request({
      timeout: 5000,
      url: API.FIGURES.AUTOCOMPLETE + '?prefix=' + encodeURIComponent(name) + '&limit=8',
      success: function (res) {
        const d = res.data || {};
        const list = (d.success && Array.isArray(d.data)) ? d.data : [];
        const hit = list.filter(function (it) { return it.name === name; })[0] || list[0];
        if (hit && hit.id) that.fetchFigure(hit.id);
        else wx.showToast({ title: '未找到「' + name + '」', icon: 'none' });
      },
      fail: function () {
        wx.showToast({ title: '检索失败，请重试', icon: 'none' });
      }
    });
  },

  /* ── 域外人物为锚：只落右列，不占中土人物槽位 ── */
  setWorldAnchorByName(name) {
    const f = WORLD_FIGURES.filter(function (x) { return x.name === name || (x.alias || []).indexOf(name) >= 0; })[0];
    if (!f) return false;
    const ri = REGION_INFO[f.region] || {};
    this.setAnchor('world-person', {
      name: f.name,
      alias: f.alias || [],
      en: f.en || '',
      regionLabel: ri.label || f.region,
      birthYear: figStart(f),
      deathYear: figEnd(f),
      anchorYear: figStart(f),
      yearBasis: figIsReign(f) ? 'reign' : 'birth',
      lifeText: figLifeText(f),
      title: f.title || '',
      desc: f.desc || '',
      impact: f.impact || ''
    });
    return true;
  },

  /* ── 取人物详情（用于拿生年作锚点） ── */
  fetchFigure(id) {
    const that = this;
    wx.showLoading({ title: '查询中', mask: true });
    request({
      timeout: 10000,
      url: API.FIGURES.GET(id),
      success: function (res) {
        wx.hideLoading();
        const d = res.data || {};
        const f = (d.success && d.data) ? d.data : null;
        if (!f) { wx.showToast({ title: '人物信息缺失', icon: 'none' }); return; }
        const b = parseYearNum(f.birthYear);
        const dt = parseYearNum(f.deathYear);
        let anchorYear = b;
        let yearBasis = 'birth';
        if (anchorYear == null && dt != null) { anchorYear = dt; yearBasis = 'death'; }
        const person = {
          id: id,
          name: f.name || '',
          dynasty: f.dynasty || '',
          birthYear: b,
          deathYear: dt,
          anchorYear: anchorYear,
          yearBasis: yearBasis,
          bio: f.bio || f.fullBio || f.intro || ''
        };
        if (anchorYear == null) {
          wx.showToast({ title: '该人物生卒年不详，请改用年份查询', icon: 'none' });
          that.setData({ anchorTab: 'year' });
          return;
        }
        // 库里以非中土朝代标注的外国人：改走域外锚点，避免出现在中土列
        if (dynastyIsForeign(f.dynasty)) {
          that.setAnchor('world-person', {
            name: f.name || '',
            en: '',
            regionLabel: f.dynasty || '域外',
            birthYear: b,
            deathYear: dt,
            anchorYear: anchorYear,
            yearBasis: yearBasis,
            lifeText: (b != null ? fmtYearFull(b) : '生年不详') + (dt != null ? '—' + fmtYearFull(dt) : ''),
            title: '',
            desc: f.bio || f.fullBio || f.intro || '',
            impact: ''
          });
          return;
        }
        that.setAnchor('person', person);
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: '网络异常，请重试', icon: 'none' });
      }
    });
  },

  /* ── 选择区：年份输入 ── */
  onYearInput(e) {
    this.setData({ yearInput: e.detail.value, yearInputErr: '' });
  },
  onYearSubmit() {
    const raw = String(this.data.yearInput || '').trim();
    if (!raw) return;
    const y = parseYear(raw);
    if (y == null) { this.setData({ yearInputErr: '请输入年份，如 1101、前221' }); return; }
    if (y < CHINA_MIN || y > CHINA_MAX) {
      this.setData({ yearInputErr: '收录范围 ' + fmtYear(CHINA_MIN) + ' — ' + fmtYear(CHINA_MAX) });
      return;
    }
    this.setAnchorYear(y);
  },
  onTapYearPick(e) {
    const y = Number(e.currentTarget.dataset.y);
    if (isFinite(y)) this.setAnchorYear(y);
  },

  /* ── 设定锚点并加载同期数据 ── */
  setAnchorYear(year) {
    this.setAnchor('year', null, year);
  },
  setAnchor(type, person, yearArg) {
    const isPerson = type === 'person' || type === 'world-person';
    const y = isPerson ? (person && person.anchorYear) : yearArg;
    if (y == null || !isFinite(y)) return;
    const yearBasis = isPerson ? (person && person.yearBasis) : 'year';

    // 人物锚点：事件改按生卒区间取数，前后各留 2 年；年份锚点仍为 ±25
    const lifeSpan = (isPerson && person && person.birthYear != null && person.deathYear != null)
      ? { lo: person.birthYear - 2, hi: person.deathYear + 2 }
      : null;
    // 原「域外同期」条目：保持原字段与渲染方式不变
    const base = worldEventsNear(y, lifeSpan || {}).map(function (e) {
      const ri = (REGION_INFO[e.region] || {}).intro || '';
      return {
        year: e.year,
        region: e.region,
        regionLabel: (REGION_INFO[e.region] || {}).label || e.region,
        country: '',
        title: e.title,
        desc: e.desc,
        impact: e.impact || '',
        intro: WORLD_INTROS[e.year + '|' + e.title] || '',
        regionIntro: ri,
        diff: e.year - y
      };
    });

    // 《中外历史对比年表》补充条目：同一 ±窗口（人物锚点用生卒区间）内并入。
    // 地区维度：沿用现有 region key；新增 country 仅作展示，不改变原条目的 region。
    const lo = lifeSpan ? lifeSpan.lo : y - WORLD_WINDOW;
    const hi = lifeSpan ? lifeSpan.hi : y + WORLD_WINDOW;
    let book = ensureBookEvents().filter(function (e) {
      return e.year >= lo && e.year <= hi;
    }).map(function (e) {
      const ri = (REGION_INFO[e.region] || {}).intro || '';
      return {
        year: e.year,
        region: e.region,
        regionLabel: (REGION_INFO[e.region] || {}).label || (e.region === 'world' ? '国际' : '其他'),
        country: e.country,
        title: e.title,
        desc: e.desc,
        impact: '',
        intro: '',
        regionIntro: ri,
        diff: e.year - y,
        fromBook: true,
        bookPage: e.page,
        approx: e.yearKind === 'anchor'
      };
    });
    // 近现代原书条目极密（1900 年前后同窗口可达百余条），只取离锚点最近的 12 条，
    // 保证原有域外条目一条不少，页面也不被年表条目淹没。
    book.sort(function (a, b) {
      const da = Math.abs(a.diff), db = Math.abs(b.diff);
      if (da !== db) return da - db;
      if (a.approx !== b.approx) return a.approx ? 1 : -1;
      return a.year - b.year;
    });
    if (book.length > 12) book = book.slice(0, 12);

    // 同年同题只留一条（原条目优先）；排序仍以离锚点年远近为主，同年原条目在前。
    const seenEv = {};
    const we = base.concat(book).filter(function (e) {
      const k = e.year + '|' + e.title;
      if (seenEv[k]) return false;
      seenEv[k] = 1;
      return true;
    }).sort(function (a, b) {
      const da = Math.abs(a.diff), db = Math.abs(b.diff);
      if (da !== db) return da - db;
      if (!!a.fromBook !== !!b.fromBook) return a.fromBook ? 1 : -1;
      return a.year - b.year;
    });

    // 域外同期人物：选人物时用其生卒为区间（更贴合「同代」），选年份时默认 ±25
    const figOpts = (isPerson && person && person.birthYear != null && person.deathYear != null)
      ? { lo: person.birthYear, hi: person.deathYear }
      : { lo: y - WORLD_WINDOW, hi: y + WORLD_WINDOW };
    let wf = worldFiguresNear(y, figOpts).map(function (f) {
      return worldFigureView(f, (REGION_INFO[f.region] || {}).label || f.region);
    });

    // 域外锚点人物置顶高亮，并从同代列表里去重
    if (type === 'world-person' && person) {
      const anchorCard = {
        name: person.name,
        alias: person.alias || [],
        en: person.en || '',
        region: '',
        regionLabel: person.regionLabel,
        lifeText: person.lifeText,
        title: person.title || '',
        desc: person.desc || '',
        impact: person.impact || '',
        isAnchor: true
      };
      wf = [anchorCard].concat(wf.filter(function (f) { return f.name !== person.name; }));
    }

    this.setData({
      mode: 'result',
      anchorType: type,
      selectedPerson: type === 'person' ? person : null,
      worldPerson: type === 'world-person' ? person : null,
      anchorYear: y,
      yearBasis: yearBasis,
      yearLabel: fmtYear(y),
      yearFull: fmtYearFull(y),
      ganzhi: ganzhiOf(y),
      loading: true,
      loadFailed: false,
      // 在地图视图里换锚点时保持当前视图，不再强行跳回双流
      view: this.data.mode === 'result' ? this.data.view : 'parallel',
      expandedRegion: null,
      worldEvents: we,
      worldCount: we.length,
      worldWindowShort: lifeSpan ? '±2' : '±' + WORLD_WINDOW,
      worldWindowLabel: lifeSpan ? (yearBasis === 'reign' ? '在位容差' : '生卒容差') : '域外容差',
      worldWindowNote: lifeSpan
        ? (yearBasis === 'reign' ? '在位区间' : '生卒区间') + '前后各 2 年（' + fmtYear(lifeSpan.lo) + '—' + fmtYear(lifeSpan.hi) + '）'
        : '前后 ' + WORLD_WINDOW + ' 年',
      worldFigures: wf,
      worldFigureCount: wf.length,
      chinaEvents: [],
      chinaCount: 0,
      chinaTotal: 0,
      chinaPeople: 0,
      whoBirth: 0,
      whoDeath: 0,
      whoPeople: 0,
      whoNums: [],
      eraOthers: '',
      eraMain: type === 'person' ? ((person && person.dynasty) || '') : '',
      shareTitle: ''
    });
    this._buildMap(y, person, we);
    this._loadChina(y);
    // 双流视图有二十余张卡、地图只有一屏：不归零时切视图会被限制在旧位置，首屏锚点卡看不到
    this._scrollTo('body-top');
    // 结果区 2 步：入口与结果同路由但状态切换，选择动作又会被引导遮罩拦住，
    // 所以结果页引导单独一个 key，等结果首帧出来后再拉起。
    this._tryAutoGuide('parallelResult', 700, 'result');
  },

  /* 中土同期：复用大事年表接口 */
  _loadChina(year) {
    const that = this;
    const seq = this._seq = (this._seq || 0) + 1;
    request({
      timeout: 10000,
      url: API.TIMELINE.YEAR(year),
      success: function (res) {
        if (seq !== that._seq) return;
        const body = res.data || {};
        const d = body.data || {};
        const ge = groupEras(d.eras);
        const dynName = (d.dynasties && d.dynasties[0] && d.dynasties[0].name) || '';
        const eraMain = ge.main || dynName || '';

        let china = [];
        // 已在域外人物表中的人，不在中土列重复出现（哥伦布 / 牛顿 / 伽利略 …）
        const worldNames = {};
        WORLD_FIGURES.forEach(function (f) { worldNames[f.name] = 1; });
        let removed = 0;
        const removedNames = {};
        if (body.success && d.counts) {
          KIND_ORDER.forEach(function (k) {
            const list = (d.groups && d.groups[k]) || [];
            const kept = [];
            list.forEach(function (it) {
              if (it && it.name && worldNames[it.name]) { removed++; removedNames[it.name] = 1; return; }
              kept.push(it);
            });
            kept.slice(0, KIND_LIMIT[k] || 3).forEach(function (it) {
              china.push(decorateChinaItem({
                id: it.id || '',
                kind: k,
                name: it.name || '',
                title: it.title || '',
                type: KIND_LABEL[k],
                desc: it.desc || '',
                dynasty: it.dynasty || ''
              }));
            });
          });
        }
        // 保留原有纪年取舍逻辑，同时补充 UI 需要的统计与并存纪年
        const keepEra = (!eraMain && that.data.anchorType !== 'person') ? '' : eraMain;
        const others = String(ge.others || '');
        // d.total 是该年全部条数、d.people 是涉及人数；china.length 只是按类别截断后的展示条数。
        // 指标卡与列头写「N 条记载」必须用 total，否则大年（如 1644）会被系统性低估。
        const total = Math.max(0, (Number(d.total) || china.length) - removed);
        const people = Math.max(0, (Number(d.people) || 0) - Object.keys(removedNames).length);
        // 失败响应（如年份越界）没有 counts，入口计数统一取空对象，避免读 undefined
        const cnt = (body.success && d.counts) || {};
        that.setData({
          eraMain: keepEra,
          loading: false,
          chinaEvents: china,
          chinaCount: china.length,
          chinaTotal: total,
          chinaPeople: people,
          chinaTruncated: total > china.length,
          whoBirth: Number(cnt.birth) || 0,
          whoDeath: Number(cnt.death) || 0,
          whoPeople: people,
          whoNums: that._buildWhoNums(Number(cnt.birth) || 0, Number(cnt.death) || 0, people),
          eraOthers: others.length > 80 ? others.slice(0, 80) + '…' : others,
          shareTitle: that._buildShareTitle(eraMain)
        });
      },
      fail: function () {
        if (seq !== that._seq) return;
        that.setData({ loading: false, loadFailed: true, chinaEvents: [], chinaCount: 0, chinaTotal: 0, chinaPeople: 0, eraOthers: '', whoBirth: 0, whoDeath: 0, whoPeople: 0, whoNums: [] });
      }
    });
  },

  // 入口计数：过滤 0 值（某年无出生/离世记录时只显示剩余项），措辞固定「离世 / 有记载」
  _buildWhoNums(birth, death, people) {
    const out = [];
    if (birth > 0) out.push({ key: 'birth', v: birth, l: '出生', tone: 'gold' });
    if (death > 0) out.push({ key: 'death', v: death, l: '离世', tone: 'grey' });
    if (people > 0) out.push({ key: 'people', v: people, l: '有记载', tone: '' });
    return out;
  },

  _buildShareTitle(eraMain) {
    const y = this.data.anchorYear;
    let who = '';
    if (this.data.anchorType === 'person' && this.data.selectedPerson) {
      who = this.data.selectedPerson.name + ' 在世时，';
    } else if (this.data.anchorType === 'world-person' && this.data.worldPerson) {
      who = this.data.worldPerson.name + ' 生年，';
    }
    return who + fmtYearFull(y) + (eraMain ? '（' + eraMain + '）' : '') + '，中土与世界同期 · 世慧屋中外对照';
  },

  /* 地图视图：把域外事件按文明区域落到按真实经纬度绘制的世界地图上。
     锚点 x/y 落在对应大陆，标签 lx/ly 扇出避让，两者由 canvas 细引线相连。 */
  _buildMap(y, person, we) {
    const regions = [];
    regions.push({
      key: 'china', label: '中土', sub: (person && person.dynasty) || '中华',
      x: 80.0, y: 31.1, lx: 83, ly: 14, tone: 'china', hasEv: true, events: []
    });
    const by = {};
    we.forEach(function (e) { (by[e.region] = by[e.region] || []).push(e); });
    Object.keys(REGION_INFO).forEach(function (rk) {
      const info = REGION_INFO[rk];
      const evs = (by[rk] || []).map(function (e) {
        return { title: e.title, desc: e.desc, impact: e.impact || '', year: e.year, diff: e.diff };
      });
      regions.push({
        key: rk, label: info.label,
        x: info.x, y: info.y, lx: info.lx, ly: info.ly,
        tone: 'world', hasEv: !!evs.length, events: evs
      });
    });
    this.setData({ mapRegions: regions }, () => { this._drawArcs(); });
  },

  _drawArcs() {
    if (this.data.view !== 'map') return;
    const regions = this.data.mapRegions;
    if (!regions.length) return;
    wx.createSelectorQuery().in(this).select('#arcCanvas').fields({ node: true, size: true }).exec(function (res) {
      if (!res || !res[0] || !res[0].node) return;
      const canvas = res[0].node;
      const ctx = canvas.getContext('2d');
      const info = (wx.getWindowInfo && wx.getWindowInfo()) || wx.getSystemInfoSync();
      const dpr = info.pixelRatio || 2;
      const w = res[0].width, h = res[0].height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);
      const china = regions.filter(function (r) { return r.key === 'china'; })[0];
      if (!china) return;
      const cx = china.x / 100 * w, cy = china.y / 100 * h;

      // ① 锚点 → 标签的细引线：标签散开后仍看得出归属
      ctx.strokeStyle = 'rgba(139,120,92,0.34)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 3]);
      regions.forEach(function (r) {
        if (!r.lx || !r.ly) return;
        ctx.beginPath();
        ctx.moveTo(r.x / 100 * w, r.y / 100 * h);
        ctx.lineTo(r.lx / 100 * w, r.ly / 100 * h);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // ② 同时性弧线：中土 → 有同期事件的域外文明锚点（橙→青渐变）
      regions.forEach(function (r) {
        if (r.key === 'china' || !r.events.length) return;
        const x2 = r.x / 100 * w, y2 = r.y / 100 * h;
        const mx = (cx + x2) / 2, my = (cy + y2) / 2;
        const dx = x2 - cx, dy = y2 - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const off = Math.min(34, dist * 0.28);
        const grad = ctx.createLinearGradient(cx, cy, x2, y2);
        grad.addColorStop(0, 'rgba(181,113,58,0.55)');
        grad.addColorStop(1, 'rgba(63,107,104,0.50)');
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(mx, my - off, x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    });
  },

  onTapRegion(e) {
    const key = e.currentTarget.dataset.key;
    // 中土不在域外点位口径内（china.events 恒为空）：点它应切回双流看中土编年，
    // 而不是弹「该年暂无同期记载」——左边十几张中土卡片就在那儿，提示自相矛盾。
    if (key === 'china') {
      this._goParallel();
      return;
    }
    const reg = this.data.mapRegions.filter(function (r) { return r.key === key; })[0];
    if (!reg) return;
    if (!reg.events.length) {
      // 无同期记载的点位不是死链：改看该文明背景，把无效点击变成有用信息
      this._openRegionIntro(key, reg.label);
      return;
    }
    this.setData({ expandedRegion: reg }, () => { this._scrollTo('region-detail'); });
  },

  // 回到双流视图（地图里点中土 / 空态出口共用）
  _goParallel() {
    if (this.data.view === 'parallel') {
      this._scrollTo('guide-pp-view');
      return;
    }
    this.setData({ view: 'parallel', expandedRegion: null }, () => { this._scrollTo('guide-pp-view'); });
  },

  // 该文明 ±N 年内没有同期记载时，展示文明背景而非错误提示
  _openRegionIntro(key, label) {
    const info = REGION_INFO[key] || {};
    if (!info.intro) return;
    this.setData({
      detailPop: {
        show: true, kind: 'event', title: label + ' · 文明背景',
        sub: '前后 ' + WORLD_WINDOW + ' 年内暂无同期记载',
        body: info.intro, impact: '', figureId: '', loading: false
      }
    });
  },

  onCloseRegion() {
    this.setData({ expandedRegion: null });
  },

  /* ── 程序化滚动（scroll-view 的 scroll-into-view 需清空后再赋值才会二次触发） ── */
  _scrollTo(id) {
    this.setData({ scrollInto: '' }, () => {
      if (id) this.setData({ scrollInto: id });
    });
  },
  onBodyScroll(e) {
    const top = (e.detail && e.detail.scrollTop) || 0;
    this._lastTop = top;
    // 降频：滚动高频触发，只在「是否需要回顶按钮」翻转时 setData
    const show = top > 360;
    if (show !== this.data.showTop) this.setData({ showTop: show });
  },
  onBackTop() {
    this._scrollTo('body-top');
  },

  /* ── 视图切换 ── */
  onSwitchView(e) {
    const v = e.currentTarget.dataset.view;
    if (v === this.data.view) return;
    this.setData({ view: v, expandedRegion: null }, () => {
      if (v === 'map') this._drawArcs();
      // 双流约 2400px、地图约 900px：不归零时切过去会被夹到末尾，首屏锚点卡全看不到
      this._scrollTo('anchor-head');
    });
  },

  /* ── 重新选择 ── */
  onReselect() {
    this.setData({
      mode: 'select',
      // 人物锚点（含域外人物）回到「选人物」页签，年份锚点回到「选年份」
      anchorTab: this.data.anchorType === 'year' ? 'year' : 'person',
      selectedPerson: null,
      worldPerson: null,
      anchorYear: null,
      chinaEvents: [],
      worldEvents: [],
      mapRegions: [],
      expandedRegion: null,
      personQuery: '',
      suggests: [],
      showSuggests: false,
      personFocused: false,
      yearInput: '',
      yearInputErr: '',
      chinaCount: 0,
      chinaTotal: 0,
      chinaPeople: 0,
      whoBirth: 0,
      whoDeath: 0,
      whoPeople: 0,
      whoNums: [],
      worldCount: 0,
      worldFigures: [],
      worldFigureCount: 0,
      eraOthers: '',
      showTop: false
    });
    this._scrollTo('body-top');
  },

  // 中土空态出口：直接落到「选年份」子标签
  onSwitchToYear() {
    this.onReselect();
    this.setData({ anchorTab: 'year' });
  },

  // 中土列只展示各类前几条，「查看该年全部」跳大事年表（该页已支持 ?year=）
  onTapChinaAll() {
    const y = this.data.anchorYear;
    if (y == null) return;
    navTo('/timeline-pkg/pages/timeline/timeline?year=' + y);
  },

  // 「这一年，谁在场」二级页：只带年份，人物与计数由该页自取（与入口同一接口口径）
  onTapWhoPresent() {
    const y = this.data.anchorYear;
    if (y == null) return;
    navTo('/parallel-pkg/pages/who-present/who-present?year=' + y);
  },

  onTapChinaItem(e) {
    const id = e.currentTarget.dataset.id;
    if (id) navTo('/detail-pkg/pages/detail/detail?id=' + id);
  },

  // 域外卡片轻点与长按同样打开介绍浮层（此前只有长按有反应，与中土卡片不一致）
  onTapWorldItem(e) {
    this.onLongPressEvent(e);
  },

  // 域外同期人物卡片：轻点 / 长按均弹出人物介绍（数据已内联，无需异步拉取）
  onTapWorldFigure(e) {
    const it = this.data.worldFigures[Number(e.currentTarget.dataset.index)];
    if (!it) return;
    // lifeText 里已含头衔，勿重复拼接
    const tail = (it.title && String(it.lifeText || '').indexOf(it.title) < 0) ? ' · ' + it.title : '';
    const sub = it.regionLabel + ' · ' + it.lifeText + tail;
    this.setData({
      detailPop: {
        show: true, kind: 'figure',
        title: it.name + (it.en ? ' · ' + it.en : ''),
        sub: sub,
        body: it.desc || '（暂无简介）',
        impact: it.impact || '',
        figureId: '', loading: false
      }
    });
  },

  onRetry() {
    if (this.data.anchorYear != null) {
      this.setData({ loading: true, loadFailed: false });
      this._loadChina(this.data.anchorYear);
    }
  },

  /* ── 长按浮层：人物 / 事件 介绍卡 ── */
  // 长按锚点人物 → 人物介绍
  onLongPressPerson() {
    const p = this.data.selectedPerson;
    const wp = this.data.worldPerson;
    // 域外人物锚点：直接以人物表内联数据成卡
    if (!p && wp) {
      this.setData({
        detailPop: {
          show: true, kind: 'figure',
          title: wp.name + (wp.en ? ' · ' + wp.en : ''),
          sub: wp.regionLabel + ' · ' + wp.lifeText +
            ((wp.alias && wp.alias.length) ? ' · 又译 ' + wp.alias.join('／') : ''),
          body: wp.desc || '（暂无简介）', impact: wp.impact || '', figureId: '', loading: false
        }
      });
      return;
    }
    if (!p) return;
    const sub = (p.dynasty ? p.dynasty + ' · ' : '') +
      (p.birthYear != null ? fmtYearFull(p.birthYear) : '生年不详') +
      (p.deathYear != null ? ' — ' + fmtYearFull(p.deathYear) : '');
    if (p.bio) {
      this.setData({
        detailPop: { show: true, kind: 'figure', title: p.name, sub: sub, body: p.bio, impact: '', figureId: p.id, loading: false }
      });
    } else {
      this._openFigurePop(p.id, p.name, sub);
    }
  },

  // 长按事件（中土卡片 / 域外卡片 / 地图区域）
  onLongPressEvent(e) {
    const ds = e.currentTarget.dataset;
    const kind = ds.kind;
    if (kind === 'china') {
      const it = this.data.chinaEvents[Number(ds.index)];
      if (!it) return;
      const sub = (it.type ? it.type + ' · ' : '') + (it.dynasty || '');
      if (it.id) {
        // 中土要事绑定了人物 → 先即时展示该年事件描述，再异步补全人物完整简介
        this._openFigurePop(it.id, it.name, sub, it.desc);
      } else {
        this.setData({
          detailPop: {
            show: true, kind: 'event',
            title: (it.kind === 'event' ? (it.eventTitle || it.name) : it.name),
            sub: sub,
            body: it.desc || '（暂无详情）', impact: '', figureId: '', loading: false
          }
        });
      }
    } else if (kind === 'world') {
      const it = this.data.worldEvents[Number(ds.index)];
      if (!it) return;
      const yearText = it.approx ? ('原书年代段 ' + fmtYear(it.year)) : fmtYear(it.year);
      const sub = it.regionLabel + (it.country ? ' · ' + it.country : '') + ' · ' + yearText +
        ((!it.approx && it.diff) ? ('（' + (it.diff > 0 ? '+' : '') + it.diff + '年）') : '');
      // 专属长介绍优先；否则用事件描述；再拼接该文明区的背景，确保成段
      let body = (it.intro || it.desc || '（暂无详情）');
      if (it.regionIntro && body.indexOf(it.regionIntro) === -1) {
        body = body + '　' + it.regionIntro;
      }
      if (it.fromBook && it.bookPage) {
        body = body + '　（来源：《中外历史对比年表》第 ' + it.bookPage + ' 页）';
      }
      this.setData({
        detailPop: {
          show: true, kind: 'event', title: it.title, sub: sub,
          body: body, impact: it.impact || '', figureId: '', loading: false
        }
      });
    } else if (kind === 'region') {
      // 中土：用该年中土编年做摘要（china.events 恒为空，不能走下面的域外口径）
      if (ds.key === 'china') {
        const list = this.data.chinaEvents || [];
        const title = '中土 · ' + this.data.yearLabel + '年';
        if (!list.length) {
          this.setData({
            detailPop: {
              show: true, kind: 'event', title: title, sub: '该年暂无可定年的记载',
              body: '中土编年取自人物生平事件，该年没有可定年记录。可换一个年份再看，或去大事年表按年代浏览。',
              impact: '', figureId: '', loading: false
            }
          });
          return;
        }
        const lines = list.map(function (it) {
          return (it.kind === 'event' ? (it.eventTitle || it.name) : it.name) + (it.desc ? '：' + it.desc : '');
        }).join('；');
        this.setData({
          detailPop: {
            show: true, kind: 'event', title: title,
            sub: '共 ' + this.data.chinaTotal + ' 条 · 此处展示 ' + list.length + ' 条',
            body: (this.data.eraMain ? this.data.eraMain + '。' : '') + lines,
            impact: '', figureId: '', loading: false
          }
        });
        return;
      }
      const reg = this.data.mapRegions.filter(function (r) { return r.key === ds.key; })[0];
      if (!reg) return;
      if (!reg.events.length) {
        this._openRegionIntro(ds.key, reg.label);
        return;
      }
      const rintro = (REGION_INFO[reg.key] || {}).intro || '';
      // 域外事件补到 478 条后，单个区域在一个 50 年窗口里最多能有十几条，
      // 全部拼成一段会把浮层撑成一篇长文。只列前 8 条，其余注明条数。
      const REGION_POP_MAX = 8;
      const shown = reg.events.slice(0, REGION_POP_MAX);
      const list = shown.map(function (ev) {
        return ev.title + (ev.desc ? '：' + ev.desc : '');
      }).join('；');
      const more = reg.events.length > shown.length
        ? '…另有 ' + (reg.events.length - shown.length) + ' 条同期记载，可展开该区域查看'
        : '';
      const impacts = reg.events.map(function (ev) { return ev.impact; }).filter(Boolean).join('；');
      const body = (rintro ? rintro + '　' : '') + (list || '（暂无）') + more;
      this.setData({
        detailPop: {
          show: true, kind: 'event', title: reg.label + ' · 同期事件',
          sub: '共 ' + reg.events.length + ' 项' + (reg.events.length > REGION_POP_MAX ? ' · 此处列前 ' + REGION_POP_MAX + ' 项' : ''),
          body: body, impact: impacts, figureId: '', loading: false
        }
      });
    }
  },

  // 异步拉取人物简介并打开浮层；presetBody 为该年事件描述，先即时展示，再补全人物完整简介
  _openFigurePop(id, name, presetSub, presetBody) {
    if (!id) return;
    const hasPreset = !!(presetBody && presetBody.length);
    this.setData({
      detailPop: {
        show: true, kind: 'figure', title: name || '人物',
        sub: presetSub || (hasPreset ? '' : '简介加载中…'),
        body: hasPreset ? presetBody : '',
        impact: '', figureId: id, loading: !hasPreset
      }
    });
    const that = this;
    request({
      timeout: 8000,
      url: API.FIGURES.GET(id),
      success: function (res) {
        const d = res.data || {};
        const f = (d.success && d.data) ? d.data : null;
        if (!f) {
          that.setData({ 'detailPop.loading': false, 'detailPop.body': hasPreset ? that.data.detailPop.body : '（人物信息缺失）' });
          return;
        }
        const b = parseYearNum(f.birthYear), dt = parseYearNum(f.deathYear);
        const sub = (f.dynasty ? f.dynasty + ' · ' : '') +
          (b != null ? fmtYearFull(b) : '生年不详') +
          (dt != null ? ' — ' + fmtYearFull(dt) : '');
        const bio = f.bio || f.fullBio || f.intro || '';
        // 人物完整简介更长则用它，否则保留该年事件描述
        const body = (bio && bio.length >= (presetBody || '').length) ? bio : (presetBody || bio || '（暂无简介）');
        that.setData({ 'detailPop.loading': false, 'detailPop.sub': sub, 'detailPop.body': body });
      },
      fail: function () {
        that.setData({ 'detailPop.loading': false, 'detailPop.body': hasPreset ? that.data.detailPop.body : '（网络异常，请重试）' });
      }
    });
  },

  onClosePop() {
    this.setData({ 'detailPop.show': false });
  },

  onPopGotoFigure() {
    const id = this.data.detailPop.figureId;
    if (!id) return;
    this.onClosePop();
    navTo('/detail-pkg/pages/detail/detail?id=' + id);
  },

  noop() {},

  /* ── 分享 ── */
  // 人物锚点必须随分享带走：标题写「XXX 在世时」，只传 year 的话对方看到的是一个无主年份
  _shareQuery() {
    const y = this.data.anchorYear;
    let q = y != null ? 'year=' + y : '';
    if (this.data.anchorType === 'person' && this.data.selectedPerson && this.data.selectedPerson.id) {
      q = 'figureId=' + this.data.selectedPerson.id + (q ? '&' + q : '');
    } else if (this.data.anchorType === 'world-person' && this.data.worldPerson && this.data.worldPerson.name) {
      q = 'wfig=' + encodeURIComponent(this.data.worldPerson.name) + (q ? '&' + q : '');
    }
    return q;
  },
  onShareTimeline() {
    return {
      title: this.data.shareTitle || '世慧屋 · 中外对照｜同一时刻的中土与世界',
      query: this._shareQuery()
    };
  },
  onShareAppMessage() {
    const q = this._shareQuery();
    return {
      title: this.data.shareTitle || '世慧屋 · 中外对照｜同一时刻的中土与世界',
      path: '/parallel-pkg/pages/parallel/parallel' + (q ? '?' + q : '')
    };
  }
});
