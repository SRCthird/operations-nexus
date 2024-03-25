import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PageSplitScreenService {

  constructor(private readonly databaseService: DatabaseService) { }

  create(createPageDto: Prisma.Page_SplitScreenCreateInput) {
    return this.databaseService.page_SplitScreen.create({
      data: createPageDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.page_SplitScreen.findMany();
    }
    return this.databaseService.page_SplitScreen.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.page_SplitScreen.findUnique({
      where: { ID: id }
    })
  }


  update(id: number, updatePageDto: Prisma.Page_SplitScreenUpdateInput) {
    return this.databaseService.page_SplitScreen.update({
      where: {ID: id},
      data: updatePageDto
    })
  }

  async remove(id: number) {
    return this.databaseService.page_SplitScreen.delete({
      where: {ID: id}
    })
  }
}
