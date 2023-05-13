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
import { ContructionService } from '../services/contruction.service';
import { CreateContructionDto, UpdateContructionDto } from '../dtos/index';
import { Public } from 'src/middleware/auth.public';
import { Congtrinh } from 'entities/Congtrinh.entity';

@ApiBearerAuth()
@ApiTags('congtrinh')
@Controller('congtrinh')
export class ContructionController {
  constructor(private readonly contructionService: ContructionService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.contructionService.findAll();
  }

  @Delete('/:MaCongTrinh')
  async delete(@Param('maCongTrinh') maCongTrinh: string) {
    return await this.contructionService.remove(maCongTrinh);
  }

  @Post()
  async create(@Body() dto: CreateContructionDto) {
    const result = await this.contructionService.create(dto);
    if (result instanceof Congtrinh) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateContructionDto) {
    return await this.contructionService.update(dto);
  }
}
