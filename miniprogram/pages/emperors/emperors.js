const request = require('../../utils/request');
const { navTo } = require('../../utils/nav');
const API = require('../../config/api');
const guide = require('../../utils/guide');

/* 顶部 6 段时期：接口 period 是长名，刻度只放短名，二者在此一一对应。
   接口若出现未收录的 period，落到最后一段，保证不丢数据。 */
const ERAS = [
  { key: 'preqin', name: '先秦', periods: ['上古传说及先秦时期'] },
  { key: 'qinhan', name: '秦汉', periods: ['秦汉时期'] },
  { key: 'weijin', name: '魏晋', periods: ['三国时期', '两晋及五胡十六国时期', '南北朝时期'] },
  { key: 'suitang', name: '隋唐', periods: ['隋唐五代十国时期'] },
  { key: 'songliaojin', name: '宋辽金', periods: ['宋、辽、金、西夏时期'] },
  { key: 'yuanmingqing', name: '元明清', periods: ['元、明、清及近现代时期'] }
];

/* 高度预算：与 WXSS 里的 rpx 高度严格一一对应（1rpx = windowWidth / 750 px）
   .sec 84rpx · .node 88rpx（支轴下的帝王行同样是 .node，88rpx）
   .branch-head / .subhead 68rpx · .peer-branch 72rpx
   政权网格 = 行数×64rpx + 行间距×12rpx + 上下内边距 20rpx
   所有行都不设 margin / border 撑高，滚动定位才准。 */
const H_SEC_RPX = 84;
const H_ROW_RPX = 88;
const H_BRANCH_RPX = 68;
const H_PEER_RPX = 72;
const CHIP_H_RPX = 64;
const CHIP_GAP_RPX = 12;
const GRID_PAD_RPX = 20;
/* 政权索引的分组头与说明行（十六国 / 五代十国）：
   组头 52rpx，说明行 = 30rpx 行高 + 6rpx 下边距 = 36rpx，与 WXSS 一一对应 */
const H_RG_HEAD_RPX = 52;
const H_RG_NOTE_RPX = 36;

const PAGE = 80;      // 首屏 80 行，之后每次追加 80 行
const PREFETCH = 300; // 距边界 300px 时追加 / 预挂
const STICKY_H = 34;  // 34px 吸顶条

/* 宋辽金段内：只剩「金朝」还留在段末。
   辽、西夏不再独立成段 —— 按图二改成挂在北宋 / 南宋段末的支轴（见 PEER_MARKS）。 */
const SONG_TAIL = ['jin-dynasty'];

/* 并存政权：接口里辽、西夏原本是独立的两段，排在北宋、南宋之后，
   于是滚到南宋下面还会再看到一个「辽朝」段头。这里把这两段从段列表摘掉、
   改为挂到北宋 / 南宋的段末：一条虚线支轴 + 一行政权 + 该政权全部帝王行。
   帝王只挂一份（辽 12、西夏 10），总数 574 不变；段数 28 → 26。
   金不在此列，仍是独立段。 */
const PEER_MARKS = {
  'northern-song': 'liao',
  'southern-song': 'western-xia'
};

/* 被摘出来做支轴的段 id，即 PEER_MARKS 的取值 */
const PEER_IDS = ['liao', 'western-xia'];

/* 政权索引分组：十六国 18 个、五代十国 16 个平铺成 4×4 时看不出结构，
   这里按史料口径拆组 —— 五代十国 = 五代（五个朝代）/ 十国 / 其他；
   十六国接口没有族属字段，不猜族属，只作一组并注明「族属未标注」。
   names 一律写接口实际返回的 tag（吴（杨）、闽国、荆南按原样），不凑数、不改名；
   组头只报实际命中的个数与人数，凑不齐也如实显示。 */
