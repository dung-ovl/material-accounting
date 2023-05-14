import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class QueryExportDto {
    @ApiProperty({required: false})
    readonly Thang: string;

    @ApiProperty({required: false})
    readonly Nam: string;

    @ApiProperty({required: false})
    readonly Ngay: string;

    @ApiProperty({required: false})
    readonly MaKho: string;

    @ApiProperty({required: false})
    readonly MaVT: string;

    @ApiProperty({required: false})
    readonly NgayBD: string;

    @ApiProperty({required: false})
    readonly NgayKT: string;

}