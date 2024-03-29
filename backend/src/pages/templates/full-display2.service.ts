import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FullDisplay2Service {

  constructor(private readonly databaseService: DatabaseService) { }

  create(createPageDto: Prisma.Template_FullDisplay2CreateInput) {
    return this.databaseService.template_FullDisplay2.create({
      data: createPageDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.template_FullDisplay2.findMany();
    }
    return this.databaseService.template_FullDisplay2.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.template_FullDisplay2.findUnique({
      where: { ID: id }
    })
  }


  update(id: number, updatePageDto: Prisma.Template_FullDisplay2CreateInput) {
    return this.databaseService.template_FullDisplay2.update({
      where: {ID: id},
      data: updatePageDto
    })
  }

  async remove(id: number) {
    return this.databaseService.template_FullDisplay2.delete({
      where: {ID: id}
    })
  }
}
