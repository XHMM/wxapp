/*
  ********************  Progress ****************************
* [备注：即将废弃API以及不再维护AP未列举在此I]
* 官方API列表：https://developers.weixin.qq.com/miniprogram/dev/api/
*
* 最新更新：2018年6月24日
* 日志：
*   1.已加入2.1.0新增api并新增或更新了日志列出的api
*
* 网络√
*   发起请求√
*   上传，下载√
*   WebSocket√
* 媒体√
*   图片√
*   录音√
*   录音管理√
*   音频播放控制√
*   音乐播放控制√
*   背景音频播放管理√
*   音频组件控制√
*   视频√
*   视频组件控制√
*   相机组件控制√
*   实时音视频√
*   动态加载字体√
* 文件√
* 数据缓存√
* 位置√
*   获取位置√
*   查看位置√
*   地图组件控制√
* 设备
*   系统信息√
*   网络状态√
*   加速度计√
*   罗盘√
*   拨打电话√
*   扫码√
*   剪贴板√
*   蓝牙
*   iBeacon
*   屏幕亮度
*   用户截屏事件√
*   振动√
*   手机联系人√
*   Wi-Fi
* 界面√
*   交互反馈√
*   设置导航条√
*   设置tabBar√
*   设置窗口背景
*   设置置顶信息√
*   导航√
*   动画√
*   位置√
*   绘图√ [2018-6-11发现 shadowBlur shadowColor shadowOffsetX shadowOffsetY transform无链接]
*   下拉刷新√
*   WXML节点信息√
*   WXML节点布局相交状态√
* 第三方平台√
* 开放接口
*   登录√
*   授权√
*   用户信息√
*   微信支付√
*   模板消息×
*   客服消息×
*   转发√
*   获取二维码×
*   收货地址√
*   卡券√
*   设置√
*   微信运动√
*   打开小程序√
*   打开APP×
*   获取发票抬头√
*   生物认证√
*   附近×
*   插件管理×
*   内容安全×
* 数据√
* 更新√
* 多线程√
* 监控√
*   监控数据上报√
* 调试接口√
*   打开/关闭调试√
* 日志√
*
* */

/*
类型命名规范：
  options的参数名为XxxOptions
  success的参数名类型为 XxxResult
*/
declare namespace wx {
  interface IndexData {
    [key: string]: any;
  }
  export interface BaseOptions {
    success?: (res?: any) => void;
    fail?: (err?: any) => void;
    complete?: () => void;
  }
  export interface ShareOptions {
    title?: string;
    desc?: string;
    path?: string;
  }

  /*-----------------------------------网络-----------------------------------*/
  //--------------发起请求
  export interface RequestResult {
    data: IndexData;
    statusCode: number;
    header: IndexData;
  }
  export interface RequestOptions extends BaseOptions {
    url: string;
    data?: IndexData;
    header?: IndexData;
    method?: string;
    dataType?: string;
    responseType?: string;
    success?: (res?: RequestResult) => void;
  }
  interface RequestTask {
    abort: () => void;
  }
  export function request(options: RequestOptions): RequestTask;
  //--------------上传，下载
  export interface UploadFileResult {
    data: string;
    statusCode: number;
  }
  export interface UploadFileOptions extends BaseOptions {
    url: string;
    filePath: string;
    name: string;
    header?: IndexData;
    formData?: IndexData;
    success?: (res?: UploadFileResult) => void;
  }
  interface UploadTask {
    onProgressUpdate: () => {
      progress: number;
      totalBytesSent: number;
      totalBytesExpectedToSend: number;
    };
    abort: () => void;
  }
  export interface DownloadFileResult {
    tempFilePath: string;
    statusCode: number;
  }
  export interface DownloadFileOptions extends BaseOptions {
    url: string;
    header?: IndexData;
    success?: (res?: DownloadFileResult) => void;
  }
  interface DownloadTask {
    onProgressUpdate: () => {
      progress: number;
      totalBytesWritten: number;
      totalBytesExpectedToWrite: number;
    };
    abort: () => void;
  }
  export function uploadFile(options: UploadFileOptions): void;
  export function downloadFile(options: DownloadFileOptions): DownloadTask;
  //--------------WebSocket
  export interface ConnectSocketOptions extends BaseOptions {
    url: string;
    header?: IndexData;
    method?: string;
    protocols?: string[];
  }
  export interface SendSocketMessageOptions extends BaseOptions {
    data: string | any[];
  }
  interface CloseSocketOptions extends BaseOptions {
    code?: number;
    reason?: string;
  }
  interface SocketTaskSendOptions extends BaseOptions {
    data: string | any[];
  }
  interface SocketTaskCloseOptions extends BaseOptions {
    code?: number;
    reason?: string;
  }
  interface SocketTask {
    send: (options: SocketTaskSendOptions) => void;
    close: (options: SocketTaskCloseOptions) => void;
    onOpen: (callback: (res?: { header: IndexData }) => void) => void;
    onError: (callback: (res?: { errMsg: string }) => void) => void;
    onMessage: (callback: (res: { data: string | any[] }) => void) => void;
  }
  export function connectSocket(options: ConnectSocketOptions): void;
  export function onSocketOpen(
    callback: (res?: { header: IndexData }) => void
  ): void;
  export function onSocketError(callback: (error?: any) => void): void;
  export function sendSocketMessage(options: SendSocketMessageOptions): void;
  export function onSocketMessage(
    callback: (res?: { data: string | any[] }) => void
  ): void;
  export function closeSocket(options: CloseSocketOptions): void;
  export function onSocketClose(callback: (res?: any) => void): void;
  /*--------------------------------网络END-----------------------------------------------*/

