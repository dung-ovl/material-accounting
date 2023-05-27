import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenDangNhap: string;

  @ApiProperty({ required: false })
  readonly HoTen: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly Quyen: string;

  @ApiProperty({ required: false })
  readonly MaBoPhan: string | null;

  @ApiProperty({ required: false })
  readonly boPhan: [] | null;
}
