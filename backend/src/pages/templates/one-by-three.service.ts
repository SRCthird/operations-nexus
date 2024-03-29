import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OneByThreeService {

  constructor(private readonly databaseService: DatabaseService) { }

  create(createPageDto: Prisma.Template_OneByThreeCreateInput) {
    return this.databaseService.template_OneByThree.create({
      data: createPageDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.template_OneByThree.findMany();
    }
    return this.databaseService.template_OneByThree.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.template_OneByThree.findUnique({
      where: { ID: id }
    })
  }


  update(id: number, updatePageDto: Prisma.Template_OneByThreeCreateInput) {
    return this.databaseService.template_OneByThree.update({
      where: {ID: id},
      data: updatePageDto
    })
  }

  async remove(id: number) {
    return this.databaseService.template_OneByThree.delete({
      where: {ID: id}
    })
  }
}
