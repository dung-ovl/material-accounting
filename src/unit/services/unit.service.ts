import { Injectable, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donvitinh } from 'entities/Donvitinh.entity';
import { Repository } from 'typeorm';
import { CreateUnitDto, UpdateUnitDto } from '../dtos';
import { validate } from 'class-validator';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Donvitinh)
    private readonly unitRepository: Repository<Donvitinh>,
  ) {}

  findAll(): Promise<Donvitinh[]> {
    return this.unitRepository.find();
  }

  findOne(maDvt: string): Promise<Donvitinh | null> {
    return this.unitRepository.findOneBy({ maDvt });
  }

  async remove(maDvt: string): Promise<void> {
    await this.unitRepository.delete(maDvt);
  }

  async create(dto: CreateUnitDto): Promise<Donvitinh | ValidationError[]> {
    // check uniqueness of username/email
    const { maDvt } = dto;
    const qb = await this.unitRepository
      .createQueryBuilder('donvitinh')
      .where('donvitinh.maDvt = :maDvt', { maDvt });

    const find = await qb.getOne();

    if (find) return [];

    const newUnit = new Donvitinh();
    newUnit.maDvt = dto.maDvt;
    newUnit.tenDvt = dto.tenDvt;

    const errors = await validate(newUnit);
    if (errors.length > 0) return errors;
    else return await this.unitRepository.save(newUnit);
  }

  async update(dto: UpdateUnitDto) {
    const maDvt = dto.maDvt;
    return await this.unitRepository.update({ maDvt }, dto);
  }
}
