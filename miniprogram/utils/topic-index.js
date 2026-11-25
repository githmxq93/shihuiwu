/**
 * 专题索引（唯一来源）：专题 key → 专题名 + 专题 key → 有序篇目。
 *
 * 为什么要共用一份：
 *   · 整页文章（深链兜底）与首页/个人中心浮层都要判断「上一篇/下一篇」，
 *     若各写一套缓存，key/字段/排序稍有出入就会两处不一致。
 *   · 数据只来自已有的 TOPICS.LIST_LITE（列目录 lite 版，约 85KB），
 *     排序与服务端 TOPICS.GET(key) 相同（createdAt DESC, sortOrder ASC），
 *     所以这里算出来的顺序 == 专题页浮层看到的顺序。
 */
const CACHE_KEY = 'article_topic_names'; // 历史 key 名保留，避免旧缓存失效重下
const CACHE_TTL = 60 * 60 * 1000;

// 读缓存：过期 / 缺字段 / 旧版「值等于键」的脏映射都当作没有
function readCache() {
  try {
    const c = wx.getStorageSync(CACHE_KEY);
    if (!c || !c.time || !c.map) return null;
    if (Date.now() - c.time >= CACHE_TTL) return null;
    const keys = Object.keys(c.map);
    if (keys.length && keys.every((k) => c.map[k] === k)) return null;
    return c;
  } catch (e) {
    return null;
  }
}

function writeCache(map, lists) {
  try {
    wx.setStorageSync(CACHE_KEY, { time: Date.now(), map: map, lists: lists });
  } catch (e) { /* 存储满了也不影响本次渲染 */ }
}

// 把 LIST_LITE 的 data 数组转成 { map, lists }，只留翻篇需要的字段
function parseTopics(list) {
  const map = {};
  const lists = {};
  (Array.isArray(list) ? list : []).forEach((t) => {
    if (!t || !t.key) return;
    // 接口字段是 title（name 是历史误写，取不到才回落 key）
    map[t.key] = t.title || t.name || t.key;
    lists[t.key] = (t.articles || []).map((a) => ({
      id: a.id,
      title: a.title || '',
      createdAt: a.createdAt || ''
    }));
  });
  return { map: map, lists: lists };
}

// 在有序篇目里定位当前文章；-1 = 不在本专题
function indexOfArticle(list, id) {
  const arr = Array.isArray(list) ? list : [];
  for (let i = 0; i < arr.length; i++) {
    if (String(arr[i] && arr[i].id) === String(id)) return i;
  }
  return -1;
}

module.exports = {
  CACHE_KEY: CACHE_KEY,
  CACHE_TTL: CACHE_TTL,
  readCache: readCache,
  writeCache: writeCache,
  parseTopics: parseTopics,
  indexOfArticle: indexOfArticle
};
