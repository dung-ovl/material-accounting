import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Kho } from './Kho.entity';
import { Vattu } from './Vattu.entity';

@Index('FK_Ton_VT', ['MaVT'], {})
@Index('FK_Ton_Kho', ['MaKho'], {})
@Entity('dudauvattu', { schema: 'ketoan' })
export class Dudauvattu {
  @PrimaryGeneratedColumn({ type: 'int', name: 'MaSo' })
  MaSo: number;

  @Column('varchar', { name: 'MaVT', length: 50 })
  MaVT: string;

  @Column('varchar', { name: 'MaKho', length: 50 })
  MaKho: string;

  @Column('date', { name: 'Ngay' })
  Ngay: string;

  @Column('double', { name: 'SoLuong', precision: 22 })
  SoLuong: number;

  @Column('decimal', { name: 'DonGia', precision: 19, scale: 0 })
  DonGia: string;

  @Column('decimal', { name: 'ThanhTien', precision: 19, scale: 0 })
  ThanhTien: string;

  @ManyToOne(() => Kho, (kho) => kho.dudauvattus, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaKho', referencedColumnName: 'MaKho' }])
  MaKho2: Kho;

  @ManyToOne(() => Vattu, (vattu) => vattu.dudauvattus, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaVT', referencedColumnName: 'MaVT' }])
  MaVT2: Vattu;
}
