import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDeliveryManDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maNguoiGiao: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenNguoiGiao: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly diaChi: string;

  @ApiProperty({ required: false })
  readonly maNcc: string;
}
