// relation-utils.js — 关系标签提取与排序
// 与 web 版 relationUtils.ts 保持同步

var ROLE_SIMPLIFY = {
  '子': '儿子', '女儿': '女儿', '女': '女儿', '父': '父亲', '母': '母亲',
  '兄': '兄长', '弟': '弟弟', '姐': '姐姐', '妹': '妹妹',
  '侄': '侄子', '叔': '叔叔', '叔父': '叔叔', '伯父': '伯父',
  '孙': '孙子', '祖': '祖父', '曾孙': '曾孙',
  '养子': '养子', '养父': '养父', '养孙': '养孙', '养女': '养女',
  '从子': '侄子', '外孙': '外孙', '外甥': '外甥',
  '妾': '妾室', '原配夫人': '原配',
  '妃嫔': '妃子', '嫔妃': '妃子', '后妃': '妃子', '妃': '妃子',
  '公公': '公公', '婆婆': '婆婆', '儿媳妇': '儿媳妇', '儿媳': '儿媳妇',
  '生母': '生母', '生父': '生父', '嫡母': '嫡母', '养母': '养母',
  '皇后': '皇后', '妃子': '妃子', '才人': '才人', '夫人': '妻子',
  '二夫人': '二夫人', '三夫人': '三夫人', '四夫人': '四夫人',
  '五夫人': '五夫人', '六夫人': '六夫人', '七夫人': '七夫人',
  '弟子': '弟子', '学生': '学生', '师父': '师父', '老师': '老师', '门生': '门生',
  '挚友': '挚友', '知己': '知己',
  '下属': '下属', '好友': '好友', '对手': '对手', '敌人': '敌人',
  '父子': '父子', '兄弟': '兄弟', '母子': '母子',
  '夫妻': '夫妻', '叔侄': '叔侄',
  '姐妹': '姐妹', '兄妹': '兄妹', '姐弟': '姐弟',
  '义兄': '义兄', '义弟': '义弟',
  '君': '君主', '君主': '君主', '臣': '臣子',
  '仲父': '仲父',
  '次子': '儿子', '长子': '儿子',
  '第三子': '儿子', '第四子': '儿子', '第五子': '儿子',
  '第六子': '儿子', '第七子': '儿子', '第八子': '儿子',
  '第九子': '儿子', '第十子': '儿子',
  '幼子': '儿子', '长女': '女儿', '夫': '丈夫', '妻': '妻子',
  '第一任妻子': '原配', '第二任妻子': '二夫人', '第三任妻子': '三夫人',
  '第一任妻': '原配', '第二任妻': '二夫人', '第三任妻': '三夫人',
  '第四任妻子': '四夫人', '第五任妻子': '五夫人', '第六任妻子': '六夫人', '第七任妻子': '七夫人',
  '原配妻子': '原配',
  '伴侣': '伴侣', '丈夫': '丈夫', '妻子': '妻子', '配偶': '配偶',
  '外叔公': '外叔公', '外甥孙': '外甥孙',
  '舅舅': '舅舅',
  '曾祖父': '曾祖父', '外曾祖父': '外曾祖父', '外曾外祖父': '外曾外祖父',
  '外祖母': '外祖母', '曾祖母': '曾祖母',
  '伯母': '伯母', '叔母': '叔母',
  '孙女': '孙女', '外孙女': '外孙女',
  '女婿': '女婿', '岳父': '岳父', '岳母': '岳母',
  '外甥女': '外甥女', '侄女': '侄女',
  '姨妈': '姨母', '姨母': '姨母', '姑妈': '姑妈', '姑母': '姑母',
  '外甥孙女': '外甥孙女',
  // 排行
  '次女': '女儿', '幼女': '女儿', '三女': '女儿', '独女': '女儿',
  '三子': '儿子', '四子': '儿子', '五子': '儿子', '独子': '儿子',
  '幺子': '儿子', '幺女': '女儿',
  // 配偶变体
  '正妻': '原配', '正室': '原配', '侧室': '妾室', '继室': '妻子',
  '继母': '继母', '继父': '继父', '后母': '后母', '后父': '后父',
  '庶母': '庶母', '庶父': '庶父',
  // 兄弟姐妹变体
  '胞兄': '兄长', '胞弟': '弟弟', '胞姐': '姐姐', '胞妹': '妹妹',
  '堂兄': '兄长', '堂弟': '弟弟', '堂姐': '姐姐', '堂妹': '妹妹',
  '表兄': '兄长', '表弟': '弟弟', '表姐': '姐姐', '表妹': '妹妹',
  '亲兄': '兄长', '亲弟': '弟弟', '亲姐': '姐姐', '亲妹': '妹妹',
  '亲哥哥': '兄长', '亲弟弟': '弟弟', '亲姐姐': '姐姐', '亲妹妹': '妹妹',
  // 义亲
  '义子': '义子', '义女': '义女', '义父': '义父', '义母': '义母',
  '干爹': '义父', '干妈': '义母', '干儿子': '义子', '干女儿': '义女',
  // 其他
  '同僚': '同僚', '合作': '合作', '联合': '联合',
  '上级': '上级', '下级': '下级', '部下': '下级',
  '影响': '影响', '启发': '影响',
  '战友': '战友', '同事': '同事',
  '政敌': '政敌',
  '领袖': '领袖', '盟友': '盟友',
  '前夫': '前夫', '前妻': '前妻', '亡夫': '亡夫', '亡妻': '亡妻',
  '未婚夫': '未婚夫', '未婚妻': '未婚妻',
  '结发妻': '原配',
  '外祖父': '外祖父', '外曾祖母': '外曾祖母',
  '曾孙': '曾孙', '曾孙女': '曾孙女',
  '养孙': '养孙', '养孙女': '养孙女',
  '重孙': '曾孙', '玄孙': '玄孙',
  '养祖父': '养祖父', '养祖母': '养祖母',
  '拜把兄弟': '拜把兄弟', '结拜兄弟': '拜把兄弟',
  '连襟': '连襟', '妯娌': '妯娌', '亲家': '亲家',
  '青梅竹马': '青梅竹马', '初恋': '初恋',
  '追随者': '追随者', '入幕': '入幕',
  '伯乐': '伯乐', '恩师': '恩师',
  '同父异母弟': '弟弟', '同父异母兄': '兄长', '同父异母姐': '姐姐', '同父异母妹': '妹妹',
  '同母异父弟': '弟弟', '同母异父兄': '兄长',
};

