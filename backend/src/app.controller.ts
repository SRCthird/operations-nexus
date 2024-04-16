import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('delay')
  async getDelay(): Promise<number> {
    return this.appService.getDelay();
  }

  @Get('delay/:delay')
  async setDelay(@Param('delay') delay: string): Promise<string> {
    return this.appService.setDelay(+delay);
  }
}
