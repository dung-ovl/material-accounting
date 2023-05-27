import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateContructionDto {
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
