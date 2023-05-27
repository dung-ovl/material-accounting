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
import { ExportService } from '../services/export.service';
import { CreateExportDto, UpdateExportDto } from '../dtos/index';
import { Public } from 'src/middleware/auth.public';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Phieunhap } from 'entities/Phieunhap.entity';

@ApiBearerAuth()
@ApiTags('phieuxuat')
@Controller('phieuxuat')
export class ExportController {
  constructor(private readonly receiptService: ExportService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.receiptService.findAll();
  }


  @Public()
  @Get('/join')
  async getWithJoin() {
    return await this.receiptService.joinWithRec();
  }

  @Post()
  async create(@Body() dto: CreateExportDto) {
    const result = await this.receiptService.create(dto);
    if (result instanceof Phieunhap) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateExportDto) {
    return await this.receiptService.update(dto);
  }

  @Put('/:SoPhieu')
  async put(@Param('SoPhieu') SoPhieu: string, @Body() dto: UpdateExportDto) {
    return await this.receiptService.updat2(SoPhieu, dto);
  }

  @Delete('/:SoPhieu')
  async delete(@Param('SoPhieu') SoPhieu: string) {
    return await this.receiptService.remove(SoPhieu);
  }
}
