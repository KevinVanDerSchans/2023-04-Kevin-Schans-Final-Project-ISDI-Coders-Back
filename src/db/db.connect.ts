import mongoose from 'mongoose';
import { user, password, dbName } from '../config.js';
import debug from 'debug';

export const dbConnect = (env?: string) => {
  const finalEnv = env || process.env.NODE_ENV;
  const finalDBName = finalEnv === 'test' ? dbName + '_Testing' : dbName;

  const url = `mongodb+srv://${user}:${password}@cluster0.amuzluj.mongodb.net/${finalDBName}?retryWrites=true&w=majority`;
  debug(url);
  return mongoose.connect(url);
}
