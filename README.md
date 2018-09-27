## Author Information
```
@Name: xiaozhenggaomashi
@Chinese name: wpzheng
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




