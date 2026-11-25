/**
 * 沙盘推演 · 高粱河之战（979）
 * 通行叙事：宋太宗灭北汉后，乘胜转攻辽南京幽州；宋军久攻不下，
 * 辽将耶律休哥、耶律斜轸来援，战于高粱河，宋军大溃，太宗乘驴车遁归。
 * 双方兵力均无确载；太宗「乘驴车遁」为史载。
 * 地名古今对照：幽州今北京、涿州今河北涿州、高粱河在今北京西直门外。
 */
var COLOR = { song: '#2b5262', liao: '#6f3a22', han: '#4a4a5a', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'bianliang',  name: '汴梁',   x: 176, y: 318, tx: 176, ty: 334, anchor: 'middle' },
  { id: 'taiyuan',    name: '太原',   x: 136, y: 178, tx: 136, ty: 164, anchor: 'middle' },
  { id: 'zhuozhou',   name: '涿州',   x: 238, y: 176, tx: 224, ty: 170, anchor: 'end' },
  { id: 'gaolianghe', name: '高粱河', x: 266, y: 164, tx: 252, ty: 176, anchor: 'end' },
  { id: 'youzhou',    name: '幽州',   x: 292, y: 146, tx: 292, ty: 132, anchor: 'middle' }
];

var BASE0 = { bianliang: 'song', taiyuan: 'han', zhuozhou: 'liao', gaolianghe: 'liao', youzhou: 'liao' };
var BASE1 = { bianliang: 'song', taiyuan: 'song', zhuozhou: 'liao', gaolianghe: 'liao', youzhou: 'liao' };
var BASE2 = { bianliang: 'song', taiyuan: 'song', zhuozhou: 'song', gaolianghe: 'liao', youzhou: 'contested' };
var BASE3 = { bianliang: 'song', taiyuan: 'song', zhuozhou: 'song', gaolianghe: 'contested', youzhou: 'contested' };
var BASE4 = { bianliang: 'song', taiyuan: 'song', zhuozhou: 'liao', gaolianghe: 'liao', youzhou: 'liao' };

