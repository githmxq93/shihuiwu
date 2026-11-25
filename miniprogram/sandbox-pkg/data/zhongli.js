/**
 * 沙盘推演 · 钟离之战（507）
 * 通行叙事：北魏元英、杨大眼率众围钟离，梁将昌义之坚守；梁遣曹景宗、韦睿来援，
 * 韦睿夜筑垒于邵阳洲；淮水暴涨，梁军以火攻烧魏军浮桥，魏军大溃，钟离围解。
 * 魏军「众数十万」、缘淮死者「十余万」为史载；梁军兵力无确载。
 * 地名古今对照：钟离今安徽凤阳东北、邵阳洲在今淮河之中、寿阳今安徽寿县。
 */
var COLOR = { liang: '#2b5262', wei: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'luoyang',  name: '洛阳',   x: 148, y: 88,  tx: 148, ty: 74,  anchor: 'middle' },
  { id: 'shouyang', name: '寿阳',   x: 206, y: 176, tx: 192, ty: 170, anchor: 'end' },
  { id: 'shaoyang', name: '邵阳洲', x: 224, y: 222, tx: 210, ty: 216, anchor: 'end' },
  { id: 'zhongli',  name: '钟离',   x: 254, y: 248, tx: 254, ty: 264, anchor: 'middle' },
  { id: 'jiankang', name: '建康',   x: 300, y: 312, tx: 300, ty: 328, anchor: 'middle' }
];

var BASE0 = { luoyang: 'wei', shouyang: 'wei', shaoyang: 'liang', zhongli: 'liang', jiankang: 'liang' };
var BASE1 = { luoyang: 'wei', shouyang: 'wei', shaoyang: 'liang', zhongli: 'contested', jiankang: 'liang' };
var BASE2 = { luoyang: 'wei', shouyang: 'wei', shaoyang: 'liang', zhongli: 'contested', jiankang: 'liang' };
var BASE3 = { luoyang: 'wei', shouyang: 'wei', shaoyang: 'contested', zhongli: 'contested', jiankang: 'liang' };
var BASE4 = { luoyang: 'wei', shouyang: 'wei', shaoyang: 'liang', zhongli: 'contested', jiankang: 'liang' };
var BASE5 = { luoyang: 'wei', shouyang: 'wei', shaoyang: 'liang', zhongli: 'liang', jiankang: 'liang' };

