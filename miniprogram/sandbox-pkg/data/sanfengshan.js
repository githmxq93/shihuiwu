/**
 * 沙盘推演 · 三峰山之战（1232）
 * 通行叙事：蒙古拖雷借道宋境，出邓州北上；金军完颜合达、移剌蒲阿率十五万南下截击；
 * 两军于三峰山决战，金军大溃，主力尽丧，蒙古军旋进逼汴京。
 * 金军「十五万」为史载；蒙古军兵力无确载。
 * 地名古今对照：三峰山今河南禹州西南、钧州今河南禹州、邓州今河南邓州。
 */
var COLOR = { meng: '#2b5262', jin: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'bianjing',    name: '汴京',   x: 280, y: 190, tx: 280, ty: 176, anchor: 'middle' },
  { id: 'junzhou',     name: '钧州',   x: 238, y: 230, tx: 252, ty: 224, anchor: 'start' },
  { id: 'sanfengshan', name: '三峰山', x: 214, y: 250, tx: 200, ty: 256, anchor: 'end' },
  { id: 'dengzhou',    name: '邓州',   x: 190, y: 304, tx: 176, ty: 312, anchor: 'end' },
  { id: 'tongguan',    name: '潼关',   x: 128, y: 198, tx: 128, ty: 184, anchor: 'middle' }
];

var BASE0 = { bianjing: 'jin', junzhou: 'jin', sanfengshan: 'jin', dengzhou: 'jin', tongguan: 'jin' };
var BASE1 = { bianjing: 'jin', junzhou: 'jin', sanfengshan: 'jin', dengzhou: 'meng', tongguan: 'jin' };
var BASE2 = { bianjing: 'jin', junzhou: 'contested', sanfengshan: 'contested', dengzhou: 'meng', tongguan: 'jin' };
var BASE3 = { bianjing: 'jin', junzhou: 'jin', sanfengshan: 'meng', dengzhou: 'meng', tongguan: 'jin' };
var BASE4 = { bianjing: 'contested', junzhou: 'meng', sanfengshan: 'meng', dengzhou: 'meng', tongguan: 'jin' };

