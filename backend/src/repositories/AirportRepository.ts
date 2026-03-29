import { BaseRepository } from './BaseRepository';
export class AirportRepository extends BaseRepository {
  public async findAll() { return this.prisma.airport.findMany({ include: { gates: true, outlets: { where: { isActive: true }, take: 5 } }, orderBy: { name: 'asc' } }); }
  public async findAllForDistance() { return this.prisma.airport.findMany({ select: { id: true, name: true, code: true, city: true, latitude: true, longitude: true } }); }
  public async findById(id: string) { return this.prisma.airport.findUnique({ where: { id }, include: { gates: true, outlets: { where: { isActive: true }, include: { menuItems: { where: { isAvailable: true }, take: 3 } } } } }); }
}
