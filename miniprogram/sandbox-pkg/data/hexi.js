/**
 * 沙盘推演 · 河西之战（前121）
 * 通行叙事：霍去病春出陇西、夏至祁连、浑邪王杀休屠王请降、汉受降、置五属国。
 * 霍去病万骑、斩首八千余、斩首三万二百、降众四万余、斩逃者八千均为史载；
 * 其余兵力无确载。地名古今对照：焉支山今甘肃山丹东南、祁连山今甘肃青海界、姑臧今甘肃武威。
 */
var COLOR = { han: '#2b5262', xiongnu: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'changan',  name: '长安', x: 60,  y: 264, tx: 60,  ty: 280, anchor: 'middle' },
  { id: 'longxi',   name: '陇西', x: 116, y: 212, tx: 102, ty: 222, anchor: 'end' },
  { id: 'yanzhi',   name: '焉支山', x: 188, y: 140, tx: 188, ty: 126, anchor: 'middle' },
  { id: 'qilian',   name: '祁连山', x: 226, y: 96,  tx: 226, ty: 82,  anchor: 'middle' },
  { id: 'guzang',   name: '姑臧', x: 196, y: 174, tx: 210, ty: 180, anchor: 'start' },
  { id: 'dunhuang', name: '敦煌', x: 150, y: 120, tx: 136, ty: 112, anchor: 'end' }
];

var BASE0 = { changan: 'han', longxi: 'han', yanzhi: 'xiongnu', qilian: 'xiongnu', guzang: 'xiongnu', dunhuang: 'xiongnu' };
var BASE1 = { changan: 'han', longxi: 'han', yanzhi: 'contested', qilian: 'xiongnu', guzang: 'xiongnu', dunhuang: 'xiongnu' };
var BASE2 = { changan: 'han', longxi: 'han', yanzhi: 'contested', qilian: 'contested', guzang: 'xiongnu', dunhuang: 'xiongnu' };
var BASE3 = { changan: 'han', longxi: 'han', yanzhi: 'contested', qilian: 'contested', guzang: 'contested', dunhuang: 'xiongnu' };
var BASE4 = { changan: 'han', longxi: 'han', yanzhi: 'contested', qilian: 'contested', guzang: 'han', dunhuang: 'xiongnu' };
var BASE5 = { changan: 'han', longxi: 'han', yanzhi: 'han', qilian: 'han', guzang: 'han', dunhuang: 'han' };

