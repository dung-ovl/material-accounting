import { Test, TestingModule } from '@nestjs/testing';
import { ContructionController } from './contruction.controller';

describe('ContructionController', () => {
  let controller: ContructionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContructionController],
    }).compile();

    controller = module.get<ContructionController>(ContructionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
