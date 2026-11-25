/**
 * 沙盘推演 · 鄱阳湖之战（1363）
 * 通行叙事：陈友谅围洪都，朱元璋自应天率军来援；两军决战于鄱阳湖康郎山，
 * 朱军纵火焚舟，陈军大溃；陈友谅中流矢死，九江归降。
 * 陈军「号六十万」为史载；朱军兵力无确载。
 * 地名古今对照：洪都今江西南昌、康郎山今江西余干西北、应天今江苏南京。
 */
var COLOR = { zhu: '#2b5262', chen: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'yingtian',     name: '应天',   x: 300, y: 108, tx: 300, ty: 94,  anchor: 'middle' },
  { id: 'jiujiang',     name: '九江',   x: 200, y: 140, tx: 186, ty: 134, anchor: 'end' },
  { id: 'hongdu',       name: '洪都',   x: 240, y: 182, tx: 254, ty: 176, anchor: 'start' },
  { id: 'poyanghu',     name: '鄱阳湖', x: 250, y: 216, tx: 264, ty: 224, anchor: 'start' },
  { id: 'kanglangshan', name: '康郎山', x: 264, y: 238, tx: 278, ty: 246, anchor: 'start' }
];

var BASE0 = { yingtian: 'zhu', jiujiang: 'chen', hongdu: 'zhu', poyanghu: 'chen', kanglangshan: 'chen' };
var BASE1 = { yingtian: 'zhu', jiujiang: 'chen', hongdu: 'contested', poyanghu: 'chen', kanglangshan: 'chen' };
var BASE2 = { yingtian: 'zhu', jiujiang: 'chen', hongdu: 'contested', poyanghu: 'contested', kanglangshan: 'chen' };
var BASE3 = { yingtian: 'zhu', jiujiang: 'chen', hongdu: 'zhu', poyanghu: 'zhu', kanglangshan: 'zhu' };
var BASE4 = { yingtian: 'zhu', jiujiang: 'zhu', hongdu: 'zhu', poyanghu: 'zhu', kanglangshan: 'zhu' };

