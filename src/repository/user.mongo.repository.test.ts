import { User } from '../entities/user';
import { HttpError } from '../types/http.error';
import { UserModel } from './user.mongo.model';
import { UserRepo } from './user.mongo.repository'

jest.mock('./user.mongo.model.js');

describe('Given the UserRepo class', () => {
  describe('When it is instantiated', () => {
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

    test('Then method search should update the user', async () => {
      const mockId = '12345';
      const mockData = { username: 'Erik', password: 'abc123' };
      const mockUpdatedUser = { _id: mockId, ...mockData };
      const exec = jest.fn().mockResolvedValue(mockUpdatedUser);
      UserModel.findByIdAndUpdate = jest.fn().mockReturnValueOnce({
        exec,
      });

      const result = await repo.patch(mockId, mockData);

      expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockId,
        mockData,
        { new: true }
      );
      expect(result).toEqual(mockUpdatedUser);
    });

    test('When update fails due to wrong id, should throw HttpError', async () => {
      const mockId = '12345';
      const mockData = { username: 'Erik', password: 'abc123' };
      const exec = jest.fn().mockResolvedValue(null);
      UserModel.findByIdAndUpdate = jest.fn().mockReturnValueOnce({
        exec,
      });

      try {
        await repo.patch(mockId, mockData);
        expect(true).toBe(false);
      } catch (error: any) {
        expect(error).toBeInstanceOf(HttpError);
        expect(error.status).toBe(404);
        expect(error.statusMessage).toBe('Not found');
        expect(error.message).toBe('This is not a valid ID for the query');
      }
    });
  });
});
