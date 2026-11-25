/**
 * 沙盘推演 · 乌兰布通之战（1690）
 * 通行叙事：噶尔丹率准噶尔军东侵，深入漠南；康熙帝亲征，清军与准军战于乌兰布通；
 * 准军以驼城据守，清军以火炮破之，噶尔丹败走。
 * 双方兵力无确载；「驼城」「康熙亲征」为史载。
 * 地名古今对照：乌兰布通今内蒙古克什克腾旗南、多伦今内蒙古多伦、归化今内蒙古呼和浩特。
 */
var COLOR = { qing: '#2b5262', zhun: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'beijing',     name: '北京',   x: 306, y: 148, tx: 320, ty: 142, anchor: 'start' },
  { id: 'zhangjiakou', name: '张家口', x: 270, y: 132, tx: 256, ty: 126, anchor: 'end' },
  { id: 'wulanbutong', name: '乌兰布通', x: 232, y: 176, tx: 232, ty: 162, anchor: 'middle' },
  { id: 'duolun',      name: '多伦',   x: 214, y: 112, tx: 200, ty: 106, anchor: 'end' },
  { id: 'guihua',      name: '归化',   x: 170, y: 140, tx: 156, ty: 134, anchor: 'end' }
];

var BASE0 = { beijing: 'qing', zhangjiakou: 'qing', wulanbutong: 'zhun', duolun: 'zhun', guihua: 'qing' };
var BASE1 = { beijing: 'qing', zhangjiakou: 'qing', wulanbutong: 'zhun', duolun: 'zhun', guihua: 'contested' };
var BASE2 = { beijing: 'qing', zhangjiakou: 'qing', wulanbutong: 'contested', duolun: 'contested', guihua: 'contested' };
var BASE3 = { beijing: 'qing', zhangjiakou: 'qing', wulanbutong: 'qing', duolun: 'qing', guihua: 'contested' };
var BASE4 = { beijing: 'qing', zhangjiakou: 'qing', wulanbutong: 'qing', duolun: 'qing', guihua: 'qing' };

