import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Kho } from './Kho.entity';
import { Nhanvien } from './Nhanvien.entity';
import { CtBbkiemke } from './CtBbkiemke.entity';

@Index('FK_BB_Kho', ['MaKho'], {})
@Index('FK_BB_TruongBan', ['TruongBan'], {})
@Index('FK_BB_UyVien1', ['UyVien1'], {})
@Index('FK_BB_UyVien2', ['UyVien2'], {})
@Entity('bbkiemke', { schema: 'ketoan' })
export class Bbkiemke {
  @Column('varchar', { primary: true, name: 'SoBienBan', length: 50 })
  SoBienBan: string;

  @Column('date', { name: 'NgayLap' })
  NgayLap: string;

  @Column('varchar', { name: 'MaKho', nullable: true, length: 50 })
  MaKho: string | null;

  @Column('varchar', { name: 'TruongBan', nullable: true, length: 50 })
  TruongBan: string | null;

  @Column('varchar', { name: 'UyVien1', nullable: true, length: 50 })
  UyVien1: string | null;

  @Column('varchar', { name: 'UyVien2', nullable: true, length: 50 })
  UyVien2: string | null;

  @ManyToOne(() => Kho, (kho) => kho.bbkiemkes, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaKho', referencedColumnName: 'MaKho' }])
  MaKho2: Kho;

  @ManyToOne(() => Nhanvien, (nhanvien) => nhanvien.bbkiemkes, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'TruongBan', referencedColumnName: 'MaNV' }])
  TruongBan2: Nhanvien;

  @ManyToOne(() => Nhanvien, (nhanvien) => nhanvien.bbkiemkes2, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'UyVien1', referencedColumnName: 'MaNV' }])
  UyVien: Nhanvien;

  @ManyToOne(() => Nhanvien, (nhanvien) => nhanvien.bbkiemkes3, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'UyVien2', referencedColumnName: 'MaNV' }])
  UyVien3: Nhanvien;

  @OneToMany(() => CtBbkiemke, (ctBbkiemke) => ctBbkiemke.SoBienBan2)
  ctBbkiemkes: CtBbkiemke[];
}
