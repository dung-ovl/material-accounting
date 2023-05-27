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

  findOne(MaNV: string): Promise<Nhanvien | null> {
    return this.recipientRepository.findOneBy({ MaNV });
  }

  async remove(MaNV: string): Promise<void> {
    await this.recipientRepository.delete(MaNV);
  }

  joinWithCT(): Promise<JoinedStaffDto[]> {
    return this.recipientRepository
      .createQueryBuilder('nhanvien')
      .leftJoinAndSelect('nhanvien.MaBoPhan2', 'bp')
      .select([
        'nhanvien.MaNV AS MaNV',
        'nhanvien.TenNV AS TenNV',
        'nhanvien.MaBoPhan AS MaBoPhan',
        'bp.MaBoPhan AS TenBoPhan',
      ])
      .getRawMany();
  }

  async create(dto: CreateStaffDto): Promise<Nhanvien | ValidationError[]> {
    // check uniqueness of username/email
    const { MaNV } = dto;
    const qb = await this.recipientRepository
      .createQueryBuilder('nhanvien')
      .where('nhanvien.MaNV = :MaNV', { MaNV });

    const find = await qb.getOne();

    if (find) return [];

    const newEmploy = new Nhanvien();
    newEmploy.MaNV = dto.MaNV;
    newEmploy.TenNV = dto.TenNV;
    newEmploy.MaBoPhan = dto.MaBoPhan;

    const errors = await validate(newEmploy);
    if (errors.length > 0) return errors;
    else return await this.recipientRepository.save(newEmploy);
  }

  async update(dto: UpdateStaffDto) {
    const MaNV = dto.MaNV;
    return await this.recipientRepository.update({ MaNV }, dto);
  }
}
