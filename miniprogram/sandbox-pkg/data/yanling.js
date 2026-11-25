/**
 * 沙盘推演 · 鄢陵之战（前575）
 * 通行叙事：郑叛晋从楚、晋厉公伐郑、楚军晨压晋阵、苗贲皇献策、吕锜射中楚共王目、楚军夜遁。
 * 双方兵力只有「四军」「三军」的编制史载，具体人数无确载，不估算。
 * 地名古今对照：鄢陵今河南鄢陵西北。
 */
var COLOR = { jin: '#2b5262', chu: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'jiang',   name: '绛',   x: 82,  y: 84,  tx: 82,  ty: 70,  anchor: 'middle' },
  { id: 'zheng',   name: '郑',   x: 188, y: 196, tx: 188, ty: 210, anchor: 'middle' },
  { id: 'yanling', name: '鄢陵', x: 214, y: 224, tx: 214, ty: 238, anchor: 'middle' },
  { id: 'ying',    name: '郢',   x: 160, y: 326, tx: 160, ty: 340, anchor: 'middle' }
];

var BASE0 = { jiang: 'jin', zheng: 'chu', yanling: 'chu', ying: 'chu' };
var BASE1 = { jiang: 'jin', zheng: 'chu', yanling: 'contested', ying: 'chu' };
var BASE2 = { jiang: 'jin', zheng: 'jin', yanling: 'jin', ying: 'chu' };

