import createDebug from "debug";
import { Controller } from "./controller.js";
import { DanceCourse } from "../entities/danceCourse.js";
import { DanceCourseRepo } from "../repository/danceCourse.mongo.repository.js";
import { UserRepo } from "../repository/user.mongo.repository.js";
import { NextFunction, Request, Response } from "express";
import { PayloadToken } from "../services/auth.js";

const debug = createDebug("PF: DanceCourseController");

export class DanceCourseController extends Controller<DanceCourse> {
  constructor(public repo: DanceCourseRepo, private userRepo: UserRepo) {
    super();
    debug("Instantiated");
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      // TEMP
    }
    catch (error) {
      next(error);
    }
  }
}
