import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Bbkiemke } from './Bbkiemke.entity';
import { Dudauvattu } from './Dudauvattu.entity';
import { Nhanvien } from './Nhanvien.entity';
import { Phieunhap } from './Phieunhap.entity';
import { Phieuxuat } from './Phieuxuat.entity';

@Index('FK_Kho_NhanVien', ['maThuKho'], {})
@Entity('kho', { schema: 'ketoan' })
export class Kho {
  @Column('varchar', { primary: true, name: 'MaKho', length: 50 })
  maKho: string;

  @Column('varchar', { name: 'TenKho', length: 50 })
  tenKho: string;

  @Column('varchar', { name: 'DiaChi', length: 100 })
  diaChi: string;

  @Column('varchar', { name: 'SDT', length: 10 })
  sdt: string;

  @Column('varchar', { name: 'MaThuKho', nullable: true, length: 50 })
  maThuKho: string | null;

  @OneToMany(() => Bbkiemke, (bbkiemke) => bbkiemke.maKho2)
  bbkiemkes: Bbkiemke[];

  @OneToMany(() => Dudauvattu, (dudauvattu) => dudauvattu.maKho2)
  dudauvattus: Dudauvattu[];

  @ManyToOne(() => Nhanvien, (nhanvien) => nhanvien.khos, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaThuKho', referencedColumnName: 'maNv' }])
  maThuKho2: Nhanvien;

  @OneToMany(() => Phieunhap, (phieunhap) => phieunhap.maKho2)
  phieunhaps: Phieunhap[];

  @OneToMany(() => Phieuxuat, (phieuxuat) => phieuxuat.maKho2)
  phieuxuats: Phieuxuat[];
}
