/**
 * guide-layer：全屏分步引导（遮罩 + 挖孔高亮 + 卡片 + 指向箭头）
 * ---------------------------------------------------------------------------
 * 只负责“展示 + 测量 + 步骤流转”，文案全部来自 config/guide-steps.js。
 *
 * 页面接入（两行）：
 *   wxml: <guide-layer id="guideLayer" bind:scrollto="onGuideScrollTo" />
 *   js:   this.selectComponent('#guideLayer').autoStart('sixdeg');
 *
 * 层级说明：自定义 tabBar 在框架独立层，页面里的 fixed 元素压不过它，
 * 所以开始引导时调用 getTabBar().setData({ hidden: true })，结束后恢复；
 * 若某一步要讲 tabBar，由组件在页面内画一份静态复刻（见 .gl-tabbar）。
 *
 * 中断行为：
 *   · 点「跳过」/ 走完最后一步 → markDone，之后不再自动出现；
 *   · 切后台、返回上一页、被覆盖 → pageLifetimes.hide 直接关闭，不写完成，
 *     下次进入从第 1 步重新开始（步骤短，重来成本低）。
 *
 * 卡片定位（通用，不写死坐标）：
 *   · 默认落在目标正下方，箭头朝上指向目标下沿；
 *   · 不变量：只要「目标下沿 + 14 + 卡片高度」仍在视口内，就必须放在下方；
 *     只有下方确实放不下（底部 tabBar 这类贴底目标）才翻到上方，箭头朝下；
 *   · 坐标一律先换算到 .gl-root 内部坐标系（见 _readRoot），不用经验常数补偏移；
 *   · 卡片高度渲染后实测一次，仅用于极端场景校正；已在下方且未越界时不再移动。
 *
 * 多目标高亮：一步可写 targets: ['#a', '#b']，按所有目标的外接矩形并集挖一个孔
 * （不做多个孔：多个巨型 box-shadow 叠加会在重叠处二次压暗）。
 * 需要单独指出并集内部的某个子元素时，再加 rings: ['#a-trigger']，只描边不挖孔。
 *
 * 自动滚动：任何一步，只要量到的目标没有完整落在视口内（top >= 0 且 bottom <= 视口高），
 * 都会触发 scrollto 事件交给页面滚（页面主体是 scroll-view，组件拿不到它的 scroll-top）。
 * 页面可选写 scrollIntoView 指定滚动锚点；未写时取最靠下的那个目标。
 * 最多重试 4 次；滚完仍不完全可见就不画孔和描边，只留兜底卡片（避免半个框被视口裁掉）。
 *
 * 静态复刻：mockPanel 用于“必须先展开 / 先切换才能看到”的面板（如首页搜索范围下拉、
 * 平行时空的选年份态），只在遮罩里画一份示意，不触发页面真实交互。
 */

const guide = require('../../utils/guide');
const { getGuide } = require('../../config/guide-steps');

/**
 * 多个目标的外接矩形并集：多目标高亮只挖一个孔，避免阴影叠加二次压暗。
 * 必须同时带 bottom：卡片定位用的是「目标下沿」，缺了它 rect.bottom 就是 NaN，
 * NaN 参与比较一律为 false，会让“下方是否放得下”永远判否 → 卡片被翻到上方。
 */
function unionRect(rects) {
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  rects.forEach((rect) => {
    left = Math.min(left, rect.left);
    top = Math.min(top, rect.top);
    right = Math.max(right, rect.left + rect.width);
    bottom = Math.max(bottom, rect.top + rect.height);
  });
  return { left: left, top: top, width: right - left, height: bottom - top, bottom: bottom };
}

/** 已关闭的挖孔 / 箭头 / 面板，统一用同一份结构，避免漏字段 */
function offHole() {
  return { on: false, left: 0, top: 0, width: 0, height: 0 };
}

function offArrow() {
  return { on: false, dir: 'up', left: 0 };
}

function offMock() {
  return { on: false, type: '', left: 0, top: 0, width: 0 };
}

function offFrame() {
  return { on: false, left: 0, top: 0, width: 0, height: 0 };
}

/**
 * 卡片高度估算（px，以 375 宽的 rpx 折算为基准）。
 * 只用于「首帧同步定位」：拿到真实高度前也要先把卡片放到目标下方并画出箭头，
 * 不能再像以前那样先居中、等异步测量回来再挪——测量回调一旦没执行，
 * 卡片就停在屏幕中间压住搜索框，箭头也一起不显示。
 * 真实高度回来后由 _refineCard 校正（只会在方向翻转时移动）。
 */
function estimateCardHeight(step) {
  const bodyLen = (step && step.body) ? step.body.length : 0;
  let h = 32 + 20 + 28 + Math.max(2, Math.ceil(bodyLen / 21)) * 24 + 64 + 16;
  if (step && step.tip) {
    const tipLen = step.tip.length;
    h += 10 + 16 + Math.max(1, Math.ceil(tipLen / 19)) * 21;
  }
  return Math.round(h);
}

