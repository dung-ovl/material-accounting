import { Module } from '@nestjs/common';
import { RecipientsController } from './controllers/recipients.controller';
import { RecipientsService } from './services/recipients.service';
import { Nguoinhan } from 'entities/Nguoinhan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Nguoinhan])],
  controllers: [RecipientsController],
  providers: [RecipientsService],
})
export class RecipientsModule {}
