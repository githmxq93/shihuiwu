const API = require('../../config/api');
const { navTo } = require('../../utils/nav');
const request = require('../../utils/request');
const topicPrefs = require('../../utils/topic-prefs');

// 专题列表本地兜底：服务端 /api/topics 到达前或失败时使用，保证离线不空。
// 服务端返回后以服务端为准（顺序同 web 端），新增专题自动同步，无需改代码。
const DEFAULT_TOPICS = [
  { key: 'figures', name: '历史人物' },
  { key: 'trivia', name: '冷知识' },
  { key: 'extremes', name: '国内之最' },
  { key: 'festival', name: '节日文化' },
  { key: 'campaign', name: '历代战役' }
];

// 特别专题：与 web 端首页「专题」下拉一致（4 个静态专题页，非 /api/topics 动态数据）
// 「历代战役史」入口已下架（2026-11-13）：战役内容改由大事年表「双记」承载，
// 页面 topic-pkg/pages/campaign 与路由保留，仅撤此处入口。
const SPECIAL_TOPICS = [
  { key: 'remember', name: '铭记历史', char: '忆', desc: '1931—1945 重大事件时间线与历史档案', url: '/topic-pkg/pages/remember/remember' },
  { key: 'liberation', name: '解放战争', char: '放', desc: '解放战争时期关键战事与历史进程', url: '/topic-pkg/pages/liberation/liberation' },
  { key: 'treaty', name: '历代条约', char: '约', desc: '近代以来中外条约签订与变迁', url: '/topic-pkg/pages/treaty/treaty' },
  { key: 'festivals', name: '节日文化', char: '节', desc: '传统节日起源与习俗', url: '/pages/festivals/festivals' }
];

// 展开后最多列几条篇目：3 条足够交代「这个专题里有什么」，再多会把首屏吃掉
const TOC_LIMIT = 3;

function parseArticle(a) {
  if (!a) return a;
  let relatedFigures = a.relatedFigures;
  if (typeof relatedFigures === 'string') {
    try { relatedFigures = JSON.parse(relatedFigures); } catch (e) { relatedFigures = []; }
  }
  if (!Array.isArray(relatedFigures)) relatedFigures = [];
  // lite 接口只返回人名数组（relatedNames）；全量接口没有该字段时从 relatedFigures 兜回
  let relatedNames = Array.isArray(a.relatedNames) ? a.relatedNames : [];
  if (!relatedNames.length) {
    relatedNames = relatedFigures
      .map(function (f) { return (f && f.name) || (typeof f === 'string' ? f : ''); })
      .filter(Boolean);
  }
  return {
    id: a.id,
    title: a.title || '',
    summary: a.summary || '',
    content: a.content || '',
    // lite 接口不返回正文，但会在摘要过短时给一个服务端生成的纯文本摘录
    excerpt: a.excerpt || '',
    author: a.author || '',
    era: a.era || '',
    createdAt: a.createdAt || '',
    relatedNames: relatedNames,
    relatedFigures: relatedFigures,
    relatedText: relatedNames.map(function (n) { return n; }).join('、')
  };
}

/* ===== 专题取数（全部来自 /api/topics，不补假数据） ===== */

/* 「最近更新」：接口没有独立的「专题最近更新」字段（updatedAt 服务端未必维护），
   改用该专题下所有文章 createdAt 的最大值；一篇文章都没有时退回 topic.updatedAt；
   两者都没有就返回空串，行上不显示这一段。
   createdAt 形如 '2026-09-30 12:00:00'，同比 'YYYY-MM-DD' 前缀的 ISO 串也能直接比大小。 */
function latestDateText(articles, fallback) {
  var best = '';
  (articles || []).forEach(function (a) {
    var c = String((a && a.createdAt) || '');
    if (c && c > best) best = c;
  });
  if (!best) best = String(fallback || '');
  var m = best.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? m[2] + '-' + m[3] : '';
}

