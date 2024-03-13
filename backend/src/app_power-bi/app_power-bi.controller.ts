import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppPowerBiService } from './app_power-bi.service';
import { Prisma } from '@prisma/client';

@Controller('app/power-bi')
export class AppPowerBiController {
  constructor(private readonly appPowerBiService: AppPowerBiService) {}

  @Post()
  create(@Body() createAppPowerBiDto: Prisma.App_PowerBICreateInput) {
    return this.appPowerBiService.create(createAppPowerBiDto);
  }

  @Get()
  findMany(@Query('id') ids?: string) {
    const idArray = ids? ids.split(',').map(id => parseInt(id)): [];
    return this.appPowerBiService.findMany(idArray);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appPowerBiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppPowerBiDto: Prisma.App_PowerBIUpdateInput) {
    return this.appPowerBiService.update(+id, updateAppPowerBiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appPowerBiService.remove(+id);
  }
}
