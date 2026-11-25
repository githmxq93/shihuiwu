const request = require('../../../utils/request');
const API = require('../../../config/api');

const ICON_GLYPH = {
  flame: '火',
  landmark: '殿',
  'shield-alert': '盾',
  skull: '殇',
  biohazard: '疫',
  plane: '空',
  bomb: '爆',
  scale: '法'
};

// 段导航与 5 个 section 一对一（顺序必须与 wxml 中 #sec-* 一致）
const SEGS = [
  { key: 'tl', name: '时间线' },
  { key: 'crime', name: '十二大类' },
  { key: 'trial', name: '东京审判' },
  { key: 'crim', name: '战犯档案' },
  { key: 'src', name: '资料来源' }
];

// 时间线左栏 148rpx 只能放两行：把「1931年9月18日」拆成「1931年 / 9月18日」
function splitDate(date) {
  const s = date || '';
  const i = s.indexOf('年');
  if (i < 0) return { dateTop: s, dateBottom: '' };
  return { dateTop: s.slice(0, i + 1), dateBottom: s.slice(i + 1) };
}

Page({
  data: {
    timeline: [],
    massacres: [],
    units: [],
    germWars: [],
    bombings: [],
    criminals: [],
    statistics: [],
    sources: [],

    // 顶部让位：导航栏高度（状态栏 + 44px）；固定头 .hd-stack 的 top 与页面 padding-top 共用它
    navH: 88,
    safeAreaTop: 44,
    // 头部压缩态：滚过 12px 置 true，回到 4px 以内置 false
    hdCompact: false,

    // 段导航
    segs: SEGS,
    activeSeg: 'tl',

    loading: true,
    loadFailed: false,
    isEmpty: false
  },

  onLoad() {
    const sysInfo = wx.getWindowInfo();
    const statusBar = sysInfo.statusBarHeight || 44;
    // 三个高度量：_navH 系统导航栏；_segH 段导航；_hdH 头「当前」高
    // （_hdExpandH / _hdCompactH 分别是两态实测值，切换后各自更新，跳转用压缩态那份）
    this._navH = statusBar + 44;
    this._segH = 37;
    this._hdH = 93;
    this._hdExpandH = 93;
    this._hdCompactH = 44;
    this._viewH = sysInfo.windowHeight || 0;
    this._scrollTop = 0;
    this.setData({
      safeAreaTop: statusBar,
      navH: this._navH
    });
    this.fetchData();
  },

  onUnload() {
    this._scrollLock = false;
    this._segLockUntil = 0;
  },

  fetchData() {
    this.setData({ loading: true, loadFailed: false, isEmpty: false });
    request.getStatic('remember', {
      timeout: 10000,
      success: (res) => {
        const d = res.data || {};
        // [重要] 必须有 else 分支：后端返回 success:false / 无 data 时若什么都不做，
        // 页面会既无内容也无失败提示，弱网下表现为永久空白。
        if (!d.success || !d.data) {
          this.setData({ loading: false, loadFailed: true });
          return;
        }
        const base = API.BASE;
        const timeline = (d.data.timeline || []).map(function(item) {
          const dt = splitDate(item.date);
          return Object.assign({}, item, {
            iconEmoji: ICON_GLYPH[item.icon] || '记',
            image: item.image ? base + item.image : '',
            dateTop: dt.dateTop,
            dateBottom: dt.dateBottom
          });
        });
        const criminals = (d.data.criminals || []).map(function(c) {
          return Object.assign({}, c, {
            image: c.image ? base + c.image : '',
            initial: c.name ? c.name.charAt(0) : ''
          });
        });
        const massacres = d.data.massacres || [];
        const units = d.data.units || [];
        const germWars = d.data.germWars || [];
        const bombings = d.data.bombings || [];
        const statistics = d.data.statistics || [];
        const sources = d.data.sources || [];
        const hasContent = timeline.length + massacres.length + units.length +
          germWars.length + bombings.length + criminals.length + statistics.length > 0;
        this.setData({
          timeline,
          massacres,
          units,
          germWars,
          bombings,
          criminals,
          statistics,
          sources,
          loading: false,
          isEmpty: !hasContent
        }, () => {
          // 数据落地后量一次各 section 在滚动内容里的绝对位置（只量一次，滚动时只做比较）
          setTimeout(() => this.measureSections(), 60);
        });
      },
      fail: () => this.setData({ loading: false, loadFailed: true })
    });
  },

  onRetry() {
    this.fetchData();
  },

  // ===== 段导航：滚动高亮 + 点击跳转 =====
  // 与 timeline 页同一套：页面滚动（onPageScroll 给 scrollTop）+ SelectorQuery 量绝对位置。
  // 绝对 top = rect.top + 当前 scrollTop（页面坐标系），量一次、滚动时只比大小。
  // [重要] 头是 fixed 覆盖层，正文位置与压缩状态无关（占位 .hd-space 恒定），
  // 所以 section 的绝对 top 只在布局变化（数据/图片）时重测；
  // 但「可见区顶边」= 导航栏 + 头 + 段导航，会随压缩态变化 —— 这三个量都实时量、不写死。
  measureSections() {
    // 不用 .in(this)：与 timeline 页一致，页面级 SelectorQuery 直接查页面节点
    const q = wx.createSelectorQuery();
    q.select('.hd').boundingClientRect();
    q.select('.seg').boundingClientRect();
    q.select('.page').boundingClientRect();
    q.selectAll('.section').boundingClientRect();
    q.exec((res) => {
      const hd = res && res[0];
      const seg = res && res[1];
      const page = res && res[2];
      const rects = (res && res[3]) || [];
      if (hd && hd.height) this.rememberHdHeight(hd.height);
      if (seg && seg.height) this._segH = seg.height;
      if (page && page.height) this._docH = page.height;
      if (!rects.length) return;
      const st = this._scrollTop || 0;
      const keys = this.data.segs.map((s) => s.key);
      this._secTops = rects
        .map((r, i) => ({ key: keys[i], top: r.top + st }))
        .filter((x) => x.key);
      this.syncSeg(st);
    });
  },

  // 记下「当前这一态」的实际头高：展开态与压缩态各存一份，切换后两边都要对
  rememberHdHeight(h) {
    this._hdH = h;
    if (this.data.hdCompact) this._hdCompactH = h;
    else this._hdExpandH = h;
  },

  // 轻量重测：只量头与段导航，用于压缩/展开切换完成之后（不动 section 缓存）
  measureHeader() {
    wx.createSelectorQuery()
      .select('.hd')
      .boundingClientRect()
      .select('.seg')
      .boundingClientRect()
      .exec((res) => {
        const hd = res && res[0];
        const seg = res && res[1];
        if (hd && hd.height) this.rememberHdHeight(hd.height);
        if (seg && seg.height) this._segH = seg.height;
        // 头高变了判定线就变了，切换完成后立即按新高度校一次高亮
        this.syncSeg(this._scrollTop);
      });
  },

  // 判定线 = 段导航下沿（scrollTop + 导航栏 + 头当前高 + 段导航），再留 6px 呼吸
  syncSeg(scrollTop) {
    const tops = this._secTops;
    if (!tops || !tops.length) return;
    if (Date.now() < (this._segLockUntil || 0)) return;
    const st = scrollTop || 0;
    const line = st + (this._navH || 0) + (this._hdH || 93) + (this._segH || 37) + 6;
    let idx = 0;
    for (let i = 0; i < tops.length; i++) {
      if (tops[i].top <= line) idx = i;
    }
    // 末段内容不足一屏时判定线永远到不了它的顶部，触底直接判为最后一项
    const docH = this._docH;
    if (docH && this._viewH && st + this._viewH >= docH - 8) {
      idx = tops.length - 1;
    }
    const key = tops[idx].key;
    if (key && key !== this.data.activeSeg) {
      this.setData({ activeSeg: key });
    }
  },

  onPageScroll(e) {
    const st = (e && e.scrollTop) || 0;
    this._scrollTop = st;
    // 压缩阈值：滚过 12px 就压；回到 4px 以内才展开（8px 回差，避免在阈值上来回抖）
    if (st > 12) {
      if (!this.data.hdCompact) this.setHdCompact(true);
    } else if (st <= 4 && this.data.hdCompact) {
      this.setHdCompact(false);
    }
    if (this._scrollLock) return;
    this._scrollLock = true;
    setTimeout(() => {
      this._scrollLock = false;
      // 点击跳转后的平滑滚动期间不抢高亮，避免中途闪到别的段
      if (Date.now() < (this._segLockUntil || 0)) return;
      this.syncSeg(this._scrollTop);
    }, 80);
  },

  // 切压缩态：CSS 过渡 0.24s，结束后把头高重量一次，供判定线与跳转使用
  setHdCompact(compact) {
    this.setData({ hdCompact: compact });
    setTimeout(() => this.measureHeader(), 280);
  },

  // 跳转落点：目标 section 顶部贴在段导航下沿（不压在它下面），留 6px 呼吸
  onTapSeg(e) {
    const key = e.currentTarget.dataset.key;
    if (!key) return;
    this._segLockUntil = Date.now() + 700;
    this.setData({ activeSeg: key });
    const q = wx.createSelectorQuery();
    q.select('#sec-' + key).boundingClientRect();
    q.exec((res) => {
      const rect = res && res[0];
      if (!rect) return;
      // 跳转后一定在压缩态（目标段都在 12px 阈值之外），落点按压缩态头高算；
      // 若用展开态头高会少算 49px，落地时标题正好被段导航盖住
      const offset = (this._navH || 0) + (this._hdCompactH || 44) + (this._segH || 37) + 6;
      // 目标绝对位置用「当前 scrollTop + 实时 rect」算，图片加载导致的高度变化也不会跳偏
      const target = Math.max(0, Math.floor(this._scrollTop + rect.top - offset));
      wx.pageScrollTo({ scrollTop: target, duration: 200 });
      // 滚动结束后按新布局重测一次，把高亮与后续跳转的基准校准回来
      setTimeout(() => this.measureSections(), 720);
    });
  },

  // 时间线配图加载失败 → 清掉该项图片，露出画面下的文字兜底层（tl-image-fallback）
  onTlImageError(e) {
    const idx = Number(e.currentTarget.dataset.index);
    if (isNaN(idx)) return;
    const patch = {};
    patch['timeline[' + idx + '].image'] = '';
    this.setData(patch);
  },

  // 罪犯照片加载失败 → 清掉图片，露出姓名首字（crim-av-t）
  onCriminalImageError(e) {
    const idx = Number(e.currentTarget.dataset.index);
    if (isNaN(idx)) return;
    const patch = {};
    patch['criminals[' + idx + '].image'] = '';
    this.setData(patch);
  },

  // ===== 分享（第十一轮补）=====
  // 本页是全站史实密度最高的内容页，此前既无转发也无朋友圈入口，用户点右上角
  // 「转发」不可用（同目录 liberation / treaty / campaign 三页都有）。属遗漏。
  // 标题只用史实表述（专题名 + 年份区间），不写情绪化 / 煽动性措辞：
  //   · 微信对「纪念类」内容的分享文案有审核口径，形容词越重越易被判定不当；
  //   · 本页定位是「史料陈列」，标题也应保持陈述句。
  // [重要] 原标题固定写成「九一八事变…」——九一八只是时间线第一条，用它代表整个
  //    「铭记历史」专题会误导（分享出去像点进九一八专题页）。改为专题名 + 年份区间。
  // 页面无查询参数（数据取 /api/static/remember），故 query 为空串。
  onShareAppMessage() {
    return {
      title: '铭记历史 — 1931—1945 抗战史实年表与伤亡统计',
      path: '/topic-pkg/pages/remember/remember'
    };
  },

  onShareTimeline() {
    return { title: '铭记历史 — 1931—1945 抗战史实年表与伤亡统计 | 世慧屋' };
  }
});
