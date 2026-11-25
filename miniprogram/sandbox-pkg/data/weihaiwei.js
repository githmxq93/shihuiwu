/**
 * 沙盘推演 · 威海卫之战（1895）
 * 通行叙事：日军自荣成湾登陆，攻威海卫；北洋舰队困守刘公岛，
 * 陆路炮台尽失，日军海陆夹攻；丁汝昌拒降自尽，北洋舰队覆没。
 * 双方兵力无确载；「丁汝昌自尽」「北洋舰队覆没」为史载。
 * 地名古今对照：威海卫今山东威海、刘公岛今山东威海刘公岛、荣成今山东荣成。
 */
var COLOR = { beiyang: '#2b5262', japan: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'lvshun',     name: '旅顺',   x: 210, y: 130, tx: 196, ty: 124, anchor: 'end' },
  { id: 'rongcheng',  name: '荣成',   x: 268, y: 158, tx: 282, ty: 152, anchor: 'start' },
  { id: 'weihaiwei',  name: '威海卫', x: 238, y: 180, tx: 224, ty: 174, anchor: 'end' },
  { id: 'liugongdao', name: '刘公岛', x: 256, y: 188, tx: 270, ty: 196, anchor: 'start' },
  { id: 'yantai',     name: '烟台',   x: 274, y: 200, tx: 288, ty: 208, anchor: 'start' }
];

var BASE0 = { lvshun: 'japan', rongcheng: 'beiyang', weihaiwei: 'beiyang', liugongdao: 'beiyang', yantai: 'beiyang' };
var BASE1 = { lvshun: 'japan', rongcheng: 'japan', weihaiwei: 'beiyang', liugongdao: 'beiyang', yantai: 'beiyang' };
var BASE2 = { lvshun: 'japan', rongcheng: 'japan', weihaiwei: 'contested', liugongdao: 'beiyang', yantai: 'beiyang' };
var BASE3 = { lvshun: 'japan', rongcheng: 'japan', weihaiwei: 'japan', liugongdao: 'contested', yantai: 'beiyang' };
var BASE4 = { lvshun: 'japan', rongcheng: 'japan', weihaiwei: 'japan', liugongdao: 'japan', yantai: 'contested' };

