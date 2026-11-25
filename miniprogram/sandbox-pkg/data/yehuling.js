/**
 * 沙盘推演 · 野狐岭之战（1211）
 * 通行叙事：成吉思汗誓师南下伐金，金军号称四十万屯野狐岭；
 * 木华黎率敢死士冲击金军中坚，金军大溃，死者蔽野；蒙古军旋破居庸关，兵临中都。
 * 金军「号四十万」为史载；蒙古军兵力无确载。
 * 地名古今对照：野狐岭今河北万全、抚州今河北张北、居庸关今北京昌平西北。
 */
var COLOR = { meng: '#2b5262', jin: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'zhongdu',     name: '中都',   x: 280, y: 180, tx: 280, ty: 166, anchor: 'middle' },
  { id: 'juyongguan',  name: '居庸关', x: 262, y: 160, tx: 276, ty: 154, anchor: 'start' },
  { id: 'yehuling',    name: '野狐岭', x: 214, y: 150, tx: 200, ty: 144, anchor: 'end' },
  { id: 'fuzhou',      name: '抚州',   x: 206, y: 128, tx: 192, ty: 122, anchor: 'end' },
  { id: 'huanzhou',    name: '桓州',   x: 180, y: 96,  tx: 180, ty: 82,  anchor: 'middle' }
];

var BASE0 = { zhongdu: 'jin', juyongguan: 'jin', yehuling: 'jin', fuzhou: 'jin', huanzhou: 'jin' };
var BASE1 = { zhongdu: 'jin', juyongguan: 'jin', yehuling: 'jin', fuzhou: 'contested', huanzhou: 'jin' };
var BASE2 = { zhongdu: 'jin', juyongguan: 'jin', yehuling: 'contested', fuzhou: 'contested', huanzhou: 'jin' };
var BASE3 = { zhongdu: 'jin', juyongguan: 'jin', yehuling: 'meng', fuzhou: 'meng', huanzhou: 'jin' };
var BASE4 = { zhongdu: 'contested', juyongguan: 'meng', yehuling: 'meng', fuzhou: 'meng', huanzhou: 'jin' };

