import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import config from 'orm-config';
import { JWTConfig } from 'jwt_config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './middleware/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { DepartmentsModule } from './departments/departments.module';
import { DeliverymansModule } from './deliverymans/deliveryman.module';
import { RecipientsModule } from './recipients/recipient.module';
import { SuppliersModule } from './suppliers/supplier.module';
import { StaffsModule } from './staffs/staff.module';
import {InventoriesModule} from './inventories/inventories.module';
import { DetailInventoriesModule } from './detail_inventories/detail_inventories.module';
import { ReceiptModule } from './receipt/receipt.module';
import { DetailReceiptModule } from './detail_receipt/detail_receipt.module'
import { ExportModule } from './export/export.module';
import { DetailExportModule } from './detail_export/detail_export.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    AccountsModule,
    JwtModule.register({
      global: true,
      secret: JWTConfig.secret,
      signOptions: { expiresIn: JWTConfig.expiresIn },
    }),
    DepartmentsModule,
    DeliverymansModule,
    RecipientsModule,
    SuppliersModule,
    StaffsModule,
    InventoriesModule,
    DetailInventoriesModule,
    ReceiptModule,
    DetailReceiptModule,
    ExportModule,
    DetailExportModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
