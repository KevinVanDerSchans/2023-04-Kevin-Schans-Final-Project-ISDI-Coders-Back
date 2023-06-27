import { NextFunction, Response, Request } from 'express';
import { Repository } from '../repository/repository.js';
import { ApiResponse } from '../types/response.api.js';

export abstract class Controller<T extends { id: string | number }> {
  public repo!: Repository<T>;

  async query(_req: Request, resp: Response, next: NextFunction) {
    try {
      const items = await this.repo.query();
      const response: ApiResponse = {
        items,
        page: 1,
        count: items.length,
      };
      resp.send(response);
    } catch (error) {
      next(error);
    }
  }

  async queryById(req: Request, resp: Response, next: NextFunction) {
    try {
      resp.send(await this.repo.queryById(req.params.id));
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, resp: Response, next: NextFunction) {
    try {
      resp.status(201);
      resp.send(await this.repo.create(req.body));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, resp: Response, next: NextFunction) {
    try {
      resp.status(202);
      resp.send(await this.repo.patch(req.params.id, req.body));
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      resp.status(204);
      resp.send(await this.repo.delete(req.params.id));
    } catch (error) {
      next(error);
    }
  }
}
