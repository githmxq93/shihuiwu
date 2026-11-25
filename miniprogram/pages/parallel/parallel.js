// 兼容旧分享链接：/pages/parallel/parallel → parallel-pkg
// 2026-11-14 B8：平行时空整页迁入 parallel-pkg，主包只保留此跳转壳（约 1KB），
// 避免历史分享/收藏的旧 path 打开后“页面不存在”。原页面逻辑与数据均在分包内。
// 2026-11-24：默认入口改为「中外对照」compare 页；带 figureId / wfig / year 的
// 旧结果分享仍落到原 parallel 页，保证历史链接打开的就是当年那张结果。
Page({
  onLoad(options) {
    const params = options || {};
    const deep = params.figureId || params.wfig || (params.year !== undefined && params.year !== null && params.year !== '');
    const query = Object.keys(params)
      .filter(function (key) { return params[key] !== undefined && params[key] !== null; })
      .map(function (key) { return key + '=' + encodeURIComponent(params[key]); })
      .join('&');
    const base = deep ? '/parallel-pkg/pages/parallel/parallel' : '/parallel-pkg/pages/compare/compare';
    wx.redirectTo({
      url: base + (query ? '?' + query : '')
    });
  }
});
