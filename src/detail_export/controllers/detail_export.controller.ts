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
  Query,
} from '@nestjs/common';
import { DetailExportService } from '../services/detail_export.service';
import { CreateDetailExportDto, UpdateDetailExportDto, QueryExportDto } from '../dtos/index';
import { Public } from 'src/middleware/auth.public';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CtPhieunhap } from 'entities/CtPhieunhap.entity';

@ApiBearerAuth()
@ApiTags('ct_phieuxuat')
@Controller('ct_phieuxuat')
export class DetailExportController {
  constructor(private readonly detReceiptService: DetailExportService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.detReceiptService.findAll();
  }

  @Public()
  @Get('/chart')
  async getWithChart(@Query() params: QueryExportDto) {
    console.log(this.detReceiptService.getByChart(params));
    return this.detReceiptService.getByChart(params);
  }

  @Public()
  @Get('/ctpxngay')
  async getWithDay(@Query() params: QueryExportDto) {
    return await this.detReceiptService.getByDay(params);
  }

  @Public()
  @Get('/allctpxthang')
  async getWithMonth(@Query() params: QueryExportDto) {
    return await this.detReceiptService.getAllByMonth(params);
  }

  @Public()
  @Get('/ctpxthang')
  async getAllWithMonth(@Query() params: QueryExportDto) {
    return await this.detReceiptService.getAllByMonth(params);
  }

  @Public()
  @Get('/ctpx')
  async getBy(@Query() params: QueryExportDto) {
    return await this.detReceiptService.getBy(params);
  }

  @Public()
  @Get('/:soPhieu')
  async getByWith(@Param('soPhieu') soPhieu: string) {
    return await this.detReceiptService.getByWith(soPhieu);
  }

  @Post()
  async create(@Body() dto: CreateDetailExportDto) {
    const result = await this.detReceiptService.create(dto);
    if (result instanceof CtPhieunhap) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateDetailExportDto) {
    return await this.detReceiptService.update(dto);
  }

  @Delete('/:soPhieu')
  async delete(@Param('soPhieu') soPhieu: string) {
    return await this.detReceiptService.remove(soPhieu);
  }
}
