import { Test, TestingModule } from '@nestjs/testing';
import { FullWithCircleService } from './full-with-circle.service';

describe('FullWithCircleService', () => {
  let service: FullWithCircleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FullWithCircleService],
    }).compile();

    service = module.get<FullWithCircleService>(FullWithCircleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
