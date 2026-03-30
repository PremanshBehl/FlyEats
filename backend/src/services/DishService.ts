import { BaseService } from './BaseService';
import { DishRepository } from '../repositories/DishRepository';
export class DishService extends BaseService {
  private repo = new DishRepository();
  public async getPopular(limit: number) { return { dishes: (await this.repo.findPopular(limit)).map((i: any) => ({ ...i, outletName: i.outlet.name, airportName: i.outlet.airport.name })) }; }
}
