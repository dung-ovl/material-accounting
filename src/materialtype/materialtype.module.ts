import { Module } from '@nestjs/common';
import { MaterialTypeController } from './controllers/materialtype.controller';
import { MaterialTypeService } from './services/materialtype.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loaivattu } from 'entities/Loaivattu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loaivattu])],
  controllers: [MaterialTypeController],
  providers: [MaterialTypeService],
})
export class MaterialTypeModule {}
