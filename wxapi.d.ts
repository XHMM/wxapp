interface IndexData {
  [key: string]: any;
}
interface OnLaunchShowOptions {
  path: string;
  query: IndexData;
  scene: number;
  shareTicket: string;
  referrerInfo: {
    appId: string;
    extraData: IndexData;
  };
}
interface OnPageNotFoundOptions {
  path: string;
  query: IndexData;
  isEntryPage: boolean;
}
interface App {
  onLaunch?: (options?: OnLaunchShowOptions) => void;
  onShow?: (options?: OnLaunchShowOptions) => void;
  onHide?: () => void;
  onError?: (msg: string) => void;
  onPageNotFound?: (options?: OnPageNotFoundOptions) => void;
  [key: string]: any;
}
interface Page {
  data?: any;
  onLoad?: (options: IndexData) => void;
  onReady?: () => void;
  onShow?: () => void;
  onHide?: () => void;
  onUnload?: () => void;
  onPullDownRefresh?: () => void;
  onReachBottom?: () => void;
  onShareAppMessage?: (options: { title: string; path: string }) => void;
  onPageScroll?: (options?: { scrollTop: number }) => void;
  onTabItemTap?: (
    item?: {
      index: any;
      pagePath: string;
      text: string;
    }
  ) => void;
  [key: string]: any;
}
interface Component {
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
  lifetimes?:any;
  pageLifetimes?:any;
  definitionFilter?: (defFields?:any,definitionFilterArr?:any[])=>void;
}

declare function App(app: App): void;
declare function Page(page: Page): void;
declare function Component(component: Component): void;
declare function getApp(options?:{allowDefault?:boolean}): App;
declare function getCurrentPages(): Page[];
declare function getPhoneNumber(e?: any): void;
declare namespace wx {
  interface BaseOptions {
    success?: (res?: any) => void;
    fail?: (err?: any) => void;
    complete?: () => void;
  }

  interface BaseOptions2 extends BaseOptions {
    success?: (res: { errMsg: string }) => void;
  }


  /*-----------------------------------网络-----------------------------------*/

  //--------------下载
  interface DownloadFileResult {
    tempFilePath: string;
    statusCode: number;
  }

  interface DownloadFileOptions extends BaseOptions {
    url: string;
    header?: IndexData;
    filePath: string;
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

  function downloadFile(options: DownloadFileOptions): DownloadTask;

  //--------------发起请求
  interface RequestResult {
    data: IndexData;
    statusCode: number;
    header: IndexData;
  }

  interface RequestOptions extends BaseOptions {
    url: string;
    data?: IndexData;
    header?: IndexData;
    method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
    dataType?: string;
    responseType?: 'text' | 'arraybuffer';
    success?: (res?: RequestResult) => void;
  }

  interface RequestTask {
    abort: () => void;
  }

  function request(options: RequestOptions): RequestTask;

  //--------------WebSocket
  interface ConnectSocketOptions extends BaseOptions {
    url: string;
    header?: IndexData;
    protocols?: string[];
  }

  interface SendSocketMessageOptions extends BaseOptions {
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
    onMessage: (callback: (res?: { data: string | any[] }) => void) => void;
    send: (options: SocketTaskSendOptions) => void;
    close: (options?: SocketTaskCloseOptions) => void;
    onOpen: (callback: (res?: { header: IndexData }) => void) => void;
    onClose: (callback: () => void) => void;
    onError: (callback: (res?: { errMsg: string }) => void) => void;
  }

  function connectSocket(options: ConnectSocketOptions): SocketTask;

  function sendSocketMessage(options: SendSocketMessageOptions): void;

  function onSocketOpen(callback: (res?: { header: IndexData }) => void): void;

  function onSocketClose(callback: () => void): void;

  function onSocketMessage(callback: (res?: { data: string | any[] }) => void): void;

  function onSocketError(callback: (error?: any) => void): void;

  function closeSocket(options?: CloseSocketOptions): void;

  //--------------上传
  interface UploadFileResult {
    data: string;
    statusCode: number;
  }

  interface UploadFileOptions extends BaseOptions {
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

  function uploadFile(options: UploadFileOptions): void;

  /*--------------------------------网络END-----------------------------------------------*/


  /* ---------------------------------- 媒体----------------------------------*/

  //---------音频
  interface AudioContext {
    setSrc(src: string): void;

    play(): void;

    pause(): void;

    seek(position: number): void;
  }

