/**
 * 沙盘推演 · 柏乡之战（910）
 * 通行叙事：后梁遣王景仁率军北上攻成德，赵王王镕求救于晋；
 * 李存勖率军东出，与梁军对峙于柏乡；晋军以骑兵诱敌、步骑夹击，梁军大溃。
 * 双方兵力均无确载，梁军「大溃」为史载。
 * 地名古今对照：柏乡今河北柏乡、邢州今河北邢台、镇州今河北正定。
 */
var COLOR = { jin: '#2b5262', liang: '#6f3a22', zhao: '#4a4a5a', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'taiyuan',  name: '太原', x: 96,  y: 96,  tx: 96,  ty: 82,  anchor: 'middle' },
  { id: 'zhenzhou', name: '镇州', x: 208, y: 116, tx: 208, ty: 102, anchor: 'middle' },
  { id: 'xingzhou', name: '邢州', x: 234, y: 166, tx: 220, ty: 160, anchor: 'end' },
  { id: 'baixiang', name: '柏乡', x: 262, y: 190, tx: 276, ty: 184, anchor: 'start' },
  { id: 'bianzhou', name: '汴州', x: 300, y: 286, tx: 300, ty: 302, anchor: 'middle' }
];

var BASE0 = { taiyuan: 'jin', zhenzhou: 'zhao', xingzhou: 'liang', baixiang: 'liang', bianzhou: 'liang' };
var BASE1 = { taiyuan: 'jin', zhenzhou: 'zhao', xingzhou: 'contested', baixiang: 'liang', bianzhou: 'liang' };
var BASE2 = { taiyuan: 'jin', zhenzhou: 'zhao', xingzhou: 'contested', baixiang: 'liang', bianzhou: 'liang' };
var BASE3 = { taiyuan: 'jin', zhenzhou: 'zhao', xingzhou: 'contested', baixiang: 'contested', bianzhou: 'liang' };
var BASE4 = { taiyuan: 'jin', zhenzhou: 'zhao', xingzhou: 'jin', baixiang: 'jin', bianzhou: 'liang' };

