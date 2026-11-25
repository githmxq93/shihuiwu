/**
 * 后台管理页的统一鉴权守卫（2026-09-28 新增）
 *
 * 背景：原先各 admin 页的 checkAuth() 只校验本地 admin_token 的**字符串格式**
 * （非空、非 'authorized'、长度 ≥ 8），不向服务端确认有效性。
 * 本地存储可被篡改，导致"能进入后台界面、但列表全是空/请求全被拒"的误导状态；
 * 且首页曾残留一个未绑定的 onAdminNav 入口，容易被误绑而暴露后台入口。
 *
 * 现在改为：格式校验（同步，用于立即拦截）+ **服务端复核**（异步，权威判定）。
 * 服务端侧 requireAdmin 失败会伪装成 404，这里按 success 字段判定。
 *
 * 注意：这只是"把无效令牌挡在门外"的体验/纵深防御。真正的数据安全始终依赖
 * 服务端 requireAdmin（每页请求都带 x-admin-key），客户端校验不可作为安全边界。
 */
const request = require('../../utils/request');
const API = require('../../config/api');

/** 取本地后台令牌；格式不合法返回空串 */
function getAdminToken() {
  var token = '';
  try { token = wx.getStorageSync('admin_token'); } catch (e) { return ''; }
  if (!token || typeof token !== 'string' || token === 'authorized' || token.length < 8) return '';
  return token;
}

/** 清掉本地后台凭据并跳回登录页 */
function kickToLogin() {
  try {
    wx.removeStorageSync('admin_token');
    wx.removeStorageSync('x-admin-key');
  } catch (e) { /* ignore */ }
  wx.redirectTo({ url: '/admin-pkg/pages/login/login' });
}

/**
 * 向服务端复核后台令牌。
 * @returns {Promise<boolean|null>} true=有效 / false=无效（已跳登录）/ null=网络异常（不判定，避免误伤）
 */
function verifyAdminToken(token) {
  return new Promise(function (resolve) {
    request({
      handle401: false,
      url: API.AUTH.ADMIN_CHECK,
      method: 'GET',
      timeout: 8000,
      header: { 'x-admin-key': token || '' },
      success: function (res) {
        var d = (res && res.data) || {};
        if (d.success) return resolve(true);
        kickToLogin();
        resolve(false);
      },
      fail: function () { resolve(null); }
    });
  });
}

module.exports = { getAdminToken, verifyAdminToken, kickToLogin };
