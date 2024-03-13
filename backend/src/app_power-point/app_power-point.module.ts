import { Module } from '@nestjs/common';
import { AppPowerPointService } from './app_power-point.service';
import { AppPowerPointController } from './app_power-point.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppPowerPointController],
  providers: [AppPowerPointService],
})
export class AppPowerPointModule {}
