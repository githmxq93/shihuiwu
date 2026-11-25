/**
 * 沙盘推演 · 睢阳之战（757）
 * 通行叙事：张巡守雍丘，后与许远合守睢阳；尹子奇率叛军十余万围城，
 * 张巡苦守十月，城中食尽，城破，张巡、许远等死节。
 * 叛军「十余万」、守城「十月」为史载；守军兵力无确载。
 * 地名古今对照：睢阳今河南商丘、雍丘今河南杞县、汴州今河南开封。
 */
var COLOR = { tang: '#2b5262', yan: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'luoyang',  name: '洛阳', x: 108, y: 118, tx: 108, ty: 104, anchor: 'middle' },
  { id: 'bianzhou', name: '汴州', x: 178, y: 176, tx: 164, ty: 170, anchor: 'end' },
  { id: 'yongqiu',  name: '雍丘', x: 212, y: 204, tx: 198, ty: 198, anchor: 'end' },
  { id: 'suiyang',  name: '睢阳', x: 248, y: 238, tx: 248, ty: 254, anchor: 'middle' },
  { id: 'pengcheng', name: '彭城', x: 312, y: 246, tx: 312, ty: 262, anchor: 'middle' }
];

var BASE0 = { luoyang: 'yan', bianzhou: 'yan', yongqiu: 'tang', suiyang: 'tang', pengcheng: 'tang' };
var BASE1 = { luoyang: 'yan', bianzhou: 'yan', yongqiu: 'contested', suiyang: 'tang', pengcheng: 'tang' };
var BASE2 = { luoyang: 'yan', bianzhou: 'yan', yongqiu: 'yan', suiyang: 'contested', pengcheng: 'tang' };
var BASE3 = { luoyang: 'yan', bianzhou: 'yan', yongqiu: 'yan', suiyang: 'contested', pengcheng: 'tang' };
var BASE4 = { luoyang: 'yan', bianzhou: 'yan', yongqiu: 'yan', suiyang: 'yan', pengcheng: 'tang' };

