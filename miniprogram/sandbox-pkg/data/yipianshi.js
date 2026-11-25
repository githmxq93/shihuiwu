/**
 * 沙盘推演 · 一片石之战（1644）
 * 通行叙事：李自成东征山海关，吴三桂拒守并遣使降清；
 * 多尔衮率清军入关，与吴三桂合击大顺军于一片石，大顺军大溃，李自成退回北京。
 * 大顺军「号二十万」为史载；清军与吴军兵力无确载。
 * 地名古今对照：山海关今河北秦皇岛山海关、一片石今河北秦皇岛东北、宁远今辽宁兴城。
 */
var COLOR = { shun: '#6f3a22', ming: '#2b5262', qing: '#4c5f3f', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'beijing',     name: '北京',   x: 246, y: 118, tx: 246, ty: 104, anchor: 'middle' },
  { id: 'shanhaiguan', name: '山海关', x: 276, y: 178, tx: 262, ty: 186, anchor: 'end' },
  { id: 'yipianshi',   name: '一片石', x: 294, y: 190, tx: 308, ty: 198, anchor: 'start' },
  { id: 'ningyuan',    name: '宁远',   x: 304, y: 146, tx: 318, ty: 140, anchor: 'start' },
  { id: 'shenyang',    name: '沈阳',   x: 330, y: 88,  tx: 330, ty: 74,  anchor: 'middle' }
];

var BASE0 = { beijing: 'shun', shanhaiguan: 'ming', yipianshi: 'ming', ningyuan: 'ming', shenyang: 'qing' };
var BASE1 = { beijing: 'shun', shanhaiguan: 'ming', yipianshi: 'contested', ningyuan: 'ming', shenyang: 'qing' };
var BASE3 = { beijing: 'shun', shanhaiguan: 'ming', yipianshi: 'qing', ningyuan: 'ming', shenyang: 'qing' };
var BASE4 = { beijing: 'contested', shanhaiguan: 'qing', yipianshi: 'qing', ningyuan: 'qing', shenyang: 'qing' };

