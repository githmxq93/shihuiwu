const request = require('../../../utils/request');
const API = require('../../../config/api');
const { getAdminToken, verifyAdminToken, kickToLogin } = require('../../utils/admin-guard');
const { once } = require('../../utils/tap-lock');

// 每页条数。列表**不携带 content 正文**（见 _stripHeavyFields），故 20 条一页的
// setData 体积只有几 KB；正文只在编辑时按 id 单独拉。
const PAGE_SIZE = 20;

Page({
  data: {
    articles: [],
    // 真实状态栏高度（px），注入导航栏 padding-top（写死 88rpx 会被高状态栏机型压住）
    safeAreaTop: 44,
    loading: false,
    refreshing: false,
    page: 1,
    hasMore: true,
    total: 0,          // 服务端总数（含草稿），不能用 articles.length 代替
    searchKeyword: '',
    currentTopic: '',
    topicList: ['全部专题'],
    topicKeys: [''],
    topics: [],
    showForm: false,
    showContentFullscreen: false,
    formMode: 'add',
    formTopicName: '',
    formData: {
      id: '',
      title: '',
      topicKey: '',
      author: '',
      era: '',
      summary: '',
      content: '',
      // [注意] 相关人物存**姓名数组**（与 Web 端、与服务端已有数据一致）：
      //    详情页「相关阅读」按姓名匹配，传数字 id 会匹配不上（老版本这里是"逗号分隔的 id 串"）
      relatedFigures: [],
      sortOrder: '0',
      keywords: '',
      status: 'published',
      scheduledAt: '',
      citations: []
    },
    // 发布状态（与 Web 端三态一致：立即发布 / 草稿 / 定时）
    statusLabels: ['立即发布', '保存草稿', '定时发布'],
    statusValues: ['published', 'draft', 'scheduled'],
    statusIndex: 0,
    // 定时发布的日期/时间（单独存，供 WXML 直接显示；二者拼成 formData.scheduledAt）
    scheduleDate: '',
    scheduleTime: '09:00',
    // 相关人物选择：搜索候选 + 已选标签
    figKeyword: '',
    figCandidates: [],
    figSearching: false,
    _adminToken: ''
  },

  checkAuth() {
    var token = getAdminToken();
    if (!token) {
      kickToLogin();
      return false;
    }
    this.data._adminToken = token;
    // 服务端复核（异步，权威判定）：本地令牌"格式合法"≠"有效"，
    // 被篡改或已过期时这里会把用户踢回登录页，避免"进了后台却全是空列表"的误导。
    verifyAdminToken(token).catch(function () {});
    return true;
  },

  // 供 WXML 的 catchtap 使用：拦截弹窗内容区的点击，避免冒泡到遮罩而关闭弹窗。
  // articles.wxml:65 绑定了 catchtap="noop"，但本文件此前未定义该方法，触发时会报
  // 「does not have a method "noop"」。catch 前缀的阻止冒泡在编译期生效，故功能未受影响，
  // 但控制台会报错。同级的 figures.js:276 与 topics.js:81 均有该空方法，此处为遗漏。
  noop() {},

  onLoad() {
    if (!this.checkAuth()) return;
    this._isPageActive = true;
    // 真实状态栏高度 → 导航栏 padding-top（写死 88rpx 会被刘海/灵动岛机型压住）
    var sys = wx.getWindowInfo();
    this.setData({ safeAreaTop: sys.statusBarHeight || 44 });
    this.loadTopics();
  },

  onUnload() {
    this._isPageActive = false;
    // 搜索/选人防抖：卸载后仍触发会白发一次请求
    if (this._searchTimer) clearTimeout(this._searchTimer);
    this._searchTimer = null;
    if (this._figTimer) clearTimeout(this._figTimer);
    this._figTimer = null;
  },

  loadTopics() {
    var that = this;
    request({
      handle401: false,
      url: API.TOPICS.LIST,
      timeout: 10000,
      header: { 'x-admin-key': that.data._adminToken || '' },
      success: function(res) {
        if (!that._isPageActive) return;
        if (res.data && res.data.success && res.data.data) {
          var topics = res.data.data;
          var names = ['全部专题'];
          var keys = [''];
          for (var i = 0; i < topics.length; i++) {
            names.push(topics[i].icon + ' ' + topics[i].title);
            keys.push(topics[i].key);
          }
          that.setData({ topics: topics, topicList: names, topicKeys: keys });
        }
      },
      fail: function() {
        if (!that._isPageActive) return;
        wx.showToast({ title: '加载专题失败', icon: 'none' });
      },
      complete: function() {
        if (!that._isPageActive) return;
        that.loadArticles(true);
      }
    });
  },

  _assignSeq(list) {
    var seqMap = {};
    for (var i = 0; i < list.length; i++) {
      var key = list[i].topicKey || '_';
      if (!seqMap[key]) seqMap[key] = 0;
      seqMap[key]++;
      list[i]._seq = seqMap[key];
    }
    return list;
  },

  /**
   * 拉取文章列表（服务端分页）。
   * [注意] 后台必须带 `all=1`：只有带它服务端才走 `requireAdmin`，从而返回**全部状态**（含草稿/定时）；
   *    否则只返回 `status='published'`，后台会"少文章"。
   * [注意] 服务端返回的是**分页对象** `{ list, total, page, pageSize, totalPages }`；
   *    旧代码把 `res.data.data` 直接当数组用 → `_assignSeq` 拿到的是对象 → 列表渲染不出来（2026-09-29 修）。
   * [注意] 过滤（专题 / 关键词）交给服务端：前端过滤只能过滤"已加载的那几页"，翻页后会串数据。
   * @param {boolean} reset true=从第 1 页重拉（切专题/搜索/下拉刷新）；false=追加下一页
   */
  loadArticles(reset) {
    var that = this;
    // 追加下一页要等上一页回来（避免同一页重复请求）；
    // 但 reset（切专题 / 搜索 / 下拉刷新）**必须允许打断**上一次请求 ——
    // 否则用户快速输入的搜索词会因为"上一请求还在飞"被静默丢弃，列表与输入框不符。
    if (!reset && (that.data.loading || !that.data.hasMore)) return;

    var reqId = (that._reqId || 0) + 1;
    that._reqId = reqId;

    var page = reset ? 1 : that.data.page + 1;
    that.setData({ loading: true });

    request({
      handle401: false,
      url: API.ARTICLES.LIST,
      timeout: 10000,
      header: { 'x-admin-key': that.data._adminToken || '' },
      data: {
        all: 1,
        page: page,
        pageSize: PAGE_SIZE,
        topicKey: that.data.currentTopic || '',
        search: that.data.searchKeyword || ''
      },
      success: function(res) {
        if (!that._isPageActive || reqId !== that._reqId) return;   // 过期响应直接丢弃
        var body = res.data || {};
        var pd = body.data || {};
        var raw = Array.isArray(pd.list) ? pd.list : [];
        if (res.statusCode === 200 && body.success !== false) {
          var merged = page === 1 ? raw : that.data.articles.concat(raw);
          merged = that._assignSeq(merged.map(that._stripHeavyFields));
          var totalPages = pd.totalPages || 1;
          that.setData({
            articles: merged,
            page: page,
            total: pd.total || merged.length,
            hasMore: page < totalPages,
            loading: false,
            refreshing: false
          });
        } else {
          that.setData({ loading: false, refreshing: false, hasMore: false });
          wx.showToast({ title: body.message || '加载文章失败，请重新登录后台', icon: 'none' });
        }
      },
      fail: function() {
        if (!that._isPageActive || reqId !== that._reqId) return;
        that.setData({ loading: false, refreshing: false });
        wx.showToast({ title: '加载文章失败', icon: 'none' });
      }
    });
  },

  /**
   * 列表只需要轻字段：正文 `content`（单篇几千字）与 `citations` 若一起塞进 setData，
   * 20 条就可能上百 KB，翻几页后触发 setData 体积上限 → 白屏。
   * 正文改为打开编辑弹窗时按 id 单独拉（见 onEditArticle）。
   */
  _stripHeavyFields(a) {
    return {
      id: a.id,
      topicKey: a.topicKey,
      title: a.title,
      summary: a.summary,
      author: a.author,
      era: a.era,
      isPinned: a.isPinned,
      sortOrder: a.sortOrder,
      status: a.status,
      createdAt: a.createdAt
    };
  },

  /** scroll-view 触底：追加下一页 */
  onLoadMore() {
    this.loadArticles(false);
  },

  onSearchInput(e) {
    var that = this;
    this.setData({ searchKeyword: e.detail.value });
    // 输入防抖：每敲一个字就请求既费流量，也会让列表反复闪
    if (this._searchTimer) clearTimeout(this._searchTimer);
    this._searchTimer = setTimeout(function() { that.loadArticles(true); }, 400);
  },

  onTopicFilterChange(e) {
    var idx = e.detail.value;
    var keys = this.data.topicKeys;
    this.setData({ currentTopic: keys[idx] || '' });
    this.loadArticles(true);
  },

  onBack() {
    wx.navigateBack();
  },

  _getTopicName(key) {
    var topics = this.data.topics;
    for (var i = 0; i < topics.length; i++) {
      if (topics[i].key === key) return topics[i].icon + ' ' + topics[i].title;
    }
    return '';
  },

  onAddArticle() {
    this.setData({
      showForm: true,
      formMode: 'add',
      formTopicName: '',
      statusIndex: 0,
      scheduleDate: '',
      scheduleTime: '09:00',
      figKeyword: '',
      figCandidates: [],
      formData: {
        id: '',
        title: '',
        topicKey: '',
        author: '',
        era: '',
        summary: '',
        content: '',
        relatedFigures: [],
        sortOrder: '0',
        keywords: '',
        status: 'published',
        scheduledAt: '',
        citations: []
      }
    });
  },

  /**
   * 相关人物归一化：兼容三种历史形态 —— 字符串数组（现行，存姓名）、
   * JSON 串、逗号串，以及早期误存的数字 id。
   * [注意] 服务端只是 `JSON.stringify(relatedFigures)` 存库、**不做校验**，
   *    详情页「相关阅读」按**姓名**匹配，所以这里必须产出姓名数组。
   */
  _normalizeRelatedFigures(raw) {
    if (!raw) return [];
    var arr = raw;
    if (typeof raw === 'string') {
      var s = raw.trim();
      if (!s) return [];
      if (s.charAt(0) === '[') {
        try { arr = JSON.parse(s); } catch (e) { arr = s.split(','); }
      } else {
        arr = s.split(',');
      }
    }
    if (!Array.isArray(arr)) return [];
    return arr.map(function (v) {
      if (v && typeof v === 'object') return String(v.name || v.title || '').trim();
      return String(v == null ? '' : v).trim();
    }).filter(Boolean);
  },

  /**
   * 打开编辑弹窗。
   * [注意] 列表里**没有正文**（见 _stripHeavyFields），必须按 id 拉一次详情再回填，
   *    否则保存时 content 为空，等于把正文清掉。拉不到时退回列表字段（至少能改标题等）。
   */
  onEditArticle(e) {
    var art = e.currentTarget.dataset.art;
    var that = this;
    var open = function(full) {
      // 服务端 normalizeSchedule 存的就是「北京时间 YYYY-MM-DDTHH:mm:ss」，
      // **不做时区换算**（与 Web 端 datetime-local 同口径），这里截到分钟再拆成日期/时间两段
      var sched = full.scheduledAt ? String(full.scheduledAt).slice(0, 16) : '';
      that.setData({
        showForm: true,
        formMode: 'edit',
        formTopicName: that._getTopicName(full.topicKey),
        statusIndex: Math.max(0, that.data.statusValues.indexOf(full.status || 'published')),
        scheduleDate: sched ? sched.slice(0, 10) : '',
        scheduleTime: sched ? sched.slice(11, 16) : '09:00',
        figKeyword: '',
        figCandidates: [],
        formData: {
          id: full.id || '',
          title: full.title || '',
          topicKey: full.topicKey || '',
          author: full.author || '',
          era: full.era || '',
          summary: full.summary || '',
          content: full.content || '',
          relatedFigures: that._normalizeRelatedFigures(full.relatedFigures),
          sortOrder: String(full.sortOrder || 0),
          keywords: full.keywords || '',
          status: full.status || 'published',
          // 服务端 normalizeSchedule 存的就是「北京时间 YYYY-MM-DDTHH:mm:ss」，
          // **不做时区换算**（与 Web 端 datetime-local 同口径），这里截到分钟即可
          scheduledAt: full.scheduledAt ? String(full.scheduledAt).slice(0, 16) : '',
          citations: Array.isArray(full.citations)
            ? full.citations.map(function (c) {
                return { name: c.name || '', author: c.author || '', source: c.source || '', year: c.year || '', url: c.url || '' };
              })
            : []
        }
      });
    };
    wx.showLoading({ title: '加载中...' });
    request({
      handle401: false,
      url: API.ARTICLES.GET(art.id),
      timeout: 10000,
      header: { 'x-admin-key': that.data._adminToken || '' },
      success: function(res) {
        wx.hideLoading();
        if (!that._isPageActive) return;
        var full = (res.data && res.data.data) || null;
        open(full && full.id ? full : art);
      },
      fail: function() {
        wx.hideLoading();
        if (!that._isPageActive) return;
        open(art);
      }
    });
  },

  // ==================== 表单内：发布状态 / 定时 ====================

  onStatusChange(e) {
    var idx = Number(e.detail.value);
    var fd = this.data.formData;
    fd.status = this.data.statusValues[idx];
    this.setData({ formData: fd, statusIndex: idx });
  },

  _today() {
    var d = new Date();
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  },

  /**
   * 同步定时时间。
   * [注意] 日期/时间**单独存两个字段**（scheduleDate / scheduleTime）供 WXML 显示 ——
   *    WXML 表达式不支持 `.slice()` 这类方法调用，只能直接取字段。
   */
  _syncSchedule(date, time) {
    var d = date || this.data.scheduleDate || this._today();
    var t = time || this.data.scheduleTime || '09:00';
    var fd = this.data.formData;
    fd.scheduledAt = d + 'T' + t;
    this.setData({ formData: fd, scheduleDate: d, scheduleTime: t });
  },

  onScheduleDateChange(e) {
    this._syncSchedule(e.detail.value, null);
  },

  onScheduleTimeChange(e) {
    this._syncSchedule(null, e.detail.value);
  },

  // ==================== 表单内：文献引用 ====================

  onAddCitation() {
    var fd = this.data.formData;
    var list = (fd.citations || []).concat([{ name: '', author: '', source: '', year: '', url: '' }]);
    fd.citations = list;
    this.setData({ formData: fd });
  },

  onCitationInput(e) {
    var idx = Number(e.currentTarget.dataset.index);
    var field = e.currentTarget.dataset.field;
    var fd = this.data.formData;
    if (!(fd.citations || [])[idx]) return;
    fd.citations[idx][field] = e.detail.value;
    this.setData({ formData: fd });
  },

  onRemoveCitation(e) {
    var idx = Number(e.currentTarget.dataset.index);
    var fd = this.data.formData;
    fd.citations = (fd.citations || []).filter(function (_, i) { return i !== idx; });
    this.setData({ formData: fd });
  },

  // ==================== 表单内：相关人物（搜索选人，存姓名） ====================

  onFigKeywordInput(e) {
    var that = this;
    var kw = e.detail.value;
    this.setData({ figKeyword: kw });
    if (this._figTimer) clearTimeout(this._figTimer);
    if (!kw.trim()) return this.setData({ figCandidates: [] });
    this._figTimer = setTimeout(function () { that._searchFigures(); }, 400);
  },

  _searchFigures() {
    var that = this;
    var kw = (this.data.figKeyword || '').trim();
    if (!kw) return;
    this.setData({ figSearching: true });
    request({
      handle401: false,
      url: API.FIGURES.SEARCH,
      data: { search: kw, page: 1, pageSize: 10 },
      timeout: 10000,
      success: function (res) {
        if (!that._isPageActive) return;
        var list = (res.data && res.data.data && res.data.data.list) || [];
        that.setData({ figCandidates: list.slice(0, 10) });
      },
      fail: function () {
        if (that._isPageActive) that.setData({ figCandidates: [] });
      },
      complete: function () {
        if (that._isPageActive) that.setData({ figSearching: false });
      }
    });
  },

  onPickFigure(e) {
    var name = e.currentTarget.dataset.name;
    if (!name) return;
    var fd = this.data.formData;
    var cur = fd.relatedFigures || [];
    if (cur.indexOf(name) >= 0) return wx.showToast({ title: '已在列表中', icon: 'none' });
    fd.relatedFigures = cur.concat([name]);
    this.setData({ formData: fd, figKeyword: '', figCandidates: [] });
  },

  onRemoveFigure(e) {
    var name = e.currentTarget.dataset.name;
    var fd = this.data.formData;
    fd.relatedFigures = (fd.relatedFigures || []).filter(function (n) { return n !== name; });
    this.setData({ formData: fd });
  },

  onDeleteArticle(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除文章「' + title + '」吗？',
      success: function(res) {
        if (res.confirm) {
          // 需要找到文章所属专题
          var art = that.data.articles.filter(function(a) { return a.id === id; })[0];
          if (!art || !art.topicKey) return;
          request({
            handle401: false,
            url: API.TOPICS.DELETE_ARTICLE(art.topicKey, id),
            method: 'DELETE',
            timeout: 10000,
            header: { 'x-admin-key': that.data._adminToken || '' },
            success: function(res) {
              if (!that._isPageActive) return;
              if (res.data && res.data.success) {
                wx.showToast({ title: '已删除', icon: 'success' });
                that.loadArticles(true);
              } else {
                wx.showToast({ title: (res.data && res.data.message) || '删除失败', icon: 'none' });
              }
            },
            fail: function() {
              if (!that._isPageActive) return;
              wx.showToast({ title: '删除失败', icon: 'none' });
            }
          });
        }
      }
    });
  },

  /**
   * 置顶 / 取消置顶。
   * [注意] 服务端 `PUT /topics/:key/pin/:articleId` 是 **toggle**（自己翻转），不需要传 body；
   *    也不能把 isPinned 混进文章保存接口 —— 那边根本不接受该字段（旧版表单里的"置顶"开关因此无效）。
   */
  onTogglePin(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var art = this.data.articles.filter(function (a) { return a.id === id; })[0];
    if (!art || !art.topicKey) return;
    request({
      handle401: false,
      url: API.TOPICS.PIN_ARTICLE(art.topicKey, id),
      method: 'PUT',
      timeout: 10000,
      header: { 'x-admin-key': that.data._adminToken || '' },
      success: function (res) {
        if (!that._isPageActive) return;
        var body = res.data || {};
        if (body.success !== false) {
          wx.showToast({ title: body.message || '操作成功', icon: 'success' });
          that.loadArticles(true);
        } else {
          wx.showToast({ title: body.message || '操作失败', icon: 'none' });
        }
      },
      fail: function () {
        if (that._isPageActive) wx.showToast({ title: '网络请求失败', icon: 'none' });
      }
    });
  },

  onToggleContentFullscreen() {
    this.setData({ showContentFullscreen: !this.data.showContentFullscreen });
  },

  onCloseForm() {
    this.setData({ showForm: false, showContentFullscreen: false });
  },

  onFormInput(e) {
    var field = e.currentTarget.dataset.field;
    var val = e.detail.value;
    var fd = this.data.formData;
    fd[field] = val;
    this.setData({ formData: fd });
  },

  onFormTopicChange(e) {
    var idx = e.detail.value;
    var keys = this.data.topicKeys;
    var names = this.data.topicList;
    var fd = this.data.formData;
    fd.topicKey = keys[idx] || '';

    // 新增模式下自动填入文章ID（纯数字，按专题递增）
    if (this.data.formMode === 'add' && fd.topicKey) {
      var that = this;
      request({
        handle401: false,
        timeout: 10000,
        url: API.ARTICLES.NEXT_ID(fd.topicKey),
        success: function(res) {
          if (!that._isPageActive) return;
          if (res.data && res.data.success && res.data.data) {
            fd.id = String(res.data.data.nextId);
            that.setData({ formData: fd });
          }
        },
        fail: function() {
          if (!that._isPageActive) return;
          wx.showToast({ title: '获取文章ID失败', icon: 'none' });
        }
      });
    }

    this.setData({ formData: fd, formTopicName: names[idx] || '' });
  },

  onRefresh() {
    this.setData({ refreshing: true });
    this.loadArticles(true);
  },

  onSubmitForm: once(function () {
    var fd = this.data.formData;
    if (!fd.title) {
      wx.showToast({ title: '请输入标题', icon: 'none' });
      return;
    }
    if (!fd.topicKey) {
      wx.showToast({ title: '请选择所属专题', icon: 'none' });
      return;
    }
    // 定时发布必须给时间（服务端对过去时间会降级为"立即发布"，这里先拦一道）
    if (fd.status === 'scheduled' && !fd.scheduledAt) {
      wx.showToast({ title: '请选择定时发布时间', icon: 'none' });
      return;
    }

    var that = this;
    var data = {
      title: fd.title,
      author: fd.author,
      era: fd.era,
      summary: fd.summary,
      content: fd.content,
      // 姓名数组（服务端只做 JSON.stringify 存库；详情页「相关阅读」按姓名匹配）
      relatedFigures: fd.relatedFigures || [],
      sortOrder: parseInt(fd.sortOrder) || 0,
      keywords: fd.keywords || '',
      status: fd.status || 'published',
      scheduledAt: fd.status === 'scheduled' ? fd.scheduledAt : '',
      // 只提交填了名称的引用，避免存一堆空壳
      citations: (fd.citations || []).filter(function (c) { return (c.name || '').trim(); })
    };

    if (this.data.formMode === 'add') {
      if (!fd.id) {
        wx.showToast({ title: '请输入文章 ID', icon: 'none' });
        return;
      }
      data.id = fd.id;
      return request({
        handle401: false,
        url: API.TOPICS.ADD_ARTICLE(fd.topicKey),
        method: 'POST',
        timeout: 10000,
        header: { 'x-admin-key': that.data._adminToken || '' },
        data: data,
        success: function(res) {
          if (!that._isPageActive) return;
          if (res.data && res.data.success) {
            // 服务端会按状态回不同文案：发布成功 / 已保存草稿 / 已完成定时发布设置
            wx.showToast({ title: res.data.message || '创建成功', icon: 'success' });
            that.setData({ showForm: false });
            that.loadArticles(true);
          } else {
            wx.showToast({ title: res.data.message || '创建失败', icon: 'none' });
          }
        },
        fail: function(err) {
          if (!that._isPageActive) return;
          wx.showToast({ title: '请求失败：' + (err.errMsg || '未知错误'), icon: 'none' });
        }
      });
    } else {
      return request({
        handle401: false,
        url: API.TOPICS.UPDATE_ARTICLE(fd.topicKey, fd.id),
        method: 'PUT',
        timeout: 10000,
        header: { 'x-admin-key': that.data._adminToken || '' },
        data: data,
        success: function(res) {
          if (!that._isPageActive) return;
          if (res.data && res.data.success) {
            // 服务端会按状态回不同文案：已更新并发布 / 已保存草稿 / 已完成定时发布设置
            wx.showToast({ title: res.data.message || '保存成功', icon: 'success' });
            that.setData({ showForm: false });
            that.loadArticles(true);
          } else {
            wx.showToast({ title: res.data.message || '保存失败', icon: 'none' });
          }
        },
        fail: function(err) {
          if (!that._isPageActive) return;
          wx.showToast({ title: '请求失败：' + (err.errMsg || '未知错误'), icon: 'none' });
        }
      });
    }
  })
});
