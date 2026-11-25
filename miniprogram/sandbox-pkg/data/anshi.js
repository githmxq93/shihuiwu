/**
 * 沙盘推演 · 安史之乱（数据层）
 *
 * 内容源自原型 `_design/chibi/e-anshi.html`，六阶段划分、事件节点、
 * 兵力数字与「史载 / 推算 / 无确载」标注、出处均原样保留，未改写数字。
 *
 * 渲染层（utils/sandbox-engine.js）只消费本文件的结构，不写死任何战役内容；
 * 后续新增第二场战役时，复制一份同结构数据即可，页面与引擎无需改动。
 */

var COLOR = { tang: '#2b5262', rebel: '#6f3a22', retreat: '#6d655a', contested: '#8a5a22' };

// 示意图城池：坐标为 375 × 380 逻辑坐标，与本文件 terrain 共用同一坐标系
var CITY_DEFS = [
  { id: 'lingwu',    name: '灵武',     x: 44,  y: 92,  tx: 44,  ty: 107, anchor: 'middle' },
  { id: 'fanyang',   name: '范阳·幽州', x: 300, y: 66,  tx: 300, ty: 51,  anchor: 'middle' },
  { id: 'changshan', name: '常山',     x: 196, y: 74,  tx: 196, ty: 59,  anchor: 'middle' },
  { id: 'yecheng',   name: '邺城',     x: 238, y: 116, tx: 248, ty: 119, anchor: 'start' },
  { id: 'changan',   name: '长安',     x: 70,  y: 218, tx: 70,  ty: 235, anchor: 'middle' },
  { id: 'tongguan',  name: '潼关',     x: 132, y: 200, tx: 132, ty: 217, anchor: 'middle' },
  { id: 'luoyang',   name: '洛阳',     x: 196, y: 196, tx: 196, ty: 213, anchor: 'middle' },
  { id: 'suiyang',   name: '睢阳',     x: 272, y: 246, tx: 272, ty: 263, anchor: 'middle' }
];

