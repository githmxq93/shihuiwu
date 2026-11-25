const echarts = require('./echarts');

Component({
  properties: {
    ec: {
      type: Object,
      value: {}
    }
  },

  data: {
    isReady: false
  },

  observers: {
    'ec': function (ec) {
      // 如果 canvas 已就绪但图表未创建，且 ec.onInit 已可用，则立即初始化
      if (this._canvas && !this._chart && ec && ec.onInit) {
        this._initWithEc(ec);
      } else if (ec && ec.onInit && !this._canvas) {
        // canvas 尚未就绪，暂存 ec 配置，待 canvas 就绪后在 init() 中使用
        this._pendingEc = ec;
      }
    }
  },

  lifetimes: {
    attached() {
      this._chart = null;
      this._width = 0;
      this._height = 0;
      this._canvas = null;
      this._pendingEc = null;
      this._pinchDist = 0;
      this._pinchBase = 0;   // 捏合起点指距，算「总倍数」用
      this._pinchSent = 0;   // 本次捏合已派发的缩放档位数
      this._pinching = false;
    },

    ready() {
      this.init();
    },

    detached() {
      if (this._chart) {
        this._chart.dispose();
        this._chart = null;
      }
    }
  },

  methods: {
    init(retryCount) {
      if (retryCount === undefined) retryCount = 0;
      const query = this.createSelectorQuery();
      query.select('#ec-canvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res || !res[0] || !res[0].node) {
            // 如果 canvas 未就绪，延迟重试（最多 5 次）
            if (retryCount < 5) {
              setTimeout(() => {
                this.init(retryCount + 1);
              }, 200);
            }
            return;
          }
          const canvas = res[0].node;
          const dpr = wx.getWindowInfo().pixelRatio || 2;
          const width = res[0].width || 300;
          const height = res[0].height || 400;

          canvas.width = width * dpr;
          canvas.height = height * dpr;

          this._width = width;
          this._height = height;
          this._dpr = dpr;
          this._canvas = canvas;

          // 尝试立即初始化
          // 优先使用 _pendingEc（observer 暂存的），否则用当前的 ec 属性
          const ec = this._pendingEc || this.properties.ec;
          if (ec && ec.onInit) {
            this._initWithEc(ec);
            this._pendingEc = null;
          }
          // 否则，observer 会在 ec.onInit 可用时自动调用

          this.setData({ isReady: true });
        });
    },

    _initWithEc(ec) {
      const canvas = this._canvas;
      const width = this._width;
      const height = this._height;
      const dpr = this._dpr;

      // 微信小程序 type="2d" canvas 缺少 DOM 事件方法，
      // ECharts/zrender 初始化时需要它们，此处补上空实现
      if (!canvas.addEventListener) {
        canvas.addEventListener = function () {};
      }
      if (!canvas.removeEventListener) {
        canvas.removeEventListener = function () {};
      }
      if (!canvas.attachEvent) {
        canvas.attachEvent = function () {};
      }
      if (!canvas.detachEvent) {
        canvas.detachEvent = function () {};
      }
      if (!canvas.dispatchEvent) {
        canvas.dispatchEvent = function () {};
      }
      // 补充 DOM 兼容属性，zrender/ECharts 在初始化时可能访问它们
      canvas.nodeType = 1;
      canvas.tagName = 'CANVAS';
      if (!canvas.style) {
        canvas.style = {};
      }
      if (!canvas.parentNode) {
        canvas.parentNode = { nodeType: 1 };
      }
      if (!canvas.getAttribute) {
        canvas.getAttribute = function () { return null; };
      }
      if (!canvas.dataset) {
        canvas.dataset = {};
      }
      if (canvas.clientWidth === undefined) {
        canvas.clientWidth = width;
      }
      if (canvas.clientHeight === undefined) {
        canvas.clientHeight = height;
      }

      try {
        ec.onInit(canvas, width, height, dpr);
        this._chart = canvas._chart || echarts.getInstanceByDom(canvas);
        if (!this._chart) {
          console.error('[ec-canvas] Failed to get chart instance');
        }
      } catch (err) {
        console.error('[ec-canvas] Init error:', err);
      }
    },

    _wrapEvent(evt) {
      // zrender 内部会调用 preventDefault/stopPropagation
      // 但微信 touch 事件对象没有这些方法
      if (!evt.preventDefault) {
        evt.preventDefault = function () {};
      }
      if (!evt.stopPropagation) {
        evt.stopPropagation = function () {};
      }
      return evt;
    },

    // 获取两指距离（坐标兼容：canvas 触摸事件有 x/y，部分场景回退 clientX/clientY）
    _touchPoint(touch) {
      return {
        x: (touch.x != null) ? touch.x : (touch.clientX != null ? touch.clientX : 0),
        y: (touch.y != null) ? touch.y : (touch.clientY != null ? touch.clientY : 0)
      };
    },

    _pinchDistance(touches) {
      var p0 = this._touchPoint(touches[0]);
      var p1 = this._touchPoint(touches[1]);
      var dx = p0.x - p1.x;
      var dy = p0.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
    },

    touchStart(e) {
      if (!this._chart) return;
      const touches = e.touches;
      if (!touches || touches.length === 0) return;
      const handler = this._chart.getZr().handler;

      if (touches.length >= 2) {
        // 双指触摸开始：先结束可能的单指拖拽，再进入捏合缩放。
        // _pinchBase 固定为本手势起点指距，_pinchSent 记录已派发的缩放档位数。
        // 结束单指拖拽（补全 zrX/zrY，否则 zrender 拿到 undefined 坐标会算错命中）
        var sp = this._touchPoint(touches[0]);
        handler.dispatch('mouseup', this._wrapEvent({ zrX: sp.x, zrY: sp.y }));
        var base = this._pinchDistance(touches);
        this._pinchDist = base;
        this._pinchBase = base;
        this._pinchSent = 0;
        this._pinching = true;
        return;
      }

      // 单指：派发拖拽事件
      var p = this._touchPoint(touches[0]);
      handler.dispatch('mousedown', this._wrapEvent({
        zrX: p.x, zrY: p.y
      }));
      handler.dispatch('mousemove', this._wrapEvent({
        zrX: p.x, zrY: p.y
      }));
    },

    touchMove(e) {
      if (!this._chart) return;
      const touches = e.touches;
      if (!touches || touches.length === 0) return;
      const handler = this._chart.getZr().handler;

      if (touches.length >= 2 && this._pinching && this._pinchBase > 0) {
        // 双指捏合：按累计比例换算成「档位」再派发 mousewheel
        var dist = this._pinchDistance(touches);
        if (!dist) return;
        this._pinchDist = dist;

        // 1 档 = 缩放 1.1 倍。旧实现每次 touchmove 只按方向派发 ±1，而捏合时
        // touchmove 约 60 次/秒，1 秒就是 1.1^60 ≈ 300 倍，会瞬间撞到 scaleLimit
        // 上下限 —— 表现为「要么太大、要么太小、缩放不好控制」。
        // 现在按累计倍数补档：指距翻倍 ≈ 7.3 档 ≈ 1.1^7.3 = 2 倍缩放，与手指动作
        // 严格等比；手指停住就不再产生新差额，也就不会再继续放大。
        var want = Math.log(dist / this._pinchBase) / Math.log(1.1);
        var diff = want - this._pinchSent;
        var steps = diff > 0 ? Math.floor(diff) : Math.ceil(diff);
        if (steps === 0) return;
        if (steps > 3) steps = 3;   // 单帧最多补 3 档，避免一帧内连续 dispatch 造成卡顿
        if (steps < -3) steps = -3;
        this._pinchSent += steps;   // 没补完的差额留到下一帧继续补，自动收敛

        var p0 = this._touchPoint(touches[0]);
        var p1 = this._touchPoint(touches[1]);
        var cx = (p0.x + p1.x) / 2;
        var cy = (p0.y + p1.y) / 2;

        // zrDelta 固定取 ±1：zrender 的 RoamController 以 |wheelDelta| 分档
        // （≤1 → 1.1x，≤3 → 1.2x，>3 → 1.4x），只有 ±1 才是稳定的 10% 步长。
        var delta = steps > 0 ? 1 : -1;
        var count = Math.abs(steps);
        for (var k = 0; k < count; k++) {
          handler.dispatch('mousewheel', this._wrapEvent({
            zrX: cx, zrY: cy,
            zrDelta: delta
          }));
        }
        return;
      }

      // 单指：派发拖拽事件
      var p = this._touchPoint(touches[0]);
      handler.dispatch('mousemove', this._wrapEvent({
        zrX: p.x, zrY: p.y
      }));
    },

    touchEnd(e) {
      if (!this._chart) return;
      const touches = e.changedTouches;
      if (!touches || touches.length === 0) return;

      // 收尾捏合状态。只有「所有手指都离开」时才真正复位 _pinching：
      // 双指捏合若先松一根手指，此时 remaining>0，_pinching 必须继续为 true，
      // 否则最后一根手指离开时会走到下面的 click 派发，拿捏合前残留的 _downEl
      // 比对，凭空选中一个节点。
      var remaining = (e.touches && e.touches.length) || 0;
      var wasPinching = this._pinching;
      if (remaining === 0) {
        this._pinching = false;
        this._pinchDist = 0;
        this._pinchBase = 0;
        this._pinchSent = 0;
      }

      var p = this._touchPoint(touches[0]);
      const handler = this._chart.getZr().handler;
      handler.dispatch('mouseup', this._wrapEvent({
        zrX: p.x, zrY: p.y
      }));
      // 捏合手势或仍有手指未离开：只收尾，不派发 click
      if (wasPinching || remaining > 0) return;
      // 补派发 click。ECharts 6 / zrender 6 起，click 是「必须显式派发」的独立事件，
      // 不再由 mousedown + mouseup 合成：zrender 的 Handler 只在收到 click 派发时才执行
      // dispatchToElement(..., 'click')，而 chart.on('click') 正挂在这一层。
      // 浏览器有原生 click 事件，小程序没有 —— 缺这一步则关系图点节点、地图点省份
      // 都完全无反应。
      // 拖动不会误触发：Handler 内部以「位移 ≤ 4px 且 mousedown/mouseup 命中同一元素」
      // 双重校验拦掉，与浏览器行为一致。
      handler.dispatch('click', this._wrapEvent({
        zrX: p.x, zrY: p.y
      }));
    }
  }
});
