import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { AuthService } from '../services/AuthService';
import { RegisterSchema, LoginSchema, RefreshSchema } from '../interfaces/auth.interface';
import { z } from 'zod';
import { AuthRequest } from '../middleware/authMiddleware';

export class AuthController extends BaseController {
  private authService: AuthService;
  constructor() { super(); this.authService = new AuthService(); }

  public register = async (req: Request, res: Response) => {
    try {
      const data = RegisterSchema.parse(req.body);
      const result = await this.authService.register(data);
      return this.sendSuccess(res, result, 201);
    } catch (error: any) { return this.sendError(res, error, 400); }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const data = LoginSchema.parse(req.body);
      const result = await this.authService.login(data);
      return this.sendSuccess(res, result);
    } catch (error: any) { return this.sendError(res, error, 401); }
  };

  public refresh = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = RefreshSchema.parse(req.body);
      const result = await this.authService.refresh(refreshToken);
      return this.sendSuccess(res, result);
    } catch (error: any) { return this.sendError(res, error, 401); }
  };

  public getMe = async (req: AuthRequest, res: Response) => {
    try {
      const result = await this.authService.getMe(req.user!.userId);
      return this.sendSuccess(res, result);
    } catch (error: any) { return this.sendError(res, error, 404); }
  };

  public logout = async (req: Request, res: Response) => {
    return this.sendSuccess(res, { message: 'Logged out successfully' });
  };
}
