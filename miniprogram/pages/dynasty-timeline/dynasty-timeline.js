const request = require('../../utils/request');
const API = require('../../config/api');
const guide = require('../../utils/guide');

/* ============================================================
   朝代时间轴 · B 案「分期索引」
   ------------------------------------------------------------
   数据口径：/api/dynasties 现有 71 条 —— 原有 39 条 + 本轮补录 32 条
   （武周 1 + 五胡十六国 16 + 五代 5 + 十国 10，均 src='user'）。
   补录条目的 parentId 记录归属：武周→tang、十六国→sixteen-kingdoms、
   五代 / 十国→wudai；页面分卷另用 CHILD_IDS 兜底。
   页面不按年数等比，而是分 8 个时期；时期内的「并立」用格子、
   「相继」用带序号的格子、「多政权并存」用可折叠列表。
   五胡十六国 / 五代 / 十国三块默认折叠，交互沿用「历代帝王」页
   的 row + ▸ + 子级那套手法（点段头展开，箭头转 90°），不另造一套。
   ============================================================ */

const NOW = new Date().getFullYear();
/* 补录条目的 color / image 在库里是 null（没有真实设计值，不编色号），
   渲染时统一落到这个默认色；有真实 color 的条目仍用自身色。 */
const DEFAULT_COLOR = '#b5713a';

function fmtYear(y) {
  if (y === 0) return '至今';
  return y < 0 ? '前' + (-y) : '' + y;
}
function endYear(d) {
  return d.end === 0 ? NOW : d.end;
}
function spanYears(d) {
  return Math.abs(endYear(d) - d.start) + '年';
}

/* 父子层级：原有 39 条里的分卷关系 + 本轮补录的武周（挂 tang 下）。
   十六国 / 五代 / 十国不走这里 —— 它们在段内是独立的可折叠块。 */
const CHILD_IDS = {
  zhou: [['western-zhou', 0], ['eastern-zhou', 0], ['spring-autumn', 1], ['warring-states', 1]],
  han: [['western-han', 0], ['xin', 0], ['xuan-han', 0], ['eastern-han', 0]],
  jin: [['western-jin', 0], ['eastern-jin', 0]],
  tang: [['wu-zhou', 0]]
};

/* 本轮补录的 id 清单：用来在段内拼折叠块与乙案列表，不依赖名称匹配 */
const SG16_IDS = [
  'sg-cheng-han', 'sg-qian-zhao', 'sg-hou-zhao', 'sg-qian-liang', 'sg-qian-yan',
  'sg-qian-qin', 'sg-hou-qin', 'sg-hou-yan', 'sg-xi-qin', 'sg-hou-liang',
  'sg-nan-liang', 'sg-bei-liang', 'sg-nan-yan', 'sg-xi-liang', 'sg-hu-xia', 'sg-bei-yan'
];
const WD5_IDS = ['wd-hou-liang', 'wd-hou-tang', 'wd-hou-jin', 'wd-hou-han', 'wd-hou-zhou'];
const WD10_IDS = [
  'wd-wu', 'wd-nan-tang', 'wd-qian-shu', 'wd-hou-shu', 'wd-wu-yue',
  'wd-chu', 'wd-min', 'wd-nan-han', 'wd-nan-ping', 'wd-bei-han'
];

/* 8 段分期：五代十国从「隋唐」里拆出来单独成段，
   隋唐段收在 907（唐亡），五代十国自 902 起、979 止。 */
const SECS = [
  { key: 'preqin', name: '先秦', short: '先秦', yr: '前 2070 — 前 221', ids: ['xia', 'shang', 'zhou'], cnt: '3 条' },
  { key: 'qinhan', name: '秦汉', short: '秦汉', yr: '前 221 — 220', ids: ['qin', 'western-chu', 'han'], cnt: '3 条' },
  { key: 'weijin', name: '魏晋南北朝', short: '魏晋', yr: '220 — 589', ids: ['jin'], cnt: '三国 / 晋 / 十六国 16 / 南北朝' },
  { key: 'suitang', name: '隋唐', short: '隋唐', yr: '581 — 907', ids: ['sui', 'tang'], cnt: '2 条' },
  { key: 'wudai', name: '五代十国', short: '五代', yr: '902 — 979', ids: [], cnt: '五代 5 · 十国 10' },
  { key: 'songliao', name: '宋辽金西夏', short: '宋辽金', yr: '960 — 1279', ids: [], cnt: '5 个政权并立' },
  { key: 'yuanming', name: '元明清', short: '元明清', yr: '1271 — 1912', ids: ['yuan', 'ming', 'qing'], cnt: '3 条' },
  { key: 'modern', name: '近现代', short: '近现代', yr: '1912 — 今', ids: ['roc', 'prc'], cnt: '2 条' }
];