var ROLE_OPPOSITE = {
  '儿子': '父亲', '女儿': '父亲', '父亲': '儿子', '母亲': '儿子',
  '兄长': '弟弟', '弟弟': '兄长',
  '姐姐': '妹妹', '妹妹': '姐姐',
  '叔叔': '侄子', '侄子': '叔叔', '侄女': '叔叔', '伯父': '侄子',
  '祖父': '孙子', '孙子': '祖父', '曾孙': '曾祖父', '曾祖父': '曾孙',
  '外祖父': '外孙', '外孙': '外祖父', '外曾祖父': '外曾孙', '外曾外祖父': '外曾外孙',
  '外曾孙': '外曾祖父', '外曾外孙': '外曾外祖父',
  '外甥': '舅舅', '舅舅': '外甥',
  '外甥女': '舅舅',
  '姨妈': '外甥', '姨母': '外甥',
  '姑妈': '侄子', '姑母': '侄子',
  '侄女': '叔叔',
  '女婿': '岳父', '岳父': '女婿',
  '外甥孙女': '外叔公',
  '外祖母': '外孙',
  '曾祖母': '曾孙',
  '伯母': '侄子', '叔母': '侄子',
  '祖母': '孙子', '奶奶': '孙子',
  '原配夫人': '丈夫', '夫人': '丈夫',
  '婆婆': '儿媳妇',
  '孙女': '祖父', '外孙女': '外祖父',
  '曾孙女': '曾祖父', '外曾孙女': '外曾祖父',
  '外曾外孙女': '外曾外祖父',
  '养孙女': '养祖父',
  '养子': '养父', '养父': '养子', '养孙': '养祖父',
  '弟子': '师父', '师父': '弟子',
  '学生': '老师', '老师': '学生', '门生': '老师',
  '生母': '儿子', '生父': '儿子', '嫡母': '庶子',
  '君主': '臣子', '臣子': '君主',
  '义兄': '义弟', '义弟': '义兄',
  '妻子': '丈夫', '丈夫': '妻子', '配偶': '配偶',
  '皇后': '丈夫', '妃子': '丈夫', '才人': '丈夫',
  '伴侣': '丈夫',
  '外叔公': '外甥孙', '外甥孙': '外叔公',
  '下级': '上级', '上级': '下级', '部下': '上级',
  '合作': '合作', '联合': '联合',
  '战友': '战友', '同事': '同事',
  '影响': '影响',
  '政敌': '政敌',
  '未婚妻': '未婚夫', '未婚夫': '未婚妻',
  '前妻': '前夫', '前夫': '前妻',
  '亡妻': '亡夫', '亡夫': '亡妻',
  '继母': '儿子', '继父': '儿子', '后母': '儿子', '后父': '儿子',
  '庶母': '庶子', '庶父': '庶子',
  '义子': '义父', '义女': '义父', '义父': '义子', '义母': '义子',
  '拜把兄弟': '拜把兄弟', '结拜兄弟': '拜把兄弟',
  '连襟': '连襟', '妯娌': '妯娌', '亲家': '亲家',
  '追随者': '上级', '入幕': '上级',
  '伯乐': '弟子', '恩师': '弟子',
  '妾室': '丈夫',
  '青梅竹马': '青梅竹马', '初恋': '初恋',
};

var COMPOUND_ROLES = [
  '原配夫人', '二夫人', '三夫人', '四夫人', '五夫人', '六夫人', '七夫人',
  '皇后', '妃子', '才人', '生母', '嫡母', '妾室', '拜把兄弟',
  '夫人', '伴侣', '丈夫', '妻子',
  '外叔公', '外甥孙', '舅舅',
  '外曾祖父', '外曾外祖父',
  '结拜兄弟', '拜把兄弟',
];

