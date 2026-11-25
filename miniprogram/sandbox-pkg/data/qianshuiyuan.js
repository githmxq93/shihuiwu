/**
 * 沙盘推演 · 浅水原之战（618）
 * 通行叙事：薛举攻泾州，李世民拒之；李世民病，刘文静、殷开山出战，唐军大败于高墌；
 * 薛举死，薛仁杲继；李世民再至，深沟高垒六十余日，待薛军粮尽，决战浅水原，进围折墌城受降。
 * 薛军「十余万」、相持「六十余日」为史载；唐军兵力无确载。
 * 地名古今对照：高墌今陕西长武北、浅水原今陕西长武西北、折墌城今甘肃泾川东北。
 */
var COLOR = { tang: '#2b5262', xue: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'changan',      name: '长安',   x: 300, y: 288, tx: 300, ty: 304, anchor: 'middle' },
  { id: 'jingzhou',     name: '泾州',   x: 226, y: 214, tx: 240, ty: 208, anchor: 'start' },
  { id: 'gaozhi',       name: '高墌',   x: 204, y: 186, tx: 190, ty: 196, anchor: 'end' },
  { id: 'qianshuiyuan', name: '浅水原', x: 180, y: 170, tx: 166, ty: 158, anchor: 'end' },
  { id: 'zhezu',        name: '折墌城', x: 152, y: 146, tx: 138, ty: 140, anchor: 'end' },
  { id: 'jincheng',     name: '金城',   x: 96,  y: 110, tx: 96,  ty: 96,  anchor: 'middle' }
];

var BASE0 = { changan: 'tang', jingzhou: 'tang', gaozhi: 'tang', qianshuiyuan: 'tang', zhezu: 'xue', jincheng: 'xue' };
var BASE1 = { changan: 'tang', jingzhou: 'contested', gaozhi: 'tang', qianshuiyuan: 'tang', zhezu: 'xue', jincheng: 'xue' };
var BASE2 = { changan: 'tang', jingzhou: 'xue', gaozhi: 'xue', qianshuiyuan: 'tang', zhezu: 'xue', jincheng: 'xue' };
var BASE3 = { changan: 'tang', jingzhou: 'xue', gaozhi: 'xue', qianshuiyuan: 'tang', zhezu: 'xue', jincheng: 'xue' };
var BASE4 = { changan: 'tang', jingzhou: 'xue', gaozhi: 'tang', qianshuiyuan: 'tang', zhezu: 'xue', jincheng: 'xue' };
var BASE5 = { changan: 'tang', jingzhou: 'tang', gaozhi: 'tang', qianshuiyuan: 'tang', zhezu: 'tang', jincheng: 'xue' };

