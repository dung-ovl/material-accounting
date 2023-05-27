import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Phieuxuat } from './Phieuxuat.entity';
import { Vattu } from './Vattu.entity';

@Index('FK_CTPX_PX', ['SoPhieu'], {})
@Index('FK_CTPX_VT', ['MaVT'], {})
@Entity('ct_phieuxuat', { schema: 'ketoan' })
export class CtPhieuxuat {
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

  @ManyToOne(() => Phieuxuat, (phieuxuat) => phieuxuat.ctPhieuxuats, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'SoPhieu', referencedColumnName: 'SoPhieu' }])
  SoPhieu2: Phieuxuat;

  @ManyToOne(() => Vattu, (vattu) => vattu.ctPhieuxuats, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaVT', referencedColumnName: 'MaVT' }])
  MaVT2: Vattu;
}
