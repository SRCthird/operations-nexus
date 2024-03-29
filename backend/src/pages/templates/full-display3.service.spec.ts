import { Test, TestingModule } from '@nestjs/testing';
import { FullDisplay3Service } from './full-display3.service';

describe('PageFullDisplay3Service', () => {
  let service: FullDisplay3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FullDisplay3Service],
    }).compile();

    service = module.get<FullDisplay3Service>(FullDisplay3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
