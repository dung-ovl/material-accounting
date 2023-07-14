import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSurMaterialDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaSo: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly MaVT: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly MaKho: string;

  @ApiProperty({ required: true })
  readonly Ngay: string;

  @ApiProperty({ required: true })
  readonly SoLuong: number;

  @ApiProperty({ required: true })
  readonly DonGia: string;

  @ApiProperty({ required: true })
  readonly ThanhTien: string;
}