const REGIME_GROUPS = {
  wudai: [
    { name: '五代', unit: '个朝代', names: ['后梁', '后唐', '后晋', '后汉', '后周'] },
    { name: '十国', unit: '个政权', names: ['吴（杨）', '南唐', '吴越', '前蜀', '后蜀', '闽国', '楚', '南汉', '荆南', '北汉'] }
  ],
  'sixteen-kingdoms': [
    {
      name: '十六国政权',
      unit: '个政权',
      all: true,
      note: '五胡：匈奴 / 鲜卑 / 羯 / 氐 / 羌 · 接口无族属字段，未给政权贴族属'
    }
  ]
};

/* 把 sec.regimes 按上面的配置分组：配置里的政权按指定顺序取（all: true 取全部），
   没被任何组认领的（如无 tag 的「其他」）兜底成最后一组。
   组头右侧的人数 = 组内政权人数之和，和段头总人数对得上。 */
function buildRegimeGroups(sec) {
  const all = sec.regimes.map((r) => ({ name: r.name, count: r.count }));
  const conf = REGIME_GROUPS[sec.id];
  if (!conf) return [{ key: 'all', name: '', meta: '', note: '', regimes: all }];
  const used = {};
  const groups = [];
  conf.forEach((g) => {
    const names = g.all ? all.map((r) => r.name) : (g.names || []);
    const list = [];
    names.forEach((n) => {
      const hit = all.filter((r) => r.name === n)[0];
      if (hit && !used[n]) {
        list.push(hit);
        used[n] = true;
      }
    });
    if (!list.length) return;
    const n = list.reduce((sum, r) => sum + r.count, 0);
    groups.push({
      key: g.name,
      name: g.name,
      meta: list.length + (g.unit || '个政权') + ' · ' + n + ' 位',
      note: g.note || '',
      regimes: list
    });
  });
  const rest = all.filter((r) => !used[r.name]);
  if (rest.length) {
    const n = rest.reduce((sum, r) => sum + r.count, 0);
    groups.push({
      key: '其他',
      name: '其他',
      meta: rest.length + ' 个政权 · ' + n + ' 位',
      note: '',
      regimes: rest
    });
  }
  return groups;
}


/* 段内再分组：明朝从朱由崧（弘光）起算南明。
   接口里明朝那一段没有可区分「南明」的 tag 字段，20 位按即位年连排；
   1644 年甲申之变是公认分界，所以用「即位年 ≥ 1644」切一刀 —— 规则是年份，
   名单与人数完全由接口数据决定，不在客户端写死任何帝王名。 */
const SUB_SPLITS = { ming: { name: '南明', fromYear: 1644 } };

/* 计算段内切分点；切不开（数据缺失 / 全在界前或界后）就返回 null，保持原样 */
function subSplitOf(secId, rows) {
  const conf = SUB_SPLITS[secId];
  if (!conf) return null;
  let at = -1;
  for (let i = 0; i < rows.length; i++) {
    const y = Number(rows[i].reignFrom);
    if (Number.isFinite(y) && y >= conf.fromYear) { at = i; break; }
  }
  if (at <= 0 || at >= rows.length) return null;
  const sub = rows.slice(at);
  return { at, name: conf.name, count: sub.length, years: regimeYears(sub) };
}

function formatYear(year) {
  const n = Number(year);
  if (!Number.isFinite(n)) return '';
  return n < 0 ? '前' + (-n) : '' + n;
}

function eraOf(period) {
  for (let i = 0; i < ERAS.length; i++) {
    if (ERAS[i].periods.indexOf(period) >= 0) return ERAS[i].key;
  }
  return ERAS[ERAS.length - 1].key;
}

/* 政权归组：按 tag 首次出现顺序排列；空 tag 归「其他」。
   这里只遍历、不筛选，保证接口返回的每一位都能落进某一组。 */
function groupRegimes(emperors) {
  const map = {};
  const list = [];
  emperors.forEach((e) => {
    const tag = (e.tag && String(e.tag).trim()) || '其他';
    if (!map[tag]) {
      map[tag] = { name: tag, count: 0, rows: [] };
      list.push(map[tag]);
    }
    map[tag].count += 1;
    map[tag].rows.push(e);
  });
  return list;
}

