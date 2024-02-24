import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DisplaysModule } from './displays/displays.module';

@Module({
  imports: [DatabaseModule, DisplaysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
