import { CreateDto, UpdateDto } from '../../Dto';
import { IUser } from './IUser';

export type UserCreateDto = CreateDto<IUser, 'email' | 'password' | 'username'>;
export type UserUpdateDto = UpdateDto<IUser, 'email' | 'password' | 'username'>;
