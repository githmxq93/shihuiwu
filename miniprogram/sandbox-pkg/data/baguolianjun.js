/**
 * 沙盘推演 · 八国联军侵华（1900）
 * 通行叙事：义和团运动高涨，列强组织八国联军攻大沽口、天津；
 * 廊坊阻击战一度阻滞联军，然联军续至，攻入北京，慈禧西逃。
 * 联军兵力无确载；「攻陷大沽口」「攻入北京」为史载。
 * 地名古今对照：大沽口今天津滨海新区、廊坊今河北廊坊、通州今北京通州。
 */
var COLOR = { qing: '#2b5262', allied: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'dagukou',  name: '大沽口', x: 304, y: 184, tx: 318, ty: 192, anchor: 'start' },
  { id: 'tianjin',  name: '天津',   x: 284, y: 162, tx: 298, ty: 156, anchor: 'start' },
  { id: 'langfang', name: '廊坊',   x: 272, y: 144, tx: 286, ty: 138, anchor: 'start' },
  { id: 'tongzhou', name: '通州',   x: 260, y: 130, tx: 274, ty: 124, anchor: 'start' },
  { id: 'beijing',  name: '北京',   x: 244, y: 116, tx: 244, ty: 102, anchor: 'middle' }
];

var BASE0 = { dagukou: 'qing', tianjin: 'qing', langfang: 'qing', tongzhou: 'qing', beijing: 'qing' };
var BASE1 = { dagukou: 'contested', tianjin: 'qing', langfang: 'qing', tongzhou: 'qing', beijing: 'qing' };
var BASE2 = { dagukou: 'allied', tianjin: 'allied', langfang: 'qing', tongzhou: 'qing', beijing: 'qing' };
var BASE3 = { dagukou: 'allied', tianjin: 'allied', langfang: 'contested', tongzhou: 'qing', beijing: 'qing' };
var BASE4 = { dagukou: 'allied', tianjin: 'allied', langfang: 'allied', tongzhou: 'allied', beijing: 'contested' };

