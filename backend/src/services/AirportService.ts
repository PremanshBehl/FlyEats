import { BaseService } from './BaseService';
import { AirportRepository } from '../repositories/AirportRepository';
import { calculateDistance } from '../lib/utils';
export class AirportService extends BaseService {
  private repo = new AirportRepository();
  public async getAll() { return { airports: await this.repo.findAll() }; }
  public async getNearest(lat: number, lng: number) {
    const airports = await this.repo.findAllForDistance();
    let nearest = null; let minD = Infinity;
    for (const a of airports) {
      if (a.latitude && a.longitude) {
        const d = calculateDistance(lat, lng, a.latitude, a.longitude);
        if (d < minD) { minD = d; nearest = { ...a, distance: Math.round(d * 10) / 10 }; }
      }
    }
    if (!nearest) throw new Error('No airports found');
    return { airport: nearest };
  }
  public async getById(id: string) {
    const a = await this.repo.findById(id);
    if (!a) throw new Error('Airport not found');
    return { airport: a };
  }
}
