import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PageThreeOnTwoService } from './page_three-on-two.service';
import { Prisma } from '@prisma/client';

@Controller('page/ThreeOnTwo')
export class PageThreeOnTwoController {
  constructor(private readonly pageThreeOnTwoService: PageThreeOnTwoService) {}

  @Post()
  create(@Body() createPageThreeOnTwoDto: Prisma.Page_ThreeOnTwoCreateInput) {
    return this.pageThreeOnTwoService.create(createPageThreeOnTwoDto);
  }

  @Get()
  findMany(@Query('id') ids: string) {
    const idArray = ids? ids.split(',').map(id => parseInt(id)): [];
    return this.pageThreeOnTwoService.findMany(idArray);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageThreeOnTwoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageThreeOnTwoDto: Prisma.Page_ThreeOnTwoUpdateInput) {
    return this.pageThreeOnTwoService.update(+id, updatePageThreeOnTwoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageThreeOnTwoService.remove(+id);
  }
}
