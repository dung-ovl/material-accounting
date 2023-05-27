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

  findOne(MaKho: string): Promise<Kho | null> {
    return this.warehouseRepository.findOneBy({ MaKho });
  }

  async remove(MaKho: string): Promise<void> {
    await this.warehouseRepository.delete(MaKho);
  }

  joinWithCT(): Promise<JoinedWarehouseDto[]> {
    return this.warehouseRepository
      .createQueryBuilder('kho')
      .leftJoinAndSelect('kho.MaThuKho2', 'nv')
      .select([
        'kho.MaKho AS MaKho',
        'kho.TenKho AS TenKho',
        'kho.DiaChi AS DiaChi',
        'kho.SDT AS SDT',
        'kho.MaThuKho AS MaThuKho',
        'nv.TenNV AS TenNV',
      ])
      .getRawMany();
  }

  async create(dto: CreateWarehouseDto): Promise<Kho | ValidationError[]> {
    // check uniqueness of username/email
    const { MaKho } = dto;
    const qb = await this.warehouseRepository
      .createQueryBuilder('kho')
      .where('kho.MaKho = :MaKho', { MaKho });

    const find = await qb.getOne();

    if (find) return [];

    const newWarehouse = new Kho();
    newWarehouse.MaKho = dto.MaKho;
    newWarehouse.TenKho = dto.TenKho;
    newWarehouse.DiaChi = dto.DiaChi;
    newWarehouse.SDT = dto.SDT;
    newWarehouse.MaThuKho = dto.MaThuKho;

    const errors = await validate(newWarehouse);
    if (errors.length > 0) return errors;
    else return await this.warehouseRepository.save(newWarehouse);
  }

  async update(dto: UpdateWarehouseDto) {
    const MaKho = dto.MaKho;
    return await this.warehouseRepository.update({ MaKho }, dto);
  }
}
