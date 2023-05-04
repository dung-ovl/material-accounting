import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Congtrinh } from './Congtrinh.entity';
import { Phieuxuat } from './Phieuxuat.entity';

@Index('FK_NguoiNhan_CongTrinh', ['maCongTrinh'], {})
@Entity('nguoinhan', { schema: 'ketoan' })
export class Nguoinhan {
  @Column('varchar', { primary: true, name: 'MaNguoiNhan', length: 50 })
  maNguoiNhan: string;

  @Column('varchar', { name: 'TenNguoiNhan', length: 50 })
  tenNguoiNhan: string;

  @Column('varchar', { name: 'DiaChi', length: 100 })
  diaChi: string;

  @Column('varchar', { name: 'MaCongTrinh', nullable: true, length: 50 })
  maCongTrinh: string | null;

  @ManyToOne(() => Congtrinh, (congtrinh) => congtrinh.nguoinhans, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaCongTrinh', referencedColumnName: 'maCongTrinh' }])
  maCongTrinh2: Congtrinh;

  @OneToMany(() => Phieuxuat, (phieuxuat) => phieuxuat.maNguoiNhan2)
  phieuxuats: Phieuxuat[];
}
