/**
 * 沙盘推演 · 肥之战（前233）
 * 通行叙事：桓齮取宜安、扈辄战死、李牧受命、肥下大破秦军、赵封武安君。
 * 秦赵双方兵力均无确载；仅「斩首十万」为《史记》所载，不拆分估算。
 * 地名古今对照：肥今河北晋州西、宜安今河北藁城西南、井陉今河北井陉北。
 */
var COLOR = { qin: '#6f3a22', zhao: '#2b5262', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'jingxing', name: '井陉', x: 110, y: 100, tx: 96,  ty: 92,  anchor: 'end' },
  { id: 'yian',     name: '宜安', x: 195, y: 118, tx: 195, ty: 104, anchor: 'middle' },
  { id: 'fei',      name: '肥',   x: 238, y: 152, tx: 252, ty: 146, anchor: 'start' },
  { id: 'fanwu',    name: '番吾', x: 158, y: 178, tx: 144, ty: 174, anchor: 'end' },
  { id: 'handan',   name: '邯郸', x: 208, y: 232, tx: 208, ty: 248, anchor: 'middle' },
  { id: 'ye',       name: '邺',   x: 288, y: 198, tx: 288, ty: 214, anchor: 'middle' }
];

var BASE0 = { jingxing: 'qin', yian: 'zhao', fei: 'zhao', fanwu: 'zhao', handan: 'zhao', ye: 'qin' };
var BASE1 = { jingxing: 'qin', yian: 'qin',  fei: 'zhao', fanwu: 'zhao', handan: 'zhao', ye: 'qin' };
var BASE3 = { jingxing: 'qin', yian: 'zhao', fei: 'zhao', fanwu: 'zhao', handan: 'zhao', ye: 'qin' };