var STAGES = [
  {
    label: '大顺东征', seal: '东征',
    kicker: '阶段一 · 1644 年 四月',
    title: '李自成东征山海关',
    turn: '李自成率大顺军自北京东征，直指山海关；吴三桂据关拒守，一面遣使向清军求援。',
    why: '山海关是关内外咽喉，吴三桂若降清，大顺军将腹背受敌；李自成必须抢在清军入关前拿下。',
    src: '《清史稿·世祖本纪》《吴三桂传》；《明史·李自成传》。',
    events: [
      { time: '1644·四月', who: '李自成', text: '率军自北京东征', t: 0.08 },
      { time: '1644·四月', who: '大顺军', text: '直指山海关', t: 0.34, kind: 'flip', city: 'yipianshi' },
      { time: '1644·四月', who: '吴三桂', text: '据关拒守', t: 0.58 },
      { time: '1644·四月', who: '吴三桂', text: '遣使向清军求援', t: 0.84 }
    ],
    nums: [
      { label: '大顺军', value: '号二十万', kind: '史载', n: null },
      { label: '吴军', value: '无确载', kind: '无确载', n: null },
      { label: '山海关', value: '咽喉', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { yipianshi: 0.34 },
    markers: [
      { type: 'host', side: 'shun', x: 246, y: 118, t: 0.02, name: '李自成', lx: 260, ly: 112, anchor: 'start' },
      { type: 'host', side: 'ming', x: 276, y: 178, t: 0.02, name: '吴三桂', lx: 262, ly: 172, anchor: 'end' },
      { type: 'army', side: 'shun', x: 262, y: 148, t: 0.34, name: '大顺军', lx: 276, ly: 142, anchor: 'start' }
    ],
    routes: [
      { d: 'M 250 126 C 258 140 268 158 274 172', side: 'shun', t0: 0.10, t1: 0.54,
        label: '东征', lx: 240, ly: 148, anchor: 'end' }
    ]
  },
  {
    label: '吴三桂降清', seal: '请兵',
    kicker: '阶段二 · 1644 年 四月',
    title: '吴三桂开关迎清军',
    turn: '多尔衮率清军急驰入关，吴三桂剃发降清；清、吴合兵，列阵于山海关与一片石之间。',
    why: '吴三桂的选择改变了三方力量对比；清军得以不经苦战便进入关内。',
    src: '《清史稿·世祖本纪》《多尔衮传》《吴三桂传》。',
    events: [
      { time: '1644·四月', who: '多尔衮', text: '率清军急驰入关', t: 0.08 },
      { time: '1644·四月', who: '吴三桂', text: '剃发降清', t: 0.34 },
      { time: '1644·四月', who: '清·吴联军', text: '列阵关前', t: 0.58 },
      { time: '1644·四月', who: '李自成', text: '督军猛攻', t: 0.84 }
    ],
    nums: [
      { label: '大顺军', value: '号二十万', kind: '史载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '吴三桂', value: '降清', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'qing', x: 304, y: 146, t: 0.30, name: '多尔衮', lx: 318, ly: 140, anchor: 'start' },
      { type: 'host', side: 'ming', x: 276, y: 178, t: 0.02, name: '吴三桂', lx: 262, ly: 172, anchor: 'end' },
      { type: 'host', side: 'shun', x: 294, y: 190, t: 0.02, name: '李自成', lx: 308, ly: 184, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 308 150 C 300 160 290 170 282 176', side: 'qing', t0: 0.10, t1: 0.50,
        label: '清军入关', lx: 312, ly: 164, anchor: 'start' }
    ]
  },
  {
    label: '一片石决战', seal: '决战',
    kicker: '阶段三 · 1644 年 四月',
    title: '清吴合击，大顺军一片石大溃',
    turn: '大顺军与吴三桂鏖战，清军自侧翼突袭；大顺军阵势崩溃，死者遍野，李自成退回北京。',
    why: '大顺军久战疲惫，清军以逸待劳一击而定；此战决定了关内的归属。',
    src: '《清史稿·世祖本纪》《多尔衮传》；《明史·李自成传》。',
    events: [
      { time: '1644·四月', who: '大顺军', text: '与吴军鏖战', t: 0.08 },
      { time: '1644·四月', who: '清军', text: '自侧翼突袭', t: 0.34 },
      { time: '1644·四月', who: '大顺军', text: '阵势崩溃', t: 0.58, kind: 'flip', city: 'yipianshi' },
      { time: '1644·四月', who: '李自成', text: '退回北京', t: 0.84 }
    ],
    nums: [
      { label: '大顺军', value: '号二十万', kind: '史载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '大顺军溃', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { yipianshi: 0.58 },
    sieges: [
      { x: 294, y: 190, t: 0.58, label: '大顺军溃', side: 'qing', lx: 12, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'qing', x: 294, y: 190, t: 0.30, name: '多尔衮', lx: 308, ly: 196, anchor: 'start' },
      { type: 'host', side: 'shun', x: 294, y: 190, t: 0.02, name: '李自成', lx: 280, ly: 184, anchor: 'end', weak: true },
      { type: 'army', side: 'qing', x: 306, y: 176, t: 0.34, name: '清军', lx: 320, ly: 170, anchor: 'start' }
    ],
    routes: [
      { d: 'M 302 182 C 298 186 296 188 296 190', side: 'qing', t0: 0.10, t1: 0.50,
        label: '侧击', lx: 314, ly: 182, anchor: 'start' }
    ]
  },
  {
    label: '清军入主', seal: '入关',
    kicker: '阶段四 · 1644 年 五月',
    title: '清军入关，李自成西走',
    turn: '清军与吴三桂追击，李自成弃北京西走；多尔衮入北京，清廷定鼎中原。',
    why: '一片石一战，清军以最小代价取得关内；此后南明与大顺各自为战，再难联合抗清。',
    src: '《清史稿·世祖本纪》《多尔衮传》；《明史·李自成传》。',
    events: [
      { time: '1644·五月', who: '清·吴联军', text: '追击大顺军', t: 0.08 },
      { time: '1644·五月', who: '李自成', text: '弃北京西走', t: 0.34, kind: 'flip', city: 'beijing' },
      { time: '1644·五月', who: '多尔衮', text: '入北京', t: 0.58 },
      { time: '1644·五月', who: '清廷', text: '定鼎中原', t: 0.84, kind: 'flip', city: 'shanhaiguan' }
    ],
    nums: [
      { label: '大顺军', value: '号二十万', kind: '史载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '北京', value: '归清', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { beijing: 0.34, shanhaiguan: 0.84 },
    markers: [
      { type: 'host', side: 'qing', x: 246, y: 118, t: 0.58, name: '多尔衮', lx: 260, ly: 112, anchor: 'start' },
      { type: 'host', side: 'shun', x: 246, y: 118, t: 0.02, name: '李自成', lx: 232, ly: 112, anchor: 'end', weak: true },
      { type: 'army', side: 'qing', x: 264, y: 140, t: 0.34, name: '清军', lx: 278, ly: 134, anchor: 'start' }
    ],
    routes: []
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 300 60 C 292 110 284 160 278 210 C 274 238 270 260 266 280', color: '#a8b6ab', width: 2 },
    { d: 'M 140 280 C 180 274 220 282 260 276 C 300 270 340 278 385 274', color: '#b6c3b6', width: 3 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 320 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 274, t: '渤　海', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 190, y: 190, t: '燕 山', size: 9, color: '#46594f', ls: 3, serif: true, rotate: 16 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '山海关·今河北秦皇岛山海关　一片石·今河北秦皇岛东北　宁远·今辽宁兴城', size: 6.2, color: '#7d6647', ls: 0.3 },
    { x: 24, y: 366, t: '燕　辽', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'yipianshi',
  title: '一片石之战',
  kicker: '沙 盘 推 演',
  subtitle: '山海关 · 一片石',
  years: '1644',
  yearUnit: 'AD',
  era: '明末 · 崇祯十七年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：山海关今河北秦皇岛山海关、一片石今河北秦皇岛东北，非真实地理比例',
  hook: '吴三桂降清，清吴合击一片石，大顺军溃，清军入关',
  period: '明清',
  yearValue: 1644,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '清', b: '入关', sub: '1644' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
