import { Test, TestingModule } from '@nestjs/testing';
import { FullDisplay4Service } from './full-display4.service';

describe('FullDisplay4Service', () => {
  let service: FullDisplay4Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FullDisplay4Service],
    }).compile();

    service = module.get<FullDisplay4Service>(FullDisplay4Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
