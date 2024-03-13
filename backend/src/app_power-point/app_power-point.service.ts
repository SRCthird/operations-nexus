import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AppPowerPointService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAppPowerPointDto: Prisma.App_PowerPointCreateInput) {
    return this.databaseService.app_PowerPoint.create({
      data: createAppPowerPointDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.app_PowerPoint.findMany();
    }
    return this.databaseService.app_PowerPoint.findMany({
      where: { 
        ID: {in: ids},
      }
    });
  }

  async findOne(id: number) {
    return this.databaseService.app_PowerPoint.findFirst({
      where: {ID: id}
    });
  }

  async update(id: number, updateAppPowerPointDto: Prisma.App_PowerPointUpdateInput) {
    return this.databaseService.app_PowerPoint.update({
      where: {ID: id},
      data: updateAppPowerPointDto
    })
  }

  async remove(id: number) {
    return this.databaseService.app_PowerPoint.delete({
      where: {ID: id}
    });
  }
}
