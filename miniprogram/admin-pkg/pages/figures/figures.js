const request = require('../../../utils/request');
const API = require('../../../config/api');
const { getAdminToken, verifyAdminToken, kickToLogin } = require('../../utils/admin-guard');

/* ============================================================
   后台「人物管理」—— 编辑表单与 Web 端 src/components/admin/AdminFigures.tsx 对齐
   字段全集 = 服务端 ALLOWED_FIELDS（31 个）+ aliases（落 figure_alias 表）
            + 6 类条目面板（events/works/organizations/achievements/legacy/eraContext）
            + relations（落 figure_relations 表，需 relationsChanged 开关）

   移动端设计取舍（更利于手指操作）：
     - 长表单按「基本档案 / 生卒地点 / 身份 / 展示」分区，逐屏填写；
     - 6 个条目面板**折叠 + 按需展开**，每条只显示主字段，「补充字段」再折叠一层；
     - 枚举型字段（类型/分类等）用**输入框 + 可点选 chips**，避免小程序 picker 的
       value 需要 index 映射（WXML 里拼不出动态下标的键名）。
   ============================================================ */

const PAGE_SIZE = 20;

// 列表筛选用的朝代（含"全部"）
const DYNASTY_LIST = [
  '全部', '商', '周', '春秋', '战国', '秦', '汉', '三国', '晋',
  '南北朝', '隋', '唐', '五代十国', '宋', '辽', '金', '元', '明', '清',
  '近代', '民国', '当代'
];

// 表单选项（与 Web 端 AdminFigures 常量一致）
const DYNASTY_OPTIONS = ['夏', '商', '周', '春秋', '战国', '秦', '汉', '西汉', '东汉', '三国', '晋', '西晋', '东晋', '南北朝', '隋', '唐', '五代十国', '宋', '北宋', '南宋', '辽', '西夏', '金', '元', '明', '清', '民国', '中华人民共和国'];
const GENDER_OPTIONS = ['男', '女', '未知'];
const ZODIAC_OPTIONS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const LIFE_STATUS_OPTIONS = ['在世', '已故', '不详'];

// 标准关系词（与人物详情页「家庭」行、关系图谱识别口径一致）
const RELATION_TYPES = [
  '父亲', '母亲', '丈夫', '妻子', '配偶', '儿子', '女儿',
  '兄弟', '姐妹', '儿媳', '女婿', '公公', '婆婆',
  '上级', '下级', '同僚', '拜把兄弟', '属下', '幕僚',
  '老师', '学生', '联合', '敌对', '亦敌亦友'
];

// 条目面板里各分类的可选值
const WORK_CATEGORIES = ['代表作', '诗', '词', '文', '专著', '书画', '奏议', '手稿', '版本', '项目', '专利', '展览', '演出', '课程', '翻译', '研究'];
const ACHIEVEMENT_CATEGORIES = ['最高成就', '奖项', '头衔', '纪录', '社会职务', '影响力评价', '荣誉时间线', '被引用次数', '命名物'];
const ORG_ROLES = ['任职', '创办', '所属', '合作机构', '社会团体'];
const LEGACY_CATEGORIES = ['故居', '纪念馆', '墓地', '祠堂', '命名物', '纪念活动', '纪念日', '后世影响', '文化符号', '数字化'];
const ERA_CATEGORIES = ['时期', '政治大事', '经济状况', '文化事件', '科技进展', '对外关系', '同代人物', '前后对比', '社会风气', '对人物的影响'];
const AUTHENTICITY_OPTIONS = ['确证', '存疑', '伪作'];
const LEVEL_OPTIONS = ['国保', '省保', '市保'];

