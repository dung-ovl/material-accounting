import { ApiProperty } from '@nestjs/swagger';

export class QuerySurmaterialDto {
  @ApiProperty({ required: false })
  readonly maKho: string;

  @ApiProperty({ required: false })
  readonly maVt: string;

  @ApiProperty({ required: false })
  readonly ngay: string;

  @ApiProperty({ required: false })
  readonly thang: string;

  @ApiProperty({ required: false })
  readonly nam: string;

  @ApiProperty({ required: false })
  readonly ngayLap: string;
}
