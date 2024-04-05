import { Test, TestingModule } from '@nestjs/testing';
import { AppsController } from './app.controller';
import { AppPowerBiService } from './apps/power-bi.service';

describe('AppController', () => {
  let controller: AppsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppsController],
      providers: [AppPowerBiService],
    }).compile();

    controller = module.get<AppsController>(AppsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
