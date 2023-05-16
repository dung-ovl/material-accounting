import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateDetailReceiptDto {
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
}
