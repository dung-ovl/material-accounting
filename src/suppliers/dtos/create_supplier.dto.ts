import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maNcc: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenNcc: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly diaChi: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maSoThue: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly sdt: string;
}
