/**
 * 沙盘推演 · 河南之战（前127）
 * 通行叙事：匈奴犯边、卫青出云中、西至高阙、破楼烦白羊王、尽收河南地、汉置朔方郡。
 * 卫青军与匈奴兵力均无确载；「捕首虏数千，畜百余万」为史载。
 * 地名古今对照：河南地即河套，朔方今内蒙古杭锦旗北，高阙今内蒙古乌拉特中旗西南。
 */
var COLOR = { han: '#2b5262', xiongnu: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'changan',  name: '长安', x: 66,  y: 258, tx: 66,  ty: 274, anchor: 'middle' },
  { id: 'yunzhong', name: '云中', x: 168, y: 148, tx: 154, ty: 158, anchor: 'end' },
  { id: 'gaoyue',   name: '高阙', x: 136, y: 108, tx: 122, ty: 100, anchor: 'end' },
  { id: 'shuofang', name: '朔方', x: 166, y: 122, tx: 180, ty: 116, anchor: 'start' },
  { id: 'longxi',   name: '陇西', x: 104, y: 204, tx: 90,  ty: 214, anchor: 'end' },
  { id: 'shanggu',  name: '上谷', x: 300, y: 96,  tx: 300, ty: 82,  anchor: 'middle' },
  { id: 'yuyang',   name: '渔阳', x: 324, y: 78,  tx: 324, ty: 64,  anchor: 'middle' }
];

var BASE0 = { changan: 'han', yunzhong: 'han', gaoyue: 'xiongnu', shuofang: 'xiongnu', longxi: 'han', shanggu: 'han', yuyang: 'han' };
var BASE1 = { changan: 'han', yunzhong: 'han', gaoyue: 'xiongnu', shuofang: 'xiongnu', longxi: 'han', shanggu: 'contested', yuyang: 'contested' };
var BASE2 = { changan: 'han', yunzhong: 'han', gaoyue: 'contested', shuofang: 'xiongnu', longxi: 'han', shanggu: 'contested', yuyang: 'contested' };
var BASE3 = { changan: 'han', yunzhong: 'han', gaoyue: 'han', shuofang: 'han', longxi: 'han', shanggu: 'han', yuyang: 'han' };