var STAGES = [
  {
    label: '蒙古南下', seal: '誓师',
    kicker: '阶段一 · 1211 年',
    title: '成吉思汗誓师南下伐金',
    turn: '成吉思汗于克鲁伦河誓师南征，蒙古军越金界壕，攻抚州；金廷遣军北上拒之。',
    why: '蒙古统一草原后，矛头直指金国；金军若不能在野狐岭挡住，中都便门户洞开。',
    src: '《元史·太祖本纪》；《金史·卫绍王纪》。',
    events: [
      { time: '1211', who: '成吉思汗', text: '誓师南征', t: 0.08 },
      { time: '1211', who: '蒙古军', text: '越金界壕，攻抚州', t: 0.34, kind: 'flip', city: 'fuzhou' },
      { time: '1211', who: '金廷', text: '遣军北上拒之', t: 0.58 },
      { time: '1211', who: '金军', text: '屯于野狐岭', t: 0.84 }
    ],
    nums: [
      { label: '金军', value: '号四十万', kind: '史载', n: null },
      { label: '蒙古军', value: '无确载', kind: '无确载', n: null },
      { label: '野狐岭', value: '要隘', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { fuzhou: 0.34 },
    markers: [
      { type: 'host', side: 'meng', x: 180, y: 96, t: 0.02, name: '成吉思汗', lx: 194, ly: 90, anchor: 'start' },
      { type: 'host', side: 'jin', x: 214, y: 150, t: 0.02, name: '完颜承裕', lx: 228, ly: 144, anchor: 'start' },
      { type: 'army', side: 'meng', x: 192, y: 112, t: 0.34, name: '蒙古军', lx: 178, ly: 108, anchor: 'end' }
    ],
    routes: [
      { d: 'M 184 102 C 194 116 204 132 210 146', side: 'meng', t0: 0.10, t1: 0.50,
        label: '蒙古南下', lx: 180, ly: 122, anchor: 'end' }
    ]
  },
  {
    label: '野狐岭列阵', seal: '对峙',
    kicker: '阶段二 · 1211 年',
    title: '两军对峙野狐岭',
    turn: '金军号称四十万，列阵野狐岭；蒙古军分兵据险，木华黎请以敢死士冲击金军中坚。',
    why: '金军虽众而号令不一，蒙古军若集中一点突破，可使其全线崩溃。',
    src: '《元史·木华黎传》；《金史·完颜承裕传》。',
    events: [
      { time: '1211', who: '金军', text: '号四十万，列阵野狐岭', t: 0.08 },
      { time: '1211', who: '蒙古军', text: '分兵据险', t: 0.34, kind: 'flip', city: 'yehuling' },
      { time: '1211', who: '木华黎', text: '请以敢死士冲其中坚', t: 0.58 },
      { time: '1211', who: '成吉思汗', text: '许之，全军备战', t: 0.84 }
    ],
    nums: [
      { label: '金军', value: '号四十万', kind: '史载', n: null },
      { label: '蒙古军', value: '无确载', kind: '无确载', n: null },
      { label: '野狐岭', value: '对峙', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { yehuling: 0.34 },
    markers: [
      { type: 'host', side: 'meng', x: 214, y: 150, t: 0.30, name: '成吉思汗', lx: 200, ly: 162, anchor: 'end' },
      { type: 'host', side: 'jin', x: 214, y: 150, t: 0.02, name: '完颜承裕', lx: 228, ly: 156, anchor: 'start', weak: true },
      { type: 'army', side: 'jin', x: 236, y: 162, t: 0.34, name: '金军', lx: 250, ly: 156, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '木华黎冲阵', seal: '决战',
    kicker: '阶段三 · 1211 年',
    title: '木华黎率敢死士冲阵，金军大溃',
    turn: '木华黎率敢死士冲击金军中坚，蒙古主力继进；金军阵势被撕开，全线崩溃，死者蔽野。',
    why: '金军虽众却首尾不能相顾，中坚一破便成溃败；野狐岭一战，金军主力尽丧。',
    src: '《元史·木华黎传》《太祖本纪》；《金史·完颜承裕传》。',
    events: [
      { time: '1211', who: '木华黎', text: '率敢死士冲击中坚', t: 0.08 },
      { time: '1211', who: '蒙古军', text: '主力继进', t: 0.34 },
      { time: '1211', who: '金军', text: '阵势被撕开，全线崩溃', t: 0.58, kind: 'flip', city: 'yehuling' },
      { time: '1211', who: '金军', text: '死者蔽野', t: 0.84 }
    ],
    nums: [
      { label: '金军', value: '号四十万', kind: '史载', n: null },
      { label: '蒙古军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '金军大溃', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { yehuling: 0.58 },
    sieges: [
      { x: 214, y: 150, t: 0.58, label: '金军溃', side: 'meng', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'meng', x: 214, y: 150, t: 0.30, name: '木华黎', lx: 200, ly: 144, anchor: 'end' },
      { type: 'host', side: 'jin', x: 214, y: 150, t: 0.02, name: '完颜承裕', lx: 228, ly: 138, anchor: 'start', weak: true },
      { type: 'army', side: 'meng', x: 200, y: 160, t: 0.34, name: '蒙古军', lx: 186, ly: 154, anchor: 'end' }
    ],
    routes: [
      { d: 'M 198 156 C 204 154 210 152 214 150', side: 'meng', t0: 0.28, t1: 0.60,
        label: '冲阵', lx: 198, ly: 168, anchor: 'end' }
    ]
  },
  {
    label: '兵临中都', seal: '临城',
    kicker: '阶段四 · 1211 年',
    title: '蒙古军破居庸关，兵临中都',
    turn: '蒙古军乘胜破居庸关，进逼中都；金廷震恐，河北州县多望风而降。',
    why: '野狐岭一败，金国北面防线瓦解；此后蒙古连年南侵，金室被迫迁都汴京。',
    src: '《元史·太祖本纪》；《金史·卫绍王纪》。',
    events: [
      { time: '1211', who: '蒙古军', text: '乘胜破居庸关', t: 0.08, kind: 'flip', city: 'juyongguan' },
      { time: '1211', who: '蒙古军', text: '进逼中都', t: 0.34, kind: 'flip', city: 'zhongdu' },
      { time: '1211', who: '金廷', text: '震恐', t: 0.58 },
      { time: '1211', who: '河北州县', text: '多望风而降', t: 0.84 }
    ],
    nums: [
      { label: '金军', value: '号四十万', kind: '史载', n: null },
      { label: '蒙古军', value: '无确载', kind: '无确载', n: null },
      { label: '中都', value: '被逼', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { juyongguan: 0.08, zhongdu: 0.34 },
    markers: [
      { type: 'host', side: 'meng', x: 280, y: 180, t: 0.34, name: '成吉思汗', lx: 266, ly: 192, anchor: 'end' },
      { type: 'host', side: 'jin', x: 280, y: 180, t: 0.02, name: '金廷', lx: 294, ly: 174, anchor: 'start', weak: true },
      { type: 'army', side: 'meng', x: 250, y: 166, t: 0.20, name: '蒙古军', lx: 236, ly: 160, anchor: 'end' }
    ],
    routes: [
      { d: 'M 218 154 C 236 158 256 166 272 176', side: 'meng', t0: 0.10, t1: 0.46,
        label: '兵临中都', lx: 242, ly: 154, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 40 60 C 70 120 100 180 130 240', color: '#a8b6ab', width: 2 },
    { d: 'M -10 210 C 70 206 140 214 210 208 C 280 202 340 208 385 204', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 120 60 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 290 70 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 80 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 30, y: 204, t: '洋　河', size: 8.5, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '野狐岭·今河北万全　抚州·今河北张北　居庸关·今北京昌平西北', size: 6.6, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '塞　北', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'yehuling',
  title: '野狐岭之战',
  kicker: '沙 盘 推 演',
  subtitle: '抚州 · 野狐岭',
  years: '1211',
  yearUnit: 'AD',
  era: '蒙古 · 太祖六年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：野狐岭今河北万全、抚州今河北张北，非真实地理比例',
  hook: '木华黎冲阵，蒙古军野狐岭大破金军四十万，旋兵临中都',
  period: '蒙金',
  yearValue: 1211,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '蒙古', b: '胜', sub: '1211' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