  interface InnerAudioContext {
    offStop: (callback: () => void) => void;
    onEnded: (callback: () => void) => void;
    offEnded: (callback: () => void) => void;
    onTimeUpdate: (callback: () => void) => void;
    offTimeUpdate: (callback: () => void) => void;
    onError: (callback: (res?: any) => void) => void;
    offError: (callback: () => void) => void;
    onWaiting: (callback: () => void) => void;
    offWaiting: (callback: () => void) => void;
    onSeeking: (callback: () => void) => void;
    offSeeking: (callback: () => void) => void;
    onSeeked: (callback: () => void) => void;
    offCanplay: (callback: () => void) => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
    seek: (position: number) => void;
    destroy: () => void;
    onCanplay: (callback: () => void) => void;
    onPlay: (callback: () => void) => void;
    offPlay: (callback: () => void) => void;
    onPause: (callback: () => void) => void;
    offPause: (callback: () => void) => void;
    onStop: (callback: () => void) => void;
    offSeeked: (callback: () => void) => void;
    // 下方属性是从https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/InnerAudioContext.html页面中获取
    src: string;
    startTime: number;
    autoplay: boolean;
    loop: boolean;
    obeyMuteSwitch: boolean;
    volume: number;
    readonly duration: number;
    readonly currentTime: number;
    readonly paused: boolean;
    readonly buffered: number;
  }

  /**
   * @deprecated
   */
  function stopVoice(options?: BaseOptions): void;

  /**
   * @deprecated
   */
  function createAudioContext(audioId: string, instance?: any): AudioContext;

  function createInnerAudioContext(): InnerAudioContext;

  // todo 下面几个没完善，累... https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.getAvailableAudioSources.html
  function getAvailableAudioSources(): void;

  function setInnerAudioOption(): void

  interface PlayVoiceOptions extends BaseOptions {
    filePath: string;
    duration?: number;
  }

  function playVoice(options: PlayVoiceOptions): void;

  function pauseVoice(options?: BaseOptions): void;

  //----------相机
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

  //---------实施音视频 todo:未核对
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

  function createLivePlayerContext(
    domId: string,
    instance: any
  ): LivePlayerContext;

  function createLivePushContext(): LivePusherContext;

  //-------视频 todo：未核对
  interface ChooseVideoResult {
    tempFilePath: string;
    duration: number;
    size: number;
    height: number;
    width: number;
  }

  interface ChooseVideoOptions extends BaseOptions {
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

  interface VideoContext {
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

  function saveVideoToPhotosAlbum(): void;

  function createVideoContext(videoId: string, instance: any): VideoContext;

  function chooseVideo(options: ChooseVideoOptions): void;

  //----------字体
  interface LoadFontFaceOptions extends BaseOptions {
    family: string;
    source: string;
    desc?: {
      style: "normal" | "italic" | "oblique";
      weight:
        | "normal"
        | "bold"
        | 100
        | 200
        | 300
        | 400
        | 500
        | 600
        | 700
        | 800
        | 900;
      variant: "normal" | "small-caps" | "inherit";
    };
  }

  function loadFontFace(options: LoadFontFaceOptions): void;

  //---------图片
  interface ChooseImageResult {
    tempFilePaths: string[];
    tempFiles: WXFile[];
  }

  interface WXFile {
    path: string;
    size: number;
  }

  interface ChooseImageOptions extends BaseOptions {
    count?: number;
    sizeType?: string[];
    sourceType?: string[];
    success?: (res?: ChooseImageResult) => void;
  }

  interface PreviewImageOptions extends BaseOptions {
    current?: string;
    urls: string[];
  }

  interface GetImageInfoResult {
    width: number;
    height: number;
    path: string;
    orientation:
      | "up"
      | "down"
      | "left"
      | "right"
      | "up-mirrored"
      | "down-mirrored"
      | "left-mirrored"
      | "right-mirrored";
    type: string;
  }

  interface GetImageInfoOptions extends BaseOptions {
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

  function previewImage(options: PreviewImageOptions): void;

  function chooseImage(options: ChooseImageOptions): void;

  function getImageInfo(options: GetImageInfoOptions): void;

  function saveImageToPhotosAlbum(options: SaveImageToPhotosAlbumOptions);

  //-----------录音
  interface StartRecordResult {
    tempFilePath: string;
  }

  interface StartRecordOptions extends BaseOptions {
    success?: (res?: StartRecordResult) => void;
  }

  function startRecord(options: StartRecordOptions): void;

  function stopRecord(): void;

  interface RecorderManagerStartOptions {
    duration: number;
    sampleRate: 8000 | 16000 | 44100;
    numberOfChannels: 1 | 2;
    encodeBitRate: number;
    format: "acc" | "mp3";
    audioSource: string;
  }

  interface RecorderManager {
    start: (options?: RecorderManagerStartOptions) => void;
    pause: () => void;
    resume: () => void;
    stop: (callback?: ({tempFilePath: string}) => void) => void;
    onStart: (callback?: () => void) => void;
    onStop: (callback?: () => void) => void;
    onFrameRecorded: (
      callback?: ({frameBuffer: any, isLastFrame: boolean}) => void
    ) => void;
    onError: (callback?: ({errMsg: string}) => void) => void;
  }

