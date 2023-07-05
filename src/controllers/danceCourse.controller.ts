import createDebug from "debug";
import { NextFunction, Request, Response } from "express";
import { Controller } from "./controller.js";
import { DanceCourse } from "../entities/danceCourse.js";
import { DanceCourseRepo } from "../repository/danceCourse.mongo.repository.js";
import { UserRepo } from "../repository/user.mongo.repository.js";
// import { PayloadToken } from "../services/auth.js";

const debug = createDebug("PF: DanceCourseController");

export class DanceCourseController extends Controller<DanceCourse> {
  constructor(public repo: DanceCourseRepo, private userRepo: UserRepo) {
    super();
    debug("Instantiated");
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {

      const newDanceCourse = await this.repo.create(req.body);
      res.status(201);
      res.send(newDanceCourse);
    }
    catch (error) {
      next(error);
    }
  }
}
