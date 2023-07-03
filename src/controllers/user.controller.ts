import { NextFunction, Response, Request } from 'express';
import { User } from '../entities/user.js';
import { UserRepo } from '../repository/user.mongo.repository.js';
import { Controller } from './controller.js';
import createDebug from 'debug';
import { AuthServices, PayloadToken } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
import { LoginResponse } from '../types/response.api.js';
const debug = createDebug('PF: UserController');

export class UserController extends Controller<User> {
  constructor(protected repo: UserRepo) {
    super();
    debug('Instantiated UserController');
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const password = await AuthServices.hash(req.body.password);
      req.body.password = password;
      req.body.role = "user"
      res.status(201);
      res.send(await this.repo.create(req.body));
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      if (!req.body.userName || !req.body.password) {
        throw new HttpError(400, 'Bad request', 'User or password invalid');
      }
      
      let data = await this.repo.search({
        key: 'userName',
        value: req.body.userName,
      });
      
      if (!data.length) {
        data = await this.repo.search({
          key: 'email',
          value: req.body.email,
        });
      }
      
      if (!data.length) {
        throw new HttpError(400, 'Bad request', 'User or password invalid(2)');
      }

      const validUser = await AuthServices.compare(
        req.body.password,
        data[0].password
      );

      if (!validUser) {
        throw new HttpError(400, 'Bad request', 'User or password invalid');
      }

      const payload: PayloadToken = {
        id: data[0].id,
        userName: data[0].userName,
        role: data[0].role,
      };

      const token = AuthServices.createJWT(payload);
      const response: LoginResponse = {
        token,
        user: data[0],
      };
      resp.send(response);
    } catch (error) {
      next(error);
    }
  }
}
