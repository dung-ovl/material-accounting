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
import { MaterialTypeService } from '../services/materialtype.service';
import { CreateMaterialTypeDto, UpdateMaterialTypeDto } from '../dtos/index';
import { Public } from 'src/middleware/auth.public';
import { Loaivattu } from 'entities/Loaivattu.entity';

@ApiBearerAuth()
@ApiTags('loaivattu')
@Controller('loaivattu')
export class MaterialTypeController {
  constructor(private readonly materialTypeService: MaterialTypeService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.materialTypeService.findAll();
  }

  @Delete('/:MaLoai')
  async delete(@Param('MaLoai') MaLoai: string) {
    return await this.materialTypeService.remove(MaLoai);
  }

  @Post()
  async create(@Body() dto: CreateMaterialTypeDto) {
    const result = await this.materialTypeService.create(dto);
    if (result instanceof Loaivattu) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateMaterialTypeDto) {
    return await this.materialTypeService.update(dto);
  }
}
