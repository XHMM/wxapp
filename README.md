### 说明
这是微信小程序的声明文件：目前包括[**基础库API(2.3.0)**](https://developers.weixin.qq.com/miniprogram/dev/api/)，[**云函数客户端API**](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/)
### 使用
1. `npm i@xhmm/wxapp@latest`
2. 使用基础库：在`app.ts`上方加入`/// <reference path='/path/to/node_modules/@xhmm/wxapp/wxapi.d.ts' />`
3. 使用云函数客户端：在`app.ts`上方加入`/// <reference path='/path/to/node_modules/@xhmm/wxapp/wxcloudapi-client.d.ts' />`

### 备注
基础库还未全面完成，云函数服务端api进行中