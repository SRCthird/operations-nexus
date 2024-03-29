import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ThreeOnTwoService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPageDto: Prisma.Template_ThreeOnTwoCreateInput) {
    return this.databaseService.template_ThreeOnTwo.create({
      data: createPageDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.template_ThreeOnTwo.findMany();
    }
    return this.databaseService.template_ThreeOnTwo.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.template_ThreeOnTwo.findUnique({
      where: {ID: id}
    })
  }

  async update(id: number, updatePageDto: Prisma.Template_ThreeOnTwoCreateInput) {
    return this.databaseService.template_ThreeOnTwo.update({
      where: {ID: id},
      data: updatePageDto
    })
  }

  async remove(id: number) {
    return this.databaseService.template_ThreeOnTwo.delete({
      where: {ID: id}
    })
  }
}
