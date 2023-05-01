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

@Index('FK_CTKiemKe_BB', ['soBienBan'], {})
@Index('FK_CTKiemKe_VT', ['maVt'], {})
@Entity('ct_bbkiemke', { schema: 'ketoan' })
export class CtBbkiemke {
  @PrimaryGeneratedColumn({ type: 'int', name: 'MaSo' })
  maSo: number;

  @Column('varchar', { name: 'SoBienBan', nullable: true, length: 50 })
  soBienBan: string | null;

  @Column('varchar', { name: 'MaVT', nullable: true, length: 50 })
  maVt: string | null;

  @Column('decimal', { name: 'DonGia', precision: 19, scale: 0 })
  donGia: string;

  @Column('double', { name: 'SLSoSach', precision: 22 })
  slSoSach: number;

  @Column('double', { name: 'SLThucTe', precision: 22 })
  slThucTe: number;

  @Column('double', { name: 'SLThua', precision: 22 })
  slThua: number;

  @Column('double', { name: 'SLThieu', precision: 22 })
  slThieu: number;

  @Column('double', { name: 'SLPhamChatTot', precision: 22 })
  slPhamChatTot: number;

  @Column('double', { name: 'SLPhamChatKem', precision: 22 })
  slPhamChatKem: number;

  @Column('double', { name: 'SLMatPhamChat', precision: 22 })
  slMatPhamChat: number;

  @ManyToOne(() => Bbkiemke, (bbkiemke) => bbkiemke.ctBbkiemkes, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'SoBienBan', referencedColumnName: 'soBienBan' }])
  soBienBan2: Bbkiemke;

  @ManyToOne(() => Vattu, (vattu) => vattu.ctBbkiemkes, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaVT', referencedColumnName: 'maVt' }])
  maVt2: Vattu;
}
