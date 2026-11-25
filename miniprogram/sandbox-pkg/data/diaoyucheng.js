/**
 * 沙盘推演 · 钓鱼城之战（1259）
 * 通行叙事：蒙哥率军入蜀，围合州钓鱼城；王坚、张珏凭险坚守，蒙古军久攻不下；
 * 蒙哥卒于城下，蒙古诸军北撤，南宋得以延续。
 * 蒙哥军兵力无确载；「围城五月」「蒙哥卒于军中」为史载。
 * 地名古今对照：钓鱼城今重庆合川东、合州今重庆合川、利州今四川广元。
 */
var COLOR = { meng: '#2b5262', song: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'lizhou',      name: '利州',   x: 168, y: 82,  tx: 168, ty: 68,  anchor: 'middle' },
  { id: 'chengdu',     name: '成都',   x: 122, y: 178, tx: 122, ty: 164, anchor: 'middle' },
  { id: 'diaoyucheng', name: '钓鱼城', x: 226, y: 188, tx: 226, ty: 174, anchor: 'middle' },
  { id: 'hezhou',      name: '合州',   x: 242, y: 212, tx: 256, ty: 220, anchor: 'start' },
  { id: 'chongqing',   name: '重庆',   x: 202, y: 264, tx: 188, ty: 272, anchor: 'end' }
];

var BASE0 = { lizhou: 'meng', chengdu: 'song', diaoyucheng: 'song', hezhou: 'song', chongqing: 'song' };
var BASE1 = { lizhou: 'meng', chengdu: 'meng', diaoyucheng: 'song', hezhou: 'song', chongqing: 'song' };
var BASE2 = { lizhou: 'meng', chengdu: 'meng', diaoyucheng: 'song', hezhou: 'meng', chongqing: 'song' };
var BASE4 = { lizhou: 'meng', chengdu: 'meng', diaoyucheng: 'song', hezhou: 'song', chongqing: 'song' };

