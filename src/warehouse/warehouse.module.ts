import { Module } from '@nestjs/common';
import { WarehouseController } from './controllers/warehouse.controller';
import { WarehouseService } from './services/warehouse.service';
import { Kho } from 'entities/Kho.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Kho])],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
