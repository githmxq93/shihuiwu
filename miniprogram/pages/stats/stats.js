const request = require('../../utils/request');
const { navTo } = require('../../utils/nav');
const API = require('../../config/api');

function fmt(v) {
  return (Number(v) || 0).toLocaleString('zh-CN');
}

// 长文本截断（事件描述 / 人物简介），避免卡片被撑高
function truncate(s, n) {
  if (!s) return '';
  const t = String(s).replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n) + '…' : t;
}

// 服务端动态文案含 <strong> 高亮标签，小程序用纯文本渲染，先剥掉
function stripTags(s) {
  return String(s || '').replace(/<[^>]+>/g, '');
}

// 数据条等比换算：列表最大值 = 100%，最小值兜底 2% 保证看得见
// key 指向原始数值字段（展示字段可能已被格式化，不能拿来算比例）
function toBars(list, key) {
  const max = list.reduce((m, it) => Math.max(m, Number(it[key]) || 0), 0) || 1;
  return list.map((it) => {
    it.barPercent = Math.max(2, Math.round((Number(it[key]) || 0) / max * 100));
    return it;
  });
}

// 身份词：字号与人数等比开方（20~38rpx，偶数），字号越大人物越多
function buildWordCloud(list, limit) {
  const items = (list || []).slice(0, limit || 40);
  const max = items.reduce((m, t) => Math.max(m, Number(t.cnt) || 0), 0) || 1;
  return items.map((t, i) => {
    // 用平方根压缩极值：榜首是第二名的数倍，线性映射会把其余词挤成同一字号
    const ratio = Math.sqrt((Number(t.cnt) || 0) / max);
    return {
      tag: t.tag,
      cnt: fmt(t.cnt),
      size: Math.round((20 + ratio * 18) / 2) * 2,
      tone: i % 5
    };
  });
}

