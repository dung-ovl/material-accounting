import { Module } from '@nestjs/common';
import { DetailExportController } from './controllers/detail_export.controller';
import { DetailExportService } from './services/detail_export.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CtPhieuxuat } from 'entities/CtPhieuxuat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CtPhieuxuat])],
  controllers: [DetailExportController],
  providers: [DetailExportService],
})
export class DetailExportModule {}
