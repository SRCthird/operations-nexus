import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SplitScreenService {

  constructor(private readonly databaseService: DatabaseService) { }

  create(createPageDto: Prisma.Template_SplitScreenCreateInput) {
    return this.databaseService.template_SplitScreen.create({
      data: createPageDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.template_SplitScreen.findMany();
    }
    return this.databaseService.template_SplitScreen.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.template_SplitScreen.findUnique({
      where: { ID: id }
    })
  }


  update(id: number, updatePageDto: Prisma.Template_SplitScreenCreateInput) {
    return this.databaseService.template_SplitScreen.update({
      where: {ID: id},
      data: updatePageDto
    })
  }

  async remove(id: number) {
    return this.databaseService.template_SplitScreen.delete({
      where: {ID: id}
    })
  }
}
