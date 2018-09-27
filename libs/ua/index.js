/**
 * @description 判断手机操作系统和浏览器和所在APP的信息
 * @author wpzheng
 * @time 2018-09-18
 * @return {Object} 
 */

// 根据UA信息判断在哪个操作系统及部分环境
function getUserAgent() {
  const userAgent = navigator.userAgent.toLowerCase()
  const UAObj = {
    iphone : /iphone/.test(userAgent),    // ios
    android : /android/.test(userAgent), // 安卓
    qqnews : /qqnews/.test(userAgent), // 新闻app
    weixin : /micromessenger/.test(userAgent), // 微信
    mqqbrowser: /mqqbrowser/.test(userAgent), // QQ浏览器
    qq : /\sqq/.test(userAgent),             // 手机QQ
    ucbrowser : userAgent.match(/ucbrowser/), // UC浏览器
    ipadqq : /ipadqq/.test(userAgent) // ipadQQ
  }
  return UAObj
}

// 通过正则来判断APP
const UARegList = [
  ['UC', / UCBrowser\//i], // UC浏览器
  ['safari', / Version\/[\d.]+ Mobile\/\w+ Safari\/[\d.]+/], // Safari的UA格式较为固定
  ['iPadQQ', / iPadQQ\//i], // iPadQQ
  ['mqq', / qq\//i], // 手Q
  ['weixin', / MicroMessenger\//i], // 微信
  ['qqNews', / qqnews\//i], // 腾讯新闻
  ['mqb', / MQQBrowser\//i], // QQ浏览器（因手Q、企鹅FM等均使用QQ浏览器内核，故此项应在腾讯系最后监测）
  ['baidu', / baidubrowser\//i], // 百度浏览器
  ['baidubox', / baiduboxapp\//i], // 百度搜索App
  ['360', /360/], // UA作假难以判断，仅判断360字符串，可匹配部分情况
  ['sogou', /SogouMobileBrowser\//i], // 搜狗浏览器（因前面可能有“SogouMSE,”所以不在前面加空格）
  ['liebao', / LieBao/i], // 可能有LieBaoFast，所以后面不加斜线
  ['sxs', / SamsungLifeService\//i], // 三星生活助手
  ['Opera', / OPR\//i], // 欧朋浏览器
  ['maxthon', / Maxthon\//i], // 遨游浏览器
  ['MyIE', / MyIE;/i], // 此浏览器使用Firefox内核，需要放在Firefox之前
  ['Firefox', / Firefox\//i],
  ['Chrome', / Chrome\//i],// 因为几乎所有浏览器都有Chrome标志，故应放到最后
]

/**
 * 获取上报需要的浏览器信息
 * @return { string }
 */
function getUserAgentForWebview(ua) {
  if(!ua && window && window.navigator) {
    ua = window.navigator.userAgent
  }
  let result = 'others'
  let ualength = UARegList.length
  for(let i = 0; i < ualength; i+=1) {
    const name = UARegList[i][0]
    const reg = UARegList[i][1]
    if(reg.test(ua)) {
      result = name
      break
    }
  }
  return result
}

export default {
  getUserAgent: getUserAgent,
  getUserAgentForWebview: getUserAgentForWebview
}

