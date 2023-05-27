import { Injectable, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Congtrinh } from 'entities/Congtrinh.entity';
import { Repository } from 'typeorm';
import { CreateContructionDto, UpdateContructionDto } from '../dtos';
import { validate } from 'class-validator';

@Injectable()
export class ContructionService {
  constructor(
    @InjectRepository(Congtrinh)
    private readonly contructionRepository: Repository<Congtrinh>,
  ) {}

  findAll(): Promise<Congtrinh[]> {
    return this.contructionRepository.find();
  }

  findOne(MaCongTrinh: string): Promise<Congtrinh | null> {
    return this.contructionRepository.findOneBy({ MaCongTrinh });
  }

  async remove(MaCongTrinh: string): Promise<void> {
    await this.contructionRepository.delete(MaCongTrinh);
  }

  async create(
    dto: CreateContructionDto,
  ): Promise<Congtrinh | ValidationError[]> {
    // check uniqueness of username/email
    const { MaCongTrinh } = dto;
    const qb = await this.contructionRepository
      .createQueryBuilder('congtrinh')
      .where('congtrinh.MaCongTrinh = :MaCongTrinh', { MaCongTrinh });

    const find = await qb.getOne();

    if (find) return [];

    const newContruc = new Congtrinh();
    newContruc.MaCongTrinh = dto.MaCongTrinh;
    newContruc.TenCongTrinh = dto.TenCongTrinh;
    newContruc.DiaChi = dto.DiaChi;
    newContruc.MoTa = dto.MoTa;

    const errors = await validate(newContruc);
    if (errors.length > 0) return errors;
    else return await this.contructionRepository.save(newContruc);
  }

  async update(dto: UpdateContructionDto) {
    const MaCongTrinh = dto.MaCongTrinh;
    return await this.contructionRepository.update({ MaCongTrinh }, dto);
  }
}
