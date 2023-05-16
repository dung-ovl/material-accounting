import { Module } from '@nestjs/common';
import { ContructionController } from './controllers/contruction.controller';
import { ContructionService } from './services/contruction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Congtrinh } from 'entities/Congtrinh.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Congtrinh])],
  controllers: [ContructionController],
  providers: [ContructionService],
})
export class ContructionModule {}
