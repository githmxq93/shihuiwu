/**
 * 沙盘推演 · 松锦之战（1640–1642）
 * 通行叙事：清军围锦州，明廷命洪承畴率八总兵援锦；明军屯松山，清军断其饷道；
 * 松山决战明军大溃，洪承畴被俘降清，锦州、塔山、杏山相继下。
 * 明军「号十三万」为史载；清军兵力无确载。
 * 地名古今对照：松山今辽宁锦州南、锦州今辽宁锦州、宁远今辽宁兴城。
 */
var COLOR = { qing: '#2b5262', ming: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'shenyang',    name: '沈阳',   x: 290, y: 88,  tx: 290, ty: 74,  anchor: 'middle' },
  { id: 'jinzhou',     name: '锦州',   x: 252, y: 140, tx: 252, ty: 126, anchor: 'middle' },
  { id: 'songshan',    name: '松山',   x: 236, y: 160, tx: 222, ty: 154, anchor: 'end' },
  { id: 'tashan',      name: '塔山',   x: 232, y: 198, tx: 246, ty: 206, anchor: 'start' },
  { id: 'ningyuan',    name: '宁远',   x: 208, y: 220, tx: 194, ty: 228, anchor: 'end' },
  { id: 'shanhaiguan', name: '山海关', x: 176, y: 252, tx: 162, ty: 260, anchor: 'end' }
];

var BASE0 = { shenyang: 'qing', jinzhou: 'ming', songshan: 'ming', tashan: 'ming', ningyuan: 'ming', shanhaiguan: 'ming' };
var BASE1 = { shenyang: 'qing', jinzhou: 'contested', songshan: 'ming', tashan: 'ming', ningyuan: 'ming', shanhaiguan: 'ming' };
var BASE2 = { shenyang: 'qing', jinzhou: 'contested', songshan: 'contested', tashan: 'ming', ningyuan: 'ming', shanhaiguan: 'ming' };
var BASE3 = { shenyang: 'qing', jinzhou: 'contested', songshan: 'qing', tashan: 'contested', ningyuan: 'ming', shanhaiguan: 'ming' };
var BASE4 = { shenyang: 'qing', jinzhou: 'qing', songshan: 'qing', tashan: 'qing', ningyuan: 'ming', shanhaiguan: 'ming' };

