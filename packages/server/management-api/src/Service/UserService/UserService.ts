import * as bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';

import { passwordSalt } from '../../config';
import { IUser } from '../../Table/UserTable/types/IUser';
import { UserTable } from '../../Table/UserTable/UserTable';
import { TYPES } from '../../TYPES';
import { LoggerService } from '../LoggerService/LoggerService';

@injectable()
export class UserService {
  public constructor(
    @inject(TYPES.service.logger) private readonly logger: LoggerService,
    @inject(TYPES.table.user) private readonly userTable: UserTable
  ) {}
  public createUser(email: string, username: string, password: string): void {
    const hashedPassword: string = bcrypt.hashSync(password, passwordSalt);
    this.logger.info('UserService', 'createUser', email, username, hashedPassword);
    this.userTable.insert({ email: email, username: username, password: hashedPassword });
  }
  public async getUser(email: string): Promise<IUser | null> {
    this.logger.info('UserService', 'getUser', email);
    return this.userTable.read(email);
  }
}
