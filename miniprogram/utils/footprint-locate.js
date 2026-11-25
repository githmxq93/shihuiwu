/**
 * 足迹定位共享模块（主包 utils）
 *
 * [重要] 为什么单独抽出来：
 *    「人物 A 到底有没有可上地图的足迹」这个问题，两处都要回答——
 *      1) 足迹页（footprint-pkg）拿到人物后要算出站点；
 *      2) 人物详情页（detail-pkg）的「查看一生足迹地图」入口在跳转前要先判断，
 *         没数据就该直接告诉用户，而不是跳过去给一个空态页。
 *    分包（footprint-pkg）的代码**不能**被另一个分包（detail-pkg）require，
 *    所以解析逻辑必须落在主包，两端 require 同一份，口径才不会分叉。
 *
 * [注意] 与 web 端 src/pages/FootprintPage.tsx 的解析口径逐行对齐，改这里请同步改 web。
 * [注意] 大小：词典 269 键（~16.5KB）在主包，两个分包都不必各存一份。
 * [重要] 上传检查合规（2026-10-23）：本模块只被两个分包使用，而微信上传检查要求
 *    「主包 JS 必须被主包自身使用」⇒ app.js 已 require 本模块并注册到
 *    globalData.footprintLocate。**勿删 app.js 里那行 require**，否则上传检查
 *    会重新判「主包内不应存在主包未使用的JS文件」而失败。
 */

// [性能 2026-11-09] 两份词典改为**首次使用时**加载。
// 本模块在 app.js 冷启动时就被 require（上传检查要求主包自用），若在此处同步 require
// 词典，等于把 110.9KB 词典（桌面 Node 冷载 18.3ms，低端机约 40~60ms）压在冷启动上，
// 而首页/首屏根本用不到地名解析。改为懒加载：模块本身仍常驻主包，
// app.js 那行 require 保留不动（上传检查口径不变）。
var LOCATIONS = null;
var LOCATIONS_PLACE = null;
function ensureLocations() {
  if (LOCATIONS && LOCATIONS_PLACE) return;
  LOCATIONS = require('./data/locations');
  // 整格地名（region / birthPlace / deathPlace 专用）。**不并入 LOCATIONS**：
  // 主词典要参与正文扫描，「万年」「长乐」「新建」这类同时是常用词的县名一旦进去会大量误命中。
  // 那两个字段一格就是一个地名，不存在嵌入句中的情况，所以可以安全收。
  LOCATIONS_PLACE = require('./data/locations-place');
}

// 「X（今Y）」：括号里才是现代具体地名。注意末尾的 )） 两种全半角都要收。
var PAREN_MODERN_RE = /[（(]\s*今?([^（()）]{1,40})[)）]/;

// 整格字段里的占位写法：这些不是地名，解析不出来就必须返回 null，
// 绝不能退化成「未」「详」「不」之类被当成地名去扫。
var PLACE_PLACEHOLDER_RE = /^(?:\[?未详\]?|\[?不详\]?|未知|无|—|-\?|\?|？|不明|待考|阙)$/;

// 省级 / 大区级键：命中也只能算「大区精度」。
// [注意] 不降级的话，列表里「河南」和「洛阳」看起来一样精确 ——
//    而 region 写「河南」的人，实际籍贯可能是省内任何一县，把省中心点当籍贯会误导。
//    命中这些键时 precision='coarse'，页面上会显示「仅到『河南』一级」。
var COARSE_KEYS = {
  '中国': 1, '全国': 1,
  '河北': 1, '山西': 1, '辽宁': 1, '吉林': 1, '黑龙江': 1, '江苏': 1, '浙江': 1,
  '安徽': 1, '福建': 1, '江西': 1, '山东': 1, '河南': 1, '湖北': 1, '湖南': 1,
  '广东': 1, '海南': 1, '四川': 1, '贵州': 1, '云南': 1, '陕西': 1, '甘肃': 1,
  '青海': 1, '台湾': 1, '内蒙古': 1, '广西': 1, '西藏': 1, '宁夏': 1, '新疆': 1,
  '香港': 1, '澳门': 1,
  '东北': 1, '华北': 1, '华东': 1, '华南': 1, '华中': 1, '西北': 1, '西南': 1,
  '关中': 1, '河东': 1, '河西': 1, '岭南': 1, '陇右': 1, '南中': 1, '中原': 1,
};

