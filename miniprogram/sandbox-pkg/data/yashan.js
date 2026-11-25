/**
 * 沙盘推演 · 崖山之战（1279）
 * 通行叙事：元军南下，宋室由福州、潮州一路南逃；张世杰结大舟于崖山，
 * 元军张弘范断其汲道、水陆夹攻，宋军大溃；陆秀夫负帝蹈海，南宋亡。
 * 双方兵力无确载；「结大舟千余」「陆秀夫负帝蹈海」为史载。
 * 地名古今对照：崖山今广东新会南、潮州今广东潮州、福州今福建福州。
 */
var COLOR = { yuan: '#2b5262', song: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'linan',     name: '临安',   x: 306, y: 128, tx: 306, ty: 114, anchor: 'middle' },
  { id: 'fuzhou',    name: '福州',   x: 312, y: 206, tx: 312, ty: 192, anchor: 'middle' },
  { id: 'chaozhou',  name: '潮州',   x: 268, y: 268, tx: 282, ty: 276, anchor: 'start' },
  { id: 'guangzhou', name: '广州',   x: 208, y: 238, tx: 194, ty: 232, anchor: 'end' },
  { id: 'yashan',    name: '崖山',   x: 198, y: 308, tx: 184, ty: 316, anchor: 'end' }
];

var BASE0 = { linan: 'yuan', fuzhou: 'song', chaozhou: 'song', guangzhou: 'song', yashan: 'song' };
var BASE1 = { linan: 'yuan', fuzhou: 'yuan', chaozhou: 'contested', guangzhou: 'song', yashan: 'song' };
var BASE2 = { linan: 'yuan', fuzhou: 'yuan', chaozhou: 'yuan', guangzhou: 'contested', yashan: 'song' };
var BASE3 = { linan: 'yuan', fuzhou: 'yuan', chaozhou: 'yuan', guangzhou: 'yuan', yashan: 'contested' };
var BASE4 = { linan: 'yuan', fuzhou: 'yuan', chaozhou: 'yuan', guangzhou: 'yuan', yashan: 'yuan' };