  /* ---------------------------------- 媒体API列表 ----------------------------------*/
  //-------图片
  export interface ChooseImageResult {
    tempFilePaths: string[];
    tempFiles: WXFile[];
  }
  interface WXFile {
    path: string;
    size: number;
  }
  export interface ChooseImageOptions extends BaseOptions {
    count?: number;
    sizeType?: string[];
    sourceType?: string[];
    success?: (res?: ChooseImageResult) => void;
  }
  export interface PreviewImageOptions extends BaseOptions {
    current?: string;
    urls: string[];
  }
  export interface GetImageInfoResult {
    width: number;
    height: number;
    path: string;
    orientation:
      | 'up'
      | 'down'
      | 'left'
      | 'right'
      | 'up-mirrored'
      | 'down-mirrored'
      | 'left-mirrored'
      | 'right-mirrored';
    type: string;
  }
  export interface GetImageInfoOptions extends BaseOptions {
    src: string;
    success?: (res?: GetImageInfoResult) => void;
  }
  interface SaveImageToPhotosAlbumOptions extends BaseOptions {
    filePath: string;
    success: (res?: SaveImageToPhotosAlbumResult) => void;
  }
  interface SaveImageToPhotosAlbumResult {
    errMsg: string;
  }
  export function previewImage(options: PreviewImageOptions): void;
  export function chooseImage(options: ChooseImageOptions): void;
  export function getImageInfo(options: GetImageInfoOptions): void;
  function saveImageToPhotosAlbum(options: SaveImageToPhotosAlbumOptions);
  //-------录音
  export interface StartRecordResult {
    tempFilePath: string;
  }
  export interface StartRecordOptions extends BaseOptions {
    success?: (res?: StartRecordResult) => void;
  }
  export function startRecord(options: StartRecordOptions): void;
  export function stopRecord(): void;
  //-------录音管理
  interface RecorderManagerStartOptions {
    duration: number;
    sampleRate: 8000 | 16000 | 44100;
    numberOfChannels: 1 | 2;
    encodeBitRate: number;
    format: 'acc' | 'mp3';
    audioSource: string;
  }
  interface RecorderManager {
    start: (options?: RecorderManagerStartOptions) => void;
    pause: () => void;
    resume: () => void;
    stop: (callback?: ({ tempFilePath: string }) => void) => void;
    onStart: (callback?: () => void) => void;
    onStop: (callback?: () => void) => void;
    onFrameRecorded: (
      callback?: ({ frameBuffer: any, isLastFrame: boolean }) => void
    ) => void;
    onError: (callback?: ({ errMsg: string }) => void) => void;
  }
  function getRecorderManager(): RecorderManager;
  //-------音频播放控制
  export interface PlayVoiceOptions extends BaseOptions {
    filePath: string;
    duration?: number;
  }
  export function playVoice(options: PlayVoiceOptions): void;
  export function pauseVoice(): void;
  export function stopVoice(): void;
  //-------音乐播放控制
  export interface GetBackgroundAudioPlayerStateResult {
    duration: number;
    currentPosition: number;
    status: 2 | 1 | 0;
    downloadPercent: number;
    dataUrl: string;
  }
  export interface GetBackgroundAudioPlayerStateOptions extends BaseOptions {
    success?: (res?: GetBackgroundAudioPlayerStateResult) => void;
  }
  export interface PlayBackgroundAudioOptions extends BaseOptions {
    dataUrl: string;
    title?: string;
    coverImgUrl?: string;
  }
  export interface SeekBackgroundAudioOptions extends BaseOptions {
    position: number;
  }
  export function getBackgroundAudioPlayerState(
    options?: GetBackgroundAudioPlayerStateOptions
  ): void;
  export function playBackgroundAudio(
    options: PlayBackgroundAudioOptions
  ): void;

  export function pauseBackgroundAudio(): void;
  export function seekBackgroundAudio(
    options: SeekBackgroundAudioOptions
  ): void;
  export function stopBackgroundAudio(): void;
  export function onBackgroundAudioPlay(callback: (res?: any) => void): void;
  export function onBackgroundAudioPause(callback: (res?: any) => void): void;
  export function onBackgroundAudioStop(callback: (res?: any) => void): void;
  //-------背景音乐播放管理
  interface BackgroundAudioManager {
    readonly duration: number;
    readonly currentTime: number;
    readonly paused: boolean;
    src: string;
    startTime: number;
    readonly buffered: number;
    title: string;
    epname: string;
    singer: string;
    coverImageUrl: string;
    webUrl: string;
    protocol: string;
    play: () => void;
    pause: () => void;
    stop: () => void;
    seek: (position: number) => void;
    onCanplay: (callback: () => void) => void;
    onPlay: (callback: () => void) => void;
    onPause: (callback: () => void) => void;
    onStop: (callback: () => void) => void;
    onEnded: (callback: () => void) => void;
    onTimeUpdate: (callback: () => void) => void;
    onPrev: (callback: () => void) => void;
    onNext: (callback: () => void) => void;
    onError: (callback: (res?: any) => void) => void;
    onWaiting: (callback: () => void) => void;
  }
  function getBackgroundAudioManager(): BackgroundAudioManager;
  //-------音频组件控件
  interface InnerAudioContext {
    src: string;
    startTime: number;
    autoplay: boolean;
    loop: boolean;
    obeyMuteSwitch: boolean;
    readonly duration: number;
    readonly currentTime: number;
    readonly paused: boolean;
    readonly buffered: number;
    volume: number;
    play: () => void;
    pause: () => void;
    stop: () => void;
    seek: (position: number) => void;
    destroy: () => void;
    onCanplay: (callback: () => void) => void;
    onPlay: (callback: () => void) => void;
    onPause: (callback: () => void) => void;
    onStop: (callback: () => void) => void;
    onEnded: (callback: () => void) => void;
    onTimeUpdate: (callback: () => void) => void;
    onError: (callback: (res?: any) => void) => void;
    onWaiting: (callback: () => void) => void;
    onSeeking: (callback: () => void) => void;
    offCanplay: (callback: () => void) => void;
    offPlay: (callback: () => void) => void;
    offPause: (callback: () => void) => void;
    offStop: (callback: () => void) => void;
    offEnded: (callback: () => void) => void;
    offTimeUpdate: (callback: () => void) => void;
    offError: (callback: () => void) => void;
    offWaiting: (callback: () => void) => void;
    offSeeking: (callback: () => void) => void;
    offSeeked: (callback: () => void) => void;
  }
  interface GetRecorderManagerResult {
    audioSources: string[];
  }
  interface GetRecorderManagerOptions extends BaseOptions {
    success: (res?: GetRecorderManagerResult) => void;
  }
  function createInnerAudioContext(): InnerAudioContext;
  function getRecorderManager(): void;
  //-------视频
  export interface ChooseVideoResult {
    tempFilePath: string;
    duration: number;
    size: number;
    height: number;
    width: number;
  }
  export interface ChooseVideoOptions extends BaseOptions {
    sourceType?: string[];
    compressed?: boolean;
    maxDuration?: number;
    success?: (res?: ChooseVideoResult) => void;
  }
  interface SaveVideoToPhotosAlbumResult {
    errMsg: string;
  }
  interface SaveVideoToPhotosAlbumOptions extends BaseOptions {
    filePath: string;
    success: (res?: SaveVideoToPhotosAlbumResult) => void;
  }
  export function chooseVideo(options: ChooseVideoOptions): void;
  function saveVideoToPhotosAlbum(): void;

