import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import config from 'orm-config';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
