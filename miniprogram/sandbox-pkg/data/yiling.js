/**
 * 沙盘推演 · 夷陵之战（222）
 * 通行叙事：刘备称帝伐吴、陆逊退守夷陵、蜀军连营七百里、陆逊火攻、刘备败退白帝。
 * 吴军五万、连营七百里、破四十余营均为史载；蜀军兵力无确载（后世有八万之推算，不采）。
 * 地名古今对照：夷陵今湖北宜昌东南、猇亭今湖北宜都北、白帝城今重庆奉节东。
 */
var COLOR = { wu: '#2b5262', shu: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'baidi',     name: '白帝城', x: 226, y: 76,  tx: 226, ty: 62,  anchor: 'middle' },
  { id: 'zigui',     name: '秭归', x: 206, y: 110, tx: 192, ty: 120, anchor: 'end' },
  { id: 'xiaoting',  name: '猇亭', x: 240, y: 118, tx: 254, ty: 112, anchor: 'start' },
  { id: 'yiling',    name: '夷陵', x: 254, y: 148, tx: 268, ty: 158, anchor: 'start' },
  { id: 'jiangling', name: '江陵', x: 250, y: 224, tx: 250, ty: 240, anchor: 'middle' },
  { id: 'jianye',    name: '建业', x: 330, y: 268, tx: 330, ty: 284, anchor: 'middle' }
];

var BASE0 = { baidi: 'shu', zigui: 'shu', xiaoting: 'shu', yiling: 'wu', jiangling: 'wu', jianye: 'wu' };
var BASE1 = { baidi: 'shu', zigui: 'shu', xiaoting: 'shu', yiling: 'contested', jiangling: 'wu', jianye: 'wu' };
var BASE2 = { baidi: 'shu', zigui: 'shu', xiaoting: 'shu', yiling: 'wu', jiangling: 'wu', jianye: 'wu' };
var BASE3 = { baidi: 'shu', zigui: 'shu', xiaoting: 'shu', yiling: 'contested', jiangling: 'wu', jianye: 'wu' };
var BASE4 = { baidi: 'shu', zigui: 'shu', xiaoting: 'wu', yiling: 'wu', jiangling: 'wu', jianye: 'wu' };
var BASE5 = { baidi: 'shu', zigui: 'wu', xiaoting: 'wu', yiling: 'wu', jiangling: 'wu', jianye: 'wu' };

