import { Injectable } from '@nestjs/common';
import { Phieunhap } from '../../../entities/Phieunhap.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExportDto , UpdateExportDto } from '../dtos';
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

  async remove(soPhieu: string): Promise<void> {
    await this.exportRepository.delete(soPhieu);
  }

  joinWithRec(): Promise<JoinedExportDto[]> {
    return this.exportRepository
      .createQueryBuilder('phieuxuat')
      .leftJoin('phieuxuat.maCongTrinh2', 'maCongTrinh2')
      .leftJoin('phieuxuat.maKho2', 'maKho2')
      .leftJoin('phieuxuat.maNguoiNhan2', 'maNguoiNhan2')
      .select([
        'phieuxuat.soPhieu AS soPhieu',
        'phieuxuat.ngayXuat AS ngayXuat',
        'phieunhap.maCongTrinh AS maCongTrinh',
        'maCongTrinh2.tenCongTrinh AS tenCongTrinh',
        'maCongTrinh2.diaChi AS diaChiCt',
        'phieuxuat.maNguoiNhan AS maNguoiNhan',
        'maNguoiNhan2.tenNguoiNhan AS tenNguoiNhan',
        'phieuxuat.maKho AS maKho',
        'maKho2.tenKho AS tenKho',
        'maKho2.diaChi AS diaChiKho',
        'phieunhap.lyDo AS lyDo',
        'phieunhap.tkCo AS tkCo',
        'phieunhap.tongTien AS tongTien',
        'phieunhap.chungTuLq AS chungTuLq',
      ])
      .getRawMany();
  }

  async create(dto: CreateExportDto): Promise<Phieuxuat | ValidationError[]> {
    // check uniqueness of username/email
    const { soPhieu } = dto;
    const qb = await this.exportRepository
      .createQueryBuilder('phieunhap')
      .where('phieunhap.soPhieu = :soPhieu', { soPhieu });

    const inv = await qb.getOne();

    if (inv) return [];

    const newInv = new Phieuxuat();
    newInv.soPhieu = dto.soPhieu;
    newInv.ngayXuat = dto.ngayXuat;
    newInv.maCongTrinh = dto.maCongTrinh;
    newInv.maNguoiNhan = dto.maNguoiNhan;
    newInv.maKho = dto.maKho;
    newInv.lyDo = dto.lyDo;
    newInv.tkNo = dto.tkNo;
    newInv.tongTien = dto.tongTien;
    newInv.chungTuLq = dto.chungTuLq;

    const errors = await validate(newInv);
    if (errors.length > 0) return errors;
    else return await this.exportRepository.save(newInv);
  }

  async update(dto: UpdateExportDto) {
    const soPhieu = dto.soPhieu;
    return await this.exportRepository.update({ soPhieu }, dto);
  }

  async updat2(soPhieu, dto: UpdateExportDto) {
    return await this.exportRepository.update({ soPhieu }, {tongTien: dto.tongTien});
  }
}
