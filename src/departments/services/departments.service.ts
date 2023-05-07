import { Injectable } from '@nestjs/common';
import { Bophan } from '../../../entities/Bophan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dtos';
import { ValidationError, validate } from 'class-validator';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Bophan)
    private readonly departmentsRepository: Repository<Bophan>,
  ) {}

  findAll(): Promise<Bophan[]> {
    return this.departmentsRepository.find();
  }

  findOne(maBoPhan: string): Promise<Bophan | null> {
    return this.departmentsRepository.findOneBy({ maBoPhan });
  }

  async remove(maBoPhan: string): Promise<void> {
    await this.departmentsRepository.delete(maBoPhan);
  }

  async create(dto: CreateDepartmentDto): Promise<Bophan | ValidationError[]> {
    // check uniqueness of username/email
    const { maBoPhan, tenBoPhan } = dto;
    const qb = await this.departmentsRepository
      .createQueryBuilder('bophan')
      .where('bophan.MaBoPhan = :maBoPhan', { maBoPhan })
      .orWhere('bophan.TenBoPhan = :tenBoPhan', { tenBoPhan });

    const find = await qb.getOne();

    if (find) return [];

    const newDep = new Bophan();
    newDep.maBoPhan = dto.maBoPhan;
    newDep.tenBoPhan = dto.tenBoPhan;
    newDep.moTa = dto.moTa;

    const errors = await validate(newDep);
    if (errors.length > 0) return errors;
    else return await this.departmentsRepository.save(newDep);
  }

  async update(dto: UpdateDepartmentDto) {
    const maBoPhan = dto.maBoPhan;
    return await this.departmentsRepository.update({ maBoPhan }, dto);
  }
}
