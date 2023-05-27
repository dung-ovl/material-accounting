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
import { Public } from 'src/middleware/auth.public';
import { StaffsService } from '../services/staffs.service';
import { CreateStaffDto, UpdateStaffDto } from '../dtos';
import { Nhanvien } from 'entities/Nhanvien.entity';

@ApiBearerAuth()
@ApiTags('nhanvien')
@Controller('nhanvien')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.staffsService.findAll();
  }

  @Public()
  @Get('/join')
  async getWithJoin() {
    return await this.staffsService.joinWithCT();
  }

  @Post()
  async create(@Body() dto: CreateStaffDto) {
    const result = await this.staffsService.create(dto);
    if (result instanceof Nhanvien) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateStaffDto) {
    return await this.staffsService.update(dto);
  }

  @Delete('/:MaNV')
  async delete(@Param('MaNV') MaNV: string) {
    return await this.staffsService.remove(MaNV);
  }
}
