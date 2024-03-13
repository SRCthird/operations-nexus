import { Test, TestingModule } from '@nestjs/testing';
import { AppPowerPointService } from './app_power-point.service';

describe('AppPowerPointService', () => {
  let service: AppPowerPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppPowerPointService],
    }).compile();

    service = module.get<AppPowerPointService>(AppPowerPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
