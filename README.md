### 说明
这是微信小程序的声明文件，目前对应基础库版本为`2.2.2`，该声明文件无注释，因此使用时请参考[官网文档](https://developers.weixin.qq.com/miniprogram/dev/api/)。

### 使用
##### 下面我将[仅做api提示的版本为“弱版本”]，将[可完整提示的版本为“强版本”]：
- 弱版本：即仅有API提示和全局方法声明等定义(目前网络上的小程序声明文件都是这种的)
- 强版本：除了可以实现上述要求外，还可以实现和用`ts`写`react`中的类型提示一样，让你的`page`的`data`属性被正确提示，让你的`app`的全局变量被正确提示，但不支持小程序的`component`的相关提示，具体见下方示例

1. `npm i@xhmm/wxapp@latest`
2. 在`app.ts`上方加入`/// <reference path='/path/to/node_modules/@xhmm/wxapp/wxapi.d.ts' />`(注：此处是`wxapi.d.ts`而不是`wxapp.d.ts`)
3. **如果你只想要使用“弱版本”，则步骤到此结束，若想使用“强版本”，请继续下面的步骤**
4. 由于小程序不会引入`node_modules`下的文件(即使你写成相对路径也不行)，因此我们需要手动移动`@xhmm/wxapp`目录下的`wxapp.ts`文件(注：不是`wxapi.d.ts`)，把它放在自己的开发目录下，比如`libs/wxapp.ts`
5. “强版本”使用示例：

#### 2.2.1及以前版本使用方法：

```
// app.ts
import {CApp,createApp} from 'path/to/wxapp'
// 请export我，因为page页面要用
export interface IGlobalData {
    isUpdated: boolean
}
class App extends CApp<IGlobalData> {
    onLaunch() {
        //do your things
    }
}
// 该构造参数传入的内容对应IGlobalData
createApp(new App({
    isUpdated: false
}))


// pages/index/index/ts
import {CPage,createPage,getGlobalApp} from 'path/to/wxapp'
import {IGlobalData} from 'path/to/app'

interface IData {
    a:number
}
const app = getGlobalApp<IGlobalData>()
// 请传入泛型参数，否则不会类型检测setData
class Page extends CPage<IData> {
    onReady() {
        app.isUpdated = true
        this.setData({
            a: 2
        })
    }
}
// 该构造参数传入的内容对应IData
createPage(new Page({
    a: 1
}))
```

```
// 在实现小程序自定义组件时，只能按照原生写法来，该强版本目前无法实现完整的类型提示
Component({
  ...
})
```
#### 2.3.0及以上版本使用：
##### 鄙人在 `Win10` + `Webstorm`环境下使用2.2.1及以前版本时，当给`new Xxx()`传入data时，会莫名导致CUP高升引起电脑卡死，目前不清楚原因（总觉得是个人电脑原因），出现此情况的伙伴们，请升级至2.3.0+版本并开始使用以下写法：

该写法与2.2.1及以前版本的写法不同处在于：
- `app.ts`的写法会发生破坏性改变，你需要将全局变量写在`data`属性内部，同时你在page中使用全局属性时，也需要写成`app.data.xxx`而不是`app.xxx`，具体见下方示例
- `page`页面的`data`赋值从构造函数转移至类属性，具体见下方示例

```
// app.ts
import {CApp,createApp} from 'path/to/wxapp'
// 请export我，因为page页面要用
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
createApp(new App()) // 此处不传入参数


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
        app.data.isUpdated = true // 不能写成app.xxx
        this.setData({
            a: 2
        })
    }
}
createPage(new Page()) // 此处不传入参数
```

```
// 在实现小程序自定义组件时，只能按照原生写法来，该强版本目前无法实现完整的类型提示
Component({
  ...
})
```
### 后言
如有任何问题，请issue区讨论
