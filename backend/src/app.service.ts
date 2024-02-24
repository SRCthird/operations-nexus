import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AppService {
  
  constructor(private readonly databaseService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDelay(): Promise<number> {
    let result = await this.databaseService.settings.findFirst({
      select: {
        Delay: true,
      }
    });
    return result ? result.Delay : 30000;
  }

  async setDelay(delay: number): Promise<string> {
    await this.databaseService.settings.update({
      where: {ID: 1},
      data: {Delay: delay}
    })
    return `Delay set to ${delay}.`
  }
}
