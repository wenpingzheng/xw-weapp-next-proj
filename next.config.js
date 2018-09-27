
/**
 * process.env.NODE_ENV - 默认
 * @ yarn dev - development 
 * @ yarn build - production
 */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  webpack: function(config, { dev }) {
    if (dev) {
      return config;
    }

    // 调整UglifyJs配置
    for (const plugin of config.plugins) {
      if (plugin.constructor.name === 'UglifyJsPlugin') {
        plugin.options.uglifyOptions.output = plugin.options.uglifyOptions.output || {};
        // 将中文转成\u编码，防止因浏览器编码不一样页面渲染出现乱码
        plugin.options.uglifyOptions.output.ascii_only = true;
        // 默认打包后的JS文件也是没有注释的
        plugin.options.uglifyOptions.output.comments = false;
      }
    }

    // Polyfill
    const originalEntry = config.entry 
    config.entry = async () => {
      const entries = await originalEntry()
      if(entries['main.js']) {
        entries['main.js'].unshift('core-js/es6/map', 'core-js/es6/set', 'core-js/es6/object', 'raf/polyfill')
      }
      return entries
    }

    // 返回配置
    return config
  },
  exportPathMap: function() {
    return {
      '/': { page: '/', query: { static: true } },
      '/m/news': { page: '/channel', query: { static: true, name: 'news' } },
      '/m/video/group': { page: '/video', query: { static: true, name: 'video', subname: 'group' } },
      '/m/video/cat': { page: '/video', query: { static: true, name: 'video', subname: 'cat' } }
    }
  },
  assetPrefix: isProd ? 'https://mat1.gtimg.com/pingjs/ext2020/xw-next/' : ''
}

module.exports = nextConfig