var CHINESE_NUMS = { '一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10 };

var VALID_ROLES = (function() {
  var s = {};
  Object.values(ROLE_SIMPLIFY).forEach(function(v) { s[v] = true; });
  Object.keys(ROLE_OPPOSITE).forEach(function(k) { s[k] = true; });
  Object.values(ROLE_OPPOSITE).forEach(function(v) { s[v] = true; });
  COMPOUND_ROLES.forEach(function(r) { s[r] = true; });
  return s;
})();

var ROLE_PREFIXES = (function() {
  var keys = Object.keys(ROLE_SIMPLIFY);
  keys.sort(function(a, b) { return b.length - a.length; });
  return keys;
})();

function isLabel(str) {
  if (!str || str.length < 2 || str.length > 6) return false;
  return !!VALID_ROLES[str];
}

// 提取关系标签（从描述文本中）
function extractRelationLabel(desc, figureName) {
  if (!desc || !figureName) return '';
  var subject, role;

  var m = desc.match(/^(.+?)[是为]([^之的，,]+)[之的]([^，,]+)/);
  if (m) {
    subject = m[1];
    role = m[3];
  }

  if (!subject) {
    m = desc.match(/^(.+?)曾[是为]([^之的，,]+)[之的]([^，,]+)/);
    if (m) {
      subject = m[1];
      role = m[3];
    }
  }

  if (!subject) {
    m = desc.match(/^(.+?)曾[是为](.+?)(才人|夫人|丈夫|妻子|皇后|妃子|伴侣|原配夫人|二夫人|三夫人|四夫人|五夫人|六夫人|七夫人)$/);
    if (m && m[1] === figureName) {
      subject = m[1];
      role = m[3];
    }
  }

  if (!subject) {
    for (var i = 0; i < COMPOUND_ROLES.length; i++) {
      var cr = COMPOUND_ROLES[i];
      if (desc.indexOf(cr) >= 0) {
        m = desc.match(/^(.+?)(?:曾)?[是为]/);
        if (m && m[1] === figureName) {
          subject = m[1];
          role = cr;
          break;
        }
      }
    }
  }

  if (!subject) {
    m = desc.match(/^(.+?)[是为](.+?)(夫人|丈夫|妻子|皇后|妃子|伴侣|原配夫人|二夫人|三夫人|四夫人|五夫人|六夫人|七夫人)$/);
    if (m && m[1] === figureName) {
      subject = m[1];
      role = m[3];
    }
  }

  if (!subject) {
    m = desc.match(/^(.+?)[是为](.+?)([第次长幼幺][一二三四五六七八九十百千]*[子女子女])/);
    if (m && m[1] === figureName) {
      subject = m[1];
      role = m[3];
    }
  }

  // 新增步骤：Web 端同步的 "X为Y+直接关系后缀" 匹配（无"之"分隔）
  if (!subject) {
    var directSuffixes = '长[女子]|次[女子]|幼[女子]|[第][一二三四五六七八九十百千]+[女子]|胞[姐姊妹兄弟]|原配|丈夫|妻子|皇后|妃子|才人|伴侣|兄弟|姐妹|兄妹|姐弟|挚友|知己|好友|学生|弟子|门生|老师|师父|师傅|君主|臣子|下属|对手|敌人|朋友|后代|后裔|养子|养女|义子|义女';
    m = desc.match(new RegExp('^(.+?)[是为]([^，,]+?)(' + directSuffixes + ')$'));
    if (m) {
      subject = m[1];
      role = m[3];
    }
  }

  if (!subject) {
    if (ROLE_SIMPLIFY[desc]) {
      subject = figureName;
      role = desc;
    }
  }
  if (!subject) {
    for (var pi = 0; pi < ROLE_PREFIXES.length; pi++) {
      var prefix = ROLE_PREFIXES[pi];
      if (desc.length > prefix.length && desc.indexOf(prefix) === 0) {
        var afterName = desc.substring(prefix.length);
        var extractName = afterName.replace(/（.*$/, '');
        if (extractName.length > 0 && extractName.length <= 6) {
          subject = extractName;
          role = prefix;
          break;
        }
      }
    }
  }

  if (!subject) {
    var commaIdx = desc.indexOf('，');
    if (commaIdx > 2 && commaIdx < 20) {
      var beforeComma = desc.substring(0, commaIdx);
      var allRoleKeys = Object.keys(ROLE_SIMPLIFY);
      var allRoles = COMPOUND_ROLES.concat(allRoleKeys);
      allRoles = allRoles.filter(function(r) { return r.length >= 2; });
      allRoles.sort(function(a, b) { return b.length - a.length; });
      for (var ri = 0; ri < allRoles.length; ri++) {
        var r = allRoles[ri];
        var roleIdx = beforeComma.indexOf(r);
        if (roleIdx >= 2 && roleIdx + r.length <= beforeComma.length) {
          var possibleSubject = beforeComma.substring(0, roleIdx);
          if (possibleSubject.length >= 2 && possibleSubject.length <= 4) {
            subject = possibleSubject;
            role = r;
            var s5 = ROLE_SIMPLIFY[role] || role;
            return isLabel(s5) ? s5 : '';
          }
        }
      }
    }
  }

  if (!subject) {
    m = desc.match(/^([^，,]{1,4})所生(长[女子]|次[女子]|[女子])/);
    if (m) {
      var s6 = ROLE_SIMPLIFY[m[2]] || m[2];
      if (isLabel(s6)) {
        return s6;
      }
      subject = m[1];
      role = m[2];
    }
  }

  // 新增：兜底 regex 匹配
  if (!subject) {
    // 匹配 "X为Y之Z" 格式
    m = desc.match(/^(.+?)[是为](.+?)[之的](父亲|母亲|儿子|女儿|丈夫|妻子|兄长|弟弟|姐姐|妹妹|祖父|祖母|孙子|孙女|生母|生父|养母|养父|养子|养女|原配|原配夫人|夫人|妾室|皇后|妃子|伴侣|公公|婆婆|儿媳妇|女婿|伯父|叔叔|舅舅|姑妈|姨母|侄子|侄女|外甥|外甥女|外孙|外孙女|曾孙|曾孙女|主公|君主|上级|下级|下属|同僚|老师|师父|学生|弟子|敌人|对手|盟友|合作|挚友|好友|知己|领袖|战友|兄长|弟弟|姐姐|妹妹|义兄|义弟|义父|义子|义女|拜把兄弟|结拜兄弟|岳父|岳母|连襟|妯娌|仲父|伯乐|恩师|追随者|入幕|政敌|同僚|影响|启发|前夫|前妻|亡夫|亡妻|未婚夫|未婚妻|继母|继父|后母|后父|庶母|庶父|叔父|外甥孙女|外甥孙|外叔公|外祖父|外祖母|外曾祖父|外曾外祖父|外曾外孙|外曾孙|养祖父|养祖母|养孙|养孙女|曾祖父|曾祖母|玄孙|重孙|亲哥哥|亲弟弟|亲姐姐|亲妹妹|胞兄|胞弟|胞姐|胞妹|堂兄|堂弟|堂姐|堂妹|表兄|表弟|表姐|表妹|青梅竹马|初恋|亲家)/);
    if (m) {
      subject = m[1];
      role = m[3];
    }
  }

  if (!subject || !role) return '';
  var simplified = ROLE_SIMPLIFY[role] || role;
  if (figureName.indexOf(subject) >= 0) return isLabel(simplified) ? simplified : '';
  var opp = ROLE_OPPOSITE[simplified];
  return (opp && isLabel(opp)) ? opp : (isLabel(simplified) ? simplified : '');
}

// 排序用标签提取（更宽松的匹配）
function getSortLabel(desc, figureName) {
  if (!desc || !figureName) return '';

  // 尝试 "X为Y之Z" 格式
  var m = desc.match(/^(.+?)[是为](.+?)[之的]([^，,]+)/);
  if (m) {
    var subject = m[1];
    var role = m[3];
    var simplified = ROLE_SIMPLIFY[role] || role;
    if (figureName.indexOf(subject) >= 0) return isLabel(simplified) ? simplified : '';
    var opp = ROLE_OPPOSITE[simplified];
    return opp || '';
  }

  // 尝试 "X之Y" 格式
  m = desc.match(/^(.+?)[之的]([^，,]+)/);
  if (m) {
    var s = m[1];
    var r = m[2];
    if (figureName.indexOf(s) >= 0) {
      var sr = ROLE_SIMPLIFY[r] || r;
      return isLabel(sr) ? sr : '';
    } else {
      var sr2 = ROLE_SIMPLIFY[r] || r;
      var opp2 = ROLE_OPPOSITE[sr2];
      return opp2 || '';
    }
  }

  // 兜底：Web 端同步的增强提取逻辑
  if (/^(师从|师承|拜师)/.test(desc)) return '老师';
  if (/\b(弟子|学生|门生|徒弟)\b/.test(desc)) return '学生';
  if (/\b(老师|师父|师傅|恩师|师尊)\b/.test(desc)) return '老师';

  var fatherMatch = desc.match(/为([^，,]+)之父/);
  if (fatherMatch && figureName && fatherMatch[1] && desc.indexOf(figureName) === 0) return '父亲';
  var sonMatch = desc.match(/(?:是|为|系)([^，,]+)(?:之)?(子|女|儿)/);
  if (sonMatch && figureName && sonMatch[1] && desc.indexOf(figureName) === 0) return sonMatch[2] === '女' ? '女儿' : '儿子';

  if (/(好友|挚友|朋友|知己)/.test(desc)) return '挚友';
  if (/嫁与|嫁给|嫁给了/.test(desc)) return '丈夫';
  if (/(对手|敌人|政敌|论敌)/.test(desc)) return '对手';
  if (/(妻子|夫人|皇后|妃子|原配|妾室|丈夫|夫君)/.test(desc)) return '夫妻';
  if (/(合作|同僚|战友|共事|同事|搭档)/.test(desc)) return '同僚';
  if (/(影响|启发|传承|继承|开创|奠基)/.test(desc)) return '影响';

  return '';
}

// 获取排序用的角色标签
function getSortRole(desc, type, figureName) {
  // 优先使用传入的 _relationType（已从中心人物视角标准化）
  var simplified = ROLE_SIMPLIFY[type] || type || '';
  if (simplified && isLabel(simplified)) return simplified;

  // 非标准类型（家族血脉/政治关系等）：跳过 extractRelationLabel
  if (type === '家族血脉' || type === '政治关系' || type === 'colleague' || type === 'enemy') return '';

  // 常见关系类型原始值映射（type 本身就是关系词时，type 是权威）
  if (simplified === '父子') return '儿子';
  if (simplified === '兄弟') return '兄弟';
  if (simplified === '夫妻') return '夫妻';
  if (simplified === '母子') return '儿子';
  if (simplified === '师徒') return '学生';
  if (simplified === '叔侄') return '侄子';
  if (type.indexOf('敌对') >= 0 || type.indexOf('论敌') >= 0) return '对手';
  if (type.indexOf('影响') >= 0) return '影响';
  if (type.indexOf('合作') >= 0 || type.indexOf('共事') >= 0) return '同僚';
  if (type.indexOf('朋友') >= 0 || type.indexOf('知己') >= 0) return '挚友';
  if (type.indexOf('师徒') >= 0 || type.indexOf('师承') >= 0) return '学生';

  // [重要] 只有当 type 为空时，才用 desc 提取标签。
  //    type 非空时它就是权威关系词，desc 只是传记上下文——
  //    desc 里出现的「皇后」「夫人」「妻子」等词会污染真实关系：
  //    例：高俭 type=丞相、desc「高士廉，文德皇后舅父，官至尚书右仆射」，
  //    旧逻辑 getSortLabel 命中「皇后」→ 误判成「夫妻」→ 把丞相排到配偶层。
  if (!type) {
    var label = getSortLabel(desc, figureName);
    if (label) return label;
  }

  return simplified;
}

// ============================================================
// 岳父/岳母排序：站在「父母之后、配偶之前」的姻亲长辈层
// ============================================================
//
// 动机：张作霖有赵占元、寿山两位岳父，两者都是「岳父」无差别，
// 旧版只能退到姓名拼音（寿 shou < 赵 zhao）→ 原配之父反而排在末位。
// 正确语义：**原配的父亲 > 其他夫人的父亲**。
//
// 由于服务端 /api/figures 只返回 1 跳关系，「岳父 → 女儿」这条边通常
// 不在搜索结果里，因此按可靠性依次尝试三种推导：
//   A. 关系里真存在「岳父 → 女儿」边，且该女儿正是中心人物的配偶
//   B. 岳父的 description 里出现中心人物某位配偶的姓名 → 用该配偶的排行
//   C. 岳父的 description 里直接写了排行词（原配/五夫人…）
// 三者都取不到返回 null，退回父母同层的 IN_LAW_BASE 档位。
//
// [重要] 档位语义（2026-09-16 修正）：
//   父母(10) → **岳父岳母(12.05-12.55)** → 配偶(15-19) → 子女(21+) → …
//   岳父岳母属于「因子女婚配而结成的长辈」，与父母同为长辈层，
//   必须整体排在配偶、子女之前；**岳父之间**再按女儿排行细分。
//   实现：取「配偶排行」，线性映射到 (12.05, 12.6) 区间——
//     12.05 + (配偶排行 - 配偶层基准 21) * 0.1
//   原配之父 = 12.05、二夫人之父 = 12.15 … 六夫人之父 = 12.55。
//   用小数是为了在「父母层整数档」与「配偶层整数档」之间插入，
//   不占用任何现有档位，改档不会牵动其他层。
// [重要] 刻意**不含**公公/婆婆：公公婆婆虽也是「因子女婚配结成的长辈」，
// 但本次需求只要求调整「岳父岳母」，把它们一起提到长辈层属于
// 超出需求的行为变更，风险不可控。保持它们原有档位不变。
var INLAW_TYPE_RE = /岳父|岳母/;

// [重要] 岳父/岳母的**变体写法**（库内真实存在，李世民/武则天均有）：
//   「第一任妻父」= 第一任妻子的父亲（原配之父）
//   「妾之父」     = 妾室的父亲
//   「妻之父」/「妻父」/「丈夫之父」= 配偶的父亲
//   这些以前不命中 INLAW_TYPE_RE，跌到 sortRelated 末尾的 /父/ 兜底 → 档位 10，
//   与「父母」同层、又因类型字符串「第一任妻父」<「母」而排到母亲之前 —— 错乱。
//   现把它们一并纳入姻亲长辈层（12.x），排在父母之后、配偶之前。
var INLAW_VARIANT_RE = /(妻父|妾父|妾之父|妻之父|丈夫之父|妻之祖父|夫之父)/;

// 从「第一任妻父 / 妾之父 / 第N任妻之父」这类 type 里解析「是哪位夫人的父亲」，
// 返回配偶排行（SPOUSE_RANK_MAP 口径，原配=21 / 妻子=22 / 二夫人=23 / 妾室=29）。
function parseSpouseRankFromInLawType(type) {
  var t = String(type || '');
  if (!t) return null;
  if (/妾|侧室|才人|妃|嫔/.test(t)) return SPOUSE_RANK_MAP['妾室'];          // 29
  if (/原配|第一任|结发|正妻|正室/.test(t)) return SPOUSE_RANK_MAP['原配'];   // 21
  var m = t.match(/第([一二三四五六七八九十0-9]+)任/);
  if (m) {
    var n = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9 }[m[1]];
    if (n === undefined) n = parseInt(m[1], 10);
    if (n === 1) return SPOUSE_RANK_MAP['原配'];
    if (n >= 2 && n <= 9) return 20 + n;                                      // 二夫人 22 … 九夫人 29
  }
  if (/妻|夫/.test(t)) return SPOUSE_RANK_MAP['妻子'];                         // 22
  return null;
}

