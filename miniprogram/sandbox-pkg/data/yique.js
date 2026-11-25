/**
 * 沙盘推演 · 伊阙之战（前293）
 * 通行叙事：白起攻韩取新城、韩魏联军拒秦于伊阙、白起以疑兵牵制韩军主力奇袭魏军、
 * 斩首二十四万、虏公孙喜、拔五城。
 * 「斩首二十四万」为《史记》史载（为被歼数，非联军总兵力）；秦军与联军总数无确载。
 * 地名古今对照：伊阙今河南洛阳南（龙门）、新城今河南伊川西南。
 */
var COLOR = { qin: '#6f3a22', han: '#5a4a6a', wei: '#2b5262', zhou: '#8a5a22', retreat: '#6d655a', contested: '#9c6b2e' };

var CITY_DEFS = [
  { id: 'xianyang', name: '咸阳', x: 56,  y: 208, tx: 56,  ty: 222, anchor: 'middle' },
  { id: 'anyi',     name: '安邑', x: 150, y: 116, tx: 150, ty: 102, anchor: 'middle' },
  { id: 'luoyang',  name: '洛阳', x: 226, y: 176, tx: 240, ty: 168, anchor: 'start' },
  { id: 'yique',    name: '伊阙', x: 208, y: 214, tx: 194, ty: 208, anchor: 'end' },
  { id: 'xincheng', name: '新城', x: 178, y: 252, tx: 178, ty: 266, anchor: 'middle' },
  { id: 'daliang',  name: '大梁', x: 306, y: 146, tx: 306, ty: 160, anchor: 'middle' }
];

var BASE0 = { xianyang: 'qin', anyi: 'wei', luoyang: 'zhou', yique: 'han', xincheng: 'han', daliang: 'wei' };
var BASE1 = { xianyang: 'qin', anyi: 'wei', luoyang: 'zhou', yique: 'han', xincheng: 'qin', daliang: 'wei' };
var BASE2 = { xianyang: 'qin', anyi: 'wei', luoyang: 'zhou', yique: 'contested', xincheng: 'qin', daliang: 'wei' };
var BASE3 = { xianyang: 'qin', anyi: 'wei', luoyang: 'zhou', yique: 'qin', xincheng: 'qin', daliang: 'wei' };

