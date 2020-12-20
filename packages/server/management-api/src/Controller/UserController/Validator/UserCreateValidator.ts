import { ApiRequestValidator } from '../../../Middleware/ValidatorMiddleware/ApiRequestValidator';
import { ValidatorMiddleware } from '../../../Middleware/ValidatorMiddleware/ValidatorMiddleware';
import { IUser } from '../../../Table/UserTable/types/IUser';

export class UserCreateValidator extends ValidatorMiddleware {
  /**
   * Bodyのバリデーター
   */
  protected bodyValidator: ApiRequestValidator<IUser> = {
    userId: {
      type     : 'string',
      required : true,
      minLength: 6,
      maxLength: 30
    },
    password: {
      type     : 'string',
      required : true,
      minLength: 8,
      maxLength: 256
    }
  };

  /**
   * Paramのバリデーター
   */
  protected paramValidator = undefined;

  /**
   * Queryのバリデーター
   */
  protected queryValidator = undefined;

  /**
   * Headerのバリデーター
   */
  protected headerValidator = undefined;
}
