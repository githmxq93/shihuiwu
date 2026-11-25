/**
 * 沙盘推演 · 鞍之战（前589）
 * 通行叙事：齐顷公伐鲁、卫，鲁卫求救于晋；晋景公使郤克率八百乘东救，
 * 齐军轻敌「不介马而驰之」，两军战于鞍；郤克伤矢而鼓音不绝，齐师败绩，
 * 顷公赖逢丑父易位得脱，晋师追至马陉，齐请盟。
 * 「八百乘」为史载；双方具体兵数无确载。
 * 地名古今对照：鞍今山东济南、临淄今山东淄博临淄、曲阜今山东曲阜、绛今山西翼城东南。
 */
var COLOR = { jin: '#2b5262', qi: '#6f3a22', lu: '#3f5e4a', wei: '#4a5570', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'jiang', name: '绛',   x: 68,  y: 200, tx: 68,  ty: 214, anchor: 'middle' },
  { id: 'wei',   name: '卫',   x: 152, y: 160, tx: 138, ty: 154, anchor: 'end' },
  { id: 'lu',    name: '鲁',   x: 198, y: 238, tx: 198, ty: 252, anchor: 'middle' },
  { id: 'an',    name: '鞍',   x: 268, y: 180, tx: 268, ty: 166, anchor: 'middle' },
  { id: 'linzi', name: '临淄', x: 322, y: 158, tx: 322, ty: 144, anchor: 'middle' }
];

var BASE0 = { jiang: 'jin', wei: 'wei', lu: 'lu', an: 'qi', linzi: 'qi' };
var BASE1 = { jiang: 'jin', wei: 'wei', lu: 'lu', an: 'contested', linzi: 'qi' };
var BASE2 = { jiang: 'jin', wei: 'wei', lu: 'lu', an: 'jin', linzi: 'qi' };

