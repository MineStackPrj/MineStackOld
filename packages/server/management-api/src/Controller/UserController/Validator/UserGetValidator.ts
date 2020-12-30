import { ApiRequestValidator } from '@middleware/ValidatorMiddleware/ApiRequestValidator';
import { ValidatorMiddleware } from '@middleware/ValidatorMiddleware/ValidatorMiddleware';

export class UserGetValidator extends ValidatorMiddleware {
  /**
   * Bodyのバリデーター
   */
  protected bodyValidator = undefined;

  /**
   * Paramのバリデーター
   */
  protected paramValidator: ApiRequestValidator<any> = {
    userId: {
      type     : 'string',
      required : true,
      minLength: 6,
      maxLength: 30
    }
  };

  /**
   * Queryのバリデーター
   */
  protected queryValidator = undefined;

  /**
   * Headerのバリデーター
   */
  protected headerValidator = undefined;
}
