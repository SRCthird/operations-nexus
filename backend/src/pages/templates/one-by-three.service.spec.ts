import { Test, TestingModule } from '@nestjs/testing';
import { PageOneByThreeService } from './one-by-three.service';

describe('PageOneByThreeService', () => {
  let service: PageOneByThreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageOneByThreeService],
    }).compile();

    service = module.get<PageOneByThreeService>(PageOneByThreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
