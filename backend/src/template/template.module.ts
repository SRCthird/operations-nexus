import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AppModule } from 'src/app/app.module';

@Module({
  imports: [DatabaseModule, AppModule],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
