import getPort from 'get-port';
import { inject, injectable } from 'inversify';
import os from 'os';
import si from 'systeminformation';

import { AlreadyInUsedPortError } from '@error/AlreadyInUsedPortError';
import { LoggerService } from '@service/LoggerService/LoggerService';
import { TYPES } from '@src/TYPES';
import { InternalServerResponse } from '@type-def-prj/Response/InternalServerResponse';
import { IHostUsageGetResponse } from '@type-def-prj/Response/Success/IHostUsageGetResponse';

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

  /**
   * ホストPCのリソース消費情報を取得
   * @throws {InternalServerResponse}
   */
  public async getUsage(): Promise<IHostUsageGetResponse> {
    try {
      const cores = os.cpus().map(c => {
        const total = Object.values(c.times).reduce((a, b) => a + b, 0);
        return c.times.user / total * 100;
      });
      const totalCpuUsed = cores.map(m => m * (1 / cores.length)).reduce((a, b) => a + b, 0);
      const mem = await si.mem();
      const memUsed = mem.used / mem.total * 100;
      const result: IHostUsageGetResponse = {
        cpu: {
          used: totalCpuUsed,
          cores
        },
        mem: {
          total: mem.total,
          used : memUsed
        }
      };
      return result;
    } catch {
      throw new InternalServerResponse();
    }
  }
}
