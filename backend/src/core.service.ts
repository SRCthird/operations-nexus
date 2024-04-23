import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CoreService {
  
  constructor(private readonly databaseService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDelay(): Promise<number> {
    let result = await this.databaseService.nexus_Settings.findFirst({
      select: {
        delay: true,
      }
    });
    return result ? result.delay : 30000;
  }

  async setDelay(delay: number): Promise<string> {
    await this.databaseService.nexus_Settings.update({
      where: {id: 1},
      data: {delay}
    })
    return `Delay set to ${delay}.`
  }
}
