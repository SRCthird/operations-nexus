import { Test, TestingModule } from '@nestjs/testing';
import { ThreeOnTwoService } from './three-on-two.service';

describe('ThreeOnTwoService', () => {
  let service: ThreeOnTwoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreeOnTwoService],
    }).compile();

    service = module.get<ThreeOnTwoService>(ThreeOnTwoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
