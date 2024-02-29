import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DisplaysService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDisplayDto: Prisma.displayCreateInput) {
    return this.databaseService.display.create({
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

    return this.databaseService.display.findMany({ where: query });
  }

  async findOne(id: number) {
    return this.databaseService.display.findUnique({ 
      where: {ID: id} 
    });
  }

  async update(id: number, updateDisplayDto: Prisma.displayUpdateInput) {
    return this.databaseService.display.update({
      where: {ID: id},
      data: updateDisplayDto
    })
  }

  async remove(id: number) {
    return this.databaseService.display.delete({ 
      where: {ID: id} 
    });
  }
}
