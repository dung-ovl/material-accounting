import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenDangNhap: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MatKhau: string;
}
