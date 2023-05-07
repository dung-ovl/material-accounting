import { Module } from '@nestjs/common';
import { DepartmentsController } from './controllers/departments.controller';
import { DepartmentsService } from './services/departments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bophan } from '../../entities/Bophan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bophan])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
