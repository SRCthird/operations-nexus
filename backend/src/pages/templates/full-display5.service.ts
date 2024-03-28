import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PageFullDisplay5Service {

  constructor(private readonly databaseService: DatabaseService) { }

  create(createPageDto: Prisma.Page_FullDisplay5CreateInput) {
    return this.databaseService.page_FullDisplay5.create({
      data: createPageDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.page_FullDisplay5.findMany();
    }
    return this.databaseService.page_FullDisplay5.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.page_FullDisplay5.findUnique({
      where: { ID: id }
    })
  }


  update(id: number, updatePageDto: Prisma.Page_FullDisplay5UpdateInput) {
    return this.databaseService.page_FullDisplay5.update({
      where: {ID: id},
      data: updatePageDto
    })
  }

  async remove(id: number) {
    return this.databaseService.page_FullDisplay5.delete({
      where: {ID: id}
    })
  }
}
