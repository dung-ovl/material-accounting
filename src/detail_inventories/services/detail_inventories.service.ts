import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailInventoryDto, UpdateDetailInventoryDto } from '../dtos';
import { ValidationError, validate } from 'class-validator';
import { JoinedDetailInventoryDto } from '../dtos/joined_detail_inventory.dto';
import { CtBbkiemke } from 'entities/CtBbkiemke.entity';

@Injectable()
export class DetailInventoriesService {
  constructor(
    @InjectRepository(CtBbkiemke)
    private readonly delinventoryRepository: Repository<CtBbkiemke>,
  ) {}

  findAll(): Promise<CtBbkiemke[]> {
    return this.delinventoryRepository.find();
  }

  async remove(soBienBan: string): Promise<void> {
    await this.delinventoryRepository.delete(soBienBan);
  }

  findByIdInven(soBienBan: string): Promise<JoinedDetailInventoryDto[]> {
    return this.delinventoryRepository
      .createQueryBuilder('ct_bbkiemke')
      .leftJoin('ct_bbkiemke.maVt2', 'maVt2')
      .leftJoin('maVt2.maDvt2', 'maDvt2')
      .select([
        'ct_bbkiemke.maSo AS maSO',
        'ct_bbkiemke.soBienBan AS soBienBan',
        'ct_bbkiemke.maVt AS maVt',
        'maVt2.tenVt AS tenVt',
        'maDvt2.tenDvt AS tenDvt',
        'ct_bbkiemke.donGia AS donGia',
        'ct_bbkiemke.slSoSach AS slSoSach',
        'ct_bbkiemke.slThucTe AS slThucTe',
        'ct_bbkiemke.slThua AS slThua',
        'ct_bbkiemke.slThieu AS slThieu',
        'ct_bbkiemke.slPhamChatTot AS slPhamChatTot',
        'ct_bbkiemke.slPhamChatKem AS slPhamChatKem',
        'ct_bbkiemke.slMatPhamChat AS slMatPhamChat',
      ])
      .where('ct_bbkiemke.soBienBan = :soBienBan', {soBienBan})
      .getRawMany();
  }

  async create(dto: CreateDetailInventoryDto): Promise<CtBbkiemke | ValidationError[]> {
    // check uniqueness of username/email
    const { maSo } = dto;
    const qb = await this.delinventoryRepository
      .createQueryBuilder('ct_bbkiemke')
      .where('ct_bbkiemke.maSo = :maSo', { maSo });

    const inv = await qb.getOne();

    if (inv) return [];

    const newDetailInv = new CtBbkiemke();
    newDetailInv.maSo = dto.maSo;
    newDetailInv.soBienBan = dto.soBienBan;
    newDetailInv.maVt = dto.maVt;
    newDetailInv.donGia = dto.donGia;
    newDetailInv.slSoSach = dto.slSoSach;
    newDetailInv.slThucTe = dto.slThucTe;
    newDetailInv.slThua = dto.slThua;
    newDetailInv.slThieu = dto.slThieu;
    newDetailInv.slPhamChatTot = dto.slPhamChatTot;
    newDetailInv.slPhamChatKem = dto.slPhamChatKem;
    newDetailInv.slMatPhamChat = dto.slMatPhamChat;

    const errors = await validate(newDetailInv);
    if (errors.length > 0) return errors;
    else return await this.delinventoryRepository.save(newDetailInv);
  }

  async update(dto: UpdateDetailInventoryDto) {
    const maSo = dto.maSo;
    return await this.delinventoryRepository.update({ maSo }, dto);
  }
}
