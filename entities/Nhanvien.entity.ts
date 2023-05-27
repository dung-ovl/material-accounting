import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Bbkiemke } from './Bbkiemke.entity';
import { Kho } from './Kho.entity';
import { Bophan } from './Bophan.entity';

@Index('FK_NhanVien_BoPhan', ['MaBoPhan'], {})
@Entity('nhanvien', { schema: 'ketoan' })
export class Nhanvien {
  @Column('varchar', { primary: true, name: 'MaNV', length: 50 })
  MaNV: string;

  @Column('varchar', { name: 'TenNV', length: 50 })
  TenNV: string;

  @Column('varchar', { name: 'MaBoPhan', nullable: true, length: 50 })
  MaBoPhan: string | null;

  @OneToMany(() => Bbkiemke, (bbkiemke) => bbkiemke.TruongBan2)
  bbkiemkes: Bbkiemke[];

  @OneToMany(() => Bbkiemke, (bbkiemke) => bbkiemke.UyVien)
  bbkiemkes2: Bbkiemke[];

  @OneToMany(() => Bbkiemke, (bbkiemke) => bbkiemke.UyVien3)
  bbkiemkes3: Bbkiemke[];

  @OneToMany(() => Kho, (kho) => kho.MaThuKho2)
  khos: Kho[];

  @ManyToOne(() => Bophan, (bophan) => bophan.nhanviens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'MaBoPhan', referencedColumnName: 'MaBoPhan' }])
  MaBoPhan2: Bophan;
}
