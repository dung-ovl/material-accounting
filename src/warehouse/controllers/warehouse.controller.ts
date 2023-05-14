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
import { WarehouseService } from '../services/warehouse.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middleware/auth.public';
import { Kho } from 'entities/Kho.entity';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../dtos';

@ApiBearerAuth()
@ApiTags('kho')
@Controller('kho')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.warehouseService.findAll();
  }

  @Public()
  @Get('/join')
  async getWithJoin() {
    return await this.warehouseService.joinWithCT();
  }

  @Post()
  async create(@Body() dto: CreateWarehouseDto) {
    const result = await this.warehouseService.create(dto);
    if (result instanceof Kho) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateWarehouseDto) {
    return await this.warehouseService.update(dto);
  }

  @Delete('/:MaKho')
  async delete(@Param('MaKho') maKho: string) {
    return await this.warehouseService.remove(maKho);
  }
}
