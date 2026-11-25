// 隐私接口统一处理（微信隐私协议适配）
// 用法：在调用 chooseAvatar / chooseMedia 等隐私接口前 await ensurePrivacyAuthorized()。
// 已在 mp 后台配置《用户隐私保护指引》且用户已同意 → 直接放行；
// 否则触发官方隐私授权弹窗，用户同意后放行、拒绝时 reject。

function ensurePrivacyAuthorized() {
  return new Promise((resolve, reject) => {
    if (!wx.getPrivacySetting) {
      // 基础库过低（<2.32.3），无隐私检测机制，直接放行
      resolve(true);
      return;
    }
    wx.getPrivacySetting({
      success(res) {
        if (!res.needAuthorization) {
          resolve(true);
          return;
        }
        if (!wx.requirePrivacyAuthorize) {
          // 旧基础库无主动授权 API，交由系统默认弹窗处理
          resolve(true);
          return;
        }
        wx.requirePrivacyAuthorize({
          success: () => resolve(true),
          fail: () => {
            wx.showToast({ title: '需同意隐私保护指引后才能继续', icon: 'none' });
            reject(new Error('privacy denied'));
          }
        });
      },
      fail: () => resolve(true) // 检测失败不阻塞业务
    });
  });
}

module.exports = { ensurePrivacyAuthorized };
