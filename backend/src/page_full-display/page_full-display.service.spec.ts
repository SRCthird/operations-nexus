import { Test, TestingModule } from '@nestjs/testing';
import { PageFullDisplayService } from './page_full-display.service';

describe('PageFullDisplayService', () => {
  let service: PageFullDisplayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageFullDisplayService],
    }).compile();

    service = module.get<PageFullDisplayService>(PageFullDisplayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
