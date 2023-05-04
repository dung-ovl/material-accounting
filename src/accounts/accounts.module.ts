import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taikhoan } from './Taikhoan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Taikhoan])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
