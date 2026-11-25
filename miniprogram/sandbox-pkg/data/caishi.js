/**
 * 沙盘推演 · 采石之战（1161）
 * 通行叙事：金主完颜亮南侵，渡淮取和州；宋军溃退，虞允文至采石督师，
 * 率水军以海鳅船冲击金军小舟，金军大败；旋完颜亮被部下所弑，金军北退。
 * 金军「号六十万」为史载；宋军兵力无确载。
 * 地名古今对照：采石今安徽马鞍山采石矶、和州今安徽和县、建康今江苏南京。
 */
var COLOR = { song: '#2b5262', jin: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'linan',    name: '临安', x: 280, y: 320, tx: 280, ty: 336, anchor: 'middle' },
  { id: 'jiankang', name: '建康', x: 250, y: 280, tx: 250, ty: 296, anchor: 'middle' },
  { id: 'caishi',   name: '采石', x: 218, y: 244, tx: 204, ty: 238, anchor: 'end' },
  { id: 'hezhou',   name: '和州', x: 200, y: 220, tx: 186, ty: 214, anchor: 'end' },
  { id: 'zhongdu',  name: '中都', x: 160, y: 60,  tx: 160, ty: 46,  anchor: 'middle' }
];

var BASE0 = { linan: 'song', jiankang: 'song', caishi: 'song', hezhou: 'contested', zhongdu: 'jin' };
var BASE1 = { linan: 'song', jiankang: 'song', caishi: 'song', hezhou: 'jin', zhongdu: 'jin' };
var BASE2 = { linan: 'song', jiankang: 'song', caishi: 'contested', hezhou: 'jin', zhongdu: 'jin' };
var BASE3 = { linan: 'song', jiankang: 'song', caishi: 'song', hezhou: 'jin', zhongdu: 'jin' };
var BASE4 = { linan: 'song', jiankang: 'song', caishi: 'song', hezhou: 'song', zhongdu: 'jin' };

