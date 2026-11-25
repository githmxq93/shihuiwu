/**
 * 沙盘推演 · 郾城之战（1140）
 * 通行叙事：岳飞北伐，收复颍昌等地；金兀术率拐子马、铁浮图直趋郾城，
 * 岳飞以麻扎刀斫马足，大破金军；旋被迫奉十二道金牌班师，河南复失。
 * 金军「拐子马万五千」为史载；岳家军兵力无确载。
 * 地名古今对照：郾城今河南漯河郾城区、颍昌今河南许昌、朱仙镇今河南开封南。
 */
var COLOR = { song: '#2b5262', jin: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'linan',       name: '临安',   x: 260, y: 320, tx: 260, ty: 336, anchor: 'middle' },
  { id: 'yancheng',    name: '郾城',   x: 190, y: 244, tx: 190, ty: 260, anchor: 'middle' },
  { id: 'yingchang',   name: '颍昌',   x: 208, y: 212, tx: 194, ty: 206, anchor: 'end' },
  { id: 'zhuxianzhen', name: '朱仙镇', x: 230, y: 186, tx: 216, ty: 180, anchor: 'end' },
  { id: 'kaifeng',     name: '开封',   x: 254, y: 168, tx: 254, ty: 154, anchor: 'middle' }
];

var BASE0 = { linan: 'song', yancheng: 'song', yingchang: 'jin', zhuxianzhen: 'jin', kaifeng: 'jin' };
var BASE1 = { linan: 'song', yancheng: 'song', yingchang: 'song', zhuxianzhen: 'jin', kaifeng: 'jin' };
var BASE2 = { linan: 'song', yancheng: 'contested', yingchang: 'song', zhuxianzhen: 'jin', kaifeng: 'jin' };
var BASE3 = { linan: 'song', yancheng: 'song', yingchang: 'song', zhuxianzhen: 'song', kaifeng: 'jin' };
var BASE4 = { linan: 'song', yancheng: 'song', yingchang: 'jin', zhuxianzhen: 'jin', kaifeng: 'jin' };

