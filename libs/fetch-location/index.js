/**
 * 获取地方站相关信息
 */
import loadScript from 'load-script'
import cityCode from './city-code'
import Cookies from 'js-cookie'

var isFetchingStatus = false  // 当前页是否已经在请求位置信息
var fetchLocationPromise = null // 获取位置信息的promise

/**
 * @typedef LocationInfo
 * @type {object}
 * @property {string} province 省 中文名称
 * @property {string} city 市 中文名称
 * @property {string} district 区县 中文名称
 * @property {string} py 如果有对应的地方站,则为地方站英文名 如 xw.qq.com/m/beijing 中的beijing
 * @property {string} short 如果有对应的地方站,则为地方站英文简称 如北京的简称为bj
 * @property {string} from 数据来源: local cookie api
 */

/**
 * 获取当前位置地方站相关信息
 * @param {Object} options - 请求参数对象
 * @param {string} [options.ignoreLocalStorage=false] - 是否忽略用户操作的本地存储
 * @returns {Object} 返回地方站信息对象LocationInfo,不存在地方站则py short 字段为空字符串
 * @example 同步调用
 * import fetchLocation from '../libs/fetch-location'
 * const locationInfo  = await fetchLocation.getLocationInfo()
 * @example 异步调用
 * import fetchLocation from '../libs/fetch-location'
 * fetchLocation.getLocationInfo().then(function(locationInfo) {
 *   console.log(locationInfo)
 * }, function (err) {
 *   console.log(err) // 目前基本不会报err了，如果发生错误，则返回同结构的空字段
 * })
 */
async function getLocationInfo (options) {
  try {
    var locationInfo
    var provinceCookie = Cookies.get('province')
    // var cityCookie = Cookies.get('city')
    var provinceLocalStorge = localStorage.getItem('province') || ''
    var cityLocalStorge = localStorage.getItem('city') || ''
    if (!(options && options.ignoreLocalStorage) && provinceLocalStorge) {  // 优先读取用户手动的选择
      locationInfo = {
        province: provinceLocalStorge.replace(/[^\u4E00-\u9FA5]/g,''),
        city: cityLocalStorge.replace(/[^\u4E00-\u9FA5]/g,''),
        district: '',
        from: 'local'
      }
    } else if (provinceCookie) {  // 读取cookie
      locationInfo = {
        province: provinceCookie.replace(/[^\u4E00-\u9FA5]/g,''),
        city: (Cookies.get('city') || '').replace(/[^\u4E00-\u9FA5]/g,''),
        district: (Cookies.get('district') || '').replace(/[^\u4E00-\u9FA5]/g,''),
        from: 'cookie'
      }
    } else if (isFetchingStatus && fetchLocationPromise){ // 避免重复请求
      locationInfo = await fetchLocationPromise
    } else {
      isFetchingStatus = true
      fetchLocationPromise = getlocationPromise() // 通过请求获取位置promise
      locationInfo = await fetchLocationPromise
      locationInfo.from = 'api'
      // 设置cookie
      Cookies.set('province', locationInfo.province, {expires: 1})
      if (locationInfo.city) {Cookies.set('city', locationInfo.city, {expires: 1})}
      if (locationInfo.district) {Cookies.set('district', locationInfo.district, {expires: 1})}
      isFetchingStatus = false
    }
  } catch (err) {
    console.log(err)
    isFetchingStatus = false
    return {province: '', city: '', district: '', py: '', short: '', from: ''}
  }

  // 目前只到省级
  if (cityCode[locationInfo.province]) {
    if (cityCode[locationInfo.province][locationInfo.city]) {
      locationInfo.py = cityCode[locationInfo.province][locationInfo.city].py
      locationInfo.short = cityCode[locationInfo.province][locationInfo.city].short
    } else {
      locationInfo.city = '' // 未配置城市的 将城市留空 防止导航显示城市但实际页面不是
      locationInfo.py = cityCode[locationInfo.province].province.py
      locationInfo.short = cityCode[locationInfo.province].province.short
    }
  } else {
    locationInfo.py = ''
    locationInfo.short = ''
  }

  return locationInfo
}

/**
 * 通过英文名获取地方站相关信息
 * @param {string} pyname 地方站链接地址里的英文名称
 * @returns {Object} 返回地方站信息对象LocationInfo,不存在则对应字段返回空字符串
 */
function getLocationInfoByPy (pyname) {
  var province, city, short
  for (province in cityCode) {
    for (city in cityCode[province]) {
      if (cityCode[province][city].py === pyname) {
        short = cityCode[province][city].short
        return {
          province : province,
          city: city !== 'province' ? city : '',
          district: '',
          py: pyname,
          short: short
        }
      }
    }
  }
  return {province: '', city: '', district: '', py: '', short: ''}
}

