const request = require('../../../utils/request');
const API = require('../../../config/api');
const { getAdminToken, verifyAdminToken, kickToLogin } = require('../../utils/admin-guard');
const { once } = require('../../utils/tap-lock');

Page({
  data: {
    topics: [],
    // 真实状态栏高度（px），注入导航栏 padding-top（写死 88rpx 会被高状态栏机型压住）
    safeAreaTop: 44,
    loading: true, loadFailed: false,
    refreshing: false,
    modalVisible: false,
    modalTitle: '',
    modalMode: '', // 'addTopic', 'editTopic', 'addArticle', 'editArticle'
    formFields: [],
    formValues: {},
    formError: '',
    currentTopicKey: '',
    currentArticleId: '',
    _adminToken: ''
  },

  checkAuth() {
    var token = getAdminToken();
    if (!token) {
      kickToLogin();
      return false;
    }
    this.data._adminToken = token;
    // 服务端复核（异步，权威判定）：本地令牌"格式合法"≠"有效"，
    // 被篡改或已过期时这里会把用户踢回登录页，避免"进了后台却全是空列表"的误导。
    verifyAdminToken(token).catch(function () {});
    return true;
  },

  onLoad() {
    if (!this.checkAuth()) return;
    this._isPageActive = true;
    // 真实状态栏高度 → 导航栏 padding-top（写死 88rpx 会被刘海/灵动岛机型压住）
    var sys = wx.getWindowInfo();
    this.setData({ safeAreaTop: sys.statusBarHeight || 44 });
    this.loadTopics();
  },

  onUnload() {
    this._isPageActive = false;
  },

  loadTopics() {
    this.setData({ loading: true, loadFailed: false });
    request({
      handle401: false,
      url: API.TOPICS.LIST,
      method: 'GET',
      timeout: 10000,
      header: { 'x-admin-key': this.data._adminToken || '' },
      success: (res) => {
        if (!this._isPageActive) return;
        let topics = [];
        if (res.data && Array.isArray(res.data)) {
          topics = res.data.map((topic) => {
            return Object.assign({}, topic, { _expanded: false });
          });
        } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
          topics = res.data.data.map((topic) => {
            return Object.assign({}, topic, { _expanded: false });
          });
        }
        this.setData({ topics, loading: false, refreshing: false, loadFailed: false });
      },
      fail: (err) => {
        if (!this._isPageActive) return;
        wx.showToast({ title: '加载失败：' + (err.errMsg || '未知错误'), icon: 'none' });
        this.setData({ loading: false, refreshing: false, loadFailed: true });
      }
    });
  },

  onRefresh() {
    this.setData({ refreshing: true });
    this.loadTopics();
  },

  onBack() {
    wx.navigateBack();
  },

  onLoadMore() {
    // 预留：加载更多
  },

  noop() {},

  // ========== 专题分类展开/折叠 ==========

  onToggleExpand(e) {
    const key = e.currentTarget.dataset.key;
    const topics = this.data.topics.map((topic) => {
      if (topic.key === key) {
        return Object.assign({}, topic, { _expanded: !topic._expanded });
      }
      return topic;
    });
    this.setData({ topics });
  },

  // ========== 专题分类 CRUD ==========

  onAddTopic() {
    const formFields = [
      { name: 'key', label: '专题标识(英文)', type: 'text', placeholder: '如 figures', value: '', required: true },
      { name: 'title', label: '专题标题', type: 'text', placeholder: '如 历史人物', value: '', required: true },
      { name: 'description', label: '专题描述', type: 'text', placeholder: '简要描述专题内容', value: '', required: false },
      { name: 'icon', label: '图标文字', type: 'text', placeholder: '如 卷', value: '', required: false }
    ];
    this.setData({
      modalVisible: true,
      modalTitle: '新增专题分类',
      modalMode: 'addTopic',
      formFields,
      formValues: {},
      formError: '',
      currentTopicKey: '',
      currentArticleId: ''
    });
  },

  onEditTopic(e) {
    const key = e.currentTarget.dataset.key;
    const topic = this.data.topics.find((t) => t.key === key);
    if (!topic) return;

    const formFields = [
      { name: 'key', label: '专题标识(英文)', type: 'text', placeholder: '如 figures', value: topic.key || '', required: true },
      { name: 'title', label: '专题标题', type: 'text', placeholder: '如 历史人物', value: topic.title || '', required: true },
      { name: 'description', label: '专题描述', type: 'text', placeholder: '简要描述专题内容', value: topic.description || '', required: false },
      { name: 'icon', label: '图标文字', type: 'text', placeholder: '如 卷', value: topic.icon || '', required: false }
    ];
    this.setData({
      modalVisible: true,
      modalTitle: '编辑专题分类',
      modalMode: 'editTopic',
      formFields,
      formValues: {},
      formError: '',
      currentTopicKey: key,
      currentArticleId: ''
    });
  },

  onDeleteTopic(e) {
    const key = e.currentTarget.dataset.key;
    const topic = this.data.topics.find((t) => t.key === key);
    wx.showModal({
      title: '确认删除',
      content: `确定要删除专题「${topic ? topic.title : key}」吗？该操作不可恢复。`,
      confirmText: '删除',
      confirmColor: '#c73e4a',
      success: (res) => {
        if (res.confirm) {
          request({
            handle401: false,
            url: API.TOPICS.DELETE(key),
            method: 'DELETE',
            timeout: 10000,
            header: { 'x-admin-key': this.data._adminToken || '' },
            success: (res) => {
              if (!this._isPageActive) return;
              if (res.data && res.data.success) {
                wx.showToast({ title: '删除成功', icon: 'success' });
              } else {
                wx.showToast({ title: (res.data && res.data.message) || '删除失败', icon: 'none' });
              }
              this.loadTopics();
            },
            fail: () => {
              if (!this._isPageActive) return;
              wx.showToast({ title: '删除失败', icon: 'none' });
            }
          });
        }
      }
    });
  },

  // ========== 文章 CRUD ==========

  onAddArticle(e) {
    const key = e.currentTarget.dataset.key;
    const formFields = [
      { name: 'title', label: '文章标题', type: 'text', placeholder: '请输入文章标题', value: '', required: true },
      { name: 'summary', label: '摘要', type: 'textarea', placeholder: '请输入文章摘要', value: '', required: false },
      { name: 'content', label: '正文内容', type: 'textarea', placeholder: '请输入文章正文', value: '', required: false },
      { name: 'author', label: '作者', type: 'text', placeholder: '如 李白', value: '', required: false },
      { name: 'era', label: '朝代', type: 'text', placeholder: '如 唐', value: '', required: false },
      { name: 'relatedFigures', label: '关联人物(逗号分隔)', type: 'text', placeholder: '如 李白,杜甫', value: '', required: false }
    ];
    this.setData({
      modalVisible: true,
      modalTitle: '新增文章',
      modalMode: 'addArticle',
      formFields,
      formValues: {},
      formError: '',
      currentTopicKey: key,
      currentArticleId: ''
    });
  },

  onEditArticle(e) {
    const key = e.currentTarget.dataset.key;
    const articleId = e.currentTarget.dataset.articleId;
    const topic = this.data.topics.find((t) => t.key === key);
    const article = topic ? topic.articles.find((a) => a.id === articleId) : null;
    if (!article) return;

    let relatedFiguresStr = '';
    if (article.relatedFigures && Array.isArray(article.relatedFigures)) {
      relatedFiguresStr = article.relatedFigures.map((f) => {
        if (typeof f === 'object' && f !== null) return f.name || '';
        return String(f);
      }).filter(Boolean).join(',');
    }

    const formFields = [
      { name: 'title', label: '文章标题', type: 'text', placeholder: '请输入文章标题', value: article.title || '', required: true },
      { name: 'summary', label: '摘要', type: 'textarea', placeholder: '请输入文章摘要', value: article.summary || '', required: false },
      { name: 'content', label: '正文内容', type: 'textarea', placeholder: '请输入文章正文', value: article.content || '', required: false },
      { name: 'author', label: '作者', type: 'text', placeholder: '如 李白', value: article.author || '', required: false },
      { name: 'era', label: '朝代', type: 'text', placeholder: '如 唐', value: article.era || '', required: false },
      { name: 'relatedFigures', label: '关联人物(逗号分隔)', type: 'text', placeholder: '如 李白,杜甫', value: relatedFiguresStr, required: false }
    ];
    this.setData({
      modalVisible: true,
      modalTitle: '编辑文章',
      modalMode: 'editArticle',
      formFields,
      formValues: {},
      formError: '',
      currentTopicKey: key,
      currentArticleId: articleId
    });
  },

  onDeleteArticle(e) {
    const key = e.currentTarget.dataset.key;
    const articleId = e.currentTarget.dataset.articleId;
    const topic = this.data.topics.find((t) => t.key === key);
    const article = topic ? topic.articles.find((a) => a.id === articleId) : null;
    wx.showModal({
      title: '确认删除',
      content: `确定要删除文章「${article ? article.title : articleId}」吗？该操作不可恢复。`,
      confirmText: '删除',
      confirmColor: '#c73e4a',
      success: (res) => {
        if (res.confirm) {
          request({
            handle401: false,
            url: API.TOPICS.DELETE_ARTICLE(key, articleId),
            method: 'DELETE',
            timeout: 10000,
            header: { 'x-admin-key': this.data._adminToken || '' },
            success: (res) => {
              if (!this._isPageActive) return;
              if (res.data && res.data.success) {
                wx.showToast({ title: '删除成功', icon: 'success' });
              } else {
                wx.showToast({ title: (res.data && res.data.message) || '删除失败', icon: 'none' });
              }
              this.loadTopics();
            },
            fail: () => {
              if (!this._isPageActive) return;
              wx.showToast({ title: '删除失败', icon: 'none' });
            }
          });
        }
      }
    });
  },

  onTogglePin(e) {
    const key = e.currentTarget.dataset.key;
    const articleId = e.currentTarget.dataset.articleId;
    const isPinned = e.currentTarget.dataset.pinned === true || e.currentTarget.dataset.pinned === 'true';

    request({
      handle401: false,
      url: API.TOPICS.PIN_ARTICLE(key, articleId),
      method: 'POST',
      timeout: 10000,
      header: { 'x-admin-key': this.data._adminToken || '' },
      data: { isPinned: !isPinned },
      success: () => {
        if (!this._isPageActive) return;
        wx.showToast({ title: isPinned ? '已取消置顶' : '已置顶', icon: 'success' });
        this.loadTopics();
      },
      fail: (err) => {
        if (!this._isPageActive) return;
        wx.showToast({ title: '操作失败：' + (err.errMsg || '未知错误'), icon: 'none' });
      }
    });
  },

  // ========== 弹窗表单 ==========

  onFormInput(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    const key = `formValues.${field}`;
    this.setData({ [key]: value, formError: '' });
  },

  onCloseModal() {
    this.setData({
      modalVisible: false,
      formError: ''
    });
  },

  onConfirmModal: once(function () {
    const { modalMode, formFields, formValues, currentTopicKey, currentArticleId } = this.data;

    // 收集表单数据
    let formData = {};
    for (let field of formFields) {
      formData[field.name] = formValues[field.name] !== undefined ? formValues[field.name] : field.value;
    }

    // 必填校验
    for (let field of formFields) {
      if (field.required && !formData[field.name]) {
        this.setData({ formError: `请填写${field.label}` });
        return;
      }
    }

    // 处理关联人物：逗号分隔转JSON数组
    if (formData.relatedFigures && typeof formData.relatedFigures === 'string') {
      formData.relatedFigures = formData.relatedFigures.split(',').map((s) => s.trim()).filter(Boolean);
    }

    if (modalMode === 'addTopic') {
      return request({
        handle401: false,
        url: API.TOPICS.CREATE,
        method: 'POST',
        timeout: 10000,
        header: { 'x-admin-key': this.data._adminToken || '' },
        data: formData,
        success: () => {
          if (!this._isPageActive) return;
          wx.showToast({ title: '创建成功', icon: 'success' });
          this.setData({ modalVisible: false });
          this.loadTopics();
        },
        fail: (err) => {
          if (!this._isPageActive) return;
          wx.showToast({ title: '创建失败：' + (err.errMsg || '未知错误'), icon: 'none' });
        }
      });
    } else if (modalMode === 'editTopic') {
      return request({
        handle401: false,
        url: API.TOPICS.UPDATE(currentTopicKey),
        method: 'PUT',
        timeout: 10000,
        header: { 'x-admin-key': this.data._adminToken || '' },
        data: formData,
        success: () => {
          if (!this._isPageActive) return;
          wx.showToast({ title: '更新成功', icon: 'success' });
          this.setData({ modalVisible: false });
          this.loadTopics();
        },
        fail: (err) => {
          if (!this._isPageActive) return;
          wx.showToast({ title: '更新失败：' + (err.errMsg || '未知错误'), icon: 'none' });
        }
      });
    } else if (modalMode === 'addArticle') {
      return request({
        handle401: false,
        url: API.TOPICS.ADD_ARTICLE(currentTopicKey),
        method: 'POST',
        timeout: 10000,
        header: { 'x-admin-key': this.data._adminToken || '' },
        data: formData,
        success: () => {
          if (!this._isPageActive) return;
          wx.showToast({ title: '创建成功', icon: 'success' });
          this.setData({ modalVisible: false });
          this.loadTopics();
        },
        fail: (err) => {
          if (!this._isPageActive) return;
          wx.showToast({ title: '创建失败：' + (err.errMsg || '未知错误'), icon: 'none' });
        }
      });
    } else if (modalMode === 'editArticle') {
      return request({
        handle401: false,
        url: API.TOPICS.UPDATE_ARTICLE(currentTopicKey, currentArticleId),
        method: 'PUT',
        timeout: 10000,
        header: { 'x-admin-key': this.data._adminToken || '' },
        data: formData,
        success: () => {
          if (!this._isPageActive) return;
          wx.showToast({ title: '更新成功', icon: 'success' });
          this.setData({ modalVisible: false });
          this.loadTopics();
        },
        fail: (err) => {
          if (!this._isPageActive) return;
          wx.showToast({ title: '更新失败：' + (err.errMsg || '未知错误'), icon: 'none' });
        }
      });
    }
  })
});
