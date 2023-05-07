import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateStaffDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maNv: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenNv: string;

  @ApiProperty({ required: false })
  readonly maBoPhan: string;
}
