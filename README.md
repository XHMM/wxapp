### 说明
这是微信小程序的声明文件：目前包括[**基础库API(2.3.0)**](https://developers.weixin.qq.com/miniprogram/dev/api/)，[**云函数客户端API**](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/)
### 使用
1. `npm i@xhmm/wxapp@latest`
2. 使用基础库：在`app.ts`上方加入`/// <reference path='/path/to/node_modules/@xhmm/wxapp/wxapi.d.ts' />`
3. 使用云函数客户端：在`app.ts`上方加入`/// <reference path='/path/to/node_modules/@xhmm/wxapp/wxcloudapi-client.d.ts' />`


### 更新日志(下方出现的版本号为npm包的版本号)
#### 2018-09-30(V2.6.0)
- 新增云函数客户端API声明文件
- [doing]基础库API仍还为未善
#### 2018-08-27(V2.5.4)
- [doing]小程序文档进行了大幅度的调整，目前正在全面检查以完成对2.3.0的声明，由于时间问题，可能会需要一段时间

#### 2018-08-27(V2.5.3)
- 更正绘图api的部分函数参数optional声明

#### 2018-08-27(V2.5.1)
- 更正`getApp`的参数应是可选的而非必选
#### 2018-08-27(V2.5.0)
- `getApp`新增`allowDefault`参数
- 自定义组件新增了`lifetimes`、`pageLifetimes`、`definitionFilter`字段
- backgroundAudioManager`新增`onSeeking`和`onSeeked`方法
- 新增`wx.nextTick`方法
#### 2018-08-14(V2.4.X)
- 更正`SelectorQuery`的`in`方法参数类型和返回类型
