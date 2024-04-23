import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Prisma } from '@prisma/client';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) { }

  @Post()
  create(@Body() createDepartmentDto: Prisma.Nexus_DepartmentCreateInput) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.departmentsService.findAll(search);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    const id = parseInt(name, 10);
    if (!isNaN(id)) {
      return this.departmentsService.findOne({ id });
    }
    return this.departmentsService.findOne({ name });
  }

  @Patch(':param')
  update(@Param('param') param: string, @Body() updateDepartmentDto: Prisma.Nexus_DepartmentUpdateInput) {
    const parsedParam = parseInt(param, 10);
    if (!isNaN(parsedParam)) {
      return this.departmentsService.update({
        id: parsedParam,
        updateDepartmentDto
      });
    }
    return this.departmentsService.update({
      department: param,
      updateDepartmentDto
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(+id);
  }
}
