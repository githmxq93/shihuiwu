const request = require('../../utils/request');
const { navTo } = require('../../utils/nav');
const API = require('../../config/api');
const guide = require('../../utils/guide');
const { buildAvatar } = require('../../utils/figure-display');

/* =========================================================================
   六度空间 · 方案 D（A+C 组合）
   -------------------------------------------------------------------------
   结构（对齐 _design/sixdeg 定稿）：
     · 主视图：深色头 + 上浮双端搜索卡 + 结果头 + 路径行手风琴
       （第①条默认展开 44px 紧凑链，30px 头像，链尾两个动作，无固定底栏）
     · 空态：2×2 示例卡 / 最近查询 3 条 / 热门 chips / 可折叠「几度怎么算」/ 数据说明
     · 图谱页：全屏二级页（同页覆盖层，返回不重建列表、不重新请求）
       头部 88 + 路径条 40 + 画布 684（375×812 基准）

   两条实现口径（报告里已说明）：
     1) 小程序没有原生 <svg>，图谱用 canvas 2d 绘制：一次 draw 管全部节点/边/标签，
        缩放拖动只改 transform，低于 0.9× 隐藏副行也只是改一个绘制开关；
        绝对定位 view 需要为 9 条折线拆出几十个片段与胶囊，setData 往返成本更高。
     2) 全图谱的节点去重与「共用 ×N」在前端页面层计算（buildFullGraph）。
        后端 kinship-path 的返回结构一个字没改。
   ========================================================================= */

// 血缘 / 姻亲 关系词白名单（其余一律归「政治」）
const BLOOD_WORDS = [
  '父亲', '母亲', '儿子', '女儿', '兄弟', '姐妹',
  '祖父', '祖母', '外祖父', '外祖母', '外公', '外婆', '孙子', '孙女',
  '伯父', '叔父', '姑母', '舅父', '姨母',
  '堂兄弟', '堂姐妹', '姨表兄弟', '族子', '族姑',
  '继父', '继母', '养父', '养母'
];
const MARRIAGE_WORDS = [
  '丈夫', '妻子', '儿媳', '女婿', '公公', '婆婆', '岳父', '岳母',
  '妻弟', '妻之从子', '姑父', '妯娌', '连襟', '亲家'
];

// 三类连线的颜色（与页面图例一致）
const LINE_COLOR = { blood: '#c0563f', politics: '#4A7A9B', marriage: '#9C7B5D' };

// 多条候选路径的编号色（①最短 / ②③④另一条）
const PATH_COLOR = ['#a63b2a', '#C9A227', '#4A7A9B', '#5C7A5C'];

// 图谱缩放区间（相对「铺满」基准；全图谱口径 0.8–2×）
const ZOOM_MIN = 0.8;
const ZOOM_MAX = 2;
const ZOOM_HIDE_SUB = 0.9;   // 低于 0.9× 隐藏副行（朝代 / 路径号）

// 降级阈值：超过就不再画图，改为「人太多，改看列表」
const MAX_GRAPH_PERSONS = 12;
const MAX_GRAPH_PATHS = 6;

// ===== 分享卡（C 版）=====
// 卡面逻辑尺寸 335×566（375 屏左右各留 20），按 3 倍绘制后导出 1005×1698。
// 画布只做一次性绘制，画完立刻导出成图片：弹层里只出现 <image>，
// 不把原生 canvas 摆在弹层里预览（原生层与弹层布局不同步会整块错位）。
const SHARE_LW = 335;
const SHARE_LH = 566;
const SHARE_SCALE = 3;
const SHARE_W = SHARE_LW * SHARE_SCALE;
const SHARE_H = SHARE_LH * SHARE_SCALE;
const SHARE_PAD = 18;

// 库里把「人名」填进关系词位置的脏数据（共 18 个，均为 1-3 条记载）：
// 直接上卡会把链路读成路上多了一个人，统一降级为「记载关联」。
const SHARE_DIRTY_RELS = [
  '郭松龄', '吴有训', '倪匡', '傅雷', '冯玉祥', '周恩来', '姜登选', '张之江', '张作霖',
  '张首芳', '李景林', '杨奎山', '梁羽生', '胡适', '邓稼先', '郭永怀', '钱学森', '韩麟春'
];

/**
 * 关系词清洗：库内原词直接上卡，只有两类脏数据做截断/降级——
 *   1) 超过 8 字的模板长句（如「为 Y 的门孙 (门人之门人)」）：去掉括号、
 *      取「的」后的真关系名，仍超长则截到 8 字加省略号；
 *   2) 关系词位置被填了人物姓名（库里有 18 个这样的人名）：降级为「记载关联」，
 *      否则链路会被读成路上凭空多了一个人。
 */
function cleanRelWord(raw, names) {
  let s = String(raw || '').replace(/\s+/g, ' ').trim();
  if (!s) return '';
  if (SHARE_DIRTY_RELS.indexOf(s) >= 0) return '记载关联';
  if (names && names.indexOf(s) >= 0) return '记载关联';
  if (s.length > 8) {
    // 模板长句：先去掉括号补充，再把「为 Y 的门孙」这类取「的」后的真关系名
    let base = s.replace(/[（(][^（()）]*[)）]/g, '').replace(/\s+/g, '');
    const di = base.lastIndexOf('的');
    const tail = di >= 0 ? base.slice(di + 1) : '';
    if (tail.length >= 1 && tail.length <= 6) base = tail;
    s = base.length > 8 ? base.slice(0, 8) + '…' : base;
  }
  return s;
}

/** 链路压缩：≤5 个节点全显示；超过 5 个 → 首二 + 「经 N 人」 + 尾二 */
function compressShareNodes(nodes) {
  const list = nodes || [];
  if (list.length <= 5) return { nodes: list, cut: 0 };
  return {
    nodes: list.slice(0, 2).concat([{ gap: true, count: list.length - 4 }]).concat(list.slice(-2)),
    cut: list.length - 4
  };
}

// 百度百科式的帝号前缀：全图谱节点只留 2–3 字简称，全名进 title / 人物卡
const TITLE_PREFIX_RE = /^(隋|唐|宋|元|明|清|汉|漢|魏|晋|周|秦|齐|梁|陈|北周|北齐|北魏|后梁|后唐|后晋|后汉|后周|南唐|蜀|吴|楚|闽|南汉)(太祖|高祖|太宗|世祖|世宗|仁宗|英宗|神宗|哲宗|徽宗|钦宗|高宗|孝宗|光宗|宁宗|理宗|度宗|恭帝|文帝|炀帝|武帝|献帝|明帝|章帝|和帝|安帝|顺帝|灵帝|少帝|废帝|末帝|昭帝|宣帝|元帝|成帝|哀帝|平帝|景帝|惠帝|怀帝|愍帝|出帝)/;

// 全图谱用简称：先剥离帝号前缀，再处理「姓·名」，最后兜底取末 3 字
function shortName(name) {
  let n = String(name || '');
  n = n.replace(TITLE_PREFIX_RE, '');
  if (n.indexOf('·') >= 0) n = n.split('·').pop();
  if (n.length > 4) n = n.slice(-3);
  return n || String(name || '');
}

// 关系词 → 三类之一（确定性映射，不做任何推测）
function classify3(type) {
  const t = String(type || '');
  if (MARRIAGE_WORDS.indexOf(t) >= 0) return 'marriage';
  if (BLOOD_WORDS.indexOf(t) >= 0) return 'blood';
  if (/[夫妻岳婆媳婿姻妯娌连襟亲家表]/.test(t)) return 'marriage';
  if (/[父母子女兄弟姐妹祖孙侄甥伯叔姑舅姨堂族]/.test(t)) return 'blood';
  return 'politics';
}

// 圆角矩形路径（不依赖 ctx.roundRect，兼容低版本基础库）
function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.arcTo(x + w, y, x + w, y + rr, rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr);
  ctx.lineTo(x + rr, y + h);
  ctx.arcTo(x, y + h, x, y + h - rr, rr);
  ctx.lineTo(x, y + rr);
  ctx.arcTo(x, y, x + rr, y, rr);
  ctx.closePath();
}

// 底部总结条分段：name0 → [rel1] → name1 …（[rel] 段高亮）
function buildSummary(path) {
  const segs = [];
  (path || []).forEach((node, i) => {
    if (i > 0) {
      const rel = node.relationFromPrev || '';
      segs.push({ k: segs.length, text: ' → ', hl: false });
      if (rel) segs.push({ k: segs.length, text: '[' + rel + ']', hl: true });
      segs.push({ k: segs.length, text: ' → ', hl: false });
    }
    segs.push({ k: segs.length, text: node.name, hl: false });
  });
  return segs;
}

// 路径行摘要：全称太长，行内用简称
function buildRowSummary(path) {
  return (path || []).map((n) => shortName(n.name)).join(' → ');
}

// 路径经过的中间人（不含两端），用于路径条「① 经杨妃」
function buildVia(path) {
  const p = path || [];
  if (p.length <= 2) return '';
  return p.slice(1, p.length - 1).map((n) => shortName(n.name)).join(' · ');
}

// 最近查询的时间戳 → 今天 / 昨天 / MM-DD
function timeLabel(ts) {
  if (!ts) return '';
  const now = new Date();
  const d = new Date(ts);
  const day0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const day1 = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diff = Math.round((day0 - day1) / 86400000);
  if (diff <= 0) return '今天';
  if (diff === 1) return '昨天';
  return ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
}

// 路径编号字符
function pathChar(n) {
  return ['①', '②', '③', '④', '⑤', '⑥'][n - 1] || String(n);
}

// 最近查询本地存储
const RECENT_KEY = 'sixdeg_recent_v1';

