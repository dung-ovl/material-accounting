import { Module } from '@nestjs/common';
import { MaterialController } from './controllers/material.controller';
import { MaterialService } from './services/material.service';
import { Vattu } from 'entities/Vattu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vattu])],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
