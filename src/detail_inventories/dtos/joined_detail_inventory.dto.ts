import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinedDetailInventoryDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaSo: number;

  @ApiProperty({ required: false })
  readonly SoBienBan: string;

  @ApiProperty({ required: false })
  readonly MaVT: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly DonGia: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly SLSoSach: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly SLThucTe: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly SLThua: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly SLThieu: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly SLPhamChatTot: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly SLPhamChatKem: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly SLMatPhamChat: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenVT: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenDVT: string; 
}
