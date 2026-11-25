/**
 * 沙盘推演 · 井陉之战（前204）
 * 通行叙事：韩信东下井陉、李左车献策、背水列阵、赵壁易帜、斩陈余擒赵王。
 * 韩信「不过数万」、赵军「号二十万」、轻骑二千、背水万人均为史载。
 * 地名古今对照：井陉今河北井陉北、萆山今河北鹿泉南、泜水今河北元氏南。
 */
var COLOR = { han: '#2b5262', zhao: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'changshan', name: '常山', x: 100, y: 96,  tx: 100, ty: 82,  anchor: 'middle' },
  { id: 'jingxing',  name: '井陉', x: 158, y: 132, tx: 144, ty: 142, anchor: 'end' },
  { id: 'bishan',    name: '萆山', x: 184, y: 112, tx: 184, ty: 98,  anchor: 'middle' },
  { id: 'zhaobi',    name: '赵壁', x: 202, y: 158, tx: 216, ty: 152, anchor: 'start' },
  { id: 'zhishui',   name: '泜水', x: 238, y: 196, tx: 252, ty: 202, anchor: 'start' },
  { id: 'handan',    name: '邯郸', x: 258, y: 252, tx: 258, ty: 268, anchor: 'middle' }
];

var BASE0 = { changshan: 'han', jingxing: 'zhao', bishan: 'zhao', zhaobi: 'zhao', zhishui: 'zhao', handan: 'zhao' };
var BASE3 = { changshan: 'han', jingxing: 'zhao', bishan: 'zhao', zhaobi: 'han', zhishui: 'zhao', handan: 'zhao' };
var BASE5 = { changshan: 'han', jingxing: 'han', bishan: 'han', zhaobi: 'han', zhishui: 'han', handan: 'han' };

