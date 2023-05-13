import { Module } from '@nestjs/common';
import { DetailInventoriesController } from './controllers/detail_inventories.controller';
import { DetailInventoriesService } from './services/detail_inventories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CtBbkiemke } from 'entities/CtBbkiemke.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CtBbkiemke])],
  controllers: [DetailInventoriesController],
  providers: [DetailInventoriesService],
})
export class DetailInventoriesModule {}
