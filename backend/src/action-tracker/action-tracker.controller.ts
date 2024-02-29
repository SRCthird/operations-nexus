import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActionTrackerService } from './action-tracker.service';
import { Prisma } from '@prisma/client';

@Controller('action-tracker')
export class ActionTrackerController {
  constructor(private readonly actionTrackerService: ActionTrackerService) {}

  @Post()
  create(@Body() createActionTrackerDto: Prisma.action_trackerCreateInput) {
    return this.actionTrackerService.create(createActionTrackerDto);
  }

  @Get()
  findAll() {
    return this.actionTrackerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionTrackerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActionTrackerDto: Prisma.action_trackerUpdateInput) {
    return this.actionTrackerService.update(+id, updateActionTrackerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionTrackerService.remove(+id);
  }
}
