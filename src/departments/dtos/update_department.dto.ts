import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateDepartmentDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maBoPhan: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenBoPhan: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly moTa: string;
}
