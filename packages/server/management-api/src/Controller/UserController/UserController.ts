import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, httpPost, requestBody, requestParam } from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/dts/results';

import { TYPES } from '@/TYPES';
import { LoggerService } from '@service/LoggerService/LoggerService';
import { UserService } from '@service/UserService/UserService';
import { IUser } from '@table/UserTable/types/IUser';

@controller('/users', TYPES.middleware.access)
export class UserController extends BaseHttpController {
  public constructor(
    @inject(TYPES.service.logger) private readonly logger: LoggerService,
    @inject(TYPES.service.user) private readonly user: UserService
  ) {
    super();
  }

  /**
   * ユーザー情報を取得する
   * パスワードは除く
   * @param id ユーザーID
   */
  @httpGet('/:userId', TYPES.middleware.jwtAuth, TYPES.validator.user.get)
  public async getUser(@requestParam('userId') id: string): Promise<JsonResult> {
    this.logger.trace('UserController', 'getUser');
    return this.user.getUser(id).then(user => {
      const retUser: Omit<IUser, 'password'> | null = user ? { userId: user.userId } : null;
      return this.json(retUser, 200);
    });
  }

  /**
   * 全ユーザー情報を取得する
   * パスワードは除く
   * @param id ユーザーID
   */
  @httpGet('/', TYPES.middleware.jwtAuth)
  public async getAllUser(): Promise<JsonResult> {
    this.logger.trace('UserController', 'getAllUser');
    return this.user.getAllUsers().then(users => {
      const retUsers = users.map(user => {
        return { userId: user.userId };
      });
      return this.json(retUsers, 200);
    });
  }

  /**
   * ユーザー情報を登録する
   * @param user IUserオブジェクト
   */
  @httpPost('/', TYPES.middleware.jwtAuth, TYPES.validator.user.create)
  public async createUser(@requestBody() user: IUser): Promise<JsonResult> {
    this.logger.trace('UserController', 'createUser');
    const result = await this.user.createUser(user.userId, user.password);
    if (result) {
      return this.json(result, 201);
    } else {
      return this.json(null, 409);
    }
  }
}