var STAGES = [
  {
    label: '陈友谅围洪都', seal: '围城',
    kicker: '阶段一 · 1363 年 四月',
    title: '陈友谅号称六十万，围洪都',
    turn: '陈友谅率舟师号称六十万，围攻洪都；守将朱文正、邓愈拒守，城久攻不下。',
    why: '洪都是朱元璋在江西的支点，一旦失守，应天西面便门户洞开；朱文正的坚守为朱元璋赢得了集结时间。',
    src: '《明史·太祖本纪》《朱文正传》《陈友谅传》。',
    events: [
      { time: '1363·四月', who: '陈友谅', text: '号称六十万，围洪都', t: 0.08 },
      { time: '1363·四月', who: '陈军', text: '连日猛攻', t: 0.34, kind: 'flip', city: 'hongdu' },
      { time: '1363·四月', who: '朱文正', text: '拒守不下', t: 0.58 },
      { time: '1363·四月', who: '朱元璋', text: '自应天率军来援', t: 0.84 }
    ],
    nums: [
      { label: '陈军', value: '号六十万', kind: '史载', n: null },
      { label: '朱军', value: '无确载', kind: '无确载', n: null },
      { label: '洪都', value: '被围', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { hongdu: 0.34 },
    markers: [
      { type: 'host', side: 'chen', x: 240, y: 182, t: 0.30, name: '陈友谅', lx: 254, ly: 176, anchor: 'start' },
      { type: 'host', side: 'zhu', x: 240, y: 182, t: 0.02, name: '朱文正', lx: 226, ly: 190, anchor: 'end', weak: true },
      { type: 'host', side: 'zhu', x: 300, y: 108, t: 0.02, name: '朱元璋', lx: 314, ly: 102, anchor: 'start' }
    ],
    routes: [
      { d: 'M 296 114 C 280 134 262 158 248 176', side: 'zhu', t0: 0.78, t1: 0.96,
        label: '朱元璋来援', lx: 288, ly: 140, anchor: 'start' }
    ]
  },
  {
    label: '决战鄱阳湖', seal: '水战',
    kicker: '阶段二 · 1363 年 七月',
    title: '两军决战鄱阳湖',
    turn: '朱元璋率舟师入鄱阳湖，与陈友谅大战于康郎山；陈军舟大，朱军舟小，初战不利。',
    why: '陈军巨舰连锁，利于正面冲撞；朱军小船机动，须以火攻与分割破其阵。',
    src: '《明史·太祖本纪》《陈友谅传》；《国初事迹》。',
    events: [
      { time: '1363·七月', who: '朱元璋', text: '率舟师入鄱阳湖', t: 0.08, kind: 'flip', city: 'poyanghu' },
      { time: '1363·七月', who: '陈友谅', text: '以巨舰连锁迎战', t: 0.34 },
      { time: '1363·七月', who: '朱军', text: '初战不利', t: 0.58 },
      { time: '1363·七月', who: '两军', text: '大战于康郎山', t: 0.84 }
    ],
    nums: [
      { label: '陈军', value: '号六十万', kind: '史载', n: null },
      { label: '朱军', value: '无确载', kind: '无确载', n: null },
      { label: '战场', value: '康郎山', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { poyanghu: 0.08 },
    markers: [
      { type: 'host', side: 'zhu', x: 250, y: 216, t: 0.30, name: '朱元璋', lx: 236, ly: 210, anchor: 'end' },
      { type: 'host', side: 'chen', x: 264, y: 238, t: 0.02, name: '陈友谅', lx: 278, ly: 232, anchor: 'start' },
      { type: 'army', side: 'chen', x: 272, y: 224, t: 0.34, name: '陈军', lx: 286, ly: 218, anchor: 'start' }
    ],
    routes: [
      { d: 'M 256 220 C 260 226 262 232 264 236', side: 'zhu', t0: 0.10, t1: 0.50,
        label: '朱军进击', lx: 244, ly: 228, anchor: 'end' }
    ]
  },
  {
    label: '火攻破敌', seal: '火攻',
    kicker: '阶段三 · 1363 年 七月',
    title: '朱军纵火焚舟，陈军大溃',
    turn: '朱军以火舟冲阵，乘风纵火，陈军巨舰连锁不能散，焚溺死者甚众，阵势大乱。',
    why: '巨舰连锁本为拒敌，反成火攻的靶子；一把火将陈军的数量优势烧成累赘。',
    src: '《明史·太祖本纪》《陈友谅传》；《国初事迹》。',
    events: [
      { time: '1363·七月', who: '朱军', text: '以火舟冲阵', t: 0.08 },
      { time: '1363·七月', who: '朱军', text: '乘风纵火', t: 0.34 },
      { time: '1363·七月', who: '陈军', text: '巨舰连锁，焚溺甚众', t: 0.58, kind: 'flip', city: 'kanglangshan' },
      { time: '1363·七月', who: '陈军', text: '阵势大乱', t: 0.84 }
    ],
    nums: [
      { label: '陈军', value: '号六十万', kind: '史载', n: null },
      { label: '朱军', value: '无确载', kind: '无确载', n: null },
      { label: '战术', value: '火攻', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { kanglangshan: 0.58 },
    sieges: [
      { x: 264, y: 238, t: 0.58, label: '陈军溃', side: 'zhu', lx: 12, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'zhu', x: 264, y: 238, t: 0.30, name: '朱元璋', lx: 250, ly: 232, anchor: 'end' },
      { type: 'host', side: 'chen', x: 264, y: 238, t: 0.02, name: '陈友谅', lx: 278, ly: 246, anchor: 'start', weak: true },
      { type: 'army', side: 'zhu', x: 276, y: 228, t: 0.34, name: '火舟', lx: 290, ly: 222, anchor: 'start' }
    ],
    routes: [
      { d: 'M 270 232 C 268 234 266 236 266 238', side: 'zhu', t0: 0.12, t1: 0.52,
        label: '纵火', lx: 282, ly: 232, anchor: 'start' }
    ]
  },
  {
    label: '陈友谅死', seal: '定局',
    kicker: '阶段四 · 1363 年 八月',
    title: '陈友谅中流矢死，九江归降',
    turn: '陈友谅突围，中流矢死；其军溃散，九江等地相继归降。朱元璋尽有江西。',
    why: '陈友谅一死，群龙无首，陈汉政权土崩瓦解；朱元璋由此成为南方最强势力。',
    src: '《明史·太祖本纪》《陈友谅传》。',
    events: [
      { time: '1363·八月', who: '陈友谅', text: '突围中流矢死', t: 0.08 },
      { time: '1363·八月', who: '陈军', text: '群龙无首，溃散', t: 0.34 },
      { time: '1363·八月', who: '九江', text: '归降', t: 0.58, kind: 'flip', city: 'jiujiang' },
      { time: '1363·八月', who: '朱元璋', text: '尽有江西', t: 0.84 }
    ],
    nums: [
      { label: '陈军', value: '号六十万', kind: '史载', n: null },
      { label: '朱军', value: '无确载', kind: '无确载', n: null },
      { label: '陈友谅', value: '中流矢死', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { jiujiang: 0.58 },
    markers: [
      { type: 'host', side: 'zhu', x: 300, y: 108, t: 0.30, name: '朱元璋', lx: 314, ly: 102, anchor: 'start' },
      { type: 'host', side: 'chen', x: 264, y: 238, t: 0.02, name: '陈友谅', lx: 278, ly: 232, anchor: 'start', weak: true },
      { type: 'army', side: 'zhu', x: 220, y: 170, t: 0.58, name: '朱军', lx: 206, ly: 164, anchor: 'end' }
    ],
    routes: []
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 236 150 C 244 180 250 206 256 230 C 262 256 268 280 276 310', color: '#a8b6ab', width: 2.6 },
    { d: 'M 140 260 C 180 254 220 262 260 256 C 300 250 340 258 385 254', color: '#b6c3b6', width: 3 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 310 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 330 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 260, t: '长　江', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 250, y: 300, t: '鄱 阳 湖', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '洪都·今江西南昌　康郎山·今江西余干西北　应天·今江苏南京', size: 6.6, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '江　西', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'poyanghu',
  title: '鄱阳湖之战',
  kicker: '沙 盘 推 演',
  subtitle: '洪都 · 鄱阳湖',
  years: '1363',
  yearUnit: 'AD',
  era: '元末 · 至正二十三年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：洪都今江西南昌、康郎山今江西余干西北，非真实地理比例',
  hook: '朱元璋火攻破陈友谅巨舰，陈友谅中流矢死，江西尽定',
  period: '元末',
  yearValue: 1363,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '朱', b: '胜', sub: '1363' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
