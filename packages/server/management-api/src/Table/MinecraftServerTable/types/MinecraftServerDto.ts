import { CreateDto, UpdateDto } from '@table/Dto';

import { IMinecraftServer } from './IMinecraftServer';

export type MinecraftServerCreateDto = CreateDto<
  IMinecraftServer,
  'name' | 'version' | 'serverType' | 'properties' | 'serverPort'
>;
export type MinecraftServerUpdateDto = UpdateDto<IMinecraftServer, 'name' | 'properties' | 'serverPort'>;
