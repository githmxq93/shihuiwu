/**
 * 沙盘推演 · 即墨之战（前284—前279）
 * 通行叙事：乐毅伐齐，下齐七十余城，唯莒、即墨未下；齐湣王死，田单守即墨。
 * 燕昭王死，惠王立，田单纵反间，燕以骑劫代乐毅；骑劫虐降卒、掘冢墓，即墨人愤怒。
 * 田单诈降，以火牛阵夜袭燕营，燕军大溃；齐人追亡逐北，尽复七十余城。
 * 「七十余城」「千余牛」为史载；双方兵数无确载。
 * 地名古今对照：即墨今山东平度东南、临淄今山东淄博临淄、莒今山东莒县、蓟今北京。
 */
var COLOR = { yan: '#6f3a22', qi: '#2b5262', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'ji',    name: '蓟',   x: 256, y: 88,  tx: 256, ty: 74,  anchor: 'middle' },
  { id: 'linzi', name: '临淄', x: 272, y: 184, tx: 272, ty: 170, anchor: 'middle' },
  { id: 'jimo',  name: '即墨', x: 316, y: 206, tx: 330, ty: 200, anchor: 'start' },
  { id: 'ju',    name: '莒',   x: 250, y: 252, tx: 236, ty: 246, anchor: 'end' }
];

var BASE0 = { ji: 'yan', linzi: 'qi', jimo: 'qi', ju: 'qi' };
var BASE1 = { ji: 'yan', linzi: 'yan', jimo: 'qi', ju: 'qi' };
var BASE2 = { ji: 'yan', linzi: 'qi', jimo: 'qi', ju: 'qi' };

