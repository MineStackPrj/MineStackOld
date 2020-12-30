import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import { AuthService } from '@service/AuthService/AuthService';
import { LoggerService } from '@service/LoggerService/LoggerService';
import { TYPES } from '@src/TYPES';

@injectable()
export class LocalAuthMiddleware extends BaseMiddleware {
  public handler = this.auth.LocalAuthMiddleware;
  public constructor(
    @inject(TYPES.service.logger) private readonly logger: LoggerService,
    @inject(TYPES.service.auth) private readonly auth: AuthService
  ) {
    super();
  }
}
