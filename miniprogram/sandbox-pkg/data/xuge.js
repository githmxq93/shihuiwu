/**
 * 沙盘推演 · 繻葛之战（前707）
 * 通行叙事：周桓王率陈、蔡、卫联军伐郑，郑庄公拒之于繻葛；
 * 郑军以鱼丽之阵大破周联军，祝聃射中周桓王肩，天子威信扫地。
 * 双方兵力无确载；「射中王肩」为史载。
 * 地名古今对照：繻葛今河南长葛北、洛邑今河南洛阳、新郑今河南新郑。
 */
var COLOR = { zheng: '#2b5262', zhou: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'luoyi',     name: '洛邑',   x: 206, y: 152, tx: 192, ty: 146, anchor: 'end' },
  { id: 'xuge',      name: '繻葛',   x: 226, y: 178, tx: 212, ty: 186, anchor: 'end' },
  { id: 'xinzheng',  name: '新郑',   x: 252, y: 204, tx: 266, ty: 212, anchor: 'start' },
  { id: 'song',      name: '宋',     x: 284, y: 170, tx: 298, ty: 164, anchor: 'start' },
  { id: 'wei',       name: '卫',     x: 268, y: 132, tx: 282, ty: 126, anchor: 'start' }
];

var BASE0 = { luoyi: 'zhou', xuge: 'zhou', xinzheng: 'zheng', song: 'zhou', wei: 'zhou' };
var BASE1 = { luoyi: 'zhou', xuge: 'contested', xinzheng: 'zheng', song: 'zhou', wei: 'zhou' };
var BASE3 = { luoyi: 'zhou', xuge: 'zheng', xinzheng: 'zheng', song: 'contested', wei: 'contested' };