var STAGES = [
  {
    label: '灭北汉', seal: '灭汉',
    kicker: '阶段一 · 979 年 二至五月',
    title: '宋太宗亲征，灭北汉',
    turn: '宋太宗亲征北汉，围太原；辽遣军来援，被宋军击败于白马岭。北汉主刘继元出降，北汉亡。',
    why: '北汉既灭，五代十国割据基本结束；宋太宗欲乘胜收复燕云，一举解决北疆。',
    src: '《宋史·太宗本纪》；《续资治通鉴长编》卷二十。',
    events: [
      { time: '979·二月', who: '宋太宗', text: '亲征北汉，围太原', t: 0.08 },
      { time: '979·三月', who: '宋军', text: '败辽援军于白马岭', t: 0.34 },
      { time: '979·五月', who: '刘继元', text: '出降，北汉亡', t: 0.58, kind: 'flip', city: 'taiyuan' },
      { time: '979·五月', who: '宋太宗', text: '欲乘胜收复燕云', t: 0.84 }
    ],
    nums: [
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '北汉军', value: '无确载', kind: '无确载', n: null },
      { label: '北汉', value: '亡', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { taiyuan: 0.58 },
    markers: [
      { type: 'host', side: 'song', x: 136, y: 178, t: 0.30, name: '宋太宗', lx: 122, ly: 190, anchor: 'end' },
      { type: 'host', side: 'han', x: 136, y: 178, t: 0.02, name: '刘继元', lx: 150, ly: 168, anchor: 'start', weak: true },
      { type: 'army', side: 'song', x: 160, y: 250, t: 0.10, name: '宋军', lx: 174, ly: 244, anchor: 'start' }
    ],
    routes: [
      { d: 'M 172 312 C 160 274 148 220 140 190', side: 'song', t0: 0.06, t1: 0.48,
        label: '宋军北上', lx: 154, ly: 250, anchor: 'end' }
    ]
  },
  {
    label: '转攻幽州', seal: '北伐',
    kicker: '阶段二 · 979 年 六月',
    title: '宋军乘胜转攻幽州',
    turn: '宋太宗不待休整，自太原东出，连下涿州、易州，进围辽南京幽州；辽守将韩德让、耶律学古坚守待援。',
    why: '宋军新胜而骄，欲一鼓作气收复燕云；但幽州城坚，辽援军正在集结。',
    src: '《宋史·太宗本纪》；《辽史·圣宗纪》；《续资治通鉴长编》卷二十。',
    events: [
      { time: '979·六月', who: '宋太宗', text: '自太原东出', t: 0.08 },
      { time: '979·六月', who: '宋军', text: '连下涿州、易州', t: 0.34, kind: 'flip', city: 'zhuozhou' },
      { time: '979·六月', who: '宋军', text: '进围幽州', t: 0.58, kind: 'flip', city: 'youzhou' },
      { time: '979·六月', who: '韩德让', text: '坚守待援', t: 0.84 }
    ],
    nums: [
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '辽军', value: '无确载', kind: '无确载', n: null },
      { label: '幽州', value: '被围', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { zhuozhou: 0.34, youzhou: 0.58 },
    sieges: [
      { x: 292, y: 146, t: 0.58, label: '围城', side: 'song', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'song', x: 292, y: 146, t: 0.30, name: '宋太宗', lx: 278, ly: 158, anchor: 'end' },
      { type: 'host', side: 'liao', x: 292, y: 146, t: 0.02, name: '韩德让', lx: 306, ly: 140, anchor: 'start', weak: true },
      { type: 'army', side: 'song', x: 250, y: 166, t: 0.34, name: '宋军', lx: 236, ly: 160, anchor: 'end' }
    ],
    routes: [
      { d: 'M 144 174 C 180 172 220 176 240 178', side: 'song', t0: 0.06, t1: 0.40,
        label: '宋军东进', lx: 190, ly: 164, anchor: 'middle' }
    ]
  },
  {
    label: '高粱河激战', seal: '激战',
    kicker: '阶段三 · 979 年 七月',
    title: '辽援军至，高粱河激战',
    turn: '辽耶律休哥、耶律斜轸率军来援，与宋军战于高粱河；辽军以骑兵夹击，宋军久攻疲惫，阵势动摇。',
    why: '宋军顿兵坚城之下，师老而援敌至；高粱河一战，攻守之势逆转。',
    src: '《辽史·耶律休哥传》；《宋史·太宗本纪》；《续资治通鉴长编》卷二十。',
    events: [
      { time: '979·七月', who: '耶律休哥', text: '率辽军来援', t: 0.08 },
      { time: '979·七月', who: '两军', text: '战于高粱河', t: 0.34, kind: 'flip', city: 'gaolianghe' },
      { time: '979·七月', who: '辽军', text: '以骑兵夹击宋军', t: 0.58 },
      { time: '979·七月', who: '宋军', text: '久攻疲惫，阵势动摇', t: 0.84 }
    ],
    nums: [
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '辽军', value: '无确载', kind: '无确载', n: null },
      { label: '高粱河', value: '激战', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { gaolianghe: 0.34 },
    markers: [
      { type: 'host', side: 'liao', x: 266, y: 164, t: 0.30, name: '耶律休哥', lx: 252, ly: 158, anchor: 'end' },
      { type: 'host', side: 'song', x: 266, y: 164, t: 0.02, name: '宋太宗', lx: 252, ly: 176, anchor: 'end', weak: true },
      { type: 'army', side: 'liao', x: 282, y: 170, t: 0.34, name: '辽军', lx: 296, ly: 164, anchor: 'start' }
    ],
    routes: [
      { d: 'M 306 158 C 294 160 280 162 270 164', side: 'liao', t0: 0.10, t1: 0.48,
        label: '辽军夹击', lx: 300, ly: 172, anchor: 'start' }
    ]
  },
  {
    label: '宋军溃退', seal: '大溃',
    kicker: '阶段四 · 979 年 七月',
    title: '宋军大溃，太宗乘驴车遁归',
    turn: '宋军大溃，死者万余人；宋太宗身中流矢，乘驴车南遁。辽军追至涿州，宋军弃甲仗如山。',
    why: '高粱河一败，宋军元气大伤，此后对辽转取守势；燕云十六州再未收复。',
    src: '《宋史·太宗本纪》；《辽史·耶律休哥传》；《续资治通鉴长编》卷二十。',
    events: [
      { time: '979·七月', who: '宋军', text: '大溃，死者万余人', t: 0.08, kind: 'flip', city: 'gaolianghe' },
      { time: '979·七月', who: '宋太宗', text: '中流矢，乘驴车南遁', t: 0.34 },
      { time: '979·七月', who: '辽军', text: '追至涿州', t: 0.58, kind: 'flip', city: 'zhuozhou' },
      { time: '979·七月', who: '宋', text: '弃甲仗如山，转取守势', t: 0.84 }
    ],
    nums: [
      { label: '宋军死者', value: '万余人', kind: '史载', n: 10 },
      { label: '辽军', value: '无确载', kind: '无确载', n: null },
      { label: '宋太宗', value: '乘驴车遁', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { gaolianghe: 0.08, zhuozhou: 0.58 },
    markers: [
      { type: 'host', side: 'liao', x: 266, y: 164, t: 0.02, name: '耶律休哥', lx: 280, ly: 158, anchor: 'start' },
      { type: 'host', side: 'song', x: 210, y: 214, t: 0.34, name: '宋太宗', lx: 196, ly: 208, anchor: 'end', weak: true },
      { type: 'army', side: 'liao', x: 246, y: 184, t: 0.34, name: '辽军', lx: 232, ly: 190, anchor: 'end' }
    ],
    routes: [
      { d: 'M 258 170 C 240 186 220 204 208 216', side: 'retreat', t0: 0.10, t1: 0.54,
        label: '宋军南溃', lx: 218, ly: 176, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 172 C 70 168 140 176 210 170 C 280 164 340 170 385 166', color: '#a8b6ab', width: 2.4 },
    { d: 'M 60 50 C 90 110 120 160 150 210 C 168 244 178 300 182 386', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 150 66 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 76 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 80 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 30, y: 166, t: '桑干河', size: 8.5, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '幽州·今北京　涿州·今河北涿州　高粱河·今北京西直门外', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '燕　云', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'gaolianghe',
  title: '高粱河之战',
  kicker: '沙 盘 推 演',
  subtitle: '幽州 · 高粱河',
  years: '979',
  yearUnit: 'AD',
  era: '北宋 · 太平兴国四年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：幽州今北京、高粱河在今北京西直门外，非真实地理比例',
  hook: '宋太宗灭北汉后围攻幽州，高粱河一战大溃，乘驴车遁归',
  period: '宋辽',
  yearValue: 979,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '辽', b: '胜', sub: '979' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
