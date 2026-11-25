/**
 * 沙盘推演 · 桂陵之战（前354）
 * 通行叙事：魏围邯郸、齐议救赵、孙膑「批亢捣虚」直趋大梁、桂陵设伏。
 * 齐魏双方具体兵力史书均无确载，只标「无确载」；不估算、不编数字。
 * 地名古今对照：桂陵今河南长垣西北、大梁今河南开封、临淄今山东淄博。
 */
var COLOR = { wei: '#6f3a22', qi: '#2b5262', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'anyi',    name: '安邑', x: 72,  y: 92,  tx: 72,  ty: 78,  anchor: 'middle' },
  { id: 'handan',  name: '邯郸', x: 238, y: 84,  tx: 250, ty: 80,  anchor: 'start' },
  { id: 'guiling', name: '桂陵', x: 192, y: 118, tx: 178, ty: 112, anchor: 'end' },
  { id: 'daliang', name: '大梁', x: 214, y: 168, tx: 214, ty: 182, anchor: 'middle' },
  { id: 'linzi',   name: '临淄', x: 330, y: 132, tx: 330, ty: 146, anchor: 'middle' }
];

var BASE0 = { anyi: 'wei', handan: 'wei', guiling: 'wei', daliang: 'wei', linzi: 'qi' };
var BASE1 = { anyi: 'wei', handan: 'contested', guiling: 'wei', daliang: 'wei', linzi: 'qi' };
var BASE2 = { anyi: 'wei', handan: 'wei', guiling: 'wei', daliang: 'wei', linzi: 'qi' };
var BASE3 = { anyi: 'wei', handan: 'wei', guiling: 'contested', daliang: 'wei', linzi: 'qi' };
var BASE4 = { anyi: 'wei', handan: 'wei', guiling: 'qi', daliang: 'wei', linzi: 'qi' };

