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
import { Bophan } from '../Bophan.entity';
import { Public } from 'src/middleware/auth.public';

@Controller('bophan')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.departmentsService.findAll();
  }

  @Public()
  @Get('/:maTk')
  async getById(@Param('maTk') maTk: string) {
    const acc = await this.departmentsService.findOne(maTk);
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

  @Delete('/:maTk')
  async delete(@Param('maTk') maTk: string) {
    return await this.departmentsService.remove(maTk);
  }
}
