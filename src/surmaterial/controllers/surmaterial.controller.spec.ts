import { Test, TestingModule } from '@nestjs/testing';
import { SurMaterialController } from './surmaterial.controller';

describe('SurMaterialController', () => {
  let controller: SurMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurMaterialController],
    }).compile();

    controller = module.get<SurMaterialController>(SurMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
