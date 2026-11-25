const { ensurePrivacyAuthorized } = require('../../../utils/privacy');
// 分包页比 pages/ 深一级 ⇒ 相对 require 必须三层（写成两层不报错、只在运行时找不到模块）
const API = require('../../../config/api');
const { fmtTime } = require('../../../utils/time-utils');
const authStore = require('../../../utils/auth-store');
const request = require('../../../utils/request');
const guide = require('../../../utils/guide');
const app = getApp();

// 「注销账号」为**小程序专属**反馈类型（Web 端不提供该入口）。
// 选中后必须填写邮箱：账号注销后站内信会被服务端清空、用户也无法再登录查看反馈回复，
// 邮箱是唯一能送达"账号已注销"的通道（服务端处理完成后自动发邮件，见 routes/feedback.js）。
const CANCEL_TYPE = 'cancel_account';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 反馈类型选项：UI 改为参考稿的「自定义下拉选择」，但 value 与后端 type 取值**保持不变**
// （suggestion/bug/content/other/cancel_account，服务端与管理后台都按这套值筛选，不能改）
const FB_TYPE_OPTIONS = [
  { value: 'suggestion', label: '建议' },
  { value: 'bug', label: 'BUG' },
  { value: 'content', label: '内容' },
  { value: 'other', label: '其他' },
  { value: 'cancel_account', label: '注销账号' },
];
// 内容字数上限（与 textarea maxlength、服务端 2000 字上限三处保持一致）
const FB_MAX_LEN = 2000;

/** 取类型中文名（下拉触发器要显示它） */
function typeLabelOf(type) {
  const hit = FB_TYPE_OPTIONS.filter(function (o) { return o.value === type; })[0];
  return hit ? hit.label : '';
}

/**
 * 字数计数器的配色档位：接近上限 90% 变「提醒橙」、到顶变「危险红」。
 * [注意] 小程序 WXSS 对 `:not()`/`:placeholder-shown` 这类伪类支持不可靠，
 *    所以浮动标签与配色档位**一律用状态类**（JS 算好 class）而不是 CSS 伪类。
 */
