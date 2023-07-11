import { NextFunction, Request, Response } from 'express';
import { AuthServices } from '../services/auth';
import { PayloadToken } from '../services/auth';
import { AuthInterceptor } from './auth.interceptor';
import { DanceCourseRepo } from '../repository/danceCourse.mongo.repository';
import { HttpError } from '../types/http.error';
import { UserRepo } from '../repository/user.mongo.repository';

jest.mock('../services/auth');

describe('Given the AuthInterceptor middleware', () => {
  describe('When it is instantiated', () => {
    const mockRepo = {} as unknown as DanceCourseRepo;
    const mockUserRepo = {} as unknown as UserRepo;
    const mockPayload = {} as PayloadToken;
    const req = {
      body: { tokenPayload: mockPayload },
    } as unknown as Request;
    const res = {} as unknown as Response;
    const next = jest.fn() as NextFunction;
    const interceptor = new AuthInterceptor(mockRepo, mockUserRepo);

    test('Then the logged method should be used', () => {
      req.get = jest.fn().mockReturnValueOnce('Test');
      (AuthServices.verifyJWTGettingPayload as jest.Mock).mockResolvedValueOnce(
        mockPayload
      );
      interceptor.logged(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    test('Then the logged method should throw an error when there is no authHeader', () => {
      const error = new HttpError(
        401,
        'Not Authorized',
        'Not Authorization header'
      );
      (AuthServices.verifyJWTGettingPayload as jest.Mock).mockResolvedValueOnce(
        mockPayload
      );
      interceptor.logged(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    test('Then the logged method should throw an error when authHeader does not start with Bearer', () => {
      const error = new HttpError(
        401,
        'Not Authorized',
        'Not authorization header'
      );
      req.get = jest.fn().mockReturnValueOnce('There are no Bearer');
      (AuthServices.verifyJWTGettingPayload as jest.Mock).mockResolvedValueOnce(
        mockPayload
      );
      interceptor.logged(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