  export interface AudioContext {
    setSrc(src: string): void;
    play(): void;
    pause(): void;
    seek(position: number): void;
  }
  //-------视频组件控制
  export interface VideoContext {
    play(): void;
    pause(): void;
    seek(position: number): void;
    sendDanmu(danmu: { text: string; color: string }): void;
    playbackRate: (rate: 0.5 | 0.8 | 1.0 | 1.2 | 1.25 | 1.5) => void;
    requestFullScreen: () => void;
    exitFullScreen: () => void;
    showStatusBar: () => void;
    hideStatusBar: () => void;
  }
  export function createVideoContext(
    videoId: string,
    instance: any
  ): VideoContext;
  //-------相机组件控制
  interface CameraContextTakePhotoOptions extends BaseOptions {
    quality?: string;
    success: (res?: { tempImagePath }) => void;
  }
  interface CameraContextStartRecordOptions extends BaseOptions {
    timeoutCallback: (
      res?: { tempThumbPath: string; tempVideoPath: string }
    ) => void;
  }
  interface CameraContextStopRecordOptions extends BaseOptions {
    success: (res?: { tempThumbPath: string; tempVideoPath: string }) => void;
  }
  interface CameraContext {
    takePhoto: (
      callback: (options?: CameraContextTakePhotoOptions) => void
    ) => void;
    startRecord: (
      callback: (options?: CameraContextStartRecordOptions) => void
    ) => void;
    stopRecord: (
      callback: (options?: CameraContextStopRecordOptions) => void
    ) => void;
  }
  function createCameraContext(instance: any): CameraContext;
  //--------实时音视频
  interface RequestFullScreenOptions extends BaseOptions {
    direction: 0 | 90 | -90;
  }
  interface LivePlayerContext {
    play(options?: BaseOptions): void;
    stop(options?: BaseOptions): void;
    mute(options?: BaseOptions): void;
    pause(options?: BaseOptions): void;
    resume(options?: BaseOptions): void;
    requestFullScreen(options: RequestFullScreenOptions): void;
    exitFullScreen(): void;
  }
  interface LivePusherContext {
    start(options?: BaseOptions): void;
    stop(options?: BaseOptions): void;
    pause(options?: BaseOptions): void;
    resume(options?: BaseOptions): void;
    switchCamera(options?: BaseOptions): void;
    snapshot(options?: BaseOptions): void;
    toggleTorch(options?: BaseOptions): void;
  }
  export function createLivePlayerContext(
    domId: string,
    instance: any
  ): LivePlayerContext;
  export function createLivePushContext(): LivePusherContext;
  //----------动态加载字体
  interface LoadFontFaceOptions extends BaseOptions {
    family: string;
    source: string;
    desc?: {
      style: 'normal' | 'italic' | 'oblique';
      weight:
        | 'normal'
        | 'bold'
        | 100
        | 200
        | 300
        | 400
        | 500
        | 600
        | 700
        | 800
        | 900;
      variant: 'normal' | 'small-caps' | 'inherit';
    };
  }
  export function loadFontFace(options: LoadFontFaceOptions): void;
  /*-------------------------媒体END----------------------*/

  /* --------------------------文件---------------------- */
  export interface SaveFileResult {
    savedFilePath: string;
  }
  export interface SaveFileOptions extends BaseOptions {
    tempFilePath: string;
    success?: (res?: SaveFileResult) => void;
  }
  export interface FileListItem {
    filePath: string;
    createTime: number;
    size: number;
  }
  export interface GetSavedFileListResult {
    errMsg: string;
    fileList: FileListItem[];
  }
  export interface GetSavedFileListOptions extends BaseOptions {
    success?: (res?: GetSavedFileListResult) => void;
  }
  export interface GetSavedFileInfoResult {
    errMsg: string;
    size: number;
    createTime: number;
  }
  export interface GetSavedFileInfoOptions extends BaseOptions {
    filePath: string;
    success?: (res?: GetSavedFileInfoResult) => void;
  }
  export interface RemoveSavedFileOptions extends BaseOptions {
    filePath: string;
  }
  export interface OpenDocumentOptions extends BaseOptions {
    filePath: string;
    fileType?: 'doc' | 'xls' | 'ppt' | 'pdf' | 'docx' | 'xlsx' | 'pptx';
  }
  export function saveFile(options: SaveFileOptions): void;
  export function getSavedFileList(options: GetSavedFileListOptions): void;
  export function getSavedFileInfo(options: GetSavedFileInfoOptions): void;
  export function removeSavedFile(options: RemoveSavedFileOptions): void;
  export function openDocument(options: OpenDocumentOptions): void;
  /* --------------------------文件END---------------------- */

