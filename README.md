## Author Information
```
@Name: xiaozhenggaomashi
@Chinese name: 小郑搞码事
@Time: 2017-10-09
@Uptime: 2018-09-12
@data: https://pacaio.match.qq.com/xw/rcdVideo?t=1537249963125&callback=__jp6
```

## Dependency tools
```
node - v8.11.0
npm  - 3.10.8
yarn - v1.5.1
```
## To Start the dev Server

**STEP 1**

create directory
```
mkdir xw-weapp-next
cd xw-weapp-next
yarn init -y  (crete package.json)
yarn install --save react react-dom next
mkdir pages
```
**STEP 2**

open the "package.json" in the xw-weapp-next directory and add the following NPM script.
```
{
  "scripts": {
    "dev": "next"
  }
}
```
Now everything is ready, Run the following command to start the dev server
```
yarn dev (auto create .next)
```

## Export into a static HTML App

Now we are going to export our index page(pages/index.js) as a static HTML page.

**STEP 1**

First of all, create a file called next.config.js in the root of your app and add the following content.
```
module.exports = {
  exportPathMap: () => {
    return {
      '/': { page: '/', query: { static: true } }
    }
  }
} 
```
**STEP 2**

Then add the following NPM scripts into the package.json.
```
"scripts": {
  "dev": "next",
  "build": "next build && next export"
},
```

**STEP 3**

Then run the following commands.
```
npm run build
``` 
Of course, yan can use yarn to build it also, like this
```
yarn build
``` 

## Create others directory 

Now, create two directory in the root of your app, it's components and layouts
```
mkdir components
mkdir layouts
```

## routes
```
yarn add next-routes --save
```
Then to start your project.

## install others
```
yarn add axios --save
yarn add jsonp --save
```
Any other questions, communcation with xiaozheng. 

The end !!

Sometimes, we need do something to promise our project strong. so 

## 相关处理技术

**一、客户端和服务端获取数据方法封装（/libs/isomorphic-jsonp）**

```
yarn add axios jsonp --save
```
将axiox和jsonp封装成一个项目中使用的获取数据的方法JS。

promise允许使用两种方式接收数据：

1、then函数中接收

2、async -> await等着数据返回

**二、项目中使用load-script加载js文件&&qs解析参数**
```
yarn add load-script qs --save
```
引用方式
```
const qs = require('qs')
qs.parse(url)
qs.stringify(obj)

const load = require('load-script')
load('demo.js',() => {
})
```

**三、关于配置文件**

next.js框架自带webpack和babel，同时也提供自定义改变配置参数。

1、将中文转成\u编码，防止因浏览器编码不一样页面渲染出现乱码
```
// 调整UglifyJs配置
for (const plugin of config.plugins) {
  if (plugin.constructor.name === 'UglifyJsPlugin') {
    plugin.options.uglifyOptions.output = plugin.options.uglifyOptions.output || {};
    plugin.options.uglifyOptions.output.ascii_only = true;
    plugin.options.uglifyOptions.output.comments = false;
  }
}
```

**安装core-js和raf**

```
yarn add core-js raf --save
```
2、入口main.js文件添加polyfill，解决一些浏览兼容性问题
```
const originalEntry = config.entry 
config.entry = async () => {
  const entries = await originalEntry()
  if(entries['main.js']) {
    entries['main.js'].unshift('core-js/es6/map', 'core-js/es6/set', 'core-js/es6/object', 'raf/polyfill')
  }
  return entries
}
```
注意：要运行async，必须将node升级到v7.6以上才加入这个函数

升级node的方法-这里用n来升级到指定版本
```
npm install -g n
n v8.11.0
```

## 生成文件

首先使用yarn next build 在.next文件下生成一个BUILD_ID

其次使用yarn next export根据这个BUILD_ID导出静态文件及依赖JS在out目录下
```
├─ .next                 dev(执行)      build(转换)
|    ├─ bundles          - 访问生成      - 压缩    - 编译后的代码
|    ├─ dist
|    |   ├─ bundles      - 访问生成     - 未压缩   - 编译后的源代码
|    └─ main.js    - 入口文件【资源调用的依赖关系】
├─ build
|    └─ ssl-keys-dev
├─ components
├─ layouts
├─ libs
├─ node_modules
├─ out - export(导出)
|   ├─ _next - 输出JS文件
|   └─ index.html - 输出静态文件
├─ pages   
├─ static
├─ .gitignore
├─ .next.config.js
├─ package.json
├─ README.md
├─ routes.js
└─ server.js
```




