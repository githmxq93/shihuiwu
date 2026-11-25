const request = require('../../utils/request');
const API = require('../../config/api');
const { buildReaderModel } = require('../../utils/article-reader');
const { navTo } = require('../../utils/nav');
const { ensurePrivacyAuthorized } = require('../../utils/privacy');

// 人物资料缓存：同一次会话里反复打开同一篇不再重复请求
const FIG_CACHE = {};

// 生卒年展示：公元前是文本（「约公元前551年」），原样拼接，不当数字算
function spanText(f) {
  const b = String((f && f.birthYear) || '').trim();
  const d = String((f && f.deathYear) || '').trim();
  if (!b && !d) return '';
  return (b || '?') + '—' + (d || '?');
}

// 判定一个名字对应哪位人物：精确同名唯一 → 直跳；同名多个 → 让用户选；无 → 未收录
function judgeName(name, arr) {
  const exact = arr.filter((x) => String((x && x.name) || '') === name);
  const pool = exact.length ? exact : arr;
  if (!pool.length) return { missing: true };
  const norm = (x) => ({
    id: x.id,
    name: x.name || name,
    meta: [x.dynasty, x.region, spanText(x)].filter(Boolean).join(' · ')
  });
  if (pool.length === 1) {
    const one = norm(pool[0]);
    return one.id ? { id: one.id, meta: one.meta } : { missing: true };
  }
  return { candidates: pool.slice(0, 6).map(norm) };
}

