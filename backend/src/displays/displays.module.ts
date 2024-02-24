import { Module } from '@nestjs/common';
import { DisplaysService } from './displays.service';
import { DisplaysController } from './displays.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DisplaysController],
  providers: [DisplaysService],
})
export class DisplaysModule {}
