// 节日文化 —— 岁序长卷（A 主体 + B 四类筛选）
// 2026-11-14 落地 _design/festivals/plan-ab.html：
//   ① 深色头四块金色磁贴（节令 142 / 民俗 162 / 民族 48 / 地方 29）；
//   ② 四类 tab：点选进入该类，再点退回综合视图；
//   ③ 12 个月竖向长卷，月头互斥展开（同时只开一个月）；
//   ④ 展开后按当前分类只渲染对应段落：节令行 / 民俗双列格 / 民族条 / 地方行；
//   ⑤ 十二月方块条随内容滚走；滚动越过深色头 + tab 后，顶部浮出深色窄条「节日文化」（88rpx），
//      点方块条切月并滚动定位（定位让位 navH + 窄条 44px）。
// 口径说明（沿用 2026-10-17 版，未改数据）：
//   「节令」取 chineseFestivals[月-1]（公历月，含 24 节气与传统节日）；
//   「民俗」取 yearlyFestivals[月-1]（农历同号月），与公历组同名者去重；
//   「民族」「地方」按数据自带的 months 字段落到公历月（缺字段时才退回旧映射）；
//   开斋节、古尔邦节 months 为空数组，不落月，只在总计里计入。
const data = require('./festivals-data');

// 核心传统节日（民俗格内高亮）——与 web 端 FestivalsPage 保持一致
const CORE_FESTIVALS = {
  '春节': 1, '元宵节': 1, '清明节': 1, '端午节': 1, '七夕节': 1, '乞巧节（七夕）': 1,
  '中秋节': 1, '重阳节': 1, '腊八节': 1, '除夕': 1, '大年三十（除夕）': 1, '小年': 1,
  '龙抬头': 1, '春龙节（龙抬头）': 1, '寒食节': 1, '七月半（中元节）': 1, '中元节': 1,
  '冬至节': 1, '花朝节': 1, '社日': 1, '祭祖节（寒衣节）': 1, '寒衣节': 1, '祭灶神': 1
};

// 省级行政区（长的排前面，避免「内蒙古」被更短的词抢先命中）
const PROVINCES = [
  '内蒙古', '黑龙江', '贵州', '云南', '广西', '四川', '湖南', '湖北', '广东', '福建',
  '浙江', '江苏', '江西', '安徽', '山东', '山西', '陕西', '甘肃', '青海', '宁夏',
  '新疆', '西藏', '吉林', '辽宁', '海南', '河南', '河北', '台湾', '北京', '上海',
  '天津', '重庆'
];

// 民俗格封顶条数（与效果图一致：8 条，其余折叠）
const FOLK_PREVIEW = 8;

// 同一节日的不同写法 → 归一名（用于同月去重）
const NAME_ALIAS = {
  '乞巧节': '七夕节',
  '大年三十': '除夕',
  '祭祖节': '寒衣节',
  '春龙节': '龙抬头',
  '七月半': '中元节',
  '祭灶神': '小年'
};

// 民族节庆 → 公历月（老数据兜底，正常走数据里的 months）
const ETHNIC_MONTHS = {
  '那达慕大会': [7, 8],
  '泼水节': [4],
  '火把节': [7, 8],
  '藏历新年': [2, 3],
  '三月街': [4],
  '苗年': [11, 12],
  '诺鲁孜节': [3],
  '西迁节': [5],
  '目瑙纵歌': [2],
  '颁金节': [11],
  '蚂拐节': [1, 2]
};

// 地方特色节庆 → 公历月 + 举办时段（老数据兜底）
const LOCAL_INFO = {
  '哈尔滨冰雪节': { months: [1], time: '1月5日开幕' },
  '吉林雾凇冰雪节': { months: [12, 1], time: '11月下旬至次年2月' },
  '大连国际服装节': { months: [9], time: '9月中旬' },
  '北京春节庙会': { months: [1, 2], time: '农历正月初一至十五' },
  '潍坊风筝节': { months: [4], time: '4月20日前后' },
  '曲阜国际孔子文化节': { months: [9], time: '9月28日前后' },
  '洛阳牡丹花会': { months: [4], time: '4月中下旬' }
};

// 农历月的俗称 / 中文序号
const LUNAR_ALIAS = { 1: '正月', 12: '腊月' };
const LUNAR_CN = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

