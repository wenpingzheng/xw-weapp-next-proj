/** 简单的PGV引入(待验证) */

var load = require('load-script')

const pgvjs = '//pingjs.qq.com/tcss.ping.https.js'
const pgvjs_unofficial = '//mat1.gtimg.com/www/https/pingjs20161020.js'

function loadPgvScript (useUnofficialJS = false, callback) {
  const scriptUrl = useUnofficialJS ? pgvjs_unofficial : pgvjs
  load(scriptUrl, function (err) {
    if (!err && typeof window.pgvMain === 'function') {
      callback(window.pgvMain)
    }
  })
}
/**
 * pgv上报
 * @param {Object}  options               - 参数配置对象
 * @param {String} [options.pgv_site]     - 页面所属频道
 * @param {Boolean} [options.useUnofficialJS] - 使用非官方版PGV脚本（可重复调用pgvMain等）
 */
export default function (options = {}) {
  const useUnofficialJS = !!options.useUnofficialJS
  let virtualDomain
  const pgvLoaded = () => {
    if (options && options.pgv_site) {
      virtualDomain = options.pgv_site + ".xw.qq.com"
      if (useUnofficialJS) {
        window.pvCurDomain = virtualDomain
      }
    }
    window.pgvMain('', {virtualDomain})
  }
  const windowLoaded = window.document.readyState === 'complete' || window.document.readyState === 'interactive'

  if (typeof window.pgvMain === 'function') {
    pgvLoaded()
  } else if (windowLoaded) {
    loadPgvScript(useUnofficialJS, pgvLoaded)
  } else {
    window.addEventListener('load', () => {
      loadPgvScript(useUnofficialJS, pgvLoaded)
    })
  }

}
