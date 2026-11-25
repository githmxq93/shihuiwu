/**
 * 沙盘推演 · 赤壁之战（数据层）
 *
 * 内容基准：原型 `_design/chibi/b-ink.html`（水墨战图版）。
 * 四阶段划分、事件时间与人物、兵力三档标注与出处、火攻与北撤表现均照原型保留；
 * 数字未改写、未新增。地图为示意图，方位与距离按原型简化。
 *
 * 结构与 data/anshi.js 完全一致，渲染层与页面不区分战役。
 */

var COLOR = { enemy: '#6f3a22', ally: '#2b5262', fire: '#b2311c', retreat: '#6d655a' };

// 示意图地点：坐标为 375 × 380 逻辑坐标，与 terrain 共用同一坐标系
// cityMode 为 neutral：地点只作定位，不表现控制方与易手
var CITY_DEFS = [
  { id: 'jiangling', name: '江陵', x: 48,  y: 150, tx: 40,  ty: 153, anchor: 'end' },
  { id: 'wulin',     name: '乌林', x: 204, y: 194, tx: 204, ty: 181, anchor: 'middle' },
  { id: 'chibi',     name: '赤壁', x: 238, y: 276, tx: 238, ty: 292, anchor: 'middle' },
  { id: 'fankou',    name: '樊口', x: 300, y: 214, tx: 300, ty: 201, anchor: 'middle' },
  { id: 'chaisang',  name: '柴桑', x: 332, y: 300, tx: 332, ty: 316, anchor: 'middle' }
];

