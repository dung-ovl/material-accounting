import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaNCC: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenNCC: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly DiaChi: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaSoThue: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly SDT: string;
}
