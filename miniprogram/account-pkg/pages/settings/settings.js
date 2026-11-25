const topicPrefs = require('../../../utils/topic-prefs');
const { navTo } = require('../../../utils/nav');

/**
 * 设置列表页（世慧屋 · 本机偏好）
 *
 * 第一层只做「分类入口」，不直接摆选项：现在只有「专题设置」一项，
 * 以后加别的设置（例如阅读字号、推送）继续往这个列表里加行即可，不会挤乱。
 * 右侧展示当前口径摘要（如「封面墙 · 默认收起」），进二级页才改。
 *
 * [约束] 只写本机存储（utils/topic-prefs.js，键名带版本号），不调接口、不跨设备同步。
 */
Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 88,
    // 专题设置当前口径摘要
    topicSummary: ''
  },

  onLoad() {
    const sysInfo = wx.getWindowInfo();
    const safeAreaTop = sysInfo.statusBarHeight || 44;
    this.setData({ safeAreaTop, navBarHeight: safeAreaTop + 44 });
    this._refresh();
  },

  onShow() {
    // 从「专题设置」返回时同步摘要，避免显示改动前的旧值
    this._refresh();
  },

  _refresh() {
    const p = topicPrefs.read();
    this.setData({
      topicSummary: (p.style === topicPrefs.STYLE_D ? '封面墙' : '摘要行')
        + ' · ' + (p.defaultExpanded ? '默认展开' : '默认收起')
    });
  },

  onOpenTopicSettings() {
    navTo('/account-pkg/pages/settings-topic/settings-topic');
  }
});