// 姻亲长辈基准档位：父母层(10) 之后、配偶层(15) 之前的空隙。
// 注意基准取 12.05 而非 12：原配之父 = 12.05 + 0*0.1 = 12.05，
// 必须**严格大于**「算不出排行」的兜底值(12)，否则原配之父会与
// 无排行的岳父并列、退回姓名拼音（寿 < 赵 → 原配之父反而在后）。
var IN_LAW_BASE = 12.05;
// 与 SORT_PRIORITY 配偶层原配同口径的基准（原配 = 21）
var IN_LAW_RANK_BASE = 21;
// 每差一个配偶排行，岳父下沉 0.1 档；6 位夫人最多下沉 0.5，不会越过配偶层
var IN_LAW_RANK_STEP = 0.1;

function inLawValueFromSpouseRank(rank) {
  if (typeof rank !== 'number') return IN_LAW_BASE;
  var v = IN_LAW_BASE + (rank - IN_LAW_RANK_BASE) * IN_LAW_RANK_STEP;
  // 夹在 (IN_LAW_BASE, 配偶层起点 15) 之间，防脏数据把岳父推过配偶
  if (v < IN_LAW_BASE) v = IN_LAW_BASE;
  if (v >= 15) v = 14.9;
  return v;
}

var CHILD_TYPE_RE = /^(女儿|儿子|长女|次女|三女|幼女|幺女|独女|养女|义女|长子|次子|幼子|幺子|独子|养子|义子|长[子女]|幼[子女]|[一二三四五六七八九十]+[子女])$/;

