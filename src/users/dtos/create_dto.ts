import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenDangNhap: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MatKhau: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly HoTen: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly Quyen: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaBoPhan: string;
}
