


interface GetRecorderManagerResult {
  audioSources: string[];
}
interface GetRecorderManagerOptions extends BaseOptions {
  success: (res?: GetRecorderManagerResult) => void;
}

function getRecorderManager(): void;





interface LogManager {
  log(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  debug(message?: any, ...optionalParams: any[]): void;
}
function getLogManager(): LogManager;



//-------内存
function onMemoryWarning(callback: (res: { level: number }) => void): void;