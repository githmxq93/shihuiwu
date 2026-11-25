const request = require('../../../utils/request');
const API = require('../../../config/api');

function parseArticle(a) {
  if (!a) return a;
  let relatedFigures = a.relatedFigures;
  if (typeof relatedFigures === 'string') {
    try { relatedFigures = JSON.parse(relatedFigures); } catch(e) { relatedFigures = []; }
  }
  return {
    id: a.id,
    title: a.title || '',
    summary: a.summary || '',
    content: a.content || '',
    author: a.author || '',
    era: a.era || '',
    updatedAt: a.updatedAt || '',
    // 文末三块的数据源：服务端已把 citations 解析成数组，keywords 仍是逗号分隔串
    citations: a.citations || [],
    keywords: a.keywords || '',
    relatedFigures: relatedFigures || []
  };
}

// 头部数据行的口径：
//   篇数 = 本期篇目数（articleCount）；
//   字数 = 全部篇目 content 的字符数之和（含标点与空白），满 1 万折成「万字」保留 1 位小数；
//   更新 = 全部篇目 updatedAt 的最大值，只取 MM-DD。
// 任一项取不到就不返回，渲染层用 wx:if 直接不显示，不编造。
function buildHeroStats(articles) {
  var chars = 0;
  var latest = '';
  for (var i = 0; i < articles.length; i++) {
    chars += (articles[i].content || '').length;
    var u = String(articles[i].updatedAt || '');
    if (u && u > latest) latest = u;
  }
  var num = '';
  var unit = '';
  if (chars >= 10000) {
    num = (chars / 10000).toFixed(1);
    unit = '万字';
  } else if (chars > 0) {
    num = String(chars);
    unit = '字';
  }
  var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(latest);
  return { wordNum: num, wordUnit: unit, updated: m ? m[2] + '-' + m[3] : '' };
}

// 2026-09-23 专题合并：情感共鸣/历史趣闻/人物对比 已并入「历史人物 figures」
const TOPIC_NAMES = { 'figures': '历史人物', 'trivia': '冷知识', 'extremes': '国内之最', 'festival': '节日文化', 'campaign': '历代战役' };

