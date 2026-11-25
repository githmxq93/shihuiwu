/**
 * 世系家族树
 *
 * 核心原则：**前端零推断**。
 * `figure_relations.type` 有 719 个词，「直系 / 旁系 / 姻亲 / 社会关系」的边界
 * （女婿 / 舅父 / 族兄弟 / 嫡母 / 嗣子）在端上枚举必错，错一档就是
 * 「把女婿画成亲儿子」或「明明有亲属却显示本库未收录」。
 * 所以档位（axis / kinship / none）、代次、折叠总数、基线数字一律由服务端给。
 *
 * 前端只做四件事：① 按 mode 选版式 ② 折叠的展开 ③ 点节点换中心 ④ 出口跳转。
 * 所有展示用字符串（头像首字、副文、占位文案）都在这里算好——
 * 放 WXML 里做条件嵌套既难读，也容易两处文案打架（占位卡曾经同时显示
 * 「子辈未收录」和「子嗣未载」两句话）。
 */
// 注意：config/api.js 是 `module.exports = API`（直接导出对象），不能解构
const API = require('../../../config/api');
const request = require('../../../utils/request');
// 人物展示层的单一来源：头像绝对地址 / 首字兜底 / 生卒串都在这里，别在页面里另写一套
const FD = require('../../../utils/figure-display');
// 详情页后台预取的世系数据写在这里（2026-11-09 切换提速），本页优先读缓存渲染
// 短时缓存 / 在途请求复用与 request 封装同模块（2026-11-09 合并：
// 单独建主包 utils/page-cache.js 会触发「主包未使用 JS 文件」上传检查）
const pageCache = request;

const GEN_LIMIT = 6;          // 每代首次展示的节点数，与服务端默认一致
const MAX_DEPTH = 3;          // 首屏上下各 3 代
const MAX_DEPTH_CAP = 4;      // 接口允许的深度上限
const NAV_CONTENT_H = 44;     // nav-bar 的内容高度（px），组件内 .nav-inner 固定 44px

/**
 * 头像首字：先剥掉「朝代/庙号」前缀再取姓，避免「辽世宗耶律阮」取到「辽」、
 * 「唐太宗李世民」取到「唐」、「宋仁宗赵祯」取到「宋」、「晋武帝司马炎」取到「晋」。
 * 库里没有 surname 字段，这里只做确定性的前缀剥离（不猜姓）——剥不掉就退回原首字，
 * 因此结果不会比全站 `figure-display.getAvatarChar` 更差，只是把带庙号前缀的帝王
 * 头像从「朝代字」纠正为「姓字」。
 *
 * 关键护栏：**必须带朝代前缀才剥**（如「唐/宋/辽/晋/南唐…」），裸「姓名」绝不剥。
 * 否则「李宗仁」「王祖贤」「张宗昌」这类「姓 + 名以宗/祖/帝/王开头」的普通人会被误剥。
 * 仅当「朝代前缀 + 庙号后缀（宗/祖/帝/王/皇/汗…）」齐全才剥，故唐太宗→李、宋仁宗→赵、
 * 辽兴宗耶律宗真→耶、晋惠帝司马衷→司 都正确，而李宗晖/周瑜/吴三桂 原样保留姓氏首字。
 * （代价：少数省略朝代前缀的帝王名如「天祚帝耶律延禧」取不到姓，但这种写法罕见，宁可保守。）
 * 庙号部分用惰性匹配，停在第一个宗/祖/帝，避免「辽兴宗耶律宗真」把第二个「宗」也吞进去。
 */
function getInitial(name) {
  const t = String(name || '').trim();
  if (!t) return '?';
  const m = t.match(
    /^(?:唐|宋|辽|金|元|明|清|汉|晋|隋|秦|梁|陈|魏|吴|蜀|楚|燕|夏|周|北|南|后|前|大|西夏|南唐|西辽|北辽|东魏|西魏|北齐|北周|后梁|后唐|后晋|后汉|后周|前蜀|后蜀|南汉|北汉)[一-龥]{1,4}?(?:宗|祖|帝|王|皇|汗|可汗|单于)/
  );
  if (m) {
    const rest = t.slice(m[0].length);
    if (rest && /^[一-龥]/.test(rest)) return rest.charAt(0);
  }
  return t.charAt(0);
}

  /** 节点装饰：算好头像首字与副文，WXML 不再做判断 */
  function decorate(n) {
  if (!n) return n;
  if (n.placeholder) {
    // 往上每一代的缺口要叫对名字：曾祖辈那格写「父名未载」是错的。
    // 服务端给了 `expecting`（父/祖/曾祖/高祖/子/孙/曾孙），直接用它拼。
    // 往下不逐代区分：整支子嗣都没采到，「子嗣未载」比「孙嗣未载」更自然。
    let title = '';
    let hint = '';
    if (n.gapKind === 'boundary') {
      title = '更上一代有记载';
      hint = '超出本次查看深度';
    } else if (n.gapKind === 'skipped') {
      title = n.direction === 'up' ? (n.expecting || '父') + '名未载' : '子嗣未载';
      hint = '隔 ' + (n.skipSpan || 1) + ' 代有载';
    } else {
      title = n.direction === 'up' ? (n.expecting || '父') + '名未载' : '子嗣未载';
      hint = '本库未收录';
    }
    return Object.assign({}, n, { gapTitle: title, gapHint: hint });
  }
  // 关系词：优先用服务端新下发的 `kinWord`（**相对本人**的称谓：曾祖父 / 外曾祖母 /
  // 祖母 / 儿子…）。旧逻辑只能在 ±1 代显示 `relationWord`，因为那只是「这一跳的关系」
  // ——曾祖列的「刘仁」带的是 `父亲`（刘煓→刘仁），显示在「曾祖辈」列里就是错的。
  // kinWord 由服务端按 代次 + 父系/母系 + 该边性别 推好，前端不做任何推断。
  //
  // B 档分区（sections）：gen 只是「长辈在上」的排位、不是真实代次，
  // 而每张卡的信息量恰恰就是这个关系词，故 section 存在时仍优先 relationWord。
  // 配偶：kinWord 已是「原配 / 二夫人 / 妻子」这类编号或专称。
  const word = (n.section && n.relationWord) ? n.relationWord : (n.kinWord || n.relationWord || '');
  const meta = n.lifespan || n.dynasty || '';
  // 关系词与生卒拼成一行：「曾祖父 · 178—251」。两者都有的情况很常见，
  // 只给一个会丢信息（用户要求每一辈都标明关系，生卒又是断代依据）。
  let sub = '';
  if (word && meta) sub = word + ' · ' + meta;
  else sub = word || meta;

  // 头像地址必须是**绝对地址**。接口下发的是库里的原值，约 10% 是站内根相对路径
  // （`/uploads/figures/rwshw_0627.jpg`）：浏览器能靠站点 origin 解析，小程序不能
  // ——`<image src="/uploads/…">` 会被当成开发者工具本地域去请求，报
  // `Failed to load image http://127.0.0.1:PORT/__pageframe__/uploads/…`。
  // resolveAvatarUrl 补 API.BASE，isImageAvatar 再把 emoji / 脏值判掉。
  const avatarUrl = FD.resolveAvatarUrl(n.avatarUrl);
  return Object.assign({}, n, {
    // 头像位只放一个字：整个姓名塞进 64rpx 圆里会被裁成「帝刘」这种半截字。
    // 用 getInitial 先剥庙号前缀，帝王头像显示「姓」而非「朝代字」（如辽世宗→耶、唐太宗→李）。
    initial: getInitial(n.name),
    avatarUrl: FD.isImageAvatar(avatarUrl) ? avatarUrl : '',
    sub,
  });
}

