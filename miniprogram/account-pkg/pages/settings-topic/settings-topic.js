const topicPrefs = require('../../../utils/topic-prefs');

/**
 * 专题设置（设置列表的二级页 · 世慧屋本机偏好）
 *
 * 两项偏好：
 *   专题页风格：列表第一项「摘要行手风琴」（a）/ 第二项「两列封面墙」（d）
 *   默认状态：默认收起 / 默认展开首条
 *
 * [默认值] 从未存过偏好的人按默认值走，默认值取「风格列表的第二项」= 封面墙（d）。
 *          已存过偏好的用户读取到自己的 a / d，不会被新默认覆盖。
 * [约束] 只写本机存储（utils/topic-prefs.js，键名带版本号），不调接口、不跨设备同步。
 *        选完立刻落盘；专题页在 onShow 里读偏好，返回即生效，不需要重启。
 */
Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 88,
    style: topicPrefs.DEFAULTS.style,
    defaultExpanded: topicPrefs.DEFAULTS.defaultExpanded
  },

  onLoad() {
    const sysInfo = wx.getWindowInfo();
    const safeAreaTop = sysInfo.statusBarHeight || 44;
    this.setData({ safeAreaTop, navBarHeight: safeAreaTop + 44 });
    this._refresh();
  },

  onShow() {
    this._refresh();
  },

  _refresh() {
    const p = topicPrefs.read();
    this.setData({ style: p.style, defaultExpanded: p.defaultExpanded });
  },

  /** 选专题页风格：点击即写入，勾选态跟着走 */
  onPickStyle(e) {
    const style = e.currentTarget.dataset.style;
    if (style !== topicPrefs.STYLE_A && style !== topicPrefs.STYLE_D) return;
    if (style === this.data.style) return;
    topicPrefs.write({ style: style });
    this.setData({ style: style });
  },

  /** 选默认状态：0=收起，1=展开首条 */
  onPickDefault(e) {
    const expanded = String(e.currentTarget.dataset.expanded) === '1';
    if (expanded === this.data.defaultExpanded) return;
    topicPrefs.write({ defaultExpanded: expanded });
    this.setData({ defaultExpanded: expanded });
  }
});
