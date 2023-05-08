import { Module } from '@nestjs/common';
import { SuppliersController } from './controllers/suppliers.controller';
import { SuppliersService } from './services/suppliers.service';
import { Nhacungcap } from 'entities/Nhacungcap.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Nhacungcap])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
