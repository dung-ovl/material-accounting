import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateMaterialTypeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaLoai: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenLoai: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MoTa: string;
}
