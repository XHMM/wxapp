### 说明
这是微信小程序的声明文件：目前包括[**基础库API(2.3.2)**](https://developers.weixin.qq.com/miniprogram/dev/api/)，[**云函数客户端API(2.3.2)**](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/)
### 使用
1. `npm i@xhmm/wxapp@latest`
2. 在`app.ts`上方加入如下：`<reference path='/path/to/node_modules/@xhmm/wxapp/wxapi.d.ts' />`
### 注意事项
1. 当使用到云函数api时，该声明文件内的实现均为promise版，不包含success,fail,complete形式的声明，除了一些特殊的函数比如`downloadFile`和`uploadFile`
### 备注
基础库还未全面完成核对，云函数服务端api进行中，微信文档结构变化太快了，不停地在调整。