// ============================================================
// 关系类型 → 排序优先级映射表（与 Web 端 relationUtils.ts 的 SORT_PRIORITY 完全一致）
// ============================================================
// [重要] 2026-09-16 与 Web 端对齐：此前小程序用的是另一套独立档位
//   （父母 10/10.5、配偶 15-19、子女 21-29…），大层顺序虽碰巧一致，
//   但「祖父 vs 母亲」「妻子 vs 妃子」等层内/层间顺序与 Web 相反，
//   导致同一人物在两端「相关人员」里的先后不同。现统一到 Web 的数值体系。
var SORT_PRIORITY = {
  // === 父母/直系长辈层 (10-19) ===
  '父亲': 10, '生父': 10, '养父': 10, '继父': 10,
  '母亲': 11, '生母': 11, '嫡母': 11, '养母': 11, '继母': 11,
  '祖父': 12, '祖母': 12, '养祖父': 12, '养祖母': 12,
  '外祖父': 13, '外祖母': 13,
  '曾祖父': 14, '曾祖母': 14,
  '外曾祖父': 15, '外曾祖母': 15,
  '外曾外祖父': 16, '外曾外祖母': 16,

  // === 姻亲长辈层（父母之后、配偶之前的空隙 12.05-12.55）===
  // 实际档位由 getInLawSortValue() 按女儿排行算成 12.05(原配之父) ~ 12.55，
  // 这里 12 只是「算不出排行时」的兜底。
  '岳父': 12, '岳母': 12,

  // === 配偶层 (20-29) ===
  '丈夫': 20, '亡夫': 20, '前夫': 20, '未婚夫': 20,
  '原配': 21, '原配夫人': 21, '结发妻': 21,
  '妻子': 22, '夫人': 22, '皇后': 22, '正妻': 22, '正室': 22, '继室': 22,
  '二夫人': 23, '三夫人': 24, '四夫人': 25, '五夫人': 26,
  '六夫人': 27, '七夫人': 28, '八夫人': 29, '九夫人': 29,
  '妃子': 29, '妃嫔': 29, '嫔妃': 29, '后妃': 29, '妾室': 29, '才人': 29, '伴侣': 29, '侧室': 29,
  '前妻': 29, '亡妻': 29, '未婚妻': 29,

  // === 子女层 - 儿子 (30-39) ===
  '长子': 30, '次子': 31, '三子': 32, '四子': 33, '五子': 34,
  '六子': 35, '七子': 36, '八子': 37, '九子': 38, '十子': 38,
  '幼子': 39, '幺子': 39, '独子': 39, '季子': 39,
  '儿子': 35, // 无排行默认放在中间
  '养子': 36, '义子': 36,

  // === 子女层 - 女儿 (40-49) ===
  '长女': 40, '次女': 41, '三女': 42, '四女': 43, '五女': 44,
  '六女': 45, '七女': 46, '八女': 47, '九女': 48, '十女': 48,
  '幼女': 49, '幺女': 49, '独女': 49,
  '女儿': 45, // 无排行默认放在中间
  '养女': 46, '义女': 46,

  // === 兄弟姐妹层 (50-59) ===
  '兄长': 50, '哥哥': 50, '胞兄': 50, '亲兄': 50, '亲哥哥': 50,
  '堂兄': 50, '表兄': 50,
  '姐姐': 51, '胞姐': 51, '亲姐': 51, '亲姐姐': 51,
  '堂姐': 51, '表姐': 51,
  '弟弟': 52, '胞弟': 52, '亲弟': 52, '亲弟弟': 52,
  '堂弟': 52, '表弟': 52,
  '妹妹': 53, '胞妹': 53, '亲妹': 53, '亲妹妹': 53,
  '堂妹': 53, '表妹': 53,
  '兄弟': 54, '姐妹': 55, '兄妹': 56, '姐弟': 57,
  '义兄': 58, '义弟': 58,

  // === 孙辈层 (60-69) ===
  '孙子': 60, '孙女': 61, '养孙女': 61,
  '曾孙': 62, '曾孙女': 63,
  '玄孙': 64,
  '外孙': 65, '外孙女': 66,
  '外曾孙': 67, '外曾孙女': 68,
  '外曾外孙': 69, '外曾外孙女': 69,

  // === 叔伯/侄甥层 (70-79) ===
  '伯父': 70, '伯伯': 70, '叔叔': 71, '叔父': 71,
  '舅舅': 72, '舅父': 72,
  '姑妈': 73, '姑母': 73,
  '姨妈': 74, '姨母': 74,
  '侄子': 75, '侄女': 76,
  '外甥': 77, '外甥女': 78,
  '外叔公': 79, '外甥孙': 79, '外甥孙女': 79,

  // === 姻亲层 (80-89) ===
  '公公': 82, '婆婆': 83,
  '女婿': 84, '儿媳': 85, '儿媳妇': 85,
  '连襟': 86, '妯娌': 87, '亲家': 88,

  // === 朋友层 (90-99) ===
  '挚友': 90, '知己': 91, '朋友': 92, '好友': 93,
  '拜把兄弟': 94, '结拜兄弟': 94,
  '青梅竹马': 96, '初恋': 97,

  // === 师徒层 (100-109) ===
  '老师': 100, '师父': 101, '师傅': 101, '恩师': 102, '伯乐': 103,
  '学生': 104, '弟子': 105, '门生': 106, '徒弟': 107,

  // === 同事层 (110-119) ===
  '同僚': 110, '同事': 111, '合作': 112, '战友': 113,

  // === 上下级层 (120-129) ===
  '君主': 120, '上级': 121, '上司': 122, '领袖': 122,
  '下属': 123, '下级': 124, '部下': 124, '臣子': 125, '幕僚': 126,
  '追随者': 127, '入幕': 127,

  // === 敌对层 (130-139) ===
  '对手': 130, '敌人': 131, '政敌': 132, '敌对': 133,

  // === 同盟/影响层 (140-149) ===
  '联合': 140, '盟友': 141, '影响': 142, '启发': 142,
};

// 与 web 端 SORT_PRIORITY 配偶层同口径
var SPOUSE_RANK_MAP = {
  '丈夫': 20, '亡夫': 20, '前夫': 20, '未婚夫': 20,
  '原配': 21, '原配夫人': 21, '结发妻': 21,
  '妻子': 22, '夫人': 22, '皇后': 22, '正妻': 22, '正室': 22, '继室': 22,
  '二夫人': 23, '三夫人': 24, '四夫人': 25, '五夫人': 26,
  '六夫人': 27, '七夫人': 28, '八夫人': 29, '九夫人': 29,
  '妃子': 29, '妾室': 29, '才人': 29, '伴侣': 29, '侧室': 29,
  '前妻': 29, '亡妻': 29, '未婚妻': 29
};

var SPOUSE_RANK_RE = /(原配夫人|原配|结发妻|正妻|正室|继室|丈夫|妻子|夫人|皇后|妃子|妃嫔|嫔妃|后妃|才人|伴侣|妾室|侧室|([一二三四五六七八九十])夫人)/;

// 「确实是配偶」判定 —— 策略 B 的守卫（与 Web 端 SPOUSE_TYPE_RE 同口径）。
// 必须排除岳父/岳母/公公/婆婆等姻亲长辈自身（其 desc 里会写自己的名字），
// 否则会污染配偶排行推导：赵占元的 desc「赵占元之女赵春桂嫁与张作霖为
// 原配夫人」里同时含配偶「赵春桂」和自己「赵占元」，若不守卫，
// 两位岳父的档位会被抹平并列、退回姓名拼音（寿<赵 → 原配之父反而在后）。
var SPOUSE_TYPE_RE = /^(配偶|丈夫|夫君|亡夫|前夫|未婚夫|原配|原配夫人|结发妻|妻子|夫人|皇后|正妻|正室|继室|二夫人|三夫人|四夫人|五夫人|六夫人|七夫人|八夫人|九夫人|妃子|妃嫔|嫔妃|后妃|才人|伴侣|妾室|侧室|前妻|亡妻|未婚妻)$/;

function parseSpouseRank(text) {
  if (!text) return null;
  var m = String(text).match(SPOUSE_RANK_RE);
  if (!m) return null;
  var token = m[2] ? (m[2] + '夫人') : m[1];
  var v = SPOUSE_RANK_MAP[token];
  return (typeof v === 'number') ? v : null;
}

// ============================================================
// 子女排行解析与归一（2026-09-16 新增）
// ============================================================
//
// 库内「儿子」的 type 五花八门：`儿子`、`子`、`长子`、`次子`、`九子`、
// `八子`、`季子`、`长子; 第一子`、`第三子`… 女儿同理（`女儿`、`女`、
// `五女`、`长女`）。旧逻辑：
//   1) 展示层 `_relationType` 直接沿用原始 type → 出现「儿子/子」混用；
//   2) 排序层虽有「第N子→20+N」的解析，但只认「第N子」带第字形式，
//      不认 `九子`/`季子`/`五女` → 长幼顺序丢失，全挤在 21/26 档。
//
// 这里提供两个纯函数，供排序层与展示层复用：
//   parseChildRank(type)   → 返回「排行序号」，0=无排行，1=长子/长女，…，
//                            10=十子/十女，99=幼子/季子/幺子（末位）。
//   normalizeChildType(type) → 把带排行的类型归一成「儿子/女儿」，
//                            便于展示层统一显示。

var CN_NUM = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10 };

// 无「第」字的排行词 → 序号。长子=1、次子=2、三子=3…九子=9、十子=10；
// 幼子/幺子/季子 归到末位（用一个较大的哨兵值 99，保证排在无排行的之后）。
var RANK_WORD_MAP = {
  '长子': 1, '次子': 2, '三子': 3, '四子': 4, '五子': 5, '六子': 6, '七子': 7, '八子': 8, '九子': 9, '十子': 10,
  '长女': 1, '次女': 2, '三女': 3, '四女': 4, '五女': 5, '六女': 6, '七女': 7, '八女': 8, '九女': 9, '十女': 10,
  '独子': 1, '独女': 1,
  '幼子': 99, '幺子': 99, '季子': 99, '幼女': 99, '幺女': 99
};

// 中文数字 → 阿拉伯数字（"第一子" → 1、"第十二子" → 12）
function cnNumToInt(s) {
  if (!s) return 0;
  if (/^\d+$/.test(s)) return parseInt(s, 10);
  var total = 0, last = 0;
  for (var i = 0; i < s.length; i++) {
    var ch = s[i];
    if (CN_NUM[ch] !== undefined) { last = CN_NUM[ch]; }
    else if (ch === '十') {
      total += (last || 1) * 10; last = 0;
    }
    else if (ch === '百') { total += (last || 1) * 100; last = 0; }
    else return 0;
  }
  return total + last;
}

