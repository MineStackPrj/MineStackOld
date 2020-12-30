import { MinecraftServerCreateDto } from '@table/MinecraftServerTable/types/MinecraftServerDto';

export type MinecraftServiceCreateRequest = MinecraftServerCreateDto & { startServer: boolean };
