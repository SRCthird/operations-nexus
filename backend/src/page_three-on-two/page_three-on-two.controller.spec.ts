import { Test, TestingModule } from '@nestjs/testing';
import { PageThreeOnTwoController } from './page_three-on-two.controller';
import { PageThreeOnTwoService } from './page_three-on-two.service';

describe('PageThreeOnTwoController', () => {
  let controller: PageThreeOnTwoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageThreeOnTwoController],
      providers: [PageThreeOnTwoService],
    }).compile();

    controller = module.get<PageThreeOnTwoController>(PageThreeOnTwoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
