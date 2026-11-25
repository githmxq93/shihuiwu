/**
 * 大事年表（年表 + 战史双记）
 * 规格来源：_design/merge/b-year-book.html（375×812，px 视觉基准，本页按 1px = 2rpx 落地）
 *
 * 结构：
 *   nav-bar（fixed） → hero（随页滚动，滚过后塌成 36px 标题条）
 *   → 吸顶区（搜索药丸 + 奶金年代尺按钮 + 年代尺）：position:sticky
 *   → 列表（7 个时代分段头，sticky 在吸顶区下方交替顶替）
 *
 * 吸顶偏移不用写死：_measure() 用 SelectorQuery 量出 hero / 吸顶区 / 行位置，
 * 把 searchTop、stickTop 以 px 写回 data（rpx 只用于尺寸，吸顶用 px 才准）。
 */
const request = require('../../../utils/request');
const API = require('../../../config/api');
const CHRONICLE = require('../../data/chronicle');
const guide = require('../../../utils/guide');

/* 战史库并入：年表 581 条 + 战史库中未双记且未折叠的 379 条 = 960 条。
   入列年份取战役 time 的最早年份（区间取起点）；解析不出的进「年份待定」区。
   带 parent 的战役（如安史之乱 17 场）不独立成行，折叠进同名纪事事件的展开区。 */

/* 7 个时代：起讫年为整数年，首尾相接（相邻段 end + 1 = 下一段 start） */
const ERA = [
  { name: '先秦', start: -3000, end: -222 },
  { name: '秦汉', start: -221, end: 220 },
  { name: '魏晋', start: 221, end: 580 },
  { name: '隋唐', start: 581, end: 906 },
  { name: '宋元', start: 907, end: 1367 },
  { name: '明清', start: 1368, end: 1911 },
  { name: '近现代', start: 1912, end: 3000 }
];
/* 与效果图同一组段色 */
const SEG_COLOR = ['#d8c39c', '#c9a882', '#a9bda3', '#dcc38a', '#a9bccb', '#c2a491', '#b8a894'];

/* 10 个事件分类：筛选入口用；纯战役行的 cat 是「战史」，不在这 10 类里 */
const CAT_LIST = ['军事', '政治', '科技', '文化', '经济', '外事', '制度', '社会', '灾疫', '考古'];

const TB_H = 36;      // 塌陷后标题条高度（px）
const COLLAPSE_BACK = 48; // 收起后再回滚多少 px 才恢复药丸常驻（迟滞带，防阈值边缘抖动）
const HEAD_H = 28;    // 时代分段头高度（px）
const RULER_W = 351;  // 年代尺设计基准宽（px），实际按画布宽度等比缩放
const RULER_H = 118;
const BUCKET = 50;    // 密度直方图 50 年/桶

/* ═══════════════ 纯函数 ═══════════════ */

function fmtY(y) {
  return y < 0 ? '前' + (-y) : String(y);
}

/* 干支：与 server/routes/timeline.js 同口径。公元前没有「公元 0 年」，按 y+1 推 */
const GAN = '甲乙丙丁戊己庚辛壬癸'.split('');
const ZHI = '子丑寅卯辰巳午未申酉戌亥'.split('');
function ganzhi(y) {
  if (!Number.isFinite(y) || y === 0) return '';
  const yy = y < 0 ? y + 1 : y;
  return GAN[(((yy - 4) % 10) + 10) % 10] + ZHI[(((yy - 4) % 12) + 12) % 12];
}

/* 年号内的第 n 年：元年 / 二年 / 十二年 */
const CN_DIGIT = '〇一二三四五六七八九';
function cnNum(n) {
  if (n < 10) return CN_DIGIT[n];
  if (n < 20) return '十' + (n % 10 ? CN_DIGIT[n % 10] : '');
  const t = Math.floor(n / 10);
  const r = n % 10;
  return CN_DIGIT[t] + '十' + (r ? CN_DIGIT[r] : '');
}

/**
 * 展开区的一句话概要：只取 d 的首句，超长截断。
 * 展开区与抽屉的分工在这里落地 —— 抽屉给 d 全文，展开区永远只是首句，
 * 不整段搬运，避免两层显示同一段话。
 */
function briefOf(text, max) {
  const s = String(text == null ? '' : text).replace(/\s+/g, ' ').trim();
  if (!s) return '';
  const m = s.match(/^[^。！？；]*[。！？；]/);
  let out = (m ? m[0] : s).replace(/[。；]$/, '');
  if (out.length > max) out = out.slice(0, max - 1) + '…';
  return out;
}

function eraIdx(y) {
  for (let i = 0; i < ERA.length; i++) {
    if (y >= ERA[i].start && y <= ERA[i].end) return i;
  }
  return ERA.length - 1;
}

/** 年份直查：1937 / 前221 / 1937年 */
function parseYearQ(s) {
  const m = /^\s*(前)?(\d{1,4})\s*年?\s*$/.exec(s);
  if (!m) return null;
  const n = parseInt(m[2], 10);
  return m[1] ? -n : n;
}

/** 战史时间是否是区间（「前260年—前257年」「1915年12月—1916年6月」） */
function isRange(t) {
  return /[—\-~]/.test(String(t || '')) && !/^前?\d+年$/.test(String(t || ''));
}

/** 从战史时间串里取年份序列；不足百年的数字视为月份/日，沿用上一个年份 */
function yearsOf(t) {
  const out = [];
  let cur = null;
  String(t || '').split(/[—\-~]/).forEach(function (p) {
    const neg = p.indexOf('前') >= 0;
    const m = p.match(/(\d{1,4})/);
    if (!m) return;
    let v = (neg ? -1 : 1) * parseInt(m[1], 10);
    if (Math.abs(v) < 100 && cur != null) v = cur;
    out.push(v);
    if (Math.abs(v) >= 100) cur = v;
  });
  return out;
}

/** 名称归一化：去空格与各种连接/括注符号（括注内容保留，便于「靖康之变（东京保卫战）」命中） */
function normName(s) {
  return String(s || '').replace(/[\s·・—\-—_（）()《》「」『』]/g, '');
}

/**
 * 纪事与战史对同一场的不同叫法：纪事「台儿庄大捷」↔ 战史「徐州会战（台儿庄战役）」。
 * 两者既不相等也不互相包含，只能人工给一条别名；不做通用词尾归一，
 * 因为那会把「平定大小和卓」也并进「大小和卓之乱」，超出本次改动范围。
 */
const MERGE_ALIAS = { 台儿庄大捷: '台儿庄战役' };

/**
 * 战史库里部分名称写成「母事件 — 子战役」，纯战役行直接照搬会读成母事件的子条。
 * 这里只给行标题换名，战史卡与抽屉仍用 cp.name 原名（原名作为副信息保留）。
 * 只收录本条：甲午两役等前缀不影响阅读，不顺手改名，避免超出改动范围。
 * 搜索口径同步收紧（见 blobOf）：否则搜「安史之乱」会同时命中 755 与 757。
 */
const BATTLE_TITLE = { '安史之乱 — 睢阳之战': '睢阳之战' };

/**
 * 子战役年份标签：取 time 的首尾年，同年不重复（「757年1月 — 2月」→ 757）。
 * 解析不出年份给「待定」，与列表的年份待定区同一口径。
 */
function kidYearLabel(ys) {
  if (!ys.length) return '待定';
  const a = ys[0];
  const b = ys[ys.length - 1];
  return a === b ? fmtY(a) : fmtY(a) + '—' + fmtY(b);
}

/**
 * 子战役对象：parent 指向的母事件是纪事条目，这里只保留清单与抽屉要用的字段。
 * name 走 BATTLE_TITLE 换名（行内读起来不再是「母事件 — 子战役」），
 * rawName 保留战史库原名，抽屉里作为副信息。blob 供搜索命中。
 */
function makeKid(c, ord) {
  const ys = yearsOf(c.time);
  const name = BATTLE_TITLE[c.name] || c.name;
  const kid = {
    name: name,
    rawName: c.name,
    time: c.time || '',
    ys: ys,
    year: kidYearLabel(ys),
    loc: c.location || '',
    res: c.result || '',
    intro: c.intro || '',
    codes: c.codes || [],
    major: !!c.major,
    ord: ord
  };
  kid.blob = [name, c.name, c.time, kid.loc, kid.res, kid.intro, kid.codes.join(' ')]
    .join(' ').toLowerCase();
  // 事件型子项（如八王之乱的宫廷政变）：不出战史字段，清单带签，点开走纪事档案。
  // 由数据侧 event:true 标记驱动，不按父事件名或人名硬编码。
  if (c.event) {
    kid.chron = true;
    kid.tag = c.tag || '政变';
    kid.row = {
      y: ys.length ? ys[0] : 0,
      m: 0,
      t: c.name,
      d: c.intro || c.result || '',
      cat: '政治',
      imp: c.major ? 3 : 1
    };
  }
  return kid;
}

/**
 * 纪事子项：把一条「纪事事件」折叠进父事件的子清单。它不是战役，
 * 清单里带「结局」签区分身份，抽屉走纪事那一套（不带战史字段与类别码）。
 *
 * 只收录这一条：763 年「安史之乱平定」→ 755「安史之乱」父行的末位子项。
 * 数据侧完全不动（chronicle.js 不加字段、服务端不写库），纯前端映射；
 * 用标题定位，不绑数组下标，避免以后纪事增删时错位。
 */
const CHRON_KIDS = [
  { parent: '安史之乱', title: '安史之乱平定', tag: '结局' }
];

/**
 * 执行上面的映射：把命中的纪事行从列表里摘掉，做成带 chron 标记的子项挂到父行。
 * 必须早于 _appendCampaignOnly —— 子项排序（按年份升序）在那里统一做，
 * 763 自然落在 17 场战役之后。父行或纪事行找不到时原样保留，不丢数据；
 * 重复调用也安全（纪事行已摘除后 child 为 null，自然跳过）。
 */
