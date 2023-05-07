import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRecipientDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maNguoiNhan: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenNguoiNhan: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly diaChi: string;

  @ApiProperty({ required: false })
  readonly maCongTrinh: string;
}
