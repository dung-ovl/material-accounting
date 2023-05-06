import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../services/users.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../dtos';
import { Public } from 'src/middleware/auth.public';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
    const auth = await this.userService.findOne(dto.tenDangNhap, dto.matKhau);
    if (auth === null) throw new UnauthorizedException();
    const payload = { username: auth.tenDangNhap, sub: auth.hoTen };
    return {
      access_token: await this.jwtService.signAsync(payload),
      data: auth,
    };
  }

  @Get()
  getUsers() {
    return this.userService.findUsers();
  }
}