Page({
  data: {
    safeAreaTop: 44,
    // 导航条底边 = 状态栏 + 44（导航条自身高度）；深色头的内联 padding-top 用它
    navBarHeight: 88,
    // 呈现形态：a=摘要行手风琴（组内单开）/ d=两列封面墙（单条横展）
    // 初值取偏好默认值（当前默认 d = 封面墙）；onLoad 会立刻用本机存储值覆盖
    style: topicPrefs.DEFAULTS.style,
    // 两个分组：文章专题（/api/topics 动态）+ 特别专题（4 个静态专题页）
    groups: [],
    loading: true,
    showRetry: false,
    topicCount: 0,
    articleCount: 0,
    specialCount: SPECIAL_TOPICS.length
  },

  // 模块内主题数据：key -> { name, description, updatedAt, pinnedArticleId, articles[] }
  _topics: {},
  // 视图模型（不含展开态），_applyView 时再叠加 open / wide
  _model: { article: [], special: [] },
  // 当前展开的专题 key（A / D 共用同一份展开状态）
  _openKey: '',
  // 分组折叠状态：默认展开
  _closed: { article: false, special: false },
  // 偏好签名：style|expanded，变了就说明用户改过设置，展开项要收敛回默认
  _sig: '',
  _defaultExpanded: false,
  // 默认展开只应用一次（数据就绪后），用户手动折叠后不会被下拉刷新重新弹开
  _defaultApplied: false,

  onLoad() {
    try {
      var sys = wx.getWindowInfo();
      var safeTop = sys && sys.statusBarHeight ? sys.statusBarHeight : 44;
      this.setData({
        safeAreaTop: safeTop,
        navBarHeight: safeTop + 44
      });
    } catch (e) {}
    // 偏好先于首次渲染读入，避免选了封面墙却先闪一帧摘要行
    var pref = topicPrefs.read();
    this._sig = pref.style + '|' + (pref.defaultExpanded ? '1' : '0');
    this._defaultExpanded = pref.defaultExpanded;
    this.setData({ style: pref.style });

    this._topics = this._buildLocalTopics();
    this._applyAll();
    this.fetchTopicsFromServer();
  },

  onShow() {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
    // 从「设置」返回时重新读偏好：风格 / 默认状态变了就把展开项收敛回默认
    this._syncPrefs();
  },

  /* 兜底数据结构：DEFAULT_TOPICS 仅提供 key/名称，文章为空，
     避免本地造内容（内容一律库内真值，严禁编造）。 */
  _buildLocalTopics() {
    var t = {};
    DEFAULT_TOPICS.forEach(function (d) {
      t[d.key] = { name: d.name, description: '', updatedAt: '', pinnedArticleId: '', articles: [] };
    });
    return t;
  },

  fetchTopicsFromServer() {
    var that = this;
    request({
      timeout: 10000,
      // 列表只要标题与摘要：用 lite 版（约 60 KB），全量版约 500 KB 且 82.9% 是正文
      url: API.TOPICS.LIST_LITE,
      success: function (res) {
        if (res.data && res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          var newTopics = {};
          res.data.data.forEach(function (topic) {
            newTopics[topic.key] = {
              name: topic.title || topic.key,
              description: topic.description || '',
              pinnedArticleId: topic.pinnedArticleId || '',
              updatedAt: topic.updatedAt || '',
              articles: (topic.articles || []).map(parseArticle)
            };
          });
          that._topics = newTopics;
        }
        that.setData({ loading: false, showRetry: false });
        that._applyAll();
      },
      fail: function () {
        // 请求失败且本地兜底无文章时给出重试入口
        var hasArticles = that._countArticles(that._topics) > 0;
        that.setData({ loading: false, showRetry: !hasArticles });
        if (hasArticles) that._applyAll();
      }
    });
  },

  _countArticles(topics) {
    var n = 0;
    Object.keys(topics).forEach(function (k) {
      var t = topics[k];
      if (t && t.articles) n += t.articles.length;
    });
    return n;
  },

  /* 重建视图模型 + 汇总总数，然后重绘。
     专题顺序 = Object.keys(this._topics) 的插入顺序 = 接口返回顺序，不重排。
     文章只用于算条数 / 最近更新 / 展开后的 3 条篇目，不整篇渲染。 */
  _applyAll() {
    var keys = Object.keys(this._topics);
    var that = this;
    var total = 0;
    var articles = [];
    keys.forEach(function (k, i) {
      var t = that._topics[k] || {};
      var arts = t.articles || [];
      total += arts.length;
      articles.push({
        key: k,
        // 序号是页面顺序，不是数据
        no: i < 9 ? '0' + (i + 1) : String(i + 1),
        name: t.name || k,
        desc: t.description || '',
        count: arts.length,
        updateText: latestDateText(arts, t.updatedAt),
        // 展开后只列前 3 条；era 为空的篇目不出标签
        toc: arts.slice(0, TOC_LIMIT).map(function (a) {
          return { era: a.era || '', title: a.title || '' };
        })
      });
    });

    this._model = {
      article: articles,
      special: SPECIAL_TOPICS.map(function (s) {
        return { key: s.key, char: s.char, name: s.name, desc: s.desc, url: s.url };
      })
    };
    this._counts = { total: total, topics: keys.length };

    this._maybeApplyDefault();
    this._applyView();
  },

  /* 默认展开只在「数据就绪后」应用一次（由 _applyAll 调用），避免展开一条还没有篇目的空行；
     之后 onShow 会以存储为准重新对齐（见 _syncPrefs）。 */
  _maybeApplyDefault() {
    if (this._defaultApplied || this.data.loading) return;
    var first = this._model.article[0];
    this._openKey = (this._defaultExpanded && first) ? first.key : '';
    this._defaultApplied = true;
  },

  /* 把模型 + 展开态合成渲染数据。
     D 的单数收尾：总数是奇数且组内没有展开项时，最后一块铺满两列（grid-column:1/-1）；
     一旦有展开项，那一块已经铺满，最后一块就不再铺，否则会出现半格空洞。 */
  _applyView() {
    var openKey = this._openKey;
    var groups = [
      {
        key: 'article',
        title: '文章专题',
        type: 'article',
        meta: this._counts.topics + ' 个 · ' + this._counts.total + ' 篇',
        closed: !!this._closed.article,
        items: this._model.article.map(function (it) {
          return {
            key: it.key,
            no: it.no,
            name: it.name,
            desc: it.desc,
            count: it.count,
            updateText: it.updateText,
            toc: it.toc,
            open: it.key === openKey
          };
        })
      },
      {
        key: 'special',
        title: '特别专题',
        type: 'special',
        meta: this._model.special.length + ' 个 · 独立专题站',
        closed: !!this._closed.special,
        items: this._model.special.map(function (it) {
          return {
            key: it.key,
            char: it.char,
            name: it.name,
            desc: it.desc,
            url: it.url,
            open: false
          };
        })
      }
    ];

    groups.forEach(function (g) {
      var hasOpen = false;
      for (var i = 0; i < g.items.length; i++) {
        if (g.items[i].open) { hasOpen = true; break; }
      }
      if (!hasOpen && g.items.length % 2 === 1 && g.items.length > 0) {
        g.items[g.items.length - 1].wide = true;
      }
    });

    this.setData({
      groups: groups,
      topicCount: this._counts.topics,
      articleCount: this._counts.total
    });
  },

  /* 每次 onShow 都以本机存储为准对齐展开态——tab 页切回来不会重新 onLoad，
     所以这里必须无条件比对，不能只在「偏好签名变了」时才收敛：
     否则用户手动展开过某条、或上一次遗留的 _openKey，会在切回时被本地 state
     保留下来，看起来就是「设置里选了默认收起，实际却是展开的」。
     收起 → 清空展开项；展开 → 回到首条。数据未就绪时把应用权交回 _applyAll。 */
  _syncPrefs() {
    var pref = topicPrefs.read();
    var sig = pref.style + '|' + (pref.defaultExpanded ? '1' : '0');
    if (sig !== this._sig) {
      this._sig = sig;
      this.setData({ style: pref.style });
    }
    this._defaultExpanded = pref.defaultExpanded;

    var first = this._model && this._model.article && this._model.article[0];
    if (!first) {
      // 还没取到专题：等 _applyAll 数据就绪后再套用默认态
      this._defaultApplied = false;
      return;
    }
    var next = this._defaultExpanded ? first.key : '';
    this._defaultApplied = true;
    if (next === this._openKey) return;
    this._openKey = next;
    this._applyView();
  },

  // 折叠 / 展开分组（文章专题 / 特别专题）
  onToggleGroup(e) {
    var key = e.currentTarget.dataset.g;
    if (!key) return;
    this._closed[key] = !this._closed[key];
    this._applyView();
  },

  /* 行（A）/ 砖（D）的点击：
       特别专题没有篇目，直接进站；文章专题切换展开态（组内单开，再点收起）。 */
  onTapItem(e) {
    var ds = e.currentTarget.dataset;
    if (ds.type === 'special') {
      this.onOpenSpecial(e);
      return;
    }
    this._openKey = (this._openKey === ds.key) ? '' : ds.key;
    this._applyView();
  },

  // 打开某个专题的文章列表页（topic-pkg 内已有页面，本轮不改它）
  onOpenTopic(e) {
    var key = e.currentTarget.dataset.key;
    var name = e.currentTarget.dataset.name || '';
    if (!key) return;
    // 连点防重由 utils/nav 的在途锁统一处理
    navTo('/topic-pkg/pages/topic/topic?topic=' + key + '&title=' + encodeURIComponent(name));
  },

  onRetry() {
    this.setData({ loading: true, showRetry: false });
    this.fetchTopicsFromServer();
  },

  // 打开特别专题页
  onOpenSpecial(e) {
    var url = e.currentTarget.dataset.url;
    if (!url) return;
    navTo(url);
  },

  onPullDownRefresh() {
    this.fetchTopicsFromServer();
    if (this._pullTimer) clearTimeout(this._pullTimer);
    this._pullTimer = setTimeout(function () { wx.stopPullDownRefresh(); }, 1500);
  },

  onUnload() {
    // 下拉刷新的兜底停止：卸载后触发无意义
    if (this._pullTimer) clearTimeout(this._pullTimer);
    this._pullTimer = null;
  },

  onShareAppMessage() {
    return { title: '世慧屋 · 历史专题', path: '/pages/topic-list/topic-list' };
  },

  onShareTimeline() {
    return { title: '世慧屋 · 历史专题' };
  }
});
