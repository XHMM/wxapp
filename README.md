### 说明
这是微信小程序的声明文件，目前对应[基础库版本](https://developers.weixin.qq.com/miniprogram/dev/framework/release.html)为`2.3.0(2018.09.10)`，该声明文件无注释，因此使用时请参考[官网文档](https://developers.weixin.qq.com/miniprogram/dev/api/)。

### 使用
1. `npm i@xhmm/wxapp@latest`
2. 在`app.ts`上方加入`/// <reference path='/path/to/node_modules/@xhmm/wxapp/wxapi.d.ts' />`

### 更新日志

#### 2018-08-27(V2.5.4)
- [doing]小程序文档进行了大幅度的调整，目前正在全面检查以完成对2.3.0的声明，由于时间问题，可能会需要一段时间

#### 2018-08-27(V2.5.3)
- 更正绘图api的部分函数参数optional声明

#### 2018-08-27(V2.5.1)
- 更正`getApp`的参数应是可选的而非必选
#### 2018-08-27(V2.5.0)
- (2.2.4)`getApp`新增`allowDefault`参数
- (2.2.3)自定义组件新增了`lifetimes`、`pageLifetimes`、`definitionFilter`字段
- (2.2.3)`backgroundAudioManager`新增`onSeeking`和`onSeeked`方法
- (2.2.3)新增`wx.nextTick`方法
#### 2018-08-14(V2.4.X)
- 更正`SelectorQuery`的`in`方法参数类型和返回类型
