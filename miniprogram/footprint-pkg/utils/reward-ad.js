/**
 * 激励视频广告 + 「按人物」足迹解锁状态（2026-11-10）
 *
 * 设计口径（合规红线，改动前先读）：
 *  - 广告只用来解锁**增强内容**（完整轨迹 / 迁徙回放 / 全览地图），
 *    **绝不能**作为进入足迹页或查看基础足迹的唯一出口。
 *    《小程序流量主运营规范》2.3「强制点击」把「所有运营内容都只能通过观看
 *    激励视频广告才能解锁」列为二级违规，处罚涉及扣除流量主全部未结算收入。
 *  - 必须由用户主动 tap 触发，入口文案须明确写出「看广告」；本模块不自动播放。
 *  - 只有 onClose 的 res.isEnded === true 才发奖励；提前关闭 / 加载失败一律不发。
 *  - 完整播放后必须立刻下发奖励（页面侧写解锁 + 重渲染），不能吞掉回调。
 *
 * 解锁粒度：**按人物、长期有效、不按天、不全局**。
 * 每看一个新人物都要各自解锁一次；已解锁人物换设备 / 清缓存后需重新解锁。
 * 状态只落本地 storage（端上回调不可信、可改），本期刻意不接服务端校验，
 * 因为收益敏感度低、且要求纯客户端改动、不动生产不部署。
 *
 * 单例说明：官方要求 RewardedVideoAd 是「页面内单例」，不允许跨页面使用。
 * 本项目只有 footprint 页调用本模块，故模块级单例等价于页面级单例；
 * 页面 onUnload 必须调 destroy() 注销监听并销毁，避免跨页面复用残留。
 */
var AD_UNIT_ID = 'adunit-b3ee46aaafb96d8a';
var STORE_KEY = 'fp_reward_unlocked_v1';
var STORE_VERSION = 1;
// 单 key 上限 1MB，正常用户不会解锁这么多人物；超过就淘汰最旧的一半，
// 避免极端情况下 storage 写失败导致「解锁记录丢失」。
var MAX_IDS = 2000;

var _ad = null;
var _handlers = null;
var _onReward = null;
var _onFail = null;

function _readAll() {
  try {
    var raw = wx.getStorageSync(STORE_KEY);
    if (!raw || typeof raw !== 'object' || raw.v !== STORE_VERSION ||
        !raw.ids || typeof raw.ids !== 'object') {
      return { v: STORE_VERSION, ids: {} };
    }
    return raw;
  } catch (e) {
    return { v: STORE_VERSION, ids: {} };
  }
}

/** 该人物是否已解锁增强足迹 */
function isUnlocked(figureKey) {
  if (!figureKey) return false;
  return !!_readAll().ids[String(figureKey)];
}

/** 广告完整观看后登记解锁（同步写，保证回调里立刻生效、不丢） */
function unlock(figureKey) {
  if (!figureKey) return;
  var key = String(figureKey);
  var all = _readAll();
  all.ids[key] = Date.now();
  var keys = Object.keys(all.ids);
  if (keys.length > MAX_IDS) {
    keys.sort(function (a, b) { return (all.ids[a] || 0) - (all.ids[b] || 0); });
    var keep = Math.floor(MAX_IDS / 2);
    for (var i = 0; i < keys.length - keep; i++) delete all.ids[keys[i]];
  }
  try {
    wx.setStorageSync(STORE_KEY, all);
  } catch (e) {
    console.error('[reward-ad] 写入解锁记录失败', e);
  }
}

function _ensureAd() {
  if (_ad) return _ad;
  if (typeof wx.createRewardedVideoAd !== 'function') return null;
  try {
    _ad = wx.createRewardedVideoAd({ adUnitId: AD_UNIT_ID });
  } catch (e) {
    console.error('[reward-ad] 创建广告实例失败', e);
    return null;
  }

  var onLoad = function () {};
  var onError = function (err) {
    console.error('[reward-ad] 激励视频加载失败', err);
    if (_onFail) {
      var f = _onFail;
      _onReward = null;
      _onFail = null;
      f('load_error');
    }
  };
  var onClose = function (res) {
    // res.isEnded 为 true 才代表用户完整看完；undefined / false 一律不发奖励。
    var ended = !!(res && res.isEnded === true);
    var reward = _onReward;
    var fail = _onFail;
    _onReward = null;
    _onFail = null;
    if (ended) {
      if (reward) reward();
    } else if (fail) {
      fail('not_ended');
    }
  };

  _ad.onLoad(onLoad);
  _ad.onError(onError);
  _ad.onClose(onClose);
  _handlers = { load: onLoad, error: onError, close: onClose };
  return _ad;
}

/**
 * 拉起激励视频。必须由页面上的用户 tap 直接/间接调用。
 * opts.onReward() —— 完整观看，页面应立即登记解锁并渲染增强内容
 * opts.onFail(reason) —— 'unsupported' | 'create_failed' | 'show_failed' |
 *                        'load_error' | 'not_ended'，页面给对应提示，不要放行
 */
function showAd(opts) {
  opts = opts || {};
  _onReward = typeof opts.onReward === 'function' ? opts.onReward : null;
  _onFail = typeof opts.onFail === 'function' ? opts.onFail : null;

  if (typeof wx.createRewardedVideoAd !== 'function') {
    if (_onFail) { var f0 = _onFail; _onReward = null; _onFail = null; f0('unsupported'); }
    return;
  }
  var ad = _ensureAd();
  if (!ad) {
    if (_onFail) { var f1 = _onFail; _onReward = null; _onFail = null; f1('create_failed'); }
    return;
  }

  // show() 在广告未就绪时会 reject，官方范式是先 load() 再 show() 重试一次。
  ad.show().catch(function () {
    return ad.load().then(function () { return ad.show(); });
  }).catch(function (err) {
    console.error('[reward-ad] 激励视频显示失败', err);
    if (_onFail) {
      var f = _onFail;
      _onReward = null;
      _onFail = null;
      f('show_failed');
    }
  });
}

/** 页面 onUnload 调用：注销监听 + 销毁页面级单例 */
function destroy() {
  _onReward = null;
  _onFail = null;
  if (!_ad) return;
  try {
    if (_handlers) {
      if (_ad.offLoad) _ad.offLoad(_handlers.load);
      if (_ad.offError) _ad.offError(_handlers.error);
      if (_ad.offClose) _ad.offClose(_handlers.close);
    }
    if (_ad.destroy) _ad.destroy();
  } catch (e) {
    console.error('[reward-ad] 销毁广告实例失败', e);
  }
  _handlers = null;
  _ad = null;
}

module.exports = {
  AD_UNIT_ID: AD_UNIT_ID,
  isUnlocked: isUnlocked,
  unlock: unlock,
  showAd: showAd,
  destroy: destroy
};
