/**
 * 沙盘推演 · 玉壁之战（546）
 * 通行叙事：东魏高欢倾山东之众攻西魏玉壁，韦孝宽坚守；高欢起土山、凿地道、造撞车、断水源，
 * 韦孝宽一一破解；围城五十余日不下，东魏死者七万，高欢解围退兵，不久病卒。
 * 东魏「倾山东之众」、死者「七万」为史载；西魏守军兵力无确载。
 * 地名古今对照：玉壁今山西稷山西南、蒲坂今山西永济、晋阳今山西太原。
 */
var COLOR = { xiwei: '#2b5262', dongwei: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'yubi',     name: '玉壁', x: 192, y: 186, tx: 192, ty: 202, anchor: 'middle' },
  { id: 'puban',    name: '蒲坂', x: 166, y: 164, tx: 152, ty: 158, anchor: 'end' },
  { id: 'jinyang',  name: '晋阳', x: 232, y: 92,  tx: 232, ty: 78,  anchor: 'middle' },
  { id: 'ye',       name: '邺',   x: 300, y: 128, tx: 300, ty: 114, anchor: 'middle' },
  { id: 'changan',  name: '长安', x: 104, y: 226, tx: 104, ty: 242, anchor: 'middle' }
];

var BASE0 = { yubi: 'xiwei', puban: 'dongwei', jinyang: 'dongwei', ye: 'dongwei', changan: 'xiwei' };
var BASE1 = { yubi: 'contested', puban: 'dongwei', jinyang: 'dongwei', ye: 'dongwei', changan: 'xiwei' };
var BASE2 = { yubi: 'contested', puban: 'dongwei', jinyang: 'dongwei', ye: 'dongwei', changan: 'xiwei' };
var BASE3 = { yubi: 'contested', puban: 'dongwei', jinyang: 'dongwei', ye: 'dongwei', changan: 'xiwei' };
var BASE4 = { yubi: 'xiwei', puban: 'dongwei', jinyang: 'dongwei', ye: 'dongwei', changan: 'xiwei' };

