import { ApiProperty } from '@nestjs/swagger';

export class QueryMaterialDto {
  @ApiProperty({ required: false })
  readonly MaVT: string;

  @ApiProperty({ required: false })
  readonly NgayDB: string;

  @ApiProperty({ required: false })
  readonly NgayKT: string;
}
