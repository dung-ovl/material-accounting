import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CtBbkiemke } from './CtBbkiemke.entity';
import { CtPhieunhap } from './CtPhieunhap.entity';
import { CtPhieuxuat } from './CtPhieuxuat.entity';
import { Dudauvattu } from './Dudauvattu.entity';
import { Donvitinh } from './Donvitinh.entity';
import { Loaivattu } from './Loaivattu.entity';
import { Taikhoan } from './Taikhoan.entity';

@Index('FK_VT_DVT', ['MaDVT'], {})
@Index('FK_VT_LoaiVT', ['MaLoai'], {})
@Index('FK_VT_TK', ['MaTK'], {})
@Entity('vattu', { schema: 'ketoan' })
export class Vattu {
  @Column('varchar', { primary: true, name: 'MaVT', length: 50 })
  MaVT: string;

  @Column('varchar', { name: 'TenVT', length: 50 })
  TenVT: string;

  @Column('varchar', { name: 'MaLoai', nullable: true, length: 50 })
  MaLoai: string | null;

  @Column('varchar', { name: 'MaDVT', nullable: true, length: 50 })
  MaDVT: string | null;

  @Column('varchar', { name: 'MaTK', nullable: true, length: 50 })
  MaTK: string | null;

  @OneToMany(() => CtBbkiemke, (ctBbkiemke) => ctBbkiemke.MaVT2)
  ctBbkiemkes: CtBbkiemke[];

  @OneToMany(() => CtPhieunhap, (ctPhieunhap) => ctPhieunhap.MaVT2)
  ctPhieunhaps: CtPhieunhap[];

  @OneToMany(() => CtPhieuxuat, (ctPhieuxuat) => ctPhieuxuat.MaVT2)
  ctPhieuxuats: CtPhieuxuat[];

  @OneToMany(() => Dudauvattu, (dudauvattu) => dudauvattu.MaVT2)
  dudauvattus: Dudauvattu[];

  @ManyToOne(() => Donvitinh, (donvitinh) => donvitinh.vattus, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaDVT', referencedColumnName: 'MaDVT' }])
  MaDVT2: Donvitinh;

  @ManyToOne(() => Loaivattu, (loaivattu) => loaivattu.vattus, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaLoai', referencedColumnName: 'MaLoai' }])
  MaLoai2: Loaivattu;

  @ManyToOne(() => Taikhoan, (taikhoan) => taikhoan.vattus, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaTK', referencedColumnName: 'MaTK' }])
  MaTK2: Taikhoan;
}
