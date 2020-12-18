import { inject } from 'inversify';
import { controller, httpGet, interfaces, requestParam } from 'inversify-express-utils';

import { LoggerService } from '../../Service/LoggerService/LoggerService';
import { UserService } from '../../Service/UserService/UserService';
import { TYPES } from '../../TYPES';

@controller('/users', TYPES.middleware.access)
export class UserController implements interfaces.Controller {
  public constructor(
    @inject(TYPES.service.logger) private readonly logger: LoggerService,
    @inject(TYPES.service.user) private readonly user: UserService
  ) {}
  @httpGet('/:userId')
  public async getUser(@requestParam('UserId') id: string): Promise<string> {
    return JSON.stringify(await this.user.getUser(id));
  }
}
