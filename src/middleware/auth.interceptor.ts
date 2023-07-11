import createDebug from "debug";
import { DanceCourseRepo } from "../repository/danceCourse.mongo.repository.js";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../types/http.error.js";
import { AuthServices } from "../services/auth.js";
import { UserRepo } from "../repository/user.mongo.repository.js";

const debug = createDebug("PF: AuthInterceptor");

export class AuthInterceptor {
  constructor(protected danceCourseRepo: DanceCourseRepo, protected userRepo: UserRepo) {
    debug("Instantiated");
  }
  logged(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.get("Authorization");

      if (!authHeader) {
        throw new HttpError(401, "Not authorized", "Not Authorization header");
      }

      if (!authHeader.startsWith('Bearer')) {
        throw new HttpError(401, "Not authorized", "Not authorization header");
      }

      const token = authHeader.slice(7);
      const payload = AuthServices.verifyJWTGettingPayload(token);

      next();
    } catch (error) {
      next(error);
    }
  }

  async authorizedDanceCourses(req: Request, res: Response, next: NextFunction) {

    try {
      if (!req.body.tokenPayload) {
        throw new HttpError(498, 'Token not found', 'Token not found in Authorized interceptor');
      }

      const { id: danceCourseId } = req.params;

      const danceCourse = await this.danceCourseRepo.queryById(danceCourseId);
      next();
      return danceCourse;
      
    } catch (error) {
      next(error);
    }
  }

  async authorizedUserRole(req: Request, resp: Response, next: NextFunction) {

    try {
      if (!req.body.tokenPayload) {
        throw new HttpError(
          498,
          'This token doesnt exits',
          'Token not found in authorized interceptor'
        );
      }

      const { id } = req.body.tokenPayload;

      const user = await this.userRepo.queryById(id);

      if (user.role !== 'admin') {
        throw new HttpError(
          401,
          'Unauthorized',
          'You dont have the required permissions to perform this action'
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
