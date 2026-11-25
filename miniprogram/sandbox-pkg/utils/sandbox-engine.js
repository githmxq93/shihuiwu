/**
 * 沙盘推演 · Canvas 2D 渲染引擎（渲染层）
 *
 * 为什么用 canvas 2d 而不是 WXML transform 逐帧：
 *   原型是 SVG + 每帧改属性（路线遮罩揭开、军势沿线移动、攻城圈扩散、内讧向心塌缩），
 *   一条阶段内要同步几十个图形与文字。WXML 节点方案需要每帧 setData 几十个节点，
 *   逻辑层与渲染层跨线程序列化开销大，真机拖动会掉帧；canvas 2d 在同一个
 *   `canvas.requestAnimationFrame` 循环里直接绘制，节点不进逻辑层，拖动与播放都更稳。
 *
 * 定格原理：整幅画面是进度 p（0–6）的纯函数，不依赖 CSS 动画与残留状态。
 *   暂停 = 停止 rAF；拖动 = 用新 p 立刻重绘。因此暂停时画面完全定格、
 *   回拖再前进会重现同一帧，不会出现动画走完不可复现的问题。
 *
 * 引擎不写死战役内容：所有数据来自 data/*.js 的 STAGES / CITY_DEFS / TERRAIN，
 * 后续第二场战役换一份数据即可。
 */

var TAU = Math.PI * 2;
var SERIF = '"Kaiti SC","STKaiti","KaiTi","Songti SC","STSong",serif';
var SANS = '"PingFang SC","Microsoft YaHei",system-ui,sans-serif';

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function ease(k) { return 1 - Math.pow(1 - k, 3); }
function fontOf(size, serif) { return size + 'px ' + (serif ? SERIF : SANS); }
function shortName(n) { return String(n || '').replace('·幽州', ''); }

/* ---------------- SVG path 解析与采样 ----------------
 * 支持 M/m L/l H/h V/v C/c Z/z。地形与行军线都只用到这些命令。
 * 返回 [{t:'M'|'L'|'C', p:[x,y,...]}]，坐标已转为绝对坐标。 */
function parsePath(d) {
  var out = [];
  var tokens = String(d).match(/[a-zA-Z]|-?\d*\.?\d+/g) || [];
  var i = 0, cmd = '', cur = { x: 0, y: 0 }, start = { x: 0, y: 0 };

  function num() { return parseFloat(tokens[i++]); }
  function isNum(t) { return t != null && !/^[a-zA-Z]$/.test(t); }

  while (i < tokens.length) {
    if (!isNum(tokens[i])) { cmd = tokens[i++]; }
    var rel = cmd === cmd.toLowerCase();
    var c = cmd.toUpperCase();
    if (c === 'M') {
      var x = num(), y = num();
      if (rel) { x += cur.x; y += cur.y; }
      cur = { x: x, y: y }; start = { x: x, y: y };
      out.push({ t: 'M', p: [x, y] });
      // M 之后的连续坐标按 L 处理（本项目数据未使用，保留兼容）
      cmd = rel ? 'l' : 'L';
    } else if (c === 'L') {
      var lx = num(), ly = num();
      if (rel) { lx += cur.x; ly += cur.y; }
      cur = { x: lx, y: ly };
      out.push({ t: 'L', p: [lx, ly] });
    } else if (c === 'H') {
      var hx = num();
      if (rel) hx += cur.x;
      cur = { x: hx, y: cur.y };
      out.push({ t: 'L', p: [cur.x, cur.y] });
    } else if (c === 'V') {
      var vy = num();
      if (rel) vy += cur.y;
      cur = { x: cur.x, y: vy };
      out.push({ t: 'L', p: [cur.x, cur.y] });
    } else if (c === 'C') {
      var x1 = num(), y1 = num(), x2 = num(), y2 = num(), x3 = num(), y3 = num();
      if (rel) { x1 += cur.x; y1 += cur.y; x2 += cur.x; y2 += cur.y; x3 += cur.x; y3 += cur.y; }
      cur = { x: x3, y: y3 };
      out.push({ t: 'C', p: [x1, y1, x2, y2, x3, y3] });
    } else if (c === 'Z') {
      out.push({ t: 'Z', p: [] });
      cur = { x: start.x, y: start.y };
      cmd = '';
    } else {
      i++; // 未知命令：跳过，避免死循环
    }
  }
  return out;
}

function tracePath(ctx, segs) {
  ctx.beginPath();
  var cur = { x: 0, y: 0 };
  for (var i = 0; i < segs.length; i++) {
    var s = segs[i];
    if (s.t === 'M') { ctx.moveTo(s.p[0], s.p[1]); cur = { x: s.p[0], y: s.p[1] }; }
    else if (s.t === 'L') { ctx.lineTo(s.p[0], s.p[1]); cur = { x: s.p[0], y: s.p[1] }; }
    else if (s.t === 'C') { ctx.bezierCurveTo(s.p[0], s.p[1], s.p[2], s.p[3], s.p[4], s.p[5]); cur = { x: s.p[4], y: s.p[5] }; }
    else if (s.t === 'Z') { ctx.closePath(); cur = { x: cur.x, y: cur.y }; }
  }
}

function sampleSegs(segs, step) {
  var pts = [];
  var cur = { x: 0, y: 0 };
  for (var i = 0; i < segs.length; i++) {
    var s = segs[i];
    if (s.t === 'M') { cur = { x: s.p[0], y: s.p[1] }; pts.push({ x: cur.x, y: cur.y }); }
    else if (s.t === 'L') {
      var ax = s.p[0] - cur.x, ay = s.p[1] - cur.y;
      var n = Math.max(2, Math.ceil(Math.sqrt(ax * ax + ay * ay) / 4));
      for (var j = 1; j <= n; j++) pts.push({ x: cur.x + ax * j / n, y: cur.y + ay * j / n });
      cur = { x: s.p[0], y: s.p[1] };
    } else if (s.t === 'C') {
      var x0 = cur.x, y0 = cur.y;
      for (var k = 1; k <= step; k++) {
        var t = k / step, u = 1 - t;
        var bx = u * u * u * x0 + 3 * u * u * t * s.p[0] + 3 * u * t * t * s.p[2] + t * t * t * s.p[4];
        var by = u * u * u * y0 + 3 * u * u * t * s.p[1] + 3 * u * t * t * s.p[3] + t * t * t * s.p[5];
        pts.push({ x: bx, y: by });
      }
      cur = { x: s.p[4], y: s.p[5] };
    }
  }
  return pts;
}

