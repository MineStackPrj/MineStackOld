import { injectable } from 'inversify';
import log4js from 'log4js';

import { LogLevel } from './LogLevel';

/**
 * Logを制御するサービス
 */
@injectable()
export class LoggerService {
  private logger = log4js.getLogger();

  /**
   * コンストラクト
   */
  public constructor() {
    const logLevel: LogLevel = 'trace';
    this.logger.level = logLevel;
  }

  public trace(message: string, ...args: any): void {
    this.logger.trace(message, ...args);
  }

  public debug(message: string, ...args: any): void {
    this.logger.debug(message, ...args);
  }

  public info(message: string, ...args: any): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: any): void {
    this.logger.warn(message, ...args);
  }

  public error(message: string, ...args: any): void {
    this.logger.error(message, ...args);
  }

  public fatal(message: string, ...args: any): void {
    this.logger.fatal(message, ...args);
  }
}