var STAGES = [
  {
    label: '伐郑', seal: '救郑',
    kicker: '阶段一 · 前575 年 春',
    title: '郑叛晋从楚，晋厉公伐郑',
    turn: '郑成公叛晋，与楚盟于武城；晋厉公怒，兴师伐郑；楚共王亲率三军救郑。',
    why: '郑处晋楚之间，是双方必争的缓冲；晋若不能服郑，就无法阻止楚军北上，鄢陵之战因此不可避免。',
    src: '《左传·成公十六年》；《史记·晋世家》《楚世家》。',
    events: [
      { time: '前575·春', who: '郑成公', text: '叛晋，与楚盟于武城', t: 0.06 },
      { time: '前575·春', who: '晋厉公', text: '兴师伐郑', t: 0.32 },
      { time: '前575·春', who: '楚共王', text: '亲率三军救郑', t: 0.58 },
      { time: '前575·夏', who: '晋楚', text: '遇于鄢陵', t: 0.84 }
    ],
    nums: [
      { label: '晋军', value: '四军', kind: '史载', n: null },
      { label: '楚军', value: '三军', kind: '史载', n: null },
      { label: '郑军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE0,
    markers: [
      { type: 'host', side: 'jin', x: 82, y: 84, t: 0.02, name: '晋厉公', lx: 96, ly: 82, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'chu', x: 160, y: 326, t: 0.02, name: '楚共王', lx: 174, ly: 336, anchor: 'start', moveRef: 1 },
      { type: 'host', side: 'chu', x: 188, y: 196, t: 0.10, name: '郑伯', lx: 174, ly: 208, anchor: 'end' }
    ],
    routes: [
      { d: 'M 88 90 C 116 118 150 160 180 190', side: 'jin', t0: 0.30, t1: 0.54,
        label: '晋军伐郑', lx: 120, ly: 148, anchor: 'middle' },
      { d: 'M 164 320 C 176 288 190 250 204 226', side: 'chu', t0: 0.56, t1: 0.82,
        label: '楚军救郑', lx: 192, ly: 268, anchor: 'middle' }
    ]
  },
  {
    label: '压阵', seal: '鄢陵',
    kicker: '阶段二 · 前575 年 六月甲午',
    title: '楚军晨压晋阵，晋填井平灶',
    turn: '楚军晨压晋军而阵，军吏患之；晋军填井平灶，于营中列阵；范文子不欲战，栾书欲固垒待楚，郤至则主张速战。',
    why: '楚军抢先列阵、逼晋军就范，但营中井灶被填、阵形仓促；晋军若稳住阵脚，楚军反而背险而无退路。',
    src: '《左传·成公十六年》。双方兵力均无确载。',
    events: [
      { time: '前575·六月甲午', who: '楚军', text: '晨压晋军而阵', t: 0.06 },
      { time: '前575·六月甲午', who: '晋军', text: '填井平灶，就列而阵', t: 0.32 },
      { time: '前575·六月甲午', who: '范文子', text: '不欲战，请固垒', t: 0.58 },
      { time: '前575·六月甲午', who: '郤至', text: '主张速战，察楚六间', t: 0.84 }
    ],
    nums: [
      { label: '晋军', value: '四军', kind: '史载', n: null },
      { label: '楚军', value: '三军', kind: '史载', n: null },
      { label: '阵形', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE0,
    markers: [
      { type: 'host', side: 'jin', x: 200, y: 216, t: 0.02, name: '晋厉公', lx: 186, ly: 228, anchor: 'end' },
      { type: 'host', side: 'chu', x: 224, y: 232, t: 0.02, name: '楚共王', lx: 238, ly: 236, anchor: 'start' },
      { type: 'army', side: 'chu', x: 220, y: 228, t: 0.06, name: '楚军', lx: 234, ly: 222, anchor: 'start' }
    ],
    routes: [
      { d: 'M 218 228 C 212 226 206 224 202 222', side: 'chu', t0: 0.06, t1: 0.24,
        label: '压晋军而阵', lx: 226, ly: 214, anchor: 'start' }
    ]
  },
  {
    label: '决战', seal: '中目',
    kicker: '阶段三 · 前575 年 六月',
    title: '吕锜射中楚王目，楚军夜遁',
    turn: '苗贲皇言楚之精锐在中军王族，请分兵击其左右；晋军从之，楚左右军溃。晋将吕锜射中楚共王目，楚军夜遁。',
    why: '晋军避开楚中军精锐、先破其两翼，使楚王中军孤立；楚王受伤后指挥中断，夜遁成为唯一选择。',
    src: '《左传·成公十六年》「射共王中目」；《史记·晋世家》《楚世家》。',
    events: [
      { time: '前575·六月', who: '苗贲皇', text: '献策：楚精锐在中军王族', t: 0.06 },
      { time: '前575·六月', who: '晋军', text: '分兵击楚左右军', t: 0.30, kind: 'flip', city: 'yanling' },
      { time: '前575·六月', who: '楚左右军', text: '溃，楚中军孤立', t: 0.54 },
      { time: '前575·六月', who: '吕锜', text: '射中共王目', t: 0.74 },
      { time: '前575·六月', who: '楚军', text: '夜遁', t: 0.90 }
    ],
    nums: [
      { label: '晋军', value: '四军', kind: '史载', n: null },
      { label: '楚军', value: '三军', kind: '史载', n: null },
      { label: '楚王伤', value: '中目', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { yanling: 0.32 },
    sieges: [
      { x: 214, y: 224, t: 0.32, label: '鄢陵决战', side: 'jin', lx: 18, ly: 14, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'jin', x: 200, y: 218, t: 0.02, name: '晋厉公', lx: 186, ly: 230, anchor: 'end' },
      { type: 'host', side: 'chu', x: 226, y: 230, t: 0.02, name: '楚共王', lx: 240, ly: 234, anchor: 'start', weak: true },
      { type: 'army', side: 'jin', x: 208, y: 222, t: 0.28, name: '晋军', lx: 194, ly: 214, anchor: 'end' }
    ],
    routes: [
      { d: 'M 204 220 C 210 222 214 224 218 226', side: 'jin', t0: 0.28, t1: 0.50,
        label: '分击左右', lx: 200, ly: 232, anchor: 'end' },
      { d: 'M 228 232 C 224 262 218 292 212 314', side: 'retreat', t0: 0.72, t1: 0.94,
        label: '楚军夜遁', lx: 236, ly: 282, anchor: 'start' }
    ]
  },
  {
    label: '复霸', seal: '复霸',
    kicker: '阶段四 · 前575 年 秋',
    title: '晋厉公胜，郑服晋',
    turn: '楚军夜遁，晋军入楚营，三日而还；郑复服于晋，晋厉公遂复霸。但厉公骄侈，与群卿矛盾激化，次年即被杀。',
    why: '鄢陵之胜恢复了晋国在中原的优势，却没有解决晋国内部的卿族问题；军事上的霸业与政治上的裂痕同时加深。',
    src: '《左传·成公十六年、十七年》；《史记·晋世家》。',
    events: [
      { time: '前575·秋', who: '晋军', text: '入楚营，三日而还', t: 0.08 },
      { time: '前575·秋', who: '郑成公', text: '复服于晋', t: 0.36, kind: 'flip', city: 'zheng' },
      { time: '前575·秋', who: '晋厉公', text: '复霸中原', t: 0.64 },
      { time: '前574', who: '晋', text: '厉公骄侈，卿族离心', t: 0.86 }
    ],
    nums: [
      { label: '晋军', value: '四军', kind: '史载', n: null },
      { label: '楚军', value: '夜遁', kind: '史载', n: null },
      { label: '郑', value: '复服晋', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { zheng: 0.38 },
    markers: [
      { type: 'host', side: 'jin', x: 214, y: 224, t: 0.06, name: '晋厉公', lx: 228, ly: 232, anchor: 'start' },
      { type: 'host', side: 'chu', x: 188, y: 196, t: 0.02, name: '郑伯', lx: 174, ly: 206, anchor: 'end' }
    ],
    routes: [
      { d: 'M 210 220 C 202 212 194 204 190 200', side: 'jin', t0: 0.34, t1: 0.56,
        label: '郑复服晋', lx: 212, ly: 206, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 128 C 60 122 120 128 180 124 C 240 120 300 112 385 114', color: '#a8b6ab', width: 3 },
    { d: 'M 208 96 C 220 140 224 186 222 232 C 220 268 212 300 204 326', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 46 190 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 292 186 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 52 292 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 284 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 20, y: 114, t: '黄　河', size: 10, color: '#46594f', ls: 3, serif: true },
    { x: 232, y: 236, t: '颍　水', size: 8.5, color: '#46594f', ls: 2, serif: true, rotate: 78 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '鄢陵·今河南鄢陵西北　郑·今河南新郑', size: 7.5, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '中 原', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'yanling',
  title: '鄢陵之战',
  kicker: '沙 盘 推 演',
  subtitle: '鄢陵 · 晋楚',
  years: '前575',
  yearUnit: '',
  era: '春秋 · 晋厉公六年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝决战 ｜ 易＝易手 ｜ 虚线＝夜遁',
  note: '示意沙盘：鄢陵今河南鄢陵西北、郑今河南新郑，非真实地理比例',
  hook: '楚军晨压晋阵，吕锜射中楚共王目，楚军夜遁',
  period: '春秋',
  yearValue: -575,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '晋', b: '胜', sub: '前575' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
