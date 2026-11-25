/**
 * 专题页展示偏好（只存本机，不上服务端、不跨设备同步）
 *
 * 键名带版本号：以后结构调整（例如再加第三种形态）时换 v2，
 * 老键留着不影响读取；v1 的值本身只含两个字段，读坏一律回落默认值。
 *
 * 默认值：两列封面墙（d）+ 默认收起——即「专题设置」里风格列表的第二项。
 * [注意] 默认值只影响「从未存过偏好」的人；已存过偏好的用户读取到自己的值，
 *        不会被新默认覆盖（normalize 优先保留存储里的 a/d）。
 */

const STORAGE_KEY = 'shw_topic_view_prefs_v1';

const STYLE_A = 'a'; // 摘要行手风琴（组内单开）
const STYLE_D = 'd'; // 两列封面墙（单条横展）

const DEFAULTS = {
  style: STYLE_D,
  defaultExpanded: false
};

function normalize(raw) {
  if (!raw || typeof raw !== 'object') return { style: DEFAULTS.style, defaultExpanded: DEFAULTS.defaultExpanded };
  return {
    // 存储里明确写过 a / d 就照旧（老用户的选择不因改默认而变），其余回落默认
    style: (raw.style === STYLE_A || raw.style === STYLE_D) ? raw.style : DEFAULTS.style,
    // 只认真正的 true，其余（undefined / 字符串 / 读坏）都按收起
    defaultExpanded: raw.defaultExpanded === true
  };
}

/**
 * 读取偏好。任何异常（未登录、存储被清、值被写坏）都回落默认值，不抛给页面。
 * @returns {{style: 'a'|'d', defaultExpanded: boolean}}
 */
function read() {
  try {
    return normalize(wx.getStorageSync(STORAGE_KEY));
  } catch (e) {
    return { style: DEFAULTS.style, defaultExpanded: DEFAULTS.defaultExpanded };
  }
}

/**
 * 写入偏好。写失败（存储满 / 隐私限制）静默忽略：本次会话内页面已按新值渲染，
 * 下次进来回落默认值，不打扰用户。
 * @param {{style?: 'a'|'d', defaultExpanded?: boolean}} patch
 */
function write(patch) {
  const next = normalize(Object.assign({}, read(), patch || {}));
  try {
    wx.setStorageSync(STORAGE_KEY, next);
  } catch (e) { /* 本机存储不可用时只影响下次进来，不影响当前渲染 */ }
  return next;
}

module.exports = {
  STORAGE_KEY,
  STYLE_A,
  STYLE_D,
  DEFAULTS,
  read,
  write
};