function measure(pts) {
  var cum = [0], total = 0;
  for (var i = 1; i < pts.length; i++) {
    var dx = pts[i].x - pts[i - 1].x, dy = pts[i].y - pts[i - 1].y;
    total += Math.sqrt(dx * dx + dy * dy);
    cum.push(total);
  }
  return { pts: pts, cum: cum, len: total };
}

function pointAt(route, frac) {
  if (!route || !route.pts.length) return { x: 0, y: 0, ang: 0 };
  var target = clamp(frac, 0, 1) * route.len;
  var cum = route.cum;
  var lo = 0, hi = cum.length - 1;
  while (lo < hi) {
    var mid = (lo + hi) >> 1;
    if (cum[mid] < target) lo = mid + 1; else hi = mid;
  }
  var i = Math.max(1, lo);
  var a = route.pts[i - 1], b = route.pts[i];
  var seg = cum[i] - cum[i - 1] || 1;
  var k = (target - cum[i - 1]) / seg;
  return {
    x: a.x + (b.x - a.x) * k,
    y: a.y + (b.y - a.y) * k,
    ang: Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI
  };
}

function tracePartial(ctx, route, frac) {
  var target = clamp(frac, 0, 1) * route.len;
  var pts = route.pts, cum = route.cum;
  ctx.beginPath();
  if (!pts.length) return;
  ctx.moveTo(pts[0].x, pts[0].y);
  for (var i = 1; i < pts.length; i++) {
    if (cum[i] <= target) { ctx.lineTo(pts[i].x, pts[i].y); }
    else {
      var a = pts[i - 1], b = pts[i];
      var seg = cum[i] - cum[i - 1] || 1;
      var k = (target - cum[i - 1]) / seg;
      ctx.lineTo(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k);
      break;
    }
  }
}

/* ---------------- 文本 ---------------- */
function drawText(ctx, text, x, y, o) {
  o = o || {};
  var size = o.size || 8;
  var anchor = o.anchor || 'start';
  var ls = o.ls || 0;
  ctx.save();
  ctx.font = fontOf(size, o.serif);
  ctx.textBaseline = 'alphabetic';
  if (o.rotate) { ctx.translate(x, y); ctx.rotate(o.rotate * Math.PI / 180); x = 0; y = 0; }

  if (!ls) {
    ctx.textAlign = anchor;
    if (o.halo) {
      ctx.lineJoin = 'round';
      ctx.lineWidth = o.haloW || size * 0.3;
      ctx.strokeStyle = o.halo;
      ctx.strokeText(text, x, y);
    }
    ctx.fillStyle = o.color || '#231a10';
    ctx.fillText(text, x, y);
    ctx.restore();
    return;
  }

  // 手工字距：canvas 无 letter-spacing，逐字绘制
  var chars = String(text).split('');
  var widths = chars.map(function (ch) { return ctx.measureText(ch).width; });
  var total = widths.reduce(function (a, b) { return a + b; }, 0) + ls * (chars.length - 1);
  var cx = anchor === 'middle' ? x - total / 2 : anchor === 'end' ? x - total : x;
  ctx.textAlign = 'left';
  for (var i = 0; i < chars.length; i++) {
    if (o.halo) {
      ctx.lineJoin = 'round';
      ctx.lineWidth = o.haloW || size * 0.3;
      ctx.strokeStyle = o.halo;
      ctx.strokeText(chars[i], cx, y);
    }
    ctx.fillStyle = o.color || '#231a10';
    ctx.fillText(chars[i], cx, y);
    cx += widths[i] + ls;
  }
  ctx.restore();
}

// 压缩到指定宽度（原型 textLength + lengthAdjust 的等价实现）
function drawFitText(ctx, text, x, y, width, size, color, serif, halo) {
  ctx.save();
  ctx.font = fontOf(size, serif);
  var w = ctx.measureText(text).width || 1;
  var sx = width / w;
  ctx.translate(x, y);
  ctx.scale(sx, 1);
  if (halo) {
    ctx.lineJoin = 'round'; ctx.lineWidth = 1.4; ctx.strokeStyle = halo;
    ctx.strokeText(text, 0, 0);
  }
  ctx.fillStyle = color;
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

function ellipse(ctx, cx, cy, rx, ry) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(rx, ry);
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, TAU);
  ctx.restore();
}

/* =========================================================
 * 引擎
 * ========================================================= */
