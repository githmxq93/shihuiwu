/**
 * 沙盘推演 · 参合陂之战（395）
 * 通行叙事：后燕慕容宝率八万伐魏，拓跋珪避锋西徙；慕容垂病讯传来，燕军烧船夜遁；
 * 拓跋珪追及参合陂，夜袭燕营，燕军大溃，死者数万；次年慕容垂亲征复仇，归途病卒。
 * 燕军八万、魏军精骑二万、被俘四五万为史载。
 * 地名古今对照：参合陂今内蒙古凉城东北、盛乐今内蒙古和林格尔、平城今山西大同。
 */
var COLOR = { wei: '#2b5262', yan: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'zhongshan', name: '中山',   x: 300, y: 300, tx: 300, ty: 316, anchor: 'middle' },
  { id: 'wuyuan',    name: '五原',   x: 92,  y: 214, tx: 78,  ty: 222, anchor: 'end' },
  { id: 'yunzhong',  name: '云中',   x: 140, y: 172, tx: 126, ty: 180, anchor: 'end' },
  { id: 'canhepi',   name: '参合陂', x: 182, y: 148, tx: 196, ty: 142, anchor: 'start' },
  { id: 'pingcheng', name: '平城',   x: 228, y: 196, tx: 228, ty: 212, anchor: 'middle' },
  { id: 'shengle',   name: '盛乐',   x: 118, y: 128, tx: 118, ty: 114, anchor: 'middle' }
];

var BASE0 = { zhongshan: 'yan', wuyuan: 'wei', yunzhong: 'wei', canhepi: 'wei', pingcheng: 'wei', shengle: 'wei' };
var BASE1 = { zhongshan: 'yan', wuyuan: 'wei', yunzhong: 'wei', canhepi: 'wei', pingcheng: 'wei', shengle: 'wei' };
var BASE2 = { zhongshan: 'yan', wuyuan: 'yan', yunzhong: 'wei', canhepi: 'wei', pingcheng: 'wei', shengle: 'wei' };
var BASE3 = { zhongshan: 'yan', wuyuan: 'wei', yunzhong: 'wei', canhepi: 'wei', pingcheng: 'wei', shengle: 'wei' };
var BASE4 = { zhongshan: 'yan', wuyuan: 'wei', yunzhong: 'wei', canhepi: 'wei', pingcheng: 'wei', shengle: 'wei' };
var BASE5 = { zhongshan: 'yan', wuyuan: 'wei', yunzhong: 'wei', canhepi: 'wei', pingcheng: 'yan', shengle: 'wei' };

