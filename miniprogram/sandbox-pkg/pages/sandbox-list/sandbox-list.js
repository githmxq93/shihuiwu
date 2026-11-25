/**
 * 沙盘推演 · 战役列表
 * ---------------------------------------------------------------------------
 * 头部沿用「中外对照」（parallel-pkg/pages/compare）的样式与交互：
 *   深色统计卡 → 搜索框 → 年代时间轴 → 上滑三态收起（0 全展 / 1 收卡与搜索 / 2 时间轴细条）。
 * 数据只来自 data/campaigns.js（按年代升序），不新增写死条目。
 *
 * 时间轴取舍与对照页一致：
 *   - 密度柱用纯 view 画（不上 canvas，避免原生层压住内容）；
 *   - 拖动时 touchmove 交给 axis.wxs 直接改游标 left，不走 setData；
 *   - 松手后才定位卡片并滚动；滚动时用已量好的卡片偏移反推当前场次。
 *
 * 收起阈值（迟滞，防临界抖动）：
 *   下滚：≥56px → 1；≥200px → 2
 *   上滚：<150px → 1；<26px → 0；≤10px 直接 0
 */
var campaigns = require('../../data/campaigns');
var navTo = require('../../../utils/nav').navTo;

function fmtYear(y) {
  return y < 0 ? '前' + (-y) : String(y);
}

// 搜索年份：前221 / 公元前221年 / -221 / 755 / 755年
function parseYear(raw) {
  var s = String(raw == null ? '' : raw).trim();
  var m = s.match(/^公元前\s*(\d{1,4})\s*年?$/) || s.match(/^前\s*(\d{1,4})\s*年?$/) || s.match(/^-\s*(\d{1,4})$/);
  if (m) return -m[1];
  m = s.match(/^(\d{1,4})\s*年?$/);
  if (m) return m[1] * 1;
  return null;
}

function clamp(v, a, b) {
  return v < a ? a : (v > b ? b : v);
}

