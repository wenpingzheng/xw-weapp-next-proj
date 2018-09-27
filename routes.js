
const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('index', '/') // 首页
routes.add('video', '/m/:name(video)/:subname(group|cate)/:cid?') // 视频页面
routes.add('channel', pattern = '/m/:name(news|ent|nba)', page = '/channel') // 频道页面