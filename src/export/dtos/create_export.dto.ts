import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateExportDto {
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
}
