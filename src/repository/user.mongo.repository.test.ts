import { User } from '../entities/user.js';
import { UserModel } from './user.mongo.model.js';
import { UserRepo } from './user.mongo.repository.js';

jest.mock('./user.mongo.model.js');
describe('Given the UserRepo class', () => {

  const repo = new UserRepo();

  describe('When it is instantiated and implements the Repo', () => {
    test('Then method query should be used', async () => {
      const exec = jest.fn().mockResolvedValue([]);
      UserModel.find = jest.fn().mockReturnValueOnce({
        exec,
      });

      const result = await repo.query();
      expect(UserModel.find).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    test('Then method queryById should be used', async () => {
      const mockId = '5';
      const exec = jest.fn().mockResolvedValue({});
      UserModel.findById = jest.fn().mockReturnValueOnce({
        exec,
      });

      const result = await repo.queryById(mockId);
      expect(UserModel.findById).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual({});
    });

    test('Then method post should be used', async () => {
      const mockData = {} as Omit<User, 'id'>;
      UserModel.create = jest.fn().mockReturnValueOnce({} as User);
      const result = await repo.create(mockData);
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toEqual({});
    });

    test('Then method delete should be used', async () => {
      const mockId = '2';
      const exec = jest.fn().mockResolvedValue({} as User);
      UserModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
        exec,
      });

      await repo.delete(mockId);
      expect(UserModel.findByIdAndDelete).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
    });

    test('Then method patch should be used', async () => {
      const mockId = { id: '12' };
      const mockData = 'test';
      const mockReturnUser = {} as User;
      const exec = jest.fn().mockReturnValue(mockReturnUser);
      UserModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec,
        new: true,
      });

      const result = await repo.patch(mockData, mockId);
      expect(UserModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual({});
    });

    test('Then method search should be used', async () => {
      const exec = jest.fn().mockResolvedValueOnce([]);
      UserModel.find = jest.fn().mockReturnValue({
        exec,
      });

      const result = await repo.search({} as { key: string; value: unknown });
      expect(UserModel.find).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});

describe('Given the UserRepo class', () => {

  const repo = new UserRepo();

  describe('When it is instantiated and queryById method is called but the id is not found', () => {
    test('Then it should throw an error', async () => {
      const mockId = '12345';
      const exec = jest.fn().mockResolvedValueOnce(null);
      UserModel.findById = jest.fn().mockReturnValueOnce({
        exec,
      });

      await expect(repo.queryById(mockId)).rejects.toThrow();
    });
  });

  describe('When it is instantiated and update method is called but the id is not found', () => {
    test('Then it should throws an error', async () => {
      const mockId = '12345';
      const mockUser = {} as User;
      const exec = jest.fn().mockResolvedValueOnce(null);
      UserModel.findByIdAndUpdate = jest.fn().mockReturnValueOnce({
        exec,
      });

      await expect(repo.patch(mockId, mockUser)).rejects.toThrow();
    });
  });

  describe('When it is instantiated and delete method is called but the id is not found', () => {
    test('Then it should throws an error', async () => {
      const mockId = '12345';
      const exec = jest.fn().mockResolvedValueOnce(null);
      UserModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
        exec,
      });
      
      await expect(repo.delete(mockId)).rejects.toThrow();
    });
  });
});