/**
 * 通过省中文名称获得省会中文名称
 * @param {string} province 省 中文名称
 * @returns {string} 返回省会中文名称,没有则返回空字符串
 */
function getProvincialCapitalByProvince (province) {
  for (var key in cityCode) {
    if (key === province) {
      return cityCode[key].province.pc
    }
  }
  return ''
}

export default {
  getLocationInfo,
  getLocationInfoByPy,
  getProvincialCapitalByProvince,
}

/**
 * 获取位置信息Promise，优先根据geolocation判断，失败则按ip判断
 * @returns {Promise}
 */
async function getlocationPromise() {
  var fetchLocationPromise = null
  // 暂时去掉使用geolocation判断直接用ip
  // try {
  //   fetchLocationPromise = await getGeolocationPromise()
  // } catch (e) {
  //   console.log(e)
  //   fetchLocationPromise = getLoadJsonpPromise({
  //     url: 'https://fw.qq.com/ipwhere',
  //     charset: 'gb2312'
  //   })
  // }
  fetchLocationPromise = getLoadJsonpPromise({
    url: 'https://fw.qq.com/ipwhere',
    charset: 'gb2312'
  })
  return fetchLocationPromise
}

/**
 * 根据geolocation获取位置信息Promise，精确到区县
 * @returns {Promise}
 */
// function getGeolocationPromise() {
//   return new Promise(function(resolve, reject) {
//     if (!("geolocation" in navigator)) {
//       reject(new Error('don not support geoloaction!'))
//     }
//     var timer = null
//     timer = setTimeout(function(){
//       reject(new Error('browser bug: happens when close location service and web user press allow to get location'))
//     }, 3000)
//     navigator.geolocation.getCurrentPosition(function(position){
//       clearTimeout(timer)
//       timer = null
//       getLoadJsonpPromise({
//         url: 'https://apis.map.qq.com/ws/geocoder/v1/',
//         param: {
//           key: '3BFBZ-ZKD3X-LW54A-ZT76D-E7AHO-4RBD5',
//           location: position.coords.latitude + ',' + position.coords.longitude,
//           output: 'jsonp'
//         }
//       }).then(function(data) {
//         if (data.status == 0) {
//           resolve(data.result.address_component)
//         } else {
//           reject(new Error('map api error: status' + data.status))
//         }
//       }, function(err) {
//         reject(err)
//       })
//     }, function(err) {
//       clearTimeout(timer)
//       timer = null
//       reject(err)
//     })
//   })
// }

function encodeParameters(parameters) {
  var paras = []
  for (var parameter in parameters) {
    if (parameters.hasOwnProperty(parameter)) {
      paras.push(encodeURIComponent(parameter) + '=' + encodeURIComponent(parameters[parameter]))
    }
  }
  return paras.length > 0 ? '?' + paras.join('&') : ''
}

/**
 * @method
 * @desc jsonp请求，支持返回promise和设置回调
 * @param {Object} options - 请求参数对象
 * @param {string} options.url - 请求url地址
 * @param {Object} [options.param] - 请求参数
 * @param {function} [options.jsonpFn] - jsonp的回调函数
 * @param {function} [options.success] - 请求成功回调函数，与jsonp的回调不同
 * @param {string} [options.jsonp='callback'] - 请求地址上的callback key值
 * @param {string} [options.jsonpCallback='jsonp_132343'] - jsonp的回调函数名称
 * @param {string} [options.scriptCharset=''] - 文件的解码方式
 * @param {number} [options.number=3000] - 超时时间设置
 * @returns {Promise}
 */
function getLoadJsonpPromise (options) {
  return new Promise (function (resolve, reject) {
    var url = options.url
    var jsonp = options.jsonp || 'callback'
    var jsonpCallback = options.jsonpCallback || 'jsonp_' + Math.floor(Math.random() * 1e13)
    // 执行jsonp回调函数jsonpFn
    global[jsonpCallback] = function(obj) {
      resolve(obj)
      global[jsonpCallback] = null
    }
    // 加参数
    if (options.param) {
      url += encodeParameters(options.param)
    }
    // 增加callback参数
    url += ((url.indexOf('?') === -1) ? '?' : '&') + jsonp + '=' + jsonpCallback;
    global.setTimeout(function() {
      reject(new Error('getLoadJsonpPromise request timeout! url:' + options.url))
    }, options.timeout || 3000)
    loadScript(url, options, options.success || function(){})
  })
}

