/**
 * 沙盘推演 · 邲之战（前597）
 * 通行叙事：楚庄王围郑、郑伯肉袒牵羊、晋师救郑、先縠先渡、邲之战晋军争舟、楚饮马黄河。
 * 双方兵力均无确载，只标「无确载」；「舟中之指可掬」为《左传》史载。
 * 地名古今对照：邲今河南荥阳东北、郑今河南新郑。
 */
var COLOR = { chu: '#6f3a22', jin: '#2b5262', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'jiang', name: '绛', x: 88,  y: 82,  tx: 88,  ty: 68,  anchor: 'middle' },
  { id: 'bi',    name: '邲', x: 178, y: 154, tx: 164, ty: 146, anchor: 'end' },
  { id: 'zheng', name: '郑', x: 214, y: 196, tx: 214, ty: 210, anchor: 'middle' },
  { id: 'ying',  name: '郢', x: 148, y: 322, tx: 148, ty: 336, anchor: 'middle' }
];

var BASE0 = { jiang: 'jin', bi: 'chu', zheng: 'contested', ying: 'chu' };
var BASE1 = { jiang: 'jin', bi: 'chu', zheng: 'chu', ying: 'chu' };
var BASE2 = { jiang: 'jin', bi: 'contested', zheng: 'chu', ying: 'chu' };
var BASE3 = { jiang: 'jin', bi: 'chu', zheng: 'chu', ying: 'chu' };

