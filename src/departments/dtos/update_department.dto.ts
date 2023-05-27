import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateDepartmentDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MaBoPhan: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly TenBoPhan: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly MoTa: string;
}
