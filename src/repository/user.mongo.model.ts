import { Schema, SchemaTypes, model } from 'mongoose';
import { User } from '../entities/user.js';
import { Image } from '../types/image.js';

const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  favouriteDanceCourses: [
    {
      type: SchemaTypes.ObjectId, ref: 'DanceCourse'
    }
  ],
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.passwd;
  },
});

export const UserModel = model('User', userSchema, 'Users');
