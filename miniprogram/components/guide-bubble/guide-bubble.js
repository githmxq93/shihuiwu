/**
 * guide-bubble：单条气泡引导（不压暗全屏）
 * ---------------------------------------------------------------------------
 * 适合“只有一个要点”的功能入口（如职官别名的热门搜索）。
 * 视觉上只画一圈高亮描边 + 一张卡片，不加遮罩，不打断用户继续操作页面。
 *
 * 行为约定：
 *   · 成功定位并展示后立即 markDone —— 单条引导没有“下一步”，
 *     若只在点「知道了」时记完成，用户直接离开就会每次进来重弹；
 *   · 目标节点找不到时直接放弃展示，不把卡片飘在屏幕中间。
 */

const guide = require('../../utils/guide');
const { getGuide } = require('../../config/guide-steps');

function getWindowInfo() {
  let info = null;
  try {
    info = typeof wx.getWindowInfo === 'function' ? wx.getWindowInfo() : wx.getSystemInfoSync();
  } catch (e) {
    info = null;
  }
  return {
    width: (info && info.windowWidth) || 375,
    height: (info && info.windowHeight) || 812
  };
}

Component({
  data: {
    visible: false,
    step: null,
    ring: { left: 0, top: 0, width: 0, height: 0 },
    cardTop: 0,
    winH: 812
  },

  pageLifetimes: {
    hide() {
      if (this.data.visible) this.setData({ visible: false });
    }
  },

  lifetimes: {
    detached() {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
    }
  },

  methods: {
    /** 页面调用：需要显示才显示（重看标记优先） */
    autoStart(key) {
      if (!key || this.data.visible) return;
      const replay = guide.consumeReplay(key);
      if (!replay && !guide.shouldShow(key)) return;
      this.start(key);
    },

    start(key) {
      const config = getGuide(key);
      if (!config || !config.steps || !config.steps.length) return;
      this._feature = key;
      this._step = config.steps[0];
      // tabBar 页要避开底部 bar（50px + 安全区），否则卡片会压在 tab 上
      this._bottomInset = this._tabBarInset();
      this.setData({
        visible: true,
        step: config.steps[0],
        winH: getWindowInfo().height
      });
      this._measure(0);
    },

    /**
     * 底部需要让出的高度：只有当前页真的有 tabBar（能拿到 getTabBar 实例）时才扣 50px；
     * 普通页（如职官别名）返回 0，不会凭空把卡片往上抬。
     */
    _tabBarInset() {
      try {
        const pages = getCurrentPages();
        const page = pages && pages[pages.length - 1];
        const bar = page && typeof page.getTabBar === 'function' ? page.getTabBar() : null;
        if (!bar) return 0;
        let info = null;
        try {
          info = typeof wx.getWindowInfo === 'function' ? wx.getWindowInfo() : wx.getSystemInfoSync();
        } catch (e) {
          info = null;
        }
        const screenH = (info && (info.screenHeight || info.windowHeight)) || 812;
        const bottom = info && info.safeArea && typeof info.safeArea.bottom === 'number'
          ? info.safeArea.bottom
          : screenH;
        return 50 + Math.max(0, screenH - bottom);
      } catch (e) {
        return 0;
      }
    },

    _measure(attempt) {
      const step = this._step;
      if (!step || !step.target) {
        this.setData({ visible: false });
        return;
      }
      const that = this;
      const query = wx.createSelectorQuery();
      query.select(step.target).boundingClientRect();
      query.exec((res) => {
        if (!that.data.visible) return;
        const rect = res && res[0];
        if (!rect || !rect.width) {
          if (attempt < 6) {
            that._timer = setTimeout(() => {
              that._timer = null;
              that._measure(attempt + 1);
            }, 120);
            return;
          }
          that.setData({ visible: false });
          return;
        }
        that._layout(rect);
      });
    },

    _layout(rect) {
      const pad = 4;
      const gap = 12;
      const estH = 190;
      const winH = this.data.winH;
      const insetBottom = this._bottomInset || 0;
      const placement = (this._step && this._step.placement) || 'bottom';
      let cardTop = placement === 'top' ? rect.top - estH - gap : rect.bottom + gap;
      if (cardTop + estH > winH - 24 - insetBottom) cardTop = rect.top - estH - gap;
      if (cardTop < 12) cardTop = 12;

      this.setData({
        ring: {
          left: Math.max(0, Math.round(rect.left - pad)),
          top: Math.max(0, Math.round(rect.top - pad)),
          width: Math.round(rect.width + pad * 2),
          height: Math.round(rect.height + pad * 2)
        },
        cardTop: Math.round(cardTop)
      });

      // 展示成功即记完成：单条气泡不重复打扰
      if (this._feature) guide.markDone(this._feature);

      wx.nextTick(() => this._clampCard());
    },

    _clampCard() {
      if (!this.data.visible) return;
      const that = this;
      this.createSelectorQuery()
        .select('.gb-card')
        .boundingClientRect((rect) => {
          if (!rect || !rect.height) return;
          const maxTop = that.data.winH - 16 - (that._bottomInset || 0) - rect.height;
          if (that.data.cardTop > maxTop) {
            that.setData({ cardTop: Math.max(12, Math.round(maxTop)) });
          }
        })
        .exec();
    },

    onKnow() {
      this.setData({ visible: false });
      this.triggerEvent('done', { feature: this._feature });
    }
  }
});