var STAGES = [
  {
    label: '韩信东下', seal: '东进',
    kicker: '阶段一 · 前205 年',
    title: '韩信、张耳东下井陉',
    turn: '韩信、张耳率数万东下井陉击赵；赵王歇、陈余聚兵井陉口，号二十万，据险以待。',
    why: '井陉口是太行山东出的险隘，赵军以逸待劳、以众待寡；汉军劳师远征，补给线漫长。',
    src: '《史记·淮阴侯列传》；《资治通鉴》卷九。「不过数万」「号二十万」为史载。',
    events: [
      { time: '前205', who: '韩信', text: '与张耳率数万东下井陉', t: 0.08 },
      { time: '前205', who: '赵王歇', text: '与陈余聚兵井陉口', t: 0.34 },
      { time: '前205', who: '赵军', text: '号二十万，据险以待', t: 0.58 },
      { time: '前205', who: '汉军', text: '不过数万，悬军深入', t: 0.84 }
    ],
    nums: [
      { label: '韩信军', value: '数万', kind: '史载', n: 30 },
      { label: '赵军', value: '号二十万', kind: '史载', n: 200 },
      { label: '井陉口', value: '险隘', kind: '史载', n: null }
    ],
    hold: BASE0,
    markers: [
      { type: 'host', side: 'han', x: 100, y: 96, t: 0.02, name: '韩信', lx: 114, ly: 90, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'zhao', x: 158, y: 132, t: 0.02, name: '陈余', lx: 144, ly: 124, anchor: 'end' },
      { type: 'host', side: 'zhao', x: 258, y: 252, t: 0.02, name: '赵王歇', lx: 272, ly: 246, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 106 102 C 122 112 140 124 152 130', side: 'han', t0: 0.06, t1: 0.44,
        label: '汉军东进', lx: 112, ly: 122, anchor: 'start' }
    ]
  },
  {
    label: '左车献策', seal: '献策',
    kicker: '阶段二 · 前204 年',
    title: '李左车献策，陈余不听',
    turn: '广武君李左车说陈余：请奇兵三万，从间道绝汉军辎重，深沟高垒勿与战，使汉军前不得斗、退不得还。陈余自称义兵，不用诈谋奇计，不听。',
    why: '赵军若坚守并断粮道，汉军悬军深入必困；陈余以「义兵」自限，把唯一稳胜之策放弃。',
    src: '《史记·淮阴侯列传》；《资治通鉴》卷九。「奇兵三万」「义兵不用诈谋」为史载。',
    events: [
      { time: '前204', who: '李左车', text: '献策：奇兵绝汉粮道', t: 0.08 },
      { time: '前204', who: '李左车', text: '请兵三万，从间道出', t: 0.32 },
      { time: '前204', who: '陈余', text: '自称义兵，不用诈谋', t: 0.58 },
      { time: '前204', who: '韩信', text: '闻之喜，遂敢深入', t: 0.84 }
    ],
    nums: [
      { label: '李左车请兵', value: '三万', kind: '史载', n: 30 },
      { label: '赵军', value: '号二十万', kind: '史载', n: 200 },
      { label: '汉军', value: '数万', kind: '史载', n: 30 }
    ],
    hold: BASE0,
    markers: [
      { type: 'host', side: 'zhao', x: 158, y: 132, t: 0.02, name: '陈余', lx: 144, ly: 142, anchor: 'end' },
      { type: 'army', side: 'zhao', x: 170, y: 144, t: 0.30, name: '李左车', lx: 184, ly: 138, anchor: 'start' },
      { type: 'host', side: 'han', x: 100, y: 96, t: 0.02, name: '韩信', lx: 86, ly: 104, anchor: 'end', weak: true }
    ],
    routes: []
  },
  {
    label: '背水列阵', seal: '背水',
    kicker: '阶段三 · 前204 年',
    title: '韩信背水列阵，轻骑伏萆山',
    turn: '韩信夜半传发，选轻骑二千人，人持一赤帜，从间道伏于萆山；又遣万人先行，出背水阵。赵军望见，皆大笑。',
    why: '背水阵把汉军退路切断，逼士卒死战；伏兵则瞄准赵军倾巢而出后的空壁。',
    src: '《史记·淮阴侯列传》；《资治通鉴》卷九。轻骑二千、万人背水为史载。',
    events: [
      { time: '前204', who: '韩信', text: '夜半传发', t: 0.08 },
      { time: '前204', who: '二千骑', text: '持赤帜，从间道伏萆山', t: 0.32 },
      { time: '前204', who: '万人', text: '先行，出背水阵', t: 0.58 },
      { time: '前204', who: '赵军', text: '望见背水阵，皆大笑', t: 0.84 }
    ],
    nums: [
      { label: '汉轻骑', value: '二千', kind: '史载', n: 2 },
      { label: '背水军', value: '万人', kind: '史载', n: 10 },
      { label: '赵军', value: '号二十万', kind: '史载', n: 200 }
    ],
    hold: BASE0,
    markers: [
      { type: 'host', side: 'han', x: 184, y: 112, t: 0.30, name: '二千骑', lx: 198, ly: 106, anchor: 'start' },
      { type: 'army', side: 'han', x: 202, y: 158, t: 0.56, name: '背水军', lx: 216, ly: 166, anchor: 'start' },
      { type: 'host', side: 'zhao', x: 158, y: 132, t: 0.02, name: '陈余', lx: 144, ly: 124, anchor: 'end' }
    ],
    routes: [
      { d: 'M 112 102 C 138 104 164 108 180 110', side: 'han', t0: 0.24, t1: 0.52,
        label: '间道伏兵', lx: 138, ly: 116, anchor: 'middle' }
    ]
  },
  {
    label: '赵壁易帜', seal: '易帜',
    kicker: '阶段四 · 前204 年',
    title: '赵军空壁逐利，汉骑易帜',
    turn: '韩信建大将旗鼓，出井陉口；赵军出战，韩信佯败，走入背水阵。赵军倾壁逐利，二千骑驰入赵壁，拔赵帜，立汉赤帜。',
    why: '赵军一旦离开坚壁，人数优势在狭窄山地难以展开；空壁被占，赵军心理防线先于阵线崩溃。',
    src: '《史记·淮阴侯列传》；《资治通鉴》卷九。「空壁逐利」「立汉赤帜」为史载。',
    events: [
      { time: '前204', who: '韩信', text: '建大将旗鼓，出井陉口', t: 0.08 },
      { time: '前204', who: '赵军', text: '倾壁逐利，壁中空虚', t: 0.34 },
      { time: '前204', who: '二千骑', text: '驰入赵壁，拔赵帜', t: 0.58, kind: 'flip', city: 'zhaobi' },
      { time: '前204', who: '汉军', text: '立汉赤帜，赵壁尽赤', t: 0.84 }
    ],
    nums: [
      { label: '汉军', value: '数万', kind: '史载', n: 30 },
      { label: '赵军', value: '号二十万', kind: '史载', n: 200 },
      { label: '赵壁', value: '易帜', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { zhaobi: 0.58 },
    markers: [
      { type: 'host', side: 'han', x: 202, y: 158, t: 0.02, name: '韩信', lx: 216, ly: 152, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'han', x: 186, y: 120, t: 0.54, name: '二千骑', lx: 200, ly: 114, anchor: 'start' },
      { type: 'army', side: 'zhao', x: 190, y: 150, t: 0.30, name: '赵军', lx: 176, ly: 160, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 206 154 C 198 146 190 136 186 128', side: 'han', t0: 0.06, t1: 0.36,
        label: '汉军挑战', lx: 214, ly: 138, anchor: 'start' },
      { d: 'M 188 116 C 194 128 198 140 200 150', side: 'han', t0: 0.54, t1: 0.80,
        label: '驰入赵壁', lx: 176, ly: 134, anchor: 'end' }
    ]
  },
  {
    label: '破赵斩陈余', seal: '破赵',
    kicker: '阶段五 · 前204 年',
    title: '汉军夹击，斩陈余，擒赵王',
    turn: '赵军还壁，见壁中皆汉赤帜，大惊，阵脚大乱；汉军夹击，大破赵军，斩陈余于泜水，擒赵王歇，赵国灭亡。',
    why: '赵军退无所归、进不得战，二十万之众在心理崩溃后迅速瓦解；井陉一战成为「陷之死地而后生」的典型。',
    src: '《史记·淮阴侯列传》；《资治通鉴》卷九。「斩陈余于泜水」「擒赵王歇」为史载。',
    events: [
      { time: '前204', who: '赵军', text: '还壁，见汉帜，大乱', t: 0.08 },
      { time: '前204', who: '汉军', text: '夹击赵军', t: 0.32 },
      { time: '前204', who: '陈余', text: '被杀于泜水', t: 0.58, kind: 'flip', city: 'zhishui' },
      { time: '前204', who: '赵王歇', text: '被擒，赵亡', t: 0.84, kind: 'flip', city: 'handan' }
    ],
    nums: [
      { label: '汉军', value: '数万', kind: '史载', n: 30 },
      { label: '赵军', value: '号二十万', kind: '史载', n: 200 },
      { label: '陈余', value: '死', kind: '史载', n: null }
    ],
    hold: BASE5,
    flips: { zhishui: 0.58, handan: 0.84 },
    sieges: [
      { x: 238, y: 196, t: 0.58, label: '泜水斩陈余', side: 'han', lx: -12, ly: 12, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'han', x: 202, y: 158, t: 0.02, name: '韩信', lx: 188, ly: 170, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'han', x: 238, y: 196, t: 0.52, name: '汉军', lx: 252, ly: 190, anchor: 'start' },
      { type: 'army', side: 'zhao', x: 232, y: 190, t: 0.02, name: '赵军', lx: 218, ly: 200, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 206 162 C 218 174 230 186 236 192', side: 'han', t0: 0.24, t1: 0.58,
        label: '夹击赵军', lx: 214, ly: 184, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 166 C 60 160 120 170 180 164 C 240 158 300 152 385 156', color: '#a8b6ab', width: 2.4 },
    { d: 'M 52 40 C 78 90 98 140 106 196', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 66 58 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 74 76 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.7 },
    { d: 'M 46 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 316 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 58, y: 54, t: '太 行 山', size: 9, color: '#46594f', ls: 2, serif: true, rotate: 74 },
    { x: 24, y: 162, t: '绵 蔓 水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '井陉·今河北井陉北　萆山·今河北鹿泉南　泜水·今河北元氏南', size: 7.2, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '太 行 东 麓', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'jingxing',
  title: '井陉之战',
  kicker: '沙 盘 推 演',
  subtitle: '井陉 · 泜水',
  years: '前204',
  yearUnit: '',
  era: '西汉 · 高祖三年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：井陉今河北井陉北、泜水今河北元氏南，非真实地理比例',
  hook: '韩信背水列阵、轻骑易帜，数万破赵二十万',
  period: '西汉',
  yearValue: -204,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '汉', b: '破赵', sub: '前204' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
