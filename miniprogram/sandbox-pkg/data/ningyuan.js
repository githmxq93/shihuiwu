/**
 * 沙盘推演 · 宁远之战（1626）
 * 通行叙事：努尔哈赤率后金军攻宁远，袁崇焕凭城用红夷大炮坚守；
 * 后金军攻城受挫，努尔哈赤退兵，不久病卒。此为明军对后金首次守城大捷。
 * 后金军「号十三万」为史载；明军兵力无确载。
 * 地名古今对照：宁远今辽宁兴城、锦州今辽宁锦州、山海关今河北秦皇岛山海关。
 */
var COLOR = { ming: '#2b5262', houjin: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'shenyang',    name: '沈阳',   x: 284, y: 92,  tx: 284, ty: 78,  anchor: 'middle' },
  { id: 'jinzhou',     name: '锦州',   x: 250, y: 138, tx: 236, ty: 132, anchor: 'end' },
  { id: 'ningyuan',    name: '宁远',   x: 228, y: 180, tx: 228, ty: 166, anchor: 'middle' },
  { id: 'juehuadao',   name: '觉华岛', x: 248, y: 216, tx: 262, ty: 224, anchor: 'start' },
  { id: 'shanhaiguan', name: '山海关', x: 196, y: 244, tx: 182, ty: 252, anchor: 'end' }
];

var BASE0 = { shenyang: 'houjin', jinzhou: 'houjin', ningyuan: 'ming', juehuadao: 'ming', shanhaiguan: 'ming' };
var BASE1 = { shenyang: 'houjin', jinzhou: 'houjin', ningyuan: 'contested', juehuadao: 'ming', shanhaiguan: 'ming' };
var BASE4 = { shenyang: 'houjin', jinzhou: 'houjin', ningyuan: 'ming', juehuadao: 'ming', shanhaiguan: 'ming' };

