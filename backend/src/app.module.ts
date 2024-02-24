import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DisplaysModule } from './displays/displays.module';
import { DepartmentsModule } from './departments/departments.module';
import { PowerpointModule } from './powerpoint/powerpoint.module';

@Module({
  imports: [DatabaseModule, DisplaysModule, DepartmentsModule, PowerpointModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
