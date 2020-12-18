import { Document } from 'mongoose';

import { IMinecraftServer } from './IMinecraftServer';

export interface IMinecraftServerDocument extends IMinecraftServer, Document {}
