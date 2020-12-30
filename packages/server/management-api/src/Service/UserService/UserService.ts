import * as bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';

import { passwordSalt } from '@/config';
import { TYPES } from '@/TYPES';
import { LoggerService } from '@service/LoggerService/LoggerService';
import { IUser } from '@table/UserTable/types/IUser';
import { UserTable } from '@table/UserTable/UserTable';

/**
 * ユーザー情報を管理するサービス
 */
@injectable()
export class UserService {
  private readonly saltRound: number = 5;
  public constructor(
    @inject(TYPES.service.logger) private readonly logger: LoggerService,
    @inject(TYPES.table.user) private readonly userTable: UserTable
  ) {}

  /**
   * ユーザーを追加する
   * @param userId ユーザーID
   * @param password パスワード
   */
  public createUser(userId: string, password: string): Promise<IUser | null> {
    this.logger.trace('UserService', 'createUser', userId);

    // 追加済みかチェック
    return this.getUser(userId).then(user => {
      // 存在しない場合追加
      if (!user) {
        // パスワードハッシュ取得
        const hashedPassword: string = bcrypt.hashSync(password + passwordSalt, this.saltRound);

        //登録
        return this.userTable.insert({ userId: userId, password: hashedPassword });
      } else {
        return null;
      }
    });
  }

  /**
   * ユーザー情報を取得する
   * @param userId ユーザーID
   */
  public async getUser(userId: string): Promise<IUser | null> {
    this.logger.trace('UserService', 'getUser', userId);
    return this.userTable.read(userId).then(records => {
      return records.length > 0 ? records[0] : null;
    });
  }

  /**
   * 全ユーザー情報を取得する
   */
  public async getAllUsers(): Promise<IUser[]> {
    this.logger.trace('UserService', 'getAllUser');
    return this.userTable.read(null).then(records => {
      return records.map(record => {
        return { userId: record.userId, password: record.password };
      });
    });
  }

  /**
   * パスワードが正しいかチェックする
   * @param userId ユーザーID
   * @param password パスワード（未ハッシュ）
   */
  public async comparePassword(userId: string, password: string): Promise<boolean | null> {
    this.logger.trace('UserService', 'comparePassword', userId);
    return this.getUser(userId).then(user => {
      if (user) {
        return bcrypt.compareSync(password + passwordSalt, user.password);
      } else {
        return null;
      }
    });
  }
}
