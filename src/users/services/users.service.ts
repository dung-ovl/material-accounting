import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nguoidung } from 'entities/Nguoidung.entity';
import { CreateUserDto } from '../dtos/create_dto';
import { validate } from 'class-validator';
import { LoginDto, UpdateUserDto } from '../dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Nguoidung)
    private readonly userRepository: Repository<Nguoidung>,
  ) {}

  async findUsers(): Promise<Nguoidung[]> {
    return await this.userRepository.find();
  }

  async findOne(dto: LoginDto): Promise<Nguoidung | null> {
    if (dto.MatKhau === undefined || dto.TenDangNhap === undefined) return null;
    const { TenDangNhap, MatKhau } = dto;
    return await this.userRepository.findOneBy({ TenDangNhap, MatKhau });
  }

  async createUser(dto: CreateUserDto) {
    // check uniqueness of username/email
    const { TenDangNhap } = dto;
    const qb = await this.userRepository
      .createQueryBuilder('nguoidung')
      .where('nguoidung.TenDangNhap = :TenDangNhap', { TenDangNhap });

    const inv = await qb.getOne();

    if (inv) return null;

    const newUser = new Nguoidung();
    newUser.TenDangNhap = dto.TenDangNhap;
    newUser.HoTen = dto.HoTen;
    newUser.MatKhau = dto.MatKhau;
    newUser.Quyen = dto.Quyen;
    newUser.MaBoPhan = dto.MaBoPhan;

    const errors = await validate(newUser);
    if (errors.length > 0) return errors;
    else return await this.userRepository.save(newUser);
  }

  async updateUser(dto: UpdateUserDto) {
    const { TenDangNhap } = dto;
    const qb = await this.userRepository
      .createQueryBuilder('nguoidung')
      .where('nguoidung.TenDangNhap = :TenDangNhap', { TenDangNhap });

    const inv = await qb.getOne();
    if (inv === null) return null;
    return await this.userRepository.update({ TenDangNhap }, dto);
  }

  remove(TenDangNhap: string) {
    return this.userRepository.delete(TenDangNhap);
  }
}
