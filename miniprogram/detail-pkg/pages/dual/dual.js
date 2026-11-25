/**
 * 双人生命线 · 同看页
 *
 * 入口：人物详情页「年表」tab 底部（仅精选且生卒双全的人物放开），
 *       半屏选人后 navigateTo 到本页，参数 a / b 为两人 id。
 *
 * 视图：
 *   A 双轨年表（默认）—— 两条生命线上下排列，标出并存区间、年龄差、晚走年数；
 *   B 三段人生 —— 按真实区间切「只有他 / 同在一世 / 只剩他」，卡片文案只取库内事件。
 *   两视图共用一个分段控件切换。
 *
 * 分享卡：C 版式，canvas 2d 绘制 1080×1920 后保存相册；
 *   小程序码用 miniprogram/assets/dual/qr-shw.jpg（用户提供的真实码，非占位图）。
 *
 * 数据口径全部走 detail-pkg/utils/dual-life.js（中文年份解析、缺失态、区间计算），
 * 本页只负责取数与渲染，不在这里重算年份。
 */
const API = require('../../../config/api');
const request = require('../../../utils/request');
const { formatEventYears } = require('../../../utils/figure-display');
const { getFigureById } = require('../../../data/figures');
const dual = require('../../utils/dual-life');

/** 取单个人物：服务端详情优先（含 events / featured），失败回落本地缓存 */
function fetchFigure(id) {
  if (!id) return Promise.reject(new Error('missing id'));
  return request.get(API.FIGURES.GET(id), { timeout: 15000, toast: false })
    .then(function (body) {
      var d = body && (body.data || body.figure);
      if (d && (d.id || d.name)) return d;
      return getFigureById(id) || null;
    })
    .catch(function () {
      return getFigureById(id) || null;
    });
}

/** 姓名缩写：侧签最多 3 字，避免长名把事件行挤变形 */
function shortName(name) {
  var s = String(name || '');
  return s.length > 3 ? s.slice(0, 3) : s;
}

/** 享年展示：缺一端时为「待补」，不写 0 / 至今 */
function spanText(life) {
  return life.span === null ? '待补' : life.spanText;
}

/** 顶部四数：只在能算的范围内出数，算不出的写「待补」 */
function buildStats(cmp, A, B, nameA, nameB) {
  var out = [];
  var pre = cmp.approx ? '约 ' : '';
  if (cmp.status === 'full') {
    if (cmp.diff !== null) out.push({ value: pre + cmp.diff, unit: '岁', label: '出生相差' });
    out.push({ value: pre + (cmp.hasOverlap ? cmp.overlap : 0), unit: '年', label: '同活岁月' });
    out.push({ value: spanText(A), unit: '', label: nameA + '享年' });
    out.push({ value: spanText(B), unit: '', label: nameB + '享年' });
  } else if (cmp.status === 'partial') {
    out.push({ value: spanText(A), unit: '', label: nameA + '享年' });
    out.push({ value: spanText(B), unit: '', label: nameB + '享年' });
    out.push({ value: '待补', unit: '', label: '并存年数' });
  }
  return out;
}

/** 事件行：年龄只按事件所属人物的生年算，另一个不硬凑 */
function decorateEvents(events, shortA, shortB) {
  return (events || []).map(function (ev) {
    var age = ev.side === 'a' ? ev.ageA : ev.ageB;
    var o = {};
    for (var k in ev) o[k] = ev[k];
    o.ageText = age === null || age === undefined ? '' : '时年 ' + age + ' 岁';
    o.sideName = ev.side === 'a' ? shortA : shortB;
    return o;
  });
}

// ===================== 分享卡绘制 =====================
// 全部按 1080×1920 坐标系绘制；画布显示尺寸由 WXSS 缩到 600rpx 宽。
var CARD_W = 1080;
var CARD_H = 1920;
var CARD_PAD = 72;
var COLOR = {
  gold: '#e5b77f',
  goldDeep: '#b5713a',
  paper: '#f4ede1',
  muted: 'rgba(244,237,225,0.56)',
  faint: 'rgba(244,237,225,0.32)',
  line: 'rgba(229,183,127,0.30)',
  bgTop: '#312518',
  bgBottom: '#140f0a'
};

