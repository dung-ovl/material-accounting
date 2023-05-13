import { Test, TestingModule } from '@nestjs/testing';
import { DetailInventoriesService } from './detail_inventories.service';

describe('AccountsService', () => {
  let service: DetailInventoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailInventoriesService],
    }).compile();

    service = module.get<DetailInventoriesService>(DetailInventoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
