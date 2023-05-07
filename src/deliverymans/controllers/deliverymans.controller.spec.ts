import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryMansController } from './deliverymans.controller';

describe('DeliveryMansController', () => {
  let controller: DeliveryMansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryMansController],
    }).compile();

    controller = module.get<DeliveryMansController>(DeliveryMansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