var STAGES = [
  {
    label: '匈奴犯边', seal: '犯边',
    kicker: '阶段一 · 前127 年',
    title: '匈奴入上谷、渔阳',
    turn: '匈奴入上谷、渔阳，杀略吏民；白羊王、楼烦王复居河南地，逼近关中。汉武帝决意反击，命卫青率军出云中。',
    why: '河南地水草丰美、扼关中之北，匈奴据之则长安受威胁；汉廷要拔掉这颗钉子。',
    src: '《史记·匈奴列传》《卫将军骠骑列传》；《资治通鉴》卷十八。兵力无确载。',
    events: [
      { time: '前127', who: '匈奴', text: '入上谷、渔阳，杀略吏民', t: 0.08, kind: 'flip', city: 'shanggu' },
      { time: '前127', who: '汉廷', text: '议反击匈奴', t: 0.32 },
      { time: '前127', who: '白羊·楼烦王', text: '居河南地，窥关中', t: 0.58, kind: 'flip', city: 'yuyang' },
      { time: '前127', who: '汉武帝', text: '命卫青出击', t: 0.84 }
    ],
    nums: [
      { label: '匈奴军', value: '无确载', kind: '无确载', n: null },
      { label: '汉边民', value: '无确载', kind: '无确载', n: null },
      { label: '河南地', value: '被据', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { shanggu: 0.08, yuyang: 0.58 },
    markers: [
      { type: 'host', side: 'xiongnu', x: 300, y: 96, t: 0.02, name: '匈奴', lx: 314, ly: 90, anchor: 'start' },
      { type: 'host', side: 'han', x: 66, y: 258, t: 0.02, name: '汉武帝', lx: 80, ly: 252, anchor: 'start' },
      { type: 'army', side: 'xiongnu', x: 166, y: 122, t: 0.56, name: '白羊王', lx: 180, ly: 128, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 304 100 C 292 118 260 136 200 136', side: 'xiongnu', t0: 0.06, t1: 0.40,
        label: '匈奴南下', lx: 256, ly: 146, anchor: 'middle' }
    ]
  },
  {
    label: '卫青出云中', seal: '迂回',
    kicker: '阶段二 · 前127 年',
    title: '卫青出云中，西至高阙',
    turn: '卫青率军出云中，沿黄河西进，至高阙，迂回包抄河南地匈奴之后；楼烦、白羊王未及防备。',
    why: '汉军不正面驱赶，而是绕到匈奴侧后，切断其北逃之路；这是卫青用兵的典型迂回。',
    src: '《史记·卫将军骠骑列传》《匈奴列传》；《资治通鉴》卷十八。',
    events: [
      { time: '前127', who: '卫青', text: '出云中，沿河西进', t: 0.08 },
      { time: '前127', who: '汉军', text: '西至高阙，迂回包抄', t: 0.34, kind: 'flip', city: 'gaoyue' },
      { time: '前127', who: '楼烦·白羊王', text: '未及防备', t: 0.58 },
      { time: '前127', who: '卫青', text: '南下陇西，断其归路', t: 0.84 }
    ],
    nums: [
      { label: '卫青军', value: '无确载', kind: '无确载', n: null },
      { label: '匈奴军', value: '无确载', kind: '无确载', n: null },
      { label: '高阙', value: '要冲', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { gaoyue: 0.34 },
    markers: [
      { type: 'host', side: 'han', x: 168, y: 148, t: 0.02, name: '卫青', lx: 182, ly: 142, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'han', x: 140, y: 114, t: 0.32, name: '汉军', lx: 126, ly: 126, anchor: 'end' },
      { type: 'host', side: 'xiongnu', x: 166, y: 122, t: 0.02, name: '白羊王', lx: 180, ly: 116, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 164 144 C 152 132 142 120 138 112', side: 'han', t0: 0.06, t1: 0.44,
        label: '西进高阙', lx: 176, ly: 128, anchor: 'start' }
    ]
  },
  {
    label: '收河南地', seal: '收地',
    kicker: '阶段三 · 前127 年',
    title: '破楼烦、白羊王，尽收河南地',
    turn: '卫青击楼烦王、白羊王，匈奴败走；汉军尽收河南地，捕首虏数千，畜百余万。',
    why: '河南地既得，汉朝获得拱卫关中的战略缓冲区，也取得北击匈奴的前进基地。',
    src: '《史记·卫将军骠骑列传》《匈奴列传》；《资治通鉴》卷十八。「捕首虏数千，畜百余万」为史载。',
    events: [
      { time: '前127', who: '卫青', text: '击楼烦、白羊王', t: 0.08 },
      { time: '前127', who: '匈奴', text: '败走，河南地空', t: 0.34, kind: 'flip', city: 'gaoyue' },
      { time: '前127', who: '汉军', text: '尽收河南地', t: 0.58, kind: 'flip', city: 'shuofang' },
      { time: '前127', who: '汉军', text: '捕首虏数千，畜百余万', t: 0.84 }
    ],
    nums: [
      { label: '捕首虏', value: '数千', kind: '史载', n: 5 },
      { label: '畜', value: '百余万', kind: '史载', n: null },
      { label: '匈奴', value: '败走', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { gaoyue: 0.34, shuofang: 0.58 },
    sieges: [
      { x: 166, y: 122, t: 0.58, label: '收河南地', side: 'han', lx: 0, ly: -12, anchor: 'middle' }
    ],
    markers: [
      { type: 'host', side: 'han', x: 166, y: 122, t: 0.02, name: '卫青', lx: 152, ly: 134, anchor: 'end' },
      { type: 'army', side: 'han', x: 150, y: 130, t: 0.32, name: '汉军', lx: 136, ly: 122, anchor: 'end' },
      { type: 'army', side: 'xiongnu', x: 174, y: 116, t: 0.02, name: '匈奴', lx: 188, ly: 110, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 140 116 C 146 118 152 120 158 122', side: 'han', t0: 0.06, t1: 0.40,
        label: '合击匈奴', lx: 138, ly: 128, anchor: 'end' }
    ]
  },
  {
    label: '置朔方郡', seal: '置郡',
    kicker: '阶段四 · 前127 年',
    title: '汉置朔方郡，筑城屯垦',
    turn: '汉置朔方郡、五原郡，筑朔方城，募民徙居，屯垦戍边；河南地正式纳入汉朝郡县体系。',
    why: '军事胜利要转化为持久控制，必须筑城、移民、屯田；朔方郡从此成为汉匈战争的前沿支点。',
    src: '《史记·匈奴列传》《平准书》；《资治通鉴》卷十八。',
    events: [
      { time: '前127', who: '汉武帝', text: '置朔方郡、五原郡', t: 0.08 },
      { time: '前127', who: '汉廷', text: '筑朔方城', t: 0.34 },
      { time: '前127', who: '汉廷', text: '募民徙居，屯垦戍边', t: 0.58 },
      { time: '前127', who: '汉', text: '河南地为汉所有', t: 0.84 }
    ],
    nums: [
      { label: '置郡', value: '朔方', kind: '史载', n: null },
      { label: '徙民', value: '无确载', kind: '无确载', n: null },
      { label: '汉军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE3,
    markers: [
      { type: 'host', side: 'han', x: 66, y: 258, t: 0.02, name: '汉武帝', lx: 80, ly: 264, anchor: 'start' },
      { type: 'army', side: 'han', x: 166, y: 122, t: 0.30, name: '朔方城', lx: 180, ly: 128, anchor: 'start' },
      { type: 'host', side: 'han', x: 104, y: 204, t: 0.60, name: '陇西', lx: 90, ly: 196, anchor: 'end', weak: true }
    ],
    routes: []
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 222 C 50 216 110 226 170 220 C 230 214 300 208 385 212', color: '#a8b6ab', width: 3 },
    { d: 'M 118 60 C 130 96 142 130 150 168 C 156 196 160 220 164 246', color: '#a8b6ab', width: 3 },
    { d: 'M 96 74 C 150 66 220 62 300 68', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 72 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 214 56 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 44 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 318 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 22, y: 218, t: '黄　河', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 104, y: 62, t: '阴　山', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '河南地·今河套　朔方·今内蒙古杭锦旗北　高阙·今内蒙古乌拉特中旗西南', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '河　套', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'henan',
  title: '河南之战',
  kicker: '沙 盘 推 演',
  subtitle: '云中 · 高阙',
  years: '前127',
  yearUnit: '',
  era: '西汉 · 元朔二年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻取 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：河南地即今河套，朔方今内蒙古杭锦旗北，非真实地理比例',
  hook: '卫青西出云中，破楼烦白羊王，尽收河南地，汉置朔方郡',
  period: '西汉',
  yearValue: -127,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '汉', b: '收河南', sub: '前127' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
