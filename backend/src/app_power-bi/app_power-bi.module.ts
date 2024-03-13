import { Module } from '@nestjs/common';
import { AppPowerBiService } from './app_power-bi.service';
import { AppPowerBiController } from './app_power-bi.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppPowerBiController],
  providers: [AppPowerBiService],
})
export class AppPowerBiModule {}
