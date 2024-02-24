import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DisplaysService } from './displays.service';
import { Prisma } from '@prisma/client';

@Controller('display')
export class DisplaysController {
  constructor(private readonly displaysService: DisplaysService) {}

  @Post()
  create(@Body() createDisplayDto: Prisma.displayCreateInput) {
    return this.displaysService.create(createDisplayDto);
  }

  @Get()
  findAll(@Query('departments') department?: string, @Query('search') search?: string) {
    return this.displaysService.findAll(department, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.displaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDisplayDto: Prisma.displayUpdateInput) {
    return this.displaysService.update(+id, updateDisplayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.displaysService.remove(+id);
  }
}
