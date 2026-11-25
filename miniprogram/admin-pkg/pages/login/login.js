const request = require('../../../utils/request');
var API = require('../../../config/api');
var authStore = require('../../../utils/auth-store');

Page({
  data: {
    mode: 'login',        // login = 用后台账号密码登录 / setup = 首次设置后台账号
    adminUsername: '',
    password: '',
    password2: '',
    showPwd: false,
    focusField: '',
    errorMsg: '',
    loading: false,
    hasUserToken: false,
    canSubmit: false
  },

  onLoad() {
    // 已有有效后台令牌 → 直接进后台
    var existing = '';
    try { existing = wx.getStorageSync('admin_token'); } catch (e) { existing = ''; }
    if (existing && typeof existing === 'string' && existing !== 'authorized' && existing.length >= 8) {
      wx.redirectTo({ url: '/admin-pkg/pages/dashboard/dashboard' });
      return;
    }
    // 用普通登录 token 询问是否已设置个人后台账号（服务端 /admin/check-setup）
    // P1-4：读改走 auth-store（内存缓存），减少同步 IO。
    var userToken = authStore.get('userToken') || '';
    this.setData({ hasUserToken: !!userToken });
    if (userToken) this._checkSetup(userToken);
  },

  _checkSetup(userToken) {
    var that = this;
    request({
      handle401: false,
      url: API.AUTH.ADMIN_CHECK_SETUP,
      method: 'GET',
      timeout: 8000,
      header: { 'Authorization': 'Bearer ' + userToken },
      success: function (res) {
        var d = res.data || {};
        if (!d.success || !d.data) return;
        var hasAccount = !!d.data.hasAdminAccount;
        var username = d.data.adminUsername || '';
        // 已设置个人后台账号 → 直接登录；否则（含仅有全局管理密码的情况）引导设置，
        // 避免"没设过账号就永远登不进"的死路
        that.setData({
          mode: hasAccount && username ? 'login' : 'setup',
          adminUsername: username
        });
        that._refreshCanSubmit();
      },
      fail: function () { /* 网络失败就按默认登录模式展示 */ }
    });
  },

  onUserInput(e) {
    this.setData({ adminUsername: e.detail.value, errorMsg: '' });
    this._refreshCanSubmit();
  },

  onPwdInput(e) {
    this.setData({ password: e.detail.value, errorMsg: '' });
    this._refreshCanSubmit();
  },

  onPwd2Input(e) {
    this.setData({ password2: e.detail.value, errorMsg: '' });
    this._refreshCanSubmit();
  },

  onFocusUser() { this.setData({ focusField: 'user' }); },
  onFocusPwd() { this.setData({ focusField: 'pwd' }); },
  onFocusPwd2() { this.setData({ focusField: 'pwd2' }); },
  onBlur() { this.setData({ focusField: '' }); },

  onTogglePwd() {
    this.setData({ showPwd: !this.data.showPwd });
  },

  onToggleMode() {
    var next = this.data.mode === 'setup' ? 'login' : 'setup';
    this.setData({ mode: next, errorMsg: '', password: '', password2: '' });
    this._refreshCanSubmit();
  },

  _refreshCanSubmit() {
    var d = this.data;
    var nameOk = d.adminUsername.length >= 6 && /[a-zA-Z]/.test(d.adminUsername) && /\d/.test(d.adminUsername);
    var pwdOk = d.password.length >= 6;
    var ok = nameOk && pwdOk && (d.mode === 'login' || (d.password2.length >= 6 && d.password2 === d.password));
    if (!!ok !== d.canSubmit) this.setData({ canSubmit: !!ok });
  },

  onSubmit() {
    if (this.data.loading) return;
    var d = this.data;

    if (d.adminUsername.length < 6) { this.setData({ errorMsg: '后台账号至少 6 位' }); return; }
    if (!/[a-zA-Z]/.test(d.adminUsername) || !/\d/.test(d.adminUsername)) {
      this.setData({ errorMsg: '后台账号需同时包含字母和数字' });
      return;
    }
    if (d.password.length < 6) { this.setData({ errorMsg: '密码至少 6 位' }); return; }
    if (d.mode === 'setup') {
      if (d.password2 !== d.password) { this.setData({ errorMsg: '两次输入的密码不一致' }); return; }
      this._setupAccount();
      return;
    }
    this._login();
  },

  // 首次设置后台账号（服务端要求携带已登录的普通 token）
  _setupAccount() {
    var that = this;
    var userToken = authStore.get('userToken') || '';
    if (!userToken) {
      this.setData({ errorMsg: '请先在「我的」页登录管理员账号，再回来设置后台账号' });
      return;
    }
    this.setData({ loading: true, errorMsg: '' });
    request({
      handle401: false,
      url: API.AUTH.ADMIN_SETUP_ACCOUNT,
      method: 'POST',
      timeout: 10000,
      header: { 'Authorization': 'Bearer ' + userToken, 'Content-Type': 'application/json' },
      data: { adminUsername: this.data.adminUsername, adminPassword: this.data.password },
      success: function (res) {
        var d = res.data || {};
        if (d.success) {
          wx.showToast({ title: '账号已设置，正在登录', icon: 'none' });
          that._login();
        } else {
          that.setData({ loading: false, errorMsg: (d && d.message) || '设置失败，请重试' });
        }
      },
      fail: function () {
        that.setData({ loading: false, errorMsg: '服务器连接失败，请检查网络' });
      }
    });
  },

  _login() {
    var that = this;
    this.setData({ loading: true, errorMsg: '' });
    request({
      handle401: false,
      url: API.BASE + '/api/auth/admin/verify',
      method: 'POST',
      timeout: 10000,
      header: { 'Content-Type': 'application/json' },
      data: { adminUsername: this.data.adminUsername, password: this.data.password },
      success: function (res) {
        if (res.data && res.data.success) {
          // 服务端返回 { success, data: { adminToken, expiresAt } }（auth.js:418）。
          // 兼容旧结构 res.data.token；绝不能再兜底写 'authorized'（会被各页 checkAuth 拒绝，
          // 造成"提示登录成功但处处被踢回"）。
          var token = (res.data.data && res.data.data.adminToken) || res.data.token || '';
          if (!token || typeof token !== 'string' || token.length < 8) {
            that.setData({ loading: false, errorMsg: '登录响应异常，请重试' });
            return;
          }
          that._authorize(token);
        } else {
          var msg = (res.data && res.data.message) || '账号或密码错误，请重试';
          if (msg.indexOf('请输入账号和密码') !== -1) msg = '请填写后台账号和密码';
          that.setData({ loading: false, errorMsg: msg });
        }
      },
      fail: function () {
        that.setData({ loading: false, errorMsg: '服务器连接失败，请检查网络' });
      }
    });
  },

  _authorize(token) {
    if (!token || typeof token !== 'string') return;
    // 配额满时 setStorageSync 会抛异常：令牌没落盘就不能进后台（否则进去也是空列表 + 全被拒），
    // 故此处吞掉异常并提示，直接返回，不跳转。
    try {
      wx.setStorageSync('admin_token', token);
    } catch (e) {
      wx.showToast({ title: '本地存储不可用，请清理微信缓存后重试', icon: 'none', duration: 2500 });
      return;
    }
    wx.showToast({ title: '登录成功', icon: 'success' });
    setTimeout(function () {
      wx.redirectTo({ url: '/admin-pkg/pages/dashboard/dashboard' });
    }, 800);
  }
});
