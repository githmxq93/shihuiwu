/**
 * 沙盘推演 · 白登之围（前200）
 * 通行叙事：韩王信叛降、刘邦亲征、轻敌冒进、白登被围七日、陈平秘计解围、汉匈和亲。
 * 汉军三十二万、匈奴四十万骑、被围七日均为史载；匈奴兵力数字有夸大之疑，照录并标注。
 * 地名古今对照：平城今山西大同、白登今山西大同东北、晋阳今山西太原西南。
 */
var COLOR = { han: '#2b5262', xiongnu: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'jinyang',   name: '晋阳', x: 96,  y: 244, tx: 96,  ty: 260, anchor: 'middle' },
  { id: 'mayi',      name: '马邑', x: 140, y: 148, tx: 126, ty: 144, anchor: 'end' },
  { id: 'yanmen',    name: '雁门', x: 170, y: 174, tx: 170, ty: 190, anchor: 'middle' },
  { id: 'guangwu',   name: '广武', x: 168, y: 210, tx: 154, ty: 220, anchor: 'end' },
  { id: 'pingcheng', name: '平城', x: 216, y: 124, tx: 216, ty: 140, anchor: 'middle' },
  { id: 'baideng',   name: '白登', x: 246, y: 100, tx: 260, ty: 94,  anchor: 'start' }
];