function getWindowInfo() {
  let info = null;
  try {
    info = typeof wx.getWindowInfo === 'function' ? wx.getWindowInfo() : wx.getSystemInfoSync();
  } catch (e) {
    info = null;
  }
  const height = (info && info.windowHeight) || 812;
  const width = (info && info.windowWidth) || 375;
  let safeBottom = 0;
  if (info && info.safeArea && typeof info.safeArea.bottom === 'number') {
    safeBottom = Math.max(0, height - info.safeArea.bottom);
  }
  return { width: width, height: height, safeBottom: safeBottom };
}

const CARD_GAP = 14;   // 卡片与目标（或复刻面板）之间的间隙，px
const CARD_SIDE = 24;  // 卡片左右留白，与 .gl-card 的 left/right 一致
const EDGE = 12;       // 卡片距屏幕上下边缘的最小距离，px
const MEASURE_MAX_ATTEMPTS = 4; // 目标测量/滚动重试上限：4 × 180ms ≈ 0.7s
const DEBUG = false;   // 引导定位日志总开关：排查时临时改 true，线上保持关闭

/** 目标是否完整落在视口内（视口高用 .gl-root 实测值）；不完整就不画孔，避免被裁掉一半 */
function isFullyVisible(rect, viewH) {
  return !!(rect && rect.height > 0 && rect.top >= 0 && rect.bottom <= viewH);
}

