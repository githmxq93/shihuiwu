/**
 * 这一年，谁在场 —— 平行时空结果页的二级页（方案 B · 人物三幕）
 *
 * 数据口径（与结果页入口完全一致）：
 *   GET /api/timeline/:year → counts{birth,death,event,office,jinshi} / people / groups / chronicle
 *   GET /api/figures/batch?ids=… → 生卒年（接口单次上限 200 人）
 *
 * 三幕：
 *   登场 = 该年出生（groups.birth）
 *   在场 = 该年有记载（groups.event/office/jinshi 去重；不是严格的「在世」——库里没有这个判定）
 *   离场 = 该年去世（groups.death）
 *
 * 收敛：每类接口只给前 40 条预览，本页默认每幕只列 6~8 人，可展开到这 40 条；
 *       「在场」再按 与要事相关 / 知名度 / 身份（本年在任·登第）三档切换。绝不一次铺几百人。
 *
 * 生卒缺失一律「待补」：不补造、不按 0 岁、不按「至今」推算。
 */
const request = require('../../../utils/request');
const API = require('../../../config/api');
const { navTo } = require('../../../utils/nav');

// 每幕默认条数；接口每类预览上限 40（server/routes/timeline.js PREVIEW_SIZE）
const SHORT_SHOW = 6;
const ALIVE_SHOW = 8;
const PREVIEW_SIZE = 40;

const KIND_LABEL = { event: '要事', birth: '生', death: '卒', jinshi: '登第', office: '任职' };

// 三档口径都取「本年」真实记载字段，不依赖覆盖率极低的 figures.occupation：
//   evt  与要事相关 → event_timeline.kind='event'
//   fame 按知名度   → event_timeline.featured=1
//   occ  按身份     → kind in ('office','jinshi')，即本年在任或登第
const CONV_NOTE = {
  evt: '这些人物在本年要事里出现（主角或直接相关），事件优先于名录。',
  fame: '库里标为高知名度的收录人物，按本年记载分数排序。',
  occ: '本年在任或登第的人物（职官 / 科第记载），按本年记载分数排序。',
  life: '生年或卒年在库中可考的人物；缺的一端统一标「待补」。',
  all: '该年有记载的全部人物。'
};

function fmtYear(y) {
  return y < 0 ? '前' + (-y) : String(y);
}

/** 生卒字段可能是 '1644' / '公元前100年' / '' / null —— 统一解析为负数年份，解析不出返回 null */
function parseYearVal(v) {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  if (!s) return null;
  const m = s.match(/(公元前|前)?\s*(\d{1,4})/);
  if (!m) return null;
  const n = Number(m[2]);
  if (!n) return null;
  return m[1] ? -n : n;
}

/** 生卒展示：缺失的一端写「待补」，两端都缺写「生卒待补」 */
function lifeOf(b, d) {
  if (b != null && d != null) return fmtYear(b) + '—' + fmtYear(d);
  if (b != null) return fmtYear(b) + '—待补';
  if (d != null) return '待补—' + fmtYear(d);
  return '生卒待补';
}

/** 年号 + 朝代（与结果页 `纪元` 同一来源，不做额外推断） */
function eraLabelOf(d) {
  const eras = d.eras || [];
  const main = eras.filter(function (e) { return e.primary; })[0] || eras[0];
  const dyn = (d.dynasties && d.dynasties[0] && d.dynasties[0].name) || '';
  return [dyn, main ? main.label : ''].filter(Boolean).join(' · ');
}

/**
 * 单行人物视图模型。
 * kind 必填：birth/death 时用「本年」补齐缺失的一端——事件行本身就证明「这年出生/去世」，
 * 不能因为 figures 表生卒为空就把已知年份也写成待补。
 */
