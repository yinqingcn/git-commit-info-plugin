# git-commit-info-plugin


打包发布项目后，将提交信息添加到head标签中，便于追踪版本

用法：

```
npm install git-commit-info-plugin
```

## 一、在vite.config.ts中引用

```
// vite.config.ts

import { buildInfo } from 'git-commit-info-plugin'

import { defineConfig } from 'vite'
export default defineConfig({
	plugins:[
	  ...
	  buildInfo()
	]
})
```



### vite 支持配置传参配置

```
buildInfo(['author','email','commitDate','version','buildDate'])
```

默认不传参，显示所有信息，上面五个信息可以选填

| 参数名称   | 说明         |
| ---------- | ------------ |
| author     | 用户名       |
| email      | 用户邮箱     |
| commitDate | 提交时间     |
| version    | git版本信息  |
| buildDate  | 构建完成时间 |


## 二、在vue2中使用 

1. ### vue.config.js
```

import gitCommitInfoPlugin from 'git-commit-info-plugin'
const vueConfig = ({
  publicPath: './',
  chainWebpack: (config) => {
    // 这里是重点
    config.plugin('html').tap(args => {
      args[0].buildInfo = gitCommitInfoPlugin;
      return args;
    })
  },
  devServer: {
    port: 8000,
    proxy: {}
  }
})

module.exports = vueConfig
```
2. ### 需要在index.html中配置如下信息(通常vue2的index.html是在public文件夹下)
   1. 可以根据项目需要填写meta信息
```
<meta name="author" content="<%= htmlWebpackPlugin.options.buildInfo.commitAuthor %>" >
<meta name="email" content="<%= htmlWebpackPlugin.options.buildInfo.commitEmail %>" >
<meta name="commitDate" content="<%= htmlWebpackPlugin.options.buildInfo.commitDate %>" >
<meta name="buildDate" content="<%= htmlWebpackPlugin.options.buildInfo.buildDate %>" >
<meta name="version" content="<%= `${htmlWebpackPlugin.options.buildInfo.branch}-${htmlWebpackPlugin.options.buildInfo.commit}` %>" >
```

完成后，html header中会看到如下信息

```
<meta name="author" content="xxx">
<meta name="email" content="xxx@163.com">
<meta name="commitDate" content="2022-01-12 15:31:16">
<meta name="version" content="master/e6b991b6323ff427f65133f82423124ba18a429f">
<meta name="buildDate" content="2023-04-10 13:08:55">
```


