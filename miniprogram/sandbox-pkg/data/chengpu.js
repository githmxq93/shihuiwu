/**
 * 沙盘推演 · 城濮之战（前632）
 * 通行叙事：楚围宋、晋伐曹卫、退避三舍、城濮决战、践土之盟。
 * 晋「车七百乘」为《左传·僖公二十八年》史载；楚及陈蔡联军数目无确载，不作估算。
 */
var COLOR = { jin: '#2b5262', chu: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'jiang',    name: '绛',   x: 62,  y: 96,  tx: 62,  ty: 82,  anchor: 'middle' },
  { id: 'chuqiu',   name: '楚丘', x: 176, y: 118, tx: 176, ty: 104, anchor: 'middle' },
  { id: 'chengpu',  name: '城濮', x: 200, y: 134, tx: 184, ty: 146, anchor: 'end' },
  { id: 'taoqiu',   name: '陶丘', x: 212, y: 158, tx: 224, ty: 170, anchor: 'start' },
  { id: 'shangqiu', name: '商丘', x: 246, y: 214, tx: 246, ty: 228, anchor: 'middle' },
  { id: 'ying',     name: '郢',   x: 150, y: 326, tx: 150, ty: 340, anchor: 'middle' }
];

var BASE1 = { jiang: 'jin', chuqiu: 'chu', chengpu: 'chu', taoqiu: 'chu', shangqiu: 'jin', ying: 'chu' };
var BASE2 = { jiang: 'jin', chuqiu: 'jin', chengpu: 'chu', taoqiu: 'jin', shangqiu: 'jin', ying: 'chu' };
var BASE3 = { jiang: 'jin', chuqiu: 'jin', chengpu: 'contested', taoqiu: 'jin', shangqiu: 'jin', ying: 'chu' };
var BASE4 = { jiang: 'jin', chuqiu: 'jin', chengpu: 'jin', taoqiu: 'jin', shangqiu: 'jin', ying: 'chu' };

