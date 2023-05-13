import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateWarehouseDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maKho: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenKho: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly diaChi: string;

  @ApiProperty({ required: true })
  readonly sdt: string;

  @ApiProperty({ required: false })
  readonly maThuKho: string;
}
