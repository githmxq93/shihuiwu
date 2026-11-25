const API = require('../../../config/api');
const request = require('../../../utils/request');

// 隐私政策：小程序有账号体系（登录、绑定手机号、收藏、浏览足迹、意见反馈），
// 收集的信息与网站不同，因此使用**小程序专属**文本 privacyPolicyMini，
// 与网站版 privacyPolicy 相互独立（两端展示内容必须不同，不可混用）。
// 免责声明两端共用。
const POLICY_TYPES = [
  { key: 'privacyPolicyMini', title: '隐私政策', slug: 'privacy', fallbackKey: 'privacyPolicy' },
  { key: 'disclaimer', title: '免责声明', slug: 'disclaimer' }
];

Page({
  data: {
    title: '',
    content: '',
    loading: true,
    loadFailed: false,
    safeAreaTop: 44
  },

  onLoad(options) {
    const slug = options.type || 'privacy';
    const policy = POLICY_TYPES.find((p) => p.slug === slug) || POLICY_TYPES[0];
    const sysInfo = wx.getWindowInfo();
    this._key = policy.key;
    this._fallbackKey = policy.fallbackKey || '';
    this.setData({ title: policy.title, safeAreaTop: sysInfo.statusBarHeight || 44 });
    this.fetchContent(policy.key, this._fallbackKey);
  },

  fetchContent(key, fallbackKey) {
    // P0-1：改走统一请求封装。toast:false —— 本页自带失败态 + 重试按钮，不需要额外 toast；
    // 超时与错误分支行为与原 wx.request 完全一致（默认 10s、fail → loadFailed）。
    request.get(API.BASE + '/api/site', { toast: false })
      .then((res) => {
        const d = res || {};
        const pick = (k) => (d.success && d.data && d.data[k]) ? d.data[k] : '';
        let content = pick(key);
        // 兜底：小程序专属政策尚未配置时退回网站版，避免整页空内容
        if (!content && fallbackKey) content = pick(fallbackKey);
        this.setData({ content: content || '暂无内容', loading: false });
      })
      .catch(() => this.setData({ loading: false, loadFailed: true }));
  },

  onRetry() {
    this.setData({ loading: true, loadFailed: false });
    this.fetchContent(this._key, this._fallbackKey);
  }
});
