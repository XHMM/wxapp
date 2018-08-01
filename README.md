### 前言
由于该`module`最近结构变化较快，使得`README`文件的使用说明更新频繁，在此对之前已经在使用该`module`的伙伴们致歉。从此版本(2.1.0)开始，将不会发生类似事件，若有重大更新会
直接更新主版本号

---

### 说明
这是微信小程序的声明文件，目前对应基础库版本为`2.2.1`，该声明文件无注释，因此使用时请参考[官网文档](https://developers.weixin.qq.com/miniprogram/dev/api/)。注：即将废弃API以及不再维护AP未包含在内

### 使用
##### 下面我将[仅做api提示的版本为“弱版本”]，将[可完整提示的版本为“强版本”]：
- 弱版本：即仅有API提示和全局方法声明等定义(目前网络上的小程序声明文件都是这种的)
- 强版本：除了可以实现上述要求外，还可以实现和用`ts`写`react`中的类型提示一样，让你的`page`的`data`属性被正确提示，让你的`app`的全局变量被正确提示，当然还有小程序的`component`的相关提示

---
1. `npm i@xhmm/wxapp@latest`
2. 在`app.ts`上方加入`/// <reference path='/path/to/node_modules/@xhmm/wxapp/wxapi.d.ts' />`(注：此处是`wxapi.d.ts`而不是`wxapp.d.ts`)
3. **如果你只想要使用“弱版本”，则步骤到此结束，若想使用“强版本”，请继续下面的步骤**
3. 由于小程序不会引入`node_modules`下的文件(即使你写成相对路径也不行)，因此我们需要手动移动`@xhmm/wxapp`目录下的`wxapp.ts`文件(注：不是`wxapi.d.ts`)，把它放在自己的开发目录下，比如`libs/wxapp.ts`
4. 开始使用(“强版本”使用示例)：
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
    // 下面是使用自定义组件的示例
    import {CComponent, createComponent} from 'path/to/wxapp'
    interface IData {
        a: string
    }
    interface IProps {
        b:number
    }
    class Component extends CComponet<IProps,IData> {

    }
    // new Compoent的参数一对应小程序Component文档的properties的内容，所以传值的时候需要注意下格式匹配哦
    createComponent(new Component({b:Number},{a:'hello'}))
    ```

---


##### 注意事项
1. 使用“弱版本”时，只需引入声明文件，其他写法和原生一致，无额外限制
1. 使用“强版本”时，你可以继续在page/app中直接调用Page({})/App({})而不使用createPage/createApp ，但此时你的类名就需要改一下了，不要和`Page/App`重名
1. (题外话)imort文件时，路径一定要指定到具体ts文件的名字，因为微信并不遵循ts/node的那种模块引用规则


#### 后言
如有任何问题，请issue区讨论

