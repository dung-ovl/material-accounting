import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinedReceiptDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly SoPhieu: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly NgayNhap: string;

  @ApiProperty({ required: false })
  readonly MaNCC: string;

  @ApiProperty({ required: false })
  readonly MaNguoiGiao: string;

  @ApiProperty({ required: false })
  readonly MaKho: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly LyDo: string;

  @ApiProperty({ required: false })
  readonly TKCo: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TongTien: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly ChungTuLQ: string;

  @ApiProperty({ required: false })
  readonly TenNCC: string;

  @ApiProperty({ required: false })
  readonly TenNguoiGiao: string;

  @ApiProperty({ required: false })
  readonly TenKho: string;

  @ApiProperty({ required: false })
  readonly DiaChiKho: string;
}
