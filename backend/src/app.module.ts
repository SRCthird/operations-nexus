import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DisplaysModule } from './displays/displays.module';
import { DepartmentsModule } from './departments/departments.module';
import { PowerpointModule } from './powerpoint/powerpoint.module';
import { StaticModule } from './static/static.module';
import { ActionTrackerModule } from './action-tracker/action-tracker.module';
import { PageThreeOnTwoModule } from './page_three-on-two/page_three-on-two.module';
import { AppPowerBiModule } from './app_power-bi/app_power-bi.module';
import { AppPowerPointModule } from './app_power-point/app_power-point.module';

@Module({
  imports: [DatabaseModule, DisplaysModule, DepartmentsModule, PowerpointModule, StaticModule, ActionTrackerModule, PageThreeOnTwoModule, AppPowerBiModule, AppPowerPointModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
