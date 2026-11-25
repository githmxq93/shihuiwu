/**
 * 沙盘推演 · 襄阳之战（1268–1273）
 * 通行叙事：元军筑城围襄阳、樊城，断宋援路；宋军屡援不利；
 * 回回炮破樊城，襄阳孤城无援，吕文焕出降。
 * 双方兵力无确载；「围城五年」「回回炮」为史载。
 * 地名古今对照：襄阳今湖北襄阳、樊城今湖北襄阳樊城区、鄂州今湖北武汉武昌。
 */
var COLOR = { yuan: '#2b5262', song: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'nanyang',   name: '南阳',   x: 196, y: 108, tx: 196, ty: 94,  anchor: 'middle' },
  { id: 'fancheng',  name: '樊城',   x: 224, y: 192, tx: 238, ty: 186, anchor: 'start' },
  { id: 'xiangyang', name: '襄阳',   x: 204, y: 202, tx: 190, ty: 210, anchor: 'end' },
  { id: 'ezhou',     name: '鄂州',   x: 208, y: 278, tx: 194, ty: 286, anchor: 'end' },
  { id: 'linan',     name: '临安',   x: 300, y: 318, tx: 300, ty: 332, anchor: 'middle' }
];

var BASE0 = { nanyang: 'yuan', fancheng: 'song', xiangyang: 'song', ezhou: 'song', linan: 'song' };
var BASE1 = { nanyang: 'yuan', fancheng: 'contested', xiangyang: 'contested', ezhou: 'song', linan: 'song' };
var BASE2 = { nanyang: 'yuan', fancheng: 'contested', xiangyang: 'contested', ezhou: 'contested', linan: 'song' };
var BASE3 = { nanyang: 'yuan', fancheng: 'yuan', xiangyang: 'contested', ezhou: 'contested', linan: 'song' };
var BASE4 = { nanyang: 'yuan', fancheng: 'yuan', xiangyang: 'yuan', ezhou: 'contested', linan: 'song' };

