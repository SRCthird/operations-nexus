import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PageFullDisplayService {

  constructor(private readonly databaseService: DatabaseService) { }

  create(createPageDto: Prisma.Page_FullDisplayCreateInput) {
    return this.databaseService.page_FullDisplay.create({
      data: createPageDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.page_FullDisplay.findMany();
    }
    return this.databaseService.page_FullDisplay.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.page_FullDisplay.findUnique({
      where: { ID: id }
    })
  }


  update(id: number, updatePageDto: Prisma.Page_FullDisplayUpdateInput) {
    return this.databaseService.page_FullDisplay.update({
      where: {ID: id},
      data: updatePageDto
    })
  }

  async remove(id: number) {
    return this.databaseService.page_FullDisplay.delete({
      where: {ID: id}
    })
  }
}
