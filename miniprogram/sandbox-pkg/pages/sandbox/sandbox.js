/**
 * 沙盘推演 · 页面控制器
 *
 * 职责边界：
 *   data/<battle>.js   —— 单场战役内容（阶段、事件、兵力、地形、城池）
 *   utils/sandbox-engine.js —— 纯 canvas 绘制，输入进度 p，输出画面
 *   本文件             —— 时间轴 / 播放 / 卡片 / 兵力条等 WXML 交互
 *
 * 战役通过路由参数 id 选择（缺省 anshi），阶段数由数据决定；
 * 切换战役重新进入本页，播放进度、折叠与卡片状态全部重置。
 */
var campaigns = require('../../data/campaigns');
var engineLib = require('../../utils/sandbox-engine');

var STAGE_MS = 5200;                 // 单阶段时长（与原型一致）
var KIND_CHAR = { march: '兵', siege: '攻', flip: '易', infight: '讧', raise: '立', fall: '亡', retreat: '退' };

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

/** 内讧减员：进入「余波」（动手之后）才开始收，余波结束定格。史料无具体兵力，只作象征收缩。 */
function infightAttr(e, local) {
  var k = local - e.t;
  if (k <= 0.18) return 0;
  return Math.min(1, (k - 0.18) / (0.32 - 0.18));
}

