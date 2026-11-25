/**
 * 沙盘推演 · 岐沟关之战（986）
 * 通行叙事：宋太宗雍熙北伐，三路出兵；东路曹彬取涿州后粮尽退师，
 * 复趋涿州，被辽耶律休哥追击，大败于岐沟关，死者数万，北伐失败。
 * 宋、辽兵力均无确载；宋军死者「数万」为史载。
 * 地名古今对照：岐沟关今河北涿州西南、雄州今河北雄县、幽州今北京。
 */
var COLOR = { song: '#2b5262', liao: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'bianliang', name: '汴梁',   x: 174, y: 322, tx: 174, ty: 338, anchor: 'middle' },
  { id: 'xiongzhou', name: '雄州',   x: 238, y: 226, tx: 224, ty: 220, anchor: 'end' },
  { id: 'qigouguan', name: '岐沟关', x: 250, y: 190, tx: 236, ty: 184, anchor: 'end' },
  { id: 'zhuozhou',  name: '涿州',   x: 268, y: 172, tx: 282, ty: 166, anchor: 'start' },
  { id: 'youzhou',   name: '幽州',   x: 298, y: 140, tx: 298, ty: 126, anchor: 'middle' }
];

var BASE0 = { bianliang: 'song', xiongzhou: 'song', qigouguan: 'liao', zhuozhou: 'liao', youzhou: 'liao' };
var BASE1 = { bianliang: 'song', xiongzhou: 'song', qigouguan: 'contested', zhuozhou: 'liao', youzhou: 'liao' };
var BASE2 = { bianliang: 'song', xiongzhou: 'song', qigouguan: 'song', zhuozhou: 'song', youzhou: 'liao' };
var BASE3 = { bianliang: 'song', xiongzhou: 'song', qigouguan: 'song', zhuozhou: 'liao', youzhou: 'liao' };
var BASE4 = { bianliang: 'song', xiongzhou: 'song', qigouguan: 'liao', zhuozhou: 'liao', youzhou: 'liao' };