/* 并立带：只描述「谁与谁同时」，成员全部来自接口条目，起讫直接取字段 */
const BANDS = {
  weijin: [
    {
      key: 'band-sanguo', title: '三国鼎立', k: '并立', yr: '220 — 280',
      ids: ['cao-wei', 'shu-han', 'eastern-wu'],
      note: '分为曹魏、蜀汉、东吴三个政权。'
    },
    {
      key: 'band-nanbei', title: '南北朝对峙', k: '并立', yr: '420 — 589',
      ids: ['southern-dynasties', 'northern-dynasties'],
      note: '南朝宋齐梁陈与北朝北魏、东魏、西魏、北齐、北周。'
    }
  ],
  songliao: [
    {
      key: 'band-songliao', title: '宋辽金西夏并立', k: '并立', yr: '960 — 1279',
      ids: ['northern-song', 'liao', 'southern-song', 'western-xia', 'jin-dynasty'],
      note: '北宋与辽、西夏并立；南宋与金、西夏对峙。辽（916—1125）与北宋同期，不是北宋之后的朝代。'
    }
  ]
};

function cellOf(d) {
  return {
    id: d.id,
    name: d.name,
    yr: fmtYear(d.start) + ' — ' + fmtYear(endYear(d)),
    len: spanYears(d),
    color: d.color || DEFAULT_COLOR
  };
}

/* 朝代行：有分卷的（周 / 汉 / 晋 / 唐）带 ▸，点行展开子段；
   没有分卷的点整行开抽屉。武周由此挂在唐下面。 */
function rowOf(d, byId) {
  const conf = CHILD_IDS[d.id] || [];
  const subs = conf
    .map(function (pair) {
      const x = byId[pair[0]];
      if (!x) return null;
      return {
        id: x.id,
        name: x.name,
        yr: fmtYear(x.start) + ' — ' + fmtYear(endYear(x)),
        len: spanYears(x),
        color: x.color || DEFAULT_COLOR,
        depth: pair[1]
      };
    })
    .filter(Boolean);

  let tag = '';
  if (d.id === 'tang') tag = '含 武周';
  else if (subs.length) tag = '分 ' + subs.length + ' 段';

  return {
    key: 'row-' + d.id,
    kind: 'row',
    id: d.id,
    name: d.name,
    tag: tag,
    yr: fmtYear(d.start) + ' — ' + fmtYear(endYear(d)),
    len: spanYears(d),
    color: d.color || DEFAULT_COLOR,
    hasSubs: subs.length > 0,
    open: false,
    subs: subs,
    note: d.id === 'tang' ? '690—705 · 定都洛阳 · 国号改周' : ''
  };
}

/* 乙案列表：按开国年排序（同年再按结束年），
   同年开国的并成一组，用同色左边线 +「304 起」同色小标签提示。
   相邻只代表开国年接近，不代表同期。 */
function listRows(items) {
  const sorted = items.slice().sort(function (a, b) {
    return a.start - b.start || a.end - b.end;
  });
  const cnt = {};
  sorted.forEach(function (p) { cnt[p.start] = (cnt[p.start] || 0) + 1; });
  const col = {};
  let n = 0;
  Object.keys(cnt).forEach(function (y) {
    if (cnt[y] > 1) col[y] = (n++ % 4) + 1;
  });

  return sorted.map(function (p) {
    return {
      id: p.id,
      name: p.name,
      cls: col[p.start] ? 'lrow g' + col[p.start] : 'lrow',
      startLabel: fmtYear(p.start) + ' 起',
      sp: fmtYear(p.start) + ' — ' + fmtYear(endYear(p)),
      len: spanYears(p)
    };
  });
}

