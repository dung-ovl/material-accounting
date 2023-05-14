import { Test, TestingModule } from '@nestjs/testing';
import { SurMaterialService } from './surmaterial.service';

describe('SurMaterialService', () => {
  let service: SurMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurMaterialService],
    }).compile();

    service = module.get<SurMaterialService>(SurMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