// 从 type 里解析子女排行序号（0=无排行）
function parseChildRank(type) {
  var t = String(type || '').trim();
  if (!t) return 0;

  // 1) 复合形式「长子; 第一子」→ 拆段取第一段
  var seg = t.split(/[;；、\/]/)[0].trim();
  // 2) 「第N子/第N女」带第字形式
  var m = seg.match(/第([一二三四五六七八九十百\d]+)[子女]/);
  if (m) return cnNumToInt(m[1]) || 0;
  // 3) 无第字的排行词（长子/九子/五女/季子…）
  if (RANK_WORD_MAP[seg] !== undefined) return RANK_WORD_MAP[seg];
  // 4) 「N子/N女」纯数字+子/女（"3子" 等罕见形式）
  var m2 = seg.match(/^(\d+)[子女]$/);
  if (m2) return parseInt(m2[1], 10) || 0;

  return 0;
}

// 把子女 type 归一成「儿子/女儿」（保留长幼信息给排序层，展示层统一词形）
// [重要] 只对「明确的子女类型」生效，配偶词（妻子/原配/夫人…）绝不碰——
//    否则「妻子」含「子」会被误归一成「儿子」。靠先查 ROLE_SIMPLIFY 已归一
//    的配偶词 + 明确子女词白名单做双重守卫。
function normalizeChildType(type) {
  var t = String(type || '').trim();
  if (!t) return t;
  // 配偶/长辈等已规范词：直接原样返回，不做子女归一
  if (SPOUSE_TYPE_RE.test(t)) return t;
  var seg = t.split(/[;；、\/]/)[0].trim();
  // 直接就是规范词
  if (seg === '儿子' || seg === '女儿') return seg;
  // 排行榜的子女词 → 女儿（女儿/女/长女/五女/次女/幼女…）
  // [重要] 这里必须用「整词」匹配，不能再用「含『女』即判女儿」的贪婪写法：
  //    「女婿」「外孙女」「侄女」「甥女」这类已规范的姻亲/隔代词都会被误归一成
  //    「女儿」（实锤：长孙晟的女婿李世民、外孙女 王婉 在相关人物里都显示成「女儿」）。
  if (/^(长|次|三|四|五|六|七|八|九|十|幼|幺|独|季)?女$/.test(seg)) return '女儿';
  // 排行榜的子女词 → 儿子（子/儿/长子/九子/季子/独子…）
  if (/^(长|次|三|四|五|六|七|八|九|十|幼|幺|独|季)?子$/.test(seg) || /^(子|儿|男)$/.test(seg)) return '儿子';
  return t;
}

function getInLawSortValue(item, ctx) {
  var type = item._relationType || '';
  var isVariant = INLAW_VARIANT_RE.test(type);
  if (!INLAW_TYPE_RE.test(type) && !isVariant) return null;
  var relations = ctx && ctx.relations;
  var relationOf = ctx && ctx.relationOf;

  // ---- 策略 0：岳父/岳母变体 —— type 本身含「哪位夫人的父亲」 ----
  // 「第一任妻父」「妾之父」的 desc 通常为空，排行信息只在 type 里，
  // 必须先于策略 A/B/C 解析，否则会退回 IN_LAW_BASE 使原配之父与妾之父并列。
  if (isVariant) {
    var rk0 = parseSpouseRankFromInLawType(type);
    if (rk0 !== null) return inLawValueFromSpouseRank(rk0);
  }

  // ---- 策略 A：关系里存在「岳父 → 女儿(即中心人物配偶)」边 ----
  if (relations && relationOf) {
    var best = null;
    for (var i = 0; i < relations.length; i++) {
      var t = String(relations[i].type || '').trim();
      if (!CHILD_TYPE_RE.test(t)) continue;
      var spouse = relationOf[String(relations[i].targetId)];
      if (!spouse) continue;
      // [重要] 该子女必须**同时是中心人物的配偶**，否则只是普通子女，与岳父排行无关。
      // 这里必须用 SPOUSE_RANK_MAP（只含配偶）而非「任何有档位的标签」：
      // 若换成通用档位表，子女层（长子/儿子/女儿）也会命中，
      // 张作霖的长子会被当成「配偶」参与 min()，两位岳父档位被抹平并列，
      // 退回姓名拼音（寿<赵 → 原配之父反而排在末位）。
      var spType = ROLE_SIMPLIFY[spouse._relationType] || spouse._relationType || '';
      var v = SPOUSE_RANK_MAP[spType];
      if (typeof v !== 'number') continue;
      if (best === null || v < best) best = v;
    }
    if (best !== null) return inLawValueFromSpouseRank(best);
  }

  // ---- 策略 B：岳父 description 里出现中心人物某位配偶的姓名 ----
  var desc = item._relationDesc || '';
  if (desc && relationOf) {
    var best2 = null;
    Object.keys(relationOf).forEach(function (k) {
      var spouse = relationOf[k];
      var sName = spouse.name || '';
      if (sName.length < 2 || desc.indexOf(sName) < 0) return;
      // 关键守卫：只认「真正的配偶」，否则会污染 best2（详见 SPOUSE_TYPE_RE 注释）
      var st = ROLE_SIMPLIFY[spouse._relationType] || spouse._relationType || '';
      if (!SPOUSE_TYPE_RE.test(st)) return;
      var rk = parseSpouseRank(spouse._relationDesc);
      if (rk === null) {
        rk = SPOUSE_RANK_MAP[st] !== undefined ? SPOUSE_RANK_MAP[st] : null;
      }
      if (rk === null) return;
      if (best2 === null || rk < best2) best2 = rk;
    });
    if (best2 !== null) return inLawValueFromSpouseRank(best2);
  }

  // ---- 策略 C：岳父 description 里直接写了排行词 ----
  var direct = parseSpouseRank(desc);
  return inLawValueFromSpouseRank(direct);
}

// 中文数字 → 阿拉伯数字（支持 一~九十九 量级）—— 与 Web 端 cnNumberToInt 对齐
function cnNumberToInt(cn) {
  if (!cn) return 0;
  var digits = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '两': 2 };
  var units = { '十': 10, '百': 100, '千': 1000 };
  if (cn.length === 1) {
    if (digits[cn] !== undefined) return digits[cn];
    if (units[cn] !== undefined) return units[cn];
    return 0;
  }
  var total = 0;
  var lastUnit = 1;
  for (var i = 0; i < cn.length; i++) {
    var ch = cn[i];
    if (digits[ch] !== undefined) {
      lastUnit = digits[ch];
      if (i === cn.length - 1) total += lastUnit;
    } else if (units[ch] !== undefined) {
      total += Math.max(lastUnit, 1) * units[ch];
      lastUnit = 0;
    }
  }
  return total || 0;
}

