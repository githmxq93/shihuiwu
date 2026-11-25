/**
 * 沙盘推演 · 灭楚之战（前225—前223）
 * 通行叙事：李信轻兵伐楚、城父之败、王翦六十万复起、蕲南破项燕、寿春虏楚王。
 * 李信二十万、王翦六十万、「三日三夜不顿舍」、「亡七都尉」均为史载；
 * 楚军兵力无确载。地名古今对照：寿春今安徽寿县、蕲南今安徽宿州南、城父今安徽亳州东南。
 */
var COLOR = { qin: '#6f3a22', chu: '#2b5262', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'xianyang', name: '咸阳', x: 44,  y: 104, tx: 44,  ty: 90,  anchor: 'middle' },
  { id: 'luoyang',  name: '洛阳', x: 142, y: 126, tx: 142, ty: 112, anchor: 'middle' },
  { id: 'chen',     name: '陈',   x: 238, y: 158, tx: 238, ty: 144, anchor: 'middle' },
  { id: 'chengfu',  name: '城父', x: 286, y: 180, tx: 300, ty: 176, anchor: 'start' },
  { id: 'qi',       name: '蕲',   x: 318, y: 212, tx: 318, ty: 228, anchor: 'middle' },
  { id: 'shouchun', name: '寿春', x: 296, y: 266, tx: 296, ty: 282, anchor: 'middle' }
];

var BASE0 = { xianyang: 'qin', luoyang: 'qin', chen: 'chu', chengfu: 'chu', qi: 'chu', shouchun: 'chu' };
var BASE1 = { xianyang: 'qin', luoyang: 'qin', chen: 'qin', chengfu: 'chu', qi: 'chu', shouchun: 'chu' };
var BASE2 = { xianyang: 'qin', luoyang: 'qin', chen: 'chu', chengfu: 'chu', qi: 'chu', shouchun: 'chu' };
var BASE3 = { xianyang: 'qin', luoyang: 'qin', chen: 'qin', chengfu: 'qin', qi: 'chu', shouchun: 'chu' };
var BASE4 = { xianyang: 'qin', luoyang: 'qin', chen: 'qin', chengfu: 'qin', qi: 'qin', shouchun: 'chu' };
var BASE5 = { xianyang: 'qin', luoyang: 'qin', chen: 'qin', chengfu: 'qin', qi: 'qin', shouchun: 'qin' };

