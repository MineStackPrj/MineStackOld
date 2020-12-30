import { inject, injectable } from 'inversify';

import { TYPES } from '@/TYPES';
import { InternalServerError } from '@error/InternalServerError';
import { LoggerService } from '@service/LoggerService/LoggerService';
import { DatabaseError } from '@table/MongooseError';

import { IUser } from './types/IUser';
import { UserCreateDto } from './types/UserDto';
import { UserModel } from './types/UserModel';

/**
 * ユーザー情報テーブルを制御
 */
@injectable()
export class UserTable {
  public constructor(@inject(TYPES.service.logger) private readonly logger: LoggerService) {}

  /**
   * ユーザー情報を追加
   * @param 作成dto
   */
  public async insert(dto: UserCreateDto): Promise<IUser> {
    this.logger.trace('UserTable', 'insert');
    let result: IUser;
    try {
      const obj: UserCreateDto = {
        userId  : dto.userId,
        password: dto.password
      };
      const model = new UserModel(obj);
      result = await model.save().catch(err => {
        throw new DatabaseError(err.message);
      });
      this.logger.info('User Created Success.');
    } catch (err) {
      this.logger.error('UserTable:', err.message);
      throw new InternalServerError();
    }
    return result;
  }

  /**
   * ユーザー情報を読み込み
   * @param userId ユーザーID
   */
  public async read(userId: string | null): Promise<IUser[]> {
    this.logger.trace('UserTable', 'read');
    let result: IUser[] | null;
    try {
      result = await UserModel.find(userId != null ? { userId: userId } : {})
        .exec()
        .catch(err => {
          throw new DatabaseError(err.message);
        });
      this.logger.info('User read Success.');
    } catch (err) {
      this.logger.error('UserTable:', err.message);
      throw new InternalServerError();
    }
    return result;
  }
}
