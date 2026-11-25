/**
 * 沙盘推演 · 牧野之战（前1046）
 * 通行叙事：武王观兵孟津、渡河誓师、牧野决战、商军倒戈、纣走鹿台。
 * 周军「戎车三百乘、虎贲三千、甲士四万五千」为《史记·周本纪》史载；
 * 商军「发兵七十万」与「十七万」二说并存，均标史载，学界多认为有所夸大。
 * 地名古今对照：牧野今河南淇县南、朝歌今河南淇县。
 */
var COLOR = { zhou: '#2b5262', shang: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'haojing', name: '镐京', x: 54,  y: 232, tx: 54,  ty: 246, anchor: 'middle' },
  { id: 'mengjin', name: '孟津', x: 188, y: 152, tx: 188, ty: 138, anchor: 'middle' },
  { id: 'muye',    name: '牧野', x: 252, y: 148, tx: 238, ty: 162, anchor: 'end' },
  { id: 'chaoge',  name: '朝歌', x: 286, y: 116, tx: 300, ty: 112, anchor: 'start' },
  { id: 'lutai',   name: '鹿台', x: 306, y: 92,  tx: 314, ty: 86,  anchor: 'start' }
];

var BASE1 = { haojing: 'zhou', mengjin: 'shang', muye: 'shang', chaoge: 'shang', lutai: 'shang' };
var BASE2 = { haojing: 'zhou', mengjin: 'zhou', muye: 'shang', chaoge: 'shang', lutai: 'shang' };
var BASE3 = { haojing: 'zhou', mengjin: 'zhou', muye: 'contested', chaoge: 'shang', lutai: 'shang' };
var BASE4 = { haojing: 'zhou', mengjin: 'zhou', muye: 'zhou', chaoge: 'zhou', lutai: 'zhou' };

