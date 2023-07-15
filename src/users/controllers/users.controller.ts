import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../services/users.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, UpdateUserDto } from '../dtos';
import { Public } from 'src/middleware/auth.public';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create_dto';

@ApiBearerAuth()
@ApiTags('nguoidung')
@Controller('nguoidung')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const auth = await this.userService.findOne(dto);
    if (auth === null) throw new UnauthorizedException();
    const payload = { username: auth.TenDangNhap, sub: auth.HoTen };
    return {
      access_token: await this.jwtService.signAsync(payload),
      data: auth,
    };
  }

  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const auth = await this.userService.createUser(dto);
    if (auth === null) throw new BadRequestException();
    return HttpStatus.OK;
  }

  @Put()
  async updateUser(@Body() dto: UpdateUserDto) {
    const auth = await this.userService.updateUser(dto);
    if (auth === null) throw new BadRequestException();
    return HttpStatus.OK;
  }

  @Delete('/:TenDangNhap')
  async delete(@Param('TenDangNhap') TenDangNhap: string) {
    return await this.userService.remove(TenDangNhap);
  }
}
