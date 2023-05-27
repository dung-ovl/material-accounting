import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUnitDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaDVT: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenDVT: string;
}
