import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateContructionDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maCongTrinh: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenCongTrinh: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly diaChi: string;

  @ApiProperty({ required: false })
  readonly moTa: string;
}
