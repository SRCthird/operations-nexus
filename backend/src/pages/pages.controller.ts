import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { FullDisplayService } from './templates/full-display.service';
import { FullDisplay2Service } from './templates/full-display2.service';
import { FullDisplay3Service } from './templates/full-display3.service';
import { FullDisplay4Service } from './templates/full-display4.service';
import { FullDisplay5Service } from './templates/full-display5.service';
import { FullWithCircleService } from './templates/full-with-circle.service';
import { OneByThreeService } from './templates/one-by-three.service';
import { SplitScreenService } from './templates/split-screen.service';
import { ThreeOnTwoService } from './templates/three-on-two.service';
import { TwoByTwoService } from './templates/two-by-two.service';

@Controller('page')
export class PagesController {

  private pagesMap: Record<string, any>;

  constructor(
    private readonly fullDisplayService: FullDisplayService,
    private readonly fullDisplay2Service: FullDisplay2Service,
    private readonly fullDisplay3Service: FullDisplay3Service,
    private readonly fullDisplay4Service: FullDisplay4Service,
    private readonly fullDisplay5Service: FullDisplay5Service,
    private readonly fullWithCircle: FullWithCircleService,
    private readonly oneByThree: OneByThreeService,
    private readonly splitScreen: SplitScreenService,
    private readonly threeOnTwoService: ThreeOnTwoService,
    private readonly twoByTwo: TwoByTwoService
  ) {
    this.pagesMap = {
      'FullDisplay': this.fullDisplayService,
      'FullDisplay2': this.fullDisplay2Service,
      'FullDisplay3': this.fullDisplay3Service,
      'FullDisplay4': this.fullDisplay4Service,
      'FullDisplay5': this.fullDisplay5Service,
      'FullWithCircle': this.fullWithCircle,
      'OneByThree': this.oneByThree,
      'SplitScreen': this.splitScreen,
      'ThreeOnTwo': this.threeOnTwoService,
      'TwoByTwo': this.twoByTwo
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
