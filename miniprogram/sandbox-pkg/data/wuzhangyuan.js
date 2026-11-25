/**
 * 沙盘推演 · 五丈原之战（234）
 * 通行叙事：诸葛亮出斜谷屯五丈原、司马懿坚壁不战、蜀军屯田相持、诸葛亮病逝、蜀军退。
 * 蜀魏双方兵力均无确载；「相持百余日」「分兵屯田」为史载。
 * 地名古今对照：五丈原今陕西岐山南、斜谷今陕西眉县西南、陈仓今陕西宝鸡东。
 */
var COLOR = { shu: '#2b5262', wei: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'hanzhong',  name: '汉中', x: 180, y: 290, tx: 180, ty: 306, anchor: 'middle' },
  { id: 'xiegu',     name: '斜谷', x: 220, y: 200, tx: 206, ty: 210, anchor: 'end' },
  { id: 'wuzhangyuan', name: '五丈原', x: 252, y: 178, tx: 266, ty: 172, anchor: 'start' },
  { id: 'chencang',  name: '陈仓', x: 246, y: 146, tx: 232, ty: 138, anchor: 'end' },
  { id: 'weishui',   name: '渭水', x: 272, y: 208, tx: 286, ty: 216, anchor: 'start' },
  { id: 'changan',   name: '长安', x: 296, y: 122, tx: 296, ty: 108, anchor: 'middle' }
];

var BASE0 = { hanzhong: 'shu', xiegu: 'shu', wuzhangyuan: 'wei', chencang: 'wei', weishui: 'wei', changan: 'wei' };
var BASE1 = { hanzhong: 'shu', xiegu: 'shu', wuzhangyuan: 'shu', chencang: 'wei', weishui: 'wei', changan: 'wei' };
var BASE4 = { hanzhong: 'shu', xiegu: 'shu', wuzhangyuan: 'wei', chencang: 'wei', weishui: 'wei', changan: 'wei' };

