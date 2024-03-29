import { Test, TestingModule } from '@nestjs/testing';
import { SplitScreenService } from './split-screen.service';

describe('SplitScreenService', () => {
  let service: SplitScreenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SplitScreenService],
    }).compile();

    service = module.get<SplitScreenService>(SplitScreenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
