import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TwoByTwoService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPageDto: Prisma.Template_TwoByTwoCreateInput) {
    return this.databaseService.template_TwoByTwo.create({
      data: createPageDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.template_TwoByTwo.findMany();
    }
    return this.databaseService.template_TwoByTwo.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.template_TwoByTwo.findUnique({
      where: {ID: id}
    })
  }

  async update(id: number, updatePageDto: Prisma.Template_TwoByTwoCreateInput) {
    return this.databaseService.template_TwoByTwo.update({
      where: {ID: id},
      data: updatePageDto
    })
  }

  async remove(id: number) {
    return this.databaseService.template_TwoByTwo.delete({
      where: {ID: id}
    })
  }
}