// 6 个条目面板（sec:true 的字段收进「补充字段」折叠区，不占首屏）
const ITEM_PANELS = [
  {
    key: 'events', label: '时间线', itemName: '事件',
    fields: [
      { key: 'year', label: '年份', ph: '如 1911 或 公元前202' },
      { key: 'title', label: '事件标题', ph: '如：武昌起义' },
      { key: 'description', label: '描述', type: 'textarea' }
    ]
  },
  {
    key: 'works', label: '作品与成果', itemName: '作品',
    fields: [
      { key: 'title', label: '名称', ph: '如：《沁园春·雪》' },
      { key: 'category', label: '类型', chips: WORK_CATEGORIES },
      { key: 'year', label: '年份', ph: '如 1936' },
      { key: 'description', label: '描述', type: 'textarea' },
      { key: 'alias', label: '别名', sec: true },
      { key: 'place', label: '地点', sec: true },
      { key: 'versions', label: '版本', ph: '手稿 / 刻本 / 抄本', sec: true },
      { key: 'extent', label: '篇幅', ph: '卷数 / 篇数 / 字数', sec: true },
      { key: 'collection', label: '收录', ph: '收入哪部文集', sec: true },
      { key: 'authenticity', label: '真伪', chips: AUTHENTICITY_OPTIONS, sec: true },
      { key: 'manuscript', label: '手稿', sec: true },
      { key: 'patent', label: '专利', sec: true },
      { key: 'exhibition', label: '展览', sec: true },
      { key: 'performance', label: '演出', sec: true },
      { key: 'course', label: '课程', sec: true },
      { key: 'translation', label: '译本', sec: true },
      { key: 'research', label: '研究', sec: true }
    ]
  },
  {
    key: 'organizations', label: '组织机构', itemName: '机构',
    fields: [
      { key: 'name', label: '机构名称' },
      { key: 'role', label: '关系类型', chips: ORG_ROLES },
      { key: 'startYear', label: '起始年', ph: '如 1937' },
      { key: 'endYear', label: '结束年', ph: '在职则留空' },
      { key: 'description', label: '描述', type: 'textarea' },
      { key: 'year', label: '年份（旧数据单值）', sec: true },
      { key: 'position', label: '职务', sec: true },
      { key: 'place', label: '地点', sec: true },
      { key: 'parent', label: '上级机构', sec: true },
      { key: 'subordinates', label: '下属', sec: true },
      { key: 'colleagues', label: '同事', sec: true },
      { key: 'changes', label: '机构变迁', ph: '改名 / 合并 / 撤销', sec: true }
    ]
  },
  {
    key: 'achievements', label: '成就与荣誉', itemName: '成就',
    fields: [
      { key: 'title', label: '成就名称' },
      { key: 'category', label: '分类', chips: ACHIEVEMENT_CATEGORIES },
      { key: 'year', label: '年份' },
      { key: 'description', label: '描述', type: 'textarea' },
      { key: 'org', label: '颁发机构', sec: true }
    ]
  },
  {
    key: 'legacy', label: '纪念与遗产', itemName: '条目',
    fields: [
      { key: 'title', label: '名称' },
      { key: 'category', label: '分类', chips: LEGACY_CATEGORIES },
      { key: 'description', label: '描述', type: 'textarea' },
      { key: 'place', label: '地点', sec: true },
      { key: 'status', label: '现状', ph: '现状 / 开放时间', sec: true },
      { key: 'year', label: '年份', sec: true },
      { key: 'level', label: '保护级别', chips: LEVEL_OPTIONS, sec: true }
    ]
  },
  {
    key: 'eraContext', label: '时代背景', itemName: '条目',
    fields: [
      { key: 'year', label: '年份' },
      { key: 'title', label: '标题' },
      { key: 'category', label: '维度', chips: ERA_CATEGORIES },
      { key: 'description', label: '描述', type: 'textarea' }
    ]
  }
];

// 面板静态配置（主字段 / 补充字段分开，WXML 直接遍历）
const PANEL_VIEW = ITEM_PANELS.map(function (p) {
  return {
    key: p.key,
    label: p.label,
    itemName: p.itemName,
    primaryFields: p.fields.filter(function (f) { return !f.sec; }),
    secondaryFields: p.fields.filter(function (f) { return !!f.sec; })
  };
});

const PANEL_MAP = {};
ITEM_PANELS.forEach(function (p) { PANEL_MAP[p.key] = p; });

/** 空白行：把该面板所有字段初始化为 ''，并带 _more（补充字段展开态） */
function emptyRow(panelKey) {
  var row = { _more: false };
  (PANEL_MAP[panelKey] ? PANEL_MAP[panelKey].fields : []).forEach(function (f) { row[f.key] = ''; });
  return row;
}

