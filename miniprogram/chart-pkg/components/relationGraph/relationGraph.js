const echarts = require('../ec-canvas/echarts');

if (echarts.setPlatformAPI) {
  echarts.setPlatformAPI({
    createCanvas: function () { return null; }
  });
}

var MAX_NODES = 120;

function getBroadCategory(displayType) {
  if (!displayType) return '其他';
  // [重要] 复合 type 拆第一段（"长子;第一子"→"长子"、"侄孙;从孙"→"侄孙"），
  //    避免带分号的复合关系词漏判落到「其他」分类。
  var d = String(displayType).split(/[;；、/]/)[0].trim() || String(displayType);
  if (d === '丈夫' || d === '夫君') return '丈夫';
  if (d === '才人' || d === '皇后' || d === '妃子' || d === '妾室' ||
      d === '伴侣' || d === '贵妃' || d === '皇妃' || d === '宠妃' || d === '妃嫔' || d === '嫔妃' || d === '后妃') return '妃嫔';
  if (d === '原配' || d === '妻子' || d === '正妻' || d === '正室' || d === '继室' ||
      d === '二夫人' || d === '三夫人' || d === '四夫人' || d === '五夫人' ||
      d === '六夫人' || d === '七夫人' || d === '八夫人' || d === '九夫人' || d === '夫人') return '正妻';
  // 儿子（含全部排行变体）
  if (d === '儿子' || d === '子' || d === '长子' || d === '次子' || d === '三子' || d === '四子' ||
      d === '五子' || d === '六子' || d === '七子' || d === '八子' || d === '九子' || d === '十子' ||
      d === '幼子' || d === '幺子' || d === '独子' || d === '季子' || d === '养子' || d === '义子' || d === '儿媳妇') return '儿子';
  // 女儿（含全部排行变体）
  if (d === '女儿' || d === '女' || d === '长女' || d === '次女' || d === '三女' || d === '四女' ||
      d === '五女' || d === '六女' || d === '七女' || d === '八女' || d === '九女' || d === '十女' ||
      d === '幼女' || d === '幺女' || d === '独女' || d === '养女' || d === '义女') return '女儿';
  // 父母/祖辈
  if (d === '父亲' || d === '父' || d === '母亲' || d === '母' || d === '生母' || d === '生父' ||
      d === '嫡母' || d === '养母' || d === '养父' || d === '继母' || d === '继父' ||
      d === '祖父' || d === '祖母' || d === '外祖父' || d === '外祖母' ||
      d === '曾祖父' || d === '曾祖母' || d === '公公' || d === '养祖父') return '父母';
  // 兄弟姐妹
  if (d === '兄长' || d === '弟弟' || d === '姐姐' || d === '妹妹' || d === '义兄' || d === '义弟' ||
      d === '兄弟' || d === '姐妹' || d === '兄妹' || d === '姐弟' ||
      d === '胞兄' || d === '胞弟' || d === '胞姐' || d === '胞妹' ||
      d === '堂兄' || d === '堂弟' || d === '堂姐' || d === '堂妹' ||
      d === '表兄' || d === '表弟' || d === '表姐' || d === '表妹') return '兄弟姐妹';
  // 亲族（孙辈/叔伯/侄甥）
  if (d === '孙子' || d === '孙女' || d === '曾孙' || d === '曾孙女' || d === '玄孙' ||
      d === '外孙' || d === '外孙女' || d === '养孙' || d === '养孙女' ||
      d === '叔叔' || d === '伯父' || d === '侄子' || d === '侄女' || d === '叔侄' || d === '舅舅' ||
      d === '外甥' || d === '外甥女' || d === '姑妈' || d === '姑母' || d === '姨妈' || d === '姨母' ||
      d === '伯母' || d === '叔母' || d === '仲父') return '亲族';
  // 姻亲：女婿/岳父/儿媳/连襟/妯娌/亲家，以及「妻父/妾之父」变体
  if (/女婿/.test(d) || d === '岳父' || d === '岳母' || d === '儿媳' || d === '儿媳妇' ||
      d === '连襟' || d === '妯娌' || d === '亲家' ||
      /妻父|妾父|妾之父|妻之父|丈夫之父/.test(d)) return '亲族';
  // 师承
  if (d === '师父' || d === '老师' || d === '师傅' || d === '恩师' || d === '伯乐' ||
      d === '弟子' || d === '学生' || d === '门生' || d === '徒弟') return '师承';
  // 君臣/上下级（含官职词）
  if (d === '君主' || d === '臣子' || d === '下属' || d === '下级' || d === '部下' ||
      d === '上级' || d === '上司' || d === '旧主' || d === '丞相' || d === '宰相' ||
      d === '大将' || d === '将军' || d === '幕僚' || d === '前任' || d === '领袖' ||
      d === '大臣' || d === '近臣' || d === '名臣' || d === '重臣' || d === '权臣' || d === '谋臣' ||
      d === '御史' || d === '刺史' || d === '太守' || d === '尚书' || d === '侍郎' || d === '大夫' ||
      d === '节度使' || d === '都尉' || d === '校尉' || d === '太子' || d === '皇子' || d === '公主' || d === '太后') return '君臣/上下级';
  // 朋友/同僚
  if (d === '挚友' || d === '知己' || d === '朋友' || d === '好友' || d === '友人' ||
      d === '同僚' || d === '合作' || d === '战友' || d === '同事') return '朋友/同僚';
  // 对手/敌人
  if (d === '对手' || d === '敌人' || d === '政敌') return '对手/敌人';
  return '其他';
}

