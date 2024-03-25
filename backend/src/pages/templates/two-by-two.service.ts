import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PageTwoByTwoService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPageDto: Prisma.Page_TwoByTwoCreateInput) {
    return this.databaseService.page_TwoByTwo.create({
      data: createPageDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.page_TwoByTwo.findMany();
    }
    return this.databaseService.page_TwoByTwo.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.page_TwoByTwo.findUnique({
      where: {ID: id}
    })
  }

  async update(id: number, updatePageDto: Prisma.Page_TwoByTwoUpdateInput) {
    return this.databaseService.page_TwoByTwo.update({
      where: {ID: id},
      data: updatePageDto
    })
  }

  async remove(id: number) {
    return this.databaseService.page_TwoByTwo.delete({
      where: {ID: id}
    })
  }
}