/** 空白表单（每次新建，避免共享引用） */
function emptyForm() {
  var f = {
    name: '', nameEn: '', aliases: '', courtesyName: '', artName: '', commonName: '',
    gender: '', birthYear: '', deathYear: '', zodiac: '', birthPlace: '', region: '', deathPlace: '',
    nationality: '', ethnicity: '', dynasty: '', tags: '', occupation: '', education: '', faith: '',
    avatar: '', lifeStatus: '', longevity: '', bio: '', fullBio: '',
    events: [], works: [], organizations: [], achievements: [], legacy: [], eraContext: [],
    relations: []
  };
  return f;
}

/** 逗号/顿号/分号切分（与 Web 端 splitList 同口径） */
function splitList(v) {
  if (!v) return [];
  return String(v).split(/[,，、;；]/).map(function (t) { return t.trim(); }).filter(Boolean);
}

/** 关系签名：只比较「目标 + 类型 + 说明」，顺序无关（决定是否回写权威表） */
function relSignature(rels) {
  return (rels || []).map(function (r) {
    return [r.targetId || '', r.name || '', r.type || '', r.description || ''].join('|');
  }).sort().join(';;');
}

Page({
  data: {
    figures: [],
    // 真实状态栏高度（px），注入导航栏 padding-top（写死 88rpx 会被高状态栏机型压住）
    safeAreaTop: 44,
    loading: false,
    refreshing: false,
    page: 1,
    totalPages: 0,
    searchKeyword: '',
    currentDynasty: '',
    dynastyList: DYNASTY_LIST,

    // ===== 编辑表单 =====
    showForm: false,
    formMode: 'add',      // add | edit
    editingId: '',
    formData: emptyForm(),
    saving: false,
    showFullBio: false,   // 详细介绍全屏编辑

    // 选项
    dynastyOptions: DYNASTY_OPTIONS,
    dynastyIndex: 0,
    genderOptions: GENDER_OPTIONS,
    genderIndex: 0,
    zodiacOptions: ZODIAC_OPTIONS,
    zodiacIndex: 0,
    lifeStatusOptions: LIFE_STATUS_OPTIONS,
    lifeStatusIndex: 0,

    // 条目面板
    itemPanels: PANEL_VIEW,
    openPanels: {},       // { events: true, ... }

    // 关系
    relationTypes: RELATION_TYPES,
    relationIndex: 0,
    relCandidates: [],
    relKeyword: '',
    relSearching: false,
    newRelDesc: '',

    _adminToken: ''
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
    this.loadFigures(1);
  },

  onUnload() {
    this._isPageActive = false;
    // 关系候选搜索防抖：卸载后仍触发会白发一次请求
    if (this._relTimer) clearTimeout(this._relTimer);
    this._relTimer = null;
  },

  onLogout() {
    try { wx.removeStorageSync('admin_token'); } catch (e) { /* ignore */ }
    wx.redirectTo({ url: '/admin-pkg/pages/login/login' });
  },

  onBack() {
    wx.navigateBack();
  },

  // 弹层内容区用 catchtap 阻止冒泡（否则点输入框会把弹窗关掉）
  noop() {},

  // ==================== 列表 ====================

  loadFigures(page) {
    var that = this;
    that.setData({ loading: true });

    var url = API.FIGURES.LIST + '?page=' + page + '&pageSize=' + PAGE_SIZE;
    if (that.data.searchKeyword) {
      url += '&search=' + encodeURIComponent(that.data.searchKeyword);
    }
    if (that.data.currentDynasty) {
      url += '&dynasty=' + encodeURIComponent(that.data.currentDynasty);
    }

    request({
      handle401: false,
      timeout: 10000,
      url: url,
      method: 'GET',
      success(res) {
        if (!that._isPageActive) return;
        if (res.data && res.data.success && res.data.data) {
          var list = res.data.data.list || [];
          // [注意] 服务端把分页字段放在 data **顶层**（page / pageSize / total / totalPages），
          //    并没有 `pagination` 子对象；旧代码读 `data.pagination.totalPages` 恒为 undefined
          //    → totalPages 恒 0 → 「下一页」永久禁用（2026-09-29 修）
          var pg = res.data.data.pagination || res.data.data;
          that.setData({
            figures: list,
            page: pg.page || page,
            totalPages: pg.totalPages || 0,
            loading: false,
            refreshing: false
          });
        } else {
          that.setData({ figures: [], loading: false, totalPages: 0, refreshing: false });
        }
      },
      fail() {
        if (!that._isPageActive) return;
        that.setData({ loading: false, refreshing: false });
        wx.showToast({ title: '加载失败', icon: 'none' });
      }
    });
  },

  onPrevPage() {
    if (this.data.page <= 1) return;
    this.loadFigures(this.data.page - 1);
  },

  onNextPage() {
    if (this.data.page >= this.data.totalPages) return;
    this.loadFigures(this.data.page + 1);
  },

  onSearchInput(e) {
    var keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });
    this.loadFigures(1);
  },

  onDynastyChange(e) {
    var index = e.detail.value;
    var dynasty = DYNASTY_LIST[index];
    if (dynasty === '全部') dynasty = '';
    this.setData({ currentDynasty: dynasty });
    this.loadFigures(1);
  },

  onRefresh() {
    this.setData({ refreshing: true });
    this.loadFigures(1);
  },

  // ==================== 打开表单（新增 / 编辑） ====================

  onAddFigure() {
    this.setData({
      showForm: true,
      formMode: 'add',
      editingId: '',
      formData: emptyForm(),
      openPanels: {},
      dynastyIndex: 0, genderIndex: 0, zodiacIndex: 0, lifeStatusIndex: 0,
      relKeyword: '', relCandidates: [], relationIndex: 0, newRelDesc: ''
    });
    this._relBaseline = '';
  },

  /**
   * 编辑：列表行**不含全量字段**（标签/别名/条目/关系都在别的表或 JSON 里），
   * 必须按 id 拉一次 `GET /api/figures/:id` 再回填。
   */
  onEditFigure(e) {
    var that = this;
    var idx = Number(e.currentTarget.dataset.index);
    var row = this.data.figures[idx];
    if (!row) return;
    wx.showLoading({ title: '加载中...' });
    request({
      handle401: false,
      url: API.FIGURES.GET(row.id),
      timeout: 15000,
      header: { 'x-admin-key': that.data._adminToken || '' },
      success: function (res) {
        wx.hideLoading();
        if (!that._isPageActive) return;
        var d = (res.data && res.data.data) || null;
        if (!d) return wx.showToast({ title: '加载人物详情失败', icon: 'none' });
        that._fillForm(d);
      },
      fail: function () {
        wx.hideLoading();
        if (that._isPageActive) wx.showToast({ title: '加载人物详情失败', icon: 'none' });
      }
    });
  },

  /** 把服务端详情回填进表单（含 6 类条目与关系） */
  _fillForm(d) {
    var f = emptyForm();
    ['name', 'nameEn', 'courtesyName', 'artName', 'commonName', 'gender', 'zodiac',
      'birthPlace', 'region', 'deathPlace', 'nationality', 'ethnicity', 'dynasty',
      'occupation', 'education', 'faith', 'avatar', 'lifeStatus', 'longevity', 'bio', 'fullBio']
      .forEach(function (k) { f[k] = d[k] == null ? '' : String(d[k]); });
    f.birthYear = d.birthYear == null ? '' : String(d.birthYear);
    f.deathYear = d.deathYear == null ? '' : String(d.deathYear);
    // tags / aliases 都是数组，回填成逗号串
    f.tags = Array.isArray(d.tags) ? d.tags.join(',') : (d.tags || '');
    f.aliases = Array.isArray(d.aliases) ? d.aliases.join(',') : '';

    // 6 类条目：逐字段字符串化，补齐缺失键（服务端旧数据键不全）
    ITEM_PANELS.forEach(function (p) {
      var rows = Array.isArray(d[p.key]) ? d[p.key] : [];
      f[p.key] = rows.map(function (r) {
        var out = emptyRow(p.key);
        p.fields.forEach(function (fd) {
          var raw = r[fd.key];
          if (raw === undefined && fd.key === 'title' && r.name !== undefined) raw = r.name; // 旧数据用 name 存作品名
          out[fd.key] = raw == null ? '' : String(raw);
        });
        return out;
      });
    });

    // 关系：{ type, targetId, name, description }
    f.relations = (Array.isArray(d.relations) ? d.relations : []).map(function (r) {
      return {
        type: r.type || '',
        targetId: r.targetId != null ? String(r.targetId) : '',
        name: r.name || '',
        description: r.description || ''
      };
    });

    this._relBaseline = relSignature(f.relations);

    var idxOf = function (opts, v) {
      var i = opts.indexOf(v);
      return i < 0 ? 0 : i;
    };

    this.setData({
      showForm: true,
      formMode: 'edit',
      editingId: d.id,
      formData: f,
      openPanels: {},
      dynastyIndex: idxOf(DYNASTY_OPTIONS, f.dynasty),
      genderIndex: idxOf(GENDER_OPTIONS, f.gender),
      zodiacIndex: idxOf(ZODIAC_OPTIONS, f.zodiac),
      lifeStatusIndex: idxOf(LIFE_STATUS_OPTIONS, f.lifeStatus),
      relKeyword: '', relCandidates: [], relationIndex: 0, newRelDesc: ''
    });

    // [注意] `GET /api/figures/:id` 的关系项只有 targetId/type/description，**不带姓名**
    //    （服务端实测字段 = [targetId, type, description]），不补名的话关系列表只能显示
    //    "ID 310"，管理员根本看不出改的是谁 → 再批量查一次姓名。
    var ids = f.relations.filter(function (r) { return !r.name && r.targetId; })
      .map(function (r) { return r.targetId; });
    if (ids.length) this._fillRelationNames(ids);
  },

  /** 批量补齐关系目标的姓名，并把基线**重新**计算（否则补名本身会被误判为"关系有改动"） */
  _fillRelationNames(ids) {
    var that = this;
    request({
      handle401: false,
      url: API.FIGURES.BATCH,
      data: { ids: ids.join(',') },
      timeout: 10000,
      header: { 'x-admin-key': that.data._adminToken || '' },
      success: function (res) {
        if (!that._isPageActive) return;
        var list = (res.data && res.data.data) || [];
        var map = {};
        list.forEach(function (p) { map[String(p.id)] = p.name || ''; });
        var fd = that.data.formData;
        fd.relations = (fd.relations || []).map(function (r) {
          if (!r.name && map[String(r.targetId)]) {
            return { type: r.type, targetId: r.targetId, name: map[String(r.targetId)], description: r.description };
          }
          return r;
        });
        that._relBaseline = relSignature(fd.relations);
        that.setData({ formData: fd });
      },
      fail: function () { /* 补名失败不影响编辑，列表退化为显示 ID */ }
    });
  },

  onCloseForm() {
    this.setData({ showForm: false, showFullBio: false });
  },

  // ==================== 表单：标量字段 ====================

  onFormInput(e) {
    var field = e.currentTarget.dataset.field;
    var fd = this.data.formData;
    fd[field] = e.detail.value;
    this.setData({ formData: fd });
  },

  onFormDynastyChange(e) {
    var i = Number(e.detail.value);
    var fd = this.data.formData;
    fd.dynasty = DYNASTY_OPTIONS[i];
    this.setData({ formData: fd, dynastyIndex: i });
  },

  onFormGenderChange(e) {
    var i = Number(e.detail.value);
    var fd = this.data.formData;
    fd.gender = GENDER_OPTIONS[i];
    this.setData({ formData: fd, genderIndex: i });
  },

  onFormZodiacChange(e) {
    var i = Number(e.detail.value);
    var fd = this.data.formData;
    fd.zodiac = ZODIAC_OPTIONS[i];
    this.setData({ formData: fd, zodiacIndex: i });
  },

  onFormLifeStatusChange(e) {
    var i = Number(e.detail.value);
    var fd = this.data.formData;
    fd.lifeStatus = LIFE_STATUS_OPTIONS[i];
    this.setData({ formData: fd, lifeStatusIndex: i });
  },

  onToggleFullBio() {
    this.setData({ showFullBio: !this.data.showFullBio });
  },

  // ==================== 表单：条目面板 ====================

  onTogglePanel(e) {
    var key = e.currentTarget.dataset.key;
    var open = this.data.openPanels;
    open[key] = !open[key];
    this.setData({ openPanels: open });
  },

  onAddItem(e) {
    var key = e.currentTarget.dataset.key;
    var fd = this.data.formData;
    fd[key] = (fd[key] || []).concat([emptyRow(key)]);
    // 新增后自动展开该面板，避免"点了没反应"的错觉
    var open = this.data.openPanels;
    open[key] = true;
    this.setData({ formData: fd, openPanels: open });
  },

  onItemInput(e) {
    var ds = e.currentTarget.dataset;
    var fd = this.data.formData;
    var rows = fd[ds.panel];
    if (!rows || !rows[ds.index]) return;
    rows[ds.index][ds.field] = e.detail.value;
    this.setData({ formData: fd });
  },

  /** chips 快捷填入（枚举字段用，省去 picker 的 index 映射） */
  onItemChip(e) {
    var ds = e.currentTarget.dataset;
    var fd = this.data.formData;
    var rows = fd[ds.panel];
    if (!rows || !rows[ds.index]) return;
    rows[ds.index][ds.field] = ds.value;
    this.setData({ formData: fd });
  },

  onRemoveItem(e) {
    var that = this;
    var ds = e.currentTarget.dataset;
    wx.showModal({
      title: '删除条目',
      content: '确定删除这一条吗？',
      success: function (res) {
        if (!res.confirm) return;
        var fd = that.data.formData;
        fd[ds.panel] = (fd[ds.panel] || []).filter(function (_, i) { return i !== Number(ds.index); });
        that.setData({ formData: fd });
      }
    });
  },

  onToggleItemMore(e) {
    var ds = e.currentTarget.dataset;
    var fd = this.data.formData;
    var rows = fd[ds.panel];
    if (!rows || !rows[ds.index]) return;
    rows[ds.index]._more = !rows[ds.index]._more;
    this.setData({ formData: fd });
  },

  // ==================== 表单：关系 ====================

  onRelationTypeChange(e) {
    this.setData({ relationIndex: Number(e.detail.value) });
  },

  onRelDescInput(e) {
    this.setData({ newRelDesc: e.detail.value });
  },

  onRelKeywordInput(e) {
    var that = this;
    var kw = e.detail.value;
    this.setData({ relKeyword: kw });
    if (this._relTimer) clearTimeout(this._relTimer);
    if (!kw.trim()) return this.setData({ relCandidates: [] });
    this._relTimer = setTimeout(function () { that._searchRelCandidates(); }, 400);
  },

  _searchRelCandidates() {
    var that = this;
    var kw = (this.data.relKeyword || '').trim();
    if (!kw) return;
    this.setData({ relSearching: true });
    request({
      handle401: false,
      url: API.FIGURES.SEARCH,
      data: { search: kw, page: 1, pageSize: 10 },
      timeout: 10000,
      success: function (res) {
        if (!that._isPageActive) return;
        var list = (res.data && res.data.data && res.data.data.list) || [];
        that.setData({ relCandidates: list.slice(0, 10) });
      },
      fail: function () {
        if (that._isPageActive) that.setData({ relCandidates: [] });
      },
      complete: function () {
        if (that._isPageActive) that.setData({ relSearching: false });
      }
    });
  },

  /** 选中候选人物 → 追加一条关系（目标 id 用搜索结果，避免手填姓名造成错连） */
  onPickRelation(e) {
    var ds = e.currentTarget.dataset;
    var fd = this.data.formData;
    var type = RELATION_TYPES[this.data.relationIndex] || '';
    var rels = fd.relations || [];
    if (rels.some(function (r) { return String(r.targetId) === String(ds.id) && r.type === type; })) {
      return wx.showToast({ title: '该关系已存在', icon: 'none' });
    }
    rels.push({
      type: type,
      targetId: String(ds.id),
      name: ds.name || '',
      description: this.data.newRelDesc || ''
    });
    fd.relations = rels;
    this.setData({ formData: fd, relKeyword: '', relCandidates: [], newRelDesc: '' });
  },

  onRemoveRelation(e) {
    var idx = Number(e.currentTarget.dataset.index);
    var fd = this.data.formData;
    fd.relations = (fd.relations || []).filter(function (_, i) { return i !== idx; });
    this.setData({ formData: fd });
  },

  // ==================== 保存 ====================

  onSubmitForm() {
    var that = this;
    var fd = this.data.formData;
    if (!fd.name || !fd.name.trim()) return wx.showToast({ title: '人物名称不能为空', icon: 'none' });
    if (!fd.bio || !fd.bio.trim()) return wx.showToast({ title: '一句话简介不能为空（用于列表与 SEO）', icon: 'none' });
    if (fd.bio.trim().length > 200) return wx.showToast({ title: '简介不能超过 200 字', icon: 'none' });
    if (this.data.saving) return;

    var relations = (fd.relations || []).filter(function (r) { return r && (r.targetId || r.name || r.type); });

    var body = {
      name: fd.name, nameEn: fd.nameEn, courtesyName: fd.courtesyName, artName: fd.artName,
      commonName: fd.commonName, gender: fd.gender, zodiac: fd.zodiac,
      birthYear: fd.birthYear, deathYear: fd.deathYear,
      birthPlace: fd.birthPlace, region: fd.region, deathPlace: fd.deathPlace,
      nationality: fd.nationality, ethnicity: fd.ethnicity, dynasty: fd.dynasty,
      occupation: fd.occupation, education: fd.education, faith: fd.faith,
      avatar: fd.avatar, lifeStatus: fd.lifeStatus, longevity: fd.longevity,
      bio: fd.bio, fullBio: fd.fullBio,
      tags: splitList(fd.tags),
      aliases: splitList(fd.aliases),
      events: fd.events, works: fd.works, organizations: fd.organizations,
      achievements: fd.achievements, legacy: fd.legacy, eraContext: fd.eraContext,
      relations: relations,
      // 仅在关系面板确有改动时才让服务端回写 figure_relations 权威表
      // （详情接口返回的是"出边 + 入边 + JSON 兜底"的合并结果，无条件回写会把对称入边固化）
      relationsChanged: relSignature(relations) !== (this._relBaseline || '')
    };

    // 条目行里的 _more 是纯前端状态，不能写进库
    ['events', 'works', 'organizations', 'achievements', 'legacy', 'eraContext'].forEach(function (k) {
      body[k] = (body[k] || []).map(function (row) {
        var out = {};
        PANEL_MAP[k].fields.forEach(function (f) { out[f.key] = row[f.key] || ''; });
        return out;
      });
    });

    this.setData({ saving: true });
    request({
      handle401: false,
      url: this.data.formMode === 'edit' ? API.FIGURES.UPDATE(this.data.editingId) : API.FIGURES.CREATE,
      method: this.data.formMode === 'edit' ? 'PUT' : 'POST',
      timeout: 20000,
      header: { 'x-admin-key': that.data._adminToken || '' },
      data: body,
      success: function (res) {
        if (!that._isPageActive) return;
        var d = res.data || {};
        if (res.statusCode === 200 && d.success !== false) {
          wx.showToast({ title: d.message || '保存成功', icon: 'success' });
          that.setData({ showForm: false, showFullBio: false });
          that.loadFigures(that.data.page);
          if (d.warning) {
            setTimeout(function () { wx.showModal({ title: '提示', content: d.warning, showCancel: false }); }, 800);
          }
        } else {
          wx.showModal({ title: '保存失败', content: d.message || '请稍后重试', showCancel: false });
        }
      },
      fail: function (err) {
        if (!that._isPageActive) return;
        wx.showToast({ title: '请求失败：' + ((err && err.errMsg) || '未知错误'), icon: 'none' });
      },
      complete: function () {
        if (that._isPageActive) that.setData({ saving: false });
      }
    });
  },

  onDeleteFigure(e) {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var that = this;

    wx.showModal({
      title: '确认删除',
      content: '确定要删除「' + name + '」吗？此操作不可恢复。',
      success(res) {
        if (res.confirm) {
          request({
            handle401: false,
            url: API.FIGURES.DELETE(id),
            method: 'DELETE',
            timeout: 10000,
            // [注意] `DELETE /api/figures/:id` 挂的是 requireAdmin，缺这个头会被"伪装成 404"挡掉
            //    → 删除永远失败（2026-09-29 与用户管理一并排查出）
            header: { 'x-admin-key': that.data._adminToken || '' },
            success(result) {
              if (!that._isPageActive) return;
              if (result.statusCode === 200 || result.statusCode === 204) {
                wx.showToast({ title: '删除成功', icon: 'success' });
                that.loadFigures(that.data.page);
              } else {
                wx.showToast({ title: (result.data && result.data.message) || '删除失败', icon: 'none' });
              }
            },
            fail() {
              if (!that._isPageActive) return;
              wx.showToast({ title: '删除失败', icon: 'none' });
            }
          });
        }
      }
    });
  }
});
