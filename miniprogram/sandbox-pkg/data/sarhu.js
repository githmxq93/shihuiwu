/**
 * 沙盘推演 · 萨尔浒之战（1619）
 * 通行叙事：明军四路出师、萨尔浒破杜松、尚间崖破马林、阿布达里破刘綎。
 * 明军「号四十七万」为史载，实约十一万为通行推算；后金约六万为史载；
 * 各路明军分兵数无确载者只作推算并注明，其余标「无确载」，不编造数字。
 * 辽东地名以今地名对照：萨尔浒今辽宁抚顺东、赫图阿拉今辽宁新宾西、阿布达里今辽宁桓仁。
 */
var COLOR = { ming: '#2b5262', jin: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

var CITY_DEFS = [
  { id: 'shenyang',  name: '沈阳',     x: 82,  y: 268, tx: 82,  ty: 282, anchor: 'middle' },
  { id: 'fushun',    name: '抚顺关',   x: 136, y: 226, tx: 136, ty: 240, anchor: 'middle' },
  { id: 'sarhu',     name: '萨尔浒',   x: 176, y: 204, tx: 176, ty: 190, anchor: 'middle' },
  { id: 'shangjian', name: '尚间崖',   x: 208, y: 168, tx: 208, ty: 154, anchor: 'middle' },
  { id: 'hetuara',   name: '赫图阿拉', x: 246, y: 140, tx: 246, ty: 126, anchor: 'middle' },
  { id: 'kayuan',    name: '开原',     x: 132, y: 92,  tx: 132, ty: 78,  anchor: 'middle' },
  { id: 'abudali',   name: '阿布达里', x: 288, y: 208, tx: 288, ty: 222, anchor: 'middle' }
];

var BASE1 = { shenyang: 'ming', fushun: 'ming', kayuan: 'ming', sarhu: 'contested', shangjian: 'contested', abudali: 'contested', hetuara: 'jin' };
var BASE2 = { shenyang: 'ming', fushun: 'ming', kayuan: 'ming', sarhu: 'jin', shangjian: 'contested', abudali: 'contested', hetuara: 'jin' };
var BASE3 = { shenyang: 'ming', fushun: 'ming', kayuan: 'ming', sarhu: 'jin', shangjian: 'jin', abudali: 'contested', hetuara: 'jin' };
var BASE4 = { shenyang: 'ming', fushun: 'ming', kayuan: 'ming', sarhu: 'jin', shangjian: 'jin', abudali: 'jin', hetuara: 'jin' };

var STAGES = [
  {
    label: '四路出师', seal: '出师',
    kicker: '阶段一 · 1619 年 二月',
    title: '四路出师，约期会攻',
    turn: '明廷以杨镐经略辽东，分四路进兵：杜松出抚顺关、马林出开原、刘綎出宽奠、李如柏出清河，约期会攻赫图阿拉；努尔哈赤集兵约六万，决意「凭尔几路来，我只一路去」。',
    why: '明军兵力占优却分路而进，山路阻隔、声息不通；后金以内线机动集中兵力，得以在每一路形成局部优势。',
    src: '《明史·杨镐传》《刘綎传》《马林传》；《清太祖实录》卷六。明军号四十七万为史载，实兵约十一万为通行推算。',
    events: [
      { time: '1619·二月', who: '杨镐', text: '四路出师，约期会攻赫图阿拉', t: 0.06 },
      { time: '1619·二月', who: '杜松', text: '出抚顺关，趋萨尔浒', t: 0.30 },
      { time: '1619·二月', who: '马林', text: '出开原，趋尚间崖', t: 0.50 },
      { time: '1619·二月', who: '刘綎', text: '出宽奠，趋阿布达里', t: 0.70 },
      { time: '1619·二月', who: '努尔哈赤', text: '集兵约六万，只击一路', t: 0.88 }
    ],
    nums: [
      { label: '明军', value: '号四十七万', kind: '史载', n: 47 },
      { label: '明军实兵', value: '约十一万', kind: '推算', n: 11 },
      { label: '后金军', value: '约六万', kind: '史载', n: 6 }
    ],
    hold: BASE1,
    flips: { sarhu: 0.30, shangjian: 0.50, abudali: 0.70 },
    markers: [
      { type: 'host', side: 'ming', x: 136, y: 226, t: 0.04, name: '杜松', lx: 122, ly: 240, anchor: 'end' },
      { type: 'host', side: 'ming', x: 132, y: 92, t: 0.46, name: '马林', lx: 118, ly: 104, anchor: 'end' },
      { type: 'army', side: 'ming', x: 300, y: 236, t: 0.66, name: '刘綎', lx: 300, ly: 250, anchor: 'end' },
      { type: 'host', side: 'jin', x: 246, y: 140, t: 0.84, name: '努尔哈赤', lx: 262, ly: 150, anchor: 'start' }
    ],
    routes: [
      { d: 'M 140 222 C 152 214 164 208 174 204', side: 'ming', t0: 0.28, t1: 0.48,
        label: '杜松趋萨尔浒', lx: 146, ly: 210, anchor: 'start' },
      { d: 'M 136 98 C 150 126 170 152 194 164', side: 'ming', t0: 0.48, t1: 0.68,
        label: '马林趋尚间崖', lx: 152, ly: 132, anchor: 'start' },
      { d: 'M 302 232 C 298 222 294 214 290 210', side: 'ming', t0: 0.68, t1: 0.86,
        label: '刘綎趋阿布达里', lx: 306, ly: 242, anchor: 'end' }
    ]
  },
  {
    label: '破杜松', seal: '萨尔浒',
    kicker: '阶段二 · 1619 年 三月初一',
    title: '萨尔浒破杜松',
    turn: '杜松渡浑河，攻界凡，主力屯萨尔浒；努尔哈赤先破萨尔浒明军大营，再回击吉林崖，杜松战死，杜松部覆没。',
    why: '后金先打明军兵力分散的一路，以六万对三万，一举吃掉明军最精锐的西路；其余各路尚在途中，无从应援。',
    src: '《明史·杜松传》；《清太祖实录》卷六。杜松部约三万为通行推算，后金六万为史载。',
    events: [
      { time: '1619·三月初一', who: '杜松', text: '渡浑河，攻界凡', t: 0.08 },
      { time: '1619·三月初一', who: '努尔哈赤', text: '先破萨尔浒明军大营', t: 0.38, kind: 'flip', city: 'sarhu' },
      { time: '1619·三月初一', who: '后金', text: '回击吉林崖，杜松战死', t: 0.66 },
      { time: '1619·三月初一', who: '明军', text: '杜松部覆没', t: 0.86 }
    ],
    nums: [
      { label: '杜松军', value: '约三万', kind: '推算', n: 3 },
      { label: '后金军', value: '约六万', kind: '史载', n: 6 },
      { label: '萨尔浒大营', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE2,
    flips: { sarhu: 0.40 },
    sieges: [
      { x: 176, y: 204, t: 0.36, label: '萨尔浒破', side: 'jin', lx: 12, ly: 12, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'ming', x: 136, y: 226, t: 0.02, name: '杜松', lx: 122, ly: 236, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'ming', x: 176, y: 204, t: 0.10, name: '萨尔浒大营', lx: 150, ly: 228, anchor: 'end', weak: true },
      { type: 'host', side: 'jin', x: 246, y: 140, t: 0.16, name: '努尔哈赤', lx: 258, ly: 130, anchor: 'start', moveRef: 1 },
      { type: 'army', side: 'jin', x: 184, y: 196, t: 0.52, name: '', lx: 194, ly: 184, anchor: 'start' }
    ],
    routes: [
      { d: 'M 140 222 C 152 216 164 210 174 206', side: 'ming', t0: 0.04, t1: 0.24,
        label: '杜松渡浑河', lx: 132, ly: 204, anchor: 'end' },
      { d: 'M 244 144 C 222 162 200 184 182 200', side: 'jin', t0: 0.18, t1: 0.44,
        label: '后金集中兵力', lx: 226, ly: 176, anchor: 'start' },
      { d: 'M 182 200 C 176 196 170 192 166 186', side: 'jin', t0: 0.58, t1: 0.78,
        label: '回击吉林崖', lx: 198, ly: 184, anchor: 'start' }
    ]
  },
  {
    label: '破马林', seal: '尚间崖',
    kicker: '阶段三 · 1619 年 三月初二',
    title: '尚间崖破马林',
    turn: '马林进至尚间崖，结营自固；努尔哈赤即日转兵北上，破尚间崖明军，马林退守开原。',
    why: '后金连续作战、不給明军集结时间；马林一路被击破后，明军四路已去其二，合围之势彻底瓦解。',
    src: '《明史·马林传》；《清太祖实录》卷六。马林部约一万五千为通行推算。',
    events: [
      { time: '1619·三月初二', who: '马林', text: '进至尚间崖，结营', t: 0.08 },
      { time: '1619·三月初二', who: '努尔哈赤', text: '转兵北上', t: 0.32 },
      { time: '1619·三月初二', who: '后金', text: '破尚间崖明军', t: 0.62, kind: 'flip', city: 'shangjian' },
      { time: '1619·三月初二', who: '马林', text: '退守开原', t: 0.84 }
    ],
    nums: [
      { label: '马林军', value: '约一万五千', kind: '推算', n: 1.5 },
      { label: '后金军', value: '约六万', kind: '史载', n: 6 },
      { label: '明军溃兵', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE3,
    flips: { shangjian: 0.62 },
    sieges: [
      { x: 208, y: 168, t: 0.58, label: '尚间崖破', side: 'jin', lx: 16, ly: -8, anchor: 'start' }
    ],
    markers: [
      { type: 'host', side: 'ming', x: 208, y: 168, t: 0.02, name: '马林', lx: 222, ly: 178, anchor: 'start', moveRef: 1 },
      { type: 'host', side: 'jin', x: 190, y: 190, t: 0.24, name: '努尔哈赤', lx: 156, ly: 206, anchor: 'end', moveRef: 0 }
    ],
    routes: [
      { d: 'M 184 196 C 190 186 198 176 204 170', side: 'jin', t0: 0.28, t1: 0.56,
        label: '转兵北上', lx: 168, ly: 214, anchor: 'end' },
      { d: 'M 204 164 C 182 142 158 116 136 98', side: 'retreat', t0: 0.70, t1: 0.94,
        label: '退守开原', lx: 168, ly: 128, anchor: 'start' }
    ]
  },
  {
    label: '破刘綎', seal: '阿布达里',
    kicker: '阶段四 · 1619 年 三月初四—初五',
    title: '阿布达里破刘綎',
    turn: '刘綎一路深入，后金伪明军旗号诱其急进，于阿布达里岗伏击，刘綎战死；李如柏闻败撤退，明军四路俱溃。',
    why: '刘綎一路被诱歼后，明军再无成建制兵力可战；萨尔浒一战使后金由守转攻，辽东攻守之势自此逆转。',
    src: '《明史·刘綎传》《李如柏传》；《清太祖实录》卷六。刘綎部约一万余为通行推算，李如柏部无确载。',
    events: [
      { time: '1619·三月初四', who: '刘綎', text: '进至阿布达里', t: 0.08 },
      { time: '1619·三月初四', who: '后金', text: '伪明军旗号诱敌', t: 0.32 },
      { time: '1619·三月初五', who: '后金', text: '伏击，刘綎战死', t: 0.62, kind: 'flip', city: 'abudali' },
      { time: '1619·三月初五', who: '李如柏', text: '闻败撤退', t: 0.86 }
    ],
    nums: [
      { label: '刘綎军', value: '约一万余', kind: '推算', n: 1 },
      { label: '后金军', value: '约六万', kind: '史载', n: 6 },
      { label: '李如柏军', value: '无确载', kind: '无确载', n: null }
    ],
    hold: BASE4,
    flips: { abudali: 0.62 },
    sieges: [
      { x: 288, y: 208, t: 0.60, label: '阿布达里破', side: 'jin', lx: -10, ly: 26, anchor: 'end' }
    ],
    markers: [
      { type: 'host', side: 'ming', x: 288, y: 208, t: 0.02, name: '刘綎', lx: 302, ly: 196, anchor: 'start', weak: true },
      { type: 'host', side: 'jin', x: 250, y: 146, t: 0.20, name: '后金军', lx: 238, ly: 156, anchor: 'end', moveRef: 0 }
    ],
    routes: [
      { d: 'M 250 148 C 264 166 278 186 286 202', side: 'jin', t0: 0.24, t1: 0.58,
        label: '南下迎击', lx: 268, ly: 170, anchor: 'start' },
      { d: 'M 288 214 C 258 232 224 248 194 260', side: 'retreat', t0: 0.78, t1: 0.96,
        label: '李如柏撤退', lx: 236, ly: 250, anchor: 'middle' }
    ]
  }
];

var INIT_HOLD = { shenyang: 'ming', fushun: 'ming', kayuan: 'ming', sarhu: 'jin', shangjian: 'jin', abudali: 'jin', hetuara: 'jin' };

var TERRAIN = {
  fills: [],
  strokes: [
    { d: 'M -10 244 C 60 236 120 224 180 214 C 240 202 300 192 385 188', color: '#a8b6ab', width: 3 },
    { d: 'M 208 132 C 226 158 244 186 266 212', color: '#b6c3b6', width: 2 }
  ],
  lines: [
    { d: 'M 58 178 l14 -16 l10 11 l12 -15', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 266 96 l12 -14 l9 10 l11 -13', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 220 296 l14 -15 l10 10 l12 -14', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 300 274 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 96 316 l12 -12 l9 9 l11 -12', color: '#c8b494', width: 1.1, opacity: 0.8 }
  ],
  texts: [
    { x: 26, y: 234, t: '浑　河', size: 9, color: '#46594f', ls: 2, serif: true },
    { x: 24, y: 24, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1 },
    { x: 24, y: 350, t: '萨尔浒·今辽宁抚顺东', size: 7.5, color: '#7d6647', ls: 0.5 },
    { x: 24, y: 366, t: '赫图阿拉·今辽宁新宾西　阿布达里·今辽宁桓仁', size: 7.5, color: '#7d6647', ls: 0.5 }
  ]
};

var META = {
  id: 'sarhu',
  title: '萨尔浒之战',
  kicker: '沙 盘 推 演',
  subtitle: '浑河 · 萨尔浒—阿布达里',
  years: '1619',
  yearUnit: 'AD',
  era: '明 · 万历四十七年',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝攻破 ｜ 易＝易手 ｜ 虚线＝退却',
  note: '示意沙盘：萨尔浒今辽宁抚顺东、赫图阿拉今辽宁新宾西、阿布达里今辽宁桓仁，非真实地理比例',
  hook: '明军四路合击赫图阿拉，努尔哈赤集中兵力，五日内连破三路',
  period: '明',
  yearValue: 1619,
  cityMode: 'territory',
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
