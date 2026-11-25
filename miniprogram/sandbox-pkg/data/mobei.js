/**
 * 沙盘推演 · 漠北之战（前119）
 * 通行叙事：汉廷决策、卫青出定襄、漠北决战单于夜遁、霍去病封狼居胥、匈奴远遁。
 * 卫青、霍去病各五万骑、出塞战马十四万、还塞不满三万、霍去病捕斩七万余级均为史载；
 * 匈奴兵力无确载。「封狼居胥、禅于姑衍、登临瀚海」为史载。
 * 地名古今对照：定襄今内蒙古和林格尔北、代郡今河北蔚县东北、狼居胥山今蒙古国肯特山。
 */
var COLOR = { han: '#2b5262', xiongnu: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'changan',  name: '长安', x: 58,  y: 252, tx: 58,  ty: 268, anchor: 'middle' },
  { id: 'dingxiang', name: '定襄', x: 154, y: 176, tx: 140, ty: 186, anchor: 'end' },
  { id: 'daijun',   name: '代郡', x: 232, y: 132, tx: 246, ty: 126, anchor: 'start' },
  { id: 'longcheng', name: '龙城', x: 256, y: 86,  tx: 242, ty: 78,  anchor: 'end' },
  { id: 'langjuxu', name: '狼居胥山', x: 306, y: 74, tx: 306, ty: 60, anchor: 'middle' },
  { id: 'hanhai',   name: '瀚海', x: 332, y: 40, tx: 332, ty: 28, anchor: 'middle' }
];