var STAGES = [
  {
    label: '桓王伐郑', seal: '王师',
    kicker: '阶段一 · 前 707 年',
    title: '周桓王率联军伐郑',
    turn: '周桓王亲率王师，并征陈、蔡、卫之军伐郑；郑庄公率军拒于繻葛。',
    why: '郑庄公久不朝周，周王室欲以武力重树天子权威；此战是王权与诸侯实力的一次正面对撞。',
    src: '《左传·桓公五年》；《史记·郑世家》。',
    events: [
      { time: '前707', who: '周桓王', text: '率王师及陈蔡卫之军伐郑', t: 0.08 },
      { time: '前707', who: '周联军', text: '进至繻葛', t: 0.34, kind: 'flip', city: 'xuge' },
      { time: '前707', who: '郑庄公', text: '率军拒之', t: 0.58 },
      { time: '前707', who: '郑军', text: '列阵于繻葛', t: 0.84 }
    ],
    nums: [
      { label: '周联军', value: '无确载', kind: '无确载', n: null },
      { label: '郑军', value: '无确载', kind: '无确载', n: null },
      { label: '王师', value: '亲征', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { xuge: 0.34 },
    markers: [
      { type: 'host', side: 'zhou', x: 206, y: 152, t: 0.02, name: '周桓王', lx: 192, ly: 146, anchor: 'end' },
      { type: 'host', side: 'zheng', x: 252, y: 204, t: 0.02, name: '郑庄公', lx: 266, ly: 198, anchor: 'start' },
      { type: 'army', side: 'zhou', x: 216, y: 164, t: 0.34, name: '周联军', lx: 202, ly: 158, anchor: 'end' }
    ],
    routes: [
      { d: 'M 212 158 C 218 166 222 172 224 176', side: 'zhou', t0: 0.10, t1: 0.50,
        label: '王师东来', lx: 204, ly: 172, anchor: 'end' }
    ]
  },
  {
    label: '繻葛对阵', seal: '对阵',
    kicker: '阶段二 · 前 707 年',
    title: '两军对阵繻葛',
    turn: '周联军分为左、中、右三军，陈、蔡、卫分属左右；郑军以鱼丽之阵相待。',
    why: '周联军虽众，然陈、蔡、卫各怀异心；郑军看出其左右两翼薄弱，决意先击两翼。',
    src: '《左传·桓公五年》。',
    events: [
      { time: '前707', who: '周联军', text: '分左中右三军', t: 0.08 },
      { time: '前707', who: '郑军', text: '以鱼丽之阵相待', t: 0.34 },
      { time: '前707', who: '郑庄公', text: '察其左右薄弱', t: 0.58 },
      { time: '前707', who: '郑军', text: '决意先击两翼', t: 0.84 }
    ],
    nums: [
      { label: '周联军', value: '无确载', kind: '无确载', n: null },
      { label: '郑军', value: '无确载', kind: '无确载', n: null },
      { label: '阵法', value: '鱼丽', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'zhou', x: 226, y: 178, t: 0.02, name: '周桓王', lx: 212, ly: 172, anchor: 'end' },
      { type: 'host', side: 'zheng', x: 226, y: 178, t: 0.30, name: '郑庄公', lx: 240, ly: 186, anchor: 'start' },
      { type: 'army', side: 'zheng', x: 236, y: 190, t: 0.34, name: '郑军', lx: 250, ly: 196, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '郑军破敌', seal: '决战',
    kicker: '阶段三 · 前 707 年',
    title: '郑军先击两翼，周军大败',
    turn: '郑军先攻陈、蔡、卫左右两翼，联军溃散；随后合击中军，周师大败。',
    why: '联军左右一溃，中军便成孤军；郑军以局部优势击破整体，是典型的集中兵力打法。',
    src: '《左传·桓公五年》；《史记·郑世家》。',
    events: [
      { time: '前707', who: '郑军', text: '先攻左右两翼', t: 0.08 },
      { time: '前707', who: '陈蔡卫军', text: '溃散', t: 0.34, kind: 'flip', city: 'song' },
      { time: '前707', who: '郑军', text: '合击中军', t: 0.58 },
      { time: '前707', who: '周军', text: '大败', t: 0.84, kind: 'flip', city: 'xuge' }
    ],
    nums: [
      { label: '周联军', value: '无确载', kind: '无确载', n: null },
      { label: '郑军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '周军大败', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { song: 0.34, wei: 0.34, xuge: 0.84 },
    sieges: [
      { x: 226, y: 178, t: 0.84, label: '周军溃', side: 'zheng', lx: 12, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'zheng', x: 226, y: 178, t: 0.30, name: '郑庄公', lx: 212, ly: 190, anchor: 'end' },
      { type: 'host', side: 'zhou', x: 226, y: 178, t: 0.02, name: '周桓王', lx: 240, ly: 172, anchor: 'start', weak: true },
      { type: 'army', side: 'zheng', x: 238, y: 188, t: 0.34, name: '郑军', lx: 252, ly: 194, anchor: 'start' }
    ],
    routes: [
      { d: 'M 234 184 C 232 182 230 180 228 178', side: 'zheng', t0: 0.20, t1: 0.60,
        label: '击两翼', lx: 246, ly: 182, anchor: 'start' }
    ]
  },
  {
    label: '射中王肩', seal: '王威',
    kicker: '阶段四 · 前 707 年',
    title: '祝聃射中王肩，天子威信扫地',
    turn: '郑将祝聃射中周桓王肩，周军退走；郑庄公止兵不追，遣使慰问。周天子权威自此大损。',
    why: '天子亲征而败、且被诸侯射伤，周王室的军事威慑与礼制权威同时崩塌。',
    src: '《左传·桓公五年》；《史记·郑世家》。',
    events: [
      { time: '前707', who: '祝聃', text: '射中周桓王肩', t: 0.08 },
      { time: '前707', who: '周军', text: '退走', t: 0.34 },
      { time: '前707', who: '郑庄公', text: '止兵不追，遣使慰问', t: 0.58 },
      { time: '前707', who: '周王室', text: '威信大损', t: 0.84 }
    ],
    nums: [
      { label: '周联军', value: '无确载', kind: '无确载', n: null },
      { label: '郑军', value: '无确载', kind: '无确载', n: null },
      { label: '桓王', value: '中肩', kind: '史载', n: null }
    ],
    hold: BASE3,
    markers: [
      { type: 'host', side: 'zheng', x: 226, y: 178, t: 0.02, name: '祝聃', lx: 240, ly: 172, anchor: 'start' },
      { type: 'host', side: 'zhou', x: 206, y: 152, t: 0.34, name: '周桓王', lx: 192, ly: 146, anchor: 'end', weak: true },
      { type: 'army', side: 'zhou', x: 214, y: 162, t: 0.34, name: '周军', lx: 200, ly: 156, anchor: 'end' }
    ],
    routes: [
      { d: 'M 218 164 C 214 160 210 156 208 154', side: 'retreat', t0: 0.30, t1: 0.70,
        label: '周军退走', lx: 222, ly: 154, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 230 C 60 224 120 232 180 226 C 240 220 300 228 385 224', color: '#a8b6ab', width: 2.6 },
    { d: 'M 150 80 C 180 110 210 140 240 170', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 226, t: '颍　水', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '繻葛·今河南长葛北　洛邑·今河南洛阳　新郑·今河南新郑', size: 6.6, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '中　原', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'xuge',
  title: '繻葛之战',
  kicker: '沙 盘 推 演',
  subtitle: '洛邑 · 繻葛',
  years: '前707',
  yearUnit: '',
  era: '春秋 · 周桓王十三年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：繻葛今河南长葛北、洛邑今河南洛阳，非真实地理比例',
  hook: '郑庄公鱼丽之阵破周联军，祝聃射中王肩，天子威信扫地',
  period: '春秋',
  yearValue: -707,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '郑', b: '胜', sub: '前707' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
