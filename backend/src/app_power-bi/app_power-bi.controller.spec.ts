import { Test, TestingModule } from '@nestjs/testing';
import { AppPowerBiController } from './app_power-bi.controller';
import { AppPowerBiService } from './app_power-bi.service';

describe('AppPowerBiController', () => {
  let controller: AppPowerBiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppPowerBiController],
      providers: [AppPowerBiService],
    }).compile();

    controller = module.get<AppPowerBiController>(AppPowerBiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
