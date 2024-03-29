import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FullWithCircleService {

  constructor(private readonly databaseService: DatabaseService) { }

  create(createPageDto: Prisma.Template_FullWithCircleCreateInput) {
    return this.databaseService.template_FullWithCircle.create({
      data: createPageDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.template_FullWithCircle.findMany();
    }
    return this.databaseService.template_FullWithCircle.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.template_FullWithCircle.findUnique({
      where: { ID: id }
    })
  }


  update(id: number, updatePageDisplayDto: Prisma.Template_FullWithCircleCreateInput) {
    return this.databaseService.template_FullWithCircle.update({
      where: {ID: id},
      data: updatePageDisplayDto
    })
  }

  async remove(id: number) {
    return this.databaseService.template_FullWithCircle.delete({
      where: {ID: id}
    })
  }
}
