import { BaseRepository } from './BaseRepository';
export class DishRepository extends BaseRepository {
  public async findPopular(limit: number) { return this.prisma.menuItem.findMany({ where: { isAvailable: true }, include: { outlet: { include: { airport: true } } }, take: limit }); }
}
