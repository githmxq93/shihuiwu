/**
 * 沙盘推演 · 鄢郢之战（前279—前278）
 * 通行叙事：白起率秦军出武关，沿汉水南下攻楚；先破鄢，引水灌城，死者数十万；
 * 再破西陵、焚夷陵楚先王陵墓，拔郢都。楚顷襄王东迁于陈，秦以郢为南郡。
 * 「数十万」为史载；秦楚双方兵数无确载。
 * 地名古今对照：鄢今湖北宜城东南、郢今湖北荆州、夷陵今湖北宜昌、陈今河南淮阳、武关今陕西丹凤东南。
 */
var COLOR = { qin: '#2b5262', chu: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'xianyang', name: '咸阳', x: 92,  y: 104, tx: 92,  ty: 90,  anchor: 'middle' },
  { id: 'wuguan',   name: '武关', x: 156, y: 142, tx: 142, ty: 136, anchor: 'end' },
  { id: 'yan',      name: '鄢',   x: 210, y: 178, tx: 196, ty: 172, anchor: 'end' },
  { id: 'ying',     name: '郢',   x: 228, y: 226, tx: 228, ty: 212, anchor: 'middle' },
  { id: 'yiling',   name: '夷陵', x: 206, y: 268, tx: 192, ty: 262, anchor: 'end' },
  { id: 'chen',     name: '陈',   x: 296, y: 196, tx: 310, ty: 190, anchor: 'start' }
];

var BASE0 = { xianyang: 'qin', wuguan: 'qin', yan: 'chu', ying: 'chu', yiling: 'chu', chen: 'chu' };
var BASE1 = { xianyang: 'qin', wuguan: 'qin', yan: 'contested', ying: 'chu', yiling: 'chu', chen: 'chu' };
var BASE2 = { xianyang: 'qin', wuguan: 'qin', yan: 'qin', ying: 'chu', yiling: 'chu', chen: 'chu' };
var BASE3 = { xianyang: 'qin', wuguan: 'qin', yan: 'qin', ying: 'qin', yiling: 'qin', chen: 'chu' };