function createEngine(opt) {
  var canvas = opt.canvas;
  var battle = opt.battle;
  var STAGES = battle.STAGES, CITY_DEFS = battle.CITY_DEFS,
      INIT_HOLD = battle.INIT_HOLD, COLOR = battle.COLOR, TERRAIN = battle.TERRAIN;
  var META = battle.META || {};
  var N = STAGES.length;                 // 阶段数由数据决定（安史 6 / 赤壁 4）
  var ctx = canvas.getContext('2d');
  var dpr = opt.dpr || 2;
  var W = opt.width || 375, H = opt.height || 380;
  var s = 1, ox = 0, oy = 0;
  var staticCanvas = null, staticReady = false;
  var curIdx = -1, stageCache = null, flips = {};

  function layout() {
    canvas.width = Math.max(1, Math.round(W * dpr));
    canvas.height = Math.max(1, Math.round(H * dpr));
    s = Math.min(W / 375, H / 380);
    ox = (W - 375 * s) / 2;
    oy = (H - 380 * s) / 2;
  }

  function logicTransform(c) {
    c.setTransform(dpr * s, 0, 0, dpr * s, dpr * ox, dpr * oy);
  }

  /* ---------- 静态地形（只画一次，缓存到离屏 canvas） ---------- */
  function drawTerrain(c) {
    TERRAIN.fills.forEach(function (f) {
      var g;
      if (f.grad === 'bankN') {
        g = c.createLinearGradient(0, 0, 0, 380);
        g.addColorStop(0, '#e6d7b7'); g.addColorStop(1, '#f1e5cb');
      } else {
        g = c.createLinearGradient(0, 0, 0, 380);
        g.addColorStop(0, '#f0e3c7'); g.addColorStop(1, '#e2d0ac');
      }
      tracePath(c, parsePath(f.d));
      c.fillStyle = g;
      c.fill();
    });

    TERRAIN.strokes.forEach(function (st) {
      var stroke = st.color;
      if (st.grad === 'riverG') {
        stroke = c.createLinearGradient(0, 100, 375, 300);
        stroke.addColorStop(0, '#b9c3b7');
        stroke.addColorStop(0.55, '#a3b0a5');
        stroke.addColorStop(1, '#8b9d92');
      }
      tracePath(c, parsePath(st.d));
      c.strokeStyle = stroke;
      c.lineWidth = st.width;
      c.lineCap = 'round';
      c.lineJoin = 'round';
      c.stroke();
    });

    TERRAIN.lines.forEach(function (ln) {
      tracePath(c, parsePath(ln.d));
      c.strokeStyle = ln.color;
      c.lineWidth = ln.width;
      c.globalAlpha = ln.opacity == null ? 1 : ln.opacity;
      c.lineCap = 'round';
      c.lineJoin = 'round';
      c.setLineDash(ln.dash || []);
      c.stroke();
      c.globalAlpha = 1;
      c.setLineDash([]);
    });

    TERRAIN.texts.forEach(function (t) {
      drawText(c, t.t, t.x, t.y, {
        size: t.size, color: t.color, ls: t.ls, rotate: t.rotate,
        anchor: t.anchor, serif: t.serif, halo: t.halo, haloW: 1.8
      });
    });
  }

  function buildStatic() {
    try {
      staticCanvas = wx.createOffscreenCanvas({
        type: '2d',
        width: Math.max(1, Math.round(W * dpr)),
        height: Math.max(1, Math.round(H * dpr))
      });
      var sc = staticCanvas.getContext('2d');
      logicTransform(sc);
      drawTerrain(sc);
      staticReady = true;
    } catch (e) {
      staticCanvas = null;
      staticReady = false;
    }
  }

  /* ---------- 阶段派生数据 ---------- */
  function rebuildStage(idx) {
    curIdx = idx;
    var st = STAGES[idx];
    flips = {};
    Object.keys(st.flips || {}).forEach(function (k) { flips[k] = st.flips[k]; });
    st.events.forEach(function (e) { if (e.kind === 'flip' && e.city) flips[e.city] = e.t; });

    var routes = (st.routes || []).map(function (r) {
      var m = measure(sampleSegs(parsePath(r.d), 26));
      return { def: r, pts: m.pts, cum: m.cum, len: m.len, t0: r.t0, t1: r.t1 };
    });
    stageCache = { st: st, routes: routes, infights: st.events.filter(function (e) { return e.kind === 'infight'; }) };
  }

  /* ---------- 视点 ---------- */
  function focusPointOf(e, st, routes) {
    var i;
    if (e.city) {
      for (i = 0; i < CITY_DEFS.length; i++) {
        if (CITY_DEFS[i].id === e.city) {
          return { x: CITY_DEFS[i].x, y: CITY_DEFS[i].y, label: shortName(CITY_DEFS[i].name), city: e.city };
        }
      }
    }
    if (e.at) return { x: e.at.x, y: e.at.y, label: e.who || '', city: null };
    if (e.siege != null && st.sieges && st.sieges[e.siege]) {
      var sg = st.sieges[e.siege];
      var city = null;
      for (i = 0; i < CITY_DEFS.length; i++) {
        if (Math.abs(CITY_DEFS[i].x - sg.x) < 2 && Math.abs(CITY_DEFS[i].y - sg.y) < 2) city = CITY_DEFS[i];
      }
      return { x: sg.x, y: sg.y, label: city ? shortName(city.name) : (sg.label || e.who || ''), city: city ? city.id : null };
    }
    if (e.route != null && routes[e.route]) {
      var r = routes[e.route];
      var v = pointAt(r, 1);
      return { x: v.x, y: v.y, label: (r.def.label || e.who || ''), city: null };
    }
    return null;
  }

  function computeFocus(st, idx, local, p, routes) {
    var ai = -1;
    st.events.forEach(function (e, i) { if (local >= e.t) ai = i; });
    var intro = ai < 0 && idx === 0;
    var pending = ai < 0;
    var pt = pending ? focusPointOf(st.events[0], st, routes) : focusPointOf(st.events[ai], st, routes);
    if (!pt) return { pt: null, ended: p >= N - 0.005 };

    if (!pending) {
      var e = st.events[ai];
      if (e.kind === 'march' && e.route != null && routes[e.route]) {
        var r = routes[e.route];
        var q = clamp((local - r.t0) / (r.t1 - r.t0), 0, 1);
        var v = pointAt(r, q);
        pt = { x: v.x, y: v.y, label: (r.def.label || e.who || ''), city: null };
      }
    }

    var ended = p >= N - 0.005;
    var k = pending ? 0 : Math.max(0, local - st.events[ai].t);
    var pulse = pending ? 0 : Math.max(0, 1 - k / 0.26);
    return {
      pt: pt, ended: ended, intro: intro, pending: pending, pulse: pulse,
      focusCity: pt.city || null,
      dim: ended ? 0.16 : (intro ? 0.26 : 0.46),
      capKey: ended ? '终局' : (intro ? '战前' : '视点'),
      capText: ended ? (META.focusEnd || '') : (intro ? (META.focusIntro || '') : pt.label)
    };
  }

  /* ---------- 城池 ---------- */
  function drawCities(idx, local, focusCity) {
    var st = STAGES[idx];
    var neutral = META.cityMode === 'neutral';
    var prev = idx === 0 ? INIT_HOLD : STAGES[idx - 1].hold;
    CITY_DEFS.forEach(function (c) {
      var isFocal = focusCity === c.id;

      if (neutral) {
        // 地点模式：只标位置与名称，不表现控制方（原型 b-ink 的 places）
        ctx.beginPath();
        ctx.arc(c.x, c.y, 3.2, 0, TAU);
        ctx.fillStyle = '#5c4a36';
        ctx.fill();
        ctx.strokeStyle = '#231a10';
        ctx.lineWidth = isFocal ? 1.9 : 1.2;
        ctx.stroke();
        ctx.globalAlpha = isFocal ? 1 : 0.72;
        drawText(ctx, c.name, c.tx, c.ty, {
          size: 10.5, color: '#231a10', anchor: c.anchor, serif: true,
          ls: 1, halo: '#f1e5cb', haloW: 2.8
        });
        ctx.globalAlpha = 1;
        return;
      }

      var target = st.hold[c.id] || 'tang';
      var from = prev[c.id] || 'tang';
      var changed = target !== from;
      var ft = changed ? (flips[c.id] != null ? flips[c.id] : 0) : Infinity;
      var on = local >= ft;
      var side = on ? target : from;

      // 易手脉冲圈（由进度推导，可回拖重现）
      if (changed && on) {
        var k = Math.min(1, (local - ft) / 0.16);
        ctx.beginPath();
        ctx.arc(c.x, c.y, 4.6 + 7.5 * k, 0, TAU);
        ctx.strokeStyle = COLOR[target];
        ctx.lineWidth = 1.3;
        ctx.globalAlpha = 0.85 * (1 - k);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // 城点
      ctx.beginPath();
      ctx.arc(c.x, c.y, 3.2, 0, TAU);
      ctx.fillStyle = COLOR[side];
      ctx.fill();
      ctx.strokeStyle = side === 'contested' ? '#9c6b2e' : '#231a10';
      ctx.lineWidth = isFocal ? 1.9 : 1.2;
      ctx.setLineDash(side === 'contested' ? [2, 1.6] : []);
      ctx.stroke();
      ctx.setLineDash([]);

      // 城名：非视点城名整体略淡，与原型 opacity .72 一致
      ctx.globalAlpha = isFocal ? 1 : 0.72;
      drawText(ctx, c.name, c.tx, c.ty, {
        size: 10.5, color: '#231a10', anchor: c.anchor, serif: true,
        ls: 1, halo: '#f1e5cb', haloW: 2.8
      });
      ctx.globalAlpha = 1;

      // 易手小签
      if (changed && on) {
        var tagX = c.anchor === 'start' ? -7 : 7;
        var tagA = c.anchor === 'start' ? 'end' : 'start';
        drawText(ctx, '易手', c.x + tagX, c.y + 2.6, {
          size: 7, color: '#9c3d24', anchor: tagA, serif: true, halo: '#f1e5cb', haloW: 2.4
        });
      }
    });
  }

  /* ---------- 路线 ---------- */
  function drawRoutes(local, routes) {
    var activeRoute = -1;
    routes.forEach(function (r, i) { if (local >= r.t0) activeRoute = i; });

    routes.forEach(function (r, i) {
      var part = clamp((local - r.t0) / (r.t1 - r.t0), 0, 1);
      var active = i === activeRoute;
      var past = local > r.t1 + 0.02;
      var col = COLOR[r.def.side] || COLOR.rebel;

      if (part <= 0) return;
      tracePartial(ctx, r, part);
      // 火攻线：先铺一层宽而淡的焰光，再压主线
      if (r.def.side === 'fire') {
        ctx.strokeStyle = '#e0874a';
        ctx.lineWidth = 9;
        ctx.lineCap = 'round';
        ctx.globalAlpha = (active ? 1 : (past ? 0.42 : 0.78)) * 0.16;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.strokeStyle = col;
      ctx.lineWidth = r.def.side === 'retreat' ? 1.7 : (r.def.side === 'fire' ? 2 : 1.9);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash(r.def.side === 'retreat' ? [4, 3] : []);
      if (r.def.side === 'retreat') ctx.lineDashOffset = -local * 46;
      ctx.globalAlpha = active ? 1 : (past ? 0.42 : 0.78);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;

      // 前锋箭头
      if (active && part > 0.9) {
        var e = pointAt(r, 1);
        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(e.ang * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.lineTo(-7, -3.4); ctx.lineTo(-7, 3.4); ctx.closePath();
        ctx.fillStyle = col;
        ctx.fill();
        ctx.restore();
      }

      // 路线标注
      var lbOn = active && part > 0.45;
      var lbAlpha = lbOn ? 1 : (past ? 0.3 : 0);
      if (r.def.label && lbAlpha > 0) {
        ctx.globalAlpha = lbAlpha;
        drawText(ctx, r.def.label, r.def.lx, r.def.ly, {
          size: 8, color: '#3a2b1c', anchor: r.def.anchor, halo: '#f1e5cb', haloW: 2.6
        });
        ctx.globalAlpha = 1;
      }

      // 溃退线沿线行进点
      if (r.def.side === 'retreat' && part > 0.03 && part < 0.985) {
        var q = pointAt(r, part);
        ctx.beginPath();
        ctx.arc(q.x, q.y, 2.2, 0, TAU);
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    });
  }

  /* ---------- 军势节点 ---------- */
  function infightAttr(e, local) {
    var k = local - e.t;
    if (k <= 0.18) return 0;
    return Math.min(1, (k - 0.18) / (0.32 - 0.18));
  }

  function drawFlag(ctx, dx, dy, col, poleH, penW, penH) {
    ctx.save();
    ctx.translate(dx, dy);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -poleH);
    ctx.strokeStyle = col; ctx.lineWidth = 1.1; ctx.globalAlpha = 0.9; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -poleH); ctx.lineTo(penW, -poleH + penH); ctx.lineTo(0, -poleH + penH * 2);
    ctx.closePath(); ctx.fillStyle = col; ctx.globalAlpha = 0.82; ctx.fill();
    ctx.restore();
  }

  function drawMarkers(local, routes, infights) {
    STAGES[curIdx].markers.forEach(function (m) {
      var on = local >= m.t && (m.tOut == null || local < m.tOut);
      if (!on) return;
      var past = local > m.t + 0.3;

      // 位置：moveRef 指向的路线，从起点沿路推进
      var px = m.x, py = m.y, mv = null;
      if (m.moveRef != null && routes[m.moveRef]) {
        mv = routes[m.moveRef];
        var q = clamp((local - mv.t0) / (mv.t1 - mv.t0), 0, 1) * (m.moveEnd == null ? 1 : m.moveEnd);
        var v = pointAt(mv, q);
        px = v.x; py = v.y;
      }

      // 减员收缩：只收旗标/队列，不缩名字
      var sh = m.shrink == null ? null : m.shrink;
      if (m.attrition) {
        sh = 1;
        infights.forEach(function (e) { sh *= 1 - 0.16 * infightAttr(e, local); });
      }

      var alpha = m.weak ? (past ? 0.46 : 0.55) : (past ? 0.68 : 1);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(px, py);
      if (sh != null) ctx.scale(sh, sh);

      var col = COLOR[m.side];
      if (m.type === 'army') {
        ctx.beginPath(); ctx.arc(0, 0, 5.2, 0, TAU);
        ctx.fillStyle = '#f7efdb'; ctx.fill();
        ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -13);
        ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, -13); ctx.lineTo(9, -10.6); ctx.lineTo(0, -8.2); ctx.closePath();
        ctx.fillStyle = col; ctx.globalAlpha *= 0.92; ctx.fill(); ctx.globalAlpha /= 0.92;
        ctx.beginPath(); ctx.arc(0, 0, 1.7, 0, TAU); ctx.fillStyle = col; ctx.fill();
      } else if (m.type === 'navy') {
        // 舟：船身 + 桅 + 斜帆（原型 b-ink 的 navy）
        ctx.beginPath();
        ctx.moveTo(-7, 0); ctx.lineTo(7, 0); ctx.lineTo(4.4, 4.6); ctx.lineTo(-4.4, 4.6);
        ctx.closePath(); ctx.fillStyle = col; ctx.globalAlpha *= 0.9; ctx.fill(); ctx.globalAlpha /= 0.9;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -10);
        ctx.strokeStyle = col; ctx.lineWidth = 1.1; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(6.4, -6); ctx.lineTo(0, -3);
        ctx.closePath(); ctx.fillStyle = col; ctx.globalAlpha *= 0.78; ctx.fill(); ctx.globalAlpha /= 0.78;
      } else if (m.type === 'fleet') {
        // 船阵：三艘并排 + 队列虚线（原型 b-ink 的 fleet）
        [-8, 0, 8].forEach(function (dx, i) {
          ctx.save();
          ctx.translate(dx, i === 1 ? -4 : 0);
          ctx.beginPath();
          ctx.moveTo(-5.4, 0); ctx.lineTo(5.4, 0); ctx.lineTo(3.4, 3.8); ctx.lineTo(-3.4, 3.8);
          ctx.closePath(); ctx.fillStyle = col; ctx.globalAlpha *= 0.85; ctx.fill(); ctx.globalAlpha /= 0.85;
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -7);
          ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(4.6, -4.2); ctx.lineTo(0, -2);
          ctx.closePath(); ctx.fillStyle = col; ctx.globalAlpha *= 0.7; ctx.fill(); ctx.globalAlpha /= 0.7;
          ctx.restore();
        });
        ctx.beginPath(); ctx.moveTo(-12, 5); ctx.lineTo(12, 5);
        ctx.strokeStyle = col; ctx.lineWidth = 0.8; ctx.setLineDash([2, 2]);
        ctx.globalAlpha *= 0.6; ctx.stroke(); ctx.globalAlpha /= 0.6; ctx.setLineDash([]);
      } else {
        // 三面旗 + 队列线
        var inward = sh != null ? 0.52 + 0.48 * sh : 1;
        [-5.5, 0, 5.5].forEach(function (dx, i) {
          var fade = 1;
          if (sh != null && i !== 1) {
            var lim = i === 0 ? 0.93 : 0.78;
            fade = Math.max(0, Math.min(1, (sh - lim + 0.13) / 0.13));
          }
          if (fade <= 0) return;
          ctx.save();
          ctx.globalAlpha *= fade;
          drawFlag(ctx, dx * inward, i === 1 ? -3 : 0, col, 9, 6, 2.4);
          ctx.restore();
        });
        var hw = sh != null ? 9 * sh : 9;
        ctx.beginPath(); ctx.moveTo(-hw, 3); ctx.lineTo(hw, 3);
        ctx.strokeStyle = col; ctx.lineWidth = 0.9; ctx.setLineDash([2, 2]);
        ctx.globalAlpha *= 0.6; ctx.stroke(); ctx.globalAlpha /= 0.6; ctx.setLineDash([]);
      }
      ctx.restore();

      // 名字标签（不随图标收缩）
      var nm = m.name || '';
      if (m.nameSwaps) {
        m.nameSwaps.forEach(function (s) { if (local >= s.t) nm = s.to; });
      }
      if (nm) {
        ctx.globalAlpha = alpha;
        drawText(ctx, nm, px + (m.lx - m.x), py + (m.ly - m.y), {
          size: 8, color: '#2b2118', anchor: m.anchor, halo: '#f1e5cb', haloW: 2.6
        });
        ctx.globalAlpha = 1;
      }
    });
  }

  /* ---------- 攻城 ---------- */
  function drawSieges(local) {
    var st = STAGES[curIdx];
    (st.sieges || []).forEach(function (sg) {
      if (local < sg.t) return;
      var col = COLOR[sg.side] || COLOR.rebel;
      var e = Math.min(1, (local - sg.t) / 0.2);
      ctx.save();
      ctx.translate(sg.x, sg.y);

      ctx.beginPath(); ctx.arc(0, 0, 5.5 + 6.5 * e, 0, TAU);
      ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.setLineDash([2, 2]);
      ctx.globalAlpha = 0.9 - 0.65 * e; ctx.stroke(); ctx.setLineDash([]);

      ctx.globalAlpha = 1 - e;
      ctx.strokeStyle = col; ctx.lineWidth = 1.3; ctx.lineCap = 'round';
      ctx.save();
      ctx.scale(1 + 0.55 * e, 1 + 0.55 * e);
      for (var i = 0; i < 4; i++) {
        var a = i * Math.PI / 2 + Math.PI / 4;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * 6, Math.sin(a) * 6);
        ctx.lineTo(Math.cos(a) * 10.5, Math.sin(a) * 10.5);
        ctx.stroke();
      }
      ctx.restore();
      ctx.globalAlpha = 1;

      drawText(ctx, sg.label || '破城', sg.lx || 0, sg.ly == null ? -13 : sg.ly, {
        size: 7.5, color: col, anchor: sg.anchor || 'middle', serif: true, halo: '#f1e5cb', haloW: 2.6
      });
      ctx.restore();
    });
  }

  /* ---------- 事件动画层 ---------- */
  function evPoint(ev) {
    if (ev.city) {
      for (var i = 0; i < CITY_DEFS.length; i++) {
        if (CITY_DEFS[i].id === ev.city) return { x: CITY_DEFS[i].x, y: CITY_DEFS[i].y };
      }
    }
    return ev.at || { x: 187, y: 190 };
  }

  function drawEventFx(local, st, routes) {
    st.events.forEach(function (ev, evIndex) {
      var k = local - ev.t;

      if (ev.kind === 'march') {
        if (k < 0 || k > 0.18) return;
        var r = routes[ev.route];
        if (!r) return;
        var part = clamp((local - r.t0) / (r.t1 - r.t0), 0, 1);
        var v = pointAt(r, part);
        ctx.save();
        ctx.translate(v.x, v.y);
        ctx.rotate(v.ang * Math.PI / 180);
        ctx.globalAlpha = (1 - k / 0.18) * 0.9 * Math.sin(Math.PI * Math.min(1, k / 0.18));
        ctx.beginPath();
        ctx.moveTo(-4.6, -3.6); ctx.lineTo(2.2, 0); ctx.lineTo(-4.6, 3.6);
        ctx.strokeStyle = COLOR[r.def.side] || COLOR.rebel;
        ctx.lineWidth = 1.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.restore();
        return;
      }

      if (ev.kind !== 'raise' && ev.kind !== 'infight' && ev.kind !== 'fall') return;
      if (k < 0) return;
      var pt = evPoint(ev);

      if (ev.kind === 'raise') {
        var a = clamp(k / 0.12, 0, 1);
        var h = clamp(k / 0.22, 0, 1);
        ctx.save();
        ctx.translate(pt.x, pt.y);
        // 晕圈
        ctx.beginPath(); ctx.arc(0, 0, 5 + 10 * h, 0, TAU);
        ctx.strokeStyle = COLOR.tang; ctx.lineWidth = 1.1;
        ctx.globalAlpha = 0.7 * (1 - h); ctx.stroke(); ctx.globalAlpha = 1;
        // 引线
        var sx = ev.sx || 0, sy = ev.sy == null ? 13 : ev.sy;
        ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(sx, sy - 5.5);
        ctx.strokeStyle = '#9c3d24'; ctx.lineWidth = 0.9; ctx.setLineDash([1, 1.4]);
        ctx.globalAlpha = 0.8; ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
        // 玺印
        ctx.save();
        ctx.translate(sx, sy);
        var sc = 0.62 + 0.38 * ease(a);
        ctx.scale(sc, sc);
        ctx.beginPath();
        ctx.rect(-6.5, -5.5, 13, 12);
        ctx.fillStyle = '#f6ecd6'; ctx.fill();
        ctx.strokeStyle = '#9c3d24'; ctx.lineWidth = 1.1; ctx.stroke();
        drawText(ctx, ev.mark || '立', 0, 4, {
          size: 8, color: '#9c3d24', anchor: 'middle', serif: true
        });
        ctx.restore();
        ctx.restore();
        return;
      }

      if (ev.kind === 'infight') {
        drawInfight(ev, pt, k, local, st, evIndex);
        return;
      }

      // fall：旗杆折倒
      var f = clamp(k / 0.24, 0, 1);
      ctx.save();
      ctx.translate(pt.x, pt.y);
      ctx.save();
      ctx.rotate(-74 * ease(f) * Math.PI / 180);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -15);
      ctx.strokeStyle = '#5c4a36'; ctx.lineWidth = 1.1; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(10, -11.6); ctx.lineTo(0, -8.2); ctx.closePath();
      ctx.fillStyle = '#6f3a22'; ctx.globalAlpha = 0.9; ctx.fill();
      ctx.restore();
      ctx.strokeStyle = '#5c4a36'; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.rect(6, -6, 9, 9); ctx.stroke();
      drawText(ctx, ev.mark || '亡', 10.5, 1.6, {
        size: 7, color: '#5c4a36', anchor: 'middle', serif: true
      });
      ctx.restore();
    });
  }

  /**
   * 内讧三段（起势 → 动手 → 余波），全部向中心收，与攻城的向外扩散相反。
   * 兵势的旗标收缩、兵力条的减员都由同一组时刻驱动（0.18 起收、0.32 定格）。
   */
  function drawInfight(ev, pt, k, local, st, evIndex) {
    var A = 0.08, B = 0.18, D = 0.32;
    var ea = clamp(k / A, 0, 1);
    var eb = clamp((k - A) / (B - A), 0, 1);
    var ec = clamp((k - B) / (D - B), 0, 1);

    ctx.save();
    ctx.translate(pt.x, pt.y);

    // 墨圈向心塌缩
    ctx.beginPath(); ctx.arc(0, 0, 13 - 8.2 * ease(ea), 0, TAU);
    ctx.strokeStyle = '#7d1f16'; ctx.lineWidth = 1;
    ctx.globalAlpha = 0.55 * (1 - ea) + 0.16 * (1 - eb);
    ctx.stroke();

    // 四向内指短矢
    ctx.globalAlpha = 0.68 * (1 - ea);
    ctx.save();
    var sc = 1.34 - 0.55 * ease(ea) - 0.1 * eb;
    ctx.scale(sc, sc);
    ctx.strokeStyle = '#7d1f16'; ctx.lineWidth = 1; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (var i = 0; i < 4; i++) {
      var ang = i * Math.PI / 2 + Math.PI / 4;
      var ox = Math.cos(ang) * 11, oy = Math.sin(ang) * 11;
      var ix = Math.cos(ang) * 7, iy = Math.sin(ang) * 7;
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ix, iy); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ix + 1.5 * Math.cos(ang + 1.9), iy + 1.5 * Math.sin(ang + 1.9));
      ctx.lineTo(ix, iy);
      ctx.lineTo(ix + 1.5 * Math.cos(ang - 1.9), iy + 1.5 * Math.sin(ang - 1.9));
      ctx.stroke();
    }
    ctx.restore();
    ctx.globalAlpha = 1;

    // 泼墨：迸开后沉淀为渍，永久留存
    var splashes = [
      { dx: 15, dy: -11, s: 1.15, c: '#3d2a1a' },
      { dx: -16, dy: -10, s: 0.95, c: '#3d2a1a' },
      { dx: 16, dy: 9, s: 0.85, c: '#6a4a2c' },
      { dx: -14, dy: 11, s: 1.05, c: '#3d2a1a' },
      { dx: 4, dy: -16, s: 0.7, c: '#7d3a24' },
      { dx: -5, dy: 15, s: 0.8, c: '#3d2a1a' }
    ];
    var e2 = ease(eb);
    splashes.forEach(function (o) {
      ctx.save();
      ctx.translate(o.dx * e2, o.dy * e2);
      var ss = (0.22 + 1.06 * e2) * o.s;
      ctx.scale(ss, ss);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(2.6, -3.4, 6, -1.4, 4.6, 1.8);
      ctx.bezierCurveTo(3.4, 4.6, -1.6, 4, -1.4, 0.8);
      ctx.closePath();
      ctx.fillStyle = o.c;
      ctx.globalAlpha = 0.66 * (1 - 0.3 * ec);
      ctx.fill();
      ctx.restore();
    });

    // 残旗：动手后垂落
    ctx.save();
    ctx.rotate(-38 * ease(eb) * Math.PI / 180);
    ctx.beginPath(); ctx.moveTo(-17, 2); ctx.lineTo(-17, -10);
    ctx.strokeStyle = '#5c4a36'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-17, -10); ctx.lineTo(-10.5, -8.6); ctx.lineTo(-12.4, -6.6);
    ctx.lineTo(-9.2, -5.4); ctx.lineTo(-12.6, -4.2); ctx.lineTo(-10, -3); ctx.lineTo(-17, -3.8);
    ctx.closePath();
    ctx.fillStyle = '#6f3a22'; ctx.globalAlpha = 0.85; ctx.fill();
    ctx.restore();

    // 交叉断刃：动手相击轻抖，刃尖崩离
    var j = (eb > 0 && eb < 0.55) ? ((Math.floor(k / 0.018) % 2 ? 1 : -1) * (1 - eb / 0.55) * 1.3) : 0;
    ctx.save();
    ctx.translate(j, j * 0.6);
    var bs = 0.9 + 0.12 * ease(eb);
    ctx.scale(bs, bs);
    ctx.rotate((18 - 18 * ease(ea)) * Math.PI / 180);
    ctx.strokeStyle = '#33261a'; ctx.lineCap = 'round';
    ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(-10, -8); ctx.lineTo(-1, 1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(10, -8); ctx.lineTo(2.2, 0.8); ctx.stroke();
    ctx.save();
    ctx.translate(3.6 * ease(eb), 3.6 * ease(eb));
    ctx.rotate(26 * ease(eb) * Math.PI / 180);
    ctx.lineWidth = 1.6;
    ctx.globalAlpha = 0.92 - 0.35 * ec;
    ctx.beginPath(); ctx.moveTo(4.4, 2.6); ctx.lineTo(1.4, 5.6); ctx.stroke();
    ctx.restore();
    ctx.restore();

    // 散落甲片：崩开、翻转、落地
    var shards = [
      { dx: -10, dy: -13, r: -70, c: '#6a5540' }, { dx: 11, dy: -12, r: 80, c: '#4a3826' },
      { dx: -15, dy: 2, r: -35, c: '#6f5a44' }, { dx: 14, dy: 3, r: 55, c: '#5c4733' },
      { dx: -7, dy: 13, r: -20, c: '#4a3826' }, { dx: 8, dy: 14, r: 40, c: '#6a5540' }
    ];
    shards.forEach(function (o) {
      var x = o.dx * e2, y = o.dy * e2 + 5.5 * ec * ec;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((o.r * e2 + 26 * ec * (o.dx < 0 ? -1 : 1)) * Math.PI / 180);
      ctx.beginPath(); ctx.rect(-1.5, -1.9, 3, 3.8);
      ctx.fillStyle = o.c; ctx.strokeStyle = '#2f2416'; ctx.lineWidth = 0.35;
      ctx.globalAlpha = 0.72 * Math.min(1, eb * 3) * (1 - 0.22 * ec);
      ctx.fill(); ctx.stroke();
      ctx.restore();
    });

    // 墨渍沉淀
    ellipse(ctx, 0, 1.5, 3.6 + 4.4 * ease(eb), 2.2 + 2.6 * ease(eb));
    ctx.fillStyle = '#3d2a1a';
    ctx.globalAlpha = 0.16 * ease(eb) + 0.12 * ec;
    ctx.fill();

    // 「弑 / 杀」字
    drawText(ctx, ev.mark || '讧', 0, -10.5, {
      size: 7.5, color: '#7d1f16', anchor: 'middle', serif: true, halo: '#f1e5cb', haloW: 2.6
    });
    ctx.restore();

    // 首领更替签：旧名被划去 → 新名落定 · 易主
    if (ev.lv) {
      var lv = ev.lv;
      var relX = lv.x - pt.x, relY = lv.y - pt.y;
      var total = 71;
      var x0 = lv.anchor === 'start' ? relX + 2
        : lv.anchor === 'end' ? relX - total
          : relX - total / 2 + 2;

      // 同阶段后一次内讧开始后，旧签退为淡痕
      var later = false;
      for (var n = 0; n < st.events.length; n++) {
        var o = st.events[n];
        if (o.kind === 'infight' && o.t > ev.t && local >= o.t) { later = true; break; }
      }

      ctx.save();
      ctx.translate(x0, relY);
      ctx.globalAlpha = later ? 0.45 : 1;

      ctx.beginPath();
      ctx.rect(-3, -8.6, 74, 12.8);
      ctx.fillStyle = '#f4ead4'; ctx.globalAlpha *= 0.96; ctx.fill();
      ctx.strokeStyle = 'rgba(92,74,54,0.42)'; ctx.lineWidth = 0.5; ctx.stroke();
      ctx.globalAlpha /= 0.96;

      var strike = clamp((k - A) / 0.06, 0, 1);
      var swap = clamp((k - A - 0.03) / 0.07, 0, 1);

      ctx.globalAlpha *= (1 - 0.55 * clamp((k - A - 0.02) / 0.08, 0, 1));
      drawFitText(ctx, lv.from, 0, 0, 24, 8.2, '#4e3d2c', true, '#f1e5cb');
      ctx.globalAlpha /= (1 - 0.55 * clamp((k - A - 0.02) / 0.08, 0, 1));
      ctx.restore();

      // 划去的朱线
      ctx.save();
      ctx.translate(x0, relY);
      ctx.globalAlpha = later ? 0.45 : 1;
      ctx.beginPath();
      ctx.moveTo(-1, -3);
      ctx.lineTo(-1 + 23 * ease(strike), -3);
      ctx.strokeStyle = '#9c3d24'; ctx.lineWidth = 1.15; ctx.lineCap = 'round';
      ctx.globalAlpha *= 0.9 * strike;
      ctx.stroke();
      ctx.restore();

      // 箭头 / 新名 / 易主
      ctx.save();
      ctx.translate(x0, relY);
      ctx.globalAlpha = later ? 0.45 : 1;
      drawText(ctx, '→', 25.6, 0, { size: 7, color: '#8a7357', serif: true });
      if (swap > 0) {
        ctx.globalAlpha *= swap;
        drawFitText(ctx, lv.to, 31 + 3 * (1 - swap), 0, 24, 8.2, '#9c3d24', true, '#f1e5cb');
        ctx.globalAlpha /= swap;
      }
      var tagA = clamp((k - B + 0.02) / 0.08, 0, 1);
      if (tagA > 0) {
        ctx.globalAlpha *= tagA;
        drawText(ctx, '易主', 56.4, 0, {
          size: 6.6, color: '#9c3d24', serif: true, ls: 0.4, halo: '#f1e5cb', haloW: 1.2
        });
      }
      ctx.restore();
    }
  }

  /* ---------- 视点与暗角 ---------- */
  function drawFocus(fo) {
    if (!fo.pt) return;
    var pt = fo.pt;

    // 暗角：径向渐变随视点移动
    var g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 200);
    g.addColorStop(0, 'rgba(61,42,26,0)');
    g.addColorStop(0.46, 'rgba(61,42,26,0)');
    g.addColorStop(0.8, 'rgba(61,42,26,0.06)');
    g.addColorStop(1, 'rgba(61,42,26,0.2)');
    ctx.globalAlpha = fo.dim;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 375, 380);
    ctx.globalAlpha = 1;

    var ringR = 11 + 1.8 * fo.pulse;
    ctx.beginPath(); ctx.arc(pt.x, pt.y, ringR, 0, TAU);
    ctx.strokeStyle = '#9c3d24'; ctx.lineWidth = 0.9;
    ctx.globalAlpha = fo.ended ? 0.24 : (fo.pending ? 0.32 : 0.6 + 0.2 * fo.pulse);
    ctx.stroke();

    ctx.beginPath(); ctx.arc(pt.x, pt.y, 15 + 8 * fo.pulse, 0, TAU);
    ctx.fillStyle = '#9c3d24';
    ctx.globalAlpha = fo.ended ? 0.02 : (0.035 + 0.055 * fo.pulse);
    ctx.fill();

    ctx.beginPath(); ctx.arc(pt.x, pt.y, 1.5, 0, TAU);
    ctx.fillStyle = '#9c3d24';
    ctx.globalAlpha = fo.ended ? 0.2 : 0.6;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  /* ---------- 火攻 / 风势（赤壁等火战；数据无 fires 时整段跳过） ---------- */
  function flamePath(k, inner) {
    var s = inner ? 0.56 : 1;
    ctx.beginPath();
    ctx.moveTo(0, -14 * s * k);
    ctx.bezierCurveTo(6 * s * k, -10 * s * k, 8 * s * k, -4 * s * k, 5 * s * k, 1 * s * k);
    ctx.bezierCurveTo(3 * s * k, 5 * s * k, -3 * s * k, 5 * s * k, -5 * s * k, 1 * s * k);
    ctx.bezierCurveTo(-8 * s * k, -3 * s * k, -6 * s * k, -8 * s * k, -3 * s * k, -10 * s * k);
    ctx.bezierCurveTo(-2 * s * k, -6 * s * k, 0, -5 * s * k, 0, -3 * s * k);
    ctx.bezierCurveTo(1 * s * k, -7 * s * k, 0, -12 * s * k, 0, -14 * s * k);
    ctx.closePath();
  }

  function drawFires(local, st) {
    if (!st.fires) return;
    st.fires.forEach(function (f, fi) {
      var q = clamp((local - f.t) / 0.14, 0, 1);
      if (q <= 0) return;
      var e = q * q * (3 - 2 * q);
      var k = f.r / 28;
      var g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * (0.6 + 0.4 * e));
      g.addColorStop(0, 'rgba(224,136,74,0.55)');
      g.addColorStop(1, 'rgba(224,136,74,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r * (0.6 + 0.4 * e), 0, TAU);
      ctx.fill();

      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.globalAlpha = e * 0.94;
      var grow = 0.18 + 0.82 * e;
      [-8, 0, 8].forEach(function (dx, i) {
        ctx.save();
        ctx.translate(dx * k, (i === 1 ? -2 : 0) * k);
        var wob = 1 + 0.06 * Math.sin(local * 22 + i * 2 + fi);
        ctx.scale(grow * wob, grow);
        flamePath(1, false);
        ctx.fillStyle = '#c4582c';
        ctx.fill();
        flamePath(1, true);
        ctx.fillStyle = '#f2c982';
        ctx.fill();
        ctx.restore();
      });
      ctx.restore();
      ctx.globalAlpha = 1;
    });

    // 飞散的火星
    var base = st.fires[0];
    for (var i = 0; i < 9; i++) {
      var q2 = clamp((local - 0.58 - i * 0.022) / 0.34, 0, 1);
      if (q2 <= 0 || q2 >= 1) continue;
      var x = base.x + (i - 4) * 3.2 + Math.sin(q2 * 9 + i) * 4;
      var y = base.y - 6 - q2 * (26 + (i % 4) * 6);
      ctx.beginPath();
      ctx.arc(x, y, 0.9 + (i % 3) * 0.3, 0, TAU);
      ctx.fillStyle = i % 2 ? '#e0874a' : '#f2c982';
      ctx.globalAlpha = Math.sin(Math.PI * q2) * 0.85;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawWind(local, st) {
    if (!st.wind || local < 0.25) return;
    var a = clamp((local - 0.25) / 0.16, 0, 1);
    ctx.save();
    ctx.globalAlpha = a * 0.5;
    ctx.strokeStyle = '#5c4a36';
    ctx.lineWidth = 1;
    ctx.setLineDash([16, 9]);
    ctx.lineDashOffset = -local * 90;
    [
      'M 262 34 C 282 28 300 36 318 32',
      'M 272 48 C 292 42 310 50 332 44',
      'M 284 62 C 302 56 318 64 340 58'
    ].forEach(function (d) {
      parsePath(d).forEach(function (s) {
        ctx.beginPath();
        ctx.moveTo(s.x0, s.y0);
        if (s.type === 'C') ctx.bezierCurveTo(s.c1x, s.c1y, s.c2x, s.c2y, s.x1, s.y1);
        else if (s.type === 'L') ctx.lineTo(s.x1, s.y1);
        ctx.stroke();
      });
    });
    ctx.setLineDash([]);
    ctx.restore();

    ctx.globalAlpha = a * 0.9;
    drawText(ctx, '东 南 风 急', 306, 76, {
      size: 8, color: '#8c3520', anchor: 'middle', serif: true, ls: 2
    });
    ctx.globalAlpha = 1;
  }

  /* ---------- 主绘制 ---------- */
  function draw(p) {
    p = clamp(p, 0, N);
    var idx = Math.min(N - 1, Math.floor(p));
    var local = Math.min(1, p - idx);

    if (idx !== curIdx) rebuildStage(idx);
    var st = STAGES[idx];
    var routes = stageCache.routes;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // 静态地形
    if (staticReady && staticCanvas) {
      ctx.drawImage(staticCanvas, 0, 0, W, H);
    } else {
      ctx.save();
      logicTransform(ctx);
      drawTerrain(ctx);
      ctx.restore();
    }

    // 动态层
    ctx.save();
    logicTransform(ctx);
    var fo = computeFocus(st, idx, local, p, routes);
    drawRoutes(local, routes);
    drawMarkers(local, routes, stageCache.infights);
    drawFires(local, st);
    drawSieges(local);
    drawCities(idx, local, fo.focusCity);
    drawEventFx(local, st, routes);
    drawFocus(fo);
    drawWind(local, st);

    // 战火期：绢底泛红（由阶段数据的 burn 标记决定）
    if (st.burn) {
      var bg = ctx.createRadialGradient(217, 205, 0, 217, 205, 140);
      bg.addColorStop(0, 'rgba(178,49,28,0.18)');
      bg.addColorStop(1, 'rgba(178,49,28,0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 375, 380);
    }
    ctx.restore();

    return {
      stage: idx,
      local: local,
      ended: p >= N - 0.005,
      focusKey: fo.capKey || '视点',
      focusText: fo.capText || '',
      focusCity: fo.focusCity || null
    };
  }

  function resize(w, h, ratio) {
    W = w; H = h;
    dpr = ratio || dpr;
    layout();
    buildStatic();
  }

  layout();
  buildStatic();

  return { draw: draw, resize: resize };
}

module.exports = { createEngine: createEngine };
