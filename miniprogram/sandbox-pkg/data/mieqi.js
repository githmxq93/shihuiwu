/**
 * 沙盘推演 · 灭齐之战（前221）
 * 通行叙事：齐王建不修战备、王贲自燕地南下、破历下逼临淄、齐王建不战而降。
 * 秦齐双方兵力均无确载；「齐四十年不助五国」「齐王建降」为史载。
 * 地名古今对照：临淄今山东淄博东北、历下今山东济南、即墨今山东即墨、莒今山东莒县。
 */
var COLOR = { qin: '#6f3a22', qi: '#2b5262', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'ji',      name: '蓟',   x: 238, y: 64,  tx: 238, ty: 50,  anchor: 'middle' },
  { id: 'gaotang', name: '高唐', x: 206, y: 140, tx: 192, ty: 148, anchor: 'end' },
  { id: 'lixia',   name: '历下', x: 222, y: 196, tx: 208, ty: 204, anchor: 'end' },
  { id: 'linzi',   name: '临淄', x: 272, y: 188, tx: 272, ty: 174, anchor: 'middle' },
  { id: 'jimo',    name: '即墨', x: 326, y: 146, tx: 326, ty: 132, anchor: 'middle' },
  { id: 'ju',      name: '莒',   x: 318, y: 232, tx: 318, ty: 248, anchor: 'middle' }
];

var BASE0 = { ji: 'qin', gaotang: 'qi', lixia: 'qi', linzi: 'qi', jimo: 'qi', ju: 'qi' };
var BASE2 = { ji: 'qin', gaotang: 'qi', lixia: 'qin', linzi: 'qi', jimo: 'qi', ju: 'qi' };
var BASE3 = { ji: 'qin', gaotang: 'qin', lixia: 'qin', linzi: 'contested', jimo: 'qi', ju: 'qi' };
var BASE4 = { ji: 'qin', gaotang: 'qin', lixia: 'qin', linzi: 'qin', jimo: 'qin', ju: 'qin' };

