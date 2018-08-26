interface IndexData {
  [key: string]: any
}
interface IOnLaunchShowOptions {
  path: string
  query: IndexData
  scene: number
  shareTicket: string
  referrerInfo: {
    appId: string
    extraData: IndexData
  }
}
interface IOnPageNotFoundOptions {
  path: string
  query: IndexData
  isEntryPage: boolean
}
/**
 * @deprecated
 * */
interface INodesRef {
  boundingClientRect(
    cb?: (
      rect: {
        id: string
        dataset: object
        left: number
        right: number
        top: number
        bottom: number
        width: number
        height: number
      }
    ) => void
  ): ISelectorQuery
  scrollOffset(
    cb?: (
      res: {
        id: string
        dataset: object
        scrollLeft: number
        scrollTop: number
      }
    ) => void
  ): ISelectorQuery
  fields(fields: {
    id?: boolean
    dataset?: boolean
    rect?: boolean
    size?: boolean
    scrollOffset?: boolean
    properties?: string[]
    computedStyle?: string[]
  })
}
/**
 * @deprecated
 * */
interface ISelectorQuery {
  in(component: ISelectorQuery): void
  select(selector: string): INodesRef
  selectAll(selector: string): INodesRef
  selectViewport(): INodesRef
  exec(cb?): void
}
export class CApp<D = {}> {
  public data: D // app的data是可修改的
  constructor(globalData?: D) {
    for (const key in globalData) {
      if (globalData.hasOwnProperty(key)) {
        // @ts-ignore
        this[key] = globalData[key]
      }
    }
  }
  public onLaunch(options?: IOnLaunchShowOptions): void {}
  public onShow(options?: IOnLaunchShowOptions): void {}
  public onHide(): void {}
  public onError(msg: string): void {}
  public onPageNotFound(options?: IOnPageNotFoundOptions): void {}
}
export class CPage<D = {}> {
  public data: Readonly<D>
  constructor(data?: Readonly<D>) {
    this.data = data
  }
  public setData(data: Partial<Readonly<D>>, callback?: () => void) {
    // @ts-ignore
    this.setData(data, callback)
  }
  public onLoad(options?: IndexData): void {}
  public onReady(): void {}
  public onShow(): void {}
  public onHide(): void {}
  public onUnload(): void {}
  public onPullDownRefresh(): void {}
  public onReachBottom(): void {}
  public onShareAppMessage(options: { title: string; path: string }): void {}
  public onPageScroll(options?: { scrollTop: number }): void {}
  public onTabItemTap(item: {
    index: any
    pagePath: string
    text: string
  }): void {}
}
/**
 * @deprecated
 * */
export class CComponent<P={}, D={}> {
  is: string
  id: string
  dataset: string
  public properties: Readonly<P>
  data: Readonly<D>

  methods: any
  behaviors: string[]
  relations: any
  externalClasses: string[]
  options: any
  lifetimes?:any;
  pageLifetimes?:any;
  definitionFilter?: (defFields?:any,definitionFilterArr?:any[])=>void;

  constructor(properties?: P, data?: D) {
    this.properties = properties
    this.data = data
  }
  setData(data: Partial<Readonly<P> & Readonly<D>>): void {
    // 小程序的Component无法传入自定义方法(自定义方法都是写在methods属性里的)，所以因此此处写成这种形式不会引发无限递归，因为小程序会清除掉所有的外来方法，所以这么写既是安全的，也能继续起类型提示的作用
    // @ts-ignore
    this.setData(data)
  }
  _hasBehavior(behavior: any): boolean {
    // @ts-ignore
    return this.hasBehavior(behavior)
  }
  _triggerEvent(
    name: string,
    detail: any,
    options: { bubbles: boolean; composed: boolean; capturePhase: boolean }
  ) {
    // @ts-ignore
    this.triggerEvent(name, detail, options)
  }
  _createSelectorQuery(): ISelectorQuery {
    // @ts-ignore
    return this.createSelectorQuery()
  }
  _selectComponent(selector: string): any {
    // @ts-ignore
    return this.selectComponent(selector)
  }
  _selectAllComponents(selector: string): any[] {
    // @ts-ignore
    return this.selectAllComponent(selector)
  }
  _getRelationNodes(relationKey: string): any {
    // @ts-ignore
    return this.getRelationNodes(relationKey)
  }

  created(): void {}
  attached(): void {}
  ready(): void {}
  moved(): void {}
  detached(): void {}
}

function collect(instance: any): any {
  const temp = {}
  for (const key in instance) {
    if (key === 'constructor') {
    } // 收集后的对象里不能有constructor函数，否则会报错cannot assign readonly constructor to #<xx>
    else if (key === 'setData') {
    } // 受component的启发，见CComponent注释
    else temp[key] = instance[key]
  }
  return temp
}
export function createApp(app: InstanceType<typeof CApp>): void {
  // @ts-ignore
  App(collect(app))
}
export function createPage(page: InstanceType<typeof CPage>): void {
  // @ts-ignore
  Page(collect(page))
}
/**
 * @deprecated
 * */
export function createComponent(component: InstanceType<typeof CComponent>): void {
  // @ts-ignore
  Component(collect(component))
}
export function getGlobalApp<D>(options:{allowDefault?:boolean}): CApp<D> {
  // @ts-ignore
  return getApp(options)
}
declare function getCurrentPages(): Array<InstanceType<typeof CPage>>
declare function getPhoneNumber(e?: any): void