function locNameOf(key) {
  ensureLocations();
  var d = LOCATIONS[key] || LOCATIONS_PLACE[key];
  return key + (d && d.note ? '（' + d.note + '）' : '');
}

// 命中位置后紧跟这些字 ⇒ 机构/建筑名而非地名（「大理寺」不是云南大理、「国子监」不是国子）。
// 只收建筑类后缀；城/府/州/县/郡/市/关 是行政或地名后缀，不能进这张表。
var INSTITUTION_SUFFIX = '寺狱监院观祠陵庙塔庵楼阁殿宫门桥仓局司署学';

// [重要] 非地名专名：这些词里**含有**词典键，但整词根本不是地名（「孙中山」里的「中山」
//    是人名，不是河北定州）。扫地名前先把它们整词挖掉，否则宋庆龄会因「与孙中山结婚」
//    被判成有足迹、跳进足迹页却一个点都没有 —— 这正是入口预检要防的那类事故。
//    挖掉用等长空格占位，避免挖空后把前后字意外拼成一个新地名。
var NEGATIVE_TERMS = ['孙中山', '中山装', '中山舰', '中南海', '沙县小吃', '崇安寺'];

function stripNegativeTerms(text) {
  if (!text) return '';
  var out = text;
  for (var i = 0; i < NEGATIVE_TERMS.length; i++) {
    var t = NEGATIVE_TERMS[i];
    var at = out.indexOf(t);
    while (at !== -1) {
      var pad = '';
      for (var j = 0; j < t.length; j++) pad += ' ';
      out = out.slice(0, at) + pad + out.slice(at + t.length);
      at = out.indexOf(t, at + t.length);
    }
  }
  return out;
}

// 先比长度（更长的更具体），同长度取出现位置更靠后的
// ——「X（今Y）」结构里靠后的 Y 才是现代具体地名
// preferFirst=true（无 location 时的标题兜底）取**最先**出现的地名：
// 标题句法通常是「主体 + 事件发生地 + 背景」，第一个地名多半就是事件发生地。
function findLocationKey(text, preferFirst) {
  if (!text) return '';
  ensureLocations();
  var haystack = stripNegativeTerms(text);
  var bestKey = '', bestAt = -1;
  for (var key in LOCATIONS) {
    // 同一个键可能在文本里出现多次（如「大理寺…大理国」），跳过机构名的那些位置
    var at = haystack.indexOf(key);
    while (at !== -1) {
      // [注意] charAt 越界返回 ''，而 '...'.indexOf('') === 0 —— 不判空会把「位于文本
      // 末尾的地名」全部误当成机构名跳过（「河南开封」的「开封」就因此被漏掉）
      var next = haystack.charAt(at + key.length);
      if (!next || INSTITUTION_SUFFIX.indexOf(next) === -1) break;
      at = haystack.indexOf(key, at + 1);
    }
    if (at === -1) continue;
    if (!bestKey) { bestKey = key; bestAt = at; continue; }
    if (preferFirst) {
      if (at < bestAt) { bestKey = key; bestAt = at; }
    } else if (key.length > bestKey.length || (key.length === bestKey.length && at > bestAt)) {
      bestKey = key;
      bestAt = at;
    }
  }
  return bestKey;
}

function toResolved(key) {
  if (!key) return null;
  ensureLocations();
  var d = LOCATIONS[key] || LOCATIONS_PLACE[key];
  if (!d || d.lat == null) return null;
  // 省名 / 大区名命中也算出点，但只能算「大区精度」——与 resolvePlaceField 同一把尺子。
  // [注意] 事件侧以前没有这个标记，于是 location 写「河南」的事件被画成一个和「洛阳」
  //    一样精确的普通足迹点，读者会当成他真的到过省会。这里补上 precision，
  //    页面据此显示「仅到『河南』一级」，标记也降调。
  return {
    lat: d.lat, lng: d.lng, name: locNameOf(key), key: key,
    precision: COARSE_KEYS[key] ? 'coarse' : 'exact'
  };
}

