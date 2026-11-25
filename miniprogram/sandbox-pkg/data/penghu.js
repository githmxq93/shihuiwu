/**
 * 沙盘推演 · 澎湖海战（1683）
 * 通行叙事：施琅率清军水师自厦门出航，攻澎湖；郑军刘国轩据澎湖迎战；
 * 清军水师破澎湖，郑军大败；郑克塽奉表归降，台湾入清版图。
 * 双方兵力无确载；「澎湖大战」「郑克塽降」为史载。
 * 地名古今对照：澎湖今台湾澎湖、台南今台湾台南、厦门今福建厦门。
 */
var COLOR = { qing: '#2b5262', zheng: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'fuzhou', name: '福州',   x: 248, y: 128, tx: 248, ty: 114, anchor: 'middle' },
  { id: 'xiamen', name: '厦门',   x: 176, y: 232, tx: 162, ty: 226, anchor: 'end' },
  { id: 'penghu', name: '澎湖',   x: 208, y: 202, tx: 208, ty: 188, anchor: 'middle' },
  { id: 'taiwan', name: '台南',   x: 194, y: 284, tx: 180, ty: 292, anchor: 'end' }
];

var BASE0 = { fuzhou: 'qing', xiamen: 'qing', penghu: 'zheng', taiwan: 'zheng' };
var BASE1 = { fuzhou: 'qing', xiamen: 'qing', penghu: 'contested', taiwan: 'zheng' };
var BASE3 = { fuzhou: 'qing', xiamen: 'qing', penghu: 'qing', taiwan: 'zheng' };
var BASE4 = { fuzhou: 'qing', xiamen: 'qing', penghu: 'qing', taiwan: 'qing' };

