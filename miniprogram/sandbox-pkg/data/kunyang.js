/**
 * 沙盘推演 · 昆阳之战（23）
 * 通行叙事：王莽四十二万围昆阳、刘秀十三骑突围求援、三千敢死冲击莽军中坚、
 * 内外夹击、大风雨滍水暴涨、莽军崩溃。
 * 莽军「四十二万、号百万」、守军「八九千」、敢死「三千」均为《后汉书》史载。
 * 地名古今对照：昆阳今河南叶县、宛城今河南南阳、定陵今河南舞阳北。
 */
var COLOR = { xin: '#6f3a22', gengshi: '#2b5262', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'luoyang',  name: '洛阳', x: 248, y: 92,  tx: 248, ty: 78,  anchor: 'middle' },
  { id: 'yingchuan', name: '颍川', x: 288, y: 152, tx: 288, ty: 166, anchor: 'middle' },
  { id: 'dingling', name: '定陵', x: 276, y: 222, tx: 290, ty: 228, anchor: 'start' },
  { id: 'kunyang',  name: '昆阳', x: 210, y: 208, tx: 196, ty: 220, anchor: 'end' },
  { id: 'wancheng', name: '宛城', x: 156, y: 264, tx: 156, ty: 278, anchor: 'middle' }
];

var BASE0 = { luoyang: 'xin', yingchuan: 'xin', dingling: 'gengshi', kunyang: 'gengshi', wancheng: 'gengshi' };
var BASE1 = { luoyang: 'xin', yingchuan: 'xin', dingling: 'gengshi', kunyang: 'contested', wancheng: 'gengshi' };
var BASE4 = { luoyang: 'xin', yingchuan: 'xin', dingling: 'gengshi', kunyang: 'gengshi', wancheng: 'gengshi' };
var BASE5 = { luoyang: 'xin', yingchuan: 'gengshi', dingling: 'gengshi', kunyang: 'gengshi', wancheng: 'gengshi' };

