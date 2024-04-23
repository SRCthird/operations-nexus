import { Controller, Get, Param } from '@nestjs/common';
import { CoreService } from './core.service';

@Controller()
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  getHello(): string {
    return this.coreService.getHello();
  }

  @Get('delay')
  async getDelay(): Promise<number> {
    return this.coreService.getDelay();
  }

  @Get('delay/:delay')
  async setDelay(@Param('delay') delay: string): Promise<string> {
    return this.coreService.setDelay(+delay);
  }
}
