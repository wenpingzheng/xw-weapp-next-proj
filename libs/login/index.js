/**
 * @description - 登录
 * @author - wpzheng
 */

const cookie = require('js-cookie')
const load = require('load-script')
const noop = function () {}
const logoUrl = encodeURIComponent('http://mat1.gtimg.com/www/mobi/2017/image/loginlogo.png')

const Passport = {
  // 获取
  skey: function () {
    return cookie.get('skey')
  },
  // 获取 uin
  uin: function () {
    return cookie.get('uin')
  },
  // 跳转登录页
  login: function (returnUrl) {
    if (!returnUrl) {
      returnUrl = window ? window.location.href : 'https://xw.qq.com'
    }
    returnUrl = encodeURIComponent(returnUrl)
    window.location.href = `//ui.ptlogin2.qq.com/cgi-bin/login?appid=636026402&hln_css=${logoUrl}&style=8&s_url=${returnUrl}&low_login=0&daid=5&pt_no_onekey=1`
  },
  // 退出登录
  logout: function (callback = noop) {
    if (cookie.get('main_login') == 'wx') {
      cookie.remove('wx_openid',{domain:'.qq.com'})
      cookie.remove('wx_access_token',{domain:'.qq.com'})
      callback()
    } else if (cookie.get('main_login') == 'qq') {
      const logoutReady = () => {
        window.pt_logout.logout(callback)
      }
      if (window.pt_logout) {
        logoutReady(window.pt_logout)
      } else {
        load('https://ui.ptlogin2.qq.com/js/ptloginout.js', () => logoutReady())
      }
    }
    cookie.remove('main_login',{domain:'.qq.com'})
  },
  // 获取用户信息
  getUserInfo: function (callback = noop) {
    const uin = this.uin()
    const skey = this.skey()
    if (uin && skey) {
      let src = `https://qfwd.qq.com/?uin=${uin.substring(1)}&skey=${skey}&func=loginAll&refresh=0&ran=${Math.random()}`
      let oldCb = window.loginAll
      window.loginAll = function (data) {
        callback(data)
        if (typeof oldCb === 'function') {
          oldCb(data)
        }
        window.loginAll = oldCb // 还原旧的全局函数
      }
      load(src)
    } else {
      callback(new Error('skey or uin not found in cookie'))
    }
  }
}

export default {
  Passport: Passport
}

