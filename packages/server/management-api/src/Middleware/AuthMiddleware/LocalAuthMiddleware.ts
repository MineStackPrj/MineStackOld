import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import { TYPES } from '@/TYPES';
import { AuthService } from '@service/AuthService/AuthService';
import { LoggerService } from '@service/LoggerService/LoggerService';

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
