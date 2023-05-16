import { Test, TestingModule } from '@nestjs/testing';
import { DetailInventoriesController } from './detail_inventories.controller';

describe('InventoriesController', () => {
  let controller: DetailInventoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailInventoriesController],
    }).compile();

    controller = module.get<DetailInventoriesController>(DetailInventoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
