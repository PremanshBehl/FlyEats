import { Response } from 'express';

export abstract class BaseController {
  protected sendSuccess(res: Response, data: any, statusCode: number = 200): Response {
    return res.status(statusCode).json(data);
  }

  protected sendError(res: Response, error: any, statusCode: number = 500): Response {
    const message = error instanceof Error ? error.message : error;
    return res.status(statusCode).json({ error: message });
  }
}
