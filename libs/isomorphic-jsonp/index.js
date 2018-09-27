
/**
 * @author wpzheng 
 * @time 2018-09-18
 * @description 1、client - jsonp (no use on server) && 2、server - axiox (no supports jsonp)
 * @param {String} url - 接口调用链接
 * @param {Object} params - 接口参数
 */

const axios = require('axios')
const jsonp = require('jsonp')

const isBrowser = new Function("try { return this === window;}catch(e){ return false;}")
let that = null

/** 
 * create a promise for jsonp 
 */
function jsonpGet(url, params) {
  return new Promise((resolve, reject) => {
    params = params || { t: new Date().getTime() }
    jsonp(url, params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Axios already supports promises
 */
function axiosGet(url, params) {
  return axios.get(url, { params: params })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
}

if (isBrowser()) {
  that = jsonpGet
} else {
  that = axiosGet
}

export default that