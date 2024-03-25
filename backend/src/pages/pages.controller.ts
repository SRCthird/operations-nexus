import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PageThreeOnTwoService } from './templates/three-on-two.service';
import { PageFullDisplayService } from './templates/full-display.service';

@Controller('page')
export class PagesController {

  private pagesMap: Record<string, any>;

  constructor(
    private readonly pageFullDisplayService: PageFullDisplayService,
    private readonly pageThreeOnTwoService: PageThreeOnTwoService
  ) {
    this.pagesMap = {
      'ThreeOnTwo': this.pageThreeOnTwoService,
      'FullDisplay': this.pageFullDisplayService,
    };
  }

  @Post(':template')
  create(@Param('template') template: string, @Body() createPageDto: any) {
    const createFunction = this.pagesMap[template];
    if (createFunction) {
      return createFunction.create(createPageDto);
    } else {
      throw new NotFoundException(`Template ${template} not found`);
    }
  }

  @Get(':template')
  findMany(@Param('template') template: string, @Query('id') ids: string) {
    const idArray = ids ? ids.split(',').map(id => parseInt(id)) : [];
    const findFunction = this.pagesMap[template];
    if (findFunction) {
      return findFunction.findMany(idArray);
    } else {
      throw new NotFoundException(`Template ${template} not found`);
    }
  }

  @Get(':template/:id')
  findOne(@Param('template') template: string, @Param('id') id: string) {
    const findFunction = this.pagesMap[template];
    if (findFunction) {
      return findFunction.findOne(+id);
    } else {
      throw new NotFoundException(`Template ${template} not found`);
    }
  }

  @Patch(':template/:id')
  update(@Param('template') template: string, @Param('id') id: string, @Body() updatePageThreeOnTwoDto: any) {
    const findFunction = this.pagesMap[template];
    if (findFunction) {
      return findFunction.update(+id, updatePageThreeOnTwoDto);
    } else {
      throw new NotFoundException(`Template ${template} not found`);
    }
  }

  @Delete(':template/:id')
  remove(@Param('template') template: string, @Param('id') id: string) {
    const findFunction = this.pagesMap[template];
    if (findFunction) {
      return findFunction.remove(+id);
    } else {
      throw new NotFoundException(`Template ${template} not found`);
    }
  }
}
