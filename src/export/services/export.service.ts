import { Injectable } from '@nestjs/common';
import { Phieunhap } from '../../../entities/Phieunhap.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExportDto, UpdateExportDto } from '../dtos';
import { ValidationError, validate } from 'class-validator';
import { JoinedExportDto } from '../dtos/joined_export.dto';
import { Phieuxuat } from 'entities/Phieuxuat.entity';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(Phieuxuat)
    private readonly exportRepository: Repository<Phieuxuat>,
  ) {}

  findAll(): Promise<Phieuxuat[]> {
    return this.exportRepository.find();
  }

  async remove(SoPhieu: string): Promise<void> {
    await this.exportRepository.delete(SoPhieu);
  }

  joinWithRec(): Promise<JoinedExportDto[]> {
    return this.exportRepository
      .createQueryBuilder('phieuxuat')
      .leftJoin('phieuxuat.MaCongTrinh2', 'MaCongTrinh2')
      .leftJoin('phieuxuat.MaKho2', 'MaKho2')
      .leftJoin('phieuxuat.MaNguoiNhan2', 'MaNguoiNhan2')
      .select([
        'phieuxuat.SoPhieu AS SoPhieu',
        'phieuxuat.NgayXuat AS NgayXuat',
        'phieuxuat.MaCongTrinh AS MaCongTrinh',
        'MaCongTrinh2.TenCongTrinh AS TenCongTrinh',
        'MaCongTrinh2.DiaChi AS DiaChiCT',
        'phieuxuat.MaNguoiNhan AS MaNguoiNhan',
        'MaNguoiNhan2.TenNguoiNhan AS TenNguoiNhan',
        'phieuxuat.MaKho AS MaKho',
        'MaKho2.TenKho AS TenKho',
        'MaKho2.DiaChi AS DiaChiKho',
        'phieuxuat.LyDo AS LyDo',
        'phieuxuat.TKNo AS TKNo',
        'phieuxuat.TongTien AS TongTien',
        'phieuxuat.ChungTuLQ AS ChungTuLQ',
      ])
      .getRawMany();
  }

  async create(dto: CreateExportDto): Promise<Phieuxuat | ValidationError[]> {
    // check uniqueness of username/email
    const { SoPhieu } = dto;
    const qb = await this.exportRepository
      .createQueryBuilder('phieuxuat')
      .where('phieuxuat.SoPhieu = :SoPhieu', { SoPhieu });

    const inv = await qb.getOne();

    if (inv) return [];

    const newInv = new Phieuxuat();
    newInv.SoPhieu = dto.SoPhieu;
    newInv.NgayXuat = dto.NgayXuat;
    newInv.MaCongTrinh = dto.MaCongTrinh;
    newInv.MaNguoiNhan = dto.MaNguoiNhan;
    newInv.MaKho = dto.MaKho;
    newInv.LyDo = dto.LyDo;
    newInv.TKNo = dto.TKNo;
    newInv.TongTien = dto.TongTien;
    newInv.ChungTuLQ = dto.ChungTuLQ;

    const errors = await validate(newInv);
    if (errors.length > 0) return errors;
    else return await this.exportRepository.save(newInv);
  }

  async update(dto: UpdateExportDto) {
    const SoPhieu = dto.SoPhieu;
    return await this.exportRepository.update({ SoPhieu }, dto);
  }

  async updat2(SoPhieu, dto: UpdateExportDto) {
    return await this.exportRepository.update(
      { SoPhieu },
      { TongTien: dto.TongTien },
    );
  }
}
