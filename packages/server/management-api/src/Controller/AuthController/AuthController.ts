import { BaseHttpController, controller, httpPost, requestBody } from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/dts/results';

@controller('/auth')
export class AuthController extends BaseHttpController {

  /**
   *
   */
  public constructor(
  ) {
    super();
  }

  /**
   * JWTトークンを発行する
   * @param body {userId: string, password: string}
   */
  @httpPost('/login')
  public async login(@requestBody() body: any): Promise<JsonResult> {

    return this.json(
      { },
      200
    );
  }
}
