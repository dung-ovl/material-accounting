import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryMansService } from './deliverymans.service';

describe('DeliveryMansService', () => {
  let service: DeliveryMansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryMansService],
    }).compile();

    service = module.get<DeliveryMansService>(DeliveryMansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
