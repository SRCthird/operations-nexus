import { Module } from '@nestjs/common';
import { ActionTrackerService } from './action-tracker.service';
import { ActionTrackerController } from './action-tracker.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ActionTrackerController],
  providers: [ActionTrackerService],
})
export class ActionTrackerModule {}
