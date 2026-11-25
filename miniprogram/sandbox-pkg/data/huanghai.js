/**
 * 沙盘推演 · 黄海海战（1894）
 * 通行叙事：北洋舰队护送运兵船至大东沟，返航时遭日本联合舰队袭击；
 * 两军激战于黄海，北洋舰队损失致远、经远等舰，退往旅顺；日军掌握黄海制海权。
 * 双方舰数、吨位有史载，此处从简；「致远沉没」「邓世昌殉国」为史载。
 * 地名古今对照：大东沟今辽宁东港附近、旅顺今辽宁大连旅顺口、威海卫今山东威海。
 */
var COLOR = { beiyang: '#2b5262', japan: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'yalu',      name: '鸭绿江口', x: 282, y: 96,  tx: 282, ty: 82,  anchor: 'middle' },
  { id: 'dadonggou', name: '大东沟',   x: 260, y: 116, tx: 246, ty: 110, anchor: 'end' },
  { id: 'dalian',    name: '大连',     x: 228, y: 152, tx: 214, ty: 146, anchor: 'end' },
  { id: 'lvshun',    name: '旅顺',     x: 214, y: 132, tx: 200, ty: 126, anchor: 'end' },
  { id: 'weihaiwei', name: '威海卫',   x: 232, y: 188, tx: 246, ty: 196, anchor: 'start' }
];

var BASE0 = { yalu: 'beiyang', dadonggou: 'beiyang', dalian: 'beiyang', lvshun: 'beiyang', weihaiwei: 'beiyang' };
var BASE1 = { yalu: 'beiyang', dadonggou: 'contested', dalian: 'beiyang', lvshun: 'beiyang', weihaiwei: 'beiyang' };
var BASE3 = { yalu: 'beiyang', dadonggou: 'contested', dalian: 'beiyang', lvshun: 'contested', weihaiwei: 'beiyang' };
var BASE4 = { yalu: 'japan', dadonggou: 'japan', dalian: 'beiyang', lvshun: 'contested', weihaiwei: 'beiyang' };