function serifFont(ctx, size, bold) {
  ctx.font = (bold ? 'bold ' : '') + size + 'px "Songti SC", "Noto Serif CJK SC", serif';
}

function sansFont(ctx, size, bold) {
  ctx.font = (bold ? 'bold ' : '') + size + 'px -apple-system, "PingFang SC", sans-serif';
}

/** 圆角矩形路径 */
function roundRect(ctx, x, y, w, h, r) {
  var rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/** 中文逐字换行，超出行数加省略号；返回结束 y */
function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  var s = String(text || '');
  if (!s) return y;
  var lines = [];
  var cur = '';
  for (var i = 0; i < s.length; i++) {
    var ch = s.charAt(i);
    if (ch === '\n') { lines.push(cur); cur = ''; continue; }
    if (ctx.measureText(cur + ch).width > maxWidth && cur) {
      lines.push(cur);
      cur = ch;
      if (lines.length === maxLines) break;
    } else {
      cur += ch;
    }
  }
  if (lines.length < maxLines && cur) lines.push(cur);
  if (lines.length === maxLines && cur && lines[maxLines - 1] !== cur) {
    // 被截断：补省略号（仅当仍有未写入的内容）
    var last = lines[maxLines - 1];
    var idx = s.indexOf(last);
    if (idx + last.length < s.length) {
      lines[maxLines - 1] = last.slice(0, Math.max(0, last.length - 1)) + '…';
    }
  }
  for (var j = 0; j < lines.length; j++) {
    ctx.fillText(lines[j], x, y + j * lineHeight);
  }
  return y + lines.length * lineHeight;
}

