import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ActionTrackerService {

  constructor(private readonly databaseService: DatabaseService) {}

  create(createActionTrackerDto: Prisma.action_trackerCreateInput) {
    return this.databaseService.action_tracker.create({
      data: createActionTrackerDto
    });
  }

  findAll() {
    return this.databaseService.action_tracker.findMany();
  }

  findOne(id: number) {
    return this.databaseService.action_tracker.findUnique({
      where: {ID: id},
    });
  }

  update(id: number, updateActionTrackerDto: Prisma.action_trackerUpdateInput) {
    return this.databaseService.action_tracker.update({
      where: {ID: id},
      data: updateActionTrackerDto
    })
  }

  remove(id: number) {
    return this.databaseService.action_tracker.delete({
      where: {ID: id},
    })
  }
}