/**
 * 单条生平事件 → 地图坐标。解析不出返回 null（宁缺不编）。
 *
 * 五步：
 *   ① location 是带坐标的对象 → 直接用
 *   ② 事件自带顶层 locationLat/locationLng（有限数且在合法范围内）→ 直接用
 *   ③ location 精确命中词典 → 用
 *   ④ location 文本含「（今X）」→ 优先在括号内找词典键，找不到再扫整条 location
 *   ⑤ 完全没有 location 字段 → 只扫 title + location_desc，**不扫 description**
 *
 * [注意] 旧实现无条件拿 title+description 扫 269 个词典键，导致「汴京（今河南开封）」
 *    被正文里的「大理寺」画到云南、「碎叶城」被正文里的「四川」画到成都；
 *    实测 29.8% 的事件落点与自身 location 字段矛盾。description 是大段史料叙述，
 *    里面的地名多是背景（「自海南北归途中病逝于常州」会把卒地画到海南）。
 *
 * @param {object} evt  生平事件 { location, title, location_desc, description, year }
 * @returns {{lat:number,lng:number,name:string,key?:string,precision:'exact'|'coarse'}|null}
 */
function resolveEventLocation(evt) {
  if (!evt) return null;
  ensureLocations();
  var loc = evt.location;
  if (loc && typeof loc === 'object' && loc.lat != null) {
    // 显式带坐标 = 调用方已经把地名压成了点，精度由调用方负责，这里如实标 exact。
    // [重要] 必须校验是**有限数值**：接口里少数 location 对象的 lat/lng 是字符串，
    // 原样透传会让 map 的 polyline points 非法 —— 渲染层报
    // 「MultiPolyline.geometries: …第0元素的paths属性无效！」并连锁抛 RangeError。
    // 校验不过就当没有坐标，继续走下面的文本解析（宁可少一个点，也不给地图坏数据）。
    var oLat = typeof loc.lat === 'number' ? loc.lat : Number(loc.lat);
    var oLng = typeof loc.lng === 'number' ? loc.lng : Number(loc.lng);
    if (isFinite(oLat) && isFinite(oLng) &&
        Math.abs(oLat) <= 90 && Math.abs(oLng) <= 180 &&
        !(oLat === 0 && oLng === 0)) {
      return { lat: oLat, lng: oLng, name: loc.name || '', precision: 'exact' };
    }
  }
  var locStr = typeof loc === 'string' ? loc : '';

  // ② 事件自带顶层坐标（location 保持字符串给年表渲染，坐标另放 locationLng/LocationLat）
  //    与 web 端 src/utils/footprint-locate.ts 逐字对齐：全库 3006 档 / 6396 条事件是这个
  //    形态，location 多为「古地名（今境外某地）」，国内整格词典永远命不中。
  var rawLat = evt.locationLat;
  var rawLng = evt.locationLng;
  if (
    typeof rawLat === 'number' && isFinite(rawLat) && Math.abs(rawLat) <= 90 &&
    typeof rawLng === 'number' && isFinite(rawLng) && Math.abs(rawLng) <= 180 &&
    !(rawLat === 0 && rawLng === 0)
  ) {
    var mainName = locStr ? locStr.split(/[（(]/)[0].trim() : '';
    return {
      lat: rawLat,
      lng: rawLng,
      name: locStr || mainName,
      key: mainName || undefined,
      precision: 'exact',
    };
  }

  if (locStr) {
    if (LOCATIONS[locStr]) return toResolved(locStr);
    var pm = locStr.match(PAREN_MODERN_RE);
    if (pm) {
      var inParen = toResolved(findLocationKey(pm[1]));
      if (inParen) return inParen;
    }
    return toResolved(findLocationKey(locStr));
  }
  return toResolved(findLocationKey((evt.title || '') + ' ' + (evt.location_desc || ''), true));
}

/**
 * 整格地名 → 坐标（region / birthPlace / deathPlace 专用）
 *
 * 与 resolveEventLocation 的根本区别：这里的输入**整格就是一个地名**，
 * 不是一句话。所以：
 *   ① 可以放心用整格词典 LOCATIONS_PLACE（「万年」「长乐」「新建」这类
 *      同时是常用词的县名，只有在不参与正文扫描的前提下才敢收）；
 *   ② 可以认「大区/小区」格式（「陕西/西安」「英国/斯特拉特福」），
 *      取**最右段**——那是最具体的一级。
 *
 * [注意] 最右段命不中时**不得**把整串丢给 findLocationKey。旧逻辑那样做，
 *    会让「英国/斯特拉特福」命中「英国」被画到伦敦、「山东/临沂」落到济南，
 *    而 UI 上显示的是一个具体城市名，读者会当成本人真的在那里。
 *    这里改为：退回**第一段（大区）**并标 precision='coarse'，
 *    同时 name 只给大区名（不带 note，避免「英国（伦敦）」这种误导）。
 *
 * @param {string} raw  字段原值
 * @returns {{lat:number,lng:number,name:string,key:string,precision:'exact'|'coarse'}|null}
 */
function resolvePlaceField(raw) {
  if (raw == null) return null;
  ensureLocations();
  var s = String(raw).trim();
  if (!s || PLACE_PLACEHOLDER_RE.test(s)) return null;

  var parts = s.split(/[\/／>＞、，,]/).map(function (x) { return x.trim(); })
    .filter(function (x) { return !!x; });
  if (!parts.length) return null;

  var last = parts[parts.length - 1];
  var k = matchPlaceSegment(last);
  if (k) {
    var d = LOCATIONS[k] || LOCATIONS_PLACE[k];
    return { lat: d.lat, lng: d.lng, name: locNameOf(k), key: k,
      precision: COARSE_KEYS[k] ? 'coarse' : 'exact' };
  }

  // 末段无果：只有「多段」才谈得上退回大区。单段命不中就是命不中，
  // 退无可退（否则「苦县」会被扫成「苦」之类，纯属编造）。
  if (parts.length > 1) {
    var head = parts[0];
    var hk = LOCATIONS[head] ? head : (LOCATIONS_PLACE[head] ? head : '');
    if (hk) {
      var hd = LOCATIONS[hk] || LOCATIONS_PLACE[hk];
      // name 只给大区名，不带 note：note 里常是首府（「英国」的 note 是「伦敦」，
      // 而斯特拉特福并不在伦敦）
      return { lat: hd.lat, lng: hd.lng, name: hk, key: hk, precision: 'coarse' };
    }
  }
  return null;
}

/** 单段地名匹配：整格词典 → 主词典 → 括号「今X」→ 整格扫描 → 主词典扫描 */
function matchPlaceSegment(seg) {
  var s = String(seg || '').trim();
  if (!s) return '';
  ensureLocations();
  if (LOCATIONS_PLACE[s]) return s;
  if (LOCATIONS[s]) return s;
  var pm = s.match(PAREN_MODERN_RE);
  if (pm) {
    var inner = pm[1].trim();
    if (LOCATIONS_PLACE[inner]) return inner;
    if (LOCATIONS[inner]) return inner;
    var k1 = findLocationKey(inner);
    if (k1) return k1;
  }
  // 整格词典参与扫描是安全的：s 本身就是一格地名，不存在「嵌在句子里」的误判。
  // 取最长键，避免「福州长乐」被较短键抢先。
  var best = '';
  for (var key in LOCATIONS_PLACE) {
    if (s.indexOf(key) !== -1 && key.length > best.length) best = key;
  }
  if (best) return best;
  return findLocationKey(s);
}

/* bio 籍贯抽取专用：句读切段（不切括号，括号另做整体剔除） */
var BIO_SEG_SPLIT = /[，。；、：！？\r\n]/;
// 段末是「人」但不是籍贯：命妇封号 + 身份词。真实库里这两类占了「X人」的绝大多数
// （未命中 Top 全是孺人 642 / 安人 414 / 宜人 389 / 举人 2044），不挡就全是脏点。
var BIO_NOT_PLACE = ['孺人', '安人', '宜人', '恭人', '淑人', '硕人', '令人', '夫人', '举人', '舍人',
  '诗人', '词人', '文人', '后人', '门人', '族人', '乡人', '邑人', '国人', '众人', '古人', '今人',
  '匠人', '商人', '伶人', '艺人', '道人', '僧人', '主人', '客人', '病人', '妇人', '士人', '庶人',
  '武人', '旁人', '他人', '世人', '时人', '后人'];

/**
 * 从 bio 抽籍贯（region 为空时的最后一道兜底）。
 *
 * [为什么不拿它当主力] 实测全库 region 为空且有 bio 的 18.6 万档里，
 *    能这样抽到的只有 **2,067 档（1.1%）**——瓶颈不是词典，是 bio 里
 *    压根不写「X 人」。所以它只配做最后一道兜底，不能替代 region。
 *
 * [为什么必须是「整格命中」而不是扫描] 段本身已经是「地名短语 + 人」，
 *    再允许内部扫描就会把「我遣谍」「死者万余」这类残句扫成地名。
 *    这里只做**最长后缀的精确命中**：琅邪临沂人 → 临沂（词典有则中），
 *    词典没有就整个放弃，绝不退回扫描。
 *
 * [注意] 括号必须先整体剔除。本库最常见写法是「吴县（今江苏苏州）人」，
 *    若把括号当句读切，这一段会碎成「吴县」「今江苏苏州」「人」，
 *    末段只剩一个「人」→ 全部漏抽（第一版就漏在这，2,067 变 1,220）。
 *    剔除后还要把空白吃掉：「嘉定（今属上海）人」会变成「嘉定 人」，
 *    带空格的后缀永远匹配不上词典键。
 */
function originFromBio(bio) {
  var s0 = String(bio || '');
  if (!s0) return null;
  ensureLocations();
  var s = s0.replace(/[（(][^（()）]{0,40}[)）]/g, '').replace(/\s+/g, '');
  var start = 0;
  for (var i = 0; i <= s.length; i++) {
    if (i !== s.length && !BIO_SEG_SPLIT.test(s.charAt(i))) continue;
    var seg = s.slice(start, i).trim();
    start = i + 1;
    if (seg.length < 3 || seg.charAt(seg.length - 1) !== '人') continue;
    if (/[0-9０-９]/.test(seg)) continue;            // 「三百人」「三千人」
    var bad = false;
    for (var b = 0; b < BIO_NOT_PLACE.length; b++) {
      if (seg.slice(-BIO_NOT_PLACE[b].length) === BIO_NOT_PLACE[b]) { bad = true; break; }
    }
    if (bad) continue;
    var body = seg.slice(0, -1);
    // 最长后缀优先：从最左开始切，越靠左剩下的越长、越具体
    for (var cut = 0; cut <= body.length - 2; cut++) {
      var cand = body.slice(cut);
      var k = LOCATIONS_PLACE[cand] ? cand : (LOCATIONS[cand] ? cand : '');
      if (!k) continue;
      var d = LOCATIONS[k] || LOCATIONS_PLACE[k];
      return {
        lat: d.lat, lng: d.lng, name: locNameOf(k), key: k,
        precision: COARSE_KEYS[k] ? 'coarse' : 'exact',
        source: 'bio'
      };
    }
  }
  return null;
}

/**
 * 兜底站点：人物档案自带的籍贯 / 出生地 / 卒地。
 *
 * [为什么需要] 全库 51.8 万有生平事件的人物里，只有 1.8% 有可定位事件
 *    （events[].location 填写率 2.6%，其中还有 26% 命不中词典）。
 *    只靠 events，98% 的人打开足迹页是空图 —— 而 region（籍贯）填写率是 64.2%。
 *    既然事件定位不出来，就先把他「在哪里」这件事画出来。
 *
 * [注意] 站点带 siteType，页面**必须**据此标注，不能伪装成「到过」：
 *    origin=籍贯（本贯）、birth=出生地、death=卒地。
 *    籍贯是祖籍/本贯，不等于出生地，更不等于生平活动地。
 *
 * @param {object} figure  人物对象（读 region / birthPlace / deathPlace / bio）
 * @returns {Array<{lat,lng,name,key,precision,siteType,source?}>} 坐标去重后的站点
 */
function extraPlaceSites(figure) {
  var out = [];
  if (!figure) return out;
  var seen = {};

  function put(raw, type) {
    var r = resolvePlaceField(raw);
    if (!r) return;
    var sig = r.lat.toFixed(3) + ',' + r.lng.toFixed(3);
    if (seen[sig]) return;   // 同一点只留一次（籍贯与生地常是同一处）
    seen[sig] = 1;
    out.push({ lat: r.lat, lng: r.lng, name: r.name, key: r.key, precision: r.precision, siteType: type });
  }

  // 顺序即语义优先级：籍贯 → 生地 → 卒地
  put(figure.region, 'origin');
  put(figure.birthPlace, 'birth');
  put(figure.deathPlace, 'death');

  // 三个字段**全都**没戏时，才退到 bio 的「X 人」句式。
  // 不并在前面：bio 是叙述文本，可信度低于结构化字段，不能和它们混排抢位。
  if (!out.length) {
    var fromBio = originFromBio(figure.bio);
    if (fromBio) {
      seen[fromBio.lat.toFixed(3) + ',' + fromBio.lng.toFixed(3)] = 1;
      out.push({
        lat: fromBio.lat, lng: fromBio.lng, name: fromBio.name, key: fromBio.key,
        precision: fromBio.precision, siteType: 'origin', source: 'bio'
      });
    }
  }
  return out;
}

/**
 * 预检：这个人物在足迹页上**能不能画出至少一个点**？
 *
 * 判据 = 事件可定位 ∪ 档案位置字段可定位。与足迹页的 extractLocations +
 * extraPlaceSites 同源，所以这里说「有」，跳过去就一定有站点。
 *
 * @param {object|Array} figureOrEvents  传整个 figure 对象（推荐）或旧的 events 数组
 * @returns {boolean}
 */
function hasFootprint(figureOrEvents) {
  if (!figureOrEvents) return false;
  // 兼容旧调用：直接传 events 数组/JSON 串时只判事件（不猜人物字段）
  if (Array.isArray(figureOrEvents) || typeof figureOrEvents === 'string') {
    return hasTraceableLocations(figureOrEvents);
  }
  var f = figureOrEvents;
  if (hasTraceableLocations(f.events)) return true;
  try {
    return extraPlaceSites(f).length > 0;
  } catch (e) {
    return true;   // 兜底不阻断：让足迹页自己的空态说明
  }
}

/**
 * 预检：这个人物的 events 里**至少有一条**能定位到地图吗？
 *
 * 用途：详情页「查看一生足迹地图」入口跳转前的守卫。
 * 实测全库 555,462 个有 events 的人物里只有 1.8%（9,944 人）有可定位事件，
 * 入口若无条件显示，98% 的用户点进去只会看到「暂无足迹数据」——
 * 与其让人白跳一次，不如当场说明。
 *
 * [注意] 与足迹页 extractLocations 用的是同一个 resolveEventLocation，
 *    所以这里说「有」，跳过去就一定有站点，不会出现两端结论打架。
 *
 * @param {Array} events  生平事件数组（可以是 undefined / 非数组 / JSON 串都会安全返回 false）
 * @returns {boolean}
 */
function hasTraceableLocations(events) {
  try {
    ensureLocations();
    var list = events;
    if (typeof list === 'string') {
      try { list = JSON.parse(list); } catch (e) { return false; }
    }
    if (!Array.isArray(list)) return false;
    for (var i = 0; i < list.length; i++) {
      if (resolveEventLocation(list[i])) return true;
    }
    return false;
  } catch (e) {
    // 预检失败绝不能阻断用户进足迹页：保守放行，让足迹页自己的空态兜底
    return true;
  }
}

module.exports = {
  resolveEventLocation: resolveEventLocation,
  resolvePlaceField: resolvePlaceField,
  originFromBio: originFromBio,
  extraPlaceSites: extraPlaceSites,
  hasFootprint: hasFootprint,
  hasTraceableLocations: hasTraceableLocations,
  findLocationKey: findLocationKey
};

// 兼容旧 API：词典仍以 LOCATIONS / LOCATIONS_PLACE 暴露，但改用 getter，
// 避免「require 本模块」就把 110.9KB 词典一起拉起来（那正是本次优化要消掉的成本）。
// 全项目无 `.LOCATIONS` 外部读取；若将来有人读，语义与直接 require 完全一致。
Object.defineProperty(module.exports, 'LOCATIONS', {
  enumerable: true,
  get: function () { ensureLocations(); return LOCATIONS; }
});
Object.defineProperty(module.exports, 'LOCATIONS_PLACE', {
  enumerable: true,
  get: function () { ensureLocations(); return LOCATIONS_PLACE; }
});