var STAGES = [
  {
    label: '观兵', seal: '观兵',
    kicker: '阶段一 · 前1048 年',
    title: '武王观兵孟津',
    turn: '武王东观兵至孟津，八百诸侯不期而会，皆曰「纣可伐」；武王以「未知天命」还师，再候时机。',
    why: '观兵是一次政治与军事试探：既检验诸侯从周的意愿，也摸清商朝在东方诸侯中的号召力还剩多少。',
    src: '《史记·周本纪》；《尚书·泰誓》序。观兵之年有前1048、前1046 等说，此处取通行系年。',
    events: [
      { time: '前1048', who: '周武王', text: '东观兵，至孟津', t: 0.08 },
      { time: '前1048', who: '八百诸侯', text: '不期而会于孟津', t: 0.36 },
      { time: '前1048', who: '周武王', text: '以未知天命，还师', t: 0.64 },
      { time: '前1046', who: '周武王', text: '再谋东伐', t: 0.86 }
    ],
    nums: [
      { label: '会盟诸侯', value: '八百', kind: '史载', n: 0.8 },
      { label: '周师', value: '无确载', kind: '无确载', n: null },
      { label: '商军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'zhou', x: 54, y: 232, t: 0.04, name: '周武王', lx: 68, ly: 230, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'zhou', x: 188, y: 152, t: 0.36, name: '诸侯', lx: 202, ly: 150, anchor: 'start' },
      { type: 'host', side: 'shang', x: 286, y: 116, t: 0.02, name: '商纣', lx: 272, ly: 128, anchor: 'end' }
    ],
    routes: [
      { d: 'M 58 228 C 100 200 146 172 184 156', side: 'zhou', t0: 0.04, t1: 0.36,
        label: '周师东进', lx: 108, ly: 200, anchor: 'middle' }
    ]
  },
  {
    label: '誓师', seal: '渡河',
    kicker: '阶段二 · 前1046 年 十二月',
    title: '渡孟津，陈师牧野',
    turn: '武王率戎车三百乘、虎贲三千人、甲士四万五千人东伐，十二月戊午渡孟津，诸侯尽会；二月甲子昧爽，陈师牧野，武王作《牧誓》。',
    why: '周军兵力远少于商，但诸侯会师、士气可用；武王选择在牧野列阵，是要在商都门户一击定胜负，不给纣调集四方的时问。',
    src: '《史记·周本纪》；《尚书·牧誓》。戎车三百乘、虎贲三千、甲士四万五千为史载。',
    events: [
      { time: '前1046·十二月', who: '周武王', text: '率戎车三百、虎贲三千东伐', t: 0.06 },
      { time: '前1046·十二月', who: '周师', text: '戊午渡孟津', t: 0.32 },
      { time: '前1046·二月', who: '诸侯', text: '会于牧野', t: 0.58 },
      { time: '前1046·二月甲子', who: '周武王', text: '昧爽誓师，作《牧誓》', t: 0.84 }
    ],
    nums: [
      { label: '甲士', value: '四万五千', kind: '史载', n: 4.5 },
      { label: '戎车', value: '三百乘', kind: '史载', n: 3 },
      { label: '虎贲', value: '三千', kind: '史载', n: 0.3 }
    ],
    hold: BASE2,
    flips: { mengjin: 0.32 },
    markers: [
      { type: 'host', side: 'zhou', x: 188, y: 152, t: 0.30, name: '周武王', lx: 176, ly: 140, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'zhou', x: 228, y: 158, t: 0.56, name: '周师', lx: 232, ly: 174, anchor: 'start' },
      { type: 'host', side: 'shang', x: 286, y: 116, t: 0.02, name: '商纣', lx: 272, ly: 130, anchor: 'end' }
    ],
    routes: [
      { d: 'M 190 156 C 210 154 226 152 240 150', side: 'zhou', t0: 0.32, t1: 0.58,
        label: '渡河而北', lx: 214, ly: 142, anchor: 'middle' },
      { d: 'M 284 124 C 276 132 266 140 258 146', side: 'shang', t0: 0.60, t1: 0.80,
        label: '商军出朝歌', lx: 288, ly: 142, anchor: 'start' }
    ]
  },
  {
    label: '倒戈', seal: '倒戈',
    kicker: '阶段三 · 前1046 年 二月甲子',
    title: '前徒倒戈，商军自溃',
    turn: '纣发兵七十万（一说十七万）陈于牧野；商军多临时征发的夷人、奴隶，无战心，前徒倒戈，反攻其后，周师乘之，商军大溃。',
    why: '商军数量虽众，却是拼凑而成，士气与忠诚都不在纣一边；倒戈使兵力优势瞬间反转，牧野一战遂成商亡之局。',
    src: '《史记·周本纪》载「发兵七十万人」；《诗经·大明》「殷商之旅，其会如林」。七十万与十七万二说并存，均属史载。',
    events: [
      { time: '前1046·二月甲子', who: '商纣', text: '发兵七十万，陈于牧野', t: 0.06 },
      { time: '前1046·二月甲子', who: '周武王', text: '使师尚父与百夫致师', t: 0.30 },
      { time: '前1046·二月甲子', who: '商军', text: '前徒倒戈，反攻其后', t: 0.56, kind: 'flip', city: 'muye' },
      { time: '前1046·二月甲子', who: '周师', text: '乘之，商军大溃', t: 0.82 }
    ],
    nums: [
      { label: '商军', value: '号七十万', kind: '史载', n: 70 },
      { label: '商军异说', value: '一说十七万', kind: '史载', n: 17 },
      { label: '周军', value: '四万五千', kind: '史载', n: 4.5 }
    ],
    hold: BASE3,
    flips: { muye: 0.58 },
    sieges: [
      { x: 252, y: 148, t: 0.54, label: '牧野决战', side: 'zhou', lx: -10, ly: 16, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'shang', x: 286, y: 116, t: 0.02, name: '商纣', lx: 272, ly: 130, anchor: 'end' },
      { type: 'army', side: 'shang', x: 256, y: 150, t: 0.08, name: '商军', lx: 268, ly: 166, anchor: 'start', weak: true },
      { type: 'host', side: 'zhou', x: 238, y: 158, t: 0.04, name: '周武王', lx: 224, ly: 170, anchor: 'end' }
    ],
    routes: [
      { d: 'M 282 122 C 274 132 266 140 260 146', side: 'shang', t0: 0.06, t1: 0.26,
        label: '商军列阵', lx: 288, ly: 142, anchor: 'start' },
      { d: 'M 240 154 C 248 150 254 148 258 146', side: 'zhou', t0: 0.32, t1: 0.54,
        label: '周师冲击', lx: 232, ly: 142, anchor: 'end' },
      { d: 'M 258 152 C 240 168 214 180 186 184', side: 'retreat', t0: 0.62, t1: 0.92,
        label: '商军溃散', lx: 214, ly: 192, anchor: 'middle' }
    ]
  },
  {
    label: '商亡', seal: '鹿台',
    kicker: '阶段四 · 前1046 年 二月',
    title: '纣走鹿台，商命革',
    turn: '纣败走，登鹿台自焚；周师入朝歌，武王封纣子武庚以续殷祀，命管叔、蔡叔监之，商亡周兴。',
    why: '牧野之胜不只是军事胜利，它把商王朝的合法性一并击碎；但武庚与三监的安排，也为后来的三监之乱埋下伏笔。',
    src: '《史记·周本纪》《殷本纪》；《尚书·洪范》。',
    events: [
      { time: '前1046·二月', who: '商纣', text: '败走，登鹿台自焚', t: 0.08, kind: 'flip', city: 'lutai' },
      { time: '前1046·二月', who: '周武王', text: '入朝歌，释箕子、封比干墓', t: 0.36, kind: 'flip', city: 'chaoge' },
      { time: '前1046·二月', who: '周武王', text: '封武庚于殷，三监监之', t: 0.64 },
      { time: '前1046·二月', who: '周武王', text: '还师镐京，周革商命', t: 0.86 }
    ],
    nums: [
      { label: '商纣结局', value: '鹿台自焚', kind: '史载', n: null },
      { label: '商军溃兵', value: '无确载', kind: '无确载', n: null },
      { label: '周师', value: '四万五千', kind: '史载', n: 4.5 }
    ],
    hold: BASE4,
    sieges: [
      { x: 286, y: 116, t: 0.36, label: '朝歌陷', side: 'zhou', lx: 16, ly: 22, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'shang', x: 306, y: 92, t: 0.02, name: '商纣', lx: 292, ly: 96, anchor: 'end', weak: true },
      { type: 'host', side: 'zhou', x: 286, y: 116, t: 0.40, name: '周武王', lx: 300, ly: 132, anchor: 'start', moveRef: 0 }
    ],
    routes: [
      { d: 'M 288 120 C 292 112 296 104 298 98', side: 'retreat', t0: 0.04, t1: 0.20,
        label: '纣走鹿台', lx: 310, ly: 104, anchor: 'start' },
      { d: 'M 244 156 C 258 144 272 132 282 122', side: 'zhou', t0: 0.30, t1: 0.56,
        label: '周师入朝歌', lx: 248, ly: 136, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE1;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 196 C 60 186 120 172 180 162 C 240 152 300 140 385 132', color: '#a8b6ab', width: 3 },
    { d: 'M 96 64 C 116 92 130 122 140 152', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 40 110 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 286 60 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 56 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 268 296 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 20, y: 182, t: '黄　河', size: 10, color: '#46594f', ls: 3, serif: true },
    { x: 128, y: 68, t: '太 行', size: 8.5, color: '#7d6647', ls: 3, rotate: -74 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '牧野·今河南淇县南　朝歌·今河南淇县', size: 7.5, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '商 郊', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'muye',
  title: '牧野之战',
  kicker: '沙 盘 推 演',
  subtitle: '孟津 · 牧野—朝歌',
  years: '前1046',
  yearUnit: '',
  era: '商 · 帝辛（纣）',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝决战 ｜ 易＝易手 ｜ 虚线＝溃散',
  note: '示意沙盘：牧野今河南淇县南、朝歌今河南淇县，非真实地理比例',
  hook: '武王会诸侯于牧野，商军前徒倒戈，纣登鹿台自焚',
  period: '商末',
  yearValue: -1046,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '商', b: '亡', sub: '前1046' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
