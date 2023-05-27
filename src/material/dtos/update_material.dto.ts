import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateMaterialDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaVT: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenVT: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly MaLoai: string;

  @ApiProperty({ required: false })
  readonly MaDVT: string;

  @ApiProperty({ required: false })
  readonly MaTK: string;
}
