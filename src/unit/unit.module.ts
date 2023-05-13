import { Module } from '@nestjs/common';
import { UnitController } from './controllers/unit.controller';
import { UnitService } from './services/unit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donvitinh } from 'entities/Donvitinh.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donvitinh])],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
