/**
 * 沙盘推演 · 崤之战（前627）
 * 通行叙事：秦穆公袭郑、蹇叔哭师、弦高犒师、崤山伏击、秦伯哭师。
 * 秦、晋双方兵力均无确载，只标「无确载」，不估算人数；
 * 「匹马只轮无反」为《左传》对战场结果的史载描述。
 * 地名古今对照：崤山今河南三门峡东、滑今河南偃师东南。
 */
var COLOR = { qin: '#6f3a22', jin: '#2b5262', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'yong',   name: '雍',   x: 44,  y: 158, tx: 44,  ty: 172, anchor: 'middle' },
  { id: 'xiao',   name: '崤山', x: 118, y: 186, tx: 118, ty: 200, anchor: 'middle' },
  { id: 'hu',     name: '滑',   x: 182, y: 196, tx: 182, ty: 210, anchor: 'middle' },
  { id: 'zheng',  name: '郑',   x: 244, y: 208, tx: 244, ty: 222, anchor: 'middle' },
  { id: 'jiang',  name: '绛',   x: 176, y: 96,  tx: 176, ty: 82,  anchor: 'middle' }
];

var STAGES = [
  {
    label: '袭郑', seal: '东袭',
    kicker: '阶段一 · 前627 年 春',
    title: '秦穆公袭郑，蹇叔哭师',
    turn: '秦穆公不听蹇叔、百里奚之谏，遣孟明视、西乞术、白乙丙率师袭郑；蹇叔哭送，预言「晋人御师必于崤」。',
    why: '秦军千里袭郑，补给线长、行踪难密；晋国新丧文公，秦却借道晋、周之地，等于把侧翼交给潜在敌手。',
    src: '《左传·僖公三十二年、三十三年》；《史记·秦本纪》。秦军数目无确载。',
    events: [
      { time: '前627·春', who: '秦穆公', text: '谋袭郑，不听蹇叔之谏', t: 0.06 },
      { time: '前627·春', who: '蹇叔', text: '哭师，预言晋御于崤', t: 0.32 },
      { time: '前627·春', who: '孟明视', text: '率师东出，过周北门', t: 0.58 },
      { time: '前627·春', who: '王孙满', text: '观秦师轻佻无礼', t: 0.84 }
    ],
    nums: [
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '戎车', value: '无确载', kind: '无确载', n: null },
      { label: '晋军', value: '无确载', kind: '无确载', n: null }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 44, y: 158, t: 0.02, name: '秦穆公', lx: 58, ly: 156, anchor: 'start' },
      { type: 'army', side: 'qin', x: 100, y: 170, t: 0.30, name: '孟明视', lx: 96, ly: 184, anchor: 'end', moveRef: 0 },
      { type: 'host', side: 'jin', x: 176, y: 96, t: 0.02, name: '晋襄公', lx: 190, ly: 94, anchor: 'start' }
    ],
    routes: [
      { d: 'M 50 160 C 70 166 86 170 96 172', side: 'qin', t0: 0.28, t1: 0.50,
        label: '秦师东出', lx: 64, ly: 184, anchor: 'start' }
    ]
  },
  {
    label: '犒师', seal: '弦高',
    kicker: '阶段二 · 前627 年 春',
    title: '弦高犒师，秦灭滑而还',
    turn: '秦师及滑，郑商人弦高以牛十二犒师，诈称郑君所遣；秦将以为郑已有备，遂灭滑而还。',
    why: '一次商人的临机应对，改变了秦军的判断；袭郑不成，秦军转为灭滑，却在回师路上把自己送进了崤山隘口。',
    src: '《左传·僖公三十三年》；《史记·秦本纪》。牛十二头为史载。',
    events: [
      { time: '前627·春', who: '秦师', text: '及滑', t: 0.06 },
      { time: '前627·春', who: '弦高', text: '以牛十二犒师', t: 0.32 },
      { time: '前627·春', who: '孟明视', text: '以为郑有备，灭滑', t: 0.60 },
      { time: '前627·春', who: '秦师', text: '还师西归', t: 0.82 }
    ],
    nums: [
      { label: '犒师', value: '牛十二头', kind: '史载', n: null },
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '滑', value: '无确载', kind: '无确载', n: null }
    ],
    markers: [
      { type: 'army', side: 'qin', x: 182, y: 196, t: 0.06, name: '秦师', lx: 196, ly: 206, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'jin', x: 244, y: 208, t: 0.02, name: '郑伯', lx: 258, ly: 216, anchor: 'start' }
    ],
    routes: [
      { d: 'M 122 186 C 144 188 164 192 178 194', side: 'qin', t0: 0.06, t1: 0.30,
        label: '秦师至滑', lx: 140, ly: 202, anchor: 'middle' },
      { d: 'M 188 200 C 212 204 232 206 240 208', side: 'qin', t0: 0.34, t1: 0.52,
        label: '谋袭郑', lx: 210, ly: 216, anchor: 'middle' },
      { d: 'M 238 212 C 216 208 198 204 186 200', side: 'retreat', t0: 0.64, t1: 0.84,
        label: '灭滑而还', lx: 212, ly: 224, anchor: 'middle' }
    ]
  },
  {
    label: '崤伏', seal: '崤山',
    kicker: '阶段三 · 前627 年 四月',
    title: '晋伏兵崤山，秦师尽没',
    turn: '晋襄公墨衰绖，与姜戎合兵，伏于崤山险隘；秦师回至崤，遭前后夹击，匹马只轮无反。',
    why: '崤山南北两陵夹道，秦军行于谷中无法展开；晋军以逸待劳，一封锁谷口，秦军的数量与车阵都失去意义。',
    src: '《左传·僖公三十三年》「败秦师于崤」；《史记·秦本纪》《晋世家》。「匹马只轮无反」为史载。',
    events: [
      { time: '前627·四月', who: '晋襄公', text: '墨衰绖，兴姜戎之师', t: 0.06 },
      { time: '前627·四月', who: '晋军', text: '伏于崤山两陵之间', t: 0.32 },
      { time: '前627·四月', who: '秦师', text: '入崤，遭前后夹击', t: 0.58 },
      { time: '前627·四月', who: '秦师', text: '匹马只轮无反', t: 0.84 }
    ],
    nums: [
      { label: '晋军', value: '无确载', kind: '无确载', n: null },
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '战果', value: '匹马只轮无反', kind: '史载', n: null }
    ],
    sieges: [
      { x: 118, y: 186, t: 0.58, label: '崤山伏击', side: 'jin', lx: -10, ly: 16, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'jin', x: 108, y: 168, t: 0.04, name: '晋军', lx: 96, ly: 160, anchor: 'end' },
      { type: 'army', side: 'qin', x: 130, y: 192, t: 0.02, name: '秦师', lx: 144, ly: 202, anchor: 'start', weak: true },
      { type: 'army', side: 'jin', x: 104, y: 200, t: 0.50, name: '姜戎', lx: 92, ly: 208, anchor: 'end' }
    ],
    routes: [
      { d: 'M 178 98 C 156 124 134 152 122 176', side: 'jin', t0: 0.06, t1: 0.34,
        label: '晋军南下', lx: 164, ly: 136, anchor: 'middle' },
      { d: 'M 186 198 C 158 196 136 192 126 190', side: 'retreat', t0: 0.30, t1: 0.56,
        label: '秦师入崤', lx: 160, ly: 204, anchor: 'middle' },
      { d: 'M 124 188 C 106 188 92 186 82 184', side: 'retreat', t0: 0.60, t1: 0.88,
        label: '秦师覆没', lx: 96, ly: 174, anchor: 'middle' }
    ]
  },
  {
    label: '秦誓', seal: '秦誓',
    kicker: '阶段四 · 前627 年',
    title: '秦伯哭师，作《秦誓》',
    turn: '秦穆公素服郊迎败军，不替孟明，作《秦誓》自责「以民之故，自我用之」；秦晋自此交恶，秦转而西向。',
    why: '秦穆公不诿过于将帅，保住了孟明等人才；崤之败让秦东进受挫，却促成其经营西戎的战略转向。',
    src: '《尚书·秦誓》；《左传·僖公三十三年》；《史记·秦本纪》。',
    events: [
      { time: '前627', who: '秦穆公', text: '素服郊迎，哭师', t: 0.08 },
      { time: '前627', who: '秦穆公', text: '不替孟明，作《秦誓》', t: 0.36 },
      { time: '前627', who: '秦', text: '东进受挫，转而西向', t: 0.64 },
      { time: '前625', who: '孟明视', text: '再伐晋，报崤之役', t: 0.86 }
    ],
    nums: [
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '晋军', value: '无确载', kind: '无确载', n: null },
      { label: '被俘三将', value: '孟明视等三人', kind: '史载', n: null }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 44, y: 158, t: 0.06, name: '秦穆公', lx: 58, ly: 156, anchor: 'start' },
      { type: 'army', side: 'qin', x: 82, y: 166, t: 0.02, name: '败军', lx: 92, ly: 180, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 118 190 C 96 182 74 172 56 164', side: 'retreat', t0: 0.10, t1: 0.40,
        label: '败军西归', lx: 92, ly: 190, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = {};

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 120 C 60 130 130 148 190 158 C 250 168 310 166 385 150', color: '#a8b6ab', width: 3 }
  ],
  lines: [
    { d: 'M 86 160 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 104 172 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 128 166 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 290 96 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 56 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 20, y: 106, t: '黄　河', size: 10, color: '#46594f', ls: 3, serif: true },
    { x: 96, y: 146, t: '崤　山', size: 9, color: '#7d6647', ls: 3, serif: true, rotate: -8 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '崤山·今河南三门峡东　滑·今河南偃师东南', size: 7.5, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '关 中 · 中 原', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'xiao',
  title: '崤之战',
  kicker: '沙 盘 推 演',
  subtitle: '崤山 · 秦晋',
  years: '前627',
  yearUnit: '',
  era: '春秋 · 晋襄公元年',
  mapNote: '点＝地点 ｜ 旗＝军势 ｜ 圈＝伏击 ｜ 虚线＝退却',
  note: '示意沙盘：崤山今河南三门峡东、滑今河南偃师东南，非真实地理比例',
  hook: '秦师千里袭郑不成，回师崤山遭晋伏击，匹马只轮无反',
  period: '春秋',
  yearValue: -627,
  cityMode: 'neutral',
  hideFocus: true,
  endSeal: { a: '秦', b: '败', sub: '前627' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