var STAGES = [
  {
    label: '岳飞北伐', seal: '北伐',
    kicker: '阶段一 · 1140 年',
    title: '岳飞北伐，收复颍昌',
    turn: '岳飞率岳家军自鄂州北伐，连败金军，收复颍昌、陈州等地；前锋逼近开封，中原震动。',
    why: '南宋立国以来，这是最接近收复中原的一次北伐；金军被迫集中主力迎击。',
    src: '《宋史·岳飞传》；《建炎以来系年要录》卷一百三十六。',
    events: [
      { time: '1140', who: '岳飞', text: '自鄂州率军北伐', t: 0.08 },
      { time: '1140', who: '岳家军', text: '连败金军', t: 0.34 },
      { time: '1140', who: '岳家军', text: '收复颍昌', t: 0.58, kind: 'flip', city: 'yingchang' },
      { time: '1140', who: '岳飞', text: '前锋逼近开封', t: 0.84 }
    ],
    nums: [
      { label: '岳家军', value: '无确载', kind: '无确载', n: null },
      { label: '金军', value: '无确载', kind: '无确载', n: null },
      { label: '颍昌', value: '收复', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { yingchang: 0.58 },
    markers: [
      { type: 'host', side: 'song', x: 208, y: 212, t: 0.30, name: '岳飞', lx: 222, ly: 206, anchor: 'start' },
      { type: 'host', side: 'jin', x: 254, y: 168, t: 0.02, name: '兀术', lx: 268, ly: 162, anchor: 'start' },
      { type: 'army', side: 'song', x: 196, y: 230, t: 0.34, name: '岳家军', lx: 182, ly: 224, anchor: 'end' }
    ],
    routes: [
      { d: 'M 194 240 C 198 232 202 222 206 214', side: 'song', t0: 0.20, t1: 0.56,
        label: '收复颍昌', lx: 180, ly: 226, anchor: 'end' }
    ]
  },
  {
    label: '郾城大战', seal: '来攻',
    kicker: '阶段二 · 1140 年 七月',
    title: '兀术率拐子马直趋郾城',
    turn: '金兀术耻于屡败，率拐子马万五千直趋郾城，欲一举击破岳家军指挥中枢。',
    why: '郾城是岳家军大本营，若被击破，整个北伐部署将全线动摇。',
    src: '《宋史·岳飞传》；《建炎以来系年要录》卷一百三十七。「拐子马万五千」为史载。',
    events: [
      { time: '1140·七月', who: '兀术', text: '耻于屡败，率军南下', t: 0.08 },
      { time: '1140·七月', who: '金军', text: '拐子马万五千直趋郾城', t: 0.34 },
      { time: '1140·七月', who: '岳飞', text: '遣子岳云先出迎战', t: 0.58 },
      { time: '1140·七月', who: '金军', text: '列阵郾城之外', t: 0.84, kind: 'flip', city: 'yancheng' }
    ],
    nums: [
      { label: '金军', value: '拐子马万五千', kind: '史载', n: 150 },
      { label: '岳家军', value: '无确载', kind: '无确载', n: null },
      { label: '郾城', value: '被攻', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { yancheng: 0.84 },
    markers: [
      { type: 'host', side: 'jin', x: 230, y: 186, t: 0.30, name: '兀术', lx: 244, ly: 180, anchor: 'start' },
      { type: 'host', side: 'song', x: 190, y: 244, t: 0.02, name: '岳飞', lx: 176, ly: 256, anchor: 'end' },
      { type: 'army', side: 'jin', x: 212, y: 210, t: 0.34, name: '拐子马', lx: 226, ly: 204, anchor: 'start' }
    ],
    routes: [
      { d: 'M 234 190 C 222 210 206 232 196 242', side: 'jin', t0: 0.20, t1: 0.72,
        label: '直趋郾城', lx: 236, ly: 214, anchor: 'start' }
    ]
  },
  {
    label: '大破拐子马', seal: '破阵',
    kicker: '阶段三 · 1140 年 七月',
    title: '岳飞以麻扎刀斫马足，大破金军',
    turn: '岳飞命步卒以麻扎刀入阵，勿仰视，专斫马足；拐子马相连，一马倒则一队俱废。金军大败，兀术遁去。',
    why: '拐子马以连环冲击见长，砍马足正好破其连环；岳家军步卒死战，抵消了骑兵的冲击优势。',
    src: '《宋史·岳飞传》；《建炎以来系年要录》卷一百三十七。「斫马足」为史载。',
    events: [
      { time: '1140·七月', who: '岳飞', text: '命步卒持麻扎刀入阵', t: 0.08 },
      { time: '1140·七月', who: '岳家军', text: '专斫马足，拐子马俱废', t: 0.34, kind: 'flip', city: 'yancheng' },
      { time: '1140·七月', who: '金军', text: '大败', t: 0.58 },
      { time: '1140·七月', who: '兀术', text: '遁去', t: 0.84 }
    ],
    nums: [
      { label: '金军', value: '拐子马万五千', kind: '史载', n: 150 },
      { label: '岳家军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '金军大败', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { yancheng: 0.34 },
    sieges: [
      { x: 190, y: 244, t: 0.34, label: '金军溃', side: 'song', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'song', x: 190, y: 244, t: 0.30, name: '岳飞', lx: 204, ly: 238, anchor: 'start' },
      { type: 'host', side: 'jin', x: 190, y: 244, t: 0.02, name: '兀术', lx: 176, ly: 232, anchor: 'end', weak: true },
      { type: 'army', side: 'song', x: 204, y: 232, t: 0.34, name: '岳家军', lx: 218, ly: 226, anchor: 'start' }
    ],
    routes: [
      { d: 'M 202 236 C 198 240 194 242 192 244', side: 'song', t0: 0.28, t1: 0.62,
        label: '斫马足', lx: 202, ly: 250, anchor: 'start' }
    ]
  },
  {
    label: '十二道金牌', seal: '班师',
    kicker: '阶段四 · 1140 年',
    title: '十二道金牌，岳飞班师',
    turn: '宋高宗、秦桧连发十二道金牌召岳飞班师；岳飞叹「十年之力，废于一旦」，退兵。所复州县复为金有。',
    why: '朝廷主和，前线再胜也无意义；岳家军一退，中原战局逆转。',
    src: '《宋史·岳飞传》；《建炎以来系年要录》卷一百三十七。',
    events: [
      { time: '1140', who: '宋高宗·秦桧', text: '连发十二道金牌', t: 0.08 },
      { time: '1140', who: '岳飞', text: '被迫班师', t: 0.34 },
      { time: '1140', who: '金军', text: '复取颍昌、朱仙镇', t: 0.58, kind: 'flip', city: 'yingchang' },
      { time: '1140', who: '宋', text: '所复州县复失', t: 0.84, kind: 'flip', city: 'zhuxianzhen' }
    ],
    nums: [
      { label: '金牌', value: '十二道', kind: '史载', n: null },
      { label: '岳家军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '班师', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { yingchang: 0.58, zhuxianzhen: 0.84 },
    markers: [
      { type: 'host', side: 'song', x: 250, y: 300, t: 0.30, name: '岳飞', lx: 264, ly: 294, anchor: 'start', weak: true },
      { type: 'host', side: 'jin', x: 254, y: 168, t: 0.02, name: '兀术', lx: 268, ly: 162, anchor: 'start' },
      { type: 'army', side: 'song', x: 220, y: 268, t: 0.10, name: '岳家军', lx: 206, ly: 262, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 194 250 C 208 270 228 290 244 302', side: 'retreat', t0: 0.14, t1: 0.62,
        label: '岳家军南撤', lx: 198, ly: 276, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 214 C 70 210 140 218 210 212 C 280 206 340 212 385 208', color: '#a8b6ab', width: 2.6 },
    { d: 'M 150 386 C 158 330 168 280 182 236', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 120 90 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 280 90 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 60 310 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 310 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 30, y: 208, t: '黄　河', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '郾城·今河南漯河郾城区　颍昌·今河南许昌　朱仙镇·今河南开封南', size: 6.6, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '中　原', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'yancheng',
  title: '郾城之战',
  kicker: '沙 盘 推 演',
  subtitle: '颍昌 · 郾城',
  years: '1140',
  yearUnit: 'AD',
  era: '南宋 · 绍兴十年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：郾城今河南漯河郾城区、颍昌今河南许昌，非真实地理比例',
  hook: '岳飞郾城破拐子马，正欲进图中原，十二道金牌迫其班师',
  period: '宋金',
  yearValue: 1140,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '金', b: '复', sub: '1140' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
