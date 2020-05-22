import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  level: LogLevel = LogLevel.All;
  logWithDate: boolean = true;

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams );
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  writeToLog(msg:string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      let value: string = '';

      if (this.logWithDate) {
        value = new Date() + ' : ';
      }
      value += 'Type: ' + LogLevel[this.level];
      value += ' Message: ' + msg;
      if (params.length) {
        value += ' Extra Info: ' + this.formatParams(params);
      }
      console.log(value);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret: boolean = false;
    if (level >= this.level && 
        level !== LogLevel.Off || 
        this.level === LogLevel.All) {
          ret = true;
    }
    return ret;
  }

  private formatParams(params: any[]): string {
    let ret: string = params.join(",");
    // Is there at least one object in the array?
    if (params.some(p => typeof p == "object")) {
      ret = "";
      // Build comma-delimited string
      for (let item of params) {
        ret += JSON.stringify(item) + ",";
      }
    }
    return ret;
  }
}


export enum LogLevel {
  All = 0,
  Debug = 1, 
  Info = 2, 
  Warn = 3,
  Error = 4,
  Fatal = 5, 
  Off = 6
}