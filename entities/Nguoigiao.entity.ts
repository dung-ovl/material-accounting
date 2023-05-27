import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Nhacungcap } from './Nhacungcap.entity';
import { Phieunhap } from './Phieunhap.entity';

@Index('FK_NguoiGiao_NCC', ['MaNCC'], {})
@Entity('nguoigiao', { schema: 'ketoan' })
export class Nguoigiao {
  @Column('varchar', { primary: true, name: 'MaNguoiGiao', length: 50 })
  MaNguoiGiao: string;

  @Column('varchar', { name: 'TenNguoiGiao', length: 50 })
  TenNguoiGiao: string;

  @Column('varchar', { name: 'DiaChi', length: 100 })
  DiaChi: string;

  @Column('varchar', { name: 'MaNCC', nullable: true, length: 50 })
  MaNCC: string | null;

  @ManyToOne(() => Nhacungcap, (nhacungcap) => nhacungcap.nguoigiaos, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaNCC', referencedColumnName: 'MaNCC' }])
  MaNCC2: Nhacungcap;

  @OneToMany(() => Phieunhap, (phieunhap) => phieunhap.MaNguoiGiao2)
  phieunhaps: Phieunhap[];
}
