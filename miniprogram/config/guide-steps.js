/**
 * 使用引导文案与步骤配置（唯一来源）
 * ---------------------------------------------------------------------------
 * 页面只传功能 key，不写文案；改文案 / 调节奏只改本文件。
 *
 * 字段说明：
 *   name      「我的 → 使用指南」里显示的名称
 *   type      layer  = 全屏遮罩分步；bubble = 单条气泡；empty = 页面内空态卡
 *   page      重看时跳转的页面路径（空字符串表示不需要跳转）
 *   enabled   是否已接入页面（抽屉只列 enabled 的条目）
 *   steps     layer / bubble 用；empty 用 items
 *     target    目标节点的选择器（页面需给对应节点加 id）
 *     targets   多目标写法：数组，按所有目标的外接矩形并集挖一个孔（与 target 二选一）
 *     rings     并集内部还要单独描边的子元素（如搜索框左侧的「全部 ▾」），只描边不挖孔
 *     placement 卡片方向偏好：bottom = 优先目标下方（默认），top = 优先上方；
 *               放不下时组件会自动翻到另一侧，并把箭头转向目标
 *     scrollIntoView 目标不在视口内时，先让页面滚到该选择器（页面需 bind:scrollto）
 *     mockPanel 静态复刻一个“需要展开才能看到”的面板，只示意、不接收点击：
 *               { anchor: '#搜索框选择器' } 复刻下拉，贴在锚点下方；
 *               { type: 'sheet' } 复刻底部半屏（如朝代详情），贴屏幕底边。
 *     tabbar    该步高亮自定义 tabBar（此时页面 tabBar 已被隐藏，组件画静态复刻）
 *     pageState 该步目标只有页面切到某状态后才渲染（如详情页 pageTab），
 *               组件先 triggerEvent('state') 让页面切过去，再延时测量真实节点；
 *               遮罩拦住点击，不能指望用户在引导里自己切
 *     optional  目标为条件渲染、可能不存在（如母系为空时的父系开关）。
 *               量不到就跳过该步（最后一步则直接结束），不停在没有孔的遮罩里。
 *
 * 注：第二批功能的 target 先按约定写好，页面接入时补同名 id 即可。
 */

