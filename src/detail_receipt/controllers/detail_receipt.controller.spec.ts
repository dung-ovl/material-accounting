import { Test, TestingModule } from '@nestjs/testing';
import { DetailReceiptController } from './detail_receipt.controller';

describe('InventoriesController', () => {
  let controller: DetailReceiptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailReceiptController],
    }).compile();

    controller = module.get<DetailReceiptController>(DetailReceiptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
