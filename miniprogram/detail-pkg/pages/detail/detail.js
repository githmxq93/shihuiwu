const { getFigureById, RELATION_COLORS, onReady: figuresReady, isAllLoaded } = require('../../../data/figures');
// 双人生命线：入口资格 / 候选排序 / 中文生卒年解析统一走 detail-pkg/utils/dual-life.js
// （figures 模块需在调用时取 getter，不能解构，否则拿到的是启动瞬间的空数组）
// [2026-11-15] 该模块只有 detail / dual 两个分包页在用，留在主包 utils 会被「上传前检查」
// 判为「主包内不应存在主包未使用的JS文件」，故随分包一起挪到 detail-pkg/utils/。
const dualLife = require('../../utils/dual-life');
const figuresStore = require('../../../data/figures');
const { sortRelated, getSortRole, extractRelationLabel, getRelationCategory, isGenericRelation } = require('../../../utils/relation-utils');
// 头像三级兜底（图片 / emoji 字形 / 姓名首字）+ 站内相对路径补域名，与首页轮播卡共用同一份实现
const { buildAvatar, formatEventYears, buildTimelineGroups, buildEmperorLabel } = require('../../../utils/figure-display');
// 身份标签展示口径（剔除来源标记 CBDB），与 web 端 src/utils/visibleTags.ts 同口径
const { visibleTags } = require('../../../utils/tag-filter');
const { recordHistory } = require('../../../utils/user-utils');
const { navTo } = require('../../../utils/nav');
const API = require('../../../config/api');
const monitor = require('../../../utils/monitor');
const request = require('../../../utils/request');
// 短时数据缓存（2026-11-09 切换提速）：详情页预取的世系 / 足迹数据写这里，
// 目标页优先读缓存渲染，再按新鲜度后台刷新（TTL 10 分钟，2 分钟内不重复请求）。
// 短时缓存 / 在途请求复用与 request 封装同模块（2026-11-09 合并：
// 单独建主包 utils/page-cache.js 会触发「主包未使用 JS 文件」上传检查）
const pageCache = request;
// 收藏（人物）走用户中心「收藏夹」接口，需登录态；authStore 提供内存优先的登录态快照
const authStore = require('../../../utils/auth-store');
// 足迹可定位性预检：与足迹页（footprint-pkg）共用主包 utils 下同一份解析口径，
// 用于「查看一生足迹地图」入口的显隐与跳转守卫（详见该文件头注释）。
const { hasFootprint: hasFootprintOf } = require('../../../utils/footprint-locate');
// 引导进度：用于在引导出现前判断「关系 / 图谱要不要先别拉」，
// 与 guide-layer 共用同一份 shw_guide_v1 记录，不新增存储键。
const guide = require('../../../utils/guide');

let _serverTopics = null;
let _serverTopicsLoaded = false;

// 双人生命线的候选池（精选池，含生卒年）。模块级缓存，选人面板反复打开不重复请求。
// 优先复用 figures.js 已加载的本地池（同样的精选池、省一次 205KB gzip），
// 本地池为空时才向 /api/figures/all 兜底拉取。
let _dualPool = null;
let _dualPoolPromise = null;

/**
 * 是否微信搜一搜爬虫场景（scene 1129）。
 * app.js 的 onLaunch 已把结果写入 globalData；这里再兜一层直接读启动参数，
 * 避免分包页面加载时机早于 App 初始化时拿不到 globalData。
 */
function isCrawlerScene() {
  try {
    const a = (typeof getApp === 'function') ? getApp() : null;
    if (a && a.globalData && a.globalData.isCrawler) return true;
    const o = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
    return !!(o && Number(o.scene) === 1129);
  } catch (e) { return false; }
}

/** 搜一搜页面标题：姓名 + 朝代 + 内容类型 + 品牌，供 wx.setNavigationBarTitle / 分享共用 */
function buildSeoTitle(figure) {
  const name = String((figure && figure.name) || '').trim() || '历史人物';
  const dyn = String((figure && figure.dynasty) || '').trim();
  return name + (dyn ? '（' + dyn + '）' : '') + '生平介绍与人物关系 - 世慧屋';
}

// ============================================================
// 人物数据：本地缓存 + 服务端兜底
// ============================================================
//
// 小程序本地只缓存 `/api/figures/all` 返回的**前 2000 人**，且该接口
// 为了让响应可控（2000 人 × 单人最多 800 条边）**不返回 relations 字段**。
// 于是原来的详情页有两个硬伤：
//   1) 非前 2000 名的人物 `getFigureById` 查不到 → 直接提示「人物不存在」
//   2) 即使查得到，`figure.relations` 恒为 `[]` → 「人物关系」标签永远显示
//      「暂无关联人物」
// 而服务端 `/api/figures/:id` 自 2026-09-11 起已改为读 `figure_relations` 表，
// 能显示关系的人物占比从 3.73% 提升到 48.22%。故这里统一改为：
//   详情主体 → 本地优先、服务端兜底
//   关系数据 → 一律向服务端取（本地缓存结构上不可能有）
//   关系目标名 → 本地没有的用 /api/figures/batch 分片补齐
var _extraFigures = {};   // id -> figure（服务端取回，正主）
var _relCache = {};       // id -> relations 数组
var _relTargets = {};     // id -> figure（关系目标临时池，每次构建关系前清空）

// ---------------------------------------------------------------------------
// 缓存上限（2026-10-21）
// 上面两个对象是**模块级**的：只要小程序不退出，它们就一直累积。原来没有任何
// 淘汰，连续沿关系链浏览几十人后，每个服务端人物（含 relations 全量）都留在
// 内存里只涨不落。这里改成 FIFO 淘汰：
//   - _extraFigures 存完整人物（含 works/relations 等富字段），单人可达数十 KB，
//     上限取 200（约数十人量的关系链浏览足够，内存可控）；
//   - _relCache 只存 relations 数组，条目轻，上限取 40 即可。
// 淘汰不影响已渲染内容：relationList 里的姓名/头像在构建时已展开成普通字段，
// 不再回头查 _extraFigures。淘汰当前页自己也无害——本页用 this._fullFigure。
// ---------------------------------------------------------------------------
var EXTRA_LIMIT = 200;
var REL_LIMIT = 40;
var _extraOrder = [];     // [_extraFigures] 的插入顺序（FIFO）
var _relOrder = [];       // [_relCache] 的插入顺序

/**
 * 写缓存并按 FIFO 淘汰最旧条目。
 * 只在「键首次出现」时入队，重复写不重复入队（否则同一 id 会占多个队列位）。
 * @param {object} store  _extraFigures / _relCache
 * @param {Array}  order  对应队列
 * @param {number} limit  上限
 */
function cacheSet(store, order, limit, key, val) {
  var k = String(key);
  if (!(k in store)) order.push(k);
  store[k] = val;
  while (order.length > limit) {
    var old = order.shift();
    // 队列里可能出现已被淘汰后又重写、并因此重新入队的旧键；
    // 上面的 `!(k in store)` 判断已保证不会重复入队，这里直接删即可。
    delete store[old];
  }
}

function parseJsonField(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') {
    try { var p = JSON.parse(v); return Array.isArray(p) ? p : []; } catch (e) { return []; }
  }
  return [];
}

/**
 * 分享卡片配图（P2-2）：微信显示比例 5:4。
 * avatarView.image 已在 _initDetail 中由 buildAvatar 解析为**绝对地址**（站内相对路径补域名），
 * 且已剔除 emoji 字形（非图片时为空串）——直接复用它，避免重复判断；
 * 无可用头像时回落站内通用 banner。口径与 Web 端人物页 og:image 一致
 * （server/middleware/seo.js：有头像用头像、无则 og-banner.jpg）。
 * @param {object} page 页面实例（this）
 * @returns {string} 网络图片 URL
 */
function shareImageUrl(page) {
  var av = page && page.data && page.data.avatarView && page.data.avatarView.image;
  return av ? av : (API.BASE + '/og-banner.jpg');
}

/**
 * 详情页 setData 只送「模板 + data.figure 消费方」真正会读的字段。
 *
 * [重要] 依据（2026-10-15 全项目核查，勿随意增删）：
 *   - detail.wxml 只读 figure 的 11 个字段：id/name/nameEn/dynasty/nationality/
 *     birthYear/deathYear/bio/fullBio/events/tags（`grep -oE 'figure\.[a-z]+'` 精确枚举）；
 *     另加下面由 emperor 派生出的 emperorLabel（不直接下发整个 emperor 对象）；
 *   - JS 侧从 this.data.figure 只取 id/name（选人、分享），以及 _buildRelationData
 *     读取的 avatar（中心节点头像）；
 *   - relations / works / organizations / achievements / legacy / eraContext /
 *     createdAt / updatedAt 等字段**仅供 JS 预计算** profileRows / workCards /
 *     orgGroups / achievementGroups / legacyGroups / eraGroups 等**独立数据键**
 *     （在裁剪之前已用完整 display 算好），模板从不读 figure.works 这类路径。
 *
 * 线上实测：唐太宗 figure 全字段 21,347 B → 裁剪后 5,223 B（降幅 75%，主因是
 * relations 占 15,352 B 而详情页关系由独立的 relationData 键渲染）。
 * @param {object} figure
 * @returns {object} 仅含必要字段的新对象（不改动入参）
 */
var FIGURE_VIEW_KEYS = [
  'id', 'name', 'nameEn', 'dynasty', 'nationality',
  'birthYear', 'deathYear', 'bio', 'fullBio', 'tags', 'avatar'
];

// [性能] 生平长文首帧只送折叠态可见量（约 240 字），全文保留在 JS 侧 _fullFigure，
// 用户点「展开全部」时再补。线上实测 fullBio 单条最大 251KB（8.4 万字），
// 而折叠态仅显示 10 行（约 220 字），首帧全量下发是纯浪费的跨线程载荷。
var BIO_PREVIEW_LEN = 240;

/**
 * @param {object} figure
 * @param {boolean} fullText true=送全文（爬虫场景，SEO 需渲染层完整正文）
 */
function pickFigureView(figure, fullText) {
  if (!figure) return figure;
  var out = {};
  for (var i = 0; i < FIGURE_VIEW_KEYS.length; i++) {
    var k = FIGURE_VIEW_KEYS[i];
    if (k in figure) out[k] = figure[k];
  }
  // events 数组只在年表 tab 用，且已由 buildTimelineGroups 派生到独立 data 键；
  // 默认档案页用不到，从 figure 视图移除（顶层 hasEvents 布尔由 _initDetail 提供）。
  // 消费方用 _fullFigure.events（本地精简档恒空，服务端回填后补）。
  out.events = [];

  // fullBio 首帧裁剪：仅长文且非爬虫场景才截。全文始终在 _fullFigure 里，展开时补。
  if (!fullText && typeof out.fullBio === 'string' && out.fullBio.length > BIO_PREVIEW_LEN) {
    out.fullBio = out.fullBio.slice(0, BIO_PREVIEW_LEN) + '…';
    out.fullBioTruncated = true;
  }
  // 帝王胶囊（与 Web 详情页同口径）：服务端 parseRow 已随人物下发 `emperor`，
  // 非帝王 / 多政权混排段落（南朝、十六国、五代十国等）时没有该字段 → 不渲染。
  var emperor = figure.emperor;
  var emperorLabel = buildEmperorLabel(emperor);
  if (emperorLabel) {
    out.emperorLabel = emperorLabel;
    out.emperorHint = emperor.dynastyName + '共 ' + emperor.total + ' 位皇帝'
      + (emperor.estimated ? '（序号按生年推算）' : '');
  }
  // 标签行去重（与 Web 端 ProfileHeader 同口径）：朝代已在姓名行右侧胶囊 .b2-era
  // 单独渲染，而数据契约定死 tags[0] 恒等于 dynasty，原样遍历会让标签行再冒出一个
  // 「宋／明」小签，与胶囊重复。仅当首位标签确与朝代相同时才扣掉它，chips 便从第一
  // 个真正的身份词起。帝王页也一样扣：.b2-era 恒显示朝代，emperorLabel 是另起一行，
  // 不占 tags[0] 的位置（这点与 Web 不同，Web 的帝王页会用 emperorLabel 替换朝代）。
  var chipTags = out.tags || figure.tags || [];
  if (chipTags.length &&
      String(chipTags[0] || '').trim() === String(figure.dynasty || '').trim()) {
    chipTags = chipTags.slice(1);
  }
  out.tagChips = chipTags;
  return out;
}

// ============================================================
// 详情页标签组数据（与 Web 端 src/components/TabsSection.tsx 同口径）
// ============================================================

/**
 * 底部五标签（2026-11-08 整合版）。
 * 档案 / 年表 / 关系 → 本页内切换（只显示对应内容）；
 * 世系 / 足迹 → 直接 navTo 现有分包页，样式与线上一模一样（用户明确要求「沿用现有」）。
 * 旧版「9 段横滑标签 + scroll-into-view 锚点」已移除：分段现在收进档案页的可折叠卡。
 */

/** 档案页可折叠分段（顺序即展示顺序；组织机构 / 成就与荣誉按「保留不删」排最后） */
var ARC_SECTIONS = ['profile', 'works', 'legacy', 'eraContext', 'articles', 'organizations', 'achievements'];

/** 关系列表首屏渲染条数（50+ 边的人不再一次性铺满整屏） */
var REL_PAGE = 30;

/**
 * 档案页吸顶姓名出现的滚动阈值（px）。
 * 小于大头部高度（约 240px），滚过姓名行就该挂上，门槛低一点跟手更自然。
 * [注意] onPageScroll 与 _initDetail 都用这一个值，别在两处各写一个 72。
 */
var NAV_SHOW_AT = 72;

/**
 * 年表 tab「双人生命线」入口随滚动方向收起 / 展开（2026-11-15）。
 *   · 上滑（内容上移、scrollTop 增大）→ 收起；下滑或回到顶部附近 → 展开；
 *   · 用「同方向累计位移」判方向，手抖造成的小抖动不参与，静止时不来回闪；
 *   · 收起用高度 + 外边距一起过渡，收起后不占位，不会把首条时间轴顶出屏幕。
 */
var DUAL_ENTRY_TOP = 24;     // 距顶多少 px 内恒定展开
var DUAL_HIDE_DELTA = 12;    // 同方向累计超过该位移才翻转，过滤手抖

