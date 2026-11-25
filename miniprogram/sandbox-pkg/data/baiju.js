/**
 * 沙盘推演 · 柏举之战（前506）
 * 通行叙事：吴与蔡唐伐楚、夹汉而军、沈尹戌献策、子常先渡、柏举决战、五战入郢。
 * 吴军总数与楚军总数均无确载；「多力者五百、利趾者三千」见《吕氏春秋·简选》，标史载。
 * 地名古今对照：柏举今湖北麻城、郢今湖北荆州北。
 */
var COLOR = { wu: '#2b5262', chu: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'gusu',   name: '姑苏', x: 326, y: 252, tx: 326, ty: 266, anchor: 'middle' },
  { id: 'huaipu', name: '淮汭', x: 292, y: 196, tx: 306, ty: 192, anchor: 'start' },
  { id: 'cai',    name: '蔡',   x: 234, y: 154, tx: 234, ty: 140, anchor: 'middle' },
  { id: 'tang',   name: '唐',   x: 202, y: 202, tx: 188, ty: 196, anchor: 'end' },
  { id: 'baiju',  name: '柏举', x: 240, y: 228, tx: 254, ty: 240, anchor: 'start' },
  { id: 'ying',   name: '郢',   x: 158, y: 284, tx: 158, ty: 298, anchor: 'middle' }
];

var BASE0 = { gusu: 'wu', huaipu: 'wu', cai: 'wu', tang: 'wu', baiju: 'chu', ying: 'chu' };
var BASE1 = { gusu: 'wu', huaipu: 'wu', cai: 'wu', tang: 'wu', baiju: 'contested', ying: 'chu' };
var BASE2 = { gusu: 'wu', huaipu: 'wu', cai: 'wu', tang: 'wu', baiju: 'wu', ying: 'wu' };

