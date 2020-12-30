import getPort from 'get-port';
import { inject, injectable } from 'inversify';

import { TYPES } from '@/TYPES';
import { AlreadyInUsedPortError } from '@error/AlreadyInUsedPortError';
import { LoggerService } from '@service/LoggerService/LoggerService';

/**
 * Hostサーバーを制御
 */
@injectable()
export class HostService {
  /**
   * コンストラクト
   */
  public constructor(@inject(TYPES.service.logger) private readonly logger: LoggerService) {}

  /**
   * 指定したポートが使用可能か。
   * 0を指定した場合、ランダムな使用可能なポートを返却
   * @param port 取得したいポート番号
   * @throws {AlreadyInUsedPortError}
   */
  public async usePort(port: number): Promise<number> {
    this.logger.trace('HostService', 'usePort');
    const result = port === 0 ? await getPort() : await getPort({ port });
    if (port !== 0 && result !== port) {
      throw new AlreadyInUsedPortError();
    }
    this.logger.debug('Get Port:', result);
    return result;
  }
}
