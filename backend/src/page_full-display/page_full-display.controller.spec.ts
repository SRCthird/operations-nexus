import { Test, TestingModule } from '@nestjs/testing';
import { PageFullDisplayController } from './page_full-display.controller';
import { PageFullDisplayService } from './page_full-display.service';

describe('PageFullDisplayController', () => {
  let controller: PageFullDisplayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageFullDisplayController],
      providers: [PageFullDisplayService],
    }).compile();

    controller = module.get<PageFullDisplayController>(PageFullDisplayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
