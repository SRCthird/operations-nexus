import { Module } from '@nestjs/common';
import { PageFullDisplayService } from './page_full-display.service';
import { PageFullDisplayController } from './page_full-display.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PageFullDisplayController],
  providers: [PageFullDisplayService],
})
export class PageFullDisplayModule {}
