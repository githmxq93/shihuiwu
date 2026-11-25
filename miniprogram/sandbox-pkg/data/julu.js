/**
 * 沙盘推演 · 巨鹿之战（前207）
 * 通行叙事：章邯围巨鹿、宋义逗留、项羽夺军破釜沉舟、九战破秦、章邯降。
 * 秦楚双方具体兵力均无确载；仅章邯降卒二十余万为《史记》所载，不作拆分估算。
 */
var COLOR = { qin: '#6f3a22', chu: '#2b5262', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'anyang',  name: '安阳', x: 110, y: 96,  tx: 110, ty: 82,  anchor: 'middle' },
  { id: 'handan',  name: '邯郸', x: 174, y: 112, tx: 186, ty: 108, anchor: 'start' },
  { id: 'julu',    name: '巨鹿', x: 204, y: 164, tx: 204, ty: 180, anchor: 'middle' },
  { id: 'jiyuan',  name: '棘原', x: 142, y: 244, tx: 154, ty: 250, anchor: 'start' },
  { id: 'xinan',   name: '新安', x: 46,  y: 316, tx: 58,  ty: 328, anchor: 'start' }
];

var STAGES = [
  {
    label: '秦围巨鹿', seal: '围城',
    kicker: '阶段一 · 前207 年 十月',
    title: '章邯围巨鹿',
    turn: '章邯破邯郸，徙其民于河内；王离、涉间围巨鹿，诸侯军救赵者皆壁于其旁，莫敢纵兵。',
    why: '巨鹿被围，赵王歇与张耳困守；诸侯虽至却观望，秦军得以从容攻城，反秦联军面临被各个击破。',
    src: '《史记·项羽本纪》《张耳陈余列传》；《资治通鉴》卷八。',
    events: [
      { time: '前207·十月', who: '章邯', text: '破邯郸，徙民河内', t: 0.08 },
      { time: '前207·十月', who: '王离', text: '围巨鹿，绝其内外', t: 0.36 },
      { time: '前207·十月', who: '赵王歇', text: '与张耳困守巨鹿', t: 0.6 },
      { time: '前207·十月', who: '诸侯军', text: '壁于其旁，莫敢纵兵', t: 0.84 }
    ],
    nums: [
      { label: '秦军兵力', value: '无确载', kind: '无确载', n: null },
      { label: '巨鹿守军', value: '无确载', kind: '无确载', n: null },
      { label: '诸侯援军', value: '无确载', kind: '无确载', n: null }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 148, y: 234, t: 0.04, name: '章邯', lx: 160, ly: 232, anchor: 'start' },
      { type: 'host', side: 'qin', x: 204, y: 164, t: 0.34, name: '王离', lx: 216, ly: 152, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'chu', x: 268, y: 206, t: 0.70, name: '诸侯军', lx: 268, ly: 220, anchor: 'middle', weak: true }
    ],
    routes: [
      { d: 'M 146 238 C 162 216 182 190 200 172', side: 'qin', t0: 0.30, t1: 0.58,
        label: '王离围巨鹿', lx: 168, ly: 204, anchor: 'middle' }
    ]
  },
  {
    label: '项羽夺军', seal: '夺军',
    kicker: '阶段二 · 前207 年 十一月—十二月',
    title: '项羽斩宋义，破釜沉舟',
    turn: '宋义救赵，行至安阳，留四十六日不进；项羽晨朝上将军宋义，即其帐中斩之，自将兵渡河，破釜沉舟，持三日粮。',
    why: '夺军之后，楚军不再观望；破釜沉舟把退路主动切断，把「救赵」变成「死战」，士气与决断同时到位。',
    src: '《史记·项羽本纪》；《资治通鉴》卷八。「持三日粮」为史载，楚军人数无确载。',
    events: [
      { time: '前207·十一月', who: '宋义', text: '救赵，留安阳四十六日', t: 0.06 },
      { time: '前207·十一月', who: '项羽', text: '帐中斩宋义，自将楚军', t: 0.24, kind: 'infight', mark: '斩', city: 'anyang',
        lv: { from: '宋义', to: '项羽', x: 126, y: 126, anchor: 'start' } },
      { time: '前207·十二月', who: '项羽', text: '破釜沉舟，持三日粮', t: 0.52 },
      { time: '前207·十二月', who: '楚军', text: '渡漳水，围王离', t: 0.78 }
    ],
    nums: [
      { label: '楚军兵力', value: '无确载', kind: '无确载', n: null },
      { label: '秦军兵力', value: '无确载', kind: '无确载', n: null },
      { label: '携粮', value: '三日', kind: '史载', n: null }
    ],
    markers: [
      { type: 'host', side: 'chu', x: 110, y: 96, t: 0.02, name: '宋义', lx: 122, ly: 94, anchor: 'start',
        nameSwaps: [{ t: 0.26, to: '项羽' }] },
      { type: 'host', side: 'chu', x: 162, y: 208, t: 0.44, name: '项羽', lx: 150, ly: 222, anchor: 'end', moveRef: 1 },
      { type: 'army', side: 'qin', x: 204, y: 164, t: 0.02, name: '王离', lx: 216, ly: 152, anchor: 'start' }
    ],
    routes: [
      { d: 'M 112 106 C 130 148 150 182 166 202', side: 'chu', t0: 0.44, t1: 0.72,
        label: '渡漳水', lx: 142, ly: 154, anchor: 'start' },
      { d: 'M 166 202 C 182 190 194 178 200 170', side: 'chu', t0: 0.76, t1: 0.94,
        label: '围王离', lx: 176, ly: 194, anchor: 'start' }
    ]
  },
  {
    label: '九战破秦', seal: '九战',
    kicker: '阶段三 · 前207 年 十二月',
    title: '九战绝甬道，虏王离',
    turn: '项羽绝秦军甬道，九战，大破之，杀苏角，虏王离；涉间自烧而死。诸侯将入辕门，膝行而前，莫敢仰视。',
    why: '楚军以少击众，先断粮道再连续突击，秦军围城部队反被分割；巨鹿解围，诸侯共推项羽为上将军。',
    src: '《史记·项羽本纪》；《资治通鉴》卷八。双方兵力无确载。',
    events: [
      { time: '前207·十二月', who: '项羽', text: '绝甬道，九战秦军', t: 0.06 },
      { time: '前207·十二月', who: '楚军', text: '杀苏角，虏王离', t: 0.4 },
      { time: '前207·十二月', who: '涉间', text: '自烧而死', t: 0.66 },
      { time: '前207·十二月', who: '诸侯将', text: '膝行而前，推项羽为上将军', t: 0.88 }
    ],
    nums: [
      { label: '秦军兵力', value: '无确载', kind: '无确载', n: null },
      { label: '楚军兵力', value: '无确载', kind: '无确载', n: null },
      { label: '诸侯军', value: '无确载', kind: '无确载', n: null }
    ],
    sieges: [
      { x: 204, y: 164, t: 0.10, label: '巨鹿解围', side: 'chu', lx: -12, ly: 4, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'chu', x: 168, y: 204, t: 0.02, name: '项羽', lx: 156, ly: 218, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'qin', x: 204, y: 164, t: 0.02, name: '王离', lx: 216, ly: 152, anchor: 'start', weak: true },
      { type: 'army', side: 'chu', x: 264, y: 208, t: 0.60, name: '诸侯军', lx: 264, ly: 222, anchor: 'middle' }
    ],
    routes: [
      { d: 'M 172 200 C 186 188 198 176 206 168', side: 'chu', t0: 0.08, t1: 0.42,
        label: '楚军突击', lx: 178, ly: 192, anchor: 'start' }
    ]
  },
  {
    label: '章邯降', seal: '受降',
    kicker: '阶段四 · 前207 年 七月',
    title: '章邯降于殷墟',
    turn: '章邯内外交困，遣使求盟；项羽与盟于殷墟，立章邯为雍王；秦降卒二十余万，后为项羽坑于新安。',
    why: '秦军主力既降，关中门户洞开；但降卒处置失当，也埋下项羽入关前后人心尽失的伏笔。',
    src: '《史记·项羽本纪》载降卒二十余万；《资治通鉴》卷八。',
    events: [
      { time: '前207·七月', who: '章邯', text: '遣使求盟', t: 0.08 },
      { time: '前207·七月', who: '项羽', text: '盟于殷墟，立章邯为雍王', t: 0.36 },
      { time: '前207·七月', who: '秦降卒', text: '二十余万人降', t: 0.64 },
      { time: '前207·七月', who: '项羽', text: '坑降卒于新安', t: 0.88 }
    ],
    nums: [
      { label: '秦降卒', value: '二十余万', kind: '史载', n: 20 },
      { label: '楚军兵力', value: '无确载', kind: '无确载', n: null },
      { label: '诸侯军', value: '无确载', kind: '无确载', n: null }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 142, y: 244, t: 0.02, name: '章邯', lx: 154, ly: 258, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'chu', x: 168, y: 200, t: 0.02, name: '项羽', lx: 156, ly: 214, anchor: 'end' },
      { type: 'army', side: 'qin', x: 96, y: 292, t: 0.56, name: '秦降卒', lx: 110, ly: 292, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 142 250 C 124 266 110 280 100 290', side: 'qin', t0: 0.30, t1: 0.60,
        label: '章邯赴盟', lx: 118, ly: 278, anchor: 'middle' },
      { d: 'M 92 296 C 74 312 60 322 48 328', side: 'retreat', t0: 0.74, t1: 0.96,
        label: '坑于新安', lx: 74, ly: 318, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = {};

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 20 196 C 76 186 120 206 166 196 C 214 186 258 164 320 170', color: '#a8b6ab', width: 3 }
  ],
  lines: [
    { d: 'M 34 120 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 276 70 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 60 250 l12 -13 l9 9 l11 -13', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 268 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 208, y: 190, t: '漳　水', size: 9, color: '#46594f', ls: 2, serif: true, rotate: -4 },
    { x: 306, y: 118, t: '太 行 山', size: 9, color: '#7d6647', ls: 3, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 366, t: '河 内', size: 8.5, color: '#7d6647', ls: 1 }
  ]
};

var META = {
  id: 'julu',
  title: '巨鹿之战',
  kicker: '沙 盘 推 演',
  subtitle: '漳水 · 巨鹿',
  years: '前207',
  yearUnit: '',
  era: '秦末 · 二世三年',
  mapNote: '旗＝军势 ｜ 圈＝解围 ｜ 叉＝夺军 ｜ 虚线＝退却',
  note: '示意沙盘：仅保留关键地点与行军线，非真实地理比例',
  hook: '项羽斩宋义、破釜沉舟，九战破秦，诸侯膝行而前',
  period: '秦末',
  yearValue: -207,
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
