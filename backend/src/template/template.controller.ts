import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TemplateService, templateCreateDto, templateUpdateDto } from './template.service';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  create(@Body() createDto: templateCreateDto) {
    return this.templateService.create(createDto);
  }

  @Get()
  findAll() {
    return this.templateService.findAll();
  }

  @Get('list')
  list() {
    return this.templateService.list();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: templateUpdateDto) {
    return this.templateService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateService.remove(+id);
  }
}
