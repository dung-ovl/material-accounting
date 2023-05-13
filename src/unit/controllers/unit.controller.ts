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
import { UnitService } from '../services/unit.service';
import { CreateUnitDto, UpdateUnitDto } from '../dtos/index';
import { Public } from 'src/middleware/auth.public';
import { Donvitinh } from 'entities/Donvitinh.entity';

@ApiBearerAuth()
@ApiTags('donvitinh')
@Controller('donvitinh')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.unitService.findAll();
  }

  @Delete('/:MaDVT')
  async delete(@Param('maDVT') maDVT: string) {
    return await this.unitService.remove(maDVT);
  }

  @Post()
  async create(@Body() dto: CreateUnitDto) {
    const result = await this.unitService.create(dto);
    if (result instanceof Donvitinh) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateUnitDto) {
    return await this.unitService.update(dto);
  }
}
