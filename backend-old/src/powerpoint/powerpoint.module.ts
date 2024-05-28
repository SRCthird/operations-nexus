import { Module } from '@nestjs/common';
import { PowerpointService } from './powerpoint.service';
import { PowerpointController } from './powerpoint.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PowerpointController],
  providers: [PowerpointService],
})
export class PowerpointModule {}
