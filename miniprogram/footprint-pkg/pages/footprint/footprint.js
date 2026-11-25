const request = require('../../../utils/request');
// [重要] 地名词典 + 解析逻辑已上移到主包 utils（见 utils/footprint-locate.js 头注释）：
//    分包代码不能被引擎侧另一个分包（detail-pkg）require，而详情页「查看一生足迹地图」
//    入口需要用**同一份口径**预检有无数据。两端共用一份，才不会出现「入口可见、进去空态」。
var { resolveEventLocation, extraPlaceSites } = require('../../../utils/footprint-locate');
// 头像三级兜底（图片 / emoji 字形）+ 站内相对路径补域名，与首页轮播卡、详情页共用同一份实现
var { formatYear } = require('../../../utils/figure-display');
var { FIGURES } = require('../../../config/api');
// 激励视频 + 按人物解锁（2026-11-10）：只解锁「增强足迹」，基础足迹始终免费可用。
// 🔴 必须放在 footprint-pkg 分包内、不能上移主包 utils：app.js:50-58 记录了上传检查
//    「主包 JS 必须被主包自身使用」，只被分包 require 会判「主包未使用 JS 文件」上传失败；
//    且激励视频单例是页面级，放主包会诱导跨页面复用（官方禁止）。
var rewardAd = require('../../utils/reward-ad');
// 详情页后台预取的足迹数据写在这里（2026-11-09 切换提速），本页优先读缓存渲染
// 短时缓存 / 在途请求复用与 request 封装同模块（2026-11-09 合并：
// 单独建主包 utils/page-cache.js 会触发「主包未使用 JS 文件」上传检查）
var pageCache = request;

// 免费额度（2026-11-10 二次调整，按真机反馈）：
//  · 站点总数 ≤ AD_FREE_MAX_SITES：整档**免广告**，所有功能直接可用（点位太少，设闸无意义）。
//  · 站点总数 > AD_FREE_MAX_SITES 且未解锁：进页面与免费版观感一致（播放条 / 视图开关 /
//    全部卡入口都在，可正常按播放），但**自动回放只免费推进前 FREE_PLAY_LIMIT 站**；
//    播完第 2 站、准备进第 3 站时才提示「看广告解锁更多地图」。手动点 marker / ‹ › /
//    刻度尺看任意站的卡片始终免费（基础查询），广告只解锁「完整连续回放 + 轨迹连线 +
//    全部展开全览 + 全部卡列表」这类增强。
// 🔴 合规红线（官方《小程序流量主运营规范》2.3「强制点击」）：基础查询 / 基础功能
//    不得要求看广告；绝不能把「看广告」做成进页面即弹的闸门或页面唯一出口。
var FREE_PLAY_LIMIT = 2;     // 未解锁可免费连续回放的站数
var AD_FREE_MAX_SITES = 3;   // 站点总数 ≤3 时整档免广告

// 解锁记录的 key：优先用人物 id；极少数来源无 id 时退回姓名（与 selectFigure 同源）。
function figureUnlockKey(f) {
  if (!f) return '';
  if (f.id != null && String(f.id) !== '') return String(f.id);
  return 'name:' + String(f.name || '');
}

// 单站点聚焦时的地图缩放级别（12~14 为宜）：13 ≈ 街区/乡镇级，
// 既能看清「人在哪」，又不至于把邻站甩出画面。
var FOLLOW_SCALE = 13;

// 播放节奏：每站停留 5 秒（2026-11-10 由 1.8s 上调 —— 1.8s 连一段事件的标题都读不完）。
// 时间轴条是「按站点等分」的，所以一格 = 一次 tick = PLAY_INTERVAL，
// 进度条自然 5 秒走完一格；暂停/续播/末站停住的行为不变。
var PLAY_INTERVAL = 5000;

// [2026-11-11 六修] 全部展开下的「圆点行走」—— 自己分步推进，不用任何原生动画。
//
//   为什么放弃 translateMarker（五修及以前的做法）：
//   ① 补间太快、看不出位移：一段跨几百公里也只有 2 秒，按 375px 宽的屏幕换算，
//      中间很多帧的位移不到 1px —— 用户看到的就是「嗖一下到 B」，
//      与「模拟人走路、一步一步走过去」正好相反。
//   ② 该接口官方自 3.11.2 起已**停止维护**，后续机型/基础库的行为不可控。
//   ③ 它的回调不可靠（部分 Android 不触发 animationEnd、同 id 同目的地被静默丢弃），
//      为了兜这些坑堆了保险丝 / 目的地去重 / 代际闸三套补丁，复杂度远超收益。
//   现在改成：我们自己按 WALK_STEP_MS 算插值、自己下发 markers 坐标 + polyline。
//   一个时钟同时推进「点」和「线」，天然同步，也没有「回调来不来」这回事。
//
//   🔴 两条仍然成立的约束：
//   ① 圆点用**轮转 id**（9000+gen%100）：每轮换新 id 让「按 id 的旧渲染状态」彻底作废
//      （暂停后残留的旧点、换人物前的点），也让 _dropWalker 能按 id 段一次清干净。
//   ② 每一步的 `markers[wi].latitude/longitude` 与 `polyline` 必须在**同一个 setData**
//      里下发：拆成两批会错开一帧，看到的就是「线追不上点」或「点先跳、线后补」。
//
//   圆点 id 段与站点 marker 的 id（= locations 数组下标，见 _mkMarker）不冲突：
//   站点数远小于 9000。
var WALKER_ID_BASE = 9000;
var WALKER_ID_SPAN = 100;
var WALKER_ICON = '/assets/footprint/walker.png';
// [2026-11-11 六修·纠偏] 每一步的间隔：80ms ≈ 12.5 步/秒。
//   这是「一步一步走」的观感来源。上一版 100ms 只有 10 步/秒，段内落点偏少，
//   真机上看仍是「滑过去」；80ms 在一段 2.4~5s 的行程里能插 30~63 步，
//   每步位移约 3~10px，肉眼才是一格一格挪过去。
var WALK_STEP_MS = 80;
// 每段时长按距离自适应（见 _walkLegMs）：固定值在「江阴→泰山」和「苏州→上海」上
// 观感差太多。上限必须 < PLAY_INTERVAL（留出停站可读时间）。
var WALK_LEG_MS = 2400;   // 兜底默认值（距离算不出来时用它，取下限）
// [2026-11-11 六修·纠偏] 区间从 [1200,4200] 抬到 [2400,5000]。
//   🔴 真正的病灶是**帧数太少**，不是视野：上一版最短 1.2s 只有 15 步、
//   最长 4.2s 也只有 52 步，长段上每步位移十几像素，看着就是「嗖一下到 B」。
//   现在最短 2.4s / 30 步，最长 5.0s / 63 步，每步都落在个位数像素。
var WALK_LEG_MIN = 2400;
var WALK_LEG_MAX = 5000;
// 走过 / 未走 两种线色（2026-11-11 六修·纠偏配色）：
//   走过 = 暖橙 #c2410c（比原 #d2691e 更实，压在米色地图底上更清楚），
//   未走 = 灰蓝 #94a3b8（与暖橙色相相反，小屏上也能一眼分出「走到哪」）。
// 官方 polyline.colorList（2.13.0+）支持分段着色：points 有 N 个点就传 N-1 个颜色，
// 长度不足时剩余段沿用最后一项。存在 colorList 时 color 被忽略，两色都必须显式写进 colorList。
var WALK_LINE_DONE = '#c2410c';
var WALK_LINE_TODO = '#94a3b8';
// [十五修] 已走路段用**降饱和的浅橙**：它只作背景参考，不许和「当前段」抢眼。
//   用户原话「现在圆点开始就不知道那到那」—— 1.3.30 把整条行程一次画完，
//   20 段线在屏上交叉成一团放射状线网，圆点淹没在线里，看不出正在走哪一段。
//   现在只画到「当前段终点」为止，且当前段单独一条更粗更亮的线。
var WALK_LINE_PAST = '#d98a58';

// [十五修·跟随] 段内让地图跟着圆点平移。
//   🔴 只在「圆点偏出视口中部」时才下发，且 180ms 一次：逐帧跟会与 moveAlong 的
//      渲染层动画抢帧（那正是 1.3.27「不平滑」的来源），而完全不动又变成
//      「一段一推进」的呆板观感（用户本轮反馈）。
//   平移是**只写 mapCenter**（不碰 markers / polyline），所以不会打断圆点动画，
//   也不会重建折线 —— 这是与 1.3.29 定点更新完全不同的两类 setData。
var CAM_FOLLOW_MS = 160;     // 两次平移之间的最小间隔（≈6Hz；再快地图瓦片重绘跟不上）
var CAM_EDGE_X = 0.08;       // 水平偏离超视口 8% 才平移（阈值越小越"连续跟"，越大越"顿"）
var CAM_EDGE_Y = 0.09;       // 垂直偏离超视口 9% 才平移
var CAM_ANCHOR_Y = 0.56;     // 平移后圆点落在视口 56% 高度处（略偏下，上方留给气泡）

// [十四修·视野自算] 段取景不再交给 includePoints，改成自己算 scale + center。
//   为什么必须换：includePoints 只按「传进去的点」算包围盒，而本段只传 A、B 两点
//   ⇒ A→B 本身很短（同在无锡城内，几公里）时会把地图放到 scale 16~18，
//     整屏只剩一个 pin、气泡顶到屏幕外；下一段跨度几百公里又缩到 scale 6。
//     用户原话「有点在地图边边看不到地名」「原点移动到地点聚集多的地点要稍微放大」
//     「不是平滑的移动」—— 三段跳变都出自这一个口径。
//   现在按「A、B + 段中点附近最近的 VIEW_NEAR_PICK 个站」的包围盒算 scale，并钳在
//   [VIEW_SCALE_MIN, VIEW_SCALE_MAX]：短段至少还看得见几个邻居站，长段不会缩成
//   一粒沙，段与段之间的缩放落差也从「16↔6」压到「11.6↔7.2」。
// 上限管「别放到街景级」，下限只管「别缩到看不见人」——不能设太高：
// 徐霞客有单段跨 500km（泰安→南京），scale 7.2 时 500km 要 573px，已超屏幕宽 375px，
// 圆点会直接走出视野。真正的收敛靠「按 A→B 距离反算」，钳制只兜极端值。
var VIEW_SCALE_MIN = 4.5;    // 最远：单段跨千公里时仍能两端同框（约 1100km 视野）
var VIEW_SCALE_MAX = 11.6;   // 最近：城内短段（约 20km 视野，不再放到街景级）
var VIEW_NEAR_PICK = 3;      // 包围盒里额外纳入的邻近站点数

// [2026-11-11 九修] 圆点行走改用**原生轨迹回放** `MapContext.moveAlong` +
// `<map bindinterpolatepoint>` 的进度回调，让圆点从 12.5 帧/秒的步进变成
// 渲染层原生插值（约 60 帧/秒）；我们自己按回调同步**折线**。
//
//   为什么还要换：八修的 80ms 分步 = 12.5 帧/秒，一段 2.4~5s 只有 30~63 帧，
//   真机上看得出「一格一格挪」。原生 moveAlong 的插值在渲染层做，圆点是连续的，
//   逻辑层只按 precision 收进度 —— 这是唯一能做到「真·60fps 且不狂发 setData」的口径。
//
//   🔴 两条通道各画各的，是这一版最关键的分工：
//     · 圆点 → 原生动画驱动，**动画期间一次都不写 markers 坐标**；
//     · 折线 → 只能 setData（地图没有「动画折线」接口），按 tick 节流下发。
//   把圆点也塞回 setData 会和原生动画抢同一个 marker，真机上就是「点一顿一顿」。
//
//   为什么保留步进引擎：moveAlong 是 2.13.0+ 的接口，且部分机型 / 开发者工具上
//   ① 直接 fail、② precision 被忽略、一个 interpolatepoint 都不回调。
//   这两种都不能让行程卡住，所以八修的 80ms 分步作为**自动降级**路径原样保留。
var WALK_ENGINE_MOVEALONG = 'moveAlong';
var WALK_ENGINE_STEP = 'step';
// precision 的目标回调频率（次/秒）。官方 precision 的语义是「每隔多少米回调一次」，
// 所以「每秒多少次」要按段长反算成米 —— 见 _startMoveAlongLeg 里的 precision 公式。
// [十二修·复审 O2] 一度为压「线一闪一闪」降到 10Hz，已**主动撤回**：
//   ① 人眼对闪烁/调制的敏感峰在 8~12Hz，10Hz 单次重绘空档 100ms 且正落敏感带，
//      次数减半但每次更明显，属于「可能劣化」而非确定改善；
//   ② 根因是每帧整条替换 polyline 数组（map 组件「移除旧线→重画」），调频率治不了；
//   ③ 保持与 1.3.27 完全相同的节奏，下一轮真机才能看到**原始**闪的形态再选根治方案。
//   反馈 3 本轮不改善、也不劣化，需在发布说明里如实记录。
var WALK_TICK_HZ = 20;
// onWalkTick 的节流间隔：与 20Hz（50ms 一拍）配套，保持基线口径不变。
var WALK_TICK_GAP = 40;
// 起走后这么久还没有任何 interpolatepoint → 判定该机型拿不到进度回调，降级到步进。
//   取 400ms：20Hz 的第一拍应在 50ms 内到，这里留了 8 倍余量，
//   既不误杀首帧慢的机型，也不会让用户盯着一个不动的点太久。
var WALK_TICK_WATCH_MS = 400;
// 到站兜底：complete 事件丢失时（Android 同 id 连续调用时尤其常见），
// 用 duration + 这个余量强行收段，否则本段会永远停在「走到 B 但不再往下走」。
var WALK_ANIM_SLACK_MS = 300;
// [2026-11-11 十修] moveAlong「单次 fail」允许重试几次。
//   fail 有两种成因，不能一律永久降级：
//     · 接口根本不存在（旧基础库）    → 永久步进，不必再试；
//     · 地图尚未就绪 / 瞬时异常       → 下一段再试一次就好，否则一次误伤会让**整个会话**
//       都退化成 12.5 帧/秒的步进（用户看到的就是「丝滑没了」且毫无提示）。
//   超过这个次数仍失败 ⇒ 认定该机型不可用，本会话永久步进。
var WALK_MA_FAIL_MAX = 3;
// [2026-11-11 六修·纠偏] 本段取景改回 includePoints（_fitLeg），不再自己查表算 scale：
//   上一版用「距离查表 + 反解 70% 占屏」算 mapCenter/mapScale，方向判断反了 ——
//   用户那句「最起码能看到从 A 到 B 的线路」不是因为视野太近，而是因为**帧太少**，
//   2 秒补间里中间位移只有几像素。视野本身 includePoints 自己算包围盒最准，
//   我们只负责把 padding 收紧（[56,40,56,40]），让 A→B 尽量占满屏宽的可用区。

// 「全部展开」不再用 HTML 绝对定位的缩略卡，改由地图原生 callout 承载：
// 坐标由地图自己渲染，拖动/缩放不可能脱点（前两轮 HTML 浮层做不到这一点）。
// 缩到比「人物全览」还小（< 这一级）时，21 个 callout 会糊成一片，
// 降级为只给诞/终两个锚点挂 callout；再放大自动恢复全量。
// 取 3 而不是 6：多数人物的 includePoints 全览落在 4~6 之间，阈值取 6
// 会把「全部展开」最常用的那一屏直接砍成两个点，等于把功能做没了。
var CALLOUT_DEGRADE_SCALE = 3;
// [2026-11-11 八修] 第二档：站点数 > 10 且缩放 ≤ 这一级时，一屏覆盖上百公里、
//   十几个 ALWAYS 气泡必然互相压字（用户截图里「6. 金陵 / 12. 丹阳 / 15. 丹阳 /
//   2. 南旸岐 / 8. 宜兴善卷洞 / 16. 常州」叠成一团）。这一档只留 3 个常驻气泡：
//   起点 / 当前站 / 终点，其余改成 BYCLICK（点一下仍能看到，不是删掉）。
//   取 6 而不是 4：多数人物的 includePoints 全览落在 4~6，取 4 会把一进页面就砍成
//   3 个气泡；6 只在用户主动缩到「省/大区」量级时才生效。
var CALLOUT_TRIPLE_SCALE = 6;

// callout 配色：米色卡 + 棕字，与 HTML 贴点卡同一套口径（允许有差异，
// 位置正确优先；地图原生只支持这几个字段，不能描边阴影）。
var CALLOUT_STYLE = {
  color: '#6b4423',
  fontSize: 11,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#d9c7ac',
  bgColor: '#fbf7ef',
  padding: 6,
  textAlign: 'center',
  display: 'ALWAYS',
  anchorX: 0,
  anchorY: 0
};

/** /api/figures/:id 的 events 可能是 JSON 字符串；统一解析成数组（缓存分支与网络分支共用） */
function parseEvents(raw) {
  var events = raw;
  if (typeof events === 'string') {
    try { events = JSON.parse(events); } catch (e) { events = []; }
  }
  return Array.isArray(events) ? events : [];
}

// 服务端 /api/figures/search 返回完整行（含 events 生平事件，含 location/lng/lat）。
// 注意：/api/figures/all 只返回前 2000 条且不含 events，本地过滤恒为空 ——
// 足迹数据必须按需走服务端搜索获取，不能依赖本地缓存。
function mapServerFigure(f) {
  return {
    id: f.id, name: f.name,
    events: Array.isArray(f.events) ? f.events : [],
    dynasty: f.dynasty,
    region: f.region || '',
    birthYear: f.birthYear, deathYear: f.deathYear
  };
}

// —— 以下足迹提取逻辑与 web 端 src/pages/FootprintPage.tsx 逐行对齐 ——
// 地点解析四步见 utils/footprint-locate.js::resolveEventLocation（主包共享模块，
// 与详情页「查看足迹」入口的预检同源）。此处只保留**足迹页专属**的语义标注逻辑。
//
// 口径要点（改之前先看那边的注释，别只改一半）：
//   location 有坐标 → 直接用；无坐标时精确命中词典 → 括号「（今X）」内优先 → 扫整条
//   location；完全没有 location 才回退 title + location_desc，**绝不扫 description**
//   （旧实现扫它，29.8% 的事件落点与自身 location 矛盾：「汴京」被正文里的「大理寺」
//   画到云南、「碎叶城」被正文里的「四川」画到成都）。

// 诞 / 终 语义判定（P0-3）：旧实现按「第 0 条 = 出生、最后 1 条 = 死亡」硬标，
// 但大量史前背景事件排在首位、卒后追赠排在末位，且这些事件常常定位不出地点 ——
// 实测 49 人样本里 37 人末条事件无坐标、18 人首条无坐标 ⇒ 倒数第二个点被标成
// 红色「终」、第一个能画出的点被标成绿色「诞」，用户会当成史实坐标。
// 改为「语义词 + 该事件确实有坐标」双条件，不满足就不标（标错比不标更糟）。
var BIRTH_RE = /出生|诞生|降生|生于|生[于年]/;
// 排除「弟苏辙出生」这类亲属出生事件
var BIRTH_KIN_RE = /(?:弟|兄|姐|妹|子|女|孙|侄|父|母|妻|夫|妾|友|门人|弟子)[^，。；、]{0,6}(?:出生|诞生|降生)/;
var DEATH_RE = /去世|逝世|病逝|病卒|卒于|殁|殉国|殉难|遇害|被害|被杀|自尽|自杀|赐死|就义|阵亡|之死|临终/;
// 排除「父苏洵卒」「母某氏卒」这类亲属亡故事件（否则把亲属卒地标成本人终老地，
// 实测苏轼「父苏洵卒扶丧归蜀」会把终标到眉山）
var DEATH_KIN_RE = /(?:父|母|子|女|孙|侄|弟|兄|姐|妹|妻|夫|妾|友|门人|弟子)[^，。；、]{0,8}(?:去世|逝世|病逝|病卒|卒于|殁|遇害|被害|被杀|自尽|赐死|就义|阵亡)/;

/** 展示用地名清洗（首卡修复）：locationName 由 locNameOf 拼成「键（note）」，
 *  note 常是编者备注（政区沿革 / 人物事迹 / 机构名），整段进主标题会把
 *  「抚州」写成「抚州（江西抚州，晏殊晏几道故里…）」。只保留标准「X（今Y）」
 *  的今地副标题，其余任意括号内容一律丢弃。locationName 原值保留不变。 */
function splitPlaceName(raw) {
  var s = String(raw || '').trim();
  // ① 标准「X（今Y）」/「X(今Y)」：主名 + 今地副标题（保留双端原有能力）。
  //    括号内若夹带人物事迹 / 3-4 位年份 / 拉丁字母，整段当脏备注丢弃，只留主名。
  var mm = /^(.+?)[（(]\s*今([^）)]{1,60})[）)]\s*$/.exec(s);
  if (mm) {
    var inner = mm[2].trim();
    // 括号内夹带人物事迹 / 3-4 位年份 / 拉丁字母 ⇒ 整段当脏备注丢弃，只留主名。
    // 词表刻意不含「平定」「生」「卒」「贬」等单字，避免把「今山西平定」这类正常今地误杀。
    var dirty = /(出生|诞生|故里|逝世|病逝|卒于|遇难|战死|自缢|殉国|遇害|病故|薨|葬于|隐居|迁居|定居|流放|贬谪|即位|称帝|起兵|起义|之战|战役|会战|大破|创立|创办|发明|就读|总部|插队|驻防|任所|通判|知州|发现|开设|加入|改进|获博士|[0-9]{3,4}|[A-Za-z]{2,})/.test(inner);
    return { displayName: mm[1].trim(), displayModern: dirty ? '' : '今' + inner };
  }
  // ② 其余任意括号都是词典 note（政区沿革 / 人物事迹 / 机构名 / 嵌套括号）：整段丢弃
  var lp = s.search(/[（(]/);
  if (lp > 0) return { displayName: s.slice(0, lp).trim(), displayModern: '' };
  return { displayName: s, displayModern: '' };
}

/** 站点级年份标签。
 *  [2026-11-10 三修] extractLocations 按坐标并站，同一地点的多条事件挂进**同一个 loc**：
 *  徐霞客故居（31.71,120.32）一条坐标 6 条事件 —— 1587 生、1604 父卒、1625 母卒、
 *  1636 启程、1640 东归卧病、1641 病逝。原先各处都写 `events[0].year`，卡头于是只报
 *  「1587年」而卡内列着 6 个时间点，读起来像数据错。
 *  这里给出单条→原年份、多条→「1587—1641年」的区间，供卡片 / 全部卡列表 / callout 共用，
 *  免得同一站在不同界面出现两个年份说法。
 *  刻度尺上的稀疏标签仍只用首事件年份（那是位置标尺，标「起点年」更短也不歧义）。 */
function yearLabelOf(events) {
  // 先按出现顺序去重：同一站的多条事件可能有相同年份（如两次到访同一地），
  // 去重后只剩一个年份就输出单值，剩多个就取首末做区间。
  // [2026-11-10 三修·门禁 A9] 早先按「首尾是否同年」判断，遇到
  // [{1587},{1593},{1587}] 这类首尾同年夹异年的会静默吞掉 1593；
  // 去重后取首末从根上避免这种退化，也顺带让「同年两条」自然收敛成单值。
  var seen = {}, uniq = [];
  var list = events || [];
  for (var i = 0; i < list.length; i++) {
    var y = list[i] && list[i].year;
    if (!y) continue;
    var s = String(y);
    if (seen[s]) continue;
    seen[s] = 1;
    uniq.push(s);
  }
  if (!uniq.length) return '';
  if (uniq.length === 1) return uniq[0];
  // 「1587年—1641年」啰嗦，区间只在末尾留一个「年」
  return uniq[0].replace(/年$/, '') + '—' + uniq[uniq.length - 1];
}

