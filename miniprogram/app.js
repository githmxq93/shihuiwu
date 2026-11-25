  App({
    onLaunch() {
      // 客户端错误监控：注册 wx.onError / onUnhandledRejection 并上报（见 utils/monitor.js）。
      // 必须放在最前面——越早注册，越能捕获后续初始化过程里的异常。
      require('./utils/monitor').initMonitor();

      // ===== 微信搜一搜爬虫场景识别（scene 1129）=====
      // 微信爬虫以小程序页面渲染结果建索引，UA 含 mpcrawler / 场景值 1129。
      // 任何原生弹窗（隐私授权、更新提示、showLoading）都会盖住首屏，
      // 爬虫抓到的就是空壳 —— 这是「除了小程序名称什么都搜不到」的断点之一。
      // [注意] 这里只做「识别 + 跳过拦截」，不改正文、不做内容差异化（cloaking）：
      //    爬虫看到的正文与真实用户完全一致。
      let isCrawler = false;
      try {
        const launch = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
        isCrawler = !!(launch && Number(launch.scene) === 1129);
      } catch (e) { isCrawler = false; }
      this.globalData.isCrawler = isCrawler;

      // ===== 导航追踪（2026-10-22，routeDone 竞态排查）=====
      // `[Page route 错误] routeDone with a webviewId N is not found` 是框架层报错，
      // 栈里没有任何业务帧，只能靠「报错前最后一次导航是什么」反推触发路径。
      // 在最早时机包裹 5 个导航 API，每次调用打一行 console（devtools / 体验版可见）。
      // [注意] 只打 console、不上报：导航是高频操作，进后端只会制造噪音。
      // [注意] 追踪器不得改变原行为：原样透传参数与返回值，全程 try/catch。
      //
      // [重要] 开关（2026-10-29 第十一轮）：默认 **false**。
      //    排障已于第十轮结束，正式运行不需要这行日志。开着时每次跳页都要
      //    额外调一次 getCurrentPages() 并拼字符串，属纯常态开销。
      //    关闭时连 API 包裹都不执行 —— 五个 wx.* 保持原生引用，零开销零风险。
      //    需要复排查「routeDone ... webviewId not found」时改 true 即可。
      const NAV_TRACE = false;
      (function installNavTrace() {
        if (!NAV_TRACE) return;
        const APIS = ['navigateTo', 'redirectTo', 'navigateBack', 'switchTab', 'reLaunch'];
        APIS.forEach(function (api) {
          const origin = wx[api];
          if (typeof origin !== 'function') return;
          wx[api] = function (opts) {
            try {
              const pages = (typeof getCurrentPages === 'function') ? getCurrentPages() : [];
              const target = opts && opts.url ? opts.url : ('delta=' + ((opts && opts.delta) || 1));
              console.log('[NAV] ' + api + ' ' + target + ' stack=' + pages.length);
            } catch (e) { /* 追踪失败绝不影响导航本身 */ }
            return origin.call(wx, opts);
          };
        });
      })();

      // ===== 足迹定位共享模块（主包常驻，2026-10-23）=====
      // footprint-locate 被 footprint-pkg 足迹页与 detail-pkg 详情页入口预检共用，
      // 分包之间不能互相 require ⇒ 解析逻辑必须落主包；但微信上传检查要求
      // 「主包 JS 必须被主包自身使用、不得只服务分包」（只被分包引用会判
      // 「主包内不应存在主包未使用的JS文件」上传失败）⇒ 在 app.js 注册到
      // globalData，使主包成为第一使用者。分包页既可继续直接 require
      // （相对路径，运行时合法），也可经 getApp().globalData 取用。
      // [注意] 此 require 不是死代码：删掉它上传检查会重新变红。
      this.globalData.footprintLocate = require('./utils/footprint-locate');

      // 窗口信息：onLaunch 里同步读一次并缓存到 globalData，各页面 onLoad 直接复用，
      // 避免每页各跑一次 wx.getWindowInfo()。
      // 包 try/catch：极个别基础库若该 API 缺失/抛错，不能让它中断后面的整条启动链
      // （figures.init / 缓存版本管理 / 更新机制 / 隐私弹窗都在此之后）；
      // 此时保留 globalData 的默认值（375 / 667 / 2 / 44）兜底即可。
      try {
        const sysInfo = wx.getWindowInfo();
        this.globalData.windowWidth = sysInfo.windowWidth;
        this.globalData.windowHeight = sysInfo.windowHeight;
        this.globalData.pixelRatio = sysInfo.pixelRatio;
        this.globalData.statusBarHeight = sysInfo.statusBarHeight;
      } catch (e) { /* 基础库不支持：沿用 globalData 默认值 */ }

      // 初始化人物数据（从缓存或本地 JS 文件加载）
      require('./data/figures').init();

      // ===== 分包预热（2026-10-22；收敛 + 延后 2026-11-09）=====
      // 背景：早期这里在冷启动 1.5s 后主动预热 4 个分包（地名查询 / 后台管理 /
      //       时间轴 / 账户中心），把「入口浅、从未被 preloadRule 覆盖」的分包
      //       下载挪到空闲期，规避首次进入时的 routeDone 竞态。
      // 冷启动优化（本轮）：目标是压低冷启动后台分包下载量与时机，只做「收敛 + 延后」：
      //   · 预热列表收敛为仅 timeline-pkg 一项；
      //   · 地名查询分包已随入口下线整体移除（2026-11-24），不再预热；
      //   · 后台管理 / 账户中心分包低频，不再预热。
      // 触发时机：优先做法是监听首屏数据就绪（首页置 globalData 标志 / 发事件后再
      //   预热），但首页当前未暴露「首屏就绪」标志，app.js 单文件内无法可靠监听 ⇒
      //   退回更保守的 4000ms 定时（原 1500ms），把下载进一步挪出首屏关键期。
      //   后续首页接入就绪通知后可提前；本轮不动首页加载链，避免首屏回归。
      // 移动网络下不主动预热：与 preloadRule 的省流量口径一致，此时该竞态只剩
      //   控制台噪音、无用户可见后果（下载失败/取消都有正常降级路径）。
      // loadSubpackage 幂等：preloadRule 已下过的包会立即成功返回，不重复耗流量。
      // 预热结果日志同理加开关：正式包无 console 面板，留着只是字符串开销。
      const SUBPKG_TRACE = false;
      setTimeout(function () {
        if (isCrawler) return; // 爬虫场景不做分包预热，避免额外异步行为干扰首屏快照
        wx.getNetworkType({
          success: function (res) {
            const net = res && res.networkType;
            if (net !== 'wifi' && net !== 'ethernet') return;
            // 特性检测：个别开发者工具/基础库组合不注入 loadSubpackage
            // （实测 devtools 2.02.2609231 + lib 3.16.1 报
            //  "wx.loadSubpackage is not a function"；真机基础库 2.11.1+ 均有）。
            // 预热只是优化——缺 API 就静默跳过，导航时按需下载的降级路径不变，
            // 绝不能让预热自己把 App 搞崩。
            if (typeof wx.loadSubpackage !== 'function') return;
            ['timeline-pkg'].forEach(function (root) {
              wx.loadSubpackage({
                root: root,
                success: function () { if (SUBPKG_TRACE) console.log('[SUBPKG] preloaded ' + root); },
                fail: function () { /* 预热失败静默：导航时按需下载，功能不受影响 */ }
              });
            });
          },
          fail: function () { /* 取不到网络类型：不预热，保持原行为 */ }
        });
      }, 4000);

    // 缓存版本管理（仅用于**数据类缓存**的格式变更清理，可安全重建、无副作用）
    //
    // [注意][重要] 严禁在此清除登录态 / 身份信息！历史实现曾把 userInfo、tokenInfo 一并
    //   removeStorageSync，导致每次把 CACHE_VERSION 从 2.0 改成 3.0 时，**全部老用户
    //   冷启动瞬间被静默登出**（无任何提示）。登录态的失效只应由「登录 / 退出 / 401」
    //   等业务事件驱动，不随数据缓存版本变化。
    //
    //   受保护键（任何情况下都不在此清理）：
    //     userToken / userInfo / isAdmin / hasPhone / tokenInfo / admin_token /
    //     x-admin-key / ql_user_id / ql_uid_bak / wxLocalOpenid / article_device_key
    const CACHE_VERSION = '2.0';
    const DATA_CACHE_KEYS = ['figures_cache']; // 仅纯数据缓存
    let savedVersion = '';
    try { savedVersion = wx.getStorageSync('_cache_version'); } catch (e) { savedVersion = ''; }
    if (savedVersion !== CACHE_VERSION) {
      DATA_CACHE_KEYS.forEach(key => {
        try { wx.removeStorageSync(key); } catch (e) {}
      });
      try { wx.setStorageSync('_cache_version', CACHE_VERSION); } catch (e) { /* 配额满：下次启动重试 */ }
    }

    // 小程序更新机制
    const updateManager = wx.getUpdateManager();
    // 爬虫场景跳过更新确认弹窗：模态框会挡住整页，爬虫首屏抓到的是弹窗而非内容。
    if (!isCrawler) {
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已准备好，是否重启应用？',
          success: function(res) {
            if (res.confirm) updateManager.applyUpdate();
          }
        });
      });
    }
    updateManager.onUpdateFailed(() => {
      // 新版本下载失败，提示用户删除后重新搜索
    });

    // ===== 隐私合规：首次启动主动引导用户同意《用户隐私保护指引》 =====
    // 微信要求开发者以弹窗等明显方式提示用户阅读隐私政策（本小程序收集手机号、
    // 昵称头像、照片、设备信息等）。getPrivacySetting 需基础库 2.32.3+；
    // 旧基础库无该方法时直接跳过（由系统在调用隐私接口时自动弹窗兜底）。
    // 用户已同意后 needAuthorization 为 false，不会重复打扰。
    // [重要] 爬虫场景绝不弹隐私授权框：公开人物内容不需要授权，弹窗会挡住首屏。
    //    真实用户路径完全不变（首次启动仍按官方要求主动引导同意）。
    if (!isCrawler && wx.getPrivacySetting && wx.requirePrivacyAuthorize) {
      wx.getPrivacySetting({
        success: (res) => {
          if (res && res.needAuthorization) {
            // 触发官方隐私授权弹窗；用户拒绝时静默返回，后续调用隐私接口会再次提示
            wx.requirePrivacyAuthorize({ success: () => {}, fail: () => {} });
          }
        },
        fail: () => { /* 查询失败不阻塞启动 */ }
      });
    }
  },

  /**
   * 当前运行的小程序版本信息。
   * [注意] 微信**没有**"获取线上最新版本号"的接口（getUpdateManager 只能知道"有新版本"）。
   * 且 `getAccountInfoSync().miniProgram.version` **仅正式版有值**：
   *   正式版 release → 返回已发布版本号（如 1.2.0）
   *   体验版 trial   → 返回空字符串
   *   开发版 develop → 返回空字符串
   * 因此"关于"页显示的版本号**以本机真实版本优先**（正式版才有值、随上传自动更新），
   * 本机读不到时（体验版/开发版）才回退后台维护的 site_settings.miniProgramVersion
   * （见 pages/profile 的 _applyAppVersion）；本方法只提供本机可读到的原始信息。
   * @returns {{ version: string, envVersion: 'release'|'trial'|'develop'|'' }}
   */
  getAppVersionInfo() {
    try {
      const info = wx.getAccountInfoSync ? wx.getAccountInfoSync() : null;
      const mp = (info && info.miniProgram) || {};
      return {
        version: (typeof mp.version === 'string') ? mp.version : '',
        envVersion: (typeof mp.envVersion === 'string') ? mp.envVersion : ''
      };
    } catch (e) {
      return { version: '', envVersion: '' };
    }
  },

  globalData: {
    windowWidth: 375,
    windowHeight: 667,
    pixelRatio: 2,
    statusBarHeight: 44,   // onLaunch 由 wx.getWindowInfo() 覆盖；首页 safeAreaTop 复用
    qlUserId: '',
    _userCache: null,
    isCrawler: false,       // onLaunch 里按 scene 1129 识别微信搜一搜爬虫
    footprintLocate: null   // onLaunch 里注册 utils/footprint-locate（上传检查要求主包自用）
  }
});