var STAGES = [
  {
    label: '围郑', seal: '克郑',
    kicker: '阶段一 · 前597 年 春',
    title: '楚庄王围郑，郑伯肉袒牵羊',
    turn: '楚庄王围郑三月，破之；郑襄公肉袒牵羊以迎，楚退三十里许平。',
    why: '楚以长时间围城迫使郑服，既打通北上通道，又避免在郑城下消耗过多兵力。',
    src: '《左传·宣公十二年》；《史记·楚世家》《郑世家》。',
    events: [
      { time: '前597·春', who: '楚庄王', text: '围郑三月', t: 0.06 },
      { time: '前597·春', who: '楚军', text: '破郑，入皇门', t: 0.36, kind: 'flip', city: 'zheng' },
      { time: '前597·春', who: '郑襄公', text: '肉袒牵羊以迎', t: 0.62 },
      { time: '前597·春', who: '楚庄王', text: '退三十里，许平', t: 0.84 }
    ],
    nums: [
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '郑军', value: '无确载', kind: '无确载', n: null },
      { label: '围城', value: '三月', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { zheng: 0.38 },
    sieges: [
      { x: 214, y: 196, t: 0.36, label: '郑城破', side: 'chu', lx: 16, ly: 12, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'chu', x: 148, y: 322, t: 0.02, name: '楚庄王', lx: 162, ly: 332, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'jin', x: 214, y: 196, t: 0.30, name: '郑伯', lx: 228, ly: 206, anchor: 'start' }
    ],
    routes: [
      { d: 'M 152 316 C 170 288 190 244 208 206', side: 'chu', t0: 0.04, t1: 0.34,
        label: '楚军北上', lx: 178, ly: 268, anchor: 'middle' }
    ]
  },
  {
    label: '救郑', seal: '及河',
    kicker: '阶段二 · 前597 年 夏',
    title: '晋师救郑，及河而议不决',
    turn: '晋景公遣荀林父率师救郑，至黄河，闻郑已服楚；荀林父欲还，先縠（彘子）以「成师以出，闻敌强而退，非夫也」，率所部先渡河。',
    why: '晋军将帅不和、和战两议，指挥已经分裂；先縠擅自渡河，把全军拖入一场没有统一决心的会战。',
    src: '《左传·宣公十二年》；《史记·晋世家》。晋军数目无确载。',
    events: [
      { time: '前597·夏', who: '荀林父', text: '率师救郑，至黄河', t: 0.06 },
      { time: '前597·夏', who: '荀林父', text: '闻郑已服楚，欲还', t: 0.32 },
      { time: '前597·夏', who: '先縠', text: '不听命，率所部先渡', t: 0.58 },
      { time: '前597·夏', who: '晋军', text: '不得已，全军渡河', t: 0.82 }
    ],
    nums: [
      { label: '晋军', value: '无确载', kind: '无确载', n: null },
      { label: '先縠部', value: '无确载', kind: '无确载', n: null },
      { label: '楚军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'jin', x: 166, y: 136, t: 0.04, name: '荀林父', lx: 152, ly: 148, anchor: 'end' },
      { type: 'army', side: 'jin', x: 180, y: 144, t: 0.56, name: '先縠', lx: 192, ly: 136, anchor: 'start', moveRef: 0 }
    ],
    routes: [
      { d: 'M 96 90 C 122 102 146 118 164 130', side: 'jin', t0: 0.04, t1: 0.34,
        label: '晋师南下', lx: 116, ly: 112, anchor: 'middle' },
      { d: 'M 168 134 C 176 140 182 144 186 148', side: 'jin', t0: 0.56, t1: 0.74,
        label: '先縠先渡', lx: 194, ly: 158, anchor: 'start' }
    ]
  },
  {
    label: '邲战', seal: '邲',
    kicker: '阶段三 · 前597 年 夏',
    title: '邲之战，晋军争舟而溃',
    turn: '楚军乘晋军半渡而击，战于邲；晋军大溃，争舟而渡，先登者以刀砍攀舟者之手，「舟中之指可掬」。',
    why: '晋军渡河未毕、阵形未成，被楚军抓住半渡时机；溃退时争船自相残害，损失远大于战场上的直接伤亡。',
    src: '《左传·宣公十二年》「舟中之指可掬」；《史记·晋世家》《楚世家》。双方兵力均无确载。',
    events: [
      { time: '前597·夏', who: '楚庄王', text: '乘晋军半渡而击', t: 0.06 },
      { time: '前597·夏', who: '楚军', text: '分左右拒，突入晋阵', t: 0.30, kind: 'flip', city: 'bi' },
      { time: '前597·夏', who: '晋军', text: '大溃，争舟而渡', t: 0.58 },
      { time: '前597·夏', who: '晋军', text: '舟中之指可掬', t: 0.84 }
    ],
    nums: [
      { label: '晋军', value: '无确载', kind: '无确载', n: null },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '晋军损失', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE2,
    flips: { bi: 0.32 },
    sieges: [
      { x: 178, y: 154, t: 0.32, label: '邲之战', side: 'chu', lx: -10, ly: 16, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'chu', x: 166, y: 148, t: 0.02, name: '楚庄王', lx: 152, ly: 140, anchor: 'end' },
      { type: 'army', side: 'jin', x: 182, y: 158, t: 0.02, name: '晋军', lx: 196, ly: 168, anchor: 'start', weak: true },
      { type: 'army', side: 'chu', x: 172, y: 140, t: 0.30, name: '楚军', lx: 158, ly: 132, anchor: 'end' }
    ],
    routes: [
      { d: 'M 164 150 C 170 152 174 154 178 156', side: 'chu', t0: 0.08, t1: 0.28,
        label: '突入晋阵', lx: 158, ly: 162, anchor: 'end' },
      { d: 'M 184 160 C 190 142 194 126 196 112', side: 'retreat', t0: 0.58, t1: 0.90,
        label: '晋军争舟', lx: 206, ly: 140, anchor: 'start' }
    ]
  },
  {
    label: '饮马', seal: '称霸',
    kicker: '阶段四 · 前597 年 秋',
    title: '楚庄王饮马黄河，遂霸',
    turn: '楚军进至邲，饮马于河而后还；楚庄王不筑京观，曰「武有七德，我无一焉」；中原诸侯多服于楚。',
    why: '邲之胜让楚国第一次真正压过晋国，楚庄王也由此成为春秋五霸之一；但楚未能在中原建立长久统治，晋楚争霸仍将持续。',
    src: '《左传·宣公十二年》；《史记·楚世家》。',
    events: [
      { time: '前597·秋', who: '楚庄王', text: '饮马于河，耀兵而还', t: 0.08 },
      { time: '前597·秋', who: '楚庄王', text: '不筑京观，言武有七德', t: 0.36 },
      { time: '前597·秋', who: '诸侯', text: '多服于楚', t: 0.64 },
      { time: '前597·秋', who: '晋', text: '退守，晋楚争霸未已', t: 0.86 }
    ],
    nums: [
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '晋军', value: '无确载', kind: '无确载', n: null },
      { label: '郑', value: '已服楚', kind: '史载', n: null }
    ],
    hold: BASE3,
    markers: [
      { type: 'host', side: 'chu', x: 178, y: 154, t: 0.06, name: '楚庄王', lx: 192, ly: 162, anchor: 'start' },
      { type: 'host', side: 'jin', x: 196, y: 110, t: 0.02, name: '晋军', lx: 208, ly: 106, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 180 150 C 186 138 192 124 196 114', side: 'chu', t0: 0.06, t1: 0.28,
        label: '饮马于河', lx: 206, ly: 132, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 132 C 60 124 120 132 180 128 C 240 124 300 116 385 118', color: '#a8b6ab', width: 3 },
    { d: 'M 196 88 C 210 130 216 176 214 222 C 212 260 204 292 194 318', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 52 190 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 290 190 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 60 290 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 278 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 20, y: 118, t: '黄　河', size: 10, color: '#46594f', ls: 3, serif: true },
    { x: 220, y: 226, t: '颍　水', size: 8.5, color: '#46594f', ls: 2, serif: true, rotate: 76 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '邲·今河南荥阳东北　郑·今河南新郑', size: 7.5, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '中 原', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'bi',
  title: '邲之战',
  kicker: '沙 盘 推 演',
  subtitle: '邲 · 黄河',
  years: '前597',
  yearUnit: '',
  era: '春秋 · 楚庄王十七年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝决战 ｜ 易＝易手 ｜ 虚线＝溃退',
  note: '示意沙盘：邲今河南荥阳东北、郑今河南新郑，非真实地理比例',
  hook: '楚庄王围郑服郑，邲之战大败晋军，饮马黄河而称霸',
  period: '春秋',
  yearValue: -597,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '楚', b: '霸', sub: '前597' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
