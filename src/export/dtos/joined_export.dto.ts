import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinedExportDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly SoPhieu: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly NgayXuat: string;

  @ApiProperty({ required: false })
  readonly MaCongTrinh: string;

  @ApiProperty({ required: false })
  readonly MaNguoiNhan: string;

  @ApiProperty({ required: false })
  readonly MaKho: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly LyDo: string;

  @ApiProperty({ required: false })
  readonly TKNo: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TongTien: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly ChungTuLQ: string;

  @ApiProperty({ required: false })
  readonly TenKho: string;

  @ApiProperty({ required: false })
  readonly DiaChiKho: string;

  @ApiProperty({ required: false })
  readonly TenNguoiNhan: string;

  @ApiProperty({ required: false })
  readonly TenCongTrinh: string;

  @ApiProperty({ required: false })
  readonly DiaChiCT: string;
}
