import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateReceiptDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly soPhieu: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly ngayNhap: string;

  @ApiProperty({ required: false })
  readonly maNcc: string;

  @ApiProperty({ required: false })
  readonly maNguoiGiao: string;

  @ApiProperty({ required: false })
  readonly maKho: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly lyDo: string;

  @ApiProperty({ required: false })
  readonly tkCo: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tongTien: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly chungTuLq: string;
}
