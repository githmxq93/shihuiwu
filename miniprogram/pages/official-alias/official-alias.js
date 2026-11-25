const request = require('../../utils/request');
const API = require('../../config/api');
const guide = require('../../utils/guide');
const { ensurePrivacyAuthorized } = require('../../utils/privacy');

// ===== 与网站端对齐的静态配置（2026-10-21 第二轮） =====
var POPULAR = ['宰相', '相国', '丞相', '将军', '太守', '御史', '翰林', '学士', '大夫', '祭酒'];
var DYNASTY_GROUPS = {
  '先秦': '上古,夏,商,西周,东周,春秋,战国,秦',
  '朝代不详': '__empty__'
};
var POPULAR_DYNASTIES = ['不限', '先秦', '宋', '明', '唐', '清', '汉', '元', '历代', '东汉', '周', '晋', '秦', '西汉', '朝代不详'];
// 先秦组已覆盖的 7 个值不单列（L6：避免与「先秦」双入口）
var MORE_DYNASTIES = ['南朝', '辽', '隋', '三国', '金', '五代', '南北朝', '北朝', '南宋', '东晋', '西晋', '北宋', '魏', '吴', '蜀'];
var SCOPES = [
  { key: 'all', label: '全部' },
  { key: 'alias', label: '别名' },
  { key: 'title', label: '释义' },
  { key: 'note', label: '注释' }
];
var PAGE_SIZE = 20;
var NOTE_CLAMP = 120;
// 类别索引首屏与「显示更多」的步长：categories 接口真实返回近 2000 类，
// 一次性渲染会拖慢首屏，故按条数降序分段展示（2026-11-09）。
var CAT_STEP = 30;
var CAT_FILTER_MAX = 50;

function dynastyParam(d) {
  if (!d || d === '不限') return '';
  return DYNASTY_GROUPS[d] || d;
}

/**
 * 关键词分段（纯 WXML 渲染，不用 rich-text，规避 element node 兼容性风险）
 *
 * 每段额外带 o = 该段在「原文」中的起始字符偏移，供 WXML 作 wx:key。
 * 用偏移而不是 0,1,2… 的序号：换关键词后分段边界会变（一段可能被拆成两段），
 * 但「原文第 n 个字符起」这个身份不变，于是关键词变化时已有节点被复用而不是整批重建；
 * 同一次分段内各段偏移严格递增且不重叠，天然唯一。
 */
function hlSegs(text, kw) {
  if (!text) return [];
  if (!kw) return [{ t: text, hl: false, o: 0 }];
  var segs = [];
  var lower = String(text).toLowerCase();
  var lk = kw.toLowerCase();
  var i = 0;
  var idx;
  while ((idx = lower.indexOf(lk, i)) !== -1) {
    if (idx > i) segs.push({ t: text.slice(i, idx), hl: false, o: i });
    segs.push({ t: text.slice(idx, idx + kw.length), hl: true, o: idx });
    i = idx + kw.length;
  }
  if (i < text.length) segs.push({ t: text.slice(i), hl: false, o: i });
  return segs;
}

/**
 * 按 alias 分组（对齐网站端 groupedResults，M3），并预先算好「一行一条」要用的字段：
 *   _segs       别名的高亮分段
 *   _sub        副行：多朝代 → 「唐 · 宋」；单条 → 「汉 · 释义文本」
 *   _open       行展开状态（点行才展开条目详情）
 *   items       该别名下的全部朝代条目，展开后逐条显示释义/注释/复制
 */
function groupResults(list, kw) {
  var map = {};
  var order = [];
  (list || []).forEach(function (r) {
    r._isCat = /别称。$/.test(r.official_title || '');
    r._titleText = r._isCat ? (r.official_title || '').replace(/。$/, '') : (r.official_title || '');
    r._needClamp = !!r.note && r.note.length > NOTE_CLAMP;
    r._noteShort = r._needClamp ? r.note.slice(0, NOTE_CLAMP) : (r.note || '');
    r._expanded = false;
    r._aliasSegs = hlSegs(r.alias, kw);
    r._titleSegs = hlSegs(r._titleText, kw);
    r._noteSegs = hlSegs(r._noteShort, kw);
    r._noteSegsFull = hlSegs(r.note || '', kw);
    if (!map[r.alias]) {
      map[r.alias] = [];
      order.push(r.alias);
    }
    map[r.alias].push(r);
  });
  return order.map(function (a) {
    var items = map[a];
    var dys = [];
    items.forEach(function (r) {
      var d = r.dynasty || '朝代不详';
      if (dys.indexOf(d) === -1) dys.push(d);
    });
    var sub;
    if (items.length > 1) {
      // 同一别名跨多个朝代：副行只并朝代（如「唐 · 宋」），条数不再单独做标记
      sub = dys.join(' · ');
    } else {
      sub = (items[0].dynasty || '朝代不详') + (items[0]._titleText ? ' · ' + items[0]._titleText : '');
    }
    return {
      alias: a,
      items: items,
      _segs: items[0]._aliasSegs,
      _sub: sub,
      _open: false
    };
  });
}

