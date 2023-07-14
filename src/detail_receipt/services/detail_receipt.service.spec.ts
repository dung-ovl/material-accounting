import { Test, TestingModule } from '@nestjs/testing';
import DetailReceiptService from './detail_receipt.service';

describe('AccountsService', () => {
  let service: DetailReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailReceiptService],
    }).compile();

    service = module.get<DetailReceiptService>(DetailReceiptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
