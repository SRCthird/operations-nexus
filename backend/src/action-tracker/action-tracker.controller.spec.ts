import { Test, TestingModule } from '@nestjs/testing';
import { ActionTrackerController } from './action-tracker.controller';
import { ActionTrackerService } from './action-tracker.service';

describe('ActionTrackerController', () => {
  let controller: ActionTrackerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionTrackerController],
      providers: [ActionTrackerService],
    }).compile();

    controller = module.get<ActionTrackerController>(ActionTrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