Page({
  data: {
    loading: true,
    error: '',
    view: 'A',
    safeAreaTop: 44,
    navBarHeight: 88,

    nameA: '',
    nameB: '',
    shortA: '',
    shortB: '',
    kicker: '双人生命线',
    headline: '',
    summary: '',
    lifeAText: '',
    lifeBText: '',
    stats: [],

    plot: null,
    scaleNote: '',
    approxNote: '',
    footNote: '',
    canShare: false,
    shareOpen: false,
    // 分享卡：canvas 只负责一次性绘制，成功后立刻导出为图片，
    // 预览用 <image>（避免原生 canvas 图层与弹层布局不同步）。
    canvasW: 300,
    canvasH: 533,
    cardReady: false,
    cardPath: '',
    cardError: '',

    eventTitle: '',
    eventEmpty: '',
    overlapLabel: '',
    events: [],

    acts: [],
    actsTitle: '',
    actsSub: '',
    actsEmpty: ''
  },

  onLoad: function (options) {
    var a = String((options && options.a) || '');
    var b = String((options && options.b) || '');
    this._ids = { a: a, b: b };

    var sys = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
    var safeAreaTop = sys.statusBarHeight || 44;
    this.setData({ safeAreaTop: safeAreaTop, navBarHeight: safeAreaTop + 44 });

    if (!a || !b) {
      this.setData({ loading: false, error: '缺少要对比的两位人物' });
      return;
    }
    this._load();
  },

  /** 取两人详情并生成全部展示模型 */
  _load: function () {
    var that = this;
    this.setData({ loading: true, error: '' });
    Promise.all([fetchFigure(this._ids.a), fetchFigure(this._ids.b)])
      .then(function (arr) {
        var fa = arr[0];
        var fb = arr[1];
        if (!fa || !fb) {
          that.setData({ loading: false, error: '人物数据未能加载，请稍后重试' });
          return;
        }
        // formatEventYears 会剔除占位事件、把 time 归到 year（与详情页年表同口径）
        that._figA = formatEventYears(fa);
        that._figB = formatEventYears(fb);
        that._apply(that._figA, that._figB);
        that.setData({ loading: false });
      })
      .catch(function () {
        that.setData({ loading: false, error: '网络不畅，人物数据未能加载' });
      });
  },

  /** 计算 A / B / 分享卡需要的全部字段 */
  _apply: function (fa, fb) {
    var nameA = String(fa.name || '');
    var nameB = String(fb.name || '');
    var cmp = dual.compareLife(fa, fb);
    var plot = dual.buildPlotModel(cmp);
    var events = decorateEvents(dual.collectOverlapEvents(fa, fb, cmp), shortName(nameA), shortName(nameB));
    var acts = dual.buildActs(fa, fb, cmp) || [];
    var A = cmp.a;
    var B = cmp.b;

    var dyns = [];
    [fa.dynasty, fb.dynasty].forEach(function (d) {
      var s = String(d || '');
      if (s && dyns.indexOf(s) < 0) dyns.push(s);
    });

    var full = cmp.status === 'full';
    var hasOverlap = !!(full && cmp.hasOverlap);
    var pre = cmp.approx ? '约 ' : '';

    // 事件卡标题：能算区间时才报「同在这 N 年」，否则如实写待补
    var eventTitle;
    var eventEmpty;
    if (hasOverlap) {
      eventTitle = events.length
        ? '同在这 ' + cmp.overlap + ' 年里的 ' + events.length + ' 件事'
        : '同在这 ' + cmp.overlap + ' 年';
      eventEmpty = '库里暂未收录这段区间内带年份的事件，不做补写。';
    } else if (full) {
      eventTitle = '并存区间';
      eventEmpty = '两人的生命线没有重叠，因而不存在「同在」的事件。';
    } else {
      eventTitle = '并存区间待补';
      eventEmpty = '年份不全，无法确定并存区间；补齐生卒年后会自动计算。';
    }

    var approxNote = '';
    if (cmp.status === 'partial') {
      approxNote = '年份不全：开口端只表示「未知」，不按 0 岁或「至今」延伸，并存区间待补。';
    } else if (cmp.approx) {
      approxNote = '端点含「约」：线为虚线、端点为空心，年数与排序均为约数。';
    }

    var footNote;
    if (hasOverlap) footNote = '享年按生卒年差计算，未计虚岁；事件仅取库里带年份的记载。';
    else if (full) footNote = '两人没有重叠的岁月，仍可在同一条轴上比较先后与相隔年数。';
    else footNote = '缺载的端点保留开口、不补算；补齐生卒年后自动更新。';

    var overlapLabel = '';
    if (hasOverlap) {
      var os = Math.max(A.birth.value, B.birth.value);
      var oe = Math.min(A.death.value, B.death.value);
      overlapLabel = dual.yearLabel(os) + ' — ' + dual.yearLabel(oe);
    }

    var actsEmpty = (full && !cmp.hasOverlap)
      ? '两人的生命线没有重叠，切不出「同在一世」；可在双轨年表看先后与相隔年数。'
      : '两人年份不全，无法切分三段；双轨年表里仍可看各自的开口线。';

    var actsTitle = '';
    var actsSub = '';
    if (acts.length) {
      var earlyName = cmp.earlySide === 'a' ? nameA : nameB;
      var lateName = cmp.earlySide === 'a' ? nameB : nameA;
      actsTitle = earlyName + ' ' + cmp.diff + ' 岁那年，' + lateName + ' 才出生';
      actsSub = earlyName + ' ' + spanText(A) + ' 年 · ' + lateName + ' ' + spanText(B) +
        ' 年 · 同活 ' + pre + cmp.overlap + ' 年';
    }

    // 分享卡所需模型（绘制时直接取）
    this._card = {
      nameA: nameA,
      nameB: nameB,
      dynasty: dyns.join(' / '),
      cmp: cmp,
      plot: plot,
      event: events[0] || null,
      overlapLabel: overlapLabel
    };

    this.setData({
      nameA: nameA,
      nameB: nameB,
      shortA: shortName(nameA),
      shortB: shortName(nameB),
      kicker: '双人生命线' + (dyns.length ? ' · ' + dyns.join(' / ') : ''),
      headline: nameA + ' × ' + nameB,
      summary: dual.summaryText(cmp, nameA, nameB),
      lifeAText: A.yearsText + (A.span === null ? '' : ' · 享年 ' + A.spanText),
      lifeBText: B.yearsText + (B.span === null ? '' : ' · 享年 ' + B.spanText),
      stats: buildStats(cmp, A, B, nameA, nameB),

      plot: plot,
      scaleNote: cmp.domain ? (dual.yearLabel(cmp.domain.start) + ' — ' + dual.yearLabel(cmp.domain.end)) : '',
      approxNote: approxNote,
      footNote: footNote,
      canShare: hasOverlap,

      eventTitle: eventTitle,
      eventEmpty: eventEmpty,
      overlapLabel: overlapLabel,
      events: events,

      acts: acts,
      actsTitle: actsTitle,
      actsSub: actsSub,
      actsEmpty: actsEmpty
    });
  },

  switchView: function (e) {
    var v = e.currentTarget.dataset.v;
    if (v !== 'A' && v !== 'B') return;
    this.setData({ view: v });
  },

  retryLoad: function () {
    this._load();
  },

  noop: function () {},

  // ---------------- 分享卡 ----------------

  /**
   * 打开分享卡弹层。
   * [关键修复] 画布尺寸改为按窗口像素计算并写进内联 style（此前用 rpx），
   * 且预览不再直接展示 canvas —— 画完立刻导出图片交给 <image> 显示：
   *   · 原生 canvas 层在弹层刚挂载时容易与 WebView 布局不同步，
   *     真机表现为「画布整体下移、上方大片空白色块、底部按钮被顶出屏幕」；
   *   · 导出成图片后这一层与布局彻底解耦，顺带获得长按保存能力。
   */
  openShare: function () {
    if (!this.data.canShare) {
      wx.showToast({ title: '并存区间待补，暂不能生成分享卡', icon: 'none' });
      return;
    }
    var that = this;
    var win = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
    var ww = win.windowWidth || 375;
    // 画布按 9:16（卡面比例）按可用宽度铺满，高度交给预览区滚动；
    // 预览区自身有 max-height，底部按钮始终在滚动区之外，不会被顶出屏幕。
    var cw = Math.min(Math.round(ww - 60), 360);
    var ch = Math.round(cw * 16 / 9);

    this._shareSeq = (this._shareSeq || 0) + 1;
    var seq = this._shareSeq;
    this._shareTempPath = '';
    this.setData({
      shareOpen: true,
      cardPath: '',
      cardError: '',
      cardReady: false,
      canvasW: cw,
      canvasH: ch
    }, function () {
      if (seq !== that._shareSeq) return;
      that._prepareCanvas(0, seq);
    });
  },

  closeShare: function () {
    // 作废在途的绘制/导出，避免关掉弹层后又把图片塞回去
    this._shareSeq = (this._shareSeq || 0) + 1;
    this.setData({ shareOpen: false, cardPath: '', cardError: '', cardReady: false });
  },

  /** 失败态：写明原因并保留重试入口，绝不静默留白 */
  _failCard: function (msg) {
    this.setData({ cardError: msg || '生成分享卡失败，请重试', cardReady: false });
  },

  /** 重新生成（弹层不关） */
  retryCard: function () {
    var that = this;
    this._shareSeq = (this._shareSeq || 0) + 1;
    var seq = this._shareSeq;
    this._shareTempPath = '';
    this.setData({ cardPath: '', cardError: '', cardReady: false }, function () {
      that._prepareCanvas(0, seq);
    });
  },

  /** 点击预览图放大查看 */
  previewCard: function () {
    var p = this.data.cardPath || this._shareTempPath;
    if (!p) return;
    wx.previewImage({ urls: [p], current: p });
  },

  _prepareCanvas: function (attempt, seq) {
    var that = this;
    var tries = attempt || 0;
    var q = wx.createSelectorQuery().in(this);
    q.select('#shareCanvas').fields({ node: true, size: true }).exec(function (res) {
      if (seq !== that._shareSeq) return;
      var item = res && res[0];
      if (!item || !item.node) {
        // 弹层刚挂载时节点可能还没就绪：最多重试 4 次
        if (tries < 4) {
          setTimeout(function () { that._prepareCanvas(tries + 1, seq); }, 180);
          return;
        }
        that._failCard('画布初始化失败，请重试');
        return;
      }
      var canvas = item.node;
      canvas.width = CARD_W;
      canvas.height = CARD_H;
      var ctx = canvas.getContext('2d');
      if (!ctx) {
        that._failCard('画布不可用，请重试');
        return;
      }

      var finished = false;
      var done = function (qr) {
        if (finished || seq !== that._shareSeq) return;
        finished = true;
        if (!that._card) {
          that._failCard('卡面数据缺失，请返回后重试');
          return;
        }
        try {
          that._drawCard(ctx, qr);
        } catch (e) {
          that._failCard('生成分享卡失败，请重试');
          return;
        }
        that.setData({ cardReady: true });
        that._exportCard(canvas, seq);
      };

      // 小程序码：真实图，加载失败也继续出图（卡面画占位框 + 文案）
      var img = canvas.createImage ? canvas.createImage() : null;
      if (!img) { done(null); return; }
      img.onload = function () { done(img); };
      img.onerror = function () { done(null); };
      img.src = '/assets/dual/qr-shw.jpg';
      // 兜底：图片事件在部分环境不回调时，1.2s 后按无码绘制
      setTimeout(function () { done(null); }, 1200);
    });
  },

  _drawCard: function (ctx, qr) {
    var card = this._card;
    if (!card) return;
    var cmp = card.cmp;
    var A = cmp.a;
    var B = cmp.b;
    var nameA = card.nameA;
    var nameB = card.nameB;
    var pre = cmp.approx ? '约 ' : '';

    // 1) 底色
    var bg = ctx.createLinearGradient(0, 0, 0, CARD_H);
    bg.addColorStop(0, COLOR.bgTop);
    bg.addColorStop(1, COLOR.bgBottom);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, CARD_W, CARD_H);

    // 2) 内框
    ctx.strokeStyle = 'rgba(229,183,127,0.24)';
    ctx.lineWidth = 2;
    roundRect(ctx, 32, 32, CARD_W - 64, CARD_H - 64, 26);
    ctx.stroke();

    // 3) 品牌行
    ctx.fillStyle = COLOR.goldDeep;
    roundRect(ctx, CARD_PAD, 92, 76, 76, 12);
    ctx.fill();
    ctx.fillStyle = '#20180f';
    serifFont(ctx, 46, true);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('世', CARD_PAD + 38, 132);

    ctx.textAlign = 'left';
    ctx.fillStyle = COLOR.gold;
    serifFont(ctx, 30, false);
    ctx.fillText('世慧屋 · 人物数据', CARD_PAD + 96, 118);
    ctx.fillStyle = COLOR.muted;
    sansFont(ctx, 19, false);
    ctx.fillText('DUAL LIFE TIMELINE', CARD_PAD + 96, 152);

    if (card.dynasty) {
      ctx.textAlign = 'right';
      ctx.fillStyle = COLOR.faint;
      sansFont(ctx, 22, false);
      ctx.fillText(card.dynasty, CARD_W - CARD_PAD, 128);
      ctx.textAlign = 'left';
    }

    // 4) 标题
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = COLOR.gold;
    sansFont(ctx, 24, false);
    ctx.fillText('双人生命线 · 同一段时间上', CARD_PAD, 286);

    ctx.fillStyle = COLOR.paper;
    serifFont(ctx, 62, true);
    var head = nameA + ' × ' + nameB;
    var headSize = 62;
    while (ctx.measureText(head).width > CARD_W - CARD_PAD * 2 && headSize > 40) {
      headSize -= 4;
      serifFont(ctx, headSize, true);
    }
    ctx.fillText(head, CARD_PAD, 362);

    // 5) 大数：同活了 N 年
    ctx.fillStyle = COLOR.muted;
    sansFont(ctx, 34, false);
    ctx.fillText('同活了', CARD_PAD, 492);

    var numText = String(cmp.overlap);
    var numSize = 146;
    serifFont(ctx, numSize, true);
    var numW = ctx.measureText(numText).width;
    var numX = CARD_PAD;
    if (cmp.approx) {
      ctx.fillStyle = COLOR.muted;
      sansFont(ctx, 34, false);
      ctx.fillText('约', CARD_PAD, 630);
      numX = CARD_PAD + 42;
      serifFont(ctx, numSize, true);
    }
    ctx.fillStyle = COLOR.gold;
    ctx.fillText(numText, numX, 648);

    ctx.fillStyle = COLOR.gold;
    serifFont(ctx, 44, false);
    ctx.fillText('年', numX + numW + 18, 648);

    // 6) 概览句
    ctx.fillStyle = COLOR.muted;
    sansFont(ctx, 25, false);
    wrapText(ctx, dual.summaryText(cmp, nameA, nameB), CARD_PAD, 712, CARD_W - CARD_PAD * 2, 40, 2);

    // 分隔线
    ctx.strokeStyle = COLOR.line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(CARD_PAD, 790);
    ctx.lineTo(CARD_W - CARD_PAD, 790);
    ctx.stroke();

    // 7) 双轨
    var x1 = 120;
    var x2 = CARD_W - 120;
    var trackW = x2 - x1;
    var yA = 900;
    var yB = 998;

    var bandLeft = x1 + trackW * card.plot.band.left / 100;
    var bandRight = x1 + trackW * (card.plot.band.left + card.plot.band.width) / 100;
    ctx.fillStyle = 'rgba(181,113,58,0.16)';
    ctx.fillRect(bandLeft, 858, bandRight - bandLeft, 178);
    ctx.strokeStyle = 'rgba(229,183,127,0.35)';
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(bandLeft, 858); ctx.lineTo(bandLeft, 1036);
    ctx.moveTo(bandRight, 858); ctx.lineTo(bandRight, 1036);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(229,183,127,0.9)';
    sansFont(ctx, 20, false);
    ctx.textAlign = 'center';
    ctx.fillText('同在 ' + cmp.overlap + ' 年', (bandLeft + bandRight) / 2, 850);
    ctx.textAlign = 'left';

    // 两条线
    var rows = card.plot.rows;
    this._drawCardTrack(ctx, rows[0], x1, trackW, yA, '#e5b77f');
    this._drawCardTrack(ctx, rows[1], x1, trackW, yB, '#d8c9b2');

    // 名字 / 年份
    ctx.fillStyle = COLOR.paper;
    serifFont(ctx, 28, false);
    ctx.fillText(nameA, x1, yA - 18);
    ctx.fillStyle = COLOR.muted;
    sansFont(ctx, 22, false);
    ctx.textAlign = 'right';
    ctx.fillText(A.yearsText, x2, yA - 18);
    ctx.textAlign = 'left';

    ctx.fillStyle = COLOR.paper;
    serifFont(ctx, 28, false);
    ctx.fillText(nameB, x1, yB + 52);
    ctx.fillStyle = COLOR.muted;
    sansFont(ctx, 22, false);
    ctx.textAlign = 'right';
    ctx.fillText(B.yearsText, x2, yB + 52);
    ctx.textAlign = 'left';

    // 刻度
    ctx.fillStyle = COLOR.faint;
    sansFont(ctx, 20, false);
    ctx.textAlign = 'center';
    (card.plot.ticks || []).forEach(function (t) {
      var tx = x1 + trackW * t.left / 100;
      ctx.fillRect(tx, 1060, 1, 8);
      ctx.fillText(t.label, tx, 1098);
    });
    ctx.textAlign = 'left';

    // 8) 卒年注释
    if (card.plot.deathMark) {
      ctx.fillStyle = COLOR.goldDeep;
      ctx.beginPath();
      ctx.arc(CARD_PAD + 6, 1142, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = COLOR.paper;
      sansFont(ctx, 26, false);
      ctx.fillText(card.plot.deathMark.label, CARD_PAD + 26, 1152);
    }

    // 9) 三个事实块
    var facts = [
      { label: '出生相差', value: pre + cmp.diff + ' 岁' },
      { label: '同活岁月', value: pre + cmp.overlap + ' 年' },
      { label: '晚走', value: pre + cmp.survivorYears + ' 年' }
    ];
    var boxW = (CARD_W - CARD_PAD * 2 - 40) / 3;
    facts.forEach(function (f, i) {
      var bx = CARD_PAD + i * (boxW + 20);
      ctx.fillStyle = 'rgba(255,255,255,0.045)';
      roundRect(ctx, bx, 1190, boxW, 116, 14);
      ctx.fill();
      ctx.strokeStyle = 'rgba(229,183,127,0.14)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = COLOR.muted;
      sansFont(ctx, 21, false);
      ctx.fillText(f.label, bx + 22, 1230);
      ctx.fillStyle = COLOR.gold;
      serifFont(ctx, 34, true);
      ctx.fillText(f.value, bx + 22, 1280);
    });

    // 10) 一条真实事件（无则如实留空，不编造）
    var evY = 1352;
    if (card.event) {
      ctx.fillStyle = COLOR.goldDeep;
      ctx.fillRect(CARD_PAD, evY - 26, 4, 84);
      ctx.fillStyle = COLOR.gold;
      sansFont(ctx, 22, false);
      ctx.fillText(card.event.yearLabel + (card.event.location ? ' · ' + card.event.location : ''), CARD_PAD + 22, evY);
      ctx.fillStyle = COLOR.paper;
      serifFont(ctx, 32, false);
      ctx.fillText(card.event.title || '', CARD_PAD + 22, evY + 44);
      if (card.event.desc) {
        ctx.fillStyle = COLOR.muted;
        sansFont(ctx, 21, false);
        wrapText(ctx, card.event.desc, CARD_PAD + 22, evY + 80, CARD_W - CARD_PAD * 2 - 320, 30, 1);
      }
    }

    // 11) 底部元信息
    ctx.fillStyle = COLOR.faint;
    sansFont(ctx, 20, false);
    ctx.fillText(card.dynasty ? card.dynasty + ' · ' + A.yearsText + ' / ' + B.yearsText : A.yearsText + ' / ' + B.yearsText,
      CARD_PAD, 1596);

    // 12) 小程序码（用户提供的真实图）
    var qrX = CARD_W - CARD_PAD - 168;
    var qrY = 1552;
    var qrSize = 168;
    if (qr) {
      ctx.fillStyle = '#f7f2e8';
      roundRect(ctx, qrX - 8, qrY - 8, qrSize + 16, qrSize + 16, 10);
      ctx.fill();
      ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);
      ctx.fillStyle = COLOR.muted;
      ctx.textAlign = 'center';
      sansFont(ctx, 19, false);
      ctx.fillText('扫码看两人一生', qrX + qrSize / 2, qrY + qrSize + 34);
      ctx.textAlign = 'left';
    } else {
      ctx.strokeStyle = COLOR.line;
      ctx.setLineDash([6, 6]);
      roundRect(ctx, qrX, qrY, qrSize, qrSize, 10);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = COLOR.muted;
      ctx.textAlign = 'center';
      sansFont(ctx, 20, false);
      ctx.fillText('小程序码', qrX + qrSize / 2, qrY + qrSize / 2 + 8);
      ctx.textAlign = 'left';
    }

    // 13) 页脚
    ctx.strokeStyle = COLOR.line;
    ctx.beginPath();
    ctx.moveTo(CARD_PAD, 1790);
    ctx.lineTo(CARD_W - CARD_PAD, 1790);
    ctx.stroke();

    ctx.fillStyle = COLOR.faint;
    sansFont(ctx, 20, false);
    ctx.fillText('世慧屋 · 人物数据', CARD_PAD, 1834);
    ctx.textAlign = 'right';
    ctx.fillText('生卒取自库内记载 · 缺载标「待补」', CARD_W - CARD_PAD, 1834);
    ctx.textAlign = 'left';
  },

  /** 画一条卡面生命线（虚线=约数；开口端用深色渐变淡出） */
  _drawCardTrack: function (ctx, row, x1, trackW, y, color) {
    var bx = x1 + trackW * row.left / 100;
    var bw = Math.max(4, trackW * row.width / 100);
    var bh = 22;

    ctx.save();
    if (row.dotted) ctx.setLineDash([12, 8]);
    ctx.fillStyle = color;
    ctx.fillRect(bx, y, bw, bh);
    if (row.dotted) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(bx, y, bw, bh);
    }
    ctx.restore();

    // 开口端渐隐（只表示未知，不做假端点）
    if (row.openLeft) {
      var gL = ctx.createLinearGradient(bx, 0, bx + bw * 0.4, 0);
      gL.addColorStop(0, 'rgba(28,21,15,1)');
      gL.addColorStop(1, 'rgba(28,21,15,0)');
      ctx.fillStyle = gL;
      ctx.fillRect(bx, y, bw * 0.4, bh);
    }
    if (row.openRight) {
      var gR = ctx.createLinearGradient(bx + bw * 0.6, 0, bx + bw, 0);
      gR.addColorStop(0, 'rgba(28,21,15,0)');
      gR.addColorStop(1, 'rgba(28,21,15,1)');
      ctx.fillStyle = gR;
      ctx.fillRect(bx + bw * 0.6, y, bw * 0.4, bh);
    }

    // 端点：实心 / 空心（约数）
    var drawDot = function (dx) {
      ctx.beginPath();
      ctx.arc(dx, y + bh / 2, 7, 0, Math.PI * 2);
      if (row.dotted) {
        ctx.fillStyle = '#1c150f';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        ctx.fillStyle = color;
        ctx.fill();
      }
    };
    if (!row.openLeft) drawDot(bx);
    if (!row.openRight) drawDot(bx + bw);
  },

  _exportCard: function (canvas, seq) {
    var that = this;
    wx.canvasToTempFilePath({
      canvas: canvas,
      x: 0,
      y: 0,
      width: CARD_W,
      height: CARD_H,
      destWidth: CARD_W,
      destHeight: CARD_H,
      success: function (res) {
        if (seq !== that._shareSeq) return;
        var p = res && res.tempFilePath;
        if (!p) {
          that._failCard('图片导出失败，请重试');
          return;
        }
        that._shareTempPath = p;
        // 画布换成图片：预览与布局彻底解耦（长按也能直接保存）
        that.setData({ cardPath: p });
      },
      fail: function () {
        if (seq !== that._shareSeq) return;
        that._failCard('图片导出失败，请重试');
      }
    }, this);
  },

  saveShare: function () {
    var path = this.data.cardPath || this._shareTempPath;
    if (!path) {
      wx.showToast({ title: this.data.cardError ? '分享卡未生成，请先重试' : '分享卡还在生成，请稍候', icon: 'none' });
      return;
    }
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success: function () {
        wx.showToast({ title: '已保存到相册', icon: 'success' });
      },
      fail: function (err) {
        if (err && /auth|deny|permission/i.test(err.errMsg || '')) {
          wx.showModal({
            title: '需要相册权限',
            content: '保存分享卡需要访问相册，请在设置中允许。',
            confirmText: '去设置',
            success: function (r) {
              if (r.confirm) wx.openSetting();
            }
          });
        } else {
          wx.showToast({ title: '保存失败，请重试', icon: 'none' });
        }
      }
    });
  },

  onShareAppMessage: function () {
    var d = this.data;
    var title = d.headline
      ? d.headline + '：' + (this._card && this._card.cmp.hasOverlap
        ? '同活 ' + (this._card.cmp.approx ? '约 ' : '') + this._card.cmp.overlap + ' 年'
        : '同看两人的一生')
      : '双人生命线';
    return {
      title: title,
      path: '/detail-pkg/pages/dual/dual?a=' + this._ids.a + '&b=' + this._ids.b,
      imageUrl: this.data.cardPath || this._shareTempPath || ''
    };
  },

  onShareTimeline: function () {
    var d = this.data;
    return {
      title: d.headline ? d.headline + ' · 双人生命线' : '双人生命线',
      query: 'a=' + this._ids.a + '&b=' + this._ids.b
    };
  }
});
