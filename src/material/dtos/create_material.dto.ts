import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maVt: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenVt: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly maLoai: string;

  @ApiProperty({ required: false })
  readonly maDvt: string;

  @ApiProperty({ required: false })
  readonly maTk: string;
}
