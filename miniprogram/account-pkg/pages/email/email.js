// 邮件联系（account-pkg 分包）
//
// 与 Web 端 src/components/FloatingFeedbackBtn.tsx 的「邮件分享」共用同一个开放接口：
//   POST /api/feedback/email-share
//   { mailbox: 'mailbox1'|'mailbox2', subject?: string, body: string, title?: string, url?: string }
// 服务端（server/routes/feedback.js）：
//   · 无需登录，按 IP 限流 3 封/小时（超出 429）；
//   · subject 空则默认「来自世慧屋的分享」，截断 120；body 必填、截断 2000；
//   · mailbox1/mailbox2 映射 SMTP_USER / SMTP_USER2，地址不下发前端；
//   · title 截断 200，url 必须是 http(s)，两者仅在 url 存在时附在正文末尾。
// 小程序没有网页地址，url 传官网首页（与邮件正文来源行一致），title 传本页名称。
const API = require('../../../config/api');
const request = require('../../../utils/request');
const guide = require('../../../utils/guide');

const MAILBOX_VALUES = ['mailbox1', 'mailbox2'];
const MAILBOX_LABELS = ['邮箱一', '邮箱二'];
const DEFAULT_BODY = '（来自世慧屋小程序）';
const MAX_SUBJECT = 120;
const MAX_BODY = 2000;

Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 88,
    mailboxLabels: MAILBOX_LABELS,
    mailboxIndex: 0,
    subject: '',
    body: DEFAULT_BODY,
    scrollTop: 0,
    bodyLen: DEFAULT_BODY.length,
    bodyOk: true,
    maxSubject: MAX_SUBJECT,
    maxBody: MAX_BODY,
    sending: false,
    sent: false,
    errorMsg: '',
    successMsg: ''
  },

  onLoad() {
    const sysInfo = wx.getWindowInfo();
    const safeAreaTop = sysInfo.statusBarHeight || 44;
    this.setData({ safeAreaTop, navBarHeight: safeAreaTop + 44 });
  },

  onReady() {
    this._tryAutoGuide(400);
  },

  onUnload() {
    if (this._successTimer) {
      clearTimeout(this._successTimer);
      this._successTimer = null;
    }
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
  },

  /** 首次进入（或从「使用指南」点了重看）才拉起 */
  _tryAutoGuide(delay) {
    if (!guide.shouldShow('emailContact') && !guide.hasReplay('emailContact')) return;
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
    const wait = typeof delay === 'number' ? delay : 300;
    const that = this;
    this._guideTimer = setTimeout(function () {
      that._guideTimer = null;
      const layer = that.selectComponent('#guideLayer');
      if (layer) layer.autoStart('emailContact');
    }, wait);
  },

  onMailboxChange(e) {
    const index = Number(e.detail.value) || 0;
    this._sent = false;
    this.setData({ mailboxIndex: index, sent: false, errorMsg: '', successMsg: '' });
  },

  onSubjectInput(e) {
    const value = String(e.detail.value || '').slice(0, MAX_SUBJECT);
    this._sent = false;
    this.setData({ subject: value, sent: false, errorMsg: '' });
  },

  onBodyInput(e) {
    const value = String(e.detail.value || '').slice(0, MAX_BODY);
    this._sent = false;
    this.setData({
      body: value,
      bodyLen: value.length,
      bodyOk: value.trim().length > 0,
      sent: false,
      errorMsg: ''
    });
  },

  /**
   * 引导把某一步目标滚进视口：本页主体是 scroll-view，用 scroll-top 控制。
   * 底部预留 200px 给引导卡片；滚完目标顶部若钻进导航栏再回补一点。
   */
  onGuideScrollTo(e) {
    const selector = (e && e.detail && e.detail.selector) || '';
    if (!selector) return;
    const navH = (this.data.navBarHeight || 88) + 12;
    const reserve = 200;
    let winH = 667;
    try {
      winH = wx.getWindowInfo().windowHeight || 667;
    } catch (err) {}
    const that = this;
    wx.createSelectorQuery()
      .select(selector)
      .boundingClientRect()
      .select('.em-body')
      .scrollOffset()
      .exec(function (res) {
        const rect = res && res[0];
        const sc = res && res[1];
        if (!rect || !sc) return;
        const cur = sc.scrollTop || 0;
        let next = cur;
        if (rect.bottom > winH - reserve) next = cur + (rect.bottom - (winH - reserve));
        const newTop = rect.top - (next - cur);
        if (newTop < navH) next -= (navH - newTop);
        next = Math.max(0, Math.round(next));
        if (Math.abs(next - cur) < 2) return;
        that.setData({ scrollTop: next });
      });
  },

  onSend() {
    // 重复提交拦截：实例锁即时生效（setData 尚未刷新时也能挡住连点），按钮同时置 disabled
    if (this._sending || this._sent || this.data.sending || this.data.sent) return;

    const body = String(this.data.body || '').trim();
    if (!body) {
      this.setData({ errorMsg: '内容不能为空', successMsg: '' });
      return;
    }

    const mailbox = MAILBOX_VALUES[this.data.mailboxIndex] || MAILBOX_VALUES[0];
    this._sending = true;
    this.setData({ sending: true, errorMsg: '', successMsg: '' });

    const self = this;
    request.post(API.FEEDBACK.EMAIL_SHARE, {
      data: {
        mailbox,
        subject: String(this.data.subject || '').trim(),
        body,
        // 小程序无页面 URL：附官网首页，保证服务端仍按 Web 端同一套逻辑追加「标题 + 链接」
        title: '世慧屋 · 邮件联系',
        url: API.BASE
      },
      timeout: 15000,
      toast: false
    }).then((res) => {
      self._sending = false;
      if (res && res.success) {
        self._sent = true;
        self.setData({ sending: false, sent: true, successMsg: res.message || '邮件已发送' });
        wx.showToast({ title: '邮件已发送', icon: 'success' });
        // 与 Web 端一致：成功提示停留 1.5s 后关闭
        self._successTimer = setTimeout(() => {
          self._successTimer = null;
          wx.navigateBack({ delta: 1 });
        }, 1500);
        return;
      }
      self.setData({
        sending: false,
        errorMsg: (res && res.message) || '发送失败，请稍后再试'
      });
    }).catch((err) => {
      self._sending = false;
      self.setData({
        sending: false,
        errorMsg: (err && err.message) || '发送失败，请检查网络后重试'
      });
    });
  }
});
