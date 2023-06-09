import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DetailInventoriesService } from '../services/detail_inventories.service';
import { CreateDetailInventoryDto, UpdateDetailInventoryDto } from '../dtos/index';
import { CtBbkiemke } from '../../../entities/CtBbkiemke.entity';
import { Public } from 'src/middleware/auth.public';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('ct_bbkiemke')
@Controller('ct_bbkiemke')
export class DetailInventoriesController {
  constructor(private readonly delinventoriesService: DetailInventoriesService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.delinventoriesService.findAll();
  }


  @Public()
  @Get('/:SoBienBan')
  async getByIdInven(@Param('SoBienBan') SoBienBan: string) {
    return await this.delinventoriesService.findByIdInven(SoBienBan);
  }

  @Post()
  async create(@Body() dto: CreateDetailInventoryDto) {
    const result = await this.delinventoriesService.create(dto);
    if (result instanceof CtBbkiemke) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateDetailInventoryDto) {
    return await this.delinventoriesService.update(dto);
  }

  @Delete('/:SoBienBan')
  async delete(@Param('SoBienBan') SoBienBan: string) {
    return await this.delinventoriesService.remove(SoBienBan);
  }
}
