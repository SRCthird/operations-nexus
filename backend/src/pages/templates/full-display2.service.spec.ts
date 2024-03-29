import { Test, TestingModule } from '@nestjs/testing';
import { FullDisplay2Service } from './full-display2.service';

describe('PageFullDisplay2Service', () => {
  let service: FullDisplay2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FullDisplay2Service],
    }).compile();

    service = module.get<FullDisplay2Service>(FullDisplay2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
