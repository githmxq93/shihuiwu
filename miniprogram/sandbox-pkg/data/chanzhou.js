/**
 * 沙盘推演 · 澶州之战（1004）
 * 通行叙事：辽圣宗与萧太后亲征南下，攻瀛州；宋真宗在寇准力请下亲征澶州，
 * 宋军射杀辽将萧挞凛，两军对峙，终立澶渊之盟。
 * 辽军「号二十万」、岁币「三十万」为史载；宋军兵力无确载。
 * 地名古今对照：澶州今河南濮阳、瀛州今河北河间、定州今河北定州。
 */
var COLOR = { song: '#2b5262', liao: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'bianliang', name: '汴梁', x: 180, y: 320, tx: 180, ty: 336, anchor: 'middle' },
  { id: 'dingzhou',  name: '定州', x: 200, y: 190, tx: 186, ty: 184, anchor: 'end' },
  { id: 'yingzhou',  name: '瀛州', x: 240, y: 175, tx: 240, ty: 161, anchor: 'middle' },
  { id: 'chanzhou',  name: '澶州', x: 240, y: 270, tx: 240, ty: 286, anchor: 'middle' },
  { id: 'youzhou',   name: '幽州', x: 290, y: 130, tx: 290, ty: 116, anchor: 'middle' }
];

var BASE0 = { bianliang: 'song', dingzhou: 'song', yingzhou: 'song', chanzhou: 'song', youzhou: 'liao' };
var BASE1 = { bianliang: 'song', dingzhou: 'song', yingzhou: 'contested', chanzhou: 'song', youzhou: 'liao' };
var BASE2 = { bianliang: 'song', dingzhou: 'song', yingzhou: 'liao', chanzhou: 'song', youzhou: 'liao' };
var BASE3 = { bianliang: 'song', dingzhou: 'song', yingzhou: 'liao', chanzhou: 'contested', youzhou: 'liao' };
var BASE4 = { bianliang: 'song', dingzhou: 'song', yingzhou: 'liao', chanzhou: 'song', youzhou: 'liao' };

