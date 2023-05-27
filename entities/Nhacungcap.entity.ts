import { Column, Entity, OneToMany } from 'typeorm';
import { Nguoigiao } from './Nguoigiao.entity';
import { Phieunhap } from './Phieunhap.entity';

@Entity('nhacungcap', { schema: 'ketoan' })
export class Nhacungcap {
  @Column('varchar', { primary: true, name: 'MaNCC', length: 50 })
  MaNCC: string;

  @Column('varchar', { name: 'TenNCC', length: 50 })
  TenNCC: string;

  @Column('varchar', { name: 'DiaChi', length: 100 })
  DiaChi: string;

  @Column('varchar', { name: 'MaSoThue', length: 50 })
  MaSoThue: string;

  @Column('varchar', { name: 'SDT', length: 10 })
  SDT: string;

  @OneToMany(() => Nguoigiao, (nguoigiao) => nguoigiao.MaNCC2)
  nguoigiaos: Nguoigiao[];

  @OneToMany(() => Phieunhap, (phieunhap) => phieunhap.MaNCC2)
  phieunhaps: Phieunhap[];
}