var STAGES = [
  {
    label: '宋室南奔', seal: '南逃',
    kicker: '阶段一 · 1276–1277 年',
    title: '元军下福州，宋室南奔',
    turn: '元军攻福州，宋室由海路南奔；张世杰、陆秀夫等拥立幼主，辗转至潮州、崖山一带。',
    why: '临安已降，南宋残余只能浮海求存；失去陆上根基后，行朝的一切都押在水军上。',
    src: '《宋史·瀛国公本纪》《张世杰传》；《元史·张弘范传》。',
    events: [
      { time: '1276', who: '元军', text: '下福州', t: 0.08, kind: 'flip', city: 'fuzhou' },
      { time: '1276', who: '宋室', text: '由海路南奔', t: 0.34 },
      { time: '1277', who: '宋军', text: '转至潮州', t: 0.58, kind: 'flip', city: 'chaozhou' },
      { time: '1277', who: '宋室', text: '退向崖山', t: 0.84 }
    ],
    nums: [
      { label: '元军', value: '无确载', kind: '无确载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '行朝', value: '浮海', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { fuzhou: 0.08, chaozhou: 0.58 },
    markers: [
      { type: 'host', side: 'yuan', x: 306, y: 128, t: 0.02, name: '张弘范', lx: 320, ly: 122, anchor: 'start' },
      { type: 'host', side: 'song', x: 312, y: 206, t: 0.02, name: '张世杰', lx: 326, ly: 200, anchor: 'start', weak: true },
      { type: 'army', side: 'song', x: 286, y: 244, t: 0.44, name: '宋军', lx: 300, ly: 238, anchor: 'start' }
    ],
    routes: [
      { d: 'M 310 130 C 314 156 316 182 314 200', side: 'yuan', t0: 0.08, t1: 0.46,
        label: '元军南下', lx: 322, ly: 162, anchor: 'start' },
      { d: 'M 308 214 C 296 236 284 254 274 264', side: 'song', t0: 0.36, t1: 0.78,
        label: '宋室南奔', lx: 300, ly: 240, anchor: 'start' }
    ]
  },
  {
    label: '退守崖山', seal: '据海',
    kicker: '阶段二 · 1278 年',
    title: '宋军退守崖山，结大舟为寨',
    turn: '宋军退至崖山，张世杰以千余大舟结成一字水寨，奉幼主居其中，决意死守。',
    why: '崖山扼海口，本可进退；张世杰却自缚舟阵，把机动的水军变成了不能移动的城。',
    src: '《宋史·张世杰传》《陆秀夫传》；《元史·张弘范传》。',
    events: [
      { time: '1278', who: '宋军', text: '退至崖山', t: 0.08, kind: 'flip', city: 'yashan' },
      { time: '1278', who: '张世杰', text: '结大舟千余为水寨', t: 0.34 },
      { time: '1278', who: '宋室', text: '奉幼主居舟中', t: 0.58 },
      { time: '1278', who: '元军', text: '进逼广州', t: 0.84, kind: 'flip', city: 'guangzhou' }
    ],
    nums: [
      { label: '宋军', value: '大舟千余', kind: '史载', n: null },
      { label: '元军', value: '无确载', kind: '无确载', n: null },
      { label: '崖山', value: '据海', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { yashan: 0.08, guangzhou: 0.84 },
    markers: [
      { type: 'host', side: 'song', x: 198, y: 308, t: 0.30, name: '张世杰', lx: 184, ly: 302, anchor: 'end' },
      { type: 'host', side: 'song', x: 210, y: 320, t: 0.34, name: '陆秀夫', lx: 224, ly: 328, anchor: 'start', weak: true },
      { type: 'host', side: 'yuan', x: 208, y: 238, t: 0.02, name: '张弘范', lx: 194, ly: 232, anchor: 'end' }
    ],
    routes: [
      { d: 'M 204 244 C 202 266 200 286 198 300', side: 'yuan', t0: 0.78, t1: 0.96,
        label: '元军南下', lx: 190, ly: 268, anchor: 'end' }
    ]
  },
  {
    label: '元军断汲道', seal: '围困',
    kicker: '阶段三 · 1279 年 正月',
    title: '元军据海口，断宋军汲道',
    turn: '元军张弘范据崖山海口，断宋军汲道与樵路；宋军舟中无水，人马困乏，军心浮动。',
    why: '水寨不能移动，一旦被断水断柴，千艘大舟便成困兽；宋军已把主动权完全让给元军。',
    src: '《宋史·张世杰传》；《元史·张弘范传》。',
    events: [
      { time: '1279·正月', who: '元军', text: '据海口', t: 0.08 },
      { time: '1279·正月', who: '元军', text: '断宋军汲道', t: 0.34 },
      { time: '1279·正月', who: '宋军', text: '舟中无水，人马困乏', t: 0.58, kind: 'flip', city: 'yashan' },
      { time: '1279·正月', who: '宋军', text: '军心浮动', t: 0.84 }
    ],
    nums: [
      { label: '宋军', value: '大舟千余', kind: '史载', n: null },
      { label: '元军', value: '无确载', kind: '无确载', n: null },
      { label: '汲道', value: '被断', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { yashan: 0.58 },
    markers: [
      { type: 'host', side: 'yuan', x: 208, y: 238, t: 0.30, name: '张弘范', lx: 222, ly: 232, anchor: 'start' },
      { type: 'host', side: 'song', x: 198, y: 308, t: 0.02, name: '张世杰', lx: 184, ly: 302, anchor: 'end', weak: true },
      { type: 'army', side: 'yuan', x: 204, y: 272, t: 0.34, name: '元军', lx: 218, ly: 278, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '崖山海战', seal: '宋亡',
    kicker: '阶段四 · 1279 年 二月',
    title: '元军水陆夹攻，宋军大溃',
    turn: '元军水陆夹攻，宋军水寨被破；陆秀夫负帝蹈海，张世杰突围遇风覆舟，南宋灭亡。',
    why: '崖山一战，南宋行朝与最后的军事力量同归于尽；中国历史上第一次全境为北方政权所并。',
    src: '《宋史·瀛国公本纪》《陆秀夫传》《张世杰传》；《元史·张弘范传》。',
    events: [
      { time: '1279·二月', who: '元军', text: '水陆夹攻', t: 0.08 },
      { time: '1279·二月', who: '宋军', text: '水寨被破，大溃', t: 0.34, kind: 'flip', city: 'yashan' },
      { time: '1279·二月', who: '陆秀夫', text: '负帝蹈海', t: 0.58 },
      { time: '1279·二月', who: '张世杰', text: '突围遇风覆舟', t: 0.84 }
    ],
    nums: [
      { label: '宋军', value: '大舟千余', kind: '史载', n: null },
      { label: '元军', value: '无确载', kind: '无确载', n: null },
      { label: '南宋', value: '灭亡', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { yashan: 0.34 },
    sieges: [
      { x: 198, y: 308, t: 0.34, label: '水寨破', side: 'yuan', lx: 12, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'yuan', x: 198, y: 308, t: 0.30, name: '张弘范', lx: 212, ly: 302, anchor: 'start' },
      { type: 'host', side: 'song', x: 198, y: 308, t: 0.02, name: '陆秀夫', lx: 184, ly: 316, anchor: 'end', weak: true },
      { type: 'army', side: 'yuan', x: 212, y: 288, t: 0.34, name: '元军', lx: 226, ly: 282, anchor: 'start' }
    ],
    routes: [
      { d: 'M 208 294 C 204 300 200 304 198 306', side: 'yuan', t0: 0.10, t1: 0.52,
        label: '夹攻', lx: 218, ly: 300, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 180 60 C 200 110 220 160 236 210 C 250 254 250 284 240 320', color: '#a8b6ab', width: 2.4 },
    { d: 'M 100 250 C 140 244 180 252 220 246 C 260 240 300 248 340 244 C 360 242 372 246 385 244', color: '#b6c3b6', width: 3 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 330 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 330 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 30, y: 246, t: '珠　江', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 250, y: 150, t: '南　海', size: 8.5, color: '#46594f', ls: 3, serif: true, rotate: 80 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '崖山·今广东新会南　潮州·今广东潮州　福州·今福建福州', size: 6.6, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '岭　南', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'yashan',
  title: '崖山之战',
  kicker: '沙 盘 推 演',
  subtitle: '潮州 · 崖山',
  years: '1279',
  yearUnit: 'AD',
  era: '南宋 · 祥兴二年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：崖山今广东新会南、潮州今广东潮州，非真实地理比例',
  hook: '元军断汲道夹攻崖山，陆秀夫负帝蹈海，南宋灭亡',
  period: '蒙宋',
  yearValue: 1279,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '元', b: '胜', sub: '1279' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
