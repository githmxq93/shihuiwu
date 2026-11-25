/**
 * 简单中文转拼音工具
 * 覆盖人物数据中常见的汉字，用于拼音搜索
 */
const PINYIN_MAP = (function() {
  var m = {};
  // 常见姓氏
  '李|li,王|wang,张|zhang,刘|liu,陈|chen,杨|yang,赵|zhao,黄|huang,周|zhou,吴|wu,' +
  '徐|xu,孙|sun,马|ma,胡|hu,朱|zhu,郭|guo,何|he,高|gao,罗|luo,郑|zheng,' +
  '梁|liang,谢|xie,宋|song,唐|tang,韩|han,曹|cao,许|xu,邓|deng,冯|feng,' +
  '萧|xiao,程|cheng,曾|zeng,彭|peng,吕|lv,苏|su,卢|lu,蒋|jiang,蔡|cai,' +
  '贾|jia,丁|ding,魏|wei,薛|xue,叶|ye,阎|yan,余|yu,潘|pan,杜|du,戴|dai,' +
  '夏|xia,钟|zhong,汪|wang,田|tian,任|ren,姜|jiang,范|fan,方|fang,石|shi,' +
  '姚|yao,谭|tan,廖|liao,熊|xiong,金|jin,陆|lu,郝|hao,孔|kong,白|bai,' +
  '崔|cui,康|kang,毛|mao,邱|qiu,秦|qin,江|jiang,史|shi,顾|gu,侯|hou,' +
  '邵|shao,孟|meng,龙|long,段|duan,雷|lei,钱|qian,汤|tang,尹|yin,易|yi,' +
  '常|chang,武|wu,乔|qiao,贺|he,赖|lai,龚|gong,文|wen,庞|pang,樊|fan,' +
  '殷|yin,施|shi,陶|tao,洪|hong,翟|zhai,安|an,颜|yan,倪|ni,严|yan,' +
  '牛|niu,温|wen,芦|lu,季|ji,俞|yu,章|zhang,鲁|lu,葛|ge,伍|wu,申|shen,' +
  '尤|you,毕|bi,聂|nie,焦|jiao,向|xiang,柳|liu,邢|xing,岳|yue,齐|qi,' +
  '兰|lan,党|dang,窦|dou,万|wan,司马|sima,慕容|murong,宇文|yuwen,独孤|dugu,' +
  '拓跋|tuoba,完颜|wanyan,耶律|yelv,赫连|helian,沮渠|juqu,秃发|tufa,' +
  '诸葛|zhuge,上官|shangguan,欧阳|ouyang,夏侯|xiahou'.split(',').forEach(function(pair) {
    var parts = pair.split('|');
    m[parts[0]] = parts[1];
  });
  // 常见名字用字
  '邦|bang,邦|bang,备|bei,权|quan,操|cao,羽|yu,飞|fei,云|yun,超|chao,' +
  '备|bei,权|quan,统|tong,蒙|meng,逊|xun,瑜|yu,亮|liang,肃|su,维|wei,' +
  '平|ping,安|an,宁|ning,静|jing,康|kang,熙|xi,玄|xuan,德|de,仁|ren,' +
  '义|yi,礼|li,智|zhi,信|xin,忠|zhong,孝|xiao,勇|yong,毅|yi,恒|heng,' +
  '贞|zhen,观|guan,太|tai,宗|zong,祖|zu,高|gao,中|zhong,睿|rui,显|xian,' +
  '旦|dan,治|zhi,隆|long,基|ji,世|shi,民|min,建|jian,成|cheng,功|gong,' +
  '业|ye,光|guang,明|ming,正|zheng,清|qing,武|wu,文|wen,景|jing,宣|xuan,' +
  '元|yuan,亨|heng,利|li,贞|zhen,道|dao,真|zhen,大|da,圣|sheng,神|shen,' +
  '化|hua,天|tian,地|di,人|ren,物|wu,生|sheng,日|ri,月|yue,星|xing,辰|chen,' +
  '山|shan,川|chuan,河|he,海|hai,云|yun,风|feng,雨|yu,雪|xue,花|hua,' +
  '子|zi,之|zhi,以|yi,于|yu,其|qi,所|suo,也|ye,者|zhe,何|he,如|ru,' +
  '孔|kong,孟|meng,老|lao,庄|zhuang,墨|mo,荀|xun,屈|qu,原|yuan,' +
  '嬴|ying,政|zheng,吕|lv,不|bu,韦|wei,项|xiang,籍|ji,胡|hu,亥|hai,' +
  '扶|fu,苏|su,轼|shi,辙|zhe,洵|xun,白|bai,甫|fu,贺|he,知|zhi,章|zhang,' +
  '适|shi,昌|chang,龄|ling,然|ran,浩|hao,宇|yu,宙|zhou,思|si,念|nian,' +
  '想|xiang,感|gan,悟|wu,明|ming,暗|an,通|tong,达|da,神|shen,意|yi,' +
  '境|jing,界|jie,势|shi,运|yun,时|shi,光|guang,辉|hui,煌|huang'.split(',').forEach(function(pair) {
    var parts = pair.split('|');
    m[parts[0]] = parts[1];
  });
  // 朝代/称号常用字
  '秦|qin,汉|han,唐|tang,宋|song,元|yuan,明|ming,清|qing,周|zhou,' +
  '隋|sui,晋|jin,商|shang,夏|xia,辽|liao,金|jin,魏|wei,蜀|shu,吴|wu,' +
  '帝|di,王|wang,皇|huang,后|hou,公|gong,侯|hou,将|jiang,相|xiang,' +
  '太|tai,祖|zu,宗|zong,世|shi,高|gao,中|zhong,睿|rui,神|shen,圣|sheng,' +
  '太|tai,平|ping,真|zhen,观|guan,开|kai,宝|bao,贞|zhen,元|yuan,永|yong,' +
  '天|tian,乾|qian,坤|kun,隆|long,盛|sheng,德|de,业|ye,功|gong'.split(',').forEach(function(pair) {
    var parts = pair.split('|');
    m[parts[0]] = parts[1];
  });
  // 春秋战国/诸子百家
  '春|chun,秋|qiu,战|zhan,国|guo,诸|zhu,百|bai,家|jia,儒|ru,道|dao,' +
  '法|fa,名|ming,兵|bing,墨|mo,阴|yin,阳|yang,纵|zong,横|heng,' +
  '惠|hui,施|shi,尹|yin,列|lie,告|gao,杨|yang,子|zi'.split(',').forEach(function(pair) {
    var parts = pair.split('|');
    m[parts[0]] = parts[1];
  });
  return m;
})();

function toPinyin(text) {
  if (!text) return '';
  var result = '';
  for (var i = 0; i < text.length; i++) {
    var char = text[i];
    result += PINYIN_MAP[char] || char;
  }
  return result;
}

module.exports = { toPinyin: toPinyin };
