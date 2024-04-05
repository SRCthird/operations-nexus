import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { ActionTrackerService } from './apps/action-tracker.service';
import { PowerBiService } from './apps/power-bi.service';
import { PowerPointService } from './apps/power-point.service';

@Controller('app')
export class AppsController {
  private appsMap: Record<string, any>;
  constructor(
    private readonly appPowerBiService: PowerBiService,
    private readonly appPowerPointService: PowerPointService,
    private readonly appActionTrackerService: ActionTrackerService
  ) {
    this.appsMap = {
      'PowerBI': this.appPowerBiService,
      'PowerPoint': this.appPowerPointService,
      'ActionTracker': this.appActionTrackerService
    };
  }

  @Post(':app')
  create(@Param('app') app: string, @Body() createAppDto: any) {
    const createFunction = this.appsMap[app];
    if (createFunction) {
      return createFunction.create(createAppDto);
    } else {
      throw new NotFoundException(`App ${app} not found`);
    }
  }

  @Get(':app')
  findMany(@Param('app') app: string, @Query('id') ids: string) {
    const idArray = ids ? ids.split(',').map(id => parseInt(id)) : [];
    const findFunction = this.appsMap[app];
    if (findFunction) {
      return findFunction.findMany(idArray);
    } else {
      throw new NotFoundException(`App ${app} not found`);
    }
  }

  @Get(':app/:id')
  findOne(@Param('app') app: string, @Param('id') id: string) {
    const findFunction = this.appsMap[app];
    if (findFunction) {
      return findFunction.findOne(+id);
    } else {
      throw new NotFoundException(`App ${app} not found`);
    }
  }

  @Patch(':app/:id')
  update(@Param('app') app: string, @Param('id') id: string, @Body() updateAppDto: any) {
    const findFunction = this.appsMap[app];
    if (findFunction) {
      return findFunction.update(+id, updateAppDto);
    } else {
      throw new NotFoundException(`App ${app} not found`);
    }
  }

  @Delete(':app/:id')
  remove(@Param('app') app: string, @Param('id') id: string) {
    const findFunction = this.appsMap[app];
    if (findFunction) {
      return findFunction.remove(+id);
    } else {
      throw new NotFoundException(`App ${app} not found`);
    }
  }
}
