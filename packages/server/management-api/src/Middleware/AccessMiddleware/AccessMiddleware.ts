import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import { TYPES } from '@/TYPES';
import { LoggerService } from '@service/LoggerService/LoggerService';

@injectable()
export class AccessMiddleware extends BaseMiddleware {
  public constructor(@inject(TYPES.service.logger) private readonly logger: LoggerService) {
    super();
  }

  public handler(req: Request, res: Response, next: NextFunction): void {
    this.logger.info(`${req.method} ${req.url}`);
    this.logger.debug(`${req.method} ${req.url} Headers`, req.headers);
    this.logger.debug(`${req.method} ${req.url} Query  `, req.query);
    this.logger.debug(`${req.method} ${req.url} Params `, req.params);
    this.logger.debug(`${req.method} ${req.url} Body   `, req.body);
    next();
  }
}