var STAGES = [
  {
    label: '莽军南下', seal: '围城',
    kicker: '阶段一 · 23 年 五月',
    title: '王邑、王寻率四十二万围昆阳',
    turn: '王莽遣大司空王邑、大司徒王寻发兵四十二万，号百万，南下镇压更始军；前锋至昆阳，刘秀与王凤等率八九千人守城。',
    why: '莽军以绝对优势压向昆阳，意在一举摧毁更始政权的主力；昆阳一失，宛城前线与更始军后方都将动摇。',
    src: '《后汉书·光武帝纪》《王莽传》；《资治通鉴》卷三十九。四十二万、八九千均为史载。',
    events: [
      { time: '23·五月', who: '王莽', text: '遣王邑、王寻发兵四十二万', t: 0.08 },
      { time: '23·五月', who: '莽军', text: '号百万，甲士蔽野', t: 0.32 },
      { time: '23·五月', who: '王邑', text: '围昆阳，列营数十重', t: 0.58, kind: 'flip', city: 'kunyang' },
      { time: '23·五月', who: '刘秀', text: '与王凤率八九千守城', t: 0.84 }
    ],
    nums: [
      { label: '莽军', value: '四十二万', kind: '史载', n: 420 },
      { label: '莽军号', value: '百万', kind: '史载', n: null },
      { label: '昆阳守军', value: '八九千', kind: '史载', n: 9 }
    ],
    hold: BASE1,
    flips: { kunyang: 0.58 },
    sieges: [
      { x: 210, y: 208, t: 0.58, label: '昆阳被围', side: 'xin', lx: -12, ly: 12, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'xin', x: 248, y: 92, t: 0.04, name: '王邑', lx: 262, ly: 104, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'xin', x: 222, y: 190, t: 0.56, name: '莽军', lx: 236, ly: 184, anchor: 'start' },
      { type: 'host', side: 'gengshi', x: 210, y: 208, t: 0.02, name: '刘秀', lx: 196, ly: 222, anchor: 'end' }
    ],
    routes: [
      { d: 'M 244 100 C 236 138 226 174 216 200', side: 'xin', t0: 0.08, t1: 0.56,
        label: '莽军南下', lx: 232, ly: 148, anchor: 'start' }
    ]
  },
  {
    label: '昆阳被围', seal: '死守',
    kicker: '阶段二 · 23 年 五月—六月',
    title: '莽军围城数十重，守军死守',
    turn: '莽军围昆阳数十重，造云车、掘地道、冲车撞城，矢下如雨；守军请降，王邑不许，自以为功在旦夕。',
    why: '王邑拒绝受降，把守军逼成死战之师；昆阳城小兵少，却因此没有退路，只能拼命守住。',
    src: '《后汉书·光武帝纪》《王莽传》；《资治通鉴》卷三十九。',
    events: [
      { time: '23·六月', who: '莽军', text: '围城数十重，列营百数', t: 0.08 },
      { time: '23·六月', who: '莽军', text: '造云车、掘地道、冲车撞城', t: 0.34 },
      { time: '23·六月', who: '王凤', text: '请降，王邑不许', t: 0.62 },
      { time: '23·六月', who: '刘秀', text: '议突围求援', t: 0.86 }
    ],
    nums: [
      { label: '莽军', value: '四十二万', kind: '史载', n: 420 },
      { label: '守军', value: '八九千', kind: '史载', n: 9 },
      { label: '围城', value: '数十重', kind: '史载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'xin', x: 224, y: 196, t: 0.02, name: '王邑', lx: 238, ly: 190, anchor: 'start' },
      { type: 'army', side: 'xin', x: 218, y: 202, t: 0.02, name: '莽军', lx: 232, ly: 210, anchor: 'start' },
      { type: 'host', side: 'gengshi', x: 210, y: 208, t: 0.02, name: '王凤', lx: 196, ly: 196, anchor: 'end', weak: true }
    ],
    routes: []
  },
  {
    label: '突围求援', seal: '突围',
    kicker: '阶段三 · 23 年 六月',
    title: '刘秀率十三骑夜出求援',
    turn: '刘秀率十三骑乘夜出昆阳南门，至定陵、郾城调集援兵；诸将初不欲发，刘秀力陈「今若破敌，珍宝万倍」，乃尽发其兵。',
    why: '守城只能拖延，破局必须外援；刘秀把分散的兵力集中起来，才有在野战中冲击莽军的本钱。',
    src: '《后汉书·光武帝纪》；《资治通鉴》卷三十九。「十三骑」为史载。',
    events: [
      { time: '23·六月', who: '刘秀', text: '率十三骑夜出昆阳', t: 0.08 },
      { time: '23·六月', who: '刘秀', text: '至定陵、郾城调兵', t: 0.34 },
      { time: '23·六月', who: '诸将', text: '初不欲发，刘秀力陈利害', t: 0.62 },
      { time: '23·六月', who: '刘秀', text: '尽发援兵，自将步骑千余为前锋', t: 0.86 }
    ],
    nums: [
      { label: '突围骑兵', value: '十三骑', kind: '史载', n: null },
      { label: '援军', value: '无确载', kind: '无确载', n: null },
      { label: '莽军', value: '四十二万', kind: '史载', n: 420 }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'gengshi', x: 210, y: 208, t: 0.02, name: '刘秀', lx: 196, ly: 196, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'gengshi', x: 262, y: 222, t: 0.56, name: '援军', lx: 276, ly: 214, anchor: 'start' },
      { type: 'host', side: 'xin', x: 224, y: 196, t: 0.02, name: '王邑', lx: 238, ly: 190, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 214 212 C 238 216 258 220 268 222', side: 'gengshi', t0: 0.08, t1: 0.40,
        label: '刘秀突围', lx: 238, ly: 232, anchor: 'middle' }
    ]
  },
  {
    label: '昆阳决战', seal: '决战',
    kicker: '阶段四 · 23 年 六月',
    title: '刘秀率三千敢死冲击莽军中坚',
    turn: '刘秀自将步骑千余为前锋，屡挫莽军；复率敢死三千人，从城西水上直冲莽军中坚。王邑、王寻轻敌，自将万余人巡阵，阵乱，王寻被杀。',
    why: '莽军虽众而指挥臃肿，中坚一乱，数十万大军失去号令；昆阳守军乘势出击，形成内外夹击。',
    src: '《后汉书·光武帝纪》；《资治通鉴》卷三十九。「三千」敢死为史载。',
    events: [
      { time: '23·六月', who: '刘秀', text: '率三千敢死，从城西水上冲击', t: 0.08 },
      { time: '23·六月', who: '王邑', text: '轻敌，自将万余人巡阵', t: 0.34 },
      { time: '23·六月', who: '刘秀', text: '冲乱莽军中坚，斩王寻', t: 0.58, kind: 'flip', city: 'kunyang' },
      { time: '23·六月', who: '昆阳守军', text: '开城出击，内外夹攻', t: 0.84 }
    ],
    nums: [
      { label: '敢死队', value: '三千', kind: '史载', n: 3 },
      { label: '莽军', value: '四十二万', kind: '史载', n: 420 },
      { label: '王邑巡阵', value: '万余人', kind: '史载', n: 10 }
    ],
    hold: BASE4,
    flips: { kunyang: 0.58 },
    sieges: [
      { x: 210, y: 208, t: 0.58, label: '昆阳反击', side: 'gengshi', lx: -12, ly: 14, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'gengshi', x: 210, y: 208, t: 0.02, name: '刘秀', lx: 196, ly: 220, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'gengshi', x: 218, y: 202, t: 0.50, name: '敢死队', lx: 232, ly: 212, anchor: 'start' },
      { type: 'army', side: 'xin', x: 226, y: 196, t: 0.02, name: '王邑', lx: 240, ly: 190, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 214 210 C 220 206 224 202 228 198', side: 'gengshi', t0: 0.06, t1: 0.40,
        label: '冲击中坚', lx: 236, ly: 214, anchor: 'start' },
      { d: 'M 224 194 C 242 178 262 162 280 150', side: 'retreat', t0: 0.62, t1: 0.92,
        label: '莽军北溃', lx: 252, ly: 168, anchor: 'start' }
    ]
  },
  {
    label: '莽军崩溃', seal: '大溃',
    kicker: '阶段五 · 23 年 六月',
    title: '大风雨，滍水暴涨，莽军崩溃',
    turn: '会大风雨，屋瓦皆飞，滍水暴涨；莽军溃乱，溺死者以万数，水为之不流。王邑、王寻（已死）余部逃归洛阳。新朝主力尽丧，同年王莽被杀。',
    why: '昆阳之败摧毁了新朝赖以镇压天下的野战主力；此后更始军直取洛阳、长安，新朝迅速崩溃。',
    src: '《后汉书·光武帝纪》《王莽传》；《资治通鉴》卷三十九。「滍水为之不流」为史载。',
    events: [
      { time: '23·六月', who: '更始军', text: '内外夹击，莽军大溃', t: 0.08 },
      { time: '23·六月', who: '天时', text: '大风雨，屋瓦皆飞', t: 0.30 },
      { time: '23·六月', who: '莽军', text: '滍水暴涨，溺死者众', t: 0.56 },
      { time: '23·六月', who: '王邑', text: '轻骑逃归洛阳', t: 0.80, kind: 'flip', city: 'yingchuan' }
    ],
    nums: [
      { label: '莽军', value: '四十二万', kind: '史载', n: 420 },
      { label: '溺死', value: '无确载', kind: '无确载', n: null },
      { label: '新朝主力', value: '尽丧', kind: '史载', n: null }
    ],
    hold: BASE5,
    flips: { yingchuan: 0.80 },
    markers: [
      { type: 'host', side: 'gengshi', x: 214, y: 204, t: 0.02, name: '刘秀', lx: 200, ly: 216, anchor: 'end' },
      { type: 'army', side: 'xin', x: 246, y: 158, t: 0.20, name: '莽军', lx: 260, ly: 150, anchor: 'start', weak: true },
      { type: 'host', side: 'xin', x: 272, y: 140, t: 0.72, name: '王邑', lx: 286, ly: 132, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 222 200 C 236 180 252 164 268 150', side: 'retreat', t0: 0.10, t1: 0.62,
        label: '莽军溃逃', lx: 244, ly: 176, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 136 C 60 130 120 140 180 134 C 240 128 300 120 385 124', color: '#a8b6ab', width: 3 },
    { d: 'M 236 170 C 226 196 218 222 214 248', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 60 60 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 280 60 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 52 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 300 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 18, y: 126, t: '黄　河', size: 10, color: '#46594f', ls: 3, serif: true },
    { x: 218, y: 262, t: '滍　水', size: 8.5, color: '#46594f', ls: 2, serif: true, rotate: 74 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '昆阳·今河南叶县　宛城·今河南南阳　定陵·今河南舞阳北', size: 7.5, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '南 阳 盆 地', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'kunyang',
  title: '昆阳之战',
  kicker: '沙 盘 推 演',
  subtitle: '昆阳 · 滍水',
  years: '23',
  yearUnit: 'AD',
  era: '新莽 · 地皇四年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝围城 ｜ 易＝易手 ｜ 虚线＝溃退',
  note: '示意沙盘：昆阳今河南叶县、宛城今河南南阳，非真实地理比例',
  hook: '刘秀三千敢死冲击四十二万莽军，昆阳一战新朝主力尽丧',
  period: '新莽',
  yearValue: 23,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '汉', b: '兴', sub: '23' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
