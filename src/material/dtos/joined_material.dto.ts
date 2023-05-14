import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinedMaterialDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maVt: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenVt: string;

  @ApiProperty({ required: false })
  readonly maLoai: string;

  @ApiProperty({ required: false })
  readonly tenLoai: string;

  @ApiProperty({ required: false })
  readonly maDvt: string;

  @ApiProperty({ required: false })
  readonly tenDvt: string;

  @ApiProperty({ required: false })
  readonly maTk: string;

  @ApiProperty({ required: false })
  readonly tenTk: string;
}