Component({
  data: {
    visible: false,
    index: 0,
    total: 0,
    step: null,
    dots: [],
    hole: offHole(),
    rings: [],
    arrow: offArrow(),
    mock: offMock(),
    tabFrame: offFrame(),
    cardTop: 280,
    cardReady: false,
    tabbarOn: false,
    // 下拉刷新示意步：不挖孔，改用整屏压暗；卡片小箭头也不显示
    dimOn: false,
    // 选年份复刻里展示的 3 个快捷年份（与页面 YEAR_PICKS 前 3 项一致，只示意）
    mockPicks: [
      { year: '前221', tag: '秦统一' },
      { year: '618', tag: '唐建立' },
      { year: '755', tag: '安史之乱' }
    ],
    safeBottom: 0,
    winW: 375,
    winH: 812
  },

  pageLifetimes: {
    hide() {
      // 被后台 / 其他页覆盖：关闭但不记完成
      if (this.data.visible) this._close();
    }
  },

  lifetimes: {
    detached() {
      this._clearTimers();
      this._restoreTabBar();
    }
  },

  methods: {
    noop() {},

    /**
     * 页面自动调用：需要显示才显示。
     * 已有重看标记时强制显示一次（不看 done）。
     * @returns {boolean} 是否真的进入了引导（已在展示中也算 true）。
     *   页面据此决定「引导期间先不拉关系数据」的闸门什么时候必须放开：
     *   返回 false 说明这套引导不会出现，闸门要立刻打开，不能让内容一直等。
     */
    autoStart(key) {
      if (!key) return false;
      if (this.data.visible) return true;
      const replay = guide.consumeReplay(key);
      if (!replay && !guide.shouldShow(key)) return false;
      this.start(key, { replay: replay });
      return true;
    },

    /** 强制开始（调试或内部调用） */
    start(key, opts) {
      const config = getGuide(key);
      if (!config || !config.steps || !config.steps.length) return;
      const info = getWindowInfo();
      this._feature = key;
      this._steps = config.steps;
      this._replay = !!(opts && opts.replay);
      this.setData({
        visible: true,
        index: 0,
        total: config.steps.length,
        safeBottom: info.safeBottom,
        winW: info.width,
        winH: info.height,
        tabbarOn: false
      });
      this._hideTabBar();
      this._applyStep(0);
    },

    _clearTimers() {
      ['_timer', '_ringTimer', '_refineTimer', '_mockTimer', '_cardGuard', '_stateTimer'].forEach((key) => {
        if (this[key]) {
          clearTimeout(this[key]);
          this[key] = null;
        }
      });
    },

    _applyStep(index) {
      const step = (this._steps || [])[index];
      if (!step) return;
      this._clearTimers();
      const dots = (this._steps || []).map((item, i) => ({
        id: i,
        on: i === index ? 1 : 0
      }));
      this._settled = false;   // 是否已经落到「有孔」或「兜底」的终态
      this._noHole = false;    // 目标不完全可见时置 true，禁止后续描边再画上去
      // 下拉示意步不圈目标：没有孔就没有压暗阴影，这里补一层整屏压暗
      const isPulldown = !!(step.mockPanel && step.mockPanel.type === 'pulldown');
      this.setData({
        index: index,
        step: step,
        dots: dots,
        tabbarOn: !!step.tabbar,
        dimOn: isPulldown,
        hole: offHole(),
        rings: [],
        arrow: offArrow(),
        mock: offMock(),
        tabFrame: offFrame(),
        // 第 0 帧就把兜底卡片显示出来：测量期间不再是「全屏遮罩 + 什么都看不见」。
        // 此时还没有孔和箭头，量到目标后再由 _layout 补孔并校正位置。
        cardReady: true,
        cardTop: Math.max(EDGE, Math.round(this._winH() - EDGE - 24 - estimateCardHeight(step)))
      });

      // 保险：测量链路完全没有回调时，1.6s 后也把卡片落到兜底位（可跳过/继续）
      this._cardGuard = setTimeout(() => {
        this._cardGuard = null;
        if (this.data.visible && this.data.index === index && !this._settled) {
          this._fallbackCard(step, 'guard');
        }
      }, 1600);

      if (step.tabbar) {
        this._layoutTabStep(index);
        return;
      }
      // pageState：目标依赖页面先切到某个状态（如详情页的关系 / 年表标签）才渲染。
      // 遮罩拦点击，用户没法自己切，所以由组件通知页面切过去，等一帧再量真实节点。
      if (step.pageState) {
        this.triggerEvent('state', { state: step.pageState, index: index });
        this._stateTimer = setTimeout(() => {
          this._stateTimer = null;
          if (this.data.visible && this.data.index === index) this._startStepMeasure(step, index);
        }, 340);
        return;
      }
      this._startStepMeasure(step, index);
    },

    _startStepMeasure(step, stepIndex) {
      const target = step.targets && step.targets.length ? step.targets : step.target;
      this._measure(target, step, 0, stepIndex);
      if (step.rings && step.rings.length) this._measureRings(step.rings, 0, stepIndex);
    },

    /**
     * 读组件根节点 .gl-root 的真实矩形，作为唯一的坐标系与视口尺寸来源。
     * 为什么要这一步：卡片 / 挖孔都是 absolute 定位在 .gl-root 里，
     * 而目标的 boundingClientRect 是相对屏幕的；一旦祖先上有 transform / filter
     * 之类的合成属性，fixed 的包含块会变成那个祖先，两边坐标原点就差一个偏移
     * （导航高度或滚动偏移）。这里量出 root.left/top 与 root 宽高，后面统一换算。
     */
    _readRoot(cb, allowRetry) {
      const fallback = {
        x: 0,
        y: 0,
        width: this.data.winW,
        height: this.data.winH
      };
      this.createSelectorQuery()
        .select('.gl-root')
        .boundingClientRect((root) => {
          // 首帧 setData 还没渲染完时量不到根节点：短延时重试一次，拿到真实原点/视口高
          if ((!root || !root.width || !root.height) && allowRetry !== false) {
            setTimeout(() => this._readRoot(cb, false), 50);
            return;
          }
          let box = fallback;
          if (root && root.width && root.height) {
            box = {
              x: Math.round(root.left),
              y: Math.round(root.top),
              width: Math.round(root.width),
              height: Math.round(root.height)
            };
          }
          this._rootX = box.x;
          this._rootY = box.y;
          this._viewW = box.width;
          this._viewH = box.height;
          cb(box);
        })
        .exec();
    },

    /** 视口高度：优先用 .gl-root 实测值，量不到才回落到系统信息 */
    _winH() {
      return this._viewH || this.data.winH;
    },

    /** 视口宽度：同上 */
    _winW() {
      return this._viewW || this.data.winW;
    },

    /**
     * 测量页面节点：
     *   · 节点还没渲染出来 / 目标没有完整进入视口 → 最多重试 4 次（4 × 180ms ≈ 0.7s）；
     *   · 不完整可见时在第 0 次重试就触发 scrollto（优先 step.scrollIntoView，否则取最靠下的目标）；
     *   · 滚完仍不完整 → 不画孔/描边，只留兜底卡片，日志 reason=partial；
     *   · 带 mockPanel 时，额外量面板锚点（通常是整个搜索框），用于定位复刻面板。
     * 所有 rect 都先减去 .gl-root 原点，换成组件内部坐标系再交给布局。
     */
    _measure(target, step, attempt, stepIndex) {
      const selectors = (Array.isArray(target) ? target : [target]).filter(Boolean);
      if (!selectors.length) {
        this._fallbackCard(step, 'no-target');
        return;
      }
      const mockCfg = (step && step.mockPanel) || null;
      const mockType = mockCfg ? (mockCfg.type || 'filter') : '';
      const anchorSel = mockCfg && mockCfg.anchor ? mockCfg.anchor : '';
      const all = anchorSel ? selectors.concat([anchorSel]) : selectors;
      // optional 步的目标是条件渲染：只给 1 次重试（≈180ms）等它出现，
      // 仍然没有就跳过该步，绝不把用户留在「遮罩在、孔不在」的状态。
      const maxAttempt = step && step.optional ? 1 : MEASURE_MAX_ATTEMPTS;
      const that = this;
      const retry = () => {
        that._timer = setTimeout(() => {
          that._timer = null;
          that._measure(target, step, attempt + 1, stepIndex);
        }, 180);
      };
      this._readRoot((root) => {
        // 注意：这里用页面级查询，不是 this.createSelectorQuery()
        const query = wx.createSelectorQuery();
        all.forEach((selector) => query.select(selector).boundingClientRect());
        query.exec((res) => {
          if (!that.data.visible || that.data.index !== stepIndex) return;
          const list = res || [];
          // 屏幕坐标 → .gl-root 坐标（root 通常就是 0,0，但保留换算以兼容被祖先偏移的情况）
          const norm = (rect) => (rect ? {
            left: Math.round(rect.left - root.x),
            top: Math.round(rect.top - root.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          } : null);
          const got = list.filter((rect) => rect && rect.width && rect.height).length;
          // 多目标时等所有目标都量到再画，避免孔先小后大跳一下
          if (got < all.length) {
            if (attempt < maxAttempt) {
              retry();
              return;
            }
            // 条件渲染的目标确实不存在：optional 直接跳过，其他步走无孔兜底
            if (step && step.optional) {
              that._skipOptional(stepIndex);
              return;
            }
            that._noHole = true;
            that.setData({ hole: offHole(), rings: [], mock: offMock() });
            that._fallbackCard(step, 'missing');
            return;
          }
          const targetRects = list.slice(0, selectors.length)
            .filter((rect) => rect && rect.width && rect.height)
            .map(norm);
          if (!targetRects.length) {
            // 目标始终找不到：optional 跳过；其他步不压住任何东西，卡片落到屏幕下方兜底位，仍可跳过
            if (step && step.optional) {
              that._skipOptional(stepIndex);
              return;
            }
            that._noHole = true;
            that.setData({ hole: offHole(), rings: [], mock: offMock() });
            that._fallbackCard(step, 'no-target');
            return;
          }
          const rect = unionRect(targetRects);
          // M1：目标必须完整落在视口内。否则孔与描边会被视口裁掉一半，
          // 先请页面滚进来（页面未接入 scrollto 时此事件无人处理），再重试。
          if (!isFullyVisible(rect, root.height)) {
            if (attempt < MEASURE_MAX_ATTEMPTS) {
              if (attempt === 0) {
                // 多目标取最靠下的那个当锚点，尽量一次把整组滚进来
                let lowest = 0;
                targetRects.forEach((item, i) => {
                  const curBottom = item.top + item.height;
                  const lowBottom = targetRects[lowest].top + targetRects[lowest].height;
                  if (curBottom > lowBottom) lowest = i;
                });
                const sel = step.scrollIntoView || selectors[lowest];
                if (sel) that.triggerEvent('scrollto', { selector: sel });
              }
              retry();
              return;
            }
            // 滚不进来就不画半个框：清掉孔/描边/复刻，只保留兜底卡片
            that._noHole = true;
            that.setData({ hole: offHole(), rings: [], mock: offMock(), arrow: offArrow() });
            that._fallbackCard(step, 'partial');
            return;
          }
          const anchorRect = anchorSel ? norm(list[selectors.length]) : null;

          // 底部半屏复刻：贴屏幕底边，卡片只能落在它与目标之间
          if (mockType === 'sheet') {
            that._layoutSheetMock(rect, step, stepIndex);
            return;
          }

          // 顶部下拉示意：只画一条带箭头的提示条，不占卡片位置
          if (mockType === 'pulldown') {
            that._layoutPulldownMock(rect, step, stepIndex);
            return;
          }

          // 选年份态：同样点不出来（遮罩拦住分段点击），复刻面板贴在分段胶囊下方
          if (mockType === 'year') {
            that._layoutYearMock(rect, step, stepIndex);
            return;
          }

          if (anchorSel && anchorRect && anchorRect.width) {
            // 复刻面板贴在锚点元素（整个搜索框）下方，与真实面板 top:100rpx 的口径一致
            const mock = {
              on: true,
              type: 'filter',
              left: Math.round(anchorRect.left),
              top: Math.round(anchorRect.top + anchorRect.height + 6),
              width: Math.round(anchorRect.width)
            };
            that.setData({ mock: mock }, () => {
              that._measureMockHeight((h) => {
                if (!that.data.visible || that.data.index !== stepIndex) return;
                // 卡片要落在复刻面板下方，不能压住示意
                that._layout(rect, step, { obstacleBottom: mock.top + h }, stepIndex);
              });
            });
            return;
          }

          that.setData({ mock: offMock() });
          that._layout(rect, step, null, stepIndex);
        });
      });
    },

    /** 量静态复刻面板高度（渲染后 60ms），量不到时按 fallback（默认 120px）估算 */
    _measureMockHeight(cb, fallback) {
      const that = this;
      clearTimeout(this._mockTimer);
      this._mockTimer = setTimeout(() => {
        that._mockTimer = null;
        that.createSelectorQuery()
          .select('.gl-mock')
          .boundingClientRect((panel) => {
            const h = panel && panel.height;
            cb(h && h >= 60 && h <= 320 ? Math.round(h) : (fallback || 120));
          })
          .exec();
      }, 60);
    },

    /**
     * 底部半屏复刻（如朝代详情面板）：
     *   先按估算高度贴底画出来，量到真实高度后重新贴底；
     *   卡片可用区域的底边 = 面板顶边 - 8，保证卡片落在目标与面板之间、
     *   既不压住面板，也不越过面板底部。
     */
    _layoutSheetMock(rect, step, stepIndex) {
      const winW = this._winW();
      const winH = this._winH();
      const safe = this.data.safeBottom || 0;
      // 先按估算高度贴底画出来（首帧就能看到面板），再按实测高度校正
      this.setData({
        mock: { on: true, type: 'sheet', left: 0, top: Math.max(0, Math.round(winH - safe - 140)), width: winW }
      });
      this._measureMockHeight((h) => {
        if (!this.data.visible || this.data.index !== stepIndex) return;
        const top = Math.max(0, Math.round(winH - safe - h));
        this.setData({
          mock: { on: true, type: 'sheet', left: 0, top: top, width: winW }
        }, () => {
          this._layout(rect, step, { limitBottom: top - 8 }, stepIndex);
        });
      });
    },

    /**
     * 顶部下拉示意（如首页下拉刷新）：
     *   下拉手势本身做不了（遮罩层拦截 touchmove），所以只示意方向与动作：
     *   顶部一条提示条 + 一条向下的长箭头，箭头从提示条下方一直延伸到卡片上方，
     *   长度按两者的实际间距自适应（40–120px），一眼能看出是「往下拉」。
     *   这一步不圈目标：没有孔、没有描边，也没有卡片小箭头，页面改用整屏压暗。
     */
    _layoutPulldownMock(rect, step, stepIndex) {
      const winW = this._winW();
      const width = Math.min(Math.round(rect.width), winW - 48);
      const left = Math.max(12, Math.min(Math.round(rect.left), winW - width - 12));
      const top = Math.max(EDGE, Math.round(rect.top) - 60);
      const place = this._computePlacement(rect, step, null, estimateCardHeight(step));
      // 提示条估算高 41px（上 14 + 条 6 + 间 12 + 正文约 34 + 下 16 rpx），与箭头留 8px
      const arrowTop = top + 41 + 8;
      let arrowH = 56;
      if (place.dir === 'up' && place.top - CARD_GAP > arrowTop) {
        arrowH = Math.max(40, Math.min(120, place.top - CARD_GAP - arrowTop));
      }
      this._settled = true;
      this._noHole = true;
      this.setData({
        hole: offHole(),
        rings: [],
        arrow: offArrow(),
        mock: { on: true, type: 'pulldown', left: left, top: top, width: width, arrowH: arrowH },
        cardTop: place.top,
        cardReady: true
      });
    },

    /**
     * 选年份态复刻（平行时空）：
     *   「选年份」是按分段胶囊后才出现的态（页面 anchorTab 切换），遮罩拦住点击，
     *   用户没法在引导里真切过去 → 在胶囊正下方静态复刻年份输入与快捷年份，
     *   结构与页面真实结构一致（纪年输入 + 对照按钮 + 快捷锚点），只示意、不接管交互。
     *   卡片优先落在复刻面板下方；放不下时由 _computePlacement 按通用规则翻到上方。
     */
    _layoutYearMock(rect, step, stepIndex) {
      const winW = this._winW();
      const width = Math.max(240, Math.min(Math.round(rect.width), winW - 24));
      const left = Math.max(12, Math.min(Math.round(rect.left), winW - width - 12));
      const mock = {
        on: true,
        type: 'year',
        left: left,
        top: Math.max(EDGE, Math.round(rect.bottom) + 6),
        width: width
      };
      const that = this;
      this.setData({ mock: mock }, () => {
        that._measureMockHeight((h) => {
          if (!that.data.visible || that.data.index !== stepIndex) return;
          // obstacleBottom = 面板底边：卡片从这里往下排，绝不压住示意面板
          that._layout(rect, step, { obstacleBottom: mock.top + h }, stepIndex);
        }, 170);
      });
    },

    /** 子元素描边（不挖孔）：用于并集内部需要单独指出的局部 */
    _measureRings(selectors, attempt, stepIndex) {
      const that = this;
      this._readRoot((root) => {
        const query = wx.createSelectorQuery();
        selectors.forEach((selector) => query.select(selector).boundingClientRect());
        query.exec((res) => {
          if (!that.data.visible || that.data.index !== stepIndex) return;
          const rects = (res || [])
            .filter((rect) => rect && rect.width && rect.height)
            .map((rect) => ({
              left: Math.round(rect.left - root.x),
              top: Math.round(rect.top - root.y),
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            }));
          if (rects.length < selectors.length && attempt < 4) {
            that._ringTimer = setTimeout(() => {
              that._ringTimer = null;
              that._measureRings(selectors, attempt + 1, stepIndex);
            }, 120);
            return;
          }
          // 目标不完全可见时已走 partial 兜底：描边也不能再补画上去
          if (that._noHole) return;
          that.setData({ rings: rects });
        });
      });
    },

    /**
     * 定位（同步完成，不等任何异步测量回调）：
     *   1. 用估算高度算出方向与 top，当场 setData（孔 + 卡片 + 箭头一次到位）；
     *   2. 渲染完成后 _refineCard 再按真实高度校正一次（只影响极端的翻转场景）。
     * 这样即使测量 .gl-card 的回调没执行，卡片也一定在目标下方、箭头一定显示。
     * area：卡片可用区域（可选）
     *   obstacleBottom 目标下方被复刻面板占掉的高度基准（无面板时传 0）；
     *   limitBottom    卡片底边上限（底部半屏复刻时为面板顶边）。
     */
    _layout(rect, step, area, stepIndex) {
      const pad = 6;
      const winW = this._winW();
      const winH = this._winH();
      const holeTop = Math.max(0, Math.round(rect.top - pad));
      const hole = {
        on: true,
        left: Math.max(0, Math.round(rect.left - pad)),
        top: holeTop,
        width: Math.min(winW, Math.round(rect.width + pad * 2)),
        // 孔下沿再兜一层：即使目标贴底，也不让整块阴影越过视口
        height: Math.min(Math.round(rect.height + pad * 2), Math.max(0, Math.round(winH - holeTop)))
      };
      this._settled = true;
      this._noHole = false;
      const estH = estimateCardHeight(step);
      const place = this._computePlacement(rect, step, area, estH);
      // 真机排查用：目标上下沿 / 视口高 / 卡片高 / 最终 top / 与目标下沿的差值。
      // 任意一步位置不对，先看这行是否出现、数值是否自洽；上线默认不输出。
      if (DEBUG) console.log('[guide] placed step ' + (stepIndex + 1),
        'target.top=' + Math.round(rect.top),
        'target.bottom=' + Math.round(rect.bottom),
        'target.height=' + Math.round(rect.height),
        'viewH=' + winH,
        'cardH(est)=' + estH,
        'cardTop=' + place.top,
        'dir=' + place.dir,
        'gap=' + (place.top - Math.round(rect.bottom)));
      this.setData({
        hole: hole,
        cardTop: place.top,
        arrow: place.arrow,
        cardReady: true
      }, () => this._refineCard(rect, step, area, stepIndex));
    },

    /**
     * 方向 / top / 箭头计算（估算高度与真实高度共用同一套规则）。
     *
     * 硬不变量（2026-11 真机第 1 步压住搜索框后追加）：
     *   只要「目标下沿 + 14 + 卡片高度」还小于视口底部，就必须放在下方，
     *   不再走“能翻就翻”的逻辑。只有下方真放不下、且上方放得下时，才翻到上方。
     *   placement: 'top' 是页面显式要求“优先上方”（其它引导用），单独保留。
     * 另外，放下方时写入的 top 绝不允许小于目标下沿（否则就是异常，强制贴到下沿 +14）。
     */
    _computePlacement(rect, step, area, cardH) {
      const winH = this._winH();
      const winW = this._winW();
      // 卡片底边上限：默认贴视口底；底部半屏复刻时改为面板顶边
      const limitBottom = (area && area.limitBottom) || winH;
      const obstacleBottom = (area && area.obstacleBottom) || 0;
      const targetBottom = Math.round(rect.bottom);
      const refBottom = Math.round(obstacleBottom || targetBottom);
      const belowTop = Math.round(refBottom + CARD_GAP);
      const aboveTop = Math.round(rect.top - CARD_GAP - cardH);
      const belowFits = belowTop + cardH <= limitBottom - EDGE;
      const aboveFits = aboveTop >= EDGE;
      const preferTop = !!(step && step.placement === 'top');

      let dir;
      let top;
      if (preferTop && aboveFits) {
        // 页面显式要求上方，且上方确实放得下
        dir = 'down';
        top = aboveTop;
      } else if (belowFits) {
        // 不变量：下方放得下就一定放下方
        dir = 'up';
        top = belowTop;
      } else if (aboveFits) {
        // 下方放不下、上方放得下 → 翻到上方（目前只有底部 tabBar 这类贴底目标会走到）
        dir = 'down';
        top = aboveTop;
      } else {
        // 两边都放不下：选空间更大的一侧，再夹进屏幕
        dir = belowTop <= aboveTop ? 'up' : 'down';
        top = dir === 'up' ? belowTop : aboveTop;
      }

      // 异常兜底：放下方时 top 小于目标下沿，一律改成 目标下沿 + 14
      if (dir === 'up' && top < targetBottom) top = belowTop;
      top = Math.max(EDGE, Math.min(top, Math.round(limitBottom - EDGE - cardH)));

      const cardW = winW - CARD_SIDE * 2;
      const centerX = rect.left + rect.width / 2;
      const arrowLeft = Math.max(20, Math.min(cardW - 20, Math.round(centerX - CARD_SIDE)));
      return { top: Math.round(top), dir: dir, arrow: { on: true, dir: dir, left: arrowLeft } };
    },

    /**
     * 渲染后按真实高度校正一次。
     * 护栏：
     *   · 卡片宽度没量到（0 / 明显异常）→ 忽略，保留估算位置；
     *   · 高度异常（<100 或超过视口 3/4）→ 忽略；
     *   · 已经在目标下方且底边没越界 → 不再重算，避免一次可疑回调把卡片翻上去。
     */
    _refineCard(rect, step, area, stepIndex) {
      const that = this;
      clearTimeout(this._refineTimer);
      this._refineTimer = setTimeout(() => {
        that._refineTimer = null;
        that.createSelectorQuery()
          .select('.gl-card')
          .boundingClientRect((card) => {
            if (!that.data.visible || that.data.index !== stepIndex) return;
            const winH = that._winH();
            const cardH = card && card.height;
            const cardBottom = card ? Math.round(card.bottom - (that._rootY || 0)) : 0;
            if (DEBUG) console.log('[guide] refine step ' + (stepIndex + 1),
              'target.top=' + Math.round(rect.top),
              'target.bottom=' + Math.round(rect.bottom),
              'viewH=' + winH,
              'cardH(measured)=' + Math.round(cardH || 0),
              'cardTop=' + that.data.cardTop,
              'cardBottom=' + cardBottom,
              'dir=' + that.data.arrow.dir);
            if (!card || !card.width || card.width < 100) return;
            if (!cardH || cardH < 100 || cardH > winH * 0.75) return;
            // 已经在下方且底边未越界：保持不动（半屏复刻时越界线是面板顶边）
            const limitBottom = (area && area.limitBottom) || winH;
            if (that.data.arrow.dir === 'up' &&
                cardBottom <= limitBottom - EDGE + 2 &&
                that.data.cardTop >= Math.round(rect.bottom)) {
              return;
            }
            const place = that._computePlacement(rect, step, area, cardH);
            if (Math.abs(place.top - that.data.cardTop) <= 2 && place.dir === that.data.arrow.dir) return;
            if (DEBUG) console.log('[guide] refine-apply step ' + (stepIndex + 1),
              'cardH(measured)=' + Math.round(cardH),
              'cardTop=' + place.top,
              'dir=' + place.dir,
              'gap=' + (place.top - Math.round(rect.bottom)));
            that.setData({ cardTop: place.top, arrow: place.arrow });
          })
          .exec();
      }, 60);
    },

    /**
     * 目标量不到 / 不完全可见时的兜底：卡片贴在屏幕下方（绝不压住顶部搜索框），无孔无箭头。
     * reason: missing（节点没量到）| no-target（选择器为空）| partial（目标被视口裁掉）| guard（测量无回调）
     */
    _fallbackCard(step, reason) {
      if (!this.data.visible) return;
      this._settled = true;
      const h = estimateCardHeight(step);
      const winH = this._winH();
      const top = Math.max(EDGE, Math.round(winH - EDGE - 24 - h));
      if (DEBUG) console.log('[guide] fallback cardTop=' + top,
        'reason=' + (reason || 'unknown'),
        'viewH=' + winH,
        'cardH(est)=' + h);
      this.setData({
        cardTop: top,
        cardReady: true,
        arrow: offArrow(),
        rings: [],
        mock: offMock()
      });
    },

    /**
     * optional 步的目标确实不存在（条件渲染未出现）：
     * 直接进下一步；如果它本来就是最后一步，就正常收尾（记完成 + triggerEvent('done')），
     * 不让遮罩停在「没有孔、也没有可指向对象」的空转状态。
     */
    _skipOptional(stepIndex) {
      if (!this.data.visible || this.data.index !== stepIndex) return;
      this._settled = true;
      this._noHole = true;
      if (stepIndex >= (this._steps || []).length - 1) {
        this._finish(true);
        return;
      }
      this._applyStep(stepIndex + 1);
    },

    /**
     * tabBar 步骤：
     *   · 先按真实 tabBar 尺寸（50px + 安全区）算出外框矩形，框四边完整落在屏幕内；
     *   · 卡片贴在框顶上方 14px，箭头朝下对准整条 bar 的水平中心；
     *   · 外框由独立的 .gl-tabframe 绘制（在 .gl-tabbar 之后渲染，压在 bar 背景之上）。
     */
    _layoutTabStep(stepIndex) {
      const step = (this._steps || [])[stepIndex];
      const winW = this._winW();
      const winH = this._winH();
      const safeBottom = this.data.safeBottom || 0;
      const barH = Math.round(50 + safeBottom);
      const frame = {
        on: true,
        left: 10,
        top: Math.max(EDGE, Math.round(winH - 10 - barH)),
        width: Math.max(0, Math.round(winW - 20)),
        height: barH
      };
      const estH = estimateCardHeight(step) + 12; // 首帧多留 12px，避免真实高度更大时压住外框
      const top = Math.max(EDGE, Math.round(frame.top - CARD_GAP - estH));
      this._settled = true;
      this._noHole = false;
      if (DEBUG) console.log('[guide] placed step ' + (stepIndex + 1) + ' tab',
        'target.top=' + frame.top,
        'target.bottom=' + (frame.top + frame.height),
        'viewH=' + winH,
        'cardH(est)=' + estH,
        'cardTop=' + top,
        'dir=down');
      const cardW = winW - CARD_SIDE * 2;
      const arrow = { on: true, dir: 'down', left: Math.round(cardW / 2) };
      this.setData({
        hole: offHole(),
        mock: offMock(),
        tabFrame: frame,
        cardTop: top,
        arrow: arrow,
        cardReady: true
      }, () => {
        const that = this;
        clearTimeout(this._refineTimer);
        this._refineTimer = setTimeout(() => {
          that._refineTimer = null;
          that.createSelectorQuery()
            .select('.gl-card')
            .boundingClientRect((card) => {
              if (!that.data.visible || that.data.index !== stepIndex) return;
              const cardH = card && card.height;
              if (DEBUG) console.log('[guide] refine step ' + (stepIndex + 1) + ' tab',
                'target.top=' + frame.top,
                'target.bottom=' + (frame.top + frame.height),
                'viewH=' + winH,
                'cardH(measured)=' + Math.round(cardH || 0),
                'cardTop=' + that.data.cardTop,
                'dir=down');
              if (!card || !card.width || card.width < 100) return;
              if (!cardH || cardH < 100 || cardH > winH * 0.75) return;
              const cw = winW - CARD_SIDE * 2;
              that.setData({
                cardTop: Math.max(EDGE, Math.round(frame.top - CARD_GAP - cardH)),
                arrow: { on: true, dir: 'down', left: Math.round(cw / 2) }
              });
            })
            .exec();
        }, 60);
      });
    },

    onNext() {
      if (this.data.index >= this.data.total - 1) {
        this._finish(false);
        return;
      }
      this._applyStep(this.data.index + 1);
    },

    onPrev() {
      if (this.data.index > 0) this._applyStep(this.data.index - 1);
    },

    onSkip() {
      this._finish(true);
    },

    _finish(skipped) {
      if (this._feature) guide.markDone(this._feature);
      const feature = this._feature;
      this._close();
      this.triggerEvent('done', { feature: feature, skipped: !!skipped });
    },

    _close() {
      this._clearTimers();
      this.setData({
        visible: false,
        tabbarOn: false,
        hole: offHole(),
        rings: [],
        arrow: offArrow(),
        mock: offMock(),
        tabFrame: offFrame(),
        cardReady: false
      });
      this._restoreTabBar();
    },

    _hideTabBar() {
      if (this._tabBar) return;
      try {
        const pages = getCurrentPages();
        const page = pages && pages[pages.length - 1];
        if (page && typeof page.getTabBar === 'function') {
          const tabBar = page.getTabBar();
          if (tabBar && typeof tabBar.setData === 'function') {
            this._tabBar = tabBar;
            // 记住原来的收起状态：文章浮层等场景可能本来就 hidden，
            // 结束时按原值恢复，避免把 tabBar 误放出来盖住浮层。
            this._tabBarPrevHidden = !!(tabBar.data && tabBar.data.hidden);
            tabBar.setData({ hidden: true });
          }
        }
      } catch (e) {}
    },

    _restoreTabBar() {
      const tabBar = this._tabBar;
      const prevHidden = this._tabBarPrevHidden;
      this._tabBar = null;
      this._tabBarPrevHidden = false;
      if (tabBar && typeof tabBar.setData === 'function') {
        try {
          tabBar.setData({ hidden: !!prevHidden });
        } catch (e) {}
      }
    }
  }
});
