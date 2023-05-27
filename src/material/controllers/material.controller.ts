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
import { MaterialService } from '../services/material.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middleware/auth.public';
import { Kho } from 'entities/Kho.entity';
import {
  CreateMaterialDto,
  UpdateMaterialDto,
  JoinedMaterialDto,
} from '../dtos';

@ApiBearerAuth()
@ApiTags('vattu')
@Controller('vattu')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.materialService.findAll();
  }

  @Public()
  @Get('/join')
  async getWithJoin() {
    return await this.materialService.joinWithCT();
  }

  @Post()
  async create(@Body() dto: CreateMaterialDto) {
    const result = await this.materialService.create(dto);
    if (result instanceof Kho) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateMaterialDto) {
    return await this.materialService.update(dto);
  }

  @Delete('/:MaVT')
  async delete(@Param('MaVT') MaVT: string) {
    return await this.materialService.remove(MaVT);
  }
}
