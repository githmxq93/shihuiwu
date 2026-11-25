/**
 * 沙盘推演 · 鄗代之战（前251）
 * 通行叙事：燕王喜趁赵长平之丧发兵攻赵，栗腹攻鄗、卿秦攻代；
 * 廉颇破栗腹于鄗、乐乘破卿秦于代，赵军追围燕都，燕割五城请和。
 * 燕军「车二千乘」为《史记·燕召公世家》史载（一说十万、六十万，存异）；
 * 赵军兵力无确载，只标「无确载」。
 * 地名古今对照：鄗今河北柏乡北、代今河北蔚县、蓟今北京。
 */
var COLOR = { zhao: '#2b5262', yan: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'dai',    name: '代',   x: 150, y: 72,  tx: 150, ty: 58,  anchor: 'middle' },
  { id: 'ji',     name: '蓟',   x: 302, y: 72,  tx: 302, ty: 58,  anchor: 'middle' },
  { id: 'yishui', name: '易水', x: 282, y: 116, tx: 282, ty: 130, anchor: 'middle' },
  { id: 'hao',    name: '鄗',   x: 222, y: 128, tx: 208, ty: 122, anchor: 'end' },
  { id: 'handan', name: '邯郸', x: 190, y: 176, tx: 190, ty: 190, anchor: 'middle' }
];

var BASE0 = { dai: 'zhao', ji: 'yan', yishui: 'yan', hao: 'zhao', handan: 'zhao' };
var BASE1 = { dai: 'contested', ji: 'yan', yishui: 'yan', hao: 'contested', handan: 'zhao' };
var BASE2 = { dai: 'contested', ji: 'yan', yishui: 'yan', hao: 'contested', handan: 'zhao' };
var BASE3 = { dai: 'zhao', ji: 'yan', yishui: 'yan', hao: 'zhao', handan: 'zhao' };