var STAGES = [
  {
    label: '联军攻大沽', seal: '来攻',
    kicker: '阶段一 · 1900 年 六月',
    title: '八国联军攻大沽口',
    turn: '列强以保护使馆为名，组织八国联军攻大沽口炮台；清军据台抵抗，炮台失守。',
    why: '大沽口是天津的门户，大沽一失，联军便可沿铁路直趋天津、北京。',
    src: '《清史稿·德宗本纪》；《义和团档案史料》。',
    events: [
      { time: '1900·六月', who: '八国联军', text: '攻大沽口炮台', t: 0.08, kind: 'flip', city: 'dagukou' },
      { time: '1900·六月', who: '清军', text: '据台抵抗', t: 0.34 },
      { time: '1900·六月', who: '大沽口', text: '炮台失守', t: 0.58 },
      { time: '1900·六月', who: '联军', text: '沿铁路进逼天津', t: 0.84 }
    ],
    nums: [
      { label: '联军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '大沽口', value: '失守', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { dagukou: 0.08 },
    markers: [
      { type: 'host', side: 'allied', x: 304, y: 184, t: 0.30, name: '联军', lx: 318, ly: 178, anchor: 'start' },
      { type: 'host', side: 'qing', x: 284, y: 162, t: 0.02, name: '清军', lx: 270, ly: 156, anchor: 'end' },
      { type: 'army', side: 'allied', x: 296, y: 172, t: 0.34, name: '联军', lx: 310, ly: 166, anchor: 'start' }
    ],
    routes: [
      { d: 'M 300 180 C 296 176 292 172 288 168', side: 'allied', t0: 0.10, t1: 0.54,
        label: '进逼天津', lx: 308, ly: 186, anchor: 'start' }
    ]
  },
  {
    label: '天津失守', seal: '陷津',
    kicker: '阶段二 · 1900 年 七月',
    title: '联军陷天津',
    turn: '联军攻陷天津，清军与义和团退守杨村、廊坊一线；联军沿铁路北犯。',
    why: '天津是北京的门户与联军补给基地，天津一失，北京便直接暴露在铁路线上。',
    src: '《清史稿·德宗本纪》；《义和团档案史料》。',
    events: [
      { time: '1900·七月', who: '联军', text: '攻陷天津', t: 0.08, kind: 'flip', city: 'tianjin' },
      { time: '1900·七月', who: '清军·义和团', text: '退守杨村、廊坊', t: 0.34 },
      { time: '1900·七月', who: '联军', text: '沿铁路北犯', t: 0.58 },
      { time: '1900·七月', who: '联军', text: '进抵廊坊', t: 0.84 }
    ],
    nums: [
      { label: '联军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '天津', value: '陷落', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { tianjin: 0.08 },
    markers: [
      { type: 'host', side: 'allied', x: 284, y: 162, t: 0.30, name: '联军', lx: 298, ly: 156, anchor: 'start' },
      { type: 'host', side: 'qing', x: 272, y: 144, t: 0.02, name: '清军', lx: 258, ly: 138, anchor: 'end' },
      { type: 'army', side: 'allied', x: 278, y: 152, t: 0.34, name: '联军', lx: 292, ly: 146, anchor: 'start' }
    ],
    routes: [
      { d: 'M 280 158 C 278 154 276 150 274 146', side: 'allied', t0: 0.10, t1: 0.54,
        label: '沿铁路北犯', lx: 288, ly: 162, anchor: 'start' }
    ]
  },
  {
    label: '廊坊阻击', seal: '阻击',
    kicker: '阶段三 · 1900 年 七月',
    title: '清军与义和团廊坊阻击',
    turn: '清军与义和团在廊坊一带阻击联军，一度使其受挫；然联军增援续至，阻击终被突破。',
    why: '廊坊阻击战是清军少有的主动抵抗，但装备与组织差距使战果难以扩大。',
    src: '《清史稿·德宗本纪》；《义和团档案史料》。',
    events: [
      { time: '1900·七月', who: '清军·义和团', text: '廊坊阻击', t: 0.08, kind: 'flip', city: 'langfang' },
      { time: '1900·七月', who: '联军', text: '一度受挫', t: 0.34 },
      { time: '1900·七月', who: '联军', text: '增援续至', t: 0.58 },
      { time: '1900·七月', who: '联军', text: '突破阻击', t: 0.84 }
    ],
    nums: [
      { label: '联军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '廊坊', value: '阻击', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { langfang: 0.08 },
    markers: [
      { type: 'host', side: 'qing', x: 272, y: 144, t: 0.30, name: '清军', lx: 258, ly: 150, anchor: 'end' },
      { type: 'host', side: 'allied', x: 284, y: 162, t: 0.02, name: '联军', lx: 298, ly: 168, anchor: 'start' },
      { type: 'army', side: 'qing', x: 268, y: 154, t: 0.34, name: '义和团', lx: 254, ly: 160, anchor: 'end' }
    ],
    routes: []
  },
  {
    label: '联军入京', seal: '入京',
    kicker: '阶段四 · 1900 年 八月',
    title: '联军攻入北京，慈禧西逃',
    turn: '联军破通州，攻入北京；慈禧太后携光绪帝西逃，北京陷落，清廷被迫议和。',
    why: '北京陷落与《辛丑条约》的签订，使中国半殖民地化程度进一步加深。',
    src: '《清史稿·德宗本纪》；《义和团档案史料》。',
    events: [
      { time: '1900·八月', who: '联军', text: '破通州', t: 0.08, kind: 'flip', city: 'tongzhou' },
      { time: '1900·八月', who: '联军', text: '攻入北京', t: 0.34, kind: 'flip', city: 'beijing' },
      { time: '1900·八月', who: '慈禧·光绪', text: '西逃', t: 0.58 },
      { time: '1900·八月', who: '清廷', text: '被迫议和', t: 0.84 }
    ],
    nums: [
      { label: '联军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '北京', value: '陷落', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { tongzhou: 0.08, beijing: 0.34 },
    markers: [
      { type: 'host', side: 'allied', x: 244, y: 116, t: 0.30, name: '联军', lx: 258, ly: 110, anchor: 'start' },
      { type: 'host', side: 'qing', x: 244, y: 116, t: 0.02, name: '清廷', lx: 230, ly: 110, anchor: 'end', weak: true },
      { type: 'army', side: 'allied', x: 256, y: 126, t: 0.34, name: '联军', lx: 270, ly: 120, anchor: 'start' }
    ],
    routes: [
      { d: 'M 256 132 C 252 126 248 120 246 118', side: 'allied', t0: 0.10, t1: 0.54,
        label: '攻入北京', lx: 262, ly: 138, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 320 200 C 300 180 280 160 260 140 C 240 120 220 110 200 100', color: '#a8b6ab', width: 2 },
    { d: 'M 300 120 C 280 126 260 132 240 138 C 220 144 200 150 180 156', color: '#b6c3b6', width: 2.2 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 310 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 40, y: 220, t: '渤　海', size: 9, color: '#46594f', ls: 4, serif: true },
    { x: 150, y: 190, t: '京 津 铁 路', size: 7.5, color: '#46594f', ls: 1, serif: true, rotate: -24 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '大沽口·今天津滨海新区　廊坊·今河北廊坊　通州·今北京通州', size: 6.2, color: '#7d6647', ls: 0.3 },
    { x: 24, y: 366, t: '京　畿', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'baguolianjun',
  title: '八国联军侵华',
  kicker: '沙 盘 推 演',
  subtitle: '大沽口 · 北京',
  years: '1900',
  yearUnit: 'AD',
  era: '清 · 光绪二十六年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：大沽口今天津滨海新区、廊坊今河北廊坊，非真实地理比例',
  hook: '八国联军陷大沽、天津，破廊坊阻击，攻入北京，慈禧西逃',
  period: '清',
  yearValue: 1900,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '联军', b: '入京', sub: '1900' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
