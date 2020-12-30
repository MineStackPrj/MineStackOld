import mongoose, { Schema } from 'mongoose';

import { MongooseSchemaDefinition } from '../../MongooseSchema';
import { IUser } from './IUser';
import { IUserDocument } from './IUserDocument';

const schema: MongooseSchemaDefinition<IUser> = {
  userId: {
    type     : String,
    required : true,
    minlength: 1,
    maxlength: 30
  },
  password: {
    type     : String,
    required : true,
    minlength: 1,
    maxlength: 256
  }
};

export const UserModel = mongoose.model<IUserDocument>('UserTable', new Schema(schema));
