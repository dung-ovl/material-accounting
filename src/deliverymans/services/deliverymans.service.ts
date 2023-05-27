import { Injectable, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nguoigiao } from 'entities/Nguoigiao.entity';
import { Repository } from 'typeorm';
import {
  CreateDeliveryManDto,
  JoinedDeliveryManDto,
  UpdateDeliveryManDto,
} from '../dtos';
import { validate } from 'class-validator';

@Injectable()
export class DeliveryMansService {
  constructor(
    @InjectRepository(Nguoigiao)
    private readonly deliveryMansRepository: Repository<Nguoigiao>,
  ) {}

  findAll(): Promise<Nguoigiao[]> {
    return this.deliveryMansRepository.find();
  }

  findOne(MaNguoiGiao: string): Promise<Nguoigiao | null> {
    return this.deliveryMansRepository.findOneBy({ MaNguoiGiao });
  }

  async remove(MaNguoiGiao: string): Promise<void> {
    await this.deliveryMansRepository.delete(MaNguoiGiao);
  }

  joinWithNcc(): Promise<JoinedDeliveryManDto[]> {
    return this.deliveryMansRepository
      .createQueryBuilder('nguoigiao')
      .leftJoinAndSelect('nguoigiao.MaNCC2', 'ncc')
      .select([
        'nguoigiao.MaNguoiGiao AS MaNguoiGiao',
        'nguoigiao.TenNguoiGiao AS TenNguoiGiao',
        'nguoigiao.DiaChi AS DiaChi',
        'nguoigiao.MaNCC AS MaNCC',
        'ncc.TenNCC AS TenNCC',
      ])
      .getRawMany();
  }

  async create(
    dto: CreateDeliveryManDto,
  ): Promise<Nguoigiao | ValidationError[]> {
    // check uniqueness of username/email
    const { MaNguoiGiao } = dto;
    const qb = await this.deliveryMansRepository
      .createQueryBuilder('nguoigiao')
      .where('nguoigiao.MaNguoiGiao = :MaNguoiGiao', { MaNguoiGiao });

    const find = await qb.getOne();

    if (find) return [];

    const newMan = new Nguoigiao();
    newMan.MaNguoiGiao = dto.MaNguoiGiao;
    newMan.TenNguoiGiao = dto.TenNguoiGiao;
    newMan.DiaChi = dto.DiaChi;
    newMan.MaNCC = dto.MaNCC;

    const errors = await validate(newMan);
    if (errors.length > 0) return errors;
    else return await this.deliveryMansRepository.save(newMan);
  }

  async update(dto: UpdateDeliveryManDto) {
    const MaNguoiGiao = dto.MaNguoiGiao;
    return await this.deliveryMansRepository.update({ MaNguoiGiao }, dto);
  }
}
