import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaTK: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenTK: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly CapTK: number;

  @ApiProperty({ required: false })
  readonly TKMe: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly LoaiTK: string;
}