var STAGES = [
  {
    label: '齐不设备', seal: '积弊',
    kicker: '阶段一 · 前221 年以前',
    title: '齐王建四十年不助五国，不修战备',
    turn: '齐王建在位四十余年，秦以远交近攻事齐，齐相后胜受秦间金，劝齐王勿助五国、勿设备；五国既亡，齐独存而兵备久废。',
    why: '齐国把安全寄托在秦的「友好」上，既不出兵救五国，也不整军经武；等到秦军压境，已无可战之兵。',
    src: '《史记·田敬仲完世家》《秦始皇本纪》；《资治通鉴》卷七。兵力无确载。',
    events: [
      { time: '前221 前', who: '齐王建', text: '四十年不助五国', t: 0.08 },
      { time: '前221 前', who: '后胜', text: '受秦间金，劝齐勿备', t: 0.34 },
      { time: '前221 前', who: '秦廷', text: '远交近攻，独厚齐', t: 0.60 },
      { time: '前221 前', who: '齐廷', text: '仍不设备，兵防久废', t: 0.84 }
    ],
    nums: [
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '齐不助五国', value: '四十年', kind: '史载', n: null }
    ],
    hold: BASE0,
    markers: [
      { type: 'host', side: 'qi', x: 272, y: 188, t: 0.02, name: '齐王建', lx: 258, ly: 200, anchor: 'end' },
      { type: 'army', side: 'qi', x: 300, y: 200, t: 0.40, name: '后胜', lx: 314, ly: 208, anchor: 'start', weak: true },
      { type: 'army', side: 'qin', x: 238, y: 64, t: 0.70, name: '秦军', lx: 252, ly: 58, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '王贲南下', seal: '南下',
    kicker: '阶段二 · 前221 年',
    title: '王贲自燕地南下，破历下',
    turn: '秦将王贲率军自燕地南下，避开齐西线高唐，直趋历下；齐军仓促据守，一战即溃，历下失守。',
    why: '秦军选择从燕地侧翼南下，绕开齐军正面防线，直接威胁临淄；齐国的地理屏障随之失效。',
    src: '《史记·秦始皇本纪》《白起王翦列传》；《资治通鉴》卷七。兵力无确载。',
    events: [
      { time: '前221', who: '王贲', text: '自蓟南下', t: 0.08 },
      { time: '前221', who: '秦军', text: '绕开高唐，直趋历下', t: 0.34 },
      { time: '前221', who: '齐军', text: '仓促据历下', t: 0.58 },
      { time: '前221', who: '秦军', text: '破历下', t: 0.84, kind: 'flip', city: 'lixia' }
    ],
    nums: [
      { label: '王贲军', value: '无确载', kind: '无确载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '历下', value: '失守', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { lixia: 0.84 },
    sieges: [
      { x: 222, y: 196, t: 0.84, label: '历下破', side: 'qin', lx: -12, ly: 10, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 238, y: 64, t: 0.02, name: '王贲', lx: 252, ly: 72, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'qin', x: 224, y: 188, t: 0.60, name: '秦军', lx: 210, ly: 178, anchor: 'end' },
      { type: 'army', side: 'qi', x: 226, y: 200, t: 0.02, name: '齐军', lx: 240, ly: 210, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 240 74 C 232 108 226 150 224 186', side: 'qin', t0: 0.06, t1: 0.72,
        label: '秦军南下', lx: 242, ly: 128, anchor: 'start' }
    ]
  },
  {
    label: '围临淄', seal: '逼都',
    kicker: '阶段三 · 前221 年',
    title: '秦军取高唐，进围临淄',
    turn: '秦军分兵取高唐，主力自历下东进，进围临淄；齐王建欲走莒、即墨，齐廷议降。',
    why: '历下既失，临淄无险可守；齐军主力未战先溃，国都陷于直接威胁之下。',
    src: '《史记·田敬仲完世家》《秦始皇本纪》；《资治通鉴》卷七。',
    events: [
      { time: '前221', who: '秦军', text: '分兵取高唐', t: 0.08, kind: 'flip', city: 'gaotang' },
      { time: '前221', who: '秦军', text: '自历下东进，围临淄', t: 0.34, kind: 'flip', city: 'linzi' },
      { time: '前221', who: '齐王建', text: '欲走莒、即墨', t: 0.60 },
      { time: '前221', who: '齐廷', text: '议降，不战', t: 0.84 }
    ],
    nums: [
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '临淄', value: '被围', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { gaotang: 0.08, linzi: 0.34 },
    sieges: [
      { x: 272, y: 188, t: 0.34, label: '临淄被围', side: 'qin', lx: 0, ly: -12, anchor: 'middle' }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 226, y: 194, t: 0.02, name: '王贲', lx: 212, ly: 186, anchor: 'end', moveRef: 0 },
      { type: 'host', side: 'qi', x: 272, y: 188, t: 0.02, name: '齐王建', lx: 258, ly: 200, anchor: 'end', weak: true },
      { type: 'army', side: 'qin', x: 258, y: 190, t: 0.32, name: '秦军', lx: 244, ly: 182, anchor: 'end' }
    ],
    routes: [
      { d: 'M 230 194 C 240 192 250 190 258 190', side: 'qin', t0: 0.30, t1: 0.62,
        label: '进围临淄', lx: 240, ly: 204, anchor: 'middle' }
    ]
  },
  {
    label: '齐亡', seal: '统一',
    kicker: '阶段四 · 前221 年',
    title: '齐王建出降，秦统一天下',
    turn: '齐王建出降，秦军入临淄；即墨、莒相继降秦。秦王政称始皇帝，分天下为三十六郡，中国复归一统。',
    why: '齐国不战而降，使秦以最小代价完成最后一击；六国既灭，秦的郡县体制得以推行天下。',
    src: '《史记·秦始皇本纪》《田敬仲完世家》；《资治通鉴》卷七。「齐王建降」为史载。',
    events: [
      { time: '前221', who: '齐王建', text: '出降，临淄陷', t: 0.08, kind: 'flip', city: 'linzi' },
      { time: '前221', who: '秦军', text: '入临淄，封府库', t: 0.32 },
      { time: '前221', who: '即墨·莒', text: '相继降秦', t: 0.58, kind: 'flip', city: 'jimo' },
      { time: '前221', who: '秦王政', text: '称始皇帝，分天下为三十六郡', t: 0.84 }
    ],
    nums: [
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '齐王建', value: '出降', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { linzi: 0.08, jimo: 0.58, ju: 0.70 },
    markers: [
      { type: 'host', side: 'qin', x: 258, y: 190, t: 0.02, name: '王贲', lx: 244, ly: 182, anchor: 'end' },
      { type: 'host', side: 'qi', x: 272, y: 188, t: 0.02, name: '齐王建', lx: 286, ly: 196, anchor: 'start', weak: true },
      { type: 'army', side: 'qin', x: 300, y: 210, t: 0.58, name: '秦军', lx: 314, ly: 204, anchor: 'start' }
    ],
    routes: [
      { d: 'M 282 192 C 296 204 308 220 314 232', side: 'qin', t0: 0.50, t1: 0.84,
        label: '略定齐地', lx: 300, ly: 224, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 112 C 70 106 150 116 230 110 C 300 104 350 108 385 106', color: '#a8b6ab', width: 3 },
    { d: 'M 196 100 C 206 136 216 172 224 210', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 76 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 84 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 46 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 108, t: '黄　河', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 330, y: 60, t: '渤　海', size: 8.5, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '临淄·今山东淄博东北　历下·今山东济南　即墨·今山东即墨', size: 7.2, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '齐 之 腹 地', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'mieqi',
  title: '灭齐之战',
  kicker: '沙 盘 推 演',
  subtitle: '历下 · 临淄',
  years: '前221',
  yearUnit: '',
  era: '战国 · 秦王政二十六年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：临淄今山东淄博东北、历下今山东济南，非真实地理比例',
  hook: '王贲自燕南下，破历下逼临淄，齐王建不战而降',
  period: '战国',
  yearValue: -221,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '秦', b: '一', sub: '前221' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
