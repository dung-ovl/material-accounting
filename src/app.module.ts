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
import { ContructionModule } from './contruction/contruction.module';
import { UnitModule } from './unit/unit.module';
import { MaterialTypeModule } from './materialtype/materialtype.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { MaterialModule } from './material/material.module';
import { SurMaterialModule } from './surmaterial/surmaterial.module';

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
    ContructionModule,
    UnitModule,
    MaterialTypeModule,
    WarehouseModule,
    MaterialModule,
    SurMaterialModule,
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
