const API = require('../../../config/api');
const request = require('../../../utils/request');
const { navTo } = require('../../../utils/nav');
const { ensurePrivacyAuthorized } = require('../../../utils/privacy');
const app = getApp();

/**
 * 「关于世慧屋」独立页（account-pkg 分包）。
 *
 * 从「我的」页的弹层迁出，只保留两组：
 *   版本与备案（当前版本 / 备案号点击复制）
 *   条款与声明（隐私政策 / 免责声明）
 * 意见反馈保留在「我的」页「通用与关于」组，本页不再重复。
 * [禁止] 公安备案、用户协议、更新日志、联系邮箱、版权一律不出现（产品已明确删除）。
 * [约束] 无字段的条目整条不渲染，不做「暂未配置」占位。
 */
Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 88,
    appVersion: '1.0.0',
    appVersionEnv: '',
    icp: ''
  },

  onLoad() {
    const sysInfo = wx.getWindowInfo();
    const safeAreaTop = sysInfo.statusBarHeight || 44;
    this.setData({ safeAreaTop, navBarHeight: safeAreaTop + 44 });
    this._applyAppVersion();
    this._loadSiteInfo();
  },

  /**
   * 版本号取值优先级（与「我的」页原实现一致）：
   *   1. 本机真实版本（正式版随上传自动更新）
   *   2. 后台维护值（体验版/开发版读不到本机版本时的兜底）
   *   3. 1.0.0
   */
  _applyAppVersion() {
    const info = (typeof app.getAppVersionInfo === 'function')
      ? app.getAppVersionInfo()
      : { version: '', envVersion: '' };
    const local = String(info.version || '').trim();
    const backend = String(this._backendVersion || '').trim();
    const version = local || backend || '1.0.0';
    let env = '';
    if (info.envVersion === 'trial') env = '（体验版）';
    else if (info.envVersion === 'develop') env = '（开发版）';
    this.setData({ appVersion: version, appVersionEnv: env });
  },

  _loadSiteInfo() {
    if (app.globalData.siteInfo) {
      this._applySiteInfo(app.globalData.siteInfo);
      return;
    }
    request({
      url: API.BASE + '/api/site',
      timeout: 10000,
      success: (res) => {
        const d = res.data || {};
        if (d.success && d.data) {
          app.globalData.siteInfo = d.data;
          this._applySiteInfo(d.data);
        }
      },
      fail: () => { /* 备案号拿不到就整条不显示，不做占位 */ }
    });
  },

  _applySiteInfo(site) {
    const s = site || {};
    this.setData({
      // 小程序专属备案号优先（与网站备案号不同），旧数据回退到 icp
      icp: s.icpMini || s.icp || ''
    });
    this._backendVersion = String(s.miniProgramVersion || '').trim();
    this._applyAppVersion();
  },

  onCopyIcp() {
    const value = this.data.icp;
    if (!value) return;
    // 剪贴板属隐私接口，未同意隐私指引时会直接失效，先走统一授权
    ensurePrivacyAuthorized()
      .then(() => {
        wx.setClipboardData({
          data: value,
          success: () => wx.showToast({ title: '已复制', icon: 'none' }),
          fail: () => wx.showToast({ title: '复制失败，请长按选择', icon: 'none' })
        });
      })
      .catch(() => { /* 用户拒绝授权，静默返回 */ });
  },

  onOpenPolicy(e) {
    const type = (e && e.currentTarget && e.currentTarget.dataset.type) || 'privacy';
    navTo('/account-pkg/pages/policy/policy?type=' + type);
  }
});
