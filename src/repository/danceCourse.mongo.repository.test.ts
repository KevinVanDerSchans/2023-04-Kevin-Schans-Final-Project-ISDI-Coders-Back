import { DanceCourse } from "../entities/danceCourse";
import { DanceCourseModel } from "./danceCourse.mongo.model";
import { DanceCourseRepo } from "./danceCourse.mongo.repository";
import { HttpError } from "../types/http.error";

jest.mock('./danceCourse.mongo.model');

describe('Given the DanceCourseRepo class', () => {

  const mockRepo = new DanceCourseRepo();

  describe('When it is instantiated', () => {
    test('Then the query method should be used', async () => {

      const mockData = [{}];
      const exec = jest.fn().mockResolvedValueOnce(mockData);

      DanceCourseModel.find = jest.fn().mockReturnValueOnce({
        exec,
      });

      const result = await mockRepo.query();
      expect(DanceCourseModel.find).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual(mockData)
    });

    test('Then the queryById method should be used', async () => {
      const mockDanceCourse = { id: 3, danceCourseName: 'line salsa' };
      const mockId = '3';
      const exec = jest.fn().mockResolvedValue(mockDanceCourse);

      DanceCourseModel.findById = jest.fn().mockReturnValueOnce({
        exec,
      });

      const result = await mockRepo.queryById(mockId);
      expect(DanceCourseModel.findById).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual(mockDanceCourse);
    });

    test('Then the queryById method should throw an error if the id is not found', async () => {
      const error = new HttpError(404, 'Not found', 'No danceCourse found with this id');
      const mockId = '6';

      const exec = jest.fn().mockReturnValueOnce(null);

      DanceCourseModel.findById = jest.fn().mockReturnValueOnce({
        exec,
      });

      await expect(mockRepo.queryById(mockId)).rejects.toThrowError(error);
      expect(DanceCourseModel.findById).toHaveBeenCalled();
    });      

    test('Then the search method should be used', async () => {
      const mockDanceCourse = [{ id: '5', danceCourseName: 'line salsa' }];

      const exec = jest.fn().mockResolvedValueOnce(mockDanceCourse);

      DanceCourseModel.find = jest.fn().mockReturnValueOnce({
        exec,
      });

      const result = await mockRepo.search({
        key: 'danceCourseName',
        value: 'line salsa',
      });

      expect(DanceCourseModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockDanceCourse);
    });

    test('Then the create method should be used', async () => {
      const mockDanceCourse = {
        id: '3',
        courseName: 'line salsa',
        level: 'beginner',
        priceCourse: '29,99',
        totalClasses: 10,
        initialDescription: 'From New York and Los Angeles. Is danced in couples and in line. If you like creativity and speed… this is for you!',
        largeDescription: 'Line salsa is a Latin dance style that originated in the United States. It is danced in a line, which means that the dancers follow an imaginary line.',
        image: {},
      } as unknown as DanceCourse;

      (DanceCourseModel.create as jest.Mock).mockResolvedValueOnce(mockDanceCourse);
      const result = await mockRepo.create(mockDanceCourse);
      expect(DanceCourseModel.create).toHaveBeenCalled();
      expect(result).toEqual(mockDanceCourse);
    });

    test('Then the patch method should be used', async () => {
      const mockId = '10';
      const mockDanceCourse = {
        id: '10',
        courseName: 'line salsa',
      };

      const mockPatchDanceCourse = {
        id: '10',
        courseName: 'cuban salsa',
      };

      const exec = jest.fn().mockReturnValueOnce(mockPatchDanceCourse);

      DanceCourseModel.findByIdAndUpdate = jest.fn().mockReturnValueOnce({
        exec,
      });

      const result = await mockRepo.patch(mockId, mockDanceCourse);
      expect(DanceCourseModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual(mockPatchDanceCourse);
    });

    test('Then the patch method should throw an error if the new DanceCourse is null', async () => {
      const error = new HttpError(404, 'Not found', 'Wrong id for the update');
      const mockId = '4';
      const mockDanceCourse = {} as Partial<DanceCourse>;

      const exec = jest.fn().mockReturnValueOnce(null);
      DanceCourseModel.findByIdAndUpdate = jest.fn().mockReturnValueOnce({
        exec,
      });

      await expect(mockRepo.patch(mockId, mockDanceCourse)).rejects.toThrowError(
        error,
      );
      expect(DanceCourseModel.findByIdAndUpdate).toHaveBeenCalled();
    });

    test('Then the delete method should be used', async () => {
      const mockId = '5';
      const exec = jest.fn();

      DanceCourseModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
        exec,
      });

      await mockRepo.delete(mockId);
      expect(DanceCourseModel.findByIdAndDelete).toHaveBeenCalled();
    });

    test('Then the delete method should throw an error when the id is not found', async () => {
      const error = new HttpError(404, 'Not found', 'Wrong id for the delete');
      const mockId = '2';

      const exec = jest.fn().mockReturnValueOnce(null);
      DanceCourseModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
        exec,
      });

      await expect(mockRepo.delete(mockId)).rejects.toThrowError(error);
      expect(DanceCourseModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });
});
