import { Injectable } from '@nestjs/common';
import { Taikhoan } from '../../../entities/Taikhoan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto, UpdateAccountDto } from '../dtos';
import { ValidationError, validate } from 'class-validator';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Taikhoan)
    private readonly accountRepository: Repository<Taikhoan>,
  ) {}

  findAll(): Promise<Taikhoan[]> {
    return this.accountRepository.find();
  }

  findOne(MaTK: string): Promise<Taikhoan | null> {
    return this.accountRepository.findOneBy({ MaTK });
  }

  async remove(MaTK: string): Promise<void> {
    await this.accountRepository.delete(MaTK);
  }

  async create(dto: CreateAccountDto): Promise<Taikhoan | ValidationError[]> {
    // check uniqueness of username/email
    const { MaTK, TenTK } = dto;
    const qb = await this.accountRepository
      .createQueryBuilder('taikhoan')
      .where('taikhoan.MaTK = :MaTK', { MaTK })
      .orWhere('taikhoan.TenTK = :TenTK', { TenTK });

    const acc = await qb.getOne();

    if (acc) return [];

    const newAcc = new Taikhoan();
    newAcc.MaTK = dto.MaTK;
    newAcc.TenTK = dto.TenTK;
    newAcc.CapTK = dto.CapTK;
    newAcc.TKMe = dto.TKMe;
    newAcc.LoaiTK = dto.LoaiTK;

    const errors = await validate(newAcc);
    if (errors.length > 0) return errors;
    else return await this.accountRepository.save(newAcc);
  }

  async update(dto: UpdateAccountDto) {
    const MaTK = dto.MaTK;
    return await this.accountRepository.update({ MaTK }, dto);
  }
}
