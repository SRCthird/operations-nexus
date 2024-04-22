import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppService, appCreateDto, appUpdateDto } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() createDto: appCreateDto) {
    return this.appService.create(createDto);
  }

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(+id);
  }

  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.appService.findByType(type);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: appUpdateDto) {
    return this.appService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.remove(+id);
  }
}
