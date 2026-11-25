/**
 * 沙盘推演 · 镇江之战（1842）
 * 通行叙事：英军破吴淞后溯长江西上，攻镇江；副都统海龄率八旗兵死守，
 * 城破后巷战至尽，海龄自尽；英军旋进逼南京，清廷被迫议和。
 * 双方兵力无确载；「海龄死守」「镇江城破」为史载。
 * 地名古今对照：镇江今江苏镇江、吴淞今上海宝山、南京今江苏南京。
 */
var COLOR = { qing: '#2b5262', britain: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'shanghai',  name: '上海',   x: 302, y: 216, tx: 302, ty: 202, anchor: 'middle' },
  { id: 'wusong',    name: '吴淞',   x: 288, y: 204, tx: 274, ty: 198, anchor: 'end' },
  { id: 'zhenjiang', name: '镇江',   x: 242, y: 172, tx: 228, ty: 166, anchor: 'end' },
  { id: 'guazhou',   name: '瓜洲',   x: 252, y: 142, tx: 266, ty: 136, anchor: 'start' },
  { id: 'nanjing',   name: '南京',   x: 206, y: 148, tx: 192, ty: 142, anchor: 'end' }
];

var BASE0 = { shanghai: 'qing', wusong: 'qing', zhenjiang: 'qing', guazhou: 'qing', nanjing: 'qing' };
var BASE1 = { shanghai: 'qing', wusong: 'britain', zhenjiang: 'qing', guazhou: 'qing', nanjing: 'qing' };
var BASE2 = { shanghai: 'qing', wusong: 'britain', zhenjiang: 'contested', guazhou: 'qing', nanjing: 'qing' };
var BASE4 = { shanghai: 'qing', wusong: 'britain', zhenjiang: 'britain', guazhou: 'britain', nanjing: 'contested' };

