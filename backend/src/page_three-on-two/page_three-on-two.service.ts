import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PageThreeOnTwoService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPageThreeOnTwoDto: Prisma.Page_ThreeOnTwoCreateInput) {
    return this.databaseService.page_ThreeOnTwo.create({
      data: createPageThreeOnTwoDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.page_ThreeOnTwo.findMany();
    }
    return this.databaseService.page_ThreeOnTwo.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.page_ThreeOnTwo.findUnique({
      where: {ID: id}
    })
  }

  async update(id: number, updatePageThreeOnTwoDto: Prisma.Page_ThreeOnTwoUpdateInput) {
    return this.databaseService.page_ThreeOnTwo.update({
      where: {ID: id},
      data: updatePageThreeOnTwoDto
    })
  }

  async remove(id: number) {
    return this.databaseService.page_ThreeOnTwo.delete({
      where: {ID: id}
    })
  }
}
