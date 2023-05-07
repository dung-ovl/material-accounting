import { Module } from '@nestjs/common';
import { DeliveryMansController } from './controllers/deliverymans.controller';
import { DeliveryMansService } from './services/deliverymans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nguoigiao } from 'entities/Nguoigiao.entity';
import { SuppliersService } from 'src/suppliers/services/suppliers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nguoigiao])],
  controllers: [DeliveryMansController],
  providers: [DeliveryMansService],
})
export class DeliverymansModule {}