var STAGES = [
  {
    label: '秦取新城', seal: '拔城',
    kicker: '阶段一 · 前294—前293 年',
    title: '白起攻韩，拔新城',
    turn: '秦以白起为左更，攻韩，拔新城；韩釐王与魏昭王合兵拒秦，魏以公孙喜为将。',
    why: '新城是伊阙西面的前沿据点，秦军先取其地，等于把进攻出发阵地推进到韩魏联军的门口。',
    src: '《史记·白起王翦列传》《韩世家》《魏世家》；《资治通鉴》卷四。',
    events: [
      { time: '前294', who: '白起', text: '为左更，率军攻韩', t: 0.08 },
      { time: '前293', who: '秦军', text: '拔新城', t: 0.34, kind: 'flip', city: 'xincheng' },
      { time: '前293', who: '韩釐王', text: '与魏昭王合兵拒秦', t: 0.62 },
      { time: '前293', who: '魏军', text: '以公孙喜为将，壁于伊阙', t: 0.86 }
    ],
    nums: [
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '韩魏联军', value: '无确载', kind: '无确载', n: null },
      { label: '拔城', value: '新城', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { xincheng: 0.34 },
    sieges: [
      { x: 178, y: 252, t: 0.34, label: '新城拔', side: 'qin', lx: 12, ly: 14, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 56, y: 208, t: 0.02, name: '白起', lx: 70, ly: 220, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'han', x: 208, y: 214, t: 0.58, name: '韩军', lx: 194, ly: 226, anchor: 'end' },
      { type: 'army', side: 'wei', x: 220, y: 200, t: 0.74, name: '公孙喜', lx: 234, ly: 192, anchor: 'start' }
    ],
    routes: [
      { d: 'M 64 210 C 100 222 140 238 170 248', side: 'qin', t0: 0.06, t1: 0.32,
        label: '秦军东进', lx: 112, ly: 226, anchor: 'middle' }
    ]
  },
  {
    label: '伊阙对峙', seal: '对峙',
    kicker: '阶段二 · 前293 年',
    title: '韩魏联军壁于伊阙，互相推诿',
    turn: '韩魏联军壁于伊阙，韩军在前、魏军在后，两军各欲保存实力，不肯先战；白起登高观察，见其阵不相统一。',
    why: '联军虽众而号令不一，谁都不愿先承受秦军锋芒；这种「合而不一」正是白起敢于以少击众的前提。',
    src: '《史记·白起王翦列传》；《资治通鉴》卷四。',
    events: [
      { time: '前293', who: '韩魏联军', text: '壁于伊阙，深沟高垒', t: 0.08 },
      { time: '前293', who: '韩军', text: '欲魏军先战，自保其众', t: 0.34 },
      { time: '前293', who: '魏军', text: '欲韩军先战，观望不进', t: 0.60 },
      { time: '前293', who: '白起', text: '登高观阵，察其不和', t: 0.86 }
    ],
    nums: [
      { label: '韩军', value: '无确载', kind: '无确载', n: null },
      { label: '魏军', value: '无确载', kind: '无确载', n: null },
      { label: '秦军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'qin', x: 182, y: 252, t: 0.02, name: '白起', lx: 168, ly: 262, anchor: 'end' },
      { type: 'army', side: 'han', x: 206, y: 212, t: 0.02, name: '韩军', lx: 192, ly: 204, anchor: 'end' },
      { type: 'army', side: 'wei', x: 224, y: 198, t: 0.02, name: '公孙喜', lx: 238, ly: 190, anchor: 'start' }
    ],
    routes: [
      { d: 'M 184 248 C 192 236 200 224 206 216', side: 'qin', t0: 0.06, t1: 0.30,
        label: '秦军逼垒', lx: 178, ly: 232, anchor: 'end' }
    ]
  },
  {
    label: '疑兵奇袭', seal: '奇袭',
    kicker: '阶段三 · 前293 年',
    title: '白起以疑兵牵制韩军，主力奇袭魏军',
    turn: '白起以少量兵力多张旗帜，牵制韩军于正面；自率精锐绕出，突袭魏军侧后。魏军无备，阵乱而溃。',
    why: '先打较弱且无决心的魏军，割裂联军；韩军被疑兵钉在原地，来不及救援，联军被各个击破。',
    src: '《史记·白起王翦列传》；《资治通鉴》卷四。',
    events: [
      { time: '前293', who: '白起', text: '张疑兵以牵制韩军', t: 0.08 },
      { time: '前293', who: '秦军', text: '主力绕出，突袭魏军侧后', t: 0.36 },
      { time: '前293', who: '魏军', text: '无备，阵乱而溃', t: 0.62, kind: 'flip', city: 'yique' },
      { time: '前293', who: '韩军', text: '被疑兵牵制，孤立无援', t: 0.86 }
    ],
    nums: [
      { label: '疑兵', value: '无确载', kind: '无确载', n: null },
      { label: '秦军主力', value: '无确载', kind: '无确载', n: null },
      { label: '魏军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE2,
    flips: { yique: 0.62 },
    markers: [
      { type: 'host', side: 'qin', x: 196, y: 236, t: 0.02, name: '白起', lx: 182, ly: 246, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'han', x: 204, y: 210, t: 0.02, name: '韩军', lx: 190, ly: 202, anchor: 'end', weak: true },
      { type: 'army', side: 'qin', x: 222, y: 224, t: 0.34, name: '秦军主力', lx: 236, ly: 234, anchor: 'start' },
      { type: 'army', side: 'wei', x: 226, y: 198, t: 0.02, name: '魏军', lx: 240, ly: 190, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 198 232 C 210 230 218 226 224 220', side: 'qin', t0: 0.08, t1: 0.44,
        label: '绕袭魏军', lx: 208, ly: 244, anchor: 'start' },
      { d: 'M 230 200 C 240 216 248 236 252 258', side: 'retreat', t0: 0.62, t1: 0.94,
        label: '魏军溃退', lx: 262, ly: 228, anchor: 'start' }
    ]
  },
  {
    label: '伊阙大破', seal: '大破',
    kicker: '阶段四 · 前293 年',
    title: '斩首二十四万，虏公孙喜',
    turn: '秦军乘胜夹击韩军，联军大溃；斩首二十四万，虏魏将公孙喜，拔五城。韩魏自此元气大伤。',
    why: '伊阙一战，韩魏野战主力被歼，秦国东出中原的门户被彻底打开；白起也由此战成为秦军主将。',
    src: '《史记·白起王翦列传》《秦本纪》《韩世家》《魏世家》；《资治通鉴》卷四。',
    events: [
      { time: '前293', who: '秦军', text: '乘胜夹击韩军', t: 0.08 },
      { time: '前293', who: '秦军', text: '斩首二十四万', t: 0.34 },
      { time: '前293', who: '白起', text: '虏魏将公孙喜', t: 0.60 },
      { time: '前293', who: '秦军', text: '拔五城，韩魏震恐', t: 0.84, kind: 'flip', city: 'yique' }
    ],
    nums: [
      { label: '联军被斩', value: '二十四万', kind: '史载', n: 24 },
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '拔城', value: '五城', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { yique: 0.34 },
    sieges: [
      { x: 208, y: 214, t: 0.34, label: '伊阙大破', side: 'qin', lx: -12, ly: 16, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 208, y: 214, t: 0.02, name: '白起', lx: 194, ly: 226, anchor: 'end' },
      { type: 'army', side: 'qin', x: 216, y: 220, t: 0.30, name: '秦军', lx: 230, ly: 230, anchor: 'start' },
      { type: 'army', side: 'wei', x: 224, y: 196, t: 0.02, name: '公孙喜', lx: 238, ly: 188, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 214 216 C 220 214 226 210 230 204', side: 'qin', t0: 0.06, t1: 0.36,
        label: '夹击联军', lx: 238, ly: 214, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 148 C 60 142 120 152 180 146 C 240 140 300 132 385 136', color: '#a8b6ab', width: 3 },
    { d: 'M 214 130 C 216 168 214 206 208 244', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 60 60 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 290 70 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 40 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 300 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 18, y: 138, t: '黄　河', size: 10, color: '#46594f', ls: 3, serif: true },
    { x: 232, y: 250, t: '伊　水', size: 8.5, color: '#46594f', ls: 2, serif: true, rotate: 74 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '伊阙·今河南洛阳南（龙门）　新城·今河南伊川西南', size: 7.5, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '中 原', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'yique',
  title: '伊阙之战',
  kicker: '沙 盘 推 演',
  subtitle: '伊阙 · 洛阳',
  years: '前293',
  yearUnit: '',
  era: '战国 · 周赧王二十二年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝决战 ｜ 易＝易手 ｜ 虚线＝溃退',
  note: '示意沙盘：伊阙今河南洛阳南（龙门），非真实地理比例',
  hook: '白起以疑兵牵韩、主力袭魏，伊阙斩首二十四万',
  period: '战国',
  yearValue: -293,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '秦', b: '胜', sub: '前293' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
