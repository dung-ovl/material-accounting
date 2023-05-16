import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSurMaterialDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maSo: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly maVt: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly maKho: string;

  @ApiProperty({ required: true })
  readonly ngay: string;

  @ApiProperty({ required: true })
  readonly soLuong: number;

  @ApiProperty({ required: true })
  readonly donGia: string;

  @ApiProperty({ required: true })
  readonly thanhTien: string;
}
