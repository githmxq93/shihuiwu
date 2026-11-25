const { figures: fullFigures, onReady: figuresReady, onDataUpdate, isAllLoaded, ensurePool, getFetchFailed, resetFetchFailed } = require('../../data/figures');
const { navTo } = require('../../utils/nav');
const { buildCarouselList } = require('../../utils/figure-display');
// 身份标签展示口径（剔除来源标记 CBDB），与 web 端 src/utils/visibleTags.ts 同口径
const tagFilter = require('../../utils/tag-filter');
const API = require('../../config/api');
const { fmtDate } = require('../../utils/time-utils');
const monitor = require('../../utils/monitor');
const authStore = require('../../utils/auth-store');
const request = require('../../utils/request');
const recentQuery = require('../../utils/recent-query');
const topicIndex = require('../../utils/topic-index');
const guide = require('../../utils/guide');
const { recordHistory } = require('../../utils/user-utils');
const app = getApp();

// 冷启动优化：relation-utils / pinyin 仅在「检索 / 关系网构建」时才用到，
// 改为首次使用时才 require 并缓存到模块级变量，避免进入首页即同步解析这两个模块。
// 只调整「何时加载」，不改变任何匹配 / 排序 / 拼音算法。
var _pinyinMod = null, _relMod = null;
function getPinyinMod() {
  if (!_pinyinMod) _pinyinMod = require('../../utils/pinyin');
  return _pinyinMod;
}
function getRelMod() {
  if (!_relMod) _relMod = require('../../utils/relation-utils');
  return _relMod;
}

// 判断关系 type 是否为「本人配偶」类：
//   true  = 配偶（妻子/第N任妻/妾/妃/皇后/夫人/伴侣/配偶 等）
//   false = 非配偶（儿媳/女婿/岳父/妹夫/妻之祖父 等姻亲）
//   null  = type 缺失，需调用方回退 description 判定
// 注意：排除词不能含"子/女"——"妻子""妃子"本身含"子"；
// 白名单为整词精确匹配，"儿子""女儿""女婿"等不会命中。
function isSpouseType(t) {
  t = String(t || '').trim();
  if (!t) return null;
  if (/媳|婿|翁|岳|丈|亲家|兄|弟|姐|姊|妹|父|母|孙|之/.test(t)) return false;
  var t2 = t.replace(/\/[^/]*$/, ''); // 兼容 "第一任丈夫/前夫" 式复合写法
  if (/^(第[一二三四五六七八九十0-9]+任)?(妻子?|夫人|妾|妾室|侧室|平妻|继室|未婚妻|未婚夫|丈夫?|前妻|前夫|伴侣|配偶|皇后|皇妃|贵妃|宠妃|妃子?|妃嫔|后妃)$/.test(t2)) return true;
  if (/^第?[一二三四五六七八九十0-9]+夫人$/.test(t2)) return true;
  return false;
}

/* ===== 文章卡片装饰（与 pages/topic-list/topic-list.js 同算法） =====
   首页原先把 summary/dateLabel 直接渲染，会露出 Markdown 裸符号（>、**）。
   这里复用专题页那套清洗逻辑，保证两端卡片文案表现一致。 */

/* 摘要清洗：行级清理必须在压平空白之前做——否则 \s+ → ' ' 先把换行吃掉，
   行首的 > 就变成句中孤立字符，再也去不掉。 */