function foldChronicleKids(rows) {
  const drop = [];
  CHRON_KIDS.forEach(function (m) {
    let host = null;
    let child = null;
    rows.forEach(function (r) {
      if (!host && r.t === m.parent) host = r;
      if (!child && r.t === m.title) child = r;
    });
    if (!host || !child) return;
    const kid = {
      name: child.t,
      rawName: child.t,
      time: fmtY(child.y) + '年',
      ys: [child.y],
      year: fmtY(child.y),
      loc: '',
      res: briefOf(child.d, 40),
      intro: '',
      codes: [],
      major: child.imp >= 3,
      chron: true,          // 抽屉据此走纪事那套
      tag: m.tag,           // 清单里的身份签：结局
      row: child,           // 纪事原行（全文/分类/年份都在里面）
      ord: 900000           // 同年内排最后；年份最大，实际总在末位
    };
    kid.blob = [kid.name, kid.year, kid.res, child.d].join(' ').toLowerCase();
    (host.kids = host.kids || []).push(kid);
    drop.push(child);
  });
  drop.forEach(function (r) {
    const i = rows.indexOf(r);
    if (i >= 0) rows.splice(i, 1);
  });
}

function rangeOf(cp) {
  if (!cp || !isRange(cp.time)) return null;
  const ys = yearsOf(cp.time);
  if (ys.length < 2 || ys[0] === ys[ys.length - 1]) return null;
  return [ys[0], ys[ys.length - 1]];
}

/** 关键词切段：先按 text 节点渲染（小程序没有 <mark>，文本节点本身即转义） */
function partsOf(text, q) {
  const s = String(text == null ? '' : text);
  if (!q) return [{ i: 0, t: s }];
  const low = s.toLowerCase();
  const out = [];
  let from = 0;
  let at = low.indexOf(q);
  while (at >= 0) {
    if (at > from) out.push({ i: out.length, t: s.slice(from, at) });
    out.push({ i: out.length, t: s.slice(at, at + q.length), h: 1 });
    from = at + q.length;
    at = low.indexOf(q, from);
  }
  if (from < s.length) out.push({ i: out.length, t: s.slice(from) });
  return out.length ? out : [{ i: 0, t: s }];
}

/* ═══════════════ 数据装配 ═══════════════ */

/** 基础行：只来自大事年表 581 条（战史由接口补） */
function buildBase() {
  return CHRONICLE.map(function (e, i) {
    return {
      y: e.y,
      m: e.m || 0,          // 月份（仅 84 条有）：抽屉里补「· 6 月」
      t: e.t,
      d: e.d,
      cat: e.c,
      imp: e.i || 1,
      world: !!e.w,
      cp: null,
      rg: null,
      ord: i,
      _blob: [e.t, e.d].join(' ').toLowerCase()
    };
  });
}

function blobOf(r) {
  const cp = r.cp;
  const arr = [r.t, r.d];
  // 纯战役行的标题可能已去掉母事件前缀：搜索只按标题口径，不再把 cp.name 原名塞回索引，
  // 否则搜「安史之乱」会把 757 睢阳之战一起命中
  if (cp) {
    if (!r.battleOnly) arr.push(cp.name);
    arr.push(cp.time, cp.location, cp.result);
  }
  // 折叠在父行下的子战役：并入父行索引，搜「睢阳」「潼关」命中父行并展开清单
  if (r.kids) r.kids.forEach(function (k) { arr.push(k.blob); });
  return arr.join(' ').toLowerCase();
}

/**
 * 双记匹配（与效果图口径一致）：
 *   1) 名称归一化后全等优先；
 *   2) 人工别名（纪事与战史叫法不同但又确为同场，如台儿庄）；
 *   3) 其次名称互相包含且短名 ≥3 字；
 *   4) 政治类条目不并（同名但叙事对象不同，如「皖南事变」）。
 * 年份约束：纪事年份必须落在战史 time 的年份区间内，否则不并 —— 否则
 *   子战役会并到母事件上（「安史之乱」755 vs「睢阳之战」757）。
 * 实际命中 58 条：全等 44 + 包含 13 + 别名 1（台儿庄），其中外事 1 条（白登之围）。
 * 与改前同为 58：睢阳之战因年份不在战役区间内解除双记，台儿庄靠别名补上。
 */
function matchCampaigns(rows, camps) {
  const pools = {};
  const used = {};
  // 带 parent 的战役注定要折叠进父事件，不参与双记；否则会先被某条同名纪事
  // 抢走（_used），折叠阶段就挂不上去。父事件名只存在数据里，这里不硬编码。
  const foldSkip = {};
  camps.forEach(function (c, i) {
    if (c.parent) { foldSkip[i] = 1; return; }
    const k = normName(c.name);
    (pools[k] = pools[k] || []).push(i);
  });

  function take(idx) {
    if (used[idx]) return null;
    used[idx] = 1;
    camps[idx]._used = true;   // 并入阶段据此跳过已双记的战役，保证 58 + 379 + 17 不重复
    return camps[idx];
  }

  /** 纪事年份落在战史 time 的区间内才算同一场；time 解析不出年份时仍以名称为准 */
  function fits(r, c) {
    const ys = yearsOf(c.time);
    if (!ys.length) return true;
    return r.y >= Math.min.apply(null, ys) && r.y <= Math.max.apply(null, ys);
  }

  // 1) 全等
  const pending = [];
  rows.forEach(function (r) {
    if (r.cat === '政治') return;
    const arr = pools[normName(r.t)];
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (used[arr[i]] || !fits(r, camps[arr[i]])) continue;
        const c = take(arr[i]);
        if (c) { r.cp = c; r.rg = rangeOf(c); return; }
      }
    }
    pending.push(r);
  });

  // 2) 别名：名称既不相等也不互相包含，但人工核定是同一场
  const rest = [];
  pending.forEach(function (r) {
    const key = MERGE_ALIAS[normName(r.t)];
    if (!key) { rest.push(r); return; }
    let best = -1;
    camps.forEach(function (c, i) {
      if (used[i] || foldSkip[i] || best >= 0) return;
      if (normName(c.name).indexOf(key) < 0) return;
      if (!fits(r, c)) return;
      best = i;
    });
    const c = best >= 0 ? take(best) : null;
    if (c) { r.cp = c; r.rg = rangeOf(c); return; }
    rest.push(r);
  });

  // 3) 包含（短名 ≥3 字），取重合最长的一条，避免「鸦片战争」误吃「第二次鸦片战争」
  rest.forEach(function (r) {
    const n = normName(r.t);
    if (n.length < 3) return;
    let best = null;
    let bestLen = 0;
    camps.forEach(function (c, i) {
      if (used[i] || foldSkip[i]) return;
      const cn = normName(c.name);
      if (cn.length < 3) return;
      if (cn.indexOf(n) < 0 && n.indexOf(cn) < 0) return;
      if (!fits(r, c)) return;
      const len = Math.min(n.length, cn.length);
      if (len > bestLen) { best = i; bestLen = len; }
    });
    if (best != null) {
      const c = take(best);
      if (c) { r.cp = c; r.rg = rangeOf(c); }
    }
  });
}

/** 同年内：双记在前 → 重要性降序 → 标题 */
function sortRows(rows) {
  rows.sort(function (a, b) {
    if (a.y !== b.y) return a.y - b.y;
    const ka = a.cp ? 0 : 1;
    const kb = b.cp ? 0 : 1;
    if (ka !== kb) return ka - kb;
    if (a.imp !== b.imp) return b.imp - a.imp;
    return String(a.t).localeCompare(String(b.t), 'zh');
  });
}

/* ═══════════════ 页面 ═══════════════ */

