/**
 * 沙盘推演 · 虎门之战（1841）
 * 通行叙事：英军攻虎门要塞，关天培率军死守；英军船炮优势明显，
 * 虎门各炮台相继失守，关天培力战殉国，英军进逼广州。
 * 英军兵力无确载；「关天培殉国」为史载。
 * 地名古今对照：虎门今广东东莞虎门、穿鼻洋今广东珠江口外、香港今香港。
 */
var COLOR = { qing: '#2b5262', britain: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'guangzhou', name: '广州',   x: 196, y: 232, tx: 182, ty: 226, anchor: 'end' },
  { id: 'humen',     name: '虎门',   x: 218, y: 198, tx: 204, ty: 192, anchor: 'end' },
  { id: 'chuanbi',   name: '穿鼻洋', x: 232, y: 176, tx: 246, ty: 170, anchor: 'start' },
  { id: 'xianggang', name: '香港',   x: 252, y: 226, tx: 266, ty: 234, anchor: 'start' },
  { id: 'aomen',     name: '澳门',   x: 184, y: 262, tx: 170, ty: 270, anchor: 'end' }
];

var BASE0 = { guangzhou: 'qing', humen: 'qing', chuanbi: 'qing', xianggang: 'qing', aomen: 'qing' };
var BASE1 = { guangzhou: 'qing', humen: 'contested', chuanbi: 'qing', xianggang: 'qing', aomen: 'qing' };
var BASE3 = { guangzhou: 'qing', humen: 'britain', chuanbi: 'britain', xianggang: 'qing', aomen: 'qing' };
var BASE4 = { guangzhou: 'contested', humen: 'britain', chuanbi: 'britain', xianggang: 'britain', aomen: 'qing' };

