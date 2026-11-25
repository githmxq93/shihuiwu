/**
 * 沙盘推演 · 虎牢之战（621）
 * 通行叙事：李世民围洛阳，王世充坚守；窦建德率十余万西援，进至虎牢东；
 * 李世民亲率精骑据虎牢，相持二十余日；夏军列阵久疲，唐军突袭，擒窦建德，王世充出降。
 * 夏军「十余万」、相持「二十余日」为史载；唐军兵力无确载。
 * 地名古今对照：虎牢今河南荥阳西北、成皋今河南荥阳汜水镇、洺州今河北永年。
 */
var COLOR = { tang: '#2b5262', zheng: '#4a4a5a', xia: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'changan',  name: '长安', x: 90,  y: 256, tx: 90,  ty: 272, anchor: 'middle' },
  { id: 'luoyang',  name: '洛阳', x: 206, y: 258, tx: 206, ty: 274, anchor: 'middle' },
  { id: 'chenggao', name: '成皋', x: 244, y: 240, tx: 230, ty: 234, anchor: 'end' },
  { id: 'hulao',    name: '虎牢', x: 278, y: 220, tx: 292, ty: 214, anchor: 'start' },
  { id: 'mingzhou', name: '洺州', x: 322, y: 128, tx: 322, ty: 114, anchor: 'middle' }
];

var BASE0 = { changan: 'tang', luoyang: 'zheng', chenggao: 'zheng', hulao: 'zheng', mingzhou: 'xia' };
var BASE1 = { changan: 'tang', luoyang: 'contested', chenggao: 'zheng', hulao: 'zheng', mingzhou: 'xia' };
var BASE2 = { changan: 'tang', luoyang: 'contested', chenggao: 'zheng', hulao: 'zheng', mingzhou: 'xia' };
var BASE3 = { changan: 'tang', luoyang: 'contested', chenggao: 'zheng', hulao: 'tang', mingzhou: 'xia' };
var BASE4 = { changan: 'tang', luoyang: 'contested', chenggao: 'tang', hulao: 'tang', mingzhou: 'xia' };
var BASE5 = { changan: 'tang', luoyang: 'tang', chenggao: 'tang', hulao: 'tang', mingzhou: 'xia' };

