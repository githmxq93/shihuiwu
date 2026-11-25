const request = require('../../../utils/request');
const API = require('../../../config/api');
const { fmtTime } = require('../../../utils/time-utils');
const { getAdminToken, verifyAdminToken, kickToLogin } = require('../../utils/admin-guard');

/* ============================================================
   后台「用户管理」—— 与 Web 端 src/components/admin/AdminUsers.tsx 对齐
   3 个 Tab：
     基础管理：搜索 / 新增 / 编辑 / 完善资料 / 重置密码 / 永久删除
     状态控制：正常·禁用·拉黑·注销 的筛选与切换
     权限管理：角色分配（下拉即生效）+ 管理员开关
   [注意] 所有接口都挂 requireAdmin，**每个请求都必须带 x-admin-key**，
      否则服务端把失败伪装成 404「接口不存在」。
   [注意] 统一判 `success` 而非只看 HTTP 200（该接口失败时也回 200 + success:false）。
   ============================================================ */

const TABS = [
  { key: 'basic', label: '基础管理' },
  { key: 'status', label: '状态控制' },
  { key: 'permission', label: '权限管理' }
];

// 文案与 Web 端 STATUS_MAP / ROLE_MAP 保持一致
const STATUS_LABELS = { active: '正常', disabled: '禁用', banned: '拉黑', deleted: '注销' };
const ROLE_LABELS = { user: '普通用户', editor: '编辑', admin: '管理员', superadmin: '超级管理员' };

const STATUS_FILTERS = [
  { key: '', label: '全部' },
  { key: 'active', label: '正常' },
  { key: 'disabled', label: '禁用' },
  { key: 'banned', label: '拉黑' },
  { key: 'deleted', label: '注销' }
];

const ROLE_OPTIONS = [
  { value: 'user', label: '普通用户' },
  { value: 'editor', label: '编辑' },
  { value: 'admin', label: '管理员' },
  { value: 'superadmin', label: '超级管理员' }
];

// 与 Web 端每页 35 条一致
const PAGE_SIZE = 35;

/** 角色值 → 下拉下标（权限管理 Tab 的角色 picker 要用） */
function roleIndexOf(role) {
  for (var i = 0; i < ROLE_OPTIONS.length; i++) if (ROLE_OPTIONS[i].value === role) return i;
  return 0;
}

