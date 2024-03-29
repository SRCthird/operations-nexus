import { Test, TestingModule } from '@nestjs/testing';
import { TwoByTwoService } from './two-by-two.service';

describe('TwoByTwoService', () => {
  let service: TwoByTwoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwoByTwoService],
    }).compile();

    service = module.get<TwoByTwoService>(TwoByTwoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
