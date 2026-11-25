/**
 * 人物展示层公共工具（小程序侧单一来源）
 *
 * 由 web 端 src/components/FigureCard.tsx + src/utils/name.ts + src/components/MobileFigureCarousel.tsx
 * 逐条移植，保证「同名截取规则 / 朝代配色 / 头像兜底 / 简介与生卒年」两端完全一致。
 *
 * [注意] WXSS 不支持 CSS 的 color-mix()，因此 web 里依赖 color-mix 的地方
 * （朝代色竖条渐变、标签底色/描边）在本模块内**预先解析成 rgba 字符串**，
 * 由 WXML 直接以行内 style 渲染，等价于 web 的视觉效果。
 *
 * [注意] 另一处 web / 小程序差异：库里约 10% 的 `avatar` 是**站内根相对路径**
 * （如 `/uploads/figures/0805.jpg`）。在浏览器里它能靠站点自身 origin 解析成功，
 * 但在小程序里 `image src="/uploads/…"` 会被当作**相对开发者工具本地域**去请求
 * （实测报错 `Failed to load image http://127.0.0.1:PORT/__pageframe__/uploads/figures/0805.jpg`），
 * 因此必须由 resolveAvatarUrl() 补全成绝对地址。
 */

var API = require('../config/api');

/* ===================== 一、姓名显示（与 web src/utils/name.ts 一致） ===================== */

/**
 * 人物名一律返回全名，与详情页展示一致。
 * 历史说明：旧逻辑做"姓氏截取"（意图"唐太宗李世民"→"李世民"），但误伤极广
 * （"唐太宗李世民"→"宗李世民"、"李氏(长乐公主)"→"公主)"、"宇文化及"→"文化及"、
 * "武安公主"→"安公主"等），全库排查 5 万余条受影响，2026-09-17 起两端统一停用截断。
 */
function extractShortName(name, nationality) {
  return name || '';
}

/* ===================== 二、朝代配色（与 web FigureCard.DYNASTY_THEME 一致） ===================== */

var DYNASTY_THEME = {
  '唐':   { gradient: 'linear-gradient(135deg, #E0B060, #D4A050, #B8862E)', shadow: 'rgba(212, 160, 80, 0.45)', dot: '#D4A050', glow: 'rgba(212, 160, 80, 0.06)' },
  '后唐': { gradient: 'linear-gradient(135deg, #E0B060, #D4A050, #B8862E)', shadow: 'rgba(212, 160, 80, 0.45)', dot: '#D4A050', glow: 'rgba(212, 160, 80, 0.06)' },
  '宋':   { gradient: 'linear-gradient(135deg, #60A5FA, #3B82F6, #1D4ED8)', shadow: 'rgba(59, 130, 246, 0.45)', dot: '#3B82F6', glow: 'rgba(59, 130, 246, 0.06)' },
  '北宋': { gradient: 'linear-gradient(135deg, #60A5FA, #3B82F6, #1D4ED8)', shadow: 'rgba(59, 130, 246, 0.45)', dot: '#3B82F6', glow: 'rgba(59, 130, 246, 0.06)' },
  '南宋': { gradient: 'linear-gradient(135deg, #60A5FA, #3B82F6, #1D4ED8)', shadow: 'rgba(59, 130, 246, 0.45)', dot: '#3B82F6', glow: 'rgba(59, 130, 246, 0.06)' },
  '明':   { gradient: 'linear-gradient(135deg, #F87171, #DC2626, #991B1B)', shadow: 'rgba(220, 38, 38, 0.45)', dot: '#DC2626', glow: 'rgba(220, 38, 38, 0.06)' },
  '清':   { gradient: 'linear-gradient(135deg, #4ADE80, #16A34A, #15803D)', shadow: 'rgba(22, 163, 74, 0.45)', dot: '#16A34A', glow: 'rgba(22, 163, 74, 0.06)' },
  '汉':   { gradient: 'linear-gradient(135deg, #A78BFA, #8B5CF6, #6D28D9)', shadow: 'rgba(139, 92, 246, 0.45)', dot: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.06)' },
  '西汉': { gradient: 'linear-gradient(135deg, #A78BFA, #8B5CF6, #6D28D9)', shadow: 'rgba(139, 92, 246, 0.45)', dot: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.06)' },
  '东汉': { gradient: 'linear-gradient(135deg, #A78BFA, #8B5CF6, #6D28D9)', shadow: 'rgba(139, 92, 246, 0.45)', dot: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.06)' },
  '東漢': { gradient: 'linear-gradient(135deg, #A78BFA, #8B5CF6, #6D28D9)', shadow: 'rgba(139, 92, 246, 0.45)', dot: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.06)' },
  '西漢': { gradient: 'linear-gradient(135deg, #A78BFA, #8B5CF6, #6D28D9)', shadow: 'rgba(139, 92, 246, 0.45)', dot: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.06)' },
  '近现代': { gradient: 'linear-gradient(135deg, #F472B6, #EC4899, #BE185D)', shadow: 'rgba(236, 72, 153, 0.45)', dot: '#EC4899', glow: 'rgba(236, 72, 153, 0.06)' },
  '民国': { gradient: 'linear-gradient(135deg, #F472B6, #EC4899, #BE185D)', shadow: 'rgba(236, 72, 153, 0.45)', dot: '#EC4899', glow: 'rgba(236, 72, 153, 0.06)' },
  '中华民国': { gradient: 'linear-gradient(135deg, #F472B6, #EC4899, #BE185D)', shadow: 'rgba(236, 72, 153, 0.45)', dot: '#EC4899', glow: 'rgba(236, 72, 153, 0.06)' },
  '中华人民共和国': { gradient: 'linear-gradient(135deg, #F472B6, #EC4899, #BE185D)', shadow: 'rgba(236, 72, 153, 0.45)', dot: '#EC4899', glow: 'rgba(236, 72, 153, 0.06)' }
};

var DEFAULT_THEME = {
  gradient: 'linear-gradient(135deg, #FBBF77, #B45309, #78350F)',
  shadow: 'rgba(180, 83, 9, 0.4)',
  dot: '#B45309',
  glow: 'rgba(180, 83, 9, 0.06)'
};

/** 朝代 → 主题色（精确优先，其次模糊匹配） */
function getDynastyTheme(dynasty) {
  if (!dynasty) return DEFAULT_THEME;
  if (DYNASTY_THEME[dynasty]) return DYNASTY_THEME[dynasty];
  if (/唐/.test(dynasty)) return DYNASTY_THEME['唐'];
  if (/宋/.test(dynasty)) return DYNASTY_THEME['宋'];
  if (/汉|漢/.test(dynasty)) return DYNASTY_THEME['汉'];
  if (/明/.test(dynasty)) return DYNASTY_THEME['明'];
  if (/清/.test(dynasty)) return DYNASTY_THEME['清'];
  if (/民国|中华|现代|当代|共和/.test(dynasty)) return DYNASTY_THEME['近现代'];
  return DEFAULT_THEME;
}

/* ===================== 三、颜色工具（替代 WXSS 缺失的 color-mix） ===================== */

/** '#D4A050' / '#fff' → 'rgba(212, 160, 80, a)' */
function hexToRgba(hex, alpha) {
  var h = String(hex || '').trim().replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (h.length !== 6) return 'rgba(212, 168, 83, ' + alpha + ')';
  var r = parseInt(h.substring(0, 2), 16);
  var g = parseInt(h.substring(2, 4), 16);
  var b = parseInt(h.substring(4, 6), 16);
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
}

