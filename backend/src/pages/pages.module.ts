import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { DatabaseModule } from 'src/database/database.module';
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

@Module({
  imports: [DatabaseModule],
  controllers: [PagesController],
  providers: [
    FullDisplayService, 
    FullDisplay2Service,
    FullDisplay3Service,
    FullDisplay4Service,
    FullDisplay5Service,
    FullWithCircleService,
    OneByThreeService,
    SplitScreenService,
    ThreeOnTwoService,
    TwoByTwoService,
  ],
})
export class PagesModule {}
