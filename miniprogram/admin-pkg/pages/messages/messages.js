const request = require('../../../utils/request');
const API = require('../../../config/api');
const { fmtTime } = require('../../../utils/time-utils');
const { getAdminToken, verifyAdminToken, kickToLogin } = require('../../utils/admin-guard');

/* ============================================================
   后台「消息管理」—— 与 Web 端 src/components/admin/AdminMessages.tsx 对齐
   5 个模块：站内公告 / 站内信 / 消息模板 / 触发推送 / 反馈管理
   [注意] 所有接口都挂 requireAdmin，**每个请求都必须带 x-admin-key**，
      否则服务端把失败伪装成 404「接口不存在」，表现为"列表全空"。
   ============================================================ */

const TABS = [
  { key: 'announce', label: '站内公告' },
  { key: 'messages', label: '站内信' },
  { key: 'templates', label: '消息模板' },
  { key: 'trigger', label: '触发推送' },
  { key: 'feedback', label: '反馈管理' }
];

// 公告类型 / 状态（服务端只认 bar|popup 与 draft|published）
const ANN_TYPES = [{ value: 'bar', label: '顶部横幅' }, { value: 'popup', label: '弹窗公告' }];
const ANN_STATUS = [{ value: 'draft', label: '草稿' }, { value: 'published', label: '已发布' }];
// 模板/推送渠道
const CHANNELS = [{ value: 'email', label: '邮件' }, { value: 'sms', label: '短信' }, { value: 'inapp', label: '站内信' }];
// 反馈状态筛选
const FB_FILTERS = [
  { key: '', label: '全部' },
  { key: 'pending', label: '待处理' },
  { key: 'replied', label: '已回复' },
  { key: 'resolved', label: '已处理' }
];
// 反馈类型/状态中文（[注意] 与 Web 端刻意不同：Web 端把 cancel_account 显示成「其他」，
// 小程序后台是管理员自己的工具，**必须能一眼认出注销类反馈** —— 它有专用邮件文案，误处理代价高）
const FB_TYPES = { suggestion: '功能建议', bug: '问题反馈', content: '内容问题', other: '其他', cancel_account: '注销账号' };
const FB_STATUS = { pending: '待处理', replied: '已回复', resolved: '已处理' };

const PAGE_SIZE = 20;