// 史记书名去掉副标题 / 出版社括注，只留书名本体
function shortBook(name) {
  return String(name || '').split(/[（(]/)[0].split('--')[0].trim();
}

// 极值文案「1479 条人物关系」→「1,479 条」；「120 岁（…）」→「120 岁」
function shortExtreme(d) {
  const m = String(d || '').match(/^([\d,]+)\s*(部|条|岁|个)/);
  if (!m) return String(d || '');
  return fmt(m[1].replace(/,/g, '')) + ' ' + m[2];
}

// 服务端动态类型 → 徽章文案（与文案前缀一致，便于去重）
const FEED_BADGE = { add: '新增收录', update: '更新资料', review: '关系更新' };

// 页面已用徽章标出类型，文案里重复的前缀去掉，列表更清爽
function feedText(raw, type) {
  let t = stripTags(raw).trim();
  const badge = FEED_BADGE[type];
  if (badge && t.indexOf(badge + '：') === 0) t = t.slice(badge.length + 1);
  return truncate(t, 72);
}

Page({
  data: {
    loading: true,
    loadFailed: false,
    // 服务端在后台算全站统计（首次部署 / 刚重启）时返回 503 + code=COMPUTING。
    // [重要] 旧实现把这种情况当网络错误，用户只看到「请检查网络」，且永不自动重试。
    computing: false,
    refreshing: false,
    // 快照真实生成时间（服务端 snapshotAt），不是「本次取数时刻」
    updatedText: '',
    // KPI（口径与 Web 端实时看板一致）
    total: '0',
    dynastyCount: 0,
    relationTotal: '0',
    totalWorks: '0',
    totalEvents: '0',
    worksFigures: '0',
    eventsFigures: '0',
    relationAvg: '0.00',
    completenessAvg: '0.0',
    newToday: '0',
    newThisWeek: '0',
    todayViews: '0',
    // 数据体检：7 项填充率
    health: [],
    // 史料支撑
    srcTotal: '0',
    srcFigures: '0',
    srcKinds: [],
    srcBooks: '',
    srcTop9Pct: '0',
    // 「读法」里的两个比例：均由接口数据计算，算不出时为空串（模板不渲染该分句）
    qingMingPct: '',
    tagCovPct: '',
    // 朝代（TOP9 + 全量 60）
    dynasties: [],
    dynastiesAll: [],
    dynastyExpanded: false,
    dynastyNote: '',
    // 性别
    gender: [],
    genderBar: { m: 0, f: 0, u: 0 },
    // 身份词云
    tagsAll: [],
    tagsVisible: [],
    cloudExpanded: false,
    cloudNote: '',
    // 影响力 / 极值 / 动态
    influence: [],
    extremes: [],
    heatFigures: '0',
    heatPct: '0',
    feed: [],
    feedIsSnapshot: false,
    // 吸顶章节条
    safeAreaTop: 44,
    navH: 88,
    chapterFixed: false,
    hdCompact: false,
    activeChapter: 'scale',
    scrollTop: 0
  },

  onLoad() {
    const sysInfo = wx.getWindowInfo();
    const safeAreaTop = sysInfo.statusBarHeight || 44;
    this.setData({ safeAreaTop, navH: safeAreaTop + 44 });
    this._lastFetchAt = 0;
    this._firstShow = true;
    this._scrollTop = 0;
    // 窄标题条的显示/收起阈值（量到页头之后才算得出来；量到之前不显示）
    this._hdShowAt = Infinity;
    this._hdHideAt = Infinity;
    this.fetchStats();
    this._trackPageView();
  },

  /**
   * 回到本页时若数据已陈旧则静默刷新。
   * [重要] 旧实现只有 onLoad：从别的页面返回（或长时间悬挂后切回）永远看到同一份数据，
   *    快照本身最长 1 小时陈旧 —— 叠加起来就是「数据不可刷新，也不知道新旧」。
   */
  onShow() {
    if (this._firstShow) { this._firstShow = false; return; }
    if (!this._lastFetchAt) return;
    if (Date.now() - this._lastFetchAt < 5 * 60 * 1000) return;
    this.fetchStats({ silent: true });
  },

  onUnload() {
    this._stopComputingPoll();
  },

  /** 页面浏览上报（失败静默：统计埋点不该影响浏览） */
  _trackPageView() {
    request({
      url: API.STATS.TRACK,
      method: 'POST',
      data: { type: 'page', path: '/pages/stats/stats' },
      timeout: 8000,
      success: () => {},
      fail: () => {}
    });
  },

  /** 服务端正在计算：每 8 秒轻量轮询 realtime，最多 40 次（≈5 分钟） */
  _startComputingPoll() {
    if (this._computingTimer) return;
    var that = this;
    var tries = 0;
    this._computingTimer = setInterval(function () {
      tries += 1;
      if (tries > 40) { that._stopComputingPoll(); return; }
      request({
        url: API.STATS.REALTIME + '?t=' + Date.now(),
        timeout: 10000,
        success: (res) => {
          const d = (res && res.data) || {};
          if (d.success && d.data) {
            that._stopComputingPoll();
            that.setData({ computing: false });
            that.fetchStats({ silent: true });
          }
        },
        fail: () => {}
      });
    }, 8000);
  },

  _stopComputingPoll() {
    if (this._computingTimer) {
      clearInterval(this._computingTimer);
      this._computingTimer = null;
    }
  },

  /**
   * @param {{bust?: boolean, silent?: boolean}} [opts]
   *   bust   —— 带 ?t= 绕过浏览器/客户端缓存（手动刷新用）
   *   silent —— 静默刷新：不显示 loading 骨架，失败也不弹错误页
   */
  fetchStats(opts) {
    var o = opts || {};
    if (this._fetching) return;
    this._fetching = true;
    var bust = o.bust ? ('?t=' + Date.now()) : '';

    let realtime = null;
    let activity = null;
    let computing = false;
    let pending = 2;
    const finish = () => {
      if (--pending > 0) return;
      this._fetching = false;
      this._lastFetchAt = Date.now();
      this.setData({ refreshing: false });
      if (realtime) {
        this.apply(realtime, activity);
        return;
      }
      if (computing) {
        // 不是错误：服务端正在算，进入轮询而不是让用户「检查网络」
        this.setData({ loading: false, loadFailed: false, computing: true });
        this._startComputingPoll();
        return;
      }
      this.setData({ loading: false, loadFailed: true, computing: false });
    };

    request({
      timeout: 15000,
      url: API.STATS.REALTIME + bust,
      success: (res) => {
        const d = res.data || {};
        if (d.success && d.data) {
          realtime = d.data;
          // 快照真实生成时间在响应信封上（不在 data 内）
          this._snapshotAt = d.snapshotAt || '';
        } else if (d.code === 'COMPUTING') computing = true;
        finish();
      },
      fail: () => finish()
    });

    request({
      timeout: 15000,
      url: API.STATS.RECENT_ACTIVITY + bust,
      success: (res) => {
        const d = res.data || {};
        if (d.success && Array.isArray(d.data)) activity = d.data;
        finish();
      },
      fail: () => finish()
    });
  },

  onRefresh() {
    if (this.data.refreshing) return;
    this._stopComputingPoll();
    this.setData({ refreshing: true, computing: false });
    this.fetchStats({ bust: true });
    // 服务端正常但网络慢时，refreshing 由 finish() 收起；兜底 15 秒后复位
    var that = this;
    setTimeout(function () { if (that.data.refreshing) that.setData({ refreshing: false }); }, 15000);
  },

  // 快照 → 页面数据（所有取数都做兜底，缺字段时区块降级而不是整页报错）
  apply(s, activity) {
    const totalNum = Number(s.total) || 0;

    // 1. 磁贴：4 个总数（深色卡片 2×2），覆盖率写在小字里
    const relationAvg = s.relationTotal && s.total
      ? (Number(s.relationTotal) / Number(s.total)).toFixed(2)
      : '0.00';

    // 2. 数据体检：按填充率降序（设计稿顺序：简介 99.3 → 画像 0.5）
    const comp = (Array.isArray(s.completeness) ? s.completeness : [])
      .map((it) => ({ n: it.n, v: Number(it.v) || 0 }))
      .sort((a, b) => b.v - a.v);
    const health = comp.map((it) => ({
      n: it.n,
      p: it.v.toFixed(1),
      w: Math.max(1, Math.round(it.v)),
      low: it.v < 50
    }));
    const completenessAvg = comp.length
      ? (Math.round(comp.reduce((a, i) => a + i.v, 0) / comp.length * 10) / 10).toFixed(1)
      : '0.0';

    // 3. 史料支撑：累计条数 + 三类来源 + 覆盖人数 + 主要史籍
    const src = s.sources || {};
    const kindList = Array.isArray(src.kinds) ? src.kinds : [];
    const kindMax = kindList.reduce((m, k) => Math.max(m, Number(k.v) || 0), 0) || 1;
    const srcKinds = kindList.map((k) => ({
      name: k.name,
      v: fmt(k.v),
      w: Math.max(4, Math.round((Number(k.v) || 0) / kindMax * 100))
    }));
    const books = (Array.isArray(src.topBooks) ? src.topBooks : []).slice(0, 2)
      .map((b) => '《' + shortBook(b.name) + '》' + fmt(b.v) + ' 条')
      .join('、');

    // 4. 朝代：默认 9 行，展开显示归并后的全部 60 个
    const dynRaw = Array.isArray(s.dynasties) ? s.dynasties : [];
    const dynAll = dynRaw.map((d, i) => ({
      name: d.name,
      count: fmt(d.count),
      raw: Number(d.count) || 0,
      hi: i < 9
    }));
    const dynasties = toBars(dynAll.slice(0, 9), 'raw');
    const top9Sum = dynAll.slice(0, 9).reduce((a, d) => a + d.raw, 0);
    const allSum = dynAll.reduce((a, d) => a + d.raw, 0);
    const meta = s.dynastyMeta || {};
    const covered = Number(meta.covered) || allSum;
    const excluded = Number(meta.excluded) || Math.max(0, totalNum - covered);
    const coveredPct = Number(meta.pct) || (totalNum ? Math.round(covered / totalNum * 100) : 0);
    const top9Pct = totalNum ? (top9Sum / totalNum * 100).toFixed(1) : '0.0';
    const restSum = Math.max(0, allSum - top9Sum);
    const restPct = totalNum ? (restSum / totalNum * 100).toFixed(1) : '0.0';
    // 「清 + 明」占比：仅从接口下发的朝代列表求和，列表里没有这两个朝代时留空
    const qingMingSum = dynAll
      .filter((d) => /清|明/.test(String(d.name || '')))
      .reduce((a, d) => a + d.raw, 0);
    const qingMingPct = (totalNum && qingMingSum)
      ? (qingMingSum / totalNum * 100).toFixed(1)
      : '';
    const dynastyNote = dynAll.length
      ? dynRaw.length + ' 个朝代覆盖 ' + fmt(covered) + ' 人（' + coveredPct + '%），未归入朝代 '
        + fmt(excluded) + ' 人（' + (totalNum ? Math.round(excluded / totalNum * 100) : 0) + '%）；TOP9 占全库 '
        + top9Pct + '%，其余 ' + Math.max(0, dynRaw.length - 9) + ' 个合计 ' + fmt(restSum) + ' 人（' + restPct + '%）。'
      : '';

    // 5. 性别构成：三段条 + 三列数字
    const male = Number(s.maleCount) || 0;
    const female = Number(s.femaleCount) || 0;
    const unknown = Number(s.unknownGender) || 0;
    const gsum = male + female + unknown || 1;
    const pctOf = (n) => (n / gsum * 100);
    const gender = [
      { key: 'm', label: '男', v: fmt(male), p: pctOf(male).toFixed(1), color: '#b5713a' },
      { key: 'f', label: '女', v: fmt(female), p: pctOf(female).toFixed(1), color: '#a63b2a' },
      { key: 'u', label: '未知', v: fmt(unknown), p: pctOf(unknown).toFixed(1), color: '#75654f' }
    ];
    const genderBar = {
      m: pctOf(male).toFixed(1),
      f: pctOf(female).toFixed(1),
      u: pctOf(unknown).toFixed(1)
    };

    // 6. 身份词云：默认 10 个，可展开全部（服务端直接下发 wordCloud）
    const cloudSrc = (Array.isArray(s.wordCloud) && s.wordCloud.length) ? s.wordCloud : s.tagCounts;
    const tagsAll = buildWordCloud(cloudSrc, 40);
    const tagCov = s.tagCoverage || null;
    const cloudNote = tagCov
      ? '身份词 ' + Math.min(10, tagsAll.length) + ' 个 · 有标签 ' + fmt(tagCov.figures) + ' 人（' + tagCov.pct + '%）'
      : '字号越大人物越多';

    // 7. 影响力指数榜：浏览 + 关系×10 + 作品×5；分项全部摊开
    //    快照缺 influence 时降级用浏览榜 topFigures，保证区块不空
    const infSrc = (Array.isArray(s.influence) && s.influence.length)
      ? s.influence
      : (s.topFigures || []).map((f) => ({ id: f.id, name: f.name, views: f.views, relations: 0, works: 0, score: f.views, dynasty: '' }));
    const influence = infSrc.slice(0, 6).map((it, i) => ({
      id: it.id,
      rank: i + 1,
      name: it.name,
      dynasty: it.dynasty || '',
      views: fmt(it.views),
      relations: fmt(it.relations),
      works: fmt(it.works),
      score: fmt(it.score)
    }));

    // 8. 全库之最：取接口 5 个极值 + 开国君主（第 6 个「史料来源」与规模段同数，不重复放）
    const extSrc = (Array.isArray(s.extremes) ? s.extremes : []).slice(0, 5);
    const extremes = extSrc.map((it) => ({
      k: it.k,
      v: it.v,
      d: shortExtreme(it.d)
    }));
    extremes.push({ k: '开国君主', v: (Number(s.foundingKings) || 16) + ' 位', d: '建制称帝' });

    // 9. 实时动态：优先真实活动流；服务端没有近期记录时，用快照里的累计事实兜底。
    //    兜底条目**不带时间**（时间字段留空），并给整块打 feedIsSnapshot 标记，
    //    标题也随之改成「全库累计」—— 不能把累计量放在「真实更新记录」标题下冒充刚发生。
    let feedIsSnapshot = false;
    let feed = (Array.isArray(activity) ? activity : []).map((it, i) => ({
      id: it.id || ('act-' + i),
      badge: FEED_BADGE[it.type] || '动态',
      tone: it.type || 'review',
      text: feedText(it.text, it.type),
      time: it.time || ''
    }));
    if (!feed.length) {
      feedIsSnapshot = true;
      feed = (s.topFigures || []).slice(0, 2).map((f) => ({
        id: 'views-' + f.id, badge: '浏览热度', tone: 'review',
        text: f.name + ' —— 累计 ' + fmt(f.views) + ' 次浏览', time: ''
      }));
      feed.push({
        id: 'stat-relations', badge: '关系网络', tone: 'add',
        text: '全库累计 ' + fmt(s.relationTotal) + ' 条人物关系', time: ''
      });
    }
    // 热度段只保留 3 条，把版面留给榜单与极值
    feed = feed.slice(0, 3);
    feed.forEach((it, i) => { it.isLast = i === feed.length - 1; });

    const heatMeta = s.heatMeta || {};

    this.setData({
      loading: false,
      loadFailed: false,
      computing: false,
      total: fmt(s.total),
      dynastyCount: dynRaw.length,
      relationTotal: fmt(s.relationTotal),
      totalWorks: fmt(s.totalWorks),
      totalEvents: fmt(s.totalEvents),
      worksFigures: fmt(s.worksFigures),
      eventsFigures: fmt(s.eventsFigures),
      relationAvg,
      completenessAvg,
      newToday: fmt(s.newToday),
      newThisWeek: fmt(s.newThisWeek),
      todayViews: fmt(s.todayViews),
      updatedText: this._formatSnapshotAt(this._snapshotAt),
      health,
      srcTotal: fmt(src.total),
      srcFigures: fmt(src.figures),
      srcKinds,
      srcBooks: books,
      srcTop9Pct: top9Pct,
      qingMingPct,
      tagCovPct: (tagCov && tagCov.pct !== undefined && tagCov.pct !== null) ? tagCov.pct : '',
      dynasties,
      dynastiesAll: dynAll,
      dynastyNote,
      gender,
      genderBar,
      tagsAll,
      tagsVisible: tagsAll.slice(0, 10),
      cloudNote,
      influence,
      extremes,
      heatFigures: fmt(heatMeta.figures),
      heatPct: heatMeta.pct,
      feedIsSnapshot,
      feed
    }, () => {
      // DOM 渲染完成后再量一次：吸顶章节条需要真实的分段坐标
      setTimeout(() => this._measure(), 40);
    });
  },

  /** 量测：页头底部 + 三段起点（相对 scroll-view 内容顶部），供吸顶与高亮使用 */
  _measure() {
    const q = wx.createSelectorQuery().in(this);
    q.select('#mast').boundingClientRect();
    q.select('#sec-scale').boundingClientRect();
    q.select('#sec-structure').boundingClientRect();
    q.select('#sec-heat').boundingClientRect();
    q.select('.page-scroll').scrollOffset();
    q.exec((res) => {
      if (!res || !res[0]) return;
      const st = (res[4] && res[4].scrollTop) || this._scrollTop || 0;
      this._heroBottom = res[0].bottom + st;
      // 阈值：窄条出现 = 章节条顶到窄条下沿（页头底 − 导航 − 窄条 44px）；
      // 往上滚回 8px 才收起，形成回差，避免阈值附近来回抖
      this._hdShowAt = this._heroBottom - this.data.navH - 44;
      this._hdHideAt = this._hdShowAt - 8;
      this._tops = {
        scale: res[1] ? res[1].top + st : 0,
        structure: res[2] ? res[2].top + st : 0,
        heat: res[3] ? res[3].top + st : 0
      };
      this._syncChapter(st, this.data.hdCompact);
    });
  },

  /** 根据滚动位置同步「窄标题条 / 吸顶章节条 / 当前章节」；只在变化时 setData */
  _syncChapter(st, hdCompact) {
    const hd = typeof hdCompact === 'boolean' ? hdCompact : this.data.hdCompact;
    const lineH = hd ? 44 : 0; // 窄标题条高度（88rpx = 44px）
    const offset = this.data.navH + lineH + 46; // 导航 + 窄条 + 章节条（92rpx = 46px）
    const tops = this._tops || {};
    let active = 'scale';
    if (tops.heat && st + offset >= tops.heat) active = 'heat';
    else if (tops.structure && st + offset >= tops.structure) active = 'structure';

    // 章节条吸顶：与窄条同一时刻接管。窄条还在时章节条必须保持吸顶，
    // 否则回差那 8px 里会出现「窄条悬空、章节条掉回文档流」的空档。
    const fixed = hd || !!(this._heroBottom && st >= this._heroBottom - this.data.navH - 44);
    const patch = {};
    if (active !== this.data.activeChapter) patch.activeChapter = active;
    if (fixed !== this.data.chapterFixed) patch.chapterFixed = fixed;
    if (hd !== this.data.hdCompact) patch.hdCompact = hd;
    if (Object.keys(patch).length) this.setData(patch);
  },

  onScroll(e) {
    const st = e.detail.scrollTop;
    this._scrollTop = st;
    // 12px 回差：往下滚过 show 阈值才出现，回滚到 hide 阈值以内才收起
    let hd = this.data.hdCompact;
    if (!hd && st >= this._hdShowAt) hd = true;
    else if (hd && st <= this._hdHideAt) hd = false;
    this._syncChapter(st, hd);
  },

  /** 点章节：滚到该段开头（让出导航、窄条与章节条的高度） */
  onTapChapter(e) {
    const key = e.currentTarget.dataset.chap;
    const q = wx.createSelectorQuery().in(this);
    q.select('#sec-' + key).boundingClientRect();
    q.select('.page-scroll').scrollOffset();
    q.exec((res) => {
      if (!res || !res[0]) return;
      const st = (res[1] && res[1].scrollTop) || this._scrollTop || 0;
      // 目标段都在阈值之外，落地必定是收起态，按「导航 + 窄条 44 + 章节条 46」算落点
      const y = Math.max(0, Math.round(st + res[0].top - this.data.navH - 44 - 46));
      // 直接写定两态：不依赖 scroll-top 赋值是否回抛 bindscroll，落地不会出现「章节条还在文档流里」
      this.setData({ scrollTop: y, activeChapter: key, hdCompact: true, chapterFixed: true });
    });
  },

  /** 朝代九行 ↔ 全部 60 个（展开后网格内部可滚，不把整页撑长） */
  onToggleDynasty() {
    this.setData({ dynastyExpanded: !this.data.dynastyExpanded }, () => {
      setTimeout(() => this._measure(), 60);
    });
  },

  /** 身份词云 10 个 ↔ 全部 40 个（展开后整页变长，不用内部滚动，避免嵌套手势） */
  onToggleCloud() {
    const expanded = !this.data.cloudExpanded;
    this.setData({
      cloudExpanded: expanded,
      tagsVisible: expanded ? this.data.tagsAll : this.data.tagsAll.slice(0, 10)
    }, () => {
      setTimeout(() => this._measure(), 60);
    });
  },

  /** 内层 scroll-view 吞掉纵向手势，避免与整页滚动打架 */
  onNoop() {},

  /** 快照时间显示为「MM-DD HH:mm」；无值时返回空串，页面就不显示那一行 */
  _formatSnapshotAt(iso) {
    if (!iso) return '';
    var t = new Date(iso);
    if (isNaN(t.getTime())) return '';
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return p(t.getMonth() + 1) + '-' + p(t.getDate()) + ' ' + p(t.getHours()) + ':' + p(t.getMinutes());
  },

  onRetry() {
    this._stopComputingPoll();
    this.setData({ loading: true, loadFailed: false, computing: false });
    this.fetchStats({ bust: true });
  },

  // 榜单行进入人物详情（服务端已返回 id；旧快照无 id 时保持不可点）
  onTapFigure(e) {
    var id = e.currentTarget.dataset.id;
    if (!id) return;
    navTo('/detail-pkg/pages/detail/detail?id=' + id);
  },

  // 分享标题里的规模前缀按页面已加载的真实总数取整到万。
  // 旧版写死「58万」（实际已降至 53 万），数字过期即错误信息；
  // 取不到总数时返回空串，标题退化为不含数字的版本，绝不回退写死值。
  _shareScale() {
    const n = Number(String(this.data.total || '').replace(/[^0-9]/g, ''));
    if (!n || n < 10000) return '';
    return Math.floor(n / 10000) + '万';
  },

  onShareAppMessage() {
    return { title: "世慧屋 · 数据统计｜" + this._shareScale() + "历史人物全景", path: "/pages/stats/stats" };
  },

  onShareTimeline() {
    return { title: "世慧屋 · 数据统计｜" + this._shareScale() + "历史人物全景" };
  }
});
