/**
 * 沙盘推演 · 昭莫多之战（1696）
 * 通行叙事：康熙帝再次亲征，三路出兵；噶尔丹自克鲁伦河西走，
 * 清军费扬古部邀击于昭莫多，准军大败，噶尔丹仅以身免，次年走死。
 * 双方兵力无确载；「三路出兵」「昭莫多邀击」为史载。
 * 地名古今对照：昭莫多今蒙古国乌兰巴托东南、克鲁伦河今蒙古国境内、土拉河今蒙古国境内。
 */
var COLOR = { qing: '#2b5262', zhun: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'beijing', name: '北京',   x: 306, y: 140, tx: 320, ty: 134, anchor: 'start' },
  { id: 'guihua',  name: '归化',   x: 250, y: 180, tx: 236, ty: 174, anchor: 'end' },
  { id: 'zhaomodu', name: '昭莫多', x: 204, y: 150, tx: 190, ty: 144, anchor: 'end' },
  { id: 'tula',    name: '土拉河', x: 222, y: 112, tx: 236, ty: 106, anchor: 'start' },
  { id: 'kelulun', name: '克鲁伦河', x: 196, y: 82, tx: 182, ty: 76, anchor: 'end' }
];

var BASE0 = { beijing: 'qing', guihua: 'qing', zhaomodu: 'qing', tula: 'zhun', kelulun: 'zhun' };
var BASE1 = { beijing: 'qing', guihua: 'qing', zhaomodu: 'qing', tula: 'zhun', kelulun: 'contested' };
var BASE2 = { beijing: 'qing', guihua: 'qing', zhaomodu: 'qing', tula: 'contested', kelulun: 'qing' };
var BASE3 = { beijing: 'qing', guihua: 'qing', zhaomodu: 'contested', tula: 'contested', kelulun: 'qing' };
var BASE4 = { beijing: 'qing', guihua: 'qing', zhaomodu: 'qing', tula: 'qing', kelulun: 'qing' };

