import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Nguoidung } from '../../entities/Nguoidung.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nguoidung])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
