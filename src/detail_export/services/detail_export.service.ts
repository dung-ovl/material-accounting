import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailExportDto , UpdateDetailExportDto, QueryExportDto } from '../dtos';
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

  async remove(soPhieu: string): Promise<void> {
    await this.exportRepository.delete(soPhieu);
  }

  getByChart(params: QueryExportDto): Promise<JoinedDetailExportDto[]> {
    const {Thang, Nam} = params;
    return this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .leftJoin('ct_phieuxuat.soPhieu2', 'soPhieu2')
      .leftJoin('ct_phieuxuat.maVt2', 'maVt2')
      .select([
        'maVt2.tenVt AS tenVt',
        'SUM(ct_phieuxuat.thanhTien) AS tongTT'
      ])
      .where('MONTH(soPhieu2.ngayXuat) = :Thang', {Thang})
      .andWhere('YEAR(soPhieu2.ngayXuat) = :Nam', {Nam})
      .groupBy('ct_phieuxuat.maVt')
      .getRawMany();
  }

  getByDay(params: QueryExportDto): Promise<JoinedDetailExportDto[]> {
    const {MaKho, Ngay} = params;
    return this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .leftJoin('ct_phieuxuat.soPhieu2', 'soPhieu2')
      .select([
        'ct_phieuxuat.maVt AS maVt',
        'SUM(ct_phieuxuat.slThucTe) AS tongSl',
        'SUM(ct_phieuxuat.thanhTien) AS tongTT'
      ])
      .where('soPhieu2.maKho = :MaKho', {MaKho})
      .andWhere('soPhieu2.ngayXuat <= :Ngay', {Ngay})
      .groupBy('ct_phieuxuat.maVt')
      .getRawMany();
  }

  getAllByMonth(params: QueryExportDto): Promise<JoinedDetailExportDto[]> {
    const {MaKho, Thang, Nam} = params;
    return this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .leftJoin('ct_phieuxuat.soPhieu2', 'soPhieu2')
      .select([
        'ct_phieuxuat.maVt AS maVt',
        'SUM(ct_phieuxuat.slThucTe) AS tongSl',
        'SUM(ct_phieuxuat.thanhTien) AS tongTT'
      ])
      .where('soPhieu2.maKho = :MaKho', {MaKho})
      .andWhere('MONTH(soPhieu2.ngayXuat) = :Thang', {Thang})
      .andWhere('YEAR(soPhieu2.ngayXuat) = :Nam', {Nam})
      .groupBy('ct_phieuxuat.maVt')
      .getRawMany();
  }

  getByMonth(params: QueryExportDto): Promise<JoinedDetailExportDto[]> {
    const { MaVT, MaKho, NgayBD, Thang, Nam } = params;
    return this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .leftJoin('ct_phieuxuat.soPhieu2', 'soPhieu2')
      .select([
        'soPhieu2.ngayXuat AS ngay',
        'ct_phieuxuat.soPhieu as soPhieu',
        'ct_phieuxuat.slThucTe AS slThucTe',
        'ct_phieuxuat.donGia as donGia',
        'ct_phieuxuat.thanhTien AS thanhTien',
        'soPhieu2.lyDo AS lyDo',
        'soPhieu2.tkNo as maTK',
      ])
      .where('ct_phieuxuat.maVt = :MaVT', {MaVT})
      .andWhere('soPhieu2.maKho = :MaKho', {MaKho})
      .andWhere('soPhieu2.ngayXuat >= :NgayBD', {NgayBD})
      .andWhere('MONTH(soPhieu2.ngayXuat) = :Thang', {Thang})
      .andWhere('YEAR(soPhieu2.ngayXuat) = :Nam', {Nam})
      .getRawMany();
  }

  getBy(params: QueryExportDto): Promise<JoinedDetailExportDto[]> {
    const { MaVT, MaKho, NgayBD, NgayKT } = params;
    return this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .leftJoin('ct_phieuxuat.soPhieu2', 'soPhieu2')
      .select([
        'soPhieu2.ngayXuat AS ngay',
        'ct_phieuxuat.soPhieu as soPhieu',
        'ct_phieuxuat.slThucTe AS slThucTe',
        'ct_phieuxuat.donGia as donGia',
        'ct_phieuxuat.thanhTien AS thanhTien',
        'soPhieu2.lyDo AS lyDo',
      ])
      .where('ct_phieuxuat.maVt = :MaVT', {MaVT})
      .andWhere('soPhieu2.maKho = :MaKho', {MaKho})
      .andWhere('soPhieu2.ngayXuat >= :NgayBD', {NgayBD})
      .andWhere('soPhieu2.ngayXuat <= :NgayKT', {NgayKT})
      .getRawMany();
  }

  getByWith(soPhieu: string): Promise<JoinedDetailExportDto[]> {
    return this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .leftJoin('ct_phieuxuat.maVt2', 'maVt2')
      .leftJoin('maVt2.maDvt2', 'maDvt2')
      .select([
        'ct_phieuxuat.maSo as maSo',
        'ct_phieuxuat.soPhieu as soPhieu',
        'ct_phieuxuat.maVt AS maVt',
        'maVt2.tenVt AS tenVt',
        'maDvt2.tenDvt AS tenDvt',
        'maVt2.maTk AS maTK',
        'ct_phieuxuat.slSoSach AS slSoSach',
        'ct_phieuxuat.slThucTe AS slThucTe',
        'ct_phieuxuat.donGia as donGia',
        'ct_phieuxuat.thanhTien AS thanhTien',
      ])
      .where('ct_phieuxuat.soPhieu = :soPhieu', {soPhieu})
      .getRawMany();
  }

  async create(dto: CreateDetailExportDto): Promise<CtPhieuxuat | ValidationError[]> {
    // check uniqueness of username/email
    const { maSo } = dto;
    const qb = await this.exportRepository
      .createQueryBuilder('ct_phieuxuat')
      .where('phieunhap.maSo = :maSo', { maSo });

    const inv = await qb.getOne();

    if (inv) return [];

    const newInv = new CtPhieuxuat();
    newInv.maSo = dto.maSo;
    newInv.soPhieu = dto.soPhieu;
    newInv.maVt = dto.maVt;
    newInv.slSoSach = dto.slSoSach;
    newInv.slThucTe = dto.slThucTe;
    newInv.donGia = dto.donGia;
    newInv.thanhTien = dto.thanhTien;

    const errors = await validate(newInv);
    if (errors.length > 0) return errors;
    else return await this.exportRepository.save(newInv);
  }

  async update(dto: UpdateDetailExportDto) {
    const maSo = dto.maSo;
    return await this.exportRepository.update({ maSo }, dto);
  }

}