/* 五代：与宋辽金夏同一套卡片格子，但每格右上角有 1—5 的序号，
   抬头写一句「依次相接」，读成一条链而不是五个并立政权。 */
function seqCells(items) {
  return items
    .slice()
    .sort(function (a, b) { return a.start - b.start; })
    .map(function (p, i) {
      return {
        id: p.id,
        name: p.name,
        ord: i + 1,
        yr: p.start + ' — ' + p.end,
        len: (p.end - p.start) + '年',
        color: p.color || DEFAULT_COLOR
      };
    });
}

function buildSections(list) {
  const byId = {};
  list.forEach(function (d) { byId[d.id] = d; });

  const pick = function (ids) {
    return ids.map(function (id) { return byId[id]; }).filter(Boolean);
  };

  return SECS.map(function (s) {
    const blocks = [];

    if (s.key === 'weijin') {
      /* 顺序按年代：三国（220）→ 晋（265）→ 十六国（304）→ 南北朝（420） */
      blocks.push({
        key: BANDS.weijin[0].key, kind: 'band',
        title: BANDS.weijin[0].title, k: BANDS.weijin[0].k,
        yr: BANDS.weijin[0].yr, note: BANDS.weijin[0].note,
        cells: pick(BANDS.weijin[0].ids).map(cellOf)
      });
      if (byId.jin) blocks.push(rowOf(byId.jin, byId));

      const sg = pick(SG16_IDS);
      blocks.push({
        key: 'fold-l16', kind: 'fold', mode: 'list',
        id: 'fold-l16',
        title: '五胡十六国', tag: sg.length + ' 个政权',
        range: '304 — 439', years: '135年',
        color: byId['sixteen-kingdoms'] ? byId['sixteen-kingdoms'].color : DEFAULT_COLOR,
        open: false,
        list: listRows(sg),
        note: '按开国年从早到晚排，同年开国的用同色左边线并成一组：' +
          '304 成汉 / 前赵、384 后燕 / 后秦、397 南凉 / 北凉、407 胡夏 / 北燕。' +
          '五胡（匈奴、鲜卑、羯、氐、羌）是族属，不计入政权数。'
      });

      blocks.push({
        key: BANDS.weijin[1].key, kind: 'band',
        title: BANDS.weijin[1].title, k: BANDS.weijin[1].k,
        yr: BANDS.weijin[1].yr, note: BANDS.weijin[1].note,
        cells: pick(BANDS.weijin[1].ids).map(cellOf)
      });
    } else if (s.key === 'wudai') {
      /* 五代读顺序（序号格子），十国读先后立国（乙案列表），两块都默认折叠 */
      const w5 = pick(WD5_IDS);
      blocks.push({
        key: 'fold-t5', kind: 'fold', mode: 'seq',
        id: 'fold-t5',
        title: '五代', tag: '相继 · ' + w5.length + ' 个政权',
        range: '907 — 960', years: '53年',
        color: byId.wudai ? byId.wudai.color : DEFAULT_COLOR,
        open: false,
        tip: '按角标 1 → 5 依次相接：后梁亡、后唐兴，不是五个并立。',
        cells: seqCells(w5)
      });

      const w10 = pick(WD10_IDS);
      blocks.push({
        key: 'fold-l10', kind: 'fold', mode: 'list',
        id: 'fold-l10',
        title: '十国', tag: w10.length + ' 个政权',
        range: '902 — 979', years: '77年',
        color: DEFAULT_COLOR,
        open: false,
        list: listRows(w10),
        note: '907 年吴越与楚同年开国，同组；整段实际 902—979（吴 902 起、北汉 979 止）。'
      });

      blocks.push({
        key: 'note-wudai', kind: 'note',
        text: '整段 902 — 979：五代在北方一朝接一朝（907—960，展开后格子右上角 1—5），' +
          '十国在南方同期并存（902—979，展开后按开国年排）。五代读顺序，十国读先后立国。'
      });
    } else if (s.key === 'songliao') {
      const b = BANDS.songliao[0];
      blocks.push({
        key: b.key, kind: 'band',
        title: b.title, k: b.k, yr: b.yr, note: b.note,
        cells: pick(b.ids).map(cellOf)
      });
    } else {
      s.ids.forEach(function (id) {
        if (byId[id]) blocks.push(rowOf(byId[id], byId));
      });
    }

    return {
      key: s.key,
      name: s.name,
      short: s.short,
      yr: s.yr,
      cnt: s.cnt,
      blocks: blocks
    };
  });
}

