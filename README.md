### 说明
这是微信小程序的声明文件，目前对应基础库版本为`2.2.0`，注：即将废弃API以及不再维护AP未包含在内

### 使用
1. `npm i @xhmm/wxapp`
2. 在`app.ts`上方加入`/// <reference path='/path/to/node_modules/@xhmm/wxapp' />`

```
// 你可以为page页面加入部分的data类型检测，但由于小程序的调用方式，setData方法不会被类型检查

type Data ={
    name:string
}
Page<Data>({
    data= {
        name:123 // ts error
    }
    onHide(){
        this.setData({
            age:11 // ts不会检查该方法，故不会报错
        })
    }
})
```

### 日志
[官方API列表](https://developers.weixin.qq.com/miniprogram/dev/api/)

- [x] 网络
    - [x] 发起请求
    - [x] 上传，下载
    - [x]  WebSocket
- [x] 媒体
    - [x] 图片
    - [x] 录音
    - [x] 录音管理
    - [x] 音频播放控制
    - [x] 音乐播放控制
    - [x] 背景音频播放管理
    - [x] 音频组件控制
    - [x] 视频
    - [x] 视频组件控制
    - [x] 相机组件控制
    - [x] 实时音视频
    - [x] 动态加载字体
- [x] 文件
- [x] 数据缓存
- [x] 位置
    - [x] 获取位置
    - [x] 查看位置
    - [x] 地图组件控制
- [x] 设备
    - [x] 系统信息
    - [x] 网络状态
    - [x] 加速度计
    - [x] 罗盘
    - [x] 拨打电话
    - [x] 扫码
    - [x] 剪贴板
    - [x] 蓝牙
    - [x] iBeacon
    - [x] 屏幕亮度
    - [x] 用户截屏事件
    - [x] 振动
    - [x] 手机联系人
    - [x] Wi-Fi
- [x] 界面
    - [x] 交互反馈
    - [x] 设置导航条
    - [x] 设置tabBar
    - [x] 设置窗口背景
    - [x] 设置置顶信息
    - [x] 导航
    - [x] 动画
    - [x] 位置
    - [x] 绘图 [截至2018-7-20 shadowBlur shadowColor shadowOffsetX shadowOffsetY transform仍无链接]
    - [x] 下拉刷新
    - [x] WXML节点信息
    - [x] WXML节点布局相交状态
- [x] 第三方平台
- [x] 开放接口
    - [x] 登录
    - [x] 授权
    - [x] 用户信息
    - [x] 微信支付
    - [x] 模板消息×
    - [x] 客服消息×
    - [x] 转发
    - [x] 获取二维码×
    - [x] 收货地址
    - [x] 卡券
    - [x] 设置
    - [x] 微信运动
    - [x] 打开小程序
    - [x] 打开APP×
    - [x] 获取发票抬头
    - [x] 生物认证
    - [x] 附近×
    - [x] 插件管理×
    - [x] 内容安全×
- [x] 数据
- [x] 更新
- [x] 多线程
- [x] 监控
    - [x] 监控数据上报
- [x] 调试接口
    - [x] 打开/关闭调试
- [x] 日志