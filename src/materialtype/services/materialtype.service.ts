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

  findOne(MaLoai: string): Promise<Loaivattu | null> {
    return this.materialTypeRepository.findOneBy({ MaLoai });
  }

  async remove(MaLoai: string): Promise<void> {
    await this.materialTypeRepository.delete(MaLoai);
  }

  async create(
    dto: CreateMaterialTypeDto,
  ): Promise<Loaivattu | ValidationError[]> {
    // check uniqueness of username/email
    const { MaLoai } = dto;
    const qb = await this.materialTypeRepository
      .createQueryBuilder('loaivattu')
      .where('loaivattu.MaLoai = :MaLoai', { MaLoai });

    const find = await qb.getOne();

    if (find) return [];

    const newMaterialType = new Loaivattu();
    newMaterialType.MaLoai = dto.MaLoai;
    newMaterialType.TenLoai = dto.TenLoai;
    newMaterialType.MoTa = dto.MoTa;

    const errors = await validate(newMaterialType);
    if (errors.length > 0) return errors;
    else return await this.materialTypeRepository.save(newMaterialType);
  }

  async update(dto: UpdateMaterialTypeDto) {
    const MaLoai = dto.MaLoai;
    return await this.materialTypeRepository.update({ MaLoai }, dto);
  }
}
