import { Module } from '@nestjs/common';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { DatabaseModule } from './database/database.module';
import { DisplaysModule } from './displays/displays.module';
import { DepartmentsModule } from './departments/departments.module';
import { PowerpointModule } from './powerpoint/powerpoint.module';
import { StaticModule } from './static/static.module';
import { AdminModule } from './admin/admin.module';
import { AppModule } from './app/app.module';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [DatabaseModule, DisplaysModule, DepartmentsModule, PowerpointModule, StaticModule, AdminModule, AppModule, TemplateModule,],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}
