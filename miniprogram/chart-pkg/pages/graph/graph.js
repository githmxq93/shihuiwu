// 独立「关系图谱」页：页面级搜索人物 → 以该人物为中心渲染关系网络。
// 数据管线与详情页「人物关系」tab 同源：服务端 /api/figures/:id 取 relations，
// 本地缓存（前 2000 人）+ /api/figures/batch 补齐关系目标的名字/头像。
var { getFigureById, onReady: figuresReady, isAllLoaded } = require('../../../data/figures');
var { getSortRole, extractRelationLabel, getRelationCategory, isGenericRelation } = require('../../../utils/relation-utils');
// 身份标签展示口径（剔除来源标记 CBDB），与 web 端 src/utils/visibleTags.ts 同口径
var tagFilter = require('../../../utils/tag-filter');
const request = require('../../../utils/request');
var API = require('../../../config/api');

var _extraFigures = {};   // id -> figure（服务端取回，含 batch 补齐的关系目标）
var _currentSeq = null;   // 当前请求序号（fetchMissingTargets 分片链据此中止过期任务）

function parseJsonField(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') {
    try { var p = JSON.parse(v); return Array.isArray(p) ? p : []; } catch (e) { return []; }
  }
  return [];
}

function resolveFigure(id) {
  return _extraFigures[String(id)] || getFigureById(id) || null;
}

function normalizeFigure(d) {
  if (!d) return d;
  d.id = String(d.id);
  d.tags = tagFilter.visibleTags(parseJsonField(d.tags));
  d.relations = parseJsonField(d.relations);
  return d;
}

/** 取单个人物完整信息（含 relations），并缓存供关系目标解析 */
function fetchFigureById(id, cb) {
  request({
    timeout: 10000,
    url: API.FIGURES.GET(id),
    success: function (res) {
      if (res.data && res.data.success && res.data.data) {
        var d = normalizeFigure(res.data.data);
        _extraFigures[String(d.id)] = d;
        cb(null, d);
      } else {
        cb(new Error('not-found'), null);
      }
    },
    fail: function () { cb(new Error('network'), null); }
  });
}

/** 批量补齐本地缺失的关系目标（/batch 单次上限 200，分片串行；换人后中止剩余分片） */
function fetchMissingTargets(ids, seq, cb) {
  var missing = [];
  var seen = {};
  for (var i = 0; i < ids.length; i++) {
    var key = String(ids[i]);
    if (seen[key]) continue;
    seen[key] = true;
    if (!resolveFigure(key)) missing.push(key);
  }
  if (missing.length === 0) { cb(); return; }

  var chunks = [];
  for (var j = 0; j < missing.length; j += 200) chunks.push(missing.slice(j, j + 200));
  var idx = 0;
  function next() {
    // 请求序号已过期（用户已换人）→ 丢弃剩余分片，省流量
    if (_currentSeq !== seq) return;
    if (idx >= chunks.length) { cb(); return; }
    var chunk = chunks[idx++];
    request({
      timeout: 10000,
      url: API.FIGURES.BATCH + '?ids=' + chunk.join(','),
      success: function (res) {
        // 同 detail.js::fetchMissingTargets：填充与推进都在 success 内完成，
        // 不依赖 complete/success 的先后（request.js 已按 wx.request 语义修正）
        try {
          if (res.data && res.data.success && Array.isArray(res.data.data)) {
            for (var k = 0; k < res.data.data.length; k++) {
              var f = normalizeFigure(res.data.data[k]);
              _extraFigures[String(f.id)] = f;
            }
          }
        } finally {
          next();
        }
      },
      fail: function () { next(); }
    });
  }
  next();
}

