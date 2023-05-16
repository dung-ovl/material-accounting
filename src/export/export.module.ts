import { Module } from '@nestjs/common';
import { ExportController } from './controllers/export.controller';
import { ExportService } from './services/export.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phieuxuat } from 'entities/Phieuxuat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phieuxuat])],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}
