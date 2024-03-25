import { Test, TestingModule } from '@nestjs/testing';
import { PageFullWithCircleService } from './full-with-circle.service';

describe('PageFullWithCircleService', () => {
  let service: PageFullWithCircleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageFullWithCircleService],
    }).compile();

    service = module.get<PageFullWithCircleService>(PageFullWithCircleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