Component({
  properties: {
    // 底部中间按钮文案：专题页是「回到专题」；首页/个人中心没有专题上下文，传「返回」
    homeText: {
      type: String,
      value: '回到专题'
    },
    currentArticle: {
      type: Object,
      value: null,
      observer: function (art) {
        this._build(art);
      }
    }
  },

  data: {
    expanded: false,      // 86vh（默认）⇄ 96vh（展开）
    scrollPercent: 0,
    scrollTop: 0,
    blocks: [],
    wordCount: '',
    readMin: 0,
    hasBody: false,
    fullText: '',
    isExcerpt: false,
    figures: [],
    citations: [],
    keywords: []
  },

  lifetimes: {
    // 兜底：组件被销毁（关闭浮层 / 页面卸载）时一定把 tabBar 还回去
    detached() {
      this._restoreTabBar();
    }
  },

  methods: {
    /* 自定义 tabBar（app.json tabBar.custom = true）由框架单独渲染一层，
       页面里的 fixed 元素压不过它：浮层高度 86vh 贴着屏幕底边，
       底部条正好落在 tabBar 那 100rpx + 安全区里，被整块盖住。
       只改当前页 tabBar 实例的 hidden（与 guide-layer 同一套做法）：
       自定义模式下调 wx.showTabBar 会把框架原生 tabBar 一起唤出来，
       关掉浮层后底部就叠成两套 tabBar。 */
    _hideTabBar() {
      if (this._tabBar) return;
      try {
        const pages = getCurrentPages();
        const page = pages && pages[pages.length - 1];
        if (page && typeof page.getTabBar === 'function') {
          const bar = page.getTabBar();
          if (bar && typeof bar.setData === 'function') {
            this._tabBar = bar;
            // 记住原来的收起状态：浮层可能本来就开在 tabBar 已隐藏的页面里，
            // 关闭时按原值还原，不能无条件放出。
            this._tabBarPrevHidden = !!(bar.data && bar.data.hidden);
            bar.setData({ hidden: true });
          }
        }
      } catch (e) { /* 非 tab 页没有 getTabBar：本来就没有 tabBar */ }
    },

    _restoreTabBar() {
      const bar = this._tabBar;
      const prevHidden = this._tabBarPrevHidden;
      this._tabBar = null;
      this._tabBarPrevHidden = false;
      if (bar && typeof bar.setData === 'function') {
        try { bar.setData({ hidden: !!prevHidden }); } catch (e) {}
      }
    },

    // 文章切换时重算派生数据：阅读模型与整页 pages/article 共用 utils/article-reader
    _build(art) {
      const seq = (this._seq = (this._seq || 0) + 1);
      if (!art) {
        this._restoreTabBar();
        this._lastId = null;
        this.setData({
          expanded: false, scrollPercent: 0, blocks: [], wordCount: '',
          readMin: 0, hasBody: false, fullText: '', isExcerpt: false,
          figures: [], citations: [], keywords: []
        });
        return;
      }

      // 浮层一出现就收起 tabBar，保证底部翻篇条完整露出（首帧不做动画）
      this._hideTabBar();

      const m = buildReaderModel(art);

      // 同一篇文章的数据回填（lite 标题/摘要 → 全文、翻篇标记）不重置阅读状态：
      // 否则正文到达时会把用户已展开的档位收起、把滚动位置拉回顶部。
      // 只有真的换了文章（id 不同）才收回收起态并归零。
      const same = this._lastId != null && String(this._lastId) === String(art.id);
      this._lastId = art.id;

      const patch = {
        blocks: m.blocks,
        wordCount: m.wordCount,
        readMin: m.readMin,
        hasBody: m.hasBody,
        fullText: m.fullText,
        isExcerpt: m.isExcerpt,
        figures: m.figures,
        citations: m.citations,
        keywords: m.keywords
      };
      if (!same) {
        patch.expanded = false;
        patch.scrollPercent = 0;
        // scroll-view 的 scroll-top 只在值变化时生效：先设一个非 0 值，下一拍再归零
        patch.scrollTop = this.data.scrollTop === 0 ? 1 : 0;
      }
      this.setData(patch);
      if (!same) {
        setTimeout(() => {
          this.setData({ scrollTop: 0 });
        }, 30);
      }

      this._resolveFigures(m.figures, seq);
    },

    // 关联人物只有姓名：按名查一次补「朝代 · 籍贯 · 生卒」，顺带拿 id 供点击跳转
    _resolveFigures(figures, seq) {
      const self = this;
      figures.forEach((f, i) => {
        if (FIG_CACHE[f.name]) {
          self._applyFigure(i, FIG_CACHE[f.name], seq);
          return;
        }
        request({
          url: API.FIGURES.SEARCH + '?search=' + encodeURIComponent(f.name) + '&pageSize=10',
          method: 'GET',
          timeout: 8000,
          // 一名一次；失败就算了（人物信息只是可选增强），重试会把请求放大数倍
          retry: 0,
          success: (res) => {
            const d = (res && res.data) || {};
            const list = (d.data && (d.data.list || d.data)) || [];
            const r = judgeName(f.name, Array.isArray(list) ? list : []);
            FIG_CACHE[f.name] = r;
            self._applyFigure(i, r, seq);
          },
          fail: () => { /* 网络失败：保留姓名，meta 留空 */ }
        });
      });
    },

    _applyFigure(i, r, seq) {
      if (!r || seq !== this._seq) return;
      const patch = {};
      if (r.meta) patch['figures[' + i + '].meta'] = r.meta;
      if (r.id) patch['figures[' + i + '].id'] = r.id;
      if (r.candidates) patch['figures[' + i + '].pick'] = true;
      if (Object.keys(patch).length) this.setData(patch);
    },

    // 抓手整行可点：展开 / 收起两档
    onToggleExpand() {
      this.setData({ expanded: !this.data.expanded });
    },

    onClose() {
      this.triggerEvent('close');
    },

    noop() {},

    // 底部条：上一篇 / 下一篇交给页面切文章（浮层不自己持列表）
    onPrev() {
      const a = this.data.currentArticle || {};
      if (!a.hasPrev) {
        wx.showToast({ title: '已经是第一篇', icon: 'none' });
        return;
      }
      this.triggerEvent('nav', { dir: 'prev' });
    },

    onNext() {
      const a = this.data.currentArticle || {};
      if (!a.hasNext) {
        wx.showToast({ title: '已经是最后一篇', icon: 'none' });
        return;
      }
      this.triggerEvent('nav', { dir: 'next' });
    },

    onHome() {
      this.triggerEvent('close');
    },

    onBodyScroll(e) {
      const s = e.detail || {};
      const p = s.scrollHeight > s.windowHeight
        ? (s.scrollTop / (s.scrollHeight - s.windowHeight)) * 100
        : 100;
      const next = Math.min(100, Math.max(0, Math.round(p)));
      if (next !== this.data.scrollPercent) this.setData({ scrollPercent: next });
    },

    // 有链接的文献：复制到剪贴板（与独立文章页一致，含隐私授权兜底）
    onTapCitation(e) {
      const url = String((e.currentTarget.dataset && e.currentTarget.dataset.url) || '').trim();
      if (!url) return;
      ensurePrivacyAuthorized()
        .then(() => {
          wx.setClipboardData({
            data: url,
            success: () => wx.showToast({ title: '链接已复制', icon: 'none' })
          });
        })
        .catch(() => { /* 用户拒绝授权：静默返回 */ });
    },

    // 文中人物 → 人物详情；同名多人时给选择面板，不替读者猜
    onTapFigure(e) {
      const name = (e.currentTarget.dataset.name || '').trim();
      if (!name) return;
      const r = FIG_CACHE[name];
      if (!r) {
        wx.showToast({ title: '人物资料还在加载', icon: 'none' });
        return;
      }
      if (r.missing) {
        wx.showToast({ title: '世慧屋暂未收录「' + name + '」', icon: 'none' });
        return;
      }
      if (r.id) {
        navTo('/detail-pkg/pages/detail/detail?id=' + r.id);
        return;
      }
      const cands = (r.candidates || []).filter((c) => c && c.id);
      if (!cands.length) {
        wx.showToast({ title: '世慧屋暂未收录「' + name + '」', icon: 'none' });
        return;
      }
      if (cands.length === 1) {
        navTo('/detail-pkg/pages/detail/detail?id=' + cands[0].id);
        return;
      }
      wx.showActionSheet({
        itemList: cands.map((c) => c.name + (c.meta ? ' · ' + c.meta : '')),
        success: (res) => {
          const one = cands[res.tapIndex];
          if (one) navTo('/detail-pkg/pages/detail/detail?id=' + one.id);
        }
      });
    }
  }
});
