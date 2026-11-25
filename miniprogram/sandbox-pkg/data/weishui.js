/**
 * 沙盘推演 · 潍水之战（前203）
 * 通行叙事：齐楚联兵、龙且轻敌、韩信囊沙壅水、半渡决水、斩龙且虏田广。
 * 龙且「号二十万」为史载；韩信军与齐军兵力无确载。
 * 地名古今对照：高密今山东高密西南、潍水今山东潍河、临淄今山东淄博东北。
 */
var COLOR = { han: '#2b5262', chu: '#6f3a22', qi: '#7a4a1a', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'linzi',     name: '临淄', x: 292, y: 118, tx: 292, ty: 104, anchor: 'middle' },
  { id: 'gaomi',     name: '高密', x: 238, y: 164, tx: 224, ty: 172, anchor: 'end' },
  { id: 'weishui',   name: '潍水', x: 218, y: 196, tx: 204, ty: 206, anchor: 'end' },
  { id: 'chengyang', name: '城阳', x: 270, y: 220, tx: 270, ty: 236, anchor: 'middle' },
  { id: 'ju',        name: '莒',   x: 306, y: 188, tx: 306, ty: 204, anchor: 'middle' },
  { id: 'pengcheng', name: '彭城', x: 122, y: 258, tx: 122, ty: 274, anchor: 'middle' }
];

var BASE0 = { linzi: 'han', gaomi: 'qi', weishui: 'qi', chengyang: 'qi', ju: 'qi', pengcheng: 'chu' };
var BASE4 = { linzi: 'han', gaomi: 'qi', weishui: 'contested', chengyang: 'qi', ju: 'qi', pengcheng: 'chu' };
var BASE5 = { linzi: 'han', gaomi: 'han', weishui: 'han', chengyang: 'han', ju: 'han', pengcheng: 'chu' };