var STAGES = [
  {
    label: '围洛阳', seal: '围城',
    kicker: '阶段一 · 621 年 二月',
    title: '李世民围洛阳，王世充坚守',
    turn: '李世民率军围洛阳，昼夜攻城；王世充据城坚守，遣使向窦建德求救。唐军久攻不下，将士疲敝。',
    why: '洛阳城坚，硬攻代价极大；唐军真正要防的，是洛阳之外那支来援的生力军。',
    src: '《旧唐书·太宗本纪》《王世充传》；《资治通鉴》卷一百八十九。',
    events: [
      { time: '621·二月', who: '李世民', text: '率军围洛阳', t: 0.08 },
      { time: '621·二月', who: '唐军', text: '昼夜攻城', t: 0.34, kind: 'flip', city: 'luoyang' },
      { time: '621·二月', who: '王世充', text: '据城坚守', t: 0.58 },
      { time: '621·二月', who: '王世充', text: '遣使向窦建德求救', t: 0.84 }
    ],
    nums: [
      { label: '唐军', value: '无确载', kind: '无确载', n: null },
      { label: '郑军', value: '无确载', kind: '无确载', n: null },
      { label: '洛阳', value: '被围', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { luoyang: 0.34 },
    sieges: [
      { x: 206, y: 258, t: 0.34, label: '围城', side: 'tang', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'tang', x: 206, y: 258, t: 0.02, name: '李世民', lx: 192, ly: 252, anchor: 'end' },
      { type: 'host', side: 'zheng', x: 206, y: 258, t: 0.02, name: '王世充', lx: 220, ly: 246, anchor: 'start', weak: true },
      { type: 'army', side: 'tang', x: 178, y: 262, t: 0.34, name: '唐军', lx: 164, ly: 256, anchor: 'end' }
    ],
    routes: [
      { d: 'M 100 254 C 136 252 170 254 200 256', side: 'tang', t0: 0.06, t1: 0.34,
        label: '唐军东出', lx: 146, ly: 244, anchor: 'middle' }
    ]
  },
  {
    label: '夏军西援', seal: '来援',
    kicker: '阶段二 · 621 年',
    title: '窦建德率十余万西援洛阳',
    turn: '窦建德率众十余万西救洛阳，连克州县，进至虎牢东原；唐军腹背受敌，诸将多主张退保新安。',
    why: '夏军若与郑军会合，唐军将被夹在坚城与援军之间，围城之势立解。',
    src: '《旧唐书·窦建德传》；《资治通鉴》卷一百八十九。「十余万」为史载。',
    events: [
      { time: '621', who: '窦建德', text: '率十余万西援', t: 0.08 },
      { time: '621', who: '夏军', text: '连克州县，进至虎牢东', t: 0.34 },
      { time: '621', who: '唐军', text: '腹背受敌', t: 0.58 },
      { time: '621', who: '唐诸将', text: '多主张退保新安', t: 0.84 }
    ],
    nums: [
      { label: '夏军', value: '十余万', kind: '史载', n: 100 },
      { label: '唐军', value: '无确载', kind: '无确载', n: null },
      { label: '虎牢', value: '要冲', kind: '史载', n: null }
    ],
    hold: BASE2,
    markers: [
      { type: 'host', side: 'xia', x: 322, y: 128, t: 0.02, name: '窦建德', lx: 308, ly: 122, anchor: 'end' },
      { type: 'host', side: 'tang', x: 206, y: 258, t: 0.02, name: '李世民', lx: 192, ly: 252, anchor: 'end' },
      { type: 'army', side: 'xia', x: 296, y: 180, t: 0.34, name: '夏军', lx: 310, ly: 174, anchor: 'start' }
    ],
    routes: [
      { d: 'M 318 134 C 308 158 300 186 294 212', side: 'xia', t0: 0.16, t1: 0.72,
        label: '夏军南下', lx: 322, ly: 174, anchor: 'start' }
    ]
  },
  {
    label: '据虎牢', seal: '扼险',
    kicker: '阶段三 · 621 年 三月',
    title: '李世民亲率精骑，先据虎牢',
    turn: '李世民留屈突通等围洛阳，自率精骑东趋虎牢；夏军不得进，相持二十余日，数次小战皆挫其锋。',
    why: '虎牢扼夏军西进之路，先据之则夏军不得与郑军会合，唐军得以各个击破。',
    src: '《旧唐书·太宗本纪》《窦建德传》；《资治通鉴》卷一百八十九。「相持二十余日」为史载。',
    events: [
      { time: '621·三月', who: '李世民', text: '留屈突通围洛阳', t: 0.08 },
      { time: '621·三月', who: '李世民', text: '亲率精骑东趋虎牢', t: 0.34 },
      { time: '621·三月', who: '唐军', text: '先据虎牢，扼险拒守', t: 0.58, kind: 'flip', city: 'hulao' },
      { time: '621·三月', who: '两军', text: '相持二十余日', t: 0.84 }
    ],
    nums: [
      { label: '夏军', value: '十余万', kind: '史载', n: 100 },
      { label: '唐精骑', value: '无确载', kind: '无确载', n: null },
      { label: '相持', value: '二十余日', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { hulao: 0.58 },
    markers: [
      { type: 'host', side: 'tang', x: 278, y: 220, t: 0.30, name: '李世民', lx: 264, ly: 232, anchor: 'end' },
      { type: 'host', side: 'xia', x: 322, y: 128, t: 0.02, name: '窦建德', lx: 308, ly: 122, anchor: 'end', weak: true },
      { type: 'army', side: 'tang', x: 258, y: 232, t: 0.34, name: '唐精骑', lx: 244, ly: 226, anchor: 'end' }
    ],
    routes: [
      { d: 'M 212 254 C 232 244 252 232 272 224', side: 'tang', t0: 0.30, t1: 0.62,
        label: '东趋虎牢', lx: 232, ly: 246, anchor: 'middle' }
    ]
  },
  {
    label: '虎牢决战', seal: '突袭',
    kicker: '阶段四 · 621 年 五月',
    title: '夏军列阵久疲，唐军突袭擒窦建德',
    turn: '窦建德悉众列阵于汜水东，自晨至午士卒饥疲、争饮；李世民率轻骑先出诱之，主力继至，夏军大溃，窦建德被擒。',
    why: '夏军虽众，列阵半日而不得战，锐气尽失；唐军以逸待劳，一击而中其枢纽。',
    src: '《旧唐书·太宗本纪》《窦建德传》；《资治通鉴》卷一百八十九。「列阵自辰至午」为史载。',
    events: [
      { time: '621·五月', who: '窦建德', text: '悉众列阵于汜水东', t: 0.08 },
      { time: '621·五月', who: '夏军', text: '自辰至午，饥疲争饮', t: 0.34 },
      { time: '621·五月', who: '李世民', text: '轻骑诱之，主力继至', t: 0.58 },
      { time: '621·五月', who: '唐军', text: '夏军大溃，窦建德被擒', t: 0.84, kind: 'flip', city: 'chenggao' }
    ],
    nums: [
      { label: '夏军', value: '十余万', kind: '史载', n: 100 },
      { label: '唐军', value: '无确载', kind: '无确载', n: null },
      { label: '窦建德', value: '被擒', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { chenggao: 0.84 },
    sieges: [
      { x: 244, y: 240, t: 0.84, label: '夏军溃', side: 'tang', lx: -12, ly: 10, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'tang', x: 278, y: 220, t: 0.02, name: '李世民', lx: 292, ly: 232, anchor: 'start' },
      { type: 'host', side: 'xia', x: 278, y: 220, t: 0.02, name: '窦建德', lx: 292, ly: 208, anchor: 'start', weak: true },
      { type: 'army', side: 'tang', x: 258, y: 232, t: 0.34, name: '唐军', lx: 244, ly: 226, anchor: 'end' }
    ],
    routes: [
      { d: 'M 262 234 C 270 230 276 226 280 222', side: 'tang', t0: 0.54, t1: 0.84,
        label: '唐军突击', lx: 250, ly: 220, anchor: 'end' }
    ]
  },
  {
    label: '洛阳出降', seal: '受降',
    kicker: '阶段五 · 621 年 五月',
    title: '王世充见援绝，出降洛阳',
    turn: '李世民押窦建德至洛阳城下，王世充见援军已灭，绝望出降；河南、河北之地相继平定。',
    why: '虎牢一胜，同时解决了两大割据势力；唐朝统一天下的格局自此底定。',
    src: '《旧唐书·王世充传》《窦建德传》；《资治通鉴》卷一百八十九。',
    events: [
      { time: '621·五月', who: '李世民', text: '押窦建德至洛阳城下', t: 0.08 },
      { time: '621·五月', who: '王世充', text: '见援绝，出降', t: 0.34, kind: 'flip', city: 'luoyang' },
      { time: '621·五月', who: '唐', text: '河南平定', t: 0.58 },
      { time: '621·五月', who: '唐', text: '河北相继归附', t: 0.84 }
    ],
    nums: [
      { label: '夏军', value: '十余万', kind: '史载', n: 100 },
      { label: '郑军', value: '无确载', kind: '无确载', n: null },
      { label: '洛阳', value: '出降', kind: '史载', n: null }
    ],
    hold: BASE5,
    flips: { luoyang: 0.34 },
    markers: [
      { type: 'host', side: 'tang', x: 206, y: 258, t: 0.30, name: '李世民', lx: 192, ly: 252, anchor: 'end' },
      { type: 'host', side: 'zheng', x: 206, y: 258, t: 0.02, name: '王世充', lx: 220, ly: 246, anchor: 'start', weak: true },
      { type: 'army', side: 'tang', x: 232, y: 246, t: 0.10, name: '唐军', lx: 246, ly: 240, anchor: 'start' }
    ],
    routes: [
      { d: 'M 272 222 C 250 234 230 246 212 254', side: 'tang', t0: 0.06, t1: 0.34,
        label: '回师洛阳', lx: 248, ly: 226, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 210 C 70 206 140 214 210 208 C 280 202 340 208 385 204', color: '#a8b6ab', width: 3 },
    { d: 'M 150 386 C 158 330 168 280 182 236', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 120 88 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 250 96 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 60 306 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 300 316 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 30, y: 204, t: '黄　河', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 166, y: 330, t: '汜　水', size: 8.5, color: '#46594f', ls: 2, serif: true, rotate: 74 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '虎牢·今河南荥阳西北　成皋·今河南荥阳汜水镇　洺州·今河北永年', size: 6.8, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '中　原', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'hulao',
  title: '虎牢之战',
  kicker: '沙 盘 推 演',
  subtitle: '虎牢 · 洛阳',
  years: '621',
  yearUnit: 'AD',
  era: '唐 · 武德四年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：虎牢今河南荥阳西北、成皋今河南荥阳汜水镇，非真实地理比例',
  hook: '李世民据虎牢扼夏军，列阵久疲一击而擒窦建德，王世充遂降',
  period: '隋唐',
  yearValue: 621,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '唐', b: '胜', sub: '621' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
