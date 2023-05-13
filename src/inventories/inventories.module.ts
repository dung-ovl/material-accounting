import { Module } from '@nestjs/common';
import { InventoriesController } from './controllers/inventories.controller';
import { InventoriesService } from './services/inventories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bbkiemke } from 'entities/Bbkiemke.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bbkiemke])],
  controllers: [InventoriesController],
  providers: [InventoriesService],
})
export class InventoriesModule {}
