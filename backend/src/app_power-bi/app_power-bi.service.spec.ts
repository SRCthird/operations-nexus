import { Test, TestingModule } from '@nestjs/testing';
import { AppPowerBiService } from './app_power-bi.service';

describe('AppPowerBiService', () => {
  let service: AppPowerBiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppPowerBiService],
    }).compile();

    service = module.get<AppPowerBiService>(AppPowerBiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
