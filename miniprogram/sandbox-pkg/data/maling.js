/**
 * 沙盘推演 · 马陵之战（前342—前341）
 * 通行叙事：魏伐韩、齐再救韩直趋大梁、孙膑减灶诱敌、马陵伏击、庞涓自刎。
 * 齐魏韩三方具体兵力均无确载；「十万灶—五万灶—三万灶」为《史记》所载的诱敌手段。
 * 地名古今对照：马陵今山东莘县西南（一说河南范县西南）。
 */
var COLOR = { wei: '#6f3a22', qi: '#2b5262', han: '#5a4a6a', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'xinzheng', name: '新郑', x: 150, y: 210, tx: 150, ty: 224, anchor: 'middle' },
  { id: 'daliang',  name: '大梁', x: 206, y: 158, tx: 206, ty: 172, anchor: 'middle' },
  { id: 'maling',   name: '马陵', x: 260, y: 96,  tx: 274, ty: 92,  anchor: 'start' },
  { id: 'linzi',    name: '临淄', x: 332, y: 128, tx: 332, ty: 142, anchor: 'middle' }
];

var BASE0 = { xinzheng: 'han', daliang: 'wei', maling: 'wei', linzi: 'qi' };
var BASE1 = { xinzheng: 'contested', daliang: 'wei', maling: 'wei', linzi: 'qi' };
var BASE2 = { xinzheng: 'han', daliang: 'wei', maling: 'wei', linzi: 'qi' };
var BASE3 = { xinzheng: 'han', daliang: 'wei', maling: 'contested', linzi: 'qi' };
var BASE4 = { xinzheng: 'han', daliang: 'wei', maling: 'qi', linzi: 'qi' };

