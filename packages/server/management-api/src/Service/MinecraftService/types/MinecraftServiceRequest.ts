import { MinecraftServerCreateDto } from '../../../Table/MinecraftServerTable/types/MinecraftServerDto';

export type MinecraftServiceCreateRequest = MinecraftServerCreateDto & { startServer: boolean };
