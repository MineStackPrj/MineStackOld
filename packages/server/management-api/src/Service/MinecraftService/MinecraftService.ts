import { inject, injectable } from 'inversify';

import { MinecraftServerStatus } from '@type-def-prj/Minecraft';
import { IMinecraftCreateResponse } from '@type-def-prj/Response/Success/IMinecraftCreateResponse';

import { AlreadyInUsedPortError } from '../../Error/AlreadyInUsedPortError';
import { InternalServerError } from '../../Error/InternalServerError';
import { MinecraftServerTable } from '../../Table/MinecraftServerTable/MinecraftServerTable';
import { IMinecraftServer } from '../../Table/MinecraftServerTable/types/IMinecraftServer';
import { NotFoundError } from '../../Table/NotFoundError';
import { TYPES } from '../../TYPES';
import { DockerService } from '../DockerService/DockerService';
import { HostService } from '../HostService/HostService';
import { LoggerService } from '../LoggerService/LoggerService';
import { MinecraftServiceCreateRequest } from './types/MinecraftServiceRequest';

/**
 * MinecraftServerを制御するサービス
 */
@injectable()
export class MinecraftService {
  /**
   * コンストラクト
   * @param minecraftServerTable MinecraftServerTable
   */
  public constructor(
    @inject(TYPES.table.minecraftServer) private readonly minecraftServerTable: MinecraftServerTable,
    @inject(TYPES.service.logger) private readonly logger: LoggerService,
    @inject(TYPES.service.docker) private readonly docker: DockerService,
    @inject(TYPES.service.host) private readonly host: HostService
  ) {}

  /**
   * マイクラサーバーの作成
   * @param obj 作成時に必要なデータ
   * @throws {AlreadyInUsedPortError}
   * @throws {InternalServerError}
   */
  public async create(obj: MinecraftServiceCreateRequest): Promise<IMinecraftCreateResponse> {
    this.logger.trace('MinecraftService', 'create');
    try {
      // ポートが使用可能か
      const port = await this.host.usePort(obj.serverPort);
      obj.serverPort = port;

      // テーブルにサーバー情報を格納
      const server = await this.minecraftServerTable.insert(obj);

      // 必要があれば、マイクラサーバーを起動
      if (obj.startServer) {
        // Docker上でマイクラサーバーを作成
        await this.docker.create(server);

        // マイクラサーバーを起動
        await this.docker.start(server);
      }
      return { minecraftId: server._id.toString() };
    } catch (err) {
      this.logger.error('MinecraftService', err.message);
      if (err instanceof AlreadyInUsedPortError) {
        throw err;
      } else {
        throw new InternalServerError();
      }
    }
  }

  /**
   * マイクラサーバーを取得
   * @param minecraftId マイクラサーバーID
   * @throws {NotFoundError}
   * @throws {InternalServerError}
   */
  public async get(minecraftId: string): Promise<IMinecraftServer> {
    this.logger.trace('MinecraftService', 'get');
    try {
      return await this.minecraftServerTable.get(minecraftId);
    } catch (err) {
      this.logger.error('MinecraftService', err.message);
      if (err instanceof NotFoundError) {
        throw err;
      } else {
        throw new InternalServerError();
      }
    }
  }

  /**
   * マイクラサーバーの状態を取得
   * @param minecraftId マイクラサーバーID
   * @throws {NotFoundError}
   * @throws {InternalServerError}
   */
  public async getStatus(minecraftId: string): Promise<MinecraftServerStatus> {
    this.logger.trace('DockerService', 'getStatus');
    try {
      // サーバーの存在チェック
      await this.minecraftServerTable.get(minecraftId);

      // コンテナの状態を確認
      return await this.docker.getStatus(minecraftId);
    } catch (err) {
      this.logger.error('MinecraftService', err.message);
      if (err instanceof NotFoundError) {
        throw err;
      } else {
        throw new InternalServerError();
      }
    }
  }
}
