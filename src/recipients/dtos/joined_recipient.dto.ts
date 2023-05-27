import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinedRecipientDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaNguoiNhan: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenNguoiNhan: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly DiaChi: string;

  @ApiProperty({ required: false })
  readonly MaCongTrinh: string;

  @ApiProperty({ required: false })
  readonly TenCongTrinh: string;
}
