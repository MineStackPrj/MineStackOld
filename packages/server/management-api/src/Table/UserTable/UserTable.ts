import { inject, injectable } from 'inversify';

import { InternalServerError } from '../../Error/InternalServerError';
import { LoggerService } from '../../Service/LoggerService/LoggerService';
import { TYPES } from '../../TYPES';
import { DatabaseError } from '../MongooseError';
import { IUser } from './types/IUser';
import { UserCreateDto } from './types/UserDto';
import { UserModel } from './types/UserModel';

@injectable()
export class UserTable {
  public constructor(@inject(TYPES.service.logger) private readonly logger: LoggerService) {}

  public async insert(dto: UserCreateDto): Promise<IUser> {
    this.logger.trace('UserTable', 'insert');
    let result: IUser;
    try {
      const obj: UserCreateDto = {
        email   : dto.email,
        username: dto.username,
        password: dto.password
      };
      const model = new UserModel(obj);
      result = await model.save().catch(err => {
        throw new DatabaseError(err.message);
      });
      this.logger.info('User Created Success.');
    } catch (err) {
      this.logger.error('UserTable:', err.message);
      throw new InternalServerError();
    }
    return result;
  }
  public async read(email: string): Promise<IUser | null> {
    this.logger.trace('UserTable', 'read');
    let result: IUser | null;
    try {
      result = await UserModel.findOne({ email: email })
        .exec()
        .catch(err => {
          throw new DatabaseError(err.message);
        });
      this.logger.info('User read Success.');
    } catch (err) {
      this.logger.error('UserTable:', err.message);
      throw new InternalServerError();
    }
    return result;
  }
}
