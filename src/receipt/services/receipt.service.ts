import { Injectable } from '@nestjs/common';
import { Phieunhap } from '../../../entities/Phieunhap.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReceiptDto , UpdateReceiptDto } from '../dtos';
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

  async remove(soPhieu: string): Promise<void> {
    await this.receiptRepository.delete(soPhieu);
  }

  joinWithRec(): Promise<JoinedReceiptDto[]> {
    return this.receiptRepository
      .createQueryBuilder('phieunhap')
      .leftJoin('phieunhap.maNcc2', 'maNcc2')
      .leftJoin('phieunhap.maKho2', 'maKho2')
      .leftJoin('phieunhap.maNguoiGiao2', 'maNguoiGiao2')
      .select([
        'phieunhap.soPhieu AS soPhieu',
        'phieunhap.ngayNhap AS ngayNhap',
        'phieunhap.maNcc AS maNcc',
        'maNcc2.tenNcc AS tenNcc',
        'phieunhap.maNguoiGiao AS maNguoiGiao',
        'maNguoiGiao2.tenNguoiGiao AS tenNguoiGiao',
        'phieunhap.maKho AS maKho',
        'maKho2.tenKho AS tenKho',
        'maKho2.diaChi AS diaChiKho',
        'phieunhap.lyDo AS lyDo',
        'phieunhap.tkCo AS tkCo',
        'phieunhap.tongTien AS tongTien',
        'phieunhap.chungTuLq AS chungTuLq',
      ])
      .getRawMany();
  }

  async create(dto: CreateReceiptDto): Promise<Phieunhap | ValidationError[]> {
    // check uniqueness of username/email
    const { soPhieu } = dto;
    const qb = await this.receiptRepository
      .createQueryBuilder('phieunhap')
      .where('phieunhap.soPhieu = :soPhieu', { soPhieu });

    const inv = await qb.getOne();

    if (inv) return [];

    const newInv = new Phieunhap();
    newInv.soPhieu = dto.soPhieu;
    newInv.ngayNhap = dto.ngayNhap;
    newInv.maNcc = dto.maNcc;
    newInv.maNguoiGiao = dto.maNguoiGiao;
    newInv.maKho = dto.maKho;
    newInv.lyDo = dto.lyDo;
    newInv.tkCo = dto.tkCo;
    newInv.tongTien = dto.tongTien;
    newInv.chungTuLq = dto.chungTuLq;

    const errors = await validate(newInv);
    if (errors.length > 0) return errors;
    else return await this.receiptRepository.save(newInv);
  }

  async update(dto: UpdateReceiptDto) {
    const soPhieu = dto.soPhieu;
    return await this.receiptRepository.update({ soPhieu }, dto);
  }

  async updat2(soPhieu, dto: UpdateReceiptDto) {
    return await this.receiptRepository.update({ soPhieu }, {tongTien: dto.tongTien});
  }
}
