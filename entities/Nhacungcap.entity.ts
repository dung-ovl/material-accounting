import { Column, Entity, OneToMany } from 'typeorm';
import { Nguoigiao } from './Nguoigiao.entity';
import { Phieunhap } from './Phieunhap.entity';

@Entity('nhacungcap', { schema: 'ketoan' })
export class Nhacungcap {
  @Column('varchar', { primary: true, name: 'MaNCC', length: 50 })
  maNcc: string;

  @Column('varchar', { name: 'TenNCC', length: 50 })
  tenNcc: string;

  @Column('varchar', { name: 'DiaChi', length: 100 })
  diaChi: string;

  @Column('varchar', { name: 'MaSoThue', length: 50 })
  maSoThue: string;

  @Column('varchar', { name: 'SDT', length: 10 })
  sdt: string;

  @OneToMany(() => Nguoigiao, (nguoigiao) => nguoigiao.maNcc2)
  nguoigiaos: Nguoigiao[];

  @OneToMany(() => Phieunhap, (phieunhap) => phieunhap.maNcc2)
  phieunhaps: Phieunhap[];
}
