import { Injectable, Query } from '@nestjs/common';
import { Phieunhap } from '../../../entities/Phieunhap.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailReceiptDto , UpdateDetailReceiptDto, QueryReceiptDto } from '../dtos';
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

  async remove(soPhieu: string): Promise<void> {
    await this.receiptRepository.delete(soPhieu);
  }

  getByChart(params: QueryReceiptDto): Promise<JoinedDetailReceiptDto[]> {
    const Thang = params.Thang
    const Nam = params.Nam
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.soPhieu2', 'soPhieu2')
      .leftJoin('ct_phieunhap.maVt2', 'maVt2')
      .select([
        'maVt2.tenVt AS tenVt',
        'SUM(ct_phieunhap.thanhTien) AS tongTT'
      ])
      .where('MONTH(soPhieu2.ngayNhap) = :Thang', {Thang})
      .andWhere('YEAR(soPhieu2.ngayNhap) = :Nam', {Nam})
      .groupBy('ct_phieunhap.maVt')
      .getRawMany();
  }

  getByDay(params: QueryReceiptDto): Promise<JoinedDetailReceiptDto[]> {
    const MaKho = params.MaKho
    const Ngay = params.Ngay
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.soPhieu2', 'soPhieu2')
      .select([
        'ct_phieunhap.maVt AS maVt',
        'SUM(ct_phieunhap.slThucTe) AS tongSl',
        'SUM(ct_phieunhap.thanhTien) AS tongTT',
      ])
      .where('soPhieu2.maKho = :MaKho', {MaKho})
      .andWhere('soPhieu2.ngayNhap <= :Ngay', {Ngay})
      .groupBy('ct_phieunhap.maVt')
      .getRawMany();
  }

  getAllByMonth(params: QueryReceiptDto): Promise<JoinedDetailReceiptDto[]> {
    const Thang = params.Thang;
    const MaKho = params.MaKho
    const Nam = params.Nam
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.soPhieu2', 'soPhieu2')
      .select([
        'ct_phieunhap.maVt AS maVt',
        'SUM(ct_phieunhap.slThucTe) AS tongSl',
        'SUM(ct_phieunhap.thanhTien) AS tongTT'
      ])
      .where('soPhieu2.maKho = :MaKho', {MaKho})
      .andWhere('MONTH(soPhieu2.ngayNhap) = :Thang', {Thang})
      .andWhere('YEAR(soPhieu2.ngayNhap) = :Nam', {Nam})
      .groupBy('ct_phieunhap.maVt')
      .getRawMany();
  }

  getByMonth(params: QueryReceiptDto): Promise<JoinedDetailReceiptDto[]> {
    const MaKho = params.MaKho
    const NgayBD = params.NgayBD
    const MaVT = params.MaVT
    const Thang = params.Thang
    const Nam = params.Nam
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.soPhieu2', 'soPhieu2')
      .select([
        'soPhieu2.ngayNhap AS ngay',
        'ct_phieunhap.soPhieu as soPhieu',
        'ct_phieunhap.slThucTe AS slThucTe',
        'ct_phieunhap.donGia as donGia',
        'ct_phieunhap.thanhTien AS thanhTien',
        'soPhieu2.lyDo AS lyDo',
        'soPhieu2.tkCo as maTK',
      ])
      .where('ct_phieunhap.maVt = :MaVT', {MaVT})
      .andWhere('soPhieu2.maKho = :MaKho', {MaKho})
      .andWhere('soPhieu2.ngayNhap >= :NgayBD', {NgayBD})
      .andWhere('MONTH(soPhieu2.ngayNhap) = :Thang', {Thang})
      .andWhere('YEAR(soPhieu2.ngayNhap) = :Nam', {Nam})
      .getRawMany();
  }

  getBy(params: QueryReceiptDto): Promise<JoinedDetailReceiptDto[]> {
    const MaKho = params.MaKho
    const NgayBD = params.NgayBD
    const MaVT = params.MaVT
    const NgayKT = params.NgayKT
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.soPhieu2', 'soPhieu2')
      .select([
        'soPhieu2.ngayNhap AS ngay',
        'ct_phieunhap.soPhieu as soPhieu',
        'ct_phieunhap.slThucTe AS slThucTe',
        'ct_phieunhap.donGia as donGia',
        'ct_phieunhap.thanhTien AS thanhTien',
        'soPhieu2.lyDo AS lyDo',
      ])
      .where('ct_phieunhap.maVt = :MaVT', {MaVT})
      .andWhere('soPhieu2.maKho = :MaKho', {MaKho})
      .andWhere('soPhieu2.ngayNhap >= :NgayBD', {NgayBD})
      .andWhere('soPhieu2.ngayNhap <= :NgayKT', {NgayKT})
      .getRawMany();
  }

  getByWith(soPhieu: string): Promise<JoinedDetailReceiptDto[]> {
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.maVt2', 'maVt2')
      .leftJoin('maVt2.maDvt2', 'maDvt2')
      .select([
        'ct_phieunhap.maSo as maSo',
        'ct_phieunhap.soPhieu as soPhieu',
        'ct_phieunhap.maVt AS maVt',
        'maVt2.tenVt AS tenVt',
        'maDvt2.tenDvt AS tenDvt',
        'maVt2.maTk AS maTK',
        'ct_phieunhap.slSoSach AS slSoSach',
        'ct_phieunhap.slThucTe AS slThucTe',
        'ct_phieunhap.donGia as donGia',
        'ct_phieunhap.thanhTien AS thanhTien',
      ])
      .where('ct_phieunhap.soPhieu = :soPhieu', {soPhieu})
      .getRawMany();
  }

  async create(dto: CreateDetailReceiptDto): Promise<CtPhieunhap | ValidationError[]> {
    // check uniqueness of username/email
    const { maSo } = dto;
    const qb = await this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .where('phieunhap.maSo = :maSo', { maSo });

    const inv = await qb.getOne();

    if (inv) return [];

    const newInv = new CtPhieunhap();
    newInv.maSo = dto.maSo;
    newInv.soPhieu = dto.soPhieu;
    newInv.maVt = dto.maVt;
    newInv.slSoSach = dto.slSoSach;
    newInv.slThucTe = dto.slThucTe;
    newInv.donGia = dto.donGia;
    newInv.thanhTien = dto.thanhTien;

    const errors = await validate(newInv);
    if (errors.length > 0) return errors;
    else return await this.receiptRepository.save(newInv);
  }

  async update(dto: UpdateDetailReceiptDto) {
    const soPhieu = dto.soPhieu;
    return await this.receiptRepository.update({ soPhieu }, dto);
  }

}
