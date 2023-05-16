import { Injectable, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaterialTypeDto, UpdateMaterialTypeDto } from '../dtos';
import { validate } from 'class-validator';
import { Loaivattu } from 'entities/Loaivattu.entity';

@Injectable()
export class MaterialTypeService {
  constructor(
    @InjectRepository(Loaivattu)
    private readonly materialTypeRepository: Repository<Loaivattu>,
  ) {}

  findAll(): Promise<Loaivattu[]> {
    return this.materialTypeRepository.find();
  }

  findOne(maLoai: string): Promise<Loaivattu | null> {
    return this.materialTypeRepository.findOneBy({ maLoai });
  }

  async remove(maLoai: string): Promise<void> {
    await this.materialTypeRepository.delete(maLoai);
  }

  async create(
    dto: CreateMaterialTypeDto,
  ): Promise<Loaivattu | ValidationError[]> {
    // check uniqueness of username/email
    const { maLoai } = dto;
    const qb = await this.materialTypeRepository
      .createQueryBuilder('loaivattu')
      .where('loaivattu.maLoai = :maLoai', { maLoai });

    const find = await qb.getOne();

    if (find) return [];

    const newMaterialType = new Loaivattu();
    newMaterialType.maLoai = dto.maLoai;
    newMaterialType.tenLoai = dto.tenLoai;
    newMaterialType.moTa = dto.moTa;

    const errors = await validate(newMaterialType);
    if (errors.length > 0) return errors;
    else return await this.materialTypeRepository.save(newMaterialType);
  }

  async update(dto: UpdateMaterialTypeDto) {
    const maLoai = dto.maLoai;
    return await this.materialTypeRepository.update({ maLoai }, dto);
  }
}