var STAGES = [
  {
    label: '韩王信叛', seal: '叛降',
    kicker: '阶段一 · 前201 年',
    title: '韩王信降匈奴',
    turn: '韩王信都马邑，匈奴冒顿单于率兵围之；韩王信数遣使求和，汉廷疑其贰，遣使责让。韩王信惧诛，遂降匈奴，与匈奴共攻汉。',
    why: '汉初异姓诸侯王与中央互信脆弱，匈奴的军事压力把这种猜忌变成叛降；北疆门户由此洞开。',
    src: '《史记·韩信卢绾列传》《匈奴列传》；《资治通鉴》卷十一。',
    events: [
      { time: '前201', who: '冒顿', text: '率兵围马邑', t: 0.08 },
      { time: '前201', who: '韩王信', text: '数遣使求和于匈奴', t: 0.32 },
      { time: '前201', who: '汉廷', text: '疑其贰，遣使责让', t: 0.58 },
      { time: '前201', who: '韩王信', text: '惧诛，降匈奴', t: 0.84 }
    ],
    nums: [
      { label: '韩王信军', value: '无确载', kind: '无确载', n: null },
      { label: '匈奴军', value: '无确载', kind: '无确载', n: null },
      { label: '马邑', value: '被围', kind: '史载', n: null }
    ],
    markers: [
      { type: 'host', side: 'xiongnu', x: 176, y: 110, t: 0.06, name: '冒顿', lx: 162, ly: 102, anchor: 'end' },
      { type: 'host', side: 'han', x: 140, y: 148, t: 0.02, name: '韩王信', lx: 126, ly: 160, anchor: 'end',
        nameSwaps: [{ t: 0.84, to: '韩王信·降' }] },
      { type: 'army', side: 'xiongnu', x: 158, y: 132, t: 0.60, name: '匈奴军', lx: 172, ly: 126, anchor: 'start' }
    ],
    routes: [
      { d: 'M 180 112 C 168 122 156 134 146 144', side: 'xiongnu', t0: 0.06, t1: 0.40,
        label: '匈奴围马邑', lx: 172, ly: 136, anchor: 'start' }
    ],
    sieges: [
      { x: 140, y: 148, t: 0.10, label: '马邑被围', side: 'xiongnu', lx: 0, ly: -12, anchor: 'middle' }
    ]
  },
  {
    label: '刘邦亲征', seal: '北征',
    kicker: '阶段二 · 前200 年 冬',
    title: '刘邦率三十二万北征',
    turn: '汉高祖刘邦亲率三十二万大军北击匈奴，破韩王信于铜鞮，韩王信亡走匈奴；汉军连战连胜，进至晋阳。',
    why: '汉廷试图以一场决战解决北疆问题；连胜之下，刘邦对匈奴主力的判断开始失真。',
    src: '《史记·高祖本纪》《匈奴列传》；《资治通鉴》卷十一。三十二万为史载。',
    events: [
      { time: '前200·冬', who: '刘邦', text: '亲率三十二万北征', t: 0.08 },
      { time: '前200·冬', who: '汉军', text: '破韩王信于铜鞮', t: 0.32 },
      { time: '前200·冬', who: '韩王信', text: '亡走匈奴', t: 0.58 },
      { time: '前200·冬', who: '汉军', text: '连战连胜，进至晋阳', t: 0.84 }
    ],
    nums: [
      { label: '汉军', value: '三十二万', kind: '史载', n: 320 },
      { label: '韩王信军', value: '无确载', kind: '无确载', n: null },
      { label: '匈奴军', value: '无确载', kind: '无确载', n: null }
    ],
    markers: [
      { type: 'host', side: 'han', x: 96, y: 244, t: 0.02, name: '刘邦', lx: 110, ly: 238, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'han', x: 132, y: 170, t: 0.62, name: '汉军', lx: 118, ly: 164, anchor: 'end' },
      { type: 'army', side: 'xiongnu', x: 176, y: 126, t: 0.58, name: '韩王信', lx: 190, ly: 120, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 100 236 C 112 210 124 186 136 166', side: 'han', t0: 0.06, t1: 0.56,
        label: '汉军北上', lx: 104, ly: 200, anchor: 'start' }
    ]
  },
  {
    label: '轻敌冒进', seal: '轻敌',
    kicker: '阶段三 · 前200 年 冬',
    title: '娄敬谏止，刘邦械系之',
    turn: '刘邦遣斥候觇匈奴，冒顿匿其壮士肥牛马，示以羸弱；娄敬谏曰「此必欲见短，伏奇兵以争利」，刘邦怒，械系娄敬，先至平城。',
    why: '匈奴以「示弱」诱敌，汉军情报被刻意塑造；刘邦的连胜心理与轻敌判断，使前锋脱离主力。',
    src: '《史记·刘敬叔孙通列传》《匈奴列传》；《资治通鉴》卷十一。「匿其壮士肥牛马」为史载。',
    events: [
      { time: '前200·冬', who: '刘邦', text: '遣斥候觇匈奴', t: 0.08 },
      { time: '前200·冬', who: '冒顿', text: '匿壮士肥马，示以羸弱', t: 0.32 },
      { time: '前200·冬', who: '娄敬', text: '谏不可击，此必伏奇兵', t: 0.58 },
      { time: '前200·冬', who: '刘邦', text: '怒，械系娄敬，先至平城', t: 0.84 }
    ],
    nums: [
      { label: '汉前锋', value: '无确载', kind: '无确载', n: null },
      { label: '匈奴军', value: '无确载', kind: '无确载', n: null },
      { label: '娄敬', value: '谏止', kind: '史载', n: null }
    ],
    markers: [
      { type: 'host', side: 'han', x: 168, y: 210, t: 0.02, name: '刘邦', lx: 154, ly: 222, anchor: 'end', moveRef: 0 },
      { type: 'host', side: 'xiongnu', x: 216, y: 124, t: 0.02, name: '冒顿', lx: 202, ly: 116, anchor: 'end', weak: true },
      { type: 'army', side: 'han', x: 200, y: 168, t: 0.70, name: '汉前锋', lx: 214, ly: 162, anchor: 'start' }
    ],
    routes: [
      { d: 'M 172 206 C 186 188 200 168 210 140', side: 'han', t0: 0.66, t1: 0.94,
        label: '汉军先至', lx: 186, ly: 178, anchor: 'start' }
    ]
  },
  {
    label: '白登被围', seal: '被围',
    kicker: '阶段四 · 前200 年 冬',
    title: '冒顿四十万骑围白登七日',
    turn: '冒顿纵精骑四十万围白登，西方尽白马、东方尽青駹、北方尽乌骊、南方尽骍马；汉军被围七日，内外不通。',
    why: '匈奴以绝对骑兵优势完成合围，汉军步骑混编、粮道被断；刘邦本人陷入重围，汉廷面临开国以来最大危机。',
    src: '《史记·匈奴列传》《高祖本纪》；《资治通鉴》卷十一。四十万骑、七日为史载。',
    events: [
      { time: '前200·冬', who: '冒顿', text: '纵精骑四十万围白登', t: 0.08 },
      { time: '前200·冬', who: '匈奴', text: '四面列骑，色各不同', t: 0.32 },
      { time: '前200·冬', who: '汉军', text: '被围七日，内外不通', t: 0.58 },
      { time: '前200·冬', who: '陈平', text: '献秘计', t: 0.84 }
    ],
    nums: [
      { label: '匈奴军', value: '四十万骑', kind: '史载', n: 400 },
      { label: '汉军', value: '三十二万', kind: '史载', n: 320 },
      { label: '被围', value: '七日', kind: '史载', n: null }
    ],
    sieges: [
      { x: 246, y: 100, t: 0.10, label: '白登被围', side: 'xiongnu', lx: 0, ly: -12, anchor: 'middle' }
    ],
    markers: [
      { type: 'host', side: 'han', x: 246, y: 100, t: 0.02, name: '刘邦', lx: 232, ly: 112, anchor: 'end', weak: true },
      { type: 'host', side: 'xiongnu', x: 216, y: 124, t: 0.02, name: '冒顿', lx: 202, ly: 116, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'xiongnu', x: 232, y: 86, t: 0.30, name: '匈奴骑兵', lx: 246, ly: 78, anchor: 'start' }
    ],
    routes: [
      { d: 'M 220 120 C 228 110 236 104 242 100', side: 'xiongnu', t0: 0.06, t1: 0.40,
        label: '合围白登', lx: 224, ly: 108, anchor: 'end' }
    ]
  },
  {
    label: '解围和亲', seal: '解围',
    kicker: '阶段五 · 前200 年 冬',
    title: '陈平秘计解围，汉匈和亲',
    turn: '陈平厚遗阏氏，阏氏劝冒顿解围；匈奴开围一角，汉军得出。刘邦还，赦娄敬，遣使与匈奴和亲。',
    why: '汉廷无力在漠南与匈奴决战，只能以外交与和亲换取边境安定；汉初七十年对匈战略由此定型。',
    src: '《史记·匈奴列传》《刘敬叔孙通列传》；《资治通鉴》卷十一。秘计内容史载不详。',
    events: [
      { time: '前200·冬', who: '陈平', text: '厚遗阏氏', t: 0.08 },
      { time: '前200·冬', who: '阏氏', text: '劝冒顿解围', t: 0.32 },
      { time: '前200·冬', who: '匈奴', text: '开围一角，汉军得出', t: 0.58 },
      { time: '前200·冬', who: '刘邦', text: '还，遣使和亲', t: 0.84 }
    ],
    nums: [
      { label: '汉军', value: '三十二万', kind: '史载', n: 320 },
      { label: '匈奴军', value: '四十万骑', kind: '史载', n: 400 },
      { label: '和亲', value: '定策', kind: '史载', n: null }
    ],
    markers: [
      { type: 'host', side: 'han', x: 246, y: 100, t: 0.02, name: '刘邦', lx: 232, ly: 92, anchor: 'end' },
      { type: 'host', side: 'xiongnu', x: 216, y: 124, t: 0.02, name: '冒顿', lx: 202, ly: 132, anchor: 'end', weak: true },
      { type: 'army', side: 'han', x: 168, y: 210, t: 0.62, name: '汉军', lx: 182, ly: 204, anchor: 'start' }
    ],
    routes: [
      { d: 'M 242 104 C 222 136 196 176 174 204', side: 'retreat', t0: 0.54, t1: 0.90,
        label: '汉军南还', lx: 218, ly: 152, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = {};

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 196 C 60 190 120 200 180 194 C 240 188 300 182 385 186', color: '#a8b6ab', width: 2.6 },
    { d: 'M 186 60 C 190 110 194 150 198 200', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 64 64 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 74 80 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 60 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 306 296 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 178, y: 56, t: '阴 山', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 192, t: '黄　河', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '平城·今山西大同　白登·今山西大同东北　晋阳·今山西太原西南', size: 7.2, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '代 北 边 塞', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'baideng',
  title: '白登之围',
  kicker: '沙 盘 推 演',
  subtitle: '平城 · 白登',
  years: '前200',
  yearUnit: '',
  era: '西汉 · 高祖七年',
  mapNote: '旗＝军势 ｜ 城点＝地点 ｜ 圈＝围困 ｜ 虚线＝退却',
  note: '示意沙盘：平城今山西大同、白登今山西大同东北，非真实地理比例',
  hook: '刘邦三十二万北征，轻敌冒进，白登被匈奴四十万骑围七日',
  period: '西汉',
  yearValue: -200,
  cityMode: 'neutral',
  hideFocus: true,
  endSeal: { a: '汉', b: '解围', sub: '前200' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
