const { hashTo8Chars, getRandomNickname, syncToStorage, setToken } = require('../../utils/user-utils');
const { navTo } = require('../../utils/nav');
const { ensurePrivacyAuthorized } = require('../../utils/privacy');
const API = require('../../config/api');
const authStore = require('../../utils/auth-store');
const app = getApp();

/* ===== 注册流程常量 =====
 * 已抽到 utils/register-config.js（与 Web 端 AuthModal 对齐的步骤标题 / 密保题库 / 密码规则），
 * 抽出的目的：减小本页体积、并让其它入口（如找回密码）复用同一套题库与规则，避免口径分裂。 */
const { REG_STEP_LABELS, REG_QUESTION_POOL, REG_PWD_RULES } = require('../../utils/register-config');
const request = require('../../utils/request');
const guide = require('../../utils/guide');
const topicPrefs = require('../../utils/topic-prefs');
const { getGuide, getEnabledKeys } = require('../../config/guide-steps');

/* 访客欢迎屏的会话级短路：用户主动退出登录流程后，本次小程序会话内不再自动弹；
   冷启动后模块重新加载，标记复位，允许再自动弹一次。 */
let guestFlowDismissed = false;

/** 引导清单里的日期：只显示月-日，足够判断“什么时候看过” */
function formatGuideDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return (m < 10 ? '0' + m : m) + '-' + (day < 10 ? '0' + day : day);
}

/**
 * 头像兜底用的「名字首字」（无头像图时显示在圆形头像里）。
 * 口径与全站其它页面一致（user-center 的 initial、footprint 的 avatar、index 的 _char 都用 charAt(0)）。
 * @param {string} name 昵称 / 展示名
 * @returns {string} 首字；名字为空时给「我」，避免出现空圆
 */
function firstChar(name) {
  const s = String(name === null || name === undefined ? '' : name).trim();
  return s ? s.charAt(0) : '我';
}

