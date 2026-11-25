/**
 * 服务端时间显示工具（小程序端）
 *
 * [重要] 背景：服务端所有时间戳都来自 SQLite 的 `datetime('now')`，它返回的是 **UTC**，
 *    且字符串**不带时区标记**（形如 `2026-09-29 05:15:00`）。
 *    小程序此前直接 `String(...).replace('T',' ').slice(0,16)` 展示 → 比北京时间少 8 小时
 *    （用户实测：13:15 收到站内信，界面显示 05:15）。
 *    Web 端早就有等价实现 `src/lib/utils.ts` 的 `fmtTime()`，小程序端漏了，故在此统一补齐。
 *
 * [注意] 只改**展示层**：服务端/数据库继续存 UTC（这是正确做法，跨时区不会歧义），
 *    转换成本机时区是展示时的责任。
 */

var pad2 = function (n) { return (n < 10 ? '0' : '') + n; };

/**
 * 把服务端时间串解析成 Date
 *  - 带时区标记（`...Z` 或 `+08:00`）→ 原样交给 Date（如 tokenExpiresAt 的 ISO 串）
 *  - 不带时区标记的 `YYYY-MM-DD HH:MM:SS` → 按 UTC 解析（补 `Z`；空格换 `T` 以兼容 iOS 的 Date 解析）
 *  - 纯日期 `YYYY-MM-DD` → 原样返回（没有时刻可换算）
 * 解析失败返回 null
 */
function parseServerTime(s) {
  var str = (s === null || s === undefined) ? '' : String(s).trim();
  if (!str) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return null; // 纯日期：无时刻可换算
  var hasTz = /[zZ]$|[+-]\d{2}:?\d{2}$/.test(str);
  var d = new Date(hasTz ? str : str.replace(' ', 'T') + 'Z');
  return isNaN(d.getTime()) ? null : d;
}

/**
 * 格式化服务端时间为**本机时区**文本
 * @param {string} s   服务端时间串（UTC 或无时区标记）
 * @param {number} len 10=仅日期 / 16=到分钟（默认）/ 其他=到秒
 */
function fmtTime(s, len) {
  var size = len || 16;
  var raw = (s === null || s === undefined) ? '' : String(s);
  var d = parseServerTime(raw);
  if (!d) return raw.slice(0, size); // 解析不了就原样截断，绝不显示空白
  var base = d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  if (size <= 10) return base;
  var hm = pad2(d.getHours()) + ':' + pad2(d.getMinutes());
  return size <= 16 ? base + ' ' + hm : base + ' ' + hm + ':' + pad2(d.getSeconds());
}

/** 只取**本机时区**下的日期 YYYY-MM-DD（北京时间 0-8 点发布的内容不会显示成前一天） */
function fmtDate(s) {
  return fmtTime(s, 10);
}

module.exports = {
  parseServerTime: parseServerTime,
  fmtTime: fmtTime,
  fmtDate: fmtDate
};
