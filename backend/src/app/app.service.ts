import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AppService {

  constructor(readonly databaseService: DatabaseService) { }

  async create(data: Prisma.AppCreateInput & {
    powerBI?: Prisma.App_PowerBICreateWithoutAppInput;
    powerPoint?: Prisma.App_PowerPointCreateWithoutAppInput;
    actionTracker?: Prisma.App_ActionTrackerCreateWithoutAppInput;
  }) {
    return this.databaseService.app.create({
      data: {
        name: data.name,
        type: data.type,
        powerBI: data.powerBI ? {
          create: data.powerBI
        } : undefined,
        powerPoint: data.powerPoint ? {
          create: data.powerPoint
        } : undefined,
        actionTracker: data.actionTracker ? {
          create: data.actionTracker
        } : undefined,
      },
      include: {
        powerBI: true,
        powerPoint: true,
        actionTracker: true,
      }
    });
  }

  async findAll() {
    return this.databaseService.app.findMany({
      include: {
        powerBI: true,
        powerPoint: true,
        actionTracker: true,
      }
    });
  }

  async findOne(id: number) {
    return this.databaseService.app.findUnique({
      where: { id },
      include: {
        powerBI: true,
        powerPoint: true,
        actionTracker: true,
      }
    });
  }

  async update(id: number, updateDto: Prisma.AppUpdateInput & { 
    powerBI?: Prisma.App_PowerBIUpdateInput | Prisma.App_PowerBICreateInput;
    powerPoint?: Prisma.App_PowerPointUpdateInput | Prisma.App_PowerPointCreateInput;
    actionTracker?: Prisma.App_ActionTrackerUpdateInput | Prisma.App_ActionTrackerCreateInput;
  }) {
    const data: Prisma.AppUpdateInput = {
      name: updateDto.name,
      type: updateDto.type,
    };

    if (updateDto.type === "PowerBI" && updateDto.powerBI) {
      data.powerBI = {
        upsert: {
          update: updateDto.powerBI as Prisma.App_PowerBIUpdateInput,
          create: updateDto.powerBI as Prisma.App_PowerBICreateInput,
        }
      };
      await this.databaseService.app_PowerPoint.deleteMany({where: {id}});
      await this.databaseService.app_ActionTracker.deleteMany({where: {id}});
    }

    if (updateDto.type === "PowerPoint" && updateDto.powerPoint) {
      await this.databaseService.app_PowerBI.deleteMany({where: {id}});
      data.powerPoint = {
        upsert: {
          update: updateDto.powerPoint as Prisma.App_PowerPointUpdateInput,
          create: updateDto.powerPoint as Prisma.App_PowerPointCreateInput,
        }
      };
      await this.databaseService.app_ActionTracker.deleteMany({where: {id}});
    }

    if (updateDto.type === "ActionTracker" && updateDto.actionTracker) {
      await this.databaseService.app_PowerBI.deleteMany({where: {id}});
      await this.databaseService.app_PowerPoint.deleteMany({where: {id}});
      data.actionTracker = {
        upsert: {
          update: updateDto.actionTracker as Prisma.App_ActionTrackerUpdateInput,
          create: updateDto.actionTracker as Prisma.App_ActionTrackerCreateInput,
        }
      };
    }

    return this.databaseService.app.update({
      where: { id },
      data,
      include: {
        powerBI: true,
        powerPoint: true,
        actionTracker: true,
      }
    });
  }

  async remove(id: number) {
    await this.databaseService.$transaction(async prisma => {
      await prisma.app_PowerBI.deleteMany({
        where: { id }
      });
      await prisma.app_PowerPoint.deleteMany({
        where: { id }
      });
      await prisma.app_ActionTracker.deleteMany({
        where: { id }
      });
    });

    return this.databaseService.app.delete({
      where: { id },
      include: {
        powerBI: true,
        powerPoint: true,
        actionTracker: true,
      }
    });
  }
}
