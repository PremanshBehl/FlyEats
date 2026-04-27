import { PrismaClient } from '@prisma/client';
import { prisma } from '../lib/prisma';

export abstract class BaseRepository {
  protected prisma: PrismaClient = prisma;
}
