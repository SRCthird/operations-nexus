import { Test, TestingModule } from '@nestjs/testing';
import { PageFullDisplay5Service } from './full-display5.service';

describe('PageFullDisplay5Service', () => {
  let service: PageFullDisplay5Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageFullDisplay5Service],
    }).compile();

    service = module.get<PageFullDisplay5Service>(PageFullDisplay5Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
