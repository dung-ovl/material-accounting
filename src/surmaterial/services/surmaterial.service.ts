import { Injectable, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dudauvattu } from 'entities/Dudauvattu.entity';
import { Repository } from 'typeorm';
import {
  CreateSurMaterialDto,
  UpdateSurMaterialDto,
  QuerySurmaterialDto,
} from '../dtos';
import { validate } from 'class-validator';

@Injectable()
export class SurMaterialService {
  constructor(
    @InjectRepository(Dudauvattu)
    private readonly surMaterialRepository: Repository<Dudauvattu>,
  ) {}

  findAll(): Promise<Dudauvattu[]> {
    return this.surMaterialRepository.find();
  }

  findOne(MaSo: number): Promise<Dudauvattu | null> {
    return this.surMaterialRepository.findOneBy({ MaSo });
  }

  async remove(MaSo: number): Promise<void> {
    await this.surMaterialRepository.delete(MaSo);
  }

  async create(
    dto: CreateSurMaterialDto,
  ): Promise<Dudauvattu | ValidationError[]> {
    // check uniqueness of username/email
    const { MaSo } = dto;
    const qb = await this.surMaterialRepository
      .createQueryBuilder('dudauvattu')
      .where('dudauvattu.MaSo = :MaSo', { MaSo });

    const find = await qb.getOne();

    if (find) return [];

    const newSurMaterial = new Dudauvattu();
    newSurMaterial.MaSo = dto.MaSo;
    newSurMaterial.MaVT = dto.MaVT;
    newSurMaterial.MaKho = dto.MaKho;
    newSurMaterial.ngay = dto.ngay;
    newSurMaterial.SoLuong = dto.SoLuong;
    newSurMaterial.DonGia = dto.DonGia;
    newSurMaterial.ThanhTien = dto.ThanhTien;

    const errors = await validate(newSurMaterial);
    if (errors.length > 0) return errors;
    else return await this.surMaterialRepository.save(newSurMaterial);
  }

  async update(dto: UpdateSurMaterialDto) {
    const MaSo = dto.MaSo;
    return await this.surMaterialRepository.update({ MaSo }, dto);
  }

  async getStocksByDay(params: QuerySurmaterialDto): Promise<Dudauvattu[]> {
    const MaKho = params.MaKho;
    const ngay = params.ngay;
    return await this.surMaterialRepository
      .createQueryBuilder('dudauvattu')
      .where('dudauvattu.MaKho = :MaKho', { MaKho })
      .andWhere('dudauvattu.ngay <= :ngay', { ngay })
      .getMany();
  }

  async getStocksByMonth(params: QuerySurmaterialDto): Promise<Dudauvattu[]> {
    const MaKho = params.MaKho;
    const thang = params.thang;
    const nam = params.nam;
    return await this.surMaterialRepository
      .createQueryBuilder('dudauvattu')
      .where('dudauvattu.MaKho = :MaKho', { MaKho })
      .andWhere('dudauvattu.ngay BETWEEN :start AND :end', {
        start: `${nam}-${thang}-01`,
        end: `${nam}-${thang}-31`,
      })
      .getMany();
  }

  async getStockByMonth(params: QuerySurmaterialDto): Promise<Dudauvattu> {
    const MaVT = params.MaVT;
    const MaKho = params.MaKho;
    const thang = params.thang;
    const nam = params.nam;
    return await this.surMaterialRepository
      .createQueryBuilder('dudauvattu')
      .where('dudauvattu.MaKho = :MaKho', { MaKho })
      .andWhere('dudauvattu.MaVT = :MaVT', { MaVT })
      .andWhere('dudauvattu.ngay BETWEEN :start AND :end', {
        start: `${nam}-${thang}-01`,
        end: `${nam}-${thang}-31`,
      })
      .orderBy('dudauvattu.ngay', 'ASC')
      .getRawOne();
  }

  async getStock(params: QuerySurmaterialDto): Promise<Dudauvattu> {
    const MaVT = params.MaVT;
    const MaKho = params.MaKho;
    const NgayLap = params.NgayLap;
    return await this.surMaterialRepository
      .createQueryBuilder('dudauvattu')
      .where('dudauvattu.MaKho = :MaKho', { MaKho })
      .andWhere('dudauvattu.MaVT = :MaVT', { MaVT })
      .andWhere('dudauvattu.ngay <= :NgayLap', { NgayLap })
      .orderBy('dudauvattu.ngay', 'DESC')
      .getRawOne();
  }

  async getStockByYear(params: QuerySurmaterialDto): Promise<Dudauvattu[]> {
    const MaVT = params.MaVT;
    const MaKho = params.MaKho;
    const nam = params.nam;
    return await this.surMaterialRepository
      .createQueryBuilder('dudauvattu')
      .where('dudauvattu.MaKho = :MaKho', { MaKho })
      .andWhere('dudauvattu.MaVT = :MaVT', { MaVT })
      .andWhere('dudauvattu.ngay BETWEEN :start AND :end', {
        start: `${nam}-01-01`,
        end: `${nam}-12-31`,
      })
      .getRawMany();
  }
}
