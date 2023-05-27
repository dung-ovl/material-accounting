import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinedMaterialDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaVT: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenVT: string;

  @ApiProperty({ required: false })
  readonly MaLoai: string;

  @ApiProperty({ required: false })
  readonly TenLoai: string;

  @ApiProperty({ required: false })
  readonly MaDVT: string;

  @ApiProperty({ required: false })
  readonly TenDVT: string;

  @ApiProperty({ required: false })
  readonly MaTK: string;

  @ApiProperty({ required: false })
  readonly TenTK: string;
}
