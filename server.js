
const routes = require('./routes')
const https = require('https')
const http = require('http')
const next = require('next')
const fs = require('fs')

// 判断生产环境
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
  app.render(req, res, route.page, query)
})

// 服务端渲染函数
const serverHandler = (req, res) => {
  let query = {}
  query.name = 'wp'
  query.subname = 'zwp'
  // 根据不同的的类型来渲染不同的文件
  app.render(req, res, '/video', query)
}

app.prepare()
  .then(() => {

    // 端口配置
    const port = {
      http: process.env.NEXT_PORT_HTTP || 3000,
      https: process.env.NEXT_PORT_HTTPS || 3443
    }

    // 证书引入
    const httpsOptions = {
      key: fs.readFileSync('build/ssl-keys-dev/local.xw.qq.com.key'),
      cert: fs.readFileSync('build/ssl-keys-dev/local.xw.qq.com.cert'),
    }

    // 匹配处理
    const requestListener = (req, res) => {
      if(req.url.startsWith('/video')) {
        return serverHandler(req, res)
      } else {
        return handler(req, res)
      }
    }

    // 监听返回
    const listenCallback = (portocal) => {
      return (err) => {
        if(err) throw err
        console.log(`> Ready on ${portocal}://localhost:${port[portocal]}`)
      }
    }
    
    // 创建服务
    if(dev) {
      https.createServer(httpsOptions, requestListener).listen(port.https, listenCallback('https'))
    }
    http.createServer(requestListener).listen(port.http, listenCallback('http'))
  })