import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DisplaysModule } from './displays/displays.module';
import { DepartmentsModule } from './departments/departments.module';
import { PowerpointModule } from './powerpoint/powerpoint.module';
import { StaticModule } from './static/static.module';
import { ActionTrackerModule } from './action-tracker/action-tracker.module';

@Module({
  imports: [DatabaseModule, DisplaysModule, DepartmentsModule, PowerpointModule, StaticModule, ActionTrackerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
