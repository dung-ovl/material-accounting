import { Injectable, ValidationError } from '@nestjs/common';
import { Nhanvien } from 'entities/Nhanvien.entity';
import { CreateStaffDto, JoinedStaffDto, UpdateStaffDto } from '../dtos';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Nhanvien)
    private readonly recipientRepository: Repository<Nhanvien>,
  ) {}

  findAll(): Promise<Nhanvien[]> {
    return this.recipientRepository.find();
  }

  findOne(maNv: string): Promise<Nhanvien | null> {
    return this.recipientRepository.findOneBy({ maNv });
  }

  async remove(maNv: string): Promise<void> {
    await this.recipientRepository.delete(maNv);
  }

  joinWithCT(): Promise<JoinedStaffDto[]> {
    return this.recipientRepository
      .createQueryBuilder('nhanvien')
      .leftJoinAndSelect('nhanvien.maBoPhan2', 'bp')
      .select([
        'nhanvien.maNv AS maNv',
        'nhanvien.tenNv AS tenNv',
        'nhanvien.maBoPhan AS maBoPhan',
        'bp.maBoPhan AS tenBoPhan',
      ])
      .getRawMany();
  }

  async create(dto: CreateStaffDto): Promise<Nhanvien | ValidationError[]> {
    // check uniqueness of username/email
    const { maNv } = dto;
    const qb = await this.recipientRepository
      .createQueryBuilder('nhanvien')
      .where('nhanvien.MaNhanVien = :maNv', { maNv });

    const find = await qb.getOne();

    if (find) return [];

    const newEmploy = new Nhanvien();
    newEmploy.maNv = dto.maNv;
    newEmploy.tenNv = dto.tenNv;
    newEmploy.maBoPhan = dto.maBoPhan;

    const errors = await validate(newEmploy);
    if (errors.length > 0) return errors;
    else return await this.recipientRepository.save(newEmploy);
  }

  async update(dto: UpdateStaffDto) {
    const maNv = dto.maNv;
    return await this.recipientRepository.update({ maNv }, dto);
  }
}
