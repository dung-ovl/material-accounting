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

@Index('FK_PhieuNhap_Kho', ['maKho'], {})
@Index('FK_PhieuNhap_NCC', ['maNcc'], {})
@Index('FK_PhieuNhap_NG', ['maNguoiGiao'], {})
@Index('FK_PN_TKCo', ['tkCo'], {})
@Entity('phieunhap', { schema: 'ketoan' })
export class Phieunhap {
  @Column('varchar', { primary: true, name: 'SoPhieu', length: 50 })
  soPhieu: string;

  @Column('date', { name: 'NgayNhap' })
  ngayNhap: string;

  @Column('varchar', { name: 'MaNCC', nullable: true, length: 50 })
  maNcc: string | null;

  @Column('varchar', { name: 'MaNguoiGiao', nullable: true, length: 50 })
  maNguoiGiao: string | null;

  @Column('varchar', { name: 'MaKho', nullable: true, length: 50 })
  maKho: string | null;

  @Column('varchar', { name: 'LyDo', length: 100 })
  lyDo: string;

  @Column('varchar', { name: 'TKCo', nullable: true, length: 50 })
  tkCo: string | null;

  @Column('decimal', { name: 'TongTien', precision: 19, scale: 0 })
  tongTien: string;

  @Column('varchar', { name: 'ChungTuLQ', length: 100 })
  chungTuLq: string;

  @OneToMany(() => CtPhieunhap, (ctPhieunhap) => ctPhieunhap.soPhieu2)
  ctPhieunhaps: CtPhieunhap[];

  @ManyToOne(() => Taikhoan, (taikhoan) => taikhoan.phieunhaps, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'TKCo', referencedColumnName: 'maTk' }])
  tkCo2: Taikhoan;

  @ManyToOne(() => Kho, (kho) => kho.phieunhaps, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaKho', referencedColumnName: 'maKho' }])
  maKho2: Kho;

  @ManyToOne(() => Nhacungcap, (nhacungcap) => nhacungcap.phieunhaps, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaNCC', referencedColumnName: 'maNcc' }])
  maNcc2: Nhacungcap;

  @ManyToOne(() => Nguoigiao, (nguoigiao) => nguoigiao.phieunhaps, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaNguoiGiao', referencedColumnName: 'maNguoiGiao' }])
  maNguoiGiao2: Nguoigiao;
}