const GUIDES = {
  /* ============ 第一批：已接入 ============ */

  global: {
    name: '全站新手引导',
    type: 'layer',
    page: 'pages/index/index',
    enabled: true,
    steps: [
      {
        target: '#guide-search',
        scrollIntoView: '#guide-search',
        placement: 'bottom',
        title: '先输入人物姓名',
        body: '点这个搜索框，直接输入人物姓名，如「张作霖」「李白」。输完，下方会列出匹配的人物。',
        tip: '输入时会弹出候选，点一下名字才算选中。'
      },
      {
        target: '#guide-emp-filter',
        mockPanel: { anchor: '#guide-search' },
        placement: 'bottom',
        title: '分类筛选：全部 / 帝王 / 非帝王',
        body: '点「全部 ▾」展开三项：全部不限身份；帝王只在位称帝的人；非帝王是将相、文人、名士等。',
        tip: '先有关键词才生效：没输姓名时切了也不筛。再点一次或点空白处收起，选回「全部」即取消。'
      },
      {
        target: '',
        placement: 'top',
        tabbar: true,
        title: '底部四个 tab，各管一件事',
        body: '首页看人物，专题读长文，查询按时间与关系找工具，我的放收藏、历史与设置。下面用一个大框把四个一起标出。'
      },
      {
        target: '#guide-feature-grid',
        scrollIntoView: '#guide-feature-grid',
        placement: 'bottom',
        title: '四宫格：按时间或关系找',
        body: '年份查询、大事年表、朝代时间轴、历代帝王，四个入口都在这一块，点哪个都直接进对应工具。',
        tip: '六度空间在「查询 → 人物与关系」。'
      },
      {
        target: '#guide-search',
        placement: 'bottom',
        mockPanel: { type: 'pulldown' },
        title: '下拉也能刷新首页',
        body: '在列表上往下拖一下，松手后重新取一批人物卡片，专题文章也一起更新；如果正在搜索，就按当前关键词再搜一遍。',
        tip: '这一步只是示意：引导期间手势被拦住，关掉后自己拖一次试试。'
      }
    ]
  },

  sixdeg: {
    name: '六度空间',
    type: 'layer',
    page: 'pages/six-degrees/six-degrees',
    enabled: true,
    steps: [
      {
        target: '#guide-search',
        placement: 'bottom',
        title: '两端各写一个人名',
        body: '起点、终点分别输入姓名，等下拉出现候选后再点选；只打字没点选不算数。',
        tip: '写错点「×」清空重填。'
      },
      {
        target: '#guide-query',
        placement: 'bottom',
        title: '点「查询」看隔了几个人',
        body: '结果按度数从少到多排；同名人物会先按朝代、性别让你选一位。'
      },
      {
        target: '#guide-examples',
        placement: 'top',
        title: '示例 chip 一点就填好',
        body: '下面三张卡各有一组「甲 ⇄ 乙」示例，点一下自动带入两端。',
        tip: '三张卡分别讲：怎么填、同名怎么选、几度怎么算。'
      }
    ]
  },

  /* 平行时空 · 中外对照（2026-11-24 方案 B）：默认入口已改为 compare 页，
     这个 key 改讲地区下拉 / 搜索 / 时间轴 / 全部年代段与仅中外同段。
     原「选人物 / 选年份」页仍保留，用下面的 parallelSelect 单独讲；
     结果页仍用 parallelResult，两者都不改名，避免老用户的重看记录失效。 */
  parallel: {
    name: '中外对照',
    type: 'layer',
    page: 'parallel-pkg/pages/compare/compare',
    enabled: true,
    steps: [
      {
        target: '#guide-cmp-region',
        placement: 'bottom',
        title: '先按地区收窄',
        body: '默认「全部」；点开可只看欧洲、中东、东亚等地区，右侧数字是该地区的域外条数。左栏中国不受地区影响。'
      },
      {
        target: '#guide-cmp-search',
        placement: 'bottom',
        title: '搜年份、事件或人物',
        body: '写「前221」「755」会直接定位到那一段；写事件名或人物名（如「秦始皇」）只留命中的条目。',
        tip: '搜索框里输入人物后，结果顶部的卡片还能进原来的「同年中外」结果页。'
      },
      {
        target: '#guide-cmp-axis',
        placement: 'bottom',
        title: '点或拖时间轴换年代',
        body: '上排是中国、下排是域外，柱越高条目越多。按住游标左右拖，松手就跳到对应年代段。',
        tip: '滚动下方年表时，游标和右上角的年份会自动跟着走。'
      },
      {
        target: '#guide-cmp-pair',
        placement: 'top',
        title: '只看中外都有记载的段',
        body: '默认「全部年代段」；点「仅中外同段」只保留中国与域外同段都有条目的年代，再点「全部年代段」恢复。',
        tip: '搜索时以命中结果为准，这个开关暂不叠加。'
      }
    ]
  },

  /* 原「同一时刻 · 选人物 / 选年份」选择页：不再是默认入口，只从旧链接或结果页
     「换一个」回到这里。enabled:false → 不进「我的 → 使用指南」列表，但首次进入
     该页仍会自动弹出这套 4 步。 */
  parallelSelect: {
    name: '中外对照 · 选锚点',
    type: 'layer',
    page: 'parallel-pkg/pages/parallel/parallel',
    enabled: false,
    steps: [
      {
        target: '#guide-pp-tabs',
        scrollIntoView: '#guide-pp-tabs',
        placement: 'bottom',
        title: '先定一个时间锚点',
        body: '「选人物」用某人的出生之年当锚点，「选年份」直接指定一年。两种选法落到同一年：左边中土编年，右边同期世界。'
      },
      {
        /* 「选年份」是点分段才出现、由页面 anchorTab 切换的态，遮罩会拦住这次点击，
           用户没法在引导里真切过去 → 用 mockPanel 静态复刻年份态（不挖这一块的孔）。 */
        target: '#guide-pp-tabs',
        scrollIntoView: '#guide-pp-tabs',
        placement: 'bottom',
        mockPanel: { type: 'year' },
        title: '选年份：写一年，或点快捷年份',
        body: '切到「选年份」，在纪年框写 1101 或 前221，点「对照」进入；快捷年份也能直接点。'
      },
      {
        target: '#guide-pp-search',
        scrollIntoView: '#guide-pp-search',
        placement: 'bottom',
        title: '输入人名，从联想里点选',
        body: '输入中国或域外人物姓名，如「李白」「哥伦布」；下拉出现检索结果后点选才算选中，域外人物只落右列。',
        tip: '生年不详会改用卒年；生卒都没有时，会提示改用年份。'
      },
      {
        target: '#guide-pp-hot',
        scrollIntoView: '#guide-pp-hot',
        placement: 'bottom',
        title: '不确定从谁开始，点热门方牌',
        body: '六张方牌各是一位常见人物，点一张即用其出生年为锚点，直接进入结果。',
        tip: '热门只是快捷入口，进去后随时能换人、换年份。'
      }
    ]
  },

  parallelResult: {
    name: '中外对照 · 结果页',
    type: 'layer',
    page: 'parallel-pkg/pages/parallel/parallel',
    enabled: true,
    steps: [
      {
        target: '#guide-pp-view',
        scrollIntoView: '#guide-pp-view',
        placement: 'bottom',
        title: '双流看并行，地图看分布',
        body: '默认「平行双流」：左列中土编年，右列域外同期人物与事件。点「世界地图」换成地理分布，点圆点或标签看该文明的同期记载。',
        tip: '域外默认取锚点前后 25 年；选人物时改用其生卒区间，锚点卡上会注明容差口径。'
      },
      {
        target: '#guide-pp-reselect',
        scrollIntoView: '#guide-pp-view',
        placement: 'bottom',
        title: '换锚点，或长按看简介',
        body: '右上「换一个」回到选择区重新定锚点；长按任意卡片，弹出人物或事件的简介。',
        tip: '页面底部还有「换个年份再看」，与「换一个」是同一个入口。'
      },
      {
        /* 入口卡只在该年有可定年的人物记载时才渲染（whoNums.length），
           所以标 optional：没有这张卡就直接跳过，不把用户卡在空遮罩上。 */
        target: '#guide-pp-who',
        scrollIntoView: '#guide-pp-who',
        placement: 'bottom',
        optional: true,
        title: '点进去，看这一年谁在场',
        body: '锚点卡下面这张小卡是「这一年，谁在场」的入口：把这一年出生、有记载、离世的人分成三幕，点进去可逐幕看名单。',
        tip: '只有该年有可定年的人物记载时才出现这张卡；没有它就换一个年份再看。'
      }
    ]
  },

  /* 「这一年，谁在场」二级页：从结果页入口卡进入，本页单独一套 2 步。
     数据来自 /api/timeline/:year，人物可能只有 6~8 人，某幕也可能整幕为空：
     两步都标 optional（收敛档为空 / 三幕区量不到时跳过），绝不空转。 */
  whoPresent: {
    name: '这一年，谁在场',
    type: 'layer',
    page: 'parallel-pkg/pages/who-present/who-present',
    enabled: true,
    steps: [
      {
        target: '#guide-wp-conv',
        scrollIntoView: '#guide-wp-conv',
        placement: 'bottom',
        optional: true,
        title: '先收敛到想看的人',
        body: '「在场」这一幕顶部的分档用来换视角：与要事相关看本年事件主角，按知名度看收录的精选人物，按身份看有职业记载的人。',
        tip: '某档本年没有对应数据就不出现；记载少的年份可能只剩「有记载」一档，那一步会自动跳过。'
      },
      {
        /* 三幕整块高度远超一屏，引导层对「不能完整落入视口」的目标不挖孔，
           所以指向同一区域的紧凑计数条（登场 / 在场 / 离场 三格），既能指认也不出兜底空卡。 */
        target: '#guide-wp-acts-hd',
        scrollIntoView: '#guide-wp-acts-hd',
        placement: 'bottom',
        optional: true,
        title: '三幕：登场、在场、离场',
        body: '同一年按记载分三幕：登场是这年出生的人，在场是这年有任职、登第或要事记载的人，离场是这年去世的人。',
        tip: '每幕默认只列 6~8 人，点「展开」到这年全部前 40 条；某幕无人时显示空提示，不占位。'
      }
    ]
  },

  officialAlias: {
    name: '职官别名',
    type: 'bubble',
    page: 'pages/official-alias/official-alias',
    enabled: true,
    steps: [
      {
        target: '#guide-hot',
        placement: 'bottom',
        title: '先用一个热词试一条',
        body: '点「太傅」直接看结果；只记得职能，就切上面的「类别」按类逛。',
        tip: '结果页的「筛选 ▾」能按朝代和范围收窄。'
      }
    ]
  },

  /* ============ 第二批：本轮接入大事年表 / 年份查询 ============ */

  timeline: {
    name: '大事年表',
    type: 'layer',
    page: 'timeline-pkg/pages/timeline/timeline',
    enabled: true,
    steps: [
      {
        target: '#guide-timeline-note',
        placement: 'bottom',
        title: '这一页怎么读',
        body: '一条只占一行：年份 + 提要。点按展开才给正文——纪事给概要，战役给战果、兵力与背景。',
        tip: '再点一次收起，列表不会跳位置。'
      },
      {
        target: '#guide-timeline-search',
        placement: 'bottom',
        title: '先搜年份、人物或事件',
        body: '直接写 1937，公元前写「前221」；也可输入事件名（如「赤壁」）。命中后列表只留相关条目。',
        tip: '搜不到时改用更短的词，别带「年」「之战」这类尾字。'
      },
      {
        target: '#guide-timeline-rulerbar',
        placement: 'bottom',
        title: '年代尺和筛选都在这行',
        body: '点「展开年代尺」按年份横向滑动换年代；右侧「筛选」可按分类、只看里程碑，或直接跳到某一年。',
        tip: '年代尺只影响视线范围，不会清掉搜索词。'
      }
    ]
  },

  calendar: {
    name: '年份查询',
    type: 'layer',
    page: 'timeline-pkg/pages/calendar/calendar',
    enabled: true,
    steps: [
      {
        target: '#guide-cal-search',
        placement: 'bottom',
        title: '先写一个年份或年号',
        body: '数字（1279）、公元前（前200）、年号加年数（祥兴二年）都认；只写朝代名也行，会先给开国、鼎盛、亡国三个参照年。',
        tip: '带「前」是公元前，别漏字。'
      },
      {
        targets: ['#guide-cal-card-1', '#guide-cal-card-3'],
        placement: 'top',
        title: '没结果时，看这三张卡',
        body: '01 公元数字、02 年号 + 年数、03 朝代名；卡片里的示例点一下就带入查询。',
        tip: '只写年号名会列出同名候选，需要再补第几年。'
      },
      {
        target: '#guide-cal-legend',
        placement: 'top',
        title: '一次算出七种纪年',
        body: '结果给年号纪年、干支、公元、伊斯兰历、佛历、民国纪年与日本年号，可对照换算。',
        tip: '换算属工具性推算，史事年份仍以正史本纪为准。'
      }
    ]
  },

  detail: {
    name: '人物详情',
    type: 'layer',
    /* 「我的 → 使用指南 → 重看」只带 page、不带参数，而详情页必须有 id 才能渲染；
       直接跳详情会落到「缺少参数」。改为回首页选人，从任意人物进入时再消费重看标记。 */
    page: 'pages/index/index',
    enabled: true,
    steps: [
      {
        target: '#guide-dock',
        placement: 'top',
        title: '一个人五个面',
        body: '底部从左到右是档案、年表、世系、关系、足迹：档案看生平与作品，年表按时间排事件，世系看上下几代，关系看交游，足迹看一生到过的地方。',
        tip: '世系、足迹是独立页面，点了会跳走；档案、年表、关系在本页内切换。'
      },
      {
        /* 关系页只有切到 pageTab==='relations' 才渲染，遮罩会拦住 dock 点击。
           用 pageState 让引导先替用户切过去，再量真实节点（不画复刻）。 */
        target: '#guide-rel-switch',
        pageState: 'relations',
        placement: 'bottom',
        title: '关系页能切图谱和列表',
        body: '默认「图谱」，点「列表」按分类逐条列出；两边都能点人物继续往下看。第一次进关系页会先出骨架，数据回来再填内容。'
      },
      {
        /* 双人生命线入口在年表顶部、时间轴之前；上滑会收起（max-height:0），
           pageState 切到年表时页面会先把它展开再测量。
           入口只在「精选 + 生卒都能算」时渲染，缺失时由 optional 直接跳过。 */
        target: '#guide-dual-entry',
        pageState: 'timeline',
        placement: 'bottom',
        optional: true,
        title: '把两个人放进同一条时间',
        body: '点这张卡再选一位生卒可算的人，年表会并成两条生命线，能看两人同在多少年、谁先走。',
        tip: '只有精选且生卒年都算得出的人物才有这条入口；上滑时它收起，回到顶部或往下滑就再出来。'
      },
      {
        /* 原锚点 #guide-lineage-filter 属于世系页，跨页永远量不到；
           改为本页年表首张卡片的阶段头。卡头仅在「有阶段或有年份区间」时渲染，
           缺失时由 optional 直接跳过，不把用户留在没有孔的遮罩里。 */
        target: '#guide-tl-hd',
        pageState: 'timeline',
        placement: 'bottom',
        optional: true,
        title: '年表按阶段分卡',
        body: '每张卡头是阶段序号、阶段名与起止年，下面按年份列事件；没有阶段信息的人物只写年份区间，连区间都算不出时卡头整行不显示。',
        tip: '这一步已替你切到「年表」，关掉引导后从底部「年表」可再回来。'
      }
    ]
  },

  dynasty: {
    name: '朝代时间轴',
    type: 'layer',
    page: 'pages/dynasty-timeline/dynasty-timeline',
    enabled: true,
    steps: [
      {
        target: '#guide-eras',
        placement: 'bottom',
        title: '八段分期，点了就跳',
        body: '这排从先秦排到晚清，点一段直接跳到该段；往下滚动时，高亮会跟着当前看到的段自动切换。',
        tip: '一行放不下就左右滑，滑的只是标签条，不改当前段。'
      },
      {
        target: '#sec-preqin',
        placement: 'bottom',
        title: '段头、朝代行、▸ 子项',
        body: '段头写这一段的名字、起止年与条数；一行一个朝代，右侧是起止年与时长；行末是 ▸ 的能展开子项，如周展开为西周、东周、春秋、战国。',
        tip: '展开只把子项铺在行下方，后面的段会跟着下移。'
      },
      {
        target: '#row-xia',
        placement: 'bottom',
        mockPanel: { type: 'sheet' },
        title: '点一行，弹朝代详情',
        body: '点夏、商这类行末为 › 的朝代，底部弹起半屏：起止年、都城、沿革简介都在里面，点右上「收起」关闭。'
      }
    ]
  },

  emperors: {
    name: '历代帝王',
    type: 'layer',
    page: 'pages/emperors/emperors',
    enabled: true,
    steps: [
      {
        target: '#guide-eras',
        placement: 'bottom',
        title: '六段时期，一点就跳',
        body: '顶部从先秦到元明清分六段，点一段落到该时期的第一朝；列表每段抬头写着起止年与帝王人数。',
        tip: '右上角「朝代」能一次列出全部朝代，点哪个跳哪个。'
      },
      {
        target: '.node',
        placement: 'bottom',
        title: '点一行，看这位帝王',
        body: '点帝王行弹半屏简介：生卒、在位与年号，下面一段生平；底部「查看完整人物档案」可进人物页看关系与年表。',
        tip: '十六国与五代十国先列政权，点政权名再展开该政权的帝王。'
      }
    ]
  },

  feedback: {
    name: '意见反馈',
    type: 'layer',
    page: 'account-pkg/pages/feedback/feedback',
    enabled: true,
    steps: [
      {
        target: '#guide-fb-tabs',
        placement: 'bottom',
        title: '提交与历史，两个页签',
        body: '左边写新反馈，右边看自己提过的记录与管理员回复；右边顶部还能按待处理、已回复、已解决筛。',
        tip: '未登录时这页只有登录入口，先回「我的」用账号密码登录。'
      },
      {
        target: '#guide-fb-type',
        placement: 'bottom',
        title: '类型决定后面的必填项',
        body: '默认「建议」，可选 BUG、内容、其他、注销账号；只有选「注销账号」时，联系方式才变成必填邮箱。',
        tip: '注销后收藏、足迹、站内信会一并删除，结果只发邮件，不能撤销。'
      },
      {
        targets: ['#guide-fb-content', '#guide-fb-contact'],
        placement: 'bottom',
        title: '内容必填，联系方式看类型',
        body: '内容至少 1 个字、最多 2000，右下角计数到 1800 变橙、2000 变红；联系方式平时选填，填手机号或带 @ 的邮箱。'
      },
      {
        targets: ['#guide-fb-image', '#guide-fb-submit'],
        scrollIntoView: '#guide-fb-image',
        placement: 'bottom',
        title: '截图选填，提交看结果',
        body: '截图最多 1 张、可以不传；点底部提交，成功会提示并清空表单，失败留在本页按提示改完再交。',
        tip: '图片上传失败会保留已选图，直接再点提交即可重试。'
      }
    ]
  },

  emailContact: {
    name: '邮件联系',
    type: 'layer',
    page: 'account-pkg/pages/email/email',
    enabled: true,
    steps: [
      {
        target: '#guide-em-mailbox',
        placement: 'bottom',
        title: '收件人只有两个可选',
        body: '点右侧 › 在邮箱一、邮箱二之间切；这里不显示真实地址，服务器按选择转投给对应站长。',
        tip: '未登录也能发，不需要先登录。'
      },
      {
        target: '#guide-em-subject',
        placement: 'bottom',
        title: '主题可以不填',
        body: '主题最多 120 字；留空时自动用「来自世慧屋的分享」，不会发出没有标题的邮件。'
      },
      {
        target: '#guide-em-body',
        placement: 'bottom',
        title: '内容必填，默认已填来源',
        body: '内容最多 2000 字，右下角实时计数；页面标题与官网链接会附在邮件末尾，不用自己补。',
        tip: '默认预填一行「（来自世慧屋小程序）」，整段删空后发送按钮会变灰。'
      },
      {
        target: '#guide-em-submit',
        placement: 'bottom',
        title: '内容不空才能发',
        body: '内容为空白或发送中时按钮是灰的；成功显示「已发送」，1.5 秒后自动返回；失败原因显示在按钮上方。',
        tip: '同一网络每小时最多 3 封，超了会显示失败原因，过一会儿再试。'
      }
    ]
  },

  lineage: {
    name: '世系',
    type: 'layer',
    /* 同理：世系页缺 id 直接显示「缺少人物参数」，重看入口回首页选人更稳 */
    page: 'pages/index/index',
    enabled: true,
    steps: [
      {
        /* 分支口径开关只在 matHiddenTotal > 0（确有母系可收）时渲染。
           optional：目标不存在（如母系为空、或页面不在直系主轴态）直接跳过该步，
           不会停在「遮罩压着页面、却没有一个孔」的状态。 */
        target: '#guide-ln-side',
        placement: 'bottom',
        optional: true,
        title: '父系 / 母系可以分开看',
        body: '默认「父系 + 母系」全显示；点这个开关切成「只看父系」，母系亲属收成一行并标出收起人数，再点一次放回。',
        tip: '只有这一代确有母系亲属时，这个开关才会出现。'
      },
      {
        /* 代次头在 upCols / downCols 循环内：只在第一代给 id，避免重复；
           页面不是直系主轴态（旁系 / 无世系）时目标不存在 → optional 跳过。 */
        target: '#guide-ln-col',
        placement: 'bottom',
        optional: true,
        title: '代次头点一下，收起整代',
        body: '每代开头是一行代次头：左侧圆点带 + / −，点整行收起或展开该代；人数按当前口径计算，已收起的母系不会重复计入。',
        tip: '点树上的名字可以换中心人物，上方「返回」回到上一位。'
      }
    ]
  },

  footprint: {
    name: '人物足迹',
    type: 'layer',
    page: 'footprint-pkg/pages/footprint/footprint',
    enabled: true,
    steps: [
      {
        /* 视图开关要求已选中人物、有站点、且未打开全部列表；不满足时 optional 跳过 */
        target: '#guide-fp-mode',
        placement: 'top',
        optional: true,
        title: '单卡跟随 / 全部展开',
        body: '「单卡跟随」同屏一张事件卡，跟着圆点逐站走；「全部展开」一次铺开所有站点，点任一站看该站事件。',
        tip: '未解锁时点「全部展开」会提示看一段视频；站点很少的人物整档免广告。'
      },
      {
        /* 时间轴条同样依赖人物与站点数据；无数据时 optional 跳过 */
        target: '#guide-fp-scrub',
        placement: 'top',
        optional: true,
        title: '时间轴：拖、跳、播放',
        body: '拖刻度尺或点任意位置换站，‹ › 逐站前后走，右侧播放键自动回放；「全部 N 卡」打开纵向卡片列表。',
        tip: '自动回放免费连续前 2 站，之后由解锁条接管。'
      }
    ]
  },

  topics: {
    name: '专题站点',
    type: 'bubble',
    page: 'topic-pkg/pages/treaty/treaty',
    enabled: false,
    steps: [
      {
        target: '#guide-tabs',
        placement: 'bottom',
        title: '顶部是主轴',
        body: '时期 / 阶段切换会换整段内容；点任意条目展开档案，再点一次收起。'
      }
    ]
  }
};

/** 抽屉展示顺序（只列已接入的） */
const ENABLED_KEYS = [
  'global',
  'sixdeg',
  'officialAlias',
  'timeline',
  'calendar',
  'dynasty',
  'emperors',
  'feedback',
  'emailContact',
  'parallel',
  'parallelResult',
  'whoPresent',
  'detail',
  'lineage',
  'footprint'
];

function getGuide(key) {
  return GUIDES[key] || null;
}

function getEnabledKeys() {
  return ENABLED_KEYS.slice();
}

module.exports = {
  GUIDES,
  ENABLED_KEYS,
  getGuide,
  getEnabledKeys
};
