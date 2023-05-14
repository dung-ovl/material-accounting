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

  findOne(maSo: number): Promise<Dudauvattu | null> {
    return this.surMaterialRepository.findOneBy({ maSo });
  }

  async remove(maSo: number): Promise<void> {
    await this.surMaterialRepository.delete(maSo);
  }

  async create(
    dto: CreateSurMaterialDto,
  ): Promise<Dudauvattu | ValidationError[]> {
    // check uniqueness of username/email
    const { maSo } = dto;
    const qb = await this.surMaterialRepository
      .createQueryBuilder('dudauvattu')
      .where('dudauvattu.MaSo = :maSo', { maSo });

    const find = await qb.getOne();

    if (find) return [];

    const newSurMaterial = new Dudauvattu();
    newSurMaterial.maSo = dto.maSo;
    newSurMaterial.maVt = dto.maVt;
    newSurMaterial.maKho = dto.maKho;
    newSurMaterial.ngay = dto.ngay;
    newSurMaterial.soLuong = dto.soLuong;
    newSurMaterial.donGia = dto.donGia;
    newSurMaterial.thanhTien = dto.thanhTien;

    const errors = await validate(newSurMaterial);
    if (errors.length > 0) return errors;
    else return await this.surMaterialRepository.save(newSurMaterial);
  }

  async update(dto: UpdateSurMaterialDto) {
    const maSo = dto.maSo;
    return await this.surMaterialRepository.update({ maSo }, dto);
  }

  async getStocksByDay(params: QuerySurmaterialDto): Promise<Dudauvattu[]> {
    const makho = params.maKho;
    const ngay = params.ngay;
    return await this.surMaterialRepository
      .createQueryBuilder('dudauvattu')
      .where('dudauvattu.maKho = :makho', { makho })
      .andWhere('dudauvattu.ngay <= :ngay', { ngay })
      .getMany();
  }

  async getStocksByMonth(params: QuerySurmaterialDto): Promise<Dudauvattu[]> {
    const makho = params.maKho;
    const thang = params.thang;
    const nam = params.nam;
    return await this.surMaterialRepository
      .createQueryBuilder('dudauvattu')
      .where('dudauvattu.maKho = :makho', { makho })
      .andWhere('dudauvattu.ngay BETWEEN :start AND :end', {
        start: `${nam}-${thang}-01`,
        end: `${nam}-${thang}-31`,
      })
      .getMany();
  }

  async getStockByMonth(params: QuerySurmaterialDto): Promise<Dudauvattu> {
    const maVt = params.maVt;
    const makho = params.maKho;
    const thang = params.thang;
    const nam = params.nam;
    return await this.surMaterialRepository
      .createQueryBuilder('dudauvattu')
      .where('dudauvattu.maKho = :makho', { makho })
      .andWhere('dudauvattu.maVt = :maVt', { maVt })
      .andWhere('dudauvattu.ngay BETWEEN :start AND :end', {
        start: `${nam}-${thang}-01`,
        end: `${nam}-${thang}-31`,
      })
      .orderBy('dudauvattu.ngay', 'ASC')
      .getRawOne();
  }

  async getStock(params: QuerySurmaterialDto): Promise<Dudauvattu> {
    const maVt = params.maVt;
    const makho = params.maKho;
    const ngayLap = params.ngayLap;
    return await this.surMaterialRepository
      .createQueryBuilder('dudauvattu')
      .where('dudauvattu.maKho = :makho', { makho })
      .andWhere('dudauvattu.maVt = :maVt', { maVt })
      .andWhere('dudauvattu.ngay <= :ngayLap', { ngayLap })
      .orderBy('dudauvattu.ngay', 'DESC')
      .getRawOne();
  }

  async getStockByYear(params: QuerySurmaterialDto): Promise<Dudauvattu[]> {
    const maVt = params.maVt;
    const makho = params.maKho;
    const nam = params.nam;
    return await this.surMaterialRepository
      .createQueryBuilder('dudauvattu')
      .where('dudauvattu.maKho = :makho', { makho })
      .andWhere('dudauvattu.maVt = :maVt', { maVt })
      .andWhere('dudauvattu.ngay BETWEEN :start AND :end', {
        start: `${nam}-01-01`,
        end: `${nam}-12-31`,
      })
      .getRawMany();
  }
}
