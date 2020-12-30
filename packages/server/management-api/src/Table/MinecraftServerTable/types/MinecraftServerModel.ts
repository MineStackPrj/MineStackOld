import mongoose, { Schema } from 'mongoose';

import { MinecraftServerTypeList, MinecraftServerVersionList } from '@type-def-prj/Minecraft';

import { MongooseSchemaDefinition } from '../../MongooseSchema';
import { IMinecraftServer } from './IMinecraftServer';
import { IMinecraftServerDocument } from './IMinecraftServerDocument';

const schema: MongooseSchemaDefinition<IMinecraftServer> = {
  name: {
    type     : String,
    required : true,
    minlength: 1,
    maxlength: 30
  },
  version: {
    type    : String,
    enum    : MinecraftServerVersionList,
    required: true
  },
  serverType: {
    type    : String,
    enum    : MinecraftServerTypeList,
    required: true
  },
  serverPort: {
    type    : Number,
    required: true,
    unique  : true
  },
  properties: {
    type    : Object,
    required: true
  },
  created: {
    type    : Date,
    required: true,
    default : Date.now
  },
  updated: {
    type    : Date,
    required: true,
    default : Date.now
  }
};

export const MinecraftServerModel = mongoose.model<IMinecraftServerDocument>(
  'MinecraftServerTable',
  new Schema(schema)
);