var STAGES = [
  {
    label: '蒙军入蜀', seal: '南下',
    kicker: '阶段一 · 1258 年',
    title: '蒙哥率军入蜀，分道南侵',
    turn: '蒙哥亲率主力入蜀，攻利州、破成都；蒙古军分道南侵，兵锋直指合州。',
    why: '蒙古企图以四川为突破口顺江东下；若钓鱼城不失，蒙军便无法安稳进入长江水道。',
    src: '《元史·宪宗本纪》；《宋史·王坚传》。',
    events: [
      { time: '1258', who: '蒙哥', text: '率主力入蜀', t: 0.08 },
      { time: '1258', who: '蒙古军', text: '破成都', t: 0.34, kind: 'flip', city: 'chengdu' },
      { time: '1258', who: '蒙古军', text: '分道南侵', t: 0.58 },
      { time: '1258', who: '宋军', text: '退守合州、钓鱼城', t: 0.84 }
    ],
    nums: [
      { label: '蒙古军', value: '无确载', kind: '无确载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '成都', value: '陷落', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { chengdu: 0.34 },
    markers: [
      { type: 'host', side: 'meng', x: 168, y: 82, t: 0.02, name: '蒙哥', lx: 182, ly: 76, anchor: 'start' },
      { type: 'host', side: 'song', x: 226, y: 188, t: 0.02, name: '王坚', lx: 240, ly: 182, anchor: 'start' },
      { type: 'army', side: 'meng', x: 140, y: 140, t: 0.34, name: '蒙古军', lx: 126, ly: 134, anchor: 'end' }
    ],
    routes: [
      { d: 'M 172 88 C 158 114 146 148 138 170', side: 'meng', t0: 0.10, t1: 0.52,
        label: '蒙军入蜀', lx: 158, ly: 118, anchor: 'end' }
    ]
  },
  {
    label: '围攻钓鱼城', seal: '围城',
    kicker: '阶段二 · 1259 年',
    title: '蒙哥围钓鱼城，王坚坚守',
    turn: '蒙古军进围钓鱼城，王坚、张珏凭山城之险坚守；蒙军屡攻不克，伤亡渐多。',
    why: '钓鱼城三面环水、一面据山，蒙军骑兵优势无从施展；久攻不下，师老兵疲。',
    src: '《宋史·王坚传》；《元史·宪宗本纪》。',
    events: [
      { time: '1259', who: '蒙哥', text: '进围钓鱼城', t: 0.08 },
      { time: '1259', who: '蒙古军', text: '攻合州', t: 0.34, kind: 'flip', city: 'hezhou' },
      { time: '1259', who: '王坚', text: '凭险坚守，屡挫蒙军', t: 0.58 },
      { time: '1259', who: '蒙古军', text: '屡攻不克', t: 0.84 }
    ],
    nums: [
      { label: '蒙古军', value: '无确载', kind: '无确载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '围城', value: '数月', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { hezhou: 0.34 },
    markers: [
      { type: 'host', side: 'meng', x: 242, y: 212, t: 0.30, name: '蒙哥', lx: 256, ly: 206, anchor: 'start' },
      { type: 'host', side: 'song', x: 226, y: 188, t: 0.02, name: '王坚', lx: 212, ly: 182, anchor: 'end' },
      { type: 'army', side: 'song', x: 232, y: 196, t: 0.34, name: '宋军', lx: 246, ly: 190, anchor: 'start' }
    ],
    routes: [
      { d: 'M 238 208 C 234 202 230 196 228 192', side: 'meng', t0: 0.10, t1: 0.50,
        label: '围攻', lx: 248, ly: 198, anchor: 'start' }
    ]
  },
  {
    label: '蒙哥卒于城下', seal: '解围',
    kicker: '阶段三 · 1259 年 七月',
    title: '蒙哥卒于军中，蒙古军北撤',
    turn: '蒙哥卒于钓鱼城下军中；蒙古诸军秘不发丧，陆续北撤，合州之围遂解。',
    why: '大汗一死，蒙古各支为争夺汗位纷纷回师；南宋因此获得喘息，钓鱼城被称为「上帝折鞭处」。',
    src: '《元史·宪宗本纪》；《宋史·王坚传》。死因有中炮、病卒等异说。',
    events: [
      { time: '1259·七月', who: '蒙哥', text: '卒于军中', t: 0.08 },
      { time: '1259·七月', who: '蒙古诸军', text: '秘不发丧', t: 0.34 },
      { time: '1259·七月', who: '蒙古军', text: '陆续北撤', t: 0.58 },
      { time: '1259·七月', who: '宋军', text: '合州之围遂解', t: 0.84 }
    ],
    nums: [
      { label: '蒙古军', value: '无确载', kind: '无确载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '蒙哥', value: '卒于军中', kind: '史载', n: null }
    ],
    hold: BASE2,
    markers: [
      { type: 'host', side: 'meng', x: 242, y: 212, t: 0.02, name: '蒙哥', lx: 256, ly: 206, anchor: 'start', weak: true },
      { type: 'host', side: 'song', x: 226, y: 188, t: 0.30, name: '王坚', lx: 212, ly: 194, anchor: 'end' },
      { type: 'army', side: 'meng', x: 200, y: 120, t: 0.58, name: '蒙古军', lx: 186, ly: 114, anchor: 'end' }
    ],
    routes: [
      { d: 'M 238 206 C 224 178 208 148 198 126', side: 'retreat', t0: 0.56, t1: 0.92,
        label: '蒙古北撤', lx: 232, ly: 162, anchor: 'start' }
    ]
  },
  {
    label: '合州复归', seal: '解围',
    kicker: '阶段四 · 1259 年',
    title: '蒙古撤军，合州复归宋',
    turn: '蒙古军北撤后，合州复归宋军控制；钓鱼城此后仍为川东屏障，直至南宋末年。',
    why: '钓鱼城守住的不只是一座山城，而是整个川东防线；蒙军此次南侵的战略目标落空。',
    src: '《宋史·王坚传》《度宗本纪》；《元史·宪宗本纪》。',
    events: [
      { time: '1259', who: '蒙古军', text: '退出合州', t: 0.08, kind: 'flip', city: 'hezhou' },
      { time: '1259', who: '宋军', text: '收复合州', t: 0.34 },
      { time: '1259', who: '王坚', text: '加固城防', t: 0.58 },
      { time: '1259', who: '钓鱼城', text: '仍为川东屏障', t: 0.84 }
    ],
    nums: [
      { label: '蒙古军', value: '无确载', kind: '无确载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '钓鱼城', value: '未陷', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { hezhou: 0.08 },
    markers: [
      { type: 'host', side: 'song', x: 226, y: 188, t: 0.02, name: '王坚', lx: 226, ly: 174, anchor: 'middle' },
      { type: 'host', side: 'meng', x: 168, y: 82, t: 0.30, name: '蒙古军', lx: 182, ly: 76, anchor: 'start', weak: true },
      { type: 'army', side: 'song', x: 242, y: 212, t: 0.34, name: '宋军', lx: 256, ly: 220, anchor: 'start' }
    ],
    routes: []
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 120 150 C 160 170 200 190 240 206', color: '#a8b6ab', width: 2.6 },
    { d: 'M 150 240 C 190 252 230 262 270 258 C 320 254 360 262 385 258', color: '#b6c3b6', width: 3 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 290 76 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 150, t: '岷　江', size: 8.5, color: '#46594f', ls: 2, serif: true },
    { x: 122, y: 258, t: '长　江', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '钓鱼城·今重庆合川东　合州·今重庆合川　利州·今四川广元', size: 6.6, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '川　东', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'diaoyucheng',
  title: '钓鱼城之战',
  kicker: '沙 盘 推 演',
  subtitle: '合州 · 钓鱼城',
  years: '1259',
  yearUnit: 'AD',
  era: '南宋 · 开庆元年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：钓鱼城今重庆合川东、合州今重庆合川，非真实地理比例',
  hook: '王坚坚守钓鱼城，蒙哥卒于城下，蒙古诸军北撤',
  period: '蒙宋',
  yearValue: 1259,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '宋', b: '守', sub: '1259' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