var STAGES = [
  {
    label: '燕趁丧攻赵', seal: '伐赵',
    kicker: '阶段一 · 前251 年',
    title: '燕王喜发兵攻赵，栗腹攻鄗',
    turn: '燕王喜听相国栗腹之言，以为赵壮者尽死于长平，可乘其丧而伐之；遂起二军，栗腹攻鄗，卿秦攻代。',
    why: '燕国判断赵已虚弱，想趁长平之后夺取赵地；但赵军主力虽损，边军与将帅仍在，燕军的判断落空。',
    src: '《史记·燕召公世家》《赵世家》《廉颇蔺相如列传》；《资治通鉴》卷五。燕军「车二千乘」史载。',
    events: [
      { time: '前251', who: '栗腹', text: '劝燕王趁赵丧伐之', t: 0.08 },
      { time: '前251', who: '燕王喜', text: '起二军，车二千乘', t: 0.34 },
      { time: '前251', who: '栗腹', text: '率军攻鄗', t: 0.60, kind: 'flip', city: 'hao' },
      { time: '前251', who: '卿秦', text: '率军攻代', t: 0.84, kind: 'flip', city: 'dai' }
    ],
    nums: [
      { label: '燕军', value: '车二千乘', kind: '史载', n: null },
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '燕军一说', value: '十万（存异）', kind: '史载', n: 10 }
    ],
    hold: BASE1,
    flips: { hao: 0.60, dai: 0.84 },
    sieges: [
      { x: 222, y: 128, t: 0.60, label: '鄗受攻', side: 'yan', lx: 14, ly: -8, anchor: 'start' },
      { x: 150, y: 72, t: 0.84, label: '代受攻', side: 'yan', lx: 0, ly: -12, anchor: 'middle' }
    ],
    markers: [
      { type: 'host', side: 'yan', x: 302, y: 72, t: 0.04, name: '栗腹', lx: 316, ly: 84, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'yan', x: 258, y: 96, t: 0.46, name: '燕军', lx: 264, ly: 82, anchor: 'start', moveRef: 1 },
      { type: 'army', side: 'zhao', x: 190, y: 176, t: 0.02, name: '赵军', lx: 204, ly: 188, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 296 80 C 272 96 246 114 228 124', side: 'yan', t0: 0.10, t1: 0.56,
        label: '栗腹攻鄗', lx: 262, ly: 104, anchor: 'middle' },
      { d: 'M 292 78 C 250 74 198 72 158 72', side: 'yan', t0: 0.50, t1: 0.82,
        label: '卿秦攻代', lx: 226, ly: 62, anchor: 'middle' }
    ]
  },
  {
    label: '廉颇御鄗', seal: '御燕',
    kicker: '阶段二 · 前251 年',
    title: '赵使廉颇拒鄗，乐乘拒代',
    turn: '赵孝成王使廉颇将兵拒栗腹于鄗，乐乘拒卿秦于代；赵军虽经长平之损，边军尚整。',
    why: '赵迅速以宿将分头迎击，把燕军的两路进攻分别挡在鄗、代城下，避免其会师邯郸。',
    src: '《史记·廉颇蔺相如列传》《赵世家》；《资治通鉴》卷五。',
    events: [
      { time: '前251', who: '赵孝成王', text: '使廉颇拒鄗', t: 0.08 },
      { time: '前251', who: '廉颇', text: '率军至鄗，列阵待敌', t: 0.34 },
      { time: '前251', who: '乐乘', text: '率军拒卿秦于代', t: 0.60 },
      { time: '前251', who: '燕军', text: '轻赵无备，急攻两城', t: 0.86 }
    ],
    nums: [
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '燕军', value: '车二千乘', kind: '史载', n: null },
      { label: '战场', value: '鄗、代', kind: '史载', n: null }
    ],
    hold: BASE2,
    markers: [
      { type: 'host', side: 'zhao', x: 190, y: 176, t: 0.02, name: '廉颇', lx: 204, ly: 188, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'zhao', x: 202, y: 150, t: 0.34, name: '赵军', lx: 216, ly: 156, anchor: 'start' },
      { type: 'host', side: 'yan', x: 222, y: 128, t: 0.02, name: '栗腹', lx: 236, ly: 138, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 194 170 C 198 158 202 146 208 136', side: 'zhao', t0: 0.08, t1: 0.42,
        label: '廉颇趋鄗', lx: 188, ly: 154, anchor: 'end' }
    ]
  },
  {
    label: '鄗之战', seal: '破燕',
    kicker: '阶段三 · 前251 年',
    title: '廉颇破栗腹，乐乘破卿秦',
    turn: '廉颇大破燕军于鄗，杀栗腹；乐乘亦破卿秦于代。燕军两路俱溃，赵军转入追击。',
    why: '燕军分兵两路、互难呼应，被赵军各个击破；一路既溃，另一路侧翼暴露，随即崩溃。',
    src: '《史记·廉颇蔺相如列传》《燕召公世家》；《资治通鉴》卷五。',
    events: [
      { time: '前251', who: '廉颇', text: '大破燕军于鄗', t: 0.08 },
      { time: '前251', who: '廉颇', text: '杀栗腹', t: 0.36, kind: 'flip', city: 'hao' },
      { time: '前251', who: '乐乘', text: '破卿秦于代', t: 0.62, kind: 'flip', city: 'dai' },
      { time: '前251', who: '赵军', text: '两路俱胜，转入追击', t: 0.86 }
    ],
    nums: [
      { label: '燕军', value: '无确载', kind: '无确载', n: null },
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '燕将', value: '栗腹被杀', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { hao: 0.36, dai: 0.62 },
    sieges: [
      { x: 222, y: 128, t: 0.36, label: '鄗破燕', side: 'zhao', lx: -12, ly: 14, anchor: 'end' },
      { x: 150, y: 72, t: 0.62, label: '代破燕', side: 'zhao', lx: 0, ly: -12, anchor: 'middle' }
    ],
    markers: [
      { type: 'host', side: 'zhao', x: 206, y: 142, t: 0.02, name: '廉颇', lx: 192, ly: 154, anchor: 'end' },
      { type: 'army', side: 'zhao', x: 216, y: 134, t: 0.30, name: '赵军', lx: 230, ly: 142, anchor: 'start' },
      { type: 'army', side: 'yan', x: 226, y: 124, t: 0.02, name: '栗腹', lx: 240, ly: 116, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 210 140 C 216 136 220 132 224 130', side: 'zhao', t0: 0.06, t1: 0.34,
        label: '赵军反击', lx: 232, ly: 150, anchor: 'start' },
      { d: 'M 220 122 C 196 108 172 96 158 84', side: 'retreat', t0: 0.56, t1: 0.88,
        label: '燕军溃退', lx: 190, ly: 100, anchor: 'middle' }
    ]
  },
  {
    label: '赵围燕都', seal: '围蓟',
    kicker: '阶段四 · 前251 年',
    title: '赵军追围燕都，燕割五城请和',
    turn: '廉颇率赵军追击，围燕都蓟；燕王喜请和，割五城以赎。赵军乃还。',
    why: '赵以一次防御反击打到燕都，既雪长平后被人轻视之耻，也暂时稳住了北线。',
    src: '《史记·廉颇蔺相如列传》《燕召公世家》；《资治通鉴》卷五。',
    events: [
      { time: '前251', who: '廉颇', text: '率军追击，长驱入燕', t: 0.08 },
      { time: '前251', who: '赵军', text: '围燕都蓟', t: 0.36 },
      { time: '前251', who: '燕王喜', text: '割五城请和', t: 0.64 },
      { time: '前251', who: '廉颇', text: '受和而还', t: 0.88 }
    ],
    nums: [
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '燕割地', value: '五城', kind: '史载', n: null },
      { label: '燕军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE3,
    sieges: [
      { x: 302, y: 72, t: 0.36, label: '围燕都', side: 'zhao', lx: 0, ly: -12, anchor: 'middle' }
    ],
    markers: [
      { type: 'host', side: 'zhao', x: 262, y: 92, t: 0.02, name: '廉颇', lx: 248, ly: 104, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'zhao', x: 292, y: 80, t: 0.34, name: '赵军', lx: 292, ly: 94, anchor: 'middle' },
      { type: 'army', side: 'yan', x: 302, y: 72, t: 0.02, name: '燕军', lx: 316, ly: 84, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 266 90 C 278 82 290 76 298 74', side: 'zhao', t0: 0.08, t1: 0.36,
        label: '赵军围蓟', lx: 280, ly: 104, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 102 C 70 96 140 106 210 100 C 280 94 330 88 385 92', color: '#a8b6ab', width: 3 },
    { d: 'M 170 40 C 164 84 160 128 158 176', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 60 240 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 280 240 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 52 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 250 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 18, y: 92, t: '易　水', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 250, y: 150, t: '大 陆 泽', size: 8, color: '#7d6647', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '鄗·今河北柏乡北　代·今河北蔚县　蓟·今北京', size: 7.5, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '燕 赵 之 间', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'haodai',
  title: '鄗代之战',
  kicker: '沙 盘 推 演',
  subtitle: '鄗 · 代 · 蓟',
  years: '前251',
  yearUnit: '',
  era: '战国 · 燕王喜四年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝溃退',
  note: '示意沙盘：鄗今河北柏乡北、代今河北蔚县、蓟今北京，非真实地理比例',
  hook: '燕趁长平之丧攻赵，廉颇破栗腹于鄗、乐乘破卿秦于代，追围燕都',
  period: '战国',
  yearValue: -251,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '赵', b: '胜', sub: '前251' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