var STAGES = [
  {
    label: '守雍丘', seal: '死守',
    kicker: '阶段一 · 756 年 冬',
    title: '张巡守雍丘，屡挫叛军',
    turn: '张巡率众守雍丘，叛军令狐潮率众数万围城；张巡以草人借箭、夜袭敌营，大小数十战，雍丘始终不下。',
    why: '雍丘扼汴渠要道，守住此城，叛军便不能顺畅南下江淮。',
    src: '《旧唐书·张巡传》；《资治通鉴》卷二百一十九。「草人借箭」为史载。',
    events: [
      { time: '756·冬', who: '张巡', text: '率众守雍丘', t: 0.08 },
      { time: '756·冬', who: '令狐潮', text: '率众数万围城', t: 0.34, kind: 'flip', city: 'yongqiu' },
      { time: '756·冬', who: '张巡', text: '草人借箭，夜袭敌营', t: 0.58 },
      { time: '756·冬', who: '唐军', text: '大小数十战，城不下', t: 0.84 }
    ],
    nums: [
      { label: '叛军', value: '数万', kind: '史载', n: null },
      { label: '守军', value: '无确载', kind: '无确载', n: null },
      { label: '雍丘', value: '不下', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { yongqiu: 0.34 },
    markers: [
      { type: 'host', side: 'tang', x: 212, y: 204, t: 0.02, name: '张巡', lx: 198, ly: 216, anchor: 'end' },
      { type: 'host', side: 'yan', x: 178, y: 176, t: 0.02, name: '令狐潮', lx: 164, ly: 170, anchor: 'end' },
      { type: 'army', side: 'yan', x: 194, y: 190, t: 0.34, name: '叛军', lx: 180, ly: 184, anchor: 'end' }
    ],
    routes: [
      { d: 'M 182 180 C 192 188 202 196 208 202', side: 'yan', t0: 0.26, t1: 0.62,
        label: '叛军进围', lx: 176, ly: 196, anchor: 'end' }
    ]
  },
  {
    label: '退守睢阳', seal: '合守',
    kicker: '阶段二 · 757 年 正月',
    title: '张巡弃雍丘，与许远合守睢阳',
    turn: '雍丘势孤，张巡率众东至睢阳，与太守许远合兵；叛军尹子奇率十余万来攻，张巡、许远分城而守。',
    why: '睢阳是江淮屏障，守住睢阳，就守住了唐廷财赋所出的东南半壁。',
    src: '《旧唐书·张巡传》《许远传》；《资治通鉴》卷二百二十。「十余万」为史载。',
    events: [
      { time: '757·正月', who: '张巡', text: '弃雍丘，东至睢阳', t: 0.08, kind: 'flip', city: 'yongqiu' },
      { time: '757·正月', who: '张巡·许远', text: '合兵守睢阳', t: 0.34 },
      { time: '757·正月', who: '尹子奇', text: '率十余万来攻', t: 0.58, kind: 'flip', city: 'suiyang' },
      { time: '757·正月', who: '唐军', text: '分城而守', t: 0.84 }
    ],
    nums: [
      { label: '叛军', value: '十余万', kind: '史载', n: 100 },
      { label: '守军', value: '无确载', kind: '无确载', n: null },
      { label: '睢阳', value: '被围', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { yongqiu: 0.08, suiyang: 0.58 },
    markers: [
      { type: 'host', side: 'tang', x: 248, y: 238, t: 0.34, name: '张巡', lx: 234, ly: 232, anchor: 'end' },
      { type: 'host', side: 'tang', x: 248, y: 238, t: 0.34, name: '许远', lx: 262, ly: 226, anchor: 'start' },
      { type: 'host', side: 'yan', x: 212, y: 204, t: 0.02, name: '尹子奇', lx: 198, ly: 198, anchor: 'end' }
    ],
    routes: [
      { d: 'M 216 210 C 226 220 238 230 244 236', side: 'tang', t0: 0.06, t1: 0.40,
        label: '张巡东守', lx: 214, ly: 228, anchor: 'end' },
      { d: 'M 216 210 C 228 218 240 226 246 234', side: 'yan', t0: 0.56, t1: 0.90,
        label: '叛军进围', lx: 244, ly: 208, anchor: 'start' }
    ]
  },
  {
    label: '睢阳苦守', seal: '食尽',
    kicker: '阶段三 · 757 年 夏秋',
    title: '城中食尽，张巡苦守十月',
    turn: '叛军昼夜攻城，张巡以奇计屡破之；城中粮尽，食茶纸、马、雀鼠，士卒饿死殆尽，而城终不降。',
    why: '睢阳每多守一日，江淮便多一日之安；张巡以孤城牵制叛军主力十余万。',
    src: '《旧唐书·张巡传》；《资治通鉴》卷二百二十。「食茶纸」「罗雀掘鼠」为史载。',
    events: [
      { time: '757', who: '尹子奇', text: '昼夜攻城', t: 0.08 },
      { time: '757', who: '张巡', text: '以奇计屡破之', t: 0.34 },
      { time: '757', who: '守军', text: '粮尽，食茶纸、雀鼠', t: 0.58 },
      { time: '757', who: '守军', text: '饿死殆尽，城犹不降', t: 0.84 }
    ],
    nums: [
      { label: '叛军', value: '十余万', kind: '史载', n: 100 },
      { label: '守城', value: '十月', kind: '史载', n: null },
      { label: '守军', value: '饿死殆尽', kind: '史载', n: null }
    ],
    hold: BASE3,
    markers: [
      { type: 'host', side: 'tang', x: 248, y: 238, t: 0.02, name: '张巡', lx: 234, ly: 232, anchor: 'end', weak: true },
      { type: 'host', side: 'yan', x: 212, y: 204, t: 0.02, name: '尹子奇', lx: 198, ly: 198, anchor: 'end' },
      { type: 'army', side: 'yan', x: 232, y: 220, t: 0.34, name: '叛军', lx: 240, ly: 212, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '城破死节', seal: '城破',
    kicker: '阶段四 · 757 年 十月',
    title: '睢阳城破，张巡、许远死节',
    turn: '睢阳城破，张巡、许远被俘，不屈而死；城破三日后，唐援军至，叛军已去。睢阳虽陷，江淮得以保全。',
    why: '睢阳以孤城拖住叛军十月，唐廷得以保全江淮财赋，为最终平叛留下根基。',
    src: '《旧唐书·张巡传》《许远传》；《资治通鉴》卷二百二十。',
    events: [
      { time: '757·十月', who: '叛军', text: '攻破睢阳', t: 0.08, kind: 'flip', city: 'suiyang' },
      { time: '757·十月', who: '张巡·许远', text: '被俘不屈而死', t: 0.34 },
      { time: '757·十月', who: '唐援军', text: '三日后至，叛军已去', t: 0.58 },
      { time: '757·十月', who: '唐', text: '江淮得以保全', t: 0.84 }
    ],
    nums: [
      { label: '叛军', value: '十余万', kind: '史载', n: 100 },
      { label: '守城', value: '十月', kind: '史载', n: null },
      { label: '睢阳', value: '城破', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { suiyang: 0.08 },
    sieges: [
      { x: 248, y: 238, t: 0.08, label: '城破', side: 'yan', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'yan', x: 248, y: 238, t: 0.30, name: '尹子奇', lx: 262, ly: 232, anchor: 'start' },
      { type: 'host', side: 'tang', x: 248, y: 238, t: 0.02, name: '张巡', lx: 234, ly: 226, anchor: 'end', weak: true },
      { type: 'army', side: 'tang', x: 290, y: 246, t: 0.58, name: '唐援军', lx: 304, ly: 240, anchor: 'start' }
    ],
    routes: [
      { d: 'M 308 246 C 290 244 272 242 256 240', side: 'tang', t0: 0.54, t1: 0.88,
        label: '援军来迟', lx: 286, ly: 256, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 30 40 C 60 110 90 170 130 230 C 152 262 164 300 170 386', color: '#a8b6ab', width: 2.6 },
    { d: 'M -10 286 C 80 280 160 288 240 282 C 300 278 350 282 385 286', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 100 60 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 230 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 330 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 330 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 40, y: 158, t: '汴　渠', size: 9, color: '#46594f', ls: 2, serif: true, rotate: 62 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '睢阳·今河南商丘　雍丘·今河南杞县　汴州·今河南开封', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '河　南', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'suiyang',
  title: '睢阳之战',
  kicker: '沙 盘 推 演',
  subtitle: '雍丘 · 睢阳',
  years: '757',
  yearUnit: 'AD',
  era: '唐 · 至德二载',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：睢阳今河南商丘、雍丘今河南杞县，非真实地理比例',
  hook: '张巡、许远以孤城守睢阳十月，食尽城破，保全江淮',
  period: '隋唐',
  yearValue: 757,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '燕', b: '破', sub: '757' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
