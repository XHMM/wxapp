### 说明
这是微信小程序的声明文件，目前对应基础库版本为`2.2.1`，该声明文件无注释，因此使用时请参考[官网文档](https://developers.weixin.qq.com/miniprogram/dev/api/)。注：即将废弃API以及不再维护AP未包含在内

### 使用
#### v1.x版本使用指南(单纯做api的提示)
1. `npm i @xhmm/wxapp@v1`
2. 在`app.ts`上方加入`/// <reference path='/path/to/node_modules/@xhmm/wxapp/wxapp.d.ts' />`

    ```
    // 你可以为page页面加入部分的data类型检测，由于小程序的自身函数调用方式，`setData`方法无法像`tsx`的`setState`那样被类型检查(若想使用这一强大功能，请参考下方v2版本)

    // pages/index/index.ts
    type IData ={
        name:string
    }
    Page<IData>({
        data: {
            name: 123 // ts error
        }
        onHide(){
            this.setData({
                age:11 // ts不会检查该方法，故不会报错
            })
        }
    })
    // 尾部注释：Page的泛型参数可加可不加
    ```

    ```
    // 当你在app.ts中声明了自定义变量(称之为`全局变量`)时，以下写法可实现在page页面中对全局变量的使用做语法检测

    // app.ts
    // 请export我，因为page页面要用
    export interface IGlobalData {
        isUpdated: boolean
    }
    const initialGlobalData: IGlobalData = {
        isUpdated: false
    }
    App({
        ...initialGlobalData,
        onLaunch() {}
    })

    // pages/index/index.ts
    const app = getApp<IGlobalData>()
    Page({
        onHide(){
            app.isUpdated = true // 会触发类型提示
            app.isGood = false // ts error
        }
    })
    // 尾部注释：getApp的泛型参数必须加上，以确保全局变量的正确使用，当然你可以传入any来取消检查(不建议)
    ```
---

#### v2.x版本使用指南
##### 该版本极大的强化了类型提示，但在写法上会和原生有所出入，使用步骤如下
1. `npm i @xhmm/wxapp@v2` 或 `npm i@xhmm/wxapp@latest`
2. 在`app.ts`上方加入`/// <reference path='/path/to/node_modules/@xhmm/wxapp/wxapi.d.ts' />`(注：此处是`wxapi.d.ts`而不是`wxapp.d.ts`)
3. 由于小程序不会引入`node_modules`下的文件引用(即使你写成相对路径也不行)，因此我们需要手动移动`@xhmm/wxapp`目录下的`wxapp.ts`文件(注：不是`wxapi.d.ts`)，把它放在自己的开发目录下，比如`libs/wxapp.ts`
4. 开始使用：
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
    import {CPage,createPage} from 'path/to/wxapp'
    interface IData {
        a:number
    }
    // 请传入泛型参数，否则不会类型检测setData
    class Page extends CPage<IData> {
        onReady() {
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

##### 注意事项
1. 和小程序预制函数重名的函数不要写成箭头函数形式，比如生命周期函数，滚动页面函数之类：
    ```
    // 错误，ts会报错(虽然可以运行)
    class App extends CApp<IGlobalData> {
        onLaunch=()=>{}
    }
    // 正确
    class App extends CApp<IGlobalData> {
        onLaunch(){}
        customMethod1=()=>{}
        customMethod2(){}
    }
    ```
1. 你可以继续使用Page({})/App({}) ，但不要和上述写法同时使用
1. (题外话)imort文件时，路径一定要指定到具体ts文件的名字，因为微信并不遵循ts/node的那种模块引用规则


#### 两者版本的共同点
1. `.d.ts`声明文件的内容是一致的，只是命名不同了。它将始终和官网文档保持一致，何时停止更新？等到官方声明文件发布或作者出了什么问题..

#### 后言
如有任何问题，请issue区讨论

