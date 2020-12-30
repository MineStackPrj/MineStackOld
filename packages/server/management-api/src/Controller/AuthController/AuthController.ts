import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, requestBody } from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/dts/results';

import { TYPES } from '@/TYPES';
import { AuthService } from '@service/AuthService/AuthService';
import { LoggerService } from '@service/LoggerService/LoggerService';

@controller('/auth', TYPES.middleware.access)
export class AuthController extends BaseHttpController {
  public constructor(
    @inject(TYPES.service.logger) private readonly logger: LoggerService,
    @inject(TYPES.service.auth) private readonly auth: AuthService
  ) {
    super();
  }

  /**
   * JWTトークンを発行する
   * @param body {userId: string, password: string}
   */
  @httpPost('/login', TYPES.middleware.localAuth)
  public async login(@requestBody() body: any): Promise<JsonResult> {
    this.logger.trace('AuthController', 'login');

    const userId = body.userId;
    const token = await this.auth.jwtSign(userId);
    return this.json(
      {
        userId: userId,
        token : token
      },
      200
    );
  }
}
