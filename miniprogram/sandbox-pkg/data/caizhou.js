/**
 * 沙盘推演 · 蔡州之战（817）
 * 通行叙事：裴度督师讨淮西，李光颜等攻郾城；李愬至唐州，示弱骄敌；
 * 雪夜奔袭七十里，破蔡州，擒吴元济，淮西平定。
 * 雪夜「行七十里」为史载；唐军与淮西军兵力均无确载。
 * 地名古今对照：蔡州今河南汝南、唐州今河南泌阳、郾城今河南漯河郾城区。
 */
var COLOR = { tang: '#2b5262', wu: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'changan',  name: '长安', x: 84,  y: 104, tx: 84,  ty: 90,  anchor: 'middle' },
  { id: 'yancheng', name: '郾城', x: 190, y: 196, tx: 176, ty: 190, anchor: 'end' },
  { id: 'tangzhou', name: '唐州', x: 156, y: 238, tx: 142, ty: 232, anchor: 'end' },
  { id: 'shenzhou', name: '申州', x: 214, y: 268, tx: 200, ty: 276, anchor: 'end' },
  { id: 'caizhou',  name: '蔡州', x: 262, y: 224, tx: 262, ty: 240, anchor: 'middle' }
];

var BASE0 = { changan: 'tang', yancheng: 'tang', tangzhou: 'tang', shenzhou: 'wu', caizhou: 'wu' };
var BASE1 = { changan: 'tang', yancheng: 'contested', tangzhou: 'tang', shenzhou: 'wu', caizhou: 'wu' };
var BASE2 = { changan: 'tang', yancheng: 'contested', tangzhou: 'tang', shenzhou: 'wu', caizhou: 'wu' };
var BASE3 = { changan: 'tang', yancheng: 'tang', tangzhou: 'tang', shenzhou: 'wu', caizhou: 'contested' };
var BASE4 = { changan: 'tang', yancheng: 'tang', tangzhou: 'tang', shenzhou: 'tang', caizhou: 'tang' };

