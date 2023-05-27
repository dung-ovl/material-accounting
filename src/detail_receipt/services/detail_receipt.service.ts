import { Injectable, Query } from '@nestjs/common';
import { Phieunhap } from '../../../entities/Phieunhap.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateDetailReceiptDto,
  UpdateDetailReceiptDto,
  QueryReceiptDto,
} from '../dtos';
import { ValidationError, validate } from 'class-validator';
import { JoinedDetailReceiptDto } from '../dtos/joined_detail_receipt.dto';
import { CtPhieunhap } from 'entities/CtPhieunhap.entity';

@Injectable()
export class DetailReceiptService {
  constructor(
    @InjectRepository(CtPhieunhap)
    private readonly receiptRepository: Repository<CtPhieunhap>,
  ) {}

  findAll(): Promise<CtPhieunhap[]> {
    return this.receiptRepository.find();
  }

  async remove(SoPhieu: string): Promise<void> {
    await this.receiptRepository.delete(SoPhieu);
  }

  getByChart(params: QueryReceiptDto): Promise<JoinedDetailReceiptDto[]> {
    const Thang = params.Thang;
    const Nam = params.Nam;
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.SoPhieu2', 'SoPhieu2')
      .leftJoin('ct_phieunhap.MaVT2', 'MaVT2')
      .select(['MaVT2.TenVT AS TenVT', 'SUM(ct_phieunhap.ThanhTien) AS TongTT'])
      .where('MONTH(SoPhieu2.NgayNhap) = :Thang', { Thang })
      .andWhere('YEAR(SoPhieu2.NgayNhap) = :Nam', { Nam })
      .groupBy('ct_phieunhap.MaVT')
      .getRawMany();
  }

  getByDay(params: QueryReceiptDto): Promise<JoinedDetailReceiptDto[]> {
    const MaKho = params.MaKho;
    const Ngay = params.Ngay;
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.SoPhieu2', 'SoPhieu2')
      .select([
        'ct_phieunhap.MaVT AS MaVT',
        'SUM(ct_phieunhap.SLThucTe) AS TongSL',
        'SUM(ct_phieunhap.ThanhTien) AS TongTT',
      ])
      .where('SoPhieu2.MaKho = :MaKho', { MaKho })
      .andWhere('SoPhieu2.NgayNhap <= :Ngay', { Ngay })
      .groupBy('ct_phieunhap.MaVT')
      .getRawMany();
  }

  getAllByMonth(params: QueryReceiptDto): Promise<JoinedDetailReceiptDto[]> {
    const Thang = params.Thang;
    const MaKho = params.MaKho;
    const Nam = params.Nam;
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.SoPhieu2', 'SoPhieu2')
      .select([
        'ct_phieunhap.MaVT AS MaVT',
        'SUM(ct_phieunhap.SLThucTe) AS TongSL',
        'SUM(ct_phieunhap.ThanhTien) AS TongTT',
      ])
      .where('SoPhieu2.MaKho = :MaKho', { MaKho })
      .andWhere('MONTH(SoPhieu2.NgayNhap) = :Thang', { Thang })
      .andWhere('YEAR(SoPhieu2.NgayNhap) = :Nam', { Nam })
      .groupBy('ct_phieunhap.MaVT')
      .getRawMany();
  }

  getByMonth(params: QueryReceiptDto): Promise<JoinedDetailReceiptDto[]> {
    const MaKho = params.MaKho;
    const NgayBD = params.NgayBD;
    const MaVT = params.MaVT;
    const Thang = params.Thang;
    const Nam = params.Nam;
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.SoPhieu2', 'SoPhieu2')
      .select([
        'SoPhieu2.NgayNhap AS ngay',
        'ct_phieunhap.SoPhieu as SoPhieu',
        'ct_phieunhap.SLThucTe AS SLThucTe',
        'ct_phieunhap.DonGia as DonGia',
        'ct_phieunhap.ThanhTien AS ThanhTien',
        'SoPhieu2.LyDo AS LyDo',
        'SoPhieu2.TKCo as MaTK',
      ])
      .where('ct_phieunhap.MaVT = :MaVT', { MaVT })
      .andWhere('SoPhieu2.MaKho = :MaKho', { MaKho })
      .andWhere('SoPhieu2.NgayNhap >= :NgayBD', { NgayBD })
      .andWhere('MONTH(SoPhieu2.NgayNhap) = :Thang', { Thang })
      .andWhere('YEAR(SoPhieu2.NgayNhap) = :Nam', { Nam })
      .getRawMany();
  }

  getBy(params: QueryReceiptDto): Promise<JoinedDetailReceiptDto[]> {
    const MaKho = params.MaKho;
    const NgayBD = params.NgayBD;
    const MaVT = params.MaVT;
    const NgayKT = params.NgayKT;
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.SoPhieu2', 'SoPhieu2')
      .select([
        'SoPhieu2.NgayNhap AS Ngay',
        'ct_phieunhap.SoPhieu as SoPhieu',
        'ct_phieunhap.SLThucTe AS SLThucTe',
        'ct_phieunhap.DonGia as DonGia',
        'ct_phieunhap.ThanhTien AS ThanhTien',
        'SoPhieu2.LyDo AS LyDo',
      ])
      .where('ct_phieunhap.MaVT = :MaVT', { MaVT })
      .andWhere('SoPhieu2.MaKho = :MaKho', { MaKho })
      .andWhere('SoPhieu2.NgayNhap >= :NgayBD', { NgayBD })
      .andWhere('SoPhieu2.NgayNhap <= :NgayKT', { NgayKT })
      .getRawMany();
  }

  getByWith(SoPhieu: string): Promise<JoinedDetailReceiptDto[]> {
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.MaVT2', 'MaVT2')
      .leftJoin('MaVT2.MaDVT2', 'MaDVT2')
      .select([
        'ct_phieunhap.MaSo as MaSo',
        'ct_phieunhap.SoPhieu as SoPhieu',
        'ct_phieunhap.MaVT AS MaVT',
        'MaVT2.TenVT AS TenVT',
        'MaDVT2.TenDVT AS TenDVT',
        'MaVT2.MaTK AS MaTK',
        'ct_phieunhap.SLSoSach AS SLSoSach',
        'ct_phieunhap.SLThucTe AS SLThucTe',
        'ct_phieunhap.DonGia as DonGia',
        'ct_phieunhap.ThanhTien AS ThanhTien',
      ])
      .where('ct_phieunhap.SoPhieu = :SoPhieu', { SoPhieu })
      .getRawMany();
  }

  async create(
    dto: CreateDetailReceiptDto,
  ): Promise<CtPhieunhap | ValidationError[]> {
    // check uniqueness of username/email
    const { MaSo } = dto;
    const qb = await this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .where('phieunhap.MaSo = :MaSo', { MaSo });

    const inv = await qb.getOne();

    if (inv) return [];

    const newInv = new CtPhieunhap();
    newInv.MaSo = dto.MaSo;
    newInv.SoPhieu = dto.SoPhieu;
    newInv.MaVT = dto.MaVT;
    newInv.SLSoSach = dto.SLSoSach;
    newInv.SLThucTe = dto.SLThucTe;
    newInv.DonGia = dto.DonGia;
    newInv.ThanhTien = dto.ThanhTien;

    const errors = await validate(newInv);
    if (errors.length > 0) return errors;
    else return await this.receiptRepository.save(newInv);
  }

  async update(dto: UpdateDetailReceiptDto) {
    const SoPhieu = dto.SoPhieu;
    return await this.receiptRepository.update({ SoPhieu }, dto);
  }
}
