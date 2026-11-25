/**
 * 沙盘推演 · 土木堡之变（1449）
 * 通行叙事：也先率瓦剌军入塞，明英宗在王振怂恿下亲征；
 * 明军大同前线失利仓促回师，至土木堡被围，水源被断，全军溃败，英宗被俘。
 * 明军「号五十万」为史载；瓦剌军兵力无确载。
 * 地名古今对照：土木堡今河北怀来东、宣府今河北宣化、大同今山西大同。
 */
var COLOR = { ming: '#2b5262', wa: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'beijing',    name: '北京',   x: 286, y: 150, tx: 286, ty: 136, anchor: 'middle' },
  { id: 'juyongguan', name: '居庸关', x: 262, y: 136, tx: 276, ty: 130, anchor: 'start' },
  { id: 'xuanfu',     name: '宣府',   x: 234, y: 122, tx: 220, ty: 116, anchor: 'end' },
  { id: 'tumubao',    name: '土木堡', x: 246, y: 172, tx: 260, ty: 180, anchor: 'start' },
  { id: 'datong',     name: '大同',   x: 186, y: 128, tx: 172, ty: 122, anchor: 'end' }
];

var BASE0 = { beijing: 'ming', juyongguan: 'ming', xuanfu: 'ming', tumubao: 'ming', datong: 'ming' };
var BASE1 = { beijing: 'ming', juyongguan: 'ming', xuanfu: 'ming', tumubao: 'ming', datong: 'contested' };
var BASE2 = { beijing: 'ming', juyongguan: 'ming', xuanfu: 'contested', tumubao: 'ming', datong: 'contested' };
var BASE3 = { beijing: 'ming', juyongguan: 'ming', xuanfu: 'contested', tumubao: 'contested', datong: 'contested' };
var BASE4 = { beijing: 'ming', juyongguan: 'ming', xuanfu: 'wa', tumubao: 'wa', datong: 'contested' };

