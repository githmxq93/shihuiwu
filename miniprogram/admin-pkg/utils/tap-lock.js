// utils/tap-lock.js —— 防重复点击/提交统一封装
//
// 用法：把提交类 handler 用 once(...) 包一层即可，调用期间再次触发直接忽略。
//   onRegister: once(function (e) { ... return request({ ... }); }),
//
// 解锁时机（自动判断）：
//   1) handler 返回 Promise（如 request 的 Promise 形态）→ 在 Promise settle 后解锁；
//   2) handler 未返回 Promise（同步逻辑）→ 调用后立刻解锁。
// 因此：若 handler 内部发起网络请求，请 `return request({...})`，让锁在请求完成前一直生效，
// 避免弱网连点导致重复提交（如重复注册撞手机号唯一约束）。
//
// 用 WeakMap 以原函数对象为 key，保证同一 handler 在多页面实例间互不干扰。
const _locked = new WeakMap();

function once(fn) {
  return function () {
    if (_locked.get(fn)) return;
    _locked.set(fn, true);
    var args = arguments;
    var self = this;
    var res;
    try {
      res = fn.apply(self, args);
    } catch (e) {
      _locked.delete(fn);
      throw e;
    }
    if (res && typeof res.then === 'function') {
      res.then(
        function () { _locked.delete(fn); },
        function () { _locked.delete(fn); }
      );
    } else {
      _locked.delete(fn);
    }
  };
}

module.exports = { once };
