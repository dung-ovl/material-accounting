import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bbkiemke } from './Bbkiemke.entity';
import { Vattu } from './Vattu.entity';

@Index('FK_CTKiemKe_BB', ['SoBienBan'], {})
@Index('FK_CTKiemKe_VT', ['MaVT'], {})
@Entity('ct_bbkiemke', { schema: 'ketoan' })
export class CtBbkiemke {
  @PrimaryGeneratedColumn({ type: 'int', name: 'MaSo' })
  MaSo: number;

  @Column('varchar', { name: 'SoBienBan', nullable: true, length: 50 })
  SoBienBan: string | null;

  @Column('varchar', { name: 'MaVT', nullable: true, length: 50 })
  MaVT: string | null;

  @Column('decimal', { name: 'DonGia', precision: 19, scale: 0 })
  DonGia: string;

  @Column('double', { name: 'SLSoSach', precision: 22 })
  SLSoSach: number;

  @Column('double', { name: 'SLThucTe', precision: 22 })
  SLThucTe: number;

  @Column('double', { name: 'SLThua', precision: 22 })
  SLThua: number;

  @Column('double', { name: 'SLThieu', precision: 22 })
  SLThieu: number;

  @Column('double', { name: 'SLPhamChatTot', precision: 22 })
  SLPhamChatTot: number;

  @Column('double', { name: 'SLPhamChatKem', precision: 22 })
  SLPhamChatKem: number;

  @Column('double', { name: 'SLMatPhamChat', precision: 22 })
  SLMatPhamChat: number;

  @ManyToOne(() => Bbkiemke, (bbkiemke) => bbkiemke.ctBbkiemkes, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'SoBienBan', referencedColumnName: 'SoBienBan' }])
  SoBienBan2: Bbkiemke;

  @ManyToOne(() => Vattu, (vattu) => vattu.ctBbkiemkes, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaVT', referencedColumnName: 'MaVT' }])
  MaVT2: Vattu;
}