var STAGES = [
  {
    label: '南下取荆州', seal: '南下',
    kicker: '阶段一 · 建安十三年 七月—十二月',
    title: '曹操南下取荆州',
    turn: '刘琮不战而降，曹操兵不血刃得荆州水军与战船，遂顺江东下，直指夏口。',
    why: '得荆州水军与江陵军实，曹操取得顺江东下之势；孙刘失去上游屏障，只能在夏口—樊口一线仓促结盟。',
    src: '《三国志·武帝纪》《先主传》；《资治通鉴》卷六十五。兵力取整，含学界争议。',
    events: [
      { time: '七月', who: '曹操', text: '自许都南征刘表', t: 0.08 },
      { time: '八月', who: '刘琮', text: '刘表卒，举襄阳降', t: 0.36 },
      { time: '九月', who: '曹操', text: '至新野，收荆州水军', t: 0.62 },
      { time: '九月', who: '刘备', text: '当阳长坂败走', t: 0.85 }
    ],
    nums: [
      { label: '曹军总兵力', value: '号称八十余万', kind: '史载', n: 80 },
      { label: '实际投入', value: '约二十余万', kind: '推算', n: 20 },
      { label: '孙刘联军', value: '尚未集结', kind: '—', n: 0, barW: 0 }
    ],
    markers: [
      { type: 'army', side: 'enemy', x: 48,  y: 150, t: 0.02, name: '曹军陆师', lx: 62,  ly: 148, anchor: 'start', moveRef: 0 },
      { type: 'navy', side: 'enemy', x: 104, y: 192, t: 0.46, name: '荆州水军', lx: 104, ly: 205, anchor: 'middle' }
    ],
    routes: [
      { d: 'M 88 -6 C 78 44 58 104 48 146', side: 'enemy', t0: 0.02, t1: 0.3,
        label: '曹军自许都南下', lx: 98, ly: 42, anchor: 'start' },
      { d: 'M 50 152 C 106 168 160 190 200 194', side: 'enemy', t0: 0.48, t1: 0.86,
        label: '顺江东下', lx: 126, ly: 172, anchor: 'middle' }
    ]
  },
  {
    label: '联军集结', seal: '结盟',
    kicker: '阶段二 · 建安十三年 十月—十一月',
    title: '孙刘联军集结',
    turn: '鲁肃、诸葛亮促成孙刘结盟；周瑜、程普各领万人西上，与刘备会于樊口，逆江迎击。',
    why: '两支弱旅合为约五万人的联军，并抢先占据赤壁—乌林江段；曹操失去各个击破的窗口，被迫以不习水战的北方兵决战。',
    src: '《三国志·周瑜传》《先主传》《诸葛亮传》；《资治通鉴》卷六十五。联军数由周瑜请三万与刘备部约二万合推。',
    events: [
      { time: '十月', who: '鲁肃', text: '当阳迎刘备，议结盟', t: 0.08 },
      { time: '十月', who: '诸葛亮', text: '随肃使吴，说孙权', t: 0.30 },
      { time: '十一月', who: '周瑜·程普', text: '各领万人西上', t: 0.55 },
      { time: '十一月', who: '周瑜', text: '会刘备于樊口', t: 0.80 }
    ],
    nums: [
      { label: '孙刘联军', value: '约五万', kind: '史载', n: 5 },
      { label: '曹军前线', value: '约二十余万', kind: '推算', n: 20 },
      { label: '曹军号称', value: '八十余万', kind: '史载', n: 80 }
    ],
    markers: [
      { type: 'army', side: 'enemy', x: 224, y: 186, t: 0.02, name: '曹军步骑', lx: 238, ly: 184, anchor: 'start' },
      { type: 'navy', side: 'enemy', x: 186, y: 202, t: 0.06, name: '曹军水军', lx: 172, ly: 211, anchor: 'end' },
      { type: 'navy', side: 'ally',  x: 332, y: 300, t: 0.02, tOut: 0.2, name: '周瑜水军', lx: 332, ly: 287, anchor: 'middle' },
      { type: 'army', side: 'ally',  x: 276, y: 240, t: 0.02, name: '刘备部', lx: 262, ly: 254, anchor: 'middle', moveRef: 0 },
      { type: 'navy', side: 'ally',  x: 306, y: 232, t: 0.16, name: '周瑜水军', lx: 318, ly: 236, anchor: 'start', moveRef: 1 }
    ],
    routes: [
      { d: 'M 68 322 C 136 316 204 284 262 246', side: 'ally', t0: 0.02, t1: 0.36,
        label: '刘备部东撤', lx: 78, ly: 334, anchor: 'start' },
      { d: 'M 330 294 C 322 272 314 248 307 233', side: 'ally', t0: 0.16, t1: 0.52 },
      { d: 'M 300 222 C 292 244 268 264 242 272', side: 'ally', t0: 0.58, t1: 0.92 }
    ]
  },
  {
    label: '火攻', seal: '火攻',
    kicker: '阶段三 · 建安十三年 十二月',
    title: '黄盖诈降火攻',
    turn: '东南风急，黄盖以十艘蒙冲载薪草膏油诈降，火烈风猛，延烧曹军岸上营落。',
    why: '一夜之间火借东南风延烧船阵与岸营，曹军水军主力与补给同毁；兵力优势在水战和火势前失效，攻守就此逆转。',
    src: '《三国志·周瑜传》（蒙冲斗舰十艘）；《资治通鉴》卷六十五。曹军船数史无确载。',
    events: [
      { time: '十二月', who: '黄盖', text: '献火攻计，遣书诈降', t: 0.08 },
      { time: '十二月', who: '黄盖', text: '十艘蒙冲举帆俱前', t: 0.35 },
      { time: '十二月', who: '风势', text: '东南风急，延烧岸营', t: 0.62 },
      { time: '十二月', who: '周瑜', text: '率轻锐继进', t: 0.85 }
    ],
    nums: [
      { label: '黄盖火船', value: '十艘', kind: '史载', n: null, barW: 0 },
      { label: '联军主力', value: '约五万', kind: '史载', n: 5 },
      { label: '曹军船阵', value: '数目无确载', kind: '—', n: null, barW: 0 }
    ],
    markers: [
      { type: 'fleet', side: 'enemy', x: 208, y: 200, t: 0.02 },
      { type: 'army',  side: 'enemy', x: 236, y: 182, t: 0.06, name: '岸上营落', lx: 250, ly: 180, anchor: 'start' },
      { type: 'navy',  side: 'ally',  x: 238, y: 266, t: 0.12, name: '黄盖火船', lx: 252, ly: 270, anchor: 'start', moveRef: 0, moveEnd: 0.92 },
      { type: 'army',  side: 'ally',  x: 196, y: 292, t: 0.42, name: '联军主力', lx: 196, ly: 306, anchor: 'middle' }
    ],
    routes: [
      { d: 'M 244 262 C 250 240 236 218 216 204', side: 'fire', t0: 0.12, t1: 0.58,
        label: '黄盖诈降 · 火船冲阵', lx: 268, ly: 230, anchor: 'start' },
      { d: 'M 226 280 C 220 254 214 228 208 206', side: 'ally', t0: 0.64, t1: 0.96,
        label: '周瑜继进', lx: 196, ly: 246, anchor: 'end' }
    ],
    fires: [
      { x: 206, y: 199, t: 0.54, r: 28 },
      { x: 221, y: 194, t: 0.63, r: 21 },
      { x: 194, y: 206, t: 0.71, r: 20 },
      { x: 231, y: 201, t: 0.79, r: 24 }
    ],
    wind: true,
    burn: true
  },
  {
    label: '北撤', seal: '北撤',
    kicker: '阶段四 · 建安十三年 十二月',
    title: '曹军北撤',
    turn: '曹操烧余船引退，取道华容泥泞，士卒饥疫死者过半；留曹仁守江陵，自还北方。',
    why: '曹军北还、只留曹仁守江陵，荆州战线由攻转守；孙刘由求生转为争夺荆州，南北对峙的格局自此成形。',
    src: '《三国志·武帝纪》裴注引《山阳公载记》《吴主传》；《资治通鉴》卷六十五。「死者过半」为史载概述。',
    events: [
      { time: '十二月', who: '曹操', text: '烧余船，走华容道', t: 0.08 },
      { time: '十二月', who: '曹军', text: '泥泞饥疫，死者过半', t: 0.35 },
      { time: '十二月', who: '周瑜·刘备', text: '追至南郡', t: 0.60 },
      { time: '十二月', who: '曹仁', text: '留守江陵', t: 0.85 }
    ],
    nums: [
      { label: '曹军伤亡', value: '死者过半', kind: '史载', n: 10 },
      { label: '联军追击', value: '数万', kind: '推算', n: 3 },
      { label: '江陵守军', value: '曹仁留守', kind: '史载', n: null, barW: 0 }
    ],
    markers: [
      { type: 'navy', side: 'enemy', x: 204, y: 202, t: 0.02, weak: true },
      { type: 'navy', side: 'ally',  x: 250, y: 250, t: 0.28, name: '周瑜水军', lx: 264, ly: 254, anchor: 'start', moveRef: 1, moveEnd: 0.95 },
      { type: 'army', side: 'enemy', x: 48,  y: 150, t: 0.72, name: '曹仁守江陵', lx: 62, ly: 148, anchor: 'start' }
    ],
    routes: [
      { d: 'M 196 202 C 166 216 132 204 104 186 C 80 170 60 158 50 152', side: 'retreat', t0: 0.05, t1: 0.54,
        label: '华容道 · 泥泞难行', lx: 112, ly: 176, anchor: 'start' },
      { d: 'M 250 244 C 238 230 224 214 210 204', side: 'ally', t0: 0.28, t1: 0.62,
        label: '周瑜追击', lx: 252, ly: 232, anchor: 'start' },
      { d: 'M 46 148 C 34 118 20 96 6 74', side: 'retreat', t0: 0.62, t1: 0.94,
        label: '曹操北还', lx: 30, ly: 92, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = {};

/**
 * 静态地形（375 × 380 逻辑坐标）
 * 北岸 / 南岸 / 长江与淡墨山形，照 b-ink.html 底图。
 */
var TERRAIN = {
  fills: [
    { d: 'M-10 206 C 50 196 92 246 164 236 C 232 226 288 182 385 172 L385 -10 L-10 -10 Z', grad: 'bankN' },
    { d: 'M-10 206 C 50 196 92 246 164 236 C 232 226 288 182 385 172 L385 392 L-10 392 Z', grad: 'bankS' }
  ],
  strokes: [
    { d: 'M-10 206 C 50 196 92 246 164 236 C 232 226 288 182 385 172', color: '#c2d1cc', width: 31 },
    { d: 'M-10 206 C 50 196 92 246 164 236 C 232 226 288 182 385 172', grad: 'riverG', width: 27 }
  ],
  lines: [
    { d: 'M106 112 l13 -14 l9 11 l11 -15 l10 13', color: '#d5c5a8', width: 1.1, opacity: 0.85 },
    { d: 'M136 120 l9 -9 l7 7 l9 -11', color: '#d5c5a8', width: 1.1, opacity: 0.85 },
    { d: 'M40 334 l12 -12 l9 9 l10 -12', color: '#d5c5a8', width: 1.1, opacity: 0.85 },
    { d: 'M300 340 l11 -11 l9 9 l9 -10', color: '#d5c5a8', width: 1.1, opacity: 0.85 }
  ],
  texts: [
    { x: 14, y: 26, t: '北 岸', size: 9, color: '#7d6647', ls: 4, serif: true },
    { x: 14, y: 368, t: '南 岸', size: 9, color: '#7d6647', ls: 4, serif: true },
    { x: 356, y: 26, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1, anchor: 'end' },
    { x: 104, y: 244, t: '长　江', size: 11, color: '#46594f', ls: 3, rotate: -3, serif: true }
  ]
};

var META = {
  id: 'chibi',
  title: '赤壁之战',
  kicker: '沙 盘 推 演',
  subtitle: '长江 · 乌林—赤壁',
  years: '208',
  yearUnit: 'AD',
  era: '建安十三年',
  mapNote: '旗＝陆军 ｜ 舟＝水军 ｜ 火＝火攻 ｜ 虚线＝撤退',
  note: '示意沙盘：仅保留关键地点与行军线，非真实地理比例',
  hook: '曹操南下、孙刘结盟、火攻、北撤，四阶段看攻守如何逆转',
  period: '东汉',
  yearValue: 208,
  cityMode: 'neutral',
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