  /* ---------------------------------- 数据缓存 ----------------------------------*/
  export interface SetStorageOptions extends BaseOptions {
    key: string;
    data: any;
  }
  export interface GetStorageResult {
    data: any;
  }
  export interface GetStorageOptions extends BaseOptions {
    key: string;
    success?: (res?: GetStorageResult) => void;
  }
  export interface GetStorageInfoResult {
    keys: string[];
    currentSize: number;
    limitSize: number;
  }
  export interface GetStorageInfoOptions extends BaseOptions {
    success?: (res?: GetStorageInfoResult) => void;
  }
  export interface RemoveStorageOptions extends BaseOptions {
    key: string;
  }
  export function setStorage(options: SetStorageOptions): void;
  export function setStorageSync(key: string, data: any): void;
  export function getStorage(options: GetStorageOptions): void;
  export function getStorageSync(key: string): any;
  export function getStorageInfo(options: GetStorageInfoOptions): void;
  export function getStorageInfoSync(): GetStorageInfoResult;
  export function removeStorage(options: RemoveStorageOptions): void;
  export function removeStorageSync(key: string): void;
  export function clearStorage(): void;
  export function clearStorageSync(): void;
  /* ---------------------------------- 数据缓存END ----------------------------------*/

  /*--------------------------------------- 位置---------------------------------------*/
  export interface Location {
    latitude: number;
    longitude: number;
  }
  export interface GetLocationResult extends Location {
    speed: number;
    accuracy: number;
    horizontalAccuracy: any;
  }
  export interface GetLocationOptions extends BaseOptions {
    type?: string;
    altitude?: boolean;
    success?: (res?: GetLocationResult) => void;
  }
  export interface ChooseLocationResult extends Location {
    name: string;
    address: string;
  }
  export interface ChooseLocationOptions extends BaseOptions {
    success?: (res?: ChooseLocationResult) => void;
  }
  export interface OpenLocationOptions extends BaseOptions, Location {
    scale?: number;
    name?: string;
    address?: string;
  }
  export interface GetCenterLocationOptions extends BaseOptions {
    success?: (res?: Location) => void;
  }
  export interface MapContext {
    getCenterLocation(options: GetCenterLocationOptions): void;
    moveToLocation(): void;
  }
  //---------获取位置
  export function getLocation(options: GetLocationOptions): void;
  //----------查看位置
  export function chooseLocation(options: ChooseLocationOptions): void;
  export function openLocation(options: OpenLocationOptions): void;
  //----------地图组件控制
  export function createMapContext(mapId: string): MapContext;

  /*--------------------------------------- 位置END---------------------------------------*/

  /* ---------------------------------- 设备 ---------------------------------- */
  //--------------系统信息
  export interface GetSystemInfoResult {
    brand: string;
    model: string;
    pixelRadio: number;
    screenWith: number;
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
    statusBarHeight: number;
    language: string;
    version: string;
    system: string;
    platform: string;
    fontSizeSetting: number;
    SDKVersion: string;
  }

  export interface GetSystemInfoOptions extends BaseOptions {
    success?: (res?: GetSystemInfoResult) => void;
  }
  export function getSystemInfo(options: GetSystemInfoOptions): void;
  export function getSystemInfoSync(): GetSystemInfoResult;
  function canIUse(param: string): boolean;
  function onMemoryWarning(callback: (res: { level: number }) => void): void;
  //---------------网络状态
  type NetworkType = '2g' | '3g' | '4g' | 'wifi' | 'unknown' | 'none';
  export interface GetNetworkTypeResult {
    networkType: NetworkType;
  }
  export interface GetNetworkTypeOptions extends BaseOptions {
    success?: (res?: GetNetworkTypeResult) => void;
  }
  export function getNetworkType(options: GetNetworkTypeOptions): void;
  function onNetworkStatusChange(
    callback: (res?: { isConnected: boolean; netWorkType: NetworkType }) => void
  ): void;
  //----------------加速度计
  interface StartAccelerometerOptions extends BaseOptions {
    interval?: 'game' | 'ui' | 'normal';
  }
  export function onAccelerometerChange(
    callback: (
      res?: {
        x: number;
        y: number;
        z: number;
      }
    ) => void
  ): void;
  function startAccelerometer(options?: StartAccelerometerOptions): void;
  function stopAccelerometer(options?: BaseOptions): void;
  //---------------罗盘
  export function onCompassChange(
    callback: (res?: { direction: number }) => void
  ): void;
  function startCompass(options?: BaseOptions): void;
  function stopCompass(options?: BaseOptions): void;
  //------------------拨打电话
  export interface MakePhoneCallOptions {
    phoneNumber: number;
  }
  export function makePhoneCall(options: MakePhoneCallOptions): void;
  //-----------扫码
  export interface ScanCodeResult {
    result: string;
    scanType: string;
    charSet: string;
    path: string;
    rawData: string;
  }
  type ScanType = 'qrCode' | 'barCode' | 'datamatrix' | 'pdf417';
  export interface ScanCodeOptions extends BaseOptions {
    onlyFromCamera?: boolean;
    scanType?: ScanType[];
    success?: (res?: ScanCodeResult) => void;
  }
  export function scanCode(options: ScanCodeOptions): void;
  //-----------------剪贴板
  interface SetClipboardDataOptions extends BaseOptions {
    data: string;
  }
  interface GetClipboardDataResult {
    data: string;
  }
  interface GetClipboardDataOptions extends BaseOptions {
    success: (res?: GetClipboardDataResult) => void;
  }
  function setClipboardData(options?: SetClipboardDataOptions): void;
  function getClipboardData(options?: GetClipboardDataOptions): void;
  //--------------------蓝牙
  //-------------------------iBeacon
  //-------------------------屏幕亮度
  //-------------------------用户截屏事件
  function onUserCaptureScreen(callback?: (res?: any) => void): void;
  //-------------------------振动
  function vibrateLong(options?: BaseOptions): void;
  function vibrateShort(options?: BaseOptions): void;
  //-------------------------手机联系人
  interface AddPhoneContactOptions extends BaseOptions {
    photoFilePath?: string;
    nickName?: string;
    lastName?: string;
    middleName?: string;
    firstName: string;
    remark?: string;
    mobilePhoneNumber?: string;
    weChatNumber?: string;
    addressCountry?: string;
    addressStreet?: string;
    addressPostalCode?: string;
    organization?: string;
    title?: string;
    workFaxNumber?: string;
    workPhoneNumber?: string;
    hostNumber?: string;
    email?: string;
    url?: string;
    workAddressCountry?: string;
    workAddressState?: string;
    workAddressCity?: string;
    workAddressStreet?: string;
    workAddressPostalCode?: string;
    homeFaxNumber?: string;
    homePhoneNumber?: string;
    homeAddressCountry?: string;
    homeAddressState?: string;
    homeAddressCity?: string;
    homeAddressStreet?: string;
    homeAddressPostalCode?: string;
  }
  function addPhoneContact(options?: AddPhoneContactOptions): void;
  //-------------------------NFC
  //-------------------------Wi-Fi

