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
import { DepartmentsService } from '../services/departments.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dtos';
import { Bophan } from '../../../entities/Bophan.entity';
import { Public } from 'src/middleware/auth.public';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('bophan')
@Controller('bophan')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.departmentsService.findAll();
  }

  @Public()
  @Get('/:maBoPhan')
  async getById(@Param('maBoPhan') maBoPhan: string) {
    const acc = await this.departmentsService.findOne(maBoPhan);
    if (acc == null) throw new NotFoundException();
    return acc;
  }

  @Post()
  async create(@Body() dto: CreateDepartmentDto) {
    const result = await this.departmentsService.create(dto);
    if (result instanceof Bophan) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateDepartmentDto) {
    return await this.departmentsService.update(dto);
  }

  @Delete('/:maBoPhan')
  async delete(@Param('maBoPhan') maBoPhan: string) {
    return await this.departmentsService.remove(maBoPhan);
  }
}
