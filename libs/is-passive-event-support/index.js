/* eslint-disable */
/**
 * 被动事件监听支持检测
 * 文档：https://developers.google.cn/web/tools/lighthouse/audits/passive-event-listeners?hl=zh-cn
 * 代码：https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 */

export default (function () {
  var supportsPassive

  return function () {
    if (typeof supportsPassive !== 'undefined') {
      return supportsPassive
    }
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true
        }
      })
      window.addEventListener('test', null, opts)
    } catch (e) {}
    return supportsPassive
  }

})()
