/**
 * 沙盘推演 · 泓水之战（前638）
 * 通行叙事：宋襄公合诸侯伐郑，楚成王救郑；两军夹泓水而阵，
 * 宋军先至，楚军半渡、未阵，目夷两请击之，襄公皆不许；楚军既阵而击，宋师大败，襄公伤股。
 * 双方兵力无确载；「不鼓不成列」「伤股」为史载。
 * 地名古今对照：泓水今河南柘城西北、商丘今河南商丘、郑今河南新郑、陈今河南淮阳、郢今湖北荆州。
 */
var COLOR = { song: '#2b5262', chu: '#6f3a22', zheng: '#4a5570', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'zheng',    name: '郑',   x: 130, y: 112, tx: 130, ty: 98,  anchor: 'middle' },
  { id: 'song',     name: '商丘', x: 196, y: 140, tx: 196, ty: 126, anchor: 'middle' },
  { id: 'hongshui', name: '泓水', x: 214, y: 186, tx: 228, ty: 180, anchor: 'start' },
  { id: 'chen',     name: '陈',   x: 268, y: 208, tx: 268, ty: 222, anchor: 'middle' },
  { id: 'ying',     name: '郢',   x: 214, y: 310, tx: 214, ty: 324, anchor: 'middle' }
];

var BASE0 = { zheng: 'zheng', song: 'song', hongshui: 'song', chen: 'chu', ying: 'chu' };
var BASE1 = { zheng: 'zheng', song: 'song', hongshui: 'contested', chen: 'chu', ying: 'chu' };
var BASE2 = { zheng: 'zheng', song: 'song', hongshui: 'contested', chen: 'chu', ying: 'chu' };
var BASE3 = { zheng: 'zheng', song: 'song', hongshui: 'chu', chen: 'chu', ying: 'chu' };