var STAGES = [
  {
    label: '英军来攻', seal: '来攻',
    kicker: '阶段一 · 1841 年 一月',
    title: '英军溯珠江口而上，攻虎门',
    turn: '英军舰队溯珠江口而上，攻虎门要塞；关天培督军据炮台拒守。',
    why: '虎门是广州的海上门户，虎门一失，英军便可直抵广州城下。',
    src: '《清史稿·关天培传》；《鸦片战争档案史料》。',
    events: [
      { time: '1841·一月', who: '英军舰队', text: '溯珠江口而上', t: 0.08 },
      { time: '1841·一月', who: '英军', text: '攻虎门要塞', t: 0.34, kind: 'flip', city: 'humen' },
      { time: '1841·一月', who: '关天培', text: '督军据炮台拒守', t: 0.58 },
      { time: '1841·一月', who: '清军', text: '发炮还击', t: 0.84 }
    ],
    nums: [
      { label: '英军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '虎门', value: '门户', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { humen: 0.34 },
    markers: [
      { type: 'host', side: 'britain', x: 232, y: 176, t: 0.30, name: '英军', lx: 246, ly: 170, anchor: 'start' },
      { type: 'host', side: 'qing', x: 218, y: 198, t: 0.02, name: '关天培', lx: 204, ly: 192, anchor: 'end' },
      { type: 'army', side: 'qing', x: 208, y: 214, t: 0.58, name: '清军', lx: 194, ly: 208, anchor: 'end' }
    ],
    routes: [
      { d: 'M 228 182 C 226 188 222 194 220 198', side: 'britain', t0: 0.10, t1: 0.50,
        label: '英军进逼', lx: 238, ly: 190, anchor: 'start' }
    ]
  },
  {
    label: '关天培死守', seal: '死守',
    kicker: '阶段二 · 1841 年 二月',
    title: '关天培死守虎门炮台',
    turn: '英军以舰炮轰击，清军炮台多被摧毁；关天培亲督士卒，力战不退。',
    why: '清军火炮射程与射速均不及英舰，据台死守只能延缓、无法扭转战局。',
    src: '《清史稿·关天培传》；《鸦片战争档案史料》。',
    events: [
      { time: '1841·二月', who: '英军', text: '以舰炮轰击炮台', t: 0.08 },
      { time: '1841·二月', who: '清军', text: '炮台多被摧毁', t: 0.34 },
      { time: '1841·二月', who: '关天培', text: '亲督士卒，力战不退', t: 0.58 },
      { time: '1841·二月', who: '清军', text: '伤亡惨重', t: 0.84 }
    ],
    nums: [
      { label: '英军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '炮台', value: '多毁', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'britain', x: 232, y: 176, t: 0.02, name: '英军', lx: 246, ly: 170, anchor: 'start' },
      { type: 'host', side: 'qing', x: 218, y: 198, t: 0.30, name: '关天培', lx: 204, ly: 204, anchor: 'end' },
      { type: 'army', side: 'britain', x: 226, y: 186, t: 0.34, name: '英舰', lx: 240, ly: 180, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '虎门失守', seal: '失守',
    kicker: '阶段三 · 1841 年 二月',
    title: '虎门炮台失守，关天培殉国',
    turn: '英军登陆，攻破虎门各炮台；关天培身被数十创，力战殉国。虎门失守。',
    why: '虎门一失，广州门户洞开；清廷的沿海防线在英军舰炮面前暴露出全面落后。',
    src: '《清史稿·关天培传》；《鸦片战争档案史料》。',
    events: [
      { time: '1841·二月', who: '英军', text: '登陆攻炮台', t: 0.08 },
      { time: '1841·二月', who: '英军', text: '攻破虎门各炮台', t: 0.34, kind: 'flip', city: 'humen' },
      { time: '1841·二月', who: '关天培', text: '身被数十创，力战殉国', t: 0.58 },
      { time: '1841·二月', who: '穿鼻洋', text: '相继失守', t: 0.84, kind: 'flip', city: 'chuanbi' }
    ],
    nums: [
      { label: '英军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '关天培', value: '殉国', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { humen: 0.34, chuanbi: 0.84 },
    sieges: [
      { x: 218, y: 198, t: 0.34, label: '虎门破', side: 'britain', lx: 12, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'britain', x: 218, y: 198, t: 0.30, name: '英军', lx: 232, ly: 192, anchor: 'start' },
      { type: 'host', side: 'qing', x: 218, y: 198, t: 0.02, name: '关天培', lx: 204, ly: 204, anchor: 'end', weak: true },
      { type: 'army', side: 'britain', x: 224, y: 186, t: 0.34, name: '英军', lx: 238, ly: 180, anchor: 'start' }
    ],
    routes: [
      { d: 'M 226 182 C 224 186 222 190 220 194', side: 'britain', t0: 0.10, t1: 0.50,
        label: '登陆', lx: 236, ly: 188, anchor: 'start' }
    ]
  },
  {
    label: '进逼广州', seal: '逼城',
    kicker: '阶段四 · 1841 年 三月',
    title: '英军进逼广州',
    turn: '英军占香港，溯江进逼广州；清廷震动，广东局势急转直下。',
    why: '虎门之战暴露了清军海防的全面落后；此后条约体系下的通商口岸格局逐渐形成。',
    src: '《清史稿·关天培传》《宣宗本纪》；《鸦片战争档案史料》。',
    events: [
      { time: '1841·三月', who: '英军', text: '占香港', t: 0.08, kind: 'flip', city: 'xianggang' },
      { time: '1841·三月', who: '英军', text: '溯江进逼广州', t: 0.34, kind: 'flip', city: 'guangzhou' },
      { time: '1841·三月', who: '清廷', text: '震动', t: 0.58 },
      { time: '1841·三月', who: '广东', text: '局势急转直下', t: 0.84 }
    ],
    nums: [
      { label: '英军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '香港', value: '被占', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { xianggang: 0.08, guangzhou: 0.34 },
    markers: [
      { type: 'host', side: 'britain', x: 252, y: 226, t: 0.30, name: '英军', lx: 266, ly: 234, anchor: 'start' },
      { type: 'host', side: 'qing', x: 196, y: 232, t: 0.02, name: '清军', lx: 182, ly: 226, anchor: 'end', weak: true },
      { type: 'army', side: 'britain', x: 226, y: 214, t: 0.34, name: '英舰', lx: 240, ly: 208, anchor: 'start' }
    ],
    routes: [
      { d: 'M 246 220 C 236 222 226 226 218 228', side: 'britain', t0: 0.10, t1: 0.54,
        label: '进逼广州', lx: 240, ly: 232, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 170 140 C 190 180 210 220 230 260 C 240 280 248 300 256 320', color: '#a8b6ab', width: 2.6 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 246, y: 300, t: '伶 仃 洋', size: 9, color: '#46594f', ls: 4, serif: true, rotate: 40 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '虎门·今广东东莞虎门　穿鼻洋·今广东珠江口外　香港·今香港', size: 6.4, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '粤　海', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'humen',
  title: '虎门之战',
  kicker: '沙 盘 推 演',
  subtitle: '珠江口 · 虎门',
  years: '1841',
  yearUnit: 'AD',
  era: '清 · 道光二十一年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：虎门今广东东莞虎门、穿鼻洋今广东珠江口外，非真实地理比例',
  hook: '英军攻虎门，关天培死守殉国，英军进逼广州',
  period: '清',
  yearValue: 1841,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '英', b: '胜', sub: '1841' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
