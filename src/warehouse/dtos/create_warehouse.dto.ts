import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateWarehouseDto {
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
}