var STAGES = [
  {
    label: '春出陇西', seal: '初击',
    kicker: '阶段一 · 前121 年 春',
    title: '霍去病率万骑出陇西',
    turn: '霍去病率万骑出陇西，过焉支山千余里，击匈奴，杀折兰王、卢胡王，执浑邪王子，收休屠王祭天金人，斩首八千余级。',
    why: '汉军以轻骑远程奔袭，打的是匈奴河西诸部的措手不及；此战首次把战火烧到河西腹地。',
    src: '《史记·卫将军骠骑列传》《匈奴列传》；《资治通鉴》卷十九。万骑、八千余级为史载。',
    events: [
      { time: '前121·春', who: '霍去病', text: '率万骑出陇西', t: 0.08 },
      { time: '前121·春', who: '汉军', text: '过焉支山千余里', t: 0.34, kind: 'flip', city: 'yanzhi' },
      { time: '前121·春', who: '霍去病', text: '杀折兰王、卢胡王', t: 0.58 },
      { time: '前121·春', who: '汉军', text: '斩首八千余级，收祭天金人', t: 0.84 }
    ],
    nums: [
      { label: '霍去病军', value: '万骑', kind: '史载', n: 10 },
      { label: '斩首', value: '八千余', kind: '史载', n: 8 },
      { label: '匈奴', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE1,
    flips: { yanzhi: 0.34 },
    markers: [
      { type: 'host', side: 'han', x: 116, y: 212, t: 0.02, name: '霍去病', lx: 130, ly: 206, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'xiongnu', x: 188, y: 140, t: 0.02, name: '折兰王', lx: 174, ly: 132, anchor: 'end', weak: true },
      { type: 'army', side: 'han', x: 168, y: 164, t: 0.50, name: '汉骑', lx: 154, ly: 156, anchor: 'end' }
    ],
    routes: [
      { d: 'M 120 206 C 140 184 162 162 182 146', side: 'han', t0: 0.06, t1: 0.44,
        label: '奔袭焉支', lx: 130, ly: 184, anchor: 'start' }
    ]
  },
  {
    label: '夏至祁连', seal: '再击',
    kicker: '阶段二 · 前121 年 夏',
    title: '霍去病深入祁连山',
    turn: '霍去病与公孙敖出北地，深入至祁连山，破匈奴，斩首三万二百级，俘获酋涂王等。',
    why: '春夏两次连续打击，使河西匈奴诸部来不及休整；祁连山一战基本摧毁其河西主力。',
    src: '《史记·卫将军骠骑列传》；《资治通鉴》卷十九。三万二百级为史载。',
    events: [
      { time: '前121·夏', who: '霍去病', text: '与公孙敖出北地', t: 0.08 },
      { time: '前121·夏', who: '汉军', text: '深入至祁连山', t: 0.34, kind: 'flip', city: 'qilian' },
      { time: '前121·夏', who: '汉军', text: '斩首三万二百级', t: 0.58 },
      { time: '前121·夏', who: '汉军', text: '俘酋涂王等', t: 0.84 }
    ],
    nums: [
      { label: '霍去病军', value: '无确载', kind: '无确载', n: null },
      { label: '斩首', value: '三万二百', kind: '史载', n: 30 },
      { label: '俘获', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE2,
    flips: { qilian: 0.34 },
    markers: [
      { type: 'host', side: 'han', x: 188, y: 140, t: 0.02, name: '霍去病', lx: 202, ly: 134, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'xiongnu', x: 226, y: 96, t: 0.02, name: '酋涂王', lx: 212, ly: 88, anchor: 'end', weak: true },
      { type: 'army', side: 'han', x: 212, y: 120, t: 0.50, name: '汉骑', lx: 198, ly: 128, anchor: 'end' }
    ],
    routes: [
      { d: 'M 192 136 C 202 122 212 110 220 100', side: 'han', t0: 0.06, t1: 0.44,
        label: '深入祁连', lx: 196, ly: 116, anchor: 'start' }
    ]
  },
  {
    label: '浑邪请降', seal: '请降',
    kicker: '阶段三 · 前121 年 秋',
    title: '浑邪王杀休屠王，请降于汉',
    turn: '匈奴单于怒浑邪王、休屠王屡败，欲召诛之；二王惧，谋降汉。休屠王中途反悔，浑邪王杀之，并其众，率四万余人请降。',
    why: '军事失败引发匈奴内部清算，浑邪王为自保而降；河西匈奴的抵抗体系由此从内部瓦解。',
    src: '《史记·匈奴列传》《卫将军骠骑列传》；《资治通鉴》卷十九。「四万余人」为史载。',
    events: [
      { time: '前121·秋', who: '匈奴单于', text: '怒二王屡败，欲召诛之', t: 0.08 },
      { time: '前121·秋', who: '浑邪王', text: '与休屠王谋降汉', t: 0.34, kind: 'flip', city: 'guzang' },
      { time: '前121·秋', who: '休屠王', text: '中途反悔', t: 0.58 },
      { time: '前121·秋', who: '浑邪王', text: '杀休屠王，并其众请降', t: 0.84 }
    ],
    nums: [
      { label: '浑邪王众', value: '四万余', kind: '史载', n: 40 },
      { label: '休屠王', value: '被杀', kind: '史载', n: null },
      { label: '匈奴', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE3,
    flips: { guzang: 0.34 },
    markers: [
      { type: 'host', side: 'xiongnu', x: 196, y: 174, t: 0.02, name: '浑邪王', lx: 210, ly: 168, anchor: 'start' },
      { type: 'army', side: 'xiongnu', x: 210, y: 186, t: 0.30, name: '休屠王', lx: 224, ly: 192, anchor: 'start', weak: true },
      { type: 'host', side: 'han', x: 116, y: 212, t: 0.02, name: '霍去病', lx: 102, ly: 204, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 198 180 C 184 194 156 204 132 210', side: 'xiongnu', t0: 0.60, t1: 0.86,
        label: '请降', lx: 168, ly: 212, anchor: 'middle' }
    ]
  },
  {
    label: '受降', seal: '受降',
    kicker: '阶段四 · 前121 年 秋',
    title: '霍去病渡河受降，斩逃者',
    turn: '霍去病渡河受降，与浑邪王相见；匈奴裨王欲逃者，霍去病驰入其阵，斩其欲亡者八千人，尽将其众渡河。',
    why: '受降也是战斗：稍有迟疑便可能变乱；霍去病以果断镇压稳住降众，河西归附得以完成。',
    src: '《史记·卫将军骠骑列传》《匈奴列传》；《资治通鉴》卷十九。「斩其欲亡者八千人」为史载。',
    events: [
      { time: '前121·秋', who: '霍去病', text: '渡河受降', t: 0.08 },
      { time: '前121·秋', who: '浑邪王', text: '率众归汉', t: 0.34, kind: 'flip', city: 'guzang' },
      { time: '前121·秋', who: '匈奴裨王', text: '欲逃者众', t: 0.58 },
      { time: '前121·秋', who: '霍去病', text: '斩欲亡者八千，尽将其众', t: 0.84 }
    ],
    nums: [
      { label: '降众', value: '四万余', kind: '史载', n: 40 },
      { label: '斩逃者', value: '八千', kind: '史载', n: 8 },
      { label: '霍去病军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE4,
    flips: { guzang: 0.34 },
    markers: [
      { type: 'host', side: 'han', x: 196, y: 174, t: 0.02, name: '霍去病', lx: 182, ly: 166, anchor: 'end' },
      { type: 'host', side: 'xiongnu', x: 210, y: 182, t: 0.02, name: '浑邪王', lx: 224, ly: 176, anchor: 'start', weak: true },
      { type: 'army', side: 'han', x: 150, y: 200, t: 0.60, name: '汉军', lx: 136, ly: 192, anchor: 'end' }
    ],
    routes: [
      { d: 'M 152 204 C 168 192 182 182 194 176', side: 'han', t0: 0.06, t1: 0.44,
        label: '渡河受降', lx: 158, ly: 194, anchor: 'start' }
    ]
  },
  {
    label: '置五属国', seal: '置属国',
    kicker: '阶段五 · 前121 年 后',
    title: '汉置五属国，河西归汉',
    turn: '汉分徙降众于五郡，置五属国；河西走廊纳入汉朝控制，通往西域的道路由此打开。',
    why: '河西既通，匈奴失去从西面夹击关中的可能；汉朝得以「断匈奴右臂」，经营西域。',
    src: '《史记·匈奴列传》《卫将军骠骑列传》；《资治通鉴》卷十九。',
    events: [
      { time: '前121 后', who: '汉武帝', text: '置五属国以处降众', t: 0.08 },
      { time: '前121 后', who: '汉', text: '河西走廊归汉', t: 0.34, kind: 'flip', city: 'yanzhi' },
      { time: '前121 后', who: '汉', text: '通西域之路打开', t: 0.60, kind: 'flip', city: 'qilian' },
      { time: '前121 后', who: '匈奴', text: '失河西，右臂断', t: 0.84, kind: 'flip', city: 'dunhuang' }
    ],
    nums: [
      { label: '属国', value: '五', kind: '史载', n: null },
      { label: '河西', value: '归汉', kind: '史载', n: null },
      { label: '匈奴', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE5,
    flips: { yanzhi: 0.34, qilian: 0.60, dunhuang: 0.84 },
    markers: [
      { type: 'host', side: 'han', x: 116, y: 212, t: 0.02, name: '霍去病', lx: 130, ly: 206, anchor: 'start', weak: true },
      { type: 'army', side: 'han', x: 196, y: 174, t: 0.34, name: '汉军', lx: 210, ly: 168, anchor: 'start' },
      { type: 'host', side: 'han', x: 60, y: 264, t: 0.60, name: '汉武帝', lx: 74, ly: 258, anchor: 'start', weak: true }
    ],
    routes: []
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 232 C 60 226 120 236 180 230 C 240 224 300 218 385 222', color: '#a8b6ab', width: 3 },
    { d: 'M 92 60 C 140 78 190 92 250 104 C 300 114 340 120 385 124', color: '#b6c3b6', width: 2.4 }
  ],
  lines: [
    { d: 'M 74 66 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 214 60 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 44 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 318 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 228, t: '黄　河', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 108, y: 64, t: '祁 连 山 脉', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '焉支山·今甘肃山丹东南　祁连山·今甘肃青海界　姑臧·今甘肃武威', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '河　西', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'hexi',
  title: '河西之战',
  kicker: '沙 盘 推 演',
  subtitle: '焉支山 · 祁连山',
  years: '前121',
  yearUnit: '',
  era: '西汉 · 元狩二年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻取 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：焉支山今甘肃山丹东南、姑臧今甘肃武威，非真实地理比例',
  hook: '霍去病两出河西，浑邪王率四万众降，汉置五属国',
  period: '西汉',
  yearValue: -121,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '汉', b: '取河西', sub: '前121' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
