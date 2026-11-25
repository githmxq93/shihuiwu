/**
 * 沙盘推演 · 番吾之战（前232）
 * 通行叙事：秦分两路攻赵、李牧先破北路于番吾、回师拒南路、秦军退。
 * 《史记·赵世家》仅载「秦攻番吾，李牧与之战，却之」，秦将姓名与双方兵力均无确载。
 * 地名古今对照：番吾今河北平山东、井陉今河北井陉北、邺今河北临漳西南。
 */
var COLOR = { qin: '#6f3a22', zhao: '#2b5262', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'taiyuan',  name: '太原', x: 78,  y: 86,  tx: 78,  ty: 72,  anchor: 'middle' },
  { id: 'langmeng', name: '狼孟', x: 118, y: 116, tx: 104, ty: 126, anchor: 'end' },
  { id: 'jingxing', name: '井陉', x: 152, y: 128, tx: 152, ty: 114, anchor: 'middle' },
  { id: 'fanwu',    name: '番吾', x: 196, y: 156, tx: 210, ty: 150, anchor: 'start' },
  { id: 'handan',   name: '邯郸', x: 214, y: 240, tx: 214, ty: 256, anchor: 'middle' },
  { id: 'ye',       name: '邺',   x: 286, y: 206, tx: 286, ty: 222, anchor: 'middle' }
];

var BASE0 = { taiyuan: 'qin', langmeng: 'qin', jingxing: 'qin', fanwu: 'zhao', handan: 'zhao', ye: 'qin' };
var BASE1 = { taiyuan: 'qin', langmeng: 'qin', jingxing: 'qin', fanwu: 'contested', handan: 'zhao', ye: 'qin' };
var BASE2 = { taiyuan: 'qin', langmeng: 'qin', jingxing: 'contested', fanwu: 'zhao', handan: 'zhao', ye: 'qin' };
var BASE3 = { taiyuan: 'qin', langmeng: 'qin', jingxing: 'qin', fanwu: 'zhao', handan: 'zhao', ye: 'contested' };
var BASE4 = { taiyuan: 'qin', langmeng: 'qin', jingxing: 'qin', fanwu: 'zhao', handan: 'zhao', ye: 'qin' };

