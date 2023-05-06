import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenDangNhap: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly matKhau: string;
}
