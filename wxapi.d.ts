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
interface Page<D> {
  data?: D;
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
}

declare function App(app: App): void;
declare function Page<D>(page: Page<D>): void;
declare function Component(component: Component): void;
declare function getApp<T>(): T;
declare function getCurrentPages(): Page<any>[];
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
    method?: string;
    dataType?: string;
    responseType?: string;
    success?: (res?: RequestResult) => void;
  }
  interface RequestTask {
    abort: () => void;
  }
  function request(options: RequestOptions): RequestTask;
  //--------------上传，下载
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
  interface DownloadFileResult {
    tempFilePath: string;
    statusCode: number;
  }
  interface DownloadFileOptions extends BaseOptions {
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
  function uploadFile(options: UploadFileOptions): void;
  function downloadFile(options: DownloadFileOptions): DownloadTask;
  //--------------WebSocket
  interface ConnectSocketOptions extends BaseOptions {
    url: string;
    header?: IndexData;
    method?: string;
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
    send: (options: SocketTaskSendOptions) => void;
    close: (options: SocketTaskCloseOptions) => void;
    onOpen: (callback: (res?: { header: IndexData }) => void) => void;
    onError: (callback: (res?: { errMsg: string }) => void) => void;
    onMessage: (callback: (res: { data: string | any[] }) => void) => void;
  }
  function connectSocket(options: ConnectSocketOptions): void;
  function onSocketOpen(callback: (res?: { header: IndexData }) => void): void;
  function onSocketError(callback: (error?: any) => void): void;
  function sendSocketMessage(options: SendSocketMessageOptions): void;
  function onSocketMessage(
    callback: (res?: { data: string | any[] }) => void
  ): void;
  function closeSocket(options: CloseSocketOptions): void;
  function onSocketClose(callback: (res?: any) => void): void;
  /*--------------------------------网络END-----------------------------------------------*/

  /* ---------------------------------- 媒体API列表 ----------------------------------*/
  //-------图片
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
  //-------录音
  interface StartRecordResult {
    tempFilePath: string;
  }
  interface StartRecordOptions extends BaseOptions {
    success?: (res?: StartRecordResult) => void;
  }
  function startRecord(options: StartRecordOptions): void;
  function stopRecord(): void;
  //-------录音管理
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
  interface PlayVoiceOptions extends BaseOptions {
    filePath: string;
    duration?: number;
  }
  function playVoice(options: PlayVoiceOptions): void;
  function pauseVoice(): void;
  function stopVoice(): void;
  //-------音乐播放控制
  interface GetBackgroundAudioPlayerStateResult {
    duration: number;
    currentPosition: number;
    status: 2 | 1 | 0;
    downloadPercent: number;
    dataUrl: string;
  }
  interface GetBackgroundAudioPlayerStateOptions extends BaseOptions {
    success?: (res?: GetBackgroundAudioPlayerStateResult) => void;
  }
  interface PlayBackgroundAudioOptions extends BaseOptions {
    dataUrl: string;
    title?: string;
    coverImgUrl?: string;
  }
  interface SeekBackgroundAudioOptions extends BaseOptions {
    position: number;
  }
  function getBackgroundAudioPlayerState(
    options?: GetBackgroundAudioPlayerStateOptions
  ): void;
  function playBackgroundAudio(options: PlayBackgroundAudioOptions): void;

  function pauseBackgroundAudio(): void;
  function seekBackgroundAudio(options: SeekBackgroundAudioOptions): void;
  function stopBackgroundAudio(): void;
  function onBackgroundAudioPlay(callback: (res?: any) => void): void;
  function onBackgroundAudioPause(callback: (res?: any) => void): void;
  function onBackgroundAudioStop(callback: (res?: any) => void): void;
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
  function chooseVideo(options: ChooseVideoOptions): void;
  function saveVideoToPhotosAlbum(): void;

  interface AudioContext {
    setSrc(src: string): void;
    play(): void;
    pause(): void;
    seek(position: number): void;
  }
  //-------视频组件控制
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
  function createVideoContext(videoId: string, instance: any): VideoContext;
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
  function createLivePlayerContext(
    domId: string,
    instance: any
  ): LivePlayerContext;
  function createLivePushContext(): LivePusherContext;
  //----------动态加载字体
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
  /*-------------------------媒体END----------------------*/

  /* --------------------------文件---------------------- */
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
  function setStorage(options: SetStorageOptions): void;
  function setStorageSync(key: string, data: any): void;
  function getStorage(options: GetStorageOptions): void;
  function getStorageSync(key: string): any;
  function getStorageInfo(options: GetStorageInfoOptions): void;
  function getStorageInfoSync(): GetStorageInfoResult;
  function removeStorage(options: RemoveStorageOptions): void;
  function removeStorageSync(key: string): void;
  function clearStorage(): void;
  function clearStorageSync(): void;
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
  interface GetCenterLocationOptions extends BaseOptions {
    success?: (res?: Location) => void;
  }
  interface MapContext {
    getCenterLocation(options: GetCenterLocationOptions): void;
    moveToLocation(): void;
  }
  //---------获取位置
  function getLocation(options: GetLocationOptions): void;
  //----------查看位置
  function chooseLocation(options: ChooseLocationOptions): void;
  function openLocation(options: OpenLocationOptions): void;
  //----------地图组件控制
  function createMapContext(mapId: string): MapContext;

  /*--------------------------------------- 位置END---------------------------------------*/

  /* ---------------------------------- 设备 ---------------------------------- */
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
  function canIUse(param: string): boolean;
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
  //-------------------------Wi-Fi

  /* ---------------------------------- 设备END ---------------------------------- */
  /* ---------------------------------- 界面----------------------------------*/
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
    animation: {
      duration: number;
      timingFunc: string;
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
    color: string;
    selectedColor: string;
    backgroundColor: string;
    borderStyle: string;
  }
  interface SetTabBarItemOptions {
    index: number;
    text: string;
    iconPath: string;
    selectedIconPath: string;
  }
  interface ShowOrHideTabBarOptions {
    animation: boolean;
  }
  function setTabBarBadge(options: SetTabBarBadgeOptions): void;
  function removeTabBarBadge(options: RemoveTabBarBadgeOptions): void;
  function showTabBarRedDot(options: ShowTabBarRedDotOptions): void;
  function hideTabBarRedDot(options: HideTabBarRedDotOptions): void;
  function setTabBarStyle(options: SetTabBarStyleOptions): void;
  function setTabBarItem(options: SetTabBarItemOptions): void;
  function showTabBar(options: ShowOrHideTabBarOptions): void;
  function hideTabBar(options: ShowOrHideTabBarOptions): void;
  //-----------设置置顶信息
  interface SetTopBarOptions extends BaseOptions {
    text: string;
  }
  function setTopBarText(options: SetTopBarOptions);
  //-----------导航
  interface NavigateToOptions extends BaseOptions {
    url: string;
  }
  function navigateTo(options: NavigateToOptions): void;
  interface RedirectToOptions extends BaseOptions {
    url: string;
  }
  function redirectTo(options: RedirectToOptions): void;
  interface SwitchTabOptions extends BaseOptions {
    /**
     * 需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
     */
    url: string;
  }
  function switchTab(options: SwitchTabOptions): void;
  interface NavigateBackOptions {
    delta?: number;
  }
  function navigateBack(options: NavigateBackOptions): void;
  interface RelaunchOptions extends BaseOptions {
    url: string;
  }
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
  function createCanvasContext(
    canvasId: string,
    componentInstance?: object
  ): CanvasContext;
  function createContext(): CanvasContext;
  interface DrawCanvasOptions {
    canvasId: string;
    actions: any[];
    reserve?: boolean;
  }
  function drawCanvas(options: DrawCanvasOptions): void;
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
  function canvasToTempFilePath(options: CanvasToTempFilePathOptions): string;
  interface CanvasGetImageData {
    errMsg: string;
    width: number;
    height: number;
    data: any[];
  }
  interface CanvasGetImageDataOptions extends BaseOptions {
    canvasId: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    success?: (res?: CanvasGetImageData) => void;
  }
  function canvasGetImageData(options: CanvasGetImageDataOptions): any[];
  interface CanvasPutImageData extends BaseOptions {
    canvasId: string;
    data: any[];
    x: number;
    y: number;
    width: number;
    height: number;
  }
  function canvasPutImageData(options: CanvasPutImageData): void;
  //-----------------下拉刷新
  function stopPullDownRefresh(): void;
  //-------------WXML节点信息
  interface NodesRefInterface {
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
  interface SelectorQueryInterface {
    in(component: SelectorQueryInterface): void;
    select(selector: string): NodesRefInterface;
    selectAll(selector: string): NodesRefInterface;
    selectViewport(): NodesRefInterface;
    exec(cb?): void;
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
  interface LoginResult {
    errMsg: string;
    code: string;
  }
  interface LoginOptions extends BaseOptions {
    timeout?: number;
    success?: (res?: LoginResult) => void;
  }
  interface CheckSessionOptions extends BaseOptions {}
  function login(options: LoginOptions): void;
  function checkSession(options: CheckSessionOptions): void;
  //----------授权
  interface AuthorizeResult {
    errMsg: string;
  }
  interface AuthorizeOptions extends BaseOptions {
    scope: string;
    success?: (res?: AuthorizeResult) => void;
  }
  function authorize(options: AuthorizeOptions): void;
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
  interface GetUserInfoResult {
    userInfo: UserInfo;
    rawData: string;
    signature: string;
    encryptData: string;
    iv: string;
  }
  interface GetUserInfoOptions extends BaseOptions {
    withCredentials?: boolean;
    lang?: "zh_CN" | "zh_TW" | "en";
    timeout?: number;
    success?: (res?: GetUserInfoResult) => void;
  }
  function getUserInfo(options: GetUserInfoOptions): void;
  //---------微信支付
  interface RequestPaymentOptions extends BaseOptions {
    timeStamp: number;
    nonceStr: string;
    package: string;
    signType: string;
    paySign: string;
  }
  function requestPayment(options: RequestPaymentOptions): void;
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
  interface GetSettingRes {
    authSetting: {
      [key: string]: boolean;
    };
  }
  interface GetSettingOptions extends BaseOptions {
    success(res?: GetSettingRes): void;
  }
  function getSetting(options: GetSettingOptions): void;
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
  function getUpdateManager(): UpdateManager;
  /*----------------------更新END-----------------------*/

  /*---------------------多线程-----------------------*/
  interface Worker {
    postMessage(message: any): void;
    onMessage(callback: (message: any) => void): void;
    terminate(): void;
  }
  function createWorker(scriptPath: string): Worker;
  /*---------------------多线程END-----------------------*/

  /*--------------------监控--------------------*/
  //------------监控数据上报
  function reportMonitor(name: string, value: string): void;
  /*--------------------监控END----------------*/

  /*--------------调试接口--------------------*/
  //---------打卡/关闭调试
  interface SetEnableDebugOptions extends BaseOptions {
    enableDebug: boolean;
    success(errMsg?: string): void;
  }
  function setEnableDebug(options: SetEnableDebugOptions): void;
  /*--------------调试接口END--------------------*/

  /*--------------------日志------------------*/
  interface LogManager {
    log(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    debug(message?: any, ...optionalParams: any[]): void;
  }
  function getLogManager(): LogManager;
  /*--------------------日志END------------------*/
}
