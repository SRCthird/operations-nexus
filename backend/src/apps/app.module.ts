import { Module } from '@nestjs/common';
import { AppsController } from './app.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PowerBiService } from './apps/power-bi.service';
import { PowerPointService } from './apps/power-point.service';
import { ActionTrackerService } from './apps/action-tracker.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppsController],
  providers: [PowerBiService, PowerPointService, ActionTrackerService],
})
export class AppsModule {}
