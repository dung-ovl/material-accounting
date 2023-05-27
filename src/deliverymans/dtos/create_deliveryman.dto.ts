import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDeliveryManDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaNguoiGiao: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenNguoiGiao: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly DiaChi: string;

  @ApiProperty({ required: false })
  readonly MaNCC: string;
}
