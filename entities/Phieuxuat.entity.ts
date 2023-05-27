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
import { Taikhoan } from './Taikhoan.entity';
import { Congtrinh } from './Congtrinh.entity';

@Index('FK_PX_Kho', ['MaKho'], {})
@Index('FK_PX_NN', ['MaNguoiNhan'], {})
@Index('FK_PhieuXuat_CongTrinh', ['MaCongTrinh'], {})
@Index('FK_PX_TKNo', ['TKNo'], {})
@Entity('phieuxuat', { schema: 'ketoan' })
export class Phieuxuat {
  @Column('varchar', { primary: true, name: 'SoPhieu', length: 50 })
  SoPhieu: string;

  @Column('date', { name: 'NgayXuat' })
  NgayXuat: string;

  @Column('varchar', { name: 'MaCongTrinh', nullable: true, length: 50 })
  MaCongTrinh: string | null;

  @Column('varchar', { name: 'MaNguoiNhan', nullable: true, length: 50 })
  MaNguoiNhan: string | null;

  @Column('varchar', { name: 'MaKho', nullable: true, length: 50 })
  MaKho: string | null;

  @Column('varchar', { name: 'LyDo', length: 100 })
  LyDo: string;

  @Column('varchar', { name: 'TKNo', nullable: true, length: 50 })
  TKNo: string | null;

  @Column('decimal', { name: 'TongTien', precision: 19, scale: 0 })
  TongTien: string;

  @Column('varchar', { name: 'ChungTuLQ', length: 100 })
  ChungTuLQ: string;

  @OneToMany(() => CtPhieuxuat, (ctPhieuxuat) => ctPhieuxuat.SoPhieu2)
  ctPhieuxuats: CtPhieuxuat[];

  @ManyToOne(() => Kho, (kho) => kho.phieuxuats, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaKho', referencedColumnName: 'MaKho' }])
  MaKho2: Kho;

  @ManyToOne(() => Nguoinhan, (nguoinhan) => nguoinhan.phieuxuats, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaNguoiNhan', referencedColumnName: 'MaNguoiNhan' }])
  MaNguoiNhan2: Nguoinhan;

  @ManyToOne(() => Taikhoan, (taikhoan) => taikhoan.phieuxuats, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'TKNo', referencedColumnName: 'MaTK' }])
  TKNo2: Taikhoan;

  @ManyToOne(() => Congtrinh, (congtrinh) => congtrinh.phieuxuats, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaCongTrinh', referencedColumnName: 'MaCongTrinh' }])
  MaCongTrinh2: Congtrinh;
}
