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

  findOne(MaBoPhan: string): Promise<Bophan | null> {
    return this.departmentsRepository.findOneBy({ MaBoPhan });
  }

  async remove(MaBoPhan: string): Promise<void> {
    await this.departmentsRepository.delete(MaBoPhan);
  }

  async create(dto: CreateDepartmentDto): Promise<Bophan | ValidationError[]> {
    // check uniqueness of username/email
    const { MaBoPhan, TenBoPhan } = dto;
    const qb = await this.departmentsRepository
      .createQueryBuilder('bophan')
      .where('bophan.MaBoPhan = :MaBoPhan', { MaBoPhan })
      .orWhere('bophan.TenBoPhan = :TenBoPhan', { TenBoPhan });

    const find = await qb.getOne();

    if (find) return [];

    const newDep = new Bophan();
    newDep.MaBoPhan = dto.MaBoPhan;
    newDep.TenBoPhan = dto.TenBoPhan;
    newDep.MoTa = dto.MoTa;

    const errors = await validate(newDep);
    if (errors.length > 0) return errors;
    else return await this.departmentsRepository.save(newDep);
  }

  async update(dto: UpdateDepartmentDto) {
    const MaBoPhan = dto.MaBoPhan;
    return await this.departmentsRepository.update({ MaBoPhan }, dto);
  }
}