var STAGES = [
  {
    label: '高欢围玉壁', seal: '倾国',
    kicker: '阶段一 · 546 年 九月',
    title: '高欢倾山东之众围玉壁',
    turn: '东魏丞相高欢悉举山东之众西伐，围西魏玉壁城；西魏并州刺史韦孝宽守城。高欢连营数十里，昼夜攻城。',
    why: '玉壁扼汾水下游，是东魏西进关中的门槛；高欢欲拔此城，打开通往长安的道路。',
    src: '《周书·韦孝宽传》；《资治通鉴》卷一百五十九。「悉举山东之众」为史载。',
    events: [
      { time: '546·九月', who: '高欢', text: '悉举山东之众西伐', t: 0.08 },
      { time: '546·九月', who: '东魏军', text: '围玉壁城', t: 0.34, kind: 'flip', city: 'yubi' },
      { time: '546·九月', who: '韦孝宽', text: '率军守城', t: 0.58 },
      { time: '546·九月', who: '东魏军', text: '连营数十里，昼夜攻城', t: 0.84 }
    ],
    nums: [
      { label: '东魏军', value: '倾山东之众', kind: '史载', n: null },
      { label: '西魏守军', value: '无确载', kind: '无确载', n: null },
      { label: '玉壁', value: '被围', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { yubi: 0.34 },
    sieges: [
      { x: 192, y: 186, t: 0.34, label: '围城', side: 'dongwei', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'dongwei', x: 232, y: 92, t: 0.02, name: '高欢', lx: 246, ly: 86, anchor: 'start' },
      { type: 'host', side: 'xiwei', x: 192, y: 186, t: 0.02, name: '韦孝宽', lx: 206, ly: 180, anchor: 'start' },
      { type: 'army', side: 'dongwei', x: 210, y: 136, t: 0.34, name: '东魏军', lx: 224, ly: 130, anchor: 'start' }
    ],
    routes: [
      { d: 'M 232 98 C 222 126 208 156 198 180', side: 'dongwei', t0: 0.18, t1: 0.62,
        label: '东魏南下', lx: 216, ly: 140, anchor: 'middle' }
    ]
  },
  {
    label: '攻城诸法', seal: '攻守',
    kicker: '阶段二 · 546 年',
    title: '高欢百法攻城，韦孝宽一一破解',
    turn: '高欢起土山、凿地道、造撞车、断汾水，百计攻城；韦孝宽增高城楼、掘长堑截地道、以布幔柔撞车、掘井取水，一一化解。',
    why: '攻守双方在工程手段上反复较量，玉壁城始终不破，东魏士气与粮秣被大量消耗。',
    src: '《周书·韦孝宽传》；《资治通鉴》卷一百五十九。「地道」「撞车」诸法为史载。',
    events: [
      { time: '546', who: '高欢', text: '起土山、凿地道以攻城', t: 0.08 },
      { time: '546', who: '韦孝宽', text: '增高城楼，掘长堑截地道', t: 0.34 },
      { time: '546', who: '高欢', text: '造撞车撞城，断汾水', t: 0.58 },
      { time: '546', who: '韦孝宽', text: '布幔柔之，掘井取水', t: 0.84 }
    ],
    nums: [
      { label: '东魏军', value: '倾山东之众', kind: '史载', n: null },
      { label: '攻城', value: '五十余日', kind: '史载', n: null },
      { label: '玉壁', value: '不下', kind: '史载', n: null }
    ],
    hold: BASE2,
    markers: [
      { type: 'host', side: 'dongwei', x: 192, y: 186, t: 0.02, name: '高欢', lx: 178, ly: 198, anchor: 'end' },
      { type: 'host', side: 'xiwei', x: 192, y: 186, t: 0.02, name: '韦孝宽', lx: 206, ly: 174, anchor: 'start', weak: true },
      { type: 'army', side: 'xiwei', x: 180, y: 198, t: 0.34, name: '守军', lx: 166, ly: 192, anchor: 'end' }
    ],
    routes: []
  },
  {
    label: '劝降不成', seal: '拒降',
    kicker: '阶段三 · 546 年',
    title: '高欢病，遣人劝降不成',
    turn: '东魏苦攻不克，死者七万，高欢忧愤成疾；遣祖珽作书劝降，韦孝宽答以「孝宽关西男子，必不为降将军」。东魏军心愈摇。',
    why: '坚城不下、主帅染病，东魏已失锐气；劝降是最后的尝试，失败则只能退兵。',
    src: '《周书·韦孝宽传》；《资治通鉴》卷一百五十九。「关西男子」语为史载。',
    events: [
      { time: '546', who: '东魏军', text: '死者七万', t: 0.08 },
      { time: '546', who: '高欢', text: '忧愤成疾', t: 0.34 },
      { time: '546', who: '祖珽', text: '作书劝降', t: 0.58 },
      { time: '546', who: '韦孝宽', text: '答以必不为降将军', t: 0.84 }
    ],
    nums: [
      { label: '东魏死者', value: '七万', kind: '史载', n: 70 },
      { label: '东魏军', value: '倾山东之众', kind: '史载', n: null },
      { label: '玉壁', value: '不下', kind: '史载', n: null }
    ],
    hold: BASE3,
    markers: [
      { type: 'host', side: 'dongwei', x: 232, y: 92, t: 0.30, name: '高欢', lx: 246, ly: 86, anchor: 'start', weak: true },
      { type: 'host', side: 'xiwei', x: 192, y: 186, t: 0.02, name: '韦孝宽', lx: 206, ly: 180, anchor: 'start' },
      { type: 'army', side: 'dongwei', x: 214, y: 132, t: 0.10, name: '东魏军', lx: 228, ly: 126, anchor: 'start', weak: true }
    ],
    routes: []
  },
  {
    label: '解围退兵', seal: '解围',
    kicker: '阶段四 · 546 年 十一月',
    title: '高欢解围退兵，不久病卒',
    turn: '高欢攻城五十余日不克，乃解围退兵；东魏死者七万，军资器械弃置无数。高欢归晋阳后病笃，次年正月卒。',
    why: '玉壁一役，东魏精锐顿挫于坚城之下；高欢之死更使东西魏攻守之势发生转折。',
    src: '《周书·韦孝宽传》《北齐书·神武帝纪》；《资治通鉴》卷一百五十九。',
    events: [
      { time: '546·十一月', who: '高欢', text: '解围退兵', t: 0.08 },
      { time: '546·十一月', who: '东魏军', text: '死者七万，弃军资无数', t: 0.34 },
      { time: '546·十一月', who: '玉壁', text: '围解', t: 0.58, kind: 'flip', city: 'yubi' },
      { time: '547·正月', who: '高欢', text: '病卒于晋阳', t: 0.84 }
    ],
    nums: [
      { label: '东魏死者', value: '七万', kind: '史载', n: 70 },
      { label: '围城', value: '五十余日', kind: '史载', n: null },
      { label: '高欢', value: '病卒', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { yubi: 0.58 },
    markers: [
      { type: 'host', side: 'xiwei', x: 192, y: 186, t: 0.30, name: '韦孝宽', lx: 206, ly: 180, anchor: 'start' },
      { type: 'host', side: 'dongwei', x: 232, y: 92, t: 0.02, name: '高欢', lx: 246, ly: 86, anchor: 'start', weak: true },
      { type: 'army', side: 'dongwei', x: 206, y: 140, t: 0.10, name: '东魏军', lx: 220, ly: 134, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 198 180 C 210 154 222 124 228 100', side: 'retreat', t0: 0.08, t1: 0.56,
        label: '东魏北退', lx: 212, ly: 146, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 40 60 C 60 120 74 180 60 250 C 54 300 62 340 76 386', color: '#a8b6ab', width: 3 },
    { d: 'M -10 150 C 70 146 140 154 210 150 C 280 146 340 152 385 148', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 130 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 268 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 80 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 318 296 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 36, y: 210, t: '汾　水', size: 9, color: '#46594f', ls: 2, serif: true, rotate: 80 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '玉壁·今山西稷山西南　蒲坂·今山西永济　晋阳·今山西太原', size: 7.0, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '河　东', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'yubi',
  title: '玉壁之战',
  kicker: '沙 盘 推 演',
  subtitle: '玉壁 · 汾水',
  years: '546',
  yearUnit: 'AD',
  era: '南北朝 · 西魏大统十二年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：玉壁今山西稷山西南、蒲坂今山西永济，非真实地理比例',
  hook: '高欢倾山东之众攻玉壁，韦孝宽坚守五十余日，东魏死者七万而退',
  period: '南北朝',
  yearValue: 546,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '西魏', b: '守', sub: '546' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