// 从关系类型或描述中提取排行序号（与 Web 端 getRankFromItem 对齐）
// 返回 1=长/首、2=次、N=N、99=幼/幺、50=独/无排行（中间哨兵）。
function getRankFromItem(item) {
  var type = item._relationType || item._rawType || '';
  var desc = item._relationDesc || '';

  // 类型本身含排行：长子、三女、次子...
  var typeRankMatch = type.match(/^(长|次|幼|幺|独|第[一二三四五六七八九十百千]+|[一二三四五六七八九十]+)(子|女)$/);
  if (typeRankMatch) {
    var prefix = typeRankMatch[1].replace(/^第/, '');
    if (typeRankMatch[1].indexOf('第') === 0) return cnNumberToInt(prefix) || 50;
    if (prefix === '长') return 1;
    if (prefix === '次') return 2;
    if (prefix === '幼' || prefix === '幺') return 99;
    if (prefix === '独') return 50;
    return cnNumberToInt(prefix) || 50;
  }

  // 描述中含排行信息
  var descRankMatch = desc.match(/(?:^|[，,、])(长|次|幼|幺|独|第[一二三四五六七八九十百千]+|[一二三四五六七八九十]+)(子|女)/);
  if (descRankMatch) {
    var dprefix = descRankMatch[1].replace(/^第/, '');
    if (descRankMatch[1].indexOf('第') === 0) return cnNumberToInt(dprefix) || 50;
    if (dprefix === '长') return 1;
    if (dprefix === '次') return 2;
    if (dprefix === '幼' || dprefix === '幺') return 99;
    if (dprefix === '独') return 50;
    return cnNumberToInt(dprefix) || 50;
  }

  // 数字阿拉伯排行（"3子"等）兜底
  var numMatch = desc.match(/(\d+)(子|女)/);
  if (numMatch) return parseInt(numMatch[1], 10) || 50;

  return 50; // 无排行放中间
}

// 排序函数 — 方向感知版
// [重要] 2026-09-16 与 Web 端 relationUtils.ts 的 sortRelated 完全对齐：
//   档位查 SORT_PRIORITY 表（10-142），排序四层：档位 → type 字符串 → 长幼排行 → 姓名。
function sortRelated(mainFigure, ctx) {
  return function(a, b) {
    function getSortKey(item) {
      // [重要] 排行信息优先读 _rawType（原始、含「九子/长子;第一子」等排行词），
      //    展示归一后的 _relationType 已丢失排行。与 Web 端「_sortType || relationType」同义。
      var type = item._rawType || item._relationType || '';

      // 岳父/岳母优先：落在父母之后的姻亲长辈层（12.x），仍按女儿排行细分
      var inLaw = getInLawSortValue(item, ctx);
      if (inLaw !== null) return inLaw;

      // 复合类型拆第一段（「长子; 第一子」→「长子」）再查表
      var headType = type.split(/[;；、/]/)[0].trim();
      // 直接用 relationType 查表
      if (SORT_PRIORITY[type] !== undefined) return SORT_PRIORITY[type];
      if (headType !== type && SORT_PRIORITY[headType] !== undefined) return SORT_PRIORITY[headType];

      // 简化后的标签查表
      var simplified = ROLE_SIMPLIFY[type] || ROLE_SIMPLIFY[headType];
      if (simplified && SORT_PRIORITY[simplified] !== undefined) return SORT_PRIORITY[simplified];

      // 兜底：根据 type 关键词推断（与 Web 端同序同值）
      if (/父/.test(type) && !/祖父|外祖父|曾祖父|岳父|公公/.test(type)) return 10;
      if (/母/.test(type) && !/祖母|外祖母|曾祖母|岳母|婆婆/.test(type)) return 11;
      if (/祖父|外祖父|曾祖父|外曾祖父/.test(type)) return 12;
      if (/祖母|外祖母|曾祖母|外曾祖母/.test(type)) return 12;
      if (/夫|妻|配|偶/.test(type)) return 20;
      if (/子/.test(type) && !/侄|甥/.test(type)) return 35;
      if (/女/.test(type) && !/侄|甥/.test(type)) return 45;
      if (/兄|姐/.test(type)) return 50;
      if (/弟|妹/.test(type)) return 52;
      if (/孙/.test(type)) return 60;
      if (/侄|甥/.test(type)) return 75;
      if (/叔|伯|舅|姨|姑/.test(type)) return 71;
      if (/岳父|岳母/.test(type)) return 12;
      if (/公公|婆婆|女婿|儿媳|连襟|妯娌|亲家/.test(type)) return 82;
      if (/友|拜把|结拜|连襟|妯娌|亲家|青梅竹马|初恋/.test(type)) return 92;
      if (/师|傅|恩师|伯乐/.test(type)) return 101;
      if (/徒|生|门|弟子|徒弟/.test(type)) return 104;
      if (/同|僚|事|战|合作|战友/.test(type)) return 111;
      if (/上|君|领|统帅/.test(type)) return 121;
      if (/下|属|臣|幕|追随者/.test(type)) return 124;
      if (/敌|对|政敌/.test(type)) return 131;
      if (/盟|联/.test(type)) return 141;
      if (/影/.test(type)) return 142;

      return 999;
    }

    var keyA = getSortKey(a);
    var keyB = getSortKey(b);
    if (keyA !== keyB) return keyA - keyB;

    // 二次排序：同大层内按关系类型字符串稳定排序（与 Web 端一致）
    var typeA = a._relationType || '';
    var typeB = b._relationType || '';
    if (typeA !== typeB) return typeA.localeCompare(typeB, 'zh-CN');

    // 三次排序：按描述/类型中的排行信息排序（长子/次子/长女/次女）
    var rA = getRankFromItem(a);
    var rB = getRankFromItem(b);
    if (rA !== rB) return rA - rB;

    // 四次排序：按姓名排序
    var nameA = a.name || '';
    var nameB = b.name || '';
    return nameA.localeCompare(nameB, 'zh-CN');
  };
}

// ============================================================
// 关系大类归一化（与 Web 端 src/utils/relationData.ts 的 getRelationCategory 对齐）
// ============================================================
//
// 服务端关系表里 type 是 1,511 种自由文本（CBDB 谓词占 1,100+ 种），
// 小程序原来的分类标签取 `rel.category`，而表来源的关系没有 category 字段
// → 标签恒为空、颜色恒为灰色。这里按大类本地归一，规则与 Web 端同序同义。
//
// [注意] 顺序即优先级，改动请同步 src/utils/relationData.ts 的 CATEGORY_RULES：
//    夫妻 → 师生 → 敌对 → 同侪 → 朋友 → 君臣 → 合作 → 血缘 → 影响 → 著作往来
var CATEGORY_RULES = [
  ['夫妻', /(丈夫|妻子|原配|元配|夫人|正妻|正室|皇后|妃|才人|贵妃|妾|侧室|继室|填房|前夫|前妻|亡夫|亡妻|未婚夫|未婚妻|伴侣|结发妻|妻|夫)/],
  ['师生', /(老师|师父|师傅|恩师|伯乐|学生|弟子|门生|徒弟|受业|从学|师从|问学|师)/],
  ['敌对', /(敌人|敌|对手|政敌|仇|不容|不合|交恶|竞争|弹劾|反对|攻讦|论争|排挤|倾轧|贬斥|战胜|败于)/],
  ['同侪', /(同僚|同事|同年|同学|同乡|同门|同榜|同寅|同侪|校友|同盟|盟友|共事|诗社|社员|同会|同道|同社|同派)/],
  ['朋友', /(友|知己|知音|之交|忘年交|同志|同好|唱和|并称|同代|挚|与Y游|同游|从游|交游|相识|相知)/],
  ['君臣', /(君臣|君主|君|臣|上级|上司|下级|下属|部下|属下|幕僚|入幕|追随|麾下|旧部|荐|提拔|提携|赏拔|任用|将军|将领|名将|大将|主将|统帅|大臣|名臣|重臣|近臣|权臣|谋臣|谋士|丞相|宰相|首辅|辅臣|宦官|酷吏)/],
  ['合作', /(合作|联合|协助|合谋|共谋|参与|支持|援护|辅佐)/],
  ['血缘', /(父|母|子|女|兄|弟|姐|妹|姊|祖|孙|叔|伯|姑|舅|姨|侄|甥|婿|媳|婆|翁|亲家|连襟|妯娌|嫡|庶|后裔|后代|祖先|世孙|世祖|外戚|血脉|胞|姻亲|族人|同族|宗族|族亲)/],
  ['影响', /(影响|启发|继承|效法|推崇|器重|欣赏|学习|私淑)/],
  ['著作往来', /(Y|墓志铭|墓表|书序|书跋|序由|作序|赠诗|赠言|赠序|祭文|传记|作传|题咏|致书|答书|书信|文集|序跋|碑|铭|诗词|文章)/]
];