// 四类定义：key 与数据包字段一一对应
const CATS = [
  { key: 'almanac', name: '节令', label: '节令纪念', field: 'cAlmanac' },
  { key: 'folk', name: '民俗', label: '农历民俗', field: 'cFolk' },
  { key: 'ethnic', name: '民族', label: '民族节庆', field: 'cEthnic' },
  { key: 'local', name: '地方', label: '地方节庆', field: 'cLocal' }
];

// 回到顶部按钮出现阈值（px）
const TO_TOP_THRESHOLD = 600;
// 滚动事件节流（ms）
const SCROLL_THROTTLE = 80;
// 滚动态窄标题条高度（rpx）：88rpx = 44px
const BAR_RPX = 88;
// 窄条显示/收起的回差（px），避免阈值附近来回抖
const BAR_HYSTERESIS = 8;

function pad2(n) {
  return n < 10 ? '0' + n : '' + n;
}

/** 取括号前的主名并归一，如「乞巧节（七夕）」→「七夕节」 */
function normName(n) {
  const base = String(n || '').split('（')[0].split('(')[0].trim();
  return NAME_ALIAS[base] || base;
}

/**
 * 把「地区／民族前缀」与「节名」拆开（保留给需要两行展示的场景）。
 * 「贵州长顺布依族红苗洞歌节」→ pre「贵州长顺布依族」／label「红苗洞歌节」
 */
function splitFolk(raw) {
  const s = String(raw || '').trim();
  let pre = '';
  for (let i = 0; i < PROVINCES.length; i++) {
    if (s.indexOf(PROVINCES[i]) === 0) { pre = PROVINCES[i]; break; }
  }
  const rest = pre ? s.slice(pre.length) : s;

  const zi = rest.indexOf('族');
  if (zi >= 0 && zi <= 6 && rest.length - zi - 1 >= 2 && !/[的之与和]/.test(rest.slice(0, zi))) {
    const label = rest.slice(zi + 1).trim();
    if (label.length >= 2) return { pre: pre + rest.slice(0, zi + 1), label: label };
  }
  return { pre: pre, label: rest };
}

/** 从「一月（正月）」这类文案里取括号内的俗称 */
function aliasOf(monthText, mi) {
  if (LUNAR_ALIAS[mi]) return LUNAR_ALIAS[mi];
  const m = String(monthText || '').match(/（(.+)）/);
  return m ? m[1] : '';
}

/**
 * 备注 → 短类型签（效果图右上角的签）。
 * 只做截短与配色归类，不改原文，也不新增数据里没有的节日。
 */
function noteMeta(note) {
  if (!note) return { tag: '', kind: 'other' };
  if (note.indexOf('二十四节气') >= 0) return { tag: '节气', kind: 'solar' };
  if (note.indexOf('法定节假日') >= 0) return { tag: '法定', kind: 'holiday' };
  if (note.indexOf('传统节日') >= 0) return { tag: '传统', kind: 'traditional' };
  return { tag: '', kind: 'other' };
}