Page({
  data: {
    tabs: TABS,
    activeTab: 'basic',
    _adminToken: '',
    // 真实状态栏高度（px），注入导航栏 padding-top（写死 88rpx 会被高状态栏机型压住）
    safeAreaTop: 44,

    // 列表与分页
    users: [],
    loading: false,
    refreshing: false,
    page: 1,
    hasMore: true,
    total: 0,

    // 筛选
    keyword: '',
    statusFilter: '',
    statusFilters: STATUS_FILTERS,
    roleFilterIndex: 0,
    roleFilterLabels: ['全部角色'].concat(ROLE_OPTIONS.map(function (r) { return r.label; })),

    // 表单弹窗（新增 / 编辑 / 完善资料共用一套字段；formMode 决定标题与提交方式）
    showForm: false,
    formMode: 'create',   // create | edit | profile
    formTitle: '',
    form: { id: '', nickName: '', displayName: '', phone: '', email: '', password: '', role: 'user', qlId: '', remark: '' },
    roleLabels: ROLE_OPTIONS.map(function (r) { return r.label; }),
    roleIndex: 0,
    saving: false,

    // 重置密码弹窗
    showPwdForm: false,
    pwdForm: { id: '', name: '', newPassword: '' },
    resetting: false
  },

  checkAuth() {
    var token = getAdminToken();
    if (!token) {
      kickToLogin();
      return false;
    }
    this.data._adminToken = token;
    // 服务端复核（异步，权威判定）：本地令牌"格式合法"≠"有效"
    verifyAdminToken(token).catch(function () {});
    return true;
  },

  onLoad() {
    if (!this.checkAuth()) return;
    this._isPageActive = true;
    var sys = wx.getWindowInfo();
    this.setData({ safeAreaTop: sys.statusBarHeight || 44 });
    this.loadUsers(true);
  },

  onUnload() {
    this._isPageActive = false;
    // 搜索防抖：卸载后仍触发会白发一次请求
    if (this._searchTimer) clearTimeout(this._searchTimer);
    this._searchTimer = null;
  },

  onBack() {
    wx.navigateBack();
  },

  // 弹层内容区用 catchtap 阻止冒泡（否则点输入框会把弹窗关掉）
  noop() {},

  /**
   * 统一请求封装：自动带后台令牌、按 success 判定成败、页面销毁后 resolve(null)。
   */
  _req(opts) {
    var that = this;
    return new Promise(function (resolve, reject) {
      request({
        handle401: false,
        url: opts.url,
        method: opts.method || 'GET',
        data: opts.data || {},
        timeout: 15000,
        header: { 'x-admin-key': that.data._adminToken || '' },
        success: function (res) {
          if (!that._isPageActive) return resolve(null);
          var body = res.data || {};
          if (res.statusCode === 200 && body.success !== false) return resolve(body);
          reject(new Error(body.message || ('请求失败（' + res.statusCode + '）')));
        },
        fail: function (err) {
          if (!that._isPageActive) return resolve(null);
          reject(new Error((err && err.errMsg) || '网络请求失败'));
        }
      });
    });
  },

  _toastErr(err) {
    wx.showToast({ title: (err && err.message) || '操作失败', icon: 'none' });
  },

  // ==================== Tab / 分页 ====================

  onSwitchTab(e) {
    var key = e.currentTarget.dataset.key;
    if (key === this.data.activeTab) return;
    this.setData({ activeTab: key });
    this.loadUsers(true);
  },

  /**
   * 拉取用户列表（服务端分页 + 服务端筛选）。
   * [注意] 筛选必须交给服务端：前端过滤只能过滤"已加载的那几页"，翻页后会串。
   */
  loadUsers(reset) {
    var that = this;
    if (!reset && (this.data.loading || !this.data.hasMore)) return;

    var reqId = (this._reqId || 0) + 1;
    this._reqId = reqId;
    var page = reset ? 1 : this.data.page + 1;

    var query = { page: page, pageSize: PAGE_SIZE };
    if (this.data.keyword) query.search = this.data.keyword;
    // 状态筛选只在「状态控制」Tab 生效（与 Web 端一致）
    if (this.data.activeTab === 'status' && this.data.statusFilter) query.status = this.data.statusFilter;
    // 角色筛选只在「权限管理」Tab 生效
    if (this.data.activeTab === 'permission' && this.data.roleFilterIndex > 0) {
      query.role = ROLE_OPTIONS[this.data.roleFilterIndex - 1].value;
    }

    this.setData({ loading: true });

    this._req({ url: API.USERS.LIST, data: query })
      .then(function (body) {
        if (!body || reqId !== that._reqId) return;
        var pd = body.data || {};
        var list = Array.isArray(pd.list) ? pd.list : [];
        list = list.map(function (u) {
          return Object.assign({}, u, {
            _time: fmtTime(u.createdAt),
            _roleLabel: ROLE_LABELS[u.role] || '普通用户',
            _roleIndex: roleIndexOf(u.role),
            _statusLabel: STATUS_LABELS[u.status] || '正常',
            _admin: !!(u.isAdmin === 1 || u.isAdmin === true),
            _openidShort: u.openid ? u.openid.slice(0, 8) + '…' : ''
          });
        });
        var merged = page === 1 ? list : that.data.users.concat(list);
        var totalPages = pd.totalPages || 1;
        that.setData({
          users: merged,
          page: page,
          total: pd.total || merged.length,
          hasMore: page < totalPages
        });
      })
      .catch(function (err) {
        that._toastErr(err);
      })
      .then(function () {
        if (that._isPageActive && reqId === that._reqId) that.setData({ loading: false, refreshing: false });
      });
  },

  onLoadMore() {
    this.loadUsers(false);
  },

  onRefresh() {
    this.setData({ refreshing: true });
    this.loadUsers(true);
  },

  // ==================== 筛选 ====================

  onKeywordInput(e) {
    var that = this;
    this.setData({ keyword: e.detail.value });
    if (this._searchTimer) clearTimeout(this._searchTimer);
    this._searchTimer = setTimeout(function () { that.loadUsers(true); }, 400);
  },

  onClearKeyword() {
    this.setData({ keyword: '' });
    this.loadUsers(true);
  },

  onStatusFilterChange(e) {
    var key = e.currentTarget.dataset.key;
    if (key === this.data.statusFilter) return;
    this.setData({ statusFilter: key });
    this.loadUsers(true);
  },

  onRoleFilterChange(e) {
    this.setData({ roleFilterIndex: Number(e.detail.value) });
    this.loadUsers(true);
  },

  // ==================== 表单弹窗（新增 / 编辑 / 完善资料） ====================

  _roleIndexOf(role) {
    for (var i = 0; i < ROLE_OPTIONS.length; i++) if (ROLE_OPTIONS[i].value === role) return i;
    return 0;
  },

  onCreateOpen() {
    this.setData({
      showForm: true,
      formMode: 'create',
      formTitle: '新增用户',
      form: { id: '', nickName: '', displayName: '', phone: '', email: '', password: '', role: 'user', qlId: '', remark: '' },
      roleIndex: 0
    });
  },

  onEditOpen(e) {
    var u = this.data.users[Number(e.currentTarget.dataset.index)];
    if (!u) return;
    this.setData({
      showForm: true,
      formMode: 'edit',
      formTitle: '编辑用户',
      form: {
        id: u.id, nickName: u.nickName || '', displayName: u.displayName || '',
        phone: u.phone || '', email: u.email || '', password: '', role: u.role || 'user',
        qlId: u.qlId || '', remark: u.remark || ''
      },
      roleIndex: this._roleIndexOf(u.role)
    });
  },

  onProfileOpen(e) {
    var u = this.data.users[Number(e.currentTarget.dataset.index)];
    if (!u) return;
    this.setData({
      showForm: true,
      formMode: 'profile',
      formTitle: '完善用户资料',
      form: {
        id: u.id, nickName: u.nickName || '', displayName: u.displayName || '',
        phone: u.phone || '', email: u.email || '', password: '', role: u.role || 'user',
        qlId: u.qlId || '', remark: u.remark || ''
      },
      roleIndex: this._roleIndexOf(u.role)
    });
  },

  onCloseForm() {
    this.setData({ showForm: false });
  },

  onFormInput(e) {
    var field = e.currentTarget.dataset.field;
    var form = this.data.form;
    form[field] = e.detail.value;
    this.setData({ form: form });
  },

  onFormRoleChange(e) {
    var idx = Number(e.detail.value);
    var form = this.data.form;
    form.role = ROLE_OPTIONS[idx].value;
    this.setData({ form: form, roleIndex: idx });
  },

  onSubmitForm() {
    var that = this;
    var fd = this.data.form;
    if (this.data.saving) return;

    if (this.data.formMode === 'create') {
      if (!fd.nickName && !fd.displayName) return wx.showToast({ title: '昵称或显示名至少填一个', icon: 'none' });
      if (fd.phone && !/^1\d{10}$/.test(fd.phone)) return wx.showToast({ title: '手机号格式不正确', icon: 'none' });
      if (fd.password && fd.password.length < 6) return wx.showToast({ title: '密码至少 6 位', icon: 'none' });
      this.setData({ saving: true });
      this._req({
        url: API.USERS.LIST,   // POST /api/users
        method: 'POST',
        data: {
          nickName: fd.nickName, displayName: fd.displayName, phone: fd.phone,
          email: fd.email, password: fd.password, role: fd.role
        }
      }).then(function (body) {
        if (!body) return;
        wx.showToast({ title: body.message || '创建成功', icon: 'success' });
        that.setData({ showForm: false });
        that.loadUsers(true);
      }).catch(function (err) {
        that._toastErr(err);
      }).then(function () {
        if (that._isPageActive) that.setData({ saving: false });
      });
      return;
    }

    // 编辑 / 完善资料：只提交**允许修改**的字段（服务端有白名单，多余字段会被忽略）
    var payload = {};
    if (this.data.formMode === 'profile') {
      payload = { nickName: fd.nickName, displayName: fd.displayName, phone: fd.phone, email: fd.email, qlId: fd.qlId, remark: fd.remark };
    } else {
      payload = { nickName: fd.nickName, displayName: fd.displayName, phone: fd.phone, email: fd.email };
    }

    this.setData({ saving: true });
    this._req({ url: API.USERS.UPDATE(fd.id), method: 'PUT', data: payload })
      .then(function (body) {
        if (!body) return;
        wx.showToast({ title: body.message || '更新成功', icon: 'success' });
        that.setData({ showForm: false });
        that.loadUsers(true);
      })
      .catch(function (err) {
        that._toastErr(err);
      })
      .then(function () {
        if (that._isPageActive) that.setData({ saving: false });
      });
  },

  // ==================== 重置密码弹窗 ====================

  onPwdOpen(e) {
    var u = this.data.users[Number(e.currentTarget.dataset.index)];
    if (!u) return;
    this.setData({
      showPwdForm: true,
      pwdForm: { id: u.id, name: u.nickName || u.displayName || ('ID ' + u.id), newPassword: '' }
    });
  },

  onClosePwdForm() {
    this.setData({ showPwdForm: false });
  },

  onPwdInput(e) {
    var f = this.data.pwdForm;
    f.newPassword = e.detail.value;
    this.setData({ pwdForm: f });
  },

  onSubmitResetPwd() {
    var that = this;
    var f = this.data.pwdForm;
    if (!f.newPassword || f.newPassword.length < 6) return wx.showToast({ title: '密码至少 6 位', icon: 'none' });
    if (this.data.resetting) return;
    this.setData({ resetting: true });

    this._req({
      url: API.USERS.RESET_PASSWORD(f.id),
      method: 'POST',
      data: { newPassword: f.newPassword }
    }).then(function (body) {
      if (!body) return;
      wx.showToast({ title: body.message || '密码重置成功', icon: 'success' });
      that.setData({ showPwdForm: false });
    }).catch(function (err) {
      that._toastErr(err);
    }).then(function () {
      if (that._isPageActive) that.setData({ resetting: false });
    });
  },

  // ==================== 状态 / 权限 操作 ====================

  /** 改状态（禁用/拉黑/启用/解封/注销）—— data-status 传目标状态 */
  onSetStatus(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    var label = STATUS_LABELS[status] || status;
    var tips = {
      disabled: '禁用后该用户将无法正常使用账号。',
      banned: '拉黑后该用户将无法登录。',
      active: '将恢复该用户的正常状态。',
      deleted: '注销后账号进入回收站，此操作不可逆。'
    };

    wx.showModal({
      title: '确认' + label,
      content: tips[status] || ('确认将状态改为「' + label + '」？'),
      success: function (res) {
        if (!res.confirm) return;
        // [注意] 只传 status：服务端 PUT 的字段白名单里**没有 deletedAt**，
        //    Web 端额外传的 deletedAt 会被直接忽略（详见手册问题 67 的说明）
        that._req({ url: API.USERS.UPDATE(id), method: 'PUT', data: { status: status } })
          .then(function (body) {
            if (!body) return;
            wx.showToast({ title: body.message || '操作成功', icon: 'success' });
            that.loadUsers(true);
          })
          .catch(function (err) { that._toastErr(err); });
      }
    });
  },

  /** 设为 / 取消管理员（isAdmin 与 role 是两个独立字段，与 Web 端一致） */
  onToggleAdmin(e) {
    var that = this;
    var idx = Number(e.currentTarget.dataset.index);
    var u = this.data.users[idx];
    if (!u) return;
    var next = !u._admin;
    wx.showModal({
      title: next ? '设为管理员' : '取消管理员',
      content: next ? '确定将该用户设为管理员？' : '确定取消该用户的管理员权限？',
      success: function (res) {
        if (!res.confirm) return;
        that._req({ url: API.USERS.UPDATE(u.id), method: 'PUT', data: { isAdmin: next ? 1 : 0 } })
          .then(function (body) {
            if (!body) return;
            wx.showToast({ title: body.message || '操作成功', icon: 'success' });
            that.loadUsers(true);
          })
          .catch(function (err) { that._toastErr(err); });
      }
    });
  },

  /** 权限管理 Tab：切换角色（选中即提交，与 Web 端"分配角色下拉"一致） */
  onRolePick(e) {
    var that = this;
    var idx = Number(e.currentTarget.dataset.index);
    var roleIdx = Number(e.detail.value);
    var u = this.data.users[idx];
    if (!u) return;
    var nextRole = ROLE_OPTIONS[roleIdx].value;
    if (nextRole === u.role) return;

    wx.showModal({
      title: '变更角色',
      content: '将「' + (u.nickName || u.displayName || u.id) + '」的角色改为「' + ROLE_OPTIONS[roleIdx].label + '」？',
      success: function (res) {
        if (!res.confirm) return that.loadUsers(true);   // 取消 → 刷新回原选中态
        that._req({ url: API.USERS.UPDATE(u.id), method: 'PUT', data: { role: nextRole } })
          .then(function (body) {
            if (!body) return;
            wx.showToast({ title: body.message || '角色已更新', icon: 'success' });
            that.loadUsers(true);
          })
          .catch(function (err) {
            that._toastErr(err);
            that.loadUsers(true);   // 失败也要把下拉复位到真实值
          });
      }
    });
  },

  /** 永久删除（仅「已注销」账号可执行，与 Web 端一致） */
  onPermanentDelete(e) {
    var that = this;
    var idx = Number(e.currentTarget.dataset.index);
    var u = this.data.users[idx];
    if (!u) return;
    wx.showModal({
      title: '永久删除',
      content: '确认永久删除「' + (u.nickName || u.displayName || u.id) + '」？\n此操作不可逆，所有关联数据将被一并删除。',
      confirmText: '永久删除',
      confirmColor: '#a63b2a',
      success: function (res) {
        if (!res.confirm) return;
        that._req({ url: API.USERS.DELETE(u.id), method: 'DELETE' })
          .then(function (body) {
            if (!body) return;
            wx.showToast({ title: body.message || '已永久删除', icon: 'success' });
            that.loadUsers(true);
          })
          .catch(function (err) { that._toastErr(err); });
      }
    });
  }
});
