import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Prisma } from '@prisma/client';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() createDepartmentDto: Prisma.Nexus_DepartmentCreateInput) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.departmentsService.findAll(search);
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    const parsedParam = parseInt(param, 10);
    if (!isNaN(parsedParam)) {
      return this.departmentsService.findOne({ id: parsedParam });
    }
    return this.departmentsService.findOne({ name: param });
  }

  @Patch(':param')
  update(@Param('param') param: string, @Body() updateDepartmentDto: Prisma.Nexus_DepartmentUpdateInput) {
    const parsedParam = parseInt(param, 10);
    if(!isNaN(parsedParam)) {
      return this.departmentsService.update({
        id: parsedParam, 
        updateDepartmentDto: updateDepartmentDto
      });
    }
    return this.departmentsService.update({
      name: param, 
      updateDepartmentDto: updateDepartmentDto
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(+id);
  }
}
