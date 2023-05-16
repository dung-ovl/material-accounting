import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUnitDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maDvt: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenDvt: string;
}
