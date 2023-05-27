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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeliveryMansService } from '../services/deliverymans.service';
import { Public } from 'src/middleware/auth.public';
import { CreateDeliveryManDto, UpdateDeliveryManDto } from '../dtos';
import { Nguoigiao } from 'entities/Nguoigiao.entity';

@ApiBearerAuth()
@ApiTags('nguoigiao')
@Controller('nguoigiao')
export class DeliveryMansController {
  constructor(private readonly deliveryMansService: DeliveryMansService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.deliveryMansService.findAll();
  }

  @Public()
  @Get('/join')
  async getWithJoin() {
    return await this.deliveryMansService.joinWithNcc();
  }

  @Post()
  async create(@Body() dto: CreateDeliveryManDto) {
    const result = await this.deliveryMansService.create(dto);
    if (result instanceof Nguoigiao) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateDeliveryManDto) {
    return await this.deliveryMansService.update(dto);
  }

  @Delete('/:MaNguoiGiao')
  async delete(@Param('MaNguoiGiao') MaNguoiGiao: string) {
    return await this.deliveryMansService.remove(MaNguoiGiao);
  }
}