  /* ---------------------------------- 设备END ---------------------------------- */
  /* ---------------------------------- 界面----------------------------------*/
  //-------------交互反馈
  export interface ShowToastOptions extends BaseOptions {
    title: string;
    icon?: 'none' | 'success' | 'loading'; //[2018年6月7日00:21:36]
    duration?: number;
    mask?: boolean;
  }
  export interface ShowLoadingOptions extends BaseOptions {
    title: string;
    mask?: boolean;
  }
  export interface ShowModalResult {
    confirm: boolean;
    cancel: boolean;
  }
  export interface ShowModalOptions extends BaseOptions {
    title: string;
    content: string;
    showCancel?: boolean;
    cancelText?: string;
    cancelColor?: string;
    confirmText?: string;
    confirmColor?: string;
    success?: (res?: ShowModalResult) => void;
  }
  export interface ShowActionSheetResult {
    cancel: boolean;
    tapIndex: number;
  }
  export interface ShowActionSheetOptions extends BaseOptions {
    itemList: string[];
    itemColor?: string;
    success?: (res?: ShowActionSheetResult) => void;
  }
  export function showToast(options: ShowToastOptions): void;
  export function showLoading(options: ShowLoadingOptions): void;
  export function hideToast(): void;
  export function hideLoading(): void;
  export function showModal(options: ShowModalOptions): void;
  export function showActionSheet(options: ShowActionSheetOptions): void;
  //----------设置导航条
  export interface SetNavigationBarTitleOptions extends BaseOptions {
    title: string;
  }
  export interface SetNavigationBarColorOptions extends BaseOptions {
    fontColor: '#ffffff' | '#000000';
    backgroundColor: string;
    animation: {
      duration: number;
      timingFunc: string;
    };
  }
  export function setNavigationBarTitle(
    options: SetNavigationBarTitleOptions
  ): void;
  export function showNavigationBarLoading(): void;
  export function hideNavigationBarLoading(): void;
  export function setNavigationBarColor(
    options: SetNavigationBarColorOptions
  ): void;
  //-----------设置tabBar
  export interface SetTabBarBadgeOptions extends BaseOptions {
    index: number;
    text: string;
  }
  export interface RemoveTabBarBadgeOptions extends BaseOptions {
    index: number;
  }
  export interface ShowTabBarRedDotOptions extends BaseOptions {
    index: number;
  }
  export interface HideTabBarRedDotOptions extends BaseOptions {
    index: number;
  }
  export interface SetTabBarStyleOptions extends BaseOptions {
    color: string;
    selectedColor: string;
    backgroundColor: string;
    borderStyle: string;
  }
  export interface SetTabBarItemOptions {
    index: number;
    text: string;
    iconPath: string;
    selectedIconPath: string;
  }
  export interface ShowOrHideTabBarOptions {
    animation: boolean;
  }
  export function setTabBarBadge(options: SetTabBarBadgeOptions): void;
  export function removeTabBarBadge(options: RemoveTabBarBadgeOptions): void;
  export function showTabBarRedDot(options: ShowTabBarRedDotOptions): void;
  export function hideTabBarRedDot(options: HideTabBarRedDotOptions): void;
  export function setTabBarStyle(options: SetTabBarStyleOptions): void;
  export function setTabBarItem(options: SetTabBarItemOptions): void;
  export function showTabBar(options: ShowOrHideTabBarOptions): void;
  export function hideTabBar(options: ShowOrHideTabBarOptions): void;
  //-----------设置置顶信息
  interface SetTopBarOptions extends BaseOptions {
    text: string;
  }
  export function setTopBarText(options: SetTopBarOptions);
  //-----------导航
  export interface NavigateToOptions extends BaseOptions {
    url: string;
  }
  export function navigateTo(options: NavigateToOptions): void;
  export interface RedirectToOptions extends BaseOptions {
    url: string;
  }
  export function redirectTo(options: RedirectToOptions): void;
  export interface SwitchTabOptions extends BaseOptions {
    /**
     * 需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
     */
    url: string;
  }
  export function switchTab(options: SwitchTabOptions): void;
  export interface NavigateBackOptions {
    delta?: number;
  }
  export function navigateBack(options: NavigateBackOptions): void;
  interface RelaunchOptions extends BaseOptions {
    url: string;
  }
  export function reLaunch(options: RelaunchOptions): void;
  //--------------动画
  export interface Animation {
    step(options: AnimationOptions): void;
    export(): any;
    opacity(value: number): this;
    backgroundColor(color: string): this;
    width(value: number | string): this;
    height(value: number | string): this;
    top(value: number | string): this;
    left(value: number | string): this;
    bottom(value: number | string): this;
    right(value: number | string): this;
    rotate(value: number): this;
    rotateX(value: number): this;
    rotateY(value: number): this;
    rotateZ(value: number): this;
    rotate3d(x: number, y: number, z: number, a: number): this;
    scale(sx: number, sy?: number): this;
    scaleX(sx: number): this;
    scaleY(sy: number): this;
    scaleZ(sz: number): this;
    scale3d(sx: number, sy: number, sz: number): this;
    translate(tx: number, ty?: number): this;
    translateX(tx: number): this;
    translateY(ty: number): this;
    translateZ(tz: number): this;
    translate3d(tx: number, ty: number, tz: number): this;
    skew(ax: number, ay?: number): this;
    skewX(ax: number): this;
    skewY(ay: number): this;
    matrix(
      a: number,
      b: number,
      c: number,
      d: number,
      tx: number,
      ty: number
    ): this;
    matrix3d(
      a1: number,
      b1: number,
      c1: number,
      d1: number,
      a2: number,
      b2: number,
      c2: number,
      d2: number,
      a3: number,
      b3: number,
      c3: number,
      d3: number,
      a4: number,
      b4: number,
      c4: number,
      d4: number
    ): this;
  }
  export interface AnimationOptions {
    duration?: number;
    timingFunction?:
      | 'linear'
      | 'ease'
      | 'ease-in'
      | 'ease-in-out'
      | 'ease-out'
      | 'step-start'
      | 'step-end';
    delay?: number;
    transformOrigin?: string;
  }
  export function createAnimation(options?: AnimationOptions): Animation;

