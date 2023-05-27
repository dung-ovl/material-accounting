import { Injectable, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donvitinh } from 'entities/Donvitinh.entity';
import { Repository } from 'typeorm';
import { CreateUnitDto, UpdateUnitDto } from '../dtos';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Donvitinh)
    private readonly unitRepository: Repository<Donvitinh>,
  ) {}

  findAll(): Promise<Donvitinh[]> {
    return this.unitRepository.find();
  }

  findOne(MaDVT: string): Promise<Donvitinh | null> {
    return this.unitRepository.findOneBy({ MaDVT });
  }

  async remove(MaDVT: string): Promise<void> {
    await this.unitRepository.delete(MaDVT);
  }

  async create(dto: CreateUnitDto): Promise<Donvitinh | ValidationError[]> {
    // check uniqueness of username/email
    const { MaDVT } = dto;
    const qb = await this.unitRepository
      .createQueryBuilder('donvitinh')
      .where('donvitinh.MaDVT = :MaDVT', { MaDVT });

    const find = await qb.getOne();

    if (find) return [];

    const newUnit = new Donvitinh();
    newUnit.MaDVT = dto.MaDVT;
    newUnit.TenDVT = dto.TenDVT;

    const errors = await validate(newUnit);
    if (errors.length > 0) return errors;
    else return await this.unitRepository.save(newUnit);
  }

  async update(dto: UpdateUnitDto) {
    const MaDVT = dto.MaDVT;
    const convertDto = plainToClass(Donvitinh, dto);
    return await this.unitRepository.update({ MaDVT }, convertDto);
  }
}
