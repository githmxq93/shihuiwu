// 年份查询（七历对照）
//
// 与网页端 /calendar 同一份数据、同一个接口（GET /api/calendar?q=）。
// 接口约定：解析失败也返回 HTTP 200 + success:false（不是 404），
// 故必须判 body.success，不能只看状态码。
//
// WXML 里不能调函数，所以「年月日式」的拼装（公元前/公元、区间、可用性）
// 全部在 JS 侧算好放进 data，模板只负责摆放。

const request = require('../../../utils/request');
const API = require('../../../config/api');
const { navTo } = require('../../../utils/nav');
const guide = require('../../../utils/guide');

// 七套纪年的口径说明，点纪年格弹出。
// key 与 toView().cells[].key 一一对应（era / gz / ad / hijri / buddhist / minguo / jp）。
// 文案与网页端 src/pages/CalendarPage.tsx 的 CAL_HELP 完全一致，两端同一份产品。
const CAL_HELP = {
  era: {
    title: '年号纪年',
    tagline: '帝王即位或中途改元时颁定，用来纪其在位之年。',
    points: [
      { h: '怎么数', d: '改元当年即「元年」，次年「二年」，依此类推。所以「祥兴二年」是祥兴元年的下一年，不是加两年。' },
      { h: '同年可并存多个', d: '并立政权各用各的年号。1279 年既是南宋祥兴二年，也是元至元十六年，本页会全部列出，按改元最晚者排在前面。' },
      { h: '一个皇帝可多次改元', d: '唐高宗在位用过 14 个年号，武则天用过 13 个。所以「贞观」只对应太宗一朝，不能反推「唐代某年」。' },
      { h: '年中改元', d: '若在年中改元，这一年在新旧两个年号下各有一套称呼，查同一年可能同时出现两个年号。' },
      { h: '什么时候没有年号', d: '先秦不用年号（本页从西汉建元元年即公元前 140 年起收录）；1912 年民国建立后废除年号。' }
    ]
  },
  gz: {
    title: '干支纪年',
    tagline: '十天干与十二地支依次相配，六十年一轮回，又称六十甲子。',
    points: [
      { h: '起算点', d: '公元 4 年为甲子年，此后每 60 年重复一次。公元前年份按天文纪年（公元前 1 年记作 0 年）换算，否则会整体错一位。' },
      { h: '为什么好用', d: '干支连续不断、不依赖帝王，是跨朝代核对年份最可靠的坐标——史书说「岁在甲子」，不必先知道当时是谁在位。' },
      { h: '不只是纪年', d: '同一天干地支还用于纪日（六十日一轮）与纪月，读史时注意区分是哪一级。' },
      { h: '与公历的错位', d: '干支以农历年为单位，公历 1—2 月往往仍属上一干支年。本页按「该年农历年所属干支」给出，精确到日需另查历书。' }
    ]
  },
  ad: {
    title: '公元纪年',
    tagline: '以传说的耶稣降生之年为元年，又称西元。',
    points: [
      { h: '没有公元 0 年', d: '公元前 1 年之后直接是公元 1 年。计算跨公元前后的时间跨度时要减 1（例如公元前 221 年到公元 2026 年相隔 2246 年，不是 2247 年）。' },
      { h: '历法更替', d: '1582 年 10 月 15 日以前欧洲通行儒略历，之后改用格里高利历（现行公历）。以「年」为单位的换算不受影响，但精确到日会差 10 余天。' },
      { h: '中国何时采用', d: '1912 年中华民国改用公历，1949 年后中华人民共和国沿用。此前史书的年份都是年号纪年或干支纪年，公元年是后人换算标注。' }
    ]
  },
  hijri: {
    title: '伊斯兰历（希吉来历）',
    tagline: '以公元 622 年先知迁居麦地那为元年，是纯阴历。',
    points: [
      { h: '一年有多长', d: '12 个朔望月，约 354 或 355 天，比公历年短约 11 天。所以伊斯兰历的月份会逐年「漂移」，斋月可以在任何季节。' },
      { h: '为什么是区间', d: '正因为一年短 11 天，一个公历年通常跨两个希吉来年（个别情况跨三个），本页给出区间而不是单一数字。' },
      { h: '算法差异', d: '本页用民用算术历（tabular，Kuwaiti 算法）推算，与天文观测的乌姆古拉历可能相差一日。以「年」为单位足够，精确到日请以当地历书为准。' },
      { h: '起算之前', d: '公元 622 年 7 月以前伊斯兰历尚未起算，本页显示「尚未起算」。' }
    ]
  },
  buddhist: {
    title: '佛历',
    tagline: '以佛陀入灭之年为元年，本页取「佛历 = 公元 + 543」。',
    points: [
      { h: '两派口径', d: '南传佛教多以公元前 544 年为佛灭之年（佛历 = 公元 + 544），北传与泰国现行佛历用 +543。本页取 +543，故与另一派相差一年。' },
      { h: '在哪用', d: '泰国、斯里兰卡、缅甸、柬埔寨、老挝的官方或通用历法，泰国佛历年份即公历加 543（如 2026 年为佛历 2569 年）。' },
      { h: '起算之前', d: '公元前 543 年之前佛历尚未起算，本页显示「尚未起算」。' }
    ]
  },
  minguo: {
    title: '民国纪年',
    tagline: '以中华民国成立之年（1912 年 1 月 1 日）为元年。',
    points: [
      { h: '怎么算', d: '民国 N 年 = 1912 + N − 1。所以民国元年是 1912 年，民国 34 年是 1945 年。' },
      { h: '1912 年之前', d: '用「民国前 N 年」表示，民国前 1 年即 1911 年。' },
      { h: '现在还用吗', d: '1949 年后中国大陆改用公元纪年；台湾地区仍通行民国纪年，正式文书与身份证件都在用。' }
    ]
  },
  jp: {
    title: '日本纪年',
    tagline: '日本年号起于大化元年（645 年）。明治以后改为「一世一元」，一个天皇只用一个年号。',
    points: [
      { h: '起于大化', d: '大化元年（645 年）仿唐制建年号，是日本第一个年号。此后一千三百多年间共用了两百多个年号，多数取自中国典籍成词。' },
      { h: '曾经中断', d: '白雉五年（654 年）之后年号一度停用，直到大宝元年（701 年）才恢复，中间近半个世纪没有年号，本页会直接说明而不显示空值。' },
      { h: '南北朝并用', d: '1331—1392 年日本分裂为南朝（吉野）与北朝（京都），两朝各自改元，同一年会有两个年号并存，本页都列出并标明所属朝廷。' },
      { h: '一世一元', d: '明治元年（1868 年）起改为一个天皇只用一个月号，所以「明治」「大正」「昭和」「平成」「令和」既是年号也是天皇的代称。' },
      { h: '与中原年号同名', d: '日本年号常与中原年号重名（如「永和」「建武」「弘安」），但纪年各自独立。所以直接搜「永和二年」仍按中原纪年解析，要查日本的请加前缀，如「日本永和二年」。' }
    ]
  }
};

