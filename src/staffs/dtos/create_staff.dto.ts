import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaNV: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenNV: string;

  @ApiProperty({ required: false })
  readonly MaBoPhan: string;
}
