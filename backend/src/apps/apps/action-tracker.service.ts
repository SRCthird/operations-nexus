import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ActionTrackerService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDto: Prisma.App_ActionTrackerCreateInput) {
    return this.databaseService.app_ActionTracker.create({
      data: createDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.app_ActionTracker.findMany();
    }
    return this.databaseService.app_ActionTracker.findMany({
      where: { 
        ID: {in: ids},
      }
    });
  }

  async findOne(id: number) {
    return this.databaseService.app_ActionTracker.findFirst({
      where: {ID: id}
    });
  }

  async update(id: number, updateDto: Prisma.App_ActionTrackerCreateInput) {
    return this.databaseService.app_ActionTracker.update({
      where: {ID: id},
      data: updateDto
    })
  }

  async remove(id: number) {
    return this.databaseService.app_ActionTracker.delete({
      where: {ID: id}
    });
  }
}