var STAGES = [
  {
    label: '围宋', seal: '围宋',
    kicker: '阶段一 · 前632 年 春',
    title: '楚围宋，晋议出兵',
    turn: '楚成王围宋，宋告急于晋；晋文公与群臣议，先轸主张出兵救宋，以报宋襄公之惠，并取威定霸。',
    why: '宋是晋在黄河以南的支点，宋若降楚，晋就失去南下通道；晋必须救宋，但不宜与楚正面硬拼，须先设法调动楚军。',
    src: '《左传·僖公二十七年、二十八年》；《史记·晋世家》。',
    events: [
      { time: '前632·春', who: '楚成王', text: '围宋，宋告急于晋', t: 0.06 },
      { time: '前632·春', who: '宋成公', text: '遣使告急于晋', t: 0.32 },
      { time: '前632·春', who: '先轸', text: '献策：伐曹卫以救宋', t: 0.58 },
      { time: '前632·春', who: '晋文公', text: '决策出兵', t: 0.84 }
    ],
    nums: [
      { label: '晋军', value: '车七百乘', kind: '史载', n: 7 },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '宋军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE1,
    markers: [
      { type: 'host', side: 'jin', x: 62, y: 96, t: 0.02, name: '晋文公', lx: 76, ly: 94, anchor: 'start' },
      { type: 'host', side: 'chu', x: 150, y: 326, t: 0.02, name: '楚成王', lx: 164, ly: 336, anchor: 'start' },
      { type: 'army', side: 'chu', x: 246, y: 214, t: 0.10, name: '楚军', lx: 260, ly: 224, anchor: 'start' }
    ],
    routes: [
      { d: 'M 154 320 C 186 298 218 262 240 224', side: 'chu', t0: 0.06, t1: 0.24,
        label: '楚军围宋', lx: 182, ly: 290, anchor: 'middle' }
    ]
  },
  {
    label: '伐曹', seal: '伐曹',
    kicker: '阶段二 · 前632 年 春',
    title: '晋伐曹卫，楚子玉去宋',
    turn: '晋文公出兵伐曹、卫，破曹，执曹伯；卫成公出奔，卫人降晋。楚子玉（成得臣）不得已去宋，转而追晋。',
    why: '晋以攻其必救之法解宋围：楚若继续围宋，则曹卫尽失；楚若来救，则战场转到晋选定的方向。',
    src: '《左传·僖公二十八年》；《史记·晋世家》《卫世家》《曹世家》。',
    events: [
      { time: '前632·春', who: '晋军', text: '破曹，执曹伯', t: 0.08, kind: 'flip', city: 'taoqiu' },
      { time: '前632·春', who: '卫成公', text: '出奔，卫人降晋', t: 0.36, kind: 'flip', city: 'chuqiu' },
      { time: '前632·春', who: '楚子玉', text: '去宋，转追晋军', t: 0.64 },
      { time: '前632·春', who: '楚军', text: '北上追晋', t: 0.86 }
    ],
    nums: [
      { label: '晋军', value: '车七百乘', kind: '史载', n: 7 },
      { label: '曹卫', value: '无确载', kind: '无确载', n: null },
      { label: '楚军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE2,
    flips: { taoqiu: 0.08, chuqiu: 0.36 },
    markers: [
      { type: 'host', side: 'jin', x: 62, y: 96, t: 0.02, name: '晋文公', lx: 76, ly: 94, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'jin', x: 212, y: 158, t: 0.14, name: '晋军', lx: 226, ly: 156, anchor: 'start' },
      { type: 'army', side: 'chu', x: 246, y: 214, t: 0.02, name: '子玉', lx: 260, ly: 224, anchor: 'start', moveRef: 1 }
    ],
    routes: [
      { d: 'M 68 100 C 118 116 168 140 204 154', side: 'jin', t0: 0.06, t1: 0.34,
        label: '晋军伐曹卫', lx: 130, ly: 126, anchor: 'middle' },
      { d: 'M 244 208 C 230 190 216 172 206 156', side: 'chu', t0: 0.62, t1: 0.86,
        label: '子玉去宋', lx: 232, ly: 184, anchor: 'start' }
    ]
  },
  {
    label: '退舍', seal: '三舍',
    kicker: '阶段三 · 前632 年 四月',
    title: '退避三舍，至于城濮',
    turn: '晋文公念流亡时受楚成王之惠，退避三舍（九十里）至城濮；楚军将士欲止，子玉不听，追至城濮。',
    why: '退避三舍既践旧诺，又拉长楚军补给线、示弱诱敌，并在诸侯面前占住名分。',
    src: '《左传·僖公二十八年》；《史记·晋世家》《楚世家》。九十里为史载。',
    events: [
      { time: '前632·四月', who: '楚子玉', text: '追晋军，欲战', t: 0.06 },
      { time: '前632·四月', who: '晋文公', text: '退避三舍，至城濮', t: 0.34 },
      { time: '前632·四月', who: '楚军', text: '将士欲止，子玉不听', t: 0.62 },
      { time: '前632·四月', who: '诸侯', text: '会晋师于城濮', t: 0.84 }
    ],
    nums: [
      { label: '晋军', value: '车七百乘', kind: '史载', n: 7 },
      { label: '楚军', value: '无确载', kind: '无确载', n: null },
      { label: '退避', value: '九十里', kind: '史载', n: null }
    ],
    hold: BASE2,
    markers: [
      { type: 'host', side: 'jin', x: 200, y: 134, t: 0.40, name: '晋文公', lx: 186, ly: 146, anchor: 'end', moveRef: 0 },
      { type: 'host', side: 'chu', x: 214, y: 166, t: 0.10, name: '子玉', lx: 226, ly: 168, anchor: 'start', moveRef: 1 },
      { type: 'army', side: 'jin', x: 188, y: 150, t: 0.36, name: '晋军', lx: 174, ly: 162, anchor: 'end' }
    ],
    routes: [
      { d: 'M 228 150 C 220 146 212 142 204 138', side: 'jin', t0: 0.28, t1: 0.52,
        label: '退避三舍', lx: 236, ly: 140, anchor: 'start' },
      { d: 'M 242 206 C 232 186 222 166 214 150', side: 'chu', t0: 0.06, t1: 0.30,
        label: '楚军追至城濮', lx: 248, ly: 190, anchor: 'start' }
    ]
  },
  {
    label: '决战', seal: '城濮',
    kicker: '阶段四 · 前632 年 四月己巳',
    title: '城濮决战，楚左右师溃',
    turn: '晋下军佐胥臣以虎皮蒙马，先犯陈、蔡，楚右师溃；狐毛设二旆而退，栾枝使舆曳柴伪遁，楚左师追之，晋中军、上军横击，楚左师溃；子玉收中军而止。',
    why: '晋军以佯退诱楚左右两翼脱离中军，再以中军横击；楚军虽众，却被分割击破，只剩中军全身而退。',
    src: '《左传·僖公二十八年》；《史记·晋世家》。晋车七百乘为史载，楚军数目无确载。',
    events: [
      { time: '前632·四月己巳', who: '胥臣', text: '蒙马以虎皮，先犯陈蔡', t: 0.06, kind: 'flip', city: 'chengpu' },
      { time: '前632·四月己巳', who: '楚右师', text: '陈蔡先溃', t: 0.30 },
      { time: '前632·四月己巳', who: '狐毛·栾枝', text: '伪遁诱楚左师', t: 0.52 },
      { time: '前632·四月己巳', who: '晋中军', text: '横击楚左师，楚师溃', t: 0.72 },
      { time: '前632·四月己巳', who: '楚子玉', text: '收中军而止，退师', t: 0.90 }
    ],
    nums: [
      { label: '晋军', value: '车七百乘', kind: '史载', n: 7 },
      { label: '楚右师', value: '陈蔡联军·无确载', kind: '无确载', n: null },
      { label: '楚中军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE3,
    flips: { chengpu: 0.08 },
    sieges: [
      { x: 200, y: 134, t: 0.10, label: '城濮决战', side: 'jin', lx: -8, ly: 18, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'jin', x: 188, y: 140, t: 0.02, name: '晋文公', lx: 174, ly: 152, anchor: 'end' },
      { type: 'army', side: 'chu', x: 214, y: 146, t: 0.08, name: '楚右师', lx: 228, ly: 142, anchor: 'start', weak: true },
      { type: 'army', side: 'chu', x: 212, y: 158, t: 0.30, name: '楚左师', lx: 226, ly: 160, anchor: 'start', weak: true },
      { type: 'army', side: 'jin', x: 196, y: 150, t: 0.50, name: '晋中军', lx: 182, ly: 162, anchor: 'end' }
    ],
    routes: [
      { d: 'M 192 144 C 200 146 208 146 212 146', side: 'jin', t0: 0.10, t1: 0.28,
        label: '先犯陈蔡', lx: 196, ly: 136, anchor: 'start' },
      { d: 'M 210 160 C 202 158 196 154 192 150', side: 'jin', t0: 0.54, t1: 0.74,
        label: '横击左师', lx: 214, ly: 172, anchor: 'start' },
      { d: 'M 210 152 C 220 172 228 192 232 206', side: 'retreat', t0: 0.74, t1: 0.94,
        label: '楚师退', lx: 238, ly: 188, anchor: 'start' }
    ]
  },
  {
    label: '践土', seal: '践土',
    kicker: '阶段五 · 前632 年 五月',
    title: '践土之盟，晋文公称霸',
    turn: '晋文公献楚俘于周襄王，王策命晋侯为侯伯；诸侯会于践土，晋文公遂为中原霸主。楚子玉归而自杀。',
    why: '城濮一战把楚国的北上势头挡在黄河以南，晋国由此接替齐国成为中原秩序的主导者。',
    src: '《左传·僖公二十八年》；《史记·晋世家》。',
    events: [
      { time: '前632·五月', who: '晋文公', text: '献楚俘于周襄王', t: 0.08 },
      { time: '前632·五月', who: '周襄王', text: '策命晋侯为侯伯', t: 0.36 },
      { time: '前632·五月', who: '诸侯', text: '会于践土', t: 0.64 },
      { time: '前632·五月', who: '楚子玉', text: '归而自杀', t: 0.86 }
    ],
    nums: [
      { label: '晋军', value: '车七百乘', kind: '史载', n: 7 },
      { label: '楚俘', value: '无确载', kind: '无确载', n: null },
      { label: '会盟诸侯', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE4,
    markers: [
      { type: 'host', side: 'jin', x: 62, y: 96, t: 0.30, name: '晋文公', lx: 76, ly: 94, anchor: 'start' },
      { type: 'host', side: 'chu', x: 208, y: 172, t: 0.02, name: '子玉', lx: 222, ly: 176, anchor: 'start', weak: true }
    ],
    routes: [
      { d: 'M 196 140 C 162 128 118 112 74 102', side: 'jin', t0: 0.20, t1: 0.50,
        label: '献俘归绛', lx: 130, ly: 116, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = BASE1;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 118 C 60 112 120 108 180 110 C 240 112 300 108 385 104', color: '#a8b6ab', width: 3 },
    { d: 'M 40 192 C 100 186 160 180 220 176 C 280 172 330 168 385 164', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 108 62 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 288 62 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 56 278 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 286 286 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 20, y: 104, t: '黄　河', size: 10, color: '#46594f', ls: 3, serif: true },
    { x: 60, y: 180, t: '济　水', size: 8.5, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '城濮·今山东鄄城西南　楚丘·今河南滑县', size: 7.5, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '中 原', size: 8.5, color: '#7d6647', ls: 2 }
  ]
};

var META = {
  id: 'chengpu',
  title: '城濮之战',
  kicker: '沙 盘 推 演',
  subtitle: '城濮 · 晋楚争霸',
  years: '前632',
  yearUnit: '',
  era: '春秋 · 晋文公五年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝决战 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：城濮今山东鄄城西南、楚丘今河南滑县，非真实地理比例',
  hook: '晋文公退避三舍，城濮一战败楚，践土称霸',
  period: '春秋',
  yearValue: -632,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '晋', b: '霸', sub: '前632' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