var STAGES = [
  {
    label: '范阳起兵', seal: '起兵',
    kicker: '阶段一 · 天宝十四载 十一月—十二月',
    title: '范阳起兵，河北沦陷',
    turn: '安禄山以三镇边兵起于范阳，河北郡县望风而降；常山一失，唐在河北的内应被拔除。',
    why: '唐内地承平、武备空虚，叛军握边兵精骑，数月间由范阳推进到黄河；河北既失，洛阳失去北面屏障，十二月洛阳陷落，战火转入河南。',
    src: '《旧唐书·安禄山传》《资治通鉴》卷二一七。三镇兵约十五万、号二十万，史料与学界口径不一。',
    events: [
      { time: '755·十一', who: '安禄山', text: '范阳起兵，众号二十万', kind: 'raise', city: 'fanyang', mark: '起', sx: 0, sy: 13, t: 0.05 },
      { time: '755·十二', who: '安禄山', text: '渡河，陈留、荥阳陷', kind: 'march', route: 0, t: 0.24 },
      { time: '756·正月', who: '颜杲卿', text: '常山举兵，河北十七郡应', kind: 'raise', city: 'changshan', mark: '义', sx: 0, sy: 13, t: 0.50 },
      { time: '756·正月', who: '史思明', text: '陷常山，颜杲卿死', kind: 'siege', siege: 0, t: 0.64 }
    ],
    nums: [
      { label: '叛军起兵', value: '号二十万', kind: '史载', n: 20 },
      { label: '三镇边兵', value: '约十五万', kind: '推算', n: 15 },
      { label: '河北唐军', value: '无确载', kind: '—', n: null }
    ],
    markers: [
      { type: 'host', side: 'rebel', x: 298, y: 70, t: 0.05, name: '安禄山军', lx: 276, ly: 80, anchor: 'end', moveRef: 0 },
      { type: 'army', side: 'rebel', x: 196, y: 70, t: 0.30, name: '史思明', lx: 216, ly: 88, anchor: 'start', moveRef: 1 },
      { type: 'army', side: 'tang', x: 196, y: 196, t: 0.42, weak: true, name: '封常清', lx: 196, ly: 181, anchor: 'middle' }
    ],
    routes: [
      { d: 'M 296 74 C 276 90 258 102 242 114 C 230 120 222 125 216 128', side: 'rebel',
        t0: 0.05, t1: 0.52, label: '安禄山南下', lx: 252, ly: 92, anchor: 'start' },
      { d: 'M 294 64 C 268 56 232 58 200 70', side: 'rebel',
        t0: 0.30, t1: 0.64, label: '史思明攻常山', lx: 212, ly: 50, anchor: 'start' }
    ],
    sieges: [
      { x: 196, y: 74, t: 0.64, label: '常山陷', side: 'rebel', lx: -9, ly: 3, anchor: 'end' }
    ],
    flips: { yecheng: 0.26, changshan: 0.64 },
    hold: { fanyang: 'rebel', changshan: 'contested', yecheng: 'rebel', luoyang: 'tang',
            tongguan: 'tang', changan: 'tang', suiyang: 'tang', lingwu: 'tang' }
  },
  {
    label: '两京陷落', seal: '陷京',
    kicker: '阶段二 · 天宝十四载 十二月—天宝十五载 六月',
    title: '潼关失守，两京陷落',
    turn: '潼关既破，长安无险可守；玄宗西奔，肃宗北上灵武另立朝廷。',
    why: '潼关是关中门户，唐廷强令哥舒翰出关野战，一战覆没；中枢出逃使平叛指挥中断，平叛重心由长安转到灵武。',
    src: '《旧唐书·哥舒翰传》《资治通鉴》卷二一八。潼关唐军八万为史载，叛军十万为推算，均有争议。',
    burn: true,
    events: [
      { time: '755·十二', who: '封常清', text: '洛阳失守，与高仙芝退潼关', kind: 'flip', city: 'luoyang', t: 0.08 },
      { time: '756·正月', who: '安禄山', text: '洛阳称帝，国号燕', kind: 'raise', city: 'luoyang', mark: '帝', sx: -20, sy: 14, t: 0.24 },
      { time: '756·六月', who: '哥舒翰', text: '灵宝败，潼关失守', kind: 'siege', siege: 0, t: 0.34 },
      { time: '756·六月', who: '玄宗', text: '弃长安奔蜀，马嵬兵变', kind: 'march', route: 2, t: 0.68 }
    ],
    nums: [
      { label: '潼关唐军', value: '约八万', kind: '史载', n: 8 },
      { label: '叛军攻潼关', value: '约十万', kind: '推算', n: 10 },
      { label: '长安守备', value: '无确载', kind: '—', n: null }
    ],
    markers: [
      { type: 'host', side: 'rebel', x: 194, y: 198, t: 0.05, name: '叛军主力', lx: 194, ly: 182, anchor: 'middle', moveRef: 0 },
      { type: 'army', side: 'tang', x: 132, y: 200, t: 0.18, weak: true, name: '哥舒翰', lx: 120, ly: 203, anchor: 'end' },
      { type: 'army', side: 'tang', x: 66, y: 220, t: 0.70, weak: true, name: '', lx: 54, ly: 238, anchor: 'end', moveRef: 2 },
      { type: 'army', side: 'tang', x: 74, y: 214, t: 0.72, name: '', lx: 88, ly: 206, anchor: 'start', moveRef: 3 }
    ],
    routes: [
      { d: 'M 194 198 C 172 194 150 196 134 200', side: 'rebel',
        t0: 0.05, t1: 0.36, label: '叛军西进', lx: 158, ly: 188, anchor: 'start' },
      { d: 'M 130 202 C 112 206 90 212 72 218', side: 'rebel',
        t0: 0.38, t1: 0.62, label: '长安陷落', lx: 104, ly: 250, anchor: 'start' },
      { d: 'M 66 220 C 48 226 28 232 2 238', side: 'retreat',
        t0: 0.66, t1: 0.92, label: '玄宗奔蜀', lx: 30, ly: 254, anchor: 'start' },
      { d: 'M 74 214 C 66 180 54 136 46 98', side: 'tang',
        t0: 0.72, t1: 0.96, label: '肃宗北上', lx: 66, ly: 156, anchor: 'start' }
    ],
    sieges: [
      { x: 132, y: 200, t: 0.34, label: '潼关破', side: 'rebel' },
      { x: 70, y: 218, t: 0.62, label: '长安陷', side: 'rebel' }
    ],
    flips: { luoyang: 0.08, tongguan: 0.34, changan: 0.62 },
    hold: { fanyang: 'rebel', changshan: 'rebel', yecheng: 'rebel', luoyang: 'rebel',
            tongguan: 'rebel', changan: 'rebel', suiyang: 'tang', lingwu: 'tang' }
  },
  {
    label: '灵武借兵', seal: '灵武',
    kicker: '阶段三 · 至德元载 七月—至德二载 十月',
    title: '灵武即位，借兵回纥',
    turn: '唐廷在灵武重建指挥中枢，借回纥骑兵补足野战机动，一年内两京复得。',
    why: '灵武即位把流亡朝廷变成有号召力的正统中心；回纥骑兵补上唐军最缺的机动兵力，反攻才成为可能。',
    src: '《旧唐书·肃宗纪》《郭子仪传》《资治通鉴》卷二一九—二二〇。回纥四千余骑为史载，唐军总数推算。',
    events: [
      { time: '756·七月', who: '李亨', text: '即位于灵武，改元至德', kind: 'raise', city: 'lingwu', mark: '即', sx: -22, sy: -4, t: 0.03 },
      { time: '756·九月', who: '郭子仪', text: '自河北赴灵武，军势振', kind: 'march', route: 0, t: 0.12 },
      { time: '757·九月', who: '回纥叶护', text: '率骑四千余助唐', kind: 'raise', at: { x: 112, y: 34 }, mark: '借', t: 0.20 },
      { time: '757·十月', who: '郭子仪', text: '收复两京，安庆绪奔邺', kind: 'siege', siege: 0, t: 0.54 }
    ],
    nums: [
      { label: '回纥骑兵', value: '四千余', kind: '史载', n: 4 },
      { label: '唐军反攻', value: '约十五万', kind: '推算', n: 15 },
      { label: '叛军守两京', value: '无确载', kind: '—', n: null }
    ],
    markers: [
      { type: 'army', side: 'tang', x: 44, y: 92, t: 0.02, name: '肃宗', lx: 44, ly: 76, anchor: 'middle' },
      { type: 'host', side: 'tang', x: 46, y: 98, t: 0.10, name: '郭子仪', lx: 52, ly: 82, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'tang', x: 148, y: -8, t: 0.12, name: '回纥叶护', lx: 162, ly: 4, anchor: 'start', moveRef: 1 },
      { type: 'army', side: 'rebel', x: 196, y: 196, t: 0.30, weak: true, name: '叛军守军', lx: 196, ly: 181, anchor: 'middle' }
    ],
    routes: [
      { d: 'M 46 98 C 50 134 58 180 68 212', side: 'tang',
        t0: 0.10, t1: 0.46, label: '肃宗反攻', lx: 26, ly: 156, anchor: 'start' },
      { d: 'M 148 -8 C 130 58 102 150 74 210', side: 'tang',
        t0: 0.12, t1: 0.52, label: '回纥骑兵', lx: 110, ly: 76, anchor: 'start' },
      { d: 'M 74 216 C 106 208 152 200 192 198', side: 'tang',
        t0: 0.55, t1: 0.86, label: '收复两京', lx: 132, ly: 186, anchor: 'middle' }
    ],
    sieges: [
      { x: 70, y: 218, t: 0.54, label: '复长安', side: 'tang' },
      { x: 196, y: 196, t: 0.82, label: '复洛阳', side: 'tang' }
    ],
    flips: { changan: 0.54, tongguan: 0.60, luoyang: 0.82 },
    hold: { fanyang: 'rebel', changshan: 'rebel', yecheng: 'rebel', luoyang: 'tang',
            tongguan: 'tang', changan: 'tang', suiyang: 'tang', lingwu: 'tang' }
  },
  {
    label: '睢阳拉锯', seal: '睢阳',
    kicker: '阶段四 · 至德二载 正月—乾元二年 三月',
    title: '睢阳死守，邺城溃师',
    turn: '睢阳拖住叛军南下江淮；邺城六十万唐军因无统一主帅而溃，河北战局反复。',
    why: '睢阳保住江淮财赋线，使叛军不能断唐的粮饷；邺城之败暴露唐军兵多无帅的结构问题，战争由此被拉长。',
    src: '《旧唐书·张巡传》《资治通鉴》卷二一九—二二一。睢阳守军约六千八百，取整七千；九节度号六十万含夸大。叛军内讧后减员无确载。',
    attrNote: '内讧后叛军减员无确载，条长收缩仅示意',
    events: [
      { time: '757·正月', who: '安庆绪', text: '弑安禄山，自立', kind: 'infight', city: 'luoyang', mark: '弑', t: 0.08,
        lv: { from: '安禄山', to: '安庆绪', x: 196, y: 228, anchor: 'middle' } },
      { time: '757·正—十', who: '张巡', text: '与许远守睢阳', kind: 'siege', siege: 0, t: 0.30 },
      { time: '758·九月', who: '九节度', text: '围邺城，号六十万', kind: 'march', route: 1, t: 0.34 },
      { time: '759·三月', who: '史思明', text: '解邺城围，唐军溃', kind: 'siege', siege: 1, t: 0.72 }
    ],
    nums: [
      { label: '睢阳守军', value: '约七千', kind: '史载', n: 7 },
      { label: '邺城唐军', value: '号六十万', kind: '史载', n: 60 },
      { label: '叛军兵力', value: '无确载', kind: '—', n: null, attrition: 'rebel' }
    ],
    markers: [
      { type: 'army', side: 'tang', x: 272, y: 246, t: 0.04, name: '张巡·许远', lx: 250, ly: 244, anchor: 'end' },
      { type: 'host', side: 'tang', x: 192, y: 190, t: 0.20, name: '九节度', lx: 192, ly: 176, anchor: 'middle', moveRef: 1 },
      { type: 'host', side: 'rebel', x: 296, y: 72, t: 0.60, name: '史思明', lx: 280, ly: 86, anchor: 'end', moveRef: 2 },
      { type: 'army', side: 'rebel', x: 238, y: 116, t: 0.14, weak: true, name: '安庆绪', lx: 220, ly: 116, anchor: 'end', attrition: true }
    ],
    routes: [
      { d: 'M 200 200 C 224 214 250 230 268 244', side: 'rebel',
        t0: 0.06, t1: 0.36, label: '叛军攻睢阳', lx: 232, ly: 210, anchor: 'start' },
      { d: 'M 192 190 C 202 168 218 142 234 120', side: 'tang',
        t0: 0.20, t1: 0.52, label: '九节度围邺', lx: 208, ly: 154, anchor: 'start' },
      { d: 'M 296 72 C 282 90 262 104 242 114', side: 'rebel',
        t0: 0.60, t1: 0.88, label: '史思明南下', lx: 278, ly: 92, anchor: 'start' }
    ],
    sieges: [
      { x: 272, y: 246, t: 0.30, label: '睢阳被围', side: 'rebel' },
      { x: 238, y: 116, t: 0.72, label: '唐军溃', side: 'rebel' }
    ],
    flips: { suiyang: 0.30 },
    hold: { fanyang: 'rebel', changshan: 'rebel', yecheng: 'rebel', luoyang: 'tang',
            tongguan: 'tang', changan: 'tang', suiyang: 'contested', lingwu: 'tang' }
  },
  {
    label: '叛军内讧', seal: '内讧',
    kicker: '阶段五 · 乾元二年 三月—上元二年 三月',
    title: '叛军内讧，洛阳再陷',
    turn: '史思明杀安庆绪、史朝义弑史思明，叛军两次以弑主完成更替；洛阳再陷而河阳未下。',
    why: '内讧让叛军无法把军事胜利转成稳定统治，每次弑主都伴随部众分裂；唐军得以在河阳站稳，等来回纥与反攻的时机。',
    src: '《旧唐书·史思明传》《资治通鉴》卷二二一。叛军兵力多无确载，十余万为推算；两次内讧后减员亦无确载。',
    attrNote: '两次内讧后减员无确载，条长收缩仅示意',
    burn: true,
    events: [
      { time: '759·三月', who: '史思明', text: '杀安庆绪，并其众', kind: 'infight', city: 'yecheng', mark: '杀', t: 0.08,
        lv: { from: '安庆绪', to: '史思明', x: 246, y: 137, anchor: 'start' } },
      { time: '759·四月', who: '史思明', text: '范阳称帝，国号燕', kind: 'raise', city: 'fanyang', mark: '帝', sx: 13, sy: 12, t: 0.22 },
      { time: '759·九月', who: '史思明', text: '入洛阳，唐军退河阳', kind: 'siege', siege: 0, t: 0.36 },
      { time: '761·三月', who: '史朝义', text: '弑父自立', kind: 'infight', city: 'luoyang', mark: '弑', t: 0.68,
        lv: { from: '史思明', to: '史朝义', x: 196, y: 228, anchor: 'middle' } }
    ],
    nums: [
      { label: '史思明军', value: '约十余万', kind: '推算', n: 12, attrition: 'rebel' },
      { label: '河阳守军', value: '无确载', kind: '—', n: null },
      { label: '易主次数', value: '三易其主', kind: '史载', n: 3 }
    ],
    markers: [
      { type: 'host', side: 'rebel', x: 236, y: 120, t: 0.06, name: '安庆绪军', lx: 212, ly: 132, anchor: 'end', moveRef: 0, attrition: true,
        nameSwaps: [{ t: 0.16, to: '史思明' }, { t: 0.78, to: '史朝义军' }] },
      { type: 'army', side: 'tang', x: 176, y: 148, t: 0.44, name: '李光弼', lx: 160, ly: 160, anchor: 'end' },
      { type: 'army', side: 'rebel', x: 196, y: 196, t: 0.70, name: '史朝义弑父', lx: 222, ly: 206, anchor: 'start' }
    ],
    routes: [
      { d: 'M 236 120 C 222 144 208 170 198 192', side: 'rebel',
        t0: 0.06, t1: 0.40, label: '史思明入洛', lx: 230, ly: 150, anchor: 'start' },
      { d: 'M 190 190 C 184 172 180 158 176 148', side: 'tang',
        t0: 0.46, t1: 0.66, label: '', lx: 0, ly: 0, anchor: 'start' }
    ],
    sieges: [
      { x: 196, y: 196, t: 0.36, label: '洛阳再陷', side: 'rebel' },
      { x: 176, y: 148, t: 0.58, label: '河阳相持', side: 'tang' }
    ],
    flips: { suiyang: 0.04, luoyang: 0.36 },
    hold: { fanyang: 'rebel', changshan: 'rebel', yecheng: 'rebel', luoyang: 'rebel',
            tongguan: 'tang', changan: 'tang', suiyang: 'rebel', lingwu: 'tang' }
  },
  {
    label: '朝义败亡', seal: '收尾',
    kicker: '阶段六 · 宝应元年 十月—宝应二年 正月',
    title: '朝义败亡，乱事收尾',
    turn: '唐与回纥联军复洛阳，史朝义北走；范阳李怀仙归唐，断其归路。',
    why: '叛军根基在河北，范阳一降便断其退路；唐廷无力彻底清算，就地授河北降将为节度使，埋下河朔三镇割据的远因。',
    src: '《旧唐书·史朝义传》《新唐书·回鹘传》《资治通鉴》卷二二二。联军十万为推算，回纥兵数有争议；朝义余部承内讧减员，无确载。',
    attrNote: '朝义余部承阶段五内讧减员，无确载',
    events: [
      { time: '762·十月', who: '唐·回纥', text: '联军复洛阳，朝义北走', kind: 'siege', siege: 0, t: 0.08 },
      { time: '762·十一', who: '史朝义', text: '退守莫州，再奔幽州', kind: 'march', route: 1, t: 0.24 },
      { time: '763·正月', who: '李怀仙', text: '以范阳归唐', kind: 'flip', city: 'fanyang', t: 0.68 },
      { time: '763·正月', who: '史朝义', text: '自缢温泉栅，乱平', kind: 'fall', at: { x: 322, y: 34 }, mark: '亡', t: 0.88 }
    ],
    nums: [
      { label: '唐回纥联军', value: '约十万', kind: '推算', n: 10 },
      { label: '朝义余部', value: '无确载', kind: '—', n: null, carry: 'rebel', carryW: 9 },
      { label: '河朔三镇', value: '三镇', kind: '史载', n: 3 }
    ],
    markers: [
      { type: 'host', side: 'tang', x: 198, y: 190, t: 0.06, name: '', lx: 210, ly: 204, anchor: 'start', moveRef: 0 },
      { type: 'army', side: 'rebel', x: 200, y: 198, t: 0.10, weak: true, name: '', lx: 184, ly: 224, anchor: 'end', moveRef: 1, shrink: 0.7 },
      { type: 'army', side: 'tang', x: 300, y: 66, t: 0.68, name: '李怀仙归唐', lx: 292, ly: 102, anchor: 'end' }
    ],
    routes: [
      { d: 'M 198 190 C 226 156 260 116 292 78', side: 'tang',
        t0: 0.06, t1: 0.52, label: '唐军北进', lx: 252, ly: 130, anchor: 'start' },
      { d: 'M 200 198 C 232 168 270 124 304 78', side: 'retreat',
        t0: 0.10, t1: 0.58, label: '史朝义北走', lx: 256, ly: 150, anchor: 'start' },
      { d: 'M 306 60 C 312 50 318 42 322 34', side: 'retreat',
        t0: 0.70, t1: 0.86, label: '', lx: 0, ly: 0, anchor: 'end' }
    ],
    sieges: [
      { x: 196, y: 196, t: 0.08, label: '复洛阳', side: 'tang' }
    ],
    flips: { luoyang: 0.08, suiyang: 0.30, yecheng: 0.34, changshan: 0.44, fanyang: 0.68 },
    hold: { fanyang: 'tang', changshan: 'tang', yecheng: 'tang', luoyang: 'tang',
            tongguan: 'tang', changan: 'tang', suiyang: 'tang', lingwu: 'tang' }
  }
];

