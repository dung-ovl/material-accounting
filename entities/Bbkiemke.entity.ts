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

@Index('FK_BB_Kho', ['maKho'], {})
@Index('FK_BB_TruongBan', ['truongBan'], {})
@Index('FK_BB_UyVien1', ['uyVien1'], {})
@Index('FK_BB_UyVien2', ['uyVien2'], {})
@Entity('bbkiemke', { schema: 'ketoan' })
export class Bbkiemke {
  @Column('varchar', { primary: true, name: 'SoBienBan', length: 50 })
  soBienBan: string;

  @Column('date', { name: 'NgayLap' })
  ngayLap: string;

  @Column('varchar', { name: 'MaKho', nullable: true, length: 50 })
  maKho: string | null;

  @Column('varchar', { name: 'TruongBan', nullable: true, length: 50 })
  truongBan: string | null;

  @Column('varchar', { name: 'UyVien1', nullable: true, length: 50 })
  uyVien1: string | null;

  @Column('varchar', { name: 'UyVien2', nullable: true, length: 50 })
  uyVien2: string | null;

  @ManyToOne(() => Kho, (kho) => kho.bbkiemkes, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaKho', referencedColumnName: 'maKho' }])
  maKho2: Kho;

  @ManyToOne(() => Nhanvien, (nhanvien) => nhanvien.bbkiemkes, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'TruongBan', referencedColumnName: 'maNv' }])
  truongBan2: Nhanvien;

  @ManyToOne(() => Nhanvien, (nhanvien) => nhanvien.bbkiemkes2, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'UyVien1', referencedColumnName: 'maNv' }])
  uyVien: Nhanvien;

  @ManyToOne(() => Nhanvien, (nhanvien) => nhanvien.bbkiemkes3, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'UyVien2', referencedColumnName: 'maNv' }])
  uyVien3: Nhanvien;

  @OneToMany(() => CtBbkiemke, (ctBbkiemke) => ctBbkiemke.soBienBan2)
  ctBbkiemkes: CtBbkiemke[];
}
