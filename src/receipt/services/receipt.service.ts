import { Injectable } from '@nestjs/common';
import { Phieunhap } from '../../../entities/Phieunhap.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReceiptDto, UpdateReceiptDto } from '../dtos';
import { ValidationError, validate } from 'class-validator';
import { JoinedReceiptDto } from '../dtos/joined_receipt.dto';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Phieunhap)
    private readonly receiptRepository: Repository<Phieunhap>,
  ) {}

  findAll(): Promise<Phieunhap[]> {
    return this.receiptRepository.find();
  }

  async remove(SoPhieu: string): Promise<void> {
    await this.receiptRepository.delete(SoPhieu);
  }

  joinWithRec(): Promise<JoinedReceiptDto[]> {
    return this.receiptRepository
      .createQueryBuilder('phieunhap')
      .leftJoin('phieunhap.MaNCC2', 'MaNCC2')
      .leftJoin('phieunhap.MaKho2', 'MaKho2')
      .leftJoin('phieunhap.MaNguoiGiao2', 'MaNguoiGiao2')
      .select([
        'phieunhap.SoPhieu AS SoPhieu',
        'phieunhap.NgayNhap AS NgayNhap',
        'phieunhap.MaNCC AS MaNCC',
        'MaNCC2.TenNCC AS TenNCC',
        'phieunhap.MaNguoiGiao AS MaNguoiGiao',
        'MaNguoiGiao2.TenNguoiGiao AS TenNguoiGiao',
        'phieunhap.MaKho AS MaKho',
        'MaKho2.TenKho AS TenKho',
        'MaKho2.DiaChi AS DiaChiKho',
        'phieunhap.LyDo AS LyDo',
        'phieunhap.TKCo AS TKCo',
        'phieunhap.TongTien AS TongTien',
        'phieunhap.ChungTuLQ AS ChungTuLQ',
      ])
      .getRawMany();
  }

  async create(dto: CreateReceiptDto): Promise<Phieunhap | ValidationError[]> {
    // check uniqueness of username/email
    const { SoPhieu } = dto;
    const qb = await this.receiptRepository
      .createQueryBuilder('phieunhap')
      .where('phieunhap.SoPhieu = :SoPhieu', { SoPhieu });

    const inv = await qb.getOne();

    if (inv) return [];

    const newInv = new Phieunhap();
    newInv.SoPhieu = dto.SoPhieu;
    newInv.NgayNhap = dto.NgayNhap;
    newInv.MaNCC = dto.MaNCC;
    newInv.MaNguoiGiao = dto.MaNguoiGiao;
    newInv.MaKho = dto.MaKho;
    newInv.LyDo = dto.LyDo;
    newInv.TKCo = dto.TKCo;
    newInv.TongTien = dto.TongTien;
    newInv.ChungTuLQ = dto.ChungTuLQ;

    const errors = await validate(newInv);
    if (errors.length > 0) return errors;
    else return await this.receiptRepository.save(newInv);
  }

  async update(dto: UpdateReceiptDto) {
    const SoPhieu = dto.SoPhieu;
    return await this.receiptRepository.update({ SoPhieu }, dto);
  }

  async updat2(SoPhieu, dto: UpdateReceiptDto) {
    return await this.receiptRepository.update(
      { SoPhieu },
      { TongTien: dto.TongTien },
    );
  }
}