var CATEGORY_CACHE = {};

function getRelationCategory(type) {
  var t = (type === null || type === undefined) ? '' : String(type).trim();
  if (!t) return '其他';
  if (CATEGORY_CACHE[t]) return CATEGORY_CACHE[t];
  var cat = '其他';
  for (var i = 0; i < CATEGORY_RULES.length; i++) {
    if (CATEGORY_RULES[i][1].test(t)) { cat = CATEGORY_RULES[i][0]; break; }
  }
  CATEGORY_CACHE[t] = cat;
  return cat;
}

// ============================================================
// 姓名核心部分（剔除括注）与「姓名是否指向关键词所指之人」
// ============================================================
//
// 库内大量人物名带括注，用来消歧同名：「长孙氏(李世民妻)」「王氏（张作霖母）」
// 「徐惠(唐太宗妃)」。这些名字**包含**关键词，但本人并不是关键词所指的那个人。
//
// 历史教训（两次同类问题）：
//   1) 搜「张作霖」时「王氏(张作霖母)」被当成精确结果，挤在搜索结果区；
//   2) 搜「李世民」时「长孙氏(李世民妻)」被当成精确结果。
// 两次根因相同 —— 把「括注里提到关键词」误当成「姓名命中关键词」。
//
// 正确口径：只对**剔除括注后的姓名本体**做匹配判定。
//   括注形态：中文（）/ 英文 () / 方括号 [] ，可能出现在任意位置。
var NAME_PAREN_RE = /[（(\[][^）)\]]*[）)\]]/g;

function nameCore(name) {
  return String(name || '').replace(NAME_PAREN_RE, '').trim();
}

// 姓名本体是否「命中」关键词 —— 搜「李世民」时：
//   「唐太宗李世民」→ 本体含「李世民」→ true（进搜索结果）
//   「长孙氏(李世民妻)」→ 本体「长孙氏」不含 → false（落相关人员）
// 附带收益：本体为空名字（如「（佚名）」）不会因括注偶然命中而误判。
function nameCoreHits(name, keyword) {
  var core = nameCore(name).toLowerCase();
  var q = String(keyword || '').toLowerCase().trim();
  if (!q || !core) return false;
  return core.indexOf(q) !== -1;
}

// ============================================================
// 「泛关系」过滤 —— 只保留有明确人物的关系
// ============================================================
//
// 背景：服务端 1 跳关系里混着大量 CBDB 谓词式「事件/文献往来」条目，
// 它们描述的是**一次动作**而不是**一层关系**：
//   「收到Y的赠诗、文」「下属为Y」「战胜」「接受Y之纳降」「根据Y」
//   「下令处决」「思想影响」「其（」……
// 以「李世民」为例，187 位相关人员里这类占 69 位（37%），
// 它们的排序档位（合作 90 / 著作往来 96）远低于家属与臣僚，
// 于是把真正重要的亲属挤到后面 —— 这就是「相关人员排序乱」的根因。
//
// 保留策略（保守，宁留勿删）：
//   1) 夫妻 / 血缘 / 师生 三类无条件保留（排序词表已覆盖）
//   2) 与中心的**距离 <= 1** 且「明确人物化」的谓词保留：
//        - 白名单词（官职/身份：丞相/大将军/大臣/名将/谋士/太子…）
//        - 语义明确的 2-4 字关系词（对手/盟友/同僚/幕僚/追随者…）
//      两者取并集后，凡命中「事件动词」黑名单的一律剔除。
//   3) 距离 >= 2、且长度 >= 5 的谓词视为泛关系剔除
//      —— 库内事件式谓词（含「赠诗」「纳降」「处决」等）基本都在 5 字以上，
//         而 5 字以内的真关系词（「第一任妻父」「第二任妻子」）不会被误伤。
//
// 判定用 type 与 desc 的并集：type 常被服务端归一成空或泛词，
// 真实谓词往往只留在 desc 里（如 desc「收到杜甫的赠诗、文」）。

// 事件动词 —— 命中即视为「一次动作」而非「一层关系」
var GENERIC_EVENT_RE = /(赠诗|赠言|赠序|赠文|赠|致书|答书|书信|唱和|题咏|作序|书序|书跋|墓志铭|墓表|祭文|传记|作传|题|撰|收[到录]|寄|呈|索|乞|根据|其[（(]|战胜|败于|击败|大败|处决|杀害|谋杀|下令|接受.*纳降|纳降|投降|归降|降于|筹划|谋划|欣赏|器重|推崇|效法|私淑|思想影响|受.*影响|影响$|部将|麾下|旧部|下属为|上司为|为.*部将|为.*谋士|为.*幕僚|投靠|效力|归顺|追随|入幕)/;

// 明确的官职/身份词 —— 这些本身不是关系谓词，但语义就是君臣/上下级，
// 属于「明确人物化」的条目（库内真实存在），不在过滤范围内。
function isOfficeWord(t) {
  if (t.length < 2 || t.length > 4) return false;
  return /(丞相|宰相|首辅|辅臣|大臣|名臣|重臣|近臣|权臣|谋臣|大[将帅]|主[将帅]|名将|将军|统帅|太子|皇子|公主|太后|皇后|宦官|酷吏|御史|刺史|太守|尚书|侍郎|大夫|中郎将|都尉|校尉|节度使)$/.test(t);
}

function isGenericRelation(item, mainId) {
  var type = String(item._relationType || '').trim();
  var desc = String(item._relationDesc || '').trim();
  var merged = type + '|' + desc;

  var cat = getRelationCategory(merged);
  // 夫妻 / 血缘 / 师生 无条件保留
  if (cat === '夫妻' || cat === '血缘' || cat === '师生') return false;

  if (isOfficeWord(type)) return false;

  // 与中心的距离：正向/反向关系都在 item._relationDist 里（无则按 1 处理）
  var dist = (typeof item._relationDist === 'number') ? item._relationDist : 1;
  if (dist >= 2 && type.length >= 5) return true;

  // 命中事件动词 → 泛关系
  if (GENERIC_EVENT_RE.test(merged)) return true;

  // 按大类兜底：著作往来几乎全是文献往来，非核心亲属关系
  if (cat === '著作往来') return true;

  return false;
}

module.exports = {
  ROLE_SIMPLIFY: ROLE_SIMPLIFY,
  ROLE_OPPOSITE: ROLE_OPPOSITE,
  COMPOUND_ROLES: COMPOUND_ROLES,
  VALID_ROLES: VALID_ROLES,
  isLabel: isLabel,
  extractRelationLabel: extractRelationLabel,
  getSortLabel: getSortLabel,
  getSortRole: getSortRole,
  sortRelated: sortRelated,
  getRelationCategory: getRelationCategory,
  getInLawSortValue: getInLawSortValue,
  parseSpouseRank: parseSpouseRank,
  inLawValueFromSpouseRank: inLawValueFromSpouseRank,
  parseChildRank: parseChildRank,
  normalizeChildType: normalizeChildType,
  nameCore: nameCore,
  nameCoreHits: nameCoreHits,
  isGenericRelation: isGenericRelation
};