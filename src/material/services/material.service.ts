import { Inject, Injectable, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vattu } from 'entities/Vattu.entity';
import { Repository } from 'typeorm';
import {
  CreateMaterialDto,
  JoinedMaterialDto,
  UpdateMaterialDto,
  QueryMaterialDto,
} from '../dtos';
import { validate } from 'class-validator';
import { CtPhieunhap } from 'entities/CtPhieunhap.entity';
import { Dudauvattu } from 'entities/Dudauvattu.entity';
import DetailReceiptService from 'src/detail_receipt/services/detail_receipt.service';
import { SurMaterialService } from 'src/surmaterial/services/surmaterial.service';

@Injectable()
export default class MaterialService {
  constructor(
    @InjectRepository(Vattu)
    private readonly materialRepository: Repository<Vattu>,
    private readonly detailreceiptRepository: DetailReceiptService,
    private readonly surMaterialRepository: SurMaterialService,
  ) {}
  findAll(): Promise<Vattu[]> {
    return this.materialRepository.find();
  }

  findOne(MaVT: string): Promise<Vattu | null> {
    return this.materialRepository.findOneBy({ MaVT });
  }

  async remove(MaVT: string): Promise<void> {
    await this.materialRepository.delete(MaVT);
  }

  joinWithCT(): Promise<JoinedMaterialDto[]> {
    return this.materialRepository
      .createQueryBuilder('vattu')
      .leftJoinAndSelect('vattu.MaDVT2', 'dvt')
      .leftJoinAndSelect('vattu.MaLoai2', 'loai')
      .select([
        'vattu.MaVT AS MaVT',
        'vattu.TenVT AS TenVT',
        'vattu.MaLoai AS MaLoai',
        'loai.TenLoai AS TenLoai',
        'vattu.MaDVT AS MaDVT',
        'dvt.TenDVT AS TenDVT',
        'vattu.MaTK AS MaTK',
      ])
      .getRawMany();
  }

  async create(dto: CreateMaterialDto): Promise<Vattu | ValidationError[]> {
    // check uniqueness of username/email
    const { MaVT } = dto;
    const qb = await this.materialRepository
      .createQueryBuilder('vattu')
      .where('vattu.MaVT = :MaVT', { MaVT });

    const find = await qb.getOne();

    if (find) return [];

    const newMaterial = new Vattu();
    newMaterial.MaVT = dto.MaVT;
    newMaterial.TenVT = dto.TenVT;
    newMaterial.MaLoai = dto.MaLoai;
    newMaterial.MaTK = dto.MaTK;
    newMaterial.MaDVT = dto.MaDVT;

    const errors = await validate(newMaterial);
    if (errors.length > 0) return errors;
    else return await this.materialRepository.save(newMaterial);
  }

  async update(dto: UpdateMaterialDto) {
    const MaVT = dto.MaVT;
    return await this.materialRepository.update({ MaVT }, dto);
  }

  GetMaVT() {
    return this.materialRepository
      .createQueryBuilder('vattu')
      .select('vattu.MaVT')
      .getRawMany();
  }

  async tinhgiaxuat(params: QueryMaterialDto) {
    const NgayBD = params.NgayDB;
    const NgayKT = params.NgayKT;
    this.GetMaVT().then((result) => {
      result.forEach((item) =>
        this.detailreceiptRepository
          .getSoluong(item.MaVT, NgayBD, NgayKT)
          .then((data) => {
            let TongSL = 0;
            let TongThanhTien = 0;
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                TongSL += data[i].SLThucTe;
                TongThanhTien += data[i].ThanhTien;
              }
            }
            this.surMaterialRepository
              .GetTonKho(item.MaVT, NgayBD, NgayKT)
              .then((data2) => {
                if (data2.length > 0) {
                  for (let i = 0; i < data2.length; i++) {
                    TongSL += data2[i].SoLuong;
                    TongThanhTien += data2[i].ThanhTien;
                  }
                }
                const DonGiaXuat = TongSL > 0 ? TongThanhTien / TongSL : 0;
                this.detailreceiptRepository.updateDonGiaXuat(
                  item.MaVT,
                  DonGiaXuat.toString(),
                );
              });
          }),
      );
    });
  }
}