/**
 * 基础档案「家庭」行已于 2026-10-21 取消。
 *
 * 旧实现用一份 13 个长词的硬编码表筛家庭角色，两个方向都错：
 *   · 收得太宽：把兄弟 / 姐妹 / 儿媳 / 女婿 / 公公 / 婆婆 也算家人，
 *     全库 11.6 万条兄弟边被卷进这一行（Web 端早已改判据，小程序没跟上）；
 *   · 收得太窄：不做关系词归一，继子 / 继母 / 嗣子 / 嫡母 等直系变体全漏。
 * 既然「关系」面板本来就按直系/旁系/姻亲分好类，档案里再开一条入口只会打架。
 */

/** 组织机构角色分类（顺序即展示顺序） */
var ORG_ROLES = ['任职', '创办', '所属', '合作机构', '社会团体'];
/** 作品与成果分类词表（标准取值，2026-09-20 扩充） */
var WORKS_CATEGORIES = [
  '代表作', '诗', '词', '文', '专著', '书画', '奏议', '手稿',
  '版本', '项目', '专利', '展览', '演出', '课程', '翻译', '研究'
];
/** 成就与荣誉分类（顺序即展示顺序，未命中归入「其他」） */
var ACHIEVEMENT_CATEGORIES = [
  '最高成就', '奖项', '头衔', '纪录', '社会职务',
  '影响力评价', '荣誉时间线', '被引用次数', '命名物'
];
/** 纪念与遗产分类（顺序即展示顺序，2026-09-20 扩充） */
var LEGACY_CATEGORIES = [
  '故居', '纪念馆', '墓地', '祠堂', '命名物',
  '纪念活动', '纪念日', '后世影响', '文化符号', '数字化'
];
/** 时代背景维度（顺序即展示顺序，2026-09-20 扩充） */
var ERA_CATEGORIES = [
  '时期', '政治大事', '经济状况', '文化事件', '科技进展',
  '对外关系', '同代人物', '前后对比', '社会风气', '对人物的影响'
];

/** 作品与成果条目的可选扩展字段：[字段名, 展示标签] */
var WORKS_META_FIELDS = [
  ['alias', '别名'], ['place', '地点'], ['versions', '版本'], ['extent', '篇幅'],
  ['collection', '收录'], ['authenticity', '真伪'], ['manuscript', '手稿'],
  ['patent', '专利'], ['exhibition', '展览'], ['performance', '演出'],
  ['course', '课程'], ['translation', '译本'], ['research', '研究']
];
/** 组织机构条目的可选扩展字段（起始/结束年份已在标题栏以区间展示，不重复列出） */
var ORG_META_FIELDS = [
  ['position', '职务'], ['place', '地点'], ['parent', '上级机构'],
  ['subordinates', '下属'], ['colleagues', '同事'], ['changes', '机构变迁']
];
/** 纪念与遗产条目的可选扩展字段 */
var LEGACY_META_FIELDS = [
  ['place', '地点'], ['status', '现状'], ['year', '年份'], ['level', '保护级别']
];

/**
 * 按某个字段分组：预置分类在前（保序），数据里出现过的自定义分类追加在后，
 * 空数组的组直接丢弃（避免出现只有标题没有内容的空卡片）。
 */
function groupByField(list, field, preset, fallbackLabel) {
  var items = Array.isArray(list) ? list : [];
  var order = preset.slice();
  var i, k;
  for (i = 0; i < items.length; i++) {
    k = items[i][field] || fallbackLabel;
    if (order.indexOf(k) < 0) order.push(k);
  }
  var out = [];
  for (i = 0; i < order.length; i++) {
    var label = order[i];
    var bucket = [];
    for (var j = 0; j < items.length; j++) {
      if ((items[j][field] || fallbackLabel) === label) bucket.push(items[j]);
    }
    if (bucket.length > 0) out.push({ label: label, items: bucket });
  }
  return out;
}

/** 字段值安全转文本：数组用「、」连接，其余 String 化（扩展字段可能给数组/数字） */
function toDisplayText(v) {
  if (v === null || v === undefined) return '';
  if (Array.isArray(v)) return v.join('、');
  return String(v).trim();
}

/** 按 [字段名, 标签] 列表挑出有值的字段，生成「标签：值」小字行（顺序即展示顺序） */
function buildMetaRows(item, fields) {
  var rows = [];
  if (!item) return rows;
  for (var i = 0; i < fields.length; i++) {
    var value = toDisplayText(item[fields[i][0]]);
    if (value) rows.push({ label: fields[i][1], value: value });
  }
  return rows;
}

/** 组织机构年份区间：startYear—endYear；两者都空时退回旧的 year */
function buildOrgYearText(org) {
  var start = toDisplayText(org.startYear);
  var end = toDisplayText(org.endYear);
  if (start && end) return start + '—' + end;
  if (start) return start + '—';
  if (end) return '—' + end;
  return toDisplayText(org.year);
}

/** 作品与成果：原件透传 + 附加扩展字段小字行（不做字段白名单，保证新字段不丢） */
function buildWorkCards(list) {
  var items = Array.isArray(list) ? list : [];
  var out = [];
  for (var i = 0; i < items.length; i++) {
    var card = {};
    for (var k in items[i]) card[k] = items[i][k];
    card.metaRows = buildMetaRows(items[i], WORKS_META_FIELDS);
    out.push(card);
  }
  return out;
}

function buildOrgGroups(list) {
  return groupByField(list, 'role', ORG_ROLES, '其他').map(function (g) {
    var items = [];
    for (var i = 0; i < g.items.length; i++) {
      var src = g.items[i];
      var item = {};
      for (var k in src) item[k] = src[k];
      item.yearText = buildOrgYearText(src);
      item.metaRows = buildMetaRows(src, ORG_META_FIELDS);
      items.push(item);
    }
    return { role: g.label, items: items };
  });
}

function buildAchievementGroups(list) {
  return groupByField(list, 'category', ACHIEVEMENT_CATEGORIES, '其他').map(function (g) {
    return { category: g.label, items: g.items };
  });
}

function buildLegacyGroups(list) {
  return groupByField(list, 'category', LEGACY_CATEGORIES, '其他').map(function (g) {
    var items = [];
    for (var i = 0; i < g.items.length; i++) {
      var src = g.items[i];
      var item = {};
      for (var k in src) item[k] = src[k];
      item.metaRows = buildMetaRows(src, LEGACY_META_FIELDS);
      items.push(item);
    }
    return { category: g.label, items: items };
  });
}

function buildEraGroups(list) {
  return groupByField(list, 'category', ERA_CATEGORIES, '其他').map(function (g) {
    return { category: g.label, items: g.items };
  });
}

/**
 * 生卒合并成一行（与 Web 端 `buildLifeSpan` 同口径）。
 *
 * 分开列「生年」「卒年」两行时：库里 82.8% 的人两项皆空、10.2% 只有一项，
 * 于是绝大多数人看到的是连续两条「待补充」。合并后一行说完：
 *   `1521 — 1590` / `1521 — 卒年不详` / `生年不详 — 1590` / 空（模板显示待补充）
 *
 * [注意] 值原样拼接，不做 formatYear 归一化：库里生年既有纯数字（1840），
 *    也有公元前中文串（约公元前350年），格式化会把后者打散。
 */
function buildLifeSpan(figure) {
  figure = figure || {};
  // [注意] 生卒年在接口里是 **number**（sanitizeYear 对公元年份 return n），
  //    不能直接 .trim()；且 sanitizeYear 把 0 归一为「无值」，
  //    这里必须跟同一口径，否则会渲染出「0 — 0」。
  var b = normYear(figure.birthYear);
  var d = normYear(figure.deathYear);
  if (!b && !d) return '';
  if (b && d) return b + ' — ' + d;
  return b ? b + ' — 卒年不详' : '生年不详 — ' + d;
}

/** 生卒年安全归一：任何值 → trim 后的字符串；0 / '0' 视为无值（与 sanitizeYear 同口径） */
function normYear(v) {
  var s = String(v == null ? '' : v).trim();
  return s === '0' ? '' : s;
}

/**
 * 别称：常用称呼 + 别名，去重且剔除与本名相同的值（与 Web 端同口径）。
 *
 * 原先「别名」与「常用称呼」各占一行，但两者语义重叠 ——
 * 诗仙 / 杜工部 / 汉高祖 都是同一个人的不同叫法，拆两行会让同一人的
 * 两个叫法分开显示，读者以为那是两拨人。
 * 常用称呼排在最前：它比散列的别名更接近读者认得的叫法。
 */
function buildAliasText(figure) {
  var out = [];
  var seen = {};
  var self = String(figure.name == null ? '' : figure.name).trim();
  function push(raw) {
    var v = String(raw == null ? '' : raw).trim();
    if (!v || v === self || seen[v]) return;
    seen[v] = 1;
    out.push(v);
  }
  push(figure.commonName);
  var aliases = Array.isArray(figure.aliases) ? figure.aliases : [];
  for (var i = 0; i < aliases.length; i++) push(aliases[i]);
  return out.join('、');
}

/**
 * 基础档案行（17 行，顺序固定）：
 *   本名/别称/字/号/性别/生卒/生肖/出生地/籍贯/卒地/国籍/民族/
 *   朝代/身份/职业/教育背景/信仰。
 * 2026-10-21 精简：别名＋常用称呼→别称；生年＋卒年→生卒；时代→朝代；
 *   身份标签→身份；取消「家庭」行（直系亲属由「关系」面板承载）。
 * 别名由服务端 /api/figures/:id 从 figure_alias 表补出（本地缓存结构上没有）；
 * courtesyName/artName/zodiac/deathPlace 等为服务端新标量字段，缺失留空
 * （WXML 统一渲染为「待补充」）。
 */
/**
 * 方案 B v2：首屏 meta 由 JS 拼好并过滤空值。
 * 旧写法 `{{dynasty}} · {{nationality}} · {{birthYear}}-{{deathYear}}` 在薄档
 * 三字段全空时会渲染成 ` ·  · -`，且生卒分隔符与档案行（b — d）不一致。
 * 这里统一用 buildLifeSpan 的口径，整行无值则不渲染。
 *
 * 2026-11-05：朝代不再进 meta —— 姓名行右侧已有朝代胶囊（`wx:if="{{figure.dynasty}}"`），
 * 同一信息重复两次；胶囊只在 dynasty 有值时才渲染，故此处删掉 dyn 不会丢信息。
 * meta 从此只承载「国家 · 生卒」。
 */
function buildFigureMeta(figure) {
  var parts = [];
  var dyn = String((figure && figure.dynasty) || '').trim();
  var nat = String((figure && figure.nationality) || '').trim();
  var life = buildLifeSpan(figure);
  if (nat && nat !== dyn) parts.push(nat);
  if (life) parts.push(life);
  return parts.join('  ·  ');
}

/** 基础档案：默认只渲染有值行；「待补充」收进「展开全部 17 项」后再显示 */
function buildProfileRowsFilled(rows) {
  return (rows || []).filter(function (r) {
    return !!(r && String(r.value || '').trim());
  });
}

/** 分组数据总条数（orgGroups / achievementGroups / legacyGroups / eraGroups 形状 [{ items: [] }]） */
function countGroupItems(groups) {
  return (groups || []).reduce(function (n, g) {
    return n + ((g && g.items && g.items.length) || 0);
  }, 0);
}

/**
 * 整合版（2026-11-08）：档案页的分段不再做显隐裁剪 —— 7 段全部常驻为可折叠标题栏，
 * 没内容的段展开后只有一句「暂无…数据」，用户永远能找到入口（不再有「更多」隐藏逻辑）。
 */

/** 各分段条数角标：只统计当前已就绪的数据 */
function buildTabCounts(d) {
  return {
    profile: (d.profileRowsFilled || []).length,
    timeline: ((d.figure && d.figure.events) || []).length,
    works: (d.workCards || []).length,
    organizations: countGroupItems(d.orgGroups),
    achievements: countGroupItems(d.achievementGroups),
    legacy: countGroupItems(d.legacyGroups),
    eraContext: countGroupItems(d.eraGroups),
    relations: ((d.relationData && d.relationData.relationList) || []).length,
    articles: (d.relatedArticles || []).length
  };
}

/** 档案页「N 段有内容」：只数 7 个可折叠分段 */
function buildArchiveFilled(counts) {
  var n = 0;
  for (var i = 0; i < ARC_SECTIONS.length; i++) {
    if ((counts[ARC_SECTIONS[i]] || 0) > 0) n++;
  }
  return n;
}

/**
 * 头部三数：全部取真实数据。
 * 关联人物优先用「已构建的关系列表条数」；关系尚未按需加载时，
 * 退到人物全量数据里的 relations 条数（服务端详情接口自带），仍为 0 才显示「—」。
 */
function buildHeroStats(counts, relHint) {
  var rel = counts.relations || relHint || 0;
  return [
    { label: '大事条目', value: String(counts.timeline || 0) },
    { label: '作品成果', value: String(counts.works || 0) },
    { label: '关联人物', value: rel ? String(rel) : '—' }
  ];
}

/** 薄档判定：用于「一句话 + 一个出口」收尾卡，避免给富档也挂空态 */
function isThinFigure(counts) {
  return counts.profile <= 3 && counts.timeline === 0 && counts.works === 0 &&
    counts.organizations === 0 && counts.achievements === 0 &&
    counts.legacy === 0 && counts.eraContext === 0;
}

function buildProfileRows(figure) {
  var rows = [
    { label: '本名', value: figure.name || '' },
    { label: '别称', value: buildAliasText(figure) }
  ];
  /* 年号 / 庙号只对帝王显示：服务端 isEmperor 判定，非帝王完全不加行（不留空行）。
     年号来自静态纪年表，一个人多个年号按「贞观 → 永徽」串起来；
     庙号库里没有结构化字段，只能从别名取，取不到就不加这一行，绝不硬造。 */
  if (figure.isEmperor) {
    rows.push({ label: '年号', value: (figure.eraNames || []).join(' → ') });
    if (figure.templeName) rows.push({ label: '庙号', value: figure.templeName });
  }
  return rows.concat([
    { label: '字', value: figure.courtesyName || '' },
    { label: '号', value: figure.artName || '' },
    { label: '性别', value: figure.gender || '' },
    { label: '生卒', value: buildLifeSpan(figure) },
    { label: '生肖', value: figure.zodiac || '' },
    { label: '出生地', value: figure.birthPlace || '' },
    { label: '籍贯', value: figure.region || '' },
    { label: '卒地', value: figure.deathPlace || '' },
    { label: '国籍', value: figure.nationality || '' },
    { label: '民族', value: figure.ethnicity || '' },
    { label: '朝代', value: figure.dynasty || '' },
    { label: '身份', value: (figure.tags || []).join('、') },
    { label: '职业', value: figure.occupation || '' },
    { label: '教育背景', value: figure.education || '' },
    { label: '信仰', value: figure.faith || '' }
  ]);
}