var STAGES = [
  {
    label: '燕军伐魏', seal: '北伐',
    kicker: '阶段一 · 395 年 五月',
    title: '慕容宝率八万伐魏',
    turn: '后燕慕容垂遣慕容宝、慕容农、慕容麟率步骑八万自中山出发伐魏，慕容德、慕容绍率步骑一万八千为后继。',
    why: '后燕欲乘北魏羽翼未丰一举削平；八万之众北上，是燕军倾国之举。',
    src: '《晋书·慕容宝载记》；《资治通鉴》卷一百八。「步骑八万」为史载。',
    events: [
      { time: '395·五月', who: '慕容垂', text: '遣慕容宝率八万伐魏', t: 0.08 },
      { time: '395·五月', who: '慕容宝', text: '自中山出发北上', t: 0.34 },
      { time: '395·五月', who: '慕容德', text: '率一万八千为后继', t: 0.58 },
      { time: '395·五月', who: '后燕', text: '军至五原', t: 0.84 }
    ],
    nums: [
      { label: '燕军', value: '步骑八万', kind: '史载', n: 80 },
      { label: '后继', value: '一万八千', kind: '史载', n: 18 },
      { label: '魏军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'yan', x: 300, y: 300, t: 0.02, name: '慕容宝', lx: 286, ly: 294, anchor: 'end' },
      { type: 'host', side: 'wei', x: 118, y: 128, t: 0.02, name: '拓跋珪', lx: 132, ly: 122, anchor: 'start' },
      { type: 'army', side: 'yan', x: 140, y: 186, t: 0.56, name: '燕军', lx: 154, ly: 192, anchor: 'start' }
    ],
    routes: [
      { d: 'M 292 296 C 240 276 180 240 100 218', side: 'yan', t0: 0.24, t1: 0.78,
        label: '燕军西进', lx: 206, ly: 246, anchor: 'middle' }
    ]
  },
  {
    label: '魏军避锋', seal: '西徙',
    kicker: '阶段二 · 395 年',
    title: '拓跋珪徙部落，避而不战',
    turn: '拓跋珪闻燕军大至，徙部落畜产西渡黄河，避战千余里；燕军进据五原，收降魏别部三万余家。',
    why: '魏军兵力不及燕军，硬拼不利；拓跋珪以空间换时间，等燕军师老粮尽。',
    src: '《魏书·太祖纪》；《资治通鉴》卷一百八。「徙部落西渡河」为史载。',
    events: [
      { time: '395', who: '拓跋珪', text: '徙部落畜产西渡河', t: 0.08 },
      { time: '395', who: '魏军', text: '避战千余里', t: 0.34 },
      { time: '395', who: '燕军', text: '进据五原', t: 0.58, kind: 'flip', city: 'wuyuan' },
      { time: '395', who: '魏别部', text: '三万余家降燕', t: 0.84 }
    ],
    nums: [
      { label: '燕军', value: '步骑八万', kind: '史载', n: 80 },
      { label: '降燕', value: '三万余家', kind: '史载', n: null },
      { label: '魏军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE2,
    flips: { wuyuan: 0.58 },
    markers: [
      { type: 'host', side: 'yan', x: 92, y: 214, t: 0.30, name: '慕容宝', lx: 106, ly: 208, anchor: 'start' },
      { type: 'host', side: 'wei', x: 118, y: 128, t: 0.02, name: '拓跋珪', lx: 132, ly: 122, anchor: 'start' },
      { type: 'army', side: 'wei', x: 104, y: 158, t: 0.34, name: '魏部众', lx: 90, ly: 150, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 120 134 C 114 150 108 168 104 184', side: 'wei', t0: 0.06, t1: 0.44,
        label: '西徙避战', lx: 132, ly: 164, anchor: 'start' }
    ]
  },
  {
    label: '燕军夜遁', seal: '退师',
    kicker: '阶段三 · 395 年 十月',
    title: '慕容垂病讯至，燕军烧船夜遁',
    turn: '慕容垂病重消息传到军中，慕容宝恐军心浮动，烧毁渡船连夜退兵；慕容麟部将谋叛，燕军自相惊扰。',
    why: '主帅病危、后路未定，燕军未战先乱；退兵既无殿后部署，也未察觉魏军尾随。',
    src: '《晋书·慕容宝载记》；《资治通鉴》卷一百八。「烧船夜遁」为史载。',
    events: [
      { time: '395·十月', who: '慕容垂', text: '病重消息传至军中', t: 0.08 },
      { time: '395·十月', who: '慕容宝', text: '烧船夜遁', t: 0.34 },
      { time: '395·十月', who: '燕军', text: '弃五原东退', t: 0.58, kind: 'flip', city: 'wuyuan' },
      { time: '395·十月', who: '慕容麟', text: '部将谋叛，军心自乱', t: 0.84 }
    ],
    nums: [
      { label: '燕军', value: '步骑八万', kind: '史载', n: 80 },
      { label: '魏军', value: '无确载', kind: '无确载', n: null },
      { label: '退兵', value: '夜遁', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { wuyuan: 0.58 },
    markers: [
      { type: 'host', side: 'yan', x: 160, y: 190, t: 0.34, name: '慕容宝', lx: 174, ly: 184, anchor: 'start', weak: true },
      { type: 'host', side: 'wei', x: 118, y: 128, t: 0.02, name: '拓跋珪', lx: 132, ly: 122, anchor: 'start' },
      { type: 'army', side: 'wei', x: 140, y: 158, t: 0.74, name: '魏军尾随', lx: 126, ly: 150, anchor: 'end' }
    ],
    routes: [
      { d: 'M 100 216 C 124 210 148 202 168 194', side: 'retreat', t0: 0.34, t1: 0.74,
        label: '燕军东退', lx: 128, ly: 214, anchor: 'middle' },
      { d: 'M 122 134 C 134 148 144 160 152 174', side: 'wei', t0: 0.60, t1: 0.92,
        label: '魏军尾随', lx: 108, ly: 162, anchor: 'end' }
    ]
  },
  {
    label: '参合陂夜袭', seal: '大破',
    kicker: '阶段四 · 395 年 十一月',
    title: '拓跋珪追及参合陂，夜袭燕营',
    turn: '拓跋珪选精骑二万追击，于参合陂追及燕军；魏军夜袭燕营，燕军大溃，死者数万，被俘四五万，慕容宝单骑走免。',
    why: '燕军背水宿营、毫无戒备，魏军以精骑夜袭，一鼓而溃；八万大军至此丧失殆尽。',
    src: '《魏书·太祖纪》；《资治通鉴》卷一百八。「坑杀四五万」为史载。',
    events: [
      { time: '395·十一月', who: '拓跋珪', text: '选精骑二万追击', t: 0.08 },
      { time: '395·十一月', who: '魏军', text: '追及参合陂', t: 0.34 },
      { time: '395·十一月', who: '魏军', text: '夜袭燕营，燕军大溃', t: 0.58 },
      { time: '395·十一月', who: '慕容宝', text: '单骑走免，燕军死者数万', t: 0.84 }
    ],
    nums: [
      { label: '魏军', value: '精骑二万', kind: '史载', n: 20 },
      { label: '燕军', value: '步骑八万', kind: '史载', n: 80 },
      { label: '被俘', value: '四五万', kind: '史载', n: null }
    ],
    hold: BASE4,
    sieges: [
      { x: 182, y: 148, t: 0.58, label: '夜袭', side: 'wei', lx: 12, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'wei', x: 182, y: 148, t: 0.30, name: '拓跋珪', lx: 196, ly: 156, anchor: 'start' },
      { type: 'host', side: 'yan', x: 182, y: 148, t: 0.02, name: '慕容宝', lx: 196, ly: 132, anchor: 'start', weak: true },
      { type: 'army', side: 'wei', x: 152, y: 162, t: 0.34, name: '魏军', lx: 138, ly: 156, anchor: 'end' }
    ],
    routes: [
      { d: 'M 122 132 C 140 138 162 144 178 148', side: 'wei', t0: 0.10, t1: 0.54,
        label: '精骑追击', lx: 138, ly: 128, anchor: 'middle' }
    ]
  },
  {
    label: '慕容垂复仇', seal: '复仇',
    kicker: '阶段五 · 396 年',
    title: '慕容垂亲征，归途病卒',
    turn: '慕容垂亲率大军伐魏，攻破平城，收燕军骸骨设祭；归途病卒于上谷沮阳，后燕自此由盛转衰。',
    why: '慕容垂此役只为雪参合陂之耻，虽得一胜，却未能扭转燕弱魏强的走势。',
    src: '《晋书·慕容垂载记》；《资治通鉴》卷一百八。「收骸骨设祭」为史载。',
    events: [
      { time: '396·三月', who: '慕容垂', text: '亲率大军伐魏', t: 0.08 },
      { time: '396·三月', who: '燕军', text: '攻破平城', t: 0.34, kind: 'flip', city: 'pingcheng' },
      { time: '396·三月', who: '慕容垂', text: '收燕军骸骨设祭', t: 0.58 },
      { time: '396·四月', who: '慕容垂', text: '归途病卒', t: 0.84 }
    ],
    nums: [
      { label: '燕军', value: '无确载', kind: '无确载', n: null },
      { label: '平城', value: '克', kind: '史载', n: null },
      { label: '慕容垂', value: '病卒', kind: '史载', n: null }
    ],
    hold: BASE5,
    flips: { pingcheng: 0.34 },
    sieges: [
      { x: 228, y: 196, t: 0.34, label: '克平城', side: 'yan', lx: 12, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'yan', x: 228, y: 196, t: 0.30, name: '慕容垂', lx: 242, ly: 190, anchor: 'start' },
      { type: 'host', side: 'wei', x: 118, y: 128, t: 0.02, name: '拓跋珪', lx: 132, ly: 122, anchor: 'start', weak: true },
      { type: 'army', side: 'yan', x: 262, y: 244, t: 0.10, name: '燕军', lx: 248, ly: 252, anchor: 'end' }
    ],
    routes: [
      { d: 'M 296 296 C 276 264 250 222 232 202', side: 'yan', t0: 0.08, t1: 0.44,
        label: '燕军北上', lx: 250, ly: 268, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 62 40 C 74 110 80 190 70 260 C 66 300 74 340 88 386', color: '#a8b6ab', width: 3 },
    { d: 'M -10 250 C 70 244 150 250 230 244 C 300 238 350 242 385 246', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 190 62 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 250 70 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 60 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 300 350 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 40, y: 208, t: '黄　河', size: 9, color: '#46594f', ls: 2, serif: true, rotate: 78 },
    { x: 268, y: 236, t: '阴 山 南 麓', size: 8.5, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '参合陂·今内蒙古凉城东北　盛乐·今内蒙古和林格尔　平城·今山西大同', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '代　北', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'canhepi',
  title: '参合陂之战',
  kicker: '沙 盘 推 演',
  subtitle: '五原 · 参合陂',
  years: '395–396',
  yearUnit: 'AD',
  era: '十六国 · 后燕建兴十年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：参合陂今内蒙古凉城东北、盛乐今内蒙古和林格尔，非真实地理比例',
  hook: '燕军八万伐魏，慕容垂病讯至而夜遁，拓跋珪追及参合陂，一战覆燕军',
  period: '十六国',
  yearValue: 395,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '魏', b: '胜', sub: '395' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