var STAGES = [
  {
    label: '刘备东征', seal: '东征',
    kicker: '阶段一 · 221—222 年',
    title: '刘备称帝，兴兵伐吴',
    turn: '刘备称帝，以关羽被杀、荆州被夺为由东征孙吴；蜀军出三峡，进至秭归、猇亭一线。孙权以陆逊为大都督，率五万人拒之。',
    why: '刘备要为荆州与关羽之死讨一个说法，但蜀军出峡后战线拉长、补给困难，利于速战而不利于久持。',
    src: '《三国志·蜀书·先主传》《吴书·陆逊传》；《资治通鉴》卷六十九。吴军五万为史载，蜀军无确载。',
    events: [
      { time: '221', who: '刘备', text: '称帝，决意伐吴', t: 0.08 },
      { time: '222', who: '刘备', text: '率军出三峡', t: 0.34 },
      { time: '222', who: '蜀军', text: '进至秭归、猇亭', t: 0.58 },
      { time: '222', who: '孙权', text: '以陆逊为督，率五万拒之', t: 0.84 }
    ],
    nums: [
      { label: '蜀军', value: '无确载', kind: '无确载', n: null },
      { label: '吴军', value: '五万', kind: '史载', n: 50 },
      { label: '出三峡', value: '东征', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { yiling: 0.58 },
    markers: [
      { type: 'host', side: 'shu', x: 206, y: 110, t: 0.02, name: '刘备', lx: 192, ly: 102, anchor: 'end', moveRef: 0 },
      { type: 'host', side: 'wu', x: 254, y: 148, t: 0.02, name: '陆逊', lx: 268, ly: 142, anchor: 'start' },
      { type: 'army', side: 'shu', x: 230, y: 116, t: 0.56, name: '蜀军', lx: 216, ly: 108, anchor: 'end' }
    ],
    routes: [
      { d: 'M 210 114 C 220 116 230 118 236 120', side: 'shu', t0: 0.30, t1: 0.66,
        label: '蜀军东进', lx: 214, ly: 126, anchor: 'end' }
    ]
  },
  {
    label: '陆逊退守', seal: '避锋',
    kicker: '阶段二 · 222 年',
    title: '陆逊避其锋，退守夷陵',
    turn: '陆逊认为蜀军锐气正盛，且居高守险，遂坚壁不战，退守夷陵；诸将以为怯，陆逊不为所动。',
    why: '吴军以空间换时间，把蜀军拖入盛夏酷暑与漫长补给线；待其疲敝，再寻火攻之机。',
    src: '《三国志·吴书·陆逊传》；《资治通鉴》卷六十九。「坚壁不战」为史载。',
    events: [
      { time: '222', who: '陆逊', text: '避其锋，退守夷陵', t: 0.08 },
      { time: '222', who: '吴军', text: '坚壁不战', t: 0.34 },
      { time: '222', who: '吴诸将', text: '以为怯，请战', t: 0.58 },
      { time: '222', who: '陆逊', text: '待其疲敝，不为所动', t: 0.84 }
    ],
    nums: [
      { label: '吴军', value: '五万', kind: '史载', n: 50 },
      { label: '蜀军', value: '无确载', kind: '无确载', n: null },
      { label: '相持', value: '数月', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { yiling: 0.08 },
    markers: [
      { type: 'host', side: 'wu', x: 254, y: 148, t: 0.02, name: '陆逊', lx: 268, ly: 142, anchor: 'start' },
      { type: 'host', side: 'shu', x: 240, y: 118, t: 0.02, name: '刘备', lx: 226, ly: 110, anchor: 'end', weak: true },
      { type: 'army', side: 'wu', x: 260, y: 160, t: 0.30, name: '吴军', lx: 274, ly: 168, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '连营七百里', seal: '连营',
    kicker: '阶段三 · 222 年',
    title: '蜀军树栅连营七百里',
    turn: '刘备自建平连围至夷陵，立数十屯，树栅连营七百余里；陆逊上书孙权，言破蜀之机已至。',
    why: '蜀军沿江两岸层层扎营，看似稳固，实则兵力分散、营寨相连；一旦火起，便会连片蔓延。',
    src: '《三国志·吴书·陆逊传》；《资治通鉴》卷六十九。「树栅连营七百余里」为史载。',
    events: [
      { time: '222', who: '刘备', text: '自建平连围至夷陵', t: 0.08 },
      { time: '222', who: '蜀军', text: '立数十屯，树栅连营', t: 0.34, kind: 'flip', city: 'yiling' },
      { time: '222', who: '蜀军', text: '连营七百余里', t: 0.58 },
      { time: '222', who: '陆逊', text: '上书孙权，言破蜀之机', t: 0.84 }
    ],
    nums: [
      { label: '连营', value: '七百余里', kind: '史载', n: null },
      { label: '屯', value: '数十', kind: '史载', n: null },
      { label: '蜀军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE3,
    flips: { yiling: 0.34 },
    markers: [
      { type: 'host', side: 'shu', x: 240, y: 118, t: 0.02, name: '刘备', lx: 226, ly: 128, anchor: 'end' },
      { type: 'army', side: 'shu', x: 214, y: 104, t: 0.34, name: '蜀军营', lx: 200, ly: 96, anchor: 'end' },
      { type: 'host', side: 'wu', x: 254, y: 148, t: 0.02, name: '陆逊', lx: 268, ly: 154, anchor: 'start', weak: true }
    ],
    routes: []
  },
  {
    label: '火烧连营', seal: '火攻',
    kicker: '阶段四 · 222 年 闰六月',
    title: '陆逊火攻，破蜀四十余营',
    turn: '陆逊命士卒各持茅草，乘夜火攻蜀营；火势连片，吴军诸路并进，破蜀四十余营。刘备夜遁。',
    why: '连营七百里把蜀军的空间优势变成火攻的传导路径；吴军以火分割蜀军，一夜之间扭转战局。',
    src: '《三国志·吴书·陆逊传》；《资治通鉴》卷六十九。「破其四十余营」为史载。',
    events: [
      { time: '222·闰六月', who: '陆逊', text: '命士卒各持茅草', t: 0.08 },
      { time: '222·闰六月', who: '吴军', text: '乘夜火攻蜀营', t: 0.34, kind: 'flip', city: 'xiaoting' },
      { time: '222·闰六月', who: '吴军', text: '破蜀四十余营', t: 0.58 },
      { time: '222·闰六月', who: '刘备', text: '夜遁', t: 0.84 }
    ],
    nums: [
      { label: '吴军', value: '五万', kind: '史载', n: 50 },
      { label: '破营', value: '四十余', kind: '史载', n: null },
      { label: '蜀军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE4,
    flips: { xiaoting: 0.34 },
    sieges: [
      { x: 240, y: 118, t: 0.34, label: '火烧连营', side: 'wu', lx: -12, ly: 12, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'wu', x: 254, y: 148, t: 0.02, name: '陆逊', lx: 268, ly: 142, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'wu', x: 246, y: 132, t: 0.34, name: '吴军', lx: 260, ly: 126, anchor: 'start' },
      { type: 'host', side: 'shu', x: 240, y: 118, t: 0.02, name: '刘备', lx: 226, ly: 110, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 252 144 C 248 138 244 132 242 126', side: 'wu', t0: 0.06, t1: 0.44,
        label: '火攻', lx: 262, ly: 136, anchor: 'start' }
    ]
  },
  {
    label: '败退白帝', seal: '败退',
    kicker: '阶段五 · 222 年',
    title: '刘备退守白帝城',
    turn: '刘备收残兵退守白帝城，舟船器械尽失；吴军追至三峡而还。刘备惭愤，次年卒于白帝。',
    why: '夷陵一败，蜀汉元气大伤，荆州再也未能收回；三国鼎立的格局由此稳定下来。',
    src: '《三国志·蜀书·先主传》《吴书·陆逊传》；《资治通鉴》卷六十九。',
    events: [
      { time: '222', who: '刘备', text: '退守白帝城', t: 0.08 },
      { time: '222', who: '蜀军', text: '舟船器械尽失', t: 0.34 },
      { time: '222', who: '吴军', text: '追至三峡而还', t: 0.58, kind: 'flip', city: 'zigui' },
      { time: '223', who: '刘备', text: '惭愤，卒于白帝', t: 0.84 }
    ],
    nums: [
      { label: '蜀军', value: '无确载', kind: '无确载', n: null },
      { label: '吴军', value: '五万', kind: '史载', n: 50 },
      { label: '连营', value: '七百里', kind: '史载', n: null }
    ],
    hold: BASE5,
    flips: { zigui: 0.58 },
    markers: [
      { type: 'host', side: 'shu', x: 226, y: 76, t: 0.02, name: '刘备', lx: 240, ly: 70, anchor: 'start', weak: true },
      { type: 'host', side: 'wu', x: 254, y: 148, t: 0.02, name: '陆逊', lx: 268, ly: 142, anchor: 'start' },
      { type: 'army', side: 'wu', x: 220, y: 104, t: 0.54, name: '吴军', lx: 206, ly: 96, anchor: 'end' }
    ],
    routes: [
      { d: 'M 236 112 C 232 100 230 88 228 80', side: 'retreat', t0: 0.06, t1: 0.44,
        label: '刘备西退', lx: 220, ly: 96, anchor: 'end' },
      { d: 'M 240 120 C 230 116 220 114 212 112', side: 'wu', t0: 0.50, t1: 0.80,
        label: '吴军追击', lx: 226, ly: 124, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 120 80 C 160 104 200 128 240 152 C 280 176 320 200 385 226', color: '#a8b6ab', width: 4 },
    { d: 'M 190 40 C 198 82 206 124 214 166', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 262 56 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 280 70 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.7 },
    { d: 'M 44 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 318 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 150, t: '长　江', size: 10, color: '#46594f', ls: 3, serif: true, rotate: 30 },
    { x: 280, y: 60, t: '巫　山', size: 8.5, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '夷陵·今湖北宜昌东南　猇亭·今湖北宜都北　白帝城·今重庆奉节东', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '三　峡', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'yiling',
  title: '夷陵之战',
  kicker: '沙 盘 推 演',
  subtitle: '猇亭 · 夷陵',
  years: '222',
  yearUnit: 'AD',
  era: '三国 · 蜀汉章武二年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：夷陵今湖北宜昌东南、白帝城今重庆奉节东，非真实地理比例',
  hook: '刘备连营七百里，陆逊火攻破蜀，刘备败退白帝',
  period: '三国',
  yearValue: 222,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '吴', b: '胜', sub: '222' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
