import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nguoidung } from 'entities/Nguoidung.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Nguoidung)
    private readonly userRepository: Repository<Nguoidung>,
  ) {}

  async findUsers(): Promise<Nguoidung[]> {
    return await this.userRepository.find();
  }

  async findOne(
    tenDangNhap: string,
    matKhau: string,
  ): Promise<Nguoidung | null> {
    return await this.userRepository.findOneBy({ tenDangNhap, matKhau });
  }
}
