import { Injectable } from '@nestjs/common';
import { Bbkiemke } from '../../../entities/Bbkiemke.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryDto, UpdateInventoryDto } from '../dtos';
import { ValidationError, validate } from 'class-validator';
import { JoinedInventoryDto } from '../dtos/joined_inventory.dto';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Bbkiemke)
    private readonly inventoryRepository: Repository<Bbkiemke>,
  ) {}

  findAll(): Promise<Bbkiemke[]> {
    return this.inventoryRepository.find();
  }

  findOne(SoBienBan: string): Promise<Bbkiemke | null> {
    return this.inventoryRepository.findOneBy({ SoBienBan });
  }

  async remove(SoBienBan: string): Promise<void> {
    await this.inventoryRepository.delete(SoBienBan);
  }

  joinWithTB(): Promise<JoinedInventoryDto[]> {
    return this.inventoryRepository
      .createQueryBuilder('bbkiemke')
      .leftJoin('bbkiemke.MaKho2', 'makho2')
      .leftJoin('bbkiemke.TruongBan2', 'TruongBan2')
      .leftJoin('bbkiemke.UyVien', 'UyVien')
      .leftJoin('bbkiemke.UyVien3', 'UyVien3')
      .select([
        'bbkiemke.SoBienBan AS SoBienBan',
        'bbkiemke.NgayLap AS NgayLap',
        'bbkiemke.MaKho AS MaKho',
        'makho2.TenKho AS TenKho',
        'bbkiemke.TruongBan AS TruongBan',
        'bbkiemke.UyVien1 AS UyVien1',
        'bbkiemke.UyVien2 AS UyVien2',
        'TruongBan2.TenNV AS TenTruongBan',
        'UyVien.TenNV AS TenUyVien1',
        'UyVien3.TenNV AS TenUyVien2',
      ])
      .getRawMany();
  }

  async create(dto: CreateInventoryDto): Promise<Bbkiemke | ValidationError[]> {
    // check uniqueness of username/email
    const { SoBienBan } = dto;
    const qb = await this.inventoryRepository
      .createQueryBuilder('bbkiemke')
      .where('bbkiemke.SoBienBan = :SoBienBan', { SoBienBan });

    const inv = await qb.getOne();

    if (inv) return [];

    const newInv = new Bbkiemke();
    newInv.SoBienBan = dto.SoBienBan;
    newInv.NgayLap = dto.NgayLap;
    newInv.MaKho = dto.MaKho;
    newInv.TruongBan = dto.TruongBan;
    newInv.UyVien1 = dto.UyVien1;
    newInv.UyVien2 = dto.UyVien2;

    const errors = await validate(newInv);
    if (errors.length > 0) return errors;
    else return await this.inventoryRepository.save(newInv);
  }

  async update(dto: UpdateInventoryDto) {
    const SoBienBan = dto.SoBienBan;
    return await this.inventoryRepository.update({ SoBienBan }, dto);
  }
}