var STAGES = [
  {
    label: '后金南下', seal: '来攻',
    kicker: '阶段一 · 1626 年 正月',
    title: '努尔哈赤率军南下，直指宁远',
    turn: '努尔哈赤率后金军自沈阳南下，越锦州，直指宁远；袁崇焕集兵守城，誓与城共存亡。',
    why: '宁远是山海关外最后一座坚城，宁远一失，后金便直叩关门。',
    src: '《明史·袁崇焕传》；《清太祖实录》。',
    events: [
      { time: '1626·正月', who: '努尔哈赤', text: '自沈阳南下', t: 0.08 },
      { time: '1626·正月', who: '后金军', text: '越锦州，直指宁远', t: 0.34 },
      { time: '1626·正月', who: '袁崇焕', text: '集兵守宁远', t: 0.58, kind: 'flip', city: 'ningyuan' },
      { time: '1626·正月', who: '明军', text: '誓与城共存亡', t: 0.84 }
    ],
    nums: [
      { label: '后金军', value: '号十三万', kind: '史载', n: null },
      { label: '明军', value: '无确载', kind: '无确载', n: null },
      { label: '宁远', value: '坚城', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { ningyuan: 0.58 },
    markers: [
      { type: 'host', side: 'houjin', x: 284, y: 92, t: 0.02, name: '努尔哈赤', lx: 298, ly: 86, anchor: 'start' },
      { type: 'host', side: 'ming', x: 228, y: 180, t: 0.02, name: '袁崇焕', lx: 214, ly: 174, anchor: 'end' },
      { type: 'army', side: 'houjin', x: 262, y: 122, t: 0.34, name: '后金军', lx: 276, ly: 116, anchor: 'start' }
    ],
    routes: [
      { d: 'M 280 98 C 268 120 252 146 240 170', side: 'houjin', t0: 0.10, t1: 0.56,
        label: '后金南下', lx: 274, ly: 128, anchor: 'start' }
    ]
  },
  {
    label: '凭城用炮', seal: '守城',
    kicker: '阶段二 · 1626 年 正月',
    title: '袁崇焕凭城用红夷大炮',
    turn: '后金军攻城，袁崇焕令军士凭城发红夷大炮，后金军伤亡惨重，攻势受挫。',
    why: '红夷大炮射程远、威力大，后金军的楯车与云梯在炮火下难以接近城墙。',
    src: '《明史·袁崇焕传》；《清太祖实录》。',
    events: [
      { time: '1626·正月', who: '后金军', text: '攻城', t: 0.08 },
      { time: '1626·正月', who: '明军', text: '凭城发红夷大炮', t: 0.34 },
      { time: '1626·正月', who: '后金军', text: '伤亡惨重', t: 0.58 },
      { time: '1626·正月', who: '后金军', text: '攻势受挫', t: 0.84 }
    ],
    nums: [
      { label: '后金军', value: '号十三万', kind: '史载', n: null },
      { label: '明军', value: '无确载', kind: '无确载', n: null },
      { label: '红夷炮', value: '却敌', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'houjin', x: 240, y: 166, t: 0.30, name: '努尔哈赤', lx: 254, ly: 160, anchor: 'start' },
      { type: 'host', side: 'ming', x: 228, y: 180, t: 0.02, name: '袁崇焕', lx: 228, ly: 194, anchor: 'middle' },
      { type: 'army', side: 'ming', x: 232, y: 170, t: 0.34, name: '守军', lx: 246, ly: 176, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '攻城受挫', seal: '拒敌',
    kicker: '阶段三 · 1626 年 正月',
    title: '后金军屡攻不克，转攻觉华岛',
    turn: '后金军屡攻宁远不克，努尔哈赤受伤（一说受挫）；后金军转攻觉华岛，明军水师覆没。',
    why: '宁远城坚炮利，后金军野战之长无从发挥；觉华岛虽破，却换不来宁远。',
    src: '《明史·袁崇焕传》；《清太祖实录》。努尔哈赤是否受伤有异说。',
    events: [
      { time: '1626·正月', who: '后金军', text: '屡攻宁远不克', t: 0.08 },
      { time: '1626·正月', who: '努尔哈赤', text: '攻城受挫', t: 0.34 },
      { time: '1626·正月', who: '后金军', text: '转攻觉华岛', t: 0.58, kind: 'flip', city: 'juehuadao' },
      { time: '1626·正月', who: '明军', text: '水师覆没', t: 0.84 }
    ],
    nums: [
      { label: '后金军', value: '号十三万', kind: '史载', n: null },
      { label: '明军', value: '无确载', kind: '无确载', n: null },
      { label: '宁远', value: '未克', kind: '史载', n: null }
    ],
    hold: { shenyang: 'houjin', jinzhou: 'houjin', ningyuan: 'contested', juehuadao: 'houjin', shanhaiguan: 'ming' },
    flips: { juehuadao: 0.58 },
    markers: [
      { type: 'host', side: 'houjin', x: 240, y: 166, t: 0.02, name: '努尔哈赤', lx: 254, ly: 160, anchor: 'start', weak: true },
      { type: 'host', side: 'ming', x: 228, y: 180, t: 0.30, name: '袁崇焕', lx: 214, ly: 186, anchor: 'end' },
      { type: 'army', side: 'houjin', x: 246, y: 204, t: 0.58, name: '后金军', lx: 260, ly: 198, anchor: 'start' }
    ],
    routes: [
      { d: 'M 240 176 C 244 188 248 198 250 208', side: 'houjin', t0: 0.52, t1: 0.88,
        label: '转攻觉华岛', lx: 232, ly: 196, anchor: 'end' }
    ]
  },
  {
    label: '努尔哈赤退兵', seal: '退兵',
    kicker: '阶段四 · 1626 年 二月',
    title: '努尔哈赤退兵，宁远解围',
    turn: '后金军撤围北还，宁远解围；努尔哈赤于同年八月病卒。此为明军对后金首次守城大捷。',
    why: '宁远大捷打破了后金军野战无敌的神话，证明凭坚城、用大炮可以遏制后金。',
    src: '《明史·袁崇焕传》《熹宗本纪》；《清太祖实录》。',
    events: [
      { time: '1626·二月', who: '后金军', text: '撤围北还', t: 0.08 },
      { time: '1626·二月', who: '宁远', text: '解围', t: 0.34, kind: 'flip', city: 'ningyuan' },
      { time: '1626·二月', who: '袁崇焕', text: '整军固守', t: 0.58 },
      { time: '1626·八月', who: '努尔哈赤', text: '病卒', t: 0.84 }
    ],
    nums: [
      { label: '后金军', value: '号十三万', kind: '史载', n: null },
      { label: '明军', value: '无确载', kind: '无确载', n: null },
      { label: '宁远', value: '解围', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { ningyuan: 0.34 },
    markers: [
      { type: 'host', side: 'ming', x: 228, y: 180, t: 0.30, name: '袁崇焕', lx: 228, ly: 194, anchor: 'middle' },
      { type: 'host', side: 'houjin', x: 284, y: 92, t: 0.58, name: '努尔哈赤', lx: 298, ly: 86, anchor: 'start', weak: true },
      { type: 'army', side: 'houjin', x: 256, y: 140, t: 0.20, name: '后金军', lx: 270, ly: 134, anchor: 'start' }
    ],
    routes: [
      { d: 'M 238 170 C 252 148 268 122 278 102', side: 'retreat', t0: 0.08, t1: 0.50,
        label: '后金北还', lx: 246, ly: 148, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 300 60 C 280 110 260 160 246 210 C 238 236 230 258 224 280', color: '#a8b6ab', width: 2 },
    { d: 'M 150 280 C 190 274 230 282 270 276 C 310 270 350 278 385 274', color: '#b6c3b6', width: 3 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 274, t: '渤　海', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '宁远·今辽宁兴城　锦州·今辽宁锦州　山海关·今河北秦皇岛山海关', size: 6.4, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '辽　西', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'ningyuan',
  title: '宁远之战',
  kicker: '沙 盘 推 演',
  subtitle: '锦州 · 宁远',
  years: '1626',
  yearUnit: 'AD',
  era: '明 · 天启六年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：宁远今辽宁兴城、锦州今辽宁锦州，非真实地理比例',
  hook: '袁崇焕凭城用红夷大炮，宁远却敌，努尔哈赤退兵',
  period: '明清',
  yearValue: 1626,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '明', b: '守', sub: '1626' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