var STAGES = [
  {
    label: '齐伐鲁卫', seal: '来伐',
    kicker: '阶段一 · 前 589 年',
    title: '齐顷公伐鲁、卫，两国求救于晋',
    turn: '齐顷公伐鲁、卫，取龙、巢丘；鲁、卫告急于晋。晋景公使郤克将中军，以八百乘东救。',
    why: '齐欲争东方之伯，鲁卫当其冲；晋若坐视，诸侯将附齐，故郤克必须东出。',
    src: '《左传·成公二年》；《史记·齐太公世家》《晋世家》。「八百乘」为史载。',
    events: [
      { time: '前589', who: '齐顷公', text: '伐鲁、卫，取龙、巢丘', t: 0.08 },
      { time: '前589', who: '鲁·卫', text: '告急于晋', t: 0.34 },
      { time: '前589', who: '晋景公', text: '使郤克将中军', t: 0.58 },
      { time: '前589', who: '晋军', text: '以八百乘东救', t: 0.84 }
    ],
    nums: [
      { label: '晋军', value: '八百乘', kind: '史载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '鲁·卫', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE0,
    markers: [
      { type: 'host', side: 'qi', x: 322, y: 158, t: 0.02, name: '齐顷公', lx: 322, ly: 144, anchor: 'middle' },
      { type: 'host', side: 'jin', x: 68, y: 200, t: 0.02, name: '郤克', lx: 68, ly: 214, anchor: 'middle' },
      { type: 'army', side: 'qi', x: 292, y: 172, t: 0.16, name: '齐军', lx: 306, ly: 180, anchor: 'start' }
    ],
    routes: [
      { d: 'M 306 172 C 262 176 218 186 178 194', side: 'qi', t0: 0.06, t1: 0.44,
        label: '齐伐鲁卫', lx: 262, ly: 164, anchor: 'middle' },
      { d: 'M 84 196 C 108 184 132 172 148 164', side: 'jin', t0: 0.70, t1: 0.96,
        label: '晋师东救', lx: 84, ly: 182, anchor: 'start' }
    ]
  },
  {
    label: '遇于鞍', seal: '轻敌',
    kicker: '阶段二 · 前 589 年',
    title: '齐军轻敌，不介马而驰之',
    turn: '齐顷公曰「余姑翦灭此而朝食」，不介马而驰之；晋军列阵于鞍，两军合战。',
    why: '齐军以逸待劳却轻敌冒进，马不披甲便冲阵；晋军若能顶住第一击，齐军锐气便折。',
    src: '《左传·成公二年》。「不介马而驰之」为史载。',
    events: [
      { time: '前589', who: '齐顷公', text: '曰「翦灭此而朝食」', t: 0.08 },
      { time: '前589', who: '齐军', text: '不介马而驰之', t: 0.34, kind: 'flip', city: 'an' },
      { time: '前589', who: '晋军', text: '列阵于鞍', t: 0.58 },
      { time: '前589', who: '两军', text: '合战', t: 0.84 }
    ],
    nums: [
      { label: '晋军', value: '八百乘', kind: '史载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '齐军', value: '轻敌冒进', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { an: 0.34 },
    markers: [
      { type: 'host', side: 'qi', x: 268, y: 180, t: 0.02, name: '齐顷公', lx: 282, ly: 174, anchor: 'start' },
      { type: 'host', side: 'jin', x: 268, y: 180, t: 0.30, name: '郤克', lx: 254, ly: 186, anchor: 'end' },
      { type: 'army', side: 'qi', x: 288, y: 188, t: 0.34, name: '齐军', lx: 302, ly: 184, anchor: 'start' }
    ],
    routes: [
      { d: 'M 306 180 C 294 180 282 180 274 180', side: 'qi', t0: 0.30, t1: 0.62,
        label: '齐军驰之', lx: 290, ly: 196, anchor: 'middle' }
    ]
  },
  {
    label: '齐师败绩', seal: '力战',
    kicker: '阶段三 · 前 589 年',
    title: '郤克伤矢，鼓音不绝，齐师败绩',
    turn: '郤克伤于矢，流血及屦，鼓音未绝；解张、郑丘缓佐之，晋军力战，齐师败绩，逐之三周华不注。',
    why: '主帅负伤而不退鼓，晋军士气不堕；齐军一击不中，反被拖入缠斗而溃。',
    src: '《左传·成公二年》。「流血及屦，未绝鼓音」为史载。',
    events: [
      { time: '前589', who: '郤克', text: '伤于矢，流血及屦', t: 0.08 },
      { time: '前589', who: '解张·郑丘缓', text: '佐之，鼓音不绝', t: 0.34 },
      { time: '前589', who: '齐师', text: '败绩，鞍失守', t: 0.58, kind: 'flip', city: 'an' },
      { time: '前589', who: '晋军', text: '逐之三周华不注', t: 0.84 }
    ],
    nums: [
      { label: '晋军', value: '八百乘', kind: '史载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '郤克', value: '伤矢', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { an: 0.58 },
    sieges: [
      { x: 268, y: 180, t: 0.58, label: '齐师溃', side: 'jin', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'jin', x: 268, y: 180, t: 0.30, name: '郤克', lx: 254, ly: 174, anchor: 'end' },
      { type: 'host', side: 'qi', x: 268, y: 180, t: 0.02, name: '齐顷公', lx: 282, ly: 168, anchor: 'start', weak: true },
      { type: 'army', side: 'jin', x: 252, y: 190, t: 0.34, name: '晋军', lx: 238, ly: 184, anchor: 'end' }
    ],
    routes: [
      { d: 'M 256 184 C 262 182 266 181 268 180', side: 'jin', t0: 0.28, t1: 0.58,
        label: '晋军力战', lx: 244, ly: 196, anchor: 'end' }
    ]
  },
  {
    label: '齐请盟', seal: '请盟',
    kicker: '阶段四 · 前 589 年',
    title: '逢丑父易位，顷公脱归，齐请盟',
    turn: '逢丑父与顷公易位，顷公得以脱归；晋师追至马陉，齐使宾媚人赂以纪甗、玉磬，请盟。',
    why: '鞍之战后齐不能复争东方之伯，晋景公遂成诸侯之盟主。',
    src: '《左传·成公二年》；《史记·齐太公世家》。「逢丑父与公易位」为史载。',
    events: [
      { time: '前589', who: '逢丑父', text: '与顷公易位', t: 0.08 },
      { time: '前589', who: '齐顷公', text: '脱归临淄', t: 0.34 },
      { time: '前589', who: '晋师', text: '追至马陉', t: 0.58 },
      { time: '前589', who: '齐', text: '赂以纪甗、玉磬，请盟', t: 0.84 }
    ],
    nums: [
      { label: '晋军', value: '八百乘', kind: '史载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '齐请盟', kind: '史载', n: null }
    ],
    hold: BASE2,
    markers: [
      { type: 'host', side: 'jin', x: 318, y: 168, t: 0.58, name: '郤克', lx: 318, ly: 154, anchor: 'middle' },
      { type: 'host', side: 'qi', x: 322, y: 158, t: 0.34, name: '齐顷公', lx: 336, ly: 164, anchor: 'start' },
      { type: 'host', side: 'qi', x: 268, y: 180, t: 0.02, name: '逢丑父', lx: 254, ly: 192, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 276 172 C 292 164 306 158 318 156', side: 'qi', t0: 0.30, t1: 0.58,
        label: '顷公脱归', lx: 288, ly: 158, anchor: 'middle' },
      { d: 'M 286 174 C 302 168 314 164 320 162', side: 'jin', t0: 0.56, t1: 0.80,
        label: '晋师追至马陉', lx: 300, ly: 184, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 168 C 60 162 120 172 180 166 C 240 160 300 168 385 162', color: '#a8b6ab', width: 2.2 },
    { d: 'M 210 100 C 240 128 268 156 294 184', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 96 88 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 84 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 164, t: '济　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 226, y: 116, t: '泰　山', size: 9, color: '#46594f', ls: 3, serif: true, rotate: 26 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '鞍·今山东济南　临淄·今山东淄博临淄　曲阜·今山东曲阜　绛·今山西翼城东南', size: 6.4, color: '#7d6647', ls: 0.3 },
    { x: 24, y: 366, t: '晋　齐', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'an',
  title: '鞍之战',
  kicker: '沙 盘 推 演',
  subtitle: '鞍 · 临淄',
  years: '前589',
  yearUnit: '',
  era: '春秋 · 晋景公十一年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：鞍今山东济南、临淄今山东淄博临淄，非真实地理比例',
  hook: '郤克伤矢而鼓音不绝，晋军大破齐师于鞍，齐顷公赖逢丑父得脱',
  period: '春秋',
  yearValue: -589,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '晋', b: '胜', sub: '前589' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
