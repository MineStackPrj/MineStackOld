import { inject, injectable } from 'inversify';

import { AlreadyInUsedPortError } from '../../Error/AlreadyInUsedPortError';
import { LoggerService } from '../../Service/LoggerService/LoggerService';
import { MongooseService } from '../../Service/MongooseService/MongooseService';
import { TYPES } from '../../TYPES';
import { IMinecraftServer } from './types/IMinecraftServer';
import { MinecraftServerCreateDto } from './types/MinecraftServerDto';
import { MinecraftServerModel } from './types/MinecraftServerModel';

/**
 * MinecraftServerテーブルを制御
 */
@injectable()
export class MinecraftServerTable {
  public constructor(
    @inject(TYPES.service.logger) private readonly logger: LoggerService,
    @inject(TYPES.service.mongoose) private readonly mongooseService: MongooseService
  ) {}

  /**
   * マイクラサーバーの追加
   * @param dto 作成DTO
   * @throws {DatabaseError}
   */
  public async insert(dto: MinecraftServerCreateDto): Promise<IMinecraftServer> {
    this.logger.trace('MinecraftServerTable', 'insert');
    try {
      const obj: MinecraftServerCreateDto = {
        name      : dto.name,
        version   : dto.version,
        serverType: dto.serverType,
        properties: dto.properties,
        serverPort: dto.serverPort
      };
      const result = await this.mongooseService.insert(MinecraftServerModel, obj);
      this.logger.info('MinecraftServer Created Success');
      return result;
    } catch (err) {
      this.logger.error('MinecraftServerTable:', err.message);
      if (err.duplicate) {
        if (err.message.includes('serverPort')) {
          throw new AlreadyInUsedPortError();
        }
      }
      throw err;
    }
  }

  /**
   * マイクラサーバーを取得
   * @param minecraftId マイクラサーバーID
   * @throws {NotFoundError}
   * @throws {DatabaseError}
   */
  public async get(minecraftId: string): Promise<IMinecraftServer> {
    this.logger.trace('MinecraftServerTable', 'get');
    try {
      const result = await this.mongooseService.findById(MinecraftServerModel, minecraftId);
      this.logger.info('MinecraftServer Get Success');
      return result;
    } catch (err) {
      this.logger.error('MinecraftServerTable:', err.message);
      throw err;
    }
  }
}
