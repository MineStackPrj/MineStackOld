import { ApiRequestValidator } from '@middleware/ValidatorMiddleware/ApiRequestValidator';
import { ValidatorMiddleware } from '@middleware/ValidatorMiddleware/ValidatorMiddleware';
import { IUser } from '@table/UserTable/types/IUser';

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
