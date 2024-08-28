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

export type templateCreateOrUpdateInput = Prisma.TemplateCreateInput & {
  apps: appCreateOrUpdateInput[];
};

@Injectable()
export class TemplateService {

  constructor(
    readonly databaseService: DatabaseService,
    readonly appService: AppService
  ) { }

  async create(createDto: templateCreateDto, connectId?: number) {
    const data: Prisma.TemplateCreateInput = {
      title: createDto.title,
      design: createDto.design,
      background: createDto.background,
      gradient: createDto.gradient,
      transition: createDto.transition,
    }

    if (connectId) {
      data.displays = {
        connect: {
          id: connectId
        }
      };
    }

    const template = await this.databaseService.template.create({
      data,
      include: {
        apps: true
      }
    });

    try {
      if (createDto.apps && createDto.apps.length > 0) {
        await this.databaseService.template.update({
          where: { id: template.id },
          data: {
            apps: {
              set: []
            }
          }
        })
        await Promise.all(createDto.apps.map(app => {
          if (app.id && app.id > 0) {
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
    } catch (error) {
      throw new HttpException(error, 500);
    }

    return this.databaseService.template.findUnique({
      where: { id: template.id },
      include: {
        apps: {
          include: {
            powerBI: true,
            powerPoint: true,
            iFrame: true,
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
            iFrame: true,
          }
        }
      }
    });
  }

  async list() {
    return this.databaseService.template.findMany({
      select: {
        title: true
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
            iFrame: true,
          }
        }
      }
    });
  }

  async update(id: number, updateDto: templateUpdateDto, connectId?: number) {
    const data: Prisma.TemplateUpdateInput = {
      title: updateDto.title,
      design: updateDto.design,
      background: updateDto.background,
      gradient: updateDto.gradient,
      transition: updateDto.transition,
    }

    if (connectId) {
      data.displays = {
        connect: {
          id: connectId
        }
      };
    }

    try {
      await this.databaseService.template.update({
        where: { id },
        data
      });
    } catch (error) {
      return new HttpException(error, 500);
    }

    if (updateDto.apps && updateDto.apps.length > 0) {
      await this.databaseService.template.update({
        where: { id },
        data: {
          apps: {
            set: []
          }
        }
      })
      await Promise.all(updateDto.apps.map(app => {
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
            iFrame: true,
          }
        }
      }
    });
  }

  remove(id: number) {
    return this.databaseService.template.delete({ where: { id } });
  }
}