/* 政权起讫：取该组内最早即位年与最晚退位年，缺失则留空 */
function regimeYears(rows) {
  let from = null;
  let to = null;
  rows.forEach((e) => {
    const f = Number(e.reignFrom);
    const t = Number(e.reignTo);
    if (Number.isFinite(f)) from = from === null ? f : Math.min(from, f);
    if (Number.isFinite(t)) to = to === null ? t : Math.max(to, t);
  });
  if (from === null && to === null) return '';
  return formatYear(from) + '—' + formatYear(to);
}

/* 抽屉「年号」格：1–3 个全给；超过 3 个给前三个 + 「等 N 个」。
   三格等宽只有 1/3 屏宽，汉武帝 11 个年号全量会把这一行撑爆，
   完整列表留给「查看完整人物档案」。取不到就空串，界面显示「待补」。 */
function eraText(list) {
  const arr = Array.isArray(list) ? list.filter(Boolean) : [];
  if (!arr.length) return '';
  if (arr.length <= 3) return arr.join(' → ');
  return arr.slice(0, 3).join(' → ') + ' 等' + arr.length + '个';
}

Page({
  data: {
    safeAreaTop: 44,
    navH: 88,
    sheetH: 380,

    loading: true,
    loadFailed: false,
    sectionCount: 0,
    totalEmperors: 0,

    /* 头部 / 吸顶 */
    headH: 0,
    headExpandedH: 0,
    headSpacerH: 0,
    foldH: 0,
    compact: false,
    stickyOn: false,
    curSec: null,
    curEra: '',
    eras: ERAS.map((e) => ({ key: e.key, name: e.name, on: false })),

    /* 窗口化渲染：只渲染 [startIndex, endIndex) 这一段，padTop 补出上面的总高 */
    viewItems: [],
    startIndex: 0,
    endIndex: 0,
    padTop: 0,
    scrollTop: 0,
    scrollAnim: false,
    remain: 0,
    allLoaded: false,

    /* 抽屉 / 朝代直达 */
    selId: '',
    sheetOpen: false,
    sheetDrag: 0,
    sheetDragging: false,
    sheet: null,
    dirOpen: false,
    dirGroups: []
  },

  onLoad() {
    let sys = {};
    try {
      sys = wx.getWindowInfo() || {};
    } catch (e) {
      sys = {};
    }
    const winW = sys.windowWidth || 375;
    const winH = sys.windowHeight || 812;
    const safe = sys.statusBarHeight || 44;
    const navH = safe + 44;

    this.RPX = winW / 750;
    this.setData({
      safeAreaTop: safe,
      navH,
      /* 抽屉 52% 屏高，同时保证至少给头部留出空间；不写死 422px */
      sheetH: Math.min(Math.round(winH * 0.52), Math.max(280, winH - navH - 72)),
      /* 测量完成前的兜底高度，避免首帧正文贴顶闪烁 */
      headSpacerH: navH + 96,
      headH: navH + 96,
      headExpandedH: navH + 96
    });

    this.fetchEmperors();
  },

  /* ───────────────── 数据 ───────────────── */

  fetchEmperors() {
    this.setData({ loading: true, loadFailed: false });
    request({
      timeout: 10000,
      url: API.DYNASTIES.EMP_LIST,
      success: (res) => {
        const d = res.data || {};
        if (d.success && Array.isArray(d.data) && d.data.length) {
          this.applyData(d.data);
        } else {
          this.setData({ loading: false, loadFailed: true });
        }
      },
      fail: () => this.setData({ loading: false, loadFailed: true })
    });
  },

  applyData(raw) {
    const secs = raw.map((sec) => {
      const rows = Array.isArray(sec.emperors) ? sec.emperors : [];
      const regimes = groupRegimes(rows);
      let mode = 'flat';
      /* 政权过多（十六国 18 / 五代十国 16）先列政权、点开再看帝王；
         四五个政权的南北朝走分支缩进，不做全量缩进 */
      if (regimes.length >= 10) mode = 'grid';
      else if (regimes.length > 1) mode = 'branch';
      const split = mode === 'flat' ? subSplitOf(sec.id, rows) : null;
      return {
        id: sec.id,
        name: sec.name,
        period: sec.period,
        eraKey: eraOf(sec.period),
        yearLabel: formatYear(sec.start) + '—' + formatYear(sec.end),
        count: rows.length,
        color: sec.color || '#b5713a',
        rows,
        regimes,
        mode,
        /* 段内再分组（明朝 → 南明）：flat 段在第 at 行前插一个分部标题 */
        splitAt: split ? split.at : null,
        splitName: split ? split.name : '',
        splitYears: split ? split.years : '',
        splitCount: split ? split.count : 0
      };
    });

    /* 段内排序：金挪到「宋辽金」段末 */
    const ordered = [];
    ERAS.forEach((era) => {
      let list = secs.filter((s) => s.eraKey === era.key);
      if (era.key === 'songliaojin') {
        const tail = list.filter((s) => SONG_TAIL.indexOf(s.id) >= 0);
        const head = list.filter((s) => SONG_TAIL.indexOf(s.id) < 0);
        list = head.concat(tail);
      }
      list.forEach((s) => ordered.push(s));
    });

    /* 辽、西夏从段列表里摘出来，改挂到北宋 / 南宋段末的支轴上。
       摘出来的段只留支轴需要的四项 + 帝王行；帝王行只挂这一份，不复制。 */
    const peerSecs = {};
    secs.forEach((s) => {
      if (PEER_IDS.indexOf(s.id) >= 0) peerSecs[s.id] = s;
    });
    const sections = ordered.filter((s) => PEER_IDS.indexOf(s.id) < 0);
    sections.forEach((sec) => {
      const p = peerSecs[PEER_MARKS[sec.id]];
      if (!p) return;
      sec.peer = {
        id: p.id,
        name: p.name,
        yearLabel: p.yearLabel,
        count: p.count,
        rows: p.rows
      };
    });

    const empMap = {};
    sections.forEach((sec) => {
      sec.rows.forEach((e) => {
        empMap[e.id] = e;
      });
      if (sec.peer) {
        sec.peer.rows.forEach((e) => {
          empMap[e.id] = e;
        });
      }
    });

    const totalEmperors = sections.reduce(
      (n, s) => n + s.rows.length + (s.peer ? s.peer.rows.length : 0),
      0
    );

    /* 朝代直达：26 个段头 + 两条支轴（辽、西夏）各留一个入口，共 28 个 */
    const dirGroups = ERAS.map((era) => {
      const list = [];
      sections
        .filter((s) => s.eraKey === era.key)
        .forEach((s) => {
          list.push({ id: s.id, name: s.name, count: s.count });
          if (s.peer) list.push({ id: s.peer.id, name: s.peer.name, count: s.peer.count });
        });
      return { key: era.key, name: era.name, list };
    });

    this.model = { sections, empMap, totalEmperors };
    this._open = null;
    this._lastSt = null;
    this._buildItems();

    this.setData(
      {
        sectionCount: sections.length,
        totalEmperors,
        dirGroups,
        curSec: {
          key: 'sec-' + (sections[0] ? sections[0].id : ''),
          name: sections[0] ? sections[0].name : '',
          years: sections[0] ? sections[0].yearLabel : '',
          count: sections[0] ? sections[0].count : 0
        },
        loading: false,
        loadFailed: false,
        startIndex: 0,
        endIndex: Math.min(this.model.items.length, PAGE),
        padTop: 0,
        viewItems: this.sliceItems(0, Math.min(this.model.items.length, PAGE)),
        remain: totalEmperors,
        allLoaded: this.model.items.length <= PAGE
      },
      () => {
        /* 等首帧把头部量出来再落到唐朝 */
        setTimeout(() => this.measureHead(), 30);
        /* 列表渲染完再拉起引导：第 2 步要量帝王行 */
        this._tryAutoGuide(700);
      }
    );
  },

  /** 首次进入的引导：只在没走过（或从「使用指南」点了重看）时拉起 */
  _tryAutoGuide(delay) {
    if (!guide.shouldShow('emperors') && !guide.hasReplay('emperors')) return;
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
    const wait = typeof delay === 'number' ? delay : 300;
    const that = this;
    this._guideTimer = setTimeout(function () {
      that._guideTimer = null;
      const layer = that.selectComponent('#guideLayer');
      if (layer) layer.autoStart('emperors');
    }, wait);
  },

  onUnload() {
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
  },

  /* ───────────────── 轴：建平铺条目 ─────────────────
     平铺而不是嵌套，是为了「80 + 80」窗口化渲染；
     sec / branch / row 的高度都是固定值，偏移量可直接累加。 */
  _buildItems() {
    const k = this.RPX;
    const items = [];
    const secIndex = {};
    const anchors = [];
    const eraFirst = {};

    this.model.sections.forEach((sec) => {
      secIndex[sec.id] = items.length;
      items.push({
        kind: 'sec',
        key: 'sec-' + sec.id,
        name: sec.name,
        years: sec.yearLabel,
        count: sec.count,
        eraKey: sec.eraKey,
        h: H_SEC_RPX * k
      });
      if (!eraFirst[sec.eraKey]) eraFirst[sec.eraKey] = true;

      if (sec.mode === 'grid') {
        const groups = buildRegimeGroups(sec);
        const open = this._open && this._open.secId === sec.id ? this._open.name : '';
        /* 分组后高度 = 每组（组头 + 可选说明行 + 组内网格）累加，
           组头 / 说明行的 rpx 与 WXSS 一一对应，滚动偏移才不会漂 */
        let hRpx = 0;
        groups.forEach((g) => {
          const rowsN = Math.ceil(g.regimes.length / 4);
          hRpx += (g.name ? H_RG_HEAD_RPX : 0)
            + (g.note ? H_RG_NOTE_RPX : 0)
            + rowsN * CHIP_H_RPX
            + (rowsN - 1) * CHIP_GAP_RPX
            + GRID_PAD_RPX;
        });
        items.push({
          kind: 'regime',
          key: 'rg-' + sec.id,
          secId: sec.id,
          open,
          groups,
          h: hRpx * k
        });
        if (open) {
          const reg = sec.regimes.filter((r) => r.name === open)[0];
          if (reg) {
            items.push({
              kind: 'subhead',
              key: 'sh-' + sec.id,
              name: reg.name,
              years: regimeYears(reg.rows),
              count: reg.count,
              h: H_BRANCH_RPX * k
            });
            reg.rows.forEach((e) => items.push(this.rowItem(e, true, k)));
          }
        }
      } else if (sec.mode === 'branch') {
        sec.regimes.forEach((reg, ri) => {
          items.push({
            kind: 'branch',
            key: 'br-' + sec.id + '-' + ri,
            name: reg.name,
            years: regimeYears(reg.rows),
            count: reg.count,
            h: H_BRANCH_RPX * k
          });
          reg.rows.forEach((e) => items.push(this.rowItem(e, true, k)));
        });
      } else {
        /* 明朝 → 南明：在切分点前插一个分部标题，其后各行缩进成支线；
           其余 flat 段（夏商周、秦汉、隋唐、宋辽金、元明清）走不到这里的分支逻辑 */
        const at = sec.splitAt;
        sec.rows.forEach((e, i) => {
          if (at != null && i === at) {
            items.push({
              kind: 'subhead',
              key: 'sh-' + sec.id + '-sub',
              name: sec.splitName,
              years: sec.splitYears,
              count: sec.splitCount,
              h: H_BRANCH_RPX * k
            });
          }
          items.push(this.rowItem(e, at != null && i >= at, k));
        });
      }

      /* 并存支轴：北宋 → 辽（12 位）、南宋 → 西夏（10 位）。
         支轴从段末主轴分出，下面直接排该政权的全部帝王行（与主段同款 88rpx 行）。
         这两段已从段列表摘除，所以这些行是它们在页面上的唯一一份。 */
      const peer = sec.peer;
      if (peer) {
        /* 支轴也进 secIndex：朝代直达仍能落到「辽朝 / 西夏」 */
        secIndex[peer.id] = items.length;
        items.push({
          kind: 'peer',
          key: 'peer-' + sec.id,
          name: peer.name,
          years: peer.yearLabel,
          count: peer.count,
          h: H_PEER_RPX * k
        });
        peer.rows.forEach((e) => items.push(this.rowItem(e, true, k)));
      }
    });

    let off = 0;
    items.forEach((it) => {
      it.off = off;
      off += it.h;
    });

    /* 吸顶条用的锚点：每个段头 + 支轴。滚进辽 / 西夏的帝王行时，
       吸顶条跟着支轴走（辽朝 916—1125 12 位），不会被误判成下一段。 */
    items.forEach((it) => {
      if (it.kind === 'sec' || it.kind === 'peer') {
        anchors.push({
          key: it.key,
          name: it.name,
          years: it.years,
          count: it.count,
          off: it.off
        });
      }
    });

    const eraAnchors = [];
    ERAS.forEach((era) => {
      const sec = this.model.sections.filter((s) => s.eraKey === era.key)[0];
      if (!sec) return;
      const idx = secIndex[sec.id];
      eraAnchors.push({ key: era.key, off: items[idx].off });
    });

    this.model.items = items;
    this.model.secIndex = secIndex;
    this.model.anchors = anchors;
    this.model.eraAnchors = eraAnchors;
    this.model.totalHeight = off;

    /* 自查：每位帝王都要在 empMap 里（界面可以不一次渲染，但数据不许丢） */
    if (Object.keys(this.model.empMap).length !== this.model.totalEmperors) {
      console.warn('[emperors] 帝王索引数量与总数不一致', Object.keys(this.model.empMap).length, this.model.totalEmperors);
    }
  },

  rowItem(e, sub, k) {
    return {
      kind: 'row',
      key: 'e-' + e.id,
      id: e.id,
      name: e.name,
      yr: e.reignRange || '',
      dur: e.reignYearsText || '',
      tag: !sub && e.tag ? e.tag : '',
      sub: !!sub,
      h: H_ROW_RPX * k
    };
  },

  /* 只把界面上真正要用的字段送进 data，简介等长文本留在 this.model 里 */
  sliceItems(start, end) {
    const items = this.model.items;
    const out = [];
    for (let i = start; i < end && i < items.length; i++) {
      const it = items[i];
      if (it.kind === 'sec') {
        out.push({ kind: 'sec', key: it.key, name: it.name, years: it.years, count: it.count });
      } else if (it.kind === 'regime') {
        out.push({ kind: 'regime', key: it.key, secId: it.secId, open: it.open, groups: it.groups });
      } else if (it.kind === 'branch' || it.kind === 'subhead') {
        out.push({ kind: it.kind, key: it.key, name: it.name, years: it.years, count: it.count });
      } else if (it.kind === 'peer') {
        out.push({
          kind: 'peer',
          key: it.key,
          name: it.name,
          years: it.years,
          count: it.count
        });
      } else {
        out.push({
          kind: 'row',
          key: it.key,
          id: it.id,
          name: it.name,
          yr: it.yr,
          dur: it.dur,
          tag: it.tag,
          sub: it.sub
        });
      }
    }
    return out;
  },

  countRows(start, end) {
    const items = this.model.items;
    let n = 0;
    for (let i = start; i < end && i < items.length; i++) {
      if (items[i].kind === 'row') n += 1;
    }
    return n;
  },

  /* ───────────────── 头部测量 / 首屏落点 ───────────────── */

  measureHead() {
    if (!this.model) return;
    const q = wx.createSelectorQuery().in(this);
    q.select('#epHead').boundingClientRect();
    q.select('#epFold').boundingClientRect();
    q.exec((res) => {
      const head = res && res[0];
      if (!head || !head.height) {
        this.jumpToSection('tang', false);
        return;
      }
      const foldH = res[1] && res[1].height ? res[1].height : 0;
      this.setData(
        { headExpandedH: head.height, headH: head.height, headSpacerH: head.height, foldH },
        () => this.jumpToSection('tang', false)
      );
    });
  },

  jumpToSection(id, animate) {
    if (!this.model || !this.model.items) return;
    const idx = this.model.secIndex ? this.model.secIndex[id] : 0;
    this.jumpToIndex(idx == null ? 0 : idx, animate);
  },

  jumpToIndex(idx, animate) {
    const items = this.model.items;
    if (!items.length) return;
    const start = Math.max(0, Math.min(idx, items.length - 1));
    const end = Math.min(items.length, start + PAGE);
    const target = items[start];
    /* 内容顶部 = headSpacer + padTop；让该段落在「头部 + 34px 吸顶条」下方 */
    const top = Math.max(0, this.data.headSpacerH + target.off - this.data.headH - STICKY_H);
    this._jumpTick = (this._jumpTick || 0) + 1;
    this._lastSt = top;
    this.setData({
      startIndex: start,
      endIndex: end,
      padTop: target.off,
      viewItems: this.sliceItems(start, end),
      remain: this.model.totalEmperors - this.countRows(start, end),
      allLoaded: end >= items.length,
      scrollTop: top + (this._jumpTick % 2) * 0.5,
      scrollAnim: animate !== false
    });
    this.syncView(top);
  },

  /* ───────────────── 滚动 ───────────────── */

  onScroll(e) {
    const st = (e.detail && e.detail.scrollTop) || 0;
    const up = this._lastSt !== null && st < this._lastSt - 1;
    this._lastSt = st;
    this.syncView(st);
    if (up) this.maybePrepend(st);
  },

  /* 吸顶条 / 时期高亮 / 标题收起：只在变化时 setData，避免滚动抖动 */
  syncView(st) {
    if (!this.model || !this.model.anchors || !this.model.anchors.length) return;
    const d = this.data;
    const compact = st > 48;
    const headH = compact
      ? Math.max(d.headExpandedH - d.foldH, 0)
      : d.headExpandedH;
    const probe = st + headH + STICKY_H;

    const anchors = this.model.anchors;
    let cur = anchors[0];
    for (let i = 0; i < anchors.length; i++) {
      if (d.headSpacerH + anchors[i].off <= probe) cur = anchors[i];
      else break;
    }

    let eraKey = this.model.eraAnchors.length ? this.model.eraAnchors[0].key : '';
    const ea = this.model.eraAnchors;
    for (let i = 0; i < ea.length; i++) {
      if (d.headSpacerH + ea[i].off <= probe) eraKey = ea[i].key;
      else break;
    }

    const patch = {};
    if (compact !== d.compact) {
      patch.compact = compact;
      patch.headH = headH;
    }
    if (!d.curSec || d.curSec.key !== cur.key) {
      patch.curSec = { key: cur.key, name: cur.name, years: cur.years, count: cur.count };
    }
    if (eraKey !== d.curEra) {
      patch.curEra = eraKey;
      patch.eras = d.eras.map((x) => ({ key: x.key, name: x.name, on: x.key === eraKey }));
    }
    const stickyOn = st > 8;
    if (stickyOn !== d.stickyOn) patch.stickyOn = stickyOn;

    if (Object.keys(patch).length) this.setData(patch);
  },

  /* 向上滑到已渲染内容顶部前 300px，就把上面 80 条补进来 */
  maybePrepend(st) {
    if (this._prep || !this.model) return;
    const d = this.data;
    if (d.startIndex <= 0) return;
    if (st > d.headSpacerH + d.padTop + PREFETCH) return;
    this._prep = true;
    const start = Math.max(0, d.startIndex - PAGE);
    const padTop = this.model.items[start].off;
    this.setData(
      { startIndex: start, padTop, viewItems: this.sliceItems(start, d.endIndex) },
      () => {
        this._prep = false;
      }
    );
  },

  /* 距底 300px 追加 80 条 */
  onAppend() {
    if (!this.model) return;
    const d = this.data;
    if (d.endIndex >= this.model.items.length) return;
    const end = Math.min(this.model.items.length, d.endIndex + PAGE);
    this.setData({
      endIndex: end,
      viewItems: this.sliceItems(d.startIndex, end),
      remain: this.model.totalEmperors - this.countRows(d.startIndex, end),
      allLoaded: end >= this.model.items.length
    });
  },

  /* ───────────────── 交互：刻度 / 朝代直达 / 政权 ───────────────── */

  onTapEra(e) {
    if (!this.model) return;
    const key = e.currentTarget.dataset.key;
    const sec = this.model.sections.filter((s) => s.eraKey === key)[0];
    if (sec) this.jumpToSection(sec.id, true);
  },

  /* 并存标记行已改成「支轴 + 帝王行」常显，不再需要点击跳转 */

  onTapRow(e) {
    if (!this.model) return;
    const id = e.currentTarget.dataset.id;
    const emp = id != null && this.model.empMap[id] ? this.model.empMap[id] : null;
    if (!emp) return;
    this.setData({
      selId: id,
      sheetOpen: true,
      sheetDrag: 0,
      sheetDragging: false,
      sheet: {
        id: emp.id,
        name: emp.name,
        sub: emp.reignLabel || '',
        life: emp.life || '',
        reign: emp.reignRange || '',
        years: emp.reignYearsText || '',
        era: eraText(emp.eraNames),
        intro: emp.intro || '',
        source: emp.source || '',
        verified: !!emp.verified
      }
    });
  },

  onPickRegime(e) {
    if (!this.model) return;
    const secId = e.currentTarget.dataset.sec;
    const name = e.currentTarget.dataset.name;
    const cur = this._open;
    const next = cur && cur.secId === secId && cur.name === name ? null : { secId, name };
    this._open = next;
    this._buildItems();

    const d = this.data;
    const items = this.model.items;
    const start = Math.min(d.startIndex, items.length - 1);
    /* 展开后把新政权的帝王行也纳入当前窗口；收起时窗口不变 */
    let end = Math.min(items.length, Math.max(d.endIndex, start + PAGE));
    if (next) {
      const sec = this.model.sections.filter((s) => s.id === secId)[0];
      const reg = sec && sec.regimes.filter((r) => r.name === name)[0];
      if (reg) {
        const lastRow = items.filter((it) => it.kind === 'row' && reg.rows.some((r) => r.id === it.id)).pop();
        if (lastRow) {
          const lastIdx = items.indexOf(lastRow);
          end = Math.min(items.length, Math.max(end, lastIdx + 1));
        }
      }
    }
    this.setData({
      viewItems: this.sliceItems(start, end),
      startIndex: start,
      endIndex: end,
      padTop: items[start].off,
      remain: this.model.totalEmperors - this.countRows(start, end),
      allLoaded: end >= items.length
    });
  },

  onRetry() {
    this.fetchEmperors();
  },

  /* ───────────────── 抽屉 ───────────────── */

  onCloseSheet() {
    this.setData({ sheetOpen: false, sheetDrag: 0, sheetDragging: false, selId: '' });
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
    if (this._grabDy > 80) {
      this.onCloseSheet();
      return;
    }
    this.setData({ sheetDrag: 0, sheetDragging: false });
  },

  onOpenSheetFigure() {
    const s = this.data.sheet;
    if (!s || !s.id) return;
    navTo('/detail-pkg/pages/detail/detail?id=' + s.id);
  },

  /* ───────────────── 朝代直达（28 个入口） ───────────────── */

  onOpenDir() {
    this.setData({ dirOpen: true, sheetOpen: false, sheetDrag: 0, selId: '' });
  },

  onCloseDir() {
    this.setData({ dirOpen: false });
  },

  onPickDynasty(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    this.setData({ dirOpen: false }, () => {
      /* 等 scroll-y 恢复后再滚，否则部分机型不响应 */
      setTimeout(() => this.jumpToSection(id, true), 40);
    });
  },

  onShareAppMessage() {
    return { title: '世慧屋 · 历代帝王｜各朝帝王一览', path: '/pages/emperors/emperors' };
  },

  onShareTimeline() {
    return { title: '世慧屋 · 历代帝王｜各朝帝王一览' };
  }
});