var STAGES = [
  {
    label: '薛举攻泾州', seal: '来犯',
    kicker: '阶段一 · 618 年 六月',
    title: '薛举率十余万攻泾州',
    turn: '薛举率众十余万自金城东下，攻唐泾州；唐以秦王李世民为西讨元帅，率军拒之。',
    why: '薛举据陇右，居高临下威胁关中；若不能遏其锋，长安西面便无屏障。',
    src: '《旧唐书·薛举传》《太宗本纪》；《资治通鉴》卷一百八十五。「十余万」为史载。',
    events: [
      { time: '618·六月', who: '薛举', text: '率十余万众东下', t: 0.08 },
      { time: '618·六月', who: '薛军', text: '攻泾州', t: 0.34, kind: 'flip', city: 'jingzhou' },
      { time: '618·六月', who: '唐高祖', text: '以李世民为西讨元帅', t: 0.58 },
      { time: '618·六月', who: '李世民', text: '率军进驻高墌', t: 0.84 }
    ],
    nums: [
      { label: '薛军', value: '十余万', kind: '史载', n: 100 },
      { label: '唐军', value: '无确载', kind: '无确载', n: null },
      { label: '泾州', value: '被攻', kind: '史载', n: null }
    ],
    hold: BASE1,
    flips: { jingzhou: 0.34 },
    markers: [
      { type: 'host', side: 'xue', x: 96, y: 110, t: 0.02, name: '薛举', lx: 110, ly: 104, anchor: 'start' },
      { type: 'host', side: 'tang', x: 204, y: 186, t: 0.56, name: '李世民', lx: 218, ly: 180, anchor: 'start' },
      { type: 'army', side: 'xue', x: 150, y: 150, t: 0.34, name: '薛军', lx: 136, ly: 144, anchor: 'end' }
    ],
    routes: [
      { d: 'M 104 116 C 132 138 168 166 220 208', side: 'xue', t0: 0.12, t1: 0.58,
        label: '薛军东下', lx: 146, ly: 148, anchor: 'middle' }
    ]
  },
  {
    label: '高墌之败', seal: '大败',
    kicker: '阶段二 · 618 年 七月',
    title: '李世民病，唐军大败于高墌',
    turn: '李世民患疟疾，委军事于刘文静、殷开山；二人恃众轻敌，出战于高墌西南，薛举潜师掩其后，唐军大败，死者数万。',
    why: '主帅病卧、诸将轻进，唐军以堂堂之阵被薛军前后夹击，关中西面震动。',
    src: '《旧唐书·薛举传》《刘文静传》；《资治通鉴》卷一百八十五。「潜师掩其后」为史载。',
    events: [
      { time: '618·七月', who: '李世民', text: '患疟疾，委军于诸将', t: 0.08 },
      { time: '618·七月', who: '刘文静·殷开山', text: '恃众轻敌，出阵于高墌西南', t: 0.34 },
      { time: '618·七月', who: '薛举', text: '潜师掩唐军之后', t: 0.58, kind: 'flip', city: 'gaozhi' },
      { time: '618·七月', who: '唐军', text: '大败，死者数万', t: 0.84, kind: 'flip', city: 'jingzhou' }
    ],
    nums: [
      { label: '薛军', value: '十余万', kind: '史载', n: 100 },
      { label: '唐军死者', value: '数万', kind: '史载', n: null },
      { label: '高墌', value: '失守', kind: '史载', n: null }
    ],
    hold: BASE2,
    flips: { gaozhi: 0.58, jingzhou: 0.84 },
    sieges: [
      { x: 204, y: 186, t: 0.58, label: '唐军败', side: 'xue', lx: 14, ly: -10, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'xue', x: 204, y: 186, t: 0.30, name: '薛举', lx: 218, ly: 192, anchor: 'start' },
      { type: 'host', side: 'tang', x: 204, y: 186, t: 0.02, name: '李世民', lx: 190, ly: 174, anchor: 'end', weak: true },
      { type: 'army', side: 'xue', x: 182, y: 174, t: 0.56, name: '薛军', lx: 168, ly: 168, anchor: 'end' }
    ],
    routes: [
      { d: 'M 160 152 C 176 162 190 172 202 182', side: 'xue', t0: 0.30, t1: 0.66,
        label: '薛军掩后', lx: 166, ly: 164, anchor: 'end' }
    ]
  },
  {
    label: '坚壁相持', seal: '相持',
    kicker: '阶段三 · 618 年 九至十一月',
    title: '李世民深沟高垒，相持六十余日',
    turn: '薛举病死，子薛仁杲继；李世民再率军至，深沟高垒，坚壁不出，与薛军相持六十余日，待其粮尽。',
    why: '薛军锋锐而粮运线长，李世民以守待变；时间站在唐军一边。',
    src: '《旧唐书·太宗本纪》《薛仁杲传》；《资治通鉴》卷一百八十五。「相持六十余日」为史载。',
    events: [
      { time: '618·八月', who: '薛举', text: '病死，薛仁杲继位', t: 0.08 },
      { time: '618·九月', who: '李世民', text: '再至高墌，深沟高垒', t: 0.34 },
      { time: '618·九月', who: '唐军', text: '坚壁不出', t: 0.58 },
      { time: '618·冬', who: '两军', text: '相持六十余日', t: 0.84 }
    ],
    nums: [
      { label: '相持', value: '六十余日', kind: '史载', n: null },
      { label: '薛军', value: '十余万', kind: '史载', n: 100 },
      { label: '唐军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE3,
    markers: [
      { type: 'host', side: 'tang', x: 204, y: 186, t: 0.30, name: '李世民', lx: 190, ly: 180, anchor: 'end' },
      { type: 'host', side: 'xue', x: 152, y: 146, t: 0.02, name: '薛仁杲', lx: 138, ly: 158, anchor: 'end', weak: true },
      { type: 'army', side: 'tang', x: 214, y: 196, t: 0.34, name: '唐军', lx: 228, ly: 190, anchor: 'start' }
    ],
    routes: []
  },
  {
    label: '浅水原决战', seal: '决战',
    kicker: '阶段四 · 618 年 十一月',
    title: '李世民诱敌夹击，大破宗罗睺',
    turn: '薛军粮尽，宗罗睺挑战；李世民遣庞玉阵于浅水原南诱敌，自率精骑出其后夹击，薛军大溃，斩首数千，投涧死者不可胜计。',
    why: '唐军蓄锐六十余日，一旦反击便以逸待劳；浅水原一破，折墌城便成孤城。',
    src: '《旧唐书·太宗本纪》；《资治通鉴》卷一百八十五。「夹击」为史载。',
    events: [
      { time: '618·十一月', who: '宗罗睺', text: '粮尽，率军挑战', t: 0.08 },
      { time: '618·十一月', who: '庞玉', text: '阵于浅水原南诱敌', t: 0.34 },
      { time: '618·十一月', who: '李世民', text: '率精骑出其后夹击', t: 0.58, kind: 'flip', city: 'qianshuiyuan' },
      { time: '618·十一月', who: '薛军', text: '大溃，死者不可胜计', t: 0.84, kind: 'flip', city: 'gaozhi' }
    ],
    nums: [
      { label: '薛军', value: '十余万', kind: '史载', n: 100 },
      { label: '唐军', value: '无确载', kind: '无确载', n: null },
      { label: '斩首', value: '数千', kind: '史载', n: null }
    ],
    hold: BASE4,
    flips: { qianshuiyuan: 0.58, gaozhi: 0.84 },
    markers: [
      { type: 'host', side: 'tang', x: 180, y: 170, t: 0.30, name: '李世民', lx: 166, ly: 182, anchor: 'end' },
      { type: 'host', side: 'xue', x: 152, y: 146, t: 0.02, name: '宗罗睺', lx: 138, ly: 140, anchor: 'end', weak: true },
      { type: 'army', side: 'tang', x: 196, y: 180, t: 0.56, name: '唐军', lx: 210, ly: 174, anchor: 'start' }
    ],
    routes: [
      { d: 'M 200 180 C 190 174 182 170 176 168', side: 'tang', t0: 0.52, t1: 0.86,
        label: '精骑夹击', lx: 200, ly: 166, anchor: 'start' }
    ]
  },
  {
    label: '折墌受降', seal: '受降',
    kicker: '阶段五 · 618 年 十一月',
    title: '唐军围折墌城，薛仁杲出降',
    turn: '李世民率军进围折墌城，薛仁杲穷蹙出降，陇右平定；唐得精兵万余人，关中后方遂安。',
    why: '浅水原一战定陇右；此后唐可专心东向，对付刘武周、王世充等割据势力。',
    src: '《旧唐书·太宗本纪》《薛仁杲传》；《资治通鉴》卷一百八十五。',
    events: [
      { time: '618·十一月', who: '李世民', text: '率军进围折墌城', t: 0.08 },
      { time: '618·十一月', who: '薛仁杲', text: '穷蹙出降', t: 0.34, kind: 'flip', city: 'zhezu' },
      { time: '618·十一月', who: '唐军', text: '得精兵万余人', t: 0.58 },
      { time: '618·十一月', who: '唐', text: '陇右平定', t: 0.84, kind: 'flip', city: 'jingzhou' }
    ],
    nums: [
      { label: '唐得精兵', value: '万余人', kind: '史载', n: 10 },
      { label: '薛军', value: '十余万', kind: '史载', n: 100 },
      { label: '陇右', value: '平定', kind: '史载', n: null }
    ],
    hold: BASE5,
    flips: { zhezu: 0.34, jingzhou: 0.84 },
    markers: [
      { type: 'host', side: 'tang', x: 152, y: 146, t: 0.30, name: '李世民', lx: 166, ly: 140, anchor: 'start' },
      { type: 'host', side: 'xue', x: 152, y: 146, t: 0.02, name: '薛仁杲', lx: 138, ly: 158, anchor: 'end', weak: true },
      { type: 'army', side: 'tang', x: 176, y: 162, t: 0.10, name: '唐军', lx: 190, ly: 156, anchor: 'start' }
    ],
    routes: [
      { d: 'M 186 172 C 174 162 164 154 156 148', side: 'tang', t0: 0.08, t1: 0.44,
        label: '进围折墌', lx: 188, ly: 154, anchor: 'start' }
    ]
  }
];

var INIT_HOLD = BASE0;

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M 30 60 C 60 130 90 190 120 250 C 138 288 150 330 156 386', color: '#a8b6ab', width: 2.6 },
    { d: 'M -10 250 C 80 244 160 252 240 246 C 300 242 350 246 385 250', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 100 60 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.85 },
    { d: 'M 240 70 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.75 },
    { d: 'M 90 320 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 320 330 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 60, y: 196, t: '泾　水', size: 9, color: '#46594f', ls: 2, serif: true, rotate: 66 },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 348, t: '高墌·今陕西长武北　浅水原·今陕西长武西北　折墌城·今甘肃泾川东北', size: 6.8, color: '#7d6647', ls: 0.4 },
    { x: 24, y: 366, t: '陇　右', size: 8.5, color: '#7d6647', ls: 3 }
  ]
};

var META = {
  id: 'qianshuiyuan',
  title: '浅水原之战',
  kicker: '沙 盘 推 演',
  subtitle: '高墌 · 浅水原',
  years: '618',
  yearUnit: 'AD',
  era: '唐 · 武德元年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻守 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：高墌今陕西长武北、浅水原今陕西长武西北，非真实地理比例',
  hook: '李世民高墌大败后坚壁六十余日，浅水原夹击破薛军，受降折墌城',
  period: '隋唐',
  yearValue: 618,
  cityMode: 'territory',
  hideFocus: true,
  endSeal: { a: '唐', b: '胜', sub: '618' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