var STAGES = [
  {
    label: '白起攻楚', seal: '出关',
    kicker: '阶段一 · 前 279 年',
    title: '白起出武关，沿汉水南下',
    turn: '秦昭王以白起攻楚，秦军出武关，沿汉水南下，直趋鄢、邓；楚军列于汉水沿岸拒之。',
    why: '楚都郢在汉水下游，若鄢、邓失守，郢便无屏障；白起走的是楚国防线最薄的一路。',
    src: '《史记·白起王翦列传》；《战国策·中山策》。',
    events: [
      { time: '前279', who: '秦昭王', text: '以白起攻楚', t: 0.08 },
      { time: '前279', who: '白起', text: '出武关，沿汉水南下', t: 0.34 },
      { time: '前279', who: '秦军', text: '进围鄢', t: 0.58, kind: 'flip', city: 'yan' },
      { time: '前279', who: '楚军', text: '列于汉水沿岸拒之', t: 0.84 }
    ],
    nums: [
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '路线', value: '出武关', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { yan: 0.58 },
    markers: [
      { type: 'host', side: 'qin', x: 92, y: 104, t: 0.02, name: '秦昭王', lx: 92, ly: 90, anchor: 'middle' },
      { type: 'host', side: 'qin', x: 168, y: 150, t: 0.40, name: '白起', lx: 182, ly: 146, anchor: 'start' },
      { type: 'host', side: 'chu', x: 228, y: 226, t: 0.02, name: '楚顷襄王', lx: 242, ly: 232, anchor: 'start' }
    ],
    routes: [
      { d: 'M 112 112 C 130 124 148 136 164 146', side: 'qin', t0: 0.10, t1: 0.44,
        label: '秦军出关', lx: 112, ly: 100, anchor: 'start' },
      { d: 'M 172 154 C 186 162 198 170 206 176', side: 'qin', t0: 0.46, t1: 0.66,
        label: '进围鄢', lx: 174, ly: 168, anchor: 'end' }
    ]
  },
  {
    label: '水灌鄢城', seal: '灌城',
    kicker: '阶段二 · 前 279 年',
    title: '白起引水灌鄢，城破',
    turn: '白起筑渠引西山之水灌鄢，水溃城东北角；城中军民溺死者数十万，鄢城遂破。',
    why: '鄢城坚而难攻，白起以水代兵，一击破城；此役之后，楚汉水防线洞开。',
    src: '《水经注·沔水》引；《史记·白起王翦列传》。「溺死者数十万」为史载。',
    events: [
      { time: '前279', who: '白起', text: '筑渠引水灌鄢', t: 0.08 },
      { time: '前279', who: '鄢城', text: '水溃城东北角', t: 0.34, kind: 'flip', city: 'yan' },
      { time: '前279', who: '鄢城军民', text: '溺死者数十万', t: 0.58 },
      { time: '前279', who: '秦军', text: '遂拔鄢、邓五城', t: 0.84 }
    ],
    nums: [
      { label: '溺死者', value: '数十万', kind: '史载', n: null },
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '鄢', value: '城破', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { yan: 0.34 },
    sieges: [
      { x: 210, y: 178, t: 0.34, label: '引水灌城', side: 'qin', lx: -12, ly: -12, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 210, y: 178, t: 0.30, name: '白起', lx: 196, ly: 192, anchor: 'end' },
      { type: 'host', side: 'chu', x: 228, y: 226, t: 0.02, name: '楚顷襄王', lx: 242, ly: 222, anchor: 'start', weak: true },
      { type: 'army', side: 'qin', x: 202, y: 186, t: 0.20, name: '秦军', lx: 188, ly: 180, anchor: 'end' }
    ],
    routes: [
      { d: 'M 196 170 C 202 172 208 175 212 177', side: 'qin', t0: 0.06, t1: 0.30,
        label: '引水', lx: 184, ly: 164, anchor: 'end' }
    ]
  },
  {
    label: '焚陵拔郢', seal: '拔郢',
    kicker: '阶段三 · 前 278 年',
    title: '秦军焚夷陵，拔郢都',
    turn: '白起乘胜破西陵，焚夷陵楚先王陵墓；楚军溃散，秦军遂拔郢都。',
    why: '夷陵是楚先王陵寝所在，焚之则楚人丧气；郢都既失，楚国腹地尽在秦军兵锋之下。',
    src: '《史记·白起王翦列传》《楚世家》。',
    events: [
      { time: '前278', who: '秦军', text: '破西陵', t: 0.08 },
      { time: '前278', who: '秦军', text: '焚夷陵楚先王陵墓', t: 0.34, kind: 'flip', city: 'yiling' },
      { time: '前278', who: '秦军', text: '拔郢都', t: 0.58, kind: 'flip', city: 'ying' },
      { time: '前278', who: '楚军', text: '溃散，不能复守汉水', t: 0.84 }
    ],
    nums: [
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '郢', value: '陷落', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { yiling: 0.34, ying: 0.58 },
    sieges: [
      { x: 228, y: 226, t: 0.58, label: '郢都破', side: 'qin', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 228, y: 226, t: 0.30, name: '白起', lx: 242, ly: 236, anchor: 'start' },
      { type: 'host', side: 'chu', x: 228, y: 226, t: 0.02, name: '楚顷襄王', lx: 214, ly: 218, anchor: 'end', weak: true },
      { type: 'army', side: 'qin', x: 214, y: 252, t: 0.30, name: '秦军', lx: 200, ly: 248, anchor: 'end' }
    ],
    routes: [
      { d: 'M 214 186 C 218 198 222 210 226 220', side: 'qin', t0: 0.06, t1: 0.56,
        label: '南下拔郢', lx: 200, ly: 204, anchor: 'end' },
      { d: 'M 212 240 C 210 250 208 260 206 266', side: 'qin', t0: 0.30, t1: 0.60,
        label: '焚夷陵', lx: 194, ly: 246, anchor: 'end' }
    ]
  },
  {
    label: '楚迁于陈', seal: '东迁',
    kicker: '阶段四 · 前 278 年',
    title: '楚迁都于陈，秦置南郡',
    turn: '楚顷襄王东迁于陈以避秦；秦以郢为南郡，封白起为武安君。屈原闻郢破，自沉汨罗。',
    why: '郢失则楚失去江汉根本，东迁只是苟延；此后楚国虽存，已无力与秦争天下。',
    src: '《史记·楚世家》《白起王翦列传》《屈原贾生列传》。',
    events: [
      { time: '前278', who: '楚顷襄王', text: '东迁于陈', t: 0.08 },
      { time: '前278', who: '秦', text: '以郢为南郡', t: 0.34 },
      { time: '前278', who: '白起', text: '封武安君', t: 0.58 },
      { time: '前278', who: '屈原', text: '自沉汨罗', t: 0.84 }
    ],
    nums: [
      { label: '楚都', value: '迁于陈', kind: '史载', n: null },
      { label: '秦置', value: '南郡', kind: '史载', n: null },
      { label: '屈原', value: '沉江', kind: '史载', n: null }
    ],
    hold: BASE3,
    markers: [
      { type: 'host', side: 'chu', x: 296, y: 196, t: 0.20, name: '楚顷襄王', lx: 310, ly: 202, anchor: 'start' },
      { type: 'host', side: 'qin', x: 228, y: 226, t: 0.02, name: '白起', lx: 242, ly: 232, anchor: 'start' },
      { type: 'host', side: 'chu', x: 206, y: 268, t: 0.02, name: '屈原', lx: 192, ly: 274, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 238 228 C 258 218 278 206 292 198', side: 'retreat', t0: 0.06, t1: 0.44,
        label: '楚王东迁', lx: 258, ly: 240, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 120 150 C 160 168 200 186 236 200 C 272 214 310 220 380 222', color: '#a8b6ab', width: 2.2 },
    { d: 'M 60 290 C 130 286 200 290 270 286 C 320 284 360 288 385 286', color: '#a8b6ab', width: 2.6 }
  ],
  lines: [
    { d: 'M 100 74 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 250 92 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 66 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 300, y: 218, t: '汉　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 300, y: 282, t: '长　江', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '鄢·今湖北宜城东南　郢·今湖北荆州　夷陵·今湖北宜昌　陈·今河南淮阳', size: 6.2, color: '#7d6647', ls: 0.3 },
    { x: 24, y: 366, t: '秦　楚', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'yanying',
  title: '鄢郢之战',
  kicker: '沙 盘 推 演',
  subtitle: '鄢 · 郢',
  years: '前279—前278',
  yearUnit: '',
  era: '战国 · 秦昭王二十八年至二十九年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：鄢今湖北宜城东南、郢今湖北荆州，非真实地理比例',
  hook: '白起水灌鄢城、焚夷陵、拔郢都，楚东迁于陈',
  period: '战国',
  yearValue: -279,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '秦', b: '胜', sub: '前278' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
