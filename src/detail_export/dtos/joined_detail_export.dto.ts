import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinedDetailExportDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maSo: number;

  @ApiProperty({ required: false })
  readonly soPhieu: string;

  @ApiProperty({ required: false })
  readonly maVt: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly slSoSach: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly slThucTe: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly donGia: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly thanhTien: string;

  @ApiProperty({ required: false })
  readonly tongTT: string;

  @ApiProperty({ required: false })
  readonly tenVt: string;

  @ApiProperty({ required: false })
  readonly tongSl: number;

  @ApiProperty({ required: false })
  readonly ngay: string;

  @ApiProperty({ required: false })
  readonly maTK: string;

  @ApiProperty({ required: false })
  readonly lyDo: string;

  @ApiProperty({ required: false })
  readonly tenDvt: string;
}