var STAGES = [
  {
    label: '齐楚联兵', seal: '联兵',
    kicker: '阶段一 · 前203 年',
    title: '龙且率二十万救齐',
    turn: '韩信袭破临淄，齐王田广走高密，求救于楚；项羽遣龙且率军救齐，号二十万，与田广合军于高密。',
    why: '齐楚合兵，希望在潍水一线遏止汉军东进；汉军客场作战，最怕的是旷日持久的消耗。',
    src: '《史记·淮阴侯列传》《田儋列传》；《资治通鉴》卷十。「号二十万」为史载。',
    events: [
      { time: '前203', who: '韩信', text: '袭破临淄', t: 0.08, kind: 'flip', city: 'linzi' },
      { time: '前203', who: '田广', text: '走高密，求救于楚', t: 0.32 },
      { time: '前203', who: '项羽', text: '遣龙且率军救齐', t: 0.58 },
      { time: '前203', who: '龙且', text: '与田广合军高密', t: 0.84 }
    ],
    nums: [
      { label: '龙且军', value: '号二十万', kind: '史载', n: 200 },
      { label: '韩信军', value: '无确载', kind: '无确载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE0,
    flips: { linzi: 0.08 },
    markers: [
      { type: 'host', side: 'han', x: 292, y: 118, t: 0.02, name: '韩信', lx: 306, ly: 112, anchor: 'start' },
      { type: 'host', side: 'qi', x: 238, y: 164, t: 0.02, name: '田广', lx: 224, ly: 156, anchor: 'end', weak: true },
      { type: 'host', side: 'chu', x: 160, y: 240, t: 0.54, name: '龙且', lx: 174, ly: 246, anchor: 'start' }
    ],
    routes: [
      { d: 'M 166 246 C 186 224 210 192 232 172', side: 'chu', t0: 0.56, t1: 0.86,
        label: '楚军东援', lx: 190, ly: 216, anchor: 'start' }
    ]
  },
  {
    label: '龙且轻敌', seal: '轻敌',
    kicker: '阶段二 · 前203 年',
    title: '或劝深壁，龙且不从',
    turn: '有人劝说龙且：汉军远斗穷战，其锋不可当；齐、楚自守其地，汉军客居，久则粮尽，可不战而降。龙且以为受诏救齐，不战而受降无功，遂决意速战。',
    why: '龙且否定了唯一稳妥的持久之策，选择在潍水与韩信决战；战场主动权由此交到汉军手里。',
    src: '《史记·淮阴侯列传》；《资治通鉴》卷十。「不战而降」「龙且不从」为史载。',
    events: [
      { time: '前203', who: '或人', text: '劝龙且深壁勿战，绝汉粮道', t: 0.08 },
      { time: '前203', who: '或人', text: '汉军客居，久则粮尽', t: 0.32 },
      { time: '前203', who: '龙且', text: '以为不战无功，不从', t: 0.58 },
      { time: '前203', who: '龙且', text: '遂决意与汉军决战', t: 0.84 }
    ],
    nums: [
      { label: '楚军', value: '号二十万', kind: '史载', n: 200 },
      { label: '汉军', value: '无确载', kind: '无确载', n: null },
      { label: '齐军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE0,
    markers: [
      { type: 'host', side: 'chu', x: 238, y: 168, t: 0.02, name: '龙且', lx: 252, ly: 162, anchor: 'start' },
      { type: 'host', side: 'qi', x: 244, y: 176, t: 0.02, name: '田广', lx: 230, ly: 186, anchor: 'end', weak: true },
      { type: 'host', side: 'han', x: 292, y: 118, t: 0.02, name: '韩信', lx: 278, ly: 126, anchor: 'end', weak: true }
    ],
    routes: []
  },
  {
    label: '囊沙壅水', seal: '壅水',
    kicker: '阶段三 · 前203 年',
    title: '韩信夜壅潍水',
    turn: '韩信夜令人为万余囊，盛沙以壅潍水上游；引军半渡击龙且，佯败而还。',
    why: '韩信把河流变成可控制的战场机关：上游蓄水，待敌半渡再放水，以水代兵分割楚军。',
    src: '《史记·淮阴侯列传》；《资治通鉴》卷十。「万余囊，盛沙，壅水上流」为史载。',
    events: [
      { time: '前203', who: '韩信', text: '夜令人为万余囊', t: 0.08 },
      { time: '前203', who: '汉军', text: '盛沙壅潍水上游', t: 0.34 },
      { time: '前203', who: '韩信', text: '引军半渡，击龙且', t: 0.58 },
      { time: '前203', who: '韩信', text: '佯败而还', t: 0.84 }
    ],
    nums: [
      { label: '沙囊', value: '万余', kind: '史载', n: 10 },
      { label: '楚军', value: '号二十万', kind: '史载', n: 200 },
      { label: '汉军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE0,
    markers: [
      { type: 'host', side: 'han', x: 218, y: 196, t: 0.02, name: '韩信', lx: 204, ly: 208, anchor: 'end', moveRef: 0 },
      { type: 'host', side: 'chu', x: 238, y: 168, t: 0.02, name: '龙且', lx: 252, ly: 162, anchor: 'start' },
      { type: 'army', side: 'han', x: 214, y: 184, t: 0.50, name: '汉军', lx: 200, ly: 176, anchor: 'end' }
    ],
    routes: [
      { d: 'M 224 190 C 228 178 232 172 236 168', side: 'han', t0: 0.54, t1: 0.80,
        label: '半渡挑战', lx: 214, ly: 180, anchor: 'end' }
    ]
  },
  {
    label: '半渡决水', seal: '决水',
    kicker: '阶段四 · 前203 年',
    title: '龙且渡水追击，韩信决壅',
    turn: '龙且见汉军败走，果大喜，渡水追击；韩信决壅囊，水大至，龙且军大半不得渡。',
    why: '楚军被河流切成两段，已渡者失去后援，未渡者无法展开；数量优势瞬间归零。',
    src: '《史记·淮阴侯列传》；《资治通鉴》卷十。「水大至，龙且军大半不得渡」为史载。',
    events: [
      { time: '前203', who: '龙且', text: '见汉军败走，渡水追击', t: 0.08 },
      { time: '前203', who: '韩信', text: '决壅囊，水大至', t: 0.36, kind: 'flip', city: 'weishui' },
      { time: '前203', who: '楚军', text: '大半不得渡，被分割', t: 0.64 },
      { time: '前203', who: '韩信', text: '回军急击', t: 0.86 }
    ],
    nums: [
      { label: '楚军', value: '号二十万', kind: '史载', n: 200 },
      { label: '已渡楚军', value: '无确载', kind: '无确载', n: null },
      { label: '汉军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE4,
    flips: { weishui: 0.36 },
    markers: [
      { type: 'host', side: 'han', x: 218, y: 196, t: 0.02, name: '韩信', lx: 232, ly: 204, anchor: 'start' },
      { type: 'host', side: 'chu', x: 222, y: 182, t: 0.02, name: '龙且', lx: 208, ly: 174, anchor: 'end', weak: true },
      { type: 'army', side: 'han', x: 226, y: 202, t: 0.60, name: '汉军', lx: 240, ly: 210, anchor: 'start' }
    ],
    routes: [
      { d: 'M 224 178 C 222 186 220 192 218 198', side: 'chu', t0: 0.06, t1: 0.34,
        label: '楚军渡水', lx: 208, ly: 190, anchor: 'end' }
    ]
  },
  {
    label: '斩龙且', seal: '破楚',
    kicker: '阶段五 · 前203 年',
    title: '韩信急击，斩龙且，虏田广',
    turn: '韩信急击已渡楚军，杀龙且；未渡楚军溃散，齐王田广走，被汉军虏获。齐地尽定。',
    why: '龙且一死，楚军救援齐国的战略彻底失败；项羽失去东线屏障，楚汉相持的天平进一步倾斜。',
    src: '《史记·淮阴侯列传》《田儋列传》；《资治通鉴》卷十。「杀龙且」「虏田广」为史载。',
    events: [
      { time: '前203', who: '韩信', text: '急击已渡楚军', t: 0.08 },
      { time: '前203', who: '龙且', text: '兵败被杀', t: 0.36 },
      { time: '前203', who: '田广', text: '走，被汉军虏获', t: 0.62, kind: 'flip', city: 'gaomi' },
      { time: '前203', who: '韩信', text: '略定齐地', t: 0.86, kind: 'flip', city: 'ju' }
    ],
    nums: [
      { label: '楚军', value: '号二十万', kind: '史载', n: 200 },
      { label: '龙且', value: '死', kind: '史载', n: null },
      { label: '齐地', value: '尽定', kind: '史载', n: null }
    ],
    hold: BASE5,
    flips: { gaomi: 0.62, ju: 0.86, chengyang: 0.86, weishui: 0.10 },
    sieges: [
      { x: 218, y: 196, t: 0.10, label: '潍水破楚', side: 'han', lx: -12, ly: 12, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'han', x: 218, y: 196, t: 0.02, name: '韩信', lx: 204, ly: 208, anchor: 'end' },
      { type: 'army', side: 'chu', x: 222, y: 184, t: 0.02, name: '龙且', lx: 208, ly: 176, anchor: 'end', weak: true },
      { type: 'host', side: 'qi', x: 238, y: 164, t: 0.02, name: '田广', lx: 252, ly: 158, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 222 200 C 230 190 234 178 236 170', side: 'han', t0: 0.06, t1: 0.44,
        label: '汉军追击', lx: 210, ly: 190, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 130 C 70 124 150 134 230 128 C 300 122 350 126 385 124', color: '#a8b6ab', width: 3 },
    { d: 'M 226 60 C 222 110 218 160 214 226', color: '#a8b6ab', width: 3 }
  ],
  lines: [
    { d: 'M 80 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 76 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 48 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 318 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 126, t: '济　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 200, y: 90, t: '潍　水', size: 9, color: '#46594f', ls: 2, serif: true, rotate: 86 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '高密·今山东高密西南　潍水·今山东潍河　临淄·今山东淄博东北', size: 7.2, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '齐 地', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'weishui',
  title: '潍水之战',
  kicker: '沙 盘 推 演',
  subtitle: '高密 · 潍水',
  years: '前203',
  yearUnit: '',
  era: '西汉 · 高祖四年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：高密今山东高密西南、潍水今山东潍河，非真实地理比例',
  hook: '韩信囊沙壅水，半渡决水，斩龙且，破齐楚联军',
  period: '西汉',
  yearValue: -203,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '汉', b: '破楚', sub: '前203' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
