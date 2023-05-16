import { Module } from '@nestjs/common';
import { DetailReceiptController } from './controllers/detail_receipt.controller';
import { DetailReceiptService } from './services/detail_receipt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CtPhieunhap } from 'entities/CtPhieunhap.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CtPhieunhap])],
  controllers: [DetailReceiptController],
  providers: [DetailReceiptService],
})
export class DetailReceiptModule {}
