import { Schema, model } from 'mongoose';
import { DanceCourse } from '../entities/danceCourse.js';

const danceCourseSchema = new Schema<DanceCourse>({
  courseName: {
    type: String,
    required: true,
    unique: false,
  },
  level: {
    type: String,
    required: true,
    unique: false,
  },
  priceCourse: {
    type: String,
    required: true,
    unique: false,
  },
  totalClasses: {
    type: String,
    required: true,
    unique: false,
  },
  initialDescription: {
    type: String,
    required: true,
    unique: false,
  },
  largeDescription: {
    type: String,
    required: true,
    unique: false,
  },
  image: {
    type: {
      urlOriginal: { type: String },
      url: { type: String },
      mimetype: { type: String },
      size: { type: Number },
    },
    required: false,
    unique: false,
  },
  video: {
    type: {
      urlOriginal: { type: String },
      url: { type: String },
      mimetype: { type: String },
      size: { type: Number },
    },
    required: false,
    unique: false,
  },
});

danceCourseSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

export const DanceCourseModel = model('DanceCourse', danceCourseSchema, 'danceCourses');