var STAGES = [
  {
    label: '李信伐楚', seal: '轻兵',
    kicker: '阶段一 · 前225 年',
    title: '李信、蒙恬率二十万伐楚',
    turn: '秦王政问伐楚用兵几何，李信曰「不过用二十万人」，王翦曰「非六十万人不可」。秦王以李信为将，蒙恬副之，率二十万南征，初战破楚军。',
    why: '秦廷低估楚国纵深与项燕的动员能力，选择轻兵速决；这一判断决定了首战的结局。',
    src: '《史记·白起王翦列传》《秦始皇本纪》；《资治通鉴》卷七。二十万为史载。',
    events: [
      { time: '前225', who: '秦王政', text: '问伐楚用兵几何', t: 0.06 },
      { time: '前225', who: '李信', text: '曰不过二十万', t: 0.28 },
      { time: '前225', who: '王翦', text: '曰非六十万不可', t: 0.48 },
      { time: '前225', who: '李信', text: '率二十万南征，初破楚军', t: 0.74, kind: 'flip', city: 'chen' }
    ],
    nums: [
      { label: '李信军', value: '二十万', kind: '史载', n: 200 },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '王翦请兵', value: '六十万', kind: '史载', n: 600 }
    ],
    hold: BASE1,
    flips: { chen: 0.74 },
    markers: [
      { type: 'host', side: 'qin', x: 142, y: 126, t: 0.02, name: '李信', lx: 128, ly: 138, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'qin', x: 232, y: 154, t: 0.70, name: '秦军', lx: 218, ly: 166, anchor: 'end' },
      { type: 'host', side: 'chu', x: 286, y: 180, t: 0.02, name: '项燕', lx: 300, ly: 190, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 148 132 C 178 140 208 150 230 156', side: 'qin', t0: 0.30, t1: 0.70,
        label: '秦军南下', lx: 180, ly: 152, anchor: 'middle' }
    ]
  },
  {
    label: '城父之败', seal: '大败',
    kicker: '阶段二 · 前225 年',
    title: '项燕尾随，大破李信于城父',
    turn: '李信轻兵深入，项燕率楚军尾随，三日三夜不顿舍，大破李信军，攻入秦军两壁，杀七都尉；李信败走。',
    why: '秦军战线拉长、兵力分散，楚军以本土纵深换时间，抓住秦军骄惰之隙一举反击。',
    src: '《史记·白起王翦列传》；《资治通鉴》卷七。「三日三夜不顿舍」「杀七都尉」为史载。',
    events: [
      { time: '前225', who: '李信', text: '轻兵深入，连战皆胜', t: 0.08 },
      { time: '前225', who: '项燕', text: '尾随秦军，三日三夜不顿舍', t: 0.32 },
      { time: '前225', who: '楚军', text: '大破李信于城父', t: 0.58, kind: 'flip', city: 'chen' },
      { time: '前225', who: '秦军', text: '亡七都尉，李信败走', t: 0.84 }
    ],
    nums: [
      { label: '秦军', value: '二十万', kind: '史载', n: 200 },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '秦军损失', value: '七都尉', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { chen: 0.58 },
    markers: [
      { type: 'host', side: 'qin', x: 240, y: 160, t: 0.02, name: '李信', lx: 226, ly: 172, anchor: 'end', weak: true },
      { type: 'host', side: 'chu', x: 286, y: 180, t: 0.02, name: '项燕', lx: 300, ly: 188, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'chu', x: 272, y: 168, t: 0.50, name: '楚军', lx: 258, ly: 158, anchor: 'end' }
    ],
    routes: [
      { d: 'M 290 184 C 272 178 256 170 246 164', side: 'chu', t0: 0.30, t1: 0.64,
        label: '楚军反击', lx: 276, ly: 196, anchor: 'start' },
      { d: 'M 236 162 C 208 152 180 142 154 136', side: 'retreat', t0: 0.68, t1: 0.94,
        label: '秦军败退', lx: 196, ly: 164, anchor: 'middle' }
    ]
  },
  {
    label: '王翦复起', seal: '六十万',
    kicker: '阶段三 · 前224 年',
    title: '王翦率六十万伐楚，坚壁不战',
    turn: '秦王政亲请王翦，倾国中之兵六十万付之。王翦进屯陈、城父一线，坚壁不战，日休士洗沐，与士卒同饮食；楚军数挑战，秦军不出。',
    why: '王翦以绝对兵力压迫而不决战，先耗尽楚军的锐气与粮秣；楚军求战不得，只能东撤。',
    src: '《史记·白起王翦列传》；《资治通鉴》卷七。「六十万」为史载。',
    events: [
      { time: '前224', who: '秦王政', text: '亲请王翦，倾国中之兵', t: 0.06 },
      { time: '前224', who: '王翦', text: '率六十万伐楚，进屯陈', t: 0.28, kind: 'flip', city: 'chen' },
      { time: '前224', who: '秦军', text: '进逼城父，坚壁不战', t: 0.54, kind: 'flip', city: 'chengfu' },
      { time: '前224', who: '楚军', text: '数挑战，秦军不出', t: 0.82 }
    ],
    nums: [
      { label: '王翦军', value: '六十万', kind: '史载', n: 600 },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '坚壁', value: '岁余', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { chen: 0.28, chengfu: 0.54 },
    markers: [
      { type: 'host', side: 'qin', x: 238, y: 158, t: 0.02, name: '王翦', lx: 224, ly: 170, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'qin', x: 272, y: 174, t: 0.50, name: '秦军', lx: 258, ly: 184, anchor: 'end' },
      { type: 'host', side: 'chu', x: 310, y: 210, t: 0.02, name: '项燕', lx: 324, ly: 204, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 146 132 C 178 142 208 150 232 156', side: 'qin', t0: 0.24, t1: 0.50,
        label: '王翦东进', lx: 180, ly: 154, anchor: 'middle' }
    ]
  },
  {
    label: '蕲南决战', seal: '破楚',
    kicker: '阶段四 · 前223 年',
    title: '秦军追击，大破楚军于蕲南',
    turn: '楚军粮尽，引兵东撤；王翦纵兵追击，大破楚军于蕲南，项燕兵败自杀（一说被围杀）。',
    why: '楚军一动，坚壁对峙的优势立刻转为秦军的追击战机；楚军主力在此役被歼。',
    src: '《史记·白起王翦列传》《项羽本纪》；《资治通鉴》卷七。项燕之死有两说。',
    events: [
      { time: '前223', who: '楚军', text: '粮尽，引兵东撤', t: 0.08 },
      { time: '前223', who: '王翦', text: '纵兵追击', t: 0.32 },
      { time: '前223', who: '秦军', text: '大破楚军于蕲南', t: 0.58, kind: 'flip', city: 'qi' },
      { time: '前223', who: '项燕', text: '兵败自杀（一说被围杀）', t: 0.84 }
    ],
    nums: [
      { label: '秦军', value: '六十万', kind: '史载', n: 600 },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '项燕', value: '死', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { qi: 0.58 },
    sieges: [
      { x: 318, y: 212, t: 0.58, label: '蕲南破楚', side: 'qin', lx: -12, ly: 12, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 272, y: 176, t: 0.02, name: '王翦', lx: 258, ly: 188, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'qin', x: 310, y: 204, t: 0.52, name: '秦军', lx: 324, ly: 198, anchor: 'start' },
      { type: 'army', side: 'chu', x: 312, y: 214, t: 0.02, name: '楚军', lx: 300, ly: 226, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 276 180 C 290 190 302 200 310 208', side: 'qin', t0: 0.28, t1: 0.62,
        label: '秦军追击', lx: 286, ly: 196, anchor: 'start' }
    ]
  },
  {
    label: '寿春陷落', seal: '灭楚',
    kicker: '阶段五 · 前223 年',
    title: '秦军入寿春，虏楚王负刍',
    turn: '王翦、蒙武攻入寿春，虏楚王负刍，楚国灭亡；项燕余部立昌平君为楚王于淮南，旋被秦军平定。',
    why: '楚都既陷、楚王被虏，楚国作为诸侯国的抵抗宣告终结；秦统一天下只剩齐、燕残余。',
    src: '《史记·秦始皇本纪》《白起王翦列传》；《资治通鉴》卷七。',
    events: [
      { time: '前223', who: '秦军', text: '进围寿春', t: 0.08 },
      { time: '前223', who: '楚王负刍', text: '被虏，楚都陷落', t: 0.38, kind: 'flip', city: 'shouchun' },
      { time: '前223', who: '项燕余部', text: '立昌平君为楚王于淮南', t: 0.64 },
      { time: '前223', who: '秦军', text: '平定楚地，楚亡', t: 0.86 }
    ],
    nums: [
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '楚王', value: '被虏', kind: '史载', n: null }
    ],
    hold: BASE5,
    flips: { shouchun: 0.38 },
    markers: [
      { type: 'host', side: 'qin', x: 300, y: 244, t: 0.30, name: '王翦', lx: 286, ly: 236, anchor: 'end' },
      { type: 'host', side: 'chu', x: 296, y: 266, t: 0.02, name: '负刍', lx: 282, ly: 274, anchor: 'end', weak: true },
      { type: 'army', side: 'qin', x: 296, y: 258, t: 0.36, name: '秦军', lx: 310, ly: 252, anchor: 'start' }
    ],
    routes: [
      { d: 'M 314 220 C 308 236 302 250 298 260', side: 'qin', t0: 0.06, t1: 0.40,
        label: '秦军南下', lx: 318, ly: 238, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 196 C 60 190 120 200 180 194 C 240 188 300 182 385 186', color: '#a8b6ab', width: 3 },
    { d: 'M 330 150 C 322 186 312 222 300 256', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 92 60 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 342 62 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 44 292 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 340 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 192, t: '淮　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 308, y: 152, t: '江　淮', size: 8.5, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '寿春·今安徽寿县　蕲南·今安徽宿州南　城父·今安徽亳州东南', size: 7.2, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '楚 之 腹 地', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'miechu',
  title: '灭楚之战',
  kicker: '沙 盘 推 演',
  subtitle: '城父 · 蕲南 · 寿春',
  years: '前223',
  yearUnit: '',
  era: '战国 · 秦王政二十四年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：寿春今安徽寿县、蕲南今安徽宿州南，非真实地理比例',
  hook: '李信二十万轻兵败于城父，王翦六十万坚壁岁余，蕲南破项燕',
  period: '战国',
  yearValue: -223,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '秦', b: '灭楚', sub: '前223' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
