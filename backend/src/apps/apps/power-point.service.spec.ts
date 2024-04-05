import { Test, TestingModule } from '@nestjs/testing';
import { PowerPointService } from './power-point.service';

describe('PowerPointService', () => {
  let service: PowerPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PowerPointService],
    }).compile();

    service = module.get<PowerPointService>(PowerPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
