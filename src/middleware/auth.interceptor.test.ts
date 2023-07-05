import { Request, Response, NextFunction } from "express";
import { AuthServices, PayloadToken } from "../services/auth";
import { AuthInterceptor } from "./auth.interceptor";
import { DanceCourseRepo } from "../repository/danceCourse.mongo.repository";
import { HttpError } from "../types/http.error";

jest.mock('../services/auth');

describe('Given the AuthInterceptor middleware', () => {
  describe('When it is instantiated', () => {

    const mockRepo = {} as unknown as DanceCourseRepo;
    const mockPayload = {} as PayloadToken;
    const req = {
      body: { tokenPayload: mockPayload },
    } as unknown as Request;
    const res = {} as unknown as Response;
    const next = jest.fn() as NextFunction;
    const interceptor = new AuthInterceptor(mockRepo);

    test('Then it should be used', () => {
      req.get = jest.fn().mockReturnValueOnce('Bearer test');
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
        'Not Authorization header'
      );
      req.get = jest.fn().mockReturnValueOnce('No Bearer');
      (AuthServices.verifyJWTGettingPayload as jest.Mock).mockResolvedValueOnce(
        mockPayload
      );
      interceptor.logged(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When it is instantiated', () => {
    const mockDanceCourseRepo = {
      queryById: jest.fn(),
    } as unknown as DanceCourseRepo;
    
    const mockPayload = { id: '6' } as PayloadToken;
    const mockDanceCourseId = '2';
    const req = {
      body: { tokenPayload: mockPayload },
      params: { id: mockDanceCourseId },
    } as unknown as Request;

    const res = {} as unknown as Response;
    const next = jest.fn() as NextFunction;
    const authInterceptor = new AuthInterceptor(mockDanceCourseRepo);

    test('Then the authorizedDanceCourses method should be used', async () => {
      authInterceptor.authorizedDanceCourses(req, res, next);
      await expect(mockDanceCourseRepo.queryById).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    test('Then the authorizedDanceCourses method should throw an error when there is no token in the body', () => {
      const error = new HttpError(
        498,
        'Token not found',
        'Token not found in Authorized interceptor'
      );
      
      const mockPayload = null;
      const req = {
        body: { tokenPayload: mockPayload },
      } as unknown as Request;

      authInterceptor.authorizedDanceCourses(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
})