/** 关系 → 图谱 nodes/links（边标签逻辑与详情页 _buildRelationData 同款） */
function buildGraph(figure, relations) {
  var nodes = [{ id: String(figure.id), name: figure.name, avatar: figure.avatar, isCurrent: true }];
  var links = [];
  var seen = {};
  var dropped = 0; // 目标解析失败的条数（用于区分"无关系"与"数据没拉到"）
  seen[String(figure.id)] = true;

  // 多配偶动态标签（原配/二夫人/…），与详情页一致；按 targetId 去重
  var spouseRelList = [];
  var spouseSeen = {};
  (relations || []).forEach(function (r) {
    var d = r.description || '';
    var key = String(r.targetId);
    if (/之妻|原配|夫人|妾室|侧室|伴侣|皇后|妃子|之夫|之丈夫|夫君/.test(d) && !spouseSeen[key]) {
      spouseSeen[key] = true;
      spouseRelList.push(r.targetId);
    }
  });
  var spouseLabelMap = {};
  if (spouseRelList.length > 1) {
    var numArr = ['二', '三', '四', '五', '六', '七', '八', '九', '十'];
    spouseRelList.forEach(function (tid, idx) {
      spouseLabelMap[tid] = idx === 0 ? '原配' : (idx - 1 < numArr.length ? numArr[idx - 1] + '夫人' : String(idx + 1) + '夫人');
    });
  }

  (relations || []).forEach(function (rel) {
    var target = resolveFigure(rel.targetId);
    if (!target) { dropped++; return; }

    var displayType = getSortRole(rel.description || '', rel.type || '', target.name);
    if (!displayType || displayType === rel.type) {
      displayType = extractRelationLabel(rel.description || '', target.name);
    }
    if (!displayType) displayType = rel.type || '';

    // 父母/子女/兄弟姐妹类标签按目标性别修正方向
    var tags = target.tags || [];
    if (tags.indexOf('女性') >= 0) {
      if (displayType === '儿子') displayType = '女儿';
      else if (displayType === '兄弟') displayType = '姐妹';
      else if (displayType === '兄长' || displayType === '哥哥') displayType = '姐姐';
      else if (displayType === '弟弟') displayType = '妹妹';
      else if (displayType === '孙子') displayType = '孙女';
      else if (displayType === '侄子') displayType = '侄女';
      else if (displayType === '曾孙') displayType = '曾孙女';
      else if (displayType === '外孙') displayType = '外孙女';
      else if (displayType === '养子') displayType = '养女';
      else if (displayType === '外甥') displayType = '外甥女';
    } else if (tags.indexOf('男性') >= 0) {
      if (displayType === '女儿') displayType = '儿子';
      else if (displayType === '姐妹') displayType = '兄弟';
      else if (displayType === '姐姐') displayType = '兄长';
      else if (displayType === '妹妹') displayType = '弟弟';
      else if (displayType === '孙女') displayType = '孙子';
      else if (displayType === '侄女') displayType = '侄子';
      else if (displayType === '曾孙女') displayType = '曾孙';
      else if (displayType === '外孙女') displayType = '外孙';
      else if (displayType === '养女') displayType = '养子';
      else if (displayType === '外甥女') displayType = '外甥';
    }
    if (spouseLabelMap[rel.targetId]) displayType = spouseLabelMap[rel.targetId];

    // [重要] 过滤「泛关系」（2026-09-16）：赠诗/下属为Y/收到Y的赠诗/战胜/处决/纳降…
    //    这类是「一次事件/文献往来」而非「一层明确关系」，会以大量噪音节点
    //    挤在「其他」分类里（李世民 212 个关系里占 115 个），导致图谱看不清
    //    谁是谁的谁。与首页相关人员 isGenericRelation 过滤保持一致。
    if (isGenericRelation({ _relationType: displayType, _relationDesc: rel.description || '' }, figure.id)) {
      return;
    }

    if (!seen[String(rel.targetId)]) {
      seen[String(rel.targetId)] = true;
      nodes.push({ id: String(rel.targetId), name: target.name, avatar: target.avatar, tags: target.tags || [] });
    }

    links.push({
      source: String(figure.id),
      target: String(rel.targetId),
      category: rel.category || getRelationCategory(rel.type),
      type: rel.type,
      displayType: displayType,
      description: rel.description
    });
  });

  return { nodes: nodes, links: links, dropped: dropped };
}

