/**
 * 中外对照（方案 B）
 * ---------------------------------------------------------------------------
 * 数据：《中外历史对比年表》book-events.js（173 段 / 1849 条），随分包惰性加载。
 * 结构：可收起头部（深色统计卡 + 地区下拉 + 搜索 + 年代段口径 + 时间轴）
 *       + 可滚动双栏年表。头部三态随列表滚动收起：0 全展 / 1 收统计卡与筛选行、时间轴压成细条
 *       / 2 时间轴收成 44px 摘要条。收起只改 headStage 并走 CSS 高度过渡，不重渲染列表与密度柱。
 *
 * 时间轴取舍：密度柱用纯 view 画（不上 canvas，避免原生层压住地区下拉与引导卡）。
 * 拖动时 touchmove 交给 WXS（axis.wxs）直接改游标 left，不走 setData，逐帧跟手；
 * 松手后才按最终位置定位段并滚动列表。列表滚动时用二分查已量好的段偏移更新游标，
 * 不改 bands 数组，避免 173 段列表反复 diff。
 */
const { navTo } = require('../../../utils/nav');
const guide = require('../../../utils/guide');
const request = require('../../../utils/request');
const API = require('../../../config/api');
// 已核实的中外往来条目（原独立页的数据模块，随页面并入本页；内容原样未改）
const IX = require('./interactions-data');

// 地区：key 与 book-events 的 region 对齐；颜色用于分布条与条目圆点
const REGION_DEFS = [
  ['all', '全部', '#8A7B62'],
  ['europe', '欧洲', '#3F6B68'],
  ['arabia', '中东', '#A9762F'],
  ['africa', '非洲', '#8C5A3C'],
  ['south-asia', '南亚', '#6F5B87'],
  ['east-asia', '东亚', '#4E7A5A'],
  ['central-asia', '中亚', '#7A6A4A'],
  ['sea', '南洋', '#4F6F8A'],
  ['americas', '美洲', '#7B5E8A'],
  ['world', '国际', '#6B6B6B'],
  ['unknown', '其他', '#8A7B62']
];
const REGION_COLOR = {};
REGION_DEFS.forEach(function (r) { REGION_COLOR[r[0]] = r[2]; });

const PAGE_SIZE = 26;   // 首屏渲染段数：控制单次 setData 体积
const NEXT_SIZE = 24;   // 触底追加

// 时间轴分段：按节点数切片，同年组不拆开。首段约覆盖 2—3 屏，
// 滚到轴尾再追加同量，避免徐光启这种百条级一次 setData。
const TL_PAGE_NODES = 24;

// 往来类型五色（与设计页 interactions-rich 的 TYPES 一致）：envoy 出使 / war 战争 / faith 传教 / trade 通商 / dip 外交
const IX_TYPES = {
  envoy: { color: '#3F6B68', soft: 'rgba(63, 107, 104, 0.10)' },
  war: { color: '#9C3B2E', soft: 'rgba(156, 59, 46, 0.10)' },
  faith: { color: '#6F5B87', soft: 'rgba(111, 91, 135, 0.10)' },
  trade: { color: '#A9762F', soft: 'rgba(169, 118, 47, 0.10)' },
  dip: { color: '#B5713A', soft: 'rgba(181, 113, 58, 0.10)' }
};
function ixTypeMeta(type) { return IX_TYPES[type] || IX_TYPES.dip; }

function fmtYear(y) { return y < 0 ? '前' + (-y) : String(y); }

// 搜索年份：前221 / 公元前221年 / -221 / 755 / 755年
function parseYear(raw) {
  const s = String(raw == null ? '' : raw).trim();
  let m = s.match(/^公元前\s*(\d{1,4})\s*年?$/) || s.match(/^前\s*(\d{1,4})\s*年?$/) || s.match(/^-\s*(\d{1,4})$/);
  if (m) return -Number(m[1]);
  m = s.match(/^(\d{1,4})\s*年?$/);
  if (m) return Number(m[1]);
  return null;
}

/* ═════════ 往来条目与生卒解析 ═════════
 * 人物结果页不再跳转独立页：往来条目（13 条确证 + 1 条存疑）直接在本页展开。
 * 数据来自 interactions-data.js，年份、引文、来源、A/B/D 等级全部原样展示。
 */

// 姓名 → 往来条目键；兼容「马可波罗」与「马可·波罗」这类异写
function ixKeyOf(name) {
  const n = String(name == null ? '' : name).trim();
  if (!n) return '';
  if (IX.BY_NAME[n]) return IX.BY_NAME[n];
  const flat = n.replace(/[·•.\s]/g, '');
  const hit = Object.keys(IX.BY_NAME).filter(function (k) {
    return k.replace(/[·•.\s]/g, '') === flat;
  })[0];
  return hit ? IX.BY_NAME[hit] : '';
}

// 单个年份词 → 数字（前164 → -164；? / 不详 → null）
function yearToken(t) {
  const s = String(t == null ? '' : t).trim().replace(/^约|^大约|^约在/, '');
  if (!s || s === '?' || s === '不详') return null;
  const m = s.match(/^(公元前|前)?\s*(\d{1,4})/);
  if (!m) return null;
  const n = Number(m[2]);
  if (!isFinite(n)) return null;
  return m[1] ? -n : n;
}

// 从已核条目的 kicker 取生卒与在位，如「西汉 · 约前164—前114 · 汉中成固」
// 「清 · 1711—1799 · 在位 1735—1796」。只读既有标注，不做推断。
function parseKicker(k) {
  const out = { birth: null, death: null, reignStart: null, reignEnd: null };
  const s = String(k == null ? '' : k);
  const segs = s.split('·').map(function (x) { return x.trim(); });
  const life = segs.length > 1 ? segs[1] : '';
  if (life && life.indexOf('不详') < 0) {
    const parts = life.split(/[—–\-~至]/);
    if (parts.length >= 2) {
      out.birth = yearToken(parts[0]);
      out.death = yearToken(parts[parts.length - 1]);
    }
  }
  const m = s.match(/在位\s*((?:公元前|前)?\d{1,4})\s*[—–\-~]\s*((?:公元前|前)?\d{1,4})/);
  if (m) {
    out.reignStart = yearToken(m[1]);
    out.reignEnd = yearToken(m[2]);
  }
  return out;
}

// 年份区间起点：「前138—前126」→ -138，「1275—1291」→ 1275，「97」→ 97
function startYearOf(t) {
  const s = String(t == null ? '' : t).trim();
  if (!s) return null;
  return yearToken(s.split(/[—–\-~至]/)[0]);
}

/* ═════════ 域外同期数据（world-figures / world-events） ═════════
 * 本页原先只接了《中外历史对比年表》(book-events)，搜人物时只能在年表正文里
 * 命中零星提及，结果必然单薄。分包内还一直躺着两套域外数据，旧「平行时空」页
 * 仍在使用，这里按需惰性 require，作为「同期域外人物」「同期域外事件」两路并入
 * 人物搜索结果（第三路仍是 book-events 的同年表条目）。
 *   world-figures.js → 469 位域外人物（生卒 / 在位）
 *   world-events.js  → 806 条域外事件
 */