var STAGES = [
  {
    label: '借道宋境', seal: '出邓州',
    kicker: '阶段一 · 1232 年 春',
    title: '拖雷借道宋境，出邓州北上',
    turn: '拖雷率蒙古军假道宋境，自汉中经饶峰关入金境，攻邓州；金廷急调完颜合达、移剌蒲阿率军南下拒之。',
    why: '蒙古军绕开潼关天险，从南面插入金国腹地，金军不得不离开预设防线南下截击。',
    src: '《元史·太宗本纪》《拖雷传》；《金史·完颜合达传》。',
    events: [
      { time: '1232·春', who: '拖雷', text: '假道宋境，入金南境', t: 0.08 },
      { time: '1232·春', who: '蒙古军', text: '攻邓州', t: 0.34, kind: 'flip', city: 'dengzhou' },
      { time: '1232·春', who: '金廷', text: '调军南下拒之', t: 0.58 },
      { time: '1232·春', who: '完颜合达', text: '率军南下', t: 0.84 }
    ],
    nums: [
      { label: '金军', value: '十五万', kind: '史载', n: 150 },
      { label: '蒙古军', value: '无确载', kind: '无确载', n: null },
      { label: '路线', value: '借道宋境', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { dengzhou: 0.34 },
    markers: [
      { type: 'host', side: 'meng', x: 190, y: 304, t: 0.30, name: '拖雷', lx: 176, ly: 296, anchor: 'end' },
      { type: 'host', side: 'jin', x: 280, y: 190, t: 0.02, name: '完颜合达', lx: 294, ly: 184, anchor: 'start' },
      { type: 'army', side: 'meng', x: 204, y: 282, t: 0.44, name: '蒙古军', lx: 218, ly: 290, anchor: 'start' }
    ],
    routes: [
      { d: 'M 196 298 C 202 276 208 260 212 252', side: 'meng', t0: 0.10, t1: 0.52,
        label: '蒙古北上', lx: 186, ly: 274, anchor: 'end' }
    ]
  },
  {
    label: '金军南下', seal: '截击',
    kicker: '阶段二 · 1232 年',
    title: '金军十五万南下，进至三峰山',
    turn: '完颜合达、移剌蒲阿率步骑十五万南下，进至钧州、三峰山一带；蒙古军以轻骑诱之，且战且退。',
    why: '金军兵力占优，却被迫在蒙古军选定的地形上接战；拖雷以小股骑兵不断袭扰，疲惫金军。',
    src: '《金史·完颜合达传》《移剌蒲阿传》；《元史·拖雷传》。',
    events: [
      { time: '1232', who: '金军', text: '十五万南下', t: 0.08 },
      { time: '1232', who: '金军', text: '进至钧州、三峰山', t: 0.34, kind: 'flip', city: 'sanfengshan' },
      { time: '1232', who: '蒙古军', text: '以轻骑诱之', t: 0.58 },
      { time: '1232', who: '金军', text: '且战且进，人马疲敝', t: 0.84 }
    ],
    nums: [
      { label: '金军', value: '十五万', kind: '史载', n: 150 },
      { label: '蒙古军', value: '无确载', kind: '无确载', n: null },
      { label: '战场', value: '三峰山', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { sanfengshan: 0.34 },
    markers: [
      { type: 'host', side: 'jin', x: 238, y: 230, t: 0.30, name: '完颜合达', lx: 252, ly: 224, anchor: 'start' },
      { type: 'host', side: 'jin', x: 226, y: 244, t: 0.34, name: '移剌蒲阿', lx: 212, ly: 238, anchor: 'end', weak: true },
      { type: 'host', side: 'meng', x: 214, y: 250, t: 0.02, name: '拖雷', lx: 200, ly: 244, anchor: 'end' }
    ],
    routes: [
      { d: 'M 276 196 C 264 210 252 222 244 230', side: 'jin', t0: 0.10, t1: 0.54,
        label: '金军南下', lx: 272, ly: 214, anchor: 'end' }
    ]
  },
  {
    label: '三峰山决战', seal: '决战',
    kicker: '阶段三 · 1232 年',
    title: '三峰山决战，金军大溃',
    turn: '蒙古军合击金军于三峰山，金军饥疲不堪，阵势崩溃；完颜合达、移剌蒲阿突围而走，主力尽丧。',
    why: '金军以疲惫之师被诱入不利地形，蒙古军以逸待劳一举击破；此战之后金国再无野战之力。',
    src: '《金史·完颜合达传》《移剌蒲阿传》；《元史·拖雷传》《速不台传》。',
    events: [
      { time: '1232', who: '蒙古军', text: '合击金军于三峰山', t: 0.08 },
      { time: '1232', who: '金军', text: '饥疲，阵势崩溃', t: 0.34, kind: 'flip', city: 'sanfengshan' },
      { time: '1232', who: '完颜合达', text: '突围而走', t: 0.58 },
      { time: '1232', who: '金军', text: '主力尽丧', t: 0.84 }
    ],
    nums: [
      { label: '金军', value: '十五万', kind: '史载', n: 150 },
      { label: '蒙古军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '金军大溃', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { sanfengshan: 0.34 },
    sieges: [
      { x: 214, y: 250, t: 0.34, label: '金军溃', side: 'meng', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'meng', x: 214, y: 250, t: 0.30, name: '拖雷', lx: 200, ly: 262, anchor: 'end' },
      { type: 'host', side: 'jin', x: 238, y: 230, t: 0.02, name: '完颜合达', lx: 252, ly: 224, anchor: 'start', weak: true },
      { type: 'army', side: 'meng', x: 226, y: 258, t: 0.34, name: '蒙古军', lx: 240, ly: 266, anchor: 'start' }
    ],
    routes: [
      { d: 'M 240 236 C 232 242 224 246 218 248', side: 'meng', t0: 0.28, t1: 0.60,
        label: '合击', lx: 242, ly: 250, anchor: 'start' }
    ]
  },
  {
    label: '进逼汴京', seal: '临城',
    kicker: '阶段四 · 1232 年',
    title: '蒙古军破钧州，进逼汴京',
    turn: '蒙古军乘胜破钧州，完颜合达战死；蒙古军进逼汴京，金廷震动，汴京戒严。',
    why: '三峰山一战金军野战主力尽失，汴京失去屏障；金国自此只能困守孤城。',
    src: '《金史·完颜合达传》《哀宗本纪》；《元史·太宗本纪》。',
    events: [
      { time: '1232', who: '蒙古军', text: '破钧州', t: 0.08, kind: 'flip', city: 'junzhou' },
      { time: '1232', who: '完颜合达', text: '战死', t: 0.34 },
      { time: '1232', who: '蒙古军', text: '进逼汴京', t: 0.58, kind: 'flip', city: 'bianjing' },
      { time: '1232', who: '金廷', text: '汴京戒严', t: 0.84 }
    ],
    nums: [
      { label: '金军', value: '十五万', kind: '史载', n: 150 },
      { label: '蒙古军', value: '无确载', kind: '无确载', n: null },
      { label: '汴京', value: '戒严', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { junzhou: 0.08, bianjing: 0.58 },
    markers: [
      { type: 'host', side: 'meng', x: 280, y: 190, t: 0.34, name: '拖雷', lx: 266, ly: 202, anchor: 'end' },
      { type: 'host', side: 'jin', x: 280, y: 190, t: 0.02, name: '金廷', lx: 294, ly: 184, anchor: 'start', weak: true },
      { type: 'army', side: 'meng', x: 252, y: 216, t: 0.20, name: '蒙古军', lx: 238, ly: 210, anchor: 'end' }
    ],
    routes: [
      { d: 'M 218 246 C 238 232 258 212 274 196', side: 'meng', t0: 0.10, t1: 0.54,
        label: '进逼汴京', lx: 240, ly: 208, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 288 C 60 282 120 292 180 286 C 240 280 300 274 385 278', color: '#a8b6ab', width: 2.6 },
    { d: 'M 150 220 C 180 240 210 258 240 274', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 118 74 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 286 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 330 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 318 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 30, y: 284, t: '淮　水', size: 8.5, color: '#46594f', ls: 2, serif: true },
    { x: 150, y: 226, t: '伏牛山', size: 9, color: '#46594f', ls: 3, serif: true, rotate: 34 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '三峰山·今河南禹州西南　钧州·今河南禹州　邓州·今河南邓州', size: 6.6, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '河　南', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'sanfengshan',
  title: '三峰山之战',
  kicker: '沙 盘 推 演',
  subtitle: '邓州 · 三峰山',
  years: '1232',
  yearUnit: 'AD',
  era: '蒙古 · 太宗四年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：三峰山今河南禹州西南、钧州今河南禹州，非真实地理比例',
  hook: '拖雷借道宋境，三峰山一战尽歼金军十五万，旋进逼汴京',
  period: '蒙金',
  yearValue: 1232,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '蒙古', b: '胜', sub: '1232' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