var STAGES = [
  {
    label: '宋伐郑', seal: '争霸',
    kicker: '阶段一 · 前 638 年',
    title: '宋襄公伐郑，楚成王救郑',
    turn: '宋襄公合诸侯伐郑，郑告急于楚；楚成王率师救郑，宋军释郑而御楚，两军趋泓水。',
    why: '宋襄公欲继齐桓之业而争霸，伐郑是试探；楚若救郑，宋便须与楚正面一战。',
    src: '《左传·僖公二十二年》；《史记·宋微子世家》。',
    events: [
      { time: '前638', who: '宋襄公', text: '合诸侯伐郑', t: 0.08 },
      { time: '前638', who: '郑', text: '告急于楚', t: 0.34 },
      { time: '前638', who: '楚成王', text: '率师救郑', t: 0.58 },
      { time: '前638', who: '宋军', text: '释郑而御楚，两军趋泓水', t: 0.84 }
    ],
    nums: [
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '战场', value: '泓水', kind: '史载', n: null }
    ],
    hold: BASE0,
    markers: [
      { type: 'host', side: 'song', x: 196, y: 140, t: 0.02, name: '宋襄公', lx: 196, ly: 126, anchor: 'middle' },
      { type: 'host', side: 'chu', x: 214, y: 310, t: 0.02, name: '楚成王', lx: 228, ly: 310, anchor: 'start' },
      { type: 'army', side: 'song', x: 178, y: 128, t: 0.10, name: '宋军', lx: 164, ly: 122, anchor: 'end' }
    ],
    routes: [
      { d: 'M 206 150 C 196 138 186 126 178 116', side: 'song', t0: 0.06, t1: 0.40,
        label: '宋伐郑', lx: 200, ly: 158, anchor: 'start' },
      { d: 'M 216 300 C 220 270 228 236 234 208', side: 'chu', t0: 0.56, t1: 0.92,
        label: '楚师北上', lx: 200, ly: 256, anchor: 'end' }
    ]
  },
  {
    label: '半渡', seal: '不击',
    kicker: '阶段二 · 前 638 年',
    title: '楚军半渡泓水，宋襄公不许击',
    turn: '宋军先至泓水北岸列阵；楚军渡水，公孙目夷请「半渡而击之」，襄公曰「不可」。',
    why: '半渡是击敌的最佳时机；襄公拘于「仁义」，把战机让给了楚军。',
    src: '《左传·僖公二十二年》。「宋人既成列，楚人未既济」为史载。',
    events: [
      { time: '前638', who: '宋军', text: '先至泓水北岸列阵', t: 0.08 },
      { time: '前638', who: '楚军', text: '渡泓水', t: 0.34, kind: 'flip', city: 'hongshui' },
      { time: '前638', who: '公孙目夷', text: '请半渡而击之', t: 0.58 },
      { time: '前638', who: '宋襄公', text: '曰「不可」', t: 0.84 }
    ],
    nums: [
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '战机', value: '半渡', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { hongshui: 0.34 },
    markers: [
      { type: 'host', side: 'song', x: 214, y: 186, t: 0.02, name: '宋襄公', lx: 214, ly: 172, anchor: 'middle' },
      { type: 'host', side: 'chu', x: 214, y: 240, t: 0.30, name: '楚成王', lx: 228, ly: 236, anchor: 'start' },
      { type: 'army', side: 'song', x: 226, y: 176, t: 0.08, name: '宋军', lx: 240, ly: 170, anchor: 'start' }
    ],
    routes: [
      { d: 'M 214 230 C 214 218 214 204 214 194', side: 'chu', t0: 0.28, t1: 0.62,
        label: '楚军渡水', lx: 200, ly: 212, anchor: 'end' }
    ]
  },
  {
    label: '未阵', seal: '再拒',
    kicker: '阶段三 · 前 638 年',
    title: '楚军既渡未阵，目夷再请，襄公又不许',
    turn: '楚军既渡而未成列，目夷再请击之；襄公曰「不鼓不成列」，仍按兵不动，待楚军列阵。',
    why: '敌军渡水后阵形未整，是第二个战机；襄公再一次放过，宋军只能等楚军从容列阵。',
    src: '《左传·僖公二十二年》。「不鼓不成列」为史载。',
    events: [
      { time: '前638', who: '楚军', text: '既渡而未成列', t: 0.08 },
      { time: '前638', who: '公孙目夷', text: '再请击之', t: 0.34 },
      { time: '前638', who: '宋襄公', text: '曰「不鼓不成列」', t: 0.58 },
      { time: '前638', who: '楚军', text: '从容列阵', t: 0.84 }
    ],
    nums: [
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '战术', value: '待敌成列', kind: '史载', n: null }
    ],
    hold: BASE2,
    markers: [
      { type: 'host', side: 'song', x: 214, y: 186, t: 0.02, name: '宋襄公', lx: 228, ly: 180, anchor: 'start' },
      { type: 'host', side: 'chu', x: 214, y: 206, t: 0.30, name: '楚成王', lx: 200, ly: 200, anchor: 'end' },
      { type: 'army', side: 'chu', x: 224, y: 196, t: 0.80, name: '楚军', lx: 238, ly: 192, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '宋师败绩', seal: '大败',
    kicker: '阶段四 · 前 638 年',
    title: '楚军既阵而击，宋师大败',
    turn: '楚军列阵既成，鼓而进击；宋军久待气惰，一战而溃，襄公伤股，宋人皆怨之。',
    why: '襄公两次放弃战机，楚军得以完整列阵；宋军以弱击强，败局已定，争霸之志亦随之破灭。',
    src: '《左传·僖公二十二年》；《史记·宋微子世家》。「公伤股，门官歼焉」为史载。',
    events: [
      { time: '前638', who: '楚军', text: '列阵既成，鼓而进', t: 0.08 },
      { time: '前638', who: '宋军', text: '一战而溃，泓水失守', t: 0.34, kind: 'flip', city: 'hongshui' },
      { time: '前638', who: '宋襄公', text: '伤股，门官歼焉', t: 0.58 },
      { time: '前638', who: '宋人', text: '皆怨襄公', t: 0.84 }
    ],
    nums: [
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '宋师败绩', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { hongshui: 0.34 },
    sieges: [
      { x: 214, y: 186, t: 0.34, label: '宋军溃', side: 'chu', lx: -12, ly: 12, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'chu', x: 214, y: 186, t: 0.02, name: '楚成王', lx: 228, ly: 180, anchor: 'start' },
      { type: 'host', side: 'song', x: 214, y: 186, t: 0.02, name: '宋襄公', lx: 200, ly: 172, anchor: 'end', weak: true },
      { type: 'army', side: 'chu', x: 222, y: 176, t: 0.30, name: '楚军', lx: 236, ly: 170, anchor: 'start' }
    ],
    routes: [
      { d: 'M 220 178 C 230 168 240 158 248 150', side: 'retreat', t0: 0.34, t1: 0.74,
        label: '宋军败走', lx: 216, ly: 164, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 40 196 C 96 190 158 198 214 194 C 268 190 322 196 380 192', color: '#a8b6ab', width: 2.2 },
    { d: 'M 130 60 C 150 100 176 140 200 180', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 70 76 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 92 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 60 330 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 330 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 26, y: 192, t: '泓　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '泓水·今河南柘城西北　商丘·今河南商丘　陈·今河南淮阳　郢·今湖北荆州', size: 6.4, color: '#7d6647', ls: 0.3 },
    { x: 24, y: 366, t: '宋　楚', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'hongshui',
  title: '泓水之战',
  kicker: '沙 盘 推 演',
  subtitle: '泓水 · 商丘',
  years: '前638',
  yearUnit: '',
  era: '春秋 · 宋襄公十三年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：泓水今河南柘城西北、商丘今河南商丘，非真实地理比例',
  hook: '宋襄公两次不击半渡未阵之楚军，泓水一战，宋师败绩',
  period: '春秋',
  yearValue: -638,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '楚', b: '胜', sub: '前638' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