var STAGES = [
  {
    label: '施琅出师', seal: '出航',
    kicker: '阶段一 · 1683 年 六月',
    title: '施琅率水师自厦门出航',
    turn: '施琅率清军水师自厦门出航，乘南风直趋澎湖；郑军刘国轩以舟师据澎湖妈宫港迎战。',
    why: '澎湖是台湾门户，澎湖一失，台湾便无海上屏障；施琅选在季风有利时出击。',
    src: '《清史稿·施琅传》；《台湾通史》。',
    events: [
      { time: '1683·六月', who: '施琅', text: '率水师自厦门出航', t: 0.08 },
      { time: '1683·六月', who: '清军水师', text: '乘南风直趋澎湖', t: 0.34, kind: 'flip', city: 'penghu' },
      { time: '1683·六月', who: '刘国轩', text: '据澎湖迎战', t: 0.58 },
      { time: '1683·六月', who: '两军', text: '隔海对峙', t: 0.84 }
    ],
    nums: [
      { label: '清军水师', value: '无确载', kind: '无确载', n: null },
      { label: '郑军', value: '无确载', kind: '无确载', n: null },
      { label: '澎湖', value: '门户', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { penghu: 0.34 },
    markers: [
      { type: 'host', side: 'qing', x: 176, y: 232, t: 0.30, name: '施琅', lx: 162, ly: 226, anchor: 'end' },
      { type: 'host', side: 'zheng', x: 208, y: 202, t: 0.02, name: '刘国轩', lx: 222, ly: 196, anchor: 'start' },
      { type: 'army', side: 'qing', x: 190, y: 218, t: 0.34, name: '清军水师', lx: 176, ly: 212, anchor: 'end' }
    ],
    routes: [
      { d: 'M 182 228 C 190 220 198 212 204 206', side: 'qing', t0: 0.10, t1: 0.54,
        label: '直趋澎湖', lx: 174, ly: 214, anchor: 'end' }
    ]
  },
  {
    label: '澎湖决战', seal: '海战',
    kicker: '阶段二 · 1683 年 六月',
    title: '清郑水师澎湖决战',
    turn: '两军水师于澎湖海面决战，炮火连天；清军船多且训练有素，郑军渐不能支。',
    why: '郑军水师久疏战阵，清军则准备充分；澎湖一战，胜负直接决定台湾的命运。',
    src: '《清史稿·施琅传》；《台湾通史》。',
    events: [
      { time: '1683·六月', who: '清军水师', text: '列阵进攻', t: 0.08 },
      { time: '1683·六月', who: '郑军', text: '据港迎击', t: 0.34 },
      { time: '1683·六月', who: '两军', text: '炮火连天', t: 0.58 },
      { time: '1683·六月', who: '郑军', text: '渐不能支', t: 0.84 }
    ],
    nums: [
      { label: '清军水师', value: '无确载', kind: '无确载', n: null },
      { label: '郑军', value: '无确载', kind: '无确载', n: null },
      { label: '战场', value: '澎湖', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'qing', x: 208, y: 202, t: 0.30, name: '施琅', lx: 194, ly: 196, anchor: 'end' },
      { type: 'host', side: 'zheng', x: 208, y: 202, t: 0.02, name: '刘国轩', lx: 222, ly: 208, anchor: 'start' },
      { type: 'army', side: 'qing', x: 196, y: 210, t: 0.34, name: '清军', lx: 182, ly: 204, anchor: 'end' }
    ],
    routes: []
  },
  {
    label: '澎湖失守', seal: '破敌',
    kicker: '阶段三 · 1683 年 六月',
    title: '清军破澎湖，郑军大败',
    turn: '清军水师突破郑军防线，焚其舟船；刘国轩率残部退守台湾，澎湖遂为清军所有。',
    why: '澎湖既失，台湾门户洞开；郑氏已无力再战于海上。',
    src: '《清史稿·施琅传》；《台湾通史》。',
    events: [
      { time: '1683·六月', who: '清军水师', text: '突破郑军防线', t: 0.08 },
      { time: '1683·六月', who: '清军', text: '焚其舟船', t: 0.34 },
      { time: '1683·六月', who: '澎湖', text: '失守', t: 0.58, kind: 'flip', city: 'penghu' },
      { time: '1683·六月', who: '刘国轩', text: '率残部退守台湾', t: 0.84 }
    ],
    nums: [
      { label: '清军水师', value: '无确载', kind: '无确载', n: null },
      { label: '郑军', value: '无确载', kind: '无确载', n: null },
      { label: '澎湖', value: '失守', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { penghu: 0.58 },
    sieges: [
      { x: 208, y: 202, t: 0.58, label: '澎湖破', side: 'qing', lx: 12, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'qing', x: 208, y: 202, t: 0.30, name: '施琅', lx: 222, ly: 196, anchor: 'start' },
      { type: 'host', side: 'zheng', x: 208, y: 202, t: 0.02, name: '刘国轩', lx: 194, ly: 208, anchor: 'end', weak: true },
      { type: 'army', side: 'qing', x: 198, y: 216, t: 0.34, name: '清军', lx: 184, ly: 222, anchor: 'end' }
    ],
    routes: [
      { d: 'M 204 210 C 206 208 208 206 210 204', side: 'qing', t0: 0.10, t1: 0.50,
        label: '突破', lx: 192, ly: 214, anchor: 'end' }
    ]
  },
  {
    label: '郑克塽归降', seal: '归清',
    kicker: '阶段四 · 1683 年 七月',
    title: '郑克塽奉表归降，台湾入清',
    turn: '清军进逼台湾，郑克塽奉表归降；台湾纳入清廷版图，设台湾府隶属福建。',
    why: '澎湖一失，台湾已无战守之力；郑氏归降使台湾正式纳入中央王朝行政体系。',
    src: '《清史稿·施琅传》《圣祖本纪》；《台湾通史》。',
    events: [
      { time: '1683·七月', who: '清军', text: '进逼台湾', t: 0.08 },
      { time: '1683·七月', who: '郑克塽', text: '奉表归降', t: 0.34, kind: 'flip', city: 'taiwan' },
      { time: '1683·七月', who: '清廷', text: '设台湾府', t: 0.58 },
      { time: '1683·七月', who: '台湾', text: '入清版图', t: 0.84 }
    ],
    nums: [
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '郑军', value: '无确载', kind: '无确载', n: null },
      { label: '台湾', value: '归清', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { taiwan: 0.34 },
    markers: [
      { type: 'host', side: 'qing', x: 194, y: 284, t: 0.30, name: '施琅', lx: 180, ly: 278, anchor: 'end' },
      { type: 'host', side: 'zheng', x: 194, y: 284, t: 0.02, name: '郑克塽', lx: 208, ly: 292, anchor: 'start', weak: true },
      { type: 'army', side: 'qing', x: 202, y: 246, t: 0.34, name: '清军', lx: 216, ly: 240, anchor: 'start' }
    ],
    routes: [
      { d: 'M 206 216 C 204 238 200 262 196 278', side: 'qing', t0: 0.10, t1: 0.54,
        label: '进逼台湾', lx: 218, ly: 248, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 150 90 C 170 140 190 190 200 240 C 206 266 204 288 200 320', color: '#a8b6ab', width: 2 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 40, y: 150, t: '台 湾 海 峡', size: 9, color: '#46594f', ls: 4, serif: true, rotate: 68 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '澎湖·今台湾澎湖　台南·今台湾台南　厦门·今福建厦门', size: 6.6, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '台　海', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'penghu',
  title: '澎湖海战',
  kicker: '沙 盘 推 演',
  subtitle: '厦门 · 澎湖',
  years: '1683',
  yearUnit: 'AD',
  era: '清 · 康熙二十二年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：澎湖今台湾澎湖、台南今台湾台南，非真实地理比例',
  hook: '施琅澎湖破郑军水师，郑克塽归降，台湾入清版图',
  period: '清',
  yearValue: 1683,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '清', b: '胜', sub: '1683' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