function extractLocations(figure) {
  try {
    var locs = [];
    var events = figure.events || [];
    var birthIdx = -1, deathIdx = -1;

    for (var i = 0; i < events.length; i++) {
      var evt = events[i];
      var resolved = resolveEventLocation(evt);
      if (!resolved) continue;

      var existing = -1;
      for (var j = 0; j < locs.length; j++) {
        if (Math.abs(locs[j].lat - resolved.lat) < 0.001 && Math.abs(locs[j].lng - resolved.lng) < 0.001) { existing = j; break; }
      }
      var eventItem = { year: formatYear(evt.year) || '', title: evt.title || '', description: evt.description || '' };
      var targetIdx;
      if (existing >= 0) {
        locs[existing].events.push(eventItem);
        targetIdx = existing;
      } else {
        locs.push({
          lat: resolved.lat, lng: resolved.lng, locationName: resolved.name,
          events: [eventItem],
          isBirth: false,
          isDeath: false,
          // trace = 由生平事件定位出来的「真的到过」；origin/birth/death 见下方兜底
          siteType: 'trace',
          // 标签用词典键（「河南」），不用 locationName（「河南（郑州市）」）：
          // marker 标签最多塞 6 字，带注解会被截成半截话。
          shortName: resolved.key || resolved.name,
          // [重要] 事件侧也可能是省名（location 直接写「河南」）——
          //    这种点只能算大区精度，必须带着标记一路传到 UI，
          //    否则一个省会点会被读成「他真的到过郑州」。
          precision: resolved.precision || 'exact'
        });
        targetIdx = locs.length - 1;
      }

      // 诞生取时间线最早的一处、终老取最晚的一处（events 按年代排列）
      var semText = (evt.title || '') + ' ' + (evt.description || '');
      if (birthIdx < 0 && BIRTH_RE.test(semText) && !BIRTH_KIN_RE.test(semText)) birthIdx = targetIdx;
      if (DEATH_RE.test(semText) && !DEATH_KIN_RE.test(semText)) deathIdx = targetIdx;
    }

    if (birthIdx >= 0) locs[birthIdx].isBirth = true;
    // 出生地即终老地时不重复标终（诞生优先）
    if (deathIdx >= 0 && deathIdx !== birthIdx) locs[deathIdx].isDeath = true;

    // ── 档案位置字段兜底 ──────────────────────────────────────────
    // 全库 51.8 万有事件的人物里只有 9,459 人（1.8%）能靠事件定位，
    // 而 region（籍贯）填写率 64.2%。事件定位不出来时，至少把他「在哪里」画出来。
    //
    // [重要] 这些点与「到过」是两回事，必须靠 siteType 在 UI 上标清楚：
    //    origin=籍贯（本贯，非出生地，也非活动地）、birth=出生地、death=卒地。
    //    绝不把它们混成空年份的「途经」点 —— 那等于编了一条不存在的行迹。
    var headSites = [];
    var tailSites = [];
    var extras = extraPlaceSites(figure);
    for (var xi = 0; xi < extras.length; xi++) {
      var ex = extras[xi];
      var dup = -1;
      for (var xj = 0; xj < locs.length; xj++) {
        if (Math.abs(locs[xj].lat - ex.lat) < 0.001 && Math.abs(locs[xj].lng - ex.lng) < 0.001) { dup = xj; break; }
      }
      if (dup >= 0) {
        // 事件点与该字段同址：只补语义，不新增点
        if (ex.siteType === 'death') { if (!locs[dup].isBirth) locs[dup].isDeath = true; }
        else if (ex.siteType === 'birth') { locs[dup].isBirth = true; }
        else if (!locs[dup].siteType || locs[dup].siteType === 'trace') locs[dup].siteType = ex.siteType;
        continue;
      }
      var labelMap = { origin: '籍贯', birth: '出生地', death: '卒地' };
      var siteLabel = labelMap[ex.siteType] || '档案所载';
      // 从 bio 正文里抽出来的籍贯（结构化字段全空时才走这条路，实测约 2,000 人）：
      // 列表里要说明它不是字段而是叙述，否则读者会以为是档案里明确写着的籍贯栏。
      if (ex.source === 'bio') siteLabel = '籍贯·据生平';
      var item = {
        lat: ex.lat, lng: ex.lng, locationName: ex.name, shortName: ex.key,
        events: [{ year: '', title: siteLabel, description: '' }],
        isBirth: ex.siteType === 'birth',
        isDeath: ex.siteType === 'death',
        siteType: ex.siteType,
        // 省级/国家级兜底：精度不到县，UI 要说明，不能让人当成精确地点
        precision: ex.precision,
        synthetic: true,
        siteLabel: siteLabel,
        summaryDesc: ex.precision === 'coarse'
          ? '档案只记到' + ex.key + '一级，图上按' + ex.key + '标示'
          : '据档案' + siteLabel + '标注'
      };
      if (ex.siteType === 'death') tailSites.push(item);
      else headSites.push(item);
    }
    if (headSites.length) locs = headSites.concat(locs);
    if (tailSites.length) locs = locs.concat(tailSites);

    // 统一补展示字段（事件点 / 兜底站 / 同址去重分支全覆盖）：
    // displayName 去掉词典 note，displayModern 只保留「今X」。locationName 原值不动。
    for (var di = 0; di < locs.length; di++) {
      var sp = splitPlaceName(locs[di].locationName);
      locs[di].displayName = sp.displayName || locs[di].shortName || '未知地点';
      locs[di].displayModern = sp.displayModern;
    }

    return locs;
  } catch (e) {
    return [];
  }
}

function getCenter(locs) {
  if (!locs || locs.length === 0) return { lat: 35.0, lng: 110.0 };
  var sumLat = 0, sumLng = 0;
  for (var i = 0; i < locs.length; i++) {
    sumLat += locs[i].lat;
    sumLng += locs[i].lng;
  }
  return { lat: sumLat / locs.length, lng: sumLng / locs.length };
}

