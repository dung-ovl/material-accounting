import { ApiProperty } from '@nestjs/swagger';

export class QuerySurmaterialDto {
  @ApiProperty({ required: false })
  readonly MaKho: string;

  @ApiProperty({ required: false })
  readonly MaVT: string;

  @ApiProperty({ required: false })
  readonly Ngay: string;

  @ApiProperty({ required: false })
  readonly Thang: string;

  @ApiProperty({ required: false })
  readonly Nam: string;

  @ApiProperty({ required: false })
  readonly NgayLap: string;
}
