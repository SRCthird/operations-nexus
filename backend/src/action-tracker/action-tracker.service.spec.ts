import { Test, TestingModule } from '@nestjs/testing';
import { ActionTrackerService } from './action-tracker.service';

describe('ActionTrackerService', () => {
  let service: ActionTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionTrackerService],
    }).compile();

    service = module.get<ActionTrackerService>(ActionTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
