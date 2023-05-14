import { Test, TestingModule } from '@nestjs/testing';
import { DetailExportController } from './detail_receipt.controller';

describe('InventoriesController', () => {
  let controller: DetailExportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailExportController],
    }).compile();

    controller = module.get<DetailExportController>(DetailExportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
