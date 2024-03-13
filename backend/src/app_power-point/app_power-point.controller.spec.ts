import { Test, TestingModule } from '@nestjs/testing';
import { AppPowerPointController } from './app_power-point.controller';
import { AppPowerPointService } from './app_power-point.service';

describe('AppPowerPointController', () => {
  let controller: AppPowerPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppPowerPointController],
      providers: [AppPowerPointService],
    }).compile();

    controller = module.get<AppPowerPointController>(AppPowerPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
