import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma } from '@prisma/client';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() createAppDto: Prisma.AppCreateInput & {
    powerBI?: Prisma.App_PowerBICreateWithoutAppInput;
    powerPoint?: Prisma.App_PowerPointCreateWithoutAppInput;
    actionTracker?: Prisma.App_ActionTrackerCreateWithoutAppInput;
  }) {
    return this.appService.create(createAppDto);
  }

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppDto: Prisma.AppUpdateInput & {
    powerBI?: Prisma.App_PowerBIUpdateInput & Prisma.App_PowerBICreateInput;
    powerPoint?: Prisma.App_PowerPointUpdateInput & Prisma.App_PowerPointCreateInput;
    actionTracker?: Prisma.App_ActionTrackerUpdateInput & Prisma.App_ActionTrackerCreateInput;
  }) {
    return this.appService.update(+id, updateAppDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.remove(+id);
  }
}
