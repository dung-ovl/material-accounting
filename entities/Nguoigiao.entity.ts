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

@Index('FK_NguoiGiao_NCC', ['maNcc'], {})
@Entity('nguoigiao', { schema: 'ketoan' })
export class Nguoigiao {
  @Column('varchar', { primary: true, name: 'MaNguoiGiao', length: 50 })
  maNguoiGiao: string;

  @Column('varchar', { name: 'TenNguoiGiao', length: 50 })
  tenNguoiGiao: string;

  @Column('varchar', { name: 'DiaChi', length: 100 })
  diaChi: string;

  @Column('varchar', { name: 'MaNCC', nullable: true, length: 50 })
  maNcc: string | null;

  @ManyToOne(() => Nhacungcap, (nhacungcap) => nhacungcap.nguoigiaos, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaNCC', referencedColumnName: 'maNcc' }])
  maNcc2: Nhacungcap;

  @OneToMany(() => Phieunhap, (phieunhap) => phieunhap.maNguoiGiao2)
  phieunhaps: Phieunhap[];
}