var STAGES = [
  {
    label: '魏围邯郸', seal: '围赵',
    kicker: '阶段一 · 前354 年',
    title: '魏惠王伐赵，庞涓围邯郸',
    turn: '魏惠王使庞涓率军伐赵，围赵都邯郸；赵成侯遣使求救于齐。',
    why: '魏国正盛，欲以攻赵立威于三晋；赵都受围，只能向外求援，齐国的介入由此成为战局转折。',
    src: '《史记·魏世家》《赵世家》《孙子吴起列传》；《资治通鉴》卷二。兵力无确载。',
    events: [
      { time: '前354', who: '魏惠王', text: '使庞涓率军伐赵', t: 0.08 },
      { time: '前354', who: '庞涓', text: '围赵都邯郸', t: 0.36, kind: 'flip', city: 'handan' },
      { time: '前354', who: '赵成侯', text: '遣使求救于齐', t: 0.64 },
      { time: '前354', who: '齐威王', text: '议救赵之策', t: 0.86 }
    ],
    nums: [
      { label: '魏军', value: '无确载', kind: '无确载', n: null },
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '围城', value: '逾年', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { handan: 0.36 },
    sieges: [
      { x: 238, y: 84, t: 0.36, label: '邯郸被围', side: 'wei', lx: 16, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'wei', x: 214, y: 166, t: 0.04, name: '庞涓', lx: 200, ly: 176, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'wei', x: 238, y: 84, t: 0.36, name: '魏军', lx: 252, ly: 96, anchor: 'start' },
      { type: 'army', side: 'qi', x: 238, y: 84, t: 0.30, name: '赵军', lx: 224, ly: 98, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 216 162 C 224 140 232 112 236 90', side: 'wei', t0: 0.06, t1: 0.34,
        label: '魏军北上', lx: 228, ly: 128, anchor: 'start' }
    ]
  },
  {
    label: '齐议救赵', seal: '谋齐',
    kicker: '阶段二 · 前353 年',
    title: '田忌为将，孙膑主张批亢捣虚',
    turn: '齐威王以田忌为将、孙膑为军师救赵。孙膑以为「批亢捣虚，形格势禁」，不如直趋魏都大梁，魏军必回师自救。',
    why: '齐军不与魏军硬碰于邯郸城下，而是攻击其必救之都；把战场选择权从魏军手里夺过来。',
    src: '《史记·孙子吴起列传》；《资治通鉴》卷二。「批亢捣虚」为史载。',
    events: [
      { time: '前353', who: '齐威王', text: '以田忌为将救赵', t: 0.08 },
      { time: '前353', who: '孙膑', text: '为军师，坐辎车中', t: 0.30 },
      { time: '前353', who: '孙膑', text: '主张批亢捣虚，直趋大梁', t: 0.58 },
      { time: '前353', who: '齐军', text: '西进，趋魏都', t: 0.84 }
    ],
    nums: [
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '魏军', value: '无确载', kind: '无确载', n: null },
      { label: '邯郸', value: '仍被围', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'qi', x: 330, y: 132, t: 0.02, name: '田忌', lx: 316, ly: 144, anchor: 'end' },
      { type: 'army', side: 'qi', x: 300, y: 144, t: 0.42, name: '孙膑', lx: 306, ly: 130, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'wei', x: 238, y: 84, t: 0.02, name: '庞涓', lx: 252, ly: 96, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 324 138 C 300 146 274 152 250 156', side: 'qi', t0: 0.42, t1: 0.80,
        label: '齐军西进', lx: 288, ly: 168, anchor: 'middle' }
    ]
  },
  {
    label: '桂陵设伏', seal: '设伏',
    kicker: '阶段三 · 前353 年',
    title: '庞涓回师自救，齐军伏于桂陵',
    turn: '魏军闻齐师趋大梁，弃邯郸而还；齐军不与争锋，退至桂陵设伏以待。',
    why: '魏军回师途中队形拉长、情报被动；齐军以逸待劳，把「救赵」变成在魏军归路上的伏击。',
    src: '《史记·孙子吴起列传》《魏世家》；《资治通鉴》卷二。',
    events: [
      { time: '前353', who: '齐军', text: '直趋大梁，逼魏都', t: 0.08 },
      { time: '前353', who: '庞涓', text: '闻齐师至，弃邯郸回师', t: 0.34, kind: 'flip', city: 'handan' },
      { time: '前353', who: '孙膑', text: '退至桂陵，设伏以待', t: 0.62 },
      { time: '前353', who: '魏军', text: '回师至桂陵', t: 0.86 }
    ],
    nums: [
      { label: '魏军', value: '无确载', kind: '无确载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '伏击地', value: '桂陵', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { handan: 0.34, guiling: 0.62 },
    markers: [
      { type: 'host', side: 'wei', x: 238, y: 84, t: 0.02, name: '庞涓', lx: 252, ly: 96, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'qi', x: 192, y: 118, t: 0.02, name: '田忌', lx: 178, ly: 106, anchor: 'end' },
      { type: 'army', side: 'qi', x: 192, y: 118, t: 0.60, name: '齐军伏兵', lx: 206, ly: 132, anchor: 'start' }
    ],
    routes: [
      { d: 'M 238 90 C 230 102 216 112 202 116', side: 'wei', t0: 0.36, t1: 0.66,
        label: '魏军回师', lx: 226, ly: 104, anchor: 'start' },
      { d: 'M 300 150 C 264 146 228 136 200 124', side: 'qi', t0: 0.08, t1: 0.54,
        label: '齐军退桂陵', lx: 258, ly: 158, anchor: 'middle' }
    ]
  },
  {
    label: '桂陵之战', seal: '破魏',
    kicker: '阶段四 · 前353 年',
    title: '桂陵之战，齐师大破魏军',
    turn: '魏军至桂陵，齐军伏发，大破魏军；庞涓被擒（一说此役擒而后释）。魏虽仍据邯郸，霸权已受重挫。',
    why: '桂陵之败打破魏军不可战胜的形象；此后魏被迫与赵、齐议和，邯郸最终归还于赵。',
    src: '《史记·孙子吴起列传》《魏世家》《赵世家》；《资治通鉴》卷二。',
    events: [
      { time: '前353', who: '齐军', text: '伏发，截击魏军', t: 0.08 },
      { time: '前353', who: '齐军', text: '大破魏军', t: 0.38, kind: 'flip', city: 'guiling' },
      { time: '前353', who: '庞涓', text: '兵败被擒', t: 0.64 },
      { time: '前353', who: '魏惠王', text: '与赵、齐议和', t: 0.86 }
    ],
    nums: [
      { label: '魏军', value: '无确载', kind: '无确载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '结局', value: '邯郸归赵', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { guiling: 0.38 },
    sieges: [
      { x: 192, y: 118, t: 0.38, label: '桂陵破魏', side: 'qi', lx: -10, ly: 14, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'qi', x: 192, y: 118, t: 0.02, name: '田忌', lx: 178, ly: 104, anchor: 'end' },
      { type: 'army', side: 'qi', x: 200, y: 124, t: 0.34, name: '齐军', lx: 214, ly: 136, anchor: 'start' },
      { type: 'army', side: 'wei', x: 196, y: 112, t: 0.02, name: '魏军', lx: 182, ly: 132, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 198 116 C 202 118 206 120 210 122', side: 'qi', t0: 0.06, t1: 0.34,
        label: '伏兵齐发', lx: 210, ly: 108, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 124 C 60 116 120 126 180 120 C 240 114 300 108 385 112', color: '#a8b6ab', width: 3 },
    { d: 'M 300 88 C 296 132 292 176 286 220', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 120 54 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 286 54 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 60 220 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 268 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 20, y: 114, t: '黄　河', size: 10, color: '#46594f', ls: 3, serif: true },
    { x: 252, y: 70, t: '漳　水', size: 8.5, color: '#46594f', ls: 2, serif: true, rotate: -6 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '桂陵·今河南长垣西北　大梁·今河南开封', size: 7.5, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '中 原', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'gui',
  title: '桂陵之战',
  kicker: '沙 盘 推 演',
  subtitle: '桂陵 · 大梁',
  years: '前354',
  yearUnit: '',
  era: '战国 · 周显王十五年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝围城 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：桂陵今河南长垣西北、大梁今河南开封，非真实地理比例',
  hook: '围魏救赵：孙膑直趋大梁，桂陵设伏大破魏军',
  period: '战国',
  yearValue: -354,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '齐', b: '胜', sub: '前353' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
