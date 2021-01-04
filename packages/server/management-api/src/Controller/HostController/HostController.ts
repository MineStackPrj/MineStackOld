import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, interfaces, response } from 'inversify-express-utils';

import { HostService } from '@service/HostService/HostService';
import { LoggerService } from '@src/Service/LoggerService/LoggerService';
import { TYPES } from '@src/TYPES';
import { IResponse, SuccessResponse } from '@type-def-prj/Response';
import { InternalServerResponse } from '@type-def-prj/Response/InternalServerResponse';

@controller('/host', TYPES.middleware.access)
export class HostController implements interfaces.Controller {
  public constructor(
    @inject(TYPES.service.logger) private readonly logger: LoggerService,
    @inject(TYPES.service.host) private readonly host: HostService
  ) {}

  @httpGet('/usage')
  public async getUsage(@response() res: Response): Promise<any> {
    this.logger.trace('HostController', 'getUsage');
    let response: IResponse<any>;
    try {
      const result = await this.host.getUsage();
      response = new SuccessResponse(result);
    } catch (err) {
      response = new InternalServerResponse();
    }

    res.status(response.code);
    res.send(response.toString());
  }
}