var STAGES = [
  {
    label: '伐楚', seal: '兴师',
    kicker: '阶段一 · 前506 年 冬',
    title: '吴与蔡唐伐楚，夹汉而军',
    turn: '吴王阖庐以伍员、孙武为将，与蔡、唐联合伐楚；吴军舍舟于淮汭，自豫章与楚军夹汉水而阵。',
    why: '吴军弃舟陆行，是为避开淮河枯水与楚军水师，改由陆路直插汉水；蔡、唐从吴，使楚的北面屏障尽失。',
    src: '《左传·定公四年》；《史记·吴太伯世家》《伍子胥列传》。《吕氏春秋·简选》载吴前锋「多力者五百人、利趾者三千人」。',
    events: [
      { time: '前506·冬', who: '吴王阖庐', text: '与蔡、唐联合伐楚', t: 0.06 },
      { time: '前506·冬', who: '吴军', text: '舍舟于淮汭，陆行南下', t: 0.32 },
      { time: '前506·冬', who: '吴军', text: '自豫章与楚夹汉', t: 0.58 },
      { time: '前506·冬', who: '楚军', text: '据汉水而守', t: 0.84 }
    ],
    nums: [
      { label: '吴军前锋', value: '三千五百', kind: '史载', n: 0.35 },
      { label: '吴军总数', value: '无确载', kind: '无确载', n: null },
      { label: '楚军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE0,
    markers: [
      { type: 'host', side: 'wu', x: 326, y: 252, t: 0.02, name: '阖庐', lx: 312, ly: 264, anchor: 'end' },
      { type: 'army', side: 'wu', x: 292, y: 196, t: 0.30, name: '吴军', lx: 306, ly: 208, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'chu', x: 194, y: 250, t: 0.02, name: '子常', lx: 180, ly: 262, anchor: 'end' }
    ],
    routes: [
      { d: 'M 322 248 C 314 224 304 208 294 200', side: 'wu', t0: 0.04, t1: 0.26,
        label: '吴军北上', lx: 322, ly: 220, anchor: 'start' },
      { d: 'M 292 200 C 274 210 256 222 246 230', side: 'wu', t0: 0.30, t1: 0.56,
        label: '陆行南下', lx: 260, ly: 206, anchor: 'middle' },
      { d: 'M 230 160 C 224 174 216 190 210 202', side: 'wu', t0: 0.52, t1: 0.72,
        label: '蔡唐从吴', lx: 240, ly: 180, anchor: 'start' }
    ]
  },
  {
    label: '夹汉', seal: '先渡',
    kicker: '阶段二 · 前506 年 冬',
    title: '沈尹戌献策，子常先渡汉',
    turn: '楚令尹子常与沈尹戌谋：沈尹戌请子常守汉水，自己率方城之外之师毁吴舟、塞大隧等隘，夹击吴军；子常听信部属，贪功先渡汉水求战。',
    why: '楚本可凭汉水与隘口夹击吴军，但子常先渡使两军失去协同；吴军由此获得在汉水东岸决战的机会。',
    src: '《左传·定公四年》。',
    events: [
      { time: '前506·冬', who: '沈尹戌', text: '请守汉水，毁舟塞隘', t: 0.06 },
      { time: '前506·冬', who: '子常', text: '听信部属，贪功先渡', t: 0.34 },
      { time: '前506·冬', who: '楚军', text: '渡汉而陈，失去夹击之势', t: 0.60 },
      { time: '前506·冬', who: '吴军', text: '退而列阵，待楚军半渡', t: 0.84 }
    ],
    nums: [
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '吴军', value: '无确载', kind: '无确载', n: null },
      { label: '沈尹戌部', value: '方城之外之师', kind: '史载', n: null }
    ],
    hold: BASE0,
    markers: [
      { type: 'host', side: 'chu', x: 194, y: 240, t: 0.02, name: '子常', lx: 180, ly: 252, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'chu', x: 170, y: 202, t: 0.02, name: '沈尹戌', lx: 156, ly: 196, anchor: 'end' },
      { type: 'host', side: 'wu', x: 230, y: 232, t: 0.30, name: '阖庐', lx: 244, ly: 224, anchor: 'start' }
    ],
    routes: [
      { d: 'M 192 236 C 202 232 210 228 216 224', side: 'chu', t0: 0.32, t1: 0.52,
        label: '子常渡汉', lx: 184, ly: 222, anchor: 'end' },
      { d: 'M 174 204 C 206 202 236 198 262 196', side: 'chu', t0: 0.06, t1: 0.28,
        label: '毁吴舟、塞大隧', lx: 214, ly: 190, anchor: 'middle' }
    ]
  },
  {
    label: '柏举', seal: '柏举',
    kicker: '阶段三 · 前506 年 十一月庚午',
    title: '柏举决战，楚军大败',
    turn: '吴王弟夫概率五千人先击子常之卒，楚军阵乱；吴大军继至，大败楚军于柏举。子常奔郑，沈尹戌回救战死。',
    why: '夫概的抢先突击打乱了楚军阵脚，吴军主力随即投入；子常一逃，楚军失去统一指挥，柏举之败遂不可挽回。',
    src: '《左传·定公四年》「败楚师于柏举」；《史记·吴太伯世家》。夫概五千为史载。',
    events: [
      { time: '前506·十一月庚午', who: '夫概', text: '率五千先击子常之卒', t: 0.06 },
      { time: '前506·十一月庚午', who: '楚军', text: '阵乱，子常奔郑', t: 0.34, kind: 'flip', city: 'baiju' },
      { time: '前506·十一月庚午', who: '吴军', text: '主力继至，大败楚军', t: 0.60 },
      { time: '前506·十一月', who: '沈尹戌', text: '回救，战死', t: 0.84 }
    ],
    nums: [
      { label: '夫概部', value: '五千', kind: '史载', n: 5 },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '吴军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE1,
    flips: { baiju: 0.36 },
    sieges: [
      { x: 240, y: 228, t: 0.36, label: '柏举', side: 'wu', lx: 18, ly: 14, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'wu', x: 232, y: 234, t: 0.04, name: '夫概', lx: 218, ly: 246, anchor: 'end' },
      { type: 'host', side: 'chu', x: 246, y: 222, t: 0.02, name: '子常', lx: 260, ly: 216, anchor: 'start', weak: true },
      { type: 'army', side: 'chu', x: 206, y: 204, t: 0.50, name: '沈尹戌', lx: 192, ly: 198, anchor: 'end' }
    ],
    routes: [
      { d: 'M 230 232 C 234 230 238 228 240 226', side: 'wu', t0: 0.06, t1: 0.30,
        label: '先击子常', lx: 222, ly: 222, anchor: 'end' },
      { d: 'M 242 218 C 246 196 250 172 252 152', side: 'retreat', t0: 0.34, t1: 0.58,
        label: '子常奔郑', lx: 258, ly: 190, anchor: 'start' },
      { d: 'M 210 206 C 220 214 228 220 232 224', side: 'chu', t0: 0.50, t1: 0.70,
        label: '沈尹戌回救', lx: 204, ly: 220, anchor: 'end' }
    ]
  },
  {
    label: '入郢', seal: '入郢',
    kicker: '阶段四 · 前506 年 十一月',
    title: '五战及郢，楚昭王出奔',
    turn: '吴军五战五胜，直入郢都；楚昭王出奔随，吴入郢。伍员掘楚平王墓，鞭尸三百，报父兄之仇。',
    why: '柏举之后楚军再无成建制抵抗，吴军得以长驱入郢；但吴军入郢后纪律松弛，秦、越介入，吴最终未能久据楚地。',
    src: '《左传·定公四年、五年》；《史记·吴太伯世家》《伍子胥列传》。',
    events: [
      { time: '前506·十一月', who: '吴军', text: '五战五胜，直趋郢都', t: 0.08 },
      { time: '前506·十一月', who: '楚昭王', text: '出奔随', t: 0.36, kind: 'flip', city: 'ying' },
      { time: '前506·十一月', who: '吴军', text: '入郢', t: 0.62 },
      { time: '前506·十一月', who: '伍员', text: '掘平王墓，鞭尸三百', t: 0.86 }
    ],
    nums: [
      { label: '吴军', value: '无确载', kind: '无确载', n: null },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '入郢', value: '五战', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { ying: 0.38 },
    sieges: [
      { x: 158, y: 284, t: 0.38, label: '郢都陷', side: 'wu', lx: -12, ly: -14, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'wu', x: 240, y: 228, t: 0.02, name: '阖庐', lx: 254, ly: 236, anchor: 'start', moveRef: 0 },
      { type: 'host', side: 'chu', x: 158, y: 284, t: 0.02, name: '楚昭王', lx: 144, ly: 296, anchor: 'end', weak: true }
    ],
    routes: [
      { d: 'M 234 232 C 214 244 190 258 172 270', side: 'wu', t0: 0.06, t1: 0.34,
        label: '五战及郢', lx: 202, ly: 250, anchor: 'middle' },
      { d: 'M 158 288 C 152 306 144 320 134 330', side: 'retreat', t0: 0.38, t1: 0.62,
        label: '昭王奔随', lx: 168, ly: 314, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 210 184 C 250 188 290 192 340 188', color: '#a8b6ab', width: 2.5 },
    { d: 'M 170 146 C 178 188 186 230 190 268 C 192 292 188 312 180 334', color: '#b6c3b6', width: 2.5 }
  ],
  lines: [
    { d: 'M 60 120 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 278 96 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 252 292 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 66 292 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 250, y: 178, t: '淮　水', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 194, y: 244, t: '汉　水', size: 9, color: '#46594f', ls: 2, serif: true, rotate: 80 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '柏举·今湖北麻城　郢·今湖北荆州北', size: 7.5, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '江 汉', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'baiju',
  title: '柏举之战',
  kicker: '沙 盘 推 演',
  subtitle: '汉水 · 柏举—郢',
  years: '前506',
  yearUnit: '',
  era: '春秋 · 吴王阖庐九年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝决战 ｜ 易＝易手 ｜ 虚线＝出奔',
  note: '示意沙盘：柏举今湖北麻城、郢今湖北荆州北，非真实地理比例',
  hook: '吴军五战入郢，伍员鞭尸，楚昭王出奔',
  period: '春秋',
  yearValue: -506,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '吴', b: '入', sub: '前506' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
