import { Test, TestingModule } from '@nestjs/testing';
import { FullDisplay5Service } from './full-display5.service';

describe('FullDisplay5Service', () => {
  let service: FullDisplay5Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FullDisplay5Service],
    }).compile();

    service = module.get<FullDisplay5Service>(FullDisplay5Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
