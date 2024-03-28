import { Test, TestingModule } from '@nestjs/testing';
import { PageFullDisplay3Service } from './full-display3.service';

describe('PageFullDisplay3Service', () => {
  let service: PageFullDisplay3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageFullDisplay3Service],
    }).compile();

    service = module.get<PageFullDisplay3Service>(PageFullDisplay3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