  function getRecorderManager(): RecorderManager;

  /*-------------------------媒体END----------------------*/


  /* --------------------------文件 todo:未核对---------------------- */
  interface GetFileInfoOptions extends BaseOptions {
    filePath: string
    digestAlgorithm?: string
    success?: (res?: GetFileInfoResult) => void
  }

  interface GetFileInfoResult {
    size: number
    digest: string
    errMsg: string
  }

  interface SaveFileResult {
    savedFilePath: string;
  }

  interface SaveFileOptions extends BaseOptions {
    tempFilePath: string;
    success?: (res?: SaveFileResult) => void;
  }

  interface FileListItem {
    filePath: string;
    createTime: number;
    size: number;
  }

  interface GetSavedFileListResult {
    errMsg: string;
    fileList: FileListItem[];
  }

  interface GetSavedFileListOptions extends BaseOptions {
    success?: (res?: GetSavedFileListResult) => void;
  }

  interface GetSavedFileInfoResult {
    errMsg: string;
    size: number;
    createTime: number;
  }

  interface GetSavedFileInfoOptions extends BaseOptions {
    filePath: string;
    success?: (res?: GetSavedFileInfoResult) => void;
  }

  interface RemoveSavedFileOptions extends BaseOptions {
    filePath: string;
  }

  interface OpenDocumentOptions extends BaseOptions {
    filePath: string;
    fileType?: "doc" | "xls" | "ppt" | "pdf" | "docx" | "xlsx" | "pptx";
  }

  function saveFile(options: SaveFileOptions): void;

  function getFileInfo(options: GetFileInfoOptions): void;

  function getSavedFileList(options: GetSavedFileListOptions): void;

  function getSavedFileInfo(options: GetSavedFileInfoOptions): void;

  function removeSavedFile(options: RemoveSavedFileOptions): void;

  function openDocument(options: OpenDocumentOptions): void;

  /* --------------------------文件END---------------------- */


  /* ---------------------------------- 数据缓存 ----------------------------------*/
  interface SetStorageOptions extends BaseOptions {
    key: string;
    data: any;
  }

  interface GetStorageResult {
    data: any;
  }

  interface GetStorageOptions extends BaseOptions {
    key: string;
    success?: (res?: GetStorageResult) => void;
  }

  interface GetStorageInfoResult {
    keys: string[];
    currentSize: number;
    limitSize: number;
  }

  interface GetStorageInfoOptions extends BaseOptions {
    success?: (res?: GetStorageInfoResult) => void;
  }

  interface RemoveStorageOptions extends BaseOptions {
    key: string;
  }

  function getStorage(options: GetStorageOptions): void;

  function getStorageSync(key: string): any;

  function setStorage(options: SetStorageOptions): void;

  function setStorageSync(key: string, data: any): void;

  function removeStorage(options: RemoveStorageOptions): void;

  function removeStorageSync(key: string): void;

  function clearStorage(): void;

  function clearStorageSync(): void;

  function getStorageInfo(options: GetStorageInfoOptions): void;

  function getStorageInfoSync(): GetStorageInfoResult;

  /* ---------------------------------- 数据缓存END ----------------------------------*/


  /*--------------------------------------- 位置---------------------------------------*/
  interface Location {
    latitude: number;
    longitude: number;
  }

  interface GetLocationResult extends Location {
    speed: number;
    accuracy: number;
    horizontalAccuracy: any;
  }

  interface GetLocationOptions extends BaseOptions {
    type?: string;
    altitude?: boolean;
    success?: (res?: GetLocationResult) => void;
  }

  interface ChooseLocationResult extends Location {
    name: string;
    address: string;
  }

  interface ChooseLocationOptions extends BaseOptions {
    success?: (res?: ChooseLocationResult) => void;
  }

  interface OpenLocationOptions extends BaseOptions, Location {
    scale?: number;
    name?: string;
    address?: string;
  }


  function getLocation(options: GetLocationOptions): void;

  function openLocation(options: OpenLocationOptions): void;

  function chooseLocation(options: ChooseLocationOptions): void;

  /*--------------------------------------- 位置END---------------------------------------*/


  /* ---------------------------------- 设备 todo:---------------------------------- */
  //--------网络
  //--------加速计
  //---------剪切板
  //--------罗盘
  //--------联系人
  //--------陀螺仪
  //--------iBeacon
  //--------设备方向
  //--------电量
  //--------电话
  //--------扫码
  //--------振动
  //--------性能
  //--------蓝牙
  //--------NFC
  //--------屏幕
  //--------Wi-Fi


  //-------内存
  function onMemoryWarning(callback: (res: { level: number }) => void): void;

