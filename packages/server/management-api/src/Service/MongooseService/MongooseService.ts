import { inject, injectable } from 'inversify';
import mongoose, { Document } from 'mongoose';

import { LoggerService } from '@service/LoggerService/LoggerService';
import { TYPES } from '@src/TYPES';
import { DatabaseError } from '@table/MongooseError';
import { NotFoundError } from '@table/NotFoundError';

/**
 * MongoDBのトランザクション管理サービス
 */
@injectable()
export class MongooseService {
  /**
   * コンストラクト
   */
  public constructor(@inject(TYPES.service.logger) private readonly logger: LoggerService) {}

  /**
   * データベースに追加
   * @param model Model
   * @param obj Obj
   * @throws {DatabaseError}
   */
  public async insert<T extends Document>(model: new (...args: any) => T, obj: any): Promise<T> {
    this.logger.trace('MongooseService', 'insert');
    try {
      const m = new model(obj);
      const result = await m.save().catch(err => {
        throw new DatabaseError(err.message);
      });
      this.logger.info('MongooseService Created Success');
      return result;
    } catch (err) {
      this.logger.error('MongooseService:', err.message, err.detailMessage);
      throw err;
    }
  }

  /**
   * データベースから検索
   * @param model Model
   * @param id ID
   * @throws {NotFoundError}
   * @throws {DatabaseError}
   */
  public async findById<T extends Document>(model: mongoose.Model<T>, id: string): Promise<T> {
    this.logger.trace('MongooseService', 'findById');
    try {
      const result = await model
        .findById(id)
        .exec()
        .catch(err => {
          throw new DatabaseError(err.message);
        });
      if (result === null) {
        throw new NotFoundError();
      }
      this.logger.info('MongooseService Get Success');
      return result;
    } catch (err) {
      this.logger.error('MongooseService:', err.message, err.detailMessage);
      throw err;
    }
  }
}
