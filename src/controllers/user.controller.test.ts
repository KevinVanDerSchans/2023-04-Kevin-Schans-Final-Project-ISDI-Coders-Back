import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repository/user.mongo.repository';
import { UserController } from './user.controller';
import { HttpError } from '../types/http.error';
import { AuthServices } from '../services/auth';

jest.mock('../services/auth');

describe('Given a user controller', () => {
  const mockPassword = '12345';
  const mockRepo: UserRepo = {
    search: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue({}),
  } as unknown as UserRepo;

  const req = {
    body: {},
  } as unknown as Request;

  const res = {
    send: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;

  describe('When it is instantiated and register method is called', () => {
    test('Then method register should have been called', async () => {
      const controller = new UserController(mockRepo);
      req.body = { userName: 'Erik', email: 'erikvdsd@hotmail.com', mockPassword };
      await controller.register(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.create).toHaveBeenCalled();
    });
  });

  describe('When it is instantiated and login method is called', () => {
    test('Then method login should have been called', async () => {
      const controller = new UserController(mockRepo);
      req.body = { userName: 'Erik', password: '12345' };
      (AuthServices.compare as jest.Mock).mockResolvedValueOnce(true);
      await controller.login(req, res, next);
      expect(mockRepo.search).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalled();
    });
  });
});

describe('Given a user controller', () => {
  const req = {
    body: { user: 'Erik', password: '12345' },
  } as unknown as Request;

  const res = {
    send: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;

  describe('When it is instantiated and register method is called but password is not valid', () => {
    test('Then it should throw an error', async () => {
      const error = new Error('User or password invalid');
      const mockRepo: UserRepo = {
        search: jest.fn().mockRejectedValue(error),
        create: jest.fn().mockRejectedValue(error),
      } as unknown as UserRepo;

      const controller = new UserController(mockRepo);
      await controller.register(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When it is instantiated and login method is called but there is no user or password', () => {
    test('Then it should throw an error', async () => {
      const error = new HttpError(
        400,
        'Bad request',
        'User or password invalid'
      );
      const mockRepo: UserRepo = {
        search: jest.fn().mockRejectedValue(error),
        create: jest.fn().mockRejectedValue(error),
      } as unknown as UserRepo;

      req.body = { user: null, password: null };
      const controller = new UserController(mockRepo);
      await controller.login(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When it is instantiated and login method is called but user or password is not valid', () => {
    test('Then it should throw an error', async () => {
      const error = new HttpError(
        400,
        'Bad request',
        'User or password invalid'
      );

      const mockRepo: UserRepo = {
        search: jest
          .fn()
          .mockResolvedValueOnce([{ user: null, password: '12345' }]),
        create: jest.fn().mockResolvedValueOnce({}),
      } as unknown as UserRepo;
      
      const controller = new UserController(mockRepo);
      req.body = { user: 'Erik', password: '12345' };
      await controller.login(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
  
  describe('When it is instantiated and login method is called but userIsValid is false', () => {
    test('Then it should throw an error', async () => {
      const error = new HttpError(
        404,
        'Bad request',
        'User or password invalid'
      );
      const mockRepo: UserRepo = {
        search: jest
          .fn()
          .mockResolvedValueOnce([{ user: 'Erik', password: '12345' }]),
        create: jest.fn().mockResolvedValueOnce({}),
      } as unknown as UserRepo;

      const controller = new UserController(mockRepo);
      (AuthServices.compare as jest.Mock).mockResolvedValueOnce(false);
      await controller.login(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