var STAGES = [
  {
    label: '噶尔丹东侵', seal: '东侵',
    kicker: '阶段一 · 1690 年',
    title: '噶尔丹率准军东侵漠南',
    turn: '噶尔丹率准噶尔军越漠东侵，攻掠喀尔喀诸部，兵锋逼近归化；清廷震动。',
    why: '准噶尔若控制漠南，便可直接威胁京师；康熙决定亲征，把战场推到塞外。',
    src: '《清史稿·圣祖本纪》《噶尔丹传》。',
    events: [
      { time: '1690', who: '噶尔丹', text: '率准军东侵', t: 0.08 },
      { time: '1690', who: '准军', text: '攻掠喀尔喀诸部', t: 0.34 },
      { time: '1690', who: '准军', text: '兵锋逼近归化', t: 0.58, kind: 'flip', city: 'guihua' },
      { time: '1690', who: '康熙', text: '决意亲征', t: 0.84 }
    ],
    nums: [
      { label: '准军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '康熙', value: '亲征', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { guihua: 0.58 },
    markers: [
      { type: 'host', side: 'zhun', x: 214, y: 112, t: 0.02, name: '噶尔丹', lx: 200, ly: 106, anchor: 'end' },
      { type: 'host', side: 'qing', x: 306, y: 148, t: 0.02, name: '康熙', lx: 320, ly: 142, anchor: 'start' },
      { type: 'army', side: 'zhun', x: 194, y: 128, t: 0.34, name: '准军', lx: 180, ly: 122, anchor: 'end' }
    ],
    routes: [
      { d: 'M 208 118 C 200 126 192 134 186 140', side: 'zhun', t0: 0.10, t1: 0.54,
        label: '准军东侵', lx: 196, ly: 116, anchor: 'end' }
    ]
  },
  {
    label: '清军出塞', seal: '亲征',
    kicker: '阶段二 · 1690 年 八月',
    title: '康熙亲征，清军出塞迎击',
    turn: '康熙帝亲率清军出塞，分道迎击准军；噶尔丹退据乌兰布通，以驼城结阵自守。',
    why: '准军骑兵善于野战，噶尔丹却选择据险结阵；这给了清军火炮发挥的机会。',
    src: '《清史稿·圣祖本纪》《费扬古传》。',
    events: [
      { time: '1690·八月', who: '康熙', text: '亲率清军出塞', t: 0.08 },
      { time: '1690·八月', who: '清军', text: '分道迎击', t: 0.34 },
      { time: '1690·八月', who: '噶尔丹', text: '退据乌兰布通', t: 0.58, kind: 'flip', city: 'wulanbutong' },
      { time: '1690·八月', who: '准军', text: '以驼城结阵', t: 0.84 }
    ],
    nums: [
      { label: '准军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '驼城', value: '据守', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { wulanbutong: 0.58, duolun: 0.58 },
    markers: [
      { type: 'host', side: 'qing', x: 270, y: 132, t: 0.30, name: '康熙', lx: 256, ly: 126, anchor: 'end' },
      { type: 'host', side: 'zhun', x: 232, y: 176, t: 0.02, name: '噶尔丹', lx: 246, ly: 170, anchor: 'start' },
      { type: 'army', side: 'zhun', x: 222, y: 158, t: 0.34, name: '准军', lx: 208, ly: 152, anchor: 'end' }
    ],
    routes: [
      { d: 'M 266 138 C 254 152 244 164 238 172', side: 'qing', t0: 0.10, t1: 0.54,
        label: '清军出塞', lx: 262, ly: 152, anchor: 'end' }
    ]
  },
  {
    label: '驼城之战', seal: '决战',
    kicker: '阶段三 · 1690 年 八月',
    title: '清军以火炮破驼城',
    turn: '清军以火炮轰击准军驼城，骆驼惊散，阵势大乱；清军步骑乘势冲击，准军大败。',
    why: '驼城本为拒马之阵，遇上火炮便成活靶；准军赖以自守的阵形反成了累赘。',
    src: '《清史稿·圣祖本纪》《费扬古传》；《亲征平定朔漠方略》。',
    events: [
      { time: '1690·八月', who: '清军', text: '以火炮轰击驼城', t: 0.08 },
      { time: '1690·八月', who: '准军', text: '骆驼惊散，阵势大乱', t: 0.34 },
      { time: '1690·八月', who: '清军', text: '步骑乘势冲击', t: 0.58 },
      { time: '1690·八月', who: '准军', text: '大败', t: 0.84, kind: 'flip', city: 'wulanbutong' }
    ],
    nums: [
      { label: '准军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '驼城', value: '被破', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { wulanbutong: 0.84 },
    sieges: [
      { x: 232, y: 176, t: 0.84, label: '驼城破', side: 'qing', lx: 12, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'qing', x: 232, y: 176, t: 0.30, name: '康熙', lx: 246, ly: 170, anchor: 'start' },
      { type: 'host', side: 'zhun', x: 232, y: 176, t: 0.02, name: '噶尔丹', lx: 218, ly: 182, anchor: 'end', weak: true },
      { type: 'army', side: 'qing', x: 244, y: 164, t: 0.34, name: '清军', lx: 258, ly: 158, anchor: 'start' }
    ],
    routes: [
      { d: 'M 240 170 C 238 172 236 174 234 176', side: 'qing', t0: 0.10, t1: 0.52,
        label: '炮击', lx: 250, ly: 174, anchor: 'start' }
    ]
  },
  {
    label: '噶尔丹败走', seal: '败走',
    kicker: '阶段四 · 1690 年 九月',
    title: '噶尔丹败走，清军收复漠南',
    turn: '噶尔丹率残部西走，清军收复漠南诸地；噶尔丹遣使请罪，清廷暂许其退。',
    why: '乌兰布通一战遏制了准噶尔东进的势头，但噶尔丹主力未灭，此后仍有昭莫多之战。',
    src: '《清史稿·圣祖本纪》《噶尔丹传》。',
    events: [
      { time: '1690·九月', who: '噶尔丹', text: '率残部西走', t: 0.08 },
      { time: '1690·九月', who: '清军', text: '收复漠南诸地', t: 0.34, kind: 'flip', city: 'guihua' },
      { time: '1690·九月', who: '噶尔丹', text: '遣使请罪', t: 0.58 },
      { time: '1690·九月', who: '清廷', text: '暂许其退', t: 0.84 }
    ],
    nums: [
      { label: '准军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '噶尔丹', value: '败走', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { guihua: 0.34 },
    markers: [
      { type: 'host', side: 'qing', x: 170, y: 140, t: 0.30, name: '康熙', lx: 184, ly: 134, anchor: 'start' },
      { type: 'host', side: 'zhun', x: 214, y: 112, t: 0.02, name: '噶尔丹', lx: 200, ly: 106, anchor: 'end', weak: true },
      { type: 'army', side: 'zhun', x: 192, y: 126, t: 0.20, name: '准军', lx: 178, ly: 120, anchor: 'end' }
    ],
    routes: [
      { d: 'M 226 150 C 220 138 216 126 214 118', side: 'retreat', t0: 0.08, t1: 0.50,
        label: '准军西走', lx: 234, ly: 136, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 120 60 C 160 100 200 140 240 180 C 280 220 320 250 360 280', color: '#a8b6ab', width: 2.2 },
    { d: 'M -10 220 C 60 214 120 222 180 216 C 240 210 300 218 385 214', color: '#b6c3b6', width: 2.4 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 216, t: '大漠', size: 9, color: '#46594f', ls: 4, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '乌兰布通·今内蒙古克什克腾旗南　多伦·今内蒙古多伦　归化·今内蒙古呼和浩特', size: 6.0, color: '#7d6647', ls: 0.3 },
    { x: 24, y: 366, t: '漠　南', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'wulanbutong',
  title: '乌兰布通之战',
  kicker: '沙 盘 推 演',
  subtitle: '多伦 · 乌兰布通',
  years: '1690',
  yearUnit: 'AD',
  era: '清 · 康熙二十九年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：乌兰布通今内蒙古克什克腾旗南、多伦今内蒙古多伦，非真实地理比例',
  hook: '康熙亲征，清军火炮破驼城，噶尔丹乌兰布通败走',
  period: '清',
  yearValue: 1690,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '清', b: '胜', sub: '1690' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