var STAGES = [
  {
    label: '英军破吴淞', seal: '西上',
    kicker: '阶段一 · 1842 年 六月',
    title: '英军破吴淞，溯江西上',
    turn: '英军攻破吴淞炮台，溯长江西上；清军沿江防线节节告急。',
    why: '吴淞一破，长江口门户洞开；英军得以深入内河，直指镇江、南京。',
    src: '《清史稿·宣宗本纪》；《鸦片战争档案史料》。',
    events: [
      { time: '1842·六月', who: '英军', text: '攻破吴淞炮台', t: 0.08, kind: 'flip', city: 'wusong' },
      { time: '1842·六月', who: '英军', text: '溯长江西上', t: 0.34 },
      { time: '1842·六月', who: '清军', text: '沿江防线告急', t: 0.58 },
      { time: '1842·六月', who: '英军', text: '直指镇江', t: 0.84 }
    ],
    nums: [
      { label: '英军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '吴淞', value: '失守', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { wusong: 0.08 },
    markers: [
      { type: 'host', side: 'britain', x: 288, y: 204, t: 0.30, name: '英军', lx: 302, ly: 210, anchor: 'start' },
      { type: 'host', side: 'qing', x: 242, y: 172, t: 0.02, name: '海龄', lx: 228, ly: 166, anchor: 'end' },
      { type: 'army', side: 'britain', x: 268, y: 192, t: 0.34, name: '英舰', lx: 282, ly: 186, anchor: 'start' }
    ],
    routes: [
      { d: 'M 284 200 C 274 194 262 186 252 180', side: 'britain', t0: 0.10, t1: 0.54,
        label: '溯江西上', lx: 280, ly: 214, anchor: 'start' }
    ]
  },
  {
    label: '进逼镇江', seal: '围城',
    kicker: '阶段二 · 1842 年 七月',
    title: '英军进逼镇江，海龄死守',
    turn: '英军抵镇江城下，副都统海龄率八旗兵据城死守，英军以炮火攻城。',
    why: '镇江是长江与大运河交汇的咽喉，守军虽少，却据坚城拼死抵抗。',
    src: '《清史稿·海龄传》；《鸦片战争档案史料》。',
    events: [
      { time: '1842·七月', who: '英军', text: '抵镇江城下', t: 0.08, kind: 'flip', city: 'zhenjiang' },
      { time: '1842·七月', who: '海龄', text: '率八旗兵据城死守', t: 0.34 },
      { time: '1842·七月', who: '英军', text: '以炮火攻城', t: 0.58 },
      { time: '1842·七月', who: '清军', text: '拼死抵抗', t: 0.84 }
    ],
    nums: [
      { label: '英军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '镇江', value: '被围', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { zhenjiang: 0.08 },
    markers: [
      { type: 'host', side: 'britain', x: 252, y: 180, t: 0.30, name: '英军', lx: 266, ly: 174, anchor: 'start' },
      { type: 'host', side: 'qing', x: 242, y: 172, t: 0.02, name: '海龄', lx: 228, ly: 178, anchor: 'end' },
      { type: 'army', side: 'qing', x: 236, y: 186, t: 0.34, name: '守军', lx: 222, ly: 192, anchor: 'end' }
    ],
    routes: [
      { d: 'M 250 178 C 248 176 246 174 244 172', side: 'britain', t0: 0.10, t1: 0.50,
        label: '围城', lx: 260, ly: 182, anchor: 'start' }
    ]
  },
  {
    label: '镇江巷战', seal: '死战',
    kicker: '阶段三 · 1842 年 七月',
    title: '城破，守军巷战至尽',
    turn: '英军破城而入，守军与之巷战，伤亡殆尽；海龄自尽，镇江陷落。',
    why: '镇江守军的抵抗是鸦片战争中最为惨烈的一役，但改变不了双方军力的代差。',
    src: '《清史稿·海龄传》；《鸦片战争档案史料》。',
    events: [
      { time: '1842·七月', who: '英军', text: '破城而入', t: 0.08 },
      { time: '1842·七月', who: '清军', text: '巷战至尽', t: 0.34 },
      { time: '1842·七月', who: '海龄', text: '自尽', t: 0.58 },
      { time: '1842·七月', who: '镇江', text: '陷落', t: 0.84, kind: 'flip', city: 'zhenjiang' }
    ],
    nums: [
      { label: '英军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '海龄', value: '自尽', kind: '史载', n: null }
    ],
    hold: { shanghai: 'qing', wusong: 'britain', zhenjiang: 'britain', guazhou: 'qing', nanjing: 'qing' },
    flips: { zhenjiang: 0.84 },
    sieges: [
      { x: 242, y: 172, t: 0.84, label: '镇江破', side: 'britain', lx: 12, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'britain', x: 242, y: 172, t: 0.30, name: '英军', lx: 256, ly: 166, anchor: 'start' },
      { type: 'host', side: 'qing', x: 242, y: 172, t: 0.02, name: '海龄', lx: 228, ly: 178, anchor: 'end', weak: true },
      { type: 'army', side: 'britain', x: 250, y: 184, t: 0.34, name: '英军', lx: 264, ly: 190, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '进逼南京', seal: '逼城',
    kicker: '阶段四 · 1842 年 八月',
    title: '英军进逼南京，清廷议和',
    turn: '英军溯江进逼南京，清廷被迫议和；《南京条约》签订，第一次鸦片战争结束。',
    why: '镇江一失，南京无险可守；军事上的全面失利直接转化为条约上的屈辱。',
    src: '《清史稿·宣宗本纪》；《鸦片战争档案史料》。',
    events: [
      { time: '1842·八月', who: '英军', text: '进逼南京', t: 0.08, kind: 'flip', city: 'nanjing' },
      { time: '1842·八月', who: '英军', text: '占瓜洲', t: 0.34, kind: 'flip', city: 'guazhou' },
      { time: '1842·八月', who: '清廷', text: '被迫议和', t: 0.58 },
      { time: '1842·八月', who: '两方', text: '签订《南京条约》', t: 0.84 }
    ],
    nums: [
      { label: '英军', value: '无确载', kind: '无确载', n: null },
      { label: '清军', value: '无确载', kind: '无确载', n: null },
      { label: '条约', value: '南京条约', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { nanjing: 0.08, guazhou: 0.34 },
    markers: [
      { type: 'host', side: 'britain', x: 206, y: 148, t: 0.30, name: '英军', lx: 192, ly: 142, anchor: 'end' },
      { type: 'host', side: 'qing', x: 206, y: 148, t: 0.02, name: '清廷', lx: 220, ly: 156, anchor: 'start', weak: true },
      { type: 'army', side: 'britain', x: 226, y: 160, t: 0.34, name: '英舰', lx: 240, ly: 154, anchor: 'start' }
    ],
    routes: [
      { d: 'M 236 176 C 226 168 216 158 210 152', side: 'britain', t0: 0.10, t1: 0.54,
        label: '进逼南京', lx: 232, ly: 188, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 320 200 C 290 190 260 178 230 166 C 200 154 170 146 140 140', color: '#a8b6ab', width: 3 },
    { d: 'M 230 120 C 240 160 248 200 254 240 C 258 264 260 284 262 304', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 108 70 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 310 66 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 70 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 330 300 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 120, y: 132, t: '长　江', size: 9, color: '#46594f', ls: 3, serif: true },
    { x: 270, y: 268, t: '大运河', size: 8.5, color: '#46594f', ls: 2, serif: true, rotate: 78 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '镇江·今江苏镇江　吴淞·今上海宝山　南京·今江苏南京', size: 6.6, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '江　南', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'zhenjiang',
  title: '镇江之战',
  kicker: '沙 盘 推 演',
  subtitle: '吴淞 · 镇江',
  years: '1842',
  yearUnit: 'AD',
  era: '清 · 道光二十二年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：镇江今江苏镇江、吴淞今上海宝山，非真实地理比例',
  hook: '英军溯江西上，海龄死守镇江，城破自尽，英军进逼南京',
  period: '清',
  yearValue: 1842,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '英', b: '胜', sub: '1842' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