var STAGES = [
  {
    label: '乐毅下齐', seal: '伐齐',
    kicker: '阶段一 · 前 284 年',
    title: '乐毅伐齐，下齐七十余城',
    turn: '燕昭王以乐毅为上将军，合五国之兵伐齐；齐师败于济西，乐毅入临淄，下齐七十余城，唯莒、即墨未下。',
    why: '齐湣王骄暴失人心，五国合兵一击而溃；但莒与即墨两城未下，齐国便未亡。',
    src: '《史记·燕召公世家》《乐毅列传》《田单列传》。「七十余城」为史载。',
    events: [
      { time: '前284', who: '燕昭王', text: '以乐毅为上将军', t: 0.08 },
      { time: '前284', who: '五国之师', text: '破齐于济西', t: 0.34 },
      { time: '前284', who: '乐毅', text: '入临淄，下齐七十余城', t: 0.58, kind: 'flip', city: 'linzi' },
      { time: '前284', who: '齐', text: '唯莒、即墨未下', t: 0.84 }
    ],
    nums: [
      { label: '燕军', value: '下七十余城', kind: '史载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '未下', value: '莒·即墨', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { linzi: 0.58 },
    markers: [
      { type: 'host', side: 'yan', x: 256, y: 88, t: 0.02, name: '燕昭王', lx: 256, ly: 74, anchor: 'middle' },
      { type: 'host', side: 'yan', x: 288, y: 140, t: 0.30, name: '乐毅', lx: 302, ly: 136, anchor: 'start' },
      { type: 'host', side: 'qi', x: 316, y: 206, t: 0.02, name: '田单', lx: 330, ly: 212, anchor: 'start' }
    ],
    routes: [
      { d: 'M 262 98 C 270 116 280 132 286 144', side: 'yan', t0: 0.06, t1: 0.40,
        label: '燕师南下', lx: 254, ly: 122, anchor: 'end' },
      { d: 'M 294 150 C 292 162 286 170 280 178', side: 'yan', t0: 0.44, t1: 0.64,
        label: '入临淄', lx: 304, ly: 164, anchor: 'start' }
    ]
  },
  {
    label: '反间换将', seal: '反间',
    kicker: '阶段二 · 前 279 年',
    title: '田单纵反间，燕以骑劫代乐毅',
    turn: '燕昭王死，惠王立；田单纵反间于燕，言乐毅欲王齐。惠王信之，以骑劫代乐毅，乐毅奔赵。',
    why: '乐毅围即墨三年而不强攻，欲以恩结齐人；换上一个急于求成的骑劫，即墨才有可乘之隙。',
    src: '《史记·乐毅列传》《田单列传》。',
    events: [
      { time: '前279', who: '燕昭王', text: '死，惠王立', t: 0.08 },
      { time: '前279', who: '田单', text: '纵反间于燕', t: 0.34 },
      { time: '前279', who: '燕惠王', text: '以骑劫代乐毅', t: 0.58 },
      { time: '前279', who: '乐毅', text: '奔赵', t: 0.84 }
    ],
    nums: [
      { label: '燕军', value: '无确载', kind: '无确载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '换将', value: '骑劫代乐毅', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'yan', x: 288, y: 140, t: 0.02, name: '骑劫', lx: 302, ly: 136, anchor: 'start' },
      { type: 'host', side: 'qi', x: 316, y: 206, t: 0.02, name: '田单', lx: 330, ly: 200, anchor: 'start' },
      { type: 'host', side: 'yan', x: 256, y: 88, t: 0.02, name: '燕惠王', lx: 270, ly: 82, anchor: 'start', weak: true }
    ],
    routes: []
  },
  {
    label: '激怒即墨', seal: '激怒',
    kicker: '阶段三 · 前 279 年',
    title: '骑劫掘冢，即墨人愤怒请战',
    turn: '骑劫劓齐降卒、掘即墨人冢墓，即墨人皆涕泣，愤怒请战；田单使老弱妇女登城，遣使诈降。',
    why: '田单要的不是守城，是让全城人愿意死战；骑劫的暴行正好替他完成了动员。',
    src: '《史记·田单列传》。「尽掘垄墓，烧死人」为史载。',
    events: [
      { time: '前279', who: '骑劫', text: '劓降卒、掘冢墓', t: 0.08 },
      { time: '前279', who: '即墨人', text: '涕泣，愤怒请战', t: 0.34 },
      { time: '前279', who: '田单', text: '使老弱妇女登城', t: 0.58 },
      { time: '前279', who: '田单', text: '遣使诈降于燕', t: 0.84 }
    ],
    nums: [
      { label: '燕军', value: '无确载', kind: '无确载', n: null },
      { label: '即墨', value: '孤城', kind: '史载', n: null },
      { label: '守军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'qi', x: 316, y: 206, t: 0.02, name: '田单', lx: 330, ly: 212, anchor: 'start' },
      { type: 'host', side: 'yan', x: 300, y: 194, t: 0.30, name: '骑劫', lx: 314, ly: 188, anchor: 'start', weak: true },
      { type: 'army', side: 'yan', x: 306, y: 200, t: 0.06, name: '燕军', lx: 320, ly: 206, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '火牛破燕', seal: '火牛',
    kicker: '阶段四 · 前 279 年',
    title: '田单火牛阵夜袭，燕军大溃',
    turn: '田单收城中牛千余，束兵刃于角、灌脂束苇于尾，夜烧其端，凿城数十穴纵牛；五千壮士随之，燕军大溃，骑劫死。',
    why: '燕军久围而懈，夜半突遭火牛冲营，阵形立乱；即墨城内积怒已久，一击而发。',
    src: '《史记·田单列传》。「牛千余」「五千壮士」为史载。',
    events: [
      { time: '前279', who: '田单', text: '收牛千余，束刃灌脂', t: 0.08 },
      { time: '前279', who: '即墨', text: '夜凿城数十穴，纵火牛', t: 0.34 },
      { time: '前279', who: '燕军', text: '夜中惊溃', t: 0.58 },
      { time: '前279', who: '骑劫', text: '死于乱军', t: 0.84 }
    ],
    nums: [
      { label: '火牛', value: '千余牛', kind: '史载', n: null },
      { label: '壮士', value: '五千', kind: '史载', n: 5 },
      { label: '燕军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE1,
    sieges: [
      { x: 316, y: 206, t: 0.58, label: '燕军溃', side: 'qi', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'qi', x: 316, y: 206, t: 0.02, name: '田单', lx: 330, ly: 200, anchor: 'start' },
      { type: 'host', side: 'yan', x: 300, y: 196, t: 0.02, name: '骑劫', lx: 300, ly: 182, anchor: 'middle', weak: true },
      { type: 'army', side: 'qi', x: 328, y: 214, t: 0.40, name: '火牛', lx: 342, ly: 220, anchor: 'start' }
    ],
    routes: [
      { d: 'M 322 200 C 310 196 302 194 296 194', side: 'qi', t0: 0.36, t1: 0.66,
        label: '火牛冲营', lx: 318, ly: 222, anchor: 'middle' }
    ]
  },
  {
    label: '尽复齐地', seal: '复国',
    kicker: '阶段五 · 前 279 年',
    title: '齐人追亡逐北，尽复七十余城',
    turn: '齐人追亡逐北，所过城邑皆畔燕而归；田单迎襄王于莒，入临淄，尽复齐国。',
    why: '火牛一战破的是燕军士气，七十余城望风而复；齐国亡而复存，田单之功居首。',
    src: '《史记·田单列传》；《战国策·齐策》。',
    events: [
      { time: '前279', who: '齐人', text: '追亡逐北，城邑畔燕', t: 0.08 },
      { time: '前279', who: '田单', text: '迎襄王于莒', t: 0.34 },
      { time: '前279', who: '齐襄王', text: '入临淄', t: 0.58, kind: 'flip', city: 'linzi' },
      { time: '前279', who: '齐', text: '尽复七十余城', t: 0.84 }
    ],
    nums: [
      { label: '复城', value: '七十余城', kind: '史载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '齐复国', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { linzi: 0.58 },
    markers: [
      { type: 'host', side: 'qi', x: 250, y: 252, t: 0.30, name: '齐襄王', lx: 264, ly: 258, anchor: 'start' },
      { type: 'host', side: 'qi', x: 316, y: 206, t: 0.02, name: '田单', lx: 330, ly: 212, anchor: 'start' },
      { type: 'army', side: 'qi', x: 288, y: 196, t: 0.34, name: '齐军', lx: 274, ly: 190, anchor: 'end' }
    ],
    routes: [
      { d: 'M 306 198 C 292 192 280 184 274 178', side: 'qi', t0: 0.08, t1: 0.50,
        label: '追亡逐北', lx: 306, ly: 214, anchor: 'start' },
      { d: 'M 258 246 C 262 226 266 206 270 192', side: 'qi', t0: 0.32, t1: 0.60,
        label: '襄王入临淄', lx: 240, ly: 218, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 348 84 C 354 130 352 174 346 216', color: '#a8b6ab', width: 2.4 },
    { d: 'M 180 236 C 202 232 226 236 250 240', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 90 96 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 190 90 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 80 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 200 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 340, y: 116, t: '渤　海', size: 9, color: '#46594f', ls: 3, serif: true, rotate: 90 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '即墨·今山东平度东南　临淄·今山东淄博临淄　莒·今山东莒县　蓟·今北京', size: 6.2, color: '#7d6647', ls: 0.3 },
    { x: 24, y: 366, t: '燕　齐', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'jimo',
  title: '即墨之战',
  kicker: '沙 盘 推 演',
  subtitle: '即墨 · 临淄',
  years: '前284—前279',
  yearUnit: '',
  era: '战国 · 燕昭王至燕惠王',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：即墨今山东平度东南、临淄今山东淄博临淄，非真实地理比例',
  hook: '田单守即墨，纵反间、激众怒，火牛夜袭，尽复齐七十余城',
  period: '战国',
  yearValue: -284,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '齐', b: '复国', sub: '前279' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
