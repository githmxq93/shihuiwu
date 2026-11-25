// API 配置
// 开发模式：http://localhost:PORT
// 上线模式：https://api.example.com
const BASE_URL = 'https://api.example.com';

const API = {
  BASE: BASE_URL,
  AUTH: {
    LOGIN: `${BASE_URL}/api/auth/login`,
    PHONE_LOGIN: `${BASE_URL}/api/auth/phone-login`,
    PHONE_REGISTER: `${BASE_URL}/api/auth/phone-register`,
    // 注册第 3 步：校验手机号是否已注册（与 Web 端一致，不发短信验证码）
    CHECK_PHONE: `${BASE_URL}/api/auth/check-phone`,
    // 注册第 1 步：校验昵称是否可用（禁用词 + 是否已被占用），避免填完 5 步才被拒
    CHECK_NICKNAME: `${BASE_URL}/api/auth/check-nickname`,
    SET_ADMIN: `${BASE_URL}/api/auth/set-admin`,
    BIND_PHONE: `${BASE_URL}/api/auth/bind-phone`,
    // 后台账号：查是否已设置（Bearer 普通 token）
    ADMIN_CHECK_SETUP: `${BASE_URL}/api/auth/admin/check-setup`,
    // 后台账号：首次设置（Bearer 普通 token，POST { adminUsername, adminPassword }）
    ADMIN_SETUP_ACCOUNT: `${BASE_URL}/api/auth/admin/setup-account`,
    // 后台账号：校验并换取 adminToken（POST { adminUsername, password }）
    ADMIN_VERIFY: `${BASE_URL}/api/auth/admin/verify`,
    // 后台令牌服务端复核（需 X-Admin-Key；仅回 { success } ，用于把篡改/过期的
    // 本地令牌挡在后台页之外，见 admin-pkg/utils/admin-guard.js）
    ADMIN_CHECK: `${BASE_URL}/api/auth/admin/check`
  },
  USERS: {
    LIST: `${BASE_URL}/api/users`,
    UPDATE: (id) => `${BASE_URL}/api/users/${id}`,
    DELETE: (id) => `${BASE_URL}/api/users/${id}`,
    // 后台重置指定用户密码（POST { newPassword }，至少 6 位）
    RESET_PASSWORD: (id) => `${BASE_URL}/api/users/${id}/reset-password`
  },
  // 当前登录用户自己的个人中心（全部需要 Authorization: Bearer <userToken>）
  USER: {
    PROFILE: `${BASE_URL}/api/user`,
    MESSAGES: `${BASE_URL}/api/user/messages`,
    MESSAGES_UNREAD: `${BASE_URL}/api/user/messages/unread-count`,
    MESSAGES_READ_ALL: `${BASE_URL}/api/user/messages/read`,
    MESSAGE_READ: (id) => `${BASE_URL}/api/user/messages/${id}/read`,
    COLLECTIONS: `${BASE_URL}/api/user/collections`,
    COLLECTION_DELETE: (refId) => `${BASE_URL}/api/user/collections/${refId}`,
    HISTORY: `${BASE_URL}/api/user/history`,
    DEVICES: `${BASE_URL}/api/user/devices`,
    CHANGE_PASSWORD: `${BASE_URL}/api/user/change-password`,
    // 本账号已设置的密保问题（忘记旧密码时用于验证身份）
    SECURITY_QUESTIONS: `${BASE_URL}/api/user/security-questions`,
    // 忘记旧密码时：用密保答案验证后修改密码（服务端要求答对全部密保题）
    CHANGE_PASSWORD_BY_QUESTIONS: `${BASE_URL}/api/user/change-password-by-questions`,
    // 账号自助注销（全需 Authorization: Bearer <userToken>）
    // CANCEL_INFO：查本账号注销需验哪些项（有无密码/密保/手机号/邮箱）
    CANCEL_INFO: `${BASE_URL}/api/user/cancel-info`,
    // CANCEL_SEND_CODE：给绑定邮箱发注销验证码（真实邮件）
    CANCEL_SEND_CODE: `${BASE_URL}/api/user/cancel-send-code`,
    // CANCEL_ACCOUNT：提交注销申请，进入 7 天冷静期（账号与数据此时**尚未**清空）
    CANCEL_ACCOUNT: `${BASE_URL}/api/user/cancel-account`,
    // CANCEL_REVOKE：冷静期内撤回注销申请（需登录态）
    CANCEL_REVOKE: `${BASE_URL}/api/user/cancel-revoke`
  },
  FIGURES: {
    LIST: `${BASE_URL}/api/figures`,
    ALL: `${BASE_URL}/api/figures/all`,
    GET: (id) => `${BASE_URL}/api/figures/${id}`,
    CREATE: `${BASE_URL}/api/figures`,
    UPDATE: (id) => `${BASE_URL}/api/figures/${id}`,
    DELETE: (id) => `${BASE_URL}/api/figures/${id}`,
    AUTOCOMPLETE: `${BASE_URL}/api/figures/autocomplete`,
    // 服务端搜索（返回完整行，含 events 生平事件）—— 足迹地图数据源
    SEARCH: `${BASE_URL}/api/figures/search`,
    KINSHIP_PATH: `${BASE_URL}/api/figures/kinship-path`,
    // 世系家族树：服务端建树，前端零推断（关系词 719 个，端上没法自己判直系/姻亲）
    // 参数：up/down 0-4（默认 3）、spouse 0|1（默认 1）、sibling 0|1（默认 0）、genLimit 0-50（默认 6）
    LINEAGE: (id, opt) => {
      const q = opt || {};
      const parts = [];
      if (q.up != null) parts.push('up=' + q.up);
      if (q.down != null) parts.push('down=' + q.down);
      if (q.spouse != null) parts.push('spouse=' + q.spouse);
      if (q.sibling != null) parts.push('sibling=' + q.sibling);
      if (q.genLimit != null) parts.push('genLimit=' + q.genLimit);
      return `${BASE_URL}/api/figures/${id}/lineage` + (parts.length ? '?' + parts.join('&') : '');
    },
    STATS: `${BASE_URL}/api/figures/stats`,
    // 近 7 天浏览榜（六度空间「热门」快捷条数据源）
    HOT: `${BASE_URL}/api/figures/hot`,
    // 批量取人物基本信息（单次上限 200）。用于补全关系目标的名字/头像。
    BATCH: `${BASE_URL}/api/figures/batch`
  },
  ARTICLES: {
    // 列表接口支持 ?lite=1：不返回 content 正文，短摘要补 excerpt（见 server/routes/articles.js）。
    // 🔴 不传 lite 时行为不变，Web 后台编辑器依赖列表里的 content，勿全局改默认。
    LIST: `${BASE_URL}/api/articles`,
    GET: (id) => `${BASE_URL}/api/articles/${id}`,
    NEXT_ID: (topicKey) => `${BASE_URL}/api/articles/next-id/${topicKey}`,
    // 上一篇/下一篇/相关阅读（轻量字段，不含正文）
    NEIGHBORS: (id) => `${BASE_URL}/api/articles/${id}/neighbors`,
    // 点赞/收藏：GET 查状态，POST 改状态
    INTERACTION: (id) => `${BASE_URL}/api/articles/${id}/interaction`
  },
  TOPICS: {
    LIST: `${BASE_URL}/api/topics`,
    // 轻量版：articles[] 不含正文（content），只给 id/title/summary/excerpt/author/era。
    // 实测 495.9 KB → 约 85 KB（正文占原响应 82.9%）。
    // 用在「只要标题列表」的场景（人物详情页侧栏、专题列表页、文章页专题名映射）；
    // 需要正文时按 API.ARTICLES.GET(id) 单篇取。
    LIST_LITE: `${BASE_URL}/api/topics?lite=1`,
    GET: (key) => `${BASE_URL}/api/topics/${key}`,
    CREATE: `${BASE_URL}/api/topics`,
    UPDATE: (key) => `${BASE_URL}/api/topics/${key}`,
    DELETE: (key) => `${BASE_URL}/api/topics/${key}`,
    ADD_ARTICLE: (key) => `${BASE_URL}/api/topics/${key}/articles`,
    UPDATE_ARTICLE: (key, articleId) => `${BASE_URL}/api/topics/${key}/articles/${articleId}`,
    DELETE_ARTICLE: (key, articleId) => `${BASE_URL}/api/topics/${key}/articles/${articleId}`,
    PIN_ARTICLE: (key, articleId) => `${BASE_URL}/api/topics/${key}/pin/${articleId}`
  },
  FEEDBACK: {
    SUBMIT: `${BASE_URL}/api/feedback`,
    UPLOAD: `${BASE_URL}/api/feedback/upload`,
    // 邮件联系：与 Web 端「邮件分享」同一个开放接口（无需登录，服务端按 IP 限流 3 封/小时）
    // 入参 { mailbox:'mailbox1'|'mailbox2', subject?, body, title?, url? }
    EMAIL_SHARE: `${BASE_URL}/api/feedback/email-share`,
    MY: `${BASE_URL}/api/feedback/my`,
    // ===== 后台管理（与 Web 端 AdminMessages「反馈管理」同一套接口，全部需要 x-admin-key）=====
    ADMIN_LIST: `${BASE_URL}/api/feedback`,
    ADMIN_REPLY: (id) => `${BASE_URL}/api/feedback/${id}/reply`,
    ADMIN_RESOLVE: (id) => `${BASE_URL}/api/feedback/${id}/resolve`,
    ADMIN_DELETE: (id) => `${BASE_URL}/api/feedback/${id}`
  },
  // 后台「消息管理」（与 Web 端 AdminMessages 对齐，全部需要 x-admin-key）
  MESSAGES: {
    // 站内公告
    ANNOUNCEMENTS: `${BASE_URL}/api/messages/announcements`,
    ANNOUNCEMENT: (id) => `${BASE_URL}/api/messages/announcements/${id}`,
    // 站内信 / 私信（列表、发送、群发、删除）
    LIST: `${BASE_URL}/api/messages/messages`,
    BROADCAST: `${BASE_URL}/api/messages/messages/broadcast`,
    MESSAGE: (id) => `${BASE_URL}/api/messages/messages/${id}`,
    // 消息模板
    TEMPLATES: `${BASE_URL}/api/messages/templates`,
    TEMPLATE: (id) => `${BASE_URL}/api/messages/templates/${id}`,
    // 触发推送
    TRIGGER: `${BASE_URL}/api/messages/trigger`
  },
  DYNASTIES: {
    LIST: `${BASE_URL}/api/dynasties`,
    // 历代帝王名录（按朝代分组，含在位时间段 / 在位时长 / 简介）
    EMP_LIST: `${BASE_URL}/api/dynasties/emperors`
  },
  // 大事年表（物化表 event_timeline，年份带 meta 由服务端缓存 10 分钟）
  TIMELINE: {
    META: `${BASE_URL}/api/timeline/meta`,
    YEAR: (y) => `${BASE_URL}/api/timeline/${y}`,
    KIND: (y, k, page, size) => `${BASE_URL}/api/timeline/${y}/${k}?page=${page || 1}&size=${size || 20}`,
    LOOKUP: (q) => `${BASE_URL}/api/timeline/lookup?q=${encodeURIComponent(q)}`,
    // 历史大事总览：按时代分组的里程碑，与人物年表分开取
    CHRONICLE: (size) => `${BASE_URL}/api/timeline/chronicle/overview?size=${size || 4}`
  },
  // 年份查询（年号 / 干支 / 公元 / 伊斯兰历 / 佛历 / 民国 六历对照）
  // 服务端路由见 server/routes/calendar.js；解析失败也返回 200 + success:false，
  // 故调用方必须判 body.success，不能只看 statusCode。
  CALENDAR: {
    QUERY: (q) => `${BASE_URL}/api/calendar?q=${encodeURIComponent(q)}`,
    SUGGEST: (q) => `${BASE_URL}/api/calendar/suggest?q=${encodeURIComponent(q)}`
  },
  STATS: {
    REALTIME: `${BASE_URL}/api/stats/realtime`,
    VIEWS: `${BASE_URL}/api/stats/views`,
    // 近期真实更新动态（新增收录 / 更新资料 / 关系更新），服务端 30 秒缓存
    RECENT_ACTIVITY: `${BASE_URL}/api/stats/recent-activity`,
    // 页面浏览上报（type:'page'）。此前全项目 0 处调用 ⇒ figure_views 只有 web 侧贡献
    TRACK: `${BASE_URL}/api/stats/track`
  },
  OFFICIAL_ALIASES: {
    SEARCH: `${BASE_URL}/api/official-aliases/search`,
    // 职官类别列表（B 类词条分类体系，2026-10-21 F1）
    CATEGORIES: `${BASE_URL}/api/official-aliases/categories`,
    // 前缀联想（2026-10-21 F6）
    SUGGEST: `${BASE_URL}/api/official-aliases/suggest`
  },
  STATIC: {
    GET: (name) => `${BASE_URL}/api/static/${name}`
  },
  // 客户端运行时错误上报（见 utils/monitor.js 与 server/routes/client-error.js）
  MONITOR: {
    REPORT: `${BASE_URL}/api/client-error`
  }
};

module.exports = API;
