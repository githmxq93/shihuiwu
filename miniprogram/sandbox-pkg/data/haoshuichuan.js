/**
 * 沙盘推演 · 好水川之战（1041）
 * 通行叙事：西夏李元昊率众十万南下，宋军任福率部追击；
 * 元昊诱敌深入，伏兵发于好水川，宋军大败，任福战死，死者万余人。
 * 西夏「十万」、宋军死者「万余人」为史载；宋军兵力无确载。
 * 地名古今对照：好水川今宁夏隆德西北、镇戎军今宁夏固原、渭州今甘肃平凉。
 */
var COLOR = { song: '#2b5262', xia: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'xingqing',     name: '兴庆',   x: 100, y: 110, tx: 100, ty: 96,  anchor: 'middle' },
  { id: 'zhenrongjun',  name: '镇戎军', x: 180, y: 170, tx: 166, ty: 164, anchor: 'end' },
  { id: 'haoshuichuan', name: '好水川', x: 196, y: 186, tx: 196, ty: 202, anchor: 'middle' },
  { id: 'weizhou',      name: '渭州',   x: 210, y: 230, tx: 224, ty: 238, anchor: 'start' },
  { id: 'yanzhou',      name: '延州',   x: 300, y: 160, tx: 300, ty: 146, anchor: 'middle' }
];

var BASE0 = { xingqing: 'xia', zhenrongjun: 'song', haoshuichuan: 'song', weizhou: 'song', yanzhou: 'song' };
var BASE1 = { xingqing: 'xia', zhenrongjun: 'contested', haoshuichuan: 'song', weizhou: 'song', yanzhou: 'song' };
var BASE2 = { xingqing: 'xia', zhenrongjun: 'contested', haoshuichuan: 'contested', weizhou: 'song', yanzhou: 'song' };
var BASE3 = { xingqing: 'xia', zhenrongjun: 'contested', haoshuichuan: 'xia', weizhou: 'song', yanzhou: 'song' };
var BASE4 = { xingqing: 'xia', zhenrongjun: 'xia', haoshuichuan: 'xia', weizhou: 'song', yanzhou: 'song' };

