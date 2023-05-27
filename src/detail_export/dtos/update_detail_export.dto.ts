import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateDetailExportDto {
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
}