function stripMd(s) {
  var lines = String(s || '').split(/\r?\n/);
  var cleaned = lines.map(function (ln) {
    return ln
      .replace(/^#{1,6}\s*/, '')
      .replace(/^>\s?/, '')
      .replace(/^\s*[-*+]\s+/, '')
      .replace(/^\s*\d+[.)]\s+/, '')
      .replace(/^\s*\|.*\|\s*$/, '');
  }).join('\n');
  return cleaned
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`{1,3}/g, '')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*>\s*/g, ' ')
    .trim();
}

/* 标题去重：只在「确证是标题复读」时才切，宁可留一点重复，也不能切坏句子。 */
function dedupeTitle(s, title) {
  if (!title) return s;
  if (s.indexOf(title) === 0) return s.slice(title.length);
  var colon = title.lastIndexOf('：');
  if (colon < 0) colon = title.lastIndexOf(':');
  if (colon > 0 && colon < title.length - 1) {
    var sub = title.slice(colon + 1);
    if (sub.length >= 4) {
      var i = s.indexOf(sub);
      if (i >= 0 && i <= 30) s = s.slice(0, i) + s.slice(i + sub.length);
    }
  }
  return s;
}

// 摘要 = 去标记 + 去开头重复标题；过短则回退到正文首段
function cleanSummary(a) {
  var s = stripMd(a && a.summary);
  s = dedupeTitle(s, String((a && a.title) || ''));
  s = s.replace(/^[\s:：，,。.、\-—－]+/, '').replace(/^>\s*/, '').trim();
  // lite 列表不带正文，用服务端给的 excerpt（纯文本前 120 字）兜底；
  // 未部署新服务端的旧响应仍带 content，保持原行为。
  if (s.length < 24 && a && (a.excerpt || a.content)) s = stripMd(a.excerpt || a.content);
  return s;
}

// 关联人物：最多取 3 个
function figuresText(a, n) {
  var rf = a && a.relatedFigures;
  if (typeof rf === 'string') { try { rf = JSON.parse(rf); } catch (e) { rf = []; } }
  if (!Array.isArray(rf)) return '';
  return rf.slice(0, n || 3).map(function (x) {
    return (x && x.name) || (typeof x === 'string' ? x : '');
  }).filter(Boolean).join('、');
}

// 卡片标签兜底：年代优先，无则「文章」
function categoryLabel(a) {
  return (a && a.era) || '文章';
}

// 补零两位编号（01 02 … 10）
function padIndex(i) {
  var n = i + 1;
  return n < 10 ? '0' + n : String(n);
}

// 首页默认随机展示的人物数量（一屏一张的轮播卡片，与 web 移动端 MobileFigureCarousel 保持一致）
const HOME_RANDOM_COUNT = 20;

// 首屏随机牌堆的本地缓存：冷启动先用上次的 20 条顶上（秒开，不转圈不白屏），
// 网络回来后再按「用户是否已开始玩牌堆」决定换不换。体积约 3–5KB，可忽略。
const HOME_FEED_CACHE_KEY = 'home_feed_cache_v1';

// 从数组中随机取 n 条（Fisher-Yates 部分洗牌）
function pickRandom(arr, n) {
  const len = arr.length;
  const count = Math.min(n, len);
  const result = arr.slice();
  for (let i = 0; i < count; i++) {
    const j = i + Math.floor(Math.random() * (len - i));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result.slice(0, count);
}

// 裁剪出首页卡片需要的字段（归一化）。
// 同时兼容两种输入：服务端的原始响应（tags 为 JSON 字符串、id 为数字）
// 与本地全局数据层 data/figures.js（tags 已解析、id 为字符串）。
// 首页内部（_executeSearch 的 addedIds 比对）依赖字符串 id，故统一为字符串。
function toLightFigure(f) {
  if (!f) return null;
  var tags = f.tags;
  if (typeof tags === 'string') { try { tags = JSON.parse(tags); } catch (e) { tags = []; } }
  if (!Array.isArray(tags)) tags = [];
  return {
    id: String(f.id),
    name: f.name, nameEn: f.nameEn,
    dynasty: f.dynasty, nationality: f.nationality,
    birthYear: f.birthYear, deathYear: f.deathYear,
    avatar: f.avatar, bio: f.bio, tags: tags,
    region: f.region || ''
  };
}

Page({
  data: {
    // 内容区滚动位置（用于"回到顶部/定位区块"时用 setData 驱动 scroll-top）。
    // [注意] 必须在 data 里声明初始值：只在 setData 时凭空添加字段的话，首帧渲染的是
    //    `scroll-top="{{undefined}}"`（虽然小程序容错，但不符合规范）
    scrollTopVal: 0,
    exactMatches: [],
    // 首页随机轮播（20 条，已含朝代配色/短名/简介的视图模型）
    carouselFigures: [],
    relatedMatches: [],
    searchQuery: '',
    // 输入联想（自动补全）：仅「输入中且有关键词」时展示，命中后点选直接检索。
    // 与服务端 /api/figures/autocomplete 对应，200ms 短防抖（比整轮检索的 500ms 更急，
    // 让下拉先于结果出现，符合「边输边猜」的预期）。
    suggests: [],
    showSuggests: false,
    // 纠错提示（服务端别名召回补丁返回）：输入词被纠正为库内别名，如 万厉→万历。
    // 仅当服务端「name 零命中 + 别名模糊/错字命中」时才非空，正常搜索恒为 null。
    searchHint: null,
    // 同名多人时的当前选中人物：搜索结果 ≥2 位时启用「选择态」，
    // 选中谁就只渲染谁的关系网（默认选中排序第一位，点卡片即切换）。
    // 搜索结果仅 1 位时该字段不参与交互，行为与旧版完全一致。
    selectedMatchId: '',
    pickedMatchName: '',
    // 搜索范围筛选（与 Web 端同值域同文案）：'' = 全部，'1' = 仅帝王，'0' = 仅非帝王。
    // 仅对「有关键词的检索」生效 —— 无关键词时也能选择，但暂不参与检索，首页随机展示不受影响。
    emperorFilter: '',
    emperorFilterLabel: '全部',
    // 搜索范围下拉面板是否展开（对应 Web 端搜索框内左侧触发器 + 下方浮层）
    emperorDropdownOpen: false,
    // 面板展开时给搜索框撑开的下边距（像素，由面板实测高度回写），避免浮层压住下方卡片
    empPanelPad: 0,
    emperorFilterOptions: [
      { value: '', label: '全部', icon: '全' },
      { value: '1', label: '帝王', icon: '帝' },
      { value: '0', label: '非帝王', icon: '臣' }
    ],
    figuresCount: 0,
    dynastyCount: 0,
    // 统计条是否显示。统计接口失败且重试也失败时置 false 隐藏整行——
    // 否则模板 fallback 会让首页长期停在「已收录 …… 位名人」（像 bug，也容易被截图误读）。
    // 绝不写死一个「大概」的数字顶上：规模数字过期即错误信息。
    statsReady: false,
    safeAreaTop: 44,
    winW: 375, // 屏宽：WXS 甩出距离按屏宽算（data-winw 传入渲染层）
    refreshing: false, // scroll-view 下拉刷新中（refresher-triggered）
    showBackTop: false,
    loading: true,
    showRetry: false,
    // 结构骨架显隐（加载态 B 方案）：首屏 420ms 内到位 ⇒ 只见短转圈；
    // 超时撤 loading-mask、显镜像真实首屏的骨架兜底，数据到位原位呈现。
    showSkeleton: false,
    // 专题文章：只取最近发布的 10 篇（不带分类标签）
    latestArticles: [],
    // 就地浮起的文章浮层（与专题页/人物页同一个组件）；null = 关闭
    currentArticle: null
  },

  // 关系映射表：{ figureId: [{ relFig, relType, relDesc }] }。
  // 懒构建：仅在真正检索（_executeSearch）时按「当前检索池」构建，池变化才重建。
  // _relationMapSrc 记录构建源引用，用于判断映射是否已对应当前池。
  // （此前在 _rebuildData / onShow 中急切构建，见下方对应位置注释。）
  _relationMap: null,
  _relationMapSrc: null,

  onLoad(options) {
    // 分享 / 深链可带 guide=0 关闭全站首次引导，避免打断“直奔某个人物”的场景
    this._guideDisabled = !!(options && String(options.guide) === '0');
    this._perfT0 = Date.now(); // 首屏测速起点（onLoad → 首屏随机人物落地）
    // 窗口信息统一由 app.js onLaunch 缓存到 globalData，首页直接复用，
    // 避免冷启动关键路径上再跑一次同步 wx.getWindowInfo()。
    const safeAreaTop = app.globalData.statusBarHeight || 44;
    this._winW = app.globalData.windowWidth || 375; // 卡牌甩出距离按屏宽算
    this.data.winW = this._winW; // 同步给 dataset（WXS 甩出时读，不触发渲染）

    this.setData({ safeAreaTop: safeAreaTop });
    this.fetchStats();

    // 首屏：只向服务端要 HOME_RANDOM_COUNT 位随机人物，不等全局 2000 条数据。
    // 全局数据仍在后台加载（供搜索的关系映射、足迹页使用），两者互不阻塞。
    // 先「糊」上一次的牌堆缓存（有则立刻有内容，不再空转圈），
    // 再武装骨架兜底定时器：420ms 内数据到位则用户只看到一次短转圈，
    // 超时（弱网/慢接口）自动切到结构骨架，不再对全屏转圈干等。
    this._paintCachedFeed();
    this._armSkeletonFallback();
    this._loadHomeFeed();

    // 专题文章（最近 10 篇）
    this._loadLatestArticles();

    // 全局数据（2000 条）到达后只重建实例变量（_allFigures）与计数兜底，
    // 不刷新 exactMatches —— 那是首屏的随机结果，不该被全量数据覆盖。
    // 关系映射 _relationMap 不在此构建（改懒构建，见 _rebuildData / _executeSearch）。
    if (!isAllLoaded()) {
      figuresReady(() => { this._rebuildData(); });
    } else {
      this._rebuildData();
    }

    // 注册数据更新回调：当后台拉取全量数据后重建实例变量
    this._unregDataUpdate = onDataUpdate(() => {
      this._rebuildData();
    });
  },

  onUnload() {
    app.globalData._userCache = null;
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = null;
    // 清理统计接口的兜底重试定时器（防止卸载后回调再 setData）
    if (this._statsRetryTimer) clearTimeout(this._statsRetryTimer);
    this._statsRetryTimer = null;
    // 清理骨架兜底定时器（防止卸载后回调再 setData）
    this._clearSkeletonTimer();
    // 释放关系映射（连同构建源引用），下次进入页面按新数据懒重建
    this._relationMap = null;
    this._relationMapSrc = null;
    // 注销数据更新回调，防止内存泄漏
    if (this._unregDataUpdate) {
      this._unregDataUpdate();
      this._unregDataUpdate = null;
    }
    // 清理引导的延时启动定时器
    if (this._guideTimer) clearTimeout(this._guideTimer);
    this._guideTimer = null;
  },

  onReady() {
    // 首屏与引导都会做节点测量：让 feed 先把首帧画完再起引导，减少同时抢主线程
    this._tryAutoGuide(600);
  },

  /**
   * 全站首次引导：等首屏加载结束、搜索框可点后再出现。
   * - 已看完 / 已跳过（或带了 guide=0）→ 直接返回；
   * - 「我的 → 使用指南」重看时只留下 replay 标记，这里同样会被拉起；
   * - 弱网时最多等约 6 秒，避免把遮罩压在加载转圈上。
   */
  _tryAutoGuide(delay) {
    if (this._guideDisabled) return;
    if (!guide.shouldShow('global') && !guide.hasReplay('global')) return;
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
    // 默认等 600ms（而不是 300ms）：首屏图片/列表渲染优先，引导晚一点出现观感更稳
    const wait = typeof delay === 'number' ? delay : 600;
    this._guideTimer = setTimeout(() => {
      this._guideTimer = null;
      if (this.data.loading) {
        this._guideWait = (this._guideWait || 0) + 1;
        if (this._guideWait <= 12) this._tryAutoGuide(500);
        return;
      }
      this._guideWait = 0;
      const layer = this.selectComponent('#guideLayer');
      if (layer) layer.autoStart('global');
    }, wait);
  },

  // 从服务器获取真实人物总数（/api/figures/all 只返回前 2000 条，总数需单独查询）
  fetchStats() {
    request({
      timeout: 10000,
      retry: 0, // 统计非关键：关闭 request.js 的 GET 默认重试，配合页面层 _onStatsFail 只再试一次，弱网最坏由 6 次降为 2 次
      url: API.FIGURES.STATS,
      success: (res) => {
        const d = res.data || {};
        if (d.success && d.data) {
          // 保存到实例变量，供 _rebuildData 复用，避免被 fullFigures.length(2000) 覆盖
          this._realFiguresCount = d.data.total || 0;
          this._realDynastyCount = d.data.dynastyCount || 0;
          this._statsRetried = false;
          this.setData({
            figuresCount: d.data.total || this.data.figuresCount,
            dynastyCount: d.data.dynastyCount || this.data.dynastyCount,
            statsReady: true
          });
        } else {
          // success:false 与网络失败同样处理（第十一轮 P3-1：此前无 else 分支）
          this._onStatsFail();
        }
      },
      // 兜底（第十一轮 P3-1）：本接口仅 0.1 KB / 约 350ms，失败再试一次代价极低；
      // 仍失败才隐藏统计条。此前完全没有 fail 分支，冷启动撞上服务端抖动时
      // 首页会一直显示「已收录 …… 位名人」。
      fail: () => this._onStatsFail()
    });
  },

  /** 统计接口失败：静默重试一次（1.2s 后），二次失败则隐藏统计条 */
  _onStatsFail() {
    if (this._statsRetried) {
      this.setData({ statsReady: false });
      return;
    }
    this._statsRetried = true;
    if (this._statsRetryTimer) clearTimeout(this._statsRetryTimer);
    this._statsRetryTimer = setTimeout(() => {
      this._statsRetryTimer = null;
      this.fetchStats();
    }, 1200);
  },

  // ===== 加载态 B 方案：快转 mask + 结构骨架兜底 =====
  // 时间线：onLoad 武装 → 数据 420ms 内到位：只见短转圈，骨架不露面；
  //         超时仍 loading：撤 mask 显骨架（形状镜像真实首屏，原位呈现）；
  //         双失败（随机接口 + 本地池都不可用）：直接 showRetry，不显骨架。
  _armSkeletonFallback() {
    this._clearSkeletonTimer();
    this._skeletonTimer = setTimeout(() => {
      this._skeletonTimer = null;
      if (this.data.loading && !this.data.showRetry) {
        this.setData({ showSkeleton: true });
      }
    }, 420);
  },

  _clearSkeletonTimer() {
    if (this._skeletonTimer) {
      clearTimeout(this._skeletonTimer);
      this._skeletonTimer = null;
    }
  },

  // 首页首屏：向服务端取 HOME_RANDOM_COUNT 位随机人物（精选池内随机）。
  //
  // 刻意不走 data/figures.js 的全量加载：那份数据有 2000 条，而首屏只为显示 20 张卡片，
  // 却要等它下载 + JSON.parse + 建搜索索引，是白屏的主因。这里只要 20 条。
  // onDone 可选：无论成败都会调用（供下拉刷新停止动画，带 8s 兜底已在调用方处理）。
  // force 可选：用户显式要新一批（下拉刷新 / 重试 / 清空搜索回首页）时必须为 true。
  //
  // 缓存命中时本轮结果「只进缓存、不上屏」：缓存里的 20 人是上次会话取回的新一批，
  // 本次先用它秒开；本次取回的这一批留给下次冷启动。效果是「每次启动都是没见过的
  // 20 人，且全程零闪动」——若反过来当场替换，用户正在读的那张卡会突然换人。
  _loadHomeFeed(onDone, force) {
    const that = this;
    const cacheHold = function () {
      return !force && that._feedFromCache && that.data.carouselFigures.length > 0;
    };
    request({
      timeout: 10000,
      url: API.FIGURES.ALL + '?random=' + HOME_RANDOM_COUNT,
      success: function(res) {
        const payload = res.data || {};
        if (!payload.success || !Array.isArray(payload.data) || payload.data.length === 0) {
          if (cacheHold()) { if (onDone) onDone(); return; }
          that._loadHomeFeedFallback(true);
          if (onDone) onDone();
          return;
        }
        let matches = payload.data.map(toLightFigure).filter(Boolean);
        // 向后兼容守卫：服务端若尚未部署 ?random=（旧版会忽略该参数、返回全量 2000 条），
        // 本地再随机一次，保证首屏仍只展示 HOME_RANDOM_COUNT 位。
        if (matches.length > HOME_RANDOM_COUNT) {
          matches = pickRandom(matches, HOME_RANDOM_COUNT);
        }
        if (cacheHold()) {
          that._saveFeedCache(matches); // 存给下次冷启动，屏幕内容不动
          if (onDone) onDone();
          return;
        }
        that._applyHomeFeed(matches);
        if (onDone) onDone();
      },
      fail: function() {
        if (cacheHold()) { if (onDone) onDone(); return; }
        that._loadHomeFeedFallback(true);
        if (onDone) onDone();
      }
    });
  },

  // 缓存牌堆：冷启动秒开用。读取失败/内容非法一律静默跳过（走正常网络路径）。
  _paintCachedFeed() {
    let cached = null;
    try { cached = wx.getStorageSync(HOME_FEED_CACHE_KEY); } catch (e) { cached = null; }
    const list = (cached && Array.isArray(cached.list)) ? cached.list : null;
    if (!list || !list.length) return false;
    const valid = list.filter(function (f) { return f && f.id && f.name; });
    if (!valid.length) return false;
    this._applyHomeFeed(valid, { fromCache: true });
    return true;
  },

  _saveFeedCache(list) {
    if (!Array.isArray(list) || !list.length) return;
    try { wx.setStorageSync(HOME_FEED_CACHE_KEY, { ts: Date.now(), list: list }); } catch (e) {}
  },

  // 把首批人物落到「随机轮播卡片」的视图模型上。
  // 用 buildCarouselList 预解析朝代配色（WXSS 没有 color-mix，颜色只能在 JS 里算好）。
  // 同时据此构建年代尺（全部 + 各朝代计数，按人数降序，最多 12 个朝代）。
  // opts.fromCache = true：内容来自本地缓存 ⇒ 不回写缓存，也不上报首屏测速
  // （缓存命中不是真实网络性能，混进 home_first_feed 会污染指标）。
  _applyHomeFeed(matches, opts) {
    const fromCache = !!(opts && opts.fromCache);
    this._feedFromCache = fromCache;
    this._clearSkeletonTimer(); // 数据到位：撤销骨架兜底，内容原位呈现
    this._feedGen = (this._feedGen || 0) + 1; // key 换代 ⇒ 节点全重建，杜绝上一批 WXS 残留
    var carousel = buildCarouselList(matches);
    this._allCarousel = carousel;
    // 卡牌堆叠：随机姿态 + 牌堆顺序（_rot/_ox/_oy/_style/_ukey 写进对象，随 setData 一次渲染）
    this._initStack(carousel);
    this.setData({
      exactMatches: matches,
      carouselFigures: carousel,
      relatedMatches: [],
      // 回到首页随机展示：清空「同名多人选择态」
      selectedMatchId: '',
      pickedMatchName: '',
      loading: false,
      showRetry: false,
      showSkeleton: false
    });
    if (!fromCache) {
      this._saveFeedCache(matches);
    }
    // 首屏测速：onLoad → 首屏随机人物 setData 完成，仅上报一次
    if (!fromCache && !this._perfReported && this._perfT0) {
      this._perfReported = true;
      monitor.reportPerf('home_first_feed', Date.now() - this._perfT0);
    }
  },

  // 随机接口不可用时的兜底：退回本地全局数据池。
  //
  // [重要] P1-2：本地全量池已改为**按需加载**（不再每次冷启动后台拉 2000 条），
  // 故本函数必须区分两种进入方式：
  //   · lazyLoad = true  —— 由「**确认**随机接口失败」触发（success 返回体异常 / fail）。
  //     此时若池为空，交由 ensurePool() 按需拉取；拉回后经 onDataUpdate → _rebuildData
  //     会再次进入本函数（此时 lazyLoad = false 且池已非空），即可用池兜底。
  //   · lazyLoad = false —— 由 _rebuildData 的**时序兜底**触发（首屏仍为空）。
  //     [注意] 绝不可在此触发按需加载：此时随机接口只是「还没回来」而非失败，
  //        否则会误拉 ~800KB 全量包，把 P1-2 的收益全部抵消。
  _loadHomeFeedFallback(lazyLoad) {
    if (fullFigures && fullFigures.length > 0) {
      // 先随机取 20 条，再映射为卡片字段 —— 与「先全量 map(2000) 再随机取 20」结果
      // 完全等价（pickRandom 只依赖数组长度决定随机下标），但省下约 1980 次对象分配。
      const matches = pickRandom(fullFigures, HOME_RANDOM_COUNT).map(toLightFigure);
      this._applyHomeFeed(matches);
      return;
    }
    // 池为空：仅在「确认失败」时按需加载（并发去重，多次触发只发一次请求）
    if (lazyLoad) {
      ensurePool(
        null,
        // 池也拉不回来 ⇒「随机接口失败 + 无本地池」双失效，才展示重试入口
        () => {
          this._clearSkeletonTimer();
          this.setData({ loading: false, showRetry: true, showSkeleton: false });
        }
      );
      return;
    }
    // 时序兜底且池为空：保持骨架屏，等池到达后由 _rebuildData 再次进入
    if (getFetchFailed()) {
      this._clearSkeletonTimer();
      this.setData({ loading: false, showRetry: true, showSkeleton: false });
    }
  },

  // 根据全局数据重建实例变量（关系映射、计数兜底）。
  // 不再 setData 首屏人物：首屏由 _loadHomeFeed 独立负责，
  // 全量数据到达时不应覆盖用户正在看的随机结果。
  _rebuildData() {
    // [重要] dynasties 改为**懒计算**：原实现在此无条件 `fullFigures.map(...)` 遍历整池
    //    （≤2000 条）并建 Set，但下方只在 `_realDynastyCount`（/api/figures/stats 返回值）
    //    缺失时才用到 ⇒ STATS 正常时这 2000 次遍历 + Set 构建纯属浪费。
    //    P1-2 后池可能为空（按需加载尚未触发），故同时以 this.data.dynastyCount 兜底。
    const dynastyCountLazy = () => {
      if (!fullFigures || fullFigures.length === 0) return this.data.dynastyCount;
      const seen = {};
      for (let i = 0; i < fullFigures.length; i++) {
        const d = fullFigures[i].dynasty;
        if (d) seen[d] = 1;
      }
      return Object.keys(seen).length;
    };

    // 保存完整数据引用，供 _executeSearch 使用
    this._allFigures = fullFigures;

    // 关系映射**不在此同步构建**：全量数据到达（后台刷新 / 前台刷新）会走到这里，
    // 而 2000 条人物的正反向关系映射构建（反向建边含 O(k) 去重）是同步重活，
    // 会占住「数据到达」这条与用户操作重叠的链路，是启动后卡顿的来源之一。
    // 改为首次真正检索时再建（见 _executeSearch），与本项目「搜索索引懒构建」同一范式。
    // 注意：fullFigures 是**同一数组引用被原地替换内容**，故此处主动令映射失效
    // （只清引用、不重建），确保下次检索按新数据重建，绝不会用到过期映射。
    this._relationMapSrc = null;

    this.setData({
      // P1-2：池可能为空（按需加载尚未触发）⇒ 再以 this.data 兜底，
      // 避免用 0 覆盖掉 stats 接口尚未返回时的既有值。
      figuresCount: this._realFiguresCount || fullFigures.length || this.data.figuresCount,
      dynastyCount: this._realDynastyCount || dynastyCountLazy()
    });

    // 兜底：首屏仍为空时用已到达的本地池补上。
    // [注意] 传 false —— 这是**时序兜底**（随机接口可能只是还在路上），不得触发按需加载。
    if (this.data.exactMatches.length === 0) {
      this._loadHomeFeedFallback(false);
    }
  },

  // 预建关系映射：对每个人物，记录其所有正向和反向关系
  _buildRelationMap(allFigs) {
    var rel = getRelMod();
    var ROLE_OPPOSITE = rel.ROLE_OPPOSITE;
    var ROLE_SIMPLIFY = rel.ROLE_SIMPLIFY;
    const map = {};
    const figMap = {};
    allFigs.forEach(function(f) { figMap[f.id] = f; });

    allFigs.forEach(function(fig) {
      const id = fig.id;
      if (!map[id]) map[id] = [];
      if (fig.relations) {
        // [重要] 正向建边也按 relFig.id 去重（信息最丰富者胜）——
        //    服务端 /api/figures 对同一个人物可能返回多条边（type 不同），
        //    例：李世民→武则天 同时有「妻子」和「子妇;儿媳」两条边；
        //    例：李世民→李治 同时有「儿子」和「九子」两条边（排行在第 2 条）。
        //    旧逻辑正向建边不去重 → 同一个人 push 多次 →「两个武则天」「儿子/子 混用」。
        //    简单「先写者胜」会丢掉排行（李治先写的是「儿子」，丢了「九子」），
        //    故改为：对同 id 的多条边评分，保留「信息最丰富」的一条。
        //    评分：带排行/修饰的 type > 具体关系词 > 裸字（子/女/妻）。
        const best = {}; // id -> {entry, score, hasDesc}
        const rankInfo = /(长|次|三|四|五|六|七|八|九|十|幼|幺|季|独|第)[一二三四五六七八九十0-9]*[子女]|第[一二三四五六七八九十0-9]+任/;
        fig.relations.forEach(function(rel) {
          if (!rel || !rel.targetId) return;
          const targetFig = figMap[rel.targetId];
          if (!targetFig) return;
          const t = String(rel.type || rel.category || '').trim();
          const d = String(rel.description || '').trim();
          // 评分：含排行信息 +100；type 非空且非裸字 +10；desc 非空 +1
          var score = 0;
          if (t && rankInfo.test(t)) score += 100;
          if (t && !/^(子|女|妻|夫)$/.test(t)) score += 10;
          if (d) score += 1;
          var prev = best[targetFig.id];
          if (!prev || score > prev.score) {
            best[targetFig.id] = { entry: { relFig: targetFig, relType: t, relDesc: d }, score: score };
          }
        });
        Object.keys(best).forEach(function(k) {
          map[id].push(best[k].entry);
        });
      }
    });

    allFigs.forEach(function(fig) {
      if (!fig.relations) return;
      fig.relations.forEach(function(rel) {
        if (!rel || !rel.targetId) return;
        if (!map[rel.targetId]) map[rel.targetId] = [];
        var already = false;
        if (map[rel.targetId]) {
          for (var k = 0; k < map[rel.targetId].length; k++) {
            if (map[rel.targetId][k].relFig && map[rel.targetId][k].relFig.id === fig.id) {
              already = true;
              break;
            }
          }
        }
        if (!already) {
          // 反向关系：直接使用 ROLE_OPPOSITE 映射，与 web 端 ensureBidirectional 一致
          var oppositeType = ROLE_OPPOSITE[ROLE_SIMPLIFY[rel.type] || rel.type] || rel.type;
          map[rel.targetId].push({
            relFig: fig,
            relType: oppositeType,
            relDesc: rel.description || ''
          });
        }
      });
    });

    this._relationMap = map;
    // 记录构建源：供 _executeSearch 判断映射是否已对应当前检索池，避免重复重建。
    this._relationMapSrc = allFigs;
  },

  // 根据人物 id 查找其相关人员（映射可能尚未构建/已释放，做空值兜底）
  _getRelated(id) {
    return (this._relationMap && this._relationMap[id]) || [];
  },

  // 轮播头像图加载失败（个别 /uploads 图片可能缺失）→ 清空该项 avatarImage，
  // 模板会自动回落到 emoji 字形 / 姓名首字，避免整张卡留一个空圈。
  onAvatarError(e) {
    var idx = Number(e.currentTarget.dataset.index);
    if (isNaN(idx)) return;
    var patch = {};
    patch['carouselFigures[' + idx + '].avatarImage'] = '';
    this.setData(patch);
  },

  // ===== 人物卡牌堆叠（复刻已确认的 demo：乱序牌堆 · 顶卡拖走 · 循环）=====
  // _stackOrder：牌堆顺序（底→顶，存 carouselFigures 下标）；姿态随机，深位卡逐层缩小下移。
  //
  // 样式写入架构（2026-10-22 三次迭代后的最终形态）：
  //   WXS setStyle 优先级高于数据样式且**不可撤销**——卡一旦被写过，数据
  //   _style 后续更新全部失效。牌堆是 20 张循环轮转的强交互（每张卡会反复
  //   改变深度），「写一次留在节点上」的方案轮完一圈即全盘崩坏（实测：滑
  //   20 次后可见层空白）。因此 WXS 只保留两类必要写入（touchMove 位移 +
  //   touchEnd 甩出动画），其余一切姿态更新（弹回/放弃/归位/循环重排）都由
  //   js 把该卡 _ukey 递增 ⇒ wx:key 变 ⇒ 旧节点销毁（残留随之消失）、新节点
  //   按数据 _style 渲染。**勿改回任何「写样式留在节点上」的旧形态。**
  _initStack(list) {
    var feedGen = this._feedGen || 0;
    (list || []).forEach(function (f, i) {
      f._rot = +(Math.random() * 10 - 5).toFixed(2);   // -5° ~ 5° 乱序旋转
      f._ox = Math.round(Math.random() * 20 - 10);     // -10 ~ 10 px 横向抖位
      f._oy = Math.round(Math.random() * 12);          // 0 ~ 12 px 纵向抖位
      f._tagL = 0;
      f._tagR = 0;
      f._dragging = false;
      f._ukey = feedGen + '_' + f.id; // wx:key：批内唯一 + 换代/回收全变 ⇒ 节点重建，杜绝 WXS 残留
    });
    this._stackOrder = (list || []).map(function (f, i) { return i; });
    this._computeLayout(list || []);
  },

  // 按「底→顶」顺序计算每张卡的 transform/z-index/opacity，直接写回对象（随 setData 渲染）。
  _computeLayout(list) {
    var order = this._stackOrder || [];
    var total = order.length;
    for (var p = 0; p < total; p++) {
      var f = list[order[p]];
      if (!f) continue;
      var d = total - 1 - p; // 0 = 顶卡
      var scale = Math.max(0.9, 1 - d * 0.018);
      f._style = 'transform: translate(' + f._ox + 'px,' + (f._oy + d * 5) + 'px) rotate(' + f._rot + 'deg) scale(' + scale + ');'
        + 'z-index:' + (100 + p) + ';opacity:' + (d > 4 ? 0 : 1) + ';';
    }
  },

  // 回收某张卡的节点：递增 _ukey ⇒ wx:key 变化 ⇒ 旧节点销毁（WXS setStyle
  // 残留随之消失）、新节点按数据 _style 渲染。一切「拖过的卡」的姿态更新
  // （弹回/放弃/甩出归位/单卡边界）都经此完成，是消残留的唯一入口。
  _recycleCard(sidx) {
    var list = this.data.carouselFigures || [];
    var f = list[sidx];
    if (!f) return;
    this._recycleSeq = (this._recycleSeq || 0) + 1;
    f._ukey = f._ukey + '_r' + this._recycleSeq;
    var patch = {};
    patch['carouselFigures[' + sidx + ']._ukey'] = f._ukey;
    this.setData(patch);
  },

  // 交互后的重排：姿态 patch 给渲染层。对「没拖过的卡」数据 _style 直接生效；
  // 刚拖过的卡由调用方先 _recycleCard 重建节点，随后同样按数据 _style 渲染。
  _layoutStack() {
    var list = this.data.carouselFigures || [];
    this._computeLayout(list);
    var patch = {};
    var order = this._stackOrder || [];
    for (var p = 0; p < order.length; p++) {
      var f = list[order[p]];
      if (!f) continue;
      patch['carouselFigures[' + order[p] + ']._style'] = f._style;
    }
    this.setData(patch);
  },

  // ===== 牌堆拖拽：渲染层 WXS 驱动，js 只收低频回传 =====
  // 位移本身由 stack.wxs 直接 setStyle 到卡片节点（touchmove 零 setData，
  // 这是「滑动丝滑」的关键）；这里只处理一次拖拽 ≤6 次的交互结果。
  // 注意：WXS setStyle 不可撤销 ⇒ 「拖过的卡」的一切姿态更新都经
  // _recycleCard 回收节点（ukey 递增 ⇒ 重建 ⇒ 数据 _style 生效）完成。

  // 起拖：拖拽阴影反馈（一次拖拽仅一次）
  onStackStart(detail) {
    var sidx = detail.sidx;
    if (isNaN(sidx)) return;
    var patch = {};
    patch['carouselFigures[' + sidx + ']._dragging'] = true;
    this.setData(patch);
  },

  // tag 两档回传（±20px 阈值，整个拖拽最多 2 次；视觉过渡由 CSS 补）
  onStackTag(detail) {
    var sidx = detail.sidx;
    var tag = detail.tag;
    if (isNaN(sidx)) return;
    var patch = {};
    patch['carouselFigures[' + sidx + ']._tagL'] = tag < 0 ? 1 : 0;
    patch['carouselFigures[' + sidx + ']._tagR'] = tag > 0 ? 1 : 0;
    this.setData(patch);
  },

  // 轻触（未移动）：进人物详情（无位移 ⇒ 无需复位，姿态未变）
  onStackTap(detail) {
    var id = detail.id;
    if (!id) return;
    this.onTapFigure({ currentTarget: { dataset: { id: id } } });
  },

  // 力度不够 → 弹回：tag 归零 + 回收该卡节点（ukey 递增 ⇒ 旧节点销毁、
  // WXS 拖拽残留随之消失，新节点按数据 _style 瞬移回牌堆位）
  onStackBack(detail) {
    this._resetStackTag(detail.sidx);
    this._recycleCard(detail.sidx);
  },

  // 纵向主导 / 系统打断 → 放弃拖拽弹回（绝不当点击）
  onStackGiveUp(detail) {
    this._resetStackTag(detail.sidx);
    this._recycleCard(detail.sidx);
  },

  _resetStackTag(sidx) {
    if (isNaN(sidx)) return;
    var f = (this.data.carouselFigures || [])[sidx];
    if (!f) return;
    if (f._tagL === 0 && f._tagR === 0) return; // 已是隐藏态：跳过 setData
    var patch = {};
    patch['carouselFigures[' + sidx + ']._tagL'] = 0;
    patch['carouselFigures[' + sidx + ']._tagR'] = 0;
    this.setData(patch);
  },

  // 甩出：动画由 WXS touchEnd 直接完成；这里只做数据层循环。
  // 只有一张卡时（order < 2）不循环，回收节点归位到顶位。
  onStackThrow(detail) {
    var sidx = detail.sidx;
    if (isNaN(sidx)) return;
    var order = this._stackOrder || [];
    if (order.length < 2) {
      this._recycleCard(sidx); // 不循环：回收 ⇒ 新节点按数据 _style 回顶位
      return;
    }
    this._throwStackCard(sidx, detail.dx);
  },

  // 顶卡甩出 → 320ms（甩出动画时长）后换一个新姿态压回牌堆底（循环）。
  // 本方法不写任何样式：回收该卡节点（ukey 递增）后，新节点按 _layoutStack
  // 算出的数据 _style 渲染——这是消 WXS 残留的唯一入口（见 stack.wxs 头注）。
  _throwStackCard(sidx, dx) {
    var that = this;
    setTimeout(function () {
      var order = that._stackOrder;
      var list = that.data.carouselFigures || [];
      if (!order || order.length < 2) { that._recycleCard(sidx); return; }
      var p = order.indexOf(sidx);
      if (p === -1) { that._recycleCard(sidx); return; }
      order.splice(p, 1);
      var f = list[sidx];
      if (f) {
        // 循环：换新姿态压回牌堆底
        f._rot = +(Math.random() * 10 - 5).toFixed(2);
        f._ox = Math.round(Math.random() * 20 - 10);
        f._oy = Math.round(Math.random() * 12);
      }
      order.unshift(sidx);
      // 回收该卡：旧节点（含 WXS 甩出残留）销毁，新节点按牌堆底数据姿态渲染
      that._recycleCard(sidx);
      // 其余卡重排（它们没被拖过，数据 _style 直接生效）
      that._layoutStack();
    }, 320);
  },

  onContentScroll(e) {
    const scrollTop = e.detail.scrollTop || 0;
    this._lastScrollTop = scrollTop; // 供回顶时先对齐当前值再归零
    // 内容一开始滚动就收起联想面板：下拉是绝对定位浮层，滚动时继续挂着会压住真实结果
    if (this.data.showSuggests) this.setData({ showSuggests: false });
    if (scrollTop > 300 && !this.data.showBackTop) {
      this.setData({ showBackTop: true });
    } else if (scrollTop <= 300 && this.data.showBackTop) {
      this.setData({ showBackTop: false });
    }
  },

  onBackToTop() {
    // 页面主体是 height:100vh 的 scroll-view，wx.pageScrollTo 作用于页面级滚动不生效；
    // 用 scroll-top 绑定回顶（先设为当前值再归零，保证两次 setData 值有变化触发滚动）
    var that = this;
    var cur = this._lastScrollTop || 0;
    this.setData({ scrollTopVal: cur }, function () {
      that.setData({ scrollTopVal: 0 });
    });
  },

  /**
   * 引导需要把某块内容滚进视口时由 guide-layer 触发（组件量不到 scroll-view 的滚动位置）。
   * 目标下方预留约一张引导卡片的高度，方便卡片落在目标下方；滚不到时组件会翻到上方。
   */
  onGuideScrollTo(e) {
    const selector = (e && e.detail && e.detail.selector) || '';
    if (!selector) return;
    const that = this;
    const navH = (this.data.safeAreaTop || 0) + 44; // 固定导航条占位
    const reserve = 280; // 给卡片留的高度，避免滚到底后卡片没地方放
    wx.createSelectorQuery()
      .select('.content-scroll')
      .boundingClientRect()
      .select(selector)
      .boundingClientRect()
      .exec(function (res) {
        const view = res && res[0];
        const rect = res && res[1];
        if (!view || !rect) return;
        const topLimit = view.top + navH + 12;
        const bottomLimit = view.bottom - reserve;
        const cur = that._lastScrollTop || 0;
        let next = cur;
        if (rect.top < topLimit) next = cur + (rect.top - topLimit);
        else if (rect.bottom > bottomLimit) next = cur + (rect.bottom - bottomLimit);
        next = Math.max(0, Math.round(next));
        if (Math.abs(next - cur) < 2) return;
        that._lastScrollTop = next;
        // 与回顶同一套写法：先把 scroll-top 对齐当前值，再设新值，确保值变化触发滚动
        that.setData({ scrollTopVal: cur }, function () {
          that.setData({ scrollTopVal: next });
        });
      });
  },

  searchTimer: null,

  getMatchType(item, query) {
    if (!query) return null;
    var rel = getRelMod();
    var nameCoreHits = rel.nameCoreHits;
    var toPinyin = getPinyinMod().toPinyin;
    const q = query.toLowerCase().trim();
    const name = String(item.name || '').toLowerCase();

    // ===== 一、精确结果（进「搜索结果」区）=====
    // [重要] 判定口径（2026-09-16 第三次修订，与 Web 端 HomePage._isExact 严格对齐）：
    //    1) 姓名**完全等于**关键词            → 如「秦始皇」搜「秦始皇」
    //    2) 单字查询时**前缀命中**            → 如搜「李」出「李白」
    //    3) nameEn 完全相等                   → 英文名
    //    4) [重要] 多字查询时**姓名包含关键词**    → 如「唐太宗李世民」搜「李世民」
    //
    //    (4) 是本轮新增。此前口径只有 1)/2)/3)，导致库中名为「唐太宗李世民」
    //    （id=53）的人物在搜「李世民」时**无法进入搜索结果区** ——
    //    因为库里根本没有名为「李世民」的人，`name === q` 永不成立，
    //    于是整个「搜索结果」区因 exactMatches 为空而不渲染，
    //    只剩「相关人员 共 67 位」，且第一条就是「唐太宗李世民」本身，
    //    看起来像「搜索结果和 Web 端不一致 / 和其他人物不一样」。
    //
    //    [注意] 历史教训：更早的旧实现用 `includes` 做包含判定，但**不分层**，
    //    于是「王氏(张作霖母)」因含「张作霖」被误判为精确结果，
    //    与 Web 端（name === query）不一致 —— 那时的问题不是「不该包含」，
    //    而是「不该与完全相等平级」。现在按「完全相等 > 包含」分层排序，
    //    两者兼得：该进的进得来，该靠前的靠最前。
    if (name === q) return 'exact';
    if (q.length <= 1 && name.indexOf(q) === 0) return 'exact';
    if (item.nameEn && item.nameEn.toLowerCase() === q) return 'exact';
    // 多字：姓名**核心部分（剔除括注）**包含关键词才算精确命中。
    // 用 nameCoreHits 而非裸 name.indexOf —— 否则「长孙氏(李世民妻)」「王氏（张作霖母）」
    // 这类括注里提到关键词的名字会被误判成精确结果，挤进「搜索结果」区。
    if (q.length >= 2 && nameCoreHits(item.name, q)) return 'exact';
    // [重要] 别名命中（2026-10-20 新增，与 Web 端 HomePage 同口径）：
    //    服务端主结果（_serverHit）中 name 字面不含关键词的，是靠 figure_alias 命中的正主
    //    —— 搜「道光」→ 爱新觉罗·旻宁（name 里没有「道光」二字），搜「康熙」→ 爱新觉罗·玄烨。
    //    它正是关键词所指的本人，必须进「搜索结果」区；否则会被下面的 bio/tags 子串判定
    //    丢进「相关人员」区，或整条返回 null 被丢弃（旧版首页搜「道光」找不到道光帝的成因）。
    //    [注意] 仅对服务端主结果生效：本地回退池（fullFigures）不带此标记，仍按字面/拼音召回，避免误判。
    if (item._serverHit && name.indexOf(q) === -1) return 'exact';

    // ===== 二、相关人员（进「相关人员」区）=====
    // 其他匹配使用预索引的拼音/朝代/标签（搜索更快）
    const pinyin = item._pinyin || (item._pinyin = toPinyin(item.name).toLowerCase());
    if (name.includes(q)) return 'related';
    if (pinyin.includes(q)) return 'related';
    if (item.dynasty && (item.dynasty.toLowerCase().includes(q) || (item._dynastyPinyin || (item._dynastyPinyin = toPinyin(item.dynasty).toLowerCase())).includes(q))) return 'related';
    if ((item.tags || []).some(function(tag) { return tag.toLowerCase().includes(q); })) return 'related';
    if (item.bio && item.bio.toLowerCase().includes(q)) return 'related';
    if (item.region && item.region.toLowerCase().includes(q)) return 'related';
    return null;
  },

  // 精确结果的排序权重：数字越小越靠前。
  //   0 = 姓名完全等于关键词（用户要找的就是它）
  //   1 = 姓名以关键词结尾（「唐太宗李世民」搜「李世民」—— 姓名后段即本名，次优）
  //   2 = 姓名以关键词开头（「李白玉」搜「李白」）
  //   3 = 姓名中间包含（「唐太宗李世民」搜「太宗」）
  // 这样「李世民」搜出来的「唐太宗李世民」不会被其他包含型结果挤下去，
  // 也不会压过「秦始皇」搜「秦始皇」这种完全相等的首位。
  _exactRank(item, query) {
    const q = String(query || '').toLowerCase().trim();
    const name = String(item.name || '').toLowerCase();
    if (!q || !name) return 9;
    if (name === q) return 0;
    if (item.nameEn && item.nameEn.toLowerCase() === q) return 0;
    const idx = name.indexOf(q);
    // 别名命中（服务端主结果、name 不含关键词，如「道光」→ 爱新觉罗·旻宁）：
    // 归入第一层（rank 0），与「姓名完全相等」同层，层内保持服务端「知名度分」顺序，
    // 避免被字面同名/后缀同名的薄记录（周道光、吴道光…）挤到后面。
    if (idx === -1) return item._serverHit ? 0 : 9;
    if (idx + q.length === name.length) return 1;  // 结尾匹配
    if (idx === 0) return 2;                        // 前缀匹配
    return 3;                                       // 中间包含
  },

  onSearchInput(e) {
    const raw = e.detail.value || '';
    const query = raw.trim().toLowerCase();
    // 输入时收起范围下拉面板（与 Web 端一致：联想与范围面板互斥）
    this.setData({ searchQuery: raw, emperorDropdownOpen: false, empPanelPad: 0 });
    // 联想词先走（200ms 短防抖），整轮检索仍是原来的 500ms，两者互不阻塞
    this._fetchSuggest(raw);
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.doSearch(query), 500);
  },

  // 输入联想（自动补全）：GET /api/figures/autocomplete?prefix=&limit=
  // 请求序号 _suggestSeq 用于丢弃过期响应 —— 快速连打时后到的旧响应不得覆盖新结果。
  _fetchSuggest(raw) {
    const kw = (raw || '').trim();
    if (this._suggestTimer) clearTimeout(this._suggestTimer);
    if (!kw) {
      if (this.data.showSuggests || this.data.suggests.length) {
        this.setData({ suggests: [], showSuggests: false });
      }
      this._suggestSeq = (this._suggestSeq || 0) + 1; // 作废在途请求
      return;
    }
    const reqId = (this._suggestSeq = (this._suggestSeq || 0) + 1);
    this._suggestTimer = setTimeout(() => {
      request({
        timeout: 5000,
        url: API.FIGURES.AUTOCOMPLETE + '?prefix=' + encodeURIComponent(kw) + '&limit=8',
        success: (res) => {
          if (reqId !== this._suggestSeq) return; // 过期响应，丢弃
          const d = res.data || {};
          const list = (d.success && Array.isArray(d.data)) ? d.data : [];
          // 首条与输入完全同名时去掉：那就是本次检索的首位结果，重复展示无增量信息
          const trimmed = list.filter(function (it) {
            return it && it.name && it.name !== kw;
          });
          this.setData({ suggests: trimmed, showSuggests: trimmed.length > 0 });
        },
        fail: () => {
          if (reqId !== this._suggestSeq) return;
          this.setData({ suggests: [], showSuggests: false });
        }
      });
    }, 200);
  },

  // 点选联想词：直接以该人名发起检索（跳过防抖等待）
  onTapSuggest(e) {
    const item = this.data.suggests[Number(e.currentTarget.dataset.index)];
    if (!item || !item.name) return;
    const name = item.name;
    if (this.searchTimer) clearTimeout(this.searchTimer);
    if (this._suggestTimer) clearTimeout(this._suggestTimer);
    this._suggestSeq = (this._suggestSeq || 0) + 1; // 在途联想请求作废
    this.setData({
      searchQuery: name,
      suggests: [],
      showSuggests: false,
      emperorDropdownOpen: false,
      empPanelPad: 0
    });
    recentQuery.save(name); // 与查询页共用「最近查询」，两入口记录不再割裂
    this.doSearch(name);
  },

  // 聚焦：有输入且已有联想结果时重新展开（如用户清屏后再点回来）
  onSearchFocus() {
    if (this.data.suggests.length && (this.data.searchQuery || '').trim()) {
      this.setData({ showSuggests: true, emperorDropdownOpen: false, empPanelPad: 0 });
    }
  },

  // 失焦：延迟收起，给「点联想词」的 tap 留出落地时间（blur 先于 tap 触发）
  onSearchBlur() {
    if (this._blurTimer) clearTimeout(this._blurTimer);
    this._blurTimer = setTimeout(() => {
      if (this.data.showSuggests) this.setData({ showSuggests: false });
    }, 180);
  },

  // 键盘「搜索」键：立即检索，不再等 500ms 防抖（用户已明确表达「就搜这个」）
  onSearchConfirm() {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    if (this._suggestTimer) clearTimeout(this._suggestTimer);
    this._suggestSeq = (this._suggestSeq || 0) + 1;
    this.setData({ suggests: [], showSuggests: false });
    const q = (this.data.searchQuery || '').trim();
    if (q) recentQuery.save(q); // 显式确认搜索才记入「最近查询」，避免记录半截输入
    this.doSearch();
  },

  // 联想面板内空白处的点击：只吞掉冒泡，不收起（面板本身要留着让用户继续点）
  onSugPanelTap() {},

  // 抽取的公共搜索+关系逻辑。
  // 仅在有关键词时调用 —— 无搜索词的默认展示走 _loadHomeFeed（服务端随机取样）。
  _executeSearch(filtered, query, forcedPickId) {
    var rel = getRelMod();
    var isGenericRelation = rel.isGenericRelation;
    var ROLE_SIMPLIFY = rel.ROLE_SIMPLIFY;
    var normalizeChildType = rel.normalizeChildType;
    var sortRelated = rel.sortRelated;
    // 记录本次检索池，供「选择人物」时原地重算关系（无需重新请求）
    this._searchPool = filtered;
    // 关系映射按「当前检索池」懒构建：仅当映射尚未对应该池时才重建。
    // _relationMap 只被本函数经 _getRelated 消费，故在此保证其就绪即可
    // —— 与「搜索索引懒构建」同一范式，把 2000 条映射构建移出启动/刷新链路。
    if (this._relationMapSrc !== filtered) {
      this._buildRelationMap(filtered);
    }
    if (query) {
      const exact = [];
      const related = [];
      const potentialRelated = [];
      const addedIds = new Set();
      const q = query.toLowerCase().trim();

      // Combined pass: find exact matches and collect potential related in one traversal
      filtered.forEach(item => {
        const type = this.getMatchType(item, q);
        if (type === 'exact' && !addedIds.has(item.id)) {
          exact.push(item);
          addedIds.add(item.id);
        } else if (type === 'related') {
          potentialRelated.push(item);
        }
      });

      // [重要] 精确结果分层排序（2026-09-16 新增）：
      //    完全相等(0) → 结尾匹配(1) → 前缀匹配(2) → 中间包含(3)。
      //    例：搜「李世民」时库里只有「唐太宗李世民」（结尾匹配，rank=1），
      //    它会稳定排在所有「含李世民但位置更靠前」的结果之上。
      //    例：搜「李白」既有「李白」(rank=0) 又有「李白玉」(rank=2)，
      //    「李白」必在首位。同 rank 内保持服务端返回的原始顺序（稳定排序）。
      if (exact.length > 1) {
        var exactRanked = exact.map(function (f, i) {
          return { f: f, i: i, r: this._exactRank(f, q) };
        }.bind(this));
        exactRanked.sort(function (a, b) {
          return (a.r - b.r) || (a.i - b.i);
        });
        exact.length = 0;
        exactRanked.forEach(function (x) { exact.push(x.f); });
      }

      // [重要] 同名多人「选择态」（2026-10-13 新增）：
      //    搜索结果 ≥2 位时**不预选**，等用户点卡片选一位，再只渲染该人物的关系网，
      //    避免「搜杨坚时同时显示『杨坚[宋]』与『隋文帝杨坚[隋]』两套关系」的混淆，
      //    也避免默认选中恰好不是用户想要的那位。
      //    仅 1 位命中时 pickedId 即那一位，行为与旧版完全一致。
      //    用户已选择（selectedMatchId）或本次是指定点选（forcedPickId）时沿用该 id。
      var pickedId = (forcedPickId != null && forcedPickId !== '')
        ? String(forcedPickId)
        : String(this.data.selectedMatchId || '');
      if (exact.length === 0) {
        pickedId = '';
      } else if (!exact.some(function (f) { return String(f.id) === pickedId; })) {
        // 无有效选中：1 位自动命中；≥2 位保持未选中，等待用户点选
        pickedId = (exact.length === 1) ? String(exact[0].id) : '';
      }

      // Second pass: process relations of exact matches（只处理选中人物）
      exact.filter(function (f) { return String(f.id) === pickedId; }).forEach(item => {
        // 统计配偶数量，用于动态分配标签（原配、二夫人...）
        // [重要] 判定规则：优先按关系 type 判定是否配偶；type 为空才回退 description 正则。
        // 原先仅凭 description 匹配（如"之妻"）会把"儿媳：于凤至（张学良之妻）"
        // 这类描述误判为配偶，导致于凤至被编为张作霖的"七夫人"。
        var allFig = this._allFigures.find(function(f) { return f.id === item.id; });
        var spouseRelDescs = [];
        if (allFig && allFig.relations) {
          // [重要] 同 targetId 去重（同一配偶可能有多条边：徐惠同时有「妃嫔」「妻子」）
          var spouseSeen = {};
          allFig.relations.forEach(function(r) {
            var st = isSpouseType(r.type);
            var hit = false;
            if (st === true) {
              hit = true;
            } else if (st === null) {
              // type 缺失 → 回退 desc 正则，但排除姻亲描述（儿媳/女婿/公公等）
              var d = r.description || '';
              if (/之妻|原配|夫人|妾室|侧室|伴侣|皇后|妃子|之夫|之丈夫|夫君/.test(d)
                && !/儿媳|女婿|公公|岳父|岳母|丈人|亲家/.test(d)) {
                hit = true;
              }
            }
            if (hit && !spouseSeen[r.targetId]) {
              spouseSeen[r.targetId] = true;
              spouseRelDescs.push({ targetId: r.targetId, type: r.type || '', desc: r.description || '' });
            }
          });
        }
        // [重要] 配偶地位排序（2026-09-16 修订）：不能只按数据原始顺序——
        //    李世民的数据里武则天(targetId 最小)排最前，会被误标「原配」，
        //    而真正的原配长孙皇后(desc 含「皇后」)被排到后面。
        //    改为「正室优先」：皇后/原配/正妻/结发妻/第一任妻 排最前，
        //    其余（妻子/才人/妃嫔/妾室）按原顺序。这样长孙皇后必为原配。
        spouseRelDescs.sort(function(a, b) {
          var wa = /皇后|原配|正妻|正室|结发妻|第一任妻|元配/.test(a.type + '|' + a.desc) ? 0 : 1;
          var wb = /皇后|原配|正妻|正室|结发妻|第一任妻|元配/.test(b.type + '|' + b.desc) ? 0 : 1;
          return wa - wb;
        });
        var spouseCount = spouseRelDescs.length;
        // 用排序后的顺序建立索引映射，确保「原配」标签落在正室（皇后/原配）上
        var spouseIndexMap = {};
        spouseRelDescs.forEach(function(s, idx) { spouseIndexMap[s.targetId] = idx; });

        const rels = this._getRelated(item.id);
        rels.forEach(r => {
          if (addedIds.has(r.relFig.id)) return;
          var relType = r.relType || '';
          // 动态配偶标签：多配偶时按数据原始顺序分配，单配偶保持"妻子"
          if (spouseIndexMap.hasOwnProperty(r.relFig.id)) {
            var spouseIdx = spouseIndexMap[r.relFig.id];
            if (spouseCount > 1) {
              if (spouseIdx === 0) relType = '原配';
              else {
                var numArr = ['二', '三', '四', '五', '六', '七', '八', '九', '十'];
                var num = (spouseIdx - 1 < numArr.length) ? numArr[spouseIdx - 1] : String(spouseIdx + 1);
                relType = num + '夫人';
              }
            } else {
              // 单配偶：按中心人物性别显示对方称谓（女中心人物配"丈夫"，与 web 端一致）
              relType = (allFig && allFig.gender === '女') ? '丈夫' : '妻子';
            }
          }
          // [重要] 过滤「泛关系」（赠诗/下属为Y/战胜/处决/纳降/思想影响…）：
          //    这类是「一次事件/文献往来」而非「一层明确关系」，会以大量噪音
          //    挤在相关人员列表里、把真正的亲属臣僚推到后面（李世民相关 187 位里
          //    占 69 位 = 37%）。只保留有明确人物的关系（夫妻/血缘/师生/君臣/对手…）。
          if (isGenericRelation({ _relationType: relType, _relationDesc: r.relDesc || '' }, item.id)) {
            return;
          }
          // [重要] 展示层 type 归一（2026-09-16 新增）：库里「儿子」的 type 混用
          //    `儿子`/`子`/`长子`/`九子`/`长子; 第一子`，直接展示会「有的标儿子
          //    有的标子」。这里统一：ROLE_SIMPLIFY 能归一（子→儿子）优先，
          //    否则用 normalizeChildType 把带排行的子女类型归一成「儿子/女儿」。
          //    注意：动态配偶标签（原配/二夫人…）与配偶词本身已被 ROLE_SIMPLIFY
          //    处理，normalizeChildType 内部有 SPOUSE_TYPE_RE 守卫不碰它们。
          var displayType = relType;
          if (displayType && !(spouseIndexMap.hasOwnProperty(r.relFig.id))) {
            var simp = ROLE_SIMPLIFY[displayType];
            if (simp && simp !== displayType) {
              displayType = simp;
            } else {
              displayType = normalizeChildType(displayType);
            }
          }
          related.push({
            id: r.relFig.id, name: r.relFig.name, nameEn: r.relFig.nameEn,
            dynasty: r.relFig.dynasty, nationality: r.relFig.nationality,
            birthYear: r.relFig.birthYear, deathYear: r.relFig.deathYear,
            avatar: r.relFig.avatar, bio: r.relFig.bio, tags: r.relFig.tags,
            region: r.relFig.region || '',
            _relationType: displayType, _relationDesc: r.relDesc || '',
            _rawType: relType
          });
          addedIds.add(r.relFig.id);
        });
      });

      // Process potential related: filter out items already added by relations
      potentialRelated.forEach(item => {
        if (addedIds.has(item.id)) return;
        var relLabel = '';
        if (item.dynasty && item.dynasty.toLowerCase().includes(q)) relLabel = '同朝代';
        else if ((item.tags || []).some(function(t) { return t.toLowerCase().includes(q); })) relLabel = '同类别';
        else if (item.region && item.region.toLowerCase().includes(q)) relLabel = '同地区';
        else relLabel = '相关内容';
        related.push(Object.assign({}, item, { _relationType: relLabel, _relationDesc: '' }));
        addedIds.add(item.id);
      });

      // 先排序再截取，确保顺序正确（与 Web 端一致）
      // ctx 供「岳父随女儿排行」推导用：中心人物的关系网 + 已收集相关人的关系标签映射。
      // 例：张作霖的两位岳父，赵占元（原配赵春桂之父 rank21）应排在寿山（五夫人寿懿之父 rank25）之前。
      if (exact.length > 0) {
        var mainFig = exact.filter(function (f) { return String(f.id) === pickedId; })[0] || exact[0];
        var mainFull = this._allFigures.find(function (f) { return String(f.id) === String(mainFig.id); });
        var relCtxList = (mainFull && mainFull.relations) || [];
        var relationOf = {};
        related.forEach(function (r) {
          relationOf[String(r.id)] = { _relationType: r._relationType, _relationDesc: r._relationDesc, name: r.name };
        });
        related.sort(sortRelated(mainFig, { relations: relCtxList, relationOf: relationOf }));
      }

      // [重要] setData 只送「模板真正会读的字段」——exact/related 的原始对象可能携带
      //    relations/works/events/bio/tags/nameEn/avatar 等大字段（服务端搜索返回的档
      //    含 relations；本地「潜在相关」路径用 Object.assign 整份拷贝），
      //    200 条 × 每条数百字节~1KB ⇒ 白白跨线程序列化，是搜索卡顿的主要来源。
      //    模板只会读：id / name / _char / dynasty / nationality / _picked /
      //    _relationType / _relationDesc / _relClass（已逐一核对 index.wxml）。
      //    JS 侧对 this.data.exactMatches/relatedMatches 仅读 .length（已核查）⇒ 裁剪安全。
      //    注意：_rawType / _relationType 仅供排序（sortRelated）使用，排序在上一步已完成，
      //    故此处无需携带；且改为产出新对象，不再就地改写 fullFigures 里的原始档。
      var exactCard = function (o) {
        return {
          id: o.id,
          name: o.name,
          _char: (o.name || '?').charAt(0),
          dynasty: o.dynasty,
          nationality: o.nationality,
          _picked: (String(o.id) === pickedId)
        };
      };
      var relCard = function (o) {
        var t = o._relationType || '';
        var cls;
        if (/父|母|岳|翁|姑|舅|姨|伯|叔/.test(t)) cls = 'rel-badge-pink';
        else if (/子|女|媳|婿|孙|侄|甥/.test(t)) cls = 'rel-badge-blue';
        else cls = 'rel-badge-purple';
        return {
          id: o.id,
          name: o.name,
          _char: (o.name || '?').charAt(0),
          dynasty: o.dynasty,
          nationality: o.nationality,
          _relationType: t,
          _relationDesc: o._relationDesc || '',
          _relClass: cls
        };
      };
      var displayExact = exact.slice(0, 50).map(exactCard);
      var displayRelated = related.slice(0, 200).map(relCard);

      var pickedFig = exact.filter(function (f) { return String(f.id) === pickedId; })[0] || null;

      this.setData({
        exactMatches: displayExact,
        relatedMatches: displayRelated,
        selectedMatchId: pickedId,
        pickedMatchName: (exact.length > 1 && pickedFig) ? pickedFig.name : ''
      });
    }
  },

  // 搜索范围触发器：点开/收起下拉面板（任何时候都可点开；无关键词时面板内会提示筛选暂不生效）。
  toggleEmperorDropdown() {
    const open = !this.data.emperorDropdownOpen;
    this.setData({ emperorDropdownOpen: open, empPanelPad: open ? this.data.empPanelPad : 0 }, () => {
      if (open) this._measureEmpPanelPad();
    });
  },

  // 点面板外的透明遮罩 → 收起面板（不改变筛选值）
  closeEmperorDropdown() {
    if (this.data.emperorDropdownOpen) this.setData({ emperorDropdownOpen: false, empPanelPad: 0 });
  },

  // 实测下拉面板高度，回写到 .search-box 的 margin-bottom（等价于 Web 端按浮层高度撑开占位）：
  // 面板是绝对定位浮层、不占文档流，不撑开的话其下缘会压在下方的统计条与人物卡片上。
  _measureEmpPanelPad() {
    wx.nextTick(() => {
      this.createSelectorQuery()
        .select('.emp-dropdown')
        .boundingClientRect((rect) => {
          const h = rect && rect.height ? rect.height : 0;
          if (h) this.setData({ empPanelPad: Math.round(h) + 16 });
        })
        .exec();
    });
  },

  // 搜索范围筛选（全部 / 帝王 / 非帝王，与 Web 端同文案同口径）。
  // 任何时候都可选择并保存；无关键词时不触发检索，首页随机展示不受影响（面板内有提示）。
  onEmperorFilterTap(e) {
    const value = (e && e.currentTarget && e.currentTarget.dataset)
      ? String(e.currentTarget.dataset.value == null ? '' : e.currentTarget.dataset.value)
      : '';
    if (value === String(this.data.emperorFilter || '')) {
      // 选中的就是当前项：只收起面板
      this.setData({ emperorDropdownOpen: false, empPanelPad: 0 });
      return;
    }
    // 触发器文字随选项回写（与 Web 端 currentOption.label 一致）
    let label = '全部';
    const opts = this.data.emperorFilterOptions || [];
    for (let i = 0; i < opts.length; i++) {
      if (String(opts[i].value) === value) { label = opts[i].label; break; }
    }
    this.setData({ emperorFilter: value, emperorFilterLabel: label, emperorDropdownOpen: false, empPanelPad: 0 }, () => {
      // 切换筛选后重跑检索：doSearch 内部会重置「同名多人选择态」
      this.doSearch();
    });
  },

  doSearch(query) {
    const q = (this.data.searchQuery || '').trim();
    const finish = (typeof query === 'function') ? query : function(){};
    // 每次发起新检索都重置「同名多人选择态」：上一轮的选中人物不该在新结果里延续
    if (String(this.data.selectedMatchId) !== '') {
      this.setData({ selectedMatchId: '', pickedMatchName: '' });
    }
    if (q) {
      // 每次发起新检索先清空上一次的纠错提示；若本次服务端命中别名纠正，_applyServerSearch 会重新写入
      this.setData({ searchHint: null });

      // 优先服务器搜索：返回含 relations 的精确结果与相关人物（与 Web 端一致）
      const empFilter = this.data.emperorFilter;
      this._fetchServerSearch(q, (err, data) => {
        if (!err && data && ((data.list || []).length > 0 || (data && data.searchHint))) {
          this._applyServerSearch(q, data);
        } else if (empFilter) {
          // [重要] 帝王筛选生效时以服务端为准，**不回退本地池**：本地池（全局数据层）没有
          //    帝王/非帝王判定能力，回退会把非目标人物漏进结果 ⇒ 此处直接给空结果走空态。
          this._applyServerSearch(q, data || { list: [], relatedFigures: [] });
        } else {
          // 回退本地搜索（保留拼音搜索等能力）：用全局数据层作为检索池，
          // 而非首页那 20 位随机人物。
          // [重要] P1-2：池已改为按需加载 ⇒ 服务端搜索失败时先确保池就绪再检索
          //（此前池由冷启动无条件拉取，现在只在真正需要时才拉，仅此路径会拉）。
          // 池最终也拉不到时，仍以当前（可能为空的）池执行 —— 与改动前「池为空」
          // 时的行为完全一致（零结果），不会比原来更差。
          const runLocalSearch = () => this._executeSearch(fullFigures, q);
          ensurePool(runLocalSearch, runLocalSearch);
        }
        // 若传入待执行的回调（如停止下拉动画），搜索完成后调用；均不改变原搜索行为
        finish();
      });
    } else {
      // 无搜索词：回到首页随机展示（重新取一批，与首屏行为一致）
      if (this.data.showSuggests || this.data.suggests.length) {
        this.setData({ suggests: [], showSuggests: false });
      }
      // force：用户明确要「回到随机展示」，必须换新一批，不能被缓存牌堆的保鲜规则挡住
      this._loadHomeFeed(null, true);
      finish();
    }
  },

  // 服务器搜索：调用 /api/figures?search= 获取含 relations 的精确结果和相关人物
  _fetchServerSearch(query, callback) {
    // 帝王筛选（emperor=1|0）与 Web 端共用同一后端口径，空值时不传参
    const emp = this.data.emperorFilter ? ('&emperor=' + this.data.emperorFilter) : '';
    request({
      timeout: 10000,
      url: API.FIGURES.LIST + '?search=' + encodeURIComponent(query) + '&pageSize=20&skipRelated=0' + emp,
      success: (res) => {
        const d = res.data || {};
        if (d.success && d.data) {
          callback(null, d.data);
        } else {
          callback(new Error('服务器返回异常'));
        }
      },
      fail: () => callback(new Error('网络请求失败'))
    });
  },

  // 将服务器搜索结果应用到页面：合并精确结果与相关人物，重建关系映射后复用本地渲染逻辑
  _applyServerSearch(query, data) {
    const normalize = (f) => {
      if (!f) return f;
      return Object.assign({}, f, {
        id: String(f.id),
        tags: tagFilter.visibleTags(f.tags),
        relations: Array.isArray(f.relations) ? f.relations : []
      });
    };
    const list = (data.list || []).map(normalize);
    const related = (data.relatedFigures || []).map(normalize);
    // [重要] 纠错提示 / 选择卡片：服务端别名召回补丁在「输入词被纠正」时回传 searchHint。
    //   · 单一候选：{matched} → 自动跳转 + 小横幅提示；
    //   · 多候选：{candidates:[...]} → 不自动跳转，交给前端「是不是想找以下人物」选择卡片。
    const rawHint = (data && data.searchHint) || null;
    if (rawHint && Array.isArray(rawHint.candidates)) {
      rawHint.candidates = rawHint.candidates.map(c => Object.assign({}, c, { _char: (c.name || '?').charAt(0) }));
    }
    this.setData({ searchHint: rawHint });
    // [重要] 标记服务端主结果（2026-10-20）：其中可能包含「别名命中」的正主（name 不含关键词，
    //    如搜「道光」→ 爱新觉罗·旻宁）。getMatchType / _exactRank 据此把它归入
    //    「搜索结果」区并置顶，而不是被当作「相关人员」或直接丢弃。
    list.forEach(function (f) { if (f) f._serverHit = true; });
    const seen = {};
    const all = [];
    list.concat(related).forEach(function(f) {
      if (!f || !f.id) return;
      if (!seen[f.id]) { seen[f.id] = true; all.push(f); }
    });

    this._allFigures = all;
    this._buildRelationMap(all);
    this._executeSearch(all, query);
  },

  onClearSearch() {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    if (this._suggestTimer) clearTimeout(this._suggestTimer);
    this._suggestSeq = (this._suggestSeq || 0) + 1; // 在途联想请求作废
    this.setData({
      searchQuery: '',
      emperorDropdownOpen: false,
      empPanelPad: 0,
      searchHint: null,
      suggests: [],
      showSuggests: false
    });
    this._loadHomeFeed(null, true);
  },

  onShow() {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }
    this._syncUser();
    // 专题文章：热启动/切回首页时按节流重取（默认 60 秒内不重复请求），
    // 保证后台发完新文章后，用户回到首页即可看到，而不必杀掉小程序冷启动
    this._loadLatestArticles();
    // 关系映射改为「首次检索时懒构建」（见 _executeSearch），此处不再急切重建：
    // onShow 是热启动/切回首页的高频路径，为 2000 条建映射没有收益。
    // 查询 Tab 页搜索接力：switchTab 无法带参，经 globalData.pendingSearch 传递
    var pending = app.globalData.pendingSearch;
    if (pending) {
      app.globalData.pendingSearch = null;
      this.setData({ searchQuery: pending });
      this.doSearch(pending);
    }
    // 从「使用指南」重看返回首页：onShow 早于 onReady，交给延时启动兜底
    this._tryAutoGuide();
  },

  _syncUser() {
    if (!app.globalData._userCache) {
      // 一次取全登录态快照（内存缓存 + 落盘透写），避免连续多次同步读存储
      const snap = authStore.snapshot();
      app.globalData._userCache = { userInfo: snap.userInfo, isAdmin: snap.isAdmin };
    }
    // [注意] 本页模板不渲染任何登录态字段（登录态由「我的」页承载），故不再 setData。
    //    上方 _userCache 预热必须保留：该缓存跨页面共用（「我的」「反馈」等页读它）。
  },

  onNavPage(e) {
    const url = e.currentTarget.dataset.url;
    if (!url) return;
    // 防重复跳转：快卡/磁贴连点，或上一次跳转动画未结束时再次 navigateTo，
    // 会触发「routeDone with a webviewId ... is not found」类路由异常。
    if (this._navLock) return;
    this._navLock = true;
    setTimeout(() => { this._navLock = false; }, 800);
    navTo(url, {
      fail: () => { this._navLock = false; }
    });
  },

  // 注：原 `onAdminNav` 已删除（2026-09-28）。它指向 /admin-pkg/pages/login/login，
  // 但 wxml 中已无任何绑定（首页后台入口早已移除），属死代码；留着容易被误绑从而
  // 在首页暴露后台入口。管理入口现只保留在「我的」页且受 isAdmin 条件控制。

  // 注：原「快捷入口」的 onOpenGraph / onOpenFootprint 已删除（2026-11-10）。
  // 两页在无 figureId 时是「空态 + 自选人物」的引导页（图谱页给搜索框、足迹页给空态
  // 遮罩与热门人物），首页磁贴本身不带任何人物上下文，进入后必然停在空态；
  // 入口统一收敛到人物详情页 dock 的「关系」「足迹」。图谱页 / 足迹页本身保留，
  // 仍由世系页「查看关系图谱」与详情页「足迹」带 id 进入。

  // 搜索结果卡点击（2026-10-13）：
  //   ≥2 位同名 → 视为「选择要查看关系网的人物」，原地重算关系，不进详情；
  //   仅 1 位 → 保持旧行为：直接进人物详情页。
  //   想看详情时点卡片右侧「详情 ›」按钮（该按钮 catchtap="onTapFigure"）。
  onSearchCardTap(e) {
    if ((this.data.exactMatches || []).length > 1) {
      this.onPickMatch(e);
    } else {
      this.onTapFigure(e);
    }
  },

  // 切换「当前查看关系网」的人物（同名多人时）。
  // 用本次检索池原地重算，无需重新请求服务器；forcedPickId 保证不被默认选中逻辑覆盖。
  onPickMatch(e) {
    var id = e.currentTarget.dataset.id;
    if (!id) return;
    if (String(id) === String(this.data.selectedMatchId)) return; // 重复点同一张，忽略
    this._executeSearch(this._searchPool || [], this.data.searchQuery, id);
  },

  // 纠错「选择人物」卡片点击：用纠正后的别名（如「宣统」）重新检索，
  // 服务端会精确命中对应人物，避免被高权重项偷偷抢走答案。
  onPickCorrection(e) {
    const alias = e.currentTarget.dataset.alias;
    if (!alias || this._navLock) return;
    this._navLock = true;
    setTimeout(() => { this._navLock = false; }, 600);
    this.setData({ searchQuery: alias });
    this.doSearch(alias);
  },

  onTapFigure(e) {
    const id = e.detail && e.detail.id ? e.detail.id : e.currentTarget.dataset.id;
    if (id) {
      navTo(`/detail-pkg/pages/detail/detail?id=${id}`);
    }
  },

  // 拉取最近发布的 10 篇专题文章（服务端按 createdAt DESC，公开接口只返回已发布）
  // force=true 时忽略节流（下拉刷新用）
  _loadLatestArticles(force) {
    const now = Date.now();
    if (!force && this._articlesFetchedAt && now - this._articlesFetchedAt < 60000) return;
    this._articlesFetchedAt = now;
    const self = this;
    request({
      // lite=1：列表不带 content 正文（gzip 约 37KB → 约 5KB）。
      // 服务端未部署新分支时会忽略未知参数并原样返回全文，故本改动前后向兼容。
      url: API.ARTICLES.LIST + '?page=1&pageSize=10&lite=1',
      method: 'GET',
      timeout: 10000,
      success: (res) => {
        const d = res.data || {};
        const list = (d.data && d.data.list) || [];
        if (!d.success || !Array.isArray(list)) return;
        self.setData({
          latestArticles: list.map((a, i) => {
            // relatedFigures 在不同接口下可能是字符串数组或对象数组，统一成弹层需要的 {name, relation}
            let rf = a.relatedFigures;
            if (typeof rf === 'string') {
              try { rf = JSON.parse(rf); } catch (e) { rf = []; }
            }
            if (!Array.isArray(rf)) rf = [];
            rf = rf.map((x) => (typeof x === 'string' ? { name: x, relation: '' } : { name: (x && x.name) || '', relation: (x && x.relation) || '' }))
                   .filter((x) => x.name);
            const item = {
              id: a.id,
              title: a.title || '',
              // [性能] summary 原文不进 setData：WXML 只渲染 summaryClean，
              // cleanSummary 下方直接用 a.summary 入参算好，无需在此冗余携带。
              era: a.era || '',
              createdAt: a.createdAt || '',
              // 只用于浮层判断「本专题内翻篇」与阅读模型的朝代签，卡片不渲染
              topicKey: a.topicKey || '',
              dateLabel: fmtDate(a.createdAt),
              relatedFigures: rf
            };
            // 卡片装饰：编号 / 清洗后摘要 / 关联人物文本 / 标签兜底
            // 🔴 content / excerpt 只参与生成 summaryClean：WXML 不渲染、onOpenArticle
            //    也只用 id。不写进 setData，避免把整批正文（旧响应约 84KB）跨线程
            //    推给视图层 —— 这条在服务端部署 lite 之前就能立刻生效。
            item.indexLabel = padIndex(i);
            item.summaryClean = cleanSummary({
              title: item.title,
              summary: a.summary || '',
              content: a.content || '',
              excerpt: a.excerpt || ''
            });
            item.figuresText = figuresText(item, 3);
            item.categoryLabel = categoryLabel(item);
            return item;
          })
        });
      },
      fail: () => { /* 首页非关键内容，失败静默降级为不展示该区块 */ }
    });
  },

  /* ===== 文章浮层（与专题页 / 人物页同一个组件，就地浮起，不跳整页） =====
     首页列表是 lite 数据（无正文）：先出标题+摘要，再按 id 补全文；
     有专题上下文时顺带算「本专题」的上一篇 / 下一篇。 */

  onOpenArticle(e) {
    const idx = Number(e.currentTarget.dataset.index);
    const list = this.data.latestArticles || [];
    if (isNaN(idx) || !list[idx]) return;
    const a = list[idx];
    this._openArticle({
      id: a.id,
      title: a.title || '',
      summary: a.summary || '',
      era: a.era || '',
      createdAt: a.createdAt || '',
      topicKey: a.topicKey || '',
      relatedFigures: a.relatedFigures || []
    });
  },

  _openArticle(a) {
    if (!a || !a.id) return;
    const seq = (this._artSeq = (this._artSeq || 0) + 1);
    // 浮层就地打开不再经过整页，浏览历史要在这里补记（仅登录态，服务端去重）
    recordHistory('article', a.id, a.title || '', '/pages/article/article?id=' + a.id);
    this.setData({
      currentArticle: {
        id: a.id,
        title: a.title || '',
        summary: a.summary || '',
        era: a.era || '',
        createdAt: a.createdAt || '',
        topicKey: a.topicKey || '',
        relatedFigures: a.relatedFigures || [],
        // 翻篇标记先关：专题篇目到位后再打开（同篇文章回填不会重置阅读位置）
        hasPrev: false,
        hasNext: false
      }
    });
    this._loadArticleBody(a.id, seq);
    this._loadTopicNav(a, seq);
  },

  onCloseArticle() {
    // 作废在途请求，避免结果回来又把浮层顶开
    this._artSeq = (this._artSeq || 0) + 1;
    this._articleList = null;
    this.setData({ currentArticle: null });
  },

  // 浮层先出标题/摘要，正文后补；失败就停在摘要态，不弹窗打断
  _loadArticleBody(id, seq) {
    const self = this;
    request({
      url: API.ARTICLES.GET(id),
      method: 'GET',
      timeout: 12000,
      success: (res) => {
        if (seq !== self._artSeq) return;
        const cur = self.data.currentArticle;
        if (!cur || String(cur.id) !== String(id)) return;
        const d = (res && res.data) || {};
        if (!d.success || !d.data) return;
        const full = d.data;
        self.setData({
          currentArticle: Object.assign({}, cur, {
            content: full.content || '',
            summary: full.summary || cur.summary || '',
            era: full.era || cur.era || '',
            createdAt: full.createdAt || cur.createdAt || '',
            topicKey: full.topicKey || cur.topicKey || '',
            relatedFigures: full.relatedFigures || cur.relatedFigures || [],
            citations: full.citations || [],
            keywords: full.keywords || ''
          })
        });
      },
      fail: () => { /* 保留摘要态 */ }
    });
  },

  // 本专题内翻篇：与深链整页共用 utils/topic-index 的缓存（不新增接口）
  _loadTopicNav(a, seq) {
    const key = a.topicKey || '';
    if (!key) { this._articleList = null; return; }
    const self = this;
    const apply = (lists) => {
      if (seq !== self._artSeq) return;
      const list = (lists && lists[key]) || [];
      const idx = topicIndex.indexOfArticle(list, a.id);
      if (idx < 0) { self._articleList = null; return; }
      self._articleList = list;
      const cur = self.data.currentArticle;
      if (!cur || String(cur.id) !== String(a.id)) return;
      self.setData({
        'currentArticle.hasPrev': idx + 1 < list.length,
        'currentArticle.hasNext': idx - 1 >= 0
      });
    };

    // 同步缓存优先（整页文章可能已经下过同一份索引）
    const cached = topicIndex.readCache();
    if (cached && cached.lists) { apply(cached.lists); return; }

    request({
      url: API.TOPICS.LIST_LITE,
      method: 'GET',
      timeout: 10000,
      success: (res) => {
        const list = (res.data && res.data.data) || [];
        if (!Array.isArray(list)) return;
        const parsed = topicIndex.parseTopics(list);
        topicIndex.writeCache(parsed.map, parsed.lists);
        apply(parsed.lists);
      },
      fail: () => { /* 没有专题上下文：翻篇按钮保持关闭态 */ }
    });
  },

  // 浮层底部「上一篇 / 下一篇」：在本专题篇目内翻，不再回整页
  onOverlayNav(e) {
    const dir = (e.detail && e.detail.dir) || '';
    const cur = this.data.currentArticle;
    const list = this._articleList || [];
    if (!cur || !dir || !list.length) return;
    const idx = topicIndex.indexOfArticle(list, cur.id);
    if (idx < 0) return;
    const ni = dir === 'prev' ? idx + 1 : idx - 1;
    if (ni < 0 || ni >= list.length) return;
    const a = list[ni];
    this._openArticle({
      id: a.id,
      title: a.title || '',
      summary: '',
      era: '',
      createdAt: a.createdAt || '',
      topicKey: cur.topicKey
    });
  },

  onPullDownRefresh() {
    // 页面级下拉刷新（scroll-view 场景不触发，保留兜底）
    var stopped = false;
    var stop = function() { if (!stopped) { stopped = true; wx.stopPullDownRefresh(); } };
    this._doRefresh(stop);
  },

  // scroll-view 的下拉刷新（页面主体是 scroll-view，页面级 onPullDownRefresh
  // 在该场景下不触发——「下拉刷新没了」即此因；走 scroll-view 自带 refresher）
  onRefresherRefresh() {
    var that = this;
    this.setData({ refreshing: true });
    var stopped = false;
    var stop = function() {
      if (stopped) return;
      stopped = true;
      that.setData({ refreshing: false });
    };
    this._doRefresh(stop);
  },

  // 刷新逻辑（两条下拉通道共用）：只更新当前页面内容，绝不清空当前态
  //  - 处于搜索态（有搜索词）→ 重新执行当前搜索，保持并刷新搜索结果
  //  - 非搜索态 → 重新取一批随机人物 + 强制刷新专题文章
  _doRefresh(stop) {
    var q = (this.data.searchQuery || '').trim();
    if (q) {
      this.doSearch(stop);
      setTimeout(stop, 8000);
      return;
    }
    this._loadLatestArticles(true);
    this._loadHomeFeed(stop, true);
    setTimeout(stop, 8000);
  },

  onRetry() {
    if (resetFetchFailed) resetFetchFailed();
    this.setData({ showRetry: false, loading: true, showSkeleton: false });
    // 重试同样走 B 方案时间线：先短转圈，超时再切骨架兜底
    this._armSkeletonFallback();
    this._loadHomeFeed(null, true);
  },

  onShareAppMessage() {
    return {
      title: '世慧屋 - 历史人物关系图谱',
      path: '/pages/index/index',
      // P2-2：统一品牌配图，避免分享卡片回落到首屏截图（截图可能是加载态、观感不稳）
      imageUrl: API.BASE + '/og-banner.jpg'
    };
  },

  onShareTimeline() {
    return { title: '世慧屋 - 历史人物关系图谱', imageUrl: API.BASE + '/og-banner.jpg' };
  }
});
