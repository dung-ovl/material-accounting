import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CtPhieuxuat } from './CtPhieuxuat.entity';
import { Kho } from './Kho.entity';
import { Nguoinhan } from './Nguoinhan.entity';
import { Taikhoan } from '../src/accounts/Taikhoan.entity';
import { Congtrinh } from './Congtrinh.entity';

@Index('FK_PX_Kho', ['maKho'], {})
@Index('FK_PX_NN', ['maNguoiNhan'], {})
@Index('FK_PhieuXuat_CongTrinh', ['maCongTrinh'], {})
@Index('FK_PX_TKNo', ['tkNo'], {})
@Entity('phieuxuat', { schema: 'ketoan' })
export class Phieuxuat {
  @Column('varchar', { primary: true, name: 'SoPhieu', length: 50 })
  soPhieu: string;

  @Column('date', { name: 'NgayXuat' })
  ngayXuat: string;

  @Column('varchar', { name: 'MaCongTrinh', nullable: true, length: 50 })
  maCongTrinh: string | null;

  @Column('varchar', { name: 'MaNguoiNhan', nullable: true, length: 50 })
  maNguoiNhan: string | null;

  @Column('varchar', { name: 'MaKho', nullable: true, length: 50 })
  maKho: string | null;

  @Column('varchar', { name: 'LyDo', length: 100 })
  lyDo: string;

  @Column('varchar', { name: 'TKNo', nullable: true, length: 50 })
  tkNo: string | null;

  @Column('decimal', { name: 'TongTien', precision: 19, scale: 0 })
  tongTien: string;

  @Column('varchar', { name: 'ChungTuLQ', length: 100 })
  chungTuLq: string;

  @OneToMany(() => CtPhieuxuat, (ctPhieuxuat) => ctPhieuxuat.soPhieu2)
  ctPhieuxuats: CtPhieuxuat[];

  @ManyToOne(() => Kho, (kho) => kho.phieuxuats, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaKho', referencedColumnName: 'maKho' }])
  maKho2: Kho;

  @ManyToOne(() => Nguoinhan, (nguoinhan) => nguoinhan.phieuxuats, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaNguoiNhan', referencedColumnName: 'maNguoiNhan' }])
  maNguoiNhan2: Nguoinhan;

  @ManyToOne(() => Taikhoan, (taikhoan) => taikhoan.phieuxuats, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'TKNo', referencedColumnName: 'maTk' }])
  tkNo2: Taikhoan;

  @ManyToOne(() => Congtrinh, (congtrinh) => congtrinh.phieuxuats, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaCongTrinh', referencedColumnName: 'maCongTrinh' }])
  maCongTrinh2: Congtrinh;
}