var STAGES = [
  {
    label: '日军登陆荣成', seal: '登陆',
    kicker: '阶段一 · 1895 年 一月',
    title: '日军自荣成湾登陆',
    turn: '日军避开威海卫正面，自荣成湾登陆，抄袭威海卫后路；清军陆上防线仓促应战。',
    why: '威海卫的防御重心在海上，后路陆防薄弱；日军选择从陆上迂回，正是攻其软肋。',
    src: '《清史稿·海军志》；《中日战争》档案。',
    events: [
      { time: '1895·一月', who: '日军', text: '自荣成湾登陆', t: 0.08, kind: 'flip', city: 'rongcheng' },
      { time: '1895·一月', who: '日军', text: '抄袭威海卫后路', t: 0.34 },
      { time: '1895·一月', who: '清军', text: '陆上防线仓促应战', t: 0.58 },
      { time: '1895·一月', who: '日军', text: '进逼威海卫', t: 0.84 }
    ],
    nums: [
      { label: '日军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '登陆点', value: '荣成湾', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { rongcheng: 0.08 },
    markers: [
      { type: 'host', side: 'japan', x: 268, y: 158, t: 0.30, name: '日军', lx: 282, ly: 152, anchor: 'start' },
      { type: 'host', side: 'beiyang', x: 238, y: 180, t: 0.02, name: '丁汝昌', lx: 224, ly: 174, anchor: 'end' },
      { type: 'army', side: 'japan', x: 256, y: 170, t: 0.34, name: '日军', lx: 270, ly: 164, anchor: 'start' }
    ],
    routes: [
      { d: 'M 264 162 C 256 168 248 174 242 178', side: 'japan', t0: 0.10, t1: 0.54,
        label: '抄袭后路', lx: 268, ly: 176, anchor: 'start' }
    ]
  },
  {
    label: '陆路炮台失守', seal: '夹攻',
    kicker: '阶段二 · 1895 年 一月',
    title: '日军攻占陆路炮台',
    turn: '日军攻占威海卫南北两岸陆路炮台，反以清军火炮轰击港内北洋舰艇；北洋舰队陷入海陆夹攻。',
    why: '陆路炮台一失，港内舰艇便成瓮中之鳖；这是威海卫防御体系最致命的漏洞。',
    src: '《清史稿·海军志》；《中日战争》档案。',
    events: [
      { time: '1895·一月', who: '日军', text: '攻占南北陆路炮台', t: 0.08, kind: 'flip', city: 'weihaiwei' },
      { time: '1895·一月', who: '日军', text: '以清军火炮轰击港内', t: 0.34 },
      { time: '1895·一月', who: '北洋舰队', text: '陷入海陆夹攻', t: 0.58 },
      { time: '1895·一月', who: '北洋舰队', text: '困守刘公岛', t: 0.84 }
    ],
    nums: [
      { label: '日军', value: '无确载', kind: '无确载', n: null },
      { label: '北洋舰队', value: '无确载', kind: '无确载', n: null },
      { label: '炮台', value: '失守', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { weihaiwei: 0.08 },
    markers: [
      { type: 'host', side: 'japan', x: 238, y: 180, t: 0.30, name: '日军', lx: 252, ly: 174, anchor: 'start' },
      { type: 'host', side: 'beiyang', x: 256, y: 188, t: 0.02, name: '丁汝昌', lx: 270, ly: 182, anchor: 'start', weak: true },
      { type: 'army', side: 'japan', x: 248, y: 168, t: 0.34, name: '日军', lx: 262, ly: 162, anchor: 'start' }
    ],
    routes: [
      { d: 'M 244 176 C 248 180 252 184 254 186', side: 'japan', t0: 0.10, t1: 0.50,
        label: '夹攻', lx: 236, ly: 190, anchor: 'end' }
    ]
  },
  {
    label: '威海卫陷落', seal: '孤岛',
    kicker: '阶段三 · 1895 年 二月',
    title: '威海卫陷落，刘公岛孤立',
    turn: '威海卫城陷落，刘公岛成为孤岛；日军水陆合围，北洋舰队多次突围未成。',
    why: '刘公岛是北洋舰队最后的基地，岛失则舰队无所依托；困守只能待毙。',
    src: '《清史稿·海军志》；《中日战争》档案。',
    events: [
      { time: '1895·二月', who: '日军', text: '攻陷威海卫城', t: 0.08, kind: 'flip', city: 'weihaiwei' },
      { time: '1895·二月', who: '刘公岛', text: '成为孤岛', t: 0.34 },
      { time: '1895·二月', who: '日军', text: '水陆合围', t: 0.58, kind: 'flip', city: 'liugongdao' },
      { time: '1895·二月', who: '北洋舰队', text: '多次突围未成', t: 0.84 }
    ],
    nums: [
      { label: '日军', value: '无确载', kind: '无确载', n: null },
      { label: '北洋舰队', value: '无确载', kind: '无确载', n: null },
      { label: '刘公岛', value: '孤立', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { weihaiwei: 0.08, liugongdao: 0.58 },
    markers: [
      { type: 'host', side: 'japan', x: 238, y: 180, t: 0.02, name: '日军', lx: 224, ly: 174, anchor: 'end' },
      { type: 'host', side: 'beiyang', x: 256, y: 188, t: 0.30, name: '丁汝昌', lx: 242, ly: 198, anchor: 'end' },
      { type: 'army', side: 'japan', x: 248, y: 196, t: 0.58, name: '日本舰队', lx: 262, ly: 202, anchor: 'start' }
    ],
    routes: [
      { d: 'M 246 186 C 250 186 252 186 254 186', side: 'japan', t0: 0.52, t1: 0.78,
        label: '合围', lx: 246, ly: 178, anchor: 'middle' }
    ]
  },
  {
    label: '北洋覆没', seal: '覆没',
    kicker: '阶段四 · 1895 年 二月',
    title: '丁汝昌自尽，北洋舰队覆没',
    turn: '刘公岛守军力竭，丁汝昌拒降自尽；北洋舰队残舰降于日军，威海卫之战结束。',
    why: '北洋舰队覆没，标志着洋务运动三十年经营的近代海军毁于一旦；甲午战局再无转圜。',
    src: '《清史稿·丁汝昌传》《海军志》；《中日战争》档案。',
    events: [
      { time: '1895·二月', who: '刘公岛', text: '守军力竭', t: 0.08 },
      { time: '1895·二月', who: '丁汝昌', text: '拒降自尽', t: 0.34 },
      { time: '1895·二月', who: '北洋舰队', text: '残舰降于日军', t: 0.58, kind: 'flip', city: 'liugongdao' },
      { time: '1895·二月', who: '烟台', text: '震动', t: 0.84, kind: 'flip', city: 'yantai' }
    ],
    nums: [
      { label: '日军', value: '无确载', kind: '无确载', n: null },
      { label: '北洋舰队', value: '无确载', kind: '无确载', n: null },
      { label: '北洋舰队', value: '覆没', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { liugongdao: 0.58, yantai: 0.84 },
    markers: [
      { type: 'host', side: 'japan', x: 256, y: 188, t: 0.30, name: '日军', lx: 270, ly: 182, anchor: 'start' },
      { type: 'host', side: 'beiyang', x: 256, y: 188, t: 0.02, name: '丁汝昌', lx: 242, ly: 194, anchor: 'end', weak: true },
      { type: 'army', side: 'japan', x: 266, y: 196, t: 0.34, name: '日本舰队', lx: 280, ly: 202, anchor: 'start' }
    ],
    routes: []
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 190 100 C 210 140 230 180 250 220 C 260 240 268 256 276 276', color: '#a8b6ab', width: 2 },
    { d: 'M 160 300 C 200 294 240 302 280 296 C 320 290 350 298 385 294', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 310 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 40, y: 260, t: '黄　海', size: 10, color: '#46594f', ls: 6, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '威海卫·今山东威海　刘公岛·今山东威海刘公岛　荣成·今山东荣成', size: 6.2, color: '#7d6647', ls: 0.3 },
    { x: 24, y: 366, t: '胶　东', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'weihaiwei',
  title: '威海卫之战',
  kicker: '沙 盘 推 演',
  subtitle: '荣成 · 威海卫',
  years: '1895',
  yearUnit: 'AD',
  era: '清 · 光绪二十一年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：威海卫今山东威海、刘公岛今山东威海刘公岛，非真实地理比例',
  hook: '日军海陆夹攻威海卫，丁汝昌拒降自尽，北洋舰队覆没',
  period: '清',
  yearValue: 1895,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '日本', b: '胜', sub: '1895' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