var STAGES = [
  {
    label: '秦取宜安', seal: '破赵',
    kicker: '阶段一 · 前234 年',
    title: '桓齮取宜安，扈辄战死',
    turn: '秦将桓齮攻赵，取赤丽、宜安；赵将扈辄率军救之，战败被杀，赵军斩首十万。秦军进逼邯郸北境。',
    why: '宜安一失，邯郸以北门户洞开；赵军野战主力受重创，只能改守为战，等待能战之将。',
    src: '《史记·赵世家》《廉颇蔺相如列传》；《资治通鉴》卷六。斩首十万为史载，双方兵力无确载。',
    events: [
      { time: '前234', who: '桓齮', text: '攻赵，取赤丽、宜安', t: 0.08 },
      { time: '前234', who: '扈辄', text: '率军救宜安', t: 0.32 },
      { time: '前234', who: '秦军', text: '大破赵军，斩首十万', t: 0.58, kind: 'flip', city: 'yian' },
      { time: '前234', who: '赵王迁', text: '急征李牧入朝', t: 0.84 }
    ],
    nums: [
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '赵军被斩', value: '十万', kind: '史载', n: 100 }
    ],
    hold: BASE1,
    flips: { yian: 0.58 },
    sieges: [
      { x: 195, y: 118, t: 0.58, label: '宜安破', side: 'qin', lx: -12, ly: 10, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 195, y: 118, t: 0.02, name: '桓齮', lx: 209, ly: 112, anchor: 'start' },
      { type: 'army', side: 'zhao', x: 200, y: 128, t: 0.30, name: '扈辄', lx: 186, ly: 140, anchor: 'end', weak: true },
      { type: 'host', side: 'zhao', x: 208, y: 232, t: 0.78, name: '赵王迁', lx: 222, ly: 238, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 116 106 C 146 108 174 112 190 116', side: 'qin', t0: 0.06, t1: 0.40,
        label: '秦军出井陉', lx: 142, ly: 120, anchor: 'middle' },
      { d: 'M 206 224 C 204 200 200 172 198 128', side: 'zhao', t0: 0.26, t1: 0.56,
        label: '扈辄北上', lx: 214, ly: 178, anchor: 'start' }
    ]
  },
  {
    label: '李牧受命', seal: '易将',
    kicker: '阶段二 · 前233 年',
    title: '赵王迁以李牧为大将军',
    turn: '赵王迁以李牧为大将军，悉发代、雁门边兵南下；李牧进屯肥下，与宜安秦军相持。',
    why: '李牧的边兵是赵国最后一支能野战的劲旅；以边兵对秦军，赵国的存亡系于此战。',
    src: '《史记·廉颇蔺相如列传》《赵世家》；《资治通鉴》卷六。兵力无确载。',
    events: [
      { time: '前233', who: '赵王迁', text: '以李牧为大将军', t: 0.08 },
      { time: '前233', who: '李牧', text: '悉发代、雁门边兵', t: 0.32 },
      { time: '前233', who: '李牧', text: '进屯肥下，与秦军相持', t: 0.58 },
      { time: '前233', who: '桓齮', text: '分军略地，求战不得', t: 0.84 }
    ],
    nums: [
      { label: '李牧边军', value: '无确载', kind: '无确载', n: null },
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '相持', value: '数月', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'zhao', x: 238, y: 152, t: 0.02, name: '李牧', lx: 252, ly: 160, anchor: 'start' },
      { type: 'host', side: 'qin', x: 195, y: 118, t: 0.02, name: '桓齮', lx: 181, ly: 110, anchor: 'end', weak: true },
      { type: 'army', side: 'zhao', x: 168, y: 168, t: 0.34, name: '赵边军', lx: 154, ly: 162, anchor: 'end' }
    ],
    routes: [
      { d: 'M 170 162 C 192 158 214 156 232 154', side: 'zhao', t0: 0.30, t1: 0.62,
        label: '边兵南下', lx: 200, ly: 170, anchor: 'middle' }
    ]
  },
  {
    label: '肥下决战', seal: '破秦',
    kicker: '阶段三 · 前233 年',
    title: '李牧大破秦军于肥下',
    turn: '李牧纵兵击秦军于肥下，大破之；桓齮仅以身免，奔还。秦军退保邺，宜安复归于赵。',
    why: '李牧以边兵击惰归之秦军，一战扭转赵北境危局；秦灭赵的进程被迫放缓。',
    src: '《史记·廉颇蔺相如列传》《赵世家》；《资治通鉴》卷六。兵力无确载，「桓齮奔还」为史载。',
    events: [
      { time: '前233', who: '李牧', text: '纵兵击秦军于肥下', t: 0.08 },
      { time: '前233', who: '赵军', text: '大破秦军，宜安复归', t: 0.36, kind: 'flip', city: 'yian' },
      { time: '前233', who: '桓齮', text: '仅以身免，奔还', t: 0.64 },
      { time: '前233', who: '秦军', text: '退保邺城', t: 0.86 }
    ],
    nums: [
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '桓齮', value: '奔还', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { yian: 0.36 },
    sieges: [
      { x: 238, y: 152, t: 0.36, label: '肥下破秦', side: 'zhao', lx: -10, ly: 14, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'zhao', x: 238, y: 152, t: 0.02, name: '李牧', lx: 252, ly: 144, anchor: 'start' },
      { type: 'army', side: 'zhao', x: 226, y: 146, t: 0.34, name: '赵军', lx: 212, ly: 160, anchor: 'end' },
      { type: 'army', side: 'qin', x: 198, y: 122, t: 0.02, name: '秦军', lx: 184, ly: 132, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 232 150 C 224 146 214 140 204 130', side: 'zhao', t0: 0.06, t1: 0.40,
        label: '赵军出击', lx: 226, ly: 136, anchor: 'start' },
      { d: 'M 198 126 C 224 148 254 174 280 192', side: 'retreat', t0: 0.62, t1: 0.94,
        label: '秦军退邺', lx: 246, ly: 174, anchor: 'start' }
    ]
  },
  {
    label: '武安君', seal: '受封',
    kicker: '阶段四 · 前233 年',
    title: '赵封李牧为武安君',
    turn: '赵王迁封李牧为武安君；秦军退保邺，暂缓攻赵。赵国得以再延数年。',
    why: '肥下一战证明李牧仍是秦军东进的最大障碍；秦廷转而先图韩、燕，赵获得喘息。',
    src: '《史记·廉颇蔺相如列传》《赵世家》；《资治通鉴》卷六。',
    events: [
      { time: '前233', who: '赵王迁', text: '封李牧为武安君', t: 0.08 },
      { time: '前233', who: '李牧', text: '还屯邯郸北', t: 0.34 },
      { time: '前233', who: '秦军', text: '退保邺，不敢再进', t: 0.62 },
      { time: '前233', who: '秦廷', text: '改图他路，暂缓攻赵', t: 0.84 }
    ],
    nums: [
      { label: '李牧', value: '武安君', kind: '史载', n: null },
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '赵军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE3,
    markers: [
      { type: 'host', side: 'zhao', x: 208, y: 224, t: 0.30, name: '李牧', lx: 222, ly: 218, anchor: 'start' },
      { type: 'host', side: 'zhao', x: 208, y: 232, t: 0.02, name: '赵王迁', lx: 194, ly: 240, anchor: 'end', weak: true },
      { type: 'army', side: 'qin', x: 282, y: 196, t: 0.60, name: '秦军', lx: 296, ly: 190, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 236 158 C 230 184 222 204 214 218', side: 'zhao', t0: 0.06, t1: 0.40,
        label: '李牧还屯', lx: 236, ly: 188, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 152 C 60 146 120 156 180 150 C 240 144 300 138 385 142', color: '#a8b6ab', width: 2.4 },
    { d: 'M 62 44 C 90 90 108 136 116 196', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 74 60 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 82 78 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 44 282 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 300 292 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 70, y: 56, t: '太 行 山', size: 9, color: '#46594f', ls: 2, serif: true, rotate: 74 },
    { x: 24, y: 146, t: '滹 沱 水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '肥·今河北晋州西　宜安·今河北藁城西南　井陉·今河北井陉北', size: 7.2, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '赵 之 北 境', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'fei',
  title: '肥之战',
  kicker: '沙 盘 推 演',
  subtitle: '宜安 · 肥下',
  years: '前233',
  yearUnit: '',
  era: '战国 · 赵王迁三年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：肥今河北晋州西、宜安今河北藁城西南，非真实地理比例',
  hook: '李牧肥下破秦，桓齮奔还，赵封武安君',
  period: '战国',
  yearValue: -233,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '赵', b: '胜', sub: '前233' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