var STAGES = [
  {
    label: '元军筑城长围', seal: '围城',
    kicker: '阶段一 · 1268 年',
    title: '元军筑城，长围襄阳',
    turn: '元军于襄阳、樊城外围筑城掘堑，立长围；又以水军扼汉水，断宋军援路。',
    why: '襄阳、樊城夹汉水互为犄角，元军不急于强攻，而以长围困之，等的就是城中粮尽。',
    src: '《元史·世祖本纪》《阿术传》；《宋史·吕文焕传》。',
    events: [
      { time: '1268', who: '元军', text: '筑城掘堑，立长围', t: 0.08 },
      { time: '1268', who: '元军', text: '扼汉水，断援路', t: 0.34 },
      { time: '1268', who: '宋军', text: '困守襄樊', t: 0.58, kind: 'flip', city: 'xiangyang' },
      { time: '1268', who: '元军', text: '围城始成', t: 0.84 }
    ],
    nums: [
      { label: '元军', value: '无确载', kind: '无确载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '围城', value: '长围', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { xiangyang: 0.58 },
    markers: [
      { type: 'host', side: 'yuan', x: 196, y: 108, t: 0.02, name: '阿术', lx: 210, ly: 102, anchor: 'start' },
      { type: 'host', side: 'song', x: 204, y: 202, t: 0.02, name: '吕文焕', lx: 190, ly: 196, anchor: 'end' },
      { type: 'army', side: 'yuan', x: 216, y: 150, t: 0.34, name: '元军', lx: 230, ly: 144, anchor: 'start' }
    ],
    routes: [
      { d: 'M 200 116 C 206 136 212 160 216 180', side: 'yuan', t0: 0.08, t1: 0.50,
        label: '元军南下', lx: 190, ly: 140, anchor: 'end' }
    ]
  },
  {
    label: '宋军援襄', seal: '援军',
    kicker: '阶段二 · 1269–1272 年',
    title: '宋军屡援襄阳，皆不得进',
    turn: '宋廷自鄂州等地屡遣援军，张顺、张贵等冒死突入，然元军水陆封锁严密，援军多败。',
    why: '援路一断，襄阳便成孤城；宋军虽有名将死战，却始终无法打破元军的水陆封锁。',
    src: '《宋史·张顺传》《张贵传》；《元史·阿术传》。',
    events: [
      { time: '1269', who: '宋廷', text: '自鄂州遣援', t: 0.08 },
      { time: '1270', who: '张顺·张贵', text: '冒死突入襄阳', t: 0.34, kind: 'flip', city: 'ezhou' },
      { time: '1271', who: '元军', text: '水陆封锁严密', t: 0.58 },
      { time: '1272', who: '宋援军', text: '多败，不得进', t: 0.84 }
    ],
    nums: [
      { label: '元军', value: '无确载', kind: '无确载', n: null },
      { label: '宋援军', value: '无确载', kind: '无确载', n: null },
      { label: '援襄', value: '屡败', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { ezhou: 0.34 },
    markers: [
      { type: 'host', side: 'song', x: 208, y: 278, t: 0.30, name: '宋援军', lx: 194, ly: 272, anchor: 'end' },
      { type: 'host', side: 'yuan', x: 224, y: 192, t: 0.02, name: '阿术', lx: 238, ly: 186, anchor: 'start' },
      { type: 'army', side: 'song', x: 210, y: 240, t: 0.34, name: '援军', lx: 224, ly: 234, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 212 272 C 214 250 216 226 218 206', side: 'song', t0: 0.10, t1: 0.56,
        label: '援襄', lx: 226, ly: 246, anchor: 'start' }
    ]
  },
  {
    label: '回回炮破樊城', seal: '破城',
    kicker: '阶段三 · 1273 年 正月',
    title: '元军用回回炮，破樊城',
    turn: '元军以回回炮攻樊城，城破；樊城既陷，襄阳失去犄角，孤城愈危。',
    why: '襄、樊互为犄角，樊城一破，襄阳的北面与东面完全暴露，守军士气大挫。',
    src: '《元史·亦思马因传》《世祖本纪》；《宋史·吕文焕传》。',
    events: [
      { time: '1273·正月', who: '元军', text: '以回回炮攻樊城', t: 0.08 },
      { time: '1273·正月', who: '樊城', text: '城破', t: 0.34, kind: 'flip', city: 'fancheng' },
      { time: '1273·正月', who: '元军', text: '屠樊城', t: 0.58 },
      { time: '1273·正月', who: '襄阳', text: '失去犄角，孤城愈危', t: 0.84 }
    ],
    nums: [
      { label: '元军', value: '无确载', kind: '无确载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '回回炮', value: '破城', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { fancheng: 0.34 },
    sieges: [
      { x: 224, y: 192, t: 0.34, label: '樊城破', side: 'yuan', lx: 12, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'yuan', x: 224, y: 192, t: 0.30, name: '阿里海牙', lx: 238, ly: 200, anchor: 'start' },
      { type: 'host', side: 'song', x: 204, y: 202, t: 0.02, name: '吕文焕', lx: 190, ly: 196, anchor: 'end', weak: true },
      { type: 'army', side: 'yuan', x: 236, y: 178, t: 0.34, name: '元军', lx: 250, ly: 172, anchor: 'start' }
    ],
    routes: [
      { d: 'M 232 186 C 230 188 228 190 226 192', side: 'yuan', t0: 0.10, t1: 0.50,
        label: '炮攻', lx: 244, ly: 190, anchor: 'start' }
    ]
  },
  {
    label: '吕文焕出降', seal: '城陷',
    kicker: '阶段四 · 1273 年 二月',
    title: '襄阳孤城无援，吕文焕出降',
    turn: '襄阳粮尽援绝，元军以回回炮攻城；吕文焕开城出降，襄阳陷落。',
    why: '襄阳一失，长江中游门户洞开；元军顺江东下，南宋防线再无可守之险。',
    src: '《宋史·吕文焕传》；《元史·世祖本纪》《阿里海牙传》。',
    events: [
      { time: '1273·二月', who: '元军', text: '以回回炮攻襄阳', t: 0.08 },
      { time: '1273·二月', who: '襄阳', text: '粮尽援绝', t: 0.34 },
      { time: '1273·二月', who: '吕文焕', text: '开城出降', t: 0.58, kind: 'flip', city: 'xiangyang' },
      { time: '1273·二月', who: '元军', text: '襄阳陷落', t: 0.84 }
    ],
    nums: [
      { label: '元军', value: '无确载', kind: '无确载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '围城', value: '五年', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { xiangyang: 0.58 },
    markers: [
      { type: 'host', side: 'yuan', x: 224, y: 192, t: 0.02, name: '阿里海牙', lx: 238, ly: 186, anchor: 'start' },
      { type: 'host', side: 'song', x: 204, y: 202, t: 0.30, name: '吕文焕', lx: 190, ly: 210, anchor: 'end', weak: true },
      { type: 'army', side: 'yuan', x: 216, y: 196, t: 0.58, name: '元军', lx: 230, ly: 202, anchor: 'start' }
    ],
    routes: [
      { d: 'M 230 192 C 224 196 216 200 210 202', side: 'yuan', t0: 0.50, t1: 0.84,
        label: '入城', lx: 236, ly: 204, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 180 60 C 192 120 200 180 206 240 C 210 278 212 300 214 330', color: '#a8b6ab', width: 3 },
    { d: 'M 120 250 C 170 244 220 252 270 246 C 320 240 360 248 385 244', color: '#b6c3b6', width: 2.4 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 290 76 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 330 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 250 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 250, t: '汉　水', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 218, y: 306, t: '长　江', size: 8.5, color: '#46594f', ls: 2, serif: true, rotate: 8 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '襄阳·今湖北襄阳　樊城·今湖北襄阳樊城区　鄂州·今湖北武汉武昌', size: 6.4, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '荆　襄', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'xiangyang',
  title: '襄阳之战',
  kicker: '沙 盘 推 演',
  subtitle: '襄阳 · 樊城',
  years: '1268–1273',
  yearUnit: 'AD',
  era: '南宋 · 咸淳年间',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：襄阳今湖北襄阳、樊城今湖北襄阳樊城区，非真实地理比例',
  hook: '元军长围五年，回回炮破樊城，吕文焕出降，襄阳陷落',
  period: '蒙宋',
  yearValue: 1273,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '元', b: '胜', sub: '1273' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
