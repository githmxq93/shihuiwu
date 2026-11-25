const ITEM_COUNT = 4; // 导航项数量，需与 index.wxs 的 ITEM_COUNT 保持一致
const DROP_RPX = 84; // 水滴基准直径（rpx），需与 index.wxs / index.wxss 一致

Component({
  data: {
    // 当前选中项由各 tab 页在 onShow 里写入（getTabBar().setData({ selected })）
    selected: 0,
    // 文章浮层打开期间收起：自定义 tabBar 在框架单独一层，页面里的 fixed 元素
    // 压不过它，不收起会盖住浮层底部的「上一篇 / 返回 / 下一篇」。
    // 由 articleOverlay 通过 page.getTabBar().setData({ hidden }) 置位。
    hidden: false,
    // 屏幕宽度（px）：交给 WXS 换算水滴坐标，避免 WXS 里拿不到窗口信息
    windowWidth: 375,
    // 水滴静态样式（px）：仅用于首帧兜底；WXS 介入后其 setStyle 优先级更高
    dropStyle: '',
    // 交给 WXS 的同步信号（selected:屏宽:序号），每次 setData 触发 WXS 复位水滴
    syncKey: '',
    list: [
      { pagePath: '/pages/index/index', text: '首页', key: 'home' },
      { pagePath: '/pages/topic-list/topic-list', text: '专题', key: 'topic' },
      { pagePath: '/pages/query/query', text: '查询', key: 'query' },
      { pagePath: '/pages/profile/profile', text: '我的', key: 'profile' }
    ]
  },

  attached() {
    // 组件挂载时 data.selected 还是默认 0，直接用它会让水滴先渲染在首页。
    // 以「当前页面路由」反推 tab 索引，首帧就落在正确位置。
    this._scheduleSync(this.currentIndex());
  },

  pageLifetimes: {
    /**
     * 页面每次显示都校准一次：
     * 1) 拖动切页后本页 tabBar 的水滴停在拖动落点，必须复位（selected 同值时
     *    观察器不会触发，只能靠这里兜底）；
     * 2) 切页时框架可能在本页 onShow 之前就触发 show，此时 data.selected 还是旧值，
     *    用它会导致水滴先回首页再走到目标项，故一律以当前路由为准。
     */
    show() {
      this._scheduleSync(this.currentIndex());
    }
  },

  lifetimes: {
    detached() {
      // 切页防抖定时器随组件销毁清掉，避免遗留回调操作已卸载实例
      if (this._navLockTimer) { clearTimeout(this._navLockTimer); this._navLockTimer = null; }
      if (this._syncTimer) { clearTimeout(this._syncTimer); this._syncTimer = null; }
    }
  },

  observers: {
    // 切页时把水滴复位到目标图标中心（低频，允许 setData）
    selected(val) {
      this._scheduleSync(val);
    }
  },

  methods: {
    /**
     * 同步水滴位置（三处触发点：attached / pageLifetimes.show / observers.selected）。
     * 会做两件事：
     *  1) 合并 —— 同一次切页里三处可能连续触发，用 clearTimeout 把多次请求压成一次
     *     setData，避免「3 轮 setData → 3 轮 WXS setStyle」叠加在目标页首帧上；
     *  2) 延后 —— 推迟到下一个事件循环，让目标页先完成首帧渲染再更新 tabBar，
     *     否则 tabBar 的渲染会插在页面首帧之前，表现为切页白屏约 1 秒。
     * 水滴在未被 WXS 定位前 opacity 为 0（见 index.wxss），故延后不会露出跳变。
     */
    _scheduleSync(selected) {
      this._wantIdx = selected;
      if (this._syncTimer) clearTimeout(this._syncTimer);
      this._syncTimer = setTimeout(() => {
        this._syncTimer = null;
        this.syncViewport(this._wantIdx);
      }, 0);
    },

    /** 页面栈顶（当前页面）对应的 tab 索引；非 tab 页或取不到时退回 data.selected */
    currentIndex() {
      try {
        const pages = getCurrentPages();
        if (pages && pages.length) {
          const route = '/' + pages[pages.length - 1].route;
          for (let i = 0; i < this.data.list.length; i++) {
            if (this.data.list[i].pagePath === route) return i;
          }
        }
      } catch (e) {
        // getCurrentPages 异常时按 data.selected 兜底
      }
      return this.data.selected;
    },

    /** 依据选中项与屏幕宽度算出水滴的 width / left */
    syncViewport(selected) {
      let width = 375;
      try {
        // P2-1：wx.getWindowInfo 自基础库 2.20.1 起可用，直接调用；异常由外层 catch 兜底 375。
        const info = wx.getWindowInfo();
        width = (info && info.windowWidth) || 375;
      } catch (e) {
        // 取不到窗口信息时按 375 兜底
      }
      const base = (DROP_RPX * width) / 750;
      const center = (width * (selected + 0.5)) / ITEM_COUNT;
      // 序号保证 syncKey 每次都不同，WXS 的 change: 观察器才会被触发
      this._tick = (this._tick || 0) + 1;
      this.setData({
        windowWidth: width,
        dropStyle: 'width:' + base + 'px;left:' + (center - base / 2) + 'px;',
        syncKey: selected + ':' + width + ':' + this._tick
      });
    },

    /**
     * 切换 tab（唯一出口）。
     * 拖动松手会同时触发 WXS 的 onWxsSelect 与 .ctb-item 的 bindtap，
     * 两次 switchTab 并发会失败并让 tabBar 卡住，故用 _navLock 串行化。
     */
    switchTo(idx) {
      const item = this.data.list[idx];
      if (!item) return;
      if (this.data.selected === idx) return;
      if (this._navLock) return;
      this._navLock = true;
      // complete 兜底（2026-10-22）：基础库个别版本 switchTab 的 complete 不回调，
      // 只靠它解锁会把锁留死——之后所有切页都被静默吞掉。800ms 定时器与
      // utils/nav.js 在途锁同口径；complete 真到了就提前清掉定时器。
      if (this._navLockTimer) clearTimeout(this._navLockTimer);
      this._navLockTimer = setTimeout(() => {
        this._navLock = false;
        this._navLockTimer = null;
      }, 800);
      wx.switchTab({
        url: item.pagePath,
        complete: () => {
          this._navLock = false;
          if (this._navLockTimer) { clearTimeout(this._navLockTimer); this._navLockTimer = null; }
        }
      });
    },

    /** 点击图标（未拖动）：正常切换 */
    onTapItem(e) {
      this.switchTo(Number(e.currentTarget.dataset.index));
    },

    /** WXS 拖动松手后回调：吸附到最近图标并切页（兼容 {index:n} 与直接传数字两种形式） */
    onWxsSelect(arg) {
      this.switchTo(Number(arg && arg.index !== undefined ? arg.index : arg));
    }
  }
});
