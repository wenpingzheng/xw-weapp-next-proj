
/** finalboss-lite 引入 */

var load = require('load-script')

const fbjs = '//mat1.gtimg.com/libs/t/finalboss-lite/0.1.7/finalboss-lite.min.js'

function loadScript (callback) {
  load(fbjs, function (err) {
    if (!err && typeof window.finalboss === 'function') {
      callback(window.finalboss)
    }
  })
}

function ready (callback = function () {}) {
  // 页面是否已 onload
  const windowLoaded = window.document.readyState === 'complete' || window.document.readyState === 'interactive'

  // 已加载直接返回
  if (typeof window.finalboss === 'function') {
    callback(window.finalboss)
  // 未加载但页面已 onload 则加载后返回
  } else if (windowLoaded) {
    loadScript((obj) => callback(obj))
  // 未加载且页面未 onload 则 onload 后加载返回
  } else {
    window.addEventListener('load', () => {
      loadScript((obj) => callback(obj))
    })
  }
}


export default {
  ready: ready
}
