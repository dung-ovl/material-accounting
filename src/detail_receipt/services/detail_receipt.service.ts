import { Injectable, Query } from '@nestjs/common';
import { Phieunhap } from '../../../entities/Phieunhap.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailReceiptDto , UpdateDetailReceiptDto } from '../dtos';
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

  getByChart(params: any): [string, string[]] {
    const {Thang, Nam} = params;
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.soPhieu2', 'soPhieu2')
      .leftJoin('ct_phieunhap.maVt2', 'maVt2')
      .select([
        'maVt2.tenVt AS tenVt',
        'SUM(ct_phieunhap.thanhTien) AS tongTT'
      ])
      .where('MONTH(soPhieu2.ngayNhap = :Thang', {Thang})
      .andWhere('YEAR(soPhieu2.ngayNhap = :Nam)', {Nam})
      .groupBy('ct_phieunhap.maVt')
      .getQueryAndParameters();
  }

  getByDay(params: any): Promise<JoinedDetailReceiptDto[]> {
    const {MaKho, Ngay} = params;
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.soPhieu2', 'soPhieu2')
      .select([
        'ct_phieunhap.maVt AS maVt',
        'SUM(ct_phieunhap.slThucTe) AS tongSl',
        'SUM(ct_phieunhap.thanhTien) AS tongTT'
      ])
      .where('soPhieu2.maKho = :maKho', {MaKho})
      .andWhere('soPhieu2.ngayNhap <= :ngayNhap)', {Ngay})
      .groupBy('ct_phieunhap.maVt')
      .getRawMany();
  }

  getAllByMonth(params: any): Promise<JoinedDetailReceiptDto[]> {
    const {MaKho, Thang, Nam} = params;
    return this.receiptRepository
      .createQueryBuilder('ct_phieunhap')
      .leftJoin('ct_phieunhap.soPhieu2', 'soPhieu2')
      .select([
        'ct_phieunhap.maVt AS maVt',
        'SUM(ct_phieunhap.slThucTe) AS tongSl',
        'SUM(ct_phieunhap.thanhTien) AS tongTT'
      ])
      .where('soPhieu2.maKho = :maKho', {MaKho})
      .andWhere('MONTH(soPhieu2.ngayNhap = :Thang', {Thang})
      .andWhere('YEAR(soPhieu2.ngayNhap = :Nam)', {Nam})
      .groupBy('ct_phieunhap.maVt')
      .getRawMany();
  }

  getByMonth(params: any): Promise<JoinedDetailReceiptDto[]> {
    const { MaVT, MaKho, NgayBD, Thang, Nam } = params;
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
      .where('ct_phieunhap.maVt = :maVt', {MaVT})
      .andWhere('soPhieu2.maKho = :maKho', {MaKho})
      .andWhere('soPhieu2.ngayNhap >= :ngayNhap', {NgayBD})
      .andWhere('MONTH(soPhieu2.ngayNhap = :Thang', {Thang})
      .andWhere('YEAR(soPhieu2.ngayNhap = :Nam)', {Nam})
      .getRawMany();
  }

  getBy(params: any): Promise<JoinedDetailReceiptDto[]> {
    const { MaVT, MaKho, NgayBD, NgayKT } = params;
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
      .where('ct_phieunhap.maVt = :maVt', {MaVT})
      .andWhere('soPhieu2.maKho = :maKho', {MaKho})
      .andWhere('soPhieu2.ngayNhap >= :ngayNhap', {NgayBD})
      .andWhere('soPhieu2.ngayNhap <= :ngayNhap', {NgayKT})
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
