import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DisplaysService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDisplayDto: Prisma.Nexus_DisplayCreateInput) {
    return this.databaseService.nexus_Display.create({
      data: createDisplayDto
    });
  }

  async findAll(department?: string, search?: string) {
    let query: any = {};

    if (department) {
      query.Department = department;
    }
    if (search) {
      query.OR = [
        { Main: { contains: search } },
        { Sub: { contains: search } },
        { Department: { contains: search } },
        { Display: { contains: search } },
        { Background: { contains: search } },
      ];
    }

    return this.databaseService.nexus_Display.findMany({ where: query });
  }

  async findOne(id: number) {
    return this.databaseService.nexus_Display.findUnique({ 
      where: {ID: id} 
    });
  }

  async update(id: number, updateDisplayDto: Prisma.Nexus_DisplayUpdateInput) {
    return this.databaseService.nexus_Display.update({
      where: {ID: id},
      data: updateDisplayDto
    })
  }

  async remove(id: number) {
    return this.databaseService.nexus_Display.delete({ 
      where: {ID: id} 
    });
  }
}