var STAGES = [
  {
    label: '三路出征', seal: '再征',
    kicker: '阶段一 · 1696 年 二月',
    title: '康熙再征，三路出兵',
    turn: '康熙帝再次亲征，清军分三路出塞：中路出独石口，西路出归化，东路趋克鲁伦河。',
    why: '上一次乌兰布通未能全歼准军；此次清廷以三路合击，意在围歼噶尔丹主力。',
    src: '《清史稿·圣祖本纪》《费扬古传》。',
    events: [
      { time: '1696·二月', who: '康熙', text: '再次亲征', t: 0.08 },
      { time: '1696·二月', who: '清军', text: '分三路出塞', t: 0.34 },
      { time: '1696·二月', who: '清军西路', text: '出归化', t: 0.58 },
      { time: '1696·二月', who: '清军东路', text: '趋克鲁伦河', t: 0.84, kind: 'flip', city: 'kelulun' }
    ],
    nums: [
      { label: '准军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '出兵', value: '三路', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { kelulun: 0.84 },
    markers: [
      { type: 'host', side: 'qing', x: 306, y: 140, t: 0.02, name: '康熙', lx: 320, ly: 134, anchor: 'start' },
      { type: 'host', side: 'zhun', x: 196, y: 82, t: 0.02, name: '噶尔丹', lx: 182, ly: 76, anchor: 'end' },
      { type: 'army', side: 'qing', x: 270, y: 158, t: 0.34, name: '清军', lx: 284, ly: 152, anchor: 'start' }
    ],
    routes: [
      { d: 'M 302 144 C 286 152 270 162 256 172', side: 'qing', t0: 0.10, t1: 0.54,
        label: '清军出塞', lx: 298, ly: 158, anchor: 'start' }
    ]
  },
  {
    label: '噶尔丹西走', seal: '西走',
    kicker: '阶段二 · 1696 年 五月',
    title: '噶尔丹弃克鲁伦河西走',
    turn: '噶尔丹闻清军大至，弃克鲁伦河营地西走；清军中路由克鲁伦河追击，西路费扬古部截其前路。',
    why: '噶尔丹避战西走，正落入清军西路预设的邀击方向；机动空间被三路大军压缩。',
    src: '《清史稿·圣祖本纪》《费扬古传》。',
    events: [
      { time: '1696·五月', who: '噶尔丹', text: '弃克鲁伦河西走', t: 0.08 },
      { time: '1696·五月', who: '清军中路', text: '由克鲁伦河追击', t: 0.34, kind: 'flip', city: 'kelulun' },
      { time: '1696·五月', who: '清军西路', text: '费扬古截其前路', t: 0.58, kind: 'flip', city: 'tula' },
      { time: '1696·五月', who: '准军', text: '退向昭莫多', t: 0.84 }
    ],
    nums: [
      { label: '准军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '噶尔丹', value: '西走', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { kelulun: 0.34, tula: 0.58 },
    markers: [
      { type: 'host', side: 'zhun', x: 222, y: 112, t: 0.30, name: '噶尔丹', lx: 236, ly: 106, anchor: 'start' },
      { type: 'host', side: 'qing', x: 250, y: 180, t: 0.02, name: '费扬古', lx: 264, ly: 174, anchor: 'start' },
      { type: 'army', side: 'zhun', x: 210, y: 130, t: 0.34, name: '准军', lx: 196, ly: 124, anchor: 'end' }
    ],
    routes: [
      { d: 'M 218 106 C 214 118 210 130 208 140', side: 'retreat', t0: 0.10, t1: 0.54,
        label: '准军西走', lx: 228, ly: 116, anchor: 'start' }
    ]
  },
  {
    label: '昭莫多邀击', seal: '邀击',
    kicker: '阶段三 · 1696 年 五月',
    title: '清军邀击准军于昭莫多',
    turn: '准军至昭莫多，清军费扬古部据险邀击；准军仓促应战，被清军分割包围。',
    why: '准军长途退却、人马疲敝，正撞上以逸待劳的清军；昭莫多成为准军的绝地。',
    src: '《清史稿·费扬古传》《圣祖本纪》；《亲征平定朔漠方略》。',
    events: [
      { time: '1696·五月', who: '准军', text: '至昭莫多', t: 0.08, kind: 'flip', city: 'zhaomodu' },
      { time: '1696·五月', who: '费扬古', text: '据险邀击', t: 0.34 },
      { time: '1696·五月', who: '准军', text: '仓促应战', t: 0.58 },
      { time: '1696·五月', who: '清军', text: '分割包围准军', t: 0.84 }
    ],
    nums: [
      { label: '准军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '昭莫多', value: '邀击', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { zhaomodu: 0.08 },
    markers: [
      { type: 'host', side: 'qing', x: 204, y: 150, t: 0.30, name: '费扬古', lx: 190, ly: 156, anchor: 'end' },
      { type: 'host', side: 'zhun', x: 204, y: 150, t: 0.02, name: '噶尔丹', lx: 218, ly: 144, anchor: 'start' },
      { type: 'army', side: 'qing', x: 216, y: 160, t: 0.34, name: '清军', lx: 230, ly: 154, anchor: 'start' }
    ],
    routes: [
      { d: 'M 214 136 C 212 142 208 146 206 148', side: 'zhun', t0: 0.06, t1: 0.30,
        label: '准军南来', lx: 224, ly: 140, anchor: 'start' }
    ]
  },
  {
    label: '准军大败', seal: '败走',
    kicker: '阶段四 · 1696 年 五月',
    title: '准军大败，噶尔丹仅以身免',
    turn: '准军大败，部众溃散，噶尔丹仅率数十骑突围西走；次年走死于科布多。',
    why: '昭莫多一战，准噶尔主力尽失；噶尔丹再无力东侵，漠北局势底定。',
    src: '《清史稿·圣祖本纪》《费扬古传》《噶尔丹传》。',
    events: [
      { time: '1696·五月', who: '清军', text: '大破准军', t: 0.08, kind: 'flip', city: 'zhaomodu' },
      { time: '1696·五月', who: '准军', text: '部众溃散', t: 0.34 },
      { time: '1696·五月', who: '噶尔丹', text: '仅率数十骑突围', t: 0.58 },
      { time: '1696·五月', who: '噶尔丹', text: '西走科布多', t: 0.84, kind: 'flip', city: 'tula' }
    ],
    nums: [
      { label: '准军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '噶尔丹', value: '仅以身免', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { zhaomodu: 0.08, tula: 0.84 },
    sieges: [
      { x: 204, y: 150, t: 0.08, label: '准军溃', side: 'qing', lx: 12, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'qing', x: 204, y: 150, t: 0.30, name: '费扬古', lx: 218, ly: 144, anchor: 'start' },
      { type: 'host', side: 'zhun', x: 204, y: 150, t: 0.02, name: '噶尔丹', lx: 190, ly: 156, anchor: 'end', weak: true },
      { type: 'army', side: 'zhun', x: 190, y: 120, t: 0.58, name: '准军残部', lx: 176, ly: 114, anchor: 'end' }
    ],
    routes: [
      { d: 'M 198 144 C 196 132 194 116 194 100', side: 'retreat', t0: 0.56, t1: 0.94,
        label: '噶尔丹西走', lx: 206, ly: 124, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 160 60 C 180 100 200 140 220 180 C 240 220 260 250 280 280', color: '#a8b6ab', width: 2 },
    { d: 'M 120 110 C 160 104 200 112 240 106 C 280 100 320 108 360 104', color: '#b6c3b6', width: 2.2 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 110, t: '克 鲁 伦 河', size: 8.5, color: '#46594f', ls: 2, serif: true },
    { x: 240, y: 138, t: '土 拉 河', size: 8.5, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '昭莫多·今蒙古国乌兰巴托东南　克鲁伦河·今蒙古国境内', size: 6.2, color: '#7d6647', ls: 0.3 },
    { x: 24, y: 366, t: '漠　北', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'zhaomodu',
  title: '昭莫多之战',
  kicker: '沙 盘 推 演',
  subtitle: '克鲁伦河 · 昭莫多',
  years: '1696',
  yearUnit: 'AD',
  era: '清 · 康熙三十五年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：昭莫多今蒙古国乌兰巴托东南，非真实地理比例',
  hook: '康熙三路出征，费扬古昭莫多邀击，准军大败，噶尔丹仅以身免',
  period: '清',
  yearValue: 1696,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '清', b: '胜', sub: '1696' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