/** 本地缓存优先，其次服务端取回的人物，最后是关系目标临时池 */
function resolveFigure(id) {
  var k = String(id);
  return _extraFigures[k] || _relTargets[k] || getFigureById(id) || null;
}

/** 归一化服务端返回的人物对象 */
function normalizeFigure(d) {
  if (!d) return d;
  d.id = String(d.id);
  d.tags = visibleTags(parseJsonField(d.tags));
  d.works = parseJsonField(d.works);
  d.events = parseJsonField(d.events);
  d.achievements = parseJsonField(d.achievements);
  d.relations = parseJsonField(d.relations);
  // 新增面板字段（老接口/本地缓存缺失时统一兜底为空数组）
  d.organizations = parseJsonField(d.organizations);
  d.legacy = parseJsonField(d.legacy);
  d.eraContext = parseJsonField(d.eraContext);
  // 帝王专属：服务端只对帝王返回（非帝王 false + 空，档案行不会出现）
  d.isEmperor = !!d.isEmperor;
  d.eraNames = parseJsonField(d.eraNames);
  d.templeName = d.templeName || '';
  d.aliases = parseJsonField(d.aliases);
  // 新标量字段（服务端补齐，缺失统一兜底为空串，由基础档案行渲染「待补充」）
  d.commonName = d.commonName || '';
  d.longevity = d.longevity || '';
  d.birthPlace = d.birthPlace || '';
  d.ethnicity = d.ethnicity || '';
  d.lifeStatus = d.lifeStatus || '';
  // 基础档案补充字段（字/号/生肖/卒地），2026-09-20 档案扩版时新增
  d.courtesyName = d.courtesyName || '';
  d.artName = d.artName || '';
  d.zodiac = d.zodiac || '';
  d.deathPlace = d.deathPlace || '';
  // 注：works / achievements / organizations / legacy 条目均为整对象透传（非白名单挑字段），
  //     新增的可选字段（alias/place/startYear/position…）无需在此显式声明即可保留。
  return d;
}

/** 取单个人物完整信息（含 relations） */
function fetchFigureById(id, cb) {
  request({
    timeout: 10000,
    url: API.FIGURES.GET(id),
    success: function(res) {
      if (res.data && res.data.success && res.data.data) {
        var d = normalizeFigure(res.data.data);
        cacheSet(_extraFigures, _extraOrder, EXTRA_LIMIT, d.id, d);
        cacheSet(_relCache, _relOrder, REL_LIMIT, d.id, d.relations);
        // 足迹页数据复用（2026-11-09）：详情页刚拉过的这份人物，足迹预取与足迹页
        // 直接读 `fig:<id>` 即可，不再对同一人物重复请求 /api/figures/:id。
        pageCache.setCache('fig:' + d.id, {
          id: d.id,
          name: d.name,
          avatar: d.avatar,
          dynasty: d.dynasty,
          region: d.region,
          birthYear: d.birthYear,
          deathYear: d.deathYear,
          events: d.events
        });
        cb(null, d);
      } else {
        cb(new Error('not-found'), null);
      }
    },
    fail: function() { cb(new Error('network'), null); }
  });
}

/** 批量补齐本地缺失的关系目标人物（/batch 单次上限 200，分片串行） */
function fetchMissingTargets(ids, cb) {
  var missing = [];
  var seen = {};
  for (var i = 0; i < ids.length; i++) {
    var key = String(ids[i]);
    if (seen[key]) continue;
    seen[key] = true;
    if (!resolveFigure(key)) missing.push(key);
  }
  if (missing.length === 0) { cb(); return; }

  var chunks = [];
  for (var j = 0; j < missing.length; j += 200) chunks.push(missing.slice(j, j + 200));
  var idx = 0;
  function next() {
    if (idx >= chunks.length) { cb(); return; }
    var chunk = chunks[idx++];
    request({
      timeout: 10000,
      url: API.FIGURES.BATCH + '?ids=' + chunk.join(','),
      success: function(res) {
        // 填充与推进都放在 success 里，**不依赖 complete 与 success 的先后**
        // （utils/request.js 已按 wx.request 语义改成 success→complete，这里再做一层防御）
        try {
          if (res.data && res.data.success && Array.isArray(res.data.data)) {
            for (var k = 0; k < res.data.data.length; k++) {
              var f = normalizeFigure(res.data.data[k]);
              // 批量补齐的只是关系目标的姓名/头像 ⇒ 进**临时池** _relTargets，
              // 不挤占正主缓存（单批可达 200 个，与 EXTRA_LIMIT 同量级，混存会把正主全冲掉）。
              // 临时池在每次 _prepareRelations 开头清空，因此不会跨页累积。
              _relTargets[String(f.id)] = f;
            }
          }
        } finally {
          next();
        }
      },
      fail: function() { next(); }
    });
  }
  next();
}

function parseArticle(a) {
  if (!a) return a;
  let relatedFigures = a.relatedFigures;
  if (typeof relatedFigures === 'string') {
    try { relatedFigures = JSON.parse(relatedFigures); } catch(e) { relatedFigures = []; }
  }
  if (!Array.isArray(relatedFigures)) relatedFigures = [];
  // relatedNames：lite 接口给的人名数组（无 relation 文案）。
  // 「相关文章」是按人命反查的，只有 relatedFigures 时在 lite 下会整体消失，
  // 故两种字段都收下；用 relatedFigures 的 name 兜一层，兼容全量接口。
  let relatedNames = a.relatedNames;
  if (!Array.isArray(relatedNames) || !relatedNames.length) {
    relatedNames = relatedFigures
      .map(function (f) { return (f && f.name) || (typeof f === 'string' ? f : ''); })
      .filter(Boolean);
  }
  return {
    id: a.id,
    title: a.title || '',
    summary: a.summary || '',
    content: a.content || '',
    excerpt: a.excerpt || '',
    author: a.author || '',
    era: a.era || '',
    // 文末「参考文献与资料来源」「关键词」的数据源（lite 接口不带，点开全文后才回填）
    citations: a.citations || [],
    keywords: a.keywords || '',
    relatedNames: relatedNames,
    relatedFigures: relatedFigures
  };
}

function getTopics() {
  return _serverTopics || {};
}

function loadServerTopics(callback) {
  if (_serverTopicsLoaded) {
    if (callback) callback();
    return;
  }
  request({
    timeout: 10000,
    // 侧栏「相关专题」只要文章标题：用 lite 版（实测 60 KB）。
    // 全量版 508 KB，其中 82.9% 是正文 —— 为看一个人物（约 4 KB）先下 0.5 MB 不值。
    // 正文改为用户真的点开某篇时按 API.ARTICLES.GET(id) 单篇取（见 _loadArticleBody）。
    url: API.TOPICS.LIST_LITE,
    success: function(res) {
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        const newTopics = {};
        res.data.data.forEach(function(topic) {
          newTopics[topic.key] = {
            title: topic.title,
            description: topic.description,
            icon: topic.icon,
            articles: (topic.articles || []).map(parseArticle)
          };
        });
        if (Object.keys(newTopics).length > 0) {
          _serverTopics = newTopics;
        }
      }
    },
    complete: function() {
      _serverTopicsLoaded = true;
      if (callback) callback();
    }
  });
}

// ============================================================
// 生平介绍折叠档位（2026-11-08）
// ============================================================
// 判据按「估算行数」而不是裸字数：rpx 布局下字号与版心宽度都是固定 rpx，
// 每行能放多少字与设备宽度无关，端上估行是稳定的。
//   · ≤ 10 行（像图一那样一屏内放得下）→ 完全不折叠，也不出现「展开全部」；
//   · > 10 行才有开关，且折叠态保留同样 10 行（约 494rpx ≈ 247px @375 屏），
//     不是只留两三行。
var BIO_LINE_CHARS = 22;      // 26rpx 字号 + 1rpx 字距，约 620rpx 版心 → 每行 22 字
var BIO_COLLAPSE_LINES = 10;  // 折叠态保留行数，与图一篇幅相当

/** 估算正文行数：按段落拆行，再按每行 22 字向上取整（空段落也占一行高度） */
function estimateBioLines(text) {
  var s = String(text == null ? '' : text);
  if (!s) return 0;
  var lines = 0;
  var parts = s.split(/\r?\n/);
  for (var i = 0; i < parts.length; i++) {
    var len = parts[i].replace(/\s+/g, ' ').trim().length;
    lines += Math.max(1, Math.ceil(len / BIO_LINE_CHARS));
  }
  return lines;
}

