import { User } from '../entities/user';
import { Repository } from './repository';
import { HttpError } from '../types/http.error';
import { UserModel } from './user.mongo.model';
import createDebug from 'debug';
const debug = createDebug('PF: UserMongoRepository');

export class UserRepo implements Repository<User> {
  constructor() {
    debug('Instantiated', UserModel);
  }

  async query(): Promise<User[]> {
    const data = await UserModel.find().exec();
    return data;
  }

  async queryById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (result === null)
      throw new HttpError(
        404,
        'Not found',
        'This is not a valid ID for the query'
      );

    return result;
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const newUser = await UserModel.create(data);
    return newUser;
  }

  async search({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }): Promise<User[]> {
    const result = await UserModel.find({ [key]: value }).exec();
    return result;
  }

  async patch(id: string, data: Partial<User>): Promise<User> {
    const newUser = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    if (newUser === null)
      throw new HttpError(
        404,
        'Not found',
        'This is not a valid ID for the query'
      );
    return newUser;
  }

  async delete(id: string): Promise<void> {
    const result = await UserModel.findByIdAndDelete(id).exec();
    if (result === null)
      throw new HttpError(
        404,
        'Not found',
        'This is not a valid ID for the query'
      );
  }
}
