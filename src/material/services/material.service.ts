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

  findOne(maVt: string): Promise<Vattu | null> {
    return this.materialRepository.findOneBy({ maVt });
  }

  async remove(maVt: string): Promise<void> {
    await this.materialRepository.delete(maVt);
  }

  joinWithCT(): Promise<JoinedMaterialDto[]> {
    return this.materialRepository
      .createQueryBuilder('vattu')
      .leftJoinAndSelect('vattu.maDvt2', 'dvt')
      .leftJoinAndSelect('vattu.maLoai2', 'loai')
      .select([
        'vattu.maVt AS maVt',
        'vattu.tenVt AS tenVt',
        'vattu.maLoai AS maLoai',
        'loai.tenLoai AS tenLoai',
        'vattu.maDvt AS maDvt',
        'dvt.tenDvt AS tenDvt',
        'vattu.maTk AS maTk',
      ])
      .getRawMany();
  }

  async create(dto: CreateMaterialDto): Promise<Vattu | ValidationError[]> {
    // check uniqueness of username/email
    const { maVt } = dto;
    const qb = await this.materialRepository
      .createQueryBuilder('vattu')
      .where('vattu.MaVt = :maVt', { maVt });

    const find = await qb.getOne();

    if (find) return [];

    const newMaterial = new Vattu();
    newMaterial.maVt = dto.maVt;
    newMaterial.tenVt = dto.tenVt;
    newMaterial.maLoai = dto.maLoai;
    newMaterial.maTk = dto.maTk;
    newMaterial.maDvt = dto.maDvt;

    const errors = await validate(newMaterial);
    if (errors.length > 0) return errors;
    else return await this.materialRepository.save(newMaterial);
  }

  async update(dto: UpdateMaterialDto) {
    const maVt = dto.maVt;
    return await this.materialRepository.update({ maVt }, dto);
  }
}
