import { Injectable, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kho } from 'entities/Kho.entity';
import { Repository } from 'typeorm';
import {
  CreateWarehouseDto,
  JoinedWarehouseDto,
  UpdateWarehouseDto,
} from '../dtos';
import { validate } from 'class-validator';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Kho)
    private readonly warehouseRepository: Repository<Kho>,
  ) {}

  findAll(): Promise<Kho[]> {
    return this.warehouseRepository.find();
  }

  findOne(maKho: string): Promise<Kho | null> {
    return this.warehouseRepository.findOneBy({ maKho });
  }

  async remove(maKho: string): Promise<void> {
    await this.warehouseRepository.delete(maKho);
  }

  joinWithCT(): Promise<JoinedWarehouseDto[]> {
    return this.warehouseRepository
      .createQueryBuilder('kho')
      .leftJoinAndSelect('kho.maThuKho2', 'nv')
      .select([
        'kho.maKho AS maKho',
        'kho.tenKho AS tenKho',
        'kho.diaChi AS diaChi',
        'kho.sdt AS sdt',
        'nv.tenNV AS tenNV',
      ])
      .getRawMany();
  }

  async create(dto: CreateWarehouseDto): Promise<Kho | ValidationError[]> {
    // check uniqueness of username/email
    const { maKho } = dto;
    const qb = await this.warehouseRepository
      .createQueryBuilder('kho')
      .where('kho.MaKho = :maKho', { maKho });

    const find = await qb.getOne();

    if (find) return [];

    const newWarehouse = new Kho();
    newWarehouse.maKho = dto.maKho;
    newWarehouse.tenKho = dto.tenKho;
    newWarehouse.diaChi = dto.diaChi;
    newWarehouse.sdt = dto.sdt;
    newWarehouse.maThuKho = dto.maThuKho;

    const errors = await validate(newWarehouse);
    if (errors.length > 0) return errors;
    else return await this.warehouseRepository.save(newWarehouse);
  }

  async update(dto: UpdateWarehouseDto) {
    const maKho = dto.maKho;
    return await this.warehouseRepository.update({ maKho }, dto);
  }
}
