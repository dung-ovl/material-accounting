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

  findOne(MaNCC: string): Promise<Nhacungcap | null> {
    return this.accountRepository.findOneBy({ MaNCC });
  }

  async remove(MaNCC: string): Promise<void> {
    await this.accountRepository.delete(MaNCC);
  }

  async create(
    dto: CreateSupplierDto,
  ): Promise<Nhacungcap | ValidationError[]> {
    // check uniqueness of username/email
    const { MaNCC } = dto;
    const qb = await this.accountRepository
      .createQueryBuilder('nhacungcap')
      .where('nhacungcap.MaNCC = :MaNCC', { MaNCC });

    const acc = await qb.getOne();

    if (acc) return [];

    const newSupp = new Nhacungcap();
    newSupp.MaNCC = dto.MaNCC;
    newSupp.TenNCC = dto.TenNCC;
    newSupp.DiaChi = dto.DiaChi;
    newSupp.MaSoThue = dto.MaSoThue;
    newSupp.SDT = dto.SDT;

    const errors = await validate(newSupp);
    if (errors.length > 0) return errors;
    else return await this.accountRepository.save(newSupp);
  }

  async update(dto: UpdateSupplierDto) {
    const MaNCC = dto.MaNCC;
    return await this.accountRepository.update({ MaNCC }, dto);
  }
}
