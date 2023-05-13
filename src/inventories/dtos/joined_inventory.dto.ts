import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinedInventoryDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly soBienBan: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly ngayLap: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maKho: string;

  @ApiProperty({ required: false })
  readonly truongBan: string;

  @ApiProperty({ required: false })
  readonly uyVien1: string;

  @ApiProperty({required: false})
  readonly uyVien2: string;

  @ApiProperty({required: false})
  readonly tenTruongBan: string;

  @ApiProperty({required: false})
  readonly tenUyVien1: string;

  @ApiProperty({required: false})
  readonly tenUyVien2: string;

  @ApiProperty({required: false})
  readonly maKho2: string;
}
