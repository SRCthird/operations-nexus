import { Test, TestingModule } from '@nestjs/testing';
import { PageSplitScreenService } from './split-screen.service';

describe('PageFullDisplayService', () => {
  let service: PageSplitScreenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageSplitScreenService],
    }).compile();

    service = module.get<PageSplitScreenService>(PageSplitScreenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
