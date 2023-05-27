import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateContructionDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaCongTrinh: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenCongTrinh: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly DiaChi: string;

  @ApiProperty({ required: false })
  readonly MoTa: string;
}
