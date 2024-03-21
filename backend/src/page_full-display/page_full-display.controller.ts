import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PageFullDisplayService } from './page_full-display.service';
import { Prisma } from '@prisma/client';

@Controller('page/FullDisplay')
export class PageFullDisplayController {
  constructor(private readonly pageFullDisplayService: PageFullDisplayService) {}

  @Post()
  create(@Body() createPageFullDisplayDto: Prisma.Page_FullDisplayCreateInput) {
    return this.pageFullDisplayService.create(createPageFullDisplayDto);
  }

  @Get()
  findMany(@Query('id') ids: string) {
    const idArray = ids? ids.split(',').map(id => parseInt(id)): [];
    return this.pageFullDisplayService.findMany(idArray);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageFullDisplayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageFullDisplayDto: Prisma.Page_FullDisplayUpdateInput) {
    return this.pageFullDisplayService.update(+id, updatePageFullDisplayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageFullDisplayService.remove(+id);
  }
}
