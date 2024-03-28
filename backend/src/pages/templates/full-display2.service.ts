import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PageFullDisplay2Service {

  constructor(private readonly databaseService: DatabaseService) { }

  create(createPageDto: Prisma.Page_FullDisplay2CreateInput) {
    return this.databaseService.page_FullDisplay2.create({
      data: createPageDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.page_FullDisplay2.findMany();
    }
    return this.databaseService.page_FullDisplay2.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.page_FullDisplay2.findUnique({
      where: { ID: id }
    })
  }


  update(id: number, updatePageDto: Prisma.Page_FullDisplay2UpdateInput) {
    return this.databaseService.page_FullDisplay2.update({
      where: {ID: id},
      data: updatePageDto
    })
  }

  async remove(id: number) {
    return this.databaseService.page_FullDisplay2.delete({
      where: {ID: id}
    })
  }
}
