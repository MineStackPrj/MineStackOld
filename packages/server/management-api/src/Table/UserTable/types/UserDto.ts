import { CreateDto, UpdateDto } from '../../Dto';
import { IUser } from './IUser';

export type UserCreateDto = CreateDto<IUser, 'password' | 'userId'>;
export type UserUpdateDto = UpdateDto<IUser, 'password' | 'userId'>;
