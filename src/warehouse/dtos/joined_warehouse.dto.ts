import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinedWarehouseDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaKho: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenKho: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly DiaChi: string;

  @ApiProperty({ required: true })
  readonly SDT: string;

  @ApiProperty({ required: false })
  readonly MaThuKho: string;

  @ApiProperty({ required: false })
  readonly TenNV: string;
}
