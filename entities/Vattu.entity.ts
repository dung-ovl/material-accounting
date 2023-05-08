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

@Index('FK_VT_DVT', ['maDvt'], {})
@Index('FK_VT_LoaiVT', ['maLoai'], {})
@Index('FK_VT_TK', ['maTk'], {})
@Entity('vattu', { schema: 'ketoan' })
export class Vattu {
  @Column('varchar', { primary: true, name: 'MaVT', length: 50 })
  maVt: string;

  @Column('varchar', { name: 'TenVT', length: 50 })
  tenVt: string;

  @Column('varchar', { name: 'MaLoai', nullable: true, length: 50 })
  maLoai: string | null;

  @Column('varchar', { name: 'MaDVT', nullable: true, length: 50 })
  maDvt: string | null;

  @Column('varchar', { name: 'MaTK', nullable: true, length: 50 })
  maTk: string | null;

  @OneToMany(() => CtBbkiemke, (ctBbkiemke) => ctBbkiemke.maVt2)
  ctBbkiemkes: CtBbkiemke[];

  @OneToMany(() => CtPhieunhap, (ctPhieunhap) => ctPhieunhap.maVt2)
  ctPhieunhaps: CtPhieunhap[];

  @OneToMany(() => CtPhieuxuat, (ctPhieuxuat) => ctPhieuxuat.maVt2)
  ctPhieuxuats: CtPhieuxuat[];

  @OneToMany(() => Dudauvattu, (dudauvattu) => dudauvattu.maVt2)
  dudauvattus: Dudauvattu[];

  @ManyToOne(() => Donvitinh, (donvitinh) => donvitinh.vattus, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaDVT', referencedColumnName: 'maDvt' }])
  maDvt2: Donvitinh;

  @ManyToOne(() => Loaivattu, (loaivattu) => loaivattu.vattus, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaLoai', referencedColumnName: 'maLoai' }])
  maLoai2: Loaivattu;

  @ManyToOne(() => Taikhoan, (taikhoan) => taikhoan.vattus, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaTK', referencedColumnName: 'maTk' }])
  maTk2: Taikhoan;
}