// 「纪年体系」标注 → 样式令牌。WXML 里不能拼类名，故在 JS 侧先映射成 ASCII 后缀。
const SCOPE_CLS = { 正朔: 'orthodox', 对外: 'outward', 对内: 'inward' };

/** 公元年 → 展示用的年前缀与数字（公元前 221 年不写成「公元前 -221 年」） */
function primaryOf(year) {
  return {
    prefix: year < 0 ? '公元前' : '公元',
    num: Math.abs(year)
  };
}

/** 把接口返回拼成模板能直接渲染的结构 */
function toView(d) {
  const hijri = d.hijri || {};
  const buddhist = d.buddhist || {};
  const minguo = d.minguo || {};
  const gz = d.ganzhi || {};
  const jp = d.japanese || {};

  // 日本纪年：list 已由服务端按「统一 → 南朝 → 北朝」、再按起始年排好序，
  // 这里只做模板可直接渲染的拼装（朝廷徽章类名、天皇·起讫年一行），不再排序。
  const jpList = (jp.list || []).map(function (it, i) {
    const court = it.court || '统一';
    const emperor = it.emperor || '';
    const span = it.span || '';
    return {
      key: 'jp-' + (it.era || '') + '-' + (it.start === null || it.start === undefined ? '' : it.start) + '-' + i,
      label: it.label || it.era || '',
      emperor: emperor,
      span: span,
      court: court,
      // WXML 不能拼类名，先在 JS 侧映射成 ASCII 后缀
      courtCls: court === '南朝' ? 'jp-court-south' : court === '北朝' ? 'jp-court-north' : 'jp-court-unified',
      // 只有南北朝（与个别并行年号）需要亮出朝廷，统一的年号不加徽章
      showCourt: court !== '统一',
      meta: emperor ? emperor + '天皇（' + span + '）' : span,
      note: it.note || ''
    };
  });

  const cells = [
    {
      key: 'era',
      label: '年号纪年',
      value: d.eras && d.eras.length ? d.eras[0].label : '—',
      sub: d.eras && d.eras.length ? d.eras[0].regime : (d.year <= -140 ? '先秦纪年不用年号' : d.year >= 1912 ? '1912 年起不再行用年号' : '该年无在行用中的年号'),
      off: !(d.eras && d.eras.length)
    },
    {
      key: 'gz',
      label: '干支纪年',
      value: gz.ganzhi ? gz.ganzhi + '年' : '—',
      sub: gz.gan ? gz.gan + '干 · ' + gz.zhi + '支 · 属' + gz.zodiac : '',
      off: false
    },
    {
      key: 'ad',
      label: '公元纪年',
      value: d.year < 0 ? '公元前 ' + -d.year + ' 年' : '公元 ' + d.year + ' 年',
      sub: '儒略历／格里高利历同系',
      off: false
    },
    {
      key: 'hijri',
      label: '伊斯兰历',
      value: hijri.available ? (hijri.from === hijri.to ? hijri.from + ' 年' : hijri.from + '—' + hijri.to + ' 年') : '—',
      sub: hijri.available ? (hijri.note || '希吉来民用历') : (hijri.note || '尚未起算'),
      off: !hijri.available
    },
    {
      key: 'buddhist',
      label: '佛历',
      value: buddhist.available ? buddhist.year + ' 年' : '—',
      sub: buddhist.available ? '以公元前 543 年为元年' : (buddhist.note || '尚未起算'),
      off: !buddhist.available
    },
    {
      key: 'minguo',
      label: '民国纪年',
      value: minguo.label || '—',
      sub: '民国元年 = 1912 年',
      off: false
    },
    {
      key: 'jp',
      label: '日本纪年',
      value: jpList.length ? jpList[0].label : '—',
      sub: jpList.length
        ? (jpList[0].emperor ? '日本 · ' + jpList[0].emperor + '天皇' : '日本 · ' + jpList[0].span)
        : (jp.note || '日本年号始于 645 年'),
      off: !(jp && jp.available)
    }
  ];

  const eras = (d.eras || []).map(function (e) {
    const scope = e.scope || '';
    return {
      key: e.regime + '-' + e.era + '-' + e.start,
      label: e.label,
      // 政权名单独留一份：结果态把它放在年号上方的小字行，主条与并立行都用它
      regime: e.regime,
      meta: e.regime + ' · ' + e.ruler,
      // 政权已在小字行显示过，年号下面这行只留君主，避免「南宋 / 南宋 · 赵昺」重复
      metaLine: e.ruler ? e.ruler : (e.regime + ' · ' + e.ruler),
      // 注记另起一行：挤在「政权 · 君主」后面会把整行顶到屏边
      note: e.note || '',
      // 纪年体系标注（正朔/对外/对内），没有则空串，模板据此决定是否渲染徽章
      scope: scope,
      scopeCls: SCOPE_CLS[scope] || '',
      scopeNote: e.scopeNote || '',
      // 补注表新增的并行纪年（如「太元十四年」），属异说，整行降权并加角标
      alt: !!e.synthetic
    };
  });

  // 同名年号候选：把当前命中的那条标成 active，其余可点切换
  const candidates = (d.candidates || []).map(function (c) {
    const active = (d.eras || []).some(function (e) {
      return e.era === c.era && e.regime === c.regime && e.start === c.start;
    });
    return {
      key: c.regime + '-' + c.start + '-' + c.era,
      regime: c.regime,
      span: c.start + '—' + c.end,
      query: c.query,
      active: active
    };
  });

  const rel = d.related || {};
  const relatedText =
    rel.figures > 0
      ? '这一年库内收有 ' + rel.figures + ' 位人物的 ' + rel.events + ' 条事迹' + (rel.chronicle > 0 ? '，另有 ' + rel.chronicle + ' 条历史大事' : '')
      : '';

  // 结果态把七历分两层：公元 / 干支 / 年号已由主卡与年号卡承载，
  // 其余项全部进「其余纪年」小格。
  // 按 cells 动态过滤，不写死 key —— 将来接口多返回任何一项都会自动多一格，
  // 不会被静默丢弃（旧写法写死四个 key，多余项直接消失）。
  const PRIMARY_CELL_KEYS = ['era', 'gz', 'ad'];
  const otherCells = cells.filter(function (c) {
    return c && PRIMARY_CELL_KEYS.indexOf(c.key) < 0;
  });

  // 距今：以设备当前年份为基准的整数年差，纯展示。
  // 公元纪年没有 0 年，故公元前按「当前年 + |目标年| − 1」换算（公元前 221 年距今 2246 年）；
  // 差值为 0 时显示「今年」，负数（未来年份）不出这一行，避免出现负值。
  const nowYear = new Date().getFullYear();
  const agoYears = d.year < 0 ? nowYear + (-d.year) - 1 : nowYear - d.year;
  const agoText = agoYears > 0 ? '距今 ' + agoYears + ' 年' : agoYears === 0 ? '今年' : '';

  return {
    primary: primaryOf(d.year),
    agoText: agoText,
    ganzhi: gz,
    eras: eras,
    parallel: eras.slice(1),
    cells: cells,
    otherCells: otherCells,
    candidates: candidates.length > 1 ? candidates : [],
    bareEra: !!d.bareEra,
    normalized: d.normalized || '',
    year: d.year,
    relatedText: relatedText,
    // 该年整体的纪年体系说明（如 337 年前凉双纪年），无则为空串
    annotationNote: d.annotationNote || '',
    // 日本纪年：list 超过 1 条（南北朝并存 / 2019 平成与令和交界）才单独成块
    jpList: jpList.length > 1 ? jpList : [],
    // 日本纪年不可用（645 年前 / 654—700 停用）时透传服务端给的原因文案
    jpEmptyNote: jp.available ? '' : (jp.note || ''),
    // 用日本年号命中时（如「日本永和二年」）给一行轻提示
    jpVia: d.via === 'jp'
  };
}

