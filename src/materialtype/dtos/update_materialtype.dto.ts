import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateMaterialTypeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maLoai: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenLoai: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly moTa: string;
}