var STAGES = [
  {
    label: '英宗亲征', seal: '亲征',
    kicker: '阶段一 · 1449 年 七月',
    title: '也先入塞，英宗仓促亲征',
    turn: '也先率瓦剌军分道入塞，攻大同；明英宗在王振怂恿下仓促亲征，率大军出居庸关。',
    why: '明军仓促集结、指挥混乱；皇帝亲征本是提振士气之举，却把朝廷中枢直接送上了前线。',
    src: '《明史·英宗前纪》《王振传》《瓦剌传》。',
    events: [
      { time: '1449·七月', who: '也先', text: '分道入塞，攻大同', t: 0.08, kind: 'flip', city: 'datong' },
      { time: '1449·七月', who: '明英宗', text: '仓促下诏亲征', t: 0.34 },
      { time: '1449·七月', who: '明军', text: '出居庸关', t: 0.58 },
      { time: '1449·七月', who: '王振', text: '挟帝同行，调度失序', t: 0.84 }
    ],
    nums: [
      { label: '明军', value: '号五十万', kind: '史载', n: null },
      { label: '瓦剌军', value: '无确载', kind: '无确载', n: null },
      { label: '亲征', value: '仓促', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { datong: 0.08 },
    markers: [
      { type: 'host', side: 'wa', x: 186, y: 128, t: 0.30, name: '也先', lx: 172, ly: 122, anchor: 'end' },
      { type: 'host', side: 'ming', x: 286, y: 150, t: 0.02, name: '明英宗', lx: 300, ly: 144, anchor: 'start' },
      { type: 'army', side: 'ming', x: 264, y: 142, t: 0.58, name: '明军', lx: 278, ly: 136, anchor: 'start' }
    ],
    routes: [
      { d: 'M 282 152 C 268 146 252 138 240 132', side: 'ming', t0: 0.54, t1: 0.86,
        label: '明军出关', lx: 268, ly: 154, anchor: 'start' }
    ]
  },
  {
    label: '大同失利', seal: '回师',
    kicker: '阶段二 · 1449 年 八月',
    title: '大同前线失利，明军仓促回师',
    turn: '明军至大同，前锋失利，王振惧而劝帝回师；大军自宣府方向东撤，秩序混乱。',
    why: '未战先退，士气已堕；大军挤在狭隘的宣府—土木堡一线，给瓦剌骑兵追袭之机。',
    src: '《明史·英宗前纪》《王振传》。',
    events: [
      { time: '1449·八月', who: '明军前锋', text: '大同前线失利', t: 0.08 },
      { time: '1449·八月', who: '王振', text: '劝帝回师', t: 0.34 },
      { time: '1449·八月', who: '明军', text: '自宣府东撤', t: 0.58, kind: 'flip', city: 'xuanfu' },
      { time: '1449·八月', who: '明军', text: '秩序混乱', t: 0.84 }
    ],
    nums: [
      { label: '明军', value: '号五十万', kind: '史载', n: null },
      { label: '瓦剌军', value: '无确载', kind: '无确载', n: null },
      { label: '回师', value: '仓促', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { xuanfu: 0.58 },
    markers: [
      { type: 'host', side: 'ming', x: 234, y: 122, t: 0.30, name: '明英宗', lx: 220, ly: 134, anchor: 'end' },
      { type: 'host', side: 'wa', x: 200, y: 140, t: 0.02, name: '也先', lx: 186, ly: 134, anchor: 'end', weak: true },
      { type: 'army', side: 'ming', x: 244, y: 148, t: 0.58, name: '明军', lx: 258, ly: 142, anchor: 'start' }
    ],
    routes: [
      { d: 'M 228 128 C 236 138 242 148 246 158', side: 'ming', t0: 0.56, t1: 0.90,
        label: '明军东撤', lx: 220, ly: 144, anchor: 'end' }
    ]
  },
  {
    label: '土木堡被围', seal: '被围',
    kicker: '阶段三 · 1449 年 八月',
    title: '明军驻土木堡，瓦剌追及',
    turn: '明军退至土木堡，因等候辎重驻营不前；瓦剌军追至，占据水源，四面围之。',
    why: '土木堡地势高而无水，明军数十万挤在一处，既不能战，也不能走。',
    src: '《明史·英宗前纪》《王振传》；《明史纪事本末·土木之变》。',
    events: [
      { time: '1449·八月', who: '明军', text: '退至土木堡驻营', t: 0.08, kind: 'flip', city: 'tumubao' },
      { time: '1449·八月', who: '瓦剌军', text: '追及，四面围之', t: 0.34 },
      { time: '1449·八月', who: '瓦剌军', text: '占据水源', t: 0.58 },
      { time: '1449·八月', who: '明军', text: '掘井无水，人马渴乏', t: 0.84 }
    ],
    nums: [
      { label: '明军', value: '号五十万', kind: '史载', n: null },
      { label: '瓦剌军', value: '无确载', kind: '无确载', n: null },
      { label: '水源', value: '被断', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { tumubao: 0.08 },
    markers: [
      { type: 'host', side: 'ming', x: 246, y: 172, t: 0.30, name: '明英宗', lx: 232, ly: 166, anchor: 'end' },
      { type: 'host', side: 'wa', x: 246, y: 172, t: 0.02, name: '也先', lx: 260, ly: 166, anchor: 'start' },
      { type: 'army', side: 'wa', x: 234, y: 158, t: 0.34, name: '瓦剌军', lx: 220, ly: 152, anchor: 'end' }
    ],
    routes: [
      { d: 'M 238 148 C 240 156 242 164 244 168', side: 'wa', t0: 0.10, t1: 0.50,
        label: '追及', lx: 226, ly: 160, anchor: 'end' }
    ]
  },
  {
    label: '全军溃败', seal: '被俘',
    kicker: '阶段四 · 1449 年 八月',
    title: '瓦剌军突袭，明军溃败，英宗被俘',
    turn: '瓦剌军佯退，明军移营就水，阵形大乱；瓦剌骑兵四面突击，明军全军溃败，英宗被俘。',
    why: '移营瞬间是最脆弱的时刻，瓦剌军抓住这一空隙一击而溃；皇帝被俘，明朝震动。',
    src: '《明史·英宗前纪》《王振传》；《明史纪事本末·土木之变》。',
    events: [
      { time: '1449·八月', who: '瓦剌军', text: '佯退诱明军移营', t: 0.08 },
      { time: '1449·八月', who: '明军', text: '移营就水，阵形大乱', t: 0.34 },
      { time: '1449·八月', who: '瓦剌军', text: '四面突击，明军溃败', t: 0.58, kind: 'flip', city: 'tumubao' },
      { time: '1449·八月', who: '明英宗', text: '被俘', t: 0.84 }
    ],
    nums: [
      { label: '明军', value: '号五十万', kind: '史载', n: null },
      { label: '瓦剌军', value: '无确载', kind: '无确载', n: null },
      { label: '英宗', value: '被俘', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { tumubao: 0.58, xuanfu: 0.58 },
    sieges: [
      { x: 246, y: 172, t: 0.58, label: '明军溃', side: 'wa', lx: 12, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'wa', x: 234, y: 122, t: 0.30, name: '也先', lx: 220, ly: 116, anchor: 'end' },
      { type: 'host', side: 'ming', x: 246, y: 172, t: 0.02, name: '明英宗', lx: 260, ly: 178, anchor: 'start', weak: true },
      { type: 'army', side: 'wa', x: 256, y: 160, t: 0.34, name: '瓦剌军', lx: 270, ly: 154, anchor: 'start' }
    ],
    routes: [
      { d: 'M 240 130 C 240 144 242 158 244 168', side: 'wa', t0: 0.40, t1: 0.80,
        label: '突击', lx: 228, ly: 146, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 150 60 C 180 100 210 140 240 176 C 270 212 300 240 330 262', color: '#a8b6ab', width: 2.2 },
    { d: 'M -10 200 C 60 194 120 202 180 196 C 240 190 300 198 385 194', color: '#b6c3b6', width: 2.2 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 196, t: '桑干河', size: 8.5, color: '#46594f', ls: 2, serif: true },
    { x: 96, y: 148, t: '太行山', size: 9, color: '#46594f', ls: 3, serif: true, rotate: 56 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '土木堡·今河北怀来东　宣府·今河北宣化　大同·今山西大同', size: 6.6, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '宣　大', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'tumubao',
  title: '土木堡之变',
  kicker: '沙 盘 推 演',
  subtitle: '宣府 · 土木堡',
  years: '1449',
  yearUnit: 'AD',
  era: '明 · 正统十四年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：土木堡今河北怀来东、宣府今河北宣化，非真实地理比例',
  hook: '英宗仓促亲征，明军土木堡被围溃败，英宗被瓦剌俘去',
  period: '明',
  yearValue: 1449,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '瓦剌', b: '胜', sub: '1449' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
