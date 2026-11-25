const { navTo } = require('../../utils/nav');
const recentQuery = require('../../utils/recent-query');
const app = getApp();

// 8 个工具的唯一数据源。名称 / 副标题 / 路由一字不改（2026-11-13 B 案重组，仅改分组与排布）。
// 2026-11-10：「人物足迹」入口已移除；2026-11-24：沙盘推演并入「趣味查询」分组；
// 2026-11-24：地名查询（体验不佳）连同 place-pkg 整体下线。
const TOOLS = {
  timeline: { key: 'timeline', badge: '年', name: '大事年表', desc: '按公元年查人物事迹', url: '/timeline-pkg/pages/timeline/timeline' },
  year: { key: 'year', badge: '纪', name: '年份查询', desc: '年号 · 干支 · 七历对照', url: '/timeline-pkg/pages/calendar/calendar' },
  emp: { key: 'emp', badge: '帝', name: '历代帝王', desc: '各朝帝王 · 在位时间', url: '/pages/emperors/emperors' },
  parallel: { key: 'parallel', badge: '对', name: '中外对照', desc: '中外年表 · 逐段对照', url: '/parallel-pkg/pages/compare/compare' },
  six: { key: 'six', badge: '六', name: '六度空间', desc: '人物关系路径', url: '/pages/six-degrees/six-degrees' },
  sandbox: { key: 'sandbox', badge: '演', name: '沙盘推演', desc: '战役复盘 · 多场沙盘动态推演', url: '/sandbox-pkg/pages/sandbox-list/sandbox-list' },
  alias: { key: 'alias', badge: '官', name: '职官别名', desc: '古代官职别称', url: '/pages/official-alias/official-alias' },
  stats: { key: 'stats', badge: '看', name: '实时看板', desc: '收录 · 访问 · 增长', url: '/pages/stats/stats' }
};

// 5 组：时间 4（2 列卡片）/ 人物与关系 1（整宽行）/ 趣味查询 1（整宽行）/
// 名物 1（整宽行）/ 数据 1（整宽行）。layout 只决定卡片形态，不改任何工具内容。
const GROUP_DEFS = [
  { key: 'time', name: '按时间查', layout: 'grid', keys: ['timeline', 'year', 'emp', 'parallel'] },
  { key: 'relation', name: '人物与关系', layout: 'row', keys: ['six'] },
  { key: 'fun', name: '趣味查询', layout: 'row', keys: ['sandbox'] },
  { key: 'lexicon', name: '名物检索', layout: 'row', keys: ['alias'] },
  { key: 'data', name: '数据概览', layout: 'row', keys: ['stats'] }
];

const GROUPS = GROUP_DEFS.map(function (g, i) {
  return {
    key: g.key,
    name: g.name,
    layout: g.layout,
    count: g.keys.length,
    last: i === GROUP_DEFS.length - 1,
    items: g.keys.map(function (k) { return TOOLS[k]; })
  };
});

Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 96,
    navBottom: 88,
    recentQueries: [],
    groups: GROUPS
  },

  onLoad() {
    try {
      var sys = wx.getWindowInfo();
      var safeTop = sys && sys.statusBarHeight ? sys.statusBarHeight : 44;
      this.setData({
        safeAreaTop: safeTop,
        navBarHeight: safeTop + 44 + 8,
        // 深色头下沿圆角条的定位基准：导航栏真实下沿（状态栏 + 44）
        navBottom: safeTop + 44
      });
    } catch (e) {}
    this.setData({ recentQueries: this._loadRecent() });
  },

  onShow() {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
    // 从详情等页面返回时同步最近查询
    this.setData({ recentQueries: this._loadRecent() });
  },

  _loadRecent() {
    return recentQuery.load();
  },

  _saveRecent(q) {
    this.setData({ recentQueries: recentQuery.save(q) });
  },

  // 点击历史词：switchTab 无法带参，经 globalData.pendingSearch 交给首页执行检索
  onTapRecent(e) {
    var q = e.currentTarget.dataset.q;
    if (!q) return;
    this._saveRecent(q);
    app.globalData.pendingSearch = q;
    wx.switchTab({ url: '/pages/index/index' });
  },

  onClearRecent() {
    recentQuery.clear();
    this.setData({ recentQueries: [] });
  },

  onTapTool(e) {
    var url = e.currentTarget.dataset.url;
    if (url) navTo(url);
  },

  onShareAppMessage() {
    return { title: '世慧屋 · 人物查询', path: '/pages/query/query' };
  },

  onShareTimeline() {
    return { title: '世慧屋 · 人物查询' };
  }
});
