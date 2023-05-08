import { Module } from '@nestjs/common';
import { StaffsController } from './controllers/staffs.controller';
import { StaffsService } from './services/staffs.service';
import { Nhanvien } from 'entities/Nhanvien.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Nhanvien])],
  controllers: [StaffsController],
  providers: [StaffsService],
})
export class StaffsModule {}