Page({
  data: {
    safeAreaTop: 44,
    navBarHeight: 96,
    // 搜索
    searchQuery: '',
    searchResults: [],
    searchFocused: false,
    // 图谱
    currentId: '',
    figureName: '',
    nodes: [],
    links: [],
    loading: false,
    loadFailed: false,
    empty: false,
    // 未带 id 进入时等待用户搜索（不预载默认人物）
    awaitingSearch: false
  },

  onLoad(options) {
    try {
      var sys = wx.getWindowInfo();
      var safeTop = sys && sys.statusBarHeight ? sys.statusBarHeight : 44;
      this.setData({ safeAreaTop: safeTop, navBarHeight: safeTop + 44 + 8 });
    } catch (e) {}

    var id = options && options.id ? parseInt(options.id, 10) : NaN;
    if (isNaN(id)) {
      // 不带 id（如从首页磁贴进入）→ 空态引导搜索，不预载任何人物
      this.setData({ awaitingSearch: true });
      return;
    }
    this.setData({ currentId: String(id) });
    this.loadFigure(id);
  },

  onUnload() {
    if (this._searchTimer) clearTimeout(this._searchTimer);
    this._searchTimer = null;
  },

  // ===== 数据加载：服务端 relations 必取（本地缓存结构上不含 relations） =====
  loadFigure(id) {
    var that = this;
    this._reqSeq = (this._reqSeq || 0) + 1;
    var seq = this._reqSeq;
    _currentSeq = seq;
    this.setData({ loading: true, loadFailed: false, empty: false, awaitingSearch: false, currentId: String(id) });

    function done(err, figure) {
      if (seq !== that._reqSeq) return; // 用户已换人，丢弃过期响应
      if (err || !figure) {
        that.setData({ loading: false, loadFailed: true });
        return;
      }
      var rels = figure.relations || [];
      var targetIds = rels.map(function (r) { return r.targetId; });
      fetchMissingTargets(targetIds, seq, function () {
        if (seq !== that._reqSeq) return;
        var g = buildGraph(figure, rels);
        // 有关系记录但目标全部解析失败 → 多半是网络/批量接口故障，按失败态处理而非"无关系"
        var allDropped = rels.length > 0 && g.nodes.length <= 1 && g.dropped >= rels.length;
        that.setData({
          figureName: figure.name,
          nodes: g.nodes,
          links: g.links,
          loading: false,
          loadFailed: allDropped,
          empty: g.nodes.length <= 1 && !allDropped
        });
      });
    }

    // 本地已有富数据（含 relations，如刚从别的接口缓存过）直接用；否则服务端
    var local = resolveFigure(id);
    if (local && Array.isArray(local.relations) && local.relations.length > 0) {
      done(null, local);
      return;
    }
    fetchFigureById(id, function (err, d) {
      if (!err && d) { done(null, d); return; }
      // 服务端失败：等本地全量到齐再试一次（无 relations 也至少能画出中心孤点 → 走空态）
      if (!isAllLoaded()) {
        figuresReady(function () {
          var f = resolveFigure(id);
          if (f) done(null, f);
          else done(err || new Error('not-found'), null);
        });
        return;
      }
      var f2 = resolveFigure(id);
      if (f2) done(null, f2);
      else done(err || new Error('not-found'), null);
    });
  },

  // 节点点击：原位换中心（redirectTo 会叠页面栈，这里直接重载）
  onNodeTap(e) {
    var id = e && e.detail && e.detail.id;
    if (!id) return;
    this.loadFigure(parseInt(id, 10));
  },

  onRetry() {
    if (this.data.currentId) this.loadFigure(parseInt(this.data.currentId, 10));
  },

  // ===== 页面级搜索（autocomplete 联想） =====
  onSearchInput(e) {
    var q = (e.detail.value || '').trim();
    var that = this;
    this.setData({ searchQuery: q });
    if (this._searchTimer) clearTimeout(this._searchTimer);
    if (!q) { this.setData({ searchResults: [] }); return; }
    this._searchTimer = setTimeout(function () {
      request({
        timeout: 10000,
        url: API.FIGURES.AUTOCOMPLETE + '?prefix=' + encodeURIComponent(q) + '&limit=8',
        success: function (res) {
          var d = res.data || {};
          that.setData({ searchResults: (d.success && Array.isArray(d.data)) ? d.data : [] });
        },
        fail: function () { that.setData({ searchResults: [] }); }
      });
    }, 250);
  },

  onSearchFocus() {
    if (this._blurTimer) { clearTimeout(this._blurTimer); this._blurTimer = null; }
    this.setData({ searchFocused: true });
  },
  onSearchBlur() {
    var that = this;
    if (this._blurTimer) clearTimeout(this._blurTimer);
    this._blurTimer = setTimeout(function () { that.setData({ searchFocused: false }); }, 200);
  },
  onClearSearch() { this.setData({ searchQuery: '', searchResults: [] }); },

  onSelectSuggestion(e) {
    var id = e.currentTarget.dataset.id;
    if (!id) return;
    this.setData({ searchQuery: '', searchResults: [], searchFocused: false });
    this.loadFigure(parseInt(id, 10));
  },

  // 分享当前人物：path 带上 id，对方点开直接落到该人物的图谱（无 id 时退化为空态搜索页，与原行为一致）
  // [注意] 该页已被 sitemap.json 的 disallow * 屏蔽 —— 分享传播不受影响，仅不被微信搜一搜收录
  onShareAppMessage() {
    var id = this.data.currentId;
    var name = this.data.figureName;
    return {
      title: name ? ('世慧屋 · ' + name + ' 的人物关系图谱') : '世慧屋 · 人物关系图谱',
      path: '/chart-pkg/pages/graph/graph' + (id ? '?id=' + id : '')
    };
  },

  // 朋友圈单页模式只读 query：缺了 id 会落到默认图谱（不是当前人物），故必须带。
  onShareTimeline() {
    var id = this.data.currentId;
    var name = this.data.figureName;
    return {
      title: name ? ('世慧屋 · ' + name + ' 的人物关系图谱') : '世慧屋 · 人物关系图谱',
      query: id ? 'id=' + id : ''
    };
  }
});