/**
 * 输入建议三型 → 扁平渲染行。
 * 朝代组拆成「标题行 + 每个参照年一行」，年号一行。
 * 在 JS 侧摊平而不是让 WXML 嵌套两层 wx:for：模板里混排
 * 「不可点的标题」与「可点的行」用 wx:if/wx:else 一层就够，改动最小。
 */
function toSuggRows(list) {
  const out = [];
  (list || []).forEach(function (s) {
    if (!s) return;
    if (s.type === 'dynasty') {
      out.push({
        kind: 'head',
        key: 'h:' + s.key,
        name: s.name,
        spanText: s.spanText,
        derived: !!s.derived
      });
      (s.items || []).forEach(function (it) {
        out.push({
          kind: 'preset',
          key: 'p:' + s.key + ':' + it.kind,
          label: it.label,
          yearText: it.yearText,
          note: it.note,
          query: String(it.year)
        });
      });
    } else if (s.type === 'era') {
      out.push({
        kind: 'era',
        key: 'e:' + s.text + ':' + s.start,
        label: '年号',
        yearText: s.title,
        note: s.sub,
        query: s.text + '元年'
      });
    }
  });
  return out;
}

Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 96,
    headH: 0,
    bodyScrollTop: 0,
    q: '',
    loading: false,
    result: null,
    miss: null,
    // 输入建议：suggRows 为摊平后的渲染行（朝代标题 + 参照年 / 年号）
    suggRows: [],
    suggOpen: false,
    // 口径浮层：sheet 为当前展开的纪年 key（null = 关闭），sheetDoc 为对应文档
    sheet: null,
    sheetDoc: null,
    // 进场动画开关：先渲染成收起态，下一帧再置 true，transition 才会跑
    sheetShown: false
  },

  onLoad(query) {
    try {
      const sys = wx.getWindowInfo();
      const safeTop = sys && sys.statusBarHeight ? sys.statusBarHeight : 44;
      // 头部 padding-top 必须正好等于 nav 高度（statusBar + 44），深色才与 nav 拼无缝；
      // headH 先给估值：fixed 头不占流，滚动容器要按它的实际高度让位，渲染后由 _measureHead 校正。
      // 检索框已移入头内，内容高度由 124rpx 增到 244rpx（标题行 + 24 间距 + 80 检索框 + 上下留白），
      // 估值贴近真值，首帧才不会因让位不足而跳一下。
      const navH = safeTop + 44;
      const estHead = Math.round((244 * ((sys && sys.windowWidth) || 375)) / 750);
      this.setData({ safeAreaTop: safeTop, navBarHeight: navH, headH: navH + estHead });
      const that = this;
      setTimeout(function () { that._measureHead(); }, 0);
    } catch (e) {
      /* 取不到就用默认值 */
    }
    const q = query && query.q ? String(query.q) : '';
    if (q) {
      this.setData({ q: q });
      this.fetch(q);
      // 从分享链接带进来的可能是朝代名（?q=唐），主查询必然落空，
      // 必须同时取一次建议，否则用户只看到「没识别出年份或年号」
      this.suggest(q);
    }
  },

  onReady() {
    this._tryAutoGuide();
  },

  onShow() {
    // onShow 早于 onReady，延时的启动由这里兜底（重看也在这一步拉起）
    this._tryAutoGuide();
  },

  /**
   * 年份查询首次引导：只在空态（三张示例卡 + 七历说明都在）时出现。
   * 已有结果或落空时不展示，也不写完成，下次进空态再试。
   */
  _tryAutoGuide(delay) {
    if (!guide.shouldShow('calendar') && !guide.hasReplay('calendar')) return;
    if (this.data.loading || this.data.result || this.data.miss) return;
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
    const wait = typeof delay === 'number' ? delay : 300;
    const that = this;
    this._guideTimer = setTimeout(function () {
      that._guideTimer = null;
      const layer = that.selectComponent('#guideLayer');
      if (layer) layer.autoStart('calendar');
    }, wait);
  },

  /** 测量 fixed 深色头实际高度，供 scroll-view 内的 .head-spacer 让位 */
  _measureHead() {
    const that = this;
    this.createSelectorQuery().select('#calHead').boundingClientRect(function (r) {
      if (r && r.height) that.setData({ headH: Math.round(r.height) });
    }).exec();
  },

  /**
   * 引导需要把某块内容滚进视口时由 guide-layer 触发。
   * 本页滚动容器是 .body（scroll-view，定高 100vh），顶部被 fixed 深色头盖住，
   * 所以上界取「容器顶 + 头部高 + 12」，下界取容器底 - 12；
   * 目标放不下时优先把上沿留在头部下方，避免滚进去却被头部遮住。
   */
  onGuideScrollTo(e) {
    const selector = (e && e.detail && e.detail.selector) || '';
    if (!selector) return;
    const that = this;
    const headH = this.data.headH || 0;
    wx.createSelectorQuery()
      .select(selector)
      .boundingClientRect()
      .select('.body')
      .boundingClientRect()
      .select('.body')
      .scrollOffset()
      .exec(function (res) {
        const rect = res && res[0];
        const view = res && res[1];
        const sc = res && res[2];
        if (!rect || !view || !sc) return;
        const topLimit = view.top + headH + 12;
        const bottomLimit = view.bottom - 12;
        const cur = sc.scrollTop || 0;
        let next = cur;
        if (rect.bottom > bottomLimit) {
          // 本页两步的卡片都优先落在目标上方，所以下沿只贴视口底、不额外在下方留空：
          // 第 2 步是两个卡片的并集，若按“下方留 240”滚，上方那张会被 fixed 头遮住。
          let delta = rect.bottom - bottomLimit;
          // 目标本身高于可视区：对齐上沿，避免整块被头部遮住
          if (rect.top - delta < topLimit) delta = rect.top - topLimit;
          next = cur + delta;
        } else if (rect.top < topLimit) {
          next = cur + (rect.top - topLimit);
        }
        next = Math.max(0, Math.round(next));
        if (Math.abs(next - cur) < 2) return;
        // 先对齐当前值再写新值：手动滚动后 data 里的旧值不会卡住本次更新
        that.setData({ bodyScrollTop: cur }, function () {
          that.setData({ bodyScrollTop: next });
        });
      });
  },

  onUnload() {
    if (this._sheetTimer) {
      clearTimeout(this._sheetTimer);
      this._sheetTimer = null;
    }
    if (this._sugTimer) {
      clearTimeout(this._sugTimer);
      this._sugTimer = null;
    }
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
  },

  onInput(e) {
    this.setData({ q: e.detail.value });
    this.suggest(e.detail.value);
  },

  onClear() {
    if (this._sugTimer) {
      clearTimeout(this._sugTimer);
      this._sugTimer = null;
    }
    this._sugSeq = (this._sugSeq || 0) + 1; // 让在途请求作废
    this.setData({ q: '', result: null, miss: null, suggRows: [], suggOpen: false });
  },

  /**
   * 输入建议（防抖 180ms）。
   * 与主查询分两路：主查询只认能解析成年份的输入，「唐」必然落空，
   * 正需要建议来兜——所以不能等主查询失败再补，要并行去取。
   */
  suggest(raw) {
    const query = String(raw || '').trim();
    if (this._sugTimer) {
      clearTimeout(this._sugTimer);
      this._sugTimer = null;
    }
    if (!query) {
      this.setData({ suggRows: [], suggOpen: false });
      return;
    }
    const seq = (this._sugSeq || 0) + 1;
    this._sugSeq = seq;
    this._sugTimer = setTimeout(() => {
      request
        .get(API.CALENDAR.SUGGEST(query), { toast: false })
        .then((body) => {
          if (this._sugSeq !== seq) return;
          const rows = toSuggRows((body && body.success && body.data) || []);
          // 纯年份（如 1279）服务端只回一条年份卡，结果区已经显示了，
          // 再在输入框下重复一遍是冗余信息，故只在有可选项时才展开
          const hasPick = rows.some(function (r) {
            return r.kind !== 'head';
          });
          this.setData({ suggRows: rows, suggOpen: hasPick });
        })
        .catch(() => {
          if (this._sugSeq === seq) this.setData({ suggRows: [], suggOpen: false });
        });
    }, 180);
  },

  /** 点建议行：拿到目标年份/年号，直接查 */
  onPickSugg(e) {
    const q = e.currentTarget.dataset.q;
    if (!q) return;
    if (this._sugTimer) {
      clearTimeout(this._sugTimer);
      this._sugTimer = null;
    }
    this._sugSeq = (this._sugSeq || 0) + 1;
    this.setData({ q: q, suggRows: [], suggOpen: false });
    this.fetch(q);
  },

  // 点示例 / 点同名年号候选：直接查，不额外 toast
  onPick(e) {
    const q = e.currentTarget.dataset.q;
    if (!q) return;
    this.setData({ q: q, suggRows: [], suggOpen: false });
    this.fetch(q);
  },

  onSearch() {
    const q = (this.data.q || '').trim();
    if (!q) {
      wx.showToast({ title: '输入年份或年号', icon: 'none' });
      return;
    }
    this.setData({ suggRows: [], suggOpen: false });
    this.fetch(q);
  },

  fetch(raw) {
    const query = String(raw || '').trim();
    if (!query) return;
    const seq = (this._seq || 0) + 1;
    this._seq = seq;
    this.setData({ loading: true });

    request
      // toast:false —— 失败态由页面内联提示承担，避免再弹一个重复的 toast
      .get(API.CALENDAR.QUERY(query), { toast: false })
      .then((body) => {
        if (this._seq !== seq) return; // 只认最后一次请求
        if (body && body.success) {
          this.setData({ result: toView(body.data), miss: null, loading: false });
        } else {
          this.setData({
            result: null,
            miss: {
              message: (body && body.message) || '没识别出年份或年号',
              suggestions: ((body && body.suggestions) || []).slice(0, 6).map(function (s) {
                // 建议项点一下查该年号元年，故 query 用「<年号>元年」
                return { key: s.era + '-' + s.regime, label: s.label, q: s.era + '元年' };
              })
            },
            loading: false
          });
        }
      })
      .catch((err) => {
        if (this._seq !== seq) return;
        this.setData({
          result: null,
          miss: { message: (err && err.message) || '网络开小差了，请稍后再试', suggestions: [] },
          loading: false
        });
      });
  },

  onGoTimeline() {
    const y = this.data.result && this.data.result.year;
    if (y === undefined || y === null) return;
    navTo('/timeline-pkg/pages/timeline/timeline?year=' + y);
  },

  // ── 口径浮层 ──
  onOpenSheet(e) {
    const key = e.currentTarget.dataset.key;
    const doc = CAL_HELP[key];
    if (!doc) return;
    if (this._sheetTimer) {
      clearTimeout(this._sheetTimer);
      this._sheetTimer = null;
    }
    // 先以收起态挂载（sheetShown=false），下一帧再打开，transition 才会跑
    this.setData({ sheet: key, sheetDoc: doc, sheetShown: false });
    wx.nextTick(() => {
      this.setData({ sheetShown: true });
    });
  },

  onCloseSheet() {
    if (!this.data.sheet) return;
    this.setData({ sheetShown: false });
    // 等退场 transition（蒙层 0.22s、卡片 0.26s）跑完再移除节点，避免动画被截断
    this._sheetTimer = setTimeout(() => {
      this._sheetTimer = null;
      this.setData({ sheet: null, sheetDoc: null });
    }, 280);
  },

  // 吞掉蒙层的滑动与卡片内的点击冒泡，避免滚动穿透 / 误关
  noop() {},

  onShareAppMessage() {
    const q = this.data.result ? this.data.result.normalized : this.data.q;
    return {
      title: q ? q + ' · 七种纪年对照' : '年份查询 · 年号 干支 公元 伊斯兰历 佛历 民国 日本',
      path: '/timeline-pkg/pages/calendar/calendar' + (q ? '?q=' + encodeURIComponent(q) : '')
    };
  },

  onShareTimeline() {
    const q = this.data.result ? this.data.result.normalized : this.data.q;
    return {
      title: q ? q + ' · 七种纪年对照' : '年份查询 · 七种纪年对照',
      query: q ? 'q=' + encodeURIComponent(q) : ''
    };
  }
});
