import createDebug from "debug";
import { Repository } from "./repository";
import { DanceCourse } from "../entities/danceCourse";
import { DanceCourseModel } from "./danceCourse.mongo.model";
import { HttpError } from "../types/http.error";

const debug = createDebug("FP: DanceCourseRepo");

export class DanceCourseRepo implements Repository<DanceCourse> {
  constructor() {
    debug("Instantiated");
  };

  async query(): Promise<DanceCourse[]> {
    const allData = await DanceCourseModel.find().exec()
    return allData;
  };

  async queryById(id: string): Promise<DanceCourse> {
    const result = await DanceCourseModel.findById(id).exec();

    if (result === null)
      throw new HttpError(404, 'Not found', 'No danceCourse found with this id');
    return result;
  };

  async search({
    key,
    value,
  } : {
    key: string,
    value: unknown;
  }): Promise<DanceCourse[]> {
    const result = await DanceCourseModel.find({ [key]: value }).exec();
    return result;
  };

  async create(data: Omit<DanceCourse, 'id'>): Promise<DanceCourse> {
    const newDanceCourse = await DanceCourseModel.create(data);
    return newDanceCourse;
  };

  async patch(id: string, data: Partial<DanceCourse>): Promise<DanceCourse> {
    const newDanceCourse = await DanceCourseModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();

    if (newDanceCourse === null)
      throw new HttpError(404, 'Not found', 'Wrong id for the update');
    return newDanceCourse;
  };

  async delete(id: string): Promise<void> {
    const result = await DanceCourseModel.findByIdAndDelete(id).exec();

    if (result === null)
      throw new HttpError(404, 'Not found', 'Wrong id for the delete');
  };
}
