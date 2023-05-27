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
import { InventoriesService } from '../services/inventories.service';
import { CreateInventoryDto, UpdateInventoryDto } from '../dtos/index';
import { Bbkiemke } from '../../../entities/Bbkiemke.entity';
import { Public } from 'src/middleware/auth.public';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('bbkiemke')
@Controller('bbkiemke')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.inventoriesService.findAll();
  }


  @Public()
  @Get('/join')
  async getWithJoin() {
    return await this.inventoriesService.joinWithTB();
  }

  @Post()
  async create(@Body() dto: CreateInventoryDto) {
    const result = await this.inventoriesService.create(dto);
    if (result instanceof Bbkiemke) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateInventoryDto) {
    return await this.inventoriesService.update(dto);
  }

  @Delete('/:SoBienBan')
  async delete(@Param('SoBienBan') SoBienBan: string) {
    return await this.inventoriesService.remove(SoBienBan);
  }
}
