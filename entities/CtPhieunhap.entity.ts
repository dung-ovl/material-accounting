import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Phieunhap } from './Phieunhap.entity';
import { Vattu } from './Vattu.entity';

@Index('FK_CTPN_SoPhieu', ['SoPhieu'], {})
@Index('FK_CTPN_VT', ['MaVT'], {})
@Entity('ct_phieunhap', { schema: 'ketoan' })
export class CtPhieunhap {
  @PrimaryGeneratedColumn({ type: 'int', name: 'MaSo' })
  MaSo: number;

  @Column('varchar', { name: 'SoPhieu', nullable: true, length: 50 })
  SoPhieu: string | null;

  @Column('varchar', { name: 'MaVT', nullable: true, length: 50 })
  MaVT: string | null;

  @Column('double', { name: 'SLSoSach', precision: 22 })
  SLSoSach: number;

  @Column('double', { name: 'SLThucTe', precision: 22 })
  SLThucTe: number;

  @Column('decimal', { name: 'DonGia', precision: 19, scale: 0 })
  DonGia: string;

  @Column('decimal', { name: 'ThanhTien', precision: 19, scale: 0 })
  ThanhTien: string;

  @ManyToOne(() => Phieunhap, (phieunhap) => phieunhap.ctPhieunhaps, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'SoPhieu', referencedColumnName: 'SoPhieu' }])
  SoPhieu2: Phieunhap;

  @ManyToOne(() => Vattu, (vattu) => vattu.ctPhieunhaps, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaVT', referencedColumnName: 'MaVT' }])
  MaVT2: Vattu;
}
