/**
 * 沙盘推演 · 战役注册表
 *
 * 列表页只读这里；每场战役一个独立数据模块（data/<id>.js），
 * 结构一致、复用同一套引擎与页面。新增战役只需：
 *   1) 新建 data/<id>.js；
 *   2) 在下方 require 并加入 ALL。
 *
 * 列表按 yearValue 升序（公元前用负数），条目信息来自各战役 META。
 */
var muye = require('./muye');
var chengpu = require('./chengpu');
var xiao = require('./xiao');
var bi = require('./bi');
var yanling = require('./yanling');
var baiju = require('./baiju');
var anshi = require('./anshi');
var chibi = require('./chibi');
var changping = require('./changping');
var julu = require('./julu');
var gaixia = require('./gaixia');
var guandu = require('./guandu');
var feishui = require('./feishui');
var sarhu = require('./sarhu');
var gui = require('./gui');
var maling = require('./maling');
var yique = require('./yique');
var handan = require('./handan');
var haodai = require('./haodai');
var kunyang = require('./kunyang');
var fei = require('./fei');
var fanwu = require('./fanwu');
var miechu = require('./miechu');
var mieqi = require('./mieqi');
var baideng = require('./baideng');
var mobei = require('./mobei');
var jingxing = require('./jingxing');
var weishui = require('./weishui');
var henan = require('./henan');
var hexi = require('./hexi');
var yiling = require('./yiling');
var jieting = require('./jieting');
var wuzhangyuan = require('./wuzhangyuan');
var canhepi = require('./canhepi');
var zhongli = require('./zhongli');
var yubi = require('./yubi');
var qianshuiyuan = require('./qianshuiyuan');
var hulao = require('./hulao');
var suiyang = require('./suiyang');
var caizhou = require('./caizhou');
var baixiang = require('./baixiang');
var gaoping = require('./gaoping');
var gaolianghe = require('./gaolianghe');
var qigouguan = require('./qigouguan');
var chanzhou = require('./chanzhou');
var haoshuichuan = require('./haoshuichuan');
var yancheng = require('./yancheng');
var caishi = require('./caishi');
var yehuling = require('./yehuling');
var sanfengshan = require('./sanfengshan');
var diaoyucheng = require('./diaoyucheng');
var xiangyang = require('./xiangyang');
var yashan = require('./yashan');
var poyanghu = require('./poyanghu');
var tumubao = require('./tumubao');
var ningyuan = require('./ningyuan');
var songjin = require('./songjin');
var yipianshi = require('./yipianshi');
var penghu = require('./penghu');
var wulanbutong = require('./wulanbutong');
var zhaomodu = require('./zhaomodu');
var humen = require('./humen');
var zhenjiang = require('./zhenjiang');
var huanghai = require('./huanghai');
var weihaiwei = require('./weihaiwei');
var baguolianjun = require('./baguolianjun');
var xuge = require('./xuge');
var changshao = require('./changshao');
var hongshui = require('./hongshui');
var an = require('./an');
var jimo = require('./jimo');
var yanying = require('./yanying');

var ALL = [
  muye, chengpu, xiao, bi, yanling, baiju, gui, maling, yique, handan, haodai, kunyang,
  fei, fanwu, miechu, mieqi, baideng, mobei,
  jingxing, weishui, henan, hexi, yiling, jieting,
  wuzhangyuan, canhepi, zhongli, yubi, qianshuiyuan, hulao,
  suiyang, caizhou, baixiang, gaoping, gaolianghe, qigouguan,
  chanzhou, haoshuichuan, yancheng, caishi, yehuling, sanfengshan,
  diaoyucheng, xiangyang, yashan, poyanghu, tumubao, ningyuan,
  songjin, yipianshi, penghu, wulanbutong, zhaomodu, humen,
  zhenjiang, huanghai, weihaiwei, baguolianjun, xuge, changshao,
  hongshui, an, jimo, yanying,
  anshi, chibi, changping, julu, gaixia, guandu, feishui, sarhu
];

var LIST = ALL.map(function (b) {
  var m = b.META;
  return {
    id: m.id,
    title: m.title,
    years: m.years,
    yearUnit: m.yearUnit || '',
    period: m.period || '',
    hook: m.hook || m.subtitle || '',
    stageCount: b.STAGES.length,
    yearValue: m.yearValue || 0
  };
}).sort(function (a, b) { return a.yearValue - b.yearValue; });

function get(id) {
  for (var i = 0; i < ALL.length; i++) {
    if (ALL[i].META.id === id) return ALL[i];
  }
  return null;
}

module.exports = { list: LIST, get: get };
