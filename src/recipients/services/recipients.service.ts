import { Injectable, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nguoinhan } from 'entities/Nguoinhan.entity';
import { Repository } from 'typeorm';
import {
  CreateRecipientDto,
  JoinedRecipientDto,
  UpdateRecipientDto,
} from '../dtos';
import { validate } from 'class-validator';

@Injectable()
export class RecipientsService {
  constructor(
    @InjectRepository(Nguoinhan)
    private readonly recipientRepository: Repository<Nguoinhan>,
  ) {}

  findAll(): Promise<Nguoinhan[]> {
    return this.recipientRepository.find();
  }

  findOne(maNguoiNhan: string): Promise<Nguoinhan | null> {
    return this.recipientRepository.findOneBy({ maNguoiNhan });
  }

  async remove(maNguoiNhan: string): Promise<void> {
    await this.recipientRepository.delete(maNguoiNhan);
  }

  joinWithCT(): Promise<JoinedRecipientDto[]> {
    return this.recipientRepository
      .createQueryBuilder('nguoinhan')
      .leftJoinAndSelect('nguoinhan.maCongTrinh2', 'ct')
      .select([
        'nguoinhan.maNguoiNhan AS maNguoiNhan',
        'nguoinhan.tenNguoiNhan AS tenNguoiNhan',
        'nguoinhan.diaChi AS diaChi',
        'nguoinhan.maCongTrinh AS maCongTrinh',
        'ct.tenCongTrinh AS tenCongTrinh',
      ])
      .getRawMany();
  }

  async create(
    dto: CreateRecipientDto,
  ): Promise<Nguoinhan | ValidationError[]> {
    // check uniqueness of username/email
    const { maNguoiNhan } = dto;
    const qb = await this.recipientRepository
      .createQueryBuilder('nguoinhan')
      .where('nguoinhan.MaNguoiNhan = :maNguoiNhan', { maNguoiNhan });

    const find = await qb.getOne();

    if (find) return [];

    const newMan = new Nguoinhan();
    newMan.maNguoiNhan = dto.maNguoiNhan;
    newMan.tenNguoiNhan = dto.tenNguoiNhan;
    newMan.diaChi = dto.diaChi;
    newMan.maCongTrinh = dto.maCongTrinh;

    const errors = await validate(newMan);
    if (errors.length > 0) return errors;
    else return await this.recipientRepository.save(newMan);
  }

  async update(dto: UpdateRecipientDto) {
    const maNguoiNhan = dto.maNguoiNhan;
    return await this.recipientRepository.update({ maNguoiNhan }, dto);
  }
}
