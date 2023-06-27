import { User } from '../entities/user';
import { UserModel } from './user.mongo.model';
import { UserRepo } from './user.mongo.repository';

jest.mock('./user.mongo.model.js');

describe('Given the UserRepo class', () => {
  describe('When I instantiate it', () => {
    const repo = new UserRepo();

    test('Then method create should be used', async () => {
      const mockUser = {} as User;
      UserModel.create = jest.fn().mockReturnValueOnce(mockUser);
      const result = await repo.create({} as Omit<User, 'id'>);
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    test('Then method search should be user', async () => {
      const mockUser = { key: 'username', value: 'Erik' };
      const mockResult = [{ username: 'Erik', password: '12345' }];
      const exec = jest.fn().mockResolvedValue(mockResult);
      UserModel.find = jest.fn().mockReturnValueOnce({
        exec,
      });

      const result = await repo.search(mockUser);

      expect(UserModel.find).toHaveBeenCalledWith({
        [mockUser.key]: mockUser.value,
      });
      expect(result).toEqual(mockResult);
    });
  });
});