var STAGES = [
  {
    label: '汉廷决策', seal: '倾国',
    kicker: '阶段一 · 前119 年',
    title: '汉武帝倾国之力，分道击匈奴',
    turn: '汉武帝以匈奴远遁漠北、汉军久不深入为患，决意倾国之力远征：卫青、霍去病各率五万骑，步兵转者踵军数十万，分道出塞。',
    why: '汉廷要把战争推向匈奴腹地，一举摧毁其主力；这是一次以国力为后盾的战略豪赌。',
    src: '《史记·卫将军骠骑列传》《匈奴列传》；《资治通鉴》卷十九。各五万骑为史载。',
    events: [
      { time: '前119', who: '汉武帝', text: '决意深入漠北', t: 0.08 },
      { time: '前119', who: '卫青', text: '率五万骑出定襄', t: 0.34 },
      { time: '前119', who: '霍去病', text: '率五万骑出代郡', t: 0.58 },
      { time: '前119', who: '汉军', text: '步兵辎重数十万，转粟千里', t: 0.84 }
    ],
    nums: [
      { label: '卫青骑', value: '五万', kind: '史载', n: 50 },
      { label: '霍去病骑', value: '五万', kind: '史载', n: 50 },
      { label: '步兵辎重', value: '数十万', kind: '推算', n: 300 }
    ],
    markers: [
      { type: 'host', side: 'han', x: 58, y: 252, t: 0.02, name: '汉武帝', lx: 72, ly: 246, anchor: 'start' },
      { type: 'host', side: 'han', x: 154, y: 176, t: 0.30, name: '卫青', lx: 140, ly: 168, anchor: 'end' },
      { type: 'host', side: 'han', x: 232, y: 132, t: 0.54, name: '霍去病', lx: 246, ly: 140, anchor: 'start' }
    ],
    routes: [
      { d: 'M 64 246 C 96 222 126 198 150 182', side: 'han', t0: 0.28, t1: 0.52,
        label: '卫青出塞', lx: 100, ly: 214, anchor: 'start' },
      { d: 'M 66 246 C 120 206 180 166 228 138', side: 'han', t0: 0.52, t1: 0.80,
        label: '霍去病出塞', lx: 150, ly: 180, anchor: 'middle' }
    ]
  },
  {
    label: '卫青出塞', seal: '遇敌',
    kicker: '阶段二 · 前119 年',
    title: '卫青穿漠，遇单于主力',
    turn: '卫青出塞千余里，穿越大漠，遇伊稚斜单于主力；卫青以武刚车自环为营，纵五千骑冲击，日暮大风起，沙砾击面。',
    why: '汉军以车阵对抗匈奴骑兵的冲击，把野战变成有依托的消耗战；大风则打乱了匈奴的骑射优势。',
    src: '《史记·卫将军骠骑列传》；《资治通鉴》卷十九。「武刚车」「大风」为史载。',
    events: [
      { time: '前119', who: '卫青', text: '出塞千余里，穿越大漠', t: 0.08 },
      { time: '前119', who: '汉军', text: '遇伊稚斜单于主力', t: 0.34 },
      { time: '前119', who: '卫青', text: '以武刚车自环为营', t: 0.58 },
      { time: '前119', who: '天时', text: '日暮大风起，沙砾击面', t: 0.84 }
    ],
    nums: [
      { label: '卫青军', value: '五万骑', kind: '史载', n: 50 },
      { label: '匈奴军', value: '无确载', kind: '无确载', n: null },
      { label: '深入', value: '千余里', kind: '史载', n: null }
    ],
    markers: [
      { type: 'host', side: 'han', x: 154, y: 176, t: 0.02, name: '卫青', lx: 140, ly: 188, anchor: 'end', moveRef: 0 },
      { type: 'host', side: 'xiongnu', x: 256, y: 86, t: 0.02, name: '伊稚斜', lx: 242, ly: 94, anchor: 'end' },
      { type: 'army', side: 'han', x: 206, y: 128, t: 0.56, name: '汉军', lx: 192, ly: 120, anchor: 'end' }
    ],
    routes: [
      { d: 'M 160 172 C 190 148 224 118 250 94', side: 'han', t0: 0.06, t1: 0.54,
        label: '汉军穿漠', lx: 194, ly: 140, anchor: 'start' }
    ]
  },
  {
    label: '漠北决战', seal: '决战',
    kicker: '阶段三 · 前119 年',
    title: '单于夜遁，汉军追至寘颜山',
    turn: '汉军纵五千骑冲击，单于见汉兵多而士马尚强，遂乘夜遁走；汉军追至寘颜山赵信城，烧其积粟而还。',
    why: '单于不敢决战而夜遁，匈奴主力得以保存，但其漠南统治体系被彻底动摇。',
    src: '《史记·卫将军骠骑列传》《匈奴列传》；《资治通鉴》卷十九。',
    events: [
      { time: '前119', who: '汉军', text: '纵五千骑冲击匈奴阵', t: 0.08 },
      { time: '前119', who: '伊稚斜', text: '见汉兵多，乘夜遁走', t: 0.38 },
      { time: '前119', who: '汉军', text: '追至寘颜山赵信城', t: 0.64 },
      { time: '前119', who: '汉军', text: '烧其积粟而还', t: 0.86 }
    ],
    nums: [
      { label: '汉军', value: '五万骑', kind: '史载', n: 50 },
      { label: '匈奴军', value: '无确载', kind: '无确载', n: null },
      { label: '单于', value: '夜遁', kind: '史载', n: null }
    ],
    markers: [
      { type: 'host', side: 'han', x: 210, y: 124, t: 0.02, name: '卫青', lx: 196, ly: 136, anchor: 'end', moveRef: 0 },
      { type: 'host', side: 'xiongnu', x: 256, y: 86, t: 0.02, name: '伊稚斜', lx: 242, ly: 78, anchor: 'end', weak: true, moveRef: 1 },
      { type: 'army', side: 'han', x: 268, y: 100, t: 0.62, name: '汉军', lx: 282, ly: 94, anchor: 'start' }
    ],
    routes: [
      { d: 'M 214 120 C 226 110 238 102 248 94', side: 'han', t0: 0.06, t1: 0.36,
        label: '汉军冲击', lx: 220, ly: 112, anchor: 'start' },
      { d: 'M 252 82 C 268 74 284 68 300 64', side: 'retreat', t0: 0.38, t1: 0.70,
        label: '单于夜遁', lx: 268, ly: 84, anchor: 'start' }
    ]
  },
  {
    label: '封狼居胥', seal: '封禅',
    kicker: '阶段四 · 前119 年',
    title: '霍去病破左贤王，封狼居胥',
    turn: '霍去病出代郡两千余里，破左贤王，捕斩首虏七万余级；封狼居胥山，禅于姑衍，登临瀚海而还。',
    why: '霍去病一路深入匈奴左地，摧毁左贤王部，与卫青形成东西呼应；封禅狼居胥成为汉军武功的象征。',
    src: '《史记·卫将军骠骑列传》《匈奴列传》；《资治通鉴》卷十九。「七万余级」为史载。',
    events: [
      { time: '前119', who: '霍去病', text: '出代郡两千余里', t: 0.08 },
      { time: '前119', who: '汉军', text: '破左贤王，捕斩七万余级', t: 0.36 },
      { time: '前119', who: '霍去病', text: '封狼居胥山', t: 0.60 },
      { time: '前119', who: '霍去病', text: '禅于姑衍，登临瀚海', t: 0.84 }
    ],
    nums: [
      { label: '霍去病军', value: '五万骑', kind: '史载', n: 50 },
      { label: '捕斩', value: '七万余', kind: '史载', n: 70 },
      { label: '左贤王', value: '遁走', kind: '史载', n: null }
    ],
    markers: [
      { type: 'host', side: 'han', x: 232, y: 132, t: 0.02, name: '霍去病', lx: 246, ly: 140, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'xiongnu', x: 300, y: 80, t: 0.02, name: '左贤王', lx: 286, ly: 90, anchor: 'end', weak: true },
      { type: 'army', side: 'han', x: 292, y: 82, t: 0.56, name: '汉军', lx: 306, ly: 92, anchor: 'start' }
    ],
    routes: [
      { d: 'M 238 128 C 262 112 284 96 298 84', side: 'han', t0: 0.06, t1: 0.52,
        label: '深入左地', lx: 264, ly: 116, anchor: 'start' },
      { d: 'M 296 76 C 308 60 318 50 326 42', side: 'han', t0: 0.60, t1: 0.88,
        label: '登临瀚海', lx: 316, ly: 66, anchor: 'start' }
    ]
  },
  {
    label: '匈奴远遁', seal: '远遁',
    kicker: '阶段五 · 前119 年',
    title: '匈奴远遁，漠南无王庭',
    turn: '此役之后，匈奴远遁，漠南无王庭；汉军出塞战马十四万匹，还塞不满三万匹。汉匈攻守之势自此逆转。',
    why: '漠北之战把匈奴主力逐出漠南，汉朝获得战略主动权；但汉军战马损失惨重，也说明远征的代价极高。',
    src: '《史记·卫将军骠骑列传》《匈奴列传》；《资治通鉴》卷十九。「十四万匹」「不满三万匹」为史载。',
    events: [
      { time: '前119', who: '匈奴', text: '远遁，漠南无王庭', t: 0.08 },
      { time: '前119', who: '汉军', text: '班师还塞', t: 0.34 },
      { time: '前119', who: '汉廷', text: '置朔方、河西屯戍', t: 0.60 },
      { time: '前119', who: '汉匈', text: '攻守之势逆转', t: 0.84 }
    ],
    nums: [
      { label: '出塞战马', value: '十四万', kind: '史载', n: 140 },
      { label: '还塞战马', value: '不满三万', kind: '史载', n: 30 },
      { label: '匈奴', value: '远遁', kind: '史载', n: null }
    ],
    markers: [
      { type: 'host', side: 'han', x: 268, y: 100, t: 0.02, name: '卫青', lx: 254, ly: 112, anchor: 'end', weak: true },
      { type: 'host', side: 'han', x: 306, y: 74, t: 0.02, name: '霍去病', lx: 320, ly: 66, anchor: 'start', weak: true },
      { type: 'army', side: 'xiongnu', x: 330, y: 46, t: 0.40, name: '匈奴', lx: 316, ly: 38, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 306 70 C 316 58 324 48 330 40', side: 'retreat', t0: 0.06, t1: 0.44,
        label: '匈奴北遁', lx: 318, ly: 58, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = {};

var TERRAIN = {
  fills: [
    { d: 'M 120 60 C 180 40 260 36 340 50 L 340 130 C 260 118 190 124 120 140 Z', color: '#e6dcc6', opacity: 0.5 }
  ],
  strokes: [
    { d: 'M -10 236 C 70 230 150 240 230 234 C 300 228 350 232 385 230', color: '#a8b6ab', width: 3 },
    { d: 'M 120 150 C 170 130 220 110 280 92', color: '#c9bda4', width: 1.2, dash: [5, 4] }
  ],
  lines: [
    { d: 'M 64 64 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 78 82 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.7 },
    { d: 'M 48 304 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 132, y: 82, t: '大　漠', size: 11, color: '#6b5a44', ls: 6, serif: true },
    { x: 24, y: 232, t: '黄　河', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '定襄·今内蒙古和林格尔北　代郡·今河北蔚县东北　狼居胥山·今蒙古国肯特山', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '漠　北', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'mobei',
  title: '漠北之战',
  kicker: '沙 盘 推 演',
  subtitle: '定襄 · 狼居胥山',
  years: '前119',
  yearUnit: '',
  era: '西汉 · 元狩四年',
  mapNote: '旗＝军势 ｜ 城点＝地点 ｜ 虚线＝行军与退却',
  note: '示意沙盘：定襄今内蒙古和林格尔北、狼居胥山今蒙古国肯特山，非真实地理比例',
  hook: '卫青、霍去病各五万骑深入漠北，封狼居胥，匈奴远遁',
  period: '西汉',
  yearValue: -119,
  cityMode: 'neutral',
  hideFocus: true,
  endSeal: { a: '汉', b: '胜', sub: '前119' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
