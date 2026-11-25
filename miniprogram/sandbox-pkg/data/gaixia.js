/**
 * 沙盘推演 · 垓下之战（前202）
 * 通行叙事：鸿沟之约、固陵追击、垓下合围、四面楚歌、乌江自刎。
 * 汉联军约六十万、楚军约十万为后世通行推算；韩信三十万、灌婴五千骑、项羽八百骑等为史载。
 */
var COLOR = { han: '#2b5262', chu: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'honggou', name: '鸿沟', x: 96,  y: 196, tx: 96,  ty: 182, anchor: 'middle' },
  { id: 'guling',  name: '固陵', x: 152, y: 240, tx: 152, ty: 254, anchor: 'middle' },
  { id: 'gaixia',  name: '垓下', x: 216, y: 166, tx: 216, ty: 152, anchor: 'middle' },
  { id: 'pengcheng', name: '彭城', x: 324, y: 78, tx: 324, ty: 64, anchor: 'middle' },
  { id: 'wujiang', name: '乌江', x: 312, y: 302, tx: 312, ty: 316, anchor: 'middle' }
];

var STAGES = [
  {
    label: '鸿沟之约', seal: '约',
    kicker: '阶段一 · 前202 年 十月',
    title: '鸿沟之约与固陵追击',
    turn: '楚汉约中分天下，鸿沟以西为汉、以东为楚；项羽东归，刘邦用张良、陈平之计背约追击，至固陵为楚军所败。',
    why: '刘邦改「守约」为「追亡」，把休战变成决战；固陵一败后以封地换韩信、彭越出兵，合围之势才真正成形。',
    src: '《史记·项羽本纪》《高祖本纪》《淮阴侯列传》；《资治通鉴》卷十一。',
    events: [
      { time: '前202·十月', who: '楚汉', text: '约中分天下，鸿沟为界', t: 0.06 },
      { time: '前202·十月', who: '项羽', text: '引兵东归', t: 0.28 },
      { time: '前202·十月', who: '刘邦', text: '背约追击，至固陵而败', t: 0.56 },
      { time: '前202·十月', who: '张良·陈平', text: '劝封韩信、彭越，促其会师', t: 0.82 }
    ],
    nums: [
      { label: '楚军兵力', value: '约十万', kind: '推算', n: 10 },
      { label: '汉军兵力', value: '约六十万', kind: '推算', n: 60 },
      { label: '固陵汉军', value: '无确载', kind: '无确载', n: null }
    ],
    markers: [
      { type: 'host', side: 'chu', x: 96, y: 196, t: 0.02, name: '项羽', lx: 110, ly: 194, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'han', x: 152, y: 240, t: 0.38, name: '刘邦', lx: 166, ly: 244, anchor: 'start', moveRef: 1 }
    ],
    routes: [
      { d: 'M 100 192 C 160 156 240 112 318 82', side: 'retreat', t0: 0.26, t1: 0.62,
        label: '项羽东归', lx: 214, ly: 126, anchor: 'middle' },
      { d: 'M 100 198 C 118 214 136 228 150 238', side: 'han', t0: 0.46, t1: 0.74,
        label: '汉军追击', lx: 112, ly: 222, anchor: 'start' }
    ]
  },
  {
    label: '垓下合围', seal: '合围',
    kicker: '阶段二 · 前202 年 十二月',
    title: '韩信会师，围项羽于垓下',
    turn: '韩信自齐南下，彭越、英布并进，刘邦追至，诸侯军共围项羽于垓下；韩信将三十万自当之，孔将军居左、费将军居右。',
    why: '汉军以绝对优势完成合围，楚军粮尽而援绝；项羽此前屡胜，却在此被拖入不能突围的会战。',
    src: '《史记·项羽本纪》《淮阴侯列传》；《资治通鉴》卷十一。韩信三十万为史载，联军总数取通行推算。',
    events: [
      { time: '前202·十二月', who: '韩信', text: '自齐南下，将三十万', t: 0.06 },
      { time: '前202·十二月', who: '彭越·英布', text: '自梁、九江并进', t: 0.32 },
      { time: '前202·十二月', who: '汉联军', text: '共围项羽于垓下', t: 0.62 },
      { time: '前202·十二月', who: '项羽', text: '兵少食尽，壁于垓下', t: 0.86 }
    ],
    nums: [
      { label: '汉联军', value: '约六十万', kind: '推算', n: 60 },
      { label: '韩信军', value: '三十万', kind: '史载', n: 30 },
      { label: '楚军', value: '约十万', kind: '推算', n: 10 }
    ],
    sieges: [
      { x: 216, y: 166, t: 0.18, label: '垓下合围', side: 'han', lx: -12, ly: 4, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'han', x: 150, y: 140, t: 0.04, name: '韩信', lx: 150, ly: 126, anchor: 'middle', moveRef: 0 },
      { type: 'host', side: 'han', x: 150, y: 240, t: 0.28, name: '刘邦', lx: 136, ly: 254, anchor: 'end' },
      { type: 'army', side: 'han', x: 262, y: 206, t: 0.44, name: '彭越·英布', lx: 276, ly: 218, anchor: 'start' },
      { type: 'host', side: 'chu', x: 216, y: 166, t: 0.02, name: '项羽', lx: 228, ly: 154, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 154 146 C 178 152 198 158 210 162', side: 'han', t0: 0.10, t1: 0.44,
        label: '韩信当先', lx: 160, ly: 138, anchor: 'start' },
      { d: 'M 268 202 C 248 190 232 178 220 170', side: 'han', t0: 0.42, t1: 0.70,
        label: '彭越·英布合击', lx: 264, ly: 190, anchor: 'start' }
    ]
  },
  {
    label: '四面楚歌', seal: '楚歌',
    kicker: '阶段三 · 前202 年 十二月',
    title: '四面楚歌，八百骑夜溃',
    turn: '汉军夜唱楚歌，项羽惊曰「汉皆已得楚乎」；乃夜率八百余骑溃围南出，至阴陵迷道，问田父，田父绐之曰「左」。',
    why: '楚歌瓦解的是楚军最后的组织与心理；八百骑夜溃意味着十万之众不战自散，项羽只剩个人突围。',
    src: '《史记·项羽本纪》；《资治通鉴》卷十一。八百余骑、灌婴五千骑均为史载。',
    events: [
      { time: '前202·十二月', who: '汉军', text: '夜唱楚歌，四面皆楚声', t: 0.08 },
      { time: '前202·十二月', who: '项羽', text: '惊起，饮帐中，别虞姬', t: 0.34 },
      { time: '前202·十二月', who: '项羽', text: '率八百余骑溃围南出', t: 0.62 },
      { time: '前202·十二月', who: '灌婴', text: '以五千骑追之', t: 0.86 }
    ],
    nums: [
      { label: '项羽突围', value: '八百余骑', kind: '史载', n: 0.8 },
      { label: '灌婴追兵', value: '五千骑', kind: '史载', n: 5 },
      { label: '楚军余部', value: '无确载', kind: '无确载', n: null }
    ],
    markers: [
      { type: 'host', side: 'chu', x: 216, y: 166, t: 0.02, name: '项羽', lx: 228, ly: 154, anchor: 'start', moveRef: 0, weak: true },
      { type: 'host', side: 'han', x: 180, y: 220, t: 0.02, name: '灌婴', lx: 166, ly: 232, anchor: 'end', moveRef: 1 }
    ],
    routes: [
      { d: 'M 220 174 C 246 208 280 252 306 292', side: 'retreat', t0: 0.58, t1: 0.9,
        label: '八百骑南溃', lx: 258, ly: 234, anchor: 'start' },
      { d: 'M 184 224 C 220 244 264 268 302 292', side: 'han', t0: 0.82, t1: 0.98,
        label: '灌婴追击', lx: 222, ly: 252, anchor: 'start' }
    ]
  },
  {
    label: '乌江自刎', seal: '楚亡',
    kicker: '阶段四 · 前202 年 十二月',
    title: '乌江自刎，楚亡',
    turn: '项羽至乌江，乌江亭长舣船待，项羽笑曰「天之亡我，我何渡为」，乃自刎；汉军争其尸，楚地皆降。',
    why: '项羽之死使楚军失去最后的核心；刘邦随即称帝，五年楚汉相争以汉的统一告终。',
    src: '《史记·项羽本纪》；《资治通鉴》卷十一。二十八骑为史载。',
    events: [
      { time: '前202·十二月', who: '项羽', text: '至乌江，亭长舣船待', t: 0.08 },
      { time: '前202·十二月', who: '项羽', text: '拒渡，谓「天之亡我」', t: 0.36 },
      { time: '前202·十二月', who: '项羽', text: '力战，身被十余创，自刎', t: 0.66 },
      { time: '前202·十二月', who: '汉军', text: '争尸，楚地皆降', t: 0.88 }
    ],
    nums: [
      { label: '项羽从骑', value: '二十八骑', kind: '史载', n: 0.28 },
      { label: '汉军追兵', value: '无确载', kind: '无确载', n: null },
      { label: '楚地降城', value: '无确载', kind: '无确载', n: null }
    ],
    markers: [
      { type: 'host', side: 'chu', x: 306, y: 292, t: 0.02, name: '项羽', lx: 292, ly: 284, anchor: 'end', weak: true },
      { type: 'host', side: 'han', x: 268, y: 260, t: 0.12, name: '汉军', lx: 254, ly: 250, anchor: 'end' }
    ],
    routes: [
      { d: 'M 270 264 C 284 276 296 286 304 294', side: 'han', t0: 0.10, t1: 0.34,
        label: '追至乌江', lx: 272, ly: 276, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = {};

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 226 C 60 214 120 236 180 226 C 240 216 300 196 385 204', color: '#a8b6ab', width: 3 }
  ],
  lines: [
    { d: 'M 40 132 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 250 100 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 80 322 l12 -13 l9 9 l11 -13', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 246 330 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 182, y: 246, t: '淮　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 366, t: '楚　地', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'gaixia',
  title: '垓下之战',
  kicker: '沙 盘 推 演',
  subtitle: '垓下 · 乌江',
  years: '前202',
  yearUnit: '',
  era: '楚汉 · 高祖五年',
  mapNote: '旗＝军势 ｜ 圈＝合围 ｜ 虚线＝退却',
  note: '示意沙盘：仅保留关键地点与行军线，非真实地理比例',
  hook: '鸿沟背约、韩信合围、四面楚歌，项羽八百骑夜溃乌江',
  period: '楚汉',
  yearValue: -202,
  cityMode: 'neutral',
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
