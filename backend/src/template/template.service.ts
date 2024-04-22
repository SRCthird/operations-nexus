import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppService, appCreateDto, appCreateOrUpdateInput, appUpdateDto } from 'src/app/app.service';
import { DatabaseService } from 'src/database/database.service';

export type templateCreateDto = Prisma.TemplateCreateInput & {
  apps: appCreateOrUpdateInput[];
};

export type templateUpdateDto = Prisma.TemplateUpdateInput & {
  apps: appUpdateDto[];
};

@Injectable()
export class TemplateService {

  constructor(
    readonly databaseService: DatabaseService,
    readonly appService: AppService
  ) { }

  async create(data: templateCreateDto) {
    const template = await this.databaseService.template.create({
      data: {
        title: data.title,
        design: data.design,
        background: data.background,
        gradient: data.gradient,
        transition: data.transition,
      },
      include: {
        apps: true
      }
    });

    if (data.apps && data.apps.length > 0) {
      await Promise.all(data.apps.map(app => {
        if (app.id) {
          try {
            this.appService.update(app.id, app, template.id)
          } catch (error) {
            console.log(error)
          }
        } else {
          try {
            this.appService.create(app as appCreateDto, template.id)
          } catch (error) {
            console.log(error)
          }
        }
      }));
    }

    return this.databaseService.template.findUnique({
      where: { id: template.id },
      include: {
        apps: {
          include: {
            powerBI: true,
            powerPoint: true,
            actionTracker: true,
          }
        }
      }
    });
  }

  async findAll() {
    return this.databaseService.template.findMany({
      include: {
        apps: {
          include: {
            powerBI: true,
            powerPoint: true,
            actionTracker: true,
          }
        }
      }
    });
  }

  async findOne(id: number) {
    return this.databaseService.template.findUnique({
      where: { id },
      include: {
        apps: {
          include: {
            powerBI: true,
            powerPoint: true,
            actionTracker: true,
          }
        }
      }
    });
  }

  async update(id: number, data: templateUpdateDto) {
    try {
      await this.databaseService.template.update({
        where: { id },
        data: {
          title: data.title,
          design: data.design,
          background: data.background,
          gradient: data.gradient,
          transition: data.transition,
        }
      });
    } catch (error) {
      return new HttpException(error, 500);
    }

    if (data.apps && data.apps.length > 0) {
      await Promise.all(data.apps.map(app => {
        try {
          if (app.id) {
            this.appService.update(app.id, app, id)
          } else {
            this.appService.create(app as appCreateDto, id)
          }
        } catch (error) {
          console.log(error)
        }
      }));
    }

    return this.databaseService.template.findUnique({
      where: { id },
      include: {
        apps: {
          include: {
            powerBI: true,
            powerPoint: true,
            actionTracker: true,
          }
        }
      }
    });
  }

  remove(id: number) {
    return this.databaseService.template.delete({ where: { id } });
  }
}
