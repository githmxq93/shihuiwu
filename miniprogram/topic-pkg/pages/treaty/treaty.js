// 历代条约 · 新拟态重构（2026-10-17）
// 与 topic-pkg/pages/campaign、liberation 同皮肤、同交互范式：
//   ① 时期导航由「只改高亮」改为「切换内容」——原文 onTapEra 只 setData(activeEra)，
//      而内容区始终 wx:for 全部 10 个时期，点「晚清」界面纹丝不动；
//   ② 导航由流内横向条改为 fixed 吸顶（scroll-view 内 position:sticky 不生效）；
//   ③ 一次只渲染当前时期的条约（最多 23 条），并在时期小结里给出条数与性质分布；
//   ④ 每条条约新增「条约始末」介绍（数据侧 intro 字段，114/114 全覆盖）；
//   ⑤ 回到顶部。
// 性能：setData 只送当前时期视图（view），原始数据留在 _raw，onUnload 释放。
const request = require('../../../utils/request');
const API = require('../../../config/api');

// 回到顶部按钮出现阈值（px）
const TO_TOP_THRESHOLD = 600;
// 滚动节流（ms）
const SCROLL_THROTTLE = 80;

// 计入「平等与多边」的性质
const EQUAL_TYPES = ['平等条约', '双边条约', '多边条约', '国际文件'];

// 性质标签 -> 样式类（模板里不做字符串比较）
function natureClass(nature) {
  if (nature === '不平等条约') return 'unequal';
  if (nature === '和议') return 'peace';
  if (nature === '涉外事件') return 'event';
  return 'equal';
}

Page({
  data: {
    safeAreaTop: 44,
    navH: 88,
    stats: [],
    eraTabs: [],
    activeKey: '',
    view: null,
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
    // P0-1：改走统一请求封装。toast:false —— 本页自带失败态 + 重试按钮；
    // 超时与错误分支行为与原 wx.request 一致（默认 10s、fail → loadFailed）。
    // 接入静态缓存层：Promise 形态与 request.get 一致（then 拿到的仍是响应体 {success,data}）。
    request.getStatic('treaties', { toast: false })
      .then((res) => {
        const d = res || {};
        // [重要] 必须有 else 分支：success:false 时若仍按空数据处理，用户看到的是
        // 「暂无数据」而非「加载失败」，会误判为内容本就没有、放弃重试。
        if (!d.success || !d.data) {
          this.setData({ loading: false, loadFailed: true });
          return;
        }
        const eras = Array.isArray(d.data.treatyEras) ? d.data.treatyEras : [];
        if (!eras.length) {
          this.setData({ loading: false, isEmpty: true });
          return;
        }

        this._raw = eras;

        let total = 0;
        let unequal = 0;
        let equal = 0;
        // 导航只用轻量摘要，避免把条约明细塞进 tab
        const eraTabs = eras.map((era) => {
          const list = era.treaties || [];
          let u = 0;
          list.forEach((t) => {
            if (t.nature === '不平等条约') u++;
            if (EQUAL_TYPES.indexOf(t.nature) >= 0) equal++;
          });
          total += list.length;
          unequal += u;
          return { key: era.key, name: era.name, count: list.length };
        });

        const stats = [
          { value: eras.length, label: '历史时期' },
          { value: total, label: '条约 / 文件' },
          { value: unequal, label: '不平等条约' },
          { value: equal, label: '平等与多边' }
        ];

        const firstKey = eras[0].key;
        this.setData({
          stats: stats,
          eraTabs: eraTabs,
          activeKey: firstKey,
          view: this._buildView(firstKey),
          loading: false,
          isEmpty: false
        });
      })
      .catch(() => this.setData({ loading: false, loadFailed: true }));
  },

  /** 组装某一个时期的条约视图 */
  _buildView(key) {
    const eras = this._raw || [];
    if (!eras.length) return null;
    let idx = 0;
    for (let i = 0; i < eras.length; i++) {
      if (eras[i].key === key) { idx = i; break; }
    }
    const era = eras[idx] || eras[0];
    const list = era.treaties || [];
    let unequal = 0;
    let equal = 0;
    const treaties = list.map((t) => {
      if (t.nature === '不平等条约') unequal++;
      if (EQUAL_TYPES.indexOf(t.nature) >= 0) equal++;
      return {
        name: t.name,
        time: t.time,
        parties: t.parties,
        content: t.content,
        intro: t.intro || '',
        nature: t.nature,
        natureClass: natureClass(t.nature)
      };
    });
    return {
      key: era.key,
      name: era.name,
      years: era.years,
      intro: era.intro || '',
      // 序号在 JS 里拼好，模板不写复杂表达式
      indexText: (idx + 1 < 10 ? '0' : '') + (idx + 1),
      count: treaties.length,
      unequal: unequal,
      equal: equal,
      treaties: treaties,
      isEmpty: treaties.length === 0
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
    this.setData({ activeKey: key, view: this._buildView(key) }, () => this._scrollToContent());
  },

  // ---------- 滚动 ----------

  /** 切时期后把内容顶推到导航下方：先清空再赋值，重复触发同一目标也能滚动 */
  _scrollToContent() {
    this.setData({ scrollToId: '' }, () => {
      this.setData({ scrollToId: 'tt-content' });
    });
  },

  onToTop() {
    this.setData({ scrollToId: '' }, () => {
      this.setData({ scrollToId: 'tt-top' });
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
      title: '历代条约 — 从清水会盟到 RCEP（783—2020）',
      path: '/topic-pkg/pages/treaty/treaty'
    };
  },

  onShareTimeline() {
    return { title: '历代条约 — 从清水会盟到 RCEP（783—2020）' };
  }
});