var STAGES = [
  {
    label: '梁军北上', seal: '压境',
    kicker: '阶段一 · 910 年 冬',
    title: '后梁遣王景仁北上攻赵',
    turn: '后梁朱温遣王景仁率军北上，攻成德；赵王王镕遣使向晋王李存勖求救，梁军前锋进抵邢州、柏乡。',
    why: '成德居晋、梁之间，谁得成德，谁就掌握河北中部的进退通道。',
    src: '《旧五代史·王景仁传》；《资治通鉴》卷二百六十七。',
    events: [
      { time: '910·冬', who: '朱温', text: '遣王景仁北上攻赵', t: 0.08 },
      { time: '910·冬', who: '梁军', text: '进抵邢州', t: 0.34, kind: 'flip', city: 'xingzhou' },
      { time: '910·冬', who: '王镕', text: '遣使向晋求救', t: 0.58 },
      { time: '910·冬', who: '梁军', text: '前锋屯柏乡', t: 0.84 }
    ],
    nums: [
      { label: '梁军', value: '无确载', kind: '无确载', n: null },
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '柏乡', value: '被压', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { xingzhou: 0.34 },
    markers: [
      { type: 'host', side: 'liang', x: 262, y: 190, t: 0.30, name: '王景仁', lx: 276, ly: 198, anchor: 'start' },
      { type: 'host', side: 'zhao', x: 208, y: 116, t: 0.02, name: '王镕', lx: 194, ly: 110, anchor: 'end', weak: true },
      { type: 'army', side: 'liang', x: 280, y: 240, t: 0.34, name: '梁军', lx: 294, ly: 234, anchor: 'start' }
    ],
    routes: [
      { d: 'M 296 282 C 288 250 276 214 266 196', side: 'liang', t0: 0.10, t1: 0.56,
        label: '梁军北上', lx: 300, ly: 240, anchor: 'start' }
    ]
  },
  {
    label: '晋军东出', seal: '救赵',
    kicker: '阶段二 · 910 年 十二月',
    title: '李存勖率军东出救赵',
    turn: '李存勖亲率晋军自太原东出，与赵军会合于镇州；晋军屯于柏乡北，与梁军夹野河对峙。',
    why: '晋军远来，利在速战；梁军深沟高垒，欲以逸待劳，双方对峙之势已成。',
    src: '《旧五代史·庄宗纪》；《资治通鉴》卷二百六十七。',
    events: [
      { time: '910·十二月', who: '李存勖', text: '自太原率军东出', t: 0.08 },
      { time: '910·十二月', who: '晋·赵', text: '会合于镇州', t: 0.34 },
      { time: '910·十二月', who: '晋军', text: '屯柏乡北，夹野河', t: 0.58 },
      { time: '910·十二月', who: '梁军', text: '深沟高垒，欲以逸待劳', t: 0.84 }
    ],
    nums: [
      { label: '晋军', value: '无确载', kind: '无确载', n: null },
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '对峙', value: '夹野河', kind: '史载', n: null }
    ],
    hold: BASE2,
    markers: [
      { type: 'host', side: 'jin', x: 208, y: 116, t: 0.30, name: '李存勖', lx: 222, ly: 110, anchor: 'start' },
      { type: 'host', side: 'liang', x: 262, y: 190, t: 0.02, name: '王景仁', lx: 276, ly: 184, anchor: 'start' },
      { type: 'army', side: 'jin', x: 130, y: 130, t: 0.34, name: '晋军', lx: 116, ly: 124, anchor: 'end' }
    ],
    routes: [
      { d: 'M 104 102 C 130 108 164 112 200 114', side: 'jin', t0: 0.08, t1: 0.44,
        label: '晋军东出', lx: 140, ly: 98, anchor: 'middle' }
    ]
  },
  {
    label: '柏乡对峙', seal: '相持',
    kicker: '阶段三 · 911 年 正月',
    title: '两军夹野河对峙',
    turn: '梁军在野河之南列阵，晋军在北；晋军以骑兵屡挑，梁军坚壁不出。李存勖用周德威之策，先疲其众。',
    why: '梁军众而阵坚，晋军骑锐而兵少；只有把梁军引出营垒，才能发挥骑兵冲击之长。',
    src: '《旧五代史·周德威传》；《资治通鉴》卷二百六十七。',
    events: [
      { time: '911·正月', who: '梁军', text: '列阵野河之南', t: 0.08 },
      { time: '911·正月', who: '晋军', text: '以骑兵屡挑', t: 0.34 },
      { time: '911·正月', who: '梁军', text: '坚壁不出', t: 0.58, kind: 'flip', city: 'baixiang' },
      { time: '911·正月', who: '李存勖', text: '用周德威之策，先疲其众', t: 0.84 }
    ],
    nums: [
      { label: '梁军', value: '无确载', kind: '无确载', n: null },
      { label: '晋军', value: '无确载', kind: '无确载', n: null },
      { label: '对峙', value: '夹野河', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { baixiang: 0.58 },
    markers: [
      { type: 'host', side: 'jin', x: 240, y: 176, t: 0.30, name: '李存勖', lx: 226, ly: 170, anchor: 'end' },
      { type: 'host', side: 'liang', x: 262, y: 190, t: 0.02, name: '王景仁', lx: 276, ly: 196, anchor: 'start' },
      { type: 'army', side: 'jin', x: 226, y: 182, t: 0.34, name: '晋骑兵', lx: 212, ly: 176, anchor: 'end' }
    ],
    routes: []
  },
  {
    label: '柏乡决战', seal: '大破',
    kicker: '阶段四 · 911 年 正月',
    title: '晋军步骑夹击，梁军大溃',
    turn: '梁军列阵半日，士卒饥疲；晋军以骑兵冲其两翼，步兵继进，梁军大溃，王景仁仅以身免，晋军追至邢州。',
    why: '梁军虽众，阵形被骑兵撕开便全线崩溃；柏乡一败，后梁在河北的攻势彻底瓦解。',
    src: '《旧五代史·庄宗纪》《王景仁传》；《资治通鉴》卷二百六十七。',
    events: [
      { time: '911·正月', who: '梁军', text: '列阵半日，士卒饥疲', t: 0.08 },
      { time: '911·正月', who: '晋军', text: '骑兵冲其两翼', t: 0.34, kind: 'flip', city: 'baixiang' },
      { time: '911·正月', who: '晋军', text: '步兵继进，梁军大溃', t: 0.58, kind: 'flip', city: 'xingzhou' },
      { time: '911·正月', who: '王景仁', text: '仅以身免，晋军追至邢州', t: 0.84 }
    ],
    nums: [
      { label: '梁军', value: '无确载', kind: '无确载', n: null },
      { label: '晋军', value: '无确载', kind: '无确载', n: null },
      { label: '结果', value: '梁军大溃', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { baixiang: 0.34, xingzhou: 0.58 },
    sieges: [
      { x: 262, y: 190, t: 0.34, label: '梁军溃', side: 'jin', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'jin', x: 262, y: 190, t: 0.30, name: '李存勖', lx: 248, ly: 202, anchor: 'end' },
      { type: 'host', side: 'liang', x: 262, y: 190, t: 0.02, name: '王景仁', lx: 276, ly: 178, anchor: 'start', weak: true },
      { type: 'army', side: 'jin', x: 240, y: 200, t: 0.34, name: '晋军', lx: 226, ly: 208, anchor: 'end' }
    ],
    routes: [
      { d: 'M 238 194 C 246 192 254 190 260 190', side: 'jin', t0: 0.30, t1: 0.68,
        label: '步骑夹击', lx: 232, ly: 210, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 170 C 70 166 140 174 210 168 C 280 162 340 168 385 164', color: '#a8b6ab', width: 2.4 },
    { d: 'M 60 40 C 90 90 120 140 150 190 C 168 220 178 270 182 386', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 140 60 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 300 80 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 80 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 30, y: 164, t: '野　河', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '柏乡·今河北柏乡　邢州·今河北邢台　镇州·今河北正定', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '河　北', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'baixiang',
  title: '柏乡之战',
  kicker: '沙 盘 推 演',
  subtitle: '柏乡 · 野河',
  years: '910–911',
  yearUnit: 'AD',
  era: '五代 · 后梁开平四年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：柏乡今河北柏乡、邢州今河北邢台，非真实地理比例',
  hook: '晋军救赵，柏乡夹野河对峙，步骑夹击大破梁军',
  period: '五代',
  yearValue: 910,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '晋', b: '胜', sub: '911' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
