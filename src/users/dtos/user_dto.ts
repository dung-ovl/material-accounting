import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenDangNhap: string;

  @ApiProperty({ required: false })
  readonly hoTen: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly quyen: string;

  @ApiProperty({ required: false })
  readonly maBoPhan: string | null;

  @ApiProperty({ required: false })
  readonly boPhan: [] | null;
}
