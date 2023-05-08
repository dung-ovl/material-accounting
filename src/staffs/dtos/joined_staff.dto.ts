import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinedStaffDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maNv: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenNv: string;

  @ApiProperty({ required: false })
  readonly maBoPhan: string;

  @ApiProperty({ required: false })
  readonly tenBoPhan: string;
}