var STAGES = [
  {
    label: '护航大东沟', seal: '护航',
    kicker: '阶段一 · 1894 年 九月',
    title: '北洋舰队护航至大东沟',
    turn: '北洋舰队护送运兵船至大东沟登陆，完成任务后准备返航；日本联合舰队已在外海搜索。',
    why: '黄海是北洋舰队的活动海域，一旦失去制海权，陆上战场便失去侧翼掩护。',
    src: '《清史稿·海军志》；《中日战争》档案。',
    events: [
      { time: '1894·九月', who: '北洋舰队', text: '护送运兵船至大东沟', t: 0.08, kind: 'flip', city: 'dadonggou' },
      { time: '1894·九月', who: '北洋舰队', text: '完成登陆，准备返航', t: 0.34 },
      { time: '1894·九月', who: '日本联合舰队', text: '在外海搜索', t: 0.58 },
      { time: '1894·九月', who: '两军', text: '相遇于黄海', t: 0.84 }
    ],
    nums: [
      { label: '北洋舰队', value: '无确载', kind: '无确载', n: null },
      { label: '日本舰队', value: '无确载', kind: '无确载', n: null },
      { label: '海域', value: '黄海', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { dadonggou: 0.08 },
    markers: [
      { type: 'host', side: 'beiyang', x: 260, y: 116, t: 0.30, name: '丁汝昌', lx: 246, ly: 122, anchor: 'end' },
      { type: 'host', side: 'japan', x: 282, y: 96, t: 0.02, name: '伊东祐亨', lx: 296, ly: 90, anchor: 'start' },
      { type: 'army', side: 'beiyang', x: 272, y: 106, t: 0.34, name: '北洋舰队', lx: 286, ly: 100, anchor: 'start' }
    ],
    routes: [
      { d: 'M 276 100 C 272 104 268 108 264 112', side: 'japan', t0: 0.78, t1: 0.96,
        label: '日舰来袭', lx: 288, ly: 108, anchor: 'start' }
    ]
  },
  {
    label: '黄海激战', seal: '海战',
    kicker: '阶段二 · 1894 年 九月',
    title: '两军激战于黄海',
    turn: '两军舰队在黄海展开激战，炮火密集；北洋舰队阵形被日舰分割，各舰各自为战。',
    why: '日舰航速快、速射炮多，北洋舰队阵形一乱便难以协同；海战的胜负逐渐倾向日军。',
    src: '《清史稿·海军志》；《中日战争》档案。',
    events: [
      { time: '1894·九月', who: '两军舰队', text: '展开激战', t: 0.08 },
      { time: '1894·九月', who: '日本舰队', text: '分割北洋阵形', t: 0.34 },
      { time: '1894·九月', who: '北洋舰队', text: '各舰各自为战', t: 0.58 },
      { time: '1894·九月', who: '北洋舰队', text: '损失渐重', t: 0.84 }
    ],
    nums: [
      { label: '北洋舰队', value: '无确载', kind: '无确载', n: null },
      { label: '日本舰队', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '北洋受挫', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'beiyang', x: 260, y: 116, t: 0.02, name: '丁汝昌', lx: 246, ly: 110, anchor: 'end' },
      { type: 'host', side: 'japan', x: 282, y: 96, t: 0.30, name: '伊东祐亨', lx: 296, ly: 102, anchor: 'start' },
      { type: 'army', side: 'japan', x: 272, y: 108, t: 0.34, name: '日本舰队', lx: 286, ly: 114, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '致远沉没', seal: '殉国',
    kicker: '阶段三 · 1894 年 九月',
    title: '致远舰沉没，邓世昌殉国',
    turn: '致远舰重伤，管带邓世昌率舰冲向日舰，中雷沉没，全舰将士殉国；经远等舰亦相继沉没。',
    why: '北洋舰队损失多艘主力舰，士气与实力俱损；此后只能退守威海卫。',
    src: '《清史稿·邓世昌传》；《中日战争》档案。',
    events: [
      { time: '1894·九月', who: '致远舰', text: '重伤', t: 0.08 },
      { time: '1894·九月', who: '邓世昌', text: '率舰冲向日舰', t: 0.34 },
      { time: '1894·九月', who: '致远舰', text: '中雷沉没', t: 0.58 },
      { time: '1894·九月', who: '经远等舰', text: '相继沉没', t: 0.84, kind: 'flip', city: 'lvshun' }
    ],
    nums: [
      { label: '北洋舰队', value: '无确载', kind: '无确载', n: null },
      { label: '日本舰队', value: '无确载', kind: '无确载', n: null },
      { label: '邓世昌', value: '殉国', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { lvshun: 0.84 },
    markers: [
      { type: 'host', side: 'beiyang', x: 268, y: 108, t: 0.02, name: '邓世昌', lx: 254, ly: 102, anchor: 'end', weak: true },
      { type: 'host', side: 'japan', x: 282, y: 96, t: 0.30, name: '伊东祐亨', lx: 296, ly: 90, anchor: 'start' },
      { type: 'army', side: 'beiyang', x: 256, y: 122, t: 0.34, name: '北洋舰队', lx: 242, ly: 128, anchor: 'end' }
    ],
    routes: [
      { d: 'M 264 112 C 268 108 274 102 278 98', side: 'beiyang', t0: 0.30, t1: 0.58,
        label: '冲向日舰', lx: 252, ly: 118, anchor: 'end' }
    ]
  },
  {
    label: '退守威海', seal: '退守',
    kicker: '阶段四 · 1894 年 九月',
    title: '北洋舰队退往旅顺，日军掌握制海权',
    turn: '北洋舰队退往旅顺修理，黄海制海权落入日军之手；此后日军得以从海上运兵，进攻辽东与威海。',
    why: '制海权一失，北洋舰队便只能困守港内；甲午战争的败局由此奠定。',
    src: '《清史稿·海军志》；《中日战争》档案。',
    events: [
      { time: '1894·九月', who: '北洋舰队', text: '退往旅顺', t: 0.08 },
      { time: '1894·九月', who: '日本舰队', text: '掌握黄海制海权', t: 0.34, kind: 'flip', city: 'yalu' },
      { time: '1894·九月', who: '日军', text: '得以从海上运兵', t: 0.58 },
      { time: '1894·九月', who: '日军', text: '进逼辽东', t: 0.84, kind: 'flip', city: 'dadonggou' }
    ],
    nums: [
      { label: '北洋舰队', value: '无确载', kind: '无确载', n: null },
      { label: '日本舰队', value: '无确载', kind: '无确载', n: null },
      { label: '制海权', value: '归日', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { yalu: 0.34, dadonggou: 0.84 },
    markers: [
      { type: 'host', side: 'beiyang', x: 214, y: 132, t: 0.30, name: '丁汝昌', lx: 200, ly: 126, anchor: 'end' },
      { type: 'host', side: 'japan', x: 282, y: 96, t: 0.02, name: '伊东祐亨', lx: 296, ly: 90, anchor: 'start' },
      { type: 'army', side: 'beiyang', x: 240, y: 140, t: 0.34, name: '北洋舰队', lx: 226, ly: 134, anchor: 'end' }
    ],
    routes: [
      { d: 'M 254 122 C 240 126 226 130 216 132', side: 'retreat', t0: 0.10, t1: 0.54,
        label: '退往旅顺', lx: 250, ly: 138, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 320 120 C 300 160 280 200 260 240 C 250 258 244 274 240 300', color: '#a8b6ab', width: 2 },
    { d: 'M 160 300 C 200 294 240 302 280 296 C 320 290 350 298 385 294', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 310 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 40, y: 250, t: '黄　海', size: 10, color: '#46594f', ls: 6, serif: true },
    { x: 282, y: 70, t: '鸭 绿 江', size: 8, color: '#46594f', ls: 2, serif: true, rotate: -8 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '大东沟·今辽宁东港附近　旅顺·今辽宁大连旅顺口　威海卫·今山东威海', size: 6.2, color: '#7d6647', ls: 0.3 },
    { x: 24, y: 366, t: '辽　海', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'huanghai',
  title: '黄海海战',
  kicker: '沙 盘 推 演',
  subtitle: '大东沟 · 黄海',
  years: '1894',
  yearUnit: 'AD',
  era: '清 · 光绪二十年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：大东沟今辽宁东港附近、旅顺今辽宁大连旅顺口，非真实地理比例',
  hook: '北洋舰队大东沟遭遇日舰，致远沉没，邓世昌殉国，制海权归日',
  period: '清',
  yearValue: 1894,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '日本', b: '胜', sub: '1894' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
