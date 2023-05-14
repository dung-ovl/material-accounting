import { Module } from '@nestjs/common';
import { SurMaterialController } from './controllers/surmaterial.controller';
import { SurMaterialService } from './services/surmaterial.service';
import { Dudauvattu } from 'entities/Dudauvattu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Dudauvattu])],
  controllers: [SurMaterialController],
  providers: [SurMaterialService],
})
export class SurMaterialModule {}
