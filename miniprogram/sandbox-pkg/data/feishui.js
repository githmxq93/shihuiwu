/**
 * 沙盘推演 · 淝水之战（383）
 * 通行叙事：苻坚大举南下、洛涧破梁成、淝水决战、风声鹤唳北溃。
 * 前秦「号百万」为史载，实至前线三十万为推算；东晋八万、刘牢之五千、
 * 梁成五万均为史载；无可靠数字者标「无确载」，不作估算。
 */
var COLOR = { qin: '#6f3a22', jin: '#2b5262', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'changan',    name: '长安', x: 52,  y: 84,  tx: 52,  ty: 70,  anchor: 'middle' },
  { id: 'luoyang',    name: '洛阳', x: 150, y: 108, tx: 150, ty: 94,  anchor: 'middle' },
  { id: 'xiangcheng', name: '项城', x: 208, y: 168, tx: 196, ty: 170, anchor: 'end' },
  { id: 'shouyang',   name: '寿阳', x: 268, y: 196, tx: 282, ty: 192, anchor: 'start' },
  { id: 'luojian',    name: '洛涧', x: 232, y: 246, tx: 220, ty: 256, anchor: 'end' },
  { id: 'jiankang',   name: '建康', x: 306, y: 320, tx: 306, ty: 334, anchor: 'middle' }
];

var BASE1 = { changan: 'qin', luoyang: 'qin', xiangcheng: 'qin', shouyang: 'qin', luojian: 'qin', jiankang: 'jin' };
var BASE2 = { changan: 'qin', luoyang: 'qin', xiangcheng: 'qin', shouyang: 'qin', luojian: 'jin', jiankang: 'jin' };
var BASE3 = { changan: 'qin', luoyang: 'qin', xiangcheng: 'qin', shouyang: 'jin', luojian: 'jin', jiankang: 'jin' };
var BASE4 = { changan: 'qin', luoyang: 'qin', xiangcheng: 'qin', shouyang: 'jin', luojian: 'jin', jiankang: 'jin' };