/** 找出某个条目所在的列表与分组（复制/展开只按 id 定位，检索与类目共用一个实现） */
function pickTouched(key, id) {
  var list = (key === 'cat' ? this.data.catResults : this.data.results) || [];
  var hit = null;
  list.forEach(function (g) {
    g.items.forEach(function (r) {
      if (r.id === id) hit = r;
    });
  });
  return hit;
}

Page({
  data: {
    // 分段：search 检索 / category 类别
    seg: 'search',

    // 检索态
    keyword: '',
    dynasty: '',
    scope: 'all',
    results: [],
    total: 0,
    page: 1,
    hasMore: false,
    loading: false,
    searched: false,
    loadFailed: false,
    filterOpen: false,
    suggests: [],
    suggestOpen: false,
    scrollInto: '',

    // 类别索引
    categories: [],
    categoriesTotal: 0,
    catFilterKeyword: '',
    catIndex: [],
    catIndexTotal: 0,
    catLimit: CAT_STEP,
    catListLoading: true,
    catListError: false,

    // 类目内列表
    catDetail: '',
    catDynasty: '',
    catResults: [],
    catTotal: 0,
    catPage: 1,
    catHasMore: false,
    catSearched: false,
    catLoading: false,
    catFailed: false,
    catFilterOpen: false,

    // 布局
    safeAreaTop: 44,
    navBarHeight: 96,
    headH: 0,

    dynastyExpanded: false,
    popular: POPULAR,
    scopes: SCOPES,
    popularDynasties: POPULAR_DYNASTIES,
    moreDynasties: MORE_DYNASTIES,
    // 模板 data 里的 target 标识（避免在 WXML 里写字面量字符串）
    tpSearch: 'search',
    tpCat: 'cat'
  },

  onLoad() {
    // 低版本基础库（<2.20.1）无 getWindowInfo，try/catch + 兜底 44（2026-10-21）
    var safeTop = 44;
    var winWidth = 375;
    try {
      const sysInfo = wx.getWindowInfo();
      safeTop = (sysInfo && sysInfo.statusBarHeight) || 44;
      winWidth = (sysInfo && sysInfo.windowWidth) || 375;
    } catch (e) {}
    // 头部 padding-top 正好等于 nav 高度（statusBar + 44），深色才与 nav 无缝拼接；
    // headH 先给估值：fixed 头不占流，滚动容器要按它的实际高度让位，渲染后由 _measureHead 校正。
    // 分段导航使头部比原来高约 76rpx，估值从 124rpx 调到 200rpx（2026-11-09）。
    const navH = safeTop + 44;
    const estHead = Math.round((200 * winWidth) / 750);
    this.setData({ safeAreaTop: safeTop, navBarHeight: navH, headH: navH + estHead });
    const that = this;
    setTimeout(function () { that._measureHead(); }, 0);

    this._loadCategories();
  },

  onReady() {
    this._tryAutoGuide();
  },

  onShow() {
    // 从「我的 → 使用指南」重看返回时拉起
    this._tryAutoGuide();
  },

  /**
   * 职官别名首次进入：单条气泡。
   * 只在「检索」分段、且尚未搜索时出现；用户已经进入结果 / 类别详情时不打扰。
   */
  _tryAutoGuide(delay) {
    if (!guide.shouldShow('officialAlias') && !guide.hasReplay('officialAlias')) return;
    if (this.data.seg !== 'search' || this.data.searched || this.data.loading) return;
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
    const wait = typeof delay === 'number' ? delay : 250;
    this._guideTimer = setTimeout(() => {
      this._guideTimer = null;
      const bubble = this.selectComponent('#guideBubble');
      if (bubble) bubble.autoStart('officialAlias');
    }, wait);
  },

  /** 测量 fixed 深色头实际高度，供 scroll-view 内的 .head-spacer 让位 */
  _measureHead() {
    const that = this;
    this.createSelectorQuery().select('#oaHead').boundingClientRect(function (r) {
      if (r && r.height) that.setData({ headH: Math.round(r.height) });
    }).exec();
  },

  onUnload() {
    // 防抖/回顶定时器必须清（一次性 setTimeout 捕获到实例字段）
    if (this._suggestTimer) {
      clearTimeout(this._suggestTimer);
      this._suggestTimer = null;
    }
    if (this._scrollTimer) {
      clearTimeout(this._scrollTimer);
      this._scrollTimer = null;
    }
  },

  // ===== 分段切换（检索 / 类别）：各自状态互不覆盖，切回来仍是原样 =====
  onSegTap(e) {
    const s = e.currentTarget.dataset.s;
    if (s === this.data.seg) return;
    this.setData({ seg: s, suggestOpen: false });
    this._scrollTop();
  },

  /** 回到列表顶部：scroll-into-view 要「先赋值再清空」才能重复触发 */
  _scrollTop() {
    if (this._scrollTimer) clearTimeout(this._scrollTimer);
    this.setData({ scrollInto: 'pageTop' });
    this._scrollTimer = setTimeout(() => {
      this._scrollTimer = null;
      this.setData({ scrollInto: '' });
    }, 60);
  },

  // ===== 职官类别（F1） =====
  onReloadCategories() {
    if (this.data.catListLoading) return;
    this._loadCategories();
  },

  _loadCategories() {
    this.setData({ catListLoading: true });
    request({
      url: API.OFFICIAL_ALIASES.CATEGORIES,
      timeout: 10000,
      success: (res) => {
        const d = res.data || {};
        if (d.success && d.data && Array.isArray(d.data.list)) {
          const list = d.data.list;
          this.setData({
            categories: list,
            categoriesTotal: typeof d.data.total === 'number' ? d.data.total : list.length,
            catListLoading: false,
            catListError: false
          });
          this._rebuildCatIndex();
        } else {
          this.setData({ catListLoading: false, catListError: true });
        }
      },
      fail: () => {
        this.setData({ catListLoading: false, catListError: true });
      }
    });
  },

  /** 类别索引：按本地关键词过滤 + 分段展示，只把要渲染的那一小段放进 data */
  _rebuildCatIndex() {
    const all = this.data.categories || [];
    const kw = (this.data.catFilterKeyword || '').trim();
    let matched = all;
    if (kw) {
      matched = all.filter(function (c) { return c.name.indexOf(kw) !== -1; });
    }
    const limit = kw ? Math.min(this.data.catLimit, CAT_FILTER_MAX) : this.data.catLimit;
    this.setData({
      catIndex: matched.slice(0, limit),
      catIndexTotal: matched.length
    });
  },

  onCatFilterInput(e) {
    // 本地过滤，不请求接口；重置到首屏长度，避免筛出后仍按旧的 catLimit 展示
    this.setData({ catFilterKeyword: e.detail.value, catLimit: CAT_STEP });
    this._rebuildCatIndex();
  },

  onCatFilterClear() {
    this.setData({ catFilterKeyword: '', catLimit: CAT_STEP });
    this._rebuildCatIndex();
  },

  onCatMore() {
    this.setData({ catLimit: this.data.catLimit + CAT_STEP });
    this._rebuildCatIndex();
  },

  /** 进入某个类别：清空关键词筛选（类别与关键词互斥），拉该类全部条目 */
  onCatTap(e) {
    const name = e.currentTarget.dataset.name;
    if (this.data.catLoading) return;
    this.setData({
      catDetail: name,
      catDynasty: '',
      catResults: [],
      catTotal: 0,
      catPage: 1,
      catHasMore: false,
      catSearched: false,
      catFailed: false,
      catFilterOpen: false
    });
    this._scrollTop();
    this._doSearch(1, false, 'cat');
  },

  onCatBack() {
    this.setData({ catDetail: '', catDynasty: '', catFilterOpen: false, catResults: [], catSearched: false, catTotal: 0 });
    this._scrollTop();
  },

  onToggleCatFilter() {
    this.setData({ catFilterOpen: !this.data.catFilterOpen });
  },

  onCatRetry() {
    if (this.data.catLoading) return;
    this._doSearch(1, false, 'cat');
  },

  onCatClearDynasty() {
    if (this.data.catDynasty) {
      this.setData({ catDynasty: '', catFilterOpen: true });
      this._doSearch(1, false, 'cat');
      return;
    }
    this.setData({ catFilterOpen: true });
  },

  // ===== 检索输入 =====
  onInput(e) {
    this.setData({ keyword: e.detail.value, suggestOpen: true });
    // 前缀联想（F6）：防抖 300ms + 序号防护，旧响应不覆盖新输入
    if (this._suggestTimer) clearTimeout(this._suggestTimer);
    const q = e.detail.value.trim();
    if (!q) {
      this.setData({ suggests: [] });
      return;
    }
    const seq = (this._suggestSeq || 0) + 1;
    this._suggestSeq = seq;
    this._suggestTimer = setTimeout(() => {
      this._suggestTimer = null;
      request({
        url: API.OFFICIAL_ALIASES.SUGGEST + '?q=' + encodeURIComponent(q),
        timeout: 8000,
        success: (res) => {
          if (this._suggestSeq !== seq) return;
          const d = res.data || {};
          this.setData({ suggests: (d.success && d.data && d.data.list) || [] });
        },
        fail: () => {}
      });
    }, 300);
  },

  onSuggestTap(e) {
    const s = e.currentTarget.dataset.s;
    this.setData({ keyword: s, suggests: [], suggestOpen: false });
    this.onSearch();
  },

  /** 清空检索：回到初始态（只剩搜索行 + 热门搜索） */
  onClear() {
    this.setData({
      keyword: '', dynasty: '', scope: 'all',
      results: [], total: 0, page: 1, hasMore: false, loading: false,
      searched: false, loadFailed: false, suggests: [], suggestOpen: false, filterOpen: false
    });
  },

  // ===== 筛选 chip =====
  onToggleFilter() {
    this.setData({ filterOpen: !this.data.filterOpen });
  },

  /** 空结果时「调整筛选」：展开筛选面板；没有筛选条件时只是把面板打开，不做隐式清空 */
  onOpenFilter() {
    this.setData({ filterOpen: true });
  },

  /** 朝代 chip 两处共用：data-t=search 作用检索，data-t=cat 作用类目内 */
  onDynastyTap(e) {
    const d = e.currentTarget.dataset.d;
    const t = e.currentTarget.dataset.t || 'search';
    if (t === 'cat') {
      const cur = this.data.catDynasty;
      const next = d === '不限' || cur === d ? '' : d;
      this.setData({ catDynasty: next, catPage: 1 });
      this._doSearch(1, false, 'cat');
      return;
    }
    const cur = this.data.dynasty;
    const next = d === '不限' || cur === d ? '' : d;
    this.setData({ dynasty: next, page: 1, suggestOpen: false });
    this._doSearch(1, false, 'search');
  },

  onScopeTap(e) {
    const s = e.currentTarget.dataset.s;
    const next = this.data.scope === s ? 'all' : s;
    this.setData({ scope: next, page: 1 });
    this._doSearch(1, false, 'search');
  },

  onToggleDynasty() {
    this.setData({ dynastyExpanded: !this.data.dynastyExpanded });
  },

  onPopularTap(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({ keyword: tag, suggestOpen: false });
    this.onSearch();
  },

  onSearch() {
    // 防重：loading 中连点不再发并发请求（2026-10-21）
    if (this.data.loading) return;
    const q = this.data.keyword.trim();
    if (!q && !this.data.dynasty) {
      wx.showToast({ title: '请输入别名或选择朝代', icon: 'none' });
      return;
    }
    this.setData({ suggestOpen: false, suggests: [] });
    this._doSearch(1, false, 'search');
  },

  /** 模板里两个列表共用的「加载更多」 */
  onLoadMore(e) {
    const t = e.currentTarget.dataset.t;
    if (t === 'cat') {
      if (this.data.catLoading || !this.data.catHasMore) return;
      this._doSearch(this.data.catPage + 1, true, 'cat');
      return;
    }
    if (this.data.loading || !this.data.hasMore) return;
    this._doSearch(this.data.page + 1, true, 'search');
  },

  /**
   * 发搜索请求。
   *   target=search：关键词 + 朝代 + 范围（类别已独立为分段，检索不再传 category）
   *   target=cat   ：只按类别 + 朝代拉该类全部条目
   *   append=true  ：加载更多，合并到已有列表
   */
  _doSearch(page, append, target) {
    const t = target || 'search';
    let url = API.OFFICIAL_ALIASES.SEARCH + '?page=' + page + '&pageSize=' + PAGE_SIZE;
    let q = '';
    let dynasty = '';
    let scope = 'all';

    if (t === 'cat') {
      this.setData({ catLoading: true, catFailed: false });
      if (this.data.catDetail) url += '&category=' + encodeURIComponent(this.data.catDetail);
      dynasty = this.data.catDynasty;
    } else {
      this.setData({ loading: true, loadFailed: false });
      q = this.data.keyword.trim();
      if (q) url += '&q=' + encodeURIComponent(q);
      dynasty = this.data.dynasty;
      scope = this.data.scope;
      if (scope && scope !== 'all') url += '&scope=' + scope;
    }
    const dp = dynastyParam(dynasty);
    if (dp) url += '&dynasty=' + encodeURIComponent(dp);

    request({
      url,
      timeout: 10000,
      success: (res) => {
        const d = res.data || {};
        if (d.success && d.data && Array.isArray(d.data.list)) {
          const flatKey = t === 'cat' ? '_catFlat' : '_flat';
          const prev = append ? (this[flatKey] || []) : [];
          this[flatKey] = prev.concat(d.data.list);
          const rows = groupResults(this[flatKey], q);
          const total = d.data.total || 0;
          if (t === 'cat') {
            this.setData({
              catResults: rows,
              catTotal: total,
              catPage: d.data.page || page,
              catHasMore: page * PAGE_SIZE < total,
              catLoading: false,
              catSearched: true,
              catFailed: false
            });
          } else {
            this.setData({
              results: rows,
              total: total,
              page: d.data.page || page,
              hasMore: page * PAGE_SIZE < total,
              loading: false,
              searched: true,
              loadFailed: false
            });
          }
        } else {
          this[t === 'cat' ? '_catFlat' : '_flat'] = [];
          if (t === 'cat') {
            this.setData({ catResults: [], catTotal: 0, catHasMore: false, catLoading: false, catSearched: true, catFailed: false });
          } else {
            this.setData({ results: [], total: 0, hasMore: false, loading: false, searched: true, loadFailed: false });
          }
        }
      },
      fail: () => {
        this[t === 'cat' ? '_catFlat' : '_flat'] = [];
        if (t === 'cat') {
          this.setData({ catResults: [], catTotal: 0, catHasMore: false, catLoading: false, catSearched: true, catFailed: true });
        } else {
          this.setData({ results: [], total: 0, hasMore: false, loading: false, searched: true, loadFailed: true });
        }
        wx.showToast({ title: '网络连接失败，请重试', icon: 'none' });
      }
    });
  },

  // ===== 条目交互（检索与类目内共用，data-t 决定改哪一份列表） =====
  onToggleRow(e) {
    const alias = e.currentTarget.dataset.alias;
    const key = e.currentTarget.dataset.t === 'cat' ? 'catResults' : 'results';
    const list = this.data[key].map(function (g) {
      if (g.alias !== alias) return g;
      return Object.assign({}, g, { _open: !g._open });
    });
    const patch = {};
    patch[key] = list;
    this.setData(patch);
  },

  onToggleNote(e) {
    const id = e.currentTarget.dataset.id;
    const key = e.currentTarget.dataset.t === 'cat' ? 'catResults' : 'results';
    const list = this.data[key].map(function (g) {
      return Object.assign({}, g, {
        items: g.items.map(function (r) {
          return r.id === id ? Object.assign({}, r, { _expanded: !r._expanded }) : r;
        })
      });
    });
    const patch = {};
    patch[key] = list;
    this.setData(patch);
  },

  onCopy(e) {
    const id = e.currentTarget.dataset.id;
    const t = e.currentTarget.dataset.t === 'cat' ? 'cat' : 'search';
    const target = pickTouched.call(this, t, id);
    if (!target) return;
    const text = target.alias + (target.dynasty ? '（' + target.dynasty + '）' : '') +
      '：' + (target._titleText || target.official_title || '') + '\n' + (target.note || '');
    // 隐私接口适配：setClipboardData 属【剪切板】隐私接口，未声明/未同意时会直接失效
    // （报 api scope is not declared）。复制功能对用户是"点了没反应"，必须补授权。
    ensurePrivacyAuthorized()
      .then(() => {
        wx.setClipboardData({
          data: text,
          success: () => wx.showToast({ title: '已复制', icon: 'success' })
        });
      })
      .catch(() => { /* 用户拒绝授权，静默返回 */ });
  },

  onShareAppMessage() {
    return { title: '世慧屋 · 职官别名｜历代官职称谓对照', path: '/pages/official-alias/official-alias' };
  },

  onShareTimeline() {
    return { title: '世慧屋 · 职官别名｜历代官职称谓对照' };
  }
});