Page({
  data: {
    safeAreaTop: 44,
    navH: 88,
    // 切月滚动定位时给「导航 + 窄标题条」留的让位高度（px）
    scrollOffsetPx: 132,

    cat: '',                 // '' = 综合视图；否则为四类之一
    catName: '',
    cats: [],                // [{key,name,label,n}]
    heroTiles: [],           // [{k,n,label}]

    tiles: [],               // 12 个月头（含当前分类下的项数与分项）
    open: 0,                 // 当前展开的月份，0 = 全部收起

    cur: null,               // 展开月份的完整数据（不含 folk 全量）
    folkView: [],
    folkMore: 0,
    folkOpen: false,
    folkToggleText: '',

    showAlmanac: false,
    showFolk: false,
    showEthnic: false,
    showLocal: false,
    emptyNote: '',

    showTop: false,
    hdCompact: false,        // 滚动态窄标题条是否显示
    scrollToId: ''
  },

  onLoad() {
    const sys = wx.getWindowInfo();
    const safeTop = sys.statusBarHeight || 44;
    const navH = safeTop + 44;
    const winW = sys.windowWidth || 375;
    // 窄标题条按 rpx 折算成 px，切月定位时正好落在它下沿
    const barPx = Math.round((BAR_RPX * winW) / 750);
    // 窄条阈值要量到 hero / tab 之后才算得出来；量到之前不显示
    this._hdShowAt = Infinity;
    this._hdHideAt = Infinity;

    this._packs = this._buildPacks();

    const almanacTotal = data.chineseFestivals.reduce(function (n, m) { return n + m.items.length; }, 0);
    const folkTotal = data.yearlyFestivals.reduce(function (n, m) { return n + m.items.length; }, 0);
    const ethnicTotal = data.ethnicFestivals.length;
    const localTotal = data.localSpecialFestivals.length;

    const cats = CATS.map(function (c) {
      const n = c.key === 'almanac' ? almanacTotal :
                c.key === 'folk' ? folkTotal :
                c.key === 'ethnic' ? ethnicTotal : localTotal;
      return { key: c.key, name: c.name, label: c.label, n: n };
    });

    this.setData({
      safeAreaTop: safeTop,
      navH: navH,
      scrollOffsetPx: navH + barPx,
      cats: cats,
      heroTiles: [
        { k: 'a', n: almanacTotal, label: '节令纪念' },
        { k: 'f', n: folkTotal, label: '农历民俗' },
        { k: 'e', n: ethnicTotal, label: '民族节庆' },
        { k: 'l', n: localTotal, label: '地方节庆' }
      ],
      tiles: this._heads(''),
      open: 1
    });

    this._mount(1, false);

    // 等首帧渲染完再量 hero / tab 底部，算出窄条的显示阈值
    setTimeout(() => { this._measureHead(); }, 60);
  },

  onUnload() {
    this._packs = null;
    if (this._scrollToTimer) clearTimeout(this._scrollToTimer);
    this._scrollToTimer = null;
  },

  // ---------- 数据装配 ----------

  /** 生成 12 个月的数据包（只在 onLoad 跑一次；切分类、切月份都不重算） */
  _buildPacks() {
    const packs = [];

    for (let i = 0; i < 12; i++) {
      const mi = i + 1;
      const cf = data.chineseFestivals[i] || { month: '', english: '', items: [] };
      const yf = data.yearlyFestivals[i] || { month: '', items: [] };

      // 公历月：节令 / 纪念日 / 该年发生的传统节日
      const almanac = (cf.items || []).map(function (it, k) {
        const meta = noteMeta(it.note);
        return {
          k: 'a' + i + '-' + k,
          date: it.date,
          name: it.name,
          note: it.note || '',
          tag: meta.tag,
          kind: meta.kind
        };
      });

      // 农历同号月：民俗节日（与公历组同名者去重）
      const seen = {};
      almanac.forEach(function (it) { seen[normName(it.name)] = 1; });

      const folk = [];
      (yf.items || []).forEach(function (n, k) {
        const key = normName(n);
        if (seen[key]) return;
        seen[key] = 1;
        const sp = splitFolk(n);
        folk.push({
          k: 'f' + i + '-' + k,
          name: n,
          label: sp.label,
          pre: sp.pre,
          core: !!CORE_FESTIVALS[n]
        });
      });

      // 民族节庆落在本月者（以数据 months 为准，缺字段时退回旧映射）
      const ethnic = data.ethnicFestivals.filter(function (f) {
        const ms = Array.isArray(f.months) ? f.months : ETHNIC_MONTHS[f.name];
        return !!ms && ms.indexOf(mi) >= 0;
      }).map(function (f) {
        return { name: f.name, ethnic: f.ethnic, time: f.time, region: f.region };
      });

      // 地方特色节庆落在本月者（同上）
      const local = data.localSpecialFestivals.filter(function (f) {
        const fb = LOCAL_INFO[f.name] || {};
        const ms = Array.isArray(f.months) ? f.months : fb.months;
        return !!ms && ms.indexOf(mi) >= 0;
      }).map(function (f) {
        const fb = LOCAL_INFO[f.name] || {};
        return { name: f.name, region: f.region, time: f.time || fb.time || '' };
      });

      packs.push({
        m: mi,
        idx: pad2(mi),
        month: cf.month,
        english: cf.english,
        alias: aliasOf(cf.month, mi),
        lunarLabel: '农历' + LUNAR_CN[i] + '月',
        almanac: almanac,
        folk: folk,
        ethnic: ethnic,
        local: local,
        cAlmanac: almanac.length,
        cFolk: folk.length,
        cEthnic: ethnic.length,
        cLocal: local.length,
        cTotal: almanac.length + folk.length + ethnic.length + local.length
      });
    }

    return packs;
  },

  /** 当前分类下某月的项数 */
  _countOf(pack, cat) {
    if (!cat) return pack.cTotal;
    for (let i = 0; i < CATS.length; i++) {
      if (CATS[i].key === cat) return pack[CATS[i].field];
    }
    return 0;
  },

  /**
   * 生成 12 个月头。
   * 综合视图：大数字为全月合计，右侧四行分项；
   * 筛选态：大数字为该类项数，右侧两行（类名 + 全月合计）。
   */
  _heads(cat) {
    const packs = this._packs;
    return packs.map(function (p) {
      const count = cat ? p[cat === 'almanac' ? 'cAlmanac' : cat === 'folk' ? 'cFolk' : cat === 'ethnic' ? 'cEthnic' : 'cLocal'] : p.cTotal;
      let lines;
      if (cat) {
        let label = '';
        for (let i = 0; i < CATS.length; i++) {
          if (CATS[i].key === cat) label = CATS[i].label;
        }
        lines = [{ t: label, dim: false }, { t: '全月共 ' + p.cTotal + ' 项', dim: true }];
      } else {
        lines = [
          { t: '节令·' + p.cAlmanac, dim: false },
          { t: '民俗·' + p.cFolk, dim: false },
          { t: '民族·' + p.cEthnic, dim: false },
          { t: '地方·' + p.cLocal, dim: false }
        ];
      }
      return {
        m: p.m,
        idx: p.idx,
        month: p.month,
        english: p.english,
        lunarLabel: p.lunarLabel,
        count: count,
        lines: lines,
        zero: count === 0
      };
    });
  },

  // ---------- 交互 ----------

  /** 月头：互斥展开 / 收起 */
  onToggleMonth(e) {
    const m = Number(e.currentTarget.dataset.m);
    if (!m) return;
    if (this.data.open === m) {
      this.setData({ open: 0, cur: null, showTop: this.data.showTop });
      return;
    }
    this._mount(m, false);
  },

  /** 十二月方块条：切月 + 滚动定位 */
  onTapChip(e) {
    const m = Number(e.currentTarget.dataset.m);
    if (!m) return;
    this._mount(m, false);
    this._scrollTo('m' + m);
  },

  /** 四类 tab：进入该类；再点一次退回综合视图 */
  onTapCat(e) {
    const key = e.currentTarget.dataset.cat || '';
    const cat = this.data.cat === key ? '' : key;
    const tiles = this._heads(cat);

    // 当前展开月在新分类下为空时，落到第一个有内容的月份
    let open = this.data.open;
    if (cat && open && this._countOf(this._packs[open - 1], cat) === 0) {
      open = 0;
      for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].zero) { open = tiles[i].m; break; }
      }
    }

    if (open) {
      // 与 _mount 的字段合成一次 setData：避免先渲染空壳、再补内容的中间态
      const patch = this._mountPatch(open, false, cat);
      this.setData(Object.assign({ cat: cat, tiles: tiles }, patch));
      this._scrollTo('m' + open);
    } else {
      this.setData({ cat: cat, tiles: tiles, open: 0, cur: null });
    }
  },

  /** 民俗：展开全部 / 收起到 8 条（只对展开中的月份生效） */
  onToggleFolk() {
    if (!this.data.open) return;
    this._mount(this.data.open, !this.data.folkOpen);
  },

  /**
   * 展开某月：把该月数据下发到 cur。
   * folk 全量留在内存，只下发需要显示的切片（最多 8 条或全量）。
   */
  _mount(m, folkAll) {
    const patch = this._mountPatch(m, folkAll);
    if (patch) this.setData(patch);
  },

  /**
   * 只计算「展开某月」要下发的字段，不触发 setData。
   * 拆出来是为了让切分类时能和 cat / tiles 合成一次 setData，避免中间态闪一下。
   * @param {number} m 月份
   * @param {boolean} folkAll 民俗是否展开全部
   * @param {string} [catOverride] 尚未写入 this.data 的新分类（切分类时传）
   */
  _mountPatch(m, folkAll, catOverride) {
    const pack = this._packs && this._packs[m - 1];
    if (!pack) return null;

    const cat = catOverride === undefined ? this.data.cat : catOverride;
    const list = pack.folk;
    const hasMore = list.length > FOLK_PREVIEW;
    const openFolk = !!folkAll && hasMore;

    const inCat = function (key) { return !cat || cat === key; };
    const showAlmanac = inCat('almanac') && pack.cAlmanac > 0;
    const showFolk = inCat('folk') && pack.cFolk > 0;
    const showEthnic = inCat('ethnic') && pack.cEthnic > 0;
    const showLocal = inCat('local') && pack.cLocal > 0;

    let emptyNote = '';
    if (cat) {
      let label = '';
      for (let i = 0; i < CATS.length; i++) {
        if (CATS[i].key === cat) label = CATS[i].label;
      }
      if (this._countOf(pack, cat) === 0) emptyNote = '本月无' + label + '，可切到其他月份查看。';
    } else if (pack.cTotal === 0) {
      emptyNote = '本月暂无收录的节日。';
    }

    return {
      open: m,
      cur: {
        m: pack.m,
        idx: pack.idx,
        month: pack.month,
        english: pack.english,
        lunarLabel: pack.lunarLabel,
        almanac: pack.almanac,
        ethnic: pack.ethnic,
        local: pack.local,
        cAlmanac: pack.cAlmanac,
        cFolk: pack.cFolk,
        cEthnic: pack.cEthnic,
        cLocal: pack.cLocal,
        cTotal: pack.cTotal
      },
      folkView: openFolk || !hasMore ? list : list.slice(0, FOLK_PREVIEW),
      folkOpen: openFolk,
      folkMore: hasMore ? list.length - FOLK_PREVIEW : 0,
      folkToggleText: hasMore
        ? (openFolk ? '收起到前 ' + FOLK_PREVIEW + ' 条' : '展开其余 ' + (list.length - FOLK_PREVIEW) + ' 条')
        : '',
      showAlmanac: showAlmanac,
      showFolk: showFolk,
      showEthnic: showEthnic,
      showLocal: showLocal,
      emptyNote: emptyNote
    };
  },

  /** 先清空再赋值：连续切月时也能重新触发滚动 */
  _scrollTo(id) {
    this.setData({ scrollToId: '' }, () => {
      if (this._scrollToTimer) clearTimeout(this._scrollToTimer);
      this._scrollToTimer = setTimeout(() => { this.setData({ scrollToId: id }); }, 60);
    });
  },

  onToTop() {
    this._scrollTo('fest-top');
  },

  // ---------- 滚动 ----------

  /**
   * 量深色头与四类 tab 的底部，换算成滚动阈值。
   * 出现：tab 底边正好被导航栏盖住时（st = tabBottom − navH）；
   * 收起：再往回滚 8px（回差），避免阈值附近抖动。
   */
  _measureHead() {
    const q = wx.createSelectorQuery().in(this);
    q.select('.hero').boundingClientRect();
    q.select('.cats').boundingClientRect();
    q.select('.page-scroll').scrollOffset();
    q.exec((res) => {
      if (!res || !res[0] || !res[1]) return;
      const st = (res[2] && res[2].scrollTop) || 0;
      const catsBottom = res[1].bottom + st;
      this._hdShowAt = Math.round(catsBottom - this.data.navH);
      this._hdHideAt = this._hdShowAt - BAR_HYSTERESIS;
      this._syncHead(st);
    });
  },

  /** 按阈值切窄条；只在状态变化时 setData */
  _syncHead(st) {
    let hd = this.data.hdCompact;
    if (!hd && st >= this._hdShowAt) hd = true;
    else if (hd && st <= this._hdHideAt) hd = false;
    if (hd !== this.data.hdCompact) this.setData({ hdCompact: hd });
  },

  onScroll(e) {
    const st = (e.detail && e.detail.scrollTop) || 0;
    const now = Date.now();
    if (now - (this._lastScrollAt || 0) < SCROLL_THROTTLE) return;
    this._lastScrollAt = now;

    this._syncHead(st);

    if (st > TO_TOP_THRESHOLD) {
      if (!this.data.showTop) this.setData({ showTop: true });
    } else if (this.data.showTop) {
      this.setData({ showTop: false });
    }
  },

  onShareAppMessage() {
    return {
      title: '节日文化 — 全年节日与纪念日一览',
      path: '/pages/festivals/festivals'
    };
  },

  onShareTimeline() {
    return { title: '节日文化 — 全年节日与纪念日一览' };
  }
});