var STAGES = [
  {
    label: '苻坚南下', seal: '南下',
    kicker: '阶段一 · 383 年 七月—十月',
    title: '苻坚大举南下，晋军八万拒之',
    turn: '苻坚下诏大举，民每十丁遣一兵，众号百万；苻融率三十万先至颍口，苻坚自项城进至寿阳。晋以谢石为征讨大都督，谢玄率北府兵八万沿淮拒守。',
    why: '前秦以绝对兵力压境，意在趁势渡江灭晋；东晋兵力悬殊，只能依托淮、淝水一线，在局部寻找破敌之机。',
    src: '《晋书·苻坚载记》《谢玄传》；《资治通鉴》卷一〇五。百万为号，实至前线三十万为推算。',
    events: [
      { time: '383·七月', who: '苻坚', text: '下诏大举，民十丁遣一兵', t: 0.06 },
      { time: '383·八月', who: '苻融', text: '率三十万先至颍口', t: 0.30 },
      { time: '383·十月', who: '苻坚', text: '自项城进至寿阳', t: 0.58 },
      { time: '383·十月', who: '谢玄', text: '率北府兵八万沿淮拒守', t: 0.82 }
    ],
    nums: [
      { label: '前秦军', value: '号百万', kind: '史载', n: 100 },
      { label: '前秦前锋', value: '约三十万', kind: '推算', n: 30 },
      { label: '东晋军', value: '八万', kind: '史载', n: 8 }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'qin', x: 208, y: 168, t: 0.02, name: '苻坚', lx: 194, ly: 180, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'qin', x: 262, y: 192, t: 0.34, name: '苻融', lx: 252, ly: 182, anchor: 'end' },
      { type: 'host', side: 'jin', x: 306, y: 320, t: 0.78, name: '谢玄', lx: 292, ly: 330, anchor: 'end' }
    ],
    routes: [
      { d: 'M 156 112 C 176 132 192 150 204 164', side: 'qin', t0: 0.26, t1: 0.48,
        label: '苻融东进', lx: 160, ly: 148, anchor: 'start' },
      { d: 'M 212 170 C 232 180 250 190 264 194', side: 'qin', t0: 0.52, t1: 0.74,
        label: '苻坚至寿阳', lx: 236, ly: 210, anchor: 'middle' },
      { d: 'M 302 314 C 296 288 290 260 284 226', side: 'jin', t0: 0.78, t1: 0.96,
        label: '晋军北上', lx: 300, ly: 286, anchor: 'end' }
    ]
  },
  {
    label: '洛涧之战', seal: '洛涧',
    kicker: '阶段二 · 383 年 十一月',
    title: '洛涧之战，刘牢之破梁成',
    turn: '苻融据寿阳，梁成率五万屯洛涧，栅淮以遏晋军；谢玄遣刘牢之率北府兵五千夜袭，斩梁成，秦军溃，晋军水陆并进。',
    why: '洛涧一破，秦军淮河防线出现缺口，晋军得以推进至淝水东岸；更重要的是，秦军不可战胜的心理被打破。',
    src: '《晋书·刘牢之传》《谢玄传》；《资治通鉴》卷一〇五。五千、五万均为史载。',
    events: [
      { time: '383·十一月', who: '苻融', text: '据寿阳，晋军退守淝水东岸', t: 0.06 },
      { time: '383·十一月', who: '梁成', text: '率五万屯洛涧，栅淮', t: 0.30 },
      { time: '383·十一月', who: '刘牢之', text: '率五千夜袭洛涧，斩梁成', t: 0.54, kind: 'flip', city: 'luojian' },
      { time: '383·十一月', who: '谢石·谢玄', text: '水陆并进，至淝水', t: 0.82 }
    ],
    nums: [
      { label: '刘牢之部', value: '五千', kind: '史载', n: 5 },
      { label: '梁成军', value: '五万', kind: '史载', n: 50 },
      { label: '秦军后续', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE2,
    sieges: [
      { x: 232, y: 246, t: 0.52, label: '洛涧破', side: 'jin', lx: -8, ly: 12, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 268, y: 196, t: 0.02, name: '苻融', lx: 282, ly: 180, anchor: 'start' },
      { type: 'army', side: 'qin', x: 234, y: 244, t: 0.26, name: '梁成', lx: 216, ly: 232, anchor: 'end', weak: true },
      { type: 'host', side: 'jin', x: 286, y: 232, t: 0.44, name: '刘牢之', lx: 302, ly: 252, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'jin', x: 290, y: 214, t: 0.80, name: '谢玄', lx: 306, ly: 228, anchor: 'start' }
    ],
    routes: [
      { d: 'M 270 202 C 260 218 250 232 240 244', side: 'qin', t0: 0.22, t1: 0.40,
        label: '梁成屯洛涧', lx: 252, ly: 212, anchor: 'end' },
      { d: 'M 288 228 C 272 236 254 242 240 246', side: 'jin', t0: 0.44, t1: 0.66,
        label: '夜袭洛涧', lx: 262, ly: 258, anchor: 'middle' }
    ]
  },
  {
    label: '淝水决战', seal: '决战',
    kicker: '阶段三 · 383 年 十一月',
    title: '淝水决战，秦军自溃',
    turn: '苻坚登寿阳城望八公山，草木皆兵；晋军请秦军稍退，欲渡水决战，苻坚欲半渡而击，遂麾军后撤；朱序在阵后大呼「秦兵败矣」，秦军奔溃，苻融死于乱军。',
    why: '后撤令在庞大而杂糅的秦军中失控，一退即成溃；晋军趁势渡水冲击，兵力优势反成自相践踏的负担。',
    src: '《晋书·苻坚载记》《谢玄传》《朱序传》；《资治通鉴》卷一〇五。',
    events: [
      { time: '383·十一月', who: '苻坚', text: '登寿阳城，望八公山草木皆兵', t: 0.06 },
      { time: '383·十一月', who: '谢玄', text: '请秦军稍退，晋军渡水', t: 0.30 },
      { time: '383·十一月', who: '苻坚', text: '麾军后撤，阵脚自乱', t: 0.52 },
      { time: '383·十一月', who: '朱序', text: '阵后大呼「秦兵败矣」', t: 0.66 },
      { time: '383·十一月', who: '苻融', text: '死于乱军，秦军大溃', t: 0.84, kind: 'flip', city: 'shouyang' }
    ],
    nums: [
      { label: '晋军渡水', value: '八万', kind: '史载', n: 8 },
      { label: '前秦军', value: '约三十万', kind: '推算', n: 30 },
      { label: '秦军溃散', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE3,
    markers: [
      { type: 'host', side: 'qin', x: 268, y: 196, t: 0.02, name: '苻坚', lx: 282, ly: 184, anchor: 'start' },
      { type: 'host', side: 'qin', x: 246, y: 214, t: 0.02, name: '苻融', lx: 232, ly: 206, anchor: 'end' },
      { type: 'host', side: 'jin', x: 294, y: 230, t: 0.28, name: '谢玄', lx: 308, ly: 246, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'qin', x: 240, y: 222, t: 0.60, name: '秦军', lx: 224, ly: 228, anchor: 'end', weak: true, moveRef: 1 }
    ],
    routes: [
      { d: 'M 292 230 C 276 224 260 218 250 214', side: 'jin', t0: 0.32, t1: 0.60,
        label: '晋军渡水', lx: 280, ly: 226, anchor: 'start' },
      { d: 'M 242 218 C 214 226 184 234 152 236', side: 'retreat', t0: 0.56, t1: 0.90,
        label: '秦军奔溃', lx: 178, ly: 252, anchor: 'middle' }
    ]
  },
  {
    label: '风声鹤唳', seal: '北溃',
    kicker: '阶段四 · 383 年 十一月—十二月',
    title: '风声鹤唳，前秦瓦解',
    turn: '苻坚中流矢，单骑走至淮北，闻风声鹤唳皆以为晋兵；前秦诸军相继溃散，慕容垂、姚苌等各据一方，前秦由盛转衰。',
    why: '淝水之败不只是军事失利，它使前秦内部的鲜卑、羌等势力失去威慑，北方统一随即瓦解。',
    src: '《晋书·苻坚载记》《慕容垂载记》《姚苌载记》；《资治通鉴》卷一〇五—一〇六。',
    events: [
      { time: '383·十一月', who: '苻坚', text: '中流矢，单骑走淮北', t: 0.08 },
      { time: '383·十一月', who: '秦军', text: '闻风声鹤唳，昼夜奔溃', t: 0.32 },
      { time: '383·十二月', who: '慕容垂', text: '还河北，自成势力', t: 0.58 },
      { time: '383·十二月', who: '姚苌', text: '据关中，前秦瓦解', t: 0.82 }
    ],
    nums: [
      { label: '苻坚脱身', value: '单骑', kind: '史载', n: null },
      { label: '秦军溃兵', value: '无确载', kind: '无确载', n: null },
      { label: '晋军缴获', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE4,
    sieges: [
      { x: 268, y: 196, t: 0.72, label: '复寿阳', side: 'jin', lx: 0, ly: -12, anchor: 'middle' }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 246, y: 214, t: 0.02, name: '苻坚', lx: 232, ly: 204, anchor: 'end', weak: true, moveRef: 0 },
      { type: 'host', side: 'jin', x: 282, y: 206, t: 0.60, name: '谢玄', lx: 302, ly: 196, anchor: 'start', moveRef: 2 }
    ],
    routes: [
      { d: 'M 244 212 C 212 198 180 174 156 146', side: 'retreat', t0: 0.10, t1: 0.48,
        label: '苻坚北走', lx: 216, ly: 186, anchor: 'start' },
      { d: 'M 238 220 C 198 240 156 246 112 238', side: 'retreat', t0: 0.26, t1: 0.66,
        label: '秦军溃散', lx: 168, ly: 244, anchor: 'middle' },
      { d: 'M 292 224 C 284 216 276 208 270 202', side: 'jin', t0: 0.62, t1: 0.84,
        label: '收复寿阳', lx: 300, ly: 232, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE1;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 216 C 60 210 120 220 180 214 C 240 208 300 200 385 206', color: '#a8b6ab', width: 3 },
    { d: 'M 310 136 C 292 184 272 230 250 282', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 232 166 l12 -14 l9 10 l11 -13', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 248 178 l10 -11 l8 8 l10 -11', color: '#c8b494', width: 1.1, opacity: 0.7 },
    { d: 'M 44 286 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 300 296 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 26, y: 148, t: '淮　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 296, y: 262, t: '淝　水', size: 9, color: '#46594f', ls: 2, serif: true, rotate: 24 },
    { x: 230, y: 154, t: '八 公 山', size: 8.5, color: '#7d6647', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 366, t: '淮 南', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'feishui',
  title: '淝水之战',
  kicker: '沙 盘 推 演',
  subtitle: '淮水 · 淝水',
  years: '383',
  yearUnit: 'AD',
  era: '东晋 · 太元八年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝溃退',
  note: '示意沙盘：仅保留关键城池与行军线，非真实地理比例',
  hook: '前秦号百万南下，八万北府兵渡淝水，风声鹤唳',
  period: '东晋',
  yearValue: 383,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: null
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