Page({
  data: {
    safeAreaTop: 44,
    // 顶部占位高度（状态栏 + 44），onLoad/onShow 会按真实机型重算；
    // 先给默认值，避免首帧渲染出 `style="height: px"` 的无效高度
    navBarHeight: 88,
    userInfo: null,
    isLoggedIn: false,
    // 「设置」行右侧的当前偏好摘要（本机存储，onShow 刷新）
    topicPrefText: '封面墙 · 默认收起',
    avatarError: false, // 头像图加载失败 → 回落默认「我」
    displayName: '',
    qlId: '',
    isAdmin: false,
    hasPhone: false,
    // showPhoneForm 已随 onShowPhoneLogin / onHidePhoneLogin 一并删除（2026-10-01）：
    // 旧的「独立手机号登录面板」已被 loginStage('welcome'|'form') 取代，WXML 里没有任何消费者。
    phoneInput: '',
    passwordInput: '',
    showBindForm: false,
    bindPhoneInput: '',
    /* ===== 登录界面 =====
       默认 false；未登录进入本页时由 onShow 置 true，先展示欢迎屏（与改版前一致）。
       点欢迎屏左上角返回可回到新版访客态档案区，再从「登录 / 注册 ›」展开登录流程。
       版本号 / 备案号 / 版权已全部迁到独立页 account-pkg/pages/about，本页不再持有。 */
    showLoginFlow: false,
    /* ===== 登录界面（访客态点登录后展开）===== */
    loginStage: 'welcome', // welcome=欢迎屏 / form=手机号密码登录屏
    agreed: false,         // 协议勾选
    pwdVisible: false,     // 密码显隐
    phoneOk: false,        // 手机号格式是否合法（控制登录按钮可用态）
    pwdOk: false,          // 密码长度是否达标
    phoneFocus: false,     // 输入框聚焦高亮
    pwdFocus: false,
    loginLoading: false,
    /* 个人中心入口 / 未读消息 */
    unreadCount: 0,
    /* 修改密码（两种验证方式） */
    showChangePwd: false,
    pwdMode: 'old',        // 'old' = 验证旧密码；'questions' = 密保问题验证（忘记密码时用）
    oldPwd: '',
    newPwd: '',
    newPwd2: '',
    pwdChanging: false,
    sqList: [],            // 本账号的密保问题 [{ id, question }]
    sqAnswers: [],         // 与 sqList 一一对应的答案
    sqTip: '',             // 密保方式的提示（未设置密保 / 加载失败）
    sqLoading: false,
    /* ===== 注册屏（分 5 步向导：基本信息 → 密保设置 → 手机号验证 → 设置密码 → 确认注册）===== */
    regStep: 1,
    regStepTitle: '基本信息',
    regStepLabels: REG_STEP_LABELS,
    regQuestionPool: REG_QUESTION_POOL,     // 密保问题下拉的候选集
    regPwdRuleLabels: REG_PWD_RULES.map(r => r.label),
    regPwdRules: [false, false, false, false], // 4 条密码规则是否逐条满足
    regCanNext: false,                      // 当前步骤是否可进入下一步（含末步「注册」）
    regPhone: '',
    regNickname: '',
    regGender: '',                          // '男' | '女'
    // 3 组密保问答；key 固定用于 wx:for，questionId 0 表示未选择
    regQA: [
      { key: 0, questionId: 0, question: '', answer: '' },
      { key: 1, questionId: 0, question: '', answer: '' },
      { key: 2, questionId: 0, question: '', answer: '' },
    ],
    regPhoneChecked: false,                 // 手机号是否已通过「可用」校验
    regPhoneChecking: false,
    regPhoneMsg: '',
    regPassword: '',
    regPassword2: '',
    regPwdVisible: false,
    regPhoneOk: false,
    regPhoneFocus: false,
    regNickFocus: false,
    regPwdFocus: false,
    regPwd2Focus: false,
    regLoading: false,
    // 备案合规：前台注册开关（由后台「基本信息 → 功能开关」控制，'0' = 关闭）
    showRegister: true,
    // 无头像图时圆形头像里显示的名字首字（取自昵称/展示名，见 firstChar()）
    avatarChar: '我',
    // 注销冷静期（非 null 表示已提交注销申请、账号尚未彻底注销）：{ purgeAtLocal, daysLeft }
    pendingDelete: null,
    pendingRevoking: false,
    // 「使用指南」抽屉
    guideOpen: false,
    guideList: [],
  },

  onLoad() {
    const sysInfo = wx.getWindowInfo();
    const safeAreaTop = sysInfo.statusBarHeight || 44;
    this.setData({ safeAreaTop, navBarHeight: safeAreaTop + 44 });
    // 版本号 / 备案号已迁到「关于世慧屋」独立页（account-pkg/pages/about），
    // 本页不再请求 /api/site，也不再持有 appVersion。
  },

  onUnload() {
    this._restoreTimer = null;
    this._restoreGuideTabBar();
  },

  onShow() {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 });
    }
    const sysInfo = wx.getWindowInfo();
    const safeAreaTop = sysInfo.statusBarHeight || 44;
    this.setData({ safeAreaTop, navBarHeight: safeAreaTop + 44 });
    // 设置页改完返回时刷新「设置」行的偏好摘要
    this._refreshTopicPrefText();
    this._restoreUser();
    /* 未登录先进入欢迎页（恢复改版前的入口行为）：
       改版前本页未登录分支是 `<block wx:if="{{!isLoggedIn}}">`，直接渲染欢迎屏；
       改版后改成 `showLoginFlow`（默认 false），未登录会先看到访客态档案区，
       原欢迎页因此被跳过。这里在每次页面显示时补回：
         - 仍处于登录/注册流程中（showLoginFlow 已为 true）不打断，避免输入被重置；
         - 用户主动点左上角返回（onExitLoginFlow）后本次会话不再自动弹（guestFlowDismissed），
           仍可停留在新版访客态档案区；冷启动后标记复位，允许再弹一次。 */
    if (!this.data.isLoggedIn && !this.data.showLoginFlow && !guestFlowDismissed) {
      this.setData({ showLoginFlow: true, loginStage: 'welcome' });
    }
    // 未读消息红点（从个人中心返回时也会刷新）
    this._loadUnread();
    // 以服务端为准刷新绑定状态/管理员身份/昵称 + 注销冷静期状态
    //（本地缓存可能过期或被别的页面写脏，进页面就自愈一次）
    this._loadServerProfile();
    // 注册开关（缓存 10 分钟，失败时保持默认开放，不影响其他功能）
    if (!this.data.isLoggedIn) this._loadRegisterFlag();
  },

  noopGuide() {},

  /** 打开「使用指南」：列出已接入的引导与完成状态 */
  onOpenGuide() {
    const records = guide.list(getEnabledKeys());
    const list = records.map((item) => {
      const config = getGuide(item.key) || {};
      let stateText = '未看过';
      if (item.done) stateText = '已完成 · ' + formatGuideDate(item.at);
      return {
        key: item.key,
        name: config.name || item.key,
        done: item.done,
        stateText: stateText
      };
    });
    // 自定义 tabBar 在框架层，页面内的抽屉压不过它，打开时先收起
    this._hideGuideTabBar();
    this.setData({ guideOpen: true, guideList: list });
  },

  onCloseGuide() {
    this.setData({ guideOpen: false });
    this._restoreGuideTabBar();
  },

  /** 重看：留一次性标记后跳到目标页，由目标页的 autoStart 消费 */
  onReplayGuide(e) {
    const key = e.currentTarget.dataset.key;
    const config = getGuide(key);
    if (!config) return;
    guide.requestReplay(key);
    this.setData({ guideOpen: false });
    this._restoreGuideTabBar();
    if (key === 'global' || config.page === 'pages/index/index') {
      wx.switchTab({ url: '/pages/index/index' });
      return;
    }
    if (config.page) navTo('/' + config.page);
  },

  _hideGuideTabBar() {
    if (this._guideTabBar) return;
    try {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        const tabBar = this.getTabBar();
        this._guideTabBar = tabBar;
        // 记住原状态：文章浮层等场景 tabBar 本来就 hidden，关抽屉时按原值恢复
        this._guideTabBarPrevHidden = !!(tabBar.data && tabBar.data.hidden);
        tabBar.setData({ hidden: true });
      }
    } catch (err) {}
  },

  _restoreGuideTabBar() {
    const tabBar = this._guideTabBar;
    const prevHidden = this._guideTabBarPrevHidden;
    this._guideTabBar = null;
    this._guideTabBarPrevHidden = false;
    if (tabBar) {
      try { tabBar.setData({ hidden: !!prevHidden }); } catch (err) {}
    }
  },

  /**
   * 应用注册开关。已登录用户不调用（showRegister 的消费方全在未登录 block）。
   *
   * 白屏防护：注册屏的渲染条件是 `loginStage === 'register' && showRegister`，
   * 若用户停在注册屏离开超过 10 分钟（缓存过期），期间管理员关了开关，
   * onShow 刷新后 showRegister=false —— 此时欢迎屏（'welcome'）和登录屏（'form'）
   * 也都不渲染，未登录 block 三屏全无 = 纯白页，且切 tab 不会重建页面，
   * 白屏会持续到杀进程。因此关开关时必须把停在注册屏的用户弹回欢迎屏。
   */
  _applyRegisterFlag(enabled) {
    this.setData({ showRegister: enabled });
    if (!enabled && this.data.loginStage === 'register') {
      this.setData({ loginStage: 'welcome' });
    }
  },

  _loadRegisterFlag() {
    // 缓存键改名（2026-09-28）：注册开关已按端拆分为 enableRegistration(Web) /
    // enableRegistrationMini(小程序)，沿用旧键会把 Web 的值当成小程序的值读到。
    const KEY = 'enableRegistrationMiniCache';
    try {
      const cached = wx.getStorageSync(KEY);
      if (cached && Date.now() - cached.t < 600000) {
        this._applyRegisterFlag(cached.v !== '0');
        return;
      }
    } catch (e) { /* ignore */ }
    request({
      timeout: 10000,
      url: API.BASE + '/api/site',
      method: 'GET',
      success: (res) => {
        // 小程序专属开关：与 Web 端互不影响（账号数据仍共用同一个用户库）
        const v = res && res.data && res.data.data ? res.data.data.enableRegistrationMini : undefined;
        const enabled = String(v === undefined || v === null || v === '' ? '1' : v) !== '0';
        this._applyRegisterFlag(enabled);
        try { wx.setStorageSync(KEY, { v: enabled ? '1' : '0', t: Date.now() }); } catch (e) { /* ignore */ }
      },
      fail: () => { /* 网络异常时保持当前状态 */ },
    });
  },

  _restoreUser() {
    if (!app.globalData._userCache) {
      // 一次取全登录态快照（内存缓存 + 落盘透写），避免连续多次同步读存储
      const snap = authStore.snapshot();
      app.globalData._userCache = {
        userInfo: snap.userInfo,
        isAdmin: snap.isAdmin,
        hasPhone: snap.hasPhone
      };
    }
    const cache = app.globalData._userCache;
    const saved = cache.userInfo;
    if (saved) {
      const qlId = app.globalData.qlUserId || saved.qlId || '';
      if (qlId) {
        app.globalData.qlUserId = qlId;
      }
      const savedName = saved.displayName || saved.nickName;
      this.setData({
        userInfo: saved,
        isLoggedIn: true,
        displayName: savedName,
        avatarChar: firstChar(savedName),
        qlId,
        isAdmin: !!cache.isAdmin,
        hasPhone: !!cache.hasPhone
      });
    } else {
      // 本地无登录信息 → **显式**复位为未登录态。
      // 目前退出后走 reLaunch 会重建页面（data 本就是初始值），这里主要防住
      // "非重建路径"（如别的入口 navigateBack / 别处清了 storage 但没刷新页面）
      // 下残留 isLoggedIn:true —— 那会表现为"已退出却仍是登录状态"（2026-09-29 用户反馈过）。
      this.setData({
        userInfo: null, isLoggedIn: false, displayName: '', qlId: '',
        isAdmin: false, hasPhone: false, pendingDelete: null, pendingRevoking: false
      });
    }
  },

  // [注意] 微信一键登录（chooseAvatar + 昵称 + wx.login/code2Session）已于 2026-10-15 永久下线：
  //    该能力要求**已认证的非个人主体**，本小程序为个人主体，且小程序主体类型不可变更，
  //    因此不存在「升级后恢复」的可能，相关处理函数与 data 字段一并删除。
  //    仅 `_handleLoginSuccess` 保留 —— 它被**账号注册/登录**流程复用（见 1079/1122 行附近）。
  _handleLoginSuccess(serverData, rawUserInfo) {
    const openid = serverData.openid;
    const qlId = hashTo8Chars(openid);
    const displayName = (rawUserInfo.nickName && rawUserInfo.nickName !== '微信用户')
      ? rawUserInfo.nickName
      : getRandomNickname(qlId);
    const userInfo = { ...rawUserInfo, displayName, qlId };
    const hasPhone = !!serverData.phone;
    syncToStorage(qlId);
    authStore.set('userInfo', userInfo);
    authStore.set('isAdmin', serverData.isAdmin ? 1 : 0);
    authStore.set('hasPhone', hasPhone ? 1 : 0);
    if (serverData.token) {
      authStore.set('userToken', serverData.token);
      setToken(serverData.token);
    }
    wx.hideLoading();
    this.setData({
      userInfo, isLoggedIn: true, displayName, qlId,
      avatarError: false,
      avatarChar: firstChar(displayName),
      isAdmin: !!serverData.isAdmin,
      hasPhone,
      phoneInput: '', passwordInput: '',
      showBindForm: false, bindPhoneInput: '',
      // 复位登录界面状态（登录后收起登录流程，且不残留上次输入）
      showLoginFlow: false,
      loginStage: 'welcome', loginLoading: false, agreed: false,
      pwdVisible: false, phoneOk: false, pwdOk: false, phoneFocus: false, pwdFocus: false,
      regPhone: '', regNickname: '', regPassword: '', regPassword2: '', regPwdVisible: false,
      regPhoneOk: false, regLoading: false
    });
    app.globalData._userCache = {
      userInfo,
      isAdmin: !!serverData.isAdmin,
      hasPhone
    };

    // 注销冷静期：登录后**立刻弹窗**告知（这正是「7 日内登录可撤回」的入口，
    // 只在页面里静默显示横幅用户很可能看不到），并直接给「撤回注销」按钮。
    if (serverData.pendingDeleteAt) {
      const purgeAtLocal = serverData.pendingPurgeAtLocal || '';
      this.setData({
        pendingDelete: { purgeAtLocal, daysLeft: serverData.pendingDaysLeft || 0 },
      });
      wx.showModal({
        title: '账号处于注销冷静期',
        content: '你的账号已提交注销申请，将于 ' + (purgeAtLocal || '7 天后') +
          ' 彻底注销（届时数据清空且无法恢复）。在此之前可以撤回注销申请。',
        confirmText: '撤回注销',
        cancelText: '暂不撤回',
        success: (r) => { if (r.confirm) this.onRevokeCancel(); }
      });
      return;   // 冷静期提示优先于「绑定手机号」引导，避免两个弹窗叠加
    }
    if (!hasPhone) {
      this._promptBindPhone();
    }
  },

  _promptBindPhone() {
    wx.showModal({
      title: '绑定手机号',
      content: '绑定手机号后，可以跨设备同步您的收藏和浏览记录',
      confirmText: '立即绑定',
      cancelText: '稍后再说',
      success: (res) => {
        if (res.confirm) {
          this.setData({ showBindForm: true, bindPhoneInput: '' });
        }
      }
    });
  },

  onPhoneInput(e) {
    const value = String(e.detail.value || '').replace(/\D/g, '').slice(0, 11);
    this.setData({ phoneInput: value, phoneOk: /^1\d{10}$/.test(value) });
  },

  onPasswordInput(e) {
    const value = e.detail.value || '';
    this.setData({ passwordInput: value, pwdOk: value.length >= 6 });
  },

  /* ===== 登录界面交互 ===== */

  // 隐私合规（2026-10-01 微信审核驳回整改）：欢迎屏的「立即登录」必须由用户
  // **主动勾选**《隐私政策》后才可进入，禁止"点击即视为同意"。
  onToLoginForm() {
    if (!this.data.agreed) {
      wx.showToast({ title: '请先阅读并同意隐私政策', icon: 'none' });
      return;
    }
    this.setData({ loginStage: 'form' });
  },

  onBackToWelcome() {
    this.setData({ loginStage: 'welcome', phoneFocus: false, pwdFocus: false });
  },

  onClearPhone() {
    this.setData({ phoneInput: '', phoneOk: false });
  },

  onTogglePwd() {
    this.setData({ pwdVisible: !this.data.pwdVisible });
  },

  onToggleAgree() {
    const agreed = !this.data.agreed;
    // 注册第 5 步的「注册」按钮可用态就是 agreed，必须同步重算 regCanNext：
    // 只 setData({agreed}) 会让勾选框打钩、按钮却仍是禁用态（登录屏不消费 regCanNext，此处一并重算无副作用）
    this._refreshRegCanNext({ agreed });
  },

  onPhoneFocus() { this.setData({ phoneFocus: true }); },
  onPhoneBlur() { this.setData({ phoneFocus: false }); },
  onPwdFocus() { this.setData({ pwdFocus: true }); },
  onPwdBlur() { this.setData({ pwdFocus: false }); },

  // 忘记密码：短信通道尚未接入，给出明确指引而不是假装成功
  onForgotPassword() {
    wx.showModal({
      title: '找回密码',
      content: '短信找回通道尚未开通。请通过「意见反馈」留下您的手机号，我们会尽快协助重置密码。',
      confirmText: '去反馈',
      cancelText: '知道了',
      success: (res) => {
        if (res.confirm) this.onFeedback();
      }
    });
  },

  // 管理后台入口（仅 isAdmin 账号可见；后台页会自行判断是否已通过管理员密码校验）
  onGoAdmin() {
    navTo('/admin-pkg/pages/login/login');
  },

  /* ===== 访客态（未登录）=====
     未登录不再直接进登录欢迎屏，而是先展示「我的」访客态：
     昵称位「未登录」，ID 行位置换成「登录 / 注册 ›」，内容区降权。
     点内容区任意入口都先引导登录，避免「点了没反应」。 */
  onGuestLogin() {
    this.setData({
      showLoginFlow: true,
      loginStage: 'welcome',
      agreed: false,
      phoneInput: '',
      passwordInput: '',
      phoneOk: false,
      pwdOk: false,
      loginLoading: false
    });
  },

  onExitLoginFlow() {
    // 用户主动退出：本次会话不再自动弹欢迎屏
    guestFlowDismissed = true;
    this.setData({
      showLoginFlow: false,
      loginStage: 'welcome',
      phoneFocus: false,
      pwdFocus: false,
      loginLoading: false
    });
  },

  /** 访客点需登录的入口时返回 true（并展开登录流程） */
  _requireLogin() {
    if (this.data.isLoggedIn) return false;
    this.onGuestLogin();
    return true;
  },

  /* ===== 个人中心（消息 / 收藏 / 历史 / 设备）===== */

  onGoUserCenter(e) {
    if (this._requireLogin()) return;
    const tab = (e && e.currentTarget && e.currentTarget.dataset.tab) || 'messages';
    navTo('/account-pkg/pages/user-center/user-center?tab=' + tab);
  },

  // 未读消息数（登录后才有）
  _loadUnread() {
    if (!this.data.isLoggedIn) return;
    const token = authStore.get('userToken') || '';
    if (!token) return;
    const self = this;
    request({
      url: API.USER.MESSAGES_UNREAD,
      method: 'GET',
      header: { 'Authorization': 'Bearer ' + token },
      timeout: 8000,
      success: (res) => {
        const d = res.data || {};
        if (d.success && d.data) self.setData({ unreadCount: d.data.count || 0 });
      },
      fail: () => { /* 非关键，静默 */ }
    });
  },

  /**
   * 进入页面时以**服务端为准**刷新「本地缓存不可信」的那几个字段，并同步注销冷静期状态。
   *
   * 为什么必须做（2026-09-29 用户反馈「管理员账号明明绑了手机号却显示未绑定」）：
   *   hasPhone / isAdmin / 昵称此前**只来自「登录响应 + 本地 storage」**，页面从不向服务端核对，
   *   而 storage 会过期、也可能被别的页面写脏（feedback 页的登录曾把 hasPhone 写死 false）。
   *   本地缓存一旦漂移，就会**长期显示错误状态**，用户只能靠「退出重登」自救 —— 体验上像 bug。
   *   这里每次进页面（onShow）都拉一次 GET /api/user，把绑定状态/管理员身份/昵称与冷静期一起纠正。
   */
  _loadServerProfile() {
    if (!this.data.isLoggedIn) {
      if (this.data.pendingDelete) this.setData({ pendingDelete: null });
      return;
    }
    const token = authStore.get('userToken') || '';
    if (!token) return;
    // 节流：连续切 tab / 从个人子页返回时 30 秒内不重复拉取。
    // 自愈目的（纠正本地缓存漂移）在首次进入时已达成；真正的状态变更
    // （绑定手机 / 改昵称 / 注销申请）都有本地即时更新路径，不依赖这个轮询。
    const now = Date.now();
    if (this._lastProfileSync && now - this._lastProfileSync < 30000) return;
    this._lastProfileSync = now;
    const self = this;
    request({
      url: API.USER.PROFILE,
      method: 'GET',
      header: { 'Authorization': 'Bearer ' + token },
      timeout: 8000,
      success: (res) => {
        const d = res.data || {};
        if (!d.success || !d.data) return;
        const u = d.data;
        const hasPhone = !!u.phone;
        const isAdmin = !!(u.isAdmin || u.role === 'admin' || u.role === 'superadmin');
        const name = u.nickName || u.displayName || self.data.displayName;
        // 同步修正本地缓存与 storage，避免下次冷启动又读到旧值
        authStore.set('hasPhone', hasPhone ? 1 : 0);
        authStore.set('isAdmin', isAdmin ? 1 : 0);
        if (app.globalData._userCache) {
          app.globalData._userCache.hasPhone = hasPhone;
          app.globalData._userCache.isAdmin = isAdmin;
        }
        self.setData({
          hasPhone,
          isAdmin,
          displayName: name,
          avatarChar: firstChar(name),
          // 冷静期（非空表示已提交注销申请、账号尚未彻底注销）
          pendingDelete: u.pendingDeleteAt
            ? { purgeAtLocal: u.pendingPurgeAtLocal || '', daysLeft: u.pendingDaysLeft || 0 }
            : null,
        });
      },
      fail: () => { /* 非关键，静默：失败时保留本地状态 */ }
    });
  },

  /** 撤回注销申请（冷静期内可用） */
  onRevokeCancel() {
    if (this.data.pendingRevoking) return;
    const self = this;
    wx.showModal({
      title: '撤回注销申请',
      content: '撤回后账号与全部数据保持原样，本次注销申请作废。确定撤回吗？',
      confirmText: '确认撤回',
      cancelText: '再想想',
      success: (r) => {
        if (!r.confirm) return;
        const token = authStore.get('userToken') || '';
        if (!token) { wx.showToast({ title: '请先登录', icon: 'none' }); return; }
        self.setData({ pendingRevoking: true });
        wx.showLoading({ title: '处理中...', mask: true });
        request({
          url: API.USER.CANCEL_REVOKE,
          method: 'POST',
          header: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
          data: {},
          timeout: 15000,
          success: (res) => {
            const d = res.data || {};
            wx.hideLoading();
            if (!d.success) {
              wx.showToast({ title: d.message || '撤回失败，请重试', icon: 'none' });
              return;
            }
            self.setData({ pendingDelete: null });
            wx.showToast({ title: '已撤回注销申请', icon: 'success' });
          },
          fail: () => {
            wx.hideLoading();
            wx.showToast({ title: '网络错误，请重试', icon: 'none' });
          },
          complete: () => self.setData({ pendingRevoking: false })
        });
      }
    });
  },

  /* ===== 修改密码（两种验证方式：旧密码 / 密保问题） ===== */

  onShowChangePwd() {
    if (this._requireLogin()) return;
    this.setData({
      showChangePwd: true,
      pwdMode: 'old',                       // 默认「验证旧密码」，点「忘记密码？」切到密保
      oldPwd: '', newPwd: '', newPwd2: '',
      sqList: [], sqAnswers: [], sqTip: '', sqLoading: false,
    });
  },

  onHideChangePwd() {
    this.setData({ showChangePwd: false });
  },

  onOldPwdInput(e) { this.setData({ oldPwd: e.detail.value }); },
  onNewPwdInput(e) { this.setData({ newPwd: e.detail.value }); },
  onNewPwd2Input(e) { this.setData({ newPwd2: e.detail.value }); },

  /**
   * 切换验证方式：'old' = 旧密码，'questions' = 密保问题（忘记密码时用）
   * 首次切到密保才去拉问题列表（用户可能压根没设置过密保 → 要给出明确提示，别让他白填）
   */
  onSwitchPwdMode(e) {
    const mode = (e && e.currentTarget && e.currentTarget.dataset.mode) || 'old';
    this.setData({ pwdMode: mode });
    if (mode === 'questions' && !this.data.sqList.length && !this.data.sqLoading) {
      this._loadSecurityQuestions();
    }
  },

  /** 拉取本账号的密保问题（服务端要求答对全部 ≥3 题，不足 3 题则无法走此方式） */
  _loadSecurityQuestions() {
    const token = authStore.get('userToken') || '';
    if (!token) { wx.showToast({ title: '请先登录', icon: 'none' }); return; }
    this.setData({ sqLoading: true, sqTip: '' });
    const self = this;
    request({
      url: API.USER.SECURITY_QUESTIONS,
      method: 'GET',
      timeout: 10000,
      header: { 'Authorization': 'Bearer ' + token },
      success: (res) => {
        const d = res.data || {};
        const list = (d.success && Array.isArray(d.data)) ? d.data : [];
        self.setData({
          sqLoading: false,
          sqList: list,
          sqAnswers: list.map(() => ''),
          sqTip: list.length >= 3
            ? ''
            : '该账号未设置密保问题（或不足 3 个），无法用此方式修改密码；可先用旧密码修改，或通过「意见反馈」联系管理员。',
        });
      },
      fail: () => self.setData({ sqLoading: false, sqTip: '密保问题加载失败，请点「改用旧密码验证」后重试' })
    });
  },

  onSqAnswerInput(e) {
    const idx = Number(e.currentTarget.dataset.index);
    const answers = this.data.sqAnswers.slice();
    answers[idx] = e.detail.value;
    this.setData({ sqAnswers: answers });
  },

  onSubmitChangePwd() {
    // [重要] 重入守卫：改密是 PUT 写操作，且服务端改完会轮换 token。
    //    本页按钮虽然会把文案切成「提交中…」，但**未置 disabled**，
    //    连点两次会发两条改密请求 —— 第二条拿的旧密码此时已失效，
    //    会在成功提示之后再弹一个「修改失败」，误导用户。
    if (this.data.pwdChanging) return;
    const { newPwd, newPwd2, pwdMode } = this.data;
    // 1) 新密码的公共校验（两种方式一致，先校验省一次请求）
    if (newPwd.length < 8) { wx.showToast({ title: '新密码至少 8 位', icon: 'none' }); return; }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPwd)) {
      wx.showToast({ title: '需包含大小写字母和数字', icon: 'none' });
      return;
    }
    if (newPwd !== newPwd2) { wx.showToast({ title: '两次输入的新密码不一致', icon: 'none' }); return; }

    const token = authStore.get('userToken') || '';
    if (!token) { wx.showToast({ title: '请先登录', icon: 'none' }); return; }

    if (pwdMode === 'questions') { this._submitChangePwdByQuestions(token); return; }

    // 2) 旧密码方式
    if (!this.data.oldPwd) { wx.showToast({ title: '请输入当前密码', icon: 'none' }); return; }
    this.setData({ pwdChanging: true });
    const self = this;
    request({
      url: API.USER.CHANGE_PASSWORD,
      method: 'PUT',
      timeout: 10000,
      header: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
      data: { oldPassword: this.data.oldPwd, newPassword: newPwd },
      success: (res) => {
        self.setData({ pwdChanging: false });
        self._afterPwdChanged(res.data || {});
      },
      fail: () => {
        self.setData({ pwdChanging: false });
        wx.showToast({ title: '网络错误，请重试', icon: 'none' });
      }
    });
  },

  /** 密保方式提交：答对全部密保题才能改密码（服务端会再校验一次，前端校验只是体验） */
  _submitChangePwdByQuestions(token) {
    const { sqList, sqAnswers, newPwd } = this.data;
    if (!sqList.length) { wx.showToast({ title: '密保问题未加载完成', icon: 'none' }); return; }
    if (sqAnswers.some((a) => !String(a || '').trim())) {
      wx.showToast({ title: '请回答全部密保问题', icon: 'none' });
      return;
    }
    this.setData({ pwdChanging: true });
    const self = this;
    request({
      url: API.USER.CHANGE_PASSWORD_BY_QUESTIONS,
      method: 'POST',
      timeout: 15000,
      header: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
      data: {
        securityAnswers: sqList.map((q, i) => ({ questionId: q.id, answer: String(sqAnswers[i]).trim() })),
        newPassword: newPwd,
      },
      success: (res) => {
        self.setData({ pwdChanging: false });
        self._afterPwdChanged(res.data || {});
      },
      fail: () => {
        self.setData({ pwdChanging: false });
        wx.showToast({ title: '网络错误，请重试', icon: 'none' });
      }
    });
  },

  /**
   * 改密结果的统一收尾（两种方式共用）。
   * [注意] 服务端改密后会**轮换 token**，旧会话立即失效，所以必须引导重新登录。
   */
  _afterPwdChanged(d) {
    if (!d.success) {
      wx.showToast({ title: d.message || '修改失败', icon: 'none' });
      return;
    }
    this.setData({ showChangePwd: false });
    wx.showModal({
      title: '密码已修改',
      content: '为保障安全，请使用新密码重新登录。',
      showCancel: false,
      confirmText: '去登录',
      success: () => this.onLogout()
    });
  },

  /* ===== 注册屏交互（分 5 步向导，流程与 Web 端 AuthModal 一致）===== */

  /** 进入注册屏：重置整个向导，避免上次半途数据残留 */
  onToRegister() {
    if (!this.data.showRegister) {
      wx.showToast({ title: '本站当前未开放注册', icon: 'none' });
      return;
    }
    // 隐私合规（2026-10-01）：同「立即登录」，未主动勾选《隐私政策》不得进入注册
    if (!this.data.agreed) {
      wx.showToast({ title: '请先阅读并同意隐私政策', icon: 'none' });
      return;
    }
    this.setData({
      loginStage: 'register',
      regStep: 1,
      regStepTitle: REG_STEP_LABELS[0],
      regCanNext: false,
      regPhone: '',
      regPhoneOk: false,
      regPhoneChecked: false,
      regPhoneChecking: false,
      regPhoneMsg: '',
      regNickname: '',
      regGender: '',
      regQA: [
        { key: 0, questionId: 0, question: '', answer: '' },
        { key: 1, questionId: 0, question: '', answer: '' },
        { key: 2, questionId: 0, question: '', answer: '' },
      ],
      regPassword: '',
      regPassword2: '',
      regPwdVisible: false,
      regPwdRules: [false, false, false, false],
      regLoading: false,
      agreed: false,
      regPhoneFocus: false,
      regNickFocus: false,
      regPwdFocus: false,
      regPwd2Focus: false,
    });
  },

  /**
   * 重算「下一步 / 注册」按钮的可用态，各步条件与 Web 端 canGoNext() 逐步一致
   * @param {Object} [patch] 本次一并写入的数据（用于刚变更、this.data 尚未更新的字段）
   */
  _refreshRegCanNext(patch) {
    const d = Object.assign({}, this.data, patch || {});
    const stepOk = {
      1: !!String(d.regNickname || '').trim() && !!d.regGender,
      2: (d.regQA || []).length === 3 &&
         d.regQA.every(qa => qa.questionId > 0 && String(qa.answer || '').trim().length >= 2),
      3: !!d.regPhoneChecked,
      4: (d.regPwdRules || []).every(Boolean) && !!d.regPassword2 && d.regPassword2 === d.regPassword,
      5: !!d.agreed,
    };
    this.setData(Object.assign({ regCanNext: !!stepOk[d.regStep] }, patch || {}));
  },

  /** 切换步骤（同步更新标题与按钮可用态） */
  _setRegStep(step) {
    this._refreshRegCanNext({ regStep: step, regStepTitle: REG_STEP_LABELS[step - 1] });
  },

  onRegNext() {
    const regStep = this.data.regStep;
    if (!this.data.regCanNext) {
      const tips = {
        1: '请填写昵称并选择性别',
        2: '请完成 3 组密保问题（答案至少 2 字）',
        3: '请先验证手机号是否可用',
        4: '密码需满足全部规则，且两次输入一致',
        5: '请先阅读并同意隐私政策',
      };
      wx.showToast({ title: tips[regStep] || '请完善本步信息', icon: 'none' });
      return;
    }
    // 第 1 步（昵称）：先问服务端「这个昵称能不能用」（禁用词 / 是否被占用），
    // 通过才进第 2 步 —— 否则用户要填完 5 步才在提交时被拒，白填一遍。
    if (regStep === 1) { this._checkRegNicknameThenNext(); return; }
    if (regStep === 5) { this.onRegister(); return; }
    this._setRegStep(regStep + 1);
  },

  /**
   * 校验昵称后进入第 2 步。
   * [注意] 这里是**体验优化**，不构成安全边界（网络异常时放行，由提交时的服务端校验兜底）。
   */
  _checkRegNicknameThenNext() {
    const nick = String(this.data.regNickname || '').trim();
    const self = this;
    wx.showLoading({ title: '检查昵称...', mask: true });
    request({
      url: API.AUTH.CHECK_NICKNAME,
      method: 'POST',
      timeout: 10000,
      header: { 'Content-Type': 'application/json' },
      data: { nickName: nick },
      success: (res) => {
        wx.hideLoading();
        const d = res.data || {};
        // 仅在「明确不可用」时拦下；其它异常（接口报错/返回异常）一律放行交给提交兜底
        if (d.success && d.data && d.data.available === false) {
          wx.showToast({ title: d.data.message || '该昵称不可用，请更换', icon: 'none' });
          return;
        }
        self._setRegStep(2);
      },
      fail: () => {
        wx.hideLoading();
        self._setRegStep(2);   // 网络异常放行，避免卡住注册
      }
    });
  },

  onRegPrev() {
    if (this.data.regStep > 1) this._setRegStep(this.data.regStep - 1);
  },

  /** 左上返回：分步模式下逐级回退，回到第 1 步再返回才是退回欢迎屏 */
  onRegBack() {
    if (this.data.regStep > 1) { this._setRegStep(this.data.regStep - 1); return; }
    this.onBackToWelcome();
  },

  /* ---- 第 1 步：基本信息 ---- */

  onRegNicknameInput(e) {
    const value = e.detail.value || '';
    this._refreshRegCanNext({ regNickname: value });
  },

  onSelectRegGender(e) {
    this._refreshRegCanNext({ regGender: e.currentTarget.dataset.gender || '' });
  },

  /* ---- 第 2 步：密保设置 ---- */

  onRegQuestionChange(e) {
    const index = Number(e.currentTarget.dataset.index);
    const picked = REG_QUESTION_POOL[Number(e.detail.value)];
    if (!picked) return;
    const regQA = this.data.regQA.map((qa, i) =>
      i === index ? Object.assign({}, qa, { questionId: picked.id, question: picked.question }) : qa);
    this._refreshRegCanNext({ regQA });
  },

  onRegAnswerInput(e) {
    const index = Number(e.currentTarget.dataset.index);
    const answer = e.detail.value || '';
    const regQA = this.data.regQA.map((qa, i) => i === index ? Object.assign({}, qa, { answer }) : qa);
    this._refreshRegCanNext({ regQA });
  },

  /* ---- 第 3 步：手机号验证（与 Web 端一致：只查是否已注册，不发短信验证码）---- */

  onRegPhoneInput(e) {
    const value = String(e.detail.value || '').replace(/\D/g, '').slice(0, 11);
    // 手机号一改，之前的「可用」结论立即失效，必须重新验证
    this._refreshRegCanNext({
      regPhone: value,
      regPhoneOk: /^1\d{10}$/.test(value),
      regPhoneChecked: false,
      regPhoneMsg: '',
    });
  },

  onClearRegPhone() {
    this._refreshRegCanNext({ regPhone: '', regPhoneOk: false, regPhoneChecked: false, regPhoneMsg: '' });
  },

  onCheckRegPhone() {
    if (this.data.regPhoneChecking) return;
    const regPhone = this.data.regPhone;
    if (!/^1\d{10}$/.test(regPhone)) {
      this._refreshRegCanNext({ regPhoneChecked: false, regPhoneMsg: '请输入正确的手机号' });
      return;
    }
    this.setData({ regPhoneChecking: true, regPhoneMsg: '' });
    const self = this;
    request({
      url: API.AUTH.CHECK_PHONE,
      method: 'POST',
      timeout: 10000,
      header: { 'Content-Type': 'application/json' },
      data: { phone: regPhone },
      success: (res) => {
        const d = res.data || {};
        if (d.success && d.data) {
          const exists = !!d.data.exists;
          // ① 该手机号的账号**正在注销冷静期**（账号还在、尚未彻底注销）：
          //    服务端把 exists 仍算作 true，这里必须优先按「冷静期」提示，不能只说「已注册，请直接登录」——
          //    否则刚提交注销申请的用户会以为注销失败。
          const pd = d.data.pendingDelete;
          if (pd) {
            self._refreshRegCanNext({
              regPhoneChecking: false,
              regPhoneChecked: false,
              regPhoneMsg: pd.hint || ('该手机号正在注销冷静期，' + (pd.purgeAtLocal || '') + ' 后彻底注销'),
            });
            return;
          }
          // ② 已彻底注销、但仍在冷却期内的手机号（服务端返回 exists=false）
          const cd = d.data.cooldown;
          if (cd) {
            self._refreshRegCanNext({
              regPhoneChecking: false,
              regPhoneChecked: false,
              regPhoneMsg: cd.hint || ('该手机号已注销，还需等待 ' + cd.daysLeft + ' 天才能重新注册'),
            });
            return;
          }
          self._refreshRegCanNext({
            regPhoneChecking: false,
            regPhoneChecked: !exists,
            regPhoneMsg: exists ? '该手机号已注册，请直接登录' : '手机号可用',
          });
        } else {
          self._refreshRegCanNext({ regPhoneChecking: false, regPhoneChecked: false, regPhoneMsg: d.message || '验证失败' });
        }
      },
      fail: () => {
        self._refreshRegCanNext({ regPhoneChecking: false, regPhoneChecked: false, regPhoneMsg: '网络错误，请重试' });
      },
    });
  },

  /* ---- 第 4 步：设置密码 ---- */

  onRegPasswordInput(e) {
    const value = e.detail.value || '';
    const rules = REG_PWD_RULES.map(r => r.test(value));
    this._refreshRegCanNext({
      regPassword: value,
      regPwdRules: rules,
    });
  },

  onRegPassword2Input(e) {
    const value = e.detail.value || '';
    this._refreshRegCanNext({ regPassword2: value });
  },

  onToggleRegPwd() {
    this.setData({ regPwdVisible: !this.data.regPwdVisible });
  },

  onRegPhoneFocus() { this.setData({ regPhoneFocus: true }); },
  onRegPhoneBlur() { this.setData({ regPhoneFocus: false }); },
  onRegNickFocus() { this.setData({ regNickFocus: true }); },
  onRegNickBlur() { this.setData({ regNickFocus: false }); },
  onRegPwdFocus() { this.setData({ regPwdFocus: true }); },
  onRegPwdBlur() { this.setData({ regPwdFocus: false }); },
  onRegPwd2Focus() { this.setData({ regPwd2Focus: true }); },
  onRegPwd2Blur() { this.setData({ regPwd2Focus: false }); },

  /** 第 5 步：提交注册（请求体与 Web 端 submitRegister 一致，含 gender 与 securityQuestions） */
  onRegister() {
    // 重入守卫：弱网连点会发多个注册请求，撞服务端手机号唯一约束——
    // 第一个请求刚注册成功，第二个就报「该手机号已注册」，误导用户。
    // 与 onSubmitChangePwd / onCheckRegPhone / onRevokeCancel 同一模式。
    if (this.data.regLoading) return;
    const { regPhone, regNickname, regGender, regQA, regPassword, regPassword2, agreed, regPhoneChecked } = this.data;
    if (!String(regNickname || '').trim()) {
      wx.showToast({ title: '请输入昵称', icon: 'none' });
      return;
    }
    if (!regGender) {
      wx.showToast({ title: '请选择性别', icon: 'none' });
      return;
    }
    if (!(regQA || []).every(qa => qa.questionId > 0 && String(qa.answer || '').trim().length >= 2)) {
      wx.showToast({ title: '请完成 3 组密保问题（答案至少 2 字）', icon: 'none' });
      return;
    }
    if (!/^1\d{10}$/.test(regPhone)) {
      wx.showToast({ title: '手机号格式不正确', icon: 'none' });
      return;
    }
    if (!regPhoneChecked) {
      wx.showToast({ title: '请先验证手机号是否可用', icon: 'none' });
      return;
    }
    if (!REG_PWD_RULES.every(r => r.test(regPassword))) {
      wx.showToast({ title: '密码至少 8 位，且含大小写字母和数字', icon: 'none' });
      return;
    }
    if (regPassword2 !== regPassword) {
      wx.showToast({ title: '两次输入的密码不一致', icon: 'none' });
      return;
    }
    if (!agreed) {
      wx.showToast({ title: '请先阅读并同意隐私政策', icon: 'none' });
      return;
    }

    // 密保以「问题 id + 题干 + 明文答案」提交；服务端只落题干与答案哈希
    // （security_questions 表，与 users 表同库 = 服务器用户库 qingyun_users.db）
    const securityQuestions = regQA.map(qa => ({
      questionId: qa.questionId,
      question: qa.question,
      answer: String(qa.answer).trim(),
    }));

    this.setData({ regLoading: true });
    wx.showLoading({ title: '注册中...', mask: true });
    const self = this;
    request({
      url: API.AUTH.PHONE_REGISTER,
      method: 'POST',
      timeout: 10000,
      header: { 'Content-Type': 'application/json' },
      data: {
        phone: regPhone,
        password: regPassword,
        nickName: regNickname.trim(),
        gender: regGender,
        securityQuestions,
      },
      success: (res) => {
        if (res.data && res.data.success && res.data.data && res.data.data.openid) {
          self._handleLoginSuccess(res.data.data, {
            nickName: res.data.data.nickName || regNickname.trim(),
            avatarUrl: ''
          });
        } else {
          wx.hideLoading();
          self.setData({ regLoading: false });
          wx.showToast({ title: (res.data && res.data.message) || '注册失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.hideLoading();
        self.setData({ regLoading: false });
        wx.showToast({ title: '网络错误，请重试', icon: 'none' });
      }
    });
  },

  onPhoneLogin() {
    // 重入守卫：弱网连点会发多个登录请求，服务端限流时先成功后弹「登录失败」。
    // 与 onSubmitChangePwd / onCheckRegPhone / onRevokeCancel 同一模式。
    if (this.data.loginLoading) return;
    const { phoneInput, passwordInput } = this.data;
    if (!phoneInput.match(/^1\d{10}$/)) {
      wx.showToast({ title: '手机号格式不正确', icon: 'none' });
      return;
    }
    if (!passwordInput || passwordInput.length < 6) {
      wx.showToast({ title: '密码至少 6 位', icon: 'none' });
      return;
    }
    if (!this.data.agreed) {
      wx.showToast({ title: '请先阅读并同意隐私政策', icon: 'none' });
      return;
    }

    this.setData({ loginLoading: true });
    wx.showLoading({ title: '登录中...', mask: true });
    const self = this;
    request({
      url: API.AUTH.PHONE_LOGIN,
      method: 'POST',
      timeout: 10000,
      data: { phone: phoneInput, password: passwordInput },
      success: (res) => {
        if (res.data && res.data.success && res.data.data) {
          self._handleLoginSuccess(res.data.data, {
            nickName: res.data.data.nickName || phoneInput,
            avatarUrl: ''
          });
        } else {
          wx.hideLoading();
          self.setData({ loginLoading: false });
          wx.showToast({ title: (res.data && res.data.message) || '登录失败', icon: 'none' });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        self.setData({ loginLoading: false });
        wx.showToast({ title: '网络错误，请重试', icon: 'none' });
      }
    });
  },

  // 绑定手机号
  onShowBindPhone() {
    if (this._requireLogin()) return;
    this.setData({ showBindForm: true, bindPhoneInput: '' });
  },

  onHideBindPhone() {
    this.setData({ showBindForm: false });
  },

  onBindPhoneInput(e) {
    // 与登录屏 onPhoneInput / 注册屏 onRegPhoneInput 同口径：过滤非数字 + 限长 11 位。
    // 中文键盘输手机号时边输边清理，不用等输完再被校验正则拦。
    const value = String(e.detail.value || '').replace(/\D/g, '').slice(0, 11);
    this.setData({ bindPhoneInput: value });
  },

  onBindPhone() {
    const token = authStore.get('userToken');
    if (!token) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }

    const { bindPhoneInput } = this.data;
    if (!bindPhoneInput.match(/^1\d{10}$/)) {
      wx.showToast({ title: '手机号格式不正确', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '绑定中...', mask: true });
    const self = this;
    request({
      url: API.AUTH.BIND_PHONE,
      method: 'POST',
      timeout: 10000,
      header: { 'Authorization': 'Bearer ' + token },
      data: { phone: bindPhoneInput },
      success: (res) => {
        wx.hideLoading();
        if (res.data && res.data.success) {
          authStore.set('hasPhone', 1);
          self.setData({ hasPhone: true, showBindForm: false });
          wx.showToast({ title: '手机号绑定成功', icon: 'success' });
        } else {
          wx.showToast({ title: res.data.message || '绑定失败', icon: 'none' });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({ title: '网络错误，请重试', icon: 'none' });
      }
    });
  },

  onChangeAvatar() {
    if (this._requireLogin()) return;
    // 隐私接口适配：chooseMedia（相册/相机）前先确保用户已同意隐私保护指引。
    // 原先只在「微信登录面板」流程里做了授权，换头像是独立入口，漏了这一步。
    ensurePrivacyAuthorized()
      .then(() => {
        wx.showActionSheet({
          itemList: ['拍照', '从相册选择'],
          success: (res) => {
            const sourceType = res.tapIndex === 0 ? ['camera'] : ['album'];
            wx.chooseMedia({
              count: 1,
              mediaType: ['image'],
              sourceType,
              success: (mediaRes) => {
                const tempPath = mediaRes.tempFiles[0].tempFilePath;
                const saved = authStore.get('userInfo') || {};
                // 保存到持久路径，避免临时路径失效
                const fs = wx.getFileSystemManager();
                const persistentPath = wx.env.USER_DATA_PATH + '/avatar_' + Date.now() + '.jpg';
                try {
                  fs.saveFileSync(tempPath, persistentPath);
                  saved.avatarUrl = persistentPath;
                } catch (e) {
                  saved.avatarUrl = tempPath;
                }
                authStore.set('userInfo', saved);
                this.setData({ userInfo: { ...this.data.userInfo, avatarUrl: saved.avatarUrl }, avatarError: false });
                // 头像只存本机持久路径（USER_DATA_PATH），换设备/重装即丢；
                // 服务端暂无头像上传接口，先给明确反馈，不静默成功。
                wx.showToast({ title: '头像已更新（仅本机生效）', icon: 'none' });
              }
            });
          }
        });
      })
      .catch(() => { /* 用户拒绝授权，静默返回 */ });
  },

  /**
   * 修改昵称：提交服务端 `PUT /api/user`（服务端做「禁用词 + 重名 + 长度」校验），成功后再更新本地。
   * [禁止] 此前这里**只写本地 storage、从不提交服务端** —— 后果有两个：
   *    1. 改完服务端并不知道，等于「只在自己这台手机上显示新名字」；
   *    2. 完全绕过昵称合规校验（禁用词/重名）。
   */
  onChangeNickname() {
    if (this._requireLogin()) return;
    const self = this;
    wx.showModal({
      title: '修改昵称',
      editable: true,
      placeholderText: '输入新昵称（最多 6 字）',
      content: this.data.displayName,
      success: (res) => {
        if (!res.confirm) return;
        const newName = String(res.content || '').trim();
        if (!newName) return;
        if (newName === self.data.displayName) return;
        // 与注册输入框一致的最长 6 字（displayName 也按 6 字展示）
        if (newName.length > 6) {
          wx.showToast({ title: '昵称最多 6 个字', icon: 'none' });
          return;
        }
        const token = authStore.get('userToken') || '';
        if (!token) {
          wx.showToast({ title: '请先登录', icon: 'none' });
          return;
        }
        wx.showLoading({ title: '保存中...', mask: true });
        request({
          url: API.USER.PROFILE,
          method: 'PUT',
          timeout: 10000,
          header: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
          data: { nickName: newName, displayName: newName },
          success: (r) => {
            const d = r.data || {};
            wx.hideLoading();
            if (!d.success) {
              // 服务端文案已是中文可读（如「该昵称已被使用，请换一个」「昵称包含不允许的词汇…」）
              wx.showToast({ title: d.message || '修改失败，请重试', icon: 'none' });
              return;
            }
            // 服务端已保存 → 同步本地缓存与展示（含首字头像）
            const saved = authStore.get('userInfo') || {};
            saved.nickName = newName;
            saved.displayName = newName;
            authStore.set('userInfo', saved);
            if (app.globalData._userCache && app.globalData._userCache.userInfo) {
              app.globalData._userCache.userInfo = saved;
            }
            self.setData({
              displayName: newName,
              avatarChar: firstChar(newName),
              userInfo: { ...self.data.userInfo, nickName: newName, displayName: newName }
            });
            wx.showToast({ title: '昵称已修改', icon: 'none' });
          },
          fail: () => {
            wx.hideLoading();
            wx.showToast({ title: '网络错误，请重试', icon: 'none' });
          }
        });
      }
    });
  },

  onLogout() {
    authStore.clear();
    try { wx.removeStorageSync('wxLocalOpenid'); } catch (e) { /* ignore */ }
    app.globalData._userCache = null;
    this.setData({
      userInfo: null, isLoggedIn: false, displayName: '', qlId: '', avatarError: false, avatarChar: '我',
      pendingDelete: null, pendingRevoking: false,
      isAdmin: false, hasPhone: false, showBindForm: false,
      // 弹层一并复位（onLogout 由弹层内的「退出」入口触发时 mask 挡着看不见，
      // 但非重建路径下残留 showChangePwd 会在下次打开时闪一下旧面板）
      showChangePwd: false,
      // 退出后回到登录欢迎屏（与改版前一致：未登录时先展示欢迎页）；
      // 点左上角返回仍可查看新版访客态档案区
      showLoginFlow: true,
      loginStage: 'welcome', loginLoading: false, agreed: false, pwdVisible: false,
      phoneInput: '', passwordInput: '', phoneOk: false, pwdOk: false,
      phoneFocus: false, pwdFocus: false,
      regPhone: '', regNickname: '', regPassword: '', regPassword2: '', regPwdVisible: false,
      regPhoneOk: false, regLoading: false
    });
    // 已登录期间 onShow 不再拉注册开关（⑦），退出后主动刷一次真实值：
    // 否则注册入口沿用退出前的旧开关，管理员后台改动不及时反映（有 10 分钟缓存，多数情况不发请求）
    this._loadRegisterFlag();
    wx.showToast({ title: '已退出登录', icon: 'none' });
  },

  // 头像图加载失败（本地临时文件失效/网络头像缺失）→ 回落「名字首字」
  onProfileAvatarError() {
    this.setData({ avatarError: true });
  },

  onOpenPrivacyPolicy() {
    navTo('/account-pkg/pages/policy/policy?type=privacy');
  },

  onOpenDisclaimer() {
    navTo('/account-pkg/pages/policy/policy?type=disclaimer');
  },

  // 「关于世慧屋」已从弹层改为独立页（account-pkg 分包）
  onOpenAbout() {
    navTo('/account-pkg/pages/about/about');
  },

  onFeedback() {
    navTo('/account-pkg/pages/feedback/feedback');
  },

  // 设置：本机偏好（专题页风格 / 默认折叠状态），入口与「关于世慧屋」同组
  onOpenSettings() {
    navTo('/account-pkg/pages/settings/settings');
  },

  // 刷新「设置」行右侧摘要：摘要行·默认收起 / 封面墙·默认展开
  _refreshTopicPrefText() {
    const p = topicPrefs.read();
    const styleText = p.style === topicPrefs.STYLE_D ? '封面墙' : '摘要行';
    this.setData({
      topicPrefText: styleText + ' · ' + (p.defaultExpanded ? '默认展开' : '默认收起')
    });
  },

  // 邮件联系：与 Web 端「邮件分享」同一个开放接口，未登录也可发送
  onEmailContact() {
    navTo('/account-pkg/pages/email/email');
  },

  /**
   * 注销账号：先弹窗二次确认（数据清空不可恢复 + 7 天冷静期），确认后跳「自助注销」页。
   * 说明：微信要求的账号注销通道，改由独立的注销页（/account-pkg/pages/cancel-account）自助完成，
   * 不再走「意见反馈」代提交。仅小程序提供该入口（Web 端不提供）。
   */
  onTapCancelAccount() {
    wx.showModal({
      title: '注销账号',
      content: '账号注销后，数据将被清空且无法恢复。\n为保障安全，注销后 7 天内不可重新注册。',
      confirmText: '继续注销',
      cancelText: '再想想',
      confirmColor: '#a63b2a',
      success: (r) => {
        if (r.confirm) navTo('/account-pkg/pages/cancel-account/cancel-account');
      }
    });
  },
});
