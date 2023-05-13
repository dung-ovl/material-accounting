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

  joinWithTB(): Promise<JoinedInventoryDto[]> {
    return this.inventoryRepository
      .createQueryBuilder('bbkiemke')
      .leftJoin('bbkiemke.maKho2', 'makho2')
      .leftJoin('bbkiemke.truongBan2', 'truongBan2')
      .leftJoin('bbkiemke.uyVien', 'uyVien')
      .leftJoin('bbkiemke.uyVien3', 'uyVien3')
      .select([
        'bbkiemke.soBienBan AS soBienBan',
        'bbkiemke.ngayLap AS ngayLap',
        'bbkiemke.maKho AS maKho',
        'makho2.tenKho AS tenKho',
        'bbkiemke.truongBan AS truongBan',
        'bbkiemke.uyVien1 AS uyVien1',
        'bbkiemke.uyVien2 AS uyVien2',
        'truongBan2.tenNv AS tenTruongBan',
        'uyVien.tenNv AS tenUyVien1',
        'uyVien3.tenNv AS tenUyVien2'
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
    newInv.uyVien2 = dto.uyVien2;

    const errors = await validate(newInv);
    if (errors.length > 0) return errors;
    else return await this.inventoryRepository.save(newInv);
  }

  async update(dto: UpdateInventoryDto) {
    const soBienBan = dto.soBienBan;
    return await this.inventoryRepository.update({ soBienBan }, dto);
  }
}