  //---------------绘图
  export interface CanvasContext {
    setFillStyle(color: string): void;
    fillStyle: string;
    setStrokeStyle(color: string): void;
    strokeStyle: string;
    setShadow(
      offsetX: number,
      offsetY: number,
      blur: number,
      color: string
    ): void;
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): void;
    createCircularGradient(x: number, y: number, r: number): void;
    addColorStop(stop: number, color: string): void;
    setLineWidth(lineWidth: number): void;
    lineWidth: number;
    setLineCap(lineCap: string): void;
    lineCap: 'butt' | 'round' | 'square';
    setLineJoin(lineJoin: string): void;
    lineJoin: 'bevel' | 'round' | 'miter';
    setLineDash(pattern: number[], offset: number): void;
    setMiterLimit(miterLimit: number): void;
    miterLimit: number;
    rect(x: number, y: number, width: number, height: number): void;
    fillRect(x: number, y: number, width: number, height: number): void;
    strokeRect(x: number, y: number, width: number, height: number): void;
    clearRect(x: number, y: number, width: number, height: number): void;
    fill(): void;
    stroke(): void;
    beginPath(): void;
    closePath(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    arc(
      x: number,
      y: number,
      r: number,
      sAngle: number,
      eAngle: number,
      counterclockwise?: boolean
    ): void;
    bezierCurveTo(
      cp1x: number,
      cp1y: number,
      cp2x: number,
      cp2y: number,
      x: number,
      y: number
    ): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    scale(scaleWidth: number, scaleHeight: number): void;
    rotate(rotate: number): void;
    translate(x: number, y: number): void;
    clip(): void;
    setFontSize(fontSize: number): void;
    fillText(text: string, x: number, y: number): void;
    setTextAlign(align: 'left' | 'center' | 'right'): void;
    textAlign: 'left' | 'center' | 'right';
    setTextBaseline(textBaseline: 'top' | 'bottom' | 'middle' | 'normal'): void;
    baseline: 'top' | 'bottom' | 'middle' | 'normal';
    drawImage(
      imageResource: string,
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    setGlobalAlpha(alpha: number): void;
    globalAlpha: number;
    save(): void;
    restore(): void;
    draw(callback?: () => void): void;
    draw(reserve: boolean, callback?: () => void): void;
    getActions(): any[];
    clearActions(): void;
    measureText(text: string): TextMetrics;
    globalCompositeOperation: string;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    strokeText(text: string, x: number, y: number, maxWidth: number): void;
    lineDashOffset: number;
    createPattern(image: string, repetition: string): void;
    font: string;
    setTransform(
      scaleX: number,
      skewX: number,
      skewY: number,
      scaleY: number,
      translateX: number,
      translateY: number
    ): void;
  }
  export function createCanvasContext(
    canvasId: string,
    componentInstance?: object
  ): CanvasContext;
  export function createContext(): CanvasContext;
  export interface DrawCanvasOptions {
    canvasId: string;
    actions: any[];
    reserve?: boolean;
  }
  export function drawCanvas(options: DrawCanvasOptions): void;
  export interface CanvasToTempFilePathOptions extends BaseOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    destWidth?: number;
    destHeight?: number;
    canvasId: string;
    fileType?: string;
    quality?: number;
  }
  export function canvasToTempFilePath(
    options: CanvasToTempFilePathOptions
  ): string;
  export interface CanvasGetImageData {
    errMsg: string;
    width: number;
    height: number;
    data: any[];
  }
  export interface CanvasGetImageDataOptions extends BaseOptions {
    canvasId: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    success?: (res?: CanvasGetImageData) => void;
  }
  export function canvasGetImageData(options: CanvasGetImageDataOptions): any[];
  export interface CanvasPutImageData extends BaseOptions {
    canvasId: string;
    data: any[];
    x: number;
    y: number;
    width: number;
    height: number;
  }
  export function canvasPutImageData(options: CanvasPutImageData): void;
  //-----------------下拉刷新
  export function stopPullDownRefresh(): void;
  //-------------WXML节点信息
  export interface NodesRefInterface {
    boundingClientRect(
      cb?: (
        rect: {
          id: string;
          dataset: object;
          left: number;
          right: number;
          top: number;
          bottom: number;
          width: number;
          height: number;
        }
      ) => void
    ): SelectorQueryInterface;
    scrollOffset(
      cb?: (
        res: {
          id: string;
          dataset: object;
          scrollLeft: number;
          scrollTop: number;
        }
      ) => void
    ): SelectorQueryInterface;
    fields(fields: {
      id?: boolean;
      dataset?: boolean;
      rect?: boolean;
      size?: boolean;
      scrollOffset?: boolean;
      properties?: string[];
      computedStyle?: string[];
    });
  }
  export interface SelectorQueryInterface {
    in(component: SelectorQueryInterface): void;
    select(selector: string): NodesRefInterface;
    selectAll(selector: string): NodesRefInterface;
    selectViewport(): NodesRefInterface;
    exec(cb?): void;
  }
  export function createSelectorQuery(): SelectorQueryInterface;
  //--------------WXML节点布局相交状态
  interface Margins {
    left: number;
    right: number;
    top: number;
    bottom: number;
  }
  interface IntersectionObserver {
    relativeTo: (selector: string, margins?: Partial<Margins>) => void;
    relativeToViewport: (margins?: Partial<Margins>) => void;
    observe: (
      targetSelector: string,
      callback?: {
        intersectionRatio: number;
        intersectionRect: Margins;
        boundingClientRect: Margins;
        relativeRect: Margins;
        time: number;
      }
    ) => void;
    disconnect: () => void;
  }
  interface CreateIntersectionObserverOptions {
    thresholds: number[];
    initialRatio: number;
    selectAll: boolean;
  }
  function createIntersectionObserver(
    instance?: any,
    options?: CreateIntersectionObserverOptions
  ): IntersectionObserver;
  /*--------------------------------界面END-----------------------------------------------*/

