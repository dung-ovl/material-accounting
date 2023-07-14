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

  async remove(SoBienBan: string): Promise<void> {
    await this.delinventoryRepository
          .createQueryBuilder('ct_bbkiemke')
          .delete()
          .where('ct_bbkiemke.SoBienBan = :SoBienBan', { SoBienBan })
          .execute()
  }

  findByIdInven(SoBienBan: string): Promise<JoinedDetailInventoryDto[]> {
    return this.delinventoryRepository
      .createQueryBuilder('ct_bbkiemke')
      .leftJoin('ct_bbkiemke.MaVT2', 'MaVT2')
      .leftJoin('MaVT2.MaDVT2', 'MaDVT2')
      .select([
        'ct_bbkiemke.MaSo AS MaSo',
        'ct_bbkiemke.SoBienBan AS SoBienBan',
        'ct_bbkiemke.MaVT AS MaVT',
        'MaVT2.TenVT AS TenVT',
        'MaDVT2.TenDVT AS TenDVT',
        'ct_bbkiemke.DonGia AS DonGia',
        'ct_bbkiemke.SLSoSach AS SLSoSach',
        'ct_bbkiemke.SLThucTe AS SLThucTe',
        'ct_bbkiemke.SLThua AS SLThua',
        'ct_bbkiemke.SLThieu AS SLThieu',
        'ct_bbkiemke.SLPhamChatTot AS SLPhamChatTot',
        'ct_bbkiemke.SLPhamChatKem AS SLPhamChatKem',
        'ct_bbkiemke.SLMatPhamChat AS SLMatPhamChat',
      ])
      .where('ct_bbkiemke.SoBienBan = :SoBienBan', { SoBienBan })
      .getRawMany();
  }

  async create(
    dto: CreateDetailInventoryDto,
  ): Promise<CtBbkiemke | ValidationError[]> {
    // check uniqueness of username/email
    const { MaSo } = dto;
    const qb = await this.delinventoryRepository
      .createQueryBuilder('ct_bbkiemke')
      .where('ct_bbkiemke.MaSo = :MaSo', { MaSo });

    const inv = await qb.getOne();

    if (inv) return [];

    const newDetailInv = new CtBbkiemke();
    newDetailInv.MaSo = dto.MaSo;
    newDetailInv.SoBienBan = dto.SoBienBan;
    newDetailInv.MaVT = dto.MaVT;
    newDetailInv.DonGia = dto.DonGia;
    newDetailInv.SLSoSach = dto.SLSoSach;
    newDetailInv.SLThucTe = dto.SLThucTe;
    newDetailInv.SLThua = dto.SLThua;
    newDetailInv.SLThieu = dto.SLThieu;
    newDetailInv.SLPhamChatTot = dto.SLPhamChatTot;
    newDetailInv.SLPhamChatKem = dto.SLPhamChatKem;
    newDetailInv.SLMatPhamChat = dto.SLMatPhamChat;

    const errors = await validate(newDetailInv);
    if (errors.length > 0) return errors;
    else return await this.delinventoryRepository.save(newDetailInv);
  }

  async update(dto: UpdateDetailInventoryDto) {
    const MaSo = dto.MaSo;
    return await this.delinventoryRepository.update({ MaSo }, dto);
  }
}
