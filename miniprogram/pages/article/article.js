const API = require('../../config/api');
const { navTo } = require('../../utils/nav');
const { buildReaderModel, buildBlocks } = require('../../utils/article-reader');
const { ensurePrivacyAuthorized } = require('../../utils/privacy');
const { fmtDate } = require('../../utils/time-utils');
const { recordHistory } = require('../../utils/user-utils');
const request = require('../../utils/request');
// 专题索引（名称 + 有序篇目）与首页/个人中心浮层共用同一份缓存
const topicIndex = require('../../utils/topic-index');

const HOME_URL = '/pages/index/index';

// 生卒年展示：公元前是文本（「约公元前551年」），不能当数字算
function spanText(f) {
  const b = String((f && f.birthYear) || '').trim();
  const d = String((f && f.deathYear) || '').trim();
  if (!b && !d) return '';
  return (b || '?') + '—' + (d || '?');
}

Page({
  data: {
    // 文献引用列表（正文页底部「参考资料来源」）。先声明初始值，避免首帧 {{citations.length}} 取到 undefined
    citations: [],
    safeAreaTop: 44,
    navHeight: 96,
    loading: true,
    loadFailed: false,
    // 失败原因：'' | 'param'（链接没带 id）| 'missing'（文章已下架/被删）| 'network'（网络或服务端故障）
    // 三者的处置完全不同：param/missing 重试一万次也没用，只有 network 值得给「重新加载」
    failKind: '',
    article: {},
    topicLabel: '专题文章',
    wordCount: '',
    readMin: 0,
    hasBody: false,
    fullText: '',
    // 正文为空、当前展示的是摘要（12 篇属于此类，不能装作是完整文章）
    isExcerpt: false,
    blocks: [],
    figures: [],
    keywords: [],
    progressPercent: 0,
    navSolid: false,
    showToTop: false,
    scrollTop: 0,
    /* 同名人物选择（正文/文末点人名且库里有多个同名时） */
    pickVisible: false,
    pickName: '',
    pickList: [],
    /* 互动 */
    likes: 0,
    liked: false,
    faved: false,
    actionBusy: false,
    /* 上一篇 / 下一篇 / 相关阅读 */
    prev: null,
    next: null,
    related: []
  },

  onLoad(options) {
    const sysInfo = wx.getWindowInfo();
    const safeAreaTop = sysInfo.statusBarHeight || 44;
    this._winH = sysInfo.windowHeight || 600;
    this.setData({ safeAreaTop: safeAreaTop, navHeight: safeAreaTop + 46 });

    this._loadSeq = 0;
    this._figResolved = {};
    this._id = (options && options.id) || '';
    if (!this._id) {
      this.setData({ loading: false, loadFailed: true, failKind: 'param' });
      return;
    }
    this._loadTopicIndex();
    this._loadArticle();
    this._loadNeighbors();
    this._loadInteraction();
  },

  onUnload() {
    // 卸载后在途请求一律作废（正文人名解析回来时页面已不在，setData 会告警）
    this._unloaded = true;
    this._loadSeq = (this._loadSeq || 0) + 1;
  },

  /* 互动身份：登录用 openid，未登录用本机 device key（服务端按 userKey 去重计数） */
  _userKey() {
    let key = '';
    try { key = wx.getStorageSync('wxLocalOpenid') || ''; } catch (e) { /* ignore */ }
    if (key) return String(key);
    try {
      key = wx.getStorageSync('article_device_key') || '';
      if (!key) {
        key = 'dev_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
        wx.setStorageSync('article_device_key', key);
      }
    } catch (e) {
      key = 'dev_unknown';
    }
    return String(key);
  },

  _loadInteraction() {
    const self = this;
    request({
      url: API.ARTICLES.INTERACTION(this._id) + '?userKey=' + encodeURIComponent(this._userKey()),
      method: 'GET',
      timeout: 8000,
      success: (res) => {
        const d = res.data || {};
        if (!d.success || !d.data) return;
        self.setData({ likes: d.data.likes || 0, liked: !!d.data.liked, faved: !!d.data.faved });
      },
      fail: () => { /* 互动非关键内容，失败静默 */ }
    });
  },

  // 点赞 / 收藏：field = 'liked' | 'faved'
  _postInteraction(field, value) {
    if (this.data.actionBusy) return;
    const self = this;
    const body = { userKey: this._userKey() };
    body[field] = value;
    this.setData({ actionBusy: true });

    // 乐观更新，失败回滚
    const prevState = { liked: this.data.liked, faved: this.data.faved, likes: this.data.likes };
    const patch = {};
    patch[field] = value;
    if (field === 'liked') patch.likes = Math.max(0, this.data.likes + (value ? 1 : -1));
    this.setData(patch);

    request({
      url: API.ARTICLES.INTERACTION(this._id),
      method: 'POST',
      timeout: 8000,
      header: { 'Content-Type': 'application/json' },
      data: body,
      success: (res) => {
        const d = res.data || {};
        self.setData({ actionBusy: false });
        if (d.success && d.data) {
          self.setData({ likes: d.data.likes || 0, liked: !!d.data.liked, faved: !!d.data.faved });
          const tip = field === 'liked' ? (value ? '已点赞' : '已取消点赞') : (value ? '已收藏' : '已取消收藏');
          wx.showToast({ title: tip, icon: 'none' });
        } else {
          self.setData(prevState);
          wx.showToast({ title: (d && d.message) || '操作失败', icon: 'none' });
        }
      },
      fail: () => {
        self.setData(Object.assign({ actionBusy: false }, prevState));
        wx.showToast({ title: '网络错误，请重试', icon: 'none' });
      }
    });
  },

  onToggleLike() {
    this._postInteraction('liked', !this.data.liked);
  },

  onToggleFav() {
    this._postInteraction('faved', !this.data.faved);
  },

  /* 相关阅读（轻量接口，不含正文）：
     接口同时返回全站序的 prev/next，这里不用 —— 翻篇范围改由本专题篇目决定（见 _applyTopicNav） */
  _loadNeighbors() {
    const self = this;
    request({
      url: API.ARTICLES.NEIGHBORS(this._id),
      method: 'GET',
      timeout: 8000,
      success: (res) => {
        const d = res.data || {};
        if (!d.success || !d.data) return;
        const related = (d.data.related || []).map((a, i) => ({
          id: a.id,
          title: a.title || '',
          topicKey: a.topicKey || '',
          dateLabel: fmtDate(a.createdAt),
          no: ('0' + (i + 1)).slice(-2)
        }));
        self.setData({ related: related });
        self._applyTopicLabelToLists();
      },
      fail: () => { /* 失败则不显示这块 */ }
    });
  },

  // 给「相关阅读」补上中文专题名
  _applyTopicLabelToLists() {
    const map = this._topicNames;
    if (!map || !this.data.related || !this.data.related.length) return;
    const name = (k) => map[k] || '';
    const patch = {};
    this.data.related.forEach((r, i) => { patch['related[' + i + '].topicLabel'] = name(r.topicKey); });
    if (Object.keys(patch).length) this.setData(patch);
  },

  onTapArticleLink(e) {
    const id = e.currentTarget.dataset.id;
    // dataset 里 wxml 传的是 number，this._id 来自 options 是 string，必须同型比较，
    // 否则点「当前这篇」自己也会入栈一次，返回时看到两篇一模一样的文章
    if (!id || String(id) === String(this._id)) return;
    // 原实现是 redirectTo「替换当前页」：从分享进来时页面栈只有 1 层，
    // 连点两篇后返回键直接退出小程序；栈里也永远是最后一篇。
    // 浏览流统一走 navTo（栈满 10 层有明确提示，见 utils/nav.js）。
    navTo('/pages/article/article?id=' + id);
  },

  /* 专题索引：key → 专题名（栏目条显示「历代战役」这类中文名）+ key → 有序篇目。
     用已有的 TOPICS.LIST_LITE（?lite=1）一次拿全，不新增后端接口；
     服务端排序与 TOPICS.GET(key) 完全一致（createdAt DESC, sortOrder ASC），
     所以这里的篇目顺序 == 专题页浮层看到的顺序。 */
  _loadTopicIndex(opts) {
    if (this._topicReqInFlight) return;
    const force = !!(opts && opts.force);
    const now = Date.now();

    if (!force) {
      const cached = topicIndex.readCache();
      if (cached) {
        this._topicNames = cached.map;
        this._applyTopicLabel();
        // 旧缓存的 map 有、lists 没有：先按名称渲染，再走一次网络补篇目
        if (cached.lists) {
          this._topicLists = cached.lists;
          this._applyTopicNav();
          return;
        }
      }
    }

    this._topicReqInFlight = true;
    request({
      // lite 版约 85 KB（vs 全量约 500 KB），只要 id/title/createdAt，正文不进内存
      // force 时带时间戳绕过可能的 HTTP 缓存（新发布文章要能立刻进篇目）
      url: API.TOPICS.LIST_LITE + (force ? '&_t=' + now : ''),
      method: 'GET',
      timeout: 10000,
      success: (res) => {
        this._topicReqInFlight = false;
        const list = (res.data && res.data.data) || [];
        if (!Array.isArray(list)) {
          this._topicNavFailed = true;
          this._applyTopicNav();
          return;
        }
        // 字段/排序口径统一在 utils/topic-index，避免三处入口各解析一遍
        const parsed = topicIndex.parseTopics(list);
        this._topicNames = parsed.map;
        this._topicLists = parsed.lists;
        this._topicNavFailed = false;
        topicIndex.writeCache(parsed.map, parsed.lists);
        this._applyTopicLabel();
      },
      fail: () => {
        this._topicReqInFlight = false;
        this._topicNavFailed = true;
        // 名称退回默认标签；翻篇按钮进入「暂不可用」态，点击可重试
        this._applyTopicNav();
      }
    });
  },

  _applyTopicLabel() {
    const key = this.data.article && this.data.article.topicKey;
    if (key && this._topicNames && this._topicNames[key]) {
      if (this.data.topicLabel !== this._topicNames[key]) {
        this.setData({ topicLabel: this._topicNames[key] });
      }
    }
    // 专题名到达 / 文章到达，两种时机都要重算翻篇目标
    this._applyTopicNav();
    this._applyTopicLabelToLists();
  },

  /**
   * 按本专题篇目算上一篇 / 下一篇（与专题页浮层同一口径）：
   *   列表按发布时间倒序 → 上一篇 = 更早的一篇（idx+1）＝浮层的 prev；
   *                       下一篇 = 更新的一篇（idx-1）＝浮层的 next。
   * 拿不到数据时不猜、不跨专题：prev/next 置空，按钮置灰，点击给明确反馈。
   * 原因码存在 this._navReason，供 _footNav 决定提示文案。
   */
  _applyTopicNav() {
    const art = this.data.article || {};
    const key = art.topicKey || '';
    const id = String(art.id || this._id || '');

    if (!key) { this._navReason = 'none'; this._setNav(null, null); return; }

    if (!this._topicLists) {
      this._navReason = this._topicNavFailed ? 'failed' : 'loading';
      this._setNav(null, null);
      return;
    }

    const hasTopic = Object.prototype.hasOwnProperty.call(this._topicLists, key);
    const list = hasTopic ? this._topicLists[key] : [];
    let idx = -1;
    for (let i = 0; i < list.length; i++) {
      if (String(list[i].id) === id) { idx = i; break; }
    }

    if (idx < 0) {
      // 索引可能比「刚发布的文章」旧：强制刷新一次再定位（每个页面实例只做一次，避免死循环）
      if (!this._navForced) {
        this._navForced = true;
        this._navReason = 'loading';
        this._setNav(null, null);
        this._loadTopicIndex({ force: true });
        return;
      }
      // 专题里找不到这篇（已下架 / 专题被删 / topicKey 与篇目不一致）：不拿别的专题凑数
      this._navReason = 'notlisted';
      this._setNav(null, null);
      return;
    }

    this._navReason = list.length <= 1 ? 'single' : '';
    const prev = idx + 1 < list.length ? this._decorateNav(list[idx + 1], key) : null;
    const next = idx - 1 >= 0 ? this._decorateNav(list[idx - 1], key) : null;
    this._setNav(prev, next);
  },

  _decorateNav(a, key) {
    return {
      id: a.id,
      title: a.title || '',
      topicKey: key,
      topicLabel: (this._topicNames && this._topicNames[key]) || '',
      dateLabel: fmtDate(a.createdAt)
    };
  },

  // 只在目标真的变了才 setData，避免滚动/加载过程中反复触发渲染
  _setNav(prev, next) {
    const eq = (a, b) => (a && b ? String(a.id) === String(b.id) : a === b);
    if (eq(this.data.prev, prev) && eq(this.data.next, next)) return;
    this.setData({ prev: prev, next: next });
  },

  /* 底部翻篇条：有点击目标就翻篇；没有就说明为什么没有 */
  onTapFootPrev() { this._footNav('prev'); },
  onTapFootNext() { this._footNav('next'); },

  _footNav(dir) {
    const target = dir === 'prev' ? this.data.prev : this.data.next;
    if (target && target.id) {
      this.onTapArticleLink({ currentTarget: { dataset: { id: target.id } } });
      return;
    }
    const reason = this._navReason || '';
    if (reason === 'loading') {
      wx.showToast({ title: '正在获取本专题篇目', icon: 'none' });
      return;
    }
    if (reason === 'failed') {
      // 失败后点一下 = 重试一次；成功后按钮自动变亮，再点即可翻
      this._topicNavFailed = false;
      this._navReason = 'loading';
      this._loadTopicIndex({ force: true });
      wx.showToast({ title: '正在重新获取本专题篇目', icon: 'none' });
      return;
    }
    if (reason === 'single') {
      wx.showToast({ title: '本专题只有这一篇', icon: 'none' });
      return;
    }
    if (reason === 'none') {
      wx.showToast({ title: '本文暂未归入专题', icon: 'none' });
      return;
    }
    if (reason === 'notlisted') {
      wx.showToast({ title: '本专题暂无相邻篇目', icon: 'none' });
      return;
    }
    wx.showToast({
      title: dir === 'prev' ? '已经是本专题第一篇' : '已经是本专题最后一篇',
      icon: 'none'
    });
  },

  _loadArticle() {
    this.setData({ loading: true, loadFailed: false, failKind: '' });
    const self = this;
    const seq = ++this._loadSeq;
    request({
      url: API.ARTICLES.GET(this._id),
      method: 'GET',
      timeout: 12000,
      success: (res) => {
        if (seq !== self._loadSeq) return;
        const d = (res && res.data) || {};
        const code = (res && res.statusCode) || 0;
        if (code === 404) { self._fail('missing'); return; }
        if (!d.success || !d.data) {
          // 200 但没有正文数据 = 数据层异常，仍按「文章不存在」处理；
          // 5xx 是可重试的服务端故障，不能对用户说「文章不存在」
          self._fail(code === 200 ? 'missing' : 'network');
          return;
        }
        self._setArticle(d.data);
      },
      fail: () => {
        if (seq !== self._loadSeq) return;
        self._fail('network');
      }
    });
  },

  _fail(kind) {
    this.setData({ loading: false, loadFailed: true, failKind: kind });
  },

  _setArticle(a) {
    // 记录浏览历史（仅登录态；服务端按「同用户+同类型+同目标」去重，重复打开只置顶）。
    // 一次性标记：避免同一次访问因数据回填等原因重复上报。
    if (!this._historyRecorded && a && a.id) {
      this._historyRecorded = true;
      recordHistory('article', a.id, a.title || '', '/pages/article/article?id=' + a.id);
    }

    const title = a.title || '';
    const rawContent = String(a.content || '').trim();
    const summary = String(a.summary || '').trim();
    // 阅读模型与专题页浮层共用（utils/article-reader），字号/行高/段距/色值不会再分叉
    const model = buildReaderModel(a);

    this.setData({
      loading: false,
      article: {
        id: a.id,
        title: title,
        summary: summary,
        author: a.author || '世慧屋',
        topicKey: a.topicKey || '',
        // era 原来没被挑出来，导致 Web 端头部有「唐」徽章、小程序端什么都没有（102/110 篇有值）
        era: String(a.era || '').trim(),
        dateLabel: fmtDate(a.createdAt)
      },
      wordCount: model.wordCount,
      readMin: model.readMin,
      hasBody: model.hasBody,
      fullText: model.fullText,
      isExcerpt: model.isExcerpt,
      blocks: model.blocks,
      figures: model.figures,
      citations: model.citations,
      keywords: model.keywords
    });
    this._applyTopicLabel();
    wx.setNavigationBarTitle({ title: title });
    // 人名可点是整页的增强：拿到命中结果后重解析一次正文（浮层不做这一步）
    this._resolveFigures(model.figures, rawContent, title);
  },

  /**
   * 关联人物只给了姓名（91 条全部没有 id），这里按名查一次拿 id。
   *
   * 解析结果四态：
   *   { id }                  —— 唯一命中，正文人名与文末卡片都可直跳
   *   { candidates: [...] }   —— 同名多人，点击时弹出选择面板
   *   { missing: true }       —— 库里没有，不标可点（点了只会提示"没收录"）
   *   undefined               —— 网络失败，保持不可点
   */
  _resolveFigures(figures, body, title) {
    const self = this;
    if (!figures || !figures.length) return;
    const names = [];
    figures.forEach((f) => { if (names.indexOf(f.name) === -1) names.push(f.name); });

    let left = names.length;
    const finish = () => {
      if (--left > 0) return;
      if (self._unloaded) return;
      const linkNames = [];
      const out = figures.map((f) => {
        const r = self._figResolved[f.name];
        // undefined = 这次网络没查成，不是「库里没有」，卡片保持正常样式
        if (!r) return Object.assign({}, f, { pending: true });
        if (r.missing) return Object.assign({}, f, { missing: true });
        if (r.id) {
          linkNames.push(f.name);
          return Object.assign({}, f, { id: r.id, meta: r.meta || '', alias: !!r.alias });
        }
        if (r.candidates && r.candidates.length) {
          linkNames.push(f.name);
          return Object.assign({}, f, { meta: r.candidates.length + ' 位同名，点击选择' });
        }
        return Object.assign({}, f, { missing: true });
      });
      const patch = { figures: out };
      // 只有解析到的名字才标可点；重解析一次带人名，首字下沉会顺带标 b.dropFig
      // 摘要态没有正文（body 为空），只回填人物 meta，不重排段落
      if (linkNames.length && body) patch.blocks = buildBlocks(body, title, linkNames);
      self.setData(patch);
    };

    names.forEach((name) => {
      request({
        url: API.FIGURES.SEARCH + '?search=' + encodeURIComponent(name) + '&pageSize=10',
        method: 'GET',
        timeout: 8000,
        // 一名一次，失败就算了（正文人名只是可选增强）；默认重试 2 次会在弱网下
        // 把 5 个人名放大成 15 个请求，和正文抢带宽
        retry: 0,
        success: (res) => {
          const d = (res && res.data) || {};
          const list = (d.data && (d.data.list || d.data)) || [];
          const arr = Array.isArray(list) ? list : [];
          self._figResolved[name] = self._judgeName(name, arr);
          finish();
        },
        fail: () => {
          // 网络失败：不写 missing，仅保持不可点（下次点击会现查一次）
          finish();
        }
      });
    });
  },

  /**
   * 判定一个名字对应哪位人物。
   *
   * 旧实现是「精确同名找不到就退回搜索结果第一条」 —— 这个兜底是灾难：
   * 实测「严武」有 4 档，搜索首位是 CBDB 桩（#892804），文章里指的是华阴人严武（#83186），
   * 读者点进去看到的是另一个人。现在：
   *   ① 精确同名 1 个  → 直接跳
   *   ② 精确同名多个  → 让用户选（不猜）
   *   ③ 无精确同名    → 用服务端别名命中（雍正→康熙、孔丘→孔子都靠这层）
   *   ④ 一个都没有    → 明说没收录
   */
  _judgeName(name, arr) {
    const exact = arr.filter((x) => String((x && x.name) || '') === name);
    const pool = exact.length ? exact : arr;
    if (!pool.length) return { missing: true };

    const norm = (x) => ({
      id: x.id,
      name: x.name || name,
      meta: [x.dynasty, x.region, spanText(x)].filter(Boolean).join(' · ')
    });
    if (pool.length === 1) {
      const one = norm(pool[0]);
      if (!one.id) return { missing: true };
      return { id: one.id, meta: one.meta, alias: !exact.length };
    }
    return { candidates: pool.slice(0, 10).map(norm) };
  },

  /* 文中人物 → 人物详情 */
  onTapFigure(e) {
    const name = (e.currentTarget.dataset.name || '').trim();
    if (!name) return;
    const cached = this._figResolved && this._figResolved[name];
    if (cached) { this._openFigure(name, cached); return; }

    // 未预解析（加载时网络失败 / 人名来自正文里未被解析的文本）→ 现查一次
    wx.showLoading({ title: '正在打开…', mask: true });
    const self = this;
    request({
      url: API.FIGURES.SEARCH + '?search=' + encodeURIComponent(name) + '&pageSize=10',
      method: 'GET',
      timeout: 8000,
      success: (res) => {
        wx.hideLoading();
        const d = (res && res.data) || {};
        if ((res && res.statusCode) && res.statusCode >= 500) {
          wx.showToast({ title: '服务暂时不可用，请稍后再试', icon: 'none' });
          return;
        }
        const list = (d.data && (d.data.list || d.data)) || [];
        const r = self._judgeName(name, Array.isArray(list) ? list : []);
        self._figResolved[name] = r;
        self._openFigure(name, r);
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({ title: '网络错误，请重试', icon: 'none' });
      }
    });
  },

  // 真正执行跳转（或弹出同名选择）
  _openFigure(name, r) {
    if (!r || r.missing) {
      wx.showToast({ title: '世慧屋暂未收录「' + name + '」', icon: 'none' });
      return;
    }
    if (r.id) {
      navTo('/detail-pkg/pages/detail/detail?id=' + r.id);
      return;
    }
    const cands = (r.candidates || []).filter((c) => c && c.id);
    if (!cands.length) {
      wx.showToast({ title: '世慧屋暂未收录「' + name + '」', icon: 'none' });
      return;
    }
    if (cands.length === 1) {
      navTo('/detail-pkg/pages/detail/detail?id=' + cands[0].id);
      return;
    }
    this.setData({
      pickVisible: true,
      pickName: name,
      pickList: cands.map((c) => ({
        id: c.id,
        name: c.name || name,
        initial: String(c.name || name).charAt(0),
        meta: c.meta || '世慧屋收录人物'
      }))
    });
  },

  onPickFigure(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ pickVisible: false });
    if (!id) return;
    navTo('/detail-pkg/pages/detail/detail?id=' + id);
  },

  onClosePick() {
    this.setData({ pickVisible: false });
  },

  // 弹层遮罩上的 catchtap / catchtouchmove 占位：阻止穿透到正文滚动
  noop() {},

  onRetry() {
    this._loadArticle();
  },

  onGoHome() {
    wx.switchTab({ url: HOME_URL, fail: () => wx.reLaunch({ url: HOME_URL }) });
  },

  /* 滚动：进度条 / 导航栏实心 / 回到顶部按钮 */
  onScroll(e) {
    const s = e.detail || {};
    const max = (s.scrollHeight || 0) - (s.windowHeight || this._winH || 0);
    const top = s.scrollTop || 0;
    const percent = max > 0 ? Math.min(100, Math.max(0, (top / max) * 100)) : 0;
    const navSolid = top > 80;
    const showToTop = top > 600;
    const patch = {};
    if (percent !== this.data.progressPercent) patch.progressPercent = Math.round(percent);
    if (navSolid !== this.data.navSolid) patch.navSolid = navSolid;
    if (showToTop !== this.data.showToTop) patch.showToTop = showToTop;
    if (Object.keys(patch).length) this.setData(patch);
  },

  onBackToTop() {
    // scroll-top 需要「先清零再赋 0」才能触发（同值不会滚动）
    this.setData({ scrollTop: this.data.scrollTop === 0 ? 1 : 0 });
    this.setData({ scrollTop: 0 });
  },

  onBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => {
        // 从分享卡片/朋友圈/扫码进来时页面栈只有 1 层，navigateBack 必然失败。
        // 旧实现没有 fail 分支 ⇒ 左上角「←」看着能点、点了毫无反应，只能杀掉小程序。
        wx.switchTab({ url: HOME_URL, fail: () => wx.reLaunch({ url: HOME_URL }) });
      }
    });
  },

  onShareTip() {
    wx.showToast({ title: '点右上角「···」分享给朋友', icon: 'none' });
  },

  // 小程序无法直接打开外部网页：有链接则复制，便于用户到浏览器查看
  onTapCitation(e) {
    const url = (e.currentTarget.dataset.url || '').trim();
    if (!url) return;
    // 隐私接口适配：setClipboardData 属【剪切板】隐私接口，未声明/未同意时会直接失效
    // （报 api scope is not declared）。复制功能对用户是"点了没反应"，必须补授权。
    ensurePrivacyAuthorized()
      .then(() => {
        wx.setClipboardData({
          data: url,
          success: () => wx.showToast({ title: '链接已复制', icon: 'none' })
        });
      })
      .catch(() => { /* 用户拒绝授权，静默返回 */ });
  },

  onShareAppMessage() {
    const a = this.data.article || {};
    return {
      title: a.title || '世慧屋 · 专题文章',
      path: '/pages/article/article?id=' + (a.id || '')
    };
  },

  /**
   * 分享到朋友圈（2026-10-21 新增）
   *
   * 全项目 10 个页面都有，唯独文章页缺 —— 长文恰恰是最该被分享的。
   * [注意] query 不带「?」，与 onShareAppMessage 的 path 口径相反；
   *    缺了它，朋友圈卡片点开必落「参数错误」页。
   */
  onShareTimeline() {
    const a = this.data.article || {};
    return {
      title: a.title || '世慧屋 · 专题文章',
      query: a.id ? 'id=' + a.id : ''
    };
  }
});
