/**
 * 沙盘推演 · 官渡之战（200）
 * 通行叙事：袁绍南下、白马延津、官渡对峙、许攸降与乌巢烧粮。
 * 袁绍「简精卒十万、骑万匹」与曹操「兵不满万」均为史载，后者学界多认为有所夸大；
 * 乌巢守军等无确载，不作估算。
 */
var COLOR = { cao: '#2b5262', yuan: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'yecheng', name: '邺城', x: 250, y: 72,  tx: 262, ty: 70,  anchor: 'start' },
  { id: 'liyang',  name: '黎阳', x: 214, y: 124, tx: 228, ty: 122, anchor: 'start' },
  { id: 'baima',   name: '白马', x: 178, y: 176, tx: 166, ty: 170, anchor: 'end' },
  { id: 'yanjin',  name: '延津', x: 204, y: 204, tx: 218, ty: 214, anchor: 'start' },
  { id: 'wuchao',  name: '乌巢', x: 228, y: 232, tx: 242, ty: 240, anchor: 'start' },
  { id: 'guandu',  name: '官渡', x: 152, y: 252, tx: 140, ty: 266, anchor: 'end' },
  { id: 'xuchang', name: '许都', x: 100, y: 318, tx: 112, ty: 330, anchor: 'start' }
];

var BASE1 = { yecheng: 'yuan', liyang: 'yuan', baima: 'yuan', yanjin: 'yuan', wuchao: 'yuan', guandu: 'cao', xuchang: 'cao' };
var BASE2 = { yecheng: 'yuan', liyang: 'yuan', baima: 'cao', yanjin: 'cao', wuchao: 'yuan', guandu: 'cao', xuchang: 'cao' };
var BASE4 = { yecheng: 'yuan', liyang: 'yuan', baima: 'cao', yanjin: 'cao', wuchao: 'contested', guandu: 'cao', xuchang: 'cao' };

