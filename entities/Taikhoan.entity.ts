import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Phieunhap } from './Phieunhap.entity';
import { Phieuxuat } from './Phieuxuat.entity';
import { Vattu } from './Vattu.entity';

@Index('FK_TK_TKMe', ['tkMe'], {})
@Entity('taikhoan', { schema: 'ketoan' })
export class Taikhoan {
  @Column('varchar', { primary: true, name: 'MaTK', length: 50 })
  maTk: string;

  @Column('varchar', { name: 'TenTK', length: 50 })
  tenTk: string;

  @Column('int', { name: 'CapTK' })
  capTk: number;

  @Column('varchar', { name: 'TKMe', nullable: true, length: 50 })
  tkMe: string | null;

  @Column('varchar', { name: 'LoaiTK', length: 50 })
  loaiTk: string;

  @OneToMany(() => Phieunhap, (phieunhap) => phieunhap.tkCo2)
  phieunhaps: Phieunhap[];

  @OneToMany(() => Phieuxuat, (phieuxuat) => phieuxuat.tkNo2)
  phieuxuats: Phieuxuat[];

  @ManyToOne(() => Taikhoan, (taikhoan) => taikhoan.taikhoans, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'TKMe', referencedColumnName: 'maTk' }])
  tkMe2: Taikhoan;

  @OneToMany(() => Taikhoan, (taikhoan) => taikhoan.tkMe2)
  taikhoans: Taikhoan[];

  @OneToMany(() => Vattu, (vattu) => vattu.maTk2)
  vattus: Vattu[];
}
