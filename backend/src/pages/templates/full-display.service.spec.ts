import { Test, TestingModule } from '@nestjs/testing';
import { FullDisplayService } from './full-display.service';

describe('PageFullDisplayService', () => {
  let service: FullDisplayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FullDisplayService],
    }).compile();

    service = module.get<FullDisplayService>(FullDisplayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
