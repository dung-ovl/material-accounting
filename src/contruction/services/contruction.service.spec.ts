import { Test, TestingModule } from '@nestjs/testing';
import { ContructionService } from './contruction.service';

describe('ContructionService', () => {
  let service: ContructionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContructionService],
    }).compile();

    service = module.get<ContructionService>(ContructionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