var STAGES = [
  {
    label: '裴度督师', seal: '讨淮西',
    kicker: '阶段一 · 817 年',
    title: '裴度督师，唐军攻郾城',
    turn: '唐以裴度为淮西宣慰处置使，督诸军讨吴元济；李光颜等攻郾城，淮西军屡败，蔡州外围渐蹙。',
    why: '淮西割据三十年，唐廷倾力一战；郾城是蔡州北面门户，得郾城则可南下。',
    src: '《旧唐书·裴度传》《李光颜传》；《资治通鉴》卷二百四十。',
    events: [
      { time: '817', who: '裴度', text: '督诸军讨淮西', t: 0.08 },
      { time: '817', who: '李光颜', text: '攻郾城', t: 0.34, kind: 'flip', city: 'yancheng' },
      { time: '817', who: '淮西军', text: '屡败，外围渐蹙', t: 0.58 },
      { time: '817', who: '吴元济', text: '困守蔡州', t: 0.84 }
    ],
    nums: [
      { label: '唐军', value: '无确载', kind: '无确载', n: null },
      { label: '淮西军', value: '无确载', kind: '无确载', n: null },
      { label: '郾城', value: '被攻', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { yancheng: 0.34 },
    markers: [
      { type: 'host', side: 'tang', x: 190, y: 196, t: 0.30, name: '李光颜', lx: 204, ly: 190, anchor: 'start' },
      { type: 'host', side: 'wu', x: 262, y: 224, t: 0.02, name: '吴元济', lx: 276, ly: 218, anchor: 'start' },
      { type: 'army', side: 'tang', x: 168, y: 206, t: 0.34, name: '唐军', lx: 154, ly: 200, anchor: 'end' }
    ],
    routes: [
      { d: 'M 92 108 C 116 140 146 174 182 192', side: 'tang', t0: 0.08, t1: 0.50,
        label: '唐军东讨', lx: 118, ly: 148, anchor: 'middle' }
    ]
  },
  {
    label: '李愬至唐州', seal: '示弱',
    kicker: '阶段二 · 817 年',
    title: '李愬至唐州，示弱骄敌',
    turn: '李愬出任唐、随、邓节度使，至唐州后不治军威，专务抚循；淮西轻之，不为备。李愬阴募死士，渐得淮西虚实。',
    why: '李愬以骄敌之策掩护奇袭准备；蔡州守备松懈，正是奇袭的前提。',
    src: '《旧唐书·李愬传》；《资治通鉴》卷二百四十。「示弱骄敌」为史载。',
    events: [
      { time: '817', who: '李愬', text: '出任唐邓节度使', t: 0.08 },
      { time: '817', who: '李愬', text: '至唐州，抚循士卒', t: 0.34 },
      { time: '817', who: '淮西', text: '轻之，不为备', t: 0.58 },
      { time: '817', who: '李愬', text: '阴募死士，得敌虚实', t: 0.84 }
    ],
    nums: [
      { label: '唐军', value: '无确载', kind: '无确载', n: null },
      { label: '淮西军', value: '无确载', kind: '无确载', n: null },
      { label: '方略', value: '示弱骄敌', kind: '史载', n: null }
    ],
    hold: BASE2,
    markers: [
      { type: 'host', side: 'tang', x: 156, y: 238, t: 0.30, name: '李愬', lx: 170, ly: 232, anchor: 'start' },
      { type: 'host', side: 'wu', x: 262, y: 224, t: 0.02, name: '吴元济', lx: 276, ly: 218, anchor: 'start', weak: true },
      { type: 'army', side: 'tang', x: 170, y: 244, t: 0.34, name: '唐军', lx: 156, ly: 250, anchor: 'end', weak: true }
    ],
    routes: []
  },
  {
    label: '雪夜袭蔡州', seal: '奇袭',
    kicker: '阶段三 · 817 年 十月',
    title: '李愬雪夜奔袭七十里',
    turn: '大风雪，李愬率九千人为前锋，夜行七十里至蔡州城下；守军不觉，唐军攀城而入，遂据蔡州外城。',
    why: '风雪之夜守军懈弛，奇袭一举突破蔡州城防；三十年割据的老巢，被一夜攻破。',
    src: '《旧唐书·李愬传》；《资治通鉴》卷二百四十。「夜行七十里」为史载。',
    events: [
      { time: '817·十月', who: '李愬', text: '乘大风雪出兵', t: 0.08 },
      { time: '817·十月', who: '唐军', text: '夜行七十里至蔡州', t: 0.34 },
      { time: '817·十月', who: '唐军', text: '攀城而入，据外城', t: 0.58, kind: 'flip', city: 'caizhou' },
      { time: '817·十月', who: '吴元济', text: '仓皇守牙城', t: 0.84 }
    ],
    nums: [
      { label: '唐前锋', value: '九千人', kind: '史载', n: 90 },
      { label: '夜行', value: '七十里', kind: '史载', n: null },
      { label: '蔡州', value: '外城破', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { caizhou: 0.58 },
    sieges: [
      { x: 262, y: 224, t: 0.58, label: '夜袭', side: 'tang', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'tang', x: 262, y: 224, t: 0.30, name: '李愬', lx: 248, ly: 236, anchor: 'end' },
      { type: 'host', side: 'wu', x: 262, y: 224, t: 0.02, name: '吴元济', lx: 276, ly: 212, anchor: 'start', weak: true },
      { type: 'army', side: 'tang', x: 224, y: 238, t: 0.34, name: '唐军', lx: 210, ly: 232, anchor: 'end' }
    ],
    routes: [
      { d: 'M 166 242 C 190 240 218 234 248 228', side: 'tang', t0: 0.12, t1: 0.56,
        label: '雪夜奔袭', lx: 200, ly: 250, anchor: 'middle' }
    ]
  },
  {
    label: '擒吴元济', seal: '淮西平',
    kicker: '阶段四 · 817 年 十月',
    title: '吴元济被擒，淮西平定',
    turn: '唐军攻牙城，吴元济请降；申、光二州相继归唐，淮西三十余年割据至此平定。',
    why: '淮西既平，唐廷声威大振，成德、淄青等藩镇相继归顺，元和中兴达到顶点。',
    src: '《旧唐书·李愬传》《吴少诚传》；《资治通鉴》卷二百四十。',
    events: [
      { time: '817·十月', who: '唐军', text: '攻牙城', t: 0.08 },
      { time: '817·十月', who: '吴元济', text: '请降被擒', t: 0.34, kind: 'flip', city: 'caizhou' },
      { time: '817·十月', who: '申·光二州', text: '相继归唐', t: 0.58, kind: 'flip', city: 'shenzhou' },
      { time: '817·十月', who: '唐', text: '淮西平定', t: 0.84 }
    ],
    nums: [
      { label: '唐前锋', value: '九千人', kind: '史载', n: 90 },
      { label: '割据', value: '三十余年', kind: '史载', n: null },
      { label: '淮西', value: '平定', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { caizhou: 0.34, shenzhou: 0.58 },
    markers: [
      { type: 'host', side: 'tang', x: 262, y: 224, t: 0.02, name: '李愬', lx: 276, ly: 232, anchor: 'start' },
      { type: 'host', side: 'wu', x: 262, y: 224, t: 0.02, name: '吴元济', lx: 276, ly: 214, anchor: 'start', weak: true },
      { type: 'army', side: 'tang', x: 240, y: 236, t: 0.10, name: '唐军', lx: 226, ly: 230, anchor: 'end' }
    ],
    routes: [
      { d: 'M 222 264 C 234 252 246 240 256 230', side: 'tang', t0: 0.50, t1: 0.86,
        label: '申州归唐', lx: 208, ly: 256, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 40 60 C 70 120 100 180 130 240 C 148 280 158 330 162 386', color: '#a8b6ab', width: 2.6 },
    { d: 'M -10 200 C 80 194 160 202 240 196 C 300 192 350 196 385 200', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 100 150 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 250 120 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 80 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 30, y: 194, t: '汝　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '蔡州·今河南汝南　唐州·今河南泌阳　郾城·今河南漯河郾城区', size: 6.8, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '淮　西', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'caizhou',
  title: '蔡州之战',
  kicker: '沙 盘 推 演',
  subtitle: '唐州 · 蔡州',
  years: '817',
  yearUnit: 'AD',
  era: '唐 · 元和十二年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：蔡州今河南汝南、唐州今河南泌阳，非真实地理比例',
  hook: '李愬示弱骄敌，雪夜奔袭七十里破蔡州，擒吴元济，淮西平定',
  period: '隋唐',
  yearValue: 817,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '唐', b: '平', sub: '817' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
