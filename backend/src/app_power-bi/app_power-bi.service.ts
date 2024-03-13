import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AppPowerBiService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAppPowerBiDto: Prisma.App_PowerBICreateInput) {
    return this.databaseService.app_PowerBI.create({
      data: createAppPowerBiDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.app_PowerBI.findMany();
    }
    return this.databaseService.app_PowerBI.findMany({
      where: { 
        ID: {in: ids},
      }
    });
  }

  async findOne(id: number) {
    return this.databaseService.app_PowerBI.findFirst({
      where: {ID: id}
    });
  }

  async update(id: number, updateAppPowerBiDto: Prisma.App_PowerBIUpdateInput) {
    return this.databaseService.app_PowerBI.update({
      where: {ID: id},
      data: updateAppPowerBiDto
    })
  }

  async remove(id: number) {
    return this.databaseService.app_PowerBI.delete({
      where: {ID: id}
    });
  }
}
