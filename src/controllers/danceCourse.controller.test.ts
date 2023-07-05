import { Request, Response, NextFunction } from "express";
import { DanceCourseRepo } from "../repository/danceCourse.mongo.repository";
import { DanceCourseController } from "./danceCourse.controller";
import { UserRepo } from "../repository/user.mongo.repository";
describe('Given the DanceCourseController class', () => {
  describe('When it is instantiated', () => {

    const mockUserRepo = {
      queryById: jest.fn(),
      patch: jest.fn(),
    } as unknown as UserRepo;

    const mockDanceCourse = {
      query: jest.fn().mockReturnValue([]),
      queryById: jest.fn().mockReturnValue({ danceCourses: [] }),
      search: jest.fn(),
      create: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    } as unknown as DanceCourseRepo;

    const req = {
      params: { id: '1' },
      body: { tokenPayload: {} },
    } as unknown as Request;

    const res = {
      send: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;
    const controller = new DanceCourseController(mockDanceCourse, mockUserRepo)

    test('Then the query method should be used', async () => {
      await controller.query(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockDanceCourse.query).toHaveBeenCalled();
    });

    test('Then the queryById method should be used', async () => {
      await controller.queryById(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockDanceCourse.queryById).toHaveBeenCalled();
    });

    test('Then the post method should be called', async () => {
      await controller.create(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockDanceCourse.create).toHaveBeenCalled();
    });

    test('Then the patch method should be used', async () => {
      await controller.update(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(mockDanceCourse.patch).toHaveBeenCalled();
    });

    test('Then the delete method should be used', async () => {
      await controller.delete(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockDanceCourse.delete).toHaveBeenCalled();
    });
  });

  describe('When methods are called and return errors', () => {
    const error = new Error('error');
    const mockUserRepo = {} as unknown as UserRepo;
    const mockDanceCourse = {
      query: jest.fn().mockRejectedValue(error),
      queryById: jest.fn().mockRejectedValue(error),
      create: jest.fn().mockRejectedValue(error),
      update: jest.fn().mockRejectedValue(error),
      delete: jest.fn().mockRejectedValue(error),
    } as unknown as DanceCourseRepo;

    const req = {
      params: { id: '3' },
      body: { tokenPayload: {} },
    } as unknown as Request;

    const res = {
      send: jest.fn()
    } as unknown as Response;

    const next = jest.fn() as NextFunction;
    const newController = new DanceCourseController(mockDanceCourse, mockUserRepo);

    test('Then the query method should handle errors', async () => {
      await newController.query(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    test('Then the queryById method should handle errors', async () => {
      await newController.queryById(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    test('Then the post method should handle errors', async () => {
      await newController.create(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    test('Then the patch method should handle errors', async () => {
      await newController.update(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    test('Then the delete method should handle errors', async () => {
      await newController.delete(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
})