Page({
  data: {
    safeAreaTop: 44,
    topicKey: '',
    topicTitle: '',
    topicInfo: {},
    articles: [],
    articleCount: 0,
    currentArticle: null,
    loading: true,
    loadFailed: false,
    errorType: '', // 'notfound' | 'network'
    isSticky: false, // 吸顶条：头部完全滚出后显示
    statsWordNum: '', // 头部数据行：字数数字（取不到为空）
    statsWordUnit: '', // 万字 / 字
    statsUpdated: '', // 头部数据行：最近更新 MM-DD
    stickyMeta: '' // 吸顶条右侧：21 篇 · 更新 10-01
  },

  onLoad(options) {
    const topicKey = options.topic || '';
    // 标题优先级：列表页带过来的名称 → 本地映射表 → 原始 key（随后会被服务端 title 覆盖）
    let passedTitle = '';
    try { passedTitle = decodeURIComponent(options.title || ''); } catch (e) { passedTitle = ''; }

    const sysInfo = wx.getWindowInfo();
    const ratio = (sysInfo.windowWidth || 375) / 750;
    // 吸顶条 96rpx，换算成 px 供滚动阈值判断（rpx→px 随屏宽变化）
    this._barH = 96 * ratio;
    this._heroH = 0;
    // 兜底阈值 = 头部实测约 215rpx - 吸顶条 96rpx ≈ 118rpx（删掉印章与时期签后的头高）。
    // 旧版把阈值留在 0 且 onScroll 直接 return，一旦量不到头部高度，吸顶条就永远不出现。
    this._heroAt = Math.round(118 * ratio);
    this._scrollTop = 0;

    this.setData({
      safeAreaTop: sysInfo.statusBarHeight || 44,
      topicKey,
      topicTitle: passedTitle || TOPIC_NAMES[topicKey] || topicKey,
      articles: [],
      articleCount: 0,
      loading: true,
      loadFailed: false,
      errorType: '',
      isSticky: false,
      statsWordNum: '',
      statsWordUnit: '',
      statsUpdated: '',
      stickyMeta: ''
    });

    this.fetchTopic();
  },

  fetchTopic() {
    const that = this;
    this.setData({
      loading: true, loadFailed: false, errorType: '', isSticky: false,
      statsWordNum: '', statsWordUnit: '', statsUpdated: '', stickyMeta: ''
    });
    request({
      url: API.TOPICS.GET(this.data.topicKey),
      timeout: 10000,
      success: function(res) {
        if (res.data && res.data.success && res.data.data) {
          const topic = res.data.data;
          const list = (topic.articles || []).map(parseArticle);
          const heroStats = buildHeroStats(list);
          const newTopicInfo = {
            title: topic.title,
            description: topic.description,
            icon: topic.icon,
            articles: list
          };
          that.setData({
            topicTitle: topic.title || that.data.topicTitle,
            topicInfo: newTopicInfo,
            articles: list,
            articleCount: list.length,
            statsWordNum: heroStats.wordNum,
            statsWordUnit: heroStats.wordUnit,
            statsUpdated: heroStats.updated,
            // 吸顶条右侧一行：篇数 + 更新日期（无更新时间时只留篇数）
            stickyMeta: list.length ? (list.length + ' 篇' + (heroStats.updated ? ' · 更新 ' + heroStats.updated : '')) : ''
          });
        } else {
          // 专题不存在：进入失败态（不再 1 秒后强制返回，给出明确提示与返回按钮）
          that.setData({ loadFailed: true, errorType: 'notfound' });
        }
      },
      fail: function() {
        that.setData({ loadFailed: true, errorType: 'network' });
      },
      complete: function() {
        that.setData({ loading: false });
        // 头部高度随标题/简介/数据行变化，取完数据后再量；
        // 120ms 补量一次，兜住字体与布局完全落定后的最终高度
        that.measureHero();
        clearTimeout(that._measureTimer);
        that._measureTimer = setTimeout(function() { that.measureHero(); }, 120);
      }
    });
  },

  onReady() {
    // 首屏布局完成后再量一次：这一帧才是真机上最终的头高度
    this.measureHero();
  },

  // 量头部实际高度（px），算出吸顶触发点 = 头部高 - 吸顶条高。
  // 量不到就保留 onLoad 里的兜底阈值 —— 不会像旧版那样 _heroH 停在 0、onScroll 直接 return，
  // 导致吸顶条永不出现（且无任何报错，看起来就像「没改」）。
  measureHero() {
    const that = this;
    wx.nextTick(function() {
      that.createSelectorQuery().select('.hero-section').boundingClientRect(function(rect) {
        if (!rect || !rect.height) return;
        that._heroH = rect.height;
        that._heroAt = Math.max(48, Math.round(rect.height - that._barH));
        // 量到后立刻按当前滚动位置结算一次，避免「内容已滚过半但没有新 scroll 事件」
        that.applySticky(that._scrollTop || 0);
      }).exec();
    });
  },

  onScroll(e) {
    this._scrollTop = (e.detail && e.detail.scrollTop) || 0;
    this.applySticky(this._scrollTop);
  },

  // 吸顶切换：滚过触发点显示；回滚留 36px 回差，避免临界抖动
  applySticky(top) {
    const at = this._heroAt;
    if (!at) return;
    const hideAt = at - 36;
    if (!this.data.isSticky && top >= at) {
      this.setData({ isSticky: true });
    } else if (this.data.isSticky && top <= hideAt) {
      this.setData({ isSticky: false });
    }
  },

  onRetry() {
    this.fetchTopic();
  },

  onUnload() {
    this._topicTimer = null;
    clearTimeout(this._measureTimer);
  },

  onShareAppMessage() {
    const t = this.data.topicInfo.title || this.data.topicTitle || '世慧屋历史专题';
    return { title: '世慧屋专题 · ' + t, path: '/topic-pkg/pages/topic/topic?topic=' + this.data.topicKey };
  },

  onShareTimeline() {
    const t = this.data.topicInfo.title || this.data.topicTitle || '世慧屋历史专题';
    const key = this.data.topicKey;
    // [重要] 必须带 query：朋友圈单页模式打开分享卡片时只会带上这里返回的参数，
    //    缺了 topic，onLoad 拿不到 options.topic ⇒ 落到空专题/参数错误。
    //    （微信要求 query 是不含 '?' 的查询串，与 onShareAppMessage 的 path 不同）
    return { title: '世慧屋专题 · ' + t, query: key ? 'topic=' + encodeURIComponent(key) : '' };
  },

  onBack() {
    wx.navigateBack();
  },

  onTapArticle(e) {
    const id = e.currentTarget.dataset.id;
    const list = this.data.articles;
    const idx = list.findIndex(a => a.id === id);
    if (idx < 0) return;
    // 列表按发布时间倒序：上一篇 = 更早的一篇（idx+1），下一篇 = 更新的一篇（idx-1）
    this.setData({
      currentArticle: Object.assign({}, list[idx], {
        hasPrev: idx + 1 < list.length,
        hasNext: idx - 1 >= 0
      })
    });
  },

  // 浮层底部「上一篇 / 下一篇」：在同一专题的篇目里翻，不跳页
  onOverlayNav(e) {
    const dir = (e.detail && e.detail.dir) || '';
    const cur = this.data.currentArticle;
    if (!cur || !dir) return;
    const list = this.data.articles;
    const idx = list.findIndex(a => a.id === cur.id);
    if (idx < 0) return;
    const ni = dir === 'prev' ? idx + 1 : idx - 1;
    if (ni < 0 || ni >= list.length) return;
    this.setData({
      currentArticle: Object.assign({}, list[ni], {
        hasPrev: ni + 1 < list.length,
        hasNext: ni - 1 >= 0
      })
    });
  },

  onCloseArticle() {
    this.setData({ currentArticle: null });
  },

  onLoadMore() {
    // 预留：加载更多
  }
});
