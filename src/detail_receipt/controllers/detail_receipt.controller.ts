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
import { DetailReceiptService } from '../services/detail_receipt.service';
import { CreateDetailReceiptDto, UpdateDetailReceiptDto, QueryReceiptDto } from '../dtos/index';
import { Public } from 'src/middleware/auth.public';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CtPhieunhap } from 'entities/CtPhieunhap.entity';

@ApiBearerAuth()
@ApiTags('ct_phieunhap')
@Controller('ct_phieunhap')
export class DetailReceiptController {
  constructor(private readonly detReceiptService: DetailReceiptService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.detReceiptService.findAll();
  }

  @Public()
  @Get('/chart')
  async getWithChart(@Query() params: QueryReceiptDto) {
    return this.detReceiptService.getByChart(params);
  }

  @Public()
  @Get('/ctpnngay')
  async getWithDay(@Query() params: QueryReceiptDto) {
    return await this.detReceiptService.getByDay(params);
  }

  @Public()
  @Get('/allctpnthang')
  async getWithMonth(@Query() params: QueryReceiptDto) {
    return await this.detReceiptService.getAllByMonth(params);
  }

  @Public()
  @Get('/ctpnthang')
  async getAllWithMonth(@Query() params: QueryReceiptDto) {
    return await this.detReceiptService.getByMonth(params);
  }

  @Public()
  @Get('/ctpn')
  async getBy(@Query() params: QueryReceiptDto) {
    return await this.detReceiptService.getBy(params);
  }

  @Public()
  @Get('/:SoPhieu')
  async getByWith(@Param('SoPhieu') SoPhieu: string) {
    return await this.detReceiptService.getByWith(SoPhieu);
  }

  @Post()
  async create(@Body() dto: CreateDetailReceiptDto) {
    const result = await this.detReceiptService.create(dto);
    if (result instanceof CtPhieunhap) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateDetailReceiptDto) {
    return await this.detReceiptService.update(dto);
  }

  @Delete('/:SoPhieu')
  async delete(@Param('SoPhieu') SoPhieu: string) {
    return await this.detReceiptService.remove(SoPhieu);
  }
}