// 初始态势：范阳已为叛军，其余属唐；首阶段据此判定“易手”
var INIT_HOLD = {};
CITY_DEFS.forEach(function (c) { INIT_HOLD[c.id] = 'tang'; });
INIT_HOLD.fanyang = 'rebel';

/**
 * 静态地形（375 × 380 逻辑坐标）
 * 与原型 SVG 底图一一对应：黄河分南北、山系、支流、关隘、驿道。
 */
var TERRAIN = {
  fills: [
    { d: 'M-10 170 C 80 156 150 140 220 130 C 290 120 340 110 385 104 L385 -10 L-10 -10 Z', grad: 'bankN' },
    { d: 'M-10 170 C 80 156 150 140 220 130 C 290 120 340 110 385 104 L385 392 L-10 392 Z', grad: 'bankS' }
  ],
  strokes: [
    { d: 'M-10 170 C 80 156 150 140 220 130 C 290 120 340 110 385 104', color: '#b9c3b7', width: 26 },
    { d: 'M-10 170 C 80 156 150 140 220 130 C 290 120 340 110 385 104', grad: 'riverG', width: 22 }
  ],
  lines: [
    { d: 'M 14 206 C 44 202 78 199 104 196 C 116 195 124 196 130 200', color: '#a8b6ab', width: 2.1, opacity: 0.66 },
    { d: 'M 240 36 l 10 -13 l 8 7 l 9 -12 l 8 9 l 10 -10 l 9 11 l 10 -7 l 7 9', color: '#c8b494', width: 1.1 },
    { d: 'M 248 42 l 8 -9 l 7 6 l 8 -8', color: '#c8b494', width: 1.1, opacity: 0.55 },
    { d: 'M 156 40 l 7 12 l -6 10 l 7 12 l -6 11 l 7 12 l -6 12 l 6 11', color: '#c8b494', width: 1.1 },
    { d: 'M 166 48 l 6 10 l -5 9 l 6 10 l -5 10', color: '#c8b494', width: 1.1, opacity: 0.55 },
    { d: 'M 24 268 l 12 -14 l 9 8 l 11 -13 l 10 10 l 12 -12 l 10 9 l 12 -10', color: '#c8b494', width: 1.1 },
    { d: 'M 96 264 l 10 -11 l 9 8 l 10 -10 l 9 7', color: '#c8b494', width: 1.1, opacity: 0.6 },
    { d: 'M 214 286 l 10 -12 l 8 7 l 10 -10 l 9 8', color: '#c8b494', width: 1.1, opacity: 0.8 },
    { d: 'M 34 278 l 10 -10 l 9 7 l 10 -8', color: '#d0be9e', width: 0.9, opacity: 0.8 },
    { d: 'M 118 260 l 8 -8 l 7 6', color: '#d0be9e', width: 0.9, opacity: 0.8 },
    { d: 'M 246 332 l 9 -8 l 7 6 l 8 -7', color: '#d0be9e', width: 0.9, opacity: 0.8 },
    { d: 'M 318 338 l 8 -7 l 6 5', color: '#d0be9e', width: 0.9, opacity: 0.8 },
    // 关隘：井陉扼太行、潼关锁关中
    { d: 'M222 52 V47 M230 52 V47 M221.5 47 H230.5', color: '#8a7357', width: 0.95 },
    { d: 'M116.6 195 V190.6 M123.4 195 V190.6 M116.1 190.6 H123.9', color: '#8a7357', width: 0.95 },
    // 驿道（静态底图，压在行军线之下）
    { d: 'M 296 70 C 268 78 232 78 202 76', color: '#c0ac8c', width: 0.85, opacity: 0.5, dash: [2.5, 3] },
    { d: 'M 198 78 C 212 92 226 104 236 112', color: '#c0ac8c', width: 0.85, opacity: 0.5, dash: [2.5, 3] },
    { d: 'M 240 120 C 224 148 208 174 198 192', color: '#c0ac8c', width: 0.85, opacity: 0.5, dash: [2.5, 3] },
    { d: 'M 192 198 C 172 200 152 200 136 200', color: '#c0ac8c', width: 0.85, opacity: 0.5, dash: [2.5, 3] },
    { d: 'M 128 202 C 110 208 90 212 74 216', color: '#c0ac8c', width: 0.85, opacity: 0.5, dash: [2.5, 3] },
    { d: 'M 200 200 C 226 214 250 230 268 242', color: '#c0ac8c', width: 0.85, opacity: 0.5, dash: [2.5, 3] },
    { d: 'M 274 250 C 286 270 296 290 302 302', color: '#c0ac8c', width: 0.85, opacity: 0.5, dash: [2.5, 3] }
  ],
  texts: [
    { x: 22, y: 199, t: '渭 水', size: 7.5, color: '#7d6647', ls: 1, rotate: -4 },
    { x: 231, y: 53, t: '井陉', size: 6.6, color: '#8a7357', ls: 0.6, halo: '#f1e5cb' },
    { x: 14, y: 26, t: '河 北', size: 9, color: '#7d6647', ls: 4, serif: true },
    { x: 14, y: 368, t: '河 南', size: 9, color: '#7d6647', ls: 4, serif: true },
    { x: 18, y: 234, t: '关 中', size: 8.5, color: '#7d6647', ls: 3 },
    { x: 300, y: 304, t: '江 淮', size: 9, color: '#7d6647', ls: 4, anchor: 'middle', serif: true },
    { x: 356, y: 26, t: '北 ↑', size: 8.5, color: '#7d6647', ls: 1, anchor: 'end' },
    { x: 146, y: 102, t: '太 行', size: 8.5, color: '#7d6647', ls: 3, rotate: -76 },
    { x: 60, y: 291, t: '秦 岭', size: 8.5, color: '#7d6647', ls: 2 },
    { x: 264, y: 22, t: '燕 山', size: 8.5, color: '#7d6647', ls: 2 },
    { x: 108, y: 162, t: '黄　河', size: 11, color: '#46594f', ls: 3, rotate: -5, serif: true }
  ]
};

var META = {
  id: 'anshi',
  title: '安史之乱',
  kicker: '沙 盘 推 演',
  subtitle: '范阳—洛阳—长安 · 河北',
  years: '755–763',
  yearUnit: 'AD',
  era: '天宝十四载起',
  mapNote: '旗＝军势 ｜ 城色＝控制方 ｜ 圈＝易手 ｜ 叉＝内讧 ｜ 印＝立号',
  note: '示意沙盘：仅保留关键城池与行军线，非真实地理比例',
  hook: '范阳起兵到史朝义败亡，六阶段看唐燕攻守易势',
  period: '唐',
  yearValue: 755,
  cityMode: 'territory',
  hideFocus: false,
  endSeal: { a: '乱', b: '平', sub: '763·正月' }
};

module.exports = {
  COLOR: COLOR,
  CITY_DEFS: CITY_DEFS,
  STAGES: STAGES,
  INIT_HOLD: INIT_HOLD,
  TERRAIN: TERRAIN,
  META: META
};