function buildRow(it, info, year, kind) {
  let b = info ? parseYearVal(info.birthYear) : null;
  let d = info ? parseYearVal(info.deathYear) : null;
  // 生卒幕以「事件行所属年份」为准：能进 birth/death 组，本身已证明这年出生/去世，
  // 不能因 figures 表缺字段或与之不一致，把已知的一端写成待补或别的年份。
  if (kind === 'birth') b = year;
  if (kind === 'death') d = year;

  const bits = [];
  if (info && info.occupation) bits.push(info.occupation);
  else if (it.region) bits.push(it.region);
  if (it.dynasty) bits.push(it.dynasty);

  return {
    id: it.id,
    name: it.name || '（佚名）',
    life: lifeOf(b, d),
    meta: bits.slice(0, 2).join(' · ') || KIND_LABEL[kind] || '',
    featured: !!it.featured,
    b: b,
    d: d
  };
}

Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 96,

    year: 0,
    yearLabel: '',
    ganzhi: '',
    eraText: '',

    loading: true,
    loadFailed: false,
    errText: '',
    skeletonRows: [1, 2, 3],

    counts: { birth: 0, death: 0, total: 0 },
    aliveTotal: 0,

    bornAll: [],
    bornView: [],
    bornExpanded: false,
    deadAll: [],
    deadView: [],
    deadExpanded: false,
    aliveAll: [],
    aliveView: [],
    aliveExpanded: false,

    conv: '',
    convTabs: [],
    aliveNote: '',

    events: [],
    eventTitle: '该年要事',
    eventTotal: 0,
    eventMore: 0,

    // scroll-view 的精确滚动位置：引导要把锚点滚进视口时用
    scrollTopVal: 0
  },

  onLoad(query) {
    const statusBar = getApp().globalData.statusBarHeight || 44;
    const y = Number(query && query.year);
    const ok = Number.isFinite(y) && y !== 0;
    this.setData({
      safeAreaTop: statusBar,
      navBarHeight: statusBar + 44 + 8,
      year: ok ? y : 0,
      yearLabel: ok ? fmtYear(y) : ''
    });
    if (!ok) {
      this.setData({ loading: false, loadFailed: true, errText: '年份参数缺失' });
      return;
    }
    this._fetch(y);
  },

  onUnload() {
    // 让在途回调失效，避免页面销毁后 setData
    this._seq = (this._seq || 0) + 1;
    if (this._guideTimer) clearTimeout(this._guideTimer);
    this._guideTimer = null;
  },

  onReady() {
    // 数据可能比首帧晚到（两次请求）：就绪就排，未就绪由 _build 末尾再排
    if (!this.data.loading && !this.data.loadFailed) this._scheduleGuide();
  },

  /**
   * 本页引导：数据就绪后自动起一次。
   * 两步都是 optional（收敛档可能整块没有、三幕区也可能量不到），
   * 目标缺失时由组件跳过该步，不会把用户卡在「遮罩在、孔不在」。
   */
  _scheduleGuide(tries) {
    if (this._guideStarted) return;
    const attempt = tries || 0;
    const that = this;
    if (this._guideTimer) clearTimeout(this._guideTimer);
    this._guideTimer = setTimeout(function () {
      that._guideTimer = null;
      if (that._guideStarted) return;
      const layer = that.selectComponent('#guideLayer');
      if (!layer) {
        // 组件还没挂上：再等一轮，最多 4 次
        if (attempt < 4) that._scheduleGuide(attempt + 1);
        return;
      }
      that._guideStarted = true;
      layer.autoStart('whoPresent');
    }, attempt ? 200 : 420);
  },

  /**
   * 引导需要把某个锚点滚进视口时由 guide-layer 触发。
   * 本页主体是 scroll-view（不是页面滚动），组件拿不到它的 scrollTop：
   * 按「scroll-view 矩形 + 锚点矩形」算出目标 scrollTop 写给 scroll-top，
   * 并给顶部导航与底部引导卡片留出空间。
   */
  onGuideScrollTo(e) {
    const selector = (e && e.detail && e.detail.selector) || '';
    if (!selector) return;
    // 引导每 180ms 重试一次；滚动动画期间量到的还是旧位置，连发会过冲，500ms 内只认第一次
    const now = Date.now();
    if (now - (this._guideScrollAt || 0) < 500) return;
    this._guideScrollAt = now;
    const that = this;
    const navH = this.data.navBarHeight || 96;
    const reserve = 300; // 给引导卡片留的高度（卡片最高约 240 + 间隙与边距）
    wx.createSelectorQuery()
      .select('.body')
      .boundingClientRect()
      .select(selector)
      .boundingClientRect()
      .exec(function (res) {
        const view = res && res[0];
        const rect = res && res[1];
        if (!view || !rect) return;
        const topLimit = view.top + navH + 16;
        const bottomLimit = view.top + view.height - reserve;
        const cur = that._lastTop || 0;
        let next = cur;
        if (rect.top < topLimit) next = cur - (topLimit - rect.top);
        else if (rect.bottom > bottomLimit) next = cur + (rect.bottom - bottomLimit);
        next = Math.max(0, Math.round(next));
        if (Math.abs(next - cur) < 2) return;
        // 先把 scroll-top 对齐当前值，再设新值，确保值变化触发滚动
        that.setData({ scrollTopVal: cur }, function () {
          that.setData({ scrollTopVal: next });
        });
      });
  },

  onBodyScroll(e) {
    this._lastTop = (e.detail && e.detail.scrollTop) || 0;
  },

  /* ── 拉取：先取该年记载，再批量补生卒/身份 ── */
  _fetch(year) {
    const that = this;
    const seq = this._seq = (this._seq || 0) + 1;
    request({
      timeout: 10000,
      url: API.TIMELINE.YEAR(year),
      success: function (res) {
        if (seq !== that._seq) return;
        const body = res.data || {};
        const d = body.data || {};
        if (!body.success || !d.counts) {
          that.setData({ loading: false, loadFailed: true, errText: (body && body.message) || '该年暂无可定年的人物记载' });
          return;
        }
        that._compose(year, d, seq);
      },
      fail: function () {
        if (seq !== that._seq) return;
        that.setData({ loading: false, loadFailed: true, errText: '网络异常，人物记载加载失败' });
      }
    });
  },

  _compose(year, d, seq) {
    const that = this;
    const groups = d.groups || {};

    // 预览人物去重（同一个人可能同时有任职 / 要事 / 登第多条）
    const personMap = {};
    Object.keys(groups).forEach(function (k) {
      (groups[k] || []).forEach(function (it) {
        if (!it || it.id == null) return;
        if (!personMap[it.id]) personMap[it.id] = { row: it, kinds: [] };
        personMap[it.id].kinds.push(k);
      });
    });
    const ids = Object.keys(personMap).slice(0, 200);

    function finish(infoMap) {
      if (seq !== that._seq) return;
      that._build(year, d, groups, personMap, infoMap);
    }

    if (!ids.length) {
      finish({});
      return;
    }

    request({
      timeout: 8000,
      // withRelations 不传：本页只要生卒与身份，避免把关系 JSON 一起拉下来
      url: API.FIGURES.BATCH + '?ids=' + ids.join(','),
      success: function (res) {
        const body = res.data || {};
        const list = (body.success && body.data) || [];
        const info = {};
        list.forEach(function (f) {
          if (f && f.id != null) info[f.id] = f;
        });
        finish(info);
      },
      // 生卒补全失败不阻断主体：仍可展示姓名与「待补」
      fail: function () {
        finish({});
      }
    });
  },

  _build(year, d, groups, personMap, info) {
    const counts = d.counts || {};
    const birthCount = Number(counts.birth) || 0;
    const deathCount = Number(counts.death) || 0;
    const peopleCount = Number(d.people) || 0;

    const bornAll = (groups.birth || []).map(function (it) {
      return buildRow(it, info[it.id], year, 'birth');
    });
    const deadAll = (groups.death || []).map(function (it) {
      return buildRow(it, info[it.id], year, 'death');
    });

    // 在场池：排除生卒类记载（他们分别归入登场/离场），只留有「该年做了什么」的人
    const pool = [];
    const seen = {};
    const eventIds = {};
    (groups.event || []).forEach(function (it) { if (it && it.id != null) eventIds[it.id] = 1; });

    ['event', 'office', 'jinshi'].forEach(function (k) {
      (groups[k] || []).forEach(function (it) {
        if (!it || it.id == null || seen[it.id]) return;
        seen[it.id] = 1;
        const r = buildRow(it, info[it.id], year, k);
        const kinds = (personMap[it.id] && personMap[it.id].kinds) || [k];
        r.inEvent = !!eventIds[it.id];
        // 「按身份」= 本年在任或登第（kind 是接口返回的真实字段，逐年可算）
        r.inOffice = kinds.indexOf('office') >= 0 || kinds.indexOf('jinshi') >= 0;
        if (r.b != null && year >= r.b && year - r.b > 0) {
          r.meta = '时年 ' + (year - r.b) + (r.meta ? ' · ' + r.meta : '');
        }
        pool.push(r);
      });
    });
    // 该年只有生卒记载时（常见于小年），退回全部预览人物，避免「在场」整幕空白
    if (!pool.length) {
      Object.keys(personMap).forEach(function (id) {
        if (seen[id]) return;
        seen[id] = 1;
        const p = personMap[id];
        pool.push(buildRow(p.row, info[id], year, p.kinds[0]));
      });
    }

    // 收敛三档：口径全部落在本年记载字段上（见文件头 CONV_NOTE 注释）
    const tabs = [];
    const evtRows = pool.filter(function (r) { return r.inEvent; });
    if (evtRows.length) tabs.push({ key: 'evt', label: '与要事相关', n: evtRows.length, rows: evtRows });
    const fameRows = pool.filter(function (r) { return r.featured; });
    if (fameRows.length) tabs.push({ key: 'fame', label: '按知名度', n: fameRows.length, rows: fameRows });
    const occRows = pool.filter(function (r) { return r.inOffice; });
    if (occRows.length) tabs.push({ key: 'occ', label: '按身份', n: occRows.length, rows: occRows });
    if (!tabs.length) {
      tabs.push({ key: 'all', label: '有记载', n: pool.length, rows: pool });
    } else if (tabs.length < 3) {
      // 三档稳定：某一维在本年确实没有记载时，用「生卒可考」补位；
      // 仍不足三档再退回「全部记载」，不留空位也不硬造维度。
      const lifeRows = pool.filter(function (r) { return r.b != null; });
      if (lifeRows.length) tabs.push({ key: 'life', label: '生卒可考', n: lifeRows.length, rows: lifeRows });
      if (tabs.length < 3) tabs.push({ key: 'all', label: '全部记载', n: pool.length, rows: pool });
    }

    const conv = tabs[0].key;
    const aliveAll = tabs[0].rows;
    this._tabs = tabs;

    // 底部事件条：优先用独立的大事表（chronicle_events），没有再退回人物要事
    let evts = (d.chronicle || []).map(function (c) { return c && c.title; }).filter(Boolean);
    let eventTitle = '该年大事';
    let eventTotal = evts.length;
    if (!evts.length) {
      evts = (groups.event || []).map(function (e) { return e && (e.title || e.name); }).filter(Boolean);
      eventTitle = '该年要事';
      eventTotal = Number(counts.event) || evts.length;
    }
    const shown = evts.slice(0, 6);

    this.setData({
      loading: false,
      loadFailed: false,
      year: year,
      yearLabel: d.label || fmtYear(year),
      ganzhi: d.ganzhi || '',
      eraText: eraLabelOf(d),
      counts: { birth: birthCount, death: deathCount, total: Number(d.total) || 0 },
      aliveTotal: peopleCount,

      bornAll: bornAll,
      bornView: bornAll.slice(0, SHORT_SHOW),
      bornExpanded: false,
      deadAll: deadAll,
      deadView: deadAll.slice(0, SHORT_SHOW),
      deadExpanded: false,

      conv: conv,
      convTabs: tabs.map(function (t) { return { key: t.key, label: t.label, n: t.n }; }),
      aliveNote: CONV_NOTE[conv] || ('该年有记载的 ' + pool.length + ' 位人物。'),
      aliveAll: aliveAll,
      aliveView: aliveAll.slice(0, ALIVE_SHOW),
      aliveExpanded: false,

      events: shown,
      eventTitle: eventTitle,
      eventTotal: eventTotal,
      eventMore: Math.max(0, eventTotal - shown.length)
    });

    // 首帧数据落位后再起引导：否则量到的还是骨架屏，锚点全不存在
    this._scheduleGuide();
  },

  /* ── 交互 ── */
  onToggleBorn() {
    const open = !this.data.bornExpanded;
    this.setData({
      bornExpanded: open,
      bornView: open ? this.data.bornAll : this.data.bornAll.slice(0, SHORT_SHOW)
    });
  },

  onToggleDead() {
    const open = !this.data.deadExpanded;
    this.setData({
      deadExpanded: open,
      deadView: open ? this.data.deadAll : this.data.deadAll.slice(0, SHORT_SHOW)
    });
  },

  onToggleAlive() {
    const open = !this.data.aliveExpanded;
    this.setData({
      aliveExpanded: open,
      aliveView: open ? this.data.aliveAll : this.data.aliveAll.slice(0, ALIVE_SHOW)
    });
  },

  onSwitchConv(e) {
    const key = e.currentTarget.dataset.key;
    const tabs = this._tabs || [];
    let hit = null;
    tabs.forEach(function (t) { if (t.key === key) hit = t; });
    if (!hit) return;
    this.setData({
      conv: key,
      aliveNote: CONV_NOTE[key] || ('该年有记载的 ' + hit.rows.length + ' 位人物。'),
      aliveAll: hit.rows,
      aliveView: hit.rows.slice(0, ALIVE_SHOW),
      aliveExpanded: false
    });
  },

  onTapPerson(e) {
    const id = e.currentTarget.dataset.id;
    if (id) navTo('/detail-pkg/pages/detail/detail?id=' + id);
  },

  onRetry() {
    if (!this.data.year) return;
    this.setData({ loading: true, loadFailed: false });
    this._fetch(this.data.year);
  }
});
