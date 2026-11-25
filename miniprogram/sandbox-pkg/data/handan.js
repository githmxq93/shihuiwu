/**
 * 沙盘推演 · 邯郸之战（前259—前257）
 * 通行叙事：长平战后秦围邯郸、平原君毛遂求救于楚、信陵君窃符救赵、
 * 魏楚赵内外夹击破秦、郑安平降、白起赐死。
 * 秦、赵、魏、楚各方具体兵力均无确载，只标「无确载」。
 * 地名古今对照：邯郸今河北邯郸、邺今河北临漳西南。
 */
var COLOR = { qin: '#6f3a22', zhao: '#2b5262', wei: '#5a4a6a', chu: '#7a5a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'xianyang',  name: '咸阳', x: 46,  y: 196, tx: 46,  ty: 210, anchor: 'middle' },
  { id: 'luoyang',   name: '洛阳', x: 122, y: 176, tx: 122, ty: 162, anchor: 'middle' },
  { id: 'changping', name: '长平', x: 178, y: 140, tx: 164, ty: 134, anchor: 'end' },
  { id: 'handan',    name: '邯郸', x: 254, y: 92,  tx: 254, ty: 78,  anchor: 'middle' },
  { id: 'ye',        name: '邺',   x: 270, y: 140, tx: 284, ty: 146, anchor: 'start' },
  { id: 'daliang',   name: '大梁', x: 226, y: 196, tx: 226, ty: 210, anchor: 'middle' }
];

var BASE1 = { xianyang: 'qin', luoyang: 'qin', changping: 'qin', handan: 'contested', ye: 'wei', daliang: 'wei' };
var BASE2 = { xianyang: 'qin', luoyang: 'qin', changping: 'qin', handan: 'contested', ye: 'wei', daliang: 'wei' };
var BASE3 = { xianyang: 'qin', luoyang: 'qin', changping: 'qin', handan: 'contested', ye: 'wei', daliang: 'wei' };
var BASE4 = { xianyang: 'qin', luoyang: 'qin', changping: 'qin', handan: 'zhao', ye: 'wei', daliang: 'wei' };