Page({
  data: {
    safeTop: 44,
    meta: {},
    stages: [],
    segs: [],
    stageIndex: 0,
    pct: 0,
    tipLeft: 2,
    tipTf: 'translate(0,0)',
    tipText: '',
    playing: false,
    dragging: false,
    ended: false,
    focusKey: '战前',
    focusText: '',
    stage: {
      kicker: '', title: '', seal: '', turn: '', why: '', src: '', attrNote: ''
    },
    events: [],
    forceRows: []
  },

  onLoad: function (options) {
    var id = (options && options.id) || 'anshi';
    var battle = campaigns.get(id) || campaigns.get('anshi');
    this._battle = battle;
    this._stages = battle.STAGES;
    this._total = this._stages.length;

    var stages = this._stages.map(function (s, i) {
      return { no: (i < 9 ? '0' : '') + (i + 1), label: s.label };
    });
    var segs = [];
    for (var i = 1; i < this._total; i++) segs.push(String(Math.round(i / this._total * 1000000) / 10000));

    this._p = 0;
    this._playing = false;
    this._dead = false;
    this._stageIdx = -1;
    this._evAi = -2;
    this._forceIdx = -1;
    this._uiTs = 0;
    this._tipTimer = 0;
    this._track = null;
    this.setData({
      meta: battle.META,
      stages: stages,
      segs: segs,
      focusText: battle.META.focusIntro || ''
    });
    if (battle.META.title) {
      wx.setNavigationBarTitle({ title: '沙盘推演 · ' + battle.META.title });
    }
    try {
      var sys = wx.getWindowInfo();
      this.setData({ safeTop: (sys && sys.statusBarHeight) || 44 });
    } catch (e) {}
  },

  onReady: function () {
    this._tick = this._tick.bind(this);
    this._initCanvas();
  },

  onShow: function () {
    // 从后台回来：保持暂停态，重画一帧，避免 canvas 内容被回收后空白
    if (this._engine && !this._playing) this._paint(this._p, false);
  },

  onHide: function () {
    this._setPlaying(false);
  },

  onUnload: function () {
    this._dead = true;
    this._setPlaying(false);
    if (this._tipTimer) clearTimeout(this._tipTimer);
  },

  /* ---------------- canvas 初始化 ---------------- */
  _initCanvas: function () {
    var self = this;
    this._initTries = (this._initTries || 0) + 1;
    wx.createSelectorQuery().in(this)
      .select('#sb-canvas')
      .fields({ node: true, size: true })
      .exec(function (res) {
        if (self._dead) return;
        var item = res && res[0];
        if (!item || !item.node) return;
        if (!item.width || !item.height) {
          // 布局尚未完成，最多重试 5 次
          if (self._initTries < 5) {
            setTimeout(function () { if (!self._dead) self._initCanvas(); }, 60);
          }
          return;
        }
        var dpr = 2;
        try {
          var win = wx.getWindowInfo();
          dpr = (win && win.pixelRatio) || 2;
        } catch (e) {}
        self._canvas = item.node;
        self._engine = engineLib.createEngine({
          canvas: item.node,
          battle: self._battle,
          width: item.width,
          height: item.height,
          dpr: dpr
        });
        self._paint(0, false);
        self._measureTrack();
        // 与原型一致：进入即播放
        self._setPlaying(true);
      });
  },

  _measureTrack: function () {
    var self = this;
    wx.createSelectorQuery().in(this)
      .select('.sb-track')
      .boundingClientRect(function (r) {
        if (r && r.width > 0) self._track = { left: r.left, width: r.width };
      })
      .exec();
  },

  /* ---------------- 绘制与 UI 同步 ---------------- */
  _paint: function (p, light) {
    if (!this._engine || this._dead) return;
    var info = this._engine.draw(p);
    var now = Date.now();

    if (info.stage !== this._stageIdx) {
      this._stageIdx = info.stage;
      this._applyStage(info.stage);
    }

    // 视点签 / 终局印：变化才 setData
    if (info.focusKey !== this.data.focusKey) this.setData({ focusKey: info.focusKey });
    if (info.focusText !== this.data.focusText) this.setData({ focusText: info.focusText });
    if (info.ended !== this.data.ended) this.setData({ ended: info.ended });

    this._syncEventState(info.stage, info.local);
    this._syncForce(info.stage, info.local);

    // 时间轴：播放时 80ms 一刷，拖动/点击时立即刷新
    if (!light || now - this._uiTs > 80) {
      this._uiTs = now;
      var pct = Math.round(p / this._total * 10000) / 100;
      this.setData({ pct: pct });
    }
  },

  _applyStage: function (idx) {
    var st = this._stages[idx];
    var max = Math.max.apply(null, [1].concat(st.nums.map(function (n) { return n.n || 0; })));

    var events = st.events.map(function (e, i) {
      return {
        id: 'ev' + i,
        y: KIND_CHAR[e.kind] || '事',
        time: e.time,
        who: e.who,
        text: e.text,
        cls: ''
      };
    });

    var rows = st.nums.map(function (n) {
      var unk = n.n == null;
      var w = unk ? (n.barW != null ? n.barW : 20)
                  : (n.n === 0 ? 0 : Math.max(4, (n.n / max) * 100));
      return {
        label: n.label,
        value: n.value,
        kind: n.kind,
        kindCls: n.kind === '史载' ? 'shi' : n.kind === '推算' ? 'tui' : 'none',
        w: w,
        baseW: w,
        unknown: unk,
        cut: !!n.carry,
        cutText: n.carry ? '减员·承上' : '减员',
        attrition: !!n.attrition,
        carry: !!n.carry
      };
    });

    this._forceIdx = -1;
    for (var i = 0; i < st.nums.length; i++) {
      if (st.nums[i].attrition || st.nums[i].carry) { this._forceIdx = i; break; }
    }
    this._evAi = -2;

    this.setData({
      stageIndex: idx,
      stage: {
        kicker: st.kicker,
        title: st.title,
        seal: st.seal,
        turn: st.turn,
        why: st.why,
        src: st.src,
        attrNote: st.attrNote || ''
      },
      events: events,
      forceRows: rows
    });
  },

  /** 事件节点随进度：已读 / 当前 / 未读。只在当前项变化时更新，避免每帧 setData。 */
  _syncEventState: function (idx, local) {
    var st = this._stages[idx];
    var ai = -1;
    st.events.forEach(function (e, i) { if (local >= e.t) ai = i; });
    if (ai === this._evAi) return;
    this._evAi = ai;

    var patch = {};
    var evs = this.data.events;
    for (var i = 0; i < evs.length; i++) {
      var cls = i === ai ? 'is-on' : (i < ai ? 'is-read' : '');
      if (evs[i].cls !== cls) patch['events[' + i + '].cls'] = cls;
    }
    if (Object.keys(patch).length) this.setData(patch);
  },

  /** 兵力条同步：内讧减员只收缩对应的叛军条；承接行直接按短条起步，不回跳。 */
  _syncForce: function (idx, local) {
    var fi = this._forceIdx;
    if (fi < 0) return;
    var row = this.data.forceRows[fi];
    if (!row) return;
    var st = this._stages[idx];
    var n = st.nums[fi];

    if (n.carry) {
      // 承接上一阶段减员：始终保持短条与「减员·承上」签
      if (!row.cut || row.w !== n.carryW) {
        var p0 = {};
        p0['forceRows[' + fi + '].w'] = n.carryW || 20;
        p0['forceRows[' + fi + '].cut'] = true;
        this.setData(p0);
      }
      return;
    }

    var factor = 1, cut = false;
    st.events.forEach(function (e) {
      if (e.kind !== 'infight') return;
      var a = infightAttr(e, local);
      if (a > 0) cut = true;
      factor *= 1 - (row.unknown ? 0.35 : 0.12) * a;
    });
    var w = Math.round(row.baseW * factor * 10) / 10;
    if (Math.abs(w - row.w) < 0.1 && cut === row.cut) return;

    var patch = {};
    patch['forceRows[' + fi + '].w'] = w;
    patch['forceRows[' + fi + '].cut'] = cut;
    this.setData(patch);
  },

  /* ---------------- 播放 ---------------- */
  _setPlaying: function (on) {
    if (this._dead) on = false;
    if (this._playing === on) return;
    this._playing = on;
    this._lastTs = 0;
    this.setData({ playing: on });
    if (on) {
      if (!this._canvas || !this._engine) {
        this._playing = false;
        this.setData({ playing: false });
        return;
      }
      if (this._p >= this._total) this._p = 0;
      this._raf = this._canvas.requestAnimationFrame(this._tick);
    }
  },

  _tick: function (ts) {
    if (!this._playing) return;
    if (!this._lastTs) this._lastTs = ts;
    var dt = Math.min(64, ts - this._lastTs);   // 切后台回来时钳住大步长
    this._lastTs = ts;
    this._p = Math.min(this._total, this._p + dt / STAGE_MS);
    this._paint(this._p, true);
    if (this._p >= this._total) {
      this._setPlaying(false);
      this._paint(this._total, false);
      return;
    }
    this._raf = this._canvas.requestAnimationFrame(this._tick);
  },

  onTogglePlay: function () {
    if (!this._engine) return;
    this._setPlaying(!this._playing);
  },

  onTapLabel: function (e) {
    var i = Number(e.currentTarget.dataset.i);
    if (isNaN(i)) return;
    this._setPlaying(false);
    this._seek(i + 0.02);
    this._flashTip(i + 0.02);
  },

  /* ---------------- 时间轴拖动 ---------------- */
  _posToP: function (clientX) {
    var r = this._track;
    if (!r) return null;
    return clamp((clientX - r.left) / r.width, 0, 1) * this._total;
  },

  _seek: function (p) {
    this._p = clamp(p, 0, this._total);
    this._paint(this._p, false);
  },

  _showTip: function (p) {
    var i = Math.min(this._total - 1, Math.floor(clamp(p, 0, this._total)));
    var pct = p / this._total * 100;
    var left = clamp(pct, 2, 98);
    var tf = pct < 12 ? 'translate(0,0)' : pct > 88 ? 'translate(-100%,0)' : 'translate(-50%,0)';
    this.setData({
      dragging: true,
      tipLeft: left,
      tipTf: tf,
      tipText: (i < 9 ? '0' : '') + (i + 1) + ' · ' + this._stages[i].label
    });
  },

  _hideTip: function () {
    if (this._tipTimer) { clearTimeout(this._tipTimer); this._tipTimer = 0; }
    this.setData({ dragging: false });
  },

  _flashTip: function (p) {
    this._showTip(p);
    if (this._tipTimer) clearTimeout(this._tipTimer);
    var self = this;
    this._tipTimer = setTimeout(function () { self._hideTip(); }, 900);
  },

  onTrackStart: function (e) {
    if (this._playing) this._setPlaying(false);
    if (!this._track) this._measureTrack();
    var x = e.touches && e.touches[0] ? e.touches[0].clientX : null;
    if (x == null) return;
    var p = this._posToP(x);
    if (p == null) return;
    this._seek(p);
    this._showTip(p);
  },

  onTrackMove: function (e) {
    if (!this.data.dragging) return;
    var x = e.touches && e.touches[0] ? e.touches[0].clientX : null;
    if (x == null) return;
    var p = this._posToP(x);
    if (p == null) return;
    this._seek(p);
    this._showTip(p);
  },

  onTrackEnd: function (e) {
    if (!this.data.dragging) return;
    var x = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : null;
    if (x != null) {
      var p = this._posToP(x);
      if (p != null) this._seek(p);
    }
    this._hideTip();
  },

  onBack: function () {
    this._setPlaying(false);
    wx.navigateBack({
      delta: 1,
      fail: function () { wx.switchTab({ url: '/pages/query/query' }); }
    });
  },

  onShareAppMessage: function () {
    return {
      title: (this._battle.META.title || '沙盘推演') + ' · 沙盘推演',
      path: '/sandbox-pkg/pages/sandbox/sandbox?id=' + this._battle.META.id
    };
  }
});
