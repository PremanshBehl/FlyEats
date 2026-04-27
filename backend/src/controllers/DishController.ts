import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { DishService } from '../services/DishService';
export class DishController extends BaseController {
  private service = new DishService();
  public getPopular = async (req: Request, res: Response) => { try { return this.sendSuccess(res, await this.service.getPopular(Number(req.query.limit || 14))); } catch (e) { return this.sendError(res, e); } };
}
