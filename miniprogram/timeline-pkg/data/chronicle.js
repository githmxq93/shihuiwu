// 历史大事年表数据（581 条）
// 唯一来源：server/scripts/_chronicle_data_{a..e}.cjs（构建期由服务端 require 进 DB）
// 小程序不能 require 包外文件，故按原样同步到分包内；更新年表数据时需同步覆盖这 5 个文件。
// 字段：y 年 | m 月 | t 标题 | c 类别 | i 重要性(1-3) | w 世界史 | d 说明
const A = require('./chronicle-a');
const B = require('./chronicle-b');
const C = require('./chronicle-c');
const D = require('./chronicle-d');
const E = require('./chronicle-e');

module.exports = [].concat(A, B, C, D, E);