Page({
  data: {
    // 顶部导航与「中外对照」一致：nav-bar 组件 + 页面顶部留出状态栏与 44px 栏高
    safeAreaTop: 44,
    navBarHeight: 96,

    // 统计卡
    meta: { count: 0, stages: 0, span: 0, spanText: '' },
    dist: [],

    // 搜索
    query: '',
    searchFocus: false,
    hint: '',
    empty: false,

    // 时间轴
    ticks: [],
    bars: [],
    barW: 0.6,
    trackLeft: 0,
    trackWidth: 0,
    activeIndex: 0,
    activeLabel: '',
    activeId: '',
    activeTitle: '',
    activeYears: '',
    activePeriod: '',
    thumbPct: 0,

    // 拖动预览
    dragOn: false,

    // 列表
    view: [],
    viewCount: 0,

    // 头部收起
    headStage: 0,
    headMainH: 0,

    // 程序化滚动
    scrollInto: '',
    scrollTopTo: 0,
    scrollAnim: true
  },

  onLoad: function () {
    this._scrollTop = 0;
    this._dragging = false;
    this._headAt = 0;
    this._headLock = 0;
    this._dragIdx = -1;
    this._followTimer = null;
    this._offMap = null;

    this._all = campaigns.list.map(function (item, i) {
      return {
        id: item.id,
        ord: i,
        no: (i < 9 ? '0' : '') + (i + 1),
        title: item.title,
        years: item.years,
        yearUnit: item.yearUnit || '',
        period: item.period || '',
        hook: item.hook || '',
        stageCount: item.stageCount,
        yearValue: item.yearValue || 0,
        yearShort: fmtYear(item.yearValue || 0)
      };
    });

    this._buildMeta();
    this._buildAxis();
    // 跟手滚动与搜索都要读当前可见列表，首屏就把它指到全量，不能只在 _renderList 里赋
    this._view = this._all.slice();

    this.setData({
      view: this._all.slice(),
      viewCount: this._all.length,
      hint: '共 ' + this.data.meta.count + ' 场 · ' + this.data.meta.stages + ' 阶段',
      activeLabel: this._all.length ? this._all[0].yearShort : '',
      activeId: this._all.length ? this._all[0].id : '',
      activeTitle: this._all.length ? this._all[0].title : '',
      activeYears: this._all.length ? this._all[0].years + this._all[0].yearUnit : '',
      activePeriod: this._all.length ? this._all[0].period : ''
    });

    var statusBar = 44;
    try {
      statusBar = (getApp() && getApp().globalData && getApp().globalData.statusBarHeight) ||
        (wx.getWindowInfo() && wx.getWindowInfo().statusBarHeight) || 44;
    } catch (e) {}
    this.setData({ safeAreaTop: statusBar, navBarHeight: statusBar + 52 });

    var that = this;
    setTimeout(function () {
      that._measureTrack();
      that._measureHead(false);
      // 首屏就量一次卡片位置，第一次点/拖时间轴才能按「留余量」的落点滚动
      that._scheduleMeasure(200);
    }, 150);
  },

  onReady: function () {
    this._measureTrack();
  },

  onUnload: function () {
    if (this._qTimer) clearTimeout(this._qTimer);
    if (this._mTimer) clearTimeout(this._mTimer);
    if (this._followTimer) clearTimeout(this._followTimer);
  },

  /* ═════════ 概览与时间轴预计算 ═════════ */
  _buildMeta: function () {
    var all = this._all;
    if (!all.length) return;
    var stages = 0;
    var minY = all[0].yearValue;
    var maxY = all[0].yearValue;
    all.forEach(function (it) {
      stages += it.stageCount;
      if (it.yearValue < minY) minY = it.yearValue;
      if (it.yearValue > maxY) maxY = it.yearValue;
    });

    // 世纪分布条：每 100 年一格，时间跨度内均匀排布，格内用透明度表示场次密度
    var b0 = Math.floor(minY / 100) * 100;
    var b1 = Math.floor(maxY / 100) * 100;
    var bins = [];
    var b;
    for (b = b0; b <= b1; b += 100) bins.push({ y: b, count: 0 });
    all.forEach(function (it) {
      var k = (Math.floor(it.yearValue / 100) * 100 - b0) / 100;
      if (bins[k]) bins[k].count++;
    });
    var max = 1;
    bins.forEach(function (x) { if (x.count > max) max = x.count; });
    var dist = bins.map(function (x) {
      return { y: x.y, op: x.count ? (0.26 + 0.74 * x.count / max).toFixed(2) : 0.05 };
    });

    this.setData({
      meta: {
        count: all.length,
        stages: stages,
        span: maxY - minY,
        spanText: fmtYear(minY) + ' — ' + fmtYear(maxY)
      },
      dist: dist
    });
  },

  _buildAxis: function () {
    var all = this._all;
    var N = all.length;
    if (!N) return;
    var step = N > 1 ? 100 / (N - 1) : 100;

    // 柱宽按场距的 55% 取，既留缝又不至于细到看不见
    var barW = clamp(step * 0.55, 0.25, 1.1).toFixed(3);

    // 柱高随该场阶段数变化，至少在轨道上看得见
    var bars = all.map(function (it, i) {
      var h = clamp(18 + it.stageCount * 7, 18, 64);
      return { i: i, l: (N > 1 ? i * step : 0).toFixed(2), h: h };
    });

    // 刻度：首、尾与四分位所在场
    var idxs = [0, Math.round((N - 1) * 0.25), Math.round((N - 1) * 0.5), Math.round((N - 1) * 0.75), N - 1];
    var seen = {};
    var ticks = [];
    idxs.forEach(function (i) {
      if (seen[i]) return;
      seen[i] = 1;
      ticks.push({ pct: (N > 1 ? i / (N - 1) * 100 : 0).toFixed(2), label: all[i].yearShort });
    });

    this.setData({ bars: bars, barW: barW, ticks: ticks });
  },

  /* ═════════ 搜索与过滤 ═════════ */
  _match: function (it, q) {
    if (it.title.indexOf(q) >= 0) return true;
    if (it.years.indexOf(q) >= 0) return true;
    if (it.period && it.period.indexOf(q) >= 0) return true;
    return false;
  },

  // 年代定位：优先起讫年完全相等的场次，否则取最近的一场
  _nearestYear: function (y) {
    var best = null;
    var bd = Infinity;
    this._all.forEach(function (it) {
      var d = Math.abs(it.yearValue - y);
      if (d === 0) {
        best = it;
        bd = 0;
      } else if (bd !== 0 && d < bd) {
        bd = d;
        best = it;
      }
    });
    return best;
  },

  /**
   * 重建可见列表。
   * locateId 为空：过滤/清空后回到列表顶部；
   * locateId 有值：等列表渲染完再滚到该卡片（年代搜索命中时）。
   */
  _renderList: function (locateId) {
    var q = String(this.data.query || '').trim();
    var yq = q ? parseYear(q) : null;
    var view = [];
    var target = null;
    var that = this;

    if (!q) {
      view = this._all.slice();
    } else {
      this._all.forEach(function (it) {
        if (that._match(it, q)) view.push(it);
      });
      if (yq != null) {
        target = this._nearestYear(yq);
        if (target) {
          var found = false;
          for (var k = 0; k < view.length; k++) {
            if (view[k].id === target.id) { found = true; break; }
          }
          if (!found) {
            view.push(target);
            view.sort(function (a, b) { return a.ord - b.ord; });
          }
        }
      }
    }

    var hint;
    if (!q) {
      hint = '共 ' + this.data.meta.count + ' 场 · ' + this.data.meta.stages + ' 阶段';
    } else if (yq != null && target) {
      hint = '定位 · ' + target.yearShort + ' · ' + target.title;
    } else {
      hint = '命中 ' + view.length + ' 场';
    }

    this._view = view;
    // 列表换了一组卡片，旧偏移全部失效：量到新偏移前不能拿旧值算落点
    this._offMap = null;
    var payload = {
      view: view,
      viewCount: view.length,
      empty: !view.length,
      hint: hint,
      scrollAnim: false
    };
    // 过滤后先回到顶部，避免停留在一个已经不存在的滚动位置
    payload.scrollInto = locateId ? '' : (view.length ? 'c' + view[0].id : '');

    this.setData(payload, function () {
      that._scheduleMeasure(160);
      if (locateId) {
        // 定位到目标场次时，游标 / 摘要年份同步跳过去（不等滚动监听回填）
        for (var k = 0; k < that._all.length; k++) {
          if (that._all[k].id === locateId) { that._setActive(k, true); break; }
        }
        that._scrollTo(locateId);
      } else if (!view.length) {
        that._setActive(0, true);
      } else if (q) {
        // 名称搜索命中：选中态要落到第一条命中场次。
        // 只过滤不改选中会出现「列表只剩一条却没有加深卡」。
        for (var h = 0; h < that._all.length; h++) {
          if (that._all[h].id === view[0].id) { that._setActive(h, true); break; }
        }
      }
    });
  },

  // 拖轴时恢复全量列表：不清 scrollInto，列表交给跟手滚动接管，避免拖轴瞬间先跳回顶部
  _restoreAll: function (done) {
    var that = this;
    this._view = this._all.slice();
    this._offMap = null;
    this.setData({
      query: '',
      searchFocus: false,
      view: this._view,
      viewCount: this._view.length,
      empty: false,
      hint: '共 ' + this.data.meta.count + ' 场 · ' + this.data.meta.stages + ' 阶段'
    }, function () {
      that._scheduleMeasure(120);
      if (done) done();
    });
  },

  onSearchInput: function (e) {
    var v = e.detail.value || '';
    if (this._qTimer) clearTimeout(this._qTimer);
    var that = this;
    this._qTimer = setTimeout(function () {
      var p = { query: v };
      if (!that.data.searchFocus) p.searchFocus = true;
      that.setData(p, function () {
        var yq = String(v).trim() ? parseYear(String(v).trim()) : null;
        var t = yq != null ? that._nearestYear(yq) : null;
        that._renderList(t ? t.id : '');
      });
    }, 160);
  },

  onSearchConfirm: function (e) {
    if (this._qTimer) clearTimeout(this._qTimer);
    var v = (e.detail && e.detail.value) || this.data.query;
    if (wx.hideKeyboard) wx.hideKeyboard();
    var that = this;
    this.setData({ query: v, searchFocus: false }, function () {
      var yq = String(v).trim() ? parseYear(String(v).trim()) : null;
      var t = yq != null ? that._nearestYear(yq) : null;
      that._renderList(t ? t.id : '');
    });
  },

  onSearchFocus: function () {
    var p = { searchFocus: true };
    // 聚焦输入时强制展开，输入过程中绝不收起
    if (this.data.headStage) {
      p.headStage = 0;
      this._headLock = Date.now() + 600;
    }
    this.setData(p);
  },

  onSearchBlur: function () {
    this.setData({ searchFocus: false });
  },

  onClearSearch: function () {
    if (this._qTimer) clearTimeout(this._qTimer);
    // 清空即视为退出搜索：收键盘并解除「聚焦不收」的锁
    if (wx.hideKeyboard) wx.hideKeyboard();
    var that = this;
    this.setData({ query: '', searchFocus: false }, function () {
      that._renderList('');
      that._setActive(0, true);
      that.setData({ scrollInto: '' });
      setTimeout(function () {
        that.setData({ scrollInto: that._all.length ? 'c' + that._all[0].id : '' });
      }, 40);
    });
  },

  /* ═════════ 列表交互 ═════════ */
  onTapItem: function (e) {
    var id = e.currentTarget.dataset.id;
    if (!id) return;
    navTo('/sandbox-pkg/pages/sandbox/sandbox?id=' + id);
  },

  onBodyScroll: function (e) {
    this._scrollTop = e.detail.scrollTop;
    if (this._dragging) return;
    // 只做头部三态收起：选中态与滚动位置彻底解耦，
    // 手动上下滑列表不改高亮、不改时间轴游标
    this._applyScrollHead(this._scrollTop);
  },

  /* ═════════ 头部三态收起 ═════════ */
  _applyScrollHead: function (top) {
    var now = Date.now();
    if (now - (this._headAt || 0) < 90) return;
    this._headAt = now;
    // 拖时间轴、搜索框聚焦、刚定位后短暂锁定：都不自动收
    if (this._dragging || this.data.searchFocus) return;
    if (now < this._headLock) return;
    var s = this.data.headStage;
    var t = s;
    if (top <= 10) t = 0;
    else if (s === 0 && top >= 56) t = 1;
    else if (s === 1 && top >= 200) t = 2;
    else if (s === 2 && top < 150) t = 1;
    else if (s === 1 && top < 26) t = 0;
    if (t !== s) this._setHeadStage(t);
  },

  _setHeadStage: function (s, lockMs) {
    if (s === this.data.headStage) return;
    if (lockMs) this._headLock = Date.now() + lockMs;
    this.setData({ headStage: s });
  },

  onHeadTap: function () {
    if (this.data.headStage !== 2) return;
    this._setHeadStage(0, 600);
  },

  // 头部高度只量一次（布局稳定后）：写成定高，height 才能从 px 平滑过渡到 0
  _measureHead: function (force) {
    var that = this;
    if (this.data.headStage) return;
    if (force && this.data.headMainH) {
      this.setData({ headMainH: 0 }, function () { that._measureHead(false); });
      return;
    }
    wx.createSelectorQuery().in(this).select('.sl-headmain').boundingClientRect(function (r) {
      if (!r || !r.height || that.data.headStage) return;
      var h = Math.round(r.height);
      if (h > 0 && Math.abs(h - that.data.headMainH) > 1) that.setData({ headMainH: h });
    }).exec();
  },

  /* ═════════ 时间轴：view 密度柱 + WXS 逐帧拖动 ═════════ */
  _measureTrack: function () {
    var that = this;
    wx.createSelectorQuery().in(this).select('.tl-bars').boundingClientRect(function (r) {
      if (!r || !r.width) return;
      that._track = r;
      // 拖动中不 setData：否则会重渲染游标内联 style，把 WXS 刚写的游标位置打回去
      if (that._dragging) return;
      var left = Math.round(r.left);
      var width = Math.round(r.width);
      if (left !== that.data.trackLeft || width !== that.data.trackWidth) {
        that.setData({ trackLeft: left, trackWidth: width });
      }
    }).exec();
  },

  _axisIndex: function (clientX) {
    var r = this._track || { left: this.data.trackLeft, width: this.data.trackWidth };
    if (!r || !r.width || !this._all.length) return null;
    var ratio = clamp((clientX - r.left) / r.width, 0, 1);
    return Math.round(ratio * (this._all.length - 1));
  },

  _previewAt: function (i) {
    if (i == null || i < 0) return;
    var it = this._all[i];
    if (!it) return;
    var p = {};
    if (!this.data.dragOn) p.dragOn = true;
    var moved = i !== this._dragIdx;
    if (moved) {
      this._dragIdx = i;
      // 拖动中只更新游标与时间轴/预览文案，不动 activeId：
      // 逐张切换高亮再叠加列表滚动，视觉上就是一片卡轮流闪。
      p.activeIndex = i;
      p.activeLabel = it.yearShort;
      p.activeTitle = it.title;
      p.activeYears = it.years + it.yearUnit;
      p.activePeriod = it.period;
    }
    if (p.dragOn || moved) this.setData(p);
    if (moved) this._settle();
  },

  /**
   * 跟手落点：手指停稳 180ms 才落一次「高亮 + 列表滚动」。
   * 快速划过时中间那些卡既不亮也不滚，只有停顿处和松手后的终态会被选中。
   */
  _settle: function () {
    var that = this;
    if (this._followTimer) clearTimeout(this._followTimer);
    this._followTimer = setTimeout(function () {
      that._followTimer = null;
      that._followCard(that._dragIdx);
    }, 180);
  },

  _followCard: function (i) {
    if (!this._dragging || i == null) return;
    var it = this._all[i];
    if (!it) return;
    var v = this._view || [];
    for (var k = 0; k < v.length; k++) {
      if (v[k].id === it.id) {
        // 高亮与滚动同帧落下，目标卡一出现就是选中态
        var p = {};
        if (this.data.activeId !== it.id) p.activeId = it.id;
        if (p.activeId != null) this.setData(p);
        this._scrollTo(it.id);
        return;
      }
    }
  },

  // WXS 每跨过一场 callMethod 进来一次
  onAxisPreview: function (e) {
    if (!this._dragging) return;
    var i = e && e.i;
    if (i == null) return;
    this._wxsAt = Date.now();
    this._previewAt(i);
  },

  onAxisStart: function (e) {
    this._dragging = true;
    this._dragAt = 0;
    this._dragIdx = -1;
    if (this._followTimer) {
      clearTimeout(this._followTimer);
      this._followTimer = null;
    }
    this._measureTrack();
    var t = e && e.touches && e.touches[0];
    var i = t ? this._axisIndex(t.clientX) : null;
    var that = this;
    // 搜索过滤中直接拖轴：先恢复全量列表，否则目标卡不在渲染树里，跟手滚动会落空
    if (this.data.query) {
      this._restoreAll(function () {
        if (i != null) that._previewAt(i);
        else if (!that.data.dragOn) that.setData({ dragOn: true });
      });
      return;
    }
    if (i != null) this._previewAt(i);
    else if (!this.data.dragOn) this.setData({ dragOn: true });
  },

  // catchtouchmove 只负责拦住页面滚动；150ms 内没收到 WXS 通知时兜底算一次
  onAxisHold: function (e) {
    if (!this._dragging) return;
    if (Date.now() - (this._wxsAt || 0) < 150) return;
    var now = Date.now();
    if (now - (this._dragAt || 0) < 55) return;
    var t = e && e.touches && e.touches[0];
    if (!t) return;
    this._dragAt = now;
    var i = this._axisIndex(t.clientX);
    if (i != null) this._previewAt(i);
  },

  onAxisEnd: function (e) {
    if (!this._dragging) return;
    this._dragging = false;
    // 松手后由 _jumpTo 做精确吸附，尾随的跟手滚动不再需要
    if (this._followTimer) {
      clearTimeout(this._followTimer);
      this._followTimer = null;
    }
    var t = (e.changedTouches && e.changedTouches[0]) || (e.touches && e.touches[0]);
    var i = t ? this._axisIndex(t.clientX) : null;
    var idx = i == null ? this.data.activeIndex : i;
    this._jumpTo(idx);
  },

  _jumpTo: function (i) {
    if (i == null || i < 0 || !this._all[i]) {
      this.setData({ dragOn: false });
      return;
    }
    var it = this._all[i];
    var that = this;
    this._setActive(i, true);

    // 目标被当前搜索过滤掉时，先清空搜索，再用同一场次定位
    var inView = false;
    for (var k = 0; k < this._view.length; k++) {
      if (this._view[k].id === it.id) { inView = true; break; }
    }
    if (!inView) {
      this.setData({ query: '', dragOn: false }, function () {
        that._renderList(it.id);
      });
      return;
    }

    // 跳转后短暂锁住自动收起，避免滚动惯性把刚收起的一级条又弹回全展
    this._headLock = Date.now() + 900;
    this.setData({
      dragOn: false,
      scrollAnim: false,
      headStage: (i === 0 || !this.data.headMainH) ? 0 : 1
    }, function () {
      that._scrollTo(it.id);
    });
  },

  /**
   * 定位到某张卡：用 scroll-top 精确控制落点，给列表顶部留出 gap（视口 1/4，80–120px），
   * 选中卡完整可见且手指够得着，不会贴在视口最上沿。
   * 偏移还没量到时退回 scroll-into-view（贴顶，但至少定位正确）。
   */
  _scrollTo: function (id, refined) {
    var target = 'c' + id;
    var that = this;
    var y = this._offMap ? this._offMap[id] : null;
    if (y == null) {
      // 偏移还没量到（列表刚重建、或刚从搜索过滤态切回全量）：
      // 先量一次再按「数值 + 余量」落点；量完仍缺这一场才退回 scroll-into-view。
      this._scheduleMeasure(refined ? 120 : 220, function () {
        if (that._offMap && that._offMap[id] != null) {
          that._scrollTo(id, true);
          return;
        }
        if (refined) return;
        if (that.data.scrollInto === target) {
          that.setData({ scrollInto: '' }, function () {
            that.setData({ scrollAnim: false, scrollInto: target });
          });
        } else {
          that.setData({ scrollAnim: false, scrollInto: target });
        }
      });
      return;
    }
    var to = Math.max(0, Math.round(y - this._landGap()));
    // scroll-top 同值不会再触发滚动，轻推 1px
    if (Math.abs(to - (this.data.scrollTopTo || 0)) < 1) to += 1;
    this.setData({ scrollAnim: false, scrollInto: '', scrollTopTo: to });
  },

  // 落点余量：视口高的 1/4，夹在 80–120px
  _landGap: function () {
    var gap = this._bodyH ? Math.round(this._bodyH / 4) : 96;
    if (gap < 80) gap = 80;
    if (gap > 120) gap = 120;
    return gap;
  },

  _setActive: function (i, force) {
    if (i == null || i < 0 || !this._all[i]) return;
    if (!force && i === this.data.activeIndex && this.data.activeLabel) return;
    var it = this._all[i];
    var N = this._all.length;
    this.setData({
      activeIndex: i,
      activeLabel: it.yearShort,
      activeId: it.id,
      activeTitle: it.title,
      activeYears: it.years + it.yearUnit,
      activePeriod: it.period,
      thumbPct: N > 1 ? (i / (N - 1) * 100) : 0
    });
  },

  /* ═════════ 卡片位置测量（跳转落点用）═════════ */
  _scheduleMeasure: function (delay, cb) {
    if (this._mTimer) clearTimeout(this._mTimer);
    var that = this;
    this._mTimer = setTimeout(function () {
      that._measureOffsets(cb);
    }, typeof delay === 'number' ? delay : 100);
  },

  _measureOffsets: function (done) {
    var that = this;
    // 滚动位置直接问 scroll-view 要：程序化滚动期间 _scrollTop 可能还没被 bindscroll 回填，
    // 用旧值量出来的卡片位置整体会偏，落点就会不准。
    wx.createSelectorQuery().in(this)
      .select('.sl-body').boundingClientRect()
      .select('.sl-body').scrollOffset()
      .selectAll('.sl-card').boundingClientRect()
      .exec(function (res) {
        var body = res && res[0];
        var off = res && res[1];
        var rects = res && res[2];
        if (!body || !rects || !that.data.view.length) {
          if (done) done();
          return;
        }
        that._bodyH = body.height;
        var scrolled = (off && typeof off.scrollTop === 'number') ? off.scrollTop : (that._scrollTop || 0);
        var base = body.top - scrolled;
        var map = {};
        rects.forEach(function (r, k) {
          var it = that.data.view[k];
          if (!it) return;
          map[it.id] = r.top - base;
        });
        that._offMap = map;
        if (done) done();
      });
  },

  onShareAppMessage: function () {
    return {
      title: '沙盘推演 · 战役列表',
      path: '/sandbox-pkg/pages/sandbox-list/sandbox-list'
    };
  }
});
