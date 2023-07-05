/* eslint-disable no-unused-vars */
import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import { FileMiddleware } from './files';
import { HttpError } from '../types/http.error';

type MockMulter = jest.Mock & { diskStorage: jest.Mock };

jest.mock('multer', () => {
  const multer: MockMulter = jest.fn().mockImplementation(() => ({
    single: jest.fn(),
  })) as MockMulter;

  multer.diskStorage = jest.fn().mockImplementation(
    (options: {
      destination: 'public/uploads';

      filename: (req: object, file: object, cb: () => void) => void;
    }) => {
      options.filename({}, { originalname: 'image.jpg' }, () => null);
    }
  );

  return multer;
});

jest.mock('sharp', () => {
  const sharp = jest.fn().mockResolvedValue({
    resize: jest.fn().mockReturnThis(),
    webp: jest.fn().mockReturnThis(),
    toFormat: jest.fn().mockReturnThis(),
    toFile: jest.fn().mockResolvedValue({
      format: 'webp',
      size: 1000,
    }),
  });

  return sharp;
});

describe('Given a FileMiddleware class', () => {
  const filesMiddleware = new FileMiddleware();
  describe('When the singleFileStore method is used', () => {
    test('Then it should call multer to store a single file', () => {

      filesMiddleware.singleFileStore();
      expect(multer).toHaveBeenCalled();
      expect(multer.diskStorage).toHaveBeenCalled();
    });
  });

  describe('When method saveImage is used with valid data', () => {
    const req = {
      body: {},
      file: {
        filename: 'image.jpg',
        originalname: 'image.jpg',
        mimetype: 'image/webp',
      },
      path: '/path',

    } as Request;
    const resp = {} as unknown as Response;
    const next = jest.fn() as NextFunction;

    test('Then it should call next without parameters', async () => {
      req.get = jest.fn().mockReturnValueOnce('host');

      await filesMiddleware.saveImage(req, resp, next);
      expect(next).toHaveBeenCalled();
      expect(req.file).toEqual({
        originalname: 'image.jpg',
        filename: 'image.jpg',
        mimetype: 'image/webp',
      });
    });
  });

  describe('When method saveImage is used with NOT valid data', () => {
    const req = {} as Request;
    const resp = {} as unknown as Response;
    const next = jest.fn() as NextFunction;

    test('Then it should call next with the error', () => {
      const error = new HttpError(
        406,
        'Not Acceptable',
        'Not valid image file'
      );

      filesMiddleware.saveImage(req, resp, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When method optimization is used...', () => {
    test('Then it should optimizated...', async () => {
      const req = {
        file: {
          filename: 'image.jpg',
          originalname: '',
          mimetype: 'image/webp',
          size: 1000,
          path: 'public/uploads',
        },
        
      } as Request;
      const resp = {} as unknown as Response;
      const next = jest.fn() as NextFunction;

      req.file!.originalname = 'image.jpg';

      await filesMiddleware.optimization(req, resp, next);

      expect(next).toHaveBeenCalled();
      expect(req.file?.originalname).toBe('image.jpg');
      expect(req.file?.filename).toBe('image.jpg');
      expect(req.file?.mimetype).toBe('image/webp');
      expect(req.file?.path).toContain('public/uploads');
    });
  });
});
