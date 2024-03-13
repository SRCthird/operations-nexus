import { Test, TestingModule } from '@nestjs/testing';
import { PageThreeOnTwoService } from './page_three-on-two.service';

describe('PageThreeOnTwoService', () => {
  let service: PageThreeOnTwoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageThreeOnTwoService],
    }).compile();

    service = module.get<PageThreeOnTwoService>(PageThreeOnTwoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