var STAGES = [
  {
    label: '元昊南下', seal: '来犯',
    kicker: '阶段一 · 1041 年 二月',
    title: '李元昊率十万南下',
    turn: '西夏李元昊率众十万南下，攻宋镇戎军；宋将任福率军迎击，元昊佯退诱敌。',
    why: '西夏以骑兵机动诱敌，宋军若贸然追击，便会被引入预设战场。',
    src: '《宋史·任福传》；《续资治通鉴长编》卷一百三十一。「十万」为史载。',
    events: [
      { time: '1041·二月', who: '李元昊', text: '率十万南下', t: 0.08 },
      { time: '1041·二月', who: '西夏军', text: '攻镇戎军', t: 0.34, kind: 'flip', city: 'zhenrongjun' },
      { time: '1041·二月', who: '任福', text: '率军迎击', t: 0.58 },
      { time: '1041·二月', who: '李元昊', text: '佯退诱敌', t: 0.84 }
    ],
    nums: [
      { label: '西夏军', value: '十万', kind: '史载', n: 100 },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '镇戎军', value: '被攻', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { zhenrongjun: 0.34 },
    markers: [
      { type: 'host', side: 'xia', x: 100, y: 110, t: 0.02, name: '李元昊', lx: 114, ly: 104, anchor: 'start' },
      { type: 'host', side: 'song', x: 180, y: 170, t: 0.30, name: '任福', lx: 166, ly: 182, anchor: 'end' },
      { type: 'army', side: 'xia', x: 140, y: 140, t: 0.34, name: '西夏军', lx: 126, ly: 134, anchor: 'end' }
    ],
    routes: [
      { d: 'M 108 116 C 132 136 158 156 176 168', side: 'xia', t0: 0.10, t1: 0.54,
        label: '西夏南下', lx: 128, ly: 138, anchor: 'middle' }
    ]
  },
  {
    label: '宋军追击', seal: '追击',
    kicker: '阶段二 · 1041 年',
    title: '宋军追击，元昊诱敌深入',
    turn: '任福率军追击，元昊沿途弃马羊、焚庐舍，示弱诱之；宋军轻进，队形渐乱，进至好水川。',
    why: '宋军求功心切，未察诱敌之计；一旦进入川谷，骑兵便失去展开余地。',
    src: '《宋史·任福传》；《续资治通鉴长编》卷一百三十一。',
    events: [
      { time: '1041', who: '任福', text: '率军追击', t: 0.08 },
      { time: '1041', who: '李元昊', text: '弃马羊、焚庐舍示弱', t: 0.34 },
      { time: '1041', who: '宋军', text: '轻进，队形渐乱', t: 0.58 },
      { time: '1041', who: '宋军', text: '进至好水川', t: 0.84, kind: 'flip', city: 'haoshuichuan' }
    ],
    nums: [
      { label: '西夏军', value: '十万', kind: '史载', n: 100 },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '好水川', value: '谷地', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { haoshuichuan: 0.84 },
    markers: [
      { type: 'host', side: 'song', x: 196, y: 186, t: 0.30, name: '任福', lx: 182, ly: 198, anchor: 'end' },
      { type: 'host', side: 'xia', x: 100, y: 110, t: 0.02, name: '李元昊', lx: 114, ly: 104, anchor: 'start', weak: true },
      { type: 'army', side: 'song', x: 182, y: 174, t: 0.34, name: '宋军', lx: 168, ly: 168, anchor: 'end' }
    ],
    routes: [
      { d: 'M 178 174 C 184 178 190 182 194 186', side: 'song', t0: 0.30, t1: 0.66,
        label: '宋军轻进', lx: 170, ly: 190, anchor: 'end' }
    ]
  },
  {
    label: '好水川中伏', seal: '中伏',
    kicker: '阶段三 · 1041 年',
    title: '伏兵四起，宋军大败',
    turn: '宋军至好水川，西夏伏兵四起，以骑兵冲击；宋军阵乱，退路被断，任福力战而死。',
    why: '川谷之中宋军无法结阵，西夏骑兵自高处冲下，一击便将其割裂。',
    src: '《宋史·任福传》；《续资治通鉴长编》卷一百三十一。',
    events: [
      { time: '1041', who: '西夏军', text: '伏兵四起', t: 0.08 },
      { time: '1041', who: '西夏军', text: '以骑兵冲击宋军', t: 0.34, kind: 'flip', city: 'haoshuichuan' },
      { time: '1041', who: '宋军', text: '阵乱，退路被断', t: 0.58 },
      { time: '1041', who: '任福', text: '力战而死', t: 0.84 }
    ],
    nums: [
      { label: '西夏军', value: '十万', kind: '史载', n: 100 },
      { label: '宋军', value: '无确载', kind: '无确载', n: null },
      { label: '任福', value: '战死', kind: '史载', n: null }
    ],
    hold: BASE3,
    flips: { haoshuichuan: 0.34 },
    sieges: [
      { x: 196, y: 186, t: 0.34, label: '宋军溃', side: 'xia', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'xia', x: 196, y: 186, t: 0.30, name: '李元昊', lx: 210, ly: 180, anchor: 'start' },
      { type: 'host', side: 'song', x: 196, y: 186, t: 0.02, name: '任福', lx: 182, ly: 174, anchor: 'end', weak: true },
      { type: 'army', side: 'xia', x: 214, y: 194, t: 0.34, name: '西夏骑兵', lx: 228, ly: 188, anchor: 'start' }
    ],
    routes: [
      { d: 'M 214 190 C 206 188 200 186 198 186', side: 'xia', t0: 0.10, t1: 0.44,
        label: '伏兵冲击', lx: 218, ly: 200, anchor: 'start' }
    ]
  },
  {
    label: '宋军覆没', seal: '大败',
    kicker: '阶段四 · 1041 年',
    title: '宋军覆没，西夏进掠渭州',
    turn: '宋军死者万余人，辎重尽失；西夏军乘胜进掠渭州一带，关中震动。宋廷自此对西夏转取守势。',
    why: '好水川一败，宋军精锐尽丧，宋夏战争进入长期对峙。',
    src: '《宋史·任福传》《夏国传》；《续资治通鉴长编》卷一百三十一。',
    events: [
      { time: '1041', who: '宋军', text: '死者万余人，辎重尽失', t: 0.08 },
      { time: '1041', who: '西夏军', text: '进掠渭州一带', t: 0.34, kind: 'flip', city: 'zhenrongjun' },
      { time: '1041', who: '宋廷', text: '关中震动', t: 0.58 },
      { time: '1041', who: '宋', text: '对西夏转取守势', t: 0.84 }
    ],
    nums: [
      { label: '宋军死者', value: '万余人', kind: '史载', n: 10 },
      { label: '西夏军', value: '十万', kind: '史载', n: 100 },
      { label: '宋', value: '转取守势', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { zhenrongjun: 0.34 },
    markers: [
      { type: 'host', side: 'xia', x: 180, y: 170, t: 0.30, name: '李元昊', lx: 194, ly: 164, anchor: 'start' },
      { type: 'host', side: 'song', x: 210, y: 230, t: 0.02, name: '宋军残部', lx: 224, ly: 224, anchor: 'start', weak: true },
      { type: 'army', side: 'xia', x: 200, y: 200, t: 0.34, name: '西夏军', lx: 214, ly: 206, anchor: 'start' }
    ],
    routes: [
      { d: 'M 186 176 C 190 190 196 208 202 222', side: 'xia', t0: 0.10, t1: 0.50,
        label: '进掠渭州', lx: 184, ly: 200, anchor: 'end' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 30 60 C 60 120 90 180 120 240 C 138 284 148 336 152 386', color: '#a8b6ab', width: 2.4 },
    { d: 'M -10 200 C 80 194 160 202 240 196 C 300 192 350 196 385 200', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 120 60 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 260 70 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 80 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 320 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 24, y: 194, t: '泾　水', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '好水川·今宁夏隆德西北　镇戎军·今宁夏固原　渭州·今甘肃平凉', size: 6.6, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '陇　右', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'haoshuichuan',
  title: '好水川之战',
  kicker: '沙 盘 推 演',
  subtitle: '镇戎军 · 好水川',
  years: '1041',
  yearUnit: 'AD',
  era: '北宋 · 庆历元年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：好水川今宁夏隆德西北、镇戎军今宁夏固原，非真实地理比例',
  hook: '元昊诱敌深入，好水川伏兵四起，宋军大败，任福战死',
  period: '宋夏',
  yearValue: 1041,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '夏', b: '胜', sub: '1041' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
