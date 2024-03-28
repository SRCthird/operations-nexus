import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PageFullDisplayService } from './templates/full-display.service';
import { PageFullDisplay2Service } from './templates/full-display2.service';
import { PageThreeOnTwoService } from './templates/three-on-two.service';
import { DatabaseModule } from 'src/database/database.module';
import { PageFullWithCircleService } from './templates/full-with-circle.service';
import { PageOneByThreeService } from './templates/one-by-three.service';
import { PageSplitScreenService } from './templates/split-screen.service';
import { PageTwoByTwoService } from './templates/two-by-two.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PagesController],
  providers: [
    PageFullDisplayService, 
    PageFullDisplay2Service,
    PageFullWithCircleService,
    PageOneByThreeService,
    PageSplitScreenService,
    PageThreeOnTwoService,
    PageTwoByTwoService 
  ],
})
export class PagesModule {}