var STAGES = [
  {
    label: '秦攻番吾', seal: '两路',
    kicker: '阶段一 · 前232 年',
    title: '秦分两路攻赵，李牧急赴番吾',
    turn: '秦军分两路攻赵：北路自太原出井陉，直攻番吾；南路自邺北上，欲夹击邯郸。赵王迁急令李牧率边兵迎击。',
    why: '秦军企图以两路钳形攻势扯开赵军防线；赵军若分兵则处处薄弱，只能先择一路决战。',
    src: '《史记·赵世家》；《资治通鉴》卷六。秦将姓名、兵力均无确载。',
    events: [
      { time: '前232', who: '秦军', text: '北路自太原东出', t: 0.08 },
      { time: '前232', who: '秦军', text: '南路自邺北上', t: 0.32 },
      { time: '前232', who: '秦军', text: '攻番吾，赵北境告急', t: 0.58, kind: 'flip', city: 'fanwu' },
      { time: '前232', who: '李牧', text: '率边兵急赴番吾', t: 0.84 }
    ],
    nums: [
      { label: '北路秦军', value: '无确载', kind: '无确载', n: null },
      { label: '南路秦军', value: '无确载', kind: '无确载', n: null },
      { label: '赵军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE1,
    flips: { fanwu: 0.58 },
    sieges: [
      { x: 196, y: 156, t: 0.58, label: '番吾被攻', side: 'qin', lx: -12, ly: 12, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 156, y: 132, t: 0.06, name: '秦北路', lx: 142, ly: 144, anchor: 'end' },
      { type: 'host', side: 'qin', x: 280, y: 202, t: 0.30, name: '秦南路', lx: 294, ly: 196, anchor: 'start' },
      { type: 'host', side: 'zhao', x: 214, y: 236, t: 0.02, name: '李牧', lx: 228, ly: 230, anchor: 'start' }
    ],
    routes: [
      { d: 'M 82 92 C 112 106 138 120 152 126', side: 'qin', t0: 0.06, t1: 0.38,
        label: '北路出井陉', lx: 108, ly: 108, anchor: 'start' },
      { d: 'M 284 200 C 266 192 242 178 208 162', side: 'qin', t0: 0.30, t1: 0.62,
        label: '南路北上', lx: 246, ly: 196, anchor: 'middle' },
      { d: 'M 218 230 C 210 206 202 182 198 164', side: 'zhao', t0: 0.80, t1: 0.96,
        label: '李牧北上', lx: 226, ly: 196, anchor: 'start' }
    ]
  },
  {
    label: '番吾破秦', seal: '破北',
    kicker: '阶段二 · 前232 年',
    title: '李牧先破北路秦军',
    turn: '李牧率边兵迎击北路秦军，战于番吾，破之；秦军退守井陉。李牧随即回师南下。',
    why: '先打较弱或较突出的一路，避免被两路合围；北路既破，南路便成孤军。',
    src: '《史记·赵世家》「秦攻番吾，李牧与之战，却之」；《资治通鉴》卷六。',
    events: [
      { time: '前232', who: '李牧', text: '率边兵迎击北路', t: 0.08 },
      { time: '前232', who: '赵军', text: '破秦军于番吾', t: 0.36, kind: 'flip', city: 'fanwu' },
      { time: '前232', who: '秦军', text: '退守井陉', t: 0.62, kind: 'flip', city: 'jingxing' },
      { time: '前232', who: '李牧', text: '回师南下，驰援邯郸', t: 0.86 }
    ],
    nums: [
      { label: '秦北路', value: '无确载', kind: '无确载', n: null },
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '番吾', value: '却秦', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { fanwu: 0.36, jingxing: 0.62 },
    sieges: [
      { x: 196, y: 156, t: 0.36, label: '番吾却秦', side: 'zhao', lx: -10, ly: 14, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'zhao', x: 196, y: 156, t: 0.02, name: '李牧', lx: 210, ly: 162, anchor: 'start' },
      { type: 'army', side: 'zhao', x: 184, y: 148, t: 0.32, name: '赵边军', lx: 170, ly: 158, anchor: 'end' },
      { type: 'army', side: 'qin', x: 158, y: 132, t: 0.02, name: '秦北路', lx: 144, ly: 142, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 190 154 C 180 148 170 142 162 136', side: 'zhao', t0: 0.06, t1: 0.42,
        label: '赵军反击', lx: 186, ly: 140, anchor: 'start' },
      { d: 'M 160 134 C 168 152 180 178 190 202', side: 'zhao', t0: 0.66, t1: 0.94,
        label: '回师南下', lx: 172, ly: 176, anchor: 'start' }
    ]
  },
  {
    label: '拒守南路', seal: '拒南',
    kicker: '阶段三 · 前232 年',
    title: '李牧回师，拒南路秦军于漳水',
    turn: '李牧回师邯郸以北，与南路秦军战于漳水；秦军不能进，退保邺城。',
    why: '北路既退，南路秦军失去策应；李牧以得胜之师迎击，赵都转危为安。',
    src: '《史记·赵世家》；《资治通鉴》卷六。漳水为史载地名，兵力无确载。',
    events: [
      { time: '前232', who: '李牧', text: '回师至邯郸北', t: 0.08 },
      { time: '前232', who: '赵军', text: '与秦南路战于漳水', t: 0.34 },
      { time: '前232', who: '秦军', text: '不能进，退保邺', t: 0.62, kind: 'flip', city: 'ye' },
      { time: '前232', who: '邯郸', text: '转危为安', t: 0.86 }
    ],
    nums: [
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '秦南路', value: '无确载', kind: '无确载', n: null },
      { label: '邯郸', value: '保全', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { ye: 0.62 },
    markers: [
      { type: 'host', side: 'zhao', x: 210, y: 208, t: 0.02, name: '李牧', lx: 196, ly: 198, anchor: 'end', moveRef: 0 },
      { type: 'host', side: 'qin', x: 280, y: 202, t: 0.02, name: '秦南路', lx: 294, ly: 196, anchor: 'start', weak: true },
      { type: 'army', side: 'zhao', x: 214, y: 236, t: 0.60, name: '赵军', lx: 228, ly: 242, anchor: 'start' }
    ],
    routes: [
      { d: 'M 200 176 C 204 190 208 202 210 210', side: 'zhao', t0: 0.06, t1: 0.34,
        label: '回师邯郸', lx: 188, ly: 190, anchor: 'end' },
      { d: 'M 214 202 C 238 202 260 202 276 202', side: 'zhao', t0: 0.30, t1: 0.64,
        label: '漳水拒秦', lx: 246, ly: 214, anchor: 'middle' }
    ]
  },
  {
    label: '秦军退', seal: '解围',
    kicker: '阶段四 · 前232 年',
    title: '秦两路皆退，赵暂得安',
    turn: '秦南路退保邺，北路还太原，两路攻势俱解；赵王迁嘉奖李牧，秦国暂缓攻赵。',
    why: '番吾再败使秦廷意识到李牧未除则赵难下；赵国又延续了数年国祚。',
    src: '《史记·赵世家》《廉颇蔺相如列传》；《资治通鉴》卷六。',
    events: [
      { time: '前232', who: '秦军', text: '南路退保邺', t: 0.08, kind: 'flip', city: 'ye' },
      { time: '前232', who: '秦军', text: '北路还太原', t: 0.34 },
      { time: '前232', who: '赵王迁', text: '嘉奖李牧，益其封邑', t: 0.62 },
      { time: '前232', who: '秦廷', text: '暂缓攻赵，改图他国', t: 0.84 }
    ],
    nums: [
      { label: '秦军', value: '退', kind: '史载', n: null },
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '李牧', value: '益封', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { ye: 0.08 },
    markers: [
      { type: 'host', side: 'zhao', x: 214, y: 236, t: 0.02, name: '李牧', lx: 228, ly: 230, anchor: 'start' },
      { type: 'army', side: 'qin', x: 288, y: 202, t: 0.04, name: '秦南路', lx: 302, ly: 196, anchor: 'start', weak: true },
      { type: 'army', side: 'qin', x: 120, y: 112, t: 0.40, name: '秦北路', lx: 106, ly: 104, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 274 200 C 278 200 282 200 286 200', side: 'retreat', t0: 0.06, t1: 0.30,
        label: '秦军退邺', lx: 268, ly: 214, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 186 C 60 180 120 190 180 184 C 240 178 300 172 385 176', color: '#a8b6ab', width: 2.6 },
    { d: 'M 58 40 C 84 92 104 146 112 214', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 64 56 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 72 74 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.7 },
    { d: 'M 40 292 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 302 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 62, y: 52, t: '太 行 山', size: 9, color: '#46594f', ls: 2, serif: true, rotate: 74 },
    { x: 24, y: 182, t: '漳　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '番吾·今河北平山东　井陉·今河北井陉北　邺·今河北临漳西南', size: 7.2, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '赵 之 北 境', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'fanwu',
  title: '番吾之战',
  kicker: '沙 盘 推 演',
  subtitle: '番吾 · 漳水',
  years: '前232',
  yearUnit: '',
  era: '战国 · 赵王迁四年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：番吾今河北平山东、邺今河北临漳西南，非真实地理比例',
  hook: '秦两路攻赵，李牧先破番吾，再拒南路，邯郸转危为安',
  period: '战国',
  yearValue: -232,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '赵', b: '胜', sub: '前232' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
