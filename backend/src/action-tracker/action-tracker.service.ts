import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ActionTrackerService {

  constructor(private readonly databaseService: DatabaseService) {}

  create(createActionTrackerDto: Prisma.Nexus_ActionTrackerCreateInput) {
    return this.databaseService.nexus_ActionTracker.create({
      data: createActionTrackerDto
    });
  }

  findAll() {
    return this.databaseService.nexus_ActionTracker.findMany();
  }

  findOne(id: number) {
    return this.databaseService.nexus_ActionTracker.findUnique({
      where: {ID: id},
    });
  }

  update(id: number, updateActionTrackerDto: Prisma.Nexus_ActionTrackerUpdateInput) {
    return this.databaseService.nexus_ActionTracker.update({
      where: {ID: id},
      data: updateActionTrackerDto
    })
  }

  remove(id: number) {
    return this.databaseService.nexus_ActionTracker.delete({
      where: {ID: id},
    })
  }
}
