/**
 * 沙盘推演 · 长平之战（前262—前260）
 * 内容取通行说法：秦取上党、赵括代廉颇、白起断粮围困、赵卒降而坑杀。
 * 兵力四十五万为《史记》所载，学界多认为含民夫或有所夸大；秦军无确载，不作估算。
 */
var COLOR = { qin: '#6f3a22', zhao: '#2b5262', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'shangdang', name: '上党', x: 112, y: 98,  tx: 112, ty: 84,  anchor: 'middle' },
  { id: 'guguan',    name: '故关', x: 150, y: 152, tx: 150, ty: 139, anchor: 'middle' },
  { id: 'changping', name: '长平', x: 202, y: 198, tx: 202, ty: 214, anchor: 'middle' },
  { id: 'xuanshi',   name: '泫氏', x: 236, y: 246, tx: 236, ty: 260, anchor: 'middle' },
  { id: 'yewang',    name: '野王', x: 52,  y: 274, tx: 64,  ty: 286, anchor: 'start' }
];

var STAGES = [
  {
    label: '上党降赵', seal: '上党',
    kicker: '阶段一 · 前262 年',
    title: '秦攻上党，赵受其地',
    turn: '秦取韩之野王，上党道绝；上党守冯亭不愿降秦，举郡降赵，赵使廉颇军于长平。',
    why: '赵受上党，等于把战线推到自家门口；廉颇坚壁不出，秦军求速战而不得，双方在丹水两岸转入长期对峙。',
    src: '《史记·赵世家》《廉颇蔺相如列传》《白起王翦列传》；《资治通鉴》卷五。',
    events: [
      { time: '前262', who: '秦昭襄王', text: '取野王，断上党道', t: 0.08 },
      { time: '前262', who: '冯亭', text: '举上党降赵', t: 0.36 },
      { time: '前262', who: '赵孝成王', text: '受上党，遣廉颇守长平', t: 0.64 },
      { time: '前262', who: '廉颇', text: '筑垒壁，坚壁不战', t: 0.86 }
    ],
    nums: [
      { label: '秦军兵力', value: '无确载', kind: '无确载', n: null },
      { label: '赵军兵力', value: '无确载', kind: '无确载', n: null },
      { label: '上党降众', value: '无确载', kind: '无确载', n: null }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 52, y: 274, t: 0.04, name: '秦军', lx: 66, ly: 272, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'zhao', x: 112, y: 98, t: 0.40, name: '赵军', lx: 124, ly: 96, anchor: 'start', moveRef: 1 },
      { type: 'army', side: 'zhao', x: 180, y: 176, t: 0.68, name: '廉颇', lx: 166, ly: 174, anchor: 'end' }
    ],
    routes: [
      { d: 'M 58 268 C 88 226 118 182 146 158', side: 'qin', t0: 0.04, t1: 0.36,
        label: '秦军北上', lx: 94, ly: 218, anchor: 'middle' },
      { d: 'M 114 106 C 130 128 142 144 148 150', side: 'zhao', t0: 0.40, t1: 0.62,
        label: '赵军入上党', lx: 128, ly: 120, anchor: 'start' },
      { d: 'M 150 158 C 166 170 176 178 184 184', side: 'zhao', t0: 0.64, t1: 0.82,
        label: '廉颇至长平', lx: 158, ly: 174, anchor: 'start' }
    ]
  },
  {
    label: '赵括代将', seal: '易将',
    kicker: '阶段二 · 前260 年',
    title: '赵括代廉颇，秦密遣白起',
    turn: '赵王怒廉颇损兵，以赵括代之；秦昭襄王密遣白起为上将军，令军中毋泄，赵括悉更约束，出兵击秦。',
    why: '赵括改守为攻，正中白起诱敌深入之计；秦军佯败后撤，两翼奇兵已绕至赵军后方，粮道与退路同时受威胁。',
    src: '《史记·廉颇蔺相如列传》《白起王翦列传》；《资治通鉴》卷五。',
    events: [
      { time: '前260', who: '赵孝成王', text: '以赵括代廉颇', t: 0.08 },
      { time: '前260', who: '秦昭襄王', text: '密遣白起为上将军', t: 0.32 },
      { time: '前260', who: '赵括', text: '悉更约束，出兵击秦', t: 0.58 },
      { time: '前260', who: '白起', text: '佯败而退，奇兵断后', t: 0.82 }
    ],
    nums: [
      { label: '赵军兵力', value: '四十五万', kind: '史载', n: 45 },
      { label: '秦军兵力', value: '无确载', kind: '无确载', n: null },
      { label: '秦奇兵', value: '二万五千', kind: '史载', n: 2.5 }
    ],
    markers: [
      { type: 'host', side: 'zhao', x: 202, y: 198, t: 0.02, name: '赵括', lx: 216, ly: 196, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'qin', x: 292, y: 168, t: 0.30, name: '白起', lx: 292, ly: 154, anchor: 'middle' },
      { type: 'army', side: 'qin', x: 268, y: 240, t: 0.62, name: '秦奇兵', lx: 282, ly: 252, anchor: 'start' }
    ],
    routes: [
      { d: 'M 210 198 C 236 192 258 184 276 176', side: 'zhao', t0: 0.50, t1: 0.76,
        label: '赵军出击', lx: 232, ly: 184, anchor: 'start' },
      { d: 'M 296 178 C 292 206 284 230 272 244', side: 'qin', t0: 0.58, t1: 0.84,
        label: '奇兵绕后', lx: 302, ly: 212, anchor: 'start' }
    ]
  },
  {
    label: '围困', seal: '断粮',
    kicker: '阶段三 · 前260 年',
    title: '赵军被围，断粮四十六日',
    turn: '秦军筑垒遮绝赵军，赵军分为二，粮道断绝；赵卒饥，内阴相杀食，赵括率锐卒突围，中箭而死。',
    why: '四十六日断粮把一场兵力对峙变成了组织崩溃；赵军失去统一指挥后，四十余万人的规模反而成了负担。',
    src: '《史记·白起王翦列传》《廉颇蔺相如列传》；《资治通鉴》卷五。四十六日为史载。',
    events: [
      { time: '前260', who: '白起', text: '筑垒遮绝赵军，断粮道', t: 0.08 },
      { time: '前260', who: '赵军', text: '军分而粮绝，饥而相食', t: 0.36 },
      { time: '前260', who: '赵括', text: '率锐卒突围，中箭死', t: 0.66 },
      { time: '前260', who: '赵卒', text: '四十余万人降', t: 0.88 }
    ],
    nums: [
      { label: '赵军被围', value: '四十五万', kind: '史载', n: 45 },
      { label: '围困日数', value: '四十六日', kind: '史载', n: 46 },
      { label: '秦军兵力', value: '无确载', kind: '无确载', n: null }
    ],
    sieges: [
      { x: 202, y: 198, t: 0.12, label: '长平被围', side: 'qin', lx: -12, ly: 4, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 286, y: 172, t: 0.02, name: '白起', lx: 286, ly: 158, anchor: 'middle' },
      { type: 'army', side: 'qin', x: 252, y: 214, t: 0.16, name: '秦垒', lx: 264, ly: 216, anchor: 'start' },
      { type: 'army', side: 'zhao', x: 202, y: 198, t: 0.02, name: '赵军', lx: 180, ly: 210, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 250 216 C 234 218 220 212 208 204', side: 'qin', t0: 0.14, t1: 0.42, label: '合围', lx: 238, ly: 224, anchor: 'start' }
    ]
  },
  {
    label: '降卒', seal: '坑卒',
    kicker: '阶段四 · 前260 年',
    title: '赵卒降，白起坑之',
    turn: '赵卒降者四十余万，白起以赵卒反覆，诈而尽坑之，只遣二百四十名年少者归赵。',
    why: '长平一役，赵之壮丁几尽，山东六国再无力单独抗秦；秦虽亦伤亡过半、国内空虚，但战略主动权已不可逆。',
    src: '《史记·白起王翦列传》载「前后斩首虏四十五万人」；《资治通鉴》卷五。坑卒数目为史载，现代研究有争议。',
    events: [
      { time: '前260', who: '白起', text: '分赵卒为二，诈而坑之', t: 0.12 },
      { time: '前260', who: '赵卒', text: '四十余万人死长平', t: 0.48 },
      { time: '前260', who: '白起', text: '遣二百四十人归赵', t: 0.76 },
      { time: '前260', who: '秦军', text: '秦卒死者过半，国内空', t: 0.9 }
    ],
    nums: [
      { label: '赵降卒', value: '四十余万', kind: '史载', n: 45 },
      { label: '归赵年少', value: '二百四十人', kind: '史载', n: 0.24 },
      { label: '秦军伤亡', value: '死者过半', kind: '史载', n: null }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 270, y: 178, t: 0.02, name: '白起', lx: 270, ly: 164, anchor: 'middle' },
      { type: 'army', side: 'zhao', x: 202, y: 198, t: 0.02, weak: true, name: '赵降卒', lx: 182, ly: 210, anchor: 'end' }
    ],
    routes: [
      { d: 'M 198 206 C 172 242 136 262 96 270', side: 'retreat', t0: 0.70, t1: 0.94,
        label: '二百四十人归赵', lx: 132, ly: 268, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = {};

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 128 62 C 156 112 150 162 190 214 C 216 248 232 272 250 300', color: '#a8b6ab', width: 3 }
  ],
  lines: [
    { d: 'M 40 150 l16 -18 l12 12 l14 -20 l12 16', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 286 92 l14 -16 l10 11 l12 -16', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 56 322 l14 -14 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 270 316 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 306, y: 70, t: '太 行 山', size: 9, color: '#7d6647', ls: 3, serif: true },
    { x: 238, y: 274, t: '丹　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 366, t: '上党郡', size: 8.5, color: '#7d6647', ls: 1 }
  ]
};

var META = {
  id: 'changping',
  title: '长平之战',
  kicker: '沙 盘 推 演',
  subtitle: '上党 · 长平',
  years: '前262–前260',
  yearUnit: '',
  era: '战国 · 秦昭襄王',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝被围 ｜ 虚线＝退却',
  note: '示意沙盘：仅保留关键地点与行军线，非真实地理比例',
  hook: '秦赵争上党，赵括代廉颇，四十余万赵卒降而被坑',
  period: '战国',
  yearValue: -262,
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