  //---------------网络状态
  type NetworkType = "2g" | "3g" | "4g" | "wifi" | "unknown" | "none";

  interface GetNetworkTypeResult {
    networkType: NetworkType;
  }

  interface GetNetworkTypeOptions extends BaseOptions {
    success?: (res?: GetNetworkTypeResult) => void;
  }

  function getNetworkType(options: GetNetworkTypeOptions): void;

  function onNetworkStatusChange(
    callback: (res?: { isConnected: boolean; netWorkType: NetworkType }) => void
  ): void;

  //----------------加速度计
  interface StartAccelerometerOptions extends BaseOptions {
    interval?: "game" | "ui" | "normal";
  }

  function onAccelerometerChange(
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
  function onCompassChange(
    callback: (res?: { direction: number }) => void
  ): void;

  function startCompass(options?: BaseOptions): void;

  function stopCompass(options?: BaseOptions): void;

  //------------------拨打电话
  interface MakePhoneCallOptions {
    phoneNumber: number;
  }

  function makePhoneCall(options: MakePhoneCallOptions): void;

  //-----------扫码
  interface ScanCodeResult {
    result: string;
    scanType: string;
    charSet: string;
    path: string;
    rawData: string;
  }

  type ScanType = "qrCode" | "barCode" | "datamatrix" | "pdf417";

  interface ScanCodeOptions extends BaseOptions {
    onlyFromCamera?: boolean;
    scanType?: ScanType[];
    success?: (res?: ScanCodeResult) => void;
  }

  function scanCode(options: ScanCodeOptions): void;

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
  interface BluetoothBaseOptions extends BaseOptions {
    success: (res: any) => void;
  }

  interface Device {
    name: string;
    deviceId: string;
    RSSI: number;
    advertisData: any[];
    advertisServiceUUIDs: any[];
    localName: string;
    serviceData: any[];
  }

  interface GetBluetoothAdapterStateOptions extends BaseOptions {
    success: (res: GetBluetoothAdapterStateResult) => void;
  }

  interface GetBluetoothAdapterStateResult {
    discovering: boolean;
    available: boolean;
    errMsg: string;
  }

  interface StartBluetoothDevicesDiscoveryOptions extends BaseOptions {
    services?: any[];
    allowDuplicatesKey?: boolean;
    interval?: number;
    success: (res?: string) => void;
  }

  interface GetBluetoothDevicesResult {
    devices: Device[];
    errMsg: string;
  }

  interface GetBluetoothDevicesOptions extends BaseOptions {
    success: (res: GetBluetoothDevicesResult) => void;
  }

  interface GetConnectedBluetoothDevicesOptions extends BaseOptions {
    services: any[];
    success: (res: GetConnectedBluetoothDevicesResult) => void;
  }

  interface GetConnectedBluetoothDevicesResult {
    devices: { name: string; deviceId: string }[];
    errMsg: string;
  }

  interface CreateBLEConnectionOptions extends BaseOptions {
    deviceId: string;
    timeout?: number;
    success: (res: { errMsg: string }) => void;
  }

  interface CloseBLEConnectionOptions extends BaseOptions {
    deviceId: string;
    success: (res: { errMsg: string }) => void;
  }

  interface OnBLEConnectionStateChangeResult {
    deviceId: string;
    connected: boolean;
  }

  interface Service {
    uuid: string;
    isPrimary: boolean;
  }

  interface GetBLEDeviceServicesOptions extends BaseOptions {
    deviceId: string;
    success: (res: { services: Service[]; errMsg: string }) => void;
  }

  interface Characteristics {
    uuid: string;
    properties: {
      read: boolean;
      write: boolean;
      notify: boolean;
      indicate: boolean;
    };
  }

  interface GetBLEDeviceCharacteristicsOptions extends BaseOptions {
    deviceId: string;
    serviceId: string;
    success: (
      res: { characteristics: Characteristics[]; errMsg: string }
    ) => void;
  }

  interface ReadBLECharacteristicValueOptions extends BaseOptions {
    deviceId: string;
    serviceId: string;
    characteristicId: string;
    success: (res: { errCode: number; errMsg: string }) => void;
  }

  interface WriteBLECharacteristicValueOptions extends BaseOptions {
    deviceId: string;
    serviceId: string;
    characteristicId: string;
    value: any[];
    success: (res: { errMsg: string }) => void;
  }

  interface NotifyBLECharacteristicValueChangeOptions extends BaseOptions {
    deviceId: string;
    serviceId: string;
    characteristicId: string;
    state: boolean;
    success: (res: { errMsg: string }) => void;
  }

  interface OnBLECharacteristicValueChangeResult {
    deviceId: string;
    serviceId: string;
    characteristicId: string;
    value: any[];
  }

  function openBluetoothAdapter(options?: BluetoothBaseOptions): void;

  function closeBluetoothAdapter(options?: BluetoothBaseOptions): void;

  function getBluetoothAdapterState(options?: GetBluetoothAdapterStateOptions);

  function onBluetoothAdapterStateChange(
    callback: (res: { available: boolean; discovering: boolean }) => void
  );

  function startBluetoothDevicesDiscovery(
    options: StartBluetoothDevicesDiscoveryOptions
  ): void;

  function stopBluetoothDevicesDiscovery(options: BluetoothBaseOptions): void;

  function getBluetoothDevices(options: GetBluetoothDevicesOptions): void;

  function getConnectedBluetoothDevices(
    options: GetConnectedBluetoothDevicesOptions
  ): void;

  function onBluetoothDeviceFound(callback: (devices: Device[]) => void);

  function createBLEConnection(options: CreateBLEConnectionOptions): void;

  function closeBLEConnection(options: CloseBLEConnectionOptions): void;

  function getBLEDeviceServices(options: GetBLEDeviceServicesOptions): void;

  function getBLEDeviceCharacteristics(
    options: GetBLEDeviceCharacteristicsOptions
  ): void;

  function readBLECharacteristicValue(
    options: ReadBLECharacteristicValueOptions
  ): void;

  function writeBLECharacteristicValue(
    options: WriteBLECharacteristicValueOptions
  ): void;

  function notifyBLECharacteristicValueChange(
    options: NotifyBLECharacteristicValueChangeOptions
  ): void;

  function onBLEConnectionStateChange(
    callback: (res: OnBLEConnectionStateChangeResult) => void
  );

  function onBLECharacteristicValueChange(
    callback: OnBLECharacteristicValueChangeResult
  ): void;

  //-------------------------iBeacon
  interface StartBeaconDiscoveryOptions extends BaseOptions2 {
    uuids: string[];
  }

  interface IBeacon {
    uuid: string;
    major: string;
    minor: string;
    proximity: number;
    accuracy: number;
    rssi: number;
  }

  interface GetBeaconsResult {
    beacons: IBeacon[];
    errMsg: string;
  }

  interface GetBeaconsOptions extends BaseOptions {
    success?: (res: GetBeaconsResult) => void;
  }

  interface OnBeaconServiceChangeResult {
    available: boolean;
    discovering: boolean;
  }

  function startBeaconDiscovery(options: StartBeaconDiscoveryOptions): void;

  function stopBeaconDiscovery(options?: BaseOptions2): void;

  function getBeacons(options?: GetBeaconsOptions): void;

  function onBeaconUpdate(callback: (beacons: IBeacon[]) => void): void;

  function onBeaconServiceChange(
    callback: (res: OnBeaconServiceChangeResult) => void
  ): void;

  //-------------------------屏幕亮度
  interface SetScreenBrightnessOptions extends BaseOptions {
    value: number;
  }

  interface GetScreenBrightnessOptions extends BaseOptions {
    success?: (value: number) => void;
  }

  interface SetKeepScreenOnOptions extends BaseOptions2 {
    keepScreenOn: boolean;
  }

  function setScreenBrightness(options: SetScreenBrightnessOptions): void;

  function getScreenBrightness(options: GetScreenBrightnessOptions): void;

  function setKeepScreenOn(options: SetKeepScreenOnOptions): void;

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
  interface GetHCEStateOptions extends BaseOptions {
    success?: (res?: GetHCEStateResult) => void
  }

  interface GetHCEStateResult {
    errMsg: string
    errCode: number
  }

  interface OnHCEMessageResult {
    messageType: number
    data: any[]
    reason: number
  }

  interface SendHCEMessageOptions extends BaseOptions {
    data: any[]
    success?: (res?: GetHCEStateResult) => void
  }

  function getHCEState(options?: GetHCEStateOptions): void;

  function startHCE(options?: GetHCEStateOptions): void;

  function stopHCE(options?: GetHCEStateOptions): void;

  function onHCEMessage(callback: (res?: OnHCEMessageResult) => void): void;

  function sendHCEMessage(options?: SendHCEMessageOptions): void;

  //-------------------------Wi-Fi
  interface ConnectWifiOptions extends BaseOptions {
    SSID: string
    BSSID: string
    password: string
  }

  interface Wifi {
    SSID: string
    BSSID: string
    secure: boolean
    signalStrength: number
  }

  interface OnGetWifiListResult {
    wifiList: Wifi[]
  }

  interface SetWifiListInterface extends BaseOptions {
    wifiList: {
      SSID: string
      BSSID: string
      password: string
    }[]
  }

  interface GetConnectedWifiOptions extends BaseOptions {
    success?: (res: { wifi: Wifi }) => void
  }

  function startWifi(options?: BaseOptions): void;

  function stopWifi(options?: BaseOptions): void;

  function connectWifi(options?: ConnectWifiOptions): void;

  function getWifiList(options?: BaseOptions): void;

  function onGetWifiList(callback: (res: OnGetWifiListResult) => void): void;

  function setWifiList(options: SetWifiListInterface): void;

  function onWifiConnected(callback: (res: { wifi: Wifi }) => void): void;

  function getConnectedWifi(options?: GetConnectedWifiOptions): void;

  /* ---------------------------------- 设备END ---------------------------------- */


  /* ---------------------------------- 界面 todo----------------------------------*/
  //-------下拉刷新
  //-------自定义组件
  //-------菜单
  //-------交互
  //-------滚动
  //-------动画
  //-------窗口
  //-------背景
  //-------Tab Bar
  //-------置顶
  //-------导航栏

  //-------------交互反馈
  interface ShowToastOptions extends BaseOptions {
    title: string;
    icon?: "none" | "success" | "loading"; //[2018年6月7日00:21:36]
    duration?: number;
    mask?: boolean;
  }

  interface ShowLoadingOptions extends BaseOptions {
    title: string;
    mask?: boolean;
  }

  interface ShowModalResult {
    confirm: boolean;
    cancel: boolean;
  }

  interface ShowModalOptions extends BaseOptions {
    title: string;
    content: string;
    showCancel?: boolean;
    cancelText?: string;
    cancelColor?: string;
    confirmText?: string;
    confirmColor?: string;
    success?: (res?: ShowModalResult) => void;
  }

  interface ShowActionSheetResult {
    cancel: boolean;
    tapIndex: number;
  }

  interface ShowActionSheetOptions extends BaseOptions {
    itemList: string[];
    itemColor?: string;
    success?: (res?: ShowActionSheetResult) => void;
  }

  function showToast(options: ShowToastOptions): void;

  function showLoading(options: ShowLoadingOptions): void;

  function hideToast(): void;

  function hideLoading(): void;

  function showModal(options: ShowModalOptions): void;

  function showActionSheet(options: ShowActionSheetOptions): void;

  //----------设置导航条
  interface SetNavigationBarTitleOptions extends BaseOptions {
    title: string;
  }

  interface SetNavigationBarColorOptions extends BaseOptions {
    fontColor: "#ffffff" | "#000000";
    backgroundColor: string;
    animation?: {
      duration?: number;
      timingFunc?: string;
    };
  }

  function setNavigationBarTitle(options: SetNavigationBarTitleOptions): void;

  function showNavigationBarLoading(): void;

  function hideNavigationBarLoading(): void;

  function setNavigationBarColor(options: SetNavigationBarColorOptions): void;

  //-----------设置tabBar
  interface SetTabBarBadgeOptions extends BaseOptions {
    index: number;
    text: string;
  }

  interface RemoveTabBarBadgeOptions extends BaseOptions {
    index: number;
  }

  interface ShowTabBarRedDotOptions extends BaseOptions {
    index: number;
  }

  interface HideTabBarRedDotOptions extends BaseOptions {
    index: number;
  }

  interface SetTabBarStyleOptions extends BaseOptions {
    color?: string;
    selectedColor?: string;
    backgroundColor?: string;
    borderStyle?: string;
  }

  interface SetTabBarItemOptions {
    index: number;
    text?: string;
    iconPath?: string;
    selectedIconPath?: string;
  }

  interface ShowOrHideTabBarOptions {
    animation?: boolean;
  }

  function setTabBarBadge(options: SetTabBarBadgeOptions): void;

  function removeTabBarBadge(options: RemoveTabBarBadgeOptions): void;

  function showTabBarRedDot(options: ShowTabBarRedDotOptions): void;

  function hideTabBarRedDot(options: HideTabBarRedDotOptions): void;

  function setTabBarStyle(options: SetTabBarStyleOptions): void;

  function setTabBarItem(options: SetTabBarItemOptions): void;

  function showTabBar(options?: ShowOrHideTabBarOptions): void;

  function hideTabBar(options?: ShowOrHideTabBarOptions): void;

  //----------设置窗口背景
  interface SetBackgroundColorOptions {
    backgroundColor?: string
    backgroundColorTop?: string
    backgroundColorBottom?: string
  }

  interface SetBackgroundTextStyleOptions {
    textStyle: string
  }

  function setBackgroundColor(options: SetBackgroundColorOptions): void;

  function setBackgroundTextStyle(options: SetBackgroundTextStyleOptions): void;

  //-----------设置置顶信息
  interface SetTopBarOptions extends BaseOptions {
    text: string;
  }

  function setTopBarText(options: SetTopBarOptions);

  //-----------导航
  interface NavigateToOptions extends BaseOptions {
    url: string;
  }

  interface RedirectToOptions extends BaseOptions {
    url: string;
  }

  interface SwitchTabOptions extends BaseOptions {
    url: string;
  }

  interface NavigateBackOptions {
    delta?: number;
  }

  interface RelaunchOptions extends BaseOptions {
    url: string;
  }

  function navigateTo(options: NavigateToOptions): void;

  function redirectTo(options: RedirectToOptions): void;

  function switchTab(options: SwitchTabOptions): void;

  function navigateBack(options: NavigateBackOptions): void;

  function reLaunch(options: RelaunchOptions): void;

  //--------------动画
  interface Animation {
    step(): this;

    export(): this;

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

  interface AnimationOptions {
    duration?: number;
    timingFunction?:
      | "linear"
      | "ease"
      | "ease-in"
      | "ease-in-out"
      | "ease-out"
      | "step-start"
      | "step-end";
    delay?: number;
    transformOrigin?: string;
  }

  function createAnimation(options?: AnimationOptions): Animation;

  //--------------位置
  interface PageScrollToOptions {
    scrollTop: number
    duration?: number
  }

  function pageScrollTo(option: PageScrollToOptions): void;

  //---------------绘图
  interface CanvasContext {
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

    lineCap: "butt" | "round" | "square";

    setLineJoin(lineJoin: string): void;

    lineJoin: "bevel" | "round" | "miter";

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

    setTextAlign(align: "left" | "center" | "right"): void;

    textAlign: "left" | "center" | "right";

    setTextBaseline(textBaseline: "top" | "bottom" | "middle" | "normal"): void;

    baseline: "top" | "bottom" | "middle" | "normal";

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

    shadowBlur: any
    shadowColor: any
    shadowOffsetX: any
    shadowOffsetY: any
    font: string;

    transform(
      scaleX: number,
      skewX: number,
      skewY: number,
      scaleY: number,
      translateX: number,
      translateY: number
    ): void;

    setTransform(
      scaleX: number,
      skewX: number,
      skewY: number,
      scaleY: number,
      translateX: number,
      translateY: number
    ): void;
  }

  interface DrawCanvasOptions {
    canvasId: string;
    actions: any[];
    reserve?: boolean;
  }

  interface CanvasToTempFilePathOptions extends BaseOptions {
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

  interface CanvasGetImageData {
    errMsg: string;
    width: number;
    height: number;
    data: any[];
  }

  interface CanvasGetImageDataOptions extends BaseOptions {
    canvasId: string;
    x: number;
    y: number;
    width: number;
    height: number;
    success?: (res?: CanvasGetImageData) => void;
  }

  interface CanvasPutImageData extends BaseOptions {
    canvasId: string;
    data: any[];
    x: number;
    y: number;
    width: number;
    height?: number;
  }

  function createCanvasContext(canvasId: string, componentInstance?: object): CanvasContext;

  /**
   * @deprecated 不推荐使用
   */
  function createContext(): CanvasContext;

  /**
   * @deprecated 不推荐使用
   */
  function drawCanvas(options: DrawCanvasOptions): void;

  function canvasToTempFilePath(options: CanvasToTempFilePathOptions): string;

  function canvasGetImageData(options: CanvasGetImageDataOptions): any[];

  function canvasPutImageData(options: CanvasPutImageData): void;

  //-----------------下拉刷新
  function startPullDownRefresh(): void;

  function stopPullDownRefresh(): void;

  //-------------WXML节点信息
  interface NodesRefInterface {
    boundingClientRect(
      callback?: (
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
      callback?: (
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

  interface SelectorQueryInterface {
    in(component: any): SelectorQueryInterface;

    select(selector: string): NodesRefInterface;

    selectAll(selector: string): NodesRefInterface;

    selectViewport(): NodesRefInterface;

    exec(callback?: (res: any[]) => void): void;
  }

  function createSelectorQuery(): SelectorQueryInterface;

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

  //--------------自定义组件
  function nextTick(fn: () => void): void

  /*--------------------------------界面END-----------------------------------------------*/


  /*---------------------------------- 开放接口----------------------------------*/

  //-----------设置
  interface AuthSetting {
    scope: {
      userInfo: boolean
      userLocation: boolean
      address: boolean
      invoiceTitle: boolean
      werun: boolean
      record: boolean
      writePhotoAlbum: boolean
      camera: boolean
    }
  }

  interface SettingOptions extends BaseOptions {
    success: (res: {
      authSetting: AuthSetting
    }) => void
  }

  function getSetting(options?: SettingOptions): void

  function openSetting(options?: SettingOptions): void

  //-----------当前账号信息
  interface GetAccountInfoSyncResult {
    miniProgram: {
      appId: string
    }
    plugin: {
      appId: string
      version: string
    }
  }

  function getAccountInfoSync(): GetAccountInfoSyncResult

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

  //----------授权
  interface AuthorizeResult {
    errMsg: string;
  }

  interface AuthorizeOptions extends BaseOptions {
    scope: string;
    success?: (res?: AuthorizeResult) => void;
  }

  function authorize(options: AuthorizeOptions): void;

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

  //--------------发票
  interface ChooseInvoiceOptions extends BaseOptions {
    success?: (res: {
      invoiceInfo: {
        cardId: string
        encryptCode: string
        publisherAppid: string
      }
    }) => void
  }

  interface ChooseInvoiceTitleOptions extends BaseOptions {
    success?: (res: {
      type: string;
      title: string;
      taxNumber: string;
      companyAddress: string;
      telephone: string;
      bankName: string;
      bankAccount: string;
      errMsg: string;
    }) => void;
  }

  function chooseInvoice(options?: ChooseInvoiceOptions): void;

  function chooseInvoiceTitle(options?: ChooseInvoiceTitleOptions): void;

  //---------todo:支付少一个
  interface RequestPaymentOptions extends BaseOptions {
    timeStamp: string;
    nonceStr: string;
    package: string;
    signType: string;
    paySign: string;
  }

  function requestPayment(options: RequestPaymentOptions): void;

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

  interface GetUserInfoOptions extends BaseOptions {
    withCredentials?: boolean;
    lang?: "zh_CN" | "zh_TW" | "en";
    timeout?: number;
    success?: (res: {
      userInfo: UserInfo;
      rawData: string;
      signature: string;
      encryptData: string;
      iv: string;
    }) => void;
  }

  function getUserInfo(options: GetUserInfoOptions): void;

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

  //---------数据分析
  function reportAnalytics(eventName: string, data: any): void;

  //-----------登录
  interface LoginOptions extends BaseOptions {
    timeout?: number;
    success?: (res: { code: string }) => void;
  }

  function login(options: LoginOptions): void;

  function checkSession(options: BaseOptions): void;

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

  //---------------小程序跳转
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

  function navigateBackMiniProgram(
    options: NavigateBackMiniProgramOptions
  ): void;

  /**
   * @deprecated 即将废弃，请使用<navigator>组件
   */
  function navigateToMiniProgram(options: NavigateToMiniProgramOptions): void;


  /*----------------------更新-----------------------*/
  interface UpdateManager {
    onCheckForUpdate(callback: (hasUpdate: boolean) => void): void;

    onUpdateReady(callback: () => void): void;

    onUpdateFailed(callback: () => void): void;

    applyUpdate(): void;
  }

  function getUpdateManager(): UpdateManager;

  /*----------------------更新END-----------------------*/


  /*--------------------Worker-----------------------*/
  interface Worker {
    postMessage(message: any): void;

    onMessage(callback: (message: any) => void): void;

    terminate(): void;
  }

  function createWorker(scriptPath: string): Worker;

  /*--------------------WorkerEND-----------------------*/





  /*--------------------数据上报--------------------*/
  function reportMonitor(name: string, value: string): void;

  /*--------------------数据上报END----------------*/






  /*-----------------todo： 地图待完善----------------------------------*/
  interface GetCenterLocationOptions extends BaseOptions {
    success?: (res?: Location) => void;
  }

  interface MapContext {
    getCenterLocation(options: GetCenterLocationOptions): void;

    moveToLocation(): void;
  }

  function createMapContext(mapId: string): MapContext;

  /*----------------------地图END----------------------------------*/





  /*------------------------调试 todo未完------------------------------*/
  interface SetEnableDebugOptions extends BaseOptions {
    enableDebug: boolean;

    success(errMsg?: string): void;
  }

  function setEnableDebug(options: SetEnableDebugOptions): void;

  /*--------------------------调试END--------------------*/






  /*-----------------系统----------------------------------*/
  //--------------系统信息
  interface GetSystemInfoResult {
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

  interface GetSystemInfoOptions extends BaseOptions {
    success?: (res?: GetSystemInfoResult) => void;
  }

  function getSystemInfo(options: GetSystemInfoOptions): void;

  function getSystemInfoSync(): GetSystemInfoResult;

  /*----------------------系统END----------------------------------*/






  /*-----------------todo： WXML----------------------------------*/
  /*----------------------WXML END----------------------------------*/






  /*-----------------todo： 画布----------------------------------*/
  /*----------------------画布END----------------------------------*/






  /*--------------------基础----------------------------------*/
  function canIUse(param: string): boolean;

  /*----------------------基础END----------------------------------*/






  /*-----------------todo： 转发----------------------------------*/
  /*----------------------转发END----------------------------------*/






  /*-----------------todo： 路由----------------------------------*/
  /*----------------------路由END----------------------------------*/







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







  /*
  *
  *
  *  云函数客户端
  * */
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