Page({
  data: {
    safeAreaTop: 44,
    navTop: 88,
    heroPadTop: 112,
    collapsed: false,
    searchTop: 88,
    stickTop: 177,

    // 搜索 / 年代尺
    query: '',
    hasQuery: false,
    foundLabel: '',
    qy: null,
    // 收缩态点圆钮展开的浮层药丸（只在 collapsed 下存在）
    searchExpanded: false,
    searchFocus: false,
    rulerOpen: false,
    hint: false,

    // 列表
    list: [],
    eraCur: 0,
    emptyText: '',

    // 统计（按并入后的全量实时算）
    total: 0,
    years: 0,
    miles: 0,
    worlds: 0,
    both: 0,
    rangeLabel: '',
    campaignFail: false,
    campTotal: 0,
    campOnly: 379,
    foldN: 0,
    undatedN: 0,

    // 筛选（入口在年代尺按钮行右侧，浮层展开，不增加吸顶高度）
    filterOpen: false,
    cats: CAT_LIST,
    catSel: [],
    catOn: {},
    mileOnly: false,
    filterN: 0,
    catCounts: {},
    jumpY: '',
    rulerZoom: false,

    // 半屏抽屉（纪事 / 战史）：口径与历代帝王页一致
    sheetOpen: false,
    sheetH: 380,
    sheetDrag: 0,
    sheetDragging: false,
    sheet: null,
    // 抽屉上下文三段默认收起（双记首屏能压到 400px 上下）
    sheetCtx: { same: false, neigh: false, dist: false }
  },

  /* ── 生命周期 ── */
  onLoad(query) {
    let statusBar = 44;
    let winW = 375;
    let winH = 812;
    try {
      const sys = wx.getWindowInfo();
      statusBar = sys.statusBarHeight || 44;
      winW = sys.windowWidth || 375;
      winH = sys.windowHeight || 812;
    } catch (e) { /* 取不到用默认值 */ }
    const navTop = statusBar + 44;

    this._navTop = navTop;
    this._winW = winW;
    this._scrollTop = 0;
    this._ewH = 89;          // 吸顶区（药丸 42 + 按钮 46 + 1 描边）初始高，实测后覆盖
    this._ewFull = 89;       // 完整吸顶区高（含搜索行）
    this._searchH = 42;      // 搜索行高：收缩时从吸顶高度里扣掉
    this._heroH = 0;
    this._rowsTop = null;
    this._dragging = false;
    this._lockUntil = 0;
    this._syncTimer = null;
    this._qTimer = null;
    this._blurTimer = null;
    this._hintTimer = null;
    this._dragScrollTimer = null;
    this._canvas = null;
    this._ctx = null;
    this._cursorYear = null;
    this._preQTop = 0;
    this._hinted = false;
    this._q = '';
    this._qy = null;
    // 年号表（provider: /api/static/era-names）：抽屉的「纪年」段用。
    // null = 还没取到；[] = 取过但为空。取不到只降级，不影响年表本体。
    this._eraList = null;
    this._eraLoading = false;
    this._eraQueue = [];
    this._sheetY = null;

    this.setData({
      safeAreaTop: statusBar,
      navTop: navTop,
      heroPadTop: navTop + 24,
      searchTop: navTop,
      stickTop: navTop + 88,
      // 抽屉：52% 屏高，同时保证至少给导航留出 72px；与历代帝王页同一公式
      sheetH: Math.min(Math.round(winH * 0.52), Math.max(280, winH - navTop - 72))
    });

    // 本地年表先上屏，战史接口回来后再补「双记」并并入未匹配的战役（不阻塞首屏）
    this._rows = buildBase();
    this._undated = [];      // 战役 time 解析不出年份的条目，列表最末「年份待定」区
    this._camps = [];
    sortRows(this._rows);
    this._stats();
    this._view = this._rows;
    this._render(this._rows, '');
    this._pendingYear = query && query.year ? parseInt(query.year, 10) : null;

    this.loadCampaigns();
    // 年号表后台预取：不阻塞首屏，抽屉打开时通常已就绪
    this._ensureEras();
  },

  onReady() {
    const that = this;
    // 等首帧布局完成再量高度：早一帧量到的是未排版尺寸
    setTimeout(function () {
      that._measure();
      that._startHint();
      that._tryAutoGuide();
      if (that._pendingYear != null && !isNaN(that._pendingYear)) {
        const y = that._pendingYear;
        that._pendingYear = null;
        that.setData({ query: fmtY(y) });
        that._applyQuery(fmtY(y), true);
      }
    }, 120);
  },

  onShow() {
    // 从后台/详情页回来：canvas 可能已被回收，丢掉缓存重取
    this._canvas = null;
    this._ctx = null;
    if (this.data.rulerOpen) {
      const that = this;
      setTimeout(function () { that._initCanvas(); }, 60);
    }
    this._tryAutoGuide();
  },

  onUnload() {
    if (this._syncTimer) clearTimeout(this._syncTimer);
    if (this._qTimer) clearTimeout(this._qTimer);
    if (this._blurTimer) clearTimeout(this._blurTimer);
    if (this._hintTimer) clearTimeout(this._hintTimer);
    if (this._dragScrollTimer) clearTimeout(this._dragScrollTimer);
    if (this._guideTimer) clearTimeout(this._guideTimer);
    this._guideTimer = null;
  },

  /**
   * 大事年表首次引导：搜索行折叠时目标不在，直接不展示（不写完成，下次再试）。
   * 重看走 replay 标记，同样由这里拉起。
   */
  _tryAutoGuide(delay) {
    if (!guide.shouldShow('timeline') && !guide.hasReplay('timeline')) return;
    if (this.data.collapsed) return;
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
    const wait = typeof delay === 'number' ? delay : 300;
    const that = this;
    this._guideTimer = setTimeout(function () {
      that._guideTimer = null;
      const layer = that.selectComponent('#guideLayer');
      if (layer) layer.autoStart('timeline');
    }, wait);
  },

  /* ── 统计（按并入后的全量实时算，不写死） ── */
  _stats() {
    const ys = {};
    let miles = 0;
    let worlds = 0;
    let both = 0;
    let min = Infinity;
    let max = -Infinity;
    this._rows.forEach(function (r) {
      ys[r.y] = 1;
      // 里程碑只算年表事件的 imp（192 条）；战史的 major 是另一套口径，单独算「重大」
      if (r.imp >= 3 && !r.battleOnly) miles++;
      if (r.world) worlds++;
      if (r.cp && !r.battleOnly) both++;
      if (r.y < min) min = r.y;
      if (r.y > max) max = r.y;
    });
    this._minY = min;
    this._maxY = max;
    const total = this._rows.length + (this._undated ? this._undated.length : 0);
    this.setData({
      total: total,
      years: Object.keys(ys).length,
      miles: miles,
      worlds: worlds,
      both: both,
      undatedN: this._undated ? this._undated.length : 0,
      rangeLabel: fmtY(min) + ' — ' + fmtY(max)
    });
  },

  /* ── 战史库：接口取不到就降级为纯年表 ── */
  loadCampaigns() {
    const that = this;
    request.getStatic('campaigns', {
      success(res) {
        const data = (res && res.data && res.data.data) || {};
        const eras = data.campaignEras || [];
        const camps = [];
        eras.forEach(function (er) {
          (er.groups || []).forEach(function (g) {
            (g.campaigns || []).forEach(function (c) {
              camps.push({
                name: c.name || '',
                time: c.time || '',
                location: c.location || '',
                result: c.result || '',
                intro: c.intro || '',
                major: !!c.major,
                // 归属父事件与类目码：只在数据层透传，本页暂不渲染
                parent: c.parent || '',
                codes: c.codes || []
              });
            });
          });
        });
        if (!camps.length) { that.setData({ campaignFail: true }); return; }
        that._camps = camps;
        matchCampaigns(that._rows, camps);
        // 纪事子项（763 安史之乱平定）先并入父行，再由 _appendCampaignOnly 统一排序，
        // 保证它在 17 场子战役之后、且不再作为独立行参与计数与直方图
        foldChronicleKids(that._rows);
        that._appendCampaignOnly(camps);
        // 匹配后搜索文本要带上战史四字段（含年份待定区）
        that._rows.forEach(function (r) { r._blob = blobOf(r); });
        (that._undated || []).forEach(function (r) { r._blob = blobOf(r); });
        sortRows(that._rows);
        that._stats();
        that._countByCat();
        // 战史库独有条数 = 接口总数 − 实际双记数 − 折叠进父行的子战役数（不写死 381）
        that.setData({
          campTotal: camps.length,
          foldN: that._foldN || 0,
          campOnly: that._rows.filter(function (r) { return r.battleOnly; }).length + (that._undated ? that._undated.length : 0)
        });
        that._applyQuery(that.data.query, false);
        // 匹配后行高未变、但同年顺序变了，重新量一次再让滚动同步可用
        that._rowsTop = null;
        that._measureSoon(200);
      },
      fail() {
        that.setData({ campaignFail: true });
      }
    });
  },

  /**
   * 把战史库中未双记的战役并入列表。
   * 年份规则：取 time 里最早的年份（区间取起点）；解析不出 → 「年份待定」区，不猜。
   * 58 条双记在 matchCampaigns 里已打 _used 标记，这里跳过，保证 58 + 379 + 17 不重复。
   *
   * 折叠规则（父事件显示）：带 parent 的战役不独立成行，挂到标题与 parent 相同的
   * 纪事行下（当前为「安史之乱」17 场，「七国之乱」8 场，「八王之乱」13 场，
   * 「侯景之乱」8 场，「三藩之乱」9 场）。这样子战役不占年份、不进年代尺直方图
   * 与时代分段计数，只在父行展开区出现。父行找不到时仍按独立战役行入列，不丢数据。
   */
  _appendCampaignOnly(camps) {
    const rows = this._rows;
    const undated = [];
    const byTitle = {};
    rows.forEach(function (r) {
      const k = normName(r.t);
      (byTitle[k] = byTitle[k] || []).push(r);
    });

    let added = 0;
    let kidOrd = 0;
    let folded = 0;
    camps.forEach(function (c) {
      if (c._used) return;
      const ys = yearsOf(c.time);
      const y = ys.length ? ys[0] : null;

      // ① 折叠：parent 指向的纪事行存在 → 作为子项挂过去（不建独立行）
      if (c.parent) {
        const hosts = byTitle[normName(c.parent)];
        if (hosts && hosts.length) {
          let host = hosts[0];
          // 同年多行同名时取「不晚于子战役年份、且最接近」的一条，避免挂到后世的同名事件
          if (y != null) {
            for (let i = 0; i < hosts.length; i++) {
              const h = hosts[i];
              if (h.y <= y && (host.y > y || h.y > host.y)) host = h;
            }
          }
          (host.kids = host.kids || []).push(makeKid(c, kidOrd++));
          folded++;
          return;
        }
      }

      // ② 普通并入：独立成行
      const row = {
        y: y,
        m: 0,
        t: BATTLE_TITLE[c.name] || c.name,
        d: c.result || '',
        cat: '战史',
        imp: c.major ? 3 : 1,
        world: false,
        parent: c.parent || '',
        codes: c.codes || [],
        cp: c,
        rg: y == null ? null : rangeOf(c),
        ord: 100000 + added,
        battleOnly: true
      };
      added++;
      if (y == null) undated.push(row); else rows.push(row);
    });

    // 子战役按年份升序、同年按战史库原顺序（不按名称，保持 755 冬 → 755 十二月的叙事次序）
    rows.forEach(function (r) {
      if (!r.kids) return;
      r.kids.sort(function (a, b) {
        const ay = a.ys.length ? a.ys[0] : 99999;
        const by = b.ys.length ? b.ys[0] : 99999;
        if (ay !== by) return ay - by;
        return a.ord - b.ord;
      });
    });

    this._foldN = folded;
    this._undated = undated;
  },

  /** 分类计数：筛选面板与「分布」都用这一份（按并入后的全量） */
  _countByCat() {
    const n = {};
    const all = this._rows.concat(this._undated || []);
    all.forEach(function (r) {
      const k = r.cat || '其他';
      n[k] = (n[k] || 0) + 1;
    });
    this.setData({ catCounts: n });
  },

  /* ── 列表渲染 ── */
  _render(view, q) {
    const page = this;
    const counts = {};
    view.forEach(function (r) {
      if (r.y == null) return;          // 年份待定区单独成段，不参与时代计数
      const k = eraIdx(r.y);
      counts[k] = (counts[k] || 0) + 1;
    });

    const out = [];
    let lastE = -1;
    let prevY = null;

    /* 手风琴默认展开的行：有搜索词时优先展开「子战役命中」的父行，
       保证搜「睢阳」「潼关」时父行直接摊开、子清单可见；否则仍展开第一条。 */
    let openVi = 0;
    if (q) {
      for (let vi = 0; vi < view.length; vi++) {
        const vr = view[vi];
        const vk = vr.kids;
        if (!vk) continue;
        let hit = ((vr.t || '') + ' ' + (vr.d || '')).toLowerCase().indexOf(q) >= 0;
        if (!hit) {
          for (let ki = 0; ki < vk.length; ki++) {
            if ((vk[ki].blob || '').indexOf(q) >= 0) { hit = true; break; }
          }
        }
        if (hit) { openVi = vi; break; }
      }
    }
    // 搜索命中的子战役位置：渲染后据此把子清单滚到该条并高亮
    this._kidTarget = null;

    function pushRow(r, i, same) {
      const rg = r.rg;
      const hitY = thatQy(page, r);
      const cp = r.cp;
      // 三种条目身份：无 cp = 纯事件；cp 且 battleOnly = 纯战役（仅战史库）；cp 其余 = 双记
      const warOnly = !!(cp && r.battleOnly);
      const kids = r.kids || null;
      // 父行自身文字已命中时不把子清单滚走：搜「安史之乱」应该先看到父行标题与全清单，
      // 只有「睢阳」「潼关」这类只在子项里出现的词，才定位到具体那一场并高亮
      const ownHit = kh => ((r.t || '') + ' ' + (r.d || '')).toLowerCase().indexOf(kh) >= 0;
      let kidHi = -1;
      if (kids && q && !ownHit(q)) {
        // 纯年份搜索优先落到同年的纪事子项（763 → 安史之乱平定），
        // 而不是同年的战役（763 还有「莫州、范阳围困」）
        const qy = parseYearQ(q);
        if (qy !== null) {
          for (let ki = 0; ki < kids.length; ki++) {
            if (kids[ki].chron && kids[ki].ys[0] === qy) { kidHi = ki; break; }
          }
        }
        if (kidHi < 0) {
          for (let ki = 0; ki < kids.length; ki++) {
            if ((kids[ki].blob || '').indexOf(q) >= 0) { kidHi = ki; break; }
          }
        }
      }
      if (kids && i === openVi && kidHi >= 0) page._kidTarget = { ri: i, ki: kidHi };
      out.push({
        k: 'r',
        key: 'r' + i,
        ri: i,
        y: r.y,
        yLabel: r.y == null ? '待定' : (rg ? fmtY(rg[0]) : fmtY(r.y)),
        yEnd: r.y != null && rg ? fmtY(rg[1]) : '',
        same: same,
        hitY: hitY,
        both: !!cp,
        warOnly: warOnly,
        // 里程碑（事件 imp）与战役「重大」分开：前者进筛选，后者只做行内角标
        mile: r.imp >= 3 && !r.battleOnly,
        major: !!(cp && cp.major),
        world: r.world,
        // 「战史」不是事件分类：纯战役行的类别签留空，靠行首「战役」签与金脊辨识
        cat: r.cat === '战史' ? '' : r.cat,
        loc: warOnly ? cp.location || '' : '',
        // 子战役：父行 r1 给「含 N 场子战役」小签，展开区给清单
        kidN: kids ? kids.length : 0,
        kidHi: kidHi,
        kids: kids ? kids.map(function (k) {
          return { y: k.year, name: k.name, loc: k.loc, res: k.res, tag: k.tag || '', chron: !!k.chron };
        }) : null,
        open: i === openVi,
        // 展开区只给一句概要（d 的首句截断到 32 字）：全文留在抽屉里，两层不重复同一段
        sum: partsOf(briefOf(r.d, 32), q),
        // 纯战役：战果一行 + 背景首句一行，战役明细全部在抽屉里
        wintro: warOnly ? partsOf(briefOf(cp.intro, 40), q) : [],
        // 双记在展开区只留一行「战役名 · 时间」的指路条，字段明细全部交给抽屉
        cpNameStr: cp ? cp.name : '',
        cpTimeStr: cp ? cp.time : '',
        tp: partsOf(r.t, q),
        dp: partsOf(r.d, q)
      });
    }

    view.forEach(function (r, i) {
      if (r.y == null) return;
      const ei = eraIdx(r.y);
      if (ei !== lastE) {
        out.push({ k: 'h', key: 'h' + ei, e: ei, name: ERA[ei].name, count: counts[ei] || 0 });
        lastE = ei;
        prevY = null;
      }
      pushRow(r, i, prevY === r.y);
      prevY = r.y;
    });

    // 年份待定区：固定排在列表最末，单独一个分段头（不猜年份）
    const und = view.filter(function (r) { return r.y == null; });
    if (und.length) {
      out.push({ k: 'h', key: 'h-u', e: -1, name: '年份待定', count: und.length });
      und.forEach(function (r) {
        pushRow(r, view.indexOf(r), false);
      });
    }

    // 手风琴：记住当前唯一展开行在 list 里的下标（list 中混有时代分段头，
    // 不能直接用 view 的下标）。重绘后首条默认展开，这里同步记账。
    this._openLi = null;
    for (let k = 0; k < out.length; k++) {
      if (out[k].k === 'r' && out[k].open) { this._openLi = k; break; }
    }

    // 空态只在「有搜索词且真的 0 条」时给：只判断 q 会让列表与空态同时出现
    const emptyText = (q && !view.length) ? '没有匹配「' + q + '」的条目' : '';
    this.setData({
      list: out,
      emptyText: emptyText,
      foundLabel: q ? '找到 ' + view.length + ' 条' : (this._rows.length + (this._undated ? this._undated.length : 0)) + ' 条'
    });
    // 行集合变了，旧的文档位置作废（跳转前会重新量）
    this._rowsTop = null;
    this._measureSoon(180);
  },

  /* ── 搜索 ── */
  onInput(e) {
    const v = e.detail.value;
    this.setData({ query: v });
    if (this._qTimer) clearTimeout(this._qTimer);
    const that = this;
    this._qTimer = setTimeout(function () {
      that._qTimer = null;
      that._applyQuery(v, false);
    }, 120);
  },

  onConfirm() {
    this.onQuery();
  },

  /* ── 收缩态圆钮 ⇄ 浮层药丸 ── */
  onTapFab() {
    if (this.data.searchExpanded) { this.onFoldSearch(); return; }
    const that = this;
    // 先挂浮层、下一拍再置 focus：第一帧就带 focus 的 input 在真机上偶发不弹键盘
    this.setData({ searchExpanded: true }, function () {
      that.setData({ searchFocus: true });
    });
  },

  onFoldSearch() {
    if (this._blurTimer) { clearTimeout(this._blurTimer); this._blurTimer = null; }
    if (!this.data.searchExpanded) return;
    this.setData({ searchExpanded: false, searchFocus: false });
  },

  /**
   * 输入框失焦（返回键收键盘 / 点页面空白）：延迟 160ms 再折回圆钮。
   * 延迟是给「点查询」「点×」留出点击完成时间——这两个动作会先触发 blur，
   * 立即收起会把还没落地的那次 tap 一起吞掉。
   */
  onSearchBlur() {
    if (!this.data.searchExpanded) return;
    const that = this;
    if (this._blurTimer) clearTimeout(this._blurTimer);
    this._blurTimer = setTimeout(function () {
      that._blurTimer = null;
      if (that.data.searchExpanded) that.setData({ searchExpanded: false, searchFocus: false });
    }, 160);
  },

  onQuery() {
    const q = (this.data.query || '').trim();
    if (!q) return;               // 空输入不动作
    wx.hideKeyboard();            // 无命中也要收键盘，否则搜索条挡住空态
    // 取消输入防抖：否则 120ms 后那次「只筛不跳」会把刚跳到的位置重绘回去
    if (this._qTimer) { clearTimeout(this._qTimer); this._qTimer = null; }
    // 从圆钮展开的：查询落地后直接折回圆钮，把列表让出来
    if (this.data.searchExpanded) this.onFoldSearch();
    this._applyQuery(this.data.query, true);
  },

  onClear() {
    this.setData({ query: '' });
    this._applyQuery('', false);
    // 清空后回到输入前的位置（与效果图一致）
    if (this._preQTop != null) {
      wx.pageScrollTo({ scrollTop: this._preQTop, duration: 0 });
    }
  },

  /* ── 筛选面板：分类 / 只看里程碑 / 年份直跳 ──
     入口在年代尺按钮行右侧，面板是浮层（fixed），不参与吸顶高度，
     所以吸顶区仍是原来的 213px。 */
  onToggleFilter() {
    this.setData({ filterOpen: !this.data.filterOpen });
  },

  onTapCat(e) {
    const c = e.currentTarget.dataset.cat;
    const arr = (this.data.catSel || []).slice();
    const i = arr.indexOf(c);
    if (i >= 0) arr.splice(i, 1); else arr.push(c);
    const on = {};
    arr.forEach(function (k) { on[k] = 1; });
    this.setData({ catSel: arr, catOn: on });
    this._applyQuery(this.data.query, false);
  },

  onToggleMile() {
    this.setData({ mileOnly: !this.data.mileOnly });
    this._applyQuery(this.data.query, false);
  },

  onClearFilter() {
    this.setData({ catSel: [], catOn: {}, mileOnly: false });
    this._applyQuery(this.data.query, false);
  },

  onJumpInput(e) {
    this.setData({ jumpY: e.detail.value });
  },

  /** 年份直跳：不走搜索，滚动到该年最近一条；有搜索/筛选时先复位，避免跳完看不到目标 */
  onJumpGo() {
    const raw = String(this.data.jumpY || '').trim().toLowerCase();
    const y = parseYearQ(raw);
    if (y == null) {
      wx.showToast({ title: '请输入年份，如 1937 或 前221', icon: 'none' });
      return;
    }
    wx.hideKeyboard();
    this.setData({ filterOpen: false });
    const that = this;
    const go = function () {
      const idx = that._indexOfYear(y);
      if (idx < 0) {
        wx.showToast({ title: '年表里没有 ' + fmtY(y) + ' 年', icon: 'none' });
        return;
      }
      // 没有该年时落到相差最小的一条，并把实际落点告知，避免「跳到别的年份」而用户不知情
      const hit = that._rows[idx].y;
      if (hit !== y) wx.showToast({ title: fmtY(y) + ' 年无条目，已跳到最近的 ' + fmtY(hit) + ' 年', icon: 'none' });
      that.setData({ jumpY: '' });
      that._setCursor(hit);
      setTimeout(function () { that._jumpToRow(idx); }, 80);
    };
    const needReset = !!this._q || (this.data.catSel || []).length || this.data.mileOnly;
    if (needReset) {
      this.setData({ query: '', catSel: [], catOn: {}, mileOnly: false });
      this._applyQuery('', false);
      setTimeout(go, 120);
    } else {
      go();
    }
  },

  /** 全量有年份行里找精确年份；没有就取差最小的一条（不猜「附近」的月份） */
  _indexOfYear(y) {
    const rows = this._rows;
    let best = -1;
    let bestD = Infinity;
    for (let i = 0; i < rows.length; i++) {
      const d = Math.abs(rows[i].y - y);
      if (d === 0) return i;
      if (d < bestD) { bestD = d; best = i; }
    }
    return best;
  },

  /* 抽屉上下文三段：默认收起，点段头切换 */
  onToggleSheetCtx(e) {
    const k = e.currentTarget.dataset.k;
    const d = {
      same: this.data.sheetCtx.same,
      neigh: this.data.sheetCtx.neigh,
      dist: this.data.sheetCtx.dist
    };
    d[k] = !d[k];
    this.setData({ sheetCtx: d });
  },

  /* ── 近现代放大：原比例下 1912 以后只有 7.9px，点不开也拖不动 ── */
  onToggleRulerZoom() {
    const on = !this.data.rulerZoom;
    const that = this;
    if (!this.data.rulerOpen) {
      this.setData({ rulerOpen: true, rulerZoom: on }, function () {
        that._setCursor(on ? 1912 : that._visibleYear());
        setTimeout(function () { that._initCanvas(); }, 60);
        that._measureSoon(80);
      });
      return;
    }
    this.setData({ rulerZoom: on }, function () {
      if (on && (that._cursorYear == null || that._cursorYear < 1912)) that._setCursor(1912);
      that._draw();
    });
  },

  _applyQuery(raw, jump) {
    const v = String(raw == null ? '' : raw);
    const q = v.trim().toLowerCase();
    const was = this._q;
    if (!was && q) this._preQTop = this._scrollTop;

    this._q = q;
    this._qy = q ? parseYearQ(q) : null;

    const view = this._filter(q);
    this._view = view;
    this._render(view, q);
    this.setData({
      hasQuery: !!q,
      filterN: (this.data.catSel || []).length + (this.data.mileOnly ? 1 : 0)
    });

    if (q && view.length && view[0].y != null) {
      this._setCursor(view[0].y);
      if (jump) {
        const that = this;
        const qq = q;
        // 等视图层把筛选后的列表渲染出来再量位置（30ms 时量到的常是旧列表）
        setTimeout(function () {
          if (that._q !== qq) return;   // 期间又改了搜索词，旧的滚动目标作废
          that._jumpToRow(0);
          // 命中子战役：父行展开后再把子清单滚到该条（父行内部可能很长）
          const kt = that._kidTarget;
          if (kt) {
            setTimeout(function () {
              if (that._q === qq) that._scrollToKid(kt.ri, kt.ki);
            }, 320);
          }
        }, 100);
      }
    } else if (!q) {
      this._setCursor(this._visibleYear());
    }
  },

  /**
   * 把命中的子战役滚进可视区并高亮（高亮是渲染时给的 class，这里只管滚动）。
   * 直接按元素 id 取位置：列表被筛选后 DOM 行序与全量行下标不再对应，
   * 用 id 比用 _rowsTop 下标可靠。已完整可见时不动，避免无意义的跳动。
   */
  _scrollToKid(ri, ki) {
    const that = this;
    const q = wx.createSelectorQuery();
    q.select('#k' + ri + '-' + ki).boundingClientRect();
    q.exec(function (res) {
      const rect = res && res[0];
      if (!rect) return;
      const stickBottom = that._navTop + (that.data.collapsed ? TB_H : 0) + that._ewH + HEAD_H;
      let winH = 812;
      try { winH = wx.getWindowInfo().windowHeight || 812; } catch (e) { /* 默认 812 */ }
      if (rect.top >= stickBottom + 4 && rect.top + rect.height <= winH - 12) return;
      const target = Math.max(0, (that._scrollTop || 0) + rect.top - stickBottom - 8);
      wx.pageScrollTo({ scrollTop: target, duration: 0 });
      that._scrollTop = target;
      that._syncEra();
    });
  },

  /* 搜索词 + 分类筛选 + 里程碑开关，三者取交集；年份待定区也参与（y 为 null） */
  _filter(q) {
    const qy = this._qy;
    const cats = this.data.catSel || [];
    const mileOnly = this.data.mileOnly;
    const all = this._rows.concat(this._undated || []);
    return all.filter(function (r) {
      if (cats.length && cats.indexOf(r.cat) < 0) return false;
      // 里程碑 = 年表 imp≥3 的 192 条（战史的 major 算「重大」，不混入）
      if (mileOnly && !(r.imp >= 3 && !r.battleOnly)) return false;
      if (!q) return true;
      if (qy !== null) {
        if (r.y === qy) return true;
        if (r.rg && qy >= r.rg[0] && qy <= r.rg[1]) return true;
      }
      return (r._blob || '').indexOf(q) >= 0;
    });
  },

  /* ── 行展开（手风琴：同一时刻最多一条） ──
     点已展开行 = 收起（允许全部收起）；点其他行 = 收起上一条并展开这一条。
     两条状态放在同一次 setData 里下发，所以即使上一条还在渲染/展开过程中，
     也不会出现「两条同时展开」的中间帧。 */
  onTapRow(e) {
    const li = e.currentTarget.dataset.li;
    const item = this.data.list[li];
    if (!item || item.k !== 'r') return;

    const willOpen = !item.open;
    const prev = this._openLi;
    const d = {};

    if (!willOpen) {
      d['list[' + li + '].open'] = false;
      this._openLi = null;
    } else {
      if (prev != null && prev !== li) {
        const p = this.data.list[prev];
        if (p && p.open) d['list[' + prev + '].open'] = false;
      }
      // 记账失效（例如列表刚重绘）时兜底扫一遍，确保不会留下第二条展开行
      if (this.data.list[prev] && this.data.list[prev].open === false) {
        for (let k = 0; k < this.data.list.length; k++) {
          const o = this.data.list[k];
          if (k !== li && o.k === 'r' && o.open) { d['list[' + k + '].open'] = false; break; }
        }
      }
      d['list[' + li + '].open'] = true;
      this._openLi = li;
    }

    const that = this;
    if (!willOpen) {
      // 收起：被点的行本身位置不变，只有它下方内容上移，不动滚动位置，
      // 避免「收起反而被拽走」；只重测行位置供年代尺/时代判断使用。
      this.setData(d, function () { that._measureSoon(60); });
      return;
    }

    // 展开：收起上一条会让下方内容整体上移，被展开行可能正好被吸顶区压住。
    // 等这一帧渲染完重新量行位置，只有真的被遮住才补滚（可见时不动，免得跳）。
    this.setData(d, function () {
      that._measure(function () { that._revealRow(item.ri); });
    });
  },

  /** 展开后把该行拉回吸顶区下沿：仅当行顶被吸顶三层盖住时才滚 */
  _revealRow(ri) {
    const rows = this._rowsTop;
    if (!rows || !rows[ri]) return;
    const stickBottom = this._navTop + (this.data.collapsed ? TB_H : 0) + this._ewH + HEAD_H;
    const top = rows[ri].top;
    if (top - (this._scrollTop || 0) >= stickBottom) return; // 已完整可见
    const target = Math.max(0, top - stickBottom);
    wx.pageScrollTo({ scrollTop: target, duration: 160 });
    this._scrollTop = target;
  },

  /* ── 年号表：抽屉「纪年」段的数据源（GET /api/static/era-names） ──
     与年表/战史一样是后台预取：取不到只让该段降级为说明文字，不影响列表与抽屉本体。 */
  _ensureEras(cb) {
    if (this._eraList != null) { if (cb) cb(); return; }
    if (cb) this._eraQueue.push(cb);
    if (this._eraLoading) return;
    this._eraLoading = true;
    const that = this;
    const done = function () {
      that._eraLoading = false;
      const q = that._eraQueue;
      that._eraQueue = [];
      q.forEach(function (f) { try { f(); } catch (e) { /* 单个回调失败不影响其它 */ } });
      // 抽屉已经打开：只补「纪年」段，不改变开合状态，也不碰手风琴
      if (that.data.sheetOpen && that._sheetY != null) {
        const info = that._eraInfo(that._sheetY);
        that.setData({ 'sheet.eraRows': info.rows, 'sheet.eraNote': info.note });
      }
    };
    request.getStatic('era-names', {
      success(res) {
        const d = (res && res.data && res.data.data) || {};
        const arr = Array.isArray(d.eras) ? d.eras : [];
        that._eraList = arr
          .filter(function (e) { return e && Number.isFinite(+e.start) && Number.isFinite(+e.end); })
          .map(function (e) {
            return { regime: e.regime || '', era: e.era || '', ruler: e.ruler || '', start: +e.start, end: +e.end };
          });
        done();
      },
      fail() {
        that._eraList = [];   // 标记「已尝试」，避免反复请求
        done();
      }
    });
  },

  /**
   * 覆盖该年的年号（最多 3 条）+ 降级说明。
   * 数据源：server/static-data/era-names.json（前 140 年起，字段 政权 / 年号 / 在位者）。
   */
  _eraInfo(y) {
    if (this._eraList == null) return { rows: [], note: '纪年数据未取到，仅显示公元纪年' };
    const hits = [];
    for (let i = 0; i < this._eraList.length; i++) {
      const e = this._eraList[i];
      if (y < e.start || y > e.end) continue;
      const nth = y - e.start + 1;
      hits.push({
        regime: e.regime,
        era: e.era + (nth === 1 ? '元年' : cnNum(nth) + '年'),
        ruler: e.ruler
      });
    }
    if (!hits.length) {
      // 1912—1949 用民国纪年补齐；其余如实说明，不猜
      if (y >= 1912 && y <= 1949) {
        const n = y - 1911;
        return { rows: [], note: '民国' + (n === 1 ? '元年' : cnNum(n) + '年') + '（1912 年后不再用年号）' };
      }
      if (y < -140) return { rows: [], note: '前 140 年以前无年号纪年' };
      return { rows: [], note: '此年没有对应的年号记录' };
    }
    return {
      rows: hits.slice(0, 3),
      note: hits.length > 3 ? '同年并行 ' + hits.length + ' 个政权年号，此处列前 3 条' : ''
    };
  },

  /**
   * 子战役抽屉：父行下的清单条目点开的档案。
   * 只给战役字段（战役名 / 时间 / 地点 / 战果 / 背景 / 类别码），
   * 不带纪年、同年、前后、分布 —— 那些属于父事件，不属于子战役。
   */
  onOpenKid(e) {
    const ds = e.currentTarget.dataset;
    const item = this.data.list[ds.li];
    const row = item && item.k === 'r' && this._view && this._view[item.ri];
    const k = row && row.kids && row.kids[ds.ki];
    if (!k) return;

    // 纪事子项（763 安史之乱平定）走纪事抽屉；战役子项才走战史卡
    if (k.chron) { this._openChronKid(k); return; }

    const y0 = k.ys.length ? k.ys[0] : null;
    const ei = y0 == null ? -1 : eraIdx(y0);
    this._sheetY = y0;

    this.setData({
      sheetOpen: true,
      sheetDrag: 0,
      sheetDragging: false,
      sheetCtx: { same: false, neigh: false, dist: false },
      sheet: {
        type: 'kid',
        kid: true,
        year: k.year === '待定' ? '年份待定' : k.year + '年',
        era: ei >= 0 ? ERA[ei].name : '年份待定',
        gz: ganzhi(y0),
        title: k.name,
        tags: [],
        eraRows: [],
        eraNote: '',
        chron: '',
        war: {
          name: k.rawName,
          time: k.time || '',
          location: k.loc || '',
          result: k.res || '',
          intro: k.intro || '',
          major: !!k.major,
          codes: k.codes || [],
          codeStr: (k.codes || []).join(' · ')
        },
        warOnly: true,
        sameN: 0,
        sameList: [],
        prev: '',
        next: '',
        dist: ''
      }
    });
  },

  /* 折叠为子项的纪事条目（763 安史之乱平定）：抽屉与普通纪事行同一套字段
     （年份 / 时代 / 干支 / 纪年 / 纪事全文 / 同年 / 前后 / 分布），不带战史字段
     与类别码。它已不在 _rows 里，前后邻条按「年份在它之前/之后的第一条」取，
     不按数组下标，避免依赖父行位置。 */
  _openChronKid(k) {
    const row = k.row;
    const all = this._rows.concat(this._undated || []);
    const ei = eraIdx(row.y);
    const same = [];
    let catN = 0;
    let catAll = 0;
    let prev = null;
    let next = null;
    all.forEach(function (r) {
      if (r.y === row.y) same.push(r);
      if (row.cat && r.cat === row.cat) {
        catAll++;
        if (r.y != null && eraIdx(r.y) === ei) catN++;
      }
      if (r.y == null) return;
      if (r.y < row.y) prev = r;
      else if (r.y > row.y && !next) next = r;
    });
    const sameList = same.slice(0, 3).map(function (r) {
      return (r.y == null ? '待定' : fmtY(r.y)) + ' · ' + r.t
        + (r.cat && r.cat !== '战史' ? '（' + r.cat + '）' : '');
    });
    const neighbour = function (r) {
      if (!r) return '';
      return fmtY(r.y) + ' 年 · ' + r.t + (r.cp ? '（战史双记）' : '');
    };
    const eraInfo = this._eraInfo(row.y);
    this._sheetY = row.y;

    const tags = [];
    if (row.cat && row.cat !== '战史') tags.push(row.cat);
    if (row.imp >= 3) tags.push('里程碑');

    this.setData({
      sheetOpen: true,
      sheetDrag: 0,
      sheetDragging: false,
      sheetCtx: { same: false, neigh: false, dist: false },
      sheet: {
        type: 'chron',
        kid: false,
        year: fmtY(row.y) + '年',
        era: ERA[ei].name,
        gz: ganzhi(row.y),
        title: row.t,
        tags: tags,
        eraRows: eraInfo.rows,
        eraNote: eraInfo.note,
        chron: row.d,
        war: null,
        warOnly: false,
        sameN: same.length,
        sameList: sameList,
        prev: neighbour(prev),
        next: neighbour(next),
        dist: row.cat + ' · ' + ERA[ei].name + ' ' + catN + ' 条 / 全表 ' + catAll + ' 条'
      }
    });
  },

  /* ── 半屏抽屉（纪事 / 战史） ──
     抽屉 = 这条事件的完整档案：年份（含月）+ 干支 + 时代、纪年、纪事全文、
     战史全字段、同年其他条目、前后邻条、分类分布。
     展开区只给一句概要 + 事实签，全文只在这里出现一次。 */
  onOpenSheet(e) {
    const ds = e.currentTarget.dataset;
    const item = this.data.list[ds.li];
    if (!item || item.k !== 'r') return;
    const row = this._view && this._view[item.ri];
    if (!row) return;
    const cp = row.cp;
    // 纯战役行没有纪事段：不管点在哪块，都落到战史抽屉
    const type = (item.warOnly || ds.type === 'war') ? 'war' : 'chron';
    if (type === 'war' && !cp) return;

    let year;
    if (row.y == null) {
      year = '年份待定';
    } else {
      year = item.yLabel + '年';
      if (item.yEnd) year += ' — ' + item.yEnd + '年';
      if (row.m) year += ' · ' + row.m + '月';
    }

    // 事实签是事件自身属性，两类抽屉给同一套，不因入口不同而缺字段
    // （战史库独有条目的 cat 是「战史」，与卡内段头重复，不再作为签）
    const tags = [];
    if (row.cat && row.cat !== '战史') tags.push(row.cat);
    if (row.world) tags.push('世界史');
    if (row.imp >= 3) tags.push('里程碑');

    // —— 上下文：全部从并入后的同一份数据聚合，不引外部数据 ——
    const all = this._rows.concat(this._undated || []);
    const ei = row.y == null ? -1 : eraIdx(row.y);
    const same = [];
    let catN = 0;
    let catAll = 0;
    for (let i = 0; i < all.length; i++) {
      const r = all[i];
      if (r !== row && r.y === row.y && row.y != null) same.push(r);
      if (row.cat && r.cat === row.cat) {
        catAll++;
        if (ei >= 0 && eraIdx(r.y) === ei) catN++;
      }
    }
    same.sort(function (a, b) {
      if (a.imp !== b.imp) return b.imp - a.imp;
      return String(a.t).localeCompare(String(b.t), 'zh');
    });
    const sameList = same.slice(0, 3).map(function (r) {
      return (r.y == null ? '待定' : fmtY(r.y)) + ' · ' + r.t + (r.cat && r.cat !== '战史' ? '（' + r.cat + '）' : '');
    });

    const idx = all.indexOf(row);
    const prev = idx > 0 ? all[idx - 1] : null;
    const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
    const neighbour = function (r) {
      if (!r) return '';
      return (r.y == null ? '待定' : fmtY(r.y)) + ' 年 · ' + r.t + (r.cp ? '（战史双记）' : '');
    };

    const eraInfo = row.y == null
      ? { rows: [], note: '战役时间解析不出年份，未做纪年关联' }
      : this._eraInfo(row.y);
    this._sheetY = row.y;

    let dist = '';
    if (row.y == null) {
      dist = row.cat === '战史' ? '战史库 ' + (this._camps ? this._camps.length : 0) + ' 条 · 本条年份待定' : '';
    } else if (row.cat === '战史') {
      // 纯战役：分类分布按「本时代战役 / 战史库总量」给，不混进 10 类事件
      dist = '战史 · ' + ERA[ei].name + ' ' + catN + ' 条 / 战史库 ' + (this._camps ? this._camps.length : 0) + ' 条';
    } else if (row.cat) {
      dist = row.cat + ' · ' + ERA[ei].name + ' ' + catN + ' 条 / 全表 ' + catAll + ' 条';
    }

    this.setData({
      sheetOpen: true,
      sheetDrag: 0,
      sheetDragging: false,
      sheetCtx: { same: false, neigh: false, dist: false },
      sheet: {
        type: type,
        year: year,
        era: row.y == null ? '年份待定' : ERA[ei].name,
        gz: ganzhi(row.y),
        title: row.t,
        tags: tags,
        // 纪年：政权 / 年号 / 在位（取不到时给说明文字）
        eraRows: eraInfo.rows,
        eraNote: eraInfo.note,
        // 纪事全文：全文只在此处出现一次（展开区只显示首句概要）
        chron: item.warOnly ? '' : row.d,
        war: cp ? {
          name: cp.name,
          time: cp.time || '',
          location: cp.location || '',
          result: cp.result || '',
          intro: cp.intro || '',
          major: !!cp.major,
          codes: cp.codes || [],
          codeStr: (cp.codes || []).join(' · ')
        } : null,
        warOnly: !!item.warOnly,
        sameN: same.length,
        sameList: sameList,
        prev: neighbour(prev),
        next: neighbour(next),
        dist: dist
      }
    });
  },

  onCloseSheet() {
    this.setData({ sheetOpen: false, sheetDrag: 0, sheetDragging: false });
  },

  onNoop() {},

  onGrabStart(e) {
    this._grabY = e.touches && e.touches[0] ? e.touches[0].clientY : 0;
    this._grabDy = 0;
    this.setData({ sheetDragging: true });
  },

  onGrabMove(e) {
    if (!this._grabY) return;
    const y = e.touches && e.touches[0] ? e.touches[0].clientY : this._grabY;
    const dy = Math.max(0, y - this._grabY);
    this._grabDy = dy;
    this.setData({ sheetDrag: dy });
  },

  onGrabEnd() {
    if (this._grabDy > 80) { this.onCloseSheet(); return; }
    this.setData({ sheetDrag: 0, sheetDragging: false });
  },

  /* ── 吸顶测量 ── */
  /**
   * 量 hero / 吸顶区 / 每一行在文档中的位置。
   * 吸顶偏移必须用实测 px（rpx 换算在不同机型上有小数误差，吸顶差 1px 就能看到缝）。
   */
  _measure(cb) {
    const that = this;
    const q = wx.createSelectorQuery();
    q.select('.hero').boundingClientRect();
    q.select('#erawrap').boundingClientRect();
    q.select('.searchbar').boundingClientRect();
    q.selectAll('.row').boundingClientRect();
    q.exec(function (res) {
      const hero = res[0];
      const ew = res[1];
      const sb = res[2];
      const rows = res[3] || [];
      const st = that._scrollTop || 0;
      if (hero) that._heroH = hero.bottom + st;
      if (sb) that._searchH = sb.height;
      if (ew) {
        // 稳态下量到的就是当前可用高度；收缩态再补回搜索行得到「完整吸顶区高」，
        // 供下一次恢复常驻时直接使用，不必等重测。
        that._ewH = ew.height;
        that._ewFull = ew.height + (that.data.collapsed ? that._searchH : 0);
      }
      that._rowsTop = [];
      for (let i = 0; i < rows.length; i++) {
        if (!rows[i]) continue;
        that._rowsTop.push({ top: rows[i].top + st, h: rows[i].height });
      }
      that._syncStick();
      if (cb) cb();
    });
  },

  _measureSoon(delay) {
    if (this._measureTimer) clearTimeout(this._measureTimer);
    const that = this;
    this._measureTimer = setTimeout(function () {
      that._measureTimer = null;
      that._measure();
    }, delay || 160);
  },

  _syncStick() {
    const tb = this.data.collapsed ? TB_H : 0;
    const searchTop = this._navTop + tb;
    const stickTop = searchTop + this._ewH;
    if (searchTop !== this.data.searchTop || stickTop !== this.data.stickTop) {
      this.setData({ searchTop: searchTop, stickTop: stickTop });
    }
  },

  /** 当前状态下的吸顶区有效高：收缩时扣掉整行搜索药丸（42px） */
  _calcEw(compact) {
    const full = this._ewFull || this._ewH || 89;
    return compact ? Math.max(0, full - this._searchH) : full;
  },

  /* ── 滚动：标题条塌陷 + 时代/游标同步（100ms 节流） ── */
  onPageScroll(e) {
    this._scrollTop = e.scrollTop || 0;
    this._syncCollapse();
    if (this._dragging) return;
    if (this._syncTimer) return;
    const that = this;
    this._syncTimer = setTimeout(function () {
      that._syncTimer = null;
      that._syncEra();
    }, 100);
  },

  /**
   * 是否进入收缩态（标题条 + 圆钮）。
   * 进入：滚过「hero 高度 − 导航栏 − 标题条」，即吸顶区自然顶到标题条下沿；
   * 退出：回到进入阈值上方 COLLAPSE_BACK 以内 —— 只认「回到顶部附近」，
   *       单纯下滑不恢复，避免读到一半布局突然长高 42px 把人顶走。
   */
  _collapsedAt(scrollTop) {
    if (!this._heroH) return this.data.collapsed;
    const on = this._heroH - this._navTop - TB_H;
    const off = Math.max(0, on - COLLAPSE_BACK);
    return this.data.collapsed ? scrollTop > off : scrollTop > on;
  },

  _syncCollapse() {
    const next = this._collapsedAt(this._scrollTop);
    if (next === this.data.collapsed) return;
    const d = { collapsed: next };
    if (!next) {
      // 恢复常驻药丸：浮层与焦点一并清掉
      d.searchExpanded = false;
      d.searchFocus = false;
      if (this._blurTimer) { clearTimeout(this._blurTimer); this._blurTimer = null; }
    }
    this.setData(d);
    // 吸顶高度立刻按新状态重算（收缩少 42px），不等下一次实测，避免中间留空档
    this._ewH = this._calcEw(next);
    this._syncStick();
    this._measureSoon(80);
  },

  /** 吸顶区下沿（视口坐标）：未顶住时按 hero 剩余高度算，顶住后用实测量的高度 */
  _lineTop() {
    const tb = this.data.collapsed ? TB_H : 0;
    const natural = this._heroH - this._scrollTop;
    const stackTop = Math.max(this._navTop + tb, natural);
    return stackTop + this._ewH + HEAD_H;
  },

  _firstVisible() {
    const rows = this._rowsTop;
    if (!rows || !rows.length) return -1;
    const y = this._scrollTop + this._lineTop();
    let lo = 0;
    let hi = rows.length - 1;
    let ans = rows.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (rows[mid].top + rows[mid].h > y) { ans = mid; hi = mid - 1; } else { lo = mid + 1; }
    }
    return ans;
  },

  _syncEra() {
    if (this._dragging || Date.now() < this._lockUntil) return;
    const i = this._firstVisible();
    if (i < 0 || i >= this._view.length) return;
    const r = this._view[i];
    // 年份待定区没有年份：保持上一个游标与时代高亮，不把游标打到 0
    if (r.y == null) return;
    const ei = eraIdx(r.y);
    if (ei !== this.data.eraCur) {
      this.setData({ eraCur: ei });
      if (this.data.rulerOpen) this._draw();
    }
    this._setCursor(r.y);
  },

  _visibleYear() {
    const i = this._firstVisible();
    if (i >= 0 && i < this._view.length && this._view[i].y != null) return this._view[i].y;
    return this._cursorYear != null ? this._cursorYear : (this._minY || 0);
  },

  /* ── 跳转（含二次修正） ── */
  _jumpToRow(ri) {
    const that = this;
    const run = function () {
      if (!that._rowsTop || !that._rowsTop[ri]) return;
      const top = that._rowsTop[ri].top;
      const target = Math.max(0, top - (that._navTop + (that.data.collapsed ? TB_H : 0) + that._ewH + HEAD_H));
      wx.pageScrollTo({ scrollTop: target, duration: 0 });
      const that2 = that;
      setTimeout(function () {
        // 跳深处标题条会突然出现，吸顶总高 +36px，再补滚一次
        const need = that2._collapsedAt(target);
        if (need !== that2.data.collapsed) {
          that2.setData({ collapsed: need, searchExpanded: false, searchFocus: false });
          // 标题条出现/消失会让吸入高度切换（±36px）且搜索行收起后少 42px
          that2._ewH = that2._calcEw(need);
          that2._syncStick();
          that2._measureSoon(80);
          setTimeout(function () {
            const t2 = Math.max(0, top - (that2._navTop + (that2.data.collapsed ? TB_H : 0) + that2._ewH + HEAD_H));
            wx.pageScrollTo({ scrollTop: t2, duration: 0 });
            that2._scrollTop = t2;
            that2._syncEra();
          }, 80);
        } else {
          that2._scrollTop = target;
          that2._syncEra();
        }
      }, 60);
    };
    if (!this._rowsTop || !this._rowsTop.length) {
      this._measure(function () { run(); });
    } else {
      run();
    }
  },

  /* ── 首次提示：描边转金 + 呼吸一轮，同会话只触发一次 ── */
  _startHint() {
    if (this._hinted) return;
    this._hinted = true;
    this.setData({ hint: true });
    const that = this;
    this._hintTimer = setTimeout(function () { that.setData({ hint: false }); }, 3000);
  },

  /* ── 年代尺 ── */
  onToggleRuler() {
    const open = !this.data.rulerOpen;
    if (this._hintTimer) { clearTimeout(this._hintTimer); this._hintTimer = null; }
    const that = this;
    this.setData({ rulerOpen: open, hint: false }, function () {
      if (open) {
        that._setCursor(that._visibleYear());
        setTimeout(function () { that._initCanvas(); }, 60);
      } else {
        that._canvas = null;
        that._ctx = null;
      }
      that._measureSoon(80);
    });
  },

  _initCanvas() {
    const that = this;
    wx.createSelectorQuery()
      .select('#ruler')
      .fields({ node: true, size: true })
      .exec(function (res) {
        const info = res && res[0];
        if (!info || !info.node) return;
        let dpr = 2;
        try { dpr = wx.getWindowInfo().pixelRatio || 2; } catch (e) { /* 默认 2 */ }
        const canvas = info.node;
        // 画布位图 = CSS 尺寸 × dpr；绘制仍按 CSS px 写，由 ctx.scale 放大
        canvas.width = Math.round(info.width * dpr);
        canvas.height = Math.round(info.height * dpr);
        that._dpr = dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        that._canvas = canvas;
        that._ctx = ctx;
        that._rw = info.width;
        that._rh = info.height;
        that._draw();
      });
  },

  /* 年代尺当前窗口：全览 [最早, 最晚]；近现代放大 [1912, max(2024, 最晚)]。
     近现代在原比例下只有 7.9px，放大后独占整条 351px，可正常点选与拖动。 */
  _win() {
    if (this.data.rulerZoom) return [1912, Math.max(2024, this._maxY)];
    return [this._minY, this._maxY];
  },

  _yearX(y, W) {
    const w = this._win();
    return (y - w[0]) / (w[1] - w[0]) * W;
  },

  _xYear(x, W) {
    const w = this._win();
    return w[0] + x / W * (w[1] - w[0]);
  },

  _draw() {
    const ctx = this._ctx;
    if (!ctx) return;
    const W = this._rw;
    const H = RULER_H;
    const sx = W / RULER_W;
    const dpr = this._dpr || 2;
    /* 吸附到设备像素栅格：坐标取 1/dpr 的整数倍，线宽取整数 px。
       原来的 0.6/0.7 线宽与 +0.35 / y=102.5 偏移在 2x/3x 屏上会被插值成
       两三档不同灰度的像素，这就是年代尺「线条发虚」的直接原因。 */
    const sn = function (v) { return Math.round(v * dpr) / dpr; };
    ctx.clearRect(0, 0, W, H);

    // 1) 时代色带：按真实起讫年换算宽度（放大近现代时只画窗口内的段）
    const win = this._win();
    for (let i = 0; i < ERA.length; i++) {
      const s = Math.max(ERA[i].start, win[0]);
      const e = Math.min(ERA[i].end, win[1]);
      if (e <= s) continue;
      const x0 = sn(this._yearX(s, W));
      const x1 = sn(this._yearX(e, W));
      const w = Math.max(1 / dpr, Math.round((x1 - x0) * dpr) / dpr);
      ctx.fillStyle = SEG_COLOR[i];
      ctx.fillRect(x0, 7, w, 20);
      ctx.strokeStyle = i === this.data.eraCur ? '#2b1d12' : 'rgba(51,38,26,.14)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x0, 7, w, 20);
      // 段太窄只上色不写字：9px 字两个字约 18px
      if (w >= 22) {
        ctx.fillStyle = '#2b1d12';
        ctx.font = '600 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ERA[i].name, sn(x0 + w / 2), 17);
      }
    }

    // 2) 刻度：全览给 7 段首年 + 今端；近现代放大给 1912—今的关键年份
    const ticks = this.data.rulerZoom
      ? [1912, 1937, 1949, 1978, 2000, this._maxY]
      : [this._minY, -221, 221, 581, 907, 1368, 1912, this._maxY];
    const tickStep = this.data.rulerZoom ? 1 : 2;
    ctx.textBaseline = 'alphabetic';
    for (let t = 0; t < ticks.length; t++) {
      const x = sn(this._yearX(ticks[t], W));
      ctx.strokeStyle = 'rgba(107,90,69,.55)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 33);
      ctx.lineTo(x, 37);
      ctx.stroke();
      ctx.fillStyle = '#75654f';
      ctx.font = '8px sans-serif';
      const right = x > W - 21;
      ctx.textAlign = right ? 'right' : (x < 20 ? 'left' : 'center');
      // 全览时 8 个刻度挤，交错两行；放大时 6 个刻度分得开，单行更清楚
      ctx.fillText(fmtY(ticks[t]), right ? sn(W) : (x < 20 ? 0 : x), tickStep === 2 && t % 2 ? 57 : 47);
    }

    // 3) 密度直方图：全览 50 年/桶；近现代放大 10 年/桶（窗口外的不计）
    const bucket = this.data.rulerZoom ? 10 : BUCKET;
    const b0 = Math.floor(win[0] / bucket) * bucket;
    const cnt = {};
    let max = 0;
    this._rows.forEach(function (r) {
      if (r.y < win[0] || r.y > win[1]) return;
      const b = Math.floor((r.y - b0) / bucket);
      cnt[b] = (cnt[b] || 0) + 1;
      if (cnt[b] > max) max = cnt[b];
    }, this);
    const peak = [];
    Object.keys(cnt).forEach(function (k) { peak.push({ b: +k, n: cnt[k] }); });
    peak.sort(function (a, b) { return b.n - a.n; });
    const topB = {};
    peak.slice(0, 3).forEach(function (o) { topB[o.b] = 1; });
    const bw = bucket / (win[1] - win[0]) * W;
    const that = this;
    Object.keys(cnt).forEach(function (k) {
      const b = +k;
      // 高度取整数像素，底部压在整数基线上，柱体上下沿都不会半像素
      const h = Math.max(2, Math.round(cnt[b] / max * 40));
      // 柱宽按设备像素取整并留 1 个设备像素缝
      const bx = sn(that._yearX(b0 + b * bucket, W));
      const bwid = Math.max(1 / dpr, sn(bw) - 1 / dpr);
      ctx.fillStyle = topB[b] ? 'rgba(181,113,58,.85)' : 'rgba(181,113,58,.5)';
      ctx.fillRect(bx, 102 - h, bwid, h);
    });

    // 4) 基线：整数坐标 + 1px 线宽（原 102.5 + 0.7 会插值成两行灰）
    ctx.strokeStyle = 'rgba(107,90,69,.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 102);
    ctx.lineTo(sn(W), 102);
    ctx.stroke();

    // 5) 峰值说明（放大近现代时补一句窗口提示，避免误以为全表只有这一段）
    ctx.fillStyle = '#75654f';
    ctx.font = '8px sans-serif';
    ctx.textAlign = 'left';
    const cap = peak.slice(0, 3).map(function (o) {
      return fmtY(b0 + o.b * bucket) + '–' + fmtY(b0 + (o.b + 1) * bucket - 1) + ' ' + o.n;
    }).join('、');
    const capPrefix = this.data.rulerZoom ? '近现代放大 · 10 年/桶 · ' : '50 年/桶 · 峰值 ';
    ctx.fillText(capPrefix + (this.data.rulerZoom ? '峰值 ' : '') + cap, 0, 116);

    // 6) 游标
    const cy = this._cursorYear == null ? this._visibleYear() : this._cursorYear;
    const cx = sn(Math.max(0, Math.min(W, this._yearX(cy, W))));
    ctx.strokeStyle = '#8f5326';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, 7);
    ctx.lineTo(cx, 103);
    ctx.stroke();
    ctx.fillStyle = '#8f5326';
    ctx.beginPath();
    ctx.moveTo(cx - 4 * sx, 0);
    ctx.lineTo(cx + 4 * sx, 0);
    ctx.lineTo(cx, 6);
    ctx.closePath();
    ctx.fill();
  },

  _setCursor(y) {
    this._cursorYear = y;
    if (this.data.rulerOpen) this._draw();
  },

  _touchYear(e) {
    const t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
    if (!t) return this._cursorYear;
    let x = t.x;
    if (x == null) x = t.clientX - (this._rulerLeft || 0);
    const W = this._rw || RULER_W;
    x = Math.max(0, Math.min(W, x));
    return Math.round(this._xYear(x, W));
  },

  onRulerStart(e) {
    this._dragging = true;
    this._dragYear = this._touchYear(e);
    this._dragTo(this._dragYear);
  },

  onRulerMove(e) {
    if (!this._dragging) return;
    this._dragTo(this._touchYear(e));
  },

  onRulerEnd(e) {
    if (!this._dragging) return;
    this._dragging = false;
    if (this._dragScrollTimer) { clearTimeout(this._dragScrollTimer); this._dragScrollTimer = null; }
    const y = this._dragYear;
    // 吸附到最近条目年份（年份待定区无年份，二分时排除尾部）
    const i = this._nearestIndex(y);
    const ny = this._view.length && this._view[i].y != null ? this._view[i].y : y;
    this._setCursor(ny);
    if (ny != null) this.setData({ eraCur: eraIdx(ny) });
    this._jumpToRow(i);
    this._lockUntil = Date.now() + 250;
    if (this.data.rulerOpen) this._draw();
  },

  onRulerCancel() {
    this._dragging = false;
  },

  /** 拖动：只改游标与时代高亮，滚动用 30ms 合并，避免每帧一次 pageScrollTo */
  _dragTo(y) {
    this._dragYear = y;
    this._setCursor(y);
    const ei = eraIdx(y);
    if (ei !== this.data.eraCur) this.setData({ eraCur: ei });
    if (this._dragScrollTimer) return;
    const that = this;
    this._dragScrollTimer = setTimeout(function () {
      that._dragScrollTimer = null;
      if (!that._dragging) return;
      const i = that._nearestIndex(that._dragYear);
      if (that._rowsTop && that._rowsTop[i]) {
        const top = that._rowsTop[i].top;
        const target = Math.max(0, top - (that._navTop + (that.data.collapsed ? TB_H : 0) + that._ewH + HEAD_H));
        wx.pageScrollTo({ scrollTop: target, duration: 0 });
      }
    }, 30);
  },

  _nearestIndex(y) {
    const view = this._view;
    if (!view.length) return 0;
    let lo = 0;
    // 年份待定区固定排在末尾，二分只在前面的有年份区间里走
    let hi = view.length - 1;
    while (hi >= 0 && view[hi].y == null) hi--;
    if (hi < 0) return 0;
    const end = hi;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (view[mid].y < y) lo = mid + 1; else hi = mid;
    }
    if (lo > 0 && Math.abs(view[lo - 1].y - y) <= Math.abs(view[lo].y - y)) lo--;
    return Math.min(lo, end);
  },

  /* ── 分享 ── */
  onShareAppMessage() {
    return {
      title: '大事年表 · ' + this.data.total + ' 条中国历史大事与战史双记',
      path: '/timeline-pkg/pages/timeline/timeline'
    };
  },

  onShareTimeline() {
    return { title: '大事年表 · ' + this.data.total + ' 条中国历史大事与战史双记' };
  }
});

/* ── 小工具（放在 Page 外，避免模板里重复算） ── */
function thatQy(page, r) {
  const qy = page._qy;
  if (qy == null) return false;
  if (r.y === qy) return true;
  return !!(r.rg && qy >= r.rg[0] && qy <= r.rg[1]);
}
