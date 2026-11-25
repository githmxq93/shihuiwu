const request = require('../../../utils/request');
const API = require('../../../config/api');
const authStore = require('../../../utils/auth-store');

// 统一的鉴权头：注销相关接口全部需要登录态（token 存 Storage 的 userToken）
// P1-4：读改走 auth-store（内存缓存），减少同步 IO。
function authHeader() {
  return {
    'Authorization': 'Bearer ' + (authStore.get('userToken') || ''),
    'Content-Type': 'application/json'
  };
}

/**
 * 把「北京时间文本」往前推 N 天，返回同样格式的文本。
 *
 * 用途：完成页时间轴要显示「注销申请提交」的时刻，而接口只给了 `purgeAtLocal`（彻底注销时刻）。
 * 服务端的算法是 `purgeAtLocal = pendingDeleteAt + 7 天`（见 utils/cancelCooldown.getPendingPurge），
 * 所以这里做同一算术的逆运算，得到的就是申请时刻，**精确**（不需要额外接口字段、也不必改服务端）。
 *
 * @param {string} localStr 形如 "2026-10-06 17:24"
 * @param {number} days 往前推的天数
 * @returns {string} 推后的同格式文本；输入非法时返回空串
 */
function localMinusDays(localStr, days) {
  const m = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/.exec(String(localStr || ''));
  if (!m) return '';
  const d = new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  d.setDate(d.getDate() - days);
  const p = (n) => (n < 10 ? '0' : '') + n;
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
}

Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 64,

    // 页面状态：CANCEL_INFO 拉取中 / 拉取失败
    loading: true,
    loadFailed: false,

    // ---- CANCEL_INFO 返回的「本账号需要校验哪些项」 ----
    hasPassword: false,          // 设过密码 → 需填密码
    securityQuestion: null,      // 后端随机抽的 1 题，null 表示没有密保
    securityQuestionId: '',      // 提交时回传的题目 id
    hasPhone: false,
    phoneMasked: '',
    hasEmail: false,
    emailMasked: '',
    emailServiceReady: false,    // false 时不给「发送验证码」按钮
    cooldownDays: 7,             // 注销后冷却天数（用于成功弹窗文案）
    needFallbackNickname: false, // 四项验证全无 → 改为输入昵称确认（写入 confirmText）

    // ---- 表单字段 ----
    password: '',
    securityAnswer: '',
    phone: '',
    email: '',
    emailCode: '',
    confirmText: '',             // 兜底时用户填的昵称

    // ---- 是否已进入「完成页」（注销申请已提交、正处冷静期）----
    submitted: false,            // true = 展示完成页（表单收起）
    purgeAtLocal: '',            // 彻底注销时刻（= 撤回截止时刻，北京时间文本）
    submittedAtLocal: '',        // 注销申请提交时刻（= 彻底注销时刻 - 冷静期天数，时间轴第一段用）
    pendingDaysLeft: 0,          // 冷静期剩余天数
    revoking: false,             // 撤回请求中

    // ---- 交互状态 ----
    agreed: false,               // 是否勾选「我已阅读并同意」
    countdown: 0,                // 邮箱验证码倒计时（秒）
    sending: false,              // 验证码请求中
    submitting: false            // 注销提交中
  },

  onLoad() {
    // 导航栏占位高度：状态栏 + 44（与 user-center 页保持一致的算法）
    const sysInfo = wx.getWindowInfo();
    const safeAreaTop = sysInfo.statusBarHeight || 44;
    this.setData({ safeAreaTop: safeAreaTop, navBarHeight: safeAreaTop + 44 });

    // 未登录直接拦截（本页所有接口都需要 token，继续停留只会报错）
    const token = authStore.get('userToken') || '';
    if (!token) {
      wx.showModal({
        title: '需要登录',
        content: '请先登录后再操作注销账号',
        showCancel: false,
        success: () => wx.navigateBack()
      });
      this.setData({ loading: false });
      return;
    }

    this._loadInfo();
  },

  onUnload() {
    // 页面销毁时必须清掉倒计时定时器，否则会继续跑并在已销毁的 page 上 setData 报错
    if (this._countdownTimer) {
      clearInterval(this._countdownTimer);
      this._countdownTimer = null;
    }
  },

  // 拉取「本账号注销需验证哪些项」，据此动态渲染表单
  _loadInfo() {
    const self = this;
    this.setData({ loading: true, loadFailed: false });
    request({
      url: API.USER.CANCEL_INFO,
      method: 'GET',
      header: authHeader(),
      timeout: 8000,
      success: (res) => {
        const d = res.data || {};
        if (!d.success || !d.data) {
          self.setData({ loading: false, loadFailed: true });
          wx.showToast({ title: (d && d.message) || '信息加载失败', icon: 'none' });
          return;
        }
        const info = d.data || {};
        const q = info.securityQuestion || null;
        // 已提交过注销申请（仍在冷静期）→ 直接展示「完成页」，
        // 不再让用户重走一遍表单（重复提交会把冷静期重新起算，容易误伤）
        const pend = info.pending || {};
        if (pend.active) {
          const days = pend.daysLeft || 0;
          self.setData({
            loading: false,
            loadFailed: false,
            submitted: true,
            purgeAtLocal: pend.purgeAtLocal || '',
            // 时间轴第一段需要"申请提交时刻"= 彻底注销时刻 - 冷静期天数
            submittedAtLocal: localMinusDays(pend.purgeAtLocal, info.cooldownDays || 7),
            pendingDaysLeft: days,
            cooldownDays: info.cooldownDays || 7,
          });
          return;
        }
        // 四项验证（密码/密保/手机号/邮箱）全无时，只能让用户手输昵称确认
        const needFallbackNickname = !info.hasPassword && !q && !info.hasPhone && !info.hasEmail;
        self.setData({
          loading: false,
          loadFailed: false,
          hasPassword: !!info.hasPassword,
          securityQuestion: q,
          securityQuestionId: q ? (q.id || '') : '',
          hasPhone: !!info.hasPhone,
          phoneMasked: info.phoneMasked || '',
          hasEmail: !!info.hasEmail,
          emailMasked: info.emailMasked || '',
          emailServiceReady: !!info.emailServiceReady,
          cooldownDays: info.cooldownDays || 7,
          needFallbackNickname: needFallbackNickname
        });
      },
      fail: () => {
        self.setData({ loading: false, loadFailed: true });
        wx.showToast({ title: '网络错误，请重试', icon: 'none' });
      }
    });
  },

  onRetryLoad() {
    this._loadInfo();
  },

  // ---------------- 表单输入 ----------------
  onInputPassword(e) { this.setData({ password: e.detail.value }); },
  onInputSecurityAnswer(e) { this.setData({ securityAnswer: e.detail.value }); },
  onInputPhone(e) { this.setData({ phone: e.detail.value }); },
  onInputEmail(e) { this.setData({ email: e.detail.value }); },
  onInputEmailCode(e) { this.setData({ emailCode: e.detail.value }); },
  onInputConfirmText(e) { this.setData({ confirmText: e.detail.value }); },

  // ---------------- 发送邮箱验证码 ----------------
  onSendCode() {
    if (this.data.countdown > 0 || this.data.sending) return;
    if (!this.data.hasEmail || !this.data.emailServiceReady) return;

    const self = this;
    this.setData({ sending: true });
    request({
      url: API.USER.CANCEL_SEND_CODE,
      method: 'POST',
      header: authHeader(),
      data: {},
      timeout: 15000,
      success: (res) => {
        const d = res.data || {};
        if (d.success) {
          wx.showToast({ title: d.message || '验证码已发送', icon: 'none' });
          self._startCountdown();
        } else {
          wx.showToast({ title: (d && d.message) || '发送失败，请重试', icon: 'none' });
        }
      },
      fail: () => wx.showToast({ title: '网络错误，请重试', icon: 'none' }),
      complete: () => self.setData({ sending: false })
    });
  },

  // 60 秒倒计时：期间按钮禁用，文案变为「已发送(ns)」
  _startCountdown() {
    const self = this;
    this.setData({ countdown: 60 });
    if (this._countdownTimer) clearInterval(this._countdownTimer);
    this._countdownTimer = setInterval(() => {
      const next = self.data.countdown - 1;
      if (next <= 0) {
        clearInterval(self._countdownTimer);
        self._countdownTimer = null;
        self.setData({ countdown: 0 });
      } else {
        self.setData({ countdown: next });
      }
    }, 1000);
  },

  // ---------------- 勾选确认 ----------------
  onToggleAgree() {
    this.setData({ agreed: !this.data.agreed });
  },

  // ---------------- 提交注销 ----------------
  onSubmit() {
    if (this.data.submitting) return;

    if (!this.data.agreed) {
      wx.showToast({ title: '请先阅读并勾选确认', icon: 'none' });
      return;
    }

    // 逐项校验：只校验后端返回的「本账号确实设置了」的那些项
    const d = this.data;
    if (d.hasPassword && !d.password) {
      wx.showToast({ title: '请输入登录密码', icon: 'none' });
      return;
    }
    if (d.securityQuestion && !d.securityAnswer) {
      wx.showToast({ title: '请输入密保答案', icon: 'none' });
      return;
    }
    if (d.hasPhone && !d.phone) {
      wx.showToast({ title: '请输入账号绑定的手机号', icon: 'none' });
      return;
    }
    if (d.hasEmail && !d.email) {
      wx.showToast({ title: '请输入账号绑定的邮箱', icon: 'none' });
      return;
    }
    if (d.hasEmail && d.emailServiceReady && !d.emailCode) {
      wx.showToast({ title: '请输入邮箱验证码', icon: 'none' });
      return;
    }
    if (d.needFallbackNickname && !d.confirmText) {
      wx.showToast({ title: '请输入账号昵称以确认', icon: 'none' });
      return;
    }

    // 只传本账号真实设置过的项，未设置的留空字符串
    const payload = {
      password: d.hasPassword ? d.password : '',
      phone: d.hasPhone ? d.phone : '',
      email: d.hasEmail ? d.email : '',
      emailCode: (d.hasEmail && d.emailServiceReady) ? d.emailCode : '',
      securityQuestionId: d.securityQuestion ? d.securityQuestionId : '',
      securityAnswer: d.securityQuestion ? d.securityAnswer : '',
      confirmText: d.confirmText
    };

    const self = this;
    this.setData({ submitting: true });
    request({
      url: API.USER.CANCEL_ACCOUNT,
      method: 'POST',
      header: authHeader(),
      data: payload,
      timeout: 15000,
      success: (res) => {
        const r = res.data || {};
        if (r.success) {
          self._onCancelSuccess(r.data || {});
        } else {
          // 失败文案后端已是中文可读，直接 toast
          wx.showToast({ title: (r && r.message) || '注销失败，请重试', icon: 'none' });
        }
      },
      fail: () => wx.showToast({ title: '网络错误，请重试', icon: 'none' }),
      complete: () => self.setData({ submitting: false })
    });
  },

  /**
   * 注销申请提交成功 → 切到「完成页」。
   *
   * [注意] 关键语义（本页最容易误导用户的地方）：**这只是申请已提交，账号并没有被注销**。
   *    数据原样保留，要等冷静期满（7 天）才由服务端真正清空。因此：
   *    ① 不弹「账号已注销」——那会让人以为已经注销完了；
   *    ② **不清本地登录态** —— 用户还要靠当前会话（或重新登录）进来撤回。
   */
  _onCancelSuccess(data) {
    this.setData({
      submitted: true,
      purgeAtLocal: data.purgeAtLocal || '',
      pendingDaysLeft: data.daysLeft || this.data.cooldownDays || 7,
      cooldownDays: data.cooldownDays || this.data.cooldownDays || 7,
    }, function () {
      // [重要] 必须在 setData 回调里滚：setData 是异步的，紧接着调用时高度还没更新，
      //    页面上没有可滚动的区间 ⇒ pageScrollTo 等不到滚动结束，
      //    开发者工具报 `SystemError (appServiceSDKScriptError) timeout`。
      //    fail 兜底：内容不足一屏时本来就在顶部，失败即达成目的。
      wx.pageScrollTo({ scrollTop: 0, duration: 200, fail: function () {} });
    });
  },

  /**
   * 注销提交成功 → 进入完成页。
   *
   * 语义：只是**申请已提交**、账号进入 7 天冷静期 —— 数据原样保留，要等冷静期满才由服务端真正清空。
   * 所以这里**不弹「账号已注销」**（那会让人以为已经注销完了）。
   * 本地登录态也不在这里清 —— 由用户点「我知道了」时清（见 onBackToProfile）。
   */
  _onCancelSuccess(data) {
    const days = data.daysLeft || this.data.cooldownDays || 7;
    const purge = data.purgeAtLocal || '';
    this.setData({
      submitted: true,
      purgeAtLocal: purge,
      submittedAtLocal: localMinusDays(purge, this.data.cooldownDays || 7),
      pendingDaysLeft: days,
      cooldownDays: data.cooldownDays || this.data.cooldownDays || 7,
    }, function () {
      // 同 _onSubmitSuccess：滚动必须等 setData 落地，且失败静默（内容不足一屏时已在顶部）
      wx.pageScrollTo({ scrollTop: 0, duration: 200, fail: function () {} });
    });
  },

  /**
   * 完成页「我知道了」→ **清本地登录态并退出**，回到「我的」的未登录态。
   *
   * [注意] 2026-09-29 行为调整：用户预期"注销流程走完就该退出登录"，继续挂在登录态会让人以为没生效。
   * 语义说明（为什么退出登录不会让用户失去撤回能力）：
   *   - 注销申请只是进入 **7 天冷静期**，账号与数据在服务端原样保留、token 也未被吊销；
   *   - 撤回仍有两条路：① 冷静期内**重新登录**时会立刻弹窗给撤回入口；
   *     ② 冷静期内登录后「我的」页顶部有冷静期横幅 + 撤回按钮。
   */
  onBackToProfile() {
    this._clearLocalLogin();
    wx.showToast({ title: '已退出登录', icon: 'none' });
    wx.reLaunch({ url: '/pages/profile/profile' });
  },

  /** 与「我的」页 onLogout **同口径**清理本地登录态，避免两处退出行为不一致 */
  _clearLocalLogin() {
    authStore.clear();
    try { wx.removeStorageSync('wxLocalOpenid'); } catch (e) { /* ignore */ }
    const app = getApp();
    if (app && app.globalData) app.globalData._userCache = null;
  },

  /** 冷静期内撤回注销申请 */
  onRevoke() {
    if (this.data.revoking) return;
    const self = this;
    wx.showModal({
      title: '撤回注销申请',
      content: '撤回后账号与全部数据保持原样，本次注销申请作废。确定撤回吗？',
      confirmText: '确认撤回',
      cancelText: '再想想',
      success: (r) => {
        if (!r.confirm) return;
        self.setData({ revoking: true });
        wx.showLoading({ title: '处理中...', mask: true });
        request({
          url: API.USER.CANCEL_REVOKE,
          method: 'POST',
          header: authHeader(),
          data: {},
          timeout: 15000,
          success: (res) => {
            const d = res.data || {};
            wx.hideLoading();
            if (!d.success) {
              wx.showToast({ title: d.message || '撤回失败，请重试', icon: 'none' });
              return;
            }
            wx.showToast({ title: '已撤回注销申请', icon: 'success' });
            // 回到「我的」：账号已恢复正常，冷静期横幅会自动消失
            setTimeout(() => wx.reLaunch({ url: '/pages/profile/profile' }), 1200);
          },
          fail: () => {
            wx.hideLoading();
            wx.showToast({ title: '网络错误，请重试', icon: 'none' });
          },
          complete: () => self.setData({ revoking: false })
        });
      }
    });
  },

  onCancel() {
    wx.navigateBack({ delta: 1 });
  }
});
