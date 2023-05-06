import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly maTk: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tenTk: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly capTk: number;

  @ApiProperty({ required: false })
  readonly tkMe: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly loaiTk: string;
}
