import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppPowerPointService } from './app_power-point.service';
import { Prisma } from '@prisma/client';

@Controller('app/power-point')
export class AppPowerPointController {
  constructor(private readonly appPowerPointService: AppPowerPointService) {}

  @Post()
  create(@Body() createAppPowerPointDto: Prisma.App_PowerPointCreateInput) {
    return this.appPowerPointService.create(createAppPowerPointDto);
  }

  @Get()
  findMany(@Query('id') ids: string) {
    const idArray = ids? ids.split(',').map(id => parseInt(id)): [];
    return this.appPowerPointService.findMany(idArray);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appPowerPointService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppPowerPointDto: Prisma.App_PowerPointUpdateInput) {
    return this.appPowerPointService.update(+id, updateAppPowerPointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appPowerPointService.remove(+id);
  }
}
