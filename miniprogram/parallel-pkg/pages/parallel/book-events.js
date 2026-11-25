/* 平行时空 · 《中外历史对比年表》数据（前4500 — 1949）
 * 来源：陈会颖《中外历史对比年表》，中华书局，2016 年版。
 * 本文件由 EPUB 原文逐条抽取，未补写书外内容；字段沿用现有 world-events 的
 * year / region / title / desc，并新增 country、来源页码与中外同年块结构。
 * 用法：小程序侧 require('./book-events') 取 module.exports；
 * 设计页 <script src="book-events.js"></script> 后读取 window.PARALLEL_BOOK_DATA。
 */
var PARALLEL_BOOK_DATA = {
 "meta": {
  "book": "中外历史对比年表",
  "author": "陈会颖",
  "publisher": "中华书局",
  "edition": "2016 年版（EPUB）",
  "rangeLabel": "前4500 — 1949",
  "yearFrom": -4500,
  "yearTo": 1949,
  "pageFrom": 1,
  "pageTo": 176,
  "anchors": 173,
  "blocks": 173,
  "chinaCount": 920,
  "worldCount": 929,
  "byRegion": {
   "europe": 583,
   "americas": 107,
   "arabia": 90,
   "east-asia": 55,
   "south-asia": 43,
   "africa": 27,
   "world": 16,
   "central-asia": 4,
   "sea": 4
  },
  "byCountry": {
   "英格兰": 111,
   "美洲": 107,
   "欧洲": 96,
   "法兰西": 94,
   "德意志": 90,
   "罗马": 63,
   "日本": 46,
   "印度": 43,
   "俄国": 40,
   "希腊": 33,
   "奥斯曼": 30,
   "埃及": 25,
   "基督教会": 24,
   "阿拉伯": 23,
   "波斯": 20,
   "国际组织": 16,
   "法兰克": 11,
   "罗斯": 9,
   "北欧": 9,
   "两河流域": 8,
   "朝鲜半岛": 7,
   "以色列": 5,
   "中亚": 4,
   "东南亚": 4,
   "十字军": 4,
   "英国": 3,
   "越南": 2,
   "非洲": 2
  },
  "note": "按原书「年代 / 中国 / 外国」三栏逐条抽取；页码为 EPUB 分页序号，可回查原书。"
 },
 "blocks": [
  {
   "id": "b1",
   "year": -4500,
   "yearLabel": "前4500",
   "pages": [
    1
   ],
   "china": [],
   "world": [
    {
     "year": -4500,
     "yearEnd": -3100,
     "yearLabel": "前4500",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及"
     ],
     "title": "尼罗河流域王权开始出现",
     "desc": "约前4500—前3100年，尼罗河流域王权开始出现，区域性文化逐渐趋向统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 1,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b2",
   "year": -3500,
   "yearLabel": "前3500",
   "pages": [
    1
   ],
   "china": [
    {
     "year": -3500,
     "yearEnd": -2100,
     "yearLabel": "前3500",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "五帝（黄帝、颛顼、帝喾、尧、舜）时代，奠定了中华五千年文明的基础",
     "desc": "约前3500—前2100年，五帝（黄帝、颛顼、帝喾、尧、舜）时代，奠定了中华五千年文明的基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 1,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": -3500,
     "yearEnd": null,
     "yearLabel": "前3500",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国人的祖先开始知道了铜的冶铸方法",
     "desc": "约前3500年，中国人的祖先开始知道了铜的冶铸方法，中国历史发展进入铜石并用时代。",
     "src": {
      "book": "中外历史对比年表",
      "page": 1,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -3500,
     "yearEnd": -3000,
     "yearLabel": "前3500",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "两河流域",
     "countries": [
      "两河流域"
     ],
     "title": "两河流域城邦形成时期",
     "desc": "约前3500—前3000年，两河流域城邦形成时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 1,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b3",
   "year": -3100,
   "yearLabel": "前3100",
   "pages": [
    1
   ],
   "china": [],
   "world": [
    {
     "year": -3100,
     "yearEnd": null,
     "yearLabel": "前3100",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及"
     ],
     "title": "古埃及国王美尼斯创建了第一王朝",
     "desc": "约前3100年，古埃及国王美尼斯创建了第一王朝，统一国家形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 1,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b4",
   "year": -3000,
   "yearLabel": "前3000",
   "pages": [
    1
   ],
   "china": [],
   "world": [
    {
     "year": -3000,
     "yearEnd": -1800,
     "yearLabel": "前3000",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "印度河流域出现城市国家",
     "desc": "约前3000—前1800年，印度河流域出现城市国家，使用铜器，文字产生。",
     "src": {
      "book": "中外历史对比年表",
      "page": 1,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": -3000,
     "yearEnd": null,
     "yearLabel": "前3000",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "爱琴海中最大的克里特岛",
     "desc": "约前3000年，爱琴海中最大的克里特岛，已向青铜文化过渡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 1,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b5",
   "year": -2900,
   "yearLabel": "前2900",
   "pages": [
    1
   ],
   "china": [],
   "world": [
    {
     "year": -2900,
     "yearEnd": -2300,
     "yearLabel": "前2900",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "两河流域",
     "countries": [
      "两河流域"
     ],
     "title": "两河流域南端的苏美尔地区城邦林立",
     "desc": "约前2900—前2300年，两河流域南端的苏美尔地区城邦林立，互相争霸。",
     "src": {
      "book": "中外历史对比年表",
      "page": 1,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": -2686,
     "yearEnd": -2181,
     "yearLabel": "前2686",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及"
     ],
     "title": "埃及古王国时期，开始修建金字塔",
     "desc": "约前2686—前2181年，埃及古王国时期，开始修建金字塔，又称“金字塔时期”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 1,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": -2371,
     "yearEnd": -2191,
     "yearLabel": "前2371",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "两河流域",
     "countries": [
      "两河流域"
     ],
     "title": "阿卡德王国",
     "desc": "约前2371—前2191年，阿卡德王国，两河流域第一个统一王朝。",
     "src": {
      "book": "中外历史对比年表",
      "page": 1,
      "row": 9,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b6",
   "year": -2100,
   "yearLabel": "前2100",
   "pages": [
    2
   ],
   "china": [
    {
     "year": -2100,
     "yearEnd": null,
     "yearLabel": "前2100",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "禹创建夏王朝",
     "desc": "约前2100年，禹创建夏王朝，这是中国历史上第一个统一的王朝。",
     "src": {
      "book": "中外历史对比年表",
      "page": 2,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": -2070,
     "yearEnd": null,
     "yearLabel": "前2070",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "启（禹之子）得帝位",
     "desc": "约前2070年，启（禹之子）得帝位，废除禅让制，建立王（皇）位传子的世袭制度，这一制度在中国历史上延续数千年之久。",
     "src": {
      "book": "中外历史对比年表",
      "page": 2,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": -1900,
     "yearEnd": null,
     "yearLabel": "前1900",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "太康失国",
     "desc": "约前1900年，太康失国，后羿“因夏民以代夏政”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 2,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": -1850,
     "yearEnd": null,
     "yearLabel": "前1850",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "少康复国",
     "desc": "约前1850年，少康复国，施行德政，发展国力，国势逐渐强大，出现“少康中兴”，夏王朝进入鼎盛时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 2,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": -2100,
     "yearEnd": null,
     "yearLabel": "前2100",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "夏朝出现货币，青铜制造业发展",
     "desc": "夏朝时期，已经出现货币，青铜制造业有较大发展。",
     "src": {
      "book": "中外历史对比年表",
      "page": 2,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -2000,
     "yearEnd": -1400,
     "yearLabel": "前2000",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "克里特文明",
     "desc": "约前2000—前1400年，克里特文明，克里特岛上的米诺斯人建立起统一王朝，以克诺索斯为首都，有宏伟宫殿建筑，使用线形文字。",
     "src": {
      "book": "中外历史对比年表",
      "page": 2,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": -1894,
     "yearEnd": -1595,
     "yearLabel": "前1894",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "两河流域",
     "countries": [
      "两河流域",
      "波斯",
      "美洲"
     ],
     "title": "古巴比伦王国",
     "desc": "约前1894—前1595年，古巴比伦王国，统治区域从波斯湾到地中海。",
     "src": {
      "book": "中外历史对比年表",
      "page": 2,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b7",
   "year": -1600,
   "yearLabel": "前1600",
   "pages": [
    2
   ],
   "china": [
    {
     "year": -1600,
     "yearEnd": null,
     "yearLabel": "前1600",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "商汤灭夏",
     "desc": "约前1600年，商汤灭夏，建立中国历史上第二个统一王朝。",
     "src": {
      "book": "中外历史对比年表",
      "page": 2,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -1550,
     "yearEnd": -1069,
     "yearLabel": "前1550",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及"
     ],
     "title": "埃及新王国时期，致力于对外扩张",
     "desc": "前1550—前1069年，埃及新王国时期，致力于对外扩张，成为近东世界的强大帝国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 2,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b8",
   "year": -1500,
   "yearLabel": "前1500",
   "pages": [
    2,
    3
   ],
   "china": [
    {
     "year": -1456,
     "yearEnd": null,
     "yearLabel": "前1456",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "河甲继位",
     "desc": "约前1456年，河甲继位，迁都于相，殷商衰落。",
     "src": {
      "book": "中外历史对比年表",
      "page": 2,
      "row": 10,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -1500,
     "yearEnd": -600,
     "yearLabel": "前1500",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "古印度吠陀时代，国家大量出现",
     "desc": "约前1500—前600年，古印度吠陀时代，国家大量出现，婆罗门教和种姓制度产生。",
     "src": {
      "book": "中外历史对比年表",
      "page": 2,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": -1500,
     "yearEnd": null,
     "yearLabel": "前1500",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "迈锡尼人取代米诺斯人统治地中海",
     "desc": "约前1500年，迈锡尼人取代米诺斯人统治地中海，迈锡尼取代克里特成为爱琴文明的中心。",
     "src": {
      "book": "中外历史对比年表",
      "page": 2,
      "row": 10,
      "col": "外国"
     }
    },
    {
     "year": -1400,
     "yearEnd": -1200,
     "yearLabel": "前1400",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "迈锡尼文明的鼎盛时期，开始使用青铜器",
     "desc": "约前1400—前1200年，迈锡尼文明的鼎盛时期，开始使用青铜器，有了货币、文字。",
     "src": {
      "book": "中外历史对比年表",
      "page": 3,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b9",
   "year": -1300,
   "yearLabel": "前1300",
   "pages": [
    3
   ],
   "china": [
    {
     "year": -1300,
     "yearEnd": null,
     "yearLabel": "前1300",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "盘庚迁殷",
     "desc": "约前1300年，盘庚迁殷，加强商王权威，商王朝由衰落走向中兴。",
     "src": {
      "book": "中外历史对比年表",
      "page": 3,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": []
  },
  {
   "id": "b10",
   "year": -1200,
   "yearLabel": "前1200",
   "pages": [
    3
   ],
   "china": [
    {
     "year": -1200,
     "yearEnd": null,
     "yearLabel": "前1200",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "商朝时期，已有较完备的成文法典、较完整的历法、成熟的文字",
     "desc": "商朝时期，已有较完备的成文法典、较完整的历法、成熟的文字。",
     "src": {
      "book": "中外历史对比年表",
      "page": 3,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": -1046,
     "yearEnd": null,
     "yearLabel": "前1046",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "武王伐纣",
     "desc": "前1046年，武王伐纣，牧野之战商纣王兵败自杀。周朝建立，定都镐京，史称“西周”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 3,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": -1043,
     "yearEnd": null,
     "yearLabel": "前1043",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "周公摄政",
     "desc": "前1043年，周公摄政，维护了周初王朝的稳定。",
     "src": {
      "book": "中外历史对比年表",
      "page": 3,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -1200,
     "yearEnd": null,
     "yearLabel": "前1200",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "特洛伊战争",
     "desc": "约前1200年，特洛伊战争，希腊联军与小亚细亚的特洛伊城进行的一场长达10年的战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 3,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": -1100,
     "yearEnd": -800,
     "yearLabel": "前1100",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "黑暗时代，希腊史上的文化衰退时期",
     "desc": "约前1100—前800年，黑暗时代，希腊史上的文化衰退时期，反映其历史情况的文献主要是《荷马史诗》，故又称“荷马时代”。此时冶铁技术传入希腊。",
     "src": {
      "book": "中外历史对比年表",
      "page": 3,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b11",
   "year": -1000,
   "yearLabel": "前1000",
   "pages": [
    3
   ],
   "china": [],
   "world": [
    {
     "year": -1000,
     "yearEnd": -612,
     "yearLabel": "前1000",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "两河流域",
     "countries": [
      "两河流域"
     ],
     "title": "亚述帝国",
     "desc": "约前1000—前612年，亚述帝国，地跨西亚北非，是铁器时代的第一个帝国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 3,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b12",
   "year": -800,
   "yearLabel": "前800",
   "pages": [
    3
   ],
   "china": [
    {
     "year": -841,
     "yearEnd": null,
     "yearLabel": "前841",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国人暴动",
     "desc": "前841年，国人暴动，厉王被逐，周召共和，中国历史开始有确切纪年。",
     "src": {
      "book": "中外历史对比年表",
      "page": 3,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": -800,
     "yearEnd": null,
     "yearLabel": "前800",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "周朝时期，确立分封制度、宗法制度、礼乐制度",
     "desc": "周朝时期，确立分封制度、宗法制度、礼乐制度；形成中国古代哲学的两个基本观念——阴阳说和五行说；中国上古时期最重要的卜筮之书《周易》成书。",
     "src": {
      "book": "中外历史对比年表",
      "page": 3,
      "row": 10,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -800,
     "yearEnd": -750,
     "yearLabel": "前800",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "希腊城邦形成时期，从小亚到希腊半岛",
     "desc": "约前800—前750年，希腊城邦形成时期。从小亚到希腊半岛，兴起了大小几百座城邦。",
     "src": {
      "book": "中外历史对比年表",
      "page": 3,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": -776,
     "yearEnd": null,
     "yearLabel": "前776",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "第一届奥林匹克运动会举行",
     "desc": "前776年，第一届奥林匹克运动会举行，希腊各邦有了共同的节日和纪年。",
     "src": {
      "book": "中外历史对比年表",
      "page": 3,
      "row": 10,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b13",
   "year": -770,
   "yearLabel": "前770",
   "pages": [
    4
   ],
   "china": [
    {
     "year": -770,
     "yearEnd": null,
     "yearLabel": "前770",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "周平王东迁都城至洛邑",
     "desc": "前770年，周平王东迁都城至洛邑，东周历史开始，分为春秋和战国两个阶段。",
     "src": {
      "book": "中外历史对比年表",
      "page": 4,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": -770,
     "yearEnd": null,
     "yearLabel": "前770",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "铁器开始出现",
     "desc": "约前770年，铁器开始出现。",
     "src": {
      "book": "中外历史对比年表",
      "page": 4,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": -753,
     "yearEnd": null,
     "yearLabel": "前753",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "秦国开始设史官记事",
     "desc": "前753年，秦国开始设史官记事。",
     "src": {
      "book": "中外历史对比年表",
      "page": 4,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -770,
     "yearEnd": null,
     "yearLabel": "前770",
     "yearKind": "anchor",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "两河流域",
     "countries": [
      "两河流域",
      "希腊"
     ],
     "title": "城邦形成时期，希腊人袭用腓尼基字母",
     "desc": "城邦形成时期，希腊人袭用腓尼基字母，创造了自己的文字；铁制工具普遍使用。",
     "src": {
      "book": "中外历史对比年表",
      "page": 4,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": -753,
     "yearEnd": -510,
     "yearLabel": "前753",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "古罗马王政时代，后期国家萌芽产生",
     "desc": "前753—前510年，古罗马王政时代，后期国家萌芽产生。",
     "src": {
      "book": "中外历史对比年表",
      "page": 4,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b14",
   "year": -720,
   "yearLabel": "前720",
   "pages": [
    4,
    5
   ],
   "china": [
    {
     "year": -722,
     "yearEnd": null,
     "yearLabel": "前722",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "鲁国编年体史书《春秋》的记事上限",
     "desc": "前722年，鲁国编年体史书《春秋》的记事上限。",
     "src": {
      "book": "中外历史对比年表",
      "page": 4,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": -707,
     "yearEnd": null,
     "yearLabel": "前707",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "繻葛之战",
     "desc": "前707年，繻葛之战，郑庄公对抗周王室军队，揭开春秋时期诸侯争霸的序幕。",
     "src": {
      "book": "中外历史对比年表",
      "page": 4,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": -679,
     "yearEnd": -465,
     "yearLabel": "前679",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "齐桓公等相继建立霸业",
     "desc": "前679—前465年，齐桓公、宋襄公、晋文公、秦穆公、楚庄王、吴王阖闾、越王勾践相继建立霸业。",
     "src": {
      "book": "中外历史对比年表",
      "page": 4,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": -613,
     "yearEnd": null,
     "yearLabel": "前613",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "世界上第一次对哈雷彗星的正式记录",
     "desc": "前613年，世界上第一次对哈雷彗星的正式记录，见于《春秋》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 4,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": -550,
     "yearEnd": null,
     "yearLabel": "前6世纪中",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "老子创立道家学派",
     "desc": "约前6世纪中，老子，道家学派创始人，著有《道德经》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 4,
      "row": 10,
      "col": "中国"
     }
    },
    {
     "year": -551,
     "yearEnd": -479,
     "yearLabel": "前551",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孔子",
     "desc": "前551—前479年，孔子，儒家学派创始人，其言论辑为《论语》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 5,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": -547,
     "yearEnd": -485,
     "yearLabel": "前547",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙子",
     "desc": "约前547—前485年，孙子，兵家始祖，所著《孙子兵法》是世界上最早的兵书。",
     "src": {
      "book": "中外历史对比年表",
      "page": 5,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -750,
     "yearEnd": -550,
     "yearLabel": "前750",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "希腊城邦大规模殖民运动",
     "desc": "约前750—前550年，希腊城邦大规模殖民运动，组织部分居民迁移到海外，建立新的城邦。",
     "src": {
      "book": "中外历史对比年表",
      "page": 4,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": -624,
     "yearEnd": -547,
     "yearLabel": "前624",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "泰勒斯",
     "desc": "约前624—前547年，泰勒斯，第一位古希腊哲学家，认为万物起源于水，打破了自古相传的神造世界的迷信。",
     "src": {
      "book": "中外历史对比年表",
      "page": 4,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": -594,
     "yearEnd": null,
     "yearLabel": "前594",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "雅典梭伦改革",
     "desc": "前594年，雅典梭伦改革，把雅典引上了建立奴隶制民主政治和发展奴隶制工商业的道路。",
     "src": {
      "book": "中外历史对比年表",
      "page": 4,
      "row": 10,
      "col": "外国"
     }
    },
    {
     "year": -582,
     "yearEnd": -500,
     "yearLabel": "前582",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "毕达哥拉斯",
     "desc": "前582—前500年，毕达哥拉斯，古希腊数学家，提出了几何学上的“毕达哥拉斯定理”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 5,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": -558,
     "yearEnd": -330,
     "yearLabel": "前558",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "希腊"
     ],
     "title": "波斯帝国",
     "desc": "前558—前330年，波斯帝国，古代第一个地跨欧亚非的大帝国，后为亚历山大所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 5,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": -509,
     "yearEnd": null,
     "yearLabel": "前509",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马废除王政",
     "desc": "前509年，罗马废除王政，建立共和国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 5,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b15",
   "year": -500,
   "yearLabel": "前500",
   "pages": [
    5
   ],
   "china": [
    {
     "year": -500,
     "yearEnd": null,
     "yearLabel": "前500",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "春秋时期土地国有制瓦解，铁器牛耕出现",
     "desc": "春秋时期，土地国有制度逐渐瓦解，私有制的观念开始形成；铁制农具开始使用，牛耕出现；商业发展，金属铸币大量出现。",
     "src": {
      "book": "中外历史对比年表",
      "page": 5,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": -494,
     "yearEnd": null,
     "yearLabel": "前494",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "吴王夫差大败越国军队于夫椒",
     "desc": "前494年，吴王夫差大败越国军队于夫椒，越王勾践称臣归附。",
     "src": {
      "book": "中外历史对比年表",
      "page": 5,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -500,
     "yearEnd": -300,
     "yearLabel": "前500",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "印度列国时代，早期佛教产生",
     "desc": "约前500—前300年，印度列国时代，早期佛教产生。",
     "src": {
      "book": "中外历史对比年表",
      "page": 5,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": -492,
     "yearEnd": -449,
     "yearLabel": "前492",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "希波战争",
     "desc": "前492—前449年，希波战争，以希腊胜利告终。此后，世界文明发展格局逐渐形成东西方并立共存之势。",
     "src": {
      "book": "中外历史对比年表",
      "page": 5,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b16",
   "year": -490,
   "yearLabel": "前490",
   "pages": [
    5,
    6
   ],
   "china": [
    {
     "year": -486,
     "yearEnd": null,
     "yearLabel": "前486",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "吴国开挖邗沟",
     "desc": "前486年，吴国开挖邗沟，连接江淮水运。这是我国最早的南北运河，是京杭大运河的开端。",
     "src": {
      "book": "中外历史对比年表",
      "page": 5,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": -473,
     "yearEnd": null,
     "yearLabel": "前473",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "越国大举伐吴",
     "desc": "前473年，越国大举伐吴，夫差自杀，吴国灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 6,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": -445,
     "yearEnd": null,
     "yearLabel": "前445",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李悝在魏国变法",
     "desc": "前445年，李悝在魏国变法，颁布《法经》，这是中国第一部系统化的国家法典。",
     "src": {
      "book": "中外历史对比年表",
      "page": 6,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -490,
     "yearEnd": null,
     "yearLabel": "前490",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "希腊"
     ],
     "title": "马拉松战役",
     "desc": "前490年，马拉松战役，雅典人以弱胜强取得重大胜利，破除波斯人不可战胜的神话。",
     "src": {
      "book": "中外历史对比年表",
      "page": 5,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": -484,
     "yearEnd": -425,
     "yearLabel": "前484",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "希罗多德",
     "desc": "前484—前425年，希罗多德，西方“史学之父”，著《历史》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 5,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": -480,
     "yearEnd": null,
     "yearLabel": "前480",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "希腊"
     ],
     "title": "温泉关战役",
     "desc": "前480年，温泉关战役，波斯陆军主力与希腊人首战，守关希腊联军全部英勇牺牲。",
     "src": {
      "book": "中外历史对比年表",
      "page": 6,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": -469,
     "yearEnd": -399,
     "yearLabel": "前469",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "苏格拉底",
     "desc": "前469—前399年，苏格拉底，古希腊哲学家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 6,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": -460,
     "yearEnd": -400,
     "yearLabel": "前460",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "修昔底德",
     "desc": "前460—前400年，修昔底德，古希腊史学家，著《伯罗奔尼撒战争史》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 6,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": -460,
     "yearEnd": -377,
     "yearLabel": "前460",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "希波格拉底",
     "desc": "前460—前377年，希波格拉底，古希腊医学家，有“医学之父”的美誉，制定了著名的“希波格拉底誓言”，至今仍为西方医学界尊奉。",
     "src": {
      "book": "中外历史对比年表",
      "page": 6,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": -443,
     "yearEnd": -428,
     "yearLabel": "前443",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "伯里克利执政时期，雅典民主政治和社会文明臻于鼎盛",
     "desc": "前443—前428年，伯里克利执政时期，雅典民主政治和社会文明臻于鼎盛，史称“伯里克利时代”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 6,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b17",
   "year": -430,
   "yearLabel": "前430",
   "pages": [
    6
   ],
   "china": [
    {
     "year": -386,
     "yearEnd": null,
     "yearLabel": "前386",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "战国七雄（齐、楚、燕、韩、赵、魏、秦）局面形成",
     "desc": "前386年，战国七雄（齐、楚、燕、韩、赵、魏、秦）局面形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 6,
      "row": 10,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -431,
     "yearEnd": -404,
     "yearLabel": "前431",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "伯罗奔尼撒战争",
     "desc": "前431—前404年，伯罗奔尼撒战争，希腊人之间的内战，雅典战败，此后希腊历史进入城邦危机阶段，希腊古典文明走向衰落。",
     "src": {
      "book": "中外历史对比年表",
      "page": 6,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": -428,
     "yearEnd": -348,
     "yearLabel": "前428",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "柏拉图",
     "desc": "约前428—前348年，柏拉图，古希腊哲学家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 6,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": -384,
     "yearEnd": -322,
     "yearLabel": "前384",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "亚里士多德",
     "desc": "前384—前322年，亚里士多德，古希腊哲学家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 6,
      "row": 11,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b18",
   "year": -385,
   "yearLabel": "前385",
   "pages": [
    7
   ],
   "china": [
    {
     "year": -385,
     "yearEnd": -305,
     "yearLabel": "前385",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孟子",
     "desc": "约前385—前305年，孟子，是继孔子之后的又一儒家代表人物，与孔子并称“孔孟”，他与弟子们一起著有《孟子》七篇。",
     "src": {
      "book": "中外历史对比年表",
      "page": 7,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": -365,
     "yearEnd": -290,
     "yearLabel": "前365",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "庄子",
     "desc": "约前365—前290年，庄子，是继老子之后的又一道家代表人物，著有《庄子》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 7,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": -356,
     "yearEnd": null,
     "yearLabel": "前356",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "前356、前350年",
     "desc": "前356、前350年，商鞅两次变法，秦国由此逐渐强大。",
     "src": {
      "book": "中外历史对比年表",
      "page": 7,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": -334,
     "yearEnd": null,
     "yearLabel": "前334",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "魏惠王与齐威王会于徐州",
     "desc": "前334年，魏惠王与齐威王会于徐州，相互尊称对方为王，史称“徐州相王”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 7,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -359,
     "yearEnd": -336,
     "yearLabel": "前359",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "腓力二世统治时期，马其顿王国成为希腊最强大的国家",
     "desc": "前359—前336年，腓力二世统治时期，马其顿王国成为希腊最强大的国家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 7,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": -338,
     "yearEnd": null,
     "yearLabel": "前338",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "马其顿军队击败希腊联军",
     "desc": "前338年，马其顿军队击败希腊联军，希腊城邦丧失政治独立，落入马其顿控制之下。",
     "src": {
      "book": "中外历史对比年表",
      "page": 7,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": -334,
     "yearEnd": -325,
     "yearLabel": "前334",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "亚历山大东征",
     "desc": "前334—前325年，亚历山大东征，建立跨欧亚非三洲的帝国，开创东西方文化交流新时代。",
     "src": {
      "book": "中外历史对比年表",
      "page": 7,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b19",
   "year": -330,
   "yearLabel": "前330",
   "pages": [
    7
   ],
   "china": [
    {
     "year": -318,
     "yearEnd": null,
     "yearLabel": "前318",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "魏国联合齐、楚、燕、赵、韩合纵攻秦",
     "desc": "前318年，魏国联合齐、楚、燕、赵、韩合纵攻秦，至函谷关失利而归。",
     "src": {
      "book": "中外历史对比年表",
      "page": 7,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": -313,
     "yearEnd": -238,
     "yearLabel": "前313",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "荀子",
     "desc": "前313—前238年，荀子，战国末期重要的儒家代表人物，著有《荀子》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 7,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -332,
     "yearEnd": null,
     "yearLabel": "前332",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "希腊"
     ],
     "title": "亚历山大进军埃及",
     "desc": "前332年，亚历山大进军埃及，“法老埃及”3000多年的历史结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 7,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b20",
   "year": -310,
   "yearLabel": "前310",
   "pages": [
    7,
    8
   ],
   "china": [],
   "world": [
    {
     "year": -310,
     "yearEnd": -230,
     "yearLabel": "前310",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "欧几里得",
     "desc": "约前310—前230年，欧几里得，古希腊数学家，其著作《几何原本》到近代仍作为教科书使用。",
     "src": {
      "book": "中外历史对比年表",
      "page": 7,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": -305,
     "yearEnd": -64,
     "yearLabel": "前305",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊",
      "罗马"
     ],
     "title": "塞琉古王国",
     "desc": "前305—前64年，塞琉古王国，中国史书称“条支”，中心地区是叙利亚，故又称“叙利亚王国”，亚历山大部将塞琉古建立，为罗马将领庞培所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 7,
      "row": 10,
      "col": "外国"
     }
    },
    {
     "year": -305,
     "yearEnd": -30,
     "yearLabel": "前305",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "希腊"
     ],
     "title": "托勒密埃及王国",
     "desc": "前305—前30年，托勒密埃及王国，亚历山大部将托勒密建立，以希腊—马其顿殖民者为主要统治力量。",
     "src": {
      "book": "中外历史对比年表",
      "page": 8,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b21",
   "year": -300,
   "yearLabel": "前300",
   "pages": [
    8
   ],
   "china": [
    {
     "year": -299,
     "yearEnd": null,
     "yearLabel": "前299",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "楚怀王受骗入秦",
     "desc": "前299年，楚怀王受骗入秦，被扣留。后楚立太子横为王，屈原被流放。",
     "src": {
      "book": "中外历史对比年表",
      "page": 8,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": -280,
     "yearEnd": -233,
     "yearLabel": "前280",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "韩非子",
     "desc": "前280—前233年，韩非子，法家学派的集大成者，著有《韩非子》五十五篇。",
     "src": {
      "book": "中外历史对比年表",
      "page": 8,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": -262,
     "yearEnd": null,
     "yearLabel": "前262",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "长平之战",
     "desc": "前262年，长平之战，秦胜赵败，秦赵二强对峙抗衡局面结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 8,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": -300,
     "yearEnd": null,
     "yearLabel": "前300",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "战国时期，各国建立了以王为首的中央集权的官僚体制",
     "desc": "战国时期，各国建立了以王为首的中央集权的官僚体制；官员选拔遵循任贤使能、因功予赏的原则；在普遍兵役制基础上建立了常备军；骑兵取代车兵，从根本上改变了中国古代战争的形式。",
     "src": {
      "book": "中外历史对比年表",
      "page": 8,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -287,
     "yearEnd": -212,
     "yearLabel": "前287",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "阿基米德",
     "desc": "前287—前212年，阿基米德，古希腊物理学家，发现杠杆原理、比重原理、浮力定律。",
     "src": {
      "book": "中外历史对比年表",
      "page": 8,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": -275,
     "yearEnd": null,
     "yearLabel": "前275",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "欧洲"
     ],
     "title": "罗马完成了对意大利半岛诸邦的征服",
     "desc": "前275年，罗马完成了对意大利半岛诸邦的征服。",
     "src": {
      "book": "中外历史对比年表",
      "page": 8,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": -269,
     "yearEnd": -232,
     "yearLabel": "前269",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "印度孔雀王朝阿育王在位",
     "desc": "前269—前232年，印度孔雀王朝阿育王在位，征服了除半岛南端外的整个印度，建立了君主专制的孔雀帝国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 8,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": -264,
     "yearEnd": -146,
     "yearLabel": "前264",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "布匿战争",
     "desc": "前264—前146年，布匿战争，罗马摧毁西地中海强国迦太基，成为该地区霸主。",
     "src": {
      "book": "中外历史对比年表",
      "page": 8,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b22",
   "year": -250,
   "yearLabel": "前250",
   "pages": [
    8,
    9
   ],
   "china": [
    {
     "year": -250,
     "yearEnd": null,
     "yearLabel": "前250",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "铁制农具广泛使用",
     "desc": "铁制农具广泛使用，牛耕方式得到推广；秦国蜀郡守李冰主持修建了著名的都江堰水利工程。",
     "src": {
      "book": "中外历史对比年表",
      "page": 8,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": -227,
     "yearEnd": null,
     "yearLabel": "前227",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "燕太子丹派荆轲刺杀秦王",
     "desc": "前227年，燕太子丹派荆轲刺杀秦王。",
     "src": {
      "book": "中外历史对比年表",
      "page": 9,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": -221,
     "yearEnd": null,
     "yearLabel": "前221",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "秦最终扫灭六国",
     "desc": "前221年，秦最终扫灭六国，完成统一，成为当时世界上最大的国家。秦王朝的建立，标志着中国统一的多民族国家的诞生。",
     "src": {
      "book": "中外历史对比年表",
      "page": 9,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": -221,
     "yearEnd": -210,
     "yearLabel": "前221",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "秦王嬴政在位",
     "desc": "前221—前210年，秦王嬴政在位，尊号“皇帝”，自称“始皇帝”，确立至高无上的皇权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 9,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": -250,
     "yearEnd": null,
     "yearLabel": "前250",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "秦朝初年，建立专制主义中央集权制度",
     "desc": "秦朝初年，建立专制主义中央集权制度；统一货币、度量衡、文字。",
     "src": {
      "book": "中外历史对比年表",
      "page": 9,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -247,
     "yearEnd": 226,
     "yearLabel": "前247",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "两河流域",
     "countries": [
      "两河流域",
      "波斯",
      "罗马",
      "中亚"
     ],
     "title": "帕提亚帝国",
     "desc": "前247—226年，帕提亚帝国，中国史书称“安息”，波斯帝国的后继者，极盛时东起中亚西南部西至两河流域，长期与罗马对峙争斗，后为萨珊波斯所取代。",
     "src": {
      "book": "中外历史对比年表",
      "page": 8,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": -227,
     "yearEnd": null,
     "yearLabel": "前227",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马将西西里岛作为一省",
     "desc": "前227年，罗马将西西里岛作为一省，是为罗马设置行省之始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 9,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": -221,
     "yearEnd": null,
     "yearLabel": "前221",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及"
     ],
     "title": "叙利亚占埃及",
     "desc": "前221年，叙利亚占埃及，爆发第四次叙利亚战争，叙利亚丧失沿海大部分土地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 9,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": -216,
     "yearEnd": null,
     "yearLabel": "前216",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊"
     ],
     "title": "迦太基与马其顿、叙拉古缔结同盟",
     "desc": "前216年，迦太基与马其顿、叙拉古缔结同盟。",
     "src": {
      "book": "中外历史对比年表",
      "page": 9,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b23",
   "year": -215,
   "yearLabel": "前215",
   "pages": [
    9
   ],
   "china": [
    {
     "year": -213,
     "yearEnd": null,
     "yearLabel": "前213",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "秦始皇下令修筑长城",
     "desc": "前213年，秦始皇下令修筑长城，西起临洮，东至辽东，号称“万里长城”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 9,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": -213,
     "yearEnd": null,
     "yearLabel": "前213",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "秦始皇下令“焚书”",
     "desc": "前213年，秦始皇下令“焚书”，医药卜筮种树之书除外。",
     "src": {
      "book": "中外历史对比年表",
      "page": 9,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": -212,
     "yearEnd": null,
     "yearLabel": "前212",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "秦始皇下令“坑儒”",
     "desc": "前212年，秦始皇下令“坑儒”，460余人坑之咸阳。",
     "src": {
      "book": "中外历史对比年表",
      "page": 9,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -215,
     "yearEnd": -168,
     "yearLabel": "前215",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊",
      "罗马"
     ],
     "title": "罗马发动三次马其顿战争",
     "desc": "前215—前168年，罗马发动三次马其顿战争，征服马其顿王国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 9,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": -211,
     "yearEnd": null,
     "yearLabel": "前211",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马击败叙拉古",
     "desc": "前211年，罗马击败叙拉古，叙拉古投降，西西里尽归罗马。",
     "src": {
      "book": "中外历史对比年表",
      "page": 9,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b24",
   "year": -210,
   "yearLabel": "前210",
   "pages": [
    9,
    10,
    11
   ],
   "china": [
    {
     "year": -210,
     "yearEnd": null,
     "yearLabel": "前210",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "秦始皇少子胡亥继位",
     "desc": "前210年，秦始皇少子胡亥继位，史称“秦二世”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 9,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": -209,
     "yearEnd": null,
     "yearLabel": "前209",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陈胜、吴广于大泽乡起义",
     "desc": "前209年，陈胜、吴广于大泽乡起义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 10,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": -202,
     "yearEnd": null,
     "yearLabel": "前202",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "刘邦即皇帝位",
     "desc": "前202年，刘邦即皇帝位，是为汉高祖，汉朝开始，定都长安，史称“西汉”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 10,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": -179,
     "yearEnd": -104,
     "yearLabel": "前179",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "董仲舒",
     "desc": "前179—前104年，董仲舒，汉代儒学思想的奠基者，提出“大一统”主张，建议用儒家纲常名教维护封建统治，加强专制主义中央集权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 10,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": -141,
     "yearEnd": -87,
     "yearLabel": "前141",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "汉武帝刘彻在位",
     "desc": "前141—前87年，汉武帝刘彻在位，他是一位有雄才大略的封建帝王。",
     "src": {
      "book": "中外历史对比年表",
      "page": 11,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": -138,
     "yearEnd": -126,
     "yearLabel": "前138",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张骞出使西域",
     "desc": "前138—前126年，张骞出使西域，获得大量西域资料，传播了汉朝声威。",
     "src": {
      "book": "中外历史对比年表",
      "page": 11,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": -135,
     "yearEnd": null,
     "yearLabel": "前135",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "汉武帝“罢黜百家，独尊儒术”",
     "desc": "前135年，汉武帝“罢黜百家，独尊儒术”，儒学地位日益提高。",
     "src": {
      "book": "中外历史对比年表",
      "page": 11,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -209,
     "yearEnd": null,
     "yearLabel": "前209",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "欧洲"
     ],
     "title": "罗马将军西庇阿攻陷西班牙的新迦太基城",
     "desc": "前209年，罗马将军西庇阿攻陷西班牙的新迦太基城，清除迦太基的势力。",
     "src": {
      "book": "中外历史对比年表",
      "page": 10,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": -201,
     "yearEnd": null,
     "yearLabel": "前201",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及"
     ],
     "title": "叙利亚与埃及爆发第五次叙利亚战争",
     "desc": "前201年，叙利亚与埃及爆发第五次叙利亚战争，叙利亚夺回沿海之地与小亚细亚南部。",
     "src": {
      "book": "中外历史对比年表",
      "page": 10,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": -168,
     "yearEnd": null,
     "yearLabel": "前168",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "罗马"
     ],
     "title": "埃及成为罗马附属国",
     "desc": "前168年，埃及成为罗马附属国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 10,
      "row": 9,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b25",
   "year": -135,
   "yearLabel": "前135",
   "pages": [
    11
   ],
   "china": [
    {
     "year": -135,
     "yearEnd": -90,
     "yearLabel": "前135",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "司马迁",
     "desc": "前135—前90年，司马迁，著《史记》，是中国第一部纪传体史书。",
     "src": {
      "book": "中外历史对比年表",
      "page": 11,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": -133,
     "yearEnd": -119,
     "yearLabel": "前133",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "汉将卫青、霍去病多次率军反击匈奴",
     "desc": "前133—前119年，汉将卫青、霍去病多次率军反击匈奴，收复失地，巩固了北部边防。",
     "src": {
      "book": "中外历史对比年表",
      "page": 11,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -133,
     "yearEnd": null,
     "yearLabel": "前133",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "欧洲"
     ],
     "title": "罗马镇压了卢西坦尼亚起义",
     "desc": "前133年，罗马镇压了卢西坦尼亚起义，西班牙大部分归罗马统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 11,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": -129,
     "yearEnd": null,
     "yearLabel": "前129",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "美洲"
     ],
     "title": "罗马最终吞并小亚细亚",
     "desc": "前129年，罗马最终吞并小亚细亚，控制了东地中海地区，建立起跨欧亚非三洲的霸权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 11,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b26",
   "year": -90,
   "yearLabel": "前90",
   "pages": [
    11
   ],
   "china": [
    {
     "year": -89,
     "yearEnd": null,
     "yearLabel": "前89",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "汉武帝颁布“轮台罪己诏”",
     "desc": "前89年，汉武帝颁布“轮台罪己诏”，使一度动摇的西汉统治重新稳定。",
     "src": {
      "book": "中外历史对比年表",
      "page": 11,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": -87,
     "yearEnd": -48,
     "yearLabel": "前87",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "昭帝、宣帝在位时期，实行“与民休息”的政策",
     "desc": "前87—前48年，昭帝、宣帝在位时期，实行“与民休息”的政策，出现暂时的中兴局面，史称“昭宣中兴”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 11,
      "row": 9,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -90,
     "yearEnd": null,
     "yearLabel": "前90",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "欧洲"
     ],
     "title": "罗马爆发意大利同盟起义运动",
     "desc": "前90年，罗马爆发意大利同盟起义运动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 11,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b27",
   "year": -70,
   "yearLabel": "前70",
   "pages": [
    11,
    12
   ],
   "china": [
    {
     "year": -30,
     "yearEnd": null,
     "yearLabel": "前30",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国最早的医书《黄帝内经》成书",
     "desc": "约前30年，中国最早的医书《黄帝内经》成书，它是秦汉以前医学临床实验的经验总结。",
     "src": {
      "book": "中外历史对比年表",
      "page": 12,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": -28,
     "yearEnd": null,
     "yearLabel": "前28",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "世界上第一次对太阳黑子的记录",
     "desc": "前28年，世界上第一次对太阳黑子的记录，见于《汉书》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 12,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": -70,
     "yearEnd": null,
     "yearLabel": "前70",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西汉时期，实行中央直接统治地方的一套行政系统——郡县制",
     "desc": "西汉时期，实行中央直接统治地方的一套行政系统——郡县制；选官主要途径是察举制和征辟制，一定程度上解决了世袭制的弊端；铁兵器逐渐替代铜兵器而居主导地位；丝织业发达，出现提花织布机；漆器盛行；发明造纸术；“丝绸之路”形成，丝绸、漆器等经河西走廊输往中亚、西亚及欧洲地区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 12,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": -73,
     "yearEnd": -71,
     "yearLabel": "前73",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊",
      "罗马"
     ],
     "title": "斯巴达克起义",
     "desc": "前73—前71年，斯巴达克起义，沉重打击了罗马奴隶主阶级统治，加速了罗马从共和向帝制的转变。",
     "src": {
      "book": "中外历史对比年表",
      "page": 11,
      "row": 10,
      "col": "外国"
     }
    },
    {
     "year": -59,
     "yearEnd": null,
     "yearLabel": "前59",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马军事统帅凯撒出任高卢总督",
     "desc": "前59年，罗马军事统帅凯撒出任高卢总督，三年内征服高卢大部分地区，著《高卢战记》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 12,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": -30,
     "yearEnd": null,
     "yearLabel": "前30",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "罗马"
     ],
     "title": "埃及成为罗马帝国的一个行省",
     "desc": "前30年，埃及成为罗马帝国的一个行省。",
     "src": {
      "book": "中外历史对比年表",
      "page": 12,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": -27,
     "yearEnd": null,
     "yearLabel": "前27",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "屋大维建元首制",
     "desc": "前27年，屋大维建元首制，是为罗马帝国的开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 12,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": -70,
     "yearEnd": null,
     "yearLabel": "前70",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马帝国时期，实行行省制",
     "desc": "罗马帝国时期，实行行省制，由罗马派总督管理，实行间接统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 12,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b28",
   "year": 1,
   "yearLabel": "1",
   "pages": [
    12,
    13
   ],
   "china": [
    {
     "year": 1,
     "yearEnd": null,
     "yearLabel": "1",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "佛教通过西域传入中国内地",
     "desc": "约1世纪初，佛教通过西域传入中国内地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 12,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 8,
     "yearEnd": null,
     "yearLabel": "8",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "王莽称帝",
     "desc": "8年，王莽称帝，改国号为“新”，建立“新朝”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 12,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 21,
     "yearEnd": null,
     "yearLabel": "21",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "绿林、赤眉起义",
     "desc": "21年，绿林、赤眉起义，推翻王莽政权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 12,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 4,
     "yearEnd": null,
     "yearLabel": "4",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马派遣大军征服易北河与多瑙河流域的日耳曼人",
     "desc": "4年，罗马派遣大军征服易北河与多瑙河流域的日耳曼人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 12,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 9,
     "yearEnd": null,
     "yearLabel": "9",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "德意志"
     ],
     "title": "条顿堡森林战役",
     "desc": "9年，条顿堡森林战役，日耳曼人首领赫尔曼在条顿堡森林重创罗马军队，使罗马帝国边界止于莱茵河。",
     "src": {
      "book": "中外历史对比年表",
      "page": 12,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 23,
     "yearEnd": 79,
     "yearLabel": "23",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "老普林尼",
     "desc": "约23—79年，老普林尼，古罗马科学家，所著《自然史》是一部百科全书式的科学巨作。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b29",
   "year": 25,
   "yearLabel": "25",
   "pages": [
    13
   ],
   "china": [
    {
     "year": 25,
     "yearEnd": null,
     "yearLabel": "25",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "刘秀称帝",
     "desc": "25年，刘秀称帝，国号汉，定都洛阳，史称“东汉”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 27,
     "yearEnd": 100,
     "yearLabel": "27",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "王充",
     "desc": "27—约100年，王充，著《论衡》，运用朴素唯物主义观点批判谶纬神学，遏止了儒学进一步神学化。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 30,
     "yearEnd": null,
     "yearLabel": "30",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南阳太守杜诗推广水力鼓风的水排",
     "desc": "约30年，南阳太守杜诗推广水力鼓风的水排，使冶铁业有较大发展，领先欧洲1000余年。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 32,
     "yearEnd": 92,
     "yearLabel": "32",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "班固",
     "desc": "32—92年，班固，著《汉书》，是中国第一部完整的断代史。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 73,
     "yearEnd": null,
     "yearLabel": "73",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "班超出使西域",
     "desc": "73年，班超出使西域，重树东汉王朝威望，恢复中原与西域联系。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 89,
     "yearEnd": 105,
     "yearLabel": "89",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "和帝在位时期，宦官蔡伦改进造纸技术",
     "desc": "89—105年，和帝在位时期，宦官蔡伦改进造纸技术，使纸的大量生产成为可能。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 25,
     "yearEnd": null,
     "yearLabel": "25",
     "yearKind": "anchor",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "中亚"
     ],
     "title": "贵霜帝国",
     "desc": "约1世纪中至3世纪，贵霜帝国，月氏人建立，极盛时统治中亚和印度部分地区，扼丝绸之路要冲。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 25,
     "yearEnd": null,
     "yearLabel": "25",
     "yearKind": "anchor",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "以色列",
     "countries": [
      "以色列",
      "罗马",
      "基督教会"
     ],
     "title": "基督教产生于罗马统治之下的巴勒斯坦犹太下层群众中",
     "desc": "约1世纪中，基督教产生于罗马统治之下的巴勒斯坦犹太下层群众中。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 66,
     "yearEnd": 135,
     "yearLabel": "66",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "以色列",
     "countries": [
      "以色列",
      "罗马"
     ],
     "title": "犹太战争",
     "desc": "66—135年，犹太战争，巴勒斯坦犹太人三次反抗罗马统治的大起义，遭血腥镇压。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 78,
     "yearEnd": 102,
     "yearLabel": "78",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "中亚"
     ],
     "title": "贵霜帝国最著名的君主迦腻色迦在位",
     "desc": "78—102年，贵霜帝国最著名的君主迦腻色迦在位，大力弘扬佛法，帝国一时成为佛教中心。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b30",
   "year": 90,
   "yearLabel": "90",
   "pages": [
    13,
    14
   ],
   "china": [
    {
     "year": 100,
     "yearEnd": null,
     "yearLabel": "100",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国古代重要的数学著作《九章算术》成书",
     "desc": "约100年，中国古代重要的数学著作《九章算术》成书，其中，分数四则运算和比例算法在当时世界领先；负数概念和正负数加减法的运算为世界数学史上首见。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 10,
      "col": "中国"
     }
    },
    {
     "year": 132,
     "yearEnd": null,
     "yearLabel": "132",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张衡创造了用以测定地震方位的地动仪",
     "desc": "132年，张衡创造了用以测定地震方位的地动仪。",
     "src": {
      "book": "中外历史对比年表",
      "page": 14,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 145,
     "yearEnd": 208,
     "yearLabel": "145",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "华佗",
     "desc": "约145—208年，华佗，被尊为“神医”，善用针灸汤药，发明麻沸散用于外科手术麻醉。",
     "src": {
      "book": "中外历史对比年表",
      "page": 14,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 91,
     "yearEnd": null,
     "yearLabel": "91",
     "yearKind": "explicit",
     "region": "central-asia",
     "regionLabel": "中亚",
     "country": "中亚",
     "countries": [
      "中亚"
     ],
     "title": "北匈奴的一部分离开漠北",
     "desc": "91年，北匈奴的一部分离开漠北，向西方进行持久而漫长的迁徙过程，史称“匈奴西迁”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 121,
     "yearEnd": null,
     "yearLabel": "121",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "英格兰"
     ],
     "title": "罗马皇帝哈德良巡幸不列颠",
     "desc": "121年，罗马皇帝哈德良巡幸不列颠，在不列颠北部筑长城。",
     "src": {
      "book": "中外历史对比年表",
      "page": 13,
      "row": 10,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b31",
   "year": 150,
   "yearLabel": "150",
   "pages": [
    14,
    15
   ],
   "china": [
    {
     "year": 150,
     "yearEnd": 215,
     "yearLabel": "150",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张仲景",
     "desc": "约150—215年，张仲景，被尊为“医圣”，著《伤寒杂病论》，总结了中医诊断和治疗两方面经验，为中医学史上奠基之作。",
     "src": {
      "book": "中外历史对比年表",
      "page": 14,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 150,
     "yearEnd": null,
     "yearLabel": "150",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "《神农本草经》成书",
     "desc": "150年前后，中国第一部完整的药物和植物分类学著作《神农本草经》成书。",
     "src": {
      "book": "中外历史对比年表",
      "page": 14,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 151,
     "yearEnd": 221,
     "yearLabel": "151",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "魏伯阳",
     "desc": "约151—221年，魏伯阳，著有《周易参同契》，是世界上最早的炼丹书籍，在化学史上有重要地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 14,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 166,
     "yearEnd": 176,
     "yearLabel": "166",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "党锢之祸",
     "desc": "166—176年，党锢之祸，官僚士大夫和太学生联合同宦官集团斗争，遭免官禁锢。",
     "src": {
      "book": "中外历史对比年表",
      "page": 14,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 150,
     "yearEnd": null,
     "yearLabel": "150",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "东汉后期，以《太平清领书》为主要教典的太平道、五斗米道创立",
     "desc": "东汉后期，以《太平清领书》为主要教典的太平道、五斗米道创立，标志中国早期道教形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 14,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 184,
     "yearEnd": null,
     "yearLabel": "184",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张角利用太平道组织的黄巾大起义爆发",
     "desc": "184年，张角利用太平道组织的黄巾大起义爆发，从根本上动摇了东汉王朝统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 14,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 189,
     "yearEnd": null,
     "yearLabel": "189",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "董卓率兵入洛阳",
     "desc": "189年，董卓率兵入洛阳，控制东汉朝廷大权，引起军阀混战，东汉帝国名存实亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 196,
     "yearEnd": null,
     "yearLabel": "196",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "曹操迎汉献帝都于许昌",
     "desc": "196年，曹操迎汉献帝都于许昌，挟天子以令诸侯。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 150,
     "yearEnd": null,
     "yearLabel": "150",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会"
     ],
     "title": "基督教经典《圣经·新约》成书",
     "desc": "2世纪中，基督教经典《圣经·新约》成书。",
     "src": {
      "book": "中外历史对比年表",
      "page": 14,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 166,
     "yearEnd": null,
     "yearLabel": "166",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "越南"
     ],
     "title": "罗马皇帝遣使自海路（经越南）来中国进行贸易",
     "desc": "166年，罗马皇帝遣使自海路（经越南）来中国进行贸易，中西“海上丝绸之路”开通，罗马的玻璃器皿、毛织品等输入中国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 14,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 188,
     "yearEnd": null,
     "yearLabel": "188",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "朝鲜半岛",
     "countries": [
      "朝鲜半岛"
     ],
     "title": "百济入侵新罗",
     "desc": "188年，百济入侵新罗。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 192,
     "yearEnd": null,
     "yearLabel": "192",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马安东尼王朝灭亡",
     "desc": "192年，罗马安东尼王朝灭亡，从此罗马帝国进入最混乱的时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 150,
     "yearEnd": null,
     "yearLabel": "150",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马帝国爆发严重的社会危机",
     "desc": "2世纪末至3世纪初，罗马帝国爆发严重的社会危机，史称“三世纪危机”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b32",
   "year": 200,
   "yearLabel": "200",
   "pages": [
    15
   ],
   "china": [
    {
     "year": 200,
     "yearEnd": null,
     "yearLabel": "200",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "官渡之战",
     "desc": "200年，官渡之战，曹操以少胜多，击败袁绍，为统一北方打下基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 208,
     "yearEnd": null,
     "yearLabel": "208",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "赤壁之战",
     "desc": "208年，赤壁之战，孙刘联军以少胜多，大败曹操，长江南北形成对峙局面。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 208,
     "yearEnd": null,
     "yearLabel": "208",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "英格兰"
     ],
     "title": "罗马皇帝塞维鲁亲征不列颠",
     "desc": "208年，罗马皇帝塞维鲁亲征不列颠。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 212,
     "yearEnd": null,
     "yearLabel": "212",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马皇帝卡拉卡拉授予帝国境内所有自由人以公民权",
     "desc": "212年，罗马皇帝卡拉卡拉授予帝国境内所有自由人以公民权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b33",
   "year": 220,
   "yearLabel": "220",
   "pages": [
    15,
    16
   ],
   "china": [
    {
     "year": 220,
     "yearEnd": null,
     "yearLabel": "220",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "曹丕废汉献帝",
     "desc": "220年，曹丕废汉献帝，自立为帝，改国号魏，史称“曹魏”，都于洛阳。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 221,
     "yearEnd": null,
     "yearLabel": "221",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "刘备称帝",
     "desc": "221年，刘备称帝，国号汉，史称“蜀汉”，都于成都。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 10,
      "col": "中国"
     }
    },
    {
     "year": 222,
     "yearEnd": null,
     "yearLabel": "222",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "吴蜀夷陵之战",
     "desc": "222年，吴蜀夷陵之战，蜀国惨败，魏蜀吴三国疆域固定下来。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 11,
      "col": "中国"
     }
    },
    {
     "year": 229,
     "yearEnd": null,
     "yearLabel": "229",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙权称帝",
     "desc": "229年，孙权称帝，国号吴，史称“东吴”，都于建业。三国鼎立局面正式形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 12,
      "col": "中国"
     }
    },
    {
     "year": 263,
     "yearEnd": null,
     "yearLabel": "263",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "曹魏大军攻入成都",
     "desc": "263年，曹魏大军攻入成都，蜀亡。三国鼎足之势结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 16,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 263,
     "yearEnd": null,
     "yearLabel": "263",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "刘徽注《九章算术》",
     "desc": "263年，刘徽注《九章算术》，创割圆术，为求圆周率提供了科学方法。",
     "src": {
      "book": "中外历史对比年表",
      "page": 16,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 220,
     "yearEnd": null,
     "yearLabel": "220",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "三国时期，吴国造船业发达",
     "desc": "三国时期，吴国造船业发达，能制造长达20丈的商船；大的战船上下5层，可载3000人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 16,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 220,
     "yearEnd": null,
     "yearLabel": "220",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "曹魏时期，选官实行九品中正制",
     "desc": "曹魏时期，选官实行九品中正制，体现了唯才是举的精神。",
     "src": {
      "book": "中外历史对比年表",
      "page": 16,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 265,
     "yearEnd": null,
     "yearLabel": "265",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "司马炎废魏元帝曹奂",
     "desc": "265年，司马炎废魏元帝曹奂，自立为帝，改国号晋，史称“西晋”，都于洛阳。",
     "src": {
      "book": "中外历史对比年表",
      "page": 16,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 280,
     "yearEnd": null,
     "yearLabel": "280",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西晋大军攻入建业",
     "desc": "280年，西晋大军攻入建业，吴亡，分裂局面结束，天下重归一统。",
     "src": {
      "book": "中外历史对比年表",
      "page": 16,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 291,
     "yearEnd": 306,
     "yearLabel": "291",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "八王之乱",
     "desc": "291—306年，八王之乱，西晋宗室诸王为争夺最高统治权而发生的战乱。",
     "src": {
      "book": "中外历史对比年表",
      "page": 16,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 220,
     "yearEnd": null,
     "yearLabel": "220",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "裴秀绘制《禹贡地域图》",
     "desc": "约3世纪末，裴秀绘制《禹贡地域图》，提出“制图六体”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 16,
      "row": 9,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 226,
     "yearEnd": null,
     "yearLabel": "226",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯"
     ],
     "title": "帕提亚波斯总督阿尔达希举兵独立",
     "desc": "226年，帕提亚波斯总督阿尔达希举兵独立，建立萨珊王朝，是为萨珊波斯帝国建立之始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 15,
      "row": 11,
      "col": "外国"
     }
    },
    {
     "year": 220,
     "yearEnd": null,
     "yearLabel": "220",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "巴高达运动",
     "desc": "3世纪60、80年代，巴高达运动，高卢地区反抗罗马统治的人民反抗斗争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 16,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 271,
     "yearEnd": null,
     "yearLabel": "271",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马皇帝奥勒良击退阿拉曼尼人",
     "desc": "271年，罗马皇帝奥勒良击退阿拉曼尼人，修筑长城以防蛮族入侵。",
     "src": {
      "book": "中外历史对比年表",
      "page": 16,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 296,
     "yearEnd": null,
     "yearLabel": "296",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "罗马"
     ],
     "title": "波斯王纳尔塞于卡利尼古姆大败罗马人",
     "desc": "296年，波斯王纳尔塞于卡利尼古姆大败罗马人，侵入罗马属地美索不达米亚。",
     "src": {
      "book": "中外历史对比年表",
      "page": 16,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b34",
   "year": 300,
   "yearLabel": "300",
   "pages": [
    16,
    17
   ],
   "china": [
    {
     "year": 304,
     "yearEnd": null,
     "yearLabel": "304",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "匈奴人刘渊起兵反晋",
     "desc": "304年，匈奴人刘渊起兵反晋，自称汉王，后改称皇帝，立国号为汉，都平阳。",
     "src": {
      "book": "中外历史对比年表",
      "page": 16,
      "row": 10,
      "col": "中国"
     }
    },
    {
     "year": 307,
     "yearEnd": 313,
     "yearLabel": "307",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西晋怀帝永嘉年间",
     "desc": "307—313年，西晋怀帝永嘉年间，北方陷入少数民族割据混战，晋朝官民避难南迁，史称“永嘉南渡”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 17,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 313,
     "yearEnd": null,
     "yearLabel": "313",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "祖逖北伐",
     "desc": "313年，祖逖北伐，渡江北上，收复失地，使“黄河以南，尽为晋土”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 17,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 316,
     "yearEnd": null,
     "yearLabel": "316",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "匈奴汉国继洛阳之后又攻破长安",
     "desc": "316年，匈奴汉国继洛阳之后又攻破长安，俘获晋愍帝，西晋灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 17,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 317,
     "yearEnd": 439,
     "yearLabel": "317",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北方陷入各少数民族的割据混战之中",
     "desc": "317—439年，北方陷入各少数民族的割据混战之中，出现许多政权，进入十六国时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 17,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 303,
     "yearEnd": null,
     "yearLabel": "303",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "基督教会"
     ],
     "title": "罗马皇帝戴克里先下令严禁基督教",
     "desc": "303年，罗马皇帝戴克里先下令严禁基督教，但基督教传播日盛。",
     "src": {
      "book": "中外历史对比年表",
      "page": 16,
      "row": 10,
      "col": "外国"
     }
    },
    {
     "year": 313,
     "yearEnd": null,
     "yearLabel": "313",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "基督教会"
     ],
     "title": "罗马皇帝颁布“米兰敕令”",
     "desc": "313年，罗马皇帝颁布“米兰敕令”，正式承认基督教的合法地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 17,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b35",
   "year": 318,
   "yearLabel": "318",
   "pages": [
    17,
    18
   ],
   "china": [
    {
     "year": 318,
     "yearEnd": null,
     "yearLabel": "318",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "永嘉南渡首领、西晋宗王司马睿于建康称帝",
     "desc": "318年，永嘉南渡首领、西晋宗王司马睿于建康称帝，重建晋朝，史称“东晋”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 17,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 318,
     "yearEnd": null,
     "yearLabel": "318",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "两晋之际，葛洪著《抱朴子》",
     "desc": "两晋之际，葛洪著《抱朴子》，确立起神仙道教的理论体系，并发展了金丹派的炼丹术。",
     "src": {
      "book": "中外历史对比年表",
      "page": 17,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 318,
     "yearEnd": null,
     "yearLabel": "318",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "十六国时期北方最早出现的少数民族政权——匈奴汉国分裂",
     "desc": "318年，十六国时期北方最早出现的少数民族政权——匈奴汉国分裂，北方形成前、后二赵并立的局面。",
     "src": {
      "book": "中外历史对比年表",
      "page": 17,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 319,
     "yearEnd": 350,
     "yearLabel": "319",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "后赵政权",
     "desc": "319—350年，后赵政权，羯族人石勒建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 18,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": []
  },
  {
   "id": "b36",
   "year": 320,
   "yearLabel": "320",
   "pages": [
    18
   ],
   "china": [
    {
     "year": 319,
     "yearEnd": 329,
     "yearLabel": "319",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "前赵政权",
     "desc": "319—329年，前赵政权，基本是匈奴汉国的继续，都长安，被羯族人建立的后赵政权所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 18,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 320,
     "yearEnd": null,
     "yearLabel": "320",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "前凉、成汉、代国并存",
     "desc": "十六国前期，与前、后赵并存的割据政权还有西北的前凉、巴蜀的成汉、后改称北魏的代国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 18,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 320,
     "yearEnd": 540,
     "yearLabel": "320",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "印度笈多王朝时期，以恒河中下游为基地实现了北印度的统一",
     "desc": "320—540年，印度笈多王朝时期，以恒河中下游为基地实现了北印度的统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 18,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 320,
     "yearEnd": null,
     "yearLabel": "320",
     "yearKind": "anchor",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "笈多王朝时",
     "desc": "4世纪，笈多王朝时，印度教（亦称新婆罗门教）兴起。",
     "src": {
      "book": "中外历史对比年表",
      "page": 18,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 323,
     "yearEnd": null,
     "yearLabel": "323",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "基督教会"
     ],
     "title": "基督教历史上第一次宗教大集结",
     "desc": "323年，基督教历史上第一次宗教大集结，制定“尼西亚信经”，确立“三位一体”教义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 18,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b37",
   "year": 330,
   "yearLabel": "330",
   "pages": [
    18
   ],
   "china": [
    {
     "year": 337,
     "yearEnd": null,
     "yearLabel": "337",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "鲜卑族慕容氏立国",
     "desc": "337年，鲜卑族慕容氏立国，都龙城，史称“前燕”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 18,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 347,
     "yearEnd": null,
     "yearLabel": "347",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "东晋桓温率兵入蜀",
     "desc": "347年，东晋桓温率兵入蜀，攻陷成都，巴蜀的成汉政权（氐族）灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 18,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 350,
     "yearEnd": 352,
     "yearLabel": "350",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "冉魏政权",
     "desc": "350—352年，冉魏政权，后赵权臣冉闵发动政变建立，国号魏，后为前燕所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 18,
      "row": 9,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 330,
     "yearEnd": null,
     "yearLabel": "330",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马皇帝君士坦丁把帝国首都从罗马迁到东方的拜占庭",
     "desc": "330年，罗马皇帝君士坦丁把帝国首都从罗马迁到东方的拜占庭，取名君士坦丁堡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 18,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 348,
     "yearEnd": null,
     "yearLabel": "348",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "罗马"
     ],
     "title": "波斯国王沙普尔二世大败罗马军队于美索不达米亚的辛卡拉城",
     "desc": "348年，波斯国王沙普尔二世大败罗马军队于美索不达米亚的辛卡拉城。",
     "src": {
      "book": "中外历史对比年表",
      "page": 18,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b38",
   "year": 350,
   "yearLabel": "350",
   "pages": [
    18,
    19
   ],
   "china": [
    {
     "year": 350,
     "yearEnd": null,
     "yearLabel": "350",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "苻健建立前秦",
     "desc": "约350年后，氐族人苻健西入关中，称帝建国，国号秦，都长安，史称“前秦”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 18,
      "row": 10,
      "col": "中国"
     }
    },
    {
     "year": 354,
     "yearEnd": 369,
     "yearLabel": "354",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "桓温多次北伐",
     "desc": "354—369年，桓温多次北伐，欲收复中原，未果。",
     "src": {
      "book": "中外历史对比年表",
      "page": 19,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 350,
     "yearEnd": null,
     "yearLabel": "350",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "前燕进兵中原",
     "desc": "4世纪中，前燕进兵中原，雄踞关东，在北方与前秦形成东西对峙局面。",
     "src": {
      "book": "中外历史对比年表",
      "page": 19,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 355,
     "yearEnd": null,
     "yearLabel": "355",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "法兰克"
     ],
     "title": "罗马皇帝派兵征服法兰克、阿拉曼尼等日耳曼部落",
     "desc": "355年，罗马皇帝派兵征服法兰克、阿拉曼尼等日耳曼部落。",
     "src": {
      "book": "中外历史对比年表",
      "page": 19,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 359,
     "yearEnd": 363,
     "yearLabel": "359",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "罗马"
     ],
     "title": "波斯第二次发动对罗马的战争",
     "desc": "359—363年，波斯第二次发动对罗马的战争，并获得胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 19,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b39",
   "year": 370,
   "yearLabel": "370",
   "pages": [
    19
   ],
   "china": [
    {
     "year": 370,
     "yearEnd": null,
     "yearLabel": "370",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "前燕政权为前秦所灭",
     "desc": "370年，前燕政权为前秦所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 19,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 376,
     "yearEnd": null,
     "yearLabel": "376",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西北的前凉政权（汉族）为前秦所灭",
     "desc": "376年，西北的前凉政权（汉族）为前秦所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 19,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": []
  },
  {
   "id": "b40",
   "year": 380,
   "yearLabel": "380",
   "pages": [
    19,
    20
   ],
   "china": [
    {
     "year": 382,
     "yearEnd": null,
     "yearLabel": "382",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "前秦军队进驻西域",
     "desc": "382年，前秦军队进驻西域，至此统一了北方，与江南的东晋相对峙。",
     "src": {
      "book": "中外历史对比年表",
      "page": 19,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 383,
     "yearEnd": null,
     "yearLabel": "383",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "淝水之战",
     "desc": "383年，淝水之战，东晋以少胜多，击败前秦，稳定了在江南的统治；前秦惨败，在北方的统治迅速瓦解。",
     "src": {
      "book": "中外历史对比年表",
      "page": 19,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 384,
     "yearEnd": 394,
     "yearLabel": "384",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西燕政权",
     "desc": "384—394年，西燕政权，迁至关中的鲜卑族慕容氏所建，都阿房，为后燕所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 19,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 384,
     "yearEnd": 407,
     "yearLabel": "384",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "后燕政权",
     "desc": "384—407年，后燕政权，前燕慕容氏后人所建，是十六国后期中原地区的强盛之国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 19,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 384,
     "yearEnd": 417,
     "yearLabel": "384",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "后秦政权",
     "desc": "384—417年，后秦政权，为羌族人所建，一度控制整个关中地区，是当时最为强盛的国家，为东晋所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 19,
      "row": 10,
      "col": "中国"
     }
    },
    {
     "year": 385,
     "yearEnd": 431,
     "yearLabel": "385",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西秦政权",
     "desc": "385—431年，西秦政权，鲜卑乞伏氏建于陇西一带，一度比较强盛，降于大夏。",
     "src": {
      "book": "中外历史对比年表",
      "page": 20,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 386,
     "yearEnd": 403,
     "yearLabel": "386",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "后凉政权",
     "desc": "386—403年，后凉政权，氐族人吕光所建，定都姑臧，降于后秦。",
     "src": {
      "book": "中外历史对比年表",
      "page": 20,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 394,
     "yearEnd": null,
     "yearLabel": "394",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "前秦为西秦所灭",
     "desc": "394年，前秦为西秦所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 20,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 382,
     "yearEnd": null,
     "yearLabel": "382",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马皇帝狄奥多西与哥特人议和",
     "desc": "382年，罗马皇帝狄奥多西与哥特人议和，双方缔结同盟。",
     "src": {
      "book": "中外历史对比年表",
      "page": 19,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 384,
     "yearEnd": null,
     "yearLabel": "384",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "罗马"
     ],
     "title": "波斯与罗马讲和",
     "desc": "384年，波斯与罗马讲和，将亚美尼亚一分为二，波斯和罗马各据其一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 19,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b41",
   "year": 390,
   "yearLabel": "390",
   "pages": [
    20,
    21
   ],
   "china": [
    {
     "year": 397,
     "yearEnd": 414,
     "yearLabel": "397",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南凉政权",
     "desc": "397—414年，南凉政权，鲜卑秃发氏建于河西地区，降于西秦。",
     "src": {
      "book": "中外历史对比年表",
      "page": 20,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 398,
     "yearEnd": null,
     "yearLabel": "398",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "鲜卑族拓跋珪称帝",
     "desc": "398年，鲜卑族拓跋珪称帝，改国号魏，定都平城，史称“北魏”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 20,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 398,
     "yearEnd": 410,
     "yearLabel": "398",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南燕政权",
     "desc": "398—410年，南燕政权，前燕慕容氏后人所建，为东晋所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 20,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 399,
     "yearEnd": null,
     "yearLabel": "399",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "东晋高僧法显西行求法",
     "desc": "399年，东晋高僧法显西行求法，历时15年，著《佛国记》，记述了古代中亚、印度、南海诸国的地理、历史、风土人情。",
     "src": {
      "book": "中外历史对比年表",
      "page": 20,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 400,
     "yearEnd": null,
     "yearLabel": "400",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙恩、卢循起义",
     "desc": "400年，孙恩、卢循起义，历时11年，沉重打击了东晋政权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 392,
     "yearEnd": null,
     "yearLabel": "392",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "基督教会"
     ],
     "title": "罗马皇帝颁布法令",
     "desc": "392年，罗马皇帝颁布法令，关闭一切异教神庙，禁止献祭活动，基督教成为罗马国教。",
     "src": {
      "book": "中外历史对比年表",
      "page": 20,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 395,
     "yearEnd": null,
     "yearLabel": "395",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马帝国分裂",
     "desc": "395年，罗马帝国分裂，东罗马帝国以君士坦丁堡为都，西罗马帝国以罗马为都。",
     "src": {
      "book": "中外历史对比年表",
      "page": 20,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 397,
     "yearEnd": null,
     "yearLabel": "397",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "罗马大将斯提里克击败西哥特人",
     "desc": "397年，罗马大将斯提里克击败西哥特人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 20,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b42",
   "year": 400,
   "yearLabel": "400",
   "pages": [
    21
   ],
   "china": [
    {
     "year": 400,
     "yearEnd": 420,
     "yearLabel": "400",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西凉政权",
     "desc": "400—420年，西凉政权，汉族人李暠所建，定都酒泉，为北凉所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 401,
     "yearEnd": 439,
     "yearLabel": "401",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北凉政权",
     "desc": "401—439年，北凉政权，匈奴人沮渠蒙逊所建，据河西走廊，一度较为强盛，降于北魏。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 407,
     "yearEnd": 431,
     "yearLabel": "407",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "大夏政权",
     "desc": "407—431年，大夏政权，匈奴人赫连勃勃所建，都于统万。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 400,
     "yearEnd": null,
     "yearLabel": "400",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "盎格鲁—撒克逊人侵入不列颠",
     "desc": "5世纪起，盎格鲁—撒克逊人不断侵入不列颠，在英格兰建立起了许多蛮族王国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 402,
     "yearEnd": null,
     "yearLabel": "402",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "欧洲"
     ],
     "title": "西罗马皇帝因罗马形势危急",
     "desc": "402年，西罗马皇帝因罗马形势危急，避居拉文纳，此后拉文纳成为意大利政治中心。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 405,
     "yearEnd": null,
     "yearLabel": "405",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "日耳曼蛮族入侵意大利",
     "desc": "405年，日耳曼蛮族入侵意大利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b43",
   "year": 410,
   "yearLabel": "410",
   "pages": [
    21
   ],
   "china": [
    {
     "year": 409,
     "yearEnd": 436,
     "yearLabel": "409",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北燕政权",
     "desc": "409—436年，北燕政权，后燕将领汉人冯跋发动政变，灭后燕所建，为北魏所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 410,
     "yearEnd": null,
     "yearLabel": "410",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "东晋时期，水稻生产技术有很大改进",
     "desc": "东晋时期，水稻生产技术有很大改进，江淮一带在水稻种植中采用“烤田法”增加产量。水利技术提高，出现“湖田”，即围湖造田。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 410,
     "yearEnd": null,
     "yearLabel": "410",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "魏晋时期，玄学兴起",
     "desc": "魏晋时期，玄学兴起，这是糅合儒道而形成的一种新的哲学思想体系，探讨本与末、有与无、名教与自然等哲理问题。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 9,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 410,
     "yearEnd": null,
     "yearLabel": "410",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "西哥特人攻陷罗马城",
     "desc": "410年，西哥特人攻陷罗马城，纵兵烧杀抢劫，满载而归。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 411,
     "yearEnd": null,
     "yearLabel": "411",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "进入西班牙的苏维汇人在半岛西北部建立苏维汇王国",
     "desc": "411年，进入西班牙的苏维汇人在半岛西北部建立苏维汇王国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 415,
     "yearEnd": null,
     "yearLabel": "415",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "西哥特人打败西班牙境内的汪达尔人、阿兰人等蛮族",
     "desc": "415年，西哥特人打败西班牙境内的汪达尔人、阿兰人等蛮族。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 419,
     "yearEnd": 711,
     "yearLabel": "419",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯",
      "欧洲"
     ],
     "title": "西哥特王国",
     "desc": "419—711年，西哥特王国，西哥特人在南高卢和北西班牙建立，后为阿拉伯人征服。",
     "src": {
      "book": "中外历史对比年表",
      "page": 21,
      "row": 10,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b44",
   "year": 420,
   "yearLabel": "420",
   "pages": [
    22
   ],
   "china": [
    {
     "year": 420,
     "yearEnd": 589,
     "yearLabel": "420",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "江南地区相继出现以建康为都城的宋、齐、梁、陈四个政权",
     "desc": "420—589年，江南地区相继出现以建康为都城的宋、齐、梁、陈四个政权，史称“南朝”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 22,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 420,
     "yearEnd": null,
     "yearLabel": "420",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "东晋将领刘裕废晋恭帝自立",
     "desc": "420年，东晋将领刘裕废晋恭帝自立，改国号宋，东晋亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 22,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 424,
     "yearEnd": 454,
     "yearLabel": "424",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宋文帝元嘉年间",
     "desc": "424—454年，宋文帝元嘉年间，政治清明，社会安定，经济繁荣，史称“元嘉之治”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 22,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 429,
     "yearEnd": 500,
     "yearLabel": "429",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "祖冲之",
     "desc": "429—500年，祖冲之，数学家，把圆周率精确到小数点后第7位，这是当时世界上最先进的科学成果，比欧洲人早1000多年。",
     "src": {
      "book": "中外历史对比年表",
      "page": 22,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 439,
     "yearEnd": null,
     "yearLabel": "439",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北魏皇帝拓跋焘先后灭掉北方仅存的大夏、北燕和北凉",
     "desc": "439年，北魏皇帝拓跋焘先后灭掉北方仅存的大夏、北燕和北凉，再次统一北方，北朝时期开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 22,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 446,
     "yearEnd": null,
     "yearLabel": "446",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北魏太武帝下令屠杀沙门",
     "desc": "446年，北魏太武帝下令屠杀沙门，焚经毁像，史称“太武灭佛”。这是中国历史上第一次大规模毁佛运动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 22,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 470,
     "yearEnd": 527,
     "yearLabel": "470",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "郦道元",
     "desc": "约470—527年，郦道元，著有《水经注》，是一部重要的地理著作。",
     "src": {
      "book": "中外历史对比年表",
      "page": 22,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 471,
     "yearEnd": 499,
     "yearLabel": "471",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北魏孝文帝在位",
     "desc": "471—499年，北魏孝文帝在位，进行全面汉化的社会改革，加速了北方民族融合的历史进程。",
     "src": {
      "book": "中外历史对比年表",
      "page": 22,
      "row": 9,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 420,
     "yearEnd": null,
     "yearLabel": "420",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "罗马",
      "基督教会"
     ],
     "title": "波斯国王下令严禁基督教",
     "desc": "420年，波斯国王下令严禁基督教，基督教徒逃入罗马，请求保护。波斯与罗马发生战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 22,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 422,
     "yearEnd": null,
     "yearLabel": "422",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊",
      "罗马",
      "中亚"
     ],
     "title": "匈奴人侵略拜占庭帝国的色雷斯、马其顿等地",
     "desc": "422年，匈奴人侵略拜占庭帝国的色雷斯、马其顿等地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 22,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 439,
     "yearEnd": 534,
     "yearLabel": "439",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "汪达尔王国",
     "desc": "439—534年，汪达尔王国，汪达尔人在北非建立，为拜占庭帝国所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 22,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 457,
     "yearEnd": null,
     "yearLabel": "457",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰克",
     "countries": [
      "法兰克"
     ],
     "title": "勃艮第人以里昂为中心建立勃艮第王国",
     "desc": "457年，勃艮第人以里昂为中心建立勃艮第王国，后被法兰克人征服。",
     "src": {
      "book": "中外历史对比年表",
      "page": 22,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 476,
     "yearEnd": null,
     "yearLabel": "476",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "日耳曼雇佣军首领奥多亚克废黜西罗马帝国最后一个皇帝",
     "desc": "476年，日耳曼雇佣军首领奥多亚克废黜西罗马帝国最后一个皇帝，西罗马帝国灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 22,
      "row": 9,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b45",
   "year": 480,
   "yearLabel": "480",
   "pages": [
    23
   ],
   "china": [
    {
     "year": 479,
     "yearEnd": null,
     "yearLabel": "479",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "禁卫军首领萧道成废宋顺帝自立",
     "desc": "479年，禁卫军首领萧道成废宋顺帝自立，改国号齐，史称“南齐”。刘宋遂亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 23,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 485,
     "yearEnd": null,
     "yearLabel": "485",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北魏孝文帝推行均田制",
     "desc": "485年，北魏孝文帝推行均田制，这是中国历史上一种比较完备的土地制度。",
     "src": {
      "book": "中外历史对比年表",
      "page": 23,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 494,
     "yearEnd": null,
     "yearLabel": "494",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北魏孝文帝迁都洛阳",
     "desc": "494年，北魏孝文帝迁都洛阳。",
     "src": {
      "book": "中外历史对比年表",
      "page": 23,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 502,
     "yearEnd": null,
     "yearLabel": "502",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南齐将领萧衍废齐和帝自立",
     "desc": "502年，南齐将领萧衍废齐和帝自立，改国号梁，南齐灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 23,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 480,
     "yearEnd": null,
     "yearLabel": "480",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "梁朝时",
     "desc": "梁朝时，陶弘景著《真灵位业图》，建立起道教的神仙体系，使道教从杂乱的多神崇拜逐渐走向一神为首的宗教；撰《养性延命录》，发展了道教养生修炼的理论和方法。",
     "src": {
      "book": "中外历史对比年表",
      "page": 23,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 523,
     "yearEnd": null,
     "yearLabel": "523",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "六镇起义爆发",
     "desc": "523年，六镇起义爆发，揭开各族人民反抗斗争的序幕，沉重打击了北魏政权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 23,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 481,
     "yearEnd": null,
     "yearLabel": "481",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰克",
     "countries": [
      "法兰克"
     ],
     "title": "法兰克王国建立",
     "desc": "481年，法兰克王国建立，开始墨洛温王朝的统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 23,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 493,
     "yearEnd": null,
     "yearLabel": "493",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "欧洲"
     ],
     "title": "东哥特人在北部意大利立国",
     "desc": "493年，东哥特人在北部意大利立国，后被拜占庭所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 23,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 496,
     "yearEnd": null,
     "yearLabel": "496",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "法兰克"
     ],
     "title": "法兰克人首领克洛维",
     "desc": "496年，法兰克人首领克洛维，率领3000名法兰克战士接受洗礼，皈依基督教。",
     "src": {
      "book": "中外历史对比年表",
      "page": 23,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 508,
     "yearEnd": null,
     "yearLabel": "508",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰克",
     "countries": [
      "法兰克"
     ],
     "title": "萨利克法兰克人首领克洛维统一法兰克各族落",
     "desc": "508年，萨利克法兰克人首领克洛维统一法兰克各族落。",
     "src": {
      "book": "中外历史对比年表",
      "page": 23,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 524,
     "yearEnd": null,
     "yearLabel": "524",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "罗马"
     ],
     "title": "波斯与拜占庭帝国的战争爆发",
     "desc": "524年，波斯与拜占庭帝国的战争爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 23,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b46",
   "year": 525,
   "yearLabel": "525",
   "pages": [
    23,
    24
   ],
   "china": [
    {
     "year": 528,
     "yearEnd": null,
     "yearLabel": "528",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北魏将领尔朱荣举兵进攻洛阳",
     "desc": "528年，北魏将领尔朱荣举兵进攻洛阳，拥立孝庄帝，将胡太后和废帝元钊押至河阴，沉入黄河，围杀王公大臣2000余人，控制北魏政权，史称“河阴之变”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 23,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 533,
     "yearEnd": 544,
     "yearLabel": "533",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北魏贾思勰著《齐民要术》",
     "desc": "约533—544年，北魏贾思勰著《齐民要术》，是现存最早、最完整的中国古代农学著作，在世界农业科技发展史上占重要地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 24,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 534,
     "yearEnd": null,
     "yearLabel": "534",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北魏将领高欢铲除尔朱荣",
     "desc": "534年，北魏将领高欢铲除尔朱荣，拥立孝静帝，迁都邺城，史称“东魏”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 24,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 527,
     "yearEnd": 565,
     "yearLabel": "527",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "查士丁尼统治时期，拜占庭历史上的“黄金时代”",
     "desc": "527—565年，查士丁尼统治时期，拜占庭历史上的“黄金时代”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 23,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 529,
     "yearEnd": null,
     "yearLabel": "529",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "欧洲"
     ],
     "title": "圣本尼狄克在那不勒斯附近的卡西诺山创立修道院",
     "desc": "529年，圣本尼狄克在那不勒斯附近的卡西诺山创立修道院，制定《修士守则》，成为此后几百年西欧众多修道院的院规。",
     "src": {
      "book": "中外历史对比年表",
      "page": 24,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 534,
     "yearEnd": null,
     "yearLabel": "534",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "罗马"
     ],
     "title": "马格里布（埃及以西撒哈拉以北地区）被纳入拜占庭帝国版图",
     "desc": "534年，马格里布（埃及以西撒哈拉以北地区）被纳入拜占庭帝国版图。",
     "src": {
      "book": "中外历史对比年表",
      "page": 24,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b47",
   "year": 535,
   "yearLabel": "535",
   "pages": [
    24
   ],
   "china": [
    {
     "year": 535,
     "yearEnd": null,
     "yearLabel": "535",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北魏割据关中的宇文泰拥立文帝",
     "desc": "535年，北魏割据关中的宇文泰拥立文帝，都于长安，史称“西魏”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 24,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 548,
     "yearEnd": null,
     "yearLabel": "548",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "侯景举兵叛梁",
     "desc": "548年，侯景举兵叛梁，攻入建康，纵兵杀掠，士族门阀遭受沉重打击，史称“侯景之乱”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 24,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 537,
     "yearEnd": null,
     "yearLabel": "537",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "拜占庭建筑艺术的杰作——圣索菲亚大教堂建成",
     "desc": "537年，拜占庭建筑艺术的杰作——圣索菲亚大教堂建成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 24,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 549,
     "yearEnd": null,
     "yearLabel": "549",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "罗马"
     ],
     "title": "拜占庭皇帝查士丁尼派兵援助黑海东岸反抗波斯的拉奇卡人",
     "desc": "549年，拜占庭皇帝查士丁尼派兵援助黑海东岸反抗波斯的拉奇卡人，再度引发与波斯的战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 24,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b48",
   "year": 550,
   "yearLabel": "550",
   "pages": [
    24,
    25
   ],
   "china": [
    {
     "year": 550,
     "yearEnd": null,
     "yearLabel": "550",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "东魏权臣高洋废帝自立",
     "desc": "550年，东魏权臣高洋废帝自立，改国号为齐，史称“北齐”，都邺城。",
     "src": {
      "book": "中外历史对比年表",
      "page": 24,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 550,
     "yearEnd": 630,
     "yearLabel": "550",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "巢元方",
     "desc": "550—630年，巢元方，隋代著名医师，著有《诸病源候总论》，是中国历史上第一部病因病理学著作，对后世医学有重要影响。",
     "src": {
      "book": "中外历史对比年表",
      "page": 24,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 555,
     "yearEnd": null,
     "yearLabel": "555",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西魏大军攻破江陵",
     "desc": "555年，西魏大军攻破江陵，杀梁元帝，扶植建立后梁政权为附庸，并把十余万人强迁至北方为奴，这一事件史称“江陵之变”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 24,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 557,
     "yearEnd": null,
     "yearLabel": "557",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陈霸先废梁敬帝自立",
     "desc": "557年，陈霸先废梁敬帝自立，国号陈。",
     "src": {
      "book": "中外历史对比年表",
      "page": 25,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 557,
     "yearEnd": null,
     "yearLabel": "557",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西魏权臣宇文觉废帝自立",
     "desc": "557年，西魏权臣宇文觉废帝自立，改国号为周，史称“北周”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 25,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 558,
     "yearEnd": null,
     "yearLabel": "558",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "罗斯",
      "中亚"
     ],
     "title": "拜占庭军队大败进犯君士坦丁堡的匈奴人和斯拉夫人",
     "desc": "558年，拜占庭军队大败进犯君士坦丁堡的匈奴人和斯拉夫人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 25,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b49",
   "year": 565,
   "yearLabel": "565",
   "pages": [
    25,
    26
   ],
   "china": [
    {
     "year": 577,
     "yearEnd": null,
     "yearLabel": "577",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北周攻占北齐国都邺城",
     "desc": "577年，北周攻占北齐国都邺城，北齐亡，北方近半个世纪的分裂局面结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 25,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 587,
     "yearEnd": null,
     "yearLabel": "587",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "隋文帝杨坚灭江陵的后梁",
     "desc": "587年，隋文帝杨坚灭江陵的后梁。",
     "src": {
      "book": "中外历史对比年表",
      "page": 25,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 588,
     "yearEnd": null,
     "yearLabel": "588",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "隋军进抵长江北岸",
     "desc": "588年，隋军进抵长江北岸，次年攻入建康，陈亡，南朝终结。",
     "src": {
      "book": "中外历史对比年表",
      "page": 25,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 565,
     "yearEnd": null,
     "yearLabel": "565",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南朝时期，冶炼技术取得突破",
     "desc": "南朝时期，冶炼技术取得突破，出现灌钢法，这是坩埚技术出现前最先进的炼钢技术。",
     "src": {
      "book": "中外历史对比年表",
      "page": 26,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 602,
     "yearEnd": 664,
     "yearLabel": "602",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "玄奘",
     "desc": "602—664年，玄奘，唐代著名高僧，西行印度求取佛经，往返17年，著《大唐西域记》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 26,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 565,
     "yearEnd": null,
     "yearLabel": "565",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "欧洲"
     ],
     "title": "欧洲历史上第一部系统完备的法律文献——《罗马民法大全》编撰成书",
     "desc": "565年，欧洲历史上第一部系统完备的法律文献——《罗马民法大全》编撰成书，对后世立法影响深远。",
     "src": {
      "book": "中外历史对比年表",
      "page": 25,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 568,
     "yearEnd": null,
     "yearLabel": "568",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "伦巴第人在意大利北部建国",
     "desc": "568年，伦巴第人在意大利北部建国，这是日耳曼部族迁徙中最后建立的王国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 25,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 570,
     "yearEnd": 632,
     "yearLabel": "570",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯"
     ],
     "title": "穆罕默德",
     "desc": "约570—632年，穆罕默德，伊斯兰教先知，创立伊斯兰教。",
     "src": {
      "book": "中外历史对比年表",
      "page": 25,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 598,
     "yearEnd": null,
     "yearLabel": "598",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "英格兰"
     ],
     "title": "英格兰肯特王国的国王埃塞伯特皈依基督教",
     "desc": "598年，英格兰肯特王国的国王埃塞伯特皈依基督教，建立了坎特伯雷大教堂。",
     "src": {
      "book": "中外历史对比年表",
      "page": 26,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 603,
     "yearEnd": null,
     "yearLabel": "603",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "罗马"
     ],
     "title": "波斯进攻拜占庭帝国的小亚细亚领地",
     "desc": "603年，波斯进攻拜占庭帝国的小亚细亚领地，与拜占庭帝国的战争再起，持续20余年。",
     "src": {
      "book": "中外历史对比年表",
      "page": 26,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b50",
   "year": 605,
   "yearLabel": "605",
   "pages": [
    26,
    27
   ],
   "china": [
    {
     "year": 605,
     "yearEnd": 610,
     "yearLabel": "605",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "隋炀帝时修凿了南起余杭",
     "desc": "605—610年，隋炀帝时修凿了南起余杭，北达涿郡，西通洛阳的大运河，全长4800余里。",
     "src": {
      "book": "中外历史对比年表",
      "page": 26,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 607,
     "yearEnd": null,
     "yearLabel": "607",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日本遣使小野妹子来隋朝",
     "desc": "607年，日本遣使小野妹子来隋朝，促进了中日关系的发展。",
     "src": {
      "book": "中外历史对比年表",
      "page": 26,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 611,
     "yearEnd": 616,
     "yearLabel": "611",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "隋末农民起义爆发",
     "desc": "611—616年，隋末农民起义爆发，形成翟让领导的河南瓦岗军、窦建德领导的河北义军，杜伏威领导的江淮义军三支主力，动摇了隋王朝统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 26,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 612,
     "yearEnd": 614,
     "yearLabel": "612",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "隋炀帝先后三次派兵征伐高丽",
     "desc": "612—614年，隋炀帝先后三次派兵征伐高丽，未果。",
     "src": {
      "book": "中外历史对比年表",
      "page": 26,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 617,
     "yearEnd": null,
     "yearLabel": "617",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "太原留守李渊起兵",
     "desc": "617年，太原留守李渊起兵，入长安，控制关中地区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 27,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 618,
     "yearEnd": null,
     "yearLabel": "618",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "江都兵变",
     "desc": "618年，江都兵变，隋炀帝被杀，隋朝灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 27,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 618,
     "yearEnd": null,
     "yearLabel": "618",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李渊称帝",
     "desc": "618年，李渊称帝，建立唐朝，定都长安，是为唐高祖。",
     "src": {
      "book": "中外历史对比年表",
      "page": 27,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 618,
     "yearEnd": 628,
     "yearLabel": "618",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐平定西北",
     "desc": "618—628年，唐平定西北，角逐中原，经略江南，最终统一全国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 27,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 626,
     "yearEnd": null,
     "yearLabel": "626",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "为争夺皇位",
     "desc": "626年，为争夺皇位，李渊次子李世民在宫城北门玄武门设伏兵杀死兄、弟二人，史称“玄武门之变”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 27,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 606,
     "yearEnd": null,
     "yearLabel": "606",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "印度戒日王即位",
     "desc": "606年，印度戒日王即位，在位40年，统一北印度大部。",
     "src": {
      "book": "中外历史对比年表",
      "page": 26,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 611,
     "yearEnd": null,
     "yearLabel": "611",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "罗马"
     ],
     "title": "波斯攻陷拜占庭帝国叙利亚首府安提阿城",
     "desc": "611年，波斯攻陷拜占庭帝国叙利亚首府安提阿城。",
     "src": {
      "book": "中外历史对比年表",
      "page": 26,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 616,
     "yearEnd": null,
     "yearLabel": "616",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "欧洲"
     ],
     "title": "拜占庭帝国在西班牙的领土大部分为西哥特人所夺",
     "desc": "616年，拜占庭帝国在西班牙的领土大部分为西哥特人所夺。",
     "src": {
      "book": "中外历史对比年表",
      "page": 26,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 616,
     "yearEnd": null,
     "yearLabel": "616",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "波斯",
      "罗马"
     ],
     "title": "波斯人入侵拜占庭的属地埃及",
     "desc": "616年，波斯人入侵拜占庭的属地埃及。",
     "src": {
      "book": "中外历史对比年表",
      "page": 26,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 622,
     "yearEnd": null,
     "yearLabel": "622",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯"
     ],
     "title": "穆罕默德离开麦加",
     "desc": "622年，穆罕默德离开麦加，前往麦地那，伊斯兰教称这一事件为“希吉拉”（旧译“徙志”）。",
     "src": {
      "book": "中外历史对比年表",
      "page": 27,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b51",
   "year": 630,
   "yearLabel": "630",
   "pages": [
    27,
    28
   ],
   "china": [
    {
     "year": 627,
     "yearEnd": 649,
     "yearLabel": "627",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "贞观年间",
     "desc": "627—649年，贞观年间，唐太宗推行一系列政治、经济、文化的政策措施，短时间变乱世为治世，史称“贞观之治”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 27,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 630,
     "yearEnd": null,
     "yearLabel": "630",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "松赞干布统一吐蕃各部落",
     "desc": "约630年，松赞干布统一吐蕃各部落，建立了强大的奴隶主政权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 27,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 635,
     "yearEnd": null,
     "yearLabel": "635",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐太宗派兵打败鲜卑族后裔吐谷浑",
     "desc": "635年，唐太宗派兵打败鲜卑族后裔吐谷浑，控制青海，打通了通往西域的道路。",
     "src": {
      "book": "中外历史对比年表",
      "page": 27,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 635,
     "yearEnd": null,
     "yearLabel": "635",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "基督教别派景教传入中国",
     "desc": "635年，基督教别派景教传入中国，时称大秦教。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 639,
     "yearEnd": 657,
     "yearLabel": "639",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐朝连续用兵",
     "desc": "639—657年，唐朝连续用兵，击败西突厥，控制了天山南北地区，设置都护府。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 641,
     "yearEnd": null,
     "yearLabel": "641",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "文成公主入藏",
     "desc": "641年，文成公主入藏，加强了汉藏交流与联系。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 644,
     "yearEnd": 668,
     "yearLabel": "644",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐多次出兵朝鲜半岛",
     "desc": "644—668年，唐多次出兵朝鲜半岛，先后灭百济、高丽。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 630,
     "yearEnd": null,
     "yearLabel": "630",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯"
     ],
     "title": "穆斯林武装进军麦加",
     "desc": "630年，穆斯林武装进军麦加，麦加贵族妥协，承认穆罕默德权威，接受伊斯兰教。这标志着伊斯兰教在阿拉伯半岛的胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 27,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 632,
     "yearEnd": null,
     "yearLabel": "632",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯"
     ],
     "title": "阿拉伯半岛大体归于统一",
     "desc": "632年，阿拉伯半岛大体归于统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 27,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 640,
     "yearEnd": 642,
     "yearLabel": "640",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "阿拉伯"
     ],
     "title": "阿拉伯军队攻入埃及",
     "desc": "640—642年，阿拉伯军队攻入埃及，整个埃及被纳入哈里发国家版图。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 642,
     "yearEnd": null,
     "yearLabel": "642",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "阿拉伯"
     ],
     "title": "尼哈温战役",
     "desc": "642年，尼哈温战役，阿拉伯军队击溃波斯军队，萨珊波斯王朝灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 646,
     "yearEnd": null,
     "yearLabel": "646",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本孝德天皇以中国唐代集权制国家为典范",
     "desc": "646年，日本孝德天皇以中国唐代集权制国家为典范，颁布诏书改革国制，史称“大化改新”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b52",
   "year": 650,
   "yearLabel": "650",
   "pages": [
    28,
    29
   ],
   "china": [
    {
     "year": 649,
     "yearEnd": 683,
     "yearLabel": "649",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐高宗在位",
     "desc": "649—683年，唐高宗在位，统治初期勤于政事，出现“永徽之治”；后武则天入宫，得立为皇后。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 651,
     "yearEnd": null,
     "yearLabel": "651",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "伊斯兰教传入中国",
     "desc": "651年，伊斯兰教传入中国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 653,
     "yearEnd": null,
     "yearLabel": "653",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐经学家孔颖达编定的《五经正义》颁行天下",
     "desc": "653年，唐经学家孔颖达编定的《五经正义》颁行天下，成为官方标准本，首次统一了经学内部各派。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 659,
     "yearEnd": null,
     "yearLabel": "659",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "苏敬等人编成《唐新本草》",
     "desc": "659年，苏敬等人编成《唐新本草》，是世界上第一部国家颁布的药典，收录药物800余种。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 661,
     "yearEnd": 721,
     "yearLabel": "661",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "刘知几",
     "desc": "661—721年，刘知几，唐代史学家，所著《史通》是中国第一部史评著作，也是一部史书编纂法著作、史学理论著作，有较高的理论价值和实用价值。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 10,
      "col": "中国"
     }
    },
    {
     "year": 683,
     "yearEnd": 727,
     "yearLabel": "683",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张遂",
     "desc": "683—727年，张遂，天文学家，在世界历史上首次实测子午线；发现了恒星位置移动现象。",
     "src": {
      "book": "中外历史对比年表",
      "page": 29,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 690,
     "yearEnd": null,
     "yearLabel": "690",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "武则天称帝",
     "desc": "690年，武则天称帝，改唐为周，都洛阳。",
     "src": {
      "book": "中外历史对比年表",
      "page": 29,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 705,
     "yearEnd": null,
     "yearLabel": "705",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐中宗复位",
     "desc": "705年，唐中宗复位，恢复唐号、制度。",
     "src": {
      "book": "中外历史对比年表",
      "page": 29,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 650,
     "yearEnd": null,
     "yearLabel": "650",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "不列颠进入历史上的“七国时期”",
     "desc": "650年，不列颠进入历史上的“七国时期”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 650,
     "yearEnd": null,
     "yearLabel": "650",
     "yearKind": "anchor",
     "region": "sea",
     "regionLabel": "南洋",
     "country": "东南亚",
     "countries": [
      "东南亚"
     ],
     "title": "真腊成为一个新兴的独立王国",
     "desc": "6世纪下，真腊成为一个新兴的独立王国，后分裂为水真腊（柬埔寨）与陆真腊（老挝）。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 661,
     "yearEnd": 750,
     "yearLabel": "661",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯"
     ],
     "title": "倭马亚王朝",
     "desc": "661—750年，倭马亚王朝，定都大马士革，这是阿拉伯国家大规模扩张时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 28,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 675,
     "yearEnd": 935,
     "yearLabel": "675",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "朝鲜半岛",
     "countries": [
      "朝鲜半岛"
     ],
     "title": "新罗统一朝鲜半岛",
     "desc": "675—935年，新罗统一朝鲜半岛。",
     "src": {
      "book": "中外历史对比年表",
      "page": 29,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 680,
     "yearEnd": null,
     "yearLabel": "680",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯"
     ],
     "title": "卡尔巴拉事件与什叶派形成",
     "desc": "680年，伊斯兰教第四任哈里发阿里次子侯赛因在卡尔巴拉遭到倭马亚王朝军队袭击身亡。卡尔巴拉事件明显激化了穆斯林内部的矛盾冲突，什叶派作为政治反对派渐趋形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 29,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 650,
     "yearEnd": null,
     "yearLabel": "650",
     "yearKind": "anchor",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "中亚"
     ],
     "title": "中国纸由中亚陆路传到印度",
     "desc": "7世纪末，中国纸由中亚陆路传到印度，后又传去造纸术。",
     "src": {
      "book": "中外历史对比年表",
      "page": 29,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 650,
     "yearEnd": null,
     "yearLabel": "650",
     "yearKind": "anchor",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "阿拉伯",
      "印度"
     ],
     "title": "伊斯兰教随着阿拉伯人的入侵开始传入印度",
     "desc": "8世纪初，伊斯兰教随着阿拉伯人的入侵开始传入印度。",
     "src": {
      "book": "中外历史对比年表",
      "page": 29,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b53",
   "year": 710,
   "yearLabel": "710",
   "pages": [
    29,
    30
   ],
   "china": [
    {
     "year": 710,
     "yearEnd": null,
     "yearLabel": "710",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐中宗皇后韦氏干政",
     "desc": "710年，唐中宗皇后韦氏干政，毒死中宗，图谋窃位，史称“韦后之乱”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 29,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 713,
     "yearEnd": 741,
     "yearLabel": "713",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐玄宗开元年间",
     "desc": "713—741年，唐玄宗开元年间，社会安定，政治清明，经济繁荣，史称“开元盛世”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 29,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 735,
     "yearEnd": 812,
     "yearLabel": "735",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "杜佑",
     "desc": "735—812年，杜佑，唐代史学家，创立“政书体”，著《通典》，这是中国第一部记载历代典章制度沿革的通史。",
     "src": {
      "book": "中外历史对比年表",
      "page": 30,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 737,
     "yearEnd": null,
     "yearLabel": "737",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "契丹汗国在希拉木伦河流域建立",
     "desc": "737年，契丹汗国在希拉木伦河流域建立。遥辇氏出任可汗，耶律家族任军事统帅。",
     "src": {
      "book": "中外历史对比年表",
      "page": 30,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 751,
     "yearEnd": null,
     "yearLabel": "751",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国造纸术传入大食",
     "desc": "751年，中国造纸术传入大食，后经中亚渐次传入欧洲，结束了欧洲使用草纸和羊皮纸的历史。",
     "src": {
      "book": "中外历史对比年表",
      "page": 30,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 754,
     "yearEnd": null,
     "yearLabel": "754",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "鉴真和尚东渡日本",
     "desc": "754年，鉴真和尚东渡日本，传播佛教和汉文化，为中日友好做出贡献。",
     "src": {
      "book": "中外历史对比年表",
      "page": 30,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 724,
     "yearEnd": 781,
     "yearLabel": "724",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本天平时代，是中国唐代文化输入的极盛时期",
     "desc": "724—781年，日本天平时代，是中国唐代文化输入的极盛时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 29,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 726,
     "yearEnd": 843,
     "yearLabel": "726",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "基督教会"
     ],
     "title": "圣像破坏运动",
     "desc": "726—843年，圣像破坏运动，教会和修道院地产被大量没收、重新分配，推动了拜占庭封建关系的发展。",
     "src": {
      "book": "中外历史对比年表",
      "page": 29,
      "row": 10,
      "col": "外国"
     }
    },
    {
     "year": 732,
     "yearEnd": null,
     "yearLabel": "732",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯",
      "基督教会",
      "法兰克",
      "欧洲"
     ],
     "title": "普瓦提埃战役",
     "desc": "732年，普瓦提埃战役，法兰克王国宫相查理·马特击败入侵的阿拉伯人，使基督教欧洲免遭伊斯兰教威胁。",
     "src": {
      "book": "中外历史对比年表",
      "page": 30,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 734,
     "yearEnd": null,
     "yearLabel": "734",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "在唐多年的日本留学生吉备真备回国",
     "desc": "734年，在唐多年的日本留学生吉备真备回国，带走很多重要文物典籍，促进了中日文化交流。",
     "src": {
      "book": "中外历史对比年表",
      "page": 30,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 751,
     "yearEnd": null,
     "yearLabel": "751",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "法兰克"
     ],
     "title": "法兰克宫相矮子丕平被贵族推选为国王",
     "desc": "751年，法兰克宫相矮子丕平被贵族推选为国王，教皇特使为其加冕，加洛林王朝开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 30,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 754,
     "yearEnd": null,
     "yearLabel": "754",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "基督教会",
      "法兰克",
      "欧洲"
     ],
     "title": "丕平献土奠定教皇国基础",
     "desc": "754、756年，法兰克国王矮子丕平两次出兵意大利，打败伦巴第人，把罗马附近和拉文纳总督区交给教皇统治，史称“丕平献土”，由此奠定了教皇国基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 30,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b54",
   "year": 755,
   "yearLabel": "755",
   "pages": [
    30,
    31
   ],
   "china": [
    {
     "year": 755,
     "yearEnd": 763,
     "yearLabel": "755",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "安史之乱",
     "desc": "755—763年，安史之乱，安禄山、史思明起兵叛乱，打破了唐朝大一统局面，社会经济遭到巨大破坏，盛唐转衰。",
     "src": {
      "book": "中外历史对比年表",
      "page": 30,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 755,
     "yearEnd": null,
     "yearLabel": "755",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "期以后",
     "desc": "8世纪中期以后，均田制逐渐崩溃，土地私有制和土地买卖的发展，使庶族地主开始成为社会主导势力。",
     "src": {
      "book": "中外历史对比年表",
      "page": 30,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 733,
     "yearEnd": 804,
     "yearLabel": "733",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "“茶圣”陆羽",
     "desc": "733—804年，“茶圣”陆羽，著《茶经》，这是世界上第一部茶学专著。",
     "src": {
      "book": "中外历史对比年表",
      "page": 31,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 755,
     "yearEnd": null,
     "yearLabel": "755",
     "yearKind": "anchor",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯"
     ],
     "title": "阿拉伯帝国基本形成",
     "desc": "8世纪上，阿拉伯帝国基本形成，横跨欧亚非三洲，在当时世界上疆域最大。",
     "src": {
      "book": "中外历史对比年表",
      "page": 30,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 750,
     "yearEnd": 1258,
     "yearLabel": "750",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯"
     ],
     "title": "阿拔斯王朝",
     "desc": "750—1258年，阿拔斯王朝，都于巴格达，初期为阿拉伯帝国鼎盛时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 31,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 756,
     "yearEnd": 1492,
     "yearLabel": "756",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯",
      "欧洲"
     ],
     "title": "科尔多瓦哈里发国家",
     "desc": "756—1492年，科尔多瓦哈里发国家，即后倭马亚王朝，倭马亚家族后裔在西班牙建立的独立国家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 31,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 768,
     "yearEnd": 814,
     "yearLabel": "768",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰克",
     "countries": [
      "法兰克"
     ],
     "title": "查理大帝",
     "desc": "768—814年，查理大帝，法兰克王国君主，在位期间，法兰克国家达到极盛，史称“查理曼帝国”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 31,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b55",
   "year": 780,
   "yearLabel": "780",
   "pages": [
    31
   ],
   "china": [
    {
     "year": 780,
     "yearEnd": null,
     "yearLabel": "780",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "颁行“两税法”",
     "desc": "780年，颁行“两税法”，主要征收地税与户税，改变了过去征收赋税重身丁而轻资产的弊端。",
     "src": {
      "book": "中外历史对比年表",
      "page": 31,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 781,
     "yearEnd": 784,
     "yearLabel": "781",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "魏博等四地节度使联合起兵反抗中央",
     "desc": "781—784年，魏博等四地节度使联合起兵反抗中央，史称“四镇之乱”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 31,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 789,
     "yearEnd": null,
     "yearLabel": "789",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐朝军队大败吐蕃军",
     "desc": "789年，唐朝军队大败吐蕃军，收复吐蕃攻占的土地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 31,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 788,
     "yearEnd": 868,
     "yearLabel": "788",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "阿拉伯",
      "非洲"
     ],
     "title": "摩洛哥、突尼斯、埃及先后独立",
     "desc": "788—868年，摩洛哥、突尼斯、埃及先后独立，阿拉伯帝国失去了对非洲各省区的控制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 31,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 788,
     "yearEnd": 974,
     "yearLabel": "788",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯",
      "非洲"
     ],
     "title": "摩洛哥伊德利斯王朝时期，大批什叶派穆斯林移居摩洛哥",
     "desc": "788—974年，摩洛哥伊德利斯王朝时期，大批什叶派穆斯林移居摩洛哥，非斯成为当时什叶派伊斯兰教的传播中心。",
     "src": {
      "book": "中外历史对比年表",
      "page": 31,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 794,
     "yearEnd": 1185,
     "yearLabel": "794",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "平安时代，日本政治体制由律令政治向武家政治的转换时期",
     "desc": "794—1185年，平安时代，日本政治体制由律令政治向武家政治的转换时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 31,
      "row": 9,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b56",
   "year": 800,
   "yearLabel": "800",
   "pages": [
    32,
    33
   ],
   "china": [
    {
     "year": 805,
     "yearEnd": null,
     "yearLabel": "805",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "顺宗永贞元年",
     "desc": "805年，顺宗永贞元年，翰林学士王叔文、王伾等领导发动旨在反对宦官专权的政治革新运动，史称“永贞革新”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 32,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 805,
     "yearEnd": null,
     "yearLabel": "805",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "永贞革新失败",
     "desc": "805年，永贞革新失败，王叔文被处死，王伾被贬，参与革新的韩晔等八位名士被贬为边州司马，史称“二王八司马事件”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 32,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 806,
     "yearEnd": 818,
     "yearLabel": "806",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宪宗元和年间实施平藩计划",
     "desc": "806—818年，宪宗元和年间实施平藩计划，陷于强藩60余年的河北、山东、河南等地重归政府管辖，唐王朝复归统一，史称“元和中兴”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 32,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 821,
     "yearEnd": null,
     "yearLabel": "821",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐朝与吐蕃会盟",
     "desc": "821年，唐朝与吐蕃会盟，在拉萨建长庆会盟碑，强调汉藏永远和睦相处。",
     "src": {
      "book": "中外历史对比年表",
      "page": 32,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 821,
     "yearEnd": 846,
     "yearLabel": "821",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "牛李党争",
     "desc": "821—846年，牛李党争，以牛僧孺和李德裕为代表的两派官僚之间为争权夺势而起的冲突。",
     "src": {
      "book": "中外历史对比年表",
      "page": 32,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 835,
     "yearEnd": null,
     "yearLabel": "835",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "文宗起用李训等人再次谋划打击宦官势力",
     "desc": "835年，文宗起用李训等人再次谋划打击宦官势力，诡称宫内石榴夜降甘露，以伏兵诱杀，失败后牵连受害者不计其数，史称“甘露之变”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 32,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 845,
     "yearEnd": null,
     "yearLabel": "845",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐武宗采取大规模灭佛行动",
     "desc": "845年，唐武宗采取大规模灭佛行动，拆毁寺院，令僧尼还俗。",
     "src": {
      "book": "中外历史对比年表",
      "page": 33,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 859,
     "yearEnd": null,
     "yearLabel": "859",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "裘甫在浙东领导农民起义",
     "desc": "859年，裘甫在浙东领导农民起义，揭开唐末农民起义序幕。",
     "src": {
      "book": "中外历史对比年表",
      "page": 33,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 868,
     "yearEnd": null,
     "yearLabel": "868",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "庞勋领导桂林戍卒起义",
     "desc": "868年，庞勋领导桂林戍卒起义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 33,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 800,
     "yearEnd": null,
     "yearLabel": "800",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰克",
     "countries": [
      "法兰克"
     ],
     "title": "法兰克国王查理加冕为帝",
     "desc": "800年，法兰克国王查理加冕为帝，成为西方最高世俗统治者。",
     "src": {
      "book": "中外历史对比年表",
      "page": 32,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 800,
     "yearEnd": 909,
     "yearLabel": "800",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯",
      "非洲"
     ],
     "title": "阿格拉布王朝时期，统治今阿尔及利亚和突尼斯地区",
     "desc": "800—909年，阿格拉布王朝时期，统治今阿尔及利亚和突尼斯地区，其中心开拉万被视为伊斯兰教第四圣地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 32,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 800,
     "yearEnd": null,
     "yearLabel": "800",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "封建庄园在西欧流行",
     "desc": "9世纪起，封建庄园，一种新的农业经济组织形式，在西欧流行。",
     "src": {
      "book": "中外历史对比年表",
      "page": 32,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 814,
     "yearEnd": null,
     "yearLabel": "814",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯"
     ],
     "title": "巴格达哈里发阿尔·乌蒙在美索不达米亚组织测量子午线",
     "desc": "814年，巴格达哈里发阿尔·乌蒙在美索不达米亚组织测量子午线。",
     "src": {
      "book": "中外历史对比年表",
      "page": 32,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 816,
     "yearEnd": 837,
     "yearLabel": "816",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "阿拉伯"
     ],
     "title": "阿拔斯王朝巴贝克起义",
     "desc": "816—837年，阿拔斯王朝巴贝克起义，席卷阿塞拜疆、亚美尼亚和波斯西部的广大地区，沉重打击了阿拉伯哈里发政权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 32,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 842,
     "yearEnd": null,
     "yearLabel": "842",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰克",
     "countries": [
      "法兰克"
     ],
     "title": "《斯特拉斯堡誓言》",
     "desc": "842年，《斯特拉斯堡誓言》，秃头查理和日耳曼路易在斯特拉斯堡立誓结盟，誓言用两种语言表达，说明法德两国的本族语言已形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 33,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 843,
     "yearEnd": null,
     "yearLabel": "843",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰克",
     "countries": [
      "法兰克"
     ],
     "title": "《凡尔登条约》",
     "desc": "843年，《凡尔登条约》，查理大帝三个孙子洛泰尔、日耳曼路易和秃头查理缔结，三分帝国为中、东、西法兰克王国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 33,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 862,
     "yearEnd": null,
     "yearLabel": "862",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗斯",
     "countries": [
      "罗斯"
     ],
     "title": "瓦里亚格人留里克兄弟",
     "desc": "862年，瓦里亚格人留里克兄弟，在诺夫哥罗德建立古罗斯国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 33,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 869,
     "yearEnd": 883,
     "yearLabel": "869",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "阿拉伯"
     ],
     "title": "阿拔斯王朝黑奴起义",
     "desc": "869—883年，阿拔斯王朝黑奴起义，一度控制伊拉克南部和波斯西南部的广阔地区，沉重打击了阿拉伯哈里发政权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 33,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b57",
   "year": 870,
   "yearLabel": "870",
   "pages": [
    33,
    34,
    35
   ],
   "china": [
    {
     "year": 874,
     "yearEnd": null,
     "yearLabel": "874",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "王仙芝、黄巢起义爆发",
     "desc": "874年，王仙芝、黄巢起义爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 33,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 881,
     "yearEnd": 883,
     "yearLabel": "881",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "黄巢攻陷长安",
     "desc": "881—883年，黄巢攻陷长安，建立政权，国号大齐。",
     "src": {
      "book": "中外历史对比年表",
      "page": 33,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 870,
     "yearEnd": null,
     "yearLabel": "870",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐朝时期，中央机构实行三省六部制",
     "desc": "唐朝时期，中央机构实行三省六部制，明确了立法、行政、监察的职权范围。",
     "src": {
      "book": "中外历史对比年表",
      "page": 34,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 870,
     "yearEnd": null,
     "yearLabel": "870",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐朝修撰了现存中国最古老的法典《唐律》",
     "desc": "唐朝修撰了现存中国最古老的法典《唐律》，对古代东亚各国法律制度影响深远。",
     "src": {
      "book": "中外历史对比年表",
      "page": 34,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 870,
     "yearEnd": null,
     "yearLabel": "870",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐朝学校教育体系完善",
     "desc": "唐朝学校教育体系完善，地方州县设置官学，准许百姓任立私学。",
     "src": {
      "book": "中外历史对比年表",
      "page": 34,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 870,
     "yearEnd": null,
     "yearLabel": "870",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐朝礼乐制度体系高度发展",
     "desc": "唐朝礼乐制度体系高度发展，形成“礼治”局面；随着礼乐制度向外传播，东亚文化圈开始形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 34,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 870,
     "yearEnd": null,
     "yearLabel": "870",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐代印染业出现的夹缬染法,是中国早期印染技术的伟大创造",
     "desc": "唐代印染业出现的夹缬染法,是中国早期印染技术的伟大创造。",
     "src": {
      "book": "中外历史对比年表",
      "page": 34,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 870,
     "yearEnd": null,
     "yearLabel": "870",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "唐代发明三彩陶器",
     "desc": "唐代发明三彩陶器，有马、骆驼、人俑等造型，釉彩多为黄、绿、蓝三色，故名“唐三彩”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 34,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 870,
     "yearEnd": null,
     "yearLabel": "870",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "金属铸造业已经使用简单的机床进行切削加工",
     "desc": "金属铸造业已经使用简单的机床进行切削加工，这是中国机器工业史上的重要阶段。",
     "src": {
      "book": "中外历史对比年表",
      "page": 34,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 870,
     "yearEnd": null,
     "yearLabel": "870",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "造船业发达",
     "desc": "造船业发达，远洋运输海船驰名世界，长20余丈，载客六七百人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 34,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 870,
     "yearEnd": null,
     "yearLabel": "870",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "基督教的聂斯托利派（也称景教）传入中国",
     "desc": "基督教的聂斯托利派（也称景教）传入中国，宋初基本灭绝。",
     "src": {
      "book": "中外历史对比年表",
      "page": 35,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 892,
     "yearEnd": 979,
     "yearLabel": "892",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南方地区先后存在的九个政权与北方河东地区的北汉政权",
     "desc": "892—979年，南方地区先后存在的九个政权与北方河东地区的北汉政权，一同被称为“十国”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 35,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 893,
     "yearEnd": 978,
     "yearLabel": "893",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "吴越政权",
     "desc": "893—978年，吴越政权，唐末江浙一带的割据军阀钱镠，后被后梁封为吴越王，后归降北宋。",
     "src": {
      "book": "中外历史对比年表",
      "page": 35,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 897,
     "yearEnd": 945,
     "yearLabel": "897",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "闽政权",
     "desc": "897—945年，闽政权，领福建七州之地，唐将领王审知后被后梁封为闽王，为南唐所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 35,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 902,
     "yearEnd": 937,
     "yearLabel": "902",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "吴国",
     "desc": "902—937年，吴国，军阀混战中壮大的唐朝将领杨行密建立，都扬州，后为南唐取代。",
     "src": {
      "book": "中外历史对比年表",
      "page": 35,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 907,
     "yearEnd": 960,
     "yearLabel": "907",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "以北方黄河中下游为中心的中原地区",
     "desc": "907—960年，以北方黄河中下游为中心的中原地区，先后建立五个割据政权，史称“五代”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 35,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 907,
     "yearEnd": null,
     "yearLabel": "907",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "叛变降唐的农民起义军将领朱温废帝自立",
     "desc": "907年，叛变降唐的农民起义军将领朱温废帝自立，国号梁，史称“后梁”，都开封。",
     "src": {
      "book": "中外历史对比年表",
      "page": 35,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 907,
     "yearEnd": 925,
     "yearLabel": "907",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "前蜀政权",
     "desc": "907—925年，前蜀政权，在镇压唐末农民起义中逐渐壮大的王建在成都建立，为后唐所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 35,
      "row": 9,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 870,
     "yearEnd": null,
     "yearLabel": "870",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰克",
     "countries": [
      "法兰克"
     ],
     "title": "《墨尔森条约》",
     "desc": "870年，《墨尔森条约》，日耳曼路易和秃头查理签订，瓜分中法兰克王国，为法德意奠定了领土基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 33,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 871,
     "yearEnd": 899,
     "yearLabel": "871",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "北欧"
     ],
     "title": "艾尔弗雷德大帝在位",
     "desc": "871—899年，艾尔弗雷德大帝在位，英国威塞克斯王国著名的国王，在反抗丹麦人入侵中取得胜利，与丹麦人划地为界，使英格兰免于灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 33,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 882,
     "yearEnd": null,
     "yearLabel": "882",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗斯",
     "countries": [
      "罗斯"
     ],
     "title": "罗斯国迁都基辅",
     "desc": "882年，罗斯国迁都基辅，始称基辅罗斯。",
     "src": {
      "book": "中外历史对比年表",
      "page": 34,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 883,
     "yearEnd": null,
     "yearLabel": "883",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "北欧"
     ],
     "title": "丹麦王戈尔姆以强力禁止基督教传播",
     "desc": "883年，丹麦王戈尔姆以强力禁止基督教传播，同时征服国内独立的部族领袖。",
     "src": {
      "book": "中外历史对比年表",
      "page": 34,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 887,
     "yearEnd": null,
     "yearLabel": "887",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯",
      "欧洲"
     ],
     "title": "阿拉伯人进攻小亚细亚",
     "desc": "887年，阿拉伯人进攻小亚细亚，并企图重新入侵意大利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 34,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 893,
     "yearEnd": 911,
     "yearLabel": "893",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及"
     ],
     "title": "北非各地纷纷脱离埃及统治",
     "desc": "893—911年，北非各地纷纷脱离埃及统治，成立若干独立小国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 35,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 870,
     "yearEnd": null,
     "yearLabel": "870",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "西欧农业推广重犁与三田制",
     "desc": "10世纪起，西欧农业生产普及了重犁，推广三田制，生产力水平提高。",
     "src": {
      "book": "中外历史对比年表",
      "page": 35,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 870,
     "yearEnd": null,
     "yearLabel": "870",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "欧洲"
     ],
     "title": "克吕尼运动",
     "desc": "10—11世纪，克吕尼运动，克吕尼派修士在西欧天主教会内部发动的改革运动，旨在加强教皇权力，创立教会对世俗权力的独立性。",
     "src": {
      "book": "中外历史对比年表",
      "page": 35,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 909,
     "yearEnd": 1171,
     "yearLabel": "909",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "阿拉伯"
     ],
     "title": "法蒂玛王朝",
     "desc": "909—1171年，法蒂玛王朝，兴起于西北非地区，后政治重心移至埃及，反对阿拔斯王朝的宗教领袖地位，尊崇什叶派伊斯兰教。",
     "src": {
      "book": "中外历史对比年表",
      "page": 35,
      "row": 9,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b58",
   "year": 910,
   "yearLabel": "910",
   "pages": [
    36
   ],
   "china": [
    {
     "year": 916,
     "yearEnd": null,
     "yearLabel": "916",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "耶律阿保机建元",
     "desc": "916年，耶律阿保机建元，国号契丹（后改国号大辽），立国200余年，先后与中原地带的五代及北宋政权南北并立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 36,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 917,
     "yearEnd": 971,
     "yearLabel": "917",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南汉政权",
     "desc": "917—971年，南汉政权，后梁封臣南海王刘隐之弟刘岩建立，据两广之地，为北宋所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 36,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 923,
     "yearEnd": null,
     "yearLabel": "923",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "故唐节度使李克用之子李存勖灭后梁",
     "desc": "923年，故唐节度使李克用之子李存勖灭后梁，建立后唐，都洛阳，控制黄河南北广大地区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 36,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 925,
     "yearEnd": 963,
     "yearLabel": "925",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "荆南（也称南平）政权",
     "desc": "925—963年，荆南（也称南平）政权，据江陵地区，朱温部将高季兴被后唐封为南平王，始建政权，十国中占地最少、势力最弱。",
     "src": {
      "book": "中外历史对比年表",
      "page": 36,
      "row": 9,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 910,
     "yearEnd": null,
     "yearLabel": "910",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "法兰西"
     ],
     "title": "法国阿奎丹公爵威廉划出猎场的一块土地",
     "desc": "910年，法国阿奎丹公爵威廉划出猎场的一块土地，创立克吕尼修道院。",
     "src": {
      "book": "中外历史对比年表",
      "page": 36,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 911,
     "yearEnd": null,
     "yearLabel": "911",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法王天真汉查理将塞纳河口一带封赐给诺曼人首领罗洛",
     "desc": "911年，法王天真汉查理将塞纳河口一带封赐给诺曼人首领罗洛，形成诺曼底公爵领。",
     "src": {
      "book": "中外历史对比年表",
      "page": 36,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 911,
     "yearEnd": null,
     "yearLabel": "911",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰克",
     "countries": [
      "法兰克"
     ],
     "title": "康拉德公爵被举为王",
     "desc": "911年，康拉德公爵被举为王，加洛林家族在东法兰克王国统治结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 36,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 918,
     "yearEnd": 1396,
     "yearLabel": "918",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "朝鲜半岛",
     "countries": [
      "朝鲜半岛"
     ],
     "title": "朝鲜半岛高丽王朝统治时期",
     "desc": "918—1396年，朝鲜半岛高丽王朝统治时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 36,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 919,
     "yearEnd": null,
     "yearLabel": "919",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "萨克森公爵亨利被选为王",
     "desc": "919年，萨克森公爵亨利被选为王，德意志王国开始萨克森王朝的统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 36,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 925,
     "yearEnd": 939,
     "yearLabel": "925",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英格兰王埃塞斯坦在位时期，把整个英格兰北部统一到威塞克斯王朝内",
     "desc": "925—939年，英格兰王埃塞斯坦在位时期，把整个英格兰北部统一到威塞克斯王朝内，建立威塞克斯王国在北方的优势。",
     "src": {
      "book": "中外历史对比年表",
      "page": 36,
      "row": 9,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b59",
   "year": 930,
   "yearLabel": "930",
   "pages": [
    37
   ],
   "china": [
    {
     "year": 927,
     "yearEnd": 951,
     "yearLabel": "927",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "楚国",
     "desc": "927—951年，楚国，占据湖南，靠镇压农民起义壮大的唐将马殷，被后唐封为楚国王，始建政权，为南唐所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 37,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 934,
     "yearEnd": 965,
     "yearLabel": "934",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "后蜀政权",
     "desc": "934—965年，后蜀政权，后唐部将孟知祥在成都建立，为北宋所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 37,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 936,
     "yearEnd": null,
     "yearLabel": "936",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "后唐节度使石敬瑭起兵叛唐",
     "desc": "936年，后唐节度使石敬瑭起兵叛唐，在辽帮助下建国称帝，国号为晋，史称“后晋”，后唐亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 37,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 937,
     "yearEnd": 975,
     "yearLabel": "937",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南唐政权",
     "desc": "937—975年，南唐政权，吴国权臣徐温养子徐知诰（本姓李）所建，定都金陵。后发展为十国中最强大的国家，后主李煜在位时为北宋所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 37,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 930,
     "yearEnd": null,
     "yearLabel": "930",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "北欧",
     "countries": [
      "北欧"
     ],
     "title": "挪威人占领了冰岛大部分可居地",
     "desc": "930年，挪威人占领了冰岛大部分可居地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 37,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 937,
     "yearEnd": null,
     "yearLabel": "937",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "法兰西",
      "欧洲"
     ],
     "title": "马扎尔人企图进攻德意志王国失败",
     "desc": "937年，马扎尔人企图进攻德意志王国失败，转而向法兰西王国入侵。",
     "src": {
      "book": "中外历史对比年表",
      "page": 37,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 939,
     "yearEnd": null,
     "yearLabel": "939",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "越南",
     "countries": [
      "越南"
     ],
     "title": "越南摆脱中国封建政权的长期统治",
     "desc": "939年，越南摆脱中国封建政权的长期统治，成为独立国家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 37,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b60",
   "year": 940,
   "yearLabel": "940",
   "pages": [
    37,
    38
   ],
   "china": [
    {
     "year": 947,
     "yearEnd": null,
     "yearLabel": "947",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "辽太宗进占后晋都城东京",
     "desc": "947年，辽太宗进占后晋都城东京，灭后晋。退军途中，辽太宗总结了此次南下的三个错误，即史上有名的“三失之训”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 37,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 947,
     "yearEnd": null,
     "yearLabel": "947",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "后晋节度使刘知远于晋阳（后迁都东京）称帝",
     "desc": "947年，后晋节度使刘知远于晋阳（后迁都东京）称帝，国号汉，史称“后汉”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 37,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 951,
     "yearEnd": 979,
     "yearLabel": "951",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北汉政权",
     "desc": "951—979年，北汉政权，刘知远之弟刘崇于后汉灭亡后，在晋阳所建，依附于辽，为北宋灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 38,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 951,
     "yearEnd": null,
     "yearLabel": "951",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "后汉枢密使郭威在汴梁被部下拥立为帝",
     "desc": "951年，后汉枢密使郭威在汴梁被部下拥立为帝，建立后周。",
     "src": {
      "book": "中外历史对比年表",
      "page": 38,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 954,
     "yearEnd": 959,
     "yearLabel": "954",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "后周世宗在位",
     "desc": "954—959年，后周世宗在位，推行一系列改革措施，使国力大大加强，为统一全国奠定了基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 38,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 940,
     "yearEnd": null,
     "yearLabel": "940",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "吴越建筑师喻皓著《木经》",
     "desc": "约10世纪，吴越建筑师喻皓著《木经》，总结了木结构建筑技术的经验，是中国古代建筑学名著。",
     "src": {
      "book": "中外历史对比年表",
      "page": 38,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 941,
     "yearEnd": null,
     "yearLabel": "941",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊",
      "罗马",
      "罗斯"
     ],
     "title": "基辅罗斯大公伊戈尔率舰队进攻君士坦丁堡",
     "desc": "941年，基辅罗斯大公伊戈尔率舰队进攻君士坦丁堡，被“希腊火”攻击，失败而退。",
     "src": {
      "book": "中外历史对比年表",
      "page": 37,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 950,
     "yearEnd": null,
     "yearLabel": "950",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "德意志国王奥托一世征服波西米亚",
     "desc": "950年，德意志国王奥托一世征服波西米亚。",
     "src": {
      "book": "中外历史对比年表",
      "page": 38,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 955,
     "yearEnd": null,
     "yearLabel": "955",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "德意志国王奥托一世在奥格斯堡附近大败马扎尔人",
     "desc": "955年，德意志国王奥托一世在奥格斯堡附近大败马扎尔人，解除其威胁。",
     "src": {
      "book": "中外历史对比年表",
      "page": 38,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b61",
   "year": 960,
   "yearLabel": "960",
   "pages": [
    38,
    39
   ],
   "china": [
    {
     "year": 960,
     "yearEnd": null,
     "yearLabel": "960",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "后周禁军统帅赵匡胤在开封东北的陈桥驿发动兵变",
     "desc": "960年，后周禁军统帅赵匡胤在开封东北的陈桥驿发动兵变，即位称帝，改国号宋，是为宋太祖，后周灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 38,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 961,
     "yearEnd": null,
     "yearLabel": "961",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "赵匡胤“杯酒释兵权”",
     "desc": "961年，赵匡胤“杯酒释兵权”，解除大将兵权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 38,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 979,
     "yearEnd": null,
     "yearLabel": "979",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北宋基本完成了对黄河中下游的中原及长江流域的统一",
     "desc": "979年，北宋基本完成了对黄河中下游的中原及长江流域的统一。此时北方还有与北宋对峙的辽朝、割据西北的党项族夏州政权、西南控制洱海地区的大理政权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 39,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 986,
     "yearEnd": null,
     "yearLabel": "986",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宋太宗雍熙三年",
     "desc": "986年，宋太宗雍熙三年，发动对辽朝进攻后失败，史称“雍熙北伐”。此后北宋对辽采取消极防御策略。",
     "src": {
      "book": "中外历史对比年表",
      "page": 39,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 960,
     "yearEnd": null,
     "yearLabel": "960",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北宋初年，火药开始应用于军事",
     "desc": "10世纪下，北宋初年，火药开始应用于军事，火药武器广泛使用。",
     "src": {
      "book": "中外历史对比年表",
      "page": 39,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 993,
     "yearEnd": null,
     "yearLabel": "993",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "王小波领导青城农民起义",
     "desc": "993年，王小波领导青城农民起义，提出“均贫富”的口号。",
     "src": {
      "book": "中外历史对比年表",
      "page": 39,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 961,
     "yearEnd": null,
     "yearLabel": "961",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯",
      "希腊",
      "罗马"
     ],
     "title": "占领克里特岛一个半世纪的阿拉伯人被拜占庭军队逐出",
     "desc": "961年，占领克里特岛一个半世纪的阿拉伯人被拜占庭军队逐出。",
     "src": {
      "book": "中外历史对比年表",
      "page": 38,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 962,
     "yearEnd": null,
     "yearLabel": "962",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "基督教会",
      "德意志"
     ],
     "title": "教皇为德国萨克森王朝的奥托一世加冕",
     "desc": "962年，教皇为德国萨克森王朝的奥托一世加冕，德国始称“神圣罗马帝国”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 38,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 975,
     "yearEnd": 996,
     "yearLabel": "975",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯"
     ],
     "title": "哈里发阿齐兹在位",
     "desc": "975—996年，哈里发阿齐兹在位，法蒂玛王朝达到极盛，统治区域从大西洋沿岸到幼发拉底河上游。",
     "src": {
      "book": "中外历史对比年表",
      "page": 38,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 987,
     "yearEnd": null,
     "yearLabel": "987",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法兰西大贵族休·加佩被贵族推举为王",
     "desc": "987年，法兰西大贵族休·加佩被贵族推举为王，法国开始加佩王朝的统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 39,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 987,
     "yearEnd": 1328,
     "yearLabel": "987",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国加佩王朝时期，王权逐渐增强",
     "desc": "987—1328年，法国加佩王朝时期，王权逐渐增强，国家统一进程起步。",
     "src": {
      "book": "中外历史对比年表",
      "page": 39,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 960,
     "yearEnd": null,
     "yearLabel": "960",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "波兰基本上完成了国家的初步统一",
     "desc": "10世纪末，波兰基本上完成了国家的初步统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 39,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b62",
   "year": 1000,
   "yearLabel": "1000",
   "pages": [
    39,
    40
   ],
   "china": [
    {
     "year": 1002,
     "yearEnd": null,
     "yearLabel": "1002",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "党项族人李继迁集合各部",
     "desc": "1002年，党项族人李继迁集合各部，攻陷灵州，改为西平府，自称西平王，奠定了西夏国的基业。",
     "src": {
      "book": "中外历史对比年表",
      "page": 39,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1004,
     "yearEnd": null,
     "yearLabel": "1004",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北宋与辽在澶州议和",
     "desc": "1004年，北宋与辽在澶州议和，缔结“澶渊之盟”，此后双方持续了百余年的相对和平。",
     "src": {
      "book": "中外历史对比年表",
      "page": 39,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1017,
     "yearEnd": 1073,
     "yearLabel": "1017",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "周敦颐",
     "desc": "1017—1073年，周敦颐，北宋儒学濂学学派代表人物，为宋学及理学体系的构成奠定了理论基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 39,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1019,
     "yearEnd": 1086,
     "yearLabel": "1019",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "司马光",
     "desc": "1019—1086年，司马光，宋代成就最大的史学家，著《资治通鉴》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 40,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1000,
     "yearEnd": null,
     "yearLabel": "1000",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "匈牙利王国建立",
     "desc": "1000年，匈牙利王国建立，居民主要是马扎尔人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 39,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1017,
     "yearEnd": 1028,
     "yearLabel": "1017",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "北欧"
     ],
     "title": "丹麦人卡纽特先后成为英格兰君主、丹麦国王和挪威国王",
     "desc": "1017—1028年，丹麦人卡纽特先后成为英格兰君主、丹麦国王和挪威国王，由此组成一个跨越北欧的卡纽特帝国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 39,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1000,
     "yearEnd": null,
     "yearLabel": "1000",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "11—13世纪，西欧中部的香槟集市",
     "desc": "11—13世纪，西欧中部的香槟集市，是当时长途贩运货物最有名的交易场所，也是西欧的货币兑换中心。",
     "src": {
      "book": "中外历史对比年表",
      "page": 40,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b63",
   "year": 1020,
   "yearLabel": "1020",
   "pages": [
    40
   ],
   "china": [
    {
     "year": 1020,
     "yearEnd": 1078,
     "yearLabel": "1020",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张载",
     "desc": "1020—1078年，张载，北宋儒学关学学派代表人物，提出“德性之知”的致知方法，即通过内心修养就可体察天下万物。",
     "src": {
      "book": "中外历史对比年表",
      "page": 40,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1031,
     "yearEnd": 1095,
     "yearLabel": "1031",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "沈括",
     "desc": "1031—1095年，沈括，北宋科学家，著《梦溪笔谈》，记录了当时中国科技发展的最高成就；在实验中发现地磁偏角现象，使中国成为世界上最早记录地磁偏角的国家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 40,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1032,
     "yearEnd": 1085,
     "yearLabel": "1032",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "程颢",
     "desc": "1032—1085年，程颢，北宋儒学洛学学派代表人物，把“天理”作为哲学最高范畴，提出“存天理，去人欲”的伦理修养方法。",
     "src": {
      "book": "中外历史对比年表",
      "page": 40,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1033,
     "yearEnd": 1107,
     "yearLabel": "1033",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "程颐",
     "desc": "1033—1107年，程颐，北宋儒学洛学学派代表人物，与程颢并称“二程”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 40,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1038,
     "yearEnd": null,
     "yearLabel": "1038",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西北党项族首领李元昊称帝建国",
     "desc": "1038年，西北党项族首领李元昊称帝建国，国号大夏，都兴庆府（今宁夏银川），史称“西夏”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 40,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1024,
     "yearEnd": 1125,
     "yearLabel": "1024",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰克",
     "countries": [
      "法兰克",
      "德意志"
     ],
     "title": "德国历史上的法兰克尼亚王朝（也称萨利安王朝）时期",
     "desc": "1024—1125年，德国历史上的法兰克尼亚王朝（也称萨利安王朝）时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 40,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1028,
     "yearEnd": null,
     "yearLabel": "1028",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "北欧",
     "countries": [
      "北欧"
     ],
     "title": "丹麦国王卡纽特征服挪威",
     "desc": "1028年，丹麦国王卡纽特征服挪威。",
     "src": {
      "book": "中外历史对比年表",
      "page": 40,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1032,
     "yearEnd": null,
     "yearLabel": "1032",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "德意志"
     ],
     "title": "勃艮第王国成为神圣罗马帝国的一部分",
     "desc": "1032年，勃艮第王国成为神圣罗马帝国的一部分。",
     "src": {
      "book": "中外历史对比年表",
      "page": 40,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1037,
     "yearEnd": null,
     "yearLabel": "1037",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "西班牙北部的卡斯提尔合并莱昂",
     "desc": "1037年，西班牙北部的卡斯提尔合并莱昂，成为卡斯提尔王国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 40,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b64",
   "year": 1040,
   "yearLabel": "1040",
   "pages": [
    41
   ],
   "china": [
    {
     "year": 1041,
     "yearEnd": 1048,
     "yearLabel": "1041",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北宋庆历年间",
     "desc": "1041—1048年，北宋庆历年间，毕昇发明活字印刷。",
     "src": {
      "book": "中外历史对比年表",
      "page": 41,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1043,
     "yearEnd": null,
     "yearLabel": "1043",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宋仁宗庆历三年",
     "desc": "1043年，宋仁宗庆历三年，范仲淹上奏《答手诏条陈十事》，提出以整顿吏治为核心的改革纲领，仁宗颁诏全国实行，史称“庆历新政”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 41,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1044,
     "yearEnd": null,
     "yearLabel": "1044",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李元昊取消帝号",
     "desc": "1044年，李元昊取消帝号，与北宋议和，西夏对宋称臣，宋册封其为西夏国王。",
     "src": {
      "book": "中外历史对比年表",
      "page": 41,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1044,
     "yearEnd": null,
     "yearLabel": "1044",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "辽兴宗亲率大军进攻西夏",
     "desc": "1044年，辽兴宗亲率大军进攻西夏，史称“河曲之战”，西夏先败后胜，双方议和。",
     "src": {
      "book": "中外历史对比年表",
      "page": 41,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1042,
     "yearEnd": null,
     "yearLabel": "1042",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "北欧"
     ],
     "title": "丹麦世系的国王对英格兰的统治结束",
     "desc": "1042年，丹麦世系的国王对英格兰的统治结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 41,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b65",
   "year": 1060,
   "yearLabel": "1060",
   "pages": [
    41,
    42
   ],
   "china": [
    {
     "year": 1068,
     "yearEnd": 1085,
     "yearLabel": "1068",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宋神宗在位",
     "desc": "1068—1085年，宋神宗在位，任用王安石变法，史称“熙宁变法”，使北宋摆脱危机，达到了富国强兵的预期目标。",
     "src": {
      "book": "中外历史对比年表",
      "page": 41,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1079,
     "yearEnd": null,
     "yearLabel": "1079",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "御史中丞李定等弹劾苏轼作诗诽谤朝廷",
     "desc": "1079年，御史中丞李定等弹劾苏轼作诗诽谤朝廷，很多人受牵连贬官，史称“乌台诗案”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 42,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1059,
     "yearEnd": null,
     "yearLabel": "1059",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会"
     ],
     "title": "拉特兰宗教会议决定",
     "desc": "1059年，拉特兰宗教会议决定，教皇由枢机主教组成的教会会议选举产生。",
     "src": {
      "book": "中外历史对比年表",
      "page": 41,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1066,
     "yearEnd": null,
     "yearLabel": "1066",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰"
     ],
     "title": "法国诺曼底公爵威廉率军渡海峡",
     "desc": "1066年，法国诺曼底公爵威廉率军渡海峡，黑斯廷斯一役依靠新式骑兵获胜，征服英国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 41,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1060,
     "yearEnd": null,
     "yearLabel": "1060",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会"
     ],
     "title": "格里哥利改革",
     "desc": "11世纪下，格里哥利改革，教皇格里哥利七世进行的教会改革，旨在提高教会权力和削弱皇权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 41,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1071,
     "yearEnd": null,
     "yearLabel": "1071",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "法兰西",
      "欧洲"
     ],
     "title": "诺曼人占领亚得里亚海西岸重镇巴里",
     "desc": "1071年，诺曼人占领亚得里亚海西岸重镇巴里，结束了拜占庭帝国在意大利南部的统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 42,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1076,
     "yearEnd": null,
     "yearLabel": "1076",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "法兰西"
     ],
     "title": "德皇亨利四世倡议召开教俗贵族参加的高级宗教会议",
     "desc": "1076年，德皇亨利四世倡议召开教俗贵族参加的高级宗教会议，后演化成帝国议会。",
     "src": {
      "book": "中外历史对比年表",
      "page": 42,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1077,
     "yearEnd": null,
     "yearLabel": "1077",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "基督教会",
      "法兰西",
      "欧洲"
     ],
     "title": "卡诺莎事件",
     "desc": "1077年，卡诺莎事件，德皇亨利四世在意大利北部的卡诺莎城堡向教皇忏悔赎罪，罗马教廷权力达到顶峰。",
     "src": {
      "book": "中外历史对比年表",
      "page": 42,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1081,
     "yearEnd": null,
     "yearLabel": "1081",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "苏格兰出现第一个国王",
     "desc": "1081年，苏格兰出现第一个国王，开始坎莫尔王朝的统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 42,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b66",
   "year": 1085,
   "yearLabel": "1085",
   "pages": [
    42,
    43
   ],
   "china": [
    {
     "year": 1085,
     "yearEnd": null,
     "yearLabel": "1085",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宋哲宗年幼即位",
     "desc": "1085年，宋哲宗年幼即位，反对变法的高太后临朝听政，新法废除殆尽，史称“元祐更化”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 42,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1103,
     "yearEnd": 1142,
     "yearLabel": "1103",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "岳飞",
     "desc": "1103—1142年，岳飞，南宋抗金英雄。",
     "src": {
      "book": "中外历史对比年表",
      "page": 42,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1114,
     "yearEnd": null,
     "yearLabel": "1114",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "女真部落联盟首领完颜阿骨打起兵反辽",
     "desc": "1114年，女真部落联盟首领完颜阿骨打起兵反辽。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1115,
     "yearEnd": null,
     "yearLabel": "1115",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "女真部落联盟首领完颜阿骨打建国称帝",
     "desc": "1115年，女真部落联盟首领完颜阿骨打建国称帝，国号大金，定都会宁府（即“皇帝寨”）。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1119,
     "yearEnd": 1125,
     "yearLabel": "1119",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宣和年间出使高丽的官船上开始使用指南针导航",
     "desc": "1119—1125年，宣和年间出使高丽的官船上开始使用指南针导航。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1120,
     "yearEnd": null,
     "yearLabel": "1120",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "金军攻占辽都上京",
     "desc": "1120年，金军攻占辽都上京，反辽战争取得决定性胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1086,
     "yearEnd": null,
     "yearLabel": "1086",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英王威廉一世下令对全国土地进行调查和登记",
     "desc": "1086年，英王威廉一世下令对全国土地进行调查和登记，其结果被谑称为“末日审判书”，是英国中世纪最早的经济史料。",
     "src": {
      "book": "中外历史对比年表",
      "page": 42,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1095,
     "yearEnd": null,
     "yearLabel": "1095",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "两河流域",
     "countries": [
      "两河流域",
      "十字军",
      "基督教会",
      "欧洲"
     ],
     "title": "教皇乌尔班二世发表演说",
     "desc": "1095年，教皇乌尔班二世发表演说，号召西欧基督徒参加十字军东征。",
     "src": {
      "book": "中外历史对比年表",
      "page": 42,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1096,
     "yearEnd": 1291,
     "yearLabel": "1096",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "十字军",
     "countries": [
      "十字军"
     ],
     "title": "十字军东征",
     "desc": "1096—1291年，十字军东征。",
     "src": {
      "book": "中外历史对比年表",
      "page": 42,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1085,
     "yearEnd": null,
     "yearLabel": "1085",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "欧洲"
     ],
     "title": "法国诺曼底人征服西西里和意大利",
     "desc": "12世纪初，法国诺曼底人征服西西里和意大利，建立西西里王国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 42,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1112,
     "yearEnd": null,
     "yearLabel": "1112",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国琅城起义",
     "desc": "1112年，法国琅城起义，城市居民杀死骗取金钱又拒不放弃领主权的琅城主教，取得自治地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1085,
     "yearEnd": null,
     "yearLabel": "1085",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰"
     ],
     "title": "法国巴黎大学和英国牛津大学先后成立",
     "desc": "12世纪，法国巴黎大学和英国牛津大学先后成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1085,
     "yearEnd": null,
     "yearLabel": "1085",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "西欧出现手工业行会",
     "desc": "约12世纪，西欧出现手工业行会，同行业手工业者的组织，主要是限制外部和内部竞争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1085,
     "yearEnd": null,
     "yearLabel": "1085",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "12—13世纪，西欧艺术的主要表现形式是哥特式教堂建筑",
     "desc": "12—13世纪，西欧艺术的主要表现形式是哥特式教堂建筑。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b67",
   "year": 1120,
   "yearLabel": "1120",
   "pages": [
    43,
    44
   ],
   "china": [
    {
     "year": 1120,
     "yearEnd": null,
     "yearLabel": "1120",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宋徽宗遣使取道海上出使金朝协商攻辽大计",
     "desc": "1120年，宋徽宗遣使取道海上出使金朝协商攻辽大计，双方达成协议，约定共同作战，史称“海上之盟”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1120,
     "yearEnd": null,
     "yearLabel": "1120",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "两浙地区爆发方腊领导的农民起义",
     "desc": "1120年，两浙地区爆发方腊领导的农民起义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1125,
     "yearEnd": null,
     "yearLabel": "1125",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "辽天祚帝在逃跑途中被金军俘获",
     "desc": "1125年，辽天祚帝在逃跑途中被金军俘获，辽朝灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1127,
     "yearEnd": null,
     "yearLabel": "1127",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "金军占领汴京",
     "desc": "1127年，金军占领汴京，废宋徽宗、宋钦宗二帝，北宋灭亡。金军撤离时掠走二帝及宗室、大臣、妃嫔等3000余人，史称“靖康之变”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1127,
     "yearEnd": null,
     "yearLabel": "1127",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "康王赵构在应天府（今河南商丘）即帝位",
     "desc": "1127年，康王赵构在应天府（今河南商丘）即帝位，是为宋高宗，史称“南宋”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 44,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1130,
     "yearEnd": 1200,
     "yearLabel": "1130",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "朱熹",
     "desc": "1130—1200年，朱熹，南宋儒学代表人物，继承周敦颐、“二程”、张载及佛道各家学说，建立起庞大的理学体系。",
     "src": {
      "book": "中外历史对比年表",
      "page": 44,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1122,
     "yearEnd": null,
     "yearLabel": "1122",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "基督教会",
      "德意志"
     ],
     "title": "《沃尔姆斯宗教协定》",
     "desc": "1122年，《沃尔姆斯宗教协定》，神圣罗马帝国皇帝与教皇和解，结束了长达半个多世纪的关于授职权的斗争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1127,
     "yearEnd": null,
     "yearLabel": "1127",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国北部琅城市民再度酝酿起义",
     "desc": "1127年，法国北部琅城市民再度酝酿起义，国王路易六世被迫颁发特许状，准予自治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 43,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1130,
     "yearEnd": null,
     "yearLabel": "1130",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "诺曼人罗杰二世建立西西里王国",
     "desc": "1130年，诺曼人罗杰二世建立西西里王国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 44,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b68",
   "year": 1130,
   "yearLabel": "1130",
   "pages": [
    44,
    45
   ],
   "china": [
    {
     "year": 1131,
     "yearEnd": 1218,
     "yearLabel": "1131",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西辽政权",
     "desc": "1131—1218年，西辽政权，辽朝宗室耶律大石于中亚地区建立，为成吉思汗所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 44,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1132,
     "yearEnd": null,
     "yearLabel": "1132",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "德安守将陈规发明使用了“长竹竿火枪”",
     "desc": "1132年，德安守将陈规发明使用了“长竹竿火枪”，可发火烧伤敌人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 44,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1138,
     "yearEnd": null,
     "yearLabel": "1138",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南宋政权定都临安",
     "desc": "1138年，南宋政权定都临安。",
     "src": {
      "book": "中外历史对比年表",
      "page": 44,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1139,
     "yearEnd": 1193,
     "yearLabel": "1139",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陆九渊",
     "desc": "1139—1193年，陆九渊，南宋儒学代表人物，提出“心即理”的命题，建立了被称为“心学”的理学体系。",
     "src": {
      "book": "中外历史对比年表",
      "page": 44,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1130,
     "yearEnd": null,
     "yearLabel": "1130",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南宋出现管型火药武器",
     "desc": "12世纪上，南宋出现管型火药武器。",
     "src": {
      "book": "中外历史对比年表",
      "page": 45,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1140,
     "yearEnd": null,
     "yearLabel": "1140",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南宋军队在顺昌大败金军",
     "desc": "1140年，南宋军队在顺昌大败金军，遏制了金军南侵的攻势，史称“顺昌大捷”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 45,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1136,
     "yearEnd": null,
     "yearLabel": "1136",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法王路易六世之子与阿奎坦公爵之女结婚",
     "desc": "1136年，法王路易六世之子与阿奎坦公爵之女结婚，由此，阿奎坦归属法王。",
     "src": {
      "book": "中外历史对比年表",
      "page": 44,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1138,
     "yearEnd": 1254,
     "yearLabel": "1138",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国历史上的霍亨斯陶芬王朝时期",
     "desc": "1138—1254年，德国历史上的霍亨斯陶芬王朝时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 44,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b69",
   "year": 1140,
   "yearLabel": "1140",
   "pages": [
    45
   ],
   "china": [
    {
     "year": 1140,
     "yearEnd": null,
     "yearLabel": "1140",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "岳飞指挥岳家军在郾城大败金兀术亲自率领的精锐之师",
     "desc": "1140年，岳飞指挥岳家军在郾城大败金兀术亲自率领的精锐之师，获“郾城大捷”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 45,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1141,
     "yearEnd": null,
     "yearLabel": "1141",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南宋与金达成和议",
     "desc": "1141年，南宋与金达成和议，向金朝称臣，双方划定边界，史称“绍兴和议”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 45,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1142,
     "yearEnd": null,
     "yearLabel": "1142",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "在秦桧的策划下",
     "desc": "1142年，在秦桧的策划下，岳飞以“莫须有”的罪名被杀害。",
     "src": {
      "book": "中外历史对比年表",
      "page": 45,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1140,
     "yearEnd": null,
     "yearLabel": "1140",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "葡萄牙统治者阿方索·亨利改称阿方索一世",
     "desc": "1140年，葡萄牙统治者阿方索·亨利改称阿方索一世，葡萄牙独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 45,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1147,
     "yearEnd": null,
     "yearLabel": "1147",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "被视为莫斯科建城的时间",
     "desc": "1147年，被视为莫斯科建城的时间。",
     "src": {
      "book": "中外历史对比年表",
      "page": 45,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b70",
   "year": 1150,
   "yearLabel": "1150",
   "pages": [
    45,
    46
   ],
   "china": [
    {
     "year": 1151,
     "yearEnd": null,
     "yearLabel": "1151",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "金国皇帝迁都燕京",
     "desc": "1151年，金国皇帝迁都燕京。",
     "src": {
      "book": "中外历史对比年表",
      "page": 45,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1163,
     "yearEnd": null,
     "yearLabel": "1163",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南宋孝宗时与金再次达成和议",
     "desc": "1163年，南宋孝宗时与金再次达成和议，改君臣之国为叔侄之国，南宋地位有所改善，史称“隆兴和议”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 46,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1175,
     "yearEnd": null,
     "yearLabel": "1175",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "朱熹、陆九渊于信州（今江西境）鹅湖寺就治学方法和认识论问题进行辩论",
     "desc": "1175年，朱熹、陆九渊于信州（今江西境）鹅湖寺就治学方法和认识论问题进行辩论，此即中国哲学史上著名的“鹅湖之会”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 46,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1152,
     "yearEnd": 1190,
     "yearLabel": "1152",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "德皇弗里德里希一世在位",
     "desc": "1152—1190年，德皇弗里德里希一世在位，致力于在意大利的扩张。",
     "src": {
      "book": "中外历史对比年表",
      "page": 45,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1150,
     "yearEnd": null,
     "yearLabel": "1150",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国大法官格兰维尔著《英格兰法律与习惯》",
     "desc": "12世纪中，英国大法官格兰维尔著《英格兰法律与习惯》，标志着英格兰习惯法时代到来。",
     "src": {
      "book": "中外历史对比年表",
      "page": 45,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1154,
     "yearEnd": null,
     "yearLabel": "1154",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰"
     ],
     "title": "法国大封建主安茹伯爵成为英国国王",
     "desc": "1154年，法国大封建主安茹伯爵成为英国国王，是为亨利二世，统治地区跨英吉利海峡两岸、英法两国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 45,
      "row": 10,
      "col": "外国"
     }
    },
    {
     "year": 1154,
     "yearEnd": 1399,
     "yearLabel": "1154",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国历史上的安茹王朝（金雀花王朝）时期",
     "desc": "1154—1399年，英国历史上的安茹王朝（金雀花王朝）时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 46,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1171,
     "yearEnd": 1250,
     "yearLabel": "1171",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "阿拉伯"
     ],
     "title": "埃及阿尤布王朝时期，尊崇逊尼派伊斯兰教",
     "desc": "1171—1250年，埃及阿尤布王朝时期，尊崇逊尼派伊斯兰教，恢复了逊尼派伊斯兰教在埃及的统治地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 46,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1175,
     "yearEnd": null,
     "yearLabel": "1175",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯",
      "十字军",
      "非洲"
     ],
     "title": "阿尤布王朝的萨拉丁接受阿拔斯王朝哈里发的册封",
     "desc": "1175年，阿尤布王朝的萨拉丁接受阿拔斯王朝哈里发的册封，获“苏丹”称号。",
     "src": {
      "book": "中外历史对比年表",
      "page": 46,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b71",
   "year": 1180,
   "yearLabel": "1180",
   "pages": [
    46,
    47
   ],
   "china": [
    {
     "year": 1180,
     "yearEnd": null,
     "yearLabel": "1180",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宋淳熙七年",
     "desc": "1180年，宋淳熙七年，颁布法令禁止书坊擅刻书籍。",
     "src": {
      "book": "中外历史对比年表",
      "page": 46,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1187,
     "yearEnd": null,
     "yearLabel": "1187",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "金朝再次申明禁止女真人使用汉姓",
     "desc": "1187年，金朝再次申明禁止女真人使用汉姓，不得学南人的服装。",
     "src": {
      "book": "中外历史对比年表",
      "page": 46,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1197,
     "yearEnd": null,
     "yearLabel": "1197",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "金朝承安二年",
     "desc": "1197年，金朝承安二年，开始铸造银币“承安宝货”，是中国历史上白银成为法定货币之始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 47,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1204,
     "yearEnd": null,
     "yearLabel": "1204",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "铁木真战胜群雄",
     "desc": "1204年，铁木真战胜群雄，统一中国北方大草原。",
     "src": {
      "book": "中外历史对比年表",
      "page": 47,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1206,
     "yearEnd": null,
     "yearLabel": "1206",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒙古各部贵族推选铁木真为全蒙古大汗",
     "desc": "1206年，蒙古各部贵族推选铁木真为全蒙古大汗，号“成吉思汗”，国号“大蒙古国”，蒙古国家由此成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 47,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1211,
     "yearEnd": 1216,
     "yearLabel": "1211",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒙古进行了长达7年之久的对金战争",
     "desc": "1211—1216年，蒙古进行了长达7年之久的对金战争，黄河以北大片地区尽落蒙古之手。",
     "src": {
      "book": "中外历史对比年表",
      "page": 47,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1180,
     "yearEnd": 1223,
     "yearLabel": "1180",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰"
     ],
     "title": "法王菲利普二世在位",
     "desc": "1180—1223年，法王菲利普二世在位，剥夺了英王在法国大陆的大部分领地，使法国王权大大巩固。",
     "src": {
      "book": "中外历史对比年表",
      "page": 46,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1187,
     "yearEnd": null,
     "yearLabel": "1187",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "以色列",
     "countries": [
      "以色列",
      "十字军",
      "欧洲"
     ],
     "title": "阿尤布王朝的萨拉丁率穆斯林军队击败欧洲十字军",
     "desc": "1187年，阿尤布王朝的萨拉丁率穆斯林军队击败欧洲十字军，收复耶路撒冷。",
     "src": {
      "book": "中外历史对比年表",
      "page": 46,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1191,
     "yearEnd": null,
     "yearLabel": "1191",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "十字军",
     "countries": [
      "十字军"
     ],
     "title": "十字军与萨拉丁缔约休战",
     "desc": "1191年，十字军与萨拉丁缔约休战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 46,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1192,
     "yearEnd": null,
     "yearLabel": "1192",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "源赖朝在镰仓设立将军幕府",
     "desc": "1192年，源赖朝在镰仓设立将军幕府，日本开始进入幕府统治时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 46,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1199,
     "yearEnd": null,
     "yearLabel": "1199",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "欧洲"
     ],
     "title": "教皇在全西欧范围内的征税权自此开始",
     "desc": "1199年，教皇在全西欧范围内的征税权自此开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 47,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1180,
     "yearEnd": null,
     "yearLabel": "1180",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "教士不再是国家文官的唯一来源",
     "desc": "12世纪末，教士不再是国家文官的唯一来源，城市培养的法学家成为国王统治机构的重要成员。",
     "src": {
      "book": "中外历史对比年表",
      "page": 47,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1199,
     "yearEnd": 1216,
     "yearLabel": "1199",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "欧洲"
     ],
     "title": "英王约翰在位",
     "desc": "1199—1216年，英王约翰在位，在欧洲大陆的领地除阿奎丹尽数丧失，史称“失地王”约翰。",
     "src": {
      "book": "中外历史对比年表",
      "page": 47,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1180,
     "yearEnd": null,
     "yearLabel": "1180",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "西欧农业技术改进",
     "desc": "13世纪，西欧农业技术改进，铁制工具越来越多，骡马普遍用于拉犁。",
     "src": {
      "book": "中外历史对比年表",
      "page": 47,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1204,
     "yearEnd": 1261,
     "yearLabel": "1204",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "十字军",
     "countries": [
      "十字军",
      "罗马"
     ],
     "title": "拉丁帝国",
     "desc": "1204—1261年，拉丁帝国，十字军攻陷君士坦丁堡后建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 47,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1206,
     "yearEnd": 1526,
     "yearLabel": "1206",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "阿拉伯",
      "印度",
      "非洲"
     ],
     "title": "德里苏丹国",
     "desc": "1206—1526年，德里苏丹国，印度历史上第一个较为稳固的伊斯兰政权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 47,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1212,
     "yearEnd": null,
     "yearLabel": "1212",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯",
      "十字军",
      "欧洲"
     ],
     "title": "卡斯提尔国王统率的十字军在科尔多瓦以东的托罗萨击溃穆斯林军队",
     "desc": "1212年，卡斯提尔国王统率的十字军在科尔多瓦以东的托罗萨击溃穆斯林军队，自此，阿拉伯人在西班牙的统一抵抗力量崩溃。",
     "src": {
      "book": "中外历史对比年表",
      "page": 47,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b72",
   "year": 1215,
   "yearLabel": "1215",
   "pages": [
    48
   ],
   "china": [
    {
     "year": 1214,
     "yearEnd": null,
     "yearLabel": "1214",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "金朝末年大规模的红袄军起义爆发",
     "desc": "1214年，金朝末年大规模的红袄军起义爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 48,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1216,
     "yearEnd": 1233,
     "yearLabel": "1216",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "东夏国",
     "desc": "1216—1233年，东夏国，金辽东宣抚使蒲鲜万奴叛金自立所建政权，为蒙古所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 48,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1218,
     "yearEnd": null,
     "yearLabel": "1218",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西辽政权为蒙古所灭",
     "desc": "1218年，西辽政权为蒙古所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 48,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1215,
     "yearEnd": null,
     "yearLabel": "1215",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国贵族通过斗争迫使国王签署《大宪章》",
     "desc": "1215年，英国贵族通过斗争迫使国王签署《大宪章》，它将国王置于法律约束之下，是英国宪法政治发展的一个起点。",
     "src": {
      "book": "中外历史对比年表",
      "page": 48,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1215,
     "yearEnd": null,
     "yearLabel": "1215",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "欧洲"
     ],
     "title": "第四次拉特兰宗教会议",
     "desc": "1215年，第四次拉特兰宗教会议，确定基督教七项圣礼，西欧基督徒的宗教生活从此规范化。",
     "src": {
      "book": "中外历史对比年表",
      "page": 48,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b73",
   "year": 1220,
   "yearLabel": "1220",
   "pages": [
    48,
    49
   ],
   "china": [
    {
     "year": 1219,
     "yearEnd": 1225,
     "yearLabel": "1219",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "成吉思汗首次西征",
     "desc": "1219—1225年，成吉思汗首次西征。先后灭花剌子模等国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 48,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1227,
     "yearEnd": null,
     "yearLabel": "1227",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西夏为蒙古大军所灭",
     "desc": "1227年，西夏为蒙古大军所灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 48,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1231,
     "yearEnd": 1316,
     "yearLabel": "1231",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "郭守敬",
     "desc": "1231—1316年，郭守敬，元朝科学家，改进和创制天文观测仪器，领导大规模的天文测量，编制《授时历》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 48,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1234,
     "yearEnd": null,
     "yearLabel": "1234",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宋蒙联军攻占金朝最后的政治中心蔡州（今河南汝南）",
     "desc": "1234年，宋蒙联军攻占金朝最后的政治中心蔡州（今河南汝南），金朝灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 49,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1236,
     "yearEnd": null,
     "yearLabel": "1236",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒙古设立编修所、经籍所",
     "desc": "1236年，蒙古设立编修所、经籍所，编纂经史。",
     "src": {
      "book": "中外历史对比年表",
      "page": 49,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1236,
     "yearEnd": 1241,
     "yearLabel": "1236",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒙古汗窝阔台时期西征",
     "desc": "1236—1241年，蒙古汗窝阔台时期西征，征服了黑海以北高加索一带，蹂躏了波兰、匈牙利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 49,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1240,
     "yearEnd": null,
     "yearLabel": "1240",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒙古军队征吐蕃",
     "desc": "1240年，蒙古军队征吐蕃。",
     "src": {
      "book": "中外历史对比年表",
      "page": 49,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1245,
     "yearEnd": null,
     "yearLabel": "1245",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "教皇英诺森四世派传教士出使蒙古",
     "desc": "1245年，教皇英诺森四世派传教士出使蒙古。",
     "src": {
      "book": "中外历史对比年表",
      "page": 49,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1221,
     "yearEnd": null,
     "yearLabel": "1221",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本京都朝廷发动讨伐战争",
     "desc": "1221年，日本京都朝廷发动讨伐战争，企图废除幕府，恢复天皇权力，结果失败，史称“承久之乱”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 48,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1226,
     "yearEnd": 1270,
     "yearLabel": "1226",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法王路易九世在位",
     "desc": "1226—1270年，法王路易九世在位，亲政后进行司法改革和币制改革，使法国在统一道路上又迈出一大步。",
     "src": {
      "book": "中外历史对比年表",
      "page": 48,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1226,
     "yearEnd": null,
     "yearLabel": "1226",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国莱茵城市同盟建立",
     "desc": "1226年，德国莱茵城市同盟建立，旨在保护共同商业利益，最多时有70多个城市。",
     "src": {
      "book": "中外历史对比年表",
      "page": 48,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1243,
     "yearEnd": 1502,
     "yearLabel": "1243",
     "yearKind": "explicit",
     "region": "central-asia",
     "regionLabel": "中亚",
     "country": "中亚",
     "countries": [
      "中亚"
     ],
     "title": "钦察汗国",
     "desc": "1243—1502年，钦察汗国，拔都在伏尔加河下游所建，又称金帐汗国，是沟通东西方的重要渠道。",
     "src": {
      "book": "中外历史对比年表",
      "page": 49,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b74",
   "year": 1250,
   "yearLabel": "1250",
   "pages": [
    49,
    50
   ],
   "china": [
    {
     "year": 1248,
     "yearEnd": null,
     "yearLabel": "1248",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "法王路易九世首次派遣教士出使蒙古",
     "desc": "1248年，法王路易九世首次派遣教士出使蒙古。",
     "src": {
      "book": "中外历史对比年表",
      "page": 49,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1253,
     "yearEnd": null,
     "yearLabel": "1253",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒙古军灭亡大理",
     "desc": "1253年，蒙古军灭亡大理，招降吐蕃，控制西南广大地区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 49,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1253,
     "yearEnd": 1258,
     "yearLabel": "1253",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒙古蒙哥汗时期西征",
     "desc": "1253—1258年，蒙古蒙哥汗时期西征，征讨波斯，攻克巴格达，抄掠叙利亚，也带去了中国火药武器和制造方法，后传到欧洲。",
     "src": {
      "book": "中外历史对比年表",
      "page": 49,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1258,
     "yearEnd": null,
     "yearLabel": "1258",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒙古军大举侵宋",
     "desc": "1258年，蒙古军大举侵宋，蒙哥汗攻蜀，忽必烈攻鄂。",
     "src": {
      "book": "中外历史对比年表",
      "page": 50,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1250,
     "yearEnd": 1517,
     "yearLabel": "1250",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "十字军",
      "中亚"
     ],
     "title": "埃及马木路克王朝时期，击败蒙古西征军队",
     "desc": "1250—1517年，埃及马木路克王朝时期，击败蒙古西征军队；收复被十字军占领的全部土地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 49,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1257,
     "yearEnd": null,
     "yearLabel": "1257",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国历史上第一次由七大诸侯选举国王",
     "desc": "1257年，德国历史上第一次由七大诸侯选举国王。",
     "src": {
      "book": "中外历史对比年表",
      "page": 49,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1258,
     "yearEnd": null,
     "yearLabel": "1258",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英王在牛津举行的改革联席会议上",
     "desc": "1258年，英王在牛津举行的改革联席会议上，被迫接受《牛津条例》，表明“大议事会”开始向起议政作用并定期举行的“议会”转变。",
     "src": {
      "book": "中外历史对比年表",
      "page": 50,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1258,
     "yearEnd": null,
     "yearLabel": "1258",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯",
      "中亚"
     ],
     "title": "蒙古军队征服巴格达",
     "desc": "1258年，蒙古军队征服巴格达，消灭哈里发政权，阿拉伯帝国最后灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 50,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b75",
   "year": 1260,
   "yearLabel": "1260",
   "pages": [
    50,
    51
   ],
   "china": [
    {
     "year": 1260,
     "yearEnd": null,
     "yearLabel": "1260",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "忽必烈在开平府即大汗位后",
     "desc": "1260年，忽必烈在开平府即大汗位后，由中央政府在全国范围内统一发行纸币——交钞，这是世界上最早的纸币制度。",
     "src": {
      "book": "中外历史对比年表",
      "page": 50,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1260,
     "yearEnd": null,
     "yearLabel": "1260",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "活字印刷术传入朝鲜",
     "desc": "13世纪，活字印刷术传入朝鲜，火药传入阿拉伯地区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 50,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1262,
     "yearEnd": null,
     "yearLabel": "1262",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "山东的地方割据势力李璮发动叛乱",
     "desc": "1262年，山东的地方割据势力李璮发动叛乱，不久忽必烈派军平定，史称“李璮之乱”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 50,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1265,
     "yearEnd": null,
     "yearLabel": "1265",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "忽必烈派使臣出使罗马教廷",
     "desc": "1265年，忽必烈派使臣出使罗马教廷。",
     "src": {
      "book": "中外历史对比年表",
      "page": 50,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1267,
     "yearEnd": 1293,
     "yearLabel": "1267",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "元大都历时26年最终建成完工",
     "desc": "1267—1293年，元大都历时26年最终建成完工。",
     "src": {
      "book": "中外历史对比年表",
      "page": 50,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1271,
     "yearEnd": null,
     "yearLabel": "1271",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "忽必烈接受汉臣建议",
     "desc": "1271年，忽必烈接受汉臣建议，建国号“大元”，是为元朝。",
     "src": {
      "book": "中外历史对比年表",
      "page": 50,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1274,
     "yearEnd": null,
     "yearLabel": "1274",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "元朝两次征日失败",
     "desc": "1274、1281年，元朝两次发动征日战争，皆以失败告终。",
     "src": {
      "book": "中外历史对比年表",
      "page": 51,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1259,
     "yearEnd": null,
     "yearLabel": "1259",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲",
      "中亚"
     ],
     "title": "疆域囊括几乎整个亚洲和大部分欧洲的蒙古帝国分裂",
     "desc": "1259年，疆域囊括几乎整个亚洲和大部分欧洲的蒙古帝国分裂。",
     "src": {
      "book": "中外历史对比年表",
      "page": 50,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1261,
     "yearEnd": null,
     "yearLabel": "1261",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马"
     ],
     "title": "尼西亚帝国皇帝消灭拉丁帝国",
     "desc": "1261年，尼西亚帝国皇帝消灭拉丁帝国，夺回君士坦丁堡，恢复了拜占庭帝国统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 50,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1270,
     "yearEnd": null,
     "yearLabel": "1270",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "十字军",
     "countries": [
      "十字军",
      "法兰西",
      "非洲"
     ],
     "title": "第八次十字军东征开始",
     "desc": "1270年，第八次十字军东征开始，法国国王路易九世在突尼斯病死军中。",
     "src": {
      "book": "中外历史对比年表",
      "page": 50,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1272,
     "yearEnd": 1307,
     "yearLabel": "1272",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英王爱德华一世时期，完成了对威尔士的征服",
     "desc": "1272—1307年，英王爱德华一世时期，完成了对威尔士的征服。",
     "src": {
      "book": "中外历史对比年表",
      "page": 51,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b76",
   "year": 1275,
   "yearLabel": "1275",
   "pages": [
    51,
    52
   ],
   "china": [
    {
     "year": 1275,
     "yearEnd": 1292,
     "yearLabel": "1275",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "意大利威尼斯商人马可·波罗居留中国",
     "desc": "1275—1292年，意大利威尼斯商人马可·波罗居留中国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 51,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1276,
     "yearEnd": null,
     "yearLabel": "1276",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒙古大军攻陷南宋都城临安",
     "desc": "1276年，蒙古大军攻陷南宋都城临安，宋恭帝及皇亲、官员数千人被押解北上，南宋灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 51,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1276,
     "yearEnd": null,
     "yearLabel": "1276",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宋亡",
     "desc": "1276年，宋亡，宋恭帝异母兄益王赵昱在福州即位，建立流亡小朝廷，是为宋端宗。",
     "src": {
      "book": "中外历史对比年表",
      "page": 51,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1277,
     "yearEnd": 1347,
     "yearLabel": "1277",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "危亦林",
     "desc": "1277—1347年，危亦林，元朝外科医生，著《世医得效方》，其中有关麻醉药物的介绍是世界上最早的关于全身麻醉的记载。",
     "src": {
      "book": "中外历史对比年表",
      "page": 51,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1279,
     "yearEnd": null,
     "yearLabel": "1279",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宋蒙大军崖山决战",
     "desc": "1279年，宋蒙大军崖山决战，宋军大败，蒙古完成了中国自唐以后的又一次大统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 51,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1280,
     "yearEnd": null,
     "yearLabel": "1280",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "郭守敬编制成新历法",
     "desc": "1280年，郭守敬编制成新历法，忽必烈赐名“授时历”，取“敬授民时”之意，命翌年颁行天下。",
     "src": {
      "book": "中外历史对比年表",
      "page": 51,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1275,
     "yearEnd": null,
     "yearLabel": "1275",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宋朝时期，开始发行纸币“交子”（后改名“钱引”）",
     "desc": "宋朝时期，开始发行纸币“交子”（后改名“钱引”）。海船建造技术提高，可载重2200斛，能在大风浪中平稳航行；使用隔离舱装置。发明了人工磁化技术和磁针的装置、使用方法。",
     "src": {
      "book": "中外历史对比年表",
      "page": 52,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1281,
     "yearEnd": 1291,
     "yearLabel": "1281",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "连通了南起杭州",
     "desc": "1281—1291年，连通了南起杭州，北到大都、贯通南北的大运河。",
     "src": {
      "book": "中外历史对比年表",
      "page": 52,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1282,
     "yearEnd": null,
     "yearLabel": "1282",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "自上海海道运粮抵大都的试航成功",
     "desc": "1282年，自上海海道运粮抵大都的试航成功，沿海海运开通。",
     "src": {
      "book": "中外历史对比年表",
      "page": 52,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1283,
     "yearEnd": null,
     "yearLabel": "1283",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "文天祥被俘后拒绝元世祖忽必烈的亲自劝降",
     "desc": "1283年，文天祥被俘后拒绝元世祖忽必烈的亲自劝降，从容就义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 52,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1294,
     "yearEnd": null,
     "yearLabel": "1294",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "奉教皇尼古拉四世之命往东方传教的教士孟特·科维诺到达大都",
     "desc": "1294年，奉教皇尼古拉四世之命往东方传教的教士孟特·科维诺到达大都，获在中国传教的许可。",
     "src": {
      "book": "中外历史对比年表",
      "page": 52,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1275,
     "yearEnd": null,
     "yearLabel": "1275",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英王爱德华一世颁布《威斯敏斯特第一条例》",
     "desc": "1275年，英王爱德华一世颁布《威斯敏斯特第一条例》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 51,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1278,
     "yearEnd": null,
     "yearLabel": "1278",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英王爱德华一世颁布《永久管业法》",
     "desc": "1278年，英王爱德华一世颁布《永久管业法》，规定“宗教界不经特许不得插手各种封地，不能取得这些封地成为直属领主，从而致使本应随这些封地提供的军役被违法地取消”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 51,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1280,
     "yearEnd": null,
     "yearLabel": "1280",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "北欧",
     "countries": [
      "北欧"
     ],
     "title": "挪威开始与汉萨同盟的长期战争",
     "desc": "1280年，挪威开始与汉萨同盟的长期战争，失败后被迫以各种特权授予后者。",
     "src": {
      "book": "中外历史对比年表",
      "page": 51,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1282,
     "yearEnd": null,
     "yearLabel": "1282",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "所有德意志的汉萨商人组成了统一组织",
     "desc": "1282年，所有德意志的汉萨商人组成了统一组织，克服了德意志商人的分散状态。",
     "src": {
      "book": "中外历史对比年表",
      "page": 52,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1285,
     "yearEnd": 1314,
     "yearLabel": "1285",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法王菲利普四世在位",
     "desc": "1285—1314年，法王菲利普四世在位，通过联姻和战争扩大王室领地，加强吏治，建立税收制度，使法国王权进一步加强。",
     "src": {
      "book": "中外历史对比年表",
      "page": 52,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b77",
   "year": 1295,
   "yearLabel": "1295",
   "pages": [
    52,
    53
   ],
   "china": [
    {
     "year": 1295,
     "yearEnd": null,
     "yearLabel": "1295",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "元成宗派遣使节赴暹罗、真腊",
     "desc": "1295年，元成宗派遣使节赴暹罗、真腊，随行成员周达观根据亲身见闻著《真腊风土记》一书。",
     "src": {
      "book": "中外历史对比年表",
      "page": 52,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1303,
     "yearEnd": null,
     "yearLabel": "1303",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "察合台汗都哇与窝阔台汗察八儿向元朝求和",
     "desc": "1303年，察合台汗都哇与窝阔台汗察八儿向元朝求和，承认元朝的宗主国地位，于是订约言和。",
     "src": {
      "book": "中外历史对比年表",
      "page": 53,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1309,
     "yearEnd": null,
     "yearLabel": "1309",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "罗马教皇克莱门五世特设元朝大都为总教区",
     "desc": "1309年，罗马教皇克莱门五世特设元朝大都为总教区，任命意大利传教士孟特·科维诺为大都暨东方全境的总主教。",
     "src": {
      "book": "中外历史对比年表",
      "page": 53,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1295,
     "yearEnd": null,
     "yearLabel": "1295",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "爱德华一世为解决各项重大问题",
     "desc": "1295年，爱德华一世为解决各项重大问题，召集由大贵族、城市和骑士代表参加的国会，这次国会后被称为“模范国会”，是为英国国会的开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 52,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1296,
     "yearEnd": null,
     "yearLabel": "1296",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "马可·波罗旅行东方各国的见闻被记录整理成书",
     "desc": "1296年，马可·波罗旅行东方各国的见闻被记录整理成书，《马可·波罗游记》在欧洲广为流传。",
     "src": {
      "book": "中外历史对比年表",
      "page": 52,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1295,
     "yearEnd": null,
     "yearLabel": "1295",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲",
      "日本"
     ],
     "title": "西欧人开始使用火药和火炮",
     "desc": "14世纪，西欧人开始使用火药和火炮，在实战中日渐重要。",
     "src": {
      "book": "中外历史对比年表",
      "page": 53,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1295,
     "yearEnd": null,
     "yearLabel": "1295",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "14、15世纪，指南针开始用于航海",
     "desc": "14、15世纪，指南针开始用于航海，海员已经有了观测星象确定经纬度的初步知识，远洋航行的条件开始成熟。",
     "src": {
      "book": "中外历史对比年表",
      "page": 53,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1302,
     "yearEnd": null,
     "yearLabel": "1302",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "法兰西"
     ],
     "title": "法王菲利普四世为加强同教皇斗争的力量",
     "desc": "1302年，法王菲利普四世为加强同教皇斗争的力量，首次召开三级会议，这标志法国封建等级君主制建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 53,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1309,
     "yearEnd": 1378,
     "yearLabel": "1309",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "法兰西"
     ],
     "title": "教皇移居靠近法国边境的阿维农",
     "desc": "1309—1378年，教皇移居靠近法国边境的阿维农，成为法王控制下的傀儡，史称“阿维农之囚”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 53,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b78",
   "year": 1325,
   "yearLabel": "1325",
   "pages": [
    53
   ],
   "china": [
    {
     "year": 1326,
     "yearEnd": null,
     "yearLabel": "1326",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "元朝高僧清拙正澄受镰仓幕府之邀赴日本",
     "desc": "1326年，元朝高僧清拙正澄受镰仓幕府之邀赴日本，撰有《大鉴清规》，确立了日本禅林的规矩。",
     "src": {
      "book": "中外历史对比年表",
      "page": 53,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1325,
     "yearEnd": 1340,
     "yearLabel": "1325",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗斯",
     "countries": [
      "罗斯",
      "俄国"
     ],
     "title": "莫斯科大公伊凡一世时期，被金帐汗册封为“弗拉基米尔及全罗斯大公”",
     "desc": "1325—1340年，莫斯科大公伊凡一世时期，被金帐汗册封为“弗拉基米尔及全罗斯大公”，公国领地不断扩张。",
     "src": {
      "book": "中外历史对比年表",
      "page": 53,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1326,
     "yearEnd": null,
     "yearLabel": "1326",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "罗马"
     ],
     "title": "奥斯曼人攻占布鲁萨",
     "desc": "1326年，奥斯曼人攻占布鲁萨，并迁都于此，拜占庭帝国在小亚细亚的统治开始崩溃。",
     "src": {
      "book": "中外历史对比年表",
      "page": 53,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1327,
     "yearEnd": 1377,
     "yearLabel": "1327",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英王爱德华三世时期，骑士和市民代表参加国会成为一项稳定的制度",
     "desc": "1327—1377年，英王爱德华三世时期，骑士和市民代表参加国会成为一项稳定的制度，也逐渐形成国会每年召开两次、上下院分别集会的习惯。",
     "src": {
      "book": "中外历史对比年表",
      "page": 53,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b79",
   "year": 1330,
   "yearLabel": "1330",
   "pages": [
    54
   ],
   "china": [
    {
     "year": 1331,
     "yearEnd": null,
     "yearLabel": "1331",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "元《皇朝经世大典》成书",
     "desc": "1331年，元《皇朝经世大典》成书。此书是明修《元史》的重要依据。",
     "src": {
      "book": "中外历史对比年表",
      "page": 54,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1336,
     "yearEnd": 1353,
     "yearLabel": "1336",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "元帝与教皇互派使节访问",
     "desc": "1336—1353年，元帝与教皇互派使节访问。",
     "src": {
      "book": "中外历史对比年表",
      "page": 54,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1333,
     "yearEnd": null,
     "yearLabel": "1333",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本天皇趁幕府势衰",
     "desc": "1333年，日本天皇趁幕府势衰，联合武士贵族推翻镰仓幕府，恢复了天皇权力，建年号建武，史称“建武中兴”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 54,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1336,
     "yearEnd": null,
     "yearLabel": "1336",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本势力强大的武士贵族足利尊氏自立为征夷大将军",
     "desc": "1336年，日本势力强大的武士贵族足利尊氏自立为征夷大将军，在京都设将军幕府，开始室町幕府时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 54,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b80",
   "year": 1345,
   "yearLabel": "1345",
   "pages": [
    54,
    55
   ],
   "china": [
    {
     "year": 1344,
     "yearEnd": null,
     "yearLabel": "1344",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "黄河水暴涨",
     "desc": "1344年，黄河水暴涨，北面溃决白茅堤、金堤，黄河中下游的州县都成了一片泽国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 54,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1345,
     "yearEnd": null,
     "yearLabel": "1345",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "元朝时期，天主教传入中国",
     "desc": "元朝时期，天主教传入中国，称“也里可温教”，明朝建立后在中国消失。",
     "src": {
      "book": "中外历史对比年表",
      "page": 54,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1345,
     "yearEnd": null,
     "yearLabel": "1345",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "元朝时期，首次出现了人类历史上的金属管火炮——火铳",
     "desc": "元朝时期，首次出现了人类历史上的金属管火炮——火铳；造船技术达到更高水准，海船有十几间船舱，载重可达400—500吨；航海技术先进，已掌握用观测星高来确定地理纬度的牵星术，季候风被熟练利用，指南针得到普遍应用；和中国有海上贸易关系的，菲律宾以南以西的沿海国家和地区达97个，最远到达今坦桑尼亚。",
     "src": {
      "book": "中外历史对比年表",
      "page": 54,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1351,
     "yearEnd": null,
     "yearLabel": "1351",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "刘福通在安徽一带起兵",
     "desc": "1351年5月，刘福通在安徽一带起兵，元末人民大起义爆发，义军头裹红巾，故称红巾军（这支史学上称东系红巾军）。",
     "src": {
      "book": "中外历史对比年表",
      "page": 55,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1337,
     "yearEnd": 1453,
     "yearLabel": "1337",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英法两国发生了长达100多年的战争",
     "desc": "1337—1453年，英法两国发生了长达100多年的战争，史称“百年战争”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 54,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1346,
     "yearEnd": null,
     "yearLabel": "1346",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "克莱西战役",
     "desc": "1346年，克莱西战役，英军以少胜多，大败法军。",
     "src": {
      "book": "中外历史对比年表",
      "page": 54,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1348,
     "yearEnd": null,
     "yearLabel": "1348",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "欧洲"
     ],
     "title": "捷克国王查理一世创办布拉格大学",
     "desc": "1348年，捷克国王查理一世创办布拉格大学，这是中欧的第一所大学。",
     "src": {
      "book": "中外历史对比年表",
      "page": 54,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1348,
     "yearEnd": 1349,
     "yearLabel": "1348",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "黑死病（腺鼠疫）横扫西欧",
     "desc": "1348—1349年，黑死病（腺鼠疫）横扫西欧，夺走了成千上万人的生命。",
     "src": {
      "book": "中外历史对比年表",
      "page": 54,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1345,
     "yearEnd": null,
     "yearLabel": "1345",
     "yearKind": "anchor",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "希腊",
      "罗马"
     ],
     "title": "奥斯曼国家将拜占庭势力完全逐出小亚",
     "desc": "14世纪中，奥斯曼国家将拜占庭势力完全逐出小亚，爱琴海至黑海之间地区尽归其所有。",
     "src": {
      "book": "中外历史对比年表",
      "page": 54,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1351,
     "yearEnd": null,
     "yearLabel": "1351",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国颁布劳动法案",
     "desc": "1351年，法国颁布劳动法案，强迫劳动者按大疫之前的工资标准接受工作。",
     "src": {
      "book": "中外历史对比年表",
      "page": 55,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b81",
   "year": 1350,
   "yearLabel": "1350",
   "pages": [
    55
   ],
   "china": [
    {
     "year": 1351,
     "yearEnd": null,
     "yearLabel": "1351",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西系红巾军攻占蕲水（湖北境）",
     "desc": "1351年10月，西系红巾军攻占蕲水（湖北境），以此为都建国，推徐寿辉为帝，国号天完。",
     "src": {
      "book": "中外历史对比年表",
      "page": 55,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1354,
     "yearEnd": null,
     "yearLabel": "1354",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "泰州起事的张士诚自称诚王",
     "desc": "1354年，泰州起事的张士诚自称诚王，国号大周。",
     "src": {
      "book": "中外历史对比年表",
      "page": 55,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1354,
     "yearEnd": null,
     "yearLabel": "1354",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "高邮战役",
     "desc": "1354年，高邮战役，元军临阵易帅，张士诚趁机大败元军。此后元政府丧失权威，义军重振。",
     "src": {
      "book": "中外历史对比年表",
      "page": 55,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1354,
     "yearEnd": null,
     "yearLabel": "1354",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "欧洲"
     ],
     "title": "奥斯曼土耳其人定居于达达尼尔海峡北岸的加里波利",
     "desc": "1354年，奥斯曼土耳其人定居于达达尼尔海峡北岸的加里波利，这是土耳其人在欧洲第一次获得的立足点。",
     "src": {
      "book": "中外历史对比年表",
      "page": 55,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b82",
   "year": 1355,
   "yearLabel": "1355",
   "pages": [
    55,
    56
   ],
   "china": [
    {
     "year": 1355,
     "yearEnd": null,
     "yearLabel": "1355",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "刘福通迎韩林儿至亳州为帝",
     "desc": "1355年，刘福通迎韩林儿至亳州为帝，又号“小明王”，建国号宋。",
     "src": {
      "book": "中外历史对比年表",
      "page": 55,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1356,
     "yearEnd": null,
     "yearLabel": "1356",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "朱元璋成为濠州郭子兴军的最高领袖",
     "desc": "1356年，朱元璋成为濠州郭子兴军的最高领袖，以应天府为根据地，势力发展到安徽、浙江一带。",
     "src": {
      "book": "中外历史对比年表",
      "page": 55,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1356,
     "yearEnd": null,
     "yearLabel": "1356",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德皇查理四世颁布帝国立法确认选侯的身份和地位",
     "desc": "1356年，德皇查理四世颁布帝国立法确认选侯的身份和地位，因文本用金印戳盖而得名“金玺诏书”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 55,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1356,
     "yearEnd": null,
     "yearLabel": "1356",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰"
     ],
     "title": "普瓦提埃战役",
     "desc": "1356年，普瓦提埃战役，英王长子黑太子率军大败法军，法王约翰二世及大批贵族被俘。",
     "src": {
      "book": "中外历史对比年表",
      "page": 55,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1358,
     "yearEnd": null,
     "yearLabel": "1358",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国巴黎北部博韦地方爆发扎克雷起义",
     "desc": "1358年，法国巴黎北部博韦地方爆发扎克雷起义，打击了封建势力，有利于促成法国的统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 56,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b83",
   "year": 1360,
   "yearLabel": "1360",
   "pages": [
    56,
    57
   ],
   "china": [
    {
     "year": 1360,
     "yearEnd": null,
     "yearLabel": "1360",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陈友谅杀徐寿辉自立为帝",
     "desc": "1360年，陈友谅杀徐寿辉自立为帝，国号为汉。",
     "src": {
      "book": "中外历史对比年表",
      "page": 56,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1364,
     "yearEnd": null,
     "yearLabel": "1364",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "朱元璋水陆大军围困武昌",
     "desc": "1364年，朱元璋水陆大军围困武昌，汉亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 56,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1366,
     "yearEnd": null,
     "yearLabel": "1366",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "朱元璋遣部将将小明王沉入江中溺亡",
     "desc": "1366年，朱元璋遣部将将小明王沉入江中溺亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 56,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1367,
     "yearEnd": null,
     "yearLabel": "1367",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "朱元璋围困平江城",
     "desc": "1367年，朱元璋围困平江城，张士诚被俘，大周亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 56,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1367,
     "yearEnd": 1368,
     "yearLabel": "1367",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "朱元璋派大军北伐",
     "desc": "1367—1368年，朱元璋派大军北伐，顺利攻入大都，元朝灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 56,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1368,
     "yearEnd": null,
     "yearLabel": "1368",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "朱元璋称帝",
     "desc": "1368年，朱元璋称帝，建元洪武，定国号为明，以应天为京师，明朝建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 56,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1370,
     "yearEnd": null,
     "yearLabel": "1370",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "元朝残余势力在明军追击下",
     "desc": "1370年，元朝残余势力在明军追击下，移至大漠以北，改国号为鞑靼，史称“北元”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 56,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1372,
     "yearEnd": null,
     "yearLabel": "1372",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明朝大军击败盘踞西北的元将括廓帖木儿率领的元军残部",
     "desc": "1372年，明朝大军击败盘踞西北的元将括廓帖木儿率领的元军残部，收山西、陕西、甘肃、宁夏。",
     "src": {
      "book": "中外历史对比年表",
      "page": 57,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1376,
     "yearEnd": null,
     "yearLabel": "1376",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "一些地方官吏赴户部核算钱粮时带有盖好官印的空白文册",
     "desc": "1376年，一些地方官吏赴户部核算钱粮时带有盖好官印的空白文册，以备钱谷数字不清时重新填造，事发后涉事掌印官被全部处死，史称“空印案”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 57,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1358,
     "yearEnd": null,
     "yearLabel": "1358",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "北欧"
     ],
     "title": "德国北部汉萨城市同盟成立",
     "desc": "1358年，德国北部汉萨城市同盟成立，长期垄断北欧贸易。",
     "src": {
      "book": "中外历史对比年表",
      "page": 56,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1361,
     "yearEnd": null,
     "yearLabel": "1361",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼"
     ],
     "title": "奥斯曼军队攻占亚得里亚堡",
     "desc": "1361年，奥斯曼军队攻占亚得里亚堡，打开了入侵东南欧的大门。",
     "src": {
      "book": "中外历史对比年表",
      "page": 56,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1364,
     "yearEnd": 1380,
     "yearLabel": "1364",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法王查理五世时期，励精图治",
     "desc": "1364—1380年，法王查理五世时期，励精图治，组织炮兵并改组海军，改变战术，使对英战局改观，除沿海据点几乎收复全部失地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 56,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1369,
     "yearEnd": 1415,
     "yearLabel": "1369",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "基督教会",
      "德意志"
     ],
     "title": "约翰·胡斯",
     "desc": "1369—1415年，约翰·胡斯，捷克宗教改革家，曾任布拉格大学校长，被罗马教会以异端罪名处以火刑。",
     "src": {
      "book": "中外历史对比年表",
      "page": 56,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1370,
     "yearEnd": null,
     "yearLabel": "1370",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "北欧",
     "countries": [
      "北欧"
     ],
     "title": "汉萨同盟迫使丹麦订立《施特拉尔松合约》",
     "desc": "1370年，汉萨同盟迫使丹麦订立《施特拉尔松合约》，承认同盟商人的特权，同意同盟船只在松德海峡自由航行。",
     "src": {
      "book": "中外历史对比年表",
      "page": 57,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1376,
     "yearEnd": null,
     "yearLabel": "1376",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国士瓦本城市同盟建立",
     "desc": "1376年，德国士瓦本城市同盟建立，城市最多时达84个。",
     "src": {
      "book": "中外历史对比年表",
      "page": 57,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1378,
     "yearEnd": null,
     "yearLabel": "1378",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗斯",
     "countries": [
      "罗斯",
      "俄国",
      "中亚"
     ],
     "title": "莫斯科公国在沃查河畔击败进攻的金帐汗国军队",
     "desc": "1378年，莫斯科公国在沃查河畔击败进攻的金帐汗国军队，这是罗斯人第一次在反抗蒙古人的战争中取得胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 57,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b84",
   "year": 1380,
   "yearLabel": "1380",
   "pages": [
    57,
    58
   ],
   "china": [
    {
     "year": 1380,
     "yearEnd": null,
     "yearLabel": "1380",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "朱元璋为防止相权过重导致官僚系统首脑专权乱政",
     "desc": "1380年，朱元璋为防止相权过重导致官僚系统首脑专权乱政，诏谕革去中书省，由皇帝直接总揽天下政务。",
     "src": {
      "book": "中外历史对比年表",
      "page": 57,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1381,
     "yearEnd": null,
     "yearLabel": "1381",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明军攻克曲靖",
     "desc": "1381年，明军攻克曲靖，元宗室梁王巴匝剌瓦尔密自杀，云南平定。",
     "src": {
      "book": "中外历史对比年表",
      "page": 57,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1387,
     "yearEnd": null,
     "yearLabel": "1387",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明朝基本再次实现了全国的统一",
     "desc": "1387年，明朝基本再次实现了全国的统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 57,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1388,
     "yearEnd": null,
     "yearLabel": "1388",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "占据辽东的元将纳哈初归降明朝",
     "desc": "1388年，占据辽东的元将纳哈初归降明朝。",
     "src": {
      "book": "中外历史对比年表",
      "page": 57,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1380,
     "yearEnd": null,
     "yearLabel": "1380",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明朝时",
     "desc": "明朝时，朱元璋设锦衣卫，以特务政治强化皇权专制主义，使常规司法监察系统受到干扰破坏。",
     "src": {
      "book": "中外历史对比年表",
      "page": 58,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1399,
     "yearEnd": null,
     "yearLabel": "1399",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "燕王朱棣以“清君侧”为名在北平起兵",
     "desc": "1399年，燕王朱棣以“清君侧”为名在北平起兵，号为“靖难”军，史称“靖难之役”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 58,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1380,
     "yearEnd": null,
     "yearLabel": "1380",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗斯",
     "countries": [
      "罗斯",
      "俄国",
      "中亚"
     ],
     "title": "在顿河以西的库里科沃平原",
     "desc": "1380年，在顿河以西的库里科沃平原，莫斯科军队击败蒙古军，大公底米特里获“顿河英雄”称号，这是罗斯人摆脱蒙古统治一次有决定意义的胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 57,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1381,
     "yearEnd": null,
     "yearLabel": "1381",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "英国"
     ],
     "title": "英国发生瓦特·泰勒领导的农民起义",
     "desc": "1381年，英国发生瓦特·泰勒领导的农民起义，加速了英国农奴制的瓦解。",
     "src": {
      "book": "中外历史对比年表",
      "page": 57,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1389,
     "yearEnd": null,
     "yearLabel": "1389",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "欧洲"
     ],
     "title": "科索沃战役",
     "desc": "1389年，科索沃战役，奥斯曼军队击败塞尔维亚国王统率的巴尔干联军，巴尔干诸国丧失独立地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 57,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1392,
     "yearEnd": null,
     "yearLabel": "1392",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "十字军",
      "基督教会",
      "欧洲"
     ],
     "title": "奥斯曼军队在多瑙河畔的尼科堡大败欧洲基督教诸国组成的十字军",
     "desc": "1392年，奥斯曼军队在多瑙河畔的尼科堡大败欧洲基督教诸国组成的十字军，完成了对巴尔干的征服。",
     "src": {
      "book": "中外历史对比年表",
      "page": 58,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1392,
     "yearEnd": null,
     "yearLabel": "1392",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "朝鲜半岛",
     "countries": [
      "朝鲜半岛"
     ],
     "title": "高丽部将李成桂兵变",
     "desc": "1392年，高丽部将李成桂兵变，废王自立，改国号朝鲜。",
     "src": {
      "book": "中外历史对比年表",
      "page": 58,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1396,
     "yearEnd": null,
     "yearLabel": "1396",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "奥地利开始作为一个国家实体出现在历史舞台上",
     "desc": "1396年，奥地利开始作为一个国家实体出现在历史舞台上。",
     "src": {
      "book": "中外历史对比年表",
      "page": 58,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b85",
   "year": 1400,
   "yearLabel": "1400",
   "pages": [
    58,
    59
   ],
   "china": [
    {
     "year": 1400,
     "yearEnd": null,
     "yearLabel": "1400",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "以日本和中国海盗为主体",
     "desc": "14世纪末，以日本和中国海盗为主体，勾结中国沿海豪门势力的武装走私、掠夺，成为持续扰乱沿海民生和国家安全的严重倭患。",
     "src": {
      "book": "中外历史对比年表",
      "page": 58,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1402,
     "yearEnd": null,
     "yearLabel": "1402",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "靖难军攻陷南京",
     "desc": "1402年，靖难军攻陷南京，建文帝不知下落，朱棣即位，改年号为永乐。",
     "src": {
      "book": "中外历史对比年表",
      "page": 58,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1403,
     "yearEnd": 1424,
     "yearLabel": "1403",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "永乐时期，以程朱之学为标准编定《五经四书大全》和《性理大全》",
     "desc": "1403—1424年，永乐时期，以程朱之学为标准编定《五经四书大全》和《性理大全》，颁布天下并令学校、科举参用，程朱理学成为国家确定的学术思想正宗。",
     "src": {
      "book": "中外历史对比年表",
      "page": 58,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1405,
     "yearEnd": 1433,
     "yearLabel": "1405",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "郑和七下西洋",
     "desc": "1405—1433年，明太监郑和七次率领大规模远洋贸易船队出使西洋（印度洋至非洲东海岸）诸国，这比欧洲人的航海远航早近半个世纪。",
     "src": {
      "book": "中外历史对比年表",
      "page": 59,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1407,
     "yearEnd": null,
     "yearLabel": "1407",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "由解缙主持编修的《永乐大典》成书",
     "desc": "1407年，由解缙主持编修的《永乐大典》成书。",
     "src": {
      "book": "中外历史对比年表",
      "page": 59,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1414,
     "yearEnd": null,
     "yearLabel": "1414",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明朝派遣陈诚等人出使中亚",
     "desc": "1414年，明朝派遣陈诚等人出使中亚，陈诚著《使西域记》，介绍西域各国政治、经济和风俗。",
     "src": {
      "book": "中外历史对比年表",
      "page": 59,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1400,
     "yearEnd": null,
     "yearLabel": "1400",
     "yearKind": "anchor",
     "region": "central-asia",
     "regionLabel": "中亚",
     "country": "中亚",
     "countries": [
      "中亚"
     ],
     "title": "帖木儿在中亚建立起庞大帝国",
     "desc": "14世纪末，帖木儿在中亚建立起庞大帝国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 58,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1402,
     "yearEnd": null,
     "yearLabel": "1402",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "中亚"
     ],
     "title": "帖木儿帝国军队入侵小亚",
     "desc": "1402年，帖木儿帝国军队入侵小亚，在安卡拉平原击败奥斯曼军队。",
     "src": {
      "book": "中外历史对比年表",
      "page": 58,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1407,
     "yearEnd": null,
     "yearLabel": "1407",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "欧洲"
     ],
     "title": "热那亚的圣乔治银行成立",
     "desc": "1407年，热那亚的圣乔治银行成立，这是欧洲中世纪最大的银行之一，法国大革命后倒闭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 59,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b86",
   "year": 1420,
   "yearLabel": "1420",
   "pages": [
    59,
    60
   ],
   "china": [
    {
     "year": 1420,
     "yearEnd": null,
     "yearLabel": "1420",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明成祖设立东缉事厂",
     "desc": "1420年，明成祖设立东缉事厂，简称“东厂”，以宦官提督，明代宦官政治肇端于此。",
     "src": {
      "book": "中外历史对比年表",
      "page": 59,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1421,
     "yearEnd": null,
     "yearLabel": "1421",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明成祖为加强北部边疆防御",
     "desc": "1421年，明成祖为加强北部边疆防御，迁都北平（北京）。",
     "src": {
      "book": "中外历史对比年表",
      "page": 59,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1425,
     "yearEnd": 1435,
     "yearLabel": "1425",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明仁宗、宣宗在位时",
     "desc": "1425—1435年，明仁宗、宣宗在位时，实行“与民休息”政策，社会进入了一个海内承平、民生繁庶的时期，史称“仁宣之治”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 59,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1434,
     "yearEnd": null,
     "yearLabel": "1434",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒙古瓦剌部首领统一鞑靼和瓦剌两大部",
     "desc": "1434年，蒙古瓦剌部首领统一鞑靼和瓦剌两大部，逐步建立起元朝以后最大的蒙古汗国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 59,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1449,
     "yearEnd": null,
     "yearLabel": "1449",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒙古汗国对明朝大举进攻",
     "desc": "1449年，蒙古汗国对明朝大举进攻，明英宗御驾亲征，在土木堡（河北境）兵败被俘，史称“土木之变”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 60,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1454,
     "yearEnd": null,
     "yearLabel": "1454",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明代宗应朝鲜国王之请",
     "desc": "1454年，明代宗应朝鲜国王之请，向其赠送《宋史》等史书。",
     "src": {
      "book": "中外历史对比年表",
      "page": 60,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1419,
     "yearEnd": 1434,
     "yearLabel": "1419",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会"
     ],
     "title": "胡司战争",
     "desc": "1419—1434年，胡司战争，大规模的捷克农民战争，沉重地打击了以教皇、德皇为首的教俗反动势力。",
     "src": {
      "book": "中外历史对比年表",
      "page": 59,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1429,
     "yearEnd": null,
     "yearLabel": "1429",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国民族女英雄贞德率军解奥尔良之围",
     "desc": "1429年，法国民族女英雄贞德率军解奥尔良之围，扭转战局，被称为“奥尔良姑娘”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 59,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1444,
     "yearEnd": null,
     "yearLabel": "1444",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "十字军",
      "欧洲"
     ],
     "title": "奥斯曼军队在黑海西岸的瓦尔纳大败匈牙利国王率领的欧洲诸国十字军",
     "desc": "1444年，奥斯曼军队在黑海西岸的瓦尔纳大败匈牙利国王率领的欧洲诸国十字军，巩固了在东南欧的统治地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 59,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1453,
     "yearEnd": null,
     "yearLabel": "1453",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "罗马"
     ],
     "title": "奥斯曼军队攻陷君士坦丁堡",
     "desc": "1453年，奥斯曼军队攻陷君士坦丁堡，改称伊斯坦布尔并作为首都，拜占庭帝国灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 60,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b87",
   "year": 1455,
   "yearLabel": "1455",
   "pages": [
    60,
    61
   ],
   "china": [
    {
     "year": 1457,
     "yearEnd": null,
     "yearLabel": "1457",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "被尊为太上皇的明英宗趁明代宗生病之机发动政变复辟",
     "desc": "1457年，被尊为太上皇的明英宗趁明代宗生病之机发动政变复辟，史称“南宫之变”或“夺门之变”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 60,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1472,
     "yearEnd": 1529,
     "yearLabel": "1472",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "王守仁",
     "desc": "1472—1529年，王守仁，开创阳明学，提出“致良知”之说，使心学得到更系统的阐释，形成儒学演变发展的一个重要阶段。",
     "src": {
      "book": "中外历史对比年表",
      "page": 60,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1477,
     "yearEnd": null,
     "yearLabel": "1477",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明宪宗设立由宦官掌握的西厂",
     "desc": "1477年，明宪宗设立由宦官掌握的西厂，从事特务监察活动，其声势远出东厂、锦衣卫之上。",
     "src": {
      "book": "中外历史对比年表",
      "page": 61,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1455,
     "yearEnd": 1485,
     "yearLabel": "1455",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "玫瑰战争",
     "desc": "1455—1485年，玫瑰战争，英国兰开斯特家族（红玫瑰为徽）与约克家族（白玫瑰为徽）为首的两派封建主集团发生的战争，封建大贵族两败俱伤。",
     "src": {
      "book": "中外历史对比年表",
      "page": 60,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1456,
     "yearEnd": null,
     "yearLabel": "1456",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "德意志",
      "欧洲"
     ],
     "title": "德国古腾堡用活字排版印刷了《圣经》",
     "desc": "1456年，德国古腾堡用活字排版印刷了《圣经》，这是西欧最早的活字印刷品。",
     "src": {
      "book": "中外历史对比年表",
      "page": 60,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1467,
     "yearEnd": null,
     "yearLabel": "1467",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本室町幕府第八代将军的继嗣问题",
     "desc": "1467年，日本室町幕府第八代将军的继嗣问题，引发了一场持续十年的全国性大混战，史称“应仁之乱”，日本历史进入战国时代。",
     "src": {
      "book": "中外历史对比年表",
      "page": 60,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1469,
     "yearEnd": 1527,
     "yearLabel": "1469",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "马基雅维里",
     "desc": "1469—1527年，马基雅维里，意大利政治思想家，著《君主论》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 60,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1473,
     "yearEnd": 1543,
     "yearLabel": "1473",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "哥白尼",
     "desc": "1473—1543年，哥白尼，波兰天文学家，著《天体运行论》，提出“太阳中心说”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 60,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1478,
     "yearEnd": 1535,
     "yearLabel": "1478",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "欧洲"
     ],
     "title": "托马斯·莫尔",
     "desc": "1478—1535年，托马斯·莫尔，英国空想社会主义者，著《乌托邦》，在思想史上第一次设想了共产主义蓝图。",
     "src": {
      "book": "中外历史对比年表",
      "page": 61,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b88",
   "year": 1480,
   "yearLabel": "1480",
   "pages": [
    61,
    62,
    63
   ],
   "china": [
    {
     "year": 1480,
     "yearEnd": null,
     "yearLabel": "1480",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明朝派兵征讨鞑靼",
     "desc": "1480年，明朝派兵征讨鞑靼。",
     "src": {
      "book": "中外历史对比年表",
      "page": 61,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1484,
     "yearEnd": null,
     "yearLabel": "1484",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "鞑靼重新入居河套地区",
     "desc": "1484年，鞑靼重新入居河套地区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 61,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1487,
     "yearEnd": null,
     "yearLabel": "1487",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明孝宗后",
     "desc": "1487年，明孝宗后，科举试题出于“四书五经”，答题格式固定化为八个部分，称为八股文。",
     "src": {
      "book": "中外历史对比年表",
      "page": 61,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1487,
     "yearEnd": 1505,
     "yearLabel": "1487",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明孝宗弘治皇帝在位时",
     "desc": "1487—1505年，明孝宗弘治皇帝在位时，励精图治，锐意改革，使国家呈现出政治清明、社会安定的繁荣局面，史称“弘治中兴”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 61,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1492,
     "yearEnd": null,
     "yearLabel": "1492",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "广西古田壮族人民起义",
     "desc": "1492年，广西古田壮族人民起义；贵州都匀苗民起义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 62,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1497,
     "yearEnd": null,
     "yearLabel": "1497",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明孝宗下诏始修《大明会典》",
     "desc": "1497年，明孝宗下诏始修《大明会典》，这是以记载中国明代典章制度、行政法规为主的官修书，也是研究明史的重要文献。",
     "src": {
      "book": "中外历史对比年表",
      "page": 62,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1503,
     "yearEnd": null,
     "yearLabel": "1503",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明孝宗重申亲王之国旧例",
     "desc": "1503年，明孝宗重申亲王之国旧例，规定：亲王之国，船不过五百艘，其军校船自备挽。",
     "src": {
      "book": "中外历史对比年表",
      "page": 63,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1508,
     "yearEnd": null,
     "yearLabel": "1508",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明武宗增设“内行厂”",
     "desc": "1508年，明武宗增设“内行厂”，号令和监控东、西厂特务机关，这些由宦官掌握的特务机关，不循律例规则，对全国上下实行恐怖政治和肆意掠夺。",
     "src": {
      "book": "中外历史对比年表",
      "page": 63,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1480,
     "yearEnd": null,
     "yearLabel": "1480",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗斯",
     "countries": [
      "罗斯",
      "俄国",
      "中亚"
     ],
     "title": "蒙古统治罗斯的历史结束",
     "desc": "1480年，蒙古统治罗斯的历史结束，莫斯科成为独立统一的中央集权国家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 61,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1480,
     "yearEnd": null,
     "yearLabel": "1480",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "《佛罗伦萨药典》",
     "desc": "15世纪下，《佛罗伦萨药典》，欧洲最早由国家颁布的药典。",
     "src": {
      "book": "中外历史对比年表",
      "page": 61,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1483,
     "yearEnd": 1546,
     "yearLabel": "1483",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "马丁·路德",
     "desc": "1483—1546年，马丁·路德，德国宗教改革家，提出“因信称义”的宗教改革理论，创立新教派别路德宗。",
     "src": {
      "book": "中外历史对比年表",
      "page": 61,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1485,
     "yearEnd": 1603,
     "yearLabel": "1485",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国都铎王朝时期",
     "desc": "1485—1603年，英国都铎王朝时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 61,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1487,
     "yearEnd": null,
     "yearLabel": "1487",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "葡萄牙人迪亚斯沿非洲西海岸向南航行",
     "desc": "1487年，葡萄牙人迪亚斯沿非洲西海岸向南航行，发现了非洲南端的好望角。",
     "src": {
      "book": "中外历史对比年表",
      "page": 61,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1492,
     "yearEnd": null,
     "yearLabel": "1492",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "卡斯提尔军队进入格林纳达",
     "desc": "1492年，卡斯提尔军队进入格林纳达，穆斯林在西班牙的最后一个据点陷落。",
     "src": {
      "book": "中外历史对比年表",
      "page": 62,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1492,
     "yearEnd": null,
     "yearLabel": "1492",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "欧洲",
      "美洲"
     ],
     "title": "意大利航海家哥伦布从西欧出发一直向西航行",
     "desc": "1492年，意大利航海家哥伦布从西欧出发一直向西航行，发现了美洲新大陆。",
     "src": {
      "book": "中外历史对比年表",
      "page": 62,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1493,
     "yearEnd": null,
     "yearLabel": "1493",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "欧洲"
     ],
     "title": "教皇确定以亚速尔群岛和佛得角群岛以西100里格的子午线为分界线",
     "desc": "1493年，教皇确定以亚速尔群岛和佛得角群岛以西100里格的子午线为分界线，史称“教皇子午线”，以西土地归西班牙，以东归葡萄牙。",
     "src": {
      "book": "中外历史对比年表",
      "page": 62,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1494,
     "yearEnd": null,
     "yearLabel": "1494",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会"
     ],
     "title": "西葡两国缔结《托得西拉斯条约》",
     "desc": "1494年，西葡两国缔结《托得西拉斯条约》，把教皇子午线向西移动270里格。",
     "src": {
      "book": "中外历史对比年表",
      "page": 62,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1494,
     "yearEnd": 1559,
     "yearLabel": "1494",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "欧洲"
     ],
     "title": "法王与德皇为争夺意大利而展开长期战争",
     "desc": "1494—1559年，法王与德皇为争夺意大利而展开长期战争，以缔结《卡托·坎布雷齐和约》告终。",
     "src": {
      "book": "中外历史对比年表",
      "page": 62,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1497,
     "yearEnd": 1498,
     "yearLabel": "1497",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "欧洲"
     ],
     "title": "葡萄牙人达·伽马沿非洲西岸经好望角进入印度洋",
     "desc": "1497—1498年，葡萄牙人达·伽马沿非洲西岸经好望角进入印度洋，开辟了东西方贸易的新航线。",
     "src": {
      "book": "中外历史对比年表",
      "page": 62,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1500,
     "yearEnd": null,
     "yearLabel": "1500",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "欧洲",
      "美洲"
     ],
     "title": "葡萄牙卡布拉尔远征队去印度途中",
     "desc": "1500年，葡萄牙卡布拉尔远征队去印度途中，在赤道海流冲击下，漂流到南美洲巴西登陆，于是巴西成为葡萄牙领地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 62,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1501,
     "yearEnd": null,
     "yearLabel": "1501",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "第一艘满载非洲奴隶的船只到达圣多明各岛",
     "desc": "1501年，第一艘满载非洲奴隶的船只到达圣多明各岛。",
     "src": {
      "book": "中外历史对比年表",
      "page": 63,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1505,
     "yearEnd": 1533,
     "yearLabel": "1505",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗斯",
     "countries": [
      "罗斯",
      "俄国"
     ],
     "title": "瓦西里三世时期，莫斯科最终实现了全罗斯的统一",
     "desc": "1505—1533年，瓦西里三世时期，莫斯科最终实现了全罗斯的统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 63,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1509,
     "yearEnd": null,
     "yearLabel": "1509",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "阿拉伯",
      "印度",
      "欧洲"
     ],
     "title": "葡萄牙人在阿拉伯海的第乌港附近击败穆斯林舰队",
     "desc": "1509年，葡萄牙人在阿拉伯海的第乌港附近击败穆斯林舰队，进而确立了印度洋上的霸权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 63,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b89",
   "year": 1510,
   "yearLabel": "1510",
   "pages": [
    63,
    64,
    65
   ],
   "china": [
    {
     "year": 1510,
     "yearEnd": null,
     "yearLabel": "1510",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "霸州爆发了刘六、刘七领导的武装暴动",
     "desc": "1510年，霸州爆发了刘六、刘七领导的武装暴动，历时三年被明军击败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 63,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1516,
     "yearEnd": null,
     "yearLabel": "1516",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "王守仁巡抚南赣等地",
     "desc": "1516年，王守仁巡抚南赣等地，通过改组军队并行十家牌法，两年间基本平定横行数十年之巨寇。",
     "src": {
      "book": "中外历史对比年表",
      "page": 63,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1517,
     "yearEnd": null,
     "yearLabel": "1517",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "葡萄牙国王遣使率舰队来华",
     "desc": "1517年，葡萄牙国王遣使率舰队来华，在广东遭地方政府拒绝入境后，开炮强行进入广州。",
     "src": {
      "book": "中外历史对比年表",
      "page": 64,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1518,
     "yearEnd": 1593,
     "yearLabel": "1518",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李时珍",
     "desc": "1518—1593年，李时珍，明代名医，所著《本草纲目》是药物学巨著，对后世影响巨大，并被译成多种外国文字。",
     "src": {
      "book": "中外历史对比年表",
      "page": 64,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1519,
     "yearEnd": null,
     "yearLabel": "1519",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宁王朱宸濠在南昌起兵叛乱",
     "desc": "1519年，宁王朱宸濠在南昌起兵叛乱，汀赣巡抚王守仁联合湖广、两广驻军平息了叛乱。",
     "src": {
      "book": "中外历史对比年表",
      "page": 64,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1521,
     "yearEnd": 1528,
     "yearLabel": "1521",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "杨廷和为首的文官系统与明世宗嘉靖皇帝",
     "desc": "1521—1528年，杨廷和为首的文官系统与明世宗嘉靖皇帝，围绕皇统礼仪伦序发生长达七年的争执，即“大礼议风波”，后以编定《明伦大典》做终结，皇帝维持了在国家体制中的绝对权力。",
     "src": {
      "book": "中外历史对比年表",
      "page": 64,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1522,
     "yearEnd": 1566,
     "yearLabel": "1522",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明世宗嘉靖时期，玉米和甘薯从美洲经东南沿海及缅甸传入中国",
     "desc": "1522—1566年，明世宗嘉靖时期，玉米和甘薯从美洲经东南沿海及缅甸传入中国，提高了中国食品生产的总产量。",
     "src": {
      "book": "中外历史对比年表",
      "page": 65,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1526,
     "yearEnd": null,
     "yearLabel": "1526",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明世宗下诏禁严刑",
     "desc": "1526年，明世宗下诏禁严刑，规定有严刑致人以死的，降革如法；上官容隐，不及时参究的，一律治罪。",
     "src": {
      "book": "中外历史对比年表",
      "page": 65,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1527,
     "yearEnd": null,
     "yearLabel": "1527",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "广西发生卢苏、王受为首的土司反叛",
     "desc": "1527年，广西发生卢苏、王受为首的土司反叛，王守仁兵不血刃，招抚其众7万人，卢苏等二人归附。",
     "src": {
      "book": "中外历史对比年表",
      "page": 65,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1509,
     "yearEnd": 1564,
     "yearLabel": "1509",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "德意志",
      "法兰西"
     ],
     "title": "约翰·加尔文",
     "desc": "1509—1564年，约翰·加尔文，法国人，宗教改革家，著《基督教原理》提出系统的新教神学理论，创立了新教加尔文派；其关于“预定论”的宗教学说，鼓舞了新兴资产阶级的进取精神。",
     "src": {
      "book": "中外历史对比年表",
      "page": 63,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1511,
     "yearEnd": null,
     "yearLabel": "1511",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲",
      "东南亚"
     ],
     "title": "葡萄牙人侵入马六甲",
     "desc": "1511年，葡萄牙人侵入马六甲，控制海上通道，严重影响了中国与南洋的贸易。",
     "src": {
      "book": "中外历史对比年表",
      "page": 63,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1514,
     "yearEnd": 1564,
     "yearLabel": "1514",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "维萨里",
     "desc": "1514—1564年，维萨里，比利时医生，近代解剖学奠基人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 63,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1516,
     "yearEnd": null,
     "yearLabel": "1516",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "法兰西"
     ],
     "title": "法国国王同教皇缔结《波伦亚协定》",
     "desc": "1516年，法国国王同教皇缔结《波伦亚协定》，规定国王有权任命本国教会的高级教职，有权向教士征税，教皇只保留在法国征收年捐的权利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 63,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1517,
     "yearEnd": null,
     "yearLabel": "1517",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "奥斯曼"
     ],
     "title": "马木路克王朝灭亡",
     "desc": "1517年，马木路克王朝灭亡，埃及结束独立发展过程，沦为奥斯曼帝国行省。",
     "src": {
      "book": "中外历史对比年表",
      "page": 64,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1517,
     "yearEnd": null,
     "yearLabel": "1517",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯",
      "奥斯曼"
     ],
     "title": "奥斯曼土耳其素丹谢里姆一世",
     "desc": "1517年，奥斯曼土耳其素丹谢里姆一世，以哈里发的资格接管了麦加克尔白神庙的钥匙，帝国成为伊斯兰世界的政治宗教中心。",
     "src": {
      "book": "中外历史对比年表",
      "page": 64,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1519,
     "yearEnd": 1521,
     "yearLabel": "1519",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "欧洲",
      "美洲"
     ],
     "title": "西班牙贵族赫南多·科泰斯征服北美大陆上的印第安人阿兹特克帝国",
     "desc": "1519—1521年，西班牙贵族赫南多·科泰斯征服北美大陆上的印第安人阿兹特克帝国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 64,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1519,
     "yearEnd": 1522,
     "yearLabel": "1519",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "麦哲伦率船队从西班牙出发",
     "desc": "1519—1522年，麦哲伦率船队从西班牙出发，历时三年，完成了人类历史上第一次绕全球一周的航行。",
     "src": {
      "book": "中外历史对比年表",
      "page": 64,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1520,
     "yearEnd": 1566,
     "yearLabel": "1520",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼"
     ],
     "title": "奥斯曼土耳其帝国素丹苏莱曼一世时期，也是帝国的全盛时代",
     "desc": "1520—1566年，奥斯曼土耳其帝国素丹苏莱曼一世时期，也是帝国的全盛时代。",
     "src": {
      "book": "中外历史对比年表",
      "page": 64,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1524,
     "yearEnd": 1525,
     "yearLabel": "1524",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "德意志"
     ],
     "title": "德国爆发规模宏大的农民战争",
     "desc": "1524—1525年，德国爆发规模宏大的农民战争，沉重打击了天主教会在德国的势力。",
     "src": {
      "book": "中外历史对比年表",
      "page": 65,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1526,
     "yearEnd": null,
     "yearLabel": "1526",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "欧洲"
     ],
     "title": "莫哈奇大战",
     "desc": "1526年，莫哈奇大战，奥斯曼土耳其军队击溃匈牙利军队，匈牙利分裂。",
     "src": {
      "book": "中外历史对比年表",
      "page": 65,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1526,
     "yearEnd": 1857,
     "yearLabel": "1526",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "印度莫卧儿帝国时期",
     "desc": "1526—1857年，印度莫卧儿帝国时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 65,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1526,
     "yearEnd": null,
     "yearLabel": "1526",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "中亚",
      "非洲"
     ],
     "title": "第一次帕尼帕特战役",
     "desc": "1526年，第一次帕尼帕特战役，帖木儿帝国后裔巴布尔率军与印度德里苏丹会战，德里军惨败，德里苏丹王朝结束，莫卧儿人开始统治印度。",
     "src": {
      "book": "中外历史对比年表",
      "page": 65,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b90",
   "year": 1530,
   "yearLabel": "1530",
   "pages": [
    65,
    66
   ],
   "china": [
    {
     "year": 1527,
     "yearEnd": 1602,
     "yearLabel": "1527",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李贽",
     "desc": "1527—1602年，李贽，明清之际反封建启蒙思想的先驱。他敢于打破千百年来对孔子的迷信，宣称不能以“孔子之是非为是非”；反对宋明理学家鼓吹的“存天理，去人欲”的说教。",
     "src": {
      "book": "中外历史对比年表",
      "page": 65,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1534,
     "yearEnd": null,
     "yearLabel": "1534",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明世宗批准户部推行“垦田劝农法”",
     "desc": "1534年，明世宗批准户部推行“垦田劝农法”，查勘荒田，招集流民，督劝耕垦。",
     "src": {
      "book": "中外历史对比年表",
      "page": 65,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1530,
     "yearEnd": 1596,
     "yearLabel": "1530",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "博丹",
     "desc": "1530—1596年，博丹，法国资产阶级政治思想家，著《国家论》，提出国家主权理论。",
     "src": {
      "book": "中外历史对比年表",
      "page": 65,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1531,
     "yearEnd": 1532,
     "yearLabel": "1531",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "欧洲",
      "美洲"
     ],
     "title": "西班牙人弗朗西斯科·皮萨罗率远征军征服了印加帝国",
     "desc": "1531—1532年，西班牙人弗朗西斯科·皮萨罗率远征军征服了印加帝国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 65,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1534,
     "yearEnd": null,
     "yearLabel": "1534",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "罗马",
      "基督教会",
      "英格兰"
     ],
     "title": "英国议会通过“至尊法”",
     "desc": "1534年，英国议会通过“至尊法”，宣布国王是英国教会唯一的、至高无上的首脑，英国与罗马教廷正式决裂。",
     "src": {
      "book": "中外历史对比年表",
      "page": 65,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1534,
     "yearEnd": null,
     "yearLabel": "1534",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "基督教会",
      "欧洲"
     ],
     "title": "耶稣会成立",
     "desc": "1534年，耶稣会成立，创始人是西班牙贵族伊格纳修·罗耀拉，旨在重振罗马教会，重树教皇权威，扩大天主教的影响。",
     "src": {
      "book": "中外历史对比年表",
      "page": 66,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b91",
   "year": 1535,
   "yearLabel": "1535",
   "pages": [
    66
   ],
   "china": [
    {
     "year": 1535,
     "yearEnd": null,
     "yearLabel": "1535",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "葡萄牙人通过行贿获准在澳门停泊贸易船只",
     "desc": "1535年，葡萄牙人通过行贿获准在澳门停泊贸易船只，后成为葡萄牙在中国东南门户的一个殖民据点。",
     "src": {
      "book": "中外历史对比年表",
      "page": 66,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1540,
     "yearEnd": null,
     "yearLabel": "1540",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明世宗复设镇守江淮总兵",
     "desc": "1540年，明世宗因“江洋群盗，凶焰甚炽”，复设镇守江淮总兵，驻扎镇江，提督沿江上下兵防。",
     "src": {
      "book": "中外历史对比年表",
      "page": 66,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1538,
     "yearEnd": null,
     "yearLabel": "1538",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "欧洲"
     ],
     "title": "普列维萨战役",
     "desc": "1538年，普列维萨战役，奥斯曼土耳其海军大败西班牙和威尼斯的联合舰队。",
     "src": {
      "book": "中外历史对比年表",
      "page": 66,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1539,
     "yearEnd": null,
     "yearLabel": "1539",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "法兰西"
     ],
     "title": "法王法兰西斯一世下令国家法令使用法语",
     "desc": "1539年，法王法兰西斯一世下令国家法令使用法语，不得使用教会惯用的拉丁语。",
     "src": {
      "book": "中外历史对比年表",
      "page": 66,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1541,
     "yearEnd": 1546,
     "yearLabel": "1541",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "欧洲",
      "美洲"
     ],
     "title": "西班牙殖民者侵占尤卡坦半岛",
     "desc": "1541—1546年，西班牙殖民者侵占尤卡坦半岛，玛雅人的独立发展被打断。",
     "src": {
      "book": "中外历史对比年表",
      "page": 66,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b92",
   "year": 1545,
   "yearLabel": "1545",
   "pages": [
    66
   ],
   "china": [
    {
     "year": 1545,
     "yearEnd": null,
     "yearLabel": "1545",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明朝再次禁止葡萄牙船驶入宁波港",
     "desc": "1545年，明朝再次禁止葡萄牙船驶入宁波港，葡人被迫使用广东浪白澳为泊口。",
     "src": {
      "book": "中外历史对比年表",
      "page": 66,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1548,
     "yearEnd": 1549,
     "yearLabel": "1548",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "浙江巡抚朱纨遣军进攻葡萄牙人占据的宁波双屿、泉州浯屿",
     "desc": "1548—1549年，浙江巡抚朱纨遣军进攻葡萄牙人占据的宁波双屿、泉州浯屿，大获全胜，打击了殖民者及与其勾结的中国豪民。",
     "src": {
      "book": "中外历史对比年表",
      "page": 66,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1545,
     "yearEnd": 1565,
     "yearLabel": "1545",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "基督教会",
      "德意志"
     ],
     "title": "天主教会发动了反宗教改革运动",
     "desc": "1545—1565年，天主教会发动了反宗教改革运动，着手革除天主教内部弊端，但在信仰问题上，坚持罗马教会的教条和仪式正确无误，教皇是最高权威，唯有教会有权解释《圣经》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 66,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1547,
     "yearEnd": null,
     "yearLabel": "1547",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "莫斯科大公伊凡四世亲政",
     "desc": "1547年，莫斯科大公伊凡四世亲政，改称“沙皇”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 66,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1548,
     "yearEnd": 1600,
     "yearLabel": "1548",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "欧洲"
     ],
     "title": "布鲁诺",
     "desc": "1548—1600年，布鲁诺，意大利人，反对宗教蒙昧主义的伟大思想家，因宣传唯物主义世界观和捍卫哥白尼学说，被罗马教廷处以火刑。",
     "src": {
      "book": "中外历史对比年表",
      "page": 66,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b93",
   "year": 1550,
   "yearLabel": "1550",
   "pages": [
    67
   ],
   "china": [
    {
     "year": 1550,
     "yearEnd": null,
     "yearLabel": "1550",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒙古俺答部大举入侵明边",
     "desc": "1550年，蒙古俺答部大举入侵明边，进古北口，直逼京师，大肆劫掠数日后撤军，这次严重的边患史称“庚戌之变”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 67,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1555,
     "yearEnd": null,
     "yearLabel": "1555",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南京兵部尚书张经统率俞大猷等将领于浙江嘉兴大破倭寇",
     "desc": "1555年，南京兵部尚书张经统率俞大猷等将领于浙江嘉兴大破倭寇。",
     "src": {
      "book": "中外历史对比年表",
      "page": 67,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1557,
     "yearEnd": null,
     "yearLabel": "1557",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "葡萄牙殖民者于澳门私自扩充居地",
     "desc": "1557年，葡萄牙殖民者于澳门私自扩充居地，设官管理，非法将澳门变为殖民地，成为西方殖民者侵略中国最早的一个据点。",
     "src": {
      "book": "中外历史对比年表",
      "page": 67,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1559,
     "yearEnd": null,
     "yearLabel": "1559",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "戚继光招募、训练“戚家军”",
     "desc": "1559年，戚继光招募、训练“戚家军”，演习“鸳鸯阵法”，多次大败倭寇，浙江倭患渐息。",
     "src": {
      "book": "中外历史对比年表",
      "page": 67,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1550,
     "yearEnd": null,
     "yearLabel": "1550",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲",
      "美洲"
     ],
     "title": "西班牙已征服葡属巴西以外的整个南美、中美及北美的一部分",
     "desc": "1550年，西班牙已征服葡属巴西以外的整个南美、中美及北美的一部分。",
     "src": {
      "book": "中外历史对比年表",
      "page": 67,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1552,
     "yearEnd": 1556,
     "yearLabel": "1552",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "中亚"
     ],
     "title": "俄沙皇伊凡四世陆续征服伏尔加河中下游各蒙古汗国",
     "desc": "1552—1556年，俄沙皇伊凡四世陆续征服伏尔加河中下游各蒙古汗国，乌拉尔山脉以西尽入俄国版图。",
     "src": {
      "book": "中外历史对比年表",
      "page": 67,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1555,
     "yearEnd": null,
     "yearLabel": "1555",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国路德派诸侯与皇帝为首的天主教诸侯之间缔结了《奥格斯堡和约》",
     "desc": "1555年，德国路德派诸侯与皇帝为首的天主教诸侯之间缔结了《奥格斯堡和约》，规定诸侯有权决定其臣民的信仰，即“教随国定”的原则，路德派新教得到正式承认。",
     "src": {
      "book": "中外历史对比年表",
      "page": 67,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1556,
     "yearEnd": null,
     "yearLabel": "1556",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "第二次帕尼帕特战役",
     "desc": "1556年，第二次帕尼帕特战役，莫卧儿帝国军队击败阿富汗苏尔王朝军队，结束了阿富汗人与莫卧儿人在印度争霸的历史，为进一步统一印度奠定了基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 67,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1558,
     "yearEnd": 1583,
     "yearLabel": "1558",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "北欧",
     "countries": [
      "北欧",
      "俄国",
      "欧洲"
     ],
     "title": "立窝尼亚战争",
     "desc": "1558—1583年，立窝尼亚战争，沙皇为争夺波罗的海沿岸地区和出海口，与瑞典、波兰、立陶宛等国进行的战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 67,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b94",
   "year": 1560,
   "yearLabel": "1560",
   "pages": [
    68,
    69
   ],
   "china": [
    {
     "year": 1562,
     "yearEnd": null,
     "yearLabel": "1562",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "倭寇窜入福建",
     "desc": "1562年，倭寇窜入福建，攻陷兴化府，将府城焚掠一空，远近为之震动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 68,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1563,
     "yearEnd": 1564,
     "yearLabel": "1563",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "俞大猷、戚继光等率部围剿倭寇盘踞的平海",
     "desc": "1563—1564年，俞大猷、戚继光等率部围剿倭寇盘踞的平海，福建倭患平定。",
     "src": {
      "book": "中外历史对比年表",
      "page": 68,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1564,
     "yearEnd": null,
     "yearLabel": "1564",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "俞大猷等在广东海丰等地屡破倭寇",
     "desc": "1564年，俞大猷等在广东海丰等地屡破倭寇，东南沿海由中外海盗造成的动乱至此平息。",
     "src": {
      "book": "中外历史对比年表",
      "page": 68,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1567,
     "yearEnd": null,
     "yearLabel": "1567",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明政府下令开放海禁",
     "desc": "1567年，明政府下令开放海禁，“准贩东西二洋”，通海体制维持到明末，此间是中国民间对外贸易发展的黄金时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 69,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1560,
     "yearEnd": 1605,
     "yearLabel": "1560",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "印度莫卧儿帝国阿克巴大帝时期，扩张帝国版图",
     "desc": "1560—1605年，印度莫卧儿帝国阿克巴大帝时期，扩张帝国版图，实行一系列改革政策，使帝国进入兴盛时代。",
     "src": {
      "book": "中外历史对比年表",
      "page": 68,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1561,
     "yearEnd": 1626,
     "yearLabel": "1561",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "弗朗西斯·培根",
     "desc": "1561—1626年，弗朗西斯·培根，英国近代科学家，提出研究自然科学的新方法——归纳法。",
     "src": {
      "book": "中外历史对比年表",
      "page": 68,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1562,
     "yearEnd": 1598,
     "yearLabel": "1562",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "法兰西"
     ],
     "title": "胡格诺战争",
     "desc": "1562—1598年，胡格诺战争，法国宗教战争，在南方信仰新教的胡格诺派贵族与北方天主教集团之间进行。",
     "src": {
      "book": "中外历史对比年表",
      "page": 68,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1563,
     "yearEnd": null,
     "yearLabel": "1563",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "基督教会",
     "countries": [
      "基督教会",
      "英格兰"
     ],
     "title": "英国议会制定《39条信纲》",
     "desc": "1563年，英国议会制定《39条信纲》，规定了英国教会的教义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 68,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1564,
     "yearEnd": 1642,
     "yearLabel": "1564",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "伽利略",
     "desc": "1564—1642年，伽利略，意大利科学家，发明了摆针和温度计，倡导数学与实验相结合的研究方法，被誉为“近代力学之父”“近代科学之父”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 68,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1565,
     "yearEnd": null,
     "yearLabel": "1565",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲",
      "美洲"
     ],
     "title": "西班牙征服佛罗里达",
     "desc": "1565年，西班牙征服佛罗里达，在北美建立了第一个殖民地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 68,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1565,
     "yearEnd": null,
     "yearLabel": "1565",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲",
      "东南亚"
     ],
     "title": "西班牙殖民者占领菲律宾",
     "desc": "1565年，西班牙殖民者占领菲律宾，作为在东方进行贸易的根据地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 68,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1566,
     "yearEnd": null,
     "yearLabel": "1566",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "西属尼德兰爆发革命",
     "desc": "1566年，西属尼德兰爆发革命，这是人类历史上第一次成功的资产阶级革命。",
     "src": {
      "book": "中外历史对比年表",
      "page": 69,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1568,
     "yearEnd": 1639,
     "yearLabel": "1568",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "康帕内拉",
     "desc": "1568—1639年，康帕内拉，意大利政治思想家，早期空想社会主义者，著《太阳城》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 69,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1569,
     "yearEnd": null,
     "yearLabel": "1569",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "《卢布林合并条约》",
     "desc": "1569年，《卢布林合并条约》，规定波兰立陶宛正式合并，组成一个国家。由此，波兰立陶宛王国成为东欧的封建强国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 69,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b95",
   "year": 1571,
   "yearLabel": "1571",
   "pages": [
    69,
    70
   ],
   "china": [
    {
     "year": 1573,
     "yearEnd": 1582,
     "yearLabel": "1573",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "内阁首辅张居正主持国政",
     "desc": "1573—1582年，内阁首辅张居正主持国政，推行了一系列的整顿和改革措施，使国家行政系统效率提高，维护了社会稳定，促进了经济发展。",
     "src": {
      "book": "中外历史对比年表",
      "page": 69,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1573,
     "yearEnd": 1620,
     "yearLabel": "1573",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明神宗万历年间",
     "desc": "1573—1620年，明神宗万历年间，烟草从吕宋传入中国，对农业的经济效益提高产生了促进作用。",
     "src": {
      "book": "中外历史对比年表",
      "page": 69,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1578,
     "yearEnd": 1581,
     "yearLabel": "1578",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张居正主持对全国土地重新丈量",
     "desc": "1578—1581年，张居正主持对全国土地重新丈量，在此基础上推行“一条鞭法”，即根据田产和丁口，将应承担的赋役一律折合为白银征收。这一改革稳定了社会和国家财政。",
     "src": {
      "book": "中外历史对比年表",
      "page": 69,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1578,
     "yearEnd": 1579,
     "yearLabel": "1578",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "工部侍郎潘季驯放弃过去疏浚河道的治理之法",
     "desc": "1578—1579年，工部侍郎潘季驯放弃过去疏浚河道的治理之法，而归束黄河依势入海，同时引淮河清水加强水流使不至淤淀，复修筑堤坝以防溃决。此后数年，黄河不为大患。",
     "src": {
      "book": "中外历史对比年表",
      "page": 70,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1571,
     "yearEnd": null,
     "yearLabel": "1571",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "基督教会",
      "欧洲"
     ],
     "title": "勒盼多战役",
     "desc": "1571年，勒盼多战役，西班牙与威尼斯、教皇结盟，大败土耳其舰队，遏制了土耳其对西地中海的进攻。",
     "src": {
      "book": "中外历史对比年表",
      "page": 69,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1573,
     "yearEnd": null,
     "yearLabel": "1573",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲",
      "非洲"
     ],
     "title": "西班牙夺取北非的突尼斯",
     "desc": "1573年，西班牙夺取北非的突尼斯。",
     "src": {
      "book": "中外历史对比年表",
      "page": 69,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b96",
   "year": 1580,
   "yearLabel": "1580",
   "pages": [
    70,
    71,
    72
   ],
   "china": [
    {
     "year": 1583,
     "yearEnd": null,
     "yearLabel": "1583",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "意大利人罗明坚和利玛窦组织第一个中国耶稣会传教团在广东肇庆定居下来",
     "desc": "1583年，意大利人罗明坚和利玛窦组织第一个中国耶稣会传教团在广东肇庆定居下来。",
     "src": {
      "book": "中外历史对比年表",
      "page": 70,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1586,
     "yearEnd": null,
     "yearLabel": "1586",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明神宗万历皇帝自此之后以身体不佳为名很少上朝",
     "desc": "1586年，明神宗万历皇帝自此之后以身体不佳为名很少上朝，也很少接见大臣，皇帝操权柄而不理庶务，时称“九重渊默”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 70,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1591,
     "yearEnd": 1666,
     "yearLabel": "1591",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "汤若望",
     "desc": "1591—1666年，汤若望，德国人，耶稣会士，明思宗崇祯时参与修订历法，后编成《崇祯历书》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 71,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1592,
     "yearEnd": null,
     "yearLabel": "1592",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "“一条鞭法”在全国的普遍实行",
     "desc": "1592年，“一条鞭法”在全国的普遍实行，使实物赋税和直接力役改为货币赋役，推动了农民与市场的结合。",
     "src": {
      "book": "中外历史对比年表",
      "page": 71,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1592,
     "yearEnd": null,
     "yearLabel": "1592",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宁夏副总兵发动叛乱",
     "desc": "1592年，宁夏副总兵发动叛乱，获河套地区鞑靼人相助，明朝军队最终发黄河水淹宁夏城，才平息叛乱。",
     "src": {
      "book": "中外历史对比年表",
      "page": 71,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1593,
     "yearEnd": null,
     "yearLabel": "1593",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "吏部尚书孙鑨主持京察（京官考察）",
     "desc": "1593年，吏部尚书孙鑨主持京察（京官考察），许多阁臣任用的私人和吏部大员的姻亲也在被贬斥之列，史称其“秉公澄汰”或“无所徇私”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 71,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1594,
     "yearEnd": null,
     "yearLabel": "1594",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "罢官的吏部郎中顾宪成",
     "desc": "1594年，罢官的吏部郎中顾宪成，得到资助重建东林书院，聚集士人讲学，形成东林学派。",
     "src": {
      "book": "中外历史对比年表",
      "page": 71,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1580,
     "yearEnd": null,
     "yearLabel": "1580",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "西班牙用武力兼并了葡萄牙王国及其海外殖民地",
     "desc": "1580年，西班牙用武力兼并了葡萄牙王国及其海外殖民地，其霸权达到顶峰。",
     "src": {
      "book": "中外历史对比年表",
      "page": 70,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1581,
     "yearEnd": null,
     "yearLabel": "1581",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "奥兰治亲王在海牙召集联合省代表大会",
     "desc": "1581年，奥兰治亲王在海牙召集联合省代表大会，宣布正式脱离西班牙独立，成立联省共和国，简称荷兰共和国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 70,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1581,
     "yearEnd": 1584,
     "yearLabel": "1581",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "中亚"
     ],
     "title": "俄国征服了乌拉尔山脉以东的蒙古人汗国",
     "desc": "1581—1584年，俄国征服了乌拉尔山脉以东的蒙古人汗国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 70,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1585,
     "yearEnd": 1642,
     "yearLabel": "1585",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "欧洲"
     ],
     "title": "黎塞留",
     "desc": "1585—1642年，黎塞留，法国红衣主教，路易十三时任首席大臣，执行“国家利益至上”政策，使法国工商业发展，专制王权巩固，恢复了在欧洲的重要地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 70,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1588,
     "yearEnd": null,
     "yearLabel": "1588",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "欧洲"
     ],
     "title": "英国和西班牙爆发海战",
     "desc": "1588年，英国和西班牙爆发海战，西班牙“无敌舰队”被击溃，英国初步夺得了大西洋航线的控制权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 70,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1588,
     "yearEnd": 1679,
     "yearLabel": "1588",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "霍布斯",
     "desc": "1588—1679年，霍布斯，英国政治思想家，著《利维坦》阐述其社会政治思想。",
     "src": {
      "book": "中外历史对比年表",
      "page": 71,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1591,
     "yearEnd": null,
     "yearLabel": "1591",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "欧洲"
     ],
     "title": "奥斯曼土耳其人入侵匈牙利",
     "desc": "1591年，奥斯曼土耳其人入侵匈牙利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 71,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1592,
     "yearEnd": 1598,
     "yearLabel": "1592",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本",
      "朝鲜半岛"
     ],
     "title": "日本关白丰臣秀吉两度率军入侵朝鲜",
     "desc": "1592—1598年，日本关白丰臣秀吉两度率军入侵朝鲜，中国明朝军队援朝抗倭，取得胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 71,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1593,
     "yearEnd": null,
     "yearLabel": "1593",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "法兰西"
     ],
     "title": "法王亨利四世放弃新教",
     "desc": "1593年，法王亨利四世放弃新教，改宗天主教。",
     "src": {
      "book": "中外历史对比年表",
      "page": 71,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1596,
     "yearEnd": 1650,
     "yearLabel": "1596",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "笛卡尔",
     "desc": "1596—1650年，笛卡尔，法国人，既是哲学家，又是物理学家、数学家、生理学家，主张怀疑一切，提出观察和思考是新的科学方法的两大原则。",
     "src": {
      "book": "中外历史对比年表",
      "page": 71,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1598,
     "yearEnd": null,
     "yearLabel": "1598",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国波旁王朝国王亨利四世颁布“南特敕令”",
     "desc": "1598年，法国波旁王朝国王亨利四世颁布“南特敕令”，宣布天主教为国教，同时胡格诺派取得合法地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 72,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b97",
   "year": 1600,
   "yearLabel": "1600",
   "pages": [
    72,
    73
   ],
   "china": [
    {
     "year": 1601,
     "yearEnd": null,
     "yearLabel": "1601",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "利玛窦得到明朝允许定居北京",
     "desc": "1601年，利玛窦得到明朝允许定居北京，并在北京建立天主教堂传播天主教。",
     "src": {
      "book": "中外历史对比年表",
      "page": 72,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1601,
     "yearEnd": 1615,
     "yearLabel": "1601",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "努尔哈赤陆续把女真壮丁组织起来",
     "desc": "1601—1615年，努尔哈赤陆续把女真壮丁组织起来，最后形成八个“旗”，由此建立起兵民一体、军政合一的“八旗制度”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 72,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1603,
     "yearEnd": null,
     "yearLabel": "1603",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "徐光启结识利玛窦",
     "desc": "1603年，徐光启结识利玛窦，在交往中学习了许多西方科学知识，此后致力于介绍、实验和应用西法来救助明朝的危机，著有《农政全书》，与利玛窦合译《几何原本》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 72,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1610,
     "yearEnd": 1695,
     "yearLabel": "1610",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "黄宗羲",
     "desc": "1610—1695年，黄宗羲，明清之际思想家，提出“天下为主，君为客”的命题、“有治法而后有治人”的法治思想，对封建专制政体进行了猛烈抨击，其激进的社会政治思想对近代社会的思想启蒙起到了重要作用。著《明夷待访录》、《明儒学案》等。",
     "src": {
      "book": "中外历史对比年表",
      "page": 72,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1613,
     "yearEnd": 1682,
     "yearLabel": "1613",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "顾炎武",
     "desc": "1613—1682年，顾炎武，明清之际思想家，倡导“经世致用”的学风与治学方法；提出“收天子之权寄之天下之人”的社会主张。著《天下郡国利病书》、《日知录》等。",
     "src": {
      "book": "中外历史对比年表",
      "page": 73,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1600,
     "yearEnd": null,
     "yearLabel": "1600",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "英格兰"
     ],
     "title": "英国东印度公司成立",
     "desc": "1600年，英国东印度公司成立，这个由英国政府特许的合股公司，逐渐发展为拥有广大领土的殖民政权，为英国在远东的殖民扩张奠定了基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 72,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1603,
     "yearEnd": null,
     "yearLabel": "1603",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本德川家康夺取政权",
     "desc": "1603年，日本德川家康夺取政权，自立为征夷大将军，在江户设立幕府，是为德川（江户）幕府统治的开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 72,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1606,
     "yearEnd": 1607,
     "yearLabel": "1606",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "俄国爆发波罗特尼科夫领导的农民起义",
     "desc": "1606—1607年，俄国爆发波罗特尼科夫领导的农民起义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 72,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1609,
     "yearEnd": null,
     "yearLabel": "1609",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "西班牙同荷兰签订休战协定",
     "desc": "1609年，西班牙同荷兰签订休战协定，事实上承认共和国独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 72,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1613,
     "yearEnd": 1917,
     "yearLabel": "1613",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "俄国罗曼诺夫王朝时期",
     "desc": "1613—1917年，俄国罗曼诺夫王朝时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 73,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b98",
   "year": 1615,
   "yearLabel": "1615",
   "pages": [
    73
   ],
   "china": [
    {
     "year": 1616,
     "yearEnd": null,
     "yearLabel": "1616",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "建州女真首领努尔哈赤初步统一女真之后",
     "desc": "1616年，建州女真首领努尔哈赤初步统一女真之后，在赫图阿拉（辽宁境）称汗登基，建国号金，史称“后金”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 73,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1619,
     "yearEnd": null,
     "yearLabel": "1619",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "努尔哈赤率后金军队于萨尔浒击败明朝军队",
     "desc": "1619年，努尔哈赤率后金军队于萨尔浒击败明朝军队，取得“萨尔浒大捷”，随后征服叶赫部女真，实现了对女真全部的统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 73,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1619,
     "yearEnd": 1692,
     "yearLabel": "1619",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "王夫之",
     "desc": "1619—1692年，王夫之，明清之际思想家，在本体论上，认为“气”是宇宙万物之源；在认识论上，建立了以“行”为基础的“知行合一”观；在历史观上，坚持进化论。",
     "src": {
      "book": "中外历史对比年表",
      "page": 73,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1615,
     "yearEnd": null,
     "yearLabel": "1615",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "大阪之战",
     "desc": "1615年，大阪之战，德川家康消灭丰臣氏残余势力，使日本摆脱长期内战，实现国家统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 73,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1618,
     "yearEnd": 1648,
     "yearLabel": "1618",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "三十年战争",
     "desc": "1618—1648年，三十年战争，因德国内部矛盾演变成的欧洲各国间的冲突。",
     "src": {
      "book": "中外历史对比年表",
      "page": 73,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1619,
     "yearEnd": 1683,
     "yearLabel": "1619",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "科尔伯",
     "desc": "1619—1683年，科尔伯，法国路易十四时任财政总监，执行重商主义政策，促进了法国工商业的发展。",
     "src": {
      "book": "中外历史对比年表",
      "page": 73,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1620,
     "yearEnd": null,
     "yearLabel": "1620",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "美洲"
     ],
     "title": "英国百余名清教徒乘“五月花号”航船渡海赴美",
     "desc": "1620年，英国百余名清教徒乘“五月花号”航船渡海赴美，在北美新英格兰建普利茅斯殖民地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 73,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b99",
   "year": 1620,
   "yearLabel": "1620",
   "pages": [
    74,
    75
   ],
   "china": [
    {
     "year": 1621,
     "yearEnd": 1627,
     "yearLabel": "1621",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明熹宗天启年间",
     "desc": "1621—1627年，明熹宗天启年间，宦官魏忠贤结党专权，大批东林派人士被捕杀、放逐、禁锢。",
     "src": {
      "book": "中外历史对比年表",
      "page": 74,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1621,
     "yearEnd": 1644,
     "yearLabel": "1621",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "明熹宗天启、崇祯时期，大江南北兴起了普遍的知识分子结社运动",
     "desc": "1621—1644年，明熹宗天启、崇祯时期，大江南北兴起了普遍的知识分子结社运动，著名的有复社、应社等。",
     "src": {
      "book": "中外历史对比年表",
      "page": 74,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1621,
     "yearEnd": 1625,
     "yearLabel": "1621",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "努尔哈赤陆续征服了辽东大部分地区后",
     "desc": "1621—1625年，努尔哈赤陆续征服了辽东大部分地区后，迁都沈阳。",
     "src": {
      "book": "中外历史对比年表",
      "page": 74,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1623,
     "yearEnd": 1688,
     "yearLabel": "1623",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南怀仁",
     "desc": "1623—1688年，南怀仁，比利时人，来华耶稣会士，康熙时任钦天监正，制造天文仪器，还为清政府监制大炮，著《康熙永年历法》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 74,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1626,
     "yearEnd": null,
     "yearLabel": "1626",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西班牙殖民者侵入台湾",
     "desc": "1626年，西班牙殖民者侵入台湾，占据了北部的基隆和淡水。",
     "src": {
      "book": "中外历史对比年表",
      "page": 74,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1627,
     "yearEnd": null,
     "yearLabel": "1627",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陕西地区爆发农民王二率领的饥民暴动",
     "desc": "1627年，陕西地区爆发农民王二率领的饥民暴动，揭开了明末农民大起义的序幕。",
     "src": {
      "book": "中外历史对比年表",
      "page": 74,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1636,
     "yearEnd": null,
     "yearLabel": "1636",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "皇太极于盛京正式登基称帝",
     "desc": "1636年，皇太极于盛京正式登基称帝，改国号为清，是为清朝的开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 75,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1622,
     "yearEnd": null,
     "yearLabel": "1622",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法王路易十三与胡格诺派媾和",
     "desc": "1622年，法王路易十三与胡格诺派媾和，恢复“南特敕令”效力。",
     "src": {
      "book": "中外历史对比年表",
      "page": 74,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1628,
     "yearEnd": null,
     "yearLabel": "1628",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国议会通过“权利请愿书”",
     "desc": "1628年，英国议会通过“权利请愿书”，规定国王不经议会同意不得征收捐税，不出示具体罪证不得任意捕人，和平时期不能随意实行军事法等。",
     "src": {
      "book": "中外历史对比年表",
      "page": 74,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1632,
     "yearEnd": 1704,
     "yearLabel": "1632",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "约翰·洛克",
     "desc": "1632—1704年，约翰·洛克，英国近代政治思想家，著《政府论》，有关自由思想的阐释为英国人反抗专制王权、维护自由传统提供了理论依据。",
     "src": {
      "book": "中外历史对比年表",
      "page": 74,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1633,
     "yearEnd": 1639,
     "yearLabel": "1633",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本幕府连续五次颁布“锁国令”",
     "desc": "1633—1639年，日本幕府连续五次颁布“锁国令”，确立了此后200余年的“锁国体制”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 75,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b100",
   "year": 1640,
   "yearLabel": "1640",
   "pages": [
    75,
    76
   ],
   "china": [
    {
     "year": 1640,
     "yearEnd": 1642,
     "yearLabel": "1640",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清军在辽西地区的松山击溃明军",
     "desc": "1640—1642年，清军在辽西地区的松山击溃明军，继而攻陷锦州，取得“松锦会战”的胜利，打开了通往山海关的重要通道。",
     "src": {
      "book": "中外历史对比年表",
      "page": 75,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1642,
     "yearEnd": null,
     "yearLabel": "1642",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "荷兰殖民者大败盘踞在台湾北部的西班牙殖民者",
     "desc": "1642年，荷兰殖民者大败盘踞在台湾北部的西班牙殖民者，全部占领台湾，把台湾变成其殖民地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 75,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1643,
     "yearEnd": null,
     "yearLabel": "1643",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "起义军领袖李自成进入湖广",
     "desc": "1643年，起义军领袖李自成进入湖广，攻克襄阳后称新顺王，建立政权。次年，李自成宣布建国号为大顺，年号永昌。",
     "src": {
      "book": "中外历史对比年表",
      "page": 75,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1644,
     "yearEnd": null,
     "yearLabel": "1644",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张献忠进军四川",
     "desc": "1644年，张献忠进军四川，在成都称帝，国号大西。",
     "src": {
      "book": "中外历史对比年表",
      "page": 75,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1644,
     "yearEnd": null,
     "yearLabel": "1644",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李自成率大军北伐",
     "desc": "1644年，李自成率大军北伐，攻克北京。明思宗崇祯皇帝自缢身亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 76,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1644,
     "yearEnd": null,
     "yearLabel": "1644",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "福王朱由崧在一批明朝遗老和残存军事势力的拥立下",
     "desc": "1644年，福王朱由崧在一批明朝遗老和残存军事势力的拥立下，于南京称帝，年号弘光，控制江南半壁江山。后于1645年被清军灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 76,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1644,
     "yearEnd": null,
     "yearLabel": "1644",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李自成撤离北京后",
     "desc": "1644年，李自成撤离北京后，清顺治帝迁都北京。",
     "src": {
      "book": "中外历史对比年表",
      "page": 76,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1640,
     "yearEnd": null,
     "yearLabel": "1640",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国资产阶级革命爆发",
     "desc": "1640年，英国资产阶级革命爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 75,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1642,
     "yearEnd": 1727,
     "yearLabel": "1642",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "艾萨克·牛顿",
     "desc": "1642—1727年，艾萨克·牛顿，英国近代科学家，其最大的贡献在物理学方面，发现了宇宙的法则。",
     "src": {
      "book": "中外历史对比年表",
      "page": 75,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1642,
     "yearEnd": 1648,
     "yearLabel": "1642",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国以国王查理一世为首的王党势力",
     "desc": "1642—1648年，英国以国王查理一世为首的王党势力，与以议会为核心的资产阶级阵营爆发内战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 75,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1644,
     "yearEnd": null,
     "yearLabel": "1644",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "克伦威尔率领议会军在马斯顿荒原大败国王军",
     "desc": "1644年，克伦威尔率领议会军在马斯顿荒原大败国王军，议会得以控制北部地区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 75,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1644,
     "yearEnd": null,
     "yearLabel": "1644",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "德意志",
      "法兰西"
     ],
     "title": "法国军队将神圣罗马帝国皇帝的势力逐出莱茵河中游地区",
     "desc": "1644年，法国军队将神圣罗马帝国皇帝的势力逐出莱茵河中游地区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 76,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b101",
   "year": 1645,
   "yearLabel": "1645",
   "pages": [
    76,
    77,
    78
   ],
   "china": [
    {
     "year": 1645,
     "yearEnd": null,
     "yearLabel": "1645",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李自成败退至湖北",
     "desc": "1645年，李自成败退至湖北，遭地主武装袭击身亡，大顺政权覆灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 76,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1645,
     "yearEnd": null,
     "yearLabel": "1645",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清军攻打扬州",
     "desc": "1645年，清军攻打扬州，史可法率全城军民誓死抵抗，城陷后，清军持续杀戮十余日，史称“扬州十日”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 76,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1645,
     "yearEnd": null,
     "yearLabel": "1645",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南明鲁王、唐王政权建立",
     "desc": "1645年，南明残余势力相继于绍兴、福州拥立鲁王朱以海、唐王朱聿键建立鲁王政权和唐王政权，存在不到一年。",
     "src": {
      "book": "中外历史对比年表",
      "page": 76,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1645,
     "yearEnd": null,
     "yearLabel": "1645",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷向全国发布“剃发令”",
     "desc": "1645年，清廷向全国发布“剃发令”，嘉定民众在侯峒曾等领导下展开反剃发斗争，失败后三次遭清军血腥屠杀，史称“嘉定三屠”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 76,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1646,
     "yearEnd": null,
     "yearLabel": "1646",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张献忠在四川遭清兵袭击身亡",
     "desc": "1646年，张献忠在四川遭清兵袭击身亡，大西政权覆灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 77,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1648,
     "yearEnd": null,
     "yearLabel": "1648",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷下谕旨",
     "desc": "1648年，清廷下谕旨，为使满汉官民互相亲睦，允许联姻。",
     "src": {
      "book": "中外历史对比年表",
      "page": 77,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1648,
     "yearEnd": null,
     "yearLabel": "1648",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷开始设立六部汉尚书、都察院汉左都御使各一名",
     "desc": "1648年，清廷开始设立六部汉尚书、都察院汉左都御使各一名。",
     "src": {
      "book": "中外历史对比年表",
      "page": 77,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1650,
     "yearEnd": null,
     "yearLabel": "1650",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "郑成功在厦门建立抗清基地",
     "desc": "1650年，郑成功在厦门建立抗清基地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 77,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1652,
     "yearEnd": null,
     "yearLabel": "1652",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西藏五世达赖来京",
     "desc": "1652年，西藏五世达赖来京，受到顺治帝的隆重礼遇和册封，由此确立了其在藏传佛教中的最高宗教地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 77,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1645,
     "yearEnd": null,
     "yearLabel": "1645",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "纳斯比战役",
     "desc": "1645年，纳斯比战役，英国克伦威尔领导的“新模范军”彻底击败王党军队。",
     "src": {
      "book": "中外历史对比年表",
      "page": 76,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1646,
     "yearEnd": null,
     "yearLabel": "1646",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英王查理一世逃到苏格兰",
     "desc": "1646年，英王查理一世逃到苏格兰，拒绝向议会妥协。",
     "src": {
      "book": "中外历史对比年表",
      "page": 77,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1648,
     "yearEnd": null,
     "yearLabel": "1648",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "法兰西"
     ],
     "title": "《威斯特伐利亚和约》",
     "desc": "1648年，《威斯特伐利亚和约》，三十年战争交战双方签订，打击了哈布斯堡家族，德意志分裂加深，法国开始在国际事务中占据主导；开创了国际会议解决国际问题的先例。",
     "src": {
      "book": "中外历史对比年表",
      "page": 77,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1648,
     "yearEnd": 1653,
     "yearLabel": "1648",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "投石党运动",
     "desc": "1648—1653年，投石党运动，法国资产者、城市贫民和农民联合反对专制制度的人民运动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 77,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1649,
     "yearEnd": null,
     "yearLabel": "1649",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国国王查理一世受到审判",
     "desc": "1649年，英国国王查理一世受到审判，并被送上断头台。英吉利共和国建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 77,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1653,
     "yearEnd": 1658,
     "yearLabel": "1653",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国实行护国公制度",
     "desc": "1653—1658年，英国实行护国公制度，克伦威尔任终身护国公，实行军事专制统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 77,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1654,
     "yearEnd": null,
     "yearLabel": "1654",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "欧洲"
     ],
     "title": "在英荷战争中失败的荷兰被迫与英国订立《威斯敏斯特条约》",
     "desc": "1654年，在英荷战争中失败的荷兰被迫与英国订立《威斯敏斯特条约》，承认英国的“航海条例”，英国海上贸易优势地位得以确立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 77,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1654,
     "yearEnd": null,
     "yearLabel": "1654",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "苏格兰被合并于英国",
     "desc": "1654年，苏格兰被合并于英国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 78,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b102",
   "year": 1660,
   "yearLabel": "1660",
   "pages": [
    78,
    79
   ],
   "china": [
    {
     "year": 1660,
     "yearEnd": null,
     "yearLabel": "1660",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "法国成立了专门从事中国贸易的公司",
     "desc": "1660年，法国成立了专门从事中国贸易的公司，此后不断派遣传教士来华传教。",
     "src": {
      "book": "中外历史对比年表",
      "page": 78,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1661,
     "yearEnd": null,
     "yearLabel": "1661",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "在沿海坚持抗清的郑成功驱逐荷兰殖民者收复台湾",
     "desc": "1661年，在沿海坚持抗清的郑成功驱逐荷兰殖民者收复台湾，建立延平王府，仍奉南明为正统。",
     "src": {
      "book": "中外历史对比年表",
      "page": 78,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1669,
     "yearEnd": null,
     "yearLabel": "1669",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "康熙帝智擒擅权的辅政大臣鳌拜",
     "desc": "1669年，康熙帝智擒擅权的辅政大臣鳌拜，恢复了皇权专制秩序。",
     "src": {
      "book": "中外历史对比年表",
      "page": 78,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1673,
     "yearEnd": 1681,
     "yearLabel": "1673",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "平西王吴三桂发动叛乱",
     "desc": "1673—1681年，平西王吴三桂发动叛乱，平南王、靖南王起兵响应，形成“三藩之乱”，最终，清军消灭地方割据势力，维护了国家统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 78,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1683,
     "yearEnd": null,
     "yearLabel": "1683",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清军击溃驻扎澎湖的郑军主力",
     "desc": "1683年，清军击溃驻扎澎湖的郑军主力，延平王郑克塽投降，清政府统一台湾，置台湾府，设总兵驻守。",
     "src": {
      "book": "中外历史对比年表",
      "page": 78,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1685,
     "yearEnd": 1686,
     "yearLabel": "1685",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清军两次围攻盘踞雅克萨的俄军",
     "desc": "1685—1686年，清军两次围攻盘踞雅克萨的俄军，迫使俄政府接受和谈建议。",
     "src": {
      "book": "中外历史对比年表",
      "page": 78,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1688,
     "yearEnd": null,
     "yearLabel": "1688",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "漠西蒙古的准噶尔贵族噶尔丹兴兵进攻漠北的喀尔喀部",
     "desc": "1688年，漠西蒙古的准噶尔贵族噶尔丹兴兵进攻漠北的喀尔喀部，并借机进入漠南，威胁清朝北疆。",
     "src": {
      "book": "中外历史对比年表",
      "page": 79,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1689,
     "yearEnd": null,
     "yearLabel": "1689",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中俄签订《尼布楚条约》",
     "desc": "1689年，中俄签订《尼布楚条约》，划定了两国东段边界线，使东北地区维持了150余年的和平。",
     "src": {
      "book": "中外历史对比年表",
      "page": 79,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1660,
     "yearEnd": 1688,
     "yearLabel": "1660",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国斯图亚特王朝复辟时期",
     "desc": "1660—1688年，英国斯图亚特王朝复辟时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 78,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1661,
     "yearEnd": 1715,
     "yearLabel": "1661",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国波旁王朝路易十四时代",
     "desc": "1661—1715年，法国波旁王朝路易十四时代。",
     "src": {
      "book": "中外历史对比年表",
      "page": 78,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1664,
     "yearEnd": null,
     "yearLabel": "1664",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "法兰西"
     ],
     "title": "法国成立东印度公司",
     "desc": "1664年，法国成立东印度公司，开始侵略印度。",
     "src": {
      "book": "中外历史对比年表",
      "page": 78,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1679,
     "yearEnd": 1681,
     "yearLabel": "1679",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "在此届议会中",
     "desc": "1679—1681年，在此届议会中，英国最早的辉格派和托利派出现。",
     "src": {
      "book": "中外历史对比年表",
      "page": 78,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1685,
     "yearEnd": null,
     "yearLabel": "1685",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法王路易十四宣布废除“南特敕令”",
     "desc": "1685年，法王路易十四宣布废除“南特敕令”，公开进行宗教迫害，大批胡格诺教徒流亡国外，使法国丧失大量技术人才。",
     "src": {
      "book": "中外历史对比年表",
      "page": 78,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1688,
     "yearEnd": 1689,
     "yearLabel": "1688",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "欧洲"
     ],
     "title": "英国议会邀请荷兰执政威廉与其妻玛丽共同统治英国",
     "desc": "1688—1689年，英国议会邀请荷兰执政威廉与其妻玛丽共同统治英国，是为“光荣革命”，此后英国逐步建立起立宪君主制的原则。",
     "src": {
      "book": "中外历史对比年表",
      "page": 79,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1688,
     "yearEnd": 1697,
     "yearLabel": "1688",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "法兰西"
     ],
     "title": "奥格斯堡同盟战争",
     "desc": "1688—1697年，奥格斯堡同盟战争，法国与反法的奥格斯堡同盟国家进行的战争，削弱了法国的霸权地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 79,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1689,
     "yearEnd": null,
     "yearLabel": "1689",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国议会通过《权利宣言》并制定为法律",
     "desc": "1689年，英国议会通过《权利宣言》并制定为法律，是为《权利法案》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 79,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b103",
   "year": 1690,
   "yearLabel": "1690",
   "pages": [
    79,
    80
   ],
   "china": [
    {
     "year": 1690,
     "yearEnd": null,
     "yearLabel": "1690",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清军于克什克腾旗南境的乌兰布通击溃准噶尔部",
     "desc": "1690年，清军于克什克腾旗南境的乌兰布通击溃准噶尔部。",
     "src": {
      "book": "中外历史对比年表",
      "page": 79,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1691,
     "yearEnd": null,
     "yearLabel": "1691",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "康熙帝召集喀尔喀蒙古贵族在多伦诺尔会盟",
     "desc": "1691年，康熙帝召集喀尔喀蒙古贵族在多伦诺尔会盟，结束了喀尔喀内部纠纷，加强了清朝对北部边疆的有效管辖。",
     "src": {
      "book": "中外历史对比年表",
      "page": 79,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1698,
     "yearEnd": null,
     "yearLabel": "1698",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "第一艘法国商船抵达中国",
     "desc": "1698年，第一艘法国商船抵达中国，有一批传教士随船而来。",
     "src": {
      "book": "中外历史对比年表",
      "page": 79,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1699,
     "yearEnd": null,
     "yearLabel": "1699",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清圣祖康熙第三次南巡",
     "desc": "1699年，清圣祖康熙第三次南巡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 80,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1699,
     "yearEnd": null,
     "yearLabel": "1699",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "第二批法国耶稣会士来到中国",
     "desc": "1699年，第二批法国耶稣会士来到中国，带来法王路易十四送给康熙的礼物——书籍和天文仪器。",
     "src": {
      "book": "中外历史对比年表",
      "page": 80,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1689,
     "yearEnd": 1755,
     "yearLabel": "1689",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "孟德斯鸠",
     "desc": "1689—1755年，孟德斯鸠，法国启蒙思想家，著《论法的精神》阐述其政治思想。",
     "src": {
      "book": "中外历史对比年表",
      "page": 79,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1694,
     "yearEnd": 1778,
     "yearLabel": "1694",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "伏尔泰",
     "desc": "1694—1778年，伏尔泰，法国启蒙思想家。著有《哲学通信》《路易十四时代》等。",
     "src": {
      "book": "中外历史对比年表",
      "page": 79,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1697,
     "yearEnd": null,
     "yearLabel": "1697",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "欧洲"
     ],
     "title": "俄国沙皇彼得一世派遣使团出使西欧",
     "desc": "1697年，俄国沙皇彼得一世派遣使团出使西欧，考察西方国情，自己扮成随员随团出访。",
     "src": {
      "book": "中外历史对比年表",
      "page": 79,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1699,
     "yearEnd": null,
     "yearLabel": "1699",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "欧洲"
     ],
     "title": "奥斯曼土耳其与奥地利、波兰、威尼斯签订《卡罗维兹和约》",
     "desc": "1699年，奥斯曼土耳其与奥地利、波兰、威尼斯签订《卡罗维兹和约》，被迫割让大片领土，这是奥斯曼帝国第一次作为战败国而签订的和约，标志帝国已从对欧洲的进攻转为防御。",
     "src": {
      "book": "中外历史对比年表",
      "page": 80,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1690,
     "yearEnd": null,
     "yearLabel": "1690",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲",
      "英国"
     ],
     "title": "西方国家提出恒星自行观点",
     "desc": "18世纪初，西方国家提出恒星自行观点。",
     "src": {
      "book": "中外历史对比年表",
      "page": 80,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b104",
   "year": 1700,
   "yearLabel": "1700",
   "pages": [
    80,
    81
   ],
   "china": [
    {
     "year": 1701,
     "yearEnd": null,
     "yearLabel": "1701",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "棉织业和丝织业中心苏州发生踹匠罢工示威",
     "desc": "1701年，棉织业和丝织业中心苏州发生踹匠罢工示威，持续近一年。",
     "src": {
      "book": "中外历史对比年表",
      "page": 80,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1705,
     "yearEnd": null,
     "yearLabel": "1705",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "罗马教皇特使多罗主教来到中国",
     "desc": "1705年，罗马教皇特使多罗主教来到中国，觐见康熙皇帝。",
     "src": {
      "book": "中外历史对比年表",
      "page": 80,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1712,
     "yearEnd": null,
     "yearLabel": "1712",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "康熙帝颁布“滋生人丁永不加赋”诏令",
     "desc": "1712年，康熙帝颁布“滋生人丁永不加赋”诏令，固定了丁银数额，一定程度上减轻了人民负担。",
     "src": {
      "book": "中外历史对比年表",
      "page": 81,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1716,
     "yearEnd": 1718,
     "yearLabel": "1716",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "漠西蒙古准噶尔贵族发兵西藏",
     "desc": "1716—1718年，漠西蒙古准噶尔贵族发兵西藏，建立起亲准政权，后清军入藏，击溃准噶尔军，建立新的西藏地方政府，恢复了西藏社会秩序。",
     "src": {
      "book": "中外历史对比年表",
      "page": 81,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1723,
     "yearEnd": null,
     "yearLabel": "1723",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "漠西蒙古和硕特部贵族罗卜藏丹津在青海发动叛乱",
     "desc": "1723年，漠西蒙古和硕特部贵族罗卜藏丹津在青海发动叛乱，清廷平定叛乱后设立西宁办事大臣，管理青海事务。",
     "src": {
      "book": "中外历史对比年表",
      "page": 81,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1723,
     "yearEnd": null,
     "yearLabel": "1723",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "雍正正式下令在全国推广“摊丁入地”制度",
     "desc": "1723年，雍正正式下令在全国推广“摊丁入地”制度，从而结束了清初赋役制度混乱的局面。",
     "src": {
      "book": "中外历史对比年表",
      "page": 81,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1700,
     "yearEnd": 1721,
     "yearLabel": "1700",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "北欧",
     "countries": [
      "北欧",
      "俄国"
     ],
     "title": "北方战争",
     "desc": "1700—1721年，北方战争，俄国打败瑞典，签订《尼斯塔得和约》，夺取波罗的海控制权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 80,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1701,
     "yearEnd": null,
     "yearLabel": "1701",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国议会通过“嗣位法”",
     "desc": "1701年，英国议会通过“嗣位法”，对王权做了具体限制，把包括王位继承权等重大问题掌握在议会手里，从而确立了议会高于王权，司法权独立于王权的原则，奠定了立宪君主制的基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 80,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1701,
     "yearEnd": null,
     "yearLabel": "1701",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "德意志"
     ],
     "title": "普鲁士公爵腓特烈一世",
     "desc": "1701年，普鲁士公爵腓特烈一世，从神圣罗马帝国皇帝处获得“普鲁士国王”称号。",
     "src": {
      "book": "中外历史对比年表",
      "page": 80,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1701,
     "yearEnd": 1713,
     "yearLabel": "1701",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "欧洲"
     ],
     "title": "西班牙王位继承战争",
     "desc": "1701—1713年，西班牙王位继承战争，英国成为最大受益者，国际地位逐步上升。",
     "src": {
      "book": "中外历史对比年表",
      "page": 80,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1706,
     "yearEnd": 1790,
     "yearLabel": "1706",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "本杰明·富兰克林",
     "desc": "1706—1790年，本杰明·富兰克林，美国启蒙思想代表。",
     "src": {
      "book": "中外历史对比年表",
      "page": 80,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1712,
     "yearEnd": 1778,
     "yearLabel": "1712",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "让-雅克·卢梭",
     "desc": "1712—1778年，让-雅克·卢梭，法国启蒙思想家，《社会契约论》是其政治思想的代表作。",
     "src": {
      "book": "中外历史对比年表",
      "page": 81,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1723,
     "yearEnd": 1790,
     "yearLabel": "1723",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "亚当·斯密",
     "desc": "1723—1790年，亚当·斯密，英国古典政治经济学代表人物，被誉为“经济学之父”，所著《国富论》创立了第一个系统的政治经济学体系。",
     "src": {
      "book": "中外历史对比年表",
      "page": 81,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b105",
   "year": 1725,
   "yearLabel": "1725",
   "pages": [
    81
   ],
   "china": [
    {
     "year": 1727,
     "yearEnd": null,
     "yearLabel": "1727",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷在西藏设立了两个驻藏大臣",
     "desc": "1727年，清廷在西藏设立了两个驻藏大臣，西藏地方和中央政府隶属关系加强。",
     "src": {
      "book": "中外历史对比年表",
      "page": 81,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1729,
     "yearEnd": null,
     "yearLabel": "1729",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "雍正为西北用兵处理军务之需设军机处",
     "desc": "1729年，雍正为西北用兵处理军务之需设军机处，后发展成清朝最高中枢机关。",
     "src": {
      "book": "中外历史对比年表",
      "page": 81,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1725,
     "yearEnd": null,
     "yearLabel": "1725",
     "yearKind": "anchor",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "乾隆时期，在发展较快的丝织业和棉纺织业这两个行业的生产与流通领域",
     "desc": "18世纪上，乾隆时期，在发展较快的丝织业和棉纺织业这两个行业的生产与流通领域，出现了手工业工场和包买商。",
     "src": {
      "book": "中外历史对比年表",
      "page": 81,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1729,
     "yearEnd": 1797,
     "yearLabel": "1729",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "爱德蒙·伯克",
     "desc": "1729—1797年，爱德蒙·伯克，英国保守主义代表人物。",
     "src": {
      "book": "中外历史对比年表",
      "page": 81,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1733,
     "yearEnd": null,
     "yearLabel": "1733",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国棉纺织业中出现新技术",
     "desc": "1733年，英国棉纺织业中出现新技术，约翰·凯伊发明飞梭，大大提高了工作效率。",
     "src": {
      "book": "中外历史对比年表",
      "page": 81,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b106",
   "year": 1740,
   "yearLabel": "1740",
   "pages": [
    82,
    83
   ],
   "china": [
    {
     "year": 1740,
     "yearEnd": null,
     "yearLabel": "1740",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "乾隆皇帝为《大清律例》御制序文",
     "desc": "1740年，乾隆皇帝为《大清律例》御制序文，并命颁行。",
     "src": {
      "book": "中外历史对比年表",
      "page": 82,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1743,
     "yearEnd": null,
     "yearLabel": "1743",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷决定在永定河上游开渠筑坝",
     "desc": "1743年，清廷决定在永定河上游开渠筑坝。",
     "src": {
      "book": "中外历史对比年表",
      "page": 82,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1746,
     "yearEnd": null,
     "yearLabel": "1746",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "《九宫大成谱》编成",
     "desc": "1746年，《九宫大成谱》编成，该书汇集了唐宋元明清词、诸宫调及曲调，较为详备。",
     "src": {
      "book": "中外历史对比年表",
      "page": 82,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1754,
     "yearEnd": null,
     "yearLabel": "1754",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷出兵征讨漠西蒙古准噶尔部",
     "desc": "1754年，清廷出兵征讨漠西蒙古准噶尔部，基本稳定了天山北麓的局势。",
     "src": {
      "book": "中外历史对比年表",
      "page": 82,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1757,
     "yearEnd": null,
     "yearLabel": "1757",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府自此开始实行广州一口通商贸易",
     "desc": "1757年，清政府自此开始实行广州一口通商贸易，即在广州委托广东洋行商人组织——公行，管理进出口贸易。",
     "src": {
      "book": "中外历史对比年表",
      "page": 83,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1757,
     "yearEnd": null,
     "yearLabel": "1757",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英国占领印度的鸦片产地孟加拉后",
     "desc": "1757年，英国占领印度的鸦片产地孟加拉后，竭力发展对华鸦片贸易。",
     "src": {
      "book": "中外历史对比年表",
      "page": 83,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1757,
     "yearEnd": 1759,
     "yearLabel": "1757",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清军平定维吾尔贵族和卓兄弟的叛乱",
     "desc": "1757—1759年，清军平定维吾尔贵族和卓兄弟的叛乱，统一了南疆。",
     "src": {
      "book": "中外历史对比年表",
      "page": 83,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1740,
     "yearEnd": 1748,
     "yearLabel": "1740",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰",
      "欧洲"
     ],
     "title": "奥地利王位继承战争",
     "desc": "1740—1748年，奥地利王位继承战争，加强了英国和普鲁士的实力，削弱了法国和奥地利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 82,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1740,
     "yearEnd": 1786,
     "yearLabel": "1740",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "普鲁士腓特烈二世时期，普鲁士发展成欧洲强国",
     "desc": "1740—1786年，普鲁士腓特烈二世时期，普鲁士发展成欧洲强国。腓特烈二世被尊为“腓特烈大王”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 82,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1743,
     "yearEnd": 1803,
     "yearLabel": "1743",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "杜桑·卢维杜尔",
     "desc": "1743—1803年，杜桑·卢维杜尔，海地杰出的黑人领袖，在长达10年的时间里，领导了海地人民的民族独立战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 82,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1746,
     "yearEnd": 1761,
     "yearLabel": "1746",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "法兰西",
      "英格兰"
     ],
     "title": "英国和法国为争夺印度进行了三次大规模战争",
     "desc": "1746—1761年，英国和法国为争夺印度进行了三次大规模战争，结果法国势力被排挤出印度。",
     "src": {
      "book": "中外历史对比年表",
      "page": 82,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1751,
     "yearEnd": null,
     "yearLabel": "1751",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国唯物主义哲学家狄德罗开始主持编撰《百科全书》",
     "desc": "1751年，法国唯物主义哲学家狄德罗开始主持编撰《百科全书》，作者们被尊称为“百科全书派”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 82,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1753,
     "yearEnd": null,
     "yearLabel": "1753",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国科学家本杰明·富兰克林制出避雷针",
     "desc": "1753年，美国科学家本杰明·富兰克林制出避雷针，后来又发表了关于电的全面的理论。",
     "src": {
      "book": "中外历史对比年表",
      "page": 82,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1756,
     "yearEnd": 1763,
     "yearLabel": "1756",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰"
     ],
     "title": "七年战争",
     "desc": "1756—1763年，七年战争，法国失去欧陆霸主地位，殖民地丧失殆尽；英国最终确立起海上和殖民霸权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 83,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1757,
     "yearEnd": null,
     "yearLabel": "1757",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "英格兰"
     ],
     "title": "英国海盗克莱武利用孟加拉内讧",
     "desc": "1757年，英国海盗克莱武利用孟加拉内讧，在普拉西战役中取胜，为英国在印度的殖民统治奠定了基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 83,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b107",
   "year": 1760,
   "yearLabel": "1760",
   "pages": [
    83,
    84
   ],
   "china": [
    {
     "year": 1762,
     "yearEnd": null,
     "yearLabel": "1762",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府设立伊犁将军",
     "desc": "1762年，清政府设立伊犁将军，总统天山南北两麓（新疆）事务。",
     "src": {
      "book": "中外历史对比年表",
      "page": 83,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1762,
     "yearEnd": null,
     "yearLabel": "1762",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "经康熙、雍正、乾隆三朝的努力",
     "desc": "1762年，经康熙、雍正、乾隆三朝的努力，清政府基本完成了对边疆地区的统一，奠定了现代中国版图的基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 83,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1770,
     "yearEnd": null,
     "yearLabel": "1770",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "游牧于伏尔加河流域的蒙古土尔扈特部",
     "desc": "1770年，游牧于伏尔加河流域的蒙古土尔扈特部，在首领渥巴锡的率领下，跋涉万里回到祖国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 83,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1773,
     "yearEnd": null,
     "yearLabel": "1773",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英印殖民政府确定了大量种植和向中国输入鸦片的政策",
     "desc": "1773年，英印殖民政府确定了大量种植和向中国输入鸦片的政策，并给予东印度公司制造和专卖的特权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 84,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1774,
     "yearEnd": null,
     "yearLabel": "1774",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英国东印度公司秘书波格尔以通商为名进入西藏拜会六世班禅",
     "desc": "1774年，英国东印度公司秘书波格尔以通商为名进入西藏拜会六世班禅。",
     "src": {
      "book": "中外历史对比年表",
      "page": 84,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1760,
     "yearEnd": null,
     "yearLabel": "1760",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "欧洲人发明了在航海中可以测定经度的经线仪",
     "desc": "1760年，欧洲人发明了在航海中可以测定经度的经线仪。",
     "src": {
      "book": "中外历史对比年表",
      "page": 83,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1765,
     "yearEnd": null,
     "yearLabel": "1765",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国织布工哈格里夫斯发明了多轴纺纱机",
     "desc": "1765年，英国织布工哈格里夫斯发明了多轴纺纱机，命名为“珍妮纺纱机”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 83,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1772,
     "yearEnd": null,
     "yearLabel": "1772",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "俄普奥三次瓜分波兰",
     "desc": "1772、1793、1795年，俄普奥三国三次瓜分波兰，独立的波兰从地图上消失。",
     "src": {
      "book": "中外历史对比年表",
      "page": 83,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1772,
     "yearEnd": 1823,
     "yearLabel": "1772",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "大卫·李嘉图",
     "desc": "1772—1823年，大卫·李嘉图，英国古典政治经济学代表人物，斯密学说的继承者。",
     "src": {
      "book": "中外历史对比年表",
      "page": 83,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1773,
     "yearEnd": null,
     "yearLabel": "1773",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "美洲"
     ],
     "title": "英国北美殖民地发生“波士顿倾茶事件”",
     "desc": "1773年，英国北美殖民地发生“波士顿倾茶事件”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 84,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1773,
     "yearEnd": 1775,
     "yearLabel": "1773",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "普加乔夫起义",
     "desc": "1773—1775年，普加乔夫起义，俄国历史上规模最大的农民起义，沉重打击了沙皇专制统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 84,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1774,
     "yearEnd": null,
     "yearLabel": "1774",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "英属北美殖民地第一届大陆会议在费城召开",
     "desc": "1774年，英属北美殖民地第一届大陆会议在费城召开。",
     "src": {
      "book": "中外历史对比年表",
      "page": 84,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b108",
   "year": 1775,
   "yearLabel": "1775",
   "pages": [
    84,
    85
   ],
   "china": [
    {
     "year": 1775,
     "yearEnd": null,
     "yearLabel": "1775",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷派军分兵两路平定准噶尔部首领的叛乱",
     "desc": "1775年，清廷派军分兵两路平定准噶尔部首领的叛乱。",
     "src": {
      "book": "中外历史对比年表",
      "page": 84,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1776,
     "yearEnd": null,
     "yearLabel": "1776",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清军平定了四川大小金川叛乱",
     "desc": "1776年，清军平定了四川大小金川叛乱，标志着清政府实现对川西的控制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 84,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1778,
     "yearEnd": null,
     "yearLabel": "1778",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府拨巨资在承德修建了须弥寿庙以资班禅安禅",
     "desc": "1778年，清政府拨巨资在承德修建了须弥寿庙以资班禅安禅。",
     "src": {
      "book": "中外历史对比年表",
      "page": 85,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1775,
     "yearEnd": null,
     "yearLabel": "1775",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "美洲"
     ],
     "title": "英国北美殖民军与殖民地武装在莱克星顿发生冲突",
     "desc": "1775年4月，英国北美殖民军与殖民地武装在莱克星顿发生冲突，这是北美人民的武装力量第一次与英国正规军交锋，揭开了北美人民反英战争的序幕。",
     "src": {
      "book": "中外历史对比年表",
      "page": 84,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1775,
     "yearEnd": null,
     "yearLabel": "1775",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "第二届大陆会议任命乔治·华盛顿为殖民地军总司令",
     "desc": "1775年6月，第二届大陆会议任命乔治·华盛顿为殖民地军总司令。",
     "src": {
      "book": "中外历史对比年表",
      "page": 84,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1775,
     "yearEnd": 1819,
     "yearLabel": "1775",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "英格兰"
     ],
     "title": "英国先后在印度进行了三次侵略马拉特的战争",
     "desc": "1775—1819年，英国先后在印度进行了三次侵略马拉特的战争，占领中部印度。",
     "src": {
      "book": "中外历史对比年表",
      "page": 84,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1776,
     "yearEnd": null,
     "yearLabel": "1776",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "潘恩发表《常识》呼吁独立",
     "desc": "1776年1月，潘恩发表《常识》呼吁独立，从而扭转了北美的舆论。",
     "src": {
      "book": "中外历史对比年表",
      "page": 84,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1776,
     "yearEnd": null,
     "yearLabel": "1776",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "大陆会议发表《独立宣言》",
     "desc": "1776年7月4日，大陆会议发表《独立宣言》，极大地鼓舞了北美人民的革命斗志，成为北美人民争取独立的旗帜。",
     "src": {
      "book": "中外历史对比年表",
      "page": 85,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1777,
     "yearEnd": null,
     "yearLabel": "1777",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "法兰西",
      "美洲"
     ],
     "title": "萨拉托加大捷",
     "desc": "1777年，萨拉托加大捷，美国独立战争的转折点，是推动法国参加反英战争的决定性因素。",
     "src": {
      "book": "中外历史对比年表",
      "page": 85,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1778,
     "yearEnd": null,
     "yearLabel": "1778",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "美洲"
     ],
     "title": "法国与美国签订《同盟条约》",
     "desc": "1778年，法国与美国签订《同盟条约》，参加反英战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 85,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1778,
     "yearEnd": 1850,
     "yearLabel": "1778",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "何塞·圣马丁",
     "desc": "1778—1850年，何塞·圣马丁，南美南部拉普拉塔地区独立战争的杰出领导人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 85,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1779,
     "yearEnd": null,
     "yearLabel": "1779",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国工人塞缪尔·科伦普顿发明了水力纺纱机",
     "desc": "1779年，英国工人塞缪尔·科伦普顿发明了水力纺纱机，即“骡机”，纺出的纱精细又牢固。",
     "src": {
      "book": "中外历史对比年表",
      "page": 85,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b109",
   "year": 1780,
   "yearLabel": "1780",
   "pages": [
    85,
    86
   ],
   "china": [
    {
     "year": 1782,
     "yearEnd": null,
     "yearLabel": "1782",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "《四库全书》完成",
     "desc": "1782年，《四库全书》完成，这是我国最大的一部丛书。",
     "src": {
      "book": "中外历史对比年表",
      "page": 85,
      "row": 9,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1781,
     "yearEnd": null,
     "yearLabel": "1781",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "美洲"
     ],
     "title": "英国康华里将军率领的部队在约克镇附近向美军投降",
     "desc": "1781年10月，英国康华里将军率领的部队在约克镇附近向美军投降，标志北美战场上的战争结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 85,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1781,
     "yearEnd": null,
     "yearLabel": "1781",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国宪法——《邦联条例》开始生效实施",
     "desc": "1781年，美国宪法——《邦联条例》开始生效实施。",
     "src": {
      "book": "中外历史对比年表",
      "page": 85,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1783,
     "yearEnd": 1830,
     "yearLabel": "1783",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "西蒙·玻利瓦尔",
     "desc": "1783—1830年，西蒙·玻利瓦尔，西属南美地区独立战争的杰出领导者。",
     "src": {
      "book": "中外历史对比年表",
      "page": 85,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1783,
     "yearEnd": null,
     "yearLabel": "1783",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰",
      "美洲"
     ],
     "title": "英美两国在巴黎签订和约",
     "desc": "1783年9月3日，英美两国在巴黎签订和约，英国承认美国独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 86,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1784,
     "yearEnd": null,
     "yearLabel": "1784",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英国",
     "countries": [
      "英国"
     ],
     "title": "亨利·科特发明了搅炼法",
     "desc": "1784年，亨利·科特发明了搅炼法，生铁可以炼成熟铁。",
     "src": {
      "book": "中外历史对比年表",
      "page": 86,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1785,
     "yearEnd": null,
     "yearLabel": "1785",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英国",
     "countries": [
      "英国"
     ],
     "title": "埃德蒙·卡特莱特发明了水力织布机",
     "desc": "1785年，埃德蒙·卡特莱特发明了水力织布机，进一步提高了织布的速度。",
     "src": {
      "book": "中外历史对比年表",
      "page": 86,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b110",
   "year": 1785,
   "yearLabel": "1785",
   "pages": [
    86,
    87
   ],
   "china": [
    {
     "year": 1786,
     "yearEnd": null,
     "yearLabel": "1786",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "台湾天地会首领林爽文等起事",
     "desc": "1786年，台湾天地会首领林爽文等起事，清廷历时一年多方平定事变。",
     "src": {
      "book": "中外历史对比年表",
      "page": 86,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1788,
     "yearEnd": null,
     "yearLabel": "1788",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "缅甸国王遣使来中国",
     "desc": "1788年，缅甸国王遣使来中国，献其国乐。",
     "src": {
      "book": "中外历史对比年表",
      "page": 86,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1789,
     "yearEnd": null,
     "yearLabel": "1789",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "青海回民在马有成等领导下起事",
     "desc": "1789年，青海回民在马有成等领导下起事，被镇压。",
     "src": {
      "book": "中外历史对比年表",
      "page": 86,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1786,
     "yearEnd": 1787,
     "yearLabel": "1786",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国爆发了谢斯领导的农民起义",
     "desc": "1786—1787年，美国爆发了谢斯领导的农民起义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 86,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1787,
     "yearEnd": null,
     "yearLabel": "1787",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国费城制宪会议通过一部新宪法——《联邦宪法》",
     "desc": "1787年，美国费城制宪会议通过一部新宪法——《联邦宪法》，代替了《邦联条例》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 86,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1789,
     "yearEnd": null,
     "yearLabel": "1789",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国巴黎人民攻克作为封建统治象征的巴士底狱",
     "desc": "1789年7月14日，法国巴黎人民攻克作为封建统治象征的巴士底狱，是为法国大革命的开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 86,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1789,
     "yearEnd": null,
     "yearLabel": "1789",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国制宪议会通过了第一个立法文件——《八月法令》",
     "desc": "1789年，法国制宪议会通过了第一个立法文件——《八月法令》，在根本原则上废除了封建制度，是改造国家的重要一步。",
     "src": {
      "book": "中外历史对比年表",
      "page": 86,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1789,
     "yearEnd": null,
     "yearLabel": "1789",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英国",
     "countries": [
      "英国"
     ],
     "title": "詹姆斯·瓦特发明了能用作发动机的 “万能蒸汽机”",
     "desc": "1789年，詹姆斯·瓦特发明了能用作发动机的 “万能蒸汽机”， 获得专利权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 86,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1789,
     "yearEnd": null,
     "yearLabel": "1789",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "英国",
      "美洲"
     ],
     "title": "塞缪尔·斯莱特在罗得艾兰建立美国第一家纺织厂",
     "desc": "1789年，塞缪尔·斯莱特在罗得艾兰建立美国第一家纺织厂，揭开美国工业革命的序幕。",
     "src": {
      "book": "中外历史对比年表",
      "page": 87,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1789,
     "yearEnd": null,
     "yearLabel": "1789",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国制宪议会通过了《人权与公民权宣言》",
     "desc": "1789年8月26日，法国制宪议会通过了《人权与公民权宣言》，简称《人权宣言》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 87,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b111",
   "year": 1790,
   "yearLabel": "1790",
   "pages": [
    87,
    88,
    89
   ],
   "china": [
    {
     "year": 1790,
     "yearEnd": null,
     "yearLabel": "1790",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "乾隆八十寿辰",
     "desc": "1790年，乾隆八十寿辰，缅甸国王、安南国王、暹罗国王遣使入贡祝寿。",
     "src": {
      "book": "中外历史对比年表",
      "page": 87,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1791,
     "yearEnd": null,
     "yearLabel": "1791",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷规定西藏事由办事大臣与达赖喇嘛会商办理",
     "desc": "1791年，清廷规定西藏事由办事大臣与达赖喇嘛会商办理。",
     "src": {
      "book": "中外历史对比年表",
      "page": 87,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1792,
     "yearEnd": 1841,
     "yearLabel": "1792",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "龚自珍",
     "desc": "1792—1841年，龚自珍，著名思想家，近代中国维新思想的先驱者，针对当时的“弊政”，提出了进行社会改革的主张。",
     "src": {
      "book": "中外历史对比年表",
      "page": 87,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1793,
     "yearEnd": null,
     "yearLabel": "1793",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "乾隆时正式创立“金瓶掣签”制",
     "desc": "1793年，乾隆时正式创立“金瓶掣签”制，由中央政府确立达赖、班禅的合法继承人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 88,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1793,
     "yearEnd": null,
     "yearLabel": "1793",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英国派马嘎尔尼率使团来华",
     "desc": "1793年，英国派马嘎尔尼率使团来华，提出开埠通商等要求，遭清政府拒绝。",
     "src": {
      "book": "中外历史对比年表",
      "page": 88,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1794,
     "yearEnd": 1857,
     "yearLabel": "1794",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "魏源",
     "desc": "1794—1857年，魏源，清末思想家，著《海国图志》，提出“师夷长技以制夷”的主张；讲求“经世致用”，对当时思想界占统治地位的宋学和汉学进行了批判，对中国思想界产生较大影响。",
     "src": {
      "book": "中外历史对比年表",
      "page": 88,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1796,
     "yearEnd": null,
     "yearLabel": "1796",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "白莲教起义爆发",
     "desc": "1796年，白莲教起义爆发，波及川、楚、陕、豫、甘五省，绵延近10年。",
     "src": {
      "book": "中外历史对比年表",
      "page": 88,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1799,
     "yearEnd": null,
     "yearLabel": "1799",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "嘉庆帝褫夺了和珅官职",
     "desc": "1799年，嘉庆帝褫夺了和珅官职，抄没其家产，约合白银八亿两，相当于国库15年的收入。",
     "src": {
      "book": "中外历史对比年表",
      "page": 88,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1803,
     "yearEnd": null,
     "yearLabel": "1803",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府强调对边外继续实行封禁政策",
     "desc": "1803年，清政府强调对边外继续实行封禁政策，不准穷苦百姓携眷出关。",
     "src": {
      "book": "中外历史对比年表",
      "page": 89,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1791,
     "yearEnd": null,
     "yearLabel": "1791",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国制宪议会通过了法国历史上第一部宪法——《1791年宪法》",
     "desc": "1791年9月3日，法国制宪议会通过了法国历史上第一部宪法——《1791年宪法》，规定法国为资产阶级君主立宪制国家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 87,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1792,
     "yearEnd": null,
     "yearLabel": "1792",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国巴黎人民起义推翻了君主制度",
     "desc": "1792年8月10日，法国巴黎人民起义推翻了君主制度，结束了君主立宪政体，吉伦特派开始掌握政权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 87,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1792,
     "yearEnd": null,
     "yearLabel": "1792",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰"
     ],
     "title": "法国革命军队在凡尔登附近的瓦尔密打败普鲁士军队",
     "desc": "1792年9月20日，法国革命军队在凡尔登附近的瓦尔密打败普鲁士军队，取得瓦尔密大捷，扭转了法军在战场上的被动局面。",
     "src": {
      "book": "中外历史对比年表",
      "page": 87,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1792,
     "yearEnd": null,
     "yearLabel": "1792",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法兰西第一共和国成立",
     "desc": "1792年9月22日，法兰西第一共和国成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 87,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1792,
     "yearEnd": 1804,
     "yearLabel": "1792",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "海地打败了法西英三个殖民强国的侵略军",
     "desc": "1792—1804年，海地打败了法西英三个殖民强国的侵略军，取得民族解放和国家独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 87,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1793,
     "yearEnd": null,
     "yearLabel": "1793",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国波旁王朝国王路易十六被送上断头台",
     "desc": "1793年1月21日，法国波旁王朝国王路易十六被送上断头台。",
     "src": {
      "book": "中外历史对比年表",
      "page": 88,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1793,
     "yearEnd": null,
     "yearLabel": "1793",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国巴黎人民起义",
     "desc": "1793年4月，法国巴黎人民起义，吉伦特派倒台，国民公会完全处在雅各宾派领导之下。",
     "src": {
      "book": "中外历史对比年表",
      "page": 88,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1793,
     "yearEnd": null,
     "yearLabel": "1793",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国国民公会通过第一部共和制宪法",
     "desc": "1793年6月24日，法国国民公会通过第一部共和制宪法。",
     "src": {
      "book": "中外历史对比年表",
      "page": 88,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1794,
     "yearEnd": null,
     "yearLabel": "1794",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国国民公会通过决议逮捕罗伯斯庇尔及其支持者",
     "desc": "1794年7月27日，法国国民公会通过决议逮捕罗伯斯庇尔及其支持者，结束了恐怖统治，史称“热月政变”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 88,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1795,
     "yearEnd": null,
     "yearLabel": "1795",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国巴黎人民举行了大规模的武装起义",
     "desc": "1795年5月20—23日，法国巴黎人民举行了大规模的武装起义，史称“牧月起义”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 88,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1795,
     "yearEnd": 1798,
     "yearLabel": "1795",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国热月党人统治的督政府时期",
     "desc": "1795—1798年，法国热月党人统治的督政府时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 88,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1798,
     "yearEnd": 1857,
     "yearLabel": "1798",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "奥古斯特·孔德",
     "desc": "1798—1857年，奥古斯特·孔德，法国哲学家和社会学家，实证主义的奠基人和主要代表者，被誉为“社会学之父”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 88,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1799,
     "yearEnd": null,
     "yearLabel": "1799",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "拿破仑·波拿巴发动“雾月政变”",
     "desc": "1799年11月9日，拿破仑·波拿巴发动“雾月政变”，夺取政权，法国大革命结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 88,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1803,
     "yearEnd": null,
     "yearLabel": "1803",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "法兰西",
      "美洲"
     ],
     "title": "美国从法国购得路易斯安那地区",
     "desc": "1803年，美国从法国购得路易斯安那地区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 89,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1804,
     "yearEnd": null,
     "yearLabel": "1804",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "《法国民法典》（后改称《拿破仑法典》）正式公布实行",
     "desc": "1804年，《法国民法典》（后改称《拿破仑法典》）正式公布实行。",
     "src": {
      "book": "中外历史对比年表",
      "page": 89,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1804,
     "yearEnd": null,
     "yearLabel": "1804",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国以元老院法令形式宣布法国改制为帝国",
     "desc": "1804年5月18日，法国以元老院法令形式宣布法国改制为帝国，拿破仑号称“拿破仑一世”，法兰西第一帝国建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 89,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b112",
   "year": 1805,
   "yearLabel": "1805",
   "pages": [
    89,
    90
   ],
   "china": [
    {
     "year": 1805,
     "yearEnd": null,
     "yearLabel": "1805",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府制定稽查西洋教章程",
     "desc": "1805年，清政府制定稽查西洋教章程，明令禁止西洋人刻书传教。",
     "src": {
      "book": "中外历史对比年表",
      "page": 89,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1806,
     "yearEnd": null,
     "yearLabel": "1806",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陕西宁陕镇驻兵因清政府减发饷银而哗变",
     "desc": "1806年，陕西宁陕镇驻兵因清政府减发饷银而哗变。",
     "src": {
      "book": "中外历史对比年表",
      "page": 89,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1807,
     "yearEnd": null,
     "yearLabel": "1807",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英国传教士马礼逊来到广州",
     "desc": "1807年，英国传教士马礼逊来到广州，他是基督教新教来华传教的第一人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 89,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1810,
     "yearEnd": 1882,
     "yearLabel": "1810",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李善兰",
     "desc": "1810—1882年，李善兰，近代数学家，其所著《方圆阐幽》已独立达到了微积分的初步概念；翻译了《几何原本》等数学、物理学方面的书籍。",
     "src": {
      "book": "中外历史对比年表",
      "page": 90,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1813,
     "yearEnd": null,
     "yearLabel": "1813",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "天理教起义爆发",
     "desc": "1813年，天理教起义爆发，波及直、豫、鲁等省区，一度攻入紫禁城。",
     "src": {
      "book": "中外历史对比年表",
      "page": 90,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1814,
     "yearEnd": 1835,
     "yearLabel": "1814",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国西部、西南部毗邻的国家和地区几乎都被西方殖民者所控制",
     "desc": "1814—1835年，中国西部、西南部毗邻的国家和地区几乎都被西方殖民者所控制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 90,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1805,
     "yearEnd": 1872,
     "yearLabel": "1805",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "居赛普·马志尼",
     "desc": "1805—1872年，居赛普·马志尼，创立“青年意大利党”，提出建立独立的、统一的民主共和国的斗争任务，强调用革命手段推翻奥地利的统治和意大利各邦的君主专制制度。",
     "src": {
      "book": "中外历史对比年表",
      "page": 89,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1806,
     "yearEnd": null,
     "yearLabel": "1806",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰"
     ],
     "title": "法国皇帝拿破仑发布敕令",
     "desc": "1806年，法国皇帝拿破仑发布敕令，宣布封锁不列颠诸岛，是为大陆封锁政策的开始，旨在建立大陆体系以扼杀英国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 89,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1807,
     "yearEnd": null,
     "yearLabel": "1807",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "以普鲁士为首的德意志各邦逐步实行农奴制改革",
     "desc": "1807年，以普鲁士为首的德意志各邦逐步实行农奴制改革，废除了农民对地主的人身依附关系。",
     "src": {
      "book": "中外历史对比年表",
      "page": 89,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1807,
     "yearEnd": 1882,
     "yearLabel": "1807",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "加里波第",
     "desc": "1807—1882年，加里波第，意大利反奥战争中人民武装的杰出组织者和领导者。",
     "src": {
      "book": "中外历史对比年表",
      "page": 89,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1812,
     "yearEnd": 1814,
     "yearLabel": "1812",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "英格兰",
      "英国",
      "美洲"
     ],
     "title": "美国第二次独立战争",
     "desc": "1812—1814年，美国第二次独立战争，彻底摆脱对英国的经济依赖，工业革命全面展开。",
     "src": {
      "book": "中外历史对比年表",
      "page": 90,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1813,
     "yearEnd": null,
     "yearLabel": "1813",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "欧洲"
     ],
     "title": "莱比锡会战",
     "desc": "1813年，莱比锡会战，史称“民族之战”，即决定欧洲各民族命运的战斗，结果反法同盟军队打败了拿破仑。",
     "src": {
      "book": "中外历史对比年表",
      "page": 90,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1814,
     "yearEnd": null,
     "yearLabel": "1814",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "拿破仑宣告退位",
     "desc": "1814年4月6日，拿破仑宣告退位，路易十八随后回到巴黎，宣布复辟。",
     "src": {
      "book": "中外历史对比年表",
      "page": 90,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1814,
     "yearEnd": 1815,
     "yearLabel": "1814",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "欧洲"
     ],
     "title": "维也纳会议",
     "desc": "1814—1815年，维也纳会议，俄英普奥四个战胜国打着“正统主义”招牌，恢复了法国大革命之前的欧洲旧秩序，旧封建王朝复辟。",
     "src": {
      "book": "中外历史对比年表",
      "page": 90,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b113",
   "year": 1815,
   "yearLabel": "1815",
   "pages": [
    90,
    91
   ],
   "china": [
    {
     "year": 1815,
     "yearEnd": null,
     "yearLabel": "1815",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "嘉庆帝谕令整饬洋行",
     "desc": "1815年，嘉庆帝谕令整饬洋行，规定各国护货兵船不许驶近内洋，货船出口亦不许逗留。",
     "src": {
      "book": "中外历史对比年表",
      "page": 90,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1815,
     "yearEnd": null,
     "yearLabel": "1815",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府决定查禁鸦片",
     "desc": "1815年，清政府决定查禁鸦片，规定西洋货船至澳门时，应按船查验，杜绝来源。",
     "src": {
      "book": "中外历史对比年表",
      "page": 90,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1816,
     "yearEnd": null,
     "yearLabel": "1816",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "因英国使节拒绝行三跪九叩之礼",
     "desc": "1816年，因英国使节拒绝行三跪九叩之礼，嘉庆帝颁布谕令，责令其回国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 91,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1815,
     "yearEnd": null,
     "yearLabel": "1815",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "希腊",
     "countries": [
      "希腊",
      "俄国"
     ],
     "title": "在沙皇亚历山大一世倡议下",
     "desc": "1815年，在沙皇亚历山大一世倡议下，俄普奥三国君主成立“神圣同盟”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 90,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1815,
     "yearEnd": null,
     "yearLabel": "1815",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "拿破仑建立百日政权",
     "desc": "1815年3—6月，拿破仑从流放地回到巴黎重建帝国，史称“百日政权”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 90,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1815,
     "yearEnd": null,
     "yearLabel": "1815",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "滑铁卢战役",
     "desc": "1815年6月18日，滑铁卢战役，拿破仑一生中的最后一次战役，以失败告终，其政治生命也彻底结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 90,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1815,
     "yearEnd": 1898,
     "yearLabel": "1815",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "俾斯麦",
     "desc": "1815—1898年，俾斯麦，普鲁士宰相，通过“自上而下”的王朝战争实现了德国统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 91,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1816,
     "yearEnd": 1825,
     "yearLabel": "1816",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "阿根廷、智利、秘鲁、玻利维亚先后获得独立",
     "desc": "1816—1825年，阿根廷、智利、秘鲁、玻利维亚先后获得独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 91,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b114",
   "year": 1820,
   "yearLabel": "1820",
   "pages": [
    91,
    92
   ],
   "china": [
    {
     "year": 1820,
     "yearEnd": null,
     "yearLabel": "1820",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "《海录》一书刻印",
     "desc": "1820年，《海录》一书刻印。该书是一部使节旅行记性质的著作，由广东人谢清高口述。",
     "src": {
      "book": "中外历史对比年表",
      "page": 91,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1822,
     "yearEnd": null,
     "yearLabel": "1822",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府明确申定",
     "desc": "1822年，清政府明确申定，洋人必须遵守中国法律。",
     "src": {
      "book": "中外历史对比年表",
      "page": 91,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1820,
     "yearEnd": null,
     "yearLabel": "1820",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国国会南北方代表达成妥协",
     "desc": "1820年3月，美国国会南北方代表达成妥协，确定密苏里为蓄奴州，同时从马萨诸塞州分出一个新州——缅因州作为自由州；尚未建州的西部以北纬36.5度为自由制与奴隶制的分界线。此为《密苏里妥协案》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 91,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1821,
     "yearEnd": 1829,
     "yearLabel": "1821",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "希腊",
      "英格兰"
     ],
     "title": "希腊人民掀起反对土耳其统治的民族解放战争",
     "desc": "1821—1829年，希腊人民掀起反对土耳其统治的民族解放战争，在英法俄等国干涉下，土耳其被迫承认希腊独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 91,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1822,
     "yearEnd": null,
     "yearLabel": "1822",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "南美北部地区的委内瑞拉、哥伦比亚、厄瓜多尔全摆脱了西班牙的殖民统治",
     "desc": "1822年，南美北部地区的委内瑞拉、哥伦比亚、厄瓜多尔全摆脱了西班牙的殖民统治，获得独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 91,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1822,
     "yearEnd": null,
     "yearLabel": "1822",
     "yearKind": "explicit",
     "region": "central-asia",
     "regionLabel": "中亚",
     "country": "中亚",
     "countries": [
      "中亚"
     ],
     "title": "清政府规定《商民与蒙古贸易章程》",
     "desc": "1822年，清政府规定《商民与蒙古贸易章程》，详细规定贸易地点和来去期限。",
     "src": {
      "book": "中外历史对比年表",
      "page": 91,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1822,
     "yearEnd": null,
     "yearLabel": "1822",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "葡属巴西宣告独立",
     "desc": "1822年，葡属巴西宣告独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 92,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1823,
     "yearEnd": null,
     "yearLabel": "1823",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国发表《门罗宣言》",
     "desc": "1823年，美国发表《门罗宣言》，以抵制神圣同盟对拉丁美洲的干涉，把拉丁美洲作为自己的势力范围。",
     "src": {
      "book": "中外历史对比年表",
      "page": 92,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b115",
   "year": 1825,
   "yearLabel": "1825",
   "pages": [
    92
   ],
   "china": [
    {
     "year": 1825,
     "yearEnd": null,
     "yearLabel": "1825",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府命江、浙试办海运漕粮",
     "desc": "1825年，清政府命江、浙试办海运漕粮。",
     "src": {
      "book": "中外历史对比年表",
      "page": 92,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1826,
     "yearEnd": null,
     "yearLabel": "1826",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷第一批海运漕粮抵达天津",
     "desc": "1826年，清廷第一批海运漕粮抵达天津。自此，漕粮海运得以实施，并逐渐代替运河取得主要地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 92,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1827,
     "yearEnd": null,
     "yearLabel": "1827",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府出兵镇压了新疆地区的张格尔叛乱",
     "desc": "1827年，清政府出兵镇压了新疆地区的张格尔叛乱。",
     "src": {
      "book": "中外历史对比年表",
      "page": 92,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1825,
     "yearEnd": null,
     "yearLabel": "1825",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国爆发了第一次资本主义经济危机",
     "desc": "1825年，英国爆发了第一次资本主义经济危机。",
     "src": {
      "book": "中外历史对比年表",
      "page": 92,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1825,
     "yearEnd": null,
     "yearLabel": "1825",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "俄国十二月党人起义",
     "desc": "1825年，俄国十二月党人起义，是俄国历史上第一次有组织、有纲领的武装起义，震撼了沙皇专制统治和农奴制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 92,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1826,
     "yearEnd": null,
     "yearLabel": "1826",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "欧洲",
      "美洲"
     ],
     "title": "盘踞在南美最后一个据点卡亚俄港的西班牙殖民军残部投降",
     "desc": "1826年，盘踞在南美最后一个据点卡亚俄港的西班牙殖民军残部投降，西属拉丁美洲独立战争胜利结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 92,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b116",
   "year": 1830,
   "yearLabel": "1830",
   "pages": [
    92,
    93,
    94
   ],
   "china": [
    {
     "year": 1830,
     "yearEnd": null,
     "yearLabel": "1830",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "美国公理会传教士裨治文到达广州",
     "desc": "1830年，美国公理会传教士裨治文到达广州，他是第一个到中国来的美国新教传教士。",
     "src": {
      "book": "中外历史对比年表",
      "page": 92,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1831,
     "yearEnd": null,
     "yearLabel": "1831",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "湖南永州瑶族农民在赵金龙率领下起义",
     "desc": "1831年，湖南永州瑶族农民在赵金龙率领下起义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 93,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1832,
     "yearEnd": null,
     "yearLabel": "1832",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英国船只“阿美士德”号在中国沿海测量港湾航道",
     "desc": "1832年，英国船只“阿美士德”号在中国沿海测量港湾航道，调查港口情况，并绘制地图。",
     "src": {
      "book": "中外历史对比年表",
      "page": 93,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1833,
     "yearEnd": null,
     "yearLabel": "1833",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "德籍传教士郭士立在广州创办汉文报刊《东西洋考每月统记传》",
     "desc": "1833年，德籍传教士郭士立在广州创办汉文报刊《东西洋考每月统记传》，这是中国境内第一家中文杂志。",
     "src": {
      "book": "中外历史对比年表",
      "page": 93,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1833,
     "yearEnd": null,
     "yearLabel": "1833",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "江苏巡抚林则徐提出改革币制主张",
     "desc": "1833年，江苏巡抚林则徐提出改革币制主张，建议朝廷建立本国的银本位货币制度。",
     "src": {
      "book": "中外历史对比年表",
      "page": 93,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1834,
     "yearEnd": null,
     "yearLabel": "1834",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英国兵船强行闯入虎门",
     "desc": "1834年，英国兵船强行闯入虎门，遭中国军民坚决抵抗，侵略行动以失败告终。",
     "src": {
      "book": "中外历史对比年表",
      "page": 93,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1830,
     "yearEnd": null,
     "yearLabel": "1830",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国爆发“七月革命”",
     "desc": "1830年，法国爆发“七月革命”，复辟王朝被推翻，代表金融势力的“七月王朝”建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 92,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1830,
     "yearEnd": null,
     "yearLabel": "1830",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "比利时发生革命",
     "desc": "1830年，比利时发生革命，宣布脱离荷兰独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 92,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1830,
     "yearEnd": null,
     "yearLabel": "1830",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "非洲"
     ],
     "title": "阿尔及利亚沦为法国的殖民地",
     "desc": "1830年，阿尔及利亚沦为法国的殖民地，法国在阿尔及利亚实行“同化政策”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 93,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1831,
     "yearEnd": null,
     "yearLabel": "1831",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国科学家法拉第成功发现电磁感应现象",
     "desc": "1831年，英国科学家法拉第成功发现电磁感应现象，提出发电机的理论基础，使电力工业得以建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 93,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1832,
     "yearEnd": null,
     "yearLabel": "1832",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国议会改革法案通过",
     "desc": "1832年，英国议会改革法案通过，降低选举资格，使工业资产阶级获得了参加政权的机会。",
     "src": {
      "book": "中外历史对比年表",
      "page": 93,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1832,
     "yearEnd": null,
     "yearLabel": "1832",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国议会改革后",
     "desc": "1832年，英国议会改革后，托利党改称为保守党，辉格党改称为自由党。",
     "src": {
      "book": "中外历史对比年表",
      "page": 93,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1833,
     "yearEnd": 1913,
     "yearLabel": "1833",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "施里芬",
     "desc": "1833—1913年，施里芬，德国陆军元帅、总参谋长，制定了德国东西两线作战的战争计划——施里芬计划。",
     "src": {
      "book": "中外历史对比年表",
      "page": 93,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1833,
     "yearEnd": null,
     "yearLabel": "1833",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国全国性废奴组织“美国反对奴隶制协会”成立",
     "desc": "1833年，美国全国性废奴组织“美国反对奴隶制协会”成立，有组织有纲领的废奴运动兴起。",
     "src": {
      "book": "中外历史对比年表",
      "page": 93,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1834,
     "yearEnd": null,
     "yearLabel": "1834",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国成立了“全国各业统一工会”",
     "desc": "1834年2月，英国成立了“全国各业统一工会”，几乎包括全国各行各业工人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 93,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1834,
     "yearEnd": null,
     "yearLabel": "1834",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德意志大多数邦联合组成“德意志关税同盟”",
     "desc": "1834年，德意志大多数邦联合组成“德意志关税同盟”，实行免税贸易，采用统一货币和度量衡制度，缩小了国家分裂状态的消极影响。",
     "src": {
      "book": "中外历史对比年表",
      "page": 94,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b117",
   "year": 1835,
   "yearLabel": "1835",
   "pages": [
    94
   ],
   "china": [
    {
     "year": 1835,
     "yearEnd": null,
     "yearLabel": "1835",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷增订《防范洋人贸易章程》八条",
     "desc": "1835年，清廷增订《防范洋人贸易章程》八条。",
     "src": {
      "book": "中外历史对比年表",
      "page": 94,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1836,
     "yearEnd": null,
     "yearLabel": "1836",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "道光帝谕令各沿海督抚并海口各监督",
     "desc": "1836年，道光帝谕令各沿海督抚并海口各监督，严行稽查，以防白银外流。",
     "src": {
      "book": "中外历史对比年表",
      "page": 94,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1838,
     "yearEnd": null,
     "yearLabel": "1838",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "道光帝任命林则徐为钦差大臣",
     "desc": "1838年，道光帝任命林则徐为钦差大臣，节制广东水师，前往广州查禁鸦片。",
     "src": {
      "book": "中外历史对比年表",
      "page": 94,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1839,
     "yearEnd": null,
     "yearLabel": "1839",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "林则徐主持在鸦片走私的重要航道虎门",
     "desc": "1839年，林则徐主持在鸦片走私的重要航道虎门，将缴获鸦片当众销毁，表明中国人民反抗外国侵略、维护民族尊严的坚强决心。",
     "src": {
      "book": "中外历史对比年表",
      "page": 94,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1836,
     "yearEnd": null,
     "yearLabel": "1836",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国制定《专利法》",
     "desc": "1836年，美国制定《专利法》，成立专利局，使发明人利益得到有效保障。",
     "src": {
      "book": "中外历史对比年表",
      "page": 94,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1836,
     "yearEnd": 1848,
     "yearLabel": "1836",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国宪章运动",
     "desc": "1836—1848年，英国宪章运动，世界上第一次工人阶级的独立的全国性政治运动，目标是要通过实行普选制，以和平方式夺取国家政权，在国际工人运动史上具有重要意义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 94,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1838,
     "yearEnd": null,
     "yearLabel": "1838",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "中美洲五国独立",
     "desc": "1838年，中美洲的危地马拉、洪都拉斯、尼加拉瓜、萨尔多瓦、哥斯达黎加分别建立独立的主权国家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 94,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1835,
     "yearEnd": null,
     "yearLabel": "1835",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "英国"
     ],
     "title": "20—30年代，英国完成了工业革命",
     "desc": "19世纪20—30年代，英国完成了工业革命。",
     "src": {
      "book": "中外历史对比年表",
      "page": 94,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1835,
     "yearEnd": null,
     "yearLabel": "1835",
     "yearKind": "anchor",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "20—30年代，美国建成伊利运河、俄亥俄—伊利运河",
     "desc": "19世纪20—30年代，美国建成伊利运河、俄亥俄—伊利运河，把密西西比河、五大湖和大西洋连成一体。",
     "src": {
      "book": "中外历史对比年表",
      "page": 94,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b118",
   "year": 1840,
   "yearLabel": "1840",
   "pages": [
    95
   ],
   "china": [
    {
     "year": 1840,
     "yearEnd": null,
     "yearLabel": "1840",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "第一次鸦片战争爆发",
     "desc": "1840年6月，第一次鸦片战争爆发，英军进攻广东珠江口，并北进攻击中国沿海。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1841,
     "yearEnd": null,
     "yearLabel": "1841",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府签订屈辱的《广州和约》",
     "desc": "1841年5月，清政府签订屈辱的《广州和约》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1841,
     "yearEnd": null,
     "yearLabel": "1841",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "广州北郊三元里人民抗英斗争",
     "desc": "1841年5月，广州北郊三元里人民抗英斗争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1841,
     "yearEnd": null,
     "yearLabel": "1841",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英军进攻定海，守军壮烈牺牲",
     "desc": "1841年9—10月，英军进攻定海，总兵葛云飞、郑国鸿、王锡朋率5000守军浴血奋战，全部壮烈牺牲。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1842,
     "yearEnd": null,
     "yearLabel": "1842",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英军进攻镇江",
     "desc": "1842年7月，英军进攻镇江，副都统海龄率4000余名将士殊死奋战，全部牺牲。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1842,
     "yearEnd": null,
     "yearLabel": "1842",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府被迫签订近代中国历史上第一个不平等条约——《南京条约》",
     "desc": "1842年8月，清政府被迫签订近代中国历史上第一个不平等条约——《南京条约》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1844,
     "yearEnd": null,
     "yearLabel": "1844",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府被迫与美国签订《望厦条约》",
     "desc": "1844年7月，清政府被迫与美国签订《望厦条约》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1844,
     "yearEnd": null,
     "yearLabel": "1844",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府被迫与法国签订《黄埔条约》",
     "desc": "1844年10月，清政府被迫与法国签订《黄埔条约》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1845,
     "yearEnd": null,
     "yearLabel": "1845",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英国驻上海领事强迫清政府在上海划定一个区域作为英国人居留地",
     "desc": "1845年，英国驻上海领事强迫清政府在上海划定一个区域作为英国人居留地，这是外国侵略者在中国设立租界的开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 10,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1840,
     "yearEnd": null,
     "yearLabel": "1840",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国“全国宪章协会”成立",
     "desc": "1840年7月，英国“全国宪章协会”成立，这是世界上第一个工人阶级政党的雏形。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1841,
     "yearEnd": null,
     "yearLabel": "1841",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "英格兰",
      "非洲"
     ],
     "title": "埃及被迫与英国签订和约",
     "desc": "1841年，埃及被迫与英国签订和约，结果失去全部属地，只保留埃及和苏丹的总督世袭权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1841,
     "yearEnd": null,
     "yearLabel": "1841",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "俄英法奥普订立《海峡协定》",
     "desc": "1841年，俄英法奥普订立《海峡协定》，规定达达尼尔海峡与博斯普鲁斯海峡在和平时期也不允许任何国家的军舰通过。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1842,
     "yearEnd": null,
     "yearLabel": "1842",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国“承认”夏威夷的独立地位",
     "desc": "1842年，美国“承认”夏威夷的独立地位，后于1898年并入美国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1844,
     "yearEnd": null,
     "yearLabel": "1844",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国西里西亚纺织工人起义",
     "desc": "1844年6月，德国西里西亚纺织工人起义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1845,
     "yearEnd": null,
     "yearLabel": "1845",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国将德克萨斯合并为第28个州",
     "desc": "1845年，美国将德克萨斯合并为第28个州。",
     "src": {
      "book": "中外历史对比年表",
      "page": 95,
      "row": 10,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b119",
   "year": 1846,
   "yearLabel": "1846",
   "pages": [
    96,
    97,
    98
   ],
   "china": [
    {
     "year": 1846,
     "yearEnd": null,
     "yearLabel": "1846",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "法国获得在中国各通商口岸自由传教的权利",
     "desc": "1846年，法国获得在中国各通商口岸自由传教的权利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 96,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1846,
     "yearEnd": null,
     "yearLabel": "1846",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府正式宣布弛禁天主教",
     "desc": "1846年，清政府正式宣布弛禁天主教，发还康熙末年以来没收的天主教堂。",
     "src": {
      "book": "中外历史对比年表",
      "page": 96,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1848,
     "yearEnd": null,
     "yearLabel": "1848",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "上海老凤祥银楼开张",
     "desc": "1848年，上海老凤祥银楼开张，此举开创了中国首饰业的世纪品牌，引领此后百余年的时尚。",
     "src": {
      "book": "中外历史对比年表",
      "page": 96,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1848,
     "yearEnd": null,
     "yearLabel": "1848",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "洪秀全写成《原道觉世训》一书",
     "desc": "1848年，洪秀全写成《原道觉世训》一书。",
     "src": {
      "book": "中外历史对比年表",
      "page": 96,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1848,
     "yearEnd": null,
     "yearLabel": "1848",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "首批满怀着淘金梦的中国移民抵达旧金山",
     "desc": "1848年，首批满怀着淘金梦的中国移民抵达旧金山。",
     "src": {
      "book": "中外历史对比年表",
      "page": 97,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1849,
     "yearEnd": 1853,
     "yearLabel": "1849",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "沙俄势力扩张到黑龙江下游两岸以及口外整个中国领海",
     "desc": "1849—1853年，沙俄势力扩张到黑龙江下游两岸以及口外整个中国领海，并侵吞了库页岛。",
     "src": {
      "book": "中外历史对比年表",
      "page": 97,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1851,
     "yearEnd": null,
     "yearLabel": "1851",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "沙俄强迫清政府签订《伊犁塔尔巴哈台通商章程》",
     "desc": "1851年，沙俄强迫清政府签订《伊犁塔尔巴哈台通商章程》，攫取了在中国新疆的侵略特权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 97,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1851,
     "yearEnd": null,
     "yearLabel": "1851",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "洪秀全率众在广西金田宣布起义",
     "desc": "1851年1月，洪秀全率众在广西金田宣布起义，建号太平天国，太平天国农民战争自此开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 97,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1853,
     "yearEnd": null,
     "yearLabel": "1853",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "太平天国军攻陷南京",
     "desc": "1853年3月，太平天国军攻陷南京，改称“天京”，正式建立与清王朝对峙的政权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 98,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1853,
     "yearEnd": 1855,
     "yearLabel": "1853",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "太平军北伐",
     "desc": "1853—1855年，太平军北伐，两年内横扫六省，转战五千里，严重打击了清朝统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 98,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1853,
     "yearEnd": 1856,
     "yearLabel": "1853",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "太平军西征",
     "desc": "1853—1856年，太平军西征，经过三年多军事斗争，控制了长江中下游从武昌到镇江的沿岸城镇，安徽、江西、湖北及江苏部分地区都为太平天国所掌握。",
     "src": {
      "book": "中外历史对比年表",
      "page": 98,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1853,
     "yearEnd": 1855,
     "yearLabel": "1853",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "上海小刀会领袖刘丽川率众起义",
     "desc": "1853—1855年，上海小刀会领袖刘丽川率众起义，遭中外反动势力围攻失败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 98,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1854,
     "yearEnd": 1855,
     "yearLabel": "1854",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "太平天国西征军在湖南、江西多次大败曾国藩领导的湘军",
     "desc": "1854—1855年，太平天国西征军在湖南、江西多次大败曾国藩领导的湘军。",
     "src": {
      "book": "中外历史对比年表",
      "page": 98,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1854,
     "yearEnd": 1857,
     "yearLabel": "1854",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "沙俄推行“武装航行黑龙江”计划",
     "desc": "1854—1857年，沙俄推行“武装航行黑龙江”计划，侵入中国黑龙江流域，屯兵、移民。",
     "src": {
      "book": "中外历史对比年表",
      "page": 98,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1854,
     "yearEnd": 1921,
     "yearLabel": "1854",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "严复",
     "desc": "1854—1921年，严复，近代启蒙思想家和翻译家，曾留学英国，广泛接触西方近代自然科学和社会科学，积极倡导西学，翻译了《天演论》《法意》《群学肄言》等西学名著，对近代中国变革起到重大推动作用。",
     "src": {
      "book": "中外历史对比年表",
      "page": 98,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1846,
     "yearEnd": null,
     "yearLabel": "1846",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "马克思、恩格斯在布鲁塞尔建立共产主义通讯委员会",
     "desc": "1846年，马克思、恩格斯在布鲁塞尔建立共产主义通讯委员会，传播革命理论。",
     "src": {
      "book": "中外历史对比年表",
      "page": 96,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1846,
     "yearEnd": 1848,
     "yearLabel": "1846",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国挑起侵墨战争",
     "desc": "1846—1848年，美国挑起侵墨战争，夺得今亚利桑那、加利福尼亚、内华达、新墨西哥4个州及科罗拉多和怀俄明州的一部分。",
     "src": {
      "book": "中外历史对比年表",
      "page": 96,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1846,
     "yearEnd": null,
     "yearLabel": "1846",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "英格兰",
      "美洲"
     ],
     "title": "美国以战争相威胁",
     "desc": "1846年，美国以战争相威胁，从英国手中夺取了俄勒冈地区的一部分。",
     "src": {
      "book": "中外历史对比年表",
      "page": 96,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1847,
     "yearEnd": null,
     "yearLabel": "1847",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国通过了10小时工作日的法案",
     "desc": "1847年，英国通过了10小时工作日的法案。",
     "src": {
      "book": "中外历史对比年表",
      "page": 96,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1847,
     "yearEnd": null,
     "yearLabel": "1847",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "根据马克思和恩格斯的建议",
     "desc": "1847年6月，根据马克思和恩格斯的建议，“正义者同盟”更名为“共产主义者同盟”，口号是“全世界无产者，联合起来”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 96,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1848,
     "yearEnd": null,
     "yearLabel": "1848",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "马克思执笔的《共产党宣言》问世",
     "desc": "1848年2月，马克思执笔的《共产党宣言》问世，第一次较完整系统地阐述了马克思主义的基本原理，是国际共产主义运动的第一个纲领性文件。",
     "src": {
      "book": "中外历史对比年表",
      "page": 96,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1848,
     "yearEnd": null,
     "yearLabel": "1848",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "意大利西西里岛首府巴勒莫人民举行起义",
     "desc": "1848年，意大利西西里岛首府巴勒莫人民举行起义，揭开了1848年欧洲革命的序幕。",
     "src": {
      "book": "中外历史对比年表",
      "page": 97,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1848,
     "yearEnd": null,
     "yearLabel": "1848",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国“二月革命”取得胜利",
     "desc": "1848年，法国“二月革命”取得胜利，法兰西第二共和国建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 97,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1849,
     "yearEnd": null,
     "yearLabel": "1849",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "英格兰"
     ],
     "title": "英国吞并旁遮普",
     "desc": "1849年，英国吞并旁遮普，最终完成了对印度的全部占领，印度完全沦为英国的殖民地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 97,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1846,
     "yearEnd": null,
     "yearLabel": "1846",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英国"
     ],
     "title": "30—40年代，法国冶铁业中开始使用焦炭作燃料",
     "desc": "19世纪30—40年代，法国冶铁业中开始使用焦炭作燃料，出现鼓风高炉，推广了搅炼法。法国金属加工业中出现汽锤、滚轧和切削机床，初步奠定机器制造业的基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 97,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1846,
     "yearEnd": null,
     "yearLabel": "1846",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国物理学家焦耳发现能量守恒和转化定律",
     "desc": "19世纪40年代，英国物理学家焦耳发现能量守恒和转化定律。",
     "src": {
      "book": "中外历史对比年表",
      "page": 97,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1852,
     "yearEnd": null,
     "yearLabel": "1852",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "路易·拿破仑·波拿巴宣布自己为法兰西皇帝",
     "desc": "1852年，路易·拿破仑·波拿巴宣布自己为法兰西皇帝，称“拿破仑三世”，法兰西第二帝国建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 97,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1853,
     "yearEnd": 1854,
     "yearLabel": "1853",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本",
      "美洲"
     ],
     "title": "美国海军准将培里率领舰队两次强行驶入日本港",
     "desc": "1853—1854年，美国海军准将培里率领舰队两次强行驶入日本港，迫使日本放弃“锁国政策”，签订了《日美亲善条约》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 97,
      "row": 10,
      "col": "外国"
     }
    },
    {
     "year": 1853,
     "yearEnd": 1856,
     "yearLabel": "1853",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰",
      "俄国"
     ],
     "title": "克里米亚战争",
     "desc": "1853—1856年，克里米亚战争，俄国被英法联军打败，双方订立《巴黎和约》，规定黑海中立，不准俄国在黑海保留舰队及在黑海沿岸设立要塞。",
     "src": {
      "book": "中外历史对比年表",
      "page": 98,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1854,
     "yearEnd": null,
     "yearLabel": "1854",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国共和党成立",
     "desc": "1854年，美国共和党成立，该党本质上是以反对奴隶制为目标的北部工业资产阶级、农民、工人及黑人的联合组织。",
     "src": {
      "book": "中外历史对比年表",
      "page": 98,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1854,
     "yearEnd": null,
     "yearLabel": "1854",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "非洲"
     ],
     "title": "英国承认南非布尔人建立的奥兰治共和国",
     "desc": "1854年，英国承认南非布尔人建立的奥兰治共和国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 98,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b120",
   "year": 1855,
   "yearLabel": "1855",
   "pages": [
    99,
    100
   ],
   "china": [
    {
     "year": 1855,
     "yearEnd": null,
     "yearLabel": "1855",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "各路捻军首领汇聚安徽蒙城",
     "desc": "1855年，各路捻军首领汇聚安徽蒙城，推张洛行为盟主，组成联合力量，成为北方反清斗争的主力。",
     "src": {
      "book": "中外历史对比年表",
      "page": 99,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1856,
     "yearEnd": 1860,
     "yearLabel": "1856",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英法发动第二次鸦片战争",
     "desc": "1856—1860年，英法发动第二次鸦片战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 99,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1856,
     "yearEnd": null,
     "yearLabel": "1856",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "“亚罗号事件”、“马神甫事件”分别成为英法两国制造战争的借口",
     "desc": "1856年，“亚罗号事件”、“马神甫事件”分别成为英法两国制造战争的借口。",
     "src": {
      "book": "中外历史对比年表",
      "page": 99,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1856,
     "yearEnd": 1857,
     "yearLabel": "1856",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "太平天国领导集团发生公开分裂",
     "desc": "1856—1857年，太平天国领导集团发生公开分裂，杨秀清、韦昌辉先后被杀，石达开被迫离开天京独立作战，太平军兵力大大削弱。",
     "src": {
      "book": "中外历史对比年表",
      "page": 99,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1858,
     "yearEnd": null,
     "yearLabel": "1858",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府与俄美英法签订《天津条约》",
     "desc": "1858年6—11月，清政府被迫分别与俄美英法四国签订《天津条约》；同英法美三国签订《通商章程善后条约》，中国主权进一步遭到破坏。",
     "src": {
      "book": "中外历史对比年表",
      "page": 99,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1859,
     "yearEnd": null,
     "yearLabel": "1859",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "太平天国干王洪仁玕总理朝政",
     "desc": "1859年，太平天国干王洪仁玕总理朝政，提出了具有鲜明资本主义色彩的方案——《资政新篇》，因不能反映当时农民最迫切的利益和要求而没有实行。",
     "src": {
      "book": "中外历史对比年表",
      "page": 100,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1859,
     "yearEnd": 1863,
     "yearLabel": "1859",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "石达开率领孤军",
     "desc": "1859—1863年，石达开率领孤军，转战多省作战，后被清军全部消灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 100,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1859,
     "yearEnd": null,
     "yearLabel": "1859",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英法侵略军进攻大沽口炮台",
     "desc": "1859年6月，英法侵略军进攻大沽口炮台，遭到守卫将士痛击，损失惨重。",
     "src": {
      "book": "中外历史对比年表",
      "page": 100,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1855,
     "yearEnd": null,
     "yearLabel": "1855",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国两次改革文官制度",
     "desc": "1855、1870年，英国先后两次颁布枢密院命令，进行文官制度改革，改变过去官吏任免的“恩赐制”，实行公开竞争考试办法，择优录取，从而减少了腐败现象，提高了行政管理效率。",
     "src": {
      "book": "中外历史对比年表",
      "page": 99,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1856,
     "yearEnd": null,
     "yearLabel": "1856",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国人贝西默发明“吹气精炼”操作法",
     "desc": "1856年，英国人贝西默发明“吹气精炼”操作法，改进了冶炼技术，贝氏转炉得到推广。",
     "src": {
      "book": "中外历史对比年表",
      "page": 99,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1856,
     "yearEnd": 1939,
     "yearLabel": "1856",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "弗洛伊德",
     "desc": "1856—1939年，弗洛伊德，奥地利精神病学家，创立精神分析学说。",
     "src": {
      "book": "中外历史对比年表",
      "page": 99,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1857,
     "yearEnd": 1859,
     "yearLabel": "1857",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "英格兰"
     ],
     "title": "印度民族大起义",
     "desc": "1857—1859年，印度民族大起义，由封建王公领导、以印籍士兵为主要力量的反对英国殖民统治的起义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 99,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1858,
     "yearEnd": null,
     "yearLabel": "1858",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "英格兰"
     ],
     "title": "英国维多利亚女王发表宣言",
     "desc": "1858年，英国维多利亚女王发表宣言，把印度的统治权由东印度公司转移为皇家直接管辖。",
     "src": {
      "book": "中外历史对比年表",
      "page": 99,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1858,
     "yearEnd": null,
     "yearLabel": "1858",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "英格兰",
      "日本",
      "美洲"
     ],
     "title": "美国强迫日本签订《日美修好通商条约》",
     "desc": "1858年，美国强迫日本签订《日美修好通商条约》。随后，荷俄英法四国援例强迫日本签订类似条约。这些不平等条约因签订于安政五年而统称“安政五国条约”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 99,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1859,
     "yearEnd": null,
     "yearLabel": "1859",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国生物学家达尔文正式出版《物种起源》",
     "desc": "1859年，英国生物学家达尔文正式出版《物种起源》，提出进化论学说。",
     "src": {
      "book": "中外历史对比年表",
      "page": 100,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1859,
     "yearEnd": null,
     "yearLabel": "1859",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国弗吉尼亚州约翰·布朗起义",
     "desc": "1859年10月，美国弗吉尼亚州约翰·布朗起义，反对奴隶制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 100,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1859,
     "yearEnd": 1869,
     "yearLabel": "1859",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "非洲"
     ],
     "title": "埃及依靠借外债开凿了苏伊士运河",
     "desc": "1859—1869年，埃及依靠借外债开凿了苏伊士运河，通航后大大缩短了欧亚航程。",
     "src": {
      "book": "中外历史对比年表",
      "page": 100,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b121",
   "year": 1860,
   "yearLabel": "1860",
   "pages": [
    100,
    101,
    102,
    103
   ],
   "china": [
    {
     "year": 1860,
     "yearEnd": null,
     "yearLabel": "1860",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英法两国政府分别再度派军来华",
     "desc": "1860年2月，英法两国政府分别再度派军来华，扩大侵略战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 100,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1860,
     "yearEnd": null,
     "yearLabel": "1860",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英法联军大肆抢掠后纵火焚毁圆明园",
     "desc": "1860年10月，英法联军大肆抢掠后纵火焚毁圆明园。",
     "src": {
      "book": "中外历史对比年表",
      "page": 100,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1860,
     "yearEnd": null,
     "yearLabel": "1860",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府分别与英法两国签订《北京条约》",
     "desc": "1860年10月，清政府分别与英法两国签订《北京条约》，第二次鸦片战争结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 100,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1861,
     "yearEnd": null,
     "yearLabel": "1861",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "咸丰帝设立总理各国事务衙门（简称“总理衙门”）",
     "desc": "1861年1月，咸丰帝设立总理各国事务衙门（简称“总理衙门”），主管外交及通商、关税等事务，后又增加筑路、开矿、制造枪炮军火等事务，总揽全部洋务事宜。",
     "src": {
      "book": "中外历史对比年表",
      "page": 100,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1861,
     "yearEnd": null,
     "yearLabel": "1861",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "成立全国性的总税务司署",
     "desc": "1861年，成立全国性的总税务司署，由洋人担任总税务司，管理全部海关税务。",
     "src": {
      "book": "中外历史对比年表",
      "page": 101,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1861,
     "yearEnd": null,
     "yearLabel": "1861",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "冯桂芬写成《校邠庐抗议》",
     "desc": "1861年，冯桂芬写成《校邠庐抗议》，提出“采西学、制洋器”的主张，其洋务指导思想是“以中国之伦常名教为原本，辅以诸国富强之术”，也是“中学为体、西学为用”理论的滥觞。",
     "src": {
      "book": "中外历史对比年表",
      "page": 101,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1861,
     "yearEnd": null,
     "yearLabel": "1861",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "曾国藩设立安庆内军械所",
     "desc": "1861年，曾国藩设立安庆内军械所，试造枪炮弹药，任用了一批近代早期的著名科技人才，如李善兰、徐寿、华蘅芳等人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 101,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1861,
     "yearEnd": null,
     "yearLabel": "1861",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中俄双方代表签订《勘分东界约记》",
     "desc": "1861年，中俄双方代表签订《勘分东界约记》，勘分了兴凯湖以南的陆界。",
     "src": {
      "book": "中外历史对比年表",
      "page": 101,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1861,
     "yearEnd": null,
     "yearLabel": "1861",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "咸丰帝病死",
     "desc": "1861年8月，咸丰帝病死，其六岁儿子载淳继位，改年号为“祺祥”，怡亲王载垣等八人任“赞襄政务王大臣”，总摄朝政。",
     "src": {
      "book": "中外历史对比年表",
      "page": 101,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1861,
     "yearEnd": null,
     "yearLabel": "1861",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "辛酉政变（又称“祺祥政变”或“北京政变”）",
     "desc": "1861年11月，辛酉政变（又称“祺祥政变”或“北京政变”），慈禧太后勾结恭亲王奕䜣，阴谋铲除了载垣等八大臣，夺取了清政府实际的最高统治权，改皇帝年号为“同治”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 102,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1862,
     "yearEnd": null,
     "yearLabel": "1862",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "京师设立同文馆——培养掌握外国语言文字、科学技术人才的学校",
     "desc": "1862年，京师设立同文馆——培养掌握外国语言文字、科学技术人才的学校。",
     "src": {
      "book": "中外历史对比年表",
      "page": 102,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1862,
     "yearEnd": null,
     "yearLabel": "1862",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李鸿章仿照湘军营制",
     "desc": "1862年，李鸿章仿照湘军营制，在安徽建立淮军，成为继湘军之后的又一支军阀武装。",
     "src": {
      "book": "中外历史对比年表",
      "page": 102,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1862,
     "yearEnd": null,
     "yearLabel": "1862",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李鸿章在上海设立三所洋炮局",
     "desc": "1862年，李鸿章在上海设立三所洋炮局。",
     "src": {
      "book": "中外历史对比年表",
      "page": 102,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1862,
     "yearEnd": null,
     "yearLabel": "1862",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府在天津成立第一支洋枪队",
     "desc": "1862年，清政府在天津成立第一支洋枪队，聘用外国教练。",
     "src": {
      "book": "中外历史对比年表",
      "page": 102,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1863,
     "yearEnd": 1898,
     "yearLabel": "1863",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "谭嗣同",
     "desc": "1863—1898年，谭嗣同，维新运动的中坚骨干，著《仁学》，系统地阐述了其哲学和社会政治思想。",
     "src": {
      "book": "中外历史对比年表",
      "page": 102,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1864,
     "yearEnd": null,
     "yearLabel": "1864",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "湘军攻陷天京",
     "desc": "1864年6月，湘军攻陷天京，太平天国农民战争失败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 103,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1864,
     "yearEnd": null,
     "yearLabel": "1864",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中俄签订《勘分西北界约记》",
     "desc": "1864年10月，中俄签订《勘分西北界约记》，具体划定了从沙宾达巴哈山口（今俄境）起至浩罕边界止的中俄西段边界。",
     "src": {
      "book": "中外历史对比年表",
      "page": 103,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1860,
     "yearEnd": null,
     "yearLabel": "1860",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "撒丁王国初步完成了意大利的局部统一",
     "desc": "1860年春，撒丁王国初步完成了意大利的局部统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 100,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1860,
     "yearEnd": null,
     "yearLabel": "1860",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国共和党候选人亚伯拉罕·林肯当选总统",
     "desc": "1860年，美国共和党候选人亚伯拉罕·林肯当选总统，这成为美国内战爆发的导火索。",
     "src": {
      "book": "中外历史对比年表",
      "page": 100,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1861,
     "yearEnd": null,
     "yearLabel": "1861",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国南方七个州先后宣布脱离联邦",
     "desc": "1861年2月4日，美国南方七个州先后宣布脱离联邦，成立“美利坚诸州同盟”，定都弗吉尼亚的里士满，推举戴维斯为总统。",
     "src": {
      "book": "中外历史对比年表",
      "page": 100,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1861,
     "yearEnd": null,
     "yearLabel": "1861",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "沙皇签署法令废除农奴制",
     "desc": "1861年3月3日，沙皇签署法令废除农奴制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 101,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1861,
     "yearEnd": null,
     "yearLabel": "1861",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "意大利王国成立",
     "desc": "1861年3月17日，意大利王国成立，撒丁国王艾曼努尔二世为意大利国王。",
     "src": {
      "book": "中外历史对比年表",
      "page": 101,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1861,
     "yearEnd": null,
     "yearLabel": "1861",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "林肯政府正式宣布对南部同盟作战",
     "desc": "1861年4月15日，林肯政府正式宣布对南部同盟作战，美国内战爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 101,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1861,
     "yearEnd": null,
     "yearLabel": "1861",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "美洲"
     ],
     "title": "英国宣布对美国内战采取中立立场",
     "desc": "1861年，英国宣布对美国内战采取中立立场。",
     "src": {
      "book": "中外历史对比年表",
      "page": 101,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1862,
     "yearEnd": null,
     "yearLabel": "1862",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "林肯政府颁布《宅地法》",
     "desc": "1862年5月24日，林肯政府颁布《宅地法》，极大地鼓舞了联邦军队中广大士兵的战斗热情。",
     "src": {
      "book": "中外历史对比年表",
      "page": 102,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1862,
     "yearEnd": null,
     "yearLabel": "1862",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "林肯发布《解放宣言》",
     "desc": "1862年9月24日，林肯发布《解放宣言》，宣布从1863年1月1日起，叛乱诸州的奴隶全部获得自由。南方奴隶成批逃亡，参加联邦军队，壮大了北方力量。",
     "src": {
      "book": "中外历史对比年表",
      "page": 102,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1862,
     "yearEnd": null,
     "yearLabel": "1862",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "越南"
     ],
     "title": "法国强迫越南阮氏王朝签订《西贡条约》",
     "desc": "1862年，法国强迫越南阮氏王朝签订《西贡条约》，将南圻变为殖民地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 102,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1862,
     "yearEnd": null,
     "yearLabel": "1862",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "越南",
      "东南亚"
     ],
     "title": "越南被迫向法国交出了对柬埔寨的保护权",
     "desc": "1862年，越南被迫向法国交出了对柬埔寨的保护权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 102,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1863,
     "yearEnd": null,
     "yearLabel": "1863",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "美洲"
     ],
     "title": "美国、德国先后建立了全国性的工人联合会",
     "desc": "1863年，美国、德国先后建立了全国性的工人联合会。",
     "src": {
      "book": "中外历史对比年表",
      "page": 102,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1863,
     "yearEnd": null,
     "yearLabel": "1863",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国北方军队取得葛底斯堡大捷",
     "desc": "1863年7月，美国北方军队取得葛底斯堡大捷，战争主动权从此完全操在北军手中。",
     "src": {
      "book": "中外历史对比年表",
      "page": 102,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1864,
     "yearEnd": null,
     "yearLabel": "1864",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "国际工人大会在伦敦圣马丁教堂召开",
     "desc": "1864年9月，国际工人大会在伦敦圣马丁教堂召开，建立了国际工人组织——国际工人协会，即“第一国际”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 103,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1864,
     "yearEnd": null,
     "yearLabel": "1864",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "法兰西"
     ],
     "title": "法国人马丁和德国人西门子同时发明平炉炼钢法",
     "desc": "1864年，法国人马丁和德国人西门子同时发明平炉炼钢法，可以熔化废钢炼成优质钢。",
     "src": {
      "book": "中外历史对比年表",
      "page": 103,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1864,
     "yearEnd": 1920,
     "yearLabel": "1864",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "马克斯·韦伯",
     "desc": "1864—1920年，马克斯·韦伯，德国人，近代社会学的奠基者之一，开创了社会学中的反实证主义传统。",
     "src": {
      "book": "中外历史对比年表",
      "page": 103,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b122",
   "year": 1865,
   "yearLabel": "1865",
   "pages": [
    103,
    104,
    105
   ],
   "china": [
    {
     "year": 1865,
     "yearEnd": null,
     "yearLabel": "1865",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "在香港和上海两地同时开业的英国汇丰银行",
     "desc": "1865年，在香港和上海两地同时开业的英国汇丰银行，逐渐发展为外国在华资本最雄厚的金融机构。",
     "src": {
      "book": "中外历史对比年表",
      "page": 103,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1865,
     "yearEnd": null,
     "yearLabel": "1865",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "江苏巡抚李鸿章在上海创办的江南制造总局",
     "desc": "1865年，江苏巡抚李鸿章在上海创办的江南制造总局，是当时中国最大的兵工厂，也是中国真正的近代军事工业的开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 103,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1865,
     "yearEnd": null,
     "yearLabel": "1865",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李鸿章在南京创办金陵制造局",
     "desc": "1865年，李鸿章在南京创办金陵制造局，主要生产大炮和弹药。",
     "src": {
      "book": "中外历史对比年表",
      "page": 103,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1865,
     "yearEnd": 1870,
     "yearLabel": "1865",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "浩罕汗国（今乌兹别克斯坦境）军官阿古柏侵入中国新疆",
     "desc": "1865—1870年，浩罕汗国（今乌兹别克斯坦境）军官阿古柏侵入中国新疆，成立“哲德沙尔”（七城汗国），占领了南疆全部和北疆部分地区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 103,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1866,
     "yearEnd": null,
     "yearLabel": "1866",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "浙江巡抚左宗棠设立的福州船政局",
     "desc": "1866年，浙江巡抚左宗棠设立的福州船政局，是当时最大的船舶修造厂，用以制造和修理水师武器装备。",
     "src": {
      "book": "中外历史对比年表",
      "page": 104,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1866,
     "yearEnd": null,
     "yearLabel": "1866",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "三口通商大臣崇厚建立了天津机器局",
     "desc": "1866年，三口通商大臣崇厚建立了天津机器局，这是清朝在北洋设立的第一个兵工厂。",
     "src": {
      "book": "中外历史对比年表",
      "page": 104,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1867,
     "yearEnd": null,
     "yearLabel": "1867",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "台湾高山族群众击退在台登陆的美国海军陆战队",
     "desc": "1867年，台湾高山族群众击退在台登陆的美国海军陆战队，美军侵台失败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 104,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1868,
     "yearEnd": 1940,
     "yearLabel": "1868",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蔡元培",
     "desc": "1868—1940年，蔡元培，曾任南京临时政府教育总长、北京大学校长，主张“思想自由”原则，取“兼容并包”主义，允许各种学派自由发展，支持新文化运动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 104,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1869,
     "yearEnd": null,
     "yearLabel": "1869",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "福州船政局制成的第一艘轮船“万年青”号下水",
     "desc": "1869年，福州船政局制成的第一艘轮船“万年青”号下水。",
     "src": {
      "book": "中外历史对比年表",
      "page": 105,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1869,
     "yearEnd": null,
     "yearLabel": "1869",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "上海成立的发昌机器厂",
     "desc": "1869年，上海成立的发昌机器厂，是当时上海民族机器工业企业中规模最大的一家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 105,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1865,
     "yearEnd": null,
     "yearLabel": "1865",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "罗伯特·李将军率领的南方叛军主力向北军投降",
     "desc": "1865年4月9日，罗伯特·李将军率领的南方叛军主力向北军投降，美国内战以北方胜利而结束，美国重新恢复统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 103,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1865,
     "yearEnd": null,
     "yearLabel": "1865",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国总统林肯遇刺身亡",
     "desc": "1865年4月14日，美国总统林肯遇刺身亡，副总统约翰逊继任。",
     "src": {
      "book": "中外历史对比年表",
      "page": 103,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1866,
     "yearEnd": null,
     "yearLabel": "1866",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲",
      "美洲"
     ],
     "title": "普鲁士对奥地利发动战争",
     "desc": "1866年6月，普鲁士对奥地利发动战争，在萨多瓦战役中获胜，奥地利同意解散德意志邦联，以普鲁士为首的“北德意志联邦”成立，德国统一初步完成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 104,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1866,
     "yearEnd": null,
     "yearLabel": "1866",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国工程师西门子制成发电机",
     "desc": "1866年，德国工程师西门子制成发电机。",
     "src": {
      "book": "中外历史对比年表",
      "page": 104,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1867,
     "yearEnd": null,
     "yearLabel": "1867",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "俄国",
      "美洲"
     ],
     "title": "美国从俄国手中购得阿拉斯加",
     "desc": "1867年，美国从俄国手中购得阿拉斯加。",
     "src": {
      "book": "中外历史对比年表",
      "page": 104,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1867,
     "yearEnd": null,
     "yearLabel": "1867",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国国会通过《重建南方方案》",
     "desc": "1867年，美国国会通过《重建南方方案》，从而开始了民主重建南方的时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 104,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1867,
     "yearEnd": null,
     "yearLabel": "1867",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "奥匈二元帝国成立",
     "desc": "1867年，奥匈二元帝国成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 104,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1867,
     "yearEnd": null,
     "yearLabel": "1867",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国第二次议会改革方案通过",
     "desc": "1867年8月，英国第二次议会改革方案通过，选举权扩大到小资产阶级和上层工人，资产阶级在下议院的地位进一步加强。",
     "src": {
      "book": "中外历史对比年表",
      "page": 104,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1867,
     "yearEnd": null,
     "yearLabel": "1867",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "北欧",
     "countries": [
      "北欧"
     ],
     "title": "瑞典化学家诺贝尔发明硝酸甘油炸药",
     "desc": "1867年，瑞典化学家诺贝尔发明硝酸甘油炸药。",
     "src": {
      "book": "中外历史对比年表",
      "page": 104,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1868,
     "yearEnd": null,
     "yearLabel": "1868",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本倒幕派发动政变",
     "desc": "1868年1月3日，日本倒幕派发动政变，以天皇名义发布“王政复古”诏书，宣布废除幕府将军制，将政权归还天皇。",
     "src": {
      "book": "中外历史对比年表",
      "page": 104,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1868,
     "yearEnd": null,
     "yearLabel": "1868",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "西班牙发生革命",
     "desc": "1868年9月，西班牙发生革命，推翻君主统治，建立共和国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 105,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1868,
     "yearEnd": null,
     "yearLabel": "1868",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本朝廷改元",
     "desc": "1868年10月23日，日本朝廷改元，年号明治，此后的一系列改革史称“明治维新”，日本由一个封建国家变成了资产阶级国家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 105,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1869,
     "yearEnd": null,
     "yearLabel": "1869",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本幕府残余势力被最终歼灭",
     "desc": "1869年，日本幕府残余势力被最终歼灭，政府军获得全面胜利，这场战争史称“戊辰战争”，德川幕府统治被推翻。",
     "src": {
      "book": "中外历史对比年表",
      "page": 105,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1869,
     "yearEnd": null,
     "yearLabel": "1869",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "非洲",
     "countries": [
      "非洲"
     ],
     "title": "苏伊士运河正式通航",
     "desc": "1869年，苏伊士运河正式通航。",
     "src": {
      "book": "中外历史对比年表",
      "page": 105,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1869,
     "yearEnd": null,
     "yearLabel": "1869",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "俄国化学家门捷列夫发现了化学元素周期律",
     "desc": "1869年，俄国化学家门捷列夫发现了化学元素周期律，奠定了无机化学的基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 105,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1865,
     "yearEnd": null,
     "yearLabel": "1865",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英国"
     ],
     "title": "机器大生产成为法国工业生产的主要形式",
     "desc": "19世纪60年代末，机器大生产成为法国工业生产的主要形式，法国工业革命基本完成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 105,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b123",
   "year": 1870,
   "yearLabel": "1870",
   "pages": [
    105,
    106,
    107
   ],
   "china": [
    {
     "year": 1870,
     "yearEnd": null,
     "yearLabel": "1870",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府为选派学生出国留学",
     "desc": "1870年，清政府为选派学生出国留学，制定《挑选幼童前赴泰西肄业章程》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 105,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1870,
     "yearEnd": null,
     "yearLabel": "1870",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "天津居民抗议法国教堂迷拐幼童等罪行",
     "desc": "1870年，天津居民抗议法国教堂迷拐幼童等罪行，法国领事丰大业开枪杀人，群众打死丰大业及多名教士，烧毁教堂，这就是震惊中外的“天津教案”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 106,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1870,
     "yearEnd": null,
     "yearLabel": "1870",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国官员第一次出使西方",
     "desc": "1870年，中国官员第一次出使西方，是在法国威逼下为“天津教案”赴法“致歉”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 106,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1870,
     "yearEnd": null,
     "yearLabel": "1870",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷裁撤三口通商大臣",
     "desc": "1870年，清廷裁撤三口通商大臣，改设北洋通商大臣。",
     "src": {
      "book": "中外历史对比年表",
      "page": 106,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1871,
     "yearEnd": null,
     "yearLabel": "1871",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中日议定《修好条规》和《通商章程》",
     "desc": "1871年，中日议定《修好条规》和《通商章程》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 106,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1871,
     "yearEnd": null,
     "yearLabel": "1871",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "沙俄侵略者借口安定边境秩序",
     "desc": "1871年，沙俄侵略者借口安定边境秩序，大举进犯伊犁，攻占伊犁九城及附近地区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 106,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1872,
     "yearEnd": null,
     "yearLabel": "1872",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "在上海成立的轮船招商局",
     "desc": "1872年，在上海成立的轮船招商局，是中国由官办转向官督商办的第一个企业，也是规模最大的民用企业。",
     "src": {
      "book": "中外历史对比年表",
      "page": 107,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1872,
     "yearEnd": 1875,
     "yearLabel": "1872",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国派出最早的四批幼童赴美留学",
     "desc": "1872—1875年，中国派出最早的四批幼童赴美留学，其中包括著名的铁路工程师詹天佑。",
     "src": {
      "book": "中外历史对比年表",
      "page": 107,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1872,
     "yearEnd": 1876,
     "yearLabel": "1872",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国人自己创办了近代最早的一批报刊",
     "desc": "1872—1876年，中国人自己创办了近代最早的一批报刊。",
     "src": {
      "book": "中外历史对比年表",
      "page": 107,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1874,
     "yearEnd": null,
     "yearLabel": "1874",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日本派兵侵略中国台湾",
     "desc": "1874年，日本派兵侵略中国台湾，清政府以赔款妥协。",
     "src": {
      "book": "中外历史对比年表",
      "page": 107,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1870,
     "yearEnd": null,
     "yearLabel": "1870",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国向普鲁士宣战",
     "desc": "1870年7月19日，法国向普鲁士宣战，普法战争爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 105,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1870,
     "yearEnd": null,
     "yearLabel": "1870",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰"
     ],
     "title": "色当战役",
     "desc": "1870年9月1日，色当战役，法军惨败投降，拿破仑三世和麦克马洪元帅做了普鲁士军的俘虏。",
     "src": {
      "book": "中外历史对比年表",
      "page": 106,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1870,
     "yearEnd": null,
     "yearLabel": "1870",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "基督教会",
      "欧洲"
     ],
     "title": "罗马合并于意大利",
     "desc": "1870年9月，罗马合并于意大利。教皇被剥夺世俗权力，避居梵蒂冈。意大利统一最后完成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 106,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1870,
     "yearEnd": null,
     "yearLabel": "1870",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "比利时人格拉姆发明了电动机",
     "desc": "1870年，比利时人格拉姆发明了电动机，电力开始成为动力的新能源。",
     "src": {
      "book": "中外历史对比年表",
      "page": 106,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1870,
     "yearEnd": null,
     "yearLabel": "1870",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国实现成年男子普选制",
     "desc": "1870年，美国已实现成年男子（包括黑人在内）的普选制和平等代表制（各选区选进国会下院及州议会的代表与人口成正比例）。",
     "src": {
      "book": "中外历史对比年表",
      "page": 106,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1870,
     "yearEnd": null,
     "yearLabel": "1870",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国自由、保守两大党开始轮流执政",
     "desc": "1870年，英国自由、保守两大党开始轮流执政，两党制正式形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 106,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1871,
     "yearEnd": null,
     "yearLabel": "1871",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "法兰西",
      "欧洲"
     ],
     "title": "普鲁士国王威廉一世在法国凡尔赛宫",
     "desc": "1871年1月18日，普鲁士国王威廉一世在法国凡尔赛宫，正式即位为德意志帝国皇帝，德国实现最后统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 106,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1871,
     "yearEnd": null,
     "yearLabel": "1871",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "巴黎发生无产阶级革命",
     "desc": "1871年3月18日，巴黎发生无产阶级革命，取得世界历史上无产阶级革命的第一次胜利，建立了巴黎公社。",
     "src": {
      "book": "中外历史对比年表",
      "page": 106,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1871,
     "yearEnd": null,
     "yearLabel": "1871",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰克",
     "countries": [
      "法兰克",
      "法兰西"
     ],
     "title": "德法两国签订《法兰克福和约》",
     "desc": "1871年5月10日，德法两国签订《法兰克福和约》，法国割让阿尔萨斯和洛林，缴付50亿法郎赔款。",
     "src": {
      "book": "中外历史对比年表",
      "page": 107,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1871,
     "yearEnd": 1873,
     "yearLabel": "1871",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "欧洲",
      "日本",
      "美洲"
     ],
     "title": "日本派遣使节团前往美国和欧洲各国",
     "desc": "1871—1873年，日本派遣使节团前往美国和欧洲各国，与欧美各国谈判修改条约，并考察各国政治、经济、军事、文化教育等，作为日本建设的参考。",
     "src": {
      "book": "中外历史对比年表",
      "page": 107,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1872,
     "yearEnd": null,
     "yearLabel": "1872",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国议会通过《投票法案》",
     "desc": "1872年，英国议会通过《投票法案》，把过去口头表决的选举方式改为秘密投票，从而保护了选民的投票自由。",
     "src": {
      "book": "中外历史对比年表",
      "page": 107,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1872,
     "yearEnd": 1970,
     "yearLabel": "1872",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "罗素",
     "desc": "1872—1970年，罗素，英国哲学家，著有《西方哲学史》等。",
     "src": {
      "book": "中外历史对比年表",
      "page": 107,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1873,
     "yearEnd": null,
     "yearLabel": "1873",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "欧洲"
     ],
     "title": "德俄奥三国君主签订《兴勃隆协定》",
     "desc": "1873年10月，德俄奥三国君主签订《兴勃隆协定》，形成“三皇同盟”，法国在欧洲陷于孤立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 107,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b124",
   "year": 1875,
   "yearLabel": "1875",
   "pages": [
    107,
    108,
    109
   ],
   "china": [
    {
     "year": 1875,
     "yearEnd": null,
     "yearLabel": "1875",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "同治帝病死",
     "desc": "1875年，同治帝病死，慈禧太后立醇亲王奕譞的儿子载湉为皇帝，改元光绪。",
     "src": {
      "book": "中外历史对比年表",
      "page": 107,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1875,
     "yearEnd": null,
     "yearLabel": "1875",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府任命左宗棠为钦差大臣督办新疆军务",
     "desc": "1875年，清政府任命左宗棠为钦差大臣督办新疆军务。",
     "src": {
      "book": "中外历史对比年表",
      "page": 107,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1875,
     "yearEnd": null,
     "yearLabel": "1875",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "驻北京英使馆翻译马嘉理带领武装“勘探队”在云南擅自入境",
     "desc": "1875年，驻北京英使馆翻译马嘉理带领武装“勘探队”在云南擅自入境，受阻后与当地群众发生冲突，马嘉理被打死，此即所谓的“马嘉理事件”或“滇案”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 108,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1875,
     "yearEnd": null,
     "yearLabel": "1875",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府因“马嘉理案”任命驻英公使",
     "desc": "1875年，清政府因“马嘉理案”任命驻英公使，前往英国办理交涉，自此开始向国外派遣常驻使臣。",
     "src": {
      "book": "中外历史对比年表",
      "page": 108,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1876,
     "yearEnd": 1878,
     "yearLabel": "1876",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清军分三路进疆",
     "desc": "1876—1878年，清军分三路进疆，收复了除伊犁地区外的新疆全部领土。",
     "src": {
      "book": "中外历史对比年表",
      "page": 108,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1876,
     "yearEnd": null,
     "yearLabel": "1876",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国近代第一位驻外使节郭嵩焘赴英就任",
     "desc": "1876年，中国近代第一位驻外使节郭嵩焘赴英就任。",
     "src": {
      "book": "中外历史对比年表",
      "page": 108,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1876,
     "yearEnd": null,
     "yearLabel": "1876",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "左宗棠率领湘军入新疆",
     "desc": "1876年，左宗棠率领湘军入新疆，同年收复北疆。",
     "src": {
      "book": "中外历史对比年表",
      "page": 108,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1878,
     "yearEnd": null,
     "yearLabel": "1878",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "开平矿务局在唐山正式开办",
     "desc": "1878年，开平矿务局在唐山正式开办，李鸿章命唐廷枢任总办。",
     "src": {
      "book": "中外历史对比年表",
      "page": 109,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1878,
     "yearEnd": null,
     "yearLabel": "1878",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "轮船招商局会办朱其昂在天津设立贻来牟机器磨坊",
     "desc": "1878年，轮船招商局会办朱其昂在天津设立贻来牟机器磨坊，用机器生产面粉，打破了传统手工业磨面的旧式生产方式。",
     "src": {
      "book": "中外历史对比年表",
      "page": 109,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1879,
     "yearEnd": null,
     "yearLabel": "1879",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "琉球被日本侵占",
     "desc": "1879年，琉球被日本侵占，改为冲绳县。",
     "src": {
      "book": "中外历史对比年表",
      "page": 109,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1879,
     "yearEnd": null,
     "yearLabel": "1879",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "出使俄国的钦差大臣崇厚在沙俄胁迫下签订《交收伊犁条约》等条约",
     "desc": "1879年，出使俄国的钦差大臣崇厚在沙俄胁迫下签订《交收伊犁条约》等条约，清政府拒绝批准。",
     "src": {
      "book": "中外历史对比年表",
      "page": 109,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1875,
     "yearEnd": null,
     "yearLabel": "1875",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国冶金技师托马斯发明碱性转炉",
     "desc": "1875年，英国冶金技师托马斯发明碱性转炉，使用含磷矿石也可炼出优质钢。",
     "src": {
      "book": "中外历史对比年表",
      "page": 107,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1875,
     "yearEnd": null,
     "yearLabel": "1875",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国实现了成年男子的普选权",
     "desc": "1875年，法国实现了成年男子的普选权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 107,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1876,
     "yearEnd": null,
     "yearLabel": "1876",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "比利时国王利奥波德二世在布鲁塞尔召开国际地理会议",
     "desc": "1876年，比利时国王利奥波德二世在布鲁塞尔召开国际地理会议，成立“国际非洲协会”，宗旨是要打开非洲这块“地球上唯一文明尚未进入的地区”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 108,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1876,
     "yearEnd": null,
     "yearLabel": "1876",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本",
      "朝鲜半岛"
     ],
     "title": "日本海陆军开赴朝鲜",
     "desc": "1876年，日本海陆军开赴朝鲜，以武力胁迫朝鲜签订《江华条约》，开始向朝鲜全面渗透。",
     "src": {
      "book": "中外历史对比年表",
      "page": 108,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1876,
     "yearEnd": null,
     "yearLabel": "1876",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国人奥托制造出一台以煤气为燃料的四冲程内燃机",
     "desc": "1876年，德国人奥托制造出一台以煤气为燃料的四冲程内燃机，成为小型动力机。",
     "src": {
      "book": "中外历史对比年表",
      "page": 108,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1876,
     "yearEnd": 1948,
     "yearLabel": "1876",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "阿拉伯",
      "印度"
     ],
     "title": "穆罕默德·阿里·真纳",
     "desc": "1876—1948年，穆罕默德·阿里·真纳，印度穆斯林联盟主席，领导建立了巴基斯坦国家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 108,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1877,
     "yearEnd": null,
     "yearLabel": "1877",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国宣布将联邦军队撤出南部各州",
     "desc": "1877年2月，美国宣布将联邦军队撤出南部各州，南方重建结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 109,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1878,
     "yearEnd": null,
     "yearLabel": "1878",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "德意志",
      "欧洲"
     ],
     "title": "柏林会议签署《柏林条约》",
     "desc": "1878年6—7月，欧洲各大国参加柏林会议，签署《柏林条约》。英俄奥三大国在土耳其重新划分势力范围，形成新的均势，近东危机暂时缓解。",
     "src": {
      "book": "中外历史对比年表",
      "page": 109,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1879,
     "yearEnd": null,
     "yearLabel": "1879",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德奥两国缔结《德奥同盟条约》",
     "desc": "1879年10月，德奥两国缔结《德奥同盟条约》，具有鲜明的反俄性质。",
     "src": {
      "book": "中外历史对比年表",
      "page": 109,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1879,
     "yearEnd": null,
     "yearLabel": "1879",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "洛克菲勒的美孚石油公司成立",
     "desc": "1879年，洛克菲勒的美孚石油公司成立，它是美国出现的第一个托拉斯。",
     "src": {
      "book": "中外历史对比年表",
      "page": 109,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1879,
     "yearEnd": 1955,
     "yearLabel": "1879",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "爱因斯坦",
     "desc": "1879—1955年，爱因斯坦，德国物理学家，提出“相对论”，后据此理论发明了原子弹。",
     "src": {
      "book": "中外历史对比年表",
      "page": 109,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1875,
     "yearEnd": null,
     "yearLabel": "1875",
     "yearKind": "anchor",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "英国",
      "美洲"
     ],
     "title": "美国工业革命在全国范围内宣告完成",
     "desc": "19世纪70年代末，美国工业革命在全国范围内宣告完成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 109,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1875,
     "yearEnd": null,
     "yearLabel": "1875",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "英国"
     ],
     "title": "德国工业革命宣告完成",
     "desc": "19世纪70年代末，德国工业革命宣告完成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 109,
      "row": 9,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b125",
   "year": 1880,
   "yearLabel": "1880",
   "pages": [
    109,
    110
   ],
   "china": [
    {
     "year": 1880,
     "yearEnd": null,
     "yearLabel": "1880",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府在天津设立电报总局",
     "desc": "1880年，清政府在天津设立电报总局，李鸿章命盛宣怀为总办，同时在大沽口、上海、苏州等多地设立分局。",
     "src": {
      "book": "中外历史对比年表",
      "page": 109,
      "row": 10,
      "col": "中国"
     }
    },
    {
     "year": 1881,
     "yearEnd": null,
     "yearLabel": "1881",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中俄双方签订《伊犁条约》",
     "desc": "1881年，中俄双方签订《伊犁条约》，中国在界务和商务方面争回了一部分主权，但据此规定而签订的几个中俄边界议定书，沙俄割占了中国7万多平方公里的土地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 110,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1880,
     "yearEnd": null,
     "yearLabel": "1880",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国议会颁布法令",
     "desc": "1880年，英国议会颁布法令，正式规定初等教育为义务教育。",
     "src": {
      "book": "中外历史对比年表",
      "page": 109,
      "row": 10,
      "col": "外国"
     }
    },
    {
     "year": 1880,
     "yearEnd": 1938,
     "yearLabel": "1880",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼"
     ],
     "title": "凯末尔",
     "desc": "1880—1938年，凯末尔，土耳其资产阶级革命的领导者，土耳其共和国的缔造者。",
     "src": {
      "book": "中外历史对比年表",
      "page": 110,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1881,
     "yearEnd": 1890,
     "yearLabel": "1881",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "非洲"
     ],
     "title": "苏丹爆发反对英国殖民侵略的马赫迪起义",
     "desc": "1881—1890年，苏丹爆发反对英国殖民侵略的马赫迪起义，使英国对苏丹的侵占被推迟20年。",
     "src": {
      "book": "中外历史对比年表",
      "page": 110,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b126",
   "year": 1882,
   "yearLabel": "1882",
   "pages": [
    110,
    111
   ],
   "china": [
    {
     "year": 1882,
     "yearEnd": null,
     "yearLabel": "1882",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "徐鸿复、徐润等在上海设立同文书局",
     "desc": "1882年，徐鸿复、徐润等在上海设立同文书局。",
     "src": {
      "book": "中外历史对比年表",
      "page": 110,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1882,
     "yearEnd": null,
     "yearLabel": "1882",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "上海《申报》记者通过天津—上海间有线电报电路拍发新闻专电",
     "desc": "1882年，上海《申报》记者通过天津—上海间有线电报电路拍发新闻专电。这是中国第一则新闻电讯稿。",
     "src": {
      "book": "中外历史对比年表",
      "page": 110,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1883,
     "yearEnd": null,
     "yearLabel": "1883",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "上海自来水公司成立",
     "desc": "1883年，上海自来水公司成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 110,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1883,
     "yearEnd": null,
     "yearLabel": "1883",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "上海爆发金融危机",
     "desc": "1883年，上海爆发金融危机，影响到整个中国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 110,
      "row": 9,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1882,
     "yearEnd": null,
     "yearLabel": "1882",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国学者德普勒发现了远距离送电的方法",
     "desc": "1882年，法国学者德普勒发现了远距离送电的方法。",
     "src": {
      "book": "中外历史对比年表",
      "page": 110,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1882,
     "yearEnd": null,
     "yearLabel": "1882",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国发明家爱迪生在纽约创建了美国第一个火力发电站",
     "desc": "1882年，美国发明家爱迪生在纽约创建了美国第一个火力发电站，把输电线联结成网络。",
     "src": {
      "book": "中外历史对比年表",
      "page": 110,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1882,
     "yearEnd": null,
     "yearLabel": "1882",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国《教育法》规定",
     "desc": "1882年，法国《教育法》规定，初等教育为免费的义务教育。",
     "src": {
      "book": "中外历史对比年表",
      "page": 110,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1882,
     "yearEnd": null,
     "yearLabel": "1882",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "意大利同德奥签订针对法俄的《三国同盟条约》",
     "desc": "1882年5月，意大利同德奥签订针对法俄的《三国同盟条约》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 110,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1883,
     "yearEnd": null,
     "yearLabel": "1883",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "越南"
     ],
     "title": "法国扩大侵越战争",
     "desc": "1883年，法国扩大侵越战争，逼迫越南签订《顺化条约》，取得了对越南的“保护权”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 110,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1883,
     "yearEnd": null,
     "yearLabel": "1883",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "欧洲"
     ],
     "title": "普列汉诺夫在日内瓦创建了俄国第一个马克思主义团体——劳动解放社",
     "desc": "1883年，普列汉诺夫在日内瓦创建了俄国第一个马克思主义团体——劳动解放社。",
     "src": {
      "book": "中外历史对比年表",
      "page": 110,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1883,
     "yearEnd": null,
     "yearLabel": "1883",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国工程师戴姆制成以汽油为燃料的内燃机",
     "desc": "1883年，德国工程师戴姆制成以汽油为燃料的内燃机，可充作交通工具的发动机。",
     "src": {
      "book": "中外历史对比年表",
      "page": 111,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1883,
     "yearEnd": null,
     "yearLabel": "1883",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国政府颁布《文官制度条例》即《彭德尔顿法》",
     "desc": "1883年，美国政府颁布《文官制度条例》即《彭德尔顿法》，对文官制度进行改革，实行公开竞争考试办法，提高了行政管理效率。",
     "src": {
      "book": "中外历史对比年表",
      "page": 111,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1883,
     "yearEnd": 1907,
     "yearLabel": "1883",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "英格兰"
     ],
     "title": "埃及处于英军占领之下",
     "desc": "1883—1907年，埃及处于英军占领之下，事实上成为英国的殖民地，由英国驻埃及总领事巴林实行统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 111,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1883,
     "yearEnd": 1946,
     "yearLabel": "1883",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "凯恩斯",
     "desc": "1883—1946年，凯恩斯，英国经济学家，开创了现代宏观经济学，主张国家干预调节经济生活。",
     "src": {
      "book": "中外历史对比年表",
      "page": 111,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b127",
   "year": 1884,
   "yearLabel": "1884",
   "pages": [
    111
   ],
   "china": [
    {
     "year": 1884,
     "yearEnd": null,
     "yearLabel": "1884",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府收回伊犁后",
     "desc": "1884年，清政府收回伊犁后，在新疆建立行省，设置州县。",
     "src": {
      "book": "中外历史对比年表",
      "page": 111,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1884,
     "yearEnd": 1885,
     "yearLabel": "1884",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中法战争爆发",
     "desc": "1884—1885年，中法战争爆发，清政府不战而败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 111,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1884,
     "yearEnd": null,
     "yearLabel": "1884",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "马尾海战",
     "desc": "1884年8月，马尾海战，法国侵略军在福建马尾军港发动进攻，福建水师仓促应战，全军覆灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 111,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1884,
     "yearEnd": null,
     "yearLabel": "1884",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "越南"
     ],
     "title": "法国迫使越南签订《巴德诺条约》",
     "desc": "1884年6月，法国迫使越南签订《巴德诺条约》，最后确立了在越南的殖民统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 111,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1884,
     "yearEnd": null,
     "yearLabel": "1884",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国议会通过《人民代表法案》",
     "desc": "1884年，英国议会通过《人民代表法案》，把选举权扩大到农业工人，距离成年男子的普选制已经不远了。",
     "src": {
      "book": "中外历史对比年表",
      "page": 111,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b128",
   "year": 1885,
   "yearLabel": "1885",
   "pages": [
    112,
    113
   ],
   "china": [
    {
     "year": 1885,
     "yearEnd": null,
     "yearLabel": "1885",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "镇南关大捷",
     "desc": "1885年3月，镇南关大捷，老将帮办广西军务冯子材指挥清军大败法军，扭转了整个中法战局。",
     "src": {
      "book": "中外历史对比年表",
      "page": 112,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1885,
     "yearEnd": null,
     "yearLabel": "1885",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日本迫使清政府签订《中日天津会议专条》",
     "desc": "1885年4月，日本迫使清政府签订《中日天津会议专条》，规定朝鲜今后若发生重大变乱事件，两国或一国需要出兵，须事先相互知照，这样，朝鲜被置于中日两国的共同保护之下。",
     "src": {
      "book": "中外历史对比年表",
      "page": 112,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1885,
     "yearEnd": null,
     "yearLabel": "1885",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府与法国签订《中法新约》",
     "desc": "1885年6月，清政府与法国签订《中法新约》，法国势力侵入云南、广西，中国西南边疆的危机进一步加深。",
     "src": {
      "book": "中外历史对比年表",
      "page": 112,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1885,
     "yearEnd": null,
     "yearLabel": "1885",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府建台湾为行省",
     "desc": "1885年10月，清政府建台湾为行省，刘铭传为第一任巡抚，在彰化境内设省城。",
     "src": {
      "book": "中外历史对比年表",
      "page": 112,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1885,
     "yearEnd": null,
     "yearLabel": "1885",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府为了统一海军的指挥权",
     "desc": "1885年，清政府为了统一海军的指挥权，在北京成立海军衙门，奕譞为总理海军事务大臣，奕劻、李鸿章为会办大臣。",
     "src": {
      "book": "中外历史对比年表",
      "page": 112,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1888,
     "yearEnd": null,
     "yearLabel": "1888",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "康有为第一次向光绪帝上书（未能传到皇帝手中）",
     "desc": "1888年，康有为第一次向光绪帝上书（未能传到皇帝手中），陈述变法图强的必要性和紧迫性，并开始了倡导维新变法的政治活动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 112,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1889,
     "yearEnd": 1895,
     "yearLabel": "1889",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "康有为撰写了《新学伪经考》和《孔子改制考》",
     "desc": "1889—1895年，康有为撰写了《新学伪经考》和《孔子改制考》，这两部书是维新变法的重要理论依据。",
     "src": {
      "book": "中外历史对比年表",
      "page": 113,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1885,
     "yearEnd": null,
     "yearLabel": "1885",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国议会通过《重新分配席位法案》",
     "desc": "1885年，英国议会通过《重新分配席位法案》，根据人口的多寡分配选区的议席，从而接近更公平的平等代表制原则。",
     "src": {
      "book": "中外历史对比年表",
      "page": 112,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1885,
     "yearEnd": null,
     "yearLabel": "1885",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "印度国民大会党（简称“国大党”）在孟买举行成立大会",
     "desc": "1885年12月，印度国民大会党（简称“国大党”）在孟买举行成立大会，主要议题是要求民族主权和自治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 112,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1885,
     "yearEnd": 1962,
     "yearLabel": "1885",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "北欧",
     "countries": [
      "北欧"
     ],
     "title": "玻尔",
     "desc": "1885—1962年，玻尔，丹麦物理学家，创立原子结构理论，大大加速了量子力学的建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 112,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1886,
     "yearEnd": null,
     "yearLabel": "1886",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国的戴姆勒和本茨首先制成汽油机汽车",
     "desc": "1886年，德国的戴姆勒和本茨首先制成汽油机汽车。",
     "src": {
      "book": "中外历史对比年表",
      "page": 112,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1888,
     "yearEnd": null,
     "yearLabel": "1888",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "巴西摄政公主签署了无条件废除奴隶制的法令",
     "desc": "1888年5月13日，巴西摄政公主签署了无条件废除奴隶制的法令，这宣告世界性奴隶贸易和奴隶制的彻底灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 112,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1889,
     "yearEnd": null,
     "yearLabel": "1889",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国提出“双强标准”",
     "desc": "1889年，英国提出“双强标准”，即英国海军力量不能低于其他两个强国的海军力量之和。",
     "src": {
      "book": "中外历史对比年表",
      "page": 113,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1889,
     "yearEnd": 1964,
     "yearLabel": "1889",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "尼赫鲁",
     "desc": "1889—1964年，尼赫鲁，印度国大党主席，印度民族独立运动领导人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 113,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1889,
     "yearEnd": null,
     "yearLabel": "1889",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本明治天皇颁布“御赐”的《大日本帝国宪法》",
     "desc": "1889年2月，日本明治天皇颁布“御赐”的《大日本帝国宪法》，依照“三权分立”原则确立了日本资产阶级君主立宪制。这也是近代亚洲第一部宪法。",
     "src": {
      "book": "中外历史对比年表",
      "page": 113,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1889,
     "yearEnd": null,
     "yearLabel": "1889",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "恩格斯组织建立了“第二国际”",
     "desc": "1889年，恩格斯组织建立了“第二国际”，使国际工人运动进入一个新阶段。",
     "src": {
      "book": "中外历史对比年表",
      "page": 113,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1885,
     "yearEnd": null,
     "yearLabel": "1885",
     "yearKind": "anchor",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "英国"
     ],
     "title": "俄国工业革命基本完成",
     "desc": "19世纪80年代末，俄国工业革命基本完成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 113,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b129",
   "year": 1890,
   "yearLabel": "1890",
   "pages": [
    113,
    114
   ],
   "china": [
    {
     "year": 1890,
     "yearEnd": null,
     "yearLabel": "1890",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府与英国签订《藏印条约》《藏印续约》",
     "desc": "1890、1893年，清政府与英国先后签订《藏印条约》和《藏印续约》，英国侵略势力进入西藏。",
     "src": {
      "book": "中外历史对比年表",
      "page": 113,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1891,
     "yearEnd": 1893,
     "yearLabel": "1891",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "湖广总督张之洞在汉阳创办湖北枪炮厂",
     "desc": "1891—1893年，湖广总督张之洞在汉阳创办湖北枪炮厂。",
     "src": {
      "book": "中外历史对比年表",
      "page": 113,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1891,
     "yearEnd": null,
     "yearLabel": "1891",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "广东水师、南洋水师和北洋水师齐聚旅顺会操",
     "desc": "1891年，广东水师、南洋水师和北洋水师齐聚旅顺会操，清政府海军初具规模，其中，北洋水师是清政府的海军主力，以旅顺和威海卫为主要基地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 113,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1894,
     "yearEnd": null,
     "yearLabel": "1894",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "光绪帝发布对日宣战上谕",
     "desc": "1894年8月，光绪帝发布对日宣战上谕，中日甲午战争爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 114,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1894,
     "yearEnd": null,
     "yearLabel": "1894",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "平壤战役",
     "desc": "1894年9月，平壤战役，日军进攻朝鲜平壤，清军统帅叶志超放弃职守，撤军溃逃，清军战败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 114,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1894,
     "yearEnd": null,
     "yearLabel": "1894",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "黄海之战",
     "desc": "1894年9月，黄海之战，北洋海军击退了进犯的日本舰队，五舰沉没。",
     "src": {
      "book": "中外历史对比年表",
      "page": 114,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1891,
     "yearEnd": 1894,
     "yearLabel": "1891",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "法俄签订了一系列针对德奥意的协定",
     "desc": "1891—1894年，法俄签订了一系列针对德奥意的协定，形成法俄同盟。",
     "src": {
      "book": "中外历史对比年表",
      "page": 113,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1892,
     "yearEnd": null,
     "yearLabel": "1892",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国工程师狄塞尔发明了结构更简单、燃料更便宜的柴油机",
     "desc": "1892年，德国工程师狄塞尔发明了结构更简单、燃料更便宜的柴油机，适用于重型运输工具。",
     "src": {
      "book": "中外历史对比年表",
      "page": 113,
      "row": 10,
      "col": "外国"
     }
    },
    {
     "year": 1892,
     "yearEnd": null,
     "yearLabel": "1892",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "法俄签订军事协定",
     "desc": "1892年，法俄签订军事协定，结成同盟。这意味着欧洲国际关系中出现与德奥意对峙的法俄军事集团。",
     "src": {
      "book": "中外历史对比年表",
      "page": 114,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1893,
     "yearEnd": 1914,
     "yearLabel": "1893",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "非洲"
     ],
     "title": "圣雄甘地在南非的印度侨民中",
     "desc": "1893—1914年，圣雄甘地在南非的印度侨民中，多次运用非暴力反抗方式，进行颇有成效的反种族歧视活动，形成甘地主义理论。",
     "src": {
      "book": "中外历史对比年表",
      "page": 114,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1894,
     "yearEnd": null,
     "yearLabel": "1894",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国工业生产跃居世界首位",
     "desc": "1894年，美国工业生产跃居世界首位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 114,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1894,
     "yearEnd": null,
     "yearLabel": "1894",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼"
     ],
     "title": "奥斯曼帝国青年土耳其党（即奥斯曼统一与进步协会）成立",
     "desc": "1894年，奥斯曼帝国青年土耳其党（即奥斯曼统一与进步协会）成立，其纲领是反对素丹专制制度；维护帝国领土完整。",
     "src": {
      "book": "中外历史对比年表",
      "page": 114,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1894,
     "yearEnd": 1896,
     "yearLabel": "1894",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲",
      "非洲"
     ],
     "title": "埃塞俄比亚反抗意大利侵略取得胜利",
     "desc": "1894—1896年，埃塞俄比亚反抗意大利侵略取得胜利，迫使意大利签订《亚的斯亚贝巴和约》，承认埃塞俄比亚是独立国家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 114,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b130",
   "year": 1895,
   "yearLabel": "1895",
   "pages": [
    114,
    115,
    116
   ],
   "china": [
    {
     "year": 1895,
     "yearEnd": null,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "困守威海卫的北洋舰队在日本海陆两军的夹击之下",
     "desc": "1895年1月，困守威海卫的北洋舰队在日本海陆两军的夹击之下，全军覆没。",
     "src": {
      "book": "中外历史对比年表",
      "page": 114,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1895,
     "yearEnd": null,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙中山在香港成立兴中会总部",
     "desc": "1895年春，孙中山在香港成立兴中会总部，提出“驱除鞑虏，恢复中华，创立合众政府”的革命纲领，决心推翻清政府，建立资产阶级政权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 114,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1895,
     "yearEnd": null,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李鸿章与日本代表签订了丧权辱国的《马关条约》",
     "desc": "1895年4月，李鸿章与日本代表签订了丧权辱国的《马关条约》，进一步加深了中国半殖民地化的程度。",
     "src": {
      "book": "中外历史对比年表",
      "page": 115,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1895,
     "yearEnd": null,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "《马关条约》签字后",
     "desc": "1895年4月，《马关条约》签字后，俄法德三国驻日公使分别照会日本政府，要求其退出辽东半岛，日本被迫接受三国要求，但向中国索要3000万两“赎辽费”，此即“三国干涉还辽”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 115,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1895,
     "yearEnd": null,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "康有为发动1300多名举人联名上书清廷",
     "desc": "1895年5月，康有为发动1300多名举人联名上书清廷，提出“拒和、迁都、变法”的主张，这就是中国近代史上有名的“公车上书”，康有为从此确立了维新变法运动领袖的地位，也拉开了戊戌变法的序幕。",
     "src": {
      "book": "中外历史对比年表",
      "page": 115,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1895,
     "yearEnd": null,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "康有为在北京创办《万国公报》",
     "desc": "1895年8月，康有为在北京创办《万国公报》，由梁启超等人撰稿，宣传西学，鼓吹变法。",
     "src": {
      "book": "中外历史对比年表",
      "page": 115,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1895,
     "yearEnd": 1899,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "法国先后把滇、桂、粤三省变成了自己的势力范围",
     "desc": "1895—1899年，法国先后把滇、桂、粤三省变成了自己的势力范围。",
     "src": {
      "book": "中外历史对比年表",
      "page": 115,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1895,
     "yearEnd": null,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "在康有为、梁启超等倡导下",
     "desc": "1895年11月，在康有为、梁启超等倡导下，由文廷式出面组织强学会，宣讲“中国自强之学”，吸纳了一批维新派人士和帝党官僚。",
     "src": {
      "book": "中外历史对比年表",
      "page": 116,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1895,
     "yearEnd": null,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "欧洲"
     ],
     "title": "列宁把彼得堡的20多个马克思主义小组统一为工人阶级解放斗争协会",
     "desc": "1895年秋，列宁把彼得堡的20多个马克思主义小组统一为工人阶级解放斗争协会，领导首都工人进行罢工斗争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 115,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1895,
     "yearEnd": null,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国物理学家伦琴发现了X射线",
     "desc": "1895年，德国物理学家伦琴发现了X射线。",
     "src": {
      "book": "中外历史对比年表",
      "page": 115,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1895,
     "yearEnd": 1897,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "美洲"
     ],
     "title": "英属圭亚那与委内瑞拉发生边界纠纷",
     "desc": "1895—1897年，英属圭亚那与委内瑞拉发生边界纠纷，英国被迫同意接受美国人的仲裁，美国开始逐步取代英国在拉美的优势地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 116,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1895,
     "yearEnd": null,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国连接北海与波罗的海的基尔运河建成",
     "desc": "1895年，德国连接北海与波罗的海的基尔运河建成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 116,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1895,
     "yearEnd": null,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "意大利人马可尼发明无线电",
     "desc": "1895年，意大利人马可尼发明无线电。",
     "src": {
      "book": "中外历史对比年表",
      "page": 116,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1895,
     "yearEnd": null,
     "yearLabel": "1895",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国工程师狄塞尔发明柴油引擎",
     "desc": "1895年，德国工程师狄塞尔发明柴油引擎。",
     "src": {
      "book": "中外历史对比年表",
      "page": 116,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b131",
   "year": 1896,
   "yearLabel": "1896",
   "pages": [
    116,
    117
   ],
   "china": [
    {
     "year": 1896,
     "yearEnd": null,
     "yearLabel": "1896",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "法国同清政府签订合同",
     "desc": "1896年，法国同清政府签订合同，由法国公司修建并经营从越南到广西龙州的铁路，从此开了外国侵占中国铁路线的恶劣先例。",
     "src": {
      "book": "中外历史对比年表",
      "page": 116,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1896,
     "yearEnd": null,
     "yearLabel": "1896",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李鸿章与俄外交大臣签订《中俄密约》",
     "desc": "1896年，李鸿章与俄外交大臣签订《中俄密约》，在“共同防日”的名义下，俄通过修筑中东铁路把势力伸入中国东北地区，加强了对中国的控制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 116,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1896,
     "yearEnd": null,
     "yearLabel": "1896",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张之洞亲信幕僚汪康年在上海创办《时务报》（梁启超为主笔）",
     "desc": "1896年，张之洞亲信幕僚汪康年在上海创办《时务报》（梁启超为主笔），对维新运动的开展起了很大的推动作用。",
     "src": {
      "book": "中外历史对比年表",
      "page": 116,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1896,
     "yearEnd": null,
     "yearLabel": "1896",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府派遣了第一批赴日留学生",
     "desc": "1896年，清政府派遣了第一批赴日留学生，此后，赴日留学日渐成风，造就了一批新型知识分子。",
     "src": {
      "book": "中外历史对比年表",
      "page": 117,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1896,
     "yearEnd": null,
     "yearLabel": "1896",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英法共同承认暹罗独立",
     "desc": "1896年，英法共同承认暹罗独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 116,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1896,
     "yearEnd": null,
     "yearLabel": "1896",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲",
      "非洲"
     ],
     "title": "意大利战败求和",
     "desc": "1896年，意大利战败求和，与埃塞俄比亚签订和约，承认埃独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 116,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1896,
     "yearEnd": null,
     "yearLabel": "1896",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "英格兰"
     ],
     "title": "英法签订关于湄南河流域的协定",
     "desc": "1896年，英法签订关于湄南河流域的协定，以解决双方在印度支那半岛的争端。",
     "src": {
      "book": "中外历史对比年表",
      "page": 116,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b132",
   "year": 1897,
   "yearLabel": "1897",
   "pages": [
    117
   ],
   "china": [
    {
     "year": 1897,
     "yearEnd": null,
     "yearLabel": "1897",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "湖南巡抚陈宝箴创办时务学堂",
     "desc": "1897年，湖南巡抚陈宝箴创办时务学堂，培养维新人才。",
     "src": {
      "book": "中外历史对比年表",
      "page": 117,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1897,
     "yearEnd": null,
     "yearLabel": "1897",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "严复在天津创办《国闻报》",
     "desc": "1897年，严复在天津创办《国闻报》，并介绍了《天演论》等西方资产阶级的理论名著，影响深远。",
     "src": {
      "book": "中外历史对比年表",
      "page": 117,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1897,
     "yearEnd": null,
     "yearLabel": "1897",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "商务印书馆创建",
     "desc": "1897年，商务印书馆创建。",
     "src": {
      "book": "中外历史对比年表",
      "page": 117,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1897,
     "yearEnd": null,
     "yearLabel": "1897",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "德国强占中国胶州湾",
     "desc": "1897年，德国强占中国胶州湾。",
     "src": {
      "book": "中外历史对比年表",
      "page": 117,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1897,
     "yearEnd": null,
     "yearLabel": "1897",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "义和团运动开始在山东各地兴起",
     "desc": "1897年，义和团运动开始在山东各地兴起，先后提出“助清灭洋”、“兴清灭洋”等口号。",
     "src": {
      "book": "中外历史对比年表",
      "page": 117,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1897,
     "yearEnd": null,
     "yearLabel": "1897",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国物理学家汤姆生发现了电子",
     "desc": "1897年，英国物理学家汤姆生发现了电子。",
     "src": {
      "book": "中外历史对比年表",
      "page": 117,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1897,
     "yearEnd": null,
     "yearLabel": "1897",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "英格兰",
      "东南亚"
     ],
     "title": "英国在缅甸设立副总督统治",
     "desc": "1897年，英国在缅甸设立副总督统治，隶属印度政府。",
     "src": {
      "book": "中外历史对比年表",
      "page": 117,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b133",
   "year": 1898,
   "yearLabel": "1898",
   "pages": [
    117,
    118
   ],
   "china": [
    {
     "year": 1898,
     "yearEnd": null,
     "yearLabel": "1898",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "德国强迫清政府订立《胶澳租借条约》",
     "desc": "1898年，德国强迫清政府订立《胶澳租借条约》，强占胶州湾，把山东省变成了它的势力范围。",
     "src": {
      "book": "中外历史对比年表",
      "page": 117,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1898,
     "yearEnd": null,
     "yearLabel": "1898",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "俄国与清政府签订《旅大租地条约》及《续订旅大租地条约》",
     "desc": "1898年，俄国与清政府签订《旅大租地条约》及《续订旅大租地条约》，东北全境成为俄国的势力范围。",
     "src": {
      "book": "中外历史对比年表",
      "page": 117,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1898,
     "yearEnd": null,
     "yearLabel": "1898",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英国逼迫清政府签订《展拓香港界址专条》",
     "desc": "1898年，英国逼迫清政府签订《展拓香港界址专条》，强租深圳河以南、九龙半岛界限街以北及附近岛屿的中国领土，即所谓“新界”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 118,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1898,
     "yearEnd": null,
     "yearLabel": "1898",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "福建被日本变成了该国的势力范围",
     "desc": "1898年，福建被日本变成了该国的势力范围。",
     "src": {
      "book": "中外历史对比年表",
      "page": 118,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1898,
     "yearEnd": null,
     "yearLabel": "1898",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "俄国以租借为名攫取中国辽东半岛",
     "desc": "1898年，俄国以租借为名攫取中国辽东半岛。",
     "src": {
      "book": "中外历史对比年表",
      "page": 118,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1898,
     "yearEnd": null,
     "yearLabel": "1898",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "谭嗣同等在长沙创立南学会",
     "desc": "1898年，谭嗣同等在长沙创立南学会，定期举行演讲会，宣传资产阶级社会政治学说以及变法维新、救亡图存的政治主张，积极参与推行新政。",
     "src": {
      "book": "中外历史对比年表",
      "page": 118,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1898,
     "yearEnd": null,
     "yearLabel": "1898",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "光绪帝颁布“明定国是”诏书，实行百日维新",
     "desc": "1898年6月11日—9月21日，光绪帝颁布“明定国是”的诏书，实行变法，史称“百日维新”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 118,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1898,
     "yearEnd": null,
     "yearLabel": "1898",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "谭嗣同、杨锐、林旭、刘光第、康广仁、杨深秀等6人被杀",
     "desc": "1898年9月28日，谭嗣同、杨锐、林旭、刘光第、康广仁、杨深秀等6人被杀，史称“戊戌六君子”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 118,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1899,
     "yearEnd": null,
     "yearLabel": "1899",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "美国政府向各国提出了一个关于中国“门户开放”政策的通牒",
     "desc": "1899年，美国政府向各国提出了一个关于中国“门户开放”政策的通牒，企图通过“机会均等”的手段，保持中国市场对美国商品的自由开放。",
     "src": {
      "book": "中外历史对比年表",
      "page": 118,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1898,
     "yearEnd": null,
     "yearLabel": "1898",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "欧洲",
      "东南亚",
      "美洲"
     ],
     "title": "美西战争爆发",
     "desc": "1898年4—7月，美西战争，美国海军先后在菲律宾和古巴歼灭了西班牙舰队。",
     "src": {
      "book": "中外历史对比年表",
      "page": 117,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1898,
     "yearEnd": 1899,
     "yearLabel": "1898",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国又吞并夏威夷、威克岛、东萨摩亚",
     "desc": "1898—1899年，美国又吞并夏威夷、威克岛、东萨摩亚，向远东和太平洋扩张。",
     "src": {
      "book": "中外历史对比年表",
      "page": 117,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1898,
     "yearEnd": null,
     "yearLabel": "1898",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "波兰出生的物理学家居里夫人发现了钋、镭及其他一些元素的放射性",
     "desc": "1898年，波兰出生的物理学家居里夫人发现了钋、镭及其他一些元素的放射性。",
     "src": {
      "book": "中外历史对比年表",
      "page": 118,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1898,
     "yearEnd": null,
     "yearLabel": "1898",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "俄国",
      "日本",
      "朝鲜半岛"
     ],
     "title": "日本与俄国缔结关于朝鲜的协定",
     "desc": "1898年，日本与俄国缔结关于朝鲜的协定，俄国不得妨碍日本在朝鲜经营工商业。",
     "src": {
      "book": "中外历史对比年表",
      "page": 118,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1899,
     "yearEnd": null,
     "yearLabel": "1899",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "国际和平大会在荷兰海牙开幕",
     "desc": "1899年，国际和平大会在荷兰海牙开幕，有26国代表参加。",
     "src": {
      "book": "中外历史对比年表",
      "page": 118,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b134",
   "year": 1900,
   "yearLabel": "1900",
   "pages": [
    119,
    120
   ],
   "china": [
    {
     "year": 1900,
     "yearEnd": null,
     "yearLabel": "1900",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英国海军中将西摩率领八国联军进犯北京",
     "desc": "1900年6月10日，英国海军中将西摩率领八国联军进犯北京，沿途遭到清军和义和团的阻击而告失败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 119,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1900,
     "yearEnd": null,
     "yearLabel": "1900",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "八国联军攻陷大沽炮台",
     "desc": "1900年6月17—21日，八国联军攻陷大沽炮台，扩大对华侵略，清政府向各国宣战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 119,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1900,
     "yearEnd": null,
     "yearLabel": "1900",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "俄军入侵中国东北制造惨案",
     "desc": "1900年7—8月，俄以保护中东铁路为名，入侵中国东北，制造了“血洗海兰泡”、“强占江东六十四屯”、“火烧瑷珲城”等惨案。",
     "src": {
      "book": "中外历史对比年表",
      "page": 119,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1900,
     "yearEnd": null,
     "yearLabel": "1900",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "八国联军攻陷北京",
     "desc": "1900年8月14日，八国联军攻陷北京。",
     "src": {
      "book": "中外历史对比年表",
      "page": 119,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1901,
     "yearEnd": null,
     "yearLabel": "1901",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府成立督办政务处",
     "desc": "1901年4月，清政府成立督办政务处，作为规划“新政”的机构，并开始逐步推出各项“新政”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 119,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1901,
     "yearEnd": null,
     "yearLabel": "1901",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷改革兵制",
     "desc": "1901年，清廷改革兵制，建立按西方国家的营制、采用洋操训练、使用洋枪洋炮的“常备军”，新编的“常备军”泛称“新军”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 119,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1901,
     "yearEnd": null,
     "yearLabel": "1901",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府撤销总理各国事务衙门",
     "desc": "1901年7月，清政府撤销总理各国事务衙门，改设外务部。",
     "src": {
      "book": "中外历史对比年表",
      "page": 120,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1901,
     "yearEnd": null,
     "yearLabel": "1901",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "俄英美日等11个帝国主义国家胁迫清政府签订丧权辱国的《辛丑条约》",
     "desc": "1901年9月，俄英美日等11个帝国主义国家胁迫清政府签订丧权辱国的《辛丑条约》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 120,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1900,
     "yearEnd": null,
     "yearLabel": "1900",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国工党成立",
     "desc": "1900年，英国工党成立，很快取代自由党的地位，成为与保守党相抗衡的英国两大政党之一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 119,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1900,
     "yearEnd": null,
     "yearLabel": "1900",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "列宁创办《火星报》",
     "desc": "1900年底，列宁创办《火星报》，通过报纸的秘密发行工作，培养了党的骨干，促进了地方小组间联系，为建党做了重要准备。",
     "src": {
      "book": "中外历史对比年表",
      "page": 119,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1901,
     "yearEnd": 1970,
     "yearLabel": "1901",
     "yearKind": "explicit",
     "region": "sea",
     "regionLabel": "南洋",
     "country": "东南亚",
     "countries": [
      "阿拉伯",
      "印度",
      "罗马",
      "欧洲",
      "东南亚"
     ],
     "title": "苏加诺",
     "desc": "1901—1970年，苏加诺，印度尼西亚国民党创始人之一，称自己是民族主义者、伊斯兰教徒和马克思主义者的“混合体”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 119,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1901,
     "yearEnd": null,
     "yearLabel": "1901",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲",
      "大洋洲"
     ],
     "title": "澳大利亚联邦正式成立",
     "desc": "1901年，澳大利亚联邦正式成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 119,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1902,
     "yearEnd": null,
     "yearLabel": "1902",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "日英两国缔结了针对俄国的《日英同盟条约》",
     "desc": "1902年1月，日英两国缔结了针对俄国的《日英同盟条约》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 120,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b135",
   "year": 1903,
   "yearLabel": "1903",
   "pages": [
    120,
    121
   ],
   "china": [
    {
     "year": 1903,
     "yearEnd": null,
     "yearLabel": "1903",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "章炳麟发表《驳康有为论革命书》",
     "desc": "1903年，章炳麟发表《驳康有为论革命书》，全面、深刻地批驳康有为的“保皇”主张，歌颂革命为启迪民智、除旧布新的良药。",
     "src": {
      "book": "中外历史对比年表",
      "page": 120,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1903,
     "yearEnd": null,
     "yearLabel": "1903",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "邹容发表《革命军》",
     "desc": "1903年，邹容发表《革命军》，歌颂革命、歌颂民主，论述中国进行民主革命的必要性和正义性，提出建立“中华共和国”的口号，反对帝国主义干涉中国的革命和独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 120,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1903,
     "yearEnd": null,
     "yearLabel": "1903",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陈天华写了《警世钟》、《猛回头》两本小册子",
     "desc": "1903年，陈天华写了《警世钟》、《猛回头》两本小册子，阐明中国必须进行民主革命的道理，号召人民为保卫祖国的独立自主和民族的生存权利而斗争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 120,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1903,
     "yearEnd": null,
     "yearLabel": "1903",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府勾结上海租界",
     "desc": "1903年6月，清政府勾结上海租界，到刊登介绍《革命军》文章的《苏报》馆逮捕了章炳麟和邹容，这就是震动一时的“苏报案”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 120,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1904,
     "yearEnd": null,
     "yearLabel": "1904",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "黄兴在长沙组建革命团体华兴会",
     "desc": "1904年2月，黄兴在长沙组建革命团体华兴会。",
     "src": {
      "book": "中外历史对比年表",
      "page": 121,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1904,
     "yearEnd": null,
     "yearLabel": "1904",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陶成章、龚宝铨在上海组织革命团体光复会",
     "desc": "1904年10月，陶成章、龚宝铨在上海组织革命团体光复会，推举蔡元培为会长。",
     "src": {
      "book": "中外历史对比年表",
      "page": 121,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1904,
     "yearEnd": null,
     "yearLabel": "1904",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "湖北武汉第一个革命团体科学补习所成立",
     "desc": "1904年，湖北武汉第一个革命团体科学补习所成立，以新军为革命活动的主要对象。",
     "src": {
      "book": "中外历史对比年表",
      "page": 121,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1904,
     "yearEnd": 1909,
     "yearLabel": "1904",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "詹天佑主持完成北京至张家口一线的铁路修筑工程",
     "desc": "1904—1909年，詹天佑主持完成北京至张家口一线的铁路修筑工程。",
     "src": {
      "book": "中外历史对比年表",
      "page": 121,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1903,
     "yearEnd": null,
     "yearLabel": "1903",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国莱特兄弟驾驶使用活塞汽油发动机的飞机试飞成功",
     "desc": "1903年，美国莱特兄弟驾驶使用活塞汽油发动机的飞机试飞成功，开创了现代航空事业的新纪元。",
     "src": {
      "book": "中外历史对比年表",
      "page": 120,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1903,
     "yearEnd": null,
     "yearLabel": "1903",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "欧洲"
     ],
     "title": "俄国社会民主工党第二次代表大会宣告了布尔什维克党的建立",
     "desc": "1903年，俄国社会民主工党第二次代表大会宣告了布尔什维克党的建立，这是一个新型的、与西欧的社会民主党根本不同的马克思主义政党，标志列宁主义的诞生。",
     "src": {
      "book": "中外历史对比年表",
      "page": 120,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1903,
     "yearEnd": null,
     "yearLabel": "1903",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国迫使哥伦比亚政府签订《巴拿马运河条约》",
     "desc": "1903年1月，美国迫使哥伦比亚政府签订《巴拿马运河条约》，在哥伦比亚议会拒绝批准后，策划了隶属哥伦比亚的巴拿马发动“革命”，宣布独立，随即与巴拿马签订条约，控制了巴拿马运河区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 120,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1904,
     "yearEnd": null,
     "yearLabel": "1904",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "俄国",
      "日本"
     ],
     "title": "日本对旅顺口的俄国舰队发动突袭",
     "desc": "1904年2月，日本对旅顺口的俄国舰队发动突袭，日俄战争爆发，这是为争夺中国领土并在中国领土上进行的帝国主义战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 121,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1904,
     "yearEnd": 1907,
     "yearLabel": "1904",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本先后三次强迫韩国签订《日韩协约》",
     "desc": "1904—1907年，日本先后三次强迫韩国签订《日韩协约》，韩国彻底沦为日本保护国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 121,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1904,
     "yearEnd": 1967,
     "yearLabel": "1904",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "奥本海默",
     "desc": "1904—1967年，奥本海默，加利福尼亚大学理论物理学教授，美国“原子弹之父”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 121,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b136",
   "year": 1905,
   "yearLabel": "1905",
   "pages": [
    121,
    122
   ],
   "china": [
    {
     "year": 1905,
     "yearEnd": null,
     "yearLabel": "1905",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷下令自次年起",
     "desc": "1905年，清廷下令自次年起，停止一切科举考试，延续1000多年的科举制度被废除。",
     "src": {
      "book": "中外历史对比年表",
      "page": 121,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1905,
     "yearEnd": null,
     "yearLabel": "1905",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国同盟会在东京正式成立",
     "desc": "1905年8月，中国同盟会在东京正式成立，以孙中山提出的“驱除鞑虏、恢复中华、创立民国、平均地权”为纲领。",
     "src": {
      "book": "中外历史对比年表",
      "page": 121,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1905,
     "yearEnd": null,
     "yearLabel": "1905",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清廷派载泽等五大臣“出洋考察政治”",
     "desc": "1905年10月，清廷派载泽等五大臣“出洋考察政治”，随后命政务处设立“考察政治馆”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 122,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1905,
     "yearEnd": null,
     "yearLabel": "1905",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "同盟会创办机关刊物《民报》",
     "desc": "1905年11月，同盟会创办机关刊物《民报》，在发刊词中，孙中山把同盟会的十六字纲领归结为民族、民权、民生三大主义，即所谓“三民主义”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 122,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1905,
     "yearEnd": 1907,
     "yearLabel": "1905",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "革命派与改良派分别以《民报》和《新民丛报》为主要阵地",
     "desc": "1905—1907年，革命派与改良派分别以《民报》和《新民丛报》为主要阵地，在政治思想领域展开激烈论战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 122,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1905,
     "yearEnd": 1907,
     "yearLabel": "1905",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "俄国1905年革命",
     "desc": "1905—1907年，俄国1905年革命，也是帝国主义时代第一次人民革命，沉重打击了沙皇专制制度，为十月革命的胜利做了良好准备。",
     "src": {
      "book": "中外历史对比年表",
      "page": 121,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1905,
     "yearEnd": 1911,
     "yearLabel": "1905",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯"
     ],
     "title": "伊朗革命",
     "desc": "1905—1911年，伊朗革命，为反帝反封建的资产阶级民族民主革命，成为亚洲觉醒时期东方民族民主革命潮流的先声。",
     "src": {
      "book": "中外历史对比年表",
      "page": 121,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1905,
     "yearEnd": null,
     "yearLabel": "1905",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "俄国",
      "日本"
     ],
     "title": "对马海战",
     "desc": "1905年5月，对马海战，俄国波罗的海舰队与日本海军在对马海峡展开决战，俄舰队全军覆灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 121,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1905,
     "yearEnd": null,
     "yearLabel": "1905",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "俄国",
      "日本",
      "朝鲜半岛"
     ],
     "title": "日俄签订《朴茨茅斯条约》",
     "desc": "1905年9月，日俄签订《朴茨茅斯条约》，俄国承认日本在朝鲜的独占利益；将在中国东北的有关权益全部“转让”给日本；库页岛南部及附近岛屿让给日本，日俄战争结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 122,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b137",
   "year": 1906,
   "yearLabel": "1906",
   "pages": [
    122,
    123
   ],
   "china": [
    {
     "year": 1906,
     "yearEnd": null,
     "yearLabel": "1906",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "刘敬安在湖北组织秘密革命团体日知会",
     "desc": "1906年春，刘敬安在湖北组织秘密革命团体日知会。",
     "src": {
      "book": "中外历史对比年表",
      "page": 122,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1906,
     "yearEnd": null,
     "yearLabel": "1906",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙中山拟定《军政府宣言》",
     "desc": "1906年秋冬，孙中山等拟定的《军政府宣言》，第一次言简意赅地阐述了革命宗旨即“四纲”（驱除鞑虏、恢复中华、建立民国、平均地权）和实施程序即“三序”（军法之治、约法之治、宪法之治），成为各地革命党人共同遵从的经典性文献。",
     "src": {
      "book": "中外历史对比年表",
      "page": 122,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1906,
     "yearEnd": null,
     "yearLabel": "1906",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清政府正式宣布“预备仿行宪政”",
     "desc": "1906年9月，清政府正式宣布“预备仿行宪政”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 122,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1906,
     "yearEnd": null,
     "yearLabel": "1906",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "萍浏醴起义",
     "desc": "1906年12月，湖南、江西交界的浏阳、醴陵、萍乡地区爆发了号称“革命军”的大规模会党起义，称“萍浏醴起义”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 123,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1906,
     "yearEnd": null,
     "yearLabel": "1906",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲",
      "美洲",
      "非洲"
     ],
     "title": "美国派代表参加在西班牙召开的关于摩洛哥问题的国际会议",
     "desc": "1906年1月，美国派代表参加在西班牙召开的关于摩洛哥问题的国际会议，调解德国和法英之间的矛盾，第一次违背了不介入欧洲事务的美国传统外交政策。",
     "src": {
      "book": "中外历史对比年表",
      "page": 122,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1906,
     "yearEnd": null,
     "yearLabel": "1906",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "阿拉伯",
      "印度"
     ],
     "title": "印度民族主义政党穆斯林联盟成立",
     "desc": "1906年12月，印度民族主义政党穆斯林联盟成立，穆罕默德·阿里·真纳任主席。",
     "src": {
      "book": "中外历史对比年表",
      "page": 122,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1906,
     "yearEnd": null,
     "yearLabel": "1906",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国的德福雷斯特发明了三极电子管",
     "desc": "1906年，美国的德福雷斯特发明了三极电子管，使无线电通信可以达到更远的距离。",
     "src": {
      "book": "中外历史对比年表",
      "page": 122,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1906,
     "yearEnd": 1907,
     "yearLabel": "1906",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "提拉克提出四大纲领",
     "desc": "1906—1907年，印度国大党激进派领袖提拉克提出“自主、自产、抵制英货和民族教育”四大纲领，成为民族斗争的旗帜，掀起了全国性的自主自产运动高潮。",
     "src": {
      "book": "中外历史对比年表",
      "page": 123,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b138",
   "year": 1907,
   "yearLabel": "1907",
   "pages": [
    123
   ],
   "china": [
    {
     "year": 1907,
     "yearEnd": null,
     "yearLabel": "1907",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "同盟会在华南连续发动六次武装起义",
     "desc": "1907年5月—1908年4月，孙中山直接领导下，同盟会在华南沿海和沿边地区连续发动了六次武装起义，都遭到失败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 123,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1907,
     "yearEnd": null,
     "yearLabel": "1907",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "光复会领导人徐锡麟刺杀安徽巡抚恩铭",
     "desc": "1907年7月，光复会领导人徐锡麟刺杀安徽巡抚恩铭，失败被捕，慷慨就义；秋瑾受到牵连，在绍兴就义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 123,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1907,
     "yearEnd": null,
     "yearLabel": "1907",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "梁启超等在东京组织了具有资产阶级政党规模的政闻社",
     "desc": "1907年10月，梁启超等在东京组织了具有资产阶级政党规模的政闻社，出版机关刊物《政论》，为立宪大造舆论。",
     "src": {
      "book": "中外历史对比年表",
      "page": 123,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1908,
     "yearEnd": null,
     "yearLabel": "1908",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "各省立宪派代表齐集北京",
     "desc": "1908年8月，各省立宪派代表齐集北京，向都察院呈递国会请愿书，要求代奏，掀起国会请愿运动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 123,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1908,
     "yearEnd": null,
     "yearLabel": "1908",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "光绪帝和慈禧太后先后死去",
     "desc": "1908年11月，光绪帝和慈禧太后先后死去，溥仪继承皇位，改元宣统，醇亲王载沣摄政。",
     "src": {
      "book": "中外历史对比年表",
      "page": 123,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1907,
     "yearEnd": null,
     "yearLabel": "1907",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "大洋洲"
     ],
     "title": "英国政府赋予新西兰以自治领地位",
     "desc": "1907年，英国政府赋予新西兰以自治领地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 123,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1907,
     "yearEnd": null,
     "yearLabel": "1907",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "英格兰"
     ],
     "title": "英俄订立协约",
     "desc": "1907年8月，英俄订立协约，协调了双方在波斯、阿富汗和中国西藏的利益。加之此前的法俄同盟、英法协约，英法俄三国协约构成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 123,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1908,
     "yearEnd": null,
     "yearLabel": "1908",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "欧洲"
     ],
     "title": "奥匈政府单方面宣布正式吞并波斯尼亚和黑塞哥维纳",
     "desc": "1908年10月，奥匈政府单方面宣布正式吞并波斯尼亚和黑塞哥维纳，由此引发波斯尼亚危机。",
     "src": {
      "book": "中外历史对比年表",
      "page": 123,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1908,
     "yearEnd": null,
     "yearLabel": "1908",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国成立联邦调查局",
     "desc": "1908年，美国成立联邦调查局，成为监视国内革命人民和进行国外间谍活动的主要工具。",
     "src": {
      "book": "中外历史对比年表",
      "page": 123,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b139",
   "year": 1909,
   "yearLabel": "1909",
   "pages": [
    124,
    125
   ],
   "china": [
    {
     "year": 1910,
     "yearEnd": null,
     "yearLabel": "1910",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "在同盟会组织下",
     "desc": "1910年2月，在同盟会组织下，倪映典率新军千余人在广州城郊起义失败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 124,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1910,
     "yearEnd": null,
     "yearLabel": "1910",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "章炳麟、陶成章等重建光复会",
     "desc": "1910年2月，章炳麟、陶成章等重建光复会，公开与同盟会分庭抗礼。",
     "src": {
      "book": "中外历史对比年表",
      "page": 124,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1910,
     "yearEnd": null,
     "yearLabel": "1910",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "作为“立议院基础”的资政院在北京召开第一次常年会",
     "desc": "1910年10月，作为“立议院基础”的资政院在北京召开第一次常年会，资政院是中国历史上第一个代表民意的法定机构。",
     "src": {
      "book": "中外历史对比年表",
      "page": 124,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1911,
     "yearEnd": null,
     "yearLabel": "1911",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英法德美四国银行团与清政府订立《湖广铁路借款合同》",
     "desc": "1911年，英法德美四国银行团与清政府订立《湖广铁路借款合同》，企图控制中国的财政、金融并垄断对清政府的贷款。",
     "src": {
      "book": "中外历史对比年表",
      "page": 124,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1911,
     "yearEnd": null,
     "yearLabel": "1911",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "黄兴领导广州黄花岗起义失败",
     "desc": "1911年4月，黄兴领导广州黄花岗起义失败，同盟会丧失了许多优秀干部，领导力量大为削弱。",
     "src": {
      "book": "中外历史对比年表",
      "page": 124,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1911,
     "yearEnd": null,
     "yearLabel": "1911",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "川汉铁路股东在成都组织保路同志会",
     "desc": "1911年6月，川汉铁路股东在成都组织保路同志会，四川掀起保路风潮。",
     "src": {
      "book": "中外历史对比年表",
      "page": 125,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1911,
     "yearEnd": null,
     "yearLabel": "1911",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "上海闸北四家丝厂女工2000余人举行罢工",
     "desc": "1911年8月，上海闸北四家丝厂女工2000余人举行罢工。",
     "src": {
      "book": "中外历史对比年表",
      "page": 125,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1911,
     "yearEnd": null,
     "yearLabel": "1911",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "革命党人发动武昌起义",
     "desc": "1911年10月10日，革命党人发动武昌起义，建立军政府，推举清朝高级军官黎元洪为都督。这一天后被定为中华民国国庆日。",
     "src": {
      "book": "中外历史对比年表",
      "page": 125,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1911,
     "yearEnd": null,
     "yearLabel": "1911",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "沙俄操纵外蒙发表《独立宣言》",
     "desc": "1911年12月1日，沙俄操纵外蒙发表《独立宣言》，宣布成立“大蒙古国”，以活佛哲布尊丹巴为皇帝，建立傀儡政权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 125,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1911,
     "yearEnd": null,
     "yearLabel": "1911",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中俄在齐齐哈尔签订《满洲里界约》",
     "desc": "1911年12月，中俄在齐齐哈尔签订《满洲里界约》，沙俄又侵占中国1400平方公里的领土。",
     "src": {
      "book": "中外历史对比年表",
      "page": 125,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1909,
     "yearEnd": null,
     "yearLabel": "1909",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "罗斯",
      "美洲"
     ],
     "title": "美国总统西奥多·罗斯福对门罗主义做了新的解释",
     "desc": "1909年，美国总统西奥多·罗斯福对门罗主义做了新的解释，即“罗斯福推论”，进一步把不准干涉美洲延伸为美国管理美洲。",
     "src": {
      "book": "中外历史对比年表",
      "page": 124,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1909,
     "yearEnd": null,
     "yearLabel": "1909",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国总统塔夫脱提出了主要应用于拉丁美洲的金元外交",
     "desc": "1909年，美国总统塔夫脱提出了主要应用于拉丁美洲的金元外交，目的在于利用经济手段对拉美国家进行控制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 124,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1910,
     "yearEnd": null,
     "yearLabel": "1910",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "葡萄牙宣布为共和国",
     "desc": "1910年，葡萄牙宣布为共和国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 124,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1910,
     "yearEnd": null,
     "yearLabel": "1910",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "第二国际第八次代表大会在哥本哈根召开",
     "desc": "1910年，第二国际第八次代表大会在哥本哈根召开。决议各国社会党人应在本国国会中投票反对军事预算，以制止帝国主义战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 124,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1910,
     "yearEnd": null,
     "yearLabel": "1910",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日韩签署《日韩合并条约》",
     "desc": "1910年8月，日韩签署《日韩合并条约》，日本吞并韩国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 124,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1911,
     "yearEnd": null,
     "yearLabel": "1911",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国工程师泰罗出版《科学管理原理》一书",
     "desc": "1911年，美国工程师泰罗出版《科学管理原理》一书，奠定了科学管理的理论基础，他提倡“劳动科学组织”，发明“泰罗制”的科学化管理方法，使劳动生产率有很大提高。",
     "src": {
      "book": "中外历史对比年表",
      "page": 124,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1911,
     "yearEnd": null,
     "yearLabel": "1911",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "欧洲"
     ],
     "title": "意大利向土耳其宣战",
     "desc": "1911年，意大利向土耳其宣战，占领的黎波里。",
     "src": {
      "book": "中外历史对比年表",
      "page": 124,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b140",
   "year": 1912,
   "yearLabel": "1912",
   "pages": [
    125,
    126
   ],
   "china": [
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙中山在南京宣誓就职临时大总统",
     "desc": "1912年1月1日，孙中山在南京宣誓就职临时大总统，宣告中华民国临时政府成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 125,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "清帝宣布正式退位",
     "desc": "1912年2月12日，清帝宣布正式退位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 125,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "临时参议院选举袁世凯为临时大总统",
     "desc": "1912年2月15日，临时参议院选举袁世凯为临时大总统。",
     "src": {
      "book": "中外历史对比年表",
      "page": 126,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙中山在南京颁布《中华民国临时约法》",
     "desc": "1912年3月11日，孙中山在南京颁布《中华民国临时约法》，用法律形式把资产阶级民主共和制肯定下来。",
     "src": {
      "book": "中外历史对比年表",
      "page": 126,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙中山正式解除临时大总统的职务",
     "desc": "1912年4月1日，孙中山正式解除临时大总统的职务，次日，临时政府迁往北京。",
     "src": {
      "book": "中外历史对比年表",
      "page": 126,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "宋教仁以同盟会为基础组建国民党（以孙中山为理事长而由自己代理）",
     "desc": "1912年8月，宋教仁以同盟会为基础组建国民党（以孙中山为理事长而由自己代理），在临时参议院中成为第一大党。",
     "src": {
      "book": "中外历史对比年表",
      "page": 126,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "沙俄与外蒙当局非法签订《俄蒙协约》及《商务章程》",
     "desc": "1912年11月，沙俄与外蒙当局非法签订《俄蒙协约》及《商务章程》，沙俄在外蒙取得广泛特权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 126,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "袁世凯当政时期，工商部颁布了《暂行工艺品奖励章程》",
     "desc": "1912年12月，袁世凯当政时期，工商部颁布了《暂行工艺品奖励章程》，规定工艺品的发明者有权申请专利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 126,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "第一届国会选举，宋教仁遇刺",
     "desc": "1912年12月—1913年2月，第一届国会选举，宋教仁领导国民党在参众两院获得压到多数席位。但在1913年3月，宋教仁在上海车站遇刺身亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 126,
      "row": 9,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国政府支持其银行向利比里亚提供贷款",
     "desc": "1912年，美国政府支持其银行向利比里亚提供贷款，由此控制了利比里亚海关并进而干涉利比里亚内政。",
     "src": {
      "book": "中外历史对比年表",
      "page": 125,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "意大利取消了选举权限制",
     "desc": "1912年，意大利取消了选举权限制，实现了成年男子普选权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 125,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "俄国《真理报》创刊发行",
     "desc": "1912年，俄国《真理报》创刊发行。",
     "src": {
      "book": "中外历史对比年表",
      "page": 126,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "欧洲"
     ],
     "title": "土耳其被迫与意大利签订《洛桑条约》",
     "desc": "1912年，土耳其被迫与意大利签订《洛桑条约》，放弃的黎波里。",
     "src": {
      "book": "中外历史对比年表",
      "page": 126,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国民主党人威尔逊当选总统",
     "desc": "1912年，美国民主党人威尔逊当选总统。",
     "src": {
      "book": "中外历史对比年表",
      "page": 126,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "阿尔巴尼亚宣布独立",
     "desc": "1912年，阿尔巴尼亚宣布独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 126,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1912,
     "yearEnd": null,
     "yearLabel": "1912",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "欧洲"
     ],
     "title": "第一次巴尔干战争",
     "desc": "1912年10月—1913年5月，第一次巴尔干战争，巴尔干同盟四国发动的反土耳其战争，土耳其战败，巴尔干半岛各民族摆脱了土耳其的统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 126,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b141",
   "year": 1913,
   "yearLabel": "1913",
   "pages": [
    127
   ],
   "china": [
    {
     "year": 1913,
     "yearEnd": null,
     "yearLabel": "1913",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "二次革命爆发",
     "desc": "1913年7—9月，袁世凯派兵南下发动内战，南方各省国民党人被迫应战，先后宣布讨袁，这就是孙中山所说的“二次革命”，以失败告终，辛亥革命结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 127,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1913,
     "yearEnd": null,
     "yearLabel": "1913",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "袁世凯当选正式大总统",
     "desc": "1913年10月，袁世凯当选正式大总统，在太和殿举行就职仪式。",
     "src": {
      "book": "中外历史对比年表",
      "page": 127,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1913,
     "yearEnd": 1914,
     "yearLabel": "1913",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "英国操纵所谓“中英藏会议”在印度北部西姆拉召开",
     "desc": "1913—1914年，英国操纵所谓“中英藏会议”在印度北部西姆拉召开。英国勾结西藏地方“代表”非法签订的《西姆拉条约》、在会外秘密换文中提到的划定中印东段边界的“麦克马洪线”，均未被当时的中国政府所承认，以后的历届中国政府也从未承认。",
     "src": {
      "book": "中外历史对比年表",
      "page": 127,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1913,
     "yearEnd": null,
     "yearLabel": "1913",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "袁世凯先后解散国民党、解散国会",
     "desc": "1913年11月，袁世凯先后解散国民党、解散国会，设立政治会议作为其御用工具。",
     "src": {
      "book": "中外历史对比年表",
      "page": 127,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1913,
     "yearEnd": null,
     "yearLabel": "1913",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "袁世凯政府与沙俄签订《中俄声明》",
     "desc": "1913年11月，袁世凯政府与沙俄签订《中俄声明》，追认了《俄蒙协约》及其附件，实际承认了沙俄对外蒙古的控制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 127,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1913,
     "yearEnd": null,
     "yearLabel": "1913",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "欧洲"
     ],
     "title": "第二次巴尔干战争",
     "desc": "1913年6月，第二次巴尔干战争，巴尔干各国之间因争夺领土而爆发的战争，结果巴尔干诸国分裂成两个集团，分别得到俄国和奥匈帝国的支持。",
     "src": {
      "book": "中外历史对比年表",
      "page": 127,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1913,
     "yearEnd": null,
     "yearLabel": "1913",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国《爱尔兰自治法案》两次为议会上院否决",
     "desc": "1913年，英国《爱尔兰自治法案》两次为议会上院否决。",
     "src": {
      "book": "中外历史对比年表",
      "page": 127,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1913,
     "yearEnd": null,
     "yearLabel": "1913",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国政府提出的扩军案和国防税案在议会通过",
     "desc": "1913年，德国政府提出的扩军案和国防税案在议会通过。",
     "src": {
      "book": "中外历史对比年表",
      "page": 127,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b142",
   "year": 1914,
   "yearLabel": "1914",
   "pages": [
    128,
    129
   ],
   "china": [
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "袁世凯正式公布《中华民国约法》",
     "desc": "1914年5月，袁世凯正式公布《中华民国约法》，同时废除《临时约法》，专制独裁统治被用法律的形式肯定下来。",
     "src": {
      "book": "中外历史对比年表",
      "page": 128,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙中山筹组的中华革命党在东京举行成立大会",
     "desc": "1914年7月，孙中山筹组的中华革命党在东京举行成立大会，以实行民权、民生两主义为宗旨，以扫除专制政治、建设完全民国为目的。",
     "src": {
      "book": "中外历史对比年表",
      "page": 128,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日本借一战爆发之机对德宣战",
     "desc": "1914年8月，日本借一战爆发之机对德宣战，派军在中国山东半岛登陆，武装占领了青岛及胶济铁路全线，夺取了德国在山东的权益。",
     "src": {
      "book": "中外历史对比年表",
      "page": 128,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北京政府就欧战爆发发表中立宣言",
     "desc": "1914年8月，北京政府就欧战爆发发表中立宣言。",
     "src": {
      "book": "中外历史对比年表",
      "page": 128,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "上海招商局、太古、怡和三家轮船公司的中国海员举行总同盟罢工",
     "desc": "1914年10月，上海招商局、太古、怡和三家轮船公司的中国海员举行总同盟罢工。",
     "src": {
      "book": "中外历史对比年表",
      "page": 129,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1914,
     "yearEnd": 1915,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "袁世凯政府公布《公司条例》等工商法规",
     "desc": "1914—1915年，袁世凯当政时期，工商部陆续公布了《公司条例》《公司保息条例》和《农商部奖章规则》，解除了清政府对开办企业的若干限制，废除了一些封建性的专利垄断。",
     "src": {
      "book": "中外历史对比年表",
      "page": 129,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "波斯",
     "countries": [
      "波斯",
      "欧洲"
     ],
     "title": "萨拉热窝事件",
     "desc": "1914年6月28日，萨拉热窝事件，奥地利皇储斐迪南大公在波斯尼亚首府萨拉热窝遇刺，这成为第一次世界大战的导火线。",
     "src": {
      "book": "中外历史对比年表",
      "page": 128,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "奥匈帝国向塞尔维亚宣战",
     "desc": "1914年7月26日，奥匈帝国向塞尔维亚宣战，第一次世界大战爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 128,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国先后向俄法两国宣战",
     "desc": "1914年8月1—3日，德国先后向俄法两国宣战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 128,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "英格兰",
      "美洲",
      "非洲",
      "大洋洲"
     ],
     "title": "英国对德国宣战",
     "desc": "1914年8月4日，英国对德国宣战，不列颠帝国所属各自治领（南非联邦、澳大利亚、新西兰等）也都随之加入了战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 128,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本借口“英日同盟”对德宣战",
     "desc": "1914年8月23日，日本借口“英日同盟”对德宣战，趁机在东亚扩张势力。",
     "src": {
      "book": "中外历史对比年表",
      "page": 128,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "巴拿马运河竣工",
     "desc": "1914年8月，巴拿马运河竣工，加勒比海变成了“美国湖”，巴拿马运河的修建意味着美国在加勒比海霸权的崛起。",
     "src": {
      "book": "中外历史对比年表",
      "page": 128,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "法兰西",
      "英格兰"
     ],
     "title": "马恩河战役",
     "desc": "1914年9月，马恩河战役，一战中第一次大规模战略决战，也是一战的第一个转折点，英法联军获胜，德军6周内打败法国计划宣告破产。",
     "src": {
      "book": "中外历史对比年表",
      "page": 128,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "英格兰",
      "俄国"
     ],
     "title": "俄国和英法先后向土耳其宣战",
     "desc": "1914年11月2—5日，俄国和英法先后向土耳其宣战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 129,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "西线机动战结束",
     "desc": "1914年11月，西线机动战结束，开始转入阵地战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 129,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1914,
     "yearEnd": null,
     "yearLabel": "1914",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "奥斯曼",
      "英格兰"
     ],
     "title": "英国政府以土耳其加入同盟国一方参战为借口",
     "desc": "1914年12月，英国政府以土耳其加入同盟国一方参战为借口，宣布取消奥斯曼帝国对埃及的宗主权，使埃及成为英国殖民地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 129,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b143",
   "year": 1915,
   "yearLabel": "1915",
   "pages": [
    129,
    130
   ],
   "china": [
    {
     "year": 1915,
     "yearEnd": null,
     "yearLabel": "1915",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日本迫使袁世凯签订了灭亡中国的“二十一条”",
     "desc": "1915年5月9日，日本迫使袁世凯签订了灭亡中国的“二十一条”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 129,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1915,
     "yearEnd": null,
     "yearLabel": "1915",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中俄蒙恰克图会议签订了《中俄蒙协约》",
     "desc": "1915年6月，中俄蒙恰克图会议签订了《中俄蒙协约》，沙俄承认中国对外蒙的“宗主权”；哲布尊丹巴取消“大皇帝”称号，由中华民国大总统册封；北京政府承认外蒙的“自治”和沙俄在外蒙的各种特权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 129,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1915,
     "yearEnd": null,
     "yearLabel": "1915",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "袁世凯授意组织“筹安会”",
     "desc": "1915年8月，袁世凯授意组织“筹安会”，杨度、孙毓筠、严复、刘师培、李燮和、胡瑛被称为筹安会“六君子”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 130,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1915,
     "yearEnd": null,
     "yearLabel": "1915",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "袁世凯发布命令",
     "desc": "1915年12月12日，袁世凯发布命令，恢复帝制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 130,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1915,
     "yearEnd": null,
     "yearLabel": "1915",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蔡锷宣布云南独立",
     "desc": "1915年12月25日，蔡锷宣布云南独立，组成讨袁的“护国军”，护国运动爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 130,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1915,
     "yearEnd": null,
     "yearLabel": "1915",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "罗马",
      "英格兰",
      "俄国"
     ],
     "title": "英法俄签订了瓜分土耳其领土的第一个秘密协定",
     "desc": "1915年3月，英法俄签订了瓜分土耳其领土的第一个秘密协定，君士坦丁堡、“两海峡”和马尔马拉海诸岛归俄国，但君士坦丁堡为自由港，商船在海峡通行自由。",
     "src": {
      "book": "中外历史对比年表",
      "page": 129,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1915,
     "yearEnd": null,
     "yearLabel": "1915",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "欧洲"
     ],
     "title": "《伦敦密约》",
     "desc": "1915年4月，《伦敦密约》，协约国集团以牺牲奥地利和土耳其的领土，换取意大利参战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 129,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1915,
     "yearEnd": null,
     "yearLabel": "1915",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德军在东线攻陷华沙",
     "desc": "1915年8月，德军在东线攻陷华沙，俄军东撤。",
     "src": {
      "book": "中外历史对比年表",
      "page": 130,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1915,
     "yearEnd": null,
     "yearLabel": "1915",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "德军与保加利亚军占领塞尔维亚",
     "desc": "1915年11月，德军与保加利亚军占领塞尔维亚。",
     "src": {
      "book": "中外历史对比年表",
      "page": 130,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b144",
   "year": 1916,
   "yearLabel": "1916",
   "pages": [
    130
   ],
   "china": [
    {
     "year": 1916,
     "yearEnd": null,
     "yearLabel": "1916",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "袁世凯在众叛亲离中被迫取消帝制",
     "desc": "1916年3月22日，袁世凯在众叛亲离中被迫取消帝制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 130,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1916,
     "yearEnd": null,
     "yearLabel": "1916",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "副总统黎元洪继任大总统",
     "desc": "1916年6月，副总统黎元洪继任大总统，恢复《临时约法》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 130,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1916,
     "yearEnd": null,
     "yearLabel": "1916",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "法国强占天津老西开",
     "desc": "1916年10月，法国强占天津老西开，天津人民罢工、罢课、罢市展开斗争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 130,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1916,
     "yearEnd": null,
     "yearLabel": "1916",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "英格兰",
      "欧洲"
     ],
     "title": "凡尔登战役",
     "desc": "1916年2—12月，凡尔登战役，这是一战中时间最长的一次战役，德军和英法联军伤亡共70多万人，凡尔登战场因而被称为“绞肉机”。自此，战略主动权开始转移到协约国一方。",
     "src": {
      "book": "中外历史对比年表",
      "page": 130,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1916,
     "yearEnd": null,
     "yearLabel": "1916",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "日德兰海战",
     "desc": "1916年5—6月，日德兰海战，英德海军在北海日德兰海域的决战，英国继续掌握制海权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 130,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1916,
     "yearEnd": null,
     "yearLabel": "1916",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "英格兰"
     ],
     "title": "索姆河战役",
     "desc": "1916年6—11月，索姆河战役，英法联军在索姆河一线发动的对德进攻，是一战中规模最大的一次战役，也是最大的一次消耗战，牵制了德军在凡尔登的攻势。",
     "src": {
      "book": "中外历史对比年表",
      "page": 130,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b145",
   "year": 1917,
   "yearLabel": "1917",
   "pages": [
    131,
    132
   ],
   "china": [
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "胡适在《新青年》上发表《文学改良刍议》",
     "desc": "1917年1月，胡适在《新青年》上发表《文学改良刍议》，主张以白话文为中国文学之正宗，提出“文学改良”的口号。",
     "src": {
      "book": "中外历史对比年表",
      "page": 131,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陈独秀在《新青年》发表《文学革命论》一文",
     "desc": "1917年2月，陈独秀在《新青年》发表《文学革命论》一文，撑起文学革命大旗声援胡适。",
     "src": {
      "book": "中外历史对比年表",
      "page": 131,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北京政府宣告对德断绝外交关系",
     "desc": "1917年3月，北京政府宣告对德断绝外交关系，收回天津、汉口德租界，停付赔款与欠款。",
     "src": {
      "book": "中外历史对比年表",
      "page": 131,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "前清江苏巡抚兼署两江总督张勋进京",
     "desc": "1917年7月1—12日，前清江苏巡抚兼署两江总督张勋进京，伙同康有为等拥立12岁的溥仪复辟，史称“丁巳复辟”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 131,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "段祺瑞把持的北京政府发布《大总统布告》",
     "desc": "1917年8月，段祺瑞把持的北京政府发布《大总统布告》，正式对德宣战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 132,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "美国国务卿蓝辛与日本外相石井签订《蓝辛石井协定》",
     "desc": "1917年11月，美国国务卿蓝辛与日本外相石井签订《蓝辛石井协定》，美国承认日本在中国有“特殊利益”，日本再次承认美国的“门户开放”政策，这给了日本独占中国的有利条件。",
     "src": {
      "book": "中外历史对比年表",
      "page": 132,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国开始实行无限制潜艇战",
     "desc": "1917年2月，德国开始实行无限制潜艇战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 131,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "德意志",
      "英格兰",
      "日本"
     ],
     "title": "英日签订密约",
     "desc": "1917年2月，英日签订密约，赤道以南的德属太平洋岛屿战后归属英国；赤道以北的德属岛屿归属日本，且日本有权继承德国战前在中国山东的特权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 131,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "俄国爆发二月革命",
     "desc": "1917年3月8日，俄国爆发二月革命。",
     "src": {
      "book": "中外历史对比年表",
      "page": 131,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "沙皇尼古拉二世被迫宣布退位",
     "desc": "1917年3月15日，沙皇尼古拉二世被迫宣布退位，罗曼诺夫王朝覆灭，资产阶级临时政府成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 131,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国正式对德宣战",
     "desc": "1917年4月6日，美国正式对德宣战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 131,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "列宁发表《论无产阶级在这次革命中的任务》（即“四月提纲”）",
     "desc": "1917年4月20日，列宁发表《论无产阶级在这次革命中的任务》（即“四月提纲”）。",
     "src": {
      "book": "中外历史对比年表",
      "page": 131,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "俄国布尔什维克党引导群众进行和平示威",
     "desc": "1917年7月，俄国布尔什维克党引导群众进行和平示威，要求“全部政权归苏维埃”，政府向示威群众开枪，强行解散工人武装，通缉和逮捕革命领导人，政权完全落入资产阶级政府手中，这就是“七月事件”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 131,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "康布雷战役",
     "desc": "1917年11—12月，康布雷战役，英军在进攻中大规模使用坦克，取得重大战术效果，这在军事技术史上具有重要意义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 132,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "俄国彼得格勒武装起义取得胜利",
     "desc": "1917年11月7日，俄国彼得格勒武装起义取得胜利，临时政府被推翻。",
     "src": {
      "book": "中外历史对比年表",
      "page": 132,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "俄国向所有交战国提出休战建议",
     "desc": "1917年11月8日，俄国向所有交战国提出休战建议，并宣布俄国退出战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 132,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1917,
     "yearEnd": null,
     "yearLabel": "1917",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "以色列",
     "countries": [
      "以色列",
      "英格兰"
     ],
     "title": "英国发表《贝尔福宣言》",
     "desc": "1917年，英国发表《贝尔福宣言》，支持犹太复国主义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 132,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b146",
   "year": 1918,
   "yearLabel": "1918",
   "pages": [
    132,
    133,
    134
   ],
   "china": [
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "段祺瑞政府承认日本继承德国在山东的侵略权益",
     "desc": "1918年，段祺瑞政府承认日本继承德国在山东的侵略权益，使日本后来据为口实，不肯把山东交还中国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 132,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "冯国璋公布《国会组织法》等选举法",
     "desc": "1918年2月，冯国璋以代理大总统名义公布《国会组织法》《参议员选举法》和《众议员选举法》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 133,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "毛泽东、蔡和森、何叔衡等在长沙发起成立了“新民学会”",
     "desc": "1918年4月，毛泽东、蔡和森、何叔衡等在长沙发起成立了“新民学会”，是“五四”前后影响较大的社团之一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 133,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "段祺瑞政府与日本签订了中日陆海军《共同防敌军事协定》",
     "desc": "1918年5月，段祺瑞政府与日本签订了中日陆海军《共同防敌军事协定》，日本从而取得了在中国驻兵和军队自由出入中国东北与蒙古的特权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 133,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北大学生傅斯年、罗家伦等发起成立了新潮社",
     "desc": "1918年11月，北大学生傅斯年、罗家伦等发起成立了新潮社，次年创办的《新潮》杂志，提倡白话文，反对旧礼教，对新文化运动发展起了推动作用。",
     "src": {
      "book": "中外历史对比年表",
      "page": 133,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "大总统徐世昌在庆祝第一次世界大战胜利大会上致辞",
     "desc": "1918年11月，大总统徐世昌在庆祝第一次世界大战胜利大会上致辞，宣称“公理战胜强权”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 133,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陈独秀、李大钊、胡适创办《每周评论》杂志",
     "desc": "1918年12月，陈独秀、李大钊、胡适创办《每周评论》杂志，专门介绍马克思主义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 134,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李大钊发表《庶民的胜利》",
     "desc": "1918年底，李大钊发表《庶民的胜利》和《布尔什维主义的胜利》，这是中国最早的马克思列宁主义文献。",
     "src": {
      "book": "中外历史对比年表",
      "page": 134,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北洋政府派军队开进库伦",
     "desc": "1918年，北洋政府派军队开进库伦，恢复了对外蒙古的主权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 134,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "全俄苏维埃代表大会通过《被剥削劳动人民权利宣言》",
     "desc": "1918年1月，全俄苏维埃代表大会通过了苏俄第一个宪法性文献——《被剥削劳动人民权利宣言》，巩固了十月革命成果。",
     "src": {
      "book": "中外历史对比年表",
      "page": 132,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "俄国",
      "美洲"
     ],
     "title": "美国总统威尔逊在国会讲演中针对苏俄的各项和平建议",
     "desc": "1918年1月8日，美国总统威尔逊在国会讲演中针对苏俄的各项和平建议，提出了被称为“世界和平的纲领”的“十四点原则”，体现了美国对战后国际秩序的设想。",
     "src": {
      "book": "中外历史对比年表",
      "page": 133,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "俄国"
     ],
     "title": "苏俄被迫同德奥集团签订了屈辱的《布列斯特和约》",
     "desc": "1918年3月，苏俄被迫同德奥集团签订了屈辱的《布列斯特和约》，赢得了巩固政权的时间，德国战败后宣布废除。",
     "src": {
      "book": "中外历史对比年表",
      "page": 133,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "俄国"
     ],
     "title": "英军在俄北方港口摩尔曼斯克登陆",
     "desc": "1918年3月，英军在俄北方港口摩尔曼斯克登陆，揭开了帝国主义武装干涉苏俄的序幕。",
     "src": {
      "book": "中外历史对比年表",
      "page": 133,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "协约国军队突破德军防线",
     "desc": "1918年7—9月，协约国军队向德军发起连续进攻，直至突破德军最牢固的防线。",
     "src": {
      "book": "中外历史对比年表",
      "page": 133,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "欧洲"
     ],
     "title": "保加利亚、土耳其、奥匈帝国投降",
     "desc": "1918年9—11月，保加利亚、土耳其、奥匈帝国等先后向协约国投降，退出战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 133,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国十一月革命爆发",
     "desc": "1918年11月3日，德国十一月革命爆发，这是一次以无产阶级为主体的群众革命运动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 133,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "德皇威廉二世宣布退位",
     "desc": "1918年11月9日，德皇威廉二世宣布退位，逃亡荷兰，霍亨索伦王朝统治垮台。",
     "src": {
      "book": "中外历史对比年表",
      "page": 133,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "德国接受协约国停战条件",
     "desc": "1918年11月11日，德国接受协约国停战条件，西线停火生效，一战结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 134,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "奥地利共和国成立",
     "desc": "1918年11月12日，奥地利共和国成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 134,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "捷克斯洛伐克共和国成立",
     "desc": "1918年11月14日，捷克斯洛伐克共和国成立，马萨里克当选为总统。",
     "src": {
      "book": "中外历史对比年表",
      "page": 134,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1918,
     "yearEnd": null,
     "yearLabel": "1918",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "匈牙利正式宣布为共和国",
     "desc": "1918年11月16日，匈牙利正式宣布为共和国，卡罗利当选为总统。",
     "src": {
      "book": "中外历史对比年表",
      "page": 134,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b147",
   "year": 1919,
   "yearLabel": "1919",
   "pages": [
    134,
    135
   ],
   "china": [
    {
     "year": 1919,
     "yearEnd": null,
     "yearLabel": "1919",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "美英法三国会议决定",
     "desc": "1919年4月30日，美英法三国会议决定，将德国在山东的权益全部转交给日本，并在对德和约即《凡尔赛和约》中做了明文规定。",
     "src": {
      "book": "中外历史对比年表",
      "page": 134,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1919,
     "yearEnd": null,
     "yearLabel": "1919",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北京大学等13所学校的3000多学生在天安门前集会、游行示威",
     "desc": "1919年5月4日，北京大学等13所学校的3000多学生在天安门前集会、游行示威，要求惩办卖国贼，拒绝“和约”，五四运动爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 135,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1919,
     "yearEnd": null,
     "yearLabel": "1919",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "“六三”大逮捕",
     "desc": "1919年6月3日，“六三”大逮捕，北京军阀政府逮捕了大批上街讲演的学生，运动开始突破知识分子范围，发展成广泛的群众爱国运动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 135,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1919,
     "yearEnd": null,
     "yearLabel": "1919",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国代表没有出席签字会议",
     "desc": "1919年6月28日，中国代表没有出席签字会议，拒绝了《凡尔赛和约》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 135,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1919,
     "yearEnd": null,
     "yearLabel": "1919",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陈独秀创办的《青年杂志》",
     "desc": "1919年9月15日，陈独秀创办的《青年杂志》，是新文化运动兴起的标志。",
     "src": {
      "book": "中外历史对比年表",
      "page": 135,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1919,
     "yearEnd": null,
     "yearLabel": "1919",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙中山将中华革命党改组为中国国民党",
     "desc": "1919年10月，孙中山将中华革命党改组为中国国民党，以“巩固共和，实行三民主义”为政纲。",
     "src": {
      "book": "中外历史对比年表",
      "page": 135,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1919,
     "yearEnd": null,
     "yearLabel": "1919",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "巴黎和会开幕",
     "desc": "1919年1月18日，巴黎和会开幕，32个国家出席。",
     "src": {
      "book": "中外历史对比年表",
      "page": 134,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1919,
     "yearEnd": null,
     "yearLabel": "1919",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "共产国际成立",
     "desc": "1919年3月，共产国际成立，开辟了国际共产主义运动的新阶段。",
     "src": {
      "book": "中外历史对比年表",
      "page": 134,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1919,
     "yearEnd": null,
     "yearLabel": "1919",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "《凡尔赛和约》（即《协约及参战各国对德和约》）签订",
     "desc": "1919年6月28日，《凡尔赛和约》（即《协约及参战各国对德和约》）签订。",
     "src": {
      "book": "中外历史对比年表",
      "page": 135,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1919,
     "yearEnd": null,
     "yearLabel": "1919",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国国民会议通过新宪法——《魏玛宪法》",
     "desc": "1919年7月31日，德国国民会议通过新宪法——《魏玛宪法》，建立共和国，史称“魏玛共和国”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 135,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1919,
     "yearEnd": 1922,
     "yearLabel": "1919",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼"
     ],
     "title": "土耳其发生革命",
     "desc": "1919—1922年，土耳其发生革命，史称“凯末尔革命”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 135,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b148",
   "year": 1920,
   "yearLabel": "1920",
   "pages": [
    135,
    136
   ],
   "china": [
    {
     "year": 1920,
     "yearEnd": null,
     "yearLabel": "1920",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "直皖战争",
     "desc": "1920年7月，直皖战争，北洋军阀直系和奉系联合对皖系的战争，以皖系失败告终，段祺瑞辞职，日本在华势力有所削弱。",
     "src": {
      "book": "中外历史对比年表",
      "page": 135,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1920,
     "yearEnd": null,
     "yearLabel": "1920",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陈独秀首先在上海成立了中国共产党上海发起组",
     "desc": "1920年8月，陈独秀首先在上海成立了中国共产党上海发起组，把《新青年》改组为机关刊物。",
     "src": {
      "book": "中外历史对比年表",
      "page": 136,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1920,
     "yearEnd": null,
     "yearLabel": "1920",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李大钊发起成立了北京共产党小组",
     "desc": "1920年10月，李大钊发起成立了北京共产党小组，后命名为中国共产党北京支部。",
     "src": {
      "book": "中外历史对比年表",
      "page": 136,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1920,
     "yearEnd": null,
     "yearLabel": "1920",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "董必武、陈潭秋等成立了武汉共产党支部",
     "desc": "1920年秋，董必武、陈潭秋等成立了武汉共产党支部。",
     "src": {
      "book": "中外历史对比年表",
      "page": 136,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1920,
     "yearEnd": null,
     "yearLabel": "1920",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "冬之交",
     "desc": "1920年秋冬之交，毛泽东、何叔衡在长沙发起成立了共产党组织。",
     "src": {
      "book": "中外历史对比年表",
      "page": 136,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1920,
     "yearEnd": null,
     "yearLabel": "1920",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙中山抵广州",
     "desc": "1920年11月，孙中山抵广州，重组军政府，发起第二次护法运动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 136,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1920,
     "yearEnd": null,
     "yearLabel": "1920",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国在匹兹堡建立了世界上第一个广播电台",
     "desc": "1920年，美国在匹兹堡建立了世界上第一个广播电台。",
     "src": {
      "book": "中外历史对比年表",
      "page": 135,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1920,
     "yearEnd": null,
     "yearLabel": "1920",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织",
      "俄国",
      "欧洲",
      "美洲"
     ],
     "title": "《凡尔赛条约》生效",
     "desc": "1920年1月20日，《凡尔赛条约》生效，国际联盟正式成立，战败国和苏俄暂被排除，美国始终未加入。",
     "src": {
      "book": "中外历史对比年表",
      "page": 135,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1920,
     "yearEnd": null,
     "yearLabel": "1920",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "印度"
     ],
     "title": "战胜国与土耳其素丹签订了灭亡土耳其国家的奴役性条约——《色佛尔条约》",
     "desc": "1920年8月，战胜国与土耳其素丹签订了灭亡土耳其国家的奴役性条约——《色佛尔条约》，圣雄甘地为此第一次发动了非暴力不合作运动进行抗议。",
     "src": {
      "book": "中外历史对比年表",
      "page": 136,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1920,
     "yearEnd": 1924,
     "yearLabel": "1920",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "法兰西",
      "欧洲"
     ],
     "title": "法国先后与比利时、波兰、捷克斯洛伐克等国缔结了同盟条约",
     "desc": "1920—1924年，法国先后与比利时、波兰、捷克斯洛伐克等国缔结了同盟条约，从而在欧洲大陆建立了一个主要针对德国的同盟体系。",
     "src": {
      "book": "中外历史对比年表",
      "page": 136,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b149",
   "year": 1921,
   "yearLabel": "1921",
   "pages": [
    136,
    137
   ],
   "china": [
    {
     "year": 1921,
     "yearEnd": null,
     "yearLabel": "1921",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张申府、赵世炎等在法国组成了旅欧共产党巴黎小组",
     "desc": "1921年春，张申府、赵世炎等在法国组成了旅欧共产党巴黎小组。",
     "src": {
      "book": "中外历史对比年表",
      "page": 136,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1921,
     "yearEnd": null,
     "yearLabel": "1921",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国会非常会议和参众两院联合通过《中华民国政府组织大纲》",
     "desc": "1921年4月，国会非常会议和参众两院联合通过《中华民国政府组织大纲》，选举孙中山为中华民国非常大总统。",
     "src": {
      "book": "中外历史对比年表",
      "page": 136,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1921,
     "yearEnd": null,
     "yearLabel": "1921",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国共产党第一次全国代表大会在上海召开",
     "desc": "1921年7月23日，中国共产党第一次全国代表大会在上海召开，中国共产党宣告成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 137,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1921,
     "yearEnd": null,
     "yearLabel": "1921",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国劳动组合书记部成立",
     "desc": "1921年8月，中国劳动组合书记部成立，这是中共公开领导工人运动的机关。",
     "src": {
      "book": "中外历史对比年表",
      "page": 137,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1921,
     "yearEnd": null,
     "yearLabel": "1921",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "欧洲"
     ],
     "title": "苏俄开始从战时共产主义政策向新经济政策过渡",
     "desc": "1921年3月，苏俄开始从战时共产主义政策向新经济政策过渡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 136,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1921,
     "yearEnd": null,
     "yearLabel": "1921",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "华盛顿会议召开",
     "desc": "1921年11月—1922年2月，华盛顿会议，正式议程一是限制海军军备问题，二是太平洋及远东问题。",
     "src": {
      "book": "中外历史对比年表",
      "page": 137,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1921,
     "yearEnd": null,
     "yearLabel": "1921",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "美洲"
     ],
     "title": "美英法日四国签订《关于太平洋区域岛屿属地和领地的条约》",
     "desc": "1921年12月13日，美英法日四国签订《关于太平洋区域岛屿属地和领地的条约》，简称《四国条约》，美国借此埋葬英日同盟，消除了在远东争霸的一个障碍。",
     "src": {
      "book": "中外历史对比年表",
      "page": 137,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b150",
   "year": 1922,
   "yearLabel": "1922",
   "pages": [
    137,
    138,
    139
   ],
   "china": [
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "香港海员大罢工",
     "desc": "1922年1—3月，香港海员大罢工，迫使香港当局接受了海员们提出的要求，取得胜利，推动了全国第一次工人运动高潮的到来。",
     "src": {
      "book": "中外历史对比年表",
      "page": 137,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "在美英压力下",
     "desc": "1922年2月4日，在美英压力下，日本被迫与中国签订《解决山东悬案条约》，胶州由日本独占改为面向各国开放的商埠，原胶济铁路仍为日本控制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 137,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国参加华盛顿会议",
     "desc": "1922年2月6日，中国参加华盛顿会议。与会九国签订《关于中国事件应适用各原则及政策之条约》即《九国公约》，列强确认并同意把“门户开放”、“机会均等”作为共同侵略中国的基本原则。",
     "src": {
      "book": "中外历史对比年表",
      "page": 137,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "第一次直奉战争",
     "desc": "1922年4—6月，直奉战争，奉系败退关外，直系军阀单独控制了北京政府。",
     "src": {
      "book": "中外历史对比年表",
      "page": 138,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "第一次全国劳动大会和中国社会主义青年团第一次全国代表大会在广州召开",
     "desc": "1922年5月，第一次全国劳动大会和中国社会主义青年团第一次全国代表大会在广州召开，讨论了当前中国革命的问题。",
     "src": {
      "book": "中外历史对比年表",
      "page": 138,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国共产党发表《对于时局的主张》",
     "desc": "1922年6月15日，中国共产党发表《对于时局的主张》，提出了以反帝反封建为主要内容的斗争目标。",
     "src": {
      "book": "中外历史对比年表",
      "page": 138,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陈炯明在广州发动武装叛乱",
     "desc": "1922年6月，陈炯明在广州发动武装叛乱，派兵围攻总统府，第二次护法运动失败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 138,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国共产党第二次全国代表大会在上海召开",
     "desc": "1922年7月，中国共产党第二次全国代表大会在上海召开，通过了中共历史上第一部正式的《中国共产党章程》。通过的《大会宣言》，提出了中国共产党的最高纲领和最低纲领。",
     "src": {
      "book": "中外历史对比年表",
      "page": 138,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共中央在杭州西湖召开特别会议",
     "desc": "1922年8月，中共中央在杭州西湖召开特别会议，做出中共党员以个人身份加入国民党以实行党内合作的决定，孙中山接受中共建议，联共政策形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 139,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "安源路矿工人大罢工",
     "desc": "1922年9月，安源路矿工人大罢工，路矿当局接受工人提出的条件，罢工取得胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 139,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "美英法意日五国签订《关于限制海军军备条约》即《五国海军条约》",
     "desc": "1922年2月6日，美英法意日五国签订《关于限制海军军备条约》即《五国海军条约》，承认美英海军力量对等原则，英国海上优势从此终结。",
     "src": {
      "book": "中外历史对比年表",
      "page": 137,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "英格兰"
     ],
     "title": "英国宣布埃及为独立的君主立宪国家",
     "desc": "1922年3月16日，英国宣布埃及为独立的君主立宪国家，使其成为非洲现代史上第一个民族独立国家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 137,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "意大利国王授权国家法西斯党党魁墨索里尼担任总理组阁",
     "desc": "1922年10月，意大利国王授权国家法西斯党党魁墨索里尼担任总理组阁，法西斯党上台执政。",
     "src": {
      "book": "中外历史对比年表",
      "page": 138,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1922,
     "yearEnd": null,
     "yearLabel": "1922",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "欧洲"
     ],
     "title": "在莫斯科召开苏维埃社会主义共和国联盟第一次苏维埃代表大会",
     "desc": "1922年12月30日，在莫斯科召开苏维埃社会主义共和国联盟第一次苏维埃代表大会，通过了苏联成立宣言和联盟条约。",
     "src": {
      "book": "中外历史对比年表",
      "page": 139,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b151",
   "year": 1923,
   "yearLabel": "1923",
   "pages": [
    139,
    140
   ],
   "china": [
    {
     "year": 1923,
     "yearEnd": null,
     "yearLabel": "1923",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙中山发表《中国国民党宣言》",
     "desc": "1923年1月，孙中山发表《中国国民党宣言》，并公布了党纲和党章。",
     "src": {
      "book": "中外历史对比年表",
      "page": 139,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1923,
     "yearEnd": null,
     "yearLabel": "1923",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "苏俄代表越飞与孙中山会见",
     "desc": "1923年1月26日，苏俄代表越飞与孙中山会见，发表《孙文越飞宣言》，表明苏俄对中国革命的支持，孙中山联俄政策形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 139,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1923,
     "yearEnd": null,
     "yearLabel": "1923",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "京汉铁路工人大罢工",
     "desc": "1923年2月，京汉铁路工人大罢工，遭到当局血腥镇压，造成“二七”惨案，全国工人运动暂时转入低潮。",
     "src": {
      "book": "中外历史对比年表",
      "page": 139,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1923,
     "yearEnd": null,
     "yearLabel": "1923",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共在广州召开第三次全国代表大会",
     "desc": "1923年6月，中共在广州召开第三次全国代表大会，制定了建立革命统一战线实行国共合作的方针政策。",
     "src": {
      "book": "中外历史对比年表",
      "page": 139,
      "row": 8,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1923,
     "yearEnd": null,
     "yearLabel": "1923",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "法兰西"
     ],
     "title": "法、比军队以德国未如期偿付赔款为由",
     "desc": "1923年1月，法、比军队以德国未如期偿付赔款为由，出兵占领鲁尔，引发鲁尔危机，最终法国丧失了处理德国问题的主动权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 139,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1923,
     "yearEnd": null,
     "yearLabel": "1923",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼",
      "欧洲"
     ],
     "title": "土耳其凯末尔政府与协约国签订《洛桑条约》",
     "desc": "1923年7月，土耳其凯末尔政府与协约国签订《洛桑条约》，使土耳其获得民族独立，成为战后近东最稳定的国家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 139,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1923,
     "yearEnd": null,
     "yearLabel": "1923",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "奥斯曼",
     "countries": [
      "奥斯曼"
     ],
     "title": "土耳其建立共和国",
     "desc": "1923年10月29日，土耳其建立共和国，凯末尔当选总统，资产阶级革命取得胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 140,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1923,
     "yearEnd": null,
     "yearLabel": "1923",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "纳粹党党魁希特勒趁巴伐利亚邦长官在慕尼黑一家啤酒馆集会时",
     "desc": "1923年11月8日，纳粹党党魁希特勒趁巴伐利亚邦长官在慕尼黑一家啤酒馆集会时，率冲锋队员闯进会场，企图推翻政府未遂，这就是“啤酒馆暴动”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 140,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b152",
   "year": 1924,
   "yearLabel": "1924",
   "pages": [
    140,
    141
   ],
   "china": [
    {
     "year": 1924,
     "yearEnd": null,
     "yearLabel": "1924",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国国民党第一次全国代表大会在广州召开",
     "desc": "1924年1月20日，中国国民党第一次全国代表大会在广州召开，通过《大会宣言》，重新解释了三民主义，确立了联俄、联共、扶助农工的政策，标志国民党改组的完成和国共合作的正式建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 140,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1924,
     "yearEnd": null,
     "yearLabel": "1924",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中苏两国签订《中俄解决悬案大纲协定》和《中俄暂行管理中东铁路协定》",
     "desc": "1924年5月31日，中苏两国签订《中俄解决悬案大纲协定》和《中俄暂行管理中东铁路协定》，确认了废除帝俄时代与中国签订的一切不平等条约的原则。",
     "src": {
      "book": "中外历史对比年表",
      "page": 140,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1924,
     "yearEnd": null,
     "yearLabel": "1924",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "“中国国民党陆军军官学校”师生举行开学典礼",
     "desc": "1924年6月16日，“中国国民党陆军军官学校”师生举行开学典礼，孙中山亲临发表演讲，宣告学校正式成立，因校址在广州郊外的黄埔，史称“黄埔军校”，蒋介石为校长。",
     "src": {
      "book": "中外历史对比年表",
      "page": 141,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1924,
     "yearEnd": null,
     "yearLabel": "1924",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国共两党在广州合作创办了农民运动讲习所",
     "desc": "1924年7月，国共两党在广州合作创办了农民运动讲习所，这是专门培养农民运动干部的学校。",
     "src": {
      "book": "中外历史对比年表",
      "page": 141,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1924,
     "yearEnd": null,
     "yearLabel": "1924",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "第二次直奉战争与北京政变",
     "desc": "1924年9—11月，第二次直奉战争，直系将领冯玉祥从前线倒戈回师，发动北京政变，直系被奉军打败，直系统治被推翻。",
     "src": {
      "book": "中外历史对比年表",
      "page": 141,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1924,
     "yearEnd": null,
     "yearLabel": "1924",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙中山公布《工会条例》",
     "desc": "1924年10月，孙中山公布《工会条例》，这是中国历史上第一个比较完善的有关工人权利的民主法令。",
     "src": {
      "book": "中外历史对比年表",
      "page": 141,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1924,
     "yearEnd": null,
     "yearLabel": "1924",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "段祺瑞就任中华民国临时执政",
     "desc": "1924年11月24日，段祺瑞就任中华民国临时执政，建立新的军阀官僚政权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 141,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1924,
     "yearEnd": null,
     "yearLabel": "1924",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国工党领袖麦克唐纳组成英国历史上第一届工党政府",
     "desc": "1924年1月，英国工党领袖麦克唐纳组成英国历史上第一届工党政府，工党走上执政党的地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 140,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1924,
     "yearEnd": null,
     "yearLabel": "1924",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "苏联第二次苏维埃代表大会批准了苏联宪法",
     "desc": "1924年1月，苏联第二次苏维埃代表大会批准了苏联宪法，从法律上把苏维埃共和国联盟的形式固定下来。",
     "src": {
      "book": "中外历史对比年表",
      "page": 140,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1924,
     "yearEnd": null,
     "yearLabel": "1924",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "美洲"
     ],
     "title": "美国银行家道威斯领导的委员会",
     "desc": "1924年4月，美国银行家道威斯领导的委员会，提出关于解决德国赔款问题的报告，即“道威斯计划”，德国赔款问题暂获解决。",
     "src": {
      "book": "中外历史对比年表",
      "page": 140,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1924,
     "yearEnd": null,
     "yearLabel": "1924",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "第五届国联大会开幕",
     "desc": "1924年9月，第五届国联大会开幕，英国首相麦克唐纳提出建立仲裁制度。",
     "src": {
      "book": "中外历史对比年表",
      "page": 141,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1924,
     "yearEnd": null,
     "yearLabel": "1924",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "俄国"
     ],
     "title": "法国政府致电莫斯科",
     "desc": "1924年10月，法国政府致电莫斯科，表示承认苏联政府，法苏两国正式建立外交关系。",
     "src": {
      "book": "中外历史对比年表",
      "page": 141,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b153",
   "year": 1925,
   "yearLabel": "1925",
   "pages": [
    141,
    142,
    143
   ],
   "china": [
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共“四大”在上海召开",
     "desc": "1925年1月，中共“四大”在上海召开，初步提出了工农联盟的思想。",
     "src": {
      "book": "中外历史对比年表",
      "page": 141,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "广东革命政府第一次东征",
     "desc": "1925年2月，广东革命政府第一次东征，打垮了陈炯明主力，取得胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 141,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "孙中山在北京逝世",
     "desc": "1925年3月12日，孙中山在北京逝世。",
     "src": {
      "book": "中外历史对比年表",
      "page": 142,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "第二次全国劳动大会成立了中华全国总工会",
     "desc": "1925年5月，第二次全国劳动大会成立了中华全国总工会，作为领导工人斗争的全国统一的领导机关，中国劳动组合书记部撤销。",
     "src": {
      "book": "中外历史对比年表",
      "page": 142,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "上海英租界当局命令巡捕开枪射击示威群众",
     "desc": "1925年5月30日，上海英租界当局命令巡捕开枪射击示威群众，制造了震惊中外的“五卅惨案”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 142,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中华民国国民政府正式成立",
     "desc": "1925年7月1日，中华民国国民政府正式成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 142,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民党左派重要代表人物廖仲恺被右派刺杀",
     "desc": "1925年8月，国民党左派重要代表人物廖仲恺被右派刺杀。",
     "src": {
      "book": "中外历史对比年表",
      "page": 142,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民政府第二次东征",
     "desc": "1925年10—11月，国民政府第二次东征，彻底肃清了广东境内的军阀势力，取得胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 142,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民党一些右派分子在北京西山碧云寺非法召开所谓国民党“一届四中全会”",
     "desc": "1925年11月，国民党一些右派分子在北京西山碧云寺非法召开所谓国民党“一届四中全会”，公开分裂国民党，这次会议被称为“西山会议”，参会者被称为“西山会议派”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 142,
      "row": 9,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日苏签订《关于规定两国关系基本原则的条约》",
     "desc": "1925年1月，日苏签订《关于规定两国关系基本原则的条约》，建立外交关系，日本从北库页岛撤兵。",
     "src": {
      "book": "中外历史对比年表",
      "page": 141,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国老牌军国主义分子兴登堡当选总统",
     "desc": "1925年4月，德国老牌军国主义分子兴登堡当选总统，表明德国军国主义和帝国主义的复活。",
     "src": {
      "book": "中外历史对比年表",
      "page": 142,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "欧洲"
     ],
     "title": "俄共（布）第十四次全国代表会议",
     "desc": "1925年4月，俄共（布）第十四次全国代表会议，斯大林提出苏联一国可以建成社会主义的理论。",
     "src": {
      "book": "中外历史对比年表",
      "page": 142,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "德比法英意波捷七国在瑞士小城洛迦诺举行国际会议",
     "desc": "1925年10月，德比法英意波捷七国在瑞士小城洛迦诺举行国际会议，签署《洛迦诺公约》，改善了协约国尤其是法德的关系，欧洲国际关系进入相对稳定时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 142,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1925,
     "yearEnd": null,
     "yearLabel": "1925",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "俄共（布）第十四次代表大会",
     "desc": "1925年12月，俄共（布）第十四次代表大会，斯大林提出要把俄国“从农业国变成能自力生产必需的装备的工业国”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 143,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b154",
   "year": 1926,
   "yearLabel": "1926",
   "pages": [
    143
   ],
   "china": [
    {
     "year": 1926,
     "yearEnd": null,
     "yearLabel": "1926",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民政府进行南征",
     "desc": "1926年2月，国民政府进行南征，歼灭了粤南军阀，统一了广东革命根据地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 143,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1926,
     "yearEnd": null,
     "yearLabel": "1926",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "发生“中山舰事件”",
     "desc": "1926年3月20日，发生“中山舰事件”，蒋介石借机排挤共产党，完全控制了第一军。",
     "src": {
      "book": "中外历史对比年表",
      "page": 143,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1926,
     "yearEnd": null,
     "yearLabel": "1926",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民党二届二中全会",
     "desc": "1926年5月，国民党二届二中全会，蒋介石提出所谓“整理党务案”，对共产党员在国民党内的任职和活动做出了限制，原任国民党中央部长职务的共产党员全部离职。",
     "src": {
      "book": "中外历史对比年表",
      "page": 143,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1926,
     "yearEnd": null,
     "yearLabel": "1926",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "为结束北洋军阀的黑暗统治",
     "desc": "1926年7月9日，为结束北洋军阀的黑暗统治，国民政府任命蒋介石为国民革命军总司令，出师北伐。",
     "src": {
      "book": "中外历史对比年表",
      "page": 143,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1926,
     "yearEnd": null,
     "yearLabel": "1926",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "上海工人三次武装起义",
     "desc": "1926年10月—1927年3月，上海工人先后三次举行武装起义，最终取得胜利，解放了上海。",
     "src": {
      "book": "中外历史对比年表",
      "page": 143,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1926,
     "yearEnd": null,
     "yearLabel": "1926",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国参议院批准美国加入海牙国际常设法庭",
     "desc": "1926年1月，美国参议院批准美国加入海牙国际常设法庭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 143,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1926,
     "yearEnd": null,
     "yearLabel": "1926",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国人戈达德成功地发射了世界上第一枚液体火箭",
     "desc": "1926年3月，美国人戈达德成功地发射了世界上第一枚液体火箭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 143,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1926,
     "yearEnd": null,
     "yearLabel": "1926",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "万国博览会在美国费城开幕",
     "desc": "1926年6月，万国博览会在美国费城开幕。",
     "src": {
      "book": "中外历史对比年表",
      "page": 143,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1926,
     "yearEnd": null,
     "yearLabel": "1926",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国正式加入国联",
     "desc": "1926年9月，德国正式加入国联，并成为行政院常任理事国，重新跻身于西方大国行列。",
     "src": {
      "book": "中外历史对比年表",
      "page": 143,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1926,
     "yearEnd": null,
     "yearLabel": "1926",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国召开帝国会议",
     "desc": "1926年10月，英国召开帝国会议，承认自治领在内政和外交方面拥有独立地位，在法律上与英国平等。",
     "src": {
      "book": "中外历史对比年表",
      "page": 143,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b155",
   "year": 1927,
   "yearLabel": "1927",
   "pages": [
    144,
    145
   ],
   "china": [
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民政府迁都武汉",
     "desc": "1927年1月1日，国民政府迁都武汉。",
     "src": {
      "book": "中外历史对比年表",
      "page": 144,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民政府收回汉口、九江英租界",
     "desc": "1927年2月，国民政府收回汉口、九江英租界，这是中国人民反帝斗争史上的一次巨大胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 144,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "毛泽东发表《湖南农民运动考察报告》",
     "desc": "1927年3月，毛泽东发表《湖南农民运动考察报告》，为农民运动的开展提供了理论指导。",
     "src": {
      "book": "中外历史对比年表",
      "page": 144,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北伐军先后消灭了吴佩孚、孙传芳两大军阀主力部队",
     "desc": "1927年3月，北伐军先后消灭了吴佩孚、孙传芳两大军阀主力部队，从广东打到武汉、南京、上海，使革命区域由珠江流域扩展到长江流域，席卷半个中国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 144,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "“四·一二”反革命政变",
     "desc": "1927年4月12日，“四·一二”反革命政变，蒋介石国民党反动派在上海查封革命组织，捕杀共产党员和革命群众。",
     "src": {
      "book": "中外历史对比年表",
      "page": 144,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒋介石在南京宣布国民政府成立",
     "desc": "1927年4月18日，蒋介石在南京宣布国民政府成立，宁汉对抗局面形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 144,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共中央进行改组",
     "desc": "1927年7月12日，中共中央进行改组，停止了中央委员会总书记陈独秀的领导。",
     "src": {
      "book": "中外历史对比年表",
      "page": 144,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "汪精卫召开国民党中央常务委员会会议",
     "desc": "1927年7月15日，汪精卫召开国民党中央常务委员会会议，讨论“分共”问题，通过三项决议，这就是“七·一五”政变，第一次国共合作最终破裂，国民革命失败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 145,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "周恩来、贺龙等领导南昌起义",
     "desc": "1927年8月1日，周恩来、贺龙等领导南昌起义，打响了武装反抗国民党反动派的第一枪，标志着中国共产党独立地创造革命军队和领导革命组织的开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 145,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共中央在湖北汉口召开紧急会议",
     "desc": "1927年8月7日，中共中央在湖北汉口召开紧急会议，确定了土地革命与武装反抗国民党反动派的总方针，成立新的中央临时政治局，史称“八七会议”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 145,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "彭湃领导的海陆丰农民起义",
     "desc": "1927年11月，彭湃领导的海陆丰农民起义，分别组建了工农兵代表大会与县苏维埃政府。",
     "src": {
      "book": "中外历史对比年表",
      "page": 145,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1926,
     "yearEnd": 1927,
     "yearLabel": "1926",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "德意志",
      "法兰西",
      "罗斯",
      "俄国"
     ],
     "title": "法国先后同罗马尼亚和南斯拉夫缔结友好条约",
     "desc": "1926—1927年，法国先后同罗马尼亚和南斯拉夫缔结友好条约，以抑制德国，反对苏联。",
     "src": {
      "book": "中外历史对比年表",
      "page": 144,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国电话电报公司开设了美国第一个长距离电视广播",
     "desc": "1927年4月，美国电话电报公司开设了美国第一个长距离电视广播。",
     "src": {
      "book": "中外历史对比年表",
      "page": 144,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本内阁抛出“田中奏折”与大陆政策",
     "desc": "1927年7月，日本内阁抛出“田中奏折”与大陆政策，将其征服中国、亚洲以至称霸世界的侵略步骤具体化。",
     "src": {
      "book": "中外历史对比年表",
      "page": 144,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "世界上第一架电动呼吸器（铁肺）在美国纽约市一家医院投入使用",
     "desc": "1927年7月，世界上第一架电动呼吸器（铁肺）在美国纽约市一家医院投入使用。",
     "src": {
      "book": "中外历史对比年表",
      "page": 145,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "美英日在瑞士日内瓦举行三国海军裁军会议",
     "desc": "1927年8月，美英日在瑞士日内瓦举行三国海军裁军会议。",
     "src": {
      "book": "中外历史对比年表",
      "page": 145,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "世界第一条水下隧道在美国建成通车",
     "desc": "1927年11月，世界第一条水下隧道在美国建成通车。",
     "src": {
      "book": "中外历史对比年表",
      "page": 145,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1927,
     "yearEnd": null,
     "yearLabel": "1927",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国承认伊拉克独立",
     "desc": "1927年12月，英国承认伊拉克独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 145,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b156",
   "year": 1928,
   "yearLabel": "1928",
   "pages": [
    145,
    146
   ],
   "china": [
    {
     "year": 1928,
     "yearEnd": null,
     "yearLabel": "1928",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民革命军进行第二次北伐",
     "desc": "1928年4月，国民革命军进行第二次北伐，以彻底消灭张作霖的势力，实现中国统一。",
     "src": {
      "book": "中外历史对比年表",
      "page": 145,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1928,
     "yearEnd": null,
     "yearLabel": "1928",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张作霖的专列在沈阳近郊皇姑屯被日本关东军炸毁",
     "desc": "1928年6月4日，张作霖的专列在沈阳近郊皇姑屯被日本关东军炸毁，张重伤不治身亡，史称“皇姑屯事件”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 146,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1928,
     "yearEnd": null,
     "yearLabel": "1928",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张学良宣布就任东三省保安总司令兼奉天保安司令职务",
     "desc": "1928年7月，张学良宣布就任东三省保安总司令兼奉天保安司令职务，确立了自己在东北三省的领袖地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 146,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1928,
     "yearEnd": null,
     "yearLabel": "1928",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张学良宣布",
     "desc": "1928年12月29日，张学良宣布，遵守三民主义，服从国民政府。中国至此初步获得了形式上的统一与稳定。",
     "src": {
      "book": "中外历史对比年表",
      "page": 146,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1928,
     "yearEnd": 1930,
     "yearLabel": "1928",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共在全国各地建立起大小十几块农村革命根据地",
     "desc": "1928—1930年，中共在全国各地建立起大小十几块农村革命根据地，分布在赣、闽、湘、鄂、桂、粤、徽、浙、陕等省份。",
     "src": {
      "book": "中外历史对比年表",
      "page": 146,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1928,
     "yearEnd": null,
     "yearLabel": "1928",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "毛泽东阐述工农武装割据思想",
     "desc": "1928年，毛泽东先后撰写《中国的红色政权为什么能够存在？》《井冈山的斗争》等文章，创造性地提出并阐明了工农武装割据的思想。",
     "src": {
      "book": "中外历史对比年表",
      "page": 146,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1928,
     "yearEnd": 1936,
     "yearLabel": "1928",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国建造了著名的阵地工事——马其诺防线",
     "desc": "1928—1936年，法国建造了著名的阵地工事——马其诺防线，以使法国在防御上固若金汤。",
     "src": {
      "book": "中外历史对比年表",
      "page": 145,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1928,
     "yearEnd": null,
     "yearLabel": "1928",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "15国在巴黎签订《非战公约》",
     "desc": "1928年8月27日，德美法英等15国在巴黎签订了《关于废弃战争作为国家政策工具的一般条约》，即《非战公约》，第一次正式宣布在国家关系中放弃以战争作为实行国家政策的工具，从而在国际法上奠定了互不侵犯原则的法律基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 146,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1928,
     "yearEnd": null,
     "yearLabel": "1928",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "俄国",
      "美洲"
     ],
     "title": "俄国出生的美国发明家兹沃里金研制成功电视显像管",
     "desc": "1928年，俄国出生的美国发明家兹沃里金研制成功电视显像管。",
     "src": {
      "book": "中外历史对比年表",
      "page": 146,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1928,
     "yearEnd": null,
     "yearLabel": "1928",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国细菌学家弗莱明成功研制青霉素",
     "desc": "1928年，英国细菌学家弗莱明成功研制青霉素。",
     "src": {
      "book": "中外历史对比年表",
      "page": 146,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b157",
   "year": 1929,
   "yearLabel": "1929",
   "pages": [
    146,
    147
   ],
   "china": [
    {
     "year": 1929,
     "yearEnd": null,
     "yearLabel": "1929",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "毛泽东、朱德、陈毅率领红四军主力进军赣南",
     "desc": "1929年1月，毛泽东、朱德、陈毅率领红四军主力进军赣南，相继开辟赣南、闽西革命根据地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 146,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1929,
     "yearEnd": null,
     "yearLabel": "1929",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "邓小平、张云逸等领导广西百色起义",
     "desc": "1929年12月，邓小平、张云逸等领导广西百色起义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 147,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1929,
     "yearEnd": null,
     "yearLabel": "1929",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国广播公司开始试播电视",
     "desc": "1929年，英国广播公司开始试播电视。",
     "src": {
      "book": "中外历史对比年表",
      "page": 146,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1929,
     "yearEnd": null,
     "yearLabel": "1929",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "德国重新成为欧洲首屈一指的经济大国",
     "desc": "1929年，德国重新成为欧洲首屈一指的经济大国，为其在政治上重新走进西方大国行列和进一步摆脱《凡尔赛条约》束缚打下基础。",
     "src": {
      "book": "中外历史对比年表",
      "page": 147,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1929,
     "yearEnd": null,
     "yearLabel": "1929",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "印度国大党首次提出争取印度完全独立的口号",
     "desc": "1929年12月，印度国大党首次提出争取印度完全独立的口号，开展了第二次不合作运动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 147,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1929,
     "yearEnd": 1933,
     "yearLabel": "1929",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织"
     ],
     "title": "世界资本主义经济危机",
     "desc": "1929—1933年，世界资本主义经济危机。",
     "src": {
      "book": "中外历史对比年表",
      "page": 147,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b158",
   "year": 1930,
   "yearLabel": "1930",
   "pages": [
    147,
    148
   ],
   "china": [
    {
     "year": 1930,
     "yearEnd": null,
     "yearLabel": "1930",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国左翼作家联盟成立",
     "desc": "1930年3月2日，中国左翼作家联盟成立，简称“左联”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 147,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1930,
     "yearEnd": null,
     "yearLabel": "1930",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中原大战",
     "desc": "1930年5—10月，冯玉祥、阎锡山、李宗仁联合反蒋的“中原大战”，以蒋介石获胜告终。",
     "src": {
      "book": "中外历史对比年表",
      "page": 147,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1930,
     "yearEnd": null,
     "yearLabel": "1930",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中央苏区红军三次反“围剿”",
     "desc": "1930年10月—1931年9月，中央苏区红军先后三次粉碎国民党军的“围剿”，使红军和根据地都得到了很大发展。",
     "src": {
      "book": "中外历史对比年表",
      "page": 147,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1931,
     "yearEnd": null,
     "yearLabel": "1931",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "汪精卫等在广州成立国民党执监委员会非常会议与国民政府",
     "desc": "1931年5月28日，汪精卫等在广州成立国民党执监委员会非常会议与国民政府，与以蒋介石为首的南京国民政府公开对立，史称“宁粤对立”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 147,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1931,
     "yearEnd": null,
     "yearLabel": "1931",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日本关东军在沈阳北郊的柳条湖附近炸毁南满铁路一段路轨",
     "desc": "1931年9月18日，日本关东军在沈阳北郊的柳条湖附近炸毁南满铁路一段路轨，嫁祸中国东北军，并以此为借口向中国军队驻地发起攻击，史称“九·一八”事变。",
     "src": {
      "book": "中外历史对比年表",
      "page": 148,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1931,
     "yearEnd": null,
     "yearLabel": "1931",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中华苏维埃共和国临时中央政府时期",
     "desc": "1931年11月—1934年10月，江西瑞金中华苏维埃共和国临时中央政府时期，这个以工农为主体的人民民主政权，是中共领导与管理国家的初步尝试。",
     "src": {
      "book": "中外历史对比年表",
      "page": 148,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1931,
     "yearEnd": null,
     "yearLabel": "1931",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "召开中华苏维埃第一次全国工农兵代表大会",
     "desc": "1931年11月，召开中华苏维埃第一次全国工农兵代表大会，选举产生了苏维埃中央政府。",
     "src": {
      "book": "中外历史对比年表",
      "page": 148,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1930,
     "yearEnd": null,
     "yearLabel": "1930",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "甘地带领80名非暴力反抗者",
     "desc": "1930年3月，甘地带领80名非暴力反抗者，行程240英里徒步前往西海岸，自取海水制盐，以示破坏食盐专卖法，这次象征性的挑战，被称为“食盐长征”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 147,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1930,
     "yearEnd": null,
     "yearLabel": "1930",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "协约国军队撤出德国领土",
     "desc": "1930年6月底，协约国军队全部撤出德国领土。",
     "src": {
      "book": "中外历史对比年表",
      "page": 147,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1931,
     "yearEnd": null,
     "yearLabel": "1931",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "奥地利信贷银行破产",
     "desc": "1931年5月，奥地利信贷银行破产，标志着欧洲金融信贷危机的开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 147,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1931,
     "yearEnd": null,
     "yearLabel": "1931",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "美洲"
     ],
     "title": "英国和英联邦国家陆续联合起来",
     "desc": "1931年11月，英国和英联邦国家陆续联合起来，组成英镑集团。",
     "src": {
      "book": "中外历史对比年表",
      "page": 148,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1931,
     "yearEnd": null,
     "yearLabel": "1931",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国议会通过《威斯敏斯特法》",
     "desc": "1931年12月，英国议会通过《威斯敏斯特法》，批准了1926年帝国会议的决议。",
     "src": {
      "book": "中外历史对比年表",
      "page": 148,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b159",
   "year": 1932,
   "yearLabel": "1932",
   "pages": [
    148,
    149
   ],
   "china": [
    {
     "year": 1932,
     "yearEnd": null,
     "yearLabel": "1932",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "“一·二八”事变",
     "desc": "1932年1月28日，“一·二八”事变，日军蓄意进攻上海驻军，中国军队被迫奋起反抗，最终以败退告终，日军也受到重创。",
     "src": {
      "book": "中外历史对比年表",
      "page": 148,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1932,
     "yearEnd": null,
     "yearLabel": "1932",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日本扶植成立“满洲国”",
     "desc": "1932年3月1日，日本扶植成立“满洲国”，以长春为“首都”，溥仪出任“执政”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 148,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1932,
     "yearEnd": null,
     "yearLabel": "1932",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "施陶丁格发表《高分子有机化合物》",
     "desc": "1932年，德国高分子化学家施陶丁格发表了第一部高分子化学论著《高分子有机化合物》，标志高分子化学这一新学科的诞生。",
     "src": {
      "book": "中外历史对比年表",
      "page": 148,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1932,
     "yearEnd": null,
     "yearLabel": "1932",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "美洲"
     ],
     "title": "英国在渥太华举行英联邦会议",
     "desc": "1932年，英国在渥太华举行英联邦会议，决定在英帝国内部建立关税优惠制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 148,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1932,
     "yearEnd": null,
     "yearLabel": "1932",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国纳粹党成为议会第一大党",
     "desc": "1932年，德国纳粹党成为议会第一大党。",
     "src": {
      "book": "中外历史对比年表",
      "page": 149,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1932,
     "yearEnd": null,
     "yearLabel": "1932",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本发生“五·一五”事件",
     "desc": "1932年5月15日，日本发生“五·一五”事件，以士官学校学生为主体的陆海军法西斯分子袭击首相官邸、警视厅、日本银行等，首相犬养毅被杀。日本的政党内阁时期结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 149,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b160",
   "year": 1933,
   "yearLabel": "1933",
   "pages": [
    149,
    150,
    151
   ],
   "china": [
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民党第四次“围剿”失败",
     "desc": "1933年1—3月，国民党对中央苏区发动第四次“围剿”，以失败告终。",
     "src": {
      "book": "中外历史对比年表",
      "page": 149,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "川陕苏维埃政府在四川通江县成立",
     "desc": "1933年2月7日，川陕苏维埃政府在四川通江县成立，川陕苏区发展成仅次于中央苏区的新苏区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 149,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日军大举进攻热河",
     "desc": "1933年2月21日，日军大举进攻热河，驻扎热河的东北军放弃抵抗，十余日时间全省宣告沦陷。",
     "src": {
      "book": "中外历史对比年表",
      "page": 149,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日军向长城各口大举进攻",
     "desc": "1933年3月，日军向长城各口大举进攻，中国军队奋起进行长城抗战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 149,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "冯玉祥、吉鸿昌等爱国将领在张家口建立察哈尔抗日同盟军",
     "desc": "1933年5月26日，冯玉祥、吉鸿昌等爱国将领在张家口建立察哈尔抗日同盟军，举起抗日大旗。",
     "src": {
      "book": "中外历史对比年表",
      "page": 150,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "长城抗战后",
     "desc": "1933年5月31日，长城抗战后，中日签订《塘沽协定》，规定冀东地区为“非武装区”，整个华北门户洞开。",
     "src": {
      "book": "中外历史对比年表",
      "page": 150,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共满洲省委根据中共中央的指示精神",
     "desc": "1933年9月，中共满洲省委根据中共中央的指示精神，对东北抗日游击队整编，组成东北人民革命军，成为东北抗日游击战争的主力。",
     "src": {
      "book": "中外历史对比年表",
      "page": 150,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "李济深等人以第十九路军为主力",
     "desc": "1933年11月20日，李济深等人以第十九路军为主力，在福建举兵抗日反蒋，史称“福建事变”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 150,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1934,
     "yearEnd": null,
     "yearLabel": "1934",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日本把“满洲国”改称“满洲帝国”",
     "desc": "1934年3月，日本把“满洲国”改称“满洲帝国”，溥仪由“执政”改称“皇帝”，年号改为“康德”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 151,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1934,
     "yearEnd": null,
     "yearLabel": "1934",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "第五次反“围剿”失败后",
     "desc": "1934年10月10日，第五次反“围剿”失败后，中共中央、中国革命军事委员会从瑞金出发，率领主力红军和中央、军委直属的8万余人，向湘西实行战略转移。",
     "src": {
      "book": "中外历史对比年表",
      "page": 151,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "苏联医生费拉托夫移植异体角膜成功",
     "desc": "1933年，苏联医生费拉托夫移植异体角膜成功，这是器官移植成功的第一个案例。",
     "src": {
      "book": "中外历史对比年表",
      "page": 149,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国总统兴登堡任命希特勒为总理",
     "desc": "1933年1月30日，德国总统兴登堡任命希特勒为总理，魏玛共和国告终，德国进入法西斯专政时期。",
     "src": {
      "book": "中外历史对比年表",
      "page": 149,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德国国会通过《授权法》",
     "desc": "1933年3月，德国国会通过《授权法》，授予希特勒政府以为期四年的独裁权力，在此期间，政府无需国会和参议院同意就有权颁布法律。此后，议会名存实亡，资产阶级议会民主制在德国不复存在。",
     "src": {
      "book": "中外历史对比年表",
      "page": 149,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "罗斯",
      "美洲"
     ],
     "title": "罗斯福推行“百日新政”",
     "desc": "1933年3月9日—6月16日，美国国会应总统罗斯福的要求，制定了一系列应急立法，被称为“百日新政”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 150,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国国会通过《紧急银行法案》",
     "desc": "1933年3月9日，美国国会通过《紧急银行法案》，授权总统对银行进行个别审理。",
     "src": {
      "book": "中外历史对比年表",
      "page": 150,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "罗斯",
      "美洲"
     ],
     "title": "美国国会颁布《农业调整法》",
     "desc": "1933年5月12日，美国国会颁布《农业调整法》，这是罗斯福企图对全国农产品的生产和销售进行调节的尝试。",
     "src": {
      "book": "中外历史对比年表",
      "page": 150,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国国会通过《全国工业复兴法》",
     "desc": "1933年6月16日，美国国会通过《全国工业复兴法》，企图依靠国家和垄断组织联合的力量，把资本主义生产的无政府状态纳入有控制的轨道。",
     "src": {
      "book": "中外历史对比年表",
      "page": 150,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织",
      "德意志"
     ],
     "title": "德国宣布退出裁军会议和国际联盟",
     "desc": "1933年10月，德国宣布退出裁军会议和国际联盟，毫不掩饰地进行扩军。",
     "src": {
      "book": "中外历史对比年表",
      "page": 150,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1933,
     "yearEnd": null,
     "yearLabel": "1933",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "美洲"
     ],
     "title": "苏联与美国互换照会",
     "desc": "1933年11月，苏联与美国互换照会，决定建立两国间外交关系。",
     "src": {
      "book": "中外历史对比年表",
      "page": 150,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1934,
     "yearEnd": null,
     "yearLabel": "1934",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "东南亚",
      "美洲"
     ],
     "title": "美国等国组成美元集团",
     "desc": "1934年，美国及其属地、菲律宾、加拿大及大多数拉美国家组成美元集团（1939年改称美元区）。",
     "src": {
      "book": "中外历史对比年表",
      "page": 151,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1934,
     "yearEnd": null,
     "yearLabel": "1934",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国右派势力和法西斯组织纠集一些暴徒冲击国民议会",
     "desc": "1934年2月6日，法国右派势力和法西斯组织纠集一些暴徒冲击国民议会，与警察发生冲突，但法西斯分子妄图解散议会、夺取政权的阴谋未能得逞。",
     "src": {
      "book": "中外历史对比年表",
      "page": 151,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1934,
     "yearEnd": null,
     "yearLabel": "1934",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "经过所谓的公民投票",
     "desc": "1934年8月，经过所谓的公民投票，希特勒成为“元首兼国家总理”，集党政军大权于一身。",
     "src": {
      "book": "中外历史对比年表",
      "page": 151,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b161",
   "year": 1935,
   "yearLabel": "1935",
   "pages": [
    151,
    152,
    153
   ],
   "china": [
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "遵义会议",
     "desc": "1935年1月15—17日，遵义会议，总结了第五次反“围剿”的经验教训，结束了“左”倾冒险主义在党中央的统治，确立了毛泽东在红军和党中央的领导地位。",
     "src": {
      "book": "中外历史对比年表",
      "page": 151,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中央红军与从川陕苏区退出的红四方面军在四川懋功会师",
     "desc": "1935年6月中旬，中央红军与从川陕苏区退出的红四方面军在四川懋功会师。",
     "src": {
      "book": "中外历史对比年表",
      "page": 151,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共驻共产国际代表团以中华苏维埃政府和中共中央的名义",
     "desc": "1935年8月1日，中共驻共产国际代表团以中华苏维埃政府和中共中央的名义，发表了《为抗日救国告全体同胞书》，又称《八一宣言》，号召停止内战，一致抗日。",
     "src": {
      "book": "中外历史对比年表",
      "page": 152,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "毛泽东与中共中央率领部分红军到达陕北吴起镇",
     "desc": "1935年10月19日，毛泽东与中共中央率领部分红军到达陕北吴起镇，先期结束了长征。",
     "src": {
      "book": "中外历史对比年表",
      "page": 152,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "驻华日军为进一步侵略中国而策动华北各省脱离南京中央政府",
     "desc": "1935年，驻华日军为进一步侵略中国而策动华北各省脱离南京中央政府，实行“自治”，制造了一系列事件，统称“华北事变”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 152,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北京数千名青年学生举行声势浩大的抗日救亡游行",
     "desc": "1935年12月9日，北京数千名青年学生举行声势浩大的抗日救亡游行，向国民党北平当局请愿，遭到国民党军警镇压，史称“一二·九”运动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 152,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共瓦窑堡会议",
     "desc": "1935年12月17—25日，中共瓦窑堡会议，总结了两次国内革命战争的基本经验，批评了“左”倾关门主义，制定了抗日民族统一战线的策略路线，推动了全国抗日民主运动的发展。",
     "src": {
      "book": "中外历史对比年表",
      "page": 153,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲",
      "非洲"
     ],
     "title": "意大利侵略埃塞俄比亚",
     "desc": "1935年，意大利侵略埃塞俄比亚，在非洲和地中海区域打破了凡尔赛体系。",
     "src": {
      "book": "中外历史对比年表",
      "page": 151,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "德国公开撕毁《凡尔赛条约》限制德国军备的条款",
     "desc": "1935年3月，德国公开撕毁《凡尔赛条约》限制德国军备的条款，宣布实行普遍兵役制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 151,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "俄国",
      "欧洲"
     ],
     "title": "苏联先后同法国、捷克斯洛伐克签订《互助条约》",
     "desc": "1935年5月，苏联先后同法国、捷克斯洛伐克签订《互助条约》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 151,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "英格兰",
      "欧洲"
     ],
     "title": "英德签订《海军协定》",
     "desc": "1935年6月，英德签订《海军协定》，英国与德国一起破坏了《凡尔赛条约》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 151,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国国会通过《全国劳工关系法》",
     "desc": "1935年6月27日，美国国会通过《全国劳工关系法》，即《华格纳法》，这是“新政”中最剧烈的立法革新之一，用政府的力量支持劳工的集体谈判权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 152,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国国会通过《社会保险法》",
     "desc": "1935年8月，美国国会通过《社会保险法》，改变过去由民间团体自助自救或由慈善团体提供救助的传统，开始了美国的“福利主义”试验。",
     "src": {
      "book": "中外历史对比年表",
      "page": 152,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1935,
     "yearEnd": null,
     "yearLabel": "1935",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲",
      "非洲"
     ],
     "title": "意大利吞并埃塞俄比亚",
     "desc": "1935年10月—1936年5月，意大利侵略、吞并埃塞俄比亚，意大利国王自封为埃塞俄比亚皇帝。",
     "src": {
      "book": "中外历史对比年表",
      "page": 152,
      "row": 4,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b162",
   "year": 1936,
   "yearLabel": "1936",
   "pages": [
    153,
    154
   ],
   "china": [
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "上海各界救国联合会成立",
     "desc": "1936年1月28日，上海各界救国联合会成立，沈钧儒为主席，统一领导上海的抗日救国运动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 153,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "全国各界救国联合会在上海成立",
     "desc": "1936年5月，全国各界救国联合会在上海成立，任务是促成全国各实力派合作抗敌。",
     "src": {
      "book": "中外历史对比年表",
      "page": 153,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "埃德加·斯诺来到陕北",
     "desc": "1936年6月，埃德加·斯诺来到陕北，采访中国共产党和红军领导人后，撰写成《红星照耀中国》（又名《西行漫记》）一书。",
     "src": {
      "book": "中外历史对比年表",
      "page": 153,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "红二、四方面军先后在甘肃会宁县和静宁县与红一方面军会师",
     "desc": "1936年10月，红二、四方面军先后在甘肃会宁县和静宁县与红一方面军会师，至此，红军长征结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 154,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民政府以所谓的“危害民国”罪名",
     "desc": "1936年11月23日，国民政府以所谓的“危害民国”罪名，逮捕了全国各界救国联合会领袖沈钧儒、章乃器、邹韬奋、李公朴、王造时、沙千里、史良七人，制造了“七君子事件”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 154,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "张学良、杨虎城在西安实行兵谏",
     "desc": "1936年12月12日，张学良、杨虎城在西安实行兵谏，迫使蒋介石同意停止内战，联共抗日，这就是“西安事变”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 154,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本发生“二·二六”事件",
     "desc": "1936年2月26日，日本发生“二·二六”事件，陆军法西斯派别皇道派的青年军官发动叛乱，要求解散议会，建立“维新内阁”，后被镇压。",
     "src": {
      "book": "中外历史对比年表",
      "page": 153,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "德军进驻莱茵非军事区",
     "desc": "1936年3月7日，德军进驻莱茵非军事区，单方面废除了《凡尔赛条约》和《洛迦诺公约》相关条款。",
     "src": {
      "book": "中外历史对比年表",
      "page": 153,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "欧洲"
     ],
     "title": "苏联制定新宪法",
     "desc": "1936年5月，苏联制定新宪法，宣告第一个社会主义国家建成，也标志斯大林创建的经济政治体制的形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 153,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "朝鲜半岛",
     "countries": [
      "朝鲜半岛"
     ],
     "title": "金日成在朝鲜建立抗日民族统一战线组织——祖国光复会",
     "desc": "1936年5月，金日成在朝鲜建立抗日民族统一战线组织——祖国光复会。",
     "src": {
      "book": "中外历史对比年表",
      "page": 153,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "西班牙佛朗哥将军发动叛乱",
     "desc": "1936年7月，西班牙佛朗哥将军发动叛乱，内战爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 154,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "马德里保卫战",
     "desc": "1936年9月—1937年3月，马德里保卫战，西班牙共和国军民击退了叛军四次大规模进攻。",
     "src": {
      "book": "中外历史对比年表",
      "page": 154,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "西班牙共和国政府批准成立国际纵队",
     "desc": "1936年10月，西班牙共和国政府批准成立国际纵队，来自世界各国的志愿人员在保卫马德里及其他一些战役中，发挥了重要作用。",
     "src": {
      "book": "中外历史对比年表",
      "page": 154,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "德意志"
     ],
     "title": "德意结成“罗马—柏林轴心”",
     "desc": "1936年11月，德意结成“罗马—柏林轴心”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 154,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "德意志",
      "日本"
     ],
     "title": "日本与德国签订《反共产国际协定》",
     "desc": "1936年11月，日本与德国签订《反共产国际协定》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 154,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1936,
     "yearEnd": null,
     "yearLabel": "1936",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "埃及",
     "countries": [
      "埃及",
      "英格兰"
     ],
     "title": "英国迫使埃及法鲁克王朝签订《英埃20年同盟条约》",
     "desc": "1936年，英国迫使埃及法鲁克王朝签订《英埃20年同盟条约》，英国可以在运河区驻军，有使用埃及基地、港口等特权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 154,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b163",
   "year": 1937,
   "yearLabel": "1937",
   "pages": [
    154,
    155,
    156
   ],
   "china": [
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日本军在北平西南卢沟桥附近演习",
     "desc": "1937年7月7日，日本军在北平西南卢沟桥附近演习，声称一名士兵“失踪”，要进中国守军驻地宛平城搜查遭拒绝，日本发动炮击，中国守军奋起抵抗，“七·七事变”爆发，全民族抗战开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 154,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民政府确定以“持久消耗战”作为中国抗战的战略方针",
     "desc": "1937年8月7日，国民政府确定以“持久消耗战”作为中国抗战的战略方针，即军事上采取持久战略，“以空间换时间”，逐次消耗敌人，以转变敌我优劣形势，争取最后胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 155,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "淞沪会战",
     "desc": "1937年8月13日—11月12日，淞沪会战，中国守军坚守三个月，使日军被迫转移战略主攻方向，三个月灭亡中国的妄想破灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 155,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共中央洛川会议",
     "desc": "1937年8月22—25日，中共中央洛川会议，通过《中国共产党抗日救国十大纲领》和《关于目前形势与党的任务的决定》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 155,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陕甘宁革命根据地苏维埃政府改名为边区政府",
     "desc": "1937年9月，陕甘宁革命根据地苏维埃政府改名为边区政府，林伯渠任主席。",
     "src": {
      "book": "中外历史对比年表",
      "page": 155,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "第二次国共合作正式形成",
     "desc": "1937年9月22、23日，国民党中央通讯社发表《中共中央为公布国共合作宣言》；蒋介石公开发表《对中国共产党宣言的谈话》承认中共的合法地位，第二次国共合作正式形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 155,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "平型关大捷",
     "desc": "1937年9月25日，平型关大捷，八路军在山西东北部的平型关伏击日军大获全胜，取得全国抗战开始后中国军队的第一个大胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 156,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "忻口、太原会战",
     "desc": "1937年10月1日—11月8日，忻口、太原会战，历时一个月，中国军队毙伤日军2万余人，沉重打击了侵略者。",
     "src": {
      "book": "中外历史对比年表",
      "page": 156,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "聂荣臻领导创建了第一个敌后抗日根据地——晋察冀抗日根据地",
     "desc": "1937年10月，聂荣臻领导创建了第一个敌后抗日根据地——晋察冀抗日根据地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 156,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "八路军、新四军开辟敌后战场",
     "desc": "1937年10月—1939年底，八路军、新四军先后创建晋绥、晋冀豫、山东、华中等多处敌后抗日民主根据地，抢占了战略要地，开辟了敌后战场，牵制了日军大量兵力。",
     "src": {
      "book": "中外历史对比年表",
      "page": 156,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南京国民政府迁往重庆",
     "desc": "1937年11月20日，南京国民政府迁往重庆，军事委员会迁往武汉。",
     "src": {
      "book": "中外历史对比年表",
      "page": 156,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日军攻陷南京",
     "desc": "1937年12月13日，日军攻陷南京，然后进行了长达6个星期的大屠杀，中国军民被枪杀和活埋者达30多万人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 156,
      "row": 7,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国国会通过《1937年中立法》",
     "desc": "1937年5月，美国国会通过《1937年中立法》，即《永久中立法》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 154,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "罗斯",
      "日本",
      "美洲"
     ],
     "title": "美国总统罗斯福针对发动卢沟桥事变的日本帝国主义",
     "desc": "1937年10月，美国总统罗斯福针对发动卢沟桥事变的日本帝国主义，发表著名的“防疫演说”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 156,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "意大利参加了德日《反共产国际协定》",
     "desc": "1937年11月，意大利参加了德日《反共产国际协定》，三国轴心正式形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 156,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1937,
     "yearEnd": null,
     "yearLabel": "1937",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织",
      "日本"
     ],
     "title": "国际联盟通过一项态度含糊暧昧的宣言",
     "desc": "1937年11月24日，国际联盟通过一项态度含糊暧昧的宣言，建议中日双方“停止敌对行动和采取和平方法”，维持世界和平。",
     "src": {
      "book": "中外历史对比年表",
      "page": 156,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b164",
   "year": 1938,
   "yearLabel": "1938",
   "pages": [
    157,
    158
   ],
   "china": [
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "徐州会战与台儿庄战役",
     "desc": "1938年1—5月，徐州会战，台儿庄战役，中国正面战场取得的第一场胜利，打破了日军“速战速决”的战略企图。",
     "src": {
      "book": "中外历史对比年表",
      "page": 157,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒋介石提议",
     "desc": "1938年3月，蒋介石提议，成立中国国民党中央执行委员会调查统计局，“中统”由此形成，除进行反共颠覆活动外，还对国民党内及国内的思想言论进行严密的控制。",
     "src": {
      "book": "中外历史对比年表",
      "page": 157,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "武汉保卫战",
     "desc": "1938年6—10月，武汉保卫战，抗日战争战略防御阶段规模最大的一次战役，毙伤日军3万余人，迫使日军停止战略进攻，此后抗日战争进入战略相持阶段。",
     "src": {
      "book": "中外历史对比年表",
      "page": 157,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "战时民意机构国民参政会在汉口成立",
     "desc": "1938年7月，战时民意机构国民参政会在汉口成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 157,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "戴笠掌管的特务处升格为“国民政府军事委员会调查统计局”",
     "desc": "1938年9月，戴笠掌管的特务处升格为“国民政府军事委员会调查统计局”，即“军统”，主要职责是通过政治暗杀的方式，消除异己，捍卫蒋介石的统治权威。",
     "src": {
      "book": "中外历史对比年表",
      "page": 157,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "汪精卫发表致重庆中央党部、蒋介石等人的“和平建议”电报",
     "desc": "1938年12月29日，汪精卫发表致重庆中央党部、蒋介石等人的“和平建议”电报，表明汪精卫集团彻底叛国投敌，也表明国民党内的重大分裂。",
     "src": {
      "book": "中外历史对比年表",
      "page": 158,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "毛泽东先后发表《抗日游击战争的战略问题》《论持久战》等文章",
     "desc": "1938年，毛泽东先后发表《抗日游击战争的战略问题》《论持久战》等文章，对中共的抗日战略做了系统的梳理与总结。",
     "src": {
      "book": "中外历史对比年表",
      "page": 158,
      "row": 4,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "希特勒与奥地利总理签署《关于奥地利和德国重新统一法》",
     "desc": "1938年3月13日，希特勒与奥地利总理签署《关于奥地利和德国重新统一法》，独立的奥地利灭亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 157,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国国会通过《公平劳动标准法》",
     "desc": "1938年6月，美国国会通过《公平劳动标准法》，即关于最低工资和最高工时的立法。",
     "src": {
      "book": "中外历史对比年表",
      "page": 157,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "和1939年5—8月",
     "desc": "1938年7月和1939年5—8月，日本关东军先后挑起张鼓峰事件和诺门坎事件，两次与苏军的武装冲突均遭失败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 157,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "印度国大党在甘地支持下",
     "desc": "1938年9月，印度国大党在甘地支持下，派遣了包括柯棣华、巴苏等5人组成的援华医疗队，支持中国抗日战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 157,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "英格兰",
      "欧洲"
     ],
     "title": "英法德意签署《慕尼黑协定》",
     "desc": "1938年9月30日，英法德意四国在慕尼黑签署了《关于捷克斯洛伐克割让苏台德领土给德国的协定》，即《慕尼黑协定》，英法绥靖政策达到了顶峰。",
     "src": {
      "book": "中外历史对比年表",
      "page": 157,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本首相近卫文麿发表《建设东亚新秩序的声明》",
     "desc": "1938年11月3日，日本首相近卫文麿发表《建设东亚新秩序的声明》，希望通过政治谈判，彻底解决中国问题。",
     "src": {
      "book": "中外历史对比年表",
      "page": 158,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1938,
     "yearEnd": null,
     "yearLabel": "1938",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "以色列",
      "德意志",
      "罗斯",
      "美洲"
     ],
     "title": "美国总统罗斯福严厉谴责纳粹政权残酷迫害和屠杀犹太人",
     "desc": "1938年11月，美国总统罗斯福严厉谴责纳粹政权残酷迫害和屠杀犹太人，并召回美国驻德大使。",
     "src": {
      "book": "中外历史对比年表",
      "page": 158,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b165",
   "year": 1939,
   "yearLabel": "1939",
   "pages": [
    158,
    159,
    160
   ],
   "china": [
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民党中常会通过决议",
     "desc": "1939年1月1日，国民党中常会通过决议，永远开除汪精卫国民党党籍，撤销其一切职务，并下令通缉。",
     "src": {
      "book": "中外历史对比年表",
      "page": 158,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "华北敌后游击战粉碎日军“扫荡”",
     "desc": "1939年1月—1940年3月，敌后战场的八路军和新四军在华北开展了广泛的游击战，粉碎了日军对根据地的“扫荡”，巩固了边区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 158,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民党五届五中全会在重庆召开",
     "desc": "1939年1月21—30日，国民党五届五中全会在重庆召开，中心议题是继续抗战、防共、溶共，秘密制定《限制异党活动办法》，设立“防共委员会”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 159,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "南昌、随枣、枣宜会战",
     "desc": "1939年3月—1940年6月，中日先后进行了南昌会战、随枣会战、枣宜会战，在江陵、宜昌、荆门、信阳一线形成对峙。",
     "src": {
      "book": "中外历史对比年表",
      "page": 159,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "陕甘宁边区政府公布《土地条例》",
     "desc": "1939年4月，陕甘宁边区政府公布《土地条例》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 159,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "汪精卫公开声明与日本合作",
     "desc": "1939年7月，汪精卫公开声明与日本合作。",
     "src": {
      "book": "中外历史对比年表",
      "page": 159,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "汪精卫在上海非法召开国民党第六次全国代表大会",
     "desc": "1939年8月，汪精卫在上海非法召开国民党第六次全国代表大会。",
     "src": {
      "book": "中外历史对比年表",
      "page": 159,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "第一次长沙会战",
     "desc": "1939年9月14日—10月15日，第一次长沙会战，中日双方进入战略相持阶段后第一次大规模的军事较量，中国军队的顽强抵抗使日军被迫撤退，没有实现其占领长沙的战略意图。",
     "src": {
      "book": "中外历史对比年表",
      "page": 160,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "底—1940年春",
     "desc": "1939年底—1940年春，国民党在华北掀起第一次反共高潮，被八路军打退。",
     "src": {
      "book": "中外历史对比年表",
      "page": 160,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "罗斯",
      "美洲"
     ],
     "title": "美国总统罗斯福在致国会的咨文中发出重整军备的号召",
     "desc": "1939年1月，美国总统罗斯福在致国会的咨文中发出重整军备的号召，指出应增加防御性武器以震慑轴心国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 158,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "德国陆续吞并了捷克斯洛伐克的斯洛伐克、波西米亚、摩拉维亚",
     "desc": "1939年3月，德国陆续吞并了捷克斯洛伐克的斯洛伐克、波西米亚、摩拉维亚。",
     "src": {
      "book": "中外历史对比年表",
      "page": 159,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "佛朗哥叛军进入马德里",
     "desc": "1939年3月，佛朗哥叛军进入马德里，西班牙内战结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 159,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英法苏三国互助条约谈判",
     "desc": "1939年4—8月，英法苏三国进行了关于缔结互助条约的谈判。",
     "src": {
      "book": "中外历史对比年表",
      "page": 159,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "俄国"
     ],
     "title": "苏联同德国签订为期十年的《苏德互不侵犯条约》",
     "desc": "1939年8月23日，苏联同德国签订为期十年的《苏德互不侵犯条约》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 159,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "德军向波兰发动突然袭击",
     "desc": "1939年9月1日，德军向波兰发动突然袭击。",
     "src": {
      "book": "中外历史对比年表",
      "page": 159,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "欧洲"
     ],
     "title": "英法先后对德宣战",
     "desc": "1939年9月3日，英法先后对德宣战，第二次世界大战在欧洲爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 159,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英法对德“静坐战”",
     "desc": "1939年9月3日—1940年5月9日，英法对德宣而不战，这种奇特现象被称为“静坐战”、“假战争”或“奇怪战争”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 160,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗斯",
     "countries": [
      "罗斯",
      "俄国",
      "欧洲"
     ],
     "title": "苏军侵入波兰境内的西乌克兰和西白俄罗斯地区",
     "desc": "1939年9月17日，苏军侵入波兰境内的西乌克兰和西白俄罗斯地区，不久，将其并入苏联的乌克兰和白俄罗斯两个加盟共和国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 160,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "北欧",
     "countries": [
      "北欧"
     ],
     "title": "苏芬战争",
     "desc": "1939年11月—1940年3月，苏芬战争，芬兰战败，被迫签订和约。",
     "src": {
      "book": "中外历史对比年表",
      "page": 160,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1939,
     "yearEnd": null,
     "yearLabel": "1939",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "英格兰",
      "美洲"
     ],
     "title": "美国修改《中立法》",
     "desc": "1939年底，美国修改《中立法》，规定允许出售军火，但要现款自运，实际有利于海运力量优势明显的英法购买军火。",
     "src": {
      "book": "中外历史对比年表",
      "page": 160,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b166",
   "year": 1940,
   "yearLabel": "1940",
   "pages": [
    160,
    161
   ],
   "china": [
    {
     "year": 1940,
     "yearEnd": null,
     "yearLabel": "1940",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共中央发出《抗日根据地的政权问题》的指示",
     "desc": "1940年3月，中共中央发出《抗日根据地的政权问题》的指示，指出中共在华北、华中等地建立的抗日民主政权，是统一战线性质的政权，明确规定抗日民主政权工作人员构成实行“三三制”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 160,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1940,
     "yearEnd": null,
     "yearLabel": "1940",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日本傀儡政府——汪伪南京“国民政府”宣告成立",
     "desc": "1940年3月30日，日本傀儡政府——汪伪南京“国民政府”宣告成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 160,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1940,
     "yearEnd": null,
     "yearLabel": "1940",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共中央作出《关于目前国民党区学生工作的几个决定》",
     "desc": "1940年6月3日，中共中央作出《关于目前国民党区学生工作的几个决定》。",
     "src": {
      "book": "中外历史对比年表",
      "page": 161,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1940,
     "yearEnd": null,
     "yearLabel": "1940",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "晋西北反“扫荡”开始",
     "desc": "1940年6月，晋西北反“扫荡”开始。",
     "src": {
      "book": "中外历史对比年表",
      "page": 161,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1940,
     "yearEnd": null,
     "yearLabel": "1940",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "百团大战",
     "desc": "1940年8月20日—12月初，八路军在彭德怀指挥下，在华北地区对日军发动了一场大规模的进攻，即“百团大战”，有力回击了日军的“囚笼政策”与侵略气焰，提高了共产党和八路军的威望。",
     "src": {
      "book": "中外历史对比年表",
      "page": 161,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1940,
     "yearEnd": null,
     "yearLabel": "1940",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "印度穆斯林联盟拉合尔代表大会通过《巴基斯坦决议》",
     "desc": "1940年3月，印度穆斯林联盟拉合尔代表大会通过《巴基斯坦决议》，要求在穆斯林聚居地区建立“清真国”，与印度斯坦并存。",
     "src": {
      "book": "中外历史对比年表",
      "page": 160,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1940,
     "yearEnd": null,
     "yearLabel": "1940",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "德意志",
      "英格兰"
     ],
     "title": "敦刻尔克大撤退",
     "desc": "1940年5月26日—6月4日，敦刻尔克大撤退，被德军围困在敦刻尔克海岸地区的英法联军成功渡海撤到英国，保存了有生力量。",
     "src": {
      "book": "中外历史对比年表",
      "page": 161,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1940,
     "yearEnd": null,
     "yearLabel": "1940",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "法兰西"
     ],
     "title": "法国巴黎被德军占领",
     "desc": "1940年6月14日，法国巴黎被德军占领。",
     "src": {
      "book": "中外历史对比年表",
      "page": 161,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1940,
     "yearEnd": null,
     "yearLabel": "1940",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰"
     ],
     "title": "戴高乐在英国广播电台发表演说",
     "desc": "1940年6月18日，戴高乐在英国广播电台发表演说，高举“自由法国”的旗帜，在海外殖民地组织抵抗运动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 161,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1940,
     "yearEnd": null,
     "yearLabel": "1940",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "法兰西"
     ],
     "title": "法德停战协定签订",
     "desc": "1940年6月22日，法德停战协定签订，法国北部和西部主要工业区为德国占领；西南部非占领区由贝当政府统治，政府所在地设在维希。",
     "src": {
      "book": "中外历史对比年表",
      "page": 161,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1940,
     "yearEnd": null,
     "yearLabel": "1940",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "波罗的海三国并入苏联",
     "desc": "1940年8月，波罗的海沿岸的爱沙尼亚、拉脱维亚、立陶宛三国被分别“接纳”作为苏联的加盟共和国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 161,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1940,
     "yearEnd": null,
     "yearLabel": "1940",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "德意日三国在柏林签署《三国同盟条约》",
     "desc": "1940年9月，德意日三国在柏林签署《三国同盟条约》，正式结成军事同盟。",
     "src": {
      "book": "中外历史对比年表",
      "page": 161,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1940,
     "yearEnd": null,
     "yearLabel": "1940",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "德意志",
      "欧洲"
     ],
     "title": "匈罗保加入三国军事同盟",
     "desc": "1940年11月—1941年3月，匈牙利、罗马尼亚、保加利亚三国分别加入德意日三国军事同盟，成为法西斯集团的附庸。",
     "src": {
      "book": "中外历史对比年表",
      "page": 161,
      "row": 8,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b167",
   "year": 1941,
   "yearLabel": "1941",
   "pages": [
    162,
    163
   ],
   "china": [
    {
     "year": 1941,
     "yearEnd": null,
     "yearLabel": "1941",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "皖南事变",
     "desc": "1941年1月6日，皖南事变，国民党在华中针对新四军的第二次反共高潮的最高峰，新四军军部及其所属皖南部队9000多人在泾县茂林地区，遭国民党军队伏击，损失惨重。",
     "src": {
      "book": "中外历史对比年表",
      "page": 162,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1941,
     "yearEnd": null,
     "yearLabel": "1941",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共中央发布命令",
     "desc": "1941年1月20日，中共中央发布命令，在江苏盐城重建新四军军部，陈毅代理军长，继续在长江南北坚持抗战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 162,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1941,
     "yearEnd": null,
     "yearLabel": "1941",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日伪军开始在华中地区开展各领域的“清乡运动”",
     "desc": "1941年7月，日伪军开始在华中地区开展各领域的“清乡运动”，以巩固其统治。",
     "src": {
      "book": "中外历史对比年表",
      "page": 162,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1941,
     "yearEnd": null,
     "yearLabel": "1941",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中美英联合军事会议在重庆举行",
     "desc": "1941年12月23日，中美英联合军事会议在重庆举行，签订了《中英共同防御滇缅路协定》，中美英结成军事同盟。",
     "src": {
      "book": "中外历史对比年表",
      "page": 163,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1941,
     "yearEnd": null,
     "yearLabel": "1941",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "第三次长沙会战、浙赣会战等",
     "desc": "1941年12月—1943年12月，中日军队先后进行了第三次长沙会战、浙赣会战、鄂西会战、常德会战，打破了日军的战略企图。",
     "src": {
      "book": "中外历史对比年表",
      "page": 163,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1941,
     "yearEnd": null,
     "yearLabel": "1941",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国国会通过《租借法案》",
     "desc": "1941年3月，美国国会通过《租借法案》，授权总统向对美国防务至关重要的国家提供各种援助。",
     "src": {
      "book": "中外历史对比年表",
      "page": 162,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1941,
     "yearEnd": null,
     "yearLabel": "1941",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "俄国",
      "日本"
     ],
     "title": "日本与苏联在莫斯科签订《日苏中立条约》",
     "desc": "1941年4月13日，日本与苏联在莫斯科签订《日苏中立条约》。双方互相保证在中国的势力范围，苏联承认伪“满洲国”，严重损害了中国主权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 162,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1941,
     "yearEnd": null,
     "yearLabel": "1941",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "俄国"
     ],
     "title": "德国对苏联发动突然袭击",
     "desc": "1941年6月22日，德国对苏联发动突然袭击，苏德战争爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 162,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1941,
     "yearEnd": null,
     "yearLabel": "1941",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "罗斯"
     ],
     "title": "罗斯福和丘吉尔发表《大西洋宪章》",
     "desc": "1941年8月14日，罗斯福和丘吉尔发表《大西洋宪章》，宣称不承认法西斯国家通过侵略造成的领土变更，表示了反纳粹暴政的决心。",
     "src": {
      "book": "中外历史对比年表",
      "page": 162,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1941,
     "yearEnd": null,
     "yearLabel": "1941",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "俄国"
     ],
     "title": "莫斯科保卫战",
     "desc": "1941年9—12月，莫斯科保卫战，是德国陆军在二战中遭到的第一次沉重打击，标志德国闪电战的破产。",
     "src": {
      "book": "中外历史对比年表",
      "page": 162,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1941,
     "yearEnd": null,
     "yearLabel": "1941",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本",
      "美洲"
     ],
     "title": "日本舰队用舰载机对美国珍珠港基地发动突然袭击",
     "desc": "1941年12月7日，日本舰队用舰载机对美国珍珠港基地发动突然袭击，美国港内的太平洋舰队几乎覆灭，太平洋战争爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 163,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1941,
     "yearEnd": null,
     "yearLabel": "1941",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国开始实施制造原子弹的计划",
     "desc": "1941年12月，美国开始实施制造原子弹的计划，后被称为“曼哈顿计划”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 163,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b168",
   "year": 1942,
   "yearLabel": "1942",
   "pages": [
    163,
    164,
    165
   ],
   "china": [
    {
     "year": 1941,
     "yearEnd": 1942,
     "yearLabel": "1941",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日军对华北抗日根据地连续进行了五次“治安强化运动”",
     "desc": "1941—1942年，日军对华北抗日根据地连续进行了五次“治安强化运动”，实行烧光、杀光、抢光的“三光”政策，给抗日根据地造成极大破坏。",
     "src": {
      "book": "中外历史对比年表",
      "page": 163,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1942,
     "yearEnd": null,
     "yearLabel": "1942",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒋介石命中国战区参谋长史迪威指挥中国远征军出师缅甸",
     "desc": "1942年3月，蒋介石命中国战区参谋长史迪威指挥中国远征军出师缅甸，开辟了联结中国战区和太平洋战区的滇缅战场。",
     "src": {
      "book": "中外历史对比年表",
      "page": 163,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1942,
     "yearEnd": null,
     "yearLabel": "1942",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "仁安羌战役",
     "desc": "1942年4月16日，仁安羌战役，中国远征军以少胜多，成功解救被围困的英缅军7000多人。",
     "src": {
      "book": "中外历史对比年表",
      "page": 163,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1942,
     "yearEnd": null,
     "yearLabel": "1942",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日军开始“五一”大扫荡",
     "desc": "1942年5月，日军开始“五一”大扫荡，实行“三光”政策。",
     "src": {
      "book": "中外历史对比年表",
      "page": 163,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1942,
     "yearEnd": null,
     "yearLabel": "1942",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "日军在中国战场实施“以战养战”的浙赣会战",
     "desc": "1942年5月，日军在中国战场实施“以战养战”的浙赣会战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 164,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1942,
     "yearEnd": null,
     "yearLabel": "1942",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织",
      "美洲"
     ],
     "title": "26个国家在华盛顿签署《联合国家宣言》",
     "desc": "1942年1月1日，26个国家在华盛顿签署《联合国家宣言》，标志国际反法西斯统一战线最终形成。",
     "src": {
      "book": "中外历史对比年表",
      "page": 163,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1942,
     "yearEnd": null,
     "yearLabel": "1942",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "东南亚",
      "大洋洲"
     ],
     "title": "日军占领东南亚及太平洋诸岛",
     "desc": "1942年5月为止，日军陆续占领了暹罗、香港、马来亚、菲律宾、缅甸、印尼及太平洋和大洋洲许多岛屿，打开了通向印度洋的通道。",
     "src": {
      "book": "中外历史对比年表",
      "page": 163,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1942,
     "yearEnd": null,
     "yearLabel": "1942",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本",
      "大洋洲"
     ],
     "title": "日本与美英舰队在西南太平洋的珊瑚海大战",
     "desc": "1942年5月4—8日，日本与美英舰队在西南太平洋的珊瑚海大战，这是世界战争史上第一次由航空母舰之间对抗的海战，美英成功阻止了日军对澳大利亚的进攻。",
     "src": {
      "book": "中外历史对比年表",
      "page": 164,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1942,
     "yearEnd": null,
     "yearLabel": "1942",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本",
      "美洲"
     ],
     "title": "日本与美国舰队在中太平洋的中途岛进行大战",
     "desc": "1942年6月4—7日，日本与美国舰队在中太平洋的中途岛进行大战。日军损失惨重，从此丧失了中太平洋的战略主动权，太平洋战争出现转折。",
     "src": {
      "book": "中外历史对比年表",
      "page": 164,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1942,
     "yearEnd": null,
     "yearLabel": "1942",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "阿拉曼战役",
     "desc": "1942年7—11月，阿拉曼战役，德意军队与英军在北非进行的一场二战中规模最大的沙漠消耗战，德意军队失败，北非战局由此出现转折。",
     "src": {
      "book": "中外历史对比年表",
      "page": 164,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1942,
     "yearEnd": null,
     "yearLabel": "1942",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "斯大林格勒会战",
     "desc": "1942年7月—1943年2月，斯大林格勒会战，苏德战争中历时最长、最激烈的一次战役，苏军的顽强抵抗使希特勒南线作战计划彻底破产。",
     "src": {
      "book": "中外历史对比年表",
      "page": 164,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1942,
     "yearEnd": null,
     "yearLabel": "1942",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "瓜达尔卡纳尔岛之战",
     "desc": "1942年8月7日—1943年2月7日，瓜达尔卡纳尔岛之战，是美日在西南太平洋进行的一场陆海空协同进行的岛屿争夺战，日本陆军在太平洋战争中第一次遭到惨败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 164,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1942,
     "yearEnd": null,
     "yearLabel": "1942",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国成立军事政策委员会",
     "desc": "1942年9月，美国成立军事政策委员会，领导制造原子武器的工程计划，代号为“曼哈顿工程”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 165,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1942,
     "yearEnd": null,
     "yearLabel": "1942",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "在费米领导下",
     "desc": "1942年12月，在费米领导下，芝加哥大学建立了世界上第一座核反应堆，为人工利用原子能开辟了道路。",
     "src": {
      "book": "中外历史对比年表",
      "page": 165,
      "row": 3,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b169",
   "year": 1943,
   "yearLabel": "1943",
   "pages": [
    165,
    166,
    167
   ],
   "china": [
    {
     "year": 1943,
     "yearEnd": null,
     "yearLabel": "1943",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "“四三年废约”",
     "desc": "1943年1月11日，“四三年废约”，中国同美英分别签订了平等的《中美新约》和《中英新约》，废除了过去的不平等条约（其他一些在华享有特权的国家随后也相继与中国签订了平等新约），恢复和实现了完整独立的国家主权。",
     "src": {
      "book": "中外历史对比年表",
      "page": 165,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1943,
     "yearEnd": null,
     "yearLabel": "1943",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中美英苏在莫斯科签署《关于普遍安全的宣言》",
     "desc": "1943年10月30日，中美英苏在莫斯科签署《关于普遍安全的宣言》，即《莫斯科宣言》，宣告四国将采取联合行动，继续对轴心国的战争，中国作为盟国四大国之一的地位确立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 166,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1943,
     "yearEnd": null,
     "yearLabel": "1943",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "美英中三国首脑签署《开罗宣言》",
     "desc": "1943年11月26日，美英中三国首脑签署《开罗宣言》，宣告日本窃取的中国领土归还中国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 166,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1944,
     "yearEnd": null,
     "yearLabel": "1944",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "豫湘桂战役",
     "desc": "1944年4—12月，豫湘桂战役，在8个月时间里，日军击溃约100万国民党军队，长驱直入，打通了纵贯中国南北的大陆交通线。",
     "src": {
      "book": "中外历史对比年表",
      "page": 166,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1944,
     "yearEnd": null,
     "yearLabel": "1944",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "美军观察组抵延安",
     "desc": "1944年7月22日—8月7日，美军观察组抵延安，对中共及其领导下的军队进行了比较客观的考察，认为与中共进行军事合作具有可行性。",
     "src": {
      "book": "中外历史对比年表",
      "page": 167,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1944,
     "yearEnd": null,
     "yearLabel": "1944",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "林伯渠在国民参政会三届三次会议上",
     "desc": "1944年9月15日，林伯渠在国民参政会三届三次会议上，代表中共提出废除国民党一党专政，召开各党派会议，成立民主联合政府的主张。",
     "src": {
      "book": "中外历史对比年表",
      "page": 167,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1944,
     "yearEnd": null,
     "yearLabel": "1944",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "赫尔利与中共达成五项协定",
     "desc": "1944年11月10日，美总统特使赫尔利与中共达成关于建立民主联合政府、联合军事统帅部以及承认中共合法地位等五项协定，美国对华政策发生变化。",
     "src": {
      "book": "中外历史对比年表",
      "page": 167,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1943,
     "yearEnd": null,
     "yearLabel": "1943",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国“全国抵抗运动委员会”成立",
     "desc": "1943年5月，法国“全国抵抗运动委员会”成立，组建“内地军”进行抗战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 165,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1943,
     "yearEnd": null,
     "yearLabel": "1943",
     "yearKind": "explicit",
     "region": "africa",
     "regionLabel": "非洲",
     "country": "非洲",
     "countries": [
      "非洲"
     ],
     "title": "被压缩在突尼斯北部的德意军队全部投降",
     "desc": "1943年5月13日，被压缩在突尼斯北部的德意军队全部投降，非洲战事结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 165,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1943,
     "yearEnd": null,
     "yearLabel": "1943",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "非洲"
     ],
     "title": "法兰西民族解放委员会作为法国的中央政权在阿尔及利亚成立",
     "desc": "1943年6月3日，法兰西民族解放委员会作为法国的中央政权在阿尔及利亚成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 165,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1943,
     "yearEnd": null,
     "yearLabel": "1943",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "库尔斯克战役",
     "desc": "1943年7月5日—8月23日，库尔斯克战役，双方在普罗霍洛夫卡展开了二战中最大规模的坦克战，德军损失惨重，在苏德战场的最后一次攻势以失败告终。此后，苏军完全掌握战略主动权，并展开全线反攻。",
     "src": {
      "book": "中外历史对比年表",
      "page": 165,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1943,
     "yearEnd": null,
     "yearLabel": "1943",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "意大利发生政变",
     "desc": "1943年7月25日，意大利发生政变，墨索里尼下台。",
     "src": {
      "book": "中外历史对比年表",
      "page": 166,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1943,
     "yearEnd": null,
     "yearLabel": "1943",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "英格兰"
     ],
     "title": "苏美英三国在德黑兰举行战时第一次首脑会议",
     "desc": "1943年11月28日，苏美英三国在德黑兰举行战时第一次首脑会议，商定美英军队将从法国北部登陆开辟第二战场。",
     "src": {
      "book": "中外历史对比年表",
      "page": 166,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1943,
     "yearEnd": null,
     "yearLabel": "1943",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织"
     ],
     "title": "联合国善后救济总署成立",
     "desc": "1943年11月，联合国善后救济总署成立，这是第一个正式成立的联合国机构，旨在向战争受害者提供援助。",
     "src": {
      "book": "中外历史对比年表",
      "page": 166,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1944,
     "yearEnd": null,
     "yearLabel": "1944",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西",
      "欧洲"
     ],
     "title": "诺曼底登陆",
     "desc": "1944年6月6日，诺曼底登陆，战争史上规模最大的两栖登陆作战行动，盟军在法国北部的诺曼底半岛成功登陆，开辟了欧洲第二战场。",
     "src": {
      "book": "中外历史对比年表",
      "page": 166,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1944,
     "yearEnd": null,
     "yearLabel": "1944",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织",
      "美洲"
     ],
     "title": "来自美苏中法等44国的代表",
     "desc": "1944年7月1—22日，来自美苏中法等44国的代表，在美国新罕布什尔州布雷顿森林举行联合国家货币金融会议，建立了布雷顿森林体系。",
     "src": {
      "book": "中外历史对比年表",
      "page": 167,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1944,
     "yearEnd": null,
     "yearLabel": "1944",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法国人民在戴高乐指挥的装甲部队协同下",
     "desc": "1944年8月25日，法国人民在戴高乐指挥的装甲部队协同下，解放了首都巴黎。",
     "src": {
      "book": "中外历史对比年表",
      "page": 167,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1944,
     "yearEnd": null,
     "yearLabel": "1944",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "敦巴顿橡胶园会议",
     "desc": "1944年8—9月，美英苏中四国代表在美国敦巴顿橡胶园举行会议，就创建新的国际组织达成内容广泛的协议。",
     "src": {
      "book": "中外历史对比年表",
      "page": 167,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1944,
     "yearEnd": null,
     "yearLabel": "1944",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "北欧",
      "罗斯",
      "俄国",
      "欧洲"
     ],
     "title": "苏联收复全部国土",
     "desc": "1944年底，苏联收复了几乎全部国土，并解放了罗马尼亚、保加利亚、波兰、捷克斯洛伐克、南斯拉夫、匈牙利、芬兰、挪威的部分国土，芬罗保匈等国退出战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 167,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b170",
   "year": 1945,
   "yearLabel": "1945",
   "pages": [
    167,
    168,
    169,
    170
   ],
   "china": [
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国远征军与中国驻印度军队在芒友会师",
     "desc": "1945年1月，中国远征军与中国驻印度军队在芒友会师。",
     "src": {
      "book": "中外历史对比年表",
      "page": 167,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共“七大”在延安召开",
     "desc": "1945年4月23—6月11日，中共“七大”在延安召开，提出建立民主联合政府的主张。",
     "src": {
      "book": "中外历史对比年表",
      "page": 168,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民党军队反攻桂柳",
     "desc": "1945年4—7月，国民党军队反攻（广西）桂林、柳州，收复广西、福建、浙江、江西等失地。",
     "src": {
      "book": "中外历史对比年表",
      "page": 168,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国国民党第六次全国代表大会在重庆召开",
     "desc": "1945年5月5—21日，中国国民党第六次全国代表大会在重庆召开，明确拒绝中共及各民主党派要求召开党派会议、结束国民党一党专政、成立民主联合政府的主张。",
     "src": {
      "book": "中外历史对比年表",
      "page": 168,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国解放区抗日军总司令朱德连续发布对日军展开全面反攻及受降等七道命令",
     "desc": "1945年8月10—11日，中国解放区抗日军总司令朱德连续发布对日军展开全面反攻及受降等七道命令，各解放区组织反攻大军，向日伪军发起全面反攻。",
     "src": {
      "book": "中外历史对比年表",
      "page": 169,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国民主同盟发表《在抗战胜利声中的紧急呼吁》",
     "desc": "1945年8月15日，中国民主同盟发表《在抗战胜利声中的紧急呼吁》，提出“民主统一、和平建国”的口号。",
     "src": {
      "book": "中外历史对比年表",
      "page": 169,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "毛泽东、周恩来、王若飞在张治中、赫尔利的陪同下飞抵重庆",
     "desc": "1945年8月28日，毛泽东、周恩来、王若飞在张治中、赫尔利的陪同下飞抵重庆，进行国共谈判。",
     "src": {
      "book": "中外历史对比年表",
      "page": 169,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国在南京接受日本代表投降",
     "desc": "1945年9月9日，中国在南京接受日本代表投降，中国抗日战争取得最后胜利。",
     "src": {
      "book": "中外历史对比年表",
      "page": 169,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国共双方达成《国民政府与中共代表会谈纪要》",
     "desc": "1945年10月10日，国共双方达成《国民政府与中共代表会谈纪要》，即《双十协定》，双方一致同意和平建国的基本方针。",
     "src": {
      "book": "中外历史对比年表",
      "page": 169,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "美国总统特使马歇尔启程来华“调停”内战",
     "desc": "1945年12月15日，美国总统特使马歇尔启程来华“调停”内战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 170,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "以民族工商业者为主体的中国民主建国会在重庆成立",
     "desc": "1945年12月16日，以民族工商业者为主体的中国民主建国会在重庆成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 170,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "救国会改名为中国人民救国会",
     "desc": "1945年12月20日，救国会改名为中国人民救国会，沈钧儒当选主席。",
     "src": {
      "book": "中外历史对比年表",
      "page": 170,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国民主促进会在上海成立",
     "desc": "1945年12月30日，中国民主促进会在上海成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 170,
      "row": 5,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织",
      "俄国"
     ],
     "title": "美英苏三国首脑在苏联克里米亚半岛的雅尔塔会晤",
     "desc": "1945年2月，美英苏三国首脑在苏联克里米亚半岛的雅尔塔会晤，旨在协调盟国最后战胜法西斯的步伐，对联合国的建立也起了一定积极作用，对战后国际关系格局的形成具有深远影响。",
     "src": {
      "book": "中外历史对比年表",
      "page": 167,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯"
     ],
     "title": "阿拉伯国家联盟在开罗成立",
     "desc": "1945年3月，阿拉伯国家联盟在开罗成立，旨在维护阿拉伯国家的共同利益。",
     "src": {
      "book": "中外历史对比年表",
      "page": 167,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "罗斯",
      "美洲"
     ],
     "title": "美国总统罗斯福去世",
     "desc": "1945年4月12日，美国总统罗斯福去世，副总统杜鲁门继任总统。",
     "src": {
      "book": "中外历史对比年表",
      "page": 168,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志"
     ],
     "title": "苏军攻克德国首都柏林",
     "desc": "1945年5月2日，苏军攻克德国首都柏林。",
     "src": {
      "book": "中外历史对比年表",
      "page": 168,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "欧洲战场的反法西斯战争胜利结束",
     "desc": "1945年5月9日，欧洲战场的反法西斯战争胜利结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 168,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "波茨坦会议",
     "desc": "1945年7—8月，美英苏三国首脑在波茨坦举行会晤，着重讨论了战后世界的安排，会后发表《波茨坦公告》，敦促日本无条件投降。",
     "src": {
      "book": "中外历史对比年表",
      "page": 168,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "在美国新墨西哥州的一片荒漠上",
     "desc": "1945年7月16日，在美国新墨西哥州的一片荒漠上，成功爆炸了世界上第一颗原子弹。",
     "src": {
      "book": "中外历史对比年表",
      "page": 168,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本",
      "朝鲜半岛"
     ],
     "title": "朝鲜北部解放，美军进驻南部",
     "desc": "1945年8—9月，朝鲜人民革命军在苏军帮助下解放了朝鲜北部；美军仁川登陆，以“三八线”为界进驻朝鲜南部，日本长达36年的殖民统治结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 168,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本",
      "美洲"
     ],
     "title": "美国在广岛、长崎投掷原子弹",
     "desc": "1945年8月6、9日，美国在日本广岛和长崎投掷原子弹，造成20多万居民伤亡。",
     "src": {
      "book": "中外历史对比年表",
      "page": 169,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国"
     ],
     "title": "苏联根据《雅尔塔协定》对日宣战",
     "desc": "1945年8月8日，苏联根据《雅尔塔协定》对日宣战。",
     "src": {
      "book": "中外历史对比年表",
      "page": 169,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "日本接受《波茨坦公告》",
     "desc": "1945年8月15日，日本接受《波茨坦公告》，宣布无条件投降。",
     "src": {
      "book": "中外历史对比年表",
      "page": 169,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "sea",
     "regionLabel": "南洋",
     "country": "东南亚",
     "countries": [
      "印度",
      "罗马",
      "东南亚"
     ],
     "title": "苏加诺宣告印度尼西亚共和国独立",
     "desc": "1945年8月17日，苏加诺宣告印度尼西亚共和国独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 169,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "越南",
     "countries": [
      "越南"
     ],
     "title": "胡志明宣布越南民主共和国正式成立",
     "desc": "1945年9月2日，胡志明宣布越南民主共和国正式成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 169,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本",
      "美洲"
     ],
     "title": "日本投降的签字仪式在东京湾的美国军舰“密苏里”号上举行",
     "desc": "1945年9月2日，日本投降的签字仪式在东京湾的美国军舰“密苏里”号上举行，反法西斯的第二次世界大战胜利结束。",
     "src": {
      "book": "中外历史对比年表",
      "page": 169,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织"
     ],
     "title": "《联合国宪章》正式生效的这一天被定为联合国日",
     "desc": "1945年10月24日，《联合国宪章》正式生效的这一天被定为联合国日。",
     "src": {
      "book": "中外历史对比年表",
      "page": 169,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "欧洲"
     ],
     "title": "欧洲国际军事法庭在德国纽伦堡开庭",
     "desc": "1945年11月20日，欧洲国际军事法庭在德国纽伦堡开庭，对21名纳粹德国首要战犯审讯和判决。",
     "src": {
      "book": "中外历史对比年表",
      "page": 170,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织"
     ],
     "title": "国际货币基金组织和国际复兴开发银行（世界银行）正式成立",
     "desc": "1945年12月27日，国际货币基金组织和国际复兴开发银行（世界银行）正式成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 170,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "第一台电子计算机研制成功",
     "desc": "1945年底，美国宾夕法尼亚大学的莫克利研制成功第一台电子计算机。",
     "src": {
      "book": "中外历史对比年表",
      "page": 170,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1945,
     "yearEnd": null,
     "yearLabel": "1945",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "美籍奥地利生物学家贝塔朗菲创立系统论",
     "desc": "1945年，美籍奥地利生物学家贝塔朗菲创立系统论，在论文《关于一般系统论》中正式提出系统论是一门研究系统的模式、原则和规律，并对其功能进行数学描述的科学。",
     "src": {
      "book": "中外历史对比年表",
      "page": 170,
      "row": 7,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b171",
   "year": 1946,
   "yearLabel": "1946",
   "pages": [
    170,
    171,
    172,
    173,
    174
   ],
   "china": [
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国共两党签署《关于停止国内冲突的命令和声明》",
     "desc": "1946年1月10日，国共两党签署《关于停止国内冲突的命令和声明》，由双方向所属部队发出停战令。",
     "src": {
      "book": "中外历史对比年表",
      "page": 170,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "政治协商会议在重庆召开",
     "desc": "1946年1月10日，政治协商会议在重庆召开，各方围绕改组国民政府、施政纲领、军事问题、国民大会、宪法草案五个问题，进行了激烈斗争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 170,
      "row": 9,
      "col": "中国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民党民主促进会在广州宣布成立",
     "desc": "1946年4月15日，国民党民主促进会在广州宣布成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 171,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "九三学社（原民主科学座谈会）在重庆召开成立大会",
     "desc": "1946年5月4日，九三学社（原民主科学座谈会）在重庆召开成立大会。",
     "src": {
      "book": "中外历史对比年表",
      "page": 171,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民党军22万人大举进攻中原解放区",
     "desc": "1946年6月26日，国民党军22万人大举进攻中原解放区，全面内战由此爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 171,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民党特务先后暗杀了民主人士李公朴、西南联大教授闻一多",
     "desc": "1946年7月，国民党特务先后暗杀了民主人士李公朴、西南联大教授闻一多。",
     "src": {
      "book": "中外历史对比年表",
      "page": 171,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "马歇尔与新任驻华大使司徒雷登发表声明",
     "desc": "1946年8月10日，马歇尔与新任驻华大使司徒雷登发表声明，宣布“调处”失败。",
     "src": {
      "book": "中外历史对比年表",
      "page": 171,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "《中美友好通商航海条约》在南京签订",
     "desc": "1946年11月4日，《中美友好通商航海条约》在南京签订。此后，国民党政府又陆续与美国签订一系列不平等条约，美国独占了中国的商品和投资市场。",
     "src": {
      "book": "中外历史对比年表",
      "page": 171,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "西北野战军粉碎国民党重点进攻",
     "desc": "1947年3—8月，中共西北野战军粉碎了国民党军对陕甘宁的重点进攻。",
     "src": {
      "book": "中外历史对比年表",
      "page": 172,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "华东野战军粉碎国民党重点进攻",
     "desc": "1947年4—6月，陈毅为司令员的华东野战军粉碎了国民党军对山东解放区的重点进攻。",
     "src": {
      "book": "中外历史对比年表",
      "page": 172,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国民党军警、特务殴打在南京举行联合请愿游行的青年学生",
     "desc": "1947年5月20日，国民党军警、特务殴打在南京举行联合请愿游行的青年学生，制造了震惊国内的“五·二〇”惨案。",
     "src": {
      "book": "中外历史对比年表",
      "page": 172,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "刘邓大军挺进中原",
     "desc": "1947年6月30日，刘邓大军挺进中原。",
     "src": {
      "book": "中外历史对比年表",
      "page": 173,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "魏德迈来华调查",
     "desc": "1947年7月22日—8月24日，美国总统特使魏德迈来华调查，以对中国现在及未来的情况做出估量。",
     "src": {
      "book": "中外历史对比年表",
      "page": 173,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "全国土地会议与《中国土地法大纲》",
     "desc": "1947年7—9月，中共中央工作委员会在河北西柏坡召开全国土地会议，制定了《中国土地法大纲》，广大农村形成土地改革热潮，人民解放战争得到了农民有力支持。",
     "src": {
      "book": "中外历史对比年表",
      "page": 173,
      "row": 4,
      "col": "中国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国人民解放军总部发表《中国人民解放军宣言》",
     "desc": "1947年10月10日，中国人民解放军总部发表《中国人民解放军宣言》，又名《双十宣言》，向全国人民提出解放全中国、建立新中国的总目标。",
     "src": {
      "book": "中外历史对比年表",
      "page": 173,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国国民党革命委员会宣告成立",
     "desc": "1948年1月1日，中国国民党革命委员会宣告成立，宋庆龄被推举为名誉主席。",
     "src": {
      "book": "中外历史对比年表",
      "page": 174,
      "row": 2,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织",
      "北欧"
     ],
     "title": "联合国第一届大会在伦敦举行",
     "desc": "1946年1月10日—2月14日，联合国第一届大会在伦敦举行，选举挪威外长吕格尔·赖伊为第一任秘书长。",
     "src": {
      "book": "中外历史对比年表",
      "page": 170,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本"
     ],
     "title": "东京审判开始",
     "desc": "1946年1月19日，东京审判开始，远东国际军事法庭对东条英机等28名战犯审讯和判决。",
     "src": {
      "book": "中外历史对比年表",
      "page": 171,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰",
      "美洲"
     ],
     "title": "英国前首相丘吉尔在美国密苏里州的富尔敦发表名为《和平砥柱》的演说",
     "desc": "1946年3月5日，英国前首相丘吉尔在美国密苏里州的富尔敦发表名为《和平砥柱》的演说，又称“铁幕演说”，揭开了冷战的序幕。",
     "src": {
      "book": "中外历史对比年表",
      "page": 171,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "意大利全民公决建立了共和国",
     "desc": "1946年6月，意大利全民公决建立了共和国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 171,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "sea",
     "regionLabel": "南洋",
     "country": "东南亚",
     "countries": [
      "东南亚",
      "美洲"
     ],
     "title": "菲律宾群岛从美国获得独立",
     "desc": "1946年7月，菲律宾群岛从美国获得独立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 171,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "日本",
     "countries": [
      "日本",
      "美洲"
     ],
     "title": "美国占领当局主导制定的《日本国宪法》在国会获得通过",
     "desc": "1946年11月3日，美国占领当局主导制定的《日本国宪法》在国会获得通过，日本成为资产阶级议会制国家。",
     "src": {
      "book": "中外历史对比年表",
      "page": 171,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织"
     ],
     "title": "联合国教科文组织成立",
     "desc": "1946年11月4日，联合国教科文组织成立，目的是增进各国在教育、科学、文化等方面的交流合作。",
     "src": {
      "book": "中外历史对比年表",
      "page": 171,
      "row": 9,
      "col": "外国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "法兰西第四共和国成立",
     "desc": "1946年12月24日，法兰西第四共和国成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 172,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1946,
     "yearEnd": null,
     "yearLabel": "1946",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "越南"
     ],
     "title": "印度支那战争（越南抗法战争）",
     "desc": "1946年12月—1954年7月，印度支那战争，即越南人民的抗法战争。",
     "src": {
      "book": "中外历史对比年表",
      "page": 172,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗马",
     "countries": [
      "罗马",
      "法兰西",
      "北欧",
      "欧洲"
     ],
     "title": "在巴黎正式签订《五国和约》",
     "desc": "1947年2月10日，在巴黎正式签订《五国和约》，即对意大利、罗马尼亚、保加利亚、匈牙利和芬兰五个法西斯仆从国的和约。",
     "src": {
      "book": "中外历史对比年表",
      "page": 172,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "奥斯曼",
      "希腊",
      "美洲"
     ],
     "title": "美国总统杜鲁门在国会两院发表咨文",
     "desc": "1947年3月12日，美国总统杜鲁门在国会两院发表咨文，提出援助希腊和土耳其以对抗极权主义的威胁，这项政策声明被称为“杜鲁门主义”，标志冷战的爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 172,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度"
     ],
     "title": "德里和伦敦同时公布以总督蒙巴顿名字命名的移交印度政权方案",
     "desc": "1947年6月3日，德里和伦敦同时公布以总督蒙巴顿名字命名的移交印度政权方案，即“蒙巴顿方案”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 172,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲",
      "美洲"
     ],
     "title": "美国国务卿马歇尔提出“欧洲复兴计划”",
     "desc": "1947年6月5日，美国国务卿马歇尔提出“欧洲复兴计划”，即“马歇尔计划”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 173,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "south-asia",
     "regionLabel": "南亚",
     "country": "印度",
     "countries": [
      "印度",
      "英格兰"
     ],
     "title": "英国议会正式通过《印度独立法案》",
     "desc": "1947年7月18日，英国议会正式通过《印度独立法案》，宣布在印度境内成立两个独立的自治领：印度和巴基斯坦。",
     "src": {
      "book": "中外历史对比年表",
      "page": 173,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "欧洲",
     "countries": [
      "欧洲"
     ],
     "title": "欧洲九国共产党和工人党情报局成立",
     "desc": "1947年9月，欧洲九国共产党和工人党情报局成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 173,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织"
     ],
     "title": "美英中法等23国签署《关税与贸易总协定》",
     "desc": "1947年10月30日，美英中法等23国签署《关税与贸易总协定》，标志国际贸易体系建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 173,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织",
      "阿拉伯",
      "以色列",
      "英格兰"
     ],
     "title": "联合国大会通过“巴勒斯坦分治决议”",
     "desc": "1947年11月29日，联合国大会通过“巴勒斯坦分治决议”，规定结束英国委任统治，建立两个国家：犹太国和阿拉伯国。",
     "src": {
      "book": "中外历史对比年表",
      "page": 173,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1947,
     "yearEnd": null,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "贝尔实验室研制成功第一支晶体管",
     "desc": "1947年12月，美国电话电报公司的贝尔实验室的三位科学家研制成第一支晶体管（即半导体），开始了以晶体管代替电子管的时代。",
     "src": {
      "book": "中外历史对比年表",
      "page": 173,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1947,
     "yearEnd": 1949,
     "yearLabel": "1947",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "欧洲"
     ],
     "title": "苏联同东欧国家签订了一系列双边条约",
     "desc": "1947—1949年，苏联同东欧国家签订了一系列双边条约，统称“莫洛托夫计划”。",
     "src": {
      "book": "中外历史对比年表",
      "page": 174,
      "row": 2,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b172",
   "year": 1948,
   "yearLabel": "1948",
   "pages": [
    174,
    175
   ],
   "china": [
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "国统区反美爱国运动",
     "desc": "1948年5—6月，国统区爆发了声势浩大的反美爱国运动。",
     "src": {
      "book": "中外历史对比年表",
      "page": 174,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "辽沈战役",
     "desc": "1948年9月12日—11月2日，东北人民解放军发动了战略决战的第一大战役——辽沈战役，东北全境解放。",
     "src": {
      "book": "中外历史对比年表",
      "page": 174,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "淮海战役",
     "desc": "1948年11月6日—1949年1月10日，中国人民解放军发动淮海战役，基本解放了长江以北的华东、中原地区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 175,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "平津战役",
     "desc": "1948年12月5日—1949年1月31日，中国人民解放军发动平津战役，基本解放华北全境。",
     "src": {
      "book": "中外历史对比年表",
      "page": 175,
      "row": 3,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "以色列",
     "countries": [
      "以色列"
     ],
     "title": "以色列建国",
     "desc": "1948年5月14日，以色列建国，定都特拉维夫。",
     "src": {
      "book": "中外历史对比年表",
      "page": 174,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "arabia",
     "regionLabel": "中东",
     "country": "阿拉伯",
     "countries": [
      "阿拉伯",
      "以色列"
     ],
     "title": "阿拉伯联盟宣布对以色列进行“圣战”",
     "desc": "1948年5月15日，阿拉伯联盟宣布对以色列进行“圣战”，巴勒斯坦战争爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 174,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "罗斯",
     "countries": [
      "罗斯",
      "欧洲"
     ],
     "title": "南斯拉夫共产党被开除出情报局",
     "desc": "1948年6月，南斯拉夫共产党被开除出情报局，造成战后国际共产主义运动的第一次分裂。",
     "src": {
      "book": "中外历史对比年表",
      "page": 174,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "俄国"
     ],
     "title": "第一次柏林危机",
     "desc": "1948年6月—1949年5月，英美法宣布在西占区实行单方的货币改革，苏联以封锁柏林抗议，第一次“柏林危机”爆发。",
     "src": {
      "book": "中外历史对比年表",
      "page": 174,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "朝鲜半岛",
     "countries": [
      "朝鲜半岛"
     ],
     "title": "南朝鲜成立了大韩民国",
     "desc": "1948年8月15日，南朝鲜成立了大韩民国，以汉城（首尔）为首都，李承晚为总统。",
     "src": {
      "book": "中外历史对比年表",
      "page": 174,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "east-asia",
     "regionLabel": "东亚",
     "country": "朝鲜半岛",
     "countries": [
      "朝鲜半岛"
     ],
     "title": "北朝鲜成立了金日成领导的朝鲜民主主义人民共和国",
     "desc": "1948年9月9日，北朝鲜成立了金日成领导的朝鲜民主主义人民共和国，以平壤为首都。",
     "src": {
      "book": "中外历史对比年表",
      "page": 174,
      "row": 8,
      "col": "外国"
     }
    },
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织"
     ],
     "title": "联合国大会通过《世界人权宣言》",
     "desc": "1948年12月10日，联合国大会通过《世界人权宣言》，首次在世界范围内系统地提出了有关保护基本人权的具体内容和共同奋斗的目标。",
     "src": {
      "book": "中外历史对比年表",
      "page": 175,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国数学家申农发表《通讯的数学理论》",
     "desc": "1948年，美国数学家申农发表《通讯的数学理论》，创立信息论。",
     "src": {
      "book": "中外历史对比年表",
      "page": 175,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1948,
     "yearEnd": null,
     "yearLabel": "1948",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "美洲"
     ],
     "title": "美国数学家维纳出版《控制论》",
     "desc": "1948年，美国数学家维纳出版《控制论》，揭示了由信息和反馈构成的系统自动控制规律，创立控制论。",
     "src": {
      "book": "中外历史对比年表",
      "page": 175,
      "row": 5,
      "col": "外国"
     }
    }
   ]
  },
  {
   "id": "b173",
   "year": 1949,
   "yearLabel": "1949",
   "pages": [
    175,
    176
   ],
   "china": [
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "蒋介石被迫发表文告宣布“引退”",
     "desc": "1949年1月21日，蒋介石被迫发表文告宣布“引退”，总统职务由副总统李宗仁代行。",
     "src": {
      "book": "中外历史对比年表",
      "page": 175,
      "row": 6,
      "col": "中国"
     }
    },
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国人民解放军举行隆重的入城仪式",
     "desc": "1949年2月3日，中国人民解放军举行隆重的入城仪式，北平宣告和平解放。",
     "src": {
      "book": "中外历史对比年表",
      "page": 175,
      "row": 7,
      "col": "中国"
     }
    },
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中共在西柏坡召开七届二中全会",
     "desc": "1949年3月5—13日，中共在西柏坡召开七届二中全会，会议提出的重要理论思想、确定的各项方针政策，对于党夺取全国胜利，以及胜利后建设新民主主义社会，具有重要的指导意义。",
     "src": {
      "book": "中外历史对比年表",
      "page": 175,
      "row": 8,
      "col": "中国"
     }
    },
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "北平和平谈判",
     "desc": "1949年4月1—20日，北平和平谈判，由于国民党政府拒绝在《国内和平协定》上签字，谈判宣告破裂。",
     "src": {
      "book": "中外历史对比年表",
      "page": 176,
      "row": 2,
      "col": "中国"
     }
    },
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国人民解放军突破长江防线",
     "desc": "1949年4月21—23日，中国人民解放军突破长江防线，占领国民党统治中心南京，宣告国民党在大陆的统治覆灭。",
     "src": {
      "book": "中外历史对比年表",
      "page": 176,
      "row": 3,
      "col": "中国"
     }
    },
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中国人民政治协商会议第一次全体会议在北平隆重召开",
     "desc": "1949年9月21日，中国人民政治协商会议第一次全体会议在北平隆重召开，会议通过的《共同纲领》起着临时宪法的作用，是新中国第一部大宪章。",
     "src": {
      "book": "中外历史对比年表",
      "page": 176,
      "row": 5,
      "col": "中国"
     }
    },
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "china",
     "regionLabel": "中国",
     "country": "中国",
     "countries": [
      "中国"
     ],
     "title": "中华人民共和国宣告成立",
     "desc": "1949年10月1日，中华人民共和国宣告成立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 176,
      "row": 6,
      "col": "中国"
     }
    }
   ],
   "world": [
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "欧洲"
     ],
     "title": "苏联和东欧国家成立经济互助委员会（简称“经互会”）",
     "desc": "1949年1月，苏联和东欧国家成立经济互助委员会（简称“经互会”）。",
     "src": {
      "book": "中外历史对比年表",
      "page": 175,
      "row": 6,
      "col": "外国"
     }
    },
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "americas",
     "regionLabel": "美洲",
     "country": "美洲",
     "countries": [
      "英格兰",
      "俄国",
      "美洲"
     ],
     "title": "美国总统杜鲁门提出“第四点计划”",
     "desc": "1949年1月，美国总统杜鲁门提出“第四点计划”，即利用美国先进的科技和发达的工业同苏联、英法争夺不发达国家和地区。",
     "src": {
      "book": "中外历史对比年表",
      "page": 175,
      "row": 7,
      "col": "外国"
     }
    },
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "法兰西",
     "countries": [
      "法兰西"
     ],
     "title": "第一届世界保卫和平大会在巴黎和布拉格同时举行",
     "desc": "1949年4月20—25日，第一届世界保卫和平大会在巴黎和布拉格同时举行。",
     "src": {
      "book": "中外历史对比年表",
      "page": 176,
      "row": 2,
      "col": "外国"
     }
    },
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "world",
     "regionLabel": "国际",
     "country": "国际组织",
     "countries": [
      "国际组织"
     ],
     "title": "北大西洋公约组织建立",
     "desc": "1949年4月，北大西洋公约组织建立。",
     "src": {
      "book": "中外历史对比年表",
      "page": 176,
      "row": 3,
      "col": "外国"
     }
    },
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "俄国",
     "countries": [
      "俄国",
      "美洲"
     ],
     "title": "苏联试爆原子弹成功",
     "desc": "1949年8月29日，苏联试爆原子弹成功，打破了美国的核垄断。",
     "src": {
      "book": "中外历史对比年表",
      "page": 176,
      "row": 4,
      "col": "外国"
     }
    },
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "德意志",
     "countries": [
      "德意志",
      "美洲"
     ],
     "title": "德意志联邦共和国成立",
     "desc": "1949年9月20日，德意志联邦共和国成立，定都波恩，阿登纳任总理。",
     "src": {
      "book": "中外历史对比年表",
      "page": 176,
      "row": 5,
      "col": "外国"
     }
    },
    {
     "year": 1949,
     "yearEnd": null,
     "yearLabel": "1949",
     "yearKind": "explicit",
     "region": "europe",
     "regionLabel": "欧洲",
     "country": "英格兰",
     "countries": [
      "英格兰"
     ],
     "title": "英国德·哈威兰公司研制出第一架喷气式客机",
     "desc": "1949年，英国德·哈威兰公司研制出第一架喷气式客机。",
     "src": {
      "book": "中外历史对比年表",
      "page": 176,
      "row": 6,
      "col": "外国"
     }
    }
   ]
  }
 ]
};
if (typeof module !== 'undefined' && module.exports) { module.exports = PARALLEL_BOOK_DATA; }
if (typeof window !== 'undefined') {
  window.PARALLEL_BOOK_DATA = PARALLEL_BOOK_DATA;
  window.PARALLEL_BOOK_PILOT = PARALLEL_BOOK_DATA; // 兼容试点效果页的旧变量名
}