var STAGES = [
  {
    label: '魏攻韩', seal: '伐韩',
    kicker: '阶段一 · 前342 年',
    title: '魏伐韩，韩求救于齐',
    turn: '魏惠王使庞涓率军伐韩，韩军连败，遣使求救于齐。齐威王召群臣议救韩之策。',
    why: '魏国再次以武力压服三晋；韩国若被吞并，齐的西线将直接面对魏军，救韩即所以自保。',
    src: '《史记·孙子吴起列传》《魏世家》《韩世家》；《资治通鉴》卷二。兵力无确载。',
    events: [
      { time: '前342', who: '魏惠王', text: '使庞涓率军伐韩', t: 0.08 },
      { time: '前342', who: '韩军', text: '连败，退守国都', t: 0.34, kind: 'flip', city: 'xinzheng' },
      { time: '前342', who: '韩昭侯', text: '遣使求救于齐', t: 0.62 },
      { time: '前342', who: '齐威王', text: '召群臣议救韩', t: 0.86 }
    ],
    nums: [
      { label: '魏军', value: '无确载', kind: '无确载', n: null },
      { label: '韩军', value: '无确载', kind: '无确载', n: null },
      { label: '围城', value: '五战', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { xinzheng: 0.34 },
    sieges: [
      { x: 150, y: 210, t: 0.34, label: '韩都受攻', side: 'wei', lx: -12, ly: 10, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'wei', x: 206, y: 158, t: 0.04, name: '庞涓', lx: 192, ly: 168, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'han', x: 150, y: 210, t: 0.30, name: '韩军', lx: 136, ly: 220, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 206 164 C 190 178 172 194 158 206', side: 'wei', t0: 0.06, t1: 0.34,
        label: '魏军南下', lx: 184, ly: 186, anchor: 'middle' }
    ]
  },
  {
    label: '直趋大梁', seal: '救韩',
    kicker: '阶段二 · 前341 年',
    title: '齐军再趋大梁，庞涓回师',
    turn: '齐以田忌为将、孙膑为军师，直趋魏都大梁；庞涓闻讯，弃韩而还。',
    why: '与桂陵同一思路：不救韩都而在魏都附近施压，迫使魏军放弃既得战果回援。',
    src: '《史记·孙子吴起列传》；《资治通鉴》卷二。',
    events: [
      { time: '前341', who: '田忌', text: '率齐军直趋大梁', t: 0.08 },
      { time: '前341', who: '庞涓', text: '闻齐师至，弃韩回师', t: 0.36, kind: 'flip', city: 'xinzheng' },
      { time: '前341', who: '齐军', text: '进至魏境，佯示怯战', t: 0.62 },
      { time: '前341', who: '魏军', text: '悉起兵，以太子申为上将', t: 0.86 }
    ],
    nums: [
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '魏军', value: '无确载', kind: '无确载', n: null },
      { label: '韩都', value: '围解', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { xinzheng: 0.36 },
    markers: [
      { type: 'host', side: 'qi', x: 332, y: 128, t: 0.02, name: '田忌', lx: 318, ly: 140, anchor: 'end' },
      { type: 'army', side: 'qi', x: 292, y: 142, t: 0.42, name: '孙膑', lx: 298, ly: 128, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'wei', x: 150, y: 210, t: 0.02, name: '庞涓', lx: 136, ly: 222, anchor: 'end', moveRef: 1 }
    ],
    routes: [
      { d: 'M 326 134 C 292 142 256 150 218 156', side: 'qi', t0: 0.42, t1: 0.82,
        label: '齐军趋大梁', lx: 274, ly: 162, anchor: 'middle' },
      { d: 'M 156 206 C 176 190 196 176 210 166', side: 'wei', t0: 0.36, t1: 0.70,
        label: '魏军回师', lx: 178, ly: 196, anchor: 'middle' }
    ]
  },
  {
    label: '减灶诱敌', seal: '减灶',
    kicker: '阶段三 · 前341 年',
    title: '孙膑减灶，庞涓轻锐追击',
    turn: '齐军入魏境，孙膑令军士逐日减灶：第一日十万灶，次日五万，三日三万。庞涓以为齐军逃亡过半，弃其步军，率轻锐倍日并行追逐。',
    why: '减灶是主动示弱的信息战：让魏军相信齐军已溃散，从而脱离主力、轻兵冒进，进入齐军预设的伏击地域。',
    src: '《史记·孙子吴起列传》载「十万灶—五万灶—三万灶」；《资治通鉴》卷二。三方兵力无确载。',
    events: [
      { time: '前341', who: '齐军', text: '东撤，示弱于魏', t: 0.08 },
      { time: '前341', who: '孙膑', text: '令为十万灶', t: 0.26 },
      { time: '前341', who: '孙膑', text: '次日为五万灶，再日为三万灶', t: 0.52 },
      { time: '前341', who: '庞涓', text: '以为齐军逃亡，弃步军轻锐追击', t: 0.82 }
    ],
    nums: [
      { label: '齐军灶数', value: '十万→三万', kind: '史载', n: null },
      { label: '齐军兵力', value: '无确载', kind: '无确载', n: null },
      { label: '魏军兵力', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE3,
    flips: { maling: 0.70 },
    markers: [
      { type: 'host', side: 'qi', x: 218, y: 152, t: 0.02, name: '孙膑', lx: 204, ly: 164, anchor: 'end', moveRef: 0 },
      { type: 'host', side: 'wei', x: 212, y: 160, t: 0.08, name: '庞涓', lx: 198, ly: 172, anchor: 'end', moveRef: 1 },
      { type: 'army', side: 'qi', x: 256, y: 104, t: 0.62, name: '齐军', lx: 242, ly: 116, anchor: 'end' }
    ],
    routes: [
      { d: 'M 216 154 C 232 136 244 116 254 102', side: 'retreat', t0: 0.10, t1: 0.62,
        label: '齐军佯退', lx: 240, ly: 140, anchor: 'start' },
      { d: 'M 214 164 C 228 148 240 124 250 106', side: 'wei', t0: 0.66, t1: 0.92,
        label: '庞涓追击', lx: 232, ly: 132, anchor: 'start' }
    ]
  },
  {
    label: '马陵之战', seal: '马陵',
    kicker: '阶段四 · 前341 年',
    title: '马陵伏发，庞涓自刎',
    turn: '齐军伏于马陵道，斫大树白而书「庞涓死于此树之下」，令善射者夹道而伏，约「暮见火举而俱发」。庞涓夜至，举火读字，齐军万弩齐发，魏军大乱，庞涓自刎，太子申被虏。',
    why: '马陵道狭，魏军轻锐失去阵列与纵深；齐军以地形与夜暗完成一次典型的伏击歼灭战。魏国精锐尽失，霸权让于齐、秦。',
    src: '《史记·孙子吴起列传》《魏世家》；《资治通鉴》卷二。「庞涓死于此树之下」为史载。',
    events: [
      { time: '前341', who: '齐军', text: '伏于马陵道，夹道设弩', t: 0.06 },
      { time: '前341', who: '庞涓', text: '夜至马陵，举火读树', t: 0.32 },
      { time: '前341', who: '齐军', text: '万弩齐发，魏军大乱', t: 0.56, kind: 'flip', city: 'maling' },
      { time: '前341', who: '庞涓', text: '兵败自刎', t: 0.76 },
      { time: '前341', who: '齐军', text: '虏魏太子申', t: 0.92 }
    ],
    nums: [
      { label: '齐军', value: '无确载', kind: '无确载', n: null },
      { label: '魏军', value: '无确载', kind: '无确载', n: null },
      { label: '结局', value: '庞涓死，太子申虏', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { maling: 0.56 },
    sieges: [
      { x: 260, y: 96, t: 0.56, label: '马陵伏击', side: 'qi', lx: 14, ly: 12, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'qi', x: 260, y: 96, t: 0.02, name: '孙膑', lx: 246, ly: 84, anchor: 'end' },
      { type: 'army', side: 'qi', x: 268, y: 104, t: 0.48, name: '齐军伏兵', lx: 282, ly: 116, anchor: 'start' },
      { type: 'army', side: 'wei', x: 258, y: 100, t: 0.02, name: '庞涓', lx: 244, ly: 112, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 252 106 C 256 102 260 100 264 98', side: 'qi', t0: 0.48, t1: 0.72,
        label: '万弩齐发', lx: 276, ly: 88, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 190 C 70 184 140 194 210 188 C 280 182 330 174 385 178', color: '#a8b6ab', width: 3 },
    { d: 'M 236 60 C 244 100 252 140 258 186', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 190 46 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 300 40 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 60 290 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 286 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 20, y: 180, t: '黄　河', size: 10, color: '#46594f', ls: 3, serif: true },
    { x: 270, y: 72, t: '马 陵 道', size: 8.5, color: '#7d6647', ls: 1, serif: true, rotate: 52 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '马陵·今山东莘县西南（一说河南范县西南）', size: 7.5, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '中 原', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'maling',
  title: '马陵之战',
  kicker: '沙 盘 推 演',
  subtitle: '马陵 · 大梁',
  years: '前341',
  yearUnit: '',
  era: '战国 · 周显王二十八年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝伏击 ｜ 易＝易手 ｜ 虚线＝佯退',
  note: '示意沙盘：马陵今山东莘县西南，非真实地理比例',
  hook: '减灶诱敌：孙膑设伏马陵，庞涓自刎，魏国精锐尽失',
  period: '战国',
  yearValue: -341,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '齐', b: '胜', sub: '前341' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
