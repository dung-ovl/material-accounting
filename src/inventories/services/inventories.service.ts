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

  findOne(soBienBan: string): Promise<Bbkiemke | null> {
    return this.inventoryRepository.findOneBy({ soBienBan });
  }

  async remove(soBienBan: string): Promise<void> {
    await this.inventoryRepository.delete(soBienBan);
  }

  joinWith(): Promise<JoinedInventoryDto[]> {
    return this.inventoryRepository
      .createQueryBuilder('bbkiemke')
      .leftJoin('bbkiemke.truongBan2', 'tb')
      .leftJoin('bbkiemke.uyVien', 'uv1')
      .leftJoin('bbkiemke.uyVien3', 'uv2')
      .select([
        'bbkiemke.soBienBan AS soBienBan',
        'bbkiemke.ngayLap AS ngayLap',
        'bbkiemke.maKho AS maKho',
        'bbkiemke.truongBan AS truongBan',
        'bbkiemke.uyVien1 AS uyVien1',
        'bbkiemke.uyVien2 AS uyVien2' ,
        'tb.tenNv AS tenTruongBan',
        'uv1.tenNv AS tenUyVien1',
        'uv2.tenNv AS tenUyVien2',
      ])
      .getRawMany();
  }

  async create(dto: CreateInventoryDto): Promise<Bbkiemke | ValidationError[]> {
    // check uniqueness of username/email
    const { soBienBan } = dto;
    const qb = await this.inventoryRepository
      .createQueryBuilder('bbkiemke')
      .where('bbkiemke.soBienBan = :soBienBan', { soBienBan });

    const inv = await qb.getOne();

    if (inv) return [];

    const newInv = new Bbkiemke();
    newInv.soBienBan = dto.soBienBan;
    newInv.ngayLap = dto.ngayLap;
    newInv.maKho = dto.maKho;
    newInv.truongBan = dto.truongBan;
    newInv.uyVien1 = dto.uyVien1;

    const errors = await validate(newInv);
    if (errors.length > 0) return errors;
    else return await this.inventoryRepository.save(newInv);
  }

  async update(dto: UpdateInventoryDto) {
    const soBienBan = dto.soBienBan;
    return await this.inventoryRepository.update({ soBienBan }, dto);
  }
}
