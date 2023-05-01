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

@Index('FK_CTPN_SoPhieu', ['soPhieu'], {})
@Index('FK_CTPN_VT', ['maVt'], {})
@Entity('ct_phieunhap', { schema: 'ketoan' })
export class CtPhieunhap {
  @PrimaryGeneratedColumn({ type: 'int', name: 'MaSo' })
  maSo: number;

  @Column('varchar', { name: 'SoPhieu', nullable: true, length: 50 })
  soPhieu: string | null;

  @Column('varchar', { name: 'MaVT', nullable: true, length: 50 })
  maVt: string | null;

  @Column('double', { name: 'SLSoSach', precision: 22 })
  slSoSach: number;

  @Column('double', { name: 'SLThucTe', precision: 22 })
  slThucTe: number;

  @Column('decimal', { name: 'DonGia', precision: 19, scale: 0 })
  donGia: string;

  @Column('decimal', { name: 'ThanhTien', precision: 19, scale: 0 })
  thanhTien: string;

  @ManyToOne(() => Phieunhap, (phieunhap) => phieunhap.ctPhieunhaps, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'SoPhieu', referencedColumnName: 'soPhieu' }])
  soPhieu2: Phieunhap;

  @ManyToOne(() => Vattu, (vattu) => vattu.ctPhieunhaps, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaVT', referencedColumnName: 'maVt' }])
  maVt2: Vattu;
}
