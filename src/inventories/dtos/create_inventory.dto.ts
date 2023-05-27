import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly SoBienBan: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly NgayLap: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaKho: string;

  @ApiProperty({ required: false })
  readonly TruongBan: string;

  @ApiProperty({ required: false })
  readonly UyVien1: string;

  @ApiProperty({required: false})
  readonly UyVien2: string;
}
