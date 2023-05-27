import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinedDetailReceiptDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaSo: number;

  @ApiProperty({ required: false })
  readonly SoPhieu: string;

  @ApiProperty({ required: false })
  readonly MaVT: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly SLSoSach: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly SLThucTe: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly DonGia: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly ThanhTien: string;

  @ApiProperty({ required: false })
  readonly TongTT: string;

  @ApiProperty({ required: false })
  readonly TenVT: string;

  @ApiProperty({ required: false })
  readonly TongSL: number;

  @ApiProperty({ required: false })
  readonly ngay: string;

  @ApiProperty({ required: false })
  readonly MaTK: string;

  @ApiProperty({ required: false })
  readonly LyDo: string;

  @ApiProperty({ required: false })
  readonly TenDVT: string;
}
