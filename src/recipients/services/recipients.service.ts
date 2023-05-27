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

  findOne(MaNguoiNhan: string): Promise<Nguoinhan | null> {
    return this.recipientRepository.findOneBy({ MaNguoiNhan });
  }

  async remove(MaNguoiNhan: string): Promise<void> {
    await this.recipientRepository.delete(MaNguoiNhan);
  }

  joinWithCT(): Promise<JoinedRecipientDto[]> {
    return this.recipientRepository
      .createQueryBuilder('nguoinhan')
      .leftJoinAndSelect('nguoinhan.MaCongTrinh2', 'ct')
      .select([
        'nguoinhan.MaNguoiNhan AS MaNguoiNhan',
        'nguoinhan.TenNguoiNhan AS TenNguoiNhan',
        'nguoinhan.DiaChi AS DiaChi',
        'nguoinhan.MaCongTrinh AS MaCongTrinh',
        'ct.TenCongTrinh AS TenCongTrinh',
      ])
      .getRawMany();
  }

  async create(
    dto: CreateRecipientDto,
  ): Promise<Nguoinhan | ValidationError[]> {
    // check uniqueness of username/email
    const { MaNguoiNhan } = dto;
    const qb = await this.recipientRepository
      .createQueryBuilder('nguoinhan')
      .where('nguoinhan.MaNguoiNhan = :MaNguoiNhan', { MaNguoiNhan });

    const find = await qb.getOne();

    if (find) return [];

    const newMan = new Nguoinhan();
    newMan.MaNguoiNhan = dto.MaNguoiNhan;
    newMan.TenNguoiNhan = dto.TenNguoiNhan;
    newMan.DiaChi = dto.DiaChi;
    newMan.MaCongTrinh = dto.MaCongTrinh;

    const errors = await validate(newMan);
    if (errors.length > 0) return errors;
    else return await this.recipientRepository.save(newMan);
  }

  async update(dto: UpdateRecipientDto) {
    const MaNguoiNhan = dto.MaNguoiNhan;
    return await this.recipientRepository.update({ MaNguoiNhan }, dto);
  }
}
