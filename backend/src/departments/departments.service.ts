import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

interface findOneParam {
  id?: number;
  name?: string;
}
interface updateParam {
  id?: number;
  name?: string;
  updateDepartmentDto: Prisma.Nexus_DepartmentUpdateInput;
}

@Injectable()
export class DepartmentsService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDepartmentDto: Prisma.Nexus_DepartmentCreateInput) {
    return this.databaseService.nexus_Department.create({
      data: createDepartmentDto
    });
  }

  async findAll(search?: string) {
    let query: any = {};

    if (search) {
      query.OR = [
        { Main: {contains: search}},
        { Department: {contains: search}},
        { Background: {contains: search}}
      ]
    }

    return this.databaseService.nexus_Department.findMany({
      where: query
    }); 
  }

  async findOne({id, name}: findOneParam) {
    let conditions: any;
    if (id !== undefined) {
      conditions = { ID: id };
    }
    if (name !== undefined) {
      conditions = { Department: name };
    }

    return this.databaseService.nexus_Department.findFirst({
      where: conditions 
    });
  }

  async update({id, name, updateDepartmentDto}: updateParam) {
    let conditions: any;
    if (id !== undefined) {
      conditions = { ID: id };
    }
    if (name !== undefined) {
      conditions = { Department: name };
    }
    return this.databaseService.nexus_Department.update({
      where: conditions,
      data: updateDepartmentDto
    });
  }

  async remove(id: number) {
    return this.databaseService.nexus_Department.delete({
      where: {ID: id}
    });
  }
}
