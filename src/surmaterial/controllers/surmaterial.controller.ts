import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SurMaterialService } from '../services/surmaterial.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middleware/auth.public';
import { Kho } from 'entities/Kho.entity';
import {
  CreateSurMaterialDto,
  UpdateSurMaterialDto,
  QuerySurmaterialDto,
} from '../dtos';
import { Dudauvattu } from 'entities/Dudauvattu.entity';

@ApiBearerAuth()
@ApiTags('dudauvattu')
@Controller('dudauvattu')
export class SurMaterialController {
  constructor(private readonly surMaterialService: SurMaterialService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.surMaterialService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateSurMaterialDto) {
    const result = await this.surMaterialService.create(dto);
    if (result instanceof Dudauvattu) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateSurMaterialDto) {
    return await this.surMaterialService.update(dto);
  }

  @Delete('/:MaSo')
  async delete(@Param('MaSo') MaSo: number) {
    return await this.surMaterialService.remove(MaSo);
  }

  @Public()
  @Get('/alltonkhongay')
  async getStocksByDay(@Query() params: QuerySurmaterialDto) {
    return await this.surMaterialService.getStocksByDay(params);
  }

  @Public()
  @Get('/alltonkhothang')
  async getStocksByMonth(@Query() params: QuerySurmaterialDto) {
    return await this.surMaterialService.getStocksByMonth(params);
  }

  @Public()
  @Get('/tonkhothang')
  async getStockByMonth(@Query() params: QuerySurmaterialDto) {
    return await this.surMaterialService.getStockByMonth(params);
  }

  @Public()
  @Get('/tonkho')
  async getStock(@Query() params: QuerySurmaterialDto) {
    return await this.surMaterialService.getStock(params);
  }

  @Public()
  @Get('/kiemtradudauky')
  async getStockByYear(@Query() params: QuerySurmaterialDto) {
    return await this.surMaterialService.getStockByYear(params);
  }
}
