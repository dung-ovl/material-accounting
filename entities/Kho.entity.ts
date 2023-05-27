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

@Index('FK_Kho_NhanVien', ['MaThuKho'], {})
@Entity('kho', { schema: 'ketoan' })
export class Kho {
  @Column('varchar', { primary: true, name: 'MaKho', length: 50 })
  MaKho: string;

  @Column('varchar', { name: 'TenKho', length: 50 })
  TenKho: string;

  @Column('varchar', { name: 'DiaChi', length: 100 })
  DiaChi: string;

  @Column('varchar', { name: 'SDT', length: 10 })
  SDT: string;

  @Column('varchar', { name: 'MaThuKho', nullable: true, length: 50 })
  MaThuKho: string | null;

  @OneToMany(() => Bbkiemke, (bbkiemke) => bbkiemke.MaKho2)
  bbkiemkes: Bbkiemke[];

  @OneToMany(() => Dudauvattu, (dudauvattu) => dudauvattu.MaKho2)
  dudauvattus: Dudauvattu[];

  @ManyToOne(() => Nhanvien, (nhanvien) => nhanvien.khos, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaThuKho', referencedColumnName: 'MaNV' }])
  MaThuKho2: Nhanvien;

  @OneToMany(() => Phieunhap, (phieunhap) => phieunhap.MaKho2)
  phieunhaps: Phieunhap[];

  @OneToMany(() => Phieuxuat, (phieuxuat) => phieuxuat.MaKho2)
  phieuxuats: Phieuxuat[];
}