function decorateCol(col) {
  return Object.assign({}, col, { nodes: (col.nodes || []).map(decorate) });
}

/**
 * 按世代拆列，同时标出每列要不要画谱线。
 *
 * 为什么不用「一根贯穿全树的长线」：长线是绝对定位的，下端只能靠 `bottom` 定，
 * 而最后一列的圆点在家谱最上面、卡片却在下面 —— 线会一直垂到卡片底部之外，
 * 看上去像「下面还有一代」。改成每列自己从本代圆点向下接到下一代圆点，
 * 最后一代不画，线就正好收在最后一个圆点上。
 */
function splitCols(cols) {
  const selfCol = cols.filter((c) => c.gen === 0)[0] || null;
  const upCols = cols.filter((c) => c.gen < 0);
  const downCols = cols.filter((c) => c.gen > 0);
  const ordered = upCols.concat(selfCol ? [selfCol] : [], downCols);
  ordered.forEach((c, i) => { c.showRail = i < ordered.length - 1; });
  return { selfCol, upCols, downCols };
}

/**
 * 折叠 / 展开必须能**来回**：原实现只有「展开」（向服务端重取 genLimit=0），
 * 展开后没有任何入口收起，子辈 20 人一铺开就回不去了。
 *
 * 改法：`nodes` 恒为服务端下发（或已取回的全量）集合，`displayNodes` 才是真正渲染的切片。
 * 收起只是把 displayNodes 截回 GEN_LIMIT，**不再依赖服务端重取**，于是随时能收起。
 *
 * hidden 优先信服务端 `folded`（折叠态下它才是「真实隐藏数」）；全量已取回时 folded 为 0，
 * 才退化成 total - GEN_LIMIT 推算。
 */
/**
 * 该列在「只看父系」下会筛掉的母系数。
 * 父辈的非主位（继父/嗣父/嫡母/庶母…）已经单独折叠进「其他父母」，
 * 不能重复算进「母系已收起」的提示里（否则母系全是 extra 时会把主位也一并算没）。
 * 这一代没有父系时不做筛选（mother-only 人物），返回 0。
 */
function matHiddenOf(c) {
  // 父辈「其他父母」（extra）已单独折叠，不计入「母系已收起」的数字
  if ((c.paternalCount || 0) <= 0) return 0;
  const extraMat = (c.nodes || []).filter(
    (n) => n.parentRank === 'extra' && n.side === 'maternal'
  ).length;
  return Math.max(0, (c.maternalCount || 0) - extraMat);
}

function colView(c, sideMode) {
  const all = c.nodes || [];
  const total = c.total != null ? c.total : all.length;
  const expanded = !!c.expanded;
  // 父辈主位（仅 gen = -1）：服务端已按 parentRank 标好 primary / extra。
  // 主世系只渲染主位（最多「一位父亲 + 一位母亲」），其余收进「其他父母」，
  // 避免一排出现好几张都写「父亲」的卡片。只做分组，不删边、不合并人物。
  const extraAll = c.gen === -1 ? all.filter((n) => n.parentRank === 'extra') : [];
  const extraTotal = c.gen === -1 ? (c.extraParentCount || extraAll.length) : 0;
  const extraOpen = c.gen === -1 ? !!c.extraOpen : false;
  // core = 去掉 extra 的节点；total 同样扣掉 extra，否则折叠计数会把它们算成"被隐藏"
  const coreAll = c.gen === -1 ? all.filter((n) => n.parentRank !== 'extra') : all;
  const coreTotal = Math.max(0, total - extraTotal);
  // 「只看父系」：祖先代默认只留父系分支，母系单独计数、点一下再放出来。
  // 只对上行（gen<0）生效——下行若也筛，女儿所生的外孙会被整批藏掉，那是真少人。
  // `paternalCount > 0` 是必要的兜底：库里有大量「只知母、不知父」的人物，
  // 若这一代根本没有父系，再筛就整列清空，用户会以为祖辈全丢失。
  //
  // 母系人数必须用服务端在**折叠之前**算好的 `maternalCount`：首屏每代只下发前
  // GEN_LIMIT 个节点，端上拿到的是残缺列表，自己数会把母系数少（宋理宗高祖辈
  // total=8、首屏只发 6 个，母系 3 位里可能一位都没发出来）。
  // 例外：父辈（gen = -1）主位最多 2 个、服务端整批下发，且 extra 已单独折叠，
  // 这时必须从 core 里数，不能再用含 extra 的 maternalCount（否则会把主位算没）。
  const onlyPat = sideMode === 'paternal' && c.gen < 0 && (c.paternalCount || 0) > 0;
  const matHidden = onlyPat
    ? (c.gen === -1
      ? coreAll.filter((n) => n.side === 'maternal').length
      : Math.min(c.maternalCount || 0, coreTotal))
    : 0;
  const nodes = onlyPat ? coreAll.filter((n) => n.side !== 'maternal') : coreAll;
  const shownTotal = Math.max(0, coreTotal - matHidden);
  // 折叠态的两种表现，取决于这一代有多大：
  //   大代（>GEN_LIMIT）→ 仍留前 GEN_LIMIT 张当预览（沿用原有习惯，一眼看得出后面还有人）；
  //   小代（≤GEN_LIMIT）→ 整组收起。若小代也留预览，切片等于全部，点「−」会毫无变化。
  const displayNodes = expanded ? nodes : (shownTotal > GEN_LIMIT ? nodes.slice(0, GEN_LIMIT) : []);
  // hidden 不能用 shownTotal - GEN_LIMIT 推：只看父系时端上只有「已下发的那几个父系」，
  // 服务端说有 5 位父系、首屏只发来 4 位时，按 GEN_LIMIT 算会得 0，
  // 用户就永远看不到「另有 1 位」，那一位再也取不回来。一律用「总该显示 - 实际显示」。
  const hidden = Math.max(0, shownTotal - displayNodes.length);
  return {
    expanded,
    hidden,
    // 小代被整组收起后只剩一个标题，必须给条「展开 N 人」，否则看不出还能打开。
    // shownTotal 为 0 时（这一代全是母系、当前又被筛掉）不能给「展开 0 人」。
    collapsedAll: !expanded && displayNodes.length === 0 && shownTotal > 0 && !c.suspect,
    // 大代展开后才需要「收起」；小代靠圆点上的 − 收
    collapsible: expanded && shownTotal > GEN_LIMIT,
    displayNodes,
    matHidden,
    // 父辈非主位（继父/嗣父/养父/嫡母/庶母…）：默认收起，点「其他父母 N」展开
    extraNodes: extraAll,
    extraTotal,
    extraOpen,
  };
}

