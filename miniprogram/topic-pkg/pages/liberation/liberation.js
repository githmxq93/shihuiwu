// 解放战争 · 各地解放时间线（数据取 /api/static/liberation）
// 2026-10-17 UI 重构，与 topic-pkg/pages/campaign 同皮肤、同交互范式：
//   ① 大区导航改为「切换内容」——原来 onTapRegion 只 setData(activeRegion) 改高亮，
//      而内容区始终 wx:for 全部 7 个大区，点「东北地区」界面纹丝不动；
//   ② 导航由流内横向条改为 fixed 吸顶（scroll-view 内 position:sticky 不生效）；
//   ③ 一次只渲染当前大区的省份（最多 7 省 / 88 市），城市列表默认折叠；
//   ④ 主要战役区整体可折叠，并为 57 场战役补齐「战役经过」；
//   ⑤ 回到顶部。
// 性能：setData 只送当前大区视图（view）；原始数据留在实例上（_raw），onUnload 释放。
const request = require('../../../utils/request');
const API = require('../../../config/api');

// 回到顶部按钮出现阈值（px）
const TO_TOP_THRESHOLD = 600;
// 滚动节流（ms）
const SCROLL_THROTTLE = 80;

Page({
  data: {
    safeAreaTop: 44,
    navH: 88,
    stats: [],
    regionTabs: [],
    activeKey: '',
    view: null,
    // 战役区默认展开：31 场战役都有「战役经过」介绍，折叠时用户完全看不到，
    // 会被误判成「没有写介绍」。仍然可点标题收起。
    campaignOpen: true,
    campaignGroups: [],
    campaignCount: 0,
    showTop: false,
    scrollToId: '',
    loading: true,
    loadFailed: false,
    isEmpty: false
  },

  onLoad() {
    const sysInfo = wx.getWindowInfo();
    const safeTop = sysInfo.statusBarHeight || 44;
    this.setData({ safeAreaTop: safeTop, navH: safeTop + 44 });
    this.fetchData();
  },

  onUnload() {
    this._raw = null;
    this._rawGroups = null;
    this._lastScrollAt = 0;
  },

  fetchData() {
    this.setData({ loading: true, loadFailed: false, isEmpty: false });
    request.getStatic('liberation', {
      timeout: 10000,
      success: (res) => {
        const d = res.data || {};
        // [重要] 必须有 else 分支：后端返回 success:false / 无 data 时若什么都不做，
        // 页面会既无内容也无失败提示，弱网下表现为永久空白。
        if (!d.success || !d.data) {
          this.setData({ loading: false, loadFailed: true });
          return;
        }
        const regions = Array.isArray(d.data.liberationRegions) ? d.data.liberationRegions : [];
        const groups = Array.isArray(d.data.liberationCampaignGroups)
          ? d.data.liberationCampaignGroups
          : [];
        const stats = Array.isArray(d.data.liberationStats) ? d.data.liberationStats : [];

        if (!regions.length && !groups.length) {
          this.setData({ loading: false, isEmpty: true });
          return;
        }

        this._raw = regions;
        this._rawGroups = groups;

        // 统计条只留前三项（7 大区 / 34 省 / 338 市）；
        // 第四项是「1945 起点 · 至 1951 收官」，已写在副标题里，重复反而挤。
        const topStats = stats.slice(0, 3);

        // 导航只用轻量摘要，避免把省份明细塞进 tab
        const regionTabs = regions.map((r) => {
          const provinces = r.provinces || [];
          let cities = 0;
          provinces.forEach((p) => {
            cities += (p.cities || []).length;
          });
          return {
            key: r.key,
            name: r.name,
            provinceCount: provinces.length,
            cityCount: cities
          };
        });

        const groupsView = this._buildGroups(groups);
        let campaignCount = 0;
        groupsView.forEach((g) => {
          campaignCount += g.count;
        });

        const firstKey = regions.length ? regions[0].key : '';
        this.setData({
          stats: topStats,
          regionTabs: regionTabs,
          activeKey: firstKey,
          view: this._buildView(firstKey),
          campaignGroups: groupsView,
          campaignCount: campaignCount,
          loading: false,
          isEmpty: false
        });
      },
      fail: () => this.setData({ loading: false, loadFailed: true })
    });
  },

  /** 组装某一个大区的省份视图；城市列表一律从折叠态开始 */
  _buildView(key) {
    const regions = this._raw || [];
    if (!regions.length) return null;
    const region = regions.filter((r) => r.key === key)[0] || regions[0];
    const provinces = [];
    let cityCount = 0;
    (region.provinces || []).forEach((p) => {
      const cities = (p.cities || []).map((c) => ({
        name: c.name,
        time: c.time,
        note: c.note || ''
      }));
      cityCount += cities.length;
      provinces.push({
        name: p.name,
        time: p.time,
        event: p.event,
        intro: p.intro || '',
        cities: cities,
        cityCount: cities.length,
        // 模板不写复合判断：可展开与否、是否显示大区时间标签，都在这里算成布尔
        hasCities: cities.length > 0,
        showTag: region.timeLabel !== '解放时间',
        open: false
      });
    });
    return {
      key: region.key,
      name: region.name,
      timeLabel: region.timeLabel,
      provinceCount: provinces.length,
      cityCount: cityCount,
      provinces: provinces
    };
  },

  /** 战役分组视图：组内全部展开（10 组 / 57 条，两层折叠太深） */
  _buildGroups(groups) {
    return (groups || []).map((g) => {
      const campaigns = (g.campaigns || []).map((c) => ({
        name: c.name,
        time: c.time,
        cities: c.cities,
        intro: c.intro || ''
      }));
      return { name: g.name, count: campaigns.length, campaigns: campaigns };
    });
  },

  onTapRegion(e) {
    const key = e.currentTarget.dataset.key;
    if (!key) return;
    // 点当前大区：不重建视图，只回到内容顶部，避免重复 setData
    if (key === this.data.activeKey) {
      this._scrollToContent();
      return;
    }
    this.setData({ activeKey: key, view: this._buildView(key) }, () => this._scrollToContent());
  },

  onToggleProvince(e) {
    const pi = Number(e.currentTarget.dataset.i);
    const view = this.data.view;
    const p = view && view.provinces[pi];
    if (!p || !p.hasCities) return;
    this.setData({ ['view.provinces[' + pi + '].open']: !p.open });
  },

  onToggleCampaigns() {
    this.setData({ campaignOpen: !this.data.campaignOpen });
  },

  // ---------- 滚动 ----------

  /** 切大区后把内容顶推到导航下方：先清空再赋值，重复触发同一目标也能滚动 */
  _scrollToContent() {
    this.setData({ scrollToId: '' }, () => {
      this.setData({ scrollToId: 'lib-content' });
    });
  },

  onToTop() {
    this.setData({ scrollToId: '' }, () => {
      this.setData({ scrollToId: 'lib-top' });
    });
  },

  onScroll(e) {
    const st = (e.detail && e.detail.scrollTop) || 0;
    const now = Date.now();
    if (now - this._lastScrollAt < SCROLL_THROTTLE) return;
    this._lastScrollAt = now;
    const show = st > TO_TOP_THRESHOLD;
    if (show !== this.data.showTop) this.setData({ showTop: show });
  },

  onRetry() {
    this.fetchData();
  },

  onShareAppMessage() {
    return {
      title: '解放战争 — 中国各地解放时间线（1945—1951）',
      path: '/topic-pkg/pages/liberation/liberation'
    };
  },

  // 朋友圈单页模式：本页无查询参数（数据自带全量），query 留空串。
  onShareTimeline() {
    return { title: '解放战争 — 中国各地解放时间线（1945—1951）' };
  }
});
