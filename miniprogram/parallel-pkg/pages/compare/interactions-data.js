/**
 * 中外往来 · 已核实条目（12 位中国人物 + 1 条存疑示例）
 *
 * 本文件由 _design/parallel/interactions-rich.html 的 DATA 转出（字段改名）：
 *   - 13 条往来、年份、引文、书名卷次、A/B/D 等级均未改动；
 *   - 已移除来源外链，仅保留书目、卷次、篇名等文字出处；
 *   - 不新增未核实的条目；
 *   - 存疑条目（马可·波罗—忽必烈）confidence='存疑'，不计入确证统计。
 *
 * 同期数据来自项目 world-events.js 的筛选结果，只表示同一段时间，不代表认识或有往来。
 */
var GRADE_WHY = {
  "A": "正史 / 实录 / 条约原文 / 官修档案，记当世或近当世之事。",
  "B": "当事人著述 / 随行记 / 专题史传 / 碑记，成书略晚或带叙述立场。",
  "D": "传统说法或二手综述，未见中文一手记载，单列存疑，不计入确证。"
};

var PERSONS = {
  "zhangqian": {
    "key": "zhangqian",
    "name": "张骞",
    "kicker": "西汉 · 约前164—前114 · 汉中成固",
    "identity": "汉使 · 博望侯",
    "area": "长安 ↔ 西域（大宛、大月氏、大夏、康居）",
    "meta": "奉汉武帝命两度西行，「凿空」西域，归来具言诸国山川物产",
    "doubt": false,
    "doubtWhy": "",
    "doubtPoints": [],
    "syncRead": "张骞出使西域的同一时期，罗马正与迦太基进行第三次布匿战争，地中海格局正在改写。",
    "sync": [
      {
        "year": "前149",
        "title": "第三次布匿战争",
        "region": "欧洲"
      },
      {
        "year": "前146",
        "title": "罗马灭迦太基",
        "region": "欧洲"
      },
      {
        "year": "前140",
        "title": "努曼提亚战争",
        "region": "欧洲"
      },
      {
        "year": "前133",
        "title": "帕加马遗赠罗马",
        "region": "欧洲"
      }
    ],
    "syncTotal": 10,
    "ix": [
      {
        "k": "zhangqian-0",
        "relationType": "envoy",
        "relationTypeLabel": "出使",
        "typeText": "",
        "yearText": "前138—前126",
        "timeText": "前138 出使 — 前126 归汉",
        "place": "长安 → 大月氏（妫水流域）",
        "foreignName": "大月氏",
        "foreignRole": "月氏王庭",
        "foreignPolity": "大月氏",
        "howMet": "前138年张骞奉武帝命持节出使，寻大月氏共击匈奴，途中被匈奴扣留十余年，脱身后西行至大月氏。",
        "process": "大月氏已迁居妫水流域、无意东返复仇，张骞留居一年余，结盟未成。",
        "resultImpact": "前126年归汉，带回西域诸国山川、物产与道路的第一手见闻，司马迁据以写入《大宛列传》。",
        "confidence": "确证",
        "doubt": false,
        "evidence": [
          {
            "title": "《史记》卷一二三〈大宛列传〉",
            "quoteShort": "“骞身所至者大宛、大月氏、大夏、康居，而传闻其旁大国五六，具为天子言之。”",
            "quote": "“骞身所至者大宛、大月氏、大夏、康居，而传闻其旁大国五六，具为天子言之。”",
            "grade": "A",
            "gradeWhy": "正史 / 实录 / 条约原文 / 官修档案，记当世或近当世之事。",
            "sources": [
              {
                "t": "《史记》卷一二三〈大宛列传〉"
              }
            ]
          }
        ],
        "note": "",
        "cross": ""
      },
      {
        "k": "zhangqian-1",
        "relationType": "envoy",
        "relationTypeLabel": "出使·通商",
        "typeText": "出使·通商",
        "yearText": "前119",
        "timeText": "前119（元狩四年）",
        "place": "安息东界 → 安息王都",
        "foreignName": "安息",
        "foreignRole": "安息王",
        "foreignPolity": "安息（帕提亚帝国）",
        "howMet": "前119年张骞第二次出使西域，遣副使至安息（帕提亚）。",
        "process": "安息王派两万骑到东界迎接，沿途经数十城；汉使归国时，安息遣使随行来汉。",
        "resultImpact": "汉与安息建立官方往来，安息以鸵鸟蛋（大鸟卵）与黎轩善眩人献于汉。",
        "confidence": "确证",
        "doubt": false,
        "evidence": [
          {
            "title": "《史记》卷一二三〈大宛列传〉",
            "quoteShort": "“初，汉使至安息，安息王令将二万骑迎于东界。”",
            "quote": "“初，汉使至安息，安息王令将二万骑迎于东界。东界去王都数千里。行比至，过数十城，人民相属甚多。汉使还，而后发使随汉使来观汉广大，以大鸟卵及黎轩善眩人献于汉。”",
            "grade": "A",
            "gradeWhy": "正史 / 实录 / 条约原文 / 官修档案，记当世或近当世之事。",
            "sources": [
              {
                "t": "《史记》卷一二三〈大宛列传〉"
              }
            ]
          }
        ],
        "note": "",
        "cross": ""
      }
    ],
    "stats": {
      "ix": 2,
      "polity": 2,
      "type": 2,
      "chips": [
        {
          "type": "envoy",
          "label": "出使",
          "n": 1
        },
        {
          "type": "envoy",
          "label": "出使·通商",
          "n": 1
        }
      ]
    }
  },
  "ganying": {
    "key": "ganying",
    "name": "甘英",
    "kicker": "东汉 · 生卒不详 · 班超属吏",
    "identity": "西域都护班超属吏",
    "area": "洛阳—西域—条支",
    "meta": "永元九年奉班超命西使大秦（罗马），抵条支临海而返",
    "doubt": false,
    "doubtWhy": "",
    "doubtPoints": [],
    "syncRead": "甘英西行的同一时期，罗马帝国在图拉真治下达到极盛，地中海世界与东汉各据一端。",
    "sync": [
      {
        "year": "100",
        "title": "扶南建国",
        "region": "南洋"
      },
      {
        "year": "100",
        "title": "西波利尼西亚文化定型",
        "region": "大洋洲"
      },
      {
        "year": "100",
        "title": "特奥蒂瓦坎",
        "region": "美洲"
      },
      {
        "year": "105",
        "title": "罗马极盛",
        "region": "欧洲"
      }
    ],
    "syncTotal": 10,
    "ix": [
      {
        "k": "ganying-0",
        "relationType": "envoy",
        "relationTypeLabel": "出使",
        "typeText": "",
        "yearText": "97",
        "timeText": "97（永元九年）",
        "place": "条支 · 临大海（旧释波斯湾）",
        "foreignName": "安息 / 大秦",
        "foreignRole": "安息西界船人",
        "foreignPolity": "安息 / 大秦（罗马）",
        "howMet": "97年（永元九年）西域都护班超遣甘英出使大秦，甘英西行经安息抵条支。",
        "process": "甘英临「大海」欲渡，安息西界船人告以渡海艰险、须备三年粮，甘英闻之而止。",
        "resultImpact": "中原使者抵达波斯湾一带的最远记录；《后汉书·西域传》保存了安息对海路的描述。",
        "confidence": "确证",
        "doubt": false,
        "evidence": [
          {
            "title": "《后汉书》卷八八〈西域传〉",
            "quoteShort": "“和帝永元九年，都护班超遣甘英使大秦，抵条支。”",
            "quote": "“和帝永元九年，都护班超遣甘英使大秦，抵条支。临大海欲度，而安息西界船人谓英曰：‘海水广大，往来者逢善风三月乃得度，若遇迟风，亦有二岁者，故入海人皆赍三岁粮。海中善使人思土恋慕，数有死亡者。’英闻之乃止。”",
            "grade": "A",
            "gradeWhy": "正史 / 实录 / 条约原文 / 官修档案，记当世或近当世之事。",
            "sources": [
              {
                "t": "《后汉书》卷八八〈西域传〉"
              }
            ]
          }
        ],
        "note": "「大海」旧多释为波斯湾；具体登陆点学界尚有讨论，正文只记「临大海」，不坐实地点。",
        "cross": ""
      }
    ],
    "stats": {
      "ix": 1,
      "polity": 1,
      "type": 1,
      "chips": [
        {
          "type": "envoy",
          "label": "出使",
          "n": 1
        }
      ]
    }
  },
  "xuanzang": {
    "key": "xuanzang",
    "name": "玄奘",
    "kicker": "唐 · 602—664 · 洛州缑氏",
    "identity": "唐僧 · 那烂陀寺学僧",
    "area": "长安—天竺（那烂陀、曲女城）",
    "meta": "西行求法十七年，那烂陀寺学法，《大唐西域记》口述者",
    "doubt": false,
    "doubtWhy": "",
    "doubtPoints": [],
    "syncRead": "玄奘在曲女城辩经前后，阿拉伯人正征服埃及，萨珊波斯走向灭亡。",
    "sync": [
      {
        "year": "639",
        "title": "阿拉伯征服埃及",
        "region": "非洲"
      },
      {
        "year": "642",
        "title": "尼哈温德战役",
        "region": "中东"
      },
      {
        "year": "646",
        "title": "大化改新",
        "region": "东亚"
      },
      {
        "year": "647",
        "title": "戒日王卒",
        "region": "南亚"
      }
    ],
    "syncTotal": 16,
    "ix": [
      {
        "k": "xuanzang-0",
        "relationType": "faith",
        "relationTypeLabel": "传教·译介",
        "typeText": "",
        "yearText": "643",
        "timeText": "643（通行说法；另有 641 说）",
        "place": "曲女城（今印度卡瑙季）",
        "foreignName": "戒日王",
        "foreignRole": "戒日王",
        "foreignPolity": "戒日王朝（曷利沙帝国）",
        "howMet": "玄奘在摩揭陀那烂陀寺求学，643年戒日王在曲女城为他召开无遮大会。",
        "process": "五印度沙门、婆罗门、外道云集，玄奘立大乘义，十八日无人能破。",
        "resultImpact": "大乘教义在印度获公开认可，玄奘声名远播；《大唐西域记》记下戒日王治下的印度。",
        "confidence": "确证",
        "doubt": false,
        "evidence": [
          {
            "title": "《大慈恩寺三藏法师传》卷五",
            "quoteShort": "“望于曲女城为师作一会，命五印度沙门、婆罗门、外道等，示大乘微妙，绝其毁谤之心。”",
            "quote": "“望于曲女城为师作一会，命五印度沙门、婆罗门、外道等，示大乘微妙，绝其毁谤之心，愿师盛德之高，摧其我慢之意。”",
            "grade": "B",
            "gradeWhy": "当事人著述 / 随行记 / 专题史传 / 碑记，成书略晚或带叙述立场。",
            "sources": [
              {
                "t": "《大慈恩寺三藏法师传》卷五"
              }
            ]
          }
        ],
        "note": "大会年份通行作 643，另有 641 说；此处取通行年份，学界异说未抹去。",
        "cross": ""
      }
    ],
    "stats": {
      "ix": 1,
      "polity": 1,
      "type": 1,
      "chips": [
        {
          "type": "faith",
          "label": "传教·译介",
          "n": 1
        }
      ]
    }
  },
  "wangxuance": {
    "key": "wangxuance",
    "name": "王玄策",
    "kicker": "唐 · 生卒不详 · 右率府长史",
    "identity": "右率府长史 · 唐使",
    "area": "长安—吐蕃—中天竺",
    "meta": "三次出使天竺，借吐蕃、泥婆罗兵破中天竺",
    "doubt": false,
    "doubtWhy": "",
    "doubtPoints": [],
    "syncRead": "王玄策借兵破天竺时，萨珊波斯刚刚灭亡，阿拉伯势力正进入中亚。",
    "sync": [
      {
        "year": "642",
        "title": "尼哈温德战役",
        "region": "中东"
      },
      {
        "year": "646",
        "title": "大化改新",
        "region": "东亚"
      },
      {
        "year": "647",
        "title": "戒日王卒",
        "region": "南亚"
      },
      {
        "year": "651",
        "title": "萨珊灭亡",
        "region": "中东"
      }
    ],
    "syncTotal": 17,
    "ix": [
      {
        "k": "wangxuance-0",
        "relationType": "war",
        "relationTypeLabel": "战争",
        "typeText": "",
        "yearText": "648",
        "timeText": "648（贞观二十二年）",
        "place": "中天竺 → 吐蕃 / 泥婆罗",
        "foreignName": "阿罗那顺",
        "foreignRole": "篡臣阿罗那顺",
        "foreignPolity": "中天竺",
        "howMet": "648年（贞观二十二年）王玄策奉命使天竺，适逢中天竺王尸罗逸多死、大臣阿罗那顺篡立。",
        "process": "阿罗那顺发胡兵袭击使团，王玄策被擒后夜遁，赴吐蕃借精锐一千二百、泥婆罗七千余骑反攻，破中天竺。",
        "resultImpact": "献俘长安，阿罗那顺被押解入唐；此为唐代对印度少有的远程用兵记录。",
        "confidence": "确证",
        "doubt": false,
        "evidence": [
          {
            "title": "《旧唐书》卷一九八〈西戎传〉",
            "quoteShort": "“玄策乃挺身宵遁，走至吐蕃，发精锐一千二百人，并泥婆罗国七千余骑，以从玄策。”",
            "quote": "“先是遣右率府长史王玄策使天竺，其四天竺国王咸遣使朝贡。会中天竺王尸罗逸多死，国中大乱，其臣那伏帝阿罗那顺篡立，乃尽发胡兵以拒玄策。玄策从骑三十人与胡御战，不敌，矢尽，悉被擒。……玄策乃挺身宵遁，走至吐蕃，发精锐一千二百人，并泥婆罗国七千余骑，以从玄策。”",
            "grade": "A",
            "gradeWhy": "正史 / 实录 / 条约原文 / 官修档案，记当世或近当世之事。",
            "sources": [
              {
                "t": "《旧唐书》卷一九八〈西戎传〉"
              }
            ]
          }
        ],
        "note": "",
        "cross": ""
      }
    ],
    "stats": {
      "ix": 1,
      "polity": 1,
      "type": 1,
      "chips": [
        {
          "type": "war",
          "label": "战争",
          "n": 1
        }
      ]
    }
  },
  "jianzhen": {
    "key": "jianzhen",
    "name": "鉴真",
    "kicker": "唐 · 688—763 · 扬州江阳",
    "identity": "扬州大明寺高僧",
    "area": "扬州—九州—奈良",
    "meta": "六次东渡，日本律宗初祖，唐招提寺开山",
    "doubt": false,
    "doubtWhy": "",
    "doubtPoints": [],
    "syncRead": "鉴真东渡的同一时期，阿拔斯王朝崛起、法兰克丕平称王，欧亚大陆两端都在换主人。",
    "sync": [
      {
        "year": "751",
        "title": "丕平称王",
        "region": "欧洲"
      },
      {
        "year": "751",
        "title": "怛罗斯之战",
        "region": "中亚"
      },
      {
        "year": "751",
        "title": "阿拔斯崛起",
        "region": "中东"
      },
      {
        "year": "752",
        "title": "东大寺大佛开眼",
        "region": "东亚"
      }
    ],
    "syncTotal": 8,
    "ix": [
      {
        "k": "jianzhen-0",
        "relationType": "faith",
        "relationTypeLabel": "传教·译介",
        "typeText": "",
        "yearText": "753",
        "timeText": "743 发愿 — 753 抵日；754 授戒",
        "place": "扬州 → 九州太宰府 → 奈良东大寺",
        "foreignName": "日本",
        "foreignRole": "圣武天皇朝廷",
        "foreignPolity": "日本（奈良朝廷）",
        "howMet": "应日本僧人荣睿、普照之请，鉴真自743年起六次东渡，前五次皆失败。",
        "process": "753年（天平胜宝六年）第六次东渡成功，抵九州太宰府；次年入奈良东大寺设坛授戒。",
        "resultImpact": "为日本建立正规授戒制度，携去医药、建筑、雕塑技艺；圆寂后弟子造唐招提寺鉴真坐像。",
        "confidence": "确证",
        "doubt": false,
        "evidence": [
          {
            "title": "《唐大和上东征传》",
            "quoteShort": "“今我同法众中，谁有应此远请，向日本国传法者乎？”",
            "quote": "“今我同法众中，谁有应此远请，向日本国传法者乎？”",
            "grade": "B",
            "gradeWhy": "当事人著述 / 随行记 / 专题史传 / 碑记，成书略晚或带叙述立场。",
            "sources": [
              {
                "t": "《唐大和上东征传》"
              }
            ]
          }
        ],
        "note": "",
        "cross": ""
      }
    ],
    "stats": {
      "ix": 1,
      "polity": 1,
      "type": 1,
      "chips": [
        {
          "type": "faith",
          "label": "传教·译介",
          "n": 1
        }
      ]
    }
  },
  "zhenghe": {
    "key": "zhenghe",
    "name": "郑和",
    "kicker": "明 · 1371—1433 · 云南昆阳",
    "identity": "正使太监",
    "area": "南海—印度洋—古里",
    "meta": "七下西洋，宝船舰队最远抵东非",
    "doubt": false,
    "doubtWhy": "",
    "doubtPoints": [],
    "syncRead": "郑和首下西洋前后，帖木儿帝国正横扫西亚，印度洋贸易格局也在重组。",
    "sync": [
      {
        "year": "1400",
        "title": "帖木儿叙利亚",
        "region": "中东"
      },
      {
        "year": "1400",
        "title": "马六甲苏丹",
        "region": "南洋"
      },
      {
        "year": "1400",
        "title": "人文主义",
        "region": "欧洲"
      },
      {
        "year": "1405",
        "title": "帖木儿卒",
        "region": "中亚"
      }
    ],
    "syncTotal": 14,
    "ix": [
      {
        "k": "zhenghe-0",
        "relationType": "envoy",
        "relationTypeLabel": "出使·通商",
        "typeText": "出使·通商",
        "yearText": "1407",
        "timeText": "1407（永乐五年）",
        "place": "古里（今印度卡利卡特）",
        "foreignName": "古里",
        "foreignRole": "古里国王",
        "foreignPolity": "古里国",
        "howMet": "1405年起郑和率宝船队七下西洋，1407年（永乐五年）抵古里。",
        "process": "赍诏敕赐古里国王诰命银印，立碑庭刻石纪念，并与当地进行贸易。",
        "resultImpact": "古里成为船队西行的重要补给与贸易站；碑文记「其国去中国十万余里……刻石于兹永示万世」。",
        "confidence": "确证",
        "doubt": false,
        "evidence": [
          {
            "title": "《瀛涯胜览·古里国》",
            "quoteShort": "“永乐五年，朝廷命正使太监郑和等赍诏敕赐其国王诰命银印给赐……”",
            "quote": "“永乐五年，朝廷命正使太监郑和等赍诏敕赐其国王诰命银印给赐，升赏各头目品级冠带，统领大宝船到彼，起建碑庭，立石云：‘其国去中国十万余里，民物咸若熙皞同风，刻石于兹永示万世。’”",
            "grade": "B",
            "gradeWhy": "当事人著述 / 随行记 / 专题史传 / 碑记，成书略晚或带叙述立场。",
            "sources": [
              {
                "t": "《瀛涯胜览·古里国》"
              },
              {
                "t": "《明史》卷三〇四〈郑和传〉"
              }
            ]
          }
        ],
        "note": "",
        "cross": ""
      }
    ],
    "stats": {
      "ix": 1,
      "polity": 1,
      "type": 1,
      "chips": [
        {
          "type": "envoy",
          "label": "出使·通商",
          "n": 1
        }
      ]
    }
  },
  "gaoxianzhi": {
    "key": "gaoxianzhi",
    "name": "高仙芝",
    "kicker": "唐 · ?—756 · 高句丽人 · 安西节度使",
    "identity": "安西四镇节度使",
    "area": "安西—中亚",
    "meta": "安西四镇节度使，怛罗斯之战唐军主帅",
    "doubt": false,
    "doubtWhy": "",
    "doubtPoints": [],
    "syncRead": "怛罗斯之战的同一年，阿拔斯王朝崛起、法兰克丕平称王，旧秩序同时松动。",
    "sync": [
      {
        "year": "751",
        "title": "丕平称王",
        "region": "欧洲"
      },
      {
        "year": "751",
        "title": "怛罗斯之战",
        "region": "中亚"
      },
      {
        "year": "751",
        "title": "阿拔斯崛起",
        "region": "中东"
      },
      {
        "year": "752",
        "title": "东大寺大佛开眼",
        "region": "东亚"
      }
    ],
    "syncTotal": 8,
    "ix": [
      {
        "k": "gaoxianzhi-0",
        "relationType": "war",
        "relationTypeLabel": "战争",
        "typeText": "",
        "yearText": "751",
        "timeText": "751",
        "place": "怛罗斯城（今哈萨克斯坦塔拉兹附近）",
        "foreignName": "阿拔斯王朝",
        "foreignRole": "阿拔斯军",
        "foreignPolity": "阿拔斯王朝（大食）",
        "howMet": "751年高仙芝以安西节度使率蕃汉军深入中亚，与大食（阿拔斯）军遇于怛罗斯。",
        "process": "相持五日，葛逻禄部阵前倒戈，与大食夹攻，唐军大败，仅数千人还。",
        "resultImpact": "唐朝在中亚的扩张受挫；此役成为阿拉伯与唐在中亚势力消长的转折点。",
        "confidence": "确证",
        "doubt": false,
        "evidence": [
          {
            "title": "《资治通鉴》卷二一六",
            "quoteShort": "“仙芝闻之，将蕃、汉三万众击大食，深入七百馀里，至恒罗斯城，与大食遇。”",
            "quote": "“仙芝闻之，将蕃、汉三万众击大食，深入七百馀里，至恒罗斯城，与大食遇。相持五日，葛罗禄部众叛，与大食夹攻唐军，仙芝大败，士卒死亡略尽，所馀才数千人。”",
            "grade": "A",
            "gradeWhy": "正史 / 实录 / 条约原文 / 官修档案，记当世或近当世之事。",
            "sources": [
              {
                "t": "《资治通鉴》卷二一六"
              },
              {
                "t": "al-Ṭabarī《历史》· Britannica"
              }
            ]
          }
        ],
        "note": "「被俘工匠传造纸术西传」属传统说法、学界有讨论，未写入确证结论。",
        "cross": true
      }
    ],
    "stats": {
      "ix": 1,
      "polity": 1,
      "type": 1,
      "chips": [
        {
          "type": "war",
          "label": "战争",
          "n": 1
        }
      ]
    }
  },
  "xuguangqi": {
    "key": "xuguangqi",
    "name": "徐光启",
    "kicker": "明 · 1562—1633 · 松江府上海县",
    "identity": "礼部尚书兼文渊阁大学士",
    "area": "上海—北京",
    "meta": "礼部尚书兼文渊阁大学士，《农政全书》作者，与利玛窦合译《几何原本》",
    "doubt": false,
    "doubtWhy": "",
    "doubtPoints": [],
    "syncRead": "徐光启与利玛窦合译《几何原本》时，英国正建弗吉尼亚殖民地，欧洲科学革命方兴。",
    "sync": [
      {
        "year": "1603",
        "title": "江户幕府",
        "region": "东亚"
      },
      {
        "year": "1606",
        "title": "扬松抵澳洲",
        "region": "大洋洲"
      },
      {
        "year": "1607",
        "title": "英建弗吉尼亚",
        "region": "美洲"
      },
      {
        "year": "1610",
        "title": "莎士比亚",
        "region": "欧洲"
      }
    ],
    "syncTotal": 22,
    "ix": [
      {
        "k": "xuguangqi-0",
        "relationType": "faith",
        "relationTypeLabel": "传教·译介",
        "typeText": "",
        "yearText": "1607",
        "timeText": "1607（万历三十五年）",
        "place": "北京",
        "foreignName": "利玛窦",
        "foreignRole": "传教士利玛窦",
        "foreignPolity": "耶稣会（意大利）",
        "howMet": "1601年利玛窦定居北京，徐光启与之结交，学习天文、历算。",
        "process": "1607年二人合译《几何原本》前六卷：利玛窦口译，徐光启笔受。",
        "resultImpact": "中文世界第一部系统介绍欧几里得几何的译本，「几何」一词自此沿用。",
        "confidence": "确证",
        "doubt": false,
        "evidence": [
          {
            "title": "徐光启〈刻几何原本序〉",
            "quoteShort": "“几何原本者度数之宗，所以穷方圆平直之情，尽规矩准绳之用也。”",
            "quote": "“几何原本者度数之宗，所以穷方圆平直之情，尽规矩准绳之用也。”",
            "grade": "B",
            "gradeWhy": "当事人著述 / 随行记 / 专题史传 / 碑记，成书略晚或带叙述立场。",
            "sources": [
              {
                "t": "徐光启〈刻几何原本序〉"
              },
              {
                "t": "《四库全书总目·几何原本提要》"
              }
            ]
          }
        ],
        "note": "《四库提要》记「利玛窦译而徐光启所笔受也」，可作中文旁证。",
        "cross": ""
      }
    ],
    "stats": {
      "ix": 1,
      "polity": 1,
      "type": 1,
      "chips": [
        {
          "type": "faith",
          "label": "传教·译介",
          "n": 1
        }
      ]
    }
  },
  "zhengchenggong": {
    "key": "zhengchenggong",
    "name": "郑成功",
    "kicker": "明末清初 · 1624—1662 · 福建南安",
    "identity": "延平郡王 · 国姓爷",
    "area": "金门—台湾",
    "meta": "延平郡王，驱逐荷兰东印度公司，收复台湾",
    "doubt": false,
    "doubtWhy": "",
    "doubtPoints": [],
    "syncRead": "郑成功收复台湾前后，英国发生王政复辟，欧洲列强正加紧向海外扩张。",
    "sync": [
      {
        "year": "1652",
        "title": "荷占好望角",
        "region": "非洲"
      },
      {
        "year": "1656",
        "title": "科普鲁律任大维齐尔",
        "region": "中东"
      },
      {
        "year": "1658",
        "title": "奥朗则布称帝",
        "region": "南亚"
      },
      {
        "year": "1660",
        "title": "英国王政复辟",
        "region": "欧洲"
      }
    ],
    "syncTotal": 16,
    "ix": [
      {
        "k": "zhengchenggong-0",
        "relationType": "war",
        "relationTypeLabel": "战争",
        "typeText": "",
        "yearText": "1662",
        "timeText": "1661 围城 — 1662.2.1 受降",
        "place": "热兰遮城（今台南安平）",
        "foreignName": "荷兰东印度公司",
        "foreignRole": "驻热兰遮城长官",
        "foreignPolity": "荷兰东印度公司（VOC）",
        "howMet": "1661年郑成功率军自金门渡海，围攻荷兰东印度公司据守的热兰遮城。",
        "process": "围城九月，1662年2月1日荷方签字投降，退出台湾。",
        "resultImpact": "《缔和条约》规定荷方交出城堡、火炮、货物与公司财产；台湾重归中国政权管辖。",
        "confidence": "确证",
        "doubt": false,
        "evidence": [
          {
            "title": "《郑成功与荷兰人缔和条约》第二条",
            "quoteShort": "“荷方应将热兰遮城堡、外堡、大炮、剩余的军用物资、商品、现金以及其他属于公司的财产全部交与国姓殿下。”",
            "quote": "“荷方应将热兰遮城堡、外堡、大炮、剩余的军用物资、商品、现金以及其他属于公司的财产全部交与国姓殿下。”",
            "grade": "A",
            "gradeWhy": "正史 / 实录 / 条约原文 / 官修档案，记当世或近当世之事。",
            "sources": [
              {
                "t": "《郑成功与荷兰人缔和条约》第二条"
              }
            ]
          }
        ],
        "note": "",
        "cross": ""
      }
    ],
    "stats": {
      "ix": 1,
      "polity": 1,
      "type": 1,
      "chips": [
        {
          "type": "war",
          "label": "战争",
          "n": 1
        }
      ]
    }
  },
  "qianlong": {
    "key": "qianlong",
    "name": "乾隆",
    "kicker": "清 · 1711—1799 · 在位 1735—1796",
    "identity": "清朝皇帝（在位 1735—1796）",
    "area": "北京—热河",
    "meta": "清朝第六帝，1793年接见英国马戛尔尼使团",
    "doubt": false,
    "doubtWhy": "",
    "doubtPoints": [],
    "syncRead": "乾隆接见马戛尔尼的同一年，法国国王路易十六被处死，欧洲正被大革命震动。",
    "sync": [
      {
        "year": "1788",
        "title": "英殖澳洲",
        "region": "大洋洲"
      },
      {
        "year": "1789",
        "title": "法国大革命",
        "region": "欧洲"
      },
      {
        "year": "1791",
        "title": "海地革命爆发",
        "region": "美洲"
      },
      {
        "year": "1793",
        "title": "路易十六被处死",
        "region": "欧洲"
      }
    ],
    "syncTotal": 37,
    "ix": [
      {
        "k": "qianlong-0",
        "relationType": "dip",
        "relationTypeLabel": "外交·交涉",
        "typeText": "",
        "yearText": "1793",
        "timeText": "1793",
        "place": "热河（承德）· 北京",
        "foreignName": "马戛尔尼",
        "foreignRole": "特使马戛尔尼",
        "foreignPolity": "英国",
        "howMet": "1793年英国首派马戛尔尼使团来华，以祝寿名义抵热河、北京，要求扩大通商。",
        "process": "双方为觐见礼节争执，英使仅行单膝礼；清廷拒绝其通商请求。",
        "resultImpact": "乾隆致英王敕谕称「天朝物产丰盈，无所不有」，成为清朝闭关自守的标志性文献。",
        "confidence": "确证",
        "doubt": false,
        "evidence": [
          {
            "title": "乾隆〈敕谕英咭唎国王〉",
            "quoteShort": "“天朝物产丰盈，无所不有，原不藉外夷货物以通有无。”",
            "quote": "“天朝物产丰盈，无所不有，原不藉外夷货物以通有无。”",
            "grade": "A",
            "gradeWhy": "正史 / 实录 / 条约原文 / 官修档案，记当世或近当世之事。",
            "sources": [
              {
                "t": "〈敕谕英咭唎国王〉·《清高宗实录》"
              }
            ]
          }
        ],
        "note": "觐见礼节细节各书记载不一（有「单膝跪」与「九叩」之争），此处只记「双方就礼节发生争执」。",
        "cross": ""
      }
    ],
    "stats": {
      "ix": 1,
      "polity": 1,
      "type": 1,
      "chips": [
        {
          "type": "dip",
          "label": "外交·交涉",
          "n": 1
        }
      ]
    }
  },
  "linzexu": {
    "key": "linzexu",
    "name": "林则徐",
    "kicker": "清 · 1785—1850 · 福建侯官",
    "identity": "钦差大臣（赴粤禁烟）",
    "area": "北京—广州",
    "meta": "钦差大臣，虎门销烟，鸦片战争前夕对英交涉",
    "doubt": false,
    "doubtWhy": "",
    "doubtPoints": [],
    "syncRead": "虎门销烟的同一时期，欧洲跨洋蒸汽航运兴起，奥斯曼颁布坦志麦特诏令。",
    "sync": [
      {
        "year": "1839",
        "title": "跨洋蒸汽航运",
        "region": "欧洲"
      },
      {
        "year": "1839",
        "title": "坦志麦特诏令",
        "region": "中东"
      },
      {
        "year": "1840",
        "title": "马克思主义",
        "region": "欧洲"
      },
      {
        "year": "1840",
        "title": "怀唐伊条约",
        "region": "大洋洲"
      }
    ],
    "syncTotal": 43,
    "ix": [
      {
        "k": "linzexu-0",
        "relationType": "dip",
        "relationTypeLabel": "外交·交涉",
        "typeText": "",
        "yearText": "1839",
        "timeText": "1839",
        "place": "广州 · 虎门",
        "foreignName": "义律",
        "foreignRole": "驻华商务监督义律",
        "foreignPolity": "英国",
        "howMet": "1839年林则徐以钦差大臣赴粤禁烟，饬令外国烟贩缴烟，与英国商务监督义律直接交涉。",
        "process": "林则徐围困商馆、断其接济，义律被迫令英商交出鸦片二万余箱；6月于虎门海滩当众销毁。",
        "resultImpact": "虎门销烟成为近代中国禁烟标志；英方以此为由发动鸦片战争。",
        "confidence": "确证",
        "doubt": false,
        "evidence": [
          {
            "title": "林则徐〈谕各国夷人呈缴烟土稿〉",
            "quoteShort": "“若鸦片一日未绝，本大臣一日不回，誓与此事相始终，断无中止之理。”",
            "quote": "“若鸦片一日未绝，本大臣一日不回，誓与此事相始终，断无中止之理。”",
            "grade": "B",
            "gradeWhy": "当事人著述 / 随行记 / 专题史传 / 碑记，成书略晚或带叙述立场。",
            "sources": [
              {
                "t": "林则徐〈谕各国夷人呈缴烟土稿〉"
              }
            ]
          }
        ],
        "note": "",
        "cross": ""
      }
    ],
    "stats": {
      "ix": 1,
      "polity": 1,
      "type": 1,
      "chips": [
        {
          "type": "dip",
          "label": "外交·交涉",
          "n": 1
        }
      ]
    }
  },
  "lihongzhang": {
    "key": "lihongzhang",
    "name": "李鸿章",
    "kicker": "清 · 1823—1901 · 安徽合肥",
    "identity": "直隶总督兼北洋大臣",
    "area": "天津—马关",
    "meta": "直隶总督兼北洋大臣，1895年马关议和全权大臣",
    "doubt": false,
    "doubtWhy": "",
    "doubtPoints": [],
    "syncRead": "李鸿章在马关议和的同一年，电影与无线电技术问世，世界正进入新的传播时代。",
    "sync": [
      {
        "year": "1893",
        "title": "新西兰女权",
        "region": "大洋洲"
      },
      {
        "year": "1894",
        "title": "东学党起义",
        "region": "东亚"
      },
      {
        "year": "1895",
        "title": "电影与无线电",
        "region": "欧洲"
      },
      {
        "year": "1896",
        "title": "阿杜瓦战役",
        "region": "非洲"
      }
    ],
    "syncTotal": 47,
    "ix": [
      {
        "k": "lihongzhang-0",
        "relationType": "dip",
        "relationTypeLabel": "外交·交涉",
        "typeText": "",
        "yearText": "1895",
        "timeText": "1895",
        "place": "日本马关（下关）",
        "foreignName": "伊藤博文",
        "foreignRole": "内阁总理大臣伊藤博文",
        "foreignPolity": "日本",
        "howMet": "甲午战败后，1895年李鸿章作为清廷全权大臣赴日本马关，与伊藤博文谈判。",
        "process": "谈判期间李鸿章遇刺受伤，日方稍减赔款；4月17日签订《马关条约》。",
        "resultImpact": "条约规定割让台湾、澎湖，赔款二亿两，承认朝鲜「独立」；东亚格局由此改变。",
        "confidence": "确证",
        "doubt": false,
        "evidence": [
          {
            "title": "《马关条约》第一款",
            "quoteShort": "“中国认明朝鲜国确为完全无缺之独立自主……”",
            "quote": "“中国认明朝鲜国确为完全无缺之独立自主，故凡有亏损独立自主体制，即如该国向中国所修贡献典礼，嗣后全行废绝。”",
            "grade": "A",
            "gradeWhy": "正史 / 实录 / 条约原文 / 官修档案，记当世或近当世之事。",
            "sources": [
              {
                "t": "《马关条约》第一款"
              },
              {
                "t": "中国社会科学院近代史研究所"
              }
            ]
          }
        ],
        "note": "",
        "cross": ""
      }
    ],
    "stats": {
      "ix": 1,
      "polity": 1,
      "type": 1,
      "chips": [
        {
          "type": "dip",
          "label": "外交·交涉",
          "n": 1
        }
      ]
    }
  },
  "doubt": {
    "key": "doubt",
    "name": "马可·波罗",
    "kicker": "存疑示例 · 约1254—1324 · 威尼斯",
    "identity": "威尼斯商人旅行者（传统说法）",
    "area": "威尼斯—上都 / 大都（存疑）",
    "meta": "《马可·波罗行纪》所述东方见闻，是否亲历中国至今存疑",
    "doubt": true,
    "doubtWhy": "传统说法称马可·波罗于1275年抵元上都、受忽必烈任用十七年。但中文正史与元代档案中找不到他的名字，书中又未提长城、茶、缠足等当时中国最醒目的标志；因此「是否到过中国」学界长期争论，不能作为确证往来。",
    "doubtPoints": [
      "中文正史、元代公文与地方志均无「马可·波罗」记载。",
      "书中未提长城、茶、缠足、汉字等，与其「在中国十七年」的经历不符。",
      "Wood《Did Marco Polo Go to China?》与 Rachewiltz 书评等均提出系统质疑。"
    ],
    "syncRead": "传统说法中马可·波罗东游的同一时期，元军两次征日，东亚海疆战事不断。",
    "sync": [
      {
        "year": "1269",
        "title": "塔剌思会盟",
        "region": "中亚"
      },
      {
        "year": "1271",
        "title": "马可·波罗东游",
        "region": "欧洲"
      },
      {
        "year": "1274",
        "title": "元寇文永之役",
        "region": "东亚"
      },
      {
        "year": "1281",
        "title": "弘安之役",
        "region": "东亚"
      }
    ],
    "syncTotal": 14,
    "ix": [
      {
        "k": "doubt-0",
        "relationType": "faith",
        "relationTypeLabel": "游历（存疑）",
        "typeText": "游历（存疑）",
        "yearText": "1275—1291",
        "timeText": "1275—1291（传统说法）",
        "place": "上都 / 大都（传统说法）",
        "foreignName": "忽必烈",
        "foreignRole": "忽必烈（元世祖）",
        "foreignPolity": "元朝",
        "howMet": "传统说法称马可·波罗随父叔于1275年抵元上都，受忽必烈任用。",
        "process": "《马可·波罗行纪》记述其在元朝十七年的见闻，但中文史籍无其名。",
        "resultImpact": "该书深刻影响欧洲对中国的想象；他是否亲身到访，至今存疑。",
        "confidence": "存疑",
        "doubt": true,
        "evidence": [
          {
            "title": "Britannica · Marco Polo: Sojourn in China",
            "quoteShort": "“Still others argue that he never went to China at all…”",
            "quote": "“Still others argue that he never went to China at all, noting that he failed… to mention the Great Wall of China, the use of tea… and that contemporary Chinese records show no trace of Polo.”",
            "grade": "D",
            "gradeWhy": "传统说法或二手综述，未见中文一手记载，单列存疑，不计入确证。",
            "sources": [
              {
                "t": "Britannica · Marco Polo"
              },
              {
                "t": "F. Wood《Did Marco Polo Go to China?》"
              }
            ]
          }
        ],
        "note": "",
        "cross": ""
      }
    ],
    "stats": {
      "ix": 0,
      "polity": 0,
      "type": 0,
      "chips": []
    }
  }
};

var ORDER = [
  "zhangqian",
  "ganying",
  "xuanzang",
  "wangxuance",
  "jianzhen",
  "zhenghe",
  "gaoxianzhi",
  "xuguangqi",
  "zhengchenggong",
  "qianlong",
  "linzexu",
  "lihongzhang",
  "doubt"
];

var BY_NAME = {
  "张骞": "zhangqian",
  "甘英": "ganying",
  "玄奘": "xuanzang",
  "王玄策": "wangxuance",
  "鉴真": "jianzhen",
  "郑和": "zhenghe",
  "高仙芝": "gaoxianzhi",
  "徐光启": "xuguangqi",
  "郑成功": "zhengchenggong",
  "乾隆": "qianlong",
  "林则徐": "linzexu",
  "李鸿章": "lihongzhang",
  "马可·波罗": "doubt",
  "马可波罗": "doubt"
};

module.exports = { PERSONS: PERSONS, ORDER: ORDER, BY_NAME: BY_NAME, GRADE_WHY: GRADE_WHY };
