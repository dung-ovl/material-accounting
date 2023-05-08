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
import { AccountsService } from '../services/accounts.service';
import { CreateAccountDto, UpdateAccountDto } from '../dtos/index';
import { Taikhoan } from '../../../entities/Taikhoan.entity';
import { Public } from 'src/middleware/auth.public';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('taikhoan')
@Controller('taikhoan')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.accountsService.findAll();
  }

  @Public()
  @Get('/:maTk')
  async getById(@Param('maTk') maTk: string) {
    const acc = await this.accountsService.findOne(maTk);
    if (acc == null) throw new NotFoundException();
    return acc;
  }

  @Post()
  async create(@Body() dto: CreateAccountDto) {
    const result = await this.accountsService.create(dto);
    if (result instanceof Taikhoan) return 'OK';
    else throw new BadRequestException(result);
  }

  @Put()
  async update(@Body() dto: UpdateAccountDto) {
    return await this.accountsService.update(dto);
  }

  @Delete('/:maTk')
  async delete(@Param('maTk') maTk: string) {
    return await this.accountsService.remove(maTk);
  }
}
