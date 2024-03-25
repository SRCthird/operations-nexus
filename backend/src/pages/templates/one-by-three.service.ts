import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PageOneByThreeService {

  constructor(private readonly databaseService: DatabaseService) { }

  create(createPageDto: Prisma.Page_OneByThreeCreateInput) {
    return this.databaseService.page_OneByThree.create({
      data: createPageDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.page_OneByThree.findMany();
    }
    return this.databaseService.page_OneByThree.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.page_OneByThree.findUnique({
      where: { ID: id }
    })
  }


  update(id: number, updatePageDto: Prisma.Page_OneByThreeUpdateInput) {
    return this.databaseService.page_OneByThree.update({
      where: {ID: id},
      data: updatePageDto
    })
  }

  async remove(id: number) {
    return this.databaseService.page_OneByThree.delete({
      where: {ID: id}
    })
  }
}
