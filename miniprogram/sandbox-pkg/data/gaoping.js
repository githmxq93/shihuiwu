/**
 * 沙盘推演 · 高平之战（954）
 * 通行叙事：北汉主刘崇联辽南下，攻后周潞州；周世宗柴荣亲征，两军遇于高平；
 * 周军初战不利，柴荣亲督，赵匡胤等力战，北汉骁将张元徽败死，辽军退；周军追至晋阳。
 * 北汉「三万」、辽「铁骑万余」为史载；后周军兵力无确载。
 * 地名古今对照：高平今山西高平、潞州今山西长治、晋阳今山西太原。
 */
var COLOR = { zhou: '#2b5262', han: '#6f3a22', liao: '#4a4a5a', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'bianzhou', name: '汴州', x: 168, y: 306, tx: 168, ty: 322, anchor: 'middle' },
  { id: 'zezhou',   name: '泽州', x: 196, y: 224, tx: 196, ty: 240, anchor: 'middle' },
  { id: 'gaoping',  name: '高平', x: 216, y: 202, tx: 230, ty: 196, anchor: 'start' },
  { id: 'luzhou',   name: '潞州', x: 232, y: 162, tx: 218, ty: 156, anchor: 'end' },
  { id: 'jinyang',  name: '晋阳', x: 214, y: 96,  tx: 214, ty: 82,  anchor: 'middle' }
];

var BASE0 = { bianzhou: 'zhou', zezhou: 'zhou', gaoping: 'zhou', luzhou: 'zhou', jinyang: 'han' };
var BASE1 = { bianzhou: 'zhou', zezhou: 'zhou', gaoping: 'zhou', luzhou: 'contested', jinyang: 'han' };
var BASE2 = { bianzhou: 'zhou', zezhou: 'zhou', gaoping: 'contested', luzhou: 'contested', jinyang: 'han' };
var BASE3 = { bianzhou: 'zhou', zezhou: 'zhou', gaoping: 'zhou', luzhou: 'contested', jinyang: 'han' };
var BASE4 = { bianzhou: 'zhou', zezhou: 'zhou', gaoping: 'zhou', luzhou: 'zhou', jinyang: 'han' };