var STAGES = [
  {
    label: '三路北伐', seal: '北伐',
    kicker: '阶段一 · 986 年 三月',
    title: '宋太宗三路北伐',
    turn: '宋太宗分兵三路北伐：曹彬出雄州趋幽州，田重进出飞狐，潘美出雁门；三路约期会攻燕云。',
    why: '宋廷欲雪高粱河之耻，收复燕云；但三路兵力分散，东路粮道最长，最易出问题。',
    src: '《宋史·太宗本纪》《曹彬传》；《续资治通鉴长编》卷二十七。',
    events: [
      { time: '986·三月', who: '宋太宗', text: '分兵三路北伐', t: 0.08 },
      { time: '986·三月', who: '曹彬', text: '出雄州，趋幽州', t: 0.34, kind: 'flip', city: 'qigouguan' },
      { time: '986·三月', who: '田重进', text: '出飞狐', t: 0.58 },
      { time: '986·三月', who: '潘美', text: '出雁门', t: 0.84 }
    ],
    nums: [
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '辽军', value: '无确载', kind: '无确载', n: null },
      { label: '出兵', value: '三路', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { qigouguan: 0.34 },
    markers: [
      { type: 'host', side: 'song', x: 238, y: 226, t: 0.30, name: '曹彬', lx: 224, ly: 238, anchor: 'end' },
      { type: 'host', side: 'liao', x: 268, y: 172, t: 0.02, name: '耶律休哥', lx: 282, ly: 180, anchor: 'start' },
      { type: 'army', side: 'song', x: 246, y: 208, t: 0.34, name: '宋东路军', lx: 232, ly: 202, anchor: 'end' }
    ],
    routes: [
      { d: 'M 178 316 C 198 284 220 248 236 230', side: 'song', t0: 0.06, t1: 0.44,
        label: '宋军北上', lx: 196, ly: 288, anchor: 'end' },
      { d: 'M 242 222 C 246 212 248 202 250 194', side: 'song', t0: 0.34, t1: 0.66,
        label: '趋涿州', lx: 232, ly: 210, anchor: 'end' }
    ]
  },
  {
    label: '曹彬取涿州', seal: '取涿',
    kicker: '阶段二 · 986 年',
    title: '曹彬攻取涿州',
    turn: '东路曹彬连下州县，攻取涿州；辽耶律休哥以轻骑扰其粮道，宋军粮运不继，只得弃涿州退保雄州。',
    why: '涿州虽下，粮道却被辽轻骑不断袭扰；宋军越往北，补给越难。',
    src: '《宋史·曹彬传》；《辽史·耶律休哥传》；《续资治通鉴长编》卷二十七。',
    events: [
      { time: '986', who: '曹彬', text: '连下州县，攻取涿州', t: 0.08, kind: 'flip', city: 'zhuozhou' },
      { time: '986', who: '耶律休哥', text: '以轻骑扰其粮道', t: 0.34 },
      { time: '986', who: '宋军', text: '粮运不继', t: 0.58 },
      { time: '986', who: '曹彬', text: '弃涿州，退保雄州', t: 0.84, kind: 'flip', city: 'zhuozhou' }
    ],
    nums: [
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '辽军', value: '无确载', kind: '无确载', n: null },
      { label: '粮道', value: '被扰', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { zhuozhou: 0.08 },
    markers: [
      { type: 'host', side: 'song', x: 268, y: 172, t: 0.30, name: '曹彬', lx: 254, ly: 184, anchor: 'end' },
      { type: 'host', side: 'liao', x: 298, y: 140, t: 0.02, name: '耶律休哥', lx: 312, ly: 134, anchor: 'start' },
      { type: 'army', side: 'liao', x: 284, y: 158, t: 0.34, name: '辽轻骑', lx: 298, ly: 152, anchor: 'start' }
    ],
    routes: [
      { d: 'M 292 148 C 284 156 278 164 272 170', side: 'liao', t0: 0.30, t1: 0.64,
        label: '轻骑扰粮', lx: 300, ly: 164, anchor: 'start' }
    ]
  },
  {
    label: '粮尽退师', seal: '退师',
    kicker: '阶段三 · 986 年 五月',
    title: '曹彬粮尽退师，复趋涿州',
    turn: '曹彬退至雄州，闻西路潘美、田重进连捷，诸将耻于无功，复携粮趋涿州；行军失序，士卒疲敝。',
    why: '进退失据、军令不一，宋军在东路已失去主动权；耶律休哥正等待这个时机。',
    src: '《宋史·曹彬传》；《续资治通鉴长编》卷二十七。',
    events: [
      { time: '986·五月', who: '曹彬', text: '退至雄州', t: 0.08 },
      { time: '986·五月', who: '宋诸将', text: '耻于无功，复趋涿州', t: 0.34 },
      { time: '986·五月', who: '宋军', text: '携粮再进，行列失序', t: 0.58, kind: 'flip', city: 'zhuozhou' },
      { time: '986·五月', who: '士卒', text: '疲敝，暑渴死者众', t: 0.84 }
    ],
    nums: [
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '辽军', value: '无确载', kind: '无确载', n: null },
      { label: '行军', value: '失序', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { zhuozhou: 0.58 },
    markers: [
      { type: 'host', side: 'song', x: 268, y: 172, t: 0.30, name: '曹彬', lx: 254, ly: 166, anchor: 'end', weak: true },
      { type: 'host', side: 'liao', x: 298, y: 140, t: 0.02, name: '耶律休哥', lx: 312, ly: 146, anchor: 'start' },
      { type: 'army', side: 'song', x: 250, y: 200, t: 0.34, name: '宋军', lx: 236, ly: 194, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 242 222 C 250 208 258 190 264 178', side: 'song', t0: 0.34, t1: 0.70,
        label: '复趋涿州', lx: 236, ly: 208, anchor: 'end' }
    ]
  },
  {
    label: '岐沟关大败', seal: '大溃',
    kicker: '阶段四 · 986 年 五月',
    title: '耶律休哥追击，宋军大败于岐沟关',
    turn: '耶律休哥率精骑追及宋军于岐沟关，宋军大溃，死者数万，弃甲仗如山；曹彬夜渡拒马河，仅以身免。雍熙北伐失败。',
    why: '岐沟关一败，东路主力尽失，西路亦被迫退兵；宋廷自此放弃收复燕云的进取之策。',
    src: '《宋史·曹彬传》；《辽史·耶律休哥传》；《续资治通鉴长编》卷二十七。',
    events: [
      { time: '986·五月', who: '耶律休哥', text: '率精骑追及岐沟关', t: 0.08 },
      { time: '986·五月', who: '宋军', text: '大溃，死者数万', t: 0.34, kind: 'flip', city: 'qigouguan' },
      { time: '986·五月', who: '曹彬', text: '夜渡拒马河，仅以身免', t: 0.58 },
      { time: '986·五月', who: '宋', text: '雍熙北伐失败', t: 0.84, kind: 'flip', city: 'zhuozhou' }
    ],
    nums: [
      { label: '宋军死者', value: '数万', kind: '史载', n: null },
      { label: '辽军', value: '无确载', kind: '无确载', n: null },
      { label: '北伐', value: '失败', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { qigouguan: 0.34, zhuozhou: 0.84 },
    sieges: [
      { x: 250, y: 190, t: 0.34, label: '宋军溃', side: 'liao', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'liao', x: 250, y: 190, t: 0.30, name: '耶律休哥', lx: 236, ly: 202, anchor: 'end' },
      { type: 'host', side: 'song', x: 250, y: 190, t: 0.02, name: '曹彬', lx: 236, ly: 178, anchor: 'end', weak: true },
      { type: 'army', side: 'liao', x: 268, y: 180, t: 0.34, name: '辽军', lx: 282, ly: 174, anchor: 'start' }
    ],
    routes: [
      { d: 'M 274 176 C 266 180 258 184 254 188', side: 'liao', t0: 0.06, t1: 0.40,
        label: '辽军追击', lx: 282, ly: 190, anchor: 'start' },
      { d: 'M 246 194 C 236 206 228 216 224 222', side: 'retreat', t0: 0.34, t1: 0.72,
        label: '宋军南溃', lx: 210, ly: 206, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 236 C 70 232 140 240 210 234 C 280 228 340 234 385 230', color: '#a8b6ab', width: 2.6 },
    { d: 'M 60 50 C 90 110 120 160 150 210 C 168 244 178 300 182 386', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 150 66 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 76 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 80 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 30, y: 230, t: '拒马河', size: 8.5, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '岐沟关·今河北涿州西南　雄州·今河北雄县　幽州·今北京', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '燕　云', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'qigouguan',
  title: '岐沟关之战',
  kicker: '沙 盘 推 演',
  subtitle: '涿州 · 岐沟关',
  years: '986',
  yearUnit: 'AD',
  era: '北宋 · 雍熙三年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：岐沟关今河北涿州西南、雄州今河北雄县，非真实地理比例',
  hook: '雍熙北伐三路出兵，曹彬粮尽退师，岐沟关被辽军追歼，北伐失败',
  period: '宋辽',
  yearValue: 986,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '辽', b: '胜', sub: '986' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
