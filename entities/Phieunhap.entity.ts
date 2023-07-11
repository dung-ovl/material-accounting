import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CtPhieunhap } from './CtPhieunhap.entity';
import { Taikhoan } from './Taikhoan.entity';
import { Kho } from './Kho.entity';
import { Nhacungcap } from './Nhacungcap.entity';
import { Nguoigiao } from './Nguoigiao.entity';

@Index('FK_PhieuNhap_Kho', ['MaKho'], {})
@Index('FK_PhieuNhap_NCC', ['MaNCC'], {})
@Index('FK_PhieuNhap_NG', ['MaNguoiGiao'], {})
@Index('FK_PN_TKCo', ['TKCo'], {})
@Entity('phieunhap', { schema: 'ketoan' })
export class Phieunhap {
  @Column('varchar', { primary: true, name: 'SoPhieu', length: 50 })
  SoPhieu: string;

  @Column('date', { name: 'NgayNhap' })
  NgayNhap: string;

  @Column('varchar', { name: 'MaNCC', nullable: true, length: 50 })
  MaNCC: string | null;

  @Column('varchar', { name: 'MaNguoiGiao', nullable: true, length: 50 })
  MaNguoiGiao: string | null;

  @Column('varchar', { name: 'MaKho', nullable: true, length: 50 })
  MaKho: string | null;

  @Column('varchar', { name: 'LyDo', length: 100 })
  LyDo: string;

  @Column('varchar', { name: 'TKCo', nullable: true, length: 50 })
  TKCo: string | null;

  @Column('decimal', { name: 'TongTien', precision: 19, scale: 0 })
  TongTien: string;

  @Column('varchar', { name: 'ChungTuLQ', length: 100 })
  ChungTuLQ: string;

  @OneToMany(() => CtPhieunhap, (ctPhieunhap) => ctPhieunhap.SoPhieu2)
  ctPhieunhaps: CtPhieunhap[];

  @ManyToOne(() => Taikhoan, (taikhoan) => taikhoan.phieunhaps, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'TKCo', referencedColumnName: 'MaTK' }])
  TKCo2: Taikhoan;

  @ManyToOne(() => Kho, (kho) => kho.phieunhaps, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaKho', referencedColumnName: 'MaKho' }])
  MaKho2: Kho;

  @ManyToOne(() => Nhacungcap, (nhacungcap) => nhacungcap.phieunhaps, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaNCC', referencedColumnName: 'MaNCC' }])
  MaNCC2: Nhacungcap;

  @ManyToOne(() => Nguoigiao, (nguoigiao) => nguoigiao.phieunhaps, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaNguoiGiao', referencedColumnName: 'MaNguoiGiao' }])
  MaNguoiGiao2: Nguoigiao;
}