/* ===================== 四、字段兜底（与 web MobileFigureCarousel 一致） ===================== */

/** 安全转文本：库里 birthYear/deathYear 实际是数字，avatar/bio 也可能是非字符串 */
function toText(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

/** 基本介绍：优先 bio，其次 fullBio，都没有则退回标签/兜底文案 */
function buildIntro(figure, maxLen) {
  var limit = maxLen || 78;
  var raw = (toText(figure.bio) || toText(figure.fullBio)).replace(/\s+/g, ' ');
  if (raw) return raw.length > limit ? raw.slice(0, limit) + '…' : raw;
  var tags = Array.isArray(figure.tags) ? figure.tags.filter(Boolean).slice(0, 3) : [];
  if (tags.length > 0) return tags.join(' · ');
  return '暂无简介';
}

/** 生卒年："前100–前44" / "701–762"，缺失则空串 */
function buildYears(figure) {
  var birth = toText(figure.birthYear);
  var death = toText(figure.deathYear);
  if (birth && death) return birth + '–' + death;
  if (birth) return birth + '—';
  if (death) return '—' + death;
  return '';
}

/** 人物姓氏首字（头像兜底） */
function getAvatarChar(name) {
  var trimmed = toText(name);
  if (!trimmed) return '?';
  return trimmed.charAt(0);
}

/** avatar 是否为图片 URL / 上传路径（与 web 同名函数语义一致） */
function isImageAvatar(avatar) {
  if (!avatar || typeof avatar !== 'string') return false;
  var trimmed = avatar.trim();
  return /^https?:\/\//.test(trimmed) || /^\/uploads\//.test(trimmed);
}

/**
 * 把 avatar 归一化成小程序里能直接加载的绝对地址。
 * 库里约 10% 是站内根相对路径（`/uploads/figures/0805.jpg`）——浏览器能靠站点 origin 解析，
 * 小程序不能（会打到 `http://127.0.0.1:PORT/__pageframe__/…` 报错），必须补 `API.BASE`。
 * 非图片值（emoji / 空 / 脏值）原样返回，交给上层做 emoji / 姓名首字兜底。
 */
function resolveAvatarUrl(avatar) {
  var u = toText(avatar);
  if (!u) return '';
  if (/^https?:\/\//.test(u)) return u;
  if (u.charAt(0) === '/') return API.BASE + u;
  return u;
}

/* ===================== 五、头像两级兜底（图片 / 姓名首字） ===================== */

/**
 * 头像视图模型（详情页 / 足迹页 / 轮播卡共用同一套兜底规则）：
 *   image : 可直接喂给 <image src> 的**绝对地址**（站内相对路径已补 API.BASE）
 *   char  : 姓名首字（无真实图片头像时一律用它，不再用 emoji 字形）
 * glyph 字段保留但恒为空串（兼容旧调用点），新代码请勿再消费。
 * 两个字段**互斥**：能用图片时 char 为空串，避免 WXML 分支歧义。
 */
function buildAvatar(figure) {
  var raw = toText(figure && figure.avatar);
  var name = toText(figure && figure.name);
  var image = '';
  var url = resolveAvatarUrl(raw);
  if (isImageAvatar(url)) image = url;
  return {
    image: image,
    glyph: '',
    char: image ? '' : getAvatarChar(name)
  };
}

/* ===================== 五、轮播卡片视图模型 ===================== */

/**
 * 把一条人物数据压成轮播卡片所需的、**已解析颜色**的视图模型。
 * 颜色一律在这里算好（WXSS 无 color-mix），WXML 只负责绑定。
 */
function buildCarouselItem(figure) {
  if (!figure) return null;
  var rawName = toText(figure.name);
  var theme = getDynastyTheme(figure.dynasty);
  var dot = theme.dot;
  var avatarRaw = toText(figure.avatar);
  // 先补全站内相对路径（/uploads/… → https://api.example.com/uploads/…），再判定是否图片。
  var avatarUrl = resolveAvatarUrl(avatarRaw);
  // 库中 avatar 多为 emoji 字形（历史数据中含 emoji 字形）：新口径一律不展示，无图统一回退姓名首字。
  var avatarImage = isImageAvatar(avatarUrl) ? avatarUrl : '';
  var avatarGlyph = ''; // 已停用 emoji 字形兜底，字段保留兼容旧引用
  var tags = (Array.isArray(figure.tags) ? figure.tags : [])
    .filter(function (t) { return typeof t === 'string' && t.trim(); })
    .slice(0, 2);

  return {
    id: String(figure.id),
    name: extractShortName(rawName, figure.nationality) || rawName,
    dynasty: figure.dynasty || '朝代不详',
    nationality: figure.nationality || '',
    hasNationality: !!figure.nationality,
    years: buildYears(figure),
    intro: buildIntro(figure),
    tags: tags,
    hasTags: tags.length > 0,
    avatarImage: avatarImage,
    avatarGlyph: avatarGlyph,
    avatarChar: getAvatarChar(rawName),
    // 已解析颜色（替代 web 的 CSS 变量 + color-mix）
    avatarGradient: theme.gradient,
    avatarShadow: '0 6rpx 18rpx ' + theme.shadow,
    dotColor: dot,
    glowBg: 'radial-gradient(circle at 16% 22%, ' + theme.glow + ', transparent 62%)',
    leftBar: 'linear-gradient(180deg, ' + dot + ', ' + hexToRgba(dot, 0.55) + ')',
    tagBg: hexToRgba(dot, 0.2),
    tagBorder: hexToRgba(dot, 0.42)
  };
}

/** 批量构建轮播视图模型，并补上序号/总数（供「3/20」角标使用） */
function buildCarouselList(figures) {
  var list = Array.isArray(figures) ? figures : [];
  var items = [];
  for (var i = 0; i < list.length; i++) {
    var item = buildCarouselItem(list[i]);
    if (item) items.push(item);
  }
  var total = items.length;
  for (var j = 0; j < total; j++) {
    items[j].counter = j + 1;
    items[j].total = total;
  }
  return items;
}

/* ===================== 六、时间轴年份格式化（与 web src/utils/yearFormat.ts 一致） ===================== */

/**
 * events[].year 形态混杂：规范数字（"约公元前571年"）、纯数字（"223"）、年号纪年
 * （"建安十三年"）、朝代单字（"清"）、时期描述（"东汉末年"）。统一前端展示规则
 * （确定性、不造假）：
 *   1. 可解析出数字 → 规范为「公元前N年」/「N年」（保留"约"）
 *   2. 年号纪年 → 查唯一年号表转公元年（冲突年号不转，保留原文）
 *   3. 朝代单字（清/明/宋/唐…）→ 补"代"字（"清代"）
 *   4. 已含数字的复合格式（括号/范围/月日）与无法确定的时期描述 → 保留原样
 */

// 唯一年号 → 起始公元年。只收录无歧义年号（重复年号如"元和/太和/建武/永和"不收录，
// 避免张冠李戴；带明确朝代前缀的组合键可单独收录）。
var NIANHAO = {
  建安: 196, 初平: 190, 中平: 184, 光和: 178, 熹平: 172, 建宁: 168,
  嘉平: 249, 景初: 237, 青龙: 233,
  太康: 280, 永嘉: 307, 义熙: 405, 升平: 357, 隆安: 397, 咸和: 326,
  咸康: 335, 宁康: 373, 兴宁: 363, 咸安: 371,
  元嘉: 424, 天监: 502, 普通: 520, 大通: 527, 大同: 535, 太建: 569,
  永明: 483, 神龟: 518, 正光: 520, 孝昌: 525, 永安: 528, 永熙: 532,
  天平: 534, 武定: 543, 天保: 550, 河清: 562, 天统: 565, 武平: 570,
  建德: 572, 保定: 561, 天和: 566, 大统: 535, 大象: 579, 大成: 579,
  神瑞: 414, 泰常: 416, 始光: 424, 延和: 432, 太延: 435, 太平真君: 440,
  正平: 451, 兴安: 452, 兴光: 454, 太安: 455, 和平: 460, 皇兴: 467,
  延兴: 471, 承明: 476, 景明: 500, 正始: 504, 延昌: 512, 熙平: 516,
  开皇: 581, 仁寿: 601, 大业: 605, 义宁: 617,
  武德: 618, 贞观: 627, 开元: 713, 天宝: 742, 兴元: 784, 贞元: 785,
  永贞: 805, 开成: 836, 会昌: 841, 大中: 847, 咸通: 860, 乾符: 874,
  广明: 880, 中和: 881, 光启: 885, 文德: 888, 龙纪: 889, 大顺: 890,
  景福: 892, 乾宁: 894, 光化: 898, 天复: 901, 建中: 780,
  同光: 923, 天成: 926, 长兴: 930, 天福: 936, 开运: 944, 广顺: 951,
  显德: 954, 升元: 937,
  建隆: 960, 乾德: 963, 开宝: 968, 太平兴国: 976, 雍熙: 984, 端拱: 988,
  淳化: 990, 至道: 995, 咸平: 998, 景德: 1004, 大中祥符: 1008, 天禧: 1017,
  乾兴: 1022, 天圣: 1023, 明道: 1032, 景祐: 1034, 宝元: 1038, 康定: 1040,
  庆历: 1041, 皇祐: 1049, 至和: 1054, 嘉祐: 1056, 治平: 1064, 熙宁: 1068,
  元丰: 1078, 元祐: 1086, 绍圣: 1094, 元符: 1098, 建中靖国: 1101, 崇宁: 1102,
  大观: 1107, 政和: 1111, 重和: 1118, 宣和: 1119, 靖康: 1126, 建炎: 1127,
  绍兴: 1131, 隆兴: 1163, 乾道: 1165, 淳熙: 1174, 绍熙: 1190, 庆元: 1195,
  嘉泰: 1201, 开禧: 1205, 嘉定: 1208, 宝庆: 1225, 绍定: 1228, 端平: 1234,
  嘉熙: 1237, 淳祐: 1241, 宝祐: 1253, 开庆: 1259, 景定: 1260, 咸淳: 1265,
  德祐: 1275, 景炎: 1276, 祥兴: 1278,
  至元: 1264, 大德: 1297, 至大: 1308, 皇庆: 1312, 延祐: 1314, 至治: 1321,
  泰定: 1324, 天历: 1328, 至顺: 1330, 元统: 1333, 至正: 1341,
  洪武: 1368, 建文: 1399, 永乐: 1403, 洪熙: 1425, 宣德: 1426, 正统: 1436,
  景泰: 1450, 天顺: 1457, 成化: 1465, 弘治: 1488, 正德: 1506, 嘉靖: 1522,
  隆庆: 1567, 万历: 1573, 泰昌: 1620, 天启: 1621, 崇祯: 1628,
  顺治: 1644, 康熙: 1662, 雍正: 1723, 乾隆: 1736, 嘉庆: 1796, 道光: 1821,
  咸丰: 1851, 同治: 1862, 光绪: 1875, 宣统: 1909,
  // 带明确朝代前缀的组合键（消歧用）
  后汉乾祐: 948, 梁武帝太清: 547, 唐德宗建中: 780, 后晋天福: 936,

  // —— 2026-10-30 扩容（据 GB/T《日期和时间 日历体系代码 第2部分:中国古代》、
  //     维基「晉十六國年號」「漢昌」、百度百科《唐宋时期年代列表》核验）——
  // 唐（高宗～代宗，填补原表空缺）
  永徽: 650, 显庆: 656, 龙朔: 661, 麟德: 664, 乾封: 666, 总章: 668, 咸亨: 670,
  仪凤: 676, 调露: 679, 永隆: 680, 开耀: 681, 永淳: 682, 弘道: 683,
  嗣圣: 684, 文明: 684, 光宅: 684, 垂拱: 685, 载初: 690, 天授: 690, 如意: 692,
  长寿: 692, 延载: 694, 证圣: 695, 万岁登封: 695, 万岁通天: 696, 神功: 697,
  圣历: 698, 久视: 700, 大足: 701, 长安: 701, 神龙: 705, 景龙: 707, 景云: 710,
  太极: 712, 先天: 712, 至德: 756, 乾元: 758, 宝应: 762, 广德: 763, 永泰: 765, 大历: 766,
  // 西晋（泰始265→咸宁275→太康280→太熙290→…→元康291→…→光熙306→永嘉307→建兴313）
  咸宁: 275, 太熙: 290, 元康: 291, 光熙: 306,
  // 东晋（建武317→大兴318→…→太元376→隆安397→元兴402→义熙405→元熙419）
  大兴: 318, 太兴: 318, // 东晋元帝「大兴」，库中多写作「太兴」，一并收录
  太元: 376, 元兴: 402,
  // 汉赵（麟嘉316→汉昌318→光初318-329）
  麟嘉: 316, 汉昌: 318, 光初: 318,
  // 其它无歧义年号
  弘光: 1645, // 南明福王
  更始: 23, // 汉·刘玄
  嘉兴: 417, // 西凉
  // 带明确朝代/政权前缀的组合键（消歧用，优先于裸年号命中）
  唐文宗太和: 827, 闽永隆: 939, 辽太宗会同: 938, 前秦甘露: 359,
  蜀汉建兴: 223, 东晋元熙: 419, 东汉永平: 58,
  // 帝王庙号 → 在位起始年（"唐代宗年间"→约762年），据《唐书》本纪核验
  唐高祖: 618, 唐太宗: 627, 唐高宗: 650, 唐中宗: 684, 唐睿宗: 684, 唐玄宗: 712,
  唐肃宗: 756, 唐代宗: 762, 唐德宗: 780, 唐顺宗: 805, 唐宪宗: 806, 唐穆宗: 821,
  唐敬宗: 825, 唐文宗: 827, 唐武宗: 841, 唐宣宗: 847, 唐懿宗: 860, 唐僖宗: 874,
  唐昭宗: 889, 唐哀帝: 904, 武周: 690,
  宋太祖: 960, 宋太宗: 976, 宋真宗: 998, 宋仁宗: 1023, 宋英宗: 1064, 宋神宗: 1068,
  宋哲宗: 1086, 宋徽宗: 1101, 宋钦宗: 1126, 宋高宗: 1127, 宋孝宗: 1163, 宋光宗: 1190,
  宋宁宗: 1195, 宋理宗: 1225, 宋度宗: 1265,
  明太祖: 1368, 明惠宗: 1399, 明成祖: 1403, 明仁宗: 1425, 明宣宗: 1426, 明英宗: 1436,
  明代宗: 1450, 明宪宗: 1465, 明孝宗: 1488, 明武宗: 1506, 明世宗: 1522, 明穆宗: 1567,
  明神宗: 1573, 明光宗: 1620, 明熹宗: 1621, 明思宗: 1628,
  清太祖: 1616, 清太宗: 1627, 清世祖: 1644, 清圣祖: 1662, 清世宗: 1723, 清高宗: 1736,
  清仁宗: 1796, 清宣宗: 1821, 清文宗: 1851, 清穆宗: 1862, 清德宗: 1875, 清逊帝: 1909,
  // 割据政权君主（"后汉隐帝三年"→950年）
  后汉隐帝: 948, 北齐武成帝: 561, 北齐文宣帝: 550, 北周武帝: 561, 隋文帝: 581, 隋炀帝: 605
};

// 时期描述 → 参考公元年（据朝代起讫，展示时标"约"）
var PERIOD = {
  隋末唐初: 618, 唐初: 618, 盛唐: 713, 中唐: 762, 晚唐: 820,
  东汉初: 25, 东汉末: 220, 东汉末年: 220,
  西汉初: -202, 西汉初年: -202, 西汉末: 8,
  东晋初: 317, 西晋初: 265, 西晋末: 316,
  隋初: 581, 隋末: 617,
  宋初: 960, 宋末: 1276, 元初: 1271, 元末: 1368,
  明初: 1368, 明末: 1644, 清末: 1911,
  民国初年: 1912, 民国初: 1912, 民初: 1912,
  秦末汉初: -206, 春秋末: -476, 战国初: -475
};

// 可能出现在年号前面的朝代/政权前缀（用于剥离后查裸年号表）
var DYN_TOKENS = [
  '东汉', '西汉', '蜀汉', '东晋', '西晋', '北魏', '东魏', '西魏', '北齐', '北周',
  '南朝宋', '刘宋', '南宋', '北宋', '南唐', '后唐', '后汉', '后周', '后梁', '后蜀',
  '前蜀', '前秦', '后秦', '前燕', '后燕', '前凉', '西凉', '北凉', '南凉', '西秦',
  '后赵', '前赵', '成汉', '孙吴', '曹魏', '汉赵', '春秋', '战国', '隋唐', '明清',
  '中华民国', '秦末汉', '隋末唐', '民国', '秦', '汉', '晋', '隋', '唐', '宋', '元',
  '明', '清', '魏', '蜀', '吴', '辽', '金', '闽', '楚'
];

// 年号前的朝代/朝代+庙号前缀（剥除后查表）
var PREFIXES = [
  '后晋', '后汉', '后周', '后唐', '后梁', '前蜀', '后蜀', '南唐', '南齐', '北周', '北齐',
  '北魏', '西魏', '东魏', '梁', '陈', '隋', '唐', '宋', '明', '清', '元', '辽', '金', '晋', '汉', '魏', '蜀',
  '唐太宗', '唐高宗', '唐中宗', '唐睿宗', '唐玄宗', '唐肃宗', '唐代宗', '唐德宗',
  '唐顺宗', '唐宪宗', '唐穆宗', '唐敬宗', '唐文宗',
  '唐武宗', '唐宣宗', '唐懿宗', '唐僖宗', '唐昭宗', '唐哀帝', '唐高祖',
  '宋太祖', '宋太宗', '宋真宗', '宋仁宗', '宋神宗', '宋哲宗', '宋徽宗', '宋钦宗', '宋高宗',
  '宋孝宗', '宋宁宗', '宋理宗', '宋度宗',
  '明太祖', '明成祖', '明仁宗', '明宣宗', '明英宗', '明代宗', '明宪宗', '明孝宗', '明武宗',
  '明世宗', '明穆宗', '明神宗', '明光宗', '明熹宗', '明思宗',
  '清太祖', '清太宗', '清世祖', '清圣祖', '清世宗', '清高宗', '清仁宗', '清宣宗', '清文宗',
  '清穆宗', '清德宗', '梁武帝',
  // 割据政权君主（用于剥离后查裸年号，如「北齐武成帝河清年间」→「河清」562）
  '北齐武成帝', '北齐文宣帝', '北周武帝', '隋文帝', '隋炀帝', '后汉隐帝', '后汉高祖'
];

var CN_NUM = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };

// 汉字数字转阿拉伯（十三→13、二十→20、二十一→21、十→10）
function cnToNum(s) {
  if (s === '十') return 10;
  var t = s.indexOf('十');
  if (t === -1) return CN_NUM[s] || 0;
  if (t === 0) return 10 + (CN_NUM[s[1]] || 0);
  if (t === s.length - 1) return (CN_NUM[s[0]] || 0) * 10;
  return (CN_NUM[s[0]] || 0) * 10 + (CN_NUM[s[t + 1]] || 0);
}

function stripPrefix(nianhao) {
  for (var i = 0; i < PREFIXES.length; i++) {
    var p = PREFIXES[i];
    if (nianhao.indexOf(p) === 0 && nianhao.length > p.length) return nianhao.slice(p.length);
  }
  return nianhao;
}

// 生成所有可能的「剥前缀」候选（从长到短），用于逐个查年号表。
// 旧实现只剥一次且按 PREFIXES 顺序取首个匹配 —— '唐' 排在 '唐高宗' 前面，
// 会把「唐高宗龙朔」剥成「高宗龙朔」而永远命中不了「龙朔」。
function prefixCandidates(nianhao) {
  var out = [];
  var all = PREFIXES.concat(DYN_TOKENS);
  // 按长度降序尝试，优先剥更具体的前缀
  var sorted = all.slice().sort(function (a, b) { return b.length - a.length; });
  for (var i = 0; i < sorted.length; i++) {
    var p = sorted[i];
    if (nianhao.indexOf(p) === 0 && nianhao.length > p.length) {
      var t = nianhao.slice(p.length).replace(/^[末初]+/, '');
      if (t && t !== nianhao && out.indexOf(t) === -1) out.push(t);
    }
  }
  return out;
}

// 年号纪年 → 公元年字符串；查不到/有歧义返回 null
function convertNianhao(y) {
  // 0) 去「约/大约」前缀（"约永嘉年间" → "永嘉年间"，库中 27 条）
  var s = y.replace(/^(约|大约|约莫)+/, '');
  // 1) 时期描述（"隋末唐初" / "东汉初" / "民国初年"）→ **不再折算成公元年**。
  //    朝代起讫年不是事件发生年，折算成「约1368年」等于用朝代起点伪装成具体年份。
  //    保留原文（"明初" / "东汉末年"），排序时按不可定年处理（见 eventSortKey）。
  if (Object.prototype.hasOwnProperty.call(PERIOD, s)) return null;

  var m = s.match(/^([\u4e00-\u9fa5]{2,8}?)(元年|年间|初|初年|末|(?:十?[一二三四五六七八九十]{1,3})年)$/);
  if (!m) return null;
  var nianhao = m[1];
  var suffix = m[2];

  var startYear = NIANHAO[nianhao];
  if (startYear === undefined) {
    // 逐个尝试剥前缀后的候选（支持多层剥离，如「东汉末建安」→「建安」）
    var pool = [nianhao];
    for (var depth = 0; depth < 3 && startYear === undefined; depth++) {
      var next = [];
      for (var j = 0; j < pool.length; j++) {
        var cand = pool[j];
        if (NIANHAO[cand] !== undefined) { startYear = NIANHAO[cand]; break; }
        var cands = prefixCandidates(cand);
        for (var k = 0; k < cands.length; k++) {
          if (next.indexOf(cands[k]) === -1) next.push(cands[k]);
        }
      }
      if (startYear !== undefined) break;
      if (next.length === 0) break;
      pool = next;
    }
  }
  if (startYear === undefined) return null;

  // 「末」不按年号起始年折算（"建安末"≠196年），交给 PERIOD 表处理
  if (suffix === '末') return null;
  // 「年间 / 初 / 初年」是时段而非某一年：折算成「约627年」属于伪精确，
  // 保留原文（"贞观年间" / "贞观初"），排序按不可定年处理。
  if (suffix === '年间' || suffix === '初' || suffix === '初年') return null;
  if (suffix === '元年') return startYear + '年';
  var num = cnToNum(suffix.slice(0, -1));
  if (!num || num <= 0 || num > 100) return null;
  return (startYear + num - 1) + '年';
}

// 朝代单字集合（补"代"字用）
var SINGLE_DYNASTY = ['清', '明', '宋', '唐', '元', '辽', '金', '汉', '隋', '秦', '周', '魏', '晋', '夏', '商'];

/** 时间轴年份统一格式化（与 web formatYear 完全一致） */
function formatYear(raw) {
  var y = String(raw == null ? '' : raw).trim();
  if (!y) return '';

  // 1) 纯数字（含负号，"223" / "-206"）
  var m = y.match(/^-?\d{1,5}$/);
  if (m) {
    var n = parseInt(y, 10);
    return n < 0 ? '公元前' + (-n) + '年' : n + '年';
  }

  // 2) "约/公元(前) + 数字 + 年"（"约公元前571年" / "公元600年" / "公元前221年" / "600年"）
  m = y.match(/^(约|大约|约莫|前后)?\s*(公元|公元前)?\s*(\d{1,5})\s*年$/);
  if (m) {
    var approx = m[1] ? '约' : '';
    var bc = m[2] === '公元前' ? '公元前' : '';
    return approx + bc + m[3] + '年';
  }

  // 2a) 前导负号式 "-257年"（后端 toAD 解析为 -257，原样返回会被排在公元 257 年）
  m = y.match(/^-\s*(\d{1,5})\s*年?$/);
  if (m) return '公元前' + m[1] + '年';

  // 2b) 裸「前N年」（省略「公元」二字，如「前108年」「约前98年」）
  m = y.match(/^(约|大约|约莫|前后)?\s*前\s*(\d{1,5})\s*年?$/);
  if (m) return (m[1] ? '约' : '') + '公元前' + m[2] + '年';

  // 3) 已含数字的复合格式（"建安四年（199年）" / "196年-220年" / "219年三月"）→ 信息完整，保留原样
  if (/\d/.test(y)) return y;

  // 4) 年号纪年 → 转公元年
  var nianhao = convertNianhao(y);
  if (nianhao) return nianhao;

  // 5) 朝代单字 → 补"代"（"清" → "清代"）
  if (SINGLE_DYNASTY.indexOf(y) >= 0) return y + '代';

  // 6) 其余（"东汉末年" / "隋末唐初" / "未详" 等）→ 保留原样
  return y;
}

/* ===================== 二之二、朝代序（只标朝代的条目归位用） ===================== */

/**
 * 朝代序表：按历史先后排列，供「只标朝代」的年表条目插回时间轴。
 *
 * 字段：
 *   n  规范名（区间带标题就用它，如「三国」）；同一朝代的各种写法（三国吴/孙吴/吴）
 *      统一收进 n，避免同一个人出现三条同义带。
 *   s/e 起讫年（负数为公元前）；**只在 d=0 时用于区间带标题**。
 *   d  1 = 起讫有争议（考古分期、政权并立、民国终点等）。这类只在带首写朝代名，
 *      不写年份区间 —— 宁可少说，不能把有争议的起讫当成确定值展示。
 *   a  可识别的写法（含「代」字形态由 matchDynasty 统一剥除，不必重复列）。
 */
var DYNASTY_SEQ = [
  { n: '夏', s: -2070, e: -1600, d: 1, a: ['夏'] },
  { n: '商', s: -1600, e: -1046, d: 1, a: ['商', '殷'] },
  { n: '西周', s: -1046, e: -771, d: 0, a: ['西周'] },
  { n: '东周', s: -770, e: -256, d: 1, a: ['东周'] },
  { n: '周', s: -1046, e: -256, d: 1, a: ['周'] },
  { n: '春秋', s: -770, e: -476, d: 1, a: ['春秋'] },
  { n: '战国', s: -475, e: -221, d: 1, a: ['战国'] },
  { n: '秦', s: -221, e: -207, d: 0, a: ['秦'] },
  { n: '西汉', s: -202, e: 8, d: 0, a: ['西汉', '前汉'] },
  { n: '新', s: 9, e: 23, d: 0, a: ['新'] },
  { n: '汉', s: -202, e: 220, d: 1, a: ['汉'] },
  // 「后汉」同时是东汉别称与五代政权，二义冲突时归五代（见下方五代条目）：
  // 五代的「后汉」若落到东汉会整条错位到公元 1 世纪，代价远大于反向误判。
  { n: '东汉', s: 25, e: 220, d: 0, a: ['东汉'] },
  { n: '三国', s: 220, e: 280, d: 1, a: ['三国', '三国吴', '三国魏', '三国蜀', '曹魏', '蜀汉', '孙吴', '魏', '蜀', '吴'] },
  { n: '西晋', s: 265, e: 316, d: 1, a: ['西晋'] },
  { n: '东晋', s: 317, e: 420, d: 1, a: ['东晋'] },
  { n: '晋', s: 265, e: 420, d: 1, a: ['晋'] },
  { n: '十六国', s: 304, e: 439, d: 1, a: ['十六国'] },
  { n: '南北朝', s: 420, e: 589, d: 1, a: ['南北朝'] },
  { n: '南朝', s: 420, e: 589, d: 1, a: ['南朝', '南朝宋', '刘宋', '南齐', '南梁', '南陈'] },
  { n: '北朝', s: 386, e: 581, d: 1, a: ['北朝', '北魏', '东魏', '西魏', '北齐', '北周'] },
  { n: '隋', s: 581, e: 618, d: 0, a: ['隋'] },
  { n: '唐', s: 618, e: 907, d: 0, a: ['唐'] },
  { n: '五代', s: 907, e: 960, d: 1, a: ['五代', '五代十国', '后梁', '后唐', '后晋', '后汉', '后周'] },
  { n: '十国', s: 902, e: 979, d: 1, a: ['十国', '前蜀', '后蜀', '南唐', '吴越', '闽', '楚', '南汉', '北汉', '南平'] },
  { n: '北宋', s: 960, e: 1127, d: 0, a: ['北宋'] },
  { n: '南宋', s: 1127, e: 1279, d: 0, a: ['南宋'] },
  { n: '宋', s: 960, e: 1279, d: 0, a: ['宋'] },
  { n: '辽', s: 916, e: 1125, d: 0, a: ['辽', '契丹'] },
  { n: '金', s: 1115, e: 1234, d: 0, a: ['金', '女真'] },
  { n: '元', s: 1271, e: 1368, d: 0, a: ['元'] },
  { n: '明', s: 1368, e: 1644, d: 0, a: ['明'] },
  { n: '清', s: 1644, e: 1912, d: 0, a: ['清'] },
  { n: '民国', s: 1912, e: 1949, d: 1, a: ['民国', '中华民国'] },
  { n: '近现代', s: 1840, e: 1949, d: 1, a: ['近现代', '近代', '现代', '当代'] },
  { n: '中华人民共和国', s: 1949, e: 2100, d: 1, a: ['中华人民共和国', '新中国', '共和国'] }
];

// 别名索引：按写法长度降序，保证「三国吴」先于「三国」、「南宋」先于「宋」命中
var DYNASTY_ALIAS = (function () {
  var out = [];
  for (var i = 0; i < DYNASTY_SEQ.length; i++) {
    DYNASTY_SEQ[i].i = i;
    for (var j = 0; j < DYNASTY_SEQ[i].a.length; j++) {
      out.push({ a: DYNASTY_SEQ[i].a[j], dyn: DYNASTY_SEQ[i] });
    }
  }
  out.sort(function (x, y) { return (y.a.length - x.a.length) || (x.dyn.i - y.dyn.i); });
  return out;
})();

/**
 * 年份文本 → 朝代序表条目；认不出返回 null。
 * 只做「去掉时期后缀后整体/前缀匹配」，不做模糊猜测 —— 猜错会把条目塞进错误朝代。
 */
function matchDynasty(raw) {
  var s = String(raw == null ? '' : raw).trim();
  if (!s) return null;
  s = s.replace(/^(约|大约|约莫|前后)/, '');
  s = s.replace(/(时期|时代|年间|末年|末期|初期|初年|中期|晚期|后期|末|初|中)$/, '');
  if (!s) return null;
  // 「清代」这类：先剥尾字「代」再精确匹配，避免把「近现代」剥成「近现」
  if (s.length > 1 && s.charAt(s.length - 1) === '代') {
    var t = s.slice(0, -1);
    for (var k = 0; k < DYNASTY_ALIAS.length; k++) {
      if (t === DYNASTY_ALIAS[k].a) return DYNASTY_ALIAS[k].dyn;
    }
  }
  for (var i = 0; i < DYNASTY_ALIAS.length; i++) {
    var it = DYNASTY_ALIAS[i];
    if (s === it.a || s.indexOf(it.a) === 0) return it.dyn;
  }
  return null;
}

/**
 * 区间带标题里的起止年：用「朝代起讫 ∩ 人物可定年区间」裁剪，
 * 争议朝代（d=1）或人物一条可定年条目都没有时返回空串，模板只显示朝代名。
 * 不做「整段朝代起讫」兜底：那样「宋 960—1279」会被读成这个人的生卒跨度。
 */
function dynastyRange(dyn, minYear, maxYear) {
  if (!dyn || dyn.d) return '';
  if (minYear === null || maxYear === null) return '';
  var s = dyn.s;
  var e = dyn.e;
  if (s < minYear) s = minYear;
  if (e > maxYear) e = maxYear;
  if (s >= e) return '';
  var fmt = function (n) { return n < 0 ? '前' + (-n) : String(n); };
  return fmt(s) + '—' + fmt(e);
}

/**
 * 时间轴排序键：把年份转成可比较的数字，取不到返回 null。
 *
 * 复用 formatYear 先归一（"公元前571年"→-571、"建安十三年"→208年、"600年"→600），
 * 再从归一结果里取第一个数字 —— 不另写一套解析器，才能和展示口径始终一致。
 *
 * [注意] 两个必须处理的坑：
 *   ① 公元前必须转负数。库里 BC 存的是文本「约公元前571年」，若按正数排，
 *      「公元前571年」会排在「公元600年」后面 —— 老子的生平整个倒过来。
 *   ② 年号纪年（"贞观元年"）盲目提数字会得到 1，而它其实是 627 年。
 *      所以必须走 formatYear 的 NIANHAO 表转换，不能自己正则抠数字。
 *
 * null = 年代无法确定（空年份、"清代"、"东汉末年"）。这类条目不参与数字比较，
 * 由 sortEventsByYear 按「只标朝代 / 明确未知 / 认不出的时期」分层处理。
 */
function eventSortKey(year) {
  var s = formatYear(year);
  if (!s) return null;
  // 公元前判定要认两种写法。库里除「公元前108年」外，还有 280 条/115 人省略了「公元」
  // 二字写成「前108年」「约前98年」（司马迁「前108年任太史令」、汉惠帝「前205年被立
  // 为太子」）。只认「公元前」会把它们当成公元 108 年，排到整条时间轴最后 ——
  // 司马迁、汉惠帝的生平因此整个倒过来。
  // 「前后200年」的「前」后接「后」不是数字，不会被这里误判。
  var bc = s.indexOf('公元前') >= 0 || /^约?\s*前\s*\d{1,5}\s*年/.test(s);
  var m = s.match(/(\d{1,5})\s*年/);
  if (!m) return null;
  var n = parseInt(m[1], 10);
  if (isNaN(n)) return null;
  return bc ? -n : n;
}

/**
 * 时间轴按年代排序（稳定排序，最小扰动）。
 *
 * 为什么不能简单 `sort()`：库里 259,314 条事件是年号纪年或时期描述（"东汉末年"），
 * 43% 的人物存在「部分可定年、部分不可定年」的混合情况。直接按数字排会把所有
 * 无法定年的条目（数字被当成 0/NaN）甩到最前或最后，把原本通顺的叙事打散。
 *
 * 现在的分层处理（2026-11-15 起，配合年表「朝代区间带」）：
 *   ① 可定年条目 —— 按公元年比较，行为与旧版完全一致；
 *   ② 只标朝代（"清代" / "东晋" / "三国吴"）—— 不再继承前一条年份，改为按朝代序
 *      整体插入：落点 = 朝代结束年裁剪到「人物可定年区间」，再减 0.5 排进当年之后。
 *      同一朝代共用一个键，因此排序后必然相邻，渲染层才能合成一条带；
 *   ③ 未详/不详/空年份 —— 一律放到末尾（Infinity），不冒充任何朝代；
 *   ④ 其余认不出的时期描述（"上古"这类）—— 沿用旧的前向继承，保持叙事原位。
 *
 * 全部条目都无法定年时原样返回 —— 没有依据就不动顺序。
 */
function sortEventsByYear(events) {
  if (!events || events.length < 2) return events;
  var n = events.length;
  var keys = [];
  var minE = null;
  var maxE = null;
  var any = false;
  for (var i = 0; i < n; i++) {
    var k = eventSortKey(events[i] && events[i].year);
    keys.push(k);
    if (k !== null) {
      any = true;
      if (minE === null || k < minE) minE = k;
      if (maxE === null || k > maxE) maxE = k;
    }
  }
  if (!any) return events;

  var first = null;
  for (var p = 0; p < n; p++) {
    if (keys[p] !== null) { first = keys[p]; break; }
  }

  var sortKeys = new Array(n);
  var last = null;
  for (var j = 0; j < n; j++) {
    if (keys[j] !== null) {
      sortKeys[j] = keys[j];
      last = keys[j];
      continue;
    }
    var ev = events[j];
    var dyn = ev ? (ev._dyn !== undefined ? ev._dyn : matchDynasty(ev.year)) : null;
    if (dyn) {
      var base = dyn.e;
      if (base > maxE) base = maxE;
      if (base < minE) base = minE;
      // 小数位 + 朝代序号：同年先后来由朝代序决定，同朝代内部靠原始下标保持原顺序
      sortKeys[j] = base - 0.5 + dyn.i * 0.001;
      continue;
    }
    var rawYear = String((ev && ev.year) == null ? '' : ev.year).trim();
    var unknown = ev && ev._unknown !== undefined
      ? ev._unknown
      : (!rawYear || /^(未详|不详|待考|未知|无|—|-)$/.test(rawYear));
    if (unknown) {
      sortKeys[j] = Infinity;
      continue;
    }
    sortKeys[j] = last;
  }

  var arr = [];
  for (var q = 0; q < n; q++) {
    var kk = sortKeys[q];
    arr.push({ e: events[q], k: kk === null || kk === undefined ? first : kk, i: q });
  }
  // 末位用原始下标兜底，保证排序稳定（同键保持原有先后）
  arr.sort(function (a, b) { return (a.k - b.k) || (a.i - b.i); });
  var out = [];
  for (var r = 0; r < arr.length; r++) out.push(arr[r].e);
  return out;
}

/**
 * 占位模板事件判定 —— 复用 server/utils/indexability.js 里 `isMechanicalEvent()` 的
 * 占位模板判据（MECH_DESC_RES[0] / MECH_TITLE_TAIL_RE）。
 *
 * 只取「占位模板」这一部分，**不含**该函数里的「出生/逝世」「担任…一职」判据：
 * 后者是真实史实事件，时间线必须保留。
 * 命中即为导入时批量生成的兜底文案（"X代人物，生卒年代暂不详"），不是史实。
 */
var PLACEHOLDER_DESC = /为.{0,12}人物，生卒年代暂不详/;
var PLACEHOLDER_TITLE_TAIL = /人物$/;

function isPlaceholderEvent(ev) {
  if (typeof ev === 'string') {
    return PLACEHOLDER_TITLE_TAIL.test(ev.trim());
  }
  if (!ev || typeof ev !== 'object') return false;
  var title = String(ev.title || '').trim();
  var desc = String(ev.description || '').trim();
  if (PLACEHOLDER_DESC.test(desc)) return true;
  // 标题就是「X代人物」且没有任何年份 → 同样是占位，不是事件
  var time = String(ev.year || ev.time || '').trim();
  return PLACEHOLDER_TITLE_TAIL.test(title) && time === '';
}

/**
 * 把 figure 的 events/works/achievements/organizations/legacy/eraContext 中 year
 * 统一格式化（组织机构另有 startYear/endYear），返回新对象，不修改入参。
 */
function formatEventYears(figure) {
  if (!figure) return figure;
  var out = {};
  for (var k in figure) out[k] = figure[k];
  if (Array.isArray(out.events)) {
    // 先剔掉「X代人物，生卒年代暂不详」这类导入占位文案：它不是史实事件，
    // 留着会让用户误以为"这个人生平只有一条记载"。
    out.events = out.events.filter(function (ev) { return !isPlaceholderEvent(ev); });
    out.events = out.events.map(function (ev, i) {
      // [注意] 库里 1,034 条事件是**纯字符串**（涉及 53 人，如曹操的「官渡之战」「赤壁之战」、
      //    刘备的「三顾茅庐」），不是对象。此前这里 `return ev` 原样透传，wxml 里
      //    `item.year/title/description` 全是 undefined ⇒ 时间轴上渲染成一个圆点 + 三行空白，
      //    且 wx:key="title" 取到 undefined ⇒ 重复 key 告警。
      //    web 端 TimelineSection 早有此兼容（字符串 → { title }），这里对齐同口径。
      if (typeof ev === 'string') ev = { year: '', title: ev, description: '' };
      if (typeof ev !== 'object' || ev === null) return ev;
      var o = {};
      for (var ek in ev) o[ek] = ev[ek];
      // 库内 252,138 条事件（26.4%）把时间写在 time 而非 year，且无一条同时具备两者；
      // 此前只格式化 year，这些事件一律显示「年份不详」，其中 5.8 万条其实有真实公元年。
      o.year = formatYear(o.year || o.time);
      // 区分三种时间：可定年 / 仅朝代时期（明代、东汉末年）/ 明确未知（未详、不详）
      o._unknown = !o.year || /^(未详|不详|待考|未知|无|—|-)$/.test(o.year);
      o._period = !o._unknown && !/\d/.test(o.year);
      // 只标朝代的条目：归到朝代序表的哪一格（认不出为 null，保持原样展示与排序）
      o._dyn = o._period ? matchDynasty(o.year) : null;
      // 区间带标题用的规范朝代名（「清代」→「清」、「三国吴」→「三国」）
      o._periodLabel = o._dyn ? o._dyn.n : (o._period ? o.year : '');
      // wx:key 需要一个「同批内唯一」的字段：库内存在同 year 同 title 的重复事件
      // （如苻坚 383 年三条「淝水之战…」），用 title 作 key 会触发重复 key 告警。
      o._k = (o.year || '') + '|' + (o.title || '') + '|' + i;
      return o;
    });
    // 按年代归位（库里 1,509 人 / 1,520 处存在逆序，如居里夫人尾部「1934｜1867｜1934」、
    // 明神宗「1619｜1582｜1620」）。排序键复用 formatYear，见 sortEventsByYear 注释。
    out.events = sortEventsByYear(out.events);
  }
  if (Array.isArray(out.works)) {
    out.works = out.works.map(function (w) {
      var o = {};
      for (var wk in w) o[wk] = w[wk];
      o.year = formatYear(o.year);
      return o;
    });
  }
  // 成就与荣誉（与时间线同源格式化，避免出现「建安十三年」这类未转换年份）
  if (Array.isArray(out.achievements)) {
    out.achievements = out.achievements.map(function (a) {
      if (typeof a !== 'object' || a === null) return a;
      var o = {};
      for (var ak in a) o[ak] = a[ak];
      o.year = formatYear(o.year);
      return o;
    });
  }
  // 组织机构 / 时代背景（两者都带 year 字段）
  ['organizations', 'eraContext'].forEach(function (field) {
    if (!Array.isArray(out[field])) return;
    out[field] = out[field].map(function (it) {
      if (typeof it !== 'object' || it === null) return it;
      var o = {};
      for (var ik in it) o[ik] = it[ik];
      o.year = formatYear(o.year);
      // 组织机构条目新增起止年份（详情页展示为「起始—结束」区间）
      if (field === 'organizations') {
        if (o.startYear !== undefined) o.startYear = formatYear(o.startYear);
        if (o.endYear !== undefined) o.endYear = formatYear(o.endYear);
      }
      return o;
    });
  });
  // 纪念与遗产（条目新增 year 字段）
  if (Array.isArray(out.legacy)) {
    out.legacy = out.legacy.map(function (it) {
      if (typeof it !== 'object' || it === null) return it;
      var o = {};
      for (var lk in it) o[lk] = it[lk];
      o.year = formatYear(o.year);
      return o;
    });
  }
  return out;
}

/* ===================== 三之二、时间线阶段分组 ===================== */

/**
 * 读取事件上的阶段字段：兼容 { no, name } 与纯字符串两种写法。
 * Web 端 TimelineSection 使用同一契约（phase.no / phase.name）。
 */
function getEventPhase(ev) {
  if (!ev || typeof ev !== 'object') return null;
  var raw = ev.phase || ev.stage;
  if (!raw) return null;
  if (typeof raw === 'string') {
    var name = raw.replace(/\s+/g, '');
    return name ? { name: name } : null;
  }
  if (typeof raw === 'object' && typeof raw.name === 'string') {
    var n = raw.name.replace(/\s+/g, '');
    if (!n) return null;
    var no = Number(raw.no);
    return { no: no > 0 && isFinite(no) ? no : null, name: n };
  }
  return null;
}

/**
 * 从已格式化的年份文本里取一个可比较的数字（取第一个数字）。
 * 覆盖「公元 1037 年」「1037年—1057年」（取区间起点）、「前221年 / 公元前221年」（负数）；
 * formatYear 已把「建安十三年」这类年号转成公元年，所以这里只处理数字；
 * 纯时期文字（明代、东汉末年）返回 null，不参与区间计算。
 */
function eventYearNumber(y) {
  var s = String(y == null ? '' : y).trim();
  if (!s) return null;
  var bc = s.match(/(?:公元前|前)\s*(\d{1,5})/);
  if (bc) return -parseInt(bc[1], 10);
  var m = s.match(/\d{1,5}/);
  return m ? parseInt(m[0], 10) : null;
}

/**
 * 卡片头右侧的年份区间：只由组内事件年份算出，算不出就返回空串。
 * 绝不写假区间——整组都是「明代」这类时期标注时，模板直接不渲染这一段。
 */
function timelineRange(events) {
  var min = null;
  var max = null;
  for (var i = 0; i < events.length; i++) {
    var n = eventYearNumber(events[i].year);
    if (n === null) continue;
    if (min === null || n < min) min = n;
    if (max === null || n > max) max = n;
  }
  if (min === null) return '';
  var fmt = function (n) { return n < 0 ? '前' + (-n) : String(n); };
  return min === max ? fmt(min) : fmt(min) + ' — ' + fmt(max);
}

/**
 * 按阶段分组（2026-11-08 改为「每次都有卡片」）：
 *   · 有 phase → 每组一张卡，组间按 phase.no 升序；无阶段的散条并入「其他记载」垫后；
 *   · 无 phase → 整页退化为一张卡，名称固定「大事年表」，不编造阶段名。
 * 组内保持传入顺序（调用方已用 sortEventsByYear 归位）。
 * 每张卡附带：
 *   range   —— 由组内事件年份算出的区间（算不出为空串，模板不渲染）；
 *   isPhase —— 该组是否来自真实 phase（摘要「· N 段」只数这些，平铺人物不报段数）；
 *   noLabel —— 卡片头序号徽标（无 no 时为空串，模板隐藏）。
 */
function buildTimelineGroups(events) {
  if (!Array.isArray(events) || !events.length) return [];
  var hasPhase = false;
  for (var i = 0; i < events.length; i++) {
    if (getEventPhase(events[i])) { hasPhase = true; break; }
  }

  // 区间带裁剪用的人物可定年跨度（整份事件算一次，跨阶段卡片保持同一区间）
  var spanMin = null;
  var spanMax = null;
  for (var s = 0; s < events.length; s++) {
    var sk = eventSortKey(events[s] && events[s].year);
    if (sk === null) continue;
    if (spanMin === null || sk < spanMin) spanMin = sk;
    if (spanMax === null || sk > spanMax) spanMax = sk;
  }

  var groups = [];
  var byKey = {};
  for (var j = 0; j < events.length; j++) {
    var ph = getEventPhase(events[j]);
    var name = ph ? ph.name : (hasPhase ? '其他记载' : '大事年表');
    var key = ph ? (ph.no ? ph.no + '|' + name : name) : '__all';
    if (!byKey[key]) {
      byKey[key] = { key: key, no: ph ? ph.no : null, name: name, isPhase: !!ph, events: [] };
      groups.push(byKey[key]);
    }
    byKey[key].events.push(events[j]);
  }
  groups.sort(function (a, b) {
    if (a.no && b.no) return a.no - b.no;
    if (a.no) return -1;
    if (b.no) return 1;
    return 0;
  });
  for (var g = 0; g < groups.length; g++) {
    // 序号徽标用阿拉伯数字：小圆徽里「一」只有一横，辨识度低
    groups[g].noLabel = groups[g].no ? String(groups[g].no) : '';
    groups[g].range = timelineRange(groups[g].events);
    markPeriodBands(groups[g].events, spanMin, spanMax);
  }
  return groups;
}

/**
 * 给「只标朝代」的连续条目打区间带标记（就地写字段，模板据此渲染带首）。
 *
 * 排序阶段已保证同一朝代的条目键相同 ⇒ 在组内必然相邻，所以这里只做一次游程扫描：
 *   _band        该行属于区间带（左列年份留空）
 *   _bandFirst   带首：渲染「朝代 + 起止区间 + 朝代区间 + 条数」
 *   _bandLast    带尾：补下边框与圆角
 *   _bandName / _bandRange / _bandCount
 * 同时给末尾的「未详/不详/空年份」打 _undatedFirst / _undatedCount，渲染分隔行。
 */
function markPeriodBands(rows, spanMin, spanMax) {
  var r = 0;
  while (r < rows.length) {
    var dyn = rows[r] && rows[r]._dyn;
    if (!dyn) { r++; continue; }
    var end = r;
    while (end + 1 < rows.length && rows[end + 1] && rows[end + 1]._dyn
      && rows[end + 1]._dyn.n === dyn.n) end++;
    var range = dynastyRange(dyn, spanMin, spanMax);
    for (var b = r; b <= end; b++) {
      rows[b]._band = true;
      rows[b]._bandFirst = b === r;
      rows[b]._bandLast = b === end;
      rows[b]._bandName = dyn.n;
      rows[b]._bandRange = range;
      rows[b]._bandCount = end - r + 1;
    }
    r = end + 1;
  }

  var uStart = -1;
  for (var u = 0; u < rows.length; u++) {
    if (rows[u] && rows[u]._unknown) {
      if (uStart < 0) uStart = u;
    } else if (uStart >= 0) {
      markUndated(rows, uStart, u - 1);
      uStart = -1;
    }
  }
  if (uStart >= 0) markUndated(rows, uStart, rows.length - 1);
}

/** 末尾「无法定年」分隔：只在游程首行写标记，模板据此渲染一行说明 */
function markUndated(rows, start, end) {
  for (var i = start; i <= end; i++) {
    rows[i]._undatedFirst = i === start;
    rows[i]._undatedCount = end - start + 1;
  }
}

/* ===================== 四、帝王序号（与 Web 详情页同口径） ===================== */

/**
 * 序号转中文（1 → 一，12 → 十二）：沿用史书「第十二位」的写法。
 * 只覆盖 1–99，超出范围退回阿拉伯数字。
 */
function toCnNumber(n) {
  var d = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  if (!(n > 0) || Math.floor(n) !== n) return String(n);
  if (n < 10) return d[n];
  if (n < 20) return '十' + (n % 10 ? d[n % 10] : '');
  if (n < 100) return d[Math.floor(n / 10)] + '十' + (n % 10 ? d[n % 10] : '');
  return String(n);
}

/**
 * 生成详情页姓名下方的帝王胶囊文案（如「明朝第十二位皇帝」）。
 * emperor 由服务端 /api/figures 统一下发（与 /emperors 名录同一套排序）；
 * 非帝王、或所在段落为多政权混排（十六国/南北朝/五代十国）时不下发 → 返回 null。
 * @param {object} emperor { dynastyName, ordinal, total, estimated }
 * @returns {string|null}
 */
function buildEmperorLabel(emperor) {
  if (!emperor || !emperor.dynastyName || !(emperor.ordinal > 0)) return null;
  return emperor.dynastyName + '第' + toCnNumber(emperor.ordinal) + '位皇帝';
}

module.exports = {
  extractShortName: extractShortName,
  getDynastyTheme: getDynastyTheme,
  hexToRgba: hexToRgba,
  toText: toText,
  buildIntro: buildIntro,
  buildYears: buildYears,
  getAvatarChar: getAvatarChar,
  isImageAvatar: isImageAvatar,
  resolveAvatarUrl: resolveAvatarUrl,
  buildAvatar: buildAvatar,
  buildCarouselItem: buildCarouselItem,
  buildCarouselList: buildCarouselList,
  formatYear: formatYear,
  formatEventYears: formatEventYears,
  buildTimelineGroups: buildTimelineGroups,
  toCnNumber: toCnNumber,
  buildEmperorLabel: buildEmperorLabel
};
