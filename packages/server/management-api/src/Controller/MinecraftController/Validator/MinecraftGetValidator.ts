import { ApiRequestValidator } from '../../../Middleware/ValidatorMiddleware/ApiRequestValidator';
import { ValidatorMiddleware } from '../../../Middleware/ValidatorMiddleware/ValidatorMiddleware';

export class MinecraftGetValidator extends ValidatorMiddleware {
  /**
   * Bodyのバリデーター
   */
  protected bodyValidator = undefined;

  /**
   * Paramのバリデーター
   */
  protected paramValidator: ApiRequestValidator<{ minecraftId: string }> = {
    minecraftId: {
      type    : 'string',
      required: true,
      regExp  : /^[0-9a-f]{24}$/
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
