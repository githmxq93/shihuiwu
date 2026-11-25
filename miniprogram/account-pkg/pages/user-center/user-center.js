const API = require('../../../config/api');
const { navTo } = require('../../../utils/nav');
const { fmtTime } = require('../../../utils/time-utils');
const authStore = require('../../../utils/auth-store');
const request = require('../../../utils/request');
const { recordHistory } = require('../../../utils/user-utils');

const TAB_LIST = [
  { key: 'messages', label: '消息' },
  { key: 'collections', label: '收藏' },
  { key: 'history', label: '历史' },
  { key: 'devices', label: '设备' }
];

function authHeader() {
  // P1-4：读改走 auth-store（内存缓存），减少同步 IO。
  return { 'Authorization': 'Bearer ' + (authStore.get('userToken') || '') };
}

Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 96,
    tabList: TAB_LIST,
    activeTab: 'messages',
    loading: false,
    loadFailed: false,
    profile: {},
    profileFailed: false,
    messages: [],
    unreadCount: 0,
    collections: [],
    history: [],
    devices: [],
    // 就地浮起的文章浮层（与专题页/首页同一个组件）；null = 关闭
    currentArticle: null
  },

  onLoad(options) {
    const sysInfo = wx.getWindowInfo();
    const safeAreaTop = sysInfo.statusBarHeight || 44;
    this.setData({ safeAreaTop: safeAreaTop, navBarHeight: safeAreaTop + 44 });
    const tab = options && options.tab;
    if (tab && ['messages', 'collections', 'history', 'devices'].indexOf(tab) !== -1) {
      this.setData({ activeTab: tab });
    }
    this._loadProfile();
    this._loadTab(this.data.activeTab);
  },

  onShow() {
    // 从其他页返回时刷新当前 tab（例如在详情页取消收藏后）
    if (this._loadedOnce) this._loadTab(this.data.activeTab);
    this._loadedOnce = true;
  },

  onPullDownRefresh() {
    this._loadTab(this.data.activeTab, () => wx.stopPullDownRefresh());
  },

  _requireLogin() {
    const token = authStore.get('userToken') || '';
    if (!token) {
      wx.showModal({
        title: '需要登录',
        content: '请先在「我的」页登录后再查看个人中心',
        showCancel: false,
        success: () => wx.navigateBack()
      });
      return false;
    }
    return true;
  },

  _loadProfile() {
    if (!this._requireLogin()) return;
    const self = this;
    request({
      url: API.USER.PROFILE,
      method: 'GET',
      header: authHeader(),
      timeout: 8000,
      success: (res) => {
        const d = res.data || {};
        if (d.success && d.data) {
          const u = d.data;
          self.setData({
            profileFailed: false,
            profile: {
              nickName: u.nickName || u.displayName || '世慧屋用户',
              qlId: u.qlId || '',
              phone: u.phone || '',
              initial: (u.nickName || u.displayName || '世').charAt(0)
            }
          });
        } else {
          // 后端明确失败（如令牌失效）：不能静默，否则头部永远显示默认名且用户无从知晓
          self.setData({ profileFailed: true });
        }
      },
      // 网络层失败（超时/断网）：同样要给头部一个可重试的失败态
      fail: () => {
        self.setData({ profileFailed: true });
      }
    });
  },

  // 头部失败态的重试入口（_loadProfile 成功/失败都会刷新 profileFailed）
  onRetryProfile() {
    this._loadProfile();
  },

  onTapTab(e) {
    const key = e.currentTarget.dataset.key;
    if (!key || key === this.data.activeTab) return;
    this.setData({ activeTab: key });
    this._loadTab(key);
  },

  _loadTab(tab, done) {
    if (!this._requireLogin()) { if (done) done(); return; }
    this.setData({ loading: true, loadFailed: false });
    const finish = (ok) => {
      this.setData({ loading: false, loadFailed: !ok });
      if (done) done();
    };
    const self = this;

    if (tab === 'messages') {
      request({
        url: API.USER.MESSAGES + '?page=1&pageSize=50',
        method: 'GET',
        header: authHeader(),
        timeout: 8000,
        success: (res) => {
          const d = res.data || {};
          const list = Array.isArray(d.data) ? d.data : (d.data && d.data.list) || [];
          self.setData({
            messages: list.map((m) => ({
              id: m.id,
              title: m.title || '通知',
              content: m.content || '',
              typeLabel: m.type === 'system' ? '系统' : (m.type === 'reply' ? '回复' : '通知'),
              fromName: m.fromName || '',
              time: fmtTime(m.createdAt),
              isRead: !!m.isRead
            }))
          });
          self._loadUnread();
          finish(true);
        },
        fail: () => finish(false)
      });
      return;
    }

    if (tab === 'collections') {
      request({
        url: API.USER.COLLECTIONS,
        method: 'GET',
        header: authHeader(),
        timeout: 8000,
        success: (res) => {
          const d = res.data || {};
          const list = Array.isArray(d.data) ? d.data : [];
          self.setData({
            collections: list.map((c) => ({
              id: c.id,
              name: c.name || '默认收藏夹',
              items: (c.items || []).map((it) => ({
                id: it.id,
                refId: it.refId,
                type: it.type || 'figure',
                typeLabel: it.type === 'article' ? '文章' : (it.type === 'topic' ? '专题' : '人物'),
                title: it.title || '（无标题）',
                summary: it.summary || '',
                time: fmtTime(it.createdAt)
              }))
            })).filter((c) => c.items.length > 0)
          });
          finish(true);
        },
        fail: () => finish(false)
      });
      return;
    }

    if (tab === 'history') {
      request({
        url: API.USER.HISTORY + '?page=1&pageSize=50',
        method: 'GET',
        header: authHeader(),
        timeout: 8000,
        success: (res) => {
          const d = res.data || {};
          const list = (d.data && d.data.list) || [];
          self.setData({
            history: list.map((h) => ({
              id: h.id,
              refId: h.refId,
              type: h.type || 'figure',
              typeLabel: h.type === 'article' ? '文章' : (h.type === 'topic' ? '专题' : '人物'),
              title: h.title || '（无标题）',
              time: fmtTime(h.createdAt)
            }))
          });
          finish(true);
        },
        fail: () => finish(false)
      });
      return;
    }

    // devices
    request({
      url: API.USER.DEVICES,
      method: 'GET',
      header: authHeader(),
      timeout: 8000,
      success: (res) => {
        const d = res.data || {};
        const list = Array.isArray(d.data) ? d.data : [];
        self.setData({
          devices: list.map((v) => ({
            id: v.id,
            userAgent: v.userAgent || '未知设备',
            shortAgent: self._shortAgent(v.userAgent || ''),
            time: fmtTime(v.lastUsed)
          }))
        });
        finish(true);
      },
      fail: () => finish(false)
    });
  },

  // 登录设备里的 UA 很长，截成人能看的样子
  _shortAgent(ua) {
    const s = String(ua);
    let os = '';
    if (/iPhone|iPad|iOS/i.test(s)) os = 'iOS';
    else if (/Android/i.test(s)) os = 'Android';
    else if (/Windows/i.test(s)) os = 'Windows';
    else if (/Mac OS X|Macintosh/i.test(s)) os = 'macOS';
    else if (/Linux/i.test(s)) os = 'Linux';
    let app = '';
    if (/MicroMessenger/i.test(s)) app = '微信';
    else if (/Edg\//i.test(s)) app = 'Edge';
    else if (/Chrome\//i.test(s)) app = 'Chrome';
    else if (/Safari\//i.test(s)) app = 'Safari';
    else if (/Firefox\//i.test(s)) app = 'Firefox';
    const parts = [os, app].filter(Boolean);
    return parts.length ? parts.join(' · ') : s.slice(0, 24);
  },

  _loadUnread() {
    const self = this;
    request({
      url: API.USER.MESSAGES_UNREAD,
      method: 'GET',
      header: authHeader(),
      timeout: 8000,
      success: (res) => {
        const d = res.data || {};
        if (d.success && d.data) self.setData({ unreadCount: d.data.count || 0 });
      }
    });
  },

  onMarkAllRead() {
    const self = this;
    request({
      url: API.USER.MESSAGES_READ_ALL,
      method: 'PUT',
      header: authHeader(),
      timeout: 8000,
      success: (res) => {
        const d = res.data || {};
        if (d.success) {
          self.setData({
            messages: self.data.messages.map((m) => Object.assign({}, m, { isRead: true })),
            unreadCount: 0
          });
          wx.showToast({ title: '已全部标记为已读', icon: 'none' });
        } else {
          wx.showToast({ title: (d && d.message) || '操作失败', icon: 'none' });
        }
      },
      fail: () => wx.showToast({ title: '网络错误，请重试', icon: 'none' })
    });
  },

  onTapMessage(e) {
    const idx = Number(e.currentTarget.dataset.index);
    const msg = this.data.messages[idx];
    if (!msg || msg.isRead) return;
    const self = this;
    request({
      url: API.USER.MESSAGE_READ(msg.id),
      method: 'PUT',
      header: authHeader(),
      timeout: 8000,
      success: (res) => {
        const d = res.data || {};
        if (d.success) {
          const patch = {};
          patch['messages[' + idx + '].isRead'] = true;
          patch.unreadCount = Math.max(0, self.data.unreadCount - 1);
          self.setData(patch);
        }
      }
    });
  },

  // 收藏 / 历史 里的一条 → 打开对应内容
  onTapItem(e) {
    const ds = e.currentTarget.dataset;
    const type = ds.type;
    const refId = ds.refid;
    if (!refId) return;
    if (type === 'article') {
      // 文章就地浮起（与首页/专题页同一套浮层），列表里已有标题，正文后补
      this._openArticle(ds);
    } else if (type === 'topic') {
      navTo('/topic-pkg/pages/topic/topic?topic=' + refId);
    } else {
      navTo('/detail-pkg/pages/detail/detail?id=' + refId);
    }
  },

  _openArticle(ds) {
    const id = ds.refid;
    if (!id) return;
    const seq = (this._artSeq = (this._artSeq || 0) + 1);
    // 与首页一致：浮层就地打开时补记浏览历史（仅登录态，服务端去重）
    recordHistory('article', id, ds.title || '', '/pages/article/article?id=' + id);
    this.setData({
      currentArticle: {
        id: id,
        title: ds.title || '',
        summary: ds.summary || '',
        // 收藏/历史不是专题篇目，没有本专题上下文：翻篇按钮保持关闭态
        hasPrev: false,
        hasNext: false
      }
    });

    const self = this;
    request({
      url: API.ARTICLES.GET(id),
      method: 'GET',
      timeout: 12000,
      success: (res) => {
        if (seq !== self._artSeq) return;
        const cur = self.data.currentArticle;
        if (!cur || String(cur.id) !== String(id)) return;
        const d = (res && res.data) || {};
        if (!d.success || !d.data) return;
        const full = d.data;
        self.setData({
          currentArticle: Object.assign({}, cur, {
            title: full.title || cur.title,
            content: full.content || '',
            summary: full.summary || cur.summary || '',
            era: full.era || '',
            createdAt: full.createdAt || '',
            relatedFigures: full.relatedFigures || [],
            citations: full.citations || [],
            keywords: full.keywords || ''
          })
        });
      },
      fail: () => { /* 保留标题/摘要态，不弹窗打断 */ }
    });
  },

  onCloseArticle() {
    // 作废在途请求，避免结果回来又把浮层顶开
    this._artSeq = (this._artSeq || 0) + 1;
    this.setData({ currentArticle: null });
  },

  onRemoveCollection(e) {
    const refId = e.currentTarget.dataset.refid;
    if (!refId) return;
    const self = this;
    wx.showModal({
      title: '取消收藏',
      content: '确定从收藏中移除这一条吗？',
      success: (r) => {
        if (!r.confirm) return;
        request({
          url: API.USER.COLLECTION_DELETE(refId),
          method: 'DELETE',
          header: authHeader(),
          timeout: 8000,
          success: (res) => {
            const d = res.data || {};
            if (d.success) {
              wx.showToast({ title: '已取消收藏', icon: 'none' });
              self._loadTab('collections');
            } else {
              wx.showToast({ title: (d && d.message) || '操作失败', icon: 'none' });
            }
          },
          fail: () => wx.showToast({ title: '网络错误，请重试', icon: 'none' })
        });
      }
    });
  },

  onClearHistory() {
    const self = this;
    wx.showModal({
      title: '清空浏览历史',
      content: '清空后无法恢复，确定继续吗？',
      success: (r) => {
        if (!r.confirm) return;
        request({
          url: API.USER.HISTORY,
          method: 'DELETE',
          header: authHeader(),
          timeout: 8000,
          success: (res) => {
            const d = res.data || {};
            if (d.success) {
              self.setData({ history: [] });
              wx.showToast({ title: '已清空', icon: 'none' });
            } else {
              wx.showToast({ title: (d && d.message) || '操作失败', icon: 'none' });
            }
          },
          fail: () => wx.showToast({ title: '网络错误，请重试', icon: 'none' })
        });
      }
    });
  }
});