function counterTone(len) {
  if (len >= FB_MAX_LEN) return 'danger';
  if (len >= FB_MAX_LEN * 0.9) return 'warn';
  return '';
}

Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 64,
    activeTab: 'submit',
    isLoggedIn: false,

    // 提交反馈
    fbType: 'suggestion',
    fbTypeOptions: FB_TYPE_OPTIONS,
    fbTypeLabel: '建议',          // 下拉触发器显示的类型名
    dropdownOpen: false,          // 自定义下拉是否展开
    // 下拉展开时插到「反馈类型」卡片下方的透明占位高度（px）。
    // [注意] 为什么需要它：下拉列表是 absolute 浮层，而真机上 input/textarea 属**原生组件层**
    //    （z-index 对它无效），浮层会盖不住、被下面的输入框挡住 → 选项点不到。
    //    做法：展开时按实测高度把后续卡片整体推下去，列表浮在**空白区**上，与谁都不重叠。
    fbDropSpacer: 0,
    fbContent: '',
    // 浮动标签状态：'' 空且未聚焦 | 'active' 聚焦中（边框高亮）| 'filled' 有内容
    // [注意] 用状态类而不是 CSS 的 :focus/:not(:placeholder-shown)：小程序 WXSS 对这类伪类支持不可靠
    fbContentState: '',
    fbCountTone: '',              // 字数计数器配色档位：'' | 'warn' | 'danger'
    fbContact: '',
    fbContactState: '',
    fbImage: '',
    submitting: false,
    // 字段级错误：内容为空 / 联系方式格式 → 卡内行内提示（不再用 toast）
    fbErrContent: false,
    fbErrContact: '',
    // 图片加载或上传失败：保留已选图 + 行内提示，允许直接重试
    fbImgErr: '',
    // 键盘高度（px）：>0 时提交栏切换成贴键盘的工具条
    kbHeight: 0,

    // 反馈历史
    feedbacks: [],
    fbFilter: '',
    fbPage: 1,
    fbLoading: false,
    fbHasMore: true,
    expandedId: null
  },

  onLoad(options) {
    const sysInfo = wx.getWindowInfo();
    const safeAreaTop = sysInfo.statusBarHeight || 44;
    // 支持从「我的 → 注销账号」带参进入：?type=cancel_account 时预选该类型
    const preset = (options && options.type) || '';
    const patch = { safeAreaTop, navBarHeight: safeAreaTop + 44 };
    if (preset === CANCEL_TYPE) {
      patch.fbType = CANCEL_TYPE;
      patch.fbTypeLabel = typeLabelOf(CANCEL_TYPE);   // 下拉触发器要同步显示「注销账号」
    }
    this.setData(patch);
  },

  onShow() {
    const sysInfo = wx.getWindowInfo();
    const safeAreaTop = sysInfo.statusBarHeight || 44;
    this.setData({ safeAreaTop, navBarHeight: safeAreaTop + 44 });
    this._restoreUser();

    if (this.data.isLoggedIn && this.data.activeTab === 'history') {
      this.loadFeedbacks(true);
    }

    // 未登录时整块表单不渲染（只有登录入口），量不到目标 → 不启动引导
    if (this.data.isLoggedIn && this.data.activeTab === 'submit') {
      this._tryAutoGuide(500);
    }
  },

  onUnload() {
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
  },

  _restoreUser() {
    // 优先使用全局缓存，避免反复读取 Storage
    if (!app.globalData._userCache) {
      // 一次取全登录态快照（内存缓存 + 落盘透写）
      const snap = authStore.snapshot();
      app.globalData._userCache = {
        userInfo: snap.userInfo,
        hasPhone: snap.hasPhone,
        isAdmin: snap.isAdmin
      };
    }
    const cache = app.globalData._userCache;
    const saved = cache.userInfo;
    const token = authStore.get('userToken');
    if (saved && token) {
      // 注：本页模板不渲染 userInfo/displayName/qlId（昵称由输入框自带），故不再 setData
      this.setData({ isLoggedIn: true });
    }
  },

  // ========== 登录 ==========
  // 本页不提供微信一键登录：wx.login + 头像/昵称填写能力需**已认证的非个人主体**，
  // 本小程序为个人主体，调用必失败。统一引导到「我的」页走账号密码登录（与 Web 端同一套账号）。
  // [注意] switchTab 刻意不走 utils/nav.js：该封装只处理 navigateTo 的 10 层栈深失败，
  //    而「我的」是 tabBar 页，必须用 switchTab，两者语义不同（nav.js 也刻意不封装 switchTab）。
  onGoLogin() {
    wx.switchTab({
      url: '/pages/profile/profile',
      fail: () => wx.showToast({ title: '页面跳转失败，请稍后重试', icon: 'none' })
    });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
    if (tab === 'history') {
      if (this.data.isLoggedIn) {
        this.loadFeedbacks(true);
      } else {
        wx.showToast({ title: '请先登录', icon: 'none' });
      }
    }
  },

  // 历史空态的「去写第一条反馈」：只切 tab，不发请求、不新增数据
  onEmptyGoSubmit() {
    this.setData({ activeTab: 'submit' });
  },

  // ========== 提交反馈 ==========

  /**
   * 展开/收起「反馈类型」自定义下拉（参考稿的交互，替代原来的横向按钮组）。
   * 展开后必须**实测**列表高度再决定占位高度：选项行高受字体与机型影响，
   * 用常量估算会算少 → 列表仍有部分压在下面的输入框上（又点不到）。
   */
  onToggleDropdown() {
    const next = !this.data.dropdownOpen;
    this.setData({ dropdownOpen: next, fbDropSpacer: 0 }, () => {
      if (next) this._measureDropSpacer();
    });
  },

  /** 量出「下拉列表底边」比「卡片底边」低多少，据此把后续卡片推开同样距离 */
  _measureDropSpacer() {
    const q = this.createSelectorQuery();
    q.select('.fb-card-drop').boundingClientRect();
    q.select('.fb-drop-list').boundingClientRect();
    q.exec((res) => {
      const card = res && res[0];
      const list = res && res[1];
      if (!card || !list) return;
      // +24px 留一点视觉空隙，避免列表阴影贴着下一张卡片
      const h = Math.max(0, Math.round(list.bottom - card.bottom) + 24);
      this.setData({ fbDropSpacer: h });
    });
  },

  /** 选中类型：同步下拉触发器文案并收起；「注销账号」仍走原有必填邮箱校验 */
  onTypeChange(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ fbType: type, fbTypeLabel: typeLabelOf(type), dropdownOpen: false, fbDropSpacer: 0 });
  },

  /** 依据「是否聚焦 + 是否有内容」重算浮动标签状态类 */
  _syncContentState() {
    const has = (this.data.fbContent || '').length > 0;
    this.setData({ fbContentState: this._contentFocused ? 'active' : (has ? 'filled' : '') });
  },

  _syncContactState() {
    const has = (this.data.fbContact || '').length > 0;
    this.setData({ fbContactState: this._contactFocused ? 'active' : (has ? 'filled' : '') });
  },

  onContentInput(e) {
    const val = e.detail.value || '';
    const patch = { fbContent: val, fbCountTone: counterTone(val.length) };
    // 一开始输入就清掉字段级错误，不必等失焦
    if (this.data.fbErrContent && val.trim()) patch.fbErrContent = false;
    this.setData(patch);
    this._syncContentState();
  },

  onContentFocus() {
    this._contentFocused = true;
    this._syncContentState();
  },

  // 失焦时标签是否落回，由「是否还有内容」决定（有内容就保持上浮，避免标签闪一下再浮上来）
  onContentBlur() {
    this._contentFocused = false;
    this._syncContentState();
  },

  onContactInput(e) {
    const patch = { fbContact: e.detail.value || '' };
    if (this.data.fbErrContact) patch.fbErrContact = '';
    this.setData(patch);
    this._syncContactState();
  },

  onContactFocus() {
    this._contactFocused = true;
    this._syncContactState();
  },

  onContactBlur() {
    this._contactFocused = false;
    this._syncContactState();
  },

  onChooseImage() {
    const self = this;
    // 隐私接口适配：chooseMedia（相册/相机）前先确保用户已同意隐私保护指引
    ensurePrivacyAuthorized()
      .then(() => {
        wx.chooseMedia({
          count: 1,
          mediaType: ['image'],
          sourceType: ['album', 'camera'],
          success(res) {
            const tempPath = res.tempFiles[0].tempFilePath;
            self.setData({
              fbImage: tempPath,
              fbImgErr: ''   // 重新选图后清掉上一次的失败提示
            });
          }
        });
      })
      .catch(() => {});
  },

  onRemoveImage() {
    this.setData({ fbImage: '', fbImgErr: '' });
  },

  // 反馈截图加载失败 → 保留已选图（不再清空），提示可删除后重新选择
  onFbImageError() {
    this.setData({ fbImgErr: '图片加载失败，已保留所选图片，可删除后重新选择' });
  },

  // 键盘弹起/收起：记录高度，提交栏据此切换到贴键盘的工具条
  onKeyboardHeightChange(e) {
    const height = (e && e.detail && e.detail.height) || 0;
    if (height === this.data.kbHeight) return;
    this.setData({ kbHeight: height });
  },

  // 「我的反馈」历史记录里的截图加载失败 → 清掉该项图片，避免留一个破图框
  onMyFeedbackImageError(e) {
    const idx = Number(e.currentTarget.dataset.index);
    if (isNaN(idx)) return;
    const patch = {};
    patch['feedbacks[' + idx + '].image'] = '';
    this.setData(patch);
  },

  onSubmit() {
    // 提交按钮由 <button disabled> 改成了普通 view（参考稿的渐变按钮样式），
    // 这里必须自己挡住重复点击，否则连点会重复提交
    if (this.data.submitting) return;
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    const { fbContent, fbContact, fbType } = this.data;
    // 表单校验一律走字段级提示（行内红字 + 卡片朱砂描边），toast 只留给网络与服务端错误
    let contactErr = '';
    if (fbType === CANCEL_TYPE && !EMAIL_RE.test((fbContact || '').trim())) {
      contactErr = '请填写有效邮箱，注销结果将邮件告知';
    } else if (fbContact && !fbContact.match(/^1\d{10}$/) && !fbContact.includes('@')) {
      contactErr = '联系方式格式不正确，请填手机号或邮箱';
    }
    const errPatch = { fbErrContent: !fbContent.trim(), fbErrContact: contactErr };
    this.setData(errPatch);
    if (errPatch.fbErrContent || contactErr) {
      // 内容卡在首屏第一位，出错时回到顶部，保证提示可见
      if (errPatch.fbErrContent) wx.pageScrollTo({ scrollTop: 0, duration: 200 });
      return;
    }

    this.setData({ submitting: true });

    const doSubmit = (imageUrl) => {
      const token = authStore.get('userToken');
      const userInfo = authStore.get('userInfo') || {};
      request({
        url: API.FEEDBACK.SUBMIT,
        method: 'POST',
        timeout: 15000,
        header: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (token || '')
        },
        data: {
          type: this.data.fbType,
          content: fbContent.trim(),
          contact: fbContact.trim(),
          image: imageUrl || '',
          userName: userInfo.displayName || userInfo.nickName || ''
        },
        success: (res) => {
          this.setData({ submitting: false });
          if (res.data && res.data.success) {
            wx.showToast({ title: '反馈提交成功', icon: 'success' });
            this.setData({
              fbContent: '', fbContact: '', fbImage: '',
              fbType: 'suggestion',
              // 派生状态必须一起复位：否则提交完会留下"空框但标签仍上浮"、计数器仍红、
              // 下拉触发器仍显示上一次类型名（2026-09-29 改版时同步补上）
              fbTypeLabel: typeLabelOf('suggestion'),
              fbContentState: '', fbContactState: '', fbCountTone: '',
              fbErrContent: false, fbErrContact: '', fbImgErr: '',
              kbHeight: 0,
              dropdownOpen: false, fbDropSpacer: 0
            });
          } else {
            wx.showToast({ title: res.data.message || '提交失败', icon: 'none' });
          }
        },
        fail: () => {
          this.setData({ submitting: false });
          wx.showToast({ title: '网络错误，请重试', icon: 'none' });
        }
      });
    };

    // 如果有图片，先上传图片
    if (this.data.fbImage) {
      wx.showLoading({ title: '上传中...', mask: true });
      const token = authStore.get('userToken');
      wx.uploadFile({
        url: API.FEEDBACK.UPLOAD,
        filePath: this.data.fbImage,
        name: 'image',
        header: {
          'Authorization': 'Bearer ' + (token || '')
        },
        timeout: 30000,
        success: (uploadRes) => {
          wx.hideLoading();
          if (uploadRes.statusCode === 200) {
            try {
              const data = JSON.parse(uploadRes.data);
              if (data.success && data.data && data.data.url) {
                this.setData({ fbImgErr: '' });
                doSubmit(data.data.url);
              } else {
                // 上传失败不清图：保留已选图片，用户可直接再次点提交重试
                this.setData({ submitting: false, fbImgErr: '图片上传失败，已保留所选图片，请再次提交重试' });
              }
            } catch (e) {
              this.setData({ submitting: false, fbImgErr: '图片上传失败，已保留所选图片，请再次提交重试' });
            }
          } else {
            this.setData({ submitting: false, fbImgErr: '图片上传失败（' + uploadRes.statusCode + '），已保留所选图片，请再次提交重试' });
          }
        },
        fail: (err) => {
          wx.hideLoading();
          console.error('[Feedback] upload fail:', JSON.stringify(err));
          this.setData({ submitting: false, fbImgErr: '图片上传失败，已保留所选图片，请再次提交重试' });
        }
      });
    } else {
      doSubmit('');
    }
  },

  // ========== 反馈历史 ==========
  loadFeedbacks(reset) {
    if (this.data.fbLoading) return;
    const page = reset ? 1 : this.data.fbPage + 1;
    if (!reset && !this.data.fbHasMore) return;

    this.setData({ fbLoading: true });
    const token = authStore.get('userToken');
    if (!token) {
      this.setData({ fbLoading: false });
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    const { fbFilter } = this.data;
    let url = `${API.FEEDBACK.MY}?page=${page}&pageSize=20`;
    if (fbFilter) url += '&status=' + fbFilter;

    request({
      url,
      timeout: 10000,
      header: { 'Authorization': 'Bearer ' + (token || '') },
      success: (res) => {
        this.setData({ fbLoading: false });
        // 处理 401 未授权
        if (res.statusCode === 401) {
          wx.showToast({ title: '登录已过期，请重新登录', icon: 'none' });
          authStore.remove('userToken');
          this.setData({ isLoggedIn: false });
          return;
        }
        if (res.data && res.data.success && res.data.data) {
          const { list, totalPages } = res.data.data;
          // 服务端时间为 UTC（无时区标记），展示前统一换算成本机时区，否则少 8 小时
          const listShown = list.map((it) => ({
            ...it,
            createdAt: fmtTime(it.createdAt),
            repliedAt: fmtTime(it.repliedAt)
          }));
          const feedbacks = reset ? listShown : [...this.data.feedbacks, ...listShown];
          this.setData({
            feedbacks,
            fbPage: page,
            fbHasMore: page < totalPages
          });
        } else {
          const msg = (res.data && res.data.message) || '加载失败';
          wx.showToast({ title: msg, icon: 'none' });
        }
      },
      fail: () => {
        this.setData({ fbLoading: false });
        wx.showToast({ title: '网络错误，请重试', icon: 'none' });
      }
    });
  },

  onFilterChange(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({ fbFilter: filter === this.data.fbFilter ? '' : filter }, () => {
      this.loadFeedbacks(true);
    });
  },

  onToggleExpand(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      expandedId: this.data.expandedId === id ? null : id
    });
  },

  onLoadMore() {
    this.loadFeedbacks(false);
  },

  // ========== 引导 ==========
  /** 首次进入（或从「使用指南」点了重看）才拉起 */
  _tryAutoGuide(delay) {
    if (!guide.shouldShow('feedback') && !guide.hasReplay('feedback')) return;
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
    const wait = typeof delay === 'number' ? delay : 400;
    const that = this;
    this._guideTimer = setTimeout(function () {
      that._guideTimer = null;
      // 延时期间切到「反馈历史」的话表单已经卸载，不再拉起，避免框空
      if (!that.data.isLoggedIn || that.data.activeTab !== 'submit') return;
      const layer = that.selectComponent('#guideLayer');
      if (layer) layer.autoStart('feedback');
    }, wait);
  },

  /**
   * 引导需要把某一步的目标滚进视口时由 guide-layer 触发。
   * 本页是页面级滚动（不是 scroll-view），用 boundingClientRect + scrollOffset 反算 scrollTop；
   * 底部预留 200px 给引导卡片，滚入后卡片仍有地方落，不会只剩顶部一条。
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
    wx.createSelectorQuery()
      .select(selector)
      .boundingClientRect()
      .selectViewport()
      .scrollOffset()
      .exec(function (res) {
        const rect = res && res[0];
        const sc = res && res[1];
        if (!rect || !sc) return;
        const cur = sc.scrollTop || 0;
        const topLimit = navH;
        const bottomLimit = winH - reserve;
        let next = cur;
        if (rect.top < topLimit) next = cur + (rect.top - topLimit);
        else if (rect.bottom > bottomLimit) next = cur + (rect.bottom - bottomLimit);
        next = Math.max(0, Math.round(next));
        if (Math.abs(next - cur) < 2) return;
        wx.pageScrollTo({ scrollTop: next, duration: 220 });
      });
  }
});