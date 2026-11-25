/**
 * 沙盘推演 · 街亭之战（228）
 * 通行叙事：诸葛亮出祁山、三郡响应、张郃西援、马谡舍水上山失街亭、诸葛亮退兵斩马谡。
 * 张郃「步骑五万」、拔西县千余家为史载；马谡与蜀军兵力无确载。
 * 地名古今对照：街亭今甘肃秦安东北、祁山今甘肃礼县东、陈仓今陕西宝鸡东。
 */
var COLOR = { shu: '#2b5262', wei: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'hanzhong', name: '汉中', x: 176, y: 286, tx: 176, ty: 302, anchor: 'middle' },
  { id: 'qishan',   name: '祁山', x: 142, y: 186, tx: 128, ty: 194, anchor: 'end' },
  { id: 'tianshui', name: '天水', x: 172, y: 150, tx: 158, ty: 142, anchor: 'end' },
  { id: 'jieting',  name: '街亭', x: 214, y: 146, tx: 228, ty: 140, anchor: 'start' },
  { id: 'chencang', name: '陈仓', x: 248, y: 186, tx: 248, ty: 202, anchor: 'middle' },
  { id: 'changan',  name: '长安', x: 288, y: 146, tx: 288, ty: 132, anchor: 'middle' }
];

var BASE0 = { hanzhong: 'shu', qishan: 'shu', tianshui: 'shu', jieting: 'shu', chencang: 'wei', changan: 'wei' };
var BASE1 = { hanzhong: 'shu', qishan: 'shu', tianshui: 'shu', jieting: 'shu', chencang: 'wei', changan: 'wei' };
var BASE2 = { hanzhong: 'shu', qishan: 'shu', tianshui: 'shu', jieting: 'contested', chencang: 'wei', changan: 'wei' };
var BASE3 = { hanzhong: 'shu', qishan: 'shu', tianshui: 'shu', jieting: 'wei', chencang: 'wei', changan: 'wei' };
var BASE4 = { hanzhong: 'shu', qishan: 'wei', tianshui: 'wei', jieting: 'wei', chencang: 'wei', changan: 'wei' };

