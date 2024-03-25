import { Test, TestingModule } from '@nestjs/testing';
import { PageTwoByTwoService } from './two-by-two.service';

describe('PageFullDisplayService', () => {
  let service: PageTwoByTwoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageTwoByTwoService],
    }).compile();

    service = module.get<PageTwoByTwoService>(PageTwoByTwoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
