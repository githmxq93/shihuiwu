/**
 * 人物「身份标签」展示口径（小程序端）
 * ---------------------------------------------------------------------------
 * 背景：导入阶段把**数据来源标记**（如「CBDB」）当作身份标签写进了
 *       `figures.tags`，且多数位于 `tags[0]` —— 正好是详情页副标题取值位，
 *       于是被渲染成「明·CBDB」。
 *       数据层已于 2026-10-16 全量清除（`scripts/_cbdb_purge.cjs`）。
 *       本模块是**渲染层防御**，与 web 端 `src/utils/visibleTags.ts` 同口径，
 *       两端口径必须保持一致。
 *
 * 注意：本文件为 ES5 写法（小程序基础库兼容），且**不使用箭头函数 / Set**
 *       之外的新语法，避免低版本基础库解析失败。
 */

/** 数据来源标记 —— 不属于人物身份，禁止出现在任何展示位 */
var SOURCE_TAGS = ['CBDB'];

/** 是否为来源标记标签 */
function isSourceTag(tag) {
  return typeof tag === 'string' && SOURCE_TAGS.indexOf(tag.trim()) >= 0;
}

/**
 * 过滤空值与来源标记，返回可直接展示的身份标签数组。
 * 保持原有顺序与重复项，仅做「剔除」不做「改写」，行为差异最小。
 */
function visibleTags(tags) {
  if (!Array.isArray(tags)) return [];
  return tags.filter(function (t) {
    return typeof t === 'string' && t.trim() !== '' && SOURCE_TAGS.indexOf(t.trim()) < 0;
  });
}

module.exports = { SOURCE_TAGS: SOURCE_TAGS, isSourceTag: isSourceTag, visibleTags: visibleTags };