var STAGES = [
  {
    label: '袁绍南下', seal: '南下',
    kicker: '阶段一 · 200 年 二月',
    title: '袁绍进军黎阳',
    turn: '袁绍简精卒十万、骑万匹，进军黎阳，遣颜良攻白马；曹操用荀攸声东击西之策，佯渡延津，引袁军分兵。',
    why: '袁绍兵多而分兵，曹操得以在白马、延津局部形成优势；但曹操兵少粮乏，必须速战，不能与袁绍拼消耗。',
    src: '《三国志·武帝纪》《袁绍传》；《资治通鉴》卷六十三。十万、万匹为史载。',
    events: [
      { time: '200·二月', who: '袁绍', text: '进军黎阳，遣颜良攻白马', t: 0.08 },
      { time: '200·四月', who: '曹操', text: '用荀攸计，佯渡延津', t: 0.36 },
      { time: '200·四月', who: '袁军', text: '分兵西应，颜良孤军', t: 0.62 },
      { time: '200·四月', who: '曹操', text: '自将轻兵趋白马', t: 0.86 }
    ],
    nums: [
      { label: '袁绍军', value: '约十万', kind: '史载', n: 10 },
      { label: '曹操军', value: '不满万', kind: '史载', n: 1 },
      { label: '白马守军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'yuan', x: 250, y: 72, t: 0.04, name: '袁绍', lx: 238, ly: 88, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'yuan', x: 178, y: 176, t: 0.26, name: '颜良', lx: 166, ly: 190, anchor: 'end' },
      { type: 'host', side: 'cao', x: 152, y: 252, t: 0.02, name: '曹操', lx: 140, ly: 266, anchor: 'end' }
    ],
    routes: [
      { d: 'M 248 78 C 236 94 226 110 218 120', side: 'yuan', t0: 0.04, t1: 0.26,
        label: '袁绍至黎阳', lx: 250, ly: 108, anchor: 'start' },
      { d: 'M 212 128 C 200 146 190 160 182 170', side: 'yuan', t0: 0.30, t1: 0.52,
        label: '颜良攻白马', lx: 198, ly: 158, anchor: 'end' },
      { d: 'M 156 246 C 166 220 174 196 178 182', side: 'cao', t0: 0.80, t1: 0.96,
        label: '曹操趋白马', lx: 148, ly: 216, anchor: 'end' }
    ]
  },
  {
    label: '白马延津', seal: '斩将',
    kicker: '阶段二 · 200 年 四月',
    title: '斩颜良、文丑',
    turn: '曹操至白马，关羽刺颜良于万众之中；袁军渡河追击，曹操弃辎重诱敌，斩文丑于延津。',
    why: '两战斩将，袁军前锋受挫、士气受损；但袁绍主力未损，仍可推进至官渡，曹操的兵力劣势没有改变。',
    src: '《三国志·武帝纪》《关羽传》《袁绍传》；《资治通鉴》卷六十三。',
    events: [
      { time: '200·四月', who: '关羽', text: '刺颜良于万众之中', t: 0.08, kind: 'flip', city: 'baima' },
      { time: '200·四月', who: '曹操', text: '解白马围，徙民西撤', t: 0.30 },
      { time: '200·四月', who: '文丑', text: '渡河追击，至延津', t: 0.54 },
      { time: '200·四月', who: '曹操', text: '弃辎重诱敌，斩文丑', t: 0.78, kind: 'flip', city: 'yanjin' }
    ],
    nums: [
      { label: '袁军前锋', value: '无确载', kind: '无确载', n: null },
      { label: '曹操军', value: '不满万', kind: '史载', n: 1 },
      { label: '袁绍主力', value: '约十万', kind: '史载', n: 10 }
    ],
    hold: BASE2,
    markers: [
      { type: 'army', side: 'yuan', x: 178, y: 176, t: 0.02, name: '颜良', lx: 166, ly: 190, anchor: 'end', weak: true },
      { type: 'host', side: 'cao', x: 180, y: 184, t: 0.06, name: '关羽', lx: 190, ly: 174, anchor: 'start' },
      { type: 'army', side: 'yuan', x: 204, y: 204, t: 0.56, name: '文丑', lx: 218, ly: 214, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 176 186 C 188 194 198 200 202 204', side: 'cao', t0: 0.26, t1: 0.52,
        label: '延津诱敌', lx: 196, ly: 206, anchor: 'end' }
    ]
  },
  {
    label: '官渡对峙', seal: '对峙',
    kicker: '阶段三 · 200 年 八月',
    title: '官渡相持，曹操粮尽',
    turn: '袁绍进至官渡，连营数十里，起土山、地道攻曹操；曹操亦于营中起垒相拒，兵少粮尽，欲还许都，用荀彧书劝而止。',
    why: '相持消耗对曹操不利，许都空虚、粮道受威胁；但曹操守住官渡，就守住了袁军南下的唯一通道。',
    src: '《三国志·武帝纪》《荀彧传》；《资治通鉴》卷六十三。',
    events: [
      { time: '200·八月', who: '袁绍', text: '进至官渡，连营数十里', t: 0.08 },
      { time: '200·八月', who: '袁军', text: '起土山、地道攻曹营', t: 0.34 },
      { time: '200·八月', who: '曹操', text: '兵少粮尽，欲还许都', t: 0.60 },
      { time: '200·八月', who: '荀彧', text: '书劝坚守，以待其变', t: 0.84 }
    ],
    nums: [
      { label: '袁绍军', value: '约十万', kind: '史载', n: 10 },
      { label: '曹操军', value: '不满万', kind: '史载', n: 1 },
      { label: '曹军存粮', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE2,
    sieges: [
      { x: 152, y: 252, t: 0.16, label: '官渡相持', side: 'yuan', lx: -12, ly: 4, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'yuan', x: 210, y: 226, t: 0.04, name: '袁绍', lx: 224, ly: 226, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'cao', x: 152, y: 252, t: 0.02, name: '曹操', lx: 140, ly: 266, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 216 128 C 196 164 172 204 158 240', side: 'yuan', t0: 0.04, t1: 0.46,
        label: '袁军南下', lx: 186, ly: 200, anchor: 'end' }
    ]
  },
  {
    label: '乌巢烧粮', seal: '烧粮',
    kicker: '阶段四 · 200 年 十月',
    title: '许攸降，曹操袭乌巢',
    turn: '许攸夜降，言袁军粮草尽在乌巢；曹操留曹洪守官渡，自率步骑五千，伪袁军旗号，夜袭乌巢，尽烧其粮。',
    why: '粮草一失，袁军十万之众不战自乱；张郃、高览临阵降曹，袁绍仅与八百骑北渡，官渡之战遂定。',
    src: '《三国志·武帝纪》《袁绍传》《张郃传》；《资治通鉴》卷六十三。袭乌巢步骑五千为史载。',
    burn: true,
    events: [
      { time: '200·十月', who: '许攸', text: '夜降曹操，言乌巢粮情', t: 0.08 },
      { time: '200·十月', who: '曹操', text: '留曹洪守官渡，自率五千袭乌巢', t: 0.28 },
      { time: '200·十月', who: '曹军', text: '伪袁军旗号，夜至乌巢纵火', t: 0.52, kind: 'flip', city: 'wuchao' },
      { time: '200·十月', who: '袁绍', text: '张郃、高览降，绍北渡', t: 0.80, kind: 'flip', city: 'liyang' }
    ],
    nums: [
      { label: '曹军袭乌巢', value: '五千', kind: '史载', n: 5 },
      { label: '乌巢守军', value: '无确载', kind: '无确载', n: null },
      { label: '袁绍军', value: '约十万', kind: '史载', n: 10 }
    ],
    hold: BASE4,
    markers: [
      { type: 'host', side: 'cao', x: 152, y: 252, t: 0.02, name: '曹操', lx: 140, ly: 266, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'cao', x: 228, y: 232, t: 0.46, name: '曹军', lx: 240, ly: 246, anchor: 'start' },
      { type: 'host', side: 'yuan', x: 214, y: 124, t: 0.02, name: '袁绍', lx: 228, ly: 122, anchor: 'start', weak: true, moveRef: 1 }
    ],
    routes: [
      { d: 'M 158 250 C 182 242 206 236 224 232', side: 'cao', t0: 0.30, t1: 0.54,
        label: '夜袭乌巢', lx: 176, ly: 226, anchor: 'start' },
      { d: 'M 228 232 C 214 196 196 160 178 132', side: 'retreat', t0: 0.74, t1: 0.96,
        label: '袁绍北渡', lx: 220, ly: 176, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE1;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 154 C 70 142 140 160 210 150 C 280 140 340 126 385 132', color: '#a8b6ab', width: 3 },
    { d: 'M 74 96 C 108 148 118 206 104 268 C 98 296 92 314 86 330', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 40 200 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 286 200 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 52 292 l12 -13 l9 9 l11 -13', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 286 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 20, y: 140, t: '黄　河', size: 10, color: '#46594f', ls: 3, serif: true },
    { x: 78, y: 356, t: '鸿　沟', size: 8.5, color: '#7d6647', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 }
  ]
};

var META = {
  id: 'guandu',
  title: '官渡之战',
  kicker: '沙 盘 推 演',
  subtitle: '黄河 · 官渡—乌巢',
  years: '200',
  yearUnit: 'AD',
  era: '东汉 · 建安五年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝相持 ｜ 易＝易手 ｜ 虚线＝北撤',
  note: '示意沙盘：仅保留关键城池与行军线，非真实地理比例',
  hook: '袁绍十万南下，曹操兵不满万，许攸夜降烧乌巢',
  period: '东汉',
  yearValue: 200,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: null
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