var STAGES = [
  {
    label: '魏军围钟离', seal: '围城',
    kicker: '阶段一 · 507 年 冬',
    title: '元英、杨大眼围钟离',
    turn: '北魏中山王元英、平东将军杨大眼率众数十万南攻，围梁钟离城；梁守将昌义之率三千人坚守，魏军筑垒于淮水两岸，昼夜攻城。',
    why: '钟离扼淮河中游，是魏军南下建康的必经之地；拔此城，便可直逼江淮。',
    src: '《梁书·昌义之传》；《资治通鉴》卷一百四十六。「众数十万」为史载。',
    events: [
      { time: '507·冬', who: '元英', text: '率众数十万南攻', t: 0.08 },
      { time: '507·冬', who: '魏军', text: '围钟离城', t: 0.34, kind: 'flip', city: 'zhongli' },
      { time: '507·冬', who: '昌义之', text: '率三千人坚守', t: 0.58 },
      { time: '507·冬', who: '魏军', text: '昼夜攻城，死者甚众', t: 0.84 }
    ],
    nums: [
      { label: '魏军', value: '众数十万', kind: '史载', n: null },
      { label: '梁守军', value: '三千', kind: '史载', n: 3 },
      { label: '钟离', value: '被围', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { zhongli: 0.34 },
    sieges: [
      { x: 254, y: 248, t: 0.34, label: '围城', side: 'wei', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'wei', x: 206, y: 176, t: 0.02, name: '元英', lx: 192, ly: 188, anchor: 'end' },
      { type: 'host', side: 'liang', x: 254, y: 248, t: 0.02, name: '昌义之', lx: 268, ly: 242, anchor: 'start', weak: true },
      { type: 'army', side: 'wei', x: 236, y: 214, t: 0.34, name: '魏军', lx: 246, ly: 206, anchor: 'start' }
    ],
    routes: [
      { d: 'M 210 182 C 224 196 238 214 248 238', side: 'wei', t0: 0.20, t1: 0.66,
        label: '魏军南下', lx: 210, ly: 210, anchor: 'end' }
    ]
  },
  {
    label: '梁军来援', seal: '赴援',
    kicker: '阶段二 · 507 年',
    title: '曹景宗、韦睿率军救钟离',
    turn: '梁武帝遣曹景宗都督诸军、韦睿率豫州之众救钟离；韦睿自合肥倍道兼行，十日而至邵阳。',
    why: '钟离若失，淮南门户洞开；梁军必须在外围迅速集结，与守军形成内外夹击之势。',
    src: '《梁书·韦睿传》《曹景宗传》；《资治通鉴》卷一百四十六。「倍道兼行」为史载。',
    events: [
      { time: '507', who: '梁武帝', text: '遣曹景宗、韦睿救钟离', t: 0.08 },
      { time: '507', who: '韦睿', text: '自合肥倍道兼行', t: 0.34 },
      { time: '507', who: '梁军', text: '十日而至邵阳', t: 0.58 },
      { time: '507', who: '魏军', text: '分军拒援', t: 0.84 }
    ],
    nums: [
      { label: '梁援军', value: '无确载', kind: '无确载', n: null },
      { label: '魏军', value: '众数十万', kind: '史载', n: null },
      { label: '行程', value: '十日', kind: '史载', n: null }
    ],
    hold: BASE2,
    markers: [
      { type: 'host', side: 'liang', x: 224, y: 222, t: 0.46, name: '韦睿', lx: 238, ly: 216, anchor: 'start' },
      { type: 'host', side: 'liang', x: 300, y: 312, t: 0.02, name: '曹景宗', lx: 286, ly: 306, anchor: 'end' },
      { type: 'host', side: 'wei', x: 206, y: 176, t: 0.02, name: '元英', lx: 192, ly: 170, anchor: 'end' }
    ],
    routes: [
      { d: 'M 296 306 C 278 278 256 250 232 228', side: 'liang', t0: 0.26, t1: 0.70,
        label: '梁军北上', lx: 274, ly: 270, anchor: 'middle' }
    ]
  },
  {
    label: '夜筑邵阳垒', seal: '筑垒',
    kicker: '阶段三 · 507 年',
    title: '韦睿夜筑垒于邵阳洲',
    turn: '韦睿乘夜于邵阳洲筑垒，堑壕未及合而魏军大至；韦睿执节立于垒下，魏军惮其威名，竟不敢逼。垒成，梁军与钟离守军声息相通。',
    why: '邵阳洲居淮水中流，筑垒于此，等于在魏军包围圈里插进一颗钉子，为决战取得立足点。',
    src: '《梁书·韦睿传》；《资治通鉴》卷一百四十六。「一夕而成」为史载。',
    events: [
      { time: '507', who: '韦睿', text: '乘夜筑垒于邵阳洲', t: 0.08 },
      { time: '507', who: '魏军', text: '大至，韦睿立垒下不动', t: 0.34 },
      { time: '507', who: '梁军', text: '一夕垒成', t: 0.58, kind: 'flip', city: 'shaoyang' },
      { time: '507', who: '钟离守军', text: '与援军声息相通', t: 0.84 }
    ],
    nums: [
      { label: '梁军', value: '无确载', kind: '无确载', n: null },
      { label: '魏军', value: '众数十万', kind: '史载', n: null },
      { label: '筑垒', value: '一夕而成', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { shaoyang: 0.58 },
    markers: [
      { type: 'host', side: 'liang', x: 224, y: 222, t: 0.02, name: '韦睿', lx: 238, ly: 216, anchor: 'start' },
      { type: 'army', side: 'liang', x: 214, y: 232, t: 0.30, name: '梁军', lx: 200, ly: 226, anchor: 'end' },
      { type: 'host', side: 'wei', x: 206, y: 176, t: 0.02, name: '元英', lx: 192, ly: 170, anchor: 'end', weak: true }
    ],
    routes: []
  },
  {
    label: '淮水暴涨', seal: '火攻',
    kicker: '阶段四 · 507 年 三月',
    title: '淮水暴涨，梁军火攻烧桥',
    turn: '淮水暴涨，韦睿以战船载草焚魏军浮桥，敢死之士乘舰直冲；风怒火盛，魏军浮桥尽毁，元英单骑走，杨大眼亦焚营而遁。',
    why: '魏军以浮桥连接两岸为命脉，桥断则粮道与退路同绝；梁军以火攻破桥，一战定胜负。',
    src: '《梁书·韦睿传》《曹景宗传》；《资治通鉴》卷一百四十六。「纵火烧桥」为史载。',
    events: [
      { time: '507·三月', who: '淮水', text: '暴涨，梁军乘船进击', t: 0.08 },
      { time: '507·三月', who: '韦睿', text: '以草船焚魏浮桥', t: 0.34 },
      { time: '507·三月', who: '梁军', text: '敢死之士直冲魏垒', t: 0.58, kind: 'flip', city: 'shaoyang' },
      { time: '507·三月', who: '元英', text: '单骑走，杨大眼焚营遁', t: 0.84 }
    ],
    nums: [
      { label: '魏军', value: '众数十万', kind: '史载', n: null },
      { label: '梁军', value: '无确载', kind: '无确载', n: null },
      { label: '浮桥', value: '尽毁', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { shaoyang: 0.58 },
    markers: [
      { type: 'host', side: 'liang', x: 224, y: 222, t: 0.02, name: '韦睿', lx: 210, ly: 214, anchor: 'end' },
      { type: 'army', side: 'liang', x: 240, y: 234, t: 0.34, name: '梁军', lx: 254, ly: 228, anchor: 'start' },
      { type: 'host', side: 'wei', x: 206, y: 176, t: 0.02, name: '元英', lx: 192, ly: 170, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 216 226 C 226 232 236 238 246 242', side: 'liang', t0: 0.34, t1: 0.72,
        label: '火船冲桥', lx: 216, ly: 242, anchor: 'end' }
    ]
  },
  {
    label: '钟离围解', seal: '解围',
    kicker: '阶段五 · 507 年',
    title: '魏军大溃，钟离围解',
    turn: '魏军沿淮死者十余万，被俘五万；梁军缴获军资器械山积。钟离围解，昌义之出城与韦睿相见，感泣不已。',
    why: '钟离一战，北魏淮南攻势受挫，南北对峙格局再延续数十年。',
    src: '《梁书·昌义之传》《韦睿传》；《资治通鉴》卷一百四十六。「缘淮死者十余万」为史载。',
    events: [
      { time: '507', who: '魏军', text: '沿淮溃退，死者十余万', t: 0.08 },
      { time: '507', who: '梁军', text: '俘获五万，军资山积', t: 0.34 },
      { time: '507', who: '钟离', text: '围解', t: 0.58, kind: 'flip', city: 'zhongli' },
      { time: '507', who: '昌义之', text: '出城与韦睿相见', t: 0.84 }
    ],
    nums: [
      { label: '魏军死者', value: '十余万', kind: '史载', n: null },
      { label: '被俘', value: '五万', kind: '史载', n: 50 },
      { label: '钟离', value: '围解', kind: '史载', n: null }
    ],
    hold: BASE5,
    flips: { zhongli: 0.58 },
    markers: [
      { type: 'host', side: 'liang', x: 254, y: 248, t: 0.30, name: '昌义之', lx: 268, ly: 242, anchor: 'start' },
      { type: 'host', side: 'liang', x: 224, y: 222, t: 0.02, name: '韦睿', lx: 210, ly: 214, anchor: 'end' },
      { type: 'army', side: 'wei', x: 190, y: 160, t: 0.10, name: '魏军溃退', lx: 176, ly: 154, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 246 238 C 226 210 208 190 196 178', side: 'retreat', t0: 0.08, t1: 0.52,
        label: '魏军北溃', lx: 200, ly: 216, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 238 C 60 230 120 240 180 232 C 240 224 300 232 385 226', color: '#a8b6ab', width: 4 },
    { d: 'M 60 40 C 90 110 130 170 190 214', color: '#b6c3b6', width: 1.8 }
  ],
  lines: [
    { d: 'M 120 100 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 270 96 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 190 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 30, y: 232, t: '淮　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 236, y: 210, t: '邵阳洲', size: 7.5, color: '#46594f', ls: 1 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '钟离·今安徽凤阳东北　邵阳洲·今淮河中　寿阳·今安徽寿县', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '江　淮', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'zhongli',
  title: '钟离之战',
  kicker: '沙 盘 推 演',
  subtitle: '邵阳洲 · 钟离',
  years: '507',
  yearUnit: 'AD',
  era: '南北朝 · 梁天监六年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：钟离今安徽凤阳东北、邵阳洲在今淮河之中，非真实地理比例',
  hook: '韦睿夜筑邵阳垒，淮水暴涨火攻烧桥，梁军大破魏军，钟离围解',
  period: '南北朝',
  yearValue: 507,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '梁', b: '胜', sub: '507' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