var STAGES = [
  {
    label: '辽军南下', seal: '南侵',
    kicker: '阶段一 · 1004 年 九月',
    title: '辽圣宗、萧太后亲征南下',
    turn: '辽圣宗与萧太后率军南下，攻宋瀛州；宋廷震动，群臣多主张迁都避敌。',
    why: '辽军深入宋境，意在逼宋订立有利和约；能否挡住这一击，关系到北宋国本。',
    src: '《宋史·真宗本纪》；《辽史·圣宗纪》；《续资治通鉴长编》卷五十七。',
    events: [
      { time: '1004·九月', who: '辽圣宗', text: '与萧太后亲征南下', t: 0.08 },
      { time: '1004·九月', who: '辽军', text: '攻瀛州', t: 0.34, kind: 'flip', city: 'yingzhou' },
      { time: '1004·九月', who: '宋廷', text: '群臣多主迁都', t: 0.58 },
      { time: '1004·九月', who: '寇准', text: '力请真宗亲征', t: 0.84 }
    ],
    nums: [
      { label: '辽军', value: '号二十万', kind: '史载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '瀛州', value: '被攻', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { yingzhou: 0.34 },
    markers: [
      { type: 'host', side: 'liao', x: 290, y: 130, t: 0.02, name: '辽圣宗', lx: 304, ly: 124, anchor: 'start' },
      { type: 'host', side: 'song', x: 240, y: 270, t: 0.02, name: '宋真宗', lx: 254, ly: 264, anchor: 'start' },
      { type: 'army', side: 'liao', x: 264, y: 154, t: 0.34, name: '辽军', lx: 278, ly: 148, anchor: 'start' }
    ],
    routes: [
      { d: 'M 288 136 C 276 146 262 158 248 170', side: 'liao', t0: 0.10, t1: 0.50,
        label: '辽军南下', lx: 292, ly: 156, anchor: 'start' }
    ]
  },
  {
    label: '瀛州陷落', seal: '城陷',
    kicker: '阶段二 · 1004 年 十月',
    title: '瀛州陷落，辽军趋澶州',
    turn: '辽军攻瀛州，昼夜攻城，宋守军力战；城破，辽军乘势南下，直趋澶州。',
    why: '瀛州一失，澶州便成汴梁最后一道屏障；辽军兵锋已近黄河。',
    src: '《宋史·真宗本纪》；《辽史·圣宗纪》；《续资治通鉴长编》卷五十七。',
    events: [
      { time: '1004·十月', who: '辽军', text: '昼夜攻瀛州', t: 0.08 },
      { time: '1004·十月', who: '瀛州', text: '城破', t: 0.34, kind: 'flip', city: 'yingzhou' },
      { time: '1004·十月', who: '辽军', text: '乘势南下', t: 0.58 },
      { time: '1004·十月', who: '辽军', text: '直趋澶州', t: 0.84 }
    ],
    nums: [
      { label: '辽军', value: '号二十万', kind: '史载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '瀛州', value: '城破', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { yingzhou: 0.34 },
    sieges: [
      { x: 240, y: 175, t: 0.34, label: '城破', side: 'liao', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'liao', x: 240, y: 175, t: 0.30, name: '萧太后', lx: 254, ly: 169, anchor: 'start' },
      { type: 'host', side: 'song', x: 240, y: 270, t: 0.02, name: '宋真宗', lx: 226, ly: 264, anchor: 'end' },
      { type: 'army', side: 'liao', x: 252, y: 220, t: 0.58, name: '辽军', lx: 266, ly: 214, anchor: 'start' }
    ],
    routes: [
      { d: 'M 242 182 C 244 208 244 236 242 262', side: 'liao', t0: 0.54, t1: 0.92,
        label: '直趋澶州', lx: 256, ly: 218, anchor: 'start' }
    ]
  },
  {
    label: '真宗亲征', seal: '亲征',
    kicker: '阶段三 · 1004 年 十一月',
    title: '宋真宗亲征澶州，射杀萧挞凛',
    turn: '宋真宗在寇准力请下渡河至澶州北城，宋军士气大振；辽将萧挞凛被宋军床子弩射死，辽军气夺。',
    why: '皇帝亲临前线，宋军由守转稳；辽军折损大将，攻城之势顿挫。',
    src: '《宋史·真宗本纪》《寇准传》；《辽史·萧挞凛传》。',
    events: [
      { time: '1004·十一月', who: '宋真宗', text: '渡河至澶州北城', t: 0.08, kind: 'flip', city: 'chanzhou' },
      { time: '1004·十一月', who: '宋军', text: '士气大振', t: 0.34 },
      { time: '1004·十一月', who: '萧挞凛', text: '被床子弩射死', t: 0.58 },
      { time: '1004·十一月', who: '辽军', text: '气夺，攻城顿挫', t: 0.84 }
    ],
    nums: [
      { label: '辽军', value: '号二十万', kind: '史载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '萧挞凛', value: '阵亡', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { chanzhou: 0.08 },
    markers: [
      { type: 'host', side: 'song', x: 240, y: 270, t: 0.02, name: '宋真宗', lx: 226, ly: 284, anchor: 'end' },
      { type: 'host', side: 'liao', x: 240, y: 175, t: 0.02, name: '萧太后', lx: 254, ly: 169, anchor: 'start', weak: true },
      { type: 'army', side: 'song', x: 228, y: 258, t: 0.34, name: '宋军', lx: 214, ly: 252, anchor: 'end' }
    ],
    routes: [
      { d: 'M 182 314 C 200 300 220 286 234 276', side: 'song', t0: 0.06, t1: 0.42,
        label: '真宗亲征', lx: 190, ly: 306, anchor: 'end' }
    ]
  },
  {
    label: '澶渊之盟', seal: '议和',
    kicker: '阶段四 · 1004 年 十二月',
    title: '澶渊之盟，南北罢兵',
    turn: '宋辽议和：宋岁输银十万两、绢二十万匹，两国约为兄弟之国，各守旧疆。澶州围解，辽军北还。',
    why: '双方都无力彻底击溃对方；以岁币换和平，使宋辽维持百余年相对安定。',
    src: '《宋史·真宗本纪》；《辽史·圣宗纪》；《续资治通鉴长编》卷五十八。',
    events: [
      { time: '1004·十二月', who: '宋辽', text: '议和于澶州', t: 0.08 },
      { time: '1004·十二月', who: '宋', text: '岁输银绢三十万', t: 0.34 },
      { time: '1004·十二月', who: '两国', text: '约为兄弟之国，各守旧疆', t: 0.58 },
      { time: '1004·十二月', who: '辽军', text: '北还，澶州围解', t: 0.84, kind: 'flip', city: 'chanzhou' }
    ],
    nums: [
      { label: '岁币', value: '三十万', kind: '史载', n: null },
      { label: '辽军', value: '号二十万', kind: '史载', n: null },
      { label: '结果', value: '澶渊之盟', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { chanzhou: 0.84 },
    markers: [
      { type: 'host', side: 'song', x: 240, y: 270, t: 0.02, name: '宋真宗', lx: 254, ly: 264, anchor: 'start' },
      { type: 'host', side: 'liao', x: 240, y: 175, t: 0.02, name: '辽圣宗', lx: 226, ly: 169, anchor: 'end' },
      { type: 'army', side: 'liao', x: 254, y: 200, t: 0.60, name: '辽军北还', lx: 268, ly: 194, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 242 182 C 246 206 248 230 248 252', side: 'retreat', t0: 0.62, t1: 0.94,
        label: '辽军北还', lx: 262, ly: 212, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 250 C 70 246 140 254 210 248 C 280 242 340 248 385 244', color: '#a8b6ab', width: 3 },
    { d: 'M 40 40 C 70 110 100 170 130 230', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 110 80 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 70 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 60 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 244, t: '黄　河', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '澶州·今河南濮阳　瀛州·今河北河间　幽州·今北京', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '河　朔', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'chanzhou',
  title: '澶州之战',
  kicker: '沙 盘 推 演',
  subtitle: '瀛州 · 澶州',
  years: '1004',
  yearUnit: 'AD',
  era: '北宋 · 景德元年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：澶州今河南濮阳、瀛州今河北河间，非真实地理比例',
  hook: '辽军南下至澶州，真宗亲征、萧挞凛阵亡，终立澶渊之盟',
  period: '宋辽',
  yearValue: 1004,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '宋辽', b: '盟', sub: '1004' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
