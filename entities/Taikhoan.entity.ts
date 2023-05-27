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

@Index('FK_TK_TKMe', ['TKMe'], {})
@Entity('taikhoan', { schema: 'ketoan' })
export class Taikhoan {
  @Column('varchar', { primary: true, name: 'MaTK', length: 50 })
  MaTK: string;

  @Column('varchar', { name: 'TenTK', length: 50 })
  TenTK: string;

  @Column('int', { name: 'CapTK' })
  CapTK: number;

  @Column('varchar', { name: 'TKMe', nullable: true, length: 50 })
  TKMe: string | null;

  @Column('varchar', { name: 'LoaiTK', length: 50 })
  LoaiTK: string;

  @OneToMany(() => Phieunhap, (phieunhap) => phieunhap.TKCo2)
  phieunhaps: Phieunhap[];

  @OneToMany(() => Phieuxuat, (phieuxuat) => phieuxuat.TKNo2)
  phieuxuats: Phieuxuat[];

  @ManyToOne(() => Taikhoan, (taikhoan) => taikhoan.taikhoans, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'TKMe', referencedColumnName: 'MaTK' }])
  TKMe2: Taikhoan;

  @OneToMany(() => Taikhoan, (taikhoan) => taikhoan.TKMe2)
  taikhoans: Taikhoan[];

  @OneToMany(() => Vattu, (vattu) => vattu.MaTK2)
  vattus: Vattu[];
}