var STAGES = [
  {
    label: '金主南侵', seal: '南侵',
    kicker: '阶段一 · 1161 年 九月',
    title: '完颜亮举国南侵',
    turn: '金主完颜亮征发诸路，号六十万，分道南侵；宋淮西守将王权弃和州而走，金军进逼长江。',
    why: '金军来势极盛，宋军淮防一触即溃；长江若失，临安便无险可守。',
    src: '《宋史·虞允文传》《高宗本纪》；《金史·海陵纪》。「号六十万」为史载。',
    events: [
      { time: '1161·九月', who: '完颜亮', text: '号六十万，分道南侵', t: 0.08 },
      { time: '1161·九月', who: '王权', text: '弃和州而走', t: 0.34, kind: 'flip', city: 'hezhou' },
      { time: '1161·九月', who: '金军', text: '进逼长江', t: 0.58 },
      { time: '1161·九月', who: '宋廷', text: '中外震骇', t: 0.84 }
    ],
    nums: [
      { label: '金军', value: '号六十万', kind: '史载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '和州', value: '失守', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { hezhou: 0.34 },
    markers: [
      { type: 'host', side: 'jin', x: 160, y: 60, t: 0.02, name: '完颜亮', lx: 174, ly: 54, anchor: 'start' },
      { type: 'host', side: 'song', x: 200, y: 220, t: 0.02, name: '王权', lx: 186, ly: 232, anchor: 'end', weak: true },
      { type: 'army', side: 'jin', x: 180, y: 140, t: 0.34, name: '金军', lx: 194, ly: 134, anchor: 'start' }
    ],
    routes: [
      { d: 'M 164 68 C 172 110 182 160 196 212', side: 'jin', t0: 0.12, t1: 0.60,
        label: '金军南下', lx: 156, ly: 130, anchor: 'end' }
    ]
  },
  {
    label: '金军渡淮', seal: '临江',
    kicker: '阶段二 · 1161 年 十一月',
    title: '金军渡淮，进抵采石',
    turn: '金军渡淮，进抵采石，欲自采石渡江；宋军无主，士卒散处，形势危急。',
    why: '采石是长江渡口要冲，金军若由此渡江，便可直趋建康、临安。',
    src: '《宋史·虞允文传》；《金史·海陵纪》。',
    events: [
      { time: '1161·十一月', who: '金军', text: '渡淮南下', t: 0.08 },
      { time: '1161·十一月', who: '金军', text: '进抵采石', t: 0.34, kind: 'flip', city: 'caishi' },
      { time: '1161·十一月', who: '宋军', text: '无主，士卒散处', t: 0.58 },
      { time: '1161·十一月', who: '金军', text: '欲自采石渡江', t: 0.84 }
    ],
    nums: [
      { label: '金军', value: '号六十万', kind: '史载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '采石', value: '临江', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { caishi: 0.34 },
    markers: [
      { type: 'host', side: 'jin', x: 218, y: 244, t: 0.30, name: '完颜亮', lx: 232, ly: 238, anchor: 'start' },
      { type: 'host', side: 'song', x: 250, y: 280, t: 0.02, name: '宋军', lx: 264, ly: 274, anchor: 'start', weak: true },
      { type: 'army', side: 'jin', x: 206, y: 230, t: 0.34, name: '金军', lx: 192, ly: 224, anchor: 'end' }
    ],
    routes: [
      { d: 'M 202 218 C 208 226 214 234 218 242', side: 'jin', t0: 0.10, t1: 0.44,
        label: '进抵采石', lx: 202, ly: 232, anchor: 'end' }
    ]
  },
  {
    label: '采石水战', seal: '水战',
    kicker: '阶段三 · 1161 年 十一月',
    title: '虞允文督师，采石水战大捷',
    turn: '虞允文至采石，犒军誓师，率水军以海鳅船冲击金军小舟；金军舟小不敌，死者甚众，渡江之谋遂破。',
    why: '宋军水战之长正好克制金军舟师之短；采石一胜，长江防线得以稳住。',
    src: '《宋史·虞允文传》；《金史·海陵纪》。「海鳅船」为史载。',
    events: [
      { time: '1161·十一月', who: '虞允文', text: '至采石，犒军誓师', t: 0.08 },
      { time: '1161·十一月', who: '宋水军', text: '以海鳅船冲击金舟', t: 0.34, kind: 'flip', city: 'caishi' },
      { time: '1161·十一月', who: '金军', text: '舟小不敌，死者甚众', t: 0.58 },
      { time: '1161·十一月', who: '金军', text: '渡江之谋遂破', t: 0.84 }
    ],
    nums: [
      { label: '金军', value: '号六十万', kind: '史载', n: null },
      { label: '宋水军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '金军大败', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { caishi: 0.34 },
    sieges: [
      { x: 218, y: 244, t: 0.34, label: '金军败', side: 'song', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'song', x: 218, y: 244, t: 0.30, name: '虞允文', lx: 204, ly: 256, anchor: 'end' },
      { type: 'host', side: 'jin', x: 218, y: 244, t: 0.02, name: '完颜亮', lx: 232, ly: 232, anchor: 'start', weak: true },
      { type: 'army', side: 'song', x: 232, y: 252, t: 0.34, name: '宋水军', lx: 246, ly: 246, anchor: 'start' }
    ],
    routes: [
      { d: 'M 240 250 C 230 248 222 246 218 244', side: 'song', t0: 0.28, t1: 0.62,
        label: '海鳅船冲击', lx: 240, ly: 258, anchor: 'start' }
    ]
  },
  {
    label: '金军北退', seal: '内变',
    kicker: '阶段四 · 1161 年 十一月',
    title: '完颜亮被弑，金军北退',
    turn: '金军采石受挫，完颜亮转趋扬州，强令渡江；部下不堪，弑之。金军北退，宋军收复两淮。',
    why: '采石一胜稳住了长江，金廷内变又使其全线退兵，南宋得以转危为安。',
    src: '《宋史·虞允文传》《高宗本纪》；《金史·海陵纪》。',
    events: [
      { time: '1161·十一月', who: '完颜亮', text: '转趋扬州，强令渡江', t: 0.08 },
      { time: '1161·十一月', who: '金军', text: '部下弑完颜亮', t: 0.34 },
      { time: '1161·十一月', who: '金军', text: '北退', t: 0.58, kind: 'flip', city: 'hezhou' },
      { time: '1161·十一月', who: '宋军', text: '收复两淮', t: 0.84 }
    ],
    nums: [
      { label: '金军', value: '号六十万', kind: '史载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '金军北退', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { hezhou: 0.58 },
    markers: [
      { type: 'host', side: 'song', x: 218, y: 244, t: 0.02, name: '虞允文', lx: 232, ly: 250, anchor: 'start' },
      { type: 'host', side: 'jin', x: 160, y: 60, t: 0.34, name: '金军', lx: 174, ly: 54, anchor: 'start', weak: true },
      { type: 'army', side: 'song', x: 200, y: 220, t: 0.58, name: '宋军', lx: 186, ly: 232, anchor: 'end' }
    ],
    routes: [
      { d: 'M 204 216 C 188 176 174 124 166 84', side: 'retreat', t0: 0.36, t1: 0.80,
        label: '金军北退', lx: 178, ly: 150, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 252 C 70 246 140 256 210 250 C 280 244 340 250 385 246', color: '#a8b6ab', width: 4 },
    { d: 'M 90 386 C 110 330 132 280 156 236', color: '#b6c3b6', width: 2.4 }
  ],
  lines: [
    { d: 'M 120 120 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 130 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 330 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 330 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 30, y: 246, t: '长　江', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 110, y: 300, t: '采石矶', size: 7.5, color: '#46594f', ls: 1 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '采石·今安徽马鞍山采石矶　和州·今安徽和县　建康·今江苏南京', size: 6.6, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '江　南', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'caishi',
  title: '采石之战',
  kicker: '沙 盘 推 演',
  subtitle: '和州 · 采石',
  years: '1161',
  yearUnit: 'AD',
  era: '南宋 · 绍兴三十一年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：采石今安徽马鞍山采石矶、和州今安徽和县，非真实地理比例',
  hook: '虞允文采石督师，海鳅船大破金军，完颜亮旋被弑，金军北退',
  period: '宋金',
  yearValue: 1161,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '宋', b: '守', sub: '1161' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
