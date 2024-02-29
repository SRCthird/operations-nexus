import { Module } from '@nestjs/common';
import { ActionTrackerService } from './action-tracker.service';
import { ActionTrackerController } from './action-tracker.controller';

@Module({
  controllers: [ActionTrackerController],
  providers: [ActionTrackerService],
})
export class ActionTrackerModule {}
