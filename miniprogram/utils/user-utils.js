const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const authStore = require('./auth-store');

function generateUserId() {
  let rand = '';
  for (let i = 0; i < 8; i++) {
    rand += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return rand;
}

function hashTo8Chars(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash | 0;
  }
  let h = Math.abs(hash);
  let result = '';
  for (let i = 0; i < 8; i++) {
    result = CHARS[h % 62] + result;
    h = Math.floor(h / 62);
  }
  return result;
}

function syncToStorage(uid) {
  // [重要] 存储配额满（10MB）时 setStorageSync 会抛异常。身份 id 是关键路径，
  //    写盘失败也必须让内存态继续可用（下面 getApp().globalData 那份才是本次会话的权威值）。
  try {
    wx.setStorageSync('ql_user_id', uid);
    wx.setStorageSync('ql_uid_bak', uid);
  } catch (e) { /* 配额满 / 存储不可用：忽略，内存态仍然生效 */ }
  try {
    const app = getApp();
    if (app) app.globalData.qlUserId = uid;
  } catch (e) {}
}

function getStableUserId() {
  try {
    const app = getApp();
    if (app && app.globalData.qlUserId) {
      return app.globalData.qlUserId;
    }
  } catch (e) {}

  let uid = '';
  try { uid = wx.getStorageSync('ql_user_id') || ''; } catch (e) { uid = ''; }
  if (uid) {
    const clean = uid.replace(/^QL_/, '');
    if (clean.length === 8) {
      if (clean !== uid) {
        syncToStorage(clean);
      } else {
        try { getApp().globalData.qlUserId = clean; } catch (e) {}
      }
      return clean;
    }
  }

  try { uid = wx.getStorageSync('ql_uid_bak') || ''; } catch (e) { uid = ''; }
  if (uid) {
    const clean = uid.replace(/^QL_/, '');
    if (clean.length === 8) {
      syncToStorage(clean);
      return clean;
    }
  }

  let saved = null;
  try { saved = wx.getStorageSync('userInfo'); } catch (e) { saved = null; }
  if (saved && saved.qlId && saved.qlId.length === 8) {
    syncToStorage(saved.qlId);
    return saved.qlId;
  }

  uid = generateUserId();
  syncToStorage(uid);
  return uid;
}

function getRandomNickname(id) {
  return `用户_${id}`;
}

/**
 * 记录一条浏览历史（人物 / 文章），供个人中心「浏览历史」展示。
 *
 * [注意] 为什么必须显式调用：服务端 `POST /api/user/history` 早就存在，但**小程序与 Web 两端都没有调用它**，
 *    导致 `browsing_history` 表长期为空 → 个人中心「浏览历史」永远是空列表（2026-09-29 用户反馈）。
 *
 * 约定：仅在登录态下记录（接口需要鉴权）；未登录/失败一律静默，浏览历史属非关键路径，不能打扰用户。
 * 服务端对「同用户+同类型+同目标」做了去重（只保留最新一次），所以这里可以放心每次都调。
 *
 * @param {'figure'|'article'} type
 * @param {string|number} refId 人物 id / 文章 id
 * @param {string} title 标题（人物名 / 文章标题），存下来便于历史列表直接展示
 * @param {string} [url] 站内相对路径，便于后续做「点历史再进去」
 */
function recordHistory(type, refId, title, url) {
  try {
    if (!refId) return;
    const token = authStore.get('userToken') || '';
    if (!token) return;
    const API = require('../config/api');
    // [注意] 刻意**不走** utils/request.js（2026-10-15 全量迁移时有意保留，勿改）：
    //    ① 这是静默埋点（浏览历史属非关键路径，失败一律静默）。封装的 401 处理会调
    //       authStore.clear() 清登录态 —— 埋点失败不该把用户登出。
    //    ② 本文件是**登录态层**（token 静默刷新也在此），request.js 反而依赖
    //       auth-store，保持「下层不依赖上层封装」的分层更干净。
    wx.request({
      url: API.USER.HISTORY,
      method: 'POST',
      timeout: 5000,
      header: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
      data: { type: type, refId: String(refId), title: title || '', url: url || '' },
      fail: function () { /* 静默 */ }
    });
  } catch (e) { /* 静默 */ }
}

// ---------- Token 静默刷新 ----------
// tokenInfo 读取非常频繁（每次刷新判断 / 记录浏览历史都会走一遍），而它只在
// 登录态变化时写入 —— 用模块级内存缓存，避免在同步链路上反复 getStorageSync。
// 写入方（setToken / removeToken）都在本文件内，因此不存在缓存失真。
let _tokenCache = null;
let _tokenCacheLoaded = false;

function getToken() {
  if (!_tokenCacheLoaded) {
    try {
      _tokenCache = wx.getStorageSync('tokenInfo') || null;
    } catch (e) { _tokenCache = null; }
    _tokenCacheLoaded = true;
  }
  if (_tokenCache && _tokenCache.token) return _tokenCache;
  return null;
}

function isTokenExpired() {
  var tokenInfo = getToken();
  if (!tokenInfo) return true;
  var TOKEN_TTL = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - tokenInfo.ts > TOKEN_TTL;
}

function setToken(token) {
  _tokenCache = { token: token, ts: Date.now() };
  _tokenCacheLoaded = true;
  try { wx.setStorageSync('tokenInfo', _tokenCache); } catch (e) { /* 内存缓存已生效，本次会话不受影响 */ }
}

function removeToken() {
  _tokenCache = null;
  _tokenCacheLoaded = true;
  try { wx.removeStorageSync('tokenInfo'); } catch (e) {}
}

function refreshToken() {
  return new Promise(function (resolve, reject) {
    if (!isTokenExpired()) {
      var info = getToken();
      resolve(info ? info.token : '');
      return;
    }
    wx.login({
      success: function (loginRes) {
        if (loginRes.code) {
          setToken(loginRes.code);
          resolve(loginRes.code);
        } else {
          reject(new Error('wx.login 失败'));
        }
      },
      fail: function () {
        reject(new Error('wx.login 网络错误'));
      }
    });
  });
}

module.exports = { generateUserId, hashTo8Chars, getStableUserId, getRandomNickname, syncToStorage, getToken, isTokenExpired, setToken, removeToken, refreshToken, recordHistory };
