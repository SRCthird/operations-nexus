import { HttpException, Injectable } from '@nestjs/common';
import { Apps, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

export type appCreateDto = Prisma.AppCreateInput & {
  powerBI?: Prisma.App_PowerBICreateWithoutAppInput & { id?: number };
  powerPoint?: Prisma.App_PowerPointCreateWithoutAppInput & { id?: number };
  actionTracker?: Prisma.App_ActionTrackerCreateWithoutAppInput & { id?: number };
};

export type appUpdateDto = Prisma.AppUpdateInput & {
  id?: number;
  powerBI?: Prisma.App_PowerBIUpdateInput | Prisma.App_PowerBICreateInput & { id?: number };
  powerPoint?: Prisma.App_PowerPointUpdateInput | Prisma.App_PowerPointCreateInput & { id?: number };
  actionTracker?: Prisma.App_ActionTrackerUpdateInput | Prisma.App_ActionTrackerCreateInput & { id?: number };
};

export type appCreateOrUpdateInput = Prisma.AppCreateInput & {
  id?: number;
  powerBI?: Prisma.App_PowerBICreateWithoutAppInput | Prisma.App_PowerBIUpdateWithoutAppInput & { id?: number };
  powerPoint?: Prisma.App_PowerPointCreateWithoutAppInput | Prisma.App_PowerPointUpdateWithoutAppInput & { id?: number };
  actionTracker?: Prisma.App_ActionTrackerCreateWithoutAppInput | Prisma.App_ActionTrackerUpdateWithoutAppInput & { id?: number };
};

@Injectable()
export class AppService {

  constructor(readonly databaseService: DatabaseService) { }

  async create(createDto: appCreateDto, connectId?: number) {
    const item = await this.databaseService.app.findFirst({
      where: { 
        name: createDto.name 
      }
    });

    if (item) {
      return new HttpException('App already exists', 400);
    }

    if (createDto.powerBI && createDto.powerBI.id === 0) {
      delete createDto.powerBI.id;
    }
    if (createDto.powerPoint && createDto.powerPoint.id === 0) {
      delete createDto.powerPoint.id;
    }
    if (createDto.actionTracker && createDto.actionTracker.id === 0) {
      delete createDto.actionTracker.id;
    }
    const data: Prisma.AppCreateInput = {
      name: createDto.name,
      type: createDto.type,
      powerBI: createDto.type === Apps.PowerBI ? {
        create: createDto.powerBI
      } : undefined,
      powerPoint: createDto.type === Apps.PowerPoint ? {
        create: createDto.powerPoint
      } : undefined,
      actionTracker: createDto.type === Apps.ActionTracker ? {
        create: createDto.actionTracker
      } : undefined,
    };

    if (connectId) {
      data.templates = {
        connect: {
          id: connectId
        }
      };
    }

    return this.databaseService.app.create({
      data,
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

  async findByName(name: string) {
    return this.databaseService.app.findUnique({
      where: { name },
      include: {
        powerBI: true,
        powerPoint: true,
        actionTracker: true,
      }
    });
  }

  async findByType(type: string) {
    return this.databaseService.app.findMany({
      where: { type: type as Apps },
      include: {
        powerBI: true,
        powerPoint: true,
        actionTracker: true,
      }
    });
  }

  async update(id: number, updateDto: appUpdateDto, connectId?: number) {
    const data: Prisma.AppUpdateInput = {
      name: updateDto.name,
      type: updateDto.type,
    };

    if (connectId) {
      data.templates = {
        connect: {
          id: connectId
        }
      };
    }

    if (updateDto.type === "PowerBI" && updateDto.powerBI) {
      const { id: _, ...powerBI } = updateDto.powerBI as any;
      data.powerBI = {
        upsert: {
          update: powerBI as Prisma.App_PowerBIUpdateInput,
          create: powerBI as Prisma.App_PowerBICreateInput,
        }
      };
      await this.databaseService.app_PowerPoint.deleteMany({ where: { id } });
      await this.databaseService.app_ActionTracker.deleteMany({ where: { id } });
    }

    if (updateDto.type === "PowerPoint" && updateDto.powerPoint) {
      const { id: _, ...powerPoint } = updateDto.powerPoint as any;
      await this.databaseService.app_PowerBI.deleteMany({ where: { id } });
      data.powerPoint = {
        upsert: {
          update: powerPoint as Prisma.App_PowerPointUpdateInput,
          create: powerPoint as Prisma.App_PowerPointCreateInput,
        }
      };
      await this.databaseService.app_ActionTracker.deleteMany({ where: { id } });
    }

    if (updateDto.type === "ActionTracker" && updateDto.actionTracker) {
      const { id: _, ...actionTracker } = updateDto.actionTracker as any;
      await this.databaseService.app_PowerBI.deleteMany({ where: { id } });
      await this.databaseService.app_PowerPoint.deleteMany({ where: { id } });
      data.actionTracker = {
        upsert: {
          update: actionTracker as Prisma.App_ActionTrackerUpdateInput,
          create: actionTracker as Prisma.App_ActionTrackerCreateInput,
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
