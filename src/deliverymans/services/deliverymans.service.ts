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

  findOne(maNguoiGiao: string): Promise<Nguoigiao | null> {
    return this.deliveryMansRepository.findOneBy({ maNguoiGiao });
  }

  async remove(maNguoiGiao: string): Promise<void> {
    await this.deliveryMansRepository.delete(maNguoiGiao);
  }

  joinWithNcc(): Promise<JoinedDeliveryManDto[]> {
    return this.deliveryMansRepository
      .createQueryBuilder('nguoigiao')
      .leftJoinAndSelect('nguoigiao.maNcc2', 'ncc')
      .select([
        'nguoigiao.maNguoiGiao AS maNguoiGiao',
        'nguoigiao.tenNguoiGiao AS tenNguoiGiao',
        'nguoigiao.diaChi AS diaChi',
        'nguoigiao.maNcc AS maNcc',
        'ncc.tenNcc AS tenNcc',
      ])
      .getRawMany();
  }

  async create(
    dto: CreateDeliveryManDto,
  ): Promise<Nguoigiao | ValidationError[]> {
    // check uniqueness of username/email
    const { maNguoiGiao } = dto;
    const qb = await this.deliveryMansRepository
      .createQueryBuilder('nguoigiao')
      .where('nguoigiao.MaNguoiGiao = :maNguoiGiao', { maNguoiGiao });

    const find = await qb.getOne();

    if (find) return [];

    const newMan = new Nguoigiao();
    newMan.maNguoiGiao = dto.maNguoiGiao;
    newMan.tenNguoiGiao = dto.tenNguoiGiao;
    newMan.diaChi = dto.diaChi;
    newMan.maNcc = dto.maNcc;

    const errors = await validate(newMan);
    if (errors.length > 0) return errors;
    else return await this.deliveryMansRepository.save(newMan);
  }

  async update(dto: UpdateDeliveryManDto) {
    const maNguoiGiao = dto.maNguoiGiao;
    return await this.deliveryMansRepository.update({ maNguoiGiao }, dto);
  }
}