var STAGES = [
  {
    label: '出祁山', seal: '北伐',
    kicker: '阶段一 · 228 年 春',
    title: '诸葛亮出祁山，三郡响应',
    turn: '诸葛亮率军出祁山，南安、天水、安定三郡响应；魏明帝遣张郃率步骑五万西援，诸葛亮以马谡为先锋，守街亭。',
    why: '蜀军首次北伐声势最大，三郡响应使关中震动；能否守住街亭，决定这次北伐能否在陇右站稳。',
    src: '《三国志·蜀书·诸葛亮传》《魏书·张郃传》；《资治通鉴》卷七十一。张郃五万为史载。',
    events: [
      { time: '228·春', who: '诸葛亮', text: '率军出祁山', t: 0.08 },
      { time: '228·春', who: '南安·天水·安定', text: '三郡响应', t: 0.34, kind: 'flip', city: 'tianshui' },
      { time: '228·春', who: '蜀军', text: '进至街亭', t: 0.58 },
      { time: '228·春', who: '魏明帝', text: '遣张郃率五万西援', t: 0.84 }
    ],
    nums: [
      { label: '蜀军', value: '无确载', kind: '无确载', n: null },
      { label: '张郃军', value: '步骑五万', kind: '史载', n: 50 },
      { label: '响应', value: '三郡', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { tianshui: 0.34 },
    markers: [
      { type: 'host', side: 'shu', x: 142, y: 186, t: 0.02, name: '诸葛亮', lx: 128, ly: 178, anchor: 'end', moveRef: 0 },
      { type: 'host', side: 'wei', x: 288, y: 146, t: 0.02, name: '张郃', lx: 302, ly: 140, anchor: 'start' },
      { type: 'army', side: 'shu', x: 214, y: 146, t: 0.56, name: '蜀军', lx: 228, ly: 154, anchor: 'start' }
    ],
    routes: [
      { d: 'M 146 182 C 162 170 182 158 208 150', side: 'shu', t0: 0.06, t1: 0.50,
        label: '蜀军北上', lx: 152, ly: 172, anchor: 'start' },
      { d: 'M 284 150 C 268 158 254 168 246 180', side: 'wei', t0: 0.78, t1: 0.96,
        label: '张郃西援', lx: 272, ly: 170, anchor: 'end' }
    ]
  },
  {
    label: '马谡守街亭', seal: '当道',
    kicker: '阶段二 · 228 年',
    title: '马谡至街亭，舍水上山',
    turn: '马谡至街亭，舍水上山，据险而不当道；裨将王平谏以当道筑城，马谡不听。张郃军进逼街亭。',
    why: '街亭是关中通往陇右的咽喉，守军本当据道而守；马谡上山，等于把道路让给魏军。',
    src: '《三国志·蜀书·马良传附马谡传》《王平传》；《资治通鉴》卷七十一。',
    events: [
      { time: '228', who: '马谡', text: '率先锋至街亭', t: 0.08 },
      { time: '228', who: '马谡', text: '舍水上山，据险不守道', t: 0.34 },
      { time: '228', who: '王平', text: '谏以当道筑城，不听', t: 0.58 },
      { time: '228', who: '张郃', text: '军进逼街亭', t: 0.84, kind: 'flip', city: 'jieting' }
    ],
    nums: [
      { label: '马谡军', value: '无确载', kind: '无确载', n: null },
      { label: '张郃军', value: '步骑五万', kind: '史载', n: 50 },
      { label: '街亭', value: '咽喉', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { jieting: 0.84 },
    markers: [
      { type: 'host', side: 'shu', x: 214, y: 146, t: 0.02, name: '马谡', lx: 228, ly: 140, anchor: 'start' },
      { type: 'army', side: 'shu', x: 204, y: 136, t: 0.30, name: '蜀军', lx: 190, ly: 128, anchor: 'end', weak: true },
      { type: 'host', side: 'wei', x: 248, y: 186, t: 0.02, name: '张郃', lx: 262, ly: 180, anchor: 'start' }
    ],
    routes: [
      { d: 'M 250 180 C 238 170 226 160 218 152', side: 'wei', t0: 0.78, t1: 0.96,
        label: '魏军进逼', lx: 242, ly: 168, anchor: 'end' }
    ]
  },
  {
    label: '失街亭', seal: '大败',
    kicker: '阶段三 · 228 年',
    title: '张郃断汲道，大破马谡',
    turn: '张郃断马谡汲道，蜀军无水，阵脚自乱；魏军大破之，马谡弃军而走，街亭失守。',
    why: '山地扎营而失水源，是战术上的致命错误；街亭一失，蜀军主力侧翼暴露，北伐态势急转直下。',
    src: '《三国志·魏书·张郃传》《蜀书·王平传》；《资治通鉴》卷七十一。「绝其汲道」为史载。',
    events: [
      { time: '228', who: '张郃', text: '断马谡汲道', t: 0.08 },
      { time: '228', who: '蜀军', text: '无水，阵脚自乱', t: 0.34 },
      { time: '228', who: '魏军', text: '大破蜀军，街亭失守', t: 0.58, kind: 'flip', city: 'jieting' },
      { time: '228', who: '马谡', text: '弃军而走，王平收残兵', t: 0.84 }
    ],
    nums: [
      { label: '魏军', value: '步骑五万', kind: '史载', n: 50 },
      { label: '蜀军', value: '无确载', kind: '无确载', n: null },
      { label: '街亭', value: '失守', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { jieting: 0.58 },
    sieges: [
      { x: 214, y: 146, t: 0.58, label: '街亭破', side: 'wei', lx: -12, ly: 10, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'wei', x: 214, y: 146, t: 0.02, name: '张郃', lx: 200, ly: 158, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'wei', x: 230, y: 154, t: 0.34, name: '魏军', lx: 244, ly: 148, anchor: 'start' },
      { type: 'host', side: 'shu', x: 214, y: 146, t: 0.02, name: '马谡', lx: 228, ly: 134, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 218 150 C 218 152 218 154 218 156', side: 'wei', t0: 0.06, t1: 0.34,
        label: '断汲道', lx: 206, ly: 144, anchor: 'end' }
    ]
  },
  {
    label: '退兵斩谡', seal: '退兵',
    kicker: '阶段四 · 228 年',
    title: '诸葛亮拔西县，挥泪斩马谡',
    turn: '街亭既失，诸葛亮拔西县千余家还汉中；三郡复归魏。诸葛亮挥泪斩马谡，自贬三等。第一次北伐失败。',
    why: '街亭是这次北伐的支点，支点一失，陇右得而复失；蜀汉此后北伐再难取得如此声势。',
    src: '《三国志·蜀书·诸葛亮传》《马谡传》；《资治通鉴》卷七十一。「拔西县千余家」为史载。',
    events: [
      { time: '228', who: '诸葛亮', text: '拔西县千余家', t: 0.08 },
      { time: '228', who: '蜀军', text: '还汉中', t: 0.34, kind: 'flip', city: 'qishan' },
      { time: '228', who: '诸葛亮', text: '挥泪斩马谡', t: 0.58 },
      { time: '228', who: '魏', text: '三郡复归，第一次北伐失败', t: 0.84, kind: 'flip', city: 'tianshui' }
    ],
    nums: [
      { label: '徙民', value: '千余家', kind: '史载', n: null },
      { label: '蜀军', value: '无确载', kind: '无确载', n: null },
      { label: '北伐', value: '失败', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { qishan: 0.34, tianshui: 0.84 },
    markers: [
      { type: 'host', side: 'shu', x: 176, y: 286, t: 0.30, name: '诸葛亮', lx: 190, ly: 280, anchor: 'start' },
      { type: 'host', side: 'wei', x: 214, y: 146, t: 0.02, name: '张郃', lx: 228, ly: 140, anchor: 'start', weak: true },
      { type: 'army', side: 'shu', x: 160, y: 220, t: 0.34, name: '蜀军', lx: 146, ly: 212, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 148 190 C 156 220 166 252 172 280', side: 'retreat', t0: 0.30, t1: 0.70,
        label: '蜀军南还', lx: 134, ly: 236, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 244 C 60 238 120 248 180 242 C 240 236 300 230 385 234', color: '#a8b6ab', width: 2.6 },
    { d: 'M 96 92 C 130 120 166 148 202 176', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 92 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 250 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 60 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 318 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 240, t: '渭　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 104, y: 96, t: '秦 岭', size: 9, color: '#46594f', ls: 3, serif: true, rotate: 34 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '街亭·今甘肃秦安东北　祁山·今甘肃礼县东　陈仓·今陕西宝鸡东', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '陇　右', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'jieting',
  title: '街亭之战',
  kicker: '沙 盘 推 演',
  subtitle: '祁山 · 街亭',
  years: '228',
  yearUnit: 'AD',
  era: '三国 · 蜀汉建兴六年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：街亭今甘肃秦安东北、祁山今甘肃礼县东，非真实地理比例',
  hook: '马谡舍水上山，张郃断汲道，诸葛亮第一次北伐失利',
  period: '三国',
  yearValue: 228,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '魏', b: '胜', sub: '228' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
