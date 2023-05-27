import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinedStaffDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaNV: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenNV: string;

  @ApiProperty({ required: false })
  readonly MaBoPhan: string;

  @ApiProperty({ required: false })
  readonly TenBoPhan: string;
}
