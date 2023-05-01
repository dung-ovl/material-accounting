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

@Index('FK_NhanVien_BoPhan', ['maBoPhan'], {})
@Entity('nhanvien', { schema: 'ketoan' })
export class Nhanvien {
  @Column('varchar', { primary: true, name: 'MaNV', length: 50 })
  maNv: string;

  @Column('varchar', { name: 'TenNV', length: 50 })
  tenNv: string;

  @Column('varchar', { name: 'MaBoPhan', nullable: true, length: 50 })
  maBoPhan: string | null;

  @OneToMany(() => Bbkiemke, (bbkiemke) => bbkiemke.truongBan2)
  bbkiemkes: Bbkiemke[];

  @OneToMany(() => Bbkiemke, (bbkiemke) => bbkiemke.uyVien)
  bbkiemkes2: Bbkiemke[];

  @OneToMany(() => Bbkiemke, (bbkiemke) => bbkiemke.uyVien3)
  bbkiemkes3: Bbkiemke[];

  @OneToMany(() => Kho, (kho) => kho.maThuKho2)
  khos: Kho[];

  @ManyToOne(() => Bophan, (bophan) => bophan.nhanviens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'MaBoPhan', referencedColumnName: 'maBoPhan' }])
  maBoPhan2: Bophan;
}