var STAGES = [
  {
    label: '清军围锦州', seal: '围城',
    kicker: '阶段一 · 1640 年',
    title: '清军筑垒，长围锦州',
    turn: '清军于锦州城外筑垒屯田，长围困之；明廷急调洪承畴率八总兵、号称十三万往援。',
    why: '锦州是关外重镇，清军意在围点打援；明军若救，便要在不利地形上与清军决战。',
    src: '《清史稿·太宗本纪》《洪承畴传》；《明史·杨国柱传》。',
    events: [
      { time: '1640', who: '清军', text: '筑垒屯田，长围锦州', t: 0.08 },
      { time: '1640', who: '锦州', text: '被围', t: 0.34, kind: 'flip', city: 'jinzhou' },
      { time: '1640', who: '明廷', text: '命洪承畴往援', t: 0.58 },
      { time: '1640', who: '洪承畴', text: '率八总兵出关', t: 0.84 }
    ],
    nums: [
      { label: '明军', value: '号十三万', kind: '史载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '锦州', value: '被围', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { jinzhou: 0.34 },
    markers: [
      { type: 'host', side: 'qing', x: 290, y: 88, t: 0.02, name: '皇太极', lx: 304, ly: 82, anchor: 'start' },
      { type: 'host', side: 'ming', x: 252, y: 140, t: 0.02, name: '祖大寿', lx: 266, ly: 134, anchor: 'start', weak: true },
      { type: 'army', side: 'qing', x: 268, y: 116, t: 0.34, name: '清军', lx: 282, ly: 110, anchor: 'start' }
    ],
    routes: [
      { d: 'M 286 94 C 276 112 264 128 256 136', side: 'qing', t0: 0.10, t1: 0.52,
        label: '清军南下', lx: 284, ly: 118, anchor: 'start' }
    ]
  },
  {
    label: '明军屯松山', seal: '援锦',
    kicker: '阶段二 · 1641 年',
    title: '洪承畴率军至松山，与清军对峙',
    turn: '洪承畴率援军至松山，与清军对峙；诸将主张持重，监军催战，明军遂进逼锦州。',
    why: '明军兵力集中却行动迟疑，屯于松山一线；清军趁机截断其后方饷道。',
    src: '《清史稿·洪承畴传》；《明史·曹变蛟传》。',
    events: [
      { time: '1641', who: '洪承畴', text: '率军至松山', t: 0.08, kind: 'flip', city: 'songshan' },
      { time: '1641', who: '明军', text: '与清军对峙', t: 0.34 },
      { time: '1641', who: '清军', text: '截断明军饷道', t: 0.58 },
      { time: '1641', who: '明军', text: '进退失据', t: 0.84 }
    ],
    nums: [
      { label: '明军', value: '号十三万', kind: '史载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '饷道', value: '被断', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { songshan: 0.08 },
    markers: [
      { type: 'host', side: 'ming', x: 236, y: 160, t: 0.30, name: '洪承畴', lx: 222, ly: 154, anchor: 'end' },
      { type: 'host', side: 'qing', x: 268, y: 116, t: 0.02, name: '皇太极', lx: 282, ly: 110, anchor: 'start' },
      { type: 'army', side: 'ming', x: 226, y: 176, t: 0.34, name: '明军', lx: 212, ly: 170, anchor: 'end' }
    ],
    routes: [
      { d: 'M 240 156 C 246 146 254 134 260 124', side: 'ming', t0: 0.10, t1: 0.50,
        label: '明军进逼', lx: 228, ly: 142, anchor: 'end' }
    ]
  },
  {
    label: '松山决战', seal: '大溃',
    kicker: '阶段三 · 1641 年 八月',
    title: '清军夜袭，明军松山大溃',
    turn: '清军乘夜突袭明军营地，明军诸部大乱，争相突围；松山外围尽失，洪承畴退守孤城。',
    why: '明军诸镇各怀观望，一夜之间全线崩溃；松山一失，锦州便再无援军。',
    src: '《清史稿·太宗本纪》《洪承畴传》；《明史·曹变蛟传》。',
    events: [
      { time: '1641·八月', who: '清军', text: '乘夜突袭明营', t: 0.08 },
      { time: '1641·八月', who: '明军', text: '诸部大乱', t: 0.34 },
      { time: '1641·八月', who: '明军', text: '争相突围', t: 0.58, kind: 'flip', city: 'songshan' },
      { time: '1641·八月', who: '洪承畴', text: '退守松山孤城', t: 0.84 }
    ],
    nums: [
      { label: '明军', value: '号十三万', kind: '史载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '明军大溃', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { songshan: 0.58, tashan: 0.58 },
    sieges: [
      { x: 236, y: 160, t: 0.58, label: '明军溃', side: 'qing', lx: 12, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'qing', x: 236, y: 160, t: 0.30, name: '多尔衮', lx: 250, ly: 154, anchor: 'start' },
      { type: 'host', side: 'ming', x: 236, y: 160, t: 0.02, name: '洪承畴', lx: 222, ly: 166, anchor: 'end', weak: true },
      { type: 'army', side: 'qing', x: 248, y: 176, t: 0.34, name: '清军', lx: 262, ly: 170, anchor: 'start' }
    ],
    routes: [
      { d: 'M 242 168 C 240 166 238 164 238 162', side: 'qing', t0: 0.10, t1: 0.50,
        label: '夜袭', lx: 254, ly: 166, anchor: 'start' }
    ]
  },
  {
    label: '锦州归清', seal: '降清',
    kicker: '阶段四 · 1642 年',
    title: '松山城破，洪承畴降清，锦州下',
    turn: '松山城破，洪承畴被俘降清；祖大寿以锦州降，塔山、杏山相继失守。明军关外防线崩溃。',
    why: '松锦一败，明军关外精锐尽丧；此后山海关外只剩宁远一城，明清之势已成定局。',
    src: '《清史稿·洪承畴传》《祖大寿传》；《明史·庄烈帝本纪》。',
    events: [
      { time: '1642', who: '清军', text: '破松山', t: 0.08, kind: 'flip', city: 'songshan' },
      { time: '1642', who: '洪承畴', text: '被俘降清', t: 0.34 },
      { time: '1642', who: '祖大寿', text: '以锦州降', t: 0.58, kind: 'flip', city: 'jinzhou' },
      { time: '1642', who: '清军', text: '塔山、杏山相继下', t: 0.84, kind: 'flip', city: 'tashan' }
    ],
    nums: [
      { label: '明军', value: '号十三万', kind: '史载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '锦州', value: '降清', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { songshan: 0.08, jinzhou: 0.58, tashan: 0.84 },
    markers: [
      { type: 'host', side: 'qing', x: 252, y: 140, t: 0.58, name: '皇太极', lx: 266, ly: 134, anchor: 'start' },
      { type: 'host', side: 'ming', x: 236, y: 160, t: 0.02, name: '洪承畴', lx: 222, ly: 166, anchor: 'end', weak: true },
      { type: 'army', side: 'qing', x: 244, y: 150, t: 0.34, name: '清军', lx: 258, ly: 144, anchor: 'start' }
    ],
    routes: []
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 300 60 C 280 110 260 160 240 210 C 230 236 220 258 210 280', color: '#a8b6ab', width: 2 },
    { d: 'M 140 280 C 180 274 220 282 260 276 C 300 270 340 278 385 274', color: '#b6c3b6', width: 3 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 274, t: '渤　海', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '松山·今辽宁锦州南　锦州·今辽宁锦州　宁远·今辽宁兴城', size: 6.6, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '辽　西', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'songjin',
  title: '松锦之战',
  kicker: '沙 盘 推 演',
  subtitle: '锦州 · 松山',
  years: '1640–1642',
  yearUnit: 'AD',
  era: '明 · 崇祯十三至十五年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：松山今辽宁锦州南、锦州今辽宁锦州，非真实地理比例',
  hook: '清军围锦打援，松山决战明军大溃，洪承畴降清',
  period: '明清',
  yearValue: 1642,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '清', b: '胜', sub: '1642' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
