import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { templateUpdateDto, templateCreateOrUpdateInput } from 'src/template/template.service';

type findOneParam = {
  id?: number;
  name?: string;
}

export type displayCreateDto = Prisma.Nexus_DisplayCreateInput & {
  title?: string;
  department?: string;
  template: templateCreateOrUpdateInput;
};

export type displayUpdateDto = Prisma.Nexus_DisplayUpdateInput & {
  title?: string;
  department?: string;
  template: templateUpdateDto;
};

@Injectable()
export class DisplaysService {

  constructor(private readonly databaseService: DatabaseService) { }

  async create(createDisplayDto: displayCreateDto) {
    const data: Prisma.Nexus_DisplayCreateInput = {
      main: createDisplayDto.main,
      departments: {
        connect: {
          department: createDisplayDto.department
        }
      },
      display: createDisplayDto.display,
      background: createDisplayDto.background,
      template: {
        connect: {
          title: createDisplayDto.title,
        }
      }
    }

    return this.databaseService.nexus_Display.create({
      data,
      include: {
        template: {
          include: {
            apps: {
              include: {
                powerBI: true,
                powerPoint: true,
                iFrame: true,
              }
            }
          }
        }
      }
    });
  }

  async findAll(department?: string, search?: string) {
    let query: Prisma.Nexus_DisplayFindManyArgs = {
      where: {
        departments: { department }
      },
      include: {
        template: {
          include: {
            apps: {
              include: {
                powerBI: true,
                powerPoint: true,
                iFrame: true,
              }
            }
          }
        }
      }
    };

    if (search) {
      query.where.OR = [
        { main: { contains: search } },
        { department: { contains: search } },
        { display: { contains: search } },
        { background: { contains: search } },
      ];
    }
    
    return this.databaseService.nexus_Display.findMany(query);
  }

  async findOne({ id, name }: findOneParam) {
    let conditions: Prisma.Nexus_DisplayFindFirstArgs = {
      include: {
        template: {
          include: {
            apps: {
              include: {
                powerBI: true,
                powerPoint: true,
                iFrame: true,
              }
            }
          }
        }
      }
    };
    if (id !== undefined) {
      conditions.where = { id: id };
    }
    if (name !== undefined) {
      conditions.where = { department: name };
    }

    return this.databaseService.nexus_Display.findFirst(conditions);
  }

  async update(id: number, updateDto: displayUpdateDto) {
    const data: Prisma.Nexus_DisplayUpdateInput = {
      main: updateDto.main,
      display: updateDto.display,
      departments: {
        connect: {
          department: updateDto.department
        }
      },
      background: updateDto.background,
      template: {
        connect: {
          title: updateDto.title
        }
      }
    }

    return this.databaseService.nexus_Display.update({
      where: { id: id },
      data
    })
  }

  async remove(id: number) {
    return this.databaseService.nexus_Display.delete({
      where: { id: id }
    });
  }
}
