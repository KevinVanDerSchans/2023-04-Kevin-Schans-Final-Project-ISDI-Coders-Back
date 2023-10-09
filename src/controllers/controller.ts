import { NextFunction, Response, Request } from 'express';
import { Repository } from '../repository/repository';
import { ApiResponse } from '../types/response.api';

export abstract class Controller<T extends { id: string | number }> {
  public repo!: Repository<T>;

  async query(req: Request, resp: Response, next: NextFunction) {
    try {
      const items = await this.repo.query();
      const response: Partial<ApiResponse> = {
        items,
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

  async update(req: Request, resp: Response, next: NextFunction) {

    try {
      resp.status(202);
      resp.send(await this.repo.patch(req.params.id, req.body));

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

  async delete(req: Request, resp: Response, next: NextFunction) {

    try {
      resp.status(204);
      resp.send(await this.repo.delete(req.params.id));
      
    } catch (error) {
      next(error);
    }
  }
}
