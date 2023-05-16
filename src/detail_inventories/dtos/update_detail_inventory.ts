import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateDetailInventoryDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maSo: number;

  @ApiProperty({ required: false })
  readonly soBienBan: string;

  @ApiProperty({ required: false })
  readonly maVt: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly donGia: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly slSoSach: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly slThucTe: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly slThua: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly slThieu: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly slPhamChatTot: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly slPhamChatKem: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly slMatPhamChat: number;
}