var STAGES = [
  {
    label: '北汉南下', seal: '联辽',
    kicker: '阶段一 · 954 年 正月',
    title: '北汉联辽南下，攻潞州',
    turn: '北汉主刘崇闻后周太祖新丧，联辽南下，率军三万攻后周潞州；辽遣杨衮率铁骑万余助战。',
    why: '后周新君初立，北汉欲乘丧夺回潞州、泽州，重建对中原的攻势。',
    src: '《资治通鉴》卷二百九十一；《旧五代史·周世宗纪》。「三万」「铁骑万余」为史载。',
    events: [
      { time: '954·正月', who: '刘崇', text: '闻周丧，联辽南下', t: 0.08 },
      { time: '954·正月', who: '北汉军', text: '率三万攻潞州', t: 0.34, kind: 'flip', city: 'luzhou' },
      { time: '954·正月', who: '杨衮', text: '率辽铁骑万余助战', t: 0.58 },
      { time: '954·正月', who: '后周', text: '潞州告急', t: 0.84 }
    ],
    nums: [
      { label: '北汉军', value: '三万', kind: '史载', n: 30 },
      { label: '辽军', value: '铁骑万余', kind: '史载', n: 10 },
      { label: '后周军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE1,
    flips: { luzhou: 0.34 },
    markers: [
      { type: 'host', side: 'han', x: 214, y: 96, t: 0.02, name: '刘崇', lx: 228, ly: 90, anchor: 'start' },
      { type: 'host', side: 'liao', x: 232, y: 162, t: 0.56, name: '杨衮', lx: 246, ly: 156, anchor: 'start' },
      { type: 'army', side: 'han', x: 222, y: 132, t: 0.34, name: '北汉军', lx: 236, ly: 126, anchor: 'start' }
    ],
    routes: [
      { d: 'M 216 102 C 220 122 226 144 230 156', side: 'han', t0: 0.08, t1: 0.50,
        label: '北汉南下', lx: 204, ly: 128, anchor: 'end' }
    ]
  },
  {
    label: '高平遭遇', seal: '遭遇',
    kicker: '阶段二 · 954 年 三月',
    title: '周世宗亲征，两军遇于高平',
    turn: '周世宗柴荣力排众议亲征，自汴州驰至泽州；北汉军亦南下，两军遇于高平之南。周军后队未集，众心危惧。',
    why: '周军仓促迎战、兵力未集，若不能稳住阵脚，潞州、泽州将一并失守。',
    src: '《资治通鉴》卷二百九十一；《旧五代史·周世宗纪》。',
    events: [
      { time: '954·三月', who: '柴荣', text: '力排众议，亲征北汉', t: 0.08 },
      { time: '954·三月', who: '周军', text: '自汴州驰至泽州', t: 0.34 },
      { time: '954·三月', who: '两军', text: '遇于高平之南', t: 0.58, kind: 'flip', city: 'gaoping' },
      { time: '954·三月', who: '周军', text: '后队未集，众心危惧', t: 0.84 }
    ],
    nums: [
      { label: '北汉军', value: '三万', kind: '史载', n: 30 },
      { label: '辽军', value: '铁骑万余', kind: '史载', n: 10 },
      { label: '后周军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE2,
    flips: { gaoping: 0.58 },
    markers: [
      { type: 'host', side: 'zhou', x: 196, y: 224, t: 0.30, name: '柴荣', lx: 182, ly: 218, anchor: 'end' },
      { type: 'host', side: 'han', x: 216, y: 202, t: 0.02, name: '刘崇', lx: 230, ly: 208, anchor: 'start' },
      { type: 'army', side: 'zhou', x: 186, y: 238, t: 0.34, name: '周军', lx: 172, ly: 232, anchor: 'end' }
    ],
    routes: [
      { d: 'M 172 302 C 180 276 188 248 194 230', side: 'zhou', t0: 0.06, t1: 0.44,
        label: '周军北上', lx: 166, ly: 268, anchor: 'end' }
    ]
  },
  {
    label: '高平血战', seal: '反击',
    kicker: '阶段三 · 954 年 三月',
    title: '柴荣亲督，周军反击',
    turn: '战初周军右翼溃退，柴荣亲冒矢石督战；赵匡胤等率骑死战，北汉骁将张元徽马倒被杀，北汉军大乱，辽军观望而退。',
    why: '主帅不退，周军才没有崩盘；张元徽一死，北汉前锋失据，战局瞬间逆转。',
    src: '《资治通鉴》卷二百九十一；《旧五代史·周世宗纪》《宋史·太祖本纪》。',
    events: [
      { time: '954·三月', who: '周军', text: '右翼溃退', t: 0.08 },
      { time: '954·三月', who: '柴荣', text: '亲冒矢石督战', t: 0.34 },
      { time: '954·三月', who: '赵匡胤', text: '率骑死战，张元徽败死', t: 0.58, kind: 'flip', city: 'gaoping' },
      { time: '954·三月', who: '辽军', text: '观望而退', t: 0.84 }
    ],
    nums: [
      { label: '北汉军', value: '三万', kind: '史载', n: 30 },
      { label: '辽军', value: '铁骑万余', kind: '史载', n: 10 },
      { label: '张元徽', value: '败死', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { gaoping: 0.58 },
    sieges: [
      { x: 216, y: 202, t: 0.58, label: '北汉溃', side: 'zhou', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'zhou', x: 216, y: 202, t: 0.30, name: '柴荣', lx: 202, ly: 214, anchor: 'end' },
      { type: 'host', side: 'han', x: 216, y: 202, t: 0.02, name: '刘崇', lx: 230, ly: 190, anchor: 'start', weak: true },
      { type: 'army', side: 'zhou', x: 204, y: 214, t: 0.34, name: '周军', lx: 190, ly: 220, anchor: 'end' }
    ],
    routes: [
      { d: 'M 202 210 C 208 206 212 204 214 202', side: 'zhou', t0: 0.30, t1: 0.66,
        label: '周军反击', lx: 194, ly: 226, anchor: 'end' }
    ]
  },
  {
    label: '追至晋阳', seal: '北汉衰',
    kicker: '阶段四 · 954 年',
    title: '周军追至晋阳，北汉仅存',
    turn: '周军乘胜追北，收复潞州，进围晋阳；北汉仅保晋阳一隅，辽军亦不敢再战。后周由此奠定统一中原之势。',
    why: '高平一胜，后周军威大振，柴荣得以整军经武，为后来北宋统一奠定基础。',
    src: '《资治通鉴》卷二百九十一；《旧五代史·周世宗纪》。',
    events: [
      { time: '954', who: '周军', text: '乘胜追北，收复潞州', t: 0.08, kind: 'flip', city: 'luzhou' },
      { time: '954', who: '周军', text: '进围晋阳', t: 0.34 },
      { time: '954', who: '北汉', text: '仅保晋阳一隅', t: 0.58 },
      { time: '954', who: '后周', text: '军威大振，奠定统一之势', t: 0.84 }
    ],
    nums: [
      { label: '北汉军', value: '三万', kind: '史载', n: 30 },
      { label: '辽军', value: '铁骑万余', kind: '史载', n: 10 },
      { label: '北汉', value: '仅存晋阳', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { luzhou: 0.08 },
    markers: [
      { type: 'host', side: 'zhou', x: 214, y: 96, t: 0.30, name: '柴荣', lx: 228, ly: 90, anchor: 'start' },
      { type: 'host', side: 'han', x: 214, y: 96, t: 0.02, name: '刘崇', lx: 200, ly: 88, anchor: 'end', weak: true },
      { type: 'army', side: 'zhou', x: 222, y: 140, t: 0.10, name: '周军', lx: 236, ly: 134, anchor: 'start' }
    ],
    routes: [
      { d: 'M 222 194 C 220 164 218 128 214 104', side: 'zhou', t0: 0.08, t1: 0.50,
        label: '追至晋阳', lx: 232, ly: 164, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 40 50 C 70 120 100 180 130 240 C 148 286 158 336 162 386', color: '#a8b6ab', width: 2.6 },
    { d: 'M -10 250 C 80 244 160 252 240 246 C 300 242 350 246 385 250', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 140 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 270 70 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 80 330 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 310 330 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 32, y: 244, t: '丹　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '高平·今山西高平　潞州·今山西长治　晋阳·今山西太原', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '上　党', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'gaoping',
  title: '高平之战',
  kicker: '沙 盘 推 演',
  subtitle: '高平 · 潞州',
  years: '954',
  yearUnit: 'AD',
  era: '五代 · 后周显德元年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：高平今山西高平、潞州今山西长治，非真实地理比例',
  hook: '柴荣亲征，高平血战力挽危局，北汉骁将败死，辽军观望而退',
  period: '五代',
  yearValue: 954,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '周', b: '胜', sub: '954' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
