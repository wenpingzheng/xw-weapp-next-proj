/**
 * @description - 去除URL中的http:部分，以自适应http环境
 * @author - wpzheng
 */

export default function(url) {
  if(typeof url !== 'string') {
    return url
  } else {
    return url.replace(/^http:\/\//i, '//')
  }
}