Page({
  data: {
    loading: true,
    loadFailed: false,
    safeAreaTop: 44,
    navH: 88,
    headH: 200,
    headSpacerH: 200,
    sections: [],
    /* 8 段 tab 与数据解耦：加载中也要能看见分期入口 */
    eras: SECS.map(function (s) { return { key: s.key, short: s.short }; }),
    eraKey: 'preqin',
    /* 当前段 tab 自动横向滚进视口（标签条常驻，宽屏下 8 个放不满一行） */
    eraIntoView: 'era-preqin',
    scrollTop: 0,
    scrollAnim: false,
    total: 0,
    sheet: {
      show: false,
      name: '',
      span: '',
      yearLabel: '',
      capital: '',
      brief: '',
      detail: ''
    }
  },

  onLoad() {
    const sysInfo = wx.getWindowInfo();
    const safe = sysInfo.statusBarHeight || 44;
    this.setData({ safeAreaTop: safe, navH: safe + 44 });
    this.fetchDynasties();
  },

  onReady() {
    this.measureHead();
  },

  onUnload() {
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
  },

  /**
   * 首次进入的引导：只在没走过（或从「使用指南」点了重看）时拉起。
   * 目标都在首屏（分期条 + 首段），不需要页面滚动配合。
   */
  _tryAutoGuide(delay) {
    if (!guide.shouldShow('dynasty') && !guide.hasReplay('dynasty')) return;
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
    const wait = typeof delay === 'number' ? delay : 300;
    const that = this;
    this._guideTimer = setTimeout(function () {
      that._guideTimer = null;
      const layer = that.selectComponent('#guideLayer');
      if (layer) layer.autoStart('dynasty');
    }, wait);
  },

  /* 深色头是 fixed 的，滚动区要垫出等高占位，否则首段会被盖住。
     量完再算各段偏移（偏移依赖头部高度），所以这里带一个 done 回调。 */
  measureHead(done) {
    wx.createSelectorQuery()
      .in(this)
      .select('#dtHead')
      .boundingClientRect((rect) => {
        if (!rect || !rect.height) {
          if (done) done();
          return;
        }
        const h = Math.round(rect.height);
        this.setData({ headH: h, headSpacerH: h }, () => { if (done) done(); });
      })
      .exec();
  },

  /* 各段段头在滚动内容里的绝对偏移，用于滚动时反推当前段。
     折叠块展开/收起会改变后续段的位置，所以每次 toggle 后都要重算。 */
  measureSections() {
    const q = wx.createSelectorQuery().in(this);
    q.select('.page-scroll').boundingClientRect();
    q.select('.page-scroll').scrollOffset();
    q.selectAll('.sec').boundingClientRect();
    q.exec((res) => {
      const view = res && res[0];
      const off = res && res[1];
      const rects = (res && res[2]) || [];
      if (!view || !off || !rects.length) return;
      const base = off.scrollTop - view.top; // 视口 y → 内容 y 的换算量
      this._secTops = rects.map((r, i) => {
        const s = this.data.sections[i];
        return s ? { key: s.key, top: r.top + base } : null;
      }).filter(Boolean);
      this.syncEra(off.scrollTop);
    });
  },

  /* 滚动事件：只在跨段时才 setData。100ms 节流，不查节点、不回写 scrollTop，
     避免和惯性滚动互相打断。 */
  onListScroll(e) {
    const st = e.detail.scrollTop;
    this._lastScrollTop = st;
    const now = Date.now();
    if (this._scrollTick && now - this._scrollTick < 100) return;
    this._scrollTick = now;
    if (this._eraLockUntil && now < this._eraLockUntil) return; // 点 tab 的程序化滚动期间不抢高亮
    this.syncEra(st);
  },

  syncEra(st) {
    const tops = this._secTops;
    if (!tops || !tops.length) return;
    const probe = st + this.data.headH + 8; // 头部下沿再往下一行，算「已进入该段」
    let key = tops[0].key;
    for (let i = 0; i < tops.length; i++) {
      if (tops[i].top <= probe) key = tops[i].key;
      else break;
    }
    if (key !== this.data.eraKey) {
      this.setData({ eraKey: key, eraIntoView: 'era-' + key });
    }
  },

  fetchDynasties() {
    request({
      timeout: 10000,
      url: API.DYNASTIES.LIST,
      success: (res) => {
        const d = res.data || {};
        if (d.success && Array.isArray(d.data)) {
          const list = d.data;
          const byId = {};
          list.forEach((item) => { byId[item.id] = item; });
          this.byId = byId;

          this.setData({
            sections: buildSections(list),
            total: list.length,
            loading: false
          }, () => {
            this.measureHead(() => this.measureSections());
            // 首帧渲染完再拉起引导：第 2 步要量首段的朝代行
            this._tryAutoGuide(600);
          });
        } else {
          this.setData({ loading: false });
        }
      },
      fail: () => this.setData({ loading: false, loadFailed: true })
    });
  },

  onRetry() {
    this.setData({ loading: true, loadFailed: false });
    this.fetchDynasties();
  },

  /* 8 段 tab：滚动到对应段头。scroll-view 从 0 开始、头部 fixed，
     所以目标位置 = 当前滚动量 + 段头视口位置 − 头部高度。 */
  onTapEra(e) {
    const key = e.currentTarget.dataset.key;
    this._eraLockUntil = Date.now() + 700; // 程序化滚动期间高亮锁定在所点的段
    this.setData({ eraKey: key, eraIntoView: 'era-' + key });
    const q = wx.createSelectorQuery().in(this);
    q.select('.page-scroll').scrollOffset();
    q.select('#sec-' + key).boundingClientRect();
    q.exec((res) => {
      if (!res || !res[0] || !res[1]) return;
      const top = Math.max(0, res[0].scrollTop + res[1].top - this.data.headH - 6);
      this.setData({ scrollTop: top, scrollAnim: true });
    });
  },

  /* 行点击：有分卷 → 展开/收起；无分卷 → 开抽屉 */
  onTapRow(e) {
    const ds = e.currentTarget.dataset;
    const si = Number(ds.si);
    const bi = Number(ds.bi);
    const block = this.data.sections[si].blocks[bi];
    if (!block || (!block.hasSubs && block.kind !== 'fold')) {
      this.openSheet(block && block.id);
      return;
    }
    const patch = {};
    patch['sections[' + si + '].blocks[' + bi + '].open'] = !block.open;
    /* 展开/收起会改变后续段的高度，重算段偏移，避免高亮错段 */
    this.setData(patch, () => this.measureSections());
  },

  onTapItem(e) {
    this.openSheet(e.currentTarget.dataset.id);
  },

  openSheet(id) {
    const d = this.byId && this.byId[id];
    if (!d) return;
    this.setData({
      sheet: {
        show: true,
        name: d.name,
        span: spanYears(d),
        yearLabel: fmtYear(d.start) + ' — ' + fmtYear(endYear(d)),
        capital: d.capital && d.capital !== '—' ? '都城：' + d.capital : '都城：—',
        brief: d.brief || '',
        detail: d.detail || '暂无详情。'
      }
    });
  },

  onCloseSheet() {
    const s = this.data.sheet;
    if (!s.show) return;
    this.setData({ 'sheet.show': false });
  },

  noop() {},

  onShareAppMessage() {
    return { title: '世慧屋 · 朝代时间轴｜五千年历史一图看懂', path: '/pages/dynasty-timeline/dynasty-timeline' };
  },

  onShareTimeline() {
    return { title: '世慧屋 · 朝代时间轴｜五千年历史一图看懂' };
  }
});