  /* ----------------------------第三方平台-------------------------------- */
  interface GetExtConfigResult {
    errMsg: string;
    extConfig: any;
  }
  interface GetExtConfigOptions extends BaseOptions {
    success: (res?: GetExtConfigResult) => void;
  }
  function getExtConfig(options?: GetExtConfigOptions): void;
  function getExtConfigSync(): { extConfig: any };
  /* ----------------------------第三方平台END-------------------------------- */

  /*---------------------------------- 开放接口----------------------------------*/
  //-----------登录
  export interface LoginResult {
    errMsg: string;
    code: string;
  }
  export interface LoginOptions extends BaseOptions {
    timeout?: number;
    success?: (res?: LoginResult) => void;
  }
  export interface CheckSessionOptions extends BaseOptions {}
  export function login(options: LoginOptions): void;
  export function checkSession(options: CheckSessionOptions): void;
  //----------授权
  export interface AuthorizeResult {
    errMsg: string;
  }
  export interface AuthorizeOptions extends BaseOptions {
    scope: string;
    success?: (res?: AuthorizeResult) => void;
  }
  export function authorize(options: AuthorizeOptions): void;
  //----------用户信息
  interface UserInfo {
    nickName: string;
    avatarUrl: string;
    gender: string;
    city: string;
    province: string;
    country: string;
    language: string;
  }
  export interface GetUserInfoResult {
    userInfo: UserInfo;
    rawData: string;
    signature: string;
    encryptData: string;
    iv: string;
  }
  export interface GetUserInfoOptions extends BaseOptions {
    withCredentials?: boolean;
    lang?: 'zh_CN' | 'zh_TW' | 'en';
    timeout?: number;
    success?: (res?: GetUserInfoResult) => void;
  }
  export function getUserInfo(options: GetUserInfoOptions): void;
  //---------微信支付
  export interface RequestPaymentOptions extends BaseOptions {
    timeStamp: number;
    nonceStr: string;
    package: string;
    signType: string;
    paySign: string;
  }
  export function requestPayment(options: RequestPaymentOptions): void;
  //------------转发
  interface ShowShareMenuOptions extends BaseOptions {
    withShareTicket?: boolean;
  }
  interface GetShareInfoResult {
    errMsg: string;
    encryptData: string;
    iv: string;
  }
  interface GetShareInfoOptions extends BaseOptions {
    shareTicket: string;
    timeout?: number;
    success: (res?: GetShareInfoResult) => void;
  }
  function showShareMenu(options?: ShowShareMenuOptions): void;
  function hideShareMenu(options?: BaseOptions): void;
  function updateShareMenu(options?: ShowShareMenuOptions): void;
  function getShareInfo(): void;
  //--------收货地址
  interface ChooseAddressResult {
    errMsg: string;
    userName: string;
    postalCode: string;
    provinceName: string;
    cityName: string;
    countryName: string;
    detailInfo: string;
    nationalCode: string;
    telNumber: string;
  }
  interface ChooseAddressOptions extends BaseOptions {
    success: (res?: ChooseAddressResult) => void;
  }
  function chooseAddress(options: ChooseAddressOptions): void;
  //-------------卡券
  interface AddCardResult {
    cardList: {
      code: string;
      cardId: string;
      cardExt: string;
      isSuccess: boolean;
    }[];
  }
  interface AddCardOptions extends BaseOptions {
    cardList: {
      cardId: string;
      cardExt: string;
    }[];
    success: (res?: AddCardResult) => void;
  }
  interface OpenCardOptions extends BaseOptions {
    cardList: {
      cardId: string;
      code: string;
    }[];
    success: (res?: AddCardResult) => void;
  }
  function addCard(options?: AddCardOptions): void;
  function openCard(options?: OpenCardOptions): void;
  //----------设置
  export interface GetSettingRes {
    authSetting: {
      [key: string]: boolean;
    };
  }
  export interface GetSettingOptions extends BaseOptions {
    success(res?: GetSettingRes): void;
  }
  export function getSetting(options: GetSettingOptions): void;
  //--------------微信运动
  interface GetWeRunResult {
    errMsg: string;
    encryptData: string;
    iv: string;
  }
  interface GetWeRunOptions extends BaseOptions {
    timeout?: number;
    success?: (res?: GetWeRunResult) => void;
  }
  function getWeRunData(options?: GetWeRunOptions): void;
  //---------------打开小程序
  interface NavigateToMiniProgramResult {
    errMsg: string;
  }
  interface NavigateToMiniProgramOptions extends BaseOptions {
    appId: string;
    path?: string;
    extraData?: any;
    envVersion?: string;
    success: (res: NavigateToMiniProgramResult) => void;
  }
  interface NavigateBackMiniProgramOptions {
    extraData: any;
    success: (res: NavigateToMiniProgramResult) => void;
  }
  function navigateToMiniProgram(options: NavigateToMiniProgramOptions): void;
  function navigateBackMiniProgram(
    options: NavigateBackMiniProgramOptions
  ): void;
  //--------------获取发票抬头
  interface ChooseInvoiceTitleResult {
    type: string;
    title: string;
    taxNumber: string;
    companyAddress: string;
    telephone: string;
    bankName: string;
    bankAccount: string;
    errMsg: string;
  }
  interface ChooseInvoiceTitleOptions extends BaseOptions {
    success: (res?: ChooseInvoiceTitleResult) => void;
  }
  function chooseInvoiceTitle(): void;
  //-------------生物认证
  interface CheckIsSupportSoterAuthenticationResult {
    supportMode: string[];
    errMsg: string;
  }
  interface CheckIsSupportSoterAuthenticationOptions extends BaseOptions {
    success: (res?: CheckIsSupportSoterAuthenticationResult) => void;
  }
  interface StartSoterAuthenticationResult {
    errCode: number;
    authMode: string;
    resultJSON: string;
    resultJSONSignature: string;
    errMsg: string;
  }
  interface StartSoterAuthenticationOptions extends BaseOptions {
    requestAuthModes: string[];
    challenge: string;
    authContent?: string;
    success: (res?: StartSoterAuthenticationResult) => void;
  }
  interface CheckIsSoterEnrolledInDeviceResult {
    isEnrolled: boolean;
    errMsg: string;
  }
  interface CheckIsSoterEnrolledInDeviceOptions extends BaseOptions {
    checkAuthMode: string;
    success: (res?: CheckIsSoterEnrolledInDeviceResult) => void;
  }
  function checkIsSupportSoterAuthentication(
    options?: CheckIsSupportSoterAuthenticationOptions
  ): void;
  function startSoterAuthentication(
    options: StartSoterAuthenticationOptions
  ): void;
  function checkIsSoterEnrolledInDevice(
    options: CheckIsSoterEnrolledInDeviceOptions
  ): void;
  /* ----------------------数据-------------------------- */
  function reportAnalytics(eventName: string, data: any): void;
  /* ----------------------数据END-------------------------- */
  /*----------------------更新-----------------------*/
  interface UpdateManager {
    onCheckForUpdate(callback: (hasUpdate: boolean) => void): void;
    onUpdateReady(callback: () => void): void;
    onUpdateFailed(callback: () => void): void;
    applyUpdate(): void;
  }
  export function getUpdateManager(): UpdateManager;
  /*----------------------更新END-----------------------*/