var STAGES = [
  {
    label: '秦围邯郸', seal: '围赵',
    kicker: '阶段一 · 前259 年',
    title: '长平战后，秦军围邯郸',
    turn: '长平之战后，白起主张乘胜灭赵，秦昭王未从其议；前259 年，秦以王陵攻邯郸，赵孝成王坚守，平原君赵胜求救于诸侯。',
    why: '秦在长平已重创赵军，但邯郸城坚、赵人死守；秦军顿于坚城之下，战争由野战转入旷日持久的围城。',
    src: '《史记·白起王翦列传》《平原君虞卿列传》《赵世家》；《资治通鉴》卷五。兵力无确载。',
    events: [
      { time: '前259', who: '白起', text: '主张乘胜灭赵，秦王不听', t: 0.08 },
      { time: '前259', who: '王陵', text: '率军攻邯郸', t: 0.34, kind: 'flip', city: 'handan' },
      { time: '前259', who: '赵孝成王', text: '坚壁固守，城中死战', t: 0.60 },
      { time: '前259', who: '平原君', text: '求救于魏、楚', t: 0.86 }
    ],
    nums: [
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '围城', value: '逾年', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { handan: 0.34 },
    sieges: [
      { x: 254, y: 92, t: 0.34, label: '邯郸被围', side: 'qin', lx: 16, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'qin', x: 178, y: 140, t: 0.04, name: '王陵', lx: 164, ly: 152, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'zhao', x: 254, y: 92, t: 0.02, name: '赵军', lx: 268, ly: 104, anchor: 'start', weak: true },
      { type: 'host', side: 'zhao', x: 254, y: 92, t: 0.58, name: '平原君', lx: 240, ly: 104, anchor: 'end' }
    ],
    routes: [
      { d: 'M 182 136 C 204 122 228 108 246 98', side: 'qin', t0: 0.06, t1: 0.34,
        label: '秦军围邯郸', lx: 212, ly: 132, anchor: 'middle' }
    ]
  },
  {
    label: '毛遂自荐', seal: '求救',
    kicker: '阶段二 · 前258 年',
    title: '平原君使楚，毛遂自荐',
    turn: '平原君奉命赴楚求救，约与门下食客二十人俱，得十九人而缺其一；毛遂自荐同行。至楚，毛遂按剑陈说利害，楚王遂遣春申君救赵。',
    why: '邯郸能否守住，取决于外援能否及时到达；毛遂说服楚王，使赵在城破之前争取到南线援军。',
    src: '《史记·平原君虞卿列传》；《资治通鉴》卷五。「毛遂自荐」为史载。',
    events: [
      { time: '前258', who: '平原君', text: '奉命赴楚求救', t: 0.08 },
      { time: '前258', who: '毛遂', text: '自荐同行，按剑陈说', t: 0.34 },
      { time: '前258', who: '楚考烈王', text: '遣春申君率军救赵', t: 0.64 },
      { time: '前258', who: '魏安釐王', text: '遣晋鄙率军救赵，壁于邺', t: 0.86 }
    ],
    nums: [
      { label: '楚国援军', value: '无确载', kind: '无确载', n: null },
      { label: '魏国援军', value: '无确载', kind: '无确载', n: null },
      { label: '赵都', value: '仍被围', kind: '史载', n: null }
    ],
    hold: BASE2,
    markers: [
      { type: 'host', side: 'zhao', x: 254, y: 92, t: 0.02, name: '平原君', lx: 240, ly: 104, anchor: 'end' },
      { type: 'army', side: 'zhao', x: 254, y: 92, t: 0.30, name: '毛遂', lx: 268, ly: 104, anchor: 'start' },
      { type: 'army', side: 'wei', x: 270, y: 140, t: 0.78, name: '晋鄙', lx: 284, ly: 152, anchor: 'start' }
    ],
    routes: [
      { d: 'M 250 100 C 236 118 218 140 200 160', side: 'zhao', t0: 0.06, t1: 0.30,
        label: '平原君赴楚', lx: 228, ly: 128, anchor: 'middle' },
      { d: 'M 228 192 C 242 176 256 158 266 146', side: 'wei', t0: 0.80, t1: 0.96,
        label: '魏军壁邺', lx: 240, ly: 176, anchor: 'start' }
    ]
  },
  {
    label: '窃符救赵', seal: '窃符',
    kicker: '阶段三 · 前257 年',
    title: '信陵君窃符夺军，率魏军救赵',
    turn: '魏王畏秦，令晋鄙留军邺，观望不进。信陵君魏无忌用侯生之谋，请如姬窃虎符，至邺夺晋鄙军，选精兵八万，进击秦军。',
    why: '魏军已在邺，却因魏王畏秦而不进；窃符夺军把一支观望的援军变成真实的攻击力量。',
    src: '《史记·魏公子列传》；《资治通鉴》卷五。「窃符救赵」为史载。',
    events: [
      { time: '前257', who: '信陵君', text: '用侯生之谋，谋窃虎符', t: 0.08 },
      { time: '前257', who: '如姬', text: '为信陵君窃虎符', t: 0.32 },
      { time: '前257', who: '信陵君', text: '至邺夺晋鄙军', t: 0.58, kind: 'infight', mark: '夺',
        city: 'ye', lv: { from: '晋鄙', to: '信陵君', x: 286, y: 128, anchor: 'start' } },
      { time: '前257', who: '信陵君', text: '选精兵，进击秦军', t: 0.84 }
    ],
    nums: [
      { label: '魏军', value: '无确载', kind: '无确载', n: null },
      { label: '信陵君所选', value: '八万', kind: '史载', n: 8 },
      { label: '秦军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE3,
    markers: [
      { type: 'host', side: 'wei', x: 226, y: 196, t: 0.02, name: '信陵君', lx: 212, ly: 208, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'wei', x: 270, y: 140, t: 0.02, name: '晋鄙', lx: 284, ly: 152, anchor: 'start',
        nameSwaps: [{ t: 0.60, to: '信陵君' }] },
      { type: 'army', side: 'wei', x: 274, y: 132, t: 0.70, name: '魏军', lx: 288, ly: 126, anchor: 'start' }
    ],
    routes: [
      { d: 'M 232 190 C 244 172 258 154 268 146', side: 'wei', t0: 0.08, t1: 0.40,
        label: '信陵君至邺', lx: 240, ly: 176, anchor: 'start' },
      { d: 'M 274 136 C 266 122 260 108 256 100', side: 'wei', t0: 0.72, t1: 0.94,
        label: '魏军救赵', lx: 284, ly: 120, anchor: 'start' }
    ]
  },
  {
    label: '邯郸破围', seal: '解围',
    kicker: '阶段四 · 前257 年',
    title: '内外夹击，秦军大败',
    turn: '信陵君率魏军进至邯郸城下，春申君率楚军亦至；赵军出城夹击，秦军大败，郑安平率二万人降赵。',
    why: '秦军久顿坚城，士气疲敝；魏楚援军一到，围城部队反被内外夹击，围城战彻底逆转。',
    src: '《史记·魏公子列传》《平原君虞卿列传》《秦本纪》；《资治通鉴》卷五。',
    events: [
      { time: '前257', who: '信陵君', text: '率魏军至邯郸城下', t: 0.08 },
      { time: '前257', who: '春申君', text: '率楚军至，与魏军会合', t: 0.32 },
      { time: '前257', who: '赵军', text: '开城出击，内外夹攻', t: 0.58, kind: 'flip', city: 'handan' },
      { time: '前257', who: '郑安平', text: '率二万人降赵', t: 0.84 }
    ],
    nums: [
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '魏楚援军', value: '无确载', kind: '无确载', n: null },
      { label: '郑安平降卒', value: '二万', kind: '史载', n: 2 }
    ],
    hold: BASE4,
    flips: { handan: 0.58 },
    sieges: [
      { x: 254, y: 92, t: 0.58, label: '邯郸解围', side: 'zhao', lx: -12, ly: 4, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'wei', x: 268, y: 110, t: 0.02, name: '信陵君', lx: 282, ly: 104, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'chu', x: 274, y: 118, t: 0.28, name: '春申君', lx: 288, ly: 122, anchor: 'start' },
      { type: 'army', side: 'zhao', x: 254, y: 92, t: 0.02, name: '赵军', lx: 240, ly: 82, anchor: 'end' },
      { type: 'army', side: 'qin', x: 250, y: 100, t: 0.02, name: '秦军', lx: 238, ly: 114, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 268 114 C 264 106 260 98 256 94', side: 'wei', t0: 0.08, t1: 0.38,
        label: '魏军薄城', lx: 278, ly: 108, anchor: 'start' },
      { d: 'M 252 96 C 236 108 218 126 202 146', side: 'retreat', t0: 0.62, t1: 0.94,
        label: '秦军西退', lx: 226, ly: 120, anchor: 'start' }
    ]
  },
  {
    label: '秦军撤退', seal: '收局',
    kicker: '阶段五 · 前257 年',
    title: '秦军退兵，白起赐死',
    turn: '邯郸解围，秦军退回河东；白起称病不起，秦昭王怒，赐死于杜邮。赵亡而复存，但国力已大损。',
    why: '邯郸之败使秦灭赵延后数十年；但赵亦耗尽国力，战国格局并未根本逆转。',
    src: '《史记·白起王翦列传》《赵世家》；《资治通鉴》卷五。',
    events: [
      { time: '前257', who: '秦军', text: '解围西退，还守河东', t: 0.08 },
      { time: '前257', who: '郑安平', text: '降赵，秦法罪及举主', t: 0.34 },
      { time: '前257', who: '秦昭王', text: '赐白起死于杜邮', t: 0.64 },
      { time: '前257', who: '赵', text: '亡而复存，国力大损', t: 0.88 }
    ],
    nums: [
      { label: '秦军', value: '无确载', kind: '无确载', n: null },
      { label: '赵军', value: '无确载', kind: '无确载', n: null },
      { label: '白起', value: '赐死', kind: '史载', n: null }
    ],
    hold: BASE4,
    markers: [
      { type: 'host', side: 'zhao', x: 254, y: 92, t: 0.02, name: '平原君', lx: 240, ly: 104, anchor: 'end' },
      { type: 'host', side: 'qin', x: 122, y: 176, t: 0.30, name: '秦军', lx: 136, ly: 188, anchor: 'start', weak: true },
      { type: 'army', side: 'qin', x: 60, y: 196, t: 0.60, name: '白起', lx: 74, ly: 208, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 250 98 C 214 120 170 148 128 172', side: 'retreat', t0: 0.08, t1: 0.58,
        label: '秦军西退', lx: 190, ly: 138, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = BASE1;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 168 C 60 160 120 172 180 166 C 240 160 300 150 385 154', color: '#a8b6ab', width: 3 },
    { d: 'M 244 66 C 250 104 256 140 262 176', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 110 60 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 300 60 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 52 300 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 300 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 18, y: 158, t: '黄　河', size: 10, color: '#46594f', ls: 3, serif: true },
    { x: 268, y: 70, t: '漳　水', size: 8.5, color: '#46594f', ls: 2, serif: true, rotate: -6 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '邯郸·今河北邯郸　邺·今河北临漳西南', size: 7.5, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '河 东', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'handan',
  title: '邯郸之战',
  kicker: '沙 盘 推 演',
  subtitle: '邯郸 · 邺',
  years: '前259',
  yearUnit: '',
  era: '战国 · 秦昭王四十八年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝围城 ｜ 叉＝夺军 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：邯郸今河北邯郸、邺今河北临漳西南，非真实地理比例',
  hook: '长平之后秦围邯郸，毛遂自荐、信陵君窃符救赵，内外夹击破秦',
  period: '战国',
  yearValue: -259,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '赵', b: '存', sub: '前257' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