Page({
  data: {
    figure: null,
    // 头像视图模型（有图用 image、无图回落首字 text）；先在 data 声明，避免首帧 {{avatarView.image}} 取不到 undefined
    avatarView: { image: '', text: '' },
    // 关系数据加载失败标记（关系 Tab 里显示"加载失败"占位）
    relationsError: false,
    loading: true,
    /**
     * 整页加载失败态（2026-10-21）：
     *   ''        正常
     *   'network' 网络/超时 —— 可重试，绝不能报「人物不存在」
     *   'missing' 服务端明确返回无此人物（404 语义）
     *   'param'   进页参数就没有合法 id
     * 旧实现在这两种情况下都只 toast 一句「人物不存在」然后留白屏，弱网时会把
     * 一个真实存在的人物说成不存在，用户也没有重试入口。
     */
    loadError: '',
    // 生平介绍：默认折叠（仅长文）；短篇直接全展示，不出现展开按钮。
    // bioFoldable 由正文估算行数决定（见 estimateBioLines），换人时重算。
    bioExpanded: false,
    bioFoldable: false,
    // ===== 整合版（2026-11-08）：五标签 + 档案页可折叠分段 =====
    // pageTab：archive / timeline / relations 三档为本页内切换；
    // lineage / footprint 走 navTo，不在 pageTab 里驻留。
    pageTab: 'archive',
    // 档案页各分段的展开态（默认全折叠，只留标题栏与条数）
    arcOpen: { profile: false, works: false, legacy: false, eraContext: false, articles: false, organizations: false, achievements: false },
    archiveFilled: 0,
    tabCounts: {},
    heroStats: [],
    // 首屏 meta（JS 拼好、过滤空值，避免 ` ·  · -`）
    figureMeta: '',
    // 印章首字（不用 avatar 的 emoji 字形，避免功能图标化）
    sealText: '',
    // 基础档案：17 行全量 + 默认只渲染有值行 + 展开开关
    profileRowsFilled: [],
    profileAllExpanded: false,
    profileTotal: 17,
    isThin: false,
    // 自定义导航高度（statusBarHeight + 44px），供首屏 padding-top 让位固定导航
    navBarHeight: 88,
    showTop: false,
    // 收藏态（人物）：登录后按收藏夹接口回填；未登录保持 false（按钮仍可点，点击时引导登录）
    faved: false,
    favBusy: false,
    // 档案页上滑后的深色吸顶条是否显示：大头部底边越过导航栏下沿才为 true
    showArchiveBar: false,
    // 「查看一生足迹地图」入口是否显示：
    // 判据见 utils/footprint-locate.js::hasFootprint —— events 可定位 **或**
    // 籍贯/出生地/卒地可定位。早期只判 events，那时全库仅 1.8% 的人有足迹；
    // 加入档案位置字段兜底后覆盖面扩大了两个数量级，入口才有意义。
    // [注意] 本地精简档（/api/figures/all）events 恒空 ⇒ 首帧必为 false，
    //    服务端富字段回填时 _initDetail 会重跑，届时自动补上。
    hasFootprint: false,
    safeAreaTop: 44,
    relationData: {
      nodes: [],
      links: [],
      relationList: []
    },
    relationsLoading: false,   // 关系数据加载状态
    // 引导进行中：关系 / 图谱先不拉取、不渲染，只保留骨架。
    // 原因：图谱内容会铺满整屏，压在引导卡下方或被遮罩挡住都看不清；
    // 但不拉数据也不能留白板，关系页此时显示骨架（文案换成「先看完引导」）。
    guideHold: false,
    // 关系页视图：graph = 图谱（默认）/ list = 列表。
    // 两视图共用 relationData，切换只改这个字段（不重新请求、不重排）。
    relView: 'graph',
    // 关系列表分页：relationList 只送前 REL_PAGE 条，剩余数量给「展开更多」
    relTotal: 0,
    relMore: 0,
    relatedArticles: [],
    currentArticle: null,
    // 标签组数据（在 _initDetail 中按当前人物重建）
    profileRows: [],
    workCards: [],
    orgGroups: [],
    achievementGroups: [],
    legacyGroups: [],
    eraGroups: [],
    // 年表卡片分组：始终是「卡片数组」——有 phase 的人物按阶段各成一张卡，
    // 没有 phase 的人物退化为一张「大事年表」卡（事件照常按年份排）。
    timelineGroups: [],
    // 是否有真实阶段数据：只控制摘要里要不要补「· N 段」，无 phase 的人物不报段数
    timelineHasPhase: false,
    // ===== 双人生命线（2026-11-15）=====
    // 入口只在「精选 + 生卒双全」时放开（见 dualLife.canOpenDual），
    // 避免全库 92.9% 生卒不全的人点进去看到空白。
    dualEntry: false,
    // 上滑时入口收起（方向联动，见 _syncDualEntry）
    dualEntryHidden: false,
    dualPickerOpen: false,
    dualPickerLoading: false,
    dualPickerGroups: [],
    dualPickerKeyword: '',
    dualPickerSelected: null,
    dualPickerTip: '',
    // 微信搜一搜：动态页面标题（任务栏 / 分享共用）
    pageTitle: '',
    // 世系 / 足迹点击后、目标页真正打开前的高亮标记（2026-11-09 切换提速）：
    // 让底栏在手指抬起的瞬间就亮，目标页返回后由 onShow 清掉，保证高亮与内容一致。
    pendingTab: ''
  },

  onLoad(options) {
    this._perfT0 = Date.now(); // 首渲染测速起点（onLoad → 详情首屏 setData）
    const sysInfo = wx.getWindowInfo();
    const safeAreaTop = sysInfo.statusBarHeight || 44;
    // 方案 B v2：自定义导航固定高度 = 状态栏 + 44px 标题行，分段栏 sticky 需按它让位；
    // 回顶阈值按屏高算（小屏机型滚不到 600px 也该给回顶），不再硬编码 600。
    this._topThreshold = Math.round((sysInfo.windowHeight || 667) * 0.8);
    this._scrollTop = 0;
    this.setData({
      safeAreaTop: safeAreaTop,
      navBarHeight: safeAreaTop + 44
    });

    const id = options.id ? parseInt(options.id, 10) : null;
    if (!id) {
      this.setData({ loading: false, loadError: 'param' });
      return;
    }

    // 保存 id 供异步重试用
    this._figureId = id;

    // 支持指定初始 tab：
    //   · 首页「关系图谱」磁贴：&tab=relations 直接落在关系视图；
    //   · 世系 / 足迹页底栏点「档案 / 年表 / 关系」时，若栈里没有可返回的详情页，
    //     会以 &tab=archive|timeline|relations 打开本页（见 lineage.js / footprint.js::onDockTap）。
    this._initialTab = (options.tab === 'archive' || options.tab === 'timeline' || options.tab === 'relations')
      ? options.tab
      : null;

    this._loadFigure(id);
  },

  /**
   * 载入人物：本地缓存优先 → 等本地全量加载完 → 服务端兜底。
   * 从 onLoad 抽出，供失败态「重新加载」按钮复用（retryLoad）。
   *
   * [注意] 本地缓存（/api/figures/all）为控响应体积，events 恒为空数组、且不含
   *    fullBio —— 命中缓存时「生平时间线」区块（wx:if events.length>0）不渲染、
   *    详文缺失。这里静默拉单人物接口补齐富字段，回填后重渲染（不阻塞首屏）。
   */
  _loadFigure(id) {
    var that = this;
    this.setData({ loadError: '' });

    var figure = resolveFigure(id);
    if (figure) {
      this._initDetail(figure);
      // 本地精简档不含 isEmperor / 年号 / 庙号，缺这三个字段也要回填一次，
      // 否则缓存命中的帝王档案里看不到年号、庙号两行
      if (!Array.isArray(figure.events) || figure.events.length === 0 || !figure.fullBio ||
        typeof figure.isEmperor === 'undefined') {
        this._fetchAndMerge(id);
      }
      return;
    }

    // 本地没有 → 先等本地全量数据加载完（可能只是还没到），再退到服务端。
    // 旧实现在本地找不到就直接提示「人物不存在」，导致小程序实际只能看前 2000 人。
    function fallbackToServer() {
      if (!isCrawlerScene()) wx.showLoading({ title: '加载中...' }); // 爬虫场景禁弹原生 loading（会遮住首屏）
      fetchFigureById(id, function (err, d) {
        if (!isCrawlerScene()) wx.hideLoading();
        // 用户可能在请求期间已经退出本页
        if (!that._figureId) return;
        if (!d) {
          that._failLoad(err);
          return;
        }
        that._fromServer = true;
        that._initDetail(d);
      });
    }

    if (!isAllLoaded()) {
      if (!isCrawlerScene()) wx.showLoading({ title: '加载中...' }); // 爬虫场景禁弹原生 loading（会遮住首屏）
      figuresReady(function () {
        if (!isCrawlerScene()) wx.hideLoading();
        if (!that._figureId) return;
        var f = resolveFigure(id);
        if (f) {
          that._initDetail(f);
          if (!Array.isArray(f.events) || f.events.length === 0 || !f.fullBio ||
            typeof f.isEmperor === 'undefined') {
            that._fetchAndMerge(id);
          }
        } else {
          fallbackToServer();
        }
      });
    } else {
      fallbackToServer();
    }
  },

  /**
   * 首屏用的是本地精简档时，异步拉服务端富字段回填。
   * 抽成方法是为了让「重新加载」也能复用（原来这段逻辑内联在 onLoad 里，
   * 失败态无法重入 ⇒ 弱网用户只能杀掉小程序重进）。
   */
  _fetchAndMerge(id) {
    var that = this;
    fetchFigureById(id, function (err, d) {
      // 校验用户未离开本页（onUnload 置空 _figureId）
      if (!err && d && String(that._figureId) === String(d.id)) {
        that._fromServer = true;
        that._initDetail(d);
      }
    });
  },

  /**
   * 整页加载失败：区分「网络不通」与「确无此人」。
   * 旧实现 `if (err || !d)` 一律 toast「人物不存在」——弱网时把一个真实存在
   * 的人物说成不存在，且没有重试入口。
   */
  _failLoad(err) {
    var isNetwork = !err || err.message === 'network';
    this.setData({
      loading: false,
      loadError: isNetwork ? 'network' : 'missing'
    });
    wx.showToast({
      title: isNetwork ? '网络不畅，请稍后重试' : '未找到该人物',
      icon: 'none'
    });
  },

  /** 失败态重试（仅网络失败有按钮） */
  retryLoad() {
    if (!this._figureId) return;
    this.setData({ loading: true, loadError: '' });
    this._loadFigure(this._figureId);
  },

  /**
   * 使用引导启动：等 figure 进 DOM 后再拉，避免锚点还没渲染。
   * _initDetail 会被缓存 / 服务端回填各跑一次，用 _guideStarted + 定时器去重；
   * autoStart 内部还会看 done 标记，看过的用户不会重复出现。
   */
  _scheduleGuide() {
    if (this._guideStarted || this._guideTimer) return;
    var that = this;
    this._guideTimer = setTimeout(function () {
      that._guideTimer = null;
      if (that._unloaded || that._guideStarted || !that.data.figure) return;
      var layer = that.selectComponent('#guideLayer');
      if (!layer) {
        // 组件还没挂上：最多再等 3 轮；仍挂不上说明这套引导跑不起来，
        // 关系数据不能一直压在闸门后面，直接放开。
        if ((that._guideWaits || 0) < 3) {
          that._guideWaits = (that._guideWaits || 0) + 1;
          that._scheduleGuide();
        } else {
          that._endGuideHold();
        }
        return;
      }
      that._guideStarted = true;
      // autoStart 返回 false = 这套引导已看完 / 没有重看标记，不会出现：
      // 立刻放开关系数据闸门，避免「没引导却一直只有骨架」。
      if (layer.autoStart('detail') === false) that._endGuideHold();
    }, 360);
  },

  /**
   * 放开「引导期间先不拉关系 / 图谱」的闸门。
   * 引导正常结束、被跳过、根本没出现、或中途被切后台关掉，都要走到这里，
   * 否则关系页会永远停在骨架。放开后按当前标签决定是立刻加载还是后台预热。
   */
  _endGuideHold() {
    if (!this._guideHold) return;
    this._guideHold = false;
    if (this.data.guideHold) this.setData({ guideHold: false });
    if (this.data.pageTab === 'relations') {
      this.loadRelationData();
    } else {
      this._prefetchRelations();
    }
  },

  /**
   * 兜底：引导组件还在展示时不能放开闸门；已经不可见（例如切后台时被组件自己关掉，
   * 不会触发 done）就要放开。只在「确实启动过引导」时判定，避免首帧组件未挂载被误放。
   */
  _checkGuideHold() {
    if (!this._guideHold || !this._guideStarted) return;
    var layer = this.selectComponent('#guideLayer');
    if (!layer || !layer.data.visible) this._endGuideHold();
  },

  /**
   * 引导滚动（页面级滚动，没有 scroll-view）：
   * 容器取视口，scrollTop = 当前滚动量 + 锚点相对视口顶边的距离 - 导航预留。
   * 不用 scroll-into-view，也不写死坐标。
   */
  onGuideScrollTo(e) {
    var sel = e && e.detail && e.detail.selector;
    if (!sel) return;
    var that = this;
    var q = wx.createSelectorQuery();
    q.select(sel).boundingClientRect();
    q.selectViewport().boundingClientRect();
    q.selectViewport().scrollOffset();
    q.exec(function (res) {
      var rect = res && res[0];
      var box = res && res[1];
      var vp = res && res[2];
      if (!rect || !rect.height) return;
      var offset = (that.data.navBarHeight || 0) + 16;
      var top = ((vp && vp.scrollTop) || 0) + rect.top - ((box && box.top) || 0) - offset;
      wx.pageScrollTo({ scrollTop: Math.max(0, top), duration: 220, fail: function () {} });
    });
  },

  /** 引导：关系 / 年表要页面先切标签才渲染（遮罩拦点击，由引导替用户切再量孔） */
  onGuideState(e) {
    var state = e && e.detail && e.detail.state;
    if (!state) return;
    if (state !== this.data.pageTab) {
      if (!this._guideTabBefore) this._guideTabBefore = this.data.pageTab || 'archive';
      this.setDockTab(state);
      return;
    }
    // 已在目标标签：双人生命线入口可能被上滑收起（max-height:0），
    // 不收回来就量不到，引导会判定目标缺失而跳过，所以先确保展开。
    if (state === 'timeline' && this.data.dualEntryHidden) {
      this.setData({ dualEntryHidden: false });
    }
  },

  /** 引导结束（看完或跳过）：回到进入引导前的标签，不把用户留在过程中切到的页 */
  onGuideDone() {
    var back = this._guideTabBefore;
    this._guideTabBefore = '';
    if (back && back !== this.data.pageTab) this.setDockTab(back);
    // 引导收场才允许拉关系 / 图谱（引导期间只留骨架）
    this._endGuideHold();
  },

  onShow() {
    // 从世系 / 足迹返回（2026-11-09）：清掉「待打开」高亮并重算滚动状态，
    // 底栏高亮只跟当前真正显示的内容走，不残留跳转前的临时高亮。
    if (this.data.pendingTab) this.setData({ pendingTab: '' });
    // 子页面点「档案 / 年表 / 关系」会先对后台的本页调 setDockTab（deferScroll），
    // 此时 wx.pageScrollTo 作用不到隐藏页；等本页真正回到前台再回顶，落在目标标签首屏。
    if (this._pendingDockScroll) {
      this._pendingDockScroll = false;
      const that = this;
      wx.nextTick(function () { that.scrollToTop(); });
    }
    this._syncScrollState();
    // 使用引导：首屏图未就绪时这里只挂定时器，figure 落地后由 _initDetail 再补一次
    this._scheduleGuide();
    // 引导期间压着的关系数据：若引导已被组件自行关掉（切后台等）就放开
    this._checkGuideHold();
  },

  onUnload() {
    this._unloaded = true;
    this._figureId = null;
    this._relationDataLoaded = null;
    // 后台预取 / 跳转反馈的定时器必须随页面销毁清掉（2026-11-09）
    if (this._prefetchKickTimer) { clearTimeout(this._prefetchKickTimer); this._prefetchKickTimer = null; }
    if (this._prefetchTimer1) { clearTimeout(this._prefetchTimer1); this._prefetchTimer1 = null; }
    if (this._prefetchTimer2) { clearTimeout(this._prefetchTimer2); this._prefetchTimer2 = null; }
    if (this._prefetchTimer3) { clearTimeout(this._prefetchTimer3); this._prefetchTimer3 = null; }
    if (this._openTimer) { clearTimeout(this._openTimer); this._openTimer = null; }
    if (this._openFallback) { clearTimeout(this._openFallback); this._openFallback = null; }
    // 引导延迟启动的定时器也要随页面销毁清掉
    if (this._guideTimer) { clearTimeout(this._guideTimer); this._guideTimer = null; }
    this._relLoading = false;
    // 吸顶姓名降频用的尾随定时器（见 onPageScroll）；页面走了必须清掉，
    // 否则回调里 setData 会落到已销毁的页面实例上。
    if (this._scrollSyncTimer) {
      clearTimeout(this._scrollSyncTimer);
      this._scrollSyncTimer = null;
    }
    // 释放完整人物引用（data.figure 只保留裁剪版，JS 侧另存全量于 _fullFigure）
    this._fullFigure = null;
    // 关系临时池随页面销毁一并丢弃（模块级变量，不清会跨页累积）
    _relTargets = {};
  },

  _matchRelatedArticles(figureName) {
    const matched = [];
    const topics = getTopics();
    // 动态遍历所有专题，避免硬编码列表漏掉新增专题（此前漏了 extremes/festival/campaign）
    const topicKeys = Object.keys(topics);
    for (var tk = 0; tk < topicKeys.length; tk++) {
      var topicInfo = topics[topicKeys[tk]];
      if (!topicInfo || !topicInfo.articles) continue;
      var topicIcon = topicInfo.icon || '';
      var articles = topicInfo.articles;
      for (var ai = 0; ai < articles.length; ai++) {
        var art = articles[ai];
        // parseArticle 已把 relatedFigures / relatedNames 归一成 relatedNames 人名数组：
        // lite 接口不返回 relatedFigures（省 82.9% 体积），只靠它匹配会让
        // 详情页「相关文章」整块消失。
        var names = art.relatedNames || [];
        if (names.indexOf(figureName) >= 0) {
          matched.push({
            id: art.id,
            title: art.title,
            summary: art.summary,
            content: art.content,
            excerpt: art.excerpt,
            era: art.era,
            relatedNames: names,
            topicIcon: topicIcon,
            topicName: topicInfo.title
          });
        }
      }
    }
    return matched;
  },

  _initDetail(figure) {
    // 记录浏览历史（仅登录态；服务端已按「同用户+同类型+同目标」去重，重复打开只会置顶）：
    // [注意] _initDetail 可能被调用两次（先命中本地缓存、再用服务端数据回填富字段），故加一次性标记，
    //    避免同一次访问写出两条。
    if (!this._historyRecorded && figure && figure.id) {
      this._historyRecorded = true;
      recordHistory('figure', figure.id, figure.name || '', '/detail-pkg/pages/detail/detail?id=' + figure.id);
    }
    // 浏览量上报（匿名，喂「热门人物 / 影响力」榜）：figure_views 此前只有 web 侧贡献，
    // 小程序漏报 → 榜上永远缺小程序流量。_initDetail 可能调用两次（本地缓存 → 服务端回填），
    // 用一次性标记避免同一次访问重复计数。
    if (!this._viewTracked && figure && figure.id) {
      this._viewTracked = true;
      this._trackView(figure.id);
    }
    // 收藏态：登录态下查用户中心收藏夹是否已收该人物（一次性，避免回填时二次查询覆盖用户刚点的态）
    if (!this._favStateLoaded) {
      this._favStateLoaded = true;
      this._loadFavState();
    }
    // 头像三级兜底：库里约 10% 的 avatar 是站内相对路径（/uploads/…），旧实现直接
    // 把它当 emoji 文本渲染，用户会看到一串路径字面量；现在图片走 <image>，其余走文本位。
    const av = buildAvatar(figure);

    // ===== 微信搜一搜：动态页面标题 =====
    // 全局 window.navigationBarTitleText 恒为「世慧屋」，53 万个人物页标题完全相同，
    // 搜索结果既无法区分，也无法命中「李白 生平」「苏轼 北宋」这类查询。
    // 官方以 wx.setNavigationBarTitle / onShareAppMessage 的标题作为页面标题来源。
    // 即使本页 navigationStyle=custom 不渲染原生导航栏，该 API 仍会写入页面标题。
    const seoTitle = buildSeoTitle(figure);
    this._seoTitle = seoTitle;
    if (wx.setNavigationBarTitle) {
      wx.setNavigationBarTitle({ title: seoTitle, fail: function () {} });
    }

    // 时间轴年份统一格式化（"建安十三年"→"208年"、"清"→"清代"，与 web 一致）
    const display = formatEventYears(figure);
    // JS 侧保留完整字段（buildProfileRows / _buildRelationData 等要用），
    // data.figure 只送裁剪版以减小跨线程载荷（见 pickFigureView 注释）
    this._fullFigure = display;
    // 详情首渲染测速：onLoad → 首次 _initDetail setData，仅上报一次
    if (!this._perfReported && this._perfT0) {
      this._perfReported = true;
      monitor.reportPerf('detail_first_render', Date.now() - this._perfT0);
    }
    const that = this;

    // 引导是否还会出现（未完成 / 有一次性重看标记）。必须在首帧就定下来：
    // 紧随其后的后台预取会立刻发关系请求，晚了图谱就已经拉回来铺在引导卡下面了。
    const guidePending = guide.shouldShow('detail') || guide.hasReplay('detail');
    this._guideHold = guidePending;

    // 生平介绍分档：短篇（≤10 行）不折叠，长篇才给「展开全部」，折叠态保留 10 行。
    // 正文与 WXML 的兜底文案保持同一口径，避免两处判断不一致。
    const bioText = figure.fullBio || figure.bio || '仅存姓名，生平事迹待考。';
    const bioFoldable = estimateBioLines(bioText) > BIO_COLLAPSE_LINES;

    // ===== 方案 B v2：派生数据一次算齐 =====
    // 首帧就把「可见分段 / 条数角标 / 有值档案行」算进同一次 setData，
    // 避免先渲染 9 个分段再收敛造成导航跳动；异步数据（相关文章 / 关系）回来后
    // 由 _refreshTabs() 增量刷新角标。
    const rows = buildProfileRows(display);
    const rowsFilled = buildProfileRowsFilled(rows);
    const workCards = buildWorkCards(display.works);
    const orgGroups = buildOrgGroups(display.organizations);
    const achievementGroups = buildAchievementGroups(display.achievements);
    const legacyGroups = buildLegacyGroups(display.legacy);
    const eraGroups = buildEraGroups(display.eraContext);
    // 年表卡片分组：有 phase 的人物按阶段分卡，无 phase 的人物退化成一张「大事年表」卡
    const timelineGroups = buildTimelineGroups(display.events);
    const timelineHasPhase = timelineGroups.some(function (g) { return g.isPhase; });
    const tabCounts = buildTabCounts({
      figure: { events: display.events },
      profileRowsFilled: rowsFilled,
      workCards: workCards,
      orgGroups: orgGroups,
      achievementGroups: achievementGroups,
      legacyGroups: legacyGroups,
      eraGroups: eraGroups,
      relatedArticles: this.data.relatedArticles,
      relationData: this.data.relationData
    });
    // 默认停在「档案」（用户 2026-11-08 规格：取消概览、档案最左且默认进入）。
    // 深链 tab=archive|timeline|relations 直接落在对应页；没有深链时保留当前标签
    // （服务端回填会再跑一次 _initDetail，不能把用户手动切过去的标签顶回档案）。
    const nextPage = this._initialTab || (this.data.pageTab || 'archive');
    // 头部「关联人物」的兜底条数：关系页按需加载前，先用详情接口自带的 relations 条数
    this._relTotalHint = (display.relations || []).length;

    this.setData({
      // 只送模板真读的字段（见 pickFigureView 注释）；下面各 *Groups 仍用完整 display 算
      // 爬虫场景传 fullText=true：渲染层需完整正文供搜一搜索引（scene 1129 识别）
      figure: pickFigureView(display, isCrawlerScene()),
      // events 数组已从 figure 视图移除，这里给顶层布尔供 WXML 判年表区是否渲染
      hasEvents: Array.isArray(display.events) && display.events.length > 0,
      pageTitle: String(figure.name || ''),
      // 顶部姓名由深色条承担（档案页吸顶条 / 年表关系页常驻条），nav-bar 不再写姓名。
      // 换人重绘时先隐藏吸顶条，等 _measureArchiveBar 量到大头部真实高度后按滚动位置结算。
      showArchiveBar: false,
      avatarView: { image: av.image, text: av.glyph || av.char },
      sealText: String(figure.name || '世').charAt(0),
      figureMeta: buildFigureMeta(display),
      // 足迹入口显隐：与足迹页同口径预检（本地精简档 events 空 ⇒ false，
      // 服务端回填后本方法重跑一次即补上）。
      // 判据从「仅 events」扩到「events ∪ 籍贯/生地/卒地」：全库只有 1.8% 的人
      // 事件可定位，但 region 填写率 64%，扩了之后入口才配得上真实数据。
      hasFootprint: hasFootprintOf(display),
      loading: false,
      // 引导进行中：关系页只给骨架，不拉关系 / 图谱（见 data.guideHold 注释）
      guideHold: guidePending,
      // 换人重绘时回到折叠态；bioFoldable 为 false 的短篇不受影响，正文照常全展示
      bioExpanded: false,
      bioFoldable: bioFoldable,
      pageTab: nextPage,
      // 档案页各分段默认全折叠（只显示标题栏与条数）
      arcOpen: { profile: false, works: false, legacy: false, eraContext: false, articles: false, organizations: false, achievements: false },
      // 标签组数据：基础档案 / 作品与成果 / 组织机构 / 成就与荣誉 / 纪念与遗产 / 时代背景
      profileRows: rows,
      profileRowsFilled: rowsFilled,
      profileTotal: rows.length,
      workCards: workCards,
      orgGroups: orgGroups,
      achievementGroups: achievementGroups,
      legacyGroups: legacyGroups,
      eraGroups: eraGroups,
      timelineGroups: timelineGroups,
      timelineHasPhase: timelineHasPhase,
      tabCounts: tabCounts,
      archiveFilled: buildArchiveFilled(tabCounts),
      heroStats: buildHeroStats(tabCounts, (display.relations || []).length),
      isThin: isThinFigure(tabCounts),
      // 双人同看入口：仅精选 + 生卒双全放开（本地精简档无 featured 字段，
      // 但本地池本身就是精选池，故只拦显式 featured=0 的记录）
      dualEntry: dualLife.canOpenDual(display),
      // 换人物重新进页时，入口回到展开态（滚动方向状态一并归零）
      dualEntryHidden: false
    }, function () {
      // 量档案页大头部高度，换算成深色吸顶条出现的滚动阈值
      that._measureArchiveBar();
      // 首屏渲染完成后再安排后台预取（不能抢首屏的带宽与主线程）
      that._schedulePrefetch();
      // 使用引导：五标签 / 关系开关 / 年表卡头都已进 DOM，再启动
      that._scheduleGuide();
    });
    this._dualLastTop = null;
    this._dualDir = 0;
    this._dualAcc = 0;

    // 先用本地数据匹配相关文章
    const localMatched = this._matchRelatedArticles(figure.name);
    if (localMatched.length > 0) {
      this.setData({ relatedArticles: localMatched }, function () { that._refreshTabs(); });
    }

    // 异步从服务器拉取最新专题数据后重新匹配
    loadServerTopics(function() {
      const serverMatched = that._matchRelatedArticles(figure.name);
      that.setData({ relatedArticles: serverMatched }, function () { that._refreshTabs(); });
    });

    // 指定初始页：只在首次渲染生效（消费后清空，服务端回填重跑 _initDetail 时按当前标签保留）；
    // 落在「关系」页时还要按需拉关系数据。
    const initialTab = this._initialTab;
    this._initialTab = null;
    if (initialTab === 'relations') this.loadRelationData();
  },

  /**
   * 量档案页大头部（.b2-hero）的真实高度，换算成深色吸顶条出现的滚动阈值。
   * [为什么用「高 - 导航高」] .b2-hero 自带 padding-top = navBarHeight + 8，
   * 其底边滚到固定导航栏下沿时，scrollTop ≈ 头部高度 - navBarHeight。
   * 到这个位置大头部才算「滚走」，此前仍由大头部承担姓名，不提前压深色条。
   * 头部高度随标签 / 三数 / 帝王胶囊变化，不能写死常量；量不到时回落到 NAV_SHOW_AT。
   */
  _measureArchiveBar() {
    if (!this.data.figure || this.data.pageTab !== 'archive') return;
    var that = this;
    this.createSelectorQuery().select('.b2-hero').boundingClientRect().exec(function (res) {
      var rect = res && res[0];
      if (!rect || !rect.height) return;
      that._archiveBarAt = Math.max(NAV_SHOW_AT, Math.round(rect.height - (that.data.navBarHeight || 0)));
      that._syncScrollState();
    });
  },

  /* ---------------- 后台预取（2026-11-09 切换提速） ---------------- */

  /**
   * 首屏稳定后的预取（2026-11-09 第二轮压紧节奏）。
   * 时间点：首帧 setData 回调 → wx.nextTick（等本次渲染提交）→ 再等 50ms 起步。
   * 三个请求按 0 / 60 / 120ms 错峰，避免同一帧集中发三个包造成首屏抖动；
   * 顺序为「关系 → 世系 → 足迹」：关系最轻、命中率最高，先发；足迹通常可直接复用
   * 详情页已拉的 `fig:<id>` 缓存（真正新增的网络请求往往只有世系一条）。
   * 失败全部静默（不弹错、不改可见状态）；爬虫落地场景不预取。
   */
  _schedulePrefetch() {
    if (isCrawlerScene()) return;
    const that = this;
    const kick = function () {
      if (that._unloaded) return;
      that._startPrefetchBurst();
    };
    // wx.nextTick 保证档案首帧已提交渲染，再让出 50ms（正常机型约 60~80ms 内起步）
    if (typeof wx.nextTick === 'function') {
      wx.nextTick(function () {
        if (that._unloaded) return;
        if (that._prefetchKickTimer) clearTimeout(that._prefetchKickTimer);
        that._prefetchKickTimer = setTimeout(kick, 50);
      });
    } else {
      if (this._prefetchKickTimer) clearTimeout(this._prefetchKickTimer);
      this._prefetchKickTimer = setTimeout(kick, 80);
    }
  },

  /** 三个预取请求按 0 / 60 / 120ms 错峰发出（不再一次性同帧并发） */
  _startPrefetchBurst() {
    const that = this;
    if (this._prefetchTimer1) clearTimeout(this._prefetchTimer1);
    if (this._prefetchTimer2) clearTimeout(this._prefetchTimer2);
    if (this._prefetchTimer3) clearTimeout(this._prefetchTimer3);
    this._prefetchTimer1 = setTimeout(function () {
      that._prefetchTimer1 = null;
      that._prefetchRelations();
    }, 0);
    this._prefetchTimer2 = setTimeout(function () {
      that._prefetchTimer2 = null;
      if (that._unloaded) return;
      that._prefetchLineage();
    }, 60);
    this._prefetchTimer3 = setTimeout(function () {
      that._prefetchTimer3 = null;
      if (that._unloaded) return;
      that._prefetchFootprint();
    }, 120);
  },

  /** 关系数据预取：命中后用户点「关系」直接渲染，不再等接口 */
  _prefetchRelations() {
    if (this._unloaded) return;
    // 引导进行中：关系 / 图谱先不拉（见 data.guideHold），引导收场后会再调一次
    if (this._guideHold) return;
    if (!this._fullFigure || this._relationDataLoaded || this._relLoading) return;
    this.loadRelationData({ silent: true });
  },

  /**
   * 预取世系树。参数必须与 lineage 页 onLoad 的请求一致（up/down=3、genLimit=6），
   * 缓存键 `lineage:v2:<id>` 才能命中；2 分钟内已拉过的不再请求（去重）。
   * v2：服务端 2026-11-09 新增父系/母系计数与节点 side，旧键缓存不含这些字段。
   */
  _prefetchLineage() {
    const figure = this._fullFigure || this.data.figure;
    if (!figure || !figure.id) return;
    const id = String(figure.id);
    const key = 'lineage:v2:' + id;
    const params = { up: 3, down: 3, genLimit: 6 };
    const hit = pageCache.getCache(key);
    if (hit && hit.age < pageCache.FRESH_MS) return;
    // 已有同键请求在路上（例如用户连点两次）：复用，不重复发
    if (pageCache.getInflight(key)) return;
    if (this._lineagePrefetching === id) return;
    this._lineagePrefetching = id;
    const that = this;
    // Promise 形态：登记在途请求，世系页进页时可直接接管，避免同一份数据请求两次
    const p = request.get(
      API.FIGURES.LINEAGE(id, { up: 3, down: 3, spouse: 1, sibling: 1, genLimit: 6 }),
      { timeout: 10000, toast: false }
    );
    pageCache.setInflight(key, { promise: p, params: params });
    p.then(function (body) {
      if (that._lineagePrefetching === id) that._lineagePrefetching = null;
      const d = body && body.success && body.data;
      if (d) pageCache.setCache(key, { params: params, data: d });
    }).catch(function () {
      // 预取失败静默：不弹错、不影响首屏，用户点世系时目标页会自己重走网络
      if (that._lineagePrefetching === id) that._lineagePrefetching = null;
    });
  },

  /**
   * 预取足迹页所需的人物事件。
   * 优先复用详情页已经拉过的完整人物（fetchFigureById 写入的 `fig:<id>`），
   * 没有才单独请求 /api/figures/:id —— 同一份数据不重复请求。
   */
  _prefetchFootprint() {
    const figure = this._fullFigure || this.data.figure;
    if (!figure || !figure.id) return;
    const id = String(figure.id);
    const key = 'footprint:' + id;
    const hit = pageCache.getCache(key);
    if (hit && hit.age < pageCache.FRESH_MS) return;
    const fig = pageCache.getCache('fig:' + id);
    if (fig && fig.data) {
      pageCache.setCache(key, fig.data);
      return;
    }
    if (pageCache.getInflight(key)) return;
    if (this._footprintPrefetching === id) return;
    this._footprintPrefetching = id;
    const that = this;
    const p = request.get(API.FIGURES.GET(id), { timeout: 10000, toast: false });
    pageCache.setInflight(key, { promise: p });
    p.then(function (body) {
      if (that._footprintPrefetching === id) that._footprintPrefetching = null;
      const d = body && body.success && body.data;
      if (!d) return;
      pageCache.setCache(key, {
        id: d.id,
        name: d.name,
        avatar: d.avatar,
        dynasty: d.dynasty,
        region: d.region,
        birthYear: d.birthYear,
        deathYear: d.deathYear,
        events: parseJsonField(d.events)
      });
    }).catch(function () {
      if (that._footprintPrefetching === id) that._footprintPrefetching = null;
    });
  },

  /**
   * 异步数据（相关文章、关系列表、档案回填）就绪后重算条数、头部三数与薄档判定。
   * 不再改当前页签 —— 用户正在看哪一页就留在哪一页。
   */
  _refreshTabs() {
    const counts = buildTabCounts(this.data);
    this.setData({
      tabCounts: counts,
      archiveFilled: buildArchiveFilled(counts),
      heroStats: buildHeroStats(counts, this._relTotalHint || 0),
      isThin: isThinFigure(counts)
    });
  },

  /** 档案页分段展开 / 折叠：每次点标题栏切换该段 */
  toggleArc(e) {
    const key = e.currentTarget.dataset.key;
    if (!key) return;
    const patch = {};
    patch['arcOpen.' + key] = !this.data.arcOpen[key];
    this.setData(patch);
  },

  /** 基础档案「展开全部 17 项 / 收起未收录字段」 */
  toggleProfileAll() {
    this.setData({ profileAllExpanded: !this.data.profileAllExpanded });
  },

  /**
   * 按需加载关系数据（用户切到「人物关系」/ 首屏空闲预取时执行）。
   *
   * @param {object}  [opts]
   * @param {boolean} [opts.silent] 后台预取：失败不弹错、不置错误态，用户可见状态零变化
   *
   * 2026-11-09 提速：
   *   · 点击切关系时先亮骨架（非 silent 路径），数据到了再填，不等网络才变色；
   *   · `_relLoading` 记录「预取在途」：用户此时点关系会复用同一次请求，不重复发；
   *   · 失败只在非 silent 路径展示错误态，静默预取失败就当没发生过。
   */
  loadRelationData(opts) {
    // 注意：WXML 里 bindtap 直接把事件对象传进来，所以必须严格判 === true，
    // 否则用户点「重新加载」会被当成静默预取（失败后错误态不出现）。
    const silent = !!(opts && opts.silent === true);
    // 用全量引用（data.figure 是裁剪版，缺 buildProfileRows 需要的字段）
    const figure = this._fullFigure || this.data.figure;
    if (!figure) return;
    if (this._relationDataLoaded) {
      // 数据已就绪：把可能残留的骨架收掉（静默预取时不碰可见状态）
      if (!silent && this.data.relationsLoading) this.setData({ relationsLoading: false });
      return;
    }
    // 切标签时 switchDock 已在同一次 setData 里点亮骨架；这里只在骨架还没亮时补一次
    if (!silent && !this.data.relationsLoading) {
      this.setData({ relationsLoading: true, relationsError: false });
    }
    // 引导进行中：连缓存都不读，只留骨架。引导收场后由 _endGuideHold 重新调本方法，
    // 届时缓存/网络都照常走，不影响既有命中逻辑。
    if (this._guideHold) return;
    if (this._relLoading) return;   // 预取在途：同一次请求，不再发第二次
    this._relLoading = true;

    const that = this;
    const doneFail = function () {
      that._relLoading = false;
      // 取不到关系 ≠ 人物不存在：回滚标记允许重试；
      // 后台预取失败必须静默（不弹错、不留错误态），用户点进来时再走一次非静默请求。
      that._relationDataLoaded = false;
      if (!silent) that.setData({ relationsLoading: false, relationsError: true });
    };

    // [注意] 本地缓存（/api/figures/all）**结构上不含 relations**，所以旧实现里
    // `figure.relations` 恒为 []，在这里就 return 了 —— 关系标签永远是空的。
    // 现在统一向服务端取：/api/figures/:id 已读 figure_relations 表。
    const cached = _relCache[String(figure.id)];
    if (cached) {
      this._relLoading = false;
      this._relationDataLoaded = true;
      this._prepareRelations(figure, cached);
      return;
    }

    fetchFigureById(figure.id, function(err, d) {
      if (err || !d) { doneFail(); return; }
      that._relLoading = false;
      // 顺手补上本地精简数据缺失的 fullBio / bio
      if (!figure.fullBio && d.fullBio) {
        const merged = {};
        for (const k in figure) merged[k] = figure[k];
        merged.fullBio = d.fullBio;
        if (d.bio && !figure.bio) merged.bio = d.bio;
        that._fullFigure = merged;               // JS 侧全量引用同步（不再往 figure 塞 relations）
        that.setData({ figure: pickFigureView(merged, isCrawlerScene()) });
      }
      that._relationDataLoaded = true;
      that._prepareRelations(that._fullFigure || that.data.figure, d.relations || []);
    });
  },

  /**
   * 关系目标可能不在本地缓存（前 2000 人之外）→ 先批量补齐名字/头像再渲染。
   * 旧实现直接用 getFigureById(targetId)，查不到就 `continue` 丢弃这条关系，
   * 于是「前 2000 人之外」的关系全部静默消失。
   */
  _prepareRelations(figure, rels) {
    const that = this;
    // 每次构建关系前清空上一次的目标临时池（模块级变量，不清会跨页累积）
    _relTargets = {};
    if (!rels || rels.length === 0) {
      this._relAll = [];
      this.setData({
        relationData: { nodes: [], links: [], relationList: [] },
        relationsLoading: false,
        relTotal: 0,
        relMore: 0
      });
      return;
    }
    const ids = [];
    for (let i = 0; i < rels.length; i++) ids.push(rels[i].targetId);
    fetchMissingTargets(ids, function() {
      that._buildRelationData(figure, rels);
    });
  },

  /** 构建 nodes / links / relationList */
  _buildRelationData(figure, relations) {
    const nodes = [];
    const links = [];
    const relationList = [];
    const nodeIds = new Set();

    nodes.push({
      id: String(figure.id),
      name: figure.name,
      avatar: figure.avatar,
      isCurrent: true
    });
    nodeIds.add(String(figure.id));

    // 统计配偶数量，用于动态分配标签（按 targetId 去重：同一人"之妻"+"皇后"两条只算一位）
    var spouseRelList = [];
    var spouseSeen = {};
    relations.forEach(function(r) {
      var d = r.description || '';
      var key = String(r.targetId);
      if (/之妻|原配|夫人|妾室|侧室|伴侣|皇后|妃子|之夫|之丈夫|夫君/.test(d) && !spouseSeen[key]) {
        spouseSeen[key] = true;
        spouseRelList.push(r.targetId);
      }
    });
    var spouseCount = spouseRelList.length;
    var spouseLabelMap = {};
    if (spouseCount > 1) {
      spouseRelList.forEach(function(tid, idx) {
        if (idx === 0) spouseLabelMap[tid] = '原配';
        else {
          var numArr = ['二', '三', '四', '五', '六', '七', '八', '九', '十'];
          spouseLabelMap[tid] = (idx - 1 < numArr.length) ? numArr[idx - 1] + '夫人' : String(idx + 1) + '夫人';
        }
      });
    }

    let missTargets = 0;
    for (const rel of relations) {
      // resolveFigure：本地缓存 + 服务端 /batch 补齐（旧实现只用本地，
      // 前 2000 人之外的目标一律 continue 丢弃）
      const target = resolveFigure(rel.targetId);
      if (!target) { missTargets++; continue; }

      // 关系大类：表来源的关系没有 category 字段，旧实现标签恒空、颜色恒灰
      const category = rel.category || getRelationCategory(rel.type);
      const categoryColor = RELATION_COLORS[category] || '#8a8375';

      var displayType = getSortRole(rel.description || '', rel.type || '', target.name);
      // 兜底：如果解析失败，从描述中提取标签（方向感知），避免显示英文
      if (!displayType || displayType === rel.type) {
        displayType = extractRelationLabel(rel.description || '', target.name);
      }
      if (!displayType) {
        displayType = rel.type || '';
      }
      // 父亲/母亲反向映射时根据性别修正：张闾瑛应为"女儿"而非"儿子"
      if (target.tags && target.tags.indexOf('女性') >= 0) {
        if (displayType === '儿子') displayType = '女儿';
        if (displayType === '兄弟') displayType = '姐妹';
        if (displayType === '兄长' || displayType === '哥哥') displayType = '姐姐';
        if (displayType === '弟弟') displayType = '妹妹';
        if (displayType === '孙子') displayType = '孙女';
        if (displayType === '侄子') displayType = '侄女';
        if (displayType === '曾孙') displayType = '曾孙女';
        if (displayType === '外孙') displayType = '外孙女';
        if (displayType === '养子') displayType = '养女';
        if (displayType === '外甥') displayType = '外甥女';
      }
      if (target.tags && target.tags.indexOf('男性') >= 0) {
        if (displayType === '女儿') displayType = '儿子';
        if (displayType === '姐妹') displayType = '兄弟';
        if (displayType === '姐姐') displayType = '兄长';
        if (displayType === '妹妹') displayType = '弟弟';
        if (displayType === '孙女') displayType = '孙子';
        if (displayType === '侄女') displayType = '侄子';
        if (displayType === '曾孙女') displayType = '曾孙';
        if (displayType === '外孙女') displayType = '外孙';
        if (displayType === '养女') displayType = '养子';
        if (displayType === '外甥女') displayType = '外甥';
      }
      // 动态配偶标签：多配偶时用具体标签覆盖
      if (spouseLabelMap[rel.targetId]) {
        displayType = spouseLabelMap[rel.targetId];
      }

      // [重要] 过滤「泛关系」（2026-09-16）：与首页相关人员、独立图谱页保持一致，
      //    赠诗/下属为Y/战胜/处决/纳降 等事件谓词不进图谱节点，避免挤成团看不清。
      if (isGenericRelation({ _relationType: displayType, _relationDesc: rel.description || '' }, figure.id)) {
        continue;
      }

      // 过滤后才 push 节点，避免孤点（有关系记录但被过滤的目标不占位）
      if (!nodeIds.has(String(rel.targetId))) {
        nodes.push({
          id: String(rel.targetId),
          name: target.name,
          avatar: target.avatar,
          tags: target.tags || []
        });
        nodeIds.add(String(rel.targetId));
      }

      links.push({
        source: String(figure.id),
        target: String(rel.targetId),
        category: category,
        type: rel.type,
        displayType: displayType,
        description: rel.description
      });

      var relAv = buildAvatar(target);
      relationList.push({
        targetId: rel.targetId,
        name: target.name,
        avatar: target.avatar,
        // 图片位（绝对地址）+ 文本位（emoji 字形 / 姓名首字），WXML 按 avatarImage 有无二选一
        avatarImage: relAv.image,
        avatarText: relAv.glyph || relAv.char,
        category: category,
        type: rel.type,
        displayType: displayType,
        description: rel.description,
        _relationType: displayType,      // sortRelated 需要的字段名
        _relationDesc: rel.description || '',  // sortRelated 需要的字段名
        color: categoryColor
      });
    }

    // 关系人排序：传入中心人物关系网 + 标签映射，供「岳父随女儿排行」推导
    // （例：张作霖的两位岳父，赵占元/原配之父 应排在 寿山/五夫人之父 之前）
    var detailRelationOf = {};
    relationList.forEach(function (r) {
      detailRelationOf[String(r.targetId)] = { _relationType: r._relationType, _relationDesc: r._relationDesc, name: r.name };
    });
    relationList.sort(sortRelated(figure, { relations: relations, relationOf: detailRelationOf }));

    // [重要] 兜底（2026-10-31）：库里明明有 N 条关系，最后却一条都没渲染出来，
    //    且确实是「目标没解析到」而不是「被泛关系过滤」⇒ 说明 /batch 没补齐目标。
    //    此时绝不能下发一个只剩中心的空图——用户会理解成「此人在库里没有亲属」，
    //    与世系树的「静默归 C 档」同类，属于当着用户撒谎。改为明确报失败并给重试入口。
    if (relations.length > 0 && relationList.length === 0 && missTargets > 0) {
      this.setData({
        relationData: { nodes: [], links: [], relationList: [] },
        relationsLoading: false,
        relationsError: true,
        relTotal: 0,
        relMore: 0
      });
      return;
    }

    // 关系到位后重建基础档案「家庭」行：本地缓存（/api/figures/all）不含 relations，
    // 首屏那次 buildProfileRows 拿不到家庭成员，这里用已补齐 target 名称的关系重算一次。
    const figureWithRelations = {};
    for (const k in figure) figureWithRelations[k] = figure[k];
    figureWithRelations.relations = relations;

    // 全量关系留在 JS 侧，data 只送首屏一批（供 showMoreRelations 追加）
    this._relAll = relationList;

    this.setData({
      // 分页：50 条以上关系的 701 人一次全渲染会明显掉帧（每条含头像 <image>），
      // 首屏只送前 REL_PAGE 条，剩余挂「展开更多」按批追加。
      // nodes / links 是给图谱组件的，不截断（图谱有自己的布局与裁剪）。
      relationData: { nodes: nodes, links: links, relationList: relationList.slice(0, REL_PAGE) },
      relationsLoading: false,
      relTotal: relationList.length,
      relMore: Math.max(0, relationList.length - REL_PAGE),
      profileRows: buildProfileRows(figureWithRelations),
      profileRowsFilled: buildProfileRowsFilled(buildProfileRows(figureWithRelations))
    }, () => {
      // 关系列表回填后刷新「人物关系」角标与薄档判定
      this._refreshTabs();
    });
  },

  /** 关系列表「展开更多」：按 REL_PAGE 一批追加，全部展开后按钮消失 */
  showMoreRelations() {
    var all = this._relAll || [];
    var shown = (this.data.relationData.relationList || []).length;
    var next = all.slice(0, shown + REL_PAGE);
    this.setData({
      'relationData.relationList': next,
      relMore: Math.max(0, all.length - next.length)
    });
  },

  /**
   * 关系页「图谱 / 列表」切换（2026-11-09 取代「| 人物关系 N 位」标题栏）。
   * 只改 relView，不重新请求、不重排数据：两个视图共用同一份 relationData。
   * 切回图谱时 <relation-graph> 会重新挂载（wx:if），ec-canvas 自行初始化。
   */
  switchRelView(e) {
    const view = e.currentTarget.dataset.view;
    if (view !== 'graph' && view !== 'list') return;
    if (view === this.data.relView) return;
    this.setData({ relView: view });
  },

  // 头像图加载失败（个别 /uploads 图片可能缺失）→ 清空图片位，回落到文本位
  onAvatarError() {
    this.setData({ 'avatarView.image': '' });
  },

  // 关系人头像图加载失败 → 同样回落到文本位
  onRelationAvatarError(e) {
    const idx = Number(e.currentTarget.dataset.index);
    if (isNaN(idx)) return;
    const patch = {};
    patch['relationData.relationList[' + idx + '].avatarImage'] = '';
    this.setData(patch);
  },

  toggleBio() {
    // 仅长文有此开关：折叠态保留 10 行，展开看全文；短篇不显示按钮，无需量高
    const expand = !this.data.bioExpanded;
    const patch = { bioExpanded: expand };
    // [性能] fullBio 首帧是截断预览；展开时从 _fullFigure 补全文，折叠时再截回，
    // 让渲染层始终只持当前所需的文本量（爬虫场景首帧已是全文，无 truncated 标记，跳过）。
    if (this.data.figure && this.data.figure.fullBioTruncated) {
      const full = (this._fullFigure && this._fullFigure.fullBio) || '';
      if (expand && full) {
        patch['figure.fullBio'] = full;
        patch['figure.fullBioTruncated'] = false;
      }
    } else if (!expand && this.data.figure && !this.data.figure.fullBioTruncated &&
               this._fullFigure && typeof this._fullFigure.fullBio === 'string' &&
               this._fullFigure.fullBio.length > BIO_PREVIEW_LEN) {
      patch['figure.fullBio'] = this._fullFigure.fullBio.slice(0, BIO_PREVIEW_LEN) + '…';
      patch['figure.fullBioTruncated'] = true;
    }
    this.setData(patch);
  },

  /** 底部五标签统一入口（共享模板 templates/dock/dock.wxml 绑定的事件名） */
  onDockTap(e) {
    this.switchDock(e);
  },

  /**
   * 底部五标签切换（2026-11-08 整合版）。
   *   archive / timeline / relations → 本页内切换，只渲染对应内容；
   *   lineage / footprint → 直接跳现有分包页，样式与线上完全一致（用户要求「沿用现有」）。
   * 切换后回到页顶：首屏大头部只在档案页显示，页内切换若停在半截会被甩到内容中段。
   */
  switchDock(e) {
    const tab = e.currentTarget.dataset.tab;
    if (!tab) return;
    if (tab === 'lineage') { this.goLineage(); return; }
    if (tab === 'footprint') { this.goFootprint(); return; }
    this.setDockTab(tab);
  },

  /**
   * 切到档案 / 年表 / 关系。
   * 供本页 dock 与世系 / 足迹页跨页调用：子页面点这三个标签时，先对栈里的详情页调本方法，
   * 再 navigateBack 回来，保证「返回一次即落在目标标签」，不叠页、不用返回两次。
   * opts.deferScroll：跨页调用时本页还在后台，wx.pageScrollTo 作用不到，
   * 改为标记 _pendingDockScroll，由 onShow 回前台后的下一帧回顶。
   */
  setDockTab(tab, opts) {
    if (!tab || tab === 'lineage' || tab === 'footprint') return;
    if (tab === this.data.pageTab) {
      // 同标签：只回顶；跨页调用时同样延后到 onShow 再滚（后台滚不到本页）
      if (opts && opts.deferScroll) { this._scrollTop = 0; this._pendingDockScroll = true; }
      else this.scrollToTop();
      return;
    }
    // 切 tab 先收起档案页的深色吸顶条：档案页首屏有大头部、年表 / 关系页有常驻吸顶条，
    // 顶部姓名均由深色条承担，nav-bar 不再重复写名字（2026-11-08 统一顶部样式）。
    // 切换后一律回到顶部，先把手上的滚动位置归零，避免重绘瞬间按旧位置误显示吸顶条；
    // 回到档案页时大头部重新渲染，量一次高度让吸顶条的滚动阈值跟上。
    var that = this;
    this._scrollTop = 0;
    // 点击即时反馈（2026-11-09）：高亮与容器在**同一次 setData** 里切换；
    // 关系页同时点亮骨架，数据回来再填内容 —— 不等网络才变色。
    var patch = { pageTab: tab, showArchiveBar: false, pendingTab: '', dualEntryHidden: false };
    // 切 tab 后都是回到顶部，方向状态一并归零，避免带着上一次的收起态进来
    this._dualLastTop = null;
    this._dualDir = 0;
    this._dualAcc = 0;
    if (tab === 'relations' && !this._relationDataLoaded) {
      patch.relationsLoading = true;
      patch.relationsError = false;
    }
    this.setData(patch, function () {
      if (tab === 'archive') that._measureArchiveBar();
    });
    if (opts && opts.deferScroll) this._pendingDockScroll = true;
    else this.scrollToTop();
    if (tab === 'relations') this.loadRelationData();
  },

  /**
   * 关系链浏览用 navigateTo，**不是** redirectTo。
   * 旧实现用 redirectTo 把当前页替换掉：A → B → C 按返回会直接跳出到进入 A 之前的
   * 页面，B、C 全丢。人物关系是这页的核心路径（48.7% 的人有边）。
   * navigateTo 有 10 层栈深限制，navTo 封装会在溢出时提示「页面层级过深」而不是静默无响应。
   */
  goToFigure(e) {
    const id = e.detail && e.detail.id ? e.detail.id : e.currentTarget.dataset.id;
    if (!id) return;
    // 图谱中心节点也会派发 nodeclick，点到自己不该再压一层
    if (String(id) === String(this._figureId)) return;
    navTo('/detail-pkg/pages/detail/detail?id=' + id);
  },

  /** 正文滚动：只在跨越阈值时 setData，避免每个 scroll 事件都跨线程。
      2026-10-22：正文改为页面级滚动（canvas 不能在 scroll-view 内，见 detail.wxml 注释），
      监听从 scroll-view 的 bindscroll 换成页面生命周期 onPageScroll，参数直接取 e.scrollTop。 */
  onPageScroll(e) {
    // 记录绝对滚动位置，供回顶阈值与档案页吸顶条判断使用（必须在降频之前，否则会用旧值）
    this._scrollTop = e.scrollTop || 0;
    // 双人入口按滚动方向收起 / 展开：逐事件判定（降频会丢掉方向信息），
    // 但只在方向真正翻转时 setData 一次，开销可忽略。
    this._syncDualEntry(this._scrollTop);
    // 降频：滚动事件高频触发，至少间隔 100ms 才评估一次（阈值翻转本身已限制 setData 次数）
    const now = Date.now();
    if (now - (this._lastScrollCheck || 0) >= 100) {
      this._lastScrollCheck = now;
      this._syncScrollState();
      return;
    }
    // [重要] 降频窗口内不能把事件直接丢掉：用户甩一下就停手时，最后一个 scroll 事件
    //   常常落在上一个事件的 100ms 内，被丢掉后吸顶条会停在旧状态（== 该出现时没出现）。
    //   这里补一次尾随评估（同一窗口只留一个定时器，不做队列）。
    if (this._scrollSyncTimer) return;
    const that = this;
    this._scrollSyncTimer = setTimeout(function () {
      that._scrollSyncTimer = null;
      that._lastScrollCheck = Date.now();
      that._syncScrollState();
    }, 100);
  },

  /**
   * 年表 tab「双人生命线」入口的方向联动显隐。
   * 判据只看「同方向累计位移」：低于阈值的手抖不计；方向一翻转就清零重算。
   * 顶部 24px 内恒定展开，回顶时一定是展开态，避免停在收起态让人找不到入口。
   */
  _syncDualEntry(st) {
    if (this.data.pageTab !== 'timeline' || !this.data.dualEntry) return;
    var last = this._dualLastTop;
    this._dualLastTop = st;
    if (st <= DUAL_ENTRY_TOP) {
      this._dualDir = 0;
      this._dualAcc = 0;
      if (this.data.dualEntryHidden) this.setData({ dualEntryHidden: false });
      return;
    }
    if (last == null) return;
    var delta = st - last;
    if (!delta) return;
    var dir = delta > 0 ? 1 : -1;
    if (dir !== this._dualDir) {
      this._dualDir = dir;
      this._dualAcc = 0;
    }
    this._dualAcc = (this._dualAcc || 0) + Math.abs(delta);
    if (this._dualAcc < DUAL_HIDE_DELTA) return;
    this._dualAcc = 0;
    var wantHide = dir > 0;
    if (wantHide !== !this.data.dualEntryHidden) {
      this.setData({ dualEntryHidden: wantHide });
    }
  },

  /** 把滚动位置结算成回顶按钮 / 档案页深色吸顶条的显隐（只在值真的变了才 setData） */
  _syncScrollState() {
    const st = this._scrollTop || 0;
    // 阈值按屏高（onLoad 里算好），不再硬编码 600
    const show = st > (this._topThreshold || 600);
    // 档案页：大头部底边越过导航栏下沿后，顶部换成与年表页同款的深色吸顶条；
    // 年表 / 关系页的深色条常驻，与滚动无关。阈值由 _measureArchiveBar 量得。
    const barWant = this.data.pageTab === 'archive' && st > (this._archiveBarAt || NAV_SHOW_AT);
    if (show !== this.data.showTop || barWant !== this.data.showArchiveBar) {
      this.setData({ showTop: show, showArchiveBar: barWant });
    }
  },

  /** 回到顶部：页面级滚动走 wx.pageScrollTo（原 scroll-into-view 锚点方案依赖 scroll-view） */
  scrollToTop() {
    // [重要] 必须带 fail：内容不足一屏（短档案）时页面根本没有滚动量，
    //    pageScrollTo 等不到滚动动画结束，工具里会报
    //    `SystemError (appServiceSDKScriptError) timeout`。此时本来就在顶部，
    //    失败即达成目的，静默即可。
    wx.pageScrollTo({ scrollTop: 0, duration: 300, fail: function () {} });
  },

  /**
   * 一生足迹：跳足迹页并带 id 深链（足迹页 onLoad 会直接加载该人物）。
   *
   * [重要] 底部「足迹」标签恒显（五标签固定），不能再靠入口显隐兜底，这里必须守一道：
   *    hasFootprint 是按**进页时手上的 events** 算的；本地精简档 events 恒空、
   *    服务端回填后 _initDetail 会重跑才补上。弱网回填慢 + 用户手快点击的窗口确实存在，
   *    与其让人白跳一次看空态，不如当场说清楚。
   *    判据与 hasFootprint 同源（utils/footprint-locate），两端不会打架。
   */
  goFootprint() {
    const full = this._fullFigure;
    const id = (full && full.id) || (this.data.figure && this.data.figure.id);
    if (!id) return;
    // 只有手上确实有完整 events 时才敢下结论；拿不到就放行，让足迹页自己的空态兜底。
    // 判据与入口显隐同源（含籍贯/生地/卒地兜底），否则会出现「入口可见却被拦」的矛盾。
    if (full && Array.isArray(full.events) && full.events.length && !hasFootprintOf(full)) {
      wx.showToast({ title: '该人物暂无可定位的地名', icon: 'none' });
      return;
    }
    // 点下去立刻有反馈（2026-11-09）：先预取数据、点亮底栏，再跳分包页
    this._prefetchFootprint();
    this._navToSubPage('footprint', '/footprint-pkg/pages/footprint/footprint?id=' + id);
  },

  /**
   * 世系 / 足迹的跳转反馈（2026-11-09 切换提速）。
   *   · 手指抬起瞬间先点亮底栏（pendingTab），不让人怀疑「点了没反应」；
   *   · 150ms 后才出「正在打开…」遮罩：跳得快的机型不会闪一下，分包下载慢时遮罩一直在；
   *   · navTo 模块级有在途锁，个别情况下 complete 不回调，另加 3s 兜底收尾。
   */
  _navToSubPage(tab, url) {
    const that = this;
    this.setData({ pendingTab: tab });
    const title = tab === 'lineage' ? '正在打开世系' : '正在打开足迹';
    let shown = false;
    if (this._openTimer) clearTimeout(this._openTimer);
    this._openTimer = setTimeout(function () {
      that._openTimer = null;
      if (isCrawlerScene()) return;
      shown = true;
      wx.showLoading({ title: title, mask: false });
    }, 150);
    const finish = function () {
      if (that._openTimer) { clearTimeout(that._openTimer); that._openTimer = null; }
      if (shown) {
        shown = false;
        try { wx.hideLoading(); } catch (e) { /* ignore */ }
      }
      if (!that._unloaded && that.data.pendingTab) that.setData({ pendingTab: '' });
    };
    if (this._openFallback) clearTimeout(this._openFallback);
    this._openFallback = setTimeout(function () {
      that._openFallback = null;
      finish();
    }, 3000);
    navTo(url, {
      complete: function () {
        if (that._openFallback) { clearTimeout(that._openFallback); that._openFallback = null; }
        finish();
      }
    });
  },

  /**
   * 世系家族树。带上姓名只为让世系页首屏标题不空一下——它会自己再取一次准确值。
   * 不做数据门控：没亲属的人点进去看到的是状态卡（有关系图谱与同代人物两个出口），
   * 那也是有效答案；反过来在入口处拦一道，需要先请求一次 lineage 才知道拦不拦，
   * 等于每开一个详情页都多一次请求。
   */
  goLineage() {
    const full = this._fullFigure;
    const id = (full && full.id) || (this.data.figure && this.data.figure.id);
    if (!id) return;
    // 点下去立刻有反馈（2026-11-09）：先预取数据、点亮底栏，再跳分包页
    this._prefetchLineage();
    this._navToSubPage('lineage', '/lineage-pkg/pages/lineage/lineage?id=' + id);
  },

  /** 无关系人物的出口：去时间线按生年/卒年看同期人物（年份不可知则落总览） */
  goTimeline() {
    const f = this._fullFigure || {};
    // 生卒字段是「公历日期（传统纪年）」复合串，取第一个数字即公历年；
    // 公元前是文本「约公元前551年」⇒ 必须先判「前」再取绝对值，绝不能直接取负数
    const raw = String(f.birthYear || f.deathYear || '');
    const m = raw.match(/\d{1,4}/);
    const y = m ? (/前/.test(raw) ? -parseInt(m[0], 10) : parseInt(m[0], 10)) : 0;
    navTo('/timeline-pkg/pages/timeline/timeline' + (y ? '?year=' + y : ''));
  },

  onReadArticle(e) {
    var id = e.currentTarget.dataset.id;
    var articles = this.data.relatedArticles;
    for (var i = 0; i < articles.length; i++) {
      if (articles[i].id === id) {
        var art = articles[i];
        // 浮层底部「上一篇 / 下一篇」：按「相关文章」列表顺序翻；边界侧压暗
        var navFlags = {
          hasPrev: i + 1 < articles.length,
          hasNext: i - 1 >= 0
        };
        // lite 接口不带正文：先开浮层（标题+摘要已够看），再按需取全文。
        // 这样「只想扫一眼标题」的用户永远不会下载正文。
        if (art.content) {
          this.setData({ currentArticle: Object.assign({}, art, navFlags) });
          return;
        }
        this.setData({ currentArticle: Object.assign({}, art, navFlags, { contentLoading: true }) });
        this._loadArticleBody(art.id);
        break;
      }
    }
  },

  /**
   * 浮层底部「上一篇 / 下一篇」：在「相关文章」列表内翻，不跳页。
   * 与 onReadArticle 一样，lite 数据没有正文时按 id 补取全文。
   */
  onOverlayNav(e) {
    var dir = (e.detail && e.detail.dir) || '';
    var cur = this.data.currentArticle;
    if (!cur || !dir) return;
    var list = this.data.relatedArticles || [];
    var idx = -1;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === cur.id) { idx = i; break; }
    }
    if (idx < 0) return;
    var ni = dir === 'prev' ? idx + 1 : idx - 1;
    if (ni < 0 || ni >= list.length) return;
    var art = list[ni];
    var flags = { hasPrev: ni + 1 < list.length, hasNext: ni - 1 >= 0 };
    if (art.content) {
      this.setData({ currentArticle: Object.assign({}, art, flags) });
      return;
    }
    this.setData({ currentArticle: Object.assign({}, art, flags, { contentLoading: true }) });
    this._loadArticleBody(art.id);
  },

  /**
   * 按需取单篇正文（lite 列表的配套）。
   * 失败时不弹 toast：浮层里已有标题与摘要，弹窗反而打断阅读；
   * 只把 contentLoading 撤掉，让浮层退回「显示摘要」的形态。
   */
  _loadArticleBody(articleId) {
    var that = this;
    if (!articleId) return;
    var seq = (this._artBodySeq || 0) + 1;
    this._artBodySeq = seq;
    request({
      timeout: 12000,
      url: API.ARTICLES.GET(articleId),
      success: function (res) {
        if (that._artBodySeq !== seq) return;
        // 浮层已被关闭 / 已切到别的文章：丢弃这次结果
        var cur = that.data.currentArticle;
        if (!cur || String(cur.id) !== String(articleId)) return;
        var d = (res && res.data) || {};
        var full = (d.success && d.data) ? parseArticle(d.data) : null;
        that.setData({
          currentArticle: Object.assign({}, cur, {
            content: (full && full.content) || '',
            // 顺带回填关联人物（lite 不返回 relatedFigures，浮层该区块原本是空的）
            relatedFigures: (full && full.relatedFigures) || cur.relatedFigures || [],
            // 参考文献与关键词同样来自全量接口，lite 下为空
            citations: (full && full.citations) || cur.citations || [],
            keywords: (full && full.keywords) || cur.keywords || '',
            contentLoading: false
          })
        });
      },
      fail: function () {
        if (that._artBodySeq !== seq) return;
        var cur = that.data.currentArticle;
        if (!cur || String(cur.id) !== String(articleId)) return;
        that.setData({ 'currentArticle.contentLoading': false });
      }
    });
  },

  onCloseArticle() {
    // 关闭时作废在途的正文请求，避免结果回来又把浮层顶开
    this._artBodySeq = (this._artBodySeq || 0) + 1;
    this.setData({ currentArticle: null });
  },

  /* ==================== 双人生命线（2026-11-15） ====================
   * 「年表」tab 底部入口 → 半屏选人 → 双人视图页。
   * 候选来源优先级：
   *   ① figures.js 已装载的本地精选池（含生卒年，零额外请求）；
   *   ② /api/figures/all?slim=1&limit=2000（本地池为空时兜底）；
   *   ③ 搜索词在本地池无命中时，走 /api/figures/search 覆盖池外人物。
   * 所有候选都先经 utils/dual-life.js 过滤：双缺者不出现，缺一端者单列一组。
   */

  openDualPicker() {
    if (!this.data.dualEntry) return;
    this.setData({
      dualPickerOpen: true,
      dualPickerLoading: true,
      dualPickerKeyword: '',
      dualPickerSelected: null,
      dualPickerGroups: [],
      dualPickerTip: ''
    });
    const that = this;
    this._loadDualPool(function (err, pool) {
      if (err || !pool || !pool.length) {
        that.setData({
          dualPickerLoading: false,
          dualPickerTip: '候选人物加载失败，请检查网络后重试'
        });
        return;
      }
      that._pool = pool;
      that._renderDualCandidates('');
      that.setData({ dualPickerLoading: false });
    });
  },

  closeDualPicker() {
    this.setData({ dualPickerOpen: false });
  },

  /** 半屏面板内的滚动不带动页面 */
  noop() {},

  /** 取候选池：本地精选池优先，空则请求全量池（并发去重 + 模块级缓存） */
  _loadDualPool(cb) {
    const local = figuresStore.figures;
    if (local && local.length > 100) {
      cb(null, local);
      return;
    }
    if (_dualPool) {
      cb(null, _dualPool);
      return;
    }
    if (_dualPoolPromise) {
      _dualPoolPromise.then(function (list) { cb(null, list); }, function (err) { cb(err); });
      return;
    }
    _dualPoolPromise = request.get(API.FIGURES.ALL + '?slim=1&limit=2000', { timeout: 20000, toast: false })
      .then(function (body) {
        const list = (body && Array.isArray(body.data)) ? body.data : [];
        _dualPool = list;
        _dualPoolPromise = null;
        return list;
      });
    _dualPoolPromise.then(function (list) { cb(null, list); }, function (err) {
      _dualPoolPromise = null;
      cb(err);
    });
  },

  /** 把候选池按「同时代 / 其他时代 / 年份不全」分组渲染 */
  _renderDualCandidates(keyword, poolOverride) {
    const center = this._fullFigure || this.data.figure || {};
    const kw = String(keyword || '').trim();
    const pool = poolOverride || this._pool || [];
    const list = kw
      ? pool.filter(function (p) { return String((p && p.name) || '').indexOf(kw) >= 0; })
      : pool;
    const g = dualLife.rankCandidates(center, list, 12);
    const dyn = String(center.dynasty || '');
    const groups = [];
    if (g.sameDynasty.length) {
      groups.push({ key: 'same', title: dyn ? dyn + ' · 同时代' : '同时代', sub: '按并存年数排序', items: g.sameDynasty });
    }
    if (g.others.length) {
      groups.push({ key: 'other', title: '其他时代', sub: '跨时代也能同看', items: g.others });
    }
    if (g.partial.length) {
      groups.push({ key: 'partial', title: '年份不全', sub: '只能看单线，并存区间标待补', items: g.partial });
    }
    let tip = '';
    if (!groups.length) {
      tip = kw ? '没有找到生卒年可算的「' + kw + '」' : '候选人物暂不可用';
    }
    this.setData({ dualPickerGroups: groups, dualPickerTip: tip });
  },

  /** 搜索词在本地池无命中时，走服务端搜索兜底（只取有年份的） */
  _searchDualRemote(keyword) {
    if (this._dualSearching) return;
    this._dualSearching = true;
    const that = this;
    request.get(API.FIGURES.SEARCH + '?search=' + encodeURIComponent(keyword) + '&pageSize=30', { timeout: 10000, toast: false })
      .then(function (body) {
        that._dualSearching = false;
        const list = (body && body.data && body.data.list) || [];
        that._renderDualCandidates('', list);
      })
      .catch(function () {
        that._dualSearching = false;
      });
  },

  onDualSearchInput(e) {
    const kw = String((e.detail && e.detail.value) || '');
    this.setData({ dualPickerKeyword: kw });
    if (this._dualSearchTimer) clearTimeout(this._dualSearchTimer);
    const that = this;
    this._dualSearchTimer = setTimeout(function () {
      that._renderDualCandidates(kw);
      const groups = that.data.dualPickerGroups || [];
      let total = 0;
      groups.forEach(function (g) { total += (g.items || []).length; });
      // 本地精选池没有命中 → 服务端搜（覆盖池外人物），结果同样只保留有年份的
      if (kw && total === 0) that._searchDualRemote(kw);
    }, 350);
  },

  pickDualCandidate(e) {
    const d = e.currentTarget.dataset || {};
    const id = String(d.id || '');
    if (!id) return;
    const cur = this.data.dualPickerSelected;
    if (cur && String(cur.id) === id) {
      this.setData({ dualPickerSelected: null });
      return;
    }
    this.setData({
      dualPickerSelected: { id: id, name: String(d.name || ''), yearsText: String(d.years || '') }
    });
  },

  confirmDualPick() {
    const sel = this.data.dualPickerSelected;
    if (!sel) {
      wx.showToast({ title: '先选一位要同看的人', icon: 'none' });
      return;
    }
    const a = String(this._figureId || (this.data.figure && this.data.figure.id) || '');
    if (!a) return;
    this.setData({ dualPickerOpen: false });
    navTo('/detail-pkg/pages/dual/dual?a=' + encodeURIComponent(a) + '&b=' + encodeURIComponent(sel.id));
  },

  /**
   * 收藏态查询（人物）：与文章页匿名 device-key 收藏是两套系统——
   * 这里走用户中心「收藏夹」接口（collections，type=figure），与「我的收藏」同源，
   * 也是帮助文案「在人物详情页或文章页点击收藏」承诺的行为。该接口需要登录态。
   * 未登录时不查，faved 保持 false（按钮仍可点，点击时引导登录）。
   */
  _loadFavState() {
    const self = this;
    const token = authStore.get('userToken') || '';
    if (!token) return;
    request({
      url: API.USER.COLLECTIONS + '?type=figure',
      method: 'GET',
      auth: true,
      timeout: 8000,
      success(res) {
        const d = res.data || {};
        if (!d.success || !Array.isArray(d.data)) return;
        const id = String(self._figureId);
        let faved = false;
        for (const col of d.data) {
          const items = col.items || [];
          for (const it of items) {
            if (String(it.refId) === id) { faved = true; break; }
          }
          if (faved) break;
        }
        self.setData({ faved });
      },
      fail() { /* 收藏态非关键，失败静默 */ }
    });
  },

  /** 收藏 / 取消收藏（人物）。乐观更新 + 失败回滚；需登录态，未登录引导去登录。 */
  onToggleFav() {
    if (this.data.favBusy) return;
    const token = authStore.get('userToken') || '';
    if (!token) {
      wx.showToast({ title: '登录后收藏', icon: 'none' });
      // 用户中心是 tabBar 页：navigateTo 会 fail（不能跳 tab 页），必须 switchTab
      wx.switchTab({ url: '/pages/profile/profile' });
      return;
    }
    const self = this;
    const id = String(this._figureId);
    const next = !this.data.faved;
    this.setData({ favBusy: true, faved: next });
    const done = (ok, msg) => {
      self.setData({ favBusy: false });
      if (!ok) {
        self.setData({ faved: !next }); // 回滚
        wx.showToast({ title: msg || '操作失败', icon: 'none' });
      } else {
        wx.showToast({ title: next ? '已收藏' : '已取消收藏', icon: 'none' });
      }
    };
    if (next) {
      // 加入默认收藏夹（type=figure，服务端按 refId 去重）
      request({
        url: API.USER.COLLECTIONS,
        method: 'POST',
        auth: true,
        timeout: 8000,
        header: { 'Content-Type': 'application/json' },
        data: {
          refId: id,
          type: 'figure',
          title: (this.data.figure && this.data.figure.name) || '',
          url: '/detail-pkg/pages/detail/detail?id=' + id
        },
        success(res) {
          const d = res.data || {};
          done(d.success, d.message);
        },
        fail() { done(false); }
      });
    } else {
      request({
        url: API.USER.COLLECTION_DELETE(id) + '?type=figure',
        method: 'DELETE',
        auth: true,
        timeout: 8000,
        success(res) {
          const d = res.data || {};
          done(d.success, d.message);
        },
        fail() { done(false); }
      });
    }
  },

  /** 浏览量上报：匿名 POST /api/stats/track，喂「热门人物 / 影响力」榜。失败静默。 */
  _trackView(id) {
    request({
      url: API.STATS.TRACK,
      method: 'POST',
      timeout: 5000,
      data: { type: 'figure', figureId: String(id) },
      success() {},
      fail() {}
    });
  },

  onShareAppMessage() {
    const figure = this.data.figure;
    const name = figure ? figure.name : '历史人物';
    // 与 wx.setNavigationBarTitle 用同一份标题：官方以这两处作为搜一搜页面标题来源，
    // 保持一致可避免「搜索结果标题」与「分享标题」互相覆盖成不同文本。
    return {
      title: this._seoTitle || (name + ' - 世慧屋 · 历史人物关系图谱'),
      path: '/detail-pkg/pages/detail/detail?id=' + (this._figureId || (figure && figure.id) || ''),
      imageUrl: shareImageUrl(this)
    };
  },

  onShareTimeline() {
    const figure = this.data.figure;
    const name = figure ? figure.name : '历史人物';
    const id = this._figureId || (figure && figure.id) || '';
    // [重要] 必须带 query：朋友圈单页模式打开时只会带上这里返回的参数，
    //    缺了 id，页面 onLoad 拿不到 options.id ⇒ 直接落到「参数错误」。
    //    （微信要求 query 是不含 '?' 的查询串，与 onShareAppMessage 的 path 不同）
    return {
      title: name + ' - 世慧屋',
      query: id ? 'id=' + id : '',
      imageUrl: shareImageUrl(this)
    };
  }
});
