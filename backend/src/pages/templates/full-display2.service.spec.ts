import { Test, TestingModule } from '@nestjs/testing';
import { PageFullDisplay2Service } from './full-display2.service';

describe('PageFullDisplay2Service', () => {
  let service: PageFullDisplay2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageFullDisplay2Service],
    }).compile();

    service = module.get<PageFullDisplay2Service>(PageFullDisplay2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