  /*---------------------多线程-----------------------*/
  interface Worker {
    postMessage(message: any): void;
    onMessage(callback: (message: any) => void): void;
    terminate(): void;
  }
  export function createWorker(scriptPath: string): Worker;
  /*---------------------多线程END-----------------------*/

  /*--------------------监控--------------------*/
  //------------监控数据上报
  export function reportMonitor(name: string, value: string): void;
  /*--------------------监控END----------------*/

  /*--------------调试接口--------------------*/
  //---------打卡/关闭调试
  interface SetEnableDebugOptions extends BaseOptions {
    enableDebug: boolean;
    success(errMsg?: string): void;
  }
  export function setEnableDebug(options: SetEnableDebugOptions): void;
  /*--------------调试接口END--------------------*/

  /*--------------------日志------------------*/
  interface LogManager {
    log(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    debug(message?: any, ...optionalParams: any[]): void;
  }
  export function getLogManager(): LogManager;
  /*--------------------日志END------------------*/
}

declare interface App {
  [key: string]: any;
  onLaunch?: (options?: any) => void;
  onShow?: (options?: any) => void;
  onHide?: () => void;
  onError?: (msg: string) => void;
}
declare function App(app: App): void;
declare interface Page {
  data?: any;
  onLoad?: (options: any) => void;
  onReady?: () => void;
  onShow?: () => void;
  onHide?: () => void;
  onUnload?: () => void;
  onPullDownRefresh?: () => void;
  onReachBottom?: () => void;
  onShareAppMessage?: (
    options: { from: string; target: any }
  ) => wx.ShareOptions;
  setData?: (data: any) => void;
  forceUpdate?: () => void;
  update?: () => void;
  [key: string]: any;
}
declare function Page(page: Page): void;
declare interface Component {
  properties?: any;
  data?: any;
  methods?: any;
  behaviors?: any;
  created?: () => void;
  attached?: () => void;
  ready?: () => void;
  moved?: () => void;
  detached?: () => void;
  relations?: any;
  externalClasses?: any;
  options?: any;
}
declare function Component(component: Component): void;
declare function getApp(): App;
declare function getCurrentPages(): Page[];
declare function getPhoneNumber(e?: any): void;
