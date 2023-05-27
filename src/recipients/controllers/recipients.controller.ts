import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecipientsService } from '../services/recipients.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middleware/auth.public';
import { Nguoinhan } from 'entities/Nguoinhan.entity';
import { CreateRecipientDto, UpdateRecipientDto } from '../dtos';

@ApiBearerAuth()
@ApiTags('nguoinhan')
@Controller('nguoinhan')
export class RecipientsController {
  constructor(private readonly recipientsService: RecipientsService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.recipientsService.findAll();
  }

  @Public()
  @Get('/join')
  async getWithJoin() {
    return await this.recipientsService.joinWithCT();
  }

  @Post()
  async create(@Body() dto: CreateRecipientDto) {
    const result = await this.recipientsService.create(dto);
    if (result instanceof Nguoinhan) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateRecipientDto) {
    return await this.recipientsService.update(dto);
  }

  @Delete('/:MaNguoiNhan')
  async delete(@Param('MaNguoiNhan') MaNguoiNhan: string) {
    return await this.recipientsService.remove(MaNguoiNhan);
  }
}
