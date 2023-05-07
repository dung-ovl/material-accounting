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

  findOne(maTk: string): Promise<Taikhoan | null> {
    return this.accountRepository.findOneBy({ maTk });
  }

  async remove(maTk: string): Promise<void> {
    await this.accountRepository.delete(maTk);
  }

  async create(dto: CreateAccountDto): Promise<Taikhoan | ValidationError[]> {
    // check uniqueness of username/email
    const { maTk, tenTk } = dto;
    const qb = await this.accountRepository
      .createQueryBuilder('taikhoan')
      .where('taikhoan.MaTK = :maTk', { maTk })
      .orWhere('taikhoan.TenTK = :tenTk', { tenTk });

    const acc = await qb.getOne();

    if (acc) return [];

    const newAcc = new Taikhoan();
    newAcc.maTk = dto.maTk;
    newAcc.tenTk = dto.tenTk;
    newAcc.capTk = dto.capTk;
    newAcc.tkMe = dto.tkMe;
    newAcc.loaiTk = dto.loaiTk;

    const errors = await validate(newAcc);
    if (errors.length > 0) return errors;
    else return await this.accountRepository.save(newAcc);
  }

  async update(dto: UpdateAccountDto) {
    const maTk = dto.maTk;
    return await this.accountRepository.update({ maTk }, dto);
  }
}
