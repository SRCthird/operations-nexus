import { Test, TestingModule } from '@nestjs/testing';
import { PageFullDisplay4Service } from './full-display4.service';

describe('PageFullDisplay4Service', () => {
  let service: PageFullDisplay4Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageFullDisplay4Service],
    }).compile();

    service = module.get<PageFullDisplay4Service>(PageFullDisplay4Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