Page({
  data: {
    tabs: TABS,
    activeTab: 'announce',
    _adminToken: '',
    // 真实状态栏高度（px），注入导航栏 padding-top；写死 88rpx 会被高状态栏机型压住
    safeAreaTop: 44,

    // 统一分页状态（同一时刻只有一个 Tab 在加载）
    loading: false,
    refreshing: false,
    page: 1,
    hasMore: true,
    total: 0,

    // ===== 站内公告 =====
    announcements: [],
    showAnnForm: false,
    annMode: 'add',
    annForm: { id: '', title: '', content: '', type: 'bar', status: 'draft' },
    annTypeLabels: ANN_TYPES.map(function (t) { return t.label; }),
    annStatusLabels: ANN_STATUS.map(function (s) { return s.label; }),
    annTypeIndex: 0,
    annStatusIndex: 0,
    savingAnn: false,

    // ===== 站内信 =====
    msgList: [],
    users: [],
    userOptions: [],
    userIndex: 0,
    msgForm: { toUserId: '', title: '', content: '' },
    broadcastOpen: false,
    broadcastForm: { title: '', content: '' },
    sendingMsg: false,

    // ===== 消息模板 =====
    templates: [],
    templateOptions: [],
    showTmplForm: false,
    tmplMode: 'add',
    tmplForm: { id: '', code: '', name: '', subject: '', content: '', channel: 'email', variables: '' },
    channelLabels: CHANNELS.map(function (c) { return c.label; }),
    channelIndex: 0,
    savingTmpl: false,

    // ===== 触发推送 =====
    triggerTmplIndex: 0,
    triggerScopeLabels: ['全部用户', '指定用户'],
    triggerScopeIndex: 0,
    triggerUserIndex: 0,
    triggerVars: '',
    triggering: false,
    triggerHint: '',

    // ===== 反馈管理 =====
    feedbacks: [],
    fbFilters: FB_FILTERS,
    fbFilter: '',
    fbSearch: '',
    replyingId: 0,
    replyText: '',
    resolvingId: 0
  },

  checkAuth() {
    var token = getAdminToken();
    if (!token) {
      kickToLogin();
      return false;
    }
    this.data._adminToken = token;
    // 服务端复核（异步，权威判定）：本地令牌"格式合法"≠"有效"，被篡改/过期时踢回登录页，
    // 避免"进了后台却全是空列表"的误导。
    verifyAdminToken(token).catch(function () {});
    return true;
  },

  onLoad() {
    if (!this.checkAuth()) return;
    this._isPageActive = true;
    // 状态栏真实高度（写死 88rpx 在刘海/灵动岛机型上会让导航栏顶进状态栏）
    var sys = wx.getWindowInfo();
    this.setData({ safeAreaTop: sys.statusBarHeight || 44 });
    this.loadUsers();              // 站内信/触发推送都要选用户，先拉一次
    this._loadCurrent(true);
  },

  onUnload() {
    this._isPageActive = false;
    // 反馈搜索防抖：卸载后仍触发会白发一次请求
    if (this._fbSearchTimer) clearTimeout(this._fbSearchTimer);
    this._fbSearchTimer = null;
  },

  onBack() {
    wx.navigateBack();
  },

  // 弹层内容区用 catchtap 阻止冒泡到遮罩（否则点输入框会把弹窗关掉）。
  // [注意] WXML 里绑了 catchtap="noop"，这里必须真实存在，否则控制台报
  //    「does not have a method "noop"」（功能不受影响，但会刷错误日志）。
  noop() {},

  /**
   * 统一请求封装：自动带后台令牌、按 `success` 判定成败（**HTTP 200 ≠ 业务成功**）。
   * 页面已销毁时 resolve(null)，调用方据此直接忽略结果。
   */
  _req(opts) {
    var that = this;
    return new Promise(function (resolve, reject) {
      request({
        handle401: false,
        url: opts.url,
        method: opts.method || 'GET',
        data: opts.data || {},
        timeout: 15000,
        header: { 'x-admin-key': that.data._adminToken || '' },
        success: function (res) {
          if (!that._isPageActive) return resolve(null);
          var body = res.data || {};
          if (res.statusCode === 200 && body.success !== false) return resolve(body);
          reject(new Error(body.message || ('请求失败（' + res.statusCode + '）')));
        },
        fail: function (err) {
          if (!that._isPageActive) return resolve(null);
          reject(new Error((err && err.errMsg) || '网络请求失败'));
        }
      });
    });
  },

  _toastErr(err) {
    wx.showToast({ title: (err && err.message) || '操作失败', icon: 'none' });
  },

  // ==================== Tab 切换与分发 ====================

  onSwitchTab(e) {
    var key = e.currentTarget.dataset.key;
    if (key === this.data.activeTab) return;
    this.setData({ activeTab: key });
    this._loadCurrent(true);
  },

  _loadCurrent(reset) {
    var tab = this.data.activeTab;
    if (tab === 'announce') return this.loadAnnouncements(reset);
    if (tab === 'messages') return this.loadMessages(reset);
    if (tab === 'templates') return this.loadTemplates();
    if (tab === 'trigger') return this.loadTemplates();
    if (tab === 'feedback') return this.loadFeedbacks(reset);
  },

  onRefresh() {
    this.setData({ refreshing: true });
    this._loadCurrent(true);
  },

  onLoadMore() {
    var tab = this.data.activeTab;
    if (tab === 'announce') return this.loadAnnouncements(false);
    if (tab === 'messages') return this.loadMessages(false);
    if (tab === 'feedback') return this.loadFeedbacks(false);
  },

  /** 分页请求的公共前置：返回 true 表示可以发请求 */
  _canLoad(reset) {
    if (!reset && (this.data.loading || !this.data.hasMore)) return false;
    return true;
  },

  // ==================== 1. 站内公告 ====================

  loadAnnouncements(reset) {
    var that = this;
    if (!this._canLoad(reset)) return;
    var page = reset ? 1 : this.data.page + 1;
    this.setData({ loading: true });

    this._req({
      url: API.MESSAGES.ANNOUNCEMENTS,
      data: { page: page, pageSize: PAGE_SIZE }
    }).then(function (body) {
      if (!body) return;
      var pd = body.data || {};
      var list = Array.isArray(pd.list) ? pd.list : [];
      list = list.map(function (a) {
        return Object.assign({}, a, {
          _time: fmtTime(a.createdAt),
          _typeLabel: a.type === 'popup' ? '弹窗公告' : '顶部横幅',
          _statusLabel: a.status === 'published' ? '已发布' : '草稿'
        });
      });
      var merged = page === 1 ? list : that.data.announcements.concat(list);
      var totalPages = pd.totalPages || 1;
      that.setData({
        announcements: merged,
        page: page,
        total: pd.total || merged.length,
        hasMore: page < totalPages
      });
    }).catch(function (err) {
      that._toastErr(err);
    }).then(function () {
      if (that._isPageActive) that.setData({ loading: false, refreshing: false });
    });
  },

  onAddAnn() {
    this.setData({
      showAnnForm: true,
      annMode: 'add',
      annForm: { id: '', title: '', content: '', type: 'bar', status: 'draft' },
      annTypeIndex: 0,
      annStatusIndex: 0
    });
  },

  onEditAnn(e) {
    // 用下标取，而不是把整个对象塞进 dataset —— 公告正文可能很长，dataset 会被序列化进 XML
    var idx = Number(e.currentTarget.dataset.index);
    var item = this.data.announcements[idx];
    if (!item) return;
    var typeIdx = 0, statusIdx = 0;
    for (var i = 0; i < ANN_TYPES.length; i++) if (ANN_TYPES[i].value === item.type) typeIdx = i;
    for (var j = 0; j < ANN_STATUS.length; j++) if (ANN_STATUS[j].value === item.status) statusIdx = j;
    this.setData({
      showAnnForm: true,
      annMode: 'edit',
      annForm: {
        id: item.id, title: item.title || '', content: item.content || '',
        type: item.type || 'bar', status: item.status || 'draft'
      },
      annTypeIndex: typeIdx,
      annStatusIndex: statusIdx
    });
  },

  onCloseAnnForm() {
    this.setData({ showAnnForm: false });
  },

  onAnnInput(e) {
    var field = e.currentTarget.dataset.field;
    var form = this.data.annForm;
    form[field] = e.detail.value;
    this.setData({ annForm: form });
  },

  onAnnTypeChange(e) {
    var idx = Number(e.detail.value);
    var form = this.data.annForm;
    form.type = ANN_TYPES[idx].value;
    this.setData({ annForm: form, annTypeIndex: idx });
  },

  onAnnStatusChange(e) {
    var idx = Number(e.detail.value);
    var form = this.data.annForm;
    form.status = ANN_STATUS[idx].value;
    this.setData({ annForm: form, annStatusIndex: idx });
  },

  onSaveAnn() {
    var that = this;
    var fd = this.data.annForm;
    if (!fd.title) return wx.showToast({ title: '请填写公告标题', icon: 'none' });
    if (this.data.savingAnn) return;
    this.setData({ savingAnn: true });

    var isEdit = this.data.annMode === 'edit';
    this._req({
      url: isEdit ? API.MESSAGES.ANNOUNCEMENT(fd.id) : API.MESSAGES.ANNOUNCEMENTS,
      method: isEdit ? 'PUT' : 'POST',
      data: { title: fd.title, content: fd.content, type: fd.type, status: fd.status }
    }).then(function (body) {
      if (!body) return;
      wx.showToast({ title: body.message || '保存成功', icon: 'success' });
      that.setData({ showAnnForm: false });
      that.loadAnnouncements(true);
    }).catch(function (err) {
      that._toastErr(err);
    }).then(function () {
      if (that._isPageActive) that.setData({ savingAnn: false });
    });
  },

  onDeleteAnn(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定删除这条公告吗？删除后前台不再展示。',
      success: function (res) {
        if (!res.confirm) return;
        that._req({ url: API.MESSAGES.ANNOUNCEMENT(id), method: 'DELETE' })
          .then(function (body) {
            if (!body) return;
            wx.showToast({ title: '已删除', icon: 'success' });
            that.loadAnnouncements(true);
          })
          .catch(function (err) { that._toastErr(err); });
      }
    });
  },

  // ==================== 2. 站内信 / 私信 ====================

  loadMessages(reset) {
    var that = this;
    if (!this._canLoad(reset)) return;
    var page = reset ? 1 : this.data.page + 1;
    this.setData({ loading: true });

    this._req({
      url: API.MESSAGES.LIST,
      data: { page: page, pageSize: PAGE_SIZE }
    }).then(function (body) {
      if (!body) return;
      var pd = body.data || {};
      var list = Array.isArray(pd.list) ? pd.list : [];
      list = list.map(function (m) {
        var typeLabel = m.type === 'broadcast' ? '群发' : (m.type === 'trigger' ? '推送' : (m.type === 'system' ? '系统' : '私信'));
        return Object.assign({}, m, { _time: fmtTime(m.createdAt), _typeLabel: typeLabel });
      });
      var merged = page === 1 ? list : that.data.msgList.concat(list);
      var totalPages = pd.totalPages || 1;
      that.setData({
        msgList: merged,
        page: page,
        total: pd.total || merged.length,
        hasMore: page < totalPages
      });
    }).catch(function (err) {
      that._toastErr(err);
    }).then(function () {
      if (that._isPageActive) that.setData({ loading: false, refreshing: false });
    });
  },

  /** 收件人候选（同时供「站内信」与「触发推送-指定用户」使用） */
  loadUsers() {
    var that = this;
    this._req({ url: API.USERS.LIST, data: { page: 1, pageSize: 100 } })
      .then(function (body) {
        if (!body) return;
        var pd = body.data || {};
        var list = Array.isArray(pd.list) ? pd.list : [];
        var options = list.map(function (u) {
          return (u.nickName || u.displayName || '未命名') + '（ID ' + u.id + '）';
        });
        that.setData({ users: list, userOptions: options.length ? options : ['暂无用户'] });
      })
      .catch(function () { /* 用户列表失败不打断主流程，仅影响"选收件人" */ });
  },

  onUserChange(e) {
    var idx = Number(e.detail.value);
    var users = this.data.users;
    var form = this.data.msgForm;
    form.toUserId = users[idx] ? users[idx].id : '';
    this.setData({ msgForm: form, userIndex: idx });
  },

  onMsgInput(e) {
    var field = e.currentTarget.dataset.field;
    var form = this.data.msgForm;
    form[field] = e.detail.value;
    this.setData({ msgForm: form });
  },

  onSendMsg() {
    var that = this;
    var fd = this.data.msgForm;
    if (!fd.toUserId) return wx.showToast({ title: '请选择收件人', icon: 'none' });
    if (!fd.content) return wx.showToast({ title: '请填写消息内容', icon: 'none' });
    if (this.data.sendingMsg) return;
    this.setData({ sendingMsg: true });

    this._req({
      url: API.MESSAGES.LIST,
      method: 'POST',
      data: { toUserId: fd.toUserId, title: fd.title, content: fd.content }
    }).then(function (body) {
      if (!body) return;
      wx.showToast({ title: body.message || '发送成功', icon: 'success' });
      that.setData({ msgForm: { toUserId: '', title: '', content: '' }, userIndex: 0 });
      that.loadMessages(true);
    }).catch(function (err) {
      that._toastErr(err);
    }).then(function () {
      if (that._isPageActive) that.setData({ sendingMsg: false });
    });
  },

  onToggleBroadcast() {
    this.setData({ broadcastOpen: !this.data.broadcastOpen });
  },

  onBroadcastInput(e) {
    var field = e.currentTarget.dataset.field;
    var form = this.data.broadcastForm;
    form[field] = e.detail.value;
    this.setData({ broadcastForm: form });
  },

  onBroadcast() {
    var that = this;
    var fd = this.data.broadcastForm;
    if (!fd.content) return wx.showToast({ title: '请填写群发内容', icon: 'none' });
    wx.showModal({
      title: '确认群发',
      content: '将向**全部用户**发送这条站内信，确认继续？',
      success: function (res) {
        if (!res.confirm) return;
        if (that.data.sendingMsg) return;
        that.setData({ sendingMsg: true });
        that._req({
          url: API.MESSAGES.BROADCAST,
          method: 'POST',
          data: { title: fd.title, content: fd.content }
        }).then(function (body) {
          if (!body) return;
          wx.showToast({ title: body.message || '群发成功', icon: 'none' });
          that.setData({ broadcastForm: { title: '', content: '' }, broadcastOpen: false });
          that.loadMessages(true);
        }).catch(function (err) {
          that._toastErr(err);
        }).then(function () {
          if (that._isPageActive) that.setData({ sendingMsg: false });
        });
      }
    });
  },

  onDeleteMsg(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定删除这条站内信记录吗？',
      success: function (res) {
        if (!res.confirm) return;
        that._req({ url: API.MESSAGES.MESSAGE(id), method: 'DELETE' })
          .then(function (body) {
            if (!body) return;
            wx.showToast({ title: '已删除', icon: 'success' });
            that.loadMessages(true);
          })
          .catch(function (err) { that._toastErr(err); });
      }
    });
  },

  // ==================== 3. 消息模板 ====================

  loadTemplates() {
    var that = this;
    this.setData({ loading: true });
    this._req({ url: API.MESSAGES.TEMPLATES })
      .then(function (body) {
        if (!body) return;
        var list = Array.isArray(body.data) ? body.data : [];
        list = list.map(function (t) {
          var ch = '邮件';
          for (var i = 0; i < CHANNELS.length; i++) if (CHANNELS[i].value === t.channel) ch = CHANNELS[i].label;
          return Object.assign({}, t, { _channelLabel: ch });
        });
        var options = list.map(function (t) { return t.name + '（' + t.code + '）'; });
        that.setData({
          templates: list,
          templateOptions: options.length ? options : ['暂无模板'],
          total: list.length,
          hasMore: false
        });
      })
      .catch(function (err) {
        that._toastErr(err);
      })
      .then(function () {
        if (that._isPageActive) that.setData({ loading: false, refreshing: false });
      });
  },

  onAddTmpl() {
    this.setData({
      showTmplForm: true,
      tmplMode: 'add',
      tmplForm: { id: '', code: '', name: '', subject: '', content: '', channel: 'email', variables: '' },
      channelIndex: 0
    });
  },

  onEditTmpl(e) {
    var idx = Number(e.currentTarget.dataset.index);
    var t = this.data.templates[idx];
    if (!t) return;
    var channelIdx = 0;
    for (var i = 0; i < CHANNELS.length; i++) if (CHANNELS[i].value === t.channel) channelIdx = i;
    // variables 在库里是 JSON 字符串（如 ["siteName","userName"]），回填成逗号串更好编辑
    var varsText = '';
    try {
      var arr = typeof t.variables === 'string' ? JSON.parse(t.variables) : t.variables;
      if (Array.isArray(arr)) varsText = arr.join(',');
    } catch (err) { varsText = ''; }
    this.setData({
      showTmplForm: true,
      tmplMode: 'edit',
      tmplForm: {
        id: t.id, code: t.code || '', name: t.name || '', subject: t.subject || '',
        content: t.content || '', channel: t.channel || 'email', variables: varsText
      },
      channelIndex: channelIdx
    });
  },

  onCloseTmplForm() {
    this.setData({ showTmplForm: false });
  },

  onTmplInput(e) {
    var field = e.currentTarget.dataset.field;
    var form = this.data.tmplForm;
    form[field] = e.detail.value;
    this.setData({ tmplForm: form });
  },

  onChannelChange(e) {
    var idx = Number(e.detail.value);
    var form = this.data.tmplForm;
    form.channel = CHANNELS[idx].value;
    this.setData({ tmplForm: form, channelIndex: idx });
  },

  onSaveTmpl() {
    var that = this;
    var fd = this.data.tmplForm;
    if (!fd.code) return wx.showToast({ title: '请填写模板编码', icon: 'none' });
    if (!fd.name) return wx.showToast({ title: '请填写模板名称', icon: 'none' });
    if (this.data.savingTmpl) return;
    this.setData({ savingTmpl: true });

    // 变量：逗号/顿号/空格分隔 → 字符串数组（服务端会 JSON.stringify 存库）
    var vars = String(fd.variables || '').split(/[,，、\s]+/).filter(Boolean);
    var isEdit = this.data.tmplMode === 'edit';

    this._req({
      url: isEdit ? API.MESSAGES.TEMPLATE(fd.id) : API.MESSAGES.TEMPLATES,
      method: isEdit ? 'PUT' : 'POST',
      data: {
        code: fd.code, name: fd.name, subject: fd.subject,
        content: fd.content, channel: fd.channel, variables: vars
      }
    }).then(function (body) {
      if (!body) return;
      wx.showToast({ title: body.message || '保存成功', icon: 'success' });
      that.setData({ showTmplForm: false });
      that.loadTemplates();
    }).catch(function (err) {
      that._toastErr(err);
    }).then(function () {
      if (that._isPageActive) that.setData({ savingTmpl: false });
    });
  },

  onDeleteTmpl(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定删除这个模板吗？删除后模板推送会失败。',
      success: function (res) {
        if (!res.confirm) return;
        that._req({ url: API.MESSAGES.TEMPLATE(id), method: 'DELETE' })
          .then(function (body) {
            if (!body) return;
            wx.showToast({ title: '已删除', icon: 'success' });
            that.loadTemplates();
          })
          .catch(function (err) { that._toastErr(err); });
      }
    });
  },

  // ==================== 4. 触发推送 ====================

  onTriggerTmplChange(e) {
    this.setData({ triggerTmplIndex: Number(e.detail.value) });
  },

  onTriggerScopeChange(e) {
    this.setData({ triggerScopeIndex: Number(e.detail.value) });
  },

  onTriggerUserChange(e) {
    this.setData({ triggerUserIndex: Number(e.detail.value) });
  },

  onTriggerVarsInput(e) {
    this.setData({ triggerVars: e.detail.value });
  },

  /** 变量文本 → 对象：每行 `key=value`（也兼容 key:value / key value） */
  _parseVars(text) {
    var out = {};
    var lines = String(text || '').split('\n');
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      var m = line.match(/^([^=:=\s]+)\s*[=:：]?\s*(.*)$/);
      if (m && m[1]) out[m[1]] = m[2];
    }
    return out;
  },

  onTrigger() {
    var that = this;
    var tmpl = this.data.templates[this.data.triggerTmplIndex];
    if (!tmpl) return wx.showToast({ title: '请选择消息模板', icon: 'none' });

    // [注意] 服务端契约：{ templateCode, userIds, extra }（userId 数组 + 变量对象），
    //    不是 Web 端那个 `{to, channel, variables}` —— 按真实契约传，否则收件人会被当成"全部用户"
    var payload = { templateCode: tmpl.code, extra: this._parseVars(this.data.triggerVars) };
    if (this.data.triggerScopeIndex === 1) {
      var u = this.data.users[this.data.triggerUserIndex];
      if (!u) return wx.showToast({ title: '请选择目标用户', icon: 'none' });
      payload.userIds = [u.id];
    }

    if (this.data.triggering) return;
    this.setData({ triggering: true, triggerHint: '' });

    this._req({ url: API.MESSAGES.TRIGGER, method: 'POST', data: payload })
      .then(function (body) {
        if (!body) return;
        that.setData({ triggerHint: body.message || '推送完成' });
        wx.showToast({ title: '推送完成', icon: 'success' });
      })
      .catch(function (err) {
        that._toastErr(err);
      })
      .then(function () {
        if (that._isPageActive) that.setData({ triggering: false });
      });
  },

  // ==================== 5. 反馈管理 ====================

  loadFeedbacks(reset) {
    var that = this;
    if (!this._canLoad(reset)) return;
    var page = reset ? 1 : this.data.page + 1;
    this.setData({ loading: true });

    this._req({
      url: API.FEEDBACK.ADMIN_LIST,
      data: {
        page: page,
        pageSize: PAGE_SIZE,
        status: this.data.fbFilter || '',
        search: this.data.fbSearch || ''
      }
    }).then(function (body) {
      if (!body) return;
      var pd = body.data || {};
      var list = Array.isArray(pd.list) ? pd.list : [];
      list = list.map(function (fb) {
        return Object.assign({}, fb, {
          _time: fmtTime(fb.createdAt),
          _imageUrl: that._fbImageUrl(fb.image),
          _typeLabel: FB_TYPES[fb.type] || '其他',
          _statusLabel: FB_STATUS[fb.status] || '待处理'
        });
      });
      var merged = page === 1 ? list : that.data.feedbacks.concat(list);
      var totalPages = pd.totalPages || 1;
      that.setData({
        feedbacks: merged,
        page: page,
        total: pd.total || merged.length,
        hasMore: page < totalPages,
        replyingId: 0
      });
    }).catch(function (err) {
      that._toastErr(err);
    }).then(function () {
      if (that._isPageActive) that.setData({ loading: false, refreshing: false });
    });
  },

  /** 反馈截图：库里只存文件名，必须拼静态目录（与 Web 端 fbImageUrl 同口径） */
  _fbImageUrl(name) {
    if (!name || !/^[\w.\-]+$/.test(name)) return '';
    return API.BASE + '/uploads/feedback/' + name;
  },

  onFbFilterChange(e) {
    var key = e.currentTarget.dataset.key;
    if (key === this.data.fbFilter) return;
    this.setData({ fbFilter: key });
    this.loadFeedbacks(true);
  },

  onFbSearchInput(e) {
    var that = this;
    this.setData({ fbSearch: e.detail.value });
    if (this._fbSearchTimer) clearTimeout(this._fbSearchTimer);
    this._fbSearchTimer = setTimeout(function () { that.loadFeedbacks(true); }, 400);
  },

  onReplyStart(e) {
    this.setData({ replyingId: Number(e.currentTarget.dataset.id), replyText: '' });
  },

  onReplyInput(e) {
    this.setData({ replyText: e.detail.value });
  },

  onReplyCancel() {
    this.setData({ replyingId: 0, replyText: '' });
  },

  onReplySubmit(e) {
    var that = this;
    var id = Number(e.currentTarget.dataset.id);
    var text = (this.data.replyText || '').trim();
    if (!text) return wx.showToast({ title: '请输入回复内容', icon: 'none' });

    this._req({ url: API.FEEDBACK.ADMIN_REPLY(id), method: 'PUT', data: { reply: text } })
      .then(function (body) {
        if (!body) return;
        // 服务端在用户留了邮箱时会自动发信（reply 只回 mailed，不像 resolve 还回 mailReason）
        wx.showToast({ title: body.mailed === true ? '已回复并发送邮件' : '已回复', icon: body.mailed ? 'success' : 'none' });
        that.setData({ replyingId: 0, replyText: '' });
        that.loadFeedbacks(true);
      })
      .catch(function (err) { that._toastErr(err); });
  },

  onResolveFb(e) {
    var that = this;
    var id = Number(e.currentTarget.dataset.id);
    if (this.data.resolvingId) return;
    wx.showModal({
      title: '标记已处理',
      content: '把这条反馈标记为「已处理」？若用户留了邮箱，服务端会自动发送处理结果邮件。',
      success: function (res) {
        if (!res.confirm) return;
        that.setData({ resolvingId: id });
        that._req({ url: API.FEEDBACK.ADMIN_RESOLVE(id), method: 'PUT' })
          .then(function (body) {
            if (!body) return;
            var msg = '已处理';
            if (body.mailed === true) msg = '已处理并发送邮件';
            else if (body.mailReason === 'send_failed' || body.mailReason === 'send_error') {
              msg = '已处理，但邮件发送失败，请改用「回复」重试';
            }
            wx.showToast({ title: msg, icon: body.mailed ? 'success' : 'none' });
            that.loadFeedbacks(true);
          })
          .catch(function (err) { that._toastErr(err); })
          .then(function () {
            if (that._isPageActive) that.setData({ resolvingId: 0 });
          });
      }
    });
  },

  onDeleteFb(e) {
    var that = this;
    var id = Number(e.currentTarget.dataset.id);
    wx.showModal({
      title: '确认删除',
      content: '确定删除这条反馈吗？此操作不可恢复。',
      success: function (res) {
        if (!res.confirm) return;
        that._req({ url: API.FEEDBACK.ADMIN_DELETE(id), method: 'DELETE' })
          .then(function (body) {
            if (!body) return;
            wx.showToast({ title: '已删除', icon: 'success' });
            that.loadFeedbacks(true);
          })
          .catch(function (err) { that._toastErr(err); });
      }
    });
  },

  /** 查看截图大图：小程序用 previewImage（比 Web 的 lightbox 更贴合原生体验） */
  onPreviewFbImage(e) {
    var url = e.currentTarget.dataset.url;
    if (!url) return;
    wx.previewImage({ current: url, urls: [url] });
  }
});
