### 说明
这是微信小程序的声明文件，目前对应基础库版本为`2.2.4(2018.08.24)`，该声明文件无注释，因此使用时请参考[官网文档](https://developers.weixin.qq.com/miniprogram/dev/api/)。

### 使用
1. `npm i@xhmm/wxapp@latest`
2. 在`app.ts`上方加入`/// <reference path='/path/to/node_modules/@xhmm/wxapp/wxapi.d.ts' />`

### 更新日志
[changelog](./CHANGELOG.md)

---
### 另类使用(optional)
仅引入声明文件只能实现api提示，若想实现对`setData`，`data`，`全局变量`的类型提示，请参考如下，**不支持小程序的自定义组件的提示**：


1. 先按上述引入声明文件
2. 由于小程序不会引入`node_modules`下的文件(即使你写成相对路径也不行)，因此我们需要手动移动`@xhmm/wxapp`目录下的`wxapp.ts`文件，把它放在自己的开发目录下，比如`libs/wxapp.ts`
3. 具体写法如下：

```
// app.ts


import {CApp,createApp} from 'path/to/wxapp'
// 请export我，因为page页面要用，也可将其单独写在.d.ts文件中就不用每次使用都import了
export interface IGlobalData {
    isUpdated: boolean
}
class App extends CApp<IGlobalData> {
    // 必须要将全局变量写在data属性中
    data = {
      isUpdated: false
    }
    onLaunch() {
        //do your things
    }
}
createApp(new App())


// pages/index/index/ts


import {CPage,createPage,getGlobalApp} from 'path/to/wxapp'
import {IGlobalData} from 'path/to/app'

interface IData {
    a:number
}
const app = getGlobalApp<IGlobalData>()
// 请传入泛型参数，否则不会类型检测setData
class Page extends CPage<IData> {
    data= {
      a:1
    }
    onReady() {
        app.data.isUpdated = true // 不能写成app.xxx哦，因为全局变量都放在了app.data下
        this.setData({
            a: 2
        })
    }
}
createPage(new Page())
```

```
// 在实现小程序自定义组件时，只能按照原生写法来，目前无法实现强类型提示
Component({
  ...
})
```