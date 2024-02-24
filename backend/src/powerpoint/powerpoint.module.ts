import { Module } from '@nestjs/common';
import { PowerpointService } from './powerpoint.service';
import { PowerpointController } from './powerpoint.controller';

@Module({
  controllers: [PowerpointController],
  providers: [PowerpointService],
})
export class PowerpointModule {}