// 空态「如何搜索」三张指路卡（照「年份查询」页的 01/02/03 写法）。
// 示例 chips 只写人物姓名，点击走现有 autocomplete 解析 id，不新增接口、不硬编码 id。
const GUIDE = [
  {
    no: '01',
    title: '填两端',
    desc: '起点、终点各写一个人名，从下拉候选里点选后再按「查询」。',
    egs: [{ a: '杨坚', b: '李世民' }, { a: '曹操', b: '刘备' }]
  },
  {
    no: '02',
    title: '同名怎么选',
    desc: '同名人物会并列列出，按朝代和性别区分；选错点右侧「×」清空重填。',
    egs: [{ a: '朱元璋', b: '朱棣' }, { a: '岳飞', b: '秦桧' }]
  },
  {
    no: '03',
    title: '几度怎么算',
    desc: '1 度 = 两人之间只隔一条关系；每多隔一个人加 1 度，多条路径按度数排序。',
    egs: [{ a: '刘备', b: '诸葛亮' }, { a: '曾国藩', b: '洪秀全' }]
  }
];

Page({
  data: {
    fromQuery: '',
    toQuery: '',
    fromPerson: null,
    toPerson: null,
    fromResults: [],
    toResults: [],
    fromStatus: '',
    toStatus: '',
    canSearch: false,
    resolving: false,

    result: null,
    loading: false,
    error: '',
    openIndex: 0,          // 当前展开的路径行（手风琴，同一时刻只开一条）

    guide: GUIDE,
    recent: [],

    safeAreaTop: 44,

    // 空态 scroll-view 的滚动位置：引导需要滚到 #guide-examples 时由 onGuideScrollTo 写入
    emptyScrollTop: 0,

    // 图谱页
    graphVisible: false,
    graphMode: 'single',   // single / full
    graphPathIndex: 0,
    graphPathLegend: [],
    graphTitle: '',
    graphMeta: { persons: 0, edges: 0, paths: 0 },
    graphDegraded: false,
    graphFocus: '',
    graphFocusAction: false,
    edgeCard: null,
    zoomLabel: '1.0×',
    graphZoomed: false,

    // 分享卡（C 版）：canvas 一次性绘制 → 导出图片 → 弹层只显示 <image>
    shareOpen: false,
    cardW: SHARE_LW,
    cardH: SHARE_LH,
    cardPath: '',
    cardError: '',
    cardExporting: false
  },

  onLoad() {
    const sysInfo = wx.getWindowInfo();
    const top = sysInfo.statusBarHeight || 44;
    this.setData({ safeAreaTop: top });
    this.loadRecent();
  },

  onUnload() {
    // 两端联想防抖：卸载后仍触发会白发一次 autocomplete 请求
    if (this._fromTimer) clearTimeout(this._fromTimer);
    this._fromTimer = null;
    if (this._toTimer) clearTimeout(this._toTimer);
    this._toTimer = null;
    // 引导延时启动定时器
    if (this._guideTimer) clearTimeout(this._guideTimer);
    this._guideTimer = null;
    // 分享卡在途的绘制/导出：页面已卸载，别再 setData
    this._shareSeq = (this._shareSeq || 0) + 1;
  },

  onReady() {
    // 图谱页默认不挂载（canvas 原生层会盖住页面），画布在 onOpenGraph 后再初始化
    this._tryAutoGuide();
  },

  onShow() {
    // 从「我的 → 使用指南」重看返回时拉起；首次进入时 selectComponent 可能还没挂载，
    // onReady 会再试一次，定时器做了去重。
    this._tryAutoGuide();
  },

  /**
   * 六度空间首次引导：只在空态讲。
   * 已有结果或图谱页已打开时目标节点不存在，直接放弃，避免卡片飘在屏幕中间。
   */
  _tryAutoGuide(delay) {
    if (!guide.shouldShow('sixdeg') && !guide.hasReplay('sixdeg')) return;
    if (this.data.result || this.data.graphVisible) return;
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
    const wait = typeof delay === 'number' ? delay : 250;
    this._guideTimer = setTimeout(() => {
      this._guideTimer = null;
      const layer = this.selectComponent('#guideLayer');
      if (layer) layer.autoStart('sixdeg');
    }, wait);
  },

  /**
   * 引导需要把某块内容滚进视口时由 guide-layer 触发。
   * 空态内容在 .empty 这个 scroll-view 里（页面本身不滚动），
   * 所以用 .empty 的矩形当可视区、scrollOffset 取当前位置，再反算新的 scrollTop。
   */
  onGuideScrollTo(e) {
    const selector = (e && e.detail && e.detail.selector) || '';
    if (!selector) return;
    const that = this;
    wx.createSelectorQuery()
      .select(selector)
      .boundingClientRect()
      .select('.empty')
      .boundingClientRect()
      .select('.empty')
      .scrollOffset()
      .exec(function (res) {
        const rect = res && res[0];
        const view = res && res[1];
        const sc = res && res[2];
        if (!rect || !view || !sc) return;
        const topLimit = view.top + 12;
        const bottomLimit = view.bottom - 12;
        const cur = sc.scrollTop || 0;
        let next = cur;
        if (rect.bottom > bottomLimit) {
          // 第 3 步的卡片优先落在目标上方，下沿贴视口底即可；
          // 目标本身高于可视区时改为对齐上沿，避免上半截被裁掉。
          let delta = rect.bottom - bottomLimit;
          if (rect.top - delta < topLimit) delta = rect.top - topLimit;
          next = cur + delta;
        } else if (rect.top < topLimit) {
          next = cur + (rect.top - topLimit);
        }
        next = Math.max(0, Math.round(next));
        if (Math.abs(next - cur) < 2) return;
        // 先对齐当前值再写新值：手动滚动后 data 里的旧值不会卡住本次更新
        that.setData({ emptyScrollTop: cur }, function () {
          that.setData({ emptyScrollTop: next });
        });
      });
  },

  onBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => wx.switchTab({ url: '/pages/index/index' })
    });
  },

  // 分享卡遮罩：吞掉 touchmove，避免弹层后面的页面跟着滚
  noop() {},

  /* ---------------- 联想输入 ---------------- */
  autocomplete(slot, q) {
    const resKey = slot === 'from' ? 'fromResults' : 'toResults';
    const stKey = slot === 'from' ? 'fromStatus' : 'toStatus';
    const keyword = (q || '').trim();
    const seqKey = slot === 'from' ? '_acSeqFrom' : '_acSeqTo';
    const seq = (this[seqKey] || 0) + 1;
    this[seqKey] = seq;

    if (!keyword) {
      const patch = {};
      patch[resKey] = [];
      patch[stKey] = '';
      this.setData(patch);
      return;
    }

    const loadingPatch = {};
    loadingPatch[stKey] = 'loading';
    this.setData(loadingPatch);

    request({
      timeout: 10000,
      url: API.FIGURES.AUTOCOMPLETE + '?prefix=' + encodeURIComponent(keyword) + '&limit=8',
      success: (res) => {
        if (this[seqKey] !== seq) return;
        const d = res.data || {};
        const patch = {};
        if (d.success && Array.isArray(d.data)) {
          patch[resKey] = d.data;
          patch[stKey] = d.data.length ? '' : 'empty';
        } else {
          patch[resKey] = [];
          patch[stKey] = 'fail';
        }
        this.setData(patch);
      },
      fail: () => {
        if (this[seqKey] !== seq) return;
        const patch = {};
        patch[resKey] = [];
        patch[stKey] = 'fail';
        this.setData(patch);
      }
    });
  },

  onFromInput(e) {
    const v = e.detail.value;
    // 手动改名即视为未确认，避免「输入和已选人物不一致」也能查询
    this.setData({ fromQuery: v, fromPerson: null });
    this.syncCanSearch();
    if (this._fromTimer) clearTimeout(this._fromTimer);
    this._fromTimer = setTimeout(() => this.autocomplete('from', v), 250);
  },

  onToInput(e) {
    const v = e.detail.value;
    this.setData({ toQuery: v, toPerson: null });
    this.syncCanSearch();
    if (this._toTimer) clearTimeout(this._toTimer);
    this._toTimer = setTimeout(() => this.autocomplete('to', v), 250);
  },

  syncCanSearch() {
    const ok = !!(this.data.fromPerson && this.data.toPerson);
    if (ok !== this.data.canSearch) this.setData({ canSearch: ok });
  },

  onSelectFrom(e) {
    const p = this.data.fromResults[e.currentTarget.dataset.index];
    if (!p) return;
    this._acSeqFrom = (this._acSeqFrom || 0) + 1;
    this.setData({ fromPerson: p, fromQuery: p.name, fromResults: [], fromStatus: '' });
    this.syncCanSearch();
  },

  onSelectTo(e) {
    const p = this.data.toResults[e.currentTarget.dataset.index];
    if (!p) return;
    this._acSeqTo = (this._acSeqTo || 0) + 1;
    this.setData({ toPerson: p, toQuery: p.name, toResults: [], toStatus: '' });
    this.syncCanSearch();
  },

  onClearFrom() {
    this._acSeqFrom = (this._acSeqFrom || 0) + 1;
    this.setData({ fromPerson: null, fromQuery: '', fromResults: [], fromStatus: '' });
    this.syncCanSearch();
  },

  onClearTo() {
    this._acSeqTo = (this._acSeqTo || 0) + 1;
    this.setData({ toPerson: null, toQuery: '', toResults: [], toStatus: '' });
    this.syncCanSearch();
  },

  onSwap() {
    const f = this.data.fromPerson;
    const t = this.data.toPerson;
    this._graphCache = null;
    this._acSeqFrom = (this._acSeqFrom || 0) + 1;
    this._acSeqTo = (this._acSeqTo || 0) + 1;
    this.setData({
      fromPerson: t, toPerson: f,
      fromQuery: t ? t.name : '', toQuery: f ? f.name : '',
      fromResults: [], toResults: [], fromStatus: '', toStatus: '',
      result: null, error: '', graphVisible: false
    });
    this.syncCanSearch();
  },

  /* ---------------- 查询 ---------------- */
  onSearch() {
    const { fromPerson, toPerson } = this.data;
    if (!fromPerson || !toPerson || this.data.loading) return;
    this._graphCache = null;
    this.setData({ loading: true, result: null, error: '', graphVisible: false });
    request({
      timeout: 10000,
      url: API.FIGURES.KINSHIP_PATH + '?fromId=' + fromPerson.id + '&toId=' + toPerson.id,
      success: (res) => {
        const d = res.data || {};
        if (d.success) {
          const result = this.decorateResult(d.data);
          this.setData({ result, loading: false, openIndex: 0 });
          this.saveRecent(fromPerson, toPerson, result);
          if (result && Array.isArray(result.paths) && result.paths.length > 0) {
            const ids = [];
            result.paths.forEach((p) => (p.path || []).forEach((n) => {
              const id = String(n.id);
              if (ids.indexOf(id) < 0) ids.push(id);
            }));
            this.enrichAvatars(ids);
          }
        } else {
          this.setData({ error: d.message || '查询失败，请稍后重试', loading: false });
        }
      },
      fail: () => this.setData({ error: '网络错误，请稍后重试', loading: false })
    });
  },

  // 给每条候选路径补 avatarView / 行摘要 / 路径条文案
  decorateResult(data) {
    if (!data || !Array.isArray(data.path) || data.path.length === 0) return data;
    const raw = (Array.isArray(data.paths) && data.paths.length > 0)
      ? data.paths
      : [{ path: data.path, description: data.description, distance: data.distance }];
    const paths = raw.map((p, i) => {
      const path = (p.path || []).map((node) => {
        const av = buildAvatar(node);
        return { ...node, avatarView: { image: av.image, char: av.char } };
      });
      return {
        ...p,
        no: i + 1,
        path,
        summary: buildRowSummary(path),
        via: buildVia(path),
        summarySegments: buildSummary(path)
      };
    });
    return {
      ...data,
      paths,
      pathCount: paths.length,
      pathIndex: 0,
      path: paths[0].path,
      description: paths[0].description,
      distance: paths[0].distance,
      summarySegments: paths[0].summarySegments
    };
  },

  // 路径行手风琴：点同一行收起，点别的行展开
  onTogglePath(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({ openIndex: this.data.openIndex === idx ? -1 : idx });
  },

  onViewPerson(e) {
    const id = e.currentTarget.dataset.id;
    if (id !== undefined && id !== '') navTo('/detail-pkg/pages/detail/detail?id=' + id);
  },

  // 用 batch 补真实头像（失败静默，保留首字兜底）
  enrichAvatars(ids) {
    if (!ids || ids.length === 0) return;
    request({
      timeout: 10000,
      url: API.FIGURES.BATCH + '?ids=' + ids.join(','),
      success: (res) => {
        const d = res.data || {};
        if (!d.success || !Array.isArray(d.data)) return;
        const map = {};
        d.data.forEach((f) => { map[String(f.id)] = f; });
        const result = this.data.result;
        if (!result) return;
        const paint = (path) => (path || []).map((node) => {
          const f = map[String(node.id)];
          if (!f) return node;
          const av = buildAvatar(f);
          return { ...node, avatarView: { image: av.image, char: av.char } };
        });
        const patch = {};
        if (Array.isArray(result.paths)) {
          patch['result.paths'] = result.paths.map((p) => ({ ...p, path: paint(p.path) }));
        }
        if (Array.isArray(result.path)) patch['result.path'] = paint(result.path);
        this.setData(patch);
        this._graphCache = null;
      }
    });
  },

  // 头像加载失败 → 清图片位，回落到姓名首字
  onAvatarError(e) {
    const idx = e.currentTarget.dataset.index;
    const row = Number(e.currentTarget.dataset.row);
    const path = (this.data.result && this.data.result.paths[row] && this.data.result.paths[row].path) || [];
    const node = path[idx];
    if (!node) return;
    const patch = {};
    patch['result.paths[' + row + '].path[' + idx + '].avatarView.image'] = '';
    patch['result.paths[' + row + '].path[' + idx + '].avatarView.char'] = node.name ? node.name.charAt(0) : '?';
    this.setData(patch);
  },

  /* ---------------- 空态：如何搜索 / 最近 ---------------- */
  onGuideTap(e) {
    const { a, b } = e.currentTarget.dataset;
    if (a && b) this.resolvePair(a, b);
  },

  onRecentTap(e) {
    const item = this.data.recent[Number(e.currentTarget.dataset.index)];
    if (!item) return;
    this.setData({
      fromPerson: item.from, toPerson: item.to,
      fromQuery: item.from.name, toQuery: item.to.name,
      fromResults: [], toResults: [], fromStatus: '', toStatus: ''
    });
    this.syncCanSearch();
    this.onSearch();
  },

  onClearRecent() {
    wx.removeStorage({ key: RECENT_KEY });
    this.setData({ recent: [] });
  },

  // 姓名 → 人物（复用现有 autocomplete，优先同名，其次包含该姓名）
  findByName(name, cb) {
    request({
      timeout: 10000,
      url: API.FIGURES.AUTOCOMPLETE + '?prefix=' + encodeURIComponent(name) + '&limit=8',
      success: (res) => {
        const d = res.data || {};
        const list = (d.success && Array.isArray(d.data)) ? d.data : [];
        let pick = null;
        for (let i = 0; i < list.length; i++) {
          if (list[i].name === name) { pick = list[i]; break; }
        }
        if (!pick) {
          for (let i = 0; i < list.length; i++) {
            if (String(list[i].name || '').indexOf(name) >= 0) { pick = list[i]; break; }
          }
        }
        if (!pick && list.length) pick = list[0];
        cb(pick);
      },
      fail: () => cb(null)
    });
  },

  // 示例卡 / 热门：解析两端后直接查
  resolvePair(aName, bName) {
    if (this.data.resolving || this.data.loading) return;
    this.setData({ resolving: true, error: '' });
    this.findByName(aName, (a) => {
      if (!a) {
        this.setData({ resolving: false });
        wx.showToast({ title: '没有找到「' + aName + '」', icon: 'none' });
        return;
      }
      this.findByName(bName, (b) => {
        if (!b) {
          this.setData({ resolving: false });
          wx.showToast({ title: '没有找到「' + bName + '」', icon: 'none' });
          return;
        }
        this.setData({
          fromPerson: a, toPerson: b,
          fromQuery: a.name, toQuery: b.name,
          fromResults: [], toResults: [], resolving: false
        });
        this.syncCanSearch();
        this.onSearch();
      });
    });
  },

  loadRecent() {
    let raw = [];
    try { raw = wx.getStorageSync(RECENT_KEY) || []; } catch (e) { raw = []; }
    if (!Array.isArray(raw)) raw = [];
    const recent = raw.slice(0, 3).map((r) => ({
      ...r,
      time: timeLabel(r.ts)
    }));
    this.setData({ recent });
  },

  saveRecent(fromPerson, toPerson, result) {
    if (!result || !Array.isArray(result.paths) || result.paths.length === 0) return;
    if (!(result.distance > 0)) return;
    let raw = [];
    try { raw = wx.getStorageSync(RECENT_KEY) || []; } catch (e) { raw = []; }
    if (!Array.isArray(raw)) raw = [];
    const item = {
      from: { id: fromPerson.id, name: fromPerson.name, dynasty: fromPerson.dynasty, gender: fromPerson.gender },
      to: { id: toPerson.id, name: toPerson.name, dynasty: toPerson.dynasty, gender: toPerson.gender },
      distance: result.distance,
      pathCount: result.pathCount,
      ts: Date.now()
    };
    const key = String(fromPerson.id) + ':' + String(toPerson.id);
    const rest = raw.filter((r) => String(r.from && r.from.id) + ':' + String(r.to && r.to.id) !== key);
    const next = [item].concat(rest).slice(0, 3);
    try { wx.setStorageSync(RECENT_KEY, next); } catch (e) { /* 存储失败不影响查询 */ }
    this.loadRecent();
  },

  /* ---------------- 分享卡（C 版） ---------------- */

  /** 从当前结果取最短一条路径作为卡面数据（卡里只放最短的一条） */
  _buildShareModel() {
    const r = this.data.result;
    if (!r || !Array.isArray(r.paths) || r.paths.length === 0) return null;
    const p = r.paths[0];
    const path = Array.isArray(p.path) ? p.path : [];
    if (path.length < 2) return null;

    // 结果里出现过的所有姓名：用于识别「关系词位置填了人名」的脏数据
    const names = [];
    r.paths.forEach((pp) => (pp.path || []).forEach((n) => {
      const nm = String(n.name || '');
      if (nm && names.indexOf(nm) < 0) names.push(nm);
    }));

    const nodes = path.map((n) => ({ name: String(n.name || ''), rel: '' }));
    for (let i = 1; i < nodes.length; i++) {
      nodes[i].rel = cleanRelWord(path[i].relationFromPrev, names);
    }

    return {
      from: nodes[0].name,
      to: nodes[nodes.length - 1].name,
      distance: Number(p.distance || r.distance || 0),
      count: Number(r.pathCount || r.paths.length || 1),
      nodes,
      alts: r.paths.slice(1, 4).map((pp, i) => ({
        no: ['②', '③', '④'][i] || String(i + 2),
        d: Number(pp.distance || 0),
        via: String(pp.via || '').split(' · ').join(' → ')
      }))
    };
  },

  openShare() {
    const model = this._buildShareModel();
    if (!model) {
      wx.showToast({ title: '先生成一条关系路径', icon: 'none' });
      return;
    }
    this._shareModel = model;
    const win = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
    const ww = win.windowWidth || 375;
    const cw = Math.min(SHARE_LW, Math.round(ww - 40));
    const ch = Math.round((cw * SHARE_LH) / SHARE_LW);

    this._shareSeq = (this._shareSeq || 0) + 1;
    const seq = this._shareSeq;
    this._sharePath = '';
    this.setData({
      shareOpen: true,
      cardW: cw,
      cardH: ch,
      cardPath: '',
      cardError: '',
      cardExporting: false
    }, () => {
      if (seq !== this._shareSeq) return;
      this._prepareShareCanvas(0, seq);
    });
  },

  closeShare() {
    // 作废在途的绘制/导出：关掉弹层后不再把图片塞回来
    this._shareSeq = (this._shareSeq || 0) + 1;
    this.setData({ shareOpen: false, cardPath: '', cardError: '', cardExporting: false });
  },

  retryShare() {
    this._shareSeq = (this._shareSeq || 0) + 1;
    const seq = this._shareSeq;
    this._sharePath = '';
    this.setData({ cardPath: '', cardError: '', cardExporting: false }, () => {
      if (seq !== this._shareSeq) return;
      this._prepareShareCanvas(0, seq);
    });
  },

  _failShare(msg) {
    this.setData({ cardError: msg || '生成分享卡失败，请重试', cardExporting: false });
  },

  previewCard() {
    const p = this.data.cardPath || this._sharePath;
    if (!p) return;
    wx.previewImage({ urls: [p], current: p });
  },

  saveShare() {
    const path = this.data.cardPath || this._sharePath;
    if (!path) {
      wx.showToast({ title: this.data.cardError ? '分享卡未生成，请先重试' : '分享卡还在生成，请稍候', icon: 'none' });
      return;
    }
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success: () => wx.showToast({ title: '已保存到相册', icon: 'success' }),
      fail: (err) => {
        if (err && /auth|deny|permission/i.test(err.errMsg || '')) {
          wx.showModal({
            title: '需要相册权限',
            content: '保存分享卡需要访问相册，请在设置中允许。',
            confirmText: '去设置',
            success: (r) => { if (r.confirm) wx.openSetting(); }
          });
        } else {
          wx.showToast({ title: '保存失败，请重试', icon: 'none' });
        }
      }
    });
  },

  /** 找到隐藏画布节点 → 一次性绘制 → 立刻导出；画布本身不参与预览 */
  _prepareShareCanvas(attempt, seq) {
    const tries = attempt || 0;
    wx.createSelectorQuery().in(this)
      .select('#shareCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (seq !== this._shareSeq) return;
        const item = res && res[0];
        if (!item || !item.node) {
          // 弹层刚挂载时节点可能还没就绪：最多重试 4 次
          if (tries < 4) {
            setTimeout(() => this._prepareShareCanvas(tries + 1, seq), 180);
            return;
          }
          this._failShare('画布初始化失败，请重试');
          return;
        }
        const canvas = item.node;
        canvas.width = SHARE_W;
        canvas.height = SHARE_H;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          this._failShare('画布不可用，请重试');
          return;
        }

        let finished = false;
        const done = (qr) => {
          if (finished || seq !== this._shareSeq) return;
          finished = true;
          if (!this._shareModel) {
            this._failShare('卡面数据缺失，请返回重新查询');
            return;
          }
          try {
            this._drawShareCard(ctx, qr);
          } catch (e) {
            this._failShare('生成分享卡失败，请重试');
            return;
          }
          this.setData({ cardExporting: true });
          this._exportShareCard(canvas, seq);
        };

        // 小程序码：用户提供的真实图，加载失败才降级成占位框
        const img = canvas.createImage ? canvas.createImage() : null;
        if (!img) { done(null); return; }
        img.onload = () => done(img);
        img.onerror = () => done(null);
        img.src = '/assets/sixdeg/qr-shw.jpg';
        // 兜底：个别环境图片事件不回调时，1.2s 后按无码绘制
        setTimeout(() => done(null), 1200);
      });
  },

  _exportShareCard(canvas, seq) {
    wx.canvasToTempFilePath({
      canvas,
      x: 0,
      y: 0,
      width: SHARE_W,
      height: SHARE_H,
      destWidth: SHARE_W,
      destHeight: SHARE_H,
      success: (res) => {
        if (seq !== this._shareSeq) return;
        const p = res && res.tempFilePath;
        if (!p) {
          this._failShare('图片导出失败，请重试');
          return;
        }
        this._sharePath = p;
        this.setData({ cardPath: p, cardExporting: false });
      },
      fail: () => {
        if (seq !== this._shareSeq) return;
        this._failShare('图片导出失败，请重试');
      }
    }, this);
  },

  /* 卡面绘制：335×566 逻辑坐标，整体 3 倍缩放 */
  _drawShareCard(ctx, qr) {
    const m = this._shareModel;
    if (!m) return;

    const L = SHARE_LW;
    const H = SHARE_LH;
    const P = SHARE_PAD;

    ctx.setTransform(SHARE_SCALE, 0, 0, SHARE_SCALE, 0, 0);

    const serif = (size, bold) => {
      ctx.font = (bold ? 'bold ' : '') + size + 'px "Songti SC", "Noto Serif CJK SC", "STSong", serif';
    };
    const sans = (size, bold) => {
      ctx.font = (bold ? 'bold ' : '') + size + 'px -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif';
    };
    const txt = (s, x, y, o) => {
      const op = o || {};
      ctx.textAlign = op.align || 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = op.color || '#33261a';
      if (op.serif) serif(op.size || 12, !!op.bold);
      else sans(op.size || 12, !!op.bold);
      ctx.fillText(String(s), x, y);
      ctx.textAlign = 'left';
    };

    // ---------- 卡底 + 深色头 ----------
    ctx.fillStyle = '#fbf7ef';
    ctx.fillRect(0, 0, L, H);
    roundRect(ctx, 0, 0, L, H, 14);
    ctx.save();
    ctx.clip();

    const hg = ctx.createLinearGradient(0, 0, L, 150);
    hg.addColorStop(0, '#2e241a');
    hg.addColorStop(0.64, '#3b2c1f');
    hg.addColorStop(1, '#4a3625');
    ctx.fillStyle = hg;
    ctx.fillRect(0, 0, L, 150);

    const rg = ctx.createRadialGradient(295, -10, 10, 295, -10, 230);
    rg.addColorStop(0, 'rgba(207,138,75,0.22)');
    rg.addColorStop(0.62, 'rgba(207,138,75,0)');
    rg.addColorStop(1, 'rgba(207,138,75,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, L, 150);

    txt('世慧屋 · 六度空间', P, 27, { size: 9.5, color: 'rgba(240,201,138,0.9)' });

    // 起—终（衬线大字，名字长时按宽度收缩）
    let pairSize = 19;
    const pairWidth = (s) => {
      serif(s, true);
      return ctx.measureText(m.from).width + 8 + 13 + 8 + ctx.measureText(m.to).width;
    };
    while (pairSize > 12 && pairWidth(pairSize) > L - P * 2 - 76) pairSize -= 1;
    serif(pairSize, true);
    const wn1 = ctx.measureText(m.from).width;
    serif(13);
    const wdash = ctx.measureText('—').width;
    let pxx = P;
    txt(m.from, pxx, 51, { size: pairSize, serif: true, bold: true, color: '#f8f2e6' });
    pxx += wn1 + 8;
    txt('—', pxx, 51, { size: 13, serif: true, color: '#c9a86f' });
    pxx += wdash + 8;
    txt(m.to, pxx, 51, { size: pairSize, serif: true, bold: true, color: '#f8f2e6' });

    // 几度：右下角，必须显眼
    txt('度', L - 20, 138, { size: 13, serif: true, color: 'rgba(248,242,230,0.72)', align: 'right' });
    serif(13);
    const wDeg = ctx.measureText('度').width;
    txt(String(m.distance), L - 20 - wDeg, 138, {
      size: 62, serif: true, bold: true, color: '#f0c98a', align: 'right'
    });

    txt('中间隔 ' + Math.max(0, m.distance - 1) + ' 个人 · ' + m.distance + ' 段记载关系',
      P, 134, { size: 9.5, color: 'rgba(248,242,230,0.62)' });

    // ---------- 链路 ----------
    const capY = 173;
    txt('这条路怎么走', P, capY, { size: 9.5, color: '#6b5a45' });
    sans(9.5);
    ctx.strokeStyle = 'rgba(61,46,31,0.14)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(P + ctx.measureText('这条路怎么走').width + 6, capY - 4);
    ctx.lineTo(L - P, capY - 4);
    ctx.stroke();

    const packed = compressShareNodes(m.nodes);
    const items = [];
    let pendingGap = false;
    packed.nodes.forEach((n, i) => {
      if (n.gap) {
        items.push({ t: 'gap', count: n.count });
        pendingGap = true;
        return;
      }
      if (i > 0 && !pendingGap) items.push({ t: 'rel', text: n.rel || '待补' });
      pendingGap = false;
      items.push({ t: 'node', text: n.name, start: i === 0 });
    });

    const FLOW_TOP = 185;
    const ROW_H = 27;
    const MAX_X = L - P;

    const capWOf = (s) => {
      sans(10);
      return ctx.measureText(s).width + 8;
    };
    const measureItem = (it) => {
      if (it.t === 'node') {
        serif(15, true);
        return ctx.measureText(it.text).width + 4;
      }
      sans(9);
      const dashW = ctx.measureText('—').width;
      const arrowW = ctx.measureText('→').width;
      const dotsW = ctx.measureText('⋯').width;
      if (it.t === 'rel') {
        return 6 + dashW + 2 + capWOf(it.text) + 2 + arrowW;
      }
      const leadW = ctx.measureText('⋯ 经').width;
      return 6 + leadW + 2 + capWOf(it.count + ' 人') + 2 + dotsW;
    };

    const drawCapsule = (x, y, text, dashed) => {
      const w = capWOf(text);
      ctx.fillStyle = 'rgba(181,113,58,0.06)';
      roundRect(ctx, x, y, w, 17, 3);
      ctx.fill();
      ctx.strokeStyle = 'rgba(181,113,58,0.5)';
      ctx.lineWidth = 1;
      if (dashed) ctx.setLineDash([3, 2]);
      ctx.stroke();
      if (dashed) ctx.setLineDash([]);
      txt(text, x + w / 2, y + 12, {
        size: 10, color: dashed ? '#6b5a45' : '#8a5a2c', align: 'center'
      });
      return w;
    };

    let fx = P;
    let fy = FLOW_TOP;

    items.forEach((it) => {
      const w = measureItem(it);
      if (fx > P && fx + w > MAX_X) {
        fx = P;
        fy += ROW_H;
      }
      if (it.t === 'node') {
        serif(15, true);
        txt(it.text, fx + 2, fy + 16, { size: 15, serif: true, bold: true, color: '#33261a' });
        const tw = ctx.measureText(it.text).width;
        ctx.strokeStyle = it.start ? 'rgba(181,113,58,0.5)' : 'rgba(166,59,42,0.45)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(fx, fy + 20.5);
        ctx.lineTo(fx + tw + 4, fy + 20.5);
        ctx.stroke();
      } else if (it.t === 'rel') {
        let cx = fx + 3;
        sans(9);
        txt('—', cx, fy + 14, { size: 9, color: '#b49a78' });
        cx += ctx.measureText('—').width + 2;
        const cw = drawCapsule(cx, fy + 2, it.text, false);
        cx += cw + 2;
        txt('→', cx, fy + 14, { size: 9, color: '#b49a78' });
      } else {
        let cx = fx + 3;
        sans(9);
        txt('⋯ 经', cx, fy + 14, { size: 9, color: '#b49a78' });
        cx += ctx.measureText('⋯ 经').width + 2;
        const cw = drawCapsule(cx, fy + 2, it.count + ' 人', true);
        cx += cw + 2;
        txt('⋯', cx, fy + 14, { size: 9, color: '#b49a78' });
      }
      fx += w + 2;
    });

    const flowEnd = fy + 24;

    // ---------- 中线 + 三格数 ----------
    const midTop = flowEnd + 12;
    ctx.strokeStyle = 'rgba(139,115,85,0.28)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(P, midTop);
    ctx.lineTo(L - P, midTop);
    ctx.stroke();
    ctx.setLineDash([]);

    const kpiTop = midTop + 10;
    const kpiGap = 10;
    const boxW = (L - P * 2 - kpiGap * 2) / 3;
    const kpis = [
      { v: String(m.count), l: '条候选路径' },
      { v: String(Math.max(0, m.distance - 1)), l: '个中间人' },
      { v: String(m.distance), l: '段记载关系' }
    ];
    kpis.forEach((k, i) => {
      const bx = P + i * (boxW + kpiGap);
      ctx.fillStyle = '#f7f0e3';
      roundRect(ctx, bx, kpiTop, boxW, 44, 8);
      ctx.fill();
      ctx.strokeStyle = 'rgba(181,113,58,0.16)';
      ctx.lineWidth = 1;
      ctx.stroke();
      txt(k.v, bx + 8, kpiTop + 24, { size: 16, serif: true, bold: true, color: '#a63b2a' });
      txt(k.l, bx + 8, kpiTop + 38, { size: 9, color: '#6b5a45' });
    });

    // ---------- 一句话 ----------
    const cut = packed.cut;
    const segs = cut
      ? [['从 ', '#4a3826'], [m.from, '#a63b2a'], [' 到 ', '#4a3826'], [m.to, '#a63b2a'],
        ['，中间隔着 ', '#4a3826'], [String(Math.max(0, m.distance - 1)), '#a63b2a'],
        [' 个人，其中 ', '#4a3826'], [String(cut), '#a63b2a'], [' 人折叠显示。', '#4a3826']]
      : [['从 ', '#4a3826'], [m.from, '#a63b2a'], [' 到 ', '#4a3826'], [m.to, '#a63b2a'],
        ['，中间只经过 ', '#4a3826'], [String(Math.max(0, m.distance - 1)), '#a63b2a'],
        [' 个人，全是库里有记载的关系。', '#4a3826']];

    const quoteTop = kpiTop + 44 + 10;
    sans(10.5);
    let qx = P;
    let qy = quoteTop + 11;
    let qLine = 0;
    let overflow = false;
    segs.forEach((sg) => {
      if (overflow) return;
      for (let i = 0; i < sg[0].length; i++) {
        const ch = sg[0].charAt(i);
        const cw = ctx.measureText(ch).width;
        if (qx + cw > L - P) {
          qLine += 1;
          if (qLine >= 3) { overflow = true; break; }
          qx = P;
          qy += 17;
        }
        txt(ch, qx, qy, { size: 10.5, color: sg[1] });
        qx += cw;
      }
    });
    if (overflow) txt('…', L - P - 10, qy, { size: 10.5, color: '#4a3826' });
    const quoteBottom = qy;

    const noteY = quoteBottom + 17;
    txt('逐段对应库内一条记载关系，未合并、未改写。', P, noteY, { size: 9.5, color: '#6b5a45' });

    // ---------- 同度数备选 ----------
    const footTop = 500;
    let altTop = 0;
    if (m.alts.length) {
      altTop = noteY + 13;
      ctx.strokeStyle = 'rgba(139,115,85,0.28)';
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(P, altTop);
      ctx.lineTo(L - P, altTop);
      ctx.stroke();
      ctx.setLineDash([]);

      const maxRows = Math.max(0, Math.floor((footTop - 6 - (altTop + 7)) / 21));
      m.alts.slice(0, maxRows).forEach((a, i) => {
        const ry = altTop + 7 + i * 21;
        txt(a.no, P, ry + 15, { size: 9.5, serif: true, color: '#8a5a2c' });
        txt(a.d + ' 度', P + 14, ry + 15, { size: 9, color: '#a63b2a' });
        let line = '经 ' + a.via;
        sans(9.5);
        const maxW = L - P - (P + 40);
        while (line.length > 1 && ctx.measureText(line).width > maxW) line = line.slice(0, -1);
        if (line.length < ('经 ' + a.via).length) line = line.slice(0, -1) + '…';
        txt(line, P + 40, ry + 15, { size: 9.5, color: '#6b5a45' });
      });
    }

    // ---------- 卡脚：数据注 + 小程序码 ----------
    ctx.strokeStyle = 'rgba(61,46,31,0.14)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(P, footTop);
    ctx.lineTo(L - P, footTop);
    ctx.stroke();

    const qs = 52;
    const qx2 = L - P - qs;
    const qy2 = footTop + 4;

    const dateStr = (() => {
      const d = new Date();
      return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    })();

    txt('关系词取自库内记载，未改写语义', P, footTop + 18, { size: 8.5, color: '#6b5a45' });
    txt('超长或异常项已截断 · ' + dateStr, P, footTop + 32, { size: 8.5, color: '#6b5a45' });
    if (qr) {
      ctx.fillStyle = '#ffffff';
      roundRect(ctx, qx2 - 3, qy2 - 3, qs + 6, qs + 6, 6);
      ctx.fill();
      ctx.drawImage(qr, qx2, qy2, qs, qs);
      txt('扫码查关系', P, footTop + 46, { size: 8.5, color: '#8a5a2c' });
    } else {
      ctx.strokeStyle = 'rgba(181,113,58,0.5)';
      ctx.setLineDash([4, 3]);
      roundRect(ctx, qx2, qy2, qs, qs, 6);
      ctx.stroke();
      ctx.setLineDash([]);
      txt('小程序码', qx2 + qs / 2, qy2 + qs / 2 + 3, { size: 8, color: '#6b5a45', align: 'center' });
    }

    ctx.restore();

    // 描边（在裁剪之外，四角仍是圆角）
    ctx.strokeStyle = 'rgba(61,46,31,0.14)';
    ctx.lineWidth = 1;
    roundRect(ctx, 0.5, 0.5, L - 1, H - 1, 14);
    ctx.stroke();
  },

  /* ---------------- 图谱页：进入 / 切换 ---------------- */
  onOpenGraph(e) {
    const idx = Number(e.currentTarget.dataset.index) || 0;
    const r = this.data.result;
    if (!r || !Array.isArray(r.paths) || !r.paths.length) return;
    const legend = r.paths.map((p, i) => ({
      no: i + 1,
      char: pathChar(i + 1),
      via: p.via,
      distance: p.distance
    }));
    // 每种视图各自记住缩放/平移；切回来不丢位置
    this._views = {
      single: { zoom: 1, panX: 0, panY: 0 },
      full: { zoom: 1, panX: 0, panY: 0 }
    };
    this._graphSel = null;
    // 提前算好全图谱（去重 / 边数 / 是否降级），按钮上直接显示人数
    const full = this.buildFullGraph();
    const meta = full
      ? { persons: full.nodes.length, edges: full.edges.length, paths: full.paths.length }
      : { persons: 0, edges: 0, paths: 0 };
    const cur = r.paths[idx].path;
    this.setData({
      graphVisible: true,
      graphMode: 'single',
      graphPathIndex: idx,
      graphPathLegend: legend,
      graphTitle: shortName(cur[0].name) + ' ⇄ ' + shortName(cur[cur.length - 1].name),
      graphMeta: meta,
      graphFocus: '',
      graphFocusAction: false,
      edgeCard: null,
      graphDegraded: false,
      zoomLabel: '1.0×',
      graphZoomed: false
    });
    // wx:if 刚挂载，等渲染层完成后再量画布尺寸并首绘
    wx.nextTick(() => this.initCanvas());
  },

  onCloseGraph() {
    this._graphSel = null;
    // 覆盖层随 wx:if 销毁，画布引用一并清掉，避免残留 rAF 往已销毁节点上画
    this._canvas = null;
    this._ctx = null;
    this._cw = 0;
    this._ch = 0;
    this.setData({ graphVisible: false, edgeCard: null, graphFocus: '', graphFocusAction: false });
  },

  onGraphSelectPath(e) {
    const idx = Number(e.currentTarget.dataset.index);
    if (idx === this.data.graphPathIndex && this.data.graphMode === 'single') return;
    this._graphSel = null;
    this.setData({
      graphMode: 'single',
      graphPathIndex: idx,
      edgeCard: null,
      graphFocus: '',
      graphFocusAction: false,
      graphDegraded: false
    });
    this.applyViewToData();
    this.drawGraph();
  },

  onGraphFull() {
    if (this.data.graphMode === 'full') return;
    const full = this.buildFullGraph();
    this._graphSel = null;
    this.setData({
      graphMode: 'full',
      edgeCard: null,
      graphFocus: '',
      graphFocusAction: false,
      graphDegraded: !!(full && full.degraded),
      graphMeta: full ? { persons: full.nodes.length, edges: full.edges.length, paths: full.paths.length } : { persons: 0, edges: 0, paths: 0 }
    });
    this.applyViewToData();
    this.drawGraph();
  },

  // 把当前模式的 zoom/pan 同步到 UI（缩放标签、重置按钮）
  applyViewToData() {
    const v = this._views && this._views[this.data.graphMode];
    if (!v) return;
    const z = Math.round(v.zoom * 10) / 10;
    this.setData({
      zoomLabel: z.toFixed(1) + '×',
      graphZoomed: Math.abs(v.zoom - 1) > 0.01 || Math.abs(v.panX) > 1 || Math.abs(v.panY) > 1
    });
  },

  onResetView() {
    const mode = this.data.graphMode;
    if (!this._views) return;
    this._views[mode] = { zoom: 1, panX: 0, panY: 0 };
    this.applyViewToData();
    this.drawGraph();
  },

  /* =========================================================================
     全图谱：节点去重 / 共用计数 / 三列布局
     -------------------------------------------------------------------------
     · 去重键 = 人物 id；同一人只保留一个节点，paths 记录它被哪几条路径穿过
     · 边去重键 = 无向 id 对；paths 记录共用该边的路径编号
     · 坐标（逻辑 375×684，绘制时整体缩放到画布）：
         起点 x=10、终点 x=375-10-w；中间列统一 x=122 w=86
         中间行按「第一次出现的路径序」排列，行距 108（人数多时自动压缩）
         左干线 x=84、右干线 x=246；关系词胶囊挂水平支线中点 x=103 / x=227
     ========================================================================= */
  buildFullGraph() {
    const r = this.data.result;
    if (!r || !Array.isArray(r.paths) || !r.paths.length) return null;
    const paths = r.paths;
    const nodeMap = {};
    const edgeMap = {};

    paths.forEach((p, pi) => {
      const arr = p.path || [];
      arr.forEach((n, ni) => {
        const id = String(n.id);
        let rec = nodeMap[id];
        if (!rec) {
          rec = {
            id,
            name: n.name,
            short: shortName(n.name),
            dynasty: n.dynasty || '',
            gender: n.gender || '',
            paths: []
          };
          nodeMap[id] = rec;
        }
        if (rec.paths.indexOf(pi + 1) < 0) rec.paths.push(pi + 1);
        if (ni > 0) {
          const prev = arr[ni - 1];
          const fromId = String(prev.id);
          const key = fromId < id ? fromId + '|' + id : id + '|' + fromId;
          let e = edgeMap[key];
          if (!e) {
            e = { key, a: fromId, b: id, from: fromId, to: id, rel: n.relationFromPrev || '', paths: [] };
            edgeMap[key] = e;
          }
          if (e.paths.indexOf(pi + 1) < 0) e.paths.push(pi + 1);
        }
      });
    });

    const nodes = Object.keys(nodeMap).map((k) => nodeMap[k]);
    const edges = Object.keys(edgeMap).map((k) => edgeMap[k]);
    const fromId = String(paths[0].path[0].id);
    const toId = String(paths[0].path[paths[0].path.length - 1].id);
    const degraded = nodes.length > MAX_GRAPH_PERSONS || paths.length > MAX_GRAPH_PATHS;

    const graph = {
      paths,
      nodes,
      edges,
      nodeMap,
      edgeMap,
      fromId,
      toId,
      degraded,
      W: 375,
      H: 684
    };
    if (!degraded) this.layoutFullGraph(graph);
    this._graphCache = graph;
    return graph;
  },

  layoutFullGraph(g) {
    const W = g.W;
    const H = g.H;
    const MID_X = 122;
    const MID_W = 86;
    const NODE_H = 46;
    const TRUNK_L = 84;
    const TRUNK_R = 246;
    const mid = [];

    // 中间列顺序：按路径 ①→④、路径内先后，第一次出现即固定
    g.paths.forEach((p) => {
      (p.path || []).forEach((n) => {
        const id = String(n.id);
        if (id === g.fromId || id === g.toId) return;
        if (!mid.some((m) => m.id === id)) mid.push(g.nodeMap[id]);
      });
    });

    // 行距：5 人时 108（设计稿），人多时压缩到画布内
    let rowGap = 108;
    if (mid.length > 1) {
      rowGap = Math.min(108, (H - 160 - NODE_H) / (mid.length - 1));
    }
    const firstCenter = 342 - ((mid.length - 1) * rowGap) / 2;
    mid.forEach((n, i) => {
      n.isMid = true;
      n.w = MID_W;
      n.h = NODE_H;
      n.x = MID_X;
      n.y = Math.round(firstCenter + i * rowGap - NODE_H / 2);
      n.cx = n.x + n.w / 2;
      n.cy = n.y + n.h / 2;
      n.row = i;
    });

    // 两端：默认画布中线 342；若与某中间行重合，挪到该行与邻行的中点（设计稿的 288）
    let endY = 342;
    const hit = mid.find((n) => Math.abs(n.cy - 342) < 8);
    if (hit) {
      const up = mid[hit.row - 1];
      const down = mid[hit.row + 1];
      if (up) endY = (up.cy + hit.cy) / 2;
      else if (down) endY = (hit.cy + down.cy) / 2;
      else endY = 288;
    }
    const fromN = g.nodeMap[g.fromId];
    const toN = g.nodeMap[g.toId];
    fromN.isFrom = true;
    fromN.h = NODE_H;
    fromN.w = Math.min(72, Math.max(66, 18 + 7 + fromN.short.length * 11.5 + 12));
    fromN.x = 10;
    fromN.y = Math.round(endY - NODE_H / 2);
    fromN.cx = fromN.x + fromN.w / 2;
    fromN.cy = endY;
    toN.isTo = true;
    toN.h = NODE_H;
    toN.w = Math.min(92, Math.max(80, 18 + 7 + toN.short.length * 11.5 + 12));
    toN.x = W - 10 - toN.w;
    toN.y = Math.round(endY - NODE_H / 2);
    toN.cx = toN.x + toN.w / 2;
    toN.cy = endY;

    g.endY = endY;
    g.trunkL = TRUNK_L;
    g.trunkR = TRUNK_R;

    // 逐边生成直角折线 + 胶囊锚点
    g.edges.forEach((e) => {
      const A = g.nodeMap[e.from];
      const B = g.nodeMap[e.to];
      if (!A || !B) { e.points = []; e.label = null; return; }
      e.cls = classify3(e.rel);

      // 1) 起点 → 中间列：左干线
      if (A.isFrom && B.isMid) {
        e.points = [[A.x + A.w, endY], [TRUNK_L, endY], [TRUNK_L, B.cy], [MID_X, B.cy]];
        e.branchPoints = [[TRUNK_L, B.cy], [MID_X, B.cy]];
        e.label = { x: TRUNK_L + 19, y: B.cy };
        return;
      }
      // 2) 中间列 → 终点：右干线
      if (A.isMid && B.isTo) {
        e.points = [[MID_X + MID_W, A.cy], [TRUNK_R, A.cy], [TRUNK_R, endY], [B.x, endY]];
        e.branchPoints = [[MID_X + MID_W, A.cy], [TRUNK_R, A.cy]];
        e.label = { x: TRUNK_R - 19, y: A.cy };
        return;
      }
      // 3) 起点 ↔ 终点：直连
      if ((A.isFrom && B.isTo) || (A.isTo && B.isFrom)) {
        const sx = A.isFrom ? A.x + A.w : A.x;
        const tx = B.isTo ? B.x : B.x + B.w;
        const y = endY;
        e.points = [[sx, y], [tx, y]];
        e.label = { x: (sx + tx) / 2, y: y };
        return;
      }
      // 4) 中间列内部：相邻行直接竖向；跨行绕左侧支线，避免穿过中间节点
      if (A.isMid && B.isMid) {
        const upper = A.row <= B.row ? A : B;
        const lower = A.row <= B.row ? B : A;
        if (lower.row - upper.row === 1) {
          e.points = [[upper.cx, upper.y + upper.h], [lower.cx, lower.y]];
          e.label = { x: upper.cx, y: (upper.y + upper.h + lower.y) / 2 };
        } else {
          const lane = MID_X - 26;
          e.points = [
            [MID_X, upper.cy], [lane, upper.cy], [lane, lower.cy], [MID_X, lower.cy]
          ];
          e.label = { x: lane, y: (upper.cy + lower.cy) / 2 };
        }
        return;
      }
      // 5) 兜底：左侧车道
      const lane = 60;
      const ax = A.cx < B.cx ? A.x + A.w : A.x;
      const bx = A.cx < B.cx ? B.x : B.x + B.w;
      e.points = [[ax, A.cy], [lane, A.cy], [lane, B.cy], [bx, B.cy]];
      e.label = { x: lane, y: (A.cy + B.cy) / 2 };
    });
  },

  /* ---------------- canvas 2d ---------------- */
  initCanvas(retry) {
    const q = wx.createSelectorQuery();
    q.select('#graphCanvas').fields({ node: true, size: true }).exec((res) => {
      const r = res && res[0];
      if (!r || !r.node || !r.width || !r.height) {
        // wx:if 刚挂载时个别机型首帧还量不到尺寸，补一次
        if (retry !== false) setTimeout(() => this.initCanvas(false), 60);
        return;
      }
      const canvas = r.node;
      const dpr = (wx.getWindowInfo().pixelRatio) || 2;
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      this._canvas = canvas;
      this._ctx = canvas.getContext('2d');
      this._dpr = dpr;
      this._cw = r.width;
      this._ch = r.height;
      this.drawGraph();
    });
  },

  // 重绘节流：touchmove 频率高于渲染帧率，用画布 rAF 合并
  scheduleDraw() {
    if (this._rafPending) return;
    this._rafPending = true;
    const run = () => { this._rafPending = false; this.drawGraph(); };
    if (this._canvas && typeof this._canvas.requestAnimationFrame === 'function') {
      this._canvas.requestAnimationFrame(run);
    } else {
      setTimeout(run, 16);
    }
  },

  // 当前模式的变换：全图谱把 375×684 整体铺进画布；单条路径按 CSS px 直绘
  viewInfo() {
    const mode = this.data.graphMode;
    const v = (this._views && this._views[mode]) || { zoom: 1, panX: 0, panY: 0 };
    if (mode === 'full') {
      const base = Math.min(this._cw / 375, this._ch / 684);
      return {
        W: 375, H: 684, base,
        centerX: (this._cw - 375 * base) / 2,
        centerY: (this._ch - 684 * base) / 2,
        zoom: v.zoom, panX: v.panX, panY: v.panY
      };
    }
    return {
      W: this._cw, H: this._ch, base: 1,
      centerX: 0, centerY: 0,
      zoom: v.zoom, panX: v.panX, panY: v.panY
    };
  },

  drawGraph() {
    const ctx = this._ctx;
    if (!ctx || !this._cw) return;
    ctx.setTransform(this._dpr, 0, 0, this._dpr, 0, 0);
    ctx.clearRect(0, 0, this._cw, this._ch);
    ctx.fillStyle = '#f7f0e3';
    ctx.fillRect(0, 0, this._cw, this._ch);
    if (!this.data.graphVisible) return;
    if (this.data.graphMode === 'full') this.drawFull(ctx);
    else this.drawSingle(ctx);
  },

  /* -------- 单条路径：两列蛇形，折线走目标列中线 -------- */
  layoutSingle(path) {
    const W = this._cw;
    const H = this._ch;
    const n = path.length;
    const NODE_H = 52;
    const startY = 80;
    const bottom = H - 80;
    let gap = 40;
    if (n > 1) gap = Math.max(24, Math.min(200, (bottom - startY - n * NODE_H) / (n - 1)));
    const nodes = path.map((p, i) => {
      const name = p.name || '';
      const w = Math.max(104, Math.min(156, 48 + name.length * 12));
      const left = i % 2 === 0;
      return {
        id: String(p.id),
        text: name,
        short: shortName(name),
        sub: (p.dynasty || '') + (p.gender ? ' · ' + p.gender : ''),
        w,
        h: NODE_H,
        x: left ? 18 : W - 18 - w,
        y: startY + i * (NODE_H + gap),
        left
      };
    });
    nodes.forEach((nd) => { nd.cx = nd.x + nd.w / 2; nd.cy = nd.y + nd.h / 2; });
    const edges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i];
      const b = nodes[i + 1];
      const sy = a.cy;
      const tx = b.cx;
      const ty = b.y;
      const sx = a.left ? a.x + a.w : a.x;
      edges.push({
        points: [[sx, sy], [tx, sy], [tx, ty]],
        label: { x: tx, y: (sy + ty) / 2 },
        rel: path[i + 1].relationFromPrev || '',
        cls: classify3(path[i + 1].relationFromPrev)
      });
      edges[i].tx = tx;
      edges[i].ty = sy;
    }
    return { nodes, edges, W, H };
  },

  drawSingle(ctx) {
    const r = this.data.result;
    const idx = this.data.graphPathIndex || 0;
    const path = r && r.paths && r.paths[idx] ? r.paths[idx].path : null;
    if (!path || path.length === 0) return;
    const lay = this.layoutSingle(path);
    this._single = lay;
    const v = this.viewInfo();
    const showSub = v.zoom >= ZOOM_HIDE_SUB;

    ctx.save();
    ctx.translate(v.panX, v.panY);
    ctx.scale(v.zoom, v.zoom);

    lay.edges.forEach((e) => this.strokePolyline(ctx, e, 1, 1.5));
    lay.edges.forEach((e) => {
      if (e.rel) this.drawRelLabel(ctx, e.label.x, e.label.y, e.rel, 1);
    });
    lay.nodes.forEach((nd, i) => {
      this.drawNodeBox(ctx, nd, {
        text: nd.text,
        sub: nd.sub,
        showSub,
        paths: [idx + 1],
        selected: false,
        dim: false
      });
      // 起终点小标签
      if (i === 0 || i === lay.nodes.length - 1) {
        this.drawCornerTag(ctx, nd, i === 0 ? '起点' : '终点');
      }
    });
    ctx.restore();
  },

  /* -------- 全图谱 -------- */
  drawFull(ctx) {
    let g = this._graphCache;
    if (!g) g = this.buildFullGraph();
    if (!g) return;
    if (g.degraded) return;   // 降级：画布留空，由 WXML 降级卡接管

    const v = this.viewInfo();
    const showSub = v.zoom >= ZOOM_HIDE_SUB;
    const sel = this._graphSel;
    const activeId = sel && sel.type === 'node' ? sel.id : null;
    const activeEdge = sel && sel.type === 'edge' ? sel.key : null;

    ctx.save();
    ctx.translate(v.centerX + v.panX, v.centerY + v.panY);
    ctx.scale(v.base * v.zoom, v.base * v.zoom);

    // 1) 双干线（结构线，统一深灰，避免不同关系色叠在同一根干线上）
    this.drawTrunks(ctx, g);
    // 2) 每条边只画自己的支线（干线已由上一层统一画好）
    g.edges.forEach((e) => {
      const adjacent = !!activeId && (e.from === activeId || e.to === activeId);
      let alpha = 1;
      let width = 1.5;
      let color = LINE_COLOR[e.cls] || LINE_COLOR.politics;
      if (activeId) {
        if (adjacent) { width = 2.4; color = '#8a5a2c'; }
        else alpha = 0.18;
      }
      if (activeEdge) alpha = e.key === activeEdge ? 1 : 0.16;
      if (activeEdge && e.key === activeEdge) { width = 2.6; color = '#a63b2a'; alpha = 1; }
      const line = e.branchPoints ? { points: e.branchPoints, cls: e.cls } : e;
      this.strokePolyline(ctx, line, alpha, width, color);
      // 选中的边补画完整路径（含干线的一段），让「这条边怎么走」一眼看清
      if (activeEdge && e.key === activeEdge) {
        this.strokePolyline(ctx, e, 1, 2.6, '#a63b2a');
      }
    });
    // 3) 关系词胶囊（压在线段上，后画保证可读；9 条边靠三条车道错开）
    g.edges.forEach((e) => {
      if (!e.label || !e.rel) return;
      const adjacent = !!activeId && (e.from === activeId || e.to === activeId);
      let alpha = 1;
      if (activeEdge) alpha = e.key === activeEdge ? 1 : 0.16;
      else if (activeId) alpha = adjacent ? 1 : 0.16;
      this.drawRelLabel(ctx, e.label.x, e.label.y, e.rel, alpha);
    });
    // 4) 节点
    g.nodes.forEach((n) => {
      this.drawNodeBox(ctx, n, {
        text: n.short,
        full: n.name,
        sub: n.dynasty + (n.gender ? ' · ' + n.gender : ''),
        showSub,
        paths: n.paths,
        selected: !!activeId && n.id === activeId,
        dim: false
      });
    });
    ctx.restore();
  },

  // 双干线：从起点/终点各引一条总线，再竖直至最上/最下的分支行
  drawTrunks(ctx, g) {
    const fromN = g.nodeMap[g.fromId];
    const toN = g.nodeMap[g.toId];
    if (!fromN || !toN) return;
    const leftYs = [];
    const rightYs = [];
    g.edges.forEach((e) => {
      const A = g.nodeMap[e.from];
      const B = g.nodeMap[e.to];
      if (A && B && A.isFrom && B.isMid) leftYs.push(B.cy);
      if (A && B && A.isMid && B.isTo) rightYs.push(A.cy);
    });
    ctx.save();
    ctx.strokeStyle = '#75654f';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.92;
    ctx.lineJoin = 'round';
    if (leftYs.length) {
      const ys = leftYs.concat([g.endY]);
      ctx.beginPath();
      ctx.moveTo(fromN.x + fromN.w, g.endY);
      ctx.lineTo(g.trunkL, g.endY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(g.trunkL, Math.min.apply(null, ys));
      ctx.lineTo(g.trunkL, Math.max.apply(null, ys));
      ctx.stroke();
    }
    if (rightYs.length) {
      const ys = rightYs.concat([g.endY]);
      ctx.beginPath();
      ctx.moveTo(g.trunkR, g.endY);
      ctx.lineTo(toN.x, g.endY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(g.trunkR, Math.min.apply(null, ys));
      ctx.lineTo(g.trunkR, Math.max.apply(null, ys));
      ctx.stroke();
    }
    ctx.restore();
  },

  strokePolyline(ctx, e, alpha, width, color) {
    const pts = e.points || [];
    if (pts.length < 2) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.strokeStyle = color || LINE_COLOR[e.cls] || LINE_COLOR.politics;
    ctx.lineWidth = width || 1.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'butt';
    ctx.stroke();
    ctx.restore();
  },

  // 关系词胶囊：宽随文字测量，压在线段中点
  drawRelLabel(ctx, x, y, text, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha === undefined ? 1 : alpha;
    ctx.font = '600 8.6px "Songti SC", "Noto Serif CJK SC", serif';
    const w = Math.max(20, ctx.measureText(text).width + 7);
    const h = 15;
    roundRect(ctx, x - w / 2, y - h / 2, w, h, 6);
    ctx.fillStyle = '#f7efe2';
    ctx.fill();
    ctx.strokeStyle = 'rgba(166, 59, 42, 0.28)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.fillStyle = '#4a3826';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y + 0.3);
    ctx.restore();
  },

  // 节点矩形：头像圆 + 名字 + 副行 + 路径角标 / 共用 ×N
  drawNodeBox(ctx, n, opt) {
    const o = opt || {};
    const x = n.x;
    const y = n.y;
    const w = n.w;
    const h = n.h;
    ctx.save();
    if (o.dim) ctx.globalAlpha = 0.32;

    // 共用节点：外圈金环（设计稿 ×4 双金环）
    if (o.paths && o.paths.length >= 2) {
      roundRect(ctx, x - 3, y - 3, w + 6, h + 6, 10);
      ctx.strokeStyle = '#b5713a';
      ctx.lineWidth = 1.6;
      ctx.stroke();
      roundRect(ctx, x - 5.5, y - 5.5, w + 11, h + 11, 12);
      ctx.strokeStyle = 'rgba(181, 113, 58, 0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    roundRect(ctx, x, y, w, h, 9);
    ctx.fillStyle = '#fbf7ef';
    ctx.fill();
    ctx.strokeStyle = o.selected ? '#a63b2a' : '#d8c7ad';
    ctx.lineWidth = o.selected ? 2.2 : 1;
    ctx.stroke();

    // 头像圆：姓氏首字
    const r = 11;
    const acx = x + 18;
    const acy = y + h / 2;
    ctx.beginPath();
    ctx.arc(acx, acy, r, 0, Math.PI * 2);
    ctx.fillStyle = '#efe4d3';
    ctx.fill();
    ctx.strokeStyle = 'rgba(181, 113, 58, 0.35)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.fillStyle = '#6b4c2c';
    ctx.font = '700 10px "Songti SC", "Noto Serif CJK SC", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((o.text || '?').charAt(0), acx, acy + 0.5);

    // 名字（超宽裁切，不压右边框）
    const tx = x + 33;
    ctx.save();
    ctx.beginPath();
    ctx.rect(tx, y + 3, w - 36, h - 6);
    ctx.clip();
    ctx.textAlign = 'left';
    ctx.fillStyle = o.selected ? '#a63b2a' : '#33261a';
    ctx.font = '600 11.6px "Songti SC", "Noto Serif CJK SC", serif';
    ctx.fillText(o.text || '', tx, o.showSub ? y + h / 2 - 5 : y + h / 2 + 0.5);
    if (o.showSub && o.sub) {
      ctx.fillStyle = '#75654f';
      ctx.font = '8.3px "Songti SC", "Noto Serif CJK SC", serif';
      ctx.fillText(o.sub, tx, y + h / 2 + 9);
    }
    ctx.restore();

    // 角标：共用 ≥2 → ×N；否则路径号
    const paths = o.paths || [];
    if (paths.length >= 2) {
      const bt = '×' + paths.length;
      ctx.font = '700 8.6px "Songti SC", serif';
      const bw = Math.max(16, ctx.measureText(bt).width + 7);
      const bh = 13;
      const bx = x + w - bw + 4;
      const by = y - 7;
      roundRect(ctx, bx, by, bw, bh, 6);
      ctx.fillStyle = '#f1e2c4';
      ctx.fill();
      ctx.strokeStyle = '#b5713a';
      ctx.lineWidth = 0.9;
      ctx.stroke();
      ctx.fillStyle = '#7a4a1e';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(bt, bx + bw / 2, by + bh / 2 + 0.3);
    } else if (paths.length === 1) {
      const ch = pathChar(paths[0]);
      ctx.beginPath();
      ctx.arc(x + w - 6, y + 5, 7, 0, Math.PI * 2);
      ctx.fillStyle = PATH_COLOR[(paths[0] - 1) % PATH_COLOR.length];
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '700 8px "Songti SC", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(ch, x + w - 6, y + 5.4);
    }
    ctx.restore();
  },

  drawCornerTag(ctx, n, text) {
    ctx.save();
    ctx.font = '600 8px "Songti SC", serif';
    const w = ctx.measureText(text).width + 10;
    roundRect(ctx, n.x, n.y - 11, w, 13, 5);
    ctx.fillStyle = '#f1e2c4';
    ctx.fill();
    ctx.fillStyle = '#7a4a1e';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, n.x + w / 2, n.y - 4.3);
    ctx.restore();
  },

  /* ---------------- 手势：双指缩放 + 单指拖动 ---------------- */
  touchDist(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy) || 1;
  },

  onGraphTouchStart(e) {
    const ts = (e.touches || []).filter((t) => t.x !== undefined);
    const mode = this.data.graphMode;
    if (!this._views) this._views = { single: { zoom: 1, panX: 0, panY: 0 }, full: { zoom: 1, panX: 0, panY: 0 } };
    const v = this.viewInfo();
    if (ts.length >= 2) {
      const T = v.base * v.zoom;
      const cx = (ts[0].x + ts[1].x) / 2;
      const cy = (ts[0].y + ts[1].y) / 2;
      this._pinch = {
        dist: this.touchDist(ts[0], ts[1]),
        zoom: v.zoom,
        // 双指中点下的逻辑坐标：整个手势期间钉住它，缩放+平移才跟手
        lx: (cx - (v.centerX + v.panX)) / T,
        ly: (cy - (v.centerY + v.panY)) / T
      };
      this._pan = null;
      this._moved = true;
    } else if (ts.length === 1) {
      this._pan = { x: ts[0].x, y: ts[0].y, panX: v.panX, panY: v.panY };
      this._pinch = null;
      this._moved = false;
    }
  },

  onGraphTouchMove(e) {
    const ts = (e.touches || []).filter((t) => t.x !== undefined);
    if (!this._views) return;
    const mode = this.data.graphMode;
    const v = this.viewInfo();

    if (ts.length >= 2 && this._pinch) {
      const p = this._pinch;
      const zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, p.zoom * (this.touchDist(ts[0], ts[1]) / p.dist)));
      const mx = (ts[0].x + ts[1].x) / 2;
      const my = (ts[0].y + ts[1].y) / 2;
      const T = v.base * zoom;
      this._views[mode] = {
        zoom,
        panX: (mx - p.lx * T) - v.centerX,
        panY: (my - p.ly * T) - v.centerY
      };
      this.scheduleDraw();
    } else if (ts.length === 1 && this._pan) {
      const p = this._pan;
      const dx = ts[0].x - p.x;
      const dy = ts[0].y - p.y;
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) this._moved = true;
      this._views[mode] = { zoom: v.zoom, panX: p.panX + dx, panY: p.panY + dy };
      this.scheduleDraw();
    }
  },

  onGraphTouchEnd(e) {
    const ts = (e.touches || []).filter((t) => t.x !== undefined);
    if (ts.length >= 2) return;
    if (ts.length === 1) {
      // 双指 → 单指：切换为拖动，避免画面跳变
      const v = this.viewInfo();
      this._pinch = null;
      this._pan = { x: ts[0].x, y: ts[0].y, panX: v.panX, panY: v.panY };
      this._moved = true;
      return;
    }
    this._pinch = null;
    this._pan = null;
    this.applyViewToData();   // 手势结束才 setData，避免高频更新
  },

  // 屏幕坐标 → 当前模式的逻辑坐标
  toLogical(px, py) {
    const v = this.viewInfo();
    const T = v.base * v.zoom;
    return {
      x: (px - (v.centerX + v.panX)) / T,
      y: (py - (v.centerY + v.panY)) / T
    };
  },

  hitNode(lay, x, y) {
    const nodes = (lay && lay.nodes) || [];
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (x >= n.x - 3 && x <= n.x + n.w + 3 && y >= n.y - 3 && y <= n.y + n.h + 3) return n;
    }
    return null;
  },

  pointSegDist(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = dx * dx + dy * dy;
    let t = len ? ((px - x1) * dx + (py - y1) * dy) / len : 0;
    t = Math.max(0, Math.min(1, t));
    const qx = x1 + t * dx;
    const qy = y1 + t * dy;
    return Math.sqrt((px - qx) * (px - qx) + (py - qy) * (py - qy));
  },

  hitEdge(edges, x, y) {
    let best = null;
    let bestD = 10;
    (edges || []).forEach((e) => {
      const pts = e.points || [];
      for (let i = 0; i < pts.length - 1; i++) {
        const d = this.pointSegDist(x, y, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
        if (d < bestD) { bestD = d; best = e; }
      }
    });
    return best;
  },

  // 画布点击：全图谱点人高亮相邻边 / 点边出浮卡；单条路径点人进人物卡
  onGraphTap(e) {
    if (this._moved) { this._moved = false; return; }
    const d = e.detail || {};
    let px = d.x;
    let py = d.y;
    if (px === undefined && e.touches && e.touches[0]) {
      px = e.touches[0].x;
      py = e.touches[0].y;
    }
    if (px === undefined) return;
    const p = this.toLogical(px, py);
    const mode = this.data.graphMode;

    if (mode === 'single') {
      const hit = this.hitNode(this._single, p.x, p.y);
      if (hit) navTo('/detail-pkg/pages/detail/detail?id=' + hit.id);
      return;
    }

    const g = this._graphCache;
    if (!g || g.degraded) return;
    const node = this.hitNode({ nodes: g.nodes }, p.x, p.y);
    if (node) {
      const chars = node.paths.map(pathChar).join('、');
      const focus = node.paths.length >= 2
        ? node.short + ' · 被 ' + node.paths.length + ' 条路径共用（' + chars + '）'
        : node.short + ' · 只在路径' + chars + '上';
      this._graphSel = { type: 'node', id: node.id };
      this.setData({ graphFocus: focus, graphFocusAction: true, edgeCard: null });
      this.drawGraph();
      return;
    }
    const edge = this.hitEdge(g.edges, p.x, p.y);
    if (edge) {
      const A = g.nodeMap[edge.from];
      const B = g.nodeMap[edge.to];
      const pi = edge.paths[0] - 1;
      const pth = this.data.result && this.data.result.paths[pi];
      this._graphSel = { type: 'edge', key: edge.key };
      this.setData({
        graphFocus: '', graphFocusAction: false,
        edgeCard: {
          title: A.short + ' → ' + B.short,
          rel: edge.rel,
          sub: '路径' + edge.paths.map(pathChar).join('、') + ' · ' + (pth ? pth.distance : 0) + ' 度',
          pathIndex: pi
        }
      });
      this.drawGraph();
      return;
    }
    // 空白：清掉选中态
    this._graphSel = null;
    this.setData({ graphFocus: '', graphFocusAction: false, edgeCard: null });
    this.drawGraph();
  },

  onFocusPerson() {
    const sel = this._graphSel;
    if (!sel || sel.type !== 'node') return;
    navTo('/detail-pkg/pages/detail/detail?id=' + sel.id);
  },

  onEdgePath() {
    const card = this.data.edgeCard;
    if (!card) return;
    this._graphSel = null;
    this.setData({
      graphMode: 'single',
      graphPathIndex: card.pathIndex,
      edgeCard: null,
      graphFocus: '',
      graphFocusAction: false,
      graphDegraded: false
    });
    this.applyViewToData();
    this.drawGraph();
  },

  onShareAppMessage() {
    const r = this.data.result;
    let title = '世慧屋 · 六度分隔｜测测你和历史名人的关系';
    if (r && Array.isArray(r.paths) && r.paths.length) {
      const p = r.paths[0];
      const path = p.path || [];
      if (path.length >= 2) {
        title = path[0].name + ' 与 ' + path[path.length - 1].name + ' 相隔 '
          + (p.distance || r.distance) + ' 度';
      }
    }
    const share = {
      title,
      path: '/pages/six-degrees/six-degrees'
    };
    // 已经生成过分享卡时，直接拿卡面当转发图
    if (this.data.cardPath) share.imageUrl = this.data.cardPath;
    return share;
  },

  onShareTimeline() {
    return { title: '世慧屋 · 六度分隔｜测测你和历史名人的关系' };
  }
});
