import { Module } from '@nestjs/common';
import { PageThreeOnTwoService } from './page_three-on-two.service';
import { PageThreeOnTwoController } from './page_three-on-two.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PageThreeOnTwoController],
  providers: [PageThreeOnTwoService],
})
export class PageThreeOnTwoModule {}
