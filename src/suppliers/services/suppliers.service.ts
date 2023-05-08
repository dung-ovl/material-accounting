import { Injectable, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nhacungcap } from 'entities/Nhacungcap.entity';
import { Repository } from 'typeorm';
import { CreateSupplierDto, UpdateSupplierDto } from '../dtos';
import { validate } from 'class-validator';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Nhacungcap)
    private readonly accountRepository: Repository<Nhacungcap>,
  ) {}

  findAll(): Promise<Nhacungcap[]> {
    return this.accountRepository.find();
  }

  findOne(maNcc: string): Promise<Nhacungcap | null> {
    return this.accountRepository.findOneBy({ maNcc });
  }

  async remove(maNcc: string): Promise<void> {
    await this.accountRepository.delete(maNcc);
  }

  async create(
    dto: CreateSupplierDto,
  ): Promise<Nhacungcap | ValidationError[]> {
    // check uniqueness of username/email
    const { maNcc } = dto;
    const qb = await this.accountRepository
      .createQueryBuilder('nhacungcap')
      .where('nhacungcap.MaTK = :maNcc', { maNcc });

    const acc = await qb.getOne();

    if (acc) return [];

    const newSupp = new Nhacungcap();
    newSupp.maNcc = dto.maNcc;
    newSupp.tenNcc = dto.tenNcc;
    newSupp.diaChi = dto.diaChi;
    newSupp.maSoThue = dto.maSoThue;
    newSupp.sdt = dto.sdt;

    const errors = await validate(newSupp);
    if (errors.length > 0) return errors;
    else return await this.accountRepository.save(newSupp);
  }

  async update(dto: UpdateSupplierDto) {
    const maNcc = dto.maNcc;
    return await this.accountRepository.update({ maNcc }, dto);
  }
}
