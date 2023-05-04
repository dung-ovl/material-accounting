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

@Index('FK_Ton_VT', ['maVt'], {})
@Index('FK_Ton_Kho', ['maKho'], {})
@Entity('dudauvattu', { schema: 'ketoan' })
export class Dudauvattu {
  @PrimaryGeneratedColumn({ type: 'int', name: 'MaSo' })
  maSo: number;

  @Column('varchar', { name: 'MaVT', length: 50 })
  maVt: string;

  @Column('varchar', { name: 'MaKho', length: 50 })
  maKho: string;

  @Column('date', { name: 'Ngay' })
  ngay: string;

  @Column('double', { name: 'SoLuong', precision: 22 })
  soLuong: number;

  @Column('decimal', { name: 'DonGia', precision: 19, scale: 0 })
  donGia: string;

  @Column('decimal', { name: 'ThanhTien', precision: 19, scale: 0 })
  thanhTien: string;

  @ManyToOne(() => Kho, (kho) => kho.dudauvattus, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaKho', referencedColumnName: 'maKho' }])
  maKho2: Kho;

  @ManyToOne(() => Vattu, (vattu) => vattu.dudauvattus, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaVT', referencedColumnName: 'maVt' }])
  maVt2: Vattu;
}