// P1-7 热门人物：空态此前只写一句「如：李白、孔子」但**文字不可点**，新用户不知道搜谁。
// [注意] 只存姓名不存 id（本地库/生产库 id 分叉，跨环境禁硬编码 id），点击时现查。
// 与 web 端 HOT_FIGURES 保持同一组人（线上实测 name 精确命中且 events ≥ 10）。
var HOT_FIGURES = ['苏轼', '李白', '孔子', '玄奘', '徐霞客', '郑和'];

Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 96,
    figureList: [],
    selectedFigure: null,
    locations: [],
    markers: [],
    polyline: [],
    mapCenter: { lat: 35.0, lng: 110.0 },
    mapScale: 5,
    noData: false,
    totalEventCount: 0,
    // 兜底站点数（籍贯/生地/卒地），用于标题说明与图例显隐
    extraSiteCount: 0,
    // ===== A 案（2026-11-10）贴点卡 + 时间轴条 + 全部卡列表 =====

    // 当前站 = locations 的下标。-1 表示还没选中；选中人物后默认落到第 0 站。
    playIndex: -1,
    playing: false,
    // 播放序列：只放「真的到过」的站点下标（排除 synthetic 档案兜底站）。
    // 播放按这个序列推进；卡片 / 列表里的「第 N 站」仍按全量 locations 计数，
    // 这样「江阴·籍贯」仍能在列表里看到，但不会被播成「他真的去过」。
    playSeq: [],
    // 贴点卡位置（相对 .map-section）与尾巴方向：above / below / side
    cardPos: { left: 0, top: 0 },
    cardSide: '',
    cardTail: 20,
    cardName: '',
    cardFull: '',
    // [2026-11-10 真机修复] 卡高上限与正文滚动区高度都用**像素**下发：
    //   百分比 max-height 在 .map-section（flex 子项）上解析不出来，
    //   scroll-view 因此没有确定高度，内容铺到卡外 → 叠字 + 压图例。
    //   cardMaxH = 地图区高度 × 40%（_fitCard 实测后写入），cardBodyH = 卡高 - 头 - 站名。
    cardMaxH: 180,
    cardBodyH: 110,
    // 视图模式：single = 单卡跟随（同屏一张 HTML 贴点卡，地图跟点放大）；
    //          all    = 全部展开（全览 + 每站一个原生 callout，由地图渲染）
    viewMode: 'single',
    // 时间轴：每站一个刻度（pct 按站点序号等分）；trackPct 为当前站位置
    ticks: [],
    trackPct: 0,
    // 「全部站点卡片」覆盖层开关 + 打开时滚到当前站
    listOpen: false,
    alScrollInto: '',
    // 底栏实测高度（px）：page-wrapper 的 padding-bottom 与全部卡列表底边都用它
    dockH: 66,
    hotFigures: HOT_FIGURES,
    loading: false,
    // 地图延迟初始化（2026-11-09 切换提速）：首帧先出页面骨架，onReady 后再挂 <map>，
    // 不把地图初始化塞进首屏渲染的关键路径。
    mapReady: false,

    // ===== 激励视频解锁（2026-11-10；二次调整口径见 FREE_PLAY_LIMIT 注释）=====
    // unlocked：当前人物是否拥有「完整足迹」权限 = 看过广告解锁 || 站点太少整档免广告。
    // 换人物时在 selectFigure 里按 figureUnlockKey + 站点数重新判定，故深链 / 分享 /
    // 热门 chips / 深链 / 分享等所有入口都自动覆盖，无需在 detail.js / lineage.js 设闸。
    unlocked: false,
    // adFree：站点总数 ≤ AD_FREE_MAX_SITES（≤3 站），整档免广告、所有功能直接可用。
    adFree: false,
    // showUnlockBar：进页面恒为 false（**不弹解锁条**）。只有自动回放播完免费 2 站、
    // 或用户主动点「全部展开 / 全部卡」这类增强控件时才置 true；解锁成功复位。
    showUnlockBar: false,
    // 兼容保留字段：解锁条文案改为触发无关后 WXML 只引用 totalSiteCount，
    // 这两个字段当前只由 setData 写入、不参与渲染，故意不删以免扩大改动面。
    freePlayLimit: FREE_PLAY_LIMIT,
    visibleSiteCount: 0,
    totalSiteCount: 0
  },

  onLoad: function(options) {
    var that = this;
    // 显式初始化解锁提示去重标记（不依赖 undefined 的 falsy 语义，合规复核建议 E）
    this._limitModalShown = false;
    // [九修] 行走引擎默认走原生 moveAlong；一旦降级就在本页生命周期内保持 step，
    //   不再每段都白等一次 400ms 看门狗（moveAlong 失败基本是机型 / 基础库级别的）。
    // [十修] 降级分两档：接口不存在 ⇒ 永久 step；单次 fail ⇒ 只降**本段**，下一段再试
    //   （见 _fallbackToStep / WALK_MA_FAIL_MAX）。_legStepOnly 是「仅本段走步进」的开关。
    this._walkEngine = WALK_ENGINE_MOVEALONG;
    this._legStepOnly = false;
    this._maFailCount = 0;
    // [十修] 段代号：每开一段 +1。原生回调（success / fail / 兜底定时器 / 看门狗）
    //   闭包里捕获它，回到逻辑层先比对——段已经换过就整条丢掉。没有这个号，
    //   被打断的旧动画补发的 complete 会把**新的那一段**提前收掉（圆点瞬移到 B、
    //   卡片跳站），这是九修最危险的残余。
    this._legGen = 0;
    this._legDone = false;
    // [十二修] 半路暂停的续播点（从圆点停下的位置接着走，不回退到段起点）。
    //   换人 / 切模式 / 手动换站 / 播完 / 卸载一律置 null，见各处清理点。
    this._resume = null;
    var winInfo = wx.getWindowInfo();
    // [2026-11-10 四修] 窄屏标记，只算一次、后文全部读它。
    // 站号行「第 1 站 · 共 27 站 · 6 件大事」在窄屏放不下：卡宽只有 64%，
    // 375 屏可用≈220px / 需要≈211.8px，余量仅≈6px；320 屏溢出≈29px 会被
    // ellipsis 截掉「件大事」尾部——恰好截掉这轮修复最想让人看见的信息。
    // 窄屏改「第 1/27 站 · 6 件大事」，省约 60px。
    // 阈值取 <=360：360 屏可用≈210.4px 已小于需要值，同属临界。
    this._narrow = (winInfo.windowWidth || 375) <= 360;
    // safeAreaTop = 状态栏高度（与全站 nav-bar 用法统一，不再额外 +4）；导航总高 = safeAreaTop + 44，再留 8px 呼吸
    var safeTop = winInfo.statusBarHeight || 44;
    // 底栏高度首帧估算：dock 内容约 56px + 20rpx 底距(10px) + 安全区。
    // 真实值在 onReady 量 .dock 的 boundingClientRect 后覆盖；这里给个近似值
    // 是为了避免「测量失败时用 66px 兜底、在 iPhone X 上白留 / 少留 34px」。
    var safeBottom = 0;
    if (winInfo.safeArea && winInfo.screenHeight && winInfo.safeArea.bottom) {
      safeBottom = Math.max(0, winInfo.screenHeight - winInfo.safeArea.bottom);
    }
    var estDock = Math.round(66 + safeBottom);
    // 进入页面不预载任何人物，等待用户点热门 chips 或深链选人后再展示足迹（noData=true 显示引导空态）
    that.setData({ safeAreaTop: safeTop, navBarHeight: safeTop + 44 + 8, noData: true, dockH: estDock });

    // 深链：人物详情页「查看足迹」入口 / 分享卡片带 id 进来，直接加载该人物
    var deepId = options && (options.id || options.figureId);
    if (!deepId) return;
    var id = String(deepId);
    // 详情页预取过这份事件（2026-11-09 切换提速）：先读缓存直接渲染，不转圈；
    // 2 分钟内算新鲜、不刷新，超过才在后台静默刷新（同一份数据短时间内不重复请求）。
    var hit = pageCache.getCache('footprint:' + id);
    if (!hit || !hit.data) hit = pageCache.getCache('fig:' + id);
    if (hit && hit.data) {
      var cached = mapServerFigure(Object.assign({}, hit.data, {
        events: parseEvents(hit.data.events)
      }));
      that.setData({ loading: false });
      that._showFigure(cached);
      if (hit.age > pageCache.FRESH_MS) that._loadFigureById(id, { silent: true });
      return;
    }
    this._loadFigureById(id);
  },

  /**
   * 地图延迟初始化（2026-11-09 切换提速）：onReady 时首帧已经画完，再挂 <map>，
   * 避免把地图初始化塞进首屏关键路径。缓存分支可能在 onLoad 阶段就先 _showFigure，
   * 那时 mapReady 仍为 false、_fitAll 直接返回；这里用同一份 locations 补一次视野对齐。
   */
  onReady: function() {
    var that = this;
    that.setData({ mapReady: true });
    // 底栏 / 地图区尺寸实测：dock 高度决定底部让位（812≈100px、667≈66px），
    // 地图区 rect 是贴点卡换算屏幕坐标的基准。放在 mapReady 之后量，节点已存在。
    that._measureLayout();
    if (that._mapReadyTimer) clearTimeout(that._mapReadyTimer);
    // 使用引导：等首帧与人物数据都落地后再拉（数据未到会短等，避免后两步被跳过）
    that._scheduleGuide();
    // 给原生地图一层渲染时间，再对齐视野（失败时 _fitSig 会复位，后续交互仍可重试）
    that._mapReadyTimer = setTimeout(function() {
      that._mapReadyTimer = null;
      that._measureLayout();
      // 深链 / 缓存路径可能在 map 挂载之前就算过一次视野（那时没有地图上下文），
      // 这里按当前模式补一次：单卡跟随 → 聚焦当前站；全部展开 → 全览。
      var idx = that.data.playIndex;
      if (idx >= 0 && that.data.viewMode === 'single') {
        that._fitCard(function() { that._focusStation(idx); });
      } else if (that.data.viewMode === 'all') {
        that._fitAll();
      }
    }, 100);
  },

  /** 按 id 取人物（/api/figures/:id 的 events 是 JSON 字符串，需自行解析） */
  _loadFigureById: function(id, opts) {
    var silent = !!(opts && opts.silent === true);
    var that = this;
    var key = 'footprint:' + String(id);

    // 在途复用（2026-11-09 切换提速）：详情页预取还没返回时直接接管那次请求，
    // 不再发第二条（否则「详情页预取 + 本页 onLoad」会请求同一份数据两次）。
    var inflight = pageCache.getInflight(key);
    if (inflight && inflight.promise) {
      if (!silent) that.setData({ loading: true });
      inflight.promise.then(function(body) {
        if (that._unloaded) return;
        that.setData({ loading: false });
        that._applyFigureData(body && body.success && body.data, silent);
      }).catch(function() {
        if (that._unloaded) return;
        that.setData({ loading: false });
        if (!silent) wx.showToast({ title: '网络异常，请稍后重试', icon: 'none' });
      });
      return;
    }

    if (!silent) that.setData({ loading: true });
    request({
      timeout: 10000,
      url: FIGURES.GET(id),
      success: function(res) {
        that.setData({ loading: false });
        that._applyFigureData(res.data && res.data.success && res.data.data, silent);
      },
      fail: function() {
        that.setData({ loading: false });
        if (!silent) wx.showToast({ title: '网络异常，请稍后重试', icon: 'none' });
      }
    });
  },

  /**
   * 「拿到人物数据后渲染」的统一下游（网络回调与在途复用共用，避免两套分支分叉）。
   * @param {object} d    /api/figures/:id 的 data
   * @param {boolean} silent 后台静默刷新
   */
  _applyFigureData: function(d, silent) {
    var that = this;
    if (!d) {
      if (!silent) wx.showToast({ title: '未找到该人物', icon: 'none' });
      return;
    }
    var events = parseEvents(d.events);
    // 写短时缓存（2026-11-09）：5 分钟内再次进入（含详情页预取）直接命中，不重复请求
    pageCache.setCache('footprint:' + d.id, {
      id: d.id,
      name: d.name,
      avatar: d.avatar,
      dynasty: d.dynasty,
      region: d.region,
      birthYear: d.birthYear,
      deathYear: d.deathYear,
      events: events
    });
    // 后台静默刷新不打断正在播放的足迹
    if (silent && that.data.playing) return;
    var figure = mapServerFigure(Object.assign({}, d, { events: events }));
    that._showFigure(figure);
  },

  /**
   * 分享：足迹页此前是本项目唯一没有 onShareAppMessage 的工具页，
   * 导致「我看的这份足迹」无法发给别人。已选中人物时带上 id，对方点开直接落到此人。
   */
  onShareAppMessage: function() {
    var f = this.data.selectedFigure;
    var base = '/footprint-pkg/pages/footprint/footprint';
    if (f && f.id) {
      return {
        title: (f.name || '历史人物') + '的一生足迹地图',
        path: base + '?id=' + f.id
      };
    }
    return { title: '历史人物足迹地图 · 一生行迹尽在图上', path: base };
  },

  /**
   * 朋友圈分享：与转发保持同一参数口径。
   * 单页模式下只会拿到这里返回的 query —— 已选中人物时必须带 id，
   * 否则对方打开是空地图；未选中时留空串，落到默认页。
   */
  onShareTimeline: function() {
    var f = this.data.selectedFigure;
    if (f && f.id) {
      return {
        title: (f.name || '历史人物') + '的一生足迹地图',
        query: 'id=' + f.id
      };
    }
    return { title: '历史人物足迹地图 · 一生行迹尽在图上' };
  },

  /**
   * 说明（2026-09-29）：此处原有 checkLocationAuth()，会在检测到用户拒绝过位置权限时
   * 弹「需要位置权限 / 去设置」。但它既**没有任何调用点**，又**永远不可能触发**
   * （本页从未申请过位置权限，authSetting['scope.userLocation'] 恒为 undefined 而非 false）。
   *
   * 足迹地图早已改为**不采集用户位置**：地图只按「历史人物足迹坐标」定位（show-location=false），
   * 全库也无 wx.getLocation / wx.authorize 等调用。故作为遗留死代码删除。
   * [注意] 这正是《用户隐私保护指引》里多出一条「位置信息」的历史来源 ——
   *    早期版本确曾使用位置，后续取消后声明未同步清理，需在指引中一并移除。
   */

  /* -------- 激励视频解锁增强足迹（2026-11-10；二次调整口径见 FREE_PLAY_LIMIT） -------- */

  /**
   * 播放触顶提示（2026-11-10 二次调整的**核心触发点**）：
   * 只有「未解锁人物自动连续回放、播完前 FREE_PLAY_LIMIT 站」时才调用。
   * 🔴 进页面不触发、绝不自动弹广告、绝不阻断基础查看：这里只停播 + 点亮流内
   *    解锁条 + 一次轻提示，用户仍可手动点任意站 / ‹ › / 刻度尺 / 下方热门人物。
   * 流内条不是页面唯一出口，也不是全屏遮罩 —— 对应《运营规范》2.3「强制点击」红线。
   */
  _onPlayLimitReached: function() {
    if (this.data.unlocked) return;
    var that = this;
    this.setData({ showUnlockBar: true }, function() {
      // 解锁条多占 48px 流内高度、地图区变矮：
      // 重算 _mapRect 并重新贴卡，避免卡片落在新的地图区底部之外。
      that._measureLayout();
    });
    // 播完第 2 站才提示（用户明确要求「播完第2条提示看广告解锁更多地图」）。
    // 带「暂不」、只在播放触顶出现、进页面绝不弹、不是页面唯一出口 —— 合规。
    // 同一人物只弹一次：用户按「暂不」后可继续重播前 2 站，不该每轮都打断，
    // 流内解锁条常驻作为随时可点的解锁入口。选新人物时在 selectFigure 复位。
    if (this._limitModalShown) return;
    this._limitModalShown = true;
    var f = this.data.selectedFigure;
    var name = (f && f.name) ? f.name : '该人物';
    // 「还有 N 站」必须与连续回放同口径：播放按 playSeq 推进（排除籍贯/生地/卒地
    // 档案兜底站），用 locations.length 会让含兜底站的人物虚报站数（合规复核建议 B）。
    var remain = Math.max(0, (this.data.playSeq || []).length - FREE_PLAY_LIMIT);
    wx.showModal({
      title: '已看完前 ' + FREE_PLAY_LIMIT + ' 站',
      content: '「' + name + '」还有 ' + remain +
        ' 站连续回放。看完一段激励视频广告，即可解锁更多地图：完整轨迹连线、全览地图、' +
        '完整回放与全部站点卡片。该人物的解锁长期有效。',
      confirmText: '看广告解锁',
      cancelText: '暂不',
      success: function(res) {
        if (res.confirm) that.onTapUnlock();
      }
    });
  },

  /**
   * 增强控件门禁提示：用户**主动点**「全部展开 / 全部卡」这类增值入口时才弹。
   * WXML 里这些控件始终可见（进页面 = 正常态），点击后才由本弹窗说明增值内容；
   * 带「暂不」取消、不是页面唯一出口；同时点亮流内解锁条作为常驻入口。
   */
  _promptUnlock: function() {
    var that = this;
    var f = this.data.selectedFigure;
    // storage 已解锁但本页 data 尚未同步（例如刚写完就切站）：直接放行，不重复放广告
    if (rewardAd.isUnlocked(figureUnlockKey(f))) {
      this._resume = null;   // [十二修·复审] 下面 updateMap 会整组换 markers
      this.setData({ unlocked: true, showUnlockBar: false, visibleSiteCount: this.data.locations.length }, function() {
        that._measureLayout();
        that.updateMap(that.data.locations, true);
      });
      return;
    }
    this.setData({ showUnlockBar: true }, function() { that._measureLayout(); });
    var name = (f && f.name) ? f.name : '该人物';
    wx.showModal({
      title: '解锁更多地图',
      content: '「' + name + '」共 ' + that.data.locations.length +
        ' 站，免费可看全部点位、任意站的事件卡与前 ' + FREE_PLAY_LIMIT +
        ' 站连续回放。看完一段激励视频广告，即可解锁完整轨迹连线、全览地图、' +
        '完整回放与全部站点卡片，该人物的解锁长期有效。',
      confirmText: '看广告解锁',
      cancelText: '暂不',
      success: function(res) {
        if (res.confirm) that.onTapUnlock();
      }
    });
  },

  /** 用户主动点「看广告解锁」：完整观看（onClose.isEnded）后才登记解锁并重渲染。 */
  onTapUnlock: function() {
    var f = this.data.selectedFigure;
    var key = figureUnlockKey(f);
    if (!key) {
      wx.showToast({ title: '请先选择一位人物', icon: 'none' });
      return;
    }
    var that = this;
    if (this.data.unlocked || rewardAd.isUnlocked(key)) {
      that._resume = null;   // [十二修·复审] 下面 updateMap 会整组换 markers
      this.setData({ unlocked: true, showUnlockBar: false, visibleSiteCount: that.data.locations.length }, function() {
        that._measureLayout();
        that.updateMap(that.data.locations, true);
      });
      return;
    }
    wx.showLoading({ title: '广告加载中', mask: true });
    rewardAd.showAd({
      onReward: function() {
        wx.hideLoading();
        rewardAd.unlock(key);
        // [十二修·复审 G1] 解锁会 updateMap 换全量 marker 组，续播点必须作废
        that._resume = null;
        that.setData({ unlocked: true, showUnlockBar: false, visibleSiteCount: that.data.locations.length }, function() {
          that._measureLayout();
          that.updateMap(that.data.locations, true);
          wx.showToast({ title: '已解锁更多地图', icon: 'success' });
        });
      },
      onFail: function(reason) {
        wx.hideLoading();
        // 失败时保留 showUnlockBar：流内条是常驻重试入口，别让它消失
        var msg = reason === 'not_ended' ? '未完整观看，暂未解锁'
          : reason === 'unsupported' ? '当前微信版本不支持，请升级微信'
          : '广告加载失败，请稍后再试';
        wx.showToast({ title: msg, icon: 'none', duration: 2200 });
      }
    });
  },

  /* ---------------- 底部五标签（共享 templates/dock/dock.wxml） ---------------- */

  /**
   * 足迹页底栏点击：
   *   · 「足迹」= 当前页，忽略；
   *   · 「档案 / 年表 / 关系」= 回到详情页并切到对应标签：
   *       栈里若有**同一人物**的详情页 → 先把目标标签写回该页再 navigateBack（一次返回，不叠页）；
   *       没有（从首页 / 查询页直接进足迹页）→ 打开该人物详情页并带 &tab=。
   *   · 「世系」= 切到世系页：上一页正好是同一人物的世系页则返回，否则新开。
   *   未选人物（页面还是空态）时没有可打开的目标，只提示，不跳转。
   */
  onDockTap: function(e) {
    var tab = e.currentTarget.dataset.tab;
    if (!tab || tab === 'footprint') return;
    var fig = this.data.selectedFigure;
    var id = fig && fig.id;
    if (!id) {
      wx.showToast({ title: '请先选择一位人物', icon: 'none' });
      return;
    }
    if (this._dockJumping) return;   // 连点保护：避免触发两次返回

    if (tab === 'lineage') {
      var prev = this._prevPage();
      var sameLineage = prev
        && prev.route === 'lineage-pkg/pages/lineage/lineage'
        && prev.data && prev.data.center
        && String(prev.data.center.id) === String(id);
      if (sameLineage) { this._dockBack(1); return; }
      this._dockJumping = true;
      wx.navigateTo({
        url: '/lineage-pkg/pages/lineage/lineage?id=' + id,
        complete: function() { this._dockJumping = false; }.bind(this)
      });
      return;
    }

    // archive / timeline / relations：优先回溯栈里的同人物详情页
    var pages = getCurrentPages();
    var cur = pages.length - 1;
    for (var i = cur - 1; i >= 0; i--) {
      var p = pages[i];
      if (p.route !== 'detail-pkg/pages/detail/detail') continue;
      if (typeof p.setDockTab !== 'function') continue;
      if (String(p._figureId) !== String(id)) continue;   // 人物不同不复用
      p.setDockTab(tab, { deferScroll: true });   // 本页在后台，回顶延后到详情页 onShow
      this._dockBack(cur - i);
      return;
    }
    // 栈里没有可复用的详情页：正常打开并落在目标标签
    this._dockJumping = true;
    wx.navigateTo({
      url: '/detail-pkg/pages/detail/detail?id=' + id + '&tab=' + tab,
      complete: function() { this._dockJumping = false; }.bind(this)
    });
  },

  /** 栈里当前页的上一页（没有则 null） */
  _prevPage: function() {
    var pages = getCurrentPages();
    return pages.length > 1 ? pages[pages.length - 2] : null;
  },

  /** 带连点保护的返回 */
  _dockBack: function(delta) {
    var that = this;
    this._dockJumping = true;
    wx.navigateBack({
      delta: delta,
      complete: function() { that._dockJumping = false; }
    });
  },

  /**
   * 使用引导：两个锚点都依赖已选人物与站点数据，
   * 数据还在路上时短等几轮（最多 3 × 400ms），落下后再启动；
   * 空态（未选人物 / 该人物无可用地名）时没有可指认的目标，直接不启动，
   * 也不写完成 —— 等 _showFigure 落到有站点的人物后由它再次排期。
   */
  _scheduleGuide: function() {
    if (this._guideStarted || this._guideTimer) return;
    var that = this;
    this._guideTimer = setTimeout(function() {
      that._guideTimer = null;
      if (that._unloaded || that._guideStarted) return;
      if (that.data.loading && (that._guideWaits || 0) < 3) {
        that._guideWaits = (that._guideWaits || 0) + 1;
        that._scheduleGuide();
        return;
      }
      if (that.data.loading || !that.data.selectedFigure || that.data.noData || !(that.data.locations || []).length) return;
      var layer = that.selectComponent('#guideLayer');
      if (!layer) {
        // 组件还没挂上：最多再等 3 轮
        if ((that._guideWaits || 0) < 3) {
          that._guideWaits = (that._guideWaits || 0) + 1;
          that._scheduleGuide();
        }
        return;
      }
      that._guideStarted = true;
      layer.autoStart('footprint');
    }, 400);
  },

  onUnload: function() {
    // 注销广告监听并销毁页面级单例：官方禁止 RewardedVideoAd 跨页面复用
    rewardAd.destroy();
    try { wx.hideLoading(); } catch (e) {}
    if (this._mapReadyTimer) clearTimeout(this._mapReadyTimer);
    this._mapReadyTimer = null;
    if (this._guideTimer) clearTimeout(this._guideTimer);
    this._guideTimer = null;
    if (this._regionTimer) clearTimeout(this._regionTimer);
    this._regionTimer = null;
    if (this._cardTimer) clearTimeout(this._cardTimer);
    this._cardTimer = null;
    // 标记已卸载：setData 回调里排队的 _fitAll 不能再碰已销毁的 map 上下文
    this._unloaded = true;
    // 播放中退出页面必须清掉定时器（单卡 interval / 全览自链 timeout / 行走保险丝），
    // 且**不能**再 setData
    this._disposePlay();
  },

  // [重要] onHide 也要停播放：用户按 Home 键/切到别的程序时页面不进 onUnload，
  //    定时器会在隐藏页面持续 setData（单卡 5s/次、全览每段一次，白耗电）。
  //    用 _pausePlay 而非复位：用户回来时还停在原来那一站、浮卡还在，
  //    不用重新播一遍找位置。
  onHide: function() {
    this._pausePlay();
    // [十二修·复审 G1] 广告 / 切后台会顺带换掉 markers 组，清掉续播点，
    //   回来按播放走正常起播（B2 的组校验是第二道保险）。
    this._resume = null;
    // 广告期间按 Home 键时 onClose 可能不到达，兜底收掉 loading
    try { wx.hideLoading(); } catch (e) {}
  },

  // P1-7 热门人物 chips：点一下直接搜到并选中（空态文案「如：李白、孔子」此前不可点）
  onHotTap: function(e) {
    var name = e.currentTarget.dataset.name;
    if (!name) return;
    var that = this;
    var seq = (this._hotSeq = (this._hotSeq || 0) + 1);
    this.setData({ loading: true });
    request({
      timeout: 10000,
      url: FIGURES.SEARCH,
      data: { search: name, pageSize: 10 },
      success: function(res) {
        if (seq !== that._hotSeq) return;
        that.setData({ loading: false });
        var list = (res.data && res.data.success && res.data.data && res.data.data.list) || [];
        var hit = null;
        for (var i = 0; i < list.length; i++) {
          if (list[i].name === name && list[i].events && list[i].events.length > 0) { hit = list[i]; break; }
        }
        if (!hit) {
          wx.showToast({ title: '「' + name + '」暂无足迹数据', icon: 'none' });
          return;
        }
        that.setData({ loading: false });
        that._showFigure(mapServerFigure(hit));
      },
      fail: function() {
        if (seq !== that._hotSeq) return;
        that.setData({ loading: false });
        wx.showToast({ title: '网络异常，请稍后重试', icon: 'none' });
      }
    });
  },

  // 将人物并入 figureList（按 id 去重）并选中展示足迹
  _showFigure: function(figure) {
    if (!figure || !figure.events || figure.events.length === 0) {
      // 空事件分支也要清旧状态：否则标题、底栏人物名、marker/连线仍是上一位的，
      // 用户会以为「这个人有足迹、只是地图没画出来」。定时器与视野签名一并复位。
      // 单卡跟随是 setInterval、全部展开是自链 setTimeout：两种形态都要清
      if (this._playTimer) { clearTimeout(this._playTimer); clearInterval(this._playTimer); this._playTimer = null; }
      // [2026-11-11] 空态也会抹掉 markers/polyline，圆点行走的 timer 必须一起清，
      // 否则它到点后会对一份已经空了的数据再 setData 一次。
      this._clearWalkTimer();
      this._walking = false;
      this._walkerIdx = null;
      this._walkerPos = null;
      this._resume = null;   // [十二修] 空态：续播点作废
      this._lineLit = false;
      this._basePolyline = [];
      this._limitModalShown = false;
      this._fitSig = '';
      this._baseMarkers = [];
      this.setData({
        noData: true,
        selectedFigure: null,
        locations: [],
        markers: [],
        polyline: [],
        totalEventCount: 0,
        extraSiteCount: 0,
        playIndex: -1,
        playSeq: [],
        ticks: [],
        trackPct: 0,
        cardName: '',
        cardFull: '',
        playing: false,
        listOpen: false,
        unlocked: false,
        adFree: false,
        showUnlockBar: false,
        visibleSiteCount: 0,
        totalSiteCount: 0
      });
      return;
    }
    var list = this.data.figureList;
    var selIdx = -1;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === figure.id) { selIdx = i; break; }
    }
    if (selIdx < 0) {
      list = list.concat([figure]);
      selIdx = list.length - 1;
      this.setData({ figureList: list });
    }
    this.selectFigure(selIdx);
  },

  selectFigure: function(index) {
    this._resume = null;   // [十二修] 换人物：上一位的半路续播点必须作废
    index = parseInt(index, 10);
    var list = this.data.figureList;
    if (index < 0 || index >= list.length) return;
    var figure = list[index];
    // 换人物：只清定时器，播放状态并入下面唯一一次 setData（少一次跨线程通信）
    // 单卡跟随是 setInterval、全部展开是自链 setTimeout：两种形态都要清
    if (this._playTimer) { clearTimeout(this._playTimer); clearInterval(this._playTimer); this._playTimer = null; }
    // [2026-11-11] 圆点行走的 timer 一并清；行走态与圆点下标作废（换人后是别人的点）
    this._clearWalkTimer();
    this._walking = false;
    this._walkerIdx = null;
    this._walkerPos = null;
    this._lineLit = false;
    // 解锁提示按人物复位：新人物要能重新弹一次「播完前 2 站」提示
    this._limitModalShown = false;
    // 视野签名必须重置：否则换到坐标集合相同的人物时会跳过 includePoints
    this._fitSig = '';
    var locs = extractLocations(figure);
    var noData = locs.length === 0;
    // 解锁判定（2026-11-10 二次调整）：
    //  · locs.length <= AD_FREE_MAX_SITES（≤3 站）→ adFree，整档免广告、全功能直接用
    //    （用户明确要求「一共就三条足迹就免广告可以直接查看」）；
    //  · 否则按人物读 storage：看过广告的人物长期有效、不按天、不全局。
    // 🔴 点位不再按站点数截断（见 updateMap）：visibleSiteCount 恒为 locs.length。
    //    基础查看（点任意 marker / ‹ › / 刻度尺 / 事件卡）始终免费可看，
    //    广告只解锁增强（完整轨迹连线 / 全览地图 / 完整连续回放 / 全部卡列表）。
    var adFree = locs.length <= AD_FREE_MAX_SITES;
    var unlocked = adFree || rewardAd.isUnlocked(figureUnlockKey(figure));
    var visibleSiteCount = locs.length;
    var totalEventCount = 0;
    var extraSiteCount = 0;
    var playSeq = [];
    // 兜底站点（籍贯/生地/卒地）单独计数：它们不是「行迹」，
    // 标题里若把它们的 1 条也算成「大事」，等于给档案字段虚报了编年。
    // [本轮] 同时构建播放序列 playSeq：排除 synthetic 站点，
    // 避免把「档案里写他籍贯江阴」播成「他第 1 站到了江阴」。
    for (var i = 0; i < locs.length; i++) {
      var loc = locs[i];
      // wx:key 需要稳定标识：同址聚合后的站点与事件都没有原生 id
      loc.uid = 'st' + i;
      // [叠字根因之一] 接口的 events 偶发行级重复（同 year + title + description），
      // 同址聚合后两条都会进同一张卡，看起来就是「同一句话写了两遍」。
      // 渲染层不能靠样式去重，这里按内容签名去一次。
      var seenEvt = {};
      var uniqEvt = [];
      for (var q = 0; q < loc.events.length; q++) {
        var ev = loc.events[q];
        var evSig = (ev.year || '') + '|' + (ev.title || '') + '|' + (ev.description || '');
        if (seenEvt[evSig]) continue;
        seenEvt[evSig] = 1;
        uniqEvt.push(ev);
      }
      loc.events = uniqEvt;
      // [2026-11-10 三修] 一站可挂多条事件：站点级年份标签与件数在此一次算好，
      // 卡片 / 全部卡列表 / callout 全部读这两个字段，不各算各的。
      loc.yearLabel = yearLabelOf(loc.events);
      loc.eventN = loc.events.length;
      for (var k = 0; k < loc.events.length; k++) loc.events[k].evtIdx = 'e' + k;
      if (!loc.synthetic) {
        totalEventCount += loc.events.length;
        playSeq.push(i);
        // 纯展示字段：站号按真实行迹顺序 1,2,3…（档案点位不占站号）
        loc.stationNo = playSeq.length;
      } else {
        extraSiteCount++;
        loc.stationNo = 0;
      }
      // 播放卡与 Web popup-card 对齐（2026-09-16）：聚合非空 description 供卡内显示
      var descs = [];
      for (var j = 0; j < loc.events.length; j++) {
        var d = String(loc.events[j].description || '').trim();
        if (d) descs.push(d);
      }
      loc.summaryDesc = descs.join('；');
    }

    var traceCount = playSeq.length;
    // [2026-11-10 四修] 「全部站点卡片」列表的两个文本字段在这里一次算好，
    // wxml 保持无逻辑：
    //  · titleText：原先进列表只取 events[0].title，南旸岐那站挂着 6 件大事，
    //    却只看得到「生于南直隶江阴南旸岐」，读起来像漏了 5 条。多条时补「等 N 件大事」。
    //  · posText：与卡片同口径，窄屏一起缩写，否则同一个站点在卡片写
    //    「第 1/27 站」、在列表写「第 1 站 · 共 27 站」，两种读法打架。
    var narrow = this._narrow === true;
    for (var li = 0; li < locs.length; li++) {
      var ll = locs[li];
      var e0 = (ll.events && ll.events[0]) || {};
      var t0 = e0.title || ll.siteLabel || '档案所载地点';
      if (ll.eventN > 1) t0 += ' 等 ' + ll.eventN + ' 件大事';
      ll.titleText = t0;
      // [2026-11-10 四修·补] synthetic（档案兜底站）的 stationNo 恒 0，套站号公式会拼出
      // 「第 0 站 · 共 0 站」「第 0/0 站」这种脏值。它本来就不是「行迹第几站」，
      // 与 wxml 的 `wx:if="{{item.synthetic}}"` 分支同文案，两处永远不会打架。
      ll.posText = ll.synthetic
        ? '档案所载 · ' + (ll.siteLabel || '档案位置')
        : (narrow
          ? '第 ' + (ll.stationNo || 0) + '/' + traceCount + ' 站'
          : '第 ' + (ll.stationNo || 0) + ' 站 · 共 ' + traceCount + ' 站');
    }
    // [2026-11-10 遗留②] 全是档案兜底站时 traceCount=0，别写「一生足迹 · 0 站」这种怪话。
    var headSub = !figure ? '选择人物，查看一生足迹'
      : noData ? '该人物暂无可用地名'
      : traceCount === 0
        ? (extraSiteCount ? '档案所载 · ' + extraSiteCount + ' 处地点' : '该人物暂无可用行迹')
        : '一生足迹 · ' + traceCount + ' 站'
          + (extraSiteCount ? ' · 另 ' + extraSiteCount + ' 处档案地点' : '')
          + (totalEventCount ? ' · ' + totalEventCount + ' 件大事' : '');

    // [2026-11-10 遗留①] 刻度只按真实行迹 playSeq 生成：档案兜底站不占刻度，
    // 否则首卡写「第 1 站」而圆点落在第 2 格，视觉错位。
    var ticks = this._buildTicks(locs, playSeq);
    // 首卡落在第一条真实行迹（不落在籍贯/生地兜底站）；全是兜底站时仍落 0，
    // wxml 的 fp-note 说明条会解释「仅档案位置」。
    var firstIdx = playSeq.length ? playSeq[0] : (locs.length ? 0 : -1);
    var cf = firstIdx >= 0
      ? this._cardFields(locs[firstIdx], traceCount)
      : { cardName: '', cardFull: '', cardYear: '', cardYearNone: true, cardMeta: '' };
    // 此刻 this.data.locations / playSeq 仍是上一位人物，绝不能调 this._trackPct；
    // 按 firstIdx 在**本次** playSeq 中的位置现算（首卡恒为 0%）。
    var trackPct = (playSeq.length <= 1 || firstIdx < 0)
      ? 0
      : (playSeq.indexOf(firstIdx) / (playSeq.length - 1)) * 100;

    this.setData({
      selectedFigure: figure,
      locations: locs,
      totalEventCount: totalEventCount,
      extraSiteCount: extraSiteCount,
      traceCount: traceCount,
      headSub: headSub,
      noData: noData,
      // 选中人物后默认落在第 1 条真实行迹（卡立即出现，且与列表站号对得上）
      playIndex: firstIdx,
      playSeq: playSeq,
      ticks: ticks,
      trackPct: trackPct,
      cardName: cf.cardName,
      cardFull: cf.cardFull,
      cardYear: cf.cardYear,
      cardYearNone: cf.cardYearNone,
      cardMeta: cf.cardMeta,
      cardPos: { left: 0, top: 0 },
      cardSide: '',
      playing: false,
      // 换人物回到「单卡跟随」：全部展开是看全貌用的临时态，不该跨人物保留
      viewMode: 'single',
      listOpen: false,
      unlocked: unlocked,
      adFree: adFree,
      // 进页面 / 换人物恒不显示解锁条（用户明确要求「不要一进入就显示看广告解锁」）；
      // 只有播放触顶 _onPlayLimitReached 或用户点增强控件 _promptUnlock 才点亮。
      showUnlockBar: false,
      visibleSiteCount: visibleSiteCount,
      totalSiteCount: locs.length
    });
    // 使用引导：人物数据落地后再拉一次（若已在跑会被 _guideStarted 挡掉）
    this._scheduleGuide();

    // [重要] 选了人却画不出足迹时给出明确反馈：
    //    用户看到的是「点了没反应」，但其实是「点了但该人物事件无法解析出地点」。
    if (noData) {
      wx.showToast({
        title: '「' + (figure.name || '该人物') + '」暂无可用地名（事件与籍贯均未载）',
        icon: 'none',
        duration: 2200
      });
    }

    if (!noData) {
      this.updateMap(locs, unlocked);
    } else {
      // 无数据时清掉上一位人物残留的 marker/连线，避免播放等逻辑引用旧数据
      this._baseMarkers = [];
      this._basePolyline = [];
      this.setData({ markers: [], polyline: [] });
    }
  },

  updateMap: function(locs, unlocked) {
    if (!locs || locs.length === 0) return;
    // [2026-11-10 二次调整] marker **恒为全量**：进页面就是「图二正常态」，
    // 所有站点位 / 事件卡 / 手动换站都免费可看 —— 这是合规要求的基础功能。
    // 🔴 旧实现按 locations 下标截断到「前 N 站」，但档案兜底站（籍贯/生地/卒地）
    //    会被 concat 到数组最前面、playSeq 又要跳过它们，一放开播放就会出现
    //    「地图飞到一个没画出来的点」。故点位不再截断。
    // 广告解锁的「更多地图」= 完整轨迹连线 + 全览（全部展开）+ 完整连续回放
    // + 全部站点卡片列表；未解锁时这四项分别由 polyline / 门禁 / 播放额度控制。
    if (typeof unlocked !== 'boolean') unlocked = !!this.data.unlocked;
    var visibleLimit = locs.length;
    var visibleLocs = locs;

    var markers = [];
    for (var i = 0; i < locs.length; i++) {
      var loc = locs[i];
      if (!loc.events || loc.events.length === 0) {
        loc.events = [{ year: '', title: loc.locationName || '地点' }];
      }
      markers.push(this._mkMarker(loc, i, 'single'));
    }

    // [2026-11-10] 「全部展开」改用地图原生 callout 承载站点卡：
    //   两套 marker 一次建好，切模式时整组 setData，不做增量改（callout 有/无）。
    //   _mkCalloutLite 是缩小后的降级版（只诞/终挂 callout），由 _applyCalloutLevel 挑。
    this._calloutShallow = false;
    this._calloutTriple = false;
    this._mkCalloutTriple = null;
    this._mkSingle = markers;
    this._mkCallout = this._mkMarkerSet(locs, 'callout');
    this._mkCalloutLite = this._mkMarkerSet(locs, 'callout-lite');

    // [重要] 连线必须有 ≥2 个合法落点才画：
    //   ① 地图 polyline 的 points 少于 2 个点（单点人物实测约占 20%，全库大量
    //      窄档案只有籍贯/卒地一处），开发者工具地图层会先报
    //      「MultiPolyline.geometries: …第0元素的paths属性无效！」，
    //      再连锁抛 RangeError: Invalid typed array length；
    //   ② 坐标非数值（接口 location 对象偶尔给字符串/null）同样会让 paths 非法。
    //   故这里逐个转数值并过滤，过滤后不足 2 点就整条不传，只留 marker —— 一个点
    //   本来就画不出「行迹」，强行画线只剩一个错误。
    var linePts = [];
    for (var li = 0; li < locs.length; li++) {
      var la = Number(locs[li].lat);
      var ln = Number(locs[li].lng);
      if (!isFinite(la) || !isFinite(ln)) continue;
      if (Math.abs(la) > 90 || Math.abs(ln) > 180) continue;
      if (la === 0 && ln === 0) continue;
      linePts.push({ latitude: la, longitude: ln });
    }
    var polyline = linePts.length >= 2 ? [{
      points: linePts,
      color: '#b5713a',
      width: 3,
      dottedLine: false,
      arrowLine: true,
      borderColor: 'rgba(181, 113, 58, 0.2)',
      borderWidth: 1
    }] : [];

    // 点位全量可见，中心 / 缩放按全量算。
    var center = getCenter(visibleLocs);
    var scale = visibleLimit <= 3 ? 6 : (visibleLimit <= 6 ? 5 : 4);
    var that = this;
    // [2026-11-11] 存一份「静止态底线」：全部展开播放时用同一条线的 colorList 给
    //   已走过段上色（见 _paintWalked），暂停 / 切回单卡 / 手动换站时整条还原成这一份。
    //   存量必须是**真正下发的那份**（未解锁时是空数组），否则还原会把本不该出现的
    //   完整轨迹画出来，等于绕过广告解锁。
    this._basePolyline = unlocked ? polyline : [];
    this._lineLit = false;

    // 当前模式的基准 marker：单卡模式用带小序号 badge 的那套，
    // 全部展开用挂 callout 的那套（播放高亮 / 选中放大都在这套之上做副本）
    // [2026-11-10] 不再 slice 截断：_selectStation / _applyPlayIndex 会拿它整组
    //   map 后 setData，截断会让下标 >= N 的站点在换站时凭空消失。
    var baseAll = this.data.viewMode === 'all' ? this._calloutSet() : this._mkSingle;
    this._baseMarkers = baseAll;
    // 投影基准先按平均中心占位（真正的视野随后由 includePoints 决定，
    // 成功后会 _syncView 回读校正），保证贴点卡首帧不会用上一位人物的视野。
    this._view = { lat: center.lat, lng: center.lng, scale: scale };
    this.setData({
      markers: this._baseMarkers,
      // [2026-11-11 八修] 全部展开：整条 26 段全画出来就是一团交叉线（用户截图），
      //   改成初始不画线，按下播放后由 _paintWalkedPoints 从起点逐段生长。
      //   单卡跟随仍下发整条底线：那个模式一屏一站，线是做背景用的，不是乱源。
      polyline: this.data.viewMode === 'all' ? [] : this._basePolyline,
      mapCenter: center,
      mapScale: scale
    }, function() {
      // [2026-11-10] 数据到位后按当前模式决定视野：
      //   单卡跟随 → 直接聚焦第 1 站（scale 13），卡和地图从一开始就指向同一个点；
      //   全部展开 → includePoints 全览，callout 由地图自己贴点。
      var idx = that.data.playIndex >= 0 ? that.data.playIndex : 0;
      if (that.data.viewMode === 'all') {
        that._fitAll();
        return;
      }
      that._fitCard(function() {
        that.positionCard();
        that._focusStation(idx, function() { that.positionCard(); });
      });
    });
  },

  /** 单个 marker 的构造。mode 决定「这站要不要挂 callout」：
   *   single       → 只有小序号 badge（诞/终/籍 带色），不挂 callout：
   *                  地名与年份由 HTML 贴点卡承担，再挂气泡会两层内容叠在一起；
   *   callout      → 每站常驻 callout（序号 · 站名 · 年份），**不挂 label**：
   *                  callout 与 badge 都贴同一点位，同时挂必然互相压字，
   *                  序号已经进了 callout，badge 就只冗余不减信息；
   *   callout-lite → 只有诞 / 终 挂 callout（缩到比全览还小时的降级版）。 */
  _mkMarker: function(loc, i, mode) {
    var isSpecial = loc.isBirth || loc.isDeath;
    var labelBg = '#b5713a';
    var markerWidth = 28;
    var markerHeight = 36;
    if (loc.isBirth) {
      labelBg = '#4a5d39';
      markerWidth = 34;
      markerHeight = 44;
    } else if (loc.isDeath) {
      labelBg = '#7c2d1e';
      markerWidth = 34;
      markerHeight = 44;
    } else if (loc.siteType === 'origin') {
      // 籍贯点刻意用墨灰而非金色：金色是「真的到过」的足迹点，
      // 同色会让人把祖籍读成行迹。
      labelBg = '#544f45';
    } else if (loc.precision === 'coarse') {
      // 省名/大区名定位出来的点：降到褪色金褐，与「精确到县」的金色区分开
      labelBg = '#75695a';
    }

    var marker = {
      id: i,
      latitude: loc.lat,
      longitude: loc.lng,
      title: loc.events.map(function(e) { return e.title; }).join('、'),
      width: markerWidth,
      height: markerHeight,
      zIndex: isSpecial ? 10 : 5
    };

    if (mode === 'single') {
      // 标签只留「序号 + 一个字（诞/终/籍）」：地名交给贴点卡，
      // 常驻地名标签在密集区会互相压字
      marker.label = {
        // 档案兜底站不占站号：只给语义字（籍/生/卒），不再显示「1籍」这类编号。
        // 非 synthetic 的 (i+1) 编号保持原样（含 isBirth / isDeath / origin 三支）。
        content: loc.synthetic ? (loc.siteType === 'birth' ? '生' : loc.siteType === 'death' ? '卒' : '籍')
          : loc.isBirth ? ((i + 1) + '诞')
          : loc.isDeath ? ((i + 1) + '终')
          : loc.siteType === 'origin' ? ((i + 1) + '籍')
          : String(i + 1),
        color: '#ffffff',
        fontSize: isSpecial ? 13 : 11,
        anchorX: 0,
        anchorY: isSpecial ? -22 : -18,
        bgColor: labelBg,
        borderRadius: 4,
        padding: 3
      };
      return marker;
    }

    if (mode === 'callout' || isSpecial) {
      var nm = loc.shortName || loc.locationName || '未知地点';
      // [2026-11-10 三修] callout 与卡片同口径：一站多事件时显示「1587—1641年」，
      // 不能卡片写区间、图上却只写首年。
      var yr = loc.yearLabel || '';
      marker.callout = Object.assign({}, CALLOUT_STYLE, {
        // 单行：小程序 callout 的 content 对 \n 支持不稳定，宁可一行到底
        content: (i + 1) + ' · ' + nm + (yr ? ' · ' + yr : (loc.siteLabel ? ' · ' + loc.siteLabel : ''))
      });
    }
    return marker;
  },

  /** 按模式批量构造一组 marker（全部展开用：整组替换，不做增量） */
  _mkMarkerSet: function(locs, mode) {
    var out = [];
    for (var k = 0; k < locs.length; k++) out.push(this._mkMarker(locs[k], k, mode));
    return out;
  },

  /** 当前该用哪一套 callout marker：正常全量 / 缩小后的诞终降级版 / 八修的三气泡版 */
  _calloutSet: function() {
    if (this._calloutShallow) return this._mkCalloutLite || this._mkCallout;
    if (this._calloutTriple && this._mkCalloutTriple) return this._mkCalloutTriple;
    return this._mkCallout;
  },

  /** [八修] 按缩放档 + 站点数算出该用哪一档（纯判断，不 setData）。
   *  - scale < CALLOUT_DEGRADE_SCALE：只诞/终（原有逻辑，不动）
   *  - scale ≤ CALLOUT_TRIPLE_SCALE 且 同屏站点 > 10：起点/当前/终点三气泡
   *  - 其余：全量（scale > 6 时标签本来不叠，必须全显示，这是红线）
   *  注意用 `this.data.markers.length`：调用点都在「整组已下发」之后，
   *  数量与站点数一致（全览静止态没有圆点；暂停恢复时多一个圆点也不影响 >10 判定）。 */
  _calloutTier: function(scale) {
    var shallow = scale < CALLOUT_DEGRADE_SCALE;
    var triple = !shallow && this.data.markers.length > 10 && scale <= CALLOUT_TRIPLE_SCALE;
    return { shallow: shallow, triple: triple };
  },

  /** [八修] 三气泡版的 marker 组：只给 起点站 / 当前站(playIndex) / 终点站 挂 ALWAYS，
   *  其余改 BYCLICK（点一下仍能看到内容，不能删字段 —— 删了用户会以为站点没了）。
   *  从 _mkCallout 复制，保证文案 / 样式 / 顺序与全量档逐字一致。 */
  _mkCalloutTripleSet: function() {
    var src = this._mkCallout || [];
    var seq = this.data.playSeq || [];
    var first = seq.length ? seq[0] : 0;
    var last = seq.length ? seq[seq.length - 1] : src.length - 1;
    var cur = this.data.playIndex;
    var out = [];
    for (var i = 0; i < src.length; i++) {
      var m = Object.assign({}, src[i]);
      if (m.callout) {
        var keep = (i === first || i === last || i === cur);
        m.callout = Object.assign({}, m.callout, { display: keep ? 'ALWAYS' : 'BYCLICK' });
      }
      out.push(m);
    }
    return out;
  },

  /** P1-10 让地图视野包含全部站点。
   *  旧实现用经纬度**算术平均**定中心 + 按点数硬编码 scale（≤3→6 / ≤6→5 / else→4）：
   *  玄奘、徐霞客、郑和这类横跨大范围的人物，平均点常落在无人区，固定 scale 又会裁掉
   *  两端端点。includePoints 由地图自己算包围盒，padding 给播放控制条与浮卡让位。 */
  _fitAll: function() {
    var that = this;
    var locs = this.data.locations;
    if (!locs || locs.length === 0) return;
    // [2026-11-10] 全览只在「全部展开」下使用；单卡跟随必须始终盯着当前站，
    // 否则一次 includePoints 就会把刚聚焦好的视野拉回全局（图二的问题）。
    if (this.data.viewMode !== 'all') return;
    // 页面已卸载（setData 回调可能晚于 onUnload 到达）：不要再碰 map 上下文
    if (this._unloaded) return;
    // 地图还没挂上（mapReady=false）：等 onReady 之后的补算，此时没有 map 上下文可调
    if (!this.data.mapReady) return;
    if (locs.length === 1) {
      this._view = { lat: locs[0].lat, lng: locs[0].lng, scale: 9 };
      this.setData({ mapCenter: { lat: locs[0].lat, lng: locs[0].lng }, mapScale: 9 }, function() {
        if (that.data.viewMode === 'all') that._applyCalloutLevel();
        else that.positionCard();
      });
      return;
    }
    // 同一批坐标不重复 includePoints：updateMap 与「播完回全览」会先后触发，
    // 重复调用只是把同一次视野计算排队两遍。
    var sig = locs.length + ':' + locs.map(function (l) { return l.lat + ',' + l.lng; }).join(';');
    if (this._fitSig === sig) return;

    var mapCtx = wx.createMapContext('footprintMap', this);
    if (!mapCtx || typeof mapCtx.includePoints !== 'function') return;
    // includePoints 自带动画：动画中途的 regionchange 不能拿来判定缩放档位，
    // 否则会在补间过程中先降级成诞/终两点、落定后又整组恢复，callout 闪一下。
    // 用 _fitPending 挡住这段窗口，由下面的 success 回调在视野稳定后统一判档。
    this._fitPending = true;
    setTimeout(function() { that._fitPending = false; }, 1500);
    // [重要] 必须给 fail：map 组件第一帧还没画完时调用 includePoints 会失败，
    //    不传 fail 时开发者工具内部会一直等这次通信返回，最终判定
    //    `SystemError (appServiceSDKScriptError) timeout`（日志里看不到任何业务帧）。
    //    失败只是视野没对齐，不影响 marker / 播放，静默即可。
    mapCtx.includePoints({
      // [top, right, bottom, left]：四周各留一点边，贴点卡自己会避让，
      // 不再需要旧版给「播放条 + 折叠事件面板」留的 120px 底部空档。
      padding: [60, 40, 60, 40],
      points: locs.map(function(l) { return { latitude: l.lat, longitude: l.lng }; }),
      success: function () {
        that._fitSig = sig;
        // includePoints 有动画：等视野稳定后回读真实视口（含 scale），据此判档
        setTimeout(function() {
          that._fitPending = false;
          that._syncView(function() {
            if (that.data.viewMode === 'all') that._applyCalloutLevel();
            else that.positionCard();
          });
        }, 360);
      },
      fail: function () { that._fitSig = ''; that._fitPending = false; }
    });
  },

  // ===== A 案：贴点卡定位 / 站点切换 / 全部卡列表 =====

  /** 时间轴刻度：每站一个刻度，pct 按**真实行迹序号**等分。
   *  [为什么不用年份换算] 年份来自 formatYear，可能是「万历十八年」「公元前 551 年」
   *  这类非数字串，直接算比例会 NaN / 全挤在一端；序号等分至少保证可点、可读。
   *  [2026-11-10 遗留①] seq=playSeq，档案兜底站不占刻度：卡片「第 N 站」用
   *  stationNo / traceCount（只数真实行迹），刻度与圆点必须同口径。 */
  _buildTicks: function(locs, seq) {
    var list = (seq && seq.length) ? seq : [];
    var n = list.length;
    var out = [];
    if (!n) return out;
    var mid = Math.floor((n - 1) / 2);
    for (var i = 0; i < n; i++) {
      var loc = locs[list[i]];
      var yr = (loc && loc.events[0] && loc.events[0].year) || '';
      out.push({
        uid: 't' + i,
        pct: n === 1 ? 0 : (i / (n - 1)) * 100,
        // 文字标签只给首 / 中 / 末三处，48px 条上塞 21 个会糊成一片
        label: (i === 0 || i === mid || i === n - 1) ? yr : ''
      });
    }
    return out;
  },

  /** 当前站在时间轴上的百分比位置：按它在 playSeq 中的序号换算。
   *  档案兜底站（不在序列里）退到 0 —— 它不属于行迹时间轴。 */
  _trackPct: function(idx) {
    var seq = this.data.playSeq || [];
    var n = seq.length;
    if (n <= 1 || idx < 0) return 0;
    var pos = seq.indexOf(idx);
    if (pos < 0) return 0;
    return (pos / (n - 1)) * 100;
  },

  /** 卡片标题 / 今地：改用 extractLocations 预清洗的展示字段。
   *  displayName 已去掉词典 note（「抚州（江西抚州，晏殊…）」→「抚州」），
   *  displayModern 只保留标准「今X」；两者都没有时退回 siteLabel / 大区精度提示。
   *
   *  [2026-11-10 三修] extractLocations 是**按坐标并站**的，同一地点的多条事件会挂进
   *  同一张卡：徐霞客故居（31.71,120.32）一条坐标挂了 6 条 —— 1587 生、1604 父卒、
   *  1625 母卒、1636 启程、1640 东归卧病、1641 病逝。卡头原先只取 events[0].year，
   *  卡内却列出 6 个时间点（1587→1641，跨 54 年），读起来自相矛盾。
   *  这里把三件事一次算清：
   *    cardYear      多条事件 → 「1587—1641年」区间；单条 → 原年份；全无 → ''
   *    cardYearNone  无任何年份（档案兜底站 / 无可定年），wxml 据此置灰并显示「无可定年」
   *    cardMeta      站号行整串（含「N 件大事」），不在 wxml 里拼条件文本
   *  @param {number} [traceCount] 真实行迹站数；不传则取 this.data.traceCount
   *    （selectFigure 里 this.data 还是上一位人物的，必须显式传本次算出的值） */
  _cardFields: function(loc, traceCount) {
    var name = loc.displayName || loc.shortName || '未知地点';
    var full = loc.displayModern || '';
    if (!full && loc.siteLabel) full = loc.siteLabel;
    else if (!full && loc.precision === 'coarse') full = '仅到「' + (loc.shortName || name) + '」一级';

    var evs = (loc && loc.events) || [];
    // selectFigure 的并站循环已把区间算进 loc.yearLabel；
    // 其余调用点若拿到未加工对象，就现场用同一个函数算，口径不会分叉。
    var cardYear = (loc && typeof loc.yearLabel === 'string') ? loc.yearLabel : yearLabelOf(evs);

    var meta;
    if (loc.synthetic) {
      meta = '档案所载 · ' + (loc.siteLabel || '档案位置');
    } else {
      var total = (typeof traceCount === 'number') ? traceCount : (this.data.traceCount || 0);
      // [2026-11-10 四修] 窄屏缩写，省约 60px（见 onLoad 里 _narrow 的尺寸推导）。
      // 「N 件大事」宽窄屏都保留：它是这轮修复的核心理由，不能被省略号吃掉。
      meta = this._narrow
        ? '第 ' + (loc.stationNo || 0) + '/' + total + ' 站'
        : '第 ' + (loc.stationNo || 0) + ' 站 · 共 ' + total + ' 站';
      // 一站挂多件大事必须说清楚，否则「第 1 站」里出现 6 个年份会被读成数据错
      if (evs.length > 1) meta += ' · ' + evs.length + ' 件大事';
    }

    return {
      cardName: name,
      cardFull: full,
      cardYear: cardYear,
      cardYearNone: !cardYear,
      cardMeta: meta
    };
  },

  /** 量底栏与地图区尺寸：
   *  - dockH → page-wrapper 的 padding-bottom（812≈100、667≈66，不再写死 200rpx）
   *  - _mapRect → 贴点卡换算屏幕坐标的基准 */
  _measureLayout: function() {
    var that = this;
    var q = this.createSelectorQuery();
    q.select('.map-section').boundingClientRect();
    q.select('.dock').boundingClientRect();
    q.exec(function(res) {
      if (that._unloaded) return;
      var ms = res && res[0];
      var dk = res && res[1];
      if (dk && dk.height) {
        var h = Math.round(dk.height);
        if (h !== that.data.dockH) {
          // 底部让位变了 → 地图区高度随之变化：等重排后再量一次，别用旧尺寸贴卡
          that.setData({ dockH: h }, function() {
            setTimeout(function() { that._measureLayout(); }, 30);
          });
          return;
        }
      }
      if (ms && ms.width) {
        that._mapRect = { width: ms.width, height: ms.height, left: ms.left, top: ms.top };
      }
      // 尺寸变化后：单卡模式重贴一次（卡高上限随地图高变）。
      // 全部展开不需要处理：callout 由地图自己按 marker 坐标渲染，容器尺寸变了也跟得住。
      if (that.data.viewMode !== 'all') {
        if (that.data.playIndex >= 0) that._fitCard(function() { that.positionCard(); });
        else that.positionCard();
      }
    });
  },

  /** Web Mercator 投影（与地图瓦片同一套口径）：
   *  小程序没有「marker → 屏幕像素」的 API，只能拿视口经纬度 + 地图区尺寸自己算。
   *  worldSize = 256 * 2^scale，x/y 为世界像素，两个点相减即屏幕偏移。 */
  _proj: function(lat, lng, scale) {
    var size = 256 * Math.pow(2, scale);
    var x = (Number(lng) + 180) / 360 * size;
    var s = Math.sin(Number(lat) * Math.PI / 180);
    if (s > 0.999999) s = 0.999999;
    if (s < -0.999999) s = -0.999999;
    var y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * size;
    return { x: x, y: y };
  },

  /** 回读地图当前视口（中心 + 比例尺）。regionchange 结束后调用，
   *  修正投影基准，避免用户拖动 / 缩放后卡片还按旧视野定位。 */
  _syncView: function(cb) {
    var that = this;
    if (this._unloaded || !this.data.mapReady) { if (cb) cb(); return; }
    var ctx = wx.createMapContext('footprintMap', this);
    if (!ctx || typeof ctx.getRegion !== 'function') { if (cb) cb(); return; }
    ctx.getRegion({
      success: function(res) {
        var sw = res && res.southwest;
        var ne = res && res.northeast;
        var rect = that._mapRect;
        if (!sw || !ne || !rect || !rect.width) { if (cb) cb(); return; }
        var dLng = Number(ne.longitude) - Number(sw.longitude);
        if (!(dLng > 0)) { if (cb) cb(); return; }
        var worldSize = rect.width * 360 / dLng;
        var scale = Math.log(worldSize / 256) / Math.LN2;
        if (!isFinite(scale)) { if (cb) cb(); return; }
        that._view = {
          lat: (Number(sw.latitude) + Number(ne.latitude)) / 2,
          lng: (Number(sw.longitude) + Number(ne.longitude)) / 2,
          scale: scale
        };
        if (cb) cb();
      },
      fail: function() { if (cb) cb(); }
    });
  },

  /** 贴点卡定位（核心算法）：
   *  1) 把当前站经纬度按视口投影成地图区内的像素坐标 (px, py)；
   *  2) 默认卡片贴在点上方 22px；
   *  3) 上方放不下 → 翻到下方；上下都不够 → 改贴侧方（左/右取空间大的一侧）；
   *  4) 左右 / 上下越界内收，保证卡完全在地图区内；
   *  5) 尾巴三角的 left 对准 marker 横坐标。
   *  卡片自身尺寸用 boundingClientRect 实测（内容不同高度不同），拿不到时按 64% × 150 兜底。 */
  positionCard: function() {
    if (this._unloaded) return;
    var locs = this.data.locations;
    var idx = this.data.playIndex;
    if (!locs || idx < 0 || !locs[idx]) return;
    if (this.data.listOpen) return;
    // 全部展开时同屏没有单卡（站点信息由地图 callout 承担），位置不用算
    if (this.data.viewMode === 'all') return;
    var rect = this._mapRect;
    if (!rect || !rect.width || !rect.height) return;
    var view = this._view || {
      lat: this.data.mapCenter.lat,
      lng: this.data.mapCenter.lng,
      scale: this.data.mapScale
    };
    var w = rect.width;
    var h = rect.height;
    var p = this._proj(locs[idx].lat, locs[idx].lng, view.scale);
    var c = this._proj(view.lat, view.lng, view.scale);
    var px = w / 2 + (p.x - c.x);
    var py = h / 2 + (p.y - c.y);
    // 点已经拖出视口时把锚点压在边缘，卡片仍停在最近的一侧，不要飞出去
    px = Math.max(6, Math.min(w - 6, px));
    py = Math.max(6, Math.min(h - 6, py));

    var that = this;
    this.createSelectorQuery().select('.marker-card').boundingClientRect(function(r) {
      if (that._unloaded) return;
      var cw = (r && r.width) || Math.round(w * 0.64);
      var ch = (r && r.height) || 150;
      var GAP = 22;
      var minY = 8;
      // 底部再让 40px：留出地图底部「单卡跟随 / 全部展开」胶囊，卡不能压它
      var maxY = h - 74;
      var left = 0;
      var top = 8;
      var side = 'above';
      if (py - GAP - ch >= minY) {
        // 优先贴上
        top = py - GAP - ch;
        left = px - cw / 2;
        side = 'above';
      } else if (py + GAP + ch <= maxY) {
        // 上方越界 → 翻下方
        top = py + GAP;
        left = px - cw / 2;
        side = 'below';
      } else {
        // 上下都不够（点接近屏中央且卡很高）→ 贴侧方
        side = 'side';
        if (w - px - 24 >= cw) left = px + 24;
        else if (px - 24 >= cw) left = px - 24 - cw;
        else left = px - cw / 2;
        top = py - ch / 2;
      }
      left = Math.max(8, Math.min(w - cw - 8, left));
      top = Math.max(minY, Math.min(maxY - ch, top));
      var tail = Math.round(Math.max(14, Math.min(cw - 14, px - left)));
      that.setData({
        cardPos: { left: Math.round(left), top: Math.round(top) },
        cardSide: side,
        cardTail: tail
      });
    }).exec();
  },

  /** 实测卡片各段高度，写出**像素级**卡高上限与正文滚动区高度。
   *  [为什么必须实测] 卡内头/站名高度随内容变化（今地有无、名称长短），
   *  纯 CSS 的 max-height:40% 在 .map-section 这个 flex 子项上解析不出来，
   *  scroll-view 于是拿不到确定高度——内容会铺到卡外，后一条事件压在前一条上，
   *  整卡还会压到图例（真机图一、图二）。 */
  _fitCard: function(cb) {
    var that = this;
    if (this._unloaded) return;
    var rect = this._mapRect;
    var cap = Math.max(150, Math.round(((rect && rect.height) || 380) * 0.4));
    this.createSelectorQuery()
      .select('.mc-h').boundingClientRect()
      .select('.mc-n').boundingClientRect()
      .select('.mc-ev-in').boundingClientRect()
      .exec(function(res) {
        if (that._unloaded) return;
        var headH = (res[0] && res[0].height) || 26;
        var nameH = (res[1] && res[1].height) || 30;
        var innerH = (res[2] && res[2].height) || 0;
        // 卡内上下 padding + 分隔线约 10px
        var avail = Math.max(54, cap - headH - nameH - 10);
        // 内容比上限短：正文区收到内容高度（+8 是 .mc-ev 的底部内边距），不白撑
        var want = innerH ? innerH + 8 : avail;
        var body = Math.round(Math.max(40, Math.min(want, avail)));
        that.setData({ cardMaxH: cap, cardBodyH: body }, function() {
          if (cb) cb();
        });
      });
  },

  /** 地图聚焦到某一站：center 设成该站坐标、scale 提到街区级（13），
   *  setData 的 center/scale 由地图自己做过渡动画。动画结束后回读真实视口再贴卡，
   *  避免动画中途按旧视野算出错误位置。 */
  _focusStation: function(idx, cb) {
    var locs = this.data.locations;
    var loc = locs && locs[idx];
    if (!loc) { if (cb) cb(); return; }
    this._fitSig = '';
    this._view = { lat: loc.lat, lng: loc.lng, scale: FOLLOW_SCALE };
    var that = this;
    this.setData({
      mapCenter: { lat: loc.lat, lng: loc.lng },
      mapScale: FOLLOW_SCALE
    }, function() {
      if (cb) cb();
      if (that._cardTimer) clearTimeout(that._cardTimer);
      that._cardTimer = setTimeout(function() {
        that._cardTimer = null;
        that._syncView(function() { that.positionCard(); });
      }, 420);
    });
  },

  /** 「全部展开」的缩放降级判定：**整组换 marker**，不做增量改。
   *  - 正常：每站一个原生 callout（序号 · 站名 · 年份），坐标交给地图渲染，
   *    拖动/缩放由地图自己跟着点位走，不可能脱点；
   *  - 缩到比人物全览还小（scale < CALLOUT_DEGRADE_SCALE）：几十个气泡必然糊成一片，
   *    只保留诞 / 终两个锚点的 callout 作方位参照，放大回来自动恢复全量；
   *  - [八修] scale ≤ CALLOUT_TRIPLE_SCALE 且站点 > 10：只留 起点/当前/终点 三个 ALWAYS，
   *    其余 BYCLICK（见 _calloutTier / _mkCalloutTripleSet）。
   *  只在「跨档」时才 setData：regionchange end 会连发多次，同档位不重复下发。 */
  _applyCalloutLevel: function() {
    if (this._unloaded || this.data.viewMode !== 'all') { this._calloutDirty = false; return; }
    if (!this._mkCallout || !this._mkCallout.length) { this._calloutDirty = false; return; }
    // [六修] 行走期间**直接跳过**，只记一笔待办。行走期间 markers 是「去 callout 的
    //   站点组 + 末尾一个圆点」，每 80ms 都在改圆点坐标；这里整组换组会把圆点从
    //   数组里带走（wi 失效）、还会把刚收起来的几十个气泡又放回来。
    //   用户行走途中捏合缩放时档位暂时冻结，由 _pausePlay / 播完 / 切模式时统一恢复
    //   （见 _restoreCallouts）。
    if (this._walking) { this._calloutDirty = true; return; }
    var scale = (this._view && this._view.scale) || this.data.mapScale || 0;
    var tier = this._calloutTier(scale);
    if (tier.shallow === this._calloutShallow && tier.triple === this._calloutTriple) {
      this._calloutDirty = false;
      return;
    }
    this._calloutShallow = tier.shallow;
    this._calloutTriple = tier.triple;
    this._calloutDirty = false;
    if (tier.triple) this._mkCalloutTriple = this._mkCalloutTripleSet();
    this._baseMarkers = this._calloutSet();
    this.setData({ markers: this._baseMarkers });
    // [十二修] 暂停后用户捏合缩放换档会把圆点连同整组一起换掉：
    //   按落点补回去，否则已走折线末端悬在半空、再按播放也找不到圆点。
    if (!this._walking && this._walkerPos) this._syncWalkerPos();
  },

  /** 切到「全部展开」：停播 → 整组换成挂 callout 的 marker → includePoints 全览 */
  onModeAll: function() {
    if (!this.data.locations.length) return;
    if (!this.data.unlocked) { this._promptUnlock(); return; }
    this._pausePlay();
    // [十二修·复审 G1] 必须放在 `_pausePlay()` **之后**：那一支会重新写 `_resume`，
    //   放前面会被覆盖回来 ⇒ 重复点「全部展开」再按播放会误走半路续播分支，
    //   带着全量 21 个气泡 + 全览视野起走（真机反馈 1/2 原地复发）。
    this._resume = null;
    var that = this;
    // [2026-11-11] 圆点清场：从 all 走回 all（例如播放中先切 single 再切回）时
    //   可能残留上一代的圆点 marker，不 drop 会与 _ensureWalker 新加的那个并存。
    this._walking = false;
    this._clearWalkTimer();
    this._dropWalker();
    // 目标是「全部展开」：折线清空（八修），不能按当前 viewMode 判（此刻还可能是 single）
    this._restorePolyline(true);
    this._calloutShallow = false;
    this._calloutTriple = false;
    this._baseMarkers = this._calloutSet();
    this.setData({ viewMode: 'all', markers: this._baseMarkers }, function() {
      that._fitSig = '';
      that._fitAll();
    });
  },

  /** 切回「单卡跟随」：整组换回带小序号 badge 的 marker，再回到当前站并聚焦 */
  onModeSingle: function() {
    this._resume = null;   // [十二修] 切模式：不再从半路位置续播
    var idx = this.data.playIndex >= 0 ? this.data.playIndex : 0;
    var that = this;
    // [十修] 先**真的停播**。旧实现只清 _walkTimer、不动 _playTimer / playing：
    //   「全部展开」播到两站之间会挂一个 500ms 的 _playTimer，用户这时点切单卡，
    //   那一拍醒过来时 playing 仍是 true，_walkChain 照常推进 → _ensureWalker 把圆点
    //   append 进单卡的 marker 组（单卡地图上多一个走不动的幽灵点），而所有行走回调
    //   又被 !_walking 拦死 ⇒ 链死在那一段。
    //   这里不走 _pausePlay()：它会顺手重建 all 态那套 callout，紧接着又被 _mkSingle
    //   覆盖，白闪一帧气泡。只做停播必需的几步。
    if (this._playTimer) {
      clearTimeout(this._playTimer);
      clearInterval(this._playTimer);
      this._playTimer = null;
    }
    var wasWalking = this._walking;
    // [2026-11-11] 单卡跟随没有「圆点行走」这回事：先退出行走态、打断原生动画、
    //   移走圆点、把 polyline 还原成静止态底线，再做原来的换 marker + 聚焦。
    this._walking = false;
    this._clearWalkTimer();
    if (wasWalking) this._stopMoveAlong();
    if (this.data.playing) this.setData({ playing: false });
    this._dropWalker();
    // 目标是「单卡跟随」：把整条底线补回来（八修后全览态是没有线的）
    this._restorePolyline(false);
    this._baseMarkers = this._mkSingle;
    this.setData({ viewMode: 'single', markers: this._baseMarkers }, function() {
      that._selectStation(idx);
    });
  },

  /** 统一换站入口（播放 / marker / ‹ › / 刻度尺 / 全部卡列表都走这里）：
   *  先停播 → 再切站 → 地图聚焦到该点。任何手动换站按钮都要回「播放」态。 */
  _selectStation: function(idx) {
    var locs = this.data.locations;
    if (!locs || idx < 0 || idx >= locs.length) return;
    // [2026-11-10 二次调整] 手动换站（marker / ‹ › / 刻度尺 / 卡片列表点选）
    //  **不再设越界门禁**：看任意单站的坐标与事件卡属于基础查询，必须免费可看。
    //  旧实现按 idx >= FREE_SITE_LIMIT 拦截，配合 marker 截断会导致「第 N 站」
    //  既画不出也点不到；现在点位全量可见，任意站都能手动查看。
    //  广告只解锁「连续自动回放超过前 2 站」以及全览 / 完整连线 / 全部卡列表。
    this._pausePlay();
    // [十二修·复审 G1] 清在 `_pausePlay()` 之后（那一支会重新写 `_resume`）
    this._resume = null;
    // [2026-11-11] 手动换站会切回单卡跟随：圆点行走的三样东西必须一起收掉 ——
    //   保险丝（否则到点又画一次线）、圆点 marker（它不属于单卡那套）、
    //   走过线（单卡跟随只看当前一站，留着亮线会与聚焦视野打架）。
    this._clearWalkTimer();
    this._dropWalker();
    // 手动换站一律回单卡跟随（下面 setData viewMode:'single'）：底线要补回来
    this._restorePolyline(false);
    var loc = locs[idx];
    // 全部展开下点 marker 也算「选定该站」→ 回到单卡跟随：
    // 基准必须换回**带 badge 的单卡 marker 组**，不能拿 all 那套（它没有 label）
    if (this.data.viewMode !== 'single') this._baseMarkers = this._mkSingle;
    var base = this._baseMarkers || this._mkSingle || this.data.markers;
    var markers = base.map(function(m, i) {
      if (i !== idx) return m;
      return Object.assign({}, m, { width: m.width + 8, height: m.height + 8, zIndex: 20 });
    });
    var cf = this._cardFields(loc);
    var that = this;
    this.setData({
      viewMode: 'single',
      markers: markers,
      playIndex: idx,
      cardName: cf.cardName,
      cardFull: cf.cardFull,
      cardYear: cf.cardYear,
      cardYearNone: cf.cardYearNone,
      cardMeta: cf.cardMeta,
      trackPct: this._trackPct(idx)
    }, function() {
      // 卡高上限 / 正文滚动区按新卡实测（不同站事件条数不同），再把自己聚焦过去。
      // 地图 center/scale 走 _focusStation，setData 后由地图做过渡动画。
      that._fitCard(function() {
        // 先聚焦（_view 立刻更新为新视野），再按新视野放卡；地图动画结束后
        // _focusStation 内部还会回读真实视口再校正一次。
        that._focusStation(idx, function() { that.positionCard(); });
      });
    });
  },

  /** 地图拖动 / 缩放：单卡模式手势结束后用**新视口**重算贴点卡；
   *  全部展开只做「缩放档位是否跨过降级阈值」的判定（callout 位置由地图负责，不需要重排）。
   *  [2026-11-10] 不再按 causedBy==='update' 直接 return：部分基础库对双指缩放也报 update，
   *    一过滤整段重算就被跳过，卡会停在旧坐标上。重算是幂等的，多算一次无害。
   *    end 之后除 60ms 的即时重算，再补一次 420ms 的「落定」重算 ——
   *    手势结束瞬间地图还有惯性/补间，getRegion 拿到的是中间态。 */
  onRegionChange: function(e) {
    if (!e || this._unloaded) return;
    // map 的 regionchange 在不同基础库上把 phase 放在 e.type 或 e.detail.type，两处都认
    var detail = e.detail || {};
    var phase = e.type === 'begin' || e.type === 'end' ? e.type : detail.type;
    var that = this;

    if (phase === 'begin') {
      // 手势一开始就作废上一次的延迟重算，避免旧任务在新手势中途改坐标
      if (this._regionTimer) { clearTimeout(this._regionTimer); this._regionTimer = null; }
      if (this._regionSettleTimer) { clearTimeout(this._regionSettleTimer); this._regionSettleTimer = null; }
      return;
    }
    if (phase !== 'end') return;

    // 节流：一次手势只留一个待执行任务，end 里连续触发也只 setData 一次
    if (this._regionTimer) clearTimeout(this._regionTimer);
    this._regionTimer = setTimeout(function() {
      that._regionTimer = null;
      that._reflowAfterRegion();
    }, 60);

    if (this._regionSettleTimer) clearTimeout(this._regionSettleTimer);
    this._regionSettleTimer = setTimeout(function() {
      that._regionSettleTimer = null;
      that._reflowAfterRegion();
    }, 420);
  },

  /** 回读真实视口后按模式处理：单卡重贴那一张卡；全部展开判一次缩放档位 */
  _reflowAfterRegion: function() {
    // includePoints 的补间动画期间不判档（会先降级再恢复，闪一下），
    // 由 _fitAll 的 success 回调在视野落定后统一判
    if (this._fitPending) return;
    var that = this;
    this._syncView(function() {
      if (that._unloaded) return;
      if (that.data.viewMode === 'all') that._applyCalloutLevel();
      else that.positionCard();
    });
  },

  onMarkerTap: function(e) {
    // [重要] 搜索列表 / 全部卡列表展开时忽略 marker 点击：地图同层渲染在真机存在
    //    事件穿透，用户在浮层上的点击可能被 map 抢走并触发这里。
    if (this.data.listOpen) return;
    var id = e.markerId != null ? Number(e.markerId) : (e.detail && e.detail.markerId != null ? Number(e.detail.markerId) : null);
    if (id == null || isNaN(id)) return;
    this._selectStation(id);
  },

  /** ‹ › 手动切站：在播放序列里前后移动（档案兜底站不在序列里，直接跳过） */
  _stepStation: function(dir) {
    var seq = this.data.playSeq || [];
    var n = this.data.locations.length;
    if (!n) return;
    var cur = this.data.playIndex;
    if (!seq.length) {
      this._selectStation((cur + dir + n) % n);
      return;
    }
    var pos = seq.indexOf(cur);
    if (pos < 0) {
      // 当前站在序列之外（档案兜底站）：朝该方向找最近的一个可播放站
      var next = null;
      for (var i = 0; i < seq.length; i++) {
        if (dir > 0 ? seq[i] > cur : seq[i] < cur) { next = seq[i]; break; }
      }
      if (next == null) next = dir > 0 ? seq[seq.length - 1] : seq[0];
      this._selectStation(next);
      return;
    }
    this._selectStation(seq[(pos + dir + seq.length) % seq.length]);
  },
  onPrevStation: function() { this._stepStation(-1); },
  onNextStation: function() { this._stepStation(1); },

  /** 点刻度尺直接跳站：按点击比例换算成**真实行迹序号**，再取全量下标。
   *  [2026-11-10 遗留①] 不再按全量 locations 下标换算，否则点最左会跳到籍贯兜底站，
   *  且与卡片「第 N 站」/ 刻度 / 圆点三处口径不一致。 */
  onTrackTap: function(e) {
    var seq = this.data.playSeq || [];
    var n = seq.length;
    if (n < 2) return;
    var x = e && e.detail && e.detail.x != null ? e.detail.x : null;
    if (x == null) return;
    var that = this;
    this.createSelectorQuery().select('.track').boundingClientRect(function(rect) {
      if (!rect || !rect.width) return;
      var ratio = (x - rect.left) / rect.width;
      ratio = Math.max(0, Math.min(1, ratio));
      that._selectStation(seq[Math.round(ratio * (n - 1))]);
    }).exec();
  },

  /** 打开「全部站点卡片」列表：暂停播放，滚到当前站 */
  openAllList: function() {
    if (!this.data.locations.length) return;
    if (!this.data.unlocked) { this._promptUnlock(); return; }
    this._pausePlay();
    this._resume = null;   // [十二修·复审 G1] 打开全站列表 = 主动离开当前行程
    var idx = this.data.playIndex;
    var that = this;
    this.setData({ listOpen: true, alScrollInto: '' }, function() {
      setTimeout(function() {
        if (that._unloaded) return;
        that.setData({ alScrollInto: idx >= 0 ? 'alc-' + idx : '' });
      }, 80);
    });
  },

  closeAllList: function() {
    var that = this;
    this.setData({ listOpen: false }, function() {
      setTimeout(function() {
        // 全部展开不需要重算：callout 由地图自己渲染，列表开关不影响点位
        if (that.data.viewMode !== 'all') that.positionCard();
      }, 80);
    });
  },

  /** 点「全部站点卡片」里的某一张：收起列表 → 跳站（_selectStation 内部已停播） */
  onAllCardTap: function(e) {
    var idx = Number(e.currentTarget.dataset.idx);
    if (isNaN(idx)) return;
    var that = this;
    this.setData({ listOpen: false }, function() {
      that._selectStation(idx);
    });
  },

  // ===== 足迹播放：按 playSeq（排除档案兜底站）逐站推进，5s/站 =====

  onPlayToggle: function() {
    if (this.data.playing) {
      // 暂停（不是复位）：停在当前站，贴点卡继续可读
      this._pausePlay();
      return;
    }
    var locs = this.data.locations;
    var seq = this.data.playSeq || [];
    if (!locs || locs.length === 0) return;
    // 全是档案兜底站（籍贯/生地/卒地）时没有「行迹」可播，明确告知而不是空转
    if (!seq.length) {
      wx.showToast({ title: '该人物只有档案所载地点，没有可播放的行迹', icon: 'none' });
      return;
    }

    // [2026-11-10 二次调整] 未解锁也**能正常按播放**：
    //   · 免费连续回放只放行 playSeq 的前 FREE_PLAY_LIMIT 站（用户要求「只播放2条」）；
    //   · 播完第 2 站、后面确实还有更多站时，停播并 _onPlayLimitReached 提示解锁；
    //   · ≤3 站人物 adFree → unlocked=true，走完整序列，全程无提示、无广告。
    // 手动换站（_selectStation）不受此限，任意单站始终免费可看。
    var playable = this.data.unlocked ? seq : seq.slice(0, FREE_PLAY_LIMIT);

    // [2026-11-11] 「全部展开」下播放不再切模式：一个圆点在全览地图上逐站行走。
    //   旧实现在这里把 viewMode 强制改回 single（并把 markers 整组换成单卡那套），
    //   用户看全貌时一按播放视野就被拉回街区级，全览动画根本无从谈起。
    //   现在就地交给 _startWalk：它自己保证全览、自己推进站点、自己补圆点。
    //   🔴 all 模式下仍走同一个 playable：免费额度判定代码必须保留（见上），
    //      只是 onModeAll 已要求 unlocked，playable 实际上恒为完整 seq。
    if (this.data.viewMode === 'all') {
      this._startWalk(playable);
      return;
    }

    // 从当前站续播；停在末站（或当前站在序列外）时从头播
    var pos = playable.indexOf(this.data.playIndex);
    if (pos < 0 || pos >= playable.length - 1) pos = 0;

    this.setData({ playing: true });
    this._applyPlayIndex(playable[pos]);

    var that = this;
    this._playTimer = setInterval(function() {
      // 每次 tick 重算：解锁成功后（看广告回来）立刻能续播完整序列，不必重按播放
      var fullSeq = that.data.playSeq || [];
      var now = that.data.unlocked ? fullSeq : fullSeq.slice(0, FREE_PLAY_LIMIT);
      var at = now.indexOf(that.data.playIndex);
      if (at < 0 || at >= now.length - 1) {
        // 末站 / 已播完免费额度：自动停并保留当前站卡片
        that._pausePlay();
        // 只有「未解锁 + 后面确实还有更多站」才提示看广告解锁更多地图；
        // 真的播完全部站、或 ≤3 站免广告档，都不提示。
        if (!that.data.unlocked && fullSeq.length > FREE_PLAY_LIMIT) {
          that._onPlayLimitReached();
        }
        return;
      }
      that._applyPlayIndex(now[at + 1]);
    }, PLAY_INTERVAL);
  },

  /* ===== [2026-11-11 六修·纠偏] 「全部展开」下的圆点行走 =====
   *  一段 = steps 个 setTimeout（s=1..steps，p = s/steps），每步同一个 setData
   *  里同时下发 markers[wi] 的经纬度与 polyline（见 _walkLeg）；本段视野交给
   *  includePoints（见 _fitLeg）。
   *  translateMarker 已彻底不用：原生补间在长段上中间位移只有几像素，看起来就是
   *  「嗖一下到 B」；而且它官方已停止维护、回调也不可靠。 */

  /** 启动「全部展开」播放：复位 → 落到起点 → 起自链（每段走完再排下一段）
   *
   *  [六修·纠偏 C 项] 起播时的 marker 组不再换 _mkCalloutLite，而是**基于当前
   *  _baseMarkers 做浅拷贝**：
   *    ① 数组先 slice()，然后每个 marker 再 Object.assign({}, m) 复制一份再改 ——
   *       delete m.callout 如果直接作用在共享对象上，会把 _baseMarkers 里的
   *       callout 一起删掉，暂停后就再也恢复不回来了；
   *    ② 除了「起点站 / 终点站」，其余站点的 callout 全部去掉：20 个常驻气泡
   *       压在一条细线上，圆点根本看不见（用户原话「这还乱」）；
   *    ③ 起终点保留 ALWAYS，文字用 siteLabel（出生地 / 卒地 / 籍贯这类站点标识）
   *       + 站名，不再带序号与年份 —— 这两个气泡只承担方位参照，一行越短越好；
   *    ④ 圆点 append 到末尾，wi = next.length - 1，整段行走期间不再增删 marker。
   *  为什么不用「整组换成 lite」：lite 组只有诞/终两个 callout，用户会以为
   *  中间那些站「没了」；浅拷贝这套是把 callout 临时收起来，站点 pin 一个不少。 */
  _startWalk: function(seq) {
    var that = this;
    var locs = this.data.locations || [];
    if (!seq || !seq.length || !locs.length) return;

    // [十二修·真机] 半路暂停后再按播放：从**暂停那一刻圆点所在的位置**接着走
    //   本段剩下的路，不回退到段起点 A、也不重播已经走过的部分。
    //   旧口径用 playIndex 定位续播点，而 playIndex 只在「到站」才推进 ⇒ 段中暂停
    //   永远被判成「停在 A」，用户看到的就是「暂停后原点回到 A、再播从 A 重新走」。
    //   校验项保证：换人 / 换模式 / 手动换站 / 免费额度变化后一律不认这个续播点。
    var r = this._resume;
    var fullSeq0 = this.data.playSeq || [];
    var at = seq.indexOf(this._walkTo);
    if (r && this.data.viewMode === 'all' && this._walkerPos && !this._legDone
        && r.fromIdx === this._walkTo && this.data.playIndex === r.fromIdx
        && r.seqLen === fullSeq0.length && r.seqFirst === fullSeq0[0]
        && r.seqLast === fullSeq0[fullSeq0.length - 1]
        && at >= 0 && at < seq.length - 1 && r.toIdx === seq[at + 1]
        && locs[r.toIdx]) {
      this._resume = null;
      // 上一段被刹车打断，迟到的 complete / success / 兜底一律作废
      this._legGen = (this._legGen || 0) + 1;
      var toLoc = locs[r.toIdx];
      var pos0 = { lat: this._walkerPos.lat, lng: this._walkerPos.lng };
      var fullKm = r.legKm || this._kmBetween(r.fromLat, r.fromLng, toLoc.lat, toLoc.lng) || 1;
      var leftKm = this._kmBetween(pos0.lat, pos0.lng, toLoc.lat, toLoc.lng);
      var ratio = Math.min(1, Math.max(0.08, leftKm / (fullKm || 1)));
      // 剩余时长按剩余距离同比缩放：速度与原段一致，不会突然变快 / 变慢。
      //   下限 600ms 防止「只剩几十米」时 moveAlong 一闪就到、卡片来不及读。
      var msLeft = Math.max(600, Math.round((r.totalMs || 2400) * ratio));
      // [十二修·复审 B2] 续播前同步收口，别给「被打断动画的迟到 complete」留窗口：
      //   · `_legCb=null`：**最强的一道** —— 旧段回调即便穿透时间闸/坐标闸，
      //     `_onLegAnimDone` 取到的 cb 也是 null，不会推进卡片 / 起第二条自链；
      //   · `_legStartAt=now`：旧 complete 落在 50% 时间闸内被挡；
      //   · **无条件**同步重建行走组，并与 `playing:true` **合并成一次 setData**：
      //     消除 `_walkLeg` 里 `_ensureWalker` 的异步早退窗口（旧 complete 唯一入口）、
      //     保证圆点必在组内、气泡恒 ≤4 个 ALWAYS；无条件是因为「圆点还在、但组已被
      //     换成 lite/triple」时地点名会缺（复审 O4）；合并是为了 markers 与 playing
      //     同批落地，不给渲染层留「moveAlong 早于新 marker 就位」的窗口（复审 B2-3）。
      this._legCb = null;
      this._legDone = false;
      this._legStartAt = Date.now();
      var resumeMarkers = this._walkMarkerSet(
        [seq[0], seq[seq.length - 1], r.fromIdx, r.toIdx], pos0);
      this.setData({ markers: resumeMarkers, playing: true }, function() {
        if (that._unloaded || !that.data.playing) return;
        that._walking = true;
        that._walkLeg(pos0, toLoc, function() {
          if (that._unloaded || !that._walking) return;
          that._walkTo = r.toIdx;
          that._applyPlayIndex(r.toIdx, function() {
            if (that._unloaded || !that.data.playing) return;
            that._playTimer = setTimeout(function() {
              that._playTimer = null;
              that._walkChain();
            }, 500);
          });
        }, r.fromIdx, msLeft);
      });
      return;
    }
    // 正常起播（从头 / 末站重播 / 已到站的续播）：不允许带旧续播点。
    //   🔴 清的动作必须在 _pausePlay() **之后**：那一支也会写 _resume，
    //      放在前面会被它覆盖回来，导致「从头重播」却走了半路续播分支。
    // 先清旧 timer：重复点播放 / 从单卡跟随切过来都可能带着上一轮的定时器
    this._pausePlay();
    this._clearWalkTimer();
    this._resume = null;

    // 起点：当前站在序列里就续播，停在末站 / 不在序列（档案兜底站）就从第 1 站重来。
    // 与单卡跟随同一个口径（pos >= length - 1 即重播），行为不会两套。
    var pos = seq.indexOf(this.data.playIndex);
    if (pos < 0 || pos >= seq.length - 1) pos = 0;

    var fromLoc = locs[seq[pos]];
    if (!fromLoc) return;

    // [六修] 每轮换一个新 marker id：旧圆点先按 id 段整体清掉（含暂停后残留的那个），
    //   再生成新 id 重建。id 段清理是 _dropWalker 能认全的前提。
    this._dropWalker();
    this._nextWalkerId();
    this._walkerPos = null;
    // [十修] 新一轮起播：清掉上一轮残留的「仅本段步进」标记，并让段代号 +1 ——
    //   上一轮被打断的原生回调（success / complete / fail / 看门狗）即便迟到，
    //   拿来比对的也已经是新号，一律作废，不会收掉这一轮的第一段。
    this._legStepOnly = false;
    this._legGen = (this._legGen || 0) + 1;
    // 圆点「已到达的站」单独记一份：它和 playIndex 刻意错开（卡片到站才切），
    // 找下一段只能按圆点实际所在站算。
    this._walkTo = seq[pos];

    // 起播不再先做一次 _fitAll()：它和第一段的 _fitLeg 都是 includePoints，
    // 同一次点击里连发两次只会互相打断（真机上表现为「先缩出去再缩回来」闪一下），
    // 而本段取景本来就会把视野收到 A→B。切模式时的 _fitAll 不受影响。
    // 🔴 必须作废上轮的本段取景签名：同一人物重播时第一段的 A/B 与上轮完全相同，
    //    不清掉 _legFitSig 就会把这一次取景当成重复调用直接跳过，地图停在上轮的末段视野。
    this._legFitSig = '';
    // [十五修] 跟随节流也要清零，否则上一个动作结束后 180ms 内的第一帧不跟随。
    this._camAt = 0;

    // [十二修·真机] 行走态 marker 组：所有站点保留 callout 字段，只有
    //   「当前段 A / B + 全程起点 / 终点」四个 ALWAYS，其余 BYCLICK（点一下仍有）。
    //   旧口径删光 callout 只留首尾，而首尾常常不在 A→B 取景视野里
    //   ⇒ 真机「播放时每个地点都没有显示地点」。
    var src = (this._baseMarkers && this._baseMarkers.length)
      ? this._baseMarkers
      : (this.data.markers || []);
    var alwaysList = [seq[0], seq[seq.length - 1], seq[pos], seq[pos + 1]];
    var nextMarkers = this._walkMarkerSet(alwaysList, fromLoc);
    // 🔴 _baseMarkers 全程保持原样（它就是「停播后要恢复的那一组」），这里绝不覆盖。
    this._baseMarkers = src;
    // [十四修] 折线与行走解耦：起播这一次把整趟行程**一次画完**，此后全程
    //   不再出现任何 `polyline...` 的 setData（见 _traceLine 头注释）。
    //   免费额度下只画得出来的那几段，避免把解锁后才该看的路线提前画给用户。
    // [十五修] 折线改成「逐段生长」：起播只画到第一段的终点（当前段单独一条粗线），
    //   之后每开一段由 _fitLeg 追加一次。1.3.30 一次画完整趟，20 段在屏上交叉成
    //   放射状线网，用户「现在圆点开始就不知道那到那」。
    //   免费额度不需要在这里截断：_walkChain 每段都用 slice(0, FREE_PLAY_LIMIT) 重算。
    this.setData({
      markers: nextMarkers,
      playing: true,
      polyline: this._traceLine(seq, pos + 1)
    }, function() {
      if (that._unloaded) return;
      that._walking = true;
      // 起点卡片落到视图层之后才开始走第一段
      that._applyPlayIndex(seq[pos], function() {
        if (that._unloaded || !that.data.playing) return;
        that._walkChain();
      });
    });
  },

  /** 自链：走一段 → 到站 → 停 500ms → 再走下一段。
   *
   *  为什么不用「全局 5s × 每 tick 走一段」：那是两套时钟，起播那次额外的 _walkLeg
   *  和第一个 tick 会指向同一段，节奏要么撞车要么空等。自链只有一条时钟 ——
   *  「一段 + 停站」串起来，按下播放立刻就有动作。
   *
   *  [六修·纠偏] 停站固定 500ms，不再用 PLAY_INTERVAL - ms：段长本身已经按距离
   *  自适应到 2.4~5s，再拿 5s 去减就成了「走得越远停得越短」，长腿几乎不停、
   *  用户读不到卡片。现在一段 = ms + 500 ≈ 2.9s ~ 5.5s。
   *
   *  _playTimer 这个变量名沿用，只是内容从 interval 换成了 timeout，
   *  四处清理点（onUnload / _disposePlay / _pausePlay / _startWalk）都不用改。 */
  _walkChain: function() {
    if (this._unloaded || !this.data.playing) return;
    // 🔴 每次现算：解锁成功后（看广告回来）立刻能续播完整序列，免费额度也必须每段重算
    var fullSeq = this.data.playSeq || [];
    var now = this.data.unlocked ? fullSeq : fullSeq.slice(0, FREE_PLAY_LIMIT);
    // 🔴 用 _walkTo（圆点已到达的站）定位下一段，**不是** playIndex：
    //   这两者在本链路里刻意错开，用 playIndex 会让卡片/刻度跑到圆点前面。
    var at = now.indexOf(this._walkTo);
    if (at < 0 || at >= now.length - 1) {
      // 末站 / 已播完免费额度：自动停并保留当前站卡片与已走线（不清空）
      this._pausePlay();
      // [十二修] 播完不能再留「半路续播点」，否则下次按播放会误判成段中暂停。
      this._resume = null;
      // 只有「未解锁 + 后面确实还有更多站」才提示解锁更多地图（红线，条件不许改）
      if (!this.data.unlocked && fullSeq.length > FREE_PLAY_LIMIT) {
        this._onPlayLimitReached();
      }
      return;
    }
    var fromIdx = this._walkTo;
    var toIdx = now[at + 1];
    // [十二修] 记住本段终点下标：半路暂停要靠它算「还剩多少路」。
    this._legToIdx = toIdx;
    var locs = this.data.locations || [];
    var fromLoc = locs[fromIdx];
    var toLoc = locs[toIdx];
    if (!fromLoc || !toLoc) {
      this._pausePlay();
      // [十二修·复审] 这条兜底也会走 _pausePlay，不能留下指向无效站的续播点
      this._resume = null;
      return;
    }

    var that = this;
    this._walkLeg(fromLoc, toLoc, function() {
      if (that._unloaded || !that._walking) return;
      that._walkTo = toIdx;        // 到站：圆点位置推进（只此一处更新）
      // [十二修] 到站（原生动画已收口）才换一次 marker 组，把 ALWAYS 挪到新的 A/B。
      //   🔴 行走段内绝不换组：那会带走 moveAlong 绑定的圆点，渲染层当场退回 A。
      var na = now.indexOf(toIdx);
      var nb = now[na + 1];
      that.setData({ markers: that._walkMarkerSet(
        [now[0], now[now.length - 1], toIdx, nb], toLoc) });
      // 到站那一步已经把圆点钉在 toLoc 真实坐标上、折线也收到了这一站
      // （见 _walkLeg 的 s>=steps 分支），这里不再补发 _paintWalked ——
      // 每段的 setData 次数因此严格等于 round(ms/80)。
      // 卡片 / 刻度 / playIndex 在**到站之后**才推 —— 提前推会变成
      // 「线还没走到、卡片已经写下一站」。
      that._applyPlayIndex(toIdx, function() {
        if (that._unloaded || !that.data.playing) return;
        // [六修·纠偏] 停站固定 500ms：一段 = ms + 500 ≈ 2.9s ~ 5.5s。
        //   不再用 PLAY_INTERVAL - ms —— 那套是「每站总节拍 5s」的旧口径，
        //   会把长腿压缩到只剩 0ms 停站；而 ms 已经按距离自适应（2.4~5s），
        //   再拿 5s 去减就成了「走得越远、停得越短」，与「看看这一站」冲突。
        //   🔴 PLAY_INTERVAL 不能删：单卡跟随那条 interval 还在用它（见 onPlayToggle）。
        that._playTimer = setTimeout(function() {
          that._playTimer = null;
          that._walkChain();
        }, 500);
      });
    }, fromIdx);
  },

  /** [六修] 生成本轮的圆点 id：9001..9099 / 9000 循环。
   *  换 id 的作用：让「按 markerId 的旧渲染状态 / 旧残点」彻底作废，
   *  也让 _dropWalker 能按 id 段把历史残留一次清干净（暂停后换轮、换人物）。
   *  _walkGen 同时充当「本轮代号」，暂停后立刻重播时用它认领是哪一轮。 */
  _nextWalkerId: function() {
    this._walkGen = (this._walkGen || 0) + 1;
    this._walkerId = WALKER_ID_BASE + (this._walkGen % WALKER_ID_SPAN);
    this._walkerIdx = null;
    return this._walkerId;
  },

  /** 判断某个 marker id 是否属于「圆点段」：用它清理，暂停后换了代也能清干净 */
  _isWalkerId: function(id) {
    return typeof id === 'number' && id >= WALKER_ID_BASE && id < WALKER_ID_BASE + WALKER_ID_SPAN;
  },

  /** [十二修·真机] 构造「行走态」marker 组。
   *  六修口径是「删光所有 callout，只给全程首尾两站留 ALWAYS」，真机两个问题：
   *    ① 播放时一个地点名都看不到 —— 首尾两站常常根本不在 A→B 的取景视野里；
   *    ② 暂停后 _restoreCallouts 整组恢复全量，21 个 ALWAYS 气泡压成一团。
   *  现在只给「当前段 A / B + 全程起点 / 终点」最多 4 个站点挂 ALWAYS 短标签
   *  （站名 + siteLabel，不带序号年份），其余站点直接删 callout 字段。
   *
   *  🔴 整组只允许在「起播」和「到站」两个时刻重建（那时原生动画已停）。
   *     行走段内换组会把 moveAlong 绑定的圆点从数组里带走，渲染层圆点当场
   *     退回逻辑层旧坐标 A —— 这正是真机「暂停后原点自动回到 A」的根因之一。
   *  @param {Array<number>} alwaysList 要常驻显示地点名的 locs 下标
   *  @param {object} walkerLoc 圆点此刻应处的坐标（起播传 A 站、到站传 B 站）
   */
  _walkMarkerSet: function(alwaysList, walkerLoc) {
    var src = (this._baseMarkers && this._baseMarkers.length)
      ? this._baseMarkers
      : (this.data.markers || []);
    var locs = this.data.locations || [];
    var keep = {};
    for (var k = 0; k < (alwaysList || []).length; k++) {
      var ai = alwaysList[k];
      if (ai != null && ai >= 0) keep[ai] = true;
    }
    // [十三修·真机] 上一版只给「全程起终点 + 当前段 A/B」四个下标挂 ALWAYS，
    //   真机反馈「播放和暂停都不显示地名」—— 四个里通常只有一两个落在当前视野内，
    //   用户看到的就是「几乎没有地名」。
    //   现在按**距离**补齐：以本段 A→B 的中点为心，取最近的 NEAR_LABEL_MAX 个站点。
    //   播放时 _fitLeg 把视野收到 A→B，视野内站点基本都落在这个集合里 ⇒
    //   「每个地点都显示地名」成立；视野外的站点即使挂 ALWAYS 也不占屏，不会
    //   重现「一堆气泡压成一团」。不用 getScale/getRegion 是因为它们异步、
    //   且渲染层回读有延迟，判据拿不到即时值。
    var NEAR_LABEL_MAX = 12;
    var fi = (alwaysList && alwaysList.length >= 4) ? alwaysList[alwaysList.length - 2] : null;
    var ti = (alwaysList && alwaysList.length >= 4) ? alwaysList[alwaysList.length - 1] : null;
    var fl = (fi != null && locs[fi]) ? locs[fi] : null;
    var tl = (ti != null && locs[ti]) ? locs[ti] : null;
    var midLa = fl ? Number(fl.lat) : NaN;
    var midLn = fl ? Number(fl.lng) : NaN;
    if (tl && isFinite(midLa) && isFinite(midLn)) {
      midLa = (midLa + Number(tl.lat)) / 2;
      midLn = (midLn + Number(tl.lng)) / 2;
    }
    if (isFinite(midLa) && isFinite(midLn)) {
      var cand = [];
      for (var c = 0; c < locs.length; c++) {
        var lc = locs[c] || {};
        var cla = Number(lc.lat);
        var cln = Number(lc.lng);
        if (!isFinite(cla) || !isFinite(cln)) continue;
        var dLa = cla - midLa;
        // 经度按纬度收一下，否则中纬度地区的东西向距离被高估约 1.4 倍
        var dLn = (cln - midLn) * Math.cos(midLa * Math.PI / 180);
        cand.push({ i: c, d: dLa * dLa + dLn * dLn });
      }
      cand.sort(function(a, b) { return a.d - b.d; });
      for (var q = 0; q < cand.length && q < NEAR_LABEL_MAX; q++) keep[cand[q].i] = true;
    }
    var next = [];
    for (var i = 0; i < src.length; i++) {
      var m0 = src[i];
      if (!m0) { next.push(m0); continue; }
      if (this._isWalkerId(m0.id)) continue;      // 上一代的圆点不混进来
      var m = Object.assign({}, m0);
      if (keep[i]) {
        var lo = locs[i] || {};
        var nm = lo.shortName || lo.locationName || '未知地点';
        m.callout = Object.assign({}, m0.callout || CALLOUT_STYLE, {
          // [十三修] 只留纯地名：一屏要同时挂到 10 来个气泡，再带「· 途经」这类
          //   后缀会把每个气泡撑宽 40%，密集区立刻连成一片。年份 / 事件由点开的
          //   卡片与年表刻度承担，气泡只负责「这是哪儿」。
          content: nm,
          display: 'ALWAYS'
        });
      } else {
        // 🔴 直接删字段，而不是依赖 display:'BYCLICK' 生效：
        //   六修已验证「删字段」在真机上确定不渲染；BYCLICK 万一被旧基础库忽略，
        //   21 个气泡会一次性全冒出来，又回到用户截图里压成一团的状态。
        delete m.callout;
      }
      next.push(m);
    }
    var walker = this._walkerMarker(walkerLoc);
    if (walker) {
      next.push(walker);
      this._walkerIdx = next.length - 1;
    } else {
      this._walkerIdx = null;
    }
    return next;
  },

  /** [六修] 构造圆点 marker 对象（不 setData，由调用方决定跟谁一起下发）。 */
  _walkerMarker: function(loc) {
    var wid = this._walkerId;
    if (wid == null) { this._nextWalkerId(); wid = this._walkerId; }
    if (!loc) loc = (this.data.locations || [])[this.data.playIndex];
    if (!loc) return null;
    var la = Number(loc.lat);
    var ln = Number(loc.lng);
    if (!isFinite(la) || !isFinite(ln)) return null;
    return {
      id: wid,
      latitude: la,
      longitude: ln,
      iconPath: WALKER_ICON,
      // [十五修] 20 → 22：站点 pin（高约 30px、zIndex 5/10）在缩到城区级时会盖住 20px 的
      //   圆点，真机视频里「圆点淹没在 pin 里，看不出在走」。加大两像素 + 抬高层级即可。
      width: 22,
      height: 22,
      // 🔴 必须带 anchor 居中：marker 默认按**左上角**对齐坐标，
      //    20×20 的圆点会整体偏到坐标右下方约 10px，真机上看着「没走在线上」。
      anchor: { x: 0.5, y: 0.5 },
      zIndex: 60
    };
  },

  /** 圆点在 markers 里的下标（每步改坐标要用它拼路径）。
   *  缓存在 _walkerIdx，但每次都校验 id —— 整组换过组（callout 换档）就重扫。 */
  _walkerIndex: function() {
    var markers = this.data.markers || [];
    var wid = this._walkerId;
    if (this._walkerIdx != null) {
      var m = markers[this._walkerIdx];
      if (m && m.id === wid) return this._walkerIdx;
    }
    for (var i = 0; i < markers.length; i++) {
      if (markers[i] && markers[i].id === wid) { this._walkerIdx = i; return i; }
    }
    this._walkerIdx = null;
    return -1;
  },

  /** 把圆点追加进 markers（本次 id 已存在则直接回调，不重复 append）。
   *  六修后主要用于 _syncWalkerPos（暂停后整组换回全量 callout 时把圆点补回去）。
   *  @param {object} [loc] 起点站点；不给则用当前站
   *  @param {function} [cb] setData 完成（或无需 setData）后回调 */
  _ensureWalker: function(loc, cb) {
    if (typeof loc === 'function') { cb = loc; loc = null; }
    if (this._walkerIndex() >= 0) { if (cb) cb(); return; }
    var walker = this._walkerMarker(loc);
    if (!walker) { if (cb) cb(); return; }
    if (this._unloaded) return;
    var markers = this.data.markers || [];
    this._walkerIdx = markers.length;
    this.setData({ markers: markers.concat([walker]) }, function() {
      if (cb) cb();
    });
  },

  /** 移走圆点：按 **id 段**过滤，不认单一 id —— 换代会留下旧 id 的残点。
   *  没有残点则一次 setData 都不发。 */
  _dropWalker: function() {
    var that = this;
    var markers = this.data.markers || [];
    this._walkerIdx = null;
    var hit = false;
    for (var i = 0; i < markers.length; i++) {
      if (markers[i] && this._isWalkerId(markers[i].id)) { hit = true; break; }
    }
    if (!hit || this._unloaded) return;
    this.setData({
      markers: markers.filter(function(m) { return !(m && that._isWalkerId(m.id)); })
    });
  },

  /** 两点粗算距离（km）：纬度 1° ≈ 111km，经度按 cos(lat) 收缩。
   *  只用来看量级（定段时长 / 定缩放档），不需要精确。 */
  _kmBetween: function(la1, ln1, la2, ln2) {
    var dLat = (la2 - la1) * 111;
    var dLng = (ln2 - ln1) * 111 * Math.cos((la1 + la2) / 2 * Math.PI / 180);
    return Math.sqrt(dLat * dLat + dLng * dLng);
  },

  /** [六修·纠偏] 一段行程的时长：ms = 1800 + dKm × 12，夹在 [2400, 5000]。
   *  🔴 帧数（而不是段长本身）决定观感：ms 的下限抬到 2.4s、上限抬到 5s，
   *  配合 WALK_STEP_MS=80，一段就是 30~63 步。别再把下限调回去 ——
   *  1.2s 的段只有 15 步，真机上就是「跳过去」。 */
  _walkLegMs: function(fromLoc, toLoc) {
    var la1 = Number(fromLoc && fromLoc.lat);
    var ln1 = Number(fromLoc && fromLoc.lng);
    var la2 = Number(toLoc && toLoc.lat);
    var ln2 = Number(toLoc && toLoc.lng);
    if (!isFinite(la1) || !isFinite(ln1) || !isFinite(la2) || !isFinite(ln2)) return WALK_LEG_MS;
    var dKm = this._kmBetween(la1, ln1, la2, ln2);
    var ms = Math.round(1800 + dKm * 12);
    if (ms > WALK_LEG_MAX) ms = WALK_LEG_MAX;
    if (ms < WALK_LEG_MIN) ms = WALK_LEG_MIN;
    return ms;
  },

  /** [十四修·视野自算] 本段取景：自己算 center + scale，不再用 includePoints。
   *
   *  旧实现（六修~十三修）把 A、B 两点丢给 includePoints 让它算包围盒，问题有三：
   *  ① 只含两点 ⇒ A→B 极短时 scale 被顶到 16~18，整屏只剩本段两端，
   *     其余站点与地名全部出屏（用户「有点在地图边边看不到地名」）；
   *  ② 只含两点 ⇒ 跨省长段又缩到 scale 6，站点挤成一点分不清；
   *  ③ includePoints 自带动画 + 段段重算 ⇒ 段与段之间大幅跳变，观感是「不跟手」。
   *
   *  现口径：包围盒取「A、B + 段中点最近的 VIEW_NEAR_PICK 个站」，用 Web Mercator
   *  反算容纳该包围盒所需的 scale，再钳进 [VIEW_SCALE_MIN, VIEW_SCALE_MAX]。
   *  短段至少看得见三五个邻居站、长段不会缩成一粒沙，落差从 16↔6 压到 11.6↔7.2。
   *
   *  为什么可以直接写 mapCenter/mapScale（旧注释说会和 markers 抢帧）：
   *  调用点已经从「每步」收回到「每段开头一次」，一次行程只发生 20 次，
   *  且都发生在到站停站窗口里，不与行走中的动画抢同一帧。
   *
   *  @param {number} la1 @param {number} ln1 起点
   *  @param {number} la2 @param {number} ln2 终点 */
  _fitLeg: function(la1, ln1, la2, ln2, upto) {
    if (this._unloaded) return;
    if (this.data.viewMode !== 'all') return;
    // 地图还没挂上时没有 map 上下文可调（onReady 之前）
    if (!this.data.mapReady) return;
    // 同一段不重复取景：_walkLeg 在「圆点丢失 → 补点 → 重入」时会二次调用。
    var sig = la1 + ',' + ln1 + '>' + la2 + ',' + ln2 + '#' + (upto == null ? '-' : upto);
    if (this._legFitSig === sig) return;
    this._legFitSig = sig;

    var v = this._legView(la1, ln1, la2, ln2);
    this._view = { lat: v.lat, lng: v.lng, scale: v.scale };
    var patch = { mapCenter: { lat: v.lat, lng: v.lng }, mapScale: v.scale };
    // [十五修] 折线与视野同批下发：一段只在这一个时刻改折线（段边界），
    //   段内 onWalkTick 一个 polyline 键都不发 ⇒ 段内不可能闪。
    if (upto != null) patch.polyline = this._traceLine(this.data.playSeq || [], upto);
    // 渲染层不会出现「先缩到新视野、点还停在上一段」的中间帧。
    this.setData(patch);
  },

  /** 屏幕可视区尺寸（px）。地图占页面绝大部分，但上下有顶栏与播放条，
   *  所以算 scale 时按 62% 折算高度，把「留白」一次性折进系数里。 */
  _viewportPx: function() {
    // [十五修] 缓存：_camFollow 每收到一帧 tick 都会调本函数（20Hz），
    //   每次都走 wx.getWindowInfo() 是纯浪费——窗口尺寸在一次会话里不会变。
    if (this._vpCache) return this._vpCache;
    var w = 375, h = 640;
    try {
      if (typeof wx.getWindowInfo === 'function') {
        var a = wx.getWindowInfo() || {};
        w = a.windowWidth || w;
        h = a.windowHeight || h;
      } else if (typeof wx.getSystemInfoSync === 'function') {
        var b = wx.getSystemInfoSync() || {};
        w = b.windowWidth || w;
        h = b.windowHeight || h;
      }
    } catch (e) { /* 取不到就用默认 375×640，只影响缩放精度，不影响功能 */ }
    this._vpCache = { w: w, h: h };
    return this._vpCache;
  },

  /** [十五修·跟随] 段内让地图跟着圆点平移：**只写 mapCenter**，不碰 markers / polyline。
   *
   *  为什么这次可以碰视野（1.3.27 的注释说「会和步进抢帧」）：
   *  抢帧的病根是「同一帧里既写 markers 坐标、又换视野」——那是步进引擎每 80ms 一次
   *  干的事。现在圆点交给原生 moveAlong（逻辑层一次坐标都不写），这里只移动地图图层，
   *  两者是不同属性，不会互相打断。
   *
   *  为什么必须节流 + 边缘触发：逐帧跟就是每帧 setData，会重新变成「一顿一顿」；
   *  完全不跟则是用户本轮反馈的「地图一声不响」。折中成「圆点偏出视口中部才挪」，
   *  一段 2.4~5s 通常只挪 3~8 次，观感是地图在跟着走。
   *
   *  @return {Object|null} 要合并进当前 setData 的补丁；不需要动时返回 null */
  _camFollow: function(lat, lng) {
    if (this._unloaded || !this._walking) return null;
    if (this.data.viewMode !== 'all') return null;
    var now = Date.now();
    if (this._camAt && now - this._camAt < CAM_FOLLOW_MS) return null;
    var c = this.data.mapCenter;
    var sc = Number(this.data.mapScale);
    if (!c || !isFinite(c.lat) || !isFinite(c.lng) || !isFinite(sc) || sc <= 0) return null;
    // Web Mercator：该纬度上每像素代表多少米（水平/垂直同尺度）
    var mpp = 156543.03392 * Math.cos(c.lat * Math.PI / 180) / Math.pow(2, sc);
    if (!isFinite(mpp) || mpp <= 0) return null;
    var sz = this._viewportPx();
    var dxPx = (lng - c.lng) * 111320 * Math.cos(c.lat * Math.PI / 180) / mpp;
    // 屏幕 y 向下 = 纬度减小，所以用 center 减圆点
    var dyPx = (c.lat - lat) * 111320 / mpp;
    if (Math.abs(dxPx) < sz.w * CAM_EDGE_X && Math.abs(dyPx) < sz.h * CAM_EDGE_Y) return null;
    this._camAt = now;
    // 目标锚点：圆点落在视口 (50%, CAM_ANCHOR_Y)。纬度偏下 6% 是为了给上方 callout 留白。
    var newLat = lat + (CAM_ANCHOR_Y - 0.5) * sz.h * mpp / 111320;
    return { mapCenter: { lat: newLat, lng: lng } };
  },

  /** [十四修·视野自算] 算本段的 center 与 scale（纯计算，不 setData）。
   *
   *  scale 反算：Web Mercator 下 scale（≈zoom）为 z 时每像素代表
   *  `156543.03392 * cos(lat) / 2^z` 米。要让包围盒在视口内留 38% 边距落进来，
   *  取「纬度方向所需 mpp」与「经度方向所需 mpp」的**较大值**（更远的那个决定 scale），
   *  再反解 z = log2(156543.03392 * cos(lat) / mpp)。
   *
   *  center 的纬度额外北移 `bbox 纬度跨度 * 6%`：callout 是朝上渲染的，
   *  中心若严格落在 bbox 正中，最北那站的文字气泡会被顶栏切掉（用户「边边看不到地名」）。
   *  北移中心 = 内容整体下移，等价于给顶部多留 6% 的空白。
   *
   *  @return {{lat:number, lng:number, scale:number}} */
  _legView: function(la1, ln1, la2, ln2) {
    var locs = this.data.locations || [];
    var midLat = (la1 + la2) / 2;
    var midLng = (ln1 + ln2) / 2;

    // 候选邻居：以段中点为心取最近 VIEW_NEAR_PICK 个（12 度窗先粗筛，避免全表算距离）
    // 🔴 必须再卡一道距离上限：只按「最近 N 个」会让密集区被一个 200km 外的邻居撑爆
    //    包围盒、视野反而缩回省域级（用户要的「密集区稍微放大」就落空了）。
    //    [十五修] 上限从「段长 2.5 倍 / 25km 取大」收紧到「段长 1.2 倍 / 3km 取大」：
    //    旧口径下短段（几公里）也会把 25km 内的站全收进来，包围盒被撑到 50km，
    //    结果 20 段的 scale 全挤在 7.1~7.5 —— 等于「不管哪一段都是同一个缩放」，
    //    用户「密集的地点要稍微放大」完全落空。收紧后短段 scale 可到 11 上下。
    var legKm = this._kmBetween(la1, ln1, la2, ln2);
    var nearLimitKm = Math.max(legKm * 1.2, 3);
    var cand = [];
    for (var i = 0; i < locs.length; i++) {
      var L = locs[i];
      if (!L) continue;
      var la = Number(L.lat), ln = Number(L.lng);
      if (!isFinite(la) || !isFinite(ln)) continue;
      if (Math.abs(la - midLat) > 12 || Math.abs(ln - midLng) > 12) continue;
      var dd = this._kmBetween(la, ln, midLat, midLng);
      if (dd > nearLimitKm) continue;
      cand.push({ lat: la, lng: ln, d: dd });
    }
    cand.sort(function(x, y) { return x.d - y.d; });

    var picks = [{ lat: la1, lng: ln1 }, { lat: la2, lng: ln2 }];
    for (var k = 0; k < cand.length && picks.length < 2 + VIEW_NEAR_PICK; k++) {
      var c = cand[k];
      var dup = false;
      for (var q = 0; q < picks.length; q++) {
        if (Math.abs(picks[q].lat - c.lat) < 1e-9 && Math.abs(picks[q].lng - c.lng) < 1e-9) {
          dup = true;
          break;
        }
      }
      if (!dup) picks.push({ lat: c.lat, lng: c.lng });
    }

    var minLat = picks[0].lat, maxLat = picks[0].lat;
    var minLng = picks[0].lng, maxLng = picks[0].lng;
    for (var j = 1; j < picks.length; j++) {
      if (picks[j].lat < minLat) minLat = picks[j].lat;
      if (picks[j].lat > maxLat) maxLat = picks[j].lat;
      if (picks[j].lng < minLng) minLng = picks[j].lng;
      if (picks[j].lng > maxLng) maxLng = picks[j].lng;
    }
    var cLat = (minLat + maxLat) / 2;
    var cLng = (minLng + maxLng) / 2;

    var dLatM = (maxLat - minLat) * 111320;
    var dLngM = (maxLng - minLng) * 111320 * Math.cos(cLat * Math.PI / 180);
    var sz = this._viewportPx();
    // 0.62：包围盒只占视口 62%，剩下 38% 留给气泡、顶栏与播放条
    var mppLat = dLatM / (sz.h * 0.62);
    var mppLng = dLngM / (sz.w * 0.62);
    var mpp = Math.max(isFinite(mppLat) ? mppLat : 0, isFinite(mppLng) ? mppLng : 0);
    // 所有点重合（单站 / 起终点同城）：给一个城市级常量，别让 log 算出 ±Infinity
    if (!(mpp > 0)) mpp = 1200;

    var s = Math.log(156543.03392 * Math.cos(cLat * Math.PI / 180) / mpp) / Math.LN2;
    if (!isFinite(s)) s = 9;
    if (s < VIEW_SCALE_MIN) s = VIEW_SCALE_MIN;
    if (s > VIEW_SCALE_MAX) s = VIEW_SCALE_MAX;

    // 顶部留白：中心北移 6% 的纬度跨度（跨度为 0 时至少挪 0.01°，避免完全不动）
    var spanLat = maxLat - minLat;
    var shift = spanLat > 0 ? spanLat * 0.06 : 0.01;

    return {
      lat: cLat + shift,
      lng: cLng,
      scale: Math.round(s * 10) / 10
    };
  },

  /** [六修·纠偏] 走一段：**自己分步推进**，一段切 steps = round(ms / 80) 步，
   *  第 s 步在 s × (ms/steps) 毫秒后触发，位移比例严格取 p = s / steps
   *  —— 等距、非零、单调，这是「一步一步走过去」的全部来源。
   *
   *  为什么用**一串 setTimeout** 而不是 setInterval：
   *  ① interval 的每拍间隔是「整 80ms」，而 ms 常常除不尽（如 5000/80=62.5），
   *     用 interval 就得把段长改成 80 的整数倍，p 的落点也不再是 s/steps；
   *  ② 这里一次性排好 steps 个定时器，每个定时器**自带自己的 p**，不依赖
   *     Date.now() 采样，因此不会因为主线程抖动出现「两拍重合 / 某一拍丢帧」
   *     导致的位置跳变；暂停时一次性 clearTimeout 全部即可。
   *  ③ interval 在页面切后台后会被合并派发（多拍挤在一起），timeout 逐个排的
   *     序列受影响更小。
   *
   *  🔴 每一步的圆点坐标与折线必须在**同一个 setData** 里下发：
   *    这两者是同一个几何事实的两种画法，拆成两批会隔着一次渲染帧，
   *    看到的就是「线追不上点」或者「点先跳过去、线后补一截」。
   *  🔴 wi（圆点在 markers 里的下标）整段**固定不变**：行走期间不增删 marker，
   *    所以不需要每步重扫 _walkerIndex()，也就不会因为扫描时机不同而下错标。
   *
   *  @param {object} fromLoc 起点站
   *  @param {object} toLoc   终点站
   *  @param {function} [cb]  到站回调（_walkChain 负责推进卡片 / 排下一段）
   *  @param {number} [fromIdx] 起点站在 locs 里的下标（折线着色用）
   *  @param {number} [msOverride] [十二修] 半路续播时按剩余距离缩放后的段时长；
   *                 不给则按 A→B 全长重新算。
   */
  _walkLeg: function(fromLoc, toLoc, cb, fromIdx, msOverride) {
    var that = this;
    if (!fromLoc || !toLoc) { if (cb) cb(); return; }
    var la1 = Number(fromLoc.lat);
    var ln1 = Number(fromLoc.lng);
    var la2 = Number(toLoc.lat);
    var ln2 = Number(toLoc.lng);
    // 坐标非法时宁可不走也不要把地图点飞（接口偶发给字符串 / null / 0,0）
    if (!isFinite(la1) || !isFinite(ln1) || !isFinite(la2) || !isFinite(ln2)) { if (cb) cb(); return; }
    if (Math.abs(la2) > 90 || Math.abs(ln2) > 180) { if (cb) cb(); return; }
    if (la2 === 0 && ln2 === 0) { if (cb) cb(); return; }

    // 圆点不在组里（极端情况：整组被换过）——补一个再进，避免整段「无点行走」。
    // 正常路径下 _startWalk 已经把它 append 好，wi 在整段里恒定。
    var wi = this._walkerIndex();
    if (wi < 0) {
      this._ensureWalker(fromLoc, function() {
        if (that._unloaded || !that._walking) return;
        that._walkLeg(fromLoc, toLoc, cb, fromIdx, msOverride);
      });
      return;
    }

    var ms = msOverride > 0 ? msOverride : this._walkLegMs(fromLoc, toLoc);
    // [十二修] 本段几何长度：半路暂停时用它把剩余距离换算成剩余时长。
    this._legKm = this._kmBetween(la1, ln1, la2, ln2);
    // 🔴 帧数：round(ms/80)，最少 1 步。5000ms → 63 步；2400ms → 30 步。
    var steps = Math.max(1, Math.round(ms / WALK_STEP_MS));
    // 真实每步间隔（可能略小于 80，保证 steps × stepMs 精确等于 ms）
    var stepMs = ms / steps;

    this._legFrom = { lat: la1, lng: ln1 };
    this._legTo = { lat: la2, lng: ln2 };
    this._legMs = ms;
    this._legSteps = steps;
    this._legFromIdx = (fromIdx == null ? this.data.playIndex : fromIdx);
    this._walkerPos = { lat: la1, lng: ln1 };
    // [九修] 本段回调与「已收段」标志：moveAlong 链路的到站入口有三个
    //   （complete / success / 兜底定时器），靠 _legDone 保证只收一次。
    this._legCb = cb || null;
    this._legDone = false;
    // [十修] 开新段 ⇒ 段代号 +1。此后所有属于旧段号的回调一律作废。
    this._legGen = (this._legGen || 0) + 1;
    // 本段取景：自己算 center + scale（见 _fitLeg / _legView）
    // [十五修] upto = 本段**终点**在播放序列里的下标 ⇒ _fitLeg 顺带把折线画到这儿：
    //   已走段用浅橙细线、当前段 A→B 用主橙粗线。整趟只在每个段边界改一次折线，
    //   段内 onWalkTick 一个 polyline 键都不发（这是「不闪」的唯一保证）。
    var seqAt = (this.data.playSeq || []).indexOf(this._legFromIdx);
    this._fitLeg(la1, ln1, la2, ln2, seqAt >= 0 ? seqAt + 1 : null);

    // [九修] 引擎分派：默认把这一段交给原生 moveAlong；只有接口根本不存在时
    //   才就地降级并在**本函数内**继续跑步进（不递归，避免同一段被排两套定时器）。
    //   🔴 这里 return 之后，本段的到站由 _onLegAnimDone 收口（它会调 _legCb）。
    // [十修] _legStepOnly = 本段已被原生链路放弃（单次 fail / 拿不到回调），
    //   本段用步进走完，但**不**把引擎钉成 step —— 下一段还能再试一次 moveAlong。
    if (!this._legStepOnly && this._walkEngine !== WALK_ENGINE_STEP) {
      if (this._startMoveAlongLeg(wi, la1, ln1, la2, ln2, ms)) return;
      // 走到这里 = 本机没有 moveAlong 这个接口 ⇒ 本会话永久步进
      this._walkEngine = WALK_ENGINE_STEP;
      this._legStepOnly = false;
      console.warn('[walk] fallback to step:', 'mapCtx.moveAlong 不可用');
    }
    // 步进分支：刷新段起点时间戳，让 _onLegAnimDone 的「50% 闸门」以**本段**为基准，
    //   否则旧段的时间戳会让迟到的 complete 直接穿过去（段代号是主闸，这是副闸）。
    this._legStartAt = Date.now();

    // 起走时的圆点已经在 A 上（上一段最后一步就到这儿 / _startWalk 摆好），
    // 折线也已经在 A 收口，所以这里**不再补一次** setData —— 每段的 setData
    // 严格等于 steps 次，不多一帧。

    var done = false;
    this._clearWalkTimer();
    this._stepTimers = [];

    // 用工厂函数固化 s，避免闭包里共享同一个 s（var 无块级作用域）
    function mkStep(s) {
      return function() {
        if (done) return;
        if (that._unloaded || !that._walking) { finish(); return; }
        var p = s / steps;
        // 最后一步直接钉在站点真实坐标上：避免 la1+(la2-la1)*1 的浮点尾巴，
        // 也让「到站」这件事在数据层就是精确的（少一次补写 setData）。
        var lat = (s >= steps) ? la2 : la1 + (la2 - la1) * p;
        var lng = (s >= steps) ? ln2 : ln1 + (ln2 - ln1) * p;
        that._walkerPos = { lat: lat, lng: lng };
        // [十四修] 折线已在起播时一次画完，步进分支也只写圆点坐标。
        //   wi 整段固定，不重扫；点线同批下发的旧约束随「折线不再随行走变化」一并解除。
        var patch = {};
        patch['markers[' + wi + '].latitude'] = lat;
        patch['markers[' + wi + '].longitude'] = lng;
        // [十五修] 降级步进时也要跟随：与圆点坐标合并进**同一批** setData，
        //   避免「先挪点、再挪地图」两帧造成的点图错位。
        var cam = that._camFollow(lat, lng);
        if (cam) patch.mapCenter = cam.mapCenter;
        that.setData(patch);
        if (s >= steps) finish();
      };
    }
    for (var s = 1; s <= steps; s++) {
      this._stepTimers.push(setTimeout(mkStep(s), s * stepMs));
    }

    function finish() {
      if (done) return;
      done = true;
      // 清掉本段还没触发的（暂停时从这里走；正常到站时数组里也只剩已触发的 id，
      // clearTimeout 对已触发 id 是空操作，直接清空数组即可）
      that._clearWalkTimer();
      that._walkerPos = { lat: la2, lng: ln2 };
      // [十修·补] 步进段也要有「已收段」的幂等标记：
      //   ① 步进引擎原来**从不**置 _legDone，段尾到下一段之间的那 500ms 停站窗口里
      //      它是 false。若被打断的那条原生动画此刻才补发 complete（延迟 > 400ms+段长），
      //      _onLegAnimDone 的三道闸全过、读到的 `_legCb` 还是**本段已调用过的**那个闭包
      //      ⇒ 卡片再推进一次、自链被开两条，圆点回 A 重走一遍。
      //   ② 所以这里与原生链路对齐：到站即 _legDone=true、_legCb 清空，
      //      下一段 _walkLeg 开头会重新置 false / 重新挂。
      that._legDone = true;
      that._legCb = null;
      // [十修] 本段用步进走完了 ⇒ 解除「仅本段」标记，下一段重新尝试原生 moveAlong。
      that._legStepOnly = false;
      if (cb) cb();
    }
  },

  /** [九修] 取地图上下文。每段开头取一次即可：createMapContext 自身很轻，
   *  不缓存是为了避免「onReady 之前拿到一个不可用的对象，之后一直用那个」。 */
  _mapCtx: function() {
    try {
      return wx.createMapContext('footprintMap', this);
    } catch (e) {
      return null;
    }
  },

  /** [九修] 把本段交给原生插值。
   *  @return {boolean} true = 已接管（到站由 _onLegAnimDone 收口）；
   *                    false = 本机没有 moveAlong，调用方就地降级到步进。
   *
   *  🔴 precision 的算法（feed 官方语义：每隔多少米回调一次）：
   *     段长(米) / (段时长(秒) × 目标频率)  —— 这样**不论长短腿**，
   *     一段都稳定收到 ≈ WALK_TICK_HZ × 段时长 次回调，折线的生长速度一致。
   *     下限 20m：同城几百米的短腿如果按 1m 回调，一秒能打上百次 setData。
   *  🔴 path 必须 **longitude 在前**（官方口径）。写反了在部分机型上会把点直接
   *     甩到经纬互换后的位置，看着像瞬移到国外。 */
  _startMoveAlongLeg: function(wi, la1, ln1, la2, ln2, ms) {
    var that = this;
    var mapCtx = this._mapCtx();
    if (!mapCtx || typeof mapCtx.moveAlong !== 'function') return false;

    // [十修] 段代号：本次下发属于哪一段。所有异步回跳（看门狗 / 兜底 / success / fail）
    //   都先核它；段一换，旧回跳全部作废。这是「迟到 complete 收掉下一段」的根治。
    var gen = this._legGen;

    // 先把上一段的看门狗 / 兜底清干净再排新的：不清的话上一段那个
    //   「duration + 300」会在本段中途醒来，把本段当成已到站直接收掉。
    this._clearWalkTimer();
    this._stepTimers = [];
    this._legStartAt = Date.now();
    this._markTickSeen = false;
    this._tickLastAt = 0;

    var legMeters = this._kmBetween(la1, ln1, la2, ln2) * 1000;
    var secs = ms / 1000;
    var precision = Math.max(20, Math.round(legMeters / (secs * WALK_TICK_HZ)));

    // ① 400ms 一个 interpolatepoint 都没收到 → 该机型拿不到进度回调。
    //    🔴 必须**先刹车**再降级：原生动画可能正在跑（只是不回调），
    //    不打断的话步进每一拍写的坐标会和它打架，圆点来回抖。
    this._tickWatch = setTimeout(function() {
      that._tickWatch = null;
      if (gen !== that._legGen) return;
      if (that._unloaded || !that._walking || that._legDone) return;
      if (that._markTickSeen) return;
      that._stopMoveAlong();
      that._fallbackToStep('400ms 内没有 interpolatepoint 回调');
    }, WALK_TICK_WATCH_MS);

    // ② 到站兜底：complete 丢了也要能往下走。
    this._animBackstop = setTimeout(function() {
      that._animBackstop = null;
      if (gen !== that._legGen) return;
      that._onLegAnimDone(gen);
    }, ms + WALK_ANIM_SLACK_MS);

    // ③ 真正起动画。
    mapCtx.moveAlong({
      markerId: this._walkerId,
      path: [
        { longitude: ln1, latitude: la1 },
        { longitude: ln2, latitude: la2 }
      ],
      duration: ms,
      // 不自动转向：圆点是正圆图标，转向看不出来，白多一层渲染开销
      autoRotate: false,
      precision: precision,
      // success 在不同基础库上语义不一致（有的「接口受理」就回调、有的「动画结束」才回调），
      //   所以这里一律走 _onLegAnimDone，由它内部的「段代号 + 段长 50%」双闸过滤早到的回调。
      success: function() { that._onLegAnimDone(gen); },
      fail: function(err) {
        if (gen !== that._legGen) return;
        if (that._unloaded || !that._walking || that._legDone) return;
        that._fallbackToStep('moveAlong fail: ' + ((err && err.errMsg) || '未知'));
      }
    });
    return true;
  },

  /** [九修] 主动打断同一 markerId 上的原生动画，把点钉在当前落点。
   *  用于降级 / 暂停。官方**没有** stop 接口，只保证「同 id 再调 moveAlong 会中断
   *  上一次动画」，所以这里用「原地不动的两点路径 + duration 0」当刹车（precision:0 = 不回调）。
   *  [十修] 路径给**两个同点**而不是一个点：官方对 path「至少几个点」没有明文，
   *   单点路径在部分基础库上会走参数校验直接 fail（fail 是空函数，刹车静默失效 ⇒
   *   暂停了点还在被原生动画推向 B）。两个同点既满足「是一条路径」，位移又恒为 0。 */
  _stopMoveAlong: function() {
    var mapCtx = this._mapCtx();
    if (!mapCtx || typeof mapCtx.moveAlong !== 'function') return false;
    if (this._walkerId == null || !this._walkerPos) return false;
    var at = { longitude: this._walkerPos.lng, latitude: this._walkerPos.lat };
    mapCtx.moveAlong({
      markerId: this._walkerId,
      path: [at, { longitude: at.longitude, latitude: at.latitude }],
      duration: 0,
      autoRotate: false,
      precision: 0,
      success: function() {},
      fail: function(err) {
        // 刹车失败不致命（暂停后 _syncWalkerPos 仍会把数据层坐标写回），但要留痕，
        //   否则真机上「暂停了点还在走」会被当成玄学。
        console.warn('[walk] stop moveAlong fail:', (err && err.errMsg) || '未知');
      }
    });
    return true;
  },

  /** [九修] 本段原生插值不可用 → 换步进引擎把**当前这一段**重走一遍。
   *  🔴 既不「跳过这一段」也不「瞬移到 B」：站点数与卡片推进节奏是验收红线，
   *    跳站会连带把 _applyPlayIndex 的序列打乱（后面每一站都会错位）。
   *  🔴 重入 _walkLeg 时 _walkEngine 已经是 STEP，直接进步进分支，
   *    不会二次进 moveAlong，也不会二次 _fallbackToStep（不会递归打转）。 */
  _fallbackToStep: function(reason) {
    if (this._unloaded || !this._walking || this._legDone) return;
    // [十修] 防重入：本段已经降过一次就不再降。旧动画补发的 fail 迟到时会再进来，
    //   不拦就会把**已经用步进走到半路**的这一段又从 A 重走一遍（圆点向后弹）。
    if (this._legStepOnly) return;
    this._legStepOnly = true;
    var r = String(reason || '');
    if (r.indexOf('moveAlong fail') === 0) {
      // 单次 fail 往往是「地图还没就绪 / 瞬时异常」：只把**本段**改成步进，
      //   段末 finish() 会解除 _legStepOnly，下一段重新试一次原生。
      this._maFailCount = (this._maFailCount || 0) + 1;
      if (this._maFailCount >= WALK_MA_FAIL_MAX) this._walkEngine = WALK_ENGINE_STEP;
    } else {
      // 受理成功但一个进度回调都没有 ⇒ 该机型 precision 不生效，本会话没得救。
      this._walkEngine = WALK_ENGINE_STEP;
    }
    console.warn('[walk] fallback to step:', reason);
    // 作废本次原生段：之后迟到的 complete / success 一律被 _onLegAnimDone 丢掉
    this._legDone = true;
    this._clearWalkTimer();
    var from = this._legFrom;
    var to = this._legTo;
    var cb = this._legCb;
    var fromIdx = this._legFromIdx;
    if (!from || !to) {
      this._legCb = null;
      if (cb) cb();
      return;
    }
    // [十二修·复审 G4] 重入必须把本段时长透传回去。本轮给 _walkLeg 加了第 5 参
    //   msOverride（半路续播用剩余比例缩放后的时长，最短 600ms），这里若只传 4 参，
    //   _walkLeg 会回落到 _walkLegMs(P,B) ≥ 2400ms ⇒ 续播段一旦降级步进就突然慢
    //   2~4 倍（「只剩几十米却走 2.4 秒」）。`this._legMs` 就是本段已存的时长：
    //   正常段等于 _walkLegMs(A,B)（逐字等价，零回归），续播段等于 msLeft。
    this._walkLeg(from, to, cb, fromIdx, this._legMs);
  },

  /** [九修] 本段原生动画收尾（幂等）。
   *
   *  三个入口都会打到这里：interpolatepoint 的 animationStatus==='complete'、
   *  moveAlong 的 success、以及 duration+300 的兜底定时器。
   *  🔴 幂等是硬要求：一次到站推进两次卡片 / 排两条自链，行程就会「一站走完跳两站」。
   *
   *  🔴 这里**不写 markers 坐标**（这是与八修最大的差别）：
   *   动画期间数据层的圆点坐标一直停在起点 A —— 走路中的位置由渲染层持有，
   *   每帧写回去只会和原生动画抢同一个 marker。到站后的坐标由 _syncWalkerPos
   *   （暂停 / 停播 / 换档时）按 _walkerPos 一次性写回，不会出现「点回弹」。
   *   但**折线必须在这里补一帧收口**：precision 的最后一拍通常停在离站点几十米到
   *   一两公里的地方，不收口线尾会永远差一截（长腿上肉眼可见）。 */
  _onLegAnimDone: function(gen) {
    // 🔴 [十修] 段代号闸（第一道）：属于旧段的回跳一律丢掉。
    //   触发场景：段 N 被看门狗 / fail / 暂停打断后，原生层给被打断的动画补发一条
    //   complete 或 success —— 此时逻辑层已经在跑段 N（甚至是步进中的段 N），
    //   没有这道闸它会顺手把当前这一段收掉：圆点瞬移到 B、卡片跳站。
    if (gen != null && gen !== this._legGen) return;
    if (this._legDone) return;
    if (this._unloaded || !this._walking) {
      // 暂停 / 切档 / 卸载之后迟到的 complete：只作废，绝不推进
      this._legDone = true;
      this._clearWalkTimer();
      return;
    }
    // 🔴 防「上一段被打断时补发的 complete」：一段最快 2400ms，
    //   在段长 50% 之前到达的 complete 一律不认（本段继续跑，兜底定时器仍在）。
    if (this._legStartAt && Date.now() - this._legStartAt < this._legMs * 0.5) return;

    this._legDone = true;
    this._clearWalkTimer();
    // [十修·补] 原生这一段真的走成功了 ⇒ 清掉 fail 计数（WALK_MA_FAIL_MAX 想表达的是
    //   「这台机器持续不可用」，只增不减会让三位人物各偶发一次 fail 就永久降级）。
    this._maFailCount = 0;
    var to = this._legTo;
    if (to) this._walkerPos = { lat: to.lat, lng: to.lng };
    // [十四修] 到站不再补折线：整条行程在起播时已经一次画完，
    //   这里若再下发一次 polyline 就又回到「整条重建 ⇒ 闪一下」的老路。
    var cb = this._legCb;
    this._legCb = null;
    if (cb) cb();
  },

  /** [九修] 原生插值进度回调（`<map bindinterpolatepoint>`）。
   *
   *  e.detail = { markerId, longitude, latitude, animationStatus }
   *    · 'interpolating'：圆点已经移到 (longitude, latitude)
   *    · 'complete'     ：本段动画结束
   *
   *  🔴 只下折线，**不下圆点坐标**：理由见 _onLegAnimDone 头注释。
   *  🔴 必须认 markerId：同页只有一个圆点在走，但换代会留下旧 id 的残帧，
   *    不认 id 就会把上一轮的位置画到这一轮的线上。
   *  🔴 40ms 节流：被节流掉的那一帧**不丢位置** —— 只更新内存落点 _walkerPos，
   *    下一帧一起画，暂停时 _syncWalkerPos 也按这个落点写回。 */
  onWalkTick: function(e) {
    var d = (e && e.detail) || {};
    // [十修] markerId 类型归一：基础库在不同平台上把 id 回传成 number / string 不一
    //   （同文件 onMarkerTap 早就为此写了 Number()）。不归一的话这个严格不等恒真，
    //   每一帧都被丢掉 ⇒ 线永远不长、400ms 看门狗把整场降级，且毫无提示。
    if (this._walkerId == null || Number(d.markerId) !== this._walkerId) return;
    if (this._unloaded || !this._walking || this._legDone) return;
    // [十修] 本段已经交给步进（或被永久降级）⇒ 原生残留的 tick 一律不认：
    //   它们的坐标属于被丢弃的那条动画，认了会把线画到旧位置。
    if (this._legStepOnly || this._walkEngine === WALK_ENGINE_STEP) return;
    // 收到任何一帧都算「这条链路是通的」，400ms 看门狗据此不再降级
    this._markTickSeen = true;
    var la = Number(d.latitude);
    var ln = Number(d.longitude);
    if (d.animationStatus === 'complete') {
      // 🔴 [十修·补] complete 是**自证**的（tick 里没有段信息，传进去的段代号只能是当前值），
      //   所以段代号闸对这条通道等于不存在。同一轮里圆点 id 不变，被打断的旧动画若在
      //   **下一段已过 50%** 时才补发 complete，三道闸全过 ⇒ 提前收段、圆点瞬移到 B。
      //   唯一能拿来判真伪的是它自带的坐标：真 complete 的落点必然贴着本段终点。
      //   容差取「段长 5%」与 1km 的较大者（precision 的最后一拍本来就可能差几公里）。
      if (isFinite(la) && isFinite(ln) && this._legTo && this._legFrom) {
        var legKm = this._kmBetween(this._legFrom.lat, this._legFrom.lng, this._legTo.lat, this._legTo.lng);
        var farKm = this._kmBetween(la, ln, this._legTo.lat, this._legTo.lng);
        if (farKm > Math.max(1, legKm * 0.05)) return;
      } else if (this._legStartAt && this._legMs
        && Date.now() - this._legStartAt < this._legMs * 0.9) {
        // 有些基础库的 complete 不带经纬度：坐标校验无从下手，但也不能白放行。
        //   退一步只信「时间」——真 complete 必然在段末（≥90% 段长）才到，
        //   早于此的一律当旧段残帧丢掉，交给 success / 兜底定时器收口（最坏 +300ms）。
        return;
      }
      this._onLegAnimDone(this._legGen);
      return;
    }
    if (!isFinite(la) || !isFinite(ln)) return;
    // [十四修] 折线已在段边界由 _fitLeg 一次画好，行走期间**一个 polyline 键都不下发**。
    //   这里只把落点记进内存：暂停写回（_syncWalkerPos）、到站收口、续播换算都靠它。
    this._walkerPos = { lat: la, lng: ln };
    // [十五修] 地图跟随：只下 mapCenter（节流 + 边缘触发），不碰 markers / polyline。
    //   这正是用户「圆点移动时地图要跟着动」的落点，且不会重建折线 ⇒ 不闪。
    var cam = this._camFollow(la, ln);
    if (cam) this.setData(cam);
  },



  /** 还原静止态折线（切回单卡 / 手动换站 / 切到全览 / 换人时用）。
   *  [八修] 必须按**目标模式**分流：
   *    · 全部展开 → `[]`：那个模式只在播放时逐段长线，静止态不该有整条轨迹；
   *    · 单卡跟随 → `_basePolyline`：与 updateMap 下发的完全一致。
   *  旧实现按 `_lineLit` 提前 return，现在不成立 —— 「全览里没画过线」时
   *  `_lineLit` 是 false，但切到单卡仍然必须把底线补上。
   *  @param {boolean} [forAll] 目标是否「全部展开」；不给则按当前 viewMode */
  _restorePolyline: function(forAll) {
    if (this._unloaded) return;
    if (typeof forAll !== 'boolean') forAll = this.data.viewMode === 'all';
    this._lineLit = false;
    this.setData({ polyline: forAll ? [] : (this._basePolyline || []) });
  },

  /** 把「locs 下标」安全地转成一个折线顶点；非法/零值/重复一律返回 null。 */
  _linePoint: function(idx, prev) {
    var locs = this.data.locations || [];
    var L = locs[idx];
    if (!L) return null;
    var la = Number(L.lat), ln = Number(L.lng);
    if (!isFinite(la) || !isFinite(ln)) return null;
    if (Math.abs(la) > 90 || Math.abs(ln) > 180) return null;
    if (la === 0 && ln === 0) return null;
    // 相邻两点重合（同一站点在序列里出现两次）会让 arrowLine 算不出方向
    if (prev && Math.abs(prev.latitude - la) < 1e-9
      && Math.abs(prev.longitude - ln) < 1e-9) return null;
    return { latitude: la, longitude: ln };
  },

  /** [十五修·分段生长] 折线 = 「已走段（浅橙细）」+「当前段（主橙粗、带箭头）」。
   *
   *  三代实现的口径对比，这是被真机逐版逼出来的：
   *    1.3.27 每帧整组下发 → 7.4Hz 整条线消失一帧（用户「一闪一闪」）；
   *    1.3.29 改成 `polyline[0].points[K].latitude` 定点更新 → 仍闪，且线变细变暗、
   *           出现白断点（路径式 setData 仍会重建整条，兄弟字段丢失）；
   *    1.3.30 起播一次画完整条行程 → 不闪了，但 20 段线在屏上交叉成放射状线网，
   *           圆点淹没在线里，用户「现在圆点开始就不知道那到那」。
   *
   *  本版取中间口径：**每段只下发一次**（段边界 2.9~5.5s 才一次，折算 0.2~0.3 次/秒，
   *  肉眼只会看成「线又长了一段」），段内**一次都不碰 polyline** —— 所以段内不可能闪。
   *  当前段单独成一条更粗更亮的线，从历史线里跳出来，圆点就在这条线上面走。
   *
   *  @param {Array<number>} seq   播放序列（locs 下标）
   *  @param {number} upto         当前段的**终点**在 seq 里的下标（含）
   *  @return {Array} polyline 数组（0~2 条） */
  _traceLine: function(seq, upto) {
    var n = (seq || []).length;
    if (n < 2) return [];
    if (upto == null || !isFinite(upto)) upto = 1;
    upto = Math.round(upto);
    if (upto < 1) upto = 1;
    if (upto > n - 1) upto = n - 1;

    var out = [];
    // 已走段：seq[0] .. seq[upto-1]，最后一个点是当前段的起点 A
    var past = [];
    for (var i = 0; i <= upto - 1; i++) {
      var p = this._linePoint(seq[i], past[past.length - 1]);
      if (p) past.push(p);
    }
    if (past.length >= 2) {
      out.push({
        points: past,
        color: WALK_LINE_PAST,
        // width 4：只比当前段细 1px。细太多会让「走过的路」显得消失了，
        // 用户要的是「知道从哪到哪」，历史段必须还看得见。
        width: 4,
        dottedLine: false,
        arrowLine: false
      });
    }
    // 当前段：A → B，两点。单独一条，粗 + 亮 + 箭头 ⇒ 「现在走的是这一段」
    var a = this._linePoint(seq[upto - 1], null);
    var b = this._linePoint(seq[upto], a);
    if (a && b) {
      out.push({
        points: [a, b],
        color: WALK_LINE_DONE,
        // width 5：真机 720p 下 3~4px 在滚动/缩放中像一条发丝，5px 才稳定可辨
        width: 5,
        dottedLine: false,
        arrowLine: true,
        borderColor: 'rgba(194, 65, 12, 0.18)',
        borderWidth: 1
      });
    }
    return out;
  },

  /** 清「走一段」的步进定时器；推进（自链 timeout）由 _playTimer 管。
   *  [六修·纠偏] 一段的 N 个落点是一次性排好的一串 setTimeout（见 _walkLeg），
   *  所以这里要逐个 clearTimeout 并清空数组 —— 只清一个 id 会把剩下的几百个
   *  定时器留在内存里，暂停后又一个个醒来继续推进圆点。
   *  五条清理路径（_pausePlay / _disposePlay / selectFigure / onModeSingle / _selectStation）
   *  本来就在调它，收在这里只需补一处、且不会漏。 */
  _clearWalkTimer: function() {
    var list = this._stepTimers;
    if (list && list.length) {
      for (var i = 0; i < list.length; i++) clearTimeout(list[i]);
      this._stepTimers = [];
    }
    // [九修] 原生插值链路的两个保险丝也收在这里：
    //   ① _tickWatch    —— 400ms 收不到 interpolatepoint 就降级；
    //   ② _animBackstop —— duration+300 的到站兜底。
    //   五条清理路径（_pausePlay / _disposePlay / selectFigure / onModeSingle / _selectStation）
    //   全都经过本函数，收在这里才能保证「暂停后还会不会醒来」只有一处答案。
    if (this._tickWatch) { clearTimeout(this._tickWatch); this._tickWatch = null; }
    if (this._animBackstop) { clearTimeout(this._animBackstop); this._animBackstop = null; }
    // 兼容旧字段：万一还有别处/旧版残留一个 interval id，也一并清掉
    if (this._walkStepTimer) {
      clearInterval(this._walkStepTimer);
      this._walkStepTimer = null;
    }
  },


  _applyPlayIndex: function(idx, cb) {
    var locs = this.data.locations;
    if (!locs || idx < 0 || idx >= locs.length) return;
    var that = this;
    var loc = locs[idx];
    var cf = this._cardFields(loc);

    // [六修·纠偏] 「全部展开」分支：**只**换卡片与刻度 —— 视野与 markers 都不动。
    //   视野由 _fitLeg 在**每段开头**自算 center+scale 下发一次（[十四修] 原为 includePoints）；
    //   段内绝不动视野：那两个字段一旦在行走中 setData，会与原生 moveAlong 的
    //   渲染层动画抢同一帧（真机表现为「视野先跳、点后到」）。
    //   markers 只由 moveAlong 的原生动画驱动（步进降级时才每 80ms 写一次坐标）。
    //   进度由三处共同表达：圆点位置 + 刻度条 trackPct + 全部卡列表当前卡高亮。
    //   若沿用下面单卡那套（mapCenter + FOLLOW_SCALE + _fitCard + _syncView），
    //   每站都会把本段视野拉成街区级并重算卡片位置，正好和「一段一取景」打架。
    if (this.data.viewMode === 'all') {
      this.setData({
        playIndex: idx,
        cardName: cf.cardName,
        cardFull: cf.cardFull,
        cardYear: cf.cardYear,
        cardYearNone: cf.cardYearNone,
        cardMeta: cf.cardMeta,
        trackPct: this._trackPct(idx)
      }, function() {
        if (cb) cb();
      });
      return;
    }

    var markers = (this._baseMarkers || this.data.markers).map(function(m, i) {
      if (i === idx) {
        return Object.assign({}, m, {
          width: m.width + 8,
          height: m.height + 8,
          zIndex: 20
        });
      }
      return m;
    });
    // [2026-11-10 真机反馈] 播放时**地图跟着走并放大**：center 设到该站、scale 提到 13。
    //   A 案最初为了「看出卡片在动」故意不平移，结果卡上写「第 3 站」而地图是全览，
    //   用户根本看不出人在太湖。现在改为逐站跟焦点，卡与点永远同屏。
    this.setData({
      playIndex: idx,
      markers: markers,
      cardName: cf.cardName,
      cardFull: cf.cardFull,
      cardYear: cf.cardYear,
      cardYearNone: cf.cardYearNone,
      cardMeta: cf.cardMeta,
      trackPct: this._trackPct(idx),
      mapCenter: { lat: loc.lat, lng: loc.lng },
      mapScale: FOLLOW_SCALE
    }, function() {
      // 卡内容换完立刻按新视野贴一次（地图同时开始平移），视觉上卡和点一起走
      that._fitCard(function() { that.positionCard(); });
    });
    this._view = { lat: loc.lat, lng: loc.lng, scale: FOLLOW_SCALE };
    this._fitSig = '';
    // 地图动画结束后按真实视口再校正一次，避免动画途中算出偏移
    if (this._cardTimer) clearTimeout(this._cardTimer);
    this._cardTimer = setTimeout(function() {
      that._cardTimer = null;
      that._syncView(function() { that.positionCard(); });
    }, 460);
  },

  /** 暂停：停止推进，**保留当前站**（playIndex / 高亮 / 浮卡全部留着）。
   *  [重要] 旧实现暂停即调用 _stopPlay()，把 playIndex 复位成 -1、浮卡条件又写成
   *     `playing && playIndex >= 0` ⇒ 一按暂停卡片当场消失。而用户按暂停的动机
   *     恰恰就是「停下来看这一站写了什么」，等于把功能做成了反的。 */
  _pausePlay: function() {
    if (this._playTimer) {
      // 单卡跟随用 setInterval、全部展开用自链 setTimeout：
      //   两种都要能清（基础库的 timer id 是同一张表，两个 clear 都认）。
      clearTimeout(this._playTimer);
      clearInterval(this._playTimer);
      this._playTimer = null;
    }
    // 顺序必须先是 _walking=false 再清步进定时器：步进回调里 `!that._walking`
    //   会立刻收尾，绝不会在暂停之后又推一步。
    var wasWalking = this._walking;
    this._walking = false;
    // [十二修·复审 B1] 暂停即让段代号 +1：被 `_stopMoveAlong` 打断的原生动画常会
    //   补发 success / complete / fail，它们的闭包带着旧段号。不换号的话
    //   `_onLegAnimDone` 的 `!_walking` 分支会把 `_legDone` 置 true，而续播分支
    //   要求 `!_legDone` ⇒ 用户按播放被判成「已到站」，圆点回 A 从段首重走。
    //   换号后这三类迟到回跳全被 `_onLegAnimDone` 开头的段代号闸丢掉。
    this._legGen = (this._legGen || 0) + 1;
    this._clearWalkTimer();
    // [十五修] 折线改成「逐段生长」后，暂停会让 _restorePolyline 把它清空；
    //   续播勾回同一段时，段签名若还在，_fitLeg 会把它当重复调用直接跳过
    //   ⇒ 圆点在走、线却是空的。所以暂停必须作废签名，让续播重新画一次。
    this._legFitSig = '';
    this._camAt = 0;
    // [九修] 打断可能还在跑的原生动画：`_walking=false` 只挡住我们的回调，
    //   渲染层的 moveAlong 不认这个标志，不停就会在暂停之后继续把圆点推到 B
    //   （用户看到的是「暂停了点还在走」）。刹车 = 单点路径 + duration 0，
    //   落点取内存里的 _walkerPos（= 最后一帧收到的插值位置）。
    if (wasWalking) this._stopMoveAlong();
    if (this.data.playing) this.setData({ playing: false });
    // [十二修·真机] 暂停时**不再整组换回全量 callout**（旧实现走 _restoreCallouts）：
    //   ① _fitLeg 把视野收到 A→B 后 _view.scale 常 > 6，整组恢复会把 21 个 ALWAYS
    //      气泡一次性放回来 —— 正是用户截图「一堆地点到那个也看不清」；
    //   ② 整组换组先移除 moveAlong 绑定的圆点、再由 _ensureWalker 重挂，中间那一帧
    //      圆点退回逻辑层旧坐标 A（行走期从不写 marker 坐标）⇒「暂停后弹回 A」。
    //   现在保持行走组原样（≤4 个 ALWAYS 短标签），只把落点写回圆点这一项。
    this._calloutDirty = false;
    // 圆点落点写回数据层（步进期间本来就每步在写，这里兜 moveAlong 从不写坐标的情况）
    this._syncWalkerPos();
    // [十四修] 暂停**不再补折线**。旧实现要补是因为「线只画到圆点为止」，最后一拍
    //   的 precision 可能停在离点一公里的地方；现在整条行程起播时就画完了，
    //   线尾天然连到终点站，不存在「差一截」，也就不需要这次整条重建。
    // [十二修·真机] 记下「半路暂停」的续播点：段未收口才算半路；到站后 500ms
    //   停站窗口里的暂停不算（那时本来就该从下一站继续）。
    if (wasWalking && this.data.viewMode === 'all' && this._walkerPos
        && !this._legDone && this._legFrom && this._legTo
        && this._legFromIdx != null && this._legToIdx != null
        && this.data.playSeq && this.data.playSeq.length) {
      var seq0 = this.data.playSeq;
      this._resume = {
        fromIdx: this._legFromIdx,
        toIdx: this._legToIdx,
        fromLat: this._legFrom.lat,
        fromLng: this._legFrom.lng,
        pos: { lat: this._walkerPos.lat, lng: this._walkerPos.lng },
        totalMs: this._legMs,
        legKm: this._legKm || this._kmBetween(this._legFrom.lat, this._legFrom.lng,
                                              this._legTo.lat, this._legTo.lng),
        seqLen: seq0.length,
        seqFirst: seq0[0],
        seqLast: seq0[seq0.length - 1]
      };
    } else {
      this._resume = null;
    }
  },

  /** [六修·纠偏] 退出行走态：把 marker 组恢复成常态（按当前缩放档选全量 / 精简）。
   *  圆点不在这个组里 —— 紧接着的 _syncWalkerPos 会按落点把它补回去，
   *  否则已走折线的末端会悬在「没有圆点」的半空中。 */
  _restoreCallouts: function() {
    if (this._unloaded) return;
    if (this.data.viewMode !== 'all') return;
    if (!this._mkCallout || !this._mkCallout.length) return;
    var scale = (this._view && this._view.scale) || this.data.mapScale || 0;
    // [八修] 与 _applyCalloutLevel 同一套判档（含三气泡档），否则暂停后会把
    //   几十个 ALWAYS 气泡一次性放回来 —— 那正是用户截图里压成一团的状态。
    var tier = this._calloutTier(scale);
    this._calloutShallow = tier.shallow;
    this._calloutTriple = tier.triple;
    if (tier.triple) this._mkCalloutTriple = this._mkCalloutTripleSet();
    this._baseMarkers = this._calloutSet();
    this.setData({ markers: this._baseMarkers });
  },

  /** [修正②] 把圆点的**内存位置**写回数据层（仅用于暂停/停播后的安全窗口）。
   *  圆点已在组里 → 只改这一项的路径写法；已被整组换掉（callout 换档）→ 按位置重挂。 */
  _syncWalkerPos: function() {
    if (this._unloaded) return;
    if (this.data.viewMode !== 'all') return;
    var pos = this._walkerPos;
    if (!pos) return;
    var markers = this.data.markers || [];
    for (var i = 0; i < markers.length; i++) {
      var m = markers[i];
      if (!m || m.id !== this._walkerId) continue;
      // 数据层已经一致（例如刚起播还没走过）就不发多余 setData
      if (Math.abs(m.latitude - pos.lat) < 1e-9 && Math.abs(m.longitude - pos.lng) < 1e-9) return;
      var patch = {};
      patch['markers[' + i + '].latitude'] = pos.lat;
      patch['markers[' + i + '].longitude'] = pos.lng;
      this.setData(patch);
      return;
    }
    this._ensureWalker({ lat: pos.lat, lng: pos.lng });
  },

  /** 页面卸载专用：清定时器 + 丢弃 marker 缓存，**绝不 setData**。
   *  页面已销毁时 setData 会被丢弃并打出「setData 在页面已卸载后调用」告警，
   *  这类噪音会掩盖真正的报错。
   *  （换人物的复位已并入 selectFigure 里唯一一次 setData，不再单独走这里。） */
  _disposePlay: function() {
    this._resume = null;   // [十二修] 页面销毁：不留下跨页面的续播点
    if (this._playTimer) {
      // 同上：interval / 自链 timeout 两种形态都要清
      clearTimeout(this._playTimer);
      clearInterval(this._playTimer);
      this._playTimer = null;
    }
    // [2026-11-11] 圆点行走的 timer 同样要清；这里只清 timer、只落标志，绝不 setData
    //   （_walking=false 会让后续 _applyCalloutLevel 不再囤脏标记）
    this._walking = false;
    this._calloutDirty = false;
    this._clearWalkTimer();
    if (this._regionTimer) {
      clearTimeout(this._regionTimer);
      this._regionTimer = null;
    }
    if (this._regionSettleTimer) {
      clearTimeout(this._regionSettleTimer);
      this._regionSettleTimer = null;
    }
    if (this._cardTimer) {
      clearTimeout(this._cardTimer);
      this._cardTimer = null;
    }
    this._baseMarkers = null;
  }
});
