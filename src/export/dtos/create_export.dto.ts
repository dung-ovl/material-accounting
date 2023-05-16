import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateExportDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly soPhieu: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly ngayXuat: string;

  @ApiProperty({ required: false })
  readonly maCongTrinh: string;

  @ApiProperty({ required: false })
  readonly maNguoiNhan: string;

  @ApiProperty({ required: false })
  readonly maKho: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly lyDo: string;

  @ApiProperty({ required: false })
  readonly tkNo: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tongTien: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly chungTuLq: string;
}
