// 历代战役史 —— 按历史时期切换浏览（对齐 web 端 /campaign，数据取 /api/static/campaigns）
// 2026-10-17 UI 重构：
//   ① 时期导航改为「切换内容」——原来点导航只改高亮颜色，内容纹丝不动；
//   ② 导航 fixed 吸顶（scroll-view 内 position:sticky 不生效）；
//   ③ 一次只渲染当前时期（最多 80 条），不再 253 条全量铺开；
//   ④ 新增「只看重大战役」筛选与分组折叠、回到顶部。
//   ⑤ 2026-10-17 数据补充：195 → 253 场，新增「各省光复与北方起义」「局部抗战（1931—1937）」
//      「川陕苏区与红二、六军团」三个分组；小程序无需改代码，条数为动态统计。
// 性能：setData 只送当前时期视图（view），原始数据留在实例上（_raw），onUnload 释放。
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
    eraTabs: [],
    dynastyGroups: [],
    activeKey: '',
    view: null,
    onlyMajor: false,
    totalCampaigns: 0,
    majorTotal: 0,
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
    this._lastScrollAt = 0;
  },

  fetchData() {
    this.setData({ loading: true, loadFailed: false, isEmpty: false });
    request.getStatic('campaigns', {
      timeout: 10000,
      success: (res) => {
        const d = res.data || {};
        // [重要] 必须有 else 分支：success:false 时若仍按空数据处理，用户看到的是
        // 「暂无数据」而非「加载失败」，会误判为内容本就没有、放弃重试。
        if (!d.success || !d.data) {
          this.setData({ loading: false, loadFailed: true });
          return;
        }
        const eras = Array.isArray(d.data.campaignEras) ? d.data.campaignEras : [];
        if (!eras.length) {
          this._raw = [];
          this.setData({ loading: false, isEmpty: true });
          return;
        }
        this._raw = eras;

        let total = 0;
        let majorTotal = 0;
        // 导航只用轻量摘要，避免把 253 张卡片都塞进 tab
        const eraTabs = eras.map((era) => {
          let t = 0;
          let m = 0;
          (era.groups || []).forEach((g) => {
            const list = g.campaigns || [];
            t += list.length;
            m += list.filter((c) => c.major).length;
          });
          total += t;
          majorTotal += m;
          return { key: era.key, name: era.name, years: era.years, dynasty: era.dynasty, total: t, majorCount: m };
        });

        // 导航按朝代分组：同一 dynasty 的时期归到一组
        const dynastyGroups = [];
        eraTabs.forEach((t) => {
          let g = dynastyGroups.find((x) => x.name === t.dynasty);
          if (!g) {
            g = { name: t.dynasty, tabs: [] };
            dynastyGroups.push(g);
          }
          g.tabs.push(t);
        });

        const firstKey = eras[0].key;
        this.setData({
          eraTabs: eraTabs,
          dynastyGroups: dynastyGroups,
          activeKey: firstKey,
          totalCampaigns: total,
          majorTotal: majorTotal,
          view: this._buildView(firstKey, false),
          loading: false
        });
      },
      fail: () => this.setData({ loading: false, loadFailed: true })
    });
  },

  /** 组装某一个时期的展示视图；onlyMajor 过滤后为空的阶段整组隐去 */
  _buildView(key, onlyMajor) {
    const eras = this._raw || [];
    const era = eras.filter((e) => e.key === key)[0] || eras[0];
    if (!era) return null;
    const groups = [];
    let shown = 0;
    (era.groups || []).forEach((g) => {
      const list = (g.campaigns || [])
        .filter((c) => !onlyMajor || c.major)
        // 只送模板真会读的字段，顺带把「地点为 — / 空」提前算成布尔，模板不必写复合判断
        .map((c) => ({
          name: c.name,
          time: c.time,
          location: c.location,
          result: c.result,
          intro: c.intro || '',
          major: !!c.major,
          hasLoc: !!c.location && c.location !== '—'
        }));
      if (!list.length) return;
      shown += list.length;
      groups.push({ name: g.name, count: list.length, open: true, campaigns: list });
    });
    return {
      key: era.key,
      name: era.name,
      years: era.years,
      groups: groups,
      shown: shown,
      empty: groups.length === 0
    };
  },

  onTapEra(e) {
    const key = e.currentTarget.dataset.key;
    if (!key) return;
    // 点当前时期：不重建视图，只回到内容顶部，避免重复 setData
    if (key === this.data.activeKey) {
      this._scrollToContent();
      return;
    }
    this.setData(
      { activeKey: key, view: this._buildView(key, this.data.onlyMajor) },
      () => this._scrollToContent()
    );
  },

  onToggleMajor() {
    const onlyMajor = !this.data.onlyMajor;
    this.setData({ onlyMajor: onlyMajor, view: this._buildView(this.data.activeKey, onlyMajor) });
  },

  onToggleGroup(e) {
    const gi = Number(e.currentTarget.dataset.g);
    const view = this.data.view;
    const g = view && view.groups[gi];
    if (!g) return;
    this.setData({ ['view.groups[' + gi + '].open']: !g.open });
  },

  // ---------- 滚动 ----------

  /** 切时期后把内容顶推到导航下方：先清空再赋值，重复触发同一目标也能滚动 */
  _scrollToContent() {
    this.setData({ scrollToId: '' }, () => {
      this.setData({ scrollToId: 'era-content' });
    });
  },

  onToTop() {
    this.setData({ scrollToId: '' }, () => {
      this.setData({ scrollToId: 'era-top' });
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
      title: '历代战役史 — 中国近现代重要战役',
      path: '/topic-pkg/pages/campaign/campaign'
    };
  },

  onShareTimeline() {
    return { title: '历代战役史 — 中国近现代重要战役' };
  }
});
