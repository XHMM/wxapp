/*均以Promise格式，无success,fail,complete的声明*/

declare namespace wx {
  const cloud: IClientCloud;

  interface IClientCloud {
    init(options?:{
      env?: string | {database:string,storage:string,functions:string}
      traceUser?:boolean
    }):void
    database(options?:{env?:string}):IDatabase
    collection(name:string):ICollection


    uploadFile(options: {
      filePath:string,
      cloudPath:string,
      header?:any
    }):Promise<{fileID:string, statusCode:number}>
    // 如果请求参数中带有 success/fail/complete 回调中的任一个，则会返回一个 uploadTask 对象
    uploadFile(options: {
      filePath:string,
      cloudPath:string,
      header?:any,
      success(res:{fileID:string, statusCode:number}):void,
      fail?(error:{errCode:number, errMsg:string}):void,
      complete?():void
    }):IUploadTask
    downloadFile(options: {
      fileID:string
    }):Promise<{tempFilePath:string, statusCode:number}>
    downloadFile(options: {
      fileID:string
      success(res:{tempFilePath:string, statusCode:number}):void,
      fail?(error:{errCode:number, errMsg:string}):void,
      complete?():void
    }):IUploadTask
    getTempFileURL(options:{
      fileList:string[] }):Promise<{fileList:{fileID:string,tempFileURL:string,status:number,errMsg:string}[]}>
    deleteFile(options:{fileList:string[]}):Promise<{fileID:string,status:number, errMsg:string}[]>
    callFunction(options:{
      name:string,data?:any,config?:any
    }):Promise<{errMsg:string,result:string,requestID:string}>
  }
  interface IUploadTask {
    onProgressUpdate(res:{progress:number,totalBytesSent:number,totalBytesExpectedToSend:number}):void
    abort():void
  }
  interface IDatabase {
    command: ICommand
    serveDate(options:{offset:number}): IServerDate
    Geo:IGeo
  }
  interface IGeo {
    Point(longitude:number, latitude:number):IPoint
  }
  interface IPoint {

  }
  interface ICommand {
    eq(value:any):ICommand
    neq(value:any):ICommand
    lt(value:number):ICommand
    lte(value:number):ICommand
    gt(value:number):ICommand
    gte(value:number):ICommand
    in(values:any[]):ICommand
    nin(values:any[]):ICommand
    and(commands:any):void
    or(commands:any):void
    set(value:any):ICommand
    remove():ICommand
    inc(value:number):ICommand
    mul(value:number):ICommand
    push(values:any[]):ICommand
    pop(values:any[]):ICommand
    shift(values:any[]):ICommand
    unshift(values:any[]):ICommand

  }
  interface IServerDate {

  }

  interface ICollectionAndIQueryCommon {
    get():Promise<any[]>
    count():Promise<{total:number}>
    orderBy(fieldName:string, order:'asc'|'desc'):ICollection |IQuery
    limit(max:number):ICollection|IQuery
    skip(offset:number):ICollection|IQuery
    field(definition:any):ICollection|IQuery|IDocument
    update(data : {data:any}):Promise<{stats:{updated:number}}>
  }
  interface ICollection extends ICollectionAndIQueryCommon{
    doc(id:string|number):IDocument
    add(data: {data:any}):Promise<{_id:string}>
    where(rule:any):IQuery

  }
  interface IQuery extends ICollectionAndIQueryCommon {

  }


  interface IDocument {
    get():Promise<{data:any}>
    update({data} : {data:any}):Promise<{stats:{updated:1|0}}>
    set({data} : {data:any}):Promise<{_id:string|number, stats:{updated:1|0,created:1|0}}>
    remove():Promise<{stats:{removed:1|0}}>
  }


}