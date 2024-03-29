import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FullDisplayService {

  constructor(private readonly databaseService: DatabaseService) { }

  create(createPageDto: Prisma.Template_FullDisplayCreateInput) {
    return this.databaseService.template_FullDisplay.create({
      data: createPageDto
    })
  }

  async findMany(ids?: number[]) {
    if (ids.length === 0) {
      return this.databaseService.template_FullDisplay.findMany();
    }
    return this.databaseService.template_FullDisplay.findMany({
      where: {
        ID: { in: ids }
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.template_FullDisplay.findUnique({
      where: { ID: id }
    })
  }


  update(id: number, updatePageDto: Prisma.Template_FullDisplayCreateInput) {
    return this.databaseService.template_FullDisplay.update({
      where: {ID: id},
      data: updatePageDto
    })
  }

  async remove(id: number) {
    return this.databaseService.template_FullDisplay.delete({
      where: {ID: id}
    })
  }
}
