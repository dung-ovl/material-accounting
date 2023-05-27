import { ApiProperty } from '@nestjs/swagger';

export class QuerySurmaterialDto {
  @ApiProperty({ required: false })
  readonly MaKho: string;

  @ApiProperty({ required: false })
  readonly MaVT: string;

  @ApiProperty({ required: false })
  readonly ngay: string;

  @ApiProperty({ required: false })
  readonly thang: string;

  @ApiProperty({ required: false })
  readonly nam: string;

  @ApiProperty({ required: false })
  readonly NgayLap: string;
}
