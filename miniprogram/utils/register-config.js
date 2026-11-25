// 注册流程 / 密码 / 密保 的共享常量与校验规则。
//
// 从 pages/profile/profile.js 抽出（该文件此前 JS 达 54.5KB，为全项目最大单页）。
// 抽出的原因：这些常量是「纯数据 + 纯函数」，与页面状态机无关，独立成模块后：
//   ① 减小 profile.js 体积与首屏解析成本；
//   ② 便于「我的」页与将来其它入口（如独立的找回密码页）复用同一套题库 / 规则，
//      避免出现「改了一处、另一处口径不一致」的历史问题。
//
// 口径对齐：与 Web 端 src/components/AuthModal.tsx 的 stepLabels / SECURITY_QUESTIONS_POOL /
//          PASSWORD_RULES 完全相同（密保题库 id + question 需原样提交给服务端）。

// 5 个步骤标题（与 Web 端 stepLabels 完全一致）
const REG_STEP_LABELS = ['基本信息', '密保设置', '手机号验证', '设置密码', '确认注册'];

// 密保问题题库（id / question 须与 Web 端 SECURITY_QUESTIONS_POOL 一致）
const REG_QUESTION_POOL = [
  { id: 1, question: '你的出生城市是？' },
  { id: 2, question: '你小学的名字是什么？' },
  { id: 3, question: '你第一只宠物的名字？' },
  { id: 4, question: '你母亲的生日是哪天？' },
  { id: 5, question: '你最喜欢的电影是什么？' },
  { id: 6, question: '你第一次工作的地方？' },
  { id: 7, question: '你最怀念的童年食物？' },
  { id: 8, question: '你中学班级的编号？' },
  { id: 9, question: '你最好的朋友叫什么？' },
  { id: 10, question: '你最难忘的旅行地点？' },
  { id: 11, question: '你的第一个老师叫什么？' },
  { id: 12, question: '你最喜欢的运动是什么？' },
  { id: 13, question: '你小时候的座右铭是什么？' },
  { id: 14, question: '你家以前住哪条街？' },
  { id: 15, question: '你最喜欢的一首歌是什么？' },
];

// 密码强度规则（与 Web 端 PASSWORD_RULES 一致；服务端只校验最小长度，这里是更严的前端约束）
const REG_PWD_RULES = [
  { label: '至少 8 位', test: (p) => p.length >= 8 },
  { label: '包含小写字母', test: (p) => /[a-z]/.test(p) },
  { label: '包含大写字母', test: (p) => /[A-Z]/.test(p) },
  { label: '包含数字', test: (p) => /[0-9]/.test(p) },
];

module.exports = { REG_STEP_LABELS, REG_QUESTION_POOL, REG_PWD_RULES };