// 暖调分类色板：中饱和、在米白卡底上可读、分类间可区分
var CATEGORY_COLORS = {
  '丈夫': '#8064a8',
  '妃嫔': '#c25b7c',
  '正妻': '#d3837a',
  '儿子': '#b0812f',
  '女儿': '#8f9a3d',
  '父母': '#a63b2a',
  '兄弟姐妹': '#5a7247',
  '亲族': '#8b5e34',
  '师承': '#4a6fa5',
  '君臣/上下级': '#3a7ca5',
  '朋友/同僚': '#2f8f83',
  '对手/敌人': '#8c2f39',
  '其他': '#75654f'
};

Component({
  properties: {
    nodes: { type: Array, value: [] },
    links: { type: Array, value: [] },
    currentId: { type: String, value: '' }
  },

  data: {
    ec: null,
    filterOptions: ['全部'],
    filterIndex: 0,
    legendTypes: Object.entries(CATEGORY_COLORS).map(function(e) {
      return { name: e[0], color: e[1] };
    })
  },

  observers: {
    'nodes, links, currentId': function () {
      if (this._updateTimer) clearTimeout(this._updateTimer);
      this._updateTimer = setTimeout(function () { this.updateFilterOptions(); }.bind(this), 100);
    }
  },

  lifetimes: {
    ready() {
      const comp = this;
      this.setData({
        ec: {
          onInit: function (canvas, width, height, dpr) {
            try {
              const chart = echarts.init(canvas, null, { width: width, height: height, devicePixelRatio: dpr });
              canvas._chart = chart;
              comp._chart = chart;
              chart.on('click', function (params) {
                if (params.dataType === 'node' && params.data.isPerson && params.data.id !== String(comp.properties.currentId)) {
                  comp.triggerEvent('nodeclick', { id: params.data.id });
                }
              });
              comp.updateGraph();
              return chart;
            } catch (err) {
              console.error('[relationGraph] onInit error:', err);
              return null;
            }
          }
        }
      });
    },

    detached() {
      if (this._updateTimer) {
        clearTimeout(this._updateTimer);
        this._updateTimer = null;
      }
      this._chart = null;
    }
  },

  methods: {
    noop() {},

    onFilterChange: function (e) {
      var idx = parseInt(e.detail.value);
      this.setData({ filterIndex: idx }, function () {
        this.updateGraph();
      });
    },

    updateFilterOptions: function () {
      var links = this.properties.links || [];
      var centerId = String(this.properties.currentId);
      var catSet = {};
      links.forEach(function(link) {
        if (String(link.source) !== centerId) return;
        var cat = getBroadCategory(link.displayType);
        catSet[cat] = true;
      });
      var cats = Object.keys(catSet).sort();
      var cleanOptions = ['全部'].concat(cats);
      // Keep current selection if still valid
      var curIdx = this.data.filterIndex;
      if (curIdx >= cleanOptions.length) curIdx = 0;
      this.setData({ filterOptions: cleanOptions, filterIndex: curIdx }, function () {
        this.updateGraph();
      });
    },

    updateGraph() {
      this._renderGraph(this._chart);
    },

    _renderGraph(chart) {
      if (!chart) { return; }
      const nodes = this.properties.nodes;
      const links = this.properties.links;
      const currentId = String(this.properties.currentId);
      const { filterOptions, filterIndex } = this.data;
      if (!nodes || nodes.length === 0) { chart.clear(); return; }
      // 超限不白屏：截断到 MAX_NODES 渲染（截断标记在下方分类遍历里维护）

      var centerId = String(currentId);
      var selectedCat = filterIndex > 0 ? filterOptions[filterIndex] : null;

      // Build category map for all links
      var catMap = {};
      var centerNode = null;

      links.forEach(function(link) {
        var sourceId = String(link.source);
        var targetId = String(link.target);
        if (sourceId !== centerId) return;
        var cat = getBroadCategory(link.displayType);
        if (!catMap[cat]) catMap[cat] = { displayTypes: {}, personIds: [] };
        if (catMap[cat].personIds.indexOf(targetId) < 0) {
          catMap[cat].personIds.push(targetId);
        }
        // 优先使用 displayType（视角正确的简化标签），
        // 但如果 type 或 description 包含长子/次子/长女等具体子女性标签则优先显示
        var SPECIFIC_CHILD_TYPES = { '长子':1,'次子':1,'幼子':1,'第三子':1,'第四子':1,'第五子':1,
          '第六子':1,'第七子':1,'第八子':1,'第九子':1,'第十子':1,
          '长女':1,'次女':1,'幼女':1,'养子':1,'养女':1,'儿媳妇':1 };
        var fromDesc = ((link.description || '').match(/(?:长|次|幼)[子女]|第[一二三四五六七八九十]子/) || [])[0] || '';
        catMap[cat].displayTypes[targetId] = SPECIFIC_CHILD_TYPES[link.displayType] ? link.displayType :
          (SPECIFIC_CHILD_TYPES[fromDesc] ? fromDesc :
          (link.displayType || link.type || link.description || ''));
      });

      var personNodeMap = {};
      nodes.forEach(function(n) {
        personNodeMap[String(n.id)] = n;
      });

      // Filter: determine which categories to show
      var activeCats = Object.keys(catMap).sort();
      if (selectedCat) {
        activeCats = [selectedCat];
      }

      var graphData = [];
      var graphLinks = [];
      var nodeIds = new Set();
      var nodeCount = 1; // 中心节点
      var truncated = false;

      // [重要] 自适应符号/字号（2026-09-16）：关系越多节点与标签越小，缓解拥挤与文字重叠
      var totalPersons = 0;
      activeCats.forEach(function(cat) { totalPersons += catMap[cat].personIds.length; });
      var personSymbol = totalPersons > 80 ? 16 : (totalPersons > 40 ? 19 : 24);
      var personFont = totalPersons > 80 ? 9 : (totalPersons > 40 ? 10 : 11);
      var edgeLabelFont = totalPersons > 80 ? 8 : (totalPersons > 40 ? 9 : 10);

      // Center node
      nodes.forEach(function(n) {
        if (String(n.id) === centerId) {
          centerNode = n;
          graphData.push({
            id: centerId,
            name: n.name,
            symbolSize: 40,
            itemStyle: { color: '#b5713a' },
            category: 0,
            // tooltip 前缀统一用姓名首字（全端停用 emoji 头像；此前会把 /uploads 图片路径拼进文案）
            emoji: String(n.name || '').charAt(0),
            isPerson: true
          });
          nodeIds.add(centerId);
        }
      });
      if (!centerNode) { chart.clear(); return; }

      // Category nodes + person nodes
      activeCats.forEach(function(cat, ci) {
        var color = CATEGORY_COLORS[cat] || '#94a3b8';
        graphData.push({
          id: '__cat_' + cat,
          name: cat,
          symbolSize: 20,
          symbol: 'roundRect',
          itemStyle: { color: color, opacity: 0.85 },
          category: ci + 1,
          categoryName: cat,
          isCategory: true,
          isPerson: false
        });

        graphLinks.push({
          source: centerId,
          target: '__cat_' + cat,
          value: cat,
          lineStyle: { color: color, width: 1.2, opacity: 0.4, type: 'dashed' }
        });

        var info = catMap[cat];
        // 类目节点也计入 MAX_NODES，防止关系极多的人物（单人最多 800 条边）全量渲染导致白屏
        if (nodeCount < MAX_NODES) nodeCount++;
        else truncated = true;
        info.personIds.forEach(function(pid) {
          var pNode = personNodeMap[pid];
          if (!pNode) return;
          if (!nodeIds.has(pid)) {
            if (nodeCount >= MAX_NODES) { truncated = true; return; }
            graphData.push({
              id: pid,
              name: pNode.name,
              symbolSize: personSymbol,
              itemStyle: { color: color },
              category: ci + 1,
              emoji: String(pNode.name || '').charAt(0),
              isPerson: true
            });
            nodeIds.add(pid);
            nodeCount++;
          }
          var edgeLabel = info.displayTypes[pid] || '';
          graphLinks.push({
            source: '__cat_' + cat,
            target: pid,
            value: edgeLabel,
            lineStyle: { color: color, width: 1.5, opacity: 0.6 }
          });
        });
      });

      // Radial layout（2026-09-16 重写：按分类人数分配扇区角度 + 多圈分布，解决「关系一多就挤成一团」）
      var chartWidth = chart.getWidth() || 375;
      var chartHeight = chart.getHeight() || 500;
      var cx = chartWidth / 2;
      var cy = chartHeight / 2;
      var minDim = Math.min(chartWidth, chartHeight);
      var innerR = minDim * 0.18;   // 分类节点内圈
      var outerR = minDim * 0.48;   // 人物节点外圈（比旧版 0.42 更大，充分利用画布）

      graphData.forEach(function(n) {
        if (n.id === centerId) { n.x = cx; n.y = cy; }
      });

      var numActive = activeCats.length;
      if (numActive > 0) {
        // ① 每个分类的扇区角度按「人数 + 基础权重」加权归一化到整圆：
        //    人数多的分类（如儿子/女儿/大臣）分到更大扇区，避免多人挤在一条窄弧线上。
        var catWeights = {};
        var totalWeight = 0;
        activeCats.forEach(function(cat) {
          var w = catMap[cat].personIds.length + 1.5; // 基础权重，空分类也有角度
          catWeights[cat] = w;
          totalWeight += w;
        });

        var PER_RING = 7;              // 每圈最多 7 人，超出换更大半径的下一圈
        // ④ 分类之间预留角度间隙，避免相邻分类的边界节点角度重叠（旧版无间隙，边界节点会叠在一起）
        var GAP_TOTAL = Math.min(0.5, 0.06 * numActive); // 总间隙上限 0.5 rad
        var usableAngle = 2 * Math.PI - GAP_TOTAL;
        var gapPerCat = GAP_TOTAL / numActive;
        var angleCursor = -Math.PI / 2 + gapPerCat / 2; // 从 12 点方向开始顺时针分配

        activeCats.forEach(function(cat) {
          var catId = '__cat_' + cat;
          var people = catMap[cat].personIds;
          var count = people.length;
          var span = (totalWeight > 0 ? catWeights[cat] / totalWeight : 1 / numActive) * usableAngle;
          var midAngle = angleCursor + span / 2;

          // ② 分类节点：放在扇区中间的内圈
          graphData.forEach(function(n) {
            if (n.id === catId) {
              n.x = cx + Math.cos(midAngle) * innerR;
              n.y = cy + Math.sin(midAngle) * innerR;
            }
          });

          // ③ 人物节点：多圈分布（每圈 PER_RING 人），半径逐圈外扩
          var rings = Math.max(1, Math.ceil(count / PER_RING));
          var ringGap = (outerR - innerR) / rings;

          people.forEach(function(pid, pi) {
            var ring = Math.floor(pi / PER_RING);
            var countInRing = Math.min(PER_RING, count - ring * PER_RING);
            // 第 0 圈离分类节点稍远，避免与其文字重叠
            var r = innerR + ringGap * (0.55 + ring);
            var a;
            if (countInRing <= 1) {
              a = midAngle;
            } else {
              a = midAngle - span / 2 + (pi % PER_RING) / (countInRing - 1) * span;
            }
            graphData.forEach(function(n) {
              if (n.id === pid) { n.x = cx + Math.cos(a) * r; n.y = cy + Math.sin(a) * r; }
            });
          });

          angleCursor += span + gapPerCat;
        });
      }

      if (numActive === 0) {
        chart.setOption({
          backgroundColor: 'transparent',
          series: [{
            type: 'graph',
            layout: 'none',
            data: graphData,
            roam: true,
            label: { show: true, position: 'bottom', fontSize: 12, color: '#75654f', textBorderColor: 'rgba(251, 247, 239, 0.92)', textBorderWidth: 1.5 },
            itemStyle: { color: '#d4a853' },
            symbolSize: 40
          }]
        });
        return;
      }

      var echartsCategories = [{ name: '中心人物', itemStyle: { color: '#d4a853' } }];
      activeCats.forEach(function(cat) {
        echartsCategories.push({ name: cat, itemStyle: { color: CATEGORY_COLORS[cat] || '#75654f' } });
      });

      try {
        chart.setOption({
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if (params.dataType === 'node') {
                // 只显示名称：不再拼 emoji 前缀（此前会把图片路径或首字重复拼进 tooltip）
                return params.name;
              }
              if (params.dataType === 'edge') {
                return params.data.value || '';
              }
              return '';
            }
          },
          series: [{
            type: 'graph',
            layout: 'none',
            animation: true,
            animationDuration: 500,
            data: graphData,
            links: graphLinks,
            categories: echartsCategories,
            roam: true,
            draggable: true,
            focusNodeAdjacency: true,
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: [4, 10],
            lineStyle: {
              color: 'source',
              curveness: 0.2,
              width: 1.5,
              opacity: 0.6
            },
            label: {
              show: true,
              position: 'bottom',
              fontSize: personFont,
              // 浅色纸底 (#f4ede1/#fbf7ef) 上必须用深色标签：原 #f5f0e6 是旧深色主题
              // 残留，对比度仅 1.02，姓名实际不可见（china-map 修过同类问题）
              color: '#75654f',
              textBorderColor: 'rgba(251, 247, 239, 0.92)',
              textBorderWidth: 1.5,
              fontWeight: 500,
              offset: [0, 4]
            },
            edgeLabel: {
              show: true,
              formatter: function (params) {
                return params.data.value || '';
              },
              fontSize: edgeLabelFont,
              // 边标签同理改浅色票 + 深色字（原深色票 rgba(26,25,22,.85) 在纸底上风格割裂）
              color: '#5d4f3d',
              backgroundColor: 'rgba(251, 247, 239, 0.92)',
              padding: [2, 6],
              borderRadius: 3
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: { width: 3, opacity: 1 }
            },
            blur: {
              opacity: 0.2,
              lineStyle: { opacity: 0.1 }
            }
          }]
        });
      } catch (err) {
        console.error('[relationGraph] setOption error:', err);
      }

      if (truncated && !this._truncNotified) {
        // 类目节点不受截断限制，实际节点数可能略超 MAX_NODES（最多 +13），文案不写死数字；每次会话只提示一次
        this._truncNotified = true;
        wx.showToast({ title: '关系较多，已展示主要关系节点', icon: 'none' });
      }
    }
  }
});
