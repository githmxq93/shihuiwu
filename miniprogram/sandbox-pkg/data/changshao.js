/**
 * 沙盘推演 · 长勺之战（前684）
 * 通行叙事：齐师伐鲁，鲁庄公御之于长勺；曹刿随军，待齐军三鼓而后击，
 * 齐师败绩；曹刿以「一鼓作气」论其胜因。
 * 双方兵力无确载；「三鼓」「一鼓作气」为史载。
 * 地名古今对照：长勺今山东莱芜东北、曲阜今山东曲阜、临淄今山东淄博临淄。
 */
var COLOR = { lu: '#2b5262', qi: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'linzi',     name: '临淄',   x: 300, y: 146, tx: 300, ty: 132, anchor: 'middle' },
  { id: 'tan',       name: '谭',     x: 272, y: 176, tx: 286, ty: 170, anchor: 'start' },
  { id: 'changshao', name: '长勺',   x: 240, y: 206, tx: 226, ty: 200, anchor: 'end' },
  { id: 'fei',       name: '费',     x: 208, y: 222, tx: 194, ty: 216, anchor: 'end' },
  { id: 'qufu',      name: '曲阜',   x: 232, y: 264, tx: 232, ty: 278, anchor: 'middle' }
];

var BASE0 = { linzi: 'qi', tan: 'qi', changshao: 'lu', fei: 'lu', qufu: 'lu' };
var BASE1 = { linzi: 'qi', tan: 'qi', changshao: 'contested', fei: 'lu', qufu: 'lu' };

