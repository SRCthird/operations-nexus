import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

interface findOneParam {
  id?: number;
  name?: string;
}
interface updateParam {
  id?: number;
  department?: string;
  updateDepartmentDto: Prisma.Nexus_DepartmentUpdateInput;
}

@Injectable()
export class DepartmentsService {

  constructor(private readonly databaseService: DatabaseService) { }

  async create(createDepartmentDto: Prisma.Nexus_DepartmentCreateInput) {
    return this.databaseService.nexus_Department.create({
      data: createDepartmentDto
    });
  }

  async findAll(search?: string) {
    let query: Prisma.Nexus_DepartmentFindManyArgs = {};

    if (search) {
      query.where.OR = [
        { main: { contains: search } },
        { department: { contains: search } },
        { background: { contains: search } }
      ]
    }

    return this.databaseService.nexus_Department.findMany(query);
  }

  async findOne({ id, name }: findOneParam) {
    let conditions: Prisma.Nexus_DepartmentFindFirstArgs = {};
    if (id !== undefined) {
      conditions.where = { id: id };
    }
    if (name !== undefined) {
      conditions.where = { department: name };
    }

    return this.databaseService.nexus_Department.findFirst(conditions);
  }

  async update({ id, department, updateDepartmentDto }: updateParam) {
    let query: Prisma.Nexus_DepartmentWhereUniqueInput = id !== undefined ? { id } : { department };

    let conditions: Prisma.Nexus_DepartmentUpdateArgs = {
      where: query,
      data: updateDepartmentDto,
    };

    return this.databaseService.nexus_Department.update(conditions);
  }

  async remove(id: number) {
    return this.databaseService.nexus_Department.delete({
      where: { id }
    });
  }
}