/**
 * 读详情页预取的世系缓存（2026-11-09 切换提速）。
 * 键带 v2：2026-11-09 服务端新增 paternalCount/maternalCount 与节点 side，
 * 旧缓存没有这两个数字会让「只看父系」开关消失，故升级键名让旧条目自然淘汰。
 * 只有请求参数与当前首屏一致（up/down = 当前 depth、genLimit = GEN_LIMIT）才命中，
 * 避免把「更深一层」或别的参数拉回来的树当成首屏数据。
 * @returns {{data:object, age:number}|null}
 */
function readCachedTree(id, depth) {
  const hit = pageCache.getCache('lineage:v2:' + id);
  if (!hit || !hit.data || !hit.data.data) return null;
  const p = hit.data.params || {};
  if (p.up !== depth || p.down !== depth || p.genLimit !== GEN_LIMIT) return null;
  return { data: hit.data.data, age: hit.age };
}

Page({
  data: {
    safeAreaTop: 0,
    navBarHeight: 0,           // = safeAreaTop + 44，nav-bar 是 fixed，必须自己占位
    loading: true,
    busy: false,               // 只改查询参数时的静默刷新，不复用 loading（否则整棵树闪成骨架）
    error: '',
    trail: [],                 // 面包屑路径（已离开的中心）
    mode: '',
    center: null,
    selfCol: null,             // gen = 0 那一列
    upCols: [],                // gen < 0，最远代在上
    downCols: [],              // gen > 0
    // 'all' = 父系母系全显（默认，2026-11-08 用户改）：进入世系即两边都看。
    // 'paternal' = 只看父系：上行只留父系分支，母系折叠成一行提示，点开关切换。
    // 库里「生父 + 嗣父」「生母 + 嫡母 + 继母」很常见，全平铺时一代能铺出 8 张卡。
    sideMode: 'all',
    matHiddenTotal: 0,         // 上行各代被筛掉的母系节点总数
    spouses: [],
    spousesDisplay: [],        // 配偶实际渲染的切片（折叠时只放前 GEN_LIMIT 位）
    spousesHidden: 0,
    spousesExpanded: false,
    siblings: { total: 0, expanded: false, nodes: [] },
    siblingsExpanded: false,
    sections: [],
    meta: null,
    sheet: null,             // 长按节点弹出的详情浮层数据（null = 关闭）
    genLimit: GEN_LIMIT,
    depth: MAX_DEPTH,
    depthMin: MAX_DEPTH,       // 首屏深度：加深过之后要能收回这里，否则深度只增不减
    depthCap: MAX_DEPTH_CAP,
  },

  onLoad(options) {
    const id = parseInt(options && options.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      this.setData({ loading: false, error: '缺少人物参数' });
      return;
    }
    let sys = {};
    try { sys = wx.getWindowInfo() || {}; } catch (e) { sys = {}; }
    const top = sys.statusBarHeight || 0;
    this.setData({ safeAreaTop: top, navBarHeight: top + NAV_CONTENT_H });
    this._id = id;
    this._colState = {};          // 用户手动切过的代：{ gen: 是否展开 }，跨静默刷新保留
    this._pendingExpandGen = null; // 首次展开时「取回全量后要展开的那一代」
    // 详情页后台预取过这棵树（2026-11-09 切换提速）：先读缓存直接渲染，不闪骨架；
    // 2 分钟内算新鲜、不再刷新（避免同一份数据短时间重复请求），超过才后台静默刷新。
    const hit = readCachedTree(id, this.data.depth);
    if (hit) {
      this.load(id, { push: false, cached: hit });
      return;
    }
    this.load(id, { push: false });
  },

  /* ---------------- 底部五标签（共享 templates/dock/dock.wxml） ---------------- */

  /**
   * 世系页底栏点击：
   *   · 「世系」= 当前页，忽略；
   *   · 「档案 / 年表 / 关系」= 回到详情页并切到对应标签：
   *       栈里若有**同一人物**的详情页 → 先把目标标签写回该页再 navigateBack（一次返回，不叠页）；
   *       没有（从分享 / 搜索直接进世系页，或树心人物已换）→ 打开该人物详情页并带 &tab=。
   *   · 「足迹」= 切到足迹页：上一页正好是同一人物的足迹页则返回，否则新开，避免来回叠页。
   */
  onDockTap(e) {
    const tab = e.currentTarget.dataset.tab;
    if (!tab || tab === 'lineage') return;
    const id = this._id || (this.data.center && this.data.center.id);
    if (!id) {
      wx.showToast({ title: '未找到对应人物', icon: 'none' });
      return;
    }
    if (this._dockJumping) return;   // 连点保护：避免触发两次返回

    if (tab === 'footprint') {
      const prev = this._prevPage();
      const sameFootprint = prev
        && prev.route === 'footprint-pkg/pages/footprint/footprint'
        && prev.data && prev.data.selectedFigure
        && String(prev.data.selectedFigure.id) === String(id);
      if (sameFootprint) { this._dockBack(1); return; }
      this._dockJumping = true;
      wx.navigateTo({
        url: '/footprint-pkg/pages/footprint/footprint?id=' + id,
        complete: () => { this._dockJumping = false; }
      });
      return;
    }

    // archive / timeline / relations：优先回溯栈里的同人物详情页
    const pages = getCurrentPages();
    const cur = pages.length - 1;
    for (let i = cur - 1; i >= 0; i--) {
      const p = pages[i];
      if (p.route !== 'detail-pkg/pages/detail/detail') continue;
      if (typeof p.setDockTab !== 'function') continue;
      if (String(p._figureId) !== String(id)) continue;   // 人物不同（树心已换）不复用
      p.setDockTab(tab, { deferScroll: true });   // 本页在后台，回顶延后到详情页 onShow
      this._dockBack(cur - i);
      return;
    }
    // 栈里没有可复用的详情页：正常打开并落在目标标签
    this._dockJumping = true;
    wx.navigateTo({
      url: '/detail-pkg/pages/detail/detail?id=' + id + '&tab=' + tab,
      complete: () => { this._dockJumping = false; }
    });
  },

  /** 栈里当前页的上一页（没有则 null） */
  _prevPage() {
    const pages = getCurrentPages();
    return pages.length > 1 ? pages[pages.length - 2] : null;
  },

  /** 带连点保护的返回 */
  _dockBack(delta) {
    this._dockJumping = true;
    wx.navigateBack({
      delta: delta,
      complete: () => { this._dockJumping = false; }
    });
  },

  /* ---------------- 数据 ---------------- */

  /**
   * @param {number} id
   * @param {{push?:boolean, keepTrail?:boolean}} opt
   *   push      —— 把当前中心压进面包屑（点节点钻取时）
   *   keepTrail —— 保留当前面包屑（返回上一级时**不能清空**，
   *                否则「返回一级」会把整条路径抹掉，再想连退两级就没入口了）
   */
  load(id, opt) {
    const o = opt || {};
    // 请求序号（2026-11-09 审查补）：只有**最后一次**发出的请求可以落地。
    // 先点节点 A（慢网）再点返回 B，A 的树晚到会覆盖 B —— 树心错、面包屑对不上。
    const seq = this._reqSeq = (this._reqSeq || 0) + 1;
    // 缓存命中（2026-11-09 切换提速）：先渲染缓存的树，不闪骨架；
    // 超过 2 分钟不新鲜才在后台静默刷新（2 分钟内直接复用，避免同一份数据重复请求）。
    if (o.cached) {
      this._applyData(o.cached.data, o);
      if (o.cached.age > pageCache.FRESH_MS) {
        this.load(id, { push: false, keepTrail: true, quiet: true, keepState: true });
      }
      return;
    }
    // quiet：已有树时（非首屏）用 busy 静默刷新，保留旧树只加遮罩，避免点节点整页闪成骨架。
    // 首屏（onLoad）与重试（onRetry）必须走 loading 骨架。
    const quiet = !!o.quiet && !!this.data.center;

    // 在途复用（2026-11-09 切换提速）：详情页预取还没返回时直接接管那次请求，
    // 不再发第二条（否则「详情页预取 + 本页 onLoad」会请求同一份数据两次）。
    // 仅当请求参数与首屏一致时才接管：参数不同（例如用户已加深一代）不能混用。
    const inflight = pageCache.getInflight('lineage:v2:' + id);
    const ip = inflight && inflight.params;
    if (ip && ip.up === this.data.depth && ip.down === this.data.depth && ip.genLimit === GEN_LIMIT) {
      this.setData(quiet ? { busy: true, error: '' } : { loading: true, busy: false, error: '' });
      const that = this;
      inflight.promise.then((body) => {
        if (that._unloaded || seq !== that._reqSeq) return;   // 已销毁 / 已有更新的请求
        const d = body && body.success && body.data;
        if (!d) {
          const msg = (body && body.message) || '世系加载失败';
          if (quiet) { this.setData({ busy: false }); wx.showToast({ title: msg, icon: 'none' }); }
          else this.setData({ loading: false, error: msg });
          return;
        }
        pageCache.setCache('lineage:v2:' + id, {
          params: { up: this.data.depth, down: this.data.depth, genLimit: GEN_LIMIT },
          data: d,
        });
        this._applyData(d, o);
      }).catch((err) => {
        if (that._unloaded || seq !== that._reqSeq) return;
        const msg = (err && err.message) || '网络异常，请稍后重试';
        if (quiet) { this.setData({ busy: false }); wx.showToast({ title: msg, icon: 'none' }); }
        else this.setData({ loading: false, error: msg });
      });
      return;
    }

    this.setData(quiet ? { busy: true, error: '' } : { loading: true, busy: false, error: '' });
    const url = API.FIGURES.LINEAGE(id, {
      up: this.data.depth,
      down: this.data.depth,
      spouse: 1,
      // 兄弟改为一开始就取全量：折叠/展开要能来回，端上必须握着完整列表才能「收起回一行」。
      // 只取计数的话，展开后就没有可截回的源数据了（旧实现正是因此收不回去）。
      sibling: 1,
      genLimit: GEN_LIMIT,
    });
    request.get(url).then((res) => {
      if (this._unloaded || seq !== this._reqSeq) return;
      if (!res || res.success === false || !res.data) {
        if (quiet) {
          this.setData({ busy: false });
          wx.showToast({ title: (res && res.message) || '世系加载失败', icon: 'none' });
        } else {
          this.setData({ loading: false, error: (res && res.message) || '世系加载失败' });
        }
        return;
      }
      const d = res.data;
      // 写短时缓存（2026-11-09 切换提速）：5 分钟内再次进入（含详情页预取）直接命中
      pageCache.setCache('lineage:v2:' + id, {
        params: { up: this.data.depth, down: this.data.depth, genLimit: GEN_LIMIT },
        data: d,
      });
      this._applyData(d, o);
      // 本页 navigationStyle 是 custom，标题由 nav-bar 渲染，不用调 setNavigationBarTitle
    }).catch((err) => {
      if (this._unloaded || seq !== this._reqSeq) return;
      // AC-10：非 quiet 必须显示错误态，不得渲染空树；quiet 下保留旧树只提示
      if (quiet) {
        this.setData({ busy: false });
        wx.showToast({ title: (err && err.message) || '网络异常，请稍后重试', icon: 'none' });
      } else {
        this.setData({ loading: false, error: (err && err.message) || '网络异常，请稍后重试' });
      }
    });
  },

  /**
   * 应用一棵新树（2026-11-09 分帧渲染）：把原来 load 里的一次性大 setData 拆成两帧。
   * 第一帧只送主干（中心 + 上下各代 + 面包屑），让可视区先出画面；
   * 第二帧再送配偶 / 兄弟 / 旁系分区（通常不在首屏可视范围内），降低首帧跨线程载荷。
   * 树的结构、顺序与样式完全沿用原实现，只是送达时机分帧。
   * @param {object} d  接口 data
   * @param {object} o  { push, keepTrail, keepState }
   */
  _applyData(d, o) {
    o = o || {};
    // 响应体缺 center 时不能继续：下面 `d.center.id` 会抛 TypeError，整棵树停在骨架屏
    if (!d || !d.center) {
      this.setData({ loading: false, busy: false, error: '世系数据缺失' });
      return;
    }
    // 分帧序号：第二次 _applyData 落地后，前一次的 wx.nextTick 回调必须作废，
    // 否则旧树第二帧会盖掉新树的配偶 / 兄弟 / 旁系分区
    const seq = this._applySeq = (this._applySeq || 0) + 1;
    // 换中心才清空上一棵树的非主干分区；同一中心静默刷新时保留，避免第二帧到达前整块消失
    const centerChanged = !this.data.center || this.data.center.id !== d.center.id;
    const cols = (d.columns || []).map(decorateCol);
    const pos = splitCols(cols);
    // 换中心 = 全新一棵树：展开记录清掉；后台静默刷新（keepState）保留用户手动展开态
    if (!o.keepState) this._colState = {};
    const spouses = (d.spouses || []).map(decorate);
    const spousesOpen = spouses.length <= GEN_LIMIT;   // 小户型默认展开，多的先收起留预览
    this._prepareCols(pos.upCols, { isFull: false });
    this._prepareCols(pos.downCols, { isFull: false });
    if (pos.selfCol) this._prepareCols([pos.selfCol], { isFull: false });

    let trail = this.data.trail;
    if (o.push && this.data.center) {
      trail = trail.concat([{ id: this.data.center.id, name: this.data.center.name }]);
    } else if (!o.keepTrail) {
      trail = [];
    }

    this._id = d.center.id;
    // 第一帧：主干（可视区最先看到的中心与各代）
    this.setData({
      loading: false,
      busy: false,
      error: '',
      trail,
      mode: d.mode,
      center: decorate(d.center),
      selfCol: pos.selfCol,
      upCols: pos.upCols,
      downCols: pos.downCols,
      // 只统计「真的会被筛掉」的母系：这一代没有父系时不做筛选（mother-only 人物），
      // 那些母系是可见的，不能算进「已收起」的提示里；
      // 父辈的 extra（继父/嗣父/嫡母…）已单独折叠进「其他父母」，也不能再算一次。
      matHiddenTotal: pos.upCols.reduce((s, c) => s + matHiddenOf(c), 0),
      meta: d.meta || {},
      // 换中心：第一帧先把上一任的配偶 / 兄弟 / 旁系清掉（原先要等第二帧，
      // 中间会闪一帧「新中心的头 + 旧中心的亲属」；第二帧若被销毁吞掉则永久残留）
      spouses: centerChanged ? [] : this.data.spouses,
      spousesDisplay: centerChanged ? [] : this.data.spousesDisplay,
      spousesHidden: centerChanged ? 0 : this.data.spousesHidden,
      siblings: centerChanged ? { total: 0, expanded: false, nodes: [] } : this.data.siblings,
      siblingsExpanded: centerChanged ? false : this.data.siblingsExpanded,
      sections: centerChanged ? [] : this.data.sections,
    });

    // 第二帧：配偶 / 兄弟 / 旁系分区放到下一帧（2026-11-09 第二轮压紧：
    // 由 `setTimeout(0)` 改为 `wx.nextTick`，少一层定时器排队，紧贴第一帧提交后补上，
    // 减少「看了一会儿内容突然长出来」的跳变；无 nextTick 的老基础库回退 setTimeout 0）
    const that = this;
    if (this._deferTimer) { clearTimeout(this._deferTimer); this._deferTimer = null; }
    const applyRest = function () {
      that._deferTimer = null;
      if (that._unloaded || seq !== that._applySeq) return;   // 已销毁 / 已有更新的树
      that.setData({
        spouses,
        spousesDisplay: spousesOpen ? spouses : spouses.slice(0, GEN_LIMIT),
        spousesHidden: Math.max(0, spouses.length - GEN_LIMIT),
        spousesExpanded: spousesOpen,
        siblings: d.siblings
          ? Object.assign({}, d.siblings, { nodes: (d.siblings.nodes || []).map(decorate) })
          : { total: 0, expanded: false, nodes: [] },
        siblingsExpanded: false,
        sections: (d.sections || []).map((s) => Object.assign({}, s, {
          nodes: (s.nodes || []).map(decorate),
        })),
        genLimit: GEN_LIMIT,     // 换中心即回到首屏折叠状态，别把上一人的展开态带过来
      });
      that._buildNodeMap();      // 重建 id→装饰节点 索引，供长按浮层查关系词/生卒/朝代/头像
      that._scheduleGuide();     // 首帧树进 DOM 后再启动使用引导（只启动一次）
    };
    if (typeof wx.nextTick === 'function') wx.nextTick(applyRest);
    else this._deferTimer = setTimeout(applyRest, 0);
  },

  /**
   * 头像图加载失败 → 清空该节点的 avatarUrl，回落到姓名首字。
   *
   * 库里有真图的只有 2,850 行，其中一部分文件实际缺失（详情页/首页轮播早有同样的兜底）。
   * 不兜底就是一个个空圆圈 —— 比没有头像还糟，会被读成「这个人没有信息」。
   * 错误路径不追求性能，直接把整组重建一遍；正常渲染完全不受影响。
   */
  onAvatarError(e) {
    const key = e && e.currentTarget && e.currentTarget.dataset.key;
    if (!key) return;
    const strip = (list) => (list || []).map(
      (n) => (n.key === key ? Object.assign({}, n, { avatarUrl: '' }) : n)
    );
    // 渲染看的是 displayNodes / spousesDisplay（折叠切片），兜底必须两处一起清，
    // 否则「图片挂了 → 回落首字」只改了源数组，屏幕上还是空圆圈。
    const patch = {
      spouses: strip(this.data.spouses),
      spousesDisplay: strip(this.data.spousesDisplay),
    };
    ['upCols', 'downCols'].forEach((f) => {
      patch[f] = this.data[f].map((c) => Object.assign({}, c, {
        nodes: strip(c.nodes),
        displayNodes: strip(c.displayNodes || c.nodes),
      }));
    });
    if (this.data.selfCol) {
      patch.selfCol = Object.assign({}, this.data.selfCol, { nodes: strip(this.data.selfCol.nodes) });
    }
    patch.siblings = Object.assign({}, this.data.siblings, { nodes: strip(this.data.siblings.nodes) });
    patch.sections = this.data.sections.map((s) => Object.assign({}, s, { nodes: strip(s.nodes) }));
    this.setData(patch);
  },

  /**
   * 页面级滚动量。引导需要滚动时按「视口矩形 + 锚点矩形」算 scroll-top，
   * 这里只记录当前量，供调试与后续定位复用（不改页面原有滚动行为）。
   */
  onPageScroll(e) {
    this._scrollTop = (e && e.scrollTop) || 0;
  },

  /** 使用引导：树渲染完成后拉一次；_guideStarted 保证只启动一次 */
  _scheduleGuide() {
    if (this._guideStarted || this._guideTimer) return;
    const that = this;
    this._guideTimer = setTimeout(function () {
      that._guideTimer = null;
      if (that._unloaded || that._guideStarted) return;
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
      layer.autoStart('lineage');
    }, 300);
  },

  /**
   * 引导滚动（页面级滚动）：
   * scrollTop = 当前滚动量 + 锚点相对视口顶边的距离 - 导航预留。
   * 不用 scroll-into-view；量不到锚点就直接返回，由组件侧 optional 跳过该步。
   */
  onGuideScrollTo(e) {
    const sel = e && e.detail && e.detail.selector;
    if (!sel) return;
    const that = this;
    const q = wx.createSelectorQuery();
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

  onRetry() {
    // onLoad 参数非法时（_id 没赋值）不能重试：否则会请求 /lineage/undefined
    if (!this._id) {
      wx.showToast({ title: '缺少人物参数', icon: 'none' });
      return;
    }
    this.load(this._id, { push: false });
  },

  /* ---------------- 交互 ---------------- */

  onTapNode(e) {
    const id = e.currentTarget.dataset.id;
    // 长按手势抬起时必再触发一次 tap：无论后续如何，先把「长按标记」清掉，
    // 否则长按「本人」节点取消/选「查看详情」后，标记残留会让下一次正常点击也被吞掉。
    const suppress = this._longPressed;
    this._longPressed = false;
    if (!id) return;                       // 占位节点不可点（id 为 null）
    if (this.data.center && id === this.data.center.id) return;
    if (this.data.busy) return;            // 静默刷新中，吞掉连点，防竞态重入
    if (suppress) return;                  // 长按菜单手势的抬手 tap，吞掉，避免「菜单+误换中心」双触发
    // 换中心走 quiet：保留旧树只加遮罩，不再整页闪成骨架（见 load 的 quiet 分支）
    this.load(id, { push: true, quiet: true });
  },

  /**
   * 长按节点 → 底部上滑「详情浮层」：先预览（头像 / 与本人关系 / 生卒 / 朝代 / 简介）再决定，
   * 比原来的纯文字 2 按钮菜单信息密度高，且不动「点按 = 换中心」的主交互。
   * 浮层数据优先用本地已下发的装饰节点（关系词 / 生卒 / 朝代 / 头像首字都在 _nodeMap 里）；
   * 简介是 lineage 节点没下发的唯一字段，浮层打开时按需补拉一次 /api/figures/:id（纯前端，不动服务端）。
   */
  onNodeLongPress(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;                       // 占位节点无 id，不弹
    const node = this._nodeMap && this._nodeMap[id];
    if (!node) return;
    this._longPressed = true;              // 标记，抬手触发的 tap 由 onTapNode 吞掉（防误换中心）
    this._sheetOpenAt = Date.now();        // 记录打开时刻，用于忽略「抬手那一下」误触遮罩关闭
    const sheet = {
      id: node.id,
      name: node.name,
      initial: node.initial || (node.name || '?').charAt(0),
      avatarUrl: node.avatarUrl || '',
      sub: node.sub || '',                 // 已含「关系 · 生卒」，如「曾祖父 · 919—951」
      dynasty: node.dynasty || '',
      bio: '',
    };
    this.setData({ sheet });
    // 懒加载简介：拉一次详情接口补上，失败/无简介则显式置「暂无简介」，避免面板永久显示「加载中」
    const self = this;
    request.get(API.FIGURES.GET(id)).then((res) => {
      const fig = res && res.data;
      const raw = fig ? (fig.bio || fig.fullBio || '').toString().replace(/\s+/g, ' ').trim() : '';
      const bio = raw ? (raw.length > 60 ? raw.slice(0, 60) + '…' : raw) : '暂无简介';
      if (self.data.sheet && self.data.sheet.id === id) self.setData({ 'sheet.bio': bio });
    }).catch(() => {
      if (self.data.sheet && self.data.sheet.id === id) self.setData({ 'sheet.bio': '暂无简介' });
    });
    // 手势结束（抬手）后清掉长按标记，避免吞掉用户之后真正的点击
    setTimeout(() => { self._longPressed = false; }, 400);
  },

  /** 浮层内「查看完整详情」：关浮层并跳详情页 */
  onSheetDetail() {
    const id = this.data.sheet && this.data.sheet.id;
    this.setData({ sheet: null });
    if (id) wx.navigateTo({ url: '/detail-pkg/pages/detail/detail?id=' + id });
  },

  /** 浮层内「以此为树心」：关浮层并静默换中心 */
  onSheetCenter() {
    const id = this.data.sheet && this.data.sheet.id;
    this._longPressed = false;
    this.setData({ sheet: null });
    if (id && !(this.data.center && id === this.data.center.id)) {
      this.load(id, { push: true, quiet: true });
    }
  },

  /** 点遮罩关闭浮层（忽略「长按抬手那一下」的误触，避免一松手就关） */
  onSheetClose() {
    if (this._sheetOpenAt && Date.now() - this._sheetOpenAt < 400) return;
    this._longPressed = false;
    this.setData({ sheet: null });
  },

  /** 面板内部点击不冒泡到遮罩（catchtap 用，空实现） */
  onSheetStop() {},

  /** 返回上一级：保留剩余面包屑 */
  onBackOne() {
    const trail = this.data.trail.slice();
    const prev = trail.pop();
    if (!prev) return;
    this.setData({ trail });
    this.load(prev.id, { keepTrail: true });
  },

  /** 回到最初进入本页的那个人 */
  onBackRoot() {
    const trail = this.data.trail;
    if (!trail.length) return;
    const first = trail[0];
    this.setData({ trail: [] });
    this.load(first.id, { keepTrail: true });
  },

  /**
   * 某一代的「+ / −」：折叠与展开走同一入口，两者都能再来一次。
   *
   * 展开分两种：
   *   - 该代全量已在本端（之前取回过 genLimit=0）→ 直接铺满 displayNodes，不发请求；
   *   - 首次展开 → 服务端此前只给了前 GEN_LIMIT 位，必须先用 genLimit=0 取回全量，
   *     取回后只展开这一代，其它代仍各自折叠、也各自能独立展开/收起。
   * 收起则纯前端：displayNodes 截回 GEN_LIMIT，随时能再展开。
   */
  onToggleCol(e) {
    const gen = parseInt(e.currentTarget.dataset.gen, 10);
    const which = e.currentTarget.dataset.which;        // 'up' | 'down'
    if (!Number.isInteger(gen)) return;
    const field = which === 'down' ? 'downCols' : 'upCols';
    const arr = this.data[field] || [];
    const idx = arr.findIndex((c) => c.gen === gen);
    if (idx < 0) return;
    const col = arr[idx];
    const base = field + '[' + idx + ']';
    const next = !col.expanded;

    // 要展开但本端还没有全量 → 先取回全量，取回后由 forceGen 展开这一代。
    // 收起永远不需要请求：折叠只是把渲染切片改小。
    if (next && !col._full) {
      // 先记下「用户要展开」，这样取回全量后的其它重取（如加深代际）也不会把它弄回折叠
      this._colState[gen] = true;
      this._pendingExpandGen = gen;
      this._reload({ genLimit: 0 });
      return;
    }

    this._colState[gen] = next;
    const view = colView(Object.assign({}, col, { expanded: next }), this.data.sideMode);
    this.setData({
      [base + '.expanded']: next,
      [base + '.hidden']: view.hidden,
      [base + '.collapsedAll']: view.collapsedAll,
      [base + '.collapsible']: view.collapsible,
      [base + '.displayNodes']: view.displayNodes,
    });
  },

  /**
   * 父辈「其他父母 N 位」：展开/收起主位之外的父辈（继父 / 嗣父 / 养父 / 嫡母 / 庶母…）。
   *
   * 服务端已按 parentRank 把非主位标成 extra 并整批随首屏下发，这里只切展示态，
   * 不重取接口、不删边、不合并人物。收起时主世系里仍是「一位父亲 + 一位母亲」。
   */
  onToggleExtraParents(e) {
    const gen = parseInt(e.currentTarget.dataset.gen, 10);
    const which = e.currentTarget.dataset.which || 'up';
    if (!Number.isInteger(gen)) return;
    const field = which === 'down' ? 'downCols' : 'upCols';
    const idx = (this.data[field] || []).findIndex((c) => c.gen === gen);
    if (idx < 0) return;
    const col = this.data[field][idx];
    this.setData({ [field + '[' + idx + '].extraOpen']: !col.extraOpen });
  },

  /**
   * 「另有 N 位 ›」：只做「取回更多」，永远不会收起。
   *
   * 不能复用 onToggleCol：那一行在**展开态**下也会出现（只看父系时服务端只发了
   * 4 个父系、共 5 个，还剩 1 个没下发），此时 onToggleCol 会把 next 算成 false
   * 并执行收起 —— 用户想看剩下的那位，结果整代被收起来了。
   */
  onMoreCol(e) {
    const gen = parseInt(e.currentTarget.dataset.gen, 10);
    const which = e.currentTarget.dataset.which;
    if (!Number.isInteger(gen)) return;
    const field = which === 'down' ? 'downCols' : 'upCols';
    const idx = (this.data[field] || []).findIndex((c) => c.gen === gen);
    if (idx < 0) return;
    const col = this.data[field][idx];
    this._colState[gen] = true;
    if (!col._full) {
      this._pendingExpandGen = gen;
      this._reload({ genLimit: 0 });
      return;
    }
    const view = colView(Object.assign({}, col, { expanded: true }), this.data.sideMode);
    const base = field + '[' + idx + ']';
    this.setData({
      [base + '.expanded']: true,
      [base + '.hidden']: view.hidden,
      [base + '.collapsedAll']: view.collapsedAll,
      [base + '.collapsible']: view.collapsible,
      [base + '.displayNodes']: view.displayNodes,
    });
  },

  /**
   * 「只看父系 ⇄ 显示母系」：整棵上行树的分支口径，纯前端切换。
   *
   * 为什么做成全局两态而不是每组各带一个 +/−：父辈/祖辈本来就短（1–4 人），
   * 再在每代里嵌一层「母系 +/−」，圆点上的加减号就有两级含义，用户分不清
   * 点的是"这一代"还是"这一代里的母系"。全局一个开关，含义唯一。
   */
  onToggleSideMode() {
    const next = this.data.sideMode === 'paternal' ? 'all' : 'paternal';
    const patch = { sideMode: next };
    const upCols = (this.data.upCols || []).map((c) => {
      const view = colView(c, next);
      const o = Object.assign({}, c);
      o.expanded = view.expanded;
      o.hidden = view.hidden;
      o.collapsedAll = view.collapsedAll;
      o.collapsible = view.collapsible;
      o.displayNodes = view.displayNodes;
      o.matHidden = view.matHidden;
      return o;
    });
    patch.upCols = upCols;
    this.setData(patch);
  },

  /** 配偶「+ / −」：与代列同一套口径——大组折叠留前 GEN_LIMIT 张预览，小组整组收起 */
  onToggleSpouses() {
    const expanded = !this.data.spousesExpanded;
    const spouses = this.data.spouses || [];
    this.setData({
      spousesExpanded: expanded,
      spousesDisplay: expanded ? spouses : (spouses.length > GEN_LIMIT ? spouses.slice(0, GEN_LIMIT) : []),
    });
  },

  /** 兄弟「+ / −」：折叠只留一行「兄弟 N 位」，展开列全部并可再收起 */
  onToggleSiblings() {
    this.setData({ siblingsExpanded: !this.data.siblingsExpanded });
  },

  /** 继续向上/向下：深度 +1，最多到接口上限 4 代 */
  onDeeper() {
    if (this.data.depth >= MAX_DEPTH_CAP) return;
    this._reload({ depth: this.data.depth + 1 });
  },

  /**
   * 收回一代：把深度 −1，直到首屏深度。
   * 「点此继续」原本只能加深不能退回——和「展开后收不回去」是同一个单向毛病，
   * 加深到 4 代后整棵树变长却无处还原，所以补一个反向入口。
   * 注意走的是 _reload（保留面包屑 + busy 静默刷新），不是 load（会清空面包屑）。
   */
  onShallower() {
    if (this.data.depth <= MAX_DEPTH) return;
    this._reload({ depth: this.data.depth - 1 });
  },

  /**
   * 以当前人物重新请求，只改参数不换中心。
   * 抽出来是因为「展开一代 / 取全部兄弟 / 加深代际」是同一件事：
   * 换一组查询参数重取当前中心的树，**不能清空面包屑**，也**不能用 loading 态**——
   * loading 会把整棵树换成骨架屏，点一下「另有 3 位」整页闪一下，比不展开还糟。
   */
  _reload(patch) {
    const p = patch || {};
    this._colState = this._colState || {};
    // 一律用 != null 判断：genLimit 的合法值里有 0（=取回全量），
    // 用 `||` 会被当成没传而回落到 6，点「另有 N 位」就永远展不开。
    const depth = p.depth != null ? p.depth : this.data.depth;
    const genLimit = p.genLimit != null ? p.genLimit : this.data.genLimit;
    const isFull = genLimit === 0;
    // 请求序号：与 load 共用。静默刷新在途时用户点面包屑返回 / 换中心，
    // 旧那次 _reload 的响应晚到会盖掉新树（树心变了、代际却还是旧参数）
    const seq = this._reqSeq = (this._reqSeq || 0) + 1;
    // 非全量重取（加深代际）会丢掉已展开代的全量节点，撑不住展开态 → 清掉，回到默认折叠
    if (!isFull) this._colState = {};
    this.setData({ busy: true });
    const url = API.FIGURES.LINEAGE(this._id, {
      up: depth,
      down: depth,
      spouse: 1,
      sibling: 1,
      genLimit,
    });
    request.get(url).then((res) => {
      if (this._unloaded || seq !== this._reqSeq) return;
      if (!res || !res.data) {
        this.setData({ busy: false });
        this._pendingExpandGen = null;
        return;
      }
      const d = res.data;
      const pos = splitCols((d.columns || []).map(decorateCol));
      // 首次展开那一代由 forceGen 带过去；用户手动切过的代由 _colState 保留
      const forceGen = this._pendingExpandGen;
      this._pendingExpandGen = null;
      const spouses = (d.spouses || []).map(decorate);
      this._prepareCols(pos.upCols, { isFull, forceGen });
      this._prepareCols(pos.downCols, { isFull, forceGen });
      if (pos.selfCol) this._prepareCols([pos.selfCol], { isFull, forceGen });
      this.setData({
        busy: false,
        // mode 必须一起更新：加深代际会真的换版式，例如「高祖有载但超出深度」的人
        // 在 up=3 时是 kinship（旁系分区），up=4 拿回高祖后就变成 axis（直系主轴）。
        // 不刷这个字段，用户点完「点此继续」会看到 B 档版式配着一棵 A 档的 columns。
        mode: d.mode,
        depth,
        genLimit,
        selfCol: pos.selfCol,
        upCols: pos.upCols,
        downCols: pos.downCols,
        // 只统计「真的会被筛掉」的母系：这一代没有父系时不做筛选（mother-only 人物），
        // 那些母系是可见的，不能算进「已收起」的提示里；
        // 父辈的 extra（继父/嗣父/嫡母…）已单独折叠进「其他父母」，也不能再算一次。
        matHiddenTotal: pos.upCols.reduce((s, c) => s + matHiddenOf(c), 0),
        spouses,
        // 配偶/兄弟的展开态跨刷新保留：展开某一代不该把已展开的配偶又收起来
        spousesExpanded: this.data.spousesExpanded,
        spousesDisplay: this.data.spousesExpanded
          ? spouses
          : (spouses.length > GEN_LIMIT ? spouses.slice(0, GEN_LIMIT) : []),
        spousesHidden: Math.max(0, spouses.length - GEN_LIMIT),
        siblings: d.siblings
          ? Object.assign({}, d.siblings, { nodes: (d.siblings.nodes || []).map(decorate) })
          : this.data.siblings,
        siblingsExpanded: this.data.siblingsExpanded,
        // 加深代际可能真的换版式：axis ⇄ kinship 时 sections 必须跟着来 / 清掉，
        // 否则 B 档的分区会一直沿用上一版数据（或换到 A 档后残留旧的旁系分区）
        sections: (d.sections || []).map((s) => Object.assign({}, s, {
          nodes: (s.nodes || []).map(decorate),
        })),
        meta: d.meta || this.data.meta,
      });
      this._buildNodeMap();      // 重建 id→装饰节点 索引，供长按浮层查关系词/生卒/朝代/头像
    }).catch(() => {
      if (this._unloaded || seq !== this._reqSeq) return;
      this.setData({ busy: false });
      this._pendingExpandGen = null;
    });
  },

  /**
   * 给每列套上折叠/展开的展示态（colView）。
   *
   * @param {Array} cols  upCols / downCols / [selfCol]
   * @param {{isFull?:boolean, forceGen?:number|null}} opts
   *   isFull   —— 本次数据是 genLimit=0 取回的全量。只有全量到手，某一代才可能处于展开态。
   *   forceGen —— 首次展开时「取回全量后立刻展开」的那一代。
   */
  _prepareCols(cols, opts) {
    const o = opts || {};
    const isFull = !!o.isFull;
    const sideMode = this.data.sideMode;
    this._colState = this._colState || {};
    (cols || []).forEach((c) => {
      const total = c.total != null ? c.total : (c.nodes || []).length;
      c.total = total;
      // 取回过一次全量就一直是全量，后续展开不必再请求
      c._full = isFull ? true : !!c._full;
      const want = this._colState[c.gen];
      // 默认展开与否看「这一列实际要显示多少人」：只看父系时母系已被筛掉，
      // 仍按 total 判会把 3 人（父系 2 + 母系 1）当成大代收起来。
      // 父辈非主位（继父 / 嗣父 / 嫡母…）已收进「其他父母」，不占主世系名额，
      // 这里同样要扣掉——否则 8 位父母会把仅剩的 1~2 位主位也一并收起。
      const extra = c.gen === -1 ? (c.extraParentCount || 0) : 0;
      const judge = Math.max(0, total - extra - ((sideMode === 'paternal' && c.gen < 0)
        ? (c.maternalCount || 0)
        : 0));
      // 默认：小代展开、大代折叠留预览；「数据存疑」的代默认收起，先把警示卡亮出来
      c.expanded = want != null ? !!want : (judge <= GEN_LIMIT && !c.suspect);
      if (o.forceGen != null && c.gen === o.forceGen) c.expanded = true;
      Object.assign(c, colView(c, sideMode));
    });
  },

  /**
   * 把当前 data 里所有已装饰节点（中心 / 各列 / 配偶 / 兄弟 / 旁系分区）以 id 为键建索引。
   * 长按浮层需要节点的「关系词 · 生卒」「朝代」「头像首字/头像地址」这些已在 decorate 算好的字段，
   * 但 lineage 接口节点没有下发 bio，故浮层打开时另行按需补拉一次详情接口（见 onNodeLongPress）。
   * setData 后 this.data 已同步更新，这里直接读 this.data 即可。
   */
  _buildNodeMap() {
    const map = {};
    const add = (n) => { if (n && n.id != null) map[n.id] = n; };
    const addList = (list) => (list || []).forEach(add);
    add(this.data.center);
    [this.data.selfCol, ...(this.data.upCols || []), ...(this.data.downCols || [])].forEach(
      (c) => {
        if (!c) return;
        addList(c.nodes);
        // 父辈非主位（继父/嗣父/嫡母/庶母…）也要能长按看卡片，否则点开「其他父母」后浮层查不到人
        addList(c.extraNodes);
      }
    );
    addList(this.data.spouses);
    addList(this.data.siblings && this.data.siblings.nodes);
    (this.data.sections || []).forEach((s) => addList(s.nodes));
    this._nodeMap = map;
  },

  onOpenGraph() {
    const id = this.data.center && this.data.center.id;
    if (!id) return;
    wx.navigateTo({ url: `/chart-pkg/pages/graph/graph?id=${id}` });
  },

  /**
   * 「看同时代的人物」→ 时间线页。
   *
   * 为什么不跳查询页：查询页只接受 `globalData.pendingSearch`（一个关键词字符串），
   * 没有任何按朝代筛选的入口，传过去等于点了没反应。
   * 时间线页吃 `?year=`，与详情页自己的「同期人物」出口同一条路。
   */
  onOpenSameEra() {
    const c = this.data.center;
    if (!c) return;
    // 生卒是「公历日期（传统纪年）」复合串，取第一个数字即公历年；
    // 公元前写作「公元前203年」，必须先判「前」再取绝对值，不能直接取负。
    const raw = String(c.birthYear || c.deathYear || '');
    const m = raw.match(/\d{1,4}/);
    const y = m ? (/前/.test(raw) ? -parseInt(m[0], 10) : parseInt(m[0], 10)) : 0;
    wx.navigateTo({ url: '/timeline-pkg/pages/timeline/timeline' + (y ? '?year=' + y : '') });
  },

  /** 勘误入口。只带 type=content，不做正文预填（反馈页不读额外参数） */
  onOpenFeedback() {
    wx.navigateTo({ url: '/account-pkg/pages/feedback/feedback?type=content' });
  },

  /** 页面销毁：清掉分帧渲染的延迟定时器，避免回调落到已销毁实例（2026-11-09） */
  onUnload() {
    // 在途请求 / 缓存命中后的回调可能晚于销毁到达：打标记，回调里不再 setData
    this._unloaded = true;
    if (this._deferTimer) {
      clearTimeout(this._deferTimer);
      this._deferTimer = null;
    }
    if (this._guideTimer) {
      clearTimeout(this._guideTimer);
      this._guideTimer = null;
    }
  },
});
