Component({
  properties: {
    title: { type: String, value: '' },
    safeAreaTop: { type: Number, value: 0 },
    showBack: { type: Boolean, value: true },
    // 右侧动作：文案为空即不渲染。点击触发 `action` 事件，由页面自己决定做什么。
    actionText: { type: String, value: '' },
    actionDisabled: { type: Boolean, value: false },
    // 不透明底（默认关，对既有 77 个页面零影响）。
    // 详情页的吸顶姓名栏要传 true：默认背景 --bg-nav 底部 40% 渐隐到透明，
    // 深色大头部从下面滚过时，深色姓名压在半透明/深色底上几乎看不见，
    // 用户会当成「顶部没出现姓名栏」（见 detail.js::_syncScrollState 注释）。
    solid: { type: Boolean, value: false },
    // 深色导航（默认关，对既有页面零影响）。
    // 详情页年表 / 关系 tab 顶部是深色窄条（detail.wxml 的 .b2-mini），导航栏必须同步转深色，
    // 否则浅色渐变条压在深色块上方会露出一道白缝，成不了一块完整的深色头部。
    dark: { type: Boolean, value: false }
  },
  data: {
    // 右上角系统胶囊的占位宽度（px）；取不到时用 96px 兜底
    menuRight: 96
  },
  lifetimes: {
    attached() {
      // 兜底：app.json 全局 navigationStyle: custom，若页面未传 safeAreaTop（=0），
      // 导航内容会顶进状态栏。此处自动取真实状态栏高度。
      if (!this.data.safeAreaTop) {
        try {
          var sys = wx.getWindowInfo();
          if (sys && sys.statusBarHeight) {
            this.setData({ safeAreaTop: sys.statusBarHeight });
          }
        } catch (e) {}
      }
      // 右上角系统胶囊占位：nav-action（刷新/退出）若贴右 16px 会被胶囊压住。
      // 用胶囊左边界反推右侧安全宽度，仅当有 actionText 时生效，其余页面零影响。
      try {
        var win = wx.getWindowInfo();
        var rect = wx.getMenuButtonBoundingClientRect && wx.getMenuButtonBoundingClientRect();
        if (win && win.windowWidth && rect && rect.left > 0) {
          var right = Math.ceil(win.windowWidth - rect.left + 8);
          this.setData({ menuRight: Math.max(16, Math.min(right, 140)) });
        }
      } catch (e) {}
    }
  },
  methods: {
    onAction() {
      if (this.data.actionDisabled) return;
      this.triggerEvent('action');
    },
    onBack() {
      // 无页面可退（分享/扫码直达）时兜底回首页 tab
      wx.navigateBack({
        delta: 1,
        fail: function () {
          wx.switchTab({ url: '/pages/index/index' });
        }
      });
    }
  }
});