let W_FIGURES = null;
let W_EVENTS = null;
let W_REGIONS = null;
function ensureWorldData() {
  if (W_FIGURES) return;
  try {
    W_FIGURES = require('../parallel/world-figures').WORLD_FIGURES || [];
    const we = require('../parallel/world-events');
    W_EVENTS = we.WORLD_EVENTS || [];
    W_REGIONS = we.REGION_INFO || {};
  } catch (e) {
    W_FIGURES = [];
    W_EVENTS = [];
    W_REGIONS = {};
  }
}
function figStart(f) { return f.birth != null ? f.birth : f.reignStart; }
function figEnd(f) { return f.death != null ? f.death : f.reignEnd; }
function figIsReign(f) { return f.birth == null && f.reignStart != null; }
function figLifeText(f) {
  const tail = f.title ? ' · ' + f.title : '';
  if (figIsReign(f)) {
    return '在位 ' + fmtYear(f.reignStart) + (f.reignEnd != null ? '—' + fmtYear(f.reignEnd) : '') + tail;
  }
  return fmtYear(f.birth) + '—' + fmtYear(f.death) + tail;
}
// 人物面板的列表只用生卒/在位年份，标题过长会挤掉地区标签
function figYears(f) {
  if (figIsReign(f)) {
    return '在位 ' + fmtYear(f.reignStart) + (f.reignEnd != null ? '—' + fmtYear(f.reignEnd) : '');
  }
  return fmtYear(f.birth) + '—' + fmtYear(f.death);
}
function figRegion(f) {
  return (W_REGIONS[f.region] || {}).label || f.region || '域外';
}
// 接口的生卒字段可能是数字，也可能是「公元前259年」「701年」这类字符串
function parseYearNum(v) {
  if (typeof v === 'number') return isFinite(v) ? v : null;
  const s = String(v == null ? '' : v).trim();
  if (!s || s === '?' || s === '不详' || s === '-') return null;
  const t = s.replace(/^约|^大约|^约在/, '');
  let neg = false;
  let core = t;
  if (/^公元前|^前/.test(core)) { neg = true; core = core.replace(/^公元前|^前/, ''); }
  else if (/^公元/.test(core)) { core = core.replace(/^公元/, ''); }
  const m = core.match(/^\s*(\d{1,4})\s*年?$/);
  if (!m) return null;
  const n = Number(m[1]);
  if (!isFinite(n)) return null;
  return neg ? -n : n;
}
// 库里以非中土朝代标注的外国人：外国 / 天竺 / 罗马共和国 / 英国17世纪 …
const FOREIGN_DYN_RE = /外国|天竺|世纪|罗马|希腊|波斯|埃及|印度|美国|英国|法国|德国|意大利|西班牙|葡萄牙|荷兰|俄国|苏联|奥斯曼|阿拉伯|高丽|朝鲜|新罗|百济|越南|日本|突厥/;
function dynastyIsForeign(d) {
  const s = String(d == null ? '' : d).trim();
  return !!s && FOREIGN_DYN_RE.test(s);
}
function emptyPerson() {
  return {
    active: false, name: '', lifeText: '', sourceLabel: '', sub: '', desc: '',
    identity: '', area: '', kicker: '', reignText: '', windowLabel: '',
    // 中外来往：只列已核条目；doubt 为存疑，不计入确证
    ixTotal: 0, ixDoubt: 0,
    // 页内全屏层：'' 关闭 / 'ix' 中外来往。打开时才 setData，避免首屏塞大数组
    panel: '', panelInto: '', legendOpen: false, ixPage: null,
    ixOpenKey: '',
    // 合并时间轴：本人 / 同期人物 / 事件 / 往来 四类混排；分段渲染
    timeline: [], tlGroups: [], tlMeta: '',
    tlLives: { rows: [], marks: [], minT: '', maxT: '' },
    tlNote: '', tlPopup: null, tlShown: 0, tlTotal: 0, tlMore: false,
    bookCount: 0, bandCount: 0
  };
}

Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 96,

    loading: true,
    loadError: false,

    // 统计卡
    meta: { chinaCount: 0, worldCount: 0, anchors: 0 },
    dist: [],

    // 地区下拉
    regions: [],
    regionKey: 'all',
    regionLabel: '全部',
    regionCount: 0,
    regionOpen: false,

    // 搜索
    query: '',
    searchFocus: false,

    // 时间轴
    ticks: [],
    barsCn: [],
    barsWd: [],
    barW: 0.4,
    trackLeft: 0,
    trackWidth: 0,
    activeIndex: 0,
    activeLabel: '',
    thumbPct: 0,
    // 拖动实时反馈：dragOn 控制预览卡显隐；pv 只放当前段的极短摘要，拖动中只 setData 这几个小字段
    dragOn: false,
    pv: null,

    // 年表
    bands: [],
    bandCount: 0,
    renderedCount: 0,
    pairOnly: false,
    hint: '',
    goText: '',
    goKind: '',
    goValue: '',

    // 人物检索结果：基本资料 + 「中外来往」入口 + 底部合并时间轴
    person: emptyPerson(),
    pLoading: false,

    // 头部收起：0 全展开 / 1 收起统计卡与筛选行（时间轴压成细条）/ 2 时间轴收成摘要条
    headStage: 0,
    headMainH: 0,

    // scroll-view 程序化滚动
    scrollInto: '',
    scrollAnim: true
  },

  onLoad(query) {
    const statusBar = getApp().globalData.statusBarHeight || 44;
    this.setData({ safeAreaTop: statusBar, navBarHeight: statusBar + 44 + 8 });

    this._scrollTop = 0;
    this._visibleCount = PAGE_SIZE;
    this._lockSpy = 0;
    this._dragging = false;
    this._headAt = 0;      // 头部收起判定的节流时间戳
    this._headLock = 0;    // 定位后短暂锁定，避免刚收起就被回弹/动画滚动还原
    this._q0 = (query && query.q) ? decodeURIComponent(query.q) : '';
    this._fromQuery = !!this._q0;  // 从查询页带着关键词进来，量完头部后自动收一次

    // 先让首帧骨架出来，再同步解析 1MB 数据；避免冷启动白屏
    const that = this;
    setTimeout(function () { that._load(); }, 30);
  },

  onReady() {
    this._measureTrack();
  },

  onUnload() {
    if (this._qTimer) clearTimeout(this._qTimer);
    if (this._mTimer) clearTimeout(this._mTimer);
  },

  /* ═════════ 数据加载 ═════════ */
  _load() {
    let d = null;
    try {
      d = require('../parallel/book-events');
    } catch (e) {
      d = null;
    }
    if (!d || !d.blocks || !d.blocks.length) {
      this.setData({ loading: false, loadError: true });
      return;
    }
    this._blocks = d.blocks;
    const that = this;

    const meta = d.meta || {};
    const byRegion = meta.byRegion || {};
    const regions = REGION_DEFS.map(function (r) {
      return {
        key: r[0],
        label: r[1],
        color: r[2],
        count: r[0] === 'all' ? (meta.worldCount || 0) : (byRegion[r[0]] || 0)
      };
    }).filter(function (r) { return r.key === 'all' || r.count > 0; });

    const distMax = Math.max.apply(null, regions.slice(1).map(function (r) { return r.count; }).concat([1]));
    const dist = regions.slice(1).map(function (r) {
      return { key: r.key, color: r.color, flex: Math.max(0.4, Math.round(r.count / distMax * 100) / 10) };
    });

    // 时间轴刻度：首、尾与四分位所在的段
    const N = this._blocks.length;
    const idxs = [0, Math.round((N - 1) * 0.25), Math.round((N - 1) * 0.5), Math.round((N - 1) * 0.75), N - 1];
    const seen = {};
    const ticks = [];
    idxs.forEach(function (i) {
      if (seen[i]) return;
      seen[i] = 1;
      ticks.push({ pct: (i / (N - 1) * 100).toFixed(2), label: this._blocks[i].yearLabel });
    }, this);

    const bars = this._buildBars();

    this.setData({
      loading: false,
      meta: {
        chinaCount: meta.chinaCount || 0,
        worldCount: meta.worldCount || 0,
        anchors: meta.anchors || N
      },
      regions: regions,
      dist: dist,
      regionCount: meta.worldCount || 0,
      ticks: ticks,
      barsCn: bars.barsCn,
      barsWd: bars.barsWd,
      barW: bars.barW,
      activeLabel: this._blocks[0].yearLabel
    }, function () {
      if (that._q0) {
        const q0 = that._q0;
        that._q0 = '';
        that.setData({ query: q0 }, function () { that._resolveAndBuild(true); });
      } else {
        that._buildView(false);
      }
      // 时间轴要等 loading 撤掉后的这一帧布局完成再量；头部高度同样等统计卡/工具条渲染完再量
      setTimeout(function () {
        that._measureTrack();
        that._measureHead(true);
      }, 150);
      that._tryAutoGuide('parallel', 600);
    });
  },

  /* ═════════ 视图构建 ═════════ */
  _entry(it, kind, bi, ei) {
    const color = kind === 'china' ? '#B5713A' : (REGION_COLOR[it.region] || '#3F6B68');
    const src = it.src || {};
    return {
      k: (kind === 'china' ? 'c' : 'w') + bi + '-' + ei,
      yearText: it.yearKind === 'explicit' ? fmtYear(it.year) : '待考',
      wait: it.yearKind !== 'explicit',
      tag: kind === 'china' ? '中国' : (it.country || it.regionLabel || '域外'),
      dot: color,
      title: it.title || '',
      desc: it.desc || '',
      src: src.page ? ('原书 P' + src.page + ' · 第' + (src.row || 1) + '行') : '',
      open: false
    };
  },

  _hit(it, q) {
    if (!q) return true;
    const hay = [it.title, it.desc, it.country, it.regionLabel].join(' ');
    return hay.indexOf(q) >= 0;
  },

  // 段内年份范围定位：找到「起始年 <= 目标年」的最后一段
  _blockForYear(y) {
    const bs = this._blocks;
    for (let i = bs.length - 1; i >= 0; i--) {
      if (bs[i].year <= y) return i;
    }
    return 0;
  },

  _buildView(locate) {
    const q = String(this.data.query || '').trim();
    const yq = q ? parseYear(q) : null;

    // 人名命中：走三路合并结果（同期域外人物 + 同期域外事件 + 年表同期条目）
    if (q && yq == null && this._person && this._person.q === q) {
      this._buildPersonView(this._person);
      return;
    }
    if (this.data.person.active) this.setData({ person: emptyPerson() });

    const regionKey = this.data.regionKey;
    const pairOnly = this.data.pairOnly && !q;
    const blocks = this._blocks;
    const vms = [];
    const yTarget = yq != null ? this._blockForYear(yq) : -1;
    let total = 0;
    let shownBands = 0;

    for (let i = 0; i < blocks.length; i++) {
      if (yTarget >= 0 && i !== yTarget) continue;
      const b = blocks[i];
      const cn = [];
      const wd = [];

      for (let c = 0; c < b.china.length; c++) {
        const it = b.china[c];
        if (q && yq == null && !this._hit(it, q)) continue;
        cn.push(this._entry(it, 'china', i, c));
      }
      for (let w = 0; w < b.world.length; w++) {
        const it = b.world[w];
        if (regionKey !== 'all' && it.region !== regionKey) continue;
        if (q && yq == null && !this._hit(it, q)) continue;
        wd.push(this._entry(it, 'world', i, w));
      }

      if (q && !cn.length && !wd.length) continue;

      const slim = !q && (pairOnly ? (!cn.length || !wd.length) : (!cn.length && !wd.length));
      if (!slim) {
        shownBands++;
        total += cn.length + wd.length;
      }
      vms.push({
        i: i,
        yearLabel: b.yearLabel,
        neg: b.year < 0,
        china: cn,
        world: wd,
        cn: cn.length,
        wd: wd.length,
        page: (b.pages && b.pages[0]) || '',
        slim: slim,
        slimText: slim ? (pairOnly ? '中外未同段' : ('此段无' + this.data.regionLabel + '条目')) : ''
      });
    }

    let hint;
    if (yq != null) {
      hint = '已定位到 ' + fmtYear(yq) + ' · ' + total + ' 条';
    } else if (q) {
      hint = '命中 ' + vms.length + ' 段 · ' + total + ' 条';
    } else {
      hint = shownBands + ' 段 · ' + total + ' 条';
    }

    let goText = '';
    let goKind = '';
    let goValue = '';
    if (q && yq != null) {
      goText = '看「' + fmtYear(yq) + '」年的中外对照';
      goKind = 'year';
      goValue = String(yq);
    }

    this._commit(vms, {
      hint: hint,
      goText: goText,
      goKind: goKind,
      goValue: goValue,
      person: emptyPerson(),
      locate: locate
    });
  },

  /* 统一提交视图：年表分支与人物分支共用，保证 _vms / 分段偏移 / 预览缓存口径一致 */
  _commit(vms, opt) {
    opt = opt || {};
    this._vms = vms;
    this._posOf = {};
    vms.forEach(function (v, pos) { this._posOf[v.i] = pos; }, this);
    this._buildPreviewCache(vms);

    const count = Math.min(Math.max(PAGE_SIZE, 1), Math.max(vms.length, 1));
    const slice = vms.slice(0, Math.min(count, vms.length));
    this._visibleCount = slice.length;
    const that = this;

    this.setData({
      bands: slice,
      bandCount: vms.length,
      renderedCount: slice.length,
      hint: opt.hint || '',
      goText: opt.goText || '',
      goKind: opt.goKind || '',
      goValue: opt.goValue || '',
      person: opt.person || emptyPerson()
    }, function () {
      that._scheduleMeasure(180);
      if (opt.locate && vms.length) that._locateBlock(vms[0].i);
      if (!vms.length) that._setActive(0);
    });
  },

  /* ═════════ 人物检索：姓名 → 锚点年 → 三路同期 ═════════ */
  // 人物检索入口：先本地（域外人物库 / 年表正文），未命中再问人物库接口补生卒
  _resolveAndBuild(locate) {
    const q = String(this.data.query || '').trim();
    if (!q || parseYear(q) != null) {
      this._person = null;
      this._buildView(locate);
      return;
    }
    this._personCache = this._personCache || {};
    const cached = this._personCache[q];
    if (cached) {
      this._person = cached;
      this._buildView(locate);
      return;
    }
    const local = this._localPerson(q);
    if (local) {
      this._person = local;
      this._buildView(locate);
      // 年表级锚点不如生卒精确：仍去人物库补一次生卒，补到后原地升级
      if (local.source === 'book') this._lookupPersonRemote(q);
      return;
    }
    // 三路本地都没有：先按原有关键词口径渲染（可能是事件/国家），同时去人物库找
    this._person = null;
    this._buildView(locate);
    this._lookupPersonRemote(q);
  },

  _localPerson(q) {
    ensureWorldData();
    // ① 域外人物库：中文名 / 异译 / 英文名
    let f = W_FIGURES.filter(function (x) {
      return x.name === q || (x.alias || []).indexOf(q) >= 0;
    })[0];
    if (!f) {
      const lower = q.toLowerCase();
      f = W_FIGURES.filter(function (x) {
        return (x.name || '').indexOf(q) >= 0 || String(x.en || '').toLowerCase() === lower;
      })[0];
    }
    if (f) {
      const s = figStart(f);
      const e = figEnd(f);
      const anchor = s != null ? s : e;
      if (anchor != null) {
        return {
          q: q, name: f.name, source: 'world', sourceLabel: '域外人物库',
          birth: f.birth, death: f.death,
          reignStart: f.reignStart, reignEnd: f.reignEnd,
          anchorYear: anchor,
          lifeText: figLifeText(f),
          sub: figRegion(f),
          desc: f.desc || ''
        };
      }
    }
    // ② 已核往来条目：生卒 / 身份 / 地域都在 kicker 里，可离线直接立起人物卡；
    //    生卒不详时用首条已核往来的年份当锚点（仍是既有条目，不另推年份）
    const ik = ixKeyOf(q);
    if (ik && IX.PERSONS[ik]) {
      const ip = IX.PERSONS[ik];
      const kk = parseKicker(ip.kicker);
      let a = kk.birth != null ? kk.birth : kk.death;
      if (a == null && ip.ix && ip.ix.length) a = startYearOf(ip.ix[0].yearText);
      if (a != null) {
        const hasLife = kk.birth != null || kk.death != null;
        return {
          q: q, name: ip.name, source: 'ix', sourceLabel: '已核往来',
          birth: kk.birth, death: kk.death,
          anchorYear: a,
          lifeText: hasLife ? String(ip.kicker).split('·')[1].trim() : '生卒不详',
          sub: ip.identity || '',
          desc: ip.meta || ''
        };
      }
    }
    // ③ 年表正文提到该名字：拿首条命中段的年份当锚点
    const hit = this._bookHitPerson(q);
    if (hit) {
      return {
        q: q, name: q, source: 'book', sourceLabel: '年表命中',
        birth: null, death: null, anchorYear: hit.year,
        lifeText: fmtYear(hit.year) + ' 前后',
        sub: '《中外历史对比年表》中出现',
        desc: hit.title || ''
      };
    }
    return null;
  },

  _bookHitPerson(q) {
    const bs = this._blocks || [];
    for (let i = 0; i < bs.length; i++) {
      const arr = (bs[i].china || []).concat(bs[i].world || []);
      for (let k = 0; k < arr.length; k++) {
        const it = arr[k];
        if (it.yearKind !== 'explicit') continue;
        if ([it.title, it.desc].join(' ').indexOf(q) >= 0) {
          return { year: bs[i].year, title: it.title || '' };
        }
      }
    }
    return null;
  },

  // 人物库兜底：按名取 id → 取生卒。网络失败或查无此人只记 null，不打扰用户。
  _lookupPersonRemote(q) {
    if (this._remoteQ === q) return;
    this._remoteQ = q;
    const that = this;
    this._personCache = this._personCache || {};
    if (this._personCache[q] === null) return;
    this.setData({ pLoading: true });
    request({
      timeout: 6000,
      url: API.FIGURES.AUTOCOMPLETE + '?prefix=' + encodeURIComponent(q) + '&limit=8',
      success: function (res) {
        const d = res.data || {};
        const list = (d.success && Array.isArray(d.data)) ? d.data : [];
        const hit = list.filter(function (x) { return x.name === q; })[0] || list[0];
        if (!hit || !hit.id) { that._personCache[q] = null; that._remoteDone(q); return; }
        request({
          timeout: 8000,
          url: API.FIGURES.GET(hit.id),
          success: function (r2) {
            const body = r2.data || {};
            const f = (body.success && body.data) ? body.data : null;
            if (!f) { that._personCache[q] = null; that._remoteDone(q); return; }
            const birth = parseYearNum(f.birthYear);
            const death = parseYearNum(f.deathYear);
            const anchor = birth != null ? birth : death;
            if (anchor == null) { that._personCache[q] = null; that._remoteDone(q); return; }
            const foreign = dynastyIsForeign(f.dynasty);
            that._personCache[q] = {
              q: q,
              name: f.name || q,
              source: foreign ? 'world' : 'figure',
              sourceLabel: foreign ? '域外人物' : '人物库',
              birth: birth,
              death: death,
              anchorYear: anchor,
              lifeText: (birth != null ? fmtYear(birth) : '生年不详') +
                (death != null ? '—' + fmtYear(death) : ''),
              sub: [f.dynasty || '', death != null ? '卒于 ' + fmtYear(death) : ''].filter(Boolean).join(' · '),
              desc: f.bio || f.fullBio || f.intro || ''
            };
            that._remoteDone(q);
          },
          fail: function () { that._personCache[q] = null; that._remoteDone(q); }
        });
      },
      fail: function () { that._personCache[q] = null; that._remoteDone(q); }
    });
  },

  _remoteDone(q) {
    this.setData({ pLoading: false });
    if (String(this.data.query || '').trim() !== q) return;
    const p = this._personCache && this._personCache[q];
    if (!p) return;
    if (this._person && this._person.q === q && this._person.source !== 'book') return;
    this._person = p;
    this._buildView(false);
  },

  /* 人物视图：基本资料 → 「中外来往」入口 → 底部合并时间轴。
   * 往来条目来自 interactions-data（13 条确证 + 1 条存疑），同期底座仍是
   * world-figures / world-events / book-events 三路，全部在本页展开，不再跳转独立页。 */
  _buildPersonView(p) {
    ensureWorldData();
    const ip = IX.PERSONS[ixKeyOf(p.name)] || null;
    const kk = parseKicker(ip ? ip.kicker : '');

    // 生卒优先用人物库/域外库，缺失的一端用已核条目的 kicker 补（两处都是既有标注）
    const birth = p.birth != null ? p.birth : kk.birth;
    const death = p.death != null ? p.death : kk.death;
    const reignStart = kk.reignStart;
    const reignEnd = kk.reignEnd;
    const anchor = p.anchorYear != null ? p.anchorYear : (birth != null ? birth : (death != null ? death : 0));
    const lo = (birth != null && death != null) ? birth - 2 : anchor - 25;
    const hi = (birth != null && death != null) ? death + 2 : anchor + 25;
    const regionKey = this.data.regionKey;

    // ── 同期素材：域外人物 + 域外事件 + 中国年表条目（全部并入时间轴） ──
    const whoRaw = [];
    W_FIGURES.forEach(function (f) {
      if (regionKey !== 'all' && f.region !== regionKey) return;
      const s = figStart(f);
      const e = figEnd(f);
      if (s == null || e == null || s > hi || e < lo) return;
      whoRaw.push({
        at: (s + e) / 2, y: s, side: 'wd', type: '人物',
        title: f.name, sub: figYears(f) + ' · ' + figRegion(f),
        life: figYears(f), region: figRegion(f),
        age: (f.birth != null && anchor >= f.birth) ? anchor - f.birth : null,
        desc: f.desc || '',
        meta: [f.en || '', f.title || ''].filter(Boolean).join(' · '),
        // 时间轴同期人物节点只用真实生卒；缺一端就不进轴（不编年）
        birth: f.birth != null ? f.birth : null,
        death: f.death != null ? f.death : null,
        en: f.en || '',
        role: f.title || ''
      });
    });
    W_EVENTS.forEach(function (e) {
      if (regionKey !== 'all' && e.region !== regionKey) return;
      if (e.year < lo || e.year > hi) return;
      whoRaw.push({
        at: e.year, y: e.year, side: 'wd', type: '事件',
        title: e.title, sub: (W_REGIONS[e.region] || {}).label || '域外',
        life: fmtYear(e.year), region: (W_REGIONS[e.region] || {}).label || '域外',
        desc: e.desc || '',
        meta: (W_REGIONS[e.region] || {}).label || '',
        srcText: '域外事件库'
      });
    });

    // 中国一侧的年表条目并入同一条时间轴，不再分上下两份列表
    const blocks = this._blocks;
    const vms = [];
    let bookCount = 0;
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      const inWin = b.year >= lo && b.year <= hi;
      const cn = [];
      const wd = [];
      for (let c = 0; c < b.china.length; c++) {
        const it = b.china[c];
        if (inWin) cn.push(this._entry(it, 'china', i, c));
        if (!it.title) continue;
        // 进轴按条目自身的年份判断：段头年份在窗口内、条目年份越界的不能混进来
        const y = it.year != null ? it.year : b.year;
        if (y < lo || y > hi) continue;
        whoRaw.push({
          at: y,
          y: y,
          side: 'cn', type: '事件',
          title: it.title, sub: '中国 · 年表',
          life: fmtYear(y), region: '中国 · 年表',
          desc: it.desc || '',
          meta: it.src && it.src.page ? ('原书 P' + it.src.page) : '中国 · 年表',
          srcText: it.src && it.src.page
            ? ('原书 P' + it.src.page + ' · 第' + (it.src.row || 1) + '行')
            : '中国 · 年表'
        });
      }
      if (!inWin) continue;
      for (let w = 0; w < b.world.length; w++) {
        if (regionKey !== 'all' && b.world[w].region !== regionKey) continue;
        wd.push(this._entry(b.world[w], 'world', i, w));
      }
      if (!cn.length && !wd.length) continue;
      if (this.data.pairOnly && (!cn.length || !wd.length)) continue;
      bookCount += cn.length + wd.length;
      vms.push({
        i: i,
        yearLabel: b.yearLabel,
        neg: b.year < 0,
        china: cn,
        world: wd,
        cn: cn.length,
        wd: wd.length,
        page: (b.pages && b.pages[0]) || '',
        slim: false,
        slimText: ''
      });
    }

    // 同期池原始顺序不重要：时间轴会按年份重排，同世对照按离锚点距离取最近 7 位

    // ── 中外来往：只做展示，不增改任何年份 / 引文 / 来源 / 等级 ──
    const ixRows = ip ? ip.ix.map(function (it) {
      return {
        k: it.k,
        yearText: it.yearText,
        label: it.relationTypeLabel,
        foreignName: it.foreignName,
        sub: it.typeText || it.place,
        doubt: it.confidence === '存疑'
      };
    }) : [];
    // 全屏层用的完整往来条目（含原文 / 来源 / 等级），数据原样取自 interactions-data
    const ixWhy = ip ? { why: ip.doubtWhy || '', points: ip.doubtPoints || [] } : { why: '', points: [] };
    this._ixFull = ip ? ip.ix.map(function (it) {
      const doubt = it.confidence === '存疑';
      const tm = ixTypeMeta(it.relationType);
      const ev0 = (it.evidence && it.evidence[0]) || {};
      return {
        k: it.k,
        yearText: it.yearText,
        label: it.typeText || it.relationTypeLabel,
        type: it.relationType,
        color: tm.color,
        soft: tm.soft,
        foreignName: it.foreignName,
        foreignRole: it.foreignRole || '',
        foreignPolity: it.foreignPolity || '',
        howMet: it.howMet || '',
        timeText: it.timeText || '',
        place: it.place || '',
        process: it.process || '',
        resultImpact: it.resultImpact || '',
        confidence: it.confidence,
        doubt: doubt,
        cross: it.cross || '',
        quoteShort: ev0.quoteShort || '',
        quote: ev0.quote || '',
        quoteSrc: ev0.title || '',
        grade: ev0.grade || '',
        gradeWhy: ev0.gradeWhy || '',
        sources: ev0.sources || [],
        note: it.note || '',
        doubtWhy: doubt ? ixWhy.why : '',
        doubtPoints: doubt ? ixWhy.points : []
      };
    }) : [];
    // 中外来往层的人物卡与统计：优先用数据里已算好的 stats；存疑人物按设计页显示 1/1/1
    const ixMainFull = this._ixFull.filter(function (it) { return !it.doubt; });
    const ixDoubtFull = this._ixFull.filter(function (it) { return it.doubt; });
    const doubtOnly = !ixMainFull.length && ixDoubtFull.length > 0;
    const pstats = (ip && ip.stats) || { ix: 0, polity: 0, type: 0, chips: [] };
    const chips = doubtOnly
      ? ixDoubtFull.map(function (it) {
        return { label: it.label, n: 1, color: it.color, soft: it.soft };
      })
      : (pstats.chips || []).map(function (c) {
        const tm = ixTypeMeta(c.type);
        return { label: c.label, n: c.n, color: tm.color, soft: tm.soft };
      });
    this._ixPage = {
      kicker: ip ? ip.kicker : (p.lifeText || ''),
      name: p.name,
      identity: ip ? ip.identity : (/卒于|生于|生卒/.test(p.sub || '') ? '' : (p.sub || '')),
      area: ip ? ip.area : '',
      meta: ip ? ip.meta : (p.desc || ''),
      badge: doubtOnly ? '存疑 · 不计入确证' : (ixMainFull.length ? '确证往来 ' + ixMainFull.length + ' 条' : '暂无确证往来'),
      badgeDoubt: doubtOnly,
      types: chips,
      stats: doubtOnly
        ? [{ n: ixDoubtFull.length, l: '存疑条目' }, { n: 1, l: '涉及政权' }, { n: 1, l: '说法类型' }]
        : [{ n: ixMainFull.length, l: '确证往来' }, { n: pstats.polity || 0, l: '涉及政权' }, { n: pstats.type || 0, l: '往来类型' }],
      main: ixMainFull,
      doubt: ixDoubtFull,
      doubtOnly: doubtOnly,
      doubtWhy: ip ? (ip.doubtWhy || '') : '',
      doubtPoints: ip ? (ip.doubtPoints || []) : []
    };
    const ixDoubt = ixRows.filter(function (it) { return it.doubt; }).length;

    // 生卒缺失而 kicker 有时，直接用 kicker 的生卒段，避免头尾年份互相打架
    const lifeText = (p.birth != null || p.death != null)
      ? p.lifeText
      : (ip && (kk.birth != null || kk.death != null) ? String(ip.kicker).split('·')[1].trim() : p.lifeText);
    // 非已核人物没有身份字段：人物库的 sub 若是「唐 · 卒于 761」这类生卒描述，就不当身份展示
    const identity = ip ? ip.identity : (/卒于|生于|生卒/.test(p.sub || '') ? '' : (p.sub || ''));

    /* ── 合并时间轴：本人 + 往来 + 同期人物生卒 + 同期事件，按年升序、左右交错 ──
     * 四类标记：本人 life / 同期人物 sync / 事件 event / 往来 ix。
     * 节点详情放 this._tlMap（不进 data），点节点时才把一份详情 setData 进浮层，
     * 避免首次渲染就背着几十份简介文本。 */
    const tl = [];
    const tlMap = {};
    const ownArea = ip ? (ip.area || '') : '';
    const ownSrc = p.sourceLabel || '人物库';
    // 卡片右上角只放短地名：长路线（「长安 ⇄ 西域（大宛…）」）截到括号前
    const ownMeta = String(ownArea).split(/[（(]/)[0].trim();
    function cutText(s, n) {
      const t = String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
      return t.length > n ? t.slice(0, n) + '…' : t;
    }
    function ownItem(label, y, extraRows) {
      // 身份字段可能只有一个分隔符（如「/」），不当摘要用；退回生卒
      const idBrief = /[\u4e00-\u9fa5A-Za-z0-9]/.test(identity || '') ? identity : '';
      const ownBrief = label === '即位'
        ? (reignEnd != null ? '在位 ' + fmtYear(reignStart) + '—' + fmtYear(reignEnd) : '在位')
        : (idBrief || lifeText || '');
      return {
        y: y, kind: 'life', tag: '本人', title: label, brief: ownBrief, meta: ownMeta,
        detail: {
          kind: 'life', tag: '本人',
          title: p.name + ' · ' + label,
          rows: [
            { k: '年份', v: fmtYear(y) },
            { k: '身份', v: identity || '—' },
            { k: '生卒', v: lifeText || '—' }
          ].concat(extraRows || []).concat(ownArea ? [{ k: '地域', v: ownArea }] : []),
          desc: p.desc || '',
          src: '出处：' + ownSrc
        }
      };
    }
    if (birth != null) tl.push(ownItem('出生', birth));
    if (reignStart != null) {
      tl.push(ownItem('即位', reignStart,
        reignEnd != null ? [{ k: '在位', v: fmtYear(reignStart) + '—' + fmtYear(reignEnd) }] : []));
    }
    if (death != null) tl.push(ownItem('卒', death));

    // 往来：年份 / 对方 / 时间地点 / 来源等级，全部取自 interactions-data 原字段
    const ixFullMap = {};
    this._ixFull.forEach(function (it) { ixFullMap[it.k] = it; });
    ixRows.forEach(function (it) {
      const y = startYearOf(it.yearText);
      if (y == null) return;
      const full = ixFullMap[it.k] || {};
      tl.push({
        y: y, kind: 'ix', tag: '往来',
        title: it.foreignName,
        brief: it.label + (full.place ? ' · ' + full.place : ''),
        meta: full.foreignPolity || '域外',
        detail: {
          kind: 'ix', tag: it.doubt ? '往来（存疑）' : '往来',
          title: it.foreignName,
          rows: [
            { k: '年份', v: it.yearText },
            { k: '类型', v: it.label },
            { k: '对方', v: (full.foreignName || it.foreignName) + (full.foreignRole ? ' · ' + full.foreignRole : '') },
            { k: '政权', v: full.foreignPolity || '—' },
            { k: '时间地点', v: [full.timeText || it.yearText, full.place || ''].filter(Boolean).join(' · ') },
            { k: '来源等级', v: (full.grade ? full.grade + ' 级' : '—') + (it.doubt ? ' · 存疑不计入确证' : '') }
          ],
          desc: [full.howMet, full.process, full.resultImpact].filter(Boolean).join('；'),
          src: '出处：' + (full.quoteSrc || '中外往来条目')
        }
      });
    });

    // 同期池：生卒明确的人物（缺一端直接跳过，不编年）+ 事件（域外事件 / 中国年表原书条目）
    // 人物的生 / 卒只有落在同期窗口内才作为节点，避免把「早生 70 年」的生日拉到轴首
    const selfFlat = String(p.name || '').replace(/[·•.\s]/g, '');
    const syncAll = whoRaw.filter(function (it) {
      if (it.type !== '人物') return true;
      if (it.birth == null || it.death == null) return false;
      const inBirth = it.birth >= lo && it.birth <= hi;
      const inDeath = it.death >= lo && it.death <= hi;
      if (!inBirth && !inDeath) return false;
      // 域外人物库里可能也有本人（如马可·波罗），排除掉，避免生卒重复进轴
      return String(it.title || '').replace(/[·•.\s]/g, '') !== selfFlat;
    }).sort(function (a, b2) {
      const da = Math.abs(a.at - anchor);
      const db = Math.abs(b2.at - anchor);
      if (da !== db) return da - db;
      return a.y - b2.y;
    });
    // 全量进轴：事件不再截断，人物也不再按配额取 12 条；
    // 数量控制交给分段渲染（首段 TL_PAGE_NODES 个节点，滚到轴尾续段）。
    syncAll.forEach(function (it) {
      if (it.type === '人物') {
        const region = it.region || '域外';
        const figNode = function (label, y) {
          tl.push({
            y: y, kind: 'sync', tag: '同期人物', title: it.title,
            brief: label + (it.role ? ' · ' + it.role : ''),
            meta: region,
            detail: {
              kind: 'sync', tag: '同期人物',
              title: it.title,
              rows: [
                { k: '年份', v: fmtYear(y) + ' · ' + label },
                { k: '身份', v: it.role || '—' },
                { k: '生卒', v: it.life || '—' },
                { k: '地区', v: region }
              ],
              desc: it.desc || '',
              src: '出处：域外人物库' + (it.en ? ' · ' + it.en : '')
            }
          });
        };
        if (it.birth >= lo && it.birth <= hi) figNode('出生', it.birth);
        if (it.death >= lo && it.death <= hi) figNode('去世', it.death);
        return;
      }
      const isCn = it.side === 'cn';
      tl.push({
        y: it.y, kind: 'event', tag: '事件', title: it.title,
        brief: cutText(it.desc, 34),
        meta: isCn ? '中国 · 年表' : (it.region || '域外'),
        detail: {
          kind: 'event', tag: '事件',
          title: it.title,
          rows: [
            { k: '年份', v: fmtYear(it.y) },
            { k: '类型', v: isCn ? '中国年表条目' : '域外同期事件' },
            { k: '地区', v: it.region || (isCn ? '中国' : '域外') }
          ],
          desc: it.desc || '',
          src: '出处：' + (it.srcText || (isCn ? '中国 · 年表' : '域外事件库'))
        }
      });
    });

    // 排序 + 同年合并成组：同年只出一个年份胶囊，胶囊上标条数
    tl.sort(function (a, b2) {
      if (a.y !== b2.y) return a.y - b2.y;
      const rank = { life: 0, ix: 1, sync: 2, event: 3 };
      return rank[a.kind] - rank[b2.kind];
    });
    const timeline = [];
    const tlGroups = [];
    let gCur = null;
    tl.forEach(function (it, i) {
      const k = 't' + i;
      tlMap[k] = it.detail || null;
      const node = {
        k: k, y: it.y, kind: it.kind, tag: it.tag,
        title: it.title, brief: it.brief || '', meta: it.meta || '',
        side: i % 2 ? 'right' : 'left'
      };
      if (!gCur || gCur.y !== it.y) {
        gCur = { key: 'g' + it.y, y: it.y, yearText: fmtYear(it.y), nodes: [], count: 0, here: false };
        tlGroups.push(gCur);
      }
      gCur.nodes.push(node);
      timeline.push({
        k: k, year: fmtYear(it.y), kind: it.kind, tag: it.tag,
        title: it.title, sub: it.brief || '', side: node.side
      });
    });
    tlGroups.forEach(function (g) { g.count = g.nodes.length; });

    // 本人卒年所在组标「你在这里」
    if (death != null) {
      tlGroups.forEach(function (g) {
        if (g.y !== death) return;
        g.here = true;
      });
    }

    // 十年刻度 + 按年份比例的行距 + 按年代密度微调的分段底色带
    function decadeLabel(d) {
      const y = d * 10;
      return y < 0 ? ('前' + (-y) + '年代') : (y + '年代');
    }
    const decCount = {};
    tlGroups.forEach(function (g) {
      const d = Math.floor(g.y / 10);
      decCount[d] = (decCount[d] || 0) + g.nodes.length;
    });
    let lastDec = null;
    let prevY = null;
    tlGroups.forEach(function (g, i) {
      const d = Math.floor(g.y / 10);
      if (d !== lastDec) { g.seg = decadeLabel(d); lastDec = d; }
      if (prevY == null) {
        g.mt = 6;
      } else {
        const gap = Math.max(1, g.y - prevY);
        g.mt = Math.min(120, 18 + gap * 8);
      }
      const n = decCount[d];
      const alpha = n >= 5 ? '0.085' : (n >= 3 ? '0.06' : '0.04');
      const base = (Math.abs(d) % 2 === 0) ? '181,113,58' : '63,107,104';
      g.bg = 'rgba(' + base + ',' + alpha + ')';
      const kinds = g.nodes.map(function (nd) { return nd.kind; });
      g.strong = kinds.indexOf('life') >= 0 ? 'life'
        : (kinds.indexOf('ix') >= 0 ? 'ix' : (kinds.indexOf('sync') >= 0 ? 'sync' : 'event'));
      prevY = g.y;
    });

    // 轴头口径：跨度 / 节点构成 / 最密年代 / 最长空档
    const firstY = tlGroups.length ? tlGroups[0].y : 0;
    const lastY = tlGroups.length ? tlGroups[tlGroups.length - 1].y : 0;
    let maxGap = 0;
    for (let gi = 1; gi < tlGroups.length; gi++) {
      maxGap = Math.max(maxGap, tlGroups[gi].y - tlGroups[gi - 1].y);
    }
    let densest = null;
    Object.keys(decCount).forEach(function (d) {
      if (densest == null || decCount[d] > decCount[densest]) densest = d;
    });
    const kindCount = { life: 0, sync: 0, event: 0, ix: 0 };
    timeline.forEach(function (n) { kindCount[n.kind] = (kindCount[n.kind] || 0) + 1; });
    const tlMeta = timeline.length
      ? (fmtYear(firstY) + '—' + fmtYear(lastY) + ' · ' + Math.max(0, lastY - firstY) + ' 年 · ' +
        timeline.length + ' 节点（本人 ' + kindCount.life + ' / 同期人物 ' + kindCount.sync +
        ' / 事件 ' + kindCount.event + ' / 往来 ' + kindCount.ix + '）' +
        (densest != null ? ' · 最密 ' + decadeLabel(Number(densest)) + '（' + decCount[densest] + ' 节点）' : '') +
        (maxGap > 0 ? ' · 最长空档 ' + maxGap + ' 年' : ''))
      : '';

    // 同世对照：本人 + 最近的 7 位同期人物（同期人物可能上百，整块只做抽样对照）
    const syncPersons = syncAll.filter(function (it) { return it.type === '人物'; });
    const pickedFigs = syncPersons.slice(0, 7);
    const lives = [];
    if (birth != null && death != null) {
      lives.push({ name: p.name, own: true, s: birth, e: death, sT: fmtYear(birth), eT: fmtYear(death) });
    }
    pickedFigs.forEach(function (f) {
      lives.push({ name: f.title, own: false, s: f.birth, e: f.death, sT: fmtYear(f.birth), eT: fmtYear(f.death) });
    });
    lives.sort(function (a, b2) { return a.own === b2.own ? a.s - b2.s : (a.own ? -1 : 1); });
    let tlLives = { rows: [], marks: [], minT: '', maxT: '' };
    if (lives.length > 1) {
      const minY2 = Math.min.apply(null, lives.map(function (l) { return l.s; }));
      const maxY2 = Math.max.apply(null, lives.map(function (l) { return l.e; }));
      const sp = Math.max(1, maxY2 - minY2);
      lives.forEach(function (l) {
        l.left = Math.round((l.s - minY2) / sp * 1000) / 10;
        l.w = Math.max(1.2, Math.round((l.e - l.s) / sp * 1000) / 10);
      });
      const marks = [];
      if (birth != null) marks.push({ k: 'b', p: Math.round((birth - minY2) / sp * 1000) / 10 });
      if (death != null) marks.push({ k: 'd', p: Math.round((death - minY2) / sp * 1000) / 10 });
      tlLives = { rows: lives, marks: marks, minT: fmtYear(minY2), maxT: fmtYear(maxY2) };
    }

    this._tlMap = tlMap;

    // 分段：按节点数切组，同年组整组进出，避免 100+ 节点一次 setData。
    // 首段先给 TL_PAGE_NODES 个节点，其余滚到轴尾再由 _appendTlPage 续。
    function takeGroups(from, limit) {
      const out = [];
      let n = 0;
      for (let gi = from; gi < tlGroups.length; gi++) {
        if (out.length && n >= limit) break;
        out.push(tlGroups[gi]);
        n += tlGroups[gi].nodes.length;
      }
      return { groups: out, n: n };
    }
    const firstPage = takeGroups(0, TL_PAGE_NODES);
    this._tlAllGroups = tlGroups;
    const tlShown = firstPage.n;
    const tlTotal = timeline.length;
    const tlMore = tlShown < tlTotal;
    const tlNote = '';

    this._commit(vms, {
      hint: '同期 ' + fmtYear(lo) + '—' + fmtYear(hi) +
        (regionKey === 'all' ? '' : ' · ' + this.data.regionLabel),
      // 人物结果全部在本页看完：不再给「进入原有结果页」的跳转
      goText: '', goKind: '', goValue: '',
      person: {
        active: true,
        name: p.name,
        lifeText: lifeText,
        sourceLabel: p.sourceLabel,
        sub: p.sub,
        desc: p.desc,
        identity: identity,
        area: ip ? ip.area : '',
        kicker: ip ? ip.kicker : '',
        reignText: reignStart != null
          ? ('在位 ' + fmtYear(reignStart) + (reignEnd != null ? '—' + fmtYear(reignEnd) : ''))
          : '',
        windowLabel: fmtYear(lo) + ' — ' + fmtYear(hi),
        ixTotal: ixRows.length,
        ixDoubt: ixDoubt,
        panel: '', panelInto: '', legendOpen: false, ixPage: null,
        ixOpenKey: '',
        timeline: timeline,
        tlGroups: firstPage.groups,
        tlMeta: tlMeta,
        tlLives: tlLives,
        tlNote: tlNote,
        tlShown: tlShown,
        tlTotal: tlTotal,
        tlMore: tlMore,
        tlPopup: null,
        bookCount: bookCount,
        bandCount: vms.length
      },
      // 人物面板在年表之上：不要自动滚到首个年代段
      locate: false
    });
  },

  /* ── 人物页内全屏层 ──
   * 只剩「中外来往」一个入口。全屏层不触碰底层列表，关闭后滚动位置原样保留。 */
  onOpenPanel(e) {
    const type = e.currentTarget.dataset.type;
    if (type !== 'ix') return;
    this.setData({
      'person.panel': 'ix',
      'person.ixPage': this._ixPage || null,
      'person.legendOpen': false,
      'person.panelInto': '',
      'person.ixOpenKey': ''
    });
  },

  onClosePanel() {
    if (!this.data.person.panel) return;
    this.setData({
      'person.panel': '',
      'person.panelInto': '',
      'person.ixOpenKey': ''
    });
  },

  // 图例：默认收起，点开展开判定口径（设计页 details 的等价手法）
  onToggleLegend() {
    this.setData({ 'person.legendOpen': !this.data.person.legendOpen });
  },

  // 按钮行跳转到层内小节（scroll-view 的 scroll-into-view，替代 sticky 目录的手感）
  onJumpPanel(e) {
    const id = e.currentTarget.dataset.target;
    if (!id) return;
    this.setData({ 'person.panelInto': '' });
    const that = this;
    setTimeout(function () { that.setData({ 'person.panelInto': id }); }, 30);
  },

  // 往来条目：展开 / 收起原文与来源等级
  onToggleIxItem(e) {
    const k = e.currentTarget.dataset.k;
    if (!k) return;
    this.setData({ 'person.ixOpenKey': this.data.person.ixOpenKey === k ? '' : k });
  },

  /* ── 时间轴续段：滚到轴尾或点轴尾提示时追加一段 ──
   * 只拼已渲染的组 + 新组，走 person.tlGroups 一条路径，
   * 不重算同世对照与轴头统计，避免每次续段都整页 diff。 */
  _appendTlPage() {
    if (!this.data.person.active || this._tlBusy) return;
    const all = this._tlAllGroups || [];
    const cur = this.data.person.tlGroups || [];
    const total = this.data.person.tlTotal || 0;
    let shown = 0;
    cur.forEach(function (g) { shown += g.nodes.length; });
    if (shown >= total || cur.length >= all.length) return;
    const next = [];
    let n = shown;
    for (let i = cur.length; i < all.length; i++) {
      if (next.length && n >= shown + TL_PAGE_NODES) break;
      next.push(all[i]);
      n += all[i].nodes.length;
    }
    if (!next.length) return;
    this._tlBusy = true;
    const that = this;
    this.setData({
      'person.tlGroups': cur.concat(next),
      'person.tlShown': n,
      'person.tlMore': n < total
    }, function () {
      // setData 落地即放开；再触底要等用户继续滚动，不会自激
      that._tlBusy = false;
    });
  },

  onTlMore() { this._appendTlPage(); },

  /* ── 合并时间轴节点详情浮层 ──
   * 节点 k 为时间轴序号（t0 / t1…），详情存 this._tlMap，点开才 setData 一份；
   * 浮层是 fixed 底部抽屉，不触碰底层 scroll-view，关闭后时间轴停位不变。 */
  onOpenTlNode(e) {
    const k = e.currentTarget.dataset.k;
    const d = k && this._tlMap ? this._tlMap[k] : null;
    if (!d) return;
    this.setData({ 'person.tlPopup': d });
  },

  onCloseTlPopup() {
    if (this.data.person.tlPopup) this.setData({ 'person.tlPopup': null });
  },

  // 浮层内吞掉点击与滑动，避免穿透到底层列表
  noop() {},
  onTlPopHold() {},

  _setActive(i, force) {
    if (i == null || i < 0 || !this._blocks || !this._blocks[i]) return;
    if (!force && i === this.data.activeIndex && this.data.activeLabel) return;
    const pct = this._blocks.length > 1 ? (i / (this._blocks.length - 1) * 100) : 0;
    this.setData({
      activeIndex: i,
      activeLabel: this._blocks[i].yearLabel,
      thumbPct: pct
    });
  },

  /* ═════════ 地区 / 搜索 / 开关 ═════════ */
  onToggleRegion() {
    this.setData({ regionOpen: !this.data.regionOpen });
  },

  onCloseRegion() {
    if (this.data.regionOpen) this.setData({ regionOpen: false });
  },

  onPickRegion(e) {
    const key = e.currentTarget.dataset.key;
    if (!key) return;
    const r = this.data.regions.filter(function (x) { return x.key === key; })[0];
    if (!r) return;
    const that = this;
    this.setData({
      regionKey: key,
      regionLabel: r.label,
      regionCount: r.count,
      regionOpen: false
    }, function () {
      that._buildView(false);
    });
  },

  onSearchInput(e) {
    const v = e.detail.value || '';
    if (this._qTimer) clearTimeout(this._qTimer);
    const that = this;
    this._qTimer = setTimeout(function () {
      const p = { query: v };
      // 确认过一次后 searchFocus 会被置 false；继续输入要重新标记，避免定位时把头部收掉打断输入
      if (!that.data.searchFocus) p.searchFocus = true;
      that.setData(p, function () { that._resolveAndBuild(true); });
    }, 160);
  },

  onSearchConfirm(e) {
    if (this._qTimer) clearTimeout(this._qTimer);
    const v = (e.detail && e.detail.value) || this.data.query;
    const that = this;
    // 确认即视为搜完：收键盘并解除「输入中保持展开」，随后的定位会把头部自动收一次
    if (wx.hideKeyboard) wx.hideKeyboard();
    this.setData({ query: v, searchFocus: false }, function () { that._resolveAndBuild(true); });
  },

  onSearchFocus() {
    const p = { searchFocus: true };
    // 聚焦输入时强制展开，输入过程中绝不收起
    if (this.data.headStage) {
      p.headStage = 0;
      this._headLock = Date.now() + 600;
    }
    this.setData(p);
  },

  onSearchBlur() { this.setData({ searchFocus: false }); },

  onClearSearch() {
    if (this._qTimer) clearTimeout(this._qTimer);
    this._person = null;
    const that = this;
    this.setData({ query: '' }, function () {
      that._buildView(false);
      that._lockSpy = Date.now() + 600;
      // 清空后列表回到第一段，否则 scroll-view 可能停在新列表的底部
      setTimeout(function () {
        that.setData({ scrollAnim: false, scrollInto: 'b0' });
        that._setActive(0);
      }, 60);
    });
  },

  onShowAll() {
    if (!this.data.pairOnly) return;
    const that = this;
    this.setData({ pairOnly: false }, function () {
      that._buildView(false);
    });
  },

  onTogglePair() {
    const that = this;
    this.setData({ pairOnly: !this.data.pairOnly }, function () {
      that._buildView(false);
    });
  },

  onGoResult() {
    if (this.data.goKind === 'year') {
      navTo('/parallel-pkg/pages/parallel/parallel?year=' + encodeURIComponent(this.data.goValue));
    } else if (this.data.goKind === 'person') {
      navTo('/parallel-pkg/pages/parallel/parallel?person=' + encodeURIComponent(this.data.goValue));
    }
  },

  /* ═════════ 年表交互 ═════════ */
  onToggleEntry(e) {
    const ds = e.currentTarget.dataset;
    const bi = ds.bi;
    const col = ds.col;
    const ei = ds.ei;
    const band = this.data.bands[bi];
    if (!band || !band[col] || !band[col][ei]) return;
    const obj = {};
    obj['bands[' + bi + '].' + col + '[' + ei + '].open'] = !band[col][ei].open;
    const that = this;
    this.setData(obj, function () { that._scheduleMeasure(160); });
  },

  onBodyScroll(e) {
    this._scrollTop = e.detail.scrollTop;
    if (this._dragging) return;
    this._applyScrollHead(this._scrollTop);
    const now = Date.now();
    if (now < this._lockSpy) return;
    if (now - (this._spyAt || 0) < 90) return;
    this._spyAt = now;
    const keys = this._offKeys;
    if (!keys || !keys.length) return;
    const top = this._scrollTop + 12;
    let idx = keys[0];
    for (let k = 0; k < keys.length; k++) {
      if (this._offVals[k] <= top) idx = keys[k];
      else break;
    }
    this._setActive(idx);
  },

  onReachLower() {
    if (this._dragging) return;
    // 人物页：时间轴是最后一块，触底优先续轴
    if (this.data.person.active) { this._appendTlPage(); return; }
    if (this._appending) return;
    if (!this._vms || this._visibleCount >= this._vms.length) return;
    this._appending = true;
    this._visibleCount = Math.min(this._vms.length, this._visibleCount + NEXT_SIZE);
    const that = this;
    this.setData({
      bands: this._vms.slice(0, this._visibleCount),
      renderedCount: this._visibleCount
    }, function () {
      that._scheduleMeasure(120);
      setTimeout(function () { that._appending = false; }, 300);
    });
  },

  /* ═════════ 头部随滚动收起（三态） ═════════
   * 阈值带迟滞，避免在临界点来回抖：
   *   下滚：scrollTop ≥ 56px → stage1（收统计卡 + 地区/搜索行，时间轴压成细条）
   *         scrollTop ≥ 200px → stage2（时间轴收成 44px 摘要条）
   *   上滚：scrollTop < 150px → stage1；< 26px → stage0；≤ 10px 直接回 stage0
   * 只 setData 一个 headStage，高度交给 CSS 过渡；bands 与 337 根密度柱都不重渲染。
   * 互斥：拖时间轴中（_dragging）、搜索框聚焦（searchFocus）、刚定位（_headLock）时不自动收。
   */
  _applyScrollHead(top) {
    const now = Date.now();
    if (now - (this._headAt || 0) < 90) return;  // 滚动监听节流，避免高频 setData
    this._headAt = now;
    if (this._dragging || this.data.searchFocus) return;
    if (now < this._headLock) return;
    const s = this.data.headStage;
    let t = s;
    if (top <= 10) t = 0;
    else if (s === 0 && top >= 56) t = 1;
    else if (s === 1 && top >= 200) t = 2;
    else if (s === 2 && top < 150) t = 1;
    else if (s === 1 && top < 26) t = 0;
    if (t !== s) this._setHeadStage(t);
  },

  _setHeadStage(s, lockMs) {
    if (s === this.data.headStage) return;
    const p = { headStage: s };
    // 收起后头部会被 overflow 裁掉，下拉面板先关掉
    if (s > 0 && this.data.regionOpen) p.regionOpen = false;
    // 自动收/展不锁（迟滞阈值已经能防抖），只有点摘要条展开这种一次性动作才短暂锁住
    if (lockMs) this._headLock = Date.now() + lockMs;
    this.setData(p);
  },

  // 摘要条点击：立即展开。锁 600ms，避免展开瞬间 scrollTop 被回弹钳制又触发自动收起
  onHeadTap() {
    if (this.data.headStage !== 2) return;
    this._setHeadStage(0, 600);
  },

  // 头部高度只量一次（布局稳定后）：写成定高，height 才能从 px 平滑过渡到 0
  _measureHead(force) {
    const that = this;
    if (this.data.headStage) return;  // 收起状态量到的永远是 0，跳过
    if (force && this.data.headMainH) {
      // 内容高度可能变过：先退回 auto 再量
      this.setData({ headMainH: 0 }, function () { that._measureHead(false); });
      return;
    }
    wx.createSelectorQuery().in(this).select('.head-main').boundingClientRect(function (r) {
      if (!r || !r.height || that.data.headStage) return;
      const h = Math.round(r.height);
      if (h > 0 && Math.abs(h - that.data.headMainH) > 1) that.setData({ headMainH: h });
      // 带着搜索词进来 / 首屏就命中的情况：量到高度后补一次自动收起，让首条结果露出来
      if (that._fromQuery && that.data.query && !that.data.searchFocus) {
        that._fromQuery = false;
        // 等 headMainH 落到视图上再收，才能走高度过渡
        setTimeout(function () { that._setHeadStage(1, 900); }, 60);
      }
    }).exec();
  },

  /* ═════════ 时间轴：view 密度柱 + WXS 逐帧拖动 ═════════ */
  /**
   * 预计算 173 段的两排密度柱。
   * 返回 { barsCn, barsWd, barW }：
   *   l = 段在轨道上的百分比位置（与游标同一口径：i / (N-1)）；
   *   h = 柱高（rpx），96rpx 轨道上单排最高 44rpx；
   *   barW = 单柱宽度百分比，按段距的 62% 取，既留缝又不至于细到看不见。
   * 柱用纯 view 渲染，天然服从 z-index，不会再压住下拉面板与引导卡。
   */
  _buildBars() {
    const bs = this._blocks || [];
    const N = bs.length;
    if (!N) return { barsCn: [], barsWd: [], barW: 0.4 };
    let maxCn = 1;
    let maxWd = 1;
    bs.forEach(function (b) {
      if (b.china.length > maxCn) maxCn = b.china.length;
      if (b.world.length > maxWd) maxWd = b.world.length;
    });
    const step = N > 1 ? 100 / (N - 1) : 100;
    const barW = Math.max(0.28, Math.min(0.9, step * 0.62)).toFixed(3);
    const barsCn = [];
    const barsWd = [];
    bs.forEach(function (b, i) {
      const l = (N > 1 ? i * step : 0).toFixed(2);
      if (b.china.length) {
        barsCn.push({ i: i, l: l, h: Math.max(3, Math.round(44 * b.china.length / maxCn)) });
      }
      if (b.world.length) {
        barsWd.push({ i: i, l: l, h: Math.max(3, Math.round(44 * b.world.length / maxWd)) });
      }
    });
    return { barsCn: barsCn, barsWd: barsWd, barW: barW };
  },

  _measureTrack() {
    const that = this;
    wx.createSelectorQuery().in(this).select('.tl-bars').boundingClientRect(function (r) {
      if (!r || !r.width) return;
      that._track = r;
      // 拖动中不 setData：否则会重渲染 .tl-thumb 的内联 style，把 WXS 刚写的游标位置打回去
      if (that._dragging) return;
      // 同一份量值写给 WXS：touchmove 里直接按 data-left / data-width 换算百分比
      const left = Math.round(r.left);
      const width = Math.round(r.width);
      if (left !== that.data.trackLeft || width !== that.data.trackWidth) {
        that.setData({ trackLeft: left, trackWidth: width });
      }
    }).exec();
  },

  _axisIndex(clientX) {
    const r = this._track || { left: this.data.trackLeft, width: this.data.trackWidth };
    if (!r || !r.width || !this._blocks) return null;
    const ratio = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    return Math.round(ratio * (this._blocks.length - 1));
  },

  /* ── 拖动实时反馈 ──
   * 上一版的错误：拖动期间完全不 setData，只有游标动，年份和列表都不动，
   * 所以「滑到中间下面没反应，松手才跳」。
   * 现在的分工：
   *   1) 游标：WXS 逐帧改 left，零 setData；
   *   2) 年份 / 段号 / 预览：WXS 跨段时节流 45ms 通知一次，页面只 setData { activeIndex, activeLabel, pv, dragOn }；
   *   3) 337 根密度柱、bands 年表数组在拖动中一律不动；
   *   4) 松手：一次 setData 完成吸附游标 + 目标段数据 + 定位，不再用 setTimeout 空等。
   */

  // 预计算每段的预览文本：最多两条中国 + 两条域外标题，压成单行字符串
  _buildPreviewCache(vms) {
    const pv = {};
    vms.forEach(function (v) {
      const cn = [];
      const wd = [];
      for (let k = 0; k < v.china.length && cn.length < 2; k++) cn.push(v.china[k].title);
      for (let k = 0; k < v.world.length && wd.length < 2; k++) wd.push(v.world[k].title);
      pv[v.i] = {
        cnText: cn.length ? cn.join(' · ') : '无中国条目',
        wdText: wd.length ? wd.join(' · ') : '无域外条目'
      };
    });
    this._pv = pv;
  },

  // 拖动中更新「年份 + 段号 + 预览卡」；同一个段不重复 setData
  _previewAt(i) {
    if (i == null || i < 0) return;
    const payload = {};
    if (!this.data.dragOn) payload.dragOn = true;
    if (i !== this._dragIdx) {
      this._dragIdx = i;
      const b = this._blocks[i];
      payload.activeIndex = i;
      payload.activeLabel = b ? b.yearLabel : this.data.activeLabel;
      payload.pv = (this._pv && this._pv[i]) || null;
    }
    if (payload.dragOn || payload.pv !== undefined) this.setData(payload);
  },

  // WXS 每跨过一段 callMethod 进来一次：不依赖逻辑层能否收到 touchmove，预览也一定跟着走
  onAxisPreview(e) {
    // 松手后可能还有一次在途通知，避免把预览卡又打开
    if (!this._dragging) return;
    const i = e && e.i;
    if (i == null) return;
    this._wxsAt = Date.now();
    this._previewAt(i);
  },

  onAxisStart(e) {
    this._dragging = true;
    this._dragAt = 0;
    // 进入拖动先校准一次轨道，防止旋转屏幕 / 首帧还没量到
    this._measureTrack();
    const t = e && e.touches && e.touches[0];
    const i = t ? this._axisIndex(t.clientX) : null;
    if (i != null) {
      this._previewAt(i);
    } else if (!this.data.dragOn) {
      this.setData({ dragOn: true });
    }
  },

  // catchtouchmove 只负责拦住页面滚动。预览默认由 WXS 驱动；
  // 只有在 150ms 内没收到 WXS 通知时，才在这里兜底算一次（两者用同一份 dataset，不会打架）。
  onAxisHold(e) {
    if (!this._dragging) return;
    if (Date.now() - (this._wxsAt || 0) < 150) return;
    const now = Date.now();
    if (now - (this._dragAt || 0) < 55) return;
    const t = e && e.touches && e.touches[0];
    if (!t) return;
    this._dragAt = now;
    const i = this._axisIndex(t.clientX);
    if (i != null) this._previewAt(i);
  },

  onAxisEnd(e) {
    if (!this._dragging) return;
    this._dragging = false;
    const t = (e.changedTouches && e.changedTouches[0]) || (e.touches && e.touches[0]);
    const i = t ? this._axisIndex(t.clientX) : null;
    const idx = i == null ? this.data.activeIndex : i;
    this._jumpTo(idx);
  },

  /**
   * 松手定位：
   * - 目标段已在渲染树里：一次 setData（游标吸附 + 年份 + scrollInto + 关预览）直接到位；
   * - 目标段还没渲染：同一次 setData 里补齐 bands，渲染回调里立刻下发 scrollInto（不加人为延时），
   *   并关掉滚动动画，避免「松手后动画滚一段」的停顿感。
   */
  _jumpTo(i) {
    if (i == null || i < 0 || !this._blocks || !this._blocks[i]) {
      this.setData({ dragOn: false });
      return;
    }
    const block = this._blocks[i];
    const N = this._blocks.length;
    const pct = N > 1 ? (i / (N - 1) * 100) : 0;
    const pos = this._posOf ? this._posOf[i] : null;
    const target = 'b' + i;
    const rendered = pos != null && pos < this.data.bands.length;
    const needBands = pos != null && !rendered;
    const same = this.data.scrollInto === target;

    const payload = {
      activeIndex: i,
      activeLabel: block.yearLabel,
      thumbPct: pct,
      scrollAnim: false,
      // 选好年代段跳转后自动收一次头，把目标段直接露出来；
      // 目标是第一段时本来就回到顶部，保持展开即可；还没量到高度时也不收
      headStage: (pos === 0 || !this.data.headMainH) ? 0 : 1
    };
    // 目标已渲染：预览卡和跳转同帧收掉；要现场渲染远处段时，则让卡片留到滚动下发那一刻，
    // 避免「卡片先消失、列表还在渲染」的空白停顿感
    if (!needBands) payload.dragOn = false;
    if (needBands) {
      const count = Math.min(this._vms.length, pos + 1 + NEXT_SIZE);
      if (count > this._visibleCount) this._visibleCount = count;
      payload.bands = this._vms.slice(0, this._visibleCount);
      payload.renderedCount = this._visibleCount;
    }
    // 已渲染且不是同值时，和吸附放进同一次 setData
    if (!needBands && !same) payload.scrollInto = target;

    this._lockSpy = Date.now() + 900;
    if (pos !== 0) this._headLock = Date.now() + 900;
    const that = this;
    this.setData(payload, function () {
      if (payload.scrollInto) {
        that._scheduleMeasure(240);
        return;
      }
      if (same) {
        // scroll-into-view 同值不会触发滚动，先清空再下发
        const clear = { scrollInto: '' };
        if (!that._dragging) clear.dragOn = false;
        that.setData(clear, function () {
          that.setData({ scrollInto: target });
        });
        return;
      }
      // 目标段是这次才渲染出来的：渲染完成立即下发滚动，同一帧收掉预览卡
      const p = { scrollInto: target };
      if (!that._dragging) p.dragOn = false;
      that.setData(p);
      that._scheduleMeasure(240);
    });
  },

  _locateBlock(i) {
    if (i == null || !this._posOf) return;
    const pos = this._posOf[i];
    if (pos == null) return;
    if (pos >= this._visibleCount && this._vms) {
      this._visibleCount = Math.min(this._vms.length, pos + NEXT_SIZE);
      this.setData({
        bands: this._vms.slice(0, this._visibleCount),
        renderedCount: this._visibleCount
      });
    }
    this._setActive(i);
    this._lockSpy = Date.now() + 900;
    const headP = { scrollAnim: true, scrollInto: '' };
    // 搜索命中 / 定位到段：自动收一次头，让首条结果露出来；搜索框仍聚焦时不收，避免打断输入。
    // 首次加载还没量到头部高度时也先不收，否则 headMainH 会一直是 0，之后就没有高度过渡。
    if (!this.data.searchFocus && this.data.headMainH) {
      headP.headStage = 1;
      this._headLock = Date.now() + 900;
    }
    this.setData(headP);
    const that = this;
    setTimeout(function () {
      that.setData({ scrollInto: 'b' + i });
      that._scheduleMeasure(420);
    }, 30);
  },

  /* ═════════ 段偏移测量（滚动高亮跟随）═════════ */
  _scheduleMeasure(delay) {
    if (this._mTimer) clearTimeout(this._mTimer);
    const that = this;
    this._mTimer = setTimeout(function () { that._measureOffsets(); }, typeof delay === 'number' ? delay : 100);
  },

  _measureOffsets() {
    const that = this;
    wx.createSelectorQuery().in(this)
      .select('.cmp-body').boundingClientRect()
      .selectAll('.band').boundingClientRect()
      .exec(function (res) {
        const body = res && res[0];
        const rects = res && res[1];
        if (!body || !rects || !that.data.bands.length) return;
        // 内容坐标 = 视口坐标 - (滚动容器顶部 - 当前 scrollTop)
        const base = body.top - that._scrollTop;
        const pairs = [];
        rects.forEach(function (r, k) {
          const b = that.data.bands[k];
          if (!b) return;
          pairs.push([b.i, r.top - base]);
        });
        pairs.sort(function (a, b) { return a[0] - b[0]; });
        that._offKeys = pairs.map(function (p) { return p[0]; });
        that._offVals = pairs.map(function (p) { return p[1]; });
      });
  },

  /* ═════════ 引导 / 分享 ═════════ */
  _tryAutoGuide(key, delay) {
    if (!guide.shouldShow(key) && !guide.hasReplay(key)) return;
    if (this._guideTimer) clearTimeout(this._guideTimer);
    const that = this;
    this._guideTimer = setTimeout(function () {
      that._guideTimer = null;
      const layer = that.selectComponent('#guideLayer');
      if (layer) layer.autoStart(key);
    }, typeof delay === 'number' ? delay : 500);
  },

  onShareAppMessage() {
    const q = String(this.data.query || '').trim();
    return {
      title: '中外对照 · 同一时间，两个世界',
      path: '/parallel-pkg/pages/compare/compare' + (q ? '?q=' + encodeURIComponent(q) : '')
    };
  },

  onShareTimeline() {
    const q = String(this.data.query || '').trim();
    return {
      title: '中外对照 · 同一时间，两个世界',
      query: q ? 'q=' + encodeURIComponent(q) : ''
    };
  }
});
