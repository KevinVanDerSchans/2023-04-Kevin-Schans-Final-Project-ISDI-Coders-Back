import { Schema, model } from 'mongoose';
import { DanceCourse } from '../entities/danceCourse';

const danceCourseSchema = new Schema<DanceCourse>({
  courseName: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    required: true,
  },
  priceCourse: {
    type: String,
    required: true,
  },
  totalClasses: {
    type: Number,
    required: true,
  },
  initialDescription: {
    type: String,
    required: true,
  },
  largeDescription: {
    type: String,
    required: true,
  },
  image: {
    type: {
      urlOriginal: { type: String },
      url: { type: String },
      mimetype: { type: String },
      size: { type: Number },
    },
    required: true,
    unique: true,
  }
});

danceCourseSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.__id;
    delete returnedObject.password;
  },
});

export const DanceCourseModel = model('DanceCourse', danceCourseSchema, 'danceCourses');
