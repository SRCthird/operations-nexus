import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { PageFullDisplayService } from './templates/full-display.service';
import { PageFullDisplay2Service } from './templates/full-display2.service';
import { PageFullDisplay3Service } from './templates/full-display3.service';
import { PageFullDisplay4Service } from './templates/full-display4.service';
import { PageFullDisplay5Service } from './templates/full-display5.service';
import { PageFullWithCircleService } from './templates/full-with-circle.service';
import { PageOneByThreeService } from './templates/one-by-three.service';
import { PageSplitScreenService } from './templates/split-screen.service';
import { PageThreeOnTwoService } from './templates/three-on-two.service';
import { PageTwoByTwoService } from './templates/two-by-two.service';

@Controller('page')
export class PagesController {

  private pagesMap: Record<string, any>;

  constructor(
    private readonly pageFullDisplayService: PageFullDisplayService,
    private readonly pageFullDisplay2Service: PageFullDisplay2Service,
    private readonly pageFullDisplay3Service: PageFullDisplay3Service,
    private readonly pageFullDisplay4Service: PageFullDisplay4Service,
    private readonly pageFullDisplay5Service: PageFullDisplay5Service,
    private readonly pageFullWithCircle: PageFullWithCircleService,
    private readonly pageOneByThree: PageOneByThreeService,
    private readonly pageSplitScreen: PageSplitScreenService,
    private readonly pageThreeOnTwoService: PageThreeOnTwoService,
    private readonly pageTwoByTwo: PageTwoByTwoService
  ) {
    this.pagesMap = {
      'FullDisplay': this.pageFullDisplayService,
      'FullDisplay2': this.pageFullDisplay2Service,
      'FullDisplay3': this.pageFullDisplay3Service,
      'FullDisplay4': this.pageFullDisplay4Service,
      'FullDisplay5': this.pageFullDisplay5Service,
      'FullWithCircle': this.pageFullWithCircle,
      'OneByThree': this.pageOneByThree,
      'SplitScreen': this.pageSplitScreen,
      'ThreeOnTwo': this.pageThreeOnTwoService,
      'TwoByTwo': this.pageTwoByTwo
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
  update(@Param('template') template: string, @Param('id') id: string, @Body() updatePageDto: any) {
    const findFunction = this.pagesMap[template];
    if (findFunction) {
      return findFunction.update(+id, updatePageDto);
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
