const API = require('../../../config/api');
const { navTo } = require('../../../utils/nav');
const { getAdminToken, verifyAdminToken, kickToLogin } = require('../../utils/admin-guard');

Page({
  data: {
    _adminToken: '',
    // 真实状态栏高度（px），注入导航栏 padding-top。
    // [注意] 导航栏高度**不能写死 88rpx(=44px)**：刘海/灵动岛机型状态栏更高，会被压住
    safeAreaTop: 44
  },

  onLoad() {
    if (!this.checkAuth()) return;
    this._isPageActive = true;
    var sys = wx.getWindowInfo();
    this.setData({ safeAreaTop: sys.statusBarHeight || 44 });
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

  onUnload() {
    this._isPageActive = false;
  },

  onBack() {
    wx.navigateBack();
  },

  onLogout() {
    try {
      wx.removeStorageSync('admin_token');
      wx.removeStorageSync('x-admin-key');
    } catch (e) { /* ignore */ }
    wx.redirectTo({ url: '/admin-pkg/pages/login/login' });
  },

  onGoFigures() {
    navTo('/admin-pkg/pages/figures/figures');
  },

  onGoArticles() {
    navTo('/admin-pkg/pages/articles/articles');
  },

  onGoTopics() {
    navTo('/admin-pkg/pages/topics/topics');
  },

  onGoUsers() {
    navTo('/admin-pkg/pages/users/users');
  },

  onGoMessages() {
    navTo('/admin-pkg/pages/messages/messages');
  }
});
