import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { AirportService } from '../services/AirportService';
export class AirportController extends BaseController {
  private service = new AirportService();
  public getAll = async (req: Request, res: Response) => { try { return this.sendSuccess(res, await this.service.getAll()); } catch (e) { return this.sendError(res, e); } };
  public getNearest = async (req: Request, res: Response) => { try { return this.sendSuccess(res, await this.service.getNearest(parseFloat(req.query.lat as string), parseFloat(req.query.lng as string))); } catch (e) { return this.sendError(res, e, 400); } };
  public getById = async (req: Request, res: Response) => { try { return this.sendSuccess(res, await this.service.getById(req.params.id)); } catch (e) { return this.sendError(res, e, 404); } };
}
