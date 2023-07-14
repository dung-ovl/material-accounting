import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateDetailExportDto,
  UpdateDetailExportDto,
  QueryExportDto,
} from '../dtos';
import { ValidationError, validate } from 'class-validator';
import { JoinedDetailExportDto } from '../dtos/joined_detail_export.dto';
import { CtPhieuxuat } from 'entities/CtPhieuxuat.entity';

@Injectable()
export class DetailExportService {
  constructor(
    @InjectRepository(CtPhieuxuat)
    private readonly exportRepository: Repository<CtPhieuxuat>,
  ) {}

  findAll(): Promise<CtPhieuxuat[]> {
    return this.exportRepository.find();
  }

  async remove(SoPhieu: string): Promise<void> {
    await this.exportRepository
          .createQueryBuilder('ct_phieuxuat')
          .delete()
          .where('ct_phieuxuat.SoPhieu = :SoPhieu', { SoPhieu })
          .execute()
  }

  getByChart(params: QueryExportDto): Promise<JoinedDetailExportDto[]> {
    const { Thang, Nam } = params;
    return this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .leftJoin('ct_phieuxuat.SoPhieu2', 'SoPhieu2')
      .leftJoin('ct_phieuxuat.MaVT2', 'MaVT2')
      .select(['MaVT2.TenVT AS TenVT', 'SUM(ct_phieuxuat.ThanhTien) AS TongTT'])
      .where('MONTH(SoPhieu2.NgayXuat) = :Thang', { Thang })
      .andWhere('YEAR(SoPhieu2.NgayXuat) = :Nam', { Nam })
      .groupBy('ct_phieuxuat.MaVT')
      .getRawMany();
  }

  getByDay(params: QueryExportDto): Promise<JoinedDetailExportDto[]> {
    const { MaKho, Ngay } = params;
    return this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .leftJoin('ct_phieuxuat.SoPhieu2', 'SoPhieu2')
      .select([
        'ct_phieuxuat.MaVT AS MaVT',
        'SUM(ct_phieuxuat.SLThucTe) AS TongSL',
        'SUM(ct_phieuxuat.ThanhTien) AS TongTT',
      ])
      .where('SoPhieu2.MaKho = :MaKho', { MaKho })
      .andWhere('SoPhieu2.NgayXuat <= :Ngay', { Ngay })
      .groupBy('ct_phieuxuat.MaVT')
      .getRawMany();
  }

  getAllByMonth(params: QueryExportDto): Promise<JoinedDetailExportDto[]> {
    const { MaKho, Thang, Nam } = params;
    return this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .leftJoin('ct_phieuxuat.SoPhieu2', 'SoPhieu2')
      .select([
        'ct_phieuxuat.MaVT AS MaVT',
        'SUM(ct_phieuxuat.SLThucTe) AS TongSL',
        'SUM(ct_phieuxuat.ThanhTien) AS TongTT',
      ])
      .where('SoPhieu2.MaKho = :MaKho', { MaKho })
      .andWhere('MONTH(SoPhieu2.NgayXuat) = :Thang', { Thang })
      .andWhere('YEAR(SoPhieu2.NgayXuat) = :Nam', { Nam })
      .groupBy('ct_phieuxuat.MaVT')
      .getRawMany();
  }

  getByMonth(params: QueryExportDto): Promise<JoinedDetailExportDto[]> {
    const { MaVT, MaKho, NgayBD, Thang, Nam } = params;
    return this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .leftJoin('ct_phieuxuat.SoPhieu2', 'SoPhieu2')
      .select([
        'SoPhieu2.NgayXuat AS ngay',
        'ct_phieuxuat.SoPhieu as SoPhieu',
        'ct_phieuxuat.SLThucTe AS SLThucTe',
        'ct_phieuxuat.DonGia as DonGia',
        'ct_phieuxuat.ThanhTien AS ThanhTien',
        'SoPhieu2.LyDo AS LyDo',
        'SoPhieu2.TKNo as MaTK',
      ])
      .where('ct_phieuxuat.MaVT = :MaVT', { MaVT })
      .andWhere('SoPhieu2.MaKho = :MaKho', { MaKho })
      .andWhere('SoPhieu2.NgayXuat >= :NgayBD', { NgayBD })
      .andWhere('MONTH(SoPhieu2.NgayXuat) = :Thang', { Thang })
      .andWhere('YEAR(SoPhieu2.NgayXuat) = :Nam', { Nam })
      .getRawMany();
  }

  getBy(params: QueryExportDto): Promise<JoinedDetailExportDto[]> {
    const { MaVT, MaKho, NgayBD, NgayKT } = params;
    return this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .leftJoin('ct_phieuxuat.SoPhieu2', 'SoPhieu2')
      .select([
        'SoPhieu2.NgayXuat AS ngay',
        'ct_phieuxuat.SoPhieu as SoPhieu',
        'ct_phieuxuat.SLThucTe AS SLThucTe',
        'ct_phieuxuat.DonGia as DonGia',
        'ct_phieuxuat.ThanhTien AS ThanhTien',
        'SoPhieu2.LyDo AS LyDo',
      ])
      .where('ct_phieuxuat.MaVT = :MaVT', { MaVT })
      .andWhere('SoPhieu2.MaKho = :MaKho', { MaKho })
      .andWhere('SoPhieu2.NgayXuat >= :NgayBD', { NgayBD })
      .andWhere('SoPhieu2.NgayXuat <= :NgayKT', { NgayKT })
      .getRawMany();
  }

  getByWith(SoPhieu: string): Promise<JoinedDetailExportDto[]> {
    return this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .leftJoin('ct_phieuxuat.MaVT2', 'MaVT2')
      .leftJoin('MaVT2.MaDVT2', 'MaDVT2')
      .select([
        'ct_phieuxuat.MaSo as MaSo',
        'ct_phieuxuat.SoPhieu as SoPhieu',
        'ct_phieuxuat.MaVT AS MaVT',
        'MaVT2.TenVT AS TenVT',
        'MaDVT2.TenDVT AS TenDVT',
        'MaVT2.MaTK AS MaTK',
        'ct_phieuxuat.SLSoSach AS SLSoSach',
        'ct_phieuxuat.SLThucTe AS SLThucTe',
        'ct_phieuxuat.DonGia as DonGia',
        'ct_phieuxuat.ThanhTien AS ThanhTien',
      ])
      .where('ct_phieuxuat.SoPhieu = :SoPhieu', { SoPhieu })
      .getRawMany();
  }

  async create(
    dto: CreateDetailExportDto,
  ): Promise<CtPhieuxuat | ValidationError[]> {
    // check uniqueness of username/email
    const { MaSo } = dto;
    const qb = await this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .where('ct_phieuxuat.MaSo = :MaSo', { MaSo });

    const inv = await qb.getOne();

    if (inv) return [];

    const newInv = new CtPhieuxuat();
    newInv.MaSo = dto.MaSo;
    newInv.SoPhieu = dto.SoPhieu;
    newInv.MaVT = dto.MaVT;
    newInv.SLSoSach = dto.SLSoSach;
    newInv.SLThucTe = dto.SLThucTe;
    newInv.DonGia = dto.DonGia;
    newInv.ThanhTien = dto.ThanhTien;

    const errors = await validate(newInv);
    if (errors.length > 0) return errors;
    else return await this.exportRepository.save(newInv);
  }

  async update(dto: UpdateDetailExportDto) {
    const MaSo = dto.MaSo;
    return await this.exportRepository.update({ MaSo }, dto);
  }
}
