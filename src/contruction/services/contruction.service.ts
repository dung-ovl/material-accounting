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

  findOne(maCongTrinh: string): Promise<Congtrinh | null> {
    return this.contructionRepository.findOneBy({ maCongTrinh });
  }

  async remove(maCongTrinh: string): Promise<void> {
    await this.contructionRepository.delete(maCongTrinh);
  }

  async create(
    dto: CreateContructionDto,
  ): Promise<Congtrinh | ValidationError[]> {
    // check uniqueness of username/email
    const { maCongTrinh } = dto;
    const qb = await this.contructionRepository
      .createQueryBuilder('congtrinh')
      .where('congtrinh.MaCongTrinh = :maCongTrinh', { maCongTrinh });

    const find = await qb.getOne();

    if (find) return [];

    const newContruc = new Congtrinh();
    newContruc.maCongTrinh = dto.maCongTrinh;
    newContruc.tenCongTrinh = dto.tenCongTrinh;
    newContruc.diaChi = dto.diaChi;
    newContruc.moTa = dto.moTa;

    const errors = await validate(newContruc);
    if (errors.length > 0) return errors;
    else return await this.contructionRepository.save(newContruc);
  }

  async update(dto: UpdateContructionDto) {
    const maCongTrinh = dto.maCongTrinh;
    return await this.contructionRepository.update({ maCongTrinh }, dto);
  }
}
