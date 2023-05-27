import { Injectable, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vattu } from 'entities/Vattu.entity';
import { Repository } from 'typeorm';
import {
  CreateMaterialDto,
  JoinedMaterialDto,
  UpdateMaterialDto,
} from '../dtos';
import { validate } from 'class-validator';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Vattu)
    private readonly materialRepository: Repository<Vattu>,
  ) {}

  findAll(): Promise<Vattu[]> {
    return this.materialRepository.find();
  }

  findOne(MaVT: string): Promise<Vattu | null> {
    return this.materialRepository.findOneBy({ MaVT });
  }

  async remove(MaVT: string): Promise<void> {
    await this.materialRepository.delete(MaVT);
  }

  joinWithCT(): Promise<JoinedMaterialDto[]> {
    return this.materialRepository
      .createQueryBuilder('vattu')
      .leftJoinAndSelect('vattu.MaDVT2', 'dvt')
      .leftJoinAndSelect('vattu.MaLoai2', 'loai')
      .select([
        'vattu.MaVT AS MaVT',
        'vattu.TenVT AS TenVT',
        'vattu.MaLoai AS MaLoai',
        'loai.TenLoai AS TenLoai',
        'vattu.MaDVT AS MaDVT',
        'dvt.TenDVT AS TenDVT',
        'vattu.MaTK AS MaTK',
      ])
      .getRawMany();
  }

  async create(dto: CreateMaterialDto): Promise<Vattu | ValidationError[]> {
    // check uniqueness of username/email
    const { MaVT } = dto;
    const qb = await this.materialRepository
      .createQueryBuilder('vattu')
      .where('vattu.MaVT = :MaVT', { MaVT });

    const find = await qb.getOne();

    if (find) return [];

    const newMaterial = new Vattu();
    newMaterial.MaVT = dto.MaVT;
    newMaterial.TenVT = dto.TenVT;
    newMaterial.MaLoai = dto.MaLoai;
    newMaterial.MaTK = dto.MaTK;
    newMaterial.MaDVT = dto.MaDVT;

    const errors = await validate(newMaterial);
    if (errors.length > 0) return errors;
    else return await this.materialRepository.save(newMaterial);
  }

  async update(dto: UpdateMaterialDto) {
    const MaVT = dto.MaVT;
    return await this.materialRepository.update({ MaVT }, dto);
  }
}
