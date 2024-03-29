import { Test, TestingModule } from '@nestjs/testing';
import { OneByThreeService } from './one-by-three.service';

describe('OneByThreeService', () => {
  let service: OneByThreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OneByThreeService],
    }).compile();

    service = module.get<OneByThreeService>(OneByThreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
