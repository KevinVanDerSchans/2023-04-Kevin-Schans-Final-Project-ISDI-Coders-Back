import mongoose from "mongoose";
import { user, passwd, db } from '../config.js';

export const dbConnect = () => {
  const url = `mongodb+srv://${user}:${passwd}@cluster0.amuzluj.mongodb.net/${db}?retryWrites=true&w=majority`;
  return mongoose.connect(url);
}