var STAGES = [
  {
    label: '屯五丈原', seal: '出谷',
    kicker: '阶段一 · 234 年 春',
    title: '诸葛亮出斜谷，屯五丈原',
    turn: '诸葛亮率军出斜谷，屯于五丈原，与司马懿隔渭水对峙；蜀军分兵屯田，为久驻之计。',
    why: '诸葛亮吸取前几次粮尽退兵的教训，试图以屯田解决补给，把北伐变成持久战。',
    src: '《三国志·蜀书·诸葛亮传》；《资治通鉴》卷七十二。兵力无确载。',
    events: [
      { time: '234·春', who: '诸葛亮', text: '率军出斜谷', t: 0.08 },
      { time: '234·春', who: '蜀军', text: '屯五丈原，隔渭水', t: 0.34, kind: 'flip', city: 'wuzhangyuan' },
      { time: '234·春', who: '蜀军', text: '分兵屯田，为久驻之计', t: 0.58 },
      { time: '234·春', who: '司马懿', text: '率魏军拒守', t: 0.84 }
    ],
    nums: [
      { label: '蜀军', value: '无确载', kind: '无确载', n: null },
      { label: '魏军', value: '无确载', kind: '无确载', n: null },
      { label: '屯田', value: '久驻', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { wuzhangyuan: 0.34 },
    markers: [
      { type: 'host', side: 'shu', x: 220, y: 200, t: 0.02, name: '诸葛亮', lx: 206, ly: 192, anchor: 'end', moveRef: 0 },
      { type: 'host', side: 'wei', x: 296, y: 122, t: 0.02, name: '司马懿', lx: 310, ly: 116, anchor: 'start' },
      { type: 'army', side: 'shu', x: 250, y: 180, t: 0.50, name: '蜀军', lx: 264, ly: 188, anchor: 'start' }
    ],
    routes: [
      { d: 'M 224 196 C 234 190 244 184 250 180', side: 'shu', t0: 0.06, t1: 0.44,
        label: '出斜谷', lx: 220, ly: 188, anchor: 'end' },
      { d: 'M 292 128 C 284 148 278 170 274 196', side: 'wei', t0: 0.78, t1: 0.96,
        label: '魏军拒守', lx: 300, ly: 158, anchor: 'start' }
    ]
  },
  {
    label: '坚壁不战', seal: '拒战',
    kicker: '阶段二 · 234 年',
    title: '司马懿坚壁不战',
    turn: '诸葛亮数挑战，司马懿坚壁不出；诸葛亮遣巾帼妇人之服以辱之，司马懿仍不出战。',
    why: '司马懿以守代攻，赌的是蜀军粮运不继；只要不决战，蜀军就无法在关中立足。',
    src: '《三国志·魏书·明帝纪》《蜀书·诸葛亮传》注引《汉晋春秋》；《资治通鉴》卷七十二。',
    events: [
      { time: '234', who: '诸葛亮', text: '数挑战，魏军不出', t: 0.08 },
      { time: '234', who: '诸葛亮', text: '遣巾帼妇人之服以辱之', t: 0.34 },
      { time: '234', who: '司马懿', text: '仍坚壁不出', t: 0.58 },
      { time: '234', who: '魏军', text: '以逸待劳，守而不战', t: 0.84 }
    ],
    nums: [
      { label: '蜀军', value: '无确载', kind: '无确载', n: null },
      { label: '魏军', value: '无确载', kind: '无确载', n: null },
      { label: '相持', value: '百余日', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'shu', x: 252, y: 178, t: 0.02, name: '诸葛亮', lx: 266, ly: 184, anchor: 'start' },
      { type: 'host', side: 'wei', x: 272, y: 208, t: 0.02, name: '司马懿', lx: 286, ly: 202, anchor: 'start', weak: true },
      { type: 'army', side: 'wei', x: 282, y: 190, t: 0.30, name: '魏军', lx: 296, ly: 184, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '屯田相持', seal: '屯田',
    kicker: '阶段三 · 234 年',
    title: '蜀军屯田，与民杂耕',
    turn: '蜀军分兵屯田，与渭水之滨居民杂耕；军纪严整，百姓安堵。两军相持百余日。',
    why: '屯田使蜀军获得就地补给，但也把决战时间往后拖；对远征的蜀军而言，时间仍是最大的敌人。',
    src: '《三国志·蜀书·诸葛亮传》；《资治通鉴》卷七十二。「百姓安堵」为史载。',
    events: [
      { time: '234', who: '蜀军', text: '分兵屯田于渭滨', t: 0.08 },
      { time: '234', who: '蜀军', text: '与民杂耕，军纪严整', t: 0.34 },
      { time: '234', who: '百姓', text: '安堵如常', t: 0.58 },
      { time: '234', who: '两军', text: '相持百余日', t: 0.84 }
    ],
    nums: [
      { label: '蜀军', value: '无确载', kind: '无确载', n: null },
      { label: '屯田', value: '渭滨', kind: '史载', n: null },
      { label: '相持', value: '百余日', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'shu', x: 252, y: 178, t: 0.02, name: '诸葛亮', lx: 238, ly: 190, anchor: 'end' },
      { type: 'army', side: 'shu', x: 268, y: 200, t: 0.34, name: '屯田兵', lx: 282, ly: 208, anchor: 'start' },
      { type: 'host', side: 'wei', x: 296, y: 122, t: 0.02, name: '司马懿', lx: 282, ly: 114, anchor: 'end', weak: true }
    ],
    routes: []
  },
  {
    label: '星落五丈原', seal: '病逝',
    kicker: '阶段四 · 234 年 八月',
    title: '诸葛亮病逝，蜀军退',
    turn: '诸葛亮病卒于军中；蜀军秘不发丧，整军而退。司马懿追之，见蜀军阵整，不敢逼。',
    why: '主帅一死，北伐戛然而止；蜀军全身而退，说明诸葛亮的退兵部署仍有章法。',
    src: '《三国志·蜀书·诸葛亮传》；《资治通鉴》卷七十二。「死诸葛走生仲达」为后世语。',
    events: [
      { time: '234·八月', who: '诸葛亮', text: '病卒于五丈原军中', t: 0.08 },
      { time: '234·八月', who: '蜀军', text: '秘不发丧，整军而退', t: 0.34, kind: 'flip', city: 'wuzhangyuan' },
      { time: '234·八月', who: '司马懿', text: '追之，见阵整不敢逼', t: 0.58 },
      { time: '234·八月', who: '蜀军', text: '还汉中', t: 0.84 }
    ],
    nums: [
      { label: '蜀军', value: '无确载', kind: '无确载', n: null },
      { label: '魏军', value: '无确载', kind: '无确载', n: null },
      { label: '诸葛亮', value: '病逝', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { wuzhangyuan: 0.34 },
    markers: [
      { type: 'host', side: 'shu', x: 252, y: 178, t: 0.02, name: '诸葛亮', lx: 266, ly: 172, anchor: 'start', weak: true },
      { type: 'army', side: 'shu', x: 216, y: 220, t: 0.34, name: '蜀军', lx: 202, ly: 212, anchor: 'end' },
      { type: 'host', side: 'wei', x: 272, y: 208, t: 0.02, name: '司马懿', lx: 286, ly: 202, anchor: 'start' }
    ],
    routes: [
      { d: 'M 248 184 C 236 200 224 216 218 226', side: 'retreat', t0: 0.30, t1: 0.68,
        label: '蜀军退', lx: 232, ly: 204, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 232 C 60 226 120 236 180 230 C 240 224 300 218 385 222', color: '#a8b6ab', width: 3 },
    { d: 'M 120 80 C 160 116 200 152 240 188', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 92 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 262 62 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 60 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 318 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 228, t: '渭　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 116, y: 84, t: '秦 岭', size: 9, color: '#46594f', ls: 3, serif: true, rotate: 40 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '五丈原·今陕西岐山南　斜谷·今陕西眉县西南　陈仓·今陕西宝鸡东', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '关　中', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'wuzhangyuan',
  title: '五丈原之战',
  kicker: '沙 盘 推 演',
  subtitle: '斜谷 · 五丈原',
  years: '234',
  yearUnit: 'AD',
  era: '三国 · 蜀汉建兴十二年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：五丈原今陕西岐山南、斜谷今陕西眉县西南，非真实地理比例',
  hook: '诸葛亮屯五丈原，司马懿坚壁不战，相持百余日，星落军中',
  period: '三国',
  yearValue: 234,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '魏', b: '守', sub: '234' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
