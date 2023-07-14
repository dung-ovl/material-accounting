import { Module } from '@nestjs/common';
import { MaterialController } from './controllers/material.controller';
import MaterialService from './services/material.service';
import { Vattu } from 'entities/Vattu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurMaterialService } from 'src/surmaterial/services/surmaterial.service';
import DetailReceiptService from 'src/detail_receipt/services/detail_receipt.service';
import { SurMaterialModule } from 'src/surmaterial/surmaterial.module';
import { DetailReceiptModule } from 'src/detail_receipt/detail_receipt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vattu]),
    SurMaterialModule,
    DetailReceiptModule,
  ],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
