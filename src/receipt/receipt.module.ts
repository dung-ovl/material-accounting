import { Module } from '@nestjs/common';
import { ReceiptController } from './controllers/receipt.controller';
import { ReceiptService } from './services/receipt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phieunhap } from 'entities/Phieunhap.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phieunhap])],
  controllers: [ReceiptController],
  providers: [ReceiptService],
})
export class ReceiptModule {}