var STAGES = [
  {
    label: '齐师伐鲁', seal: '来伐',
    kicker: '阶段一 · 前 684 年',
    title: '齐师伐鲁，鲁庄公御之',
    turn: '齐师伐鲁，鲁庄公将御之；曹刿请从，庄公与之同乘，战于长勺。',
    why: '齐强鲁弱，鲁军若正面硬拼必败；曹刿要做的，是先稳住阵脚、后发制人。',
    src: '《左传·庄公十年》；《史记·鲁周公世家》。',
    events: [
      { time: '前684', who: '齐师', text: '伐鲁', t: 0.08 },
      { time: '前684', who: '齐军', text: '进至长勺', t: 0.34, kind: 'flip', city: 'changshao' },
      { time: '前684', who: '鲁庄公', text: '将御之', t: 0.58 },
      { time: '前684', who: '曹刿', text: '请从，与庄公同乘', t: 0.84 }
    ],
    nums: [
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '鲁军', value: '无确载', kind: '无确载', n: null },
      { label: '战场', value: '长勺', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { changshao: 0.34 },
    markers: [
      { type: 'host', side: 'qi', x: 300, y: 146, t: 0.02, name: '齐军', lx: 300, ly: 132, anchor: 'middle' },
      { type: 'host', side: 'lu', x: 232, y: 264, t: 0.02, name: '鲁庄公', lx: 232, ly: 278, anchor: 'middle' },
      { type: 'host', side: 'lu', x: 220, y: 250, t: 0.34, name: '曹刿', lx: 206, ly: 244, anchor: 'end' }
    ],
    routes: [
      { d: 'M 292 156 C 276 172 260 188 248 200', side: 'qi', t0: 0.10, t1: 0.54,
        label: '齐师伐鲁', lx: 290, ly: 174, anchor: 'start' }
    ]
  },
  {
    label: '鲁军待阵', seal: '待阵',
    kicker: '阶段二 · 前 684 年',
    title: '鲁军按兵不动，以待齐军',
    turn: '两军对阵，鲁庄公欲鼓之，曹刿曰「未可」；鲁军按兵不动，静待齐军。',
    why: '齐军远来气盛，鲁军若先动便失先机；曹刿要等的是齐军士气由盛转衰的那一刻。',
    src: '《左传·庄公十年》。',
    events: [
      { time: '前684', who: '两军', text: '对阵于长勺', t: 0.08 },
      { time: '前684', who: '鲁庄公', text: '欲鼓之', t: 0.34 },
      { time: '前684', who: '曹刿', text: '曰「未可」', t: 0.58 },
      { time: '前684', who: '鲁军', text: '按兵不动', t: 0.84 }
    ],
    nums: [
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '鲁军', value: '无确载', kind: '无确载', n: null },
      { label: '战术', value: '后发', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'qi', x: 240, y: 206, t: 0.02, name: '齐军', lx: 254, ly: 200, anchor: 'start' },
      { type: 'host', side: 'lu', x: 240, y: 206, t: 0.30, name: '鲁庄公', lx: 226, ly: 212, anchor: 'end' },
      { type: 'host', side: 'lu', x: 228, y: 220, t: 0.34, name: '曹刿', lx: 214, ly: 226, anchor: 'end' }
    ],
    routes: []
  },
  {
    label: '三鼓而后击', seal: '蓄势',
    kicker: '阶段三 · 前 684 年',
    title: '齐军三鼓，鲁军一鼓而进',
    turn: '齐军三鼓，鲁军皆不动；曹刿曰「可矣」，鲁军一鼓而进，齐军士气已竭。',
    why: '一鼓作气，再而衰，三而竭；曹刿以静制动，把齐军的锐气耗在空鼓之上。',
    src: '《左传·庄公十年》。',
    events: [
      { time: '前684', who: '齐军', text: '三鼓', t: 0.08 },
      { time: '前684', who: '鲁军', text: '皆不动', t: 0.34 },
      { time: '前684', who: '曹刿', text: '曰「可矣」', t: 0.58 },
      { time: '前684', who: '鲁军', text: '一鼓而进', t: 0.84 }
    ],
    nums: [
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '鲁军', value: '无确载', kind: '无确载', n: null },
      { label: '鼓', value: '三鼓', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'qi', x: 240, y: 206, t: 0.02, name: '齐军', lx: 254, ly: 200, anchor: 'start', weak: true },
      { type: 'host', side: 'lu', x: 240, y: 206, t: 0.30, name: '曹刿', lx: 226, ly: 212, anchor: 'end' },
      { type: 'army', side: 'lu', x: 232, y: 216, t: 0.84, name: '鲁军', lx: 218, ly: 222, anchor: 'end' }
    ],
    routes: []
  },
  {
    label: '齐师败绩', seal: '败绩',
    kicker: '阶段四 · 前 684 年',
    title: '齐师败绩，鲁军逐之',
    turn: '鲁军一鼓而进，齐师败绩；鲁庄公欲追，曹刿察其辙乱旗靡，乃追之。',
    why: '长勺一战，鲁军以弱胜强；曹刿的「一鼓作气」成为中国军事思想中的经典命题。',
    src: '《左传·庄公十年》；《史记·鲁周公世家》。',
    events: [
      { time: '前684', who: '鲁军', text: '一鼓而进', t: 0.08 },
      { time: '前684', who: '齐师', text: '败绩', t: 0.34, kind: 'flip', city: 'changshao' },
      { time: '前684', who: '曹刿', text: '察其辙乱旗靡', t: 0.58 },
      { time: '前684', who: '鲁军', text: '逐之', t: 0.84 }
    ],
    nums: [
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '鲁军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '齐师败绩', kind: '史载', n: null }
    ],
    hold: BASE0,
    flips: { changshao: 0.34 },
    markers: [
      { type: 'host', side: 'lu', x: 240, y: 206, t: 0.30, name: '曹刿', lx: 254, ly: 200, anchor: 'start' },
      { type: 'host', side: 'qi', x: 240, y: 206, t: 0.02, name: '齐军', lx: 226, ly: 212, anchor: 'end', weak: true },
      { type: 'army', side: 'lu', x: 252, y: 196, t: 0.34, name: '鲁军', lx: 266, ly: 190, anchor: 'start' }
    ],
    routes: [
      { d: 'M 246 200 C 254 192 264 182 272 174', side: 'retreat', t0: 0.34, t1: 0.74,
        label: '齐师败走', lx: 244, ly: 190, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 240 C 60 234 120 242 180 236 C 240 230 300 238 385 234', color: '#a8b6ab', width: 2.4 },
    { d: 'M 150 80 C 180 110 210 140 240 170', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 236, t: '汶　水', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 150, y: 100, t: '泰　山', size: 9, color: '#46594f', ls: 3, serif: true, rotate: 24 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '长勺·今山东莱芜东北　曲阜·今山东曲阜　临淄·今山东淄博临淄', size: 6.2, color: '#7d6647', ls: 0.3 },
    { x: 24, y: 366, t: '齐　鲁', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'changshao',
  title: '长勺之战',
  kicker: '沙 盘 推 演',
  subtitle: '长勺 · 曲阜',
  years: '前684',
  yearUnit: '',
  era: '春秋 · 鲁庄公十年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：长勺今山东莱芜东北、曲阜今山东曲阜，非真实地理比例',
  hook: '曹刿待齐军三鼓而后击，鲁军一鼓作气，齐师败绩于长勺',
  period: '春秋',
  yearValue: -684,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '鲁', b: '胜', sub: '前684' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
