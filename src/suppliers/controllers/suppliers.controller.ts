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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middleware/auth.public';
import { CreateSupplierDto, UpdateSupplierDto } from '../dtos';
import { Nhacungcap } from 'entities/Nhacungcap.entity';
import { SuppliersService } from '../services/suppliers.service';

@ApiBearerAuth()
@ApiTags('nhacungcap')
@Controller('nhacungcap')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.suppliersService.findAll();
  }

  @Public()
  @Get('/:maNcc')
  async getById(@Param('maNcc') maNcc: string) {
    const acc = await this.suppliersService.findOne(maNcc);
    if (acc == null) throw new NotFoundException();
    return acc;
  }

  @Post()
  async create(@Body() dto: CreateSupplierDto) {
    const result = await this.suppliersService.create(dto);
    if (result instanceof Nhacungcap) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateSupplierDto) {
    return await this.suppliersService.update(dto);
  }

  @Delete('/:maNcc')
  async delete(@Param('maNcc') maNcc: string) {
    return await this.suppliersService.remove(maNcc);
  }
}
