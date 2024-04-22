import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

interface findOneParam {
  id?: number;
  name?: string;
}

@Injectable()
export class DisplaysService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDisplayDto: Prisma.Nexus_DisplayCreateInput) {
    return this.databaseService.nexus_Display.create({
      data: createDisplayDto
    });
  }

  async findAll(department?: string, search?: string) {
    let query: Prisma.Nexus_DisplayFindManyArgs = {};

    if (department) {
      query.where.department = department;
    }
    if (search) {
      query.where.OR = [
        { main: { contains: search } },
        { department: { contains: search } },
        { display: { contains: search } },
        { background: { contains: search } },
      ];
    }

    return this.databaseService.nexus_Display.findMany( query );
  }

  async findOne({id, name}: findOneParam) {
    let conditions: Prisma.Nexus_DisplayFindFirstArgs = {};
    if (id !== undefined) {
      conditions.where = { id: id };
    }
    if (name !== undefined) {
      conditions.where = { department: name };
    }

    return this.databaseService.nexus_Display.findFirst( conditions );
  }

  async update(id: number, updateDisplayDto: Prisma.Nexus_DisplayUpdateInput) {
    return this.databaseService.nexus_Display.update({
      where: {id: id},
      data: updateDisplayDto
    })
  }

  async remove(id: number) {
    return this.databaseService.nexus_Display.delete({ 
      where: {id: id} 
    });
  }